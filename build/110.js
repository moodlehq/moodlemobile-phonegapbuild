webpackJsonp([110],{

/***/ 2023:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddonModChatSessionMessagesPageModule", function() { return AddonModChatSessionMessagesPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__directives_directives_module__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pipes_pipes_module__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_components_module__ = __webpack_require__(991);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__session_messages__ = __webpack_require__(2170);
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








var AddonModChatSessionMessagesPageModule = /** @class */ (function () {
    function AddonModChatSessionMessagesPageModule() {
    }
    AddonModChatSessionMessagesPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__session_messages__["a" /* AddonModChatSessionMessagesPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* CoreComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_4__directives_directives_module__["a" /* CoreDirectivesModule */],
                __WEBPACK_IMPORTED_MODULE_5__pipes_pipes_module__["a" /* CorePipesModule */],
                __WEBPACK_IMPORTED_MODULE_6__components_components_module__["a" /* AddonModChatComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_7__session_messages__["a" /* AddonModChatSessionMessagesPage */]),
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */].forChild()
            ],
        })
    ], AddonModChatSessionMessagesPageModule);
    return AddonModChatSessionMessagesPageModule;
}());

//# sourceMappingURL=session-messages.module.js.map

/***/ }),

/***/ 2170:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddonModChatSessionMessagesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_utils_dom__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_sites__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_user_providers_user__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_chat__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_helper__ = __webpack_require__(996);
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
 * Page that displays list of chat session messages.
 */
var AddonModChatSessionMessagesPage = /** @class */ (function () {
    function AddonModChatSessionMessagesPage(navParams, domUtils, chatProvider, sitesProvider, chatHelper, userProvider) {
        this.domUtils = domUtils;
        this.chatProvider = chatProvider;
        this.chatHelper = chatHelper;
        this.userProvider = userProvider;
        this.messages = [];
        this.loaded = false;
        this.courseId = navParams.get('courseId');
        this.chatId = navParams.get('chatId');
        this.groupId = navParams.get('groupId');
        this.sessionStart = navParams.get('sessionStart');
        this.sessionEnd = navParams.get('sessionEnd');
        this.cmId = navParams.get('cmId');
        this.currentUserId = sitesProvider.getCurrentSiteUserId();
        this.fetchMessages();
    }
    /**
     * Fetch session messages.
     *
     * @return Promise resolved when done.
     */
    AddonModChatSessionMessagesPage.prototype.fetchMessages = function () {
        var _this = this;
        return this.chatProvider.getSessionMessages(this.chatId, this.sessionStart, this.sessionEnd, this.groupId)
            .then(function (messages) {
            return _this.chatProvider.getMessagesUserData(messages, _this.courseId).then(function (messages) {
                _this.messages = messages;
                if (messages.length) {
                    var _loop_1 = function (index) {
                        var message = _this.messages[index];
                        var prevMessage = index > 0 ? _this.messages[index - 1] : null;
                        _this.chatHelper.formatMessage(_this.currentUserId, message, prevMessage);
                        if (message.beep && message.beep != _this.currentUserId + '') {
                            _this.getUserFullname(message.beep).then(function (fullname) {
                                message.beepWho = fullname;
                            });
                        }
                    };
                    // Calculate which messages need to display the date or user data.
                    for (var index = 0; index < _this.messages.length; index++) {
                        _loop_1(index);
                    }
                    _this.messages[_this.messages.length - 1].showTail = true;
                }
            });
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'core.errorloadingcontent', true);
        }).finally(function () {
            _this.loaded = true;
        });
    };
    /**
     * Get the user fullname for a beep.
     *
     * @param  id User Id before parsing.
     * @return User fullname.
     */
    AddonModChatSessionMessagesPage.prototype.getUserFullname = function (id) {
        if (isNaN(parseInt(id, 10))) {
            return Promise.resolve(id);
        }
        return this.userProvider.getProfile(parseInt(id, 10), this.courseId, true).then(function (user) {
            return user.fullname;
        }).catch(function () {
            // Error getting profile.
            return id;
        });
    };
    /**
     * Refresh session messages.
     *
     * @param refresher Refresher.
     */
    AddonModChatSessionMessagesPage.prototype.refreshMessages = function (refresher) {
        var _this = this;
        this.chatProvider.invalidateSessionMessages(this.chatId, this.sessionStart, this.groupId).finally(function () {
            _this.fetchMessages().finally(function () {
                refresher.complete();
            });
        });
    };
    AddonModChatSessionMessagesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-addon-mod-chat-session-messages',template:/*ion-inline-start:"/home/travis/build/moodlehq/moodlemobile2/src/addon/mod/chat/pages/session-messages/session-messages.html"*/'<ion-header>\n    <ion-navbar core-back-button>\n        <ion-title>{{ \'addon.mod_chat.messages\' | translate }}</ion-title>\n    </ion-navbar>\n</ion-header>\n<ion-content>\n    <ion-refresher [enabled]="loaded" (ionRefresh)="refreshMessages($event)">\n        <ion-refresher-content pullingText="{{ \'core.pulltorefresh\' | translate }}"></ion-refresher-content>\n    </ion-refresher>\n    <core-loading [hideUntil]="loaded">\n        <ion-list class="addon-messages-discussion-container safe-area-page" aria-live="polite">\n            <ng-container *ngFor="let message of messages; index as index;">\n                <h6 text-center *ngIf="message.showDate" class="addon-messages-date">\n                    {{ message.timestamp * 1000 | coreFormatDate:"strftimedayshort" }}\n                </h6>\n\n                <div text-center *ngIf="message.special" class="addon-mod-chat-notice">\n                    <ion-badge text-wrap color="success" *ngIf="message.issystem && message.message == \'enter\'">\n                        <span><core-icon name="fa-sign-in"></core-icon> {{ message.timestamp * 1000 | coreFormatDate:"strftimetime" }} {{ \'addon.mod_chat.messageenter\' | translate:{$a: message.userfullname} }}</span>\n                    </ion-badge>\n\n                    <ion-badge text-wrap color="danger" *ngIf="message.issystem && message.message == \'exit\'">\n                        <span><core-icon name="fa-sign-out"></core-icon> {{ message.timestamp * 1000 | coreFormatDate:"strftimetime" }} {{ \'addon.mod_chat.messageexit\' | translate:{$a: message.userfullname} }}</span>\n                    </ion-badge>\n\n                    <ion-badge text-wrap color="primary" *ngIf="message.beep == \'all\'">\n                        <span><ion-icon name="notifications"></ion-icon> {{ message.timestamp * 1000 | coreFormatDate:"strftimetime" }}\n                        {{ \'addon.mod_chat.messagebeepseveryone\' | translate:{$a: message.userfullname} }} </span>\n                    </ion-badge>\n\n                    <ion-badge text-wrap color="primary" *ngIf="message.userid != currentUserId && message.beep == currentUserId">\n                        <span><ion-icon name="notifications"></ion-icon> {{ message.timestamp * 1000 | coreFormatDate:"strftimetime" }}\n                        {{ \'addon.mod_chat.messagebeepsyou\' | translate:{$a: message.userfullname} }} </span>\n                    </ion-badge>\n\n                    <ion-badge text-wrap color="light" *ngIf="message.userid == currentUserId && message.beep && message.beep != \'all\'">\n                        <span><ion-icon name="notifications"></ion-icon> {{ message.timestamp * 1000 | coreFormatDate:"strftimetime" }}\n                        {{ \'addon.mod_chat.messageyoubeep\' | translate:{$a: message.beepWho} }} </span>\n                    </ion-badge>\n\n                    <ion-badge text-wrap color="info" *ngIf="!message.issystem && !message.beep">\n                        <span><core-icon name="fa-asterisk"></core-icon> {{ message.timestamp * 1000 | coreFormatDate:"strftimetime" }}\n                            <strong>{{ message.userfullname }} <core-format-text [text]="message.message" contextLevel="module" [contextInstanceId]="cmId" [courseId]="courseId"></core-format-text></strong></span>\n                    </ion-badge>\n                </div>\n\n                <ion-item text-wrap *ngIf="!message.special" class="addon-message" [class.addon-message-mine]="message.userid == currentUserId" [class.addon-message-not-mine]="message.userid != currentUserId" [class.addon-message-no-user]="!message.showUserData">\n                    <!-- User data. -->\n                    <h2 class="addon-message-user">\n                        <ion-avatar item-start core-user-avatar [user]="message" [linkProfile]="false" *ngIf="message.showUserData"></ion-avatar>\n                        <div *ngIf="message.showUserData">{{ message.userfullname }}</div>\n                        <ion-note>{{ message.timestamp * 1000 | coreFormatDate: "strftimetime" }}</ion-note>\n                    </h2>\n\n                    <p class="addon-message-text">\n                        <core-format-text [text]="message.message" contextLevel="module" [contextInstanceId]="cmId" [courseId]="courseId"></core-format-text>\n                    </p>\n                    <div class="tail" *ngIf="message.showTail"></div>\n                </ion-item>\n            </ng-container>\n        </ion-list>\n    </core-loading>\n</ion-content>\n'/*ion-inline-end:"/home/travis/build/moodlehq/moodlemobile2/src/addon/mod/chat/pages/session-messages/session-messages.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_utils_dom__["a" /* CoreDomUtilsProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_chat__["a" /* AddonModChatProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_sites__["a" /* CoreSitesProvider */], __WEBPACK_IMPORTED_MODULE_6__providers_helper__["a" /* AddonModChatHelperProvider */], __WEBPACK_IMPORTED_MODULE_4__core_user_providers_user__["a" /* CoreUserProvider */]])
    ], AddonModChatSessionMessagesPage);
    return AddonModChatSessionMessagesPage;
}());

//# sourceMappingURL=session-messages.js.map

/***/ })

});
//# sourceMappingURL=110.js.map