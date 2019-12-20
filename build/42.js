webpackJsonp([42],{

/***/ 2107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/@angular/core/esm5/core.js
var core = __webpack_require__(0);

// EXTERNAL MODULE: ./node_modules/ionic-angular/index.js + 3 modules
var ionic_angular = __webpack_require__(5);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/index.js + 1 modules
var _ngx_translate_core = __webpack_require__(3);

// EXTERNAL MODULE: ./src/providers/app.ts
var app = __webpack_require__(9);

// EXTERNAL MODULE: ./src/core/constants.ts
var constants = __webpack_require__(40);

// EXTERNAL MODULE: ./src/providers/config.ts
var config = __webpack_require__(167);

// EXTERNAL MODULE: ./src/providers/file.ts
var file = __webpack_require__(57);

// EXTERNAL MODULE: ./src/providers/events.ts
var events = __webpack_require__(10);

// EXTERNAL MODULE: ./src/providers/lang.ts
var lang = __webpack_require__(153);

// EXTERNAL MODULE: ./src/providers/utils/dom.ts
var dom = __webpack_require__(4);

// EXTERNAL MODULE: ./src/providers/local-notifications.ts
var local_notifications = __webpack_require__(146);

// EXTERNAL MODULE: ./src/core/pushnotifications/providers/pushnotifications.ts
var pushnotifications = __webpack_require__(138);

// EXTERNAL MODULE: ./src/configconstants.ts
var configconstants = __webpack_require__(124);

// EXTERNAL MODULE: ./src/core/settings/providers/helper.ts
var helper = __webpack_require__(739);

// CONCATENATED MODULE: ./src/core/settings/pages/general/general.ts
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
 * Page that displays the general settings.
 */
var general_CoreSettingsGeneralPage = /** @class */ (function () {
    function CoreSettingsGeneralPage(appProvider, configProvider, fileProvider, eventsProvider, langProvider, domUtils, pushNotificationsProvider, localNotificationsProvider, settingsHelper) {
        var _this = this;
        this.appProvider = appProvider;
        this.configProvider = configProvider;
        this.eventsProvider = eventsProvider;
        this.langProvider = langProvider;
        this.domUtils = domUtils;
        this.pushNotificationsProvider = pushNotificationsProvider;
        this.settingsHelper = settingsHelper;
        this.languages = [];
        this.fontSizes = [];
        this.colorSchemes = [];
        // Get the supported languages.
        var languages = configconstants["a" /* CoreConfigConstants */].languages;
        for (var code in languages) {
            this.languages.push({
                code: code,
                name: languages[code]
            });
        }
        if (!configconstants["a" /* CoreConfigConstants */].forceColorScheme) {
            var defaultColorScheme = 'light';
            // Auto is not working on iOS right now until we update Webkit.
            if (!this.appProvider.isIOS() && (window.matchMedia('(prefers-color-scheme: dark)').matches ||
                window.matchMedia('(prefers-color-scheme: light)').matches)) {
                this.colorSchemes.push('auto');
                defaultColorScheme = 'auto';
            }
            this.colorSchemes.push('light');
            this.colorSchemes.push('dark');
            this.configProvider.get(constants["a" /* CoreConstants */].SETTINGS_COLOR_SCHEME, defaultColorScheme).then(function (scheme) {
                _this.selectedScheme = scheme;
            });
        }
        // Sort them by name.
        this.languages.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
        langProvider.getCurrentLanguage().then(function (currentLanguage) {
            _this.selectedLanguage = currentLanguage;
        });
        this.configProvider.get(constants["a" /* CoreConstants */].SETTINGS_FONT_SIZE, configconstants["a" /* CoreConfigConstants */].font_sizes[0].toString()).then(function (fontSize) {
            _this.selectedFontSize = fontSize;
            _this.fontSizes = configconstants["a" /* CoreConfigConstants */].font_sizes.map(function (size) {
                return {
                    size: size,
                    // Absolute pixel size based on 1.4rem body text when this size is selected.
                    style: Math.round(size * 16 * 1.4 / 100),
                    selected: size === _this.selectedFontSize
                };
            });
            // Workaround for segment control bug https://github.com/ionic-team/ionic/issues/6923, fixed in Ionic 4 only.
            setTimeout(function () {
                if (_this.segment) {
                    _this.segment.ngAfterContentInit();
                }
            });
        });
        this.rteSupported = this.domUtils.isRichTextEditorSupported();
        if (this.rteSupported) {
            this.configProvider.get(constants["a" /* CoreConstants */].SETTINGS_RICH_TEXT_EDITOR, true).then(function (richTextEditorEnabled) {
                _this.richTextEditor = !!richTextEditorEnabled;
            });
        }
        this.configProvider.get(constants["a" /* CoreConstants */].SETTINGS_DEBUG_DISPLAY, false).then(function (debugDisplay) {
            _this.debugDisplay = !!debugDisplay;
        });
        this.analyticsSupported = configconstants["a" /* CoreConfigConstants */].enableanalytics;
        if (this.analyticsSupported) {
            this.configProvider.get(constants["a" /* CoreConstants */].SETTINGS_ANALYTICS_ENABLED, true).then(function (enabled) {
                _this.analyticsEnabled = !!enabled;
            });
        }
    }
    /**
     * Called when a new language is selected.
     */
    CoreSettingsGeneralPage.prototype.languageChanged = function () {
        var _this = this;
        this.langProvider.changeCurrentLanguage(this.selectedLanguage).finally(function () {
            _this.eventsProvider.trigger(events["a" /* CoreEventsProvider */].LANGUAGE_CHANGED, _this.selectedLanguage);
        });
    };
    /**
     * Called when a new font size is selected.
     */
    CoreSettingsGeneralPage.prototype.fontSizeChanged = function () {
        var _this = this;
        this.fontSizes = this.fontSizes.map(function (fontSize) {
            fontSize.selected = fontSize.size === _this.selectedFontSize;
            return fontSize;
        });
        this.settingsHelper.setFontSize(this.selectedFontSize);
        this.configProvider.set(constants["a" /* CoreConstants */].SETTINGS_FONT_SIZE, this.selectedFontSize);
    };
    /**
     * Called when a new color scheme is selected.
     */
    CoreSettingsGeneralPage.prototype.colorSchemeChanged = function () {
        this.settingsHelper.setColorScheme(this.selectedScheme);
        this.configProvider.set(constants["a" /* CoreConstants */].SETTINGS_COLOR_SCHEME, this.selectedScheme);
    };
    /**
     * Called when the rich text editor is enabled or disabled.
     */
    CoreSettingsGeneralPage.prototype.richTextEditorChanged = function () {
        this.configProvider.set(constants["a" /* CoreConstants */].SETTINGS_RICH_TEXT_EDITOR, this.richTextEditor ? 1 : 0);
    };
    /**
     * Called when the debug display setting is enabled or disabled.
     */
    CoreSettingsGeneralPage.prototype.debugDisplayChanged = function () {
        this.configProvider.set(constants["a" /* CoreConstants */].SETTINGS_DEBUG_DISPLAY, this.debugDisplay ? 1 : 0);
        this.domUtils.setDebugDisplay(this.debugDisplay);
    };
    /**
     * Called when the analytics setting is enabled or disabled.
     */
    CoreSettingsGeneralPage.prototype.analyticsEnabledChanged = function () {
        var _this = this;
        this.pushNotificationsProvider.enableAnalytics(this.analyticsEnabled).then(function () {
            _this.configProvider.set(constants["a" /* CoreConstants */].SETTINGS_ANALYTICS_ENABLED, _this.analyticsEnabled ? 1 : 0);
        });
    };
    __decorate([
        Object(core["_9" /* ViewChild */])(ionic_angular["A" /* Segment */]),
        __metadata("design:type", ionic_angular["A" /* Segment */])
    ], CoreSettingsGeneralPage.prototype, "segment", void 0);
    CoreSettingsGeneralPage = __decorate([
        Object(core["m" /* Component */])({
            selector: 'page-core-settings-general',
            templateUrl: 'general.html',
        }),
        __metadata("design:paramtypes", [app["a" /* CoreAppProvider */], config["a" /* CoreConfigProvider */], file["a" /* CoreFileProvider */],
            events["a" /* CoreEventsProvider */], lang["a" /* CoreLangProvider */],
            dom["a" /* CoreDomUtilsProvider */], pushnotifications["a" /* CorePushNotificationsProvider */],
            local_notifications["a" /* CoreLocalNotificationsProvider */], helper["a" /* CoreSettingsHelper */]])
    ], CoreSettingsGeneralPage);
    return CoreSettingsGeneralPage;
}());

//# sourceMappingURL=general.js.map
// EXTERNAL MODULE: ./src/components/components.module.ts
var components_module = __webpack_require__(28);

// EXTERNAL MODULE: ./src/directives/directives.module.ts + 2 modules
var directives_module = __webpack_require__(32);

// CONCATENATED MODULE: ./src/core/settings/pages/general/general.module.ts
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
var general_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var general_module_CoreSettingsGeneralPageModule = /** @class */ (function () {
    function CoreSettingsGeneralPageModule() {
    }
    CoreSettingsGeneralPageModule = general_module___decorate([
        Object(core["I" /* NgModule */])({
            declarations: [
                general_CoreSettingsGeneralPage
            ],
            imports: [
                components_module["a" /* CoreComponentsModule */],
                directives_module["a" /* CoreDirectivesModule */],
                ionic_angular["l" /* IonicPageModule */].forChild(general_CoreSettingsGeneralPage),
                _ngx_translate_core["b" /* TranslateModule */].forChild()
            ],
        })
    ], CoreSettingsGeneralPageModule);
    return CoreSettingsGeneralPageModule;
}());

//# sourceMappingURL=general.module.js.map
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

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/option/option.js
var option_option = __webpack_require__(110);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/segment/segment-button.js
var segment_button = __webpack_require__(496);

// CONCATENATED MODULE: ./node_modules/ionic-angular/components/segment/segment-button.ngfactory.js
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 


var styles_SegmentButton = [];
var RenderType_SegmentButton = core["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_SegmentButton, data: {} });

function View_SegmentButton_0(_l) { return core["_57" /* ɵvid */](0, [core["_43" /* ɵncd */](null, 0), (_l()(), core["_31" /* ɵeld */](1, 0, null, null, 0, "div", [["class", "button-effect"]], null, null, null, null, null))], null, null); }
function View_SegmentButton_Host_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "ion-segment-button", [["class", "segment-button"], ["role", "button"], ["tappable", ""]], [[2, "segment-button-disabled", null], [2, "segment-activated", null], [1, "aria-pressed", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (core["_44" /* ɵnov */](_v, 1).onClick() !== false);
        ad = (pd_0 && ad);
    } return ad; }, View_SegmentButton_0, RenderType_SegmentButton)), core["_30" /* ɵdid */](1, 114688, null, 0, segment_button["a" /* SegmentButton */], [], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 1)._disabled; var currVal_1 = core["_44" /* ɵnov */](_v, 1).isActive; var currVal_2 = core["_44" /* ɵnov */](_v, 1).isActive; _ck(_v, 0, 0, currVal_0, currVal_1, currVal_2); }); }
var SegmentButtonNgFactory = core["_27" /* ɵccf */]("ion-segment-button", segment_button["a" /* SegmentButton */], View_SegmentButton_Host_0, { value: "value", disabled: "disabled" }, { ionSelect: "ionSelect" }, ["*"]);

//# sourceMappingURL=segment-button.ngfactory.js.map
// EXTERNAL MODULE: ./node_modules/@angular/common/esm5/common.js
var common = __webpack_require__(7);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.pipe.js
var translate_pipe = __webpack_require__(25);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.service.js
var translate_service = __webpack_require__(17);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item.ngfactory.js + 1 modules
var item_ngfactory = __webpack_require__(30);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item.js
var item = __webpack_require__(20);

// EXTERNAL MODULE: ./node_modules/ionic-angular/util/form.js
var util_form = __webpack_require__(19);

// EXTERNAL MODULE: ./node_modules/ionic-angular/config/config.js
var config_config = __webpack_require__(8);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-reorder.js + 1 modules
var item_reorder = __webpack_require__(26);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-content.js
var item_content = __webpack_require__(33);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/label/label.js
var label = __webpack_require__(67);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/select/select.ngfactory.js
var select_ngfactory = __webpack_require__(126);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/select/select.js
var select_select = __webpack_require__(111);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/app/app.js + 3 modules
var app_app = __webpack_require__(35);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/deep-linker.js
var deep_linker = __webpack_require__(59);

// EXTERNAL MODULE: ./node_modules/@angular/forms/esm5/forms.js
var esm5_forms = __webpack_require__(23);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toggle/toggle.ngfactory.js
var toggle_ngfactory = __webpack_require__(728);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toggle/toggle.js + 1 modules
var toggle = __webpack_require__(317);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/platform.js + 1 modules
var platform = __webpack_require__(16);

// EXTERNAL MODULE: ./node_modules/ionic-angular/tap-click/haptic.js
var haptic = __webpack_require__(189);

// EXTERNAL MODULE: ./node_modules/ionic-angular/gestures/gesture-controller.js
var gesture_controller = __webpack_require__(44);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/dom-controller.js
var dom_controller = __webpack_require__(34);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-header.js
var toolbar_header = __webpack_require__(375);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/view-controller.js
var view_controller = __webpack_require__(39);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/navbar.ngfactory.js
var navbar_ngfactory = __webpack_require__(725);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/navbar.js
var navbar = __webpack_require__(214);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-controller.js
var nav_controller = __webpack_require__(21);

// EXTERNAL MODULE: ./src/directives/back-button.ts
var back_button = __webpack_require__(478);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.ngfactory.js
var toolbar_title_ngfactory = __webpack_require__(726);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.js
var toolbar_title = __webpack_require__(316);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar.js
var toolbar = __webpack_require__(251);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.ngfactory.js
var content_ngfactory = __webpack_require__(185);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.js
var content = __webpack_require__(29);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/keyboard.js
var keyboard = __webpack_require__(109);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/segment/segment.js
var segment = __webpack_require__(777);

// CONCATENATED MODULE: ./src/core/settings/pages/general/general.ngfactory.js
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
















































var styles_CoreSettingsGeneralPage = [];
var RenderType_CoreSettingsGeneralPage = core["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_CoreSettingsGeneralPage, data: {} });

function View_CoreSettingsGeneralPage_1(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "ion-option", [], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, [[5, 4]], 0, option_option["a" /* Option */], [core["t" /* ElementRef */]], { value: [0, "value"] }, null), (_l()(), core["_55" /* ɵted */](2, null, ["", ""]))], function (_ck, _v) { var currVal_0 = _v.context.$implicit.code; _ck(_v, 1, 0, currVal_0); }, function (_ck, _v) { var currVal_1 = _v.context.$implicit.name; _ck(_v, 2, 0, currVal_1); }); }
function View_CoreSettingsGeneralPage_2(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 9, "ion-segment-button", [["class", "segment-button"], ["role", "button"], ["tappable", ""]], [[2, "segment-button-disabled", null], [2, "segment-activated", null], [1, "aria-pressed", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (core["_44" /* ɵnov */](_v, 3).onClick() !== false);
        ad = (pd_0 && ad);
    } return ad; }, View_SegmentButton_0, RenderType_SegmentButton)), core["_30" /* ɵdid */](1, 278528, null, 0, common["n" /* NgStyle */], [core["F" /* KeyValueDiffers */], core["t" /* ElementRef */], core["W" /* Renderer2 */]], { ngStyle: [0, "ngStyle"] }, null), core["_48" /* ɵpod */](2, { "font-size.px": 0 }), core["_30" /* ɵdid */](3, 114688, [[9, 4]], 0, segment_button["a" /* SegmentButton */], [], { value: [0, "value"] }, null), (_l()(), core["_55" /* ɵted */](4, 0, ["\n                ", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_31" /* ɵeld */](6, 0, null, 0, 2, "span", [], null, null, null, null, null)), core["_30" /* ɵdid */](7, 278528, null, 0, common["n" /* NgStyle */], [core["F" /* KeyValueDiffers */], core["t" /* ElementRef */], core["W" /* Renderer2 */]], { ngStyle: [0, "ngStyle"] }, null), core["_48" /* ɵpod */](8, { "font-size.px": 0 }), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n            "]))], function (_ck, _v) { var _co = _v.component; var currVal_3 = _ck(_v, 2, 0, _v.context.$implicit.style); _ck(_v, 1, 0, currVal_3); var currVal_4 = core["_34" /* ɵinlineInterpolate */](1, "", _v.context.$implicit.size, ""); _ck(_v, 3, 0, currVal_4); var currVal_6 = _ck(_v, 8, 0, _co.fontSizes[(_co.fontSizes.length - 1)].style); _ck(_v, 7, 0, currVal_6); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 3)._disabled; var currVal_1 = core["_44" /* ɵnov */](_v, 3).isActive; var currVal_2 = core["_44" /* ɵnov */](_v, 3).isActive; _ck(_v, 0, 0, currVal_0, currVal_1, currVal_2); var currVal_5 = core["_56" /* ɵunv */](_v, 4, 0, core["_44" /* ɵnov */](_v, 5).transform("core.settings.fontsizecharacter")); _ck(_v, 4, 0, currVal_5); }); }
function View_CoreSettingsGeneralPage_4(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 3, "ion-option", [], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, [[13, 4]], 0, option_option["a" /* Option */], [core["t" /* ElementRef */]], { value: [0, "value"] }, null), (_l()(), core["_55" /* ɵted */](2, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], function (_ck, _v) { var currVal_0 = _v.context.$implicit; _ck(_v, 1, 0, currVal_0); }, function (_ck, _v) { var currVal_1 = core["_56" /* ɵunv */](_v, 2, 0, core["_44" /* ɵnov */](_v, 3).transform(("core.settings.colorscheme-" + _v.context.$implicit))); _ck(_v, 2, 0, currVal_1); }); }
function View_CoreSettingsGeneralPage_3(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 24, "ion-item", [["class", "core-settings-general-color-scheme item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config_config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 10, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 11, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 12, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n        "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 1, 4, "ion-label", [], null, null, null, null, null)), core["_30" /* ɵdid */](8, 16384, [[10, 4]], 0, label["a" /* Label */], [config_config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, null], [8, null], [8, null]], null, null), (_l()(), core["_31" /* ɵeld */](9, 0, null, null, 2, "h2", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](10, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n        "])), (_l()(), core["_31" /* ɵeld */](13, 0, null, 3, 10, "ion-select", [["interface", "action-sheet"]], [[2, "select-disabled", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "click"], [null, "keyup.space"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (core["_44" /* ɵnov */](_v, 14)._click($event) !== false);
        ad = (pd_0 && ad);
    } if (("keyup.space" === en)) {
        var pd_1 = (core["_44" /* ɵnov */](_v, 14)._keyup() !== false);
        ad = (pd_1 && ad);
    } if (("ngModelChange" === en)) {
        var pd_2 = ((_co.selectedScheme = $event) !== false);
        ad = (pd_2 && ad);
    } if (("ngModelChange" === en)) {
        var pd_3 = (_co.colorSchemeChanged() !== false);
        ad = (pd_3 && ad);
    } return ad; }, select_ngfactory["b" /* View_Select_0 */], select_ngfactory["a" /* RenderType_Select */])), core["_30" /* ɵdid */](14, 1228800, null, 1, select_select["a" /* Select */], [app_app["a" /* App */], util_form["a" /* Form */], config_config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item["a" /* Item */]], deep_linker["a" /* DeepLinker */]], { interface: [0, "interface"] }, null), core["_52" /* ɵqud */](603979776, 13, { options: 1 }), core["_50" /* ɵprd */](1024, null, esm5_forms["l" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [select_select["a" /* Select */]]), core["_30" /* ɵdid */](17, 671744, null, 0, esm5_forms["q" /* NgModel */], [[8, null], [8, null], [8, null], [2, esm5_forms["l" /* NG_VALUE_ACCESSOR */]]], { model: [0, "model"] }, { update: "ngModelChange" }), core["_50" /* ɵprd */](2048, null, esm5_forms["m" /* NgControl */], null, [esm5_forms["q" /* NgModel */]]), core["_30" /* ɵdid */](19, 16384, null, 0, esm5_forms["n" /* NgControlStatus */], [esm5_forms["m" /* NgControl */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreSettingsGeneralPage_4)), core["_30" /* ɵdid */](22, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n    "]))], function (_ck, _v) { var _co = _v.component; var currVal_9 = "action-sheet"; _ck(_v, 14, 0, currVal_9); var currVal_10 = _co.selectedScheme; _ck(_v, 17, 0, currVal_10); var currVal_11 = _co.colorSchemes; _ck(_v, 22, 0, currVal_11); }, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 10, 0, core["_44" /* ɵnov */](_v, 11).transform("core.settings.colorscheme")); _ck(_v, 10, 0, currVal_0); var currVal_1 = core["_44" /* ɵnov */](_v, 14)._disabled; var currVal_2 = core["_44" /* ɵnov */](_v, 19).ngClassUntouched; var currVal_3 = core["_44" /* ɵnov */](_v, 19).ngClassTouched; var currVal_4 = core["_44" /* ɵnov */](_v, 19).ngClassPristine; var currVal_5 = core["_44" /* ɵnov */](_v, 19).ngClassDirty; var currVal_6 = core["_44" /* ɵnov */](_v, 19).ngClassValid; var currVal_7 = core["_44" /* ɵnov */](_v, 19).ngClassInvalid; var currVal_8 = core["_44" /* ɵnov */](_v, 19).ngClassPending; _ck(_v, 13, 0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8); }); }
function View_CoreSettingsGeneralPage_5(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 25, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config_config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 14, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 15, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 16, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n        "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 1, 10, "ion-label", [], null, null, null, null, null)), core["_30" /* ɵdid */](8, 16384, [[14, 4]], 0, label["a" /* Label */], [config_config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, null], [8, null], [8, null]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](10, 0, null, null, 2, "h2", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](11, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](14, 0, null, null, 2, "p", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](15, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n        "])), (_l()(), core["_31" /* ɵeld */](19, 0, null, 4, 5, "ion-toggle", [], [[2, "toggle-disabled", null], [2, "toggle-checked", null], [2, "toggle-activated", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "keyup"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("keyup" === en)) {
        var pd_0 = (core["_44" /* ɵnov */](_v, 20)._keyup($event) !== false);
        ad = (pd_0 && ad);
    } if (("ngModelChange" === en)) {
        var pd_1 = ((_co.richTextEditor = $event) !== false);
        ad = (pd_1 && ad);
    } if (("ngModelChange" === en)) {
        var pd_2 = (_co.richTextEditorChanged() !== false);
        ad = (pd_2 && ad);
    } return ad; }, toggle_ngfactory["b" /* View_Toggle_0 */], toggle_ngfactory["a" /* RenderType_Toggle */])), core["_30" /* ɵdid */](20, 1228800, null, 0, toggle["a" /* Toggle */], [util_form["a" /* Form */], config_config["a" /* Config */], platform["a" /* Platform */], core["t" /* ElementRef */], core["V" /* Renderer */], haptic["a" /* Haptic */], [2, item["a" /* Item */]], gesture_controller["l" /* GestureController */], dom_controller["a" /* DomController */], core["M" /* NgZone */]], null, null), core["_50" /* ɵprd */](1024, null, esm5_forms["l" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [toggle["a" /* Toggle */]]), core["_30" /* ɵdid */](22, 671744, null, 0, esm5_forms["q" /* NgModel */], [[8, null], [8, null], [8, null], [2, esm5_forms["l" /* NG_VALUE_ACCESSOR */]]], { model: [0, "model"] }, { update: "ngModelChange" }), core["_50" /* ɵprd */](2048, null, esm5_forms["m" /* NgControl */], null, [esm5_forms["q" /* NgModel */]]), core["_30" /* ɵdid */](24, 16384, null, 0, esm5_forms["n" /* NgControlStatus */], [esm5_forms["m" /* NgControl */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n    "]))], function (_ck, _v) { var _co = _v.component; var currVal_12 = _co.richTextEditor; _ck(_v, 22, 0, currVal_12); }, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 11, 0, core["_44" /* ɵnov */](_v, 12).transform("core.settings.enablerichtexteditor")); _ck(_v, 11, 0, currVal_0); var currVal_1 = core["_56" /* ɵunv */](_v, 15, 0, core["_44" /* ɵnov */](_v, 16).transform("core.settings.enablerichtexteditordescription")); _ck(_v, 15, 0, currVal_1); var currVal_2 = core["_44" /* ɵnov */](_v, 20)._disabled; var currVal_3 = core["_44" /* ɵnov */](_v, 20)._value; var currVal_4 = core["_44" /* ɵnov */](_v, 20)._activated; var currVal_5 = core["_44" /* ɵnov */](_v, 24).ngClassUntouched; var currVal_6 = core["_44" /* ɵnov */](_v, 24).ngClassTouched; var currVal_7 = core["_44" /* ɵnov */](_v, 24).ngClassPristine; var currVal_8 = core["_44" /* ɵnov */](_v, 24).ngClassDirty; var currVal_9 = core["_44" /* ɵnov */](_v, 24).ngClassValid; var currVal_10 = core["_44" /* ɵnov */](_v, 24).ngClassInvalid; var currVal_11 = core["_44" /* ɵnov */](_v, 24).ngClassPending; _ck(_v, 19, 0, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8, currVal_9, currVal_10, currVal_11); }); }
function View_CoreSettingsGeneralPage_6(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 25, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config_config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 20, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 21, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 22, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n        "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 1, 10, "ion-label", [], null, null, null, null, null)), core["_30" /* ɵdid */](8, 16384, [[20, 4]], 0, label["a" /* Label */], [config_config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, null], [8, null], [8, null]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](10, 0, null, null, 2, "h2", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](11, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](14, 0, null, null, 2, "p", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](15, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n        "])), (_l()(), core["_31" /* ɵeld */](19, 0, null, 4, 5, "ion-toggle", [], [[2, "toggle-disabled", null], [2, "toggle-checked", null], [2, "toggle-activated", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "keyup"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("keyup" === en)) {
        var pd_0 = (core["_44" /* ɵnov */](_v, 20)._keyup($event) !== false);
        ad = (pd_0 && ad);
    } if (("ngModelChange" === en)) {
        var pd_1 = ((_co.analyticsEnabled = $event) !== false);
        ad = (pd_1 && ad);
    } if (("ngModelChange" === en)) {
        var pd_2 = (_co.analyticsEnabledChanged() !== false);
        ad = (pd_2 && ad);
    } return ad; }, toggle_ngfactory["b" /* View_Toggle_0 */], toggle_ngfactory["a" /* RenderType_Toggle */])), core["_30" /* ɵdid */](20, 1228800, null, 0, toggle["a" /* Toggle */], [util_form["a" /* Form */], config_config["a" /* Config */], platform["a" /* Platform */], core["t" /* ElementRef */], core["V" /* Renderer */], haptic["a" /* Haptic */], [2, item["a" /* Item */]], gesture_controller["l" /* GestureController */], dom_controller["a" /* DomController */], core["M" /* NgZone */]], null, null), core["_50" /* ɵprd */](1024, null, esm5_forms["l" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [toggle["a" /* Toggle */]]), core["_30" /* ɵdid */](22, 671744, null, 0, esm5_forms["q" /* NgModel */], [[8, null], [8, null], [8, null], [2, esm5_forms["l" /* NG_VALUE_ACCESSOR */]]], { model: [0, "model"] }, { update: "ngModelChange" }), core["_50" /* ɵprd */](2048, null, esm5_forms["m" /* NgControl */], null, [esm5_forms["q" /* NgModel */]]), core["_30" /* ɵdid */](24, 16384, null, 0, esm5_forms["n" /* NgControlStatus */], [esm5_forms["m" /* NgControl */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n    "]))], function (_ck, _v) { var _co = _v.component; var currVal_12 = _co.analyticsEnabled; _ck(_v, 22, 0, currVal_12); }, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 11, 0, core["_44" /* ɵnov */](_v, 12).transform("core.settings.enablefirebaseanalytics")); _ck(_v, 11, 0, currVal_0); var currVal_1 = core["_56" /* ɵunv */](_v, 15, 0, core["_44" /* ɵnov */](_v, 16).transform("core.settings.enablefirebaseanalyticsdescription")); _ck(_v, 15, 0, currVal_1); var currVal_2 = core["_44" /* ɵnov */](_v, 20)._disabled; var currVal_3 = core["_44" /* ɵnov */](_v, 20)._value; var currVal_4 = core["_44" /* ɵnov */](_v, 20)._activated; var currVal_5 = core["_44" /* ɵnov */](_v, 24).ngClassUntouched; var currVal_6 = core["_44" /* ɵnov */](_v, 24).ngClassTouched; var currVal_7 = core["_44" /* ɵnov */](_v, 24).ngClassPristine; var currVal_8 = core["_44" /* ɵnov */](_v, 24).ngClassDirty; var currVal_9 = core["_44" /* ɵnov */](_v, 24).ngClassValid; var currVal_10 = core["_44" /* ɵnov */](_v, 24).ngClassInvalid; var currVal_11 = core["_44" /* ɵnov */](_v, 24).ngClassPending; _ck(_v, 19, 0, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8, currVal_9, currVal_10, currVal_11); }); }
function View_CoreSettingsGeneralPage_0(_l) { return core["_57" /* ɵvid */](0, [core["_52" /* ɵqud */](402653184, 1, { segment: 0 }), (_l()(), core["_31" /* ɵeld */](1, 0, null, null, 12, "ion-header", [], null, null, null, null, null)), core["_30" /* ɵdid */](2, 16384, null, 0, toolbar_header["a" /* Header */], [config_config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, view_controller["a" /* ViewController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_31" /* ɵeld */](4, 0, null, null, 8, "ion-navbar", [["class", "toolbar"], ["core-back-button", ""]], [[8, "hidden", 0], [2, "statusbar-padding", null]], null, null, navbar_ngfactory["b" /* View_Navbar_0 */], navbar_ngfactory["a" /* RenderType_Navbar */])), core["_30" /* ɵdid */](5, 49152, null, 0, navbar["a" /* Navbar */], [app_app["a" /* App */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]], config_config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_30" /* ɵdid */](6, 212992, null, 0, back_button["a" /* CoreBackButtonDirective */], [navbar["a" /* Navbar */], platform["a" /* Platform */], translate_service["a" /* TranslateService */], events["a" /* CoreEventsProvider */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n        "])), (_l()(), core["_31" /* ɵeld */](8, 0, null, 3, 3, "ion-title", [], null, null, null, toolbar_title_ngfactory["b" /* View_ToolbarTitle_0 */], toolbar_title_ngfactory["a" /* RenderType_ToolbarTitle */])), core["_30" /* ɵdid */](9, 49152, null, 0, toolbar_title["a" /* ToolbarTitle */], [config_config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), (_l()(), core["_55" /* ɵted */](10, 0, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_31" /* ɵeld */](15, 0, null, null, 89, "ion-content", [], [[2, "statusbar-padding", null], [2, "has-refresher", null]], null, null, content_ngfactory["b" /* View_Content_0 */], content_ngfactory["a" /* RenderType_Content */])), core["_30" /* ɵdid */](16, 4374528, null, 0, content["a" /* Content */], [config_config["a" /* Config */], platform["a" /* Platform */], dom_controller["a" /* DomController */], core["t" /* ElementRef */], core["V" /* Renderer */], app_app["a" /* App */], keyboard["a" /* Keyboard */], core["M" /* NgZone */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n    "])), (_l()(), core["_31" /* ɵeld */](18, 0, null, 1, 24, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](19, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config_config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 2, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 3, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 4, { _icons: 1 }), core["_30" /* ɵdid */](23, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n        "])), (_l()(), core["_31" /* ɵeld */](25, 0, null, 1, 4, "ion-label", [], null, null, null, null, null)), core["_30" /* ɵdid */](26, 16384, [[2, 4]], 0, label["a" /* Label */], [config_config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, null], [8, null], [8, null]], null, null), (_l()(), core["_31" /* ɵeld */](27, 0, null, null, 2, "h2", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](28, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n        "])), (_l()(), core["_31" /* ɵeld */](31, 0, null, 3, 10, "ion-select", [["interface", "action-sheet"]], [[2, "select-disabled", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "click"], [null, "keyup.space"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (core["_44" /* ɵnov */](_v, 32)._click($event) !== false);
        ad = (pd_0 && ad);
    } if (("keyup.space" === en)) {
        var pd_1 = (core["_44" /* ɵnov */](_v, 32)._keyup() !== false);
        ad = (pd_1 && ad);
    } if (("ngModelChange" === en)) {
        var pd_2 = ((_co.selectedLanguage = $event) !== false);
        ad = (pd_2 && ad);
    } if (("ngModelChange" === en)) {
        var pd_3 = (_co.languageChanged() !== false);
        ad = (pd_3 && ad);
    } return ad; }, select_ngfactory["b" /* View_Select_0 */], select_ngfactory["a" /* RenderType_Select */])), core["_30" /* ɵdid */](32, 1228800, null, 1, select_select["a" /* Select */], [app_app["a" /* App */], util_form["a" /* Form */], config_config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item["a" /* Item */]], deep_linker["a" /* DeepLinker */]], { interface: [0, "interface"] }, null), core["_52" /* ɵqud */](603979776, 5, { options: 1 }), core["_50" /* ɵprd */](1024, null, esm5_forms["l" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [select_select["a" /* Select */]]), core["_30" /* ɵdid */](35, 671744, null, 0, esm5_forms["q" /* NgModel */], [[8, null], [8, null], [8, null], [2, esm5_forms["l" /* NG_VALUE_ACCESSOR */]]], { model: [0, "model"] }, { update: "ngModelChange" }), core["_50" /* ɵprd */](2048, null, esm5_forms["m" /* NgControl */], null, [esm5_forms["q" /* NgModel */]]), core["_30" /* ɵdid */](37, 16384, null, 0, esm5_forms["n" /* NgControlStatus */], [esm5_forms["m" /* NgControl */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreSettingsGeneralPage_1)), core["_30" /* ɵdid */](40, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n    "])), (_l()(), core["_31" /* ɵeld */](44, 0, null, 1, 23, "ion-item", [["class", "core-settings-general-font-size item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](45, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config_config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 6, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 7, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 8, { _icons: 1 }), core["_30" /* ɵdid */](49, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n        "])), (_l()(), core["_31" /* ɵeld */](51, 0, null, 1, 4, "ion-label", [], null, null, null, null, null)), core["_30" /* ɵdid */](52, 16384, [[6, 4]], 0, label["a" /* Label */], [config_config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, null], [8, null], [8, null]], null, null), (_l()(), core["_31" /* ɵeld */](53, 0, null, null, 2, "h2", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](54, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n        "])), (_l()(), core["_31" /* ɵeld */](57, 0, null, 3, 9, "ion-segment", [["color", "primary"], ["item-content", ""]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "segment-disabled", null]], [[null, "ngModelChange"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("ngModelChange" === en)) {
        var pd_0 = ((_co.selectedFontSize = $event) !== false);
        ad = (pd_0 && ad);
    } if (("ngModelChange" === en)) {
        var pd_1 = (_co.fontSizeChanged() !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), core["_30" /* ɵdid */](58, 671744, null, 0, esm5_forms["q" /* NgModel */], [[8, null], [8, null], [8, null], [8, null]], { model: [0, "model"] }, { update: "ngModelChange" }), core["_50" /* ɵprd */](2048, null, esm5_forms["m" /* NgControl */], null, [esm5_forms["q" /* NgModel */]]), core["_30" /* ɵdid */](60, 16384, null, 0, esm5_forms["n" /* NgControlStatus */], [esm5_forms["m" /* NgControl */]], null, null), core["_30" /* ɵdid */](61, 1196032, [[1, 4]], 1, segment["a" /* Segment */], [config_config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, esm5_forms["m" /* NgControl */]]], { color: [0, "color"] }, null), core["_52" /* ɵqud */](603979776, 9, { _buttons: 1 }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreSettingsGeneralPage_2)), core["_30" /* ɵdid */](65, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n    "])), (_l()(), core["_26" /* ɵand */](16777216, null, 1, 1, null, View_CoreSettingsGeneralPage_3)), core["_30" /* ɵdid */](70, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n    "])), (_l()(), core["_26" /* ɵand */](16777216, null, 1, 1, null, View_CoreSettingsGeneralPage_5)), core["_30" /* ɵdid */](73, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n    "])), (_l()(), core["_31" /* ɵeld */](75, 0, null, 1, 25, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](76, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config_config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 17, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 18, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 19, { _icons: 1 }), core["_30" /* ɵdid */](80, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n        "])), (_l()(), core["_31" /* ɵeld */](82, 0, null, 1, 10, "ion-label", [], null, null, null, null, null)), core["_30" /* ɵdid */](83, 16384, [[17, 4]], 0, label["a" /* Label */], [config_config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, null], [8, null], [8, null]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](85, 0, null, null, 2, "h2", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](86, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](89, 0, null, null, 2, "p", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](90, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n        "])), (_l()(), core["_31" /* ɵeld */](94, 0, null, 4, 5, "ion-toggle", [], [[2, "toggle-disabled", null], [2, "toggle-checked", null], [2, "toggle-activated", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "keyup"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("keyup" === en)) {
        var pd_0 = (core["_44" /* ɵnov */](_v, 95)._keyup($event) !== false);
        ad = (pd_0 && ad);
    } if (("ngModelChange" === en)) {
        var pd_1 = ((_co.debugDisplay = $event) !== false);
        ad = (pd_1 && ad);
    } if (("ngModelChange" === en)) {
        var pd_2 = (_co.debugDisplayChanged() !== false);
        ad = (pd_2 && ad);
    } return ad; }, toggle_ngfactory["b" /* View_Toggle_0 */], toggle_ngfactory["a" /* RenderType_Toggle */])), core["_30" /* ɵdid */](95, 1228800, null, 0, toggle["a" /* Toggle */], [util_form["a" /* Form */], config_config["a" /* Config */], platform["a" /* Platform */], core["t" /* ElementRef */], core["V" /* Renderer */], haptic["a" /* Haptic */], [2, item["a" /* Item */]], gesture_controller["l" /* GestureController */], dom_controller["a" /* DomController */], core["M" /* NgZone */]], null, null), core["_50" /* ɵprd */](1024, null, esm5_forms["l" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [toggle["a" /* Toggle */]]), core["_30" /* ɵdid */](97, 671744, null, 0, esm5_forms["q" /* NgModel */], [[8, null], [8, null], [8, null], [2, esm5_forms["l" /* NG_VALUE_ACCESSOR */]]], { model: [0, "model"] }, { update: "ngModelChange" }), core["_50" /* ɵprd */](2048, null, esm5_forms["m" /* NgControl */], null, [esm5_forms["q" /* NgModel */]]), core["_30" /* ɵdid */](99, 16384, null, 0, esm5_forms["n" /* NgControlStatus */], [esm5_forms["m" /* NgControl */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n    "])), (_l()(), core["_26" /* ɵand */](16777216, null, 1, 1, null, View_CoreSettingsGeneralPage_6)), core["_30" /* ɵdid */](103, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; _ck(_v, 6, 0); var currVal_14 = "action-sheet"; _ck(_v, 32, 0, currVal_14); var currVal_15 = _co.selectedLanguage; _ck(_v, 35, 0, currVal_15); var currVal_16 = _co.languages; _ck(_v, 40, 0, currVal_16); var currVal_26 = _co.selectedFontSize; _ck(_v, 58, 0, currVal_26); var currVal_27 = "primary"; _ck(_v, 61, 0, currVal_27); var currVal_28 = _co.fontSizes; _ck(_v, 65, 0, currVal_28); var currVal_29 = (_co.colorSchemes.length > 0); _ck(_v, 70, 0, currVal_29); var currVal_30 = _co.rteSupported; _ck(_v, 73, 0, currVal_30); var currVal_43 = _co.debugDisplay; _ck(_v, 97, 0, currVal_43); var currVal_44 = _co.analyticsSupported; _ck(_v, 103, 0, currVal_44); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 5)._hidden; var currVal_1 = core["_44" /* ɵnov */](_v, 5)._sbPadding; _ck(_v, 4, 0, currVal_0, currVal_1); var currVal_2 = core["_56" /* ɵunv */](_v, 10, 0, core["_44" /* ɵnov */](_v, 11).transform("core.settings.general")); _ck(_v, 10, 0, currVal_2); var currVal_3 = core["_44" /* ɵnov */](_v, 16).statusbarPadding; var currVal_4 = core["_44" /* ɵnov */](_v, 16)._hasRefresher; _ck(_v, 15, 0, currVal_3, currVal_4); var currVal_5 = core["_56" /* ɵunv */](_v, 28, 0, core["_44" /* ɵnov */](_v, 29).transform("core.settings.language")); _ck(_v, 28, 0, currVal_5); var currVal_6 = core["_44" /* ɵnov */](_v, 32)._disabled; var currVal_7 = core["_44" /* ɵnov */](_v, 37).ngClassUntouched; var currVal_8 = core["_44" /* ɵnov */](_v, 37).ngClassTouched; var currVal_9 = core["_44" /* ɵnov */](_v, 37).ngClassPristine; var currVal_10 = core["_44" /* ɵnov */](_v, 37).ngClassDirty; var currVal_11 = core["_44" /* ɵnov */](_v, 37).ngClassValid; var currVal_12 = core["_44" /* ɵnov */](_v, 37).ngClassInvalid; var currVal_13 = core["_44" /* ɵnov */](_v, 37).ngClassPending; _ck(_v, 31, 0, currVal_6, currVal_7, currVal_8, currVal_9, currVal_10, currVal_11, currVal_12, currVal_13); var currVal_17 = core["_56" /* ɵunv */](_v, 54, 0, core["_44" /* ɵnov */](_v, 55).transform("core.settings.fontsize")); _ck(_v, 54, 0, currVal_17); var currVal_18 = core["_44" /* ɵnov */](_v, 60).ngClassUntouched; var currVal_19 = core["_44" /* ɵnov */](_v, 60).ngClassTouched; var currVal_20 = core["_44" /* ɵnov */](_v, 60).ngClassPristine; var currVal_21 = core["_44" /* ɵnov */](_v, 60).ngClassDirty; var currVal_22 = core["_44" /* ɵnov */](_v, 60).ngClassValid; var currVal_23 = core["_44" /* ɵnov */](_v, 60).ngClassInvalid; var currVal_24 = core["_44" /* ɵnov */](_v, 60).ngClassPending; var currVal_25 = core["_44" /* ɵnov */](_v, 61)._disabled; _ck(_v, 57, 0, currVal_18, currVal_19, currVal_20, currVal_21, currVal_22, currVal_23, currVal_24, currVal_25); var currVal_31 = core["_56" /* ɵunv */](_v, 86, 0, core["_44" /* ɵnov */](_v, 87).transform("core.settings.debugdisplay")); _ck(_v, 86, 0, currVal_31); var currVal_32 = core["_56" /* ɵunv */](_v, 90, 0, core["_44" /* ɵnov */](_v, 91).transform("core.settings.debugdisplaydescription")); _ck(_v, 90, 0, currVal_32); var currVal_33 = core["_44" /* ɵnov */](_v, 95)._disabled; var currVal_34 = core["_44" /* ɵnov */](_v, 95)._value; var currVal_35 = core["_44" /* ɵnov */](_v, 95)._activated; var currVal_36 = core["_44" /* ɵnov */](_v, 99).ngClassUntouched; var currVal_37 = core["_44" /* ɵnov */](_v, 99).ngClassTouched; var currVal_38 = core["_44" /* ɵnov */](_v, 99).ngClassPristine; var currVal_39 = core["_44" /* ɵnov */](_v, 99).ngClassDirty; var currVal_40 = core["_44" /* ɵnov */](_v, 99).ngClassValid; var currVal_41 = core["_44" /* ɵnov */](_v, 99).ngClassInvalid; var currVal_42 = core["_44" /* ɵnov */](_v, 99).ngClassPending; _ck(_v, 94, 0, currVal_33, currVal_34, currVal_35, currVal_36, currVal_37, currVal_38, currVal_39, currVal_40, currVal_41, currVal_42); }); }
function View_CoreSettingsGeneralPage_Host_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "page-core-settings-general", [], null, null, null, View_CoreSettingsGeneralPage_0, RenderType_CoreSettingsGeneralPage)), core["_30" /* ɵdid */](1, 49152, null, 0, general_CoreSettingsGeneralPage, [app["a" /* CoreAppProvider */], config["a" /* CoreConfigProvider */], file["a" /* CoreFileProvider */], events["a" /* CoreEventsProvider */], lang["a" /* CoreLangProvider */], dom["a" /* CoreDomUtilsProvider */], pushnotifications["a" /* CorePushNotificationsProvider */], local_notifications["a" /* CoreLocalNotificationsProvider */], helper["a" /* CoreSettingsHelper */]], null, null)], null, null); }
var CoreSettingsGeneralPageNgFactory = core["_27" /* ɵccf */]("page-core-settings-general", general_CoreSettingsGeneralPage, View_CoreSettingsGeneralPage_Host_0, {}, {}, []);

//# sourceMappingURL=general.ngfactory.js.map
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

// CONCATENATED MODULE: ./src/core/settings/pages/general/general.module.ngfactory.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoreSettingsGeneralPageModuleNgFactory", function() { return CoreSettingsGeneralPageModuleNgFactory; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 































var CoreSettingsGeneralPageModuleNgFactory = core["_28" /* ɵcmf */](general_module_CoreSettingsGeneralPageModule, [], function (_l) { return core["_40" /* ɵmod */]([core["_41" /* ɵmpd */](512, core["o" /* ComponentFactoryResolver */], core["_21" /* ɵCodegenComponentFactoryResolver */], [[8, [action_sheet_component_ngfactory["a" /* ActionSheetCmpNgFactory */], alert_component_ngfactory["a" /* AlertCmpNgFactory */], app_root_ngfactory["a" /* IonicAppNgFactory */], loading_component_ngfactory["a" /* LoadingCmpNgFactory */], modal_component_ngfactory["a" /* ModalCmpNgFactory */], picker_component_ngfactory["a" /* PickerCmpNgFactory */], popover_component_ngfactory["a" /* PopoverCmpNgFactory */], select_popover_component_ngfactory["a" /* SelectPopoverNgFactory */], toast_component_ngfactory["a" /* ToastCmpNgFactory */], context_menu_popover_ngfactory["a" /* CoreContextMenuPopoverComponentNgFactory */], course_picker_menu_popover_ngfactory["a" /* CoreCoursePickerMenuPopoverComponentNgFactory */], recaptchamodal_ngfactory["a" /* CoreRecaptchaModalComponentNgFactory */], bs_tooltip_ngfactory["a" /* CoreBSTooltipComponentNgFactory */], CoreSettingsGeneralPageNgFactory]], [3, core["o" /* ComponentFactoryResolver */]], core["K" /* NgModuleRef */]]), core["_41" /* ɵmpd */](4608, common["m" /* NgLocalization */], common["l" /* NgLocaleLocalization */], [core["G" /* LOCALE_ID */], [2, common["w" /* ɵa */]]]), core["_41" /* ɵmpd */](4608, esm5_forms["x" /* ɵi */], esm5_forms["x" /* ɵi */], []), core["_41" /* ɵmpd */](4608, esm5_forms["d" /* FormBuilder */], esm5_forms["d" /* FormBuilder */], []), core["_41" /* ɵmpd */](4608, translate_loader["b" /* TranslateLoader */], translate_loader["a" /* TranslateFakeLoader */], []), core["_41" /* ɵmpd */](4608, translate_compiler["a" /* TranslateCompiler */], translate_compiler["b" /* TranslateFakeCompiler */], []), core["_41" /* ɵmpd */](4608, translate_parser["b" /* TranslateParser */], translate_parser["a" /* TranslateDefaultParser */], []), core["_41" /* ɵmpd */](4608, missing_translation_handler["b" /* MissingTranslationHandler */], missing_translation_handler["a" /* FakeMissingTranslationHandler */], []), core["_41" /* ɵmpd */](4608, translate_service["a" /* TranslateService */], translate_service["a" /* TranslateService */], [translate_store["a" /* TranslateStore */], translate_loader["b" /* TranslateLoader */], translate_compiler["a" /* TranslateCompiler */], translate_parser["b" /* TranslateParser */], missing_translation_handler["b" /* MissingTranslationHandler */], translate_service["b" /* USE_DEFAULT_LANG */], translate_service["c" /* USE_STORE */]]), core["_41" /* ɵmpd */](512, common["b" /* CommonModule */], common["b" /* CommonModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["v" /* ɵba */], esm5_forms["v" /* ɵba */], []), core["_41" /* ɵmpd */](512, esm5_forms["i" /* FormsModule */], esm5_forms["i" /* FormsModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["s" /* ReactiveFormsModule */], esm5_forms["s" /* ReactiveFormsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["a" /* IonicModule */], ionic_angular_module["a" /* IonicModule */], []), core["_41" /* ɵmpd */](512, _ngx_translate_core["b" /* TranslateModule */], _ngx_translate_core["b" /* TranslateModule */], []), core["_41" /* ɵmpd */](512, directives_module["a" /* CoreDirectivesModule */], directives_module["a" /* CoreDirectivesModule */], []), core["_41" /* ɵmpd */](512, pipes_module["a" /* CorePipesModule */], pipes_module["a" /* CorePipesModule */], []), core["_41" /* ɵmpd */](512, components_module["a" /* CoreComponentsModule */], components_module["a" /* CoreComponentsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["b" /* IonicPageModule */], ionic_angular_module["b" /* IonicPageModule */], []), core["_41" /* ɵmpd */](512, general_module_CoreSettingsGeneralPageModule, general_module_CoreSettingsGeneralPageModule, []), core["_41" /* ɵmpd */](256, translate_service["c" /* USE_STORE */], undefined, []), core["_41" /* ɵmpd */](256, translate_service["b" /* USE_DEFAULT_LANG */], undefined, []), core["_41" /* ɵmpd */](256, module_loader["a" /* LAZY_LOADED_TOKEN */], general_CoreSettingsGeneralPage, [])]); });

//# sourceMappingURL=general.module.ngfactory.js.map

/***/ })

});
//# sourceMappingURL=42.js.map