webpackJsonp([16],{

/***/ 2097:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoreTagIndexAreaPageModule", function() { return CoreTagIndexAreaPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__index_area__ = __webpack_require__(2244);
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






var CoreTagIndexAreaPageModule = /** @class */ (function () {
    function CoreTagIndexAreaPageModule() {
    }
    CoreTagIndexAreaPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__index_area__["a" /* CoreTagIndexAreaPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_4__components_components_module__["a" /* CoreComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_5__directives_directives_module__["a" /* CoreDirectivesModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__index_area__["a" /* CoreTagIndexAreaPage */]),
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */].forChild()
            ],
        })
    ], CoreTagIndexAreaPageModule);
    return CoreTagIndexAreaPageModule;
}());

//# sourceMappingURL=index-area.module.js.map

/***/ }),

/***/ 2244:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoreTagIndexAreaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_utils_dom__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_tag_providers_tag__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_tag_providers_area_delegate__ = __webpack_require__(133);
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
 * Page that displays the tag index area.
 */
var CoreTagIndexAreaPage = /** @class */ (function () {
    function CoreTagIndexAreaPage(navParams, injector, translate, tagProvider, domUtils, tagAreaDelegate) {
        this.injector = injector;
        this.translate = translate;
        this.tagProvider = tagProvider;
        this.domUtils = domUtils;
        this.tagAreaDelegate = tagAreaDelegate;
        this.loaded = false;
        this.items = [];
        this.nextPage = 0;
        this.canLoadMore = false;
        this.loadMoreError = false;
        this.tagId = navParams.get('tagId');
        this.tagName = navParams.get('tagName');
        this.collectionId = navParams.get('collectionId');
        this.areaId = navParams.get('areaId');
        this.fromContextId = navParams.get('fromContextId');
        this.contextId = navParams.get('contextId');
        this.recursive = navParams.get('recursive');
        this.areaNameKey = navParams.get('areaNameKey');
        // Pass the the following parameters to avoid fetching the first page.
        this.componentName = navParams.get('componentName');
        this.itemType = navParams.get('itemType');
        this.items = navParams.get('items') || [];
        this.nextPage = navParams.get('nextPage') || 0;
        this.canLoadMore = !!navParams.get('canLoadMore');
    }
    /**
     * View loaded.
     */
    CoreTagIndexAreaPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var promise;
        if (!this.componentName || !this.itemType || !this.items.length || this.nextPage == 0) {
            promise = this.fetchData(true);
        }
        else {
            promise = Promise.resolve();
        }
        promise.then(function () {
            return _this.tagAreaDelegate.getComponent(_this.componentName, _this.itemType, _this.injector).then(function (component) {
                _this.areaComponent = component;
            });
        }).finally(function () {
            _this.loaded = true;
        });
    };
    /**
     * Fetch next page of the tag index area.
     *
     * @param refresh Whether to refresh the data or fetch a new page.
     * @return Resolved when done.
     */
    CoreTagIndexAreaPage.prototype.fetchData = function (refresh) {
        var _this = this;
        if (refresh === void 0) { refresh = false; }
        this.loadMoreError = false;
        var page = refresh ? 0 : this.nextPage;
        return this.tagProvider.getTagIndexPerArea(this.tagId, this.tagName, this.collectionId, this.areaId, this.fromContextId, this.contextId, this.recursive, page).then(function (areas) {
            var area = areas[0];
            return _this.tagAreaDelegate.parseContent(area.component, area.itemtype, area.content).then(function (items) {
                if (!items || !items.length) {
                    // Tag area not supported.
                    return Promise.reject(_this.translate.instant('core.tag.errorareanotsupported'));
                }
                if (page == 0) {
                    _this.items = items;
                }
                else {
                    (_a = _this.items).push.apply(_a, items);
                }
                _this.componentName = area.component;
                _this.itemType = area.itemtype;
                _this.areaNameKey = _this.tagAreaDelegate.getDisplayNameKey(area.component, area.itemtype);
                _this.canLoadMore = !!area.nextpageurl;
                _this.nextPage = page + 1;
                var _a;
            });
        }).catch(function (error) {
            _this.loadMoreError = true; // Set to prevent infinite calls with infinite-loading.
            _this.domUtils.showErrorModalDefault(error, 'Error loading tag index');
        });
    };
    /**
     * Load more items.
     *
     * @param infiniteComplete Infinite scroll complete function.
     * @return Resolved when done.
     */
    CoreTagIndexAreaPage.prototype.loadMore = function (infiniteComplete) {
        return this.fetchData().finally(function () {
            infiniteComplete();
        });
    };
    /**
     * Refresh data.
     *
     * @param refresher Refresher.
     */
    CoreTagIndexAreaPage.prototype.refreshData = function (refresher) {
        var _this = this;
        this.tagProvider.invalidateTagIndexPerArea(this.tagId, this.tagName, this.collectionId, this.areaId, this.fromContextId, this.contextId, this.recursive).finally(function () {
            _this.fetchData(true).finally(function () {
                refresher.complete();
            });
        });
    };
    CoreTagIndexAreaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-core-tag-index-area',template:/*ion-inline-start:"/home/travis/build/moodlehq/moodlemobile2/src/core/tag/pages/index-area/index-area.html"*/'<ion-header>\n    <ion-navbar core-back-button>\n        <ion-title>{{ \'core.tag.itemstaggedwith\' | translate: { $a: {tagarea: areaNameKey | translate, tag: tagName} } }}</ion-title>\n    </ion-navbar>\n</ion-header>\n<ion-content>\n    <ion-refresher [enabled]="loaded" (ionRefresh)="refreshData($event)">\n        <ion-refresher-content pullingText="{{ \'core.pulltorefresh\' | translate }}"></ion-refresher-content>\n    </ion-refresher>\n    <core-loading [hideUntil]="loaded">\n        <ng-container *ngIf="loaded">\n            <core-dynamic-component [component]="areaComponent" [data]="{items: items}"></core-dynamic-component>\n        </ng-container>\n        <core-infinite-loading [enabled]="canLoadMore" (action)="loadMore($event)" [error]="loadMoreError"></core-infinite-loading>\n    </core-loading>\n</ion-content>\n'/*ion-inline-end:"/home/travis/build/moodlehq/moodlemobile2/src/core/tag/pages/index-area/index-area.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["t" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injector */], __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_4__core_tag_providers_tag__["a" /* CoreTagProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_utils_dom__["a" /* CoreDomUtilsProvider */],
            __WEBPACK_IMPORTED_MODULE_5__core_tag_providers_area_delegate__["a" /* CoreTagAreaDelegate */]])
    ], CoreTagIndexAreaPage);
    return CoreTagIndexAreaPage;
}());

//# sourceMappingURL=index-area.js.map

/***/ })

});
//# sourceMappingURL=16.js.map