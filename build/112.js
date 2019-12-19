webpackJsonp([112],{

/***/ 2110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddonModChatChatPageModule", function() { return AddonModChatChatPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__directives_directives_module__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pipes_pipes_module__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__chat__ = __webpack_require__(2257);
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







var AddonModChatChatPageModule = /** @class */ (function () {
    function AddonModChatChatPageModule() {
    }
    AddonModChatChatPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__chat__["a" /* AddonModChatChatPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* CoreComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_4__directives_directives_module__["a" /* CoreDirectivesModule */],
                __WEBPACK_IMPORTED_MODULE_5__pipes_pipes_module__["a" /* CorePipesModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_6__chat__["a" /* AddonModChatChatPage */]),
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */].forChild()
            ],
        })
    ], AddonModChatChatPageModule);
    return AddonModChatChatPageModule;
}());

//# sourceMappingURL=chat.module.js.map

/***/ }),

/***/ 2257:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddonModChatChatPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_app__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_events__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_logger__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_sites__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_utils_dom__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_chat__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_helper__ = __webpack_require__(996);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_network__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__classes_animations__ = __webpack_require__(425);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_send_message_form_send_message_form__ = __webpack_require__(1007);
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
 * Page that displays a chat session.
 */
var AddonModChatChatPage = /** @class */ (function () {
    function AddonModChatChatPage(navParams, logger, network, zone, navCtrl, chatProvider, appProvider, sitesProvider, modalCtrl, domUtils, eventsProvider, chatHelper) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.chatProvider = chatProvider;
        this.appProvider = appProvider;
        this.modalCtrl = modalCtrl;
        this.domUtils = domUtils;
        this.eventsProvider = eventsProvider;
        this.chatHelper = chatHelper;
        this.loaded = false;
        this.messages = [];
        this.lastTime = 0;
        this.oldContentHeight = 0;
        this.viewDestroyed = false;
        this.pollingRunning = false;
        this.users = [];
        this.chatId = navParams.get('chatId');
        this.courseId = navParams.get('courseId');
        this.title = navParams.get('title');
        this.cmId = navParams.get('cmId');
        this.logger = logger.getInstance('AddonModChoiceChoicePage');
        this.currentUserId = sitesProvider.getCurrentSiteUserId();
        this.isOnline = this.appProvider.isOnline();
        this.onlineObserver = network.onchange().subscribe(function () {
            // Execute the callback in the Angular zone, so change detection doesn't stop working.
            zone.run(function () {
                _this.isOnline = _this.appProvider.isOnline();
            });
        });
    }
    /**
     * View loaded.
     */
    AddonModChatChatPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.loginUser().then(function () {
            return _this.fetchMessages().then(function () {
                _this.startPolling();
            }).catch(function (error) {
                _this.domUtils.showErrorModalDefault(error, 'addon.mod_chat.errorwhileretrievingmessages', true);
                _this.navCtrl.pop();
            });
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'addon.mod_chat.errorwhileconnecting', true);
            _this.navCtrl.pop();
        }).finally(function () {
            _this.loaded = true;
        });
        // Recalculate footer position when keyboard is shown or hidden.
        this.keyboardObserver = this.eventsProvider.on(__WEBPACK_IMPORTED_MODULE_3__providers_events__["a" /* CoreEventsProvider */].KEYBOARD_CHANGE, function (kbHeight) {
            _this.content.resize();
        });
    };
    /**
     * Runs when the page has fully entered and is now the active page.
     * This event will fire, whether it was the first load or a cached page.
     */
    AddonModChatChatPage.prototype.ionViewDidEnter = function () {
        this.startPolling();
    };
    /**
     * Runs when the page is about to leave and no longer be the active page.
     */
    AddonModChatChatPage.prototype.ionViewWillLeave = function () {
        this.stopPolling();
    };
    /**
     * Display the chat users modal.
     */
    AddonModChatChatPage.prototype.showChatUsers = function () {
        var _this = this;
        // Create the toc modal.
        var modal = this.modalCtrl.create('AddonModChatUsersPage', {
            sessionId: this.sessionId
        }, { cssClass: 'core-modal-lateral',
            showBackdrop: true,
            enableBackdropDismiss: true,
            enterAnimation: 'core-modal-lateral-transition',
            leaveAnimation: 'core-modal-lateral-transition' });
        modal.onDidDismiss(function (data) {
            if (data && data.talkTo) {
                _this.newMessage = "To " + data.talkTo + ": " + (_this.sendMessageForm.message || '');
            }
            if (data && data.beepTo) {
                _this.sendMessage('', data.beepTo);
            }
            if (data && data.users) {
                _this.users = data.users;
            }
        });
        modal.present({
            ev: event
        });
    };
    /**
     * Get the user fullname for a beep.
     *
     * @param  id User Id before parsing.
     * @return User fullname.
     */
    AddonModChatChatPage.prototype.getUserFullname = function (id) {
        var _this = this;
        if (isNaN(parseInt(id, 10))) {
            return Promise.resolve(id);
        }
        var user = this.users.find(function (user) { return user.id == id; });
        if (user) {
            return Promise.resolve(user.fullname);
        }
        return this.chatProvider.getChatUsers(this.sessionId).then(function (data) {
            _this.users = data.users;
            var user = _this.users.find(function (user) { return user.id == id; });
            if (user) {
                return user.fullname;
            }
            return id;
        }).catch(function (error) {
            // Ignore errors.
            return id;
        });
    };
    /**
     * Convenience function to login the user.
     *
     * @return Promise resolved when done.
     */
    AddonModChatChatPage.prototype.loginUser = function () {
        var _this = this;
        return this.chatProvider.loginUser(this.chatId).then(function (sessionId) {
            _this.sessionId = sessionId;
        });
    };
    /**
     * Convenience function to fetch chat messages.
     *
     * @return Promise resolved when done.
     */
    AddonModChatChatPage.prototype.fetchMessages = function () {
        var _this = this;
        return this.chatProvider.getLatestMessages(this.sessionId, this.lastTime).then(function (messagesInfo) {
            _this.lastTime = messagesInfo.chatnewlasttime || 0;
            return _this.chatProvider.getMessagesUserData(messagesInfo.messages, _this.courseId).then(function (messages) {
                if (messages.length) {
                    var previousLength = _this.messages.length;
                    _this.messages = _this.messages.concat(messages);
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
                    for (var index = previousLength; index < _this.messages.length; index++) {
                        _loop_1(index);
                    }
                    _this.messages[_this.messages.length - 1].showTail = true;
                    // New messages or beeps, scroll to bottom.
                    setTimeout(function () { return _this.scrollToBottom(); });
                }
            });
        });
    };
    /**
     * Start the polling to get chat messages periodically.
     */
    AddonModChatChatPage.prototype.startPolling = function () {
        var _this = this;
        // We already have the polling in place.
        if (this.polling) {
            return;
        }
        // Start polling.
        this.polling = setInterval(function () {
            _this.fetchMessagesInterval().catch(function () {
                // Ignore errors.
            });
        }, __WEBPACK_IMPORTED_MODULE_7__providers_chat__["a" /* AddonModChatProvider */].POLL_INTERVAL);
    };
    /**
     * Stop polling for messages.
     */
    AddonModChatChatPage.prototype.stopPolling = function () {
        if (this.polling) {
            this.logger.debug('Cancelling polling for messages');
            clearInterval(this.polling);
        }
    };
    /**
     * Convenience function to be called every certain time to fetch chat messages.
     *
     * @return Promise resolved when done.
     */
    AddonModChatChatPage.prototype.fetchMessagesInterval = function () {
        var _this = this;
        this.logger.debug('Polling for messages');
        if (!this.isOnline || this.pollingRunning) {
            // Obviously we cannot check for new messages when the app is offline.
            return Promise.reject(null);
        }
        this.pollingRunning = true;
        return this.fetchMessages().catch(function () {
            // Try to login, it might have failed because the session expired.
            return _this.loginUser().then(function () {
                return _this.fetchMessages();
            }).catch(function (error) {
                // Fail again. Stop polling if needed.
                if (_this.polling) {
                    clearInterval(_this.polling);
                    _this.polling = undefined;
                }
                _this.domUtils.showErrorModalDefault(error, 'addon.mod_chat.errorwhileretrievingmessages', true);
                return Promise.reject(null);
            });
        }).finally(function () {
            _this.pollingRunning = false;
        });
    };
    /**
     * Send a message to the chat.
     *
     * @param text Text of the nessage.
     * @param beep ID of the user to beep.
     */
    AddonModChatChatPage.prototype.sendMessage = function (text, beep) {
        var _this = this;
        if (beep === void 0) { beep = 0; }
        if (!this.isOnline) {
            // Silent error, the view should prevent this.
            return;
        }
        else if (beep === 0 && !text.trim()) {
            // Silent error.
            return;
        }
        this.sending = true;
        this.chatProvider.sendMessage(this.sessionId, text, beep).then(function () {
            // Update messages to show the sent message.
            _this.fetchMessagesInterval().catch(function () {
                // Ignore errors.
            });
        }).catch(function (error) {
            /* Only close the keyboard if an error happens, we want the user to be able to send multiple
              messages without the keyboard being closed. */
            _this.appProvider.closeKeyboard();
            _this.newMessage = text;
            _this.domUtils.showErrorModalDefault(error, 'addon.mod_chat.errorwhilesendingmessage', true);
        }).finally(function () {
            _this.sending = false;
        });
    };
    AddonModChatChatPage.prototype.reconnect = function () {
        var _this = this;
        var modal = this.domUtils.showModalLoading();
        // Call startPolling would take a while for the first execution, so we'll execute it manually to check if it works now.
        return this.fetchMessagesInterval().then(function () {
            // It works, start the polling again.
            _this.startPolling();
        }).catch(function () {
            // Ignore errors.
        }).finally(function () {
            modal.dismiss();
        });
    };
    /**
     * Scroll bottom when render has finished.
     */
    AddonModChatChatPage.prototype.scrollToBottom = function () {
        var _this = this;
        // Need a timeout to leave time to the view to be rendered.
        setTimeout(function () {
            if (!_this.viewDestroyed) {
                _this.domUtils.scrollToBottom(_this.content, 0);
            }
        });
    };
    /**
     * Content or scroll has been resized. For content, only call it if it's been added on top.
     */
    AddonModChatChatPage.prototype.resizeContent = function () {
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
                _this.content.scrollTo(0, top, 0);
            }
        });
    };
    /**
     * Page destroyed.
     */
    AddonModChatChatPage.prototype.ngOnDestroy = function () {
        this.onlineObserver && this.onlineObserver.unsubscribe();
        this.keyboardObserver && this.keyboardObserver.off();
        this.stopPolling();
        this.viewDestroyed = true;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Content */])
    ], AddonModChatChatPage.prototype, "content", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_11__components_send_message_form_send_message_form__["a" /* CoreSendMessageFormComponent */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_11__components_send_message_form_send_message_form__["a" /* CoreSendMessageFormComponent */])
    ], AddonModChatChatPage.prototype, "sendMessageForm", void 0);
    AddonModChatChatPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-addon-mod-chat-chat',template:/*ion-inline-start:"/home/travis/build/moodlehq/moodlemobile2/src/addon/mod/chat/pages/chat/chat.html"*/'<ion-header>\n    <ion-navbar core-back-button>\n        <ion-title><core-format-text [text]="title" contextLevel="module" [contextInstanceId]="cmId" [courseId]="courseId"></core-format-text></ion-title>\n        <ion-buttons end>\n            <button *ngIf="loaded" ion-button icon-only (click)="showChatUsers()">\n                <ion-icon name="people"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n<ion-content class="has-footer">\n    <core-loading [hideUntil]="loaded">\n        <ion-list class="addon-messages-discussion-container safe-area-page" aria-live="polite">\n            <ng-container *ngFor="let message of messages; index as index; last as last">\n\n                <h6 text-center *ngIf="message.showDate" class="addon-messages-date">\n                    {{ message.timestamp * 1000 | coreFormatDate:"strftimedayshort" }}\n                </h6>\n\n                <div text-center *ngIf="message.special" class="addon-mod-chat-notice">\n                    <ion-badge text-wrap color="success" *ngIf="message.system && message.message == \'enter\'">\n                        <span><core-icon name="fa-sign-in"></core-icon> {{ message.timestamp * 1000 | coreFormatDate:"strftimetime" }} {{ \'addon.mod_chat.messageenter\' | translate:{$a: message.userfullname} }}</span>\n                    </ion-badge>\n\n                    <ion-badge text-wrap color="danger" *ngIf="message.system && message.message == \'exit\'">\n                        <span><core-icon name="fa-sign-out"></core-icon> {{ message.timestamp * 1000 | coreFormatDate:"strftimetime" }} {{ \'addon.mod_chat.messageexit\' | translate:{$a: message.userfullname} }}</span>\n                    </ion-badge>\n\n                    <ion-badge text-wrap color="primary" *ngIf="message.beep == \'all\'">\n                        <span><ion-icon name="notifications"></ion-icon> {{ message.timestamp * 1000 | coreFormatDate:"strftimetime" }}\n                        {{ \'addon.mod_chat.messagebeepseveryone\' | translate:{$a: message.userfullname} }} </span>\n                    </ion-badge>\n\n                    <ion-badge text-wrap color="primary" *ngIf="message.userid != currentUserId && message.beep == currentUserId">\n                        <span><ion-icon name="notifications"></ion-icon> {{ message.timestamp * 1000 | coreFormatDate:"strftimetime" }}\n                        {{ \'addon.mod_chat.messagebeepsyou\' | translate:{$a: message.userfullname} }} </span>\n                    </ion-badge>\n\n                    <ion-badge text-wrap color="light" *ngIf="message.userid == currentUserId && message.beep && message.beep != \'all\'">\n                        <span><ion-icon name="notifications"></ion-icon> {{ message.timestamp * 1000 | coreFormatDate:"strftimetime" }}\n                        {{ \'addon.mod_chat.messageyoubeep\' | translate:{$a: message.beepWho} }} </span>\n                    </ion-badge>\n\n                    <ion-badge text-wrap color="info" *ngIf="!message.system && !message.beep">\n                        <span><core-icon name="fa-asterisk"></core-icon> {{ message.timestamp * 1000 | coreFormatDate:"strftimetime" }}\n                            <strong>{{ message.userfullname }} <core-format-text [text]="message.message" contextLevel="module" [contextInstanceId]="cmId" [courseId]="courseId" (afterRender)="last && scrollToBottom()"></core-format-text></strong></span>\n                    </ion-badge>\n                </div>\n\n                <ion-item text-wrap *ngIf="!message.special" class="addon-message" [class.addon-message-mine]="message.userid == currentUserId" [class.addon-message-not-mine]="message.userid != currentUserId" [class.addon-message-no-user]="!message.showUserData" [@coreSlideInOut]="message.userid == currentUserId ? \'\' : \'fromLeft\'">\n                    <!-- User data. -->\n                    <h2 class="addon-message-user">\n                        <ion-avatar item-start core-user-avatar [user]="message" [linkProfile]="false" *ngIf="message.showUserData"></ion-avatar>\n                        <div *ngIf="message.showUserData">{{ message.userfullname }}</div>\n                        <ion-note>{{ message.timestamp * 1000 | coreFormatDate: "strftimetime" }}</ion-note>\n                    </h2>\n\n                    <p class="addon-message-text">\n                        <core-format-text [text]="message.message" contextLevel="module" [contextInstanceId]="cmId" [courseId]="courseId" (afterRender)="last && scrollToBottom()"></core-format-text>\n                    </p>\n                    <div class="tail" *ngIf="message.showTail"></div>\n                </ion-item>\n            </ng-container>\n\n        </ion-list>\n        <core-empty-box *ngIf="!messages || messages.length <= 0" icon="chatbubbles" [message]="\'addon.mod_chat.nomessages\' | translate"></core-empty-box>\n    </core-loading>\n</ion-content>\n<ion-footer color="light" class="footer-adjustable">\n    <ion-toolbar color="light" position="bottom">\n        <p text-center *ngIf="!isOnline">{{ \'addon.mod_chat.mustbeonlinetosendmessages\' | translate }}</p>\n        <core-send-message-form [sendDisabled]="sending" *ngIf="isOnline && polling && loaded" [message]="newMessage" (onSubmit)="sendMessage($event)" [placeholder]="\'addon.messages.newmessage\' | translate" (onResize)="resizeContent()"></core-send-message-form>\n        <button *ngIf="isOnline && !polling && loaded" (click)="reconnect()" ion-button block color="light">{{ \'core.login.reconnect\' | translate }}</button>\n    </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/home/travis/build/moodlehq/moodlemobile2/src/addon/mod/chat/pages/chat/chat.html"*/,
            animations: [__WEBPACK_IMPORTED_MODULE_10__classes_animations__["b" /* coreSlideInOut */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__providers_logger__["a" /* CoreLoggerProvider */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_network__["a" /* Network */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_7__providers_chat__["a" /* AddonModChatProvider */], __WEBPACK_IMPORTED_MODULE_2__providers_app__["a" /* CoreAppProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_sites__["a" /* CoreSitesProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ModalController */], __WEBPACK_IMPORTED_MODULE_6__providers_utils_dom__["a" /* CoreDomUtilsProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_events__["a" /* CoreEventsProvider */], __WEBPACK_IMPORTED_MODULE_8__providers_helper__["a" /* AddonModChatHelperProvider */]])
    ], AddonModChatChatPage);
    return AddonModChatChatPage;
}());

//# sourceMappingURL=chat.js.map

/***/ })

});
//# sourceMappingURL=112.js.map