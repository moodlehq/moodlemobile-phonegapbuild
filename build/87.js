webpackJsonp([87],{

/***/ 2040:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddonModImscpTocPageModule", function() { return AddonModImscpTocPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__directives_directives_module__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__toc__ = __webpack_require__(2187);
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





var AddonModImscpTocPageModule = /** @class */ (function () {
    function AddonModImscpTocPageModule() {
    }
    AddonModImscpTocPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__toc__["a" /* AddonModImscpTocPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__directives_directives_module__["a" /* CoreDirectivesModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_4__toc__["a" /* AddonModImscpTocPage */]),
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */].forChild()
            ],
        })
    ], AddonModImscpTocPageModule);
    return AddonModImscpTocPageModule;
}());

//# sourceMappingURL=toc.module.js.map

/***/ }),

/***/ 2187:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddonModImscpTocPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
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
 * Modal to display the TOC of a imscp.
 */
var AddonModImscpTocPage = /** @class */ (function () {
    function AddonModImscpTocPage(navParams, viewCtrl) {
        this.viewCtrl = viewCtrl;
        this.items = [];
        this.items = navParams.get('items') || [];
        this.selected = navParams.get('selected');
    }
    /**
     * Function called when an item is clicked.
     *
     * @param id ID of the clicked item.
     */
    AddonModImscpTocPage.prototype.loadItem = function (id) {
        this.viewCtrl.dismiss(id);
    };
    /**
     * Get dummy array for padding.
     *
     * @param n Array length.
     * @return Dummy array with n elements.
     */
    AddonModImscpTocPage.prototype.getNumberForPadding = function (n) {
        return new Array(n);
    };
    /**
     * Close modal.
     */
    AddonModImscpTocPage.prototype.closeModal = function () {
        this.viewCtrl.dismiss();
    };
    AddonModImscpTocPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-addon-mod-imscp-toc',template:/*ion-inline-start:"/home/travis/build/moodlehq/moodlemobile2/src/addon/mod/imscp/pages/toc/toc.html"*/'<ion-header>\n    <ion-navbar core-back-button>\n        <ion-title>{{ \'addon.mod_imscp.toc\' | translate }}</ion-title>\n        <ion-buttons end>\n            <button ion-button icon-only (click)="closeModal()" [attr.aria-label]="\'core.close\' | translate">\n                <ion-icon name="close"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n<ion-content>\n    <nav>\n        <ion-list>\n            <a ion-item *ngFor="let item of items" (click)="loadItem(item.href)" [class.core-bold]="!item.href" [class.core-nav-item-selected]="selected == item.href">\n                <span padding-left *ngFor="let i of getNumberForPadding(item.level)"></span>{{item.title}}\n            </a>\n        </ion-list>\n    </nav>\n</ion-content>\n'/*ion-inline-end:"/home/travis/build/moodlehq/moodlemobile2/src/addon/mod/imscp/pages/toc/toc.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["G" /* ViewController */]])
    ], AddonModImscpTocPage);
    return AddonModImscpTocPage;
}());

//# sourceMappingURL=toc.js.map

/***/ })

});
//# sourceMappingURL=87.js.map