webpackJsonp([11],{

/***/ 1837:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/@angular/core/esm5/core.js
var core = __webpack_require__(0);

// EXTERNAL MODULE: ./node_modules/ionic-angular/index.js + 3 modules
var ionic_angular = __webpack_require__(9);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/index.js + 1 modules
var _ngx_translate_core = __webpack_require__(4);

// EXTERNAL MODULE: ./src/providers/events.ts
var events = __webpack_require__(12);

// EXTERNAL MODULE: ./src/providers/sites.ts
var sites = __webpack_require__(1);

// EXTERNAL MODULE: ./src/providers/utils/dom.ts
var dom = __webpack_require__(3);

// EXTERNAL MODULE: ./src/core/courses/providers/courses.ts
var courses = __webpack_require__(72);

// EXTERNAL MODULE: ./src/core/courses/providers/helper.ts
var helper = __webpack_require__(644);

// EXTERNAL MODULE: ./src/core/course/providers/helper.ts
var providers_helper = __webpack_require__(43);

// EXTERNAL MODULE: ./src/core/course/providers/options-delegate.ts
var options_delegate = __webpack_require__(171);

// CONCATENATED MODULE: ./src/core/courses/pages/my-courses/my-courses.ts
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
var my_courses_CoreCoursesMyCoursesPage = /** @class */ (function () {
    function CoreCoursesMyCoursesPage(navCtrl, coursesProvider, domUtils, eventsProvider, sitesProvider, courseHelper, courseOptionsDelegate, coursesHelper) {
        this.navCtrl = navCtrl;
        this.coursesProvider = coursesProvider;
        this.domUtils = domUtils;
        this.eventsProvider = eventsProvider;
        this.sitesProvider = sitesProvider;
        this.courseHelper = courseHelper;
        this.courseOptionsDelegate = courseOptionsDelegate;
        this.coursesHelper = coursesHelper;
        this.filter = '';
        this.showFilter = false;
        this.coursesLoaded = false;
        this.prefetchCoursesData = {};
        this.prefetchIconInitialized = false;
        this.isDestroyed = false;
        this.courseIds = '';
    }
    /**
     * View loaded.
     */
    CoreCoursesMyCoursesPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.searchEnabled = !this.coursesProvider.isSearchCoursesDisabledInSite();
        this.downloadAllCoursesEnabled = !this.coursesProvider.isDownloadCoursesDisabledInSite();
        this.fetchCourses().finally(function () {
            _this.coursesLoaded = true;
        });
        this.myCoursesObserver = this.eventsProvider.on(courses["a" /* CoreCoursesProvider */].EVENT_MY_COURSES_UPDATED, function () {
            _this.fetchCourses();
        }, this.sitesProvider.getCurrentSiteId());
        // Refresh the enabled flags if site is updated.
        this.siteUpdatedObserver = this.eventsProvider.on(events["a" /* CoreEventsProvider */].SITE_UPDATED, function () {
            var wasEnabled = _this.downloadAllCoursesEnabled;
            _this.searchEnabled = !_this.coursesProvider.isSearchCoursesDisabledInSite();
            _this.downloadAllCoursesEnabled = !_this.coursesProvider.isDownloadCoursesDisabledInSite();
            if (!wasEnabled && _this.downloadAllCoursesEnabled && _this.coursesLoaded) {
                // Download all courses is enabled now, initialize it.
                _this.initPrefetchCoursesIcon();
            }
        }, this.sitesProvider.getCurrentSiteId());
    };
    /**
     * Fetch the user courses.
     *
     * @return {Promise<any>} Promise resolved when done.
     */
    CoreCoursesMyCoursesPage.prototype.fetchCourses = function () {
        var _this = this;
        return this.coursesProvider.getUserCourses().then(function (courses) {
            var promises = [], courseIds = courses.map(function (course) {
                return course.id;
            });
            _this.courseIds = courseIds.join(',');
            promises.push(_this.coursesHelper.loadCoursesExtraInfo(courses));
            if (_this.coursesProvider.canGetAdminAndNavOptions()) {
                promises.push(_this.coursesProvider.getCoursesAdminAndNavOptions(courseIds).then(function (options) {
                    courses.forEach(function (course) {
                        course.navOptions = options.navOptions[course.id];
                        course.admOptions = options.admOptions[course.id];
                    });
                }));
            }
            return Promise.all(promises).then(function () {
                _this.courses = courses;
                _this.filteredCourses = _this.courses;
                _this.filter = '';
                _this.initPrefetchCoursesIcon();
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
    CoreCoursesMyCoursesPage.prototype.refreshCourses = function (refresher) {
        var _this = this;
        var promises = [];
        promises.push(this.coursesProvider.invalidateUserCourses());
        promises.push(this.courseOptionsDelegate.clearAndInvalidateCoursesOptions());
        if (this.courseIds) {
            promises.push(this.coursesProvider.invalidateCoursesByField('ids', this.courseIds));
        }
        Promise.all(promises).finally(function () {
            _this.prefetchIconInitialized = false;
            _this.fetchCourses().finally(function () {
                refresher.complete();
            });
        });
    };
    /**
     * Show or hide the filter.
     */
    CoreCoursesMyCoursesPage.prototype.switchFilter = function () {
        var _this = this;
        this.filter = '';
        this.showFilter = !this.showFilter;
        this.filteredCourses = this.courses;
        if (this.showFilter) {
            setTimeout(function () {
                _this.searchbar.setFocus();
            }, 500);
        }
    };
    /**
     * Go to search courses.
     */
    CoreCoursesMyCoursesPage.prototype.openSearch = function () {
        this.navCtrl.push('CoreCoursesSearchPage');
    };
    /**
     * The filter has changed.
     *
     * @param {any} Received Event.
     */
    CoreCoursesMyCoursesPage.prototype.filterChanged = function (event) {
        var newValue = event.target.value && event.target.value.trim().toLowerCase();
        if (!newValue || !this.courses) {
            this.filteredCourses = this.courses;
        }
        else {
            this.filteredCourses = this.courses.filter(function (course) {
                return course.fullname.toLowerCase().indexOf(newValue) > -1;
            });
        }
    };
    /**
     * Prefetch all the courses.
     *
     * @return {Promise<any>} Promise resolved when done.
     */
    CoreCoursesMyCoursesPage.prototype.prefetchCourses = function () {
        var _this = this;
        var initialIcon = this.prefetchCoursesData.icon;
        this.prefetchCoursesData.icon = 'spinner';
        this.prefetchCoursesData.badge = '';
        return this.courseHelper.confirmAndPrefetchCourses(this.courses, function (progress) {
            _this.prefetchCoursesData.badge = progress.count + ' / ' + progress.total;
        }).then(function () {
            _this.prefetchCoursesData.icon = 'ion-android-refresh';
        }).catch(function (error) {
            if (!_this.isDestroyed) {
                _this.domUtils.showErrorModalDefault(error, 'core.course.errordownloadingcourse', true);
                _this.prefetchCoursesData.icon = initialIcon;
            }
        }).finally(function () {
            _this.prefetchCoursesData.badge = '';
        });
    };
    /**
     * Initialize the prefetch icon for the list of courses.
     */
    CoreCoursesMyCoursesPage.prototype.initPrefetchCoursesIcon = function () {
        var _this = this;
        if (this.prefetchIconInitialized || !this.downloadAllCoursesEnabled) {
            // Already initialized.
            return;
        }
        this.prefetchIconInitialized = true;
        if (!this.courses || this.courses.length < 2) {
            // Not enough courses.
            this.prefetchCoursesData.icon = '';
            return;
        }
        this.courseHelper.determineCoursesStatus(this.courses).then(function (status) {
            var icon = _this.courseHelper.getCourseStatusIconAndTitleFromStatus(status).icon;
            if (icon == 'spinner') {
                // It seems all courses are being downloaded, show a download button instead.
                icon = 'cloud-download';
            }
            _this.prefetchCoursesData.icon = icon;
        });
    };
    /**
     * Page destroyed.
     */
    CoreCoursesMyCoursesPage.prototype.ngOnDestroy = function () {
        this.isDestroyed = true;
        this.myCoursesObserver && this.myCoursesObserver.off();
        this.siteUpdatedObserver && this.siteUpdatedObserver.off();
    };
    __decorate([
        Object(core["_9" /* ViewChild */])('searchbar'),
        __metadata("design:type", ionic_angular["x" /* Searchbar */])
    ], CoreCoursesMyCoursesPage.prototype, "searchbar", void 0);
    CoreCoursesMyCoursesPage = __decorate([
        Object(core["m" /* Component */])({
            selector: 'page-core-courses-my-courses',
            templateUrl: 'my-courses.html',
        }),
        __metadata("design:paramtypes", [ionic_angular["r" /* NavController */], courses["a" /* CoreCoursesProvider */],
            dom["a" /* CoreDomUtilsProvider */], events["a" /* CoreEventsProvider */],
            sites["a" /* CoreSitesProvider */], providers_helper["a" /* CoreCourseHelperProvider */],
            options_delegate["a" /* CoreCourseOptionsDelegate */], helper["a" /* CoreCoursesHelperProvider */]])
    ], CoreCoursesMyCoursesPage);
    return CoreCoursesMyCoursesPage;
}());

//# sourceMappingURL=my-courses.js.map
// EXTERNAL MODULE: ./src/components/components.module.ts
var components_module = __webpack_require__(32);

// EXTERNAL MODULE: ./src/directives/directives.module.ts + 2 modules
var directives_module = __webpack_require__(28);

// EXTERNAL MODULE: ./src/core/courses/components/components.module.ts
var components_components_module = __webpack_require__(1289);

// CONCATENATED MODULE: ./src/core/courses/pages/my-courses/my-courses.module.ts
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
var my_courses_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var my_courses_module_CoreCoursesMyCoursesPageModule = /** @class */ (function () {
    function CoreCoursesMyCoursesPageModule() {
    }
    CoreCoursesMyCoursesPageModule = my_courses_module___decorate([
        Object(core["I" /* NgModule */])({
            declarations: [
                my_courses_CoreCoursesMyCoursesPage,
            ],
            imports: [
                components_module["a" /* CoreComponentsModule */],
                directives_module["a" /* CoreDirectivesModule */],
                components_components_module["a" /* CoreCoursesComponentsModule */],
                ionic_angular["l" /* IonicPageModule */].forChild(my_courses_CoreCoursesMyCoursesPage),
                _ngx_translate_core["b" /* TranslateModule */].forChild()
            ],
        })
    ], CoreCoursesMyCoursesPageModule);
    return CoreCoursesMyCoursesPageModule;
}());

//# sourceMappingURL=my-courses.module.js.map
// EXTERNAL MODULE: ./node_modules/ionic-angular/components/action-sheet/action-sheet-component.ngfactory.js
var action_sheet_component_ngfactory = __webpack_require__(1273);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/alert/alert-component.ngfactory.js
var alert_component_ngfactory = __webpack_require__(1274);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/app/app-root.ngfactory.js
var app_root_ngfactory = __webpack_require__(1275);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/loading/loading-component.ngfactory.js
var loading_component_ngfactory = __webpack_require__(1276);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/modal/modal-component.ngfactory.js
var modal_component_ngfactory = __webpack_require__(1277);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/picker/picker-component.ngfactory.js + 1 modules
var picker_component_ngfactory = __webpack_require__(1278);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/popover/popover-component.ngfactory.js
var popover_component_ngfactory = __webpack_require__(1279);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/select/select-popover-component.ngfactory.js
var select_popover_component_ngfactory = __webpack_require__(1280);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toast/toast-component.ngfactory.js
var toast_component_ngfactory = __webpack_require__(1281);

// EXTERNAL MODULE: ./src/components/context-menu/context-menu-popover.ngfactory.js
var context_menu_popover_ngfactory = __webpack_require__(1284);

// EXTERNAL MODULE: ./src/components/course-picker-menu/course-picker-menu-popover.ngfactory.js
var course_picker_menu_popover_ngfactory = __webpack_require__(1285);

// EXTERNAL MODULE: ./src/components/recaptcha/recaptchamodal.ngfactory.js
var recaptchamodal_ngfactory = __webpack_require__(1286);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.ngfactory.js
var button_ngfactory = __webpack_require__(45);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.js
var button_button = __webpack_require__(40);

// EXTERNAL MODULE: ./node_modules/ionic-angular/config/config.js
var config = __webpack_require__(6);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.pipe.js
var translate_pipe = __webpack_require__(29);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.service.js
var translate_service = __webpack_require__(17);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/icon/icon.js
var icon = __webpack_require__(41);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/searchbar/searchbar.ngfactory.js
var searchbar_ngfactory = __webpack_require__(1891);

// EXTERNAL MODULE: ./node_modules/@angular/forms/esm5/forms.js
var esm5_forms = __webpack_require__(18);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/searchbar/searchbar.js
var searchbar = __webpack_require__(642);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/platform.js + 1 modules
var platform = __webpack_require__(14);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/grid/col.js
var col = __webpack_require__(114);

// EXTERNAL MODULE: ./src/core/courses/components/course-progress/course-progress.ngfactory.js
var course_progress_ngfactory = __webpack_require__(1892);

// EXTERNAL MODULE: ./src/core/courses/components/course-progress/course-progress.ts
var course_progress = __webpack_require__(1303);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-controller.js
var nav_controller = __webpack_require__(21);

// EXTERNAL MODULE: ./src/core/course/providers/format-delegate.ts
var format_delegate = __webpack_require__(146);

// EXTERNAL MODULE: ./src/core/course/providers/course.ts
var course = __webpack_require__(15);

// EXTERNAL MODULE: ./src/components/empty-box/empty-box.ngfactory.js
var empty_box_ngfactory = __webpack_require__(164);

// EXTERNAL MODULE: ./src/components/empty-box/empty-box.ts
var empty_box = __webpack_require__(133);

// EXTERNAL MODULE: ./node_modules/@angular/common/esm5/common.js
var common = __webpack_require__(8);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-header.js
var toolbar_header = __webpack_require__(417);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/view-controller.js
var view_controller = __webpack_require__(35);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/navbar.ngfactory.js
var navbar_ngfactory = __webpack_require__(1282);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/navbar.js
var navbar = __webpack_require__(191);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/app/app.js + 3 modules
var app = __webpack_require__(26);

// EXTERNAL MODULE: ./src/directives/back-button.ts
var back_button = __webpack_require__(632);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.ngfactory.js
var toolbar_title_ngfactory = __webpack_require__(1283);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.js
var toolbar_title = __webpack_require__(324);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar.js
var toolbar = __webpack_require__(236);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-item.js
var toolbar_item = __webpack_require__(418);

// EXTERNAL MODULE: ./src/components/context-menu/context-menu.ngfactory.js
var context_menu_ngfactory = __webpack_require__(85);

// EXTERNAL MODULE: ./src/components/context-menu/context-menu.ts
var context_menu = __webpack_require__(70);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/popover/popover-controller.js
var popover_controller = __webpack_require__(68);

// EXTERNAL MODULE: ./src/components/tabs/tab.ts
var tab = __webpack_require__(69);

// EXTERNAL MODULE: ./src/components/context-menu/context-menu-item.ngfactory.js
var context_menu_item_ngfactory = __webpack_require__(86);

// EXTERNAL MODULE: ./src/components/context-menu/context-menu-item.ts
var context_menu_item = __webpack_require__(77);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.ngfactory.js
var content_ngfactory = __webpack_require__(178);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.js
var content = __webpack_require__(23);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/dom-controller.js
var dom_controller = __webpack_require__(25);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/keyboard.js
var keyboard = __webpack_require__(99);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/refresher/refresher.js
var refresher = __webpack_require__(132);

// EXTERNAL MODULE: ./node_modules/ionic-angular/gestures/gesture-controller.js
var gesture_controller = __webpack_require__(36);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/refresher/refresher-content.ngfactory.js
var refresher_content_ngfactory = __webpack_require__(192);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/refresher/refresher-content.js
var refresher_content = __webpack_require__(144);

// EXTERNAL MODULE: ./src/components/loading/loading.ngfactory.js
var loading_ngfactory = __webpack_require__(56);

// EXTERNAL MODULE: ./src/components/loading/loading.ts
var loading = __webpack_require__(50);

// EXTERNAL MODULE: ./src/providers/utils/utils.ts
var utils = __webpack_require__(2);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/grid/grid.js
var grid = __webpack_require__(149);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/grid/row.js
var row = __webpack_require__(115);

// CONCATENATED MODULE: ./src/core/courses/pages/my-courses/my-courses.ngfactory.js
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 

























































var styles_CoreCoursesMyCoursesPage = [];
var RenderType_CoreCoursesMyCoursesPage = core["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_CoreCoursesMyCoursesPage, data: {} });

function View_CoreCoursesMyCoursesPage_1(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 6, "button", [["icon-only", ""], ["ion-button", ""]], [[1, "aria-label", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.openSearch() !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](1, 1097728, [[2, 4]], 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                "])), (_l()(), core["_31" /* ɵeld */](4, 0, null, 0, 1, "ion-icon", [["name", "search"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](5, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n            "]))], function (_ck, _v) { var currVal_2 = "search"; _ck(_v, 5, 0, currVal_2); }, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 0, 0, core["_44" /* ɵnov */](_v, 2).transform("core.courses.searchcourses")); _ck(_v, 0, 0, currVal_0); var currVal_1 = core["_44" /* ɵnov */](_v, 5)._hidden; _ck(_v, 4, 0, currVal_1); }); }
function View_CoreCoursesMyCoursesPage_2(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 6, "ion-searchbar", [], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "searchbar-animated", null], [2, "searchbar-has-value", null], [2, "searchbar-active", null], [2, "searchbar-show-cancel", null], [2, "searchbar-left-aligned", null], [2, "searchbar-has-focus", null]], [[null, "ngModelChange"], [null, "ionInput"], [null, "ionCancel"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("ngModelChange" === en)) {
        var pd_0 = ((_co.filter = $event) !== false);
        ad = (pd_0 && ad);
    } if (("ionInput" === en)) {
        var pd_1 = (_co.filterChanged($event) !== false);
        ad = (pd_1 && ad);
    } if (("ionCancel" === en)) {
        var pd_2 = (_co.filterChanged() !== false);
        ad = (pd_2 && ad);
    } return ad; }, searchbar_ngfactory["b" /* View_Searchbar_0 */], searchbar_ngfactory["a" /* RenderType_Searchbar */])), core["_30" /* ɵdid */](1, 671744, null, 0, esm5_forms["q" /* NgModel */], [[8, null], [8, null], [8, null], [8, null]], { model: [0, "model"] }, { update: "ngModelChange" }), core["_50" /* ɵprd */](2048, null, esm5_forms["m" /* NgControl */], null, [esm5_forms["q" /* NgModel */]]), core["_30" /* ɵdid */](3, 16384, null, 0, esm5_forms["n" /* NgControlStatus */], [esm5_forms["m" /* NgControl */]], null, null), core["_30" /* ɵdid */](4, 1294336, [[1, 4], ["searchbar", 4]], 0, searchbar["a" /* Searchbar */], [config["a" /* Config */], platform["a" /* Platform */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, esm5_forms["m" /* NgControl */]]], { placeholder: [0, "placeholder"] }, { ionInput: "ionInput", ionCancel: "ionCancel" }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "]))], function (_ck, _v) { var _co = _v.component; var currVal_13 = _co.filter; _ck(_v, 1, 0, currVal_13); var currVal_14 = core["_56" /* ɵunv */](_v, 4, 0, core["_44" /* ɵnov */](_v, 5).transform("core.courses.filtermycourses")); _ck(_v, 4, 0, currVal_14); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 3).ngClassUntouched; var currVal_1 = core["_44" /* ɵnov */](_v, 3).ngClassTouched; var currVal_2 = core["_44" /* ɵnov */](_v, 3).ngClassPristine; var currVal_3 = core["_44" /* ɵnov */](_v, 3).ngClassDirty; var currVal_4 = core["_44" /* ɵnov */](_v, 3).ngClassValid; var currVal_5 = core["_44" /* ɵnov */](_v, 3).ngClassInvalid; var currVal_6 = core["_44" /* ɵnov */](_v, 3).ngClassPending; var currVal_7 = core["_44" /* ɵnov */](_v, 4)._animated; var currVal_8 = core["_44" /* ɵnov */](_v, 4)._value; var currVal_9 = core["_44" /* ɵnov */](_v, 4)._isActive; var currVal_10 = core["_44" /* ɵnov */](_v, 4)._showCancelButton; var currVal_11 = core["_44" /* ɵnov */](_v, 4)._shouldAlignLeft; var currVal_12 = core["_44" /* ɵnov */](_v, 4)._isFocus; _ck(_v, 0, 1, [currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8, currVal_9, currVal_10, currVal_11, currVal_12]); }); }
function View_CoreCoursesMyCoursesPage_3(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 5, "ion-col", [["align-self-stretch", ""], ["class", "col"], ["col-12", ""], ["col-lg-4", ""], ["col-md-6", ""], ["col-sm-6", ""], ["col-xl-4", ""], ["no-padding", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, col["a" /* Col */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 1, "core-courses-course-progress", [["class", "core-courseoverview"]], null, null, null, course_progress_ngfactory["b" /* View_CoreCoursesCourseProgressComponent_0 */], course_progress_ngfactory["a" /* RenderType_CoreCoursesCourseProgressComponent */])), core["_30" /* ɵdid */](4, 245760, null, 0, course_progress["a" /* CoreCoursesCourseProgressComponent */], [[2, nav_controller["a" /* NavController */]], providers_helper["a" /* CoreCourseHelperProvider */], format_delegate["a" /* CoreCourseFormatDelegate */], dom["a" /* CoreDomUtilsProvider */], course["a" /* CoreCourseProvider */], events["a" /* CoreEventsProvider */], sites["a" /* CoreSitesProvider */], courses["a" /* CoreCoursesProvider */]], { course: [0, "course"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "]))], function (_ck, _v) { var currVal_0 = _v.context.$implicit; _ck(_v, 4, 0, currVal_0); }, null); }
function View_CoreCoursesMyCoursesPage_5(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "p", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](1, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], null, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 1, 0, core["_44" /* ɵnov */](_v, 2).transform("core.courses.searchcoursesadvice")); _ck(_v, 1, 0, currVal_0); }); }
function View_CoreCoursesMyCoursesPage_4(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 6, "core-empty-box", [["icon", "ionic"]], null, null, null, empty_box_ngfactory["b" /* View_CoreEmptyBoxComponent_0 */], empty_box_ngfactory["a" /* RenderType_CoreEmptyBoxComponent */])), core["_30" /* ɵdid */](1, 49152, null, 0, empty_box["a" /* CoreEmptyBoxComponent */], [], { message: [0, "message"], icon: [1, "icon"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_CoreCoursesMyCoursesPage_5)), core["_30" /* ɵdid */](5, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = core["_56" /* ɵunv */](_v, 1, 0, core["_44" /* ɵnov */](_v, 2).transform("core.courses.nocourses")); var currVal_1 = "ionic"; _ck(_v, 1, 0, currVal_0, currVal_1); var currVal_2 = _co.searchEnabled; _ck(_v, 5, 0, currVal_2); }, null); }
function View_CoreCoursesMyCoursesPage_0(_l) { return core["_57" /* ɵvid */](0, [core["_52" /* ɵqud */](671088640, 1, { searchbar: 0 }), (_l()(), core["_31" /* ɵeld */](1, 0, null, null, 32, "ion-header", [], null, null, null, null, null)), core["_30" /* ɵdid */](2, 16384, null, 0, toolbar_header["a" /* Header */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, view_controller["a" /* ViewController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_31" /* ɵeld */](4, 0, null, null, 28, "ion-navbar", [["class", "toolbar"], ["core-back-button", ""]], [[8, "hidden", 0], [2, "statusbar-padding", null]], null, null, navbar_ngfactory["b" /* View_Navbar_0 */], navbar_ngfactory["a" /* RenderType_Navbar */])), core["_30" /* ɵdid */](5, 49152, null, 0, navbar["a" /* Navbar */], [app["a" /* App */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_30" /* ɵdid */](6, 212992, null, 0, back_button["a" /* CoreBackButtonDirective */], [navbar["a" /* Navbar */], platform["a" /* Platform */], translate_service["a" /* TranslateService */], events["a" /* CoreEventsProvider */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n        "])), (_l()(), core["_31" /* ɵeld */](8, 0, null, 3, 3, "ion-title", [], null, null, null, toolbar_title_ngfactory["b" /* View_ToolbarTitle_0 */], toolbar_title_ngfactory["a" /* RenderType_ToolbarTitle */])), core["_30" /* ɵdid */](9, 49152, null, 0, toolbar_title["a" /* ToolbarTitle */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), (_l()(), core["_55" /* ɵted */](10, 0, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n\n        "])), (_l()(), core["_31" /* ɵeld */](13, 0, null, 2, 18, "ion-buttons", [["end", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](14, 16384, null, 1, toolbar_item["a" /* ToolbarItem */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), core["_52" /* ɵqud */](603979776, 2, { _buttons: 1 }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreCoursesMyCoursesPage_1)), core["_30" /* ɵdid */](18, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](20, 0, null, null, 10, "core-context-menu", [], null, null, null, context_menu_ngfactory["b" /* View_CoreContextMenuComponent_0 */], context_menu_ngfactory["a" /* RenderType_CoreContextMenuComponent */])), core["_30" /* ɵdid */](21, 245760, null, 0, context_menu["a" /* CoreContextMenuComponent */], [translate_service["a" /* TranslateService */], popover_controller["a" /* PopoverController */], core["t" /* ElementRef */], dom["a" /* CoreDomUtilsProvider */], [2, tab["a" /* CoreTabComponent */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                "])), (_l()(), core["_31" /* ɵeld */](23, 0, null, 0, 2, "core-context-menu-item", [], null, [[null, "action"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("action" === en)) {
        var pd_0 = (_co.prefetchCourses() !== false);
        ad = (pd_0 && ad);
    } return ad; }, context_menu_item_ngfactory["b" /* View_CoreContextMenuItemComponent_0 */], context_menu_item_ngfactory["a" /* RenderType_CoreContextMenuItemComponent */])), core["_30" /* ɵdid */](24, 770048, null, 0, context_menu_item["a" /* CoreContextMenuItemComponent */], [context_menu["a" /* CoreContextMenuComponent */]], { content: [0, "content"], iconAction: [1, "iconAction"], closeOnClick: [2, "closeOnClick"], priority: [3, "priority"], badge: [4, "badge"], hidden: [5, "hidden"] }, { action: "action" }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                "])), (_l()(), core["_31" /* ɵeld */](27, 0, null, 0, 2, "core-context-menu-item", [], null, [[null, "action"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("action" === en)) {
        var pd_0 = (_co.switchFilter() !== false);
        ad = (pd_0 && ad);
    } return ad; }, context_menu_item_ngfactory["b" /* View_CoreContextMenuItemComponent_0 */], context_menu_item_ngfactory["a" /* RenderType_CoreContextMenuItemComponent */])), core["_30" /* ɵdid */](28, 770048, null, 0, context_menu_item["a" /* CoreContextMenuItemComponent */], [context_menu["a" /* CoreContextMenuComponent */]], { content: [0, "content"], iconAction: [1, "iconAction"], priority: [2, "priority"], hidden: [3, "hidden"] }, { action: "action" }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_31" /* ɵeld */](35, 0, null, null, 31, "ion-content", [], [[2, "statusbar-padding", null], [2, "has-refresher", null]], null, null, content_ngfactory["b" /* View_Content_0 */], content_ngfactory["a" /* RenderType_Content */])), core["_30" /* ɵdid */](36, 4374528, null, 0, content["a" /* Content */], [config["a" /* Config */], platform["a" /* Platform */], dom_controller["a" /* DomController */], core["t" /* ElementRef */], core["V" /* Renderer */], app["a" /* App */], keyboard["a" /* Keyboard */], core["M" /* NgZone */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n    "])), (_l()(), core["_31" /* ɵeld */](38, 0, null, 2, 6, "ion-refresher", [], [[2, "refresher-active", null], [4, "top", null]], [[null, "ionRefresh"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("ionRefresh" === en)) {
        var pd_0 = (_co.refreshCourses($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), core["_30" /* ɵdid */](39, 212992, null, 0, refresher["a" /* Refresher */], [platform["a" /* Platform */], content["a" /* Content */], core["M" /* NgZone */], gesture_controller["l" /* GestureController */]], { enabled: [0, "enabled"] }, { ionRefresh: "ionRefresh" }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_31" /* ɵeld */](41, 0, null, null, 2, "ion-refresher-content", [], [[1, "state", 0]], null, null, refresher_content_ngfactory["b" /* View_RefresherContent_0 */], refresher_content_ngfactory["a" /* RenderType_RefresherContent */])), core["_30" /* ɵdid */](42, 114688, null, 0, refresher_content["a" /* RefresherContent */], [refresher["a" /* Refresher */], config["a" /* Config */]], { pullingText: [0, "pullingText"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n\n    "])), (_l()(), core["_31" /* ɵeld */](46, 0, null, 1, 19, "core-loading", [], null, null, null, loading_ngfactory["b" /* View_CoreLoadingComponent_0 */], loading_ngfactory["a" /* RenderType_CoreLoadingComponent */])), core["_30" /* ɵdid */](47, 638976, null, 0, loading["a" /* CoreLoadingComponent */], [translate_service["a" /* TranslateService */], core["t" /* ElementRef */], events["a" /* CoreEventsProvider */], utils["a" /* CoreUtilsProvider */]], { hideUntil: [0, "hideUntil"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_CoreCoursesMyCoursesPage_2)), core["_30" /* ɵdid */](50, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_31" /* ɵeld */](52, 0, null, 0, 9, "ion-grid", [["class", "grid"], ["no-padding", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](53, 16384, null, 0, grid["a" /* Grid */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](55, 0, null, null, 5, "ion-row", [["class", "row"], ["no-padding", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](56, 16384, null, 0, row["a" /* Row */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreCoursesMyCoursesPage_3)), core["_30" /* ɵdid */](59, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_CoreCoursesMyCoursesPage_4)), core["_30" /* ɵdid */](64, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; _ck(_v, 6, 0); var currVal_3 = _co.searchEnabled; _ck(_v, 18, 0, currVal_3); _ck(_v, 21, 0); var currVal_4 = core["_56" /* ɵunv */](_v, 24, 0, core["_44" /* ɵnov */](_v, 25).transform("core.courses.downloadcourses")); var currVal_5 = _co.prefetchCoursesData.icon; var currVal_6 = false; var currVal_7 = 800; var currVal_8 = _co.prefetchCoursesData.badge; var currVal_9 = ((!_co.downloadAllCoursesEnabled || !_co.courses) || (_co.courses.length < 2)); _ck(_v, 24, 0, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8, currVal_9); var currVal_10 = core["_56" /* ɵunv */](_v, 28, 0, core["_44" /* ɵnov */](_v, 29).transform("core.courses.filtermycourses")); var currVal_11 = "funnel"; var currVal_12 = 700; var currVal_13 = (!_co.courses || (_co.courses.length <= 5)); _ck(_v, 28, 0, currVal_10, currVal_11, currVal_12, currVal_13); var currVal_18 = _co.coursesLoaded; _ck(_v, 39, 0, currVal_18); var currVal_20 = core["_34" /* ɵinlineInterpolate */](1, "", core["_56" /* ɵunv */](_v, 42, 0, core["_44" /* ɵnov */](_v, 43).transform("core.pulltorefresh")), ""); _ck(_v, 42, 0, currVal_20); var currVal_21 = _co.coursesLoaded; _ck(_v, 47, 0, currVal_21); var currVal_22 = _co.showFilter; _ck(_v, 50, 0, currVal_22); var currVal_23 = _co.filteredCourses; _ck(_v, 59, 0, currVal_23); var currVal_24 = (!_co.courses || !_co.courses.length); _ck(_v, 64, 0, currVal_24); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 5)._hidden; var currVal_1 = core["_44" /* ɵnov */](_v, 5)._sbPadding; _ck(_v, 4, 0, currVal_0, currVal_1); var currVal_2 = core["_56" /* ɵunv */](_v, 10, 0, core["_44" /* ɵnov */](_v, 11).transform("core.courses.mycourses")); _ck(_v, 10, 0, currVal_2); var currVal_14 = core["_44" /* ɵnov */](_v, 36).statusbarPadding; var currVal_15 = core["_44" /* ɵnov */](_v, 36)._hasRefresher; _ck(_v, 35, 0, currVal_14, currVal_15); var currVal_16 = (core["_44" /* ɵnov */](_v, 39).state !== "inactive"); var currVal_17 = core["_44" /* ɵnov */](_v, 39)._top; _ck(_v, 38, 0, currVal_16, currVal_17); var currVal_19 = core["_44" /* ɵnov */](_v, 42).r.state; _ck(_v, 41, 0, currVal_19); }); }
function View_CoreCoursesMyCoursesPage_Host_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "page-core-courses-my-courses", [], null, null, null, View_CoreCoursesMyCoursesPage_0, RenderType_CoreCoursesMyCoursesPage)), core["_30" /* ɵdid */](1, 180224, null, 0, my_courses_CoreCoursesMyCoursesPage, [nav_controller["a" /* NavController */], courses["a" /* CoreCoursesProvider */], dom["a" /* CoreDomUtilsProvider */], events["a" /* CoreEventsProvider */], sites["a" /* CoreSitesProvider */], providers_helper["a" /* CoreCourseHelperProvider */], options_delegate["a" /* CoreCourseOptionsDelegate */], helper["a" /* CoreCoursesHelperProvider */]], null, null)], null, null); }
var CoreCoursesMyCoursesPageNgFactory = core["_27" /* ɵccf */]("page-core-courses-my-courses", my_courses_CoreCoursesMyCoursesPage, View_CoreCoursesMyCoursesPage_Host_0, {}, {}, []);

//# sourceMappingURL=my-courses.ngfactory.js.map
// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.loader.js
var translate_loader = __webpack_require__(320);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.compiler.js
var translate_compiler = __webpack_require__(321);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.parser.js
var translate_parser = __webpack_require__(323);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/missing-translation-handler.js
var missing_translation_handler = __webpack_require__(322);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.store.js
var translate_store = __webpack_require__(416);

// EXTERNAL MODULE: ./node_modules/ionic-angular/module.js
var ionic_angular_module = __webpack_require__(631);

// EXTERNAL MODULE: ./src/pipes/pipes.module.ts + 1 modules
var pipes_module = __webpack_require__(109);

// EXTERNAL MODULE: ./node_modules/ionic-angular/util/module-loader.js
var module_loader = __webpack_require__(237);

// CONCATENATED MODULE: ./src/core/courses/pages/my-courses/my-courses.module.ngfactory.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoreCoursesMyCoursesPageModuleNgFactory", function() { return CoreCoursesMyCoursesPageModuleNgFactory; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 































var CoreCoursesMyCoursesPageModuleNgFactory = core["_28" /* ɵcmf */](my_courses_module_CoreCoursesMyCoursesPageModule, [], function (_l) { return core["_40" /* ɵmod */]([core["_41" /* ɵmpd */](512, core["o" /* ComponentFactoryResolver */], core["_21" /* ɵCodegenComponentFactoryResolver */], [[8, [action_sheet_component_ngfactory["a" /* ActionSheetCmpNgFactory */], alert_component_ngfactory["a" /* AlertCmpNgFactory */], app_root_ngfactory["a" /* IonicAppNgFactory */], loading_component_ngfactory["a" /* LoadingCmpNgFactory */], modal_component_ngfactory["a" /* ModalCmpNgFactory */], picker_component_ngfactory["a" /* PickerCmpNgFactory */], popover_component_ngfactory["a" /* PopoverCmpNgFactory */], select_popover_component_ngfactory["a" /* SelectPopoverNgFactory */], toast_component_ngfactory["a" /* ToastCmpNgFactory */], context_menu_popover_ngfactory["a" /* CoreContextMenuPopoverComponentNgFactory */], course_picker_menu_popover_ngfactory["a" /* CoreCoursePickerMenuPopoverComponentNgFactory */], recaptchamodal_ngfactory["a" /* CoreRecaptchaModalComponentNgFactory */], CoreCoursesMyCoursesPageNgFactory]], [3, core["o" /* ComponentFactoryResolver */]], core["K" /* NgModuleRef */]]), core["_41" /* ɵmpd */](4608, common["m" /* NgLocalization */], common["l" /* NgLocaleLocalization */], [core["G" /* LOCALE_ID */], [2, common["v" /* ɵa */]]]), core["_41" /* ɵmpd */](4608, esm5_forms["x" /* ɵi */], esm5_forms["x" /* ɵi */], []), core["_41" /* ɵmpd */](4608, esm5_forms["d" /* FormBuilder */], esm5_forms["d" /* FormBuilder */], []), core["_41" /* ɵmpd */](4608, translate_loader["b" /* TranslateLoader */], translate_loader["a" /* TranslateFakeLoader */], []), core["_41" /* ɵmpd */](4608, translate_compiler["a" /* TranslateCompiler */], translate_compiler["b" /* TranslateFakeCompiler */], []), core["_41" /* ɵmpd */](4608, translate_parser["b" /* TranslateParser */], translate_parser["a" /* TranslateDefaultParser */], []), core["_41" /* ɵmpd */](4608, missing_translation_handler["b" /* MissingTranslationHandler */], missing_translation_handler["a" /* FakeMissingTranslationHandler */], []), core["_41" /* ɵmpd */](4608, translate_service["a" /* TranslateService */], translate_service["a" /* TranslateService */], [translate_store["a" /* TranslateStore */], translate_loader["b" /* TranslateLoader */], translate_compiler["a" /* TranslateCompiler */], translate_parser["b" /* TranslateParser */], missing_translation_handler["b" /* MissingTranslationHandler */], translate_service["b" /* USE_DEFAULT_LANG */], translate_service["c" /* USE_STORE */]]), core["_41" /* ɵmpd */](512, common["b" /* CommonModule */], common["b" /* CommonModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["v" /* ɵba */], esm5_forms["v" /* ɵba */], []), core["_41" /* ɵmpd */](512, esm5_forms["i" /* FormsModule */], esm5_forms["i" /* FormsModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["s" /* ReactiveFormsModule */], esm5_forms["s" /* ReactiveFormsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["a" /* IonicModule */], ionic_angular_module["a" /* IonicModule */], []), core["_41" /* ɵmpd */](512, _ngx_translate_core["b" /* TranslateModule */], _ngx_translate_core["b" /* TranslateModule */], []), core["_41" /* ɵmpd */](512, directives_module["a" /* CoreDirectivesModule */], directives_module["a" /* CoreDirectivesModule */], []), core["_41" /* ɵmpd */](512, pipes_module["a" /* CorePipesModule */], pipes_module["a" /* CorePipesModule */], []), core["_41" /* ɵmpd */](512, components_module["a" /* CoreComponentsModule */], components_module["a" /* CoreComponentsModule */], []), core["_41" /* ɵmpd */](512, components_components_module["a" /* CoreCoursesComponentsModule */], components_components_module["a" /* CoreCoursesComponentsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["b" /* IonicPageModule */], ionic_angular_module["b" /* IonicPageModule */], []), core["_41" /* ɵmpd */](512, my_courses_module_CoreCoursesMyCoursesPageModule, my_courses_module_CoreCoursesMyCoursesPageModule, []), core["_41" /* ɵmpd */](256, translate_service["c" /* USE_STORE */], undefined, []), core["_41" /* ɵmpd */](256, translate_service["b" /* USE_DEFAULT_LANG */], undefined, []), core["_41" /* ɵmpd */](256, module_loader["a" /* LAZY_LOADED_TOKEN */], my_courses_CoreCoursesMyCoursesPage, [])]); });

//# sourceMappingURL=my-courses.module.ngfactory.js.map

/***/ }),

/***/ 1891:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RenderType_Searchbar; });
/* harmony export (immutable) */ __webpack_exports__["b"] = View_Searchbar_0;
/* unused harmony export View_Searchbar_Host_0 */
/* unused harmony export SearchbarNgFactory */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__button_button_ngfactory__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__button_button__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_config__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__icon_icon__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__searchbar__ = __webpack_require__(642);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__platform_platform__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_forms__ = __webpack_require__(18);
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 








var styles_Searchbar = [];
var RenderType_Searchbar = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_Searchbar, data: {} });

function View_Searchbar_0(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_52" /* ɵqud */](402653184, 1, { _searchbarInput: 0 }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_52" /* ɵqud */](402653184, 2, { _searchbarIcon: 0 }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_52" /* ɵqud */](402653184, 3, { _cancelButton: 0 }), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](3, 0, null, null, 8, "div", [["class", "searchbar-input-container"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](4, 0, null, null, 3, "button", [["class", "searchbar-md-cancel"], ["clear", ""], ["color", "dark"], ["ion-button", ""], ["mode", "md"], ["type", "button"]], null, [[null, "click"], [null, "mousedown"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.cancelSearchbar($event) !== false);
        ad = (pd_0 && ad);
    } if (("mousedown" === en)) {
        var pd_1 = (_co.cancelSearchbar($event) !== false);
        ad = (pd_1 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_1__button_button_ngfactory__["b" /* View_Button_0 */], __WEBPACK_IMPORTED_MODULE_1__button_button_ngfactory__["a" /* RenderType_Button */])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](5, 1097728, null, 0, __WEBPACK_IMPORTED_MODULE_2__button_button__["a" /* Button */], [[8, ""], __WEBPACK_IMPORTED_MODULE_3__config_config__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */]], { color: [0, "color"], mode: [1, "mode"], clear: [2, "clear"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](6, 0, null, 0, 1, "ion-icon", [["name", "md-arrow-back"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](7, 147456, null, 0, __WEBPACK_IMPORTED_MODULE_4__icon_icon__["a" /* Icon */], [__WEBPACK_IMPORTED_MODULE_3__config_config__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */]], { name: [0, "name"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](8, 0, [[2, 0], ["searchbarIcon", 1]], null, 0, "div", [["class", "searchbar-search-icon"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](9, 0, [[1, 0], ["searchbarInput", 1]], null, 0, "input", [["class", "searchbar-input"], ["dir", "auto"]], [[1, "placeholder", 0], [1, "type", 0], [1, "autocomplete", 0], [1, "autocorrect", 0], [1, "spellcheck", 0]], [[null, "input"], [null, "blur"], [null, "focus"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("input" === en)) {
        var pd_0 = (_co.inputChanged($event) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (_co.inputBlurred() !== false);
        ad = (pd_1 && ad);
    } if (("focus" === en)) {
        var pd_2 = (_co.inputFocused() !== false);
        ad = (pd_2 && ad);
    } return ad; }, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](10, 0, null, null, 1, "button", [["class", "searchbar-clear-icon"], ["clear", ""], ["ion-button", ""], ["type", "button"]], null, [[null, "click"], [null, "mousedown"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.clearInput($event) !== false);
        ad = (pd_0 && ad);
    } if (("mousedown" === en)) {
        var pd_1 = (_co.clearInput($event) !== false);
        ad = (pd_1 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_1__button_button_ngfactory__["b" /* View_Button_0 */], __WEBPACK_IMPORTED_MODULE_1__button_button_ngfactory__["a" /* RenderType_Button */])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](11, 1097728, null, 0, __WEBPACK_IMPORTED_MODULE_2__button_button__["a" /* Button */], [[8, ""], __WEBPACK_IMPORTED_MODULE_3__config_config__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */]], { mode: [0, "mode"], clear: [1, "clear"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](12, 0, [[3, 0]], null, 2, "button", [["class", "searchbar-ios-cancel"], ["clear", ""], ["ion-button", ""], ["mode", "ios"], ["type", "button"]], [[8, "tabIndex", 0]], [[null, "click"], [null, "mousedown"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.cancelSearchbar($event) !== false);
        ad = (pd_0 && ad);
    } if (("mousedown" === en)) {
        var pd_1 = (_co.cancelSearchbar($event) !== false);
        ad = (pd_1 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_1__button_button_ngfactory__["b" /* View_Button_0 */], __WEBPACK_IMPORTED_MODULE_1__button_button_ngfactory__["a" /* RenderType_Button */])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](13, 1097728, [["cancelButton", 4]], 0, __WEBPACK_IMPORTED_MODULE_2__button_button__["a" /* Button */], [[8, ""], __WEBPACK_IMPORTED_MODULE_3__config_config__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */]], { mode: [0, "mode"], clear: [1, "clear"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](14, 0, ["", ""]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = "dark"; var currVal_1 = "md"; var currVal_2 = ""; _ck(_v, 5, 0, currVal_0, currVal_1, currVal_2); var currVal_4 = "md-arrow-back"; _ck(_v, 7, 0, currVal_4); var currVal_10 = _co._mode; var currVal_11 = ""; _ck(_v, 11, 0, currVal_10, currVal_11); var currVal_13 = "ios"; var currVal_14 = ""; _ck(_v, 13, 0, currVal_13, currVal_14); }, function (_ck, _v) { var _co = _v.component; var currVal_3 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 7)._hidden; _ck(_v, 6, 0, currVal_3); var currVal_5 = _co.placeholder; var currVal_6 = _co.type; var currVal_7 = _co._autocomplete; var currVal_8 = _co._autocorrect; var currVal_9 = _co._spellcheck; _ck(_v, 9, 0, currVal_5, currVal_6, currVal_7, currVal_8, currVal_9); var currVal_12 = (_co._isActive ? 1 : (0 - 1)); _ck(_v, 12, 0, currVal_12); var currVal_15 = _co.cancelButtonText; _ck(_v, 14, 0, currVal_15); }); }
function View_Searchbar_Host_0(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 1, "ion-searchbar", [], [[2, "searchbar-animated", null], [2, "searchbar-has-value", null], [2, "searchbar-active", null], [2, "searchbar-show-cancel", null], [2, "searchbar-left-aligned", null], [2, "searchbar-has-focus", null]], null, null, View_Searchbar_0, RenderType_Searchbar)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](1, 1294336, null, 0, __WEBPACK_IMPORTED_MODULE_5__searchbar__["a" /* Searchbar */], [__WEBPACK_IMPORTED_MODULE_3__config_config__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_6__platform_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */], [2, __WEBPACK_IMPORTED_MODULE_7__angular_forms__["m" /* NgControl */]]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, function (_ck, _v) { var currVal_0 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 1)._animated; var currVal_1 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 1)._value; var currVal_2 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 1)._isActive; var currVal_3 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 1)._showCancelButton; var currVal_4 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 1)._shouldAlignLeft; var currVal_5 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 1)._isFocus; _ck(_v, 0, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5); }); }
var SearchbarNgFactory = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_27" /* ɵccf */]("ion-searchbar", __WEBPACK_IMPORTED_MODULE_5__searchbar__["a" /* Searchbar */], View_Searchbar_Host_0, { color: "color", mode: "mode", disabled: "disabled", cancelButtonText: "cancelButtonText", showCancelButton: "showCancelButton", debounce: "debounce", placeholder: "placeholder", autocomplete: "autocomplete", autocorrect: "autocorrect", spellcheck: "spellcheck", type: "type", animated: "animated" }, { ionFocus: "ionFocus", ionChange: "ionChange", ionBlur: "ionBlur", ionInput: "ionInput", ionCancel: "ionCancel", ionClear: "ionClear" }, []);

//# sourceMappingURL=searchbar.ngfactory.js.map

/***/ }),

/***/ 1892:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RenderType_CoreCoursesCourseProgressComponent; });
/* harmony export (immutable) */ __webpack_exports__["b"] = View_CoreCoursesCourseProgressComponent_0;
/* unused harmony export View_CoreCoursesCourseProgressComponent_Host_0 */
/* unused harmony export CoreCoursesCourseProgressComponentNgFactory */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__directives_external_content__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_logger__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_filepool__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular_platform_platform__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_sites__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_utils_dom__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_utils_url__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_app__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_utils_utils__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__node_modules_ionic_angular_components_button_button_ngfactory__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ionic_angular_components_button_button__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ionic_angular_config_config__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ngx_translate_core_src_translate_pipe__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ngx_translate_core_src_translate_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_icon_icon_ngfactory__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_icon_icon__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__node_modules_ionic_angular_components_spinner_spinner_ngfactory__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_ionic_angular_components_spinner_spinner__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__angular_common__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__node_modules_ionic_angular_components_item_item_ngfactory__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_ionic_angular_components_item_item__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22_ionic_angular_util_form__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23_ionic_angular_components_item_item_reorder__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_ionic_angular_components_item_item_content__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__directives_format_text__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__providers_utils_text__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__contentlinks_providers_helper__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28_ionic_angular_navigation_nav_controller__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29_ionic_angular_components_content_content__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__components_split_view_split_view__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__providers_utils_iframe__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__providers_events__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__components_progress_bar_progress_bar_ngfactory__ = __webpack_require__(638);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__components_progress_bar_progress_bar__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__angular_platform_browser__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36_ionic_angular_components_card_card__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__course_progress__ = __webpack_require__(1303);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__course_providers_helper__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__course_providers_format_delegate__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__course_providers_course__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__providers_courses__ = __webpack_require__(72);
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 










































var styles_CoreCoursesCourseProgressComponent = [];
var RenderType_CoreCoursesCourseProgressComponent = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_CoreCoursesCourseProgressComponent, data: {} });

function View_CoreCoursesCourseProgressComponent_1(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 1, "img", [["alt", ""], ["core-external-content", ""]], [[8, "src", 4]], null, null, null, null)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](1, 4210688, null, 0, __WEBPACK_IMPORTED_MODULE_1__directives_external_content__["a" /* CoreExternalContentDirective */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_2__providers_logger__["a" /* CoreLoggerProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_filepool__["a" /* CoreFilepoolProvider */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular_platform_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_5__providers_sites__["a" /* CoreSitesProvider */], __WEBPACK_IMPORTED_MODULE_6__providers_utils_dom__["a" /* CoreDomUtilsProvider */], __WEBPACK_IMPORTED_MODULE_7__providers_utils_url__["a" /* CoreUrlUtilsProvider */], __WEBPACK_IMPORTED_MODULE_8__providers_app__["a" /* CoreAppProvider */], __WEBPACK_IMPORTED_MODULE_9__providers_utils_utils__["a" /* CoreUtilsProvider */]], null, null)], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.course.imageThumb; _ck(_v, 0, 0, currVal_0); }); }
function View_CoreCoursesCourseProgressComponent_3(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 6, "button", [["clear", ""], ["color", "dark"], ["icon-only", ""], ["ion-button", ""]], [[1, "aria-label", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.prefetchCourse($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_10__node_modules_ionic_angular_components_button_button_ngfactory__["b" /* View_Button_0 */], __WEBPACK_IMPORTED_MODULE_10__node_modules_ionic_angular_components_button_button_ngfactory__["a" /* RenderType_Button */])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](1, 1097728, [[2, 4]], 0, __WEBPACK_IMPORTED_MODULE_11_ionic_angular_components_button_button__["a" /* Button */], [[8, ""], __WEBPACK_IMPORTED_MODULE_12_ionic_angular_config_config__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */]], { color: [0, "color"], clear: [1, "clear"] }, null), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_47" /* ɵpid */](131072, __WEBPACK_IMPORTED_MODULE_13__ngx_translate_core_src_translate_pipe__["a" /* TranslatePipe */], [__WEBPACK_IMPORTED_MODULE_14__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */]]), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 0, ["\n                "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](4, 0, null, 0, 1, "core-icon", [], null, null, null, __WEBPACK_IMPORTED_MODULE_15__components_icon_icon_ngfactory__["b" /* View_CoreIconComponent_0 */], __WEBPACK_IMPORTED_MODULE_15__components_icon_icon_ngfactory__["a" /* RenderType_CoreIconComponent */])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](5, 114688, null, 0, __WEBPACK_IMPORTED_MODULE_16__components_icon_icon__["a" /* CoreIconComponent */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */]], { name: [0, "name"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 0, ["\n            "]))], function (_ck, _v) { var _co = _v.component; var currVal_1 = "dark"; var currVal_2 = ""; _ck(_v, 1, 0, currVal_1, currVal_2); var currVal_3 = _co.prefetchCourseData.prefetchCourseIcon; _ck(_v, 5, 0, currVal_3); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_56" /* ɵunv */](_v, 0, 0, __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 2).transform(_co.prefetchCourseData.title)); _ck(_v, 0, 0, currVal_0); }); }
function View_CoreCoursesCourseProgressComponent_4(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 1, "ion-spinner", [], [[2, "spinner-paused", null]], null, null, __WEBPACK_IMPORTED_MODULE_17__node_modules_ionic_angular_components_spinner_spinner_ngfactory__["b" /* View_Spinner_0 */], __WEBPACK_IMPORTED_MODULE_17__node_modules_ionic_angular_components_spinner_spinner_ngfactory__["a" /* RenderType_Spinner */])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](1, 114688, null, 0, __WEBPACK_IMPORTED_MODULE_18_ionic_angular_components_spinner_spinner__["a" /* Spinner */], [__WEBPACK_IMPORTED_MODULE_12_ionic_angular_config_config__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, function (_ck, _v) { var currVal_0 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 1)._paused; _ck(_v, 0, 0, currVal_0); }); }
function View_CoreCoursesCourseProgressComponent_2(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 9, "div", [["class", "core-button-spinner"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreCoursesCourseProgressComponent_3)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](4, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_19__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewContainerRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreCoursesCourseProgressComponent_4)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](8, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_19__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewContainerRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n        "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = (_co.prefetchCourseData.prefetchCourseIcon != "spinner"); _ck(_v, 4, 0, currVal_0); var currVal_1 = (_co.prefetchCourseData.prefetchCourseIcon == "spinner"); _ck(_v, 8, 0, currVal_1); }, null); }
function View_CoreCoursesCourseProgressComponent_5(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 15, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, __WEBPACK_IMPORTED_MODULE_20__node_modules_ionic_angular_components_item_item_ngfactory__["b" /* View_Item_0 */], __WEBPACK_IMPORTED_MODULE_20__node_modules_ionic_angular_components_item_item_ngfactory__["a" /* RenderType_Item */])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](1, 1097728, null, 3, __WEBPACK_IMPORTED_MODULE_21_ionic_angular_components_item_item__["a" /* Item */], [__WEBPACK_IMPORTED_MODULE_22_ionic_angular_util_form__["a" /* Form */], __WEBPACK_IMPORTED_MODULE_12_ionic_angular_config_config__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */], [2, __WEBPACK_IMPORTED_MODULE_23_ionic_angular_components_item_item_reorder__["a" /* ItemReorder */]]], null, null), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_52" /* ɵqud */](335544320, 4, { contentLabel: 0 }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_52" /* ɵqud */](603979776, 5, { _buttons: 1 }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_52" /* ɵqud */](603979776, 6, { _icons: 1 }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](5, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_24_ionic_angular_components_item_item_content__["a" /* ItemContent */], [], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 2, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](7, 0, null, 2, 7, "p", [], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](9, 0, null, null, 4, "summary", [], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](11, 0, null, null, 1, "core-format-text", [], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](12, 540672, null, 0, __WEBPACK_IMPORTED_MODULE_25__directives_format_text__["a" /* CoreFormatTextDirective */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_5__providers_sites__["a" /* CoreSitesProvider */], __WEBPACK_IMPORTED_MODULE_6__providers_utils_dom__["a" /* CoreDomUtilsProvider */], __WEBPACK_IMPORTED_MODULE_26__providers_utils_text__["a" /* CoreTextUtilsProvider */], __WEBPACK_IMPORTED_MODULE_14__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular_platform_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_9__providers_utils_utils__["a" /* CoreUtilsProvider */], __WEBPACK_IMPORTED_MODULE_7__providers_utils_url__["a" /* CoreUrlUtilsProvider */], __WEBPACK_IMPORTED_MODULE_2__providers_logger__["a" /* CoreLoggerProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_filepool__["a" /* CoreFilepoolProvider */], __WEBPACK_IMPORTED_MODULE_8__providers_app__["a" /* CoreAppProvider */], __WEBPACK_IMPORTED_MODULE_27__contentlinks_providers_helper__["a" /* CoreContentLinksHelperProvider */], [2, __WEBPACK_IMPORTED_MODULE_28_ionic_angular_navigation_nav_controller__["a" /* NavController */]], [2, __WEBPACK_IMPORTED_MODULE_29_ionic_angular_components_content_content__["a" /* Content */]], [2, __WEBPACK_IMPORTED_MODULE_30__components_split_view_split_view__["a" /* CoreSplitViewComponent */]], __WEBPACK_IMPORTED_MODULE_31__providers_utils_iframe__["a" /* CoreIframeUtilsProvider */], __WEBPACK_IMPORTED_MODULE_32__providers_events__["a" /* CoreEventsProvider */]], { text: [0, "text"], clean: [1, "clean"], singleLine: [2, "singleLine"], fullOnClick: [3, "fullOnClick"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 2, ["\n    "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.course.summary; var currVal_1 = true; var currVal_2 = true; var currVal_3 = true; _ck(_v, 12, 0, currVal_0, currVal_1, currVal_2, currVal_3); }, null); }
function View_CoreCoursesCourseProgressComponent_6(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 9, "ion-item", [["class", "item item-block"]], null, null, null, __WEBPACK_IMPORTED_MODULE_20__node_modules_ionic_angular_components_item_item_ngfactory__["b" /* View_Item_0 */], __WEBPACK_IMPORTED_MODULE_20__node_modules_ionic_angular_components_item_item_ngfactory__["a" /* RenderType_Item */])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](1, 1097728, null, 3, __WEBPACK_IMPORTED_MODULE_21_ionic_angular_components_item_item__["a" /* Item */], [__WEBPACK_IMPORTED_MODULE_22_ionic_angular_util_form__["a" /* Form */], __WEBPACK_IMPORTED_MODULE_12_ionic_angular_config_config__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */], [2, __WEBPACK_IMPORTED_MODULE_23_ionic_angular_components_item_item_reorder__["a" /* ItemReorder */]]], null, null), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_52" /* ɵqud */](335544320, 7, { contentLabel: 0 }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_52" /* ɵqud */](603979776, 8, { _buttons: 1 }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_52" /* ɵqud */](603979776, 9, { _icons: 1 }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](5, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_24_ionic_angular_components_item_item_content__["a" /* ItemContent */], [], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 2, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](7, 0, null, 2, 1, "core-progress-bar", [], null, null, null, __WEBPACK_IMPORTED_MODULE_33__components_progress_bar_progress_bar_ngfactory__["b" /* View_CoreProgressBarComponent_0 */], __WEBPACK_IMPORTED_MODULE_33__components_progress_bar_progress_bar_ngfactory__["a" /* RenderType_CoreProgressBarComponent */])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](8, 573440, null, 0, __WEBPACK_IMPORTED_MODULE_34__components_progress_bar_progress_bar__["a" /* CoreProgressBarComponent */], [__WEBPACK_IMPORTED_MODULE_35__angular_platform_browser__["c" /* DomSanitizer */]], { progress: [0, "progress"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 2, ["\n    "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.course.progress; _ck(_v, 8, 0, currVal_0); }, null); }
function View_CoreCoursesCourseProgressComponent_0(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 31, "ion-card", [], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](1, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_36_ionic_angular_components_card_card__["a" /* Card */], [__WEBPACK_IMPORTED_MODULE_12_ionic_angular_config_config__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](3, 0, null, null, 4, "div", [], [[8, "className", 0], [2, "core-course-color-img", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.openCourse(_co.course) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreCoursesCourseProgressComponent_1)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](6, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_19__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewContainerRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](9, 0, null, null, 13, "ion-item", [["class", "core-course-link item item-block"], ["detail-none", ""], ["tappable", ""], ["text-wrap", ""]], [[8, "title", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.openCourse(_co.course) !== false);
        ad = (pd_0 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_20__node_modules_ionic_angular_components_item_item_ngfactory__["b" /* View_Item_0 */], __WEBPACK_IMPORTED_MODULE_20__node_modules_ionic_angular_components_item_item_ngfactory__["a" /* RenderType_Item */])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](10, 1097728, null, 3, __WEBPACK_IMPORTED_MODULE_21_ionic_angular_components_item_item__["a" /* Item */], [__WEBPACK_IMPORTED_MODULE_22_ionic_angular_util_form__["a" /* Form */], __WEBPACK_IMPORTED_MODULE_12_ionic_angular_config_config__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */], [2, __WEBPACK_IMPORTED_MODULE_23_ionic_angular_components_item_item_reorder__["a" /* ItemReorder */]]], null, null), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_52" /* ɵqud */](335544320, 1, { contentLabel: 0 }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_52" /* ɵqud */](603979776, 2, { _buttons: 1 }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_52" /* ɵqud */](603979776, 3, { _icons: 1 }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](14, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_24_ionic_angular_components_item_item_content__["a" /* ItemContent */], [], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 2, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](16, 0, null, 2, 2, "h2", [], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](17, 0, null, null, 1, "core-format-text", [], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](18, 540672, null, 0, __WEBPACK_IMPORTED_MODULE_25__directives_format_text__["a" /* CoreFormatTextDirective */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_5__providers_sites__["a" /* CoreSitesProvider */], __WEBPACK_IMPORTED_MODULE_6__providers_utils_dom__["a" /* CoreDomUtilsProvider */], __WEBPACK_IMPORTED_MODULE_26__providers_utils_text__["a" /* CoreTextUtilsProvider */], __WEBPACK_IMPORTED_MODULE_14__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular_platform_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_9__providers_utils_utils__["a" /* CoreUtilsProvider */], __WEBPACK_IMPORTED_MODULE_7__providers_utils_url__["a" /* CoreUrlUtilsProvider */], __WEBPACK_IMPORTED_MODULE_2__providers_logger__["a" /* CoreLoggerProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_filepool__["a" /* CoreFilepoolProvider */], __WEBPACK_IMPORTED_MODULE_8__providers_app__["a" /* CoreAppProvider */], __WEBPACK_IMPORTED_MODULE_27__contentlinks_providers_helper__["a" /* CoreContentLinksHelperProvider */], [2, __WEBPACK_IMPORTED_MODULE_28_ionic_angular_navigation_nav_controller__["a" /* NavController */]], [2, __WEBPACK_IMPORTED_MODULE_29_ionic_angular_components_content_content__["a" /* Content */]], [2, __WEBPACK_IMPORTED_MODULE_30__components_split_view_split_view__["a" /* CoreSplitViewComponent */]], __WEBPACK_IMPORTED_MODULE_31__providers_utils_iframe__["a" /* CoreIframeUtilsProvider */], __WEBPACK_IMPORTED_MODULE_32__providers_events__["a" /* CoreEventsProvider */]], { text: [0, "text"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 2, ["\n\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_26" /* ɵand */](16777216, null, 2, 1, null, View_CoreCoursesCourseProgressComponent_2)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](21, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_19__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewContainerRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 2, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreCoursesCourseProgressComponent_5)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](25, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_19__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewContainerRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreCoursesCourseProgressComponent_6)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](28, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_19__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewContainerRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n    "])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_43" /* ɵncd */](null, 0), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_2 = _co.course.imageThumb; _ck(_v, 6, 0, currVal_2); var currVal_4 = (_co.course.displayname || _co.course.fullname); _ck(_v, 18, 0, currVal_4); var currVal_5 = _co.downloadCourseEnabled; _ck(_v, 21, 0, currVal_5); var currVal_6 = (_co.course.summary && _co.course.summary.length); _ck(_v, 25, 0, currVal_6); var currVal_7 = ((_co.course.progress != null) && (_co.course.progress >= 0)); _ck(_v, 28, 0, currVal_7); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_34" /* ɵinlineInterpolate */](1, "core-course-thumb core-course-color-", (_co.course.id % 10), ""); var currVal_1 = _co.course.imageThumb; _ck(_v, 3, 0, currVal_0, currVal_1); var currVal_3 = (_co.course.displayname || _co.course.fullname); _ck(_v, 9, 0, currVal_3); }); }
function View_CoreCoursesCourseProgressComponent_Host_0(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 1, "core-courses-course-progress", [], null, null, null, View_CoreCoursesCourseProgressComponent_0, RenderType_CoreCoursesCourseProgressComponent)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](1, 245760, null, 0, __WEBPACK_IMPORTED_MODULE_37__course_progress__["a" /* CoreCoursesCourseProgressComponent */], [[2, __WEBPACK_IMPORTED_MODULE_28_ionic_angular_navigation_nav_controller__["a" /* NavController */]], __WEBPACK_IMPORTED_MODULE_38__course_providers_helper__["a" /* CoreCourseHelperProvider */], __WEBPACK_IMPORTED_MODULE_39__course_providers_format_delegate__["a" /* CoreCourseFormatDelegate */], __WEBPACK_IMPORTED_MODULE_6__providers_utils_dom__["a" /* CoreDomUtilsProvider */], __WEBPACK_IMPORTED_MODULE_40__course_providers_course__["a" /* CoreCourseProvider */], __WEBPACK_IMPORTED_MODULE_32__providers_events__["a" /* CoreEventsProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_sites__["a" /* CoreSitesProvider */], __WEBPACK_IMPORTED_MODULE_41__providers_courses__["a" /* CoreCoursesProvider */]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var CoreCoursesCourseProgressComponentNgFactory = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_27" /* ɵccf */]("core-courses-course-progress", __WEBPACK_IMPORTED_MODULE_37__course_progress__["a" /* CoreCoursesCourseProgressComponent */], View_CoreCoursesCourseProgressComponent_Host_0, { course: "course" }, {}, ["*"]);

//# sourceMappingURL=course-progress.ngfactory.js.map

/***/ })

});
//# sourceMappingURL=11.js.map