webpackJsonp([2],{

/***/ 1334:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoreViewerTextPageModule", function() { return CoreViewerTextPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__text__ = __webpack_require__(1393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__directives_directives_module__ = __webpack_require__(45);
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





/**
 * Module to lazy load the page.
 */
var CoreViewerTextPageModule = /** @class */ (function () {
    function CoreViewerTextPageModule() {
    }
    CoreViewerTextPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__text__["a" /* CoreViewerTextPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_4__directives_directives_module__["a" /* CoreDirectivesModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__text__["a" /* CoreViewerTextPage */]),
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */].forChild()
            ]
        })
    ], CoreViewerTextPageModule);
    return CoreViewerTextPageModule;
}());

//# sourceMappingURL=text.module.js.map

/***/ }),

/***/ 1393:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoreViewerTextPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_utils_text__ = __webpack_require__(13);
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
 * Page to render a certain text. If opened as a modal, it will have a button to close the modal.
 */
var CoreViewerTextPage = /** @class */ (function () {
    function CoreViewerTextPage(viewCtrl, params, textUtils) {
        this.viewCtrl = viewCtrl;
        this.title = params.get('title');
        this.content = params.get('content');
        this.component = params.get('component');
        this.componentId = params.get('componentId');
    }
    /**
     * Close modal.
     */
    CoreViewerTextPage.prototype.closeModal = function () {
        this.viewCtrl.dismiss();
    };
    CoreViewerTextPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-core-viewer-text',template:/*ion-inline-start:"/ionic-projects/moodlemobile2/src/core/viewer/pages/text/text.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>{{ title }}</ion-title>\n\n        <ion-buttons end>\n            <button ion-button icon-only (click)="closeModal()" [attr.aria-label]="\'core.close\' | translate">\n                <ion-icon name="close"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n<ion-content padding>\n    <core-format-text [text]="content" [component]="component" [componentId]="componentId"></core-format-text>\n</ion-content>\n'/*ion-inline-end:"/ionic-projects/moodlemobile2/src/core/viewer/pages/text/text.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_utils_text__["a" /* CoreTextUtilsProvider */]])
    ], CoreViewerTextPage);
    return CoreViewerTextPage;
}());

//# sourceMappingURL=text.js.map

/***/ })

});
//# sourceMappingURL=2.js.map