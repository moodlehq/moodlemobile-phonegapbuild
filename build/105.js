webpackJsonp([105],{

/***/ 2112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddonModDataEntryPageModule", function() { return AddonModDataEntryPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__directives_directives_module__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_components_module__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_comments_components_components_module__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_compile_components_compile_html_compile_html_module__ = __webpack_require__(424);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_rating_components_components_module__ = __webpack_require__(1003);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_components_module__ = __webpack_require__(422);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__entry__ = __webpack_require__(2259);
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










var AddonModDataEntryPageModule = /** @class */ (function () {
    function AddonModDataEntryPageModule() {
    }
    AddonModDataEntryPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_9__entry__["a" /* AddonModDataEntryPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__directives_directives_module__["a" /* CoreDirectivesModule */],
                __WEBPACK_IMPORTED_MODULE_4__components_components_module__["a" /* CoreComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_8__components_components_module__["a" /* AddonModDataComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_6__core_compile_components_compile_html_compile_html_module__["a" /* CoreCompileHtmlComponentModule */],
                __WEBPACK_IMPORTED_MODULE_5__core_comments_components_components_module__["a" /* CoreCommentsComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_9__entry__["a" /* AddonModDataEntryPage */]),
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */].forChild(),
                __WEBPACK_IMPORTED_MODULE_7__core_rating_components_components_module__["a" /* CoreRatingComponentsModule */]
            ],
        })
    ], AddonModDataEntryPageModule);
    return AddonModDataEntryPageModule;
}());

//# sourceMappingURL=entry.module.js.map

/***/ }),

/***/ 2259:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddonModDataEntryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_utils_utils__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_utils_dom__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_sites__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_groups__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_events__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_course_providers_course__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_data__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_helper__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_sync__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_fields_delegate__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_components_module__ = __webpack_require__(422);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__core_comments_providers_comments__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__core_comments_components_comments_comments__ = __webpack_require__(431);
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
 * Page that displays the view entry page.
 */
var AddonModDataEntryPage = /** @class */ (function () {
    function AddonModDataEntryPage(params, utils, groupsProvider, domUtils, fieldsDelegate, courseProvider, dataProvider, dataHelper, sitesProvider, navCtrl, eventsProvider, cdr, commentsProvider) {
        this.utils = utils;
        this.groupsProvider = groupsProvider;
        this.domUtils = domUtils;
        this.fieldsDelegate = fieldsDelegate;
        this.courseProvider = courseProvider;
        this.dataProvider = dataProvider;
        this.dataHelper = dataHelper;
        this.navCtrl = navCtrl;
        this.eventsProvider = eventsProvider;
        this.cdr = cdr;
        this.commentsProvider = commentsProvider;
        this.fields = {};
        this.fieldsArray = [];
        this.title = '';
        this.moduleName = 'data';
        this.component = __WEBPACK_IMPORTED_MODULE_8__providers_data__["a" /* AddonModDataProvider */].COMPONENT;
        this.entryLoaded = false;
        this.renderingEntry = false;
        this.loadingComments = false;
        this.loadingRating = false;
        this.selectedGroup = 0;
        this.entryHtml = '';
        this.extraImports = [__WEBPACK_IMPORTED_MODULE_12__components_components_module__["a" /* AddonModDataComponentsModule */]];
        this.isPullingToRefresh = false; // Whether the last fetching of data was started by a pull-to-refresh action
        this.module = params.get('module') || {};
        this.entryId = params.get('entryId') || null;
        this.courseId = params.get('courseId');
        this.selectedGroup = params.get('group') || 0;
        this.offset = params.get('offset');
        this.siteId = sitesProvider.getCurrentSiteId();
        this.title = this.module.name;
        this.moduleName = this.courseProvider.translateModuleName('data');
    }
    /**
     * View loaded.
     */
    AddonModDataEntryPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.commentsEnabled = !this.commentsProvider.areCommentsDisabledInSite();
        this.fetchEntryData().then(function () {
            _this.logView();
        });
        // Refresh data if this discussion is synchronized automatically.
        this.syncObserver = this.eventsProvider.on(__WEBPACK_IMPORTED_MODULE_10__providers_sync__["a" /* AddonModDataSyncProvider */].AUTO_SYNCED, function (data) {
            if ((data.entryId == _this.entryId || data.offlineEntryId == _this.entryId) && _this.data.id == data.dataId) {
                if (data.deleted) {
                    // If deleted, go back.
                    _this.navCtrl.pop();
                }
                else {
                    _this.entryId = data.entryid;
                    _this.entryLoaded = false;
                    _this.fetchEntryData(true);
                }
            }
        }, this.siteId);
        // Refresh entry on change.
        this.entryChangedObserver = this.eventsProvider.on(__WEBPACK_IMPORTED_MODULE_8__providers_data__["a" /* AddonModDataProvider */].ENTRY_CHANGED, function (data) {
            if (data.entryId == _this.entryId && _this.data.id == data.dataId) {
                if (data.deleted) {
                    // If deleted, go back.
                    _this.navCtrl.pop();
                }
                else {
                    _this.entryLoaded = false;
                    _this.fetchEntryData(true);
                }
            }
        }, this.siteId);
    };
    /**
     * Fetch the entry data.
     *
     * @param refresh Whether to refresh the current data or not.
     * @param isPtr Whether is a pull to refresh action.
     * @return Resolved when done.
     */
    AddonModDataEntryPage.prototype.fetchEntryData = function (refresh, isPtr) {
        var _this = this;
        this.isPullingToRefresh = isPtr;
        return this.dataProvider.getDatabase(this.courseId, this.module.id).then(function (data) {
            _this.title = data.name || _this.title;
            _this.data = data;
            return _this.dataProvider.getFields(_this.data.id).then(function (fieldsData) {
                _this.fields = _this.utils.arrayToObject(fieldsData, 'id');
                _this.fieldsArray = fieldsData;
            });
        }).then(function () {
            return _this.setEntryFromOffset().then(function () {
                return _this.dataProvider.getDatabaseAccessInformation(_this.data.id);
            });
        }).then(function (accessData) {
            _this.access = accessData;
            return _this.groupsProvider.getActivityGroupInfo(_this.data.coursemodule).then(function (groupInfo) {
                _this.groupInfo = groupInfo;
                _this.selectedGroup = _this.groupsProvider.validateGroupId(_this.selectedGroup, groupInfo);
            });
        }).then(function () {
            var actions = _this.dataHelper.getActions(_this.data, _this.access, _this.entry);
            var template = _this.dataHelper.getTemplate(_this.data, 'singletemplate', _this.fieldsArray);
            _this.entryHtml = _this.dataHelper.displayShowFields(template, _this.fieldsArray, _this.entry, _this.offset, 'show', actions);
            _this.showComments = actions.comments;
            var entries = {};
            entries[_this.entryId] = _this.entry;
            // Pass the input data to the component.
            _this.jsData = {
                fields: _this.fields,
                entries: entries,
                data: _this.data,
                module: _this.module,
                group: _this.selectedGroup
            };
        }).catch(function (message) {
            if (!refresh) {
                // Some call failed, retry without using cache since it might be a new activity.
                return _this.refreshAllData(isPtr);
            }
            _this.domUtils.showErrorModalDefault(message, 'core.course.errorgetmodule', true);
        }).finally(function () {
            _this.domUtils.scrollToTop(_this.content);
            _this.entryLoaded = true;
        });
    };
    /**
     * Go to selected entry without changing state.
     *
     * @param offset Entry offset.
     * @return Resolved when done.
     */
    AddonModDataEntryPage.prototype.gotoEntry = function (offset) {
        var _this = this;
        this.offset = offset;
        this.entryId = null;
        this.entry = null;
        this.entryLoaded = false;
        return this.fetchEntryData().then(function () {
            _this.logView();
        });
    };
    /**
     * Refresh all the data.
     *
     * @param isPtr Whether is a pull to refresh action.
     * @return Promise resolved when done.
     */
    AddonModDataEntryPage.prototype.refreshAllData = function (isPtr) {
        var _this = this;
        var promises = [];
        promises.push(this.dataProvider.invalidateDatabaseData(this.courseId));
        if (this.data) {
            promises.push(this.dataProvider.invalidateEntryData(this.data.id, this.entryId));
            promises.push(this.groupsProvider.invalidateActivityGroupInfo(this.data.coursemodule));
            promises.push(this.dataProvider.invalidateEntriesData(this.data.id));
            promises.push(this.dataProvider.invalidateFieldsData(this.data.id));
            if (this.data.comments && this.entry && this.entry.id > 0 && this.commentsEnabled && this.comments) {
                // Refresh comments. Don't add it to promises because we don't want the comments fetch to block the entry fetch.
                this.comments.doRefresh().catch(function () {
                    // Ignore errors.
                });
            }
        }
        return Promise.all(promises).finally(function () {
            return _this.fetchEntryData(true, isPtr);
        });
    };
    /**
     * Refresh the data.
     *
     * @param refresher Refresher.
     * @return Promise resolved when done.
     */
    AddonModDataEntryPage.prototype.refreshDatabase = function (refresher) {
        if (this.entryLoaded) {
            return this.refreshAllData(true).finally(function () {
                refresher && refresher.complete();
            });
        }
    };
    /**
     * Set group to see the database.
     *
     * @param groupId Group identifier to set.
     * @return Resolved when done.
     */
    AddonModDataEntryPage.prototype.setGroup = function (groupId) {
        var _this = this;
        this.selectedGroup = groupId;
        this.offset = null;
        this.entry = null;
        this.entryId = null;
        this.entryLoaded = false;
        return this.fetchEntryData().then(function () {
            _this.logView();
        });
    };
    /**
     * Convenience function to fetch the entry and set next/previous entries.
     *
     * @return Resolved when done.
     */
    AddonModDataEntryPage.prototype.setEntryFromOffset = function () {
        var _this = this;
        var emptyOffset = typeof this.offset != 'number';
        if (emptyOffset && typeof this.entryId == 'number') {
            // Entry id passed as navigation parameter instead of the offset.
            // We don't display next/previous buttons in this case.
            this.nextOffset = null;
            this.previousOffset = null;
            return this.dataHelper.fetchEntry(this.data, this.fieldsArray, this.entryId).then(function (entry) {
                _this.entry = entry.entry;
                _this.ratingInfo = entry.ratinginfo;
            });
        }
        var perPage = __WEBPACK_IMPORTED_MODULE_8__providers_data__["a" /* AddonModDataProvider */].PER_PAGE;
        var page = !emptyOffset && this.offset >= 0 ? Math.floor(this.offset / perPage) : 0;
        return this.dataHelper.fetchEntries(this.data, this.fieldsArray, this.selectedGroup, undefined, undefined, '0', 'DESC', page, perPage).then(function (entries) {
            var pageEntries = entries.offlineEntries.concat(entries.entries);
            var pageIndex; // Index of the entry when concatenating offline and online page entries.
            if (emptyOffset) {
                // No offset passed, display the first entry.
                pageIndex = 0;
            }
            else if (_this.offset > 0) {
                // Online entry.
                pageIndex = _this.offset % perPage + entries.offlineEntries.length;
            }
            else {
                // Offline entry.
                pageIndex = _this.offset + entries.offlineEntries.length;
            }
            _this.entry = pageEntries[pageIndex];
            _this.entryId = _this.entry.id;
            _this.previousOffset = page > 0 || pageIndex > 0 ? _this.offset - 1 : null;
            var promise;
            if (pageIndex + 1 < pageEntries.length) {
                // Not the last entry on the page;
                _this.nextOffset = _this.offset + 1;
            }
            else if (pageEntries.length < perPage) {
                // Last entry of the last page.
                _this.nextOffset = null;
            }
            else {
                // Last entry of the page, check if there are more pages.
                promise = _this.dataProvider.getEntries(_this.data.id, _this.selectedGroup, '0', 'DESC', page + 1, perPage)
                    .then(function (entries) {
                    _this.nextOffset = entries && entries.entries && entries.entries.length > 0 ? _this.offset + 1 : null;
                });
            }
            return Promise.resolve(promise).then(function () {
                if (_this.entryId > 0) {
                    // Online entry, we need to fetch the the rating info.
                    return _this.dataProvider.getEntry(_this.data.id, _this.entryId).then(function (entry) {
                        _this.ratingInfo = entry.ratinginfo;
                    });
                }
            });
        });
    };
    /**
     * Function called when entry is being rendered.
     */
    AddonModDataEntryPage.prototype.setRenderingEntry = function (rendering) {
        this.renderingEntry = rendering;
        this.cdr.detectChanges();
    };
    /**
     * Function called when comments component is loading data.
     */
    AddonModDataEntryPage.prototype.setLoadingComments = function (loading) {
        this.loadingComments = loading;
        this.cdr.detectChanges();
    };
    /**
     * Function called when rate component is loading data.
     */
    AddonModDataEntryPage.prototype.setLoadingRating = function (loading) {
        this.loadingRating = loading;
        this.cdr.detectChanges();
    };
    /**
     * Function called when rating is updated online.
     */
    AddonModDataEntryPage.prototype.ratingUpdated = function () {
        this.dataProvider.invalidateEntryData(this.data.id, this.entryId);
    };
    /**
     * Log viewing the activity.
     *
     * @return Promise resolved when done.
     */
    AddonModDataEntryPage.prototype.logView = function () {
        if (!this.data || !this.data.id) {
            return Promise.resolve();
        }
        return this.dataProvider.logView(this.data.id, this.data.name).catch(function () {
            // Ignore errors, the user could be offline.
        });
    };
    /**
     * Component being destroyed.
     */
    AddonModDataEntryPage.prototype.ngOnDestroy = function () {
        this.syncObserver && this.syncObserver.off();
        this.entryChangedObserver && this.entryChangedObserver.off();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Content */])
    ], AddonModDataEntryPage.prototype, "content", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_14__core_comments_components_comments_comments__["a" /* CoreCommentsCommentsComponent */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_14__core_comments_components_comments_comments__["a" /* CoreCommentsCommentsComponent */])
    ], AddonModDataEntryPage.prototype, "comments", void 0);
    AddonModDataEntryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-addon-mod-data-entry',template:/*ion-inline-start:"/home/travis/build/moodlehq/moodlemobile2/src/addon/mod/data/pages/entry/entry.html"*/'<ion-header>\n    <ion-navbar core-back-button>\n        <ion-title><core-format-text [text]="title" contextLevel="module" [contextInstanceId]="module.id" [courseId]="courseId"></core-format-text></ion-title>\n    </ion-navbar>\n</ion-header>\n<ion-content>\n    <ion-refresher [enabled]="entryLoaded && (isPullingToRefresh || !renderingEntry && !loadingRating && !loadingComments)" (ionRefresh)="refreshDatabase($event)">\n        <ion-refresher-content pullingText="{{ \'core.pulltorefresh\' | translate }}"></ion-refresher-content>\n    </ion-refresher>\n    <core-loading [hideUntil]="entryLoaded && (isPullingToRefresh || !renderingEntry && !loadingRating && !loadingComments)">\n        <!-- Database entries found to be synchronized -->\n        <div class="core-warning-card" icon-start *ngIf="entry && entry.hasOffline">\n            <ion-icon name="warning"></ion-icon>\n            {{ \'core.hasdatatosync\' | translate: {$a: moduleName} }}\n        </div>\n\n        <ion-item text-wrap *ngIf="groupInfo && (groupInfo.separateGroups || groupInfo.visibleGroups)">\n            <ion-label id="addon-data-groupslabel" *ngIf="groupInfo.separateGroups">{{ \'core.groupsseparate\' | translate }}</ion-label>\n            <ion-label id="addon-data-groupslabel" *ngIf="groupInfo.visibleGroups">{{ \'core.groupsvisible\' | translate }}</ion-label>\n            <ion-select [(ngModel)]="selectedGroup" (ionChange)="setGroup(selectedGroup)" aria-labelledby="addon-data-groupslabel" interface="action-sheet">\n                <ion-option *ngFor="let groupOpt of groupInfo.groups" [value]="groupOpt.id">{{groupOpt.name}}</ion-option>\n            </ion-select>\n        </ion-item>\n\n        <div class="addon-data-contents addon-data-entries-{{data.id}}" *ngIf="entry">\n            <core-style [css]="data.csstemplate" prefix=".addon-data-entries-{{data.id}}"></core-style>\n\n            <core-compile-html [text]="entryHtml" [jsData]="jsData" [extraImports]="extraImports" (compiling)="setRenderingEntry($event)"></core-compile-html>\n        </div>\n\n        <core-rating-rate *ngIf="data && entry && ratingInfo && (!data.approval || entry.approved)" [ratingInfo]="ratingInfo" contextLevel="module" [instanceId]="data.coursemodule" [itemId]="entry.id" [itemSetId]="0" [courseId]="courseId" [aggregateMethod]="data.assessed" [scaleId]="data.scale" [userId]="entry.userid" (onLoading)="setLoadingRating($event)" (onUpdate)="ratingUpdated()"></core-rating-rate>\n        <core-rating-aggregate *ngIf="data && entry && ratingInfo" [ratingInfo]="ratingInfo" contextLevel="module" [instanceId]="data.coursemodule" [itemId]="entry.id" [courseId]="courseId" [aggregateMethod]="data.assessed" [scaleId]="data.scale"></core-rating-aggregate>\n\n        <ion-item *ngIf="data && data.comments && entry && entry.id > 0 && commentsEnabled">\n            <core-comments contextLevel="module" [instanceId]="data.coursemodule" component="mod_data" [itemId]="entry.id" area="database_entry" [displaySpinner]="false" [courseId]="courseId" (onLoading)="setLoadingComments($event)"></core-comments>\n        </ion-item>\n\n        <ion-grid *ngIf="previousOffset != null || nextOffset != null">\n            <ion-row align-items-center>\n                <ion-col *ngIf="previousOffset != null">\n                    <button ion-button block outline icon-start (click)="gotoEntry(previousOffset)">\n                        <ion-icon name="arrow-back" md="ios-arrow-back"></ion-icon>\n                        {{ \'core.previous\' | translate }}\n                    </button>\n                </ion-col>\n                <ion-col *ngIf="nextOffset != null">\n                    <button ion-button block icon-end (click)="gotoEntry(nextOffset)">\n                        {{ \'core.next\' | translate }}\n                        <ion-icon name="arrow-forward" md="ios-arrow-forward"></ion-icon>\n                    </button>\n                </ion-col>\n            </ion-row>\n        </ion-grid>\n    </core-loading>\n</ion-content>\n'/*ion-inline-end:"/home/travis/build/moodlehq/moodlemobile2/src/addon/mod/data/pages/entry/entry.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_utils_utils__["a" /* CoreUtilsProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_groups__["a" /* CoreGroupsProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_utils_dom__["a" /* CoreDomUtilsProvider */], __WEBPACK_IMPORTED_MODULE_11__providers_fields_delegate__["a" /* AddonModDataFieldsDelegate */],
            __WEBPACK_IMPORTED_MODULE_7__core_course_providers_course__["a" /* CoreCourseProvider */], __WEBPACK_IMPORTED_MODULE_8__providers_data__["a" /* AddonModDataProvider */],
            __WEBPACK_IMPORTED_MODULE_9__providers_helper__["a" /* AddonModDataHelperProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_sites__["a" /* CoreSitesProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavController */], __WEBPACK_IMPORTED_MODULE_6__providers_events__["a" /* CoreEventsProvider */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */], __WEBPACK_IMPORTED_MODULE_13__core_comments_providers_comments__["a" /* CoreCommentsProvider */]])
    ], AddonModDataEntryPage);
    return AddonModDataEntryPage;
}());

//# sourceMappingURL=entry.js.map

/***/ })

});
//# sourceMappingURL=105.js.map