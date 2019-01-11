webpackJsonp([49],{

/***/ 1927:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/@angular/core/esm5/core.js
var core = __webpack_require__(0);

// EXTERNAL MODULE: ./node_modules/ionic-angular/index.js + 3 modules
var ionic_angular = __webpack_require__(8);

// EXTERNAL MODULE: ./node_modules/@ionic-native/splash-screen/index.js
var splash_screen = __webpack_require__(692);

// EXTERNAL MODULE: ./src/providers/app.ts
var app = __webpack_require__(9);

// EXTERNAL MODULE: ./src/providers/init.ts
var init = __webpack_require__(153);

// EXTERNAL MODULE: ./src/providers/sites.ts
var sites = __webpack_require__(1);

// EXTERNAL MODULE: ./src/core/constants.ts
var constants = __webpack_require__(39);

// EXTERNAL MODULE: ./src/core/login/providers/helper.ts
var helper = __webpack_require__(133);

// CONCATENATED MODULE: ./src/core/login/pages/init/init.ts
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
 * Page that displays a "splash screen" while the app is being initialized.
 */
var init_CoreLoginInitPage = /** @class */ (function () {
    function CoreLoginInitPage(navCtrl, appProvider, initDelegate, sitesProvider, loginHelper, splashScreen) {
        this.navCtrl = navCtrl;
        this.appProvider = appProvider;
        this.initDelegate = initDelegate;
        this.sitesProvider = sitesProvider;
        this.loginHelper = loginHelper;
        this.splashScreen = splashScreen;
    }
    /**
     * View loaded.
     */
    CoreLoginInitPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        // Wait for the app to be ready.
        this.initDelegate.ready().then(function () {
            // Check if there was a pending redirect.
            var redirectData = _this.appProvider.getRedirect();
            if (redirectData.siteId && redirectData.page) {
                // Unset redirect data.
                _this.appProvider.storeRedirect('', '', '');
                // Only accept the redirect if it was stored less than 20 seconds ago.
                if (Date.now() - redirectData.timemodified < 20000) {
                    if (redirectData.siteId != constants["a" /* CoreConstants */].NO_SITE_ID) {
                        // The redirect is pointing to a site, load it.
                        return _this.sitesProvider.loadSite(redirectData.siteId, redirectData.page, redirectData.params)
                            .then(function (loggedIn) {
                            if (loggedIn) {
                                return _this.navCtrl.setRoot(redirectData.page, redirectData.params, { animate: false });
                            }
                        }).catch(function () {
                            // Site doesn't exist.
                            return _this.loadPage();
                        });
                    }
                    else {
                        // No site to load, just open the state.
                        return _this.navCtrl.setRoot(redirectData.page, redirectData.params, { animate: false });
                    }
                }
            }
            return _this.loadPage();
        }).then(function () {
            // If we hide the splash screen now, the init view is still seen for an instant. Wait a bit to make sure it isn't seen.
            setTimeout(function () {
                _this.splashScreen.hide();
            }, 100);
        });
    };
    /**
     * Load the right page.
     *
     * @return {Promise<any>} Promise resolved when done.
     */
    CoreLoginInitPage.prototype.loadPage = function () {
        var _this = this;
        if (this.sitesProvider.isLoggedIn()) {
            if (!this.loginHelper.isSiteLoggedOut()) {
                // User is logged in, go to site initial page.
                return this.loginHelper.goToSiteInitialPage();
            }
            else {
                // The site is marked as logged out. Logout and try again.
                return this.sitesProvider.logout().then(function () {
                    return _this.loadPage();
                });
            }
        }
        else {
            return this.sitesProvider.hasSites().then(function (hasSites) {
                if (hasSites) {
                    return _this.navCtrl.setRoot('CoreLoginSitesPage');
                }
                else {
                    return _this.loginHelper.goToAddSite(true);
                }
            });
        }
    };
    CoreLoginInitPage = __decorate([
        Object(core["m" /* Component */])({
            selector: 'page-core-login-init',
            templateUrl: 'init.html',
        }),
        __metadata("design:paramtypes", [ionic_angular["s" /* NavController */], app["a" /* CoreAppProvider */], init["a" /* CoreInitDelegate */],
            sites["a" /* CoreSitesProvider */], helper["a" /* CoreLoginHelperProvider */],
            splash_screen["a" /* SplashScreen */]])
    ], CoreLoginInitPage);
    return CoreLoginInitPage;
}());

//# sourceMappingURL=init.js.map
// CONCATENATED MODULE: ./src/core/login/pages/init/init.module.ts
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
var init_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var init_module_CoreLoginInitPageModule = /** @class */ (function () {
    function CoreLoginInitPageModule() {
    }
    CoreLoginInitPageModule = init_module___decorate([
        Object(core["I" /* NgModule */])({
            declarations: [
                init_CoreLoginInitPage,
            ],
            imports: [
                ionic_angular["l" /* IonicPageModule */].forChild(init_CoreLoginInitPage),
            ],
        })
    ], CoreLoginInitPageModule);
    return CoreLoginInitPageModule;
}());

//# sourceMappingURL=init.module.js.map
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

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.ngfactory.js
var content_ngfactory = __webpack_require__(185);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.js
var content = __webpack_require__(23);

// EXTERNAL MODULE: ./node_modules/ionic-angular/config/config.js
var config = __webpack_require__(6);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/platform.js + 1 modules
var platform = __webpack_require__(14);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/dom-controller.js
var dom_controller = __webpack_require__(31);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/app/app.js + 3 modules
var app_app = __webpack_require__(33);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/keyboard.js
var keyboard = __webpack_require__(106);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/view-controller.js
var view_controller = __webpack_require__(36);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-controller.js
var nav_controller = __webpack_require__(21);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/spinner/spinner.ngfactory.js
var spinner_ngfactory = __webpack_require__(111);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/spinner/spinner.js
var spinner = __webpack_require__(94);

// CONCATENATED MODULE: ./src/core/login/pages/init/init.ngfactory.js
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 


















var styles_CoreLoginInitPage = [];
var RenderType_CoreLoginInitPage = core["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_CoreLoginInitPage, data: {} });

function View_CoreLoginInitPage_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 13, "ion-content", [], [[2, "statusbar-padding", null], [2, "has-refresher", null]], null, null, content_ngfactory["b" /* View_Content_0 */], content_ngfactory["a" /* RenderType_Content */])), core["_30" /* ɵdid */](1, 4374528, null, 0, content["a" /* Content */], [config["a" /* Config */], platform["a" /* Platform */], dom_controller["a" /* DomController */], core["t" /* ElementRef */], core["V" /* Renderer */], app_app["a" /* App */], keyboard["a" /* Keyboard */], core["M" /* NgZone */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n    "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, 1, 9, "div", [["class", "core-bglogo"]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_31" /* ɵeld */](5, 0, null, null, 6, "div", [["class", "core-logo"]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, null, 0, "img", [["src", "assets/img/splash_logo.png"]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](9, 0, null, null, 1, "ion-spinner", [], [[2, "spinner-paused", null]], null, null, spinner_ngfactory["b" /* View_Spinner_0 */], spinner_ngfactory["a" /* RenderType_Spinner */])), core["_30" /* ɵdid */](10, 114688, null, 0, spinner["a" /* Spinner */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { _ck(_v, 10, 0); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 1).statusbarPadding; var currVal_1 = core["_44" /* ɵnov */](_v, 1)._hasRefresher; _ck(_v, 0, 0, currVal_0, currVal_1); var currVal_2 = core["_44" /* ɵnov */](_v, 10)._paused; _ck(_v, 9, 0, currVal_2); }); }
function View_CoreLoginInitPage_Host_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "page-core-login-init", [], null, null, null, View_CoreLoginInitPage_0, RenderType_CoreLoginInitPage)), core["_30" /* ɵdid */](1, 49152, null, 0, init_CoreLoginInitPage, [nav_controller["a" /* NavController */], app["a" /* CoreAppProvider */], init["a" /* CoreInitDelegate */], sites["a" /* CoreSitesProvider */], helper["a" /* CoreLoginHelperProvider */], splash_screen["a" /* SplashScreen */]], null, null)], null, null); }
var CoreLoginInitPageNgFactory = core["_27" /* ɵccf */]("page-core-login-init", init_CoreLoginInitPage, View_CoreLoginInitPage_Host_0, {}, {}, []);

//# sourceMappingURL=init.ngfactory.js.map
// EXTERNAL MODULE: ./node_modules/@angular/common/esm5/common.js
var common = __webpack_require__(7);

// EXTERNAL MODULE: ./node_modules/@angular/forms/esm5/forms.js
var esm5_forms = __webpack_require__(22);

// EXTERNAL MODULE: ./node_modules/ionic-angular/module.js
var ionic_angular_module = __webpack_require__(662);

// EXTERNAL MODULE: ./node_modules/ionic-angular/util/module-loader.js
var module_loader = __webpack_require__(248);

// CONCATENATED MODULE: ./src/core/login/pages/init/init.module.ngfactory.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoreLoginInitPageModuleNgFactory", function() { return CoreLoginInitPageModuleNgFactory; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 

















var CoreLoginInitPageModuleNgFactory = core["_28" /* ɵcmf */](init_module_CoreLoginInitPageModule, [], function (_l) { return core["_40" /* ɵmod */]([core["_41" /* ɵmpd */](512, core["o" /* ComponentFactoryResolver */], core["_21" /* ɵCodegenComponentFactoryResolver */], [[8, [action_sheet_component_ngfactory["a" /* ActionSheetCmpNgFactory */], alert_component_ngfactory["a" /* AlertCmpNgFactory */], app_root_ngfactory["a" /* IonicAppNgFactory */], loading_component_ngfactory["a" /* LoadingCmpNgFactory */], modal_component_ngfactory["a" /* ModalCmpNgFactory */], picker_component_ngfactory["a" /* PickerCmpNgFactory */], popover_component_ngfactory["a" /* PopoverCmpNgFactory */], select_popover_component_ngfactory["a" /* SelectPopoverNgFactory */], toast_component_ngfactory["a" /* ToastCmpNgFactory */], CoreLoginInitPageNgFactory]], [3, core["o" /* ComponentFactoryResolver */]], core["K" /* NgModuleRef */]]), core["_41" /* ɵmpd */](4608, common["m" /* NgLocalization */], common["l" /* NgLocaleLocalization */], [core["G" /* LOCALE_ID */], [2, common["v" /* ɵa */]]]), core["_41" /* ɵmpd */](4608, esm5_forms["x" /* ɵi */], esm5_forms["x" /* ɵi */], []), core["_41" /* ɵmpd */](4608, esm5_forms["d" /* FormBuilder */], esm5_forms["d" /* FormBuilder */], []), core["_41" /* ɵmpd */](512, common["b" /* CommonModule */], common["b" /* CommonModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["v" /* ɵba */], esm5_forms["v" /* ɵba */], []), core["_41" /* ɵmpd */](512, esm5_forms["i" /* FormsModule */], esm5_forms["i" /* FormsModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["s" /* ReactiveFormsModule */], esm5_forms["s" /* ReactiveFormsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["a" /* IonicModule */], ionic_angular_module["a" /* IonicModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["b" /* IonicPageModule */], ionic_angular_module["b" /* IonicPageModule */], []), core["_41" /* ɵmpd */](512, init_module_CoreLoginInitPageModule, init_module_CoreLoginInitPageModule, []), core["_41" /* ɵmpd */](256, module_loader["a" /* LAZY_LOADED_TOKEN */], init_CoreLoginInitPage, [])]); });

//# sourceMappingURL=init.module.ngfactory.js.map

/***/ })

});
//# sourceMappingURL=49.js.map