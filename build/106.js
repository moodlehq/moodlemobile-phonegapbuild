webpackJsonp([106],{

/***/ 1842:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddonMessagesDiscussionPageModule", function() { return AddonMessagesDiscussionPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__discussion__ = __webpack_require__(1970);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_components_module__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__directives_directives_module__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pipes_pipes_module__ = __webpack_require__(62);
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







var AddonMessagesDiscussionPageModule = /** @class */ (function () {
    function AddonMessagesDiscussionPageModule() {
    }
    AddonMessagesDiscussionPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__discussion__["a" /* AddonMessagesDiscussionPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_4__components_components_module__["a" /* CoreComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_5__directives_directives_module__["a" /* CoreDirectivesModule */],
                __WEBPACK_IMPORTED_MODULE_6__pipes_pipes_module__["a" /* CorePipesModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__discussion__["a" /* AddonMessagesDiscussionPage */]),
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */].forChild()
            ],
        })
    ], AddonMessagesDiscussionPageModule);
    return AddonMessagesDiscussionPageModule;
}());

//# sourceMappingURL=discussion.module.js.map

/***/ }),

/***/ 1970:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddonMessagesDiscussionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_events__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_sites__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_messages__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_messages_offline__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_sync__ = __webpack_require__(400);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__core_user_providers_user__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_utils_dom__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_utils_utils__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_logger__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_app__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__classes_animations__ = __webpack_require__(949);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_split_view_split_view__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_ts_md5_dist_md5__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_ts_md5_dist_md5___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_ts_md5_dist_md5__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_moment__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16_moment__);
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
 * Page that displays a message discussion page.
 */
var AddonMessagesDiscussionPage = /** @class */ (function () {
    function AddonMessagesDiscussionPage(eventsProvider, sitesProvider, navParams, userProvider, navCtrl, messagesSync, domUtils, messagesProvider, logger, utils, appProvider, translate, svComponent, messagesOffline, modalCtrl) {
        var _this = this;
        this.eventsProvider = eventsProvider;
        this.userProvider = userProvider;
        this.navCtrl = navCtrl;
        this.messagesSync = messagesSync;
        this.domUtils = domUtils;
        this.messagesProvider = messagesProvider;
        this.utils = utils;
        this.appProvider = appProvider;
        this.translate = translate;
        this.svComponent = svComponent;
        this.messagesOffline = messagesOffline;
        this.modalCtrl = modalCtrl;
        this.unreadMessageFrom = 0;
        this.messagesBeingSent = 0;
        this.pagesLoaded = 1;
        this.lastMessage = { text: '', timecreated: 0 };
        this.keepMessageMap = {};
        this.oldContentHeight = 0;
        this.scrollBottom = true;
        this.viewDestroyed = false;
        this.showLoadingModal = false; // Whether to show a loading modal while fetching data.
        this.loaded = false;
        this.showKeyboard = false;
        this.canLoadMore = false;
        this.loadMoreError = false;
        this.messages = [];
        this.showDelete = false;
        this.canDelete = false;
        this.isGroup = false;
        this.members = {}; // Members that wrote a message, indexed by ID.
        this.favouriteIcon = 'fa-star';
        this.deleteIcon = 'trash';
        this.blockIcon = 'close-circle';
        this.addRemoveIcon = 'add';
        this.requestContactSent = false;
        this.requestContactReceived = false;
        this.siteId = sitesProvider.getCurrentSiteId();
        this.currentUserId = sitesProvider.getCurrentSiteUserId();
        this.groupMessagingEnabled = this.messagesProvider.isGroupMessagingEnabled();
        this.logger = logger.getInstance('AddonMessagesDiscussionPage');
        this.conversationId = navParams.get('conversationId');
        this.userId = navParams.get('userId');
        this.showKeyboard = navParams.get('showKeyboard');
        // Refresh data if this discussion is synchronized automatically.
        this.syncObserver = eventsProvider.on(__WEBPACK_IMPORTED_MODULE_7__providers_sync__["a" /* AddonMessagesSyncProvider */].AUTO_SYNCED, function (data) {
            if ((data.userId && data.userId == _this.userId) ||
                (data.conversationId && data.conversationId == _this.conversationId)) {
                // Fetch messages.
                _this.fetchMessages();
                // Show first warning if any.
                if (data.warnings && data.warnings[0]) {
                    _this.domUtils.showErrorModal(data.warnings[0]);
                }
            }
        }, this.siteId);
        // Refresh data if info of a mamber of the conversation have changed.
        this.memberInfoObserver = eventsProvider.on(__WEBPACK_IMPORTED_MODULE_5__providers_messages__["a" /* AddonMessagesProvider */].MEMBER_INFO_CHANGED_EVENT, function (data) {
            if (data.userId && (_this.members[data.userId] || _this.otherMember && data.userId == _this.otherMember.id)) {
                _this.fetchData();
            }
        }, this.siteId);
    }
    /**
     * Adds a new message to the message list.
     *
     * @param {any} message Message to be added.
     * @param {boolean} [keep=true] If set the keep flag or not.
     */
    AddonMessagesDiscussionPage.prototype.addMessage = function (message, keep) {
        if (keep === void 0) { keep = true; }
        /* Create a hash to identify the message. The text of online messages isn't reliable because it can have random data
           like VideoJS ID. Try to use id and fallback to text for offline messages. */
        message.hash = __WEBPACK_IMPORTED_MODULE_15_ts_md5_dist_md5__["Md5"].hashAsciiStr(String(message.id || message.text || '')) + '#' + message.timecreated + '#' +
            message.useridfrom;
        if (typeof this.keepMessageMap[message.hash] === 'undefined') {
            // Message not added to the list. Add it now.
            this.messages.push(message);
        }
        // Message needs to be kept in the list.
        this.keepMessageMap[message.hash] = keep;
    };
    /**
     * Remove a message if it shouldn't be in the list anymore.
     *
     * @param {string} hash Hash of the message to be removed.
     */
    AddonMessagesDiscussionPage.prototype.removeMessage = function (hash) {
        if (this.keepMessageMap[hash]) {
            // Selected to keep it, clear the flag.
            this.keepMessageMap[hash] = false;
            return;
        }
        delete this.keepMessageMap[hash];
        var position = this.messages.findIndex(function (message) {
            return message.hash == hash;
        });
        if (position >= 0) {
            this.messages.splice(position, 1);
        }
    };
    /**
     * Runs when the page has loaded. This event only happens once per page being created.
     * If a page leaves but is cached, then this event will not fire again on a subsequent viewing.
     * Setup code for the page.
     */
    AddonMessagesDiscussionPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        // Disable the profile button if we're already coming from a profile.
        var backViewPage = this.navCtrl.getPrevious() && this.navCtrl.getPrevious().component.name;
        this.showInfo = !backViewPage || backViewPage !== 'CoreUserProfilePage';
        // Recalculate footer position when keyboard is shown or hidden.
        this.keyboardObserver = this.eventsProvider.on(__WEBPACK_IMPORTED_MODULE_3__providers_events__["a" /* CoreEventsProvider */].KEYBOARD_CHANGE, function (kbHeight) {
            _this.content.resize();
        });
        this.fetchData();
    };
    /**
     * Convenience function to fetch the conversation data.
     *
     * @return {Promise<any>} Resolved when done.
     */
    AddonMessagesDiscussionPage.prototype.fetchData = function () {
        var _this = this;
        var loader;
        if (this.showLoadingModal) {
            loader = this.domUtils.showModalLoading();
        }
        if (!this.groupMessagingEnabled && this.userId) {
            // Get the user profile to retrieve the user fullname and image.
            this.userProvider.getProfile(this.userId, undefined, true).then(function (user) {
                if (!_this.title) {
                    _this.title = user.fullname;
                }
                _this.conversationImage = user.profileimageurl;
            });
        }
        // Synchronize messages if needed.
        return this.messagesSync.syncDiscussion(this.conversationId, this.userId).catch(function () {
            // Ignore errors.
        }).then(function (warnings) {
            if (warnings && warnings[0]) {
                _this.domUtils.showErrorModal(warnings[0]);
            }
            if (_this.groupMessagingEnabled) {
                // Get the conversation ID if it exists and we don't have it yet.
                return _this.getConversation(_this.conversationId, _this.userId).then(function (exists) {
                    var promises = [];
                    if (exists) {
                        // Fetch the messages for the first time.
                        promises.push(_this.fetchMessages());
                    }
                    if (_this.userId) {
                        // Get the member info. Invalidate first to make sure we get the latest status.
                        promises.push(_this.messagesProvider.invalidateMemberInfo(_this.userId).catch(function () {
                            // Shouldn't happen.
                        }).then(function () {
                            return _this.messagesProvider.getMemberInfo(_this.userId);
                        }).then(function (member) {
                            _this.otherMember = member;
                            if (!exists && member) {
                                _this.conversationImage = member.profileimageurl;
                                _this.title = member.fullname;
                            }
                            _this.blockIcon = _this.otherMember && _this.otherMember.isblocked ? 'checkmark-circle' : 'close-circle';
                            _this.addRemoveIcon = _this.otherMember && _this.otherMember.iscontact ? 'remove' : 'add';
                        }));
                    }
                    else {
                        _this.otherMember = null;
                    }
                    return Promise.all(promises);
                });
            }
            else {
                _this.otherMember = null;
                // Fetch the messages for the first time.
                return _this.fetchMessages().then(function () {
                    if (!_this.title && _this.messages.length) {
                        // Didn't receive the fullname via argument. Try to get it from messages.
                        // It's possible that name cannot be resolved when no messages were yet exchanged.
                        if (_this.messages[0].useridto != _this.currentUserId) {
                            _this.title = _this.messages[0].usertofullname || '';
                        }
                        else {
                            _this.title = _this.messages[0].userfromfullname || '';
                        }
                    }
                });
            }
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'addon.messages.errorwhileretrievingmessages', true);
        }).finally(function () {
            _this.checkCanDelete();
            _this.resizeContent();
            _this.loaded = true;
            _this.setPolling(); // Make sure we're polling messages.
            _this.setContactRequestInfo();
            _this.setFooterType();
            loader && loader.dismiss();
        });
    };
    /**
     * Runs when the page has fully entered and is now the active page.
     * This event will fire, whether it was the first load or a cached page.
     */
    AddonMessagesDiscussionPage.prototype.ionViewDidEnter = function () {
        this.setPolling();
    };
    /**
     * Runs when the page is about to leave and no longer be the active page.
     */
    AddonMessagesDiscussionPage.prototype.ionViewWillLeave = function () {
        this.unsetPolling();
    };
    /**
     * Convenience function to fetch messages.
     *
     * @return {Promise<any>} Resolved when done.
     */
    AddonMessagesDiscussionPage.prototype.fetchMessages = function () {
        var _this = this;
        this.loadMoreError = false;
        if (this.messagesBeingSent > 0) {
            // We do not poll while a message is being sent or we could confuse the user.
            // Otherwise, his message would disappear from the list, and he'd have to wait for the interval to check for messages.
            return Promise.reject(null);
        }
        else if (this.fetching) {
            // Already fetching.
            return Promise.reject(null);
        }
        else if (this.groupMessagingEnabled && !this.conversationId) {
            // Don't have enough data to fetch messages.
            return Promise.reject(null);
        }
        if (this.conversationId) {
            this.logger.debug("Polling new messages for conversation '" + this.conversationId + "'");
        }
        else {
            this.logger.debug("Polling new messages for discussion with user '" + this.userId + "'");
        }
        this.fetching = true;
        // Wait for synchronization process to finish.
        return this.messagesSync.waitForSyncConversation(this.conversationId, this.userId).then(function () {
            // Fetch messages. Invalidate the cache before fetching.
            if (_this.groupMessagingEnabled) {
                return _this.messagesProvider.invalidateConversationMessages(_this.conversationId).catch(function () {
                    // Ignore errors.
                }).then(function () {
                    return _this.getConversationMessages(_this.pagesLoaded);
                });
            }
            else {
                return _this.messagesProvider.invalidateDiscussionCache(_this.userId).catch(function () {
                    // Ignore errors.
                }).then(function () {
                    return _this.getDiscussionMessages(_this.pagesLoaded);
                });
            }
        }).then(function (messages) {
            _this.loadMessages(messages);
        }).finally(function () {
            _this.fetching = false;
        });
    };
    /**
     * Format and load a list of messages into the view.
     *
     * @param {any[]} messages Messages to load.
     */
    AddonMessagesDiscussionPage.prototype.loadMessages = function (messages) {
        var _this = this;
        if (this.viewDestroyed) {
            return;
        }
        // Check if we are at the bottom to scroll it after render.
        this.scrollBottom = this.domUtils.getScrollHeight(this.content) - this.domUtils.getScrollTop(this.content) ===
            this.domUtils.getContentHeight(this.content);
        if (this.messagesBeingSent > 0) {
            // Ignore polling due to a race condition.
            return;
        }
        // Add new messages to the list and mark the messages that should still be displayed.
        messages.forEach(function (message) {
            _this.addMessage(message);
        });
        // Remove messages that shouldn't be in the list anymore.
        for (var hash in this.keepMessageMap) {
            this.removeMessage(hash);
        }
        // Sort the messages.
        this.messagesProvider.sortMessages(this.messages);
        // Calculate which messages need to display the date or user data.
        this.messages.forEach(function (message, index) {
            message.showDate = _this.showDate(message, _this.messages[index - 1]);
            message.showUserData = _this.showUserData(message, _this.messages[index - 1]);
        });
        // Notify that there can be a new message.
        this.notifyNewMessage();
        // Mark retrieved messages as read if they are not.
        this.markMessagesAsRead();
    };
    /**
     * Get the conversation.
     *
     * @param {number} conversationId Conversation ID.
     * @param {number} userId User ID.
     * @return {Promise<boolean>} Promise resolved with a boolean: whether the conversation exists or not.
     */
    AddonMessagesDiscussionPage.prototype.getConversation = function (conversationId, userId) {
        var _this = this;
        var promise, fallbackConversation;
        // Try to get the conversationId if we don't have it.
        if (conversationId) {
            promise = Promise.resolve(conversationId);
        }
        else {
            promise = this.messagesProvider.getConversationBetweenUsers(userId, undefined, true).then(function (conversation) {
                fallbackConversation = conversation;
                return conversation.id;
            });
        }
        return promise.then(function (conversationId) {
            // Retrieve the conversation. Invalidate data first to get the right unreadcount.
            return _this.messagesProvider.invalidateConversation(conversationId).catch(function () {
                // Ignore errors.
            }).then(function () {
                return _this.messagesProvider.getConversation(conversationId, undefined, true);
            }).catch(function (error) {
                // Get conversation failed, use the fallback one if we have it.
                if (fallbackConversation) {
                    return fallbackConversation;
                }
                return Promise.reject(error);
            }).then(function (conversation) {
                _this.conversation = conversation;
                if (conversation) {
                    _this.conversationId = conversation.id;
                    _this.title = conversation.name;
                    _this.conversationImage = conversation.imageurl;
                    _this.isGroup = conversation.type == __WEBPACK_IMPORTED_MODULE_5__providers_messages__["a" /* AddonMessagesProvider */].MESSAGE_CONVERSATION_TYPE_GROUP;
                    _this.favouriteIcon = conversation.isfavourite ? 'fa-star-o' : 'fa-star';
                    if (!_this.isGroup) {
                        _this.userId = conversation.userid;
                    }
                    return true;
                }
                else {
                    return false;
                }
            });
        }, function (error) {
            // Probably conversation does not exist or user is offline. Try to load offline messages.
            return _this.messagesOffline.getMessages(userId).then(function (messages) {
                if (messages && messages.length) {
                    // We have offline messages, this probably means that the conversation didn't exist. Don't display error.
                    messages.forEach(function (message) {
                        message.pending = true;
                        message.text = message.smallmessage;
                    });
                    _this.loadMessages(messages);
                }
                else if (error.errorcode != 'errorconversationdoesnotexist') {
                    // Display the error.
                    return Promise.reject(error);
                }
            });
        });
    };
    /**
     * Get the messages of the conversation. Used if group messaging is supported.
     *
     * @param {number} pagesToLoad Number of "pages" to load.
     * @param  {number} [offset=0] Offset for message list.
     * @return {Promise<any[]>} Promise resolved with the list of messages.
     */
    AddonMessagesDiscussionPage.prototype.getConversationMessages = function (pagesToLoad, offset) {
        var _this = this;
        if (offset === void 0) { offset = 0; }
        var excludePending = offset > 0;
        return this.messagesProvider.getConversationMessages(this.conversationId, excludePending, offset).then(function (result) {
            pagesToLoad--;
            // Treat members. Don't use CoreUtilsProvider.arrayToObject because we don't want to override the existing object.
            if (result.members) {
                result.members.forEach(function (member) {
                    _this.members[member.id] = member;
                });
            }
            if (pagesToLoad > 0 && result.canLoadMore) {
                offset += __WEBPACK_IMPORTED_MODULE_5__providers_messages__["a" /* AddonMessagesProvider */].LIMIT_MESSAGES;
                // Get more messages.
                return _this.getConversationMessages(pagesToLoad, offset).then(function (nextMessages) {
                    return result.messages.concat(nextMessages);
                });
            }
            else {
                // No more messages to load, return them.
                _this.canLoadMore = result.canLoadMore;
                return result.messages;
            }
        });
    };
    /**
     * Get a discussion. Can load several "pages".
     *
     * @param  {number}  pagesToLoad          Number of pages to load.
     * @param  {number}  [lfReceivedUnread=0] Number of unread received messages already fetched, so fetch will be done from this.
     * @param  {number}  [lfReceivedRead=0]   Number of read received messages already fetched, so fetch will be done from this.
     * @param  {number}  [lfSentUnread=0]     Number of unread sent messages already fetched, so fetch will be done from this.
     * @param  {number}  [lfSentRead=0]       Number of read sent messages already fetched, so fetch will be done from this.
     * @return {Promise<any>}  Resolved when done.
     */
    AddonMessagesDiscussionPage.prototype.getDiscussionMessages = function (pagesToLoad, lfReceivedUnread, lfReceivedRead, lfSentUnread, lfSentRead) {
        var _this = this;
        if (lfReceivedUnread === void 0) { lfReceivedUnread = 0; }
        if (lfReceivedRead === void 0) { lfReceivedRead = 0; }
        if (lfSentUnread === void 0) { lfSentUnread = 0; }
        if (lfSentRead === void 0) { lfSentRead = 0; }
        // Only get offline messages if we're loading the first "page".
        var excludePending = lfReceivedUnread > 0 || lfReceivedRead > 0 || lfSentUnread > 0 || lfSentRead > 0;
        // Get next messages.
        return this.messagesProvider.getDiscussion(this.userId, excludePending, lfReceivedUnread, lfReceivedRead, lfSentUnread, lfSentRead).then(function (result) {
            pagesToLoad--;
            if (pagesToLoad > 0 && result.canLoadMore) {
                // More pages to load. Calculate new limit froms.
                result.messages.forEach(function (message) {
                    if (!message.pending) {
                        if (message.useridfrom == _this.userId) {
                            if (message.read) {
                                lfReceivedRead++;
                            }
                            else {
                                lfReceivedUnread++;
                            }
                        }
                        else {
                            if (message.read) {
                                lfSentRead++;
                            }
                            else {
                                lfSentUnread++;
                            }
                        }
                    }
                });
                // Get next messages.
                return _this.getDiscussionMessages(pagesToLoad, lfReceivedUnread, lfReceivedRead, lfSentUnread, lfSentRead)
                    .then(function (nextMessages) {
                    return result.messages.concat(nextMessages);
                });
            }
            else {
                // No more messages to load, return them.
                _this.canLoadMore = result.canLoadMore;
                return result.messages;
            }
        });
    };
    /**
     * Mark messages as read.
     */
    AddonMessagesDiscussionPage.prototype.markMessagesAsRead = function () {
        var _this = this;
        var readChanged = false;
        var promises = [];
        if (this.messagesProvider.isMarkAllMessagesReadEnabled()) {
            var messageUnreadFound = false;
            // Mark all messages at a time if there is any unread message.
            if (this.groupMessagingEnabled) {
                messageUnreadFound = this.conversation && this.conversation.unreadcount > 0 && this.conversationId > 0;
            }
            else {
                for (var x in this.messages) {
                    var message = this.messages[x];
                    // If an unread message is found, mark all messages as read.
                    if (message.useridfrom != this.currentUserId && message.read == 0) {
                        messageUnreadFound = true;
                        break;
                    }
                }
            }
            if (messageUnreadFound) {
                this.setUnreadLabelPosition();
                var promise = void 0;
                if (this.groupMessagingEnabled) {
                    promise = this.messagesProvider.markAllConversationMessagesRead(this.conversationId);
                }
                else {
                    promise = this.messagesProvider.markAllMessagesRead(this.userId).then(function () {
                        // Mark all messages as read.
                        _this.messages.forEach(function (message) {
                            message.read = 1;
                        });
                    });
                }
                promises.push(promise.then(function () {
                    readChanged = true;
                }));
            }
        }
        else {
            this.setUnreadLabelPosition();
            // Mark each message as read one by one.
            this.messages.forEach(function (message) {
                // If the message is unread, call this.messagesProvider.markMessageRead.
                if (message.useridfrom != _this.currentUserId && message.read == 0) {
                    promises.push(_this.messagesProvider.markMessageRead(message.id).then(function () {
                        readChanged = true;
                        message.read = 1;
                    }));
                }
            });
        }
        Promise.all(promises).finally(function () {
            if (readChanged) {
                _this.eventsProvider.trigger(__WEBPACK_IMPORTED_MODULE_5__providers_messages__["a" /* AddonMessagesProvider */].READ_CHANGED_EVENT, {
                    conversationId: _this.conversationId,
                    userId: _this.userId
                }, _this.siteId);
            }
        });
    };
    /**
     * Notify the last message found so discussions list controller can tell if last message should be updated.
     */
    AddonMessagesDiscussionPage.prototype.notifyNewMessage = function () {
        var last = this.messages[this.messages.length - 1];
        var trigger = false;
        if (!last) {
            this.lastMessage = { text: '', timecreated: 0 };
            trigger = true;
        }
        else if (last.text !== this.lastMessage.text || last.timecreated !== this.lastMessage.timecreated) {
            this.lastMessage = { text: last.text, timecreated: last.timecreated };
            trigger = true;
        }
        if (trigger) {
            // Update discussions last message.
            this.eventsProvider.trigger(__WEBPACK_IMPORTED_MODULE_5__providers_messages__["a" /* AddonMessagesProvider */].NEW_MESSAGE_EVENT, {
                conversationId: this.conversationId,
                userId: this.userId,
                message: this.lastMessage.text,
                timecreated: this.lastMessage.timecreated,
                isfavourite: this.conversation && this.conversation.isfavourite,
                type: this.conversation && this.conversation.type
            }, this.siteId);
            // Update navBar links and buttons.
            var newCanDelete = (last && last.id && this.messages.length == 1) || this.messages.length > 1;
            if (this.canDelete != newCanDelete) {
                this.checkCanDelete();
            }
        }
    };
    /**
     * Set the place where the unread label position has to be.
     */
    AddonMessagesDiscussionPage.prototype.setUnreadLabelPosition = function () {
        if (this.unreadMessageFrom != 0) {
            return;
        }
        if (this.groupMessagingEnabled) {
            // Use the unreadcount from the conversation to calculate where should the label be placed.
            if (this.conversation && this.conversation.unreadcount > 0 && this.messages) {
                // Iterate over messages to find the right message using the unreadcount. Skip offline messages and own messages.
                var found = 0;
                for (var i = this.messages.length - 1; i >= 0; i--) {
                    var message = this.messages[i];
                    if (!message.pending && message.useridfrom != this.currentUserId) {
                        found++;
                        if (found == this.conversation.unreadcount) {
                            this.unreadMessageFrom = parseInt(message.id, 10);
                            break;
                        }
                    }
                }
            }
        }
        else {
            var previousMessageRead = false;
            for (var x in this.messages) {
                var message = this.messages[x];
                if (message.useridfrom != this.currentUserId) {
                    var unreadFrom = message.read == 0 && previousMessageRead;
                    if (unreadFrom) {
                        // Save where the label is placed.
                        this.unreadMessageFrom = parseInt(message.id, 10);
                        break;
                    }
                    previousMessageRead = message.read != 0;
                }
            }
        }
        // Do not update the message unread from label on next refresh.
        if (this.unreadMessageFrom == 0) {
            // Using negative to indicate the label is not placed but should not be placed.
            this.unreadMessageFrom = -1;
        }
    };
    /**
     * Check if there's any message in the list that can be deleted.
     */
    AddonMessagesDiscussionPage.prototype.checkCanDelete = function () {
        // All messages being sent should be at the end of the list.
        var first = this.messages[0];
        this.canDelete = first && !first.sending;
    };
    /**
     * Hide unread label when sending messages.
     */
    AddonMessagesDiscussionPage.prototype.hideUnreadLabel = function () {
        if (this.unreadMessageFrom > 0) {
            this.unreadMessageFrom = -1;
        }
    };
    /**
     * Wait until fetching is false.
     * @return {Promise<void>} Resolved when done.
     */
    AddonMessagesDiscussionPage.prototype.waitForFetch = function () {
        var _this = this;
        if (!this.fetching) {
            return Promise.resolve();
        }
        var deferred = this.utils.promiseDefer();
        setTimeout(function () {
            return _this.waitForFetch().finally(function () {
                deferred.resolve();
            });
        }, 400);
        return deferred.promise;
    };
    /**
     * Set a polling to get new messages every certain time.
     */
    AddonMessagesDiscussionPage.prototype.setPolling = function () {
        var _this = this;
        if (this.groupMessagingEnabled && !this.conversationId) {
            // Don't have enough data to poll messages.
            return;
        }
        if (!this.polling) {
            // Start polling.
            this.polling = setInterval(function () {
                _this.fetchMessages().catch(function () {
                    // Ignore errors.
                });
            }, __WEBPACK_IMPORTED_MODULE_5__providers_messages__["a" /* AddonMessagesProvider */].POLL_INTERVAL);
        }
    };
    /**
     * Unset polling.
     */
    AddonMessagesDiscussionPage.prototype.unsetPolling = function () {
        if (this.polling) {
            this.logger.debug("Cancelling polling for conversation with user '" + this.userId + "'");
            clearInterval(this.polling);
            this.polling = undefined;
        }
    };
    /**
     * Copy message to clipboard.
     *
     * @param {any} message Message to be copied.
     */
    AddonMessagesDiscussionPage.prototype.copyMessage = function (message) {
        this.utils.copyToClipboard(message.smallmessage || message.text || '');
    };
    /**
     * Function to delete a message.
     *
     * @param {any} message  Message object to delete.
     * @param {number} index Index where the message is to delete it from the view.
     */
    AddonMessagesDiscussionPage.prototype.deleteMessage = function (message, index) {
        var _this = this;
        var langKey = message.pending ? 'core.areyousure' : 'addon.messages.deletemessageconfirmation';
        this.domUtils.showConfirm(this.translate.instant(langKey)).then(function () {
            var modal = _this.domUtils.showModalLoading('core.deleting', true);
            return _this.messagesProvider.deleteMessage(message).then(function () {
                // Remove message from the list without having to wait for re-fetch.
                _this.messages.splice(index, 1);
                _this.removeMessage(message.hash);
                _this.notifyNewMessage();
                _this.fetchMessages(); // Re-fetch messages to update cached data.
            }).finally(function () {
                modal.dismiss();
            });
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'addon.messages.errordeletemessage', true);
        });
    };
    /**
     * Function to load previous messages.
     *
     * @param {any} [infiniteComplete] Infinite scroll complete function. Only used from core-infinite-loading.
     * @return {Promise<any>} Resolved when done.
     */
    AddonMessagesDiscussionPage.prototype.loadPrevious = function (infiniteComplete) {
        var _this = this;
        // If there is an ongoing fetch, wait for it to finish.
        return this.waitForFetch().finally(function () {
            _this.pagesLoaded++;
            _this.fetchMessages().catch(function (error) {
                _this.loadMoreError = true; // Set to prevent infinite calls with infinite-loading.
                _this.pagesLoaded--;
                _this.domUtils.showErrorModalDefault(error, 'addon.messages.errorwhileretrievingmessages', true);
            }).finally(function () {
                infiniteComplete && infiniteComplete();
            });
        });
    };
    /**
     * Content or scroll has been resized. For content, only call it if it's been added on top.
     */
    AddonMessagesDiscussionPage.prototype.resizeContent = function () {
        var _this = this;
        var top = this.content.getContentDimensions().scrollTop;
        this.content.resize();
        // Wait for new content height to be calculated.
        setTimeout(function () {
            // Visible content size changed, maintain the bottom position.
            if (!_this.viewDestroyed && _this.content && _this.domUtils.getContentHeight(_this.content) != _this.oldContentHeight) {
                if (!top) {
                    top = _this.content.getContentDimensions().scrollTop;
                }
                top += _this.oldContentHeight - _this.domUtils.getContentHeight(_this.content);
                _this.oldContentHeight = _this.domUtils.getContentHeight(_this.content);
                _this.domUtils.scrollTo(_this.content, 0, top, 0);
            }
        });
    };
    /**
     * Scroll bottom when render has finished.
     */
    AddonMessagesDiscussionPage.prototype.scrollToBottom = function () {
        var _this = this;
        // Check if scroll is at bottom. If so, scroll bottom after rendering since there might be something new.
        if (this.scrollBottom) {
            // Need a timeout to leave time to the view to be rendered.
            setTimeout(function () {
                if (!_this.viewDestroyed) {
                    _this.domUtils.scrollToBottom(_this.content, 0);
                }
            });
            this.scrollBottom = false;
        }
    };
    /**
     * Sends a message to the server.
     *
     * @param {string} text Message text.
     */
    AddonMessagesDiscussionPage.prototype.sendMessage = function (text) {
        var _this = this;
        var message;
        this.hideUnreadLabel();
        this.showDelete = false;
        this.scrollBottom = true;
        message = {
            pending: true,
            sending: true,
            useridfrom: this.currentUserId,
            smallmessage: text,
            text: text,
            timecreated: new Date().getTime()
        };
        message.showDate = this.showDate(message, this.messages[this.messages.length - 1]);
        this.addMessage(message, false);
        this.messagesBeingSent++;
        // If there is an ongoing fetch, wait for it to finish.
        // Otherwise, if a message is sent while fetching it could disappear until the next fetch.
        this.waitForFetch().finally(function () {
            var promise;
            if (_this.conversationId) {
                promise = _this.messagesProvider.sendMessageToConversation(_this.conversation, text);
            }
            else {
                promise = _this.messagesProvider.sendMessage(_this.userId, text);
            }
            promise.then(function (data) {
                var promise;
                _this.messagesBeingSent--;
                if (data.sent) {
                    if (!_this.conversationId && data.message && data.message.conversationid) {
                        // Message sent to a new conversation, try to load the conversation.
                        promise = _this.getConversation(data.message.conversationid, _this.userId).then(function () {
                            // Now fetch messages.
                            return _this.fetchMessages();
                        }).finally(function () {
                            // Start polling messages now that the conversation exists.
                            _this.setPolling();
                        });
                    }
                    else {
                        // Message was sent, fetch messages right now.
                        promise = _this.fetchMessages();
                    }
                }
                else {
                    promise = Promise.reject(null);
                }
                promise.catch(function () {
                    // Fetch failed or is offline message, mark the message as sent.
                    // If fetch is successful there's no need to mark it because the fetch will already show the message received.
                    message.sending = false;
                    if (data.sent) {
                        // Message sent to server, not pending anymore.
                        message.pending = false;
                    }
                    else if (data.message) {
                        message.timecreated = data.message.timecreated;
                    }
                    _this.notifyNewMessage();
                });
            }).catch(function (error) {
                _this.messagesBeingSent--;
                // Only close the keyboard if an error happens.
                // We want the user to be able to send multiple messages without the keyboard being closed.
                _this.appProvider.closeKeyboard();
                _this.domUtils.showErrorModalDefault(error, 'addon.messages.messagenotsent', true);
                _this.removeMessage(message.hash);
            });
        });
    };
    /**
     * Check date should be shown on message list for the current message.
     * If date has changed from previous to current message it should be shown.
     *
     * @param {any} message       Current message where to show the date.
     * @param {any} [prevMessage] Previous message where to compare the date with.
     * @return {boolean}  If date has changed and should be shown.
     */
    AddonMessagesDiscussionPage.prototype.showDate = function (message, prevMessage) {
        if (!prevMessage) {
            // First message, show it.
            return true;
        }
        // Check if day has changed.
        return !__WEBPACK_IMPORTED_MODULE_16_moment__(message.timecreated).isSame(prevMessage.timecreated, 'day');
    };
    /**
     * Check if the user info should be displayed for the current message.
     * User data is only displayed for group conversations if the previous message was from another user.
     *
     * @param {any} message Current message where to show the user info.
     * @param {any} [prevMessage] Previous message.
     * @return {boolean} Whether user data should be shown.
     */
    AddonMessagesDiscussionPage.prototype.showUserData = function (message, prevMessage) {
        return this.isGroup && message.useridfrom != this.currentUserId && this.members[message.useridfrom] &&
            (!prevMessage || prevMessage.useridfrom != message.useridfrom || message.showDate);
    };
    /**
     * Toggles delete state.
     */
    AddonMessagesDiscussionPage.prototype.toggleDelete = function () {
        this.showDelete = !this.showDelete;
    };
    /**
     * View info. If it's an individual conversation, go to the user profile.
     * If it's a group conversation, view info about the group.
     */
    AddonMessagesDiscussionPage.prototype.viewInfo = function () {
        var _this = this;
        if (this.isGroup) {
            // Display the group information.
            var modal = this.modalCtrl.create('AddonMessagesConversationInfoPage', {
                conversationId: this.conversationId
            });
            modal.present();
            modal.onDidDismiss(function (userId) {
                if (typeof userId != 'undefined') {
                    // Open user conversation.
                    if (_this.svComponent) {
                        // Notify the left pane to load it, this way the right conversation will be highlighted.
                        _this.eventsProvider.trigger(__WEBPACK_IMPORTED_MODULE_5__providers_messages__["a" /* AddonMessagesProvider */].OPEN_CONVERSATION_EVENT, { userId: userId }, _this.siteId);
                    }
                    else {
                        // Open the discussion in a new view.
                        _this.navCtrl.push('AddonMessagesDiscussionPage', { userId: userId });
                    }
                }
            });
        }
        else {
            // Open the user profile.
            var navCtrl = this.svComponent ? this.svComponent.getMasterNav() : this.navCtrl;
            navCtrl.push('CoreUserProfilePage', { userId: this.userId });
        }
    };
    /**
     * Change the favourite state of the current conversation.
     *
     * @param {Function} [done] Function to call when done.
     */
    AddonMessagesDiscussionPage.prototype.changeFavourite = function (done) {
        var _this = this;
        this.favouriteIcon = 'spinner';
        this.messagesProvider.setFavouriteConversation(this.conversation.id, !this.conversation.isfavourite).then(function () {
            _this.conversation.isfavourite = !_this.conversation.isfavourite;
            // Get the conversation data so it's cached. Don't block the user for this.
            _this.messagesProvider.getConversation(_this.conversation.id, undefined, true);
            _this.eventsProvider.trigger(__WEBPACK_IMPORTED_MODULE_5__providers_messages__["a" /* AddonMessagesProvider */].UPDATE_CONVERSATION_LIST_EVENT, {
                conversationId: _this.conversation.id,
                action: 'favourite',
                value: _this.conversation.isfavourite
            }, _this.siteId);
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'Error changing favourite state.');
        }).finally(function () {
            _this.favouriteIcon = _this.conversation.isfavourite ? 'fa-star-o' : 'fa-star';
            done && done();
        });
    };
    /**
     * Calculate whether there are pending contact requests.
     */
    AddonMessagesDiscussionPage.prototype.setContactRequestInfo = function () {
        var _this = this;
        this.requestContactSent = false;
        this.requestContactReceived = false;
        if (this.otherMember && !this.otherMember.iscontact) {
            this.requestContactSent = this.otherMember.contactrequests.some(function (request) {
                return request.userid == _this.currentUserId && request.requesteduserid == _this.otherMember.id;
            });
            this.requestContactReceived = this.otherMember.contactrequests.some(function (request) {
                return request.userid == _this.otherMember.id && request.requesteduserid == _this.currentUserId;
            });
        }
    };
    /**
     * Calculate what to display in the footer.
     */
    AddonMessagesDiscussionPage.prototype.setFooterType = function () {
        if (!this.otherMember) {
            // Group conversation or group messaging not available.
            this.footerType = 'message';
        }
        else if (this.otherMember.isblocked) {
            this.footerType = 'blocked';
        }
        else if (this.requestContactReceived) {
            this.footerType = 'requestReceived';
        }
        else if (this.otherMember.canmessage) {
            this.footerType = 'message';
        }
        else if (this.requestContactSent) {
            this.footerType = 'requestSent';
        }
        else if (this.otherMember.requirescontact) {
            this.footerType = 'requiresContact';
        }
        else {
            this.footerType = 'unable';
        }
    };
    /**
     * Displays a confirmation modal to block the user of the individual conversation.
     *
     * @return {Promise<any>} Promise resolved when user is blocked or dialog is cancelled.
     */
    AddonMessagesDiscussionPage.prototype.blockUser = function () {
        var _this = this;
        if (!this.otherMember) {
            // Should never happen.
            return Promise.reject(null);
        }
        var template = this.translate.instant('addon.messages.blockuserconfirm', { $a: this.otherMember.fullname });
        var okText = this.translate.instant('addon.messages.blockuser');
        return this.domUtils.showConfirm(template, undefined, okText).then(function () {
            _this.blockIcon = 'spinner';
            var modal = _this.domUtils.showModalLoading('core.sending', true);
            _this.showLoadingModal = true;
            return _this.messagesProvider.blockContact(_this.otherMember.id).finally(function () {
                modal.dismiss();
                _this.showLoadingModal = false;
            });
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'core.error', true);
        }).finally(function () {
            _this.blockIcon = _this.otherMember.isblocked ? 'close-circle' : 'checkmark-circle';
        });
    };
    /**
     * Delete the conversation.
     *
     * @param {Function} [done] Function to call when done.
     */
    AddonMessagesDiscussionPage.prototype.deleteConversation = function (done) {
        var _this = this;
        this.domUtils.showConfirm(this.translate.instant('addon.messages.deleteallconfirm')).then(function () {
            _this.deleteIcon = 'spinner';
            return _this.messagesProvider.deleteConversation(_this.conversation.id).then(function () {
                _this.eventsProvider.trigger(__WEBPACK_IMPORTED_MODULE_5__providers_messages__["a" /* AddonMessagesProvider */].UPDATE_CONVERSATION_LIST_EVENT, {
                    conversationId: _this.conversation.id,
                    action: 'delete'
                }, _this.siteId);
                _this.conversationId = undefined;
                _this.conversation = undefined;
                _this.messages = [];
            }).finally(function () {
                _this.deleteIcon = 'trash';
                done && done();
            });
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'Error deleting conversation.');
        });
    };
    /**
     * Displays a confirmation modal to unblock the user of the individual conversation.
     *
     * @return {Promise<any>} Promise resolved when user is unblocked or dialog is cancelled.
     */
    AddonMessagesDiscussionPage.prototype.unblockUser = function () {
        var _this = this;
        if (!this.otherMember) {
            // Should never happen.
            return Promise.reject(null);
        }
        var template = this.translate.instant('addon.messages.unblockuserconfirm', { $a: this.otherMember.fullname });
        var okText = this.translate.instant('addon.messages.unblockuser');
        return this.domUtils.showConfirm(template, undefined, okText).then(function () {
            _this.blockIcon = 'spinner';
            var modal = _this.domUtils.showModalLoading('core.sending', true);
            _this.showLoadingModal = true;
            return _this.messagesProvider.unblockContact(_this.otherMember.id).finally(function () {
                modal.dismiss();
                _this.showLoadingModal = false;
            });
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'core.error', true);
        }).finally(function () {
            _this.blockIcon = _this.otherMember.isblocked ? 'close-circle' : 'checkmark-circle';
        });
    };
    /**
     * Displays a confirmation modal to send a contact request to the other user of the individual conversation.
     *
     * @return {Promise<any>} Promise resolved when the request is sent or the dialog is cancelled.
     */
    AddonMessagesDiscussionPage.prototype.createContactRequest = function () {
        var _this = this;
        if (!this.otherMember) {
            // Should never happen.
            return Promise.reject(null);
        }
        var template = this.translate.instant('addon.messages.addcontactconfirm', { $a: this.otherMember.fullname });
        var okText = this.translate.instant('core.add');
        return this.domUtils.showConfirm(template, undefined, okText).then(function () {
            _this.addRemoveIcon = 'spinner';
            var modal = _this.domUtils.showModalLoading('core.sending', true);
            _this.showLoadingModal = true;
            return _this.messagesProvider.createContactRequest(_this.otherMember.id).finally(function () {
                modal.dismiss();
                _this.showLoadingModal = false;
            });
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'core.error', true);
        }).finally(function () {
            _this.addRemoveIcon = _this.otherMember.iscontact ? 'remove' : 'add';
        });
    };
    /**
     * Confirms the contact request of the other user of the individual conversation.
     *
     * @return {Promise<any>} Promise resolved when the request is confirmed.
     */
    AddonMessagesDiscussionPage.prototype.confirmContactRequest = function () {
        var _this = this;
        if (!this.otherMember) {
            // Should never happen.
            return Promise.reject(null);
        }
        var modal = this.domUtils.showModalLoading('core.sending', true);
        this.showLoadingModal = true;
        return this.messagesProvider.confirmContactRequest(this.otherMember.id).finally(function () {
            modal.dismiss();
            _this.showLoadingModal = false;
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'core.error', true);
        });
    };
    /**
     * Declines the contact request of the other user of the individual conversation.
     *
     * @return {Promise<any>} Promise resolved when the request is confirmed.
     */
    AddonMessagesDiscussionPage.prototype.declineContactRequest = function () {
        var _this = this;
        if (!this.otherMember) {
            // Should never happen.
            return Promise.reject(null);
        }
        var modal = this.domUtils.showModalLoading('core.sending', true);
        this.showLoadingModal = true;
        return this.messagesProvider.declineContactRequest(this.otherMember.id).finally(function () {
            modal.dismiss();
            _this.showLoadingModal = false;
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'core.error', true);
        });
    };
    /**
     * Displays a confirmation modal to remove the other user of the conversation from contacts.
     *
     * @return {Promise<any>} Promise resolved when the request is sent or the dialog is cancelled.
     */
    AddonMessagesDiscussionPage.prototype.removeContact = function () {
        var _this = this;
        if (!this.otherMember) {
            // Should never happen.
            return Promise.reject(null);
        }
        var template = this.translate.instant('addon.messages.removecontactconfirm', { $a: this.otherMember.fullname });
        var okText = this.translate.instant('core.remove');
        return this.domUtils.showConfirm(template, undefined, okText).then(function () {
            _this.addRemoveIcon = 'spinner';
            var modal = _this.domUtils.showModalLoading('core.sending', true);
            _this.showLoadingModal = true;
            return _this.messagesProvider.removeContact(_this.otherMember.id).finally(function () {
                modal.dismiss();
                _this.showLoadingModal = false;
            });
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'core.error', true);
        }).finally(function () {
            _this.addRemoveIcon = _this.otherMember.iscontact ? 'remove' : 'add';
        });
    };
    /**
     * Page destroyed.
     */
    AddonMessagesDiscussionPage.prototype.ngOnDestroy = function () {
        // Unset again, just in case.
        this.unsetPolling();
        this.syncObserver && this.syncObserver.off();
        this.keyboardObserver && this.keyboardObserver.off();
        this.memberInfoObserver && this.memberInfoObserver.off();
        this.viewDestroyed = true;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Content */])
    ], AddonMessagesDiscussionPage.prototype, "content", void 0);
    AddonMessagesDiscussionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-addon-messages-discussion',template:/*ion-inline-start:"/home/travis/build/moodlehq/moodlemobile2/src/addon/messages/pages/discussion/discussion.html"*/'<ion-header>\n    <ion-navbar core-back-button>\n        <ion-title>\n            <img *ngIf="loaded && !otherMember && conversationImage" class="core-bar-button-image" [src]="conversationImage" alt="" onError="this.src=\'assets/img/group-avatar.png\'" core-external-content role="presentation" [siteId]="siteId || null">\n            <ion-avatar *ngIf="loaded && otherMember" class="core-bar-button-image" core-user-avatar [user]="otherMember" [linkProfile]="false" [checkOnline]="otherMember.showonlinestatus" item-start (click)="showInfo && viewInfo()"></ion-avatar>\n            <core-format-text [text]="title" (click)="showInfo && !isGroup && viewInfo()"></core-format-text>\n            <core-icon *ngIf="conversation && conversation.isfavourite" name="fa-star"></core-icon>\n        </ion-title>\n        <ion-buttons end></ion-buttons>\n    </ion-navbar>\n    <core-navbar-buttons end>\n        <core-context-menu>\n            <core-context-menu-item [hidden]="!showInfo || isGroup" [priority]="1000" [content]="\'addon.messages.info\' | translate" (action)="viewInfo()" iconAction="information-circle"></core-context-menu-item>\n            <core-context-menu-item [hidden]="!showInfo || !isGroup" [priority]="1000" [content]="\'addon.messages.groupinfo\' | translate" (action)="viewInfo()" iconAction="information-circle"></core-context-menu-item>\n            <core-context-menu-item [hidden]="!groupMessagingEnabled || !conversation" [priority]="800" [content]="(conversation && conversation.isfavourite ? \'addon.messages.removefromfavourites\' : \'addon.messages.addtofavourites\') | translate" (action)="changeFavourite($event)" [closeOnClick]="false" [iconAction]="favouriteIcon"></core-context-menu-item>\n            <core-context-menu-item [hidden]="!otherMember || otherMember.isblocked" [priority]="700" [content]="\'addon.messages.blockuser\' | translate" (action)="blockUser()" [iconAction]="blockIcon"></core-context-menu-item>\n            <core-context-menu-item [hidden]="!otherMember || !otherMember.isblocked" [priority]="700" [content]="\'addon.messages.unblockuser\' | translate" (action)="unblockUser()" [iconAction]="blockIcon"></core-context-menu-item>\n            <core-context-menu-item [hidden]="!canDelete" [priority]="400" [content]="\'addon.messages.showdeletemessages\' | translate" (action)="toggleDelete()" [iconAction]="(showDelete ? \'checkbox-outline\' : \'square-outline\')"></core-context-menu-item>\n            <core-context-menu-item [hidden]="!groupMessagingEnabled || !conversationId || isGroup" [priority]="200" [content]="\'addon.messages.deleteconversation\' | translate" (action)="deleteConversation($event)" [closeOnClick]="false" [iconAction]="deleteIcon"></core-context-menu-item>\n            <core-context-menu-item [hidden]="!otherMember || otherMember.iscontact || requestContactSent || requestContactReceived" [priority]="100" [content]="\'addon.messages.addtoyourcontacts\' | translate" (action)="createContactRequest()" [iconAction]="addRemoveIcon"></core-context-menu-item>\n            <core-context-menu-item [hidden]="!otherMember || !otherMember.iscontact" [priority]="100" [content]="\'addon.messages.removefromyourcontacts\' | translate" (action)="removeContact()" [iconAction]="addRemoveIcon"></core-context-menu-item>\n        </core-context-menu>\n    </core-navbar-buttons>\n</ion-header>\n<ion-content class="has-footer">\n    <core-loading [hideUntil]="loaded">\n        <!-- Load previous messages. -->\n        <core-infinite-loading [enabled]="canLoadMore" (action)="loadPrevious($event)" position="top" [error]="loadMoreError"></core-infinite-loading>\n        <ion-list class="addon-messages-discussion-container safe-area-page" [class.addon-messages-discussion-group]="isGroup" [attr.aria-live]="\'polite\'">\n            <ng-container *ngFor="let message of messages; index as index; last as last">\n                <h6 text-center *ngIf="message.showDate" class="addon-messages-date">\n                    {{ message.timecreated | coreFormatDate: "strftimedayshort" }}\n                </h6>\n\n                <ion-chip class="addon-messages-unreadfrom" *ngIf="unreadMessageFrom && message.id == unreadMessageFrom" color="light">\n                    <ion-label>{{ \'addon.messages.newmessages\' | translate:{$a: title} }}</ion-label>\n                    <ion-icon name="arrow-round-down"></ion-icon>\n                </ion-chip>\n\n                <ion-item text-wrap (longPress)="copyMessage(message)" class="addon-message" [class.addon-message-mine]="message.useridfrom == currentUserId" [class.addon-message-not-mine]="message.useridfrom != currentUserId" [class.addon-message-no-user]="!message.showUserData" [@coreSlideInOut]="message.useridfrom == currentUserId ? \'\' : \'fromLeft\'">\n                    <!-- User data. -->\n                    <h2 class="addon-message-user" >\n                        <ion-avatar item-start core-user-avatar [user]="members[message.useridfrom]" [linkProfile]="false" *ngIf="message.showUserData"></ion-avatar>\n\n                        <div *ngIf="message.showUserData">{{ members[message.useridfrom].fullname }}</div>\n\n                        <ion-note *ngIf="!message.pending">{{ message.timecreated | coreFormatDate: "strftimetime" }}</ion-note>\n                        <ion-note *ngIf="message.pending"><ion-icon name="time"></ion-icon></ion-note>\n                    </h2>\n\n                    <!-- Some messages have <p> and some others don\'t. Add a <p> so they all have same styles. -->\n                    <p class="addon-message-text">\n                        <core-format-text (afterRender)="last && scrollToBottom()" [text]="message.text"></core-format-text>\n                    </p>\n\n                    <button ion-button icon-only clear="true" *ngIf="!message.sending && showDelete" (click)="deleteMessage(message, index)" class="addon-messages-delete-button" [@coreSlideInOut]="\'fromRight\'" [attr.aria-label]=" \'addon.messages.deletemessage\' | translate">\n                        <ion-icon name="trash" color="danger"></ion-icon>\n                    </button>\n                </ion-item>\n            </ng-container>\n        </ion-list>\n        <core-empty-box *ngIf="!messages || messages.length <= 0" icon="chatbubbles" [message]="\'addon.messages.nomessagesfound\' | translate"></core-empty-box>\n    </core-loading>\n</ion-content>\n<ion-footer color="light" class="footer-adjustable" *ngIf="loaded && (!conversationId || conversation)">\n    <ion-toolbar color="light" position="bottom">\n        <p *ngIf="footerType == \'unable\'" text-center margin-horizontal>{{ \'addon.messages.unabletomessage\' | translate }}</p>\n        <div *ngIf="footerType == \'blocked\'" padding-horizontal>\n            <p text-center>{{ \'addon.messages.youhaveblockeduser\' | translate }}</p>\n            <button ion-button block text-wrap margin-bottom (click)="unblockUser()">{{ \'addon.messages.unblockuser\' | translate }}</button>\n        </div>\n        <div *ngIf="footerType == \'requiresContact\'" padding-horizontal>\n            <p text-center><strong>{{ \'addon.messages.isnotinyourcontacts\' | translate: {$a: otherMember.fullname} }}</strong></p>\n            <p text-center>{{ \'addon.messages.requirecontacttomessage\' | translate: {$a: otherMember.fullname} }}</p>\n            <button ion-button block text-wrap margin-bottom (click)="createContactRequest()">{{ \'addon.messages.sendcontactrequest\' | translate }}</button>\n        </div>\n        <div *ngIf="footerType == \'requestReceived\'" padding-horizontal>\n            <p text-center>{{ \'addon.messages.userwouldliketocontactyou\' | translate: {$a: otherMember.fullname} }}</p>\n            <button ion-button block text-wrap margin-bottom (click)="confirmContactRequest()">{{ \'addon.messages.acceptandaddcontact\' | translate }}</button>\n            <button ion-button block text-wrap margin-bottom color="light" (click)="declineContactRequest()">{{ \'addon.messages.decline\' | translate }}</button>\n        </div>\n        <div *ngIf="footerType == \'requestSent\' || (footerType == \'message\' && requestContactSent)" padding-horizontal>\n            <p text-center><strong>{{ \'addon.messages.contactrequestsent\' | translate }}</strong></p>\n            <p text-center>{{ \'addon.messages.yourcontactrequestpending\' | translate: {$a: otherMember.fullname} }}</p>\n        </div>\n        <core-send-message-form *ngIf="footerType == \'message\'" (onSubmit)="sendMessage($event)" [showKeyboard]="showKeyboard" [placeholder]="\'addon.messages.newmessage\' | translate" (onResize)="resizeContent()"></core-send-message-form>\n    </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/home/travis/build/moodlehq/moodlemobile2/src/addon/messages/pages/discussion/discussion.html"*/,
            animations: [__WEBPACK_IMPORTED_MODULE_13__classes_animations__["b" /* coreSlideInOut */]]
        }),
        __param(12, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["N" /* Optional */])()),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__providers_events__["a" /* CoreEventsProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_sites__["a" /* CoreSitesProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_8__core_user_providers_user__["a" /* CoreUserProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavController */], __WEBPACK_IMPORTED_MODULE_7__providers_sync__["a" /* AddonMessagesSyncProvider */],
            __WEBPACK_IMPORTED_MODULE_9__providers_utils_dom__["a" /* CoreDomUtilsProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_messages__["a" /* AddonMessagesProvider */], __WEBPACK_IMPORTED_MODULE_11__providers_logger__["a" /* CoreLoggerProvider */],
            __WEBPACK_IMPORTED_MODULE_10__providers_utils_utils__["a" /* CoreUtilsProvider */], __WEBPACK_IMPORTED_MODULE_12__providers_app__["a" /* CoreAppProvider */], __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_14__components_split_view_split_view__["a" /* CoreSplitViewComponent */], __WEBPACK_IMPORTED_MODULE_6__providers_messages_offline__["a" /* AddonMessagesOfflineProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ModalController */]])
    ], AddonMessagesDiscussionPage);
    return AddonMessagesDiscussionPage;
}());

//# sourceMappingURL=discussion.js.map

/***/ })

});
//# sourceMappingURL=106.js.map