webpackJsonp([19],{

/***/ 2088:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/@angular/core/esm5/core.js
var core = __webpack_require__(0);

// EXTERNAL MODULE: ./node_modules/ionic-angular/index.js + 3 modules
var ionic_angular = __webpack_require__(5);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/index.js + 1 modules
var _ngx_translate_core = __webpack_require__(3);

// EXTERNAL MODULE: ./src/core/courses/components/my-courses/my-courses.ts
var my_courses = __webpack_require__(1546);

// CONCATENATED MODULE: ./src/core/courses/pages/my-courses/my-courses.ts
// (C) Copyright 2015 Moodle Pty Ltd.
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
    function CoreCoursesMyCoursesPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    /**
     * Go to search courses.
     */
    CoreCoursesMyCoursesPage.prototype.openSearch = function () {
        this.navCtrl.push('CoreCoursesSearchPage');
    };
    __decorate([
        Object(core["_9" /* ViewChild */])(my_courses["a" /* CoreCoursesMyCoursesComponent */]),
        __metadata("design:type", my_courses["a" /* CoreCoursesMyCoursesComponent */])
    ], CoreCoursesMyCoursesPage.prototype, "mcComponent", void 0);
    CoreCoursesMyCoursesPage = __decorate([
        Object(core["m" /* Component */])({
            selector: 'page-core-courses-my-courses',
            templateUrl: 'my-courses.html',
        }),
        __metadata("design:paramtypes", [ionic_angular["s" /* NavController */]])
    ], CoreCoursesMyCoursesPage);
    return CoreCoursesMyCoursesPage;
}());

//# sourceMappingURL=my-courses.js.map
// EXTERNAL MODULE: ./src/components/components.module.ts
var components_module = __webpack_require__(28);

// EXTERNAL MODULE: ./src/directives/directives.module.ts + 2 modules
var directives_module = __webpack_require__(32);

// EXTERNAL MODULE: ./src/core/courses/components/components.module.ts
var components_components_module = __webpack_require__(280);

// CONCATENATED MODULE: ./src/core/courses/pages/my-courses/my-courses.module.ts
// (C) Copyright 2015 Moodle Pty Ltd.
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
var action_sheet_component_ngfactory = __webpack_require__(1524);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/alert/alert-component.ngfactory.js
var alert_component_ngfactory = __webpack_require__(1525);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/app/app-root.ngfactory.js
var app_root_ngfactory = __webpack_require__(1526);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/loading/loading-component.ngfactory.js
var loading_component_ngfactory = __webpack_require__(1527);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/modal/modal-component.ngfactory.js
var modal_component_ngfactory = __webpack_require__(1528);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/picker/picker-component.ngfactory.js + 1 modules
var picker_component_ngfactory = __webpack_require__(1529);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/popover/popover-component.ngfactory.js
var popover_component_ngfactory = __webpack_require__(1530);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/select/select-popover-component.ngfactory.js
var select_popover_component_ngfactory = __webpack_require__(1531);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toast/toast-component.ngfactory.js
var toast_component_ngfactory = __webpack_require__(1532);

// EXTERNAL MODULE: ./src/components/context-menu/context-menu-popover.ngfactory.js
var context_menu_popover_ngfactory = __webpack_require__(1533);

// EXTERNAL MODULE: ./src/components/course-picker-menu/course-picker-menu-popover.ngfactory.js
var course_picker_menu_popover_ngfactory = __webpack_require__(1534);

// EXTERNAL MODULE: ./src/components/recaptcha/recaptchamodal.ngfactory.js
var recaptchamodal_ngfactory = __webpack_require__(1535);

// EXTERNAL MODULE: ./src/components/bs-tooltip/bs-tooltip.ngfactory.js
var bs_tooltip_ngfactory = __webpack_require__(1536);

// EXTERNAL MODULE: ./src/core/courses/components/course-options-menu/course-options-menu.ngfactory.js
var course_options_menu_ngfactory = __webpack_require__(1556);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.ngfactory.js
var button_ngfactory = __webpack_require__(45);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.js
var button_button = __webpack_require__(41);

// EXTERNAL MODULE: ./node_modules/ionic-angular/config/config.js
var config = __webpack_require__(8);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.pipe.js
var translate_pipe = __webpack_require__(25);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.service.js
var translate_service = __webpack_require__(17);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/icon/icon.js
var icon = __webpack_require__(47);

// EXTERNAL MODULE: ./src/components/context-menu/context-menu.ngfactory.js
var context_menu_ngfactory = __webpack_require__(93);

// EXTERNAL MODULE: ./src/components/context-menu/context-menu.ts
var context_menu = __webpack_require__(79);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/popover/popover-controller.js
var popover_controller = __webpack_require__(71);

// EXTERNAL MODULE: ./src/providers/utils/dom.ts
var dom = __webpack_require__(4);

// EXTERNAL MODULE: ./src/components/tabs/tab.ts
var tab = __webpack_require__(77);

// EXTERNAL MODULE: ./src/providers/utils/utils.ts
var utils = __webpack_require__(2);

// EXTERNAL MODULE: ./src/components/context-menu/context-menu-item.ngfactory.js
var context_menu_item_ngfactory = __webpack_require__(94);

// EXTERNAL MODULE: ./src/components/context-menu/context-menu-item.ts
var context_menu_item = __webpack_require__(84);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-header.js
var toolbar_header = __webpack_require__(375);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/view-controller.js
var view_controller = __webpack_require__(39);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/navbar.ngfactory.js
var navbar_ngfactory = __webpack_require__(725);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/navbar.js
var navbar = __webpack_require__(214);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/app/app.js + 3 modules
var app = __webpack_require__(35);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-controller.js
var nav_controller = __webpack_require__(21);

// EXTERNAL MODULE: ./src/directives/back-button.ts
var back_button = __webpack_require__(478);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/platform.js + 1 modules
var platform = __webpack_require__(16);

// EXTERNAL MODULE: ./src/providers/events.ts
var events = __webpack_require__(10);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.ngfactory.js
var toolbar_title_ngfactory = __webpack_require__(726);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.js
var toolbar_title = __webpack_require__(316);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar.js
var toolbar = __webpack_require__(251);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-item.js
var toolbar_item = __webpack_require__(376);

// EXTERNAL MODULE: ./node_modules/@angular/common/esm5/common.js
var common = __webpack_require__(7);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.ngfactory.js
var content_ngfactory = __webpack_require__(185);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.js
var content = __webpack_require__(29);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/dom-controller.js
var dom_controller = __webpack_require__(34);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/keyboard.js
var keyboard = __webpack_require__(109);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/refresher/refresher.js
var refresher = __webpack_require__(161);

// EXTERNAL MODULE: ./node_modules/ionic-angular/gestures/gesture-controller.js
var gesture_controller = __webpack_require__(44);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/refresher/refresher-content.ngfactory.js
var refresher_content_ngfactory = __webpack_require__(215);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/refresher/refresher-content.js
var refresher_content = __webpack_require__(175);

// EXTERNAL MODULE: ./src/core/courses/components/my-courses/my-courses.ngfactory.js
var my_courses_ngfactory = __webpack_require__(2175);

// EXTERNAL MODULE: ./src/core/courses/providers/courses.ts
var courses = __webpack_require__(52);

// EXTERNAL MODULE: ./src/providers/sites.ts
var sites = __webpack_require__(1);

// EXTERNAL MODULE: ./src/core/course/providers/helper.ts
var helper = __webpack_require__(38);

// EXTERNAL MODULE: ./src/core/course/providers/options-delegate.ts
var options_delegate = __webpack_require__(104);

// EXTERNAL MODULE: ./src/core/courses/providers/helper.ts
var providers_helper = __webpack_require__(190);

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
function View_CoreCoursesMyCoursesPage_2(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 10, "core-context-menu", [], null, null, null, context_menu_ngfactory["b" /* View_CoreContextMenuComponent_0 */], context_menu_ngfactory["a" /* RenderType_CoreContextMenuComponent */])), core["_30" /* ɵdid */](1, 245760, null, 0, context_menu["a" /* CoreContextMenuComponent */], [translate_service["a" /* TranslateService */], popover_controller["a" /* PopoverController */], core["t" /* ElementRef */], dom["a" /* CoreDomUtilsProvider */], [2, tab["a" /* CoreTabComponent */]], utils["a" /* CoreUtilsProvider */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, 0, 2, "core-context-menu-item", [], null, [[null, "action"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("action" === en)) {
        var pd_0 = (_co.mcComponent.prefetchCourses() !== false);
        ad = (pd_0 && ad);
    } return ad; }, context_menu_item_ngfactory["b" /* View_CoreContextMenuItemComponent_0 */], context_menu_item_ngfactory["a" /* RenderType_CoreContextMenuItemComponent */])), core["_30" /* ɵdid */](4, 770048, null, 0, context_menu_item["a" /* CoreContextMenuItemComponent */], [context_menu["a" /* CoreContextMenuComponent */]], { content: [0, "content"], iconAction: [1, "iconAction"], closeOnClick: [2, "closeOnClick"], priority: [3, "priority"], badge: [4, "badge"], hidden: [5, "hidden"] }, { action: "action" }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 0, 2, "core-context-menu-item", [], null, [[null, "action"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("action" === en)) {
        var pd_0 = (_co.mcComponent.switchFilter() !== false);
        ad = (pd_0 && ad);
    } return ad; }, context_menu_item_ngfactory["b" /* View_CoreContextMenuItemComponent_0 */], context_menu_item_ngfactory["a" /* RenderType_CoreContextMenuItemComponent */])), core["_30" /* ɵdid */](8, 770048, null, 0, context_menu_item["a" /* CoreContextMenuItemComponent */], [context_menu["a" /* CoreContextMenuComponent */]], { content: [0, "content"], iconAction: [1, "iconAction"], priority: [2, "priority"], hidden: [3, "hidden"] }, { action: "action" }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n            "]))], function (_ck, _v) { var _co = _v.component; _ck(_v, 1, 0); var currVal_0 = core["_56" /* ɵunv */](_v, 4, 0, core["_44" /* ɵnov */](_v, 5).transform("core.courses.downloadcourses")); var currVal_1 = _co.mcComponent.prefetchCoursesData.icon; var currVal_2 = false; var currVal_3 = 800; var currVal_4 = _co.mcComponent.prefetchCoursesData.badge; var currVal_5 = ((!_co.mcComponent.downloadAllCoursesEnabled || !_co.mcComponent.courses) || (_co.mcComponent.courses.length < 2)); _ck(_v, 4, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5); var currVal_6 = core["_56" /* ɵunv */](_v, 8, 0, core["_44" /* ɵnov */](_v, 9).transform("core.courses.filtermycourses")); var currVal_7 = "funnel"; var currVal_8 = 700; var currVal_9 = (!_co.mcComponent.courses || (_co.mcComponent.courses.length <= 5)); _ck(_v, 8, 0, currVal_6, currVal_7, currVal_8, currVal_9); }, null); }
function View_CoreCoursesMyCoursesPage_0(_l) { return core["_57" /* ɵvid */](0, [core["_52" /* ɵqud */](402653184, 1, { mcComponent: 0 }), (_l()(), core["_31" /* ɵeld */](1, 0, null, null, 23, "ion-header", [], null, null, null, null, null)), core["_30" /* ɵdid */](2, 16384, null, 0, toolbar_header["a" /* Header */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, view_controller["a" /* ViewController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_31" /* ɵeld */](4, 0, null, null, 19, "ion-navbar", [["class", "toolbar"], ["core-back-button", ""]], [[8, "hidden", 0], [2, "statusbar-padding", null]], null, null, navbar_ngfactory["b" /* View_Navbar_0 */], navbar_ngfactory["a" /* RenderType_Navbar */])), core["_30" /* ɵdid */](5, 49152, null, 0, navbar["a" /* Navbar */], [app["a" /* App */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_30" /* ɵdid */](6, 212992, null, 0, back_button["a" /* CoreBackButtonDirective */], [navbar["a" /* Navbar */], platform["a" /* Platform */], translate_service["a" /* TranslateService */], events["a" /* CoreEventsProvider */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n        "])), (_l()(), core["_31" /* ɵeld */](8, 0, null, 3, 3, "ion-title", [], null, null, null, toolbar_title_ngfactory["b" /* View_ToolbarTitle_0 */], toolbar_title_ngfactory["a" /* RenderType_ToolbarTitle */])), core["_30" /* ɵdid */](9, 49152, null, 0, toolbar_title["a" /* ToolbarTitle */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), (_l()(), core["_55" /* ɵted */](10, 0, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n\n        "])), (_l()(), core["_31" /* ɵeld */](13, 0, null, 2, 9, "ion-buttons", [["end", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](14, 16384, null, 1, toolbar_item["a" /* ToolbarItem */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), core["_52" /* ɵqud */](603979776, 2, { _buttons: 1 }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreCoursesMyCoursesPage_1)), core["_30" /* ɵdid */](18, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreCoursesMyCoursesPage_2)), core["_30" /* ɵdid */](21, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_31" /* ɵeld */](26, 0, null, null, 13, "ion-content", [], [[2, "statusbar-padding", null], [2, "has-refresher", null]], null, null, content_ngfactory["b" /* View_Content_0 */], content_ngfactory["a" /* RenderType_Content */])), core["_30" /* ɵdid */](27, 4374528, null, 0, content["a" /* Content */], [config["a" /* Config */], platform["a" /* Platform */], dom_controller["a" /* DomController */], core["t" /* ElementRef */], core["V" /* Renderer */], app["a" /* App */], keyboard["a" /* Keyboard */], core["M" /* NgZone */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n    "])), (_l()(), core["_31" /* ɵeld */](29, 0, null, 2, 6, "ion-refresher", [], [[2, "refresher-active", null], [4, "top", null]], [[null, "ionRefresh"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("ionRefresh" === en)) {
        var pd_0 = (_co.mcComponent.refreshCourses($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), core["_30" /* ɵdid */](30, 212992, null, 0, refresher["a" /* Refresher */], [platform["a" /* Platform */], content["a" /* Content */], core["M" /* NgZone */], gesture_controller["l" /* GestureController */]], { enabled: [0, "enabled"] }, { ionRefresh: "ionRefresh" }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_31" /* ɵeld */](32, 0, null, null, 2, "ion-refresher-content", [], [[1, "state", 0]], null, null, refresher_content_ngfactory["b" /* View_RefresherContent_0 */], refresher_content_ngfactory["a" /* RenderType_RefresherContent */])), core["_30" /* ɵdid */](33, 114688, null, 0, refresher_content["a" /* RefresherContent */], [refresher["a" /* Refresher */], config["a" /* Config */]], { pullingText: [0, "pullingText"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n\n    "])), (_l()(), core["_31" /* ɵeld */](37, 0, null, 1, 1, "core-courses-my-courses", [], null, null, null, my_courses_ngfactory["b" /* View_CoreCoursesMyCoursesComponent_0 */], my_courses_ngfactory["a" /* RenderType_CoreCoursesMyCoursesComponent */])), core["_30" /* ɵdid */](38, 245760, [[1, 4]], 0, my_courses["a" /* CoreCoursesMyCoursesComponent */], [courses["a" /* CoreCoursesProvider */], dom["a" /* CoreDomUtilsProvider */], events["a" /* CoreEventsProvider */], sites["a" /* CoreSitesProvider */], helper["a" /* CoreCourseHelperProvider */], options_delegate["a" /* CoreCourseOptionsDelegate */], providers_helper["a" /* CoreCoursesHelperProvider */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; _ck(_v, 6, 0); var currVal_3 = (_co.mcComponent && _co.mcComponent.searchEnabled); _ck(_v, 18, 0, currVal_3); var currVal_4 = _co.mcComponent; _ck(_v, 21, 0, currVal_4); var currVal_9 = (_co.mcComponent && _co.mcComponent.coursesLoaded); _ck(_v, 30, 0, currVal_9); var currVal_11 = core["_34" /* ɵinlineInterpolate */](1, "", core["_56" /* ɵunv */](_v, 33, 0, core["_44" /* ɵnov */](_v, 34).transform("core.pulltorefresh")), ""); _ck(_v, 33, 0, currVal_11); _ck(_v, 38, 0); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 5)._hidden; var currVal_1 = core["_44" /* ɵnov */](_v, 5)._sbPadding; _ck(_v, 4, 0, currVal_0, currVal_1); var currVal_2 = core["_56" /* ɵunv */](_v, 10, 0, core["_44" /* ɵnov */](_v, 11).transform("core.courses.mycourses")); _ck(_v, 10, 0, currVal_2); var currVal_5 = core["_44" /* ɵnov */](_v, 27).statusbarPadding; var currVal_6 = core["_44" /* ɵnov */](_v, 27)._hasRefresher; _ck(_v, 26, 0, currVal_5, currVal_6); var currVal_7 = (core["_44" /* ɵnov */](_v, 30).state !== "inactive"); var currVal_8 = core["_44" /* ɵnov */](_v, 30)._top; _ck(_v, 29, 0, currVal_7, currVal_8); var currVal_10 = core["_44" /* ɵnov */](_v, 33).r.state; _ck(_v, 32, 0, currVal_10); }); }
function View_CoreCoursesMyCoursesPage_Host_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "page-core-courses-my-courses", [], null, null, null, View_CoreCoursesMyCoursesPage_0, RenderType_CoreCoursesMyCoursesPage)), core["_30" /* ɵdid */](1, 49152, null, 0, my_courses_CoreCoursesMyCoursesPage, [nav_controller["a" /* NavController */]], null, null)], null, null); }
var CoreCoursesMyCoursesPageNgFactory = core["_27" /* ɵccf */]("page-core-courses-my-courses", my_courses_CoreCoursesMyCoursesPage, View_CoreCoursesMyCoursesPage_Host_0, {}, {}, []);

//# sourceMappingURL=my-courses.ngfactory.js.map
// EXTERNAL MODULE: ./node_modules/@angular/forms/esm5/forms.js
var esm5_forms = __webpack_require__(23);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.loader.js
var translate_loader = __webpack_require__(371);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.compiler.js
var translate_compiler = __webpack_require__(372);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.parser.js
var translate_parser = __webpack_require__(374);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/missing-translation-handler.js
var missing_translation_handler = __webpack_require__(373);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.store.js
var translate_store = __webpack_require__(477);

// EXTERNAL MODULE: ./node_modules/ionic-angular/module.js
var ionic_angular_module = __webpack_require__(724);

// EXTERNAL MODULE: ./src/pipes/pipes.module.ts + 2 modules
var pipes_module = __webpack_require__(108);

// EXTERNAL MODULE: ./node_modules/ionic-angular/util/module-loader.js
var module_loader = __webpack_require__(274);

// CONCATENATED MODULE: ./src/core/courses/pages/my-courses/my-courses.module.ngfactory.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoreCoursesMyCoursesPageModuleNgFactory", function() { return CoreCoursesMyCoursesPageModuleNgFactory; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 

































var CoreCoursesMyCoursesPageModuleNgFactory = core["_28" /* ɵcmf */](my_courses_module_CoreCoursesMyCoursesPageModule, [], function (_l) { return core["_40" /* ɵmod */]([core["_41" /* ɵmpd */](512, core["o" /* ComponentFactoryResolver */], core["_21" /* ɵCodegenComponentFactoryResolver */], [[8, [action_sheet_component_ngfactory["a" /* ActionSheetCmpNgFactory */], alert_component_ngfactory["a" /* AlertCmpNgFactory */], app_root_ngfactory["a" /* IonicAppNgFactory */], loading_component_ngfactory["a" /* LoadingCmpNgFactory */], modal_component_ngfactory["a" /* ModalCmpNgFactory */], picker_component_ngfactory["a" /* PickerCmpNgFactory */], popover_component_ngfactory["a" /* PopoverCmpNgFactory */], select_popover_component_ngfactory["a" /* SelectPopoverNgFactory */], toast_component_ngfactory["a" /* ToastCmpNgFactory */], context_menu_popover_ngfactory["a" /* CoreContextMenuPopoverComponentNgFactory */], course_picker_menu_popover_ngfactory["a" /* CoreCoursePickerMenuPopoverComponentNgFactory */], recaptchamodal_ngfactory["a" /* CoreRecaptchaModalComponentNgFactory */], bs_tooltip_ngfactory["a" /* CoreBSTooltipComponentNgFactory */], course_options_menu_ngfactory["a" /* CoreCoursesCourseOptionsMenuComponentNgFactory */], CoreCoursesMyCoursesPageNgFactory]], [3, core["o" /* ComponentFactoryResolver */]], core["K" /* NgModuleRef */]]), core["_41" /* ɵmpd */](4608, common["m" /* NgLocalization */], common["l" /* NgLocaleLocalization */], [core["G" /* LOCALE_ID */], [2, common["w" /* ɵa */]]]), core["_41" /* ɵmpd */](4608, esm5_forms["x" /* ɵi */], esm5_forms["x" /* ɵi */], []), core["_41" /* ɵmpd */](4608, esm5_forms["d" /* FormBuilder */], esm5_forms["d" /* FormBuilder */], []), core["_41" /* ɵmpd */](4608, translate_loader["b" /* TranslateLoader */], translate_loader["a" /* TranslateFakeLoader */], []), core["_41" /* ɵmpd */](4608, translate_compiler["a" /* TranslateCompiler */], translate_compiler["b" /* TranslateFakeCompiler */], []), core["_41" /* ɵmpd */](4608, translate_parser["b" /* TranslateParser */], translate_parser["a" /* TranslateDefaultParser */], []), core["_41" /* ɵmpd */](4608, missing_translation_handler["b" /* MissingTranslationHandler */], missing_translation_handler["a" /* FakeMissingTranslationHandler */], []), core["_41" /* ɵmpd */](4608, translate_service["a" /* TranslateService */], translate_service["a" /* TranslateService */], [translate_store["a" /* TranslateStore */], translate_loader["b" /* TranslateLoader */], translate_compiler["a" /* TranslateCompiler */], translate_parser["b" /* TranslateParser */], missing_translation_handler["b" /* MissingTranslationHandler */], translate_service["b" /* USE_DEFAULT_LANG */], translate_service["c" /* USE_STORE */]]), core["_41" /* ɵmpd */](512, common["b" /* CommonModule */], common["b" /* CommonModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["v" /* ɵba */], esm5_forms["v" /* ɵba */], []), core["_41" /* ɵmpd */](512, esm5_forms["i" /* FormsModule */], esm5_forms["i" /* FormsModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["s" /* ReactiveFormsModule */], esm5_forms["s" /* ReactiveFormsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["a" /* IonicModule */], ionic_angular_module["a" /* IonicModule */], []), core["_41" /* ɵmpd */](512, _ngx_translate_core["b" /* TranslateModule */], _ngx_translate_core["b" /* TranslateModule */], []), core["_41" /* ɵmpd */](512, directives_module["a" /* CoreDirectivesModule */], directives_module["a" /* CoreDirectivesModule */], []), core["_41" /* ɵmpd */](512, pipes_module["a" /* CorePipesModule */], pipes_module["a" /* CorePipesModule */], []), core["_41" /* ɵmpd */](512, components_module["a" /* CoreComponentsModule */], components_module["a" /* CoreComponentsModule */], []), core["_41" /* ɵmpd */](512, components_components_module["a" /* CoreCoursesComponentsModule */], components_components_module["a" /* CoreCoursesComponentsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["b" /* IonicPageModule */], ionic_angular_module["b" /* IonicPageModule */], []), core["_41" /* ɵmpd */](512, my_courses_module_CoreCoursesMyCoursesPageModule, my_courses_module_CoreCoursesMyCoursesPageModule, []), core["_41" /* ɵmpd */](256, translate_service["c" /* USE_STORE */], undefined, []), core["_41" /* ɵmpd */](256, translate_service["b" /* USE_DEFAULT_LANG */], undefined, []), core["_41" /* ɵmpd */](256, module_loader["a" /* LAZY_LOADED_TOKEN */], my_courses_CoreCoursesMyCoursesPage, [])]); });

//# sourceMappingURL=my-courses.module.ngfactory.js.map

/***/ }),

/***/ 2175:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RenderType_CoreCoursesMyCoursesComponent; });
/* harmony export (immutable) */ __webpack_exports__["b"] = View_CoreCoursesMyCoursesComponent_0;
/* unused harmony export View_CoreCoursesMyCoursesComponent_Host_0 */
/* unused harmony export CoreCoursesMyCoursesComponentNgFactory */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_ionic_angular_components_searchbar_searchbar_ngfactory__ = __webpack_require__(1578);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_searchbar_searchbar__ = __webpack_require__(388);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular_config_config__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular_platform_platform__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core_src_translate_pipe__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core_src_translate_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ionic_angular_components_grid_col__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__course_progress_course_progress_ngfactory__ = __webpack_require__(398);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__course_progress_course_progress__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ionic_angular_navigation_nav_controller__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__course_providers_helper__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_utils_dom__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__course_providers_course__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__providers_events__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__providers_sites__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__providers_courses__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_ionic_angular_components_popover_popover_controller__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__user_providers_user__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__components_empty_box_empty_box_ngfactory__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__components_empty_box_empty_box__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__angular_common__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__components_loading_loading_ngfactory__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__components_loading_loading__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__providers_utils_utils__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26_ionic_angular_components_grid_grid__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27_ionic_angular_components_grid_row__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__my_courses__ = __webpack_require__(1546);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__course_providers_options_delegate__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__providers_helper__ = __webpack_require__(190);
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 































var styles_CoreCoursesMyCoursesComponent = [];
var RenderType_CoreCoursesMyCoursesComponent = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_CoreCoursesMyCoursesComponent, data: {} });

function View_CoreCoursesMyCoursesComponent_1(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 6, "ion-searchbar", [], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "searchbar-animated", null], [2, "searchbar-has-value", null], [2, "searchbar-active", null], [2, "searchbar-show-cancel", null], [2, "searchbar-left-aligned", null], [2, "searchbar-has-focus", null]], [[null, "ngModelChange"], [null, "ionInput"], [null, "ionCancel"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("ngModelChange" === en)) {
        var pd_0 = ((_co.filter = $event) !== false);
        ad = (pd_0 && ad);
    } if (("ionInput" === en)) {
        var pd_1 = (_co.filterChanged($event) !== false);
        ad = (pd_1 && ad);
    } if (("ionCancel" === en)) {
        var pd_2 = (_co.filterChanged() !== false);
        ad = (pd_2 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_1__node_modules_ionic_angular_components_searchbar_searchbar_ngfactory__["b" /* View_Searchbar_0 */], __WEBPACK_IMPORTED_MODULE_1__node_modules_ionic_angular_components_searchbar_searchbar_ngfactory__["a" /* RenderType_Searchbar */])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](1, 671744, null, 0, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["q" /* NgModel */], [[8, null], [8, null], [8, null], [8, null]], { model: [0, "model"] }, { update: "ngModelChange" }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_50" /* ɵprd */](2048, null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["m" /* NgControl */], null, [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["q" /* NgModel */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](3, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["n" /* NgControlStatus */], [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["m" /* NgControl */]], null, null), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](4, 1294336, [[1, 4], ["searchbar", 4]], 0, __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_searchbar_searchbar__["a" /* Searchbar */], [__WEBPACK_IMPORTED_MODULE_4_ionic_angular_config_config__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular_platform_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */], [2, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["m" /* NgControl */]]], { placeholder: [0, "placeholder"] }, { ionInput: "ionInput", ionCancel: "ionCancel" }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_47" /* ɵpid */](131072, __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core_src_translate_pipe__["a" /* TranslatePipe */], [__WEBPACK_IMPORTED_MODULE_7__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */]]), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n    "]))], function (_ck, _v) { var _co = _v.component; var currVal_13 = _co.filter; _ck(_v, 1, 0, currVal_13); var currVal_14 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_56" /* ɵunv */](_v, 4, 0, __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 5).transform("core.courses.filtermycourses")); _ck(_v, 4, 0, currVal_14); }, function (_ck, _v) { var currVal_0 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 3).ngClassUntouched; var currVal_1 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 3).ngClassTouched; var currVal_2 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 3).ngClassPristine; var currVal_3 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 3).ngClassDirty; var currVal_4 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 3).ngClassValid; var currVal_5 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 3).ngClassInvalid; var currVal_6 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 3).ngClassPending; var currVal_7 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 4)._animated; var currVal_8 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 4)._value; var currVal_9 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 4)._isActive; var currVal_10 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 4)._showCancelButton; var currVal_11 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 4)._shouldAlignLeft; var currVal_12 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 4)._isFocus; _ck(_v, 0, 1, [currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8, currVal_9, currVal_10, currVal_11, currVal_12]); }); }
function View_CoreCoursesMyCoursesComponent_2(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 5, "ion-col", [["align-self-stretch", ""], ["class", "col"], ["col-12", ""], ["col-lg-4", ""], ["col-md-6", ""], ["col-sm-6", ""], ["col-xl-4", ""], ["no-padding", ""]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](1, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_8_ionic_angular_components_grid_col__["a" /* Col */], [], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](3, 0, null, null, 1, "core-courses-course-progress", [["class", "core-courseoverview"], ["showAll", "true"]], null, null, null, __WEBPACK_IMPORTED_MODULE_9__course_progress_course_progress_ngfactory__["b" /* View_CoreCoursesCourseProgressComponent_0 */], __WEBPACK_IMPORTED_MODULE_9__course_progress_course_progress_ngfactory__["a" /* RenderType_CoreCoursesCourseProgressComponent */])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](4, 245760, null, 0, __WEBPACK_IMPORTED_MODULE_10__course_progress_course_progress__["a" /* CoreCoursesCourseProgressComponent */], [[2, __WEBPACK_IMPORTED_MODULE_11_ionic_angular_navigation_nav_controller__["a" /* NavController */]], __WEBPACK_IMPORTED_MODULE_12__course_providers_helper__["a" /* CoreCourseHelperProvider */], __WEBPACK_IMPORTED_MODULE_13__providers_utils_dom__["a" /* CoreDomUtilsProvider */], __WEBPACK_IMPORTED_MODULE_14__course_providers_course__["a" /* CoreCourseProvider */], __WEBPACK_IMPORTED_MODULE_15__providers_events__["a" /* CoreEventsProvider */], __WEBPACK_IMPORTED_MODULE_16__providers_sites__["a" /* CoreSitesProvider */], __WEBPACK_IMPORTED_MODULE_17__providers_courses__["a" /* CoreCoursesProvider */], __WEBPACK_IMPORTED_MODULE_18_ionic_angular_components_popover_popover_controller__["a" /* PopoverController */], __WEBPACK_IMPORTED_MODULE_19__user_providers_user__["a" /* CoreUserProvider */]], { course: [0, "course"], showAll: [1, "showAll"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n            "]))], function (_ck, _v) { var currVal_0 = _v.context.$implicit; var currVal_1 = "true"; _ck(_v, 4, 0, currVal_0, currVal_1); }, null); }
function View_CoreCoursesMyCoursesComponent_4(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 2, "p", [], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](1, null, ["", ""])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_47" /* ɵpid */](131072, __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core_src_translate_pipe__["a" /* TranslatePipe */], [__WEBPACK_IMPORTED_MODULE_7__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */]])], null, function (_ck, _v) { var currVal_0 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_56" /* ɵunv */](_v, 1, 0, __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 2).transform("core.courses.searchcoursesadvice")); _ck(_v, 1, 0, currVal_0); }); }
function View_CoreCoursesMyCoursesComponent_3(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 6, "core-empty-box", [["icon", "ionic"]], null, null, null, __WEBPACK_IMPORTED_MODULE_20__components_empty_box_empty_box_ngfactory__["b" /* View_CoreEmptyBoxComponent_0 */], __WEBPACK_IMPORTED_MODULE_20__components_empty_box_empty_box_ngfactory__["a" /* RenderType_CoreEmptyBoxComponent */])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](1, 49152, null, 0, __WEBPACK_IMPORTED_MODULE_21__components_empty_box_empty_box__["a" /* CoreEmptyBoxComponent */], [], { message: [0, "message"], icon: [1, "icon"] }, null), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_47" /* ɵpid */](131072, __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core_src_translate_pipe__["a" /* TranslatePipe */], [__WEBPACK_IMPORTED_MODULE_7__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */]]), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_26" /* ɵand */](16777216, null, 0, 1, null, View_CoreCoursesMyCoursesComponent_4)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](5, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_22__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewContainerRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 0, ["\n    "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_56" /* ɵunv */](_v, 1, 0, __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 2).transform("core.courses.nocourses")); var currVal_1 = "ionic"; _ck(_v, 1, 0, currVal_0, currVal_1); var currVal_2 = _co.searchEnabled; _ck(_v, 5, 0, currVal_2); }, null); }
function View_CoreCoursesMyCoursesComponent_0(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_52" /* ɵqud */](671088640, 1, { searchbar: 0 }), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](1, 0, null, null, 19, "core-loading", [], null, null, null, __WEBPACK_IMPORTED_MODULE_23__components_loading_loading_ngfactory__["b" /* View_CoreLoadingComponent_0 */], __WEBPACK_IMPORTED_MODULE_23__components_loading_loading_ngfactory__["a" /* RenderType_CoreLoadingComponent */])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](2, 638976, null, 0, __WEBPACK_IMPORTED_MODULE_24__components_loading_loading__["a" /* CoreLoadingComponent */], [__WEBPACK_IMPORTED_MODULE_7__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_15__providers_events__["a" /* CoreEventsProvider */], __WEBPACK_IMPORTED_MODULE_25__providers_utils_utils__["a" /* CoreUtilsProvider */]], { hideUntil: [0, "hideUntil"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 0, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_26" /* ɵand */](16777216, null, 0, 1, null, View_CoreCoursesMyCoursesComponent_1)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](5, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_22__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewContainerRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 0, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](7, 0, null, 0, 9, "ion-grid", [["class", "safe-area-page grid"], ["no-padding", ""]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](8, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_26_ionic_angular_components_grid_grid__["a" /* Grid */], [], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](10, 0, null, null, 5, "ion-row", [["class", "row"], ["no-padding", ""]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](11, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_27_ionic_angular_components_grid_row__["a" /* Row */], [], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreCoursesMyCoursesComponent_2)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](14, 802816, null, 0, __WEBPACK_IMPORTED_MODULE_22__angular_common__["j" /* NgForOf */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewContainerRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* TemplateRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 0, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_26" /* ɵand */](16777216, null, 0, 1, null, View_CoreCoursesMyCoursesComponent_3)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](19, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_22__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewContainerRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 0, ["\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.coursesLoaded; _ck(_v, 2, 0, currVal_0); var currVal_1 = _co.showFilter; _ck(_v, 5, 0, currVal_1); var currVal_2 = _co.filteredCourses; _ck(_v, 14, 0, currVal_2); var currVal_3 = (!_co.courses || !_co.courses.length); _ck(_v, 19, 0, currVal_3); }, null); }
function View_CoreCoursesMyCoursesComponent_Host_0(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 1, "core-courses-my-courses", [], null, null, null, View_CoreCoursesMyCoursesComponent_0, RenderType_CoreCoursesMyCoursesComponent)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](1, 245760, null, 0, __WEBPACK_IMPORTED_MODULE_28__my_courses__["a" /* CoreCoursesMyCoursesComponent */], [__WEBPACK_IMPORTED_MODULE_17__providers_courses__["a" /* CoreCoursesProvider */], __WEBPACK_IMPORTED_MODULE_13__providers_utils_dom__["a" /* CoreDomUtilsProvider */], __WEBPACK_IMPORTED_MODULE_15__providers_events__["a" /* CoreEventsProvider */], __WEBPACK_IMPORTED_MODULE_16__providers_sites__["a" /* CoreSitesProvider */], __WEBPACK_IMPORTED_MODULE_12__course_providers_helper__["a" /* CoreCourseHelperProvider */], __WEBPACK_IMPORTED_MODULE_29__course_providers_options_delegate__["a" /* CoreCourseOptionsDelegate */], __WEBPACK_IMPORTED_MODULE_30__providers_helper__["a" /* CoreCoursesHelperProvider */]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var CoreCoursesMyCoursesComponentNgFactory = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_27" /* ɵccf */]("core-courses-my-courses", __WEBPACK_IMPORTED_MODULE_28__my_courses__["a" /* CoreCoursesMyCoursesComponent */], View_CoreCoursesMyCoursesComponent_Host_0, {}, {}, []);

//# sourceMappingURL=my-courses.ngfactory.js.map

/***/ })

});
//# sourceMappingURL=19.js.map