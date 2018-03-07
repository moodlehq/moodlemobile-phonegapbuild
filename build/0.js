webpackJsonp([0],{

/***/ 1167:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoreCoursesMyOverviewPageModule", function() { return CoreCoursesMyOverviewPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__my_overview__ = __webpack_require__(1222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_components_module__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_components_module__ = __webpack_require__(1191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__sitehome_components_components_module__ = __webpack_require__(1200);
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







var CoreCoursesMyOverviewPageModule = /** @class */ (function () {
    function CoreCoursesMyOverviewPageModule() {
    }
    CoreCoursesMyOverviewPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__my_overview__["a" /* CoreCoursesMyOverviewPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_4__components_components_module__["a" /* CoreComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_5__components_components_module__["a" /* CoreCoursesComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_6__sitehome_components_components_module__["a" /* CoreSiteHomeComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__my_overview__["a" /* CoreCoursesMyOverviewPage */]),
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */].forChild()
            ],
        })
    ], CoreCoursesMyOverviewPageModule);
    return CoreCoursesMyOverviewPageModule;
}());

//# sourceMappingURL=my-overview.module.js.map

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

/***/ 1195:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoreCourseComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_components_module__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__directives_directives_module__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__format_format__ = __webpack_require__(1196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__module_module__ = __webpack_require__(1197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__module_completion_module_completion__ = __webpack_require__(1198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__module_description_module_description__ = __webpack_require__(1199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__unsupported_module_unsupported_module__ = __webpack_require__(640);
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











var CoreCourseComponentsModule = /** @class */ (function () {
    function CoreCourseComponentsModule() {
    }
    CoreCourseComponentsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__format_format__["a" /* CoreCourseFormatComponent */],
                __WEBPACK_IMPORTED_MODULE_7__module_module__["a" /* CoreCourseModuleComponent */],
                __WEBPACK_IMPORTED_MODULE_8__module_completion_module_completion__["a" /* CoreCourseModuleCompletionComponent */],
                __WEBPACK_IMPORTED_MODULE_9__module_description_module_description__["a" /* CoreCourseModuleDescriptionComponent */],
                __WEBPACK_IMPORTED_MODULE_10__unsupported_module_unsupported_module__["a" /* CoreCourseUnsupportedModuleComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* IonicModule */],
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */].forChild(),
                __WEBPACK_IMPORTED_MODULE_4__components_components_module__["a" /* CoreComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_5__directives_directives_module__["a" /* CoreDirectivesModule */]
            ],
            providers: [],
            exports: [
                __WEBPACK_IMPORTED_MODULE_6__format_format__["a" /* CoreCourseFormatComponent */],
                __WEBPACK_IMPORTED_MODULE_7__module_module__["a" /* CoreCourseModuleComponent */],
                __WEBPACK_IMPORTED_MODULE_8__module_completion_module_completion__["a" /* CoreCourseModuleCompletionComponent */],
                __WEBPACK_IMPORTED_MODULE_9__module_description_module_description__["a" /* CoreCourseModuleDescriptionComponent */],
                __WEBPACK_IMPORTED_MODULE_10__unsupported_module_unsupported_module__["a" /* CoreCourseUnsupportedModuleComponent */]
            ],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_10__unsupported_module_unsupported_module__["a" /* CoreCourseUnsupportedModuleComponent */]
            ]
        })
    ], CoreCourseComponentsModule);
    return CoreCourseComponentsModule;
}());

//# sourceMappingURL=components.module.js.map

/***/ }),

/***/ 1196:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoreCourseFormatComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_events__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_sites__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_utils_dom__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__course_providers_course__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__course_providers_helper__ = __webpack_require__(639);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__course_providers_format_delegate__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__course_providers_module_prefetch_delegate__ = __webpack_require__(250);
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
 * Component to display course contents using a certain format. If the format isn't found, use default one.
 *
 * The inputs of this component will be shared with the course format components. Please use CoreCourseFormatDelegate
 * to register your handler for course formats.
 *
 * Example usage:
 *
 * <core-course-format [course]="course" [sections]="sections" (completionChanged)="onCompletionChange()"></core-course-format>
 */
var CoreCourseFormatComponent = /** @class */ (function () {
    function CoreCourseFormatComponent(cfDelegate, translate, courseHelper, domUtils, eventsProvider, sitesProvider, prefetchDelegate) {
        var _this = this;
        this.cfDelegate = cfDelegate;
        this.courseHelper = courseHelper;
        this.domUtils = domUtils;
        this.sitesProvider = sitesProvider;
        // Data to pass to the components.
        this.data = {};
        this.allSectionsId = __WEBPACK_IMPORTED_MODULE_5__course_providers_course__["a" /* CoreCourseProvider */].ALL_SECTIONS_ID;
        this.selectOptions = {};
        this.selectOptions.title = translate.instant('core.course.sections');
        this.completionChanged = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
        // Listen for section status changes.
        this.sectionStatusObserver = eventsProvider.on(__WEBPACK_IMPORTED_MODULE_2__providers_events__["a" /* CoreEventsProvider */].SECTION_STATUS_CHANGED, function (data) {
            if (_this.downloadEnabled && _this.sections && _this.sections.length && _this.course && data.sectionId &&
                data.courseId == _this.course.id) {
                // Check if the affected section is being downloaded.
                // If so, we don't update section status because it'll already be updated when the download finishes.
                var downloadId_1 = _this.courseHelper.getSectionDownloadId({ id: data.sectionId });
                if (prefetchDelegate.isBeingDownloaded(downloadId_1)) {
                    return;
                }
                // Get the affected section.
                var section_1;
                for (var i = 0; i < _this.sections.length; i++) {
                    var s = _this.sections[i];
                    if (s.id === data.sectionId) {
                        section_1 = s;
                        break;
                    }
                }
                if (!section_1) {
                    // Section not found, stop.
                    return;
                }
                // Recalculate the status.
                _this.courseHelper.calculateSectionStatus(section_1, _this.course.id, false).then(function () {
                    if (section_1.isDownloading && !prefetchDelegate.isBeingDownloaded(downloadId_1)) {
                        // All the modules are now downloading, set a download all promise.
                        _this.prefetch(section_1, false);
                    }
                });
            }
        }, this.sitesProvider.getCurrentSiteId());
    }
    /**
     * Component being initialized.
     */
    CoreCourseFormatComponent.prototype.ngOnInit = function () {
        this.displaySectionSelector = this.cfDelegate.displaySectionSelector(this.course);
    };
    /**
     * Detect changes on input properties.
     */
    CoreCourseFormatComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        this.setInputData();
        if (changes.course) {
            // Course has changed, try to get the components.
            this.getComponents();
        }
        if (changes.sections && this.sections) {
            if (!this.selectedSection) {
                // There is no selected section yet, calculate which one to load.
                if (this.initialSectionId || this.initialSectionNumber) {
                    // We have an input indicating the section ID to load. Search the section.
                    for (var i = 0; i < this.sections.length; i++) {
                        var section = this.sections[i];
                        if (section.id == this.initialSectionId || section.section == this.initialSectionNumber) {
                            this.loaded = true;
                            this.sectionChanged(section);
                            break;
                        }
                    }
                }
                else {
                    // No section specified, get current section.
                    this.cfDelegate.getCurrentSection(this.course, this.sections).then(function (section) {
                        _this.loaded = true;
                        _this.sectionChanged(section);
                    });
                }
            }
            else {
                // We have a selected section, but the list has changed. Search the section in the list.
                var newSection = void 0;
                for (var i = 0; i < this.sections.length; i++) {
                    var section = this.sections[i];
                    if (this.compareSections(section, this.selectedSection)) {
                        newSection = section;
                        break;
                    }
                }
                if (!newSection) {
                    // Section not found, calculate which one to use.
                    newSection = this.cfDelegate.getCurrentSection(this.course, this.sections);
                }
                this.sectionChanged(newSection);
            }
        }
        if (changes.downloadEnabled && this.downloadEnabled) {
            this.calculateSectionsStatus(false);
        }
    };
    /**
     * Set the input data for components.
     */
    CoreCourseFormatComponent.prototype.setInputData = function () {
        this.data.course = this.course;
        this.data.sections = this.sections;
        this.data.initialSectionId = this.initialSectionId;
        this.data.initialSectionNumber = this.initialSectionNumber;
        this.data.downloadEnabled = this.downloadEnabled;
    };
    /**
     * Get the components classes.
     */
    CoreCourseFormatComponent.prototype.getComponents = function () {
        if (this.course) {
            if (!this.courseFormatComponent) {
                this.courseFormatComponent = this.cfDelegate.getCourseFormatComponent(this.course);
            }
            if (!this.courseSummaryComponent) {
                this.courseSummaryComponent = this.cfDelegate.getCourseSummaryComponent(this.course);
            }
            if (!this.sectionSelectorComponent) {
                this.sectionSelectorComponent = this.cfDelegate.getSectionSelectorComponent(this.course);
            }
            if (!this.singleSectionComponent) {
                this.singleSectionComponent = this.cfDelegate.getSingleSectionComponent(this.course);
            }
            if (!this.allSectionsComponent) {
                this.allSectionsComponent = this.cfDelegate.getAllSectionsComponent(this.course);
            }
        }
    };
    /**
     * Function called when selected section changes.
     *
     * @param {any} newSection The new selected section.
     */
    CoreCourseFormatComponent.prototype.sectionChanged = function (newSection) {
        var previousValue = this.selectedSection;
        this.selectedSection = newSection;
        this.data.section = this.selectedSection;
    };
    /**
     * Compare if two sections are equal.
     *
     * @param {any} s1 First section.
     * @param {any} s2 Second section.
     * @return {boolean} Whether they're equal.
     */
    CoreCourseFormatComponent.prototype.compareSections = function (s1, s2) {
        return s1 && s2 ? s1.id === s2.id : s1 === s2;
    };
    /**
     * Calculate the status of sections.
     *
     * @param {boolean} refresh [description]
     */
    CoreCourseFormatComponent.prototype.calculateSectionsStatus = function (refresh) {
        this.courseHelper.calculateSectionsStatus(this.sections, this.course.id, refresh).catch(function () {
            // Ignore errors (shouldn't happen).
        });
    };
    /**
     * Confirm and prefetch a section. If the section is "all sections", prefetch all the sections.
     *
     * @param {Event} e Click event.
     * @param {any} section Section to download.
     */
    CoreCourseFormatComponent.prototype.prefetch = function (e, section) {
        var _this = this;
        e.preventDefault();
        e.stopPropagation();
        section.isCalculating = true;
        this.courseHelper.confirmDownloadSizeSection(this.course.id, section, this.sections).then(function () {
            _this.prefetchSection(section, true);
        }, function (error) {
            // User cancelled or there was an error calculating the size.
            if (error) {
                _this.domUtils.showErrorModal(error);
            }
        }).finally(function () {
            section.isCalculating = false;
        });
    };
    /**
     * Prefetch a section.
     *
     * @param {any} section The section to download.
     * @param {boolean} [manual] Whether the prefetch was started manually or it was automatically started because all modules
     *                           are being downloaded.
     */
    CoreCourseFormatComponent.prototype.prefetchSection = function (section, manual) {
        var _this = this;
        this.courseHelper.prefetchSection(section, this.course.id, this.sections).catch(function (error) {
            // Don't show error message if it's an automatic download.
            if (!manual) {
                return;
            }
            _this.domUtils.showErrorModalDefault(error, 'core.course.errordownloadingsection', true);
        });
    };
    /**
     * Component destroyed.
     */
    CoreCourseFormatComponent.prototype.ngOnDestroy = function () {
        if (this.sectionStatusObserver) {
            this.sectionStatusObserver.off();
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Object)
    ], CoreCourseFormatComponent.prototype, "course", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Array)
    ], CoreCourseFormatComponent.prototype, "sections", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Boolean)
    ], CoreCourseFormatComponent.prototype, "downloadEnabled", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Number)
    ], CoreCourseFormatComponent.prototype, "initialSectionId", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Number)
    ], CoreCourseFormatComponent.prototype, "initialSectionNumber", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */])
    ], CoreCourseFormatComponent.prototype, "completionChanged", void 0);
    CoreCourseFormatComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'core-course-format',template:/*ion-inline-start:"/ionic-projects/moodlemobile2/src/core/course/components/format/format.html"*/'<!-- Default course format. -->\n<core-dynamic-component [component]="courseFormatComponent" [data]="data">\n    <!-- Course summary. By default we only display the course progress. -->\n    <core-dynamic-component [component]="courseSummaryComponent" [data]="data">\n        <ion-list no-lines>\n            <ion-item *ngIf="course.progress != null && course.progress >= 0">\n                <core-progress-bar [progress]="course.progress"></core-progress-bar>\n            </ion-item>\n        </ion-list>\n    </core-dynamic-component>\n\n    <core-loading [hideUntil]="loaded">\n        <!-- Section selector. -->\n        <core-dynamic-component [component]="sectionSelectorComponent" [data]="data">\n            <div *ngIf="displaySectionSelector && sections && sections.length" no-padding class="clearfix">\n                <!-- @todo: How to display availabilityinfo and not visible messages? -->\n                <ion-select [ngModel]="selectedSection" (ngModelChange)="sectionChanged($event)" [compareWith]="compareSections" [selectOptions]="selectOptions" float-start interface="popover">\n                    <ion-option *ngFor="let section of sections" [value]="section">{{section.formattedName || section.name}}</ion-option>\n                </ion-select>\n                <!-- Section download. -->\n                <ng-container *ngTemplateOutlet="sectionDownloadTemplate; context: {section: selectedSection}"></ng-container>\n            </div>\n        </core-dynamic-component>\n\n        <!-- Single section. -->\n        <div *ngIf="selectedSection && selectedSection.id != allSectionsId">\n            <core-dynamic-component [component]="singleSectionComponent" [data]="data">\n                <ng-container *ngTemplateOutlet="sectionTemplate; context: {section: selectedSection}"></ng-container>\n                <core-empty-box *ngIf="!selectedSection.hasContent" icon="qr-scanner" [message]="\'core.course.nocontentavailable\' | translate"></core-empty-box>\n            </core-dynamic-component>\n        </div>\n\n        <!-- Multiple sections. -->\n        <div *ngIf="selectedSection && selectedSection.id == allSectionsId">\n            <core-dynamic-component [component]="allSectionsComponent" [data]="data">\n                <ng-container *ngFor="let section of sections">\n                    <ng-container *ngTemplateOutlet="sectionTemplate; context: {section: section}"></ng-container>\n                </ng-container>\n            </core-dynamic-component>\n        </div>\n    </core-loading>\n</core-dynamic-component>\n\n<!-- Template to render a section. -->\n<ng-template #sectionTemplate let-section="section">\n    <section ion-list *ngIf="section.hasContent">\n        <!-- Title is only displayed when viewing all sections. -->\n        <ion-item-divider text-wrap color="light" *ngIf="selectedSection.id == allSectionsId && section.name">\n            <core-format-text [text]="section.name"></core-format-text>\n            <!-- Section download. -->\n            <ng-container *ngTemplateOutlet="sectionDownloadTemplate; context: {section: section}"></ng-container>\n        </ion-item-divider>\n\n        <ion-item text-wrap *ngIf="section.summary">\n            <core-format-text [text]="section.summary"></core-format-text>\n        </ion-item>\n\n        <ng-container *ngFor="let module of section.modules">\n            <core-course-module *ngIf="module.visibleoncoursepage !== 0" [module]="module" [courseId]="course.id" (completionChanged)="completionChanged.emit()"></core-course-module>\n        </ng-container>\n    </section>\n</ng-template>\n\n<!-- Template to render a section download button/progress. -->\n<ng-template #sectionDownloadTemplate let-section="section">\n    <div *ngIf="section && downloadEnabled" float-end>\n        <!-- Download button. -->\n        <button *ngIf="section.showDownload && !section.isDownloading && !section.isCalculating" (click)="prefetch($event, section)" ion-button icon-only clear color="dark" [attr.aria-label]="\'core.download\' | translate">\n            <ion-icon name="cloud-download"></ion-icon>\n        </button>\n        <!-- Refresh button. -->\n        <button *ngIf="section.showRefresh && !section.isDownloading && !section.isCalculating" (click)="prefetch($event, section)" ion-button icon-only clear color="dark" [attr.aria-label]="\'core.refresh\' | translate">\n            <ion-icon name="refresh"></ion-icon>\n        </button>\n        <!-- Spinner (downloading or calculating status). -->\n        <ion-spinner *ngIf="(section.isDownloading && section.total > 0) || section.isCalculating"></ion-spinner>\n        <!-- Download progress. -->\n        <ion-badge class="core-course-download-section-progress" *ngIf="section.isDownloading && section.total > 0 && section.count < section.total">{{section.count}} / {{section.total}}</ion-badge>\n    </div>\n</ng-template>\n'/*ion-inline-end:"/ionic-projects/moodlemobile2/src/core/course/components/format/format.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7__course_providers_format_delegate__["a" /* CoreCourseFormatDelegate */], __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_6__course_providers_helper__["a" /* CoreCourseHelperProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_utils_dom__["a" /* CoreDomUtilsProvider */],
            __WEBPACK_IMPORTED_MODULE_2__providers_events__["a" /* CoreEventsProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_sites__["a" /* CoreSitesProvider */],
            __WEBPACK_IMPORTED_MODULE_8__course_providers_module_prefetch_delegate__["a" /* CoreCourseModulePrefetchDelegate */]])
    ], CoreCourseFormatComponent);
    return CoreCourseFormatComponent;
}());

//# sourceMappingURL=format.js.map

/***/ }),

/***/ 1197:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoreCourseModuleComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
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
 * Component to display a module entry in a list of modules.
 *
 * Example usage:
 *
 * <core-course-module [module]="module" [courseId]="courseId" (completionChanged)="onCompletionChange()"></core-course-module>
 */
var CoreCourseModuleComponent = /** @class */ (function () {
    function CoreCourseModuleComponent(navCtrl) {
        this.navCtrl = navCtrl;
        this.completionChanged = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
    }
    /**
     * Component being initialized.
     */
    CoreCourseModuleComponent.prototype.ngOnInit = function () {
        // Handler data must be defined. If it isn't, set it to prevent errors.
        if (this.module && !this.module.handlerData) {
            this.module.handlerData = {};
        }
    };
    /**
     * Function called when the module is clicked.
     *
     * @param {Event} event Click event.
     */
    CoreCourseModuleComponent.prototype.moduleClicked = function (event) {
        if (this.module.uservisible !== false && this.module.handlerData.action) {
            this.module.handlerData.action(event, this.navCtrl, this.module, this.courseId);
        }
    };
    /**
     * Function called when a button is clicked.
     *
     * @param {Event} event Click event.
     * @param {CoreCourseModuleHandlerButton} button The clicked button.
     */
    CoreCourseModuleComponent.prototype.buttonClicked = function (event, button) {
        if (button && button.action) {
            button.action(event, this.navCtrl, this.module, this.courseId);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Object)
    ], CoreCourseModuleComponent.prototype, "module", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Number)
    ], CoreCourseModuleComponent.prototype, "courseId", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */])
    ], CoreCourseModuleComponent.prototype, "completionChanged", void 0);
    CoreCourseModuleComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'core-course-module',template:/*ion-inline-start:"/ionic-projects/moodlemobile2/src/core/course/components/module/module.html"*/'<a *ngIf="module && module.visibleoncoursepage !== 0" ion-item text-wrap id="core-course-module-{{module.id}}" class="core-course-module-handler {{module.handlerData.class}}" (click)="moduleClicked($event)" [ngClass]="{\'item-media\': module.handlerData.icon, \'core-not-clickable\': !module.handlerData.action || !module.uservisible === false, \'item-dimmed\': module.visible === 0 || module.uservisible === false}" title="{{ module.handlerData.title }}" detail-none>\n\n    <img item-start *ngIf="module.handlerData.icon" [src]="module.handlerData.icon" alt="" role="presentation" class="core-module-icon">\n\n    <core-format-text [text]="module.handlerData.title"></core-format-text>\n\n    <div float-end *ngIf="module.uservisible !== false && ((module.handlerData.buttons && module.handlerData.buttons.length > 0) || spinner || module.completionstatus)" class="buttons core-module-buttons" [ngClass]="{\'core-button-completion\': module.completionstatus}">\n        <core-course-module-completion *ngIf="module.completionstatus" [completion]="module.completionstatus" [moduleName]="module.name" (completionChanged)="completionChanged.emit()"></core-course-module-completion>\n\n        <button ion-button icon-only clear *ngFor="let button of module.handlerData.buttons" [hidden]="button.hidden" (click)="buttonClicked($event, button)" color="dark" class="core-animate-show-hide" [attr.aria-label]="button.label | translate">\n            <ion-icon [name]="button.icon" [ios]="button.iosIcon || \'\'" [md]="button.mdIcon || \'\'"></ion-icon>\n        </button>\n\n        <ion-spinner *ngIf="module.handlerData.spinner" class="core-animate-show-hide"></ion-spinner>\n    </div>\n\n    <div *ngIf="module.visible === 0 || module.availabilityinfo">\n        <ion-badge item-end *ngIf="module.visible === 0">{{ \'core.course.hiddenfromstudents\' | translate }}</ion-badge>\n        <ion-badge item-end *ngIf="module.availabilityinfo"><core-format-text [text]="module.availabilityinfo"></core-format-text></ion-badge>\n    </div>\n    <core-format-text *ngIf="module.description" maxHeight="80" [text]="module.description"></core-format-text>\n</a>'/*ion-inline-end:"/ionic-projects/moodlemobile2/src/core/course/components/module/module.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */]])
    ], CoreCourseModuleComponent);
    return CoreCourseModuleComponent;
}());

//# sourceMappingURL=module.js.map

/***/ }),

/***/ 1198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoreCourseModuleCompletionComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_sites__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_utils_dom__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_utils_text__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__user_providers_user__ = __webpack_require__(112);
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
 * Component to handle activity completion. It shows a checkbox with the current status, and allows manually changing
 * the completion if it's allowed.
 *
 * Example usage:
 *
 * <core-course-module-completion [completion]="module.completionstatus" [moduleName]="module.name"
 *     (completionChanged)="completionChanged()"></core-course-module-completion>
 */
var CoreCourseModuleCompletionComponent = /** @class */ (function () {
    function CoreCourseModuleCompletionComponent(textUtils, domUtils, translate, sitesProvider, userProvider) {
        this.textUtils = textUtils;
        this.domUtils = domUtils;
        this.translate = translate;
        this.sitesProvider = sitesProvider;
        this.userProvider = userProvider;
        this.completionChanged = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
    }
    /**
     * Detect changes on input properties.
     */
    CoreCourseModuleCompletionComponent.prototype.ngOnChanges = function (changes) {
        if (changes.completion && this.completion) {
            this.showStatus();
        }
    };
    /**
     * Completion clicked.
     *
     * @param {Event} e The click event.
     */
    CoreCourseModuleCompletionComponent.prototype.completionClicked = function (e) {
        var _this = this;
        if (this.completion) {
            if (typeof this.completion.cmid == 'undefined' || this.completion.tracking !== 1) {
                return;
            }
            e.preventDefault();
            e.stopPropagation();
            var modal_1 = this.domUtils.showModalLoading(), params = {
                cmid: this.completion.cmid,
                completed: this.completion.state === 1 ? 0 : 1
            }, currentSite = this.sitesProvider.getCurrentSite();
            currentSite.write('core_completion_update_activity_completion_status_manually', params).then(function (response) {
                if (!response.status) {
                    return Promise.reject(null);
                }
                _this.completionChanged.emit();
            }).catch(function (error) {
                _this.domUtils.showErrorModalDefault(error, 'core.errorchangecompletion', true);
            }).finally(function () {
                modal_1.dismiss();
            });
        }
    };
    /**
     * Set image and description to show as completion icon.
     */
    CoreCourseModuleCompletionComponent.prototype.showStatus = function () {
        var _this = this;
        var moduleName = this.moduleName || '';
        var langKey, image;
        if (this.completion.tracking === 1 && this.completion.state === 0) {
            image = 'completion-manual-n';
            langKey = 'core.completion-alt-manual-n';
        }
        else if (this.completion.tracking === 1 && this.completion.state === 1) {
            image = 'completion-manual-y';
            langKey = 'core.completion-alt-manual-y';
        }
        else if (this.completion.tracking === 2 && this.completion.state === 0) {
            image = 'completion-auto-n';
            langKey = 'core.completion-alt-auto-n';
        }
        else if (this.completion.tracking === 2 && this.completion.state === 1) {
            image = 'completion-auto-y';
            langKey = 'core.completion-alt-auto-y';
        }
        else if (this.completion.tracking === 2 && this.completion.state === 2) {
            image = 'completion-auto-pass';
            langKey = 'core.completion-alt-auto-pass';
        }
        else if (this.completion.tracking === 2 && this.completion.state === 3) {
            image = 'completion-auto-fail';
            langKey = 'core.completion-alt-auto-fail';
        }
        if (image) {
            if (this.completion.overrideby > 0) {
                image += '-override';
            }
            this.completionImage = 'assets/img/completion/' + image + '.svg';
        }
        if (moduleName) {
            this.textUtils.formatText(moduleName, true, true, 50).then(function (modNameFormatted) {
                var promise;
                if (_this.completion.overrideby > 0) {
                    langKey += '-override';
                    promise = _this.userProvider.getProfile(_this.completion.overrideby, _this.completion.courseId, true).then(function (profile) {
                        return {
                            overrideuser: profile.fullname,
                            modname: modNameFormatted
                        };
                    });
                }
                else {
                    promise = Promise.resolve(modNameFormatted);
                }
                return promise.then(function (translateParams) {
                    _this.completionDescription = _this.translate.instant(langKey, { $a: translateParams });
                });
            });
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Object)
    ], CoreCourseModuleCompletionComponent.prototype, "completion", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], CoreCourseModuleCompletionComponent.prototype, "moduleName", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */])
    ], CoreCourseModuleCompletionComponent.prototype, "completionChanged", void 0);
    CoreCourseModuleCompletionComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'core-course-module-completion',template:/*ion-inline-start:"/ionic-projects/moodlemobile2/src/core/course/components/module-completion/module-completion.html"*/'<a *ngIf="completion" (click)="completionClicked($event)">\n    <img [src]="completionImage" [alt]="completionDescription" [title]="completionDescription">\n</a>'/*ion-inline-end:"/ionic-projects/moodlemobile2/src/core/course/components/module-completion/module-completion.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__providers_utils_text__["a" /* CoreTextUtilsProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_utils_dom__["a" /* CoreDomUtilsProvider */],
            __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_2__providers_sites__["a" /* CoreSitesProvider */], __WEBPACK_IMPORTED_MODULE_5__user_providers_user__["a" /* CoreUserProvider */]])
    ], CoreCourseModuleCompletionComponent);
    return CoreCourseModuleCompletionComponent;
}());

//# sourceMappingURL=module-completion.js.map

/***/ }),

/***/ 1199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoreCourseModuleDescriptionComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
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
 * Component to display the description of a module.
 *
 * This directive is meant to display a module description in a similar way throughout all the app.
 *
 * You can add a note at the right side of the description by using the 'note' attribute.
 *
 * You can also pass a component and componentId to be used in format-text.
 *
 * Module descriptions are shortened by default, allowing the user to see the full description by clicking in it.
 * If you want the whole description to be shown you can use the 'showFull' attribute.
 *
 * Example usage:
 *
 * <core-course-module-description [description]="myDescription"></core-course-module-description
 */
var CoreCourseModuleDescriptionComponent = /** @class */ (function () {
    function CoreCourseModuleDescriptionComponent() {
        // Nothing to do.
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], CoreCourseModuleDescriptionComponent.prototype, "description", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], CoreCourseModuleDescriptionComponent.prototype, "note", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], CoreCourseModuleDescriptionComponent.prototype, "component", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Object)
    ], CoreCourseModuleDescriptionComponent.prototype, "componentId", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Object)
    ], CoreCourseModuleDescriptionComponent.prototype, "showFull", void 0);
    CoreCourseModuleDescriptionComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'core-course-module-description',template:/*ion-inline-start:"/ionic-projects/moodlemobile2/src/core/course/components/module-description/module-description.html"*/'<ion-card *ngIf="description">\n    <ion-item text-wrap>\n        <core-format-text [text]="description" [component]="component" [componentId]="componentId" [maxHeight]="showFull && showFull !== \'false\' ? 0 : 120" fullOnClick="true"></core-format-text>\n        <ion-note *ngIf="note" item-end>{{ note }}</ion-note>\n    </ion-item>\n</ion-card>'/*ion-inline-end:"/ionic-projects/moodlemobile2/src/core/course/components/module-description/module-description.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], CoreCourseModuleDescriptionComponent);
    return CoreCourseModuleDescriptionComponent;
}());

//# sourceMappingURL=module-description.js.map

/***/ }),

/***/ 1200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoreSiteHomeComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_components_module__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__directives_directives_module__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__course_components_components_module__ = __webpack_require__(1195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__index_index__ = __webpack_require__(1201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__all_course_list_all_course_list__ = __webpack_require__(1202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__categories_categories__ = __webpack_require__(1203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__course_search_course_search__ = __webpack_require__(1204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__enrolled_course_list_enrolled_course_list__ = __webpack_require__(1205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__news_news__ = __webpack_require__(1206);
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













var CoreSiteHomeComponentsModule = /** @class */ (function () {
    function CoreSiteHomeComponentsModule() {
    }
    CoreSiteHomeComponentsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__index_index__["a" /* CoreSiteHomeIndexComponent */],
                __WEBPACK_IMPORTED_MODULE_8__all_course_list_all_course_list__["a" /* CoreSiteHomeAllCourseListComponent */],
                __WEBPACK_IMPORTED_MODULE_9__categories_categories__["a" /* CoreSiteHomeCategoriesComponent */],
                __WEBPACK_IMPORTED_MODULE_10__course_search_course_search__["a" /* CoreSiteHomeCourseSearchComponent */],
                __WEBPACK_IMPORTED_MODULE_11__enrolled_course_list_enrolled_course_list__["a" /* CoreSiteHomeEnrolledCourseListComponent */],
                __WEBPACK_IMPORTED_MODULE_12__news_news__["a" /* CoreSiteHomeNewsComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* IonicModule */],
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */].forChild(),
                __WEBPACK_IMPORTED_MODULE_4__components_components_module__["a" /* CoreComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_5__directives_directives_module__["a" /* CoreDirectivesModule */],
                __WEBPACK_IMPORTED_MODULE_6__course_components_components_module__["a" /* CoreCourseComponentsModule */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_7__index_index__["a" /* CoreSiteHomeIndexComponent */],
                __WEBPACK_IMPORTED_MODULE_8__all_course_list_all_course_list__["a" /* CoreSiteHomeAllCourseListComponent */],
                __WEBPACK_IMPORTED_MODULE_9__categories_categories__["a" /* CoreSiteHomeCategoriesComponent */],
                __WEBPACK_IMPORTED_MODULE_10__course_search_course_search__["a" /* CoreSiteHomeCourseSearchComponent */],
                __WEBPACK_IMPORTED_MODULE_11__enrolled_course_list_enrolled_course_list__["a" /* CoreSiteHomeEnrolledCourseListComponent */],
                __WEBPACK_IMPORTED_MODULE_12__news_news__["a" /* CoreSiteHomeNewsComponent */]
            ]
        })
    ], CoreSiteHomeComponentsModule);
    return CoreSiteHomeComponentsModule;
}());

//# sourceMappingURL=components.module.js.map

/***/ }),

/***/ 1201:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoreSiteHomeIndexComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_sites__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_utils_dom__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__course_providers_course__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__course_providers_helper__ = __webpack_require__(639);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__course_providers_module_prefetch_delegate__ = __webpack_require__(250);
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
 * Component that displays site home index.
 */
var CoreSiteHomeIndexComponent = /** @class */ (function () {
    function CoreSiteHomeIndexComponent(domUtils, sitesProvider, courseProvider, courseHelper, prefetchDelegate) {
        this.domUtils = domUtils;
        this.sitesProvider = sitesProvider;
        this.courseProvider = courseProvider;
        this.courseHelper = courseHelper;
        this.prefetchDelegate = prefetchDelegate;
        this.items = [];
        this.siteHomeId = sitesProvider.getCurrentSite().getSiteHomeId();
    }
    /**
     * Component being initialized.
     */
    CoreSiteHomeIndexComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loadContent().finally(function () {
            _this.dataLoaded = true;
        });
    };
    /**
     * Refresh the data.
     *
     * @param {any} refresher Refresher.
     */
    CoreSiteHomeIndexComponent.prototype.doRefresh = function (refresher) {
        var _this = this;
        var promises = [], currentSite = this.sitesProvider.getCurrentSite();
        promises.push(this.courseProvider.invalidateSections(this.siteHomeId));
        promises.push(currentSite.invalidateConfig().then(function () {
            // Config invalidated, fetch it again.
            return currentSite.getConfig().then(function (config) {
                currentSite.setConfig(config);
            });
        }));
        if (this.sectionsLoaded) {
            // Invalidate modules prefetch data.
            var modules = this.courseProvider.getSectionsModules(this.sectionsLoaded);
            promises.push(this.prefetchDelegate.invalidateModules(modules, this.siteHomeId));
        }
        Promise.all(promises).finally(function () {
            _this.loadContent().finally(function () {
                refresher.complete();
            });
        });
    };
    /**
     * Convenience function to fetch the data.
     *
     * @return {Promise<any>} Promise resolved when done.
     */
    CoreSiteHomeIndexComponent.prototype.loadContent = function () {
        var _this = this;
        this.hasContent = false;
        var config = this.sitesProvider.getCurrentSite().getStoredConfig() || { numsections: 1 };
        if (config.frontpageloggedin) {
            // Items with index 1 and 3 were removed on 2.5 and not being supported in the app.
            var frontpageItems_1 = [
                'news',
                false,
                'categories',
                false,
                'categories',
                'enrolled-course-list',
                'all-course-list',
                'course-search' // Course search box.
            ], items = config.frontpageloggedin.split(',');
            this.items = [];
            items.forEach(function (itemNumber) {
                // Get the frontpage item "name".
                var item = frontpageItems_1[parseInt(itemNumber, 10)];
                if (!item || _this.items.indexOf(item) >= 0) {
                    return;
                }
                _this.hasContent = true;
                _this.items.push(item);
            });
        }
        return this.courseProvider.getSections(this.siteHomeId, false, true).then(function (sections) {
            _this.sectionsLoaded = Array.from(sections);
            // Check "Include a topic section" setting from numsections.
            _this.section = config.numsections && sections.length > 0 ? sections.pop() : false;
            if (_this.section) {
                _this.section.hasContent = _this.courseHelper.sectionHasContent(_this.section);
            }
            _this.block = sections.length > 0 ? sections.pop() : false;
            if (_this.block) {
                _this.block.hasContent = _this.courseHelper.sectionHasContent(_this.block);
            }
            _this.hasContent = _this.courseHelper.addHandlerDataForModules(_this.sectionsLoaded, _this.siteHomeId) || _this.hasContent;
            // Add log in Moodle.
            _this.courseProvider.logView(_this.siteHomeId);
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'core.course.couldnotloadsectioncontent', true);
        });
    };
    CoreSiteHomeIndexComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'core-sitehome-index',template:/*ion-inline-start:"/ionic-projects/moodlemobile2/src/core/sitehome/components/index/index.html"*/'<ion-content>\n    <ion-refresher [enabled]="dataLoaded" (ionRefresh)="doRefresh($event)">\n        <ion-refresher-content pullingText="{{ \'core.pulltorefresh\' | translate }}"></ion-refresher-content>\n    </ion-refresher>\n\n    <core-loading [hideUntil]="dataLoaded">\n\n        <ion-list>\n            <!-- Site home main contents. -->\n            <ng-container *ngIf="section && section.hasContent">\n                <ion-item text-wrap *ngIf="section.summary">\n                    <core-format-text [text]="section.summary"></core-format-text>\n                </ion-item>\n\n                <core-course-module *ngFor="let module of section.modules" [module]="module" [courseId]="siteHomeId"></core-course-module>\n            </ng-container>\n\n            <!-- Site home items: news, categories, courses, etc. -->\n            <ng-container *ngIf="items.length > 0">\n                <ion-item-divider color="light" *ngIf="section && section.hasContent"></ion-item-divider>\n                <ng-container *ngFor="let item of items">\n                    <core-sitehome-all-course-list class="item" *ngIf="item == \'all-course-list\'"></core-sitehome-all-course-list>\n                    <core-sitehome-categories  *ngIf="item == \'categories\'"></core-sitehome-categories>\n                    <core-sitehome-course-search *ngIf="item == \'course-search\'"></core-sitehome-course-search>\n                    <core-sitehome-enrolled-course-list *ngIf="item == \'enrolled-course-list\'"></core-sitehome-enrolled-course-list>\n                    <core-sitehome-news *ngIf="item == \'news\'"></core-sitehome-news>\n                </ng-container>\n            </ng-container>\n\n            <!-- Site home block. -->\n            <ng-container *ngIf="block && block.hasContent">\n                <ion-item-divider color="light" *ngIf="(section && section.hasContent) || items.length > 0"></ion-item-divider>\n                <ion-item text-wrap *ngIf="block.summary">\n                    <core-format-text [text]="block.summary"></core-format-text>\n                </ion-item>\n\n                <core-course-module *ngFor="let module of block.modules" [module]="module" [courseId]="siteHomeId"></core-course-module>\n            </ng-container>\n        </ion-list>\n\n        <core-empty-box *ngIf="!hasContent" icon="qr-scanner" [message]="\'core.course.nocontentavailable\' | translate"></core-empty-box>\n    </core-loading>\n</ion-content>\n'/*ion-inline-end:"/ionic-projects/moodlemobile2/src/core/sitehome/components/index/index.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_utils_dom__["a" /* CoreDomUtilsProvider */], __WEBPACK_IMPORTED_MODULE_1__providers_sites__["a" /* CoreSitesProvider */],
            __WEBPACK_IMPORTED_MODULE_3__course_providers_course__["a" /* CoreCourseProvider */], __WEBPACK_IMPORTED_MODULE_4__course_providers_helper__["a" /* CoreCourseHelperProvider */],
            __WEBPACK_IMPORTED_MODULE_5__course_providers_module_prefetch_delegate__["a" /* CoreCourseModulePrefetchDelegate */]])
    ], CoreSiteHomeIndexComponent);
    return CoreSiteHomeIndexComponent;
}());

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 1202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoreSiteHomeAllCourseListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__courses_providers_courses__ = __webpack_require__(57);
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
 * Component to open the page to view the list of all courses.
 */
var CoreSiteHomeAllCourseListComponent = /** @class */ (function () {
    function CoreSiteHomeAllCourseListComponent(coursesProvider) {
        this.show = coursesProvider.isGetCoursesByFieldAvailable();
    }
    CoreSiteHomeAllCourseListComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'core-sitehome-all-course-list',template:/*ion-inline-start:"/ionic-projects/moodlemobile2/src/core/sitehome/components/all-course-list/all-course-list.html"*/'<a *ngIf="show" ion-item text-wrap [navPush]="\'CoreCoursesAvailableCoursesPage\'">\n    <ion-icon name="ionic" item-start></ion-icon>\n    <h2>{{ \'core.courses.availablecourses\' | translate}}</h2>\n</a>\n'/*ion-inline-end:"/ionic-projects/moodlemobile2/src/core/sitehome/components/all-course-list/all-course-list.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__courses_providers_courses__["a" /* CoreCoursesProvider */]])
    ], CoreSiteHomeAllCourseListComponent);
    return CoreSiteHomeAllCourseListComponent;
}());

//# sourceMappingURL=all-course-list.js.map

/***/ }),

/***/ 1203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoreSiteHomeCategoriesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__courses_providers_courses__ = __webpack_require__(57);
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
 * Component to open the page to view the list of categories.
 */
var CoreSiteHomeCategoriesComponent = /** @class */ (function () {
    function CoreSiteHomeCategoriesComponent(coursesProvider) {
        this.show = coursesProvider.isGetCoursesByFieldAvailable();
    }
    CoreSiteHomeCategoriesComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'core-sitehome-categories',template:/*ion-inline-start:"/ionic-projects/moodlemobile2/src/core/sitehome/components/categories/categories.html"*/'<a *ngIf="show" ion-item text-wrap [navPush]="\'CoreCoursesCategoriesPage\'">\n    <ion-icon name="folder" item-start></ion-icon>\n    <h2>{{ \'core.courses.categories\' | translate}}</h2>\n</a>\n'/*ion-inline-end:"/ionic-projects/moodlemobile2/src/core/sitehome/components/categories/categories.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__courses_providers_courses__["a" /* CoreCoursesProvider */]])
    ], CoreSiteHomeCategoriesComponent);
    return CoreSiteHomeCategoriesComponent;
}());

//# sourceMappingURL=categories.js.map

/***/ }),

/***/ 1204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoreSiteHomeCourseSearchComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__courses_providers_courses__ = __webpack_require__(57);
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
 * Component to open the page to search courses.
 */
var CoreSiteHomeCourseSearchComponent = /** @class */ (function () {
    function CoreSiteHomeCourseSearchComponent(coursesProvider) {
        this.show = !coursesProvider.isSearchCoursesDisabledInSite();
    }
    CoreSiteHomeCourseSearchComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'core-sitehome-course-search',template:/*ion-inline-start:"/ionic-projects/moodlemobile2/src/core/sitehome/components/course-search/course-search.html"*/'<a *ngIf="show" ion-item text-wrap [navPush]="\'CoreCoursesSearchPage\'">\n    <ion-icon name="search" item-start></ion-icon>\n    <h2>{{ \'core.courses.searchcourses\' | translate}}</h2>\n</a>\n'/*ion-inline-end:"/ionic-projects/moodlemobile2/src/core/sitehome/components/course-search/course-search.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__courses_providers_courses__["a" /* CoreCoursesProvider */]])
    ], CoreSiteHomeCourseSearchComponent);
    return CoreSiteHomeCourseSearchComponent;
}());

//# sourceMappingURL=course-search.js.map

/***/ }),

/***/ 1205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoreSiteHomeEnrolledCourseListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__courses_providers_courses__ = __webpack_require__(57);
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
 * Component to open the page to view the list of courses the user is enrolled in.
 */
var CoreSiteHomeEnrolledCourseListComponent = /** @class */ (function () {
    function CoreSiteHomeEnrolledCourseListComponent(coursesProvider) {
        this.coursesProvider = coursesProvider;
    }
    /**
     * Component being initialized.
     */
    CoreSiteHomeEnrolledCourseListComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.coursesProvider.isMyCoursesDisabledInSite()) {
            this.show = false;
        }
        else {
            this.coursesProvider.getUserCourses().then(function (courses) {
                _this.show = courses.length > 0;
            });
        }
    };
    CoreSiteHomeEnrolledCourseListComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'core-sitehome-enrolled-course-list',template:/*ion-inline-start:"/ionic-projects/moodlemobile2/src/core/sitehome/components/enrolled-course-list/enrolled-course-list.html"*/'<a *ngIf="show" ion-item text-wrap [navPush]="\'CoreCoursesMyCoursesPage\'">\n    <ion-icon name="ionic" item-start></ion-icon>\n    <h2>{{ \'core.courses.mycourses\' | translate}}</h2>\n</a>\n'/*ion-inline-end:"/ionic-projects/moodlemobile2/src/core/sitehome/components/enrolled-course-list/enrolled-course-list.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__courses_providers_courses__["a" /* CoreCoursesProvider */]])
    ], CoreSiteHomeEnrolledCourseListComponent);
    return CoreSiteHomeEnrolledCourseListComponent;
}());

//# sourceMappingURL=enrolled-course-list.js.map

/***/ }),

/***/ 1206:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoreSiteHomeNewsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_sites__ = __webpack_require__(8);
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
 * Component that displays site home news.
 */
var CoreSiteHomeNewsComponent = /** @class */ (function () {
    function CoreSiteHomeNewsComponent(sitesProvider) {
        this.sitesProvider = sitesProvider;
        this.siteHomeId = sitesProvider.getCurrentSite().getSiteHomeId();
    }
    /**
     * Component being initialized.
     */
    CoreSiteHomeNewsComponent.prototype.ngOnInit = function () {
        // Get number of news items to show.
        var newsItems = this.sitesProvider.getCurrentSite().getStoredConfig('newsitems') || 0;
        if (!newsItems) {
            return;
        }
        // @todo: Implement it once forum is supported.
    };
    CoreSiteHomeNewsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'core-sitehome-news',template:/*ion-inline-start:"/ionic-projects/moodlemobile2/src/core/sitehome/components/news/news.html"*/'<core-course-module class="core-sitehome-news" *ngIf="show" [module]="module" [courseId]="siteHomeId"></core-course-module>'/*ion-inline-end:"/ionic-projects/moodlemobile2/src/core/sitehome/components/news/news.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_sites__["a" /* CoreSitesProvider */]])
    ], CoreSiteHomeNewsComponent);
    return CoreSiteHomeNewsComponent;
}());

//# sourceMappingURL=news.js.map

/***/ }),

/***/ 1222:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoreCoursesMyOverviewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_sites__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_utils_dom__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_courses__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_my_overview__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__course_providers_helper__ = __webpack_require__(639);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__course_providers_options_delegate__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__sitehome_providers_sitehome__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_moment__);
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
 * Page that displays My Overview.
 */
var CoreCoursesMyOverviewPage = /** @class */ (function () {
    function CoreCoursesMyOverviewPage(navCtrl, coursesProvider, domUtils, myOverviewProvider, courseHelper, sitesProvider, siteHomeProvider, courseOptionsDelegate) {
        this.navCtrl = navCtrl;
        this.coursesProvider = coursesProvider;
        this.domUtils = domUtils;
        this.myOverviewProvider = myOverviewProvider;
        this.courseHelper = courseHelper;
        this.sitesProvider = sitesProvider;
        this.siteHomeProvider = siteHomeProvider;
        this.courseOptionsDelegate = courseOptionsDelegate;
        this.tabsReady = false;
        this.tabShown = 'courses';
        this.timeline = {
            sort: 'sortbydates',
            events: [],
            loaded: false,
            canLoadMore: undefined
        };
        this.timelineCourses = {
            courses: [],
            loaded: false,
            canLoadMore: false
        };
        this.courses = {
            selected: 'inprogress',
            loaded: false,
            filter: '',
            past: [],
            inprogress: [],
            future: []
        };
        this.showFilter = false;
        this.tabs = [];
        this.prefetchCoursesData = {
            inprogress: {},
            past: {},
            future: {}
        };
        this.prefetchIconsInitialized = false;
    }
    /**
     * View loaded.
     */
    CoreCoursesMyOverviewPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.searchEnabled = !this.coursesProvider.isSearchCoursesDisabledInSite();
        // Decide which tab to load first.
        this.siteHomeProvider.isAvailable().then(function (enabled) {
            var site = _this.sitesProvider.getCurrentSite(), displaySiteHome = site.getInfo() && site.getInfo().userhomepage === 0;
            _this.siteHomeEnabled = enabled;
            _this.firstSelectedTab = displaySiteHome ? 0 : 2;
            _this.tabsReady = true;
        });
    };
    /**
     * Fetch the timeline.
     *
     * @param {number} [afterEventId] The last event id.
     * @return {Promise<any>} Promise resolved when done.
     */
    CoreCoursesMyOverviewPage.prototype.fetchMyOverviewTimeline = function (afterEventId) {
        var _this = this;
        return this.myOverviewProvider.getActionEventsByTimesort(afterEventId).then(function (events) {
            _this.timeline.events = events.events;
            _this.timeline.canLoadMore = events.canLoadMore;
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'Error getting my overview data.');
        });
    };
    /**
     * Fetch the timeline by courses.
     *
     * @return {Promise<any>} Promise resolved when done.
     */
    CoreCoursesMyOverviewPage.prototype.fetchMyOverviewTimelineByCourses = function () {
        var _this = this;
        return this.fetchUserCourses().then(function (courses) {
            var today = __WEBPACK_IMPORTED_MODULE_9_moment__().unix();
            var courseIds;
            courses = courses.filter(function (course) {
                return course.startdate <= today && (!course.enddate || course.enddate >= today);
            });
            _this.timelineCourses.courses = courses;
            if (courses.length > 0) {
                courseIds = courses.map(function (course) {
                    return course.id;
                });
                return _this.myOverviewProvider.getActionEventsByCourses(courseIds).then(function (courseEvents) {
                    _this.timelineCourses.courses.forEach(function (course) {
                        course.events = courseEvents[course.id].events;
                        course.canLoadMore = courseEvents[course.id].canLoadMore;
                    });
                });
            }
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'Error getting my overview data.');
        });
    };
    /**
     * Fetch the courses for my overview.
     *
     * @return {Promise<any>} Promise resolved when done.
     */
    CoreCoursesMyOverviewPage.prototype.fetchMyOverviewCourses = function () {
        var _this = this;
        return this.fetchUserCourses().then(function (courses) {
            var today = __WEBPACK_IMPORTED_MODULE_9_moment__().unix();
            _this.courses.past = [];
            _this.courses.inprogress = [];
            _this.courses.future = [];
            courses.forEach(function (course) {
                if (course.startdate > today) {
                    // Courses that have not started yet.
                    _this.courses.future.push(course);
                }
                else if (course.enddate && course.enddate < today) {
                    // Courses that have already ended.
                    _this.courses.past.push(course);
                }
                else {
                    // Courses still in progress.
                    _this.courses.inprogress.push(course);
                }
            });
            _this.courses.filter = '';
            _this.showFilter = false;
            _this.filteredCourses = _this.courses[_this.courses.selected];
            _this.initPrefetchCoursesIcons();
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'Error getting my overview data.');
        });
    };
    /**
     * Fetch user courses.
     *
     * @return {Promise<any>} Promise resolved when done.
     */
    CoreCoursesMyOverviewPage.prototype.fetchUserCourses = function () {
        var _this = this;
        return this.coursesProvider.getUserCourses().then(function (courses) {
            var courseIds = courses.map(function (course) {
                return course.id;
            });
            // Load course options of the course.
            return _this.coursesProvider.getCoursesAdminAndNavOptions(courseIds).then(function (options) {
                courses.forEach(function (course) {
                    course.navOptions = options.navOptions[course.id];
                    course.admOptions = options.admOptions[course.id];
                });
                return courses.sort(function (a, b) {
                    var compareA = a.fullname.toLowerCase(), compareB = b.fullname.toLowerCase();
                    return compareA.localeCompare(compareB);
                });
            });
        });
    };
    /**
     * Show or hide the filter.
     */
    CoreCoursesMyOverviewPage.prototype.switchFilter = function () {
        this.showFilter = !this.showFilter;
        this.courses.filter = '';
        this.filteredCourses = this.courses[this.courses.selected];
    };
    /**
     * The filter has changed.
     *
     * @param {string} newValue New filter value.
     */
    CoreCoursesMyOverviewPage.prototype.filterChanged = function (newValue) {
        if (!newValue || !this.courses[this.courses.selected]) {
            this.filteredCourses = this.courses[this.courses.selected];
        }
        else {
            this.filteredCourses = this.courses[this.courses.selected].filter(function (course) {
                return course.fullname.toLowerCase().indexOf(newValue.toLowerCase()) > -1;
            });
        }
    };
    /**
     * Refresh the data.
     *
     * @param {any} refresher Refresher.
     * @return {Promise<any>} Promise resolved when done.
     */
    CoreCoursesMyOverviewPage.prototype.refreshMyOverview = function (refresher) {
        var _this = this;
        var promises = [];
        if (this.tabShown == 'timeline') {
            promises.push(this.myOverviewProvider.invalidateActionEventsByTimesort());
            promises.push(this.myOverviewProvider.invalidateActionEventsByCourses());
        }
        promises.push(this.coursesProvider.invalidateUserCourses());
        promises.push(this.courseOptionsDelegate.clearAndInvalidateCoursesOptions());
        return Promise.all(promises).finally(function () {
            switch (_this.tabShown) {
                case 'timeline':
                    switch (_this.timeline.sort) {
                        case 'sortbydates':
                            return _this.fetchMyOverviewTimeline();
                        case 'sortbycourses':
                            return _this.fetchMyOverviewTimelineByCourses();
                        default:
                    }
                    break;
                case 'courses':
                    _this.prefetchIconsInitialized = false;
                    return _this.fetchMyOverviewCourses();
                default:
            }
        }).finally(function () {
            refresher.complete();
        });
    };
    /**
     * Change timeline sort being viewed.
     */
    CoreCoursesMyOverviewPage.prototype.switchSort = function () {
        var _this = this;
        switch (this.timeline.sort) {
            case 'sortbydates':
                if (!this.timeline.loaded) {
                    this.fetchMyOverviewTimeline().finally(function () {
                        _this.timeline.loaded = true;
                    });
                }
                break;
            case 'sortbycourses':
                if (!this.timelineCourses.loaded) {
                    this.fetchMyOverviewTimelineByCourses().finally(function () {
                        _this.timelineCourses.loaded = true;
                    });
                }
                break;
            default:
        }
    };
    /**
     * The tab has changed.
     *
     * @param {string} tab Name of the new tab.
     */
    CoreCoursesMyOverviewPage.prototype.tabChanged = function (tab) {
        var _this = this;
        this.tabShown = tab;
        switch (this.tabShown) {
            case 'timeline':
                if (!this.timeline.loaded) {
                    this.fetchMyOverviewTimeline().finally(function () {
                        _this.timeline.loaded = true;
                    });
                }
                break;
            case 'courses':
                if (!this.courses.loaded) {
                    this.fetchMyOverviewCourses().finally(function () {
                        _this.courses.loaded = true;
                    });
                }
                break;
            default:
        }
    };
    /**
     * Load more events.
     */
    CoreCoursesMyOverviewPage.prototype.loadMoreTimeline = function () {
        return this.fetchMyOverviewTimeline(this.timeline.canLoadMore);
    };
    /**
     * Load more events.
     *
     * @param {any} course Course.
     * @return {Promise<any>} Promise resolved when done.
     */
    CoreCoursesMyOverviewPage.prototype.loadMoreCourse = function (course) {
        return this.myOverviewProvider.getActionEventsByCourse(course.id, course.canLoadMore).then(function (courseEvents) {
            course.events = course.events.concat(courseEvents.events);
            course.canLoadMore = courseEvents.canLoadMore;
        });
    };
    /**
     * Go to search courses.
     */
    CoreCoursesMyOverviewPage.prototype.openSearch = function () {
        this.navCtrl.push('CoreCoursesSearchPage');
    };
    /**
     * The selected courses have changed.
     */
    CoreCoursesMyOverviewPage.prototype.selectedChanged = function () {
        this.filteredCourses = this.courses[this.courses.selected];
    };
    /**
     * Prefetch all the shown courses.
     *
     * @return {Promise<any>} Promise resolved when done.
     */
    CoreCoursesMyOverviewPage.prototype.prefetchCourses = function () {
        var _this = this;
        var selected = this.courses.selected, selectedData = this.prefetchCoursesData[selected], initialIcon = selectedData.icon;
        selectedData.icon = 'spinner';
        selectedData.badge = '';
        return this.courseHelper.confirmAndPrefetchCourses(this.courses[selected], function (progress) {
            selectedData.badge = progress.count + ' / ' + progress.total;
        }).then(function (downloaded) {
            selectedData.icon = downloaded ? 'refresh' : initialIcon;
        }, function (error) {
            if (!_this.isDestroyed) {
                _this.domUtils.showErrorModalDefault(error, 'core.course.errordownloadingcourse', true);
                selectedData.icon = initialIcon;
            }
        }).finally(function () {
            selectedData.badge = '';
        });
    };
    /**
     * Initialize the prefetch icon for selected courses.
     */
    CoreCoursesMyOverviewPage.prototype.initPrefetchCoursesIcons = function () {
        var _this = this;
        if (this.prefetchIconsInitialized) {
            // Already initialized.
            return;
        }
        this.prefetchIconsInitialized = true;
        Object.keys(this.prefetchCoursesData).forEach(function (filter) {
            if (!_this.courses[filter] || _this.courses[filter].length < 2) {
                // Not enough courses.
                _this.prefetchCoursesData[filter].icon = '';
                return;
            }
            _this.courseHelper.determineCoursesStatus(_this.courses[filter]).then(function (status) {
                var icon = _this.courseHelper.getCourseStatusIconFromStatus(status);
                if (icon == 'spinner') {
                    // It seems all courses are being downloaded, show a download button instead.
                    icon = 'cloud-download';
                }
                _this.prefetchCoursesData[filter].icon = icon;
            });
        });
    };
    /**
     * Component being destroyed.
     */
    CoreCoursesMyOverviewPage.prototype.ngOnDestroy = function () {
        this.isDestroyed = true;
    };
    CoreCoursesMyOverviewPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-core-courses-my-overview',template:/*ion-inline-start:"/ionic-projects/moodlemobile2/src/core/courses/pages/my-overview/my-overview.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>{{ \'core.courses.courseoverview\' | translate }}</ion-title>\n\n        <ion-buttons end>\n            <button *ngIf="tabShown == \'courses\' && courses[courses.selected] && courses[courses.selected].length > 5" ion-button icon-only [attr.aria-label]="\'core.courses.filtermycourses\' | translate" (click)="switchFilter()">\n                <ion-icon name="funnel"></ion-icon>\n            </button>\n            <button *ngIf="searchEnabled" ion-button icon-only (click)="openSearch()" [attr.aria-label]="\'core.courses.searchcourses\' | translate">\n                <ion-icon name="search"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n<ion-content>\n    <core-tabs [selectedIndex]="firstSelectedTab" [hideUntil]="tabsReady">\n        <!-- Site home tab. -->\n        <core-tab [show]="siteHomeEnabled" [title]="\'core.sitehome.sitehome\' | translate" (ionSelect)="tabChanged(\'sitehome\')">\n            <ng-template>\n                <core-sitehome-index></core-sitehome-index>\n            </ng-template>\n        </core-tab>\n\n        <!-- Timeline tab. -->\n        <core-tab [title]="\'core.courses.timeline\' | translate" (ionSelect)="tabChanged(\'timeline\')">\n            <ng-template>\n                <ion-content>\n                    <ion-refresher [enabled]="timeline.loaded || timelineCourses.loaded || courses.loaded" (ionRefresh)="refreshMyOverview($event)">\n                        <ion-refresher-content pullingText="{{ \'core.pulltorefresh\' | translate }}"></ion-refresher-content>\n                    </ion-refresher>\n\n                    <div no-padding [hidden]="!(timeline.loaded || timelineCourses.loaded)">\n                        <ion-select [(ngModel)]="timeline.sort" (ngModelChange)="switchSort()" interface="popover">\n                            <ion-option value="sortbydates">{{ \'core.courses.sortbydates\' | translate }}</ion-option>\n                            <ion-option value="sortbycourses">{{ \'core.courses.sortbycourses\' | translate }}</ion-option>\n                        </ion-select>\n                    </div>\n                    <core-loading [hideUntil]="timeline.loaded" [hidden]="timeline.sort != \'sortbydates\'" class="core-loading-center">\n                        <core-courses-overview-events [events]="timeline.events" showCourse="true" [canLoadMore]="timeline.canLoadMore" (loadMore)="loadMoreTimeline()"></core-courses-overview-events>\n                    </core-loading>\n                    <core-loading [hideUntil]="timelineCourses.loaded" [hidden]="timeline.sort != \'sortbycourses\'" class="core-loading-center">\n                        <ion-grid no-padding>\n                            <ion-row no-padding>\n                                <ion-col *ngFor="let course of timelineCourses.courses" no-padding col-12 col-md-6>\n                                    <core-courses-course-progress [course]="course">\n                                        <core-courses-overview-events [events]="course.events" [canLoadMore]="course.canLoadMore" (loadMore)="loadMoreCourse(course)"></core-courses-overview-events>\n                                    </core-courses-course-progress>\n                                </ion-col>\n                            </ion-row>\n                        </ion-grid>\n                        <core-empty-box *ngIf="timelineCourses.courses.length == 0" image="assets/img/icons/courses.svg" [message]="\'core.courses.nocoursesoverview\' | translate"></core-empty-box>\n                    </core-loading>\n                </ion-content>\n            </ng-template>\n        </core-tab>\n\n        <!-- Courses tab. -->\n        <core-tab [title]="\'core.courses.courses\' | translate" (ionSelect)="tabChanged(\'courses\')">\n            <ng-template>\n                <ion-content>\n                    <ion-refresher [enabled]="timeline.loaded || timelineCourses.loaded || courses.loaded" (ionRefresh)="refreshMyOverview($event)">\n                        <ion-refresher-content pullingText="{{ \'core.pulltorefresh\' | translate }}"></ion-refresher-content>\n                    </ion-refresher>\n\n                    <core-loading [hideUntil]="courses.loaded" class="core-loading-center">\n                        <!-- "Time" selector. -->\n                        <div no-padding class="clearfix" [hidden]="showFilter">\n                            <ion-select [title]="\'core.show\' | translate" [(ngModel)]="courses.selected" float-start (ngModelChange)="selectedChanged()" interface="popover">\n                                <ion-option value="inprogress">{{ \'core.courses.inprogress\' | translate }}</ion-option>\n                                <ion-option value="future">{{ \'core.courses.future\' | translate }}</ion-option>\n                                <ion-option value="past">{{ \'core.courses.past\' | translate }}</ion-option>\n                            </ion-select>\n                            <!-- Download all courses. -->\n                            <div *ngIf="courses[courses.selected] && courses[courses.selected].length > 1" class="core-button-spinner" float-end>\n                                <button *ngIf="prefetchCoursesData[courses.selected].icon && prefetchCoursesData[courses.selected].icon != \'spinner\'" ion-button icon-only clear color="dark" (click)="prefetchCourses()">\n                                    <ion-icon [name]="prefetchCoursesData[courses.selected].icon"></ion-icon>\n                                </button>\n                                <ion-spinner *ngIf="!prefetchCoursesData[courses.selected].icon || prefetchCoursesData[courses.selected].icon == \'spinner\'"></ion-spinner>\n                                <span float-end *ngIf="prefetchCoursesData[courses.selected].badge">{{prefetchCoursesData[courses.selected].badge}}</span>\n                            </div>\n                        </div>\n                        <!-- Filter courses. -->\n                        <div no-padding padding-bottom [hidden]="!showFilter">\n                            <ion-item>\n                                <ion-label item-start><ion-icon name="funnel" class="placeholder-icon"></ion-icon></ion-label>\n                                <ion-input type="text" name="filter" clearInput [(ngModel)]="courses.filter" (ngModelChange)="filterChanged($event)" [placeholder]="\'core.courses.filtermycourses\' | translate"></ion-input>\n                            </ion-item>\n                        </div>\n                        <!-- List of courses. -->\n                        <div>\n                            <ion-grid no-padding>\n                                <ion-row no-padding>\n                                    <ion-col *ngFor="let course of filteredCourses" no-padding col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 align-self-stretch>\n                                        <core-courses-course-progress [course]="course" class="core-courseoverview"></core-courses-course-progress>\n                                    </ion-col>\n                                </ion-row>\n                            </ion-grid>\n\n                            <core-empty-box *ngIf="courses[courses.selected].length == 0 && courses.selected == \'inprogress\'" image="assets/img/icons/courses.svg" [message]="\'core.courses.nocoursesinprogress\' | translate"></core-empty-box>\n                            <core-empty-box *ngIf="courses[courses.selected].length == 0 && courses.selected == \'future\'" image="assets/img/icons/courses.svg" [message]="\'core.courses.nocoursesfuture\' | translate"></core-empty-box>\n                            <core-empty-box *ngIf="courses[courses.selected].length == 0 && courses.selected == \'past\'" image="assets/img/icons/courses.svg" [message]="\'core.courses.nocoursespast\' | translate"></core-empty-box>\n                        </div>\n                    </core-loading>\n                </ion-content>\n            </ng-template>\n        </core-tab>\n    </core-tabs>\n</ion-content>'/*ion-inline-end:"/ionic-projects/moodlemobile2/src/core/courses/pages/my-overview/my-overview.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_4__providers_courses__["a" /* CoreCoursesProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_utils_dom__["a" /* CoreDomUtilsProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_my_overview__["a" /* CoreCoursesMyOverviewProvider */],
            __WEBPACK_IMPORTED_MODULE_6__course_providers_helper__["a" /* CoreCourseHelperProvider */], __WEBPACK_IMPORTED_MODULE_2__providers_sites__["a" /* CoreSitesProvider */],
            __WEBPACK_IMPORTED_MODULE_8__sitehome_providers_sitehome__["a" /* CoreSiteHomeProvider */], __WEBPACK_IMPORTED_MODULE_7__course_providers_options_delegate__["a" /* CoreCourseOptionsDelegate */]])
    ], CoreCoursesMyOverviewPage);
    return CoreCoursesMyOverviewPage;
}());

//# sourceMappingURL=my-overview.js.map

/***/ })

});
//# sourceMappingURL=0.js.map