webpackJsonp([27],{

/***/ 2086:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoreRatingRatingsPageModule", function() { return CoreRatingRatingsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ratings__ = __webpack_require__(2233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_components_module__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__directives_directives_module__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pipes_pipes_module__ = __webpack_require__(66);
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







var CoreRatingRatingsPageModule = /** @class */ (function () {
    function CoreRatingRatingsPageModule() {
    }
    CoreRatingRatingsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__ratings__["a" /* CoreRatingRatingsPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_4__components_components_module__["a" /* CoreComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_5__directives_directives_module__["a" /* CoreDirectivesModule */],
                __WEBPACK_IMPORTED_MODULE_6__pipes_pipes_module__["a" /* CorePipesModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__ratings__["a" /* CoreRatingRatingsPage */]),
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */].forChild()
            ],
        })
    ], CoreRatingRatingsPageModule);
    return CoreRatingRatingsPageModule;
}());

//# sourceMappingURL=ratings.module.js.map

/***/ }),

/***/ 2233:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoreRatingRatingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_utils_dom__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_rating_providers_rating__ = __webpack_require__(163);
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
 * Page that displays individual ratings
 */
var CoreRatingRatingsPage = /** @class */ (function () {
    function CoreRatingRatingsPage(navParams, viewCtrl, domUtils, ratingProvider) {
        this.viewCtrl = viewCtrl;
        this.domUtils = domUtils;
        this.ratingProvider = ratingProvider;
        this.loaded = false;
        this.ratings = [];
        this.contextLevel = navParams.get('contextLevel');
        this.instanceId = navParams.get('instanceId');
        this.component = navParams.get('ratingComponent');
        this.ratingArea = navParams.get('ratingArea');
        this.aggregateMethod = navParams.get('aggregateMethod');
        this.itemId = navParams.get('itemId');
        this.scaleId = navParams.get('scaleId');
        this.courseId = navParams.get('courseId');
    }
    /**
     * View loaded.
     */
    CoreRatingRatingsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.fetchData().finally(function () {
            _this.loaded = true;
        });
    };
    /**
     * Fetch all the data required for the view.
     *
     * @return Resolved when done.
     */
    CoreRatingRatingsPage.prototype.fetchData = function () {
        var _this = this;
        return this.ratingProvider.getItemRatings(this.contextLevel, this.instanceId, this.component, this.ratingArea, this.itemId, this.scaleId, undefined, this.courseId).then(function (ratings) {
            _this.ratings = ratings;
        }).catch(function (error) {
            _this.domUtils.showErrorModal(error);
        });
    };
    /**
     * Refresh data.
     *
     * @param refresher Refresher.
     */
    CoreRatingRatingsPage.prototype.refreshRatings = function (refresher) {
        var _this = this;
        this.ratingProvider.invalidateRatingItems(this.contextLevel, this.instanceId, this.component, this.ratingArea, this.itemId, this.scaleId).finally(function () {
            return _this.fetchData().finally(function () {
                refresher.complete();
            });
        });
    };
    /**
     * Close modal.
     */
    CoreRatingRatingsPage.prototype.closeModal = function () {
        this.viewCtrl.dismiss();
    };
    CoreRatingRatingsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-core-rating-ratings',template:/*ion-inline-start:"/home/travis/build/moodlehq/moodlemobile2/src/core/rating/pages/ratings/ratings.html"*/'<ion-header>\n    <ion-navbar core-back-button>\n        <ion-title>{{ \'core.rating.ratings\' | translate }}</ion-title>\n        <ion-buttons end>\n            <button ion-button icon-only (click)="closeModal()" [attr.aria-label]="\'core.close\' | translate">\n                <ion-icon name="close"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n<ion-content>\n    <ion-refresher [enabled]="loaded" (ionRefresh)="refreshRatings($event)">\n        <ion-refresher-content pullingText="{{ \'core.pulltorefresh\' | translate }}"></ion-refresher-content>\n    </ion-refresher>\n    <core-loading [hideUntil]="loaded">\n        <ion-list *ngIf="ratings.length > 0">\n            <ion-item text-wrap *ngFor="let rating of ratings">\n                <ion-avatar core-user-avatar [user]="rating" [courseId]="courseId" item-start></ion-avatar>\n                <ion-note item-end padding-left *ngIf="rating.timemodified">\n                    {{ rating.timemodified | coreDateDayOrTime }}\n                </ion-note>\n                <h2>{{ rating.userfullname }}</h2>\n                <p>{{ rating.rating }}</p>\n            </ion-item>\n        </ion-list>\n        <core-empty-box *ngIf="ratings.length == 0" icon="stats" [message]="\'core.rating.noratings\' | translate"></core-empty-box>\n    </core-loading>\n</ion-content>\n'/*ion-inline-end:"/home/travis/build/moodlehq/moodlemobile2/src/core/rating/pages/ratings/ratings.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["G" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__providers_utils_dom__["a" /* CoreDomUtilsProvider */],
            __WEBPACK_IMPORTED_MODULE_3__core_rating_providers_rating__["a" /* CoreRatingProvider */]])
    ], CoreRatingRatingsPage);
    return CoreRatingRatingsPage;
}());

//# sourceMappingURL=ratings.js.map

/***/ })

});
//# sourceMappingURL=27.js.map