webpackJsonp([13],{

/***/ 1771:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/@angular/core/esm5/core.js
var core = __webpack_require__(0);

// EXTERNAL MODULE: ./node_modules/ionic-angular/index.js + 3 modules
var ionic_angular = __webpack_require__(9);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/index.js + 1 modules
var _ngx_translate_core = __webpack_require__(4);

// EXTERNAL MODULE: ./src/providers/events.ts
var events = __webpack_require__(12);

// EXTERNAL MODULE: ./src/providers/sites.ts
var sites = __webpack_require__(1);

// EXTERNAL MODULE: ./src/addon/messages/providers/messages.ts
var messages = __webpack_require__(168);

// EXTERNAL MODULE: ./src/addon/messages/providers/sync.ts
var sync = __webpack_require__(435);

// EXTERNAL MODULE: ./src/core/user/providers/user.ts
var user = __webpack_require__(44);

// EXTERNAL MODULE: ./src/providers/utils/dom.ts
var dom = __webpack_require__(3);

// EXTERNAL MODULE: ./src/providers/utils/utils.ts
var utils_utils = __webpack_require__(2);

// EXTERNAL MODULE: ./src/providers/logger.ts
var providers_logger = __webpack_require__(5);

// EXTERNAL MODULE: ./src/providers/app.ts
var app = __webpack_require__(10);

// EXTERNAL MODULE: ./src/classes/animations.ts
var animations = __webpack_require__(1356);

// EXTERNAL MODULE: ./node_modules/ts-md5/dist/md5.js
var md5 = __webpack_require__(189);
var md5_default = /*#__PURE__*/__webpack_require__.n(md5);

// EXTERNAL MODULE: ./node_modules/moment/moment.js
var moment = __webpack_require__(13);
var moment_default = /*#__PURE__*/__webpack_require__.n(moment);

// CONCATENATED MODULE: ./src/addon/messages/pages/discussion/discussion.ts
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
 * Page that displays a message discussion page.
 */
var discussion_AddonMessagesDiscussionPage = /** @class */ (function () {
    function AddonMessagesDiscussionPage(eventsProvider, sitesProvider, navParams, userProvider, navCtrl, messagesSync, domUtils, messagesProvider, logger, utils, appProvider, translate) {
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
        this.unreadMessageFrom = 0;
        this.messagesBeingSent = 0;
        this.pagesLoaded = 1;
        this.lastMessage = { text: '', timecreated: 0 };
        this.keepMessageMap = {};
        this.oldContentHeight = 0;
        this.loaded = false;
        this.showKeyboard = false;
        this.canLoadMore = false;
        this.messages = [];
        this.showDelete = false;
        this.canDelete = false;
        this.scrollBottom = true;
        this.viewDestroyed = false;
        this.siteId = sitesProvider.getCurrentSiteId();
        this.currentUserId = sitesProvider.getCurrentSiteUserId();
        this.logger = logger.getInstance('AddonMessagesDiscussionPage');
        this.userId = navParams.get('userId');
        this.showKeyboard = navParams.get('showKeyboard');
        // Refresh data if this discussion is synchronized automatically.
        this.syncObserver = eventsProvider.on(sync["a" /* AddonMessagesSyncProvider */].AUTO_SYNCED, function (data) {
            if (data.userId == _this.userId) {
                // Fetch messages.
                _this.fetchData();
                // Show first warning if any.
                if (data.warnings && data.warnings[0]) {
                    _this.domUtils.showErrorModal(data.warnings[0]);
                }
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
        // Use smallmessage instead of message ID because ID changes when a message is read.
        message.hash = md5["Md5"].hashAsciiStr(message.smallmessage) + '#' + message.timecreated + '#' + message.useridfrom;
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
        if (position > 0) {
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
        this.showProfileLink = !backViewPage || backViewPage !== 'CoreUserProfilePage';
        // Get the user profile to retrieve the user fullname and image.
        this.userProvider.getProfile(this.userId, undefined, true).then(function (user) {
            if (!_this.title) {
                _this.title = user.fullname;
            }
            _this.profileLink = user.profileimageurl;
        });
        // Synchronize messages if needed.
        this.messagesSync.syncDiscussion(this.userId).catch(function () {
            // Ignore errors.
        }).then(function (warnings) {
            if (warnings && warnings[0]) {
                _this.domUtils.showErrorModal(warnings[0]);
            }
            // Fetch the messages for the first time.
            return _this.fetchData().then(function () {
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
            }).catch(function (error) {
                _this.domUtils.showErrorModalDefault(error, 'addon.messages.errorwhileretrievingmessages', true);
            }).finally(function () {
                _this.checkCanDelete();
                _this.resizeContent();
                _this.loaded = true;
            });
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
     * @return {Promise<any>} Resolved when done.
     */
    AddonMessagesDiscussionPage.prototype.fetchData = function () {
        var _this = this;
        this.logger.debug("Polling new messages for discussion with user '" + this.userId + "'");
        if (this.messagesBeingSent > 0) {
            // We do not poll while a message is being sent or we could confuse the user.
            // Otherwise, his message would disappear from the list, and he'd have to wait for the interval to check for messages.
            return Promise.reject(null);
        }
        else if (this.fetching) {
            // Already fetching.
            return Promise.reject(null);
        }
        this.fetching = true;
        // Wait for synchronization process to finish.
        return this.messagesSync.waitForSync(this.userId).then(function () {
            // Fetch messages. Invalidate the cache before fetching.
            return _this.messagesProvider.invalidateDiscussionCache(_this.userId).catch(function () {
                // Ignore errors.
            });
        }).then(function () {
            return _this.getDiscussion(_this.pagesLoaded);
        }).then(function (messages) {
            if (_this.viewDestroyed) {
                return Promise.resolve();
            }
            // Check if we are at the bottom to scroll it after render.
            _this.scrollBottom = _this.domUtils.getScrollHeight(_this.content) - _this.domUtils.getScrollTop(_this.content) ===
                _this.domUtils.getContentHeight(_this.content);
            if (_this.messagesBeingSent > 0) {
                // Ignore polling due to a race condition.
                return Promise.reject(null);
            }
            // Add new messages to the list and mark the messages that should still be displayed.
            messages.forEach(function (message) {
                _this.addMessage(message);
            });
            // Remove messages that shouldn't be in the list anymore.
            for (var hash in _this.keepMessageMap) {
                _this.removeMessage(hash);
            }
            // Sort the messages.
            _this.messagesProvider.sortMessages(_this.messages);
            // Notify that there can be a new message.
            _this.notifyNewMessage();
            // Mark retrieved messages as read if they are not.
            _this.markMessagesAsRead();
        }).finally(function () {
            _this.fetching = false;
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
    AddonMessagesDiscussionPage.prototype.getDiscussion = function (pagesToLoad, lfReceivedUnread, lfReceivedRead, lfSentUnread, lfSentRead) {
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
                return _this.getDiscussion(pagesToLoad, lfReceivedUnread, lfReceivedRead, lfSentUnread, lfSentRead)
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
            // Mark all messages at a time if one messages is unread.
            for (var x in this.messages) {
                var message = this.messages[x];
                // If an unread message is found, mark all messages as read.
                if (message.useridfrom != this.currentUserId && message.read == 0) {
                    messageUnreadFound = true;
                    break;
                }
            }
            if (messageUnreadFound) {
                this.setUnreadLabelPosition();
                promises.push(this.messagesProvider.markAllMessagesRead(this.userId).then(function () {
                    readChanged = true;
                    // Mark all messages as read.
                    _this.messages.forEach(function (message) {
                        message.read = 1;
                    });
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
                _this.eventsProvider.trigger(messages["a" /* AddonMessagesProvider */].READ_CHANGED_EVENT, {
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
            this.eventsProvider.trigger(messages["a" /* AddonMessagesProvider */].NEW_MESSAGE_EVENT, {
                userId: this.userId,
                message: this.lastMessage.text,
                timecreated: this.lastMessage.timecreated
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
        var previousMessageRead = false;
        for (var x in this.messages) {
            var message = this.messages[x];
            if (message.useridfrom != this.currentUserId) {
                // Place unread from message label only once.
                message.unreadFrom = message.read == 0 && previousMessageRead;
                if (message.unreadFrom) {
                    // Save where the label is placed.
                    this.unreadMessageFrom = parseInt(message.id, 10);
                    break;
                }
                previousMessageRead = message.read != 0;
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
            for (var x in this.messages) {
                var message = this.messages[x];
                if (message.id == this.unreadMessageFrom) {
                    message.unreadFrom = false;
                    break;
                }
            }
            // Label hidden.
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
        if (!this.polling) {
            // Start polling.
            this.polling = setInterval(function () {
                _this.fetchData().catch(function () {
                    // Ignore errors.
                });
            }, messages["a" /* AddonMessagesProvider */].POLL_INTERVAL);
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
     * Copy message to clipboard
     *
     * @param {string} text Message text to be copied.
     */
    AddonMessagesDiscussionPage.prototype.copyMessage = function (text) {
        this.utils.copyToClipboard(text);
    };
    /**
     * Function to delete a message.
     *
     * @param {any} message  Message object to delete.
     * @param {number} index Index where the mesasge is to delete it from the view.
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
                _this.fetchData(); // Re-fetch messages to update cached data.
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
     * @param {any} [infiniteScroll] Infinite scroll object.
     * @return {Promise<any>} Resolved when done.
     */
    AddonMessagesDiscussionPage.prototype.loadPrevious = function (infiniteScroll) {
        var _this = this;
        // If there is an ongoing fetch, wait for it to finish.
        return this.waitForFetch().finally(function () {
            _this.pagesLoaded++;
            _this.fetchData().catch(function (error) {
                _this.pagesLoaded--;
                _this.domUtils.showErrorModalDefault(error, 'addon.messages.errorwhileretrievingmessages', true);
            }).finally(function () {
                infiniteScroll.complete();
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
        this.addMessage(message, false);
        this.messagesBeingSent++;
        // If there is an ongoing fetch, wait for it to finish.
        // Otherwise, if a message is sent while fetching it could disappear until the next fetch.
        this.waitForFetch().finally(function () {
            _this.messagesProvider.sendMessage(_this.userId, text).then(function (data) {
                var promise;
                _this.messagesBeingSent--;
                if (data.sent) {
                    // Message was sent, fetch messages right now.
                    promise = _this.fetchData();
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
        else if (message.pending) {
            // If pending, it has no date, not show.
            return false;
        }
        // Check if day has changed.
        return !moment(message.timecreated).isSame(prevMessage.timecreated, 'day');
    };
    /**
     * Toggles delete state.
     */
    AddonMessagesDiscussionPage.prototype.toggleDelete = function () {
        this.showDelete = !this.showDelete;
    };
    /**
     * Page destroyed.
     */
    AddonMessagesDiscussionPage.prototype.ngOnDestroy = function () {
        // Unset again, just in case.
        this.unsetPolling();
        this.syncObserver && this.syncObserver.off();
        this.keyboardObserver && this.keyboardObserver.off();
        this.viewDestroyed = true;
    };
    __decorate([
        Object(core["_9" /* ViewChild */])(ionic_angular["f" /* Content */]),
        __metadata("design:type", ionic_angular["f" /* Content */])
    ], AddonMessagesDiscussionPage.prototype, "content", void 0);
    AddonMessagesDiscussionPage = __decorate([
        Object(core["m" /* Component */])({
            selector: 'page-addon-messages-discussion',
            templateUrl: 'discussion.html',
            animations: [animations["b" /* coreSlideInOut */]]
        }),
        __metadata("design:paramtypes", [events["a" /* CoreEventsProvider */], sites["a" /* CoreSitesProvider */], ionic_angular["s" /* NavParams */],
            user["a" /* CoreUserProvider */], ionic_angular["r" /* NavController */], sync["a" /* AddonMessagesSyncProvider */],
            dom["a" /* CoreDomUtilsProvider */], messages["a" /* AddonMessagesProvider */], providers_logger["a" /* CoreLoggerProvider */],
            utils_utils["a" /* CoreUtilsProvider */], app["a" /* CoreAppProvider */], _ngx_translate_core["c" /* TranslateService */]])
    ], AddonMessagesDiscussionPage);
    return AddonMessagesDiscussionPage;
}());

//# sourceMappingURL=discussion.js.map
// EXTERNAL MODULE: ./src/components/components.module.ts
var components_module = __webpack_require__(32);

// EXTERNAL MODULE: ./src/directives/directives.module.ts + 2 modules
var directives_module = __webpack_require__(28);

// EXTERNAL MODULE: ./src/pipes/pipes.module.ts + 1 modules
var pipes_module = __webpack_require__(109);

// CONCATENATED MODULE: ./src/addon/messages/pages/discussion/discussion.module.ts
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
var discussion_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var discussion_module_AddonMessagesDiscussionPageModule = /** @class */ (function () {
    function AddonMessagesDiscussionPageModule() {
    }
    AddonMessagesDiscussionPageModule = discussion_module___decorate([
        Object(core["I" /* NgModule */])({
            declarations: [
                discussion_AddonMessagesDiscussionPage,
            ],
            imports: [
                components_module["a" /* CoreComponentsModule */],
                directives_module["a" /* CoreDirectivesModule */],
                pipes_module["a" /* CorePipesModule */],
                ionic_angular["l" /* IonicPageModule */].forChild(discussion_AddonMessagesDiscussionPage),
                _ngx_translate_core["b" /* TranslateModule */].forChild()
            ],
        })
    ], AddonMessagesDiscussionPageModule);
    return AddonMessagesDiscussionPageModule;
}());

//# sourceMappingURL=discussion.module.js.map
// EXTERNAL MODULE: ./node_modules/ionic-angular/components/action-sheet/action-sheet-component.ngfactory.js
var action_sheet_component_ngfactory = __webpack_require__(1273);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/alert/alert-component.ngfactory.js
var alert_component_ngfactory = __webpack_require__(1274);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/app/app-root.ngfactory.js
var app_root_ngfactory = __webpack_require__(1275);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/loading/loading-component.ngfactory.js
var loading_component_ngfactory = __webpack_require__(1276);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/modal/modal-component.ngfactory.js
var modal_component_ngfactory = __webpack_require__(1277);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/picker/picker-component.ngfactory.js + 1 modules
var picker_component_ngfactory = __webpack_require__(1278);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/popover/popover-component.ngfactory.js
var popover_component_ngfactory = __webpack_require__(1279);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/select/select-popover-component.ngfactory.js
var select_popover_component_ngfactory = __webpack_require__(1280);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toast/toast-component.ngfactory.js
var toast_component_ngfactory = __webpack_require__(1281);

// EXTERNAL MODULE: ./src/components/context-menu/context-menu-popover.ngfactory.js
var context_menu_popover_ngfactory = __webpack_require__(1284);

// EXTERNAL MODULE: ./src/components/course-picker-menu/course-picker-menu-popover.ngfactory.js
var course_picker_menu_popover_ngfactory = __webpack_require__(1285);

// EXTERNAL MODULE: ./src/components/recaptcha/recaptchamodal.ngfactory.js
var recaptchamodal_ngfactory = __webpack_require__(1286);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/chip/chip.js
var chip = __webpack_require__(676);

// EXTERNAL MODULE: ./node_modules/ionic-angular/config/config.js
var config = __webpack_require__(6);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/label/label.js
var label = __webpack_require__(60);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.pipe.js
var translate_pipe = __webpack_require__(29);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.service.js
var translate_service = __webpack_require__(17);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/icon/icon.js
var icon = __webpack_require__(41);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/note/note.js
var note = __webpack_require__(215);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.ngfactory.js
var button_ngfactory = __webpack_require__(45);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.js
var button_button = __webpack_require__(40);

// EXTERNAL MODULE: ./node_modules/@angular/common/esm5/common.js
var common = __webpack_require__(8);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item.ngfactory.js + 1 modules
var item_ngfactory = __webpack_require__(33);

// EXTERNAL MODULE: ./src/directives/long-press.ts
var long_press = __webpack_require__(1353);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item.js
var item = __webpack_require__(20);

// EXTERNAL MODULE: ./node_modules/ionic-angular/util/form.js
var util_form = __webpack_require__(19);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-reorder.js + 1 modules
var item_reorder = __webpack_require__(27);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-content.js
var item_content = __webpack_require__(30);

// EXTERNAL MODULE: ./src/directives/format-text.ts
var format_text = __webpack_require__(39);

// EXTERNAL MODULE: ./src/providers/utils/text.ts
var utils_text = __webpack_require__(11);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/platform.js + 1 modules
var platform = __webpack_require__(14);

// EXTERNAL MODULE: ./src/providers/utils/url.ts
var url = __webpack_require__(24);

// EXTERNAL MODULE: ./src/providers/filepool.ts
var filepool = __webpack_require__(16);

// EXTERNAL MODULE: ./src/core/contentlinks/providers/helper.ts
var helper = __webpack_require__(22);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-controller.js
var nav_controller = __webpack_require__(21);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.js
var content = __webpack_require__(23);

// EXTERNAL MODULE: ./src/components/split-view/split-view.ts
var split_view = __webpack_require__(34);

// EXTERNAL MODULE: ./src/providers/utils/iframe.ts
var iframe = __webpack_require__(37);

// EXTERNAL MODULE: ./src/components/empty-box/empty-box.ngfactory.js
var empty_box_ngfactory = __webpack_require__(164);

// EXTERNAL MODULE: ./src/components/empty-box/empty-box.ts
var empty_box = __webpack_require__(133);

// EXTERNAL MODULE: ./src/pipes/format-date.ts
var format_date = __webpack_require__(325);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-header.js
var toolbar_header = __webpack_require__(417);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/view-controller.js
var view_controller = __webpack_require__(35);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/navbar.ngfactory.js
var navbar_ngfactory = __webpack_require__(1282);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/navbar.js
var navbar = __webpack_require__(191);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/app/app.js + 3 modules
var app_app = __webpack_require__(26);

// EXTERNAL MODULE: ./src/directives/back-button.ts
var back_button = __webpack_require__(632);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.ngfactory.js
var toolbar_title_ngfactory = __webpack_require__(1283);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.js
var toolbar_title = __webpack_require__(324);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar.js
var toolbar = __webpack_require__(236);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-item.js
var toolbar_item = __webpack_require__(418);

// EXTERNAL MODULE: ./src/components/navbar-buttons/navbar-buttons.ngfactory.js
var navbar_buttons_ngfactory = __webpack_require__(87);

// EXTERNAL MODULE: ./src/components/navbar-buttons/navbar-buttons.ts
var navbar_buttons = __webpack_require__(78);

// EXTERNAL MODULE: ./src/directives/user-link.ts
var user_link = __webpack_require__(238);

// EXTERNAL MODULE: ./src/directives/external-content.ts
var external_content = __webpack_require__(162);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.ngfactory.js
var content_ngfactory = __webpack_require__(178);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/dom-controller.js
var dom_controller = __webpack_require__(25);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/keyboard.js
var keyboard = __webpack_require__(99);

// EXTERNAL MODULE: ./src/components/loading/loading.ngfactory.js
var loading_ngfactory = __webpack_require__(56);

// EXTERNAL MODULE: ./src/components/loading/loading.ts
var loading = __webpack_require__(50);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/infinite-scroll/infinite-scroll.js
var infinite_scroll = __webpack_require__(219);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/infinite-scroll/infinite-scroll-content.ngfactory.js
var infinite_scroll_content_ngfactory = __webpack_require__(429);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/infinite-scroll/infinite-scroll-content.js
var infinite_scroll_content = __webpack_require__(243);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/list/list.js + 1 modules
var list = __webpack_require__(74);

// EXTERNAL MODULE: ./node_modules/ionic-angular/gestures/gesture-controller.js
var gesture_controller = __webpack_require__(36);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-footer.js
var toolbar_footer = __webpack_require__(652);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar.ngfactory.js
var toolbar_ngfactory = __webpack_require__(1883);

// EXTERNAL MODULE: ./src/components/send-message-form/send-message-form.ngfactory.js
var send_message_form_ngfactory = __webpack_require__(1885);

// EXTERNAL MODULE: ./src/components/send-message-form/send-message-form.ts
var send_message_form = __webpack_require__(1299);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-params.js
var nav_params = __webpack_require__(59);

// CONCATENATED MODULE: ./src/addon/messages/pages/discussion/discussion.ngfactory.js
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 





































































var styles_AddonMessagesDiscussionPage = [];
var RenderType_AddonMessagesDiscussionPage = core["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_AddonMessagesDiscussionPage, data: { "animation": [{ type: 7, name: "coreSlideInOut", definitions: [{ type: 1, expr: "void => fromLeft", animation: [{ type: 6, styles: { transform: "translateX(0)", opacity: 1 }, offset: null }, { type: 4, styles: { type: 5, steps: [{ type: 6, styles: { opacity: 0, transform: "translateX(-100%)", offset: 0 }, offset: null }, { type: 6, styles: { opacity: 1, transform: "translateX(5%)", offset: 0.7 }, offset: null }, { type: 6, styles: { opacity: 1, transform: "translateX(0)", offset: 1 }, offset: null }] }, timings: 300 }], options: null }, { type: 1, expr: "fromLeft => void", animation: [{ type: 6, styles: { transform: "translateX(-100%)", opacity: 0 }, offset: null }, { type: 4, styles: { type: 5, steps: [{ type: 6, styles: { opacity: 1, transform: "translateX(0)", offset: 0 }, offset: null }, { type: 6, styles: { opacity: 1, transform: "translateX(5%)", offset: 0.3 }, offset: null }, { type: 6, styles: { opacity: 0, transform: "translateX(-100%)", offset: 1 }, offset: null }] }, timings: 300 }], options: null }, { type: 1, expr: "void => fromRight", animation: [{ type: 6, styles: { transform: "translateX(0)", opacity: 1 }, offset: null }, { type: 4, styles: { type: 5, steps: [{ type: 6, styles: { opacity: 0, transform: "translateX(100%)", offset: 0 }, offset: null }, { type: 6, styles: { opacity: 1, transform: "translateX(-5%)", offset: 0.7 }, offset: null }, { type: 6, styles: { opacity: 1, transform: "translateX(0)", offset: 1 }, offset: null }] }, timings: 300 }], options: null }, { type: 1, expr: "fromRight => void", animation: [{ type: 6, styles: { transform: "translateX(-100%)", opacity: 0 }, offset: null }, { type: 4, styles: { type: 5, steps: [{ type: 6, styles: { opacity: 1, transform: "translateX(0)", offset: 0 }, offset: null }, { type: 6, styles: { opacity: 1, transform: "translateX(-5%)", offset: 0.3 }, offset: null }, { type: 6, styles: { opacity: 0, transform: "translateX(100%)", offset: 1 }, offset: null }] }, timings: 300 }], options: null }], options: {} }] } });

function View_AddonMessagesDiscussionPage_2(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 7, "ion-chip", [["class", "addon-messages-date"], ["color", "light"]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, chip["a" /* Chip */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { color: [0, "color"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 3, "ion-label", [], null, null, null, null, null)), core["_30" /* ɵdid */](4, 16384, null, 0, label["a" /* Label */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, null], [8, null], [8, null]], null, null), (_l()(), core["_55" /* ɵted */](5, null, ["", ""])), core["_49" /* ɵppd */](6, 2), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "]))], function (_ck, _v) { var currVal_0 = "light"; _ck(_v, 1, 0, currVal_0); }, function (_ck, _v) { var currVal_1 = core["_56" /* ɵunv */](_v, 5, 0, _ck(_v, 6, 0, core["_44" /* ɵnov */](_v.parent.parent, 0), _v.parent.context.$implicit.timecreated, "LL")); _ck(_v, 5, 0, currVal_1); }); }
function View_AddonMessagesDiscussionPage_3(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 11, "ion-chip", [["class", "addon-messages-unreadfrom"], ["color", "light"]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, chip["a" /* Chip */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { color: [0, "color"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 4, "ion-label", [], null, null, null, null, null)), core["_30" /* ɵdid */](4, 16384, null, 0, label["a" /* Label */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, null], [8, null], [8, null]], null, null), (_l()(), core["_55" /* ɵted */](5, null, ["", ""])), core["_48" /* ɵpod */](6, { $a: 0 }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](9, 0, null, null, 1, "ion-icon", [["name", "arrow-round-down"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](10, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "]))], function (_ck, _v) { var currVal_0 = "light"; _ck(_v, 1, 0, currVal_0); var currVal_3 = "arrow-round-down"; _ck(_v, 10, 0, currVal_3); }, function (_ck, _v) { var _co = _v.component; var currVal_1 = core["_56" /* ɵunv */](_v, 5, 0, core["_44" /* ɵnov */](_v, 7).transform("addon.messages.newmessages", _ck(_v, 6, 0, _co.title))); _ck(_v, 5, 0, currVal_1); var currVal_2 = core["_44" /* ɵnov */](_v, 10)._hidden; _ck(_v, 9, 0, currVal_2); }); }
function View_AddonMessagesDiscussionPage_4(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 3, "ion-note", [], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, note["a" /* Note */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](2, null, ["\n                        ", "\n                    "])), core["_49" /* ɵppd */](3, 2)], null, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 2, 0, _ck(_v, 3, 0, core["_44" /* ɵnov */](_v.parent.parent, 0), _v.parent.context.$implicit.timecreated, "dftimedate")); _ck(_v, 2, 0, currVal_0); }); }
function View_AddonMessagesDiscussionPage_5(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 3, "ion-note", [], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, note["a" /* Note */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_31" /* ɵeld */](2, 0, null, null, 1, "ion-icon", [["name", "time"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](3, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null)], function (_ck, _v) { var currVal_1 = "time"; _ck(_v, 3, 0, currVal_1); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 3)._hidden; _ck(_v, 2, 0, currVal_0); }); }
function View_AddonMessagesDiscussionPage_6(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 6, "button", [["class", "addon-messages-delete-button"], ["clear", "true"], ["icon-only", ""], ["ion-button", ""]], [[24, "@coreSlideInOut", 0], [1, "aria-label", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.deleteMessage(_v.parent.context.$implicit, _v.parent.context.index) !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](1, 1097728, [[5, 4]], 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { clear: [0, "clear"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](4, 0, null, 0, 1, "ion-icon", [["color", "danger"], ["name", "trash"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](5, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { color: [0, "color"], name: [1, "name"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                    "]))], function (_ck, _v) { var currVal_2 = "true"; _ck(_v, 1, 0, currVal_2); var currVal_4 = "danger"; var currVal_5 = "trash"; _ck(_v, 5, 0, currVal_4, currVal_5); }, function (_ck, _v) { var currVal_0 = "fromRight"; var currVal_1 = core["_56" /* ɵunv */](_v, 0, 1, core["_44" /* ɵnov */](_v, 2).transform("addon.messages.deletemessage")); _ck(_v, 0, 0, currVal_0, currVal_1); var currVal_3 = core["_44" /* ɵnov */](_v, 5)._hidden; _ck(_v, 4, 0, currVal_3); }); }
function View_AddonMessagesDiscussionPage_1(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 32, null, null, null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonMessagesDiscussionPage_2)), core["_30" /* ɵdid */](3, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonMessagesDiscussionPage_3)), core["_30" /* ɵdid */](6, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n                "])), (_l()(), core["_31" /* ɵeld */](8, 0, null, null, 23, "ion-item", [["class", "addon-message item item-block"], ["text-wrap", ""]], [[2, "addon-message-mine", null], [24, "@coreSlideInOut", 0]], [[null, "longPress"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("longPress" === en)) {
        var pd_0 = (_co.copyMessage(_v.context.$implicit.smallmessage) !== false);
        ad = (pd_0 && ad);
    } return ad; }, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](9, 212992, null, 0, long_press["a" /* CoreLongPressDirective */], [core["t" /* ElementRef */]], null, { longPress: "longPress" }), core["_30" /* ɵdid */](10, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 4, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 5, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 6, { _icons: 1 }), core["_30" /* ɵdid */](14, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](17, 0, null, 2, 4, "p", [["class", "addon-message-text"]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](19, 0, null, null, 1, "core-format-text", [], null, [[null, "afterRender"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("afterRender" === en)) {
        var pd_0 = ((_v.context.last && _co.scrollToBottom()) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), core["_30" /* ɵdid */](20, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform["a" /* Platform */], utils_utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], providers_logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], app["a" /* CoreAppProvider */], helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */]], { text: [0, "text"] }, { afterRender: "afterRender" }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, 2, 1, null, View_AddonMessagesDiscussionPage_4)), core["_30" /* ɵdid */](24, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, 2, 1, null, View_AddonMessagesDiscussionPage_5)), core["_30" /* ɵdid */](27, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, 2, 1, null, View_AddonMessagesDiscussionPage_6)), core["_30" /* ɵdid */](30, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.showDate(_v.context.$implicit, _co.messages[(_v.context.index - 1)]); _ck(_v, 3, 0, currVal_0); var currVal_1 = _v.context.$implicit.unreadFrom; _ck(_v, 6, 0, currVal_1); _ck(_v, 9, 0); var currVal_4 = _v.context.$implicit.text; _ck(_v, 20, 0, currVal_4); var currVal_5 = !_v.context.$implicit.pending; _ck(_v, 24, 0, currVal_5); var currVal_6 = _v.context.$implicit.pending; _ck(_v, 27, 0, currVal_6); var currVal_7 = (!_v.context.$implicit.sending && _co.showDelete); _ck(_v, 30, 0, currVal_7); }, function (_ck, _v) { var _co = _v.component; var currVal_2 = (_v.context.$implicit.useridfrom == _co.currentUserId); var currVal_3 = ((_v.context.$implicit.useridfrom == _co.currentUserId) ? "" : "fromLeft"); _ck(_v, 8, 0, currVal_2, currVal_3); }); }
function View_AddonMessagesDiscussionPage_7(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "core-empty-box", [["icon", "chatbubbles"]], null, null, null, empty_box_ngfactory["b" /* View_CoreEmptyBoxComponent_0 */], empty_box_ngfactory["a" /* RenderType_CoreEmptyBoxComponent */])), core["_30" /* ɵdid */](1, 49152, null, 0, empty_box["a" /* CoreEmptyBoxComponent */], [], { message: [0, "message"], icon: [1, "icon"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 1, 0, core["_44" /* ɵnov */](_v, 2).transform("addon.messages.nomessages")); var currVal_1 = "chatbubbles"; _ck(_v, 1, 0, currVal_0, currVal_1); }, null); }
function View_AddonMessagesDiscussionPage_0(_l) { return core["_57" /* ɵvid */](0, [core["_47" /* ɵpid */](0, format_date["a" /* CoreFormatDatePipe */], [providers_logger["a" /* CoreLoggerProvider */], translate_service["a" /* TranslateService */]]), core["_52" /* ɵqud */](402653184, 1, { content: 0 }), (_l()(), core["_31" /* ɵeld */](2, 0, null, null, 36, "ion-header", [], null, null, null, null, null)), core["_30" /* ɵdid */](3, 16384, null, 0, toolbar_header["a" /* Header */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, view_controller["a" /* ViewController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_31" /* ɵeld */](5, 0, null, null, 12, "ion-navbar", [["class", "toolbar"], ["core-back-button", ""]], [[8, "hidden", 0], [2, "statusbar-padding", null]], null, null, navbar_ngfactory["b" /* View_Navbar_0 */], navbar_ngfactory["a" /* RenderType_Navbar */])), core["_30" /* ɵdid */](6, 49152, null, 0, navbar["a" /* Navbar */], [app_app["a" /* App */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_30" /* ɵdid */](7, 212992, null, 0, back_button["a" /* CoreBackButtonDirective */], [navbar["a" /* Navbar */], platform["a" /* Platform */], translate_service["a" /* TranslateService */], events["a" /* CoreEventsProvider */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n        "])), (_l()(), core["_31" /* ɵeld */](9, 0, null, 3, 3, "ion-title", [], null, null, null, toolbar_title_ngfactory["b" /* View_ToolbarTitle_0 */], toolbar_title_ngfactory["a" /* RenderType_ToolbarTitle */])), core["_30" /* ɵdid */](10, 49152, null, 0, toolbar_title["a" /* ToolbarTitle */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), (_l()(), core["_31" /* ɵeld */](11, 0, null, 0, 1, "core-format-text", [], null, null, null, null, null)), core["_30" /* ɵdid */](12, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform["a" /* Platform */], utils_utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], providers_logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], app["a" /* CoreAppProvider */], helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */]], { text: [0, "text"] }, null), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n        "])), (_l()(), core["_31" /* ɵeld */](14, 0, null, 2, 2, "ion-buttons", [["end", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](15, 16384, null, 1, toolbar_item["a" /* ToolbarItem */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), core["_52" /* ɵqud */](603979776, 2, { _buttons: 1 }), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_31" /* ɵeld */](19, 0, null, null, 18, "core-navbar-buttons", [["end", ""]], null, null, null, navbar_buttons_ngfactory["b" /* View_CoreNavBarButtonsComponent_0 */], navbar_buttons_ngfactory["a" /* RenderType_CoreNavBarButtonsComponent */])), core["_30" /* ɵdid */](20, 245760, null, 1, navbar_buttons["a" /* CoreNavBarButtonsComponent */], [core["t" /* ElementRef */], providers_logger["a" /* CoreLoggerProvider */], dom["a" /* CoreDomUtilsProvider */]], null, null), core["_52" /* ɵqud */](603979776, 3, { buttons: 1 }), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_31" /* ɵeld */](23, 0, null, 0, 5, "button", [["clear", "true"], ["icon-only", ""], ["ion-button", ""]], [[8, "hidden", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.toggleDelete() !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](24, 1097728, [[3, 4]], 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { clear: [0, "clear"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n            "])), (_l()(), core["_31" /* ɵeld */](26, 0, null, 0, 1, "ion-icon", [["name", "trash"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](27, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_31" /* ɵeld */](30, 0, null, 0, 6, "a", [["core-user-link", ""]], [[8, "hidden", 0], [1, "aria-label", 0]], null, null, null, null)), core["_30" /* ɵdid */](31, 81920, null, 0, user_link["a" /* CoreUserLinkDirective */], [core["t" /* ElementRef */], [2, nav_controller["a" /* NavController */]]], { userId: [0, "userId"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](34, 0, null, null, 1, "img", [["class", "button core-bar-button-image"], ["core-external-content", ""], ["onError", "this.src='assets/img/user-avatar.png'"]], [[8, "src", 4]], null, null, null, null)), core["_30" /* ɵdid */](35, 4210688, null, 0, external_content["a" /* CoreExternalContentDirective */], [core["t" /* ElementRef */], providers_logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], platform["a" /* Platform */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], app["a" /* CoreAppProvider */], utils_utils["a" /* CoreUtilsProvider */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_31" /* ɵeld */](40, 0, null, null, 24, "ion-content", [["class", "has-footer"]], [[2, "statusbar-padding", null], [2, "has-refresher", null]], null, null, content_ngfactory["b" /* View_Content_0 */], content_ngfactory["a" /* RenderType_Content */])), core["_30" /* ɵdid */](41, 4374528, [[1, 4]], 0, content["a" /* Content */], [config["a" /* Config */], platform["a" /* Platform */], dom_controller["a" /* DomController */], core["t" /* ElementRef */], core["V" /* Renderer */], app_app["a" /* App */], keyboard["a" /* Keyboard */], core["M" /* NgZone */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n    "])), (_l()(), core["_31" /* ɵeld */](43, 0, null, 1, 20, "core-loading", [], null, null, null, loading_ngfactory["b" /* View_CoreLoadingComponent_0 */], loading_ngfactory["a" /* RenderType_CoreLoadingComponent */])), core["_30" /* ɵdid */](44, 638976, null, 0, loading["a" /* CoreLoadingComponent */], [translate_service["a" /* TranslateService */], core["t" /* ElementRef */], events["a" /* CoreEventsProvider */], utils_utils["a" /* CoreUtilsProvider */]], { hideUntil: [0, "hideUntil"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_31" /* ɵeld */](47, 0, null, 0, 5, "ion-infinite-scroll", [["position", "top"]], null, [[null, "ionInfinite"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("ionInfinite" === en)) {
        var pd_0 = (_co.loadPrevious($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), core["_30" /* ɵdid */](48, 1196032, null, 0, infinite_scroll["a" /* InfiniteScroll */], [content["a" /* Content */], core["M" /* NgZone */], core["t" /* ElementRef */], dom_controller["a" /* DomController */]], { enabled: [0, "enabled"], position: [1, "position"] }, { ionInfinite: "ionInfinite" }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n           "])), (_l()(), core["_31" /* ɵeld */](50, 0, null, null, 1, "ion-infinite-scroll-content", [], [[1, "state", 0]], null, null, infinite_scroll_content_ngfactory["b" /* View_InfiniteScrollContent_0 */], infinite_scroll_content_ngfactory["a" /* RenderType_InfiniteScrollContent */])), core["_30" /* ɵdid */](51, 114688, null, 0, infinite_scroll_content["a" /* InfiniteScrollContent */], [infinite_scroll["a" /* InfiniteScroll */], config["a" /* Config */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_31" /* ɵeld */](54, 0, null, 0, 5, "ion-list", [["class", "addon-messages-discussion-container"]], [[1, "aria-live", 0]], null, null, null, null)), core["_30" /* ɵdid */](55, 16384, null, 0, list["a" /* List */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], platform["a" /* Platform */], gesture_controller["l" /* GestureController */], dom_controller["a" /* DomController */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonMessagesDiscussionPage_1)), core["_30" /* ɵdid */](58, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonMessagesDiscussionPage_7)), core["_30" /* ɵdid */](62, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_31" /* ɵeld */](66, 0, null, null, 10, "ion-footer", [["class", "footer-adjustable"], ["color", "light"]], null, null, null, null, null)), core["_30" /* ɵdid */](67, 16384, null, 0, toolbar_footer["a" /* Footer */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, view_controller["a" /* ViewController */]]], { color: [0, "color"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_31" /* ɵeld */](69, 0, null, null, 6, "ion-toolbar", [["class", "toolbar"], ["color", "light"], ["position", "bottom"]], [[2, "statusbar-padding", null]], null, null, toolbar_ngfactory["b" /* View_Toolbar_0 */], toolbar_ngfactory["a" /* RenderType_Toolbar */])), core["_30" /* ɵdid */](70, 49152, null, 0, toolbar["a" /* Toolbar */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { color: [0, "color"] }, null), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n        "])), (_l()(), core["_31" /* ɵeld */](72, 0, null, 3, 2, "core-send-message-form", [], null, [[null, "onSubmit"], [null, "onResize"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("onSubmit" === en)) {
        var pd_0 = (_co.sendMessage($event) !== false);
        ad = (pd_0 && ad);
    } if (("onResize" === en)) {
        var pd_1 = (_co.resizeContent() !== false);
        ad = (pd_1 && ad);
    } return ad; }, send_message_form_ngfactory["b" /* View_CoreSendMessageFormComponent_0 */], send_message_form_ngfactory["a" /* RenderType_CoreSendMessageFormComponent */])), core["_30" /* ɵdid */](73, 114688, null, 0, send_message_form["a" /* CoreSendMessageFormComponent */], [utils_utils["a" /* CoreUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */]], { placeholder: [0, "placeholder"], showKeyboard: [1, "showKeyboard"] }, { onSubmit: "onSubmit", onResize: "onResize" }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; _ck(_v, 7, 0); var currVal_2 = _co.title; _ck(_v, 12, 0, currVal_2); _ck(_v, 20, 0); var currVal_4 = "true"; _ck(_v, 24, 0, currVal_4); var currVal_6 = "trash"; _ck(_v, 27, 0, currVal_6); var currVal_9 = _co.userId; _ck(_v, 31, 0, currVal_9); var currVal_13 = _co.loaded; _ck(_v, 44, 0, currVal_13); var currVal_14 = _co.canLoadMore; var currVal_15 = "top"; _ck(_v, 48, 0, currVal_14, currVal_15); _ck(_v, 51, 0); var currVal_18 = _co.messages; _ck(_v, 58, 0, currVal_18); var currVal_19 = (!_co.messages || (_co.messages.length <= 0)); _ck(_v, 62, 0, currVal_19); var currVal_20 = "light"; _ck(_v, 67, 0, currVal_20); var currVal_22 = "light"; _ck(_v, 70, 0, currVal_22); var currVal_23 = core["_56" /* ɵunv */](_v, 73, 0, core["_44" /* ɵnov */](_v, 74).transform("addon.messages.newmessage")); var currVal_24 = _co.showKeyboard; _ck(_v, 73, 0, currVal_23, currVal_24); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = core["_44" /* ɵnov */](_v, 6)._hidden; var currVal_1 = core["_44" /* ɵnov */](_v, 6)._sbPadding; _ck(_v, 5, 0, currVal_0, currVal_1); var currVal_3 = !_co.canDelete; _ck(_v, 23, 0, currVal_3); var currVal_5 = core["_44" /* ɵnov */](_v, 27)._hidden; _ck(_v, 26, 0, currVal_5); var currVal_7 = !_co.showProfileLink; var currVal_8 = core["_56" /* ɵunv */](_v, 30, 1, core["_44" /* ɵnov */](_v, 32).transform("core.user.viewprofile")); _ck(_v, 30, 0, currVal_7, currVal_8); var currVal_10 = _co.profileLink; _ck(_v, 34, 0, currVal_10); var currVal_11 = core["_44" /* ɵnov */](_v, 41).statusbarPadding; var currVal_12 = core["_44" /* ɵnov */](_v, 41)._hasRefresher; _ck(_v, 40, 0, currVal_11, currVal_12); var currVal_16 = core["_44" /* ɵnov */](_v, 51).inf.state; _ck(_v, 50, 0, currVal_16); var currVal_17 = _co.polite; _ck(_v, 54, 0, currVal_17); var currVal_21 = core["_44" /* ɵnov */](_v, 70)._sbPadding; _ck(_v, 69, 0, currVal_21); }); }
function View_AddonMessagesDiscussionPage_Host_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "page-addon-messages-discussion", [], null, null, null, View_AddonMessagesDiscussionPage_0, RenderType_AddonMessagesDiscussionPage)), core["_30" /* ɵdid */](1, 180224, null, 0, discussion_AddonMessagesDiscussionPage, [events["a" /* CoreEventsProvider */], sites["a" /* CoreSitesProvider */], nav_params["a" /* NavParams */], user["a" /* CoreUserProvider */], nav_controller["a" /* NavController */], sync["a" /* AddonMessagesSyncProvider */], dom["a" /* CoreDomUtilsProvider */], messages["a" /* AddonMessagesProvider */], providers_logger["a" /* CoreLoggerProvider */], utils_utils["a" /* CoreUtilsProvider */], app["a" /* CoreAppProvider */], translate_service["a" /* TranslateService */]], null, null)], null, null); }
var AddonMessagesDiscussionPageNgFactory = core["_27" /* ɵccf */]("page-addon-messages-discussion", discussion_AddonMessagesDiscussionPage, View_AddonMessagesDiscussionPage_Host_0, {}, {}, []);

//# sourceMappingURL=discussion.ngfactory.js.map
// EXTERNAL MODULE: ./node_modules/@angular/forms/esm5/forms.js
var esm5_forms = __webpack_require__(18);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.loader.js
var translate_loader = __webpack_require__(320);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.compiler.js
var translate_compiler = __webpack_require__(321);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.parser.js
var translate_parser = __webpack_require__(323);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/missing-translation-handler.js
var missing_translation_handler = __webpack_require__(322);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.store.js
var translate_store = __webpack_require__(416);

// EXTERNAL MODULE: ./node_modules/ionic-angular/module.js
var ionic_angular_module = __webpack_require__(631);

// EXTERNAL MODULE: ./node_modules/ionic-angular/util/module-loader.js
var module_loader = __webpack_require__(237);

// CONCATENATED MODULE: ./src/addon/messages/pages/discussion/discussion.module.ngfactory.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddonMessagesDiscussionPageModuleNgFactory", function() { return AddonMessagesDiscussionPageModuleNgFactory; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 






























var AddonMessagesDiscussionPageModuleNgFactory = core["_28" /* ɵcmf */](discussion_module_AddonMessagesDiscussionPageModule, [], function (_l) { return core["_40" /* ɵmod */]([core["_41" /* ɵmpd */](512, core["o" /* ComponentFactoryResolver */], core["_21" /* ɵCodegenComponentFactoryResolver */], [[8, [action_sheet_component_ngfactory["a" /* ActionSheetCmpNgFactory */], alert_component_ngfactory["a" /* AlertCmpNgFactory */], app_root_ngfactory["a" /* IonicAppNgFactory */], loading_component_ngfactory["a" /* LoadingCmpNgFactory */], modal_component_ngfactory["a" /* ModalCmpNgFactory */], picker_component_ngfactory["a" /* PickerCmpNgFactory */], popover_component_ngfactory["a" /* PopoverCmpNgFactory */], select_popover_component_ngfactory["a" /* SelectPopoverNgFactory */], toast_component_ngfactory["a" /* ToastCmpNgFactory */], context_menu_popover_ngfactory["a" /* CoreContextMenuPopoverComponentNgFactory */], course_picker_menu_popover_ngfactory["a" /* CoreCoursePickerMenuPopoverComponentNgFactory */], recaptchamodal_ngfactory["a" /* CoreRecaptchaModalComponentNgFactory */], AddonMessagesDiscussionPageNgFactory]], [3, core["o" /* ComponentFactoryResolver */]], core["K" /* NgModuleRef */]]), core["_41" /* ɵmpd */](4608, common["m" /* NgLocalization */], common["l" /* NgLocaleLocalization */], [core["G" /* LOCALE_ID */], [2, common["v" /* ɵa */]]]), core["_41" /* ɵmpd */](4608, esm5_forms["x" /* ɵi */], esm5_forms["x" /* ɵi */], []), core["_41" /* ɵmpd */](4608, esm5_forms["d" /* FormBuilder */], esm5_forms["d" /* FormBuilder */], []), core["_41" /* ɵmpd */](4608, translate_loader["b" /* TranslateLoader */], translate_loader["a" /* TranslateFakeLoader */], []), core["_41" /* ɵmpd */](4608, translate_compiler["a" /* TranslateCompiler */], translate_compiler["b" /* TranslateFakeCompiler */], []), core["_41" /* ɵmpd */](4608, translate_parser["b" /* TranslateParser */], translate_parser["a" /* TranslateDefaultParser */], []), core["_41" /* ɵmpd */](4608, missing_translation_handler["b" /* MissingTranslationHandler */], missing_translation_handler["a" /* FakeMissingTranslationHandler */], []), core["_41" /* ɵmpd */](4608, translate_service["a" /* TranslateService */], translate_service["a" /* TranslateService */], [translate_store["a" /* TranslateStore */], translate_loader["b" /* TranslateLoader */], translate_compiler["a" /* TranslateCompiler */], translate_parser["b" /* TranslateParser */], missing_translation_handler["b" /* MissingTranslationHandler */], translate_service["b" /* USE_DEFAULT_LANG */], translate_service["c" /* USE_STORE */]]), core["_41" /* ɵmpd */](512, common["b" /* CommonModule */], common["b" /* CommonModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["v" /* ɵba */], esm5_forms["v" /* ɵba */], []), core["_41" /* ɵmpd */](512, esm5_forms["i" /* FormsModule */], esm5_forms["i" /* FormsModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["s" /* ReactiveFormsModule */], esm5_forms["s" /* ReactiveFormsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["a" /* IonicModule */], ionic_angular_module["a" /* IonicModule */], []), core["_41" /* ɵmpd */](512, _ngx_translate_core["b" /* TranslateModule */], _ngx_translate_core["b" /* TranslateModule */], []), core["_41" /* ɵmpd */](512, directives_module["a" /* CoreDirectivesModule */], directives_module["a" /* CoreDirectivesModule */], []), core["_41" /* ɵmpd */](512, pipes_module["a" /* CorePipesModule */], pipes_module["a" /* CorePipesModule */], []), core["_41" /* ɵmpd */](512, components_module["a" /* CoreComponentsModule */], components_module["a" /* CoreComponentsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["b" /* IonicPageModule */], ionic_angular_module["b" /* IonicPageModule */], []), core["_41" /* ɵmpd */](512, discussion_module_AddonMessagesDiscussionPageModule, discussion_module_AddonMessagesDiscussionPageModule, []), core["_41" /* ɵmpd */](256, translate_service["c" /* USE_STORE */], undefined, []), core["_41" /* ɵmpd */](256, translate_service["b" /* USE_DEFAULT_LANG */], undefined, []), core["_41" /* ɵmpd */](256, module_loader["a" /* LAZY_LOADED_TOKEN */], discussion_AddonMessagesDiscussionPage, [])]); });

//# sourceMappingURL=discussion.module.ngfactory.js.map

/***/ }),

/***/ 1883:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RenderType_Toolbar; });
/* harmony export (immutable) */ __webpack_exports__["b"] = View_Toolbar_0;
/* unused harmony export View_Toolbar_Host_0 */
/* unused harmony export ToolbarNgFactory */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__toolbar__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_config__ = __webpack_require__(6);
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

/***/ 1885:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RenderType_CoreSendMessageFormComponent; });
/* harmony export (immutable) */ __webpack_exports__["b"] = View_CoreSendMessageFormComponent_0;
/* unused harmony export View_CoreSendMessageFormComponent_Host_0 */
/* unused harmony export CoreSendMessageFormComponentNgFactory */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__directives_auto_focus__ = __webpack_require__(327);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_utils_dom__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_utils_utils__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular_navigation_nav_controller__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__directives_auto_rows__ = __webpack_require__(335);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ionic_angular_components_toolbar_toolbar_item__ = __webpack_require__(418);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ionic_angular_config_config__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ionic_angular_components_toolbar_toolbar__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ionic_angular_components_toolbar_navbar__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__node_modules_ionic_angular_components_button_button_ngfactory__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ionic_angular_components_button_button__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__directives_supress_events__ = __webpack_require__(338);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ngx_translate_core_src_translate_pipe__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ngx_translate_core_src_translate_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_ionic_angular_components_icon_icon__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__send_message_form__ = __webpack_require__(1299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_utils_text__ = __webpack_require__(11);
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
    } return ad; }, null, null)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](1, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["w" /* ɵbf */], [], null, null), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](2, 4210688, null, 0, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["p" /* NgForm */], [[8, null], [8, null]], null, null), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_50" /* ɵprd */](2048, null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* ControlContainer */], null, [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["p" /* NgForm */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](4, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["o" /* NgControlStatusGroup */], [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* ControlContainer */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](6, 0, null, null, 7, "textarea", [["class", "core-send-message-input"], ["core-auto-rows", ""], ["name", "message"], ["rows", "1"]], [[8, "placeholder", 0], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "onResize"], [null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"], [null, "change"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("input" === en)) {
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
    } return ad; }, null, null)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](7, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* DefaultValueAccessor */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Renderer2 */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], [2, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* COMPOSITION_BUFFER_MODE */]]], null, null), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_50" /* ɵprd */](1024, null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["l" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* DefaultValueAccessor */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](9, 671744, null, 0, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["q" /* NgModel */], [[2, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* ControlContainer */]], [8, null], [8, null], [2, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["l" /* NG_VALUE_ACCESSOR */]]], { name: [0, "name"], model: [1, "model"] }, { update: "ngModelChange" }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_50" /* ɵprd */](2048, null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["m" /* NgControl */], null, [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["q" /* NgModel */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](11, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["n" /* NgControlStatus */], [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["m" /* NgControl */]], null, null), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](12, 81920, null, 0, __WEBPACK_IMPORTED_MODULE_2__directives_auto_focus__["a" /* CoreAutoFocusDirective */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_3__providers_utils_dom__["a" /* CoreDomUtilsProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_utils_utils__["a" /* CoreUtilsProvider */], [2, __WEBPACK_IMPORTED_MODULE_5_ionic_angular_navigation_nav_controller__["a" /* NavController */]]], { coreAutoFocus: [0, "coreAutoFocus"] }, null), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](13, 4210688, null, 0, __WEBPACK_IMPORTED_MODULE_6__directives_auto_rows__["a" /* CoreAutoRowsDirective */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */]], null, { onResize: "onResize" }), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](15, 0, null, null, 12, "ion-buttons", [["end", ""]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](16, 16384, null, 1, __WEBPACK_IMPORTED_MODULE_7_ionic_angular_components_toolbar_toolbar_item__["a" /* ToolbarItem */], [__WEBPACK_IMPORTED_MODULE_8_ionic_angular_config_config__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */], [2, __WEBPACK_IMPORTED_MODULE_9_ionic_angular_components_toolbar_toolbar__["a" /* Toolbar */]], [2, __WEBPACK_IMPORTED_MODULE_10_ionic_angular_components_toolbar_navbar__["a" /* Navbar */]]], null, null), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_52" /* ɵqud */](603979776, 1, { _buttons: 1 }), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](19, 0, null, null, 7, "button", [["clear", "true"], ["icon-only", ""], ["ion-button", ""], ["type", "submit"]], [[8, "disabled", 0], [1, "aria-label", 0]], [[null, "onClick"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("onClick" === en)) {
        var pd_0 = (_co.submitForm($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_11__node_modules_ionic_angular_components_button_button_ngfactory__["b" /* View_Button_0 */], __WEBPACK_IMPORTED_MODULE_11__node_modules_ionic_angular_components_button_button_ngfactory__["a" /* RenderType_Button */])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](20, 1097728, [[1, 4]], 0, __WEBPACK_IMPORTED_MODULE_12_ionic_angular_components_button_button__["a" /* Button */], [[8, ""], __WEBPACK_IMPORTED_MODULE_8_ionic_angular_config_config__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */]], { clear: [0, "clear"] }, null), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](21, 81920, null, 0, __WEBPACK_IMPORTED_MODULE_13__directives_supress_events__["a" /* CoreSupressEventsDirective */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */]], null, { onClick: "onClick" }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_47" /* ɵpid */](131072, __WEBPACK_IMPORTED_MODULE_14__ngx_translate_core_src_translate_pipe__["a" /* TranslatePipe */], [__WEBPACK_IMPORTED_MODULE_15__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */]]), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 0, ["\n            "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](24, 0, null, 0, 1, "ion-icon", [["color", "dark"], ["name", "send"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](25, 147456, null, 0, __WEBPACK_IMPORTED_MODULE_16_ionic_angular_components_icon_icon__["a" /* Icon */], [__WEBPACK_IMPORTED_MODULE_8_ionic_angular_config_config__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */]], { color: [0, "color"], name: [1, "name"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_15 = "message"; var currVal_16 = _co.message; _ck(_v, 9, 0, currVal_15, currVal_16); var currVal_17 = _co.showKeyboard; _ck(_v, 12, 0, currVal_17); var currVal_20 = "true"; _ck(_v, 20, 0, currVal_20); _ck(_v, 21, 0); var currVal_22 = "dark"; var currVal_23 = "send"; _ck(_v, 25, 0, currVal_22, currVal_23); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 4).ngClassUntouched; var currVal_1 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 4).ngClassTouched; var currVal_2 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 4).ngClassPristine; var currVal_3 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 4).ngClassDirty; var currVal_4 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 4).ngClassValid; var currVal_5 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 4).ngClassInvalid; var currVal_6 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 4).ngClassPending; _ck(_v, 0, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6); var currVal_7 = _co.placeholder; var currVal_8 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 11).ngClassUntouched; var currVal_9 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 11).ngClassTouched; var currVal_10 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 11).ngClassPristine; var currVal_11 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 11).ngClassDirty; var currVal_12 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 11).ngClassValid; var currVal_13 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 11).ngClassInvalid; var currVal_14 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 11).ngClassPending; _ck(_v, 6, 0, currVal_7, currVal_8, currVal_9, currVal_10, currVal_11, currVal_12, currVal_13, currVal_14); var currVal_18 = !_co.message; var currVal_19 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_56" /* ɵunv */](_v, 19, 1, __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 22).transform("core.send")); _ck(_v, 19, 0, currVal_18, currVal_19); var currVal_21 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 25)._hidden; _ck(_v, 24, 0, currVal_21); }); }
function View_CoreSendMessageFormComponent_Host_0(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 1, "core-send-message-form", [], null, null, null, View_CoreSendMessageFormComponent_0, RenderType_CoreSendMessageFormComponent)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](1, 114688, null, 0, __WEBPACK_IMPORTED_MODULE_17__send_message_form__["a" /* CoreSendMessageFormComponent */], [__WEBPACK_IMPORTED_MODULE_4__providers_utils_utils__["a" /* CoreUtilsProvider */], __WEBPACK_IMPORTED_MODULE_18__providers_utils_text__["a" /* CoreTextUtilsProvider */]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var CoreSendMessageFormComponentNgFactory = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_27" /* ɵccf */]("core-send-message-form", __WEBPACK_IMPORTED_MODULE_17__send_message_form__["a" /* CoreSendMessageFormComponent */], View_CoreSendMessageFormComponent_Host_0, { message: "message", placeholder: "placeholder", showKeyboard: "showKeyboard" }, { onSubmit: "onSubmit", onResize: "onResize" }, []);

//# sourceMappingURL=send-message-form.ngfactory.js.map

/***/ })

});
//# sourceMappingURL=13.js.map