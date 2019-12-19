webpackJsonp([15],{

/***/ 2129:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/@angular/core/esm5/core.js
var core = __webpack_require__(0);

// EXTERNAL MODULE: ./node_modules/ionic-angular/index.js + 3 modules
var ionic_angular = __webpack_require__(5);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/index.js + 1 modules
var _ngx_translate_core = __webpack_require__(3);

// EXTERNAL MODULE: ./src/components/components.module.ts
var components_module = __webpack_require__(28);

// EXTERNAL MODULE: ./src/directives/directives.module.ts + 2 modules
var directives_module = __webpack_require__(32);

// EXTERNAL MODULE: ./src/pipes/pipes.module.ts + 2 modules
var pipes_module = __webpack_require__(108);

// EXTERNAL MODULE: ./src/providers/app.ts
var app = __webpack_require__(9);

// EXTERNAL MODULE: ./src/providers/events.ts
var events = __webpack_require__(10);

// EXTERNAL MODULE: ./src/providers/logger.ts
var logger = __webpack_require__(6);

// EXTERNAL MODULE: ./src/providers/sites.ts
var sites = __webpack_require__(1);

// EXTERNAL MODULE: ./src/providers/utils/dom.ts
var dom = __webpack_require__(4);

// EXTERNAL MODULE: ./src/addon/mod/chat/providers/chat.ts
var chat = __webpack_require__(282);

// EXTERNAL MODULE: ./src/addon/mod/chat/providers/helper.ts
var helper = __webpack_require__(742);

// EXTERNAL MODULE: ./node_modules/@ionic-native/network/index.js
var network = __webpack_require__(188);

// EXTERNAL MODULE: ./src/classes/animations.ts
var animations = __webpack_require__(747);

// EXTERNAL MODULE: ./src/components/send-message-form/send-message-form.ts
var send_message_form = __webpack_require__(1552);

// CONCATENATED MODULE: ./src/addon/mod/chat/pages/chat/chat.ts
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
var chat_AddonModChatChatPage = /** @class */ (function () {
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
        this.keyboardObserver = this.eventsProvider.on(events["a" /* CoreEventsProvider */].KEYBOARD_CHANGE, function (kbHeight) {
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
        }, chat["a" /* AddonModChatProvider */].POLL_INTERVAL);
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
        Object(core["_9" /* ViewChild */])(ionic_angular["f" /* Content */]),
        __metadata("design:type", ionic_angular["f" /* Content */])
    ], AddonModChatChatPage.prototype, "content", void 0);
    __decorate([
        Object(core["_9" /* ViewChild */])(send_message_form["a" /* CoreSendMessageFormComponent */]),
        __metadata("design:type", send_message_form["a" /* CoreSendMessageFormComponent */])
    ], AddonModChatChatPage.prototype, "sendMessageForm", void 0);
    AddonModChatChatPage = __decorate([
        Object(core["m" /* Component */])({
            selector: 'page-addon-mod-chat-chat',
            templateUrl: 'chat.html',
            animations: [animations["b" /* coreSlideInOut */]]
        }),
        __metadata("design:paramtypes", [ionic_angular["t" /* NavParams */], logger["a" /* CoreLoggerProvider */], network["a" /* Network */], core["M" /* NgZone */], ionic_angular["s" /* NavController */],
            chat["a" /* AddonModChatProvider */], app["a" /* CoreAppProvider */], sites["a" /* CoreSitesProvider */],
            ionic_angular["q" /* ModalController */], dom["a" /* CoreDomUtilsProvider */],
            events["a" /* CoreEventsProvider */], helper["a" /* AddonModChatHelperProvider */]])
    ], AddonModChatChatPage);
    return AddonModChatChatPage;
}());

//# sourceMappingURL=chat.js.map
// CONCATENATED MODULE: ./src/addon/mod/chat/pages/chat/chat.module.ts
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
var chat_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var chat_module_AddonModChatChatPageModule = /** @class */ (function () {
    function AddonModChatChatPageModule() {
    }
    AddonModChatChatPageModule = chat_module___decorate([
        Object(core["I" /* NgModule */])({
            declarations: [
                chat_AddonModChatChatPage,
            ],
            imports: [
                components_module["a" /* CoreComponentsModule */],
                directives_module["a" /* CoreDirectivesModule */],
                pipes_module["a" /* CorePipesModule */],
                ionic_angular["l" /* IonicPageModule */].forChild(chat_AddonModChatChatPage),
                _ngx_translate_core["b" /* TranslateModule */].forChild()
            ],
        })
    ], AddonModChatChatPageModule);
    return AddonModChatChatPageModule;
}());

//# sourceMappingURL=chat.module.js.map
// EXTERNAL MODULE: ./node_modules/ionic-angular/components/action-sheet/action-sheet-component.ngfactory.js
var action_sheet_component_ngfactory = __webpack_require__(1524);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/alert/alert-component.ngfactory.js
var alert_component_ngfactory = __webpack_require__(1525);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/app/app-root.ngfactory.js
var app_root_ngfactory = __webpack_require__(1526);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/loading/loading-component.ngfactory.js
var loading_component_ngfactory = __webpack_require__(1527);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/modal/modal-component.ngfactory.js
var modal_component_ngfactory = __webpack_require__(1528);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/picker/picker-component.ngfactory.js + 1 modules
var picker_component_ngfactory = __webpack_require__(1529);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/popover/popover-component.ngfactory.js
var popover_component_ngfactory = __webpack_require__(1530);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/select/select-popover-component.ngfactory.js
var select_popover_component_ngfactory = __webpack_require__(1531);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toast/toast-component.ngfactory.js
var toast_component_ngfactory = __webpack_require__(1532);

// EXTERNAL MODULE: ./src/components/context-menu/context-menu-popover.ngfactory.js
var context_menu_popover_ngfactory = __webpack_require__(1533);

// EXTERNAL MODULE: ./src/components/course-picker-menu/course-picker-menu-popover.ngfactory.js
var course_picker_menu_popover_ngfactory = __webpack_require__(1534);

// EXTERNAL MODULE: ./src/components/recaptcha/recaptchamodal.ngfactory.js
var recaptchamodal_ngfactory = __webpack_require__(1535);

// EXTERNAL MODULE: ./src/components/bs-tooltip/bs-tooltip.ngfactory.js
var bs_tooltip_ngfactory = __webpack_require__(1536);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.ngfactory.js
var button_ngfactory = __webpack_require__(45);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.js
var button_button = __webpack_require__(41);

// EXTERNAL MODULE: ./node_modules/ionic-angular/config/config.js
var config = __webpack_require__(8);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/icon/icon.js
var icon = __webpack_require__(47);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/badge/badge.js
var badge = __webpack_require__(145);

// EXTERNAL MODULE: ./src/components/icon/icon.ngfactory.js
var icon_ngfactory = __webpack_require__(90);

// EXTERNAL MODULE: ./src/components/icon/icon.ts
var icon_icon = __webpack_require__(83);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.pipe.js
var translate_pipe = __webpack_require__(25);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.service.js
var translate_service = __webpack_require__(17);

// EXTERNAL MODULE: ./src/directives/format-text.ts
var format_text = __webpack_require__(48);

// EXTERNAL MODULE: ./src/providers/utils/text.ts
var utils_text = __webpack_require__(11);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/platform.js + 1 modules
var platform = __webpack_require__(16);

// EXTERNAL MODULE: ./src/providers/utils/utils.ts
var utils = __webpack_require__(2);

// EXTERNAL MODULE: ./src/providers/utils/url.ts
var url = __webpack_require__(22);

// EXTERNAL MODULE: ./src/providers/filepool.ts
var filepool = __webpack_require__(18);

// EXTERNAL MODULE: ./src/core/contentlinks/providers/helper.ts
var providers_helper = __webpack_require__(15);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-controller.js
var nav_controller = __webpack_require__(21);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.js
var content = __webpack_require__(29);

// EXTERNAL MODULE: ./src/components/split-view/split-view.ts
var split_view = __webpack_require__(27);

// EXTERNAL MODULE: ./src/providers/utils/iframe.ts
var iframe = __webpack_require__(43);

// EXTERNAL MODULE: ./src/core/filter/providers/filter.ts
var filter = __webpack_require__(42);

// EXTERNAL MODULE: ./src/core/filter/providers/helper.ts
var filter_providers_helper = __webpack_require__(31);

// EXTERNAL MODULE: ./src/core/filter/providers/delegate.ts
var delegate = __webpack_require__(36);

// EXTERNAL MODULE: ./node_modules/@angular/common/esm5/common.js
var common = __webpack_require__(7);

// EXTERNAL MODULE: ./src/components/user-avatar/user-avatar.ngfactory.js
var user_avatar_ngfactory = __webpack_require__(216);

// EXTERNAL MODULE: ./src/components/user-avatar/user-avatar.ts
var user_avatar = __webpack_require__(186);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/avatar/avatar.js
var avatar = __webpack_require__(162);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item.ngfactory.js + 1 modules
var item_ngfactory = __webpack_require__(30);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item.js
var item = __webpack_require__(20);

// EXTERNAL MODULE: ./node_modules/ionic-angular/util/form.js
var util_form = __webpack_require__(19);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-reorder.js + 1 modules
var item_reorder = __webpack_require__(26);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-content.js
var item_content = __webpack_require__(33);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/note/note.js
var note = __webpack_require__(252);

// EXTERNAL MODULE: ./src/components/empty-box/empty-box.ngfactory.js
var empty_box_ngfactory = __webpack_require__(127);

// EXTERNAL MODULE: ./src/components/empty-box/empty-box.ts
var empty_box = __webpack_require__(116);

// EXTERNAL MODULE: ./src/components/send-message-form/send-message-form.ngfactory.js
var send_message_form_ngfactory = __webpack_require__(2178);

// EXTERNAL MODULE: ./src/providers/config.ts
var providers_config = __webpack_require__(167);

// EXTERNAL MODULE: ./src/pipes/format-date.ts
var format_date = __webpack_require__(230);

// EXTERNAL MODULE: ./src/providers/utils/time.ts
var time = __webpack_require__(24);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-header.js
var toolbar_header = __webpack_require__(375);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/view-controller.js
var view_controller = __webpack_require__(39);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/navbar.ngfactory.js
var navbar_ngfactory = __webpack_require__(725);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/navbar.js
var navbar = __webpack_require__(214);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/app/app.js + 3 modules
var app_app = __webpack_require__(35);

// EXTERNAL MODULE: ./src/directives/back-button.ts
var back_button = __webpack_require__(478);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.ngfactory.js
var toolbar_title_ngfactory = __webpack_require__(726);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.js
var toolbar_title = __webpack_require__(316);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar.js
var toolbar = __webpack_require__(251);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-item.js
var toolbar_item = __webpack_require__(376);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.ngfactory.js
var content_ngfactory = __webpack_require__(185);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/dom-controller.js
var dom_controller = __webpack_require__(34);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/keyboard.js
var keyboard = __webpack_require__(109);

// EXTERNAL MODULE: ./src/components/loading/loading.ngfactory.js
var loading_ngfactory = __webpack_require__(54);

// EXTERNAL MODULE: ./src/components/loading/loading.ts
var loading = __webpack_require__(51);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/list/list.js + 1 modules
var list = __webpack_require__(89);

// EXTERNAL MODULE: ./node_modules/ionic-angular/gestures/gesture-controller.js
var gesture_controller = __webpack_require__(44);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-footer.js
var toolbar_footer = __webpack_require__(748);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar.ngfactory.js
var toolbar_ngfactory = __webpack_require__(2174);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-params.js
var nav_params = __webpack_require__(70);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/modal/modal-controller.js
var modal_controller = __webpack_require__(164);

// CONCATENATED MODULE: ./src/addon/mod/chat/pages/chat/chat.ngfactory.js
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 







































































var styles_AddonModChatChatPage = [];
var RenderType_AddonModChatChatPage = core["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_AddonModChatChatPage, data: { "animation": [{ type: 7, name: "coreSlideInOut", definitions: [{ type: 1, expr: "void => fromLeft", animation: [{ type: 6, styles: { transform: "translateX(0)", opacity: 1 }, offset: null }, { type: 4, styles: { type: 5, steps: [{ type: 6, styles: { opacity: 0, transform: "translateX(-100%)", offset: 0 }, offset: null }, { type: 6, styles: { opacity: 1, transform: "translateX(5%)", offset: 0.7 }, offset: null }, { type: 6, styles: { opacity: 1, transform: "translateX(0)", offset: 1 }, offset: null }] }, timings: 300 }], options: null }, { type: 1, expr: "fromLeft => void", animation: [{ type: 6, styles: { transform: "translateX(-100%)", opacity: 0 }, offset: null }, { type: 4, styles: { type: 5, steps: [{ type: 6, styles: { opacity: 1, transform: "translateX(0)", offset: 0 }, offset: null }, { type: 6, styles: { opacity: 1, transform: "translateX(5%)", offset: 0.3 }, offset: null }, { type: 6, styles: { opacity: 0, transform: "translateX(-100%)", offset: 1 }, offset: null }] }, timings: 300 }], options: null }, { type: 1, expr: "void => fromRight", animation: [{ type: 6, styles: { transform: "translateX(0)", opacity: 1 }, offset: null }, { type: 4, styles: { type: 5, steps: [{ type: 6, styles: { opacity: 0, transform: "translateX(100%)", offset: 0 }, offset: null }, { type: 6, styles: { opacity: 1, transform: "translateX(-5%)", offset: 0.7 }, offset: null }, { type: 6, styles: { opacity: 1, transform: "translateX(0)", offset: 1 }, offset: null }] }, timings: 300 }], options: null }, { type: 1, expr: "fromRight => void", animation: [{ type: 6, styles: { transform: "translateX(-100%)", opacity: 0 }, offset: null }, { type: 4, styles: { type: 5, steps: [{ type: 6, styles: { opacity: 1, transform: "translateX(0)", offset: 0 }, offset: null }, { type: 6, styles: { opacity: 1, transform: "translateX(-5%)", offset: 0.3 }, offset: null }, { type: 6, styles: { opacity: 0, transform: "translateX(100%)", offset: 1 }, offset: null }] }, timings: 300 }], options: null }], options: {} }] } });

function View_AddonModChatChatPage_1(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 5, "button", [["icon-only", ""], ["ion-button", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.showChatUsers() !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](1, 1097728, [[3, 4]], 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, 0, 1, "ion-icon", [["name", "people"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](4, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n            "]))], function (_ck, _v) { var currVal_1 = "people"; _ck(_v, 4, 0, currVal_1); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 4)._hidden; _ck(_v, 3, 0, currVal_0); }); }
function View_AddonModChatChatPage_3(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "h6", [["class", "addon-messages-date"], ["text-center", ""]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](1, null, ["\n                    ", "\n                "])), core["_49" /* ɵppd */](2, 2)], null, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 1, 0, _ck(_v, 2, 0, core["_44" /* ɵnov */](_v.parent.parent, 0), (_v.parent.context.$implicit.timestamp * 1000), "strftimedayshort")); _ck(_v, 1, 0, currVal_0); }); }
function View_AddonModChatChatPage_5(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 10, "ion-badge", [["color", "success"], ["text-wrap", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, badge["a" /* Badge */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { color: [0, "color"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 6, "span", [], null, null, null, null, null)), (_l()(), core["_31" /* ɵeld */](4, 0, null, null, 1, "core-icon", [["name", "fa-sign-in"]], null, null, null, icon_ngfactory["b" /* View_CoreIconComponent_0 */], icon_ngfactory["a" /* RenderType_CoreIconComponent */])), core["_30" /* ɵdid */](5, 704512, null, 0, icon_icon["a" /* CoreIconComponent */], [core["t" /* ElementRef */], config["a" /* Config */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ɵted */](6, null, [" ", " ", ""])), core["_49" /* ɵppd */](7, 2), core["_48" /* ɵpod */](8, { $a: 0 }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "]))], function (_ck, _v) { var currVal_0 = "success"; _ck(_v, 1, 0, currVal_0); var currVal_1 = "fa-sign-in"; _ck(_v, 5, 0, currVal_1); }, function (_ck, _v) { var currVal_2 = core["_56" /* ɵunv */](_v, 6, 0, _ck(_v, 7, 0, core["_44" /* ɵnov */](_v.parent.parent.parent, 0), (_v.parent.parent.context.$implicit.timestamp * 1000), "strftimetime")); var currVal_3 = core["_56" /* ɵunv */](_v, 6, 1, core["_44" /* ɵnov */](_v, 9).transform("addon.mod_chat.messageenter", _ck(_v, 8, 0, _v.parent.parent.context.$implicit.userfullname))); _ck(_v, 6, 0, currVal_2, currVal_3); }); }
function View_AddonModChatChatPage_6(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 10, "ion-badge", [["color", "danger"], ["text-wrap", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, badge["a" /* Badge */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { color: [0, "color"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 6, "span", [], null, null, null, null, null)), (_l()(), core["_31" /* ɵeld */](4, 0, null, null, 1, "core-icon", [["name", "fa-sign-out"]], null, null, null, icon_ngfactory["b" /* View_CoreIconComponent_0 */], icon_ngfactory["a" /* RenderType_CoreIconComponent */])), core["_30" /* ɵdid */](5, 704512, null, 0, icon_icon["a" /* CoreIconComponent */], [core["t" /* ElementRef */], config["a" /* Config */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ɵted */](6, null, [" ", " ", ""])), core["_49" /* ɵppd */](7, 2), core["_48" /* ɵpod */](8, { $a: 0 }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "]))], function (_ck, _v) { var currVal_0 = "danger"; _ck(_v, 1, 0, currVal_0); var currVal_1 = "fa-sign-out"; _ck(_v, 5, 0, currVal_1); }, function (_ck, _v) { var currVal_2 = core["_56" /* ɵunv */](_v, 6, 0, _ck(_v, 7, 0, core["_44" /* ɵnov */](_v.parent.parent.parent, 0), (_v.parent.parent.context.$implicit.timestamp * 1000), "strftimetime")); var currVal_3 = core["_56" /* ɵunv */](_v, 6, 1, core["_44" /* ɵnov */](_v, 9).transform("addon.mod_chat.messageexit", _ck(_v, 8, 0, _v.parent.parent.context.$implicit.userfullname))); _ck(_v, 6, 0, currVal_2, currVal_3); }); }
function View_AddonModChatChatPage_7(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 10, "ion-badge", [["color", "primary"], ["text-wrap", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, badge["a" /* Badge */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { color: [0, "color"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 6, "span", [], null, null, null, null, null)), (_l()(), core["_31" /* ɵeld */](4, 0, null, null, 1, "ion-icon", [["name", "notifications"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](5, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ɵted */](6, null, [" ", "\n                        ", " "])), core["_49" /* ɵppd */](7, 2), core["_48" /* ɵpod */](8, { $a: 0 }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "]))], function (_ck, _v) { var currVal_0 = "primary"; _ck(_v, 1, 0, currVal_0); var currVal_2 = "notifications"; _ck(_v, 5, 0, currVal_2); }, function (_ck, _v) { var currVal_1 = core["_44" /* ɵnov */](_v, 5)._hidden; _ck(_v, 4, 0, currVal_1); var currVal_3 = core["_56" /* ɵunv */](_v, 6, 0, _ck(_v, 7, 0, core["_44" /* ɵnov */](_v.parent.parent.parent, 0), (_v.parent.parent.context.$implicit.timestamp * 1000), "strftimetime")); var currVal_4 = core["_56" /* ɵunv */](_v, 6, 1, core["_44" /* ɵnov */](_v, 9).transform("addon.mod_chat.messagebeepseveryone", _ck(_v, 8, 0, _v.parent.parent.context.$implicit.userfullname))); _ck(_v, 6, 0, currVal_3, currVal_4); }); }
function View_AddonModChatChatPage_8(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 10, "ion-badge", [["color", "primary"], ["text-wrap", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, badge["a" /* Badge */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { color: [0, "color"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 6, "span", [], null, null, null, null, null)), (_l()(), core["_31" /* ɵeld */](4, 0, null, null, 1, "ion-icon", [["name", "notifications"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](5, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ɵted */](6, null, [" ", "\n                        ", " "])), core["_49" /* ɵppd */](7, 2), core["_48" /* ɵpod */](8, { $a: 0 }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "]))], function (_ck, _v) { var currVal_0 = "primary"; _ck(_v, 1, 0, currVal_0); var currVal_2 = "notifications"; _ck(_v, 5, 0, currVal_2); }, function (_ck, _v) { var currVal_1 = core["_44" /* ɵnov */](_v, 5)._hidden; _ck(_v, 4, 0, currVal_1); var currVal_3 = core["_56" /* ɵunv */](_v, 6, 0, _ck(_v, 7, 0, core["_44" /* ɵnov */](_v.parent.parent.parent, 0), (_v.parent.parent.context.$implicit.timestamp * 1000), "strftimetime")); var currVal_4 = core["_56" /* ɵunv */](_v, 6, 1, core["_44" /* ɵnov */](_v, 9).transform("addon.mod_chat.messagebeepsyou", _ck(_v, 8, 0, _v.parent.parent.context.$implicit.userfullname))); _ck(_v, 6, 0, currVal_3, currVal_4); }); }
function View_AddonModChatChatPage_9(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 10, "ion-badge", [["color", "light"], ["text-wrap", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, badge["a" /* Badge */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { color: [0, "color"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 6, "span", [], null, null, null, null, null)), (_l()(), core["_31" /* ɵeld */](4, 0, null, null, 1, "ion-icon", [["name", "notifications"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](5, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ɵted */](6, null, [" ", "\n                        ", " "])), core["_49" /* ɵppd */](7, 2), core["_48" /* ɵpod */](8, { $a: 0 }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "]))], function (_ck, _v) { var currVal_0 = "light"; _ck(_v, 1, 0, currVal_0); var currVal_2 = "notifications"; _ck(_v, 5, 0, currVal_2); }, function (_ck, _v) { var currVal_1 = core["_44" /* ɵnov */](_v, 5)._hidden; _ck(_v, 4, 0, currVal_1); var currVal_3 = core["_56" /* ɵunv */](_v, 6, 0, _ck(_v, 7, 0, core["_44" /* ɵnov */](_v.parent.parent.parent, 0), (_v.parent.parent.context.$implicit.timestamp * 1000), "strftimetime")); var currVal_4 = core["_56" /* ɵunv */](_v, 6, 1, core["_44" /* ɵnov */](_v, 9).transform("addon.mod_chat.messageyoubeep", _ck(_v, 8, 0, _v.parent.parent.context.$implicit.beepWho))); _ck(_v, 6, 0, currVal_3, currVal_4); }); }
function View_AddonModChatChatPage_10(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 12, "ion-badge", [["color", "info"], ["text-wrap", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, badge["a" /* Badge */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { color: [0, "color"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 8, "span", [], null, null, null, null, null)), (_l()(), core["_31" /* ɵeld */](4, 0, null, null, 1, "core-icon", [["name", "fa-asterisk"]], null, null, null, icon_ngfactory["b" /* View_CoreIconComponent_0 */], icon_ngfactory["a" /* RenderType_CoreIconComponent */])), core["_30" /* ɵdid */](5, 704512, null, 0, icon_icon["a" /* CoreIconComponent */], [core["t" /* ElementRef */], config["a" /* Config */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ɵted */](6, null, [" ", "\n                            "])), core["_49" /* ɵppd */](7, 2), (_l()(), core["_31" /* ɵeld */](8, 0, null, null, 3, "strong", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](9, null, ["", " "])), (_l()(), core["_31" /* ɵeld */](10, 16777216, null, null, 1, "core-format-text", [["contextLevel", "module"]], null, [[null, "afterRender"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("afterRender" === en)) {
        var pd_0 = ((_v.parent.parent.context.last && _co.scrollToBottom()) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), core["_30" /* ɵdid */](11, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform["a" /* Platform */], utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], app["a" /* CoreAppProvider */], providers_helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */], filter["a" /* CoreFilterProvider */], filter_providers_helper["a" /* CoreFilterHelperProvider */], delegate["a" /* CoreFilterDelegate */], core["_11" /* ViewContainerRef */]], { text: [0, "text"], contextLevel: [1, "contextLevel"], contextInstanceId: [2, "contextInstanceId"], courseId: [3, "courseId"] }, { afterRender: "afterRender" }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = "info"; _ck(_v, 1, 0, currVal_0); var currVal_1 = "fa-asterisk"; _ck(_v, 5, 0, currVal_1); var currVal_4 = _v.parent.parent.context.$implicit.message; var currVal_5 = "module"; var currVal_6 = _co.cmId; var currVal_7 = _co.courseId; _ck(_v, 11, 0, currVal_4, currVal_5, currVal_6, currVal_7); }, function (_ck, _v) { var currVal_2 = core["_56" /* ɵunv */](_v, 6, 0, _ck(_v, 7, 0, core["_44" /* ɵnov */](_v.parent.parent.parent, 0), (_v.parent.parent.context.$implicit.timestamp * 1000), "strftimetime")); _ck(_v, 6, 0, currVal_2); var currVal_3 = _v.parent.parent.context.$implicit.userfullname; _ck(_v, 9, 0, currVal_3); }); }
function View_AddonModChatChatPage_4(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 19, "div", [["class", "addon-mod-chat-notice"], ["text-center", ""]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModChatChatPage_5)), core["_30" /* ɵdid */](3, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModChatChatPage_6)), core["_30" /* ɵdid */](6, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModChatChatPage_7)), core["_30" /* ɵdid */](9, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModChatChatPage_8)), core["_30" /* ɵdid */](12, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModChatChatPage_9)), core["_30" /* ɵdid */](15, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModChatChatPage_10)), core["_30" /* ɵdid */](18, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = (_v.parent.context.$implicit.system && (_v.parent.context.$implicit.message == "enter")); _ck(_v, 3, 0, currVal_0); var currVal_1 = (_v.parent.context.$implicit.system && (_v.parent.context.$implicit.message == "exit")); _ck(_v, 6, 0, currVal_1); var currVal_2 = (_v.parent.context.$implicit.beep == "all"); _ck(_v, 9, 0, currVal_2); var currVal_3 = ((_v.parent.context.$implicit.userid != _co.currentUserId) && (_v.parent.context.$implicit.beep == _co.currentUserId)); _ck(_v, 12, 0, currVal_3); var currVal_4 = (((_v.parent.context.$implicit.userid == _co.currentUserId) && _v.parent.context.$implicit.beep) && (_v.parent.context.$implicit.beep != "all")); _ck(_v, 15, 0, currVal_4); var currVal_5 = (!_v.parent.context.$implicit.system && !_v.parent.context.$implicit.beep); _ck(_v, 18, 0, currVal_5); }, null); }
function View_AddonModChatChatPage_12(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "ion-avatar", [["core-user-avatar", ""], ["item-start", ""]], null, null, null, user_avatar_ngfactory["b" /* View_CoreUserAvatarComponent_0 */], user_avatar_ngfactory["a" /* RenderType_CoreUserAvatarComponent */])), core["_30" /* ɵdid */](1, 770048, null, 0, user_avatar["a" /* CoreUserAvatarComponent */], [nav_controller["a" /* NavController */], sites["a" /* CoreSitesProvider */], utils["a" /* CoreUtilsProvider */], app["a" /* CoreAppProvider */], events["a" /* CoreEventsProvider */], [2, split_view["a" /* CoreSplitViewComponent */]]], { user: [0, "user"], linkProfile: [1, "linkProfile"] }, null), core["_30" /* ɵdid */](2, 16384, null, 0, avatar["a" /* Avatar */], [], null, null)], function (_ck, _v) { var currVal_0 = _v.parent.parent.context.$implicit; var currVal_1 = false; _ck(_v, 1, 0, currVal_0, currVal_1); }, null); }
function View_AddonModChatChatPage_13(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "div", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](1, null, ["", ""]))], null, function (_ck, _v) { var currVal_0 = _v.parent.parent.context.$implicit.userfullname; _ck(_v, 1, 0, currVal_0); }); }
function View_AddonModChatChatPage_14(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 0, "div", [["class", "tail"]], null, null, null, null, null))], null, null); }
function View_AddonModChatChatPage_11(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 30, "ion-item", [["class", "addon-message item item-block"], ["text-wrap", ""]], [[2, "addon-message-mine", null], [2, "addon-message-not-mine", null], [2, "addon-message-no-user", null], [24, "@coreSlideInOut", 0]], null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 4, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 5, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 6, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](8, 0, null, 2, 12, "h2", [["class", "addon-message-user"]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModChatChatPage_12)), core["_30" /* ɵdid */](11, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModChatChatPage_13)), core["_30" /* ɵdid */](14, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](16, 0, null, null, 3, "ion-note", [], null, null, null, null, null)), core["_30" /* ɵdid */](17, 16384, null, 0, note["a" /* Note */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](18, null, ["", ""])), core["_49" /* ɵppd */](19, 2), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n\n                    "])), (_l()(), core["_31" /* ɵeld */](22, 0, null, 2, 4, "p", [["class", "addon-message-text"]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](24, 16777216, null, null, 1, "core-format-text", [["contextLevel", "module"]], null, [[null, "afterRender"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("afterRender" === en)) {
        var pd_0 = ((_v.parent.context.last && _co.scrollToBottom()) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), core["_30" /* ɵdid */](25, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform["a" /* Platform */], utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], app["a" /* CoreAppProvider */], providers_helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */], filter["a" /* CoreFilterProvider */], filter_providers_helper["a" /* CoreFilterHelperProvider */], delegate["a" /* CoreFilterDelegate */], core["_11" /* ViewContainerRef */]], { text: [0, "text"], contextLevel: [1, "contextLevel"], contextInstanceId: [2, "contextInstanceId"], courseId: [3, "courseId"] }, { afterRender: "afterRender" }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, 2, 1, null, View_AddonModChatChatPage_14)), core["_30" /* ɵdid */](29, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "]))], function (_ck, _v) { var _co = _v.component; var currVal_4 = _v.parent.context.$implicit.showUserData; _ck(_v, 11, 0, currVal_4); var currVal_5 = _v.parent.context.$implicit.showUserData; _ck(_v, 14, 0, currVal_5); var currVal_7 = _v.parent.context.$implicit.message; var currVal_8 = "module"; var currVal_9 = _co.cmId; var currVal_10 = _co.courseId; _ck(_v, 25, 0, currVal_7, currVal_8, currVal_9, currVal_10); var currVal_11 = _v.parent.context.$implicit.showTail; _ck(_v, 29, 0, currVal_11); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = (_v.parent.context.$implicit.userid == _co.currentUserId); var currVal_1 = (_v.parent.context.$implicit.userid != _co.currentUserId); var currVal_2 = !_v.parent.context.$implicit.showUserData; var currVal_3 = ((_v.parent.context.$implicit.userid == _co.currentUserId) ? "" : "fromLeft"); _ck(_v, 0, 0, currVal_0, currVal_1, currVal_2, currVal_3); var currVal_6 = core["_56" /* ɵunv */](_v, 18, 0, _ck(_v, 19, 0, core["_44" /* ɵnov */](_v.parent.parent, 0), (_v.parent.context.$implicit.timestamp * 1000), "strftimetime")); _ck(_v, 18, 0, currVal_6); }); }
function View_AddonModChatChatPage_2(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 10, null, null, null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModChatChatPage_3)), core["_30" /* ɵdid */](3, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModChatChatPage_4)), core["_30" /* ɵdid */](6, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModChatChatPage_11)), core["_30" /* ɵdid */](9, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "]))], function (_ck, _v) { var currVal_0 = _v.context.$implicit.showDate; _ck(_v, 3, 0, currVal_0); var currVal_1 = _v.context.$implicit.special; _ck(_v, 6, 0, currVal_1); var currVal_2 = !_v.context.$implicit.special; _ck(_v, 9, 0, currVal_2); }, null); }
function View_AddonModChatChatPage_15(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "core-empty-box", [["icon", "chatbubbles"]], null, null, null, empty_box_ngfactory["b" /* View_CoreEmptyBoxComponent_0 */], empty_box_ngfactory["a" /* RenderType_CoreEmptyBoxComponent */])), core["_30" /* ɵdid */](1, 49152, null, 0, empty_box["a" /* CoreEmptyBoxComponent */], [], { message: [0, "message"], icon: [1, "icon"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 1, 0, core["_44" /* ɵnov */](_v, 2).transform("addon.mod_chat.nomessages")); var currVal_1 = "chatbubbles"; _ck(_v, 1, 0, currVal_0, currVal_1); }, null); }
function View_AddonModChatChatPage_16(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "p", [["text-center", ""]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](1, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], null, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 1, 0, core["_44" /* ɵnov */](_v, 2).transform("addon.mod_chat.mustbeonlinetosendmessages")); _ck(_v, 1, 0, currVal_0); }); }
function View_AddonModChatChatPage_17(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "core-send-message-form", [], null, [[null, "onSubmit"], [null, "onResize"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("onSubmit" === en)) {
        var pd_0 = (_co.sendMessage($event) !== false);
        ad = (pd_0 && ad);
    } if (("onResize" === en)) {
        var pd_1 = (_co.resizeContent() !== false);
        ad = (pd_1 && ad);
    } return ad; }, send_message_form_ngfactory["b" /* View_CoreSendMessageFormComponent_0 */], send_message_form_ngfactory["a" /* RenderType_CoreSendMessageFormComponent */])), core["_30" /* ɵdid */](1, 114688, [[2, 4]], 0, send_message_form["a" /* CoreSendMessageFormComponent */], [utils["a" /* CoreUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], providers_config["a" /* CoreConfigProvider */], events["a" /* CoreEventsProvider */], sites["a" /* CoreSitesProvider */], app["a" /* CoreAppProvider */]], { message: [0, "message"], placeholder: [1, "placeholder"], sendDisabled: [2, "sendDisabled"] }, { onSubmit: "onSubmit", onResize: "onResize" }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.newMessage; var currVal_1 = core["_56" /* ɵunv */](_v, 1, 1, core["_44" /* ɵnov */](_v, 2).transform("addon.messages.newmessage")); var currVal_2 = _co.sending; _ck(_v, 1, 0, currVal_0, currVal_1, currVal_2); }, null); }
function View_AddonModChatChatPage_18(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 3, "button", [["block", ""], ["color", "light"], ["ion-button", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.reconnect() !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](1, 1097728, null, 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { color: [0, "color"], block: [1, "block"] }, null), (_l()(), core["_55" /* ɵted */](2, 0, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], function (_ck, _v) { var currVal_0 = "light"; var currVal_1 = ""; _ck(_v, 1, 0, currVal_0, currVal_1); }, function (_ck, _v) { var currVal_2 = core["_56" /* ɵunv */](_v, 2, 0, core["_44" /* ɵnov */](_v, 3).transform("core.login.reconnect")); _ck(_v, 2, 0, currVal_2); }); }
function View_AddonModChatChatPage_0(_l) { return core["_57" /* ɵvid */](0, [core["_47" /* ɵpid */](0, format_date["a" /* CoreFormatDatePipe */], [logger["a" /* CoreLoggerProvider */], time["a" /* CoreTimeUtilsProvider */]]), core["_52" /* ɵqud */](402653184, 1, { content: 0 }), core["_52" /* ɵqud */](671088640, 2, { sendMessageForm: 0 }), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 20, "ion-header", [], null, null, null, null, null)), core["_30" /* ɵdid */](4, 16384, null, 0, toolbar_header["a" /* Header */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, view_controller["a" /* ViewController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_31" /* ɵeld */](6, 0, null, null, 16, "ion-navbar", [["class", "toolbar"], ["core-back-button", ""]], [[8, "hidden", 0], [2, "statusbar-padding", null]], null, null, navbar_ngfactory["b" /* View_Navbar_0 */], navbar_ngfactory["a" /* RenderType_Navbar */])), core["_30" /* ɵdid */](7, 49152, null, 0, navbar["a" /* Navbar */], [app_app["a" /* App */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_30" /* ɵdid */](8, 212992, null, 0, back_button["a" /* CoreBackButtonDirective */], [navbar["a" /* Navbar */], platform["a" /* Platform */], translate_service["a" /* TranslateService */], events["a" /* CoreEventsProvider */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n        "])), (_l()(), core["_31" /* ɵeld */](10, 0, null, 3, 3, "ion-title", [], null, null, null, toolbar_title_ngfactory["b" /* View_ToolbarTitle_0 */], toolbar_title_ngfactory["a" /* RenderType_ToolbarTitle */])), core["_30" /* ɵdid */](11, 49152, null, 0, toolbar_title["a" /* ToolbarTitle */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), (_l()(), core["_31" /* ɵeld */](12, 16777216, null, 0, 1, "core-format-text", [["contextLevel", "module"]], null, null, null, null, null)), core["_30" /* ɵdid */](13, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform["a" /* Platform */], utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], app["a" /* CoreAppProvider */], providers_helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */], filter["a" /* CoreFilterProvider */], filter_providers_helper["a" /* CoreFilterHelperProvider */], delegate["a" /* CoreFilterDelegate */], core["_11" /* ViewContainerRef */]], { text: [0, "text"], contextLevel: [1, "contextLevel"], contextInstanceId: [2, "contextInstanceId"], courseId: [3, "courseId"] }, null), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n        "])), (_l()(), core["_31" /* ɵeld */](15, 0, null, 2, 6, "ion-buttons", [["end", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](16, 16384, null, 1, toolbar_item["a" /* ToolbarItem */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), core["_52" /* ɵqud */](603979776, 3, { _buttons: 1 }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModChatChatPage_1)), core["_30" /* ɵdid */](20, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_31" /* ɵeld */](25, 0, null, null, 16, "ion-content", [["class", "has-footer"]], [[2, "statusbar-padding", null], [2, "has-refresher", null]], null, null, content_ngfactory["b" /* View_Content_0 */], content_ngfactory["a" /* RenderType_Content */])), core["_30" /* ɵdid */](26, 4374528, [[1, 4]], 0, content["a" /* Content */], [config["a" /* Config */], platform["a" /* Platform */], dom_controller["a" /* DomController */], core["t" /* ElementRef */], core["V" /* Renderer */], app_app["a" /* App */], keyboard["a" /* Keyboard */], core["M" /* NgZone */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n    "])), (_l()(), core["_31" /* ɵeld */](28, 0, null, 1, 12, "core-loading", [], null, null, null, loading_ngfactory["b" /* View_CoreLoadingComponent_0 */], loading_ngfactory["a" /* RenderType_CoreLoadingComponent */])), core["_30" /* ɵdid */](29, 638976, null, 0, loading["a" /* CoreLoadingComponent */], [translate_service["a" /* TranslateService */], core["t" /* ElementRef */], events["a" /* CoreEventsProvider */], utils["a" /* CoreUtilsProvider */]], { hideUntil: [0, "hideUntil"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_31" /* ɵeld */](31, 0, null, 0, 5, "ion-list", [["aria-live", "polite"], ["class", "addon-messages-discussion-container safe-area-page"]], null, null, null, null, null)), core["_30" /* ɵdid */](32, 16384, null, 0, list["a" /* List */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], platform["a" /* Platform */], gesture_controller["l" /* GestureController */], dom_controller["a" /* DomController */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModChatChatPage_2)), core["_30" /* ɵdid */](35, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n        "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonModChatChatPage_15)), core["_30" /* ɵdid */](39, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_31" /* ɵeld */](43, 0, null, null, 15, "ion-footer", [["class", "footer-adjustable"], ["color", "light"]], null, null, null, null, null)), core["_30" /* ɵdid */](44, 16384, null, 0, toolbar_footer["a" /* Footer */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, view_controller["a" /* ViewController */]]], { color: [0, "color"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_31" /* ɵeld */](46, 0, null, null, 11, "ion-toolbar", [["class", "toolbar"], ["color", "light"], ["position", "bottom"]], [[2, "statusbar-padding", null]], null, null, toolbar_ngfactory["b" /* View_Toolbar_0 */], toolbar_ngfactory["a" /* RenderType_Toolbar */])), core["_30" /* ɵdid */](47, 49152, null, 0, toolbar["a" /* Toolbar */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { color: [0, "color"] }, null), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 3, 1, null, View_AddonModChatChatPage_16)), core["_30" /* ɵdid */](50, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 3, 1, null, View_AddonModChatChatPage_17)), core["_30" /* ɵdid */](53, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 3, 1, null, View_AddonModChatChatPage_18)), core["_30" /* ɵdid */](56, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; _ck(_v, 8, 0); var currVal_2 = _co.title; var currVal_3 = "module"; var currVal_4 = _co.cmId; var currVal_5 = _co.courseId; _ck(_v, 13, 0, currVal_2, currVal_3, currVal_4, currVal_5); var currVal_6 = _co.loaded; _ck(_v, 20, 0, currVal_6); var currVal_9 = _co.loaded; _ck(_v, 29, 0, currVal_9); var currVal_10 = _co.messages; _ck(_v, 35, 0, currVal_10); var currVal_11 = (!_co.messages || (_co.messages.length <= 0)); _ck(_v, 39, 0, currVal_11); var currVal_12 = "light"; _ck(_v, 44, 0, currVal_12); var currVal_14 = "light"; _ck(_v, 47, 0, currVal_14); var currVal_15 = !_co.isOnline; _ck(_v, 50, 0, currVal_15); var currVal_16 = ((_co.isOnline && _co.polling) && _co.loaded); _ck(_v, 53, 0, currVal_16); var currVal_17 = ((_co.isOnline && !_co.polling) && _co.loaded); _ck(_v, 56, 0, currVal_17); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 7)._hidden; var currVal_1 = core["_44" /* ɵnov */](_v, 7)._sbPadding; _ck(_v, 6, 0, currVal_0, currVal_1); var currVal_7 = core["_44" /* ɵnov */](_v, 26).statusbarPadding; var currVal_8 = core["_44" /* ɵnov */](_v, 26)._hasRefresher; _ck(_v, 25, 0, currVal_7, currVal_8); var currVal_13 = core["_44" /* ɵnov */](_v, 47)._sbPadding; _ck(_v, 46, 0, currVal_13); }); }
function View_AddonModChatChatPage_Host_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "page-addon-mod-chat-chat", [], null, null, null, View_AddonModChatChatPage_0, RenderType_AddonModChatChatPage)), core["_30" /* ɵdid */](1, 180224, null, 0, chat_AddonModChatChatPage, [nav_params["a" /* NavParams */], logger["a" /* CoreLoggerProvider */], network["a" /* Network */], core["M" /* NgZone */], nav_controller["a" /* NavController */], chat["a" /* AddonModChatProvider */], app["a" /* CoreAppProvider */], sites["a" /* CoreSitesProvider */], modal_controller["a" /* ModalController */], dom["a" /* CoreDomUtilsProvider */], events["a" /* CoreEventsProvider */], helper["a" /* AddonModChatHelperProvider */]], null, null)], null, null); }
var AddonModChatChatPageNgFactory = core["_27" /* ɵccf */]("page-addon-mod-chat-chat", chat_AddonModChatChatPage, View_AddonModChatChatPage_Host_0, {}, {}, []);

//# sourceMappingURL=chat.ngfactory.js.map
// EXTERNAL MODULE: ./node_modules/@angular/forms/esm5/forms.js
var esm5_forms = __webpack_require__(23);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.loader.js
var translate_loader = __webpack_require__(371);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.compiler.js
var translate_compiler = __webpack_require__(372);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.parser.js
var translate_parser = __webpack_require__(374);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/missing-translation-handler.js
var missing_translation_handler = __webpack_require__(373);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.store.js
var translate_store = __webpack_require__(477);

// EXTERNAL MODULE: ./node_modules/ionic-angular/module.js
var ionic_angular_module = __webpack_require__(724);

// EXTERNAL MODULE: ./node_modules/ionic-angular/util/module-loader.js
var module_loader = __webpack_require__(274);

// CONCATENATED MODULE: ./src/addon/mod/chat/pages/chat/chat.module.ngfactory.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddonModChatChatPageModuleNgFactory", function() { return AddonModChatChatPageModuleNgFactory; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 































var AddonModChatChatPageModuleNgFactory = core["_28" /* ɵcmf */](chat_module_AddonModChatChatPageModule, [], function (_l) { return core["_40" /* ɵmod */]([core["_41" /* ɵmpd */](512, core["o" /* ComponentFactoryResolver */], core["_21" /* ɵCodegenComponentFactoryResolver */], [[8, [action_sheet_component_ngfactory["a" /* ActionSheetCmpNgFactory */], alert_component_ngfactory["a" /* AlertCmpNgFactory */], app_root_ngfactory["a" /* IonicAppNgFactory */], loading_component_ngfactory["a" /* LoadingCmpNgFactory */], modal_component_ngfactory["a" /* ModalCmpNgFactory */], picker_component_ngfactory["a" /* PickerCmpNgFactory */], popover_component_ngfactory["a" /* PopoverCmpNgFactory */], select_popover_component_ngfactory["a" /* SelectPopoverNgFactory */], toast_component_ngfactory["a" /* ToastCmpNgFactory */], context_menu_popover_ngfactory["a" /* CoreContextMenuPopoverComponentNgFactory */], course_picker_menu_popover_ngfactory["a" /* CoreCoursePickerMenuPopoverComponentNgFactory */], recaptchamodal_ngfactory["a" /* CoreRecaptchaModalComponentNgFactory */], bs_tooltip_ngfactory["a" /* CoreBSTooltipComponentNgFactory */], AddonModChatChatPageNgFactory]], [3, core["o" /* ComponentFactoryResolver */]], core["K" /* NgModuleRef */]]), core["_41" /* ɵmpd */](4608, common["m" /* NgLocalization */], common["l" /* NgLocaleLocalization */], [core["G" /* LOCALE_ID */], [2, common["w" /* ɵa */]]]), core["_41" /* ɵmpd */](4608, esm5_forms["x" /* ɵi */], esm5_forms["x" /* ɵi */], []), core["_41" /* ɵmpd */](4608, esm5_forms["d" /* FormBuilder */], esm5_forms["d" /* FormBuilder */], []), core["_41" /* ɵmpd */](4608, translate_loader["b" /* TranslateLoader */], translate_loader["a" /* TranslateFakeLoader */], []), core["_41" /* ɵmpd */](4608, translate_compiler["a" /* TranslateCompiler */], translate_compiler["b" /* TranslateFakeCompiler */], []), core["_41" /* ɵmpd */](4608, translate_parser["b" /* TranslateParser */], translate_parser["a" /* TranslateDefaultParser */], []), core["_41" /* ɵmpd */](4608, missing_translation_handler["b" /* MissingTranslationHandler */], missing_translation_handler["a" /* FakeMissingTranslationHandler */], []), core["_41" /* ɵmpd */](4608, translate_service["a" /* TranslateService */], translate_service["a" /* TranslateService */], [translate_store["a" /* TranslateStore */], translate_loader["b" /* TranslateLoader */], translate_compiler["a" /* TranslateCompiler */], translate_parser["b" /* TranslateParser */], missing_translation_handler["b" /* MissingTranslationHandler */], translate_service["b" /* USE_DEFAULT_LANG */], translate_service["c" /* USE_STORE */]]), core["_41" /* ɵmpd */](512, common["b" /* CommonModule */], common["b" /* CommonModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["v" /* ɵba */], esm5_forms["v" /* ɵba */], []), core["_41" /* ɵmpd */](512, esm5_forms["i" /* FormsModule */], esm5_forms["i" /* FormsModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["s" /* ReactiveFormsModule */], esm5_forms["s" /* ReactiveFormsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["a" /* IonicModule */], ionic_angular_module["a" /* IonicModule */], []), core["_41" /* ɵmpd */](512, _ngx_translate_core["b" /* TranslateModule */], _ngx_translate_core["b" /* TranslateModule */], []), core["_41" /* ɵmpd */](512, directives_module["a" /* CoreDirectivesModule */], directives_module["a" /* CoreDirectivesModule */], []), core["_41" /* ɵmpd */](512, pipes_module["a" /* CorePipesModule */], pipes_module["a" /* CorePipesModule */], []), core["_41" /* ɵmpd */](512, components_module["a" /* CoreComponentsModule */], components_module["a" /* CoreComponentsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["b" /* IonicPageModule */], ionic_angular_module["b" /* IonicPageModule */], []), core["_41" /* ɵmpd */](512, chat_module_AddonModChatChatPageModule, chat_module_AddonModChatChatPageModule, []), core["_41" /* ɵmpd */](256, translate_service["c" /* USE_STORE */], undefined, []), core["_41" /* ɵmpd */](256, translate_service["b" /* USE_DEFAULT_LANG */], undefined, []), core["_41" /* ɵmpd */](256, module_loader["a" /* LAZY_LOADED_TOKEN */], chat_AddonModChatChatPage, [])]); });

//# sourceMappingURL=chat.module.ngfactory.js.map

/***/ }),

/***/ 2174:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RenderType_Toolbar; });
/* harmony export (immutable) */ __webpack_exports__["b"] = View_Toolbar_0;
/* unused harmony export View_Toolbar_Host_0 */
/* unused harmony export ToolbarNgFactory */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__toolbar__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_config__ = __webpack_require__(8);
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 




var styles_Toolbar = [];
var RenderType_Toolbar = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_Toolbar, data: {} });

function View_Toolbar_0(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](2, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 1, "div", [["class", "toolbar-background"]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](1, 278528, null, 0, __WEBPACK_IMPORTED_MODULE_1__angular_common__["i" /* NgClass */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* IterableDiffers */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* KeyValueDiffers */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Renderer2 */]], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_43" /* ɵncd */](null, 0), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_43" /* ɵncd */](null, 1), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_43" /* ɵncd */](null, 2), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](5, 0, null, null, 2, "div", [["class", "toolbar-content"]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](6, 278528, null, 0, __WEBPACK_IMPORTED_MODULE_1__angular_common__["i" /* NgClass */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* IterableDiffers */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* KeyValueDiffers */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Renderer2 */]], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_43" /* ɵncd */](null, 3)], function (_ck, _v) { var _co = _v.component; var currVal_0 = "toolbar-background"; var currVal_1 = ("toolbar-background-" + _co._mode); _ck(_v, 1, 0, currVal_0, currVal_1); var currVal_2 = "toolbar-content"; var currVal_3 = ("toolbar-content-" + _co._mode); _ck(_v, 6, 0, currVal_2, currVal_3); }, null); }
function View_Toolbar_Host_0(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 1, "ion-toolbar", [["class", "toolbar"]], [[2, "statusbar-padding", null]], null, null, View_Toolbar_0, RenderType_Toolbar)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](1, 49152, null, 0, __WEBPACK_IMPORTED_MODULE_2__toolbar__["a" /* Toolbar */], [__WEBPACK_IMPORTED_MODULE_3__config_config__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */]], null, null)], null, function (_ck, _v) { var currVal_0 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 1)._sbPadding; _ck(_v, 0, 0, currVal_0); }); }
var ToolbarNgFactory = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_27" /* ɵccf */]("ion-toolbar", __WEBPACK_IMPORTED_MODULE_2__toolbar__["a" /* Toolbar */], View_Toolbar_Host_0, { color: "color", mode: "mode" }, {}, ["[menuToggle],ion-buttons[left]", "ion-buttons[start]", "ion-buttons[end],ion-buttons[right]", "*"]);

//# sourceMappingURL=toolbar.ngfactory.js.map

/***/ }),

/***/ 2178:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RenderType_CoreSendMessageFormComponent; });
/* harmony export (immutable) */ __webpack_exports__["b"] = View_CoreSendMessageFormComponent_0;
/* unused harmony export View_CoreSendMessageFormComponent_Host_0 */
/* unused harmony export CoreSendMessageFormComponentNgFactory */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__directives_auto_focus__ = __webpack_require__(380);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_utils_dom__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_utils_utils__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular_navigation_nav_controller__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__directives_auto_rows__ = __webpack_require__(386);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ionic_angular_components_toolbar_toolbar_item__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ionic_angular_config_config__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ionic_angular_components_toolbar_toolbar__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ionic_angular_components_toolbar_navbar__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__node_modules_ionic_angular_components_button_button_ngfactory__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ionic_angular_components_button_button__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__directives_supress_events__ = __webpack_require__(494);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ngx_translate_core_src_translate_pipe__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ngx_translate_core_src_translate_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_ionic_angular_components_icon_icon__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__send_message_form__ = __webpack_require__(1552);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_utils_text__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__providers_config__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__providers_events__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__providers_sites__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__providers_app__ = __webpack_require__(9);
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 























var styles_CoreSendMessageFormComponent = [];
var RenderType_CoreSendMessageFormComponent = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_CoreSendMessageFormComponent, data: {} });

function View_CoreSendMessageFormComponent_0(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 28, "form", [["novalidate", ""]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "submit"], [null, "reset"]], function (_v, en, $event) { var ad = true; if (("submit" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 2).onSubmit($event) !== false);
        ad = (pd_0 && ad);
    } if (("reset" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 2).onReset() !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](1, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["w" /* ɵbf */], [], null, null), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](2, 4210688, null, 0, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["p" /* NgForm */], [[8, null], [8, null]], null, null), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_50" /* ɵprd */](2048, null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* ControlContainer */], null, [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["p" /* NgForm */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](4, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["o" /* NgControlStatusGroup */], [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* ControlContainer */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](6, 0, null, null, 7, "textarea", [["aria-multiline", "true"], ["class", "core-send-message-input"], ["core-auto-rows", ""], ["name", "message"], ["rows", "1"]], [[8, "placeholder", 0], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "onResize"], [null, "keydown.enter"], [null, "keydown.control.enter"], [null, "keydown.meta.enter"], [null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"], [null, "change"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("input" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 7)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 7).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (__WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 7)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (__WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 7)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("input" === en)) {
        var pd_4 = (__WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 13).onInput() !== false);
        ad = (pd_4 && ad);
    } if (("change" === en)) {
        var pd_5 = (__WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 13).onChange() !== false);
        ad = (pd_5 && ad);
    } if (("ngModelChange" === en)) {
        var pd_6 = ((_co.message = $event) !== false);
        ad = (pd_6 && ad);
    } if (("onResize" === en)) {
        var pd_7 = (_co.textareaResized() !== false);
        ad = (pd_7 && ad);
    } if (("keydown.enter" === en)) {
        var pd_8 = (_co.enterClicked($event) !== false);
        ad = (pd_8 && ad);
    } if (("keydown.control.enter" === en)) {
        var pd_9 = (_co.enterClicked($event, "control") !== false);
        ad = (pd_9 && ad);
    } if (("keydown.meta.enter" === en)) {
        var pd_10 = (_co.enterClicked($event, "meta") !== false);
        ad = (pd_10 && ad);
    } return ad; }, null, null)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](7, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* DefaultValueAccessor */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Renderer2 */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], [2, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* COMPOSITION_BUFFER_MODE */]]], null, null), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_50" /* ɵprd */](1024, null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["l" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* DefaultValueAccessor */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](9, 671744, null, 0, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["q" /* NgModel */], [[2, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* ControlContainer */]], [8, null], [8, null], [2, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["l" /* NG_VALUE_ACCESSOR */]]], { name: [0, "name"], model: [1, "model"] }, { update: "ngModelChange" }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_50" /* ɵprd */](2048, null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["m" /* NgControl */], null, [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["q" /* NgModel */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](11, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["n" /* NgControlStatus */], [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["m" /* NgControl */]], null, null), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](12, 81920, null, 0, __WEBPACK_IMPORTED_MODULE_2__directives_auto_focus__["a" /* CoreAutoFocusDirective */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_3__providers_utils_dom__["a" /* CoreDomUtilsProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_utils_utils__["a" /* CoreUtilsProvider */], [2, __WEBPACK_IMPORTED_MODULE_5_ionic_angular_navigation_nav_controller__["a" /* NavController */]]], { coreAutoFocus: [0, "coreAutoFocus"] }, null), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](13, 4210688, null, 0, __WEBPACK_IMPORTED_MODULE_6__directives_auto_rows__["a" /* CoreAutoRowsDirective */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */]], null, { onResize: "onResize" }), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](15, 0, null, null, 12, "ion-buttons", [["end", ""]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](16, 16384, null, 1, __WEBPACK_IMPORTED_MODULE_7_ionic_angular_components_toolbar_toolbar_item__["a" /* ToolbarItem */], [__WEBPACK_IMPORTED_MODULE_8_ionic_angular_config_config__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */], [2, __WEBPACK_IMPORTED_MODULE_9_ionic_angular_components_toolbar_toolbar__["a" /* Toolbar */]], [2, __WEBPACK_IMPORTED_MODULE_10_ionic_angular_components_toolbar_navbar__["a" /* Navbar */]]], null, null), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_52" /* ɵqud */](603979776, 1, { _buttons: 1 }), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](19, 0, null, null, 7, "button", [["clear", "true"], ["icon-only", ""], ["ion-button", ""], ["type", "submit"]], [[8, "disabled", 0], [1, "aria-label", 0]], [[null, "onClick"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("onClick" === en)) {
        var pd_0 = (_co.submitForm($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_11__node_modules_ionic_angular_components_button_button_ngfactory__["b" /* View_Button_0 */], __WEBPACK_IMPORTED_MODULE_11__node_modules_ionic_angular_components_button_button_ngfactory__["a" /* RenderType_Button */])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](20, 1097728, [[1, 4]], 0, __WEBPACK_IMPORTED_MODULE_12_ionic_angular_components_button_button__["a" /* Button */], [[8, ""], __WEBPACK_IMPORTED_MODULE_8_ionic_angular_config_config__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */]], { clear: [0, "clear"] }, null), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](21, 81920, null, 0, __WEBPACK_IMPORTED_MODULE_13__directives_supress_events__["a" /* CoreSupressEventsDirective */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */]], null, { onClick: "onClick" }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_47" /* ɵpid */](131072, __WEBPACK_IMPORTED_MODULE_14__ngx_translate_core_src_translate_pipe__["a" /* TranslatePipe */], [__WEBPACK_IMPORTED_MODULE_15__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */]]), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 0, ["\n            "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](24, 0, null, 0, 1, "ion-icon", [["color", "dark"], ["name", "send"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](25, 147456, null, 0, __WEBPACK_IMPORTED_MODULE_16_ionic_angular_components_icon_icon__["a" /* Icon */], [__WEBPACK_IMPORTED_MODULE_8_ionic_angular_config_config__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */]], { color: [0, "color"], name: [1, "name"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_15 = "message"; var currVal_16 = _co.message; _ck(_v, 9, 0, currVal_15, currVal_16); var currVal_17 = _co.showKeyboard; _ck(_v, 12, 0, currVal_17); var currVal_20 = "true"; _ck(_v, 20, 0, currVal_20); _ck(_v, 21, 0); var currVal_22 = "dark"; var currVal_23 = "send"; _ck(_v, 25, 0, currVal_22, currVal_23); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 4).ngClassUntouched; var currVal_1 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 4).ngClassTouched; var currVal_2 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 4).ngClassPristine; var currVal_3 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 4).ngClassDirty; var currVal_4 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 4).ngClassValid; var currVal_5 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 4).ngClassInvalid; var currVal_6 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 4).ngClassPending; _ck(_v, 0, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6); var currVal_7 = _co.placeholder; var currVal_8 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 11).ngClassUntouched; var currVal_9 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 11).ngClassTouched; var currVal_10 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 11).ngClassPristine; var currVal_11 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 11).ngClassDirty; var currVal_12 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 11).ngClassValid; var currVal_13 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 11).ngClassInvalid; var currVal_14 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 11).ngClassPending; _ck(_v, 6, 0, currVal_7, currVal_8, currVal_9, currVal_10, currVal_11, currVal_12, currVal_13, currVal_14); var currVal_18 = (!_co.message || _co.sendDisabled); var currVal_19 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_56" /* ɵunv */](_v, 19, 1, __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 22).transform("core.send")); _ck(_v, 19, 0, currVal_18, currVal_19); var currVal_21 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 25)._hidden; _ck(_v, 24, 0, currVal_21); }); }
function View_CoreSendMessageFormComponent_Host_0(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 1, "core-send-message-form", [], null, null, null, View_CoreSendMessageFormComponent_0, RenderType_CoreSendMessageFormComponent)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](1, 114688, null, 0, __WEBPACK_IMPORTED_MODULE_17__send_message_form__["a" /* CoreSendMessageFormComponent */], [__WEBPACK_IMPORTED_MODULE_4__providers_utils_utils__["a" /* CoreUtilsProvider */], __WEBPACK_IMPORTED_MODULE_18__providers_utils_text__["a" /* CoreTextUtilsProvider */], __WEBPACK_IMPORTED_MODULE_19__providers_config__["a" /* CoreConfigProvider */], __WEBPACK_IMPORTED_MODULE_20__providers_events__["a" /* CoreEventsProvider */], __WEBPACK_IMPORTED_MODULE_21__providers_sites__["a" /* CoreSitesProvider */], __WEBPACK_IMPORTED_MODULE_22__providers_app__["a" /* CoreAppProvider */]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var CoreSendMessageFormComponentNgFactory = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_27" /* ɵccf */]("core-send-message-form", __WEBPACK_IMPORTED_MODULE_17__send_message_form__["a" /* CoreSendMessageFormComponent */], View_CoreSendMessageFormComponent_Host_0, { message: "message", placeholder: "placeholder", showKeyboard: "showKeyboard", sendDisabled: "sendDisabled" }, { onSubmit: "onSubmit", onResize: "onResize" }, []);

//# sourceMappingURL=send-message-form.ngfactory.js.map

/***/ })

});
//# sourceMappingURL=15.js.map