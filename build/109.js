webpackJsonp([109],{

/***/ 2024:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddonModChatSessionsPageModule", function() { return AddonModChatSessionsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__directives_directives_module__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pipes_pipes_module__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_components_module__ = __webpack_require__(991);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__sessions__ = __webpack_require__(2171);
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








var AddonModChatSessionsPageModule = /** @class */ (function () {
    function AddonModChatSessionsPageModule() {
    }
    AddonModChatSessionsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__sessions__["a" /* AddonModChatSessionsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* CoreComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_4__directives_directives_module__["a" /* CoreDirectivesModule */],
                __WEBPACK_IMPORTED_MODULE_5__pipes_pipes_module__["a" /* CorePipesModule */],
                __WEBPACK_IMPORTED_MODULE_6__components_components_module__["a" /* AddonModChatComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_7__sessions__["a" /* AddonModChatSessionsPage */]),
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */].forChild()
            ],
        })
    ], AddonModChatSessionsPageModule);
    return AddonModChatSessionsPageModule;
}());

//# sourceMappingURL=sessions.module.js.map

/***/ }),

/***/ 2171:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddonModChatSessionsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_split_view_split_view__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_user_providers_user__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_groups__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_utils_dom__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_utils_utils__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_chat__ = __webpack_require__(230);
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
 * Page that displays list of chat sessions.
 */
var AddonModChatSessionsPage = /** @class */ (function () {
    function AddonModChatSessionsPage(navParams, chatProvider, domUtils, userProvider, groupsProvider, translate, utils) {
        var _this = this;
        this.chatProvider = chatProvider;
        this.domUtils = domUtils;
        this.userProvider = userProvider;
        this.groupsProvider = groupsProvider;
        this.translate = translate;
        this.utils = utils;
        this.loaded = false;
        this.showAll = false;
        this.groupId = 0;
        this.sessions = [];
        this.courseId = navParams.get('courseId');
        this.cmId = navParams.get('cmId');
        this.chatId = navParams.get('chatId');
        this.fetchSessions().then(function () {
            if (_this.splitviewCtrl.isOn() && _this.sessions.length > 0) {
                _this.openSession(_this.sessions[0]);
            }
        });
    }
    /**
     * Fetch chat sessions.
     *
     * @param showLoading Display a loading modal.
     * @return Promise resolved when done.
     */
    AddonModChatSessionsPage.prototype.fetchSessions = function (showLoading) {
        var _this = this;
        var modal = showLoading ? this.domUtils.showModalLoading() : null;
        return this.groupsProvider.getActivityGroupInfo(this.cmId, false).then(function (groupInfo) {
            _this.groupInfo = groupInfo;
            _this.groupId = _this.groupsProvider.validateGroupId(_this.groupId, groupInfo);
            return _this.chatProvider.getSessions(_this.chatId, _this.groupId, _this.showAll);
        }).then(function (sessions) {
            // Fetch user profiles.
            var promises = [];
            sessions.forEach(function (session) {
                session.duration = session.sessionend - session.sessionstart;
                session.sessionusers.forEach(function (sessionUser) {
                    if (!sessionUser.userfullname) {
                        // The WS does not return the user name, fetch user profile.
                        promises.push(_this.userProvider.getProfile(sessionUser.userid, _this.courseId, true).then(function (user) {
                            sessionUser.userfullname = user.fullname;
                        }).catch(function () {
                            // Error getting profile, most probably the user is deleted.
                            sessionUser.userfullname = _this.translate.instant('core.deleteduser') + ' ' + sessionUser.userid;
                        }));
                    }
                });
                // If session has more than 4 users we display a "Show more" link.
                session.allsessionusers = session.sessionusers;
                if (session.sessionusers.length > 4) {
                    session.sessionusers = session.allsessionusers.slice(0, 3);
                }
            });
            return Promise.all(promises).then(function () {
                _this.sessions = sessions;
            });
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'core.errorloadingcontent', true);
        }).finally(function () {
            _this.loaded = true;
            modal && modal.dismiss();
        });
    };
    /**
     * Refresh chat sessions.
     *
     * @param refresher Refresher.
     */
    AddonModChatSessionsPage.prototype.refreshSessions = function (refresher) {
        var _this = this;
        var promises = [
            this.groupsProvider.invalidateActivityGroupInfo(this.cmId),
            this.chatProvider.invalidateSessions(this.chatId, this.groupId, this.showAll)
        ];
        this.utils.allPromises(promises).finally(function () {
            _this.fetchSessions().finally(function () {
                refresher.complete();
            });
        });
    };
    /**
     * Navigate to a session.
     *
     * @param session Chat session.
     */
    AddonModChatSessionsPage.prototype.openSession = function (session) {
        this.selectedSessionStart = session.sessionstart;
        this.selectedSessionGroupId = this.groupId;
        var params = {
            courseId: this.courseId,
            chatId: this.chatId,
            groupId: this.groupId,
            sessionStart: session.sessionstart,
            sessionEnd: session.sessionend,
            cmId: this.cmId
        };
        this.splitviewCtrl.push('AddonModChatSessionMessagesPage', params);
    };
    /**
     * Show more session users.
     *
     * @param session Chat session.
     * @param $event The event.
     */
    AddonModChatSessionsPage.prototype.showMoreUsers = function (session, $event) {
        session.sessionusers = session.allsessionusers;
        $event.stopPropagation();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_3__components_split_view_split_view__["a" /* CoreSplitViewComponent */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3__components_split_view_split_view__["a" /* CoreSplitViewComponent */])
    ], AddonModChatSessionsPage.prototype, "splitviewCtrl", void 0);
    AddonModChatSessionsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-addon-mod-chat-sessions',template:/*ion-inline-start:"/home/travis/build/moodlehq/moodlemobile2/src/addon/mod/chat/pages/sessions/sessions.html"*/'<ion-header>\n    <ion-navbar core-back-button>\n        <ion-title>{{ \'addon.mod_chat.chatreport\' | translate }}</ion-title>\n    </ion-navbar>\n</ion-header>\n<core-split-view>\n    <ion-content>\n        <ion-refresher [enabled]="loaded" (ionRefresh)="refreshSessions($event)">\n            <ion-refresher-content pullingText="{{ \'core.pulltorefresh\' | translate }}"></ion-refresher-content>\n        </ion-refresher>\n        <core-loading [hideUntil]="loaded">\n            <ion-item text-wrap *ngIf="groupInfo && (groupInfo.separateGroups || groupInfo.visibleGroups)">\n                <ion-label id="addon-chat-groupslabel" *ngIf="groupInfo.separateGroups">{{ \'core.groupsseparate\' | translate }}</ion-label>\n                <ion-label id="addon-chat-groupslabel" *ngIf="groupInfo.visibleGroups">{{ \'core.groupsvisible\' | translate }}</ion-label>\n                <ion-select [(ngModel)]="groupId" (ionChange)="fetchSessions(true)" aria-labelledby="addon-chat-groupslabel" interface="action-sheet">\n                    <ion-option *ngFor="let groupOpt of groupInfo.groups" [value]="groupOpt.id">{{groupOpt.name}}</ion-option>\n                </ion-select>\n            </ion-item>\n            <ion-item>\n                <ion-label id="addon-chat-showalllabel">{{ \'addon.mod_chat.showincompletesessions\' | translate }}</ion-label>\n                <ion-toggle [(ngModel)]="showAll" (ionChange)="fetchSessions(true)" aria-labelledby="addon-chat-showalllabel"></ion-toggle>\n            </ion-item>\n            <ion-card *ngFor="let session of sessions" (click)="openSession(session)"\n                    [class.addon-mod-chat-session-selected]="session.sessionstart == selectedSessionStart && groupId == selectedSessionGroupId"\n                    [class.addon-mod-chat-session-show-more]="session.sessionusers.length < session.allsessionusers.length">\n                <ion-item text-wrap>\n                    <h2>{{ session.sessionstart * 1000 | coreFormatDate }}</h2>\n                    <p *ngIf="session.duration">{{ session.duration | coreDuration }}</p>\n                </ion-item>\n                <ion-card-content>\n                    <ion-item *ngFor="let user of session.sessionusers">\n                        {{ user.userfullname }} <span *ngIf="user.messagecount">({{ user.messagecount }})</span>\n                    </ion-item>\n                </ion-card-content>\n                <div *ngIf="session.sessionusers.length < session.allsessionusers.length">\n                    <button ion-button clear (click)="showMoreUsers(session, $event)">\n                        {{ \'core.showmore\' | translate }}\n                    </button>\n                </div>\n            </ion-card>\n            <core-empty-box *ngIf="sessions.length == 0" icon="chatbubbles" [message]="\'addon.mod_chat.nosessionsfound\' | translate">\n            </core-empty-box>\n        </core-loading>\n    </ion-content>\n</core-split-view>\n'/*ion-inline-end:"/home/travis/build/moodlehq/moodlemobile2/src/addon/mod/chat/pages/sessions/sessions.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* NavParams */], __WEBPACK_IMPORTED_MODULE_8__providers_chat__["a" /* AddonModChatProvider */], __WEBPACK_IMPORTED_MODULE_6__providers_utils_dom__["a" /* CoreDomUtilsProvider */],
            __WEBPACK_IMPORTED_MODULE_4__core_user_providers_user__["a" /* CoreUserProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_groups__["a" /* CoreGroupsProvider */],
            __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_7__providers_utils_utils__["a" /* CoreUtilsProvider */]])
    ], AddonModChatSessionsPage);
    return AddonModChatSessionsPage;
}());

//# sourceMappingURL=sessions.js.map

/***/ })

});
//# sourceMappingURL=109.js.map