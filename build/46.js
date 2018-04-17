webpackJsonp([46],{

/***/ 1581:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoreCourseSectionPageModule", function() { return CoreCourseSectionPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__section__ = __webpack_require__(1673);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_components_module__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__directives_directives_module__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_components_module__ = __webpack_require__(68);
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







var CoreCourseSectionPageModule = (function () {
    function CoreCourseSectionPageModule() {
    }
    CoreCourseSectionPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__section__["a" /* CoreCourseSectionPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_4__components_components_module__["a" /* CoreComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_5__directives_directives_module__["a" /* CoreDirectivesModule */],
                __WEBPACK_IMPORTED_MODULE_6__components_components_module__["a" /* CoreCourseComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__section__["a" /* CoreCourseSectionPage */]),
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */].forChild()
            ],
        })
    ], CoreCourseSectionPageModule);
    return CoreCourseSectionPageModule;
}());

//# sourceMappingURL=section.module.js.map

/***/ }),

/***/ 1673:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoreCourseSectionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_events__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_sites__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_utils_dom__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_utils_text__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_course__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_helper__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_format_delegate__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_module_prefetch_delegate__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_options_delegate__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_format_format__ = __webpack_require__(802);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__core_courses_providers_courses__ = __webpack_require__(41);
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
 * Page that displays the list of courses the user is enrolled in.
 */
var CoreCourseSectionPage = (function () {
    function CoreCourseSectionPage(navParams, courseProvider, domUtils, courseFormatDelegate, courseOptionsDelegate, translate, courseHelper, eventsProvider, textUtils, coursesProvider, sitesProvider, navCtrl, injector, prefetchDelegate) {
        var _this = this;
        this.courseProvider = courseProvider;
        this.domUtils = domUtils;
        this.courseFormatDelegate = courseFormatDelegate;
        this.courseOptionsDelegate = courseOptionsDelegate;
        this.translate = translate;
        this.courseHelper = courseHelper;
        this.textUtils = textUtils;
        this.coursesProvider = coursesProvider;
        this.navCtrl = navCtrl;
        this.injector = injector;
        this.prefetchDelegate = prefetchDelegate;
        this.downloadEnabledIcon = 'square-outline'; // Disabled by default.
        this.prefetchCourseData = {
            prefetchCourseIcon: 'spinner'
        };
        this.isDestroyed = false;
        this.course = navParams.get('course');
        this.sectionId = navParams.get('sectionId');
        this.sectionNumber = navParams.get('sectionNumber');
        this.module = navParams.get('module');
        // Get the title to display. We dont't have sections yet.
        this.title = courseFormatDelegate.getCourseTitle(this.course);
        this.displayEnableDownload = courseFormatDelegate.displayEnableDownload(this.course);
        this.completionObserver = eventsProvider.on(__WEBPACK_IMPORTED_MODULE_3__providers_events__["a" /* CoreEventsProvider */].COMPLETION_MODULE_VIEWED, function (data) {
            if (data && data.courseId == _this.course.id) {
                _this.refreshAfterCompletionChange();
            }
        });
        // Listen for changes in course status.
        this.courseStatusObserver = eventsProvider.on(__WEBPACK_IMPORTED_MODULE_3__providers_events__["a" /* CoreEventsProvider */].COURSE_STATUS_CHANGED, function (data) {
            if (data.courseId == _this.course.id) {
                _this.prefetchCourseData.prefetchCourseIcon = _this.courseHelper.getCourseStatusIconFromStatus(data.status);
            }
        }, sitesProvider.getCurrentSiteId());
    }
    /**
     * View loaded.
     */
    CoreCourseSectionPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        if (this.module) {
            this.moduleId = this.module.id;
            this.courseHelper.openModule(this.navCtrl, this.module, this.course.id, this.sectionId);
        }
        this.loadData().finally(function () {
            _this.dataLoaded = true;
            // Determine the course prefetch status.
            _this.determineCoursePrefetchIcon().then(function () {
                if (_this.prefetchCourseData.prefetchCourseIcon == 'spinner') {
                    // Course is being downloaded. Get the download promise.
                    var promise = _this.courseHelper.getCourseDownloadPromise(_this.course.id);
                    if (promise) {
                        // There is a download promise. Show an error if it fails.
                        promise.catch(function (error) {
                            if (!_this.isDestroyed) {
                                _this.domUtils.showErrorModalDefault(error, 'core.course.errordownloadingcourse', true);
                            }
                        });
                    }
                    else {
                        // No download, this probably means that the app was closed while downloading. Set previous status.
                        _this.courseProvider.setCoursePreviousStatus(_this.course.id).then(function (status) {
                            _this.prefetchCourseData.prefetchCourseIcon = _this.courseHelper.getCourseStatusIconFromStatus(status);
                        });
                    }
                }
            });
        });
    };
    /**
     * Fetch and load all the data required for the view.
     */
    CoreCourseSectionPage.prototype.loadData = function (refresh) {
        var _this = this;
        // First of all, get the course because the data might have changed.
        return this.coursesProvider.getUserCourse(this.course.id).catch(function () {
            // Error getting the course, probably guest access.
        }).then(function (course) {
            var promises = [];
            var promise;
            if (course) {
                _this.course = course;
            }
            // Get the completion status.
            if (_this.course.enablecompletion === false) {
                // Completion not enabled.
                promise = Promise.resolve({});
            }
            else {
                promise = _this.courseProvider.getActivitiesCompletionStatus(_this.course.id).catch(function () {
                    // It failed, don't use completion.
                    return {};
                });
            }
            promises.push(promise.then(function (completionStatus) {
                // Get all the sections.
                return _this.courseProvider.getSections(_this.course.id, false, true).then(function (sections) {
                    if (refresh) {
                        // Invalidate the recently downloaded module list. To ensure info can be prefetched.
                        var modules = _this.courseProvider.getSectionsModules(sections);
                        return _this.prefetchDelegate.invalidateModules(modules, _this.course.id).then(function () {
                            return sections;
                        });
                    }
                    else {
                        return sections;
                    }
                }).then(function (sections) {
                    _this.courseHelper.addHandlerDataForModules(sections, _this.course.id, completionStatus);
                    // Format the name of each section and check if it has content.
                    _this.sections = sections.map(function (section) {
                        _this.textUtils.formatText(section.name.trim(), true, true).then(function (name) {
                            section.formattedName = name;
                        });
                        section.hasContent = _this.courseHelper.sectionHasContent(section);
                        return section;
                    });
                    if (_this.courseFormatDelegate.canViewAllSections(_this.course)) {
                        // Add a fake first section (all sections).
                        _this.sections.unshift({
                            name: _this.translate.instant('core.course.allsections'),
                            id: __WEBPACK_IMPORTED_MODULE_7__providers_course__["a" /* CoreCourseProvider */].ALL_SECTIONS_ID
                        });
                    }
                    // Get the title again now that we have sections.
                    _this.title = _this.courseFormatDelegate.getCourseTitle(_this.course, _this.sections);
                });
            }));
            // Load the course handlers.
            promises.push(_this.courseOptionsDelegate.getHandlersToDisplay(_this.injector, _this.course, refresh, false)
                .then(function (handlers) {
                // Add the courseId to the handler component data.
                handlers.forEach(function (handler) {
                    handler.data.componentData = handler.data.componentData || {};
                    handler.data.componentData.courseId = _this.course.id;
                });
                _this.courseHandlers = handlers;
            }));
            return Promise.all(promises).catch(function (error) {
                _this.domUtils.showErrorModalDefault(error, 'core.course.couldnotloadsectioncontent', true);
            });
        });
    };
    /**
     * Refresh the data.
     *
     * @param {any} refresher Refresher.
     */
    CoreCourseSectionPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        this.invalidateData().finally(function () {
            _this.loadData(true).finally(function () {
                _this.formatComponent.doRefresh(refresher).finally(function () {
                    refresher.complete();
                });
            });
        });
    };
    /**
     * The completion of any of the modules have changed.
     */
    CoreCourseSectionPage.prototype.onCompletionChange = function () {
        var _this = this;
        this.invalidateData().finally(function () {
            _this.refreshAfterCompletionChange();
        });
    };
    /**
     * Invalidate the data.
     */
    CoreCourseSectionPage.prototype.invalidateData = function () {
        var promises = [];
        promises.push(this.courseProvider.invalidateSections(this.course.id));
        promises.push(this.coursesProvider.invalidateUserCourses());
        promises.push(this.courseFormatDelegate.invalidateData(this.course, this.sections));
        if (this.sections) {
            promises.push(this.prefetchDelegate.invalidateCourseUpdates(this.course.id));
        }
        return Promise.all(promises);
    };
    /**
     * Refresh list after a completion change since there could be new activities.
     */
    CoreCourseSectionPage.prototype.refreshAfterCompletionChange = function () {
        var _this = this;
        // Save scroll position to restore it once done.
        var scrollElement = this.content.getScrollElement(), scrollTop = scrollElement.scrollTop || 0, scrollLeft = scrollElement.scrollLeft || 0;
        this.dataLoaded = false;
        this.content.scrollToTop(); // Scroll top so the spinner is seen.
        this.loadData().finally(function () {
            _this.dataLoaded = true;
            _this.content.scrollTo(scrollLeft, scrollTop);
        });
    };
    /**
     * Determines the prefetch icon of the course.
     *
     * @return {Promise<void>} Promise resolved when done.
     */
    CoreCourseSectionPage.prototype.determineCoursePrefetchIcon = function () {
        var _this = this;
        return this.courseHelper.getCourseStatusIcon(this.course.id).then(function (icon) {
            _this.prefetchCourseData.prefetchCourseIcon = icon;
        });
    };
    /**
     * Prefetch the whole course.
     */
    CoreCourseSectionPage.prototype.prefetchCourse = function () {
        var _this = this;
        this.courseHelper.confirmAndPrefetchCourse(this.prefetchCourseData, this.course, this.sections, this.courseHandlers)
            .then(function () {
            if (_this.downloadEnabled) {
                // Recalculate the status.
                _this.courseHelper.calculateSectionsStatus(_this.sections, _this.course.id).catch(function () {
                    // Ignore errors (shouldn't happen).
                });
            }
        }).catch(function (error) {
            if (!_this.isDestroyed) {
                _this.domUtils.showErrorModalDefault(error, 'core.course.errordownloadingcourse', true);
            }
        });
    };
    /**
     * Toggle download enabled.
     */
    CoreCourseSectionPage.prototype.toggleDownload = function () {
        this.downloadEnabled = !this.downloadEnabled;
        this.downloadEnabledIcon = this.downloadEnabled ? 'checkbox-outline' : 'square-outline';
    };
    /**
     * Page destroyed.
     */
    CoreCourseSectionPage.prototype.ngOnDestroy = function () {
        this.isDestroyed = true;
        if (this.completionObserver) {
            this.completionObserver.off();
        }
    };
    /**
     * User entered the page.
     */
    CoreCourseSectionPage.prototype.ionViewDidEnter = function () {
        this.formatComponent.ionViewDidEnter();
    };
    /**
     * User left the page.
     */
    CoreCourseSectionPage.prototype.ionViewDidLeave = function () {
        this.formatComponent.ionViewDidLeave();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Content */])
    ], CoreCourseSectionPage.prototype, "content", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_12__components_format_format__["a" /* CoreCourseFormatComponent */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_12__components_format_format__["a" /* CoreCourseFormatComponent */])
    ], CoreCourseSectionPage.prototype, "formatComponent", void 0);
    CoreCourseSectionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-core-course-section',template:/*ion-inline-start:"/ionic-projects/moodlemobile2/src/core/course/pages/section/section.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title><core-format-text [text]="title"></core-format-text></ion-title>\n\n        <ion-buttons end></ion-buttons>\n    </ion-navbar>\n</ion-header>\n<ion-content>\n    <core-tabs>\n        <!-- Course contents tab. -->\n        <core-tab [title]="\'core.course.contents\' | translate">\n            <ng-template>\n                <core-navbar-buttons>\n                    <core-context-menu>\n                        <core-context-menu-item *ngIf="displayEnableDownload" [priority]="2000" [content]="\'core.settings.enabledownloadsection\' | translate" (action)="toggleDownload()" [iconAction]="downloadEnabledIcon"></core-context-menu-item>\n                        <core-context-menu-item [priority]="1900" [content]="\'core.course.downloadcourse\' | translate" (action)="prefetchCourse()" [iconAction]="prefetchCourseData.prefetchCourseIcon" [closeOnClick]="false"></core-context-menu-item>\n                    </core-context-menu>\n                </core-navbar-buttons>\n                <ion-content>\n                    <ion-refresher [enabled]="dataLoaded" (ionRefresh)="doRefresh($event)">\n                        <ion-refresher-content pullingText="{{ \'core.pulltorefresh\' | translate }}"></ion-refresher-content>\n                    </ion-refresher>\n\n                    <core-loading [hideUntil]="dataLoaded">\n                        <core-course-format [course]="course" [sections]="sections" [initialSectionId]="sectionId" [initialSectionNumber]="sectionNumber" [downloadEnabled]="downloadEnabled" [moduleId]="moduleId" (completionChanged)="onCompletionChange()"></core-course-format>\n                    </core-loading>\n                </ion-content>\n            </ng-template>\n        </core-tab>\n        <!-- One tab per handler. -->\n        <core-tab *ngFor="let handler of courseHandlers" [title]="handler.data.title | translate" class="{{handler.data.class}}">\n            <ng-template>\n                <core-dynamic-component [component]="handler.data.component" [data]="handler.data.componentData"></core-dynamic-component>\n            </ng-template>\n        </core-tab>\n    </core-tabs>\n</ion-content>\n'/*ion-inline-end:"/ionic-projects/moodlemobile2/src/core/course/pages/section/section.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_7__providers_course__["a" /* CoreCourseProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_utils_dom__["a" /* CoreDomUtilsProvider */],
            __WEBPACK_IMPORTED_MODULE_9__providers_format_delegate__["a" /* CoreCourseFormatDelegate */], __WEBPACK_IMPORTED_MODULE_11__providers_options_delegate__["a" /* CoreCourseOptionsDelegate */],
            __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_8__providers_helper__["a" /* CoreCourseHelperProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_events__["a" /* CoreEventsProvider */],
            __WEBPACK_IMPORTED_MODULE_6__providers_utils_text__["a" /* CoreTextUtilsProvider */], __WEBPACK_IMPORTED_MODULE_13__core_courses_providers_courses__["a" /* CoreCoursesProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_sites__["a" /* CoreSitesProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injector */],
            __WEBPACK_IMPORTED_MODULE_10__providers_module_prefetch_delegate__["a" /* CoreCourseModulePrefetchDelegate */]])
    ], CoreCourseSectionPage);
    return CoreCourseSectionPage;
}());

//# sourceMappingURL=section.js.map

/***/ })

});
//# sourceMappingURL=46.js.map