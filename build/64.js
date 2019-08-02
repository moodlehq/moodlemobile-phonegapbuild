webpackJsonp([64],{

/***/ 2093:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/@angular/core/esm5/core.js
var core = __webpack_require__(0);

// EXTERNAL MODULE: ./node_modules/ionic-angular/index.js + 3 modules
var ionic_angular = __webpack_require__(6);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/index.js + 1 modules
var _ngx_translate_core = __webpack_require__(3);

// EXTERNAL MODULE: ./src/core/course/pages/section/section.ts
var section = __webpack_require__(1520);

// EXTERNAL MODULE: ./src/components/components.module.ts
var components_module = __webpack_require__(29);

// EXTERNAL MODULE: ./src/directives/directives.module.ts + 2 modules
var directives_module = __webpack_require__(31);

// EXTERNAL MODULE: ./src/core/course/components/components.module.ts
var components_components_module = __webpack_require__(71);

// CONCATENATED MODULE: ./src/core/course/pages/section/section.module.ts
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







var section_module_CoreCourseSectionPageModule = /** @class */ (function () {
    function CoreCourseSectionPageModule() {
    }
    CoreCourseSectionPageModule = __decorate([
        Object(core["I" /* NgModule */])({
            declarations: [
                section["a" /* CoreCourseSectionPage */],
            ],
            imports: [
                components_module["a" /* CoreComponentsModule */],
                directives_module["a" /* CoreDirectivesModule */],
                components_components_module["a" /* CoreCourseComponentsModule */],
                ionic_angular["l" /* IonicPageModule */].forChild(section["a" /* CoreCourseSectionPage */]),
                _ngx_translate_core["b" /* TranslateModule */].forChild()
            ],
        })
    ], CoreCourseSectionPageModule);
    return CoreCourseSectionPageModule;
}());

//# sourceMappingURL=section.module.js.map
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

// EXTERNAL MODULE: ./src/core/block/components/only-title-block/only-title-block.ngfactory.js
var only_title_block_ngfactory = __webpack_require__(1485);

// EXTERNAL MODULE: ./src/core/block/components/pre-rendered-block/pre-rendered-block.ngfactory.js
var pre_rendered_block_ngfactory = __webpack_require__(1486);

// EXTERNAL MODULE: ./src/core/block/components/course-blocks/course-blocks.ngfactory.js
var course_blocks_ngfactory = __webpack_require__(1483);

// EXTERNAL MODULE: ./src/core/course/components/unsupported-module/unsupported-module.ngfactory.js
var unsupported_module_ngfactory = __webpack_require__(1484);

// EXTERNAL MODULE: ./src/core/course/components/tag-area/tag-area.ngfactory.js
var tag_area_ngfactory = __webpack_require__(1487);

// EXTERNAL MODULE: ./src/components/context-menu/context-menu-item.ngfactory.js
var context_menu_item_ngfactory = __webpack_require__(86);

// EXTERNAL MODULE: ./src/components/context-menu/context-menu-item.ts
var context_menu_item = __webpack_require__(78);

// EXTERNAL MODULE: ./src/components/context-menu/context-menu.ts
var context_menu = __webpack_require__(74);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.pipe.js
var translate_pipe = __webpack_require__(28);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.service.js
var translate_service = __webpack_require__(18);

// EXTERNAL MODULE: ./src/components/navbar-buttons/navbar-buttons.ngfactory.js
var navbar_buttons_ngfactory = __webpack_require__(95);

// EXTERNAL MODULE: ./src/components/navbar-buttons/navbar-buttons.ts
var navbar_buttons = __webpack_require__(87);

// EXTERNAL MODULE: ./src/providers/logger.ts
var logger = __webpack_require__(5);

// EXTERNAL MODULE: ./src/providers/utils/dom.ts
var dom = __webpack_require__(4);

// EXTERNAL MODULE: ./src/components/context-menu/context-menu.ngfactory.js
var context_menu_ngfactory = __webpack_require__(85);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/popover/popover-controller.js
var popover_controller = __webpack_require__(65);

// EXTERNAL MODULE: ./src/components/tabs/tab.ts
var tab = __webpack_require__(72);

// EXTERNAL MODULE: ./src/providers/utils/utils.ts
var utils = __webpack_require__(2);

// EXTERNAL MODULE: ./node_modules/@angular/common/esm5/common.js
var common = __webpack_require__(8);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.ngfactory.js
var content_ngfactory = __webpack_require__(176);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.js
var content = __webpack_require__(25);

// EXTERNAL MODULE: ./node_modules/ionic-angular/config/config.js
var config = __webpack_require__(7);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/platform.js + 1 modules
var platform = __webpack_require__(16);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/dom-controller.js
var dom_controller = __webpack_require__(33);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/app/app.js + 3 modules
var app = __webpack_require__(34);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/keyboard.js
var keyboard = __webpack_require__(101);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/view-controller.js
var view_controller = __webpack_require__(38);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-controller.js
var nav_controller = __webpack_require__(19);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/refresher/refresher.js
var refresher = __webpack_require__(151);

// EXTERNAL MODULE: ./node_modules/ionic-angular/gestures/gesture-controller.js
var gesture_controller = __webpack_require__(40);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/refresher/refresher-content.ngfactory.js
var refresher_content_ngfactory = __webpack_require__(207);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/refresher/refresher-content.js
var refresher_content = __webpack_require__(166);

// EXTERNAL MODULE: ./src/components/loading/loading.ngfactory.js
var loading_ngfactory = __webpack_require__(50);

// EXTERNAL MODULE: ./src/components/loading/loading.ts
var loading = __webpack_require__(47);

// EXTERNAL MODULE: ./src/providers/events.ts
var events = __webpack_require__(11);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/grid/row.js
var row = __webpack_require__(117);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.ngfactory.js
var button_ngfactory = __webpack_require__(45);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.js
var button_button = __webpack_require__(42);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/grid/col.js
var col = __webpack_require__(118);

// EXTERNAL MODULE: ./src/components/icon/icon.ngfactory.js
var icon_ngfactory = __webpack_require__(111);

// EXTERNAL MODULE: ./src/components/icon/icon.ts
var icon = __webpack_require__(94);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/icon/icon.js
var icon_icon = __webpack_require__(46);

// EXTERNAL MODULE: ./src/directives/external-content.ts
var external_content = __webpack_require__(223);

// EXTERNAL MODULE: ./src/providers/filepool.ts
var filepool = __webpack_require__(17);

// EXTERNAL MODULE: ./src/providers/sites.ts
var sites = __webpack_require__(1);

// EXTERNAL MODULE: ./src/providers/utils/url.ts
var url = __webpack_require__(23);

// EXTERNAL MODULE: ./src/providers/app.ts
var providers_app = __webpack_require__(9);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item.ngfactory.js + 1 modules
var item_ngfactory = __webpack_require__(30);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item.js
var item = __webpack_require__(21);

// EXTERNAL MODULE: ./node_modules/ionic-angular/util/form.js
var util_form = __webpack_require__(20);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-reorder.js + 1 modules
var item_reorder = __webpack_require__(27);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-content.js
var item_content = __webpack_require__(32);

// EXTERNAL MODULE: ./src/components/progress-bar/progress-bar.ngfactory.js
var progress_bar_ngfactory = __webpack_require__(483);

// EXTERNAL MODULE: ./src/components/progress-bar/progress-bar.ts
var progress_bar = __webpack_require__(314);

// EXTERNAL MODULE: ./node_modules/@angular/platform-browser/esm5/platform-browser.js
var platform_browser = __webpack_require__(79);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/list/list.js + 1 modules
var list = __webpack_require__(82);

// EXTERNAL MODULE: ./src/components/empty-box/empty-box.ngfactory.js
var empty_box_ngfactory = __webpack_require__(121);

// EXTERNAL MODULE: ./src/components/empty-box/empty-box.ts
var empty_box = __webpack_require__(110);

// EXTERNAL MODULE: ./src/components/dynamic-component/dynamic-component.ngfactory.js
var dynamic_component_ngfactory = __webpack_require__(712);

// EXTERNAL MODULE: ./src/components/dynamic-component/dynamic-component.ts
var dynamic_component = __webpack_require__(193);

// EXTERNAL MODULE: ./src/components/infinite-loading/infinite-loading.ngfactory.js
var infinite_loading_ngfactory = __webpack_require__(367);

// EXTERNAL MODULE: ./src/components/infinite-loading/infinite-loading.ts
var infinite_loading = __webpack_require__(270);

// EXTERNAL MODULE: ./src/directives/format-text.ts
var format_text = __webpack_require__(41);

// EXTERNAL MODULE: ./src/providers/utils/text.ts
var utils_text = __webpack_require__(10);

// EXTERNAL MODULE: ./src/core/contentlinks/providers/helper.ts
var helper = __webpack_require__(14);

// EXTERNAL MODULE: ./src/components/split-view/split-view.ts
var split_view = __webpack_require__(26);

// EXTERNAL MODULE: ./src/providers/utils/iframe.ts
var iframe = __webpack_require__(37);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-item.js
var toolbar_item = __webpack_require__(469);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar.js
var toolbar = __webpack_require__(267);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/navbar.js
var navbar = __webpack_require__(221);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-divider.js
var item_divider = __webpack_require__(93);

// EXTERNAL MODULE: ./src/core/course/components/module/module.ngfactory.js + 1 modules
var module_ngfactory = __webpack_require__(1498);

// EXTERNAL MODULE: ./src/core/course/components/module/module.ts
var module_module = __webpack_require__(478);

// EXTERNAL MODULE: ./src/core/course/providers/module-prefetch-delegate.ts
var module_prefetch_delegate = __webpack_require__(48);

// EXTERNAL MODULE: ./src/core/course/providers/helper.ts
var providers_helper = __webpack_require__(36);

// EXTERNAL MODULE: ./src/core/course/providers/course.ts
var course = __webpack_require__(13);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/badge/badge.js
var badge = __webpack_require__(152);

// EXTERNAL MODULE: ./src/components/download-refresh/download-refresh.ngfactory.js
var download_refresh_ngfactory = __webpack_require__(756);

// EXTERNAL MODULE: ./src/components/download-refresh/download-refresh.ts
var download_refresh = __webpack_require__(389);

// EXTERNAL MODULE: ./src/core/block/components/course-blocks/course-blocks.ts
var course_blocks = __webpack_require__(379);

// EXTERNAL MODULE: ./src/core/block/providers/helper.ts
var block_providers_helper = __webpack_require__(380);

// EXTERNAL MODULE: ./src/core/course/components/format/format.ts
var format = __webpack_require__(491);

// EXTERNAL MODULE: ./src/core/course/providers/format-delegate.ts
var format_delegate = __webpack_require__(173);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/modal/modal-controller.js
var modal_controller = __webpack_require__(178);

// CONCATENATED MODULE: ./src/core/course/components/format/format.ngfactory.js
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 














































































var styles_CoreCourseFormatComponent = [];
var RenderType_CoreCourseFormatComponent = core["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_CoreCourseFormatComponent, data: {} });

function View_CoreCourseFormatComponent_1(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 11, "core-navbar-buttons", [["end", ""]], null, null, null, navbar_buttons_ngfactory["b" /* View_CoreNavBarButtonsComponent_0 */], navbar_buttons_ngfactory["a" /* RenderType_CoreNavBarButtonsComponent */])), core["_30" /* ɵdid */](1, 245760, null, 1, navbar_buttons["a" /* CoreNavBarButtonsComponent */], [core["t" /* ElementRef */], logger["a" /* CoreLoggerProvider */], dom["a" /* CoreDomUtilsProvider */]], null, null), core["_52" /* ɵqud */](603979776, 3, { buttons: 1 }), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n    "])), (_l()(), core["_31" /* ɵeld */](4, 0, null, 0, 6, "core-context-menu", [], null, null, null, context_menu_ngfactory["b" /* View_CoreContextMenuComponent_0 */], context_menu_ngfactory["a" /* RenderType_CoreContextMenuComponent */])), core["_30" /* ɵdid */](5, 245760, null, 0, context_menu["a" /* CoreContextMenuComponent */], [translate_service["a" /* TranslateService */], popover_controller["a" /* PopoverController */], core["t" /* ElementRef */], dom["a" /* CoreDomUtilsProvider */], [2, tab["a" /* CoreTabComponent */]], utils["a" /* CoreUtilsProvider */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 0, 2, "core-context-menu-item", [["iconAction", "menu"]], null, [[null, "action"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("action" === en)) {
        var pd_0 = (_co.showSectionSelector($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, context_menu_item_ngfactory["b" /* View_CoreContextMenuItemComponent_0 */], context_menu_item_ngfactory["a" /* RenderType_CoreContextMenuItemComponent */])), core["_30" /* ɵdid */](8, 770048, null, 0, context_menu_item["a" /* CoreContextMenuItemComponent */], [context_menu["a" /* CoreContextMenuComponent */]], { content: [0, "content"], iconAction: [1, "iconAction"], priority: [2, "priority"], hidden: [3, "hidden"] }, { action: "action" }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n"]))], function (_ck, _v) { var _co = _v.component; _ck(_v, 1, 0); _ck(_v, 5, 0); var currVal_0 = core["_56" /* ɵunv */](_v, 8, 0, core["_44" /* ɵnov */](_v, 9).transform("core.course.sections")); var currVal_1 = "menu"; var currVal_2 = 500; var currVal_3 = ((!_co.displaySectionSelector || !_co.sections) || !_co.sections.length); _ck(_v, 8, 0, currVal_0, currVal_1, currVal_2, currVal_3); }, null); }
function View_CoreCourseFormatComponent_3(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 0, null, null, null, null, null, null, null))], null, null); }
function View_CoreCourseFormatComponent_2(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 23, "div", [["class", "safe-padding-horizontal row"], ["ion-row", ""], ["justify-content-between", ""], ["padding", ""], ["text-wrap", ""]], [[2, "core-section-download", null]], null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, row["a" /* Row */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 14, "button", [["aria-controls", "core-course-section-selector"], ["aria-haspopup", "true"], ["class", "core-button-select button-no-uppercase col"], ["color", "light"], ["float-start", ""], ["icon-end", ""], ["icon-start", ""], ["id", "core-course-section-button"], ["ion-button", ""], ["ion-col", ""]], [[1, "aria-label", 0], [1, "aria-expanded", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.showSectionSelector($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](4, 1097728, null, 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { color: [0, "color"] }, null), core["_30" /* ɵdid */](5, 16384, null, 0, col["a" /* Col */], [], null, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                            "])), (_l()(), core["_31" /* ɵeld */](8, 0, null, 0, 1, "core-icon", [["name", "fa-folder"]], null, null, null, icon_ngfactory["b" /* View_CoreIconComponent_0 */], icon_ngfactory["a" /* RenderType_CoreIconComponent */])), core["_30" /* ɵdid */](9, 704512, null, 0, icon["a" /* CoreIconComponent */], [core["t" /* ElementRef */], config["a" /* Config */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                            "])), (_l()(), core["_31" /* ɵeld */](11, 0, null, 0, 2, "span", [["class", "core-section-selector-text"]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](12, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                            "])), (_l()(), core["_31" /* ɵeld */](15, 0, null, 0, 1, "ion-icon", [["ios", "md-arrow-dropdown"], ["name", "arrow-dropdown"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](16, 147456, null, 0, icon_icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"], ios: [1, "ios"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                        "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 2, null, View_CoreCourseFormatComponent_3)), core["_30" /* ɵdid */](21, 540672, null, 0, common["r" /* NgTemplateOutlet */], [core["_11" /* ViewContainerRef */]], { ngTemplateOutletContext: [0, "ngTemplateOutletContext"], ngTemplateOutlet: [1, "ngTemplateOutlet"] }, null), core["_48" /* ɵpod */](22, { section: 0 }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "]))], function (_ck, _v) { var _co = _v.component; var currVal_3 = "light"; _ck(_v, 4, 0, currVal_3); var currVal_4 = "fa-folder"; _ck(_v, 9, 0, currVal_4); var currVal_7 = "arrow-dropdown"; var currVal_8 = "md-arrow-dropdown"; _ck(_v, 16, 0, currVal_7, currVal_8); var currVal_9 = _ck(_v, 22, 0, _co.selectedSection); var currVal_10 = core["_44" /* ɵnov */](_v.parent, 54); _ck(_v, 21, 0, currVal_9, currVal_10); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.downloadEnabled; _ck(_v, 0, 0, currVal_0); var currVal_1 = ((core["_56" /* ɵunv */](_v, 3, 0, core["_44" /* ɵnov */](_v, 6).transform("core.course.sections")) + ": ") + (_co.selectedSection && (_co.selectedSection.formattedName || _co.selectedSection.name))); var currVal_2 = _co.sectionSelectorExpanded; _ck(_v, 3, 0, currVal_1, currVal_2); var currVal_5 = core["_56" /* ɵunv */](_v, 12, 0, core["_44" /* ɵnov */](_v, 13).transform(((_co.selectedSection && (_co.selectedSection.formattedName || _co.selectedSection.name)) || "core.course.sections"))); _ck(_v, 12, 0, currVal_5); var currVal_6 = core["_44" /* ɵnov */](_v, 16)._hidden; _ck(_v, 15, 0, currVal_6); }); }
function View_CoreCourseFormatComponent_5(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 4, "div", [["class", "core-course-thumb"]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                            "])), (_l()(), core["_31" /* ɵeld */](2, 0, null, null, 1, "img", [["alt", ""], ["core-external-content", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](3, 4734976, null, 0, external_content["a" /* CoreExternalContentDirective */], [core["t" /* ElementRef */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], platform["a" /* Platform */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], providers_app["a" /* CoreAppProvider */], utils["a" /* CoreUtilsProvider */]], { src: [0, "src"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.course.imageThumb; _ck(_v, 3, 0, currVal_0); }, null); }
function View_CoreCourseFormatComponent_6(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 9, "ion-item", [["class", "core-course-progress item item-block"]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 4, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 5, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 6, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                            "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 2, 1, "core-progress-bar", [], null, null, null, progress_bar_ngfactory["b" /* View_CoreProgressBarComponent_0 */], progress_bar_ngfactory["a" /* RenderType_CoreProgressBarComponent */])), core["_30" /* ɵdid */](8, 573440, null, 0, progress_bar["a" /* CoreProgressBarComponent */], [platform_browser["c" /* DomSanitizer */]], { progress: [0, "progress"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                        "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.course.progress; _ck(_v, 8, 0, currVal_0); }, null); }
function View_CoreCourseFormatComponent_4(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 8, "ion-list", [["class", "core-format-progress-list"], ["no-lines", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, list["a" /* List */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], platform["a" /* Platform */], gesture_controller["l" /* GestureController */], dom_controller["a" /* DomController */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreCourseFormatComponent_5)), core["_30" /* ɵdid */](4, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreCourseFormatComponent_6)), core["_30" /* ɵdid */](7, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.course.imageThumb; _ck(_v, 4, 0, currVal_0); var currVal_1 = ((((_co.selectedSection && (_co.selectedSection.id == _co.allSectionsId)) && (_co.course.progress != null)) && (_co.course.progress >= 0)) && (_co.course.completionusertracked !== false)); _ck(_v, 7, 0, currVal_1); }, null); }
function View_CoreCourseFormatComponent_8(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 0, null, null, null, null, null, null, null))], null, null); }
function View_CoreCourseFormatComponent_9(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "core-empty-box", [["icon", "qr-scanner"]], null, null, null, empty_box_ngfactory["b" /* View_CoreEmptyBoxComponent_0 */], empty_box_ngfactory["a" /* RenderType_CoreEmptyBoxComponent */])), core["_30" /* ɵdid */](1, 49152, null, 0, empty_box["a" /* CoreEmptyBoxComponent */], [], { message: [0, "message"], icon: [1, "icon"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 1, 0, core["_44" /* ɵnov */](_v, 2).transform("core.course.nocontentavailable")); var currVal_1 = "qr-scanner"; _ck(_v, 1, 0, currVal_0, currVal_1); }, null); }
function View_CoreCourseFormatComponent_7(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 12, "div", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](2, 0, null, null, 9, "core-dynamic-component", [], null, null, null, dynamic_component_ngfactory["b" /* View_CoreDynamicComponent_0 */], dynamic_component_ngfactory["a" /* RenderType_CoreDynamicComponent */])), core["_30" /* ɵdid */](3, 901120, [[1, 4]], 0, dynamic_component["a" /* CoreDynamicComponent */], [logger["a" /* CoreLoggerProvider */], core["o" /* ComponentFactoryResolver */], core["F" /* KeyValueDiffers */], [2, nav_controller["a" /* NavController */]], core["j" /* ChangeDetectorRef */], core["t" /* ElementRef */], dom["a" /* CoreDomUtilsProvider */]], { component: [0, "component"], data: [1, "data"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 2, null, View_CoreCourseFormatComponent_8)), core["_30" /* ɵdid */](6, 540672, null, 0, common["r" /* NgTemplateOutlet */], [core["_11" /* ViewContainerRef */]], { ngTemplateOutletContext: [0, "ngTemplateOutletContext"], ngTemplateOutlet: [1, "ngTemplateOutlet"] }, null), core["_48" /* ɵpod */](7, { section: 0 }), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_CoreCourseFormatComponent_9)), core["_30" /* ɵdid */](10, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.singleSectionComponent; var currVal_1 = _co.data; _ck(_v, 3, 0, currVal_0, currVal_1); var currVal_2 = _ck(_v, 7, 0, _co.selectedSection); var currVal_3 = core["_44" /* ɵnov */](_v.parent, 51); _ck(_v, 6, 0, currVal_2, currVal_3); var currVal_4 = !_co.selectedSection.hasContent; _ck(_v, 10, 0, currVal_4); }, null); }
function View_CoreCourseFormatComponent_13(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 0, null, null, null, null, null, null, null))], null, null); }
function View_CoreCourseFormatComponent_12(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 5, null, null, null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 2, null, View_CoreCourseFormatComponent_13)), core["_30" /* ɵdid */](3, 540672, null, 0, common["r" /* NgTemplateOutlet */], [core["_11" /* ViewContainerRef */]], { ngTemplateOutletContext: [0, "ngTemplateOutletContext"], ngTemplateOutlet: [1, "ngTemplateOutlet"] }, null), core["_48" /* ɵpod */](4, { section: 0 }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                            "]))], function (_ck, _v) { var currVal_0 = _ck(_v, 4, 0, _v.parent.context.$implicit); var currVal_1 = core["_44" /* ɵnov */](_v.parent.parent.parent, 51); _ck(_v, 3, 0, currVal_0, currVal_1); }, null); }
function View_CoreCourseFormatComponent_11(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 4, null, null, null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreCourseFormatComponent_12)), core["_30" /* ɵdid */](3, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = (_v.context.index <= _co.showSectionId); _ck(_v, 3, 0, currVal_0); }, null); }
function View_CoreCourseFormatComponent_10(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 11, "div", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](2, 0, null, null, 5, "core-dynamic-component", [], null, null, null, dynamic_component_ngfactory["b" /* View_CoreDynamicComponent_0 */], dynamic_component_ngfactory["a" /* RenderType_CoreDynamicComponent */])), core["_30" /* ɵdid */](3, 901120, [[1, 4]], 0, dynamic_component["a" /* CoreDynamicComponent */], [logger["a" /* CoreLoggerProvider */], core["o" /* ComponentFactoryResolver */], core["F" /* KeyValueDiffers */], [2, nav_controller["a" /* NavController */]], core["j" /* ChangeDetectorRef */], core["t" /* ElementRef */], dom["a" /* CoreDomUtilsProvider */]], { component: [0, "component"], data: [1, "data"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_CoreCourseFormatComponent_11)), core["_30" /* ɵdid */](6, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n                    "])), (_l()(), core["_31" /* ɵeld */](9, 0, null, null, 1, "core-infinite-loading", [], null, [[null, "action"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("action" === en)) {
        var pd_0 = (_co.showMoreActivities($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, infinite_loading_ngfactory["b" /* View_CoreInfiniteLoadingComponent_0 */], infinite_loading_ngfactory["a" /* RenderType_CoreInfiniteLoadingComponent */])), core["_30" /* ɵdid */](10, 573440, null, 0, infinite_loading["a" /* CoreInfiniteLoadingComponent */], [[2, content["a" /* Content */]], dom["a" /* CoreDomUtilsProvider */]], { enabled: [0, "enabled"] }, { action: "action" }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.allSectionsComponent; var currVal_1 = _co.data; _ck(_v, 3, 0, currVal_0, currVal_1); var currVal_2 = _co.sections; _ck(_v, 6, 0, currVal_2); var currVal_3 = _co.canLoadMore; _ck(_v, 10, 0, currVal_3); }, null); }
function View_CoreCourseFormatComponent_15(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 9, "button", [["color", "light"], ["icon-only", ""], ["ion-button", ""]], [[8, "title", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.sectionChanged(_co.previousSection) !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](1, 1097728, [[7, 4]], 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { color: [0, "color"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](4, 0, null, 0, 1, "ion-icon", [["md", "ios-arrow-back"], ["name", "arrow-back"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](5, 147456, null, 0, icon_icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"], md: [1, "md"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 0, 1, "core-format-text", [["class", "accesshide"]], null, null, null, null, null)), core["_30" /* ɵdid */](8, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform["a" /* Platform */], utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], providers_app["a" /* CoreAppProvider */], helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */]], { text: [0, "text"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                "]))], function (_ck, _v) { var _co = _v.component; var currVal_1 = "light"; _ck(_v, 1, 0, currVal_1); var currVal_3 = "arrow-back"; var currVal_4 = "ios-arrow-back"; _ck(_v, 5, 0, currVal_3, currVal_4); var currVal_5 = (_co.previousSection.formattedName || _co.previousSection.name); _ck(_v, 8, 0, currVal_5); }, function (_ck, _v) { var currVal_0 = core["_34" /* ɵinlineInterpolate */](1, "", core["_56" /* ɵunv */](_v, 0, 0, core["_44" /* ɵnov */](_v, 2).transform("core.previous")), ""); _ck(_v, 0, 0, currVal_0); var currVal_2 = core["_44" /* ɵnov */](_v, 5)._hidden; _ck(_v, 4, 0, currVal_2); }); }
function View_CoreCourseFormatComponent_16(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 9, "button", [["icon-only", ""], ["ion-button", ""]], [[8, "title", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.sectionChanged(_co.nextSection) !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](1, 1097728, [[7, 4]], 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](4, 0, null, 0, 1, "core-format-text", [["class", "accesshide"]], null, null, null, null, null)), core["_30" /* ɵdid */](5, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform["a" /* Platform */], utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], providers_app["a" /* CoreAppProvider */], helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */]], { text: [0, "text"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 0, 1, "ion-icon", [["md", "ios-arrow-forward"], ["name", "arrow-forward"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](8, 147456, null, 0, icon_icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"], md: [1, "md"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                "]))], function (_ck, _v) { var _co = _v.component; var currVal_1 = (_co.nextSection.formattedName || _co.nextSection.name); _ck(_v, 5, 0, currVal_1); var currVal_3 = "arrow-forward"; var currVal_4 = "ios-arrow-forward"; _ck(_v, 8, 0, currVal_3, currVal_4); }, function (_ck, _v) { var currVal_0 = core["_34" /* ɵinlineInterpolate */](1, "", core["_56" /* ɵunv */](_v, 0, 0, core["_44" /* ɵnov */](_v, 2).transform("core.next")), ""); _ck(_v, 0, 0, currVal_0); var currVal_2 = core["_44" /* ɵnov */](_v, 8)._hidden; _ck(_v, 7, 0, currVal_2); }); }
function View_CoreCourseFormatComponent_14(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 9, "ion-buttons", [["class", "core-course-section-nav-buttons"], ["end", ""], ["padding", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 1, toolbar_item["a" /* ToolbarItem */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), core["_52" /* ɵqud */](603979776, 7, { _buttons: 1 }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreCourseFormatComponent_15)), core["_30" /* ɵdid */](5, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreCourseFormatComponent_16)), core["_30" /* ɵdid */](8, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.previousSection; _ck(_v, 5, 0, currVal_0); var currVal_1 = _co.nextSection; _ck(_v, 8, 0, currVal_1); }, null); }
function View_CoreCourseFormatComponent_20(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 0, null, null, null, null, null, null, null))], null, null); }
function View_CoreCourseFormatComponent_19(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 14, "ion-item-divider", [["class", "item item-divider"], ["color", "light"], ["text-wrap", ""]], [[2, "core-section-download", null]], null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], { color: [0, "color"] }, null), core["_52" /* ɵqud */](335544320, 8, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 9, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 10, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_divider["a" /* ItemDivider */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { color: [0, "color"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 2, 1, "core-format-text", [], null, null, null, null, null)), core["_30" /* ɵdid */](8, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform["a" /* Platform */], utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], providers_app["a" /* CoreAppProvider */], helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */]], { text: [0, "text"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, 2, 2, null, View_CoreCourseFormatComponent_20)), core["_30" /* ɵdid */](12, 540672, null, 0, common["r" /* NgTemplateOutlet */], [core["_11" /* ViewContainerRef */]], { ngTemplateOutletContext: [0, "ngTemplateOutletContext"], ngTemplateOutlet: [1, "ngTemplateOutlet"] }, null), core["_48" /* ɵpod */](13, { section: 0 }), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n        "]))], function (_ck, _v) { var currVal_1 = "light"; _ck(_v, 1, 0, currVal_1); var currVal_2 = "light"; _ck(_v, 5, 0, currVal_2); var currVal_3 = _v.parent.parent.context.section.name; _ck(_v, 8, 0, currVal_3); var currVal_4 = _ck(_v, 13, 0, _v.parent.parent.context.section); var currVal_5 = core["_44" /* ɵnov */](_v.parent.parent.parent, 54); _ck(_v, 12, 0, currVal_4, currVal_5); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.downloadEnabled; _ck(_v, 0, 0, currVal_0); }); }
function View_CoreCourseFormatComponent_21(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 9, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 11, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 12, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 13, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 2, 1, "core-format-text", [], null, null, null, null, null)), core["_30" /* ɵdid */](8, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform["a" /* Platform */], utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], providers_app["a" /* CoreAppProvider */], helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */]], { text: [0, "text"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n        "]))], function (_ck, _v) { var currVal_0 = _v.parent.parent.context.section.summary; _ck(_v, 8, 0, currVal_0); }, null); }
function View_CoreCourseFormatComponent_23(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "core-course-module", [], null, [[null, "completionChanged"], [null, "statusChanged"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("completionChanged" === en)) {
        var pd_0 = (_co.onCompletionChange($event) !== false);
        ad = (pd_0 && ad);
    } if (("statusChanged" === en)) {
        var pd_1 = (_co.onModuleStatusChange($event) !== false);
        ad = (pd_1 && ad);
    } return ad; }, module_ngfactory["b" /* View_CoreCourseModuleComponent_0 */], module_ngfactory["a" /* RenderType_CoreCourseModuleComponent */])), core["_30" /* ɵdid */](1, 245760, null, 0, module_module["a" /* CoreCourseModuleComponent */], [[2, nav_controller["a" /* NavController */]], module_prefetch_delegate["a" /* CoreCourseModulePrefetchDelegate */], dom["a" /* CoreDomUtilsProvider */], providers_helper["a" /* CoreCourseHelperProvider */], events["a" /* CoreEventsProvider */], sites["a" /* CoreSitesProvider */], course["a" /* CoreCourseProvider */]], { module: [0, "module"], courseId: [1, "courseId"], section: [2, "section"], enabled: [3, "enabled"] }, { completionChanged: "completionChanged", statusChanged: "statusChanged" })], function (_ck, _v) { var _co = _v.component; var currVal_0 = _v.parent.context.$implicit; var currVal_1 = _co.course.id; var currVal_2 = _v.parent.parent.parent.context.section; var currVal_3 = _co.downloadEnabled; _ck(_v, 1, 0, currVal_0, currVal_1, currVal_2, currVal_3); }, null); }
function View_CoreCourseFormatComponent_22(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 4, null, null, null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreCourseFormatComponent_23)), core["_30" /* ɵdid */](3, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "]))], function (_ck, _v) { var currVal_0 = (_v.context.$implicit.visibleoncoursepage !== 0); _ck(_v, 3, 0, currVal_0); }, null); }
function View_CoreCourseFormatComponent_18(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 11, "section", [["ion-list", ""]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreCourseFormatComponent_19)), core["_30" /* ɵdid */](4, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreCourseFormatComponent_21)), core["_30" /* ɵdid */](7, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreCourseFormatComponent_22)), core["_30" /* ɵdid */](10, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = ((_co.selectedSection.id == _co.allSectionsId) && _v.parent.context.section.name); _ck(_v, 4, 0, currVal_0); var currVal_1 = _v.parent.context.section.summary; _ck(_v, 7, 0, currVal_1); var currVal_2 = _v.parent.context.section.modules; _ck(_v, 10, 0, currVal_2); }, null); }
function View_CoreCourseFormatComponent_17(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreCourseFormatComponent_18)), core["_30" /* ɵdid */](2, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = ((!_v.context.section.hiddenbynumsections && (_v.context.section.id != _co.allSectionsId)) && (_v.context.section.id != _co.stealthModulesSectionId)); _ck(_v, 2, 0, currVal_0); }, null); }
function View_CoreCourseFormatComponent_26(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "ion-badge", [["class", "core-course-download-section-progress"]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, badge["a" /* Badge */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](2, null, ["", " / ", ""]))], null, function (_ck, _v) { var currVal_0 = _v.parent.parent.context.section.count; var currVal_1 = _v.parent.parent.context.section.total; _ck(_v, 2, 0, currVal_0, currVal_1); }); }
function View_CoreCourseFormatComponent_25(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 8, "div", [["class", "core-button-spinner"], ["float-end", ""]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreCourseFormatComponent_26)), core["_30" /* ɵdid */](4, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n        "])), (_l()(), core["_31" /* ɵeld */](6, 0, null, null, 1, "core-download-refresh", [], null, [[null, "action"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("action" === en)) {
        var pd_0 = (_co.prefetch(_v.parent.context.section, $event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, download_refresh_ngfactory["b" /* View_CoreDownloadRefreshComponent_0 */], download_refresh_ngfactory["a" /* RenderType_CoreDownloadRefreshComponent */])), core["_30" /* ɵdid */](7, 49152, null, 0, download_refresh["a" /* CoreDownloadRefreshComponent */], [], { status: [0, "status"], enabled: [1, "enabled"], loading: [2, "loading"], canTrustDownload: [3, "canTrustDownload"] }, { action: "action" }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = ((_v.parent.context.section.isDownloading && (_v.parent.context.section.total > 0)) && (_v.parent.context.section.count < _v.parent.context.section.total)); _ck(_v, 4, 0, currVal_0); var currVal_1 = _v.parent.context.section.downloadStatus; var currVal_2 = _co.downloadEnabled; var currVal_3 = (_v.parent.context.section.isDownloading || _v.parent.context.section.isCalculating); var currVal_4 = _v.parent.context.section.canCheckUpdates; _ck(_v, 7, 0, currVal_1, currVal_2, currVal_3, currVal_4); }, null); }
function View_CoreCourseFormatComponent_24(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreCourseFormatComponent_25)), core["_30" /* ɵdid */](2, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = (_v.context.section && _co.downloadEnabled); _ck(_v, 2, 0, currVal_0); }, null); }
function View_CoreCourseFormatComponent_0(_l) { return core["_57" /* ɵvid */](0, [core["_52" /* ɵqud */](671088640, 1, { dynamicComponents: 1 }), core["_52" /* ɵqud */](402653184, 2, { courseBlocksComponent: 0 }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreCourseFormatComponent_1)), core["_30" /* ɵdid */](4, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n"])), (_l()(), core["_31" /* ɵeld */](6, 0, null, null, 42, "core-block-course-blocks", [], null, null, null, course_blocks_ngfactory["c" /* View_CoreBlockCourseBlocksComponent_0 */], course_blocks_ngfactory["b" /* RenderType_CoreBlockCourseBlocksComponent */])), core["_30" /* ɵdid */](7, 114688, [[2, 4]], 0, course_blocks["a" /* CoreBlockCourseBlocksComponent */], [dom["a" /* CoreDomUtilsProvider */], course["a" /* CoreCourseProvider */], block_providers_helper["a" /* CoreBlockHelperProvider */], core["t" /* ElementRef */], [2, content["a" /* Content */]]], { courseId: [0, "courseId"], hideBlocks: [1, "hideBlocks"], downloadEnabled: [2, "downloadEnabled"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n    "])), (_l()(), core["_31" /* ɵeld */](9, 0, null, 0, 38, "ion-content", [], [[2, "statusbar-padding", null], [2, "has-refresher", null]], null, null, content_ngfactory["b" /* View_Content_0 */], content_ngfactory["a" /* RenderType_Content */])), core["_30" /* ɵdid */](10, 4374528, null, 0, content["a" /* Content */], [config["a" /* Config */], platform["a" /* Platform */], dom_controller["a" /* DomController */], core["t" /* ElementRef */], core["V" /* Renderer */], app["a" /* App */], keyboard["a" /* Keyboard */], core["M" /* NgZone */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n        "])), (_l()(), core["_31" /* ɵeld */](13, 0, null, 1, 33, "core-dynamic-component", [], null, null, null, dynamic_component_ngfactory["b" /* View_CoreDynamicComponent_0 */], dynamic_component_ngfactory["a" /* RenderType_CoreDynamicComponent */])), core["_30" /* ɵdid */](14, 901120, [[1, 4]], 0, dynamic_component["a" /* CoreDynamicComponent */], [logger["a" /* CoreLoggerProvider */], core["o" /* ComponentFactoryResolver */], core["F" /* KeyValueDiffers */], [2, nav_controller["a" /* NavController */]], core["j" /* ChangeDetectorRef */], core["t" /* ElementRef */], dom["a" /* CoreDomUtilsProvider */]], { component: [0, "component"], data: [1, "data"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n            "])), (_l()(), core["_31" /* ɵeld */](16, 0, null, 0, 26, "core-loading", [], null, null, null, loading_ngfactory["b" /* View_CoreLoadingComponent_0 */], loading_ngfactory["a" /* RenderType_CoreLoadingComponent */])), core["_30" /* ɵdid */](17, 638976, null, 0, loading["a" /* CoreLoadingComponent */], [translate_service["a" /* TranslateService */], core["t" /* ElementRef */], events["a" /* CoreEventsProvider */], utils["a" /* CoreUtilsProvider */]], { hideUntil: [0, "hideUntil"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                "])), (_l()(), core["_31" /* ɵeld */](20, 0, null, 0, 5, "core-dynamic-component", [], null, null, null, dynamic_component_ngfactory["b" /* View_CoreDynamicComponent_0 */], dynamic_component_ngfactory["a" /* RenderType_CoreDynamicComponent */])), core["_30" /* ɵdid */](21, 901120, [[1, 4]], 0, dynamic_component["a" /* CoreDynamicComponent */], [logger["a" /* CoreLoggerProvider */], core["o" /* ComponentFactoryResolver */], core["F" /* KeyValueDiffers */], [2, nav_controller["a" /* NavController */]], core["j" /* ChangeDetectorRef */], core["t" /* ElementRef */], dom["a" /* CoreDomUtilsProvider */]], { component: [0, "component"], data: [1, "data"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_CoreCourseFormatComponent_2)), core["_30" /* ɵdid */](24, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n\n                "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                "])), (_l()(), core["_31" /* ɵeld */](28, 0, null, 0, 5, "core-dynamic-component", [], null, null, null, dynamic_component_ngfactory["b" /* View_CoreDynamicComponent_0 */], dynamic_component_ngfactory["a" /* RenderType_CoreDynamicComponent */])), core["_30" /* ɵdid */](29, 901120, [[1, 4]], 0, dynamic_component["a" /* CoreDynamicComponent */], [logger["a" /* CoreLoggerProvider */], core["o" /* ComponentFactoryResolver */], core["F" /* KeyValueDiffers */], [2, nav_controller["a" /* NavController */]], core["j" /* ChangeDetectorRef */], core["t" /* ElementRef */], dom["a" /* CoreDomUtilsProvider */]], { component: [0, "component"], data: [1, "data"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_CoreCourseFormatComponent_4)), core["_30" /* ɵdid */](32, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n\n                "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_CoreCourseFormatComponent_7)), core["_30" /* ɵdid */](37, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n\n                "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_CoreCourseFormatComponent_10)), core["_30" /* ɵdid */](41, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_CoreCourseFormatComponent_14)), core["_30" /* ɵdid */](45, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n\n        "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_26" /* ɵand */](0, [["sectionTemplate", 2]], null, 0, null, View_CoreCourseFormatComponent_17)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_26" /* ɵand */](0, [["sectionDownloadTemplate", 2]], null, 0, null, View_CoreCourseFormatComponent_24)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.loaded; _ck(_v, 4, 0, currVal_0); var currVal_1 = _co.course.id; var currVal_2 = ((_co.selectedSection && (_co.selectedSection.id == _co.allSectionsId)) && _co.canLoadMore); var currVal_3 = _co.downloadEnabled; _ck(_v, 7, 0, currVal_1, currVal_2, currVal_3); var currVal_6 = _co.courseFormatComponent; var currVal_7 = _co.data; _ck(_v, 14, 0, currVal_6, currVal_7); var currVal_8 = _co.loaded; _ck(_v, 17, 0, currVal_8); var currVal_9 = _co.sectionSelectorComponent; var currVal_10 = _co.data; _ck(_v, 21, 0, currVal_9, currVal_10); var currVal_11 = ((_co.displaySectionSelector && _co.sections) && _co.sections.length); _ck(_v, 24, 0, currVal_11); var currVal_12 = _co.courseSummaryComponent; var currVal_13 = _co.data; _ck(_v, 29, 0, currVal_12, currVal_13); var currVal_14 = (_co.course.imageThumb || (((_co.selectedSection && (_co.selectedSection.id == _co.allSectionsId)) && (_co.course.progress != null)) && (_co.course.progress >= 0))); _ck(_v, 32, 0, currVal_14); var currVal_15 = (_co.selectedSection && (_co.selectedSection.id != _co.allSectionsId)); _ck(_v, 37, 0, currVal_15); var currVal_16 = (_co.selectedSection && (_co.selectedSection.id == _co.allSectionsId)); _ck(_v, 41, 0, currVal_16); var currVal_17 = ((_co.displaySectionSelector && _co.sections) && _co.sections.length); _ck(_v, 45, 0, currVal_17); }, function (_ck, _v) { var currVal_4 = core["_44" /* ɵnov */](_v, 10).statusbarPadding; var currVal_5 = core["_44" /* ɵnov */](_v, 10)._hasRefresher; _ck(_v, 9, 0, currVal_4, currVal_5); }); }
function View_CoreCourseFormatComponent_Host_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "core-course-format", [], null, null, null, View_CoreCourseFormatComponent_0, RenderType_CoreCourseFormatComponent)), core["_30" /* ɵdid */](1, 770048, null, 0, format["a" /* CoreCourseFormatComponent */], [format_delegate["a" /* CoreCourseFormatDelegate */], translate_service["a" /* TranslateService */], core["C" /* Injector */], providers_helper["a" /* CoreCourseHelperProvider */], dom["a" /* CoreDomUtilsProvider */], events["a" /* CoreEventsProvider */], sites["a" /* CoreSitesProvider */], content["a" /* Content */], module_prefetch_delegate["a" /* CoreCourseModulePrefetchDelegate */], modal_controller["a" /* ModalController */], course["a" /* CoreCourseProvider */]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var CoreCourseFormatComponentNgFactory = core["_27" /* ɵccf */]("core-course-format", format["a" /* CoreCourseFormatComponent */], View_CoreCourseFormatComponent_Host_0, { course: "course", sections: "sections", downloadEnabled: "downloadEnabled", initialSectionId: "initialSectionId", initialSectionNumber: "initialSectionNumber", moduleId: "moduleId" }, { completionChanged: "completionChanged" }, []);

//# sourceMappingURL=format.ngfactory.js.map
// EXTERNAL MODULE: ./src/components/tabs/tab.ngfactory.js
var tab_ngfactory = __webpack_require__(476);

// EXTERNAL MODULE: ./src/components/tabs/tabs.ts
var tabs = __webpack_require__(170);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-header.js
var toolbar_header = __webpack_require__(468);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/navbar.ngfactory.js
var navbar_ngfactory = __webpack_require__(1477);

// EXTERNAL MODULE: ./src/directives/back-button.ts
var back_button = __webpack_require__(711);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.ngfactory.js
var toolbar_title_ngfactory = __webpack_require__(1478);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.js
var toolbar_title = __webpack_require__(364);

// EXTERNAL MODULE: ./src/components/tabs/tabs.ngfactory.js
var tabs_ngfactory = __webpack_require__(475);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-params.js
var nav_params = __webpack_require__(70);

// EXTERNAL MODULE: ./src/core/course/providers/options-delegate.ts
var options_delegate = __webpack_require__(96);

// EXTERNAL MODULE: ./src/core/courses/providers/courses.ts
var courses = __webpack_require__(51);

// EXTERNAL MODULE: ./src/core/course/providers/sync.ts
var sync = __webpack_require__(392);

// CONCATENATED MODULE: ./src/core/course/pages/section/section.ngfactory.js
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 

































































var styles_CoreCourseSectionPage = [];
var RenderType_CoreCourseSectionPage = core["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_CoreCourseSectionPage, data: {} });

function View_CoreCourseSectionPage_2(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "core-context-menu-item", [], null, [[null, "action"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("action" === en)) {
        var pd_0 = (_co.toggleDownload() !== false);
        ad = (pd_0 && ad);
    } return ad; }, context_menu_item_ngfactory["b" /* View_CoreContextMenuItemComponent_0 */], context_menu_item_ngfactory["a" /* RenderType_CoreContextMenuItemComponent */])), core["_30" /* ɵdid */](1, 770048, null, 0, context_menu_item["a" /* CoreContextMenuItemComponent */], [context_menu["a" /* CoreContextMenuComponent */]], { content: [0, "content"], iconAction: [1, "iconAction"], priority: [2, "priority"] }, { action: "action" }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], function (_ck, _v) { var _co = _v.component; var currVal_0 = core["_56" /* ɵunv */](_v, 1, 0, core["_44" /* ɵnov */](_v, 2).transform("core.settings.showdownloadoptions")); var currVal_1 = _co.downloadEnabledIcon; var currVal_2 = 2000; _ck(_v, 1, 0, currVal_0, currVal_1, currVal_2); }, null); }
function View_CoreCourseSectionPage_3(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "core-context-menu-item", [], [[8, "className", 0]], [[null, "action"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("action" === en)) {
        var pd_0 = (_co.openMenuItem(_v.context.$implicit) !== false);
        ad = (pd_0 && ad);
    } return ad; }, context_menu_item_ngfactory["b" /* View_CoreContextMenuItemComponent_0 */], context_menu_item_ngfactory["a" /* RenderType_CoreContextMenuItemComponent */])), core["_30" /* ɵdid */](1, 770048, null, 0, context_menu_item["a" /* CoreContextMenuItemComponent */], [context_menu["a" /* CoreContextMenuComponent */]], { content: [0, "content"], iconAction: [1, "iconAction"], priority: [2, "priority"] }, { action: "action" }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], function (_ck, _v) { var currVal_1 = core["_56" /* ɵunv */](_v, 1, 0, core["_44" /* ɵnov */](_v, 2).transform(_v.context.$implicit.data.title)); var currVal_2 = _v.context.$implicit.data.icon; var currVal_3 = _v.context.$implicit.priority; _ck(_v, 1, 0, currVal_1, currVal_2, currVal_3); }, function (_ck, _v) { var currVal_0 = _v.context.$implicit.data.class; _ck(_v, 0, 0, currVal_0); }); }
function View_CoreCourseSectionPage_1(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ɵeld */](1, 0, null, null, 21, "core-navbar-buttons", [], null, null, null, navbar_buttons_ngfactory["b" /* View_CoreNavBarButtonsComponent_0 */], navbar_buttons_ngfactory["a" /* RenderType_CoreNavBarButtonsComponent */])), core["_30" /* ɵdid */](2, 245760, null, 1, navbar_buttons["a" /* CoreNavBarButtonsComponent */], [core["t" /* ElementRef */], logger["a" /* CoreLoggerProvider */], dom["a" /* CoreDomUtilsProvider */]], null, null), core["_52" /* ɵqud */](603979776, 7, { buttons: 1 }), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](5, 0, null, 0, 16, "core-context-menu", [], null, null, null, context_menu_ngfactory["b" /* View_CoreContextMenuComponent_0 */], context_menu_ngfactory["a" /* RenderType_CoreContextMenuComponent */])), core["_30" /* ɵdid */](6, 245760, null, 0, context_menu["a" /* CoreContextMenuComponent */], [translate_service["a" /* TranslateService */], popover_controller["a" /* PopoverController */], core["t" /* ElementRef */], dom["a" /* CoreDomUtilsProvider */], [2, tab["a" /* CoreTabComponent */]], utils["a" /* CoreUtilsProvider */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                        "])), (_l()(), core["_26" /* ɵand */](16777216, [[5, 2]], 0, 1, null, View_CoreCourseSectionPage_2)), core["_30" /* ɵdid */](9, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](11, 0, null, 0, 2, "core-context-menu-item", [], null, [[null, "action"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("action" === en)) {
        var pd_0 = (_co.prefetchCourse() !== false);
        ad = (pd_0 && ad);
    } return ad; }, context_menu_item_ngfactory["b" /* View_CoreContextMenuItemComponent_0 */], context_menu_item_ngfactory["a" /* RenderType_CoreContextMenuItemComponent */])), core["_30" /* ɵdid */](12, 770048, null, 0, context_menu_item["a" /* CoreContextMenuItemComponent */], [context_menu["a" /* CoreContextMenuComponent */]], { content: [0, "content"], iconAction: [1, "iconAction"], closeOnClick: [2, "closeOnClick"], priority: [3, "priority"], hidden: [4, "hidden"] }, { action: "action" }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](15, 0, null, 0, 2, "core-context-menu-item", [["iconAction", "fa-graduation-cap"]], null, [[null, "action"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("action" === en)) {
        var pd_0 = (_co.openCourseSummary() !== false);
        ad = (pd_0 && ad);
    } return ad; }, context_menu_item_ngfactory["b" /* View_CoreContextMenuItemComponent_0 */], context_menu_item_ngfactory["a" /* RenderType_CoreContextMenuItemComponent */])), core["_30" /* ɵdid */](16, 770048, null, 0, context_menu_item["a" /* CoreContextMenuItemComponent */], [context_menu["a" /* CoreContextMenuComponent */]], { content: [0, "content"], iconAction: [1, "iconAction"], priority: [2, "priority"] }, { action: "action" }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                        "])), (_l()(), core["_26" /* ɵand */](16777216, [[5, 2]], 0, 1, null, View_CoreCourseSectionPage_3)), core["_30" /* ɵdid */](20, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                    "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ɵeld */](24, 0, null, null, 17, "ion-content", [], [[2, "statusbar-padding", null], [2, "has-refresher", null]], null, null, content_ngfactory["b" /* View_Content_0 */], content_ngfactory["a" /* RenderType_Content */])), core["_30" /* ɵdid */](25, 4374528, [[6, 4], [1, 4], ["courseSectionContent", 4]], 0, content["a" /* Content */], [config["a" /* Config */], platform["a" /* Platform */], dom_controller["a" /* DomController */], core["t" /* ElementRef */], core["V" /* Renderer */], app["a" /* App */], keyboard["a" /* Keyboard */], core["M" /* NgZone */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](27, 0, null, 2, 6, "ion-refresher", [], [[2, "refresher-active", null], [4, "top", null]], [[null, "ionRefresh"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("ionRefresh" === en)) {
        var pd_0 = (_co.doRefresh($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), core["_30" /* ɵdid */](28, 212992, null, 0, refresher["a" /* Refresher */], [platform["a" /* Platform */], content["a" /* Content */], core["M" /* NgZone */], gesture_controller["l" /* GestureController */]], { enabled: [0, "enabled"] }, { ionRefresh: "ionRefresh" }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](30, 0, null, null, 2, "ion-refresher-content", [], [[1, "state", 0]], null, null, refresher_content_ngfactory["b" /* View_RefresherContent_0 */], refresher_content_ngfactory["a" /* RenderType_RefresherContent */])), core["_30" /* ɵdid */](31, 114688, null, 0, refresher_content["a" /* RefresherContent */], [refresher["a" /* Refresher */], config["a" /* Config */]], { pullingText: [0, "pullingText"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n\n                    "])), (_l()(), core["_31" /* ɵeld */](35, 0, null, 1, 5, "core-loading", [], null, null, null, loading_ngfactory["b" /* View_CoreLoadingComponent_0 */], loading_ngfactory["a" /* RenderType_CoreLoadingComponent */])), core["_30" /* ɵdid */](36, 638976, null, 0, loading["a" /* CoreLoadingComponent */], [translate_service["a" /* TranslateService */], core["t" /* ElementRef */], events["a" /* CoreEventsProvider */], utils["a" /* CoreUtilsProvider */]], { hideUntil: [0, "hideUntil"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](38, 0, null, 0, 1, "core-course-format", [], null, [[null, "completionChanged"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("completionChanged" === en)) {
        var pd_0 = (_co.onCompletionChange($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, View_CoreCourseFormatComponent_0, RenderType_CoreCourseFormatComponent)), core["_30" /* ɵdid */](39, 770048, [[2, 4]], 0, format["a" /* CoreCourseFormatComponent */], [format_delegate["a" /* CoreCourseFormatDelegate */], translate_service["a" /* TranslateService */], core["C" /* Injector */], providers_helper["a" /* CoreCourseHelperProvider */], dom["a" /* CoreDomUtilsProvider */], events["a" /* CoreEventsProvider */], sites["a" /* CoreSitesProvider */], content["a" /* Content */], module_prefetch_delegate["a" /* CoreCourseModulePrefetchDelegate */], modal_controller["a" /* ModalController */], course["a" /* CoreCourseProvider */]], { course: [0, "course"], sections: [1, "sections"], downloadEnabled: [2, "downloadEnabled"], initialSectionId: [3, "initialSectionId"], initialSectionNumber: [4, "initialSectionNumber"], moduleId: [5, "moduleId"] }, { completionChanged: "completionChanged" }), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                    "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n                "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "]))], function (_ck, _v) { var _co = _v.component; _ck(_v, 2, 0); _ck(_v, 6, 0); var currVal_0 = _co.displayEnableDownload; _ck(_v, 9, 0, currVal_0); var currVal_1 = core["_56" /* ɵunv */](_v, 12, 0, core["_44" /* ɵnov */](_v, 13).transform(_co.prefetchCourseData.title)); var currVal_2 = _co.prefetchCourseData.prefetchCourseIcon; var currVal_3 = false; var currVal_4 = 1900; var currVal_5 = !_co.downloadCourseEnabled; _ck(_v, 12, 0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5); var currVal_6 = core["_56" /* ɵunv */](_v, 16, 0, core["_44" /* ɵnov */](_v, 17).transform("core.course.coursesummary")); var currVal_7 = "fa-graduation-cap"; var currVal_8 = 1800; _ck(_v, 16, 0, currVal_6, currVal_7, currVal_8); var currVal_9 = _co.courseMenuHandlers; _ck(_v, 20, 0, currVal_9); var currVal_14 = (_co.dataLoaded && _co.displayRefresher); _ck(_v, 28, 0, currVal_14); var currVal_16 = core["_34" /* ɵinlineInterpolate */](1, "", core["_56" /* ɵunv */](_v, 31, 0, core["_44" /* ɵnov */](_v, 32).transform("core.pulltorefresh")), ""); _ck(_v, 31, 0, currVal_16); var currVal_17 = _co.dataLoaded; _ck(_v, 36, 0, currVal_17); var currVal_18 = _co.course; var currVal_19 = _co.sections; var currVal_20 = _co.downloadEnabled; var currVal_21 = _co.sectionId; var currVal_22 = _co.sectionNumber; var currVal_23 = _co.moduleId; _ck(_v, 39, 0, currVal_18, currVal_19, currVal_20, currVal_21, currVal_22, currVal_23); }, function (_ck, _v) { var currVal_10 = core["_44" /* ɵnov */](_v, 25).statusbarPadding; var currVal_11 = core["_44" /* ɵnov */](_v, 25)._hasRefresher; _ck(_v, 24, 0, currVal_10, currVal_11); var currVal_12 = (core["_44" /* ɵnov */](_v, 28).state !== "inactive"); var currVal_13 = core["_44" /* ɵnov */](_v, 28)._top; _ck(_v, 27, 0, currVal_12, currVal_13); var currVal_15 = core["_44" /* ɵnov */](_v, 31).r.state; _ck(_v, 30, 0, currVal_15); }); }
function View_CoreCourseSectionPage_5(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ɵeld */](1, 0, null, null, 1, "core-dynamic-component", [], null, null, null, dynamic_component_ngfactory["b" /* View_CoreDynamicComponent_0 */], dynamic_component_ngfactory["a" /* RenderType_CoreDynamicComponent */])), core["_30" /* ɵdid */](2, 901120, null, 0, dynamic_component["a" /* CoreDynamicComponent */], [logger["a" /* CoreLoggerProvider */], core["o" /* ComponentFactoryResolver */], core["F" /* KeyValueDiffers */], [2, nav_controller["a" /* NavController */]], core["j" /* ChangeDetectorRef */], core["t" /* ElementRef */], dom["a" /* CoreDomUtilsProvider */]], { component: [0, "component"], data: [1, "data"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "]))], function (_ck, _v) { var currVal_0 = _v.parent.context.$implicit.data.component; var currVal_1 = _v.parent.context.$implicit.data.componentData; _ck(_v, 2, 0, currVal_0, currVal_1); }, null); }
function View_CoreCourseSectionPage_4(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 7, "core-tab", [], [[8, "className", 0]], null, null, tab_ngfactory["b" /* View_CoreTabComponent_0 */], tab_ngfactory["a" /* RenderType_CoreTabComponent */])), core["_30" /* ɵdid */](1, 245760, null, 2, tab["a" /* CoreTabComponent */], [tabs["a" /* CoreTabsComponent */], core["t" /* ElementRef */], dom["a" /* CoreDomUtilsProvider */], utils["a" /* CoreUtilsProvider */]], { title: [0, "title"] }, null), core["_52" /* ɵqud */](335544320, 8, { template: 0 }), core["_52" /* ɵqud */](335544320, 9, { content: 0 }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](0, [[8, 2]], null, 0, null, View_CoreCourseSectionPage_5)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "]))], function (_ck, _v) { var currVal_1 = core["_56" /* ɵunv */](_v, 1, 0, core["_44" /* ɵnov */](_v, 4).transform(_v.context.$implicit.data.title)); _ck(_v, 1, 0, currVal_1); }, function (_ck, _v) { var currVal_0 = core["_34" /* ɵinlineInterpolate */](1, "", _v.context.$implicit.data.class, ""); _ck(_v, 0, 0, currVal_0); }); }
function View_CoreCourseSectionPage_0(_l) { return core["_57" /* ɵvid */](0, [core["_52" /* ɵqud */](671088640, 1, { content: 0 }), core["_52" /* ɵqud */](671088640, 2, { formatComponent: 0 }), core["_52" /* ɵqud */](402653184, 3, { tabsComponent: 0 }), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 16, "ion-header", [], null, null, null, null, null)), core["_30" /* ɵdid */](4, 16384, null, 0, toolbar_header["a" /* Header */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, view_controller["a" /* ViewController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_31" /* ɵeld */](6, 0, null, null, 12, "ion-navbar", [["class", "toolbar"], ["core-back-button", ""]], [[8, "hidden", 0], [2, "statusbar-padding", null]], null, null, navbar_ngfactory["b" /* View_Navbar_0 */], navbar_ngfactory["a" /* RenderType_Navbar */])), core["_30" /* ɵdid */](7, 49152, null, 0, navbar["a" /* Navbar */], [app["a" /* App */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_30" /* ɵdid */](8, 212992, null, 0, back_button["a" /* CoreBackButtonDirective */], [navbar["a" /* Navbar */], platform["a" /* Platform */], translate_service["a" /* TranslateService */], events["a" /* CoreEventsProvider */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n        "])), (_l()(), core["_31" /* ɵeld */](10, 0, null, 3, 3, "ion-title", [], null, null, null, toolbar_title_ngfactory["b" /* View_ToolbarTitle_0 */], toolbar_title_ngfactory["a" /* RenderType_ToolbarTitle */])), core["_30" /* ɵdid */](11, 49152, null, 0, toolbar_title["a" /* ToolbarTitle */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), (_l()(), core["_31" /* ɵeld */](12, 0, null, 0, 1, "core-format-text", [], null, null, null, null, null)), core["_30" /* ɵdid */](13, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform["a" /* Platform */], utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], providers_app["a" /* CoreAppProvider */], helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */]], { text: [0, "text"] }, null), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n\n        "])), (_l()(), core["_31" /* ɵeld */](15, 0, null, 2, 2, "ion-buttons", [["end", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](16, 16384, null, 1, toolbar_item["a" /* ToolbarItem */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), core["_52" /* ɵqud */](603979776, 4, { _buttons: 1 }), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_31" /* ɵeld */](21, 0, null, null, 20, "ion-content", [], [[2, "statusbar-padding", null], [2, "has-refresher", null]], null, null, content_ngfactory["b" /* View_Content_0 */], content_ngfactory["a" /* RenderType_Content */])), core["_30" /* ɵdid */](22, 4374528, null, 0, content["a" /* Content */], [config["a" /* Config */], platform["a" /* Platform */], dom_controller["a" /* DomController */], core["t" /* ElementRef */], core["V" /* Renderer */], app["a" /* App */], keyboard["a" /* Keyboard */], core["M" /* NgZone */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n    "])), (_l()(), core["_31" /* ɵeld */](24, 0, null, 1, 16, "core-tabs", [], null, null, null, tabs_ngfactory["b" /* View_CoreTabsComponent_0 */], tabs_ngfactory["a" /* RenderType_CoreTabsComponent */])), core["_30" /* ɵdid */](25, 4964352, [[3, 4]], 0, tabs["a" /* CoreTabsComponent */], [core["t" /* ElementRef */], content["a" /* Content */], dom["a" /* CoreDomUtilsProvider */], providers_app["a" /* CoreAppProvider */], platform["a" /* Platform */], translate_service["a" /* TranslateService */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_31" /* ɵeld */](28, 0, null, 0, 7, "core-tab", [], null, null, null, tab_ngfactory["b" /* View_CoreTabComponent_0 */], tab_ngfactory["a" /* RenderType_CoreTabComponent */])), core["_30" /* ɵdid */](29, 245760, null, 2, tab["a" /* CoreTabComponent */], [tabs["a" /* CoreTabsComponent */], core["t" /* ElementRef */], dom["a" /* CoreDomUtilsProvider */], utils["a" /* CoreUtilsProvider */]], { title: [0, "title"] }, null), core["_52" /* ɵqud */](603979776, 5, { template: 0 }), core["_52" /* ɵqud */](603979776, 6, { content: 0 }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](0, [[5, 2]], null, 0, null, View_CoreCourseSectionPage_1)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_CoreCourseSectionPage_4)), core["_30" /* ɵdid */](39, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; _ck(_v, 8, 0); var currVal_2 = _co.title; _ck(_v, 13, 0, currVal_2); _ck(_v, 25, 0); var currVal_5 = core["_56" /* ɵunv */](_v, 29, 0, core["_44" /* ɵnov */](_v, 32).transform("core.course.contents")); _ck(_v, 29, 0, currVal_5); var currVal_6 = _co.courseHandlers; _ck(_v, 39, 0, currVal_6); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 7)._hidden; var currVal_1 = core["_44" /* ɵnov */](_v, 7)._sbPadding; _ck(_v, 6, 0, currVal_0, currVal_1); var currVal_3 = core["_44" /* ɵnov */](_v, 22).statusbarPadding; var currVal_4 = core["_44" /* ɵnov */](_v, 22)._hasRefresher; _ck(_v, 21, 0, currVal_3, currVal_4); }); }
function View_CoreCourseSectionPage_Host_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "page-core-course-section", [], null, null, null, View_CoreCourseSectionPage_0, RenderType_CoreCourseSectionPage)), core["_30" /* ɵdid */](1, 180224, null, 0, section["a" /* CoreCourseSectionPage */], [nav_params["a" /* NavParams */], course["a" /* CoreCourseProvider */], dom["a" /* CoreDomUtilsProvider */], format_delegate["a" /* CoreCourseFormatDelegate */], options_delegate["a" /* CoreCourseOptionsDelegate */], translate_service["a" /* TranslateService */], providers_helper["a" /* CoreCourseHelperProvider */], events["a" /* CoreEventsProvider */], utils_text["a" /* CoreTextUtilsProvider */], courses["a" /* CoreCoursesProvider */], sites["a" /* CoreSitesProvider */], nav_controller["a" /* NavController */], core["C" /* Injector */], module_prefetch_delegate["a" /* CoreCourseModulePrefetchDelegate */], sync["a" /* CoreCourseSyncProvider */], utils["a" /* CoreUtilsProvider */]], null, null)], null, null); }
var CoreCourseSectionPageNgFactory = core["_27" /* ɵccf */]("page-core-course-section", section["a" /* CoreCourseSectionPage */], View_CoreCourseSectionPage_Host_0, {}, {}, []);

//# sourceMappingURL=section.ngfactory.js.map
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

// EXTERNAL MODULE: ./src/pipes/pipes.module.ts + 2 modules
var pipes_module = __webpack_require__(109);

// EXTERNAL MODULE: ./src/core/block/components/components.module.ts
var block_components_components_module = __webpack_require__(269);

// EXTERNAL MODULE: ./node_modules/ionic-angular/util/module-loader.js
var module_loader = __webpack_require__(268);

// CONCATENATED MODULE: ./src/core/course/pages/section/section.module.ngfactory.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoreCourseSectionPageModuleNgFactory", function() { return CoreCourseSectionPageModuleNgFactory; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 






































var CoreCourseSectionPageModuleNgFactory = core["_28" /* ɵcmf */](section_module_CoreCourseSectionPageModule, [], function (_l) { return core["_40" /* ɵmod */]([core["_41" /* ɵmpd */](512, core["o" /* ComponentFactoryResolver */], core["_21" /* ɵCodegenComponentFactoryResolver */], [[8, [action_sheet_component_ngfactory["a" /* ActionSheetCmpNgFactory */], alert_component_ngfactory["a" /* AlertCmpNgFactory */], app_root_ngfactory["a" /* IonicAppNgFactory */], loading_component_ngfactory["a" /* LoadingCmpNgFactory */], modal_component_ngfactory["a" /* ModalCmpNgFactory */], picker_component_ngfactory["a" /* PickerCmpNgFactory */], popover_component_ngfactory["a" /* PopoverCmpNgFactory */], select_popover_component_ngfactory["a" /* SelectPopoverNgFactory */], toast_component_ngfactory["a" /* ToastCmpNgFactory */], context_menu_popover_ngfactory["a" /* CoreContextMenuPopoverComponentNgFactory */], course_picker_menu_popover_ngfactory["a" /* CoreCoursePickerMenuPopoverComponentNgFactory */], recaptchamodal_ngfactory["a" /* CoreRecaptchaModalComponentNgFactory */], bs_tooltip_ngfactory["a" /* CoreBSTooltipComponentNgFactory */], only_title_block_ngfactory["a" /* CoreBlockOnlyTitleComponentNgFactory */], pre_rendered_block_ngfactory["a" /* CoreBlockPreRenderedComponentNgFactory */], course_blocks_ngfactory["a" /* CoreBlockCourseBlocksComponentNgFactory */], unsupported_module_ngfactory["a" /* CoreCourseUnsupportedModuleComponentNgFactory */], tag_area_ngfactory["a" /* CoreCourseTagAreaComponentNgFactory */], CoreCourseSectionPageNgFactory]], [3, core["o" /* ComponentFactoryResolver */]], core["K" /* NgModuleRef */]]), core["_41" /* ɵmpd */](4608, common["m" /* NgLocalization */], common["l" /* NgLocaleLocalization */], [core["G" /* LOCALE_ID */], [2, common["w" /* ɵa */]]]), core["_41" /* ɵmpd */](4608, esm5_forms["x" /* ɵi */], esm5_forms["x" /* ɵi */], []), core["_41" /* ɵmpd */](4608, esm5_forms["d" /* FormBuilder */], esm5_forms["d" /* FormBuilder */], []), core["_41" /* ɵmpd */](4608, translate_loader["b" /* TranslateLoader */], translate_loader["a" /* TranslateFakeLoader */], []), core["_41" /* ɵmpd */](4608, translate_compiler["a" /* TranslateCompiler */], translate_compiler["b" /* TranslateFakeCompiler */], []), core["_41" /* ɵmpd */](4608, translate_parser["b" /* TranslateParser */], translate_parser["a" /* TranslateDefaultParser */], []), core["_41" /* ɵmpd */](4608, missing_translation_handler["b" /* MissingTranslationHandler */], missing_translation_handler["a" /* FakeMissingTranslationHandler */], []), core["_41" /* ɵmpd */](4608, translate_service["a" /* TranslateService */], translate_service["a" /* TranslateService */], [translate_store["a" /* TranslateStore */], translate_loader["b" /* TranslateLoader */], translate_compiler["a" /* TranslateCompiler */], translate_parser["b" /* TranslateParser */], missing_translation_handler["b" /* MissingTranslationHandler */], translate_service["b" /* USE_DEFAULT_LANG */], translate_service["c" /* USE_STORE */]]), core["_41" /* ɵmpd */](512, common["b" /* CommonModule */], common["b" /* CommonModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["v" /* ɵba */], esm5_forms["v" /* ɵba */], []), core["_41" /* ɵmpd */](512, esm5_forms["i" /* FormsModule */], esm5_forms["i" /* FormsModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["s" /* ReactiveFormsModule */], esm5_forms["s" /* ReactiveFormsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["a" /* IonicModule */], ionic_angular_module["a" /* IonicModule */], []), core["_41" /* ɵmpd */](512, _ngx_translate_core["b" /* TranslateModule */], _ngx_translate_core["b" /* TranslateModule */], []), core["_41" /* ɵmpd */](512, directives_module["a" /* CoreDirectivesModule */], directives_module["a" /* CoreDirectivesModule */], []), core["_41" /* ɵmpd */](512, pipes_module["a" /* CorePipesModule */], pipes_module["a" /* CorePipesModule */], []), core["_41" /* ɵmpd */](512, components_module["a" /* CoreComponentsModule */], components_module["a" /* CoreComponentsModule */], []), core["_41" /* ɵmpd */](512, block_components_components_module["a" /* CoreBlockComponentsModule */], block_components_components_module["a" /* CoreBlockComponentsModule */], []), core["_41" /* ɵmpd */](512, components_components_module["a" /* CoreCourseComponentsModule */], components_components_module["a" /* CoreCourseComponentsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["b" /* IonicPageModule */], ionic_angular_module["b" /* IonicPageModule */], []), core["_41" /* ɵmpd */](512, section_module_CoreCourseSectionPageModule, section_module_CoreCourseSectionPageModule, []), core["_41" /* ɵmpd */](256, translate_service["c" /* USE_STORE */], undefined, []), core["_41" /* ɵmpd */](256, translate_service["b" /* USE_DEFAULT_LANG */], undefined, []), core["_41" /* ɵmpd */](256, module_loader["a" /* LAZY_LOADED_TOKEN */], section["a" /* CoreCourseSectionPage */], [])]); });

//# sourceMappingURL=section.module.ngfactory.js.map

/***/ })

});
//# sourceMappingURL=64.js.map