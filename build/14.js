webpackJsonp([14],{

/***/ 2069:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/@angular/core/esm5/core.js
var core = __webpack_require__(0);

// EXTERNAL MODULE: ./node_modules/ionic-angular/index.js + 3 modules
var ionic_angular = __webpack_require__(6);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/index.js + 1 modules
var _ngx_translate_core = __webpack_require__(3);

// EXTERNAL MODULE: ./src/directives/directives.module.ts + 2 modules
var directives_module = __webpack_require__(31);

// EXTERNAL MODULE: ./src/components/components.module.ts
var components_module = __webpack_require__(29);

// EXTERNAL MODULE: ./src/core/comments/components/components.module.ts
var components_components_module = __webpack_require__(368);

// EXTERNAL MODULE: ./src/core/compile/components/compile-html/compile-html.module.ts
var compile_html_module = __webpack_require__(472);

// EXTERNAL MODULE: ./src/core/rating/components/components.module.ts
var rating_components_components_module = __webpack_require__(720);

// EXTERNAL MODULE: ./src/addon/mod/data/components/components.module.ts + 2 modules
var data_components_components_module = __webpack_require__(471);

// EXTERNAL MODULE: ./src/providers/utils/utils.ts
var utils_utils = __webpack_require__(2);

// EXTERNAL MODULE: ./src/providers/utils/dom.ts
var dom = __webpack_require__(4);

// EXTERNAL MODULE: ./src/providers/sites.ts
var sites = __webpack_require__(1);

// EXTERNAL MODULE: ./src/providers/groups.ts
var groups = __webpack_require__(67);

// EXTERNAL MODULE: ./src/providers/events.ts
var events = __webpack_require__(11);

// EXTERNAL MODULE: ./src/core/course/providers/course.ts
var course = __webpack_require__(13);

// EXTERNAL MODULE: ./src/addon/mod/data/providers/data.ts
var data = __webpack_require__(97);

// EXTERNAL MODULE: ./src/addon/mod/data/providers/helper.ts
var helper = __webpack_require__(212);

// EXTERNAL MODULE: ./src/addon/mod/data/providers/sync.ts
var sync = __webpack_require__(320);

// EXTERNAL MODULE: ./src/addon/mod/data/providers/fields-delegate.ts
var fields_delegate = __webpack_require__(122);

// EXTERNAL MODULE: ./src/core/comments/providers/comments.ts
var comments = __webpack_require__(143);

// CONCATENATED MODULE: ./src/addon/mod/data/pages/entry/entry.ts
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
 * Page that displays the view entry page.
 */
var entry_AddonModDataEntryPage = /** @class */ (function () {
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
        this.component = data["a" /* AddonModDataProvider */].COMPONENT;
        this.entryLoaded = false;
        this.renderingEntry = false;
        this.loadingComments = false;
        this.loadingRating = false;
        this.selectedGroup = 0;
        this.entryHtml = '';
        this.extraImports = [data_components_components_module["a" /* AddonModDataComponentsModule */]];
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
        this.fetchEntryData();
        // Refresh data if this discussion is synchronized automatically.
        this.syncObserver = this.eventsProvider.on(sync["a" /* AddonModDataSyncProvider */].AUTO_SYNCED, function (data) {
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
        this.entryChangedObserver = this.eventsProvider.on(data["a" /* AddonModDataProvider */].ENTRY_CHANGED, function (data) {
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
     * @param  {boolean} [refresh] Whether to refresh the current data or not.
     * @param  {boolean} [isPtr] Whether is a pull to refresh action.
     * @return {Promise<any>} Resolved when done.
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
     * @param  {number} offset Entry offset.
     * @return {Promise<any>} Resolved when done.
     */
    AddonModDataEntryPage.prototype.gotoEntry = function (offset) {
        this.offset = offset;
        this.entryId = null;
        this.entry = null;
        this.entryLoaded = false;
        return this.fetchEntryData();
    };
    /**
     * Refresh all the data.
     *
     * @param  {boolean} [isPtr] Whether is a pull to refresh action.
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonModDataEntryPage.prototype.refreshAllData = function (isPtr) {
        var _this = this;
        var promises = [];
        promises.push(this.dataProvider.invalidateDatabaseData(this.courseId));
        if (this.data) {
            if (this.data.comments && this.entry && this.entry.id > 0 && this.commentsEnabled) {
                promises.push(this.commentsProvider.invalidateCommentsData('module', this.data.coursemodule, 'mod_data', this.entry.id, 'database_entry'));
            }
            promises.push(this.dataProvider.invalidateEntryData(this.data.id, this.entryId));
            promises.push(this.groupsProvider.invalidateActivityGroupInfo(this.data.coursemodule));
            promises.push(this.dataProvider.invalidateEntriesData(this.data.id));
        }
        return Promise.all(promises).finally(function () {
            return _this.fetchEntryData(true, isPtr);
        });
    };
    /**
     * Refresh the data.
     *
     * @param {any} [refresher] Refresher.
     * @return {Promise<any>} Promise resolved when done.
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
     * @param  {number}       groupId Group identifier to set.
     * @return {Promise<any>}         Resolved when done.
     */
    AddonModDataEntryPage.prototype.setGroup = function (groupId) {
        this.selectedGroup = groupId;
        this.offset = null;
        this.entry = null;
        this.entryId = null;
        this.entryLoaded = false;
        return this.fetchEntryData();
    };
    /**
     * Convenience function to fetch the entry and set next/previous entries.
     *
     * @return {Promise<any>} Resolved when done.
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
        var perPage = data["a" /* AddonModDataProvider */].PER_PAGE;
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
     * Component being destroyed.
     */
    AddonModDataEntryPage.prototype.ngOnDestroy = function () {
        this.syncObserver && this.syncObserver.off();
        this.entryChangedObserver && this.entryChangedObserver.off();
    };
    __decorate([
        Object(core["_9" /* ViewChild */])(ionic_angular["f" /* Content */]),
        __metadata("design:type", ionic_angular["f" /* Content */])
    ], AddonModDataEntryPage.prototype, "content", void 0);
    AddonModDataEntryPage = __decorate([
        Object(core["m" /* Component */])({
            selector: 'page-addon-mod-data-entry',
            templateUrl: 'entry.html',
        }),
        __metadata("design:paramtypes", [ionic_angular["t" /* NavParams */], utils_utils["a" /* CoreUtilsProvider */], groups["a" /* CoreGroupsProvider */],
            dom["a" /* CoreDomUtilsProvider */], fields_delegate["a" /* AddonModDataFieldsDelegate */],
            course["a" /* CoreCourseProvider */], data["a" /* AddonModDataProvider */],
            helper["a" /* AddonModDataHelperProvider */],
            sites["a" /* CoreSitesProvider */], ionic_angular["s" /* NavController */], events["a" /* CoreEventsProvider */],
            core["j" /* ChangeDetectorRef */], comments["a" /* CoreCommentsProvider */]])
    ], AddonModDataEntryPage);
    return AddonModDataEntryPage;
}());

//# sourceMappingURL=entry.js.map
// CONCATENATED MODULE: ./src/addon/mod/data/pages/entry/entry.module.ts
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
var entry_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var entry_module_AddonModDataEntryPageModule = /** @class */ (function () {
    function AddonModDataEntryPageModule() {
    }
    AddonModDataEntryPageModule = entry_module___decorate([
        Object(core["I" /* NgModule */])({
            declarations: [
                entry_AddonModDataEntryPage,
            ],
            imports: [
                directives_module["a" /* CoreDirectivesModule */],
                components_module["a" /* CoreComponentsModule */],
                data_components_components_module["a" /* AddonModDataComponentsModule */],
                compile_html_module["a" /* CoreCompileHtmlComponentModule */],
                components_components_module["a" /* CoreCommentsComponentsModule */],
                ionic_angular["l" /* IonicPageModule */].forChild(entry_AddonModDataEntryPage),
                _ngx_translate_core["b" /* TranslateModule */].forChild(),
                rating_components_components_module["a" /* CoreRatingComponentsModule */]
            ],
        })
    ], AddonModDataEntryPageModule);
    return AddonModDataEntryPageModule;
}());

//# sourceMappingURL=entry.module.js.map
// EXTERNAL MODULE: ./node_modules/ionic-angular/components/action-sheet/action-sheet-component.ngfactory.js
var action_sheet_component_ngfactory = __webpack_require__(1468);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/alert/alert-component.ngfactory.js
var alert_component_ngfactory = __webpack_require__(1469);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/app/app-root.ngfactory.js
var app_root_ngfactory = __webpack_require__(1470);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/loading/loading-component.ngfactory.js
var loading_component_ngfactory = __webpack_require__(1471);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/modal/modal-component.ngfactory.js
var modal_component_ngfactory = __webpack_require__(1472);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/picker/picker-component.ngfactory.js + 1 modules
var picker_component_ngfactory = __webpack_require__(1473);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/popover/popover-component.ngfactory.js
var popover_component_ngfactory = __webpack_require__(1474);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/select/select-popover-component.ngfactory.js
var select_popover_component_ngfactory = __webpack_require__(1475);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toast/toast-component.ngfactory.js
var toast_component_ngfactory = __webpack_require__(1476);

// EXTERNAL MODULE: ./src/components/context-menu/context-menu-popover.ngfactory.js
var context_menu_popover_ngfactory = __webpack_require__(1479);

// EXTERNAL MODULE: ./src/components/course-picker-menu/course-picker-menu-popover.ngfactory.js
var course_picker_menu_popover_ngfactory = __webpack_require__(1480);

// EXTERNAL MODULE: ./src/components/recaptcha/recaptchamodal.ngfactory.js
var recaptchamodal_ngfactory = __webpack_require__(1481);

// EXTERNAL MODULE: ./src/components/bs-tooltip/bs-tooltip.ngfactory.js
var bs_tooltip_ngfactory = __webpack_require__(1482);

// EXTERNAL MODULE: ./src/core/block/components/only-title-block/only-title-block.ngfactory.js
var only_title_block_ngfactory = __webpack_require__(1485);

// EXTERNAL MODULE: ./src/core/block/components/pre-rendered-block/pre-rendered-block.ngfactory.js
var pre_rendered_block_ngfactory = __webpack_require__(1486);

// EXTERNAL MODULE: ./src/core/block/components/course-blocks/course-blocks.ngfactory.js
var course_blocks_ngfactory = __webpack_require__(1483);

// EXTERNAL MODULE: ./src/core/course/components/unsupported-module/unsupported-module.ngfactory.js
var unsupported_module_ngfactory = __webpack_require__(1484);

// EXTERNAL MODULE: ./src/core/course/components/tag-area/tag-area.ngfactory.js
var tag_area_ngfactory = __webpack_require__(1487);

// EXTERNAL MODULE: ./src/core/comments/components/comments/comments.ngfactory.js
var comments_ngfactory = __webpack_require__(477);

// EXTERNAL MODULE: ./src/core/tag/components/feed/feed.ngfactory.js
var feed_ngfactory = __webpack_require__(1489);

// EXTERNAL MODULE: ./src/addon/mod/data/components/index/index.ngfactory.js
var index_ngfactory = __webpack_require__(1502);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/icon/icon.js
var icon = __webpack_require__(46);

// EXTERNAL MODULE: ./node_modules/ionic-angular/config/config.js
var config = __webpack_require__(7);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.pipe.js
var translate_pipe = __webpack_require__(28);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.service.js
var translate_service = __webpack_require__(18);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/label/label.js
var label = __webpack_require__(63);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/option/option.js
var option_option = __webpack_require__(102);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item.ngfactory.js + 1 modules
var item_ngfactory = __webpack_require__(30);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item.js
var item = __webpack_require__(21);

// EXTERNAL MODULE: ./node_modules/ionic-angular/util/form.js
var util_form = __webpack_require__(20);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-reorder.js + 1 modules
var item_reorder = __webpack_require__(27);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-content.js
var item_content = __webpack_require__(32);

// EXTERNAL MODULE: ./node_modules/@angular/common/esm5/common.js
var common = __webpack_require__(8);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/select/select.ngfactory.js
var select_ngfactory = __webpack_require__(120);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/select/select.js
var select_select = __webpack_require__(103);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/app/app.js + 3 modules
var app = __webpack_require__(34);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/deep-linker.js
var deep_linker = __webpack_require__(55);

// EXTERNAL MODULE: ./node_modules/@angular/forms/esm5/forms.js
var esm5_forms = __webpack_require__(22);

// EXTERNAL MODULE: ./src/components/style/style.ngfactory.js
var style_ngfactory = __webpack_require__(1537);

// EXTERNAL MODULE: ./src/components/style/style.ts
var style = __webpack_require__(487);

// EXTERNAL MODULE: ./src/core/compile/components/compile-html/compile-html.ngfactory.js
var compile_html_ngfactory = __webpack_require__(214);

// EXTERNAL MODULE: ./src/core/compile/components/compile-html/compile-html.ts
var compile_html = __webpack_require__(188);

// EXTERNAL MODULE: ./src/core/compile/providers/compile.ts
var compile = __webpack_require__(146);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-controller.js
var nav_controller = __webpack_require__(19);

// EXTERNAL MODULE: ./src/core/rating/components/rate/rate.ngfactory.js
var rate_ngfactory = __webpack_require__(2110);

// EXTERNAL MODULE: ./src/core/rating/components/rate/rate.ts
var rate = __webpack_require__(1496);

// EXTERNAL MODULE: ./src/core/rating/providers/rating.ts
var rating = __webpack_require__(224);

// EXTERNAL MODULE: ./src/core/rating/providers/offline.ts
var offline = __webpack_require__(196);

// EXTERNAL MODULE: ./src/core/rating/components/aggregate/aggregate.ngfactory.js
var aggregate_ngfactory = __webpack_require__(2111);

// EXTERNAL MODULE: ./src/core/rating/components/aggregate/aggregate.ts
var aggregate = __webpack_require__(1495);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/modal/modal-controller.js
var modal_controller = __webpack_require__(178);

// EXTERNAL MODULE: ./src/core/comments/components/comments/comments.ts
var comments_comments = __webpack_require__(319);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/grid/col.js
var col = __webpack_require__(118);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.ngfactory.js
var button_ngfactory = __webpack_require__(45);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.js
var button_button = __webpack_require__(42);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/grid/grid.js
var grid = __webpack_require__(156);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/grid/row.js
var row = __webpack_require__(117);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-header.js
var toolbar_header = __webpack_require__(468);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/view-controller.js
var view_controller = __webpack_require__(38);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/navbar.ngfactory.js
var navbar_ngfactory = __webpack_require__(1477);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/navbar.js
var navbar = __webpack_require__(221);

// EXTERNAL MODULE: ./src/directives/back-button.ts
var back_button = __webpack_require__(711);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/platform.js + 1 modules
var platform = __webpack_require__(16);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.ngfactory.js
var toolbar_title_ngfactory = __webpack_require__(1478);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.js
var toolbar_title = __webpack_require__(364);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar.js
var toolbar = __webpack_require__(267);

// EXTERNAL MODULE: ./src/directives/format-text.ts
var format_text = __webpack_require__(41);

// EXTERNAL MODULE: ./src/providers/utils/text.ts
var utils_text = __webpack_require__(10);

// EXTERNAL MODULE: ./src/providers/utils/url.ts
var url = __webpack_require__(23);

// EXTERNAL MODULE: ./src/providers/logger.ts
var logger = __webpack_require__(5);

// EXTERNAL MODULE: ./src/providers/filepool.ts
var filepool = __webpack_require__(17);

// EXTERNAL MODULE: ./src/providers/app.ts
var providers_app = __webpack_require__(9);

// EXTERNAL MODULE: ./src/core/contentlinks/providers/helper.ts
var providers_helper = __webpack_require__(14);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.js
var content = __webpack_require__(25);

// EXTERNAL MODULE: ./src/components/split-view/split-view.ts
var split_view = __webpack_require__(26);

// EXTERNAL MODULE: ./src/providers/utils/iframe.ts
var iframe = __webpack_require__(37);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.ngfactory.js
var content_ngfactory = __webpack_require__(176);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/dom-controller.js
var dom_controller = __webpack_require__(33);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/keyboard.js
var keyboard = __webpack_require__(101);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/refresher/refresher.js
var refresher = __webpack_require__(151);

// EXTERNAL MODULE: ./node_modules/ionic-angular/gestures/gesture-controller.js
var gesture_controller = __webpack_require__(40);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/refresher/refresher-content.ngfactory.js
var refresher_content_ngfactory = __webpack_require__(207);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/refresher/refresher-content.js
var refresher_content = __webpack_require__(166);

// EXTERNAL MODULE: ./src/components/loading/loading.ngfactory.js
var loading_ngfactory = __webpack_require__(50);

// EXTERNAL MODULE: ./src/components/loading/loading.ts
var loading = __webpack_require__(47);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-params.js
var nav_params = __webpack_require__(70);

// CONCATENATED MODULE: ./src/addon/mod/data/pages/entry/entry.ngfactory.js
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 














































































var styles_AddonModDataEntryPage = [];
var RenderType_AddonModDataEntryPage = core["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_AddonModDataEntryPage, data: {} });

function View_AddonModDataEntryPage_1(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 6, "div", [["class", "core-warning-card"], ["icon-start", ""]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](2, 0, null, null, 1, "ion-icon", [["name", "warning"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](3, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ɵted */](4, null, ["\n            ", "\n        "])), core["_48" /* ɵpod */](5, { $a: 0 }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], function (_ck, _v) { var currVal_1 = "warning"; _ck(_v, 3, 0, currVal_1); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = core["_44" /* ɵnov */](_v, 3)._hidden; _ck(_v, 2, 0, currVal_0); var currVal_2 = core["_56" /* ɵunv */](_v, 4, 0, core["_44" /* ɵnov */](_v, 6).transform("core.hasdatatosync", _ck(_v, 5, 0, _co.moduleName))); _ck(_v, 4, 0, currVal_2); }); }
function View_AddonModDataEntryPage_3(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 3, "ion-label", [["id", "addon-data-groupslabel"]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, [[2, 4]], 0, label["a" /* Label */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, null], [8, null], [8, null]], { id: [0, "id"] }, null), (_l()(), core["_55" /* ɵted */](2, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], function (_ck, _v) { var currVal_0 = "addon-data-groupslabel"; _ck(_v, 1, 0, currVal_0); }, function (_ck, _v) { var currVal_1 = core["_56" /* ɵunv */](_v, 2, 0, core["_44" /* ɵnov */](_v, 3).transform("core.groupsseparate")); _ck(_v, 2, 0, currVal_1); }); }
function View_AddonModDataEntryPage_4(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 3, "ion-label", [["id", "addon-data-groupslabel"]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, [[2, 4]], 0, label["a" /* Label */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, null], [8, null], [8, null]], { id: [0, "id"] }, null), (_l()(), core["_55" /* ɵted */](2, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], function (_ck, _v) { var currVal_0 = "addon-data-groupslabel"; _ck(_v, 1, 0, currVal_0); }, function (_ck, _v) { var currVal_1 = core["_56" /* ɵunv */](_v, 2, 0, core["_44" /* ɵnov */](_v, 3).transform("core.groupsvisible")); _ck(_v, 2, 0, currVal_1); }); }
function View_AddonModDataEntryPage_5(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "ion-option", [], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, [[5, 4]], 0, option_option["a" /* Option */], [core["t" /* ElementRef */]], { value: [0, "value"] }, null), (_l()(), core["_55" /* ɵted */](2, null, ["", ""]))], function (_ck, _v) { var currVal_0 = _v.context.$implicit.id; _ck(_v, 1, 0, currVal_0); }, function (_ck, _v) { var currVal_1 = _v.context.$implicit.name; _ck(_v, 2, 0, currVal_1); }); }
function View_AddonModDataEntryPage_2(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 24, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](603979776, 2, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 3, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 4, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, 1, 1, null, View_AddonModDataEntryPage_3)), core["_30" /* ɵdid */](8, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, 1, 1, null, View_AddonModDataEntryPage_4)), core["_30" /* ɵdid */](11, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "])), (_l()(), core["_31" /* ɵeld */](13, 0, null, 3, 10, "ion-select", [["aria-labelledby", "addon-data-groupslabel"], ["interface", "action-sheet"]], [[2, "select-disabled", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "ionChange"], [null, "click"], [null, "keyup.space"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (core["_44" /* ɵnov */](_v, 14)._click($event) !== false);
        ad = (pd_0 && ad);
    } if (("keyup.space" === en)) {
        var pd_1 = (core["_44" /* ɵnov */](_v, 14)._keyup() !== false);
        ad = (pd_1 && ad);
    } if (("ngModelChange" === en)) {
        var pd_2 = ((_co.selectedGroup = $event) !== false);
        ad = (pd_2 && ad);
    } if (("ionChange" === en)) {
        var pd_3 = (_co.setGroup(_co.selectedGroup) !== false);
        ad = (pd_3 && ad);
    } return ad; }, select_ngfactory["b" /* View_Select_0 */], select_ngfactory["a" /* RenderType_Select */])), core["_30" /* ɵdid */](14, 1228800, null, 1, select_select["a" /* Select */], [app["a" /* App */], util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item["a" /* Item */]], deep_linker["a" /* DeepLinker */]], { interface: [0, "interface"] }, { ionChange: "ionChange" }), core["_52" /* ɵqud */](603979776, 5, { options: 1 }), core["_50" /* ɵprd */](1024, null, esm5_forms["l" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [select_select["a" /* Select */]]), core["_30" /* ɵdid */](17, 671744, null, 0, esm5_forms["q" /* NgModel */], [[8, null], [8, null], [8, null], [2, esm5_forms["l" /* NG_VALUE_ACCESSOR */]]], { model: [0, "model"] }, { update: "ngModelChange" }), core["_50" /* ɵprd */](2048, null, esm5_forms["m" /* NgControl */], null, [esm5_forms["q" /* NgModel */]]), core["_30" /* ɵdid */](19, 16384, null, 0, esm5_forms["n" /* NgControlStatus */], [esm5_forms["m" /* NgControl */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModDataEntryPage_5)), core["_30" /* ɵdid */](22, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n        "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.groupInfo.separateGroups; _ck(_v, 8, 0, currVal_0); var currVal_1 = _co.groupInfo.visibleGroups; _ck(_v, 11, 0, currVal_1); var currVal_10 = "action-sheet"; _ck(_v, 14, 0, currVal_10); var currVal_11 = _co.selectedGroup; _ck(_v, 17, 0, currVal_11); var currVal_12 = _co.groupInfo.groups; _ck(_v, 22, 0, currVal_12); }, function (_ck, _v) { var currVal_2 = core["_44" /* ɵnov */](_v, 14)._disabled; var currVal_3 = core["_44" /* ɵnov */](_v, 19).ngClassUntouched; var currVal_4 = core["_44" /* ɵnov */](_v, 19).ngClassTouched; var currVal_5 = core["_44" /* ɵnov */](_v, 19).ngClassPristine; var currVal_6 = core["_44" /* ɵnov */](_v, 19).ngClassDirty; var currVal_7 = core["_44" /* ɵnov */](_v, 19).ngClassValid; var currVal_8 = core["_44" /* ɵnov */](_v, 19).ngClassInvalid; var currVal_9 = core["_44" /* ɵnov */](_v, 19).ngClassPending; _ck(_v, 13, 0, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8, currVal_9); }); }
function View_AddonModDataEntryPage_6(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 7, "div", [], [[8, "className", 0]], null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](2, 0, null, null, 1, "core-style", [], null, null, null, style_ngfactory["b" /* View_CoreStyleComponent_0 */], style_ngfactory["a" /* RenderType_CoreStyleComponent */])), core["_30" /* ɵdid */](3, 573440, null, 0, style["a" /* CoreStyleComponent */], [core["t" /* ElementRef */]], { css: [0, "css"], prefix: [1, "prefix"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n            "])), (_l()(), core["_31" /* ɵeld */](5, 0, null, null, 1, "core-compile-html", [], null, [[null, "compiling"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("compiling" === en)) {
        var pd_0 = (_co.setRenderingEntry($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, compile_html_ngfactory["b" /* View_CoreCompileHtmlComponent_0 */], compile_html_ngfactory["a" /* RenderType_CoreCompileHtmlComponent */])), core["_30" /* ɵdid */](6, 966656, null, 0, compile_html["a" /* CoreCompileHtmlComponent */], [compile["a" /* CoreCompileProvider */], core["j" /* ChangeDetectorRef */], core["t" /* ElementRef */], [2, nav_controller["a" /* NavController */]], core["F" /* KeyValueDiffers */], dom["a" /* CoreDomUtilsProvider */], utils_utils["a" /* CoreUtilsProvider */]], { text: [0, "text"], jsData: [1, "jsData"], extraImports: [2, "extraImports"] }, { compiling: "compiling" }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "]))], function (_ck, _v) { var _co = _v.component; var currVal_1 = _co.data.csstemplate; var currVal_2 = core["_34" /* ɵinlineInterpolate */](1, ".addon-data-entries-", _co.data.id, ""); _ck(_v, 3, 0, currVal_1, currVal_2); var currVal_3 = _co.entryHtml; var currVal_4 = _co.jsData; var currVal_5 = _co.extraImports; _ck(_v, 6, 0, currVal_3, currVal_4, currVal_5); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = core["_34" /* ɵinlineInterpolate */](1, "addon-data-contents addon-data-entries-", _co.data.id, ""); _ck(_v, 0, 0, currVal_0); }); }
function View_AddonModDataEntryPage_7(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "core-rating-rate", [["contextLevel", "module"]], null, [[null, "onLoading"], [null, "onUpdate"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("onLoading" === en)) {
        var pd_0 = (_co.setLoadingRating($event) !== false);
        ad = (pd_0 && ad);
    } if (("onUpdate" === en)) {
        var pd_1 = (_co.ratingUpdated() !== false);
        ad = (pd_1 && ad);
    } return ad; }, rate_ngfactory["b" /* View_CoreRatingRateComponent_0 */], rate_ngfactory["a" /* RenderType_CoreRatingRateComponent */])), core["_30" /* ɵdid */](1, 704512, null, 0, rate["a" /* CoreRatingRateComponent */], [dom["a" /* CoreDomUtilsProvider */], translate_service["a" /* TranslateService */], events["a" /* CoreEventsProvider */], rating["a" /* CoreRatingProvider */], offline["a" /* CoreRatingOfflineProvider */], sites["a" /* CoreSitesProvider */]], { ratingInfo: [0, "ratingInfo"], contextLevel: [1, "contextLevel"], instanceId: [2, "instanceId"], itemId: [3, "itemId"], itemSetId: [4, "itemSetId"], courseId: [5, "courseId"], aggregateMethod: [6, "aggregateMethod"], scaleId: [7, "scaleId"], userId: [8, "userId"] }, { onLoading: "onLoading", onUpdate: "onUpdate" })], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.ratingInfo; var currVal_1 = "module"; var currVal_2 = _co.data.coursemodule; var currVal_3 = _co.entry.id; var currVal_4 = 0; var currVal_5 = _co.courseId; var currVal_6 = _co.data.assessed; var currVal_7 = _co.data.scale; var currVal_8 = _co.entry.userid; _ck(_v, 1, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8); }, null); }
function View_AddonModDataEntryPage_8(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "core-rating-aggregate", [["contextLevel", "module"]], null, null, null, aggregate_ngfactory["b" /* View_CoreRatingAggregateComponent_0 */], aggregate_ngfactory["a" /* RenderType_CoreRatingAggregateComponent */])), core["_30" /* ɵdid */](1, 704512, null, 0, aggregate["a" /* CoreRatingAggregateComponent */], [events["a" /* CoreEventsProvider */], modal_controller["a" /* ModalController */], rating["a" /* CoreRatingProvider */], sites["a" /* CoreSitesProvider */]], { ratingInfo: [0, "ratingInfo"], contextLevel: [1, "contextLevel"], instanceId: [2, "instanceId"], itemId: [3, "itemId"], aggregateMethod: [4, "aggregateMethod"], scaleId: [5, "scaleId"], courseId: [6, "courseId"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.ratingInfo; var currVal_1 = "module"; var currVal_2 = _co.data.coursemodule; var currVal_3 = _co.entry.id; var currVal_4 = _co.data.assessed; var currVal_5 = _co.data.scale; var currVal_6 = _co.courseId; _ck(_v, 1, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6); }, null); }
function View_AddonModDataEntryPage_9(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 9, "ion-item", [["class", "item item-block"]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 6, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 7, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 8, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 2, 1, "core-comments", [["area", "database_entry"], ["component", "mod_data"], ["contextLevel", "module"]], null, [[null, "onLoading"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("onLoading" === en)) {
        var pd_0 = (_co.setLoadingComments($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, comments_ngfactory["c" /* View_CoreCommentsCommentsComponent_0 */], comments_ngfactory["b" /* RenderType_CoreCommentsCommentsComponent */])), core["_30" /* ɵdid */](8, 770048, null, 0, comments_comments["a" /* CoreCommentsCommentsComponent */], [nav_controller["a" /* NavController */], comments["a" /* CoreCommentsProvider */], sites["a" /* CoreSitesProvider */], events["a" /* CoreEventsProvider */]], { contextLevel: [0, "contextLevel"], instanceId: [1, "instanceId"], component: [2, "component"], itemId: [3, "itemId"], area: [4, "area"], displaySpinner: [5, "displaySpinner"] }, { onLoading: "onLoading" }), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n        "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = "module"; var currVal_1 = _co.data.coursemodule; var currVal_2 = "mod_data"; var currVal_3 = _co.entry.id; var currVal_4 = "database_entry"; var currVal_5 = false; _ck(_v, 8, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5); }, null); }
function View_AddonModDataEntryPage_11(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 10, "ion-col", [["class", "col"]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, col["a" /* Col */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 6, "button", [["block", ""], ["icon-start", ""], ["ion-button", ""], ["outline", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.gotoEntry(_co.previousOffset) !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](4, 1097728, null, 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { outline: [0, "outline"], block: [1, "block"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](6, 0, null, 0, 1, "ion-icon", [["md", "ios-arrow-back"], ["name", "arrow-back"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](7, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"], md: [1, "md"] }, null), (_l()(), core["_55" /* ɵted */](8, 0, ["\n                        ", "\n                    "])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "]))], function (_ck, _v) { var currVal_0 = ""; var currVal_1 = ""; _ck(_v, 4, 0, currVal_0, currVal_1); var currVal_3 = "arrow-back"; var currVal_4 = "ios-arrow-back"; _ck(_v, 7, 0, currVal_3, currVal_4); }, function (_ck, _v) { var currVal_2 = core["_44" /* ɵnov */](_v, 7)._hidden; _ck(_v, 6, 0, currVal_2); var currVal_5 = core["_56" /* ɵunv */](_v, 8, 0, core["_44" /* ɵnov */](_v, 9).transform("core.previous")); _ck(_v, 8, 0, currVal_5); }); }
function View_AddonModDataEntryPage_12(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 10, "ion-col", [["class", "col"]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, col["a" /* Col */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 6, "button", [["block", ""], ["icon-end", ""], ["ion-button", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.gotoEntry(_co.nextOffset) !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](4, 1097728, null, 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { block: [0, "block"] }, null), (_l()(), core["_55" /* ɵted */](5, 0, ["\n                        ", "\n                        "])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_31" /* ɵeld */](7, 0, null, 0, 1, "ion-icon", [["md", "ios-arrow-forward"], ["name", "arrow-forward"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](8, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"], md: [1, "md"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "]))], function (_ck, _v) { var currVal_0 = ""; _ck(_v, 4, 0, currVal_0); var currVal_3 = "arrow-forward"; var currVal_4 = "ios-arrow-forward"; _ck(_v, 8, 0, currVal_3, currVal_4); }, function (_ck, _v) { var currVal_1 = core["_56" /* ɵunv */](_v, 5, 0, core["_44" /* ɵnov */](_v, 6).transform("core.next")); _ck(_v, 5, 0, currVal_1); var currVal_2 = core["_44" /* ɵnov */](_v, 8)._hidden; _ck(_v, 7, 0, currVal_2); }); }
function View_AddonModDataEntryPage_10(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 12, "ion-grid", [["class", "grid"]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, grid["a" /* Grid */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 8, "ion-row", [["align-items-center", ""], ["class", "row"]], null, null, null, null, null)), core["_30" /* ɵdid */](4, 16384, null, 0, row["a" /* Row */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModDataEntryPage_11)), core["_30" /* ɵdid */](7, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModDataEntryPage_12)), core["_30" /* ɵdid */](10, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = (_co.previousOffset != null); _ck(_v, 7, 0, currVal_0); var currVal_1 = (_co.nextOffset != null); _ck(_v, 10, 0, currVal_1); }, null); }
function View_AddonModDataEntryPage_0(_l) { return core["_57" /* ɵvid */](0, [core["_52" /* ɵqud */](402653184, 1, { content: 0 }), (_l()(), core["_31" /* ɵeld */](1, 0, null, null, 12, "ion-header", [], null, null, null, null, null)), core["_30" /* ɵdid */](2, 16384, null, 0, toolbar_header["a" /* Header */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, view_controller["a" /* ViewController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_31" /* ɵeld */](4, 0, null, null, 8, "ion-navbar", [["class", "toolbar"], ["core-back-button", ""]], [[8, "hidden", 0], [2, "statusbar-padding", null]], null, null, navbar_ngfactory["b" /* View_Navbar_0 */], navbar_ngfactory["a" /* RenderType_Navbar */])), core["_30" /* ɵdid */](5, 49152, null, 0, navbar["a" /* Navbar */], [app["a" /* App */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_30" /* ɵdid */](6, 212992, null, 0, back_button["a" /* CoreBackButtonDirective */], [navbar["a" /* Navbar */], platform["a" /* Platform */], translate_service["a" /* TranslateService */], events["a" /* CoreEventsProvider */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n        "])), (_l()(), core["_31" /* ɵeld */](8, 0, null, 3, 3, "ion-title", [], null, null, null, toolbar_title_ngfactory["b" /* View_ToolbarTitle_0 */], toolbar_title_ngfactory["a" /* RenderType_ToolbarTitle */])), core["_30" /* ɵdid */](9, 49152, null, 0, toolbar_title["a" /* ToolbarTitle */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), (_l()(), core["_31" /* ɵeld */](10, 0, null, 0, 1, "core-format-text", [], null, null, null, null, null)), core["_30" /* ɵdid */](11, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform["a" /* Platform */], utils_utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], providers_app["a" /* CoreAppProvider */], providers_helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */]], { text: [0, "text"] }, null), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_31" /* ɵeld */](15, 0, null, null, 36, "ion-content", [], [[2, "statusbar-padding", null], [2, "has-refresher", null]], null, null, content_ngfactory["b" /* View_Content_0 */], content_ngfactory["a" /* RenderType_Content */])), core["_30" /* ɵdid */](16, 4374528, [[1, 4]], 0, content["a" /* Content */], [config["a" /* Config */], platform["a" /* Platform */], dom_controller["a" /* DomController */], core["t" /* ElementRef */], core["V" /* Renderer */], app["a" /* App */], keyboard["a" /* Keyboard */], core["M" /* NgZone */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n    "])), (_l()(), core["_31" /* ɵeld */](18, 0, null, 2, 6, "ion-refresher", [], [[2, "refresher-active", null], [4, "top", null]], [[null, "ionRefresh"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("ionRefresh" === en)) {
        var pd_0 = (_co.refreshDatabase($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), core["_30" /* ɵdid */](19, 212992, null, 0, refresher["a" /* Refresher */], [platform["a" /* Platform */], content["a" /* Content */], core["M" /* NgZone */], gesture_controller["l" /* GestureController */]], { enabled: [0, "enabled"] }, { ionRefresh: "ionRefresh" }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_31" /* ɵeld */](21, 0, null, null, 2, "ion-refresher-content", [], [[1, "state", 0]], null, null, refresher_content_ngfactory["b" /* View_RefresherContent_0 */], refresher_content_ngfactory["a" /* RenderType_RefresherContent */])), core["_30" /* ɵdid */](22, 114688, null, 0, refresher_content["a" /* RefresherContent */], [refresher["a" /* Refresher */], config["a" /* Config */]], { pullingText: [0, "pullingText"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n    "])), (_l()(), core["_31" /* ɵeld */](26, 0, null, 1, 24, "core-loading", [], null, null, null, loading_ngfactory["b" /* View_CoreLoadingComponent_0 */], loading_ngfactory["a" /* RenderType_CoreLoadingComponent */])), core["_30" /* ɵdid */](27, 638976, null, 0, loading["a" /* CoreLoadingComponent */], [translate_service["a" /* TranslateService */], core["t" /* ElementRef */], events["a" /* CoreEventsProvider */], utils_utils["a" /* CoreUtilsProvider */]], { hideUntil: [0, "hideUntil"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonModDataEntryPage_1)), core["_30" /* ɵdid */](31, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonModDataEntryPage_2)), core["_30" /* ɵdid */](34, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonModDataEntryPage_6)), core["_30" /* ɵdid */](37, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonModDataEntryPage_7)), core["_30" /* ɵdid */](40, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonModDataEntryPage_8)), core["_30" /* ɵdid */](43, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonModDataEntryPage_9)), core["_30" /* ɵdid */](46, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonModDataEntryPage_10)), core["_30" /* ɵdid */](49, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; _ck(_v, 6, 0); var currVal_2 = _co.title; _ck(_v, 11, 0, currVal_2); var currVal_7 = (_co.entryLoaded && (_co.isPullingToRefresh || ((!_co.renderingEntry && !_co.loadingRating) && !_co.loadingComments))); _ck(_v, 19, 0, currVal_7); var currVal_9 = core["_34" /* ɵinlineInterpolate */](1, "", core["_56" /* ɵunv */](_v, 22, 0, core["_44" /* ɵnov */](_v, 23).transform("core.pulltorefresh")), ""); _ck(_v, 22, 0, currVal_9); var currVal_10 = (_co.entryLoaded && (_co.isPullingToRefresh || ((!_co.renderingEntry && !_co.loadingRating) && !_co.loadingComments))); _ck(_v, 27, 0, currVal_10); var currVal_11 = (_co.entry && _co.entry.hasOffline); _ck(_v, 31, 0, currVal_11); var currVal_12 = (_co.groupInfo && (_co.groupInfo.separateGroups || _co.groupInfo.visibleGroups)); _ck(_v, 34, 0, currVal_12); var currVal_13 = _co.entry; _ck(_v, 37, 0, currVal_13); var currVal_14 = (((_co.data && _co.entry) && _co.ratingInfo) && (!_co.data.approval || _co.entry.approved)); _ck(_v, 40, 0, currVal_14); var currVal_15 = ((_co.data && _co.entry) && _co.ratingInfo); _ck(_v, 43, 0, currVal_15); var currVal_16 = ((((_co.data && _co.data.comments) && _co.entry) && (_co.entry.id > 0)) && _co.commentsEnabled); _ck(_v, 46, 0, currVal_16); var currVal_17 = ((_co.previousOffset != null) || (_co.nextOffset != null)); _ck(_v, 49, 0, currVal_17); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 5)._hidden; var currVal_1 = core["_44" /* ɵnov */](_v, 5)._sbPadding; _ck(_v, 4, 0, currVal_0, currVal_1); var currVal_3 = core["_44" /* ɵnov */](_v, 16).statusbarPadding; var currVal_4 = core["_44" /* ɵnov */](_v, 16)._hasRefresher; _ck(_v, 15, 0, currVal_3, currVal_4); var currVal_5 = (core["_44" /* ɵnov */](_v, 19).state !== "inactive"); var currVal_6 = core["_44" /* ɵnov */](_v, 19)._top; _ck(_v, 18, 0, currVal_5, currVal_6); var currVal_8 = core["_44" /* ɵnov */](_v, 22).r.state; _ck(_v, 21, 0, currVal_8); }); }
function View_AddonModDataEntryPage_Host_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "page-addon-mod-data-entry", [], null, null, null, View_AddonModDataEntryPage_0, RenderType_AddonModDataEntryPage)), core["_30" /* ɵdid */](1, 180224, null, 0, entry_AddonModDataEntryPage, [nav_params["a" /* NavParams */], utils_utils["a" /* CoreUtilsProvider */], groups["a" /* CoreGroupsProvider */], dom["a" /* CoreDomUtilsProvider */], fields_delegate["a" /* AddonModDataFieldsDelegate */], course["a" /* CoreCourseProvider */], data["a" /* AddonModDataProvider */], helper["a" /* AddonModDataHelperProvider */], sites["a" /* CoreSitesProvider */], nav_controller["a" /* NavController */], events["a" /* CoreEventsProvider */], core["j" /* ChangeDetectorRef */], comments["a" /* CoreCommentsProvider */]], null, null)], null, null); }
var AddonModDataEntryPageNgFactory = core["_27" /* ɵccf */]("page-addon-mod-data-entry", entry_AddonModDataEntryPage, View_AddonModDataEntryPage_Host_0, {}, {}, []);

//# sourceMappingURL=entry.ngfactory.js.map
// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.loader.js
var translate_loader = __webpack_require__(360);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.compiler.js
var translate_compiler = __webpack_require__(361);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.parser.js
var translate_parser = __webpack_require__(363);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/missing-translation-handler.js
var missing_translation_handler = __webpack_require__(362);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.store.js
var translate_store = __webpack_require__(467);

// EXTERNAL MODULE: ./node_modules/ionic-angular/module.js
var ionic_angular_module = __webpack_require__(710);

// EXTERNAL MODULE: ./src/pipes/pipes.module.ts + 2 modules
var pipes_module = __webpack_require__(109);

// EXTERNAL MODULE: ./src/core/block/components/components.module.ts
var block_components_components_module = __webpack_require__(269);

// EXTERNAL MODULE: ./src/core/course/components/components.module.ts
var course_components_components_module = __webpack_require__(71);

// EXTERNAL MODULE: ./src/core/tag/components/components.module.ts
var tag_components_components_module = __webpack_require__(271);

// EXTERNAL MODULE: ./node_modules/ionic-angular/util/module-loader.js
var module_loader = __webpack_require__(268);

// CONCATENATED MODULE: ./src/addon/mod/data/pages/entry/entry.module.ngfactory.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddonModDataEntryPageModuleNgFactory", function() { return AddonModDataEntryPageModuleNgFactory; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 














































var AddonModDataEntryPageModuleNgFactory = core["_28" /* ɵcmf */](entry_module_AddonModDataEntryPageModule, [], function (_l) { return core["_40" /* ɵmod */]([core["_41" /* ɵmpd */](512, core["o" /* ComponentFactoryResolver */], core["_21" /* ɵCodegenComponentFactoryResolver */], [[8, [action_sheet_component_ngfactory["a" /* ActionSheetCmpNgFactory */], alert_component_ngfactory["a" /* AlertCmpNgFactory */], app_root_ngfactory["a" /* IonicAppNgFactory */], loading_component_ngfactory["a" /* LoadingCmpNgFactory */], modal_component_ngfactory["a" /* ModalCmpNgFactory */], picker_component_ngfactory["a" /* PickerCmpNgFactory */], popover_component_ngfactory["a" /* PopoverCmpNgFactory */], select_popover_component_ngfactory["a" /* SelectPopoverNgFactory */], toast_component_ngfactory["a" /* ToastCmpNgFactory */], context_menu_popover_ngfactory["a" /* CoreContextMenuPopoverComponentNgFactory */], course_picker_menu_popover_ngfactory["a" /* CoreCoursePickerMenuPopoverComponentNgFactory */], recaptchamodal_ngfactory["a" /* CoreRecaptchaModalComponentNgFactory */], bs_tooltip_ngfactory["a" /* CoreBSTooltipComponentNgFactory */], only_title_block_ngfactory["a" /* CoreBlockOnlyTitleComponentNgFactory */], pre_rendered_block_ngfactory["a" /* CoreBlockPreRenderedComponentNgFactory */], course_blocks_ngfactory["a" /* CoreBlockCourseBlocksComponentNgFactory */], unsupported_module_ngfactory["a" /* CoreCourseUnsupportedModuleComponentNgFactory */], tag_area_ngfactory["a" /* CoreCourseTagAreaComponentNgFactory */], comments_ngfactory["a" /* CoreCommentsCommentsComponentNgFactory */], feed_ngfactory["a" /* CoreTagFeedComponentNgFactory */], index_ngfactory["a" /* AddonModDataIndexComponentNgFactory */], AddonModDataEntryPageNgFactory]], [3, core["o" /* ComponentFactoryResolver */]], core["K" /* NgModuleRef */]]), core["_41" /* ɵmpd */](4608, common["m" /* NgLocalization */], common["l" /* NgLocaleLocalization */], [core["G" /* LOCALE_ID */], [2, common["w" /* ɵa */]]]), core["_41" /* ɵmpd */](4608, esm5_forms["x" /* ɵi */], esm5_forms["x" /* ɵi */], []), core["_41" /* ɵmpd */](4608, esm5_forms["d" /* FormBuilder */], esm5_forms["d" /* FormBuilder */], []), core["_41" /* ɵmpd */](4608, translate_loader["b" /* TranslateLoader */], translate_loader["a" /* TranslateFakeLoader */], []), core["_41" /* ɵmpd */](4608, translate_compiler["a" /* TranslateCompiler */], translate_compiler["b" /* TranslateFakeCompiler */], []), core["_41" /* ɵmpd */](4608, translate_parser["b" /* TranslateParser */], translate_parser["a" /* TranslateDefaultParser */], []), core["_41" /* ɵmpd */](4608, missing_translation_handler["b" /* MissingTranslationHandler */], missing_translation_handler["a" /* FakeMissingTranslationHandler */], []), core["_41" /* ɵmpd */](4608, translate_service["a" /* TranslateService */], translate_service["a" /* TranslateService */], [translate_store["a" /* TranslateStore */], translate_loader["b" /* TranslateLoader */], translate_compiler["a" /* TranslateCompiler */], translate_parser["b" /* TranslateParser */], missing_translation_handler["b" /* MissingTranslationHandler */], translate_service["b" /* USE_DEFAULT_LANG */], translate_service["c" /* USE_STORE */]]), core["_41" /* ɵmpd */](512, directives_module["a" /* CoreDirectivesModule */], directives_module["a" /* CoreDirectivesModule */], []), core["_41" /* ɵmpd */](512, common["b" /* CommonModule */], common["b" /* CommonModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["v" /* ɵba */], esm5_forms["v" /* ɵba */], []), core["_41" /* ɵmpd */](512, esm5_forms["i" /* FormsModule */], esm5_forms["i" /* FormsModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["s" /* ReactiveFormsModule */], esm5_forms["s" /* ReactiveFormsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["a" /* IonicModule */], ionic_angular_module["a" /* IonicModule */], []), core["_41" /* ɵmpd */](512, _ngx_translate_core["b" /* TranslateModule */], _ngx_translate_core["b" /* TranslateModule */], []), core["_41" /* ɵmpd */](512, pipes_module["a" /* CorePipesModule */], pipes_module["a" /* CorePipesModule */], []), core["_41" /* ɵmpd */](512, components_module["a" /* CoreComponentsModule */], components_module["a" /* CoreComponentsModule */], []), core["_41" /* ɵmpd */](512, block_components_components_module["a" /* CoreBlockComponentsModule */], block_components_components_module["a" /* CoreBlockComponentsModule */], []), core["_41" /* ɵmpd */](512, course_components_components_module["a" /* CoreCourseComponentsModule */], course_components_components_module["a" /* CoreCourseComponentsModule */], []), core["_41" /* ɵmpd */](512, compile_html_module["a" /* CoreCompileHtmlComponentModule */], compile_html_module["a" /* CoreCompileHtmlComponentModule */], []), core["_41" /* ɵmpd */](512, components_components_module["a" /* CoreCommentsComponentsModule */], components_components_module["a" /* CoreCommentsComponentsModule */], []), core["_41" /* ɵmpd */](512, tag_components_components_module["a" /* CoreTagComponentsModule */], tag_components_components_module["a" /* CoreTagComponentsModule */], []), core["_41" /* ɵmpd */](512, data_components_components_module["a" /* AddonModDataComponentsModule */], data_components_components_module["a" /* AddonModDataComponentsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["b" /* IonicPageModule */], ionic_angular_module["b" /* IonicPageModule */], []), core["_41" /* ɵmpd */](512, rating_components_components_module["a" /* CoreRatingComponentsModule */], rating_components_components_module["a" /* CoreRatingComponentsModule */], []), core["_41" /* ɵmpd */](512, entry_module_AddonModDataEntryPageModule, entry_module_AddonModDataEntryPageModule, []), core["_41" /* ɵmpd */](256, translate_service["c" /* USE_STORE */], undefined, []), core["_41" /* ɵmpd */](256, translate_service["b" /* USE_DEFAULT_LANG */], undefined, []), core["_41" /* ɵmpd */](256, module_loader["a" /* LAZY_LOADED_TOKEN */], entry_AddonModDataEntryPage, [])]); });

//# sourceMappingURL=entry.module.ngfactory.js.map

/***/ }),

/***/ 2110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RenderType_CoreRatingRateComponent; });
/* harmony export (immutable) */ __webpack_exports__["b"] = View_CoreRatingRateComponent_0;
/* unused harmony export View_CoreRatingRateComponent_Host_0 */
/* unused harmony export CoreRatingRateComponentNgFactory */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular_components_option_option__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_ionic_angular_components_item_item_ngfactory__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_item_item__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular_util_form__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular_config_config__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular_components_item_item_reorder__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ionic_angular_components_item_item_content__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ionic_angular_components_label_label__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ngx_translate_core_src_translate_pipe__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ngx_translate_core_src_translate_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__node_modules_ionic_angular_components_select_select_ngfactory__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ionic_angular_components_select_select__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_ionic_angular_components_app_app__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_ionic_angular_navigation_deep_linker__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__angular_common__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__rate__ = __webpack_require__(1496);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_utils_dom__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__providers_events__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__providers_rating__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__providers_offline__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__providers_sites__ = __webpack_require__(1);
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 























var styles_CoreRatingRateComponent = [];
var RenderType_CoreRatingRateComponent = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_CoreRatingRateComponent, data: {} });

function View_CoreRatingRateComponent_2(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 2, "ion-option", [], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](1, 16384, [[4, 4]], 0, __WEBPACK_IMPORTED_MODULE_1_ionic_angular_components_option_option__["a" /* Option */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */]], { value: [0, "value"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](2, null, ["", ""]))], function (_ck, _v) { var currVal_0 = _v.context.$implicit.value; _ck(_v, 1, 0, currVal_0); }, function (_ck, _v) { var currVal_1 = _v.context.$implicit.name; _ck(_v, 2, 0, currVal_1); }); }
function View_CoreRatingRateComponent_1(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 23, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, __WEBPACK_IMPORTED_MODULE_2__node_modules_ionic_angular_components_item_item_ngfactory__["b" /* View_Item_0 */], __WEBPACK_IMPORTED_MODULE_2__node_modules_ionic_angular_components_item_item_ngfactory__["a" /* RenderType_Item */])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](1, 1097728, null, 3, __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_item_item__["a" /* Item */], [__WEBPACK_IMPORTED_MODULE_4_ionic_angular_util_form__["a" /* Form */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular_config_config__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */], [2, __WEBPACK_IMPORTED_MODULE_6_ionic_angular_components_item_item_reorder__["a" /* ItemReorder */]]], null, null), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_52" /* ɵqud */](335544320, 1, { contentLabel: 0 }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_52" /* ɵqud */](603979776, 2, { _buttons: 1 }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_52" /* ɵqud */](603979776, 3, { _icons: 1 }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](5, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_7_ionic_angular_components_item_item_content__["a" /* ItemContent */], [], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 2, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](7, 0, null, 1, 3, "ion-label", [], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](8, 16384, [[1, 4]], 0, __WEBPACK_IMPORTED_MODULE_8_ionic_angular_components_label_label__["a" /* Label */], [__WEBPACK_IMPORTED_MODULE_5_ionic_angular_config_config__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */], [8, null], [8, null], [8, null], [8, null]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](9, null, ["", ""])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_47" /* ɵpid */](131072, __WEBPACK_IMPORTED_MODULE_9__ngx_translate_core_src_translate_pipe__["a" /* TranslatePipe */], [__WEBPACK_IMPORTED_MODULE_10__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */]]), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 2, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](12, 0, null, 3, 10, "ion-select", [["interface", "action-sheet"], ["text-start", ""]], [[2, "select-disabled", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "click"], [null, "keyup.space"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 13)._click($event) !== false);
        ad = (pd_0 && ad);
    } if (("keyup.space" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 13)._keyup() !== false);
        ad = (pd_1 && ad);
    } if (("ngModelChange" === en)) {
        var pd_2 = ((_co.rating = $event) !== false);
        ad = (pd_2 && ad);
    } if (("ngModelChange" === en)) {
        var pd_3 = (_co.userRatingChanged() !== false);
        ad = (pd_3 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_11__node_modules_ionic_angular_components_select_select_ngfactory__["b" /* View_Select_0 */], __WEBPACK_IMPORTED_MODULE_11__node_modules_ionic_angular_components_select_select_ngfactory__["a" /* RenderType_Select */])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](13, 1228800, null, 1, __WEBPACK_IMPORTED_MODULE_12_ionic_angular_components_select_select__["a" /* Select */], [__WEBPACK_IMPORTED_MODULE_13_ionic_angular_components_app_app__["a" /* App */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular_util_form__["a" /* Form */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular_config_config__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */], [2, __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_item_item__["a" /* Item */]], __WEBPACK_IMPORTED_MODULE_14_ionic_angular_navigation_deep_linker__["a" /* DeepLinker */]], { disabled: [0, "disabled"], interface: [1, "interface"] }, null), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_52" /* ɵqud */](603979776, 4, { options: 1 }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_50" /* ɵprd */](1024, null, __WEBPACK_IMPORTED_MODULE_15__angular_forms__["l" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [__WEBPACK_IMPORTED_MODULE_12_ionic_angular_components_select_select__["a" /* Select */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](16, 671744, null, 0, __WEBPACK_IMPORTED_MODULE_15__angular_forms__["q" /* NgModel */], [[8, null], [8, null], [8, null], [2, __WEBPACK_IMPORTED_MODULE_15__angular_forms__["l" /* NG_VALUE_ACCESSOR */]]], { isDisabled: [0, "isDisabled"], model: [1, "model"] }, { update: "ngModelChange" }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_50" /* ɵprd */](2048, null, __WEBPACK_IMPORTED_MODULE_15__angular_forms__["m" /* NgControl */], null, [__WEBPACK_IMPORTED_MODULE_15__angular_forms__["q" /* NgModel */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](18, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_15__angular_forms__["n" /* NgControlStatus */], [__WEBPACK_IMPORTED_MODULE_15__angular_forms__["m" /* NgControl */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreRatingRateComponent_2)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](21, 802816, null, 0, __WEBPACK_IMPORTED_MODULE_16__angular_common__["j" /* NgForOf */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewContainerRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* TemplateRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 2, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_9 = !_co.item.canrate; var currVal_10 = "action-sheet"; _ck(_v, 13, 0, currVal_9, currVal_10); var currVal_11 = !_co.item.canrate; var currVal_12 = _co.rating; _ck(_v, 16, 0, currVal_11, currVal_12); var currVal_13 = _co.scale.items; _ck(_v, 21, 0, currVal_13); }, function (_ck, _v) { var currVal_0 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_56" /* ɵunv */](_v, 9, 0, __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 10).transform("core.rating.rating")); _ck(_v, 9, 0, currVal_0); var currVal_1 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 13)._disabled; var currVal_2 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 18).ngClassUntouched; var currVal_3 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 18).ngClassTouched; var currVal_4 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 18).ngClassPristine; var currVal_5 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 18).ngClassDirty; var currVal_6 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 18).ngClassValid; var currVal_7 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 18).ngClassInvalid; var currVal_8 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 18).ngClassPending; _ck(_v, 12, 0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8); }); }
function View_CoreRatingRateComponent_0(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreRatingRateComponent_1)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](1, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_16__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewContainerRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = ((_co.item && (_co.item.canrate || (_co.item.rating != null))) && !_co.disabled); _ck(_v, 1, 0, currVal_0); }, null); }
function View_CoreRatingRateComponent_Host_0(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 1, "core-rating-rate", [], null, null, null, View_CoreRatingRateComponent_0, RenderType_CoreRatingRateComponent)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](1, 704512, null, 0, __WEBPACK_IMPORTED_MODULE_17__rate__["a" /* CoreRatingRateComponent */], [__WEBPACK_IMPORTED_MODULE_18__providers_utils_dom__["a" /* CoreDomUtilsProvider */], __WEBPACK_IMPORTED_MODULE_10__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_19__providers_events__["a" /* CoreEventsProvider */], __WEBPACK_IMPORTED_MODULE_20__providers_rating__["a" /* CoreRatingProvider */], __WEBPACK_IMPORTED_MODULE_21__providers_offline__["a" /* CoreRatingOfflineProvider */], __WEBPACK_IMPORTED_MODULE_22__providers_sites__["a" /* CoreSitesProvider */]], null, null)], null, null); }
var CoreRatingRateComponentNgFactory = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_27" /* ɵccf */]("core-rating-rate", __WEBPACK_IMPORTED_MODULE_17__rate__["a" /* CoreRatingRateComponent */], View_CoreRatingRateComponent_Host_0, { ratingInfo: "ratingInfo", contextLevel: "contextLevel", instanceId: "instanceId", itemId: "itemId", itemSetId: "itemSetId", courseId: "courseId", aggregateMethod: "aggregateMethod", scaleId: "scaleId", userId: "userId" }, { onLoading: "onLoading", onUpdate: "onUpdate" }, []);

//# sourceMappingURL=rate.ngfactory.js.map

/***/ }),

/***/ 2111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RenderType_CoreRatingAggregateComponent; });
/* harmony export (immutable) */ __webpack_exports__["b"] = View_CoreRatingAggregateComponent_0;
/* unused harmony export View_CoreRatingAggregateComponent_Host_0 */
/* unused harmony export CoreRatingAggregateComponentNgFactory */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_ionic_angular_components_item_item_ngfactory__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_components_item_item__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular_util_form__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular_config_config__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular_components_item_item_reorder__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular_components_item_item_content__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core_src_translate_pipe__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ngx_translate_core_src_translate_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_common__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__aggregate__ = __webpack_require__(1495);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_events__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ionic_angular_components_modal_modal_controller__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_rating__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_sites__ = __webpack_require__(1);
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 















var styles_CoreRatingAggregateComponent = [];
var RenderType_CoreRatingAggregateComponent = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_CoreRatingAggregateComponent, data: {} });

function View_CoreRatingAggregateComponent_2(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 1, "span", [], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](1, null, ["(", ")"]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.item.count; _ck(_v, 1, 0, currVal_0); }); }
function View_CoreRatingAggregateComponent_1(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 11, "a", [["class", "item item-block"], ["ion-item", ""], ["text-wrap", ""]], [[1, "detail-none", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.openRatings() !== false);
        ad = (pd_0 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_1__node_modules_ionic_angular_components_item_item_ngfactory__["b" /* View_Item_0 */], __WEBPACK_IMPORTED_MODULE_1__node_modules_ionic_angular_components_item_item_ngfactory__["a" /* RenderType_Item */])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](1, 1097728, null, 3, __WEBPACK_IMPORTED_MODULE_2_ionic_angular_components_item_item__["a" /* Item */], [__WEBPACK_IMPORTED_MODULE_3_ionic_angular_util_form__["a" /* Form */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular_config_config__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */], [2, __WEBPACK_IMPORTED_MODULE_5_ionic_angular_components_item_item_reorder__["a" /* ItemReorder */]]], null, null), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_52" /* ɵqud */](335544320, 1, { contentLabel: 0 }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_52" /* ɵqud */](603979776, 2, { _buttons: 1 }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_52" /* ɵqud */](603979776, 3, { _icons: 1 }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](5, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_6_ionic_angular_components_item_item_content__["a" /* ItemContent */], [], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](6, 2, ["\n    ", "", " ", "\n    "])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_47" /* ɵpid */](131072, __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core_src_translate_pipe__["a" /* TranslatePipe */], [__WEBPACK_IMPORTED_MODULE_8__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_47" /* ɵpid */](131072, __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core_src_translate_pipe__["a" /* TranslatePipe */], [__WEBPACK_IMPORTED_MODULE_8__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */]]), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_26" /* ɵand */](16777216, null, 2, 1, null, View_CoreRatingAggregateComponent_2)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](10, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_9__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewContainerRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 2, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_4 = (_co.showCount && (_co.item.count > 0)); _ck(_v, 10, 0, currVal_4); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = ((_co.ratingInfo.canviewall && _co.item.count) ? null : true); _ck(_v, 0, 0, currVal_0); var currVal_1 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_56" /* ɵunv */](_v, 6, 0, __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 7).transform(_co.labelKey)); var currVal_2 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_56" /* ɵunv */](_v, 6, 1, __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 8).transform("core.labelsep")); var currVal_3 = (_co.item.aggregatestr || "-"); _ck(_v, 6, 0, currVal_1, currVal_2, currVal_3); }); }
function View_CoreRatingAggregateComponent_0(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreRatingAggregateComponent_1)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](1, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_9__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewContainerRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = (((_co.item && _co.item.canviewaggregate) && _co.labelKey) && !_co.disabled); _ck(_v, 1, 0, currVal_0); }, null); }
function View_CoreRatingAggregateComponent_Host_0(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 1, "core-rating-aggregate", [], null, null, null, View_CoreRatingAggregateComponent_0, RenderType_CoreRatingAggregateComponent)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](1, 704512, null, 0, __WEBPACK_IMPORTED_MODULE_10__aggregate__["a" /* CoreRatingAggregateComponent */], [__WEBPACK_IMPORTED_MODULE_11__providers_events__["a" /* CoreEventsProvider */], __WEBPACK_IMPORTED_MODULE_12_ionic_angular_components_modal_modal_controller__["a" /* ModalController */], __WEBPACK_IMPORTED_MODULE_13__providers_rating__["a" /* CoreRatingProvider */], __WEBPACK_IMPORTED_MODULE_14__providers_sites__["a" /* CoreSitesProvider */]], null, null)], null, null); }
var CoreRatingAggregateComponentNgFactory = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_27" /* ɵccf */]("core-rating-aggregate", __WEBPACK_IMPORTED_MODULE_10__aggregate__["a" /* CoreRatingAggregateComponent */], View_CoreRatingAggregateComponent_Host_0, { ratingInfo: "ratingInfo", contextLevel: "contextLevel", instanceId: "instanceId", itemId: "itemId", aggregateMethod: "aggregateMethod", scaleId: "scaleId", courseId: "courseId" }, {}, []);

//# sourceMappingURL=aggregate.ngfactory.js.map

/***/ })

});
//# sourceMappingURL=14.js.map