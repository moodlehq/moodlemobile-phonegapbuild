webpackJsonp([105],{

/***/ 1843:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddonMessagesGroupConversationsPageModule", function() { return AddonMessagesGroupConversationsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__group_conversations__ = __webpack_require__(1971);
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







var AddonMessagesGroupConversationsPageModule = /** @class */ (function () {
    function AddonMessagesGroupConversationsPageModule() {
    }
    AddonMessagesGroupConversationsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__group_conversations__["a" /* AddonMessagesGroupConversationsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_4__components_components_module__["a" /* CoreComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_5__directives_directives_module__["a" /* CoreDirectivesModule */],
                __WEBPACK_IMPORTED_MODULE_6__pipes_pipes_module__["a" /* CorePipesModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__group_conversations__["a" /* AddonMessagesGroupConversationsPage */]),
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */].forChild()
            ],
        })
    ], AddonMessagesGroupConversationsPageModule);
    return AddonMessagesGroupConversationsPageModule;
}());

//# sourceMappingURL=group-conversations.module.js.map

/***/ }),

/***/ 1971:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddonMessagesGroupConversationsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_events__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_sites__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_messages__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_messages_offline__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_utils_dom__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_utils_utils__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__addon_pushnotifications_providers_delegate__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_split_view_split_view__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__core_user_providers_user__ = __webpack_require__(25);
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
 * Page that displays the list of conversations, including group conversations.
 */
var AddonMessagesGroupConversationsPage = /** @class */ (function () {
    function AddonMessagesGroupConversationsPage(eventsProvider, sitesProvider, translate, messagesProvider, domUtils, navParams, navCtrl, platform, utils, pushNotificationsDelegate, messagesOffline, userProvider) {
        var _this = this;
        this.messagesProvider = messagesProvider;
        this.domUtils = domUtils;
        this.navCtrl = navCtrl;
        this.utils = utils;
        this.messagesOffline = messagesOffline;
        this.userProvider = userProvider;
        this.loaded = false;
        this.contactRequestsCount = 0;
        this.favourites = {
            type: null,
            favourites: true,
            count: 0,
            unread: 0
        };
        this.group = {
            type: __WEBPACK_IMPORTED_MODULE_5__providers_messages__["a" /* AddonMessagesProvider */].MESSAGE_CONVERSATION_TYPE_GROUP,
            favourites: false,
            count: 0,
            unread: 0
        };
        this.individual = {
            type: __WEBPACK_IMPORTED_MODULE_5__providers_messages__["a" /* AddonMessagesProvider */].MESSAGE_CONVERSATION_TYPE_INDIVIDUAL,
            favourites: false,
            count: 0,
            unread: 0
        };
        this.typeIndividual = __WEBPACK_IMPORTED_MODULE_5__providers_messages__["a" /* AddonMessagesProvider */].MESSAGE_CONVERSATION_TYPE_INDIVIDUAL;
        this.loadingString = translate.instant('core.loading');
        this.siteId = sitesProvider.getCurrentSiteId();
        this.currentUserId = sitesProvider.getCurrentSiteUserId();
        this.conversationId = navParams.get('conversationId') || false;
        // Update conversations when new message is received.
        this.newMessagesObserver = eventsProvider.on(__WEBPACK_IMPORTED_MODULE_5__providers_messages__["a" /* AddonMessagesProvider */].NEW_MESSAGE_EVENT, function (data) {
            // Check if the new message belongs to the option that is currently expanded.
            var expandedOption = _this.getExpandedOption(), messageOption = _this.getConversationOption(data);
            if (expandedOption != messageOption) {
                return; // Message doesn't belong to current list, stop.
            }
            // Search the conversation to update.
            var conversation = _this.findConversation(data.conversationId, data.userId, expandedOption);
            if (typeof conversation == 'undefined') {
                // Probably a new conversation, refresh the list.
                _this.loaded = false;
                _this.refreshData().finally(function () {
                    _this.loaded = true;
                });
            }
            else if (conversation.lastmessage != data.message || conversation.lastmessagedate != data.timecreated / 1000) {
                var isNewer = data.timecreated / 1000 > conversation.lastmessagedate;
                // An existing conversation has a new message, update the last message.
                conversation.lastmessage = data.message;
                conversation.lastmessagedate = data.timecreated / 1000;
                // Sort the affected list.
                var option = _this.getConversationOption(conversation);
                option.conversations = _this.messagesProvider.sortConversations(option.conversations);
                if (isNewer) {
                    // The last message is newer than the previous one, scroll to top to keep viewing the conversation.
                    _this.domUtils.scrollToTop(_this.content);
                }
            }
        }, this.siteId);
        // Update conversations when a message is read.
        this.readChangedObserver = eventsProvider.on(__WEBPACK_IMPORTED_MODULE_5__providers_messages__["a" /* AddonMessagesProvider */].READ_CHANGED_EVENT, function (data) {
            if (data.conversationId) {
                var conversation = _this.findConversation(data.conversationId);
                if (typeof conversation != 'undefined') {
                    // A conversation has been read reset counter.
                    conversation.unreadcount = 0;
                    // Conversations changed, invalidate them and refresh unread counts.
                    _this.messagesProvider.invalidateConversations();
                    _this.messagesProvider.refreshUnreadConversationCounts();
                }
            }
        }, this.siteId);
        // Load a discussion if we receive an event to do so.
        this.openConversationObserver = eventsProvider.on(__WEBPACK_IMPORTED_MODULE_5__providers_messages__["a" /* AddonMessagesProvider */].OPEN_CONVERSATION_EVENT, function (data) {
            if (data.conversationId || data.userId) {
                _this.gotoConversation(data.conversationId, data.userId);
            }
        }, this.siteId);
        // Refresh the view when the app is resumed.
        this.appResumeSubscription = platform.resume.subscribe(function () {
            if (!_this.loaded) {
                return;
            }
            _this.loaded = false;
            _this.refreshData().finally(function () {
                _this.loaded = true;
            });
        });
        // Update conversations if we receive an event to do so.
        this.updateConversationListObserver = eventsProvider.on(__WEBPACK_IMPORTED_MODULE_5__providers_messages__["a" /* AddonMessagesProvider */].UPDATE_CONVERSATION_LIST_EVENT, function () {
            _this.refreshData();
        }, this.siteId);
        // If a message push notification is received, refresh the view.
        this.pushObserver = pushNotificationsDelegate.on('receive').subscribe(function (notification) {
            // New message received. If it's from current site, refresh the data.
            if (utils.isFalseOrZero(notification.notif) && notification.site == _this.siteId) {
                // Don't refresh unread counts, it's refreshed from the main menu handler in this case.
                _this.refreshData(null, false);
            }
        });
        // Update unread conversation counts.
        this.cronObserver = eventsProvider.on(__WEBPACK_IMPORTED_MODULE_5__providers_messages__["a" /* AddonMessagesProvider */].UNREAD_CONVERSATION_COUNTS_EVENT, function (data) {
            _this.favourites.unread = data.favourites;
            _this.individual.unread = data.individual;
            _this.group.unread = data.group;
        }, this.siteId);
        // Update the contact requests badge.
        this.contactRequestsCountObserver = eventsProvider.on(__WEBPACK_IMPORTED_MODULE_5__providers_messages__["a" /* AddonMessagesProvider */].CONTACT_REQUESTS_COUNT_EVENT, function (data) {
            _this.contactRequestsCount = data.count;
        }, this.siteId);
        // Update block status of a user.
        this.memberInfoObserver = eventsProvider.on(__WEBPACK_IMPORTED_MODULE_5__providers_messages__["a" /* AddonMessagesProvider */].MEMBER_INFO_CHANGED_EVENT, function (data) {
            if (!data.userBlocked && !data.userUnblocked) {
                // The block status has not changed, ignore.
                return;
            }
            var expandedOption = _this.getExpandedOption();
            if (expandedOption == _this.individual || expandedOption == _this.favourites) {
                if (!expandedOption.conversations || expandedOption.conversations.length <= 0) {
                    return;
                }
                var conversation = _this.findConversation(undefined, data.userId, expandedOption);
                if (conversation) {
                    conversation.isblocked = data.userBlocked;
                }
            }
        }, this.siteId);
    }
    /**
     * Component loaded.
     */
    AddonMessagesGroupConversationsPage.prototype.ngOnInit = function () {
        var _this = this;
        if (this.conversationId) {
            // There is a discussion to load, open the discussion in a new state.
            this.gotoConversation(this.conversationId);
        }
        this.fetchData().then(function () {
            if (!_this.conversationId && _this.splitviewCtrl.isOn()) {
                // Load the first conversation.
                var conversation = void 0;
                var expandedOption = _this.getExpandedOption();
                if (expandedOption) {
                    conversation = expandedOption.conversations[0];
                }
                if (conversation) {
                    _this.gotoConversation(conversation.id);
                }
            }
        });
    };
    /**
     * Fetch conversations.
     *
     * @param {booleam} [refreshUnreadCounts=true] Whether to refresh unread counts.
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonMessagesGroupConversationsPage.prototype.fetchData = function (refreshUnreadCounts) {
        var _this = this;
        if (refreshUnreadCounts === void 0) { refreshUnreadCounts = true; }
        this.loadingMessage = this.loadingString;
        // Load the amount of conversations and contact requests.
        var promises = [];
        promises.push(this.fetchConversationCounts());
        promises.push(this.messagesProvider.getContactRequestsCount()); // View updated by the event observer.
        return Promise.all(promises).then(function () {
            if (typeof _this.favourites.expanded == 'undefined') {
                // The expanded status hasn't been initialized. Do it now.
                if (_this.conversationId) {
                    // A certain conversation should be opened.
                    // We don't know which option it belongs to, so we need to fetch the data for all of them.
                    var promises_1 = [];
                    promises_1.push(_this.fetchDataForOption(_this.favourites, false, refreshUnreadCounts));
                    promises_1.push(_this.fetchDataForOption(_this.group, false, refreshUnreadCounts));
                    promises_1.push(_this.fetchDataForOption(_this.individual, false, refreshUnreadCounts));
                    return Promise.all(promises_1).then(function () {
                        // All conversations have been loaded, find the one we need to load and expand its option.
                        var conversation = _this.findConversation(_this.conversationId);
                        if (conversation) {
                            var option = _this.getConversationOption(conversation);
                            return _this.expandOption(option, refreshUnreadCounts);
                        }
                        else {
                            // Conversation not found, just open the default option.
                            _this.calculateExpandedStatus();
                            // Now load the data for the expanded option.
                            return _this.fetchDataForExpandedOption(refreshUnreadCounts);
                        }
                    });
                }
                // No conversation specified or not found, determine which one should be expanded.
                _this.calculateExpandedStatus();
            }
            // Now load the data for the expanded option.
            return _this.fetchDataForExpandedOption(refreshUnreadCounts);
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'addon.messages.errorwhileretrievingdiscussions', true);
        }).finally(function () {
            _this.loaded = true;
        });
    };
    /**
     * Calculate which option should be expanded initially.
     */
    AddonMessagesGroupConversationsPage.prototype.calculateExpandedStatus = function () {
        this.favourites.expanded = this.favourites.count != 0;
        this.group.expanded = this.favourites.count == 0 && this.group.count != 0;
        this.individual.expanded = this.favourites.count == 0 && this.group.count == 0;
        this.loadCurrentListElement();
    };
    /**
     * Fetch data for the expanded option.
     *
     * @param {booleam} [refreshUnreadCounts=true] Whether to refresh unread counts.
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonMessagesGroupConversationsPage.prototype.fetchDataForExpandedOption = function (refreshUnreadCounts) {
        if (refreshUnreadCounts === void 0) { refreshUnreadCounts = true; }
        var expandedOption = this.getExpandedOption();
        if (expandedOption) {
            return this.fetchDataForOption(expandedOption, false, refreshUnreadCounts);
        }
        else {
            // All options are collapsed, update the counts.
            var promises = [];
            promises.push(this.fetchConversationCounts());
            if (refreshUnreadCounts) {
                promises.push(this.messagesProvider.refreshUnreadConversationCounts()); // View updated by the event observer.
            }
            return Promise.all(promises);
        }
    };
    /**
     * Fetch data for a certain option.
     *
     * @param {any} option The option to fetch data for.
     * @param {boolean} [loadingMore} Whether we are loading more data or just the first ones.
     * @param {booleam} [refreshUnreadCounts=true] Whether to refresh unread counts.
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonMessagesGroupConversationsPage.prototype.fetchDataForOption = function (option, loadingMore, refreshUnreadCounts) {
        var _this = this;
        if (refreshUnreadCounts === void 0) { refreshUnreadCounts = true; }
        option.loadMoreError = false;
        var limitFrom = loadingMore ? option.conversations.length : 0, promises = [];
        var data, offlineMessages;
        // Get the conversations and, if needed, the offline messages. Always try to get the latest data.
        promises.push(this.messagesProvider.invalidateConversations().catch(function () {
            // Shouldn't happen.
        }).then(function () {
            return _this.messagesProvider.getConversations(option.type, option.favourites, limitFrom);
        }).then(function (result) {
            data = result;
        }));
        if (!loadingMore) {
            promises.push(this.messagesOffline.getAllMessages().then(function (data) {
                offlineMessages = data;
            }));
            promises.push(this.fetchConversationCounts());
            if (refreshUnreadCounts) {
                promises.push(this.messagesProvider.refreshUnreadConversationCounts()); // View updated by the event observer.
            }
        }
        return Promise.all(promises).then(function () {
            if (loadingMore) {
                option.conversations = option.conversations.concat(data.conversations);
                option.canLoadMore = data.canLoadMore;
            }
            else {
                option.conversations = data.conversations;
                option.canLoadMore = data.canLoadMore;
                if (offlineMessages && offlineMessages.length) {
                    return _this.loadOfflineMessages(option, offlineMessages).then(function () {
                        // Sort the conversations, the offline messages could affect the order.
                        option.conversations = _this.messagesProvider.sortConversations(option.conversations);
                    });
                }
            }
        });
    };
    /**
     * Fetch conversation counts.
     *
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonMessagesGroupConversationsPage.prototype.fetchConversationCounts = function () {
        var _this = this;
        // Always try to get the latest data.
        return this.messagesProvider.invalidateConversationCounts().catch(function () {
            // Shouldn't happen.
        }).then(function () {
            return _this.messagesProvider.getConversationCounts();
        }).then(function (counts) {
            _this.favourites.count = counts.favourites;
            _this.individual.count = counts.individual;
            _this.group.count = counts.group;
        });
    };
    /**
     * Find a conversation in the list of loaded conversations.
     *
     * @param {number} conversationId The conversation ID to search.
     * @param {number} userId User ID to search (if no conversationId).
     * @param {any} [option] The option to search in. If not defined, search in all options.
     * @return {any} Conversation.
     */
    AddonMessagesGroupConversationsPage.prototype.findConversation = function (conversationId, userId, option) {
        if (conversationId) {
            var conversations_1 = option ? (option.conversations || []) : ((this.favourites.conversations || [])
                .concat(this.group.conversations || []).concat(this.individual.conversations || []));
            return conversations_1.find(function (conv) {
                return conv.id == conversationId;
            });
        }
        var conversations = option ? (option.conversations || []) :
            ((this.favourites.conversations || []).concat(this.individual.conversations || []));
        return conversations.find(function (conv) {
            return conv.userid == userId;
        });
    };
    /**
     * Get the option that is currently expanded, undefined if they are all collapsed.
     *
     * @return {any} Option currently expanded.
     */
    AddonMessagesGroupConversationsPage.prototype.getExpandedOption = function () {
        if (this.favourites.expanded) {
            return this.favourites;
        }
        else if (this.group.expanded) {
            return this.group;
        }
        else if (this.individual.expanded) {
            return this.individual;
        }
    };
    /**
     * Navigate to contacts view.
     */
    AddonMessagesGroupConversationsPage.prototype.gotoContacts = function () {
        this.splitviewCtrl.getMasterNav().push('AddonMessagesContactsPage');
    };
    /**
     * Navigate to a particular conversation.
     *
     * @param {number} conversationId Conversation Id to load.
     * @param {number} userId User of the conversation. Only if there is no conversationId.
     * @param {number} [messageId] Message to scroll after loading the discussion. Used when searching.
     */
    AddonMessagesGroupConversationsPage.prototype.gotoConversation = function (conversationId, userId, messageId) {
        this.selectedConversationId = conversationId;
        this.selectedUserId = userId;
        var params = {
            conversationId: conversationId,
            userId: userId
        };
        if (messageId) {
            params['message'] = messageId;
        }
        this.splitviewCtrl.push('AddonMessagesDiscussionPage', params);
    };
    /**
     * Navigate to message settings.
     */
    AddonMessagesGroupConversationsPage.prototype.gotoSettings = function () {
        this.splitviewCtrl.push('AddonMessagesSettingsPage');
    };
    /**
     * Function to load more conversations.
     *
     * @param {any} option The option to fetch data for.
     * @param {any} [infiniteComplete] Infinite scroll complete function. Only used from core-infinite-loading.
     * @return {Promise<any>} Resolved when done.
     */
    AddonMessagesGroupConversationsPage.prototype.loadMoreConversations = function (option, infiniteComplete) {
        var _this = this;
        return this.fetchDataForOption(option, true).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'addon.messages.errorwhileretrievingdiscussions', true);
            option.loadMoreError = true;
        }).finally(function () {
            infiniteComplete && infiniteComplete();
        });
    };
    /**
     * Load offline messages into the conversations.
     *
     * @param {any} option The option where the messages should be loaded.
     * @param {any[]} messages Offline messages.
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonMessagesGroupConversationsPage.prototype.loadOfflineMessages = function (option, messages) {
        var _this = this;
        var promises = [];
        messages.forEach(function (message) {
            if (message.conversationid) {
                // It's an existing conversation. Search it in the current option.
                var conversation = _this.findConversation(message.conversationid, undefined, option);
                if (conversation) {
                    // Check if it's the last message. Offline messages are considered more recent than sent messages.
                    if (typeof conversation.lastmessage === 'undefined' || conversation.lastmessage === null ||
                        !conversation.lastmessagepending || conversation.lastmessagedate <= message.timecreated / 1000) {
                        _this.addLastOfflineMessage(conversation, message);
                    }
                }
                else {
                    // Conversation not found, it could be an old one or the message could belong to another option.
                    conversation = message.conversation || {};
                    conversation.id = message.conversationid;
                    if (_this.getConversationOption(conversation) == option) {
                        // Message belongs to current option, add the conversation.
                        _this.addLastOfflineMessage(conversation, message);
                        _this.addOfflineConversation(conversation);
                    }
                }
            }
            else if (option == _this.individual) {
                // It's a new conversation. Check if we already created it (there is more than one message for the same user).
                var conversation = _this.findConversation(undefined, message.touserid, option);
                message.text = message.smallmessage;
                if (conversation) {
                    // Check if it's the last message. Offline messages are considered more recent than sent messages.
                    if (conversation.lastmessagedate <= message.timecreated / 1000) {
                        _this.addLastOfflineMessage(conversation, message);
                    }
                }
                else {
                    // Get the user data and create a new conversation if it belongs to the current option.
                    promises.push(_this.userProvider.getProfile(message.touserid, undefined, true).catch(function () {
                        // User not found.
                    }).then(function (user) {
                        var conversation = {
                            userid: message.touserid,
                            name: user ? user.fullname : String(message.touserid),
                            imageurl: user ? user.profileimageurl : '',
                            type: __WEBPACK_IMPORTED_MODULE_5__providers_messages__["a" /* AddonMessagesProvider */].MESSAGE_CONVERSATION_TYPE_INDIVIDUAL
                        };
                        _this.addLastOfflineMessage(conversation, message);
                        _this.addOfflineConversation(conversation);
                    }));
                }
            }
        });
        return Promise.all(promises);
    };
    /**
     * Add an offline conversation into the right list of conversations.
     *
     * @param {any} conversation Offline conversation to add.
     */
    AddonMessagesGroupConversationsPage.prototype.addOfflineConversation = function (conversation) {
        var option = this.getConversationOption(conversation);
        option.conversations.unshift(conversation);
    };
    /**
     * Add a last offline message into a conversation.
     *
     * @param {any} conversation Conversation where to put the last message.
     * @param {any} message Offline message to add.
     */
    AddonMessagesGroupConversationsPage.prototype.addLastOfflineMessage = function (conversation, message) {
        conversation.lastmessage = message.text;
        conversation.lastmessagedate = message.timecreated / 1000;
        conversation.lastmessagepending = true;
        conversation.sentfromcurrentuser = true;
    };
    /**
     * Given a conversation, return its option (favourites, group, individual).
     *
     * @param {any} conversation Conversation to check.
     * @return {any} Option object.
     */
    AddonMessagesGroupConversationsPage.prototype.getConversationOption = function (conversation) {
        if (conversation.isfavourite) {
            return this.favourites;
        }
        else if (conversation.type == __WEBPACK_IMPORTED_MODULE_5__providers_messages__["a" /* AddonMessagesProvider */].MESSAGE_CONVERSATION_TYPE_GROUP) {
            return this.group;
        }
        else {
            return this.individual;
        }
    };
    /**
     * Refresh the data.
     *
     * @param {any} [refresher] Refresher.
     * @param {booleam} [refreshUnreadCounts=true] Whether to refresh unread counts.
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonMessagesGroupConversationsPage.prototype.refreshData = function (refresher, refreshUnreadCounts) {
        var _this = this;
        if (refreshUnreadCounts === void 0) { refreshUnreadCounts = true; }
        // Don't invalidate conversations and so, they always try to get latest data.
        var promises = [
            this.messagesProvider.invalidateContactRequestsCountCache()
        ];
        return this.utils.allPromises(promises).finally(function () {
            return _this.fetchData(refreshUnreadCounts).finally(function () {
                if (refresher) {
                    refresher.complete();
                }
            });
        });
    };
    /**
     * Toogle the visibility of an option (expand/collapse).
     *
     * @param {any} option The option to expand/collapse.
     */
    AddonMessagesGroupConversationsPage.prototype.toggle = function (option) {
        var _this = this;
        if (option.expanded) {
            // Already expanded, close it.
            option.expanded = false;
            this.loadCurrentListElement();
        }
        else {
            this.expandOption(option).catch(function (error) {
                _this.domUtils.showErrorModalDefault(error, 'addon.messages.errorwhileretrievingdiscussions', true);
            });
        }
    };
    /**
     * Expand a certain option.
     *
     * @param {any} option The option to expand.
     * @param {booleam} [refreshUnreadCounts=true] Whether to refresh unread counts.
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonMessagesGroupConversationsPage.prototype.expandOption = function (option, refreshUnreadCounts) {
        var _this = this;
        if (refreshUnreadCounts === void 0) { refreshUnreadCounts = true; }
        // Collapse all and expand the right one.
        this.favourites.expanded = false;
        this.group.expanded = false;
        this.individual.expanded = false;
        option.expanded = true;
        option.loading = true;
        return this.fetchDataForOption(option, false, refreshUnreadCounts).then(function () {
            _this.loadCurrentListElement();
        }).catch(function (error) {
            option.expanded = false;
            return Promise.reject(error);
        }).finally(function () {
            option.loading = false;
        });
    };
    /**
     * Load the current list element based on the expanded list.
     */
    AddonMessagesGroupConversationsPage.prototype.loadCurrentListElement = function () {
        if (this.favourites.expanded) {
            this.currentListEl = this.favListEl && this.favListEl.nativeElement;
        }
        else if (this.group.expanded) {
            this.currentListEl = this.groupListEl && this.groupListEl.nativeElement;
        }
        else if (this.individual.expanded) {
            this.currentListEl = this.indListEl && this.indListEl.nativeElement;
        }
        else {
            this.currentListEl = undefined;
        }
    };
    /**
     * Navigate to the search page.
     */
    AddonMessagesGroupConversationsPage.prototype.gotoSearch = function () {
        this.navCtrl.push('AddonMessagesSearchPage');
    };
    /**
     * Page destroyed.
     */
    AddonMessagesGroupConversationsPage.prototype.ngOnDestroy = function () {
        this.newMessagesObserver && this.newMessagesObserver.off();
        this.appResumeSubscription && this.appResumeSubscription.unsubscribe();
        this.pushObserver && this.pushObserver.unsubscribe();
        this.readChangedObserver && this.readChangedObserver.off();
        this.cronObserver && this.cronObserver.off();
        this.openConversationObserver && this.openConversationObserver.off();
        this.updateConversationListObserver && this.updateConversationListObserver.off();
        this.contactRequestsCountObserver && this.contactRequestsCountObserver.off();
        this.memberInfoObserver && this.memberInfoObserver.off();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_10__components_split_view_split_view__["a" /* CoreSplitViewComponent */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_10__components_split_view_split_view__["a" /* CoreSplitViewComponent */])
    ], AddonMessagesGroupConversationsPage.prototype, "splitviewCtrl", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Content */])
    ], AddonMessagesGroupConversationsPage.prototype, "content", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])('favlist'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], AddonMessagesGroupConversationsPage.prototype, "favListEl", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])('grouplist'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], AddonMessagesGroupConversationsPage.prototype, "groupListEl", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])('indlist'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], AddonMessagesGroupConversationsPage.prototype, "indListEl", void 0);
    AddonMessagesGroupConversationsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-addon-messages-group-conversations',template:/*ion-inline-start:"/home/travis/build/moodlehq/moodlemobile2/src/addon/messages/pages/group-conversations/group-conversations.html"*/'<ion-header>\n    <ion-navbar core-back-button>\n        <ion-title>{{ \'addon.messages.messages\' | translate }}</ion-title>\n        <ion-buttons end>\n            <button ion-button icon-only (click)="gotoSearch()" [attr.aria-label]="\'addon.messages.search\' | translate">\n                <ion-icon name="search"></ion-icon>\n            </button>\n            <button ion-button icon-only (click)="gotoSettings($event)" [attr.aria-label]="\'addon.messages.messagepreferences\' | translate">\n                <ion-icon name="cog"></ion-icon>\n            </button>\n            <!-- Add an empty context menu so discussion page can add items in split view, otherwise the menu disappears in some cases. -->\n            <core-context-menu></core-context-menu>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n<core-split-view>\n    <ion-content class="core-expand-max">\n        <ion-refresher [enabled]="loaded && (!currentListEl || currentListEl.scrollTop < 5)" (ionRefresh)="refreshData($event)">\n            <ion-refresher-content pullingText="{{ \'core.pulltorefresh\' | translate }}"></ion-refresher-content>\n        </ion-refresher>\n\n        <core-loading [hideUntil]="loaded" [message]="loadingMessage">\n            <ion-list>\n                <a ion-item text-wrap (click)="gotoContacts($event)" [attr.aria-label]="\'addon.messages.contacts\' | translate" class="addon-message-discussion">\n                    <ion-icon name="person" item-start></ion-icon>\n                    <h2>{{ \'addon.messages.contacts\' | translate }}</h2>\n                    <ion-badge *ngIf="contactRequestsCount > 0" item-end>{{contactRequestsCount}}</ion-badge>\n                </a>\n                <!-- Favourite conversations. -->\n                <ion-item-divider text-wrap (click)="toggle(favourites)" class="core-expandable">\n                    <core-icon *ngIf="!favourites.expanded" name="fa-caret-right" item-start></core-icon>\n                    <core-icon *ngIf="favourites.expanded" name="fa-caret-down" item-start></core-icon>\n                    {{ \'core.favourites\' | translate }} ({{ favourites.count }})\n                    <ion-badge item-end *ngIf="favourites.unread">{{ favourites.unread }}</ion-badge>\n                </ion-item-divider>\n                <div [hidden]="!favourites.conversations || !favourites.expanded || favourites.loading" #favlist>\n                    <ng-container *ngTemplateOutlet="conversationsTemplate; context: {conversations: favourites.conversations}"></ng-container>\n                    <!-- The infinite loading cannot be inside the ng-template, it fails because it doesn\'t find ion-content. -->\n                    <core-infinite-loading [enabled]="favourites.canLoadMore" (action)="loadMoreConversations(favourites, $event)" [error]="favourites.loadMoreError"></core-infinite-loading>\n                    <ion-item text-wrap *ngIf="favourites.conversations && favourites.conversations.length == 0">\n                        <p>{{ \'addon.messages.nofavourites\' | translate }}</p>\n                    </ion-item>\n                </div>\n                <ion-item text-center *ngIf="favourites.loading">\n                    <ion-spinner></ion-spinner>\n                </ion-item>\n\n                <!-- Group conversations. -->\n                <ion-item-divider text-wrap (click)="toggle(group)" class="core-expandable">\n                    <core-icon *ngIf="!group.expanded" name="fa-caret-right" item-start></core-icon>\n                    <core-icon *ngIf="group.expanded" name="fa-caret-down" item-start></core-icon>\n                    {{ \'addon.messages.groupconversations\' | translate }} ({{ group.count }})\n                    <ion-badge item-end *ngIf="group.unread">{{ group.unread }}</ion-badge>\n                </ion-item-divider>\n                <div [hidden]="!group.conversations || !group.expanded || group.loading" #grouplist>\n                    <ng-container *ngTemplateOutlet="conversationsTemplate; context: {conversations: group.conversations}"></ng-container>\n                    <!-- The infinite loading cannot be inside the ng-template, it fails because it doesn\'t find ion-content. -->\n                    <core-infinite-loading [enabled]="group.canLoadMore" (action)="loadMoreConversations(group, $event)" [error]="group.loadMoreError"></core-infinite-loading>\n                    <ion-item text-wrap *ngIf="group.conversations && group.conversations.length == 0">\n                        <p>{{ \'addon.messages.nogroupconversations\' | translate }}</p>\n                    </ion-item>\n                </div>\n                <ion-item text-center *ngIf="group.loading">\n                    <ion-spinner></ion-spinner>\n                </ion-item>\n\n                <ion-item-divider text-wrap (click)="toggle(individual)" class="core-expandable">\n                    <core-icon *ngIf="!individual.expanded" name="fa-caret-right" item-start></core-icon>\n                    <core-icon *ngIf="individual.expanded" name="fa-caret-down" item-start></core-icon>\n                    {{ \'addon.messages.individualconversations\' | translate }} ({{ individual.count }})\n                    <ion-badge item-end *ngIf="individual.unread">{{ individual.unread }}</ion-badge>\n                </ion-item-divider>\n                <div [hidden]="!individual.conversations || !individual.expanded || individual.loading" #indlist>\n                    <ng-container *ngTemplateOutlet="conversationsTemplate; context: {conversations: individual.conversations}"></ng-container>\n                    <!-- The infinite loading cannot be inside the ng-template, it fails because it doesn\'t find ion-content. -->\n                    <core-infinite-loading [enabled]="individual.canLoadMore" (action)="loadMoreConversations(individual, $event)" [error]="individual.loadMoreError"></core-infinite-loading>\n                    <ion-item text-wrap *ngIf="individual.conversations && individual.conversations.length == 0">\n                        <p>{{ \'addon.messages.noindividualconversations\' | translate }}</p>\n                    </ion-item>\n                </div>\n                <ion-item text-center *ngIf="individual.loading">\n                    <ion-spinner></ion-spinner>\n                </ion-item>\n\n            </ion-list>\n        </core-loading>\n    </ion-content>\n</core-split-view>\n\n<!-- Template to render a list of conversations. -->\n<ng-template #conversationsTemplate let-conversations="conversations">\n    <a ion-item text-wrap *ngFor="let conversation of conversations" [title]="conversation.name" (click)="gotoConversation(conversation.id, conversation.userid)" [class.core-split-item-selected]="(conversation.id && conversation.id == selectedConversationId) || (conversation.userid && conversation.userid == selectedUserId)" class="addon-message-discussion" id="addon-message-conversation-{{ conversation.id ? conversation.id : \'user-\' + conversation.userid }}">\n        <!-- Group conversation image. -->\n        <ion-avatar item-start *ngIf="conversation.type != typeIndividual">\n            <img [src]="conversation.imageurl" [alt]="conversation.name" core-external-content onError="this.src=\'assets/img/group-avatar.png\'">\n        </ion-avatar>\n\n        <!-- Avatar for individual conversations. -->\n        <ion-avatar *ngIf="conversation.type == typeIndividual" core-user-avatar [user]="conversation.otherUser" [linkProfile]="false" [checkOnline]="conversation.showonlinestatus" item-start></ion-avatar>\n\n        <h2>\n            <core-format-text [text]="conversation.name"></core-format-text>\n            <core-icon name="fa-ban" *ngIf="conversation.isblocked" [attr.aria-label]="\'addon.messages.contactblocked\' | translate"></core-icon>\n        </h2>\n        <ion-note *ngIf="conversation.lastmessagedate > 0 || conversation.unreadcount">\n            <ion-badge *ngIf="conversation.unreadcount > 0">{{ conversation.unreadcount }}</ion-badge>\n            <span *ngIf="conversation.lastmessagedate > 0">{{conversation.lastmessagedate | coreDateDayOrTime}}</span>\n        </ion-note>\n        <p *ngIf="conversation.subname"><core-format-text [text]="conversation.subname"></core-format-text></p>\n        <p class="addon-message-last-message">\n            <span *ngIf="conversation.sentfromcurrentuser" class="addon-message-last-message-user">{{ \'addon.messages.you\' | translate }}</span>\n            <core-format-text *ngIf="conversation.type != typeIndividual && conversation.members[0]" [text]="conversation.members[0].fullname + \':\'" class="addon-message-last-message-user"></core-format-text>\n            <core-format-text clean="true" singleLine="true" [text]="conversation.lastmessage" class="addon-message-last-message-text"></core-format-text>\n        </p>\n    </a>\n</ng-template>\n'/*ion-inline-end:"/home/travis/build/moodlehq/moodlemobile2/src/addon/messages/pages/group-conversations/group-conversations.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__providers_events__["a" /* CoreEventsProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_sites__["a" /* CoreSitesProvider */], __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_5__providers_messages__["a" /* AddonMessagesProvider */], __WEBPACK_IMPORTED_MODULE_7__providers_utils_dom__["a" /* CoreDomUtilsProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* Platform */], __WEBPACK_IMPORTED_MODULE_8__providers_utils_utils__["a" /* CoreUtilsProvider */],
            __WEBPACK_IMPORTED_MODULE_9__addon_pushnotifications_providers_delegate__["a" /* AddonPushNotificationsDelegate */], __WEBPACK_IMPORTED_MODULE_6__providers_messages_offline__["a" /* AddonMessagesOfflineProvider */],
            __WEBPACK_IMPORTED_MODULE_11__core_user_providers_user__["a" /* CoreUserProvider */]])
    ], AddonMessagesGroupConversationsPage);
    return AddonMessagesGroupConversationsPage;
}());

//# sourceMappingURL=group-conversations.js.map

/***/ })

});
//# sourceMappingURL=105.js.map