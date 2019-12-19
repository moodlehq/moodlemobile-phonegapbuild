webpackJsonp([4],{

/***/ 2119:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddonNotificationsListPageModule", function() { return AddonNotificationsListPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__directives_directives_module__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pipes_pipes_module__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_components_module__ = __webpack_require__(2266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__list__ = __webpack_require__(2268);
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








var AddonNotificationsListPageModule = /** @class */ (function () {
    function AddonNotificationsListPageModule() {
    }
    AddonNotificationsListPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__list__["a" /* AddonNotificationsListPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* CoreComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_4__directives_directives_module__["a" /* CoreDirectivesModule */],
                __WEBPACK_IMPORTED_MODULE_5__pipes_pipes_module__["a" /* CorePipesModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_7__list__["a" /* AddonNotificationsListPage */]),
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */].forChild(),
                __WEBPACK_IMPORTED_MODULE_6__components_components_module__["a" /* AddonNotificationsComponentsModule */],
            ],
        })
    ], AddonNotificationsListPageModule);
    return AddonNotificationsListPageModule;
}());

//# sourceMappingURL=list.module.js.map

/***/ }),

/***/ 2266:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddonNotificationsComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__actions_actions__ = __webpack_require__(2267);
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





var AddonNotificationsComponentsModule = /** @class */ (function () {
    function AddonNotificationsComponentsModule() {
    }
    AddonNotificationsComponentsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__actions_actions__["a" /* AddonNotificationsActionsComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* IonicModule */],
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */].forChild(),
            ],
            providers: [],
            exports: [
                __WEBPACK_IMPORTED_MODULE_4__actions_actions__["a" /* AddonNotificationsActionsComponent */]
            ],
        })
    ], AddonNotificationsComponentsModule);
    return AddonNotificationsComponentsModule;
}());

//# sourceMappingURL=components.module.js.map

/***/ }),

/***/ 2267:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddonNotificationsActionsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_contentlinks_providers_delegate__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_sites__ = __webpack_require__(2);
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
 * Component that displays the actions for a notification.
 */
var AddonNotificationsActionsComponent = /** @class */ (function () {
    function AddonNotificationsActionsComponent(contentLinksDelegate, sitesProvider, navCtrl) {
        this.contentLinksDelegate = contentLinksDelegate;
        this.sitesProvider = sitesProvider;
        this.navCtrl = navCtrl;
        this.actions = [];
    }
    /**
     * Component being initialized.
     */
    AddonNotificationsActionsComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.contextUrl && (!this.data || !this.data.appurl)) {
            // No URL, nothing to do.
            return;
        }
        var promise;
        // Treat appurl first if any.
        if (this.data && this.data.appurl) {
            promise = this.contentLinksDelegate.getActionsFor(this.data.appurl, this.courseId, undefined, this.data);
        }
        else {
            promise = Promise.resolve([]);
        }
        promise.then(function (actions) {
            if (!actions.length && _this.contextUrl) {
                // No appurl or cannot handle it. Try with contextUrl.
                return _this.contentLinksDelegate.getActionsFor(_this.contextUrl, _this.courseId, undefined, _this.data);
            }
            return actions;
        }).then(function (actions) {
            if (!actions.length) {
                // URL is not supported. Add an action to open it in browser.
                actions.push({
                    message: 'core.view',
                    icon: 'eye',
                    action: _this.defaultAction.bind(_this)
                });
            }
            _this.actions = actions;
        });
    };
    /**
     * Default action. Open in browser.
     *
     * @param siteId Site ID to use.
     * @param navCtrl NavController.
     */
    AddonNotificationsActionsComponent.prototype.defaultAction = function (siteId, navCtrl) {
        var url = (this.data && this.data.appurl) || this.contextUrl;
        this.sitesProvider.getCurrentSite().openInBrowserWithAutoLogin(url);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], AddonNotificationsActionsComponent.prototype, "contextUrl", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Number)
    ], AddonNotificationsActionsComponent.prototype, "courseId", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Object)
    ], AddonNotificationsActionsComponent.prototype, "data", void 0);
    AddonNotificationsActionsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'addon-notifications-actions',template:/*ion-inline-start:"/home/travis/build/moodlehq/moodlemobile2/src/addon/notifications/components/actions/addon-notifications-actions.html"*/'<ion-row *ngIf="actions && actions.length > 0" justify-content-around>\n    <ion-col *ngFor="let action of actions">\n        <button ion-button icon-left clear small block (click)="action.action(undefined, navCtrl)">\n            <ion-icon name="{{action.icon}}"></ion-icon>\n            {{ action.message | translate }}\n        </button>\n    </ion-col>\n</ion-row>\n'/*ion-inline-end:"/home/travis/build/moodlehq/moodlemobile2/src/addon/notifications/components/actions/addon-notifications-actions.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__core_contentlinks_providers_delegate__["a" /* CoreContentLinksDelegate */], __WEBPACK_IMPORTED_MODULE_3__providers_sites__["a" /* CoreSitesProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavController */]])
    ], AddonNotificationsActionsComponent);
    return AddonNotificationsActionsComponent;
}());

//# sourceMappingURL=actions.js.map

/***/ }),

/***/ 2268:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddonNotificationsListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_utils_dom__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_utils_text__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_events__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_sites__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_utils_utils__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_notifications__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_helper__ = __webpack_require__(461);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__core_pushnotifications_providers_delegate__ = __webpack_require__(92);
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
 * Page that displays the list of notifications.
 */
var AddonNotificationsListPage = /** @class */ (function () {
    function AddonNotificationsListPage(navParams, domUtils, eventsProvider, sitesProvider, textUtils, utils, notificationsProvider, pushNotificationsDelegate, notificationsHelper) {
        this.domUtils = domUtils;
        this.eventsProvider = eventsProvider;
        this.sitesProvider = sitesProvider;
        this.textUtils = textUtils;
        this.utils = utils;
        this.notificationsProvider = notificationsProvider;
        this.pushNotificationsDelegate = pushNotificationsDelegate;
        this.notificationsHelper = notificationsHelper;
        this.notifications = [];
        this.notificationsLoaded = false;
        this.canLoadMore = false;
        this.loadMoreError = false;
        this.canMarkAllNotificationsAsRead = false;
        this.loadingMarkAllNotificationsAsRead = false;
        this.pendingRefresh = false;
    }
    /**
     * View loaded.
     */
    AddonNotificationsListPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.fetchNotifications();
        this.cronObserver = this.eventsProvider.on(__WEBPACK_IMPORTED_MODULE_7__providers_notifications__["a" /* AddonNotificationsProvider */].READ_CRON_EVENT, function () {
            if (_this.isCurrentView) {
                _this.notificationsLoaded = false;
                _this.refreshNotifications();
            }
        }, this.sitesProvider.getCurrentSiteId());
        this.pushObserver = this.pushNotificationsDelegate.on('receive').subscribe(function (notification) {
            // New notification received. If it's from current site, refresh the data.
            if (_this.isCurrentView && _this.utils.isTrueOrOne(notification.notif) &&
                _this.sitesProvider.isCurrentSite(notification.site)) {
                _this.notificationsLoaded = false;
                _this.refreshNotifications();
            }
            else if (!_this.isCurrentView) {
                _this.pendingRefresh = true;
            }
        });
    };
    /**
     * Convenience function to get notifications. Gets unread notifications first.
     *
     * @param refreh Whether we're refreshing data.
     * @return Resolved when done.
     */
    AddonNotificationsListPage.prototype.fetchNotifications = function (refresh) {
        var _this = this;
        this.loadMoreError = false;
        return this.notificationsHelper.getNotifications(refresh ? [] : this.notifications).then(function (result) {
            result.notifications.forEach(_this.formatText.bind(_this));
            if (refresh) {
                _this.notifications = result.notifications;
            }
            else {
                _this.notifications = _this.notifications.concat(result.notifications);
            }
            _this.canLoadMore = result.canLoadMore;
            _this.markNotificationsAsRead(result.notifications);
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'addon.notifications.errorgetnotifications', true);
            _this.loadMoreError = true; // Set to prevent infinite calls with infinite-loading.
        }).finally(function () {
            _this.notificationsLoaded = true;
        });
    };
    /**
     * Mark all notifications as read.
     */
    AddonNotificationsListPage.prototype.markAllNotificationsAsRead = function () {
        var _this = this;
        this.loadingMarkAllNotificationsAsRead = true;
        this.notificationsProvider.markAllNotificationsAsRead().catch(function () {
            // Omit failure.
        }).then(function () {
            var siteId = _this.sitesProvider.getCurrentSiteId();
            _this.eventsProvider.trigger(__WEBPACK_IMPORTED_MODULE_7__providers_notifications__["a" /* AddonNotificationsProvider */].READ_CHANGED_EVENT, null, siteId);
            // All marked as read, refresh the list.
            _this.notificationsLoaded = false;
            return _this.refreshNotifications();
        });
    };
    /**
     * Mark notifications as read.
     *
     * @param notifications Array of notification objects.
     */
    AddonNotificationsListPage.prototype.markNotificationsAsRead = function (notifications) {
        var _this = this;
        var promise;
        if (notifications.length > 0) {
            var promises = notifications.map(function (notification) {
                if (notification.read) {
                    // Already read, don't mark it.
                    return Promise.resolve();
                }
                return _this.notificationsProvider.markNotificationRead(notification.id);
            });
            promise = Promise.all(promises).catch(function () {
                // Ignore errors.
            }).finally(function () {
                _this.notificationsProvider.invalidateNotificationsList().finally(function () {
                    var siteId = _this.sitesProvider.getCurrentSiteId();
                    _this.eventsProvider.trigger(__WEBPACK_IMPORTED_MODULE_7__providers_notifications__["a" /* AddonNotificationsProvider */].READ_CHANGED_EVENT, null, siteId);
                });
            });
        }
        else {
            promise = Promise.resolve();
        }
        promise.finally(function () {
            // Check if mark all notifications as read is enabled and there are some to read.
            if (_this.notificationsProvider.isMarkAllNotificationsAsReadEnabled()) {
                _this.loadingMarkAllNotificationsAsRead = true;
                return _this.notificationsProvider.getUnreadNotificationsCount().then(function (unread) {
                    _this.canMarkAllNotificationsAsRead = unread > 0;
                }).finally(function () {
                    _this.loadingMarkAllNotificationsAsRead = false;
                });
            }
            _this.canMarkAllNotificationsAsRead = false;
        });
    };
    /**
     * Refresh notifications.
     *
     * @param refresher Refresher.
     * @return Promise<any> Promise resolved when done.
     */
    AddonNotificationsListPage.prototype.refreshNotifications = function (refresher) {
        var _this = this;
        return this.notificationsProvider.invalidateNotificationsList().finally(function () {
            return _this.fetchNotifications(true).finally(function () {
                if (refresher) {
                    refresher.complete();
                }
            });
        });
    };
    /**
     * Load more results.
     *
     * @param infiniteComplete Infinite scroll complete function. Only used from core-infinite-loading.
     */
    AddonNotificationsListPage.prototype.loadMoreNotifications = function (infiniteComplete) {
        this.fetchNotifications().finally(function () {
            infiniteComplete && infiniteComplete();
        });
    };
    /**
     * Formats the text of a notification.
     *
     * @param notification The notification object.
     */
    AddonNotificationsListPage.prototype.formatText = function (notification) {
        var text = notification.mobiletext.replace(/-{4,}/ig, '');
        notification.mobiletext = this.textUtils.replaceNewLines(text, '<br>');
    };
    /**
     * User entered the page.
     */
    AddonNotificationsListPage.prototype.ionViewDidEnter = function () {
        this.isCurrentView = true;
        if (this.pendingRefresh) {
            this.pendingRefresh = false;
            this.notificationsLoaded = false;
            this.refreshNotifications();
        }
    };
    /**
     * User left the page.
     */
    AddonNotificationsListPage.prototype.ionViewDidLeave = function () {
        this.isCurrentView = false;
    };
    /**
     * Page destroyed.
     */
    AddonNotificationsListPage.prototype.ngOnDestroy = function () {
        this.cronObserver && this.cronObserver.off();
        this.pushObserver && this.pushObserver.unsubscribe();
    };
    AddonNotificationsListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-addon-notifications-list',template:/*ion-inline-start:"/home/travis/build/moodlehq/moodlemobile2/src/addon/notifications/pages/list/list.html"*/'<ion-header>\n    <ion-navbar core-back-button>\n        <ion-title>{{ \'addon.notifications.notifications\' | translate }}</ion-title>\n    </ion-navbar>\n</ion-header>\n<ion-content>\n    <ion-refresher [enabled]="notificationsLoaded" (ionRefresh)="refreshNotifications($event)">\n        <ion-refresher-content pullingText="{{ \'core.pulltorefresh\' | translate }}"></ion-refresher-content>\n    </ion-refresher>\n    <core-loading [hideUntil]="notificationsLoaded">\n        <div padding *ngIf="canMarkAllNotificationsAsRead">\n            <button ion-button block (click)="markAllNotificationsAsRead()" color="light" icon-start *ngIf="!loadingMarkAllNotificationsAsRead">\n                <core-icon name="fa-check"></core-icon>\n                {{ \'addon.notifications.markallread\' | translate }}\n            </button>\n            <button ion-button block color="light" icon-start *ngIf="loadingMarkAllNotificationsAsRead">\n                <ion-spinner></ion-spinner>\n            </button>\n        </div>\n        <ion-card *ngFor="let notification of notifications">\n            <ion-item text-wrap>\n                <ion-avatar *ngIf="notification.useridfrom > 0" core-user-avatar [user]="notification" item-start [profileUrl]="notification.profileimageurlfrom" [fullname]="notification.userfromfullname" [userId]="notification.useridfrom" [extraIcon]="notification.iconurl"></ion-avatar>\n                <img *ngIf="notification.useridfrom <= 0 && notification.iconurl" [src]="notification.iconurl" alt="" role="presentation" class="core-notification-icon" item-start>\n                <h2>{{ notification.subject }}</h2>\n                <p><ion-note float-end padding-left text-end>\n                        {{notification.timecreated | coreDateDayOrTime}}\n                        <span *ngIf="!notification.timeread"><core-icon name="fa-circle" color="primary"></core-icon></span>\n                    </ion-note>\n                </p>\n                <p *ngIf="notification.userfromfullname">{{ notification.userfromfullname }}</p>\n            </ion-item>\n            <ion-item text-wrap>\n                <p><core-format-text [text]="notification.mobiletext | coreCreateLinks" contextLevel="system" [contextInstanceId]="0"></core-format-text></p>\n            </ion-item>\n            <addon-notifications-actions [contextUrl]="notification.contexturl" [courseId]="notification.courseid" [data]="notification.customdata"></addon-notifications-actions>\n        </ion-card>\n        <core-empty-box *ngIf="!notifications || notifications.length <= 0" icon="notifications" [message]="\'addon.notifications.therearentnotificationsyet\' | translate"></core-empty-box>\n        <core-infinite-loading [enabled]="canLoadMore" (action)="loadMoreNotifications($event)" [error]="loadMoreError"></core-infinite-loading>\n    </core-loading>\n</ion-content>\n'/*ion-inline-end:"/home/travis/build/moodlehq/moodlemobile2/src/addon/notifications/pages/list/list.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_utils_dom__["a" /* CoreDomUtilsProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_events__["a" /* CoreEventsProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_sites__["a" /* CoreSitesProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_utils_text__["a" /* CoreTextUtilsProvider */],
            __WEBPACK_IMPORTED_MODULE_6__providers_utils_utils__["a" /* CoreUtilsProvider */], __WEBPACK_IMPORTED_MODULE_7__providers_notifications__["a" /* AddonNotificationsProvider */],
            __WEBPACK_IMPORTED_MODULE_9__core_pushnotifications_providers_delegate__["a" /* CorePushNotificationsDelegate */],
            __WEBPACK_IMPORTED_MODULE_8__providers_helper__["a" /* AddonNotificationsHelperProvider */]])
    ], AddonNotificationsListPage);
    return AddonNotificationsListPage;
}());

//# sourceMappingURL=list.js.map

/***/ })

});
//# sourceMappingURL=4.js.map