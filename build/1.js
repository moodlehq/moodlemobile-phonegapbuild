webpackJsonp([1],{

/***/ 1845:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddonMessagesSearchPageModule", function() { return AddonMessagesSearchPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__search__ = __webpack_require__(1973);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_components_module__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__directives_directives_module__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pipes_pipes_module__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_components_module__ = __webpack_require__(1949);
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








var AddonMessagesSearchPageModule = /** @class */ (function () {
    function AddonMessagesSearchPageModule() {
    }
    AddonMessagesSearchPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__search__["a" /* AddonMessagesSearchPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_4__components_components_module__["a" /* CoreComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_5__directives_directives_module__["a" /* CoreDirectivesModule */],
                __WEBPACK_IMPORTED_MODULE_6__pipes_pipes_module__["a" /* CorePipesModule */],
                __WEBPACK_IMPORTED_MODULE_7__components_components_module__["a" /* AddonMessagesComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__search__["a" /* AddonMessagesSearchPage */]),
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */].forChild()
            ],
        })
    ], AddonMessagesSearchPageModule);
    return AddonMessagesSearchPageModule;
}());

//# sourceMappingURL=search.module.js.map

/***/ }),

/***/ 1949:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddonMessagesComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_components_module__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__directives_directives_module__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pipes_pipes_module__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_discussions_discussions__ = __webpack_require__(1950);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_confirmed_contacts_confirmed_contacts__ = __webpack_require__(1951);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_contact_requests_contact_requests__ = __webpack_require__(1952);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_contacts_contacts__ = __webpack_require__(1953);
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











var AddonMessagesComponentsModule = /** @class */ (function () {
    function AddonMessagesComponentsModule() {
    }
    AddonMessagesComponentsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__components_discussions_discussions__["a" /* AddonMessagesDiscussionsComponent */],
                __WEBPACK_IMPORTED_MODULE_8__components_confirmed_contacts_confirmed_contacts__["a" /* AddonMessagesConfirmedContactsComponent */],
                __WEBPACK_IMPORTED_MODULE_9__components_contact_requests_contact_requests__["a" /* AddonMessagesContactRequestsComponent */],
                __WEBPACK_IMPORTED_MODULE_10__components_contacts_contacts__["a" /* AddonMessagesContactsComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* IonicModule */],
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */].forChild(),
                __WEBPACK_IMPORTED_MODULE_4__components_components_module__["a" /* CoreComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_5__directives_directives_module__["a" /* CoreDirectivesModule */],
                __WEBPACK_IMPORTED_MODULE_6__pipes_pipes_module__["a" /* CorePipesModule */]
            ],
            providers: [],
            exports: [
                __WEBPACK_IMPORTED_MODULE_7__components_discussions_discussions__["a" /* AddonMessagesDiscussionsComponent */],
                __WEBPACK_IMPORTED_MODULE_8__components_confirmed_contacts_confirmed_contacts__["a" /* AddonMessagesConfirmedContactsComponent */],
                __WEBPACK_IMPORTED_MODULE_9__components_contact_requests_contact_requests__["a" /* AddonMessagesContactRequestsComponent */],
                __WEBPACK_IMPORTED_MODULE_10__components_contacts_contacts__["a" /* AddonMessagesContactsComponent */]
            ]
        })
    ], AddonMessagesComponentsModule);
    return AddonMessagesComponentsModule;
}());

//# sourceMappingURL=components.module.js.map

/***/ }),

/***/ 1950:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddonMessagesDiscussionsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_events__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_sites__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_messages__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_utils_dom__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_utils_utils__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_app__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__addon_pushnotifications_providers_delegate__ = __webpack_require__(152);
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
 * Component that displays the list of discussions.
 */
var AddonMessagesDiscussionsComponent = /** @class */ (function () {
    function AddonMessagesDiscussionsComponent(eventsProvider, sitesProvider, translate, messagesProvider, domUtils, navParams, appProvider, platform, utils, pushNotificationsDelegate) {
        var _this = this;
        this.eventsProvider = eventsProvider;
        this.messagesProvider = messagesProvider;
        this.domUtils = domUtils;
        this.appProvider = appProvider;
        this.utils = utils;
        this.loaded = false;
        this.search = {
            enabled: false,
            showResults: false,
            results: [],
            loading: '',
            text: ''
        };
        this.search.loading = translate.instant('core.searching');
        this.loadingMessages = translate.instant('core.loading');
        this.siteId = sitesProvider.getCurrentSiteId();
        // Update discussions when new message is received.
        this.newMessagesObserver = eventsProvider.on(__WEBPACK_IMPORTED_MODULE_5__providers_messages__["a" /* AddonMessagesProvider */].NEW_MESSAGE_EVENT, function (data) {
            if (data.userId) {
                var discussion = _this.discussions.find(function (disc) {
                    return disc.message.user == data.userId;
                });
                if (typeof discussion == 'undefined') {
                    _this.loaded = false;
                    _this.refreshData().finally(function () {
                        _this.loaded = true;
                    });
                }
                else {
                    // An existing discussion has a new message, update the last message.
                    discussion.message.message = data.message;
                    discussion.message.timecreated = data.timecreated;
                }
            }
        }, this.siteId);
        // Update discussions when a message is read.
        this.readChangedObserver = eventsProvider.on(__WEBPACK_IMPORTED_MODULE_5__providers_messages__["a" /* AddonMessagesProvider */].READ_CHANGED_EVENT, function (data) {
            if (data.userId) {
                var discussion = _this.discussions.find(function (disc) {
                    return disc.message.user == data.userId;
                });
                if (typeof discussion != 'undefined') {
                    // A discussion has been read reset counter.
                    discussion.unread = false;
                    // Conversations changed, invalidate them and refresh unread counts.
                    _this.messagesProvider.invalidateConversations();
                    _this.messagesProvider.refreshUnreadConversationCounts();
                }
            }
        }, this.siteId);
        // Refresh the view when the app is resumed.
        this.appResumeSubscription = platform.resume.subscribe(function () {
            if (!_this.loaded) {
                return;
            }
            _this.loaded = false;
            _this.refreshData();
        });
        this.discussionUserId = navParams.get('discussionUserId') || false;
        // If a message push notification is received, refresh the view.
        this.pushObserver = pushNotificationsDelegate.on('receive').subscribe(function (notification) {
            // New message received. If it's from current site, refresh the data.
            if (utils.isFalseOrZero(notification.notif) && notification.site == _this.siteId) {
                // Don't refresh unread counts, it's refreshed from the main menu handler in this case.
                _this.refreshData(null, false);
            }
        });
    }
    /**
     * Component loaded.
     */
    AddonMessagesDiscussionsComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.discussionUserId) {
            // There is a discussion to load, open the discussion in a new state.
            this.gotoDiscussion(this.discussionUserId);
        }
        this.fetchData().then(function () {
            if (!_this.discussionUserId && _this.discussions.length > 0) {
                // Take first and load it.
                _this.gotoDiscussion(_this.discussions[0].message.user, undefined, true);
            }
        });
    };
    /**
     * Refresh the data.
     *
     * @param {any} [refresher] Refresher.
     * @param {boolean} [refreshUnreadCounts=true] Whteher to refresh unread counts.
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonMessagesDiscussionsComponent.prototype.refreshData = function (refresher, refreshUnreadCounts) {
        var _this = this;
        if (refreshUnreadCounts === void 0) { refreshUnreadCounts = true; }
        var promises = [];
        promises.push(this.messagesProvider.invalidateDiscussionsCache());
        if (refreshUnreadCounts) {
            promises.push(this.messagesProvider.invalidateUnreadConversationCounts());
        }
        return this.utils.allPromises(promises).finally(function () {
            return _this.fetchData().finally(function () {
                if (refresher) {
                    refresher.complete();
                }
            });
        });
    };
    /**
     * Fetch discussions.
     *
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonMessagesDiscussionsComponent.prototype.fetchData = function () {
        var _this = this;
        this.loadingMessage = this.loadingMessages;
        this.search.enabled = this.messagesProvider.isSearchMessagesEnabled();
        var promises = [];
        promises.push(this.messagesProvider.getDiscussions().then(function (discussions) {
            // Convert to an array for sorting.
            var discussionsSorted = [];
            for (var userId in discussions) {
                discussions[userId].unread = !!discussions[userId].unread;
                discussionsSorted.push(discussions[userId]);
            }
            _this.discussions = discussionsSorted.sort(function (a, b) {
                return b.message.timecreated - a.message.timecreated;
            });
        }));
        promises.push(this.messagesProvider.getUnreadConversationCounts());
        return Promise.all(promises).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'addon.messages.errorwhileretrievingdiscussions', true);
        }).finally(function () {
            _this.loaded = true;
        });
    };
    /**
     * Clear search and show discussions again.
     */
    AddonMessagesDiscussionsComponent.prototype.clearSearch = function () {
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
    AddonMessagesDiscussionsComponent.prototype.searchMessage = function (query) {
        var _this = this;
        this.appProvider.closeKeyboard();
        this.loaded = false;
        this.loadingMessage = this.search.loading;
        return this.messagesProvider.searchMessages(query).then(function (searchResults) {
            _this.search.showResults = true;
            _this.search.results = searchResults.messages;
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'addon.messages.errorwhileretrievingmessages', true);
        }).finally(function () {
            _this.loaded = true;
        });
    };
    /**
     * Navigate to a particular discussion.
     *
     * @param {number} discussionUserId Discussion Id to load.
     * @param {number} [messageId]      Message to scroll after loading the discussion. Used when searching.
     * @param {boolean} [onlyWithSplitView=false]  Only go to Discussion if split view is on.
     */
    AddonMessagesDiscussionsComponent.prototype.gotoDiscussion = function (discussionUserId, messageId, onlyWithSplitView) {
        if (onlyWithSplitView === void 0) { onlyWithSplitView = false; }
        this.discussionUserId = discussionUserId;
        var params = {
            discussion: discussionUserId,
            onlyWithSplitView: onlyWithSplitView
        };
        if (messageId) {
            params['message'] = messageId;
        }
        this.eventsProvider.trigger(__WEBPACK_IMPORTED_MODULE_5__providers_messages__["a" /* AddonMessagesProvider */].SPLIT_VIEW_LOAD_EVENT, params, this.siteId);
    };
    /**
     * Component destroyed.
     */
    AddonMessagesDiscussionsComponent.prototype.ngOnDestroy = function () {
        this.newMessagesObserver && this.newMessagesObserver.off();
        this.readChangedObserver && this.readChangedObserver.off();
        this.cronObserver && this.cronObserver.off();
        this.appResumeSubscription && this.appResumeSubscription.unsubscribe();
        this.pushObserver && this.pushObserver.unsubscribe();
    };
    AddonMessagesDiscussionsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'addon-messages-discussions',template:/*ion-inline-start:"/home/travis/build/moodlehq/moodlemobile2/src/addon/messages/components/discussions/addon-messages-discussions.html"*/'<ion-content>\n    <ion-refresher [enabled]="loaded" (ionRefresh)="refreshData($event)">\n        <ion-refresher-content pullingText="{{ \'core.pulltorefresh\' | translate }}"></ion-refresher-content>\n    </ion-refresher>\n\n    <core-search-box *ngIf="search.enabled" (onSubmit)="searchMessage($event)" (onClear)="clearSearch($event)" [placeholder]=" \'addon.messages.message\' | translate" autocorrect="off" spellcheck="false" lengthCheck="2" [disabled]="!loaded"></core-search-box>\n\n    <core-loading [hideUntil]="loaded" [message]="loadingMessage">\n\n        <ion-list *ngIf="search.showResults" no-margin>\n            <ion-item-divider>\n                <h2>{{ \'core.searchresults\' | translate }}</h2>\n                <ion-note item-end>{{ search.results.length }}</ion-note>\n            </ion-item-divider>\n            <a ion-item text-wrap *ngFor="let result of search.results" [title]="result.fullname" (click)="gotoDiscussion(result.userid, result.messageid)" [class.core-split-item-selected]="result.userid == discussionUserId" class="addon-message-discussion">\n                <ion-avatar core-user-avatar [user]="result" item-start [checkOnline]="result.showonlinestatus"></ion-avatar>\n                <h2><core-format-text [text]="result.fullname"></core-format-text></h2>\n                <p><core-format-text clean="true" singleLine="true" [text]="result.lastmessage"></core-format-text></p>\n            </a>\n        </ion-list>\n\n        <ion-list *ngIf="!search.showResults" no-margin>\n            <a ion-item text-wrap *ngFor="let discussion of discussions" [title]="discussion.fullname" (click)="gotoDiscussion(discussion.message.user)" [class.core-split-item-selected]="discussion.message.user == discussionUserId" class="addon-message-discussion">\n                <ion-avatar core-user-avatar [user]="discussion" item-start [checkOnline]="discussion.showonlinestatus"></ion-avatar>\n                <h2>\n                    <core-format-text [text]="discussion.fullname"></core-format-text>\n                </h2>\n                <ion-note *ngIf="discussion.message.timecreated > 0 || discussion.unread">\n                    <span *ngIf="discussion.unread" class="core-primary-circle"></span>\n                    <span *ngIf="discussion.message.timecreated > 0">{{discussion.message.timecreated / 1000 | coreDateDayOrTime}}</span>\n                </ion-note>\n                <p><core-format-text clean="true" singleLine="true" [text]="discussion.message.message"></core-format-text></p>\n            </a>\n        </ion-list>\n\n        <core-empty-box *ngIf="(!discussions || discussions.length <= 0) && !search.showResults" icon="chatbubbles" [message]="\'addon.messages.nomessagesfound\' | translate"></core-empty-box>\n\n        <core-empty-box *ngIf="(!search.results || search.results.length <= 0) && search.showResults" icon="search" [message]="\'core.noresults\' | translate"></core-empty-box>\n    </core-loading>\n</ion-content>\n'/*ion-inline-end:"/home/travis/build/moodlehq/moodlemobile2/src/addon/messages/components/discussions/addon-messages-discussions.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__providers_events__["a" /* CoreEventsProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_sites__["a" /* CoreSitesProvider */], __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_5__providers_messages__["a" /* AddonMessagesProvider */], __WEBPACK_IMPORTED_MODULE_6__providers_utils_dom__["a" /* CoreDomUtilsProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_8__providers_app__["a" /* CoreAppProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* Platform */], __WEBPACK_IMPORTED_MODULE_7__providers_utils_utils__["a" /* CoreUtilsProvider */],
            __WEBPACK_IMPORTED_MODULE_9__addon_pushnotifications_providers_delegate__["a" /* AddonPushNotificationsDelegate */]])
    ], AddonMessagesDiscussionsComponent);
    return AddonMessagesDiscussionsComponent;
}());

//# sourceMappingURL=discussions.js.map

/***/ }),

/***/ 1951:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddonMessagesConfirmedContactsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_events__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_sites__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_messages__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_utils_dom__ = __webpack_require__(8);
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
 * Component that displays the list of confirmed contacts.
 */
var AddonMessagesConfirmedContactsComponent = /** @class */ (function () {
    function AddonMessagesConfirmedContactsComponent(domUtils, eventsProvider, sitesProvider, messagesProvider) {
        var _this = this;
        this.domUtils = domUtils;
        this.messagesProvider = messagesProvider;
        this.onUserSelected = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
        this.loaded = false;
        this.canLoadMore = false;
        this.loadMoreError = false;
        this.contacts = [];
        this.onUserSelected = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
        // Update block status of a user.
        this.memberInfoObserver = eventsProvider.on(__WEBPACK_IMPORTED_MODULE_4__providers_messages__["a" /* AddonMessagesProvider */].MEMBER_INFO_CHANGED_EVENT, function (data) {
            if (data.userBlocked || data.userUnblocked) {
                var user = _this.contacts.find(function (user) { return user.id == data.userId; });
                if (user) {
                    user.isblocked = data.userBlocked;
                }
            }
            else if (data.contactRemoved) {
                var index = _this.contacts.findIndex(function (contact) { return contact.id == data.userId; });
                if (index >= 0) {
                    _this.contacts.splice(index, 1);
                }
            }
            else if (data.contactRequestConfirmed) {
                _this.refreshData();
            }
        }, sitesProvider.getCurrentSiteId());
    }
    /**
     * Component loaded.
     */
    AddonMessagesConfirmedContactsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.fetchData().then(function () {
            if (_this.contacts.length) {
                _this.selectUser(_this.contacts[0].id, true);
            }
        }).finally(function () {
            _this.loaded = true;
        });
        // Workaround for infinite scrolling.
        this.content.resize();
    };
    /**
     * Fetch contacts.
     *
     * @param {boolean} [refresh=false] True if we are refreshing contacts, false if we are loading more.
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonMessagesConfirmedContactsComponent.prototype.fetchData = function (refresh) {
        var _this = this;
        if (refresh === void 0) { refresh = false; }
        this.loadMoreError = false;
        var limitFrom = refresh ? 0 : this.contacts.length;
        var promise;
        if (limitFrom === 0) {
            // Always try to get latest data from server.
            promise = this.messagesProvider.invalidateUserContacts().catch(function () {
                // Shouldn't happen.
            });
        }
        else {
            promise = Promise.resolve();
        }
        return promise.then(function () {
            return _this.messagesProvider.getUserContacts(limitFrom);
        }).then(function (result) {
            _this.contacts = refresh ? result.contacts : _this.contacts.concat(result.contacts);
            _this.canLoadMore = result.canLoadMore;
        }).catch(function (error) {
            _this.loadMoreError = true;
            _this.domUtils.showErrorModalDefault(error, 'addon.messages.errorwhileretrievingcontacts', true);
        });
    };
    /**
     * Refresh contacts.
     *
     * @param {any} [refresher] Refresher.
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonMessagesConfirmedContactsComponent.prototype.refreshData = function (refresher) {
        // No need to invalidate contacts, we always try to get the latest.
        return this.fetchData(true).finally(function () {
            refresher && refresher.complete();
        });
    };
    /**
     * Load more contacts.
     *
     * @param {any} [infiniteComplete] Infinite scroll complete function. Only used from core-infinite-loading.
     * @return {Promise<any>} Resolved when done.
     */
    AddonMessagesConfirmedContactsComponent.prototype.loadMore = function (infiniteComplete) {
        return this.fetchData().finally(function () {
            infiniteComplete && infiniteComplete();
        });
    };
    /**
     * Notify that a contact has been selected.
     *
     * @param {number} userId User id.
     * @param {boolean} [onInit=false] Whether the contact is selected on initial load.
     */
    AddonMessagesConfirmedContactsComponent.prototype.selectUser = function (userId, onInit) {
        if (onInit === void 0) { onInit = false; }
        this.selectedUserId = userId;
        this.onUserSelected.emit({ userId: userId, onInit: onInit });
    };
    /**
     * Component destroyed.
     */
    AddonMessagesConfirmedContactsComponent.prototype.ngOnDestroy = function () {
        this.memberInfoObserver && this.memberInfoObserver.off();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Output */])(),
        __metadata("design:type", Object)
    ], AddonMessagesConfirmedContactsComponent.prototype, "onUserSelected", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Content */])
    ], AddonMessagesConfirmedContactsComponent.prototype, "content", void 0);
    AddonMessagesConfirmedContactsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'addon-messages-confirmed-contacts',template:/*ion-inline-start:"/home/travis/build/moodlehq/moodlemobile2/src/addon/messages/components/confirmed-contacts/addon-messages-confirmed-contacts.html"*/'<ion-content>\n    <ion-refresher [enabled]="loaded" (ionRefresh)="refreshData($event)">\n        <ion-refresher-content pullingText="{{ \'core.pulltorefresh\' | translate }}"></ion-refresher-content>\n    </ion-refresher>\n    <core-loading [hideUntil]="loaded" class="core-loading-center">\n        <ion-list no-margin>\n            <a ion-item text-wrap *ngFor="let contact of contacts" [title]="contact.fullname" (click)="selectUser(contact.id)" [class.core-split-item-selected]="contact.id == selectedUserId" class="addon-messages-conversation-item">\n                <ion-avatar item-start core-user-avatar [user]="contact" [checkOnline]="contact.showonlinestatus" [linkProfile]="false"></ion-avatar>\n                <h2>\n                    <core-format-text [text]="contact.fullname"></core-format-text>\n                    <core-icon *ngIf="contact.isblocked" name="fa-ban" item-end></core-icon>\n                </h2>\n            </a>\n        </ion-list>\n        <core-empty-box *ngIf="!contacts.length" icon="person" [message]="\'addon.messages.nocontactsgetstarted\' | translate"></core-empty-box>\n        <core-infinite-loading [enabled]="canLoadMore" (action)="loadMore($event)" [error]="loadMoreError" position="bottom"></core-infinite-loading>\n    </core-loading>\n</ion-content>\n'/*ion-inline-end:"/home/travis/build/moodlehq/moodlemobile2/src/addon/messages/components/confirmed-contacts/addon-messages-confirmed-contacts.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__providers_utils_dom__["a" /* CoreDomUtilsProvider */], __WEBPACK_IMPORTED_MODULE_2__providers_events__["a" /* CoreEventsProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_sites__["a" /* CoreSitesProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_messages__["a" /* AddonMessagesProvider */]])
    ], AddonMessagesConfirmedContactsComponent);
    return AddonMessagesConfirmedContactsComponent;
}());

//# sourceMappingURL=confirmed-contacts.js.map

/***/ }),

/***/ 1952:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddonMessagesContactRequestsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_events__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_sites__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_messages__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_utils_dom__ = __webpack_require__(8);
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
 * Component that displays the list of contact requests.
 */
var AddonMessagesContactRequestsComponent = /** @class */ (function () {
    function AddonMessagesContactRequestsComponent(domUtils, eventsProvider, sitesProvider, messagesProvider) {
        var _this = this;
        this.domUtils = domUtils;
        this.messagesProvider = messagesProvider;
        this.onUserSelected = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
        this.loaded = false;
        this.canLoadMore = false;
        this.loadMoreError = false;
        this.requests = [];
        // Hide the "Would like to contact you" message when a contact request is confirmed.
        this.memberInfoObserver = eventsProvider.on(__WEBPACK_IMPORTED_MODULE_4__providers_messages__["a" /* AddonMessagesProvider */].MEMBER_INFO_CHANGED_EVENT, function (data) {
            if (data.contactRequestConfirmed || data.contactRequestDeclined) {
                var index = _this.requests.findIndex(function (request) { return request.id == data.userId; });
                if (index >= 0) {
                    _this.requests.splice(index, 1);
                }
            }
        }, sitesProvider.getCurrentSiteId());
    }
    /**
     * Component loaded.
     */
    AddonMessagesContactRequestsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.fetchData().then(function () {
            if (_this.requests.length) {
                _this.selectUser(_this.requests[0].id, true);
            }
        }).finally(function () {
            _this.loaded = true;
        });
        // Workaround for infinite scrolling.
        this.content.resize();
    };
    /**
     * Fetch contact requests.
     *
     * @param {boolean} [refresh=false] True if we are refreshing contact requests, false if we are loading more.
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonMessagesContactRequestsComponent.prototype.fetchData = function (refresh) {
        var _this = this;
        if (refresh === void 0) { refresh = false; }
        this.loadMoreError = false;
        var limitFrom = refresh ? 0 : this.requests.length;
        var promise;
        if (limitFrom === 0) {
            // Always try to get latest data from server.
            promise = this.messagesProvider.invalidateContactRequestsCache().catch(function () {
                // Shouldn't happen.
            });
        }
        else {
            promise = Promise.resolve();
        }
        return promise.then(function () {
            return _this.messagesProvider.getContactRequests(limitFrom);
        }).then(function (result) {
            _this.requests = refresh ? result.requests : _this.requests.concat(result.requests);
            _this.canLoadMore = result.canLoadMore;
        }).catch(function (error) {
            _this.loadMoreError = true;
            _this.domUtils.showErrorModalDefault(error, 'addon.messages.errorwhileretrievingcontacts', true);
        });
    };
    /**
     * Refresh contact requests.
     *
     * @param {any} [refresher] Refresher.
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonMessagesContactRequestsComponent.prototype.refreshData = function (refresher) {
        // Refresh the number of contacts requests to update badges.
        this.messagesProvider.refreshContactRequestsCount();
        // No need to invalidate contact requests, we always try to get the latest.
        return this.fetchData(true).finally(function () {
            refresher && refresher.complete();
        });
    };
    /**
     * Load more contact requests.
     *
     * @param {any} [infiniteComplete] Infinite scroll complete function. Only used from core-infinite-loading.
     * @return {Promise<any>} Resolved when done.
     */
    AddonMessagesContactRequestsComponent.prototype.loadMore = function (infiniteComplete) {
        return this.fetchData().finally(function () {
            infiniteComplete && infiniteComplete();
        });
    };
    /**
     * Notify that a contact has been selected.
     *
     * @param {number} userId User id.
     * @param {boolean} [onInit=false] Whether the contact is selected on initial load.
     */
    AddonMessagesContactRequestsComponent.prototype.selectUser = function (userId, onInit) {
        if (onInit === void 0) { onInit = false; }
        this.selectedUserId = userId;
        this.onUserSelected.emit({ userId: userId, onInit: onInit });
    };
    /**
     * Component destroyed.
     */
    AddonMessagesContactRequestsComponent.prototype.ngOnDestroy = function () {
        this.memberInfoObserver && this.memberInfoObserver.off();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Output */])(),
        __metadata("design:type", Object)
    ], AddonMessagesContactRequestsComponent.prototype, "onUserSelected", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Content */])
    ], AddonMessagesContactRequestsComponent.prototype, "content", void 0);
    AddonMessagesContactRequestsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'addon-messages-contact-requests',template:/*ion-inline-start:"/home/travis/build/moodlehq/moodlemobile2/src/addon/messages/components/contact-requests/addon-messages-contact-requests.html"*/'<ion-content>\n    <ion-refresher [enabled]="loaded" (ionRefresh)="refreshData($event)">\n        <ion-refresher-content pullingText="{{ \'core.pulltorefresh\' | translate }}"></ion-refresher-content>\n    </ion-refresher>\n    <core-loading [hideUntil]="loaded" class="core-loading-center">\n        <ion-list no-margin>\n            <a ion-item text-wrap *ngFor="let request of requests" [title]="request.fullname" (click)="selectUser(request.id)" [class.core-split-item-selected]="request.id == selectedUserId" class="addon-messages-conversation-item">\n                <ion-avatar item-start core-user-avatar [user]="request" [linkProfile]="false"></ion-avatar>\n                <h2><core-format-text [text]="request.fullname"></core-format-text></h2>\n                <p *ngIf="!request.iscontact && !request.confirmedOrDeclined">{{ \'addon.messages.wouldliketocontactyou\' | translate }}</p>\n            </a>\n        </ion-list>\n        <core-empty-box *ngIf="!requests.length" icon="person" [message]="\'addon.messages.nocontactrequests\' | translate"></core-empty-box>\n        <core-infinite-loading [enabled]="canLoadMore" (action)="loadMore($event)" [error]="loadMoreError" position="bottom"></core-infinite-loading>\n    </core-loading>\n</ion-content>\n'/*ion-inline-end:"/home/travis/build/moodlehq/moodlemobile2/src/addon/messages/components/contact-requests/addon-messages-contact-requests.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__providers_utils_dom__["a" /* CoreDomUtilsProvider */], __WEBPACK_IMPORTED_MODULE_2__providers_events__["a" /* CoreEventsProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_sites__["a" /* CoreSitesProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_messages__["a" /* AddonMessagesProvider */]])
    ], AddonMessagesContactRequestsComponent);
    return AddonMessagesContactRequestsComponent;
}());

//# sourceMappingURL=contact-requests.js.map

/***/ }),

/***/ 1953:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddonMessagesContactsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_sites__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_messages__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_utils_dom__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_app__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_events__ = __webpack_require__(12);
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
 * Component that displays the list of contacts.
 */
var AddonMessagesContactsComponent = /** @class */ (function () {
    function AddonMessagesContactsComponent(sitesProvider, translate, appProvider, messagesProvider, domUtils, navParams, eventsProvider) {
        var _this = this;
        this.appProvider = appProvider;
        this.messagesProvider = messagesProvider;
        this.domUtils = domUtils;
        this.eventsProvider = eventsProvider;
        this.noSearchTypes = ['online', 'offline', 'blocked', 'strangers'];
        this.loaded = false;
        this.contactTypes = this.noSearchTypes;
        this.searchType = 'search';
        this.loadingMessage = '';
        this.hasContacts = false;
        this.contacts = {
            search: []
        };
        this.searchString = '';
        this.currentUserId = sitesProvider.getCurrentSiteUserId();
        this.siteId = sitesProvider.getCurrentSiteId();
        this.searchingMessages = translate.instant('core.searching');
        this.loadingMessages = translate.instant('core.loading');
        this.loadingMessage = this.loadingMessages;
        this.discussionUserId = navParams.get('discussionUserId') || false;
        // Refresh the list when a contact request is confirmed.
        this.memberInfoObserver = eventsProvider.on(__WEBPACK_IMPORTED_MODULE_4__providers_messages__["a" /* AddonMessagesProvider */].MEMBER_INFO_CHANGED_EVENT, function (data) {
            if (data.contactRequestConfirmed) {
                _this.refreshData();
            }
        }, sitesProvider.getCurrentSiteId());
    }
    /**
     * Component loaded.
     */
    AddonMessagesContactsComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.discussionUserId) {
            // There is a discussion to load, open the discussion in a new state.
            this.gotoDiscussion(this.discussionUserId);
        }
        this.fetchData().then(function () {
            if (!_this.discussionUserId && _this.hasContacts) {
                var contact = void 0;
                for (var x in _this.contacts) {
                    if (_this.contacts[x].length > 0) {
                        contact = _this.contacts[x][0];
                        break;
                    }
                }
                if (contact) {
                    // Take first and load it.
                    _this.gotoDiscussion(contact.id, true);
                }
            }
        }).finally(function () {
            _this.loaded = true;
        });
    };
    /**
     * Refresh the data.
     *
     * @param {any} [refresher] Refresher.
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonMessagesContactsComponent.prototype.refreshData = function (refresher) {
        var _this = this;
        var promise;
        if (this.searchString) {
            // User has searched, update the search.
            promise = this.performSearch(this.searchString);
        }
        else {
            // Update contacts.
            promise = this.messagesProvider.invalidateAllContactsCache(this.currentUserId).then(function () {
                return _this.fetchData();
            });
        }
        return promise.finally(function () {
            refresher.complete();
        });
    };
    /**
     * Fetch contacts.
     *
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonMessagesContactsComponent.prototype.fetchData = function () {
        var _this = this;
        this.loadingMessage = this.loadingMessages;
        return this.messagesProvider.getAllContacts().then(function (contacts) {
            for (var x in contacts) {
                if (contacts[x].length > 0) {
                    _this.contacts[x] = _this.sortUsers(contacts[x]);
                }
                else {
                    _this.contacts[x] = [];
                }
            }
            _this.clearSearch();
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'addon.messages.errorwhileretrievingcontacts', true);
        });
    };
    /**
     * Sort user list by fullname
     * @param  {any[]} list List to sort.
     * @return {any[]}      Sorted list.
     */
    AddonMessagesContactsComponent.prototype.sortUsers = function (list) {
        return list.sort(function (a, b) {
            var compareA = a.fullname.toLowerCase(), compareB = b.fullname.toLowerCase();
            return compareA.localeCompare(compareB);
        });
    };
    /**
     * Clear search and show all contacts again.
     */
    AddonMessagesContactsComponent.prototype.clearSearch = function () {
        this.searchString = ''; // Reset searched string.
        this.contactTypes = this.noSearchTypes;
        this.hasContacts = false;
        for (var x in this.contacts) {
            if (this.contacts[x].length > 0) {
                this.hasContacts = true;
                return;
            }
        }
    };
    /**
     * Search users from the UI.
     *
     * @param  {string}       query Text to search for.
     * @return {Promise<any>}       Resolved when done.
     */
    AddonMessagesContactsComponent.prototype.search = function (query) {
        var _this = this;
        this.appProvider.closeKeyboard();
        this.loaded = false;
        this.loadingMessage = this.searchingMessages;
        return this.performSearch(query).finally(function () {
            _this.loaded = true;
        });
    };
    /**
     * Perform the search of users.
     *
     * @param  {string}       query Text to search for.
     * @return {Promise<any>}       Resolved when done.
     */
    AddonMessagesContactsComponent.prototype.performSearch = function (query) {
        var _this = this;
        return this.messagesProvider.searchContacts(query).then(function (result) {
            _this.hasContacts = result.length > 0;
            _this.searchString = query;
            _this.contactTypes = ['search'];
            _this.contacts['search'] = _this.sortUsers(result);
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'addon.messages.errorwhileretrievingcontacts', true);
        });
    };
    /**
     * Navigate to a particular discussion.
     *
     * @param {number} discussionUserId Discussion Id to load.
     * @param {boolean} [onlyWithSplitView=false]  Only go to Discussion if split view is on.
     */
    AddonMessagesContactsComponent.prototype.gotoDiscussion = function (discussionUserId, onlyWithSplitView) {
        if (onlyWithSplitView === void 0) { onlyWithSplitView = false; }
        this.discussionUserId = discussionUserId;
        var params = {
            discussion: discussionUserId,
            onlyWithSplitView: onlyWithSplitView
        };
        this.eventsProvider.trigger(__WEBPACK_IMPORTED_MODULE_4__providers_messages__["a" /* AddonMessagesProvider */].SPLIT_VIEW_LOAD_EVENT, params, this.siteId);
    };
    /**
     * Component destroyed.
     */
    AddonMessagesContactsComponent.prototype.ngOnDestroy = function () {
        this.memberInfoObserver && this.memberInfoObserver.off();
    };
    AddonMessagesContactsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'addon-messages-contacts',template:/*ion-inline-start:"/home/travis/build/moodlehq/moodlemobile2/src/addon/messages/components/contacts/addon-messages-contacts.html"*/'<ion-content>\n    <ion-refresher [enabled]="loaded" (ionRefresh)="refreshData($event)">\n        <ion-refresher-content pullingText="{{ \'core.pulltorefresh\' | translate }}"></ion-refresher-content>\n    </ion-refresher>\n\n    <core-search-box (onSubmit)="search($event)" (onClear)="clearSearch($event)" [placeholder]=" \'addon.messages.contactname\' | translate" autocorrect="off" spellcheck="false" lengthCheck="2" [disabled]="!loaded"></core-search-box>\n\n    <core-loading [hideUntil]="loaded" [message]="loadingMessage">\n        <core-empty-box *ngIf="!hasContacts && searchString == \'\'" icon="person" [message]="\'addon.messages.contactlistempty\' | translate"></core-empty-box>\n\n        <core-empty-box *ngIf="!hasContacts && searchString != \'\'" icon="person" [message]="\'addon.messages.nousersfound\' | translate"></core-empty-box>\n\n        <ion-list *ngFor="let contactType of contactTypes" no-margin>\n            <ng-container *ngIf="contacts[contactType] && (contacts[contactType].length > 0 || contactType === searchType)">\n                <ion-item-divider>\n                    <h2>{{ \'addon.messages.type_\' + contactType | translate }}</h2>\n                    <ion-note item-end>{{ contacts[contactType].length }}</ion-note>\n                </ion-item-divider>\n                <ng-container *ngFor="let contact of contacts[contactType]">\n                    <!-- Don\'t show deleted users -->\n                    <a ion-item text-wrap *ngIf="contact.profileimageurl || contact.profileimageurlsmall"  [title]="contact.fullname" (click)="gotoDiscussion(contact.id)" [class.core-split-item-selected]="contact.id == discussionUserId" class="addon-messages-conversation-item">\n                        <ion-avatar core-user-avatar [user]="contact" item-start [checkOnline]="contact.showonlinestatus"></ion-avatar>\n                        <h2><core-format-text [text]="contact.fullname"></core-format-text></h2>\n                    </a>\n                </ng-container>\n            </ng-container>\n        </ion-list>\n    </core-loading>\n</ion-content>\n'/*ion-inline-end:"/home/travis/build/moodlehq/moodlemobile2/src/addon/messages/components/contacts/addon-messages-contacts.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__providers_sites__["a" /* CoreSitesProvider */], __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_6__providers_app__["a" /* CoreAppProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_messages__["a" /* AddonMessagesProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_utils_dom__["a" /* CoreDomUtilsProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_7__providers_events__["a" /* CoreEventsProvider */]])
    ], AddonMessagesContactsComponent);
    return AddonMessagesContactsComponent;
}());

//# sourceMappingURL=contacts.js.map

/***/ }),

/***/ 1973:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddonMessagesSearchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_events__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_sites__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_messages__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_split_view_split_view__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_utils_dom__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_app__ = __webpack_require__(9);
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
 * Page for searching users.
 */
var AddonMessagesSearchPage = /** @class */ (function () {
    function AddonMessagesSearchPage(appProvider, domUtils, eventsProvider, sitesProvider, messagesProvider) {
        var _this = this;
        this.appProvider = appProvider;
        this.domUtils = domUtils;
        this.messagesProvider = messagesProvider;
        this.disableSearch = false;
        this.displaySearching = false;
        this.displayResults = false;
        this.query = '';
        this.contacts = {
            type: 'contacts',
            titleString: 'addon.messages.contacts',
            emptyString: 'addon.messages.searchnocontactsfound',
            results: [],
            canLoadMore: false,
            loadingMore: false
        };
        this.nonContacts = {
            type: 'noncontacts',
            titleString: 'addon.messages.noncontacts',
            emptyString: 'addon.messages.searchnononcontactsfound',
            results: [],
            canLoadMore: false,
            loadingMore: false
        };
        this.messages = {
            type: 'messages',
            titleString: 'addon.messages.messages',
            emptyString: 'addon.messages.searchnomessagesfound',
            results: [],
            canLoadMore: false,
            loadingMore: false,
            loadMoreError: false
        };
        this.selectedResult = null;
        // Update block status of a user.
        this.memberInfoObserver = eventsProvider.on(__WEBPACK_IMPORTED_MODULE_3__providers_messages__["a" /* AddonMessagesProvider */].MEMBER_INFO_CHANGED_EVENT, function (data) {
            if (!data.userBlocked && !data.userUnblocked) {
                // The block status has not changed, ignore.
                return;
            }
            var contact = _this.contacts.results.find(function (user) { return user.id == data.userId; });
            if (contact) {
                contact.isblocked = data.userBlocked;
            }
            else {
                var nonContact = _this.nonContacts.results.find(function (user) { return user.id == data.userId; });
                if (nonContact) {
                    nonContact.isblocked = data.userBlocked;
                }
            }
            _this.messages.results.forEach(function (message) {
                if (message.userid == data.userId) {
                    message.isblocked = data.userBlocked;
                }
            });
        }, sitesProvider.getCurrentSiteId());
    }
    /**
     * Clear search.
     */
    AddonMessagesSearchPage.prototype.clearSearch = function () {
        this.query = '';
        this.displayResults = false;
        this.splitviewCtrl.emptyDetails();
    };
    /**
     * Start a new search or load more results.
     *
     * @param {string} query Text to search for.
     * @param {strings} loadMore Load more contacts, noncontacts or messages. If undefined, start a new search.
     * @param {any} [infiniteComplete] Infinite scroll complete function. Only used from core-infinite-loading.
     * @return {Promise<any>} Resolved when done.
     */
    AddonMessagesSearchPage.prototype.search = function (query, loadMore, infiniteComplete) {
        var _this = this;
        this.appProvider.closeKeyboard();
        this.query = query;
        this.disableSearch = true;
        this.displaySearching = !loadMore;
        var promises = [];
        var newContacts = [];
        var newNonContacts = [];
        var newMessages = [];
        var canLoadMoreContacts = false;
        var canLoadMoreNonContacts = false;
        var canLoadMoreMessages = false;
        if (!loadMore || loadMore == 'contacts' || loadMore == 'noncontacts') {
            var limitNum = loadMore ? __WEBPACK_IMPORTED_MODULE_3__providers_messages__["a" /* AddonMessagesProvider */].LIMIT_SEARCH : __WEBPACK_IMPORTED_MODULE_3__providers_messages__["a" /* AddonMessagesProvider */].LIMIT_INITIAL_USER_SEARCH;
            var limitFrom = 0;
            if (loadMore == 'contacts') {
                limitFrom = this.contacts.results.length;
                this.contacts.loadingMore = true;
            }
            else if (loadMore == 'noncontacts') {
                limitFrom = this.nonContacts.results.length;
                this.nonContacts.loadingMore = true;
            }
            promises.push(this.messagesProvider.searchUsers(query, limitFrom, limitNum).then(function (result) {
                if (!loadMore || loadMore == 'contacts') {
                    newContacts = result.contacts;
                    canLoadMoreContacts = result.canLoadMoreContacts;
                }
                if (!loadMore || loadMore == 'noncontacts') {
                    newNonContacts = result.nonContacts;
                    canLoadMoreNonContacts = result.canLoadMoreNonContacts;
                }
            }));
        }
        if (!loadMore || loadMore == 'messages') {
            var limitFrom = 0;
            if (loadMore == 'messages') {
                limitFrom = this.messages.results.length;
                this.messages.loadingMore = true;
            }
            promises.push(this.messagesProvider.searchMessages(query, undefined, limitFrom).then(function (result) {
                newMessages = result.messages;
                canLoadMoreMessages = result.canLoadMore;
            }));
        }
        return Promise.all(promises).then(function () {
            if (!loadMore) {
                _this.contacts.results = [];
                _this.nonContacts.results = [];
                _this.messages.results = [];
            }
            _this.displayResults = true;
            if (!loadMore || loadMore == 'contacts') {
                (_a = _this.contacts.results).push.apply(_a, newContacts);
                _this.contacts.canLoadMore = canLoadMoreContacts;
            }
            if (!loadMore || loadMore == 'noncontacts') {
                (_b = _this.nonContacts.results).push.apply(_b, newNonContacts);
                _this.nonContacts.canLoadMore = canLoadMoreNonContacts;
            }
            if (!loadMore || loadMore == 'messages') {
                (_c = _this.messages.results).push.apply(_c, newMessages);
                _this.messages.canLoadMore = canLoadMoreMessages;
                _this.messages.loadMoreError = false;
            }
            if (!loadMore) {
                if (_this.contacts.results.length > 0) {
                    _this.openConversation(_this.contacts.results[0], true);
                }
                else if (_this.nonContacts.results.length > 0) {
                    _this.openConversation(_this.nonContacts.results[0], true);
                }
                else if (_this.messages.results.length > 0) {
                    _this.openConversation(_this.messages.results[0], true);
                }
            }
            var _a, _b, _c;
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'addon.messages.errorwhileretrievingusers', true);
            if (loadMore == 'messages') {
                _this.messages.loadMoreError = true;
            }
        }).finally(function () {
            _this.disableSearch = false;
            _this.displaySearching = false;
            if (loadMore == 'contacts') {
                _this.contacts.loadingMore = false;
            }
            else if (loadMore == 'noncontacts') {
                _this.nonContacts.loadingMore = false;
            }
            else if (loadMore == 'messages') {
                _this.messages.loadingMore = false;
            }
            infiniteComplete && infiniteComplete();
        });
    };
    /**
     * Open a conversation in the split view.
     *
     * @param {any} result User or message.
     * @param {boolean} [onInit=false] Whether the tser was selected on initial load.
     */
    AddonMessagesSearchPage.prototype.openConversation = function (result, onInit) {
        if (onInit === void 0) { onInit = false; }
        if (!onInit || this.splitviewCtrl.isOn()) {
            this.selectedResult = result;
            var params = {};
            if (result.conversationid) {
                params.conversationId = result.conversationid;
            }
            else {
                params.userId = result.id;
            }
            this.splitviewCtrl.push('AddonMessagesDiscussionPage', params);
        }
    };
    /**
     * Component destroyed.
     */
    AddonMessagesSearchPage.prototype.ngOnDestroy = function () {
        this.memberInfoObserver && this.memberInfoObserver.off();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_4__components_split_view_split_view__["a" /* CoreSplitViewComponent */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4__components_split_view_split_view__["a" /* CoreSplitViewComponent */])
    ], AddonMessagesSearchPage.prototype, "splitviewCtrl", void 0);
    AddonMessagesSearchPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-addon-messages-search',template:/*ion-inline-start:"/home/travis/build/moodlehq/moodlemobile2/src/addon/messages/pages/search/search.html"*/'<ion-header>\n    <ion-navbar core-back-button>\n        <ion-title>{{ \'addon.messages.searchcombined\' | translate }}</ion-title>\n        <ion-buttons end>\n            <!-- Add an empty context menu so discussion page can add items in split view, otherwise the menu disappears in some cases. -->\n            <core-context-menu></core-context-menu>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n<core-split-view>\n    <ion-content>\n        <core-search-box (onSubmit)="search($event)" (onClear)="clearSearch($event)" [disabled]="disableSearch" autocorrect="off" [spellcheck]="false" [autoFocus]="true" [lengthCheck]="1"></core-search-box>\n        <core-loading [hideUntil]="!displaySearching" [message]="\'core.searching\' | translate">\n            <ion-list *ngIf="displayResults">\n                <ng-container *ngTemplateOutlet="resultsTemplate; context: {item: contacts}"></ng-container>\n                <ng-container *ngTemplateOutlet="resultsTemplate; context: {item: nonContacts}"></ng-container>\n                <ng-container *ngTemplateOutlet="resultsTemplate; context: {item: messages}"></ng-container>\n                <!-- The infinite loading cannot be inside the ng-template, it fails because it doesn\'t find ion-content. -->\n                <core-infinite-loading [enabled]="messages.canLoadMore" (action)="search(query, \'messages\', $event)" [error]="messages.loadMoreError"></core-infinite-loading>\n            </ion-list>\n        </core-loading>\n    </ion-content>\n</core-split-view>\n\n<!-- Template to render a list of results -->\n<ng-template #resultsTemplate let-item="item">\n    <ion-item-divider text-wrap>{{ item.titleString | translate }}</ion-item-divider>\n    <ion-item text-wrap *ngIf="item.results.length == 0">\n        {{ item.emptyString | translate }}\n    </ion-item>\n\n    <!-- List of results -->\n    <a ion-item text-wrap *ngFor="let result of item.results" [title]="result.fullname" (click)="openConversation(result)" [class.core-split-item-selected]="result == selectedResult" class="addon-message-discussion">\n        <ion-avatar item-start core-user-avatar [user]="result" [checkOnline]="true" [linkProfile]="false"></ion-avatar>\n        <h2>\n            <core-format-text [text]="result.fullname"></core-format-text>\n            <core-icon name="fa-ban" *ngIf="result.isblocked" [attr.aria-label]="\'addon.messages.contactblocked\' | translate"></core-icon>\n        </h2>\n        <ion-note *ngIf="result.lastmessagedate > 0">\n            {{result.lastmessagedate | coreDateDayOrTime}}\n        </ion-note>\n        <p class="addon-message-last-message">\n            <span *ngIf="result.sentfromcurrentuser" class="addon-message-last-message-user">{{ \'addon.messages.you\' | translate }}</span>\n            <core-format-text clean="true" singleLine="true" [text]="result.lastmessage" class="addon-message-last-message-text"></core-format-text>\n        </p>\n    </a>\n\n    <!-- Load more button for contacts and non-contacts -->\n    <ng-container *ngIf="item.type != \'messages\'">\n        <div padding-horizontal *ngIf="item.canLoadMore && !item.loadingMore">\n            <button ion-button block color="light" (click)="search(query, item.type)">\n                {{ \'core.loadmore\' | translate }}\n            </button>\n        </div>\n        <div *ngIf="item.loadingMore" padding text-center>\n            <ion-spinner></ion-spinner>\n        </div>\n    </ng-container>\n</ng-template>'/*ion-inline-end:"/home/travis/build/moodlehq/moodlemobile2/src/addon/messages/pages/search/search.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__providers_app__["a" /* CoreAppProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_utils_dom__["a" /* CoreDomUtilsProvider */], __WEBPACK_IMPORTED_MODULE_1__providers_events__["a" /* CoreEventsProvider */],
            __WEBPACK_IMPORTED_MODULE_2__providers_sites__["a" /* CoreSitesProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_messages__["a" /* AddonMessagesProvider */]])
    ], AddonMessagesSearchPage);
    return AddonMessagesSearchPage;
}());

//# sourceMappingURL=search.js.map

/***/ })

});
//# sourceMappingURL=1.js.map