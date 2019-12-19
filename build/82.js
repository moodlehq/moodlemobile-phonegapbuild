webpackJsonp([82],{

/***/ 2150:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/@angular/core/esm5/core.js
var core = __webpack_require__(0);

// EXTERNAL MODULE: ./node_modules/ionic-angular/index.js + 3 modules
var ionic_angular = __webpack_require__(5);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/index.js + 1 modules
var _ngx_translate_core = __webpack_require__(3);

// EXTERNAL MODULE: ./src/components/components.module.ts
var components_module = __webpack_require__(28);

// EXTERNAL MODULE: ./src/directives/directives.module.ts + 2 modules
var directives_module = __webpack_require__(32);

// EXTERNAL MODULE: ./node_modules/@angular/forms/esm5/forms.js
var esm5_forms = __webpack_require__(23);

// EXTERNAL MODULE: ./src/providers/events.ts
var events = __webpack_require__(10);

// EXTERNAL MODULE: ./src/providers/sites.ts
var sites = __webpack_require__(1);

// EXTERNAL MODULE: ./src/providers/sync.ts
var sync = __webpack_require__(80);

// EXTERNAL MODULE: ./src/providers/utils/dom.ts
var dom = __webpack_require__(4);

// EXTERNAL MODULE: ./src/providers/utils/text.ts
var utils_text = __webpack_require__(11);

// EXTERNAL MODULE: ./src/core/course/providers/course.ts
var course = __webpack_require__(13);

// EXTERNAL MODULE: ./src/core/course/providers/helper.ts
var helper = __webpack_require__(38);

// EXTERNAL MODULE: ./src/addon/mod/wiki/providers/wiki.ts
var wiki = __webpack_require__(237);

// EXTERNAL MODULE: ./src/addon/mod/wiki/providers/wiki-offline.ts
var wiki_offline = __webpack_require__(291);

// EXTERNAL MODULE: ./src/addon/mod/wiki/providers/wiki-sync.ts
var wiki_sync = __webpack_require__(292);

// CONCATENATED MODULE: ./src/addon/mod/wiki/pages/edit/edit.ts
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
 * Page that allows adding or editing a wiki page.
 */
var edit_AddonModWikiEditPage = /** @class */ (function () {
    function AddonModWikiEditPage(navParams, fb, navCtrl, sitesProvider, syncProvider, domUtils, translate, courseProvider, eventsProvider, wikiProvider, wikiOffline, wikiSync, textUtils, courseHelper) {
        this.navCtrl = navCtrl;
        this.sitesProvider = sitesProvider;
        this.syncProvider = syncProvider;
        this.domUtils = domUtils;
        this.translate = translate;
        this.courseProvider = courseProvider;
        this.eventsProvider = eventsProvider;
        this.wikiProvider = wikiProvider;
        this.wikiOffline = wikiOffline;
        this.wikiSync = wikiSync;
        this.textUtils = textUtils;
        this.courseHelper = courseHelper;
        this.component = wiki["a" /* AddonModWikiProvider */].COMPONENT; // Component to link the files to.
        this.forceLeave = false; // To allow leaving the page without checking for changes.
        this.isDestroyed = false; // Whether the page has been destroyed.
        this.module = navParams.get('module') || {};
        this.courseId = navParams.get('courseId');
        this.subwikiId = navParams.get('subwikiId');
        this.wikiId = navParams.get('wikiId');
        this.pageId = navParams.get('pageId');
        this.section = navParams.get('section');
        this.groupId = navParams.get('groupId');
        this.userId = navParams.get('userId');
        var pageTitle = navParams.get('pageTitle');
        pageTitle = pageTitle ? pageTitle.replace(/\+/g, ' ') : '';
        this.initialSubwikiId = this.subwikiId;
        this.componentId = this.module.id;
        this.canEditTitle = !pageTitle;
        this.title = pageTitle ? this.translate.instant('addon.mod_wiki.editingpage', { $a: pageTitle }) :
            this.translate.instant('addon.mod_wiki.newpagehdr');
        this.blockId = this.wikiSync.getSubwikiBlockId(this.subwikiId, this.wikiId, this.userId, this.groupId);
        // Create the form group and its controls.
        this.contentControl = fb.control('');
        this.pageForm = fb.group({
            title: pageTitle
        });
        this.pageForm.addControl('text', this.contentControl);
        // Block the wiki so it cannot be synced.
        this.syncProvider.blockOperation(this.component, this.blockId);
    }
    /**
     * Component being initialized.
     */
    AddonModWikiEditPage.prototype.ngOnInit = function () {
        var _this = this;
        this.fetchWikiPageData().then(function (success) {
            if (success && _this.blockId && !_this.isDestroyed) {
                // Block the subwiki now that we have blockId for sure.
                var newBlockId = _this.wikiSync.getSubwikiBlockId(_this.subwikiId, _this.wikiId, _this.userId, _this.groupId);
                if (newBlockId != _this.blockId) {
                    _this.syncProvider.unblockOperation(_this.component, _this.blockId);
                    _this.blockId = newBlockId;
                    _this.syncProvider.blockOperation(_this.component, _this.blockId);
                }
            }
        }).finally(function () {
            _this.loaded = true;
        });
    };
    /**
     * Convenience function to get wiki page data.
     *
     * @return Promise resolved with boolean: whether it was successful.
     */
    AddonModWikiEditPage.prototype.fetchWikiPageData = function () {
        var _this = this;
        var promise, canEdit = false;
        if (this.pageId) {
            // Editing a page that already exists.
            this.canEditTitle = false;
            this.editing = true;
            this.editOffline = false; // Cannot edit pages in offline.
            // Get page contents to obtain title and editing permission
            promise = this.wikiProvider.getPageContents(this.pageId).then(function (pageContents) {
                _this.pageForm.controls.title.setValue(pageContents.title); // Set the title in the form group.
                _this.wikiId = pageContents.wikiid;
                _this.subwikiId = pageContents.subwikiid;
                _this.title = _this.translate.instant('addon.mod_wiki.editingpage', { $a: pageContents.title });
                _this.groupId = pageContents.groupid;
                _this.userId = pageContents.userid;
                canEdit = pageContents.caneditpage;
                // Wait for sync to be over (if any).
                return _this.wikiSync.waitForSync(_this.blockId);
            }).then(function () {
                // Get subwiki files, needed to replace URLs for rich text editor.
                return _this.wikiProvider.getSubwikiFiles(_this.wikiId, _this.groupId, _this.userId);
            }).then(function (files) {
                _this.subwikiFiles = files;
                // Get editable text of the page/section.
                return _this.wikiProvider.getPageForEditing(_this.pageId, _this.section);
            }).then(function (editContents) {
                // Get the original page contents, treating file URLs if needed.
                var content = _this.textUtils.replacePluginfileUrls(editContents.content, _this.subwikiFiles);
                _this.contentControl.setValue(content);
                _this.originalContent = content;
                _this.version = editContents.version;
                if (canEdit) {
                    // Renew the lock every certain time.
                    _this.renewLockInterval = setInterval(function () {
                        _this.renewLock();
                    }, wiki["a" /* AddonModWikiProvider */].RENEW_LOCK_TIME);
                }
            });
        }
        else {
            var pageTitle_1 = this.pageForm.controls.title.value;
            // New page. Wait for sync to be over (if any).
            promise = this.wikiSync.waitForSync(this.blockId);
            if (pageTitle_1) {
                // Title is set, it could be editing an offline page or creating a new page using an edit link.
                promise = promise.then(function (result) {
                    // First of all, verify if this page was created in the current sync.
                    if (result) {
                        var page = result.created.find(function (page) {
                            return page.title == pageTitle_1;
                        });
                        if (page && page.pageId > 0) {
                            // Page was created, now it exists in the site.
                            _this.pageId = page.pageId;
                            return _this.fetchWikiPageData();
                        }
                    }
                    // Check if there's already some offline data for this page.
                    return _this.wikiOffline.getNewPage(pageTitle_1, _this.subwikiId, _this.wikiId, _this.userId, _this.groupId);
                }).then(function (page) {
                    // Load offline content.
                    _this.contentControl.setValue(page.cachedcontent);
                    _this.originalContent = page.cachedcontent;
                    _this.editOffline = true;
                }).catch(function () {
                    // No offline data found.
                    _this.editOffline = false;
                });
            }
            else {
                this.editOffline = false;
            }
            promise.then(function () {
                _this.editing = false;
                canEdit = !!_this.blockId; // If no blockId, the user cannot edit the page.
            });
        }
        return promise.then(function () {
            return true;
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'Error getting wiki data.');
            // Go back.
            _this.forceLeavePage();
            return false;
        }).finally(function () {
            if (!canEdit) {
                // Cannot edit, show alert and go back.
                _this.domUtils.showAlert(_this.translate.instant('core.notice'), _this.translate.instant('addon.mod_wiki.cannoteditpage'));
                _this.forceLeavePage();
            }
        });
    };
    /**
     * Force leaving the page, without checking for changes.
     */
    AddonModWikiEditPage.prototype.forceLeavePage = function () {
        this.forceLeave = true;
        this.navCtrl.pop();
    };
    /**
     * Navigate to a new offline page.
     *
     * @param title Page title.
     */
    AddonModWikiEditPage.prototype.goToNewOfflinePage = function (title) {
        if (this.courseId && (this.module.id || this.wikiId)) {
            // We have enough data to navigate to the page.
            if (!this.editOffline || this.previousViewPageIsDifferentOffline(title)) {
                this.pageParamsToLoad = {
                    module: this.module,
                    courseId: this.courseId,
                    pageId: null,
                    pageTitle: title,
                    wikiId: this.wikiId,
                    subwikiId: this.subwikiId,
                    userId: this.userId,
                    groupId: this.groupId
                };
            }
        }
        else {
            this.domUtils.showAlert(this.translate.instant('core.success'), this.translate.instant('core.datastoredoffline'));
        }
        this.forceLeavePage();
    };
    /**
     * Check if we need to navigate to a new state.
     *
     * @param title Page title.
     * @return Promise resolved when done.
     */
    AddonModWikiEditPage.prototype.gotoPage = function (title) {
        var _this = this;
        return this.retrieveModuleInfo(this.wikiId).then(function () {
            var openPage = false;
            // Not the firstpage.
            if (_this.initialSubwikiId) {
                if (!_this.editing && _this.editOffline && _this.previousViewPageIsDifferentOffline(title)) {
                    // The user submitted an offline page that isn't loaded in the back view, open it.
                    openPage = true;
                }
                else if (!_this.editOffline && _this.previousViewIsDifferentPageOnline()) {
                    // The user submitted an offline page that isn't loaded in the back view, open it.
                    openPage = true;
                }
            }
            if (openPage) {
                // Setting that will do the app navigate to the page.
                _this.pageParamsToLoad = {
                    module: _this.module,
                    courseId: _this.courseId,
                    pageId: _this.pageId,
                    pageTitle: title,
                    wikiId: _this.wikiId,
                    subwikiId: _this.subwikiId,
                    userId: _this.userId,
                    groupId: _this.groupId
                };
            }
            _this.forceLeavePage();
        }).catch(function () {
            // Go back if it fails.
            _this.forceLeavePage();
        });
    };
    /**
     * Check if data has changed.
     *
     * @return Whether data has changed.
     */
    AddonModWikiEditPage.prototype.hasDataChanged = function () {
        var values = this.pageForm.value;
        return !(this.originalContent == values.text || (!this.editing && !values.text && !values.title));
    };
    /**
     * Check if we can leave the page or not.
     *
     * @return Resolved if we can leave it, rejected if not.
     */
    AddonModWikiEditPage.prototype.ionViewCanLeave = function () {
        if (this.forceLeave) {
            return true;
        }
        // Check if data has changed.
        if (this.hasDataChanged()) {
            return this.domUtils.showConfirm(this.translate.instant('core.confirmcanceledit'));
        }
        return true;
    };
    /**
     * View left.
     */
    AddonModWikiEditPage.prototype.ionViewDidLeave = function () {
        if (this.pageParamsToLoad) {
            // Go to the page we've just created/edited.
            this.navCtrl.push('AddonModWikiIndexPage', this.pageParamsToLoad);
        }
    };
    /**
     * In case we are NOT editing an offline page, check if the page loaded in previous view is different than this view.
     *
     * @return Whether previous view wiki page is different than current page.
     */
    AddonModWikiEditPage.prototype.previousViewIsDifferentPageOnline = function () {
        // We cannot precisely detect when the state is the same but this is close to it.
        var previousView = this.navCtrl.getPrevious();
        return !this.editing || previousView.component.name != 'AddonModWikiIndexPage' ||
            previousView.data.module.id != this.module.id || previousView.data.pageId != this.pageId;
    };
    /**
     * In case we're editing an offline page, check if the page loaded in previous view is different than this view.
     *
     * @param title The current page title.
     * @return Whether previous view wiki page is different than current page.
     */
    AddonModWikiEditPage.prototype.previousViewPageIsDifferentOffline = function (title) {
        // We cannot precisely detect when the state is the same but this is close to it.
        var previousView = this.navCtrl.getPrevious();
        if (previousView.component.name != 'AddonModWikiIndexPage' || previousView.data.module.id != this.module.id ||
            previousView.data.wikiId != this.wikiId || previousView.data.pageTitle != title) {
            return true;
        }
        // Check subwiki using subwiki or user and group.
        var previousSubwikiId = parseInt(previousView.data.subwikiId, 10) || 0;
        if (previousSubwikiId > 0 && this.subwikiId > 0) {
            return previousSubwikiId != this.subwikiId;
        }
        var previousUserId = parseInt(previousView.data.userId, 10) || 0, previousGroupId = parseInt(previousView.data.groupId, 10) || 0;
        return this.userId != previousUserId || this.groupId != previousGroupId;
    };
    /**
     * Save the data.
     */
    AddonModWikiEditPage.prototype.save = function () {
        var _this = this;
        var values = this.pageForm.value, title = values.title, modal = this.domUtils.showModalLoading('core.sending', true);
        var promise, text = values.text;
        text = this.textUtils.restorePluginfileUrls(text, this.subwikiFiles);
        text = this.textUtils.formatHtmlLines(text);
        if (this.editing) {
            // Edit existing page.
            promise = this.wikiProvider.editPage(this.pageId, text, this.section).then(function () {
                // Invalidate page since it changed.
                return _this.wikiProvider.invalidatePage(_this.pageId).then(function () {
                    return _this.gotoPage(title);
                });
            });
        }
        else {
            // Creating a new page.
            if (!title) {
                // Title is mandatory, stop.
                this.domUtils.showAlert(this.translate.instant('core.notice'), this.translate.instant('addon.mod_wiki.titleshouldnotbeempty'));
                modal.dismiss();
                return;
            }
            if (!this.editOffline) {
                // Check if the user has an offline page with the same title.
                promise = this.wikiOffline.getNewPage(title, this.subwikiId, this.wikiId, this.userId, this.groupId).then(function () {
                    // There's a page with same name, reject with error message.
                    return Promise.reject(_this.translate.instant('addon.mod_wiki.pageexists'));
                }, function () {
                    // Not found, page can be sent.
                });
            }
            else {
                promise = Promise.resolve();
            }
            promise = promise.then(function () {
                // Try to send the page.
                var wikiId = _this.wikiId || (_this.module && _this.module.instance);
                return _this.wikiProvider.newPage(title, text, _this.subwikiId, wikiId, _this.userId, _this.groupId).then(function (id) {
                    if (id > 0) {
                        // Page was created, get its data and go to the page.
                        _this.pageId = id;
                        return _this.wikiProvider.getPageContents(_this.pageId).then(function (pageContents) {
                            var promises = [];
                            wikiId = parseInt(pageContents.wikiid, 10);
                            if (!_this.subwikiId) {
                                // Subwiki was not created, invalidate subwikis as well.
                                promises.push(_this.wikiProvider.invalidateSubwikis(wikiId));
                            }
                            _this.subwikiId = parseInt(pageContents.subwikiid, 10);
                            _this.userId = parseInt(pageContents.userid, 10);
                            _this.groupId = parseInt(pageContents.groupid, 10);
                            // Invalidate subwiki pages since there are new.
                            promises.push(_this.wikiProvider.invalidateSubwikiPages(wikiId));
                            return Promise.all(promises).then(function () {
                                return _this.gotoPage(title);
                            });
                        }).finally(function () {
                            // Notify page created.
                            _this.eventsProvider.trigger(wiki["a" /* AddonModWikiProvider */].PAGE_CREATED_EVENT, {
                                pageId: _this.pageId,
                                subwikiId: _this.subwikiId,
                                pageTitle: title,
                            }, _this.sitesProvider.getCurrentSiteId());
                        });
                    }
                    else {
                        // Page stored in offline. Go to see the offline page.
                        _this.goToNewOfflinePage(title);
                    }
                });
            });
        }
        return promise.catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'Error saving wiki data.');
        }).finally(function () {
            modal.dismiss();
        });
    };
    /**
     * Renew lock and control versions.
     */
    AddonModWikiEditPage.prototype.renewLock = function () {
        var _this = this;
        this.wikiProvider.getPageForEditing(this.pageId, this.section, true).then(function (response) {
            if (response.version && _this.version != response.version) {
                _this.wrongVersionLock = true;
            }
        });
    };
    /**
     * Fetch module information to redirect when needed.
     *
     * @param wikiId Wiki ID.
     * @return Promise resolved when done.
     */
    AddonModWikiEditPage.prototype.retrieveModuleInfo = function (wikiId) {
        var _this = this;
        if (this.module.id && this.courseId) {
            // We have enough data.
            return Promise.resolve();
        }
        var promise = this.module.id ? Promise.resolve(this.module) :
            this.courseProvider.getModuleBasicInfoByInstance(wikiId, 'wiki');
        return promise.then(function (mod) {
            _this.module = mod;
            _this.componentId = _this.module.id;
            if (!_this.courseId && _this.module.course) {
                _this.courseId = _this.module.course;
            }
            else if (!_this.courseId) {
                return _this.courseHelper.getModuleCourseIdByInstance(wikiId, 'wiki').then(function (course) {
                    _this.courseId = course;
                });
            }
        });
    };
    /**
     * Component being destroyed.
     */
    AddonModWikiEditPage.prototype.ngOnDestroy = function () {
        this.isDestroyed = true;
        clearInterval(this.renewLockInterval);
        // Unblock the subwiki.
        if (this.blockId) {
            this.syncProvider.unblockOperation(this.component, this.blockId);
        }
    };
    AddonModWikiEditPage = __decorate([
        Object(core["m" /* Component */])({
            selector: 'page-addon-mod-wiki-edit',
            templateUrl: 'edit.html',
        }),
        __metadata("design:paramtypes", [ionic_angular["t" /* NavParams */], esm5_forms["d" /* FormBuilder */], ionic_angular["s" /* NavController */], sites["a" /* CoreSitesProvider */],
            sync["a" /* CoreSyncProvider */], dom["a" /* CoreDomUtilsProvider */],
            _ngx_translate_core["c" /* TranslateService */], course["a" /* CoreCourseProvider */],
            events["a" /* CoreEventsProvider */], wiki["a" /* AddonModWikiProvider */],
            wiki_offline["a" /* AddonModWikiOfflineProvider */], wiki_sync["a" /* AddonModWikiSyncProvider */],
            utils_text["a" /* CoreTextUtilsProvider */], helper["a" /* CoreCourseHelperProvider */]])
    ], AddonModWikiEditPage);
    return AddonModWikiEditPage;
}());

//# sourceMappingURL=edit.js.map
// CONCATENATED MODULE: ./src/addon/mod/wiki/pages/edit/edit.module.ts
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
var edit_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var edit_module_AddonModWikiEditPageModule = /** @class */ (function () {
    function AddonModWikiEditPageModule() {
    }
    AddonModWikiEditPageModule = edit_module___decorate([
        Object(core["I" /* NgModule */])({
            declarations: [
                edit_AddonModWikiEditPage,
            ],
            imports: [
                components_module["a" /* CoreComponentsModule */],
                directives_module["a" /* CoreDirectivesModule */],
                ionic_angular["l" /* IonicPageModule */].forChild(edit_AddonModWikiEditPage),
                _ngx_translate_core["b" /* TranslateModule */].forChild()
            ],
        })
    ], AddonModWikiEditPageModule);
    return AddonModWikiEditPageModule;
}());

//# sourceMappingURL=edit.module.js.map
// EXTERNAL MODULE: ./node_modules/ionic-angular/components/action-sheet/action-sheet-component.ngfactory.js
var action_sheet_component_ngfactory = __webpack_require__(1524);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/alert/alert-component.ngfactory.js
var alert_component_ngfactory = __webpack_require__(1525);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/app/app-root.ngfactory.js
var app_root_ngfactory = __webpack_require__(1526);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/loading/loading-component.ngfactory.js
var loading_component_ngfactory = __webpack_require__(1527);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/modal/modal-component.ngfactory.js
var modal_component_ngfactory = __webpack_require__(1528);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/picker/picker-component.ngfactory.js + 1 modules
var picker_component_ngfactory = __webpack_require__(1529);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/popover/popover-component.ngfactory.js
var popover_component_ngfactory = __webpack_require__(1530);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/select/select-popover-component.ngfactory.js
var select_popover_component_ngfactory = __webpack_require__(1531);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toast/toast-component.ngfactory.js
var toast_component_ngfactory = __webpack_require__(1532);

// EXTERNAL MODULE: ./src/components/context-menu/context-menu-popover.ngfactory.js
var context_menu_popover_ngfactory = __webpack_require__(1533);

// EXTERNAL MODULE: ./src/components/course-picker-menu/course-picker-menu-popover.ngfactory.js
var course_picker_menu_popover_ngfactory = __webpack_require__(1534);

// EXTERNAL MODULE: ./src/components/recaptcha/recaptchamodal.ngfactory.js
var recaptchamodal_ngfactory = __webpack_require__(1535);

// EXTERNAL MODULE: ./src/components/bs-tooltip/bs-tooltip.ngfactory.js
var bs_tooltip_ngfactory = __webpack_require__(1536);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item.ngfactory.js + 1 modules
var item_ngfactory = __webpack_require__(30);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item.js
var item = __webpack_require__(20);

// EXTERNAL MODULE: ./node_modules/ionic-angular/util/form.js
var util_form = __webpack_require__(19);

// EXTERNAL MODULE: ./node_modules/ionic-angular/config/config.js
var config = __webpack_require__(8);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-reorder.js + 1 modules
var item_reorder = __webpack_require__(26);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-content.js
var item_content = __webpack_require__(33);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/input/input.ngfactory.js
var input_ngfactory = __webpack_require__(112);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/input/input.js
var input = __webpack_require__(92);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/platform.js + 1 modules
var platform = __webpack_require__(16);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/app/app.js + 3 modules
var app = __webpack_require__(35);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.js
var content_content = __webpack_require__(29);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/dom-controller.js
var dom_controller = __webpack_require__(34);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.pipe.js
var translate_pipe = __webpack_require__(25);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.service.js
var translate_service = __webpack_require__(17);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/badge/badge.js
var badge = __webpack_require__(145);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-header.js
var toolbar_header = __webpack_require__(375);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/view-controller.js
var view_controller = __webpack_require__(39);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/navbar.ngfactory.js
var navbar_ngfactory = __webpack_require__(725);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/navbar.js
var navbar = __webpack_require__(214);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-controller.js
var nav_controller = __webpack_require__(21);

// EXTERNAL MODULE: ./src/directives/back-button.ts
var back_button = __webpack_require__(478);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.ngfactory.js
var toolbar_title_ngfactory = __webpack_require__(726);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.js
var toolbar_title = __webpack_require__(316);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar.js
var toolbar = __webpack_require__(251);

// EXTERNAL MODULE: ./src/directives/format-text.ts
var format_text = __webpack_require__(48);

// EXTERNAL MODULE: ./src/providers/utils/utils.ts
var utils = __webpack_require__(2);

// EXTERNAL MODULE: ./src/providers/utils/url.ts
var url = __webpack_require__(22);

// EXTERNAL MODULE: ./src/providers/logger.ts
var logger = __webpack_require__(6);

// EXTERNAL MODULE: ./src/providers/filepool.ts
var filepool = __webpack_require__(18);

// EXTERNAL MODULE: ./src/providers/app.ts
var providers_app = __webpack_require__(9);

// EXTERNAL MODULE: ./src/core/contentlinks/providers/helper.ts
var providers_helper = __webpack_require__(15);

// EXTERNAL MODULE: ./src/components/split-view/split-view.ts
var split_view = __webpack_require__(27);

// EXTERNAL MODULE: ./src/providers/utils/iframe.ts
var iframe = __webpack_require__(43);

// EXTERNAL MODULE: ./src/core/filter/providers/filter.ts
var filter = __webpack_require__(42);

// EXTERNAL MODULE: ./src/core/filter/providers/helper.ts
var filter_providers_helper = __webpack_require__(31);

// EXTERNAL MODULE: ./src/core/filter/providers/delegate.ts
var delegate = __webpack_require__(36);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-item.js
var toolbar_item = __webpack_require__(376);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.ngfactory.js
var button_ngfactory = __webpack_require__(45);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.js
var button_button = __webpack_require__(41);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.ngfactory.js
var content_ngfactory = __webpack_require__(185);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/keyboard.js
var keyboard = __webpack_require__(109);

// EXTERNAL MODULE: ./src/components/loading/loading.ngfactory.js
var loading_ngfactory = __webpack_require__(54);

// EXTERNAL MODULE: ./src/components/loading/loading.ts
var loading = __webpack_require__(51);

// EXTERNAL MODULE: ./node_modules/@angular/common/esm5/common.js
var common = __webpack_require__(7);

// EXTERNAL MODULE: ./src/components/rich-text-editor/rich-text-editor.ngfactory.js
var rich_text_editor_ngfactory = __webpack_require__(318);

// EXTERNAL MODULE: ./src/components/rich-text-editor/rich-text-editor.ts
var rich_text_editor = __webpack_require__(254);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-params.js
var nav_params = __webpack_require__(70);

// CONCATENATED MODULE: ./src/addon/mod/wiki/pages/edit/edit.ngfactory.js
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 




























































var styles_AddonModWikiEditPage = [];
var RenderType_AddonModWikiEditPage = core["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_AddonModWikiEditPage, data: {} });

function View_AddonModWikiEditPage_1(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 13, "ion-item", [["class", "item-title item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 2, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 3, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 4, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 3, 5, "ion-input", [["name", "title"], ["type", "text"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], null, null, input_ngfactory["b" /* View_TextInput_0 */], input_ngfactory["a" /* RenderType_TextInput */])), core["_30" /* ɵdid */](8, 671744, null, 0, esm5_forms["f" /* FormControlName */], [[3, esm5_forms["b" /* ControlContainer */]], [8, null], [8, null], [8, null]], { name: [0, "name"] }, null), core["_50" /* ɵprd */](2048, null, esm5_forms["m" /* NgControl */], null, [esm5_forms["f" /* FormControlName */]]), core["_30" /* ɵdid */](10, 16384, null, 0, esm5_forms["n" /* NgControlStatus */], [esm5_forms["m" /* NgControl */]], null, null), core["_30" /* ɵdid */](11, 5423104, null, 0, input["a" /* TextInput */], [config["a" /* Config */], platform["a" /* Platform */], util_form["a" /* Form */], app["a" /* App */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, content_content["a" /* Content */]], [2, item["a" /* Item */]], [2, esm5_forms["m" /* NgControl */]], dom_controller["a" /* DomController */]], { type: [0, "type"], placeholder: [1, "placeholder"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "]))], function (_ck, _v) { var currVal_7 = "title"; _ck(_v, 8, 0, currVal_7); var currVal_8 = "text"; var currVal_9 = core["_56" /* ɵunv */](_v, 11, 1, core["_44" /* ɵnov */](_v, 12).transform("addon.mod_wiki.newpagetitle")); _ck(_v, 11, 0, currVal_8, currVal_9); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 10).ngClassUntouched; var currVal_1 = core["_44" /* ɵnov */](_v, 10).ngClassTouched; var currVal_2 = core["_44" /* ɵnov */](_v, 10).ngClassPristine; var currVal_3 = core["_44" /* ɵnov */](_v, 10).ngClassDirty; var currVal_4 = core["_44" /* ɵnov */](_v, 10).ngClassValid; var currVal_5 = core["_44" /* ɵnov */](_v, 10).ngClassInvalid; var currVal_6 = core["_44" /* ɵnov */](_v, 10).ngClassPending; _ck(_v, 7, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6); }); }
function View_AddonModWikiEditPage_2(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 11, "ion-item", [["class", "addon-mod_wiki-wrongversionlock item item-block"], ["text-center", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 8, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 9, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 10, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 2, 3, "ion-badge", [["color", "danger"], ["padding", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](8, 16384, null, 0, badge["a" /* Badge */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { color: [0, "color"] }, null), (_l()(), core["_55" /* ɵted */](9, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "]))], function (_ck, _v) { var currVal_0 = "danger"; _ck(_v, 8, 0, currVal_0); }, function (_ck, _v) { var currVal_1 = core["_56" /* ɵunv */](_v, 9, 0, core["_44" /* ɵnov */](_v, 10).transform("addon.mod_wiki.wrongversionlock")); _ck(_v, 9, 0, currVal_1); }); }
function View_AddonModWikiEditPage_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 23, "ion-header", [], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, toolbar_header["a" /* Header */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, view_controller["a" /* ViewController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 19, "ion-navbar", [["class", "toolbar"], ["core-back-button", ""]], [[8, "hidden", 0], [2, "statusbar-padding", null]], null, null, navbar_ngfactory["b" /* View_Navbar_0 */], navbar_ngfactory["a" /* RenderType_Navbar */])), core["_30" /* ɵdid */](4, 49152, null, 0, navbar["a" /* Navbar */], [app["a" /* App */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_30" /* ɵdid */](5, 212992, null, 0, back_button["a" /* CoreBackButtonDirective */], [navbar["a" /* Navbar */], platform["a" /* Platform */], translate_service["a" /* TranslateService */], events["a" /* CoreEventsProvider */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n        "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 3, 3, "ion-title", [], null, null, null, toolbar_title_ngfactory["b" /* View_ToolbarTitle_0 */], toolbar_title_ngfactory["a" /* RenderType_ToolbarTitle */])), core["_30" /* ɵdid */](8, 49152, null, 0, toolbar_title["a" /* ToolbarTitle */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), (_l()(), core["_31" /* ɵeld */](9, 16777216, null, 0, 1, "core-format-text", [["contextLevel", "module"]], null, null, null, null, null)), core["_30" /* ɵdid */](10, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform["a" /* Platform */], utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], providers_app["a" /* CoreAppProvider */], providers_helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content_content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */], filter["a" /* CoreFilterProvider */], filter_providers_helper["a" /* CoreFilterHelperProvider */], delegate["a" /* CoreFilterDelegate */], core["_11" /* ViewContainerRef */]], { text: [0, "text"], contextLevel: [1, "contextLevel"], contextInstanceId: [2, "contextInstanceId"], courseId: [3, "courseId"] }, null), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n\n        "])), (_l()(), core["_31" /* ɵeld */](12, 0, null, 2, 9, "ion-buttons", [["end", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](13, 16384, null, 1, toolbar_item["a" /* ToolbarItem */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), core["_52" /* ɵqud */](603979776, 1, { _buttons: 1 }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](16, 0, null, null, 4, "button", [["clear", ""], ["ion-button", ""]], [[1, "aria-label", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.save() !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](17, 1097728, [[1, 4]], 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { clear: [0, "clear"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](19, 0, ["\n                ", "\n            "])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_31" /* ɵeld */](25, 0, null, null, 31, "ion-content", [], [[2, "statusbar-padding", null], [2, "has-refresher", null]], null, null, content_ngfactory["b" /* View_Content_0 */], content_ngfactory["a" /* RenderType_Content */])), core["_30" /* ɵdid */](26, 4374528, null, 0, content_content["a" /* Content */], [config["a" /* Config */], platform["a" /* Platform */], dom_controller["a" /* DomController */], core["t" /* ElementRef */], core["V" /* Renderer */], app["a" /* App */], keyboard["a" /* Keyboard */], core["M" /* NgZone */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n    "])), (_l()(), core["_31" /* ɵeld */](28, 0, null, 1, 27, "core-loading", [], null, null, null, loading_ngfactory["b" /* View_CoreLoadingComponent_0 */], loading_ngfactory["a" /* RenderType_CoreLoadingComponent */])), core["_30" /* ɵdid */](29, 638976, null, 0, loading["a" /* CoreLoadingComponent */], [translate_service["a" /* TranslateService */], core["t" /* ElementRef */], events["a" /* CoreEventsProvider */], utils["a" /* CoreUtilsProvider */]], { hideUntil: [0, "hideUntil"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_31" /* ɵeld */](31, 0, null, 0, 23, "form", [["ion-list", ""], ["novalidate", ""]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "submit"], [null, "reset"]], function (_v, en, $event) { var ad = true; if (("submit" === en)) {
        var pd_0 = (core["_44" /* ɵnov */](_v, 33).onSubmit($event) !== false);
        ad = (pd_0 && ad);
    } if (("reset" === en)) {
        var pd_1 = (core["_44" /* ɵnov */](_v, 33).onReset() !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), core["_30" /* ɵdid */](32, 16384, null, 0, esm5_forms["w" /* ɵbf */], [], null, null), core["_30" /* ɵdid */](33, 540672, null, 0, esm5_forms["h" /* FormGroupDirective */], [[8, null], [8, null]], { form: [0, "form"] }, null), core["_50" /* ɵprd */](2048, null, esm5_forms["b" /* ControlContainer */], null, [esm5_forms["h" /* FormGroupDirective */]]), core["_30" /* ɵdid */](35, 16384, null, 0, esm5_forms["o" /* NgControlStatusGroup */], [esm5_forms["b" /* ControlContainer */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModWikiEditPage_1)), core["_30" /* ɵdid */](38, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n            "])), (_l()(), core["_31" /* ɵeld */](40, 0, null, null, 10, "ion-item", [["class", "item item-block"]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](41, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 5, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 6, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 7, { _icons: 1 }), core["_30" /* ɵdid */](45, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](47, 0, null, 3, 2, "core-rich-text-editor", [["item-content", ""], ["name", "wiki_page_content"]], null, null, null, rich_text_editor_ngfactory["b" /* View_CoreRichTextEditorComponent_0 */], rich_text_editor_ngfactory["a" /* RenderType_CoreRichTextEditorComponent */])), core["_30" /* ɵdid */](48, 1228800, null, 0, rich_text_editor["a" /* CoreRichTextEditorComponent */], [dom["a" /* CoreDomUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], sites["a" /* CoreSitesProvider */], filepool["a" /* CoreFilepoolProvider */], [2, content_content["a" /* Content */]], core["t" /* ElementRef */], events["a" /* CoreEventsProvider */], utils["a" /* CoreUtilsProvider */], platform["a" /* Platform */]], { placeholder: [0, "placeholder"], control: [1, "control"], name: [2, "name"], component: [3, "component"], componentId: [4, "componentId"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModWikiEditPage_2)), core["_30" /* ɵdid */](53, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; _ck(_v, 5, 0); var currVal_2 = _co.title; var currVal_3 = "module"; var currVal_4 = _co.module.id; var currVal_5 = _co.courseId; _ck(_v, 10, 0, currVal_2, currVal_3, currVal_4, currVal_5); var currVal_7 = ""; _ck(_v, 17, 0, currVal_7); var currVal_11 = _co.loaded; _ck(_v, 29, 0, currVal_11); var currVal_19 = _co.pageForm; _ck(_v, 33, 0, currVal_19); var currVal_20 = _co.canEditTitle; _ck(_v, 38, 0, currVal_20); var currVal_21 = core["_56" /* ɵunv */](_v, 48, 0, core["_44" /* ɵnov */](_v, 49).transform("core.content")); var currVal_22 = _co.contentControl; var currVal_23 = "wiki_page_content"; var currVal_24 = _co.component; var currVal_25 = _co.componentId; _ck(_v, 48, 0, currVal_21, currVal_22, currVal_23, currVal_24, currVal_25); var currVal_26 = _co.wrongVersionLock; _ck(_v, 53, 0, currVal_26); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 4)._hidden; var currVal_1 = core["_44" /* ɵnov */](_v, 4)._sbPadding; _ck(_v, 3, 0, currVal_0, currVal_1); var currVal_6 = core["_56" /* ɵunv */](_v, 16, 0, core["_44" /* ɵnov */](_v, 18).transform("core.save")); _ck(_v, 16, 0, currVal_6); var currVal_8 = core["_56" /* ɵunv */](_v, 19, 0, core["_44" /* ɵnov */](_v, 20).transform("core.save")); _ck(_v, 19, 0, currVal_8); var currVal_9 = core["_44" /* ɵnov */](_v, 26).statusbarPadding; var currVal_10 = core["_44" /* ɵnov */](_v, 26)._hasRefresher; _ck(_v, 25, 0, currVal_9, currVal_10); var currVal_12 = core["_44" /* ɵnov */](_v, 35).ngClassUntouched; var currVal_13 = core["_44" /* ɵnov */](_v, 35).ngClassTouched; var currVal_14 = core["_44" /* ɵnov */](_v, 35).ngClassPristine; var currVal_15 = core["_44" /* ɵnov */](_v, 35).ngClassDirty; var currVal_16 = core["_44" /* ɵnov */](_v, 35).ngClassValid; var currVal_17 = core["_44" /* ɵnov */](_v, 35).ngClassInvalid; var currVal_18 = core["_44" /* ɵnov */](_v, 35).ngClassPending; _ck(_v, 31, 0, currVal_12, currVal_13, currVal_14, currVal_15, currVal_16, currVal_17, currVal_18); }); }
function View_AddonModWikiEditPage_Host_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "page-addon-mod-wiki-edit", [], null, null, null, View_AddonModWikiEditPage_0, RenderType_AddonModWikiEditPage)), core["_30" /* ɵdid */](1, 245760, null, 0, edit_AddonModWikiEditPage, [nav_params["a" /* NavParams */], esm5_forms["d" /* FormBuilder */], nav_controller["a" /* NavController */], sites["a" /* CoreSitesProvider */], sync["a" /* CoreSyncProvider */], dom["a" /* CoreDomUtilsProvider */], translate_service["a" /* TranslateService */], course["a" /* CoreCourseProvider */], events["a" /* CoreEventsProvider */], wiki["a" /* AddonModWikiProvider */], wiki_offline["a" /* AddonModWikiOfflineProvider */], wiki_sync["a" /* AddonModWikiSyncProvider */], utils_text["a" /* CoreTextUtilsProvider */], helper["a" /* CoreCourseHelperProvider */]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var AddonModWikiEditPageNgFactory = core["_27" /* ɵccf */]("page-addon-mod-wiki-edit", edit_AddonModWikiEditPage, View_AddonModWikiEditPage_Host_0, {}, {}, []);

//# sourceMappingURL=edit.ngfactory.js.map
// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.loader.js
var translate_loader = __webpack_require__(371);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.compiler.js
var translate_compiler = __webpack_require__(372);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.parser.js
var translate_parser = __webpack_require__(374);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/missing-translation-handler.js
var missing_translation_handler = __webpack_require__(373);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.store.js
var translate_store = __webpack_require__(477);

// EXTERNAL MODULE: ./node_modules/ionic-angular/module.js
var ionic_angular_module = __webpack_require__(724);

// EXTERNAL MODULE: ./src/pipes/pipes.module.ts + 2 modules
var pipes_module = __webpack_require__(108);

// EXTERNAL MODULE: ./node_modules/ionic-angular/util/module-loader.js
var module_loader = __webpack_require__(274);

// CONCATENATED MODULE: ./src/addon/mod/wiki/pages/edit/edit.module.ngfactory.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddonModWikiEditPageModuleNgFactory", function() { return AddonModWikiEditPageModuleNgFactory; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 































var AddonModWikiEditPageModuleNgFactory = core["_28" /* ɵcmf */](edit_module_AddonModWikiEditPageModule, [], function (_l) { return core["_40" /* ɵmod */]([core["_41" /* ɵmpd */](512, core["o" /* ComponentFactoryResolver */], core["_21" /* ɵCodegenComponentFactoryResolver */], [[8, [action_sheet_component_ngfactory["a" /* ActionSheetCmpNgFactory */], alert_component_ngfactory["a" /* AlertCmpNgFactory */], app_root_ngfactory["a" /* IonicAppNgFactory */], loading_component_ngfactory["a" /* LoadingCmpNgFactory */], modal_component_ngfactory["a" /* ModalCmpNgFactory */], picker_component_ngfactory["a" /* PickerCmpNgFactory */], popover_component_ngfactory["a" /* PopoverCmpNgFactory */], select_popover_component_ngfactory["a" /* SelectPopoverNgFactory */], toast_component_ngfactory["a" /* ToastCmpNgFactory */], context_menu_popover_ngfactory["a" /* CoreContextMenuPopoverComponentNgFactory */], course_picker_menu_popover_ngfactory["a" /* CoreCoursePickerMenuPopoverComponentNgFactory */], recaptchamodal_ngfactory["a" /* CoreRecaptchaModalComponentNgFactory */], bs_tooltip_ngfactory["a" /* CoreBSTooltipComponentNgFactory */], AddonModWikiEditPageNgFactory]], [3, core["o" /* ComponentFactoryResolver */]], core["K" /* NgModuleRef */]]), core["_41" /* ɵmpd */](4608, common["m" /* NgLocalization */], common["l" /* NgLocaleLocalization */], [core["G" /* LOCALE_ID */], [2, common["w" /* ɵa */]]]), core["_41" /* ɵmpd */](4608, esm5_forms["x" /* ɵi */], esm5_forms["x" /* ɵi */], []), core["_41" /* ɵmpd */](4608, esm5_forms["d" /* FormBuilder */], esm5_forms["d" /* FormBuilder */], []), core["_41" /* ɵmpd */](4608, translate_loader["b" /* TranslateLoader */], translate_loader["a" /* TranslateFakeLoader */], []), core["_41" /* ɵmpd */](4608, translate_compiler["a" /* TranslateCompiler */], translate_compiler["b" /* TranslateFakeCompiler */], []), core["_41" /* ɵmpd */](4608, translate_parser["b" /* TranslateParser */], translate_parser["a" /* TranslateDefaultParser */], []), core["_41" /* ɵmpd */](4608, missing_translation_handler["b" /* MissingTranslationHandler */], missing_translation_handler["a" /* FakeMissingTranslationHandler */], []), core["_41" /* ɵmpd */](4608, translate_service["a" /* TranslateService */], translate_service["a" /* TranslateService */], [translate_store["a" /* TranslateStore */], translate_loader["b" /* TranslateLoader */], translate_compiler["a" /* TranslateCompiler */], translate_parser["b" /* TranslateParser */], missing_translation_handler["b" /* MissingTranslationHandler */], translate_service["b" /* USE_DEFAULT_LANG */], translate_service["c" /* USE_STORE */]]), core["_41" /* ɵmpd */](512, common["b" /* CommonModule */], common["b" /* CommonModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["v" /* ɵba */], esm5_forms["v" /* ɵba */], []), core["_41" /* ɵmpd */](512, esm5_forms["i" /* FormsModule */], esm5_forms["i" /* FormsModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["s" /* ReactiveFormsModule */], esm5_forms["s" /* ReactiveFormsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["a" /* IonicModule */], ionic_angular_module["a" /* IonicModule */], []), core["_41" /* ɵmpd */](512, _ngx_translate_core["b" /* TranslateModule */], _ngx_translate_core["b" /* TranslateModule */], []), core["_41" /* ɵmpd */](512, directives_module["a" /* CoreDirectivesModule */], directives_module["a" /* CoreDirectivesModule */], []), core["_41" /* ɵmpd */](512, pipes_module["a" /* CorePipesModule */], pipes_module["a" /* CorePipesModule */], []), core["_41" /* ɵmpd */](512, components_module["a" /* CoreComponentsModule */], components_module["a" /* CoreComponentsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["b" /* IonicPageModule */], ionic_angular_module["b" /* IonicPageModule */], []), core["_41" /* ɵmpd */](512, edit_module_AddonModWikiEditPageModule, edit_module_AddonModWikiEditPageModule, []), core["_41" /* ɵmpd */](256, translate_service["c" /* USE_STORE */], undefined, []), core["_41" /* ɵmpd */](256, translate_service["b" /* USE_DEFAULT_LANG */], undefined, []), core["_41" /* ɵmpd */](256, module_loader["a" /* LAZY_LOADED_TOKEN */], edit_AddonModWikiEditPage, [])]); });

//# sourceMappingURL=edit.module.ngfactory.js.map

/***/ })

});
//# sourceMappingURL=82.js.map