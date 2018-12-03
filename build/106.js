webpackJsonp([106],{

/***/ 1844:
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
var providers_messages = __webpack_require__(173);

// EXTERNAL MODULE: ./src/addon/messages/providers/messages-offline.ts
var messages_offline = __webpack_require__(344);

// EXTERNAL MODULE: ./src/providers/utils/dom.ts
var dom = __webpack_require__(4);

// EXTERNAL MODULE: ./src/providers/utils/utils.ts
var utils_utils = __webpack_require__(2);

// EXTERNAL MODULE: ./src/providers/app.ts
var app = __webpack_require__(10);

// EXTERNAL MODULE: ./src/addon/pushnotifications/providers/delegate.ts
var delegate = __webpack_require__(229);

// EXTERNAL MODULE: ./src/components/split-view/split-view.ts
var split_view = __webpack_require__(33);

// EXTERNAL MODULE: ./src/core/user/providers/user.ts
var providers_user = __webpack_require__(43);

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
    function AddonMessagesGroupConversationsPage(eventsProvider, sitesProvider, translate, messagesProvider, domUtils, navParams, appProvider, platform, utils, pushNotificationsDelegate, messagesOffline, userProvider) {
        var _this = this;
        this.eventsProvider = eventsProvider;
        this.messagesProvider = messagesProvider;
        this.domUtils = domUtils;
        this.appProvider = appProvider;
        this.messagesOffline = messagesOffline;
        this.userProvider = userProvider;
        this.loaded = false;
        this.search = {
            enabled: false,
            showResults: false,
            results: [],
            loading: '',
            text: ''
        };
        this.favourites = {
            type: null,
            favourites: true
        };
        this.group = {
            type: providers_messages["a" /* AddonMessagesProvider */].MESSAGE_CONVERSATION_TYPE_GROUP,
            favourites: false
        };
        this.individual = {
            type: providers_messages["a" /* AddonMessagesProvider */].MESSAGE_CONVERSATION_TYPE_INDIVIDUAL,
            favourites: false
        };
        this.typeIndividual = providers_messages["a" /* AddonMessagesProvider */].MESSAGE_CONVERSATION_TYPE_INDIVIDUAL;
        this.search.loading = translate.instant('core.searching');
        this.loadingString = translate.instant('core.loading');
        this.siteId = sitesProvider.getCurrentSiteId();
        this.currentUserId = sitesProvider.getCurrentSiteUserId();
        this.conversationId = navParams.get('conversationId') || false;
        // Update conversations when new message is received.
        this.newMessagesObserver = eventsProvider.on(providers_messages["a" /* AddonMessagesProvider */].NEW_MESSAGE_EVENT, function (data) {
            // Search the conversation to update.
            var conversation = _this.findConversation(data.conversationId, data.userId);
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
                    // Conversations changed, invalidate them.
                    _this.messagesProvider.invalidateConversations();
                }
            }
        }, this.siteId);
        // Update conversations when cron read is executed.
        this.cronObserver = eventsProvider.on(providers_messages["a" /* AddonMessagesProvider */].READ_CRON_EVENT, function (data) {
            _this.refreshData();
        }, this.siteId);
        // Load a discussion if we receive an event to do so.
        this.openConversationObserver = eventsProvider.on(providers_messages["a" /* AddonMessagesProvider */].OPEN_CONVERSATION_EVENT, function (data) {
            if (data.conversationId || data.userId) {
                _this.gotoConversation(data.conversationId, data.userId, undefined, true);
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
                _this.refreshData();
            }
        });
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
                if (_this.favourites.expanded) {
                    conversation = _this.favourites.conversations[0];
                }
                else if (_this.group.expanded) {
                    conversation = _this.group.conversations[0];
                }
                else if (_this.individual.expanded) {
                    conversation = _this.individual.conversations[0];
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
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonMessagesGroupConversationsPage.prototype.fetchData = function () {
        var _this = this;
        this.loadingMessage = this.loadingString;
        this.search.enabled = this.messagesProvider.isSearchMessagesEnabled();
        // Load the first conversations of each type.
        var promises = [];
        var offlineMessages;
        promises.push(this.fetchDataForOption(this.favourites, false));
        promises.push(this.fetchDataForOption(this.group, false));
        promises.push(this.fetchDataForOption(this.individual, false));
        promises.push(this.messagesOffline.getAllMessages().then(function (messages) {
            offlineMessages = messages;
        }));
        return Promise.all(promises).then(function () {
            return _this.loadOfflineMessages(offlineMessages);
        }).then(function () {
            if (offlineMessages && offlineMessages.length) {
                // Sort the conversations, the offline messages could affect the order.
                _this.favourites.conversations = _this.messagesProvider.sortConversations(_this.favourites.conversations);
                _this.group.conversations = _this.messagesProvider.sortConversations(_this.group.conversations);
                _this.individual.conversations = _this.messagesProvider.sortConversations(_this.individual.conversations);
            }
            if (typeof _this.favourites.expanded == 'undefined') {
                // The expanded status hasn't been initialized. Do it now.
                if (_this.conversationId) {
                    // A certain conversation should be opened, expand its option.
                    var conversation = _this.findConversation(_this.conversationId);
                    if (conversation) {
                        var option = _this.getConversationOption(conversation);
                        option.expanded = true;
                        return;
                    }
                }
                // No conversation specified or not found, determine which one should be expanded.
                _this.favourites.expanded = _this.favourites.count != 0;
                _this.group.expanded = _this.favourites.count == 0 && _this.group.count != 0;
                _this.individual.expanded = _this.favourites.count == 0 && _this.group.count == 0;
            }
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'addon.messages.errorwhileretrievingdiscussions', true);
        }).finally(function () {
            _this.loaded = true;
        });
    };
    /**
     * Fetch data for a certain option.
     *
     * @param {any} option The option to fetch data for.
     * @param {boolean} [loadingMore} Whether we are loading more data or just the first ones.
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonMessagesGroupConversationsPage.prototype.fetchDataForOption = function (option, loadingMore) {
        option.loadMoreError = false;
        var limitFrom = loadingMore ? option.conversations.length : 0;
        return this.messagesProvider.getConversations(option.type, option.favourites, limitFrom).then(function (data) {
            if (loadingMore) {
                option.conversations = option.conversations.concat(data.conversations);
            }
            else {
                option.count = data.canLoadMore ? providers_messages["a" /* AddonMessagesProvider */].LIMIT_MESSAGES + '+' : data.conversations.length;
                option.conversations = data.conversations;
            }
            option.unread = 0; // @todo.
            option.canLoadMore = data.canLoadMore;
        });
    };
    /**
     * Find a conversation in the list of loaded conversations.
     *
     * @param {number} conversationId The conversation ID to search.
     * @param {number} userId User ID to search (if no conversationId).
     * @return {any} Conversation.
     */
    AddonMessagesGroupConversationsPage.prototype.findConversation = function (conversationId, userId) {
        if (conversationId) {
            var conversations = (this.favourites.conversations || []).concat(this.group.conversations || [])
                .concat(this.individual.conversations || []);
            return conversations.find(function (conv) {
                return conv.id == conversationId;
            });
        }
        else if (this.individual.conversations) {
            return this.individual.conversations.find(function (conv) {
                return conv.userid == userId;
            });
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
     * @param {boolean} [scrollToConversation] Whether to scroll to the conversation.
     */
    AddonMessagesGroupConversationsPage.prototype.gotoConversation = function (conversationId, userId, messageId, scrollToConversation) {
        var _this = this;
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
        if (scrollToConversation) {
            // Search the conversation.
            var conversation_1 = this.findConversation(conversationId, userId);
            if (conversation_1) {
                // First expand the option if it isn't expanded.
                var option = this.getConversationOption(conversation_1);
                this.expandOption(option);
                // Wait for the view to expand the option.
                setTimeout(function () {
                    // Now scroll to the conversation.
                    _this.domUtils.scrollToElementBySelector(_this.content, '#addon-message-conversation-' +
                        (conversation_1.id ? conversation_1.id : 'user-' + conversation_1.userid));
                });
            }
        }
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
     * @param {any[]} messages Offline messages.
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonMessagesGroupConversationsPage.prototype.loadOfflineMessages = function (messages) {
        var _this = this;
        var promises = [];
        messages.forEach(function (message) {
            if (message.conversationid) {
                // It's an existing conversation. Search it.
                var conversation = _this.findConversation(message.conversationid);
                if (conversation) {
                    // Check if it's the last message. Offline messages are considered more recent than sent messages.
                    if (typeof conversation.lastmessage === 'undefined' || conversation.lastmessage === null ||
                        !conversation.lastmessagepending || conversation.lastmessagedate <= message.timecreated / 1000) {
                        _this.addLastOfflineMessage(conversation, message);
                    }
                }
                else {
                    // Conversation not found, it's probably an old one. Add it.
                    conversation = message.conversation || {};
                    conversation.id = message.conversationid;
                    _this.addLastOfflineMessage(conversation, message);
                    _this.addOfflineConversation(conversation);
                }
            }
            else {
                // Its a new conversation. Check if we already created it (there is more than one message for the same user).
                var conversation = _this.findConversation(undefined, message.touserid);
                message.text = message.smallmessage;
                if (conversation) {
                    // Check if it's the last message. Offline messages are considered more recent than sent messages.
                    if (conversation.lastmessagedate <= message.timecreated / 1000) {
                        _this.addLastOfflineMessage(conversation, message);
                    }
                }
                else {
                    // Get the user data and create a new conversation.
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
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonMessagesGroupConversationsPage.prototype.refreshData = function (refresher) {
        var _this = this;
        return this.messagesProvider.invalidateConversations().then(function () {
            return _this.fetchData().finally(function () {
                if (refresher) {
                    // Actions to take if refresh comes from the user.
                    _this.eventsProvider.trigger(providers_messages["a" /* AddonMessagesProvider */].READ_CHANGED_EVENT, undefined, _this.siteId);
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
        if (option.expanded) {
            // Already expanded, close it.
            option.expanded = false;
        }
        else {
            this.expandOption(option);
        }
    };
    /**
     * Expand a certain option.
     *
     * @param {any} option The option to expand.
     */
    AddonMessagesGroupConversationsPage.prototype.expandOption = function (option) {
        // Collapse all and expand the right one.
        this.favourites.expanded = false;
        this.group.expanded = false;
        this.individual.expanded = false;
        option.expanded = true;
    };
    /**
     * Clear search and show conversations again.
     */
    AddonMessagesGroupConversationsPage.prototype.clearSearch = function () {
        var _this = this;
        this.loaded = false;
        this.search.showResults = false;
        this.search.text = ''; // Reset searched string.
        this.fetchData().finally(function () {
            _this.loaded = true;
        });
    };
    /**
     * Search messages cotaining text.
     *
     * @param  {string}       query Text to search for.
     * @return {Promise<any>}       Resolved when done.
     */
    AddonMessagesGroupConversationsPage.prototype.searchMessage = function (query) {
        var _this = this;
        this.appProvider.closeKeyboard();
        this.loaded = false;
        this.loadingMessage = this.search.loading;
        return this.messagesProvider.searchMessages(query).then(function (searchResults) {
            _this.search.showResults = true;
            _this.search.results = searchResults;
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'addon.messages.errorwhileretrievingmessages', true);
        }).finally(function () {
            _this.loaded = true;
        });
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
    };
    __decorate([
        Object(core["_9" /* ViewChild */])(split_view["a" /* CoreSplitViewComponent */]),
        __metadata("design:type", split_view["a" /* CoreSplitViewComponent */])
    ], AddonMessagesGroupConversationsPage.prototype, "splitviewCtrl", void 0);
    __decorate([
        Object(core["_9" /* ViewChild */])(ionic_angular["f" /* Content */]),
        __metadata("design:type", ionic_angular["f" /* Content */])
    ], AddonMessagesGroupConversationsPage.prototype, "content", void 0);
    AddonMessagesGroupConversationsPage = __decorate([
        Object(core["m" /* Component */])({
            selector: 'page-addon-messages-group-conversations',
            templateUrl: 'group-conversations.html',
        }),
        __metadata("design:paramtypes", [events["a" /* CoreEventsProvider */], sites["a" /* CoreSitesProvider */], _ngx_translate_core["c" /* TranslateService */],
            providers_messages["a" /* AddonMessagesProvider */], dom["a" /* CoreDomUtilsProvider */], ionic_angular["t" /* NavParams */],
            app["a" /* CoreAppProvider */], ionic_angular["v" /* Platform */], utils_utils["a" /* CoreUtilsProvider */],
            delegate["a" /* AddonPushNotificationsDelegate */], messages_offline["a" /* AddonMessagesOfflineProvider */],
            providers_user["a" /* CoreUserProvider */]])
    ], AddonMessagesGroupConversationsPage);
    return AddonMessagesGroupConversationsPage;
}());

//# sourceMappingURL=group-conversations.js.map
// EXTERNAL MODULE: ./src/components/components.module.ts
var components_module = __webpack_require__(27);

// EXTERNAL MODULE: ./src/directives/directives.module.ts + 2 modules
var directives_module = __webpack_require__(28);

// EXTERNAL MODULE: ./src/pipes/pipes.module.ts + 1 modules
var pipes_module = __webpack_require__(107);

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
var action_sheet_component_ngfactory = __webpack_require__(1344);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/alert/alert-component.ngfactory.js
var alert_component_ngfactory = __webpack_require__(1345);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/app/app-root.ngfactory.js
var app_root_ngfactory = __webpack_require__(1346);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/loading/loading-component.ngfactory.js
var loading_component_ngfactory = __webpack_require__(1347);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/modal/modal-component.ngfactory.js
var modal_component_ngfactory = __webpack_require__(1348);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/picker/picker-component.ngfactory.js + 1 modules
var picker_component_ngfactory = __webpack_require__(1349);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/popover/popover-component.ngfactory.js
var popover_component_ngfactory = __webpack_require__(1350);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/select/select-popover-component.ngfactory.js
var select_popover_component_ngfactory = __webpack_require__(1351);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toast/toast-component.ngfactory.js
var toast_component_ngfactory = __webpack_require__(1352);

// EXTERNAL MODULE: ./src/components/context-menu/context-menu-popover.ngfactory.js
var context_menu_popover_ngfactory = __webpack_require__(1355);

// EXTERNAL MODULE: ./src/components/course-picker-menu/course-picker-menu-popover.ngfactory.js
var course_picker_menu_popover_ngfactory = __webpack_require__(1356);

// EXTERNAL MODULE: ./src/components/recaptcha/recaptchamodal.ngfactory.js
var recaptchamodal_ngfactory = __webpack_require__(1357);

// EXTERNAL MODULE: ./src/components/search-box/search-box.ngfactory.js
var search_box_ngfactory = __webpack_require__(1372);

// EXTERNAL MODULE: ./src/components/search-box/search-box.ts
var search_box = __webpack_require__(448);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.service.js
var translate_service = __webpack_require__(17);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.pipe.js
var translate_pipe = __webpack_require__(24);

// EXTERNAL MODULE: ./src/components/icon/icon.ngfactory.js
var icon_ngfactory = __webpack_require__(133);

// EXTERNAL MODULE: ./src/components/icon/icon.ts
var icon = __webpack_require__(120);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/note/note.js
var note = __webpack_require__(226);

// EXTERNAL MODULE: ./node_modules/ionic-angular/config/config.js
var config = __webpack_require__(6);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item.ngfactory.js + 1 modules
var item_ngfactory = __webpack_require__(29);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item.js
var item = __webpack_require__(20);

// EXTERNAL MODULE: ./node_modules/ionic-angular/util/form.js
var util_form = __webpack_require__(19);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-reorder.js + 1 modules
var item_reorder = __webpack_require__(26);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-content.js
var item_content = __webpack_require__(31);

// EXTERNAL MODULE: ./src/components/user-avatar/user-avatar.ngfactory.js
var user_avatar_ngfactory = __webpack_require__(222);

// EXTERNAL MODULE: ./src/components/user-avatar/user-avatar.ts
var user_avatar = __webpack_require__(186);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-controller.js
var nav_controller = __webpack_require__(21);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/avatar/avatar.js
var avatar = __webpack_require__(185);

// EXTERNAL MODULE: ./src/directives/format-text.ts
var format_text = __webpack_require__(39);

// EXTERNAL MODULE: ./src/providers/utils/text.ts
var utils_text = __webpack_require__(9);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/platform.js + 1 modules
var platform_platform = __webpack_require__(14);

// EXTERNAL MODULE: ./src/providers/utils/url.ts
var url = __webpack_require__(25);

// EXTERNAL MODULE: ./src/providers/logger.ts
var logger = __webpack_require__(5);

// EXTERNAL MODULE: ./src/providers/filepool.ts
var filepool = __webpack_require__(16);

// EXTERNAL MODULE: ./src/core/contentlinks/providers/helper.ts
var helper = __webpack_require__(18);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.js
var content = __webpack_require__(23);

// EXTERNAL MODULE: ./src/providers/utils/iframe.ts
var iframe = __webpack_require__(36);

// EXTERNAL MODULE: ./node_modules/@angular/common/esm5/common.js
var common = __webpack_require__(7);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/list/list.js + 1 modules
var list = __webpack_require__(76);

// EXTERNAL MODULE: ./node_modules/ionic-angular/gestures/gesture-controller.js
var gesture_controller = __webpack_require__(37);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/dom-controller.js
var dom_controller = __webpack_require__(30);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-divider.js
var item_divider = __webpack_require__(109);

// EXTERNAL MODULE: ./src/components/infinite-loading/infinite-loading.ngfactory.js
var infinite_loading_ngfactory = __webpack_require__(440);

// EXTERNAL MODULE: ./src/components/infinite-loading/infinite-loading.ts
var infinite_loading = __webpack_require__(277);

// EXTERNAL MODULE: ./src/components/empty-box/empty-box.ngfactory.js
var empty_box_ngfactory = __webpack_require__(119);

// EXTERNAL MODULE: ./src/components/empty-box/empty-box.ts
var empty_box = __webpack_require__(110);

// EXTERNAL MODULE: ./src/directives/external-content.ts
var external_content = __webpack_require__(227);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/badge/badge.js
var badge = __webpack_require__(146);

// EXTERNAL MODULE: ./src/pipes/date-day-or-time.ts
var date_day_or_time = __webpack_require__(340);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-header.js
var toolbar_header = __webpack_require__(434);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/view-controller.js
var view_controller = __webpack_require__(35);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/navbar.ngfactory.js
var navbar_ngfactory = __webpack_require__(1353);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/navbar.js
var navbar = __webpack_require__(200);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/app/app.js + 3 modules
var app_app = __webpack_require__(32);

// EXTERNAL MODULE: ./src/directives/back-button.ts
var back_button = __webpack_require__(662);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.ngfactory.js
var toolbar_title_ngfactory = __webpack_require__(1354);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.js
var toolbar_title = __webpack_require__(335);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar.js
var toolbar = __webpack_require__(247);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-item.js
var toolbar_item = __webpack_require__(435);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.ngfactory.js
var button_ngfactory = __webpack_require__(44);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.js
var button_button = __webpack_require__(41);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/icon/icon.js
var icon_icon = __webpack_require__(45);

// EXTERNAL MODULE: ./src/components/context-menu/context-menu.ngfactory.js
var context_menu_ngfactory = __webpack_require__(87);

// EXTERNAL MODULE: ./src/components/context-menu/context-menu.ts
var context_menu = __webpack_require__(72);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/popover/popover-controller.js
var popover_controller = __webpack_require__(62);

// EXTERNAL MODULE: ./src/components/tabs/tab.ts
var tab = __webpack_require__(71);

// EXTERNAL MODULE: ./src/components/split-view/split-view.ngfactory.js
var split_view_ngfactory = __webpack_require__(436);

// EXTERNAL MODULE: ./src/core/fileuploader/providers/fileuploader.ts
var fileuploader = __webpack_require__(66);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.ngfactory.js
var content_ngfactory = __webpack_require__(184);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/keyboard.js
var keyboard = __webpack_require__(108);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/refresher/refresher.js
var refresher_refresher = __webpack_require__(145);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/refresher/refresher-content.ngfactory.js
var refresher_content_ngfactory = __webpack_require__(201);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/refresher/refresher-content.js
var refresher_content = __webpack_require__(157);

// EXTERNAL MODULE: ./src/components/loading/loading.ngfactory.js
var loading_ngfactory = __webpack_require__(48);

// EXTERNAL MODULE: ./src/components/loading/loading.ts
var loading = __webpack_require__(47);

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

function View_AddonMessagesGroupConversationsPage_1(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "core-search-box", [["autocorrect", "off"], ["lengthCheck", "2"], ["spellcheck", "false"]], null, [[null, "onSubmit"], [null, "onClear"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("onSubmit" === en)) {
        var pd_0 = (_co.searchMessage($event) !== false);
        ad = (pd_0 && ad);
    } if (("onClear" === en)) {
        var pd_1 = (_co.clearSearch($event) !== false);
        ad = (pd_1 && ad);
    } return ad; }, search_box_ngfactory["b" /* View_CoreSearchBoxComponent_0 */], search_box_ngfactory["a" /* RenderType_CoreSearchBoxComponent */])), core["_30" /* ɵdid */](1, 114688, null, 0, search_box["a" /* CoreSearchBoxComponent */], [translate_service["a" /* TranslateService */], utils_utils["a" /* CoreUtilsProvider */]], { placeholder: [0, "placeholder"], autocorrect: [1, "autocorrect"], spellcheck: [2, "spellcheck"], lengthCheck: [3, "lengthCheck"], disabled: [4, "disabled"] }, { onSubmit: "onSubmit", onClear: "onClear" }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], function (_ck, _v) { var _co = _v.component; var currVal_0 = core["_56" /* ɵunv */](_v, 1, 0, core["_44" /* ɵnov */](_v, 2).transform("addon.messages.message")); var currVal_1 = "off"; var currVal_2 = "false"; var currVal_3 = "2"; var currVal_4 = !_co.loaded; _ck(_v, 1, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4); }, null); }
function View_AddonMessagesGroupConversationsPage_4(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "core-icon", [["name", "fa-ban"]], [[1, "aria-label", 0]], null, null, icon_ngfactory["b" /* View_CoreIconComponent_0 */], icon_ngfactory["a" /* RenderType_CoreIconComponent */])), core["_30" /* ɵdid */](1, 245760, null, 0, icon["a" /* CoreIconComponent */], [core["t" /* ElementRef */]], { name: [0, "name"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], function (_ck, _v) { var currVal_1 = "fa-ban"; _ck(_v, 1, 0, currVal_1); }, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 0, 0, core["_44" /* ɵnov */](_v, 2).transform("addon.messages.contactblocked")); _ck(_v, 0, 0, currVal_0); }); }
function View_AddonMessagesGroupConversationsPage_5(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 3, "ion-note", [], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, note["a" /* Note */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](2, null, ["\n                            ", "\n                        "])), core["_49" /* ɵppd */](3, 1)], null, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 2, 0, _ck(_v, 3, 0, core["_44" /* ɵnov */](_v.parent.parent.parent, 0), _v.parent.context.$implicit.lastmessagedate)); _ck(_v, 2, 0, currVal_0); }); }
function View_AddonMessagesGroupConversationsPage_3(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 29, "a", [["class", "item item-block"], ["detail-none", ""], ["ion-item", ""], ["text-wrap", ""]], [[8, "title", 0], [2, "core-split-item-selected", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.gotoConversation(_v.context.$implicit.conversationid, _v.context.$implicit.userid, _v.context.$implicit.messageid) !== false);
        ad = (pd_0 && ad);
    } return ad; }, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 7, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 8, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 9, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 0, 2, "ion-avatar", [["core-user-avatar", ""], ["item-start", ""]], null, null, null, user_avatar_ngfactory["b" /* View_CoreUserAvatarComponent_0 */], user_avatar_ngfactory["a" /* RenderType_CoreUserAvatarComponent */])), core["_30" /* ɵdid */](8, 638976, null, 0, user_avatar["a" /* CoreUserAvatarComponent */], [nav_controller["a" /* NavController */], sites["a" /* CoreSitesProvider */], utils_utils["a" /* CoreUtilsProvider */]], { user: [0, "user"], linkProfile: [1, "linkProfile"] }, null), core["_30" /* ɵdid */](9, 16384, null, 0, avatar["a" /* Avatar */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](11, 0, null, 2, 13, "h2", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](13, 0, null, null, 7, "p", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                            "])), (_l()(), core["_31" /* ɵeld */](15, 0, null, null, 1, "core-format-text", [], null, null, null, null, null)), core["_30" /* ɵdid */](16, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform_platform["a" /* Platform */], utils_utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], app["a" /* CoreAppProvider */], helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */]], { text: [0, "text"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonMessagesGroupConversationsPage_4)), core["_30" /* ɵdid */](19, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonMessagesGroupConversationsPage_5)), core["_30" /* ɵdid */](23, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](26, 0, null, 2, 2, "p", [], null, null, null, null, null)), (_l()(), core["_31" /* ɵeld */](27, 0, null, null, 1, "core-format-text", [["class", "addon-message-last-message"], ["clean", "true"], ["singleLine", "true"]], null, null, null, null, null)), core["_30" /* ɵdid */](28, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform_platform["a" /* Platform */], utils_utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], app["a" /* CoreAppProvider */], helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */]], { text: [0, "text"], clean: [1, "clean"], singleLine: [2, "singleLine"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "]))], function (_ck, _v) { var currVal_2 = _v.context.$implicit; var currVal_3 = false; _ck(_v, 8, 0, currVal_2, currVal_3); var currVal_4 = _v.context.$implicit.fullname; _ck(_v, 16, 0, currVal_4); var currVal_5 = _v.context.$implicit.isblocked; _ck(_v, 19, 0, currVal_5); var currVal_6 = (_v.context.$implicit.lastmessagedate > 0); _ck(_v, 23, 0, currVal_6); var currVal_7 = _v.context.$implicit.lastmessage; var currVal_8 = "true"; var currVal_9 = "true"; _ck(_v, 28, 0, currVal_7, currVal_8, currVal_9); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = _v.context.$implicit.fullname; var currVal_1 = ((_v.context.$implicit.conversationid && (_v.context.$implicit.conversationid == _co.selectedConversationId)) || (_v.context.$implicit.userid && (_v.context.$implicit.userid == _co.selectedUserId))); _ck(_v, 0, 0, currVal_0, currVal_1); }); }
function View_AddonMessagesGroupConversationsPage_2(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 21, "ion-list", [["no-margin", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, list["a" /* List */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], platform_platform["a" /* Platform */], gesture_controller["l" /* GestureController */], dom_controller["a" /* DomController */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 14, "ion-item-divider", [["class", "item item-divider"], ["color", "light"]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](4, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], { color: [0, "color"] }, null), core["_52" /* ɵqud */](335544320, 4, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 5, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 6, { _icons: 1 }), core["_30" /* ɵdid */](8, 16384, null, 0, item_divider["a" /* ItemDivider */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { color: [0, "color"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](10, 0, null, 2, 2, "h2", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](11, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](14, 0, null, 4, 2, "ion-note", [["item-end", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](15, 16384, null, 0, note["a" /* Note */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](16, null, ["", ""])), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonMessagesGroupConversationsPage_3)), core["_30" /* ɵdid */](20, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = "light"; _ck(_v, 4, 0, currVal_0); var currVal_1 = "light"; _ck(_v, 8, 0, currVal_1); var currVal_4 = _co.search.results; _ck(_v, 20, 0, currVal_4); }, function (_ck, _v) { var _co = _v.component; var currVal_2 = core["_56" /* ɵunv */](_v, 11, 0, core["_44" /* ɵnov */](_v, 12).transform("core.searchresults")); _ck(_v, 11, 0, currVal_2); var currVal_3 = _co.search.results.length; _ck(_v, 16, 0, currVal_3); }); }
function View_AddonMessagesGroupConversationsPage_8(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "core-icon", [["item-start", ""], ["name", "fa-caret-right"]], null, null, null, icon_ngfactory["b" /* View_CoreIconComponent_0 */], icon_ngfactory["a" /* RenderType_CoreIconComponent */])), core["_30" /* ɵdid */](1, 245760, null, 0, icon["a" /* CoreIconComponent */], [core["t" /* ElementRef */]], { name: [0, "name"] }, null)], function (_ck, _v) { var currVal_0 = "fa-caret-right"; _ck(_v, 1, 0, currVal_0); }, null); }
function View_AddonMessagesGroupConversationsPage_9(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "core-icon", [["item-start", ""], ["name", "fa-caret-down"]], null, null, null, icon_ngfactory["b" /* View_CoreIconComponent_0 */], icon_ngfactory["a" /* RenderType_CoreIconComponent */])), core["_30" /* ɵdid */](1, 245760, null, 0, icon["a" /* CoreIconComponent */], [core["t" /* ElementRef */]], { name: [0, "name"] }, null)], function (_ck, _v) { var currVal_0 = "fa-caret-down"; _ck(_v, 1, 0, currVal_0); }, null); }
function View_AddonMessagesGroupConversationsPage_7(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 14, "ion-item-divider", [["class", "core-expandable item item-divider"], ["color", "light"], ["text-wrap", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.toggle(_co.favourites) !== false);
        ad = (pd_0 && ad);
    } return ad; }, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], { color: [0, "color"] }, null), core["_52" /* ɵqud */](335544320, 10, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 11, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 12, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_divider["a" /* ItemDivider */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { color: [0, "color"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonMessagesGroupConversationsPage_8)), core["_30" /* ɵdid */](8, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonMessagesGroupConversationsPage_9)), core["_30" /* ɵdid */](11, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](12, 2, ["\n                    ", " (", ")\n                    "])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = "light"; _ck(_v, 1, 0, currVal_0); var currVal_1 = "light"; _ck(_v, 5, 0, currVal_1); var currVal_2 = !_co.favourites.expanded; _ck(_v, 8, 0, currVal_2); var currVal_3 = _co.favourites.expanded; _ck(_v, 11, 0, currVal_3); }, function (_ck, _v) { var _co = _v.component; var currVal_4 = core["_56" /* ɵunv */](_v, 12, 0, core["_44" /* ɵnov */](_v, 13).transform("core.favourites")); var currVal_5 = _co.favourites.count; _ck(_v, 12, 0, currVal_4, currVal_5); }); }
function View_AddonMessagesGroupConversationsPage_11(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 0, null, null, null, null, null, null, null))], null, null); }
function View_AddonMessagesGroupConversationsPage_12(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 10, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 13, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 14, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 15, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 2, 2, "p", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](8, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "]))], null, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 8, 0, core["_44" /* ɵnov */](_v, 9).transform("addon.messages.nofavourites")); _ck(_v, 8, 0, currVal_0); }); }
function View_AddonMessagesGroupConversationsPage_10(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 12, "div", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 2, null, View_AddonMessagesGroupConversationsPage_11)), core["_30" /* ɵdid */](3, 540672, null, 0, common["r" /* NgTemplateOutlet */], [core["_11" /* ViewContainerRef */]], { ngTemplateOutletContext: [0, "ngTemplateOutletContext"], ngTemplateOutlet: [1, "ngTemplateOutlet"] }, null), core["_48" /* ɵpod */](4, { conversations: 0 }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, null, 1, "core-infinite-loading", [], null, [[null, "action"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("action" === en)) {
        var pd_0 = (_co.loadMoreConversations(_co.favourites, $event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, infinite_loading_ngfactory["b" /* View_CoreInfiniteLoadingComponent_0 */], infinite_loading_ngfactory["a" /* RenderType_CoreInfiniteLoadingComponent */])), core["_30" /* ɵdid */](8, 49152, null, 0, infinite_loading["a" /* CoreInfiniteLoadingComponent */], [], { enabled: [0, "enabled"], error: [1, "error"] }, { action: "action" }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonMessagesGroupConversationsPage_12)), core["_30" /* ɵdid */](11, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _ck(_v, 4, 0, _co.favourites.conversations); var currVal_1 = core["_44" /* ɵnov */](_v.parent.parent, 79); _ck(_v, 3, 0, currVal_0, currVal_1); var currVal_2 = _co.favourites.canLoadMore; var currVal_3 = _co.favourites.loadMoreError; _ck(_v, 8, 0, currVal_2, currVal_3); var currVal_4 = (_co.favourites.conversations.length == 0); _ck(_v, 11, 0, currVal_4); }, null); }
function View_AddonMessagesGroupConversationsPage_14(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "core-icon", [["item-start", ""], ["name", "fa-caret-right"]], null, null, null, icon_ngfactory["b" /* View_CoreIconComponent_0 */], icon_ngfactory["a" /* RenderType_CoreIconComponent */])), core["_30" /* ɵdid */](1, 245760, null, 0, icon["a" /* CoreIconComponent */], [core["t" /* ElementRef */]], { name: [0, "name"] }, null)], function (_ck, _v) { var currVal_0 = "fa-caret-right"; _ck(_v, 1, 0, currVal_0); }, null); }
function View_AddonMessagesGroupConversationsPage_15(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "core-icon", [["item-start", ""], ["name", "fa-caret-down"]], null, null, null, icon_ngfactory["b" /* View_CoreIconComponent_0 */], icon_ngfactory["a" /* RenderType_CoreIconComponent */])), core["_30" /* ɵdid */](1, 245760, null, 0, icon["a" /* CoreIconComponent */], [core["t" /* ElementRef */]], { name: [0, "name"] }, null)], function (_ck, _v) { var currVal_0 = "fa-caret-down"; _ck(_v, 1, 0, currVal_0); }, null); }
function View_AddonMessagesGroupConversationsPage_13(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 14, "ion-item-divider", [["class", "core-expandable item item-divider"], ["color", "light"], ["text-wrap", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.toggle(_co.group) !== false);
        ad = (pd_0 && ad);
    } return ad; }, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], { color: [0, "color"] }, null), core["_52" /* ɵqud */](335544320, 16, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 17, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 18, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_divider["a" /* ItemDivider */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { color: [0, "color"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonMessagesGroupConversationsPage_14)), core["_30" /* ɵdid */](8, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonMessagesGroupConversationsPage_15)), core["_30" /* ɵdid */](11, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](12, 2, ["\n                    ", " (", ")\n                    "])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = "light"; _ck(_v, 1, 0, currVal_0); var currVal_1 = "light"; _ck(_v, 5, 0, currVal_1); var currVal_2 = !_co.group.expanded; _ck(_v, 8, 0, currVal_2); var currVal_3 = _co.group.expanded; _ck(_v, 11, 0, currVal_3); }, function (_ck, _v) { var _co = _v.component; var currVal_4 = core["_56" /* ɵunv */](_v, 12, 0, core["_44" /* ɵnov */](_v, 13).transform("addon.messages.groupmessages")); var currVal_5 = _co.group.count; _ck(_v, 12, 0, currVal_4, currVal_5); }); }
function View_AddonMessagesGroupConversationsPage_17(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 0, null, null, null, null, null, null, null))], null, null); }
function View_AddonMessagesGroupConversationsPage_18(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 10, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 19, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 20, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 21, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 2, 2, "p", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](8, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "]))], null, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 8, 0, core["_44" /* ɵnov */](_v, 9).transform("addon.messages.nogroupmessages")); _ck(_v, 8, 0, currVal_0); }); }
function View_AddonMessagesGroupConversationsPage_16(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 12, "div", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 2, null, View_AddonMessagesGroupConversationsPage_17)), core["_30" /* ɵdid */](3, 540672, null, 0, common["r" /* NgTemplateOutlet */], [core["_11" /* ViewContainerRef */]], { ngTemplateOutletContext: [0, "ngTemplateOutletContext"], ngTemplateOutlet: [1, "ngTemplateOutlet"] }, null), core["_48" /* ɵpod */](4, { conversations: 0 }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, null, 1, "core-infinite-loading", [], null, [[null, "action"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("action" === en)) {
        var pd_0 = (_co.loadMoreConversations(_co.group, $event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, infinite_loading_ngfactory["b" /* View_CoreInfiniteLoadingComponent_0 */], infinite_loading_ngfactory["a" /* RenderType_CoreInfiniteLoadingComponent */])), core["_30" /* ɵdid */](8, 49152, null, 0, infinite_loading["a" /* CoreInfiniteLoadingComponent */], [], { enabled: [0, "enabled"], error: [1, "error"] }, { action: "action" }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonMessagesGroupConversationsPage_18)), core["_30" /* ɵdid */](11, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _ck(_v, 4, 0, _co.group.conversations); var currVal_1 = core["_44" /* ɵnov */](_v.parent.parent, 79); _ck(_v, 3, 0, currVal_0, currVal_1); var currVal_2 = _co.group.canLoadMore; var currVal_3 = _co.group.loadMoreError; _ck(_v, 8, 0, currVal_2, currVal_3); var currVal_4 = (_co.group.conversations.length == 0); _ck(_v, 11, 0, currVal_4); }, null); }
function View_AddonMessagesGroupConversationsPage_20(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "core-icon", [["item-start", ""], ["name", "fa-caret-right"]], null, null, null, icon_ngfactory["b" /* View_CoreIconComponent_0 */], icon_ngfactory["a" /* RenderType_CoreIconComponent */])), core["_30" /* ɵdid */](1, 245760, null, 0, icon["a" /* CoreIconComponent */], [core["t" /* ElementRef */]], { name: [0, "name"] }, null)], function (_ck, _v) { var currVal_0 = "fa-caret-right"; _ck(_v, 1, 0, currVal_0); }, null); }
function View_AddonMessagesGroupConversationsPage_21(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "core-icon", [["item-start", ""], ["name", "fa-caret-down"]], null, null, null, icon_ngfactory["b" /* View_CoreIconComponent_0 */], icon_ngfactory["a" /* RenderType_CoreIconComponent */])), core["_30" /* ɵdid */](1, 245760, null, 0, icon["a" /* CoreIconComponent */], [core["t" /* ElementRef */]], { name: [0, "name"] }, null)], function (_ck, _v) { var currVal_0 = "fa-caret-down"; _ck(_v, 1, 0, currVal_0); }, null); }
function View_AddonMessagesGroupConversationsPage_19(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 14, "ion-item-divider", [["class", "core-expandable item item-divider"], ["color", "light"], ["text-wrap", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.toggle(_co.individual) !== false);
        ad = (pd_0 && ad);
    } return ad; }, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], { color: [0, "color"] }, null), core["_52" /* ɵqud */](335544320, 22, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 23, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 24, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_divider["a" /* ItemDivider */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { color: [0, "color"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonMessagesGroupConversationsPage_20)), core["_30" /* ɵdid */](8, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonMessagesGroupConversationsPage_21)), core["_30" /* ɵdid */](11, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](12, 2, ["\n                    ", " (", ")\n                    "])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = "light"; _ck(_v, 1, 0, currVal_0); var currVal_1 = "light"; _ck(_v, 5, 0, currVal_1); var currVal_2 = !_co.individual.expanded; _ck(_v, 8, 0, currVal_2); var currVal_3 = _co.individual.expanded; _ck(_v, 11, 0, currVal_3); }, function (_ck, _v) { var _co = _v.component; var currVal_4 = core["_56" /* ɵunv */](_v, 12, 0, core["_44" /* ɵnov */](_v, 13).transform("addon.messages.messages")); var currVal_5 = _co.individual.count; _ck(_v, 12, 0, currVal_4, currVal_5); }); }
function View_AddonMessagesGroupConversationsPage_23(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 0, null, null, null, null, null, null, null))], null, null); }
function View_AddonMessagesGroupConversationsPage_24(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 10, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 25, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 26, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 27, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 2, 2, "p", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](8, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "]))], null, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 8, 0, core["_44" /* ɵnov */](_v, 9).transform("addon.messages.nomessages")); _ck(_v, 8, 0, currVal_0); }); }
function View_AddonMessagesGroupConversationsPage_22(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 12, "div", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 2, null, View_AddonMessagesGroupConversationsPage_23)), core["_30" /* ɵdid */](3, 540672, null, 0, common["r" /* NgTemplateOutlet */], [core["_11" /* ViewContainerRef */]], { ngTemplateOutletContext: [0, "ngTemplateOutletContext"], ngTemplateOutlet: [1, "ngTemplateOutlet"] }, null), core["_48" /* ɵpod */](4, { conversations: 0 }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, null, 1, "core-infinite-loading", [], null, [[null, "action"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("action" === en)) {
        var pd_0 = (_co.loadMoreConversations(_co.individual, $event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, infinite_loading_ngfactory["b" /* View_CoreInfiniteLoadingComponent_0 */], infinite_loading_ngfactory["a" /* RenderType_CoreInfiniteLoadingComponent */])), core["_30" /* ɵdid */](8, 49152, null, 0, infinite_loading["a" /* CoreInfiniteLoadingComponent */], [], { enabled: [0, "enabled"], error: [1, "error"] }, { action: "action" }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonMessagesGroupConversationsPage_24)), core["_30" /* ɵdid */](11, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _ck(_v, 4, 0, _co.individual.conversations); var currVal_1 = core["_44" /* ɵnov */](_v.parent.parent, 79); _ck(_v, 3, 0, currVal_0, currVal_1); var currVal_2 = _co.individual.canLoadMore; var currVal_3 = _co.individual.loadMoreError; _ck(_v, 8, 0, currVal_2, currVal_3); var currVal_4 = (_co.individual.conversations.length == 0); _ck(_v, 11, 0, currVal_4); }, null); }
function View_AddonMessagesGroupConversationsPage_6(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 22, "ion-list", [], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, list["a" /* List */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], platform_platform["a" /* Platform */], gesture_controller["l" /* GestureController */], dom_controller["a" /* DomController */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonMessagesGroupConversationsPage_7)), core["_30" /* ɵdid */](5, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonMessagesGroupConversationsPage_10)), core["_30" /* ɵdid */](8, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n                "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonMessagesGroupConversationsPage_13)), core["_30" /* ɵdid */](12, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonMessagesGroupConversationsPage_16)), core["_30" /* ɵdid */](15, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonMessagesGroupConversationsPage_19)), core["_30" /* ɵdid */](18, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonMessagesGroupConversationsPage_22)), core["_30" /* ɵdid */](21, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.favourites.conversations; _ck(_v, 5, 0, currVal_0); var currVal_1 = (_co.favourites.conversations && _co.favourites.expanded); _ck(_v, 8, 0, currVal_1); var currVal_2 = _co.group.conversations; _ck(_v, 12, 0, currVal_2); var currVal_3 = (_co.group.conversations && _co.group.expanded); _ck(_v, 15, 0, currVal_3); var currVal_4 = _co.individual.conversations; _ck(_v, 18, 0, currVal_4); var currVal_5 = (_co.individual.conversations && _co.individual.expanded); _ck(_v, 21, 0, currVal_5); }, null); }
function View_AddonMessagesGroupConversationsPage_25(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "core-empty-box", [["icon", "search"]], null, null, null, empty_box_ngfactory["b" /* View_CoreEmptyBoxComponent_0 */], empty_box_ngfactory["a" /* RenderType_CoreEmptyBoxComponent */])), core["_30" /* ɵdid */](1, 49152, null, 0, empty_box["a" /* CoreEmptyBoxComponent */], [], { message: [0, "message"], icon: [1, "icon"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 1, 0, core["_44" /* ɵnov */](_v, 2).transform("core.noresults")); var currVal_1 = "search"; _ck(_v, 1, 0, currVal_0, currVal_1); }, null); }
function View_AddonMessagesGroupConversationsPage_28(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 5, "ion-avatar", [["item-start", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, avatar["a" /* Avatar */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 1, "img", [["core-external-content", ""]], [[8, "src", 4], [8, "alt", 0]], null, null, null, null)), core["_30" /* ɵdid */](4, 4210688, null, 0, external_content["a" /* CoreExternalContentDirective */], [core["t" /* ElementRef */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], platform_platform["a" /* Platform */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], app["a" /* CoreAppProvider */], utils_utils["a" /* CoreUtilsProvider */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "]))], null, function (_ck, _v) { var currVal_0 = _v.parent.context.$implicit.imageurl; var currVal_1 = _v.parent.context.$implicit.name; _ck(_v, 3, 0, currVal_0, currVal_1); }); }
function View_AddonMessagesGroupConversationsPage_29(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "ion-avatar", [["core-user-avatar", ""], ["item-start", ""]], null, null, null, user_avatar_ngfactory["b" /* View_CoreUserAvatarComponent_0 */], user_avatar_ngfactory["a" /* RenderType_CoreUserAvatarComponent */])), core["_30" /* ɵdid */](1, 638976, null, 0, user_avatar["a" /* CoreUserAvatarComponent */], [nav_controller["a" /* NavController */], sites["a" /* CoreSitesProvider */], utils_utils["a" /* CoreUtilsProvider */]], { user: [0, "user"], linkProfile: [1, "linkProfile"], checkOnline: [2, "checkOnline"] }, null), core["_30" /* ɵdid */](2, 16384, null, 0, avatar["a" /* Avatar */], [], null, null)], function (_ck, _v) { var currVal_0 = _v.parent.context.$implicit.otherUser; var currVal_1 = false; var currVal_2 = _v.parent.context.$implicit.showonlinestatus; _ck(_v, 1, 0, currVal_0, currVal_1, currVal_2); }, null); }
function View_AddonMessagesGroupConversationsPage_30(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "core-icon", [["name", "fa-ban"]], [[1, "aria-label", 0]], null, null, icon_ngfactory["b" /* View_CoreIconComponent_0 */], icon_ngfactory["a" /* RenderType_CoreIconComponent */])), core["_30" /* ɵdid */](1, 245760, null, 0, icon["a" /* CoreIconComponent */], [core["t" /* ElementRef */]], { name: [0, "name"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], function (_ck, _v) { var currVal_1 = "fa-ban"; _ck(_v, 1, 0, currVal_1); }, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 0, 0, core["_44" /* ɵnov */](_v, 2).transform("addon.messages.contactblocked")); _ck(_v, 0, 0, currVal_0); }); }
function View_AddonMessagesGroupConversationsPage_32(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "ion-badge", [], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, badge["a" /* Badge */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](2, null, ["", ""]))], null, function (_ck, _v) { var currVal_0 = _v.parent.parent.context.$implicit.unreadcount; _ck(_v, 2, 0, currVal_0); }); }
function View_AddonMessagesGroupConversationsPage_33(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "span", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](1, null, ["", ""])), core["_49" /* ɵppd */](2, 1)], null, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 1, 0, _ck(_v, 2, 0, core["_44" /* ɵnov */](_v.parent.parent.parent.parent, 0), _v.parent.parent.context.$implicit.lastmessagedate)); _ck(_v, 1, 0, currVal_0); }); }
function View_AddonMessagesGroupConversationsPage_31(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 8, "ion-note", [], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, note["a" /* Note */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonMessagesGroupConversationsPage_32)), core["_30" /* ɵdid */](4, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonMessagesGroupConversationsPage_33)), core["_30" /* ɵdid */](7, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "]))], function (_ck, _v) { var currVal_0 = (_v.parent.context.$implicit.unreadcount > 0); _ck(_v, 4, 0, currVal_0); var currVal_1 = (_v.parent.context.$implicit.lastmessagedate > 0); _ck(_v, 7, 0, currVal_1); }, null); }
function View_AddonMessagesGroupConversationsPage_34(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "core-format-text", [], null, null, null, null, null)), core["_30" /* ɵdid */](1, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform_platform["a" /* Platform */], utils_utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], app["a" /* CoreAppProvider */], helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */]], { text: [0, "text"] }, null)], function (_ck, _v) { var currVal_0 = _v.parent.context.$implicit.subname; _ck(_v, 1, 0, currVal_0); }, null); }
function View_AddonMessagesGroupConversationsPage_35(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "span", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](1, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], null, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 1, 0, core["_44" /* ɵnov */](_v, 2).transform("addon.messages.you")); _ck(_v, 1, 0, currVal_0); }); }
function View_AddonMessagesGroupConversationsPage_27(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 42, "a", [["class", "item item-block"], ["detail-none", ""], ["ion-item", ""], ["text-wrap", ""]], [[8, "title", 0], [2, "core-split-item-selected", null], [8, "id", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.gotoConversation(_v.context.$implicit.id, _v.context.$implicit.userid) !== false);
        ad = (pd_0 && ad);
    } return ad; }, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 28, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 29, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 30, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonMessagesGroupConversationsPage_28)), core["_30" /* ɵdid */](9, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n\n        "])), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonMessagesGroupConversationsPage_29)), core["_30" /* ɵdid */](13, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n\n        "])), (_l()(), core["_31" /* ɵeld */](15, 0, null, 2, 13, "h2", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](17, 0, null, null, 7, "p", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ɵeld */](19, 0, null, null, 1, "core-format-text", [], null, null, null, null, null)), core["_30" /* ɵdid */](20, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform_platform["a" /* Platform */], utils_utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], app["a" /* CoreAppProvider */], helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */]], { text: [0, "text"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonMessagesGroupConversationsPage_30)), core["_30" /* ɵdid */](23, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonMessagesGroupConversationsPage_31)), core["_30" /* ɵdid */](27, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n        "])), (_l()(), core["_31" /* ɵeld */](30, 0, null, 2, 2, "p", [], null, null, null, null, null)), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonMessagesGroupConversationsPage_34)), core["_30" /* ɵdid */](32, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n        "])), (_l()(), core["_31" /* ɵeld */](34, 0, null, 2, 7, "p", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonMessagesGroupConversationsPage_35)), core["_30" /* ɵdid */](37, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, [" "])), (_l()(), core["_31" /* ɵeld */](39, 0, null, null, 1, "core-format-text", [["class", "addon-message-last-message"], ["clean", "true"], ["singleLine", "true"]], null, null, null, null, null)), core["_30" /* ɵdid */](40, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform_platform["a" /* Platform */], utils_utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], app["a" /* CoreAppProvider */], helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */]], { text: [0, "text"], clean: [1, "clean"], singleLine: [2, "singleLine"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n    "]))], function (_ck, _v) { var _co = _v.component; var currVal_3 = ((_v.context.$implicit.type != _co.typeIndividual) && _v.context.$implicit.imageurl); _ck(_v, 9, 0, currVal_3); var currVal_4 = (_v.context.$implicit.type == _co.typeIndividual); _ck(_v, 13, 0, currVal_4); var currVal_5 = _v.context.$implicit.name; _ck(_v, 20, 0, currVal_5); var currVal_6 = _v.context.$implicit.isblocked; _ck(_v, 23, 0, currVal_6); var currVal_7 = ((_v.context.$implicit.lastmessagedate > 0) || _v.context.$implicit.unreadcount); _ck(_v, 27, 0, currVal_7); var currVal_8 = _v.context.$implicit.subname; _ck(_v, 32, 0, currVal_8); var currVal_9 = _v.context.$implicit.sentfromcurrentuser; _ck(_v, 37, 0, currVal_9); var currVal_10 = _v.context.$implicit.lastmessage; var currVal_11 = "true"; var currVal_12 = "true"; _ck(_v, 40, 0, currVal_10, currVal_11, currVal_12); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = _v.context.$implicit.name; var currVal_1 = ((_v.context.$implicit.id && (_v.context.$implicit.id == _co.selectedConversationId)) || (_v.context.$implicit.userid && (_v.context.$implicit.userid == _co.selectedUserId))); var currVal_2 = core["_34" /* ɵinlineInterpolate */](1, "addon-message-conversation-", (_v.context.$implicit.id ? _v.context.$implicit.id : ("user-" + _v.context.$implicit.userid)), ""); _ck(_v, 0, 0, currVal_0, currVal_1, currVal_2); }); }
function View_AddonMessagesGroupConversationsPage_26(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonMessagesGroupConversationsPage_27)), core["_30" /* ɵdid */](2, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var currVal_0 = _v.context.conversations; _ck(_v, 2, 0, currVal_0); }, null); }
function View_AddonMessagesGroupConversationsPage_0(_l) { return core["_57" /* ɵvid */](0, [core["_47" /* ɵpid */](0, date_day_or_time["a" /* CoreDateDayOrTimePipe */], [logger["a" /* CoreLoggerProvider */], translate_service["a" /* TranslateService */]]), core["_52" /* ɵqud */](402653184, 1, { splitviewCtrl: 0 }), core["_52" /* ɵqud */](402653184, 2, { content: 0 }), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 38, "ion-header", [], null, null, null, null, null)), core["_30" /* ɵdid */](4, 16384, null, 0, toolbar_header["a" /* Header */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, view_controller["a" /* ViewController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_31" /* ɵeld */](6, 0, null, null, 34, "ion-navbar", [["class", "toolbar"], ["core-back-button", ""]], [[8, "hidden", 0], [2, "statusbar-padding", null]], null, null, navbar_ngfactory["b" /* View_Navbar_0 */], navbar_ngfactory["a" /* RenderType_Navbar */])), core["_30" /* ɵdid */](7, 49152, null, 0, navbar["a" /* Navbar */], [app_app["a" /* App */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_30" /* ɵdid */](8, 212992, null, 0, back_button["a" /* CoreBackButtonDirective */], [navbar["a" /* Navbar */], platform_platform["a" /* Platform */], translate_service["a" /* TranslateService */], events["a" /* CoreEventsProvider */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n        "])), (_l()(), core["_31" /* ɵeld */](10, 0, null, 3, 3, "ion-title", [], null, null, null, toolbar_title_ngfactory["b" /* View_ToolbarTitle_0 */], toolbar_title_ngfactory["a" /* RenderType_ToolbarTitle */])), core["_30" /* ɵdid */](11, 49152, null, 0, toolbar_title["a" /* ToolbarTitle */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), (_l()(), core["_55" /* ɵted */](12, 0, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n        "])), (_l()(), core["_31" /* ɵeld */](15, 0, null, 2, 24, "ion-buttons", [["end", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](16, 16384, null, 1, toolbar_item["a" /* ToolbarItem */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), core["_52" /* ɵqud */](603979776, 3, { _buttons: 1 }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](19, 0, null, null, 7, "button", [["icon-only", ""], ["ion-button", ""]], [[1, "aria-label", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.gotoContacts($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](20, 1097728, [[3, 4]], 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                "])), (_l()(), core["_31" /* ɵeld */](23, 0, null, 0, 1, "ion-icon", [["name", "person"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](24, 147456, null, 0, icon_icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, [" "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](28, 0, null, null, 6, "button", [["icon-only", ""], ["ion-button", ""]], [[1, "aria-label", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.gotoSettings($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](29, 1097728, [[3, 4]], 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                "])), (_l()(), core["_31" /* ɵeld */](32, 0, null, 0, 1, "ion-icon", [["name", "cog"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](33, 147456, null, 0, icon_icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](37, 0, null, null, 1, "core-context-menu", [], null, null, null, context_menu_ngfactory["b" /* View_CoreContextMenuComponent_0 */], context_menu_ngfactory["a" /* RenderType_CoreContextMenuComponent */])), core["_30" /* ɵdid */](38, 245760, null, 0, context_menu["a" /* CoreContextMenuComponent */], [translate_service["a" /* TranslateService */], popover_controller["a" /* PopoverController */], core["t" /* ElementRef */], dom["a" /* CoreDomUtilsProvider */], [2, tab["a" /* CoreTabComponent */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_31" /* ɵeld */](43, 0, null, null, 33, "core-split-view", [], null, null, null, split_view_ngfactory["b" /* View_CoreSplitViewComponent_0 */], split_view_ngfactory["a" /* RenderType_CoreSplitViewComponent */])), core["_30" /* ɵdid */](44, 245760, [[1, 4]], 0, split_view["a" /* CoreSplitViewComponent */], [[2, nav_controller["a" /* NavController */]], core["t" /* ElementRef */], fileuploader["a" /* CoreFileUploaderProvider */], platform_platform["a" /* Platform */], translate_service["a" /* TranslateService */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n    "])), (_l()(), core["_31" /* ɵeld */](46, 0, null, 0, 29, "ion-content", [["class", "core-expand-max"]], [[2, "statusbar-padding", null], [2, "has-refresher", null]], null, null, content_ngfactory["b" /* View_Content_0 */], content_ngfactory["a" /* RenderType_Content */])), core["_30" /* ɵdid */](47, 4374528, [[2, 4]], 0, content["a" /* Content */], [config["a" /* Config */], platform_platform["a" /* Platform */], dom_controller["a" /* DomController */], core["t" /* ElementRef */], core["V" /* Renderer */], app_app["a" /* App */], keyboard["a" /* Keyboard */], core["M" /* NgZone */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n        "])), (_l()(), core["_31" /* ɵeld */](49, 0, null, 2, 6, "ion-refresher", [], [[2, "refresher-active", null], [4, "top", null]], [[null, "ionRefresh"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("ionRefresh" === en)) {
        var pd_0 = (_co.refreshData($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), core["_30" /* ɵdid */](50, 212992, null, 0, refresher_refresher["a" /* Refresher */], [platform_platform["a" /* Platform */], content["a" /* Content */], core["M" /* NgZone */], gesture_controller["l" /* GestureController */]], { enabled: [0, "enabled"] }, { ionRefresh: "ionRefresh" }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](52, 0, null, null, 2, "ion-refresher-content", [], [[1, "state", 0]], null, null, refresher_content_ngfactory["b" /* View_RefresherContent_0 */], refresher_content_ngfactory["a" /* RenderType_RefresherContent */])), core["_30" /* ɵdid */](53, 114688, null, 0, refresher_content["a" /* RefresherContent */], [refresher_refresher["a" /* Refresher */], config["a" /* Config */]], { pullingText: [0, "pullingText"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 1, 1, null, View_AddonMessagesGroupConversationsPage_1)), core["_30" /* ɵdid */](58, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n\n        "])), (_l()(), core["_31" /* ɵeld */](60, 0, null, 1, 14, "core-loading", [], null, null, null, loading_ngfactory["b" /* View_CoreLoadingComponent_0 */], loading_ngfactory["a" /* RenderType_CoreLoadingComponent */])), core["_30" /* ɵdid */](61, 638976, null, 0, loading["a" /* CoreLoadingComponent */], [translate_service["a" /* TranslateService */], core["t" /* ElementRef */], events["a" /* CoreEventsProvider */], utils_utils["a" /* CoreUtilsProvider */]], { hideUntil: [0, "hideUntil"], message: [1, "message"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n\n            "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonMessagesGroupConversationsPage_2)), core["_30" /* ɵdid */](65, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n\n            "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonMessagesGroupConversationsPage_6)), core["_30" /* ɵdid */](69, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n\n            "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonMessagesGroupConversationsPage_25)), core["_30" /* ɵdid */](73, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_26" /* ɵand */](0, [["conversationsTemplate", 2]], null, 0, null, View_AddonMessagesGroupConversationsPage_26)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; _ck(_v, 8, 0); var currVal_5 = "person"; _ck(_v, 24, 0, currVal_5); var currVal_8 = "cog"; _ck(_v, 33, 0, currVal_8); _ck(_v, 38, 0); _ck(_v, 44, 0); var currVal_13 = _co.loaded; _ck(_v, 50, 0, currVal_13); var currVal_15 = core["_34" /* ɵinlineInterpolate */](1, "", core["_56" /* ɵunv */](_v, 53, 0, core["_44" /* ɵnov */](_v, 54).transform("core.pulltorefresh")), ""); _ck(_v, 53, 0, currVal_15); var currVal_16 = _co.search.enabled; _ck(_v, 58, 0, currVal_16); var currVal_17 = _co.loaded; var currVal_18 = _co.loadingMessage; _ck(_v, 61, 0, currVal_17, currVal_18); var currVal_19 = _co.search.showResults; _ck(_v, 65, 0, currVal_19); var currVal_20 = !_co.search.showResults; _ck(_v, 69, 0, currVal_20); var currVal_21 = ((!_co.search.results || (_co.search.results.length <= 0)) && _co.search.showResults); _ck(_v, 73, 0, currVal_21); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 7)._hidden; var currVal_1 = core["_44" /* ɵnov */](_v, 7)._sbPadding; _ck(_v, 6, 0, currVal_0, currVal_1); var currVal_2 = core["_56" /* ɵunv */](_v, 12, 0, core["_44" /* ɵnov */](_v, 13).transform("addon.messages.messages")); _ck(_v, 12, 0, currVal_2); var currVal_3 = core["_56" /* ɵunv */](_v, 19, 0, core["_44" /* ɵnov */](_v, 21).transform("addon.messages.contacts")); _ck(_v, 19, 0, currVal_3); var currVal_4 = core["_44" /* ɵnov */](_v, 24)._hidden; _ck(_v, 23, 0, currVal_4); var currVal_6 = core["_56" /* ɵunv */](_v, 28, 0, core["_44" /* ɵnov */](_v, 30).transform("addon.messages.messagepreferences")); _ck(_v, 28, 0, currVal_6); var currVal_7 = core["_44" /* ɵnov */](_v, 33)._hidden; _ck(_v, 32, 0, currVal_7); var currVal_9 = core["_44" /* ɵnov */](_v, 47).statusbarPadding; var currVal_10 = core["_44" /* ɵnov */](_v, 47)._hasRefresher; _ck(_v, 46, 0, currVal_9, currVal_10); var currVal_11 = (core["_44" /* ɵnov */](_v, 50).state !== "inactive"); var currVal_12 = core["_44" /* ɵnov */](_v, 50)._top; _ck(_v, 49, 0, currVal_11, currVal_12); var currVal_14 = core["_44" /* ɵnov */](_v, 53).r.state; _ck(_v, 52, 0, currVal_14); }); }
function View_AddonMessagesGroupConversationsPage_Host_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "page-addon-messages-group-conversations", [], null, null, null, View_AddonMessagesGroupConversationsPage_0, RenderType_AddonMessagesGroupConversationsPage)), core["_30" /* ɵdid */](1, 245760, null, 0, group_conversations_AddonMessagesGroupConversationsPage, [events["a" /* CoreEventsProvider */], sites["a" /* CoreSitesProvider */], translate_service["a" /* TranslateService */], providers_messages["a" /* AddonMessagesProvider */], dom["a" /* CoreDomUtilsProvider */], nav_params["a" /* NavParams */], app["a" /* CoreAppProvider */], platform_platform["a" /* Platform */], utils_utils["a" /* CoreUtilsProvider */], delegate["a" /* AddonPushNotificationsDelegate */], messages_offline["a" /* AddonMessagesOfflineProvider */], providers_user["a" /* CoreUserProvider */]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var AddonMessagesGroupConversationsPageNgFactory = core["_27" /* ɵccf */]("page-addon-messages-group-conversations", group_conversations_AddonMessagesGroupConversationsPage, View_AddonMessagesGroupConversationsPage_Host_0, {}, {}, []);

//# sourceMappingURL=group-conversations.ngfactory.js.map
// EXTERNAL MODULE: ./node_modules/@angular/forms/esm5/forms.js
var esm5_forms = __webpack_require__(22);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.loader.js
var translate_loader = __webpack_require__(331);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.compiler.js
var translate_compiler = __webpack_require__(332);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.parser.js
var translate_parser = __webpack_require__(334);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/missing-translation-handler.js
var missing_translation_handler = __webpack_require__(333);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.store.js
var translate_store = __webpack_require__(433);

// EXTERNAL MODULE: ./node_modules/ionic-angular/module.js
var ionic_angular_module = __webpack_require__(661);

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
//# sourceMappingURL=106.js.map