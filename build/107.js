webpackJsonp([107],{

/***/ 1841:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddonMessagesConversationInfoPageModule", function() { return AddonMessagesConversationInfoPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__conversation_info__ = __webpack_require__(1969);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_components_module__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__directives_directives_module__ = __webpack_require__(14);
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






var AddonMessagesConversationInfoPageModule = /** @class */ (function () {
    function AddonMessagesConversationInfoPageModule() {
    }
    AddonMessagesConversationInfoPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__conversation_info__["a" /* AddonMessagesConversationInfoPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_4__components_components_module__["a" /* CoreComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_5__directives_directives_module__["a" /* CoreDirectivesModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__conversation_info__["a" /* AddonMessagesConversationInfoPage */]),
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */].forChild()
            ],
        })
    ], AddonMessagesConversationInfoPageModule);
    return AddonMessagesConversationInfoPageModule;
}());

//# sourceMappingURL=conversation-info.module.js.map

/***/ }),

/***/ 1969:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddonMessagesConversationInfoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_messages__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_utils_dom__ = __webpack_require__(8);
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
var AddonMessagesConversationInfoPage = /** @class */ (function () {
    function AddonMessagesConversationInfoPage(messagesProvider, domUtils, navParams, viewCtrl) {
        this.messagesProvider = messagesProvider;
        this.domUtils = domUtils;
        this.viewCtrl = viewCtrl;
        this.loaded = false;
        this.members = [];
        this.canLoadMore = false;
        this.loadMoreError = false;
        this.conversationId = navParams.get('conversationId');
    }
    /**
     * Component loaded.
     */
    AddonMessagesConversationInfoPage.prototype.ngOnInit = function () {
        var _this = this;
        this.fetchData().finally(function () {
            _this.loaded = true;
        });
    };
    /**
     * Fetch the required data.
     *
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonMessagesConversationInfoPage.prototype.fetchData = function () {
        var _this = this;
        // Get the conversation data first.
        return this.messagesProvider.getConversation(this.conversationId, false, true, 0, 0).then(function (conversation) {
            _this.conversation = conversation;
            // Now get the members.
            return _this.fetchMembers();
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'Error getting members.');
        });
    };
    /**
     * Get conversation members.
     *
     * @param {boolean} [loadingMore} Whether we are loading more data or just the first ones.
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonMessagesConversationInfoPage.prototype.fetchMembers = function (loadingMore) {
        var _this = this;
        this.loadMoreError = false;
        var limitFrom = loadingMore ? this.members.length : 0;
        return this.messagesProvider.getConversationMembers(this.conversationId, limitFrom).then(function (data) {
            if (loadingMore) {
                _this.members = _this.members.concat(data.members);
            }
            else {
                _this.members = data.members;
            }
            _this.canLoadMore = data.canLoadMore;
        });
    };
    /**
     * Function to load more members.
     *
     * @param {any} [infiniteComplete] Infinite scroll complete function. Only used from core-infinite-loading.
     * @return {Promise<any>} Resolved when done.
     */
    AddonMessagesConversationInfoPage.prototype.loadMoreMembers = function (infiniteComplete) {
        var _this = this;
        return this.fetchMembers(true).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'Error getting members.');
            _this.loadMoreError = true;
        }).finally(function () {
            infiniteComplete && infiniteComplete();
        });
    };
    /**
     * Refresh the data.
     *
     * @param {any} [refresher] Refresher.
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonMessagesConversationInfoPage.prototype.refreshData = function (refresher) {
        var _this = this;
        var promises = [];
        promises.push(this.messagesProvider.invalidateConversation(this.conversationId));
        promises.push(this.messagesProvider.invalidateConversationMembers(this.conversationId));
        return Promise.all(promises).then(function () {
            return _this.fetchData().finally(function () {
                refresher && refresher.complete();
            });
        });
    };
    /**
     * Close modal.
     *
     * @param {number} [userId] User conversation to load.
     */
    AddonMessagesConversationInfoPage.prototype.closeModal = function (userId) {
        this.viewCtrl.dismiss(userId);
    };
    AddonMessagesConversationInfoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-addon-messages-conversation-info',template:/*ion-inline-start:"/home/travis/build/moodlehq/moodlemobile2/src/addon/messages/pages/conversation-info/conversation-info.html"*/'<ion-header>\n    <ion-navbar core-back-button>\n        <ion-title>{{ \'addon.messages.groupinfo\' | translate }}</ion-title>\n        <ion-buttons end>\n            <button ion-button icon-only (click)="closeModal()" [attr.aria-label]="\'core.close\' | translate">\n                <ion-icon name="close"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n<ion-content>\n    <ion-refresher [enabled]="loaded" (ionRefresh)="refreshData($event)">\n        <ion-refresher-content pullingText="{{ \'core.pulltorefresh\' | translate }}"></ion-refresher-content>\n    </ion-refresher>\n\n    <core-loading [hideUntil]="loaded">\n        <ion-item text-center *ngIf="conversation">\n            <div class="item-avatar-center">\n                <img class="avatar" [src]="conversation.imageurl" core-external-content [alt]="conversation.name" role="presentation" onError="this.src=\'assets/img/group-avatar.png\'">\n            </div>\n            <h2><core-format-text [text]="conversation.name"></core-format-text></h2>\n            <p><core-format-text *ngIf="conversation.subname" [text]="conversation.subname"></core-format-text></p>\n            <p>{{ \'addon.messages.numparticipants\' | translate:{$a: conversation.membercount} }}</p>\n        </ion-item>\n\n        <a ion-item text-wrap *ngFor="let member of members" (click)="closeModal(member.id)" class="addon-messages-conversation-item">\n            <ion-avatar core-user-avatar [user]="member" [linkProfile]="false" [checkOnline]="member.showonlinestatus" item-start></ion-avatar>\n            <h2>\n                <core-format-text [text]="member.fullname"></core-format-text>\n                <core-icon name="fa-ban" *ngIf="member.isblocked" [attr.aria-label]="\'addon.messages.contactblocked\' | translate"></core-icon>\n            </h2>\n        </a>\n\n        <core-infinite-loading [enabled]="canLoadMore" (action)="loadMoreMembers($event)" [error]="loadMoreError"></core-infinite-loading>\n    </core-loading>\n</ion-content>\n'/*ion-inline-end:"/home/travis/build/moodlehq/moodlemobile2/src/addon/messages/pages/conversation-info/conversation-info.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_messages__["a" /* AddonMessagesProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_utils_dom__["a" /* CoreDomUtilsProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["E" /* ViewController */]])
    ], AddonMessagesConversationInfoPage);
    return AddonMessagesConversationInfoPage;
}());

//# sourceMappingURL=conversation-info.js.map

/***/ })

});
//# sourceMappingURL=107.js.map