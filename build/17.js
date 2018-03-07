webpackJsonp([17],{

/***/ 1180:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoreMainMenuPageModule", function() { return CoreMainMenuPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__menu__ = __webpack_require__(1235);
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




var CoreMainMenuPageModule = /** @class */ (function () {
    function CoreMainMenuPageModule() {
    }
    CoreMainMenuPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__menu__["a" /* CoreMainMenuPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__menu__["a" /* CoreMainMenuPage */]),
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */].forChild()
            ],
        })
    ], CoreMainMenuPageModule);
    return CoreMainMenuPageModule;
}());

//# sourceMappingURL=menu.module.js.map

/***/ }),

/***/ 1235:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoreMainMenuPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_events__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_sites__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_mainmenu__ = __webpack_require__(643);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_delegate__ = __webpack_require__(88);
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
 * Page that displays the main menu of the app.
 */
var CoreMainMenuPage = /** @class */ (function () {
    function CoreMainMenuPage(menuDelegate, sitesProvider, navParams, navCtrl, eventsProvider) {
        this.menuDelegate = menuDelegate;
        this.sitesProvider = sitesProvider;
        this.navCtrl = navCtrl;
        this.tabs = [];
        this.moreTabData = {
            page: 'CoreMainMenuMorePage',
            title: 'core.more',
            icon: 'more'
        };
        this.moreTabAdded = false;
        this.redirectPageLoaded = false;
        this.redirectPage = navParams.get('redirectPage');
        this.redirectParams = navParams.get('redirectParams');
    }
    Object.defineProperty(CoreMainMenuPage.prototype, "mainTabs", {
        // Use a setter to wait for ion-tabs to be loaded because it's inside a ngIf.
        set: function (ionTabs) {
            if (ionTabs && this.redirectPage && !this.redirectPageLoaded) {
                // Tabs ready and there is a redirect page set. Load it.
                this.redirectPageLoaded = true;
                // Check if the page is the root page of any of the tabs.
                var indexToSelect_1 = 0;
                for (var i = 0; i < this.tabs.length; i++) {
                    if (this.tabs[i].page == this.redirectPage) {
                        indexToSelect_1 = i + 1;
                        break;
                    }
                }
                // Use a setTimeout, otherwise loading the first tab opens a new state for some reason.
                setTimeout(function () {
                    ionTabs.select(indexToSelect_1);
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * View loaded.
     */
    CoreMainMenuPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        if (!this.sitesProvider.isLoggedIn()) {
            this.navCtrl.setRoot('CoreLoginSitesPage');
            return;
        }
        var site = this.sitesProvider.getCurrentSite(), displaySiteHome = site.getInfo() && site.getInfo().userhomepage === 0;
        this.subscription = this.menuDelegate.getHandlers().subscribe(function (handlers) {
            handlers = handlers.slice(0, __WEBPACK_IMPORTED_MODULE_4__providers_mainmenu__["a" /* CoreMainMenuProvider */].NUM_MAIN_HANDLERS); // Get main handlers.
            // Check if handlers are already in tabs. Add the ones that aren't.
            // @todo: https://github.com/ionic-team/ionic/issues/13633
            for (var i = 0; i < handlers.length; i++) {
                var handler = handlers[i], shouldSelect = (displaySiteHome && handler.name == 'CoreSiteHome') ||
                    (!displaySiteHome && handler.name == 'CoreCourses');
                var found = false;
                for (var j = 0; j < _this.tabs.length; j++) {
                    var tab = _this.tabs[j];
                    if (tab.title == handler.title && tab.icon == handler.icon) {
                        found = true;
                        if (shouldSelect) {
                            _this.initialTab = j;
                        }
                        break;
                    }
                }
                if (!found) {
                    _this.tabs.push(handler);
                    if (shouldSelect) {
                        _this.initialTab = _this.tabs.length;
                    }
                }
            }
            if (!_this.moreTabAdded) {
                _this.moreTabAdded = true;
                _this.tabs.push(_this.moreTabData); // Add "More" tab.
            }
            _this.loaded = _this.menuDelegate.areHandlersLoaded();
        });
    };
    /**
     * Page destroyed.
     */
    CoreMainMenuPage.prototype.ngOnDestroy = function () {
        this.subscription && this.subscription.unsubscribe();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])('mainTabs'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Tabs */]),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Tabs */]])
    ], CoreMainMenuPage.prototype, "mainTabs", null);
    CoreMainMenuPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-core-mainmenu',template:/*ion-inline-start:"/ionic-projects/moodlemobile2/src/core/mainmenu/pages/menu/menu.html"*/'<ion-tabs *ngIf="loaded" #mainTabs [selectedIndex]="initialTab">\n    <ion-tab [enabled]="false" [show]="false" [root]="redirectPage" [rootParams]="redirectParams"></ion-tab>\n    <ion-tab *ngFor="let tab of tabs" [root]="tab.page" [tabTitle]="tab.title | translate" [tabIcon]="tab.icon" class="{{tab.class}}"></ion-tab>\n</ion-tabs>'/*ion-inline-end:"/ionic-projects/moodlemobile2/src/core/mainmenu/pages/menu/menu.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__providers_delegate__["a" /* CoreMainMenuDelegate */], __WEBPACK_IMPORTED_MODULE_3__providers_sites__["a" /* CoreSitesProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_events__["a" /* CoreEventsProvider */]])
    ], CoreMainMenuPage);
    return CoreMainMenuPage;
}());

//# sourceMappingURL=menu.js.map

/***/ })

});
//# sourceMappingURL=17.js.map