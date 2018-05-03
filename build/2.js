webpackJsonp([2],{

/***/ 1658:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddonNotificationsListPageModule", function() { return AddonNotificationsListPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__directives_directives_module__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pipes_pipes_module__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_components_module__ = __webpack_require__(1758);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__list__ = __webpack_require__(1760);
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








var AddonNotificationsListPageModule = (function () {
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
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_7__list__["a" /* AddonNotificationsListPage */]),
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */].forChild(),
                __WEBPACK_IMPORTED_MODULE_6__components_components_module__["a" /* AddonNotificationsComponentsModule */],
            ],
        })
    ], AddonNotificationsListPageModule);
    return AddonNotificationsListPageModule;
}());

//# sourceMappingURL=list.module.js.map

/***/ }),

/***/ 1758:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddonNotificationsComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__actions_actions__ = __webpack_require__(1759);
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





var AddonNotificationsComponentsModule = (function () {
    function AddonNotificationsComponentsModule() {
    }
    AddonNotificationsComponentsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__actions_actions__["a" /* AddonNotificationsActionsComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* IonicModule */],
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

/***/ 1759:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddonNotificationsActionsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_contentlinks_providers_delegate__ = __webpack_require__(38);
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
 * Component that displays the actions for a notification.
 */
var AddonNotificationsActionsComponent = (function () {
    function AddonNotificationsActionsComponent(contentLinksDelegate) {
        this.contentLinksDelegate = contentLinksDelegate;
        this.actions = [];
    }
    /**
     * Component being initialized.
     */
    AddonNotificationsActionsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.contentLinksDelegate.getActionsFor(this.contextUrl, this.courseId).then(function (actions) {
            _this.actions = actions;
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], AddonNotificationsActionsComponent.prototype, "contextUrl", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Number)
    ], AddonNotificationsActionsComponent.prototype, "courseId", void 0);
    AddonNotificationsActionsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'addon-notifications-actions',template:/*ion-inline-start:"/ionic-projects/moodlemobile2/src/addon/notifications/components/actions/actions.html"*/'<ion-row *ngIf="actions && actions.length > 0">\n    <ion-col *ngFor="let action of actions">\n        <button ion-button icon-left clear small (click)="action.action()">\n            <ion-icon name="{{action.icon}}"></ion-icon>\n            {{ action.message | translate }}\n        </button>\n    </ion-col>\n</ion-row>\n'/*ion-inline-end:"/ionic-projects/moodlemobile2/src/addon/notifications/components/actions/actions.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__core_contentlinks_providers_delegate__["a" /* CoreContentLinksDelegate */]])
    ], AddonNotificationsActionsComponent);
    return AddonNotificationsActionsComponent;
}());

//# sourceMappingURL=actions.js.map

/***/ }),

/***/ 1760:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddonNotificationsListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_utils_dom__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_utils_text__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_events__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_sites__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_utils_utils__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_notifications__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__addon_pushnotifications_providers_delegate__ = __webpack_require__(131);
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
 * Page that displays the list of notifications.
 */
var AddonNotificationsListPage = (function () {
    function AddonNotificationsListPage(navParams, domUtils, eventsProvider, sitesProvider, textUtils, utils, notificationsProvider, pushNotificationsDelegate) {
        this.domUtils = domUtils;
        this.eventsProvider = eventsProvider;
        this.sitesProvider = sitesProvider;
        this.textUtils = textUtils;
        this.utils = utils;
        this.notificationsProvider = notificationsProvider;
        this.pushNotificationsDelegate = pushNotificationsDelegate;
        this.notifications = [];
        this.notificationsLoaded = false;
        this.canLoadMore = false;
        this.readCount = 0;
        this.unreadCount = 0;
    }
    /**
     * View loaded.
     */
    AddonNotificationsListPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.fetchNotifications().finally(function () {
            _this.notificationsLoaded = true;
        });
        this.cronObserver = this.eventsProvider.on(__WEBPACK_IMPORTED_MODULE_7__providers_notifications__["a" /* AddonNotificationsProvider */].READ_CRON_EVENT, function () { return _this.refreshNotifications(); }, this.sitesProvider.getCurrentSiteId());
        this.pushObserver = this.pushNotificationsDelegate.on('receive').subscribe(function (notification) {
            // New notification received. If it's from current site, refresh the data.
            if (_this.utils.isTrueOrOne(notification.notif) && _this.sitesProvider.isCurrentSite(notification.site)) {
                _this.refreshNotifications();
            }
        });
    };
    /**
     * Convenience function to get notifications. Gets unread notifications first.
     *
     * @param {boolean} refreh Whether we're refreshing data.
     * @return {Promise<any>} Resolved when done.
     */
    AddonNotificationsListPage.prototype.fetchNotifications = function (refresh) {
        var _this = this;
        if (refresh) {
            this.readCount = 0;
            this.unreadCount = 0;
        }
        var limit = __WEBPACK_IMPORTED_MODULE_7__providers_notifications__["a" /* AddonNotificationsProvider */].LIST_LIMIT;
        return this.notificationsProvider.getUnreadNotifications(this.unreadCount, limit).then(function (unread) {
            var promise;
            unread.forEach(_this.formatText.bind(_this));
            /* Don't add the unread notifications to this.notifications yet. If there are no unread notifications
               that causes that the "There are no notifications" message is shown in pull to refresh. */
            _this.unreadCount += unread.length;
            if (unread.length < limit) {
                // Limit not reached. Get read notifications until reach the limit.
                var readLimit_1 = limit - unread.length;
                promise = _this.notificationsProvider.getReadNotifications(_this.readCount, readLimit_1).then(function (read) {
                    read.forEach(_this.formatText.bind(_this));
                    _this.readCount += read.length;
                    if (refresh) {
                        _this.notifications = unread.concat(read);
                    }
                    else {
                        _this.notifications = _this.notifications.concat(unread, read);
                    }
                    _this.canLoadMore = read.length >= readLimit_1;
                }).catch(function (error) {
                    if (unread.length == 0) {
                        _this.domUtils.showErrorModalDefault(error, 'addon.notifications.errorgetnotifications', true);
                        _this.canLoadMore = false; // Set to false to prevent infinite calls with infinite-loading.
                    }
                });
            }
            else {
                promise = Promise.resolve();
                if (refresh) {
                    _this.notifications = unread;
                }
                else {
                    _this.notifications = _this.notifications.concat(unread);
                }
                _this.canLoadMore = true;
            }
            return promise.then(function () {
                // Mark retrieved notifications as read if they are not.
                _this.markNotificationsAsRead(unread);
            });
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'addon.notifications.errorgetnotifications', true);
            _this.canLoadMore = false; // Set to false to prevent infinite calls with infinite-loading.
        });
    };
    /**
     * Mark notifications as read.
     *
     * @param {any[]} notifications Array of notification objects.
     */
    AddonNotificationsListPage.prototype.markNotificationsAsRead = function (notifications) {
        var _this = this;
        if (notifications.length > 0) {
            var promises = notifications.map(function (notification) {
                return _this.notificationsProvider.markNotificationRead(notification.id);
            });
            Promise.all(promises).finally(function () {
                _this.notificationsProvider.invalidateNotificationsList().finally(function () {
                    var siteId = _this.sitesProvider.getCurrentSiteId();
                    _this.eventsProvider.trigger(__WEBPACK_IMPORTED_MODULE_7__providers_notifications__["a" /* AddonNotificationsProvider */].READ_CHANGED_EVENT, null, siteId);
                });
            });
        }
    };
    /**
     * Refresh notifications.
     *
     * @param {any} [refresher] Refresher.
     */
    AddonNotificationsListPage.prototype.refreshNotifications = function (refresher) {
        var _this = this;
        this.notificationsProvider.invalidateNotificationsList().finally(function () {
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
     * @param {any} infiniteScroll The infinit scroll instance.
     */
    AddonNotificationsListPage.prototype.loadMoreNotifications = function (infiniteScroll) {
        this.fetchNotifications().finally(function () {
            infiniteScroll.complete();
        });
    };
    /**
     * Formats the text of a notification.
     *
     * @param {any} notification The notification object.
     */
    AddonNotificationsListPage.prototype.formatText = function (notification) {
        var text = notification.mobiletext.replace(/-{4,}/ig, '');
        notification.mobiletext = this.textUtils.replaceNewLines(text, '<br>');
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
            selector: 'page-addon-notifications-list',template:/*ion-inline-start:"/ionic-projects/moodlemobile2/src/addon/notifications/pages/list/list.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>{{ \'addon.notifications.notifications\' | translate }}</ion-title>\n    </ion-navbar>\n</ion-header>\n<ion-content>\n    <ion-refresher [enabled]="notificationsLoaded" (ionRefresh)="refreshNotifications($event)">\n        <ion-refresher-content pullingText="{{ \'core.pulltorefresh\' | translate }}"></ion-refresher-content>\n    </ion-refresher>\n    <core-loading [hideUntil]="notificationsLoaded">\n        <ion-card *ngFor="let notification of notifications">\n            <ion-item>\n                <ion-avatar item-start core-user-link [userId]="notification.useridfrom" [courseId]="notification.courseid">\n                    <img [src]="notification.profileimageurlfrom || \'assets/img/user-avatar.png\'" core-external-content [alt]="\'core.pictureof\' | translate:{$a: notification.userfromfullname}" role="presentation">\n                </ion-avatar>\n                <h2>{{notification.userfromfullname}}</h2>\n                <div item-end *ngIf="!notification.timeread"><ion-icon name="record" color="primary"></ion-icon></div>\n                <p>{{notification.timecreated | coreDateDayOrTime}}</p>\n            </ion-item>\n            <ion-item text-wrap>\n                <p><core-format-text [text]="notification.mobiletext | coreCreateLinks"></core-format-text></p>\n            </ion-item>\n            <addon-notifications-actions [contextUrl]="notification.contexturl" [courseId]="notification.courseid"></addon-notifications-actions>\n        </ion-card>\n        <core-empty-box *ngIf="!notifications || notifications.length <= 0" icon="notifications" [message]="\'addon.notifications.therearentnotificationsyet\' | translate"></core-empty-box>\n        <ion-infinite-scroll [enabled]="canLoadMore" (ionInfinite)="loadMoreNotifications($event)">\n            <ion-infinite-scroll-content></ion-infinite-scroll-content>\n        </ion-infinite-scroll>\n    </core-loading>\n</ion-content>\n'/*ion-inline-end:"/ionic-projects/moodlemobile2/src/addon/notifications/pages/list/list.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_utils_dom__["a" /* CoreDomUtilsProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_events__["a" /* CoreEventsProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_sites__["a" /* CoreSitesProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_utils_text__["a" /* CoreTextUtilsProvider */],
            __WEBPACK_IMPORTED_MODULE_6__providers_utils_utils__["a" /* CoreUtilsProvider */], __WEBPACK_IMPORTED_MODULE_7__providers_notifications__["a" /* AddonNotificationsProvider */],
            __WEBPACK_IMPORTED_MODULE_8__addon_pushnotifications_providers_delegate__["a" /* AddonPushNotificationsDelegate */]])
    ], AddonNotificationsListPage);
    return AddonNotificationsListPage;
}());

//# sourceMappingURL=list.js.map

/***/ })

});
//# sourceMappingURL=2.js.map