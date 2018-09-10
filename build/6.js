webpackJsonp([6],{

/***/ 1772:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/@angular/core/esm5/core.js
var core = __webpack_require__(0);

// EXTERNAL MODULE: ./node_modules/ionic-angular/index.js + 3 modules
var ionic_angular = __webpack_require__(9);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/index.js + 1 modules
var _ngx_translate_core = __webpack_require__(4);

// EXTERNAL MODULE: ./src/addon/messages/providers/messages.ts
var messages = __webpack_require__(168);

// EXTERNAL MODULE: ./src/core/user/providers/user.ts
var user = __webpack_require__(44);

// EXTERNAL MODULE: ./src/providers/utils/dom.ts
var dom = __webpack_require__(3);

// CONCATENATED MODULE: ./src/addon/messages/pages/settings/settings.ts
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
 * Page that displays the messages settings page.
 */
var settings_AddonMessagesSettingsPage = /** @class */ (function () {
    function AddonMessagesSettingsPage(messagesProvider, domUtils, userProvider) {
        this.messagesProvider = messagesProvider;
        this.domUtils = domUtils;
        this.userProvider = userProvider;
        this.blockNonContactsState = false;
    }
    /**
     * Runs when the page has loaded. This event only happens once per page being created.
     * If a page leaves but is cached, then this event will not fire again on a subsequent viewing.
     * Setup code for the page.
     */
    AddonMessagesSettingsPage.prototype.ionViewDidLoad = function () {
        this.fetchPreferences();
    };
    /**
     * Fetches preference data.
     *
     * @return {Promise<any>} Resolved when done.
     */
    AddonMessagesSettingsPage.prototype.fetchPreferences = function () {
        var _this = this;
        return this.messagesProvider.getMessagePreferences().then(function (preferences) {
            _this.preferences = preferences;
            _this.blockNonContactsState = preferences.blocknoncontacts;
        }).catch(function (message) {
            _this.domUtils.showErrorModal(message);
        }).finally(function () {
            _this.preferencesLoaded = true;
        });
    };
    /**
     * Update preferences. The purpose is to store the updated data, it won't be reflected in the view.
     */
    AddonMessagesSettingsPage.prototype.updatePreferences = function () {
        var _this = this;
        this.messagesProvider.invalidateMessagePreferences().finally(function () {
            _this.fetchPreferences();
        });
    };
    /**
     * Update preferences after a certain time. The purpose is to store the updated data, it won't be reflected in the view.
     */
    AddonMessagesSettingsPage.prototype.updatePreferencesAfterDelay = function () {
        var _this = this;
        // Cancel pending updates.
        clearTimeout(this.updateTimeout);
        this.updateTimeout = setTimeout(function () {
            _this.updateTimeout = null;
            _this.updatePreferences();
        }, 5000);
    };
    /**
     * Block non contacts.
     *
     * @param {boolean} block If it should be blocked or not.
     */
    AddonMessagesSettingsPage.prototype.blockNonContacts = function (block) {
        var _this = this;
        var modal = this.domUtils.showModalLoading('core.sending', true);
        this.userProvider.updateUserPreference('message_blocknoncontacts', block ? 1 : 0).then(function () {
            // Update the preferences since they were modified.
            _this.updatePreferencesAfterDelay();
        }).catch(function (message) {
            // Show error and revert change.
            _this.domUtils.showErrorModal(message);
            _this.blockNonContactsState = !_this.blockNonContactsState;
        }).finally(function () {
            modal.dismiss();
        });
    };
    /**
     * Change the value of a certain preference.
     *
     * @param {any}    notification Notification object.
     * @param {string} state        State name, ['loggedin', 'loggedoff'].
     * @param {any}    processor    Notification processor.
     */
    AddonMessagesSettingsPage.prototype.changePreference = function (notification, state, processor) {
        var _this = this;
        var processorState = processor[state], preferenceName = notification.preferencekey + '_' + processorState.name, valueArray = [];
        var value = 'none';
        notification.processors.forEach(function (processor) {
            if (processor[state].checked) {
                valueArray.push(processor.name);
            }
        });
        if (value.length > 0) {
            value = valueArray.join(',');
        }
        if (!notification.updating) {
            notification.updating = {};
        }
        notification.updating[state] = true;
        this.userProvider.updateUserPreference(preferenceName, value).then(function () {
            // Update the preferences since they were modified.
            _this.updatePreferencesAfterDelay();
        }).catch(function (message) {
            // Show error and revert change.
            _this.domUtils.showErrorModal(message);
            processorState.checked = !processorState.checked;
        }).finally(function () {
            notification.updating[state] = false;
        });
    };
    /**
     * Refresh the list of preferences.
     *
     * @param {any} refresher Refresher.
     */
    AddonMessagesSettingsPage.prototype.refreshEvent = function (refresher) {
        var _this = this;
        this.messagesProvider.invalidateMessagePreferences().finally(function () {
            _this.fetchPreferences().finally(function () {
                refresher.complete();
            });
        });
    };
    /**
     * Page destroyed.
     */
    AddonMessagesSettingsPage.prototype.ngOnDestroy = function () {
        // If there is a pending action to update preferences, execute it right now.
        if (this.updateTimeout) {
            clearTimeout(this.updateTimeout);
            this.updatePreferences();
        }
    };
    AddonMessagesSettingsPage = __decorate([
        Object(core["m" /* Component */])({
            selector: 'page-addon-messages-settings',
            templateUrl: 'settings.html',
        }),
        __metadata("design:paramtypes", [messages["a" /* AddonMessagesProvider */], dom["a" /* CoreDomUtilsProvider */],
            user["a" /* CoreUserProvider */]])
    ], AddonMessagesSettingsPage);
    return AddonMessagesSettingsPage;
}());

//# sourceMappingURL=settings.js.map
// EXTERNAL MODULE: ./src/components/components.module.ts
var components_module = __webpack_require__(32);

// EXTERNAL MODULE: ./src/directives/directives.module.ts + 2 modules
var directives_module = __webpack_require__(28);

// EXTERNAL MODULE: ./src/addon/messages/components/components.module.ts
var components_components_module = __webpack_require__(1880);

// CONCATENATED MODULE: ./src/addon/messages/pages/settings/settings.module.ts
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
var settings_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var settings_module_AddonMessagesSettingsPageModule = /** @class */ (function () {
    function AddonMessagesSettingsPageModule() {
    }
    AddonMessagesSettingsPageModule = settings_module___decorate([
        Object(core["I" /* NgModule */])({
            declarations: [
                settings_AddonMessagesSettingsPage,
            ],
            imports: [
                components_module["a" /* CoreComponentsModule */],
                directives_module["a" /* CoreDirectivesModule */],
                components_components_module["a" /* AddonMessagesComponentsModule */],
                ionic_angular["l" /* IonicPageModule */].forChild(settings_AddonMessagesSettingsPage),
                _ngx_translate_core["b" /* TranslateModule */].forChild()
            ],
        })
    ], AddonMessagesSettingsPageModule);
    return AddonMessagesSettingsPageModule;
}());

//# sourceMappingURL=settings.module.js.map
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

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toggle/toggle.ngfactory.js
var toggle_ngfactory = __webpack_require__(1874);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toggle/toggle.js + 1 modules
var toggle = __webpack_require__(633);

// EXTERNAL MODULE: ./node_modules/ionic-angular/util/form.js
var util_form = __webpack_require__(19);

// EXTERNAL MODULE: ./node_modules/ionic-angular/config/config.js
var config = __webpack_require__(6);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/platform.js + 1 modules
var platform = __webpack_require__(14);

// EXTERNAL MODULE: ./node_modules/ionic-angular/tap-click/haptic.js
var haptic = __webpack_require__(193);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item.js
var item = __webpack_require__(20);

// EXTERNAL MODULE: ./node_modules/ionic-angular/gestures/gesture-controller.js
var gesture_controller = __webpack_require__(36);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/dom-controller.js
var dom_controller = __webpack_require__(25);

// EXTERNAL MODULE: ./node_modules/@angular/forms/esm5/forms.js
var esm5_forms = __webpack_require__(18);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.pipe.js
var translate_pipe = __webpack_require__(29);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.service.js
var translate_service = __webpack_require__(17);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/grid/col.js
var col = __webpack_require__(114);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/spinner/spinner.ngfactory.js
var spinner_ngfactory = __webpack_require__(180);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/spinner/spinner.js
var spinner = __webpack_require__(134);

// EXTERNAL MODULE: ./node_modules/@angular/common/esm5/common.js
var common = __webpack_require__(8);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/note/note.js
var note = __webpack_require__(215);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item.ngfactory.js + 1 modules
var item_ngfactory = __webpack_require__(33);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-reorder.js + 1 modules
var item_reorder = __webpack_require__(27);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-content.js
var item_content = __webpack_require__(30);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/label/label.js
var label = __webpack_require__(60);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/grid/row.js
var row = __webpack_require__(115);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/list/list-header.js
var list_header = __webpack_require__(270);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/card/card.js
var card = __webpack_require__(90);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-divider.js
var item_divider = __webpack_require__(163);

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

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-controller.js
var nav_controller = __webpack_require__(21);

// EXTERNAL MODULE: ./src/directives/back-button.ts
var back_button = __webpack_require__(632);

// EXTERNAL MODULE: ./src/providers/events.ts
var events = __webpack_require__(12);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.ngfactory.js
var toolbar_title_ngfactory = __webpack_require__(1283);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.js
var toolbar_title = __webpack_require__(324);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar.js
var toolbar = __webpack_require__(236);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.ngfactory.js
var content_ngfactory = __webpack_require__(178);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.js
var content = __webpack_require__(23);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/keyboard.js
var keyboard = __webpack_require__(99);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/refresher/refresher.js
var refresher = __webpack_require__(132);

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

// CONCATENATED MODULE: ./src/addon/messages/pages/settings/settings.ngfactory.js
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 


















































var styles_AddonMessagesSettingsPage = [];
var RenderType_AddonMessagesSettingsPage = core["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_AddonMessagesSettingsPage, data: {} });

function View_AddonMessagesSettingsPage_6(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 6, "ion-toggle", [], [[2, "toggle-disabled", null], [2, "toggle-checked", null], [2, "toggle-activated", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "ionChange"], [null, "keyup"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("keyup" === en)) {
        var pd_0 = (core["_44" /* ɵnov */](_v, 1)._keyup($event) !== false);
        ad = (pd_0 && ad);
    } if (("ngModelChange" === en)) {
        var pd_1 = ((_v.parent.parent.context.$implicit[_v.parent.context.$implicit].checked = $event) !== false);
        ad = (pd_1 && ad);
    } if (("ionChange" === en)) {
        var pd_2 = (_co.changePreference(_v.parent.parent.parent.context.$implicit, _v.parent.context.$implicit, _v.parent.parent.context.$implicit) !== false);
        ad = (pd_2 && ad);
    } return ad; }, toggle_ngfactory["b" /* View_Toggle_0 */], toggle_ngfactory["a" /* RenderType_Toggle */])), core["_30" /* ɵdid */](1, 1228800, null, 0, toggle["a" /* Toggle */], [util_form["a" /* Form */], config["a" /* Config */], platform["a" /* Platform */], core["t" /* ElementRef */], core["V" /* Renderer */], haptic["a" /* Haptic */], [2, item["a" /* Item */]], gesture_controller["l" /* GestureController */], dom_controller["a" /* DomController */], core["M" /* NgZone */]], { disabled: [0, "disabled"] }, { ionChange: "ionChange" }), core["_50" /* ɵprd */](1024, null, esm5_forms["l" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [toggle["a" /* Toggle */]]), core["_30" /* ɵdid */](3, 671744, null, 0, esm5_forms["q" /* NgModel */], [[8, null], [8, null], [8, null], [2, esm5_forms["l" /* NG_VALUE_ACCESSOR */]]], { isDisabled: [0, "isDisabled"], model: [1, "model"] }, { update: "ngModelChange" }), core["_50" /* ɵprd */](2048, null, esm5_forms["m" /* NgControl */], null, [esm5_forms["q" /* NgModel */]]), core["_30" /* ɵdid */](5, 16384, null, 0, esm5_forms["n" /* NgControlStatus */], [esm5_forms["m" /* NgControl */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                                "]))], function (_ck, _v) { var currVal_10 = (_v.parent.parent.context.$implicit.locked || (_v.parent.parent.parent.context.$implicit.updating && _v.parent.parent.parent.context.$implicit.updating[_v.parent.context.$implicit])); _ck(_v, 1, 0, currVal_10); var currVal_11 = (_v.parent.parent.context.$implicit.locked || (_v.parent.parent.parent.context.$implicit.updating && _v.parent.parent.parent.context.$implicit.updating[_v.parent.context.$implicit])); var currVal_12 = _v.parent.parent.context.$implicit[_v.parent.context.$implicit].checked; _ck(_v, 3, 0, currVal_11, currVal_12); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 1)._disabled; var currVal_1 = core["_44" /* ɵnov */](_v, 1)._value; var currVal_2 = core["_44" /* ɵnov */](_v, 1)._activated; var currVal_3 = core["_44" /* ɵnov */](_v, 5).ngClassUntouched; var currVal_4 = core["_44" /* ɵnov */](_v, 5).ngClassTouched; var currVal_5 = core["_44" /* ɵnov */](_v, 5).ngClassPristine; var currVal_6 = core["_44" /* ɵnov */](_v, 5).ngClassDirty; var currVal_7 = core["_44" /* ɵnov */](_v, 5).ngClassValid; var currVal_8 = core["_44" /* ɵnov */](_v, 5).ngClassInvalid; var currVal_9 = core["_44" /* ɵnov */](_v, 5).ngClassPending; _ck(_v, 0, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8, currVal_9); }); }
function View_AddonMessagesSettingsPage_7(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "span", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](1, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], null, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 1, 0, core["_44" /* ɵnov */](_v, 2).transform("core.settings.disabled")); _ck(_v, 1, 0, currVal_0); }); }
function View_AddonMessagesSettingsPage_5(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 13, "ion-col", [["class", "col"], ["col-2", ""], ["text-center", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, col["a" /* Col */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                                "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                                "])), (_l()(), core["_31" /* ɵeld */](4, 0, null, null, 1, "ion-spinner", [], [[8, "hidden", 0], [2, "spinner-paused", null]], null, null, spinner_ngfactory["b" /* View_Spinner_0 */], spinner_ngfactory["a" /* RenderType_Spinner */])), core["_30" /* ɵdid */](5, 114688, null, 0, spinner["a" /* Spinner */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonMessagesSettingsPage_6)), core["_30" /* ɵdid */](8, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                                "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonMessagesSettingsPage_7)), core["_30" /* ɵdid */](12, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                            "]))], function (_ck, _v) { var _co = _v.component; _ck(_v, 5, 0); var currVal_2 = !_co.preferences.disableall; _ck(_v, 8, 0, currVal_2); var currVal_3 = _co.preferences.disableall; _ck(_v, 12, 0, currVal_3); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = (_co.preferences.disableall || !(_v.parent.parent.context.$implicit.updating && _v.parent.parent.context.$implicit.updating[_v.context.$implicit])); var currVal_1 = core["_44" /* ɵnov */](_v, 5)._paused; _ck(_v, 4, 0, currVal_0, currVal_1); }); }
function View_AddonMessagesSettingsPage_9(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "ion-spinner", [["item-end", ""]], [[2, "spinner-paused", null]], null, null, spinner_ngfactory["b" /* View_Spinner_0 */], spinner_ngfactory["a" /* RenderType_Spinner */])), core["_30" /* ɵdid */](1, 114688, null, 0, spinner["a" /* Spinner */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 1)._paused; _ck(_v, 0, 0, currVal_0); }); }
function View_AddonMessagesSettingsPage_10(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 6, "ion-toggle", [["item-end", ""]], [[2, "toggle-disabled", null], [2, "toggle-checked", null], [2, "toggle-activated", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "ionChange"], [null, "keyup"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("keyup" === en)) {
        var pd_0 = (core["_44" /* ɵnov */](_v, 1)._keyup($event) !== false);
        ad = (pd_0 && ad);
    } if (("ngModelChange" === en)) {
        var pd_1 = ((_v.parent.parent.context.$implicit[_v.parent.context.$implicit].checked = $event) !== false);
        ad = (pd_1 && ad);
    } if (("ionChange" === en)) {
        var pd_2 = (_co.changePreference(_v.parent.parent.parent.context.$implicit, _v.parent.context.$implicit, _v.parent.parent.context.$implicit) !== false);
        ad = (pd_2 && ad);
    } return ad; }, toggle_ngfactory["b" /* View_Toggle_0 */], toggle_ngfactory["a" /* RenderType_Toggle */])), core["_30" /* ɵdid */](1, 1228800, null, 0, toggle["a" /* Toggle */], [util_form["a" /* Form */], config["a" /* Config */], platform["a" /* Platform */], core["t" /* ElementRef */], core["V" /* Renderer */], haptic["a" /* Haptic */], [2, item["a" /* Item */]], gesture_controller["l" /* GestureController */], dom_controller["a" /* DomController */], core["M" /* NgZone */]], { disabled: [0, "disabled"] }, { ionChange: "ionChange" }), core["_50" /* ɵprd */](1024, null, esm5_forms["l" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [toggle["a" /* Toggle */]]), core["_30" /* ɵdid */](3, 671744, null, 0, esm5_forms["q" /* NgModel */], [[8, null], [8, null], [8, null], [2, esm5_forms["l" /* NG_VALUE_ACCESSOR */]]], { isDisabled: [0, "isDisabled"], model: [1, "model"] }, { update: "ngModelChange" }), core["_50" /* ɵprd */](2048, null, esm5_forms["m" /* NgControl */], null, [esm5_forms["q" /* NgModel */]]), core["_30" /* ɵdid */](5, 16384, null, 0, esm5_forms["n" /* NgControlStatus */], [esm5_forms["m" /* NgControl */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                            "]))], function (_ck, _v) { var currVal_10 = (_v.parent.parent.context.$implicit.locked || (_v.parent.parent.parent.context.$implicit.updating && _v.parent.parent.parent.context.$implicit.updating[_v.parent.context.$implicit])); _ck(_v, 1, 0, currVal_10); var currVal_11 = (_v.parent.parent.context.$implicit.locked || (_v.parent.parent.parent.context.$implicit.updating && _v.parent.parent.parent.context.$implicit.updating[_v.parent.context.$implicit])); var currVal_12 = _v.parent.parent.context.$implicit[_v.parent.context.$implicit].checked; _ck(_v, 3, 0, currVal_11, currVal_12); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 1)._disabled; var currVal_1 = core["_44" /* ɵnov */](_v, 1)._value; var currVal_2 = core["_44" /* ɵnov */](_v, 1)._activated; var currVal_3 = core["_44" /* ɵnov */](_v, 5).ngClassUntouched; var currVal_4 = core["_44" /* ɵnov */](_v, 5).ngClassTouched; var currVal_5 = core["_44" /* ɵnov */](_v, 5).ngClassPristine; var currVal_6 = core["_44" /* ɵnov */](_v, 5).ngClassDirty; var currVal_7 = core["_44" /* ɵnov */](_v, 5).ngClassValid; var currVal_8 = core["_44" /* ɵnov */](_v, 5).ngClassInvalid; var currVal_9 = core["_44" /* ɵnov */](_v, 5).ngClassPending; _ck(_v, 0, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8, currVal_9); }); }
function View_AddonMessagesSettingsPage_11(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 3, "ion-note", [["item-end", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, note["a" /* Note */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](2, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], null, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 2, 0, core["_44" /* ɵnov */](_v, 3).transform("core.settings.disabled")); _ck(_v, 2, 0, currVal_0); }); }
function View_AddonMessagesSettingsPage_8(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 20, "ion-item", [["class", "hidden-tablet item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 10, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 11, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 12, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                            "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 1, 3, "ion-label", [], null, null, null, null, null)), core["_30" /* ɵdid */](8, 16384, [[10, 4]], 0, label["a" /* Label */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, null], [8, null], [8, null]], null, null), (_l()(), core["_55" /* ɵted */](9, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                            "])), (_l()(), core["_26" /* ɵand */](16777216, null, 4, 1, null, View_AddonMessagesSettingsPage_9)), core["_30" /* ɵdid */](13, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                            "])), (_l()(), core["_26" /* ɵand */](16777216, null, 4, 1, null, View_AddonMessagesSettingsPage_10)), core["_30" /* ɵdid */](16, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                            "])), (_l()(), core["_26" /* ɵand */](16777216, null, 4, 1, null, View_AddonMessagesSettingsPage_11)), core["_30" /* ɵdid */](19, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                        "]))], function (_ck, _v) { var _co = _v.component; var currVal_1 = (!_co.preferences.disableall && (_v.parent.parent.context.$implicit.updating && _v.parent.parent.context.$implicit.updating[_v.context.$implicit])); _ck(_v, 13, 0, currVal_1); var currVal_2 = !_co.preferences.disableall; _ck(_v, 16, 0, currVal_2); var currVal_3 = _co.preferences.disableall; _ck(_v, 19, 0, currVal_3); }, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 9, 0, core["_44" /* ɵnov */](_v, 10).transform(("core.settings." + _v.context.$implicit))); _ck(_v, 9, 0, currVal_0); }); }
function View_AddonMessagesSettingsPage_4(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 28, null, null, null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 10, "ion-row", [["align-items-center", ""], ["class", "hidden-phone row"], ["text-wrap", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](4, 16384, null, 0, row["a" /* Row */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                            "])), (_l()(), core["_31" /* ɵeld */](6, 0, null, null, 2, "ion-col", [["class", "col"], ["margin-horizontal", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](7, 16384, null, 0, col["a" /* Col */], [], null, null), (_l()(), core["_55" /* ɵted */](8, null, ["", ""])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 2, null, View_AddonMessagesSettingsPage_5)), core["_30" /* ɵdid */](11, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), core["_46" /* ɵpad */](12, 2), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](16, 0, null, null, 6, "ion-list-header", [["class", "hidden-tablet item"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](17, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 7, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 8, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 9, { _icons: 1 }), core["_30" /* ɵdid */](21, 16384, null, 0, list_header["a" /* ListHeader */], [config["a" /* Config */], core["V" /* Renderer */], core["t" /* ElementRef */], [8, null]], null, null), (_l()(), core["_55" /* ɵted */](22, 2, ["", ""])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 2, null, View_AddonMessagesSettingsPage_8)), core["_30" /* ɵdid */](26, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), core["_46" /* ɵpad */](27, 2), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "]))], function (_ck, _v) { var currVal_1 = _ck(_v, 12, 0, "loggedin", "loggedoff"); _ck(_v, 11, 0, currVal_1); var currVal_3 = _ck(_v, 27, 0, "loggedin", "loggedoff"); _ck(_v, 26, 0, currVal_3); }, function (_ck, _v) { var currVal_0 = _v.context.$implicit.displayname; _ck(_v, 8, 0, currVal_0); var currVal_2 = _v.context.$implicit.displayname; _ck(_v, 22, 0, currVal_2); }); }
function View_AddonMessagesSettingsPage_3(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 31, "ion-card", [["list", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, card["a" /* Card */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 24, "ion-item-divider", [["class", "item item-divider"], ["color", "light"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](4, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], { color: [0, "color"] }, null), core["_52" /* ɵqud */](335544320, 4, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 5, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 6, { _icons: 1 }), core["_30" /* ɵdid */](8, 16384, null, 0, item_divider["a" /* ItemDivider */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { color: [0, "color"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](10, 0, null, 2, 16, "ion-row", [["class", "row"], ["no-padding", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](11, 16384, null, 0, row["a" /* Row */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                            "])), (_l()(), core["_31" /* ɵeld */](13, 0, null, null, 2, "ion-col", [["class", "col"], ["no-padding", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](14, 16384, null, 0, col["a" /* Col */], [], null, null), (_l()(), core["_55" /* ɵted */](15, null, ["", ""])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                            "])), (_l()(), core["_31" /* ɵeld */](17, 0, null, null, 3, "ion-col", [["class", "hidden-phone col"], ["col-2", ""], ["no-padding", ""], ["text-center", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](18, 16384, null, 0, col["a" /* Col */], [], null, null), (_l()(), core["_55" /* ɵted */](19, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                            "])), (_l()(), core["_31" /* ɵeld */](22, 0, null, null, 3, "ion-col", [["class", "hidden-phone col"], ["col-2", ""], ["no-padding", ""], ["text-center", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](23, 16384, null, 0, col["a" /* Col */], [], null, null), (_l()(), core["_55" /* ɵted */](24, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "])), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonMessagesSettingsPage_4)), core["_30" /* ɵdid */](30, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "]))], function (_ck, _v) { var currVal_0 = "light"; _ck(_v, 4, 0, currVal_0); var currVal_1 = "light"; _ck(_v, 8, 0, currVal_1); var currVal_5 = _v.context.$implicit.processors; _ck(_v, 30, 0, currVal_5); }, function (_ck, _v) { var currVal_2 = _v.context.$implicit.displayname; _ck(_v, 15, 0, currVal_2); var currVal_3 = core["_56" /* ɵunv */](_v, 19, 0, core["_44" /* ɵnov */](_v, 20).transform("core.settings.loggedin")); _ck(_v, 19, 0, currVal_3); var currVal_4 = core["_56" /* ɵunv */](_v, 24, 0, core["_44" /* ɵnov */](_v, 25).transform("core.settings.loggedoff")); _ck(_v, 24, 0, currVal_4); }); }
function View_AddonMessagesSettingsPage_2(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 4, "div", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonMessagesSettingsPage_3)), core["_30" /* ɵdid */](3, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "]))], function (_ck, _v) { var currVal_0 = _v.context.$implicit.notifications; _ck(_v, 3, 0, currVal_0); }, null); }
function View_AddonMessagesSettingsPage_1(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 4, null, null, null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonMessagesSettingsPage_2)), core["_30" /* ɵdid */](3, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.preferences.components; _ck(_v, 3, 0, currVal_0); }, null); }
function View_AddonMessagesSettingsPage_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 12, "ion-header", [], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, toolbar_header["a" /* Header */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, view_controller["a" /* ViewController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 8, "ion-navbar", [["class", "toolbar"], ["core-back-button", ""]], [[8, "hidden", 0], [2, "statusbar-padding", null]], null, null, navbar_ngfactory["b" /* View_Navbar_0 */], navbar_ngfactory["a" /* RenderType_Navbar */])), core["_30" /* ɵdid */](4, 49152, null, 0, navbar["a" /* Navbar */], [app["a" /* App */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_30" /* ɵdid */](5, 212992, null, 0, back_button["a" /* CoreBackButtonDirective */], [navbar["a" /* Navbar */], platform["a" /* Platform */], translate_service["a" /* TranslateService */], events["a" /* CoreEventsProvider */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n        "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 3, 3, "ion-title", [], null, null, null, toolbar_title_ngfactory["b" /* View_ToolbarTitle_0 */], toolbar_title_ngfactory["a" /* RenderType_ToolbarTitle */])), core["_30" /* ɵdid */](8, 49152, null, 0, toolbar_title["a" /* ToolbarTitle */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), (_l()(), core["_55" /* ɵted */](9, 0, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_31" /* ɵeld */](14, 0, null, null, 42, "ion-content", [], [[2, "statusbar-padding", null], [2, "has-refresher", null]], null, null, content_ngfactory["b" /* View_Content_0 */], content_ngfactory["a" /* RenderType_Content */])), core["_30" /* ɵdid */](15, 4374528, null, 0, content["a" /* Content */], [config["a" /* Config */], platform["a" /* Platform */], dom_controller["a" /* DomController */], core["t" /* ElementRef */], core["V" /* Renderer */], app["a" /* App */], keyboard["a" /* Keyboard */], core["M" /* NgZone */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n    "])), (_l()(), core["_31" /* ɵeld */](17, 0, null, 2, 6, "ion-refresher", [], [[2, "refresher-active", null], [4, "top", null]], [[null, "ionRefresh"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("ionRefresh" === en)) {
        var pd_0 = (_co.refreshPreferences($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), core["_30" /* ɵdid */](18, 212992, null, 0, refresher["a" /* Refresher */], [platform["a" /* Platform */], content["a" /* Content */], core["M" /* NgZone */], gesture_controller["l" /* GestureController */]], { enabled: [0, "enabled"] }, { ionRefresh: "ionRefresh" }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_31" /* ɵeld */](20, 0, null, null, 2, "ion-refresher-content", [], [[1, "state", 0]], null, null, refresher_content_ngfactory["b" /* View_RefresherContent_0 */], refresher_content_ngfactory["a" /* RenderType_RefresherContent */])), core["_30" /* ɵdid */](21, 114688, null, 0, refresher_content["a" /* RefresherContent */], [refresher["a" /* Refresher */], config["a" /* Config */]], { pullingText: [0, "pullingText"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n    "])), (_l()(), core["_31" /* ɵeld */](25, 0, null, 1, 30, "core-loading", [], null, null, null, loading_ngfactory["b" /* View_CoreLoadingComponent_0 */], loading_ngfactory["a" /* RenderType_CoreLoadingComponent */])), core["_30" /* ɵdid */](26, 638976, null, 0, loading["a" /* CoreLoadingComponent */], [translate_service["a" /* TranslateService */], core["t" /* ElementRef */], events["a" /* CoreEventsProvider */], utils["a" /* CoreUtilsProvider */]], { hideUntil: [0, "hideUntil"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_31" /* ɵeld */](29, 0, null, 0, 22, "ion-card", [], null, null, null, null, null)), core["_30" /* ɵdid */](30, 16384, null, 0, card["a" /* Card */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](32, 0, null, null, 18, "ion-item", [["class", "item item-block"]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](33, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 1, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 2, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 3, { _icons: 1 }), core["_30" /* ɵdid */](37, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n              "])), (_l()(), core["_31" /* ɵeld */](39, 0, null, 1, 3, "ion-label", [], null, null, null, null, null)), core["_30" /* ɵdid */](40, 16384, [[1, 4]], 0, label["a" /* Label */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, null], [8, null], [8, null]], null, null), (_l()(), core["_55" /* ɵted */](41, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n              "])), (_l()(), core["_31" /* ɵeld */](44, 0, null, 4, 5, "ion-toggle", [], [[2, "toggle-disabled", null], [2, "toggle-checked", null], [2, "toggle-activated", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "ionChange"], [null, "keyup"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("keyup" === en)) {
        var pd_0 = (core["_44" /* ɵnov */](_v, 45)._keyup($event) !== false);
        ad = (pd_0 && ad);
    } if (("ngModelChange" === en)) {
        var pd_1 = ((_co.blockNonContactsState = $event) !== false);
        ad = (pd_1 && ad);
    } if (("ionChange" === en)) {
        var pd_2 = (_co.blockNonContacts(_co.blockNonContactsState) !== false);
        ad = (pd_2 && ad);
    } return ad; }, toggle_ngfactory["b" /* View_Toggle_0 */], toggle_ngfactory["a" /* RenderType_Toggle */])), core["_30" /* ɵdid */](45, 1228800, null, 0, toggle["a" /* Toggle */], [util_form["a" /* Form */], config["a" /* Config */], platform["a" /* Platform */], core["t" /* ElementRef */], core["V" /* Renderer */], haptic["a" /* Haptic */], [2, item["a" /* Item */]], gesture_controller["l" /* GestureController */], dom_controller["a" /* DomController */], core["M" /* NgZone */]], null, { ionChange: "ionChange" }), core["_50" /* ɵprd */](1024, null, esm5_forms["l" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [toggle["a" /* Toggle */]]), core["_30" /* ɵdid */](47, 671744, null, 0, esm5_forms["q" /* NgModel */], [[8, null], [8, null], [8, null], [2, esm5_forms["l" /* NG_VALUE_ACCESSOR */]]], { model: [0, "model"] }, { update: "ngModelChange" }), core["_50" /* ɵprd */](2048, null, esm5_forms["m" /* NgControl */], null, [esm5_forms["q" /* NgModel */]]), core["_30" /* ɵdid */](49, 16384, null, 0, esm5_forms["n" /* NgControlStatus */], [esm5_forms["m" /* NgControl */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonMessagesSettingsPage_1)), core["_30" /* ɵdid */](54, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; _ck(_v, 5, 0); var currVal_7 = _co.preferencesLoaded; _ck(_v, 18, 0, currVal_7); var currVal_9 = core["_34" /* ɵinlineInterpolate */](1, "", core["_56" /* ɵunv */](_v, 21, 0, core["_44" /* ɵnov */](_v, 22).transform("core.pulltorefresh")), ""); _ck(_v, 21, 0, currVal_9); var currVal_10 = _co.preferencesLoaded; _ck(_v, 26, 0, currVal_10); var currVal_22 = _co.blockNonContactsState; _ck(_v, 47, 0, currVal_22); var currVal_23 = _co.preferences; _ck(_v, 54, 0, currVal_23); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 4)._hidden; var currVal_1 = core["_44" /* ɵnov */](_v, 4)._sbPadding; _ck(_v, 3, 0, currVal_0, currVal_1); var currVal_2 = core["_56" /* ɵunv */](_v, 9, 0, core["_44" /* ɵnov */](_v, 10).transform("addon.messages.messagepreferences")); _ck(_v, 9, 0, currVal_2); var currVal_3 = core["_44" /* ɵnov */](_v, 15).statusbarPadding; var currVal_4 = core["_44" /* ɵnov */](_v, 15)._hasRefresher; _ck(_v, 14, 0, currVal_3, currVal_4); var currVal_5 = (core["_44" /* ɵnov */](_v, 18).state !== "inactive"); var currVal_6 = core["_44" /* ɵnov */](_v, 18)._top; _ck(_v, 17, 0, currVal_5, currVal_6); var currVal_8 = core["_44" /* ɵnov */](_v, 21).r.state; _ck(_v, 20, 0, currVal_8); var currVal_11 = core["_56" /* ɵunv */](_v, 41, 0, core["_44" /* ɵnov */](_v, 42).transform("addon.messages.blocknoncontacts")); _ck(_v, 41, 0, currVal_11); var currVal_12 = core["_44" /* ɵnov */](_v, 45)._disabled; var currVal_13 = core["_44" /* ɵnov */](_v, 45)._value; var currVal_14 = core["_44" /* ɵnov */](_v, 45)._activated; var currVal_15 = core["_44" /* ɵnov */](_v, 49).ngClassUntouched; var currVal_16 = core["_44" /* ɵnov */](_v, 49).ngClassTouched; var currVal_17 = core["_44" /* ɵnov */](_v, 49).ngClassPristine; var currVal_18 = core["_44" /* ɵnov */](_v, 49).ngClassDirty; var currVal_19 = core["_44" /* ɵnov */](_v, 49).ngClassValid; var currVal_20 = core["_44" /* ɵnov */](_v, 49).ngClassInvalid; var currVal_21 = core["_44" /* ɵnov */](_v, 49).ngClassPending; _ck(_v, 44, 0, currVal_12, currVal_13, currVal_14, currVal_15, currVal_16, currVal_17, currVal_18, currVal_19, currVal_20, currVal_21); }); }
function View_AddonMessagesSettingsPage_Host_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "page-addon-messages-settings", [], null, null, null, View_AddonMessagesSettingsPage_0, RenderType_AddonMessagesSettingsPage)), core["_30" /* ɵdid */](1, 180224, null, 0, settings_AddonMessagesSettingsPage, [messages["a" /* AddonMessagesProvider */], dom["a" /* CoreDomUtilsProvider */], user["a" /* CoreUserProvider */]], null, null)], null, null); }
var AddonMessagesSettingsPageNgFactory = core["_27" /* ɵccf */]("page-addon-messages-settings", settings_AddonMessagesSettingsPage, View_AddonMessagesSettingsPage_Host_0, {}, {}, []);

//# sourceMappingURL=settings.ngfactory.js.map
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

// CONCATENATED MODULE: ./src/addon/messages/pages/settings/settings.module.ngfactory.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddonMessagesSettingsPageModuleNgFactory", function() { return AddonMessagesSettingsPageModuleNgFactory; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 































var AddonMessagesSettingsPageModuleNgFactory = core["_28" /* ɵcmf */](settings_module_AddonMessagesSettingsPageModule, [], function (_l) { return core["_40" /* ɵmod */]([core["_41" /* ɵmpd */](512, core["o" /* ComponentFactoryResolver */], core["_21" /* ɵCodegenComponentFactoryResolver */], [[8, [action_sheet_component_ngfactory["a" /* ActionSheetCmpNgFactory */], alert_component_ngfactory["a" /* AlertCmpNgFactory */], app_root_ngfactory["a" /* IonicAppNgFactory */], loading_component_ngfactory["a" /* LoadingCmpNgFactory */], modal_component_ngfactory["a" /* ModalCmpNgFactory */], picker_component_ngfactory["a" /* PickerCmpNgFactory */], popover_component_ngfactory["a" /* PopoverCmpNgFactory */], select_popover_component_ngfactory["a" /* SelectPopoverNgFactory */], toast_component_ngfactory["a" /* ToastCmpNgFactory */], context_menu_popover_ngfactory["a" /* CoreContextMenuPopoverComponentNgFactory */], course_picker_menu_popover_ngfactory["a" /* CoreCoursePickerMenuPopoverComponentNgFactory */], recaptchamodal_ngfactory["a" /* CoreRecaptchaModalComponentNgFactory */], AddonMessagesSettingsPageNgFactory]], [3, core["o" /* ComponentFactoryResolver */]], core["K" /* NgModuleRef */]]), core["_41" /* ɵmpd */](4608, common["m" /* NgLocalization */], common["l" /* NgLocaleLocalization */], [core["G" /* LOCALE_ID */], [2, common["v" /* ɵa */]]]), core["_41" /* ɵmpd */](4608, esm5_forms["x" /* ɵi */], esm5_forms["x" /* ɵi */], []), core["_41" /* ɵmpd */](4608, esm5_forms["d" /* FormBuilder */], esm5_forms["d" /* FormBuilder */], []), core["_41" /* ɵmpd */](4608, translate_loader["b" /* TranslateLoader */], translate_loader["a" /* TranslateFakeLoader */], []), core["_41" /* ɵmpd */](4608, translate_compiler["a" /* TranslateCompiler */], translate_compiler["b" /* TranslateFakeCompiler */], []), core["_41" /* ɵmpd */](4608, translate_parser["b" /* TranslateParser */], translate_parser["a" /* TranslateDefaultParser */], []), core["_41" /* ɵmpd */](4608, missing_translation_handler["b" /* MissingTranslationHandler */], missing_translation_handler["a" /* FakeMissingTranslationHandler */], []), core["_41" /* ɵmpd */](4608, translate_service["a" /* TranslateService */], translate_service["a" /* TranslateService */], [translate_store["a" /* TranslateStore */], translate_loader["b" /* TranslateLoader */], translate_compiler["a" /* TranslateCompiler */], translate_parser["b" /* TranslateParser */], missing_translation_handler["b" /* MissingTranslationHandler */], translate_service["b" /* USE_DEFAULT_LANG */], translate_service["c" /* USE_STORE */]]), core["_41" /* ɵmpd */](512, common["b" /* CommonModule */], common["b" /* CommonModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["v" /* ɵba */], esm5_forms["v" /* ɵba */], []), core["_41" /* ɵmpd */](512, esm5_forms["i" /* FormsModule */], esm5_forms["i" /* FormsModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["s" /* ReactiveFormsModule */], esm5_forms["s" /* ReactiveFormsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["a" /* IonicModule */], ionic_angular_module["a" /* IonicModule */], []), core["_41" /* ɵmpd */](512, _ngx_translate_core["b" /* TranslateModule */], _ngx_translate_core["b" /* TranslateModule */], []), core["_41" /* ɵmpd */](512, directives_module["a" /* CoreDirectivesModule */], directives_module["a" /* CoreDirectivesModule */], []), core["_41" /* ɵmpd */](512, pipes_module["a" /* CorePipesModule */], pipes_module["a" /* CorePipesModule */], []), core["_41" /* ɵmpd */](512, components_module["a" /* CoreComponentsModule */], components_module["a" /* CoreComponentsModule */], []), core["_41" /* ɵmpd */](512, components_components_module["a" /* AddonMessagesComponentsModule */], components_components_module["a" /* AddonMessagesComponentsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["b" /* IonicPageModule */], ionic_angular_module["b" /* IonicPageModule */], []), core["_41" /* ɵmpd */](512, settings_module_AddonMessagesSettingsPageModule, settings_module_AddonMessagesSettingsPageModule, []), core["_41" /* ɵmpd */](256, translate_service["c" /* USE_STORE */], undefined, []), core["_41" /* ɵmpd */](256, translate_service["b" /* USE_DEFAULT_LANG */], undefined, []), core["_41" /* ɵmpd */](256, module_loader["a" /* LAZY_LOADED_TOKEN */], settings_AddonMessagesSettingsPage, [])]); });

//# sourceMappingURL=settings.module.ngfactory.js.map

/***/ }),

/***/ 1874:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RenderType_Toggle; });
/* harmony export (immutable) */ __webpack_exports__["b"] = View_Toggle_0;
/* unused harmony export View_Toggle_Host_0 */
/* unused harmony export ToggleNgFactory */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__button_button_ngfactory__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__button_button__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_config__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__toggle__ = __webpack_require__(633);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__util_form__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__platform_platform__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__tap_click_haptic__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__item_item__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__gestures_gesture_controller__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__platform_dom_controller__ = __webpack_require__(25);
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 












var styles_Toggle = [];
var RenderType_Toggle = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_Toggle, data: {} });

function View_Toggle_0(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 1, "div", [["class", "toggle-icon"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](1, 0, null, null, 0, "div", [["class", "toggle-inner"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](2, 0, null, null, 1, "button", [["class", "item-cover"], ["disable-activated", ""], ["ion-button", "item-cover"], ["role", "checkbox"], ["type", "button"]], [[8, "id", 0], [1, "aria-checked", 0], [1, "aria-labelledby", 0], [1, "aria-disabled", 0]], null, null, __WEBPACK_IMPORTED_MODULE_1__button_button_ngfactory__["b" /* View_Button_0 */], __WEBPACK_IMPORTED_MODULE_1__button_button_ngfactory__["a" /* RenderType_Button */])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](3, 1097728, null, 0, __WEBPACK_IMPORTED_MODULE_2__button_button__["a" /* Button */], [[8, "item-cover"], __WEBPACK_IMPORTED_MODULE_3__config_config__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */]], null, null)], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.id; var currVal_1 = _co._value; var currVal_2 = _co._labelId; var currVal_3 = _co._disabled; _ck(_v, 2, 0, currVal_0, currVal_1, currVal_2, currVal_3); }); }
function View_Toggle_Host_0(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 2, "ion-toggle", [], [[2, "toggle-disabled", null], [2, "toggle-checked", null], [2, "toggle-activated", null]], [[null, "keyup"]], function (_v, en, $event) { var ad = true; if (("keyup" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 2)._keyup($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, View_Toggle_0, RenderType_Toggle)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_50" /* ɵprd */](5120, null, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["l" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [__WEBPACK_IMPORTED_MODULE_5__toggle__["a" /* Toggle */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](2, 1228800, null, 0, __WEBPACK_IMPORTED_MODULE_5__toggle__["a" /* Toggle */], [__WEBPACK_IMPORTED_MODULE_6__util_form__["a" /* Form */], __WEBPACK_IMPORTED_MODULE_3__config_config__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_7__platform_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */], __WEBPACK_IMPORTED_MODULE_8__tap_click_haptic__["a" /* Haptic */], [2, __WEBPACK_IMPORTED_MODULE_9__item_item__["a" /* Item */]], __WEBPACK_IMPORTED_MODULE_10__gestures_gesture_controller__["l" /* GestureController */], __WEBPACK_IMPORTED_MODULE_11__platform_dom_controller__["a" /* DomController */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */]], null, null)], null, function (_ck, _v) { var currVal_0 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 2)._disabled; var currVal_1 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 2)._value; var currVal_2 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 2)._activated; _ck(_v, 0, 0, currVal_0, currVal_1, currVal_2); }); }
var ToggleNgFactory = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_27" /* ɵccf */]("ion-toggle", __WEBPACK_IMPORTED_MODULE_5__toggle__["a" /* Toggle */], View_Toggle_Host_0, { color: "color", mode: "mode", disabled: "disabled", checked: "checked" }, { ionFocus: "ionFocus", ionChange: "ionChange", ionBlur: "ionBlur" }, []);

//# sourceMappingURL=toggle.ngfactory.js.map

/***/ }),

/***/ 1880:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddonMessagesComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_components_module__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__directives_directives_module__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pipes_pipes_module__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_discussions_discussions__ = __webpack_require__(1881);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_contacts_contacts__ = __webpack_require__(1882);
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









var AddonMessagesComponentsModule = /** @class */ (function () {
    function AddonMessagesComponentsModule() {
    }
    AddonMessagesComponentsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__components_discussions_discussions__["a" /* AddonMessagesDiscussionsComponent */],
                __WEBPACK_IMPORTED_MODULE_8__components_contacts_contacts__["a" /* AddonMessagesContactsComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* IonicModule */],
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */].forChild(),
                __WEBPACK_IMPORTED_MODULE_4__components_components_module__["a" /* CoreComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_5__directives_directives_module__["a" /* CoreDirectivesModule */],
                __WEBPACK_IMPORTED_MODULE_6__pipes_pipes_module__["a" /* CorePipesModule */]
            ],
            providers: [],
            exports: [
                __WEBPACK_IMPORTED_MODULE_7__components_discussions_discussions__["a" /* AddonMessagesDiscussionsComponent */],
                __WEBPACK_IMPORTED_MODULE_8__components_contacts_contacts__["a" /* AddonMessagesContactsComponent */]
            ]
        })
    ], AddonMessagesComponentsModule);
    return AddonMessagesComponentsModule;
}());

//# sourceMappingURL=components.module.js.map

/***/ }),

/***/ 1881:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddonMessagesDiscussionsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_events__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_sites__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_messages__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_utils_dom__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_utils_utils__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_app__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__addon_pushnotifications_providers_delegate__ = __webpack_require__(218);
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
 * Component that displays the list of discussions.
 */
var AddonMessagesDiscussionsComponent = /** @class */ (function () {
    function AddonMessagesDiscussionsComponent(eventsProvider, sitesProvider, translate, messagesProvider, domUtils, navParams, appProvider, platform, utils, pushNotificationsDelegate) {
        var _this = this;
        this.eventsProvider = eventsProvider;
        this.messagesProvider = messagesProvider;
        this.domUtils = domUtils;
        this.appProvider = appProvider;
        this.loaded = false;
        this.search = {
            enabled: false,
            showResults: false,
            results: [],
            loading: '',
            text: ''
        };
        this.search.loading = translate.instant('core.searching');
        this.loadingMessages = translate.instant('core.loading');
        this.siteId = sitesProvider.getCurrentSiteId();
        // Update discussions when new message is received.
        this.newMessagesObserver = eventsProvider.on(__WEBPACK_IMPORTED_MODULE_5__providers_messages__["a" /* AddonMessagesProvider */].NEW_MESSAGE_EVENT, function (data) {
            if (data.userId) {
                var discussion = _this.discussions.find(function (disc) {
                    return disc.message.user == data.userId;
                });
                if (typeof discussion == 'undefined') {
                    _this.loaded = false;
                    _this.refreshData().finally(function () {
                        _this.loaded = true;
                    });
                }
                else {
                    // An existing discussion has a new message, update the last message.
                    discussion.message.message = data.message;
                    discussion.message.timecreated = data.timecreated;
                }
            }
        }, this.siteId);
        // Update discussions when a message is read.
        this.readChangedObserver = eventsProvider.on(__WEBPACK_IMPORTED_MODULE_5__providers_messages__["a" /* AddonMessagesProvider */].READ_CHANGED_EVENT, function (data) {
            if (data.userId) {
                var discussion = _this.discussions.find(function (disc) {
                    return disc.message.user == data.userId;
                });
                if (typeof discussion != 'undefined') {
                    // A discussion has been read reset counter.
                    discussion.unread = false;
                    // Discussions changed, invalidate them.
                    _this.messagesProvider.invalidateDiscussionsCache();
                }
            }
        }, this.siteId);
        // Update discussions when cron read is executed.
        this.cronObserver = eventsProvider.on(__WEBPACK_IMPORTED_MODULE_5__providers_messages__["a" /* AddonMessagesProvider */].READ_CRON_EVENT, function (data) {
            _this.refreshData();
        }, this.siteId);
        // Refresh the view when the app is resumed.
        this.appResumeSubscription = platform.resume.subscribe(function () {
            if (!_this.loaded) {
                return;
            }
            _this.loaded = false;
            _this.refreshData();
        });
        this.discussionUserId = navParams.get('discussionUserId') || false;
        // If a message push notification is received, refresh the view.
        this.pushObserver = pushNotificationsDelegate.on('receive').subscribe(function (notification) {
            // New message received. If it's from current site, refresh the data.
            if (utils.isFalseOrZero(notification.notif) && notification.site == _this.siteId) {
                _this.refreshData();
            }
        });
    }
    /**
     * Component loaded.
     */
    AddonMessagesDiscussionsComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.discussionUserId) {
            // There is a discussion to load, open the discussion in a new state.
            this.gotoDiscussion(this.discussionUserId);
        }
        this.fetchData().then(function () {
            if (!_this.discussionUserId && _this.discussions.length > 0) {
                // Take first and load it.
                _this.gotoDiscussion(_this.discussions[0].message.user, undefined, true);
            }
        });
    };
    /**
     * Refresh the data.
     *
     * @param {any} [refresher] Refresher.
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonMessagesDiscussionsComponent.prototype.refreshData = function (refresher) {
        var _this = this;
        return this.messagesProvider.invalidateDiscussionsCache().then(function () {
            return _this.fetchData().finally(function () {
                if (refresher) {
                    // Actions to take if refresh comes from the user.
                    _this.eventsProvider.trigger(__WEBPACK_IMPORTED_MODULE_5__providers_messages__["a" /* AddonMessagesProvider */].READ_CHANGED_EVENT, undefined, _this.siteId);
                    refresher.complete();
                }
            });
        });
    };
    /**
     * Fetch discussions.
     *
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonMessagesDiscussionsComponent.prototype.fetchData = function () {
        var _this = this;
        this.loadingMessage = this.loadingMessages;
        this.search.enabled = this.messagesProvider.isSearchMessagesEnabled();
        return this.messagesProvider.getDiscussions().then(function (discussions) {
            // Convert to an array for sorting.
            var discussionsSorted = [];
            for (var userId in discussions) {
                discussions[userId].unread = !!discussions[userId].unread;
                discussionsSorted.push(discussions[userId]);
            }
            _this.discussions = discussionsSorted.sort(function (a, b) {
                return b.message.timecreated - a.message.timecreated;
            });
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'addon.messages.errorwhileretrievingdiscussions', true);
        }).finally(function () {
            _this.loaded = true;
        });
    };
    /**
     * Clear search and show discussions again.
     */
    AddonMessagesDiscussionsComponent.prototype.clearSearch = function () {
        var _this = this;
        this.loaded = false;
        this.search.showResults = false;
        this.search.text = ''; // Reset searched string.
        this.fetchData().finally(function () {
            _this.loaded = true;
        });
    };
    /**
     * Search messages cotaining text.
     *
     * @param  {string}       query Text to search for.
     * @return {Promise<any>}       Resolved when done.
     */
    AddonMessagesDiscussionsComponent.prototype.searchMessage = function (query) {
        var _this = this;
        this.appProvider.closeKeyboard();
        this.loaded = false;
        this.loadingMessage = this.search.loading;
        return this.messagesProvider.searchMessages(query).then(function (searchResults) {
            _this.search.showResults = true;
            _this.search.results = searchResults;
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'addon.messages.errorwhileretrievingmessages', true);
        }).finally(function () {
            _this.loaded = true;
        });
    };
    /**
     * Navigate to a particular discussion.
     *
     * @param {number} discussionUserId Discussion Id to load.
     * @param {number} [messageId]      Message to scroll after loading the discussion. Used when searching.
     * @param {boolean} [onlyWithSplitView=false]  Only go to Discussion if split view is on.
     */
    AddonMessagesDiscussionsComponent.prototype.gotoDiscussion = function (discussionUserId, messageId, onlyWithSplitView) {
        if (onlyWithSplitView === void 0) { onlyWithSplitView = false; }
        this.discussionUserId = discussionUserId;
        var params = {
            discussion: discussionUserId,
            onlyWithSplitView: onlyWithSplitView
        };
        if (messageId) {
            params['message'] = messageId;
        }
        this.eventsProvider.trigger(__WEBPACK_IMPORTED_MODULE_5__providers_messages__["a" /* AddonMessagesProvider */].SPLIT_VIEW_LOAD_EVENT, params, this.siteId);
    };
    /**
     * Component destroyed.
     */
    AddonMessagesDiscussionsComponent.prototype.ngOnDestroy = function () {
        this.newMessagesObserver && this.newMessagesObserver.off();
        this.readChangedObserver && this.readChangedObserver.off();
        this.cronObserver && this.cronObserver.off();
        this.appResumeSubscription && this.appResumeSubscription.unsubscribe();
        this.pushObserver && this.pushObserver.unsubscribe();
    };
    AddonMessagesDiscussionsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'addon-messages-discussions',
            templateUrl: 'addon-messages-discussions.html',
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__providers_events__["a" /* CoreEventsProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_sites__["a" /* CoreSitesProvider */], __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_5__providers_messages__["a" /* AddonMessagesProvider */], __WEBPACK_IMPORTED_MODULE_6__providers_utils_dom__["a" /* CoreDomUtilsProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_8__providers_app__["a" /* CoreAppProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* Platform */], __WEBPACK_IMPORTED_MODULE_7__providers_utils_utils__["a" /* CoreUtilsProvider */],
            __WEBPACK_IMPORTED_MODULE_9__addon_pushnotifications_providers_delegate__["a" /* AddonPushNotificationsDelegate */]])
    ], AddonMessagesDiscussionsComponent);
    return AddonMessagesDiscussionsComponent;
}());

//# sourceMappingURL=discussions.js.map

/***/ }),

/***/ 1882:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddonMessagesContactsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_sites__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_messages__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_utils_dom__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_app__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_events__ = __webpack_require__(12);
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
 * Component that displays the list of contacts.
 */
var AddonMessagesContactsComponent = /** @class */ (function () {
    function AddonMessagesContactsComponent(sitesProvider, translate, appProvider, messagesProvider, domUtils, navParams, eventsProvider) {
        this.appProvider = appProvider;
        this.messagesProvider = messagesProvider;
        this.domUtils = domUtils;
        this.eventsProvider = eventsProvider;
        this.noSearchTypes = ['online', 'offline', 'blocked', 'strangers'];
        this.loaded = false;
        this.contactTypes = this.noSearchTypes;
        this.searchType = 'search';
        this.loadingMessage = '';
        this.hasContacts = false;
        this.contacts = {
            search: []
        };
        this.searchString = '';
        this.currentUserId = sitesProvider.getCurrentSiteUserId();
        this.siteId = sitesProvider.getCurrentSiteId();
        this.searchingMessages = translate.instant('core.searching');
        this.loadingMessages = translate.instant('core.loading');
        this.loadingMessage = this.loadingMessages;
        this.discussionUserId = navParams.get('discussionUserId') || false;
    }
    /**
     * Component loaded.
     */
    AddonMessagesContactsComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.discussionUserId) {
            // There is a discussion to load, open the discussion in a new state.
            this.gotoDiscussion(this.discussionUserId);
        }
        this.fetchData().then(function () {
            if (!_this.discussionUserId && _this.hasContacts) {
                var contact = void 0;
                for (var x in _this.contacts) {
                    if (_this.contacts[x].length > 0) {
                        contact = _this.contacts[x][0];
                        break;
                    }
                }
                if (contact) {
                    // Take first and load it.
                    _this.gotoDiscussion(contact.id, true);
                }
            }
        }).finally(function () {
            _this.loaded = true;
        });
    };
    /**
     * Refresh the data.
     *
     * @param {any} [refresher] Refresher.
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonMessagesContactsComponent.prototype.refreshData = function (refresher) {
        var _this = this;
        var promise;
        if (this.searchString) {
            // User has searched, update the search.
            promise = this.performSearch(this.searchString);
        }
        else {
            // Update contacts.
            promise = this.messagesProvider.invalidateAllContactsCache(this.currentUserId).then(function () {
                return _this.fetchData();
            });
        }
        return promise.finally(function () {
            refresher.complete();
        });
    };
    /**
     * Fetch contacts.
     *
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonMessagesContactsComponent.prototype.fetchData = function () {
        var _this = this;
        this.loadingMessage = this.loadingMessages;
        return this.messagesProvider.getAllContacts().then(function (contacts) {
            for (var x in contacts) {
                if (contacts[x].length > 0) {
                    _this.contacts[x] = _this.sortUsers(contacts[x]);
                }
                else {
                    _this.contacts[x] = [];
                }
            }
            _this.clearSearch();
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'addon.messages.errorwhileretrievingcontacts', true);
        });
    };
    /**
     * Sort user list by fullname
     * @param  {any[]} list List to sort.
     * @return {any[]}      Sorted list.
     */
    AddonMessagesContactsComponent.prototype.sortUsers = function (list) {
        return list.sort(function (a, b) {
            var compareA = a.fullname.toLowerCase(), compareB = b.fullname.toLowerCase();
            return compareA.localeCompare(compareB);
        });
    };
    /**
     * Clear search and show all contacts again.
     */
    AddonMessagesContactsComponent.prototype.clearSearch = function () {
        this.searchString = ''; // Reset searched string.
        this.contactTypes = this.noSearchTypes;
        this.hasContacts = false;
        for (var x in this.contacts) {
            if (this.contacts[x].length > 0) {
                this.hasContacts = true;
                return;
            }
        }
    };
    /**
     * Search users from the UI.
     *
     * @param  {string}       query Text to search for.
     * @return {Promise<any>}       Resolved when done.
     */
    AddonMessagesContactsComponent.prototype.search = function (query) {
        var _this = this;
        this.appProvider.closeKeyboard();
        this.loaded = false;
        this.loadingMessage = this.searchingMessages;
        return this.performSearch(query).finally(function () {
            _this.loaded = true;
        });
    };
    /**
     * Perform the search of users.
     *
     * @param  {string}       query Text to search for.
     * @return {Promise<any>}       Resolved when done.
     */
    AddonMessagesContactsComponent.prototype.performSearch = function (query) {
        var _this = this;
        return this.messagesProvider.searchContacts(query).then(function (result) {
            _this.hasContacts = result.length > 0;
            _this.searchString = query;
            _this.contactTypes = ['search'];
            _this.contacts['search'] = _this.sortUsers(result);
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'addon.messages.errorwhileretrievingcontacts', true);
        });
    };
    /**
     * Navigate to a particular discussion.
     *
     * @param {number} discussionUserId Discussion Id to load.
     * @param {boolean} [onlyWithSplitView=false]  Only go to Discussion if split view is on.
     */
    AddonMessagesContactsComponent.prototype.gotoDiscussion = function (discussionUserId, onlyWithSplitView) {
        if (onlyWithSplitView === void 0) { onlyWithSplitView = false; }
        this.discussionUserId = discussionUserId;
        var params = {
            discussion: discussionUserId,
            onlyWithSplitView: onlyWithSplitView
        };
        this.eventsProvider.trigger(__WEBPACK_IMPORTED_MODULE_4__providers_messages__["a" /* AddonMessagesProvider */].SPLIT_VIEW_LOAD_EVENT, params, this.siteId);
    };
    AddonMessagesContactsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'addon-messages-contacts',
            templateUrl: 'addon-messages-contacts.html',
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__providers_sites__["a" /* CoreSitesProvider */], __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_6__providers_app__["a" /* CoreAppProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_messages__["a" /* AddonMessagesProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_utils_dom__["a" /* CoreDomUtilsProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_7__providers_events__["a" /* CoreEventsProvider */]])
    ], AddonMessagesContactsComponent);
    return AddonMessagesContactsComponent;
}());

//# sourceMappingURL=contacts.js.map

/***/ })

});
//# sourceMappingURL=6.js.map