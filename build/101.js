webpackJsonp([101],{

/***/ 2088:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/@angular/core/esm5/core.js
var core = __webpack_require__(0);

// EXTERNAL MODULE: ./node_modules/ionic-angular/index.js + 3 modules
var ionic_angular = __webpack_require__(6);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/index.js + 1 modules
var _ngx_translate_core = __webpack_require__(3);

// EXTERNAL MODULE: ./src/components/components.module.ts
var components_module = __webpack_require__(29);

// EXTERNAL MODULE: ./src/directives/directives.module.ts + 2 modules
var directives_module = __webpack_require__(31);

// EXTERNAL MODULE: ./node_modules/@angular/forms/esm5/forms.js
var esm5_forms = __webpack_require__(22);

// EXTERNAL MODULE: ./src/providers/events.ts
var events = __webpack_require__(11);

// EXTERNAL MODULE: ./src/providers/groups.ts
var providers_groups = __webpack_require__(67);

// EXTERNAL MODULE: ./src/providers/sites.ts
var sites = __webpack_require__(1);

// EXTERNAL MODULE: ./src/providers/sync.ts
var sync = __webpack_require__(75);

// EXTERNAL MODULE: ./src/providers/utils/dom.ts
var dom = __webpack_require__(4);

// EXTERNAL MODULE: ./src/providers/utils/text.ts
var utils_text = __webpack_require__(10);

// EXTERNAL MODULE: ./src/providers/utils/utils.ts
var utils_utils = __webpack_require__(2);

// EXTERNAL MODULE: ./src/core/fileuploader/providers/fileuploader.ts
var fileuploader = __webpack_require__(68);

// EXTERNAL MODULE: ./src/components/split-view/split-view.ts
var split_view = __webpack_require__(26);

// EXTERNAL MODULE: ./src/components/rich-text-editor/rich-text-editor.ts
var rich_text_editor = __webpack_require__(245);

// EXTERNAL MODULE: ./src/addon/mod/forum/providers/forum.ts
var forum = __webpack_require__(161);

// EXTERNAL MODULE: ./src/addon/mod/forum/providers/offline.ts
var offline = __webpack_require__(227);

// EXTERNAL MODULE: ./src/addon/mod/forum/providers/helper.ts
var helper = __webpack_require__(276);

// EXTERNAL MODULE: ./src/addon/mod/forum/providers/sync.ts
var providers_sync = __webpack_require__(250);

// CONCATENATED MODULE: ./src/addon/mod/forum/pages/new-discussion/new-discussion.ts
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


















/**
 * Page that displays the new discussion form.
 */
var new_discussion_AddonModForumNewDiscussionPage = /** @class */ (function () {
    function AddonModForumNewDiscussionPage(navParams, navCtrl, translate, domUtils, eventsProvider, groupsProvider, sitesProvider, syncProvider, uploaderProvider, textUtils, utils, forumProvider, forumOffline, forumSync, forumHelper, svComponent) {
        this.navCtrl = navCtrl;
        this.translate = translate;
        this.domUtils = domUtils;
        this.eventsProvider = eventsProvider;
        this.groupsProvider = groupsProvider;
        this.sitesProvider = sitesProvider;
        this.syncProvider = syncProvider;
        this.uploaderProvider = uploaderProvider;
        this.textUtils = textUtils;
        this.utils = utils;
        this.forumProvider = forumProvider;
        this.forumOffline = forumOffline;
        this.forumSync = forumSync;
        this.forumHelper = forumHelper;
        this.svComponent = svComponent;
        this.component = forum["a" /* AddonModForumProvider */].COMPONENT;
        this.messageControl = new esm5_forms["e" /* FormControl */]();
        this.groupsLoaded = false;
        this.showGroups = false;
        this.hasOffline = false;
        this.canCreateAttachments = true; // Assume we can by default.
        this.canPin = false;
        this.showForm = false;
        this.groups = [];
        this.groupIds = [];
        this.newDiscussion = {
            subject: '',
            message: null,
            postToAllGroups: false,
            groupId: 0,
            subscribe: true,
            pin: false,
            files: []
        };
        this.advanced = false; // Display all form fields.
        this.accessInfo = {};
        this.isDestroyed = false;
        this.courseId = navParams.get('courseId');
        this.cmId = navParams.get('cmId');
        this.forumId = navParams.get('forumId');
        this.timeCreated = navParams.get('timeCreated');
    }
    /**
     * Component being initialized.
     */
    AddonModForumNewDiscussionPage.prototype.ngOnInit = function () {
        var _this = this;
        this.fetchDiscussionData().finally(function () {
            _this.groupsLoaded = true;
        });
    };
    /**
     * User entered the page that contains the component.
     */
    AddonModForumNewDiscussionPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        // Refresh data if this discussion is synchronized automatically.
        this.syncObserver = this.eventsProvider.on(providers_sync["a" /* AddonModForumSyncProvider */].AUTO_SYNCED, function (data) {
            if (data.forumId == _this.forumId && data.userId == _this.sitesProvider.getCurrentSiteUserId()) {
                _this.domUtils.showAlertTranslated('core.notice', 'core.contenteditingsynced');
                _this.returnToDiscussions();
            }
        }, this.sitesProvider.getCurrentSiteId());
        // Trigger view event, to highlight the current opened discussion in the split view.
        this.eventsProvider.trigger(forum["a" /* AddonModForumProvider */].VIEW_DISCUSSION_EVENT, {
            forumId: this.forumId,
            discussion: -this.timeCreated
        }, this.sitesProvider.getCurrentSiteId());
    };
    /**
     * Fetch if forum uses groups and the groups it uses.
     *
     * @param  {boolean} [refresh] Whether we're refreshing data.
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonModForumNewDiscussionPage.prototype.fetchDiscussionData = function (refresh) {
        var _this = this;
        return this.groupsProvider.getActivityGroupMode(this.cmId).then(function (mode) {
            var promises = [];
            if (mode === providers_groups["a" /* CoreGroupsProvider */].SEPARATEGROUPS || mode === providers_groups["a" /* CoreGroupsProvider */].VISIBLEGROUPS) {
                promises.push(_this.groupsProvider.getActivityAllowedGroups(_this.cmId).then(function (result) {
                    var promise;
                    if (mode === providers_groups["a" /* CoreGroupsProvider */].VISIBLEGROUPS) {
                        // We need to check which of the returned groups the user can post to.
                        promise = _this.validateVisibleGroups(result.groups);
                    }
                    else {
                        // WS already filters groups, no need to do it ourselves. Add "All participants" if needed.
                        promise = _this.addAllParticipantsOption(result.groups, true);
                    }
                    return promise.then(function (forumGroups) {
                        if (forumGroups.length > 0) {
                            _this.groups = forumGroups;
                            _this.groupIds = forumGroups.map(function (group) { return group.id; }).filter(function (id) { return id > 0; });
                            // Do not override group id.
                            _this.newDiscussion.groupId = _this.newDiscussion.groupId || forumGroups[0].id;
                            _this.showGroups = true;
                            if (_this.groupIds.length <= 1) {
                                _this.newDiscussion.postToAllGroups = false;
                            }
                        }
                        else {
                            var message = mode === providers_groups["a" /* CoreGroupsProvider */].SEPARATEGROUPS ?
                                'addon.mod_forum.cannotadddiscussionall' : 'addon.mod_forum.cannotadddiscussion';
                            return Promise.reject(_this.translate.instant(message));
                        }
                    });
                }));
            }
            else {
                _this.showGroups = false;
                _this.newDiscussion.postToAllGroups = false;
                // Use the canAddDiscussion WS to check if the user can add attachments and pin discussions.
                promises.push(_this.forumProvider.canAddDiscussionToAll(_this.forumId).then(function (response) {
                    _this.canPin = !!response.canpindiscussions;
                    _this.canCreateAttachments = !!response.cancreateattachment;
                }).catch(function () {
                    // Ignore errors, use default values.
                }));
            }
            // Get forum.
            promises.push(_this.forumProvider.getForum(_this.courseId, _this.cmId).then(function (forum) {
                _this.forum = forum;
            }));
            // Get access information.
            promises.push(_this.forumProvider.getAccessInformation(_this.forumId).then(function (accessInfo) {
                _this.accessInfo = accessInfo;
            }));
            return Promise.all(promises);
        }).then(function () {
            // If editing a discussion, get offline data.
            if (_this.timeCreated && !refresh) {
                _this.syncId = _this.forumSync.getForumSyncId(_this.forumId);
                return _this.forumSync.waitForSync(_this.syncId).then(function () {
                    // Do not block if the scope is already destroyed.
                    if (!_this.isDestroyed) {
                        _this.syncProvider.blockOperation(forum["a" /* AddonModForumProvider */].COMPONENT, _this.syncId);
                    }
                    return _this.forumOffline.getNewDiscussion(_this.forumId, _this.timeCreated).then(function (discussion) {
                        _this.hasOffline = true;
                        discussion.options = discussion.options || {};
                        if (discussion.groupid == forum["a" /* AddonModForumProvider */].ALL_GROUPS) {
                            _this.newDiscussion.groupId = _this.groups[0].id;
                            _this.newDiscussion.postToAllGroups = true;
                        }
                        else {
                            _this.newDiscussion.groupId = discussion.groupid;
                            _this.newDiscussion.postToAllGroups = false;
                        }
                        _this.newDiscussion.subject = discussion.subject;
                        _this.newDiscussion.message = discussion.message;
                        _this.newDiscussion.subscribe = discussion.options.discussionsubscribe;
                        _this.newDiscussion.pin = discussion.options.discussionpinned;
                        _this.messageControl.setValue(discussion.message);
                        // Treat offline attachments if any.
                        var promise;
                        if (discussion.options.attachmentsid && discussion.options.attachmentsid.offline) {
                            promise = _this.forumHelper.getNewDiscussionStoredFiles(_this.forumId, _this.timeCreated).then(function (files) {
                                _this.newDiscussion.files = files;
                            });
                        }
                        return Promise.resolve(promise).then(function () {
                            // Show advanced fields by default if any of them has not the default value.
                            if (!_this.newDiscussion.subscribe || _this.newDiscussion.pin || _this.newDiscussion.files.length ||
                                _this.groups.length > 0 && _this.newDiscussion.groupId != _this.groups[0].id ||
                                _this.newDiscussion.postToAllGroups) {
                                _this.advanced = true;
                            }
                        });
                    });
                });
            }
        }).then(function () {
            if (!_this.originalData) {
                // Initialize original data.
                _this.originalData = {
                    subject: _this.newDiscussion.subject,
                    message: _this.newDiscussion.message,
                    files: _this.newDiscussion.files.slice(),
                };
            }
            _this.showForm = true;
        }).catch(function (message) {
            _this.domUtils.showErrorModalDefault(message, 'addon.mod_forum.errorgetgroups', true);
            _this.showForm = false;
        });
    };
    /**
     * Validate which of the groups returned by getActivityAllowedGroups in visible groups should be shown to post to.
     *
     * @param  {any[]} forumGroups Forum groups.
     * @return {Promise<any[]>} Promise resolved with the list of groups.
     */
    AddonModForumNewDiscussionPage.prototype.validateVisibleGroups = function (forumGroups) {
        var _this = this;
        // We first check if the user can post to all the groups.
        return this.forumProvider.canAddDiscussionToAll(this.forumId).catch(function () {
            // The call failed, let's assume he can't.
            return {
                status: false,
                canpindiscussions: false,
                cancreateattachment: true
            };
        }).then(function (response) {
            _this.canPin = !!response.canpindiscussions;
            _this.canCreateAttachments = !!response.cancreateattachment;
            if (response.status) {
                // The user can post to all groups, add the "All participants" option and return them all.
                return _this.addAllParticipantsOption(forumGroups, false);
            }
            else {
                // The user can't post to all groups, let's check which groups he can post to.
                var promises_1 = [];
                var filtered_1 = [];
                forumGroups.forEach(function (group) {
                    promises_1.push(_this.forumProvider.canAddDiscussion(_this.forumId, group.id).catch(function () {
                        /* The call failed, let's return true so the group is shown. If the user can't post to
                           it an error will be shown when he tries to add the discussion. */
                        return {
                            status: true
                        };
                    }).then(function (response) {
                        if (response.status) {
                            filtered_1.push(group);
                        }
                    }));
                });
                return Promise.all(promises_1).then(function () {
                    return filtered_1;
                });
            }
        });
    };
    /**
     * Filter forum groups, returning only those that are inside user groups.
     *
     * @param  {any[]} forumGroups Forum groups.
     * @param  {any[]} userGroups User groups.
     * @return {any[]} Filtered groups.
     */
    AddonModForumNewDiscussionPage.prototype.filterGroups = function (forumGroups, userGroups) {
        var filtered = [];
        var userGroupsIds = userGroups.map(function (g) { return g.id; });
        forumGroups.forEach(function (fg) {
            if (userGroupsIds.indexOf(fg.id) > -1) {
                filtered.push(fg);
            }
        });
        return filtered;
    };
    /**
     * Add the "All participants" option to a list of groups if the user can add a discussion to all participants.
     *
     * @param  {any[]}   groups Groups.
     * @param  {boolean} check  True to check if the user can add a discussion to all participants.
     * @return {Promise<any[]>} Promise resolved with the list of groups.
     */
    AddonModForumNewDiscussionPage.prototype.addAllParticipantsOption = function (groups, check) {
        var _this = this;
        if (!this.forumProvider.isAllParticipantsFixed()) {
            // All participants has a bug, don't add it.
            return Promise.resolve(groups);
        }
        var promise;
        if (check) {
            // We need to check if the user can add a discussion to all participants.
            promise = this.forumProvider.canAddDiscussionToAll(this.forumId).then(function (response) {
                _this.canPin = !!response.canpindiscussions;
                _this.canCreateAttachments = !!response.cancreateattachment;
                return response.status;
            }).catch(function () {
                // The call failed, let's assume he can't.
                return false;
            });
        }
        else {
            // No need to check, assume the user can.
            promise = Promise.resolve(true);
        }
        return promise.then(function (canAdd) {
            if (canAdd) {
                groups.unshift({
                    courseid: _this.courseId,
                    id: forum["a" /* AddonModForumProvider */].ALL_PARTICIPANTS,
                    name: _this.translate.instant('core.allparticipants')
                });
            }
            return groups;
        });
    };
    /**
     * Pull to refresh.
     *
     * @param {any} refresher Refresher.
     */
    AddonModForumNewDiscussionPage.prototype.refreshGroups = function (refresher) {
        var _this = this;
        var promises = [
            this.groupsProvider.invalidateActivityGroupMode(this.cmId),
            this.groupsProvider.invalidateActivityAllowedGroups(this.cmId),
            this.forumProvider.invalidateCanAddDiscussion(this.forumId),
        ];
        Promise.all(promises).finally(function () {
            _this.fetchDiscussionData(true).finally(function () {
                refresher.complete();
            });
        });
    };
    /**
     * Convenience function to update or return to discussions depending on device.
     *
     * @param {number} [discussionIds] Ids of the new discussions.
     * @param {number} [discTimecreated] The time created of the discussion (if offline).
     */
    AddonModForumNewDiscussionPage.prototype.returnToDiscussions = function (discussionIds, discTimecreated) {
        var data = {
            forumId: this.forumId,
            cmId: this.cmId,
            discussionIds: discussionIds,
            discTimecreated: discTimecreated
        };
        this.eventsProvider.trigger(forum["a" /* AddonModForumProvider */].NEW_DISCUSSION_EVENT, data, this.sitesProvider.getCurrentSiteId());
        // Delete the local files from the tmp folder.
        this.uploaderProvider.clearTmpFiles(this.newDiscussion.files);
        if (this.svComponent && this.svComponent.isOn()) {
            // Empty form.
            this.hasOffline = false;
            this.newDiscussion.subject = '';
            this.newDiscussion.message = null;
            this.newDiscussion.files = [];
            this.newDiscussion.postToAllGroups = false;
            this.messageEditor.clearText();
            this.originalData = this.utils.clone(this.newDiscussion);
            // Trigger view event, to highlight the current opened discussion in the split view.
            this.eventsProvider.trigger(forum["a" /* AddonModForumProvider */].VIEW_DISCUSSION_EVENT, {
                forumId: this.forumId,
                discussion: 0
            }, this.sitesProvider.getCurrentSiteId());
        }
        else {
            this.originalData = null; // Avoid asking for confirmation.
            this.navCtrl.pop();
        }
    };
    /**
     * Message changed.
     *
     * @param {string} text The new text.
     */
    AddonModForumNewDiscussionPage.prototype.onMessageChange = function (text) {
        this.newDiscussion.message = text;
    };
    /**
     * Add a new discussion.
     */
    AddonModForumNewDiscussionPage.prototype.add = function () {
        var _this = this;
        var forumName = this.forum.name;
        var subject = this.newDiscussion.subject;
        var message = this.newDiscussion.message;
        var pin = this.newDiscussion.pin;
        var attachments = this.newDiscussion.files;
        var discTimecreated = this.timeCreated || Date.now();
        var options = {
            discussionsubscribe: !!this.newDiscussion.subscribe
        };
        if (!subject) {
            this.domUtils.showErrorModal('addon.mod_forum.erroremptysubject', true);
            return;
        }
        if (!message) {
            this.domUtils.showErrorModal('addon.mod_forum.erroremptymessage', true);
            return;
        }
        var modal = this.domUtils.showModalLoading('core.sending', true);
        // Add some HTML to the message if needed.
        message = this.textUtils.formatHtmlLines(message);
        if (pin) {
            options.discussionpinned = true;
        }
        var groupIds = this.newDiscussion.postToAllGroups ? this.groupIds : [this.newDiscussion.groupId];
        this.forumHelper.addNewDiscussion(this.forumId, forumName, this.courseId, subject, message, attachments, options, groupIds, discTimecreated).then(function (discussionIds) {
            if (discussionIds) {
                // Data sent to server, delete stored files (if any).
                _this.forumHelper.deleteNewDiscussionStoredFiles(_this.forumId, discTimecreated);
            }
            if (discussionIds && discussionIds.length < groupIds.length) {
                // Some discussions could not be created.
                _this.domUtils.showErrorModalDefault(null, 'addon.mod_forum.errorposttoallgroups', true);
            }
            _this.returnToDiscussions(discussionIds, discTimecreated);
        }).catch(function (message) {
            _this.domUtils.showErrorModalDefault(message, 'addon.mod_forum.cannotcreatediscussion', true);
        }).finally(function () {
            modal.dismiss();
        });
    };
    /**
     * Discard an offline saved discussion.
     */
    AddonModForumNewDiscussionPage.prototype.discard = function () {
        var _this = this;
        this.domUtils.showConfirm(this.translate.instant('core.areyousure')).then(function () {
            var promises = [];
            promises.push(_this.forumOffline.deleteNewDiscussion(_this.forumId, _this.timeCreated));
            promises.push(_this.forumHelper.deleteNewDiscussionStoredFiles(_this.forumId, _this.timeCreated).catch(function () {
                // Ignore errors, maybe there are no files.
            }));
            return Promise.all(promises).then(function () {
                _this.returnToDiscussions();
            });
        }).catch(function () {
            // Cancelled.
        });
    };
    /**
     * Show or hide advanced form fields.
     */
    AddonModForumNewDiscussionPage.prototype.toggleAdvanced = function () {
        this.advanced = !this.advanced;
    };
    /**
     * Check if we can leave the page or not.
     *
     * @return {boolean|Promise<void>} Resolved if we can leave it, rejected if not.
     */
    AddonModForumNewDiscussionPage.prototype.ionViewCanLeave = function () {
        var _this = this;
        var promise;
        if (this.forumHelper.hasPostDataChanged(this.newDiscussion, this.originalData)) {
            // Show confirmation if some data has been modified.
            promise = this.domUtils.showConfirm(this.translate.instant('core.confirmcanceledit'));
        }
        else {
            promise = Promise.resolve();
        }
        return promise.then(function () {
            // Delete the local files from the tmp folder.
            _this.uploaderProvider.clearTmpFiles(_this.newDiscussion.files);
        });
    };
    /**
     * Runs when the page is about to leave and no longer be the active page.
     */
    AddonModForumNewDiscussionPage.prototype.ionViewWillLeave = function () {
        this.syncObserver && this.syncObserver.off();
    };
    /**
     * Page destroyed.
     */
    AddonModForumNewDiscussionPage.prototype.ngOnDestroy = function () {
        if (this.syncId) {
            this.syncProvider.unblockOperation(forum["a" /* AddonModForumProvider */].COMPONENT, this.syncId);
        }
        this.isDestroyed = true;
    };
    __decorate([
        Object(core["_9" /* ViewChild */])(rich_text_editor["a" /* CoreRichTextEditorComponent */]),
        __metadata("design:type", rich_text_editor["a" /* CoreRichTextEditorComponent */])
    ], AddonModForumNewDiscussionPage.prototype, "messageEditor", void 0);
    AddonModForumNewDiscussionPage = __decorate([
        Object(core["m" /* Component */])({
            selector: 'page-addon-mod-forum-new-discussion',
            templateUrl: 'new-discussion.html',
        }),
        __param(15, Object(core["N" /* Optional */])()),
        __metadata("design:paramtypes", [ionic_angular["t" /* NavParams */],
            ionic_angular["s" /* NavController */],
            _ngx_translate_core["c" /* TranslateService */],
            dom["a" /* CoreDomUtilsProvider */],
            events["a" /* CoreEventsProvider */],
            providers_groups["a" /* CoreGroupsProvider */],
            sites["a" /* CoreSitesProvider */],
            sync["a" /* CoreSyncProvider */],
            fileuploader["a" /* CoreFileUploaderProvider */],
            utils_text["a" /* CoreTextUtilsProvider */],
            utils_utils["a" /* CoreUtilsProvider */],
            forum["a" /* AddonModForumProvider */],
            offline["a" /* AddonModForumOfflineProvider */],
            providers_sync["a" /* AddonModForumSyncProvider */],
            helper["a" /* AddonModForumHelperProvider */],
            split_view["a" /* CoreSplitViewComponent */]])
    ], AddonModForumNewDiscussionPage);
    return AddonModForumNewDiscussionPage;
}());

//# sourceMappingURL=new-discussion.js.map
// CONCATENATED MODULE: ./src/addon/mod/forum/pages/new-discussion/new-discussion.module.ts
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
var new_discussion_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var new_discussion_module_AddonModForumNewDiscussionPageModule = /** @class */ (function () {
    function AddonModForumNewDiscussionPageModule() {
    }
    AddonModForumNewDiscussionPageModule = new_discussion_module___decorate([
        Object(core["I" /* NgModule */])({
            declarations: [
                new_discussion_AddonModForumNewDiscussionPage,
            ],
            imports: [
                components_module["a" /* CoreComponentsModule */],
                directives_module["a" /* CoreDirectivesModule */],
                ionic_angular["l" /* IonicPageModule */].forChild(new_discussion_AddonModForumNewDiscussionPage),
                _ngx_translate_core["b" /* TranslateModule */].forChild()
            ],
        })
    ], AddonModForumNewDiscussionPageModule);
    return AddonModForumNewDiscussionPageModule;
}());

//# sourceMappingURL=new-discussion.module.js.map
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

// EXTERNAL MODULE: ./src/components/icon/icon.ngfactory.js
var icon_ngfactory = __webpack_require__(111);

// EXTERNAL MODULE: ./src/components/icon/icon.ts
var icon = __webpack_require__(94);

// EXTERNAL MODULE: ./node_modules/ionic-angular/config/config.js
var config = __webpack_require__(7);

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

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/label/label.js
var label = __webpack_require__(63);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.pipe.js
var translate_pipe = __webpack_require__(28);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.service.js
var translate_service = __webpack_require__(18);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toggle/toggle.ngfactory.js
var toggle_ngfactory = __webpack_require__(1488);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toggle/toggle.js + 1 modules
var toggle = __webpack_require__(366);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/platform.js + 1 modules
var platform = __webpack_require__(16);

// EXTERNAL MODULE: ./node_modules/ionic-angular/tap-click/haptic.js
var haptic = __webpack_require__(194);

// EXTERNAL MODULE: ./node_modules/ionic-angular/gestures/gesture-controller.js
var gesture_controller = __webpack_require__(40);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/dom-controller.js
var dom_controller = __webpack_require__(33);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/option/option.js
var option_option = __webpack_require__(102);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/select/select.ngfactory.js
var select_ngfactory = __webpack_require__(120);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/select/select.js
var select_select = __webpack_require__(103);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/app/app.js + 3 modules
var app = __webpack_require__(34);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/deep-linker.js
var deep_linker = __webpack_require__(55);

// EXTERNAL MODULE: ./node_modules/@angular/common/esm5/common.js
var common = __webpack_require__(8);

// EXTERNAL MODULE: ./src/components/attachments/attachments.ngfactory.js
var attachments_ngfactory = __webpack_require__(481);

// EXTERNAL MODULE: ./src/components/attachments/attachments.ts
var attachments = __webpack_require__(311);

// EXTERNAL MODULE: ./src/providers/app.ts
var providers_app = __webpack_require__(9);

// EXTERNAL MODULE: ./src/core/fileuploader/providers/helper.ts
var providers_helper = __webpack_require__(141);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/grid/col.js
var col = __webpack_require__(118);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.ngfactory.js
var button_ngfactory = __webpack_require__(45);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.js
var button_button = __webpack_require__(42);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/list/list.js + 1 modules
var list = __webpack_require__(82);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/input/input.ngfactory.js
var input_ngfactory = __webpack_require__(104);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/input/input.js
var input = __webpack_require__(84);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.js
var content = __webpack_require__(25);

// EXTERNAL MODULE: ./src/components/rich-text-editor/rich-text-editor.ngfactory.js
var rich_text_editor_ngfactory = __webpack_require__(307);

// EXTERNAL MODULE: ./src/providers/utils/url.ts
var url = __webpack_require__(23);

// EXTERNAL MODULE: ./src/providers/filepool.ts
var filepool = __webpack_require__(17);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-divider.js
var item_divider = __webpack_require__(93);

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

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-controller.js
var nav_controller = __webpack_require__(19);

// EXTERNAL MODULE: ./src/directives/back-button.ts
var back_button = __webpack_require__(711);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.ngfactory.js
var toolbar_title_ngfactory = __webpack_require__(1478);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.js
var toolbar_title = __webpack_require__(364);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar.js
var toolbar = __webpack_require__(267);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-item.js
var toolbar_item = __webpack_require__(469);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.ngfactory.js
var content_ngfactory = __webpack_require__(176);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/keyboard.js
var keyboard = __webpack_require__(101);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/refresher/refresher.js
var refresher = __webpack_require__(151);

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

// CONCATENATED MODULE: ./src/addon/mod/forum/pages/new-discussion/new-discussion.ngfactory.js
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 










































































var styles_AddonModForumNewDiscussionPage = [];
var RenderType_AddonModForumNewDiscussionPage = core["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_AddonModForumNewDiscussionPage, data: {} });

function View_AddonModForumNewDiscussionPage_2(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "core-icon", [["item-start", ""], ["name", "fa-caret-right"]], null, null, null, icon_ngfactory["b" /* View_CoreIconComponent_0 */], icon_ngfactory["a" /* RenderType_CoreIconComponent */])), core["_30" /* ɵdid */](1, 704512, null, 0, icon["a" /* CoreIconComponent */], [core["t" /* ElementRef */], config["a" /* Config */]], { name: [0, "name"] }, null)], function (_ck, _v) { var currVal_0 = "fa-caret-right"; _ck(_v, 1, 0, currVal_0); }, null); }
function View_AddonModForumNewDiscussionPage_3(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "core-icon", [["item-start", ""], ["name", "fa-caret-down"]], null, null, null, icon_ngfactory["b" /* View_CoreIconComponent_0 */], icon_ngfactory["a" /* RenderType_CoreIconComponent */])), core["_30" /* ɵdid */](1, 704512, null, 0, icon["a" /* CoreIconComponent */], [core["t" /* ElementRef */], config["a" /* Config */]], { name: [0, "name"] }, null)], function (_ck, _v) { var currVal_0 = "fa-caret-down"; _ck(_v, 1, 0, currVal_0); }, null); }
function View_AddonModForumNewDiscussionPage_5(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 18, "ion-item", [["class", "item item-block"]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 12, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 13, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 14, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 1, 3, "ion-label", [], null, null, null, null, null)), core["_30" /* ɵdid */](8, 16384, [[12, 4]], 0, label["a" /* Label */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, null], [8, null], [8, null]], null, null), (_l()(), core["_55" /* ɵted */](9, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](12, 0, null, 4, 5, "ion-toggle", [], [[2, "toggle-disabled", null], [2, "toggle-checked", null], [2, "toggle-activated", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "keyup"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("keyup" === en)) {
        var pd_0 = (core["_44" /* ɵnov */](_v, 13)._keyup($event) !== false);
        ad = (pd_0 && ad);
    } if (("ngModelChange" === en)) {
        var pd_1 = ((_co.newDiscussion.postToAllGroups = $event) !== false);
        ad = (pd_1 && ad);
    } return ad; }, toggle_ngfactory["b" /* View_Toggle_0 */], toggle_ngfactory["a" /* RenderType_Toggle */])), core["_30" /* ɵdid */](13, 1228800, null, 0, toggle["a" /* Toggle */], [util_form["a" /* Form */], config["a" /* Config */], platform["a" /* Platform */], core["t" /* ElementRef */], core["V" /* Renderer */], haptic["a" /* Haptic */], [2, item["a" /* Item */]], gesture_controller["l" /* GestureController */], dom_controller["a" /* DomController */], core["M" /* NgZone */]], null, null), core["_50" /* ɵprd */](1024, null, esm5_forms["l" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [toggle["a" /* Toggle */]]), core["_30" /* ɵdid */](15, 671744, null, 0, esm5_forms["q" /* NgModel */], [[8, null], [8, null], [8, null], [2, esm5_forms["l" /* NG_VALUE_ACCESSOR */]]], { model: [0, "model"] }, { update: "ngModelChange" }), core["_50" /* ɵprd */](2048, null, esm5_forms["m" /* NgControl */], null, [esm5_forms["q" /* NgModel */]]), core["_30" /* ɵdid */](17, 16384, null, 0, esm5_forms["n" /* NgControlStatus */], [esm5_forms["m" /* NgControl */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "]))], function (_ck, _v) { var _co = _v.component; var currVal_11 = _co.newDiscussion.postToAllGroups; _ck(_v, 15, 0, currVal_11); }, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 9, 0, core["_44" /* ɵnov */](_v, 10).transform("addon.mod_forum.posttomygroups")); _ck(_v, 9, 0, currVal_0); var currVal_1 = core["_44" /* ɵnov */](_v, 13)._disabled; var currVal_2 = core["_44" /* ɵnov */](_v, 13)._value; var currVal_3 = core["_44" /* ɵnov */](_v, 13)._activated; var currVal_4 = core["_44" /* ɵnov */](_v, 17).ngClassUntouched; var currVal_5 = core["_44" /* ɵnov */](_v, 17).ngClassTouched; var currVal_6 = core["_44" /* ɵnov */](_v, 17).ngClassPristine; var currVal_7 = core["_44" /* ɵnov */](_v, 17).ngClassDirty; var currVal_8 = core["_44" /* ɵnov */](_v, 17).ngClassValid; var currVal_9 = core["_44" /* ɵnov */](_v, 17).ngClassInvalid; var currVal_10 = core["_44" /* ɵnov */](_v, 17).ngClassPending; _ck(_v, 12, 0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8, currVal_9, currVal_10); }); }
function View_AddonModForumNewDiscussionPage_7(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "ion-option", [], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, [[18, 4]], 0, option_option["a" /* Option */], [core["t" /* ElementRef */]], { value: [0, "value"] }, null), (_l()(), core["_55" /* ɵted */](2, null, ["", ""]))], function (_ck, _v) { var currVal_0 = _v.context.$implicit.id; _ck(_v, 1, 0, currVal_0); }, function (_ck, _v) { var currVal_1 = _v.context.$implicit.name; _ck(_v, 2, 0, currVal_1); }); }
function View_AddonModForumNewDiscussionPage_6(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 23, "ion-item", [["class", "item item-block"]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 15, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 16, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 17, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 1, 3, "ion-label", [["id", "addon-mod-forum-groupslabel"]], null, null, null, null, null)), core["_30" /* ɵdid */](8, 16384, [[15, 4]], 0, label["a" /* Label */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, null], [8, null], [8, null]], { id: [0, "id"] }, null), (_l()(), core["_55" /* ɵted */](9, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](12, 0, null, 3, 10, "ion-select", [["aria-labelledby", "addon-mod-forum-groupslabel"], ["interface", "action-sheet"]], [[2, "select-disabled", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "click"], [null, "keyup.space"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (core["_44" /* ɵnov */](_v, 13)._click($event) !== false);
        ad = (pd_0 && ad);
    } if (("keyup.space" === en)) {
        var pd_1 = (core["_44" /* ɵnov */](_v, 13)._keyup() !== false);
        ad = (pd_1 && ad);
    } if (("ngModelChange" === en)) {
        var pd_2 = ((_co.newDiscussion.groupId = $event) !== false);
        ad = (pd_2 && ad);
    } return ad; }, select_ngfactory["b" /* View_Select_0 */], select_ngfactory["a" /* RenderType_Select */])), core["_30" /* ɵdid */](13, 1228800, null, 1, select_select["a" /* Select */], [app["a" /* App */], util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item["a" /* Item */]], deep_linker["a" /* DeepLinker */]], { disabled: [0, "disabled"], interface: [1, "interface"] }, null), core["_52" /* ɵqud */](603979776, 18, { options: 1 }), core["_50" /* ɵprd */](1024, null, esm5_forms["l" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [select_select["a" /* Select */]]), core["_30" /* ɵdid */](16, 671744, null, 0, esm5_forms["q" /* NgModel */], [[8, null], [8, null], [8, null], [2, esm5_forms["l" /* NG_VALUE_ACCESSOR */]]], { isDisabled: [0, "isDisabled"], model: [1, "model"] }, { update: "ngModelChange" }), core["_50" /* ɵprd */](2048, null, esm5_forms["m" /* NgControl */], null, [esm5_forms["q" /* NgModel */]]), core["_30" /* ɵdid */](18, 16384, null, 0, esm5_forms["n" /* NgControlStatus */], [esm5_forms["m" /* NgControl */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModForumNewDiscussionPage_7)), core["_30" /* ɵdid */](21, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = "addon-mod-forum-groupslabel"; _ck(_v, 8, 0, currVal_0); var currVal_10 = _co.newDiscussion.postToAllGroups; var currVal_11 = "action-sheet"; _ck(_v, 13, 0, currVal_10, currVal_11); var currVal_12 = _co.newDiscussion.postToAllGroups; var currVal_13 = _co.newDiscussion.groupId; _ck(_v, 16, 0, currVal_12, currVal_13); var currVal_14 = _co.groups; _ck(_v, 21, 0, currVal_14); }, function (_ck, _v) { var currVal_1 = core["_56" /* ɵunv */](_v, 9, 0, core["_44" /* ɵnov */](_v, 10).transform("addon.mod_forum.group")); _ck(_v, 9, 0, currVal_1); var currVal_2 = core["_44" /* ɵnov */](_v, 13)._disabled; var currVal_3 = core["_44" /* ɵnov */](_v, 18).ngClassUntouched; var currVal_4 = core["_44" /* ɵnov */](_v, 18).ngClassTouched; var currVal_5 = core["_44" /* ɵnov */](_v, 18).ngClassPristine; var currVal_6 = core["_44" /* ɵnov */](_v, 18).ngClassDirty; var currVal_7 = core["_44" /* ɵnov */](_v, 18).ngClassValid; var currVal_8 = core["_44" /* ɵnov */](_v, 18).ngClassInvalid; var currVal_9 = core["_44" /* ɵnov */](_v, 18).ngClassPending; _ck(_v, 12, 0, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8, currVal_9); }); }
function View_AddonModForumNewDiscussionPage_8(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 18, "ion-item", [["class", "item item-block"]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 22, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 23, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 24, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 1, 3, "ion-label", [], null, null, null, null, null)), core["_30" /* ɵdid */](8, 16384, [[22, 4]], 0, label["a" /* Label */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, null], [8, null], [8, null]], null, null), (_l()(), core["_55" /* ɵted */](9, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](12, 0, null, 4, 5, "ion-toggle", [], [[2, "toggle-disabled", null], [2, "toggle-checked", null], [2, "toggle-activated", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "keyup"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("keyup" === en)) {
        var pd_0 = (core["_44" /* ɵnov */](_v, 13)._keyup($event) !== false);
        ad = (pd_0 && ad);
    } if (("ngModelChange" === en)) {
        var pd_1 = ((_co.newDiscussion.pin = $event) !== false);
        ad = (pd_1 && ad);
    } return ad; }, toggle_ngfactory["b" /* View_Toggle_0 */], toggle_ngfactory["a" /* RenderType_Toggle */])), core["_30" /* ɵdid */](13, 1228800, null, 0, toggle["a" /* Toggle */], [util_form["a" /* Form */], config["a" /* Config */], platform["a" /* Platform */], core["t" /* ElementRef */], core["V" /* Renderer */], haptic["a" /* Haptic */], [2, item["a" /* Item */]], gesture_controller["l" /* GestureController */], dom_controller["a" /* DomController */], core["M" /* NgZone */]], null, null), core["_50" /* ɵprd */](1024, null, esm5_forms["l" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [toggle["a" /* Toggle */]]), core["_30" /* ɵdid */](15, 671744, null, 0, esm5_forms["q" /* NgModel */], [[8, null], [8, null], [8, null], [2, esm5_forms["l" /* NG_VALUE_ACCESSOR */]]], { model: [0, "model"] }, { update: "ngModelChange" }), core["_50" /* ɵprd */](2048, null, esm5_forms["m" /* NgControl */], null, [esm5_forms["q" /* NgModel */]]), core["_30" /* ɵdid */](17, 16384, null, 0, esm5_forms["n" /* NgControlStatus */], [esm5_forms["m" /* NgControl */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "]))], function (_ck, _v) { var _co = _v.component; var currVal_11 = _co.newDiscussion.pin; _ck(_v, 15, 0, currVal_11); }, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 9, 0, core["_44" /* ɵnov */](_v, 10).transform("addon.mod_forum.discussionpinned")); _ck(_v, 9, 0, currVal_0); var currVal_1 = core["_44" /* ɵnov */](_v, 13)._disabled; var currVal_2 = core["_44" /* ɵnov */](_v, 13)._value; var currVal_3 = core["_44" /* ɵnov */](_v, 13)._activated; var currVal_4 = core["_44" /* ɵnov */](_v, 17).ngClassUntouched; var currVal_5 = core["_44" /* ɵnov */](_v, 17).ngClassTouched; var currVal_6 = core["_44" /* ɵnov */](_v, 17).ngClassPristine; var currVal_7 = core["_44" /* ɵnov */](_v, 17).ngClassDirty; var currVal_8 = core["_44" /* ɵnov */](_v, 17).ngClassValid; var currVal_9 = core["_44" /* ɵnov */](_v, 17).ngClassInvalid; var currVal_10 = core["_44" /* ɵnov */](_v, 17).ngClassPending; _ck(_v, 12, 0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8, currVal_9, currVal_10); }); }
function View_AddonModForumNewDiscussionPage_9(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "core-attachments", [], null, null, null, attachments_ngfactory["b" /* View_CoreAttachmentsComponent_0 */], attachments_ngfactory["a" /* RenderType_CoreAttachmentsComponent */])), core["_30" /* ɵdid */](1, 114688, null, 0, attachments["a" /* CoreAttachmentsComponent */], [providers_app["a" /* CoreAppProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], fileuploader["a" /* CoreFileUploaderProvider */], translate_service["a" /* TranslateService */], providers_helper["a" /* CoreFileUploaderHelperProvider */]], { files: [0, "files"], maxSize: [1, "maxSize"], maxSubmissions: [2, "maxSubmissions"], component: [3, "component"], componentId: [4, "componentId"], allowOffline: [5, "allowOffline"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.newDiscussion.files; var currVal_1 = _co.forum.maxbytes; var currVal_2 = _co.forum.maxattachments; var currVal_3 = _co.component; var currVal_4 = _co.forum.cmid; var currVal_5 = true; _ck(_v, 1, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5); }, null); }
function View_AddonModForumNewDiscussionPage_4(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 33, null, null, null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModForumNewDiscussionPage_5)), core["_30" /* ɵdid */](3, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModForumNewDiscussionPage_6)), core["_30" /* ɵdid */](6, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ɵeld */](8, 0, null, null, 18, "ion-item", [["class", "item item-block"]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](9, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 19, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 20, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 21, { _icons: 1 }), core["_30" /* ɵdid */](13, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](15, 0, null, 1, 3, "ion-label", [], null, null, null, null, null)), core["_30" /* ɵdid */](16, 16384, [[19, 4]], 0, label["a" /* Label */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, null], [8, null], [8, null]], null, null), (_l()(), core["_55" /* ɵted */](17, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](20, 0, null, 4, 5, "ion-toggle", [], [[2, "toggle-disabled", null], [2, "toggle-checked", null], [2, "toggle-activated", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "keyup"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("keyup" === en)) {
        var pd_0 = (core["_44" /* ɵnov */](_v, 21)._keyup($event) !== false);
        ad = (pd_0 && ad);
    } if (("ngModelChange" === en)) {
        var pd_1 = ((_co.newDiscussion.subscribe = $event) !== false);
        ad = (pd_1 && ad);
    } return ad; }, toggle_ngfactory["b" /* View_Toggle_0 */], toggle_ngfactory["a" /* RenderType_Toggle */])), core["_30" /* ɵdid */](21, 1228800, null, 0, toggle["a" /* Toggle */], [util_form["a" /* Form */], config["a" /* Config */], platform["a" /* Platform */], core["t" /* ElementRef */], core["V" /* Renderer */], haptic["a" /* Haptic */], [2, item["a" /* Item */]], gesture_controller["l" /* GestureController */], dom_controller["a" /* DomController */], core["M" /* NgZone */]], null, null), core["_50" /* ɵprd */](1024, null, esm5_forms["l" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [toggle["a" /* Toggle */]]), core["_30" /* ɵdid */](23, 671744, null, 0, esm5_forms["q" /* NgModel */], [[8, null], [8, null], [8, null], [2, esm5_forms["l" /* NG_VALUE_ACCESSOR */]]], { model: [0, "model"] }, { update: "ngModelChange" }), core["_50" /* ɵprd */](2048, null, esm5_forms["m" /* NgControl */], null, [esm5_forms["q" /* NgModel */]]), core["_30" /* ɵdid */](25, 16384, null, 0, esm5_forms["n" /* NgControlStatus */], [esm5_forms["m" /* NgControl */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModForumNewDiscussionPage_8)), core["_30" /* ɵdid */](29, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModForumNewDiscussionPage_9)), core["_30" /* ɵdid */](32, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = ((_co.showGroups && (_co.groupIds.length > 1)) && _co.accessInfo.cancanposttomygroups); _ck(_v, 3, 0, currVal_0); var currVal_1 = _co.showGroups; _ck(_v, 6, 0, currVal_1); var currVal_13 = _co.newDiscussion.subscribe; _ck(_v, 23, 0, currVal_13); var currVal_14 = _co.canPin; _ck(_v, 29, 0, currVal_14); var currVal_15 = ((_co.canCreateAttachments && _co.forum) && (_co.forum.maxattachments > 0)); _ck(_v, 32, 0, currVal_15); }, function (_ck, _v) { var currVal_2 = core["_56" /* ɵunv */](_v, 17, 0, core["_44" /* ɵnov */](_v, 18).transform("addon.mod_forum.discussionsubscription")); _ck(_v, 17, 0, currVal_2); var currVal_3 = core["_44" /* ɵnov */](_v, 21)._disabled; var currVal_4 = core["_44" /* ɵnov */](_v, 21)._value; var currVal_5 = core["_44" /* ɵnov */](_v, 21)._activated; var currVal_6 = core["_44" /* ɵnov */](_v, 25).ngClassUntouched; var currVal_7 = core["_44" /* ɵnov */](_v, 25).ngClassTouched; var currVal_8 = core["_44" /* ɵnov */](_v, 25).ngClassPristine; var currVal_9 = core["_44" /* ɵnov */](_v, 25).ngClassDirty; var currVal_10 = core["_44" /* ɵnov */](_v, 25).ngClassValid; var currVal_11 = core["_44" /* ɵnov */](_v, 25).ngClassInvalid; var currVal_12 = core["_44" /* ɵnov */](_v, 25).ngClassPending; _ck(_v, 20, 0, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8, currVal_9, currVal_10, currVal_11, currVal_12); }); }
function View_AddonModForumNewDiscussionPage_10(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 7, "ion-col", [["class", "col"]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, col["a" /* Col */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 3, "button", [["block", ""], ["color", "light"], ["ion-button", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.discard() !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](4, 1097728, null, 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { color: [0, "color"], block: [1, "block"] }, null), (_l()(), core["_55" /* ɵted */](5, 0, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "]))], function (_ck, _v) { var currVal_0 = "light"; var currVal_1 = ""; _ck(_v, 4, 0, currVal_0, currVal_1); }, function (_ck, _v) { var currVal_2 = core["_56" /* ɵunv */](_v, 5, 0, core["_44" /* ɵnov */](_v, 6).transform("core.discard")); _ck(_v, 5, 0, currVal_2); }); }
function View_AddonModForumNewDiscussionPage_1(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 81, "ion-list", [], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, list["a" /* List */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], platform["a" /* Platform */], gesture_controller["l" /* GestureController */], dom_controller["a" /* DomController */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 18, "ion-item", [["class", "item item-block"]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](4, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 3, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 4, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 5, { _icons: 1 }), core["_30" /* ɵdid */](8, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](10, 0, null, 1, 3, "ion-label", [["stacked", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](11, 16384, [[3, 4]], 0, label["a" /* Label */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, ""], [8, null], [8, null]], null, null), (_l()(), core["_55" /* ɵted */](12, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](15, 0, null, 3, 5, "ion-input", [["type", "text"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("ngModelChange" === en)) {
        var pd_0 = ((_co.newDiscussion.subject = $event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, input_ngfactory["b" /* View_TextInput_0 */], input_ngfactory["a" /* RenderType_TextInput */])), core["_30" /* ɵdid */](16, 671744, null, 0, esm5_forms["q" /* NgModel */], [[8, null], [8, null], [8, null], [8, null]], { model: [0, "model"] }, { update: "ngModelChange" }), core["_50" /* ɵprd */](2048, null, esm5_forms["m" /* NgControl */], null, [esm5_forms["q" /* NgModel */]]), core["_30" /* ɵdid */](18, 16384, null, 0, esm5_forms["n" /* NgControlStatus */], [esm5_forms["m" /* NgControl */]], null, null), core["_30" /* ɵdid */](19, 5423104, null, 0, input["a" /* TextInput */], [config["a" /* Config */], platform["a" /* Platform */], util_form["a" /* Form */], app["a" /* App */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, content["a" /* Content */]], [2, item["a" /* Item */]], [2, esm5_forms["m" /* NgControl */]], dom_controller["a" /* DomController */]], { type: [0, "type"], placeholder: [1, "placeholder"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](23, 0, null, null, 15, "ion-item", [["class", "item item-block"]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](24, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 6, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 7, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 8, { _icons: 1 }), core["_30" /* ɵdid */](28, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](30, 0, null, 1, 3, "ion-label", [["stacked", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](31, 16384, [[6, 4]], 0, label["a" /* Label */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, ""], [8, null], [8, null]], null, null), (_l()(), core["_55" /* ɵted */](32, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](35, 0, null, 3, 2, "core-rich-text-editor", [["item-content", ""], ["name", "addon_mod_forum_new_discussion"]], null, [[null, "contentChanged"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("contentChanged" === en)) {
        var pd_0 = (_co.onMessageChange($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, rich_text_editor_ngfactory["b" /* View_CoreRichTextEditorComponent_0 */], rich_text_editor_ngfactory["a" /* RenderType_CoreRichTextEditorComponent */])), core["_30" /* ɵdid */](36, 1228800, [[1, 4]], 0, rich_text_editor["a" /* CoreRichTextEditorComponent */], [dom["a" /* CoreDomUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], sites["a" /* CoreSitesProvider */], filepool["a" /* CoreFilepoolProvider */], [2, content["a" /* Content */]], core["t" /* ElementRef */], events["a" /* CoreEventsProvider */], utils_utils["a" /* CoreUtilsProvider */], platform["a" /* Platform */]], { placeholder: [0, "placeholder"], control: [1, "control"], name: [2, "name"], component: [3, "component"], componentId: [4, "componentId"] }, { contentChanged: "contentChanged" }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](40, 0, null, null, 13, "ion-item-divider", [["class", "core-expandable item item-divider"], ["text-wrap", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.toggleAdvanced() !== false);
        ad = (pd_0 && ad);
    } return ad; }, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](41, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 9, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 10, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 11, { _icons: 1 }), core["_30" /* ɵdid */](45, 16384, null, 0, item_divider["a" /* ItemDivider */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonModForumNewDiscussionPage_2)), core["_30" /* ɵdid */](48, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonModForumNewDiscussionPage_3)), core["_30" /* ɵdid */](51, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](52, 2, ["\n                ", "\n            "])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModForumNewDiscussionPage_4)), core["_30" /* ɵdid */](56, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](58, 0, null, null, 22, "ion-item", [["class", "item item-block"]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](59, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 25, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 26, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 27, { _icons: 1 }), core["_30" /* ɵdid */](63, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](65, 0, null, 2, 14, "ion-row", [["class", "row"]], null, null, null, null, null)), core["_30" /* ɵdid */](66, 16384, null, 0, row["a" /* Row */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](68, 0, null, null, 7, "ion-col", [["class", "col"]], null, null, null, null, null)), core["_30" /* ɵdid */](69, 16384, null, 0, col["a" /* Col */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](71, 0, null, null, 3, "button", [["block", ""], ["ion-button", ""]], [[8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.add() !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](72, 1097728, null, 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { block: [0, "block"] }, null), (_l()(), core["_55" /* ɵted */](73, 0, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModForumNewDiscussionPage_10)), core["_30" /* ɵdid */](78, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "]))], function (_ck, _v) { var _co = _v.component; var currVal_8 = _co.newDiscussion.subject; _ck(_v, 16, 0, currVal_8); var currVal_9 = "text"; var currVal_10 = core["_56" /* ɵunv */](_v, 19, 1, core["_44" /* ɵnov */](_v, 20).transform("addon.mod_forum.subject")); _ck(_v, 19, 0, currVal_9, currVal_10); var currVal_12 = core["_56" /* ɵunv */](_v, 36, 0, core["_44" /* ɵnov */](_v, 37).transform("addon.mod_forum.message")); var currVal_13 = _co.messageControl; var currVal_14 = "addon_mod_forum_new_discussion"; var currVal_15 = _co.component; var currVal_16 = _co.forum.cmid; _ck(_v, 36, 0, currVal_12, currVal_13, currVal_14, currVal_15, currVal_16); var currVal_17 = !_co.advanced; _ck(_v, 48, 0, currVal_17); var currVal_18 = _co.advanced; _ck(_v, 51, 0, currVal_18); var currVal_20 = _co.advanced; _ck(_v, 56, 0, currVal_20); var currVal_22 = ""; _ck(_v, 72, 0, currVal_22); var currVal_24 = _co.hasOffline; _ck(_v, 78, 0, currVal_24); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = core["_56" /* ɵunv */](_v, 12, 0, core["_44" /* ɵnov */](_v, 13).transform("addon.mod_forum.subject")); _ck(_v, 12, 0, currVal_0); var currVal_1 = core["_44" /* ɵnov */](_v, 18).ngClassUntouched; var currVal_2 = core["_44" /* ɵnov */](_v, 18).ngClassTouched; var currVal_3 = core["_44" /* ɵnov */](_v, 18).ngClassPristine; var currVal_4 = core["_44" /* ɵnov */](_v, 18).ngClassDirty; var currVal_5 = core["_44" /* ɵnov */](_v, 18).ngClassValid; var currVal_6 = core["_44" /* ɵnov */](_v, 18).ngClassInvalid; var currVal_7 = core["_44" /* ɵnov */](_v, 18).ngClassPending; _ck(_v, 15, 0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7); var currVal_11 = core["_56" /* ɵunv */](_v, 32, 0, core["_44" /* ɵnov */](_v, 33).transform("addon.mod_forum.message")); _ck(_v, 32, 0, currVal_11); var currVal_19 = core["_56" /* ɵunv */](_v, 52, 0, core["_44" /* ɵnov */](_v, 53).transform("addon.mod_forum.advanced")); _ck(_v, 52, 0, currVal_19); var currVal_21 = ((_co.newDiscussion.subject == "") || (_co.newDiscussion.message == null)); _ck(_v, 71, 0, currVal_21); var currVal_23 = core["_56" /* ɵunv */](_v, 73, 0, core["_44" /* ɵnov */](_v, 74).transform("addon.mod_forum.posttoforum")); _ck(_v, 73, 0, currVal_23); }); }
function View_AddonModForumNewDiscussionPage_0(_l) { return core["_57" /* ɵvid */](0, [core["_52" /* ɵqud */](671088640, 1, { messageEditor: 0 }), (_l()(), core["_31" /* ɵeld */](1, 0, null, null, 18, "ion-header", [], null, null, null, null, null)), core["_30" /* ɵdid */](2, 16384, null, 0, toolbar_header["a" /* Header */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, view_controller["a" /* ViewController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_31" /* ɵeld */](4, 0, null, null, 14, "ion-navbar", [["class", "toolbar"], ["core-back-button", ""]], [[8, "hidden", 0], [2, "statusbar-padding", null]], null, null, navbar_ngfactory["b" /* View_Navbar_0 */], navbar_ngfactory["a" /* RenderType_Navbar */])), core["_30" /* ɵdid */](5, 49152, null, 0, navbar["a" /* Navbar */], [app["a" /* App */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_30" /* ɵdid */](6, 212992, null, 0, back_button["a" /* CoreBackButtonDirective */], [navbar["a" /* Navbar */], platform["a" /* Platform */], translate_service["a" /* TranslateService */], events["a" /* CoreEventsProvider */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n        "])), (_l()(), core["_31" /* ɵeld */](8, 0, null, 3, 3, "ion-title", [], null, null, null, toolbar_title_ngfactory["b" /* View_ToolbarTitle_0 */], toolbar_title_ngfactory["a" /* RenderType_ToolbarTitle */])), core["_30" /* ɵdid */](9, 49152, null, 0, toolbar_title["a" /* ToolbarTitle */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), (_l()(), core["_55" /* ɵted */](10, 0, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n        "])), (_l()(), core["_31" /* ɵeld */](13, 0, null, 2, 4, "ion-buttons", [["end", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](14, 16384, null, 1, toolbar_item["a" /* ToolbarItem */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), core["_52" /* ɵqud */](603979776, 2, { _buttons: 1 }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_31" /* ɵeld */](21, 0, null, null, 17, "ion-content", [], [[2, "statusbar-padding", null], [2, "has-refresher", null]], null, null, content_ngfactory["b" /* View_Content_0 */], content_ngfactory["a" /* RenderType_Content */])), core["_30" /* ɵdid */](22, 4374528, null, 0, content["a" /* Content */], [config["a" /* Config */], platform["a" /* Platform */], dom_controller["a" /* DomController */], core["t" /* ElementRef */], core["V" /* Renderer */], app["a" /* App */], keyboard["a" /* Keyboard */], core["M" /* NgZone */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n    "])), (_l()(), core["_31" /* ɵeld */](24, 0, null, 2, 6, "ion-refresher", [], [[2, "refresher-active", null], [4, "top", null]], [[null, "ionRefresh"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("ionRefresh" === en)) {
        var pd_0 = (_co.refreshGroups($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), core["_30" /* ɵdid */](25, 212992, null, 0, refresher["a" /* Refresher */], [platform["a" /* Platform */], content["a" /* Content */], core["M" /* NgZone */], gesture_controller["l" /* GestureController */]], { enabled: [0, "enabled"] }, { ionRefresh: "ionRefresh" }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_31" /* ɵeld */](27, 0, null, null, 2, "ion-refresher-content", [], [[1, "state", 0]], null, null, refresher_content_ngfactory["b" /* View_RefresherContent_0 */], refresher_content_ngfactory["a" /* RenderType_RefresherContent */])), core["_30" /* ɵdid */](28, 114688, null, 0, refresher_content["a" /* RefresherContent */], [refresher["a" /* Refresher */], config["a" /* Config */]], { pullingText: [0, "pullingText"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n\n    "])), (_l()(), core["_31" /* ɵeld */](32, 0, null, 1, 5, "core-loading", [], null, null, null, loading_ngfactory["b" /* View_CoreLoadingComponent_0 */], loading_ngfactory["a" /* RenderType_CoreLoadingComponent */])), core["_30" /* ɵdid */](33, 638976, null, 0, loading["a" /* CoreLoadingComponent */], [translate_service["a" /* TranslateService */], core["t" /* ElementRef */], events["a" /* CoreEventsProvider */], utils_utils["a" /* CoreUtilsProvider */]], { hideUntil: [0, "hideUntil"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonModForumNewDiscussionPage_1)), core["_30" /* ɵdid */](36, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; _ck(_v, 6, 0); var currVal_7 = _co.groupsLoaded; _ck(_v, 25, 0, currVal_7); var currVal_9 = core["_34" /* ɵinlineInterpolate */](1, "", core["_56" /* ɵunv */](_v, 28, 0, core["_44" /* ɵnov */](_v, 29).transform("core.pulltorefresh")), ""); _ck(_v, 28, 0, currVal_9); var currVal_10 = _co.groupsLoaded; _ck(_v, 33, 0, currVal_10); var currVal_11 = _co.showForm; _ck(_v, 36, 0, currVal_11); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 5)._hidden; var currVal_1 = core["_44" /* ɵnov */](_v, 5)._sbPadding; _ck(_v, 4, 0, currVal_0, currVal_1); var currVal_2 = core["_56" /* ɵunv */](_v, 10, 0, core["_44" /* ɵnov */](_v, 11).transform("addon.mod_forum.addanewdiscussion")); _ck(_v, 10, 0, currVal_2); var currVal_3 = core["_44" /* ɵnov */](_v, 22).statusbarPadding; var currVal_4 = core["_44" /* ɵnov */](_v, 22)._hasRefresher; _ck(_v, 21, 0, currVal_3, currVal_4); var currVal_5 = (core["_44" /* ɵnov */](_v, 25).state !== "inactive"); var currVal_6 = core["_44" /* ɵnov */](_v, 25)._top; _ck(_v, 24, 0, currVal_5, currVal_6); var currVal_8 = core["_44" /* ɵnov */](_v, 28).r.state; _ck(_v, 27, 0, currVal_8); }); }
function View_AddonModForumNewDiscussionPage_Host_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "page-addon-mod-forum-new-discussion", [], null, null, null, View_AddonModForumNewDiscussionPage_0, RenderType_AddonModForumNewDiscussionPage)), core["_30" /* ɵdid */](1, 245760, null, 0, new_discussion_AddonModForumNewDiscussionPage, [nav_params["a" /* NavParams */], nav_controller["a" /* NavController */], translate_service["a" /* TranslateService */], dom["a" /* CoreDomUtilsProvider */], events["a" /* CoreEventsProvider */], providers_groups["a" /* CoreGroupsProvider */], sites["a" /* CoreSitesProvider */], sync["a" /* CoreSyncProvider */], fileuploader["a" /* CoreFileUploaderProvider */], utils_text["a" /* CoreTextUtilsProvider */], utils_utils["a" /* CoreUtilsProvider */], forum["a" /* AddonModForumProvider */], offline["a" /* AddonModForumOfflineProvider */], providers_sync["a" /* AddonModForumSyncProvider */], helper["a" /* AddonModForumHelperProvider */], [2, split_view["a" /* CoreSplitViewComponent */]]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var AddonModForumNewDiscussionPageNgFactory = core["_27" /* ɵccf */]("page-addon-mod-forum-new-discussion", new_discussion_AddonModForumNewDiscussionPage, View_AddonModForumNewDiscussionPage_Host_0, {}, {}, []);

//# sourceMappingURL=new-discussion.ngfactory.js.map
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

// EXTERNAL MODULE: ./node_modules/ionic-angular/util/module-loader.js
var module_loader = __webpack_require__(268);

// CONCATENATED MODULE: ./src/addon/mod/forum/pages/new-discussion/new-discussion.module.ngfactory.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddonModForumNewDiscussionPageModuleNgFactory", function() { return AddonModForumNewDiscussionPageModuleNgFactory; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 































var AddonModForumNewDiscussionPageModuleNgFactory = core["_28" /* ɵcmf */](new_discussion_module_AddonModForumNewDiscussionPageModule, [], function (_l) { return core["_40" /* ɵmod */]([core["_41" /* ɵmpd */](512, core["o" /* ComponentFactoryResolver */], core["_21" /* ɵCodegenComponentFactoryResolver */], [[8, [action_sheet_component_ngfactory["a" /* ActionSheetCmpNgFactory */], alert_component_ngfactory["a" /* AlertCmpNgFactory */], app_root_ngfactory["a" /* IonicAppNgFactory */], loading_component_ngfactory["a" /* LoadingCmpNgFactory */], modal_component_ngfactory["a" /* ModalCmpNgFactory */], picker_component_ngfactory["a" /* PickerCmpNgFactory */], popover_component_ngfactory["a" /* PopoverCmpNgFactory */], select_popover_component_ngfactory["a" /* SelectPopoverNgFactory */], toast_component_ngfactory["a" /* ToastCmpNgFactory */], context_menu_popover_ngfactory["a" /* CoreContextMenuPopoverComponentNgFactory */], course_picker_menu_popover_ngfactory["a" /* CoreCoursePickerMenuPopoverComponentNgFactory */], recaptchamodal_ngfactory["a" /* CoreRecaptchaModalComponentNgFactory */], bs_tooltip_ngfactory["a" /* CoreBSTooltipComponentNgFactory */], AddonModForumNewDiscussionPageNgFactory]], [3, core["o" /* ComponentFactoryResolver */]], core["K" /* NgModuleRef */]]), core["_41" /* ɵmpd */](4608, common["m" /* NgLocalization */], common["l" /* NgLocaleLocalization */], [core["G" /* LOCALE_ID */], [2, common["w" /* ɵa */]]]), core["_41" /* ɵmpd */](4608, esm5_forms["x" /* ɵi */], esm5_forms["x" /* ɵi */], []), core["_41" /* ɵmpd */](4608, esm5_forms["d" /* FormBuilder */], esm5_forms["d" /* FormBuilder */], []), core["_41" /* ɵmpd */](4608, translate_loader["b" /* TranslateLoader */], translate_loader["a" /* TranslateFakeLoader */], []), core["_41" /* ɵmpd */](4608, translate_compiler["a" /* TranslateCompiler */], translate_compiler["b" /* TranslateFakeCompiler */], []), core["_41" /* ɵmpd */](4608, translate_parser["b" /* TranslateParser */], translate_parser["a" /* TranslateDefaultParser */], []), core["_41" /* ɵmpd */](4608, missing_translation_handler["b" /* MissingTranslationHandler */], missing_translation_handler["a" /* FakeMissingTranslationHandler */], []), core["_41" /* ɵmpd */](4608, translate_service["a" /* TranslateService */], translate_service["a" /* TranslateService */], [translate_store["a" /* TranslateStore */], translate_loader["b" /* TranslateLoader */], translate_compiler["a" /* TranslateCompiler */], translate_parser["b" /* TranslateParser */], missing_translation_handler["b" /* MissingTranslationHandler */], translate_service["b" /* USE_DEFAULT_LANG */], translate_service["c" /* USE_STORE */]]), core["_41" /* ɵmpd */](512, common["b" /* CommonModule */], common["b" /* CommonModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["v" /* ɵba */], esm5_forms["v" /* ɵba */], []), core["_41" /* ɵmpd */](512, esm5_forms["i" /* FormsModule */], esm5_forms["i" /* FormsModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["s" /* ReactiveFormsModule */], esm5_forms["s" /* ReactiveFormsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["a" /* IonicModule */], ionic_angular_module["a" /* IonicModule */], []), core["_41" /* ɵmpd */](512, _ngx_translate_core["b" /* TranslateModule */], _ngx_translate_core["b" /* TranslateModule */], []), core["_41" /* ɵmpd */](512, directives_module["a" /* CoreDirectivesModule */], directives_module["a" /* CoreDirectivesModule */], []), core["_41" /* ɵmpd */](512, pipes_module["a" /* CorePipesModule */], pipes_module["a" /* CorePipesModule */], []), core["_41" /* ɵmpd */](512, components_module["a" /* CoreComponentsModule */], components_module["a" /* CoreComponentsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["b" /* IonicPageModule */], ionic_angular_module["b" /* IonicPageModule */], []), core["_41" /* ɵmpd */](512, new_discussion_module_AddonModForumNewDiscussionPageModule, new_discussion_module_AddonModForumNewDiscussionPageModule, []), core["_41" /* ɵmpd */](256, translate_service["c" /* USE_STORE */], undefined, []), core["_41" /* ɵmpd */](256, translate_service["b" /* USE_DEFAULT_LANG */], undefined, []), core["_41" /* ɵmpd */](256, module_loader["a" /* LAZY_LOADED_TOKEN */], new_discussion_AddonModForumNewDiscussionPage, [])]); });

//# sourceMappingURL=new-discussion.module.ngfactory.js.map

/***/ })

});
//# sourceMappingURL=101.js.map