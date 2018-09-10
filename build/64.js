webpackJsonp([64],{

/***/ 1826:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/@angular/core/esm5/core.js
var core = __webpack_require__(0);

// EXTERNAL MODULE: ./node_modules/ionic-angular/index.js + 3 modules
var ionic_angular = __webpack_require__(9);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/index.js + 1 modules
var _ngx_translate_core = __webpack_require__(4);

// EXTERNAL MODULE: ./src/components/components.module.ts
var components_module = __webpack_require__(32);

// EXTERNAL MODULE: ./src/directives/directives.module.ts + 2 modules
var directives_module = __webpack_require__(28);

// EXTERNAL MODULE: ./src/pipes/pipes.module.ts + 1 modules
var pipes_module = __webpack_require__(109);

// EXTERNAL MODULE: ./node_modules/@angular/common/esm5/common.js
var common = __webpack_require__(8);

// EXTERNAL MODULE: ./src/core/contentlinks/providers/delegate.ts
var delegate = __webpack_require__(61);

// CONCATENATED MODULE: ./src/addon/notifications/components/actions/actions.ts
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
var actions_AddonNotificationsActionsComponent = /** @class */ (function () {
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
        Object(core["D" /* Input */])(),
        __metadata("design:type", String)
    ], AddonNotificationsActionsComponent.prototype, "contextUrl", void 0);
    __decorate([
        Object(core["D" /* Input */])(),
        __metadata("design:type", Number)
    ], AddonNotificationsActionsComponent.prototype, "courseId", void 0);
    AddonNotificationsActionsComponent = __decorate([
        Object(core["m" /* Component */])({
            selector: 'addon-notifications-actions',
            templateUrl: 'addon-notifications-actions.html',
        }),
        __metadata("design:paramtypes", [delegate["a" /* CoreContentLinksDelegate */]])
    ], AddonNotificationsActionsComponent);
    return AddonNotificationsActionsComponent;
}());

//# sourceMappingURL=actions.js.map
// CONCATENATED MODULE: ./src/addon/notifications/components/components.module.ts
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
var components_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var components_module_AddonNotificationsComponentsModule = /** @class */ (function () {
    function AddonNotificationsComponentsModule() {
    }
    AddonNotificationsComponentsModule = components_module___decorate([
        Object(core["I" /* NgModule */])({
            declarations: [
                actions_AddonNotificationsActionsComponent
            ],
            imports: [
                common["b" /* CommonModule */],
                ionic_angular["k" /* IonicModule */],
                _ngx_translate_core["b" /* TranslateModule */].forChild(),
            ],
            providers: [],
            exports: [
                actions_AddonNotificationsActionsComponent
            ],
        })
    ], AddonNotificationsComponentsModule);
    return AddonNotificationsComponentsModule;
}());

//# sourceMappingURL=components.module.js.map
// EXTERNAL MODULE: ./src/providers/utils/dom.ts
var dom = __webpack_require__(3);

// EXTERNAL MODULE: ./src/providers/utils/text.ts
var utils_text = __webpack_require__(11);

// EXTERNAL MODULE: ./src/providers/events.ts
var events = __webpack_require__(12);

// EXTERNAL MODULE: ./src/providers/sites.ts
var sites = __webpack_require__(1);

// EXTERNAL MODULE: ./src/providers/utils/utils.ts
var utils = __webpack_require__(2);

// EXTERNAL MODULE: ./src/addon/notifications/providers/notifications.ts
var providers_notifications = __webpack_require__(272);

// EXTERNAL MODULE: ./src/addon/pushnotifications/providers/delegate.ts
var providers_delegate = __webpack_require__(218);

// CONCATENATED MODULE: ./src/addon/notifications/pages/list/list.ts
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
var list___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var list___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









/**
 * Page that displays the list of notifications.
 */
var list_AddonNotificationsListPage = /** @class */ (function () {
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
        this.canMarkAllNotificationsAsRead = false;
        this.loadingMarkAllNotificationsAsRead = false;
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
        this.cronObserver = this.eventsProvider.on(providers_notifications["a" /* AddonNotificationsProvider */].READ_CRON_EVENT, function () { return _this.refreshNotifications(); }, this.sitesProvider.getCurrentSiteId());
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
        var limit = providers_notifications["a" /* AddonNotificationsProvider */].LIST_LIMIT;
        return this.notificationsProvider.getUnreadNotifications(this.unreadCount, limit).then(function (unread) {
            var promises = [];
            unread.forEach(_this.formatText.bind(_this));
            /* Don't add the unread notifications to this.notifications yet. If there are no unread notifications
               that causes that the "There are no notifications" message is shown in pull to refresh. */
            _this.unreadCount += unread.length;
            if (unread.length < limit) {
                // Limit not reached. Get read notifications until reach the limit.
                var readLimit_1 = limit - unread.length;
                promises.push(_this.notificationsProvider.getReadNotifications(_this.readCount, readLimit_1).then(function (read) {
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
                }));
            }
            else {
                if (refresh) {
                    _this.notifications = unread;
                }
                else {
                    _this.notifications = _this.notifications.concat(unread);
                }
                _this.canLoadMore = true;
            }
            return Promise.all(promises).then(function () {
                // Mark retrieved notifications as read if they are not.
                _this.markNotificationsAsRead(unread);
            });
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'addon.notifications.errorgetnotifications', true);
            _this.canLoadMore = false; // Set to false to prevent infinite calls with infinite-loading.
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
        }).finally(function () {
            var siteId = _this.sitesProvider.getCurrentSiteId();
            _this.eventsProvider.trigger(providers_notifications["a" /* AddonNotificationsProvider */].READ_CHANGED_EVENT, null, siteId);
            _this.notificationsProvider.getUnreadNotificationsCount().then(function (unread) {
                _this.canMarkAllNotificationsAsRead = unread > 0;
                _this.loadingMarkAllNotificationsAsRead = false;
            });
        });
    };
    /**
     * Mark notifications as read.
     *
     * @param {any[]} notifications Array of notification objects.
     */
    AddonNotificationsListPage.prototype.markNotificationsAsRead = function (notifications) {
        var _this = this;
        var promise;
        if (notifications.length > 0) {
            var promises = notifications.map(function (notification) {
                return _this.notificationsProvider.markNotificationRead(notification.id);
            });
            promise = Promise.all(promises).catch(function () {
                // Ignore errors.
            }).finally(function () {
                _this.notificationsProvider.invalidateNotificationsList().finally(function () {
                    var siteId = _this.sitesProvider.getCurrentSiteId();
                    _this.eventsProvider.trigger(providers_notifications["a" /* AddonNotificationsProvider */].READ_CHANGED_EVENT, null, siteId);
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
                    _this.loadingMarkAllNotificationsAsRead = false;
                });
            }
            _this.canMarkAllNotificationsAsRead = false;
        });
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
    AddonNotificationsListPage = list___decorate([
        Object(core["m" /* Component */])({
            selector: 'page-addon-notifications-list',
            templateUrl: 'list.html',
        }),
        list___metadata("design:paramtypes", [ionic_angular["s" /* NavParams */], dom["a" /* CoreDomUtilsProvider */], events["a" /* CoreEventsProvider */],
            sites["a" /* CoreSitesProvider */], utils_text["a" /* CoreTextUtilsProvider */],
            utils["a" /* CoreUtilsProvider */], providers_notifications["a" /* AddonNotificationsProvider */],
            providers_delegate["a" /* AddonPushNotificationsDelegate */]])
    ], AddonNotificationsListPage);
    return AddonNotificationsListPage;
}());

//# sourceMappingURL=list.js.map
// CONCATENATED MODULE: ./src/addon/notifications/pages/list/list.module.ts
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
var list_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var list_module_AddonNotificationsListPageModule = /** @class */ (function () {
    function AddonNotificationsListPageModule() {
    }
    AddonNotificationsListPageModule = list_module___decorate([
        Object(core["I" /* NgModule */])({
            declarations: [
                list_AddonNotificationsListPage,
            ],
            imports: [
                components_module["a" /* CoreComponentsModule */],
                directives_module["a" /* CoreDirectivesModule */],
                pipes_module["a" /* CorePipesModule */],
                ionic_angular["l" /* IonicPageModule */].forChild(list_AddonNotificationsListPage),
                _ngx_translate_core["b" /* TranslateModule */].forChild(),
                components_module_AddonNotificationsComponentsModule,
            ],
        })
    ], AddonNotificationsListPageModule);
    return AddonNotificationsListPageModule;
}());

//# sourceMappingURL=list.module.js.map
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

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.ngfactory.js
var button_ngfactory = __webpack_require__(45);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.js
var button_button = __webpack_require__(40);

// EXTERNAL MODULE: ./node_modules/ionic-angular/config/config.js
var config = __webpack_require__(6);

// EXTERNAL MODULE: ./src/components/icon/icon.ngfactory.js
var icon_ngfactory = __webpack_require__(194);

// EXTERNAL MODULE: ./src/components/icon/icon.ts
var icon = __webpack_require__(165);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.pipe.js
var translate_pipe = __webpack_require__(29);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.service.js
var translate_service = __webpack_require__(17);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/spinner/spinner.ngfactory.js
var spinner_ngfactory = __webpack_require__(180);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/spinner/spinner.js
var spinner = __webpack_require__(134);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/card/card.js
var card = __webpack_require__(90);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item.ngfactory.js + 1 modules
var item_ngfactory = __webpack_require__(33);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item.js
var item = __webpack_require__(20);

// EXTERNAL MODULE: ./node_modules/ionic-angular/util/form.js
var util_form = __webpack_require__(19);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-reorder.js + 1 modules
var item_reorder = __webpack_require__(27);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-content.js
var item_content = __webpack_require__(30);

// EXTERNAL MODULE: ./src/directives/user-link.ts
var user_link = __webpack_require__(238);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-controller.js
var nav_controller = __webpack_require__(21);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/avatar/avatar.js
var avatar = __webpack_require__(179);

// EXTERNAL MODULE: ./src/directives/external-content.ts
var external_content = __webpack_require__(162);

// EXTERNAL MODULE: ./src/providers/logger.ts
var logger = __webpack_require__(5);

// EXTERNAL MODULE: ./src/providers/filepool.ts
var filepool = __webpack_require__(16);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/platform.js + 1 modules
var platform = __webpack_require__(14);

// EXTERNAL MODULE: ./src/providers/utils/url.ts
var url = __webpack_require__(24);

// EXTERNAL MODULE: ./src/providers/app.ts
var app = __webpack_require__(10);

// EXTERNAL MODULE: ./src/directives/format-text.ts
var format_text = __webpack_require__(39);

// EXTERNAL MODULE: ./src/core/contentlinks/providers/helper.ts
var helper = __webpack_require__(22);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.js
var content = __webpack_require__(23);

// EXTERNAL MODULE: ./src/components/split-view/split-view.ts
var split_view = __webpack_require__(34);

// EXTERNAL MODULE: ./src/providers/utils/iframe.ts
var iframe = __webpack_require__(37);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/grid/col.js
var col = __webpack_require__(114);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/icon/icon.js
var icon_icon = __webpack_require__(41);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/grid/row.js
var row = __webpack_require__(115);

// CONCATENATED MODULE: ./src/addon/notifications/components/actions/actions.ngfactory.js
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 












var styles_AddonNotificationsActionsComponent = [];
var RenderType_AddonNotificationsActionsComponent = core["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_AddonNotificationsActionsComponent, data: {} });

function View_AddonNotificationsActionsComponent_2(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 10, "ion-col", [["class", "col"]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, col["a" /* Col */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 6, "button", [["block", ""], ["clear", ""], ["icon-left", ""], ["ion-button", ""], ["small", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (_v.context.$implicit.action() !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](4, 1097728, null, 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { small: [0, "small"], clear: [1, "clear"], block: [2, "block"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n            "])), (_l()(), core["_31" /* ɵeld */](6, 0, null, 0, 1, "ion-icon", [["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](7, 147456, null, 0, icon_icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ɵted */](8, 0, ["\n            ", "\n        "])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "]))], function (_ck, _v) { var currVal_0 = ""; var currVal_1 = ""; var currVal_2 = ""; _ck(_v, 4, 0, currVal_0, currVal_1, currVal_2); var currVal_4 = core["_34" /* ɵinlineInterpolate */](1, "", _v.context.$implicit.icon, ""); _ck(_v, 7, 0, currVal_4); }, function (_ck, _v) { var currVal_3 = core["_44" /* ɵnov */](_v, 7)._hidden; _ck(_v, 6, 0, currVal_3); var currVal_5 = core["_56" /* ɵunv */](_v, 8, 0, core["_44" /* ɵnov */](_v, 9).transform(_v.context.$implicit.message)); _ck(_v, 8, 0, currVal_5); }); }
function View_AddonNotificationsActionsComponent_1(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 5, "ion-row", [["class", "row"], ["justify-content-around", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, row["a" /* Row */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonNotificationsActionsComponent_2)), core["_30" /* ɵdid */](4, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.actions; _ck(_v, 4, 0, currVal_0); }, null); }
function View_AddonNotificationsActionsComponent_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonNotificationsActionsComponent_1)), core["_30" /* ɵdid */](1, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = (_co.actions && (_co.actions.length > 0)); _ck(_v, 1, 0, currVal_0); }, null); }
function View_AddonNotificationsActionsComponent_Host_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "addon-notifications-actions", [], null, null, null, View_AddonNotificationsActionsComponent_0, RenderType_AddonNotificationsActionsComponent)), core["_30" /* ɵdid */](1, 114688, null, 0, actions_AddonNotificationsActionsComponent, [delegate["a" /* CoreContentLinksDelegate */]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var AddonNotificationsActionsComponentNgFactory = core["_27" /* ɵccf */]("addon-notifications-actions", actions_AddonNotificationsActionsComponent, View_AddonNotificationsActionsComponent_Host_0, { contextUrl: "contextUrl", courseId: "courseId" }, {}, []);

//# sourceMappingURL=actions.ngfactory.js.map
// EXTERNAL MODULE: ./src/components/empty-box/empty-box.ngfactory.js
var empty_box_ngfactory = __webpack_require__(164);

// EXTERNAL MODULE: ./src/components/empty-box/empty-box.ts
var empty_box = __webpack_require__(133);

// EXTERNAL MODULE: ./src/pipes/date-day-or-time.ts
var date_day_or_time = __webpack_require__(332);

// EXTERNAL MODULE: ./src/pipes/create-links.ts
var create_links = __webpack_require__(1355);

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

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.ngfactory.js
var content_ngfactory = __webpack_require__(178);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/dom-controller.js
var dom_controller = __webpack_require__(25);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/keyboard.js
var keyboard = __webpack_require__(99);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/refresher/refresher.js
var refresher = __webpack_require__(132);

// EXTERNAL MODULE: ./node_modules/ionic-angular/gestures/gesture-controller.js
var gesture_controller = __webpack_require__(36);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/refresher/refresher-content.ngfactory.js
var refresher_content_ngfactory = __webpack_require__(192);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/refresher/refresher-content.js
var refresher_content = __webpack_require__(144);

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

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-params.js
var nav_params = __webpack_require__(59);

// CONCATENATED MODULE: ./src/addon/notifications/pages/list/list.ngfactory.js
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 




































































var styles_AddonNotificationsListPage = [];
var RenderType_AddonNotificationsListPage = core["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_AddonNotificationsListPage, data: {} });

function View_AddonNotificationsListPage_2(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 6, "button", [["block", ""], ["color", "light"], ["icon-start", ""], ["ion-button", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.markAllNotificationsAsRead() !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](1, 1097728, null, 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { color: [0, "color"], block: [1, "block"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, 0, 1, "core-icon", [["name", "fa-check"]], null, null, null, icon_ngfactory["b" /* View_CoreIconComponent_0 */], icon_ngfactory["a" /* RenderType_CoreIconComponent */])), core["_30" /* ɵdid */](4, 114688, null, 0, icon["a" /* CoreIconComponent */], [core["t" /* ElementRef */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ɵted */](5, 0, ["\n                ", "\n            "])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], function (_ck, _v) { var currVal_0 = "light"; var currVal_1 = ""; _ck(_v, 1, 0, currVal_0, currVal_1); var currVal_2 = "fa-check"; _ck(_v, 4, 0, currVal_2); }, function (_ck, _v) { var currVal_3 = core["_56" /* ɵunv */](_v, 5, 0, core["_44" /* ɵnov */](_v, 6).transform("addon.notifications.markallread")); _ck(_v, 5, 0, currVal_3); }); }
function View_AddonNotificationsListPage_3(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 5, "button", [["block", ""], ["color", "light"], ["icon-start", ""], ["ion-button", ""]], null, null, null, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](1, 1097728, null, 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { color: [0, "color"], block: [1, "block"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, 0, 1, "ion-spinner", [], [[2, "spinner-paused", null]], null, null, spinner_ngfactory["b" /* View_Spinner_0 */], spinner_ngfactory["a" /* RenderType_Spinner */])), core["_30" /* ɵdid */](4, 114688, null, 0, spinner["a" /* Spinner */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n            "]))], function (_ck, _v) { var currVal_0 = "light"; var currVal_1 = ""; _ck(_v, 1, 0, currVal_0, currVal_1); _ck(_v, 4, 0); }, function (_ck, _v) { var currVal_2 = core["_44" /* ɵnov */](_v, 4)._paused; _ck(_v, 3, 0, currVal_2); }); }
function View_AddonNotificationsListPage_1(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 7, "div", [["padding", ""]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonNotificationsListPage_2)), core["_30" /* ɵdid */](3, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonNotificationsListPage_3)), core["_30" /* ɵdid */](6, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = !_co.loadingMarkAllNotificationsAsRead; _ck(_v, 3, 0, currVal_0); var currVal_1 = _co.loadingMarkAllNotificationsAsRead; _ck(_v, 6, 0, currVal_1); }, null); }
function View_AddonNotificationsListPage_5(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "div", [["item-end", ""]], null, null, null, null, null)), (_l()(), core["_31" /* ɵeld */](1, 0, null, null, 1, "core-icon", [["color", "primary"], ["name", "fa-circle"]], null, null, null, icon_ngfactory["b" /* View_CoreIconComponent_0 */], icon_ngfactory["a" /* RenderType_CoreIconComponent */])), core["_30" /* ɵdid */](2, 114688, null, 0, icon["a" /* CoreIconComponent */], [core["t" /* ElementRef */]], { name: [0, "name"], color: [1, "color"] }, null)], function (_ck, _v) { var currVal_0 = "fa-circle"; var currVal_1 = "primary"; _ck(_v, 2, 0, currVal_0, currVal_1); }, null); }
function View_AddonNotificationsListPage_4(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 46, "ion-card", [], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, card["a" /* Card */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 26, "ion-item", [["class", "item item-block"]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](4, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 1, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 2, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 3, { _icons: 1 }), core["_30" /* ɵdid */](8, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](10, 0, null, 0, 8, "ion-avatar", [["core-user-link", ""], ["item-start", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](11, 81920, null, 0, user_link["a" /* CoreUserLinkDirective */], [core["t" /* ElementRef */], [2, nav_controller["a" /* NavController */]]], { userId: [0, "userId"], courseId: [1, "courseId"] }, null), core["_30" /* ɵdid */](12, 16384, null, 0, avatar["a" /* Avatar */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](14, 0, null, null, 3, "img", [["core-external-content", ""], ["role", "presentation"]], [[8, "src", 4], [8, "alt", 0]], null, null, null, null)), core["_30" /* ɵdid */](15, 4210688, null, 0, external_content["a" /* CoreExternalContentDirective */], [core["t" /* ElementRef */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], platform["a" /* Platform */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], app["a" /* CoreAppProvider */], utils["a" /* CoreUtilsProvider */]], null, null), core["_48" /* ɵpod */](16, { $a: 0 }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](20, 0, null, 2, 1, "h2", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](21, null, ["", ""])), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, 4, 1, null, View_AddonNotificationsListPage_5)), core["_30" /* ɵdid */](24, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](26, 0, null, 2, 2, "p", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](27, null, ["", ""])), core["_49" /* ɵppd */](28, 1), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](31, 0, null, null, 11, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](32, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 4, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 5, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 6, { _icons: 1 }), core["_30" /* ɵdid */](36, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](38, 0, null, 2, 3, "p", [], null, null, null, null, null)), (_l()(), core["_31" /* ɵeld */](39, 0, null, null, 2, "core-format-text", [], null, null, null, null, null)), core["_30" /* ɵdid */](40, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform["a" /* Platform */], utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], app["a" /* CoreAppProvider */], helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */]], { text: [0, "text"] }, null), core["_49" /* ɵppd */](41, 1), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](44, 0, null, null, 1, "addon-notifications-actions", [], null, null, null, View_AddonNotificationsActionsComponent_0, RenderType_AddonNotificationsActionsComponent)), core["_30" /* ɵdid */](45, 114688, null, 0, actions_AddonNotificationsActionsComponent, [delegate["a" /* CoreContentLinksDelegate */]], { contextUrl: [0, "contextUrl"], courseId: [1, "courseId"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "]))], function (_ck, _v) { var currVal_0 = _v.context.$implicit.useridfrom; var currVal_1 = _v.context.$implicit.courseid; _ck(_v, 11, 0, currVal_0, currVal_1); var currVal_5 = !_v.context.$implicit.timeread; _ck(_v, 24, 0, currVal_5); var currVal_7 = core["_56" /* ɵunv */](_v, 40, 0, _ck(_v, 41, 0, core["_44" /* ɵnov */](_v.parent, 1), _v.context.$implicit.mobiletext)); _ck(_v, 40, 0, currVal_7); var currVal_8 = _v.context.$implicit.contexturl; var currVal_9 = _v.context.$implicit.courseid; _ck(_v, 45, 0, currVal_8, currVal_9); }, function (_ck, _v) { var currVal_2 = (_v.context.$implicit.profileimageurlfrom || "assets/img/user-avatar.png"); var currVal_3 = core["_56" /* ɵunv */](_v, 14, 1, core["_44" /* ɵnov */](_v, 17).transform("core.pictureof", _ck(_v, 16, 0, _v.context.$implicit.userfromfullname))); _ck(_v, 14, 0, currVal_2, currVal_3); var currVal_4 = _v.context.$implicit.userfromfullname; _ck(_v, 21, 0, currVal_4); var currVal_6 = core["_56" /* ɵunv */](_v, 27, 0, _ck(_v, 28, 0, core["_44" /* ɵnov */](_v.parent, 0), _v.context.$implicit.timecreated)); _ck(_v, 27, 0, currVal_6); }); }
function View_AddonNotificationsListPage_6(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "core-empty-box", [["icon", "notifications"]], null, null, null, empty_box_ngfactory["b" /* View_CoreEmptyBoxComponent_0 */], empty_box_ngfactory["a" /* RenderType_CoreEmptyBoxComponent */])), core["_30" /* ɵdid */](1, 49152, null, 0, empty_box["a" /* CoreEmptyBoxComponent */], [], { message: [0, "message"], icon: [1, "icon"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 1, 0, core["_44" /* ɵnov */](_v, 2).transform("addon.notifications.therearentnotificationsyet")); var currVal_1 = "notifications"; _ck(_v, 1, 0, currVal_0, currVal_1); }, null); }
function View_AddonNotificationsListPage_0(_l) { return core["_57" /* ɵvid */](0, [core["_47" /* ɵpid */](0, date_day_or_time["a" /* CoreDateDayOrTimePipe */], [logger["a" /* CoreLoggerProvider */], translate_service["a" /* TranslateService */]]), core["_47" /* ɵpid */](0, create_links["a" /* CoreCreateLinksPipe */], []), (_l()(), core["_31" /* ɵeld */](2, 0, null, null, 12, "ion-header", [], null, null, null, null, null)), core["_30" /* ɵdid */](3, 16384, null, 0, toolbar_header["a" /* Header */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, view_controller["a" /* ViewController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_31" /* ɵeld */](5, 0, null, null, 8, "ion-navbar", [["class", "toolbar"], ["core-back-button", ""]], [[8, "hidden", 0], [2, "statusbar-padding", null]], null, null, navbar_ngfactory["b" /* View_Navbar_0 */], navbar_ngfactory["a" /* RenderType_Navbar */])), core["_30" /* ɵdid */](6, 49152, null, 0, navbar["a" /* Navbar */], [app_app["a" /* App */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_30" /* ɵdid */](7, 212992, null, 0, back_button["a" /* CoreBackButtonDirective */], [navbar["a" /* Navbar */], platform["a" /* Platform */], translate_service["a" /* TranslateService */], events["a" /* CoreEventsProvider */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n        "])), (_l()(), core["_31" /* ɵeld */](9, 0, null, 3, 3, "ion-title", [], null, null, null, toolbar_title_ngfactory["b" /* View_ToolbarTitle_0 */], toolbar_title_ngfactory["a" /* RenderType_ToolbarTitle */])), core["_30" /* ɵdid */](10, 49152, null, 0, toolbar_title["a" /* ToolbarTitle */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), (_l()(), core["_55" /* ɵted */](11, 0, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_31" /* ɵeld */](16, 0, null, null, 30, "ion-content", [], [[2, "statusbar-padding", null], [2, "has-refresher", null]], null, null, content_ngfactory["b" /* View_Content_0 */], content_ngfactory["a" /* RenderType_Content */])), core["_30" /* ɵdid */](17, 4374528, null, 0, content["a" /* Content */], [config["a" /* Config */], platform["a" /* Platform */], dom_controller["a" /* DomController */], core["t" /* ElementRef */], core["V" /* Renderer */], app_app["a" /* App */], keyboard["a" /* Keyboard */], core["M" /* NgZone */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n    "])), (_l()(), core["_31" /* ɵeld */](19, 0, null, 2, 6, "ion-refresher", [], [[2, "refresher-active", null], [4, "top", null]], [[null, "ionRefresh"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("ionRefresh" === en)) {
        var pd_0 = (_co.refreshNotifications($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), core["_30" /* ɵdid */](20, 212992, null, 0, refresher["a" /* Refresher */], [platform["a" /* Platform */], content["a" /* Content */], core["M" /* NgZone */], gesture_controller["l" /* GestureController */]], { enabled: [0, "enabled"] }, { ionRefresh: "ionRefresh" }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_31" /* ɵeld */](22, 0, null, null, 2, "ion-refresher-content", [], [[1, "state", 0]], null, null, refresher_content_ngfactory["b" /* View_RefresherContent_0 */], refresher_content_ngfactory["a" /* RenderType_RefresherContent */])), core["_30" /* ɵdid */](23, 114688, null, 0, refresher_content["a" /* RefresherContent */], [refresher["a" /* Refresher */], config["a" /* Config */]], { pullingText: [0, "pullingText"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n    "])), (_l()(), core["_31" /* ɵeld */](27, 0, null, 1, 18, "core-loading", [], null, null, null, loading_ngfactory["b" /* View_CoreLoadingComponent_0 */], loading_ngfactory["a" /* RenderType_CoreLoadingComponent */])), core["_30" /* ɵdid */](28, 638976, null, 0, loading["a" /* CoreLoadingComponent */], [translate_service["a" /* TranslateService */], core["t" /* ElementRef */], events["a" /* CoreEventsProvider */], utils["a" /* CoreUtilsProvider */]], { hideUntil: [0, "hideUntil"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonNotificationsListPage_1)), core["_30" /* ɵdid */](31, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonNotificationsListPage_4)), core["_30" /* ɵdid */](34, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonNotificationsListPage_6)), core["_30" /* ɵdid */](37, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_31" /* ɵeld */](39, 0, null, 0, 5, "ion-infinite-scroll", [], null, [[null, "ionInfinite"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("ionInfinite" === en)) {
        var pd_0 = (_co.loadMoreNotifications($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), core["_30" /* ɵdid */](40, 1196032, null, 0, infinite_scroll["a" /* InfiniteScroll */], [content["a" /* Content */], core["M" /* NgZone */], core["t" /* ElementRef */], dom_controller["a" /* DomController */]], { enabled: [0, "enabled"] }, { ionInfinite: "ionInfinite" }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](42, 0, null, null, 1, "ion-infinite-scroll-content", [], [[1, "state", 0]], null, null, infinite_scroll_content_ngfactory["b" /* View_InfiniteScrollContent_0 */], infinite_scroll_content_ngfactory["a" /* RenderType_InfiniteScrollContent */])), core["_30" /* ɵdid */](43, 114688, null, 0, infinite_scroll_content["a" /* InfiniteScrollContent */], [infinite_scroll["a" /* InfiniteScroll */], config["a" /* Config */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; _ck(_v, 7, 0); var currVal_7 = _co.notificationsLoaded; _ck(_v, 20, 0, currVal_7); var currVal_9 = core["_34" /* ɵinlineInterpolate */](1, "", core["_56" /* ɵunv */](_v, 23, 0, core["_44" /* ɵnov */](_v, 24).transform("core.pulltorefresh")), ""); _ck(_v, 23, 0, currVal_9); var currVal_10 = _co.notificationsLoaded; _ck(_v, 28, 0, currVal_10); var currVal_11 = _co.canMarkAllNotificationsAsRead; _ck(_v, 31, 0, currVal_11); var currVal_12 = _co.notifications; _ck(_v, 34, 0, currVal_12); var currVal_13 = (!_co.notifications || (_co.notifications.length <= 0)); _ck(_v, 37, 0, currVal_13); var currVal_14 = _co.canLoadMore; _ck(_v, 40, 0, currVal_14); _ck(_v, 43, 0); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 6)._hidden; var currVal_1 = core["_44" /* ɵnov */](_v, 6)._sbPadding; _ck(_v, 5, 0, currVal_0, currVal_1); var currVal_2 = core["_56" /* ɵunv */](_v, 11, 0, core["_44" /* ɵnov */](_v, 12).transform("addon.notifications.notifications")); _ck(_v, 11, 0, currVal_2); var currVal_3 = core["_44" /* ɵnov */](_v, 17).statusbarPadding; var currVal_4 = core["_44" /* ɵnov */](_v, 17)._hasRefresher; _ck(_v, 16, 0, currVal_3, currVal_4); var currVal_5 = (core["_44" /* ɵnov */](_v, 20).state !== "inactive"); var currVal_6 = core["_44" /* ɵnov */](_v, 20)._top; _ck(_v, 19, 0, currVal_5, currVal_6); var currVal_8 = core["_44" /* ɵnov */](_v, 23).r.state; _ck(_v, 22, 0, currVal_8); var currVal_15 = core["_44" /* ɵnov */](_v, 43).inf.state; _ck(_v, 42, 0, currVal_15); }); }
function View_AddonNotificationsListPage_Host_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "page-addon-notifications-list", [], null, null, null, View_AddonNotificationsListPage_0, RenderType_AddonNotificationsListPage)), core["_30" /* ɵdid */](1, 180224, null, 0, list_AddonNotificationsListPage, [nav_params["a" /* NavParams */], dom["a" /* CoreDomUtilsProvider */], events["a" /* CoreEventsProvider */], sites["a" /* CoreSitesProvider */], utils_text["a" /* CoreTextUtilsProvider */], utils["a" /* CoreUtilsProvider */], providers_notifications["a" /* AddonNotificationsProvider */], providers_delegate["a" /* AddonPushNotificationsDelegate */]], null, null)], null, null); }
var AddonNotificationsListPageNgFactory = core["_27" /* ɵccf */]("page-addon-notifications-list", list_AddonNotificationsListPage, View_AddonNotificationsListPage_Host_0, {}, {}, []);

//# sourceMappingURL=list.ngfactory.js.map
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

// CONCATENATED MODULE: ./src/addon/notifications/pages/list/list.module.ngfactory.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddonNotificationsListPageModuleNgFactory", function() { return AddonNotificationsListPageModuleNgFactory; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 































var AddonNotificationsListPageModuleNgFactory = core["_28" /* ɵcmf */](list_module_AddonNotificationsListPageModule, [], function (_l) { return core["_40" /* ɵmod */]([core["_41" /* ɵmpd */](512, core["o" /* ComponentFactoryResolver */], core["_21" /* ɵCodegenComponentFactoryResolver */], [[8, [action_sheet_component_ngfactory["a" /* ActionSheetCmpNgFactory */], alert_component_ngfactory["a" /* AlertCmpNgFactory */], app_root_ngfactory["a" /* IonicAppNgFactory */], loading_component_ngfactory["a" /* LoadingCmpNgFactory */], modal_component_ngfactory["a" /* ModalCmpNgFactory */], picker_component_ngfactory["a" /* PickerCmpNgFactory */], popover_component_ngfactory["a" /* PopoverCmpNgFactory */], select_popover_component_ngfactory["a" /* SelectPopoverNgFactory */], toast_component_ngfactory["a" /* ToastCmpNgFactory */], context_menu_popover_ngfactory["a" /* CoreContextMenuPopoverComponentNgFactory */], course_picker_menu_popover_ngfactory["a" /* CoreCoursePickerMenuPopoverComponentNgFactory */], recaptchamodal_ngfactory["a" /* CoreRecaptchaModalComponentNgFactory */], AddonNotificationsListPageNgFactory]], [3, core["o" /* ComponentFactoryResolver */]], core["K" /* NgModuleRef */]]), core["_41" /* ɵmpd */](4608, common["m" /* NgLocalization */], common["l" /* NgLocaleLocalization */], [core["G" /* LOCALE_ID */], [2, common["v" /* ɵa */]]]), core["_41" /* ɵmpd */](4608, esm5_forms["x" /* ɵi */], esm5_forms["x" /* ɵi */], []), core["_41" /* ɵmpd */](4608, esm5_forms["d" /* FormBuilder */], esm5_forms["d" /* FormBuilder */], []), core["_41" /* ɵmpd */](4608, translate_loader["b" /* TranslateLoader */], translate_loader["a" /* TranslateFakeLoader */], []), core["_41" /* ɵmpd */](4608, translate_compiler["a" /* TranslateCompiler */], translate_compiler["b" /* TranslateFakeCompiler */], []), core["_41" /* ɵmpd */](4608, translate_parser["b" /* TranslateParser */], translate_parser["a" /* TranslateDefaultParser */], []), core["_41" /* ɵmpd */](4608, missing_translation_handler["b" /* MissingTranslationHandler */], missing_translation_handler["a" /* FakeMissingTranslationHandler */], []), core["_41" /* ɵmpd */](4608, translate_service["a" /* TranslateService */], translate_service["a" /* TranslateService */], [translate_store["a" /* TranslateStore */], translate_loader["b" /* TranslateLoader */], translate_compiler["a" /* TranslateCompiler */], translate_parser["b" /* TranslateParser */], missing_translation_handler["b" /* MissingTranslationHandler */], translate_service["b" /* USE_DEFAULT_LANG */], translate_service["c" /* USE_STORE */]]), core["_41" /* ɵmpd */](512, common["b" /* CommonModule */], common["b" /* CommonModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["v" /* ɵba */], esm5_forms["v" /* ɵba */], []), core["_41" /* ɵmpd */](512, esm5_forms["i" /* FormsModule */], esm5_forms["i" /* FormsModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["s" /* ReactiveFormsModule */], esm5_forms["s" /* ReactiveFormsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["a" /* IonicModule */], ionic_angular_module["a" /* IonicModule */], []), core["_41" /* ɵmpd */](512, _ngx_translate_core["b" /* TranslateModule */], _ngx_translate_core["b" /* TranslateModule */], []), core["_41" /* ɵmpd */](512, directives_module["a" /* CoreDirectivesModule */], directives_module["a" /* CoreDirectivesModule */], []), core["_41" /* ɵmpd */](512, pipes_module["a" /* CorePipesModule */], pipes_module["a" /* CorePipesModule */], []), core["_41" /* ɵmpd */](512, components_module["a" /* CoreComponentsModule */], components_module["a" /* CoreComponentsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["b" /* IonicPageModule */], ionic_angular_module["b" /* IonicPageModule */], []), core["_41" /* ɵmpd */](512, components_module_AddonNotificationsComponentsModule, components_module_AddonNotificationsComponentsModule, []), core["_41" /* ɵmpd */](512, list_module_AddonNotificationsListPageModule, list_module_AddonNotificationsListPageModule, []), core["_41" /* ɵmpd */](256, translate_service["c" /* USE_STORE */], undefined, []), core["_41" /* ɵmpd */](256, translate_service["b" /* USE_DEFAULT_LANG */], undefined, []), core["_41" /* ɵmpd */](256, module_loader["a" /* LAZY_LOADED_TOKEN */], list_AddonNotificationsListPage, [])]); });

//# sourceMappingURL=list.module.ngfactory.js.map

/***/ })

});
//# sourceMappingURL=64.js.map