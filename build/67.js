webpackJsonp([67],{

/***/ 2056:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddonModWikiMapPageModule", function() { return AddonModWikiMapPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__directives_directives_module__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__map__ = __webpack_require__(2203);
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






var AddonModWikiMapPageModule = /** @class */ (function () {
    function AddonModWikiMapPageModule() {
    }
    AddonModWikiMapPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__map__["a" /* AddonModWikiMapPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* CoreComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_4__directives_directives_module__["a" /* CoreDirectivesModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_5__map__["a" /* AddonModWikiMapPage */]),
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */].forChild()
            ],
        })
    ], AddonModWikiMapPageModule);
    return AddonModWikiMapPageModule;
}());

//# sourceMappingURL=map.module.js.map

/***/ }),

/***/ 2203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddonModWikiMapPage; });
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
 * Modal to display the map of a Wiki.
 */
var AddonModWikiMapPage = /** @class */ (function () {
    function AddonModWikiMapPage(navParams, viewCtrl) {
        this.viewCtrl = viewCtrl;
        this.map = []; // Map of pages, categorized by letter.
        this.constructMap(navParams.get('pages') || []);
        this.selected = navParams.get('selected');
        this.homeView = navParams.get('homeView');
        this.moduleId = navParams.get('moduleId');
        this.courseId = navParams.get('courseId');
    }
    /**
     * Function called when a page is clicked.
     *
     * @param page Clicked page.
     */
    AddonModWikiMapPage.prototype.goToPage = function (page) {
        this.viewCtrl.dismiss({ type: 'page', goto: page });
    };
    /**
     * Go back to the initial page of the wiki.
     */
    AddonModWikiMapPage.prototype.goToWikiHome = function () {
        this.viewCtrl.dismiss({ type: 'home', goto: this.homeView });
    };
    /**
     * Construct the map of pages.
     *
     * @param pages List of pages.
     */
    AddonModWikiMapPage.prototype.constructMap = function (pages) {
        var _this = this;
        var letter, initialLetter;
        this.map = [];
        pages.sort(function (a, b) {
            var compareA = a.title.toLowerCase().trim(), compareB = b.title.toLowerCase().trim();
            return compareA.localeCompare(compareB);
        });
        pages.forEach(function (page) {
            var letterCandidate = page.title.charAt(0).toLocaleUpperCase();
            // Should we create a new grouping?
            if (letterCandidate !== initialLetter) {
                initialLetter = letterCandidate;
                letter = { label: letterCandidate, pages: [] };
                _this.map.push(letter);
            }
            // Add the subwiki to the currently active grouping.
            letter.pages.push(page);
        });
    };
    /**
     * Close modal.
     */
    AddonModWikiMapPage.prototype.closeModal = function () {
        this.viewCtrl.dismiss();
    };
    AddonModWikiMapPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-addon-mod-wiki-map',template:/*ion-inline-start:"/home/travis/build/moodlehq/moodlemobile2/src/addon/mod/wiki/pages/map/map.html"*/'<ion-header>\n    <ion-navbar core-back-button>\n        <ion-title>{{ \'addon.mod_wiki.map\' | translate }}</ion-title>\n        <ion-buttons end>\n            <button ion-button icon-only (click)="closeModal()" [attr.aria-label]="\'core.close\' | translate">\n                <ion-icon name="close"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n<ion-content>\n    <nav>\n        <ion-list>\n            <!-- Go to "home". -->\n            <a ion-item text-wrap *ngIf="homeView" (click)="goToWikiHome()">\n                <ion-icon name="home" item-start></ion-icon> {{ \'addon.mod_wiki.gowikihome\' | translate }}\n            </a>\n            <ng-container *ngFor="let letter of map">\n                <ion-item-divider *ngIf="letter.label">\n                    {{ letter.label }}\n                </ion-item-divider>\n                <a ion-item text-wrap *ngFor="let page of letter.pages" (click)="goToPage(page)" [class.core-nav-item-selected]="selected == page.id">\n                    <ion-icon name="home" item-start *ngIf="page.firstpage"></ion-icon> <core-format-text [text]="page.title" contextLevel="module" [contextInstanceId]="moduleId" [courseId]="courseId"></core-format-text>\n                    <ion-note *ngIf="!page.id" item-end>\n                        <ion-icon name="time"></ion-icon>\n                        <span text-wrap>{{ \'core.notsent\' | translate }}</span>\n                    </ion-note>\n                </a>\n            </ng-container>\n        </ion-list>\n    </nav>\n</ion-content>\n'/*ion-inline-end:"/home/travis/build/moodlehq/moodlemobile2/src/addon/mod/wiki/pages/map/map.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["G" /* ViewController */]])
    ], AddonModWikiMapPage);
    return AddonModWikiMapPage;
}());

//# sourceMappingURL=map.js.map

/***/ })

});
//# sourceMappingURL=67.js.map