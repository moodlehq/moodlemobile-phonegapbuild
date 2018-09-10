webpackJsonp([42],{

/***/ 1856:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/@angular/core/esm5/core.js
var core = __webpack_require__(0);

// EXTERNAL MODULE: ./node_modules/ionic-angular/index.js + 3 modules
var ionic_angular = __webpack_require__(9);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/index.js + 1 modules
var _ngx_translate_core = __webpack_require__(4);

// EXTERNAL MODULE: ./src/components/components.module.ts
var components_module = __webpack_require__(32);

// EXTERNAL MODULE: ./src/providers/sites.ts
var sites = __webpack_require__(1);

// EXTERNAL MODULE: ./src/core/mainmenu/providers/mainmenu.ts
var mainmenu = __webpack_require__(653);

// EXTERNAL MODULE: ./src/core/mainmenu/providers/delegate.ts
var delegate = __webpack_require__(156);

// CONCATENATED MODULE: ./src/core/mainmenu/pages/menu/menu.ts
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
 * Page that displays the main menu of the app.
 */
var menu_CoreMainMenuPage = /** @class */ (function () {
    function CoreMainMenuPage(menuDelegate, sitesProvider, navParams, navCtrl) {
        this.menuDelegate = menuDelegate;
        this.sitesProvider = sitesProvider;
        this.navCtrl = navCtrl;
        this.tabs = [];
        this.loaded = false;
        this.showTabs = false;
        this.redirectPageLoaded = false;
        this.redirectPage = navParams.get('redirectPage');
        this.redirectParams = navParams.get('redirectParams');
    }
    /**
     * View loaded.
     */
    CoreMainMenuPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        if (!this.sitesProvider.isLoggedIn()) {
            this.navCtrl.setRoot('CoreLoginInitPage');
            return;
        }
        this.showTabs = true;
        var site = this.sitesProvider.getCurrentSite(), displaySiteHome = site.getInfo() && site.getInfo().userhomepage === 0;
        this.subscription = this.menuDelegate.getHandlers().subscribe(function (handlers) {
            handlers = handlers.slice(0, mainmenu["a" /* CoreMainMenuProvider */].NUM_MAIN_HANDLERS); // Get main handlers.
            // Re-build the list of tabs. If a handler is already in the list, use existing object to prevent re-creating the tab.
            var newTabs = [];
            var _loop_1 = function (i) {
                var handler = handlers[i];
                // Check if the handler is already in the tabs list. If so, use it.
                var tab = _this.tabs.find(function (tab) {
                    return tab.title == handler.title && tab.icon == handler.icon;
                });
                newTabs.push(tab || handler);
            };
            for (var i = 0; i < handlers.length; i++) {
                _loop_1(i);
            }
            _this.tabs = newTabs;
            // Sort them by priority so new handlers are in the right position.
            _this.tabs.sort(function (a, b) {
                return b.priority - a.priority;
            });
            if (typeof _this.initialTab == 'undefined' && !_this.loaded) {
                // Calculate the tab to load.
                if (_this.redirectPage) {
                    // Check if the redirect page is the root page of any of the tabs.
                    _this.initialTab = 0;
                    for (var i = 0; i < _this.tabs.length; i++) {
                        var tab = _this.tabs[i];
                        if (tab.page == _this.redirectPage) {
                            // Tab found. Set the params and unset the redirect page.
                            _this.initialTab = i + 1;
                            tab.pageParams = Object.assign(tab.pageParams || {}, _this.redirectParams);
                            _this.redirectPage = null;
                            _this.redirectParams = null;
                            break;
                        }
                    }
                }
                else {
                    // By default, course overview will be loaded (3.3+). Check if we need to select Site Home or My Courses.
                    for (var i = 0; i < _this.tabs.length; i++) {
                        var handler = handlers[i];
                        if ((displaySiteHome && handler.name == 'CoreSiteHome') ||
                            (!displaySiteHome && handler.name == 'CoreCourses')) {
                            _this.initialTab = i;
                            break;
                        }
                    }
                }
            }
            _this.loaded = _this.menuDelegate.areHandlersLoaded();
        });
    };
    /**
     * Page destroyed.
     */
    CoreMainMenuPage.prototype.ngOnDestroy = function () {
        this.subscription && this.subscription.unsubscribe();
    };
    CoreMainMenuPage = __decorate([
        Object(core["m" /* Component */])({
            selector: 'page-core-mainmenu',
            templateUrl: 'menu.html',
        }),
        __metadata("design:paramtypes", [delegate["a" /* CoreMainMenuDelegate */], sites["a" /* CoreSitesProvider */], ionic_angular["s" /* NavParams */],
            ionic_angular["r" /* NavController */]])
    ], CoreMainMenuPage);
    return CoreMainMenuPage;
}());

//# sourceMappingURL=menu.js.map
// CONCATENATED MODULE: ./src/core/mainmenu/pages/menu/menu.module.ts
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
var menu_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var menu_module_CoreMainMenuPageModule = /** @class */ (function () {
    function CoreMainMenuPageModule() {
    }
    CoreMainMenuPageModule = menu_module___decorate([
        Object(core["I" /* NgModule */])({
            declarations: [
                menu_CoreMainMenuPage,
            ],
            imports: [
                components_module["a" /* CoreComponentsModule */],
                ionic_angular["l" /* IonicPageModule */].forChild(menu_CoreMainMenuPage),
                _ngx_translate_core["b" /* TranslateModule */].forChild()
            ],
        })
    ], CoreMainMenuPageModule);
    return CoreMainMenuPageModule;
}());

//# sourceMappingURL=menu.module.js.map
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

// EXTERNAL MODULE: ./src/components/ion-tabs/ion-tab.ts
var ion_tab = __webpack_require__(1323);

// EXTERNAL MODULE: ./src/components/ion-tabs/ion-tabs.ts
var ion_tabs = __webpack_require__(651);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/app/app.js + 3 modules
var app = __webpack_require__(26);

// EXTERNAL MODULE: ./node_modules/ionic-angular/config/config.js
var config = __webpack_require__(6);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/platform.js + 1 modules
var platform = __webpack_require__(14);

// EXTERNAL MODULE: ./node_modules/ionic-angular/gestures/gesture-controller.js
var gesture_controller = __webpack_require__(36);

// EXTERNAL MODULE: ./node_modules/ionic-angular/transitions/transition-controller.js
var transition_controller = __webpack_require__(173);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/deep-linker.js
var deep_linker = __webpack_require__(49);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/dom-controller.js
var dom_controller = __webpack_require__(25);

// CONCATENATED MODULE: ./src/components/ion-tabs/ion-tab.ngfactory.js
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 










var styles_CoreIonTabComponent = [];
var RenderType_CoreIonTabComponent = core["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_CoreIonTabComponent, data: {} });

function View_CoreIonTabComponent_0(_l) { return core["_57" /* ɵvid */](0, [core["_52" /* ɵqud */](402653184, 1, { _vp: 0 }), (_l()(), core["_31" /* ɵeld */](1, 16777216, [[1, 3], ["viewport", 1]], null, 0, "div", [], null, null, null, null, null)), (_l()(), core["_31" /* ɵeld */](2, 0, null, null, 0, "div", [["class", "nav-decor"]], null, null, null, null, null))], null, null); }
function View_CoreIonTabComponent_Host_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "core-ion-tab", [["role", "tabpanel"]], [[1, "id", 0], [1, "aria-labelledby", 0]], null, null, View_CoreIonTabComponent_0, RenderType_CoreIonTabComponent)), core["_30" /* ɵdid */](1, 245760, null, 0, ion_tab["a" /* CoreIonTabComponent */], [ion_tabs["a" /* CoreIonTabsComponent */], app["a" /* App */], config["a" /* Config */], platform["a" /* Platform */], core["t" /* ElementRef */], core["M" /* NgZone */], core["V" /* Renderer */], core["o" /* ComponentFactoryResolver */], core["j" /* ChangeDetectorRef */], gesture_controller["l" /* GestureController */], transition_controller["a" /* TransitionController */], [2, deep_linker["a" /* DeepLinker */]], dom_controller["a" /* DomController */], core["u" /* ErrorHandler */]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 1)._tabId; var currVal_1 = core["_44" /* ɵnov */](_v, 1)._btnId; _ck(_v, 0, 0, currVal_0, currVal_1); }); }
var CoreIonTabComponentNgFactory = core["_27" /* ɵccf */]("core-ion-tab", ion_tab["a" /* CoreIonTabComponent */], View_CoreIonTabComponent_Host_0, { color: "color", mode: "mode", swipeBackEnabled: "swipeBackEnabled", root: "root", rootParams: "rootParams", tabUrlPath: "tabUrlPath", tabTitle: "tabTitle", tabIcon: "tabIcon", tabBadge: "tabBadge", tabBadgeStyle: "tabBadgeStyle", enabled: "enabled", show: "show", tabsHideOnSubPages: "tabsHideOnSubPages" }, { ionSelect: "ionSelect" }, []);

//# sourceMappingURL=ion-tab.ngfactory.js.map
// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.pipe.js
var translate_pipe = __webpack_require__(29);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.service.js
var translate_service = __webpack_require__(17);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/icon/icon.js
var icon = __webpack_require__(41);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/badge/badge.js
var badge = __webpack_require__(212);

// EXTERNAL MODULE: ./node_modules/@angular/common/esm5/common.js
var common = __webpack_require__(8);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/tabs/tab-button.js
var tab_button = __webpack_require__(655);

// CONCATENATED MODULE: ./node_modules/ionic-angular/components/tabs/tab-button.ngfactory.js
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 






var styles_TabButton = [];
var RenderType_TabButton = core["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_TabButton, data: {} });

function View_TabButton_1(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "ion-icon", [["class", "tab-button-icon"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](1, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"], isActive: [1, "isActive"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_1 = _co.tab.tabIcon; var currVal_2 = _co.tab.isSelected; _ck(_v, 1, 0, currVal_1, currVal_2); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 1)._hidden; _ck(_v, 0, 0, currVal_0); }); }
function View_TabButton_2(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "span", [["class", "tab-button-text"]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](1, null, ["", ""]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.tab.tabTitle; _ck(_v, 1, 0, currVal_0); }); }
function View_TabButton_3(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "ion-badge", [["class", "tab-badge"]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, badge["a" /* Badge */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { color: [0, "color"] }, null), (_l()(), core["_55" /* ɵted */](2, null, ["", ""]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.tab.tabBadgeStyle; _ck(_v, 1, 0, currVal_0); }, function (_ck, _v) { var _co = _v.component; var currVal_1 = _co.tab.tabBadge; _ck(_v, 2, 0, currVal_1); }); }
function View_TabButton_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_TabButton_1)), core["_30" /* ɵdid */](1, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_TabButton_2)), core["_30" /* ɵdid */](3, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_TabButton_3)), core["_30" /* ɵdid */](5, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_31" /* ɵeld */](6, 0, null, null, 0, "div", [["class", "button-effect"]], null, null, null, null, null))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.tab.tabIcon; _ck(_v, 1, 0, currVal_0); var currVal_1 = _co.tab.tabTitle; _ck(_v, 3, 0, currVal_1); var currVal_2 = _co.tab.tabBadge; _ck(_v, 5, 0, currVal_2); }, null); }
function View_TabButton_Host_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "div", [["class", "tab-button"]], [[1, "id", 0], [1, "aria-controls", 0], [1, "aria-selected", 0], [2, "has-title", null], [2, "has-icon", null], [2, "has-title-only", null], [2, "icon-only", null], [2, "has-badge", null], [2, "disable-hover", null], [2, "tab-disabled", null], [2, "tab-hidden", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (core["_44" /* ɵnov */](_v, 1).onClick() !== false);
        ad = (pd_0 && ad);
    } return ad; }, View_TabButton_0, RenderType_TabButton)), core["_30" /* ɵdid */](1, 114688, null, 0, tab_button["a" /* TabButton */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 1).tab._btnId; var currVal_1 = core["_44" /* ɵnov */](_v, 1).tab._tabId; var currVal_2 = core["_44" /* ɵnov */](_v, 1).tab.isSelected; var currVal_3 = core["_44" /* ɵnov */](_v, 1).hasTitle; var currVal_4 = core["_44" /* ɵnov */](_v, 1).hasIcon; var currVal_5 = core["_44" /* ɵnov */](_v, 1).hasTitleOnly; var currVal_6 = core["_44" /* ɵnov */](_v, 1).hasIconOnly; var currVal_7 = core["_44" /* ɵnov */](_v, 1).hasBadge; var currVal_8 = core["_44" /* ɵnov */](_v, 1).disHover; var currVal_9 = !core["_44" /* ɵnov */](_v, 1).tab.enabled; var currVal_10 = !core["_44" /* ɵnov */](_v, 1).tab.show; _ck(_v, 0, 1, [currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8, currVal_9, currVal_10]); }); }
var TabButtonNgFactory = core["_27" /* ɵccf */](".tab-button", tab_button["a" /* TabButton */], View_TabButton_Host_0, { color: "color", mode: "mode", tab: "tab" }, { ionSelect: "ionSelect" }, []);

//# sourceMappingURL=tab-button.ngfactory.js.map
// EXTERNAL MODULE: ./node_modules/ionic-angular/components/spinner/spinner.ngfactory.js
var spinner_ngfactory = __webpack_require__(180);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/spinner/spinner.js
var spinner = __webpack_require__(134);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/tabs/tab-highlight.js
var tab_highlight = __webpack_require__(460);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/split-pane/split-pane.js
var split_pane = __webpack_require__(187);

// EXTERNAL MODULE: ./src/providers/utils/utils.ts
var utils = __webpack_require__(2);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-controller.js
var nav_controller = __webpack_require__(21);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/view-controller.js
var view_controller = __webpack_require__(35);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/keyboard.js
var keyboard = __webpack_require__(99);

// CONCATENATED MODULE: ./src/components/ion-tabs/ion-tabs.ngfactory.js
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 


















var styles_CoreIonTabsComponent = [];
var RenderType_CoreIonTabsComponent = core["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_CoreIonTabsComponent, data: {} });

function View_CoreIonTabsComponent_1(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "a", [["class", "tab-button"], ["href", "#"], ["role", "tab"]], [[8, "hidden", 0], [1, "id", 0], [1, "aria-controls", 0], [1, "aria-selected", 0], [2, "has-title", null], [2, "has-icon", null], [2, "has-title-only", null], [2, "icon-only", null], [2, "has-badge", null], [2, "disable-hover", null], [2, "tab-disabled", null], [2, "tab-hidden", null]], [[null, "ionSelect"], [null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (core["_44" /* ɵnov */](_v, 1).onClick() !== false);
        ad = (pd_0 && ad);
    } if (("ionSelect" === en)) {
        var pd_1 = (_co.select(_v.context.$implicit) !== false);
        ad = (pd_1 && ad);
    } return ad; }, View_TabButton_0, RenderType_TabButton)), core["_30" /* ɵdid */](1, 114688, null, 0, tab_button["a" /* TabButton */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { tab: [0, "tab"] }, { ionSelect: "ionSelect" })], function (_ck, _v) { var currVal_12 = _v.context.$implicit; _ck(_v, 1, 0, currVal_12); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = (_co._loaded === false); var currVal_1 = core["_44" /* ɵnov */](_v, 1).tab._btnId; var currVal_2 = core["_44" /* ɵnov */](_v, 1).tab._tabId; var currVal_3 = core["_44" /* ɵnov */](_v, 1).tab.isSelected; var currVal_4 = core["_44" /* ɵnov */](_v, 1).hasTitle; var currVal_5 = core["_44" /* ɵnov */](_v, 1).hasIcon; var currVal_6 = core["_44" /* ɵnov */](_v, 1).hasTitleOnly; var currVal_7 = core["_44" /* ɵnov */](_v, 1).hasIconOnly; var currVal_8 = core["_44" /* ɵnov */](_v, 1).hasBadge; var currVal_9 = core["_44" /* ɵnov */](_v, 1).disHover; var currVal_10 = !core["_44" /* ɵnov */](_v, 1).tab.enabled; var currVal_11 = !core["_44" /* ɵnov */](_v, 1).tab.show; _ck(_v, 0, 1, [currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8, currVal_9, currVal_10, currVal_11]); }); }
function View_CoreIonTabsComponent_2(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 7, "div", [["class", "core-ion-tabs-loading"]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_31" /* ɵeld */](2, 0, null, null, 4, "span", [["class", "core-ion-tabs-loading-spinner"]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](4, 0, null, null, 1, "ion-spinner", [], [[2, "spinner-paused", null]], null, null, spinner_ngfactory["b" /* View_Spinner_0 */], spinner_ngfactory["a" /* RenderType_Spinner */])), core["_30" /* ɵdid */](5, 114688, null, 0, spinner["a" /* Spinner */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "]))], function (_ck, _v) { _ck(_v, 5, 0); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 5)._paused; _ck(_v, 4, 0, currVal_0); }); }
function View_CoreIonTabsComponent_0(_l) { return core["_57" /* ɵvid */](0, [core["_52" /* ɵqud */](402653184, 1, { _highlight: 0 }), core["_52" /* ɵqud */](402653184, 2, { _tabbar: 0 }), core["_52" /* ɵqud */](402653184, 3, { portal: 0 }), core["_52" /* ɵqud */](402653184, 4, { originalTabsRef: 0 }), (_l()(), core["_31" /* ɵeld */](4, 0, [[2, 0], ["tabbar", 1]], null, 10, "div", [["class", "tabbar"], ["role", "tablist"]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreIonTabsComponent_1)), core["_30" /* ɵdid */](7, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_31" /* ɵeld */](9, 0, null, null, 1, "div", [["class", "tab-highlight"]], null, null, null, null, null)), core["_30" /* ɵdid */](10, 16384, [[1, 4]], 0, tab_highlight["a" /* TabHighlight */], [core["t" /* ElementRef */], dom_controller["a" /* DomController */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreIonTabsComponent_2)), core["_30" /* ɵdid */](13, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_31" /* ɵeld */](16, 0, [[4, 0], ["originalTabs", 1]], null, 3, "div", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), core["_43" /* ɵncd */](null, 0), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_31" /* ɵeld */](21, 16777216, [[3, 3], ["portal", 1]], null, 0, "div", [["tab-portal", ""]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co._tabs; _ck(_v, 7, 0, currVal_0); var currVal_1 = (_co._loaded === false); _ck(_v, 13, 0, currVal_1); }, null); }
function View_CoreIonTabsComponent_Host_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "core-ion-tabs", [], null, null, null, View_CoreIonTabsComponent_0, RenderType_CoreIonTabsComponent)), core["_50" /* ɵprd */](6144, null, split_pane["a" /* RootNode */], null, [ion_tabs["a" /* CoreIonTabsComponent */]]), core["_30" /* ɵdid */](2, 4374528, null, 0, ion_tabs["a" /* CoreIonTabsComponent */], [utils["a" /* CoreUtilsProvider */], [2, nav_controller["a" /* NavController */]], [2, view_controller["a" /* ViewController */]], app["a" /* App */], config["a" /* Config */], core["t" /* ElementRef */], platform["a" /* Platform */], core["V" /* Renderer */], deep_linker["a" /* DeepLinker */], keyboard["a" /* Keyboard */]], null, null)], null, null); }
var CoreIonTabsComponentNgFactory = core["_27" /* ɵccf */]("core-ion-tabs", ion_tabs["a" /* CoreIonTabsComponent */], View_CoreIonTabsComponent_Host_0, { color: "color", mode: "mode", name: "name", selectedIndex: "selectedIndex", tabsLayout: "tabsLayout", tabsPlacement: "tabsPlacement", tabsHighlight: "tabsHighlight", loaded: "loaded", selectedDisabled: "selectedDisabled" }, { ionChange: "ionChange" }, ["*"]);

//# sourceMappingURL=ion-tabs.ngfactory.js.map
// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-params.js
var nav_params = __webpack_require__(59);

// CONCATENATED MODULE: ./src/core/mainmenu/pages/menu/menu.ngfactory.js
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
























var styles_CoreMainMenuPage = [];
var RenderType_CoreMainMenuPage = core["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_CoreMainMenuPage, data: {} });

function View_CoreMainMenuPage_1(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "core-ion-tab", [["role", "tabpanel"]], [[8, "className", 0], [1, "id", 0], [1, "aria-labelledby", 0]], null, null, View_CoreIonTabComponent_0, RenderType_CoreIonTabComponent)), core["_30" /* ɵdid */](1, 245760, null, 0, ion_tab["a" /* CoreIonTabComponent */], [ion_tabs["a" /* CoreIonTabsComponent */], app["a" /* App */], config["a" /* Config */], platform["a" /* Platform */], core["t" /* ElementRef */], core["M" /* NgZone */], core["V" /* Renderer */], core["o" /* ComponentFactoryResolver */], core["j" /* ChangeDetectorRef */], gesture_controller["l" /* GestureController */], transition_controller["a" /* TransitionController */], [2, deep_linker["a" /* DeepLinker */]], dom_controller["a" /* DomController */], core["u" /* ErrorHandler */]], { root: [0, "root"], rootParams: [1, "rootParams"], tabTitle: [2, "tabTitle"], tabIcon: [3, "tabIcon"], tabBadge: [4, "tabBadge"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], function (_ck, _v) { var currVal_3 = _v.context.$implicit.page; var currVal_4 = _v.context.$implicit.pageParams; var currVal_5 = core["_56" /* ɵunv */](_v, 1, 2, core["_44" /* ɵnov */](_v, 2).transform(_v.context.$implicit.title)); var currVal_6 = _v.context.$implicit.icon; var currVal_7 = _v.context.$implicit.badge; _ck(_v, 1, 0, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7); }, function (_ck, _v) { var currVal_0 = core["_34" /* ɵinlineInterpolate */](1, "", _v.context.$implicit.class, ""); var currVal_1 = core["_44" /* ɵnov */](_v, 1)._tabId; var currVal_2 = core["_44" /* ɵnov */](_v, 1)._btnId; _ck(_v, 0, 0, currVal_0, currVal_1, currVal_2); }); }
function View_CoreMainMenuPage_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 13, "core-ion-tabs", [["tabsLayout", "title-hide"], ["tabsPlacement", "bottom"]], [[8, "hidden", 0]], null, null, View_CoreIonTabsComponent_0, RenderType_CoreIonTabsComponent)), core["_50" /* ɵprd */](6144, null, split_pane["a" /* RootNode */], null, [ion_tabs["a" /* CoreIonTabsComponent */]]), core["_30" /* ɵdid */](2, 4374528, [["mainTabs", 4]], 0, ion_tabs["a" /* CoreIonTabsComponent */], [utils["a" /* CoreUtilsProvider */], [2, nav_controller["a" /* NavController */]], [2, view_controller["a" /* ViewController */]], app["a" /* App */], config["a" /* Config */], core["t" /* ElementRef */], platform["a" /* Platform */], core["V" /* Renderer */], deep_linker["a" /* DeepLinker */], keyboard["a" /* Keyboard */]], { selectedIndex: [0, "selectedIndex"], tabsLayout: [1, "tabsLayout"], tabsPlacement: [2, "tabsPlacement"], loaded: [3, "loaded"], selectedDisabled: [4, "selectedDisabled"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n    "])), (_l()(), core["_31" /* ɵeld */](4, 0, null, 0, 1, "core-ion-tab", [["role", "tabpanel"]], [[1, "id", 0], [1, "aria-labelledby", 0]], null, null, View_CoreIonTabComponent_0, RenderType_CoreIonTabComponent)), core["_30" /* ɵdid */](5, 245760, null, 0, ion_tab["a" /* CoreIonTabComponent */], [ion_tabs["a" /* CoreIonTabsComponent */], app["a" /* App */], config["a" /* Config */], platform["a" /* Platform */], core["t" /* ElementRef */], core["M" /* NgZone */], core["V" /* Renderer */], core["o" /* ComponentFactoryResolver */], core["j" /* ChangeDetectorRef */], gesture_controller["l" /* GestureController */], transition_controller["a" /* TransitionController */], [2, deep_linker["a" /* DeepLinker */]], dom_controller["a" /* DomController */], core["u" /* ErrorHandler */]], { root: [0, "root"], rootParams: [1, "rootParams"], enabled: [2, "enabled"], show: [3, "show"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n    "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_CoreMainMenuPage_1)), core["_30" /* ɵdid */](8, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n    "])), (_l()(), core["_31" /* ɵeld */](10, 0, null, 0, 2, "core-ion-tab", [["role", "tabpanel"], ["root", "CoreMainMenuMorePage"], ["tabIcon", "more"]], [[1, "id", 0], [1, "aria-labelledby", 0]], null, null, View_CoreIonTabComponent_0, RenderType_CoreIonTabComponent)), core["_30" /* ɵdid */](11, 245760, null, 0, ion_tab["a" /* CoreIonTabComponent */], [ion_tabs["a" /* CoreIonTabsComponent */], app["a" /* App */], config["a" /* Config */], platform["a" /* Platform */], core["t" /* ElementRef */], core["M" /* NgZone */], core["V" /* Renderer */], core["o" /* ComponentFactoryResolver */], core["j" /* ChangeDetectorRef */], gesture_controller["l" /* GestureController */], transition_controller["a" /* TransitionController */], [2, deep_linker["a" /* DeepLinker */]], dom_controller["a" /* DomController */], core["u" /* ErrorHandler */]], { root: [0, "root"], tabTitle: [1, "tabTitle"], tabIcon: [2, "tabIcon"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_1 = _co.initialTab; var currVal_2 = "title-hide"; var currVal_3 = "bottom"; var currVal_4 = _co.loaded; var currVal_5 = !!_co.redirectPage; _ck(_v, 2, 0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5); var currVal_8 = _co.redirectPage; var currVal_9 = _co.redirectParams; var currVal_10 = false; var currVal_11 = false; _ck(_v, 5, 0, currVal_8, currVal_9, currVal_10, currVal_11); var currVal_12 = _co.tabs; _ck(_v, 8, 0, currVal_12); var currVal_15 = "CoreMainMenuMorePage"; var currVal_16 = core["_56" /* ɵunv */](_v, 11, 1, core["_44" /* ɵnov */](_v, 12).transform("core.more")); var currVal_17 = "more"; _ck(_v, 11, 0, currVal_15, currVal_16, currVal_17); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = !_co.showTabs; _ck(_v, 0, 0, currVal_0); var currVal_6 = core["_44" /* ɵnov */](_v, 5)._tabId; var currVal_7 = core["_44" /* ɵnov */](_v, 5)._btnId; _ck(_v, 4, 0, currVal_6, currVal_7); var currVal_13 = core["_44" /* ɵnov */](_v, 11)._tabId; var currVal_14 = core["_44" /* ɵnov */](_v, 11)._btnId; _ck(_v, 10, 0, currVal_13, currVal_14); }); }
function View_CoreMainMenuPage_Host_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "page-core-mainmenu", [], null, null, null, View_CoreMainMenuPage_0, RenderType_CoreMainMenuPage)), core["_30" /* ɵdid */](1, 180224, null, 0, menu_CoreMainMenuPage, [delegate["a" /* CoreMainMenuDelegate */], sites["a" /* CoreSitesProvider */], nav_params["a" /* NavParams */], nav_controller["a" /* NavController */]], null, null)], null, null); }
var CoreMainMenuPageNgFactory = core["_27" /* ɵccf */]("page-core-mainmenu", menu_CoreMainMenuPage, View_CoreMainMenuPage_Host_0, {}, {}, []);

//# sourceMappingURL=menu.ngfactory.js.map
// EXTERNAL MODULE: ./node_modules/@angular/forms/esm5/forms.js
var esm5_forms = __webpack_require__(18);

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

// EXTERNAL MODULE: ./src/directives/directives.module.ts + 2 modules
var directives_module = __webpack_require__(28);

// EXTERNAL MODULE: ./src/pipes/pipes.module.ts + 1 modules
var pipes_module = __webpack_require__(109);

// EXTERNAL MODULE: ./node_modules/ionic-angular/util/module-loader.js
var module_loader = __webpack_require__(237);

// CONCATENATED MODULE: ./src/core/mainmenu/pages/menu/menu.module.ngfactory.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoreMainMenuPageModuleNgFactory", function() { return CoreMainMenuPageModuleNgFactory; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 






























var CoreMainMenuPageModuleNgFactory = core["_28" /* ɵcmf */](menu_module_CoreMainMenuPageModule, [], function (_l) { return core["_40" /* ɵmod */]([core["_41" /* ɵmpd */](512, core["o" /* ComponentFactoryResolver */], core["_21" /* ɵCodegenComponentFactoryResolver */], [[8, [action_sheet_component_ngfactory["a" /* ActionSheetCmpNgFactory */], alert_component_ngfactory["a" /* AlertCmpNgFactory */], app_root_ngfactory["a" /* IonicAppNgFactory */], loading_component_ngfactory["a" /* LoadingCmpNgFactory */], modal_component_ngfactory["a" /* ModalCmpNgFactory */], picker_component_ngfactory["a" /* PickerCmpNgFactory */], popover_component_ngfactory["a" /* PopoverCmpNgFactory */], select_popover_component_ngfactory["a" /* SelectPopoverNgFactory */], toast_component_ngfactory["a" /* ToastCmpNgFactory */], context_menu_popover_ngfactory["a" /* CoreContextMenuPopoverComponentNgFactory */], course_picker_menu_popover_ngfactory["a" /* CoreCoursePickerMenuPopoverComponentNgFactory */], recaptchamodal_ngfactory["a" /* CoreRecaptchaModalComponentNgFactory */], CoreMainMenuPageNgFactory]], [3, core["o" /* ComponentFactoryResolver */]], core["K" /* NgModuleRef */]]), core["_41" /* ɵmpd */](4608, common["m" /* NgLocalization */], common["l" /* NgLocaleLocalization */], [core["G" /* LOCALE_ID */], [2, common["v" /* ɵa */]]]), core["_41" /* ɵmpd */](4608, esm5_forms["x" /* ɵi */], esm5_forms["x" /* ɵi */], []), core["_41" /* ɵmpd */](4608, esm5_forms["d" /* FormBuilder */], esm5_forms["d" /* FormBuilder */], []), core["_41" /* ɵmpd */](4608, translate_loader["b" /* TranslateLoader */], translate_loader["a" /* TranslateFakeLoader */], []), core["_41" /* ɵmpd */](4608, translate_compiler["a" /* TranslateCompiler */], translate_compiler["b" /* TranslateFakeCompiler */], []), core["_41" /* ɵmpd */](4608, translate_parser["b" /* TranslateParser */], translate_parser["a" /* TranslateDefaultParser */], []), core["_41" /* ɵmpd */](4608, missing_translation_handler["b" /* MissingTranslationHandler */], missing_translation_handler["a" /* FakeMissingTranslationHandler */], []), core["_41" /* ɵmpd */](4608, translate_service["a" /* TranslateService */], translate_service["a" /* TranslateService */], [translate_store["a" /* TranslateStore */], translate_loader["b" /* TranslateLoader */], translate_compiler["a" /* TranslateCompiler */], translate_parser["b" /* TranslateParser */], missing_translation_handler["b" /* MissingTranslationHandler */], translate_service["b" /* USE_DEFAULT_LANG */], translate_service["c" /* USE_STORE */]]), core["_41" /* ɵmpd */](512, common["b" /* CommonModule */], common["b" /* CommonModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["v" /* ɵba */], esm5_forms["v" /* ɵba */], []), core["_41" /* ɵmpd */](512, esm5_forms["i" /* FormsModule */], esm5_forms["i" /* FormsModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["s" /* ReactiveFormsModule */], esm5_forms["s" /* ReactiveFormsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["a" /* IonicModule */], ionic_angular_module["a" /* IonicModule */], []), core["_41" /* ɵmpd */](512, _ngx_translate_core["b" /* TranslateModule */], _ngx_translate_core["b" /* TranslateModule */], []), core["_41" /* ɵmpd */](512, directives_module["a" /* CoreDirectivesModule */], directives_module["a" /* CoreDirectivesModule */], []), core["_41" /* ɵmpd */](512, pipes_module["a" /* CorePipesModule */], pipes_module["a" /* CorePipesModule */], []), core["_41" /* ɵmpd */](512, components_module["a" /* CoreComponentsModule */], components_module["a" /* CoreComponentsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["b" /* IonicPageModule */], ionic_angular_module["b" /* IonicPageModule */], []), core["_41" /* ɵmpd */](512, menu_module_CoreMainMenuPageModule, menu_module_CoreMainMenuPageModule, []), core["_41" /* ɵmpd */](256, translate_service["c" /* USE_STORE */], undefined, []), core["_41" /* ɵmpd */](256, translate_service["b" /* USE_DEFAULT_LANG */], undefined, []), core["_41" /* ɵmpd */](256, module_loader["a" /* LAZY_LOADED_TOKEN */], menu_CoreMainMenuPage, [])]); });

//# sourceMappingURL=menu.module.ngfactory.js.map

/***/ })

});
//# sourceMappingURL=42.js.map