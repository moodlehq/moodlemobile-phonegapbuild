webpackJsonp([93],{

/***/ 1870:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/@angular/core/esm5/core.js
var core = __webpack_require__(0);

// EXTERNAL MODULE: ./node_modules/ionic-angular/index.js + 3 modules
var ionic_angular = __webpack_require__(8);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/index.js + 1 modules
var _ngx_translate_core = __webpack_require__(3);

// EXTERNAL MODULE: ./src/components/components.module.ts
var components_module = __webpack_require__(28);

// EXTERNAL MODULE: ./src/directives/directives.module.ts + 2 modules
var directives_module = __webpack_require__(29);

// EXTERNAL MODULE: ./src/addon/mod/forum/components/components.module.ts
var components_components_module = __webpack_require__(677);

// EXTERNAL MODULE: ./node_modules/@ionic-native/network/index.js
var _ionic_native_network = __webpack_require__(190);

// EXTERNAL MODULE: ./src/providers/app.ts
var app = __webpack_require__(9);

// EXTERNAL MODULE: ./src/providers/events.ts
var events = __webpack_require__(12);

// EXTERNAL MODULE: ./src/providers/sites.ts
var sites = __webpack_require__(1);

// EXTERNAL MODULE: ./src/providers/utils/dom.ts
var dom = __webpack_require__(4);

// EXTERNAL MODULE: ./src/providers/utils/utils.ts
var utils_utils = __webpack_require__(2);

// EXTERNAL MODULE: ./src/core/fileuploader/providers/fileuploader.ts
var fileuploader = __webpack_require__(66);

// EXTERNAL MODULE: ./src/components/split-view/split-view.ts
var split_view = __webpack_require__(34);

// EXTERNAL MODULE: ./src/addon/mod/forum/providers/forum.ts
var forum = __webpack_require__(165);

// EXTERNAL MODULE: ./src/addon/mod/forum/providers/offline.ts
var offline = __webpack_require__(207);

// EXTERNAL MODULE: ./src/addon/mod/forum/providers/helper.ts
var helper = __webpack_require__(252);

// EXTERNAL MODULE: ./src/addon/mod/forum/providers/sync.ts
var providers_sync = __webpack_require__(253);

// CONCATENATED MODULE: ./src/addon/mod/forum/pages/discussion/discussion.ts
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
 * Page that displays a forum discussion.
 */
var discussion_AddonModForumDiscussionPage = /** @class */ (function () {
    function AddonModForumDiscussionPage(navParams, network, zone, appProvider, eventsProvider, sitesProvider, domUtils, utils, translate, uploaderProvider, forumProvider, forumOffline, forumHelper, forumSync, svComponent) {
        var _this = this;
        this.appProvider = appProvider;
        this.eventsProvider = eventsProvider;
        this.sitesProvider = sitesProvider;
        this.domUtils = domUtils;
        this.utils = utils;
        this.translate = translate;
        this.uploaderProvider = uploaderProvider;
        this.forumProvider = forumProvider;
        this.forumOffline = forumOffline;
        this.forumHelper = forumHelper;
        this.forumSync = forumSync;
        this.svComponent = svComponent;
        this.discussionLoaded = false;
        this.sort = 'flat-oldest';
        this.replyData = {
            replyingTo: 0,
            isEditing: false,
            subject: '',
            message: null,
            files: [],
        };
        this.originalData = {
            subject: null,
            message: null,
            files: [],
        };
        this.refreshIcon = 'spinner';
        this.syncIcon = 'spinner';
        this.discussionStr = '';
        this.component = forum["a" /* AddonModForumProvider */].COMPONENT;
        this.courseId = navParams.get('courseId');
        this.cmId = navParams.get('cmId');
        this.forumId = navParams.get('forumId');
        this.discussionId = navParams.get('discussionId');
        this.trackPosts = navParams.get('trackPosts');
        this.locked = navParams.get('locked');
        this.isOnline = this.appProvider.isOnline();
        this.onlineObserver = network.onchange().subscribe(function (online) {
            // Execute the callback in the Angular zone, so change detection doesn't stop working.
            zone.run(function () {
                _this.isOnline = _this.appProvider.isOnline();
            });
        });
        this.isSplitViewOn = this.svComponent && this.svComponent.isOn();
        this.discussionStr = translate.instant('addon.mod_forum.discussion');
    }
    /**
     * View loaded.
     */
    AddonModForumDiscussionPage.prototype.ionViewDidLoad = function () {
        this.fetchPosts(true, false, true);
    };
    /**
     * User entered the page that contains the component.
     */
    AddonModForumDiscussionPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        // Refresh data if this discussion is synchronized automatically.
        this.syncObserver = this.eventsProvider.on(providers_sync["a" /* AddonModForumSyncProvider */].AUTO_SYNCED, function (data) {
            if (data.forumId == _this.forumId && _this.discussionId == data.discussionId
                && data.userId == _this.sitesProvider.getCurrentSiteUserId()) {
                // Refresh the data.
                _this.discussionLoaded = false;
                _this.refreshPosts();
            }
        }, this.sitesProvider.getCurrentSiteId());
        // Refresh data if this forum discussion is synchronized from discussions list.
        this.syncManualObserver = this.eventsProvider.on(providers_sync["a" /* AddonModForumSyncProvider */].MANUAL_SYNCED, function (data) {
            if (data.source != 'discussion' && data.forumId == _this.forumId &&
                data.userId == _this.sitesProvider.getCurrentSiteUserId()) {
                // Refresh the data.
                _this.discussionLoaded = false;
                _this.refreshPosts();
            }
        }, this.sitesProvider.getCurrentSiteId());
        // Trigger view event, to highlight the current opened discussion in the split view.
        this.eventsProvider.trigger(forum["a" /* AddonModForumProvider */].VIEW_DISCUSSION_EVENT, {
            forumId: this.forumId,
            discussion: this.discussionId
        }, this.sitesProvider.getCurrentSiteId());
    };
    /**
     * Check if we can leave the page or not.
     *
     * @return {boolean|Promise<void>} Resolved if we can leave it, rejected if not.
     */
    AddonModForumDiscussionPage.prototype.ionViewCanLeave = function () {
        var _this = this;
        var promise;
        if (this.forumHelper.hasPostDataChanged(this.replyData, this.originalData)) {
            // Show confirmation if some data has been modified.
            promise = this.domUtils.showConfirm(this.translate.instant('core.confirmcanceledit'));
        }
        else {
            promise = Promise.resolve();
        }
        return promise.then(function () {
            // Delete the local files from the tmp folder.
            _this.uploaderProvider.clearTmpFiles(_this.replyData.files);
        });
    };
    /**
     * Convenience function to get the forum.
     *
     * @return {Promise<any>} Promise resolved with the forum.
     */
    AddonModForumDiscussionPage.prototype.fetchForum = function () {
        if (this.courseId && this.cmId) {
            return this.forumProvider.getForum(this.courseId, this.cmId);
        }
        else if (this.courseId && this.forumId) {
            return this.forumProvider.getForumById(this.courseId, this.forumId);
        }
        else {
            // Cannot get the forum.
            return Promise.reject(null);
        }
    };
    /**
     * Convenience function to get forum discussions.
     *
     * @param  {boolean} [sync]            Whether to try to synchronize the discussion.
     * @param  {boolean} [showErrors]      Whether to show errors in a modal.
     * @param  {boolean} [forceMarkAsRead] Whether to mark all posts as read.
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonModForumDiscussionPage.prototype.fetchPosts = function (sync, showErrors, forceMarkAsRead) {
        var _this = this;
        var syncPromise;
        if (sync) {
            // Try to synchronize the forum.
            syncPromise = this.syncDiscussion(showErrors).catch(function () {
                // Ignore errors.
            });
        }
        else {
            syncPromise = Promise.resolve();
        }
        var onlinePosts = [];
        var offlineReplies = [];
        var hasUnreadPosts = false;
        return syncPromise.then(function () {
            return _this.forumProvider.getDiscussionPosts(_this.discussionId).then(function (posts) {
                onlinePosts = posts;
            }).then(function () {
                // Check if there are responses stored in offline.
                return _this.forumOffline.getDiscussionReplies(_this.discussionId).then(function (replies) {
                    _this.postHasOffline = !!replies.length;
                    var convertPromises = [];
                    // Index posts to allow quick access. Also check unread field.
                    var posts = {};
                    onlinePosts.forEach(function (post) {
                        posts[post.id] = post;
                        hasUnreadPosts = hasUnreadPosts || !post.postread;
                    });
                    replies.forEach(function (offlineReply) {
                        // If we don't have forumId and courseId, get it from the post.
                        if (!_this.forumId) {
                            _this.forumId = offlineReply.forumid;
                        }
                        if (!_this.courseId) {
                            _this.courseId = offlineReply.courseid;
                        }
                        convertPromises.push(_this.forumHelper.convertOfflineReplyToOnline(offlineReply).then(function (reply) {
                            offlineReplies.push(reply);
                            // Disable reply of the parent. Reply in offline to the same post is not allowed, edit instead.
                            posts[reply.parent].canreply = false;
                        }));
                    });
                    return Promise.all(convertPromises).then(function () {
                        // Convert back to array.
                        onlinePosts = _this.utils.objectToArray(posts);
                    });
                });
            });
        }).then(function () {
            var posts = offlineReplies.concat(onlinePosts);
            _this.discussion = _this.forumProvider.extractStartingPost(posts);
            if (!_this.discussion) {
                return Promise.reject('Invalid forum discussion');
            }
            // If sort type is nested, normal sorting is disabled and nested posts will be displayed.
            if (_this.sort == 'nested') {
                // Sort first by creation date to make format tree work.
                _this.forumProvider.sortDiscussionPosts(posts, 'ASC');
                _this.posts = _this.utils.formatTree(posts, 'parent', 'id', _this.discussion.id);
            }
            else {
                // Set default reply subject.
                var direction = _this.sort == 'flat-newest' ? 'DESC' : 'ASC';
                _this.forumProvider.sortDiscussionPosts(posts, direction);
                _this.posts = posts;
            }
            _this.defaultSubject = _this.translate.instant('addon.mod_forum.re') + ' ' + _this.discussion.subject;
            _this.replyData.subject = _this.defaultSubject;
            // Now try to get the forum.
            return _this.fetchForum().then(function (forum) {
                if (_this.discussion.userfullname && _this.discussion.parent == 0 && forum.type == 'single') {
                    // Hide author for first post and type single.
                    _this.discussion.userfullname = null;
                }
                // "forum.istracked" is more reliable than "trackPosts".
                if (typeof forum.istracked != 'undefined') {
                    _this.trackPosts = forum.istracked;
                }
                _this.forumId = forum.id;
                _this.cmId = forum.cmid;
                _this.forum = forum;
            }).catch(function () {
                // Ignore errors.
                _this.forum = {};
            });
        }).catch(function (message) {
            _this.domUtils.showErrorModal(message);
        }).finally(function () {
            _this.discussionLoaded = true;
            _this.refreshIcon = 'refresh';
            _this.syncIcon = 'sync';
            if (forceMarkAsRead || (hasUnreadPosts && _this.trackPosts)) {
                // // Add log in Moodle and mark unread posts as readed.
                _this.forumProvider.logDiscussionView(_this.discussionId).catch(function () {
                    // Ignore errors.
                }).finally(function () {
                    // Trigger mark read posts.
                    _this.eventsProvider.trigger(forum["a" /* AddonModForumProvider */].MARK_READ_EVENT, {
                        courseId: _this.courseId,
                        moduleId: _this.cmId
                    }, _this.sitesProvider.getCurrentSiteId());
                });
            }
        });
    };
    /**
     * Tries to synchronize the posts discussion.
     *
     * @param  {boolean} showErrors Whether to show errors in a modal.
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonModForumDiscussionPage.prototype.syncDiscussion = function (showErrors) {
        var _this = this;
        return this.forumSync.syncDiscussionReplies(this.discussionId).then(function (result) {
            if (result.warnings && result.warnings.length) {
                _this.domUtils.showErrorModal(result.warnings[0]);
            }
            if (result && result.updated) {
                // Sync successful, send event.
                _this.eventsProvider.trigger(providers_sync["a" /* AddonModForumSyncProvider */].MANUAL_SYNCED, {
                    forumId: _this.forumId,
                    userId: _this.sitesProvider.getCurrentSiteUserId(),
                    source: 'discussion'
                }, _this.sitesProvider.getCurrentSiteId());
            }
            return result.updated;
        }).catch(function (error) {
            if (showErrors) {
                _this.domUtils.showErrorModalDefault(error, 'core.errorsync', true);
            }
            return Promise.reject(null);
        });
    };
    /**
     * Refresh the data.
     *
     * @param {any}       [refresher] Refresher.
     * @param {Function}  [done] Function to call when done.
     * @param {boolean}   [showErrors=false] If show errors to the user of hide them.
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonModForumDiscussionPage.prototype.doRefresh = function (refresher, done, showErrors) {
        if (showErrors === void 0) { showErrors = false; }
        if (this.discussionLoaded) {
            return this.refreshPosts(true, showErrors).finally(function () {
                refresher && refresher.complete();
                done && done();
            });
        }
        return Promise.resolve();
    };
    /**
     * Refresh posts.
     *
     * @param  {boolean} [sync]       Whether to try to synchronize the discussion.
     * @param  {boolean} [showErrors] Whether to show errors in a modal.
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonModForumDiscussionPage.prototype.refreshPosts = function (sync, showErrors) {
        var _this = this;
        this.domUtils.scrollToTop(this.content);
        this.refreshIcon = 'spinner';
        this.syncIcon = 'spinner';
        return this.forumProvider.invalidateDiscussionPosts(this.discussionId).catch(function () {
            // Ignore errors.
        }).then(function () {
            return _this.fetchPosts(sync, showErrors);
        });
    };
    /**
     * Function to change posts sorting
     *
     * @param  {SortType} type Sort type.
     * @return {Promise<any>} Promised resolved when done.
     */
    AddonModForumDiscussionPage.prototype.changeSort = function (type) {
        this.discussionLoaded = false;
        this.sort = type;
        this.domUtils.scrollToTop(this.content);
        return this.fetchPosts();
    };
    /**
     * New post added.
     */
    AddonModForumDiscussionPage.prototype.postListChanged = function () {
        var _this = this;
        // Trigger an event to notify a new reply.
        var data = {
            forumId: this.forumId,
            discussionId: this.discussionId,
            cmId: this.cmId
        };
        this.eventsProvider.trigger(forum["a" /* AddonModForumProvider */].REPLY_DISCUSSION_EVENT, data, this.sitesProvider.getCurrentSiteId());
        this.discussionLoaded = false;
        this.refreshPosts().finally(function () {
            _this.discussionLoaded = true;
        });
    };
    /**
     * Runs when the page is about to leave and no longer be the active page.
     */
    AddonModForumDiscussionPage.prototype.ionViewWillLeave = function () {
        this.syncObserver && this.syncObserver.off();
        this.syncManualObserver && this.syncManualObserver.off();
    };
    /**
     * Page destroyed.
     */
    AddonModForumDiscussionPage.prototype.ngOnDestroy = function () {
        this.onlineObserver && this.onlineObserver.unsubscribe();
    };
    __decorate([
        Object(core["_9" /* ViewChild */])(ionic_angular["f" /* Content */]),
        __metadata("design:type", ionic_angular["f" /* Content */])
    ], AddonModForumDiscussionPage.prototype, "content", void 0);
    AddonModForumDiscussionPage = __decorate([
        Object(core["m" /* Component */])({
            selector: 'page-addon-mod-forum-discussion',
            templateUrl: 'discussion.html',
        }),
        __param(14, Object(core["N" /* Optional */])()),
        __metadata("design:paramtypes", [ionic_angular["t" /* NavParams */],
            _ionic_native_network["a" /* Network */],
            core["M" /* NgZone */],
            app["a" /* CoreAppProvider */],
            events["a" /* CoreEventsProvider */],
            sites["a" /* CoreSitesProvider */],
            dom["a" /* CoreDomUtilsProvider */],
            utils_utils["a" /* CoreUtilsProvider */],
            _ngx_translate_core["c" /* TranslateService */],
            fileuploader["a" /* CoreFileUploaderProvider */],
            forum["a" /* AddonModForumProvider */],
            offline["a" /* AddonModForumOfflineProvider */],
            helper["a" /* AddonModForumHelperProvider */],
            providers_sync["a" /* AddonModForumSyncProvider */],
            split_view["a" /* CoreSplitViewComponent */]])
    ], AddonModForumDiscussionPage);
    return AddonModForumDiscussionPage;
}());

//# sourceMappingURL=discussion.js.map
// CONCATENATED MODULE: ./src/addon/mod/forum/pages/discussion/discussion.module.ts
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
var discussion_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var discussion_module_AddonModForumDiscussionPageModule = /** @class */ (function () {
    function AddonModForumDiscussionPageModule() {
    }
    AddonModForumDiscussionPageModule = discussion_module___decorate([
        Object(core["I" /* NgModule */])({
            declarations: [
                discussion_AddonModForumDiscussionPage,
            ],
            imports: [
                components_module["a" /* CoreComponentsModule */],
                directives_module["a" /* CoreDirectivesModule */],
                components_components_module["a" /* AddonModForumComponentsModule */],
                ionic_angular["l" /* IonicPageModule */].forChild(discussion_AddonModForumDiscussionPage),
                _ngx_translate_core["b" /* TranslateModule */].forChild()
            ],
        })
    ], AddonModForumDiscussionPageModule);
    return AddonModForumDiscussionPageModule;
}());

//# sourceMappingURL=discussion.module.js.map
// EXTERNAL MODULE: ./node_modules/ionic-angular/components/action-sheet/action-sheet-component.ngfactory.js
var action_sheet_component_ngfactory = __webpack_require__(1345);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/alert/alert-component.ngfactory.js
var alert_component_ngfactory = __webpack_require__(1346);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/app/app-root.ngfactory.js
var app_root_ngfactory = __webpack_require__(1347);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/loading/loading-component.ngfactory.js
var loading_component_ngfactory = __webpack_require__(1348);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/modal/modal-component.ngfactory.js
var modal_component_ngfactory = __webpack_require__(1349);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/picker/picker-component.ngfactory.js + 1 modules
var picker_component_ngfactory = __webpack_require__(1350);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/popover/popover-component.ngfactory.js
var popover_component_ngfactory = __webpack_require__(1351);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/select/select-popover-component.ngfactory.js
var select_popover_component_ngfactory = __webpack_require__(1352);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toast/toast-component.ngfactory.js
var toast_component_ngfactory = __webpack_require__(1353);

// EXTERNAL MODULE: ./src/components/context-menu/context-menu-popover.ngfactory.js
var context_menu_popover_ngfactory = __webpack_require__(1356);

// EXTERNAL MODULE: ./src/components/course-picker-menu/course-picker-menu-popover.ngfactory.js
var course_picker_menu_popover_ngfactory = __webpack_require__(1357);

// EXTERNAL MODULE: ./src/components/recaptcha/recaptchamodal.ngfactory.js
var recaptchamodal_ngfactory = __webpack_require__(1358);

// EXTERNAL MODULE: ./src/core/course/components/unsupported-module/unsupported-module.ngfactory.js
var unsupported_module_ngfactory = __webpack_require__(1359);

// EXTERNAL MODULE: ./src/addon/mod/forum/components/index/index.ngfactory.js
var index_ngfactory = __webpack_require__(1388);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.ngfactory.js
var toolbar_title_ngfactory = __webpack_require__(1355);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.js
var toolbar_title = __webpack_require__(337);

// EXTERNAL MODULE: ./node_modules/ionic-angular/config/config.js
var config = __webpack_require__(6);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar.js
var toolbar = __webpack_require__(247);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/navbar.js
var navbar = __webpack_require__(200);

// EXTERNAL MODULE: ./src/directives/format-text.ts
var format_text = __webpack_require__(41);

// EXTERNAL MODULE: ./src/providers/utils/text.ts
var utils_text = __webpack_require__(10);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.service.js
var translate_service = __webpack_require__(18);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/platform.js + 1 modules
var platform = __webpack_require__(14);

// EXTERNAL MODULE: ./src/providers/utils/url.ts
var url = __webpack_require__(25);

// EXTERNAL MODULE: ./src/providers/logger.ts
var logger = __webpack_require__(5);

// EXTERNAL MODULE: ./src/providers/filepool.ts
var filepool = __webpack_require__(16);

// EXTERNAL MODULE: ./src/core/contentlinks/providers/helper.ts
var providers_helper = __webpack_require__(17);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-controller.js
var nav_controller = __webpack_require__(21);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.js
var content = __webpack_require__(23);

// EXTERNAL MODULE: ./src/providers/utils/iframe.ts
var iframe = __webpack_require__(37);

// EXTERNAL MODULE: ./src/components/context-menu/context-menu-item.ngfactory.js
var context_menu_item_ngfactory = __webpack_require__(80);

// EXTERNAL MODULE: ./src/components/context-menu/context-menu-item.ts
var context_menu_item = __webpack_require__(73);

// EXTERNAL MODULE: ./src/components/context-menu/context-menu.ts
var context_menu = __webpack_require__(69);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.pipe.js
var translate_pipe = __webpack_require__(26);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/card/card.js
var card = __webpack_require__(86);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/icon/icon.js
var icon = __webpack_require__(46);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/note/note.js
var note = __webpack_require__(225);

// EXTERNAL MODULE: ./src/components/icon/icon.ngfactory.js
var icon_ngfactory = __webpack_require__(130);

// EXTERNAL MODULE: ./src/components/icon/icon.ts
var icon_icon = __webpack_require__(120);

// EXTERNAL MODULE: ./node_modules/@angular/common/esm5/common.js
var common = __webpack_require__(7);

// EXTERNAL MODULE: ./src/components/file/file.ngfactory.js
var file_ngfactory = __webpack_require__(203);

// EXTERNAL MODULE: ./src/components/file/file.ts
var file = __webpack_require__(172);

// EXTERNAL MODULE: ./src/providers/file-helper.ts
var file_helper = __webpack_require__(131);

// EXTERNAL MODULE: ./src/providers/utils/mimetype.ts
var mimetype = __webpack_require__(64);

// EXTERNAL MODULE: ./src/components/local-file/local-file.ngfactory.js
var local_file_ngfactory = __webpack_require__(347);

// EXTERNAL MODULE: ./src/components/local-file/local-file.ts
var local_file = __webpack_require__(254);

// EXTERNAL MODULE: ./src/providers/file.ts
var providers_file = __webpack_require__(49);

// EXTERNAL MODULE: ./src/providers/utils/time.ts
var time = __webpack_require__(24);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item.ngfactory.js + 1 modules
var item_ngfactory = __webpack_require__(30);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item.js
var item = __webpack_require__(20);

// EXTERNAL MODULE: ./node_modules/ionic-angular/util/form.js
var util_form = __webpack_require__(19);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-reorder.js + 1 modules
var item_reorder = __webpack_require__(27);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-content.js
var item_content = __webpack_require__(32);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.ngfactory.js
var button_ngfactory = __webpack_require__(45);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.js
var button_button = __webpack_require__(42);

// EXTERNAL MODULE: ./src/components/attachments/attachments.ngfactory.js
var attachments_ngfactory = __webpack_require__(447);

// EXTERNAL MODULE: ./src/components/attachments/attachments.ts
var attachments = __webpack_require__(280);

// EXTERNAL MODULE: ./src/core/fileuploader/providers/helper.ts
var fileuploader_providers_helper = __webpack_require__(132);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/grid/row.js
var row = __webpack_require__(113);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/grid/col.js
var col = __webpack_require__(112);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/list/list.js + 1 modules
var list = __webpack_require__(77);

// EXTERNAL MODULE: ./node_modules/ionic-angular/gestures/gesture-controller.js
var gesture_controller = __webpack_require__(38);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/dom-controller.js
var dom_controller = __webpack_require__(31);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/label/label.js
var label = __webpack_require__(61);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/input/input.ngfactory.js
var input_ngfactory = __webpack_require__(93);

// EXTERNAL MODULE: ./node_modules/@angular/forms/esm5/forms.js
var esm5_forms = __webpack_require__(22);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/input/input.js
var input = __webpack_require__(78);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/app/app.js + 3 modules
var app_app = __webpack_require__(33);

// EXTERNAL MODULE: ./src/components/rich-text-editor/rich-text-editor.ngfactory.js
var rich_text_editor_ngfactory = __webpack_require__(277);

// EXTERNAL MODULE: ./src/components/rich-text-editor/rich-text-editor.ts
var rich_text_editor = __webpack_require__(227);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/grid/grid.js
var grid = __webpack_require__(141);

// EXTERNAL MODULE: ./src/pipes/date-day-or-time.ts
var date_day_or_time = __webpack_require__(341);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/card/card-header.js
var card_header = __webpack_require__(281);

// EXTERNAL MODULE: ./src/components/user-avatar/user-avatar.ngfactory.js
var user_avatar_ngfactory = __webpack_require__(222);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/avatar/avatar.js
var avatar = __webpack_require__(186);

// EXTERNAL MODULE: ./src/components/user-avatar/user-avatar.ts
var user_avatar = __webpack_require__(187);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/card/card-content.js
var card_content = __webpack_require__(450);

// EXTERNAL MODULE: ./src/addon/mod/forum/components/post/post.ts
var post = __webpack_require__(1399);

// EXTERNAL MODULE: ./src/providers/sync.ts
var src_providers_sync = __webpack_require__(85);

// CONCATENATED MODULE: ./src/addon/mod/forum/components/post/post.ngfactory.js
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 





































































var styles_AddonModForumPostComponent = [];
var RenderType_AddonModForumPostComponent = core["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_AddonModForumPostComponent, data: {} });

function View_AddonModForumPostComponent_1(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 5, "ion-note", [["float-end", ""], ["padding-left", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, note["a" /* Note */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_31" /* ɵeld */](2, 0, null, null, 1, "ion-icon", [["name", "time"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](3, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ɵted */](4, null, [" ", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], function (_ck, _v) { var currVal_1 = "time"; _ck(_v, 3, 0, currVal_1); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 3)._hidden; _ck(_v, 2, 0, currVal_0); var currVal_2 = core["_56" /* ɵunv */](_v, 4, 0, core["_44" /* ɵnov */](_v, 5).transform("core.notsent")); _ck(_v, 4, 0, currVal_2); }); }
function View_AddonModForumPostComponent_3(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 4, "div", [], null, null, null, null, null)), (_l()(), core["_31" /* ɵeld */](1, 0, null, null, 1, "core-icon", [["color", "primary"], ["name", "fa-circle"]], null, null, null, icon_ngfactory["b" /* View_CoreIconComponent_0 */], icon_ngfactory["a" /* RenderType_CoreIconComponent */])), core["_30" /* ɵdid */](2, 245760, null, 0, icon_icon["a" /* CoreIconComponent */], [core["t" /* ElementRef */]], { name: [0, "name"], color: [1, "color"] }, null), (_l()(), core["_55" /* ɵted */](3, null, [" ", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], function (_ck, _v) { var currVal_0 = "fa-circle"; var currVal_1 = "primary"; _ck(_v, 2, 0, currVal_0, currVal_1); }, function (_ck, _v) { var currVal_2 = core["_56" /* ɵunv */](_v, 3, 0, core["_44" /* ɵnov */](_v, 4).transform("addon.mod_forum.unread")); _ck(_v, 3, 0, currVal_2); }); }
function View_AddonModForumPostComponent_2(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 6, "ion-note", [["float-end", ""], ["padding-left", ""], ["text-end", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, note["a" /* Note */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](2, null, ["\n                ", "\n                "])), core["_49" /* ɵppd */](3, 1), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModForumPostComponent_3)), core["_30" /* ɵdid */](5, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "]))], function (_ck, _v) { var _co = _v.component; var currVal_1 = (_co.trackPosts && !_co.post.postread); _ck(_v, 5, 0, currVal_1); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = core["_56" /* ɵunv */](_v, 2, 0, _ck(_v, 3, 0, core["_44" /* ɵnov */](_v.parent, 0), _co.post.modified)); _ck(_v, 2, 0, currVal_0); }); }
function View_AddonModForumPostComponent_5(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "core-file", [], null, null, null, file_ngfactory["b" /* View_CoreFileComponent_0 */], file_ngfactory["a" /* RenderType_CoreFileComponent */])), core["_30" /* ɵdid */](1, 245760, null, 0, file["a" /* CoreFileComponent */], [sites["a" /* CoreSitesProvider */], utils_utils["a" /* CoreUtilsProvider */], dom["a" /* CoreDomUtilsProvider */], filepool["a" /* CoreFilepoolProvider */], app["a" /* CoreAppProvider */], file_helper["a" /* CoreFileHelperProvider */], mimetype["a" /* CoreMimetypeUtilsProvider */], events["a" /* CoreEventsProvider */], utils_text["a" /* CoreTextUtilsProvider */]], { file: [0, "file"], component: [1, "component"], componentId: [2, "componentId"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _v.parent.context.$implicit; var currVal_1 = _co.component; var currVal_2 = _co.componentId; _ck(_v, 1, 0, currVal_0, currVal_1, currVal_2); }, null); }
function View_AddonModForumPostComponent_6(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "core-local-file", [], null, null, null, local_file_ngfactory["b" /* View_CoreLocalFileComponent_0 */], local_file_ngfactory["a" /* RenderType_CoreLocalFileComponent */])), core["_30" /* ɵdid */](1, 114688, null, 0, local_file["a" /* CoreLocalFileComponent */], [mimetype["a" /* CoreMimetypeUtilsProvider */], utils_utils["a" /* CoreUtilsProvider */], translate_service["a" /* TranslateService */], utils_text["a" /* CoreTextUtilsProvider */], providers_file["a" /* CoreFileProvider */], dom["a" /* CoreDomUtilsProvider */], time["a" /* CoreTimeUtilsProvider */]], { file: [0, "file"] }, null)], function (_ck, _v) { var currVal_0 = _v.parent.context.$implicit; _ck(_v, 1, 0, currVal_0); }, null); }
function View_AddonModForumPostComponent_4(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 9, null, null, null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModForumPostComponent_5)), core["_30" /* ɵdid */](4, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModForumPostComponent_6)), core["_30" /* ɵdid */](8, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "]))], function (_ck, _v) { var currVal_0 = !_v.context.$implicit.name; _ck(_v, 4, 0, currVal_0); var currVal_1 = _v.context.$implicit.name; _ck(_v, 8, 0, currVal_1); }, null); }
function View_AddonModForumPostComponent_7(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 14, "ion-item", [["class", "addon-forum-reply-button item item-block"], ["no-padding", ""], ["text-end", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 4, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 5, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 6, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n    "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 2, 6, "button", [["clear", ""], ["icon-left", ""], ["ion-button", ""], ["small", ""]], [[1, "aria-controls", 0], [1, "aria-expanded", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.showReply() !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](8, 1097728, [[5, 4]], 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { small: [0, "small"], clear: [1, "clear"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_31" /* ɵeld */](10, 0, null, 0, 1, "ion-icon", [["name", "undo"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](11, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ɵted */](12, 0, [" ", "\n    "])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n"]))], function (_ck, _v) { var currVal_2 = ""; var currVal_3 = ""; _ck(_v, 8, 0, currVal_2, currVal_3); var currVal_5 = "undo"; _ck(_v, 11, 0, currVal_5); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = ("addon-forum-reply-edit-form-" + _co.uniqueId); var currVal_1 = (_co.replyData.replyingTo === _co.post.id); _ck(_v, 7, 0, currVal_0, currVal_1); var currVal_4 = core["_44" /* ɵnov */](_v, 11)._hidden; _ck(_v, 10, 0, currVal_4); var currVal_6 = core["_56" /* ɵunv */](_v, 12, 0, core["_44" /* ɵnov */](_v, 13).transform("addon.mod_forum.reply")); _ck(_v, 12, 0, currVal_6); }); }
function View_AddonModForumPostComponent_8(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 14, "ion-item", [["class", "item item-block"], ["text-end", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 7, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 8, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 9, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n    "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 2, 6, "button", [["clear", ""], ["icon-left", ""], ["ion-button", ""], ["small", ""]], [[1, "aria-controls", 0], [1, "aria-expanded", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.editReply() !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](8, 1097728, [[8, 4]], 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { small: [0, "small"], clear: [1, "clear"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_31" /* ɵeld */](10, 0, null, 0, 1, "ion-icon", [["name", "create"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](11, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ɵted */](12, 0, [" ", "\n    "])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n"]))], function (_ck, _v) { var currVal_2 = ""; var currVal_3 = ""; _ck(_v, 8, 0, currVal_2, currVal_3); var currVal_5 = "create"; _ck(_v, 11, 0, currVal_5); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = ("addon-forum-reply-edit-form-" + _co.uniqueId); var currVal_1 = (_co.replyData.replyingTo === _co.post.parent); _ck(_v, 7, 0, currVal_0, currVal_1); var currVal_4 = core["_44" /* ɵnov */](_v, 11)._hidden; _ck(_v, 10, 0, currVal_4); var currVal_6 = core["_56" /* ɵunv */](_v, 12, 0, core["_44" /* ɵnov */](_v, 13).transform("addon.mod_forum.edit")); _ck(_v, 12, 0, currVal_6); }); }
function View_AddonModForumPostComponent_10(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "core-attachments", [], null, null, null, attachments_ngfactory["b" /* View_CoreAttachmentsComponent_0 */], attachments_ngfactory["a" /* RenderType_CoreAttachmentsComponent */])), core["_30" /* ɵdid */](1, 114688, null, 0, attachments["a" /* CoreAttachmentsComponent */], [app["a" /* CoreAppProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], fileuploader["a" /* CoreFileUploaderProvider */], translate_service["a" /* TranslateService */], fileuploader_providers_helper["a" /* CoreFileUploaderHelperProvider */]], { files: [0, "files"], maxSize: [1, "maxSize"], maxSubmissions: [2, "maxSubmissions"], component: [3, "component"], componentId: [4, "componentId"], allowOffline: [5, "allowOffline"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.replyData.files; var currVal_1 = _co.forum.maxbytes; var currVal_2 = _co.forum.maxattachments; var currVal_3 = _co.component; var currVal_4 = _co.forum.cmid; var currVal_5 = true; _ck(_v, 1, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5); }, null); }
function View_AddonModForumPostComponent_11(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 11, "ion-row", [["class", "row"]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, row["a" /* Row */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 7, "ion-col", [["class", "col"]], null, null, null, null, null)), core["_30" /* ɵdid */](4, 16384, null, 0, col["a" /* Col */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ɵeld */](6, 0, null, null, 3, "button", [["block", ""], ["color", "light"], ["ion-button", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.discard() !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](7, 1097728, null, 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { color: [0, "color"], block: [1, "block"] }, null), (_l()(), core["_55" /* ɵted */](8, 0, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "]))], function (_ck, _v) { var currVal_0 = "light"; var currVal_1 = ""; _ck(_v, 7, 0, currVal_0, currVal_1); }, function (_ck, _v) { var currVal_2 = core["_56" /* ɵunv */](_v, 8, 0, core["_44" /* ɵnov */](_v, 9).transform("core.discard")); _ck(_v, 8, 0, currVal_2); }); }
function View_AddonModForumPostComponent_9(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 71, "ion-list", [], [[8, "id", 0]], null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, list["a" /* List */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], platform["a" /* Platform */], gesture_controller["l" /* GestureController */], dom_controller["a" /* DomController */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 18, "ion-item", [["class", "item item-block"]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](4, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 10, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 11, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 12, { _icons: 1 }), core["_30" /* ɵdid */](8, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n        "])), (_l()(), core["_31" /* ɵeld */](10, 0, null, 1, 3, "ion-label", [["stacked", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](11, 16384, [[10, 4]], 0, label["a" /* Label */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, ""], [8, null], [8, null]], null, null), (_l()(), core["_55" /* ɵted */](12, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n        "])), (_l()(), core["_31" /* ɵeld */](15, 0, null, 3, 5, "ion-input", [["type", "text"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("ngModelChange" === en)) {
        var pd_0 = ((_co.replyData.subject = $event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, input_ngfactory["b" /* View_TextInput_0 */], input_ngfactory["a" /* RenderType_TextInput */])), core["_30" /* ɵdid */](16, 671744, null, 0, esm5_forms["q" /* NgModel */], [[8, null], [8, null], [8, null], [8, null]], { model: [0, "model"] }, { update: "ngModelChange" }), core["_50" /* ɵprd */](2048, null, esm5_forms["m" /* NgControl */], null, [esm5_forms["q" /* NgModel */]]), core["_30" /* ɵdid */](18, 16384, null, 0, esm5_forms["n" /* NgControlStatus */], [esm5_forms["m" /* NgControl */]], null, null), core["_30" /* ɵdid */](19, 5423104, null, 0, input["a" /* TextInput */], [config["a" /* Config */], platform["a" /* Platform */], util_form["a" /* Form */], app_app["a" /* App */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, content["a" /* Content */]], [2, item["a" /* Item */]], [2, esm5_forms["m" /* NgControl */]], dom_controller["a" /* DomController */]], { type: [0, "type"], placeholder: [1, "placeholder"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_31" /* ɵeld */](23, 0, null, null, 15, "ion-item", [["class", "item item-block"]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](24, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 13, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 14, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 15, { _icons: 1 }), core["_30" /* ɵdid */](28, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n        "])), (_l()(), core["_31" /* ɵeld */](30, 0, null, 1, 3, "ion-label", [["stacked", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](31, 16384, [[13, 4]], 0, label["a" /* Label */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, ""], [8, null], [8, null]], null, null), (_l()(), core["_55" /* ɵted */](32, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n        "])), (_l()(), core["_31" /* ɵeld */](35, 0, null, 3, 2, "core-rich-text-editor", [["item-content", ""]], null, [[null, "contentChanged"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("contentChanged" === en)) {
        var pd_0 = (_co.onMessageChange($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, rich_text_editor_ngfactory["b" /* View_CoreRichTextEditorComponent_0 */], rich_text_editor_ngfactory["a" /* RenderType_CoreRichTextEditorComponent */])), core["_30" /* ɵdid */](36, 1228800, null, 0, rich_text_editor["a" /* CoreRichTextEditorComponent */], [dom["a" /* CoreDomUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], sites["a" /* CoreSitesProvider */], filepool["a" /* CoreFilepoolProvider */], [2, content["a" /* Content */]], core["t" /* ElementRef */], events["a" /* CoreEventsProvider */], utils_utils["a" /* CoreUtilsProvider */], platform["a" /* Platform */]], { placeholder: [0, "placeholder"], control: [1, "control"], name: [2, "name"], component: [3, "component"], componentId: [4, "componentId"] }, { contentChanged: "contentChanged" }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModForumPostComponent_10)), core["_30" /* ɵdid */](41, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_31" /* ɵeld */](43, 0, null, null, 27, "ion-grid", [["class", "grid"]], null, null, null, null, null)), core["_30" /* ɵdid */](44, 16384, null, 0, grid["a" /* Grid */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_31" /* ɵeld */](46, 0, null, null, 20, "ion-row", [["class", "row"]], null, null, null, null, null)), core["_30" /* ɵdid */](47, 16384, null, 0, row["a" /* Row */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](49, 0, null, null, 7, "ion-col", [["class", "col"]], null, null, null, null, null)), core["_30" /* ɵdid */](50, 16384, null, 0, col["a" /* Col */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ɵeld */](52, 0, null, null, 3, "button", [["block", ""], ["ion-button", ""]], [[8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.reply() !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](53, 1097728, null, 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { block: [0, "block"] }, null), (_l()(), core["_55" /* ɵted */](54, 0, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](58, 0, null, null, 7, "ion-col", [["class", "col"]], null, null, null, null, null)), core["_30" /* ɵdid */](59, 16384, null, 0, col["a" /* Col */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ɵeld */](61, 0, null, null, 3, "button", [["block", ""], ["color", "light"], ["ion-button", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.cancel() !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](62, 1097728, null, 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { color: [0, "color"], block: [1, "block"] }, null), (_l()(), core["_55" /* ɵted */](63, 0, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModForumPostComponent_11)), core["_30" /* ɵdid */](69, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_9 = _co.replyData.subject; _ck(_v, 16, 0, currVal_9); var currVal_10 = "text"; var currVal_11 = core["_56" /* ɵunv */](_v, 19, 1, core["_44" /* ɵnov */](_v, 20).transform("addon.mod_forum.subject")); _ck(_v, 19, 0, currVal_10, currVal_11); var currVal_13 = core["_56" /* ɵunv */](_v, 36, 0, core["_44" /* ɵnov */](_v, 37).transform("addon.mod_forum.message")); var currVal_14 = _co.messageControl; var currVal_15 = ("mod_forum_reply_" + _co.post.id); var currVal_16 = _co.component; var currVal_17 = _co.componentId; _ck(_v, 36, 0, currVal_13, currVal_14, currVal_15, currVal_16, currVal_17); var currVal_18 = (_co.forum.id && (_co.forum.maxattachments > 0)); _ck(_v, 41, 0, currVal_18); var currVal_20 = ""; _ck(_v, 53, 0, currVal_20); var currVal_22 = "light"; var currVal_23 = ""; _ck(_v, 62, 0, currVal_22, currVal_23); var currVal_25 = _co.replyData.isEditing; _ck(_v, 69, 0, currVal_25); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = ("addon-forum-reply-edit-form-" + _co.uniqueId); _ck(_v, 0, 0, currVal_0); var currVal_1 = core["_56" /* ɵunv */](_v, 12, 0, core["_44" /* ɵnov */](_v, 13).transform("addon.mod_forum.subject")); _ck(_v, 12, 0, currVal_1); var currVal_2 = core["_44" /* ɵnov */](_v, 18).ngClassUntouched; var currVal_3 = core["_44" /* ɵnov */](_v, 18).ngClassTouched; var currVal_4 = core["_44" /* ɵnov */](_v, 18).ngClassPristine; var currVal_5 = core["_44" /* ɵnov */](_v, 18).ngClassDirty; var currVal_6 = core["_44" /* ɵnov */](_v, 18).ngClassValid; var currVal_7 = core["_44" /* ɵnov */](_v, 18).ngClassInvalid; var currVal_8 = core["_44" /* ɵnov */](_v, 18).ngClassPending; _ck(_v, 15, 0, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8); var currVal_12 = core["_56" /* ɵunv */](_v, 32, 0, core["_44" /* ɵnov */](_v, 33).transform("addon.mod_forum.message")); _ck(_v, 32, 0, currVal_12); var currVal_19 = ((_co.replyData.subject == "") || (_co.replyData.message == null)); _ck(_v, 52, 0, currVal_19); var currVal_21 = core["_56" /* ɵunv */](_v, 54, 0, core["_44" /* ɵnov */](_v, 55).transform("addon.mod_forum.posttoforum")); _ck(_v, 54, 0, currVal_21); var currVal_24 = core["_56" /* ɵunv */](_v, 63, 0, core["_44" /* ɵnov */](_v, 64).transform("core.cancel")); _ck(_v, 63, 0, currVal_24); }); }
function View_AddonModForumPostComponent_0(_l) { return core["_57" /* ɵvid */](0, [core["_47" /* ɵpid */](0, date_day_or_time["a" /* CoreDateDayOrTimePipe */], [logger["a" /* CoreLoggerProvider */], translate_service["a" /* TranslateService */], time["a" /* CoreTimeUtilsProvider */]]), (_l()(), core["_31" /* ɵeld */](1, 0, null, null, 28, "ion-card-header", [["no-padding", ""], ["text-wrap", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](2, 16384, null, 0, card_header["a" /* CardHeader */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_31" /* ɵeld */](4, 0, null, null, 24, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](5, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 1, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 2, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 3, { _icons: 1 }), core["_30" /* ɵdid */](9, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n        "])), (_l()(), core["_31" /* ɵeld */](11, 0, null, 0, 2, "ion-avatar", [["core-user-avatar", ""], ["item-start", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.openUserProfile(_co.post.userid) !== false);
        ad = (pd_0 && ad);
    } return ad; }, user_avatar_ngfactory["b" /* View_CoreUserAvatarComponent_0 */], user_avatar_ngfactory["a" /* RenderType_CoreUserAvatarComponent */])), core["_30" /* ɵdid */](12, 16384, null, 0, avatar["a" /* Avatar */], [], null, null), core["_30" /* ɵdid */](13, 770048, null, 0, user_avatar["a" /* CoreUserAvatarComponent */], [nav_controller["a" /* NavController */], sites["a" /* CoreSitesProvider */], utils_utils["a" /* CoreUtilsProvider */], app["a" /* CoreAppProvider */], events["a" /* CoreEventsProvider */]], { user: [0, "user"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n        "])), (_l()(), core["_31" /* ɵeld */](15, 0, null, 2, 3, "h2", [], null, null, null, null, null)), (_l()(), core["_31" /* ɵeld */](16, 0, null, null, 2, "span", [], [[2, "core-bold", null]], null, null, null, null)), (_l()(), core["_31" /* ɵeld */](17, 0, null, null, 1, "core-format-text", [], null, null, null, null, null)), core["_30" /* ɵdid */](18, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform["a" /* Platform */], utils_utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], app["a" /* CoreAppProvider */], providers_helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */]], { text: [0, "text"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n        "])), (_l()(), core["_31" /* ɵeld */](20, 0, null, 2, 7, "p", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModForumPostComponent_1)), core["_30" /* ɵdid */](23, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModForumPostComponent_2)), core["_30" /* ɵdid */](26, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](27, null, ["\n            ", "\n        "])), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_31" /* ɵeld */](31, 0, null, null, 11, "ion-card-content", [["padding-top", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](32, 16384, null, 0, card_content["a" /* CardContent */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_31" /* ɵeld */](34, 0, null, null, 1, "core-format-text", [], null, null, null, null, null)), core["_30" /* ɵdid */](35, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform["a" /* Platform */], utils_utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], app["a" /* CoreAppProvider */], providers_helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */]], { text: [0, "text"], component: [1, "component"], componentId: [2, "componentId"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_31" /* ɵeld */](37, 0, null, null, 4, "div", [["no-lines", ""]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModForumPostComponent_4)), core["_30" /* ɵdid */](40, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModForumPostComponent_7)), core["_30" /* ɵdid */](45, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModForumPostComponent_8)), core["_30" /* ɵdid */](48, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModForumPostComponent_9)), core["_30" /* ɵdid */](51, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.post; _ck(_v, 13, 0, currVal_0); var currVal_2 = _co.post.subject; _ck(_v, 18, 0, currVal_2); var currVal_3 = !_co.post.modified; _ck(_v, 23, 0, currVal_3); var currVal_4 = _co.post.modified; _ck(_v, 26, 0, currVal_4); var currVal_6 = _co.post.message; var currVal_7 = _co.component; var currVal_8 = _co.componentId; _ck(_v, 35, 0, currVal_6, currVal_7, currVal_8); var currVal_9 = _co.post.attachments; _ck(_v, 40, 0, currVal_9); var currVal_10 = (_co.post.id && _co.post.canreply); _ck(_v, 45, 0, currVal_10); var currVal_11 = (!_co.post.id && (!_co.replyData.isEditing || (_co.replyData.replyingTo != _co.post.parent))); _ck(_v, 48, 0, currVal_11); var currVal_12 = (((_co.post.id && !_co.replyData.isEditing) && (_co.replyData.replyingTo == _co.post.id)) || ((!_co.post.id && _co.replyData.isEditing) && (_co.replyData.replyingTo == _co.post.parent))); _ck(_v, 51, 0, currVal_12); }, function (_ck, _v) { var _co = _v.component; var currVal_1 = (_co.post.parent == 0); _ck(_v, 16, 0, currVal_1); var currVal_5 = _co.post.userfullname; _ck(_v, 27, 0, currVal_5); }); }
function View_AddonModForumPostComponent_Host_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "addon-mod-forum-post", [], null, null, null, View_AddonModForumPostComponent_0, RenderType_AddonModForumPostComponent)), core["_30" /* ɵdid */](1, 245760, null, 0, post["a" /* AddonModForumPostComponent */], [nav_controller["a" /* NavController */], fileuploader["a" /* CoreFileUploaderProvider */], src_providers_sync["a" /* CoreSyncProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], forum["a" /* AddonModForumProvider */], helper["a" /* AddonModForumHelperProvider */], offline["a" /* AddonModForumOfflineProvider */], providers_sync["a" /* AddonModForumSyncProvider */], [2, split_view["a" /* CoreSplitViewComponent */]]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var AddonModForumPostComponentNgFactory = core["_27" /* ɵccf */]("addon-mod-forum-post", post["a" /* AddonModForumPostComponent */], View_AddonModForumPostComponent_Host_0, { post: "post", courseId: "courseId", discussionId: "discussionId", component: "component", componentId: "componentId", replyData: "replyData", originalData: "originalData", trackPosts: "trackPosts", forum: "forum", defaultSubject: "defaultSubject" }, { onPostChange: "onPostChange" }, []);

//# sourceMappingURL=post.ngfactory.js.map
// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-divider.js
var item_divider = __webpack_require__(107);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-header.js
var toolbar_header = __webpack_require__(435);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/view-controller.js
var view_controller = __webpack_require__(36);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/navbar.ngfactory.js
var navbar_ngfactory = __webpack_require__(1354);

// EXTERNAL MODULE: ./src/directives/back-button.ts
var back_button = __webpack_require__(663);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-item.js
var toolbar_item = __webpack_require__(436);

// EXTERNAL MODULE: ./src/components/navbar-buttons/navbar-buttons.ngfactory.js
var navbar_buttons_ngfactory = __webpack_require__(88);

// EXTERNAL MODULE: ./src/components/navbar-buttons/navbar-buttons.ts
var navbar_buttons = __webpack_require__(81);

// EXTERNAL MODULE: ./src/components/context-menu/context-menu.ngfactory.js
var context_menu_ngfactory = __webpack_require__(79);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/popover/popover-controller.js
var popover_controller = __webpack_require__(62);

// EXTERNAL MODULE: ./src/components/tabs/tab.ts
var tab = __webpack_require__(68);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.ngfactory.js
var content_ngfactory = __webpack_require__(185);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/keyboard.js
var keyboard = __webpack_require__(106);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/refresher/refresher.js
var refresher = __webpack_require__(144);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/refresher/refresher-content.ngfactory.js
var refresher_content_ngfactory = __webpack_require__(201);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/refresher/refresher-content.js
var refresher_content = __webpack_require__(158);

// EXTERNAL MODULE: ./src/components/loading/loading.ngfactory.js
var loading_ngfactory = __webpack_require__(48);

// EXTERNAL MODULE: ./src/components/loading/loading.ts
var loading = __webpack_require__(47);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-params.js
var nav_params = __webpack_require__(60);

// CONCATENATED MODULE: ./src/addon/mod/forum/pages/discussion/discussion.ngfactory.js
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 


































































var styles_AddonModForumDiscussionPage = [];
var RenderType_AddonModForumDiscussionPage = core["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_AddonModForumDiscussionPage, data: {} });

function View_AddonModForumDiscussionPage_1(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 3, "ion-title", [], null, null, null, toolbar_title_ngfactory["b" /* View_ToolbarTitle_0 */], toolbar_title_ngfactory["a" /* RenderType_ToolbarTitle */])), core["_30" /* ɵdid */](1, 49152, null, 0, toolbar_title["a" /* ToolbarTitle */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), (_l()(), core["_31" /* ɵeld */](2, 0, null, 0, 1, "core-format-text", [], null, null, null, null, null)), core["_30" /* ɵdid */](3, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform["a" /* Platform */], utils_utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], app["a" /* CoreAppProvider */], providers_helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */]], { text: [0, "text"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.discussion.subject; _ck(_v, 3, 0, currVal_0); }, null); }
function View_AddonModForumDiscussionPage_2(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "core-context-menu-item", [], null, [[null, "action"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("action" === en)) {
        var pd_0 = (_co.doRefresh(null, $event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, context_menu_item_ngfactory["b" /* View_CoreContextMenuItemComponent_0 */], context_menu_item_ngfactory["a" /* RenderType_CoreContextMenuItemComponent */])), core["_30" /* ɵdid */](1, 770048, null, 0, context_menu_item["a" /* CoreContextMenuItemComponent */], [context_menu["a" /* CoreContextMenuComponent */]], { content: [0, "content"], iconAction: [1, "iconAction"], closeOnClick: [2, "closeOnClick"], priority: [3, "priority"] }, { action: "action" }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], function (_ck, _v) { var _co = _v.component; var currVal_0 = core["_56" /* ɵunv */](_v, 1, 0, core["_44" /* ɵnov */](_v, 2).transform("addon.mod_forum.refreshposts")); var currVal_1 = _co.refreshIcon; var currVal_2 = false; var currVal_3 = 650; _ck(_v, 1, 0, currVal_0, currVal_1, currVal_2, currVal_3); }, null); }
function View_AddonModForumDiscussionPage_3(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "core-context-menu-item", [], null, [[null, "action"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("action" === en)) {
        var pd_0 = (_co.doRefresh(null, $event, true) !== false);
        ad = (pd_0 && ad);
    } return ad; }, context_menu_item_ngfactory["b" /* View_CoreContextMenuItemComponent_0 */], context_menu_item_ngfactory["a" /* RenderType_CoreContextMenuItemComponent */])), core["_30" /* ɵdid */](1, 770048, null, 0, context_menu_item["a" /* CoreContextMenuItemComponent */], [context_menu["a" /* CoreContextMenuComponent */]], { content: [0, "content"], iconAction: [1, "iconAction"], closeOnClick: [2, "closeOnClick"], priority: [3, "priority"] }, { action: "action" }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], function (_ck, _v) { var _co = _v.component; var currVal_0 = core["_56" /* ɵunv */](_v, 1, 0, core["_44" /* ɵnov */](_v, 2).transform("core.settings.synchronizenow")); var currVal_1 = _co.syncIcon; var currVal_2 = false; var currVal_3 = 550; _ck(_v, 1, 0, currVal_0, currVal_1, currVal_2, currVal_3); }, null); }
function View_AddonModForumDiscussionPage_4(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 7, "ion-card", [["class", "core-warning-card"]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, card["a" /* Card */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 1, "ion-icon", [["name", "warning"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](4, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ɵted */](5, null, [" ", "\n        "])), core["_48" /* ɵpod */](6, { $a: 0 }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], function (_ck, _v) { var currVal_1 = "warning"; _ck(_v, 4, 0, currVal_1); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = core["_44" /* ɵnov */](_v, 4)._hidden; _ck(_v, 3, 0, currVal_0); var currVal_2 = core["_56" /* ɵunv */](_v, 5, 0, core["_44" /* ɵnov */](_v, 7).transform("core.hasdatatosync", _ck(_v, 6, 0, _co.discussionStr))); _ck(_v, 5, 0, currVal_2); }); }
function View_AddonModForumDiscussionPage_5(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 6, "ion-card", [["class", "core-warning-card"]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, card["a" /* Card */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 1, "ion-icon", [["name", "warning"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](4, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ɵted */](5, null, [" ", "\n        "])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], function (_ck, _v) { var currVal_1 = "warning"; _ck(_v, 4, 0, currVal_1); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 4)._hidden; _ck(_v, 3, 0, currVal_0); var currVal_2 = core["_56" /* ɵunv */](_v, 5, 0, core["_44" /* ɵnov */](_v, 6).transform("addon.mod_forum.discussionlocked")); _ck(_v, 5, 0, currVal_2); }); }
function View_AddonModForumDiscussionPage_6(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 5, "ion-card", [["class", "highlight"], ["margin-bottom", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, card["a" /* Card */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 1, "addon-mod-forum-post", [], null, [[null, "onPostChange"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("onPostChange" === en)) {
        var pd_0 = (_co.postListChanged() !== false);
        ad = (pd_0 && ad);
    } return ad; }, View_AddonModForumPostComponent_0, RenderType_AddonModForumPostComponent)), core["_30" /* ɵdid */](4, 245760, null, 0, post["a" /* AddonModForumPostComponent */], [nav_controller["a" /* NavController */], fileuploader["a" /* CoreFileUploaderProvider */], src_providers_sync["a" /* CoreSyncProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], forum["a" /* AddonModForumProvider */], helper["a" /* AddonModForumHelperProvider */], offline["a" /* AddonModForumOfflineProvider */], providers_sync["a" /* AddonModForumSyncProvider */], [2, split_view["a" /* CoreSplitViewComponent */]]], { post: [0, "post"], courseId: [1, "courseId"], discussionId: [2, "discussionId"], component: [3, "component"], componentId: [4, "componentId"], replyData: [5, "replyData"], originalData: [6, "originalData"], trackPosts: [7, "trackPosts"], forum: [8, "forum"], defaultSubject: [9, "defaultSubject"] }, { onPostChange: "onPostChange" }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.discussion; var currVal_1 = _co.courseId; var currVal_2 = _co.discussionId; var currVal_3 = _co.component; var currVal_4 = _co.cmId; var currVal_5 = _co.replyData; var currVal_6 = _co.originalData; var currVal_7 = _co.trackPosts; var currVal_8 = _co.forum; var currVal_9 = _co.defaultSubject; _ck(_v, 4, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8, currVal_9); }, null); }
function View_AddonModForumDiscussionPage_9(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 5, "ion-item-divider", [["class", "item item-divider"]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 4, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 5, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 6, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_divider["a" /* ItemDivider */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null)], null, null); }
function View_AddonModForumDiscussionPage_8(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 7, null, null, null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModForumDiscussionPage_9)), core["_30" /* ɵdid */](3, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ɵeld */](5, 0, null, null, 1, "addon-mod-forum-post", [], null, [[null, "onPostChange"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("onPostChange" === en)) {
        var pd_0 = (_co.postListChanged() !== false);
        ad = (pd_0 && ad);
    } return ad; }, View_AddonModForumPostComponent_0, RenderType_AddonModForumPostComponent)), core["_30" /* ɵdid */](6, 245760, null, 0, post["a" /* AddonModForumPostComponent */], [nav_controller["a" /* NavController */], fileuploader["a" /* CoreFileUploaderProvider */], src_providers_sync["a" /* CoreSyncProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], forum["a" /* AddonModForumProvider */], helper["a" /* AddonModForumHelperProvider */], offline["a" /* AddonModForumOfflineProvider */], providers_sync["a" /* AddonModForumSyncProvider */], [2, split_view["a" /* CoreSplitViewComponent */]]], { post: [0, "post"], courseId: [1, "courseId"], discussionId: [2, "discussionId"], component: [3, "component"], componentId: [4, "componentId"], replyData: [5, "replyData"], originalData: [6, "originalData"], trackPosts: [7, "trackPosts"], forum: [8, "forum"], defaultSubject: [9, "defaultSubject"] }, { onPostChange: "onPostChange" }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = !_v.context.first; _ck(_v, 3, 0, currVal_0); var currVal_1 = _v.context.$implicit; var currVal_2 = _co.courseId; var currVal_3 = _co.discussionId; var currVal_4 = _co.component; var currVal_5 = _co.cmId; var currVal_6 = _co.replyData; var currVal_7 = _co.originalData; var currVal_8 = _co.trackPosts; var currVal_9 = _co.forum; var currVal_10 = _co.defaultSubject; _ck(_v, 6, 0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8, currVal_9, currVal_10); }, null); }
function View_AddonModForumDiscussionPage_7(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 5, "ion-card", [], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, card["a" /* Card */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModForumDiscussionPage_8)), core["_30" /* ɵdid */](4, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.posts; _ck(_v, 4, 0, currVal_0); }, null); }
function View_AddonModForumDiscussionPage_12(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 0, null, null, null, null, null, null, null))], null, null); }
function View_AddonModForumDiscussionPage_11(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 5, null, null, null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 2, null, View_AddonModForumDiscussionPage_12)), core["_30" /* ɵdid */](3, 540672, null, 0, common["r" /* NgTemplateOutlet */], [core["_11" /* ViewContainerRef */]], { ngTemplateOutletContext: [0, "ngTemplateOutletContext"], ngTemplateOutlet: [1, "ngTemplateOutlet"] }, null), core["_48" /* ɵpod */](4, { post: 0 }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "]))], function (_ck, _v) { var currVal_0 = _ck(_v, 4, 0, _v.context.$implicit); var currVal_1 = core["_44" /* ɵnov */](_v.parent.parent, 76); _ck(_v, 3, 0, currVal_0, currVal_1); }, null); }
function View_AddonModForumDiscussionPage_10(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 4, null, null, null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModForumDiscussionPage_11)), core["_30" /* ɵdid */](3, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.posts; _ck(_v, 3, 0, currVal_0); }, null); }
function View_AddonModForumDiscussionPage_16(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 0, null, null, null, null, null, null, null))], null, null); }
function View_AddonModForumDiscussionPage_15(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 5, null, null, null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 2, null, View_AddonModForumDiscussionPage_16)), core["_30" /* ɵdid */](3, 540672, null, 0, common["r" /* NgTemplateOutlet */], [core["_11" /* ViewContainerRef */]], { ngTemplateOutletContext: [0, "ngTemplateOutletContext"], ngTemplateOutlet: [1, "ngTemplateOutlet"] }, null), core["_48" /* ɵpod */](4, { post: 0 }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "]))], function (_ck, _v) { var currVal_0 = _ck(_v, 4, 0, _v.context.$implicit); var currVal_1 = core["_44" /* ɵnov */](_v.parent.parent.parent, 76); _ck(_v, 3, 0, currVal_0, currVal_1); }, null); }
function View_AddonModForumDiscussionPage_14(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 4, "div", [["padding-left", ""]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModForumDiscussionPage_15)), core["_30" /* ɵdid */](3, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "]))], function (_ck, _v) { var currVal_0 = _v.parent.context.post.children; _ck(_v, 3, 0, currVal_0); }, null); }
function View_AddonModForumDiscussionPage_13(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](1, 0, null, null, 5, "ion-card", [], null, null, null, null, null)), core["_30" /* ɵdid */](2, 16384, null, 0, card["a" /* Card */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ɵeld */](4, 0, null, null, 1, "addon-mod-forum-post", [], null, [[null, "onPostChange"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("onPostChange" === en)) {
        var pd_0 = (_co.postListChanged() !== false);
        ad = (pd_0 && ad);
    } return ad; }, View_AddonModForumPostComponent_0, RenderType_AddonModForumPostComponent)), core["_30" /* ɵdid */](5, 245760, null, 0, post["a" /* AddonModForumPostComponent */], [nav_controller["a" /* NavController */], fileuploader["a" /* CoreFileUploaderProvider */], src_providers_sync["a" /* CoreSyncProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], forum["a" /* AddonModForumProvider */], helper["a" /* AddonModForumHelperProvider */], offline["a" /* AddonModForumOfflineProvider */], providers_sync["a" /* AddonModForumSyncProvider */], [2, split_view["a" /* CoreSplitViewComponent */]]], { post: [0, "post"], courseId: [1, "courseId"], discussionId: [2, "discussionId"], component: [3, "component"], componentId: [4, "componentId"], replyData: [5, "replyData"], originalData: [6, "originalData"], trackPosts: [7, "trackPosts"], forum: [8, "forum"], defaultSubject: [9, "defaultSubject"] }, { onPostChange: "onPostChange" }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModForumDiscussionPage_14)), core["_30" /* ɵdid */](9, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _v.context.post; var currVal_1 = _co.courseId; var currVal_2 = _co.discussionId; var currVal_3 = _co.component; var currVal_4 = _co.cmId; var currVal_5 = _co.replyData; var currVal_6 = _co.originalData; var currVal_7 = _co.trackPosts; var currVal_8 = _co.forum; var currVal_9 = _co.defaultSubject; _ck(_v, 5, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8, currVal_9); var currVal_10 = (_v.context.post.children.length && _v.context.post.children[0].subject); _ck(_v, 9, 0, currVal_10); }, null); }
function View_AddonModForumDiscussionPage_0(_l) { return core["_57" /* ɵvid */](0, [core["_52" /* ɵqud */](402653184, 1, { content: 0 }), (_l()(), core["_31" /* ɵeld */](1, 0, null, null, 16, "ion-header", [], null, null, null, null, null)), core["_30" /* ɵdid */](2, 16384, null, 0, toolbar_header["a" /* Header */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, view_controller["a" /* ViewController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_31" /* ɵeld */](4, 0, null, null, 12, "ion-navbar", [["class", "toolbar"], ["core-back-button", ""]], [[8, "hidden", 0], [2, "statusbar-padding", null]], null, null, navbar_ngfactory["b" /* View_Navbar_0 */], navbar_ngfactory["a" /* RenderType_Navbar */])), core["_30" /* ɵdid */](5, 49152, null, 0, navbar["a" /* Navbar */], [app_app["a" /* App */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_30" /* ɵdid */](6, 212992, null, 0, back_button["a" /* CoreBackButtonDirective */], [navbar["a" /* Navbar */], platform["a" /* Platform */], translate_service["a" /* TranslateService */], events["a" /* CoreEventsProvider */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 3, 1, null, View_AddonModForumDiscussionPage_1)), core["_30" /* ɵdid */](9, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n        "])), (_l()(), core["_31" /* ɵeld */](11, 0, null, 2, 4, "ion-buttons", [["end", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](12, 16384, null, 1, toolbar_item["a" /* ToolbarItem */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), core["_52" /* ɵqud */](603979776, 2, { _buttons: 1 }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_31" /* ɵeld */](19, 0, null, null, 25, "core-navbar-buttons", [["end", ""]], null, null, null, navbar_buttons_ngfactory["b" /* View_CoreNavBarButtonsComponent_0 */], navbar_buttons_ngfactory["a" /* RenderType_CoreNavBarButtonsComponent */])), core["_30" /* ɵdid */](20, 245760, null, 1, navbar_buttons["a" /* CoreNavBarButtonsComponent */], [core["t" /* ElementRef */], logger["a" /* CoreLoggerProvider */], dom["a" /* CoreDomUtilsProvider */]], null, null), core["_52" /* ɵqud */](603979776, 3, { buttons: 1 }), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n    "])), (_l()(), core["_31" /* ɵeld */](23, 0, null, 0, 20, "core-context-menu", [], null, null, null, context_menu_ngfactory["b" /* View_CoreContextMenuComponent_0 */], context_menu_ngfactory["a" /* RenderType_CoreContextMenuComponent */])), core["_30" /* ɵdid */](24, 245760, null, 0, context_menu["a" /* CoreContextMenuComponent */], [translate_service["a" /* TranslateService */], popover_controller["a" /* PopoverController */], core["t" /* ElementRef */], dom["a" /* CoreDomUtilsProvider */], [2, tab["a" /* CoreTabComponent */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonModForumDiscussionPage_2)), core["_30" /* ɵdid */](27, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonModForumDiscussionPage_3)), core["_30" /* ɵdid */](30, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_31" /* ɵeld */](32, 0, null, 0, 2, "core-context-menu-item", [["iconAction", "arrow-round-down"]], null, [[null, "action"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("action" === en)) {
        var pd_0 = (_co.changeSort("flat-oldest") !== false);
        ad = (pd_0 && ad);
    } return ad; }, context_menu_item_ngfactory["b" /* View_CoreContextMenuItemComponent_0 */], context_menu_item_ngfactory["a" /* RenderType_CoreContextMenuItemComponent */])), core["_30" /* ɵdid */](33, 770048, null, 0, context_menu_item["a" /* CoreContextMenuItemComponent */], [context_menu["a" /* CoreContextMenuComponent */]], { content: [0, "content"], iconAction: [1, "iconAction"], priority: [2, "priority"], hidden: [3, "hidden"] }, { action: "action" }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_31" /* ɵeld */](36, 0, null, 0, 2, "core-context-menu-item", [["iconAction", "arrow-round-up"]], null, [[null, "action"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("action" === en)) {
        var pd_0 = (_co.changeSort("flat-newest") !== false);
        ad = (pd_0 && ad);
    } return ad; }, context_menu_item_ngfactory["b" /* View_CoreContextMenuItemComponent_0 */], context_menu_item_ngfactory["a" /* RenderType_CoreContextMenuItemComponent */])), core["_30" /* ɵdid */](37, 770048, null, 0, context_menu_item["a" /* CoreContextMenuItemComponent */], [context_menu["a" /* CoreContextMenuComponent */]], { content: [0, "content"], iconAction: [1, "iconAction"], priority: [2, "priority"], hidden: [3, "hidden"] }, { action: "action" }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_31" /* ɵeld */](40, 0, null, 0, 2, "core-context-menu-item", [["iconAction", "swap"]], null, [[null, "action"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("action" === en)) {
        var pd_0 = (_co.changeSort("nested") !== false);
        ad = (pd_0 && ad);
    } return ad; }, context_menu_item_ngfactory["b" /* View_CoreContextMenuItemComponent_0 */], context_menu_item_ngfactory["a" /* RenderType_CoreContextMenuItemComponent */])), core["_30" /* ɵdid */](41, 770048, null, 0, context_menu_item["a" /* CoreContextMenuItemComponent */], [context_menu["a" /* CoreContextMenuComponent */]], { content: [0, "content"], iconAction: [1, "iconAction"], priority: [2, "priority"], hidden: [3, "hidden"] }, { action: "action" }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_31" /* ɵeld */](46, 0, null, null, 32, "ion-content", [], [[2, "statusbar-padding", null], [2, "has-refresher", null]], null, null, content_ngfactory["b" /* View_Content_0 */], content_ngfactory["a" /* RenderType_Content */])), core["_30" /* ɵdid */](47, 4374528, [[1, 4]], 0, content["a" /* Content */], [config["a" /* Config */], platform["a" /* Platform */], dom_controller["a" /* DomController */], core["t" /* ElementRef */], core["V" /* Renderer */], app_app["a" /* App */], keyboard["a" /* Keyboard */], core["M" /* NgZone */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n    "])), (_l()(), core["_31" /* ɵeld */](49, 0, null, 2, 6, "ion-refresher", [], [[2, "refresher-active", null], [4, "top", null]], [[null, "ionRefresh"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("ionRefresh" === en)) {
        var pd_0 = (_co.doRefresh($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), core["_30" /* ɵdid */](50, 212992, null, 0, refresher["a" /* Refresher */], [platform["a" /* Platform */], content["a" /* Content */], core["M" /* NgZone */], gesture_controller["l" /* GestureController */]], { enabled: [0, "enabled"] }, { ionRefresh: "ionRefresh" }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_31" /* ɵeld */](52, 0, null, null, 2, "ion-refresher-content", [], [[1, "state", 0]], null, null, refresher_content_ngfactory["b" /* View_RefresherContent_0 */], refresher_content_ngfactory["a" /* RenderType_RefresherContent */])), core["_30" /* ɵdid */](53, 114688, null, 0, refresher_content["a" /* RefresherContent */], [refresher["a" /* Refresher */], config["a" /* Config */]], { pullingText: [0, "pullingText"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n\n    "])), (_l()(), core["_31" /* ɵeld */](57, 0, null, 1, 20, "core-loading", [], null, null, null, loading_ngfactory["b" /* View_CoreLoadingComponent_0 */], loading_ngfactory["a" /* RenderType_CoreLoadingComponent */])), core["_30" /* ɵdid */](58, 638976, null, 0, loading["a" /* CoreLoadingComponent */], [translate_service["a" /* TranslateService */], core["t" /* ElementRef */], events["a" /* CoreEventsProvider */], utils_utils["a" /* CoreUtilsProvider */]], { hideUntil: [0, "hideUntil"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonModForumDiscussionPage_4)), core["_30" /* ɵdid */](62, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonModForumDiscussionPage_5)), core["_30" /* ɵdid */](65, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonModForumDiscussionPage_6)), core["_30" /* ɵdid */](68, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonModForumDiscussionPage_7)), core["_30" /* ɵdid */](71, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonModForumDiscussionPage_10)), core["_30" /* ɵdid */](74, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n\n        "])), (_l()(), core["_26" /* ɵand */](0, [["nestedPosts", 2]], 0, 0, null, View_AddonModForumDiscussionPage_13)), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; _ck(_v, 6, 0); var currVal_2 = _co.discussion; _ck(_v, 9, 0, currVal_2); _ck(_v, 20, 0); _ck(_v, 24, 0); var currVal_3 = ((_co.discussionLoaded && !_co.postHasOffline) && _co.isOnline); _ck(_v, 27, 0, currVal_3); var currVal_4 = (((_co.discussionLoaded && !_co.isSplitViewOn) && _co.postHasOffline) && _co.isOnline); _ck(_v, 30, 0, currVal_4); var currVal_5 = core["_56" /* ɵunv */](_v, 33, 0, core["_44" /* ɵnov */](_v, 34).transform("addon.mod_forum.modeflatoldestfirst")); var currVal_6 = "arrow-round-down"; var currVal_7 = 500; var currVal_8 = (_co.sort == "flat-oldest"); _ck(_v, 33, 0, currVal_5, currVal_6, currVal_7, currVal_8); var currVal_9 = core["_56" /* ɵunv */](_v, 37, 0, core["_44" /* ɵnov */](_v, 38).transform("addon.mod_forum.modeflatnewestfirst")); var currVal_10 = "arrow-round-up"; var currVal_11 = 450; var currVal_12 = (_co.sort == "flat-newest"); _ck(_v, 37, 0, currVal_9, currVal_10, currVal_11, currVal_12); var currVal_13 = core["_56" /* ɵunv */](_v, 41, 0, core["_44" /* ɵnov */](_v, 42).transform("addon.mod_forum.modenested")); var currVal_14 = "swap"; var currVal_15 = 400; var currVal_16 = (_co.sort == "nested"); _ck(_v, 41, 0, currVal_13, currVal_14, currVal_15, currVal_16); var currVal_21 = _co.discussionLoaded; _ck(_v, 50, 0, currVal_21); var currVal_23 = core["_34" /* ɵinlineInterpolate */](1, "", core["_56" /* ɵunv */](_v, 53, 0, core["_44" /* ɵnov */](_v, 54).transform("core.pulltorefresh")), ""); _ck(_v, 53, 0, currVal_23); var currVal_24 = _co.discussionLoaded; _ck(_v, 58, 0, currVal_24); var currVal_25 = _co.postHasOffline; _ck(_v, 62, 0, currVal_25); var currVal_26 = _co.locked; _ck(_v, 65, 0, currVal_26); var currVal_27 = _co.discussion; _ck(_v, 68, 0, currVal_27); var currVal_28 = (_co.sort != "nested"); _ck(_v, 71, 0, currVal_28); var currVal_29 = (_co.sort == "nested"); _ck(_v, 74, 0, currVal_29); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 5)._hidden; var currVal_1 = core["_44" /* ɵnov */](_v, 5)._sbPadding; _ck(_v, 4, 0, currVal_0, currVal_1); var currVal_17 = core["_44" /* ɵnov */](_v, 47).statusbarPadding; var currVal_18 = core["_44" /* ɵnov */](_v, 47)._hasRefresher; _ck(_v, 46, 0, currVal_17, currVal_18); var currVal_19 = (core["_44" /* ɵnov */](_v, 50).state !== "inactive"); var currVal_20 = core["_44" /* ɵnov */](_v, 50)._top; _ck(_v, 49, 0, currVal_19, currVal_20); var currVal_22 = core["_44" /* ɵnov */](_v, 53).r.state; _ck(_v, 52, 0, currVal_22); }); }
function View_AddonModForumDiscussionPage_Host_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "page-addon-mod-forum-discussion", [], null, null, null, View_AddonModForumDiscussionPage_0, RenderType_AddonModForumDiscussionPage)), core["_30" /* ɵdid */](1, 180224, null, 0, discussion_AddonModForumDiscussionPage, [nav_params["a" /* NavParams */], _ionic_native_network["a" /* Network */], core["M" /* NgZone */], app["a" /* CoreAppProvider */], events["a" /* CoreEventsProvider */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_utils["a" /* CoreUtilsProvider */], translate_service["a" /* TranslateService */], fileuploader["a" /* CoreFileUploaderProvider */], forum["a" /* AddonModForumProvider */], offline["a" /* AddonModForumOfflineProvider */], helper["a" /* AddonModForumHelperProvider */], providers_sync["a" /* AddonModForumSyncProvider */], [2, split_view["a" /* CoreSplitViewComponent */]]], null, null)], null, null); }
var AddonModForumDiscussionPageNgFactory = core["_27" /* ɵccf */]("page-addon-mod-forum-discussion", discussion_AddonModForumDiscussionPage, View_AddonModForumDiscussionPage_Host_0, {}, {}, []);

//# sourceMappingURL=discussion.ngfactory.js.map
// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.loader.js
var translate_loader = __webpack_require__(333);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.compiler.js
var translate_compiler = __webpack_require__(334);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.parser.js
var translate_parser = __webpack_require__(336);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/missing-translation-handler.js
var missing_translation_handler = __webpack_require__(335);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.store.js
var translate_store = __webpack_require__(434);

// EXTERNAL MODULE: ./node_modules/ionic-angular/module.js
var ionic_angular_module = __webpack_require__(662);

// EXTERNAL MODULE: ./src/pipes/pipes.module.ts + 2 modules
var pipes_module = __webpack_require__(105);

// EXTERNAL MODULE: ./src/core/course/components/components.module.ts
var course_components_components_module = __webpack_require__(65);

// EXTERNAL MODULE: ./node_modules/ionic-angular/util/module-loader.js
var module_loader = __webpack_require__(248);

// CONCATENATED MODULE: ./src/addon/mod/forum/pages/discussion/discussion.module.ngfactory.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddonModForumDiscussionPageModuleNgFactory", function() { return AddonModForumDiscussionPageModuleNgFactory; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 


































var AddonModForumDiscussionPageModuleNgFactory = core["_28" /* ɵcmf */](discussion_module_AddonModForumDiscussionPageModule, [], function (_l) { return core["_40" /* ɵmod */]([core["_41" /* ɵmpd */](512, core["o" /* ComponentFactoryResolver */], core["_21" /* ɵCodegenComponentFactoryResolver */], [[8, [action_sheet_component_ngfactory["a" /* ActionSheetCmpNgFactory */], alert_component_ngfactory["a" /* AlertCmpNgFactory */], app_root_ngfactory["a" /* IonicAppNgFactory */], loading_component_ngfactory["a" /* LoadingCmpNgFactory */], modal_component_ngfactory["a" /* ModalCmpNgFactory */], picker_component_ngfactory["a" /* PickerCmpNgFactory */], popover_component_ngfactory["a" /* PopoverCmpNgFactory */], select_popover_component_ngfactory["a" /* SelectPopoverNgFactory */], toast_component_ngfactory["a" /* ToastCmpNgFactory */], context_menu_popover_ngfactory["a" /* CoreContextMenuPopoverComponentNgFactory */], course_picker_menu_popover_ngfactory["a" /* CoreCoursePickerMenuPopoverComponentNgFactory */], recaptchamodal_ngfactory["a" /* CoreRecaptchaModalComponentNgFactory */], unsupported_module_ngfactory["a" /* CoreCourseUnsupportedModuleComponentNgFactory */], index_ngfactory["a" /* AddonModForumIndexComponentNgFactory */], AddonModForumDiscussionPageNgFactory]], [3, core["o" /* ComponentFactoryResolver */]], core["K" /* NgModuleRef */]]), core["_41" /* ɵmpd */](4608, common["m" /* NgLocalization */], common["l" /* NgLocaleLocalization */], [core["G" /* LOCALE_ID */], [2, common["v" /* ɵa */]]]), core["_41" /* ɵmpd */](4608, esm5_forms["x" /* ɵi */], esm5_forms["x" /* ɵi */], []), core["_41" /* ɵmpd */](4608, esm5_forms["d" /* FormBuilder */], esm5_forms["d" /* FormBuilder */], []), core["_41" /* ɵmpd */](4608, translate_loader["b" /* TranslateLoader */], translate_loader["a" /* TranslateFakeLoader */], []), core["_41" /* ɵmpd */](4608, translate_compiler["a" /* TranslateCompiler */], translate_compiler["b" /* TranslateFakeCompiler */], []), core["_41" /* ɵmpd */](4608, translate_parser["b" /* TranslateParser */], translate_parser["a" /* TranslateDefaultParser */], []), core["_41" /* ɵmpd */](4608, missing_translation_handler["b" /* MissingTranslationHandler */], missing_translation_handler["a" /* FakeMissingTranslationHandler */], []), core["_41" /* ɵmpd */](4608, translate_service["a" /* TranslateService */], translate_service["a" /* TranslateService */], [translate_store["a" /* TranslateStore */], translate_loader["b" /* TranslateLoader */], translate_compiler["a" /* TranslateCompiler */], translate_parser["b" /* TranslateParser */], missing_translation_handler["b" /* MissingTranslationHandler */], translate_service["b" /* USE_DEFAULT_LANG */], translate_service["c" /* USE_STORE */]]), core["_41" /* ɵmpd */](512, common["b" /* CommonModule */], common["b" /* CommonModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["v" /* ɵba */], esm5_forms["v" /* ɵba */], []), core["_41" /* ɵmpd */](512, esm5_forms["i" /* FormsModule */], esm5_forms["i" /* FormsModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["s" /* ReactiveFormsModule */], esm5_forms["s" /* ReactiveFormsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["a" /* IonicModule */], ionic_angular_module["a" /* IonicModule */], []), core["_41" /* ɵmpd */](512, _ngx_translate_core["b" /* TranslateModule */], _ngx_translate_core["b" /* TranslateModule */], []), core["_41" /* ɵmpd */](512, directives_module["a" /* CoreDirectivesModule */], directives_module["a" /* CoreDirectivesModule */], []), core["_41" /* ɵmpd */](512, pipes_module["a" /* CorePipesModule */], pipes_module["a" /* CorePipesModule */], []), core["_41" /* ɵmpd */](512, components_module["a" /* CoreComponentsModule */], components_module["a" /* CoreComponentsModule */], []), core["_41" /* ɵmpd */](512, course_components_components_module["a" /* CoreCourseComponentsModule */], course_components_components_module["a" /* CoreCourseComponentsModule */], []), core["_41" /* ɵmpd */](512, components_components_module["a" /* AddonModForumComponentsModule */], components_components_module["a" /* AddonModForumComponentsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["b" /* IonicPageModule */], ionic_angular_module["b" /* IonicPageModule */], []), core["_41" /* ɵmpd */](512, discussion_module_AddonModForumDiscussionPageModule, discussion_module_AddonModForumDiscussionPageModule, []), core["_41" /* ɵmpd */](256, translate_service["c" /* USE_STORE */], undefined, []), core["_41" /* ɵmpd */](256, translate_service["b" /* USE_DEFAULT_LANG */], undefined, []), core["_41" /* ɵmpd */](256, module_loader["a" /* LAZY_LOADED_TOKEN */], discussion_AddonModForumDiscussionPage, [])]); });

//# sourceMappingURL=discussion.module.ngfactory.js.map

/***/ })

});
//# sourceMappingURL=93.js.map