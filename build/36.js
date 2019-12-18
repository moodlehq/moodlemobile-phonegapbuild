webpackJsonp([36],{

/***/ 2114:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/@angular/core/esm5/core.js
var core = __webpack_require__(0);

// EXTERNAL MODULE: ./node_modules/ionic-angular/index.js + 3 modules
var ionic_angular = __webpack_require__(5);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/index.js + 1 modules
var _ngx_translate_core = __webpack_require__(3);

// EXTERNAL MODULE: ./src/directives/directives.module.ts + 2 modules
var directives_module = __webpack_require__(32);

// EXTERNAL MODULE: ./src/core/siteplugins/components/module-index/module-index.ts
var module_index = __webpack_require__(396);

// CONCATENATED MODULE: ./src/core/siteplugins/pages/module-index/module-index.ts
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
 * Page to render the index page of a module site plugin.
 */
var module_index_CoreSitePluginsModuleIndexPage = /** @class */ (function () {
    function CoreSitePluginsModuleIndexPage(params) {
        this.title = params.get('title');
        this.module = params.get('module');
        this.courseId = params.get('courseId');
    }
    /**
     * Refresh the data.
     *
     * @param refresher Refresher.
     */
    CoreSitePluginsModuleIndexPage.prototype.refreshData = function (refresher) {
        this.content.doRefresh().finally(function () {
            refresher.complete();
        });
    };
    /**
     * The page is about to enter and become the active page.
     */
    CoreSitePluginsModuleIndexPage.prototype.ionViewWillEnter = function () {
        this.content.callComponentFunction('ionViewWillEnter');
    };
    /**
     * The page has fully entered and is now the active page. This event will fire, whether it was the first load or a cached page.
     */
    CoreSitePluginsModuleIndexPage.prototype.ionViewDidEnter = function () {
        this.content.callComponentFunction('ionViewDidEnter');
    };
    /**
     * The page is about to leave and no longer be the active page.
     */
    CoreSitePluginsModuleIndexPage.prototype.ionViewWillLeave = function () {
        this.content.callComponentFunction('ionViewWillLeave');
    };
    /**
     * The page has finished leaving and is no longer the active page.
     */
    CoreSitePluginsModuleIndexPage.prototype.ionViewDidLeave = function () {
        this.content.callComponentFunction('ionViewDidLeave');
    };
    /**
     * The page is about to be destroyed and have its elements removed.
     */
    CoreSitePluginsModuleIndexPage.prototype.ionViewWillUnload = function () {
        this.content.callComponentFunction('ionViewWillUnload');
    };
    /**
     * Check if we can leave the page or not.
     *
     * @return Resolved if we can leave it, rejected if not.
     */
    CoreSitePluginsModuleIndexPage.prototype.ionViewCanLeave = function () {
        return this.content.callComponentFunction('ionViewCanLeave');
    };
    __decorate([
        Object(core["_9" /* ViewChild */])(module_index["a" /* CoreSitePluginsModuleIndexComponent */]),
        __metadata("design:type", module_index["a" /* CoreSitePluginsModuleIndexComponent */])
    ], CoreSitePluginsModuleIndexPage.prototype, "content", void 0);
    CoreSitePluginsModuleIndexPage = __decorate([
        Object(core["m" /* Component */])({
            selector: 'page-core-site-plugins-module-index',
            templateUrl: 'module-index.html',
        }),
        __metadata("design:paramtypes", [ionic_angular["t" /* NavParams */]])
    ], CoreSitePluginsModuleIndexPage);
    return CoreSitePluginsModuleIndexPage;
}());

//# sourceMappingURL=module-index.js.map
// EXTERNAL MODULE: ./src/core/siteplugins/components/components.module.ts
var components_module = __webpack_require__(746);

// CONCATENATED MODULE: ./src/core/siteplugins/pages/module-index/module-index.module.ts
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
var module_index_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






/**
 * Module to lazy load the page.
 */
var module_index_module_CoreSitePluginsModuleIndexPageModule = /** @class */ (function () {
    function CoreSitePluginsModuleIndexPageModule() {
    }
    CoreSitePluginsModuleIndexPageModule = module_index_module___decorate([
        Object(core["I" /* NgModule */])({
            declarations: [
                module_index_CoreSitePluginsModuleIndexPage
            ],
            imports: [
                directives_module["a" /* CoreDirectivesModule */],
                components_module["a" /* CoreSitePluginsComponentsModule */],
                ionic_angular["l" /* IonicPageModule */].forChild(module_index_CoreSitePluginsModuleIndexPage),
                _ngx_translate_core["b" /* TranslateModule */].forChild()
            ]
        })
    ], CoreSitePluginsModuleIndexPageModule);
    return CoreSitePluginsModuleIndexPageModule;
}());

//# sourceMappingURL=module-index.module.js.map
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

// EXTERNAL MODULE: ./src/core/siteplugins/components/module-index/module-index.ngfactory.js
var module_index_ngfactory = __webpack_require__(1579);

// EXTERNAL MODULE: ./src/core/siteplugins/components/block/block.ngfactory.js
var block_ngfactory = __webpack_require__(1607);

// EXTERNAL MODULE: ./src/core/siteplugins/components/only-title-block/only-title-block.ngfactory.js
var only_title_block_ngfactory = __webpack_require__(1608);

// EXTERNAL MODULE: ./src/core/siteplugins/components/course-option/course-option.ngfactory.js
var course_option_ngfactory = __webpack_require__(1609);

// EXTERNAL MODULE: ./src/core/siteplugins/components/course-format/course-format.ngfactory.js
var course_format_ngfactory = __webpack_require__(1610);

// EXTERNAL MODULE: ./src/core/siteplugins/components/user-profile-field/user-profile-field.ngfactory.js
var user_profile_field_ngfactory = __webpack_require__(1611);

// EXTERNAL MODULE: ./src/core/siteplugins/components/question/question.ngfactory.js
var question_ngfactory = __webpack_require__(1612);

// EXTERNAL MODULE: ./src/core/siteplugins/components/question-behaviour/question-behaviour.ngfactory.js
var question_behaviour_ngfactory = __webpack_require__(1613);

// EXTERNAL MODULE: ./src/core/siteplugins/components/quiz-access-rule/quiz-access-rule.ngfactory.js
var quiz_access_rule_ngfactory = __webpack_require__(1614);

// EXTERNAL MODULE: ./src/core/siteplugins/components/assign-feedback/assign-feedback.ngfactory.js
var assign_feedback_ngfactory = __webpack_require__(1615);

// EXTERNAL MODULE: ./src/core/siteplugins/components/assign-submission/assign-submission.ngfactory.js
var assign_submission_ngfactory = __webpack_require__(1616);

// EXTERNAL MODULE: ./src/core/siteplugins/components/workshop-assessment-strategy/workshop-assessment-strategy.ngfactory.js
var workshop_assessment_strategy_ngfactory = __webpack_require__(1617);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-header.js
var toolbar_header = __webpack_require__(375);

// EXTERNAL MODULE: ./node_modules/ionic-angular/config/config.js
var config = __webpack_require__(8);

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

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.service.js
var translate_service = __webpack_require__(17);

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

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.pipe.js
var translate_pipe = __webpack_require__(25);

// EXTERNAL MODULE: ./src/core/siteplugins/providers/siteplugins.ts
var siteplugins = __webpack_require__(58);

// EXTERNAL MODULE: ./src/core/course/providers/helper.ts
var helper = __webpack_require__(38);

// EXTERNAL MODULE: ./src/core/course/providers/module-prefetch-delegate.ts
var module_prefetch_delegate = __webpack_require__(50);

// EXTERNAL MODULE: ./src/providers/utils/text.ts
var utils_text = __webpack_require__(11);

// EXTERNAL MODULE: ./src/providers/utils/utils.ts
var utils = __webpack_require__(2);

// EXTERNAL MODULE: ./src/core/course/providers/module-delegate.ts
var module_delegate = __webpack_require__(61);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-params.js
var nav_params = __webpack_require__(70);

// CONCATENATED MODULE: ./src/core/siteplugins/pages/module-index/module-index.ngfactory.js
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 



































var styles_CoreSitePluginsModuleIndexPage = [];
var RenderType_CoreSitePluginsModuleIndexPage = core["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_CoreSitePluginsModuleIndexPage, data: {} });

function View_CoreSitePluginsModuleIndexPage_0(_l) { return core["_57" /* ɵvid */](0, [core["_52" /* ɵqud */](402653184, 1, { content: 0 }), (_l()(), core["_31" /* ɵeld */](1, 0, null, null, 17, "ion-header", [], null, null, null, null, null)), core["_30" /* ɵdid */](2, 16384, null, 0, toolbar_header["a" /* Header */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, view_controller["a" /* ViewController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_31" /* ɵeld */](4, 0, null, null, 13, "ion-navbar", [["class", "toolbar"], ["core-back-button", ""]], [[8, "hidden", 0], [2, "statusbar-padding", null]], null, null, navbar_ngfactory["b" /* View_Navbar_0 */], navbar_ngfactory["a" /* RenderType_Navbar */])), core["_30" /* ɵdid */](5, 49152, null, 0, navbar["a" /* Navbar */], [app["a" /* App */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_30" /* ɵdid */](6, 212992, null, 0, back_button["a" /* CoreBackButtonDirective */], [navbar["a" /* Navbar */], platform["a" /* Platform */], translate_service["a" /* TranslateService */], events["a" /* CoreEventsProvider */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n        "])), (_l()(), core["_31" /* ɵeld */](8, 0, null, 3, 2, "ion-title", [], null, null, null, toolbar_title_ngfactory["b" /* View_ToolbarTitle_0 */], toolbar_title_ngfactory["a" /* RenderType_ToolbarTitle */])), core["_30" /* ɵdid */](9, 49152, null, 0, toolbar_title["a" /* ToolbarTitle */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), (_l()(), core["_55" /* ɵted */](10, 0, ["", ""])), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n\n        "])), (_l()(), core["_31" /* ɵeld */](12, 0, null, 2, 4, "ion-buttons", [["end", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](13, 16384, null, 1, toolbar_item["a" /* ToolbarItem */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), core["_52" /* ɵqud */](603979776, 2, { _buttons: 1 }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_31" /* ɵeld */](20, 0, null, null, 13, "ion-content", [], [[2, "statusbar-padding", null], [2, "has-refresher", null]], null, null, content_ngfactory["b" /* View_Content_0 */], content_ngfactory["a" /* RenderType_Content */])), core["_30" /* ɵdid */](21, 4374528, null, 0, content["a" /* Content */], [config["a" /* Config */], platform["a" /* Platform */], dom_controller["a" /* DomController */], core["t" /* ElementRef */], core["V" /* Renderer */], app["a" /* App */], keyboard["a" /* Keyboard */], core["M" /* NgZone */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n    "])), (_l()(), core["_31" /* ɵeld */](23, 0, null, 2, 6, "ion-refresher", [], [[2, "refresher-active", null], [4, "top", null]], [[null, "ionRefresh"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("ionRefresh" === en)) {
        var pd_0 = (_co.refreshData($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), core["_30" /* ɵdid */](24, 212992, null, 0, refresher["a" /* Refresher */], [platform["a" /* Platform */], content["a" /* Content */], core["M" /* NgZone */], gesture_controller["l" /* GestureController */]], { enabled: [0, "enabled"] }, { ionRefresh: "ionRefresh" }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_31" /* ɵeld */](26, 0, null, null, 2, "ion-refresher-content", [], [[1, "state", 0]], null, null, refresher_content_ngfactory["b" /* View_RefresherContent_0 */], refresher_content_ngfactory["a" /* RenderType_RefresherContent */])), core["_30" /* ɵdid */](27, 114688, null, 0, refresher_content["a" /* RefresherContent */], [refresher["a" /* Refresher */], config["a" /* Config */]], { pullingText: [0, "pullingText"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n    "])), (_l()(), core["_31" /* ɵeld */](31, 0, null, 1, 1, "core-site-plugins-module-index", [], null, null, null, module_index_ngfactory["c" /* View_CoreSitePluginsModuleIndexComponent_0 */], module_index_ngfactory["b" /* RenderType_CoreSitePluginsModuleIndexComponent */])), core["_30" /* ɵdid */](32, 245760, [[1, 4]], 0, module_index["a" /* CoreSitePluginsModuleIndexComponent */], [siteplugins["a" /* CoreSitePluginsProvider */], helper["a" /* CoreCourseHelperProvider */], module_prefetch_delegate["a" /* CoreCourseModulePrefetchDelegate */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], utils["a" /* CoreUtilsProvider */], module_delegate["a" /* CoreCourseModuleDelegate */]], { module: [0, "module"], courseId: [1, "courseId"], pageTitle: [2, "pageTitle"] }, null), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; _ck(_v, 6, 0); var currVal_7 = ((_co.content && _co.content.content) && _co.content.content.dataLoaded); _ck(_v, 24, 0, currVal_7); var currVal_9 = core["_34" /* ɵinlineInterpolate */](1, "", core["_56" /* ɵunv */](_v, 27, 0, core["_44" /* ɵnov */](_v, 28).transform("core.pulltorefresh")), ""); _ck(_v, 27, 0, currVal_9); var currVal_10 = _co.module; var currVal_11 = _co.courseId; var currVal_12 = _co.title; _ck(_v, 32, 0, currVal_10, currVal_11, currVal_12); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = core["_44" /* ɵnov */](_v, 5)._hidden; var currVal_1 = core["_44" /* ɵnov */](_v, 5)._sbPadding; _ck(_v, 4, 0, currVal_0, currVal_1); var currVal_2 = _co.title; _ck(_v, 10, 0, currVal_2); var currVal_3 = core["_44" /* ɵnov */](_v, 21).statusbarPadding; var currVal_4 = core["_44" /* ɵnov */](_v, 21)._hasRefresher; _ck(_v, 20, 0, currVal_3, currVal_4); var currVal_5 = (core["_44" /* ɵnov */](_v, 24).state !== "inactive"); var currVal_6 = core["_44" /* ɵnov */](_v, 24)._top; _ck(_v, 23, 0, currVal_5, currVal_6); var currVal_8 = core["_44" /* ɵnov */](_v, 27).r.state; _ck(_v, 26, 0, currVal_8); }); }
function View_CoreSitePluginsModuleIndexPage_Host_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "page-core-site-plugins-module-index", [], null, null, null, View_CoreSitePluginsModuleIndexPage_0, RenderType_CoreSitePluginsModuleIndexPage)), core["_30" /* ɵdid */](1, 49152, null, 0, module_index_CoreSitePluginsModuleIndexPage, [nav_params["a" /* NavParams */]], null, null)], null, null); }
var CoreSitePluginsModuleIndexPageNgFactory = core["_27" /* ɵccf */]("page-core-site-plugins-module-index", module_index_CoreSitePluginsModuleIndexPage, View_CoreSitePluginsModuleIndexPage_Host_0, {}, {}, []);

//# sourceMappingURL=module-index.ngfactory.js.map
// EXTERNAL MODULE: ./node_modules/@angular/common/esm5/common.js
var common = __webpack_require__(7);

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

// EXTERNAL MODULE: ./src/components/components.module.ts
var components_components_module = __webpack_require__(28);

// EXTERNAL MODULE: ./src/core/compile/components/compile-html/compile-html.module.ts
var compile_html_module = __webpack_require__(481);

// EXTERNAL MODULE: ./node_modules/ionic-angular/util/module-loader.js
var module_loader = __webpack_require__(274);

// CONCATENATED MODULE: ./src/core/siteplugins/pages/module-index/module-index.module.ngfactory.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoreSitePluginsModuleIndexPageModuleNgFactory", function() { return CoreSitePluginsModuleIndexPageModuleNgFactory; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 













































var CoreSitePluginsModuleIndexPageModuleNgFactory = core["_28" /* ɵcmf */](module_index_module_CoreSitePluginsModuleIndexPageModule, [], function (_l) { return core["_40" /* ɵmod */]([core["_41" /* ɵmpd */](512, core["o" /* ComponentFactoryResolver */], core["_21" /* ɵCodegenComponentFactoryResolver */], [[8, [action_sheet_component_ngfactory["a" /* ActionSheetCmpNgFactory */], alert_component_ngfactory["a" /* AlertCmpNgFactory */], app_root_ngfactory["a" /* IonicAppNgFactory */], loading_component_ngfactory["a" /* LoadingCmpNgFactory */], modal_component_ngfactory["a" /* ModalCmpNgFactory */], picker_component_ngfactory["a" /* PickerCmpNgFactory */], popover_component_ngfactory["a" /* PopoverCmpNgFactory */], select_popover_component_ngfactory["a" /* SelectPopoverNgFactory */], toast_component_ngfactory["a" /* ToastCmpNgFactory */], context_menu_popover_ngfactory["a" /* CoreContextMenuPopoverComponentNgFactory */], course_picker_menu_popover_ngfactory["a" /* CoreCoursePickerMenuPopoverComponentNgFactory */], recaptchamodal_ngfactory["a" /* CoreRecaptchaModalComponentNgFactory */], bs_tooltip_ngfactory["a" /* CoreBSTooltipComponentNgFactory */], module_index_ngfactory["a" /* CoreSitePluginsModuleIndexComponentNgFactory */], block_ngfactory["a" /* CoreSitePluginsBlockComponentNgFactory */], only_title_block_ngfactory["a" /* CoreSitePluginsOnlyTitleBlockComponentNgFactory */], course_option_ngfactory["a" /* CoreSitePluginsCourseOptionComponentNgFactory */], course_format_ngfactory["a" /* CoreSitePluginsCourseFormatComponentNgFactory */], user_profile_field_ngfactory["a" /* CoreSitePluginsUserProfileFieldComponentNgFactory */], question_ngfactory["a" /* CoreSitePluginsQuestionComponentNgFactory */], question_behaviour_ngfactory["a" /* CoreSitePluginsQuestionBehaviourComponentNgFactory */], quiz_access_rule_ngfactory["a" /* CoreSitePluginsQuizAccessRuleComponentNgFactory */], assign_feedback_ngfactory["a" /* CoreSitePluginsAssignFeedbackComponentNgFactory */], assign_submission_ngfactory["a" /* CoreSitePluginsAssignSubmissionComponentNgFactory */], workshop_assessment_strategy_ngfactory["a" /* CoreSitePluginsWorkshopAssessmentStrategyComponentNgFactory */], CoreSitePluginsModuleIndexPageNgFactory]], [3, core["o" /* ComponentFactoryResolver */]], core["K" /* NgModuleRef */]]), core["_41" /* ɵmpd */](4608, common["m" /* NgLocalization */], common["l" /* NgLocaleLocalization */], [core["G" /* LOCALE_ID */], [2, common["w" /* ɵa */]]]), core["_41" /* ɵmpd */](4608, esm5_forms["x" /* ɵi */], esm5_forms["x" /* ɵi */], []), core["_41" /* ɵmpd */](4608, esm5_forms["d" /* FormBuilder */], esm5_forms["d" /* FormBuilder */], []), core["_41" /* ɵmpd */](4608, translate_loader["b" /* TranslateLoader */], translate_loader["a" /* TranslateFakeLoader */], []), core["_41" /* ɵmpd */](4608, translate_compiler["a" /* TranslateCompiler */], translate_compiler["b" /* TranslateFakeCompiler */], []), core["_41" /* ɵmpd */](4608, translate_parser["b" /* TranslateParser */], translate_parser["a" /* TranslateDefaultParser */], []), core["_41" /* ɵmpd */](4608, missing_translation_handler["b" /* MissingTranslationHandler */], missing_translation_handler["a" /* FakeMissingTranslationHandler */], []), core["_41" /* ɵmpd */](4608, translate_service["a" /* TranslateService */], translate_service["a" /* TranslateService */], [translate_store["a" /* TranslateStore */], translate_loader["b" /* TranslateLoader */], translate_compiler["a" /* TranslateCompiler */], translate_parser["b" /* TranslateParser */], missing_translation_handler["b" /* MissingTranslationHandler */], translate_service["b" /* USE_DEFAULT_LANG */], translate_service["c" /* USE_STORE */]]), core["_41" /* ɵmpd */](512, directives_module["a" /* CoreDirectivesModule */], directives_module["a" /* CoreDirectivesModule */], []), core["_41" /* ɵmpd */](512, common["b" /* CommonModule */], common["b" /* CommonModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["v" /* ɵba */], esm5_forms["v" /* ɵba */], []), core["_41" /* ɵmpd */](512, esm5_forms["i" /* FormsModule */], esm5_forms["i" /* FormsModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["s" /* ReactiveFormsModule */], esm5_forms["s" /* ReactiveFormsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["a" /* IonicModule */], ionic_angular_module["a" /* IonicModule */], []), core["_41" /* ɵmpd */](512, _ngx_translate_core["b" /* TranslateModule */], _ngx_translate_core["b" /* TranslateModule */], []), core["_41" /* ɵmpd */](512, pipes_module["a" /* CorePipesModule */], pipes_module["a" /* CorePipesModule */], []), core["_41" /* ɵmpd */](512, components_components_module["a" /* CoreComponentsModule */], components_components_module["a" /* CoreComponentsModule */], []), core["_41" /* ɵmpd */](512, compile_html_module["a" /* CoreCompileHtmlComponentModule */], compile_html_module["a" /* CoreCompileHtmlComponentModule */], []), core["_41" /* ɵmpd */](512, components_module["a" /* CoreSitePluginsComponentsModule */], components_module["a" /* CoreSitePluginsComponentsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["b" /* IonicPageModule */], ionic_angular_module["b" /* IonicPageModule */], []), core["_41" /* ɵmpd */](512, module_index_module_CoreSitePluginsModuleIndexPageModule, module_index_module_CoreSitePluginsModuleIndexPageModule, []), core["_41" /* ɵmpd */](256, translate_service["c" /* USE_STORE */], undefined, []), core["_41" /* ɵmpd */](256, translate_service["b" /* USE_DEFAULT_LANG */], undefined, []), core["_41" /* ɵmpd */](256, module_loader["a" /* LAZY_LOADED_TOKEN */], module_index_CoreSitePluginsModuleIndexPage, [])]); });

//# sourceMappingURL=module-index.module.ngfactory.js.map

/***/ })

});
//# sourceMappingURL=36.js.map