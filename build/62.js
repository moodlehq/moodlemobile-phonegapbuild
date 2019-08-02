webpackJsonp([62],{

/***/ 2094:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/@angular/core/esm5/core.js
var core = __webpack_require__(0);

// EXTERNAL MODULE: ./node_modules/ionic-angular/index.js + 3 modules
var ionic_angular = __webpack_require__(6);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/index.js + 1 modules
var _ngx_translate_core = __webpack_require__(3);

// EXTERNAL MODULE: ./src/providers/app.ts
var app = __webpack_require__(9);

// EXTERNAL MODULE: ./src/providers/events.ts
var events = __webpack_require__(11);

// EXTERNAL MODULE: ./src/providers/sites.ts
var sites = __webpack_require__(1);

// EXTERNAL MODULE: ./src/providers/utils/dom.ts
var dom = __webpack_require__(4);

// EXTERNAL MODULE: ./src/providers/utils/text.ts
var utils_text = __webpack_require__(10);

// EXTERNAL MODULE: ./src/core/courses/providers/courses.ts
var courses = __webpack_require__(51);

// EXTERNAL MODULE: ./src/core/course/providers/options-delegate.ts
var options_delegate = __webpack_require__(96);

// EXTERNAL MODULE: ./src/core/course/providers/course.ts
var course = __webpack_require__(13);

// EXTERNAL MODULE: ./src/core/course/providers/helper.ts
var helper = __webpack_require__(36);

// EXTERNAL MODULE: ./src/core/course/providers/format-delegate.ts
var format_delegate = __webpack_require__(173);

// CONCATENATED MODULE: ./src/core/courses/pages/course-preview/course-preview.ts
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













/**
 * Page that allows "previewing" a course and enrolling in it if enabled and not enrolled.
 */
var course_preview_CoreCoursesCoursePreviewPage = /** @class */ (function () {
    function CoreCoursesCoursePreviewPage(navCtrl, navParams, sitesProvider, domUtils, textUtils, appProvider, coursesProvider, platform, modalCtrl, translate, eventsProvider, courseOptionsDelegate, courseHelper, courseProvider, courseFormatDelegate, zone) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.sitesProvider = sitesProvider;
        this.domUtils = domUtils;
        this.textUtils = textUtils;
        this.coursesProvider = coursesProvider;
        this.platform = platform;
        this.modalCtrl = modalCtrl;
        this.translate = translate;
        this.eventsProvider = eventsProvider;
        this.courseOptionsDelegate = courseOptionsDelegate;
        this.courseHelper = courseHelper;
        this.courseProvider = courseProvider;
        this.courseFormatDelegate = courseFormatDelegate;
        this.zone = zone;
        this.canAccessCourse = true;
        this.component = 'CoreCoursesCoursePreview';
        this.selfEnrolInstances = [];
        this.avoidOpenCourse = false;
        this.prefetchCourseData = {
            downloadSucceeded: false,
            prefetchCourseIcon: 'spinner',
            title: 'core.course.downloadcourse'
        };
        this.isGuestEnabled = false;
        this.waitStart = 0;
        this.pageDestroyed = false;
        this.course = navParams.get('course');
        this.avoidOpenCourse = navParams.get('avoidOpenCourse');
        this.isMobile = appProvider.isMobile();
        this.isDesktop = appProvider.isDesktop();
        this.downloadCourseEnabled = !this.coursesProvider.isDownloadCourseDisabledInSite();
        if (this.downloadCourseEnabled) {
            // Listen for status change in course.
            this.courseStatusObserver = this.eventsProvider.on(events["a" /* CoreEventsProvider */].COURSE_STATUS_CHANGED, function (data) {
                if (data.courseId == _this.course.id || data.courseId == course["a" /* CoreCourseProvider */].ALL_COURSES_CLEARED) {
                    _this.updateCourseStatus(data.status);
                }
            }, this.sitesProvider.getCurrentSiteId());
        }
    }
    /**
     * View loaded.
     */
    CoreCoursesCoursePreviewPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var currentSite = this.sitesProvider.getCurrentSite(), currentSiteUrl = currentSite && currentSite.getURL();
        this.paypalEnabled = this.course.enrollmentmethods && this.course.enrollmentmethods.indexOf('paypal') > -1;
        this.guestWSAvailable = this.coursesProvider.isGuestWSAvailable();
        this.enrolUrl = this.textUtils.concatenatePaths(currentSiteUrl, 'enrol/index.php?id=' + this.course.id);
        this.courseUrl = this.textUtils.concatenatePaths(currentSiteUrl, 'course/view.php?id=' + this.course.id);
        this.paypalReturnUrl = this.textUtils.concatenatePaths(currentSiteUrl, 'enrol/paypal/return.php');
        if (this.course.overviewfiles && this.course.overviewfiles.length > 0) {
            this.course.courseImage = this.course.overviewfiles[0].fileurl;
        }
        // Initialize the self enrol modal.
        this.selfEnrolModal = this.modalCtrl.create('CoreCoursesSelfEnrolPasswordPage');
        this.selfEnrolModal.onDidDismiss(function (password) {
            if (typeof password != 'undefined') {
                _this.selfEnrolInCourse(password, _this.currentInstanceId);
            }
        });
        this.getCourse().finally(function () {
            if (!_this.downloadCourseEnabled) {
                // Cannot download the whole course, stop.
                return;
            }
            // Determine course prefetch icon.
            _this.courseHelper.getCourseStatusIconAndTitle(_this.course.id).then(function (data) {
                _this.prefetchCourseData.prefetchCourseIcon = data.icon;
                _this.prefetchCourseData.title = data.title;
                if (data.icon == 'spinner') {
                    // Course is being downloaded. Get the download promise.
                    var promise = _this.courseHelper.getCourseDownloadPromise(_this.course.id);
                    if (promise) {
                        // There is a download promise. If it fails, show an error.
                        promise.catch(function (error) {
                            if (!_this.pageDestroyed) {
                                _this.domUtils.showErrorModalDefault(error, 'core.course.errordownloadingcourse', true);
                            }
                        });
                    }
                    else {
                        // No download, this probably means that the app was closed while downloading. Set previous status.
                        _this.courseProvider.setCoursePreviousStatus(_this.course.id);
                    }
                }
            });
        });
    };
    /**
     * Page destroyed.
     */
    CoreCoursesCoursePreviewPage.prototype.ngOnDestroy = function () {
        this.pageDestroyed = true;
        if (this.courseStatusObserver) {
            this.courseStatusObserver.off();
        }
    };
    /**
     * Check if the user can access as guest.
     *
     * @return {Promise<boolean>} Promise resolved if can access as guest, rejected otherwise. Resolve param indicates if
     *                            password is required for guest access.
     */
    CoreCoursesCoursePreviewPage.prototype.canAccessAsGuest = function () {
        if (!this.isGuestEnabled) {
            return Promise.reject(null);
        }
        // Search instance ID of guest enrolment method.
        this.guestInstanceId = undefined;
        for (var i = 0; i < this.enrollmentMethods.length; i++) {
            var method = this.enrollmentMethods[i];
            if (method.type == 'guest') {
                this.guestInstanceId = method.id;
                break;
            }
        }
        if (this.guestInstanceId) {
            return this.coursesProvider.getCourseGuestEnrolmentInfo(this.guestInstanceId).then(function (info) {
                if (!info.status) {
                    // Not active, reject.
                    return Promise.reject(null);
                }
                return info.passwordrequired;
            });
        }
        return Promise.reject(null);
    };
    /**
     * Convenience function to get course. We use this to determine if a user can see the course or not.
     *
     * @param {boolean} refresh Whether the user is refreshing the data.
     */
    CoreCoursesCoursePreviewPage.prototype.getCourse = function (refresh) {
        var _this = this;
        // Get course enrolment methods.
        this.selfEnrolInstances = [];
        return this.coursesProvider.getCourseEnrolmentMethods(this.course.id).then(function (methods) {
            _this.enrollmentMethods = methods;
            _this.enrollmentMethods.forEach(function (method) {
                if (method.type === 'self') {
                    _this.selfEnrolInstances.push(method);
                }
                else if (_this.guestWSAvailable && method.type === 'guest') {
                    _this.isGuestEnabled = true;
                }
            });
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'Error getting enrolment data');
        }).then(function () {
            // Check if user is enrolled in the course.
            return _this.coursesProvider.getUserCourse(_this.course.id).then(function (course) {
                _this.isEnrolled = true;
                return course;
            }).catch(function () {
                // The user is not enrolled in the course. Use getCourses to see if it's an admin/manager and can see the course.
                _this.isEnrolled = false;
                return _this.coursesProvider.getCourse(_this.course.id);
            }).then(function (course) {
                // Success retrieving the course, we can assume the user has permissions to view it.
                _this.course.fullname = course.fullname || _this.course.fullname;
                _this.course.summary = course.summary || _this.course.summary;
                _this.canAccessCourse = true;
            }).catch(function () {
                // The user is not an admin/manager. Check if we can provide guest access to the course.
                return _this.canAccessAsGuest().then(function (passwordRequired) {
                    _this.canAccessCourse = !passwordRequired;
                }).catch(function () {
                    _this.canAccessCourse = false;
                });
            });
        }).finally(function () {
            if (!_this.sitesProvider.getCurrentSite().isVersionGreaterEqualThan('3.7')) {
                return _this.coursesProvider.isGetCoursesByFieldAvailableInSite().then(function (available) {
                    if (available) {
                        return _this.coursesProvider.getCourseByField('id', _this.course.id).then(function (course) {
                            _this.course.customfields = course.customfields;
                        });
                    }
                }).catch(function () {
                    // Ignore errors.
                });
            }
        }).finally(function () {
            _this.dataLoaded = true;
        });
    };
    /**
     * Open the course.
     */
    CoreCoursesCoursePreviewPage.prototype.openCourse = function () {
        if (!this.canAccessCourse || this.avoidOpenCourse) {
            // Course cannot be opened or we are avoiding opening because we accessed from inside a course.
            return;
        }
        this.courseFormatDelegate.openCourse(this.navCtrl, this.course);
    };
    /**
     * Enrol using PayPal.
     */
    CoreCoursesCoursePreviewPage.prototype.paypalEnrol = function () {
        var _this = this;
        var window, hasReturnedFromPaypal = false, inAppLoadSubscription, inAppFinishSubscription, inAppExitSubscription, appResumeSubscription;
        var urlLoaded = function (event) {
            if (event.url.indexOf(_this.paypalReturnUrl) != -1) {
                hasReturnedFromPaypal = true;
            }
            else if (event.url.indexOf(_this.courseUrl) != -1 && hasReturnedFromPaypal) {
                // User reached the course index page after returning from PayPal, close the InAppBrowser.
                inAppClosed();
                window.close();
            }
        }, inAppClosed = function () {
            // InAppBrowser closed, refresh data.
            unsubscribeAll();
            if (!_this.dataLoaded) {
                return;
            }
            _this.dataLoaded = false;
            _this.refreshData();
        }, unsubscribeAll = function () {
            inAppLoadSubscription && inAppLoadSubscription.unsubscribe();
            inAppFinishSubscription && inAppFinishSubscription.unsubscribe();
            inAppExitSubscription && inAppExitSubscription.unsubscribe();
            appResumeSubscription && appResumeSubscription.unsubscribe();
        };
        // Open the enrolment page in InAppBrowser.
        this.sitesProvider.getCurrentSite().openInAppWithAutoLogin(this.enrolUrl).then(function (w) {
            window = w;
            if (_this.isDesktop || _this.isMobile) {
                // Observe loaded pages in the InAppBrowser to check if the enrol process has ended.
                inAppLoadSubscription = window.on('loadstart').subscribe(function (event) {
                    // Execute the callback in the Angular zone, so change detection doesn't stop working.
                    _this.zone.run(function () { return urlLoaded(event); });
                });
                // Observe window closed.
                inAppExitSubscription = window.on('exit').subscribe(function () {
                    // Execute the callback in the Angular zone, so change detection doesn't stop working.
                    _this.zone.run(inAppClosed);
                });
            }
            if (_this.isDesktop) {
                // In desktop, also observe stop loading since some pages don't throw the loadstart event.
                inAppFinishSubscription = window.on('loadstop').subscribe(urlLoaded);
                // Since the user can switch windows, reload the data if he comes back to the app.
                appResumeSubscription = _this.platform.resume.subscribe(function () {
                    if (!_this.dataLoaded) {
                        return;
                    }
                    _this.dataLoaded = false;
                    _this.refreshData();
                });
            }
        });
    };
    /**
     * User clicked in a self enrol button.
     *
     * @param {number} instanceId The instance ID of the enrolment method.
     */
    CoreCoursesCoursePreviewPage.prototype.selfEnrolClicked = function (instanceId) {
        var _this = this;
        this.domUtils.showConfirm(this.translate.instant('core.courses.confirmselfenrol')).then(function () {
            _this.selfEnrolInCourse('', instanceId);
        }).catch(function () {
            // User cancelled.
        });
    };
    /**
     * Self enrol in a course.
     *
     * @param {string} password Password to use.
     * @param {number} instanceId The instance ID.
     * @return {Promise<any>} Promise resolved when self enrolled.
     */
    CoreCoursesCoursePreviewPage.prototype.selfEnrolInCourse = function (password, instanceId) {
        var _this = this;
        var modal = this.domUtils.showModalLoading('core.loading', true);
        return this.coursesProvider.selfEnrol(this.course.id, password, instanceId).then(function () {
            // Close modal and refresh data.
            _this.isEnrolled = true;
            _this.dataLoaded = false;
            // Sometimes the list of enrolled courses takes a while to be updated. Wait for it.
            _this.waitForEnrolled(true).then(function () {
                _this.refreshData().finally(function () {
                    // My courses have been updated, trigger event.
                    _this.eventsProvider.trigger(courses["a" /* CoreCoursesProvider */].EVENT_MY_COURSES_UPDATED, { course: _this.course }, _this.sitesProvider.getCurrentSiteId());
                });
            });
        }).catch(function (error) {
            if (error && error.code === courses["a" /* CoreCoursesProvider */].ENROL_INVALID_KEY) {
                // Invalid password, show the modal to enter the password.
                _this.selfEnrolModal.present();
                _this.currentInstanceId = instanceId;
                if (!password) {
                    // No password entered, don't show error.
                    return;
                }
            }
            _this.domUtils.showErrorModalDefault(error, 'core.courses.errorselfenrol', true);
        }).finally(function () {
            modal.dismiss();
        });
    };
    /**
     * Refresh the data.
     *
     * @param {any} [refresher] The refresher if this was triggered by a Pull To Refresh.
     */
    CoreCoursesCoursePreviewPage.prototype.refreshData = function (refresher) {
        var _this = this;
        var promises = [];
        promises.push(this.coursesProvider.invalidateUserCourses());
        promises.push(this.coursesProvider.invalidateCourse(this.course.id));
        promises.push(this.coursesProvider.invalidateCourseEnrolmentMethods(this.course.id));
        promises.push(this.courseOptionsDelegate.clearAndInvalidateCoursesOptions(this.course.id));
        if (this.sitesProvider.getCurrentSite().isVersionGreaterEqualThan('3.7')) {
            promises.push(this.coursesProvider.invalidateCoursesByField('id', this.course.id));
        }
        if (this.guestInstanceId) {
            promises.push(this.coursesProvider.invalidateCourseGuestEnrolmentInfo(this.guestInstanceId));
        }
        return Promise.all(promises).finally(function () {
            return _this.getCourse(true);
        }).finally(function () {
            if (refresher) {
                refresher.complete();
            }
        });
    };
    /**
     * Update the course status icon and title.
     *
     * @param {string} status Status to show.
     */
    CoreCoursesCoursePreviewPage.prototype.updateCourseStatus = function (status) {
        var statusData = this.courseHelper.getCourseStatusIconAndTitleFromStatus(status);
        this.prefetchCourseData.prefetchCourseIcon = statusData.icon;
        this.prefetchCourseData.title = statusData.title;
    };
    /**
     * Wait for the user to be enrolled in the course.
     *
     * @param {boolean} first If it's the first call (true) or it's a recursive call (false).
     * @return {Promise<any>} Promise resolved when enrolled or timeout.
     */
    CoreCoursesCoursePreviewPage.prototype.waitForEnrolled = function (first) {
        var _this = this;
        if (first) {
            this.waitStart = Date.now();
        }
        // Check if user is enrolled in the course.
        return this.coursesProvider.invalidateUserCourses().catch(function () {
            // Ignore errors.
        }).then(function () {
            return _this.coursesProvider.getUserCourse(_this.course.id);
        }).catch(function () {
            // Not enrolled, wait a bit and try again.
            if (_this.pageDestroyed || (Date.now() - _this.waitStart > 60000)) {
                // Max time reached or the user left the view, stop.
                return;
            }
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    if (!_this.pageDestroyed) {
                        // Wait again.
                        _this.waitForEnrolled().then(resolve);
                    }
                    else {
                        resolve();
                    }
                }, 5000);
            });
        });
    };
    /**
     * Prefetch the course.
     */
    CoreCoursesCoursePreviewPage.prototype.prefetchCourse = function () {
        var _this = this;
        this.courseHelper.confirmAndPrefetchCourse(this.prefetchCourseData, this.course).catch(function (error) {
            if (!_this.pageDestroyed) {
                _this.domUtils.showErrorModalDefault(error, 'core.course.errordownloadingcourse', true);
            }
        });
    };
    CoreCoursesCoursePreviewPage = __decorate([
        Object(core["m" /* Component */])({
            selector: 'page-core-courses-course-preview',
            templateUrl: 'course-preview.html',
        }),
        __metadata("design:paramtypes", [ionic_angular["s" /* NavController */], ionic_angular["t" /* NavParams */], sites["a" /* CoreSitesProvider */],
            dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], app["a" /* CoreAppProvider */],
            courses["a" /* CoreCoursesProvider */], ionic_angular["v" /* Platform */], ionic_angular["q" /* ModalController */],
            _ngx_translate_core["c" /* TranslateService */], events["a" /* CoreEventsProvider */],
            options_delegate["a" /* CoreCourseOptionsDelegate */], helper["a" /* CoreCourseHelperProvider */],
            course["a" /* CoreCourseProvider */], format_delegate["a" /* CoreCourseFormatDelegate */],
            core["M" /* NgZone */]])
    ], CoreCoursesCoursePreviewPage);
    return CoreCoursesCoursePreviewPage;
}());

//# sourceMappingURL=course-preview.js.map
// EXTERNAL MODULE: ./src/components/components.module.ts
var components_module = __webpack_require__(29);

// EXTERNAL MODULE: ./src/directives/directives.module.ts + 2 modules
var directives_module = __webpack_require__(31);

// EXTERNAL MODULE: ./src/pipes/pipes.module.ts + 2 modules
var pipes_module = __webpack_require__(109);

// CONCATENATED MODULE: ./src/core/courses/pages/course-preview/course-preview.module.ts
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
var course_preview_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var course_preview_module_CoreCoursesCoursePreviewPageModule = /** @class */ (function () {
    function CoreCoursesCoursePreviewPageModule() {
    }
    CoreCoursesCoursePreviewPageModule = course_preview_module___decorate([
        Object(core["I" /* NgModule */])({
            declarations: [
                course_preview_CoreCoursesCoursePreviewPage,
            ],
            imports: [
                components_module["a" /* CoreComponentsModule */],
                directives_module["a" /* CoreDirectivesModule */],
                pipes_module["a" /* CorePipesModule */],
                ionic_angular["l" /* IonicPageModule */].forChild(course_preview_CoreCoursesCoursePreviewPage),
                _ngx_translate_core["b" /* TranslateModule */].forChild()
            ],
        })
    ], CoreCoursesCoursePreviewPageModule);
    return CoreCoursesCoursePreviewPageModule;
}());

//# sourceMappingURL=course-preview.module.js.map
// EXTERNAL MODULE: ./node_modules/ionic-angular/components/action-sheet/action-sheet-component.ngfactory.js
var action_sheet_component_ngfactory = __webpack_require__(1468);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/alert/alert-component.ngfactory.js
var alert_component_ngfactory = __webpack_require__(1469);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/app/app-root.ngfactory.js
var app_root_ngfactory = __webpack_require__(1470);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/loading/loading-component.ngfactory.js
var loading_component_ngfactory = __webpack_require__(1471);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/modal/modal-component.ngfactory.js
var modal_component_ngfactory = __webpack_require__(1472);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/picker/picker-component.ngfactory.js + 1 modules
var picker_component_ngfactory = __webpack_require__(1473);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/popover/popover-component.ngfactory.js
var popover_component_ngfactory = __webpack_require__(1474);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/select/select-popover-component.ngfactory.js
var select_popover_component_ngfactory = __webpack_require__(1475);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toast/toast-component.ngfactory.js
var toast_component_ngfactory = __webpack_require__(1476);

// EXTERNAL MODULE: ./src/components/context-menu/context-menu-popover.ngfactory.js
var context_menu_popover_ngfactory = __webpack_require__(1479);

// EXTERNAL MODULE: ./src/components/course-picker-menu/course-picker-menu-popover.ngfactory.js
var course_picker_menu_popover_ngfactory = __webpack_require__(1480);

// EXTERNAL MODULE: ./src/components/recaptcha/recaptchamodal.ngfactory.js
var recaptchamodal_ngfactory = __webpack_require__(1481);

// EXTERNAL MODULE: ./src/components/bs-tooltip/bs-tooltip.ngfactory.js
var bs_tooltip_ngfactory = __webpack_require__(1482);

// EXTERNAL MODULE: ./src/directives/external-content.ts
var external_content = __webpack_require__(223);

// EXTERNAL MODULE: ./src/providers/logger.ts
var logger = __webpack_require__(5);

// EXTERNAL MODULE: ./src/providers/filepool.ts
var filepool = __webpack_require__(17);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/platform.js + 1 modules
var platform_platform = __webpack_require__(16);

// EXTERNAL MODULE: ./src/providers/utils/url.ts
var url = __webpack_require__(23);

// EXTERNAL MODULE: ./src/providers/utils/utils.ts
var utils = __webpack_require__(2);

// EXTERNAL MODULE: ./src/directives/format-text.ts
var format_text = __webpack_require__(41);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.service.js
var translate_service = __webpack_require__(18);

// EXTERNAL MODULE: ./src/core/contentlinks/providers/helper.ts
var providers_helper = __webpack_require__(14);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-controller.js
var nav_controller = __webpack_require__(19);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.js
var content = __webpack_require__(25);

// EXTERNAL MODULE: ./src/components/split-view/split-view.ts
var split_view = __webpack_require__(26);

// EXTERNAL MODULE: ./src/providers/utils/iframe.ts
var iframe = __webpack_require__(37);

// EXTERNAL MODULE: ./node_modules/@angular/common/esm5/common.js
var common = __webpack_require__(8);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item.ngfactory.js + 1 modules
var item_ngfactory = __webpack_require__(30);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item.js
var item = __webpack_require__(21);

// EXTERNAL MODULE: ./node_modules/ionic-angular/util/form.js
var util_form = __webpack_require__(20);

// EXTERNAL MODULE: ./node_modules/ionic-angular/config/config.js
var config = __webpack_require__(7);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-reorder.js + 1 modules
var item_reorder = __webpack_require__(27);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-content.js
var item_content = __webpack_require__(32);

// EXTERNAL MODULE: ./src/directives/user-link.ts
var user_link = __webpack_require__(474);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.pipe.js
var translate_pipe = __webpack_require__(28);

// EXTERNAL MODULE: ./src/components/user-avatar/user-avatar.ngfactory.js
var user_avatar_ngfactory = __webpack_require__(208);

// EXTERNAL MODULE: ./src/components/user-avatar/user-avatar.ts
var user_avatar = __webpack_require__(177);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/avatar/avatar.js
var avatar = __webpack_require__(167);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-divider.js
var item_divider = __webpack_require__(93);

// EXTERNAL MODULE: ./src/components/file/file.ngfactory.js
var file_ngfactory = __webpack_require__(209);

// EXTERNAL MODULE: ./src/components/file/file.ts
var file = __webpack_require__(180);

// EXTERNAL MODULE: ./src/providers/file-helper.ts
var file_helper = __webpack_require__(134);

// EXTERNAL MODULE: ./src/providers/utils/mimetype.ts
var mimetype = __webpack_require__(66);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.ngfactory.js
var button_ngfactory = __webpack_require__(45);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.js
var button_button = __webpack_require__(42);

// EXTERNAL MODULE: ./src/components/icon/icon.ngfactory.js
var icon_ngfactory = __webpack_require__(111);

// EXTERNAL MODULE: ./src/components/icon/icon.ts
var icon = __webpack_require__(94);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/icon/icon.js
var icon_icon = __webpack_require__(46);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/spinner/spinner.ngfactory.js
var spinner_ngfactory = __webpack_require__(128);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/spinner/spinner.js
var spinner = __webpack_require__(112);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/list/list.js + 1 modules
var list = __webpack_require__(82);

// EXTERNAL MODULE: ./node_modules/ionic-angular/gestures/gesture-controller.js
var gesture_controller = __webpack_require__(40);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/dom-controller.js
var dom_controller = __webpack_require__(33);

// EXTERNAL MODULE: ./src/directives/link.ts
var directives_link = __webpack_require__(181);

// EXTERNAL MODULE: ./src/pipes/format-date.ts
var format_date = __webpack_require__(244);

// EXTERNAL MODULE: ./src/providers/utils/time.ts
var time = __webpack_require__(24);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-header.js
var toolbar_header = __webpack_require__(468);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/view-controller.js
var view_controller = __webpack_require__(38);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/navbar.ngfactory.js
var navbar_ngfactory = __webpack_require__(1477);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/navbar.js
var navbar = __webpack_require__(221);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/app/app.js + 3 modules
var app_app = __webpack_require__(34);

// EXTERNAL MODULE: ./src/directives/back-button.ts
var back_button = __webpack_require__(711);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.ngfactory.js
var toolbar_title_ngfactory = __webpack_require__(1478);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.js
var toolbar_title = __webpack_require__(364);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar.js
var toolbar = __webpack_require__(267);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.ngfactory.js
var content_ngfactory = __webpack_require__(176);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/keyboard.js
var keyboard = __webpack_require__(101);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/refresher/refresher.js
var refresher = __webpack_require__(151);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/refresher/refresher-content.ngfactory.js
var refresher_content_ngfactory = __webpack_require__(207);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/refresher/refresher-content.js
var refresher_content = __webpack_require__(166);

// EXTERNAL MODULE: ./src/components/loading/loading.ngfactory.js
var loading_ngfactory = __webpack_require__(50);

// EXTERNAL MODULE: ./src/components/loading/loading.ts
var loading = __webpack_require__(47);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-params.js
var nav_params = __webpack_require__(70);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/modal/modal-controller.js
var modal_controller = __webpack_require__(178);

// CONCATENATED MODULE: ./src/core/courses/pages/course-preview/course-preview.ngfactory.js
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 









































































var styles_CoreCoursesCoursePreviewPage = [];
var RenderType_CoreCoursesCoursePreviewPage = core["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_CoreCoursesCoursePreviewPage, data: {} });

function View_CoreCoursesCoursePreviewPage_2(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 4, "div", [["class", "core-course-thumb"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.openCourse() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ɵeld */](2, 0, null, null, 1, "img", [["alt", ""], ["core-external-content", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](3, 4734976, null, 0, external_content["a" /* CoreExternalContentDirective */], [core["t" /* ElementRef */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], platform_platform["a" /* Platform */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], app["a" /* CoreAppProvider */], utils["a" /* CoreUtilsProvider */]], { src: [0, "src"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.course.courseImage; _ck(_v, 3, 0, currVal_0); }, null); }
function View_CoreCoursesCoursePreviewPage_3(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "p", [], null, null, null, null, null)), (_l()(), core["_31" /* ɵeld */](1, 0, null, null, 1, "core-format-text", [], null, null, null, null, null)), core["_30" /* ɵdid */](2, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform_platform["a" /* Platform */], utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], app["a" /* CoreAppProvider */], providers_helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */]], { text: [0, "text"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.course.categoryname; _ck(_v, 2, 0, currVal_0); }, null); }
function View_CoreCoursesCoursePreviewPage_5(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "span", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](1, null, [" - ", ""])), core["_49" /* ɵppd */](2, 2)], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = core["_56" /* ɵunv */](_v, 1, 0, _ck(_v, 2, 0, core["_44" /* ɵnov */](_v.parent.parent.parent, 0), (_co.course.enddate * 1000), "strftimedatefullshort")); _ck(_v, 1, 0, currVal_0); }); }
function View_CoreCoursesCoursePreviewPage_4(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 4, "p", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](1, null, ["", " "])), core["_49" /* ɵppd */](2, 2), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreCoursesCoursePreviewPage_5)), core["_30" /* ɵdid */](4, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_1 = _co.course.enddate; _ck(_v, 4, 0, currVal_1); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = core["_56" /* ɵunv */](_v, 1, 0, _ck(_v, 2, 0, core["_44" /* ɵnov */](_v.parent.parent, 0), (_co.course.startdate * 1000), "strftimedatefullshort")); _ck(_v, 1, 0, currVal_0); }); }
function View_CoreCoursesCoursePreviewPage_6(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 9, "ion-item", [["class", "item item-block"], ["detail-none", ""], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 4, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 5, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 6, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 2, 1, "core-format-text", [["maxHeight", "120"]], null, null, null, null, null)), core["_30" /* ɵdid */](8, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform_platform["a" /* Platform */], utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], app["a" /* CoreAppProvider */], providers_helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */]], { text: [0, "text"], maxHeight: [1, "maxHeight"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.course.summary; var currVal_1 = "120"; _ck(_v, 8, 0, currVal_0, currVal_1); }, null); }
function View_CoreCoursesCoursePreviewPage_8(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 15, "a", [["class", "item item-block"], ["core-user-link", ""], ["ion-item", ""], ["text-wrap", ""]], [[1, "aria-label", 0]], null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 81920, null, 0, user_link["a" /* CoreUserLinkDirective */], [core["t" /* ElementRef */], [2, nav_controller["a" /* NavController */]], [2, split_view["a" /* CoreSplitViewComponent */]]], { userId: [0, "userId"], courseId: [1, "courseId"] }, null), core["_30" /* ɵdid */](2, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 10, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 11, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 12, { _icons: 1 }), core["_30" /* ɵdid */](6, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](9, 0, null, 0, 2, "ion-avatar", [["core-user-avatar", ""], ["item-start", ""]], null, null, null, user_avatar_ngfactory["b" /* View_CoreUserAvatarComponent_0 */], user_avatar_ngfactory["a" /* RenderType_CoreUserAvatarComponent */])), core["_30" /* ɵdid */](10, 770048, null, 0, user_avatar["a" /* CoreUserAvatarComponent */], [nav_controller["a" /* NavController */], sites["a" /* CoreSitesProvider */], utils["a" /* CoreUtilsProvider */], app["a" /* CoreAppProvider */], events["a" /* CoreEventsProvider */], [2, split_view["a" /* CoreSplitViewComponent */]]], { user: [0, "user"], userId: [1, "userId"], courseId: [2, "courseId"] }, null), core["_30" /* ɵdid */](11, 16384, null, 0, avatar["a" /* Avatar */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](13, 0, null, 2, 1, "h2", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](14, null, ["", ""])), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "]))], function (_ck, _v) { var _co = _v.component; var currVal_1 = _v.context.$implicit.id; var currVal_2 = (_co.isEnrolled ? _co.course.id : null); _ck(_v, 1, 0, currVal_1, currVal_2); var currVal_3 = _v.context.$implicit; var currVal_4 = _v.context.$implicit.id; var currVal_5 = (_co.isEnrolled ? _co.course.id : null); _ck(_v, 10, 0, currVal_3, currVal_4, currVal_5); }, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 0, 0, core["_44" /* ɵnov */](_v, 7).transform("core.viewprofile")); _ck(_v, 0, 0, currVal_0); var currVal_6 = _v.context.$implicit.fullname; _ck(_v, 14, 0, currVal_6); }); }
function View_CoreCoursesCoursePreviewPage_7(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 20, null, null, null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ɵeld */](2, 0, null, null, 7, "ion-item-divider", [["class", "item item-divider"]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](3, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 7, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 8, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 9, { _icons: 1 }), core["_30" /* ɵdid */](7, 16384, null, 0, item_divider["a" /* ItemDivider */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](8, 2, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreCoursesCoursePreviewPage_8)), core["_30" /* ɵdid */](12, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ɵeld */](14, 0, null, null, 5, "ion-item-divider", [["class", "item item-divider"]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](15, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 13, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 14, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 15, { _icons: 1 }), core["_30" /* ɵdid */](19, 16384, null, 0, item_divider["a" /* ItemDivider */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "]))], function (_ck, _v) { var _co = _v.component; var currVal_1 = _co.course.contacts; _ck(_v, 12, 0, currVal_1); }, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 8, 0, core["_44" /* ɵnov */](_v, 9).transform("core.teachers")); _ck(_v, 8, 0, currVal_0); }); }
function View_CoreCoursesCoursePreviewPage_11(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 11, "div", [], [[8, "className", 0]], null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](2, 0, null, null, 2, "span", [["class", "core-customfieldname"]], null, null, null, null, null)), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 1, "core-format-text", [], null, null, null, null, null)), core["_30" /* ɵdid */](4, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform_platform["a" /* Platform */], utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], app["a" /* CoreAppProvider */], providers_helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */]], { text: [0, "text"] }, null), (_l()(), core["_31" /* ɵeld */](5, 0, null, null, 1, "span", [["class", "core-customfieldseparator"]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, [": "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](8, 0, null, null, 2, "span", [["class", "core-customfieldvalue"]], null, null, null, null, null)), (_l()(), core["_31" /* ɵeld */](9, 0, null, null, 1, "core-format-text", [["maxHeight", "120"]], null, null, null, null, null)), core["_30" /* ɵdid */](10, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform_platform["a" /* Platform */], utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], app["a" /* CoreAppProvider */], providers_helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */]], { text: [0, "text"], maxHeight: [1, "maxHeight"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "]))], function (_ck, _v) { var currVal_1 = _v.parent.context.$implicit.name; _ck(_v, 4, 0, currVal_1); var currVal_2 = _v.parent.context.$implicit.value; var currVal_3 = "120"; _ck(_v, 10, 0, currVal_2, currVal_3); }, function (_ck, _v) { var currVal_0 = core["_34" /* ɵinlineInterpolate */](2, "core-customfield core-customfield_", _v.parent.context.$implicit.type, " core-customfield_", _v.parent.context.$implicit.shortname, ""); _ck(_v, 0, 0, currVal_0); }); }
function View_CoreCoursesCoursePreviewPage_10(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 4, null, null, null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreCoursesCoursePreviewPage_11)), core["_30" /* ɵdid */](3, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "]))], function (_ck, _v) { var currVal_0 = _v.context.$implicit.value; _ck(_v, 3, 0, currVal_0); }, null); }
function View_CoreCoursesCoursePreviewPage_9(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 9, "ion-item", [["class", "item item-block"], ["detail-none", ""], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 16, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 17, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 18, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, 2, 1, null, View_CoreCoursesCoursePreviewPage_10)), core["_30" /* ɵdid */](8, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.course.customfields; _ck(_v, 8, 0, currVal_0); }, null); }
function View_CoreCoursesCoursePreviewPage_12(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "core-file", [], null, null, null, file_ngfactory["b" /* View_CoreFileComponent_0 */], file_ngfactory["a" /* RenderType_CoreFileComponent */])), core["_30" /* ɵdid */](1, 245760, null, 0, file["a" /* CoreFileComponent */], [sites["a" /* CoreSitesProvider */], utils["a" /* CoreUtilsProvider */], dom["a" /* CoreDomUtilsProvider */], filepool["a" /* CoreFilepoolProvider */], app["a" /* CoreAppProvider */], file_helper["a" /* CoreFileHelperProvider */], mimetype["a" /* CoreMimetypeUtilsProvider */], events["a" /* CoreEventsProvider */], utils_text["a" /* CoreTextUtilsProvider */]], { file: [0, "file"], component: [1, "component"], componentId: [2, "componentId"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _v.context.$implicit; var currVal_1 = _co.component; var currVal_2 = _co.course.id; _ck(_v, 1, 0, currVal_0, currVal_1, currVal_2); }, null); }
function View_CoreCoursesCoursePreviewPage_14(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 14, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 19, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 20, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 21, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 2, 1, "h2", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](8, null, ["", ""])), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](10, 0, null, 2, 3, "button", [["block", ""], ["ion-button", ""], ["margin-top", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.selfEnrolClicked(_v.context.$implicit.id) !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](11, 1097728, [[20, 4]], 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { block: [0, "block"] }, null), (_l()(), core["_55" /* ɵted */](12, 0, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "]))], function (_ck, _v) { var currVal_1 = ""; _ck(_v, 11, 0, currVal_1); }, function (_ck, _v) { var currVal_0 = _v.context.$implicit.name; _ck(_v, 8, 0, currVal_0); var currVal_2 = core["_56" /* ɵunv */](_v, 12, 0, core["_44" /* ɵnov */](_v, 13).transform("core.courses.enrolme")); _ck(_v, 12, 0, currVal_2); }); }
function View_CoreCoursesCoursePreviewPage_13(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 4, "div", [["detail-none", ""]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreCoursesCoursePreviewPage_14)), core["_30" /* ɵdid */](3, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.selfEnrolInstances; _ck(_v, 3, 0, currVal_0); }, null); }
function View_CoreCoursesCoursePreviewPage_15(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 19, "ion-item", [["class", "item item-block"], ["detail-none", ""], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 22, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 23, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 24, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 2, 2, "h2", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](8, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](11, 0, null, 2, 2, "p", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](12, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](15, 0, null, 2, 3, "button", [["block", ""], ["ion-button", ""], ["margin-top", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.paypalEnrol() !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](16, 1097728, [[23, 4]], 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { block: [0, "block"] }, null), (_l()(), core["_55" /* ɵted */](17, 0, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "]))], function (_ck, _v) { var currVal_2 = ""; _ck(_v, 16, 0, currVal_2); }, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 8, 0, core["_44" /* ɵnov */](_v, 9).transform("core.courses.paypalaccepted")); _ck(_v, 8, 0, currVal_0); var currVal_1 = core["_56" /* ɵunv */](_v, 12, 0, core["_44" /* ɵnov */](_v, 13).transform("core.paymentinstant")); _ck(_v, 12, 0, currVal_1); var currVal_3 = core["_56" /* ɵunv */](_v, 17, 0, core["_44" /* ɵnov */](_v, 18).transform("core.courses.sendpaymentbutton")); _ck(_v, 17, 0, currVal_3); }); }
function View_CoreCoursesCoursePreviewPage_16(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 10, "ion-item", [["class", "item item-block"]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 25, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 26, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 27, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 2, 2, "p", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](8, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "]))], null, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 8, 0, core["_44" /* ɵnov */](_v, 9).transform("core.courses.notenrollable")); _ck(_v, 8, 0, currVal_0); }); }
function View_CoreCoursesCoursePreviewPage_18(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "core-icon", [["item-start", ""]], null, null, null, icon_ngfactory["b" /* View_CoreIconComponent_0 */], icon_ngfactory["a" /* RenderType_CoreIconComponent */])), core["_30" /* ɵdid */](1, 704512, null, 0, icon["a" /* CoreIconComponent */], [core["t" /* ElementRef */], config["a" /* Config */]], { name: [0, "name"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.prefetchCourseData.prefetchCourseIcon; _ck(_v, 1, 0, currVal_0); }, null); }
function View_CoreCoursesCoursePreviewPage_19(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "ion-icon", [["color", "success"], ["item-start", ""], ["name", "cloud-done"], ["role", "img"]], [[1, "aria-label", 0], [2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](1, 147456, [[30, 4]], 0, icon_icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { color: [0, "color"], name: [1, "name"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], function (_ck, _v) { var currVal_2 = "success"; var currVal_3 = "cloud-done"; _ck(_v, 1, 0, currVal_2, currVal_3); }, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 0, 0, core["_44" /* ɵnov */](_v, 2).transform("core.downloaded")); var currVal_1 = core["_44" /* ɵnov */](_v, 1)._hidden; _ck(_v, 0, 0, currVal_0, currVal_1); }); }
function View_CoreCoursesCoursePreviewPage_20(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "ion-spinner", [["item-start", ""]], [[2, "spinner-paused", null]], null, null, spinner_ngfactory["b" /* View_Spinner_0 */], spinner_ngfactory["a" /* RenderType_Spinner */])), core["_30" /* ɵdid */](1, 114688, null, 0, spinner["a" /* Spinner */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 1)._paused; _ck(_v, 0, 0, currVal_0); }); }
function View_CoreCoursesCoursePreviewPage_17(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 20, "a", [["class", "item item-block"], ["detail-none", ""], ["ion-item", ""]], [[1, "aria-label", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.prefetchCourse() !== false);
        ad = (pd_0 && ad);
    } return ad; }, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 28, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 29, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 30, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_CoreCoursesCoursePreviewPage_18)), core["_30" /* ɵdid */](9, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_CoreCoursesCoursePreviewPage_19)), core["_30" /* ɵdid */](12, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_CoreCoursesCoursePreviewPage_20)), core["_30" /* ɵdid */](15, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](17, 0, null, 2, 2, "h2", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](18, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "]))], function (_ck, _v) { var _co = _v.component; var currVal_1 = (!_co.prefetchCourseData.downloadSucceeded && (_co.prefetchCourseData.prefetchCourseIcon != "spinner")); _ck(_v, 9, 0, currVal_1); var currVal_2 = (_co.prefetchCourseData.downloadSucceeded && (_co.prefetchCourseData.prefetchCourseIcon != "spinner")); _ck(_v, 12, 0, currVal_2); var currVal_3 = (_co.prefetchCourseData.prefetchCourseIcon == "spinner"); _ck(_v, 15, 0, currVal_3); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = core["_56" /* ɵunv */](_v, 0, 0, core["_44" /* ɵnov */](_v, 6).transform(_co.prefetchCourseData.title)); _ck(_v, 0, 0, currVal_0); var currVal_4 = core["_56" /* ɵunv */](_v, 18, 0, core["_44" /* ɵnov */](_v, 19).transform("core.course.downloadcourse")); _ck(_v, 18, 0, currVal_4); }); }
function View_CoreCoursesCoursePreviewPage_21(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 13, "a", [["class", "item item-block"], ["ion-item", ""]], [[8, "title", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.openCourse() !== false);
        ad = (pd_0 && ad);
    } return ad; }, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 31, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 32, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 33, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 0, 1, "ion-icon", [["item-start", ""], ["name", "briefcase"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](8, 147456, [[33, 4]], 0, icon_icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](10, 0, null, 2, 2, "h2", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](11, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "]))], function (_ck, _v) { var currVal_2 = "briefcase"; _ck(_v, 8, 0, currVal_2); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.course.fullname; _ck(_v, 0, 0, currVal_0); var currVal_1 = core["_44" /* ɵnov */](_v, 8)._hidden; _ck(_v, 7, 0, currVal_1); var currVal_3 = core["_56" /* ɵunv */](_v, 11, 0, core["_44" /* ɵnov */](_v, 12).transform("core.course.contents")); _ck(_v, 11, 0, currVal_3); }); }
function View_CoreCoursesCoursePreviewPage_1(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 69, "ion-list", [], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, list["a" /* List */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], platform_platform["a" /* Platform */], gesture_controller["l" /* GestureController */], dom_controller["a" /* DomController */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreCoursesCoursePreviewPage_2)), core["_30" /* ɵdid */](4, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](6, 0, null, null, 19, "a", [["class", "item item-block"], ["ion-item", ""], ["text-wrap", ""]], [[8, "title", 0], [1, "detail-none", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.openCourse() !== false);
        ad = (pd_0 && ad);
    } return ad; }, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](7, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 1, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 2, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 3, { _icons: 1 }), core["_30" /* ɵdid */](11, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](13, 0, null, 0, 1, "core-icon", [["fixed-width", ""], ["item-start", ""], ["name", "fa-graduation-cap"]], null, null, null, icon_ngfactory["b" /* View_CoreIconComponent_0 */], icon_ngfactory["a" /* RenderType_CoreIconComponent */])), core["_30" /* ɵdid */](14, 704512, null, 0, icon["a" /* CoreIconComponent */], [core["t" /* ElementRef */], config["a" /* Config */]], { name: [0, "name"], fixedWidth: [1, "fixedWidth"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](16, 0, null, 2, 2, "h2", [], null, null, null, null, null)), (_l()(), core["_31" /* ɵeld */](17, 0, null, null, 1, "core-format-text", [], null, null, null, null, null)), core["_30" /* ɵdid */](18, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform_platform["a" /* Platform */], utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], app["a" /* CoreAppProvider */], providers_helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */]], { text: [0, "text"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, 2, 1, null, View_CoreCoursesCoursePreviewPage_3)), core["_30" /* ɵdid */](21, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, 2, 1, null, View_CoreCoursesCoursePreviewPage_4)), core["_30" /* ɵdid */](24, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreCoursesCoursePreviewPage_6)), core["_30" /* ɵdid */](28, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreCoursesCoursePreviewPage_7)), core["_30" /* ɵdid */](31, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreCoursesCoursePreviewPage_9)), core["_30" /* ɵdid */](34, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreCoursesCoursePreviewPage_12)), core["_30" /* ɵdid */](37, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreCoursesCoursePreviewPage_13)), core["_30" /* ɵdid */](40, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreCoursesCoursePreviewPage_15)), core["_30" /* ɵdid */](43, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreCoursesCoursePreviewPage_16)), core["_30" /* ɵdid */](46, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreCoursesCoursePreviewPage_17)), core["_30" /* ɵdid */](49, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreCoursesCoursePreviewPage_21)), core["_30" /* ɵdid */](52, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](54, 0, null, null, 14, "a", [["class", "item item-block"], ["core-link", ""], ["ion-item", ""]], [[8, "href", 4], [8, "title", 0]], null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](55, 81920, null, 0, directives_link["a" /* CoreLinkDirective */], [core["t" /* ElementRef */], dom["a" /* CoreDomUtilsProvider */], utils["a" /* CoreUtilsProvider */], sites["a" /* CoreSitesProvider */], url["a" /* CoreUrlUtilsProvider */], providers_helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], utils_text["a" /* CoreTextUtilsProvider */]], null, null), core["_30" /* ɵdid */](56, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 34, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 35, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 36, { _icons: 1 }), core["_30" /* ɵdid */](60, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](62, 0, null, 0, 1, "ion-icon", [["item-start", ""], ["name", "open"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](63, 147456, [[36, 4]], 0, icon_icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](65, 0, null, 2, 2, "h2", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](66, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.course.courseImage; _ck(_v, 4, 0, currVal_0); var currVal_3 = "fa-graduation-cap"; var currVal_4 = ""; _ck(_v, 14, 0, currVal_3, currVal_4); var currVal_5 = _co.course.fullname; _ck(_v, 18, 0, currVal_5); var currVal_6 = _co.course.categoryname; _ck(_v, 21, 0, currVal_6); var currVal_7 = _co.course.startdate; _ck(_v, 24, 0, currVal_7); var currVal_8 = _co.course.summary; _ck(_v, 28, 0, currVal_8); var currVal_9 = (_co.course.contacts && _co.course.contacts.length); _ck(_v, 31, 0, currVal_9); var currVal_10 = _co.course.customfields; _ck(_v, 34, 0, currVal_10); var currVal_11 = _co.course.overviewfiles; _ck(_v, 37, 0, currVal_11); var currVal_12 = !_co.isEnrolled; _ck(_v, 40, 0, currVal_12); var currVal_13 = (!_co.isEnrolled && _co.paypalEnabled); _ck(_v, 43, 0, currVal_13); var currVal_14 = ((!_co.isEnrolled && !_co.selfEnrolInstances.length) && !_co.paypalEnabled); _ck(_v, 46, 0, currVal_14); var currVal_15 = (_co.canAccessCourse && _co.downloadCourseEnabled); _ck(_v, 49, 0, currVal_15); var currVal_16 = (!_co.avoidOpenCourse && _co.canAccessCourse); _ck(_v, 52, 0, currVal_16); _ck(_v, 55, 0); var currVal_20 = "open"; _ck(_v, 63, 0, currVal_20); }, function (_ck, _v) { var _co = _v.component; var currVal_1 = _co.course.fullname; var currVal_2 = (_co.avoidOpenCourse || !_co.canAccessCourse); _ck(_v, 6, 0, currVal_1, currVal_2); var currVal_17 = _co.courseUrl; var currVal_18 = _co.course.fullname; _ck(_v, 54, 0, currVal_17, currVal_18); var currVal_19 = core["_44" /* ɵnov */](_v, 63)._hidden; _ck(_v, 62, 0, currVal_19); var currVal_21 = core["_56" /* ɵunv */](_v, 66, 0, core["_44" /* ɵnov */](_v, 67).transform("core.openinbrowser")); _ck(_v, 66, 0, currVal_21); }); }
function View_CoreCoursesCoursePreviewPage_0(_l) { return core["_57" /* ɵvid */](0, [core["_47" /* ɵpid */](0, format_date["a" /* CoreFormatDatePipe */], [logger["a" /* CoreLoggerProvider */], time["a" /* CoreTimeUtilsProvider */]]), (_l()(), core["_31" /* ɵeld */](1, 0, null, null, 12, "ion-header", [], null, null, null, null, null)), core["_30" /* ɵdid */](2, 16384, null, 0, toolbar_header["a" /* Header */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, view_controller["a" /* ViewController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_31" /* ɵeld */](4, 0, null, null, 8, "ion-navbar", [["class", "toolbar"], ["core-back-button", ""]], [[8, "hidden", 0], [2, "statusbar-padding", null]], null, null, navbar_ngfactory["b" /* View_Navbar_0 */], navbar_ngfactory["a" /* RenderType_Navbar */])), core["_30" /* ɵdid */](5, 49152, null, 0, navbar["a" /* Navbar */], [app_app["a" /* App */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_30" /* ɵdid */](6, 212992, null, 0, back_button["a" /* CoreBackButtonDirective */], [navbar["a" /* Navbar */], platform_platform["a" /* Platform */], translate_service["a" /* TranslateService */], events["a" /* CoreEventsProvider */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n        "])), (_l()(), core["_31" /* ɵeld */](8, 0, null, 3, 3, "ion-title", [], null, null, null, toolbar_title_ngfactory["b" /* View_ToolbarTitle_0 */], toolbar_title_ngfactory["a" /* RenderType_ToolbarTitle */])), core["_30" /* ɵdid */](9, 49152, null, 0, toolbar_title["a" /* ToolbarTitle */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), (_l()(), core["_31" /* ɵeld */](10, 0, null, 0, 1, "core-format-text", [], null, null, null, null, null)), core["_30" /* ɵdid */](11, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform_platform["a" /* Platform */], utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], app["a" /* CoreAppProvider */], providers_helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */]], { text: [0, "text"] }, null), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_31" /* ɵeld */](15, 0, null, null, 17, "ion-content", [], [[2, "statusbar-padding", null], [2, "has-refresher", null]], null, null, content_ngfactory["b" /* View_Content_0 */], content_ngfactory["a" /* RenderType_Content */])), core["_30" /* ɵdid */](16, 4374528, null, 0, content["a" /* Content */], [config["a" /* Config */], platform_platform["a" /* Platform */], dom_controller["a" /* DomController */], core["t" /* ElementRef */], core["V" /* Renderer */], app_app["a" /* App */], keyboard["a" /* Keyboard */], core["M" /* NgZone */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n    "])), (_l()(), core["_31" /* ɵeld */](18, 0, null, 2, 6, "ion-refresher", [], [[2, "refresher-active", null], [4, "top", null]], [[null, "ionRefresh"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("ionRefresh" === en)) {
        var pd_0 = (_co.refreshData($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), core["_30" /* ɵdid */](19, 212992, null, 0, refresher["a" /* Refresher */], [platform_platform["a" /* Platform */], content["a" /* Content */], core["M" /* NgZone */], gesture_controller["l" /* GestureController */]], { enabled: [0, "enabled"] }, { ionRefresh: "ionRefresh" }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_31" /* ɵeld */](21, 0, null, null, 2, "ion-refresher-content", [], [[1, "state", 0]], null, null, refresher_content_ngfactory["b" /* View_RefresherContent_0 */], refresher_content_ngfactory["a" /* RenderType_RefresherContent */])), core["_30" /* ɵdid */](22, 114688, null, 0, refresher_content["a" /* RefresherContent */], [refresher["a" /* Refresher */], config["a" /* Config */]], { pullingText: [0, "pullingText"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n    "])), (_l()(), core["_31" /* ɵeld */](26, 0, null, 1, 5, "core-loading", [], null, null, null, loading_ngfactory["b" /* View_CoreLoadingComponent_0 */], loading_ngfactory["a" /* RenderType_CoreLoadingComponent */])), core["_30" /* ɵdid */](27, 638976, null, 0, loading["a" /* CoreLoadingComponent */], [translate_service["a" /* TranslateService */], core["t" /* ElementRef */], events["a" /* CoreEventsProvider */], utils["a" /* CoreUtilsProvider */]], { hideUntil: [0, "hideUntil"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_CoreCoursesCoursePreviewPage_1)), core["_30" /* ɵdid */](30, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; _ck(_v, 6, 0); var currVal_2 = _co.course.fullname; _ck(_v, 11, 0, currVal_2); var currVal_7 = _co.dataLoaded; _ck(_v, 19, 0, currVal_7); var currVal_9 = core["_34" /* ɵinlineInterpolate */](1, "", core["_56" /* ɵunv */](_v, 22, 0, core["_44" /* ɵnov */](_v, 23).transform("core.pulltorefresh")), ""); _ck(_v, 22, 0, currVal_9); var currVal_10 = _co.dataLoaded; _ck(_v, 27, 0, currVal_10); var currVal_11 = _co.course; _ck(_v, 30, 0, currVal_11); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 5)._hidden; var currVal_1 = core["_44" /* ɵnov */](_v, 5)._sbPadding; _ck(_v, 4, 0, currVal_0, currVal_1); var currVal_3 = core["_44" /* ɵnov */](_v, 16).statusbarPadding; var currVal_4 = core["_44" /* ɵnov */](_v, 16)._hasRefresher; _ck(_v, 15, 0, currVal_3, currVal_4); var currVal_5 = (core["_44" /* ɵnov */](_v, 19).state !== "inactive"); var currVal_6 = core["_44" /* ɵnov */](_v, 19)._top; _ck(_v, 18, 0, currVal_5, currVal_6); var currVal_8 = core["_44" /* ɵnov */](_v, 22).r.state; _ck(_v, 21, 0, currVal_8); }); }
function View_CoreCoursesCoursePreviewPage_Host_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "page-core-courses-course-preview", [], null, null, null, View_CoreCoursesCoursePreviewPage_0, RenderType_CoreCoursesCoursePreviewPage)), core["_30" /* ɵdid */](1, 180224, null, 0, course_preview_CoreCoursesCoursePreviewPage, [nav_controller["a" /* NavController */], nav_params["a" /* NavParams */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], app["a" /* CoreAppProvider */], courses["a" /* CoreCoursesProvider */], platform_platform["a" /* Platform */], modal_controller["a" /* ModalController */], translate_service["a" /* TranslateService */], events["a" /* CoreEventsProvider */], options_delegate["a" /* CoreCourseOptionsDelegate */], helper["a" /* CoreCourseHelperProvider */], course["a" /* CoreCourseProvider */], format_delegate["a" /* CoreCourseFormatDelegate */], core["M" /* NgZone */]], null, null)], null, null); }
var CoreCoursesCoursePreviewPageNgFactory = core["_27" /* ɵccf */]("page-core-courses-course-preview", course_preview_CoreCoursesCoursePreviewPage, View_CoreCoursesCoursePreviewPage_Host_0, {}, {}, []);

//# sourceMappingURL=course-preview.ngfactory.js.map
// EXTERNAL MODULE: ./node_modules/@angular/forms/esm5/forms.js
var esm5_forms = __webpack_require__(22);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.loader.js
var translate_loader = __webpack_require__(360);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.compiler.js
var translate_compiler = __webpack_require__(361);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.parser.js
var translate_parser = __webpack_require__(363);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/missing-translation-handler.js
var missing_translation_handler = __webpack_require__(362);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.store.js
var translate_store = __webpack_require__(467);

// EXTERNAL MODULE: ./node_modules/ionic-angular/module.js
var ionic_angular_module = __webpack_require__(710);

// EXTERNAL MODULE: ./node_modules/ionic-angular/util/module-loader.js
var module_loader = __webpack_require__(268);

// CONCATENATED MODULE: ./src/core/courses/pages/course-preview/course-preview.module.ngfactory.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoreCoursesCoursePreviewPageModuleNgFactory", function() { return CoreCoursesCoursePreviewPageModuleNgFactory; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 































var CoreCoursesCoursePreviewPageModuleNgFactory = core["_28" /* ɵcmf */](course_preview_module_CoreCoursesCoursePreviewPageModule, [], function (_l) { return core["_40" /* ɵmod */]([core["_41" /* ɵmpd */](512, core["o" /* ComponentFactoryResolver */], core["_21" /* ɵCodegenComponentFactoryResolver */], [[8, [action_sheet_component_ngfactory["a" /* ActionSheetCmpNgFactory */], alert_component_ngfactory["a" /* AlertCmpNgFactory */], app_root_ngfactory["a" /* IonicAppNgFactory */], loading_component_ngfactory["a" /* LoadingCmpNgFactory */], modal_component_ngfactory["a" /* ModalCmpNgFactory */], picker_component_ngfactory["a" /* PickerCmpNgFactory */], popover_component_ngfactory["a" /* PopoverCmpNgFactory */], select_popover_component_ngfactory["a" /* SelectPopoverNgFactory */], toast_component_ngfactory["a" /* ToastCmpNgFactory */], context_menu_popover_ngfactory["a" /* CoreContextMenuPopoverComponentNgFactory */], course_picker_menu_popover_ngfactory["a" /* CoreCoursePickerMenuPopoverComponentNgFactory */], recaptchamodal_ngfactory["a" /* CoreRecaptchaModalComponentNgFactory */], bs_tooltip_ngfactory["a" /* CoreBSTooltipComponentNgFactory */], CoreCoursesCoursePreviewPageNgFactory]], [3, core["o" /* ComponentFactoryResolver */]], core["K" /* NgModuleRef */]]), core["_41" /* ɵmpd */](4608, common["m" /* NgLocalization */], common["l" /* NgLocaleLocalization */], [core["G" /* LOCALE_ID */], [2, common["w" /* ɵa */]]]), core["_41" /* ɵmpd */](4608, esm5_forms["x" /* ɵi */], esm5_forms["x" /* ɵi */], []), core["_41" /* ɵmpd */](4608, esm5_forms["d" /* FormBuilder */], esm5_forms["d" /* FormBuilder */], []), core["_41" /* ɵmpd */](4608, translate_loader["b" /* TranslateLoader */], translate_loader["a" /* TranslateFakeLoader */], []), core["_41" /* ɵmpd */](4608, translate_compiler["a" /* TranslateCompiler */], translate_compiler["b" /* TranslateFakeCompiler */], []), core["_41" /* ɵmpd */](4608, translate_parser["b" /* TranslateParser */], translate_parser["a" /* TranslateDefaultParser */], []), core["_41" /* ɵmpd */](4608, missing_translation_handler["b" /* MissingTranslationHandler */], missing_translation_handler["a" /* FakeMissingTranslationHandler */], []), core["_41" /* ɵmpd */](4608, translate_service["a" /* TranslateService */], translate_service["a" /* TranslateService */], [translate_store["a" /* TranslateStore */], translate_loader["b" /* TranslateLoader */], translate_compiler["a" /* TranslateCompiler */], translate_parser["b" /* TranslateParser */], missing_translation_handler["b" /* MissingTranslationHandler */], translate_service["b" /* USE_DEFAULT_LANG */], translate_service["c" /* USE_STORE */]]), core["_41" /* ɵmpd */](512, common["b" /* CommonModule */], common["b" /* CommonModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["v" /* ɵba */], esm5_forms["v" /* ɵba */], []), core["_41" /* ɵmpd */](512, esm5_forms["i" /* FormsModule */], esm5_forms["i" /* FormsModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["s" /* ReactiveFormsModule */], esm5_forms["s" /* ReactiveFormsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["a" /* IonicModule */], ionic_angular_module["a" /* IonicModule */], []), core["_41" /* ɵmpd */](512, _ngx_translate_core["b" /* TranslateModule */], _ngx_translate_core["b" /* TranslateModule */], []), core["_41" /* ɵmpd */](512, directives_module["a" /* CoreDirectivesModule */], directives_module["a" /* CoreDirectivesModule */], []), core["_41" /* ɵmpd */](512, pipes_module["a" /* CorePipesModule */], pipes_module["a" /* CorePipesModule */], []), core["_41" /* ɵmpd */](512, components_module["a" /* CoreComponentsModule */], components_module["a" /* CoreComponentsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["b" /* IonicPageModule */], ionic_angular_module["b" /* IonicPageModule */], []), core["_41" /* ɵmpd */](512, course_preview_module_CoreCoursesCoursePreviewPageModule, course_preview_module_CoreCoursesCoursePreviewPageModule, []), core["_41" /* ɵmpd */](256, translate_service["c" /* USE_STORE */], undefined, []), core["_41" /* ɵmpd */](256, translate_service["b" /* USE_DEFAULT_LANG */], undefined, []), core["_41" /* ɵmpd */](256, module_loader["a" /* LAZY_LOADED_TOKEN */], course_preview_CoreCoursesCoursePreviewPage, [])]); });

//# sourceMappingURL=course-preview.module.ngfactory.js.map

/***/ })

});
//# sourceMappingURL=62.js.map