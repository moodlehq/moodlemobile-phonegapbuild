webpackJsonp([51],{

/***/ 1846:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/@angular/core/esm5/core.js
var core = __webpack_require__(0);

// EXTERNAL MODULE: ./node_modules/ionic-angular/index.js + 3 modules
var ionic_angular = __webpack_require__(9);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/index.js + 1 modules
var _ngx_translate_core = __webpack_require__(4);

// EXTERNAL MODULE: ./src/providers/app.ts
var app = __webpack_require__(10);

// EXTERNAL MODULE: ./src/providers/events.ts
var events = __webpack_require__(12);

// EXTERNAL MODULE: ./src/providers/sites.ts
var sites = __webpack_require__(1);

// EXTERNAL MODULE: ./src/providers/utils/dom.ts
var dom = __webpack_require__(3);

// EXTERNAL MODULE: ./src/providers/utils/utils.ts
var utils_utils = __webpack_require__(2);

// EXTERNAL MODULE: ./src/core/login/providers/helper.ts
var helper = __webpack_require__(124);

// EXTERNAL MODULE: ./src/core/contentlinks/providers/delegate.ts
var delegate = __webpack_require__(61);

// EXTERNAL MODULE: ./src/core/contentlinks/providers/helper.ts
var providers_helper = __webpack_require__(22);

// EXTERNAL MODULE: ./node_modules/@angular/forms/esm5/forms.js
var esm5_forms = __webpack_require__(18);

// CONCATENATED MODULE: ./src/core/login/pages/credentials/credentials.ts
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
 * Page to enter the user credentials.
 */
var credentials_CoreLoginCredentialsPage = /** @class */ (function () {
    function CoreLoginCredentialsPage(navCtrl, navParams, fb, appProvider, sitesProvider, loginHelper, domUtils, translate, utils, eventsProvider, contentLinksDelegate, contentLinksHelper) {
        this.navCtrl = navCtrl;
        this.appProvider = appProvider;
        this.sitesProvider = sitesProvider;
        this.loginHelper = loginHelper;
        this.domUtils = domUtils;
        this.translate = translate;
        this.utils = utils;
        this.eventsProvider = eventsProvider;
        this.contentLinksDelegate = contentLinksDelegate;
        this.contentLinksHelper = contentLinksHelper;
        this.siteChecked = false;
        this.pageLoaded = false;
        this.isBrowserSSO = false;
        this.eventThrown = false;
        this.viewLeft = false;
        this.siteUrl = navParams.get('siteUrl');
        this.siteConfig = navParams.get('siteConfig');
        this.urlToOpen = navParams.get('urlToOpen');
        this.credForm = fb.group({
            username: [navParams.get('username') || '', esm5_forms["u" /* Validators */].required],
            password: ['', esm5_forms["u" /* Validators */].required]
        });
    }
    /**
     * View loaded.
     */
    CoreLoginCredentialsPage.prototype.ionViewDidLoad = function () {
        this.treatSiteConfig();
        if (this.loginHelper.isFixedUrlSet()) {
            // Fixed URL, we need to check if it uses browser SSO login.
            this.checkSite(this.siteUrl);
        }
        else {
            this.siteChecked = true;
            this.pageLoaded = true;
        }
    };
    /**
     * View left.
     */
    CoreLoginCredentialsPage.prototype.ionViewDidLeave = function () {
        this.viewLeft = true;
        this.eventsProvider.trigger(events["a" /* CoreEventsProvider */].LOGIN_SITE_UNCHECKED, { config: this.siteConfig }, this.siteId);
    };
    /**
     * Check if a site uses local_mobile, requires SSO login, etc.
     * This should be used only if a fixed URL is set, otherwise this check is already performed in CoreLoginSitePage.
     *
     * @param {string} siteUrl Site URL to check.
     * @return {Promise<any>} Promise resolved when done.
     */
    CoreLoginCredentialsPage.prototype.checkSite = function (siteUrl) {
        var _this = this;
        this.pageLoaded = false;
        // If the site is configured with http:// protocol we force that one, otherwise we use default mode.
        var protocol = siteUrl.indexOf('http://') === 0 ? 'http://' : undefined;
        return this.sitesProvider.checkSite(siteUrl, protocol).then(function (result) {
            _this.siteChecked = true;
            _this.siteUrl = result.siteUrl;
            _this.siteConfig = result.config;
            _this.treatSiteConfig();
            if (result && result.warning) {
                _this.domUtils.showErrorModal(result.warning, true, 4000);
            }
            if (_this.loginHelper.isSSOLoginNeeded(result.code)) {
                // SSO. User needs to authenticate in a browser.
                _this.isBrowserSSO = true;
                // Check that there's no SSO authentication ongoing and the view hasn't changed.
                if (!_this.appProvider.isSSOAuthenticationOngoing() && !_this.viewLeft) {
                    _this.loginHelper.confirmAndOpenBrowserForSSOLogin(result.siteUrl, result.code, result.service, result.config && result.config.launchurl);
                }
            }
            else {
                _this.isBrowserSSO = false;
            }
        }).catch(function (error) {
            _this.domUtils.showErrorModal(error);
        }).finally(function () {
            _this.pageLoaded = true;
        });
    };
    /**
     * Treat the site configuration (if it exists).
     */
    CoreLoginCredentialsPage.prototype.treatSiteConfig = function () {
        if (this.siteConfig) {
            this.siteName = this.siteConfig.sitename;
            this.logoUrl = this.siteConfig.logourl || this.siteConfig.compactlogourl;
            this.authInstructions = this.siteConfig.authinstructions || this.translate.instant('core.login.loginsteps');
            this.canSignup = this.siteConfig.registerauth == 'email' && !this.loginHelper.isEmailSignupDisabled(this.siteConfig);
            this.identityProviders = this.loginHelper.getValidIdentityProviders(this.siteConfig);
            if (!this.eventThrown && !this.viewLeft) {
                this.eventThrown = true;
                this.eventsProvider.trigger(events["a" /* CoreEventsProvider */].LOGIN_SITE_CHECKED, { config: this.siteConfig });
            }
        }
        else {
            this.siteName = null;
            this.logoUrl = null;
            this.authInstructions = null;
            this.canSignup = false;
            this.identityProviders = [];
        }
    };
    /**
     * Tries to authenticate the user.
     */
    CoreLoginCredentialsPage.prototype.login = function () {
        var _this = this;
        this.appProvider.closeKeyboard();
        // Get input data.
        var siteUrl = this.siteUrl, username = this.credForm.value.username, password = this.credForm.value.password;
        if (!this.siteChecked || this.isBrowserSSO) {
            // Site wasn't checked (it failed) or a previous check determined it was SSO. Let's check again.
            this.checkSite(siteUrl).then(function () {
                if (!_this.isBrowserSSO) {
                    // Site doesn't use browser SSO, throw app's login again.
                    return _this.login();
                }
            });
            return;
        }
        if (!username) {
            this.domUtils.showErrorModal('core.login.usernamerequired', true);
            return;
        }
        if (!password) {
            this.domUtils.showErrorModal('core.login.passwordrequired', true);
            return;
        }
        if (!this.appProvider.isOnline()) {
            this.domUtils.showErrorModal('core.networkerrormsg', true);
            return;
        }
        var modal = this.domUtils.showModalLoading();
        // Start the authentication process.
        this.sitesProvider.getUserToken(siteUrl, username, password).then(function (data) {
            return _this.sitesProvider.newSite(data.siteUrl, data.token, data.privateToken).then(function (id) {
                // Reset fields so the data is not in the view anymore.
                _this.credForm.controls['username'].reset();
                _this.credForm.controls['password'].reset();
                _this.siteId = id;
                if (_this.urlToOpen) {
                    // There's a content link to open.
                    return _this.contentLinksDelegate.getActionsFor(_this.urlToOpen, undefined, username).then(function (actions) {
                        var action = _this.contentLinksHelper.getFirstValidAction(actions);
                        if (action && action.sites.length) {
                            // Action should only have 1 site because we're filtering by username.
                            action.action(action.sites[0]);
                        }
                        else {
                            return _this.loginHelper.goToSiteInitialPage();
                        }
                    });
                }
                else {
                    return _this.loginHelper.goToSiteInitialPage();
                }
            });
        }).catch(function (error) {
            _this.loginHelper.treatUserTokenError(siteUrl, error);
        }).finally(function () {
            modal.dismiss();
        });
    };
    /**
     * Forgotten password button clicked.
     */
    CoreLoginCredentialsPage.prototype.forgottenPassword = function () {
        var _this = this;
        if (this.siteConfig && this.siteConfig.forgottenpasswordurl) {
            // URL set, open it.
            this.utils.openInApp(this.siteConfig.forgottenpasswordurl);
            return;
        }
        // Check if password reset can be done through the app.
        var modal = this.domUtils.showModalLoading();
        this.loginHelper.canRequestPasswordReset(this.siteUrl).then(function (canReset) {
            if (canReset) {
                _this.navCtrl.push('CoreLoginForgottenPasswordPage', {
                    siteUrl: _this.siteUrl, username: _this.credForm.value.username
                });
            }
            else {
                _this.loginHelper.openForgottenPassword(_this.siteUrl);
            }
        }).finally(function () {
            modal.dismiss();
        });
    };
    /**
     * An OAuth button was clicked.
     *
     * @param {any} provider The provider that was clicked.
     */
    CoreLoginCredentialsPage.prototype.oauthClicked = function (provider) {
        if (!this.loginHelper.openBrowserForOAuthLogin(this.siteUrl, provider, this.siteConfig.launchurl)) {
            this.domUtils.showErrorModal('Invalid data.');
        }
    };
    /**
     * Signup button was clicked.
     */
    CoreLoginCredentialsPage.prototype.signup = function () {
        this.navCtrl.push('CoreLoginEmailSignupPage', { siteUrl: this.siteUrl });
    };
    CoreLoginCredentialsPage = __decorate([
        Object(core["m" /* Component */])({
            selector: 'page-core-login-credentials',
            templateUrl: 'credentials.html',
        }),
        __metadata("design:paramtypes", [ionic_angular["r" /* NavController */], ionic_angular["s" /* NavParams */], esm5_forms["d" /* FormBuilder */], app["a" /* CoreAppProvider */],
            sites["a" /* CoreSitesProvider */], helper["a" /* CoreLoginHelperProvider */],
            dom["a" /* CoreDomUtilsProvider */], _ngx_translate_core["c" /* TranslateService */], utils_utils["a" /* CoreUtilsProvider */],
            events["a" /* CoreEventsProvider */], delegate["a" /* CoreContentLinksDelegate */],
            providers_helper["a" /* CoreContentLinksHelperProvider */]])
    ], CoreLoginCredentialsPage);
    return CoreLoginCredentialsPage;
}());

//# sourceMappingURL=credentials.js.map
// EXTERNAL MODULE: ./src/components/components.module.ts
var components_module = __webpack_require__(32);

// EXTERNAL MODULE: ./src/directives/directives.module.ts + 2 modules
var directives_module = __webpack_require__(28);

// CONCATENATED MODULE: ./src/core/login/pages/credentials/credentials.module.ts
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
var credentials_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var credentials_module_CoreLoginCredentialsPageModule = /** @class */ (function () {
    function CoreLoginCredentialsPageModule() {
    }
    CoreLoginCredentialsPageModule = credentials_module___decorate([
        Object(core["I" /* NgModule */])({
            declarations: [
                credentials_CoreLoginCredentialsPage
            ],
            imports: [
                components_module["a" /* CoreComponentsModule */],
                directives_module["a" /* CoreDirectivesModule */],
                ionic_angular["l" /* IonicPageModule */].forChild(credentials_CoreLoginCredentialsPage),
                _ngx_translate_core["b" /* TranslateModule */].forChild()
            ]
        })
    ], CoreLoginCredentialsPageModule);
    return CoreLoginCredentialsPageModule;
}());

//# sourceMappingURL=credentials.module.js.map
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

// EXTERNAL MODULE: ./src/directives/format-text.ts
var format_text = __webpack_require__(39);

// EXTERNAL MODULE: ./src/providers/utils/text.ts
var utils_text = __webpack_require__(11);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.service.js
var translate_service = __webpack_require__(17);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/platform.js + 1 modules
var platform = __webpack_require__(14);

// EXTERNAL MODULE: ./src/providers/utils/url.ts
var url = __webpack_require__(24);

// EXTERNAL MODULE: ./src/providers/logger.ts
var logger = __webpack_require__(5);

// EXTERNAL MODULE: ./src/providers/filepool.ts
var filepool = __webpack_require__(16);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-controller.js
var nav_controller = __webpack_require__(21);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.js
var content = __webpack_require__(23);

// EXTERNAL MODULE: ./src/components/split-view/split-view.ts
var split_view = __webpack_require__(34);

// EXTERNAL MODULE: ./src/providers/utils/iframe.ts
var iframe = __webpack_require__(37);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item.ngfactory.js + 1 modules
var item_ngfactory = __webpack_require__(33);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item.js
var item = __webpack_require__(20);

// EXTERNAL MODULE: ./node_modules/ionic-angular/util/form.js
var util_form = __webpack_require__(19);

// EXTERNAL MODULE: ./node_modules/ionic-angular/config/config.js
var config = __webpack_require__(6);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-reorder.js + 1 modules
var item_reorder = __webpack_require__(27);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-content.js
var item_content = __webpack_require__(30);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/input/input.ngfactory.js
var input_ngfactory = __webpack_require__(91);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/input/input.js
var input = __webpack_require__(76);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/app/app.js + 3 modules
var app_app = __webpack_require__(26);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/dom-controller.js
var dom_controller = __webpack_require__(25);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.pipe.js
var translate_pipe = __webpack_require__(29);

// EXTERNAL MODULE: ./src/components/show-password/show-password.ngfactory.js
var show_password_ngfactory = __webpack_require__(641);

// EXTERNAL MODULE: ./src/components/show-password/show-password.ts
var show_password = __webpack_require__(330);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/list/list.js + 1 modules
var list = __webpack_require__(74);

// EXTERNAL MODULE: ./node_modules/ionic-angular/gestures/gesture-controller.js
var gesture_controller = __webpack_require__(36);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/list/list-header.js
var list_header = __webpack_require__(270);

// EXTERNAL MODULE: ./node_modules/@angular/common/esm5/common.js
var common = __webpack_require__(8);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.ngfactory.js
var button_ngfactory = __webpack_require__(45);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.js
var button_button = __webpack_require__(40);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-header.js
var toolbar_header = __webpack_require__(417);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/view-controller.js
var view_controller = __webpack_require__(35);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/navbar.ngfactory.js
var navbar_ngfactory = __webpack_require__(1282);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/navbar.js
var navbar = __webpack_require__(191);

// EXTERNAL MODULE: ./src/directives/back-button.ts
var back_button = __webpack_require__(632);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.ngfactory.js
var toolbar_title_ngfactory = __webpack_require__(1283);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.js
var toolbar_title = __webpack_require__(324);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar.js
var toolbar = __webpack_require__(236);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.ngfactory.js
var content_ngfactory = __webpack_require__(178);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/keyboard.js
var keyboard = __webpack_require__(99);

// EXTERNAL MODULE: ./src/components/loading/loading.ngfactory.js
var loading_ngfactory = __webpack_require__(56);

// EXTERNAL MODULE: ./src/components/loading/loading.ts
var loading = __webpack_require__(50);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-params.js
var nav_params = __webpack_require__(59);

// CONCATENATED MODULE: ./src/core/login/pages/credentials/credentials.ngfactory.js
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 






















































var styles_CoreLoginCredentialsPage = [];
var RenderType_CoreLoginCredentialsPage = core["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_CoreLoginCredentialsPage, data: {} });

function View_CoreLoginCredentialsPage_1(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 0, "img", [["role", "presentation"]], [[8, "src", 4]], null, null, null, null))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.logoUrl; _ck(_v, 0, 0, currVal_0); }); }
function View_CoreLoginCredentialsPage_2(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 0, "img", [["class", "login-logo"], ["role", "presentation"], ["src", "assets/img/login_logo.png"]], null, null, null, null, null))], null, null); }
function View_CoreLoginCredentialsPage_3(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "p", [["class", "item-heading core-siteurl"], ["padding", ""]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](1, null, ["", ""]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.siteUrl; _ck(_v, 1, 0, currVal_0); }); }
function View_CoreLoginCredentialsPage_4(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "p", [["class", "item-heading core-sitename"], ["padding", ""]], null, null, null, null, null)), (_l()(), core["_31" /* ɵeld */](1, 0, null, null, 1, "core-format-text", [], null, null, null, null, null)), core["_30" /* ɵdid */](2, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform["a" /* Platform */], utils_utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], app["a" /* CoreAppProvider */], providers_helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */]], { text: [0, "text"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.siteName; _ck(_v, 2, 0, currVal_0); }, null); }
function View_CoreLoginCredentialsPage_5(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "p", [["class", "core-siteurl"]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](1, null, ["", ""]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.siteUrl; _ck(_v, 1, 0, currVal_0); }); }
function View_CoreLoginCredentialsPage_6(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 13, "ion-item", [["class", "item item-block"]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 1, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 2, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 3, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 3, 5, "ion-input", [["autocapitalize", "none"], ["autocorrect", "off"], ["formControlName", "username"], ["name", "username"], ["type", "text"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], null, null, input_ngfactory["b" /* View_TextInput_0 */], input_ngfactory["a" /* RenderType_TextInput */])), core["_30" /* ɵdid */](8, 671744, null, 0, esm5_forms["f" /* FormControlName */], [[3, esm5_forms["b" /* ControlContainer */]], [8, null], [8, null], [8, null]], { name: [0, "name"] }, null), core["_50" /* ɵprd */](2048, null, esm5_forms["m" /* NgControl */], null, [esm5_forms["f" /* FormControlName */]]), core["_30" /* ɵdid */](10, 16384, null, 0, esm5_forms["n" /* NgControlStatus */], [esm5_forms["m" /* NgControl */]], null, null), core["_30" /* ɵdid */](11, 5423104, null, 0, input["a" /* TextInput */], [config["a" /* Config */], platform["a" /* Platform */], util_form["a" /* Form */], app_app["a" /* App */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, content["a" /* Content */]], [2, item["a" /* Item */]], [2, esm5_forms["m" /* NgControl */]], dom_controller["a" /* DomController */]], { type: [0, "type"], autocorrect: [1, "autocorrect"], placeholder: [2, "placeholder"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "]))], function (_ck, _v) { var currVal_7 = "username"; _ck(_v, 8, 0, currVal_7); var currVal_8 = "text"; var currVal_9 = "off"; var currVal_10 = core["_34" /* ɵinlineInterpolate */](1, "", core["_56" /* ɵunv */](_v, 11, 2, core["_44" /* ɵnov */](_v, 12).transform("core.login.username")), ""); _ck(_v, 11, 0, currVal_8, currVal_9, currVal_10); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 10).ngClassUntouched; var currVal_1 = core["_44" /* ɵnov */](_v, 10).ngClassTouched; var currVal_2 = core["_44" /* ɵnov */](_v, 10).ngClassPristine; var currVal_3 = core["_44" /* ɵnov */](_v, 10).ngClassDirty; var currVal_4 = core["_44" /* ɵnov */](_v, 10).ngClassValid; var currVal_5 = core["_44" /* ɵnov */](_v, 10).ngClassInvalid; var currVal_6 = core["_44" /* ɵnov */](_v, 10).ngClassPending; _ck(_v, 7, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6); }); }
function View_CoreLoginCredentialsPage_7(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 17, "ion-item", [["class", "item item-block"], ["margin-bottom", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 4, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 5, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 6, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 3, 9, "core-show-password", [["item-content", ""]], null, null, null, show_password_ngfactory["b" /* View_CoreShowPasswordComponent_0 */], show_password_ngfactory["a" /* RenderType_CoreShowPasswordComponent */])), core["_30" /* ɵdid */](8, 4308992, null, 0, show_password["a" /* CoreShowPasswordComponent */], [core["t" /* ElementRef */], utils_utils["a" /* CoreUtilsProvider */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](10, 0, null, 0, 5, "ion-input", [["class", "core-ioninput-password"], ["core-show-password", ""], ["formControlName", "password"], ["name", "password"], ["type", "password"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], null, null, input_ngfactory["b" /* View_TextInput_0 */], input_ngfactory["a" /* RenderType_TextInput */])), core["_30" /* ɵdid */](11, 671744, null, 0, esm5_forms["f" /* FormControlName */], [[3, esm5_forms["b" /* ControlContainer */]], [8, null], [8, null], [8, null]], { name: [0, "name"] }, null), core["_50" /* ɵprd */](2048, null, esm5_forms["m" /* NgControl */], null, [esm5_forms["f" /* FormControlName */]]), core["_30" /* ɵdid */](13, 16384, null, 0, esm5_forms["n" /* NgControlStatus */], [esm5_forms["m" /* NgControl */]], null, null), core["_30" /* ɵdid */](14, 5423104, null, 0, input["a" /* TextInput */], [config["a" /* Config */], platform["a" /* Platform */], util_form["a" /* Form */], app_app["a" /* App */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, content["a" /* Content */]], [2, item["a" /* Item */]], [2, esm5_forms["m" /* NgControl */]], dom_controller["a" /* DomController */]], { type: [0, "type"], clearOnEdit: [1, "clearOnEdit"], placeholder: [2, "placeholder"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                    "])), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "]))], function (_ck, _v) { var currVal_0 = "password"; _ck(_v, 8, 0, currVal_0); var currVal_8 = "password"; _ck(_v, 11, 0, currVal_8); var currVal_9 = "password"; var currVal_10 = false; var currVal_11 = core["_34" /* ɵinlineInterpolate */](1, "", core["_56" /* ɵunv */](_v, 14, 2, core["_44" /* ɵnov */](_v, 15).transform("core.login.password")), ""); _ck(_v, 14, 0, currVal_9, currVal_10, currVal_11); }, function (_ck, _v) { var currVal_1 = core["_44" /* ɵnov */](_v, 13).ngClassUntouched; var currVal_2 = core["_44" /* ɵnov */](_v, 13).ngClassTouched; var currVal_3 = core["_44" /* ɵnov */](_v, 13).ngClassPristine; var currVal_4 = core["_44" /* ɵnov */](_v, 13).ngClassDirty; var currVal_5 = core["_44" /* ɵnov */](_v, 13).ngClassValid; var currVal_6 = core["_44" /* ɵnov */](_v, 13).ngClassInvalid; var currVal_7 = core["_44" /* ɵnov */](_v, 13).ngClassPending; _ck(_v, 10, 0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7); }); }
function View_CoreLoginCredentialsPage_9(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 8, "button", [["class", "core-oauth-icon item item-block"], ["ion-item", ""], ["text-wrap", ""]], [[8, "title", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.oauthClicked(_v.context.$implicit) !== false);
        ad = (pd_0 && ad);
    } return ad; }, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 10, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 11, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 12, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 0, 0, "img", [["item-start", ""]], [[8, "src", 4], [8, "alt", 0]], null, null, null, null)), (_l()(), core["_55" /* ɵted */](8, 2, ["\n                    ", "\n                "]))], null, function (_ck, _v) { var currVal_0 = core["_34" /* ɵinlineInterpolate */](1, "", _v.context.$implicit.name, ""); _ck(_v, 0, 0, currVal_0); var currVal_1 = _v.context.$implicit.iconurl; var currVal_2 = core["_34" /* ɵinlineInterpolate */](1, "", _v.context.$implicit.name, ""); _ck(_v, 7, 0, currVal_1, currVal_2); var currVal_3 = _v.context.$implicit.name; _ck(_v, 8, 0, currVal_3); }); }
function View_CoreLoginCredentialsPage_8(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 14, "ion-list", [["padding-top", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, list["a" /* List */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], platform["a" /* Platform */], gesture_controller["l" /* GestureController */], dom_controller["a" /* DomController */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 7, "ion-list-header", [["class", "item"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](4, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 7, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 8, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 9, { _icons: 1 }), core["_30" /* ɵdid */](8, 16384, null, 0, list_header["a" /* ListHeader */], [config["a" /* Config */], core["V" /* Renderer */], core["t" /* ElementRef */], [8, null]], null, null), (_l()(), core["_55" /* ɵted */](9, 2, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreLoginCredentialsPage_9)), core["_30" /* ɵdid */](13, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "]))], function (_ck, _v) { var _co = _v.component; var currVal_1 = _co.identityProviders; _ck(_v, 13, 0, currVal_1); }, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 9, 0, core["_44" /* ɵnov */](_v, 10).transform("core.login.potentialidps")); _ck(_v, 9, 0, currVal_0); }); }
function View_CoreLoginCredentialsPage_11(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 10, "ion-item", [["class", "item item-block"], ["no-lines", ""], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 16, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 17, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 18, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 2, 2, "p", [], null, null, null, null, null)), (_l()(), core["_31" /* ɵeld */](8, 0, null, null, 1, "core-format-text", [], null, null, null, null, null)), core["_30" /* ɵdid */](9, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform["a" /* Platform */], utils_utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], app["a" /* CoreAppProvider */], providers_helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */]], { text: [0, "text"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.authInstructions; _ck(_v, 9, 0, currVal_0); }, null); }
function View_CoreLoginCredentialsPage_10(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 19, "ion-list", [["padding-top", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, list["a" /* List */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], platform["a" /* Platform */], gesture_controller["l" /* GestureController */], dom_controller["a" /* DomController */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 7, "ion-list-header", [["class", "item"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](4, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 13, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 14, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 15, { _icons: 1 }), core["_30" /* ɵdid */](8, 16384, null, 0, list_header["a" /* ListHeader */], [config["a" /* Config */], core["V" /* Renderer */], core["t" /* ElementRef */], [8, null]], null, null), (_l()(), core["_55" /* ɵted */](9, 2, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreLoginCredentialsPage_11)), core["_30" /* ɵdid */](13, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ɵeld */](15, 0, null, null, 3, "button", [["block", ""], ["ion-button", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.signup() !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](16, 1097728, null, 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { block: [0, "block"] }, null), (_l()(), core["_55" /* ɵted */](17, 0, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "]))], function (_ck, _v) { var _co = _v.component; var currVal_1 = _co.authInstructions; _ck(_v, 13, 0, currVal_1); var currVal_2 = ""; _ck(_v, 16, 0, currVal_2); }, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 9, 0, core["_44" /* ɵnov */](_v, 10).transform("core.login.firsttime")); _ck(_v, 9, 0, currVal_0); var currVal_3 = core["_56" /* ɵunv */](_v, 17, 0, core["_44" /* ɵnov */](_v, 18).transform("core.login.startsignup")); _ck(_v, 17, 0, currVal_3); }); }
function View_CoreLoginCredentialsPage_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 12, "ion-header", [], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, toolbar_header["a" /* Header */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, view_controller["a" /* ViewController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 8, "ion-navbar", [["class", "toolbar"], ["core-back-button", ""]], [[8, "hidden", 0], [2, "statusbar-padding", null]], null, null, navbar_ngfactory["b" /* View_Navbar_0 */], navbar_ngfactory["a" /* RenderType_Navbar */])), core["_30" /* ɵdid */](4, 49152, null, 0, navbar["a" /* Navbar */], [app_app["a" /* App */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_30" /* ɵdid */](5, 212992, null, 0, back_button["a" /* CoreBackButtonDirective */], [navbar["a" /* Navbar */], platform["a" /* Platform */], translate_service["a" /* TranslateService */], events["a" /* CoreEventsProvider */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n        "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 3, 3, "ion-title", [], null, null, null, toolbar_title_ngfactory["b" /* View_ToolbarTitle_0 */], toolbar_title_ngfactory["a" /* RenderType_ToolbarTitle */])), core["_30" /* ɵdid */](8, 49152, null, 0, toolbar_title["a" /* ToolbarTitle */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), (_l()(), core["_55" /* ɵted */](9, 0, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_31" /* ɵeld */](14, 0, null, null, 63, "ion-content", [["class", "core-center-view"]], [[2, "statusbar-padding", null], [2, "has-refresher", null]], null, null, content_ngfactory["b" /* View_Content_0 */], content_ngfactory["a" /* RenderType_Content */])), core["_30" /* ɵdid */](15, 4374528, null, 0, content["a" /* Content */], [config["a" /* Config */], platform["a" /* Platform */], dom_controller["a" /* DomController */], core["t" /* ElementRef */], core["V" /* Renderer */], app_app["a" /* App */], keyboard["a" /* Keyboard */], core["M" /* NgZone */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n    "])), (_l()(), core["_31" /* ɵeld */](17, 0, null, 1, 59, "core-loading", [], null, null, null, loading_ngfactory["b" /* View_CoreLoadingComponent_0 */], loading_ngfactory["a" /* RenderType_CoreLoadingComponent */])), core["_30" /* ɵdid */](18, 638976, null, 0, loading["a" /* CoreLoadingComponent */], [translate_service["a" /* TranslateService */], core["t" /* ElementRef */], events["a" /* CoreEventsProvider */], utils_utils["a" /* CoreUtilsProvider */]], { hideUntil: [0, "hideUntil"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_31" /* ɵeld */](20, 0, null, 0, 55, "div", [["class", "box"]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](22, 0, null, null, 19, "div", [["margin-bottom", ""], ["text-center", ""], ["text-wrap", ""]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreLoginCredentialsPage_1)), core["_30" /* ɵdid */](26, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreLoginCredentialsPage_2)), core["_30" /* ɵdid */](29, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n                "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreLoginCredentialsPage_3)), core["_30" /* ɵdid */](33, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreLoginCredentialsPage_4)), core["_30" /* ɵdid */](37, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreLoginCredentialsPage_5)), core["_30" /* ɵdid */](40, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](43, 0, null, null, 16, "form", [["ion-list", ""], ["novalidate", ""]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngSubmit"], [null, "submit"], [null, "reset"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("submit" === en)) {
        var pd_0 = (core["_44" /* ɵnov */](_v, 45).onSubmit($event) !== false);
        ad = (pd_0 && ad);
    } if (("reset" === en)) {
        var pd_1 = (core["_44" /* ɵnov */](_v, 45).onReset() !== false);
        ad = (pd_1 && ad);
    } if (("ngSubmit" === en)) {
        var pd_2 = (_co.login() !== false);
        ad = (pd_2 && ad);
    } return ad; }, null, null)), core["_30" /* ɵdid */](44, 16384, null, 0, esm5_forms["w" /* ɵbf */], [], null, null), core["_30" /* ɵdid */](45, 540672, null, 0, esm5_forms["h" /* FormGroupDirective */], [[8, null], [8, null]], { form: [0, "form"] }, { ngSubmit: "ngSubmit" }), core["_50" /* ɵprd */](2048, null, esm5_forms["b" /* ControlContainer */], null, [esm5_forms["h" /* FormGroupDirective */]]), core["_30" /* ɵdid */](47, 16384, null, 0, esm5_forms["o" /* NgControlStatusGroup */], [esm5_forms["b" /* ControlContainer */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreLoginCredentialsPage_6)), core["_30" /* ɵdid */](50, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreLoginCredentialsPage_7)), core["_30" /* ɵdid */](53, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ɵeld */](55, 0, null, null, 3, "button", [["block", ""], ["ion-button", ""]], [[8, "disabled", 0]], null, null, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](56, 1097728, null, 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { block: [0, "block"] }, null), (_l()(), core["_55" /* ɵted */](57, 0, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](62, 0, null, null, 6, "div", [["padding-top", ""]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ɵeld */](64, 0, null, null, 3, "button", [["block", ""], ["color", "light"], ["ion-button", ""], ["text-wrap", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.forgottenPassword() !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](65, 1097728, null, 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { color: [0, "color"], block: [1, "block"] }, null), (_l()(), core["_55" /* ɵted */](66, 0, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreLoginCredentialsPage_8)), core["_30" /* ɵdid */](71, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreLoginCredentialsPage_10)), core["_30" /* ɵdid */](74, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; _ck(_v, 5, 0); var currVal_5 = _co.pageLoaded; _ck(_v, 18, 0, currVal_5); var currVal_6 = _co.logoUrl; _ck(_v, 26, 0, currVal_6); var currVal_7 = !_co.logoUrl; _ck(_v, 29, 0, currVal_7); var currVal_8 = !_co.siteName; _ck(_v, 33, 0, currVal_8); var currVal_9 = _co.siteName; _ck(_v, 37, 0, currVal_9); var currVal_10 = _co.siteName; _ck(_v, 40, 0, currVal_10); var currVal_18 = _co.credForm; _ck(_v, 45, 0, currVal_18); var currVal_19 = (_co.siteChecked && !_co.isBrowserSSO); _ck(_v, 50, 0, currVal_19); var currVal_20 = (_co.siteChecked && !_co.isBrowserSSO); _ck(_v, 53, 0, currVal_20); var currVal_22 = ""; _ck(_v, 56, 0, currVal_22); var currVal_24 = "light"; var currVal_25 = ""; _ck(_v, 65, 0, currVal_24, currVal_25); var currVal_27 = (_co.identityProviders && _co.identityProviders.length); _ck(_v, 71, 0, currVal_27); var currVal_28 = _co.canSignup; _ck(_v, 74, 0, currVal_28); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = core["_44" /* ɵnov */](_v, 4)._hidden; var currVal_1 = core["_44" /* ɵnov */](_v, 4)._sbPadding; _ck(_v, 3, 0, currVal_0, currVal_1); var currVal_2 = core["_56" /* ɵunv */](_v, 9, 0, core["_44" /* ɵnov */](_v, 10).transform("core.login.login")); _ck(_v, 9, 0, currVal_2); var currVal_3 = core["_44" /* ɵnov */](_v, 15).statusbarPadding; var currVal_4 = core["_44" /* ɵnov */](_v, 15)._hasRefresher; _ck(_v, 14, 0, currVal_3, currVal_4); var currVal_11 = core["_44" /* ɵnov */](_v, 47).ngClassUntouched; var currVal_12 = core["_44" /* ɵnov */](_v, 47).ngClassTouched; var currVal_13 = core["_44" /* ɵnov */](_v, 47).ngClassPristine; var currVal_14 = core["_44" /* ɵnov */](_v, 47).ngClassDirty; var currVal_15 = core["_44" /* ɵnov */](_v, 47).ngClassValid; var currVal_16 = core["_44" /* ɵnov */](_v, 47).ngClassInvalid; var currVal_17 = core["_44" /* ɵnov */](_v, 47).ngClassPending; _ck(_v, 43, 0, currVal_11, currVal_12, currVal_13, currVal_14, currVal_15, currVal_16, currVal_17); var currVal_21 = ((_co.siteChecked && !_co.isBrowserSSO) && !_co.credForm.valid); _ck(_v, 55, 0, currVal_21); var currVal_23 = core["_56" /* ɵunv */](_v, 57, 0, core["_44" /* ɵnov */](_v, 58).transform("core.login.loginbutton")); _ck(_v, 57, 0, currVal_23); var currVal_26 = core["_56" /* ɵunv */](_v, 66, 0, core["_44" /* ɵnov */](_v, 67).transform("core.login.forgotten")); _ck(_v, 66, 0, currVal_26); }); }
function View_CoreLoginCredentialsPage_Host_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "page-core-login-credentials", [], null, null, null, View_CoreLoginCredentialsPage_0, RenderType_CoreLoginCredentialsPage)), core["_30" /* ɵdid */](1, 49152, null, 0, credentials_CoreLoginCredentialsPage, [nav_controller["a" /* NavController */], nav_params["a" /* NavParams */], esm5_forms["d" /* FormBuilder */], app["a" /* CoreAppProvider */], sites["a" /* CoreSitesProvider */], helper["a" /* CoreLoginHelperProvider */], dom["a" /* CoreDomUtilsProvider */], translate_service["a" /* TranslateService */], utils_utils["a" /* CoreUtilsProvider */], events["a" /* CoreEventsProvider */], delegate["a" /* CoreContentLinksDelegate */], providers_helper["a" /* CoreContentLinksHelperProvider */]], null, null)], null, null); }
var CoreLoginCredentialsPageNgFactory = core["_27" /* ɵccf */]("page-core-login-credentials", credentials_CoreLoginCredentialsPage, View_CoreLoginCredentialsPage_Host_0, {}, {}, []);

//# sourceMappingURL=credentials.ngfactory.js.map
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

// CONCATENATED MODULE: ./src/core/login/pages/credentials/credentials.module.ngfactory.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoreLoginCredentialsPageModuleNgFactory", function() { return CoreLoginCredentialsPageModuleNgFactory; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 






























var CoreLoginCredentialsPageModuleNgFactory = core["_28" /* ɵcmf */](credentials_module_CoreLoginCredentialsPageModule, [], function (_l) { return core["_40" /* ɵmod */]([core["_41" /* ɵmpd */](512, core["o" /* ComponentFactoryResolver */], core["_21" /* ɵCodegenComponentFactoryResolver */], [[8, [action_sheet_component_ngfactory["a" /* ActionSheetCmpNgFactory */], alert_component_ngfactory["a" /* AlertCmpNgFactory */], app_root_ngfactory["a" /* IonicAppNgFactory */], loading_component_ngfactory["a" /* LoadingCmpNgFactory */], modal_component_ngfactory["a" /* ModalCmpNgFactory */], picker_component_ngfactory["a" /* PickerCmpNgFactory */], popover_component_ngfactory["a" /* PopoverCmpNgFactory */], select_popover_component_ngfactory["a" /* SelectPopoverNgFactory */], toast_component_ngfactory["a" /* ToastCmpNgFactory */], context_menu_popover_ngfactory["a" /* CoreContextMenuPopoverComponentNgFactory */], course_picker_menu_popover_ngfactory["a" /* CoreCoursePickerMenuPopoverComponentNgFactory */], recaptchamodal_ngfactory["a" /* CoreRecaptchaModalComponentNgFactory */], CoreLoginCredentialsPageNgFactory]], [3, core["o" /* ComponentFactoryResolver */]], core["K" /* NgModuleRef */]]), core["_41" /* ɵmpd */](4608, common["m" /* NgLocalization */], common["l" /* NgLocaleLocalization */], [core["G" /* LOCALE_ID */], [2, common["v" /* ɵa */]]]), core["_41" /* ɵmpd */](4608, esm5_forms["x" /* ɵi */], esm5_forms["x" /* ɵi */], []), core["_41" /* ɵmpd */](4608, esm5_forms["d" /* FormBuilder */], esm5_forms["d" /* FormBuilder */], []), core["_41" /* ɵmpd */](4608, translate_loader["b" /* TranslateLoader */], translate_loader["a" /* TranslateFakeLoader */], []), core["_41" /* ɵmpd */](4608, translate_compiler["a" /* TranslateCompiler */], translate_compiler["b" /* TranslateFakeCompiler */], []), core["_41" /* ɵmpd */](4608, translate_parser["b" /* TranslateParser */], translate_parser["a" /* TranslateDefaultParser */], []), core["_41" /* ɵmpd */](4608, missing_translation_handler["b" /* MissingTranslationHandler */], missing_translation_handler["a" /* FakeMissingTranslationHandler */], []), core["_41" /* ɵmpd */](4608, translate_service["a" /* TranslateService */], translate_service["a" /* TranslateService */], [translate_store["a" /* TranslateStore */], translate_loader["b" /* TranslateLoader */], translate_compiler["a" /* TranslateCompiler */], translate_parser["b" /* TranslateParser */], missing_translation_handler["b" /* MissingTranslationHandler */], translate_service["b" /* USE_DEFAULT_LANG */], translate_service["c" /* USE_STORE */]]), core["_41" /* ɵmpd */](512, common["b" /* CommonModule */], common["b" /* CommonModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["v" /* ɵba */], esm5_forms["v" /* ɵba */], []), core["_41" /* ɵmpd */](512, esm5_forms["i" /* FormsModule */], esm5_forms["i" /* FormsModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["s" /* ReactiveFormsModule */], esm5_forms["s" /* ReactiveFormsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["a" /* IonicModule */], ionic_angular_module["a" /* IonicModule */], []), core["_41" /* ɵmpd */](512, _ngx_translate_core["b" /* TranslateModule */], _ngx_translate_core["b" /* TranslateModule */], []), core["_41" /* ɵmpd */](512, directives_module["a" /* CoreDirectivesModule */], directives_module["a" /* CoreDirectivesModule */], []), core["_41" /* ɵmpd */](512, pipes_module["a" /* CorePipesModule */], pipes_module["a" /* CorePipesModule */], []), core["_41" /* ɵmpd */](512, components_module["a" /* CoreComponentsModule */], components_module["a" /* CoreComponentsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["b" /* IonicPageModule */], ionic_angular_module["b" /* IonicPageModule */], []), core["_41" /* ɵmpd */](512, credentials_module_CoreLoginCredentialsPageModule, credentials_module_CoreLoginCredentialsPageModule, []), core["_41" /* ɵmpd */](256, translate_service["c" /* USE_STORE */], undefined, []), core["_41" /* ɵmpd */](256, translate_service["b" /* USE_DEFAULT_LANG */], undefined, []), core["_41" /* ɵmpd */](256, module_loader["a" /* LAZY_LOADED_TOKEN */], credentials_CoreLoginCredentialsPage, [])]); });

//# sourceMappingURL=credentials.module.ngfactory.js.map

/***/ })

});
//# sourceMappingURL=51.js.map