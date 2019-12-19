webpackJsonp([39],{

/***/ 2077:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoreLoginChangePasswordPageModule", function() { return CoreLoginChangePasswordPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__change_password__ = __webpack_require__(2224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_components_module__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__directives_directives_module__ = __webpack_require__(14);
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






var CoreLoginChangePasswordPageModule = /** @class */ (function () {
    function CoreLoginChangePasswordPageModule() {
    }
    CoreLoginChangePasswordPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__change_password__["a" /* CoreLoginChangePasswordPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_4__components_components_module__["a" /* CoreComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_5__directives_directives_module__["a" /* CoreDirectivesModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__change_password__["a" /* CoreLoginChangePasswordPage */]),
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */].forChild()
            ]
        })
    ], CoreLoginChangePasswordPageModule);
    return CoreLoginChangePasswordPageModule;
}());

//# sourceMappingURL=change-password.module.js.map

/***/ }),

/***/ 2224:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoreLoginChangePasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_sites__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_helper__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_utils_dom__ = __webpack_require__(7);
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
 * Page that shows instructions to change the password.
 */
var CoreLoginChangePasswordPage = /** @class */ (function () {
    function CoreLoginChangePasswordPage(translate, sitesProvider, loginHelper, domUtls) {
        this.translate = translate;
        this.sitesProvider = sitesProvider;
        this.loginHelper = loginHelper;
        this.domUtls = domUtls;
        this.changingPassword = false;
        this.logoutLabel = this.loginHelper.getLogoutLabel();
    }
    /**
     * Show a help modal.
     */
    CoreLoginChangePasswordPage.prototype.showHelp = function () {
        this.domUtls.showAlert(this.translate.instant('core.help'), this.translate.instant('core.login.changepasswordhelp'));
    };
    /**
     * Open the change password page in a browser.
     */
    CoreLoginChangePasswordPage.prototype.openChangePasswordPage = function () {
        this.loginHelper.openInAppForEdit(this.sitesProvider.getCurrentSiteId(), '/login/change_password.php', undefined, true);
        this.changingPassword = true;
    };
    /**
     * Login the user.
     */
    CoreLoginChangePasswordPage.prototype.login = function () {
        this.loginHelper.goToSiteInitialPage();
        this.changingPassword = false;
    };
    /**
     * Logout the user.
     */
    CoreLoginChangePasswordPage.prototype.logout = function () {
        this.sitesProvider.logout();
        this.changingPassword = false;
    };
    CoreLoginChangePasswordPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-core-change-password',template:/*ion-inline-start:"/home/travis/build/moodlehq/moodlemobile2/src/core/login/pages/change-password/change-password.html"*/'<ion-header>\n    <ion-navbar core-back-button>\n        <ion-title>{{ \'core.login.changepassword\' | translate }}</ion-title>\n        <ion-buttons end>\n            <button ion-button icon-only (click)="showHelp()" [attr.aria-label]="\'core.help\' | translate">\n                <ion-icon name="help-circle"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n<ion-content padding class="core-center-view">\n    <ion-list>\n        <ion-item text-wrap *ngIf="!changingPassword">\n            <h2>{{ \'core.login.forcepasswordchangenotice\' | translate }}</h2>\n            <p padding-vertical>{{ \'core.login.changepasswordinstructions\' | translate }}</p>\n            <button text-wrap ion-button block (click)="openChangePasswordPage()">{{ \'core.login.changepasswordbutton\' | translate }}</button>\n        </ion-item>\n        <ion-item text-wrap *ngIf="changingPassword">\n            <p padding-bottom>{{ \'core.login.changepasswordreconnectinstructions\' | translate }}</p>\n            <button text-wrap ion-button block (click)="login()">{{ \'core.login.reconnect\' | translate }}</button>\n        </ion-item>\n        <ion-item text-wrap>\n            <p padding-bottom>{{ \'core.login.changepasswordlogoutinstructions\' | translate }}</p>\n            <button text-wrap ion-button block color="light" (click)="logout()">{{ logoutLabel | translate }}</button>\n        </ion-item>\n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/travis/build/moodlehq/moodlemobile2/src/core/login/pages/change-password/change-password.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_2__providers_sites__["a" /* CoreSitesProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_helper__["a" /* CoreLoginHelperProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_utils_dom__["a" /* CoreDomUtilsProvider */]])
    ], CoreLoginChangePasswordPage);
    return CoreLoginChangePasswordPage;
}());

//# sourceMappingURL=change-password.js.map

/***/ })

});
//# sourceMappingURL=39.js.map