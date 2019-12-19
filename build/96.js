webpackJsonp([96],{

/***/ 2139:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddonModForumDiscussionPageModule", function() { return AddonModForumDiscussionPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__directives_directives_module__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_components_module__ = __webpack_require__(993);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__discussion__ = __webpack_require__(2289);
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







var AddonModForumDiscussionPageModule = /** @class */ (function () {
    function AddonModForumDiscussionPageModule() {
    }
    AddonModForumDiscussionPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__discussion__["a" /* AddonModForumDiscussionPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* CoreComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_4__directives_directives_module__["a" /* CoreDirectivesModule */],
                __WEBPACK_IMPORTED_MODULE_5__components_components_module__["a" /* AddonModForumComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_6__discussion__["a" /* AddonModForumDiscussionPage */]),
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */].forChild()
            ],
        })
    ], AddonModForumDiscussionPageModule);
    return AddonModForumDiscussionPageModule;
}());

//# sourceMappingURL=discussion.module.js.map

/***/ }),

/***/ 2289:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddonModForumDiscussionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_network__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_app__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_events__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_sites__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_utils_dom__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_utils_utils__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__core_fileuploader_providers_fileuploader__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__core_user_providers_user__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_split_view_split_view__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__core_rating_providers_rating__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__core_rating_providers_offline__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__core_rating_providers_sync__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__providers_forum__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__providers_offline__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__providers_helper__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_sync__ = __webpack_require__(197);
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



















/**
 * Page that displays a forum discussion.
 */
var AddonModForumDiscussionPage = /** @class */ (function () {
    function AddonModForumDiscussionPage(navParams, network, zone, appProvider, eventsProvider, sitesProvider, domUtils, utils, translate, uploaderProvider, forumProvider, forumOffline, forumHelper, forumSync, ratingOffline, userProvider, svComponent, navCtrl) {
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
        this.ratingOffline = ratingOffline;
        this.userProvider = userProvider;
        this.svComponent = svComponent;
        this.navCtrl = navCtrl;
        this.forum = {};
        this.accessInfo = {};
        this.discussionLoaded = false;
        this.sort = 'nested';
        this.replyData = {
            replyingTo: 0,
            isEditing: false,
            subject: '',
            message: null,
            files: [],
            isprivatereply: false,
        };
        this.originalData = {
            subject: null,
            message: null,
            files: [],
            isprivatereply: false,
        };
        this.refreshIcon = 'spinner';
        this.syncIcon = 'spinner';
        this.discussionStr = '';
        this.component = __WEBPACK_IMPORTED_MODULE_15__providers_forum__["a" /* AddonModForumProvider */].COMPONENT;
        this.canPin = false;
        this.courseId = navParams.get('courseId');
        this.cmId = navParams.get('cmId');
        this.forumId = navParams.get('forumId');
        this.discussion = navParams.get('discussion');
        this.discussionId = this.discussion ? this.discussion.discussion : navParams.get('discussionId');
        this.trackPosts = navParams.get('trackPosts');
        this.postId = navParams.get('postId');
        this.isOnline = this.appProvider.isOnline();
        this.onlineObserver = network.onchange().subscribe(function () {
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
        var _this = this;
        this.sitesProvider.getCurrentSite().getLocalSiteConfig('AddonModForumDiscussionSort').catch(function () {
            _this.userProvider.getUserPreference('forum_displaymode').catch(function () {
                // Ignore errors.
            }).then(function (value) {
                var sortValue = value && parseInt(value, 10);
                switch (sortValue) {
                    case 1:
                        _this.sort = 'flat-oldest';
                        break;
                    case -1:
                        _this.sort = 'flat-newest';
                        break;
                    case 3:
                        _this.sort = 'nested';
                        break;
                    case 2: // Threaded not implemented.
                    default:
                }
            });
        }).then(function (value) {
            _this.sort = value;
        }).finally(function () {
            _this.fetchPosts(true, false, true).then(function () {
                if (_this.postId) {
                    // Scroll to the post.
                    setTimeout(function () {
                        _this.domUtils.scrollToElementBySelector(_this.content, '#addon-mod_forum-post-' + _this.postId);
                    });
                }
            });
        });
    };
    /**
     * User entered the page that contains the component.
     */
    AddonModForumDiscussionPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        // Refresh data if this discussion is synchronized automatically.
        this.syncObserver = this.eventsProvider.on(__WEBPACK_IMPORTED_MODULE_18__providers_sync__["a" /* AddonModForumSyncProvider */].AUTO_SYNCED, function (data) {
            if (data.forumId == _this.forumId && _this.discussionId == data.discussionId
                && data.userId == _this.sitesProvider.getCurrentSiteUserId()) {
                // Refresh the data.
                _this.discussionLoaded = false;
                _this.refreshPosts();
            }
        }, this.sitesProvider.getCurrentSiteId());
        // Refresh data if this forum discussion is synchronized from discussions list.
        this.syncManualObserver = this.eventsProvider.on(__WEBPACK_IMPORTED_MODULE_18__providers_sync__["a" /* AddonModForumSyncProvider */].MANUAL_SYNCED, function (data) {
            if (data.source != 'discussion' && data.forumId == _this.forumId &&
                data.userId == _this.sitesProvider.getCurrentSiteUserId()) {
                // Refresh the data.
                _this.discussionLoaded = false;
                _this.refreshPosts();
            }
        }, this.sitesProvider.getCurrentSiteId());
        // Trigger view event, to highlight the current opened discussion in the split view.
        this.eventsProvider.trigger(__WEBPACK_IMPORTED_MODULE_15__providers_forum__["a" /* AddonModForumProvider */].VIEW_DISCUSSION_EVENT, {
            forumId: this.forumId,
            discussion: this.discussionId
        }, this.sitesProvider.getCurrentSiteId());
        // Listen for offline ratings saved and synced.
        this.ratingOfflineObserver = this.eventsProvider.on(__WEBPACK_IMPORTED_MODULE_12__core_rating_providers_rating__["a" /* CoreRatingProvider */].RATING_SAVED_EVENT, function (data) {
            if (data.component == 'mod_forum' && data.ratingArea == 'post' && data.contextLevel == 'module' &&
                data.instanceId == _this.cmId && data.itemSetId == _this.discussionId) {
                _this.hasOfflineRatings = true;
            }
        });
        this.ratingSyncObserver = this.eventsProvider.on(__WEBPACK_IMPORTED_MODULE_14__core_rating_providers_sync__["a" /* CoreRatingSyncProvider */].SYNCED_EVENT, function (data) {
            if (data.component == 'mod_forum' && data.ratingArea == 'post' && data.contextLevel == 'module' &&
                data.instanceId == _this.cmId && data.itemSetId == _this.discussionId) {
                _this.hasOfflineRatings = false;
            }
        });
        this.changeDiscObserver = this.eventsProvider.on(__WEBPACK_IMPORTED_MODULE_15__providers_forum__["a" /* AddonModForumProvider */].CHANGE_DISCUSSION_EVENT, function (data) {
            if ((_this.forumId && _this.forumId === data.forumId) || data.cmId === _this.cmId) {
                _this.forumProvider.invalidateDiscussionsList(_this.forumId).finally(function () {
                    if (typeof data.locked != 'undefined') {
                        _this.discussion.locked = data.locked;
                    }
                    if (typeof data.pinned != 'undefined') {
                        _this.discussion.pinned = data.pinned;
                    }
                    if (typeof data.starred != 'undefined') {
                        _this.discussion.starred = data.starred;
                    }
                    if (typeof data.deleted != 'undefined' && data.deleted) {
                        if (data.post.parent == 0) {
                            if (_this.svComponent && _this.svComponent.isOn()) {
                                _this.svComponent.emptyDetails();
                            }
                            else {
                                _this.navCtrl.pop();
                            }
                        }
                        else {
                            _this.discussionLoaded = false;
                            _this.refreshPosts();
                        }
                    }
                });
            }
        });
    };
    /**
     * Check if we can leave the page or not.
     *
     * @return Resolved if we can leave it, rejected if not.
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
     * @return Promise resolved with the forum.
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
     * Convenience function to get the posts.
     *
     * @param sync Whether to try to synchronize the discussion.
     * @param showErrors Whether to show errors in a modal.
     * @param forceMarkAsRead Whether to mark all posts as read.
     * @return Promise resolved when done.
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
        var ratingInfo;
        return syncPromise.then(function () {
            return _this.forumProvider.getDiscussionPosts(_this.discussionId).then(function (response) {
                onlinePosts = response.posts;
                ratingInfo = response.ratinginfo;
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
            var startingPost = _this.forumProvider.extractStartingPost(posts);
            if (startingPost) {
                // Update discussion data from first post.
                _this.discussion = Object.assign(_this.discussion || {}, startingPost);
            }
            // If sort type is nested, normal sorting is disabled and nested posts will be displayed.
            if (_this.sort == 'nested') {
                // Sort first by creation date to make format tree work.
                _this.forumProvider.sortDiscussionPosts(posts, 'ASC');
                posts = _this.utils.formatTree(posts, 'parent', 'id', _this.discussion.id);
            }
            else {
                // Set default reply subject.
                var direction = _this.sort == 'flat-newest' ? 'DESC' : 'ASC';
                _this.forumProvider.sortDiscussionPosts(posts, direction);
            }
            // Now try to get the forum.
            return _this.fetchForum().then(function (forum) {
                // "forum.istracked" is more reliable than "trackPosts".
                if (typeof forum.istracked != 'undefined') {
                    _this.trackPosts = forum.istracked;
                }
                _this.forumId = forum.id;
                _this.cmId = forum.cmid;
                _this.courseId = forum.course;
                _this.forum = forum;
                _this.availabilityMessage = _this.forumHelper.getAvailabilityMessage(forum);
                var promises = [];
                promises.push(_this.forumProvider.getAccessInformation(_this.forumId).then(function (accessInfo) {
                    _this.accessInfo = accessInfo;
                    // Disallow replying if cut-off date is reached and the user has not the capability to override it.
                    // Just in case the posts were fetched from WS when the cut-off date was not reached but it is now.
                    if (_this.forumHelper.isCutoffDateReached(forum) && !accessInfo.cancanoverridecutoff) {
                        posts.forEach(function (post) {
                            post.canreply = false;
                        });
                    }
                }));
                // The discussion object was not passed as parameter and there is no starting post. Should not happen.
                if (!_this.discussion) {
                    promises.push(_this.loadDiscussion(_this.forumId, _this.discussionId));
                }
                return Promise.all(promises);
            }).catch(function () {
                // Ignore errors.
            }).then(function () {
                if (!_this.discussion) {
                    // The discussion object was not passed as parameter and there is no starting post. Should not happen.
                    return Promise.reject('Invalid forum discussion.');
                }
                if (_this.discussion.userfullname && _this.discussion.parent == 0 && _this.forum.type == 'single') {
                    // Hide author for first post and type single.
                    _this.discussion.userfullname = null;
                }
                _this.posts = posts;
                _this.ratingInfo = ratingInfo;
                _this.postSubjects = _this.getAllPosts().reduce(function (postSubjects, post) {
                    postSubjects[post.id] = post.subject;
                    return postSubjects;
                }, (_a = {}, _a[_this.discussion.id] = _this.discussion.subject, _a));
                var _a;
            });
        }).then(function () {
            if (_this.forumProvider.isSetPinStateAvailableForSite()) {
                // Use the canAddDiscussion WS to check if the user can pin discussions.
                return _this.forumProvider.canAddDiscussionToAll(_this.forumId).then(function (response) {
                    _this.canPin = !!response.canpindiscussions;
                }).catch(function () {
                    _this.canPin = false;
                });
            }
            else {
                _this.canPin = false;
            }
        }).then(function () {
            return _this.ratingOffline.hasRatings('mod_forum', 'post', 'module', _this.cmId, _this.discussionId).then(function (hasRatings) {
                _this.hasOfflineRatings = hasRatings;
            });
        }).catch(function (message) {
            _this.domUtils.showErrorModal(message);
        }).finally(function () {
            _this.discussionLoaded = true;
            _this.refreshIcon = 'refresh';
            _this.syncIcon = 'sync';
            if (forceMarkAsRead || (hasUnreadPosts && _this.trackPosts)) {
                // // Add log in Moodle and mark unread posts as readed.
                _this.forumProvider.logDiscussionView(_this.discussionId, _this.forumId || -1, _this.forum.name).catch(function () {
                    // Ignore errors.
                }).finally(function () {
                    // Trigger mark read posts.
                    _this.eventsProvider.trigger(__WEBPACK_IMPORTED_MODULE_15__providers_forum__["a" /* AddonModForumProvider */].MARK_READ_EVENT, {
                        courseId: _this.courseId,
                        moduleId: _this.cmId
                    }, _this.sitesProvider.getCurrentSiteId());
                });
            }
        });
    };
    /**
     * Convenience function to load discussion.
     *
     * @param  forumId Forum ID.
     * @param  discussionId Discussion ID.
     * @return Promise resolved when done.
     */
    AddonModForumDiscussionPage.prototype.loadDiscussion = function (forumId, discussionId) {
        var _this = this;
        // Fetch the discussion if not passed as parameter.
        if (!this.discussion && forumId) {
            return this.forumHelper.getDiscussionById(forumId, discussionId).then(function (discussion) {
                _this.discussion = discussion;
                _this.discussionId = _this.discussion.discussion;
            }).catch(function () {
                // Ignore errors.
            });
        }
        return Promise.resolve();
    };
    /**
     * Tries to synchronize the posts discussion.
     *
     * @param showErrors Whether to show errors in a modal.
     * @return Promise resolved when done.
     */
    AddonModForumDiscussionPage.prototype.syncDiscussion = function (showErrors) {
        var _this = this;
        var promises = [];
        promises.push(this.forumSync.syncDiscussionReplies(this.discussionId).then(function (result) {
            if (result.warnings && result.warnings.length) {
                _this.domUtils.showErrorModal(result.warnings[0]);
            }
            if (result && result.updated) {
                // Sync successful, send event.
                _this.eventsProvider.trigger(__WEBPACK_IMPORTED_MODULE_18__providers_sync__["a" /* AddonModForumSyncProvider */].MANUAL_SYNCED, {
                    forumId: _this.forumId,
                    userId: _this.sitesProvider.getCurrentSiteUserId(),
                    source: 'discussion'
                }, _this.sitesProvider.getCurrentSiteId());
            }
            return result.updated;
        }));
        promises.push(this.forumSync.syncRatings(this.cmId, this.discussionId).then(function (result) {
            if (result.warnings && result.warnings.length) {
                _this.domUtils.showErrorModal(result.warnings[0]);
            }
        }));
        return Promise.all(promises).catch(function (error) {
            if (showErrors) {
                _this.domUtils.showErrorModalDefault(error, 'core.errorsync', true);
            }
            return Promise.reject(null);
        });
    };
    /**
     * Refresh the data.
     *
     * @param refresher Refresher.
     * @param done Function to call when done.
     * @param showErrors If show errors to the user of hide them.
     * @return Promise resolved when done.
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
     * @param sync Whether to try to synchronize the discussion.
     * @param showErrors Whether to show errors in a modal.
     * @return Promise resolved when done.
     */
    AddonModForumDiscussionPage.prototype.refreshPosts = function (sync, showErrors) {
        var _this = this;
        this.domUtils.scrollToTop(this.content);
        this.refreshIcon = 'spinner';
        this.syncIcon = 'spinner';
        var promises = [
            this.forumProvider.invalidateForumData(this.courseId),
            this.forumProvider.invalidateDiscussionPosts(this.discussionId, this.forumId),
            this.forumProvider.invalidateAccessInformation(this.forumId),
            this.forumProvider.invalidateCanAddDiscussion(this.forumId)
        ];
        return this.utils.allPromises(promises).catch(function () {
            // Ignore errors.
        }).then(function () {
            return _this.fetchPosts(sync, showErrors);
        });
    };
    /**
     * Function to change posts sorting
     *
     * @param type Sort type.
     * @return Promised resolved when done.
     */
    AddonModForumDiscussionPage.prototype.changeSort = function (type) {
        this.discussionLoaded = false;
        this.sort = type;
        this.sitesProvider.getCurrentSite().setLocalSiteConfig('AddonModForumDiscussionSort', this.sort);
        this.domUtils.scrollToTop(this.content);
        return this.fetchPosts();
    };
    /**
     * Lock or unlock the discussion.
     *
     * @param locked True to lock the discussion, false to unlock.
     */
    AddonModForumDiscussionPage.prototype.setLockState = function (locked) {
        var _this = this;
        var modal = this.domUtils.showModalLoading('core.sending', true);
        this.forumProvider.setLockState(this.forumId, this.discussionId, locked).then(function (response) {
            _this.discussion.locked = response.locked;
            var data = {
                forumId: _this.forumId,
                discussionId: _this.discussionId,
                cmId: _this.cmId,
                locked: _this.discussion.locked
            };
            _this.eventsProvider.trigger(__WEBPACK_IMPORTED_MODULE_15__providers_forum__["a" /* AddonModForumProvider */].CHANGE_DISCUSSION_EVENT, data, _this.sitesProvider.getCurrentSiteId());
            _this.domUtils.showToast('addon.mod_forum.lockupdated', true);
        }).catch(function (error) {
            _this.domUtils.showErrorModal(error);
        }).finally(function () {
            modal.dismiss();
        });
    };
    /**
     * Pin or unpin the discussion.
     *
     * @param pinned True to pin the discussion, false to unpin it.
     */
    AddonModForumDiscussionPage.prototype.setPinState = function (pinned) {
        var _this = this;
        var modal = this.domUtils.showModalLoading('core.sending', true);
        this.forumProvider.setPinState(this.discussionId, pinned).then(function () {
            _this.discussion.pinned = pinned;
            var data = {
                forumId: _this.forumId,
                discussionId: _this.discussionId,
                cmId: _this.cmId,
                pinned: _this.discussion.pinned
            };
            _this.eventsProvider.trigger(__WEBPACK_IMPORTED_MODULE_15__providers_forum__["a" /* AddonModForumProvider */].CHANGE_DISCUSSION_EVENT, data, _this.sitesProvider.getCurrentSiteId());
            _this.domUtils.showToast('addon.mod_forum.pinupdated', true);
        }).catch(function (error) {
            _this.domUtils.showErrorModal(error);
        }).finally(function () {
            modal.dismiss();
        });
    };
    /**
     * Star or unstar the discussion.
     *
     * @param starred True to star the discussion, false to unstar it.
     */
    AddonModForumDiscussionPage.prototype.toggleFavouriteState = function (starred) {
        var _this = this;
        var modal = this.domUtils.showModalLoading('core.sending', true);
        this.forumProvider.toggleFavouriteState(this.discussionId, starred).then(function () {
            _this.discussion.starred = starred;
            var data = {
                forumId: _this.forumId,
                discussionId: _this.discussionId,
                cmId: _this.cmId,
                starred: _this.discussion.starred
            };
            _this.eventsProvider.trigger(__WEBPACK_IMPORTED_MODULE_15__providers_forum__["a" /* AddonModForumProvider */].CHANGE_DISCUSSION_EVENT, data, _this.sitesProvider.getCurrentSiteId());
            _this.domUtils.showToast('addon.mod_forum.favouriteupdated', true);
        }).catch(function (error) {
            _this.domUtils.showErrorModal(error);
        }).finally(function () {
            modal.dismiss();
        });
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
        this.eventsProvider.trigger(__WEBPACK_IMPORTED_MODULE_15__providers_forum__["a" /* AddonModForumProvider */].REPLY_DISCUSSION_EVENT, data, this.sitesProvider.getCurrentSiteId());
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
        this.ratingOfflineObserver && this.ratingOfflineObserver.off();
        this.ratingSyncObserver && this.ratingSyncObserver.off();
        this.changeDiscObserver && this.changeDiscObserver.off();
    };
    /**
     * Page destroyed.
     */
    AddonModForumDiscussionPage.prototype.ngOnDestroy = function () {
        this.onlineObserver && this.onlineObserver.unsubscribe();
    };
    /**
     * Get all the posts contained in the discussion.
     *
     * @return Array containing all the posts of the discussion.
     */
    AddonModForumDiscussionPage.prototype.getAllPosts = function () {
        return [].concat.apply([], this.posts.map(this.flattenPostHierarchy.bind(this)));
    };
    /**
     * Flatten a post's hierarchy into an array.
     *
     * @param parent Parent post.
     * @return Array containing all the posts within the hierarchy (including the parent).
     */
    AddonModForumDiscussionPage.prototype.flattenPostHierarchy = function (parent) {
        var posts = [parent];
        var children = parent.children || [];
        for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
            var child = children_1[_i];
            posts.push.apply(posts, this.flattenPostHierarchy(child));
        }
        return posts;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Content */])
    ], AddonModForumDiscussionPage.prototype, "content", void 0);
    AddonModForumDiscussionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-addon-mod-forum-discussion',template:/*ion-inline-start:"/home/travis/build/moodlehq/moodlemobile2/src/addon/mod/forum/pages/discussion/discussion.html"*/'<ion-header>\n    <ion-navbar core-back-button>\n        <ion-title *ngIf="discussion"><core-format-text [text]="discussion.subject" contextLevel="module" [contextInstanceId]="cmId" [courseId]="courseId"></core-format-text></ion-title>\n        <ion-buttons end>\n            <!-- The context menu will be added in here. -->\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n<core-navbar-buttons end>\n    <core-context-menu>\n        <core-context-menu-item [priority]="650" *ngIf="discussionLoaded && !postHasOffline && isOnline" [content]="\'addon.mod_forum.refreshposts\' | translate" (action)="doRefresh(null, $event)" [iconAction]="refreshIcon" [closeOnClick]="false"></core-context-menu-item>\n        <core-context-menu-item [priority]="550" *ngIf="discussionLoaded && !isSplitViewOn && postHasOffline && isOnline" [content]="\'core.settings.synchronizenow\' | translate" (action)="doRefresh(null, $event, true)" [iconAction]="syncIcon" [closeOnClick]="false"></core-context-menu-item>\n        <core-context-menu-item [hidden]="sort == \'flat-oldest\'" [priority]="500" [content]="\'addon.mod_forum.modeflatoldestfirst\' | translate" (action)="changeSort(\'flat-oldest\')" iconAction="arrow-round-down"></core-context-menu-item>\n        <core-context-menu-item [hidden]="sort == \'flat-newest\'" [priority]="450" [content]="\'addon.mod_forum.modeflatnewestfirst\' | translate" (action)="changeSort(\'flat-newest\')" iconAction="arrow-round-up"></core-context-menu-item>\n        <core-context-menu-item [hidden]="sort == \'nested\'" [priority]="400" [content]="\'addon.mod_forum.modenested\' | translate" (action)="changeSort(\'nested\')" iconAction="swap"></core-context-menu-item>\n        <core-context-menu-item [hidden]="!discussion || !discussion.canlock || discussion.locked" [priority]="300" [content]="\'addon.mod_forum.lockdiscussion\' | translate" (action)="setLockState(true)" iconAction="fa-lock"></core-context-menu-item>\n        <core-context-menu-item [hidden]="!discussion || !discussion.canlock || !discussion.locked" [priority]="300" [content]="\'addon.mod_forum.unlockdiscussion\' | translate" (action)="setLockState(false)" iconAction="fa-unlock"></core-context-menu-item>\n        <core-context-menu-item [hidden]="!discussion || !canPin || discussion.pinned" [priority]="250" [content]="\'addon.mod_forum.pindiscussion\' | translate" (action)="setPinState(true)" iconAction="fa-map-pin"></core-context-menu-item>\n        <core-context-menu-item [hidden]="!discussion || !canPin || !discussion.pinned" [priority]="250" [content]="\'addon.mod_forum.unpindiscussion\' | translate" (action)="setPinState(false)" iconAction="fa-map-pin" [iconSlash]="true"></core-context-menu-item>\n        <core-context-menu-item [hidden]="!discussion || !discussion.canfavourite || discussion.starred" [priority]="200" [content]="\'addon.mod_forum.addtofavourites\' | translate" (action)="toggleFavouriteState(true)" iconAction="fa-star"></core-context-menu-item>\n        <core-context-menu-item [hidden]="!discussion || !discussion.canfavourite || !discussion.starred" [priority]="200" [content]="\'addon.mod_forum.removefromfavourites\' | translate" (action)="toggleFavouriteState(false)" iconAction="fa-star" [iconSlash]="true"></core-context-menu-item>\n    </core-context-menu>\n</core-navbar-buttons>\n<ion-content>\n    <ion-refresher [enabled]="discussionLoaded" (ionRefresh)="doRefresh($event)">\n        <ion-refresher-content pullingText="{{ \'core.pulltorefresh\' | translate }}"></ion-refresher-content>\n    </ion-refresher>\n\n    <core-loading [hideUntil]="discussionLoaded">\n        <!-- Discussion replies found to be synchronized -->\n        <ion-card class="core-warning-card" *ngIf="postHasOffline || hasOfflineRatings">\n            <ion-icon name="warning"></ion-icon> {{ \'core.hasdatatosync\' | translate:{$a: discussionStr} }}\n        </ion-card>\n\n        <!-- Cut-off date or due date message -->\n        <ion-card class="core-info-card" icon-start *ngIf="availabilityMessage">\n            <ion-icon name="information-circle"></ion-icon> {{ availabilityMessage }}\n        </ion-card>\n\n        <ion-card class="core-info-card" icon-start *ngIf="discussion && discussion.locked">\n            <core-icon name="fa-lock"></core-icon> {{ \'addon.mod_forum.discussionlocked\' | translate }}\n        </ion-card>\n\n        <div *ngIf="discussion" margin-bottom class="highlight">\n            <addon-mod-forum-post [post]="discussion" [courseId]="courseId" [discussionId]="discussionId" [component]="component" [componentId]="cmId" [replyData]="replyData" [originalData]="originalData" [forum]="forum" [accessInfo]="accessInfo" [trackPosts]="trackPosts" [ratingInfo]="ratingInfo" (onPostChange)="postListChanged()"></addon-mod-forum-post>\n        </div>\n\n        <ion-card *ngIf="sort != \'nested\'">\n            <ng-container *ngFor="let post of posts; first as first">\n                <ion-item-divider *ngIf="!first"></ion-item-divider>\n                <addon-mod-forum-post [post]="post" [courseId]="courseId" [discussionId]="discussionId" [component]="component" [componentId]="cmId" [replyData]="replyData" [originalData]="originalData" [parentSubject]="postSubjects[post.parent]" [forum]="forum" [accessInfo]="accessInfo" [trackPosts]="trackPosts" [ratingInfo]="ratingInfo" (onPostChange)="postListChanged()"></addon-mod-forum-post>\n            </ng-container>\n        </ion-card>\n\n        <ng-container *ngIf="sort == \'nested\'">\n            <ng-container *ngFor="let post of posts">\n                <ng-container *ngTemplateOutlet="nestedPosts; context: {post: post}"></ng-container>\n            </ng-container>\n        </ng-container>\n\n        <ng-template #nestedPosts let-post="post">\n            <ion-card>\n                <addon-mod-forum-post [post]="post" [courseId]="courseId" [discussionId]="discussionId" [component]="component" [componentId]="cmId" [replyData]="replyData" [originalData]="originalData" [parentSubject]="postSubjects[post.parent]" [forum]="forum" [accessInfo]="accessInfo" [trackPosts]="trackPosts" [ratingInfo]="ratingInfo" (onPostChange)="postListChanged()"></addon-mod-forum-post>\n            </ion-card>\n            <div padding-left *ngIf="post.children.length && post.children[0].subject">\n                <ng-container *ngFor="let child of post.children">\n                    <ng-container *ngTemplateOutlet="nestedPosts; context: {post: child}"></ng-container>\n                </ng-container>\n            </div>\n        </ng-template>\n    </core-loading>\n</ion-content>\n'/*ion-inline-end:"/home/travis/build/moodlehq/moodlemobile2/src/addon/mod/forum/pages/discussion/discussion.html"*/,
        }),
        __param(16, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["N" /* Optional */])()),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_network__["a" /* Network */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */],
            __WEBPACK_IMPORTED_MODULE_4__providers_app__["a" /* CoreAppProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_events__["a" /* CoreEventsProvider */],
            __WEBPACK_IMPORTED_MODULE_6__providers_sites__["a" /* CoreSitesProvider */],
            __WEBPACK_IMPORTED_MODULE_7__providers_utils_dom__["a" /* CoreDomUtilsProvider */],
            __WEBPACK_IMPORTED_MODULE_8__providers_utils_utils__["a" /* CoreUtilsProvider */],
            __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_9__core_fileuploader_providers_fileuploader__["a" /* CoreFileUploaderProvider */],
            __WEBPACK_IMPORTED_MODULE_15__providers_forum__["a" /* AddonModForumProvider */],
            __WEBPACK_IMPORTED_MODULE_16__providers_offline__["a" /* AddonModForumOfflineProvider */],
            __WEBPACK_IMPORTED_MODULE_17__providers_helper__["a" /* AddonModForumHelperProvider */],
            __WEBPACK_IMPORTED_MODULE_18__providers_sync__["a" /* AddonModForumSyncProvider */],
            __WEBPACK_IMPORTED_MODULE_13__core_rating_providers_offline__["a" /* CoreRatingOfflineProvider */],
            __WEBPACK_IMPORTED_MODULE_10__core_user_providers_user__["a" /* CoreUserProvider */],
            __WEBPACK_IMPORTED_MODULE_11__components_split_view_split_view__["a" /* CoreSplitViewComponent */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavController */]])
    ], AddonModForumDiscussionPage);
    return AddonModForumDiscussionPage;
}());

//# sourceMappingURL=discussion.js.map

/***/ })

});
//# sourceMappingURL=96.js.map