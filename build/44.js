webpackJsonp([44],{

/***/ 1912:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoreCoursesDashboardPageModule", function() { return CoreCoursesDashboardPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dashboard__ = __webpack_require__(2044);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_components_module__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__directives_directives_module__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_components_module__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_sitehome_components_components_module__ = __webpack_require__(942);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__core_block_components_components_module__ = __webpack_require__(409);
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









var CoreCoursesDashboardPageModule = /** @class */ (function () {
    function CoreCoursesDashboardPageModule() {
    }
    CoreCoursesDashboardPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__dashboard__["a" /* CoreCoursesDashboardPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_4__components_components_module__["a" /* CoreComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_5__directives_directives_module__["a" /* CoreDirectivesModule */],
                __WEBPACK_IMPORTED_MODULE_6__components_components_module__["a" /* CoreCoursesComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_7__core_sitehome_components_components_module__["a" /* CoreSiteHomeComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_8__core_block_components_components_module__["a" /* CoreBlockComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__dashboard__["a" /* CoreCoursesDashboardPage */]),
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */].forChild()
            ],
        })
    ], CoreCoursesDashboardPageModule);
    return CoreCoursesDashboardPageModule;
}());

//# sourceMappingURL=dashboard.module.js.map

/***/ }),

/***/ 2044:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoreCoursesDashboardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_events__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_sites__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_utils_dom__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_tabs_tabs__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_block_providers_delegate__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_block_components_block_block__ = __webpack_require__(410);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__core_sitehome_providers_sitehome__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__core_sitehome_components_index_index__ = __webpack_require__(943);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_courses__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_dashboard__ = __webpack_require__(406);
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
 * Page that displays the dashboard.
 */
var CoreCoursesDashboardPage = /** @class */ (function () {
    function CoreCoursesDashboardPage(navCtrl, coursesProvider, sitesProvider, siteHomeProvider, eventsProvider, dashboardProvider, domUtils, blockDelegate) {
        this.navCtrl = navCtrl;
        this.coursesProvider = coursesProvider;
        this.sitesProvider = sitesProvider;
        this.siteHomeProvider = siteHomeProvider;
        this.eventsProvider = eventsProvider;
        this.dashboardProvider = dashboardProvider;
        this.domUtils = domUtils;
        this.blockDelegate = blockDelegate;
        this.siteHomeEnabled = false;
        this.tabsReady = false;
        this.tabs = [];
        this.dashboardEnabled = false;
        this.dashboardLoaded = false;
        this.downloadEnabledIcon = 'square-outline'; // Disabled by default.
        this.loadSiteName();
    }
    /**
     * View loaded.
     */
    CoreCoursesDashboardPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.searchEnabled = !this.coursesProvider.isSearchCoursesDisabledInSite();
        this.downloadCourseEnabled = !this.coursesProvider.isDownloadCourseDisabledInSite();
        this.downloadCoursesEnabled = !this.coursesProvider.isDownloadCoursesDisabledInSite();
        // Refresh the enabled flags if site is updated.
        this.updateSiteObserver = this.eventsProvider.on(__WEBPACK_IMPORTED_MODULE_2__providers_events__["a" /* CoreEventsProvider */].SITE_UPDATED, function () {
            _this.searchEnabled = !_this.coursesProvider.isSearchCoursesDisabledInSite();
            _this.downloadCourseEnabled = !_this.coursesProvider.isDownloadCourseDisabledInSite();
            _this.downloadCoursesEnabled = !_this.coursesProvider.isDownloadCoursesDisabledInSite();
            _this.switchDownload(_this.downloadEnabled);
            _this.loadSiteName();
        }, this.sitesProvider.getCurrentSiteId());
        var promises = [];
        promises.push(this.siteHomeProvider.isAvailable().then(function (enabled) {
            _this.siteHomeEnabled = enabled;
        }));
        promises.push(this.loadDashboardContent());
        // Decide which tab to load first.
        Promise.all(promises).finally(function () {
            if (_this.siteHomeEnabled && _this.dashboardEnabled) {
                var site = _this.sitesProvider.getCurrentSite(), displaySiteHome = site.getInfo() && site.getInfo().userhomepage === 0;
                _this.firstSelectedTab = displaySiteHome ? 0 : 1;
            }
            else {
                _this.firstSelectedTab = 0;
            }
            _this.tabsReady = true;
        });
    };
    /**
     * User entered the page.
     */
    CoreCoursesDashboardPage.prototype.ionViewDidEnter = function () {
        this.tabsComponent && this.tabsComponent.ionViewDidEnter();
    };
    /**
     * User left the page.
     */
    CoreCoursesDashboardPage.prototype.ionViewDidLeave = function () {
        this.tabsComponent && this.tabsComponent.ionViewDidLeave();
    };
    /**
     * Go to search courses.
     */
    CoreCoursesDashboardPage.prototype.openSearch = function () {
        this.navCtrl.push('CoreCoursesSearchPage');
    };
    /**
     * Load the site name.
     */
    CoreCoursesDashboardPage.prototype.loadSiteName = function () {
        this.siteName = this.sitesProvider.getCurrentSite().getInfo().sitename;
    };
    /**
     * Convenience function to fetch the dashboard data.
     *
     * @return {Promise<any>} Promise resolved when done.
     */
    CoreCoursesDashboardPage.prototype.loadDashboardContent = function () {
        var _this = this;
        return this.dashboardProvider.isAvailable().then(function (enabled) {
            if (enabled) {
                _this.userId = _this.sitesProvider.getCurrentSiteUserId();
                return _this.dashboardProvider.getDashboardBlocks().then(function (blocks) {
                    _this.blocks = blocks;
                }).catch(function (error) {
                    _this.domUtils.showErrorModal(error);
                    // Cannot get the blocks, just show dashboard if needed.
                    _this.loadFallbackBlocks();
                });
            }
            // Not enabled, check separated tabs.
            _this.loadFallbackBlocks();
        }).finally(function () {
            _this.dashboardEnabled = _this.blockDelegate.hasSupportedBlock(_this.blocks);
            _this.dashboardLoaded = true;
        });
    };
    /**
     * Refresh the dashboard data.
     *
     * @param {any} refresher Refresher.
     */
    CoreCoursesDashboardPage.prototype.refreshDashboard = function (refresher) {
        var _this = this;
        var promises = [];
        promises.push(this.dashboardProvider.invalidateDashboardBlocks());
        // Invalidate the blocks.
        this.blocksComponents.forEach(function (blockComponent) {
            promises.push(blockComponent.invalidate().catch(function () {
                // Ignore errors.
            }));
        });
        Promise.all(promises).finally(function () {
            _this.loadDashboardContent().finally(function () {
                refresher.complete();
            });
        });
    };
    /**
     * Toggle download enabled.
     */
    CoreCoursesDashboardPage.prototype.toggleDownload = function () {
        this.switchDownload(!this.downloadEnabled);
    };
    /**
     * Convenience function to switch download enabled.
     *
     * @param {boolean} enable If enable or disable.
     */
    CoreCoursesDashboardPage.prototype.switchDownload = function (enable) {
        this.downloadEnabled = (this.downloadCourseEnabled || this.downloadCoursesEnabled) && enable;
        this.downloadEnabledIcon = this.downloadEnabled ? 'checkbox-outline' : 'square-outline';
        this.eventsProvider.trigger(__WEBPACK_IMPORTED_MODULE_10__providers_courses__["a" /* CoreCoursesProvider */].EVENT_DASHBOARD_DOWNLOAD_ENABLED_CHANGED, { enabled: this.downloadEnabled });
    };
    /**
     * Load fallback blocks to shown before 3.6 when dashboard blocks are not supported.
     */
    CoreCoursesDashboardPage.prototype.loadFallbackBlocks = function () {
        this.blocks = [
            {
                name: 'myoverview'
            },
            {
                name: 'timeline'
            }
        ];
    };
    /**
     * Component being destroyed.
     */
    CoreCoursesDashboardPage.prototype.ngOnDestroy = function () {
        this.isDestroyed = true;
        this.updateSiteObserver && this.updateSiteObserver.off();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_5__components_tabs_tabs__["a" /* CoreTabsComponent */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_5__components_tabs_tabs__["a" /* CoreTabsComponent */])
    ], CoreCoursesDashboardPage.prototype, "tabsComponent", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_9__core_sitehome_components_index_index__["a" /* CoreSiteHomeIndexComponent */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_9__core_sitehome_components_index_index__["a" /* CoreSiteHomeIndexComponent */])
    ], CoreCoursesDashboardPage.prototype, "siteHomeComponent", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewChildren */])(__WEBPACK_IMPORTED_MODULE_7__core_block_components_block_block__["a" /* CoreBlockComponent */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["T" /* QueryList */])
    ], CoreCoursesDashboardPage.prototype, "blocksComponents", void 0);
    CoreCoursesDashboardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-core-courses-dashboard',template:/*ion-inline-start:"/home/travis/build/moodlehq/moodlemobile2/src/core/courses/pages/dashboard/dashboard.html"*/'    <ion-header>\n    <ion-navbar core-back-button>\n        <ion-title><core-format-text [text]="siteName"></core-format-text></ion-title>\n\n        <ion-buttons end>\n            <button *ngIf="searchEnabled" ion-button icon-only (click)="openSearch()" [attr.aria-label]="\'core.courses.searchcourses\' | translate">\n                <ion-icon name="search"></ion-icon>\n            </button>\n            <core-context-menu>\n                <core-context-menu-item *ngIf="downloadCourseEnabled || downloadCoursesEnabled" [priority]="1000" [content]="\'core.settings.showdownloadoptions\' | translate" (action)="toggleDownload()" [iconAction]="downloadEnabledIcon"></core-context-menu-item>\n            </core-context-menu>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n<ion-content>\n    <core-tabs [selectedIndex]="firstSelectedTab" [hideUntil]="tabsReady">\n        <!-- Site home tab. -->\n        <core-tab [show]="siteHomeEnabled" [title]="\'core.sitehome.sitehome\' | translate">\n            <ng-template>\n                <ion-content>\n                    <ion-refresher [enabled]="!!siteHomeComponent && siteHomeComponent.dataLoaded" (ionRefresh)="siteHomeComponent.doRefresh($event)">\n                        <ion-refresher-content pullingText="{{ \'core.pulltorefresh\' | translate }}"></ion-refresher-content>\n                    </ion-refresher>\n                    <core-sitehome-index></core-sitehome-index>\n                </ion-content>\n            </ng-template>\n        </core-tab>\n\n        <!-- Dashboard tab. -->\n        <core-tab [show]="dashboardEnabled" [title]="\'core.courses.mymoodle\' | translate">\n            <ng-template>\n                <ion-content>\n                    <ion-refresher [enabled]="dashboardLoaded" (ionRefresh)="refreshDashboard($event)">\n                        <ion-refresher-content pullingText="{{ \'core.pulltorefresh\' | translate }}"></ion-refresher-content>\n                    </ion-refresher>\n                    <core-loading [hideUntil]="dashboardLoaded" class="core-loading-center">\n                        <ion-list>\n                            <!-- Dashboard blocks. -->\n                            <ng-container *ngFor="let block of blocks">\n                                <core-block [block]="block" contextLevel="user" [instanceId]="userId" [extraData]="{\'downloadEnabled\': downloadEnabled}"></core-block>\n                            </ng-container>\n                        </ion-list>\n\n                        <core-empty-box *ngIf="blocks.length == 0" icon="qr-scanner" [message]="\'core.course.nocontentavailable\' | translate"></core-empty-box>\n                    </core-loading>\n                </ion-content>\n            </ng-template>\n        </core-tab>\n    </core-tabs>\n</ion-content>'/*ion-inline-end:"/home/travis/build/moodlehq/moodlemobile2/src/core/courses/pages/dashboard/dashboard.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavController */], __WEBPACK_IMPORTED_MODULE_10__providers_courses__["a" /* CoreCoursesProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_sites__["a" /* CoreSitesProvider */], __WEBPACK_IMPORTED_MODULE_8__core_sitehome_providers_sitehome__["a" /* CoreSiteHomeProvider */],
            __WEBPACK_IMPORTED_MODULE_2__providers_events__["a" /* CoreEventsProvider */], __WEBPACK_IMPORTED_MODULE_11__providers_dashboard__["a" /* CoreCoursesDashboardProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_utils_dom__["a" /* CoreDomUtilsProvider */], __WEBPACK_IMPORTED_MODULE_6__core_block_providers_delegate__["a" /* CoreBlockDelegate */]])
    ], CoreCoursesDashboardPage);
    return CoreCoursesDashboardPage;
}());

//# sourceMappingURL=dashboard.js.map

/***/ })

});
//# sourceMappingURL=44.js.map