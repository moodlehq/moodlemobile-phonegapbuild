webpackJsonp([7],{

/***/ 1162:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoreCoursesAvailableCoursesPageModule", function() { return CoreCoursesAvailableCoursesPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__available_courses__ = __webpack_require__(1217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_components_module__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_components_module__ = __webpack_require__(1191);
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






var CoreCoursesAvailableCoursesPageModule = /** @class */ (function () {
    function CoreCoursesAvailableCoursesPageModule() {
    }
    CoreCoursesAvailableCoursesPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__available_courses__["a" /* CoreCoursesAvailableCoursesPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_4__components_components_module__["a" /* CoreComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_5__components_components_module__["a" /* CoreCoursesComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__available_courses__["a" /* CoreCoursesAvailableCoursesPage */]),
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */].forChild()
            ],
        })
    ], CoreCoursesAvailableCoursesPageModule);
    return CoreCoursesAvailableCoursesPageModule;
}());

//# sourceMappingURL=available-courses.module.js.map

/***/ }),

/***/ 1191:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoreCoursesComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_components_module__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__directives_directives_module__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pipes_pipes_module__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_course_progress_course_progress__ = __webpack_require__(1192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_course_list_item_course_list_item__ = __webpack_require__(1193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_overview_events_overview_events__ = __webpack_require__(1194);
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










var CoreCoursesComponentsModule = /** @class */ (function () {
    function CoreCoursesComponentsModule() {
    }
    CoreCoursesComponentsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__components_course_progress_course_progress__["a" /* CoreCoursesCourseProgressComponent */],
                __WEBPACK_IMPORTED_MODULE_8__components_course_list_item_course_list_item__["a" /* CoreCoursesCourseListItemComponent */],
                __WEBPACK_IMPORTED_MODULE_9__components_overview_events_overview_events__["a" /* CoreCoursesOverviewEventsComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* IonicModule */],
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */].forChild(),
                __WEBPACK_IMPORTED_MODULE_4__components_components_module__["a" /* CoreComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_5__directives_directives_module__["a" /* CoreDirectivesModule */],
                __WEBPACK_IMPORTED_MODULE_6__pipes_pipes_module__["a" /* CorePipesModule */]
            ],
            providers: [],
            exports: [
                __WEBPACK_IMPORTED_MODULE_7__components_course_progress_course_progress__["a" /* CoreCoursesCourseProgressComponent */],
                __WEBPACK_IMPORTED_MODULE_8__components_course_list_item_course_list_item__["a" /* CoreCoursesCourseListItemComponent */],
                __WEBPACK_IMPORTED_MODULE_9__components_overview_events_overview_events__["a" /* CoreCoursesOverviewEventsComponent */]
            ]
        })
    ], CoreCoursesComponentsModule);
    return CoreCoursesComponentsModule;
}());

//# sourceMappingURL=components.module.js.map

/***/ }),

/***/ 1192:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoreCoursesCourseProgressComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_events__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_sites__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_utils_dom__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__course_providers_format_delegate__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__course_providers_course__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__course_providers_helper__ = __webpack_require__(639);
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
 * This component is meant to display a course for a list of courses with progress.
 *
 * Example usage:
 *
 * <core-courses-course-progress [course]="course">
 * </core-courses-course-progress>
 */
var CoreCoursesCourseProgressComponent = /** @class */ (function () {
    function CoreCoursesCourseProgressComponent(navCtrl, courseHelper, courseFormatDelegate, domUtils, courseProvider, eventsProvider, sitesProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.courseHelper = courseHelper;
        this.courseFormatDelegate = courseFormatDelegate;
        this.domUtils = domUtils;
        this.courseProvider = courseProvider;
        this.prefetchCourseData = {
            prefetchCourseIcon: 'spinner'
        };
        this.isDestroyed = false;
        // Listen for status change in course.
        this.courseStatusObserver = eventsProvider.on(__WEBPACK_IMPORTED_MODULE_2__providers_events__["a" /* CoreEventsProvider */].COURSE_STATUS_CHANGED, function (data) {
            if (data.courseId == _this.course.id) {
                _this.prefetchCourseData.prefetchCourseIcon = _this.courseHelper.getCourseStatusIconFromStatus(data.status);
            }
        }, sitesProvider.getCurrentSiteId());
    }
    /**
     * Component being initialized.
     */
    CoreCoursesCourseProgressComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Determine course prefetch icon.
        this.courseHelper.getCourseStatusIcon(this.course.id).then(function (icon) {
            _this.prefetchCourseData.prefetchCourseIcon = icon;
            if (icon == 'spinner') {
                // Course is being downloaded. Get the download promise.
                var promise = _this.courseHelper.getCourseDownloadPromise(_this.course.id);
                if (promise) {
                    // There is a download promise. If it fails, show an error.
                    promise.catch(function (error) {
                        if (!_this.isDestroyed) {
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
    };
    /**
     * Open a course.
     *
     * @param {any} course The course to open.
     */
    CoreCoursesCourseProgressComponent.prototype.openCourse = function (course) {
        this.courseFormatDelegate.openCourse(this.navCtrl, course);
    };
    /**
     * Prefetch the course.
     *
     * @param {Event} e Click event.
     */
    CoreCoursesCourseProgressComponent.prototype.prefetchCourse = function (e) {
        var _this = this;
        e.preventDefault();
        e.stopPropagation();
        this.courseHelper.confirmAndPrefetchCourse(this.prefetchCourseData, this.course).catch(function (error) {
            if (!_this.isDestroyed) {
                _this.domUtils.showErrorModalDefault(error, 'core.course.errordownloadingcourse', true);
            }
        });
    };
    /**
     * Component destroyed.
     */
    CoreCoursesCourseProgressComponent.prototype.ngOnDestroy = function () {
        this.isDestroyed = true;
        if (this.courseStatusObserver) {
            this.courseStatusObserver.off();
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Object)
    ], CoreCoursesCourseProgressComponent.prototype, "course", void 0);
    CoreCoursesCourseProgressComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'core-courses-course-progress',template:/*ion-inline-start:"/ionic-projects/moodlemobile2/src/core/courses/components/course-progress/course-progress.html"*/'<ion-card>\n    <ion-item tappable text-wrap detail-none (click)="openCourse(course)" [title]="course.fullname">\n        <div class="core-course-link">\n            <h2><core-format-text [text]="course.fullname"></core-format-text></h2>\n\n            <div class="core-button-spinner">\n                <!-- Download course. -->\n                <button *ngIf="prefetchCourseData.prefetchCourseIcon != \'spinner\'" ion-button icon-only clear color="dark" (click)="prefetchCourse($event)">\n                    <ion-icon [name]="prefetchCourseData.prefetchCourseIcon"></ion-icon>\n                </button>\n                <!-- Download course spinner. -->\n                <ion-spinner *ngIf="prefetchCourseData.prefetchCourseIcon == \'spinner\'"></ion-spinner>\n            </div>\n        </div>\n    </ion-item>\n    <ion-item text-wrap *ngIf="course.summary && course.summary.length">\n        <p>\n            <summary>\n                <core-format-text [text]="course.summary" maxHeight="20"></core-format-text>\n            </summary>\n        </p>\n    </ion-item>\n    <ion-item *ngIf="course.progress != null && course.progress >= 0">\n        <core-progress-bar [progress]="course.progress"></core-progress-bar>\n    </ion-item>\n    <ng-content></ng-content>\n</ion-card>\n'/*ion-inline-end:"/ionic-projects/moodlemobile2/src/core/courses/components/course-progress/course-progress.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_7__course_providers_helper__["a" /* CoreCourseHelperProvider */],
            __WEBPACK_IMPORTED_MODULE_5__course_providers_format_delegate__["a" /* CoreCourseFormatDelegate */], __WEBPACK_IMPORTED_MODULE_4__providers_utils_dom__["a" /* CoreDomUtilsProvider */],
            __WEBPACK_IMPORTED_MODULE_6__course_providers_course__["a" /* CoreCourseProvider */], __WEBPACK_IMPORTED_MODULE_2__providers_events__["a" /* CoreEventsProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_sites__["a" /* CoreSitesProvider */]])
    ], CoreCoursesCourseProgressComponent);
    return CoreCoursesCourseProgressComponent;
}());

//# sourceMappingURL=course-progress.js.map

/***/ }),

/***/ 1193:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoreCoursesCourseListItemComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_courses__ = __webpack_require__(57);
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
 * This directive is meant to display an item for a list of courses.
 *
 * Example usage:
 *
 * <core-courses-course-list-item [course]="course"></core-courses-course-list-item>
 */
var CoreCoursesCourseListItemComponent = /** @class */ (function () {
    function CoreCoursesCourseListItemComponent(navCtrl, translate, coursesProvider) {
        this.navCtrl = navCtrl;
        this.translate = translate;
        this.coursesProvider = coursesProvider;
    }
    /**
     * Component being initialized.
     */
    CoreCoursesCourseListItemComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Check if the user is enrolled in the course.
        this.coursesProvider.getUserCourse(this.course.id).then(function () {
            _this.course.isEnrolled = true;
        }).catch(function () {
            _this.course.isEnrolled = false;
            _this.course.enrollment = [];
            _this.course.enrollmentmethods.forEach(function (instance) {
                if (instance === 'self') {
                    _this.course.enrollment.push({
                        name: _this.translate.instant('core.courses.selfenrolment'),
                        icon: 'unlock'
                    });
                }
                else if (instance === 'guest') {
                    _this.course.enrollment.push({
                        name: _this.translate.instant('core.courses.allowguests'),
                        icon: 'person'
                    });
                }
                else if (instance === 'paypal') {
                    _this.course.enrollment.push({
                        name: _this.translate.instant('core.courses.paypalaccepted'),
                        img: 'assets/img/icons/paypal.png'
                    });
                }
            });
            if (_this.course.enrollment.length == 0) {
                _this.course.enrollment.push({
                    name: _this.translate.instant('core.courses.notenrollable'),
                    icon: 'lock'
                });
            }
        });
    };
    /**
     * Open a course.
     *
     * @param {any} course The course to open.
     */
    CoreCoursesCourseListItemComponent.prototype.openCourse = function (course) {
        this.navCtrl.push('CoreCoursesCoursePreviewPage', { course: course });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Object)
    ], CoreCoursesCourseListItemComponent.prototype, "course", void 0);
    CoreCoursesCourseListItemComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'core-courses-course-list-item',template:/*ion-inline-start:"/ionic-projects/moodlemobile2/src/core/courses/components/course-list-item/course-list-item.html"*/'<a ion-item text-wrap (click)="openCourse(course)" [attr.disabled]="course.visible == 0 ? true : null" [attr.detail-none]="course.visible == 0 ? true : null" [title]="course.fullname">\n    <ion-icon name="ionic" item-start></ion-icon>\n    <h2><core-format-text [text]="course.fullname"></core-format-text></h2>\n    <div item-end>\n        <span *ngIf="!course.isEnrolled">\n            <span ion-button icon-only clear color="gray" *ngFor="let instance of course.enrollment" [attr.aria-label]=" instance.name | translate">\n                <ion-icon *ngIf="instance.icon" [name]="instance.icon"></ion-icon>\n                <img *ngIf="instance.img && !instance.icon" [src]="instance.img" class="core-course-enrollment-img">\n            </span>\n        </span>\n    </div>\n</a>\n'/*ion-inline-end:"/ionic-projects/moodlemobile2/src/core/courses/components/course-list-item/course-list-item.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_3__providers_courses__["a" /* CoreCoursesProvider */]])
    ], CoreCoursesCourseListItemComponent);
    return CoreCoursesCourseListItemComponent;
}());

//# sourceMappingURL=course-list-item.js.map

/***/ }),

/***/ 1194:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoreCoursesOverviewEventsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_sites__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_utils_dom__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_utils_text__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_utils_utils__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__course_providers_course__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__contentlinks_providers_helper__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_moment__);
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
 * Directive to render a list of events in course overview.
 */
var CoreCoursesOverviewEventsComponent = /** @class */ (function () {
    function CoreCoursesOverviewEventsComponent(navCtrl, utils, textUtils, domUtils, sitesProvider, courseProvider, contentLinksHelper) {
        this.navCtrl = navCtrl;
        this.utils = utils;
        this.textUtils = textUtils;
        this.domUtils = domUtils;
        this.sitesProvider = sitesProvider;
        this.courseProvider = courseProvider;
        this.contentLinksHelper = contentLinksHelper;
        this.recentlyOverdue = [];
        this.today = [];
        this.next7Days = [];
        this.next30Days = [];
        this.future = [];
        this.loadMore = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
    }
    /**
     * Detect changes on input properties.
     */
    CoreCoursesOverviewEventsComponent.prototype.ngOnChanges = function (changes) {
        this.showCourse = this.utils.isTrueOrOne(this.showCourse);
        if (changes.events) {
            this.updateEvents();
        }
    };
    /**
     * Filter the events by time.
     *
     * @param {number} start Number of days to start getting events from today. E.g. -1 will get events from yesterday.
     * @param {number} [end] Number of days after the start.
     * @return {any[]} Filtered events.
     */
    CoreCoursesOverviewEventsComponent.prototype.filterEventsByTime = function (start, end) {
        var _this = this;
        start = __WEBPACK_IMPORTED_MODULE_8_moment__().add(start, 'days').unix();
        end = typeof end != 'undefined' ? __WEBPACK_IMPORTED_MODULE_8_moment__().add(end, 'days').unix() : end;
        return this.events.filter(function (event) {
            if (end) {
                return start <= event.timesort && event.timesort < end;
            }
            return start <= event.timesort;
        }).map(function (event) {
            event.iconUrl = _this.courseProvider.getModuleIconSrc(event.icon.component);
            return event;
        });
    };
    /**
     * Update the events displayed.
     */
    CoreCoursesOverviewEventsComponent.prototype.updateEvents = function () {
        this.empty = !this.events || this.events.length <= 0;
        if (!this.empty) {
            this.recentlyOverdue = this.filterEventsByTime(-14, 0);
            this.today = this.filterEventsByTime(0, 1);
            this.next7Days = this.filterEventsByTime(1, 7);
            this.next30Days = this.filterEventsByTime(7, 30);
            this.future = this.filterEventsByTime(30);
        }
    };
    /**
     * Load more events clicked.
     */
    CoreCoursesOverviewEventsComponent.prototype.loadMoreEvents = function () {
        this.loadingMore = true;
        this.loadMore.emit();
    };
    /**
     * Action clicked.
     *
     * @param {Event} e Click event.
     * @param {string} url Url of the action.
     */
    CoreCoursesOverviewEventsComponent.prototype.action = function (e, url) {
        var _this = this;
        e.preventDefault();
        e.stopPropagation();
        // Fix URL format.
        url = this.textUtils.decodeHTMLEntities(url);
        var modal = this.domUtils.showModalLoading();
        this.contentLinksHelper.handleLink(url, undefined, this.navCtrl).then(function (treated) {
            if (!treated) {
                return _this.sitesProvider.getCurrentSite().openInBrowserWithAutoLoginIfSameSite(url);
            }
        }).finally(function () {
            modal.dismiss();
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Array)
    ], CoreCoursesOverviewEventsComponent.prototype, "events", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Object)
    ], CoreCoursesOverviewEventsComponent.prototype, "showCourse", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Boolean)
    ], CoreCoursesOverviewEventsComponent.prototype, "canLoadMore", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */])
    ], CoreCoursesOverviewEventsComponent.prototype, "loadMore", void 0);
    CoreCoursesOverviewEventsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'core-courses-overview-events',template:/*ion-inline-start:"/ionic-projects/moodlemobile2/src/core/courses/components/overview-events/overview-events.html"*/'<ng-template #eventTemplate let-event="event">\n    <a ion-item core-link text-wrap detail-none captureLink="true" class="core-course-module-handler item-media" [href]="event.url" [title]="event.name" [class.item-badge-right-phone]="event.action && event.action.showitemcount">\n        <img item-start [src]="event.iconUrl" core-external-content alt="" role="presentation" *ngIf="event.iconUrl" class="core-module-icon">\n        <h2><core-format-text [text]="event.name"></core-format-text></h2>\n        <p>{{event.timesort * 1000 | coreFormatDate:"dfmediumdate" }} <core-format-text *ngIf="showCourse" [text]="event.course.fullnamedisplay"></core-format-text></p>\n        <button ion-button clear item-end class="hidden-phone" (click)="action($event, event.action.url)" [title]="event.action.name" [disabled]="!event.action.actionable" *ngIf="event.action">\n            {{event.action.name}}\n            <ion-badge item-end margin-left *ngIf="event.action.showitemcount">{{event.action.itemcount}}</ion-badge>\n        </button>\n        <ion-badge class="hidden-tablet" item-end *ngIf="event.action.showitemcount">{{event.action.itemcount}}</ion-badge>\n    </a>\n</ng-template>\n\n<ion-item-group *ngIf="recentlyOverdue.length > 0">\n    <ion-item-divider color="danger">{{ \'core.courses.recentlyoverdue\' | translate }}</ion-item-divider>\n    <ng-container *ngFor="let event of recentlyOverdue">\n        <ng-container *ngTemplateOutlet="eventTemplate; context: {event: event}"></ng-container>\n    </ng-container>\n</ion-item-group>\n\n<ion-item-group *ngIf="next7Days.length > 0">\n    <ion-item-divider color="light">{{ \'core.courses.next7days\' | translate }}</ion-item-divider>\n    <ng-container *ngFor="let event of next7Days">\n        <ng-container *ngTemplateOutlet="eventTemplate; context: {event: event}"></ng-container>\n    </ng-container>\n</ion-item-group>\n\n<ion-item-group *ngIf="next30Days.length > 0">\n    <ion-item-divider color="light">{{ \'core.courses.next30days\' | translate }}</ion-item-divider>\n    <ng-container *ngFor="let event of next30Days">\n        <ng-container *ngTemplateOutlet="eventTemplate; context: {event: event}"></ng-container>\n    </ng-container>\n</ion-item-group>\n\n<ion-item-group *ngIf="future.length > 0">\n    <ion-item-divider color="light">{{ \'core.courses.future\' | translate }}</ion-item-divider>\n    <ng-container *ngFor="let event of future">\n        <ng-container *ngTemplateOutlet="eventTemplate; context: {event: event}"></ng-container>\n    </ng-container>\n</ion-item-group>\n\n<div padding text-center *ngIf="canLoadMore && !empty">\n    <!-- Button and spinner to show more attempts. -->\n    <button *ngIf="!loadingMore" ion-button block (click)="loadMoreEvents()">{{ \'core.loadmore\' | translate }}</button>\n    <ion-spinner *ngIf="loadingMore"></ion-spinner>\n</div>\n\n<core-empty-box *ngIf="empty && showCourse" image="assets/img/icons/activities.svg" [message]="\'core.courses.noevents\' | translate"></core-empty-box>\n<core-empty-box *ngIf="empty && !showCourse" [message]="\'core.courses.noevents\' | translate"></core-empty-box>\n'/*ion-inline-end:"/ionic-projects/moodlemobile2/src/core/courses/components/overview-events/overview-events.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_5__providers_utils_utils__["a" /* CoreUtilsProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_utils_text__["a" /* CoreTextUtilsProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_utils_dom__["a" /* CoreDomUtilsProvider */], __WEBPACK_IMPORTED_MODULE_2__providers_sites__["a" /* CoreSitesProvider */],
            __WEBPACK_IMPORTED_MODULE_6__course_providers_course__["a" /* CoreCourseProvider */], __WEBPACK_IMPORTED_MODULE_7__contentlinks_providers_helper__["a" /* CoreContentLinksHelperProvider */]])
    ], CoreCoursesOverviewEventsComponent);
    return CoreCoursesOverviewEventsComponent;
}());

//# sourceMappingURL=overview-events.js.map

/***/ }),

/***/ 1217:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoreCoursesAvailableCoursesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_sites__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_utils_dom__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_courses__ = __webpack_require__(57);
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
 * Page that displays available courses in current site.
 */
var CoreCoursesAvailableCoursesPage = /** @class */ (function () {
    function CoreCoursesAvailableCoursesPage(coursesProvider, domUtils, sitesProvider) {
        this.coursesProvider = coursesProvider;
        this.domUtils = domUtils;
        this.sitesProvider = sitesProvider;
        this.courses = [];
    }
    /**
     * View loaded.
     */
    CoreCoursesAvailableCoursesPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.loadCourses().finally(function () {
            _this.coursesLoaded = true;
        });
    };
    /**
     * Load the courses.
     *
     * @return {Promise<any>} Promise resolved when done.
     */
    CoreCoursesAvailableCoursesPage.prototype.loadCourses = function () {
        var _this = this;
        var frontpageCourseId = this.sitesProvider.getCurrentSite().getSiteHomeId();
        return this.coursesProvider.getCoursesByField().then(function (courses) {
            _this.courses = courses.filter(function (course) {
                return course.id != frontpageCourseId;
            });
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'core.courses.errorloadcourses', true);
        });
    };
    /**
     * Refresh the courses.
     *
     * @param {any} refresher Refresher.
     */
    CoreCoursesAvailableCoursesPage.prototype.refreshCourses = function (refresher) {
        var _this = this;
        var promises = [];
        promises.push(this.coursesProvider.invalidateUserCourses());
        promises.push(this.coursesProvider.invalidateCoursesByField());
        Promise.all(promises).finally(function () {
            _this.loadCourses().finally(function () {
                refresher.complete();
            });
        });
    };
    CoreCoursesAvailableCoursesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-core-courses-available-courses',template:/*ion-inline-start:"/ionic-projects/moodlemobile2/src/core/courses/pages/available-courses/available-courses.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>{{ \'core.courses.availablecourses\' | translate }}</ion-title>\n    </ion-navbar>\n</ion-header>\n<ion-content>\n    <ion-refresher [enabled]="coursesLoaded" (ionRefresh)="refreshCourses($event)">\n        <ion-refresher-content pullingText="{{ \'core.pulltorefresh\' | translate }}"></ion-refresher-content>\n    </ion-refresher>\n    <core-loading [hideUntil]="coursesLoaded">\n        <div *ngIf="courses.length > 0">\n            <core-courses-course-list-item *ngFor="let course of courses" [course]="course"></core-courses-course-list-item>\n        </div>\n        <core-empty-box *ngIf="!courses.length" icon="ionic" [message]="\'core.courses.nocourses\' | translate"></core-empty-box>\n    </core-loading>\n</ion-content>\n'/*ion-inline-end:"/ionic-projects/moodlemobile2/src/core/courses/pages/available-courses/available-courses.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__providers_courses__["a" /* CoreCoursesProvider */], __WEBPACK_IMPORTED_MODULE_2__providers_utils_dom__["a" /* CoreDomUtilsProvider */],
            __WEBPACK_IMPORTED_MODULE_1__providers_sites__["a" /* CoreSitesProvider */]])
    ], CoreCoursesAvailableCoursesPage);
    return CoreCoursesAvailableCoursesPage;
}());

//# sourceMappingURL=available-courses.js.map

/***/ })

});
//# sourceMappingURL=7.js.map