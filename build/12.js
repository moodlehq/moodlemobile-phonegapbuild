webpackJsonp([12],{

/***/ 1915:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/@angular/core/esm5/core.js
var core = __webpack_require__(0);

// EXTERNAL MODULE: ./node_modules/ionic-angular/index.js + 3 modules
var ionic_angular = __webpack_require__(8);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/index.js + 1 modules
var _ngx_translate_core = __webpack_require__(3);

// EXTERNAL MODULE: ./src/providers/events.ts
var events = __webpack_require__(12);

// EXTERNAL MODULE: ./src/providers/sites.ts
var sites = __webpack_require__(1);

// EXTERNAL MODULE: ./src/providers/utils/dom.ts
var dom = __webpack_require__(4);

// EXTERNAL MODULE: ./src/components/tabs/tabs.ts
var tabs = __webpack_require__(148);

// EXTERNAL MODULE: ./src/core/block/providers/delegate.ts
var delegate = __webpack_require__(164);

// EXTERNAL MODULE: ./src/core/block/components/block/block.ts
var block = __webpack_require__(669);

// EXTERNAL MODULE: ./src/core/sitehome/providers/sitehome.ts
var sitehome = __webpack_require__(206);

// EXTERNAL MODULE: ./src/core/sitehome/components/index/index.ts
var index = __webpack_require__(1364);

// EXTERNAL MODULE: ./src/core/courses/providers/courses.ts
var courses = __webpack_require__(50);

// EXTERNAL MODULE: ./src/core/courses/providers/dashboard.ts
var dashboard = __webpack_require__(458);

// CONCATENATED MODULE: ./src/core/courses/pages/dashboard/dashboard.ts
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
 * Page that displays the dashboard.
 */
var dashboard_CoreCoursesDashboardPage = /** @class */ (function () {
    function CoreCoursesDashboardPage(navCtrl, coursesProvider, sitesProvider, siteHomeProvider, eventsProvider, dashboardProvider, domUtils, blockDelegate) {
        this.navCtrl = navCtrl;
        this.coursesProvider = coursesProvider;
        this.sitesProvider = sitesProvider;
        this.siteHomeProvider = siteHomeProvider;
        this.eventsProvider = eventsProvider;
        this.dashboardProvider = dashboardProvider;
        this.domUtils = domUtils;
        this.blockDelegate = blockDelegate;
        this.siteHomeEnabled = false;
        this.tabsReady = false;
        this.tabs = [];
        this.dashboardEnabled = false;
        this.dashboardLoaded = false;
        this.downloadEnabledIcon = 'square-outline'; // Disabled by default.
        this.loadSiteName();
    }
    /**
     * View loaded.
     */
    CoreCoursesDashboardPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.searchEnabled = !this.coursesProvider.isSearchCoursesDisabledInSite();
        this.downloadCourseEnabled = !this.coursesProvider.isDownloadCourseDisabledInSite();
        this.downloadCoursesEnabled = !this.coursesProvider.isDownloadCoursesDisabledInSite();
        // Refresh the enabled flags if site is updated.
        this.updateSiteObserver = this.eventsProvider.on(events["a" /* CoreEventsProvider */].SITE_UPDATED, function () {
            _this.searchEnabled = !_this.coursesProvider.isSearchCoursesDisabledInSite();
            _this.downloadCourseEnabled = !_this.coursesProvider.isDownloadCourseDisabledInSite();
            _this.downloadCoursesEnabled = !_this.coursesProvider.isDownloadCoursesDisabledInSite();
            _this.switchDownload(_this.downloadEnabled);
            _this.loadSiteName();
        }, this.sitesProvider.getCurrentSiteId());
        var promises = [];
        promises.push(this.siteHomeProvider.isAvailable().then(function (enabled) {
            _this.siteHomeEnabled = enabled;
        }));
        promises.push(this.loadDashboardContent());
        // Decide which tab to load first.
        Promise.all(promises).finally(function () {
            if (_this.siteHomeEnabled && _this.dashboardEnabled) {
                var site = _this.sitesProvider.getCurrentSite(), displaySiteHome = site.getInfo() && site.getInfo().userhomepage === 0;
                _this.firstSelectedTab = displaySiteHome ? 0 : 1;
            }
            else {
                _this.firstSelectedTab = 0;
            }
            _this.tabsReady = true;
        });
    };
    /**
     * User entered the page.
     */
    CoreCoursesDashboardPage.prototype.ionViewDidEnter = function () {
        this.tabsComponent && this.tabsComponent.ionViewDidEnter();
    };
    /**
     * User left the page.
     */
    CoreCoursesDashboardPage.prototype.ionViewDidLeave = function () {
        this.tabsComponent && this.tabsComponent.ionViewDidLeave();
    };
    /**
     * Go to search courses.
     */
    CoreCoursesDashboardPage.prototype.openSearch = function () {
        this.navCtrl.push('CoreCoursesSearchPage');
    };
    /**
     * Load the site name.
     */
    CoreCoursesDashboardPage.prototype.loadSiteName = function () {
        this.siteName = this.sitesProvider.getCurrentSite().getInfo().sitename;
    };
    /**
     * Convenience function to fetch the dashboard data.
     *
     * @return {Promise<any>} Promise resolved when done.
     */
    CoreCoursesDashboardPage.prototype.loadDashboardContent = function () {
        var _this = this;
        return this.dashboardProvider.isAvailable().then(function (enabled) {
            if (enabled) {
                _this.userId = _this.sitesProvider.getCurrentSiteUserId();
                return _this.dashboardProvider.getDashboardBlocks().then(function (blocks) {
                    _this.blocks = blocks;
                }).catch(function (error) {
                    _this.domUtils.showErrorModal(error);
                    // Cannot get the blocks, just show dashboard if needed.
                    _this.loadFallbackBlocks();
                });
            }
            // Not enabled, check separated tabs.
            _this.loadFallbackBlocks();
        }).finally(function () {
            _this.dashboardEnabled = _this.blockDelegate.hasSupportedBlock(_this.blocks);
            _this.dashboardLoaded = true;
        });
    };
    /**
     * Refresh the dashboard data.
     *
     * @param {any} refresher Refresher.
     */
    CoreCoursesDashboardPage.prototype.refreshDashboard = function (refresher) {
        var _this = this;
        var promises = [];
        promises.push(this.dashboardProvider.invalidateDashboardBlocks());
        // Invalidate the blocks.
        this.blocksComponents.forEach(function (blockComponent) {
            promises.push(blockComponent.invalidate().catch(function () {
                // Ignore errors.
            }));
        });
        Promise.all(promises).finally(function () {
            _this.loadDashboardContent().finally(function () {
                refresher.complete();
            });
        });
    };
    /**
     * Toggle download enabled.
     */
    CoreCoursesDashboardPage.prototype.toggleDownload = function () {
        this.switchDownload(!this.downloadEnabled);
    };
    /**
     * Convenience function to switch download enabled.
     *
     * @param {boolean} enable If enable or disable.
     */
    CoreCoursesDashboardPage.prototype.switchDownload = function (enable) {
        this.downloadEnabled = (this.downloadCourseEnabled || this.downloadCoursesEnabled) && enable;
        this.downloadEnabledIcon = this.downloadEnabled ? 'checkbox-outline' : 'square-outline';
        this.eventsProvider.trigger(courses["a" /* CoreCoursesProvider */].EVENT_DASHBOARD_DOWNLOAD_ENABLED_CHANGED, { enabled: this.downloadEnabled });
    };
    /**
     * Load fallback blocks to shown before 3.6 when dashboard blocks are not supported.
     */
    CoreCoursesDashboardPage.prototype.loadFallbackBlocks = function () {
        this.blocks = [
            {
                name: 'myoverview'
            },
            {
                name: 'timeline'
            }
        ];
    };
    /**
     * Component being destroyed.
     */
    CoreCoursesDashboardPage.prototype.ngOnDestroy = function () {
        this.isDestroyed = true;
        this.updateSiteObserver && this.updateSiteObserver.off();
    };
    __decorate([
        Object(core["_9" /* ViewChild */])(tabs["a" /* CoreTabsComponent */]),
        __metadata("design:type", tabs["a" /* CoreTabsComponent */])
    ], CoreCoursesDashboardPage.prototype, "tabsComponent", void 0);
    __decorate([
        Object(core["_9" /* ViewChild */])(index["a" /* CoreSiteHomeIndexComponent */]),
        __metadata("design:type", index["a" /* CoreSiteHomeIndexComponent */])
    ], CoreCoursesDashboardPage.prototype, "siteHomeComponent", void 0);
    __decorate([
        Object(core["_10" /* ViewChildren */])(block["a" /* CoreBlockComponent */]),
        __metadata("design:type", core["T" /* QueryList */])
    ], CoreCoursesDashboardPage.prototype, "blocksComponents", void 0);
    CoreCoursesDashboardPage = __decorate([
        Object(core["m" /* Component */])({
            selector: 'page-core-courses-dashboard',
            templateUrl: 'dashboard.html',
        }),
        __metadata("design:paramtypes", [ionic_angular["s" /* NavController */], courses["a" /* CoreCoursesProvider */],
            sites["a" /* CoreSitesProvider */], sitehome["a" /* CoreSiteHomeProvider */],
            events["a" /* CoreEventsProvider */], dashboard["a" /* CoreCoursesDashboardProvider */],
            dom["a" /* CoreDomUtilsProvider */], delegate["a" /* CoreBlockDelegate */]])
    ], CoreCoursesDashboardPage);
    return CoreCoursesDashboardPage;
}());

//# sourceMappingURL=dashboard.js.map
// EXTERNAL MODULE: ./src/components/components.module.ts
var components_module = __webpack_require__(28);

// EXTERNAL MODULE: ./src/directives/directives.module.ts + 2 modules
var directives_module = __webpack_require__(29);

// EXTERNAL MODULE: ./src/core/courses/components/components.module.ts
var components_components_module = __webpack_require__(249);

// EXTERNAL MODULE: ./src/core/sitehome/components/components.module.ts
var sitehome_components_components_module = __webpack_require__(1375);

// EXTERNAL MODULE: ./src/core/block/components/components.module.ts
var block_components_components_module = __webpack_require__(683);

// CONCATENATED MODULE: ./src/core/courses/pages/dashboard/dashboard.module.ts
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
var dashboard_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var dashboard_module_CoreCoursesDashboardPageModule = /** @class */ (function () {
    function CoreCoursesDashboardPageModule() {
    }
    CoreCoursesDashboardPageModule = dashboard_module___decorate([
        Object(core["I" /* NgModule */])({
            declarations: [
                dashboard_CoreCoursesDashboardPage,
            ],
            imports: [
                components_module["a" /* CoreComponentsModule */],
                directives_module["a" /* CoreDirectivesModule */],
                components_components_module["a" /* CoreCoursesComponentsModule */],
                sitehome_components_components_module["a" /* CoreSiteHomeComponentsModule */],
                block_components_components_module["a" /* CoreBlockComponentsModule */],
                ionic_angular["l" /* IonicPageModule */].forChild(dashboard_CoreCoursesDashboardPage),
                _ngx_translate_core["b" /* TranslateModule */].forChild()
            ],
        })
    ], CoreCoursesDashboardPageModule);
    return CoreCoursesDashboardPageModule;
}());

//# sourceMappingURL=dashboard.module.js.map
// EXTERNAL MODULE: ./node_modules/ionic-angular/components/action-sheet/action-sheet-component.ngfactory.js
var action_sheet_component_ngfactory = __webpack_require__(1345);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/alert/alert-component.ngfactory.js
var alert_component_ngfactory = __webpack_require__(1346);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/app/app-root.ngfactory.js
var app_root_ngfactory = __webpack_require__(1347);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/loading/loading-component.ngfactory.js
var loading_component_ngfactory = __webpack_require__(1348);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/modal/modal-component.ngfactory.js
var modal_component_ngfactory = __webpack_require__(1349);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/picker/picker-component.ngfactory.js + 1 modules
var picker_component_ngfactory = __webpack_require__(1350);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/popover/popover-component.ngfactory.js
var popover_component_ngfactory = __webpack_require__(1351);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/select/select-popover-component.ngfactory.js
var select_popover_component_ngfactory = __webpack_require__(1352);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toast/toast-component.ngfactory.js
var toast_component_ngfactory = __webpack_require__(1353);

// EXTERNAL MODULE: ./src/components/context-menu/context-menu-popover.ngfactory.js
var context_menu_popover_ngfactory = __webpack_require__(1356);

// EXTERNAL MODULE: ./src/components/course-picker-menu/course-picker-menu-popover.ngfactory.js
var course_picker_menu_popover_ngfactory = __webpack_require__(1357);

// EXTERNAL MODULE: ./src/components/recaptcha/recaptchamodal.ngfactory.js
var recaptchamodal_ngfactory = __webpack_require__(1358);

// EXTERNAL MODULE: ./src/core/courses/components/course-options-menu/course-options-menu.ngfactory.js
var course_options_menu_ngfactory = __webpack_require__(1369);

// EXTERNAL MODULE: ./src/core/course/components/unsupported-module/unsupported-module.ngfactory.js
var unsupported_module_ngfactory = __webpack_require__(1359);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.ngfactory.js
var button_ngfactory = __webpack_require__(45);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.js
var button_button = __webpack_require__(42);

// EXTERNAL MODULE: ./node_modules/ionic-angular/config/config.js
var config = __webpack_require__(6);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.pipe.js
var translate_pipe = __webpack_require__(26);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.service.js
var translate_service = __webpack_require__(18);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/icon/icon.js
var icon = __webpack_require__(46);

// EXTERNAL MODULE: ./src/components/context-menu/context-menu-item.ngfactory.js
var context_menu_item_ngfactory = __webpack_require__(80);

// EXTERNAL MODULE: ./src/components/context-menu/context-menu-item.ts
var context_menu_item = __webpack_require__(73);

// EXTERNAL MODULE: ./src/components/context-menu/context-menu.ts
var context_menu = __webpack_require__(69);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.ngfactory.js
var content_ngfactory = __webpack_require__(185);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.js
var content = __webpack_require__(23);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/platform.js + 1 modules
var platform = __webpack_require__(14);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/dom-controller.js
var dom_controller = __webpack_require__(31);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/app/app.js + 3 modules
var app = __webpack_require__(33);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/keyboard.js
var keyboard = __webpack_require__(106);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/view-controller.js
var view_controller = __webpack_require__(36);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-controller.js
var nav_controller = __webpack_require__(21);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/refresher/refresher.js
var refresher = __webpack_require__(144);

// EXTERNAL MODULE: ./node_modules/ionic-angular/gestures/gesture-controller.js
var gesture_controller = __webpack_require__(38);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/refresher/refresher-content.ngfactory.js
var refresher_content_ngfactory = __webpack_require__(201);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/refresher/refresher-content.js
var refresher_content = __webpack_require__(158);

// EXTERNAL MODULE: ./src/core/sitehome/components/index/index.ngfactory.js + 5 modules
var index_ngfactory = __webpack_require__(1971);

// EXTERNAL MODULE: ./src/core/course/providers/course.ts
var course = __webpack_require__(15);

// EXTERNAL MODULE: ./src/core/course/providers/helper.ts
var helper = __webpack_require__(40);

// EXTERNAL MODULE: ./src/core/course/providers/module-prefetch-delegate.ts
var module_prefetch_delegate = __webpack_require__(52);

// EXTERNAL MODULE: ./src/core/block/components/block/block.ngfactory.js
var block_ngfactory = __webpack_require__(1964);

// EXTERNAL MODULE: ./src/components/empty-box/empty-box.ngfactory.js
var empty_box_ngfactory = __webpack_require__(119);

// EXTERNAL MODULE: ./src/components/empty-box/empty-box.ts
var empty_box = __webpack_require__(108);

// EXTERNAL MODULE: ./src/components/loading/loading.ngfactory.js
var loading_ngfactory = __webpack_require__(48);

// EXTERNAL MODULE: ./src/components/loading/loading.ts
var loading = __webpack_require__(47);

// EXTERNAL MODULE: ./src/providers/utils/utils.ts
var utils = __webpack_require__(2);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/list/list.js + 1 modules
var list = __webpack_require__(77);

// EXTERNAL MODULE: ./node_modules/@angular/common/esm5/common.js
var common = __webpack_require__(7);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-header.js
var toolbar_header = __webpack_require__(435);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/navbar.ngfactory.js
var navbar_ngfactory = __webpack_require__(1354);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/navbar.js
var navbar = __webpack_require__(200);

// EXTERNAL MODULE: ./src/directives/back-button.ts
var back_button = __webpack_require__(663);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.ngfactory.js
var toolbar_title_ngfactory = __webpack_require__(1355);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.js
var toolbar_title = __webpack_require__(337);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar.js
var toolbar = __webpack_require__(247);

// EXTERNAL MODULE: ./src/directives/format-text.ts
var format_text = __webpack_require__(41);

// EXTERNAL MODULE: ./src/providers/utils/text.ts
var utils_text = __webpack_require__(10);

// EXTERNAL MODULE: ./src/providers/utils/url.ts
var url = __webpack_require__(25);

// EXTERNAL MODULE: ./src/providers/logger.ts
var logger = __webpack_require__(5);

// EXTERNAL MODULE: ./src/providers/filepool.ts
var filepool = __webpack_require__(16);

// EXTERNAL MODULE: ./src/providers/app.ts
var providers_app = __webpack_require__(9);

// EXTERNAL MODULE: ./src/core/contentlinks/providers/helper.ts
var providers_helper = __webpack_require__(17);

// EXTERNAL MODULE: ./src/components/split-view/split-view.ts
var split_view = __webpack_require__(34);

// EXTERNAL MODULE: ./src/providers/utils/iframe.ts
var iframe = __webpack_require__(37);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-item.js
var toolbar_item = __webpack_require__(436);

// EXTERNAL MODULE: ./src/components/context-menu/context-menu.ngfactory.js
var context_menu_ngfactory = __webpack_require__(79);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/popover/popover-controller.js
var popover_controller = __webpack_require__(62);

// EXTERNAL MODULE: ./src/components/tabs/tab.ts
var tab = __webpack_require__(68);

// EXTERNAL MODULE: ./src/components/tabs/tabs.ngfactory.js
var tabs_ngfactory = __webpack_require__(441);

// EXTERNAL MODULE: ./src/components/tabs/tab.ngfactory.js
var tab_ngfactory = __webpack_require__(442);

// CONCATENATED MODULE: ./src/core/courses/pages/dashboard/dashboard.ngfactory.js
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 



































































var styles_CoreCoursesDashboardPage = [];
var RenderType_CoreCoursesDashboardPage = core["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_CoreCoursesDashboardPage, data: {} });

function View_CoreCoursesDashboardPage_1(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 6, "button", [["icon-only", ""], ["ion-button", ""]], [[1, "aria-label", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.openSearch() !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](1, 1097728, [[4, 4]], 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                "])), (_l()(), core["_31" /* ɵeld */](4, 0, null, 0, 1, "ion-icon", [["name", "search"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](5, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n            "]))], function (_ck, _v) { var currVal_2 = "search"; _ck(_v, 5, 0, currVal_2); }, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 0, 0, core["_44" /* ɵnov */](_v, 2).transform("core.courses.searchcourses")); _ck(_v, 0, 0, currVal_0); var currVal_1 = core["_44" /* ɵnov */](_v, 5)._hidden; _ck(_v, 4, 0, currVal_1); }); }
function View_CoreCoursesDashboardPage_2(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "core-context-menu-item", [], null, [[null, "action"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("action" === en)) {
        var pd_0 = (_co.toggleDownload() !== false);
        ad = (pd_0 && ad);
    } return ad; }, context_menu_item_ngfactory["b" /* View_CoreContextMenuItemComponent_0 */], context_menu_item_ngfactory["a" /* RenderType_CoreContextMenuItemComponent */])), core["_30" /* ɵdid */](1, 770048, null, 0, context_menu_item["a" /* CoreContextMenuItemComponent */], [context_menu["a" /* CoreContextMenuComponent */]], { content: [0, "content"], iconAction: [1, "iconAction"], priority: [2, "priority"] }, { action: "action" }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], function (_ck, _v) { var _co = _v.component; var currVal_0 = core["_56" /* ɵunv */](_v, 1, 0, core["_44" /* ɵnov */](_v, 2).transform("core.settings.showdownloadoptions")); var currVal_1 = _co.downloadEnabledIcon; var currVal_2 = 1000; _ck(_v, 1, 0, currVal_0, currVal_1, currVal_2); }, null); }
function View_CoreCoursesDashboardPage_3(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ɵeld */](1, 0, null, null, 13, "ion-content", [], [[2, "statusbar-padding", null], [2, "has-refresher", null]], null, null, content_ngfactory["b" /* View_Content_0 */], content_ngfactory["a" /* RenderType_Content */])), core["_30" /* ɵdid */](2, 4374528, [[6, 4]], 0, content["a" /* Content */], [config["a" /* Config */], platform["a" /* Platform */], dom_controller["a" /* DomController */], core["t" /* ElementRef */], core["V" /* Renderer */], app["a" /* App */], keyboard["a" /* Keyboard */], core["M" /* NgZone */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](4, 0, null, 2, 6, "ion-refresher", [], [[2, "refresher-active", null], [4, "top", null]], [[null, "ionRefresh"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("ionRefresh" === en)) {
        var pd_0 = (_co.siteHomeComponent.doRefresh($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), core["_30" /* ɵdid */](5, 212992, null, 0, refresher["a" /* Refresher */], [platform["a" /* Platform */], content["a" /* Content */], core["M" /* NgZone */], gesture_controller["l" /* GestureController */]], { enabled: [0, "enabled"] }, { ionRefresh: "ionRefresh" }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, null, 2, "ion-refresher-content", [], [[1, "state", 0]], null, null, refresher_content_ngfactory["b" /* View_RefresherContent_0 */], refresher_content_ngfactory["a" /* RenderType_RefresherContent */])), core["_30" /* ɵdid */](8, 114688, null, 0, refresher_content["a" /* RefresherContent */], [refresher["a" /* Refresher */], config["a" /* Config */]], { pullingText: [0, "pullingText"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](12, 0, null, 1, 1, "core-sitehome-index", [], null, null, null, index_ngfactory["b" /* View_CoreSiteHomeIndexComponent_0 */], index_ngfactory["a" /* RenderType_CoreSiteHomeIndexComponent */])), core["_30" /* ɵdid */](13, 114688, [[2, 4]], 0, index["a" /* CoreSiteHomeIndexComponent */], [dom["a" /* CoreDomUtilsProvider */], sites["a" /* CoreSitesProvider */], course["a" /* CoreCourseProvider */], helper["a" /* CoreCourseHelperProvider */], module_prefetch_delegate["a" /* CoreCourseModulePrefetchDelegate */], delegate["a" /* CoreBlockDelegate */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n                "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "]))], function (_ck, _v) { var _co = _v.component; var currVal_4 = (!!_co.siteHomeComponent && _co.siteHomeComponent.dataLoaded); _ck(_v, 5, 0, currVal_4); var currVal_6 = core["_34" /* ɵinlineInterpolate */](1, "", core["_56" /* ɵunv */](_v, 8, 0, core["_44" /* ɵnov */](_v, 9).transform("core.pulltorefresh")), ""); _ck(_v, 8, 0, currVal_6); _ck(_v, 13, 0); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 2).statusbarPadding; var currVal_1 = core["_44" /* ɵnov */](_v, 2)._hasRefresher; _ck(_v, 1, 0, currVal_0, currVal_1); var currVal_2 = (core["_44" /* ɵnov */](_v, 5).state !== "inactive"); var currVal_3 = core["_44" /* ɵnov */](_v, 5)._top; _ck(_v, 4, 0, currVal_2, currVal_3); var currVal_5 = core["_44" /* ɵnov */](_v, 8).r.state; _ck(_v, 7, 0, currVal_5); }); }
function View_CoreCoursesDashboardPage_5(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 5, null, null, null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                                "])), (_l()(), core["_31" /* ɵeld */](2, 0, null, null, 2, "core-block", [["contextLevel", "user"]], null, null, null, block_ngfactory["b" /* View_CoreBlockComponent_0 */], block_ngfactory["a" /* RenderType_CoreBlockComponent */])), core["_30" /* ɵdid */](3, 114688, [[3, 4]], 0, block["a" /* CoreBlockComponent */], [core["C" /* Injector */], delegate["a" /* CoreBlockDelegate */]], { block: [0, "block"], contextLevel: [1, "contextLevel"], instanceId: [2, "instanceId"], extraData: [3, "extraData"] }, null), core["_48" /* ɵpod */](4, { "downloadEnabled": 0 }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                            "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _v.context.$implicit; var currVal_1 = "user"; var currVal_2 = _co.userId; var currVal_3 = _ck(_v, 4, 0, _co.downloadEnabled); _ck(_v, 3, 0, currVal_0, currVal_1, currVal_2, currVal_3); }, null); }
function View_CoreCoursesDashboardPage_6(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "core-empty-box", [["icon", "qr-scanner"]], null, null, null, empty_box_ngfactory["b" /* View_CoreEmptyBoxComponent_0 */], empty_box_ngfactory["a" /* RenderType_CoreEmptyBoxComponent */])), core["_30" /* ɵdid */](1, 49152, null, 0, empty_box["a" /* CoreEmptyBoxComponent */], [], { message: [0, "message"], icon: [1, "icon"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 1, 0, core["_44" /* ɵnov */](_v, 2).transform("core.course.nocontentavailable")); var currVal_1 = "qr-scanner"; _ck(_v, 1, 0, currVal_0, currVal_1); }, null); }
function View_CoreCoursesDashboardPage_4(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ɵeld */](1, 0, null, null, 25, "ion-content", [], [[2, "statusbar-padding", null], [2, "has-refresher", null]], null, null, content_ngfactory["b" /* View_Content_0 */], content_ngfactory["a" /* RenderType_Content */])), core["_30" /* ɵdid */](2, 4374528, [[8, 4]], 0, content["a" /* Content */], [config["a" /* Config */], platform["a" /* Platform */], dom_controller["a" /* DomController */], core["t" /* ElementRef */], core["V" /* Renderer */], app["a" /* App */], keyboard["a" /* Keyboard */], core["M" /* NgZone */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](4, 0, null, 2, 6, "ion-refresher", [], [[2, "refresher-active", null], [4, "top", null]], [[null, "ionRefresh"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("ionRefresh" === en)) {
        var pd_0 = (_co.refreshDashboard($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), core["_30" /* ɵdid */](5, 212992, null, 0, refresher["a" /* Refresher */], [platform["a" /* Platform */], content["a" /* Content */], core["M" /* NgZone */], gesture_controller["l" /* GestureController */]], { enabled: [0, "enabled"] }, { ionRefresh: "ionRefresh" }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, null, 2, "ion-refresher-content", [], [[1, "state", 0]], null, null, refresher_content_ngfactory["b" /* View_RefresherContent_0 */], refresher_content_ngfactory["a" /* RenderType_RefresherContent */])), core["_30" /* ɵdid */](8, 114688, null, 0, refresher_content["a" /* RefresherContent */], [refresher["a" /* Refresher */], config["a" /* Config */]], { pullingText: [0, "pullingText"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](12, 0, null, 1, 13, "core-loading", [["class", "core-loading-center"]], null, null, null, loading_ngfactory["b" /* View_CoreLoadingComponent_0 */], loading_ngfactory["a" /* RenderType_CoreLoadingComponent */])), core["_30" /* ɵdid */](13, 638976, null, 0, loading["a" /* CoreLoadingComponent */], [translate_service["a" /* TranslateService */], core["t" /* ElementRef */], events["a" /* CoreEventsProvider */], utils["a" /* CoreUtilsProvider */]], { hideUntil: [0, "hideUntil"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](15, 0, null, 0, 6, "ion-list", [], null, null, null, null, null)), core["_30" /* ɵdid */](16, 16384, null, 0, list["a" /* List */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], platform["a" /* Platform */], gesture_controller["l" /* GestureController */], dom_controller["a" /* DomController */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                            "])), (_l()(), core["_26" /* ɵand */](16777216, [[7, 2]], null, 1, null, View_CoreCoursesDashboardPage_5)), core["_30" /* ɵdid */](20, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n\n                        "])), (_l()(), core["_26" /* ɵand */](16777216, [[7, 2]], 0, 1, null, View_CoreCoursesDashboardPage_6)), core["_30" /* ɵdid */](24, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                    "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n                "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "]))], function (_ck, _v) { var _co = _v.component; var currVal_4 = _co.dashboardLoaded; _ck(_v, 5, 0, currVal_4); var currVal_6 = core["_34" /* ɵinlineInterpolate */](1, "", core["_56" /* ɵunv */](_v, 8, 0, core["_44" /* ɵnov */](_v, 9).transform("core.pulltorefresh")), ""); _ck(_v, 8, 0, currVal_6); var currVal_7 = _co.dashboardLoaded; _ck(_v, 13, 0, currVal_7); var currVal_8 = _co.blocks; _ck(_v, 20, 0, currVal_8); var currVal_9 = (_co.blocks.length == 0); _ck(_v, 24, 0, currVal_9); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 2).statusbarPadding; var currVal_1 = core["_44" /* ɵnov */](_v, 2)._hasRefresher; _ck(_v, 1, 0, currVal_0, currVal_1); var currVal_2 = (core["_44" /* ɵnov */](_v, 5).state !== "inactive"); var currVal_3 = core["_44" /* ɵnov */](_v, 5)._top; _ck(_v, 4, 0, currVal_2, currVal_3); var currVal_5 = core["_44" /* ɵnov */](_v, 8).r.state; _ck(_v, 7, 0, currVal_5); }); }
function View_CoreCoursesDashboardPage_0(_l) { return core["_57" /* ɵvid */](0, [core["_52" /* ɵqud */](402653184, 1, { tabsComponent: 0 }), core["_52" /* ɵqud */](671088640, 2, { siteHomeComponent: 0 }), core["_52" /* ɵqud */](671088640, 3, { blocksComponents: 1 }), (_l()(), core["_55" /* ɵted */](-1, null, ["    "])), (_l()(), core["_31" /* ɵeld */](4, 0, null, null, 27, "ion-header", [], null, null, null, null, null)), core["_30" /* ɵdid */](5, 16384, null, 0, toolbar_header["a" /* Header */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, view_controller["a" /* ViewController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, null, 23, "ion-navbar", [["class", "toolbar"], ["core-back-button", ""]], [[8, "hidden", 0], [2, "statusbar-padding", null]], null, null, navbar_ngfactory["b" /* View_Navbar_0 */], navbar_ngfactory["a" /* RenderType_Navbar */])), core["_30" /* ɵdid */](8, 49152, null, 0, navbar["a" /* Navbar */], [app["a" /* App */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_30" /* ɵdid */](9, 212992, null, 0, back_button["a" /* CoreBackButtonDirective */], [navbar["a" /* Navbar */], platform["a" /* Platform */], translate_service["a" /* TranslateService */], events["a" /* CoreEventsProvider */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n        "])), (_l()(), core["_31" /* ɵeld */](11, 0, null, 3, 3, "ion-title", [], null, null, null, toolbar_title_ngfactory["b" /* View_ToolbarTitle_0 */], toolbar_title_ngfactory["a" /* RenderType_ToolbarTitle */])), core["_30" /* ɵdid */](12, 49152, null, 0, toolbar_title["a" /* ToolbarTitle */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), (_l()(), core["_31" /* ɵeld */](13, 0, null, 0, 1, "core-format-text", [], null, null, null, null, null)), core["_30" /* ɵdid */](14, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform["a" /* Platform */], utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], providers_app["a" /* CoreAppProvider */], providers_helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */]], { text: [0, "text"] }, null), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n\n        "])), (_l()(), core["_31" /* ɵeld */](16, 0, null, 2, 13, "ion-buttons", [["end", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](17, 16384, null, 1, toolbar_item["a" /* ToolbarItem */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), core["_52" /* ɵqud */](603979776, 4, { _buttons: 1 }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreCoursesDashboardPage_1)), core["_30" /* ɵdid */](21, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](23, 0, null, null, 5, "core-context-menu", [], null, null, null, context_menu_ngfactory["b" /* View_CoreContextMenuComponent_0 */], context_menu_ngfactory["a" /* RenderType_CoreContextMenuComponent */])), core["_30" /* ɵdid */](24, 245760, null, 0, context_menu["a" /* CoreContextMenuComponent */], [translate_service["a" /* TranslateService */], popover_controller["a" /* PopoverController */], core["t" /* ElementRef */], dom["a" /* CoreDomUtilsProvider */], [2, tab["a" /* CoreTabComponent */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_CoreCoursesDashboardPage_2)), core["_30" /* ɵdid */](27, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_31" /* ɵeld */](33, 0, null, null, 26, "ion-content", [], [[2, "statusbar-padding", null], [2, "has-refresher", null]], null, null, content_ngfactory["b" /* View_Content_0 */], content_ngfactory["a" /* RenderType_Content */])), core["_30" /* ɵdid */](34, 4374528, null, 0, content["a" /* Content */], [config["a" /* Config */], platform["a" /* Platform */], dom_controller["a" /* DomController */], core["t" /* ElementRef */], core["V" /* Renderer */], app["a" /* App */], keyboard["a" /* Keyboard */], core["M" /* NgZone */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n    "])), (_l()(), core["_31" /* ɵeld */](36, 0, null, 1, 22, "core-tabs", [], null, null, null, tabs_ngfactory["b" /* View_CoreTabsComponent_0 */], tabs_ngfactory["a" /* RenderType_CoreTabsComponent */])), core["_30" /* ɵdid */](37, 4964352, [[1, 4]], 0, tabs["a" /* CoreTabsComponent */], [core["t" /* ElementRef */], content["a" /* Content */], dom["a" /* CoreDomUtilsProvider */], providers_app["a" /* CoreAppProvider */], platform["a" /* Platform */], translate_service["a" /* TranslateService */]], { selectedIndex: [0, "selectedIndex"], hideUntil: [1, "hideUntil"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_31" /* ɵeld */](40, 0, null, 0, 7, "core-tab", [], null, null, null, tab_ngfactory["b" /* View_CoreTabComponent_0 */], tab_ngfactory["a" /* RenderType_CoreTabComponent */])), core["_30" /* ɵdid */](41, 245760, null, 2, tab["a" /* CoreTabComponent */], [tabs["a" /* CoreTabsComponent */], core["t" /* ElementRef */], dom["a" /* CoreDomUtilsProvider */]], { title: [0, "title"], show: [1, "show"] }, null), core["_52" /* ɵqud */](335544320, 5, { template: 0 }), core["_52" /* ɵqud */](603979776, 6, { scroll: 0 }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](0, [[5, 2]], null, 0, null, View_CoreCoursesDashboardPage_3)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n\n        "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_31" /* ɵeld */](50, 0, null, 0, 7, "core-tab", [], null, null, null, tab_ngfactory["b" /* View_CoreTabComponent_0 */], tab_ngfactory["a" /* RenderType_CoreTabComponent */])), core["_30" /* ɵdid */](51, 245760, null, 2, tab["a" /* CoreTabComponent */], [tabs["a" /* CoreTabsComponent */], core["t" /* ElementRef */], dom["a" /* CoreDomUtilsProvider */]], { title: [0, "title"], show: [1, "show"] }, null), core["_52" /* ɵqud */](603979776, 7, { template: 0 }), core["_52" /* ɵqud */](603979776, 8, { scroll: 0 }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](0, [[7, 2]], null, 0, null, View_CoreCoursesDashboardPage_4)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n"]))], function (_ck, _v) { var _co = _v.component; _ck(_v, 9, 0); var currVal_2 = _co.siteName; _ck(_v, 14, 0, currVal_2); var currVal_3 = _co.searchEnabled; _ck(_v, 21, 0, currVal_3); _ck(_v, 24, 0); var currVal_4 = (_co.downloadCourseEnabled || _co.downloadCoursesEnabled); _ck(_v, 27, 0, currVal_4); var currVal_7 = _co.firstSelectedTab; var currVal_8 = _co.tabsReady; _ck(_v, 37, 0, currVal_7, currVal_8); var currVal_9 = core["_56" /* ɵunv */](_v, 41, 0, core["_44" /* ɵnov */](_v, 44).transform("core.sitehome.sitehome")); var currVal_10 = _co.siteHomeEnabled; _ck(_v, 41, 0, currVal_9, currVal_10); var currVal_11 = core["_56" /* ɵunv */](_v, 51, 0, core["_44" /* ɵnov */](_v, 54).transform("core.courses.mymoodle")); var currVal_12 = _co.dashboardEnabled; _ck(_v, 51, 0, currVal_11, currVal_12); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 8)._hidden; var currVal_1 = core["_44" /* ɵnov */](_v, 8)._sbPadding; _ck(_v, 7, 0, currVal_0, currVal_1); var currVal_5 = core["_44" /* ɵnov */](_v, 34).statusbarPadding; var currVal_6 = core["_44" /* ɵnov */](_v, 34)._hasRefresher; _ck(_v, 33, 0, currVal_5, currVal_6); }); }
function View_CoreCoursesDashboardPage_Host_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "page-core-courses-dashboard", [], null, null, null, View_CoreCoursesDashboardPage_0, RenderType_CoreCoursesDashboardPage)), core["_30" /* ɵdid */](1, 180224, null, 0, dashboard_CoreCoursesDashboardPage, [nav_controller["a" /* NavController */], courses["a" /* CoreCoursesProvider */], sites["a" /* CoreSitesProvider */], sitehome["a" /* CoreSiteHomeProvider */], events["a" /* CoreEventsProvider */], dashboard["a" /* CoreCoursesDashboardProvider */], dom["a" /* CoreDomUtilsProvider */], delegate["a" /* CoreBlockDelegate */]], null, null)], null, null); }
var CoreCoursesDashboardPageNgFactory = core["_27" /* ɵccf */]("page-core-courses-dashboard", dashboard_CoreCoursesDashboardPage, View_CoreCoursesDashboardPage_Host_0, {}, {}, []);

//# sourceMappingURL=dashboard.ngfactory.js.map
// EXTERNAL MODULE: ./node_modules/@angular/forms/esm5/forms.js
var esm5_forms = __webpack_require__(22);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.loader.js
var translate_loader = __webpack_require__(333);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.compiler.js
var translate_compiler = __webpack_require__(334);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.parser.js
var translate_parser = __webpack_require__(336);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/missing-translation-handler.js
var missing_translation_handler = __webpack_require__(335);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.store.js
var translate_store = __webpack_require__(434);

// EXTERNAL MODULE: ./node_modules/ionic-angular/module.js
var ionic_angular_module = __webpack_require__(662);

// EXTERNAL MODULE: ./src/pipes/pipes.module.ts + 2 modules
var pipes_module = __webpack_require__(105);

// EXTERNAL MODULE: ./src/core/course/components/components.module.ts
var course_components_components_module = __webpack_require__(65);

// EXTERNAL MODULE: ./node_modules/ionic-angular/util/module-loader.js
var module_loader = __webpack_require__(248);

// CONCATENATED MODULE: ./src/core/courses/pages/dashboard/dashboard.module.ngfactory.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoreCoursesDashboardPageModuleNgFactory", function() { return CoreCoursesDashboardPageModuleNgFactory; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 




































var CoreCoursesDashboardPageModuleNgFactory = core["_28" /* ɵcmf */](dashboard_module_CoreCoursesDashboardPageModule, [], function (_l) { return core["_40" /* ɵmod */]([core["_41" /* ɵmpd */](512, core["o" /* ComponentFactoryResolver */], core["_21" /* ɵCodegenComponentFactoryResolver */], [[8, [action_sheet_component_ngfactory["a" /* ActionSheetCmpNgFactory */], alert_component_ngfactory["a" /* AlertCmpNgFactory */], app_root_ngfactory["a" /* IonicAppNgFactory */], loading_component_ngfactory["a" /* LoadingCmpNgFactory */], modal_component_ngfactory["a" /* ModalCmpNgFactory */], picker_component_ngfactory["a" /* PickerCmpNgFactory */], popover_component_ngfactory["a" /* PopoverCmpNgFactory */], select_popover_component_ngfactory["a" /* SelectPopoverNgFactory */], toast_component_ngfactory["a" /* ToastCmpNgFactory */], context_menu_popover_ngfactory["a" /* CoreContextMenuPopoverComponentNgFactory */], course_picker_menu_popover_ngfactory["a" /* CoreCoursePickerMenuPopoverComponentNgFactory */], recaptchamodal_ngfactory["a" /* CoreRecaptchaModalComponentNgFactory */], course_options_menu_ngfactory["a" /* CoreCoursesCourseOptionsMenuComponentNgFactory */], unsupported_module_ngfactory["a" /* CoreCourseUnsupportedModuleComponentNgFactory */], CoreCoursesDashboardPageNgFactory]], [3, core["o" /* ComponentFactoryResolver */]], core["K" /* NgModuleRef */]]), core["_41" /* ɵmpd */](4608, common["m" /* NgLocalization */], common["l" /* NgLocaleLocalization */], [core["G" /* LOCALE_ID */], [2, common["v" /* ɵa */]]]), core["_41" /* ɵmpd */](4608, esm5_forms["x" /* ɵi */], esm5_forms["x" /* ɵi */], []), core["_41" /* ɵmpd */](4608, esm5_forms["d" /* FormBuilder */], esm5_forms["d" /* FormBuilder */], []), core["_41" /* ɵmpd */](4608, translate_loader["b" /* TranslateLoader */], translate_loader["a" /* TranslateFakeLoader */], []), core["_41" /* ɵmpd */](4608, translate_compiler["a" /* TranslateCompiler */], translate_compiler["b" /* TranslateFakeCompiler */], []), core["_41" /* ɵmpd */](4608, translate_parser["b" /* TranslateParser */], translate_parser["a" /* TranslateDefaultParser */], []), core["_41" /* ɵmpd */](4608, missing_translation_handler["b" /* MissingTranslationHandler */], missing_translation_handler["a" /* FakeMissingTranslationHandler */], []), core["_41" /* ɵmpd */](4608, translate_service["a" /* TranslateService */], translate_service["a" /* TranslateService */], [translate_store["a" /* TranslateStore */], translate_loader["b" /* TranslateLoader */], translate_compiler["a" /* TranslateCompiler */], translate_parser["b" /* TranslateParser */], missing_translation_handler["b" /* MissingTranslationHandler */], translate_service["b" /* USE_DEFAULT_LANG */], translate_service["c" /* USE_STORE */]]), core["_41" /* ɵmpd */](512, common["b" /* CommonModule */], common["b" /* CommonModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["v" /* ɵba */], esm5_forms["v" /* ɵba */], []), core["_41" /* ɵmpd */](512, esm5_forms["i" /* FormsModule */], esm5_forms["i" /* FormsModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["s" /* ReactiveFormsModule */], esm5_forms["s" /* ReactiveFormsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["a" /* IonicModule */], ionic_angular_module["a" /* IonicModule */], []), core["_41" /* ɵmpd */](512, _ngx_translate_core["b" /* TranslateModule */], _ngx_translate_core["b" /* TranslateModule */], []), core["_41" /* ɵmpd */](512, directives_module["a" /* CoreDirectivesModule */], directives_module["a" /* CoreDirectivesModule */], []), core["_41" /* ɵmpd */](512, pipes_module["a" /* CorePipesModule */], pipes_module["a" /* CorePipesModule */], []), core["_41" /* ɵmpd */](512, components_module["a" /* CoreComponentsModule */], components_module["a" /* CoreComponentsModule */], []), core["_41" /* ɵmpd */](512, components_components_module["a" /* CoreCoursesComponentsModule */], components_components_module["a" /* CoreCoursesComponentsModule */], []), core["_41" /* ɵmpd */](512, course_components_components_module["a" /* CoreCourseComponentsModule */], course_components_components_module["a" /* CoreCourseComponentsModule */], []), core["_41" /* ɵmpd */](512, block_components_components_module["a" /* CoreBlockComponentsModule */], block_components_components_module["a" /* CoreBlockComponentsModule */], []), core["_41" /* ɵmpd */](512, sitehome_components_components_module["a" /* CoreSiteHomeComponentsModule */], sitehome_components_components_module["a" /* CoreSiteHomeComponentsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["b" /* IonicPageModule */], ionic_angular_module["b" /* IonicPageModule */], []), core["_41" /* ɵmpd */](512, dashboard_module_CoreCoursesDashboardPageModule, dashboard_module_CoreCoursesDashboardPageModule, []), core["_41" /* ɵmpd */](256, translate_service["c" /* USE_STORE */], undefined, []), core["_41" /* ɵmpd */](256, translate_service["b" /* USE_DEFAULT_LANG */], undefined, []), core["_41" /* ɵmpd */](256, module_loader["a" /* LAZY_LOADED_TOKEN */], dashboard_CoreCoursesDashboardPage, [])]); });

//# sourceMappingURL=dashboard.module.ngfactory.js.map

/***/ }),

/***/ 1964:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RenderType_CoreBlockComponent; });
/* harmony export (immutable) */ __webpack_exports__["b"] = View_CoreBlockComponent_0;
/* unused harmony export View_CoreBlockComponent_Host_0 */
/* unused harmony export CoreBlockComponentNgFactory */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_dynamic_component_dynamic_component_ngfactory__ = __webpack_require__(1360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_dynamic_component_dynamic_component__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_logger__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular_navigation_nav_controller__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_utils_dom__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__block__ = __webpack_require__(669);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_delegate__ = __webpack_require__(164);
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 









var styles_CoreBlockComponent = [];
var RenderType_CoreBlockComponent = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_CoreBlockComponent, data: {} });

function View_CoreBlockComponent_1(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 4, "div", [], [[8, "className", 0]], null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](2, 0, null, null, 1, "core-dynamic-component", [], null, null, null, __WEBPACK_IMPORTED_MODULE_1__components_dynamic_component_dynamic_component_ngfactory__["b" /* View_CoreDynamicComponent_0 */], __WEBPACK_IMPORTED_MODULE_1__components_dynamic_component_dynamic_component_ngfactory__["a" /* RenderType_CoreDynamicComponent */])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](3, 901120, [[1, 4]], 0, __WEBPACK_IMPORTED_MODULE_2__components_dynamic_component_dynamic_component__["a" /* CoreDynamicComponent */], [__WEBPACK_IMPORTED_MODULE_3__providers_logger__["a" /* CoreLoggerProvider */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* ComponentFactoryResolver */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* KeyValueDiffers */], [2, __WEBPACK_IMPORTED_MODULE_4_ionic_angular_navigation_nav_controller__["a" /* NavController */]], __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_5__providers_utils_dom__["a" /* CoreDomUtilsProvider */]], { component: [0, "component"], data: [1, "data"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_1 = _co.componentClass; var currVal_2 = _co.data; _ck(_v, 3, 0, currVal_1, currVal_2); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_34" /* ɵinlineInterpolate */](1, "", _co.class, ""); _ck(_v, 0, 0, currVal_0); }); }
function View_CoreBlockComponent_0(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_52" /* ɵqud */](671088640, 1, { dynamicComponent: 0 }), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreBlockComponent_1)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](3, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_6__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewContainerRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = (_co.loaded && _co.componentClass); _ck(_v, 3, 0, currVal_0); }, null); }
function View_CoreBlockComponent_Host_0(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 1, "core-block", [], null, null, null, View_CoreBlockComponent_0, RenderType_CoreBlockComponent)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](1, 114688, null, 0, __WEBPACK_IMPORTED_MODULE_7__block__["a" /* CoreBlockComponent */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injector */], __WEBPACK_IMPORTED_MODULE_8__providers_delegate__["a" /* CoreBlockDelegate */]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var CoreBlockComponentNgFactory = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_27" /* ɵccf */]("core-block", __WEBPACK_IMPORTED_MODULE_7__block__["a" /* CoreBlockComponent */], View_CoreBlockComponent_Host_0, { block: "block", contextLevel: "contextLevel", instanceId: "instanceId", extraData: "extraData" }, {}, []);

//# sourceMappingURL=block.ngfactory.js.map

/***/ }),

/***/ 1971:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/@angular/core/esm5/core.js
var core = __webpack_require__(0);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item.ngfactory.js + 1 modules
var item_ngfactory = __webpack_require__(30);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item.js
var item = __webpack_require__(20);

// EXTERNAL MODULE: ./node_modules/ionic-angular/util/form.js
var util_form = __webpack_require__(19);

// EXTERNAL MODULE: ./node_modules/ionic-angular/config/config.js
var config = __webpack_require__(6);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-reorder.js + 1 modules
var item_reorder = __webpack_require__(27);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-content.js
var item_content = __webpack_require__(32);

// EXTERNAL MODULE: ./src/directives/format-text.ts
var format_text = __webpack_require__(41);

// EXTERNAL MODULE: ./src/providers/sites.ts
var sites = __webpack_require__(1);

// EXTERNAL MODULE: ./src/providers/utils/dom.ts
var dom = __webpack_require__(4);

// EXTERNAL MODULE: ./src/providers/utils/text.ts
var utils_text = __webpack_require__(10);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.service.js
var translate_service = __webpack_require__(18);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/platform.js + 1 modules
var platform = __webpack_require__(14);

// EXTERNAL MODULE: ./src/providers/utils/utils.ts
var utils = __webpack_require__(2);

// EXTERNAL MODULE: ./src/providers/utils/url.ts
var url = __webpack_require__(25);

// EXTERNAL MODULE: ./src/providers/logger.ts
var logger = __webpack_require__(5);

// EXTERNAL MODULE: ./src/providers/filepool.ts
var filepool = __webpack_require__(16);

// EXTERNAL MODULE: ./src/providers/app.ts
var app = __webpack_require__(9);

// EXTERNAL MODULE: ./src/core/contentlinks/providers/helper.ts
var helper = __webpack_require__(17);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-controller.js
var nav_controller = __webpack_require__(21);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.js
var content = __webpack_require__(23);

// EXTERNAL MODULE: ./src/components/split-view/split-view.ts
var split_view = __webpack_require__(34);

// EXTERNAL MODULE: ./src/providers/utils/iframe.ts
var iframe = __webpack_require__(37);

// EXTERNAL MODULE: ./src/providers/events.ts
var events = __webpack_require__(12);

// EXTERNAL MODULE: ./src/core/course/components/module/module.ngfactory.js + 1 modules
var module_ngfactory = __webpack_require__(1366);

// EXTERNAL MODULE: ./src/core/course/components/module/module.ts
var module_module = __webpack_require__(444);

// EXTERNAL MODULE: ./src/core/course/providers/module-prefetch-delegate.ts
var module_prefetch_delegate = __webpack_require__(52);

// EXTERNAL MODULE: ./src/core/course/providers/helper.ts
var providers_helper = __webpack_require__(40);

// EXTERNAL MODULE: ./node_modules/@angular/common/esm5/common.js
var common = __webpack_require__(7);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-divider.js
var item_divider = __webpack_require__(107);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/nav/nav-push.js
var nav_push = __webpack_require__(224);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/nav/nav-push-anchor.js
var nav_push_anchor = __webpack_require__(250);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/deep-linker.js
var deep_linker = __webpack_require__(51);

// EXTERNAL MODULE: ./src/components/icon/icon.ngfactory.js
var icon_ngfactory = __webpack_require__(130);

// EXTERNAL MODULE: ./src/components/icon/icon.ts
var icon = __webpack_require__(120);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.pipe.js
var translate_pipe = __webpack_require__(26);

// EXTERNAL MODULE: ./src/core/sitehome/components/all-course-list/all-course-list.ts
var all_course_list = __webpack_require__(1376);

// EXTERNAL MODULE: ./src/core/courses/providers/courses.ts
var courses = __webpack_require__(50);

// CONCATENATED MODULE: ./src/core/sitehome/components/all-course-list/all-course-list.ngfactory.js
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 


















var styles_CoreSiteHomeAllCourseListComponent = [];
var RenderType_CoreSiteHomeAllCourseListComponent = core["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_CoreSiteHomeAllCourseListComponent, data: {} });

function View_CoreSiteHomeAllCourseListComponent_1(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 15, "a", [["class", "item item-block"], ["ion-item", ""], ["text-wrap", ""]], [[1, "href", 4]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (core["_44" /* ɵnov */](_v, 6).onClick() !== false);
        ad = (pd_0 && ad);
    } return ad; }, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 1, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 2, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 3, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), core["_30" /* ɵdid */](6, 16384, null, 0, nav_push["a" /* NavPush */], [[2, nav_controller["a" /* NavController */]]], { navPush: [0, "navPush"] }, null), core["_30" /* ɵdid */](7, 1064960, null, 0, nav_push_anchor["a" /* NavPushAnchor */], [nav_push["a" /* NavPush */], [2, deep_linker["a" /* DeepLinker */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n    "])), (_l()(), core["_31" /* ɵeld */](9, 0, null, 0, 1, "core-icon", [["fixed-width", ""], ["item-start", ""], ["name", "fa-graduation-cap"]], null, null, null, icon_ngfactory["b" /* View_CoreIconComponent_0 */], icon_ngfactory["a" /* RenderType_CoreIconComponent */])), core["_30" /* ɵdid */](10, 245760, null, 0, icon["a" /* CoreIconComponent */], [core["t" /* ElementRef */]], { name: [0, "name"], fixedWidth: [1, "fixedWidth"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n    "])), (_l()(), core["_31" /* ɵeld */](12, 0, null, 2, 2, "h2", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](13, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n"]))], function (_ck, _v) { var currVal_1 = "CoreCoursesAvailableCoursesPage"; _ck(_v, 6, 0, currVal_1); var currVal_2 = "fa-graduation-cap"; var currVal_3 = ""; _ck(_v, 10, 0, currVal_2, currVal_3); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 7)._href; _ck(_v, 0, 0, currVal_0); var currVal_4 = core["_56" /* ɵunv */](_v, 13, 0, core["_44" /* ɵnov */](_v, 14).transform("core.courses.availablecourses")); _ck(_v, 13, 0, currVal_4); }); }
function View_CoreSiteHomeAllCourseListComponent_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreSiteHomeAllCourseListComponent_1)), core["_30" /* ɵdid */](1, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.show; _ck(_v, 1, 0, currVal_0); }, null); }
function View_CoreSiteHomeAllCourseListComponent_Host_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "core-sitehome-all-course-list", [], null, null, null, View_CoreSiteHomeAllCourseListComponent_0, RenderType_CoreSiteHomeAllCourseListComponent)), core["_30" /* ɵdid */](1, 49152, null, 0, all_course_list["a" /* CoreSiteHomeAllCourseListComponent */], [courses["a" /* CoreCoursesProvider */]], null, null)], null, null); }
var CoreSiteHomeAllCourseListComponentNgFactory = core["_27" /* ɵccf */]("core-sitehome-all-course-list", all_course_list["a" /* CoreSiteHomeAllCourseListComponent */], View_CoreSiteHomeAllCourseListComponent_Host_0, {}, {}, []);

//# sourceMappingURL=all-course-list.ngfactory.js.map
// EXTERNAL MODULE: ./node_modules/ionic-angular/components/icon/icon.js
var icon_icon = __webpack_require__(46);

// EXTERNAL MODULE: ./src/core/sitehome/components/categories/categories.ts
var categories = __webpack_require__(1377);

// CONCATENATED MODULE: ./src/core/sitehome/components/categories/categories.ngfactory.js
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 

















var styles_CoreSiteHomeCategoriesComponent = [];
var RenderType_CoreSiteHomeCategoriesComponent = core["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_CoreSiteHomeCategoriesComponent, data: {} });

function View_CoreSiteHomeCategoriesComponent_1(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 15, "a", [["class", "item item-block"], ["ion-item", ""], ["text-wrap", ""]], [[1, "href", 4]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (core["_44" /* ɵnov */](_v, 6).onClick() !== false);
        ad = (pd_0 && ad);
    } return ad; }, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 1, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 2, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 3, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), core["_30" /* ɵdid */](6, 16384, null, 0, nav_push["a" /* NavPush */], [[2, nav_controller["a" /* NavController */]]], { navPush: [0, "navPush"] }, null), core["_30" /* ɵdid */](7, 1064960, null, 0, nav_push_anchor["a" /* NavPushAnchor */], [nav_push["a" /* NavPush */], [2, deep_linker["a" /* DeepLinker */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n    "])), (_l()(), core["_31" /* ɵeld */](9, 0, null, 0, 1, "ion-icon", [["item-start", ""], ["name", "folder"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](10, 147456, [[3, 4]], 0, icon_icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n    "])), (_l()(), core["_31" /* ɵeld */](12, 0, null, 2, 2, "h2", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](13, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n"]))], function (_ck, _v) { var currVal_1 = "CoreCoursesCategoriesPage"; _ck(_v, 6, 0, currVal_1); var currVal_3 = "folder"; _ck(_v, 10, 0, currVal_3); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 7)._href; _ck(_v, 0, 0, currVal_0); var currVal_2 = core["_44" /* ɵnov */](_v, 10)._hidden; _ck(_v, 9, 0, currVal_2); var currVal_4 = core["_56" /* ɵunv */](_v, 13, 0, core["_44" /* ɵnov */](_v, 14).transform("core.courses.categories")); _ck(_v, 13, 0, currVal_4); }); }
function View_CoreSiteHomeCategoriesComponent_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreSiteHomeCategoriesComponent_1)), core["_30" /* ɵdid */](1, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.show; _ck(_v, 1, 0, currVal_0); }, null); }
function View_CoreSiteHomeCategoriesComponent_Host_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "core-sitehome-categories", [], null, null, null, View_CoreSiteHomeCategoriesComponent_0, RenderType_CoreSiteHomeCategoriesComponent)), core["_30" /* ɵdid */](1, 49152, null, 0, categories["a" /* CoreSiteHomeCategoriesComponent */], [courses["a" /* CoreCoursesProvider */]], null, null)], null, null); }
var CoreSiteHomeCategoriesComponentNgFactory = core["_27" /* ɵccf */]("core-sitehome-categories", categories["a" /* CoreSiteHomeCategoriesComponent */], View_CoreSiteHomeCategoriesComponent_Host_0, {}, {}, []);

//# sourceMappingURL=categories.ngfactory.js.map
// EXTERNAL MODULE: ./src/core/sitehome/components/course-search/course-search.ts
var course_search = __webpack_require__(1378);

// CONCATENATED MODULE: ./src/core/sitehome/components/course-search/course-search.ngfactory.js
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 

















var styles_CoreSiteHomeCourseSearchComponent = [];
var RenderType_CoreSiteHomeCourseSearchComponent = core["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_CoreSiteHomeCourseSearchComponent, data: {} });

function View_CoreSiteHomeCourseSearchComponent_1(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 15, "a", [["class", "item item-block"], ["ion-item", ""], ["text-wrap", ""]], [[1, "href", 4]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (core["_44" /* ɵnov */](_v, 6).onClick() !== false);
        ad = (pd_0 && ad);
    } return ad; }, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 1, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 2, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 3, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), core["_30" /* ɵdid */](6, 16384, null, 0, nav_push["a" /* NavPush */], [[2, nav_controller["a" /* NavController */]]], { navPush: [0, "navPush"] }, null), core["_30" /* ɵdid */](7, 1064960, null, 0, nav_push_anchor["a" /* NavPushAnchor */], [nav_push["a" /* NavPush */], [2, deep_linker["a" /* DeepLinker */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n    "])), (_l()(), core["_31" /* ɵeld */](9, 0, null, 0, 1, "ion-icon", [["item-start", ""], ["name", "search"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](10, 147456, [[3, 4]], 0, icon_icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n    "])), (_l()(), core["_31" /* ɵeld */](12, 0, null, 2, 2, "h2", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](13, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n"]))], function (_ck, _v) { var currVal_1 = "CoreCoursesSearchPage"; _ck(_v, 6, 0, currVal_1); var currVal_3 = "search"; _ck(_v, 10, 0, currVal_3); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 7)._href; _ck(_v, 0, 0, currVal_0); var currVal_2 = core["_44" /* ɵnov */](_v, 10)._hidden; _ck(_v, 9, 0, currVal_2); var currVal_4 = core["_56" /* ɵunv */](_v, 13, 0, core["_44" /* ɵnov */](_v, 14).transform("core.courses.searchcourses")); _ck(_v, 13, 0, currVal_4); }); }
function View_CoreSiteHomeCourseSearchComponent_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreSiteHomeCourseSearchComponent_1)), core["_30" /* ɵdid */](1, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.show; _ck(_v, 1, 0, currVal_0); }, null); }
function View_CoreSiteHomeCourseSearchComponent_Host_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "core-sitehome-course-search", [], null, null, null, View_CoreSiteHomeCourseSearchComponent_0, RenderType_CoreSiteHomeCourseSearchComponent)), core["_30" /* ɵdid */](1, 49152, null, 0, course_search["a" /* CoreSiteHomeCourseSearchComponent */], [courses["a" /* CoreCoursesProvider */]], null, null)], null, null); }
var CoreSiteHomeCourseSearchComponentNgFactory = core["_27" /* ɵccf */]("core-sitehome-course-search", course_search["a" /* CoreSiteHomeCourseSearchComponent */], View_CoreSiteHomeCourseSearchComponent_Host_0, {}, {}, []);

//# sourceMappingURL=course-search.ngfactory.js.map
// EXTERNAL MODULE: ./src/core/sitehome/components/enrolled-course-list/enrolled-course-list.ts
var enrolled_course_list = __webpack_require__(1379);

// CONCATENATED MODULE: ./src/core/sitehome/components/enrolled-course-list/enrolled-course-list.ngfactory.js
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 


















var styles_CoreSiteHomeEnrolledCourseListComponent = [];
var RenderType_CoreSiteHomeEnrolledCourseListComponent = core["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_CoreSiteHomeEnrolledCourseListComponent, data: {} });

function View_CoreSiteHomeEnrolledCourseListComponent_1(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 15, "a", [["class", "item item-block"], ["ion-item", ""], ["text-wrap", ""]], [[1, "href", 4]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (core["_44" /* ɵnov */](_v, 6).onClick() !== false);
        ad = (pd_0 && ad);
    } return ad; }, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 1, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 2, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 3, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), core["_30" /* ɵdid */](6, 16384, null, 0, nav_push["a" /* NavPush */], [[2, nav_controller["a" /* NavController */]]], { navPush: [0, "navPush"] }, null), core["_30" /* ɵdid */](7, 1064960, null, 0, nav_push_anchor["a" /* NavPushAnchor */], [nav_push["a" /* NavPush */], [2, deep_linker["a" /* DeepLinker */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n    "])), (_l()(), core["_31" /* ɵeld */](9, 0, null, 0, 1, "core-icon", [["fixed-width", ""], ["item-start", ""], ["name", "fa-graduation-cap"]], null, null, null, icon_ngfactory["b" /* View_CoreIconComponent_0 */], icon_ngfactory["a" /* RenderType_CoreIconComponent */])), core["_30" /* ɵdid */](10, 245760, null, 0, icon["a" /* CoreIconComponent */], [core["t" /* ElementRef */]], { name: [0, "name"], fixedWidth: [1, "fixedWidth"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n    "])), (_l()(), core["_31" /* ɵeld */](12, 0, null, 2, 2, "h2", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](13, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n"]))], function (_ck, _v) { var currVal_1 = "CoreCoursesMyCoursesPage"; _ck(_v, 6, 0, currVal_1); var currVal_2 = "fa-graduation-cap"; var currVal_3 = ""; _ck(_v, 10, 0, currVal_2, currVal_3); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 7)._href; _ck(_v, 0, 0, currVal_0); var currVal_4 = core["_56" /* ɵunv */](_v, 13, 0, core["_44" /* ɵnov */](_v, 14).transform("core.courses.mycourses")); _ck(_v, 13, 0, currVal_4); }); }
function View_CoreSiteHomeEnrolledCourseListComponent_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreSiteHomeEnrolledCourseListComponent_1)), core["_30" /* ɵdid */](1, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.show; _ck(_v, 1, 0, currVal_0); }, null); }
function View_CoreSiteHomeEnrolledCourseListComponent_Host_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "core-sitehome-enrolled-course-list", [], null, null, null, View_CoreSiteHomeEnrolledCourseListComponent_0, RenderType_CoreSiteHomeEnrolledCourseListComponent)), core["_30" /* ɵdid */](1, 114688, null, 0, enrolled_course_list["a" /* CoreSiteHomeEnrolledCourseListComponent */], [courses["a" /* CoreCoursesProvider */]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var CoreSiteHomeEnrolledCourseListComponentNgFactory = core["_27" /* ɵccf */]("core-sitehome-enrolled-course-list", enrolled_course_list["a" /* CoreSiteHomeEnrolledCourseListComponent */], View_CoreSiteHomeEnrolledCourseListComponent_Host_0, {}, {}, []);

//# sourceMappingURL=enrolled-course-list.ngfactory.js.map
// EXTERNAL MODULE: ./src/core/sitehome/components/news/news.ts
var news = __webpack_require__(1380);

// EXTERNAL MODULE: ./src/core/course/providers/course.ts
var course = __webpack_require__(15);

// EXTERNAL MODULE: ./src/core/course/providers/module-delegate.ts
var module_delegate = __webpack_require__(55);

// EXTERNAL MODULE: ./src/core/sitehome/providers/sitehome.ts
var sitehome = __webpack_require__(206);

// CONCATENATED MODULE: ./src/core/sitehome/components/news/news.ngfactory.js
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 














var styles_CoreSiteHomeNewsComponent = [];
var RenderType_CoreSiteHomeNewsComponent = core["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_CoreSiteHomeNewsComponent, data: {} });

function View_CoreSiteHomeNewsComponent_1(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "core-course-module", [["class", "core-sitehome-news"]], null, null, null, module_ngfactory["b" /* View_CoreCourseModuleComponent_0 */], module_ngfactory["a" /* RenderType_CoreCourseModuleComponent */])), core["_30" /* ɵdid */](1, 245760, null, 0, module_module["a" /* CoreCourseModuleComponent */], [[2, nav_controller["a" /* NavController */]], module_prefetch_delegate["a" /* CoreCourseModulePrefetchDelegate */], dom["a" /* CoreDomUtilsProvider */], providers_helper["a" /* CoreCourseHelperProvider */], events["a" /* CoreEventsProvider */], sites["a" /* CoreSitesProvider */]], { module: [0, "module"], courseId: [1, "courseId"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.module; var currVal_1 = _co.siteHomeId; _ck(_v, 1, 0, currVal_0, currVal_1); }, null); }
function View_CoreSiteHomeNewsComponent_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreSiteHomeNewsComponent_1)), core["_30" /* ɵdid */](1, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.show; _ck(_v, 1, 0, currVal_0); }, null); }
function View_CoreSiteHomeNewsComponent_Host_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "core-sitehome-news", [], null, null, null, View_CoreSiteHomeNewsComponent_0, RenderType_CoreSiteHomeNewsComponent)), core["_30" /* ɵdid */](1, 114688, null, 0, news["a" /* CoreSiteHomeNewsComponent */], [sites["a" /* CoreSitesProvider */], course["a" /* CoreCourseProvider */], module_delegate["a" /* CoreCourseModuleDelegate */], sitehome["a" /* CoreSiteHomeProvider */]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var CoreSiteHomeNewsComponentNgFactory = core["_27" /* ɵccf */]("core-sitehome-news", news["a" /* CoreSiteHomeNewsComponent */], View_CoreSiteHomeNewsComponent_Host_0, {}, {}, []);

//# sourceMappingURL=news.ngfactory.js.map
// EXTERNAL MODULE: ./src/core/block/components/block/block.ngfactory.js
var block_ngfactory = __webpack_require__(1964);

// EXTERNAL MODULE: ./src/core/block/components/block/block.ts
var block = __webpack_require__(669);

// EXTERNAL MODULE: ./src/core/block/providers/delegate.ts
var delegate = __webpack_require__(164);

// EXTERNAL MODULE: ./src/components/empty-box/empty-box.ngfactory.js
var empty_box_ngfactory = __webpack_require__(119);

// EXTERNAL MODULE: ./src/components/empty-box/empty-box.ts
var empty_box = __webpack_require__(108);

// EXTERNAL MODULE: ./src/components/loading/loading.ngfactory.js
var loading_ngfactory = __webpack_require__(48);

// EXTERNAL MODULE: ./src/components/loading/loading.ts
var loading = __webpack_require__(47);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/list/list.js + 1 modules
var list = __webpack_require__(77);

// EXTERNAL MODULE: ./node_modules/ionic-angular/gestures/gesture-controller.js
var gesture_controller = __webpack_require__(38);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/dom-controller.js
var dom_controller = __webpack_require__(31);

// EXTERNAL MODULE: ./src/core/sitehome/components/index/index.ts
var index = __webpack_require__(1364);

// CONCATENATED MODULE: ./src/core/sitehome/components/index/index.ngfactory.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RenderType_CoreSiteHomeIndexComponent; });
/* harmony export (immutable) */ __webpack_exports__["b"] = View_CoreSiteHomeIndexComponent_0;
/* unused harmony export View_CoreSiteHomeIndexComponent_Host_0 */
/* unused harmony export CoreSiteHomeIndexComponentNgFactory */
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
























































var styles_CoreSiteHomeIndexComponent = [];
var RenderType_CoreSiteHomeIndexComponent = core["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_CoreSiteHomeIndexComponent, data: {} });

function View_CoreSiteHomeIndexComponent_2(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 9, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 2, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 3, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 4, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 2, 1, "core-format-text", [], null, null, null, null, null)), core["_30" /* ɵdid */](8, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform["a" /* Platform */], utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], app["a" /* CoreAppProvider */], helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */]], { text: [0, "text"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.section.summary; _ck(_v, 8, 0, currVal_0); }, null); }
function View_CoreSiteHomeIndexComponent_3(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "core-course-module", [], null, null, null, module_ngfactory["b" /* View_CoreCourseModuleComponent_0 */], module_ngfactory["a" /* RenderType_CoreCourseModuleComponent */])), core["_30" /* ɵdid */](1, 245760, null, 0, module_module["a" /* CoreCourseModuleComponent */], [[2, nav_controller["a" /* NavController */]], module_prefetch_delegate["a" /* CoreCourseModulePrefetchDelegate */], dom["a" /* CoreDomUtilsProvider */], providers_helper["a" /* CoreCourseHelperProvider */], events["a" /* CoreEventsProvider */], sites["a" /* CoreSitesProvider */]], { module: [0, "module"], courseId: [1, "courseId"], section: [2, "section"], enabled: [3, "enabled"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _v.context.$implicit; var currVal_1 = _co.siteHomeId; var currVal_2 = _co.section; var currVal_3 = true; _ck(_v, 1, 0, currVal_0, currVal_1, currVal_2, currVal_3); }, null); }
function View_CoreSiteHomeIndexComponent_1(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 7, null, null, null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreSiteHomeIndexComponent_2)), core["_30" /* ɵdid */](3, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreSiteHomeIndexComponent_3)), core["_30" /* ɵdid */](6, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.section.summary; _ck(_v, 3, 0, currVal_0); var currVal_1 = _co.section.modules; _ck(_v, 6, 0, currVal_1); }, null); }
function View_CoreSiteHomeIndexComponent_5(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 5, "ion-item-divider", [["class", "item item-divider"]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 5, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 6, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 7, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_divider["a" /* ItemDivider */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null)], null, null); }
function View_CoreSiteHomeIndexComponent_7(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "core-sitehome-all-course-list", [["class", "item"]], null, null, null, View_CoreSiteHomeAllCourseListComponent_0, RenderType_CoreSiteHomeAllCourseListComponent)), core["_30" /* ɵdid */](1, 49152, null, 0, all_course_list["a" /* CoreSiteHomeAllCourseListComponent */], [courses["a" /* CoreCoursesProvider */]], null, null)], null, null); }
function View_CoreSiteHomeIndexComponent_8(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "core-sitehome-categories", [], null, null, null, View_CoreSiteHomeCategoriesComponent_0, RenderType_CoreSiteHomeCategoriesComponent)), core["_30" /* ɵdid */](1, 49152, null, 0, categories["a" /* CoreSiteHomeCategoriesComponent */], [courses["a" /* CoreCoursesProvider */]], null, null)], null, null); }
function View_CoreSiteHomeIndexComponent_9(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "core-sitehome-course-search", [], null, null, null, View_CoreSiteHomeCourseSearchComponent_0, RenderType_CoreSiteHomeCourseSearchComponent)), core["_30" /* ɵdid */](1, 49152, null, 0, course_search["a" /* CoreSiteHomeCourseSearchComponent */], [courses["a" /* CoreCoursesProvider */]], null, null)], null, null); }
function View_CoreSiteHomeIndexComponent_10(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "core-sitehome-enrolled-course-list", [], null, null, null, View_CoreSiteHomeEnrolledCourseListComponent_0, RenderType_CoreSiteHomeEnrolledCourseListComponent)), core["_30" /* ɵdid */](1, 114688, null, 0, enrolled_course_list["a" /* CoreSiteHomeEnrolledCourseListComponent */], [courses["a" /* CoreCoursesProvider */]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
function View_CoreSiteHomeIndexComponent_11(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "core-sitehome-news", [], null, null, null, View_CoreSiteHomeNewsComponent_0, RenderType_CoreSiteHomeNewsComponent)), core["_30" /* ɵdid */](1, 114688, null, 0, news["a" /* CoreSiteHomeNewsComponent */], [sites["a" /* CoreSitesProvider */], course["a" /* CoreCourseProvider */], module_delegate["a" /* CoreCourseModuleDelegate */], sitehome["a" /* CoreSiteHomeProvider */]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
function View_CoreSiteHomeIndexComponent_6(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 16, null, null, null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreSiteHomeIndexComponent_7)), core["_30" /* ɵdid */](3, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreSiteHomeIndexComponent_8)), core["_30" /* ɵdid */](6, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreSiteHomeIndexComponent_9)), core["_30" /* ɵdid */](9, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreSiteHomeIndexComponent_10)), core["_30" /* ɵdid */](12, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreSiteHomeIndexComponent_11)), core["_30" /* ɵdid */](15, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "]))], function (_ck, _v) { var currVal_0 = (_v.context.$implicit == "all-course-list"); _ck(_v, 3, 0, currVal_0); var currVal_1 = (_v.context.$implicit == "categories"); _ck(_v, 6, 0, currVal_1); var currVal_2 = (_v.context.$implicit == "course-search"); _ck(_v, 9, 0, currVal_2); var currVal_3 = (_v.context.$implicit == "enrolled-course-list"); _ck(_v, 12, 0, currVal_3); var currVal_4 = (_v.context.$implicit == "news"); _ck(_v, 15, 0, currVal_4); }, null); }
function View_CoreSiteHomeIndexComponent_4(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 7, null, null, null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreSiteHomeIndexComponent_5)), core["_30" /* ɵdid */](3, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreSiteHomeIndexComponent_6)), core["_30" /* ɵdid */](6, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = (_co.section && _co.section.hasContent); _ck(_v, 3, 0, currVal_0); var currVal_1 = _co.items; _ck(_v, 6, 0, currVal_1); }, null); }
function View_CoreSiteHomeIndexComponent_12(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 4, null, null, null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](2, 0, null, null, 1, "core-block", [["contextLevel", "course"]], null, null, null, block_ngfactory["b" /* View_CoreBlockComponent_0 */], block_ngfactory["a" /* RenderType_CoreBlockComponent */])), core["_30" /* ɵdid */](3, 114688, [[1, 4]], 0, block["a" /* CoreBlockComponent */], [core["C" /* Injector */], delegate["a" /* CoreBlockDelegate */]], { block: [0, "block"], contextLevel: [1, "contextLevel"], instanceId: [2, "instanceId"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _v.context.$implicit; var currVal_1 = "course"; var currVal_2 = _co.siteHomeId; _ck(_v, 3, 0, currVal_0, currVal_1, currVal_2); }, null); }
function View_CoreSiteHomeIndexComponent_13(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "core-empty-box", [["icon", "qr-scanner"]], null, null, null, empty_box_ngfactory["b" /* View_CoreEmptyBoxComponent_0 */], empty_box_ngfactory["a" /* RenderType_CoreEmptyBoxComponent */])), core["_30" /* ɵdid */](1, 49152, null, 0, empty_box["a" /* CoreEmptyBoxComponent */], [], { message: [0, "message"], icon: [1, "icon"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 1, 0, core["_44" /* ɵnov */](_v, 2).transform("core.course.nocontentavailable")); var currVal_1 = "qr-scanner"; _ck(_v, 1, 0, currVal_0, currVal_1); }, null); }
function View_CoreSiteHomeIndexComponent_0(_l) { return core["_57" /* ɵvid */](0, [core["_52" /* ɵqud */](671088640, 1, { blocksComponents: 1 }), (_l()(), core["_31" /* ɵeld */](1, 0, null, null, 21, "core-loading", [], null, null, null, loading_ngfactory["b" /* View_CoreLoadingComponent_0 */], loading_ngfactory["a" /* RenderType_CoreLoadingComponent */])), core["_30" /* ɵdid */](2, 638976, null, 0, loading["a" /* CoreLoadingComponent */], [translate_service["a" /* TranslateService */], core["t" /* ElementRef */], events["a" /* CoreEventsProvider */], utils["a" /* CoreUtilsProvider */]], { hideUntil: [0, "hideUntil"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n\n    "])), (_l()(), core["_31" /* ɵeld */](4, 0, null, 0, 14, "ion-list", [], null, null, null, null, null)), core["_30" /* ɵdid */](5, 16384, null, 0, list["a" /* List */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], platform["a" /* Platform */], gesture_controller["l" /* GestureController */], dom_controller["a" /* DomController */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreSiteHomeIndexComponent_1)), core["_30" /* ɵdid */](9, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n        "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreSiteHomeIndexComponent_4)), core["_30" /* ɵdid */](13, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n        "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreSiteHomeIndexComponent_12)), core["_30" /* ɵdid */](17, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n\n    "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_CoreSiteHomeIndexComponent_13)), core["_30" /* ɵdid */](21, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.dataLoaded; _ck(_v, 2, 0, currVal_0); var currVal_1 = (_co.section && _co.section.hasContent); _ck(_v, 9, 0, currVal_1); var currVal_2 = (_co.items.length > 0); _ck(_v, 13, 0, currVal_2); var currVal_3 = _co.blocks; _ck(_v, 17, 0, currVal_3); var currVal_4 = (!_co.hasContent && !_co.hasSupportedBlock); _ck(_v, 21, 0, currVal_4); }, null); }
function View_CoreSiteHomeIndexComponent_Host_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "core-sitehome-index", [], null, null, null, View_CoreSiteHomeIndexComponent_0, RenderType_CoreSiteHomeIndexComponent)), core["_30" /* ɵdid */](1, 114688, null, 0, index["a" /* CoreSiteHomeIndexComponent */], [dom["a" /* CoreDomUtilsProvider */], sites["a" /* CoreSitesProvider */], course["a" /* CoreCourseProvider */], providers_helper["a" /* CoreCourseHelperProvider */], module_prefetch_delegate["a" /* CoreCourseModulePrefetchDelegate */], delegate["a" /* CoreBlockDelegate */]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var CoreSiteHomeIndexComponentNgFactory = core["_27" /* ɵccf */]("core-sitehome-index", index["a" /* CoreSiteHomeIndexComponent */], View_CoreSiteHomeIndexComponent_Host_0, {}, {}, []);

//# sourceMappingURL=index.ngfactory.js.map

/***/ })

});
//# sourceMappingURL=12.js.map