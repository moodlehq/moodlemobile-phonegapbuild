webpackJsonp([92],{

/***/ 2036:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddonModForumSortOrderSelectorPagePageModule", function() { return AddonModForumSortOrderSelectorPagePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__directives_directives_module__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sort_order_selector__ = __webpack_require__(2183);
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






var AddonModForumSortOrderSelectorPagePageModule = /** @class */ (function () {
    function AddonModForumSortOrderSelectorPagePageModule() {
    }
    AddonModForumSortOrderSelectorPagePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__sort_order_selector__["a" /* AddonModForumSortOrderSelectorPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* CoreComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_4__directives_directives_module__["a" /* CoreDirectivesModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_5__sort_order_selector__["a" /* AddonModForumSortOrderSelectorPage */]),
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */].forChild()
            ],
        })
    ], AddonModForumSortOrderSelectorPagePageModule);
    return AddonModForumSortOrderSelectorPagePageModule;
}());

//# sourceMappingURL=sort-order-selector.module.js.map

/***/ }),

/***/ 2183:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddonModForumSortOrderSelectorPage; });
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
 * Page that displays the sort selector.
 */
var AddonModForumSortOrderSelectorPage = /** @class */ (function () {
    function AddonModForumSortOrderSelectorPage(navParams, viewCtrl) {
        this.viewCtrl = viewCtrl;
        this.sortOrders = [];
        this.sortOrders = navParams.get('sortOrders');
        this.selected = navParams.get('selected');
    }
    /**
     * Close the modal.
     */
    AddonModForumSortOrderSelectorPage.prototype.closeModal = function () {
        this.viewCtrl.dismiss();
    };
    /**
     * Select a sort order.
     *
     * @param sortOrder Selected sort order.
     */
    AddonModForumSortOrderSelectorPage.prototype.selectSortOrder = function (sortOrder) {
        this.viewCtrl.dismiss(sortOrder);
    };
    AddonModForumSortOrderSelectorPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-addon-mod-forum-sort-order-selector',template:/*ion-inline-start:"/home/travis/build/moodlehq/moodlemobile2/src/addon/mod/forum/pages/sort-order-selector/sort-order-selector.html"*/'<ion-header>\n    <ion-navbar core-back-button>\n        <ion-title>{{ \'core.sort\' | translate }}</ion-title>\n        <ion-buttons end>\n            <button ion-button icon-only (click)="closeModal()" [attr.aria-label]="\'core.close\' | translate">\n                <ion-icon name="close"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n<ion-content>\n    <ion-list id="addon-mod-forum-sort-selector" role="menu" aria-labelledby="addon-mod-forum-sort-order-button">\n        <ng-container *ngFor="let sortOrder of sortOrders">\n            <a ion-item text-wrap (click)="selectSortOrder(sortOrder)" [class.core-primary-selected-item]="selected == sortOrder.value" detail-none role="menuitem" [attr.aria-label]="sortOrder.label | translate">\n                <h2>{{ sortOrder.label | translate }}</h2>\n            </a>\n        </ng-container>\n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/travis/build/moodlehq/moodlemobile2/src/addon/mod/forum/pages/sort-order-selector/sort-order-selector.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["G" /* ViewController */]])
    ], AddonModForumSortOrderSelectorPage);
    return AddonModForumSortOrderSelectorPage;
}());

//# sourceMappingURL=sort-order-selector.js.map

/***/ })

});
//# sourceMappingURL=92.js.map