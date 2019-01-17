webpackJsonp([108],{

/***/ 1846:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/@angular/core/esm5/core.js
var core = __webpack_require__(0);

// EXTERNAL MODULE: ./node_modules/ionic-angular/index.js + 3 modules
var ionic_angular = __webpack_require__(8);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/index.js + 1 modules
var _ngx_translate_core = __webpack_require__(3);

// EXTERNAL MODULE: ./src/providers/events.ts
var events = __webpack_require__(12);

// EXTERNAL MODULE: ./src/providers/sites.ts
var sites = __webpack_require__(1);

// EXTERNAL MODULE: ./src/addon/messages/providers/messages.ts
var providers_messages = __webpack_require__(146);

// EXTERNAL MODULE: ./src/addon/messages/providers/messages-offline.ts
var messages_offline = __webpack_require__(346);

// EXTERNAL MODULE: ./src/providers/utils/dom.ts
var dom = __webpack_require__(4);

// EXTERNAL MODULE: ./src/providers/utils/utils.ts
var utils_utils = __webpack_require__(2);

// EXTERNAL MODULE: ./src/addon/pushnotifications/providers/delegate.ts
var delegate = __webpack_require__(228);

// EXTERNAL MODULE: ./src/components/split-view/split-view.ts
var split_view = __webpack_require__(34);

// EXTERNAL MODULE: ./src/core/user/providers/user.ts
var providers_user = __webpack_require__(44);

// CONCATENATED MODULE: ./src/addon/messages/pages/group-conversations/group-conversations.ts
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
var group_conversations_AddonMessagesGroupConversationsPage = /** @class */ (function () {
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
            type: providers_messages["a" /* AddonMessagesProvider */].MESSAGE_CONVERSATION_TYPE_GROUP,
            favourites: false,
            count: 0,
            unread: 0
        };
        this.individual = {
            type: providers_messages["a" /* AddonMessagesProvider */].MESSAGE_CONVERSATION_TYPE_INDIVIDUAL,
            favourites: false,
            count: 0,
            unread: 0
        };
        this.typeIndividual = providers_messages["a" /* AddonMessagesProvider */].MESSAGE_CONVERSATION_TYPE_INDIVIDUAL;
        this.loadingString = translate.instant('core.loading');
        this.siteId = sitesProvider.getCurrentSiteId();
        this.currentUserId = sitesProvider.getCurrentSiteUserId();
        this.conversationId = navParams.get('conversationId') || false;
        // Update conversations when new message is received.
        this.newMessagesObserver = eventsProvider.on(providers_messages["a" /* AddonMessagesProvider */].NEW_MESSAGE_EVENT, function (data) {
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
        this.readChangedObserver = eventsProvider.on(providers_messages["a" /* AddonMessagesProvider */].READ_CHANGED_EVENT, function (data) {
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
        this.openConversationObserver = eventsProvider.on(providers_messages["a" /* AddonMessagesProvider */].OPEN_CONVERSATION_EVENT, function (data) {
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
        this.updateConversationListObserver = eventsProvider.on(providers_messages["a" /* AddonMessagesProvider */].UPDATE_CONVERSATION_LIST_EVENT, function () {
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
        this.cronObserver = eventsProvider.on(providers_messages["a" /* AddonMessagesProvider */].UNREAD_CONVERSATION_COUNTS_EVENT, function (data) {
            _this.favourites.unread = data.favourites;
            _this.individual.unread = data.individual;
            _this.group.unread = data.group;
        }, this.siteId);
        // Update the contact requests badge.
        this.contactRequestsCountObserver = eventsProvider.on(providers_messages["a" /* AddonMessagesProvider */].CONTACT_REQUESTS_COUNT_EVENT, function (data) {
            _this.contactRequestsCount = data.count;
        }, this.siteId);
        // Update block status of a user.
        this.memberInfoObserver = eventsProvider.on(providers_messages["a" /* AddonMessagesProvider */].MEMBER_INFO_CHANGED_EVENT, function (data) {
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
                            type: providers_messages["a" /* AddonMessagesProvider */].MESSAGE_CONVERSATION_TYPE_INDIVIDUAL
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
        else if (conversation.type == providers_messages["a" /* AddonMessagesProvider */].MESSAGE_CONVERSATION_TYPE_GROUP) {
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
        Object(core["_9" /* ViewChild */])(split_view["a" /* CoreSplitViewComponent */]),
        __metadata("design:type", split_view["a" /* CoreSplitViewComponent */])
    ], AddonMessagesGroupConversationsPage.prototype, "splitviewCtrl", void 0);
    __decorate([
        Object(core["_9" /* ViewChild */])(ionic_angular["f" /* Content */]),
        __metadata("design:type", ionic_angular["f" /* Content */])
    ], AddonMessagesGroupConversationsPage.prototype, "content", void 0);
    __decorate([
        Object(core["_9" /* ViewChild */])('favlist'),
        __metadata("design:type", core["t" /* ElementRef */])
    ], AddonMessagesGroupConversationsPage.prototype, "favListEl", void 0);
    __decorate([
        Object(core["_9" /* ViewChild */])('grouplist'),
        __metadata("design:type", core["t" /* ElementRef */])
    ], AddonMessagesGroupConversationsPage.prototype, "groupListEl", void 0);
    __decorate([
        Object(core["_9" /* ViewChild */])('indlist'),
        __metadata("design:type", core["t" /* ElementRef */])
    ], AddonMessagesGroupConversationsPage.prototype, "indListEl", void 0);
    AddonMessagesGroupConversationsPage = __decorate([
        Object(core["m" /* Component */])({
            selector: 'page-addon-messages-group-conversations',
            templateUrl: 'group-conversations.html',
        }),
        __metadata("design:paramtypes", [events["a" /* CoreEventsProvider */], sites["a" /* CoreSitesProvider */], _ngx_translate_core["c" /* TranslateService */],
            providers_messages["a" /* AddonMessagesProvider */], dom["a" /* CoreDomUtilsProvider */], ionic_angular["t" /* NavParams */],
            ionic_angular["s" /* NavController */], ionic_angular["v" /* Platform */], utils_utils["a" /* CoreUtilsProvider */],
            delegate["a" /* AddonPushNotificationsDelegate */], messages_offline["a" /* AddonMessagesOfflineProvider */],
            providers_user["a" /* CoreUserProvider */]])
    ], AddonMessagesGroupConversationsPage);
    return AddonMessagesGroupConversationsPage;
}());

//# sourceMappingURL=group-conversations.js.map
// EXTERNAL MODULE: ./src/components/components.module.ts
var components_module = __webpack_require__(28);

// EXTERNAL MODULE: ./src/directives/directives.module.ts + 2 modules
var directives_module = __webpack_require__(29);

// EXTERNAL MODULE: ./src/pipes/pipes.module.ts + 2 modules
var pipes_module = __webpack_require__(105);

// CONCATENATED MODULE: ./src/addon/messages/pages/group-conversations/group-conversations.module.ts
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
var group_conversations_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var group_conversations_module_AddonMessagesGroupConversationsPageModule = /** @class */ (function () {
    function AddonMessagesGroupConversationsPageModule() {
    }
    AddonMessagesGroupConversationsPageModule = group_conversations_module___decorate([
        Object(core["I" /* NgModule */])({
            declarations: [
                group_conversations_AddonMessagesGroupConversationsPage,
            ],
            imports: [
                components_module["a" /* CoreComponentsModule */],
                directives_module["a" /* CoreDirectivesModule */],
                pipes_module["a" /* CorePipesModule */],
                ionic_angular["l" /* IonicPageModule */].forChild(group_conversations_AddonMessagesGroupConversationsPage),
                _ngx_translate_core["b" /* TranslateModule */].forChild()
            ],
        })
    ], AddonMessagesGroupConversationsPageModule);
    return AddonMessagesGroupConversationsPageModule;
}());

//# sourceMappingURL=group-conversations.module.js.map
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

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/badge/badge.js
var badge = __webpack_require__(145);

// EXTERNAL MODULE: ./node_modules/ionic-angular/config/config.js
var config = __webpack_require__(6);

// EXTERNAL MODULE: ./src/components/icon/icon.ngfactory.js
var icon_ngfactory = __webpack_require__(130);

// EXTERNAL MODULE: ./src/components/icon/icon.ts
var icon = __webpack_require__(120);

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

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.pipe.js
var translate_pipe = __webpack_require__(26);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.service.js
var translate_service = __webpack_require__(18);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/spinner/spinner.ngfactory.js
var spinner_ngfactory = __webpack_require__(111);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/spinner/spinner.js
var spinner = __webpack_require__(94);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/avatar/avatar.js
var avatar = __webpack_require__(186);

// EXTERNAL MODULE: ./src/directives/external-content.ts
var external_content = __webpack_require__(226);

// EXTERNAL MODULE: ./src/providers/logger.ts
var logger = __webpack_require__(5);

// EXTERNAL MODULE: ./src/providers/filepool.ts
var filepool = __webpack_require__(16);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/platform.js + 1 modules
var platform_platform = __webpack_require__(14);

// EXTERNAL MODULE: ./src/providers/utils/url.ts
var url = __webpack_require__(25);

// EXTERNAL MODULE: ./src/providers/app.ts
var app = __webpack_require__(9);

// EXTERNAL MODULE: ./src/components/user-avatar/user-avatar.ngfactory.js
var user_avatar_ngfactory = __webpack_require__(222);

// EXTERNAL MODULE: ./src/components/user-avatar/user-avatar.ts
var user_avatar = __webpack_require__(187);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-controller.js
var nav_controller = __webpack_require__(21);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/note/note.js
var note = __webpack_require__(225);

// EXTERNAL MODULE: ./node_modules/@angular/common/esm5/common.js
var common = __webpack_require__(7);

// EXTERNAL MODULE: ./src/directives/format-text.ts
var format_text = __webpack_require__(41);

// EXTERNAL MODULE: ./src/providers/utils/text.ts
var utils_text = __webpack_require__(10);

// EXTERNAL MODULE: ./src/core/contentlinks/providers/helper.ts
var helper = __webpack_require__(17);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.js
var content = __webpack_require__(23);

// EXTERNAL MODULE: ./src/providers/utils/iframe.ts
var iframe = __webpack_require__(37);

// EXTERNAL MODULE: ./src/pipes/date-day-or-time.ts
var date_day_or_time = __webpack_require__(341);

// EXTERNAL MODULE: ./src/providers/utils/time.ts
var time = __webpack_require__(24);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-header.js
var toolbar_header = __webpack_require__(435);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/view-controller.js
var view_controller = __webpack_require__(36);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/navbar.ngfactory.js
var navbar_ngfactory = __webpack_require__(1354);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/navbar.js
var navbar = __webpack_require__(200);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/app/app.js + 3 modules
var app_app = __webpack_require__(33);

// EXTERNAL MODULE: ./src/directives/back-button.ts
var back_button = __webpack_require__(663);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.ngfactory.js
var toolbar_title_ngfactory = __webpack_require__(1355);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.js
var toolbar_title = __webpack_require__(337);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar.js
var toolbar = __webpack_require__(247);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-item.js
var toolbar_item = __webpack_require__(436);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.ngfactory.js
var button_ngfactory = __webpack_require__(45);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.js
var button_button = __webpack_require__(42);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/icon/icon.js
var icon_icon = __webpack_require__(46);

// EXTERNAL MODULE: ./src/components/context-menu/context-menu.ngfactory.js
var context_menu_ngfactory = __webpack_require__(79);

// EXTERNAL MODULE: ./src/components/context-menu/context-menu.ts
var context_menu = __webpack_require__(69);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/popover/popover-controller.js
var popover_controller = __webpack_require__(62);

// EXTERNAL MODULE: ./src/components/tabs/tab.ts
var tab = __webpack_require__(68);

// EXTERNAL MODULE: ./src/components/split-view/split-view.ngfactory.js
var split_view_ngfactory = __webpack_require__(437);

// EXTERNAL MODULE: ./src/core/fileuploader/providers/fileuploader.ts
var fileuploader = __webpack_require__(66);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.ngfactory.js
var content_ngfactory = __webpack_require__(185);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/dom-controller.js
var dom_controller = __webpack_require__(31);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/keyboard.js
var keyboard = __webpack_require__(106);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/refresher/refresher.js
var refresher = __webpack_require__(144);

// EXTERNAL MODULE: ./node_modules/ionic-angular/gestures/gesture-controller.js
var gesture_controller = __webpack_require__(38);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/refresher/refresher-content.ngfactory.js
var refresher_content_ngfactory = __webpack_require__(201);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/refresher/refresher-content.js
var refresher_content = __webpack_require__(158);

// EXTERNAL MODULE: ./src/components/loading/loading.ngfactory.js
var loading_ngfactory = __webpack_require__(48);

// EXTERNAL MODULE: ./src/components/loading/loading.ts
var loading = __webpack_require__(47);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/list/list.js + 1 modules
var list = __webpack_require__(77);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-divider.js
var item_divider = __webpack_require__(107);

// EXTERNAL MODULE: ./src/components/infinite-loading/infinite-loading.ngfactory.js
var infinite_loading_ngfactory = __webpack_require__(440);

// EXTERNAL MODULE: ./src/components/infinite-loading/infinite-loading.ts
var infinite_loading = __webpack_require__(276);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-params.js
var nav_params = __webpack_require__(60);

// CONCATENATED MODULE: ./src/addon/messages/pages/group-conversations/group-conversations.ngfactory.js
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 












































































var styles_AddonMessagesGroupConversationsPage = [];
var RenderType_AddonMessagesGroupConversationsPage = core["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_AddonMessagesGroupConversationsPage, data: {} });

function View_AddonMessagesGroupConversationsPage_1(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "ion-badge", [["item-end", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, badge["a" /* Badge */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](2, null, ["", ""]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.contactRequestsCount; _ck(_v, 2, 0, currVal_0); }); }
function View_AddonMessagesGroupConversationsPage_2(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "core-icon", [["item-start", ""], ["name", "fa-caret-right"]], null, null, null, icon_ngfactory["b" /* View_CoreIconComponent_0 */], icon_ngfactory["a" /* RenderType_CoreIconComponent */])), core["_30" /* ɵdid */](1, 245760, null, 0, icon["a" /* CoreIconComponent */], [core["t" /* ElementRef */]], { name: [0, "name"] }, null)], function (_ck, _v) { var currVal_0 = "fa-caret-right"; _ck(_v, 1, 0, currVal_0); }, null); }
function View_AddonMessagesGroupConversationsPage_3(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "core-icon", [["item-start", ""], ["name", "fa-caret-down"]], null, null, null, icon_ngfactory["b" /* View_CoreIconComponent_0 */], icon_ngfactory["a" /* RenderType_CoreIconComponent */])), core["_30" /* ɵdid */](1, 245760, null, 0, icon["a" /* CoreIconComponent */], [core["t" /* ElementRef */]], { name: [0, "name"] }, null)], function (_ck, _v) { var currVal_0 = "fa-caret-down"; _ck(_v, 1, 0, currVal_0); }, null); }
function View_AddonMessagesGroupConversationsPage_4(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "ion-badge", [["item-end", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, badge["a" /* Badge */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](2, null, ["", ""]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.favourites.unread; _ck(_v, 2, 0, currVal_0); }); }
function View_AddonMessagesGroupConversationsPage_5(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 0, null, null, null, null, null, null, null))], null, null); }
function View_AddonMessagesGroupConversationsPage_6(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 10, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 13, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 14, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 15, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 2, 2, "p", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](8, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "]))], null, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 8, 0, core["_44" /* ɵnov */](_v, 9).transform("addon.messages.nofavourites")); _ck(_v, 8, 0, currVal_0); }); }
function View_AddonMessagesGroupConversationsPage_7(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 9, "ion-item", [["class", "item item-block"], ["text-center", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 16, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 17, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 18, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 2, 1, "ion-spinner", [], [[2, "spinner-paused", null]], null, null, spinner_ngfactory["b" /* View_Spinner_0 */], spinner_ngfactory["a" /* RenderType_Spinner */])), core["_30" /* ɵdid */](8, 114688, null, 0, spinner["a" /* Spinner */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "]))], function (_ck, _v) { _ck(_v, 8, 0); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 8)._paused; _ck(_v, 7, 0, currVal_0); }); }
function View_AddonMessagesGroupConversationsPage_8(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "core-icon", [["item-start", ""], ["name", "fa-caret-right"]], null, null, null, icon_ngfactory["b" /* View_CoreIconComponent_0 */], icon_ngfactory["a" /* RenderType_CoreIconComponent */])), core["_30" /* ɵdid */](1, 245760, null, 0, icon["a" /* CoreIconComponent */], [core["t" /* ElementRef */]], { name: [0, "name"] }, null)], function (_ck, _v) { var currVal_0 = "fa-caret-right"; _ck(_v, 1, 0, currVal_0); }, null); }
function View_AddonMessagesGroupConversationsPage_9(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "core-icon", [["item-start", ""], ["name", "fa-caret-down"]], null, null, null, icon_ngfactory["b" /* View_CoreIconComponent_0 */], icon_ngfactory["a" /* RenderType_CoreIconComponent */])), core["_30" /* ɵdid */](1, 245760, null, 0, icon["a" /* CoreIconComponent */], [core["t" /* ElementRef */]], { name: [0, "name"] }, null)], function (_ck, _v) { var currVal_0 = "fa-caret-down"; _ck(_v, 1, 0, currVal_0); }, null); }
function View_AddonMessagesGroupConversationsPage_10(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "ion-badge", [["item-end", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, badge["a" /* Badge */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](2, null, ["", ""]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.group.unread; _ck(_v, 2, 0, currVal_0); }); }
function View_AddonMessagesGroupConversationsPage_11(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 0, null, null, null, null, null, null, null))], null, null); }
function View_AddonMessagesGroupConversationsPage_12(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 10, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 22, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 23, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 24, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 2, 2, "p", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](8, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "]))], null, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 8, 0, core["_44" /* ɵnov */](_v, 9).transform("addon.messages.nogroupconversations")); _ck(_v, 8, 0, currVal_0); }); }
function View_AddonMessagesGroupConversationsPage_13(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 9, "ion-item", [["class", "item item-block"], ["text-center", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 25, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 26, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 27, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 2, 1, "ion-spinner", [], [[2, "spinner-paused", null]], null, null, spinner_ngfactory["b" /* View_Spinner_0 */], spinner_ngfactory["a" /* RenderType_Spinner */])), core["_30" /* ɵdid */](8, 114688, null, 0, spinner["a" /* Spinner */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "]))], function (_ck, _v) { _ck(_v, 8, 0); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 8)._paused; _ck(_v, 7, 0, currVal_0); }); }
function View_AddonMessagesGroupConversationsPage_14(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "core-icon", [["item-start", ""], ["name", "fa-caret-right"]], null, null, null, icon_ngfactory["b" /* View_CoreIconComponent_0 */], icon_ngfactory["a" /* RenderType_CoreIconComponent */])), core["_30" /* ɵdid */](1, 245760, null, 0, icon["a" /* CoreIconComponent */], [core["t" /* ElementRef */]], { name: [0, "name"] }, null)], function (_ck, _v) { var currVal_0 = "fa-caret-right"; _ck(_v, 1, 0, currVal_0); }, null); }
function View_AddonMessagesGroupConversationsPage_15(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "core-icon", [["item-start", ""], ["name", "fa-caret-down"]], null, null, null, icon_ngfactory["b" /* View_CoreIconComponent_0 */], icon_ngfactory["a" /* RenderType_CoreIconComponent */])), core["_30" /* ɵdid */](1, 245760, null, 0, icon["a" /* CoreIconComponent */], [core["t" /* ElementRef */]], { name: [0, "name"] }, null)], function (_ck, _v) { var currVal_0 = "fa-caret-down"; _ck(_v, 1, 0, currVal_0); }, null); }
function View_AddonMessagesGroupConversationsPage_16(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "ion-badge", [["item-end", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, badge["a" /* Badge */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](2, null, ["", ""]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.individual.unread; _ck(_v, 2, 0, currVal_0); }); }
function View_AddonMessagesGroupConversationsPage_17(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 0, null, null, null, null, null, null, null))], null, null); }
function View_AddonMessagesGroupConversationsPage_18(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 10, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 31, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 32, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 33, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 2, 2, "p", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](8, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "]))], null, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 8, 0, core["_44" /* ɵnov */](_v, 9).transform("addon.messages.noindividualconversations")); _ck(_v, 8, 0, currVal_0); }); }
function View_AddonMessagesGroupConversationsPage_19(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 9, "ion-item", [["class", "item item-block"], ["text-center", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 34, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 35, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 36, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 2, 1, "ion-spinner", [], [[2, "spinner-paused", null]], null, null, spinner_ngfactory["b" /* View_Spinner_0 */], spinner_ngfactory["a" /* RenderType_Spinner */])), core["_30" /* ɵdid */](8, 114688, null, 0, spinner["a" /* Spinner */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "]))], function (_ck, _v) { _ck(_v, 8, 0); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 8)._paused; _ck(_v, 7, 0, currVal_0); }); }
function View_AddonMessagesGroupConversationsPage_22(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 5, "ion-avatar", [["item-start", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, avatar["a" /* Avatar */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 1, "img", [["core-external-content", ""], ["onError", "this.src='assets/img/group-avatar.png'"]], [[8, "src", 4], [8, "alt", 0]], null, null, null, null)), core["_30" /* ɵdid */](4, 4210688, null, 0, external_content["a" /* CoreExternalContentDirective */], [core["t" /* ElementRef */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], platform_platform["a" /* Platform */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], app["a" /* CoreAppProvider */], utils_utils["a" /* CoreUtilsProvider */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "]))], null, function (_ck, _v) { var currVal_0 = _v.parent.context.$implicit.imageurl; var currVal_1 = _v.parent.context.$implicit.name; _ck(_v, 3, 0, currVal_0, currVal_1); }); }
function View_AddonMessagesGroupConversationsPage_23(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "ion-avatar", [["core-user-avatar", ""], ["item-start", ""]], null, null, null, user_avatar_ngfactory["b" /* View_CoreUserAvatarComponent_0 */], user_avatar_ngfactory["a" /* RenderType_CoreUserAvatarComponent */])), core["_30" /* ɵdid */](1, 770048, null, 0, user_avatar["a" /* CoreUserAvatarComponent */], [nav_controller["a" /* NavController */], sites["a" /* CoreSitesProvider */], utils_utils["a" /* CoreUtilsProvider */], app["a" /* CoreAppProvider */], events["a" /* CoreEventsProvider */]], { user: [0, "user"], linkProfile: [1, "linkProfile"], checkOnline: [2, "checkOnline"] }, null), core["_30" /* ɵdid */](2, 16384, null, 0, avatar["a" /* Avatar */], [], null, null)], function (_ck, _v) { var currVal_0 = _v.parent.context.$implicit.otherUser; var currVal_1 = false; var currVal_2 = _v.parent.context.$implicit.showonlinestatus; _ck(_v, 1, 0, currVal_0, currVal_1, currVal_2); }, null); }
function View_AddonMessagesGroupConversationsPage_24(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "core-icon", [["name", "fa-ban"]], [[1, "aria-label", 0]], null, null, icon_ngfactory["b" /* View_CoreIconComponent_0 */], icon_ngfactory["a" /* RenderType_CoreIconComponent */])), core["_30" /* ɵdid */](1, 245760, null, 0, icon["a" /* CoreIconComponent */], [core["t" /* ElementRef */]], { name: [0, "name"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], function (_ck, _v) { var currVal_1 = "fa-ban"; _ck(_v, 1, 0, currVal_1); }, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 0, 0, core["_44" /* ɵnov */](_v, 2).transform("addon.messages.contactblocked")); _ck(_v, 0, 0, currVal_0); }); }
function View_AddonMessagesGroupConversationsPage_26(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "ion-badge", [], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, badge["a" /* Badge */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](2, null, ["", ""]))], null, function (_ck, _v) { var currVal_0 = _v.parent.parent.context.$implicit.unreadcount; _ck(_v, 2, 0, currVal_0); }); }
function View_AddonMessagesGroupConversationsPage_27(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "span", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](1, null, ["", ""])), core["_49" /* ɵppd */](2, 1)], null, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 1, 0, _ck(_v, 2, 0, core["_44" /* ɵnov */](_v.parent.parent.parent.parent, 0), _v.parent.parent.context.$implicit.lastmessagedate)); _ck(_v, 1, 0, currVal_0); }); }
function View_AddonMessagesGroupConversationsPage_25(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 8, "ion-note", [], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, note["a" /* Note */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonMessagesGroupConversationsPage_26)), core["_30" /* ɵdid */](4, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonMessagesGroupConversationsPage_27)), core["_30" /* ɵdid */](7, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "]))], function (_ck, _v) { var currVal_0 = (_v.parent.context.$implicit.unreadcount > 0); _ck(_v, 4, 0, currVal_0); var currVal_1 = (_v.parent.context.$implicit.lastmessagedate > 0); _ck(_v, 7, 0, currVal_1); }, null); }
function View_AddonMessagesGroupConversationsPage_28(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "p", [], null, null, null, null, null)), (_l()(), core["_31" /* ɵeld */](1, 0, null, null, 1, "core-format-text", [], null, null, null, null, null)), core["_30" /* ɵdid */](2, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform_platform["a" /* Platform */], utils_utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], app["a" /* CoreAppProvider */], helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */]], { text: [0, "text"] }, null)], function (_ck, _v) { var currVal_0 = _v.parent.context.$implicit.subname; _ck(_v, 2, 0, currVal_0); }, null); }
function View_AddonMessagesGroupConversationsPage_29(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "span", [["class", "addon-message-last-message-user"]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](1, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], null, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 1, 0, core["_44" /* ɵnov */](_v, 2).transform("addon.messages.you")); _ck(_v, 1, 0, currVal_0); }); }
function View_AddonMessagesGroupConversationsPage_30(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "core-format-text", [["class", "addon-message-last-message-user"]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform_platform["a" /* Platform */], utils_utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], app["a" /* CoreAppProvider */], helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */]], { text: [0, "text"] }, null)], function (_ck, _v) { var currVal_0 = (_v.parent.context.$implicit.members[0].fullname + ":"); _ck(_v, 1, 0, currVal_0); }, null); }
function View_AddonMessagesGroupConversationsPage_21(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 41, "a", [["class", "addon-message-discussion item item-block"], ["ion-item", ""], ["text-wrap", ""]], [[8, "title", 0], [2, "core-split-item-selected", null], [8, "id", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.gotoConversation(_v.context.$implicit.id, _v.context.$implicit.userid) !== false);
        ad = (pd_0 && ad);
    } return ad; }, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 37, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 38, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 39, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonMessagesGroupConversationsPage_22)), core["_30" /* ɵdid */](9, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n\n        "])), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonMessagesGroupConversationsPage_23)), core["_30" /* ɵdid */](13, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n\n        "])), (_l()(), core["_31" /* ɵeld */](15, 0, null, 2, 7, "h2", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](17, 0, null, null, 1, "core-format-text", [], null, null, null, null, null)), core["_30" /* ɵdid */](18, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform_platform["a" /* Platform */], utils_utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], app["a" /* CoreAppProvider */], helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */]], { text: [0, "text"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonMessagesGroupConversationsPage_24)), core["_30" /* ɵdid */](21, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 2, 1, null, View_AddonMessagesGroupConversationsPage_25)), core["_30" /* ɵdid */](25, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 2, 1, null, View_AddonMessagesGroupConversationsPage_28)), core["_30" /* ɵdid */](28, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n        "])), (_l()(), core["_31" /* ɵeld */](30, 0, null, 2, 10, "p", [["class", "addon-message-last-message"]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonMessagesGroupConversationsPage_29)), core["_30" /* ɵdid */](33, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonMessagesGroupConversationsPage_30)), core["_30" /* ɵdid */](36, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](38, 0, null, null, 1, "core-format-text", [["class", "addon-message-last-message-text"], ["clean", "true"], ["singleLine", "true"]], null, null, null, null, null)), core["_30" /* ɵdid */](39, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform_platform["a" /* Platform */], utils_utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], app["a" /* CoreAppProvider */], helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */]], { text: [0, "text"], clean: [1, "clean"], singleLine: [2, "singleLine"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n    "]))], function (_ck, _v) { var _co = _v.component; var currVal_3 = (_v.context.$implicit.type != _co.typeIndividual); _ck(_v, 9, 0, currVal_3); var currVal_4 = (_v.context.$implicit.type == _co.typeIndividual); _ck(_v, 13, 0, currVal_4); var currVal_5 = _v.context.$implicit.name; _ck(_v, 18, 0, currVal_5); var currVal_6 = _v.context.$implicit.isblocked; _ck(_v, 21, 0, currVal_6); var currVal_7 = ((_v.context.$implicit.lastmessagedate > 0) || _v.context.$implicit.unreadcount); _ck(_v, 25, 0, currVal_7); var currVal_8 = _v.context.$implicit.subname; _ck(_v, 28, 0, currVal_8); var currVal_9 = _v.context.$implicit.sentfromcurrentuser; _ck(_v, 33, 0, currVal_9); var currVal_10 = ((_v.context.$implicit.type != _co.typeIndividual) && _v.context.$implicit.members[0]); _ck(_v, 36, 0, currVal_10); var currVal_11 = _v.context.$implicit.lastmessage; var currVal_12 = "true"; var currVal_13 = "true"; _ck(_v, 39, 0, currVal_11, currVal_12, currVal_13); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = _v.context.$implicit.name; var currVal_1 = ((_v.context.$implicit.id && (_v.context.$implicit.id == _co.selectedConversationId)) || (_v.context.$implicit.userid && (_v.context.$implicit.userid == _co.selectedUserId))); var currVal_2 = core["_34" /* ɵinlineInterpolate */](1, "addon-message-conversation-", (_v.context.$implicit.id ? _v.context.$implicit.id : ("user-" + _v.context.$implicit.userid)), ""); _ck(_v, 0, 0, currVal_0, currVal_1, currVal_2); }); }
function View_AddonMessagesGroupConversationsPage_20(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonMessagesGroupConversationsPage_21)), core["_30" /* ɵdid */](2, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var currVal_0 = _v.context.conversations; _ck(_v, 2, 0, currVal_0); }, null); }
function View_AddonMessagesGroupConversationsPage_0(_l) { return core["_57" /* ɵvid */](0, [core["_47" /* ɵpid */](0, date_day_or_time["a" /* CoreDateDayOrTimePipe */], [logger["a" /* CoreLoggerProvider */], translate_service["a" /* TranslateService */], time["a" /* CoreTimeUtilsProvider */]]), core["_52" /* ɵqud */](402653184, 1, { splitviewCtrl: 0 }), core["_52" /* ɵqud */](402653184, 2, { content: 0 }), core["_52" /* ɵqud */](402653184, 3, { favListEl: 0 }), core["_52" /* ɵqud */](402653184, 4, { groupListEl: 0 }), core["_52" /* ɵqud */](402653184, 5, { indListEl: 0 }), (_l()(), core["_31" /* ɵeld */](6, 0, null, null, 37, "ion-header", [], null, null, null, null, null)), core["_30" /* ɵdid */](7, 16384, null, 0, toolbar_header["a" /* Header */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, view_controller["a" /* ViewController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_31" /* ɵeld */](9, 0, null, null, 33, "ion-navbar", [["class", "toolbar"], ["core-back-button", ""]], [[8, "hidden", 0], [2, "statusbar-padding", null]], null, null, navbar_ngfactory["b" /* View_Navbar_0 */], navbar_ngfactory["a" /* RenderType_Navbar */])), core["_30" /* ɵdid */](10, 49152, null, 0, navbar["a" /* Navbar */], [app_app["a" /* App */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_30" /* ɵdid */](11, 212992, null, 0, back_button["a" /* CoreBackButtonDirective */], [navbar["a" /* Navbar */], platform_platform["a" /* Platform */], translate_service["a" /* TranslateService */], events["a" /* CoreEventsProvider */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n        "])), (_l()(), core["_31" /* ɵeld */](13, 0, null, 3, 3, "ion-title", [], null, null, null, toolbar_title_ngfactory["b" /* View_ToolbarTitle_0 */], toolbar_title_ngfactory["a" /* RenderType_ToolbarTitle */])), core["_30" /* ɵdid */](14, 49152, null, 0, toolbar_title["a" /* ToolbarTitle */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), (_l()(), core["_55" /* ɵted */](15, 0, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n        "])), (_l()(), core["_31" /* ɵeld */](18, 0, null, 2, 23, "ion-buttons", [["end", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](19, 16384, null, 1, toolbar_item["a" /* ToolbarItem */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), core["_52" /* ɵqud */](603979776, 6, { _buttons: 1 }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](22, 0, null, null, 6, "button", [["icon-only", ""], ["ion-button", ""]], [[1, "aria-label", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.gotoSearch() !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](23, 1097728, [[6, 4]], 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                "])), (_l()(), core["_31" /* ɵeld */](26, 0, null, 0, 1, "ion-icon", [["name", "search"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](27, 147456, null, 0, icon_icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](30, 0, null, null, 6, "button", [["icon-only", ""], ["ion-button", ""]], [[1, "aria-label", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.gotoSettings($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](31, 1097728, [[6, 4]], 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                "])), (_l()(), core["_31" /* ɵeld */](34, 0, null, 0, 1, "ion-icon", [["name", "cog"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](35, 147456, null, 0, icon_icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](39, 0, null, null, 1, "core-context-menu", [], null, null, null, context_menu_ngfactory["b" /* View_CoreContextMenuComponent_0 */], context_menu_ngfactory["a" /* RenderType_CoreContextMenuComponent */])), core["_30" /* ɵdid */](40, 245760, null, 0, context_menu["a" /* CoreContextMenuComponent */], [translate_service["a" /* TranslateService */], popover_controller["a" /* PopoverController */], core["t" /* ElementRef */], dom["a" /* CoreDomUtilsProvider */], [2, tab["a" /* CoreTabComponent */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_31" /* ɵeld */](45, 0, null, null, 148, "core-split-view", [], null, null, null, split_view_ngfactory["b" /* View_CoreSplitViewComponent_0 */], split_view_ngfactory["a" /* RenderType_CoreSplitViewComponent */])), core["_30" /* ɵdid */](46, 245760, [[1, 4]], 0, split_view["a" /* CoreSplitViewComponent */], [[2, nav_controller["a" /* NavController */]], core["t" /* ElementRef */], fileuploader["a" /* CoreFileUploaderProvider */], platform_platform["a" /* Platform */], translate_service["a" /* TranslateService */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n    "])), (_l()(), core["_31" /* ɵeld */](48, 0, null, 0, 144, "ion-content", [["class", "core-expand-max"]], [[2, "statusbar-padding", null], [2, "has-refresher", null]], null, null, content_ngfactory["b" /* View_Content_0 */], content_ngfactory["a" /* RenderType_Content */])), core["_30" /* ɵdid */](49, 4374528, [[2, 4]], 0, content["a" /* Content */], [config["a" /* Config */], platform_platform["a" /* Platform */], dom_controller["a" /* DomController */], core["t" /* ElementRef */], core["V" /* Renderer */], app_app["a" /* App */], keyboard["a" /* Keyboard */], core["M" /* NgZone */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n        "])), (_l()(), core["_31" /* ɵeld */](51, 0, null, 2, 6, "ion-refresher", [], [[2, "refresher-active", null], [4, "top", null]], [[null, "ionRefresh"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("ionRefresh" === en)) {
        var pd_0 = (_co.refreshData($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), core["_30" /* ɵdid */](52, 212992, null, 0, refresher["a" /* Refresher */], [platform_platform["a" /* Platform */], content["a" /* Content */], core["M" /* NgZone */], gesture_controller["l" /* GestureController */]], { enabled: [0, "enabled"] }, { ionRefresh: "ionRefresh" }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](54, 0, null, null, 2, "ion-refresher-content", [], [[1, "state", 0]], null, null, refresher_content_ngfactory["b" /* View_RefresherContent_0 */], refresher_content_ngfactory["a" /* RenderType_RefresherContent */])), core["_30" /* ɵdid */](55, 114688, null, 0, refresher_content["a" /* RefresherContent */], [refresher["a" /* Refresher */], config["a" /* Config */]], { pullingText: [0, "pullingText"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n\n        "])), (_l()(), core["_31" /* ɵeld */](59, 0, null, 1, 132, "core-loading", [], null, null, null, loading_ngfactory["b" /* View_CoreLoadingComponent_0 */], loading_ngfactory["a" /* RenderType_CoreLoadingComponent */])), core["_30" /* ɵdid */](60, 638976, null, 0, loading["a" /* CoreLoadingComponent */], [translate_service["a" /* TranslateService */], core["t" /* ElementRef */], events["a" /* CoreEventsProvider */], utils_utils["a" /* CoreUtilsProvider */]], { hideUntil: [0, "hideUntil"], message: [1, "message"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n            "])), (_l()(), core["_31" /* ɵeld */](62, 0, null, 0, 128, "ion-list", [], null, null, null, null, null)), core["_30" /* ɵdid */](63, 16384, null, 0, list["a" /* List */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], platform_platform["a" /* Platform */], gesture_controller["l" /* GestureController */], dom_controller["a" /* DomController */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ɵeld */](65, 0, null, null, 17, "a", [["class", "addon-message-discussion item item-block"], ["ion-item", ""], ["text-wrap", ""]], [[1, "aria-label", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.gotoContacts($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](66, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 7, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 8, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 9, { _icons: 1 }), core["_30" /* ɵdid */](70, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](73, 0, null, 0, 1, "ion-icon", [["item-start", ""], ["name", "person"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](74, 147456, [[9, 4]], 0, icon_icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](76, 0, null, 2, 2, "h2", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](77, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, 4, 1, null, View_AddonMessagesGroupConversationsPage_1)), core["_30" /* ɵdid */](81, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ɵeld */](85, 0, null, null, 16, "ion-item-divider", [["class", "core-expandable item item-divider"], ["text-wrap", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.toggle(_co.favourites) !== false);
        ad = (pd_0 && ad);
    } return ad; }, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](86, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 10, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 11, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 12, { _icons: 1 }), core["_30" /* ɵdid */](90, 16384, null, 0, item_divider["a" /* ItemDivider */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonMessagesGroupConversationsPage_2)), core["_30" /* ɵdid */](93, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonMessagesGroupConversationsPage_3)), core["_30" /* ɵdid */](96, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](97, 2, ["\n                    ", " (", ")\n                    "])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_26" /* ɵand */](16777216, null, 4, 1, null, View_AddonMessagesGroupConversationsPage_4)), core["_30" /* ɵdid */](100, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ɵeld */](103, 0, [[3, 0], ["favlist", 1]], null, 12, "div", [], [[8, "hidden", 0]], null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 2, null, View_AddonMessagesGroupConversationsPage_5)), core["_30" /* ɵdid */](106, 540672, null, 0, common["r" /* NgTemplateOutlet */], [core["_11" /* ViewContainerRef */]], { ngTemplateOutletContext: [0, "ngTemplateOutletContext"], ngTemplateOutlet: [1, "ngTemplateOutlet"] }, null), core["_48" /* ɵpod */](107, { conversations: 0 }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](110, 0, null, null, 1, "core-infinite-loading", [], null, [[null, "action"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("action" === en)) {
        var pd_0 = (_co.loadMoreConversations(_co.favourites, $event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, infinite_loading_ngfactory["b" /* View_CoreInfiniteLoadingComponent_0 */], infinite_loading_ngfactory["a" /* RenderType_CoreInfiniteLoadingComponent */])), core["_30" /* ɵdid */](111, 49152, null, 0, infinite_loading["a" /* CoreInfiniteLoadingComponent */], [], { enabled: [0, "enabled"], error: [1, "error"] }, { action: "action" }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonMessagesGroupConversationsPage_6)), core["_30" /* ɵdid */](114, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonMessagesGroupConversationsPage_7)), core["_30" /* ɵdid */](118, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n                "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ɵeld */](121, 0, null, null, 16, "ion-item-divider", [["class", "core-expandable item item-divider"], ["text-wrap", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.toggle(_co.group) !== false);
        ad = (pd_0 && ad);
    } return ad; }, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](122, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 19, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 20, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 21, { _icons: 1 }), core["_30" /* ɵdid */](126, 16384, null, 0, item_divider["a" /* ItemDivider */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonMessagesGroupConversationsPage_8)), core["_30" /* ɵdid */](129, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonMessagesGroupConversationsPage_9)), core["_30" /* ɵdid */](132, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](133, 2, ["\n                    ", " (", ")\n                    "])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_26" /* ɵand */](16777216, null, 4, 1, null, View_AddonMessagesGroupConversationsPage_10)), core["_30" /* ɵdid */](136, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ɵeld */](139, 0, [[4, 0], ["grouplist", 1]], null, 12, "div", [], [[8, "hidden", 0]], null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 2, null, View_AddonMessagesGroupConversationsPage_11)), core["_30" /* ɵdid */](142, 540672, null, 0, common["r" /* NgTemplateOutlet */], [core["_11" /* ViewContainerRef */]], { ngTemplateOutletContext: [0, "ngTemplateOutletContext"], ngTemplateOutlet: [1, "ngTemplateOutlet"] }, null), core["_48" /* ɵpod */](143, { conversations: 0 }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](146, 0, null, null, 1, "core-infinite-loading", [], null, [[null, "action"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("action" === en)) {
        var pd_0 = (_co.loadMoreConversations(_co.group, $event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, infinite_loading_ngfactory["b" /* View_CoreInfiniteLoadingComponent_0 */], infinite_loading_ngfactory["a" /* RenderType_CoreInfiniteLoadingComponent */])), core["_30" /* ɵdid */](147, 49152, null, 0, infinite_loading["a" /* CoreInfiniteLoadingComponent */], [], { enabled: [0, "enabled"], error: [1, "error"] }, { action: "action" }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonMessagesGroupConversationsPage_12)), core["_30" /* ɵdid */](150, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonMessagesGroupConversationsPage_13)), core["_30" /* ɵdid */](154, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n                "])), (_l()(), core["_31" /* ɵeld */](156, 0, null, null, 16, "ion-item-divider", [["class", "core-expandable item item-divider"], ["text-wrap", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.toggle(_co.individual) !== false);
        ad = (pd_0 && ad);
    } return ad; }, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](157, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 28, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 29, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 30, { _icons: 1 }), core["_30" /* ɵdid */](161, 16384, null, 0, item_divider["a" /* ItemDivider */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonMessagesGroupConversationsPage_14)), core["_30" /* ɵdid */](164, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonMessagesGroupConversationsPage_15)), core["_30" /* ɵdid */](167, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](168, 2, ["\n                    ", " (", ")\n                    "])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_26" /* ɵand */](16777216, null, 4, 1, null, View_AddonMessagesGroupConversationsPage_16)), core["_30" /* ɵdid */](171, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ɵeld */](174, 0, [[5, 0], ["indlist", 1]], null, 12, "div", [], [[8, "hidden", 0]], null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 2, null, View_AddonMessagesGroupConversationsPage_17)), core["_30" /* ɵdid */](177, 540672, null, 0, common["r" /* NgTemplateOutlet */], [core["_11" /* ViewContainerRef */]], { ngTemplateOutletContext: [0, "ngTemplateOutletContext"], ngTemplateOutlet: [1, "ngTemplateOutlet"] }, null), core["_48" /* ɵpod */](178, { conversations: 0 }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](181, 0, null, null, 1, "core-infinite-loading", [], null, [[null, "action"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("action" === en)) {
        var pd_0 = (_co.loadMoreConversations(_co.individual, $event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, infinite_loading_ngfactory["b" /* View_CoreInfiniteLoadingComponent_0 */], infinite_loading_ngfactory["a" /* RenderType_CoreInfiniteLoadingComponent */])), core["_30" /* ɵdid */](182, 49152, null, 0, infinite_loading["a" /* CoreInfiniteLoadingComponent */], [], { enabled: [0, "enabled"], error: [1, "error"] }, { action: "action" }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonMessagesGroupConversationsPage_18)), core["_30" /* ɵdid */](185, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonMessagesGroupConversationsPage_19)), core["_30" /* ɵdid */](189, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n            "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_26" /* ɵand */](0, [["conversationsTemplate", 2]], null, 0, null, View_AddonMessagesGroupConversationsPage_20)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; _ck(_v, 11, 0); var currVal_5 = "search"; _ck(_v, 27, 0, currVal_5); var currVal_8 = "cog"; _ck(_v, 35, 0, currVal_8); _ck(_v, 40, 0); _ck(_v, 46, 0); var currVal_13 = (_co.loaded && (!_co.currentListEl || (_co.currentListEl.scrollTop < 5))); _ck(_v, 52, 0, currVal_13); var currVal_15 = core["_34" /* ɵinlineInterpolate */](1, "", core["_56" /* ɵunv */](_v, 55, 0, core["_44" /* ɵnov */](_v, 56).transform("core.pulltorefresh")), ""); _ck(_v, 55, 0, currVal_15); var currVal_16 = _co.loaded; var currVal_17 = _co.loadingMessage; _ck(_v, 60, 0, currVal_16, currVal_17); var currVal_20 = "person"; _ck(_v, 74, 0, currVal_20); var currVal_22 = (_co.contactRequestsCount > 0); _ck(_v, 81, 0, currVal_22); var currVal_23 = !_co.favourites.expanded; _ck(_v, 93, 0, currVal_23); var currVal_24 = _co.favourites.expanded; _ck(_v, 96, 0, currVal_24); var currVal_27 = _co.favourites.unread; _ck(_v, 100, 0, currVal_27); var currVal_29 = _ck(_v, 107, 0, _co.favourites.conversations); var currVal_30 = core["_44" /* ɵnov */](_v, 196); _ck(_v, 106, 0, currVal_29, currVal_30); var currVal_31 = _co.favourites.canLoadMore; var currVal_32 = _co.favourites.loadMoreError; _ck(_v, 111, 0, currVal_31, currVal_32); var currVal_33 = (_co.favourites.conversations && (_co.favourites.conversations.length == 0)); _ck(_v, 114, 0, currVal_33); var currVal_34 = _co.favourites.loading; _ck(_v, 118, 0, currVal_34); var currVal_35 = !_co.group.expanded; _ck(_v, 129, 0, currVal_35); var currVal_36 = _co.group.expanded; _ck(_v, 132, 0, currVal_36); var currVal_39 = _co.group.unread; _ck(_v, 136, 0, currVal_39); var currVal_41 = _ck(_v, 143, 0, _co.group.conversations); var currVal_42 = core["_44" /* ɵnov */](_v, 196); _ck(_v, 142, 0, currVal_41, currVal_42); var currVal_43 = _co.group.canLoadMore; var currVal_44 = _co.group.loadMoreError; _ck(_v, 147, 0, currVal_43, currVal_44); var currVal_45 = (_co.group.conversations && (_co.group.conversations.length == 0)); _ck(_v, 150, 0, currVal_45); var currVal_46 = _co.group.loading; _ck(_v, 154, 0, currVal_46); var currVal_47 = !_co.individual.expanded; _ck(_v, 164, 0, currVal_47); var currVal_48 = _co.individual.expanded; _ck(_v, 167, 0, currVal_48); var currVal_51 = _co.individual.unread; _ck(_v, 171, 0, currVal_51); var currVal_53 = _ck(_v, 178, 0, _co.individual.conversations); var currVal_54 = core["_44" /* ɵnov */](_v, 196); _ck(_v, 177, 0, currVal_53, currVal_54); var currVal_55 = _co.individual.canLoadMore; var currVal_56 = _co.individual.loadMoreError; _ck(_v, 182, 0, currVal_55, currVal_56); var currVal_57 = (_co.individual.conversations && (_co.individual.conversations.length == 0)); _ck(_v, 185, 0, currVal_57); var currVal_58 = _co.individual.loading; _ck(_v, 189, 0, currVal_58); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = core["_44" /* ɵnov */](_v, 10)._hidden; var currVal_1 = core["_44" /* ɵnov */](_v, 10)._sbPadding; _ck(_v, 9, 0, currVal_0, currVal_1); var currVal_2 = core["_56" /* ɵunv */](_v, 15, 0, core["_44" /* ɵnov */](_v, 16).transform("addon.messages.messages")); _ck(_v, 15, 0, currVal_2); var currVal_3 = core["_56" /* ɵunv */](_v, 22, 0, core["_44" /* ɵnov */](_v, 24).transform("addon.messages.search")); _ck(_v, 22, 0, currVal_3); var currVal_4 = core["_44" /* ɵnov */](_v, 27)._hidden; _ck(_v, 26, 0, currVal_4); var currVal_6 = core["_56" /* ɵunv */](_v, 30, 0, core["_44" /* ɵnov */](_v, 32).transform("addon.messages.messagepreferences")); _ck(_v, 30, 0, currVal_6); var currVal_7 = core["_44" /* ɵnov */](_v, 35)._hidden; _ck(_v, 34, 0, currVal_7); var currVal_9 = core["_44" /* ɵnov */](_v, 49).statusbarPadding; var currVal_10 = core["_44" /* ɵnov */](_v, 49)._hasRefresher; _ck(_v, 48, 0, currVal_9, currVal_10); var currVal_11 = (core["_44" /* ɵnov */](_v, 52).state !== "inactive"); var currVal_12 = core["_44" /* ɵnov */](_v, 52)._top; _ck(_v, 51, 0, currVal_11, currVal_12); var currVal_14 = core["_44" /* ɵnov */](_v, 55).r.state; _ck(_v, 54, 0, currVal_14); var currVal_18 = core["_56" /* ɵunv */](_v, 65, 0, core["_44" /* ɵnov */](_v, 71).transform("addon.messages.contacts")); _ck(_v, 65, 0, currVal_18); var currVal_19 = core["_44" /* ɵnov */](_v, 74)._hidden; _ck(_v, 73, 0, currVal_19); var currVal_21 = core["_56" /* ɵunv */](_v, 77, 0, core["_44" /* ɵnov */](_v, 78).transform("addon.messages.contacts")); _ck(_v, 77, 0, currVal_21); var currVal_25 = core["_56" /* ɵunv */](_v, 97, 0, core["_44" /* ɵnov */](_v, 98).transform("core.favourites")); var currVal_26 = _co.favourites.count; _ck(_v, 97, 0, currVal_25, currVal_26); var currVal_28 = ((!_co.favourites.conversations || !_co.favourites.expanded) || _co.favourites.loading); _ck(_v, 103, 0, currVal_28); var currVal_37 = core["_56" /* ɵunv */](_v, 133, 0, core["_44" /* ɵnov */](_v, 134).transform("addon.messages.groupconversations")); var currVal_38 = _co.group.count; _ck(_v, 133, 0, currVal_37, currVal_38); var currVal_40 = ((!_co.group.conversations || !_co.group.expanded) || _co.group.loading); _ck(_v, 139, 0, currVal_40); var currVal_49 = core["_56" /* ɵunv */](_v, 168, 0, core["_44" /* ɵnov */](_v, 169).transform("addon.messages.individualconversations")); var currVal_50 = _co.individual.count; _ck(_v, 168, 0, currVal_49, currVal_50); var currVal_52 = ((!_co.individual.conversations || !_co.individual.expanded) || _co.individual.loading); _ck(_v, 174, 0, currVal_52); }); }
function View_AddonMessagesGroupConversationsPage_Host_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "page-addon-messages-group-conversations", [], null, null, null, View_AddonMessagesGroupConversationsPage_0, RenderType_AddonMessagesGroupConversationsPage)), core["_30" /* ɵdid */](1, 245760, null, 0, group_conversations_AddonMessagesGroupConversationsPage, [events["a" /* CoreEventsProvider */], sites["a" /* CoreSitesProvider */], translate_service["a" /* TranslateService */], providers_messages["a" /* AddonMessagesProvider */], dom["a" /* CoreDomUtilsProvider */], nav_params["a" /* NavParams */], nav_controller["a" /* NavController */], platform_platform["a" /* Platform */], utils_utils["a" /* CoreUtilsProvider */], delegate["a" /* AddonPushNotificationsDelegate */], messages_offline["a" /* AddonMessagesOfflineProvider */], providers_user["a" /* CoreUserProvider */]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var AddonMessagesGroupConversationsPageNgFactory = core["_27" /* ɵccf */]("page-addon-messages-group-conversations", group_conversations_AddonMessagesGroupConversationsPage, View_AddonMessagesGroupConversationsPage_Host_0, {}, {}, []);

//# sourceMappingURL=group-conversations.ngfactory.js.map
// EXTERNAL MODULE: ./node_modules/@angular/forms/esm5/forms.js
var esm5_forms = __webpack_require__(22);

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

// EXTERNAL MODULE: ./node_modules/ionic-angular/util/module-loader.js
var module_loader = __webpack_require__(248);

// CONCATENATED MODULE: ./src/addon/messages/pages/group-conversations/group-conversations.module.ngfactory.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddonMessagesGroupConversationsPageModuleNgFactory", function() { return AddonMessagesGroupConversationsPageModuleNgFactory; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 






























var AddonMessagesGroupConversationsPageModuleNgFactory = core["_28" /* ɵcmf */](group_conversations_module_AddonMessagesGroupConversationsPageModule, [], function (_l) { return core["_40" /* ɵmod */]([core["_41" /* ɵmpd */](512, core["o" /* ComponentFactoryResolver */], core["_21" /* ɵCodegenComponentFactoryResolver */], [[8, [action_sheet_component_ngfactory["a" /* ActionSheetCmpNgFactory */], alert_component_ngfactory["a" /* AlertCmpNgFactory */], app_root_ngfactory["a" /* IonicAppNgFactory */], loading_component_ngfactory["a" /* LoadingCmpNgFactory */], modal_component_ngfactory["a" /* ModalCmpNgFactory */], picker_component_ngfactory["a" /* PickerCmpNgFactory */], popover_component_ngfactory["a" /* PopoverCmpNgFactory */], select_popover_component_ngfactory["a" /* SelectPopoverNgFactory */], toast_component_ngfactory["a" /* ToastCmpNgFactory */], context_menu_popover_ngfactory["a" /* CoreContextMenuPopoverComponentNgFactory */], course_picker_menu_popover_ngfactory["a" /* CoreCoursePickerMenuPopoverComponentNgFactory */], recaptchamodal_ngfactory["a" /* CoreRecaptchaModalComponentNgFactory */], AddonMessagesGroupConversationsPageNgFactory]], [3, core["o" /* ComponentFactoryResolver */]], core["K" /* NgModuleRef */]]), core["_41" /* ɵmpd */](4608, common["m" /* NgLocalization */], common["l" /* NgLocaleLocalization */], [core["G" /* LOCALE_ID */], [2, common["v" /* ɵa */]]]), core["_41" /* ɵmpd */](4608, esm5_forms["x" /* ɵi */], esm5_forms["x" /* ɵi */], []), core["_41" /* ɵmpd */](4608, esm5_forms["d" /* FormBuilder */], esm5_forms["d" /* FormBuilder */], []), core["_41" /* ɵmpd */](4608, translate_loader["b" /* TranslateLoader */], translate_loader["a" /* TranslateFakeLoader */], []), core["_41" /* ɵmpd */](4608, translate_compiler["a" /* TranslateCompiler */], translate_compiler["b" /* TranslateFakeCompiler */], []), core["_41" /* ɵmpd */](4608, translate_parser["b" /* TranslateParser */], translate_parser["a" /* TranslateDefaultParser */], []), core["_41" /* ɵmpd */](4608, missing_translation_handler["b" /* MissingTranslationHandler */], missing_translation_handler["a" /* FakeMissingTranslationHandler */], []), core["_41" /* ɵmpd */](4608, translate_service["a" /* TranslateService */], translate_service["a" /* TranslateService */], [translate_store["a" /* TranslateStore */], translate_loader["b" /* TranslateLoader */], translate_compiler["a" /* TranslateCompiler */], translate_parser["b" /* TranslateParser */], missing_translation_handler["b" /* MissingTranslationHandler */], translate_service["b" /* USE_DEFAULT_LANG */], translate_service["c" /* USE_STORE */]]), core["_41" /* ɵmpd */](512, common["b" /* CommonModule */], common["b" /* CommonModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["v" /* ɵba */], esm5_forms["v" /* ɵba */], []), core["_41" /* ɵmpd */](512, esm5_forms["i" /* FormsModule */], esm5_forms["i" /* FormsModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["s" /* ReactiveFormsModule */], esm5_forms["s" /* ReactiveFormsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["a" /* IonicModule */], ionic_angular_module["a" /* IonicModule */], []), core["_41" /* ɵmpd */](512, _ngx_translate_core["b" /* TranslateModule */], _ngx_translate_core["b" /* TranslateModule */], []), core["_41" /* ɵmpd */](512, directives_module["a" /* CoreDirectivesModule */], directives_module["a" /* CoreDirectivesModule */], []), core["_41" /* ɵmpd */](512, pipes_module["a" /* CorePipesModule */], pipes_module["a" /* CorePipesModule */], []), core["_41" /* ɵmpd */](512, components_module["a" /* CoreComponentsModule */], components_module["a" /* CoreComponentsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["b" /* IonicPageModule */], ionic_angular_module["b" /* IonicPageModule */], []), core["_41" /* ɵmpd */](512, group_conversations_module_AddonMessagesGroupConversationsPageModule, group_conversations_module_AddonMessagesGroupConversationsPageModule, []), core["_41" /* ɵmpd */](256, translate_service["c" /* USE_STORE */], undefined, []), core["_41" /* ɵmpd */](256, translate_service["b" /* USE_DEFAULT_LANG */], undefined, []), core["_41" /* ɵmpd */](256, module_loader["a" /* LAZY_LOADED_TOKEN */], group_conversations_AddonMessagesGroupConversationsPage, [])]); });

//# sourceMappingURL=group-conversations.module.ngfactory.js.map

/***/ })

});
//# sourceMappingURL=108.js.map