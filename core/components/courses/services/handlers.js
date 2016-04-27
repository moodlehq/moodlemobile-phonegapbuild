// (C) Copyright 2015 Martin Dougiamas
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

angular.module('mm.core.courses')

/**
 * Courses handlers factory.
 *
 * @module mm.core.courses
 * @ngdoc service
 * @name $mmCoursesHandlers
 */
.factory('$mmCoursesHandlers', function($mmSite, $state, $mmCourses, $q, $mmUtil, $translate, $timeout,
            mmCoursesEnrolInvalidKey) {

    var self = {};

    /**
     * Content links handler.
     *
     * @module mm.core.courses
     * @ngdoc method
     * @name $mmCoursesHandlers#linksHandler
     */
    self.linksHandler = function() {

        var self = {};

        /**
         * Action to perform when an enrol link is clicked.
         *
         * @param  {Number} courseId Course ID.
         * @param  {String} url      Treated URL.
         * @return {Void}
         */
        function actionEnrol(courseId, url) {
            var modal = $mmUtil.showModalLoading();

            // Check if user is enrolled in the course.
            $mmCourses.getUserCourse(courseId).catch(function() {
                // User is not enrolled in the course. Check if can self enrol.
                return canSelfEnrol(courseId).then(function() {
                    modal.dismiss();
                    return selfEnrol(courseId).catch(function() {
                        if (typeof error == 'string') {
                            $mmUtil.showErrorModal(error);
                        }
                        return $q.reject();
                    });
                }, function(error) {
                    // Error. Show error message and allow the user to open the link in browser.
                    modal.dismiss();
                    if (typeof error != 'string') {
                        error = $translate.instant('mm.courses.notenroled');
                    }

                    var body = $translate('mm.core.twoparagraphs',
                                    {p1: error, p2: $translate.instant('mm.core.confirmopeninbrowser')});
                    $mmUtil.showConfirm(body).then(function() {
                        $mmUtil.openInBrowser(url);
                    });
                    return $q.reject();
                });
            }).then(function() {
                modal.dismiss();
                // Use redirect to make the course the new history root (to avoid "loops" in history).
                $state.go('redirect', {
                    siteid: $mmSite.getId(),
                    state: 'site.mm_course',
                    params: {courseid: courseId}
                });
            });
        }

        /**
         * Check if a user can be "automatically" self enrolled in a course.
         *
         * @param  {Number} courseId Course ID.
         * @return {Promise}         Promise resolved if user is can be enrolled in a course, rejected otherwise.
         */
        function canSelfEnrol(courseId) {
            // Check if self enrolment is enabled.
            if (!$mmCourses.isSelfEnrolmentEnabled()) {
                return $q.reject();
            }

            // Check that the course has self enrolment enabled.
            return $mmCourses.getCourseEnrolmentMethods(courseId).then(function(methods) {
                var isSelfEnrolEnabled = false,
                    instances = 0;
                angular.forEach(methods, function(method) {
                    if (method.type == 'self' && method.status) {
                        isSelfEnrolEnabled = true;
                        instances++;
                    }
                });

                if (!isSelfEnrolEnabled || instances != 1) {
                    // Self enrol not enabled or more than one instance.
                    return $q.reject();
                }
            });
        }

        /**
         * Try to self enrol a user in a course.
         *
         * @param  {Number} courseId Course ID.
         * @param  {String} password Password.
         * @return {Promise}         Promiser esolved when the user is enrolled, rejected otherwise.
         */
        function selfEnrol(courseId, password) {
            var modal = $mmUtil.showModalLoading();
            return $mmCourses.selfEnrol(courseId, password).then(function() {
                // Success self enrolling the user, invalidate the courses list.
                return $mmCourses.invalidateUserCourses().catch(function() {
                    // Ignore errors.
                }).then(function() {
                    // For some reason, if we get the course list right after self enrolling
                    // we won't retrieve the new course. Let's delay it a bit.
                    return $timeout(function() {}, 4000).finally(function() {
                        modal.dismiss();
                    });
                });

            }).catch(function(error) {
                modal.dismiss();
                if (error && error.code === mmCoursesEnrolInvalidKey) {
                    // Invalid password. Allow the user to input password.
                    var title = $translate.instant('mm.courses.selfenrolment'),
                        body = ' ', // Empty message.
                        placeholder = $translate.instant('mm.courses.password');

                    if (typeof password != 'undefined') {
                        // The user attempted a password. Show an error message.
                        $mmUtil.showErrorModal(error.message);
                    }

                    return $mmUtil.showPrompt(body, title, placeholder).then(function(password) {
                        return selfEnrol(courseId, password);
                    });
                } else {
                    return $q.reject(error);
                }
            });
        }

        /**
         * Get actions to perform with the link.
         *
         * @param {String[]} siteIds Site IDs the URL belongs to.
         * @param {String} url       URL to treat.
         * @return {Object[]}        List of actions. See {@link $mmContentLinksDelegate#registerLinkHandler}.
         */
        self.getActions = function(siteIds, url) {
            // Check if it's a course URL.
            if (typeof self.handles(url) != 'undefined') {
                var params = $mmUtil.extractUrlParams(url);
                if (typeof params.id != 'undefined') {
                    // Return actions.
                    return [{
                        message: 'mm.core.view',
                        icon: 'ion-eye',
                        sites: siteIds,
                        action: function(siteId) {
                            siteId = siteId || $mmSite.getId();
                            if (siteId == $mmSite.getId()) {
                                actionEnrol(parseInt(params.id, 10), url);
                            } else {
                                // Use redirect to make the course the new history root (to avoid "loops" in history).
                                $state.go('redirect', {
                                    siteid: siteId,
                                    state: 'site.mm_course',
                                    params: {courseid: parseInt(params.id, 10)}
                                });
                            }
                        }
                    }];
                }
            }
            return [];
        };

        /**
         * Check if the URL is handled by this handler. If so, returns the URL of the site.
         *
         * @param  {String} url URL to check.
         * @return {String}     Site URL. Undefined if the URL doesn't belong to this handler.
         */
        self.handles = function(url) {
            // Accept any of these patterns.
            var patterns = ['/enrol/index.php', '/course/enrol.php', '/course/view.php'];
            for (var i = 0; i < patterns.length; i++) {
                var position = url.indexOf(patterns[i]);
                if (position > -1) {
                    return url.substr(0, position);
                }
            }
        };

        return self;
    };

    return self;
});
