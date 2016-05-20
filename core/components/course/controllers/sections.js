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

angular.module('mm.core.course')

/**
 * Sections view controller.
 *
 * @module mm.core.course
 * @ngdoc controller
 * @name mmCourseSectionsCtrl
 */
.controller('mmCourseSectionsCtrl', function($mmCourse, $mmUtil, $scope, $stateParams, $translate, $mmCourseHelper, $mmEvents,
            $mmSite, $mmCoursePrefetchDelegate, $mmCourses, $q, $ionicHistory, $ionicPlatform, mmCoreCourseAllSectionsId,
            mmCoreEventSectionStatusChanged, $mmConfig, mmCoreSettingsDownloadSection, $state, $timeout) {
    var courseId = $stateParams.courseid,
        sectionId = $stateParams.sid,
        moduleId = $stateParams.moduleid,
        downloadSectionsEnabled;

    $scope.courseId = courseId;
    $scope.sectionToLoad = 2; // Load "General" section by default.

    function checkDownloadSectionsEnabled() {
        return $mmConfig.get(mmCoreSettingsDownloadSection, true).then(function(enabled) {
            downloadSectionsEnabled = enabled;
        }).catch(function() {
            // Shouldn't happen.
            downloadSectionsEnabled = false;
        });
    }

    function loadSections(refresh) {
        // Get full course data. If not refreshing we'll try to get it from cache to speed up the response.
        return $mmCourses.getUserCourse(courseId).then(function(course) {
            $scope.fullname = course.fullname;
            // Get the sections.
            return $mmCourse.getSections(courseId).then(function(sections) {
                // Add a fake first section (all sections).
                return $translate('mm.course.allsections').then(function(str) {
                    // Adding fake first section.
                    var result = [{
                        name: str,
                        id: mmCoreCourseAllSectionsId
                    }].concat(sections);

                    $scope.sections = result;

                    if (downloadSectionsEnabled) {
                        // Calculate status of the sections. We don't return the promise because
                        // we don't want to block the rendering of the sections.
                        $mmCourseHelper.calculateSectionsStatus(result, courseId, true, refresh).catch(function() {
                            // Ignore errors (shouldn't happen).
                        }).then(function(downloadpromises) {
                            // If we restored any download we'll recalculate the status once all of them have finished.
                            if (downloadpromises && downloadpromises.length) {
                                $mmUtil.allPromises(downloadpromises).catch(function() {
                                    if (!$scope.$$destroyed) {
                                        $mmUtil.showErrorModal('mm.course.errordownloadingsection', true);
                                    }
                                }).finally(function() {
                                    if (!$scope.$$destroyed) {
                                        // Recalculate the status.
                                        $mmCourseHelper.calculateSectionsStatus($scope.sections, courseId, false);
                                    }
                                });
                            }
                        });
                    }
                });
            });
        }).catch(function(error) {
            if (error) {
                $mmUtil.showErrorModal(error);
            } else {
                $mmUtil.showErrorModal('mm.course.couldnotloadsections', true);
            }
        });
    }

    // Prefetch a section. The second parameter indicates if the prefetch was started manually (true)
    // or it was automatically started because all modules are being downloaded (false).
    function prefetch(section, manual) {
        $mmCourseHelper.prefetch(section, courseId, $scope.sections).catch(function() {
            // Don't show error message if scope is destroyed or it's an automatic download but we aren't in this state.
            if ($scope.$$destroyed) {
                return;
            }

            var current = $ionicHistory.currentStateName(),
                isCurrent = ($ionicPlatform.isTablet() && current == 'site.mm_course.mm_course-section') ||
                            (!$ionicPlatform.isTablet() && current == 'site.mm_course');
            if (!manual && !isCurrent) {
                return;
            }

            $mmUtil.showErrorModal('mm.course.errordownloadingsection', true);
        }).finally(function() {
            if (!$scope.$$destroyed) {
                // Recalculate the status.
                $mmCourseHelper.calculateSectionsStatus($scope.sections, courseId, false);
            }
        });
    }

    // Convenience function to autoload a section if sectionId param is set.
    function autoloadSection() {
        if (sectionId) {
            if ($ionicPlatform.isTablet()) {
                // Search the position of the section to load.
                angular.forEach($scope.sections, function(section, index) {
                    if (section.id == sectionId) {
                        $scope.sectionToLoad = index + 1;
                    }
                });
                // Set moduleId to pass it to the new state when the section is autoloaded. We unset it after this
                // to prevent autoloading the module when the user manually loads a section.
                $scope.moduleId = moduleId;
                $timeout(function() {
                    $scope.moduleId = null; // Unset moduleId when
                }, 500);
            } else {
                $state.go('site.mm_course-section', {
                    sectionid: sectionId,
                    cid: courseId,
                    mid: moduleId
                });
            }
        }
    }

    $scope.doRefresh = function() {
        var promises = [];
        promises.push($mmCourses.invalidateUserCourses());
        promises.push($mmCourse.invalidateSections(courseId));

        $q.all(promises).finally(function() {
            loadSections(true).finally(function() {
                $scope.$broadcast('scroll.refreshComplete');
            });
        });
    };

    $scope.prefetch = function(e, section) {
        e.preventDefault();
        e.stopPropagation();

        section.isCalculating = true;
        $mmCourseHelper.confirmDownloadSize(courseId, section, $scope.sections).then(function() {
            prefetch(section, true);
        }).finally(function() {
            section.isCalculating = false;
        });
    };

    checkDownloadSectionsEnabled().then(function() {
        loadSections().finally(function() {
            autoloadSection();
            $scope.sectionsLoaded = true;
        });
    });

    // Listen for section status changes.
    var statusObserver = $mmEvents.on(mmCoreEventSectionStatusChanged, function(data) {
        if (downloadSectionsEnabled && $scope.sections && $scope.sections.length && data.siteid === $mmSite.getId() &&
                    !$scope.$$destroyed&& data.sectionid) {
            // Check if the affected section is being downloaded. If so, we don't update section status
            // because it'll already be updated when the download finishes.
            if ($mmCoursePrefetchDelegate.isBeingDownloaded($mmCourseHelper.getSectionDownloadId({id: data.sectionid}))) {
                return;
            }

            // Recalculate the status.
            $mmCourseHelper.calculateSectionsStatus($scope.sections, courseId, false).then(function() {
                var section;
                angular.forEach($scope.sections, function(s) {
                    if (s.id === data.sectionid) {
                        section = s;
                    }
                });
                if (section) {
                    var downloadid = $mmCourseHelper.getSectionDownloadId(section);
                    if (section.isDownloading && !$mmCoursePrefetchDelegate.isBeingDownloaded(downloadid)) {
                        // All the modules are now downloading, set a download all promise.
                        prefetch(section, false);
                    }
                }
            });
        }
    });

    $scope.$on('$destroy', function() {
        statusObserver && statusObserver.off && statusObserver.off();
    });
});
