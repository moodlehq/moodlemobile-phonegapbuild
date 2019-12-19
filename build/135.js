webpackJsonp([135],{

/***/ 2128:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddonCalendarEventPageModule", function() { return AddonCalendarEventPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__directives_directives_module__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pipes_pipes_module__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__event__ = __webpack_require__(2277);
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







var AddonCalendarEventPageModule = /** @class */ (function () {
    function AddonCalendarEventPageModule() {
    }
    AddonCalendarEventPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__event__["a" /* AddonCalendarEventPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* CoreComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_4__directives_directives_module__["a" /* CoreDirectivesModule */],
                __WEBPACK_IMPORTED_MODULE_5__pipes_pipes_module__["a" /* CorePipesModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_6__event__["a" /* AddonCalendarEventPage */]),
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */].forChild()
            ],
        })
    ], AddonCalendarEventPageModule);
    return AddonCalendarEventPageModule;
}());

//# sourceMappingURL=event.module.js.map

/***/ }),

/***/ 2277:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddonCalendarEventPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_calendar__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_helper__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_calendar_offline__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_calendar_sync__ = __webpack_require__(423);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_courses_providers_courses__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_app__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_events__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_utils_dom__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_utils_text__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_sites__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_local_notifications__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__core_course_providers_course__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__providers_utils_time__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__providers_groups__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_split_view_split_view__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_network__ = __webpack_require__(129);
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



















/**
 * Page that displays a single calendar event.
 */
var AddonCalendarEventPage = /** @class */ (function () {
    function AddonCalendarEventPage(translate, calendarProvider, navParams, domUtils, coursesProvider, calendarHelper, sitesProvider, localNotificationsProvider, courseProvider, textUtils, timeUtils, groupsProvider, svComponent, navCtrl, eventsProvider, network, zone, calendarSync, appProvider, calendarOffline) {
        var _this = this;
        this.translate = translate;
        this.calendarProvider = calendarProvider;
        this.domUtils = domUtils;
        this.coursesProvider = coursesProvider;
        this.calendarHelper = calendarHelper;
        this.sitesProvider = sitesProvider;
        this.courseProvider = courseProvider;
        this.textUtils = textUtils;
        this.timeUtils = timeUtils;
        this.groupsProvider = groupsProvider;
        this.svComponent = svComponent;
        this.navCtrl = navCtrl;
        this.eventsProvider = eventsProvider;
        this.calendarSync = calendarSync;
        this.appProvider = appProvider;
        this.calendarOffline = calendarOffline;
        this.event = {};
        this.courseUrl = '';
        this.notificationsEnabled = false;
        this.moduleUrl = '';
        this.categoryPath = '';
        this.canEdit = false;
        this.canDelete = false;
        this.hasOffline = false;
        this.isOnline = false;
        this.isSplitViewOn = false;
        this.eventId = navParams.get('id');
        this.notificationsEnabled = localNotificationsProvider.isAvailable();
        this.siteHomeId = sitesProvider.getCurrentSite().getSiteHomeId();
        this.currentSiteId = sitesProvider.getCurrentSiteId();
        this.isSplitViewOn = this.svComponent && this.svComponent.isOn();
        // Check if site supports editing and deleting. No need to check allowed types, event.canedit already does it.
        this.canEdit = this.calendarProvider.canEditEventsInSite();
        this.canDelete = this.calendarProvider.canDeleteEventsInSite();
        if (this.notificationsEnabled) {
            this.calendarProvider.getEventReminders(this.eventId).then(function (reminders) {
                _this.reminders = reminders;
            });
            this.calendarProvider.getDefaultNotificationTime().then(function (defaultTime) {
                _this.defaultTime = defaultTime * 60;
            });
            // Calculate format to use.
            this.notificationFormat = this.timeUtils.fixFormatForDatetime(this.timeUtils.convertPHPToMoment(this.translate.instant('core.strftimedatetime')));
        }
        // Listen for event edited. If current event is edited, reload the data.
        this.editEventObserver = eventsProvider.on(__WEBPACK_IMPORTED_MODULE_3__providers_calendar__["a" /* AddonCalendarProvider */].EDIT_EVENT_EVENT, function (data) {
            if (data && data.event && data.event.id == _this.eventId) {
                _this.eventLoaded = false;
                _this.refreshEvent(true, false);
            }
        }, this.currentSiteId);
        // Refresh data if this calendar event is synchronized automatically.
        this.syncObserver = eventsProvider.on(__WEBPACK_IMPORTED_MODULE_6__providers_calendar_sync__["a" /* AddonCalendarSyncProvider */].AUTO_SYNCED, this.checkSyncResult.bind(this, false), this.currentSiteId);
        // Refresh data if calendar events are synchronized manually but not by this page.
        this.manualSyncObserver = eventsProvider.on(__WEBPACK_IMPORTED_MODULE_6__providers_calendar_sync__["a" /* AddonCalendarSyncProvider */].MANUAL_SYNCED, this.checkSyncResult.bind(this, true), this.currentSiteId);
        // Refresh online status when changes.
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
    AddonCalendarEventPage.prototype.ionViewDidLoad = function () {
        this.syncIcon = 'spinner';
        this.fetchEvent();
    };
    /**
     * Fetches the event and updates the view.
     *
     * @param sync Whether it should try to synchronize offline events.
     * @param showErrors Whether to show sync errors to the user.
     * @return Promise resolved when done.
     */
    AddonCalendarEventPage.prototype.fetchEvent = function (sync, showErrors) {
        var _this = this;
        var currentSite = this.sitesProvider.getCurrentSite(), canGetById = this.calendarProvider.isGetEventByIdAvailableInSite();
        var promise, deleted = false;
        this.isOnline = this.appProvider.isOnline();
        if (sync) {
            // Try to synchronize offline events.
            promise = this.calendarSync.syncEvents().then(function (result) {
                if (result.warnings && result.warnings.length) {
                    _this.domUtils.showErrorModal(result.warnings[0]);
                }
                if (result.deleted && result.deleted.indexOf(_this.eventId) != -1) {
                    // This event was deleted during the sync.
                    deleted = true;
                }
                if (result.updated) {
                    // Trigger a manual sync event.
                    result.source = 'event';
                    _this.eventsProvider.trigger(__WEBPACK_IMPORTED_MODULE_6__providers_calendar_sync__["a" /* AddonCalendarSyncProvider */].MANUAL_SYNCED, result, _this.currentSiteId);
                }
            }).catch(function (error) {
                if (showErrors) {
                    _this.domUtils.showErrorModalDefault(error, 'core.errorsync', true);
                }
            });
        }
        else {
            promise = Promise.resolve();
        }
        return promise.then(function () {
            if (deleted) {
                return;
            }
            var promises = [];
            // Get the event data.
            if (canGetById) {
                promises.push(_this.calendarProvider.getEventById(_this.eventId));
            }
            else {
                promises.push(_this.calendarProvider.getEvent(_this.eventId));
            }
            // Get offline data.
            promises.push(_this.calendarOffline.getEvent(_this.eventId).catch(function () {
                // No offline data.
            }));
            return Promise.all(promises).then(function (results) {
                if (results[1]) {
                    // There is offline data, apply it.
                    _this.hasOffline = true;
                    Object.assign(results[0], results[1]);
                }
                else {
                    _this.hasOffline = false;
                }
                return results[0];
            });
        }).then(function (event) {
            if (deleted) {
                return;
            }
            var promises = [];
            _this.calendarHelper.formatEventData(event);
            _this.event = event;
            _this.currentTime = _this.timeUtils.timestamp();
            _this.notificationMin = _this.timeUtils.userDate(_this.currentTime * 1000, 'YYYY-MM-DDTHH:mm', false);
            _this.notificationMax = _this.timeUtils.userDate((event.timestart + event.timeduration) * 1000, 'YYYY-MM-DDTHH:mm', false);
            // Reset some of the calculated data.
            _this.categoryPath = '';
            _this.courseName = '';
            _this.courseUrl = '';
            _this.moduleUrl = '';
            if (event.moduleIcon) {
                // It's a module event, translate the module name to the current language.
                var name_1 = _this.courseProvider.translateModuleName(event.modulename);
                if (name_1.indexOf('core.mod_') === -1) {
                    event.moduleName = name_1;
                }
                // Get the module URL.
                if (canGetById) {
                    _this.moduleUrl = event.url;
                }
            }
            // If the event belongs to a course, get the course name and the URL to view it.
            if (canGetById && event.course && event.course.id != _this.siteHomeId) {
                _this.courseId = event.course.id;
                _this.courseName = event.course.fullname;
                _this.courseUrl = event.course.viewurl;
            }
            else if (event.courseid && event.courseid != _this.siteHomeId) {
                // Retrieve the course.
                promises.push(_this.coursesProvider.getUserCourse(event.courseid, true).then(function (course) {
                    _this.courseId = course.id;
                    _this.courseName = course.fullname;
                    _this.courseUrl = currentSite ? _this.textUtils.concatenatePaths(currentSite.siteUrl, '/course/view.php?id=' + event.courseid) : '';
                }).catch(function () {
                    // Error getting course, just don't show the course name.
                }));
            }
            // If it's a group event, get the name of the group.
            var courseId = canGetById && event.course ? event.course.id : event.courseid;
            if (courseId && event.groupid) {
                promises.push(_this.groupsProvider.getUserGroupsInCourse(event.courseid).then(function (groups) {
                    var group = groups.find(function (group) {
                        return group.id == event.groupid;
                    });
                    _this.groupName = group ? group.name : '';
                }).catch(function () {
                    // Error getting groups, just don't show the group name.
                    _this.groupName = '';
                }));
            }
            if (canGetById && event.iscategoryevent && event.category) {
                _this.categoryPath = event.category.nestedname;
            }
            if (event.location) {
                // Build a link to open the address in maps.
                event.location = _this.textUtils.decodeHTML(event.location);
                event.encodedLocation = _this.textUtils.buildAddressURL(event.location);
            }
            // Check if event was deleted in offine.
            promises.push(_this.calendarOffline.isEventDeleted(_this.eventId).then(function (deleted) {
                event.deleted = deleted;
            }));
            // Re-calculate the formatted time so it uses the device date.
            promises.push(_this.calendarProvider.getCalendarTimeFormat().then(function (timeFormat) {
                _this.calendarProvider.formatEventTime(event, timeFormat).then(function (time) {
                    event.formattedtime = time;
                });
            }));
            return Promise.all(promises);
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'addon.calendar.errorloadevent', true);
        }).finally(function () {
            _this.eventLoaded = true;
            _this.syncIcon = 'sync';
        });
    };
    /**
     * Add a reminder for this event.
     */
    AddonCalendarEventPage.prototype.addNotificationTime = function () {
        var _this = this;
        if (this.notificationTimeText && this.event && this.event.id) {
            var notificationTime = this.timeUtils.convertToTimestamp(this.notificationTimeText);
            var currentTime = this.timeUtils.timestamp(), minute = Math.floor(currentTime / 60) * 60;
            // Check if the notification time is in the same minute as we are, so the notification is triggered.
            if (notificationTime >= minute && notificationTime < minute + 60) {
                notificationTime = currentTime + 1;
            }
            this.calendarProvider.addEventReminder(this.event, notificationTime).then(function () {
                _this.calendarProvider.getEventReminders(_this.eventId).then(function (reminders) {
                    _this.reminders = reminders;
                });
                _this.notificationTimeText = null;
            });
        }
    };
    /**
     * Cancel the selected notification.
     *
     * @param id Reminder ID.
     * @param e Click event.
     */
    AddonCalendarEventPage.prototype.cancelNotification = function (id, e) {
        var _this = this;
        e.preventDefault();
        e.stopPropagation();
        this.domUtils.showDeleteConfirm().then(function () {
            var modal = _this.domUtils.showModalLoading('core.deleting', true);
            _this.calendarProvider.deleteEventReminder(id).then(function () {
                _this.calendarProvider.getEventReminders(_this.eventId).then(function (reminders) {
                    _this.reminders = reminders;
                });
            }).catch(function (error) {
                _this.domUtils.showErrorModalDefault(error, 'Error deleting reminder');
            }).finally(function () {
                modal.dismiss();
            });
        }).catch(function () {
            // Cancelled.
        });
    };
    /**
     * Refresh the data.
     *
     * @param refresher Refresher.
     * @param done Function to call when done.
     * @param showErrors Whether to show sync errors to the user.
     * @return Promise resolved when done.
     */
    AddonCalendarEventPage.prototype.doRefresh = function (refresher, done, showErrors) {
        if (this.eventLoaded) {
            return this.refreshEvent(true, showErrors).finally(function () {
                refresher && refresher.complete();
                done && done();
            });
        }
        return Promise.resolve();
    };
    /**
     * Refresh the event.
     *
     * @param sync Whether it should try to synchronize offline events.
     * @param showErrors Whether to show sync errors to the user.
     * @return Promise resolved when done.
     */
    AddonCalendarEventPage.prototype.refreshEvent = function (sync, showErrors) {
        var _this = this;
        this.syncIcon = 'spinner';
        var promises = [];
        promises.push(this.calendarProvider.invalidateEvent(this.eventId));
        promises.push(this.calendarProvider.invalidateTimeFormat());
        return Promise.all(promises).catch(function () {
            // Ignore errors.
        }).then(function () {
            return _this.fetchEvent(sync, showErrors);
        });
    };
    /**
     * Open the page to edit the event.
     */
    AddonCalendarEventPage.prototype.openEdit = function () {
        // Decide which navCtrl to use. If this page is inside a split view, use the split view's master nav.
        var navCtrl = this.svComponent ? this.svComponent.getMasterNav() : this.navCtrl;
        navCtrl.push('AddonCalendarEditEventPage', { eventId: this.eventId });
    };
    /**
     * Delete the event.
     */
    AddonCalendarEventPage.prototype.deleteEvent = function () {
        var _this = this;
        var title = this.translate.instant('addon.calendar.deleteevent'), options = {};
        var message;
        if (this.event.eventcount > 1) {
            // It's a repeated event.
            message = this.translate.instant('addon.calendar.confirmeventseriesdelete', { $a: { name: this.event.name, count: this.event.eventcount } });
            options.inputs = [
                {
                    type: 'radio',
                    name: 'deleteall',
                    checked: true,
                    value: false,
                    label: this.translate.instant('addon.calendar.deleteoneevent')
                },
                {
                    type: 'radio',
                    name: 'deleteall',
                    checked: false,
                    value: true,
                    label: this.translate.instant('addon.calendar.deleteallevents')
                }
            ];
        }
        else {
            // Not repeated, display a simple confirm.
            message = this.translate.instant('addon.calendar.confirmeventdelete', { $a: this.event.name });
        }
        this.domUtils.showConfirm(message, title, undefined, undefined, options).then(function (deleteAll) {
            var modal = _this.domUtils.showModalLoading('core.sending', true);
            _this.calendarProvider.deleteEvent(_this.event.id, _this.event.name, deleteAll).then(function (sent) {
                var promise;
                if (sent) {
                    // Event deleted, invalidate right days & months.
                    promise = _this.calendarHelper.refreshAfterChangeEvent(_this.event, deleteAll ? _this.event.eventcount : 1)
                        .catch(function () {
                        // Ignore errors.
                    });
                }
                else {
                    promise = Promise.resolve();
                }
                return promise.then(function () {
                    // Trigger an event.
                    _this.eventsProvider.trigger(__WEBPACK_IMPORTED_MODULE_3__providers_calendar__["a" /* AddonCalendarProvider */].DELETED_EVENT_EVENT, {
                        eventId: _this.eventId,
                        sent: sent
                    }, _this.sitesProvider.getCurrentSiteId());
                    if (sent) {
                        _this.domUtils.showToast('addon.calendar.eventcalendareventdeleted', true, 3000, undefined, false);
                        // Event deleted, close the view.
                        if (!_this.svComponent || !_this.svComponent.isOn()) {
                            _this.navCtrl.pop();
                        }
                    }
                    else {
                        // Event deleted in offline, just mark it as deleted.
                        _this.event.deleted = true;
                    }
                });
            }).catch(function (error) {
                _this.domUtils.showErrorModalDefault(error, 'Error deleting event.');
            }).finally(function () {
                modal.dismiss();
            });
        }, function () {
            // User canceled.
        });
    };
    /**
     * Undo delete the event.
     */
    AddonCalendarEventPage.prototype.undoDelete = function () {
        var _this = this;
        var modal = this.domUtils.showModalLoading('core.sending', true);
        this.calendarOffline.unmarkDeleted(this.event.id).then(function () {
            // Trigger an event.
            _this.eventsProvider.trigger(__WEBPACK_IMPORTED_MODULE_3__providers_calendar__["a" /* AddonCalendarProvider */].UNDELETED_EVENT_EVENT, {
                eventId: _this.eventId
            }, _this.sitesProvider.getCurrentSiteId());
            _this.event.deleted = false;
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'Error undeleting event.');
        }).finally(function () {
            modal.dismiss();
        });
    };
    /**
     * Check the result of an automatic sync or a manual sync not done by this page.
     *
     * @param isManual Whether it's a manual sync.
     * @param data Sync result.
     */
    AddonCalendarEventPage.prototype.checkSyncResult = function (isManual, data) {
        var _this = this;
        if (!data) {
            return;
        }
        if (data.deleted && data.deleted.indexOf(this.eventId) != -1) {
            this.domUtils.showToast('addon.calendar.eventcalendareventdeleted', true, 3000, undefined, false);
            // Event was deleted, close the view.
            if (!this.svComponent || !this.svComponent.isOn()) {
                this.navCtrl.pop();
            }
        }
        else if (data.events && (!isManual || data.source != 'event')) {
            var event_1 = data.events.find(function (ev) {
                return ev.id == _this.eventId;
            });
            if (event_1) {
                this.eventLoaded = false;
                this.refreshEvent();
            }
        }
    };
    /**
     * Page destroyed.
     */
    AddonCalendarEventPage.prototype.ngOnDestroy = function () {
        this.editEventObserver && this.editEventObserver.off();
        this.syncObserver && this.syncObserver.off();
        this.manualSyncObserver && this.manualSyncObserver.off();
        this.onlineObserver && this.onlineObserver.unsubscribe();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Content */])
    ], AddonCalendarEventPage.prototype, "content", void 0);
    AddonCalendarEventPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-addon-calendar-event',template:/*ion-inline-start:"/home/travis/build/moodlehq/moodlemobile2/src/addon/calendar/pages/event/event.html"*/'<ion-header>\n    <ion-navbar core-back-button>\n        <ion-title>\n            <img *ngIf="event && event.moduleIcon" src="{{event.moduleIcon}}" alt="" role="presentation" class="core-module-icon">\n            <core-icon *ngIf="event && event.eventIcon && !event.moduleIcon" [name]="event.eventIcon" item-start></core-icon>\n            <core-format-text *ngIf="event" [text]="event.name" [contextLevel]="event.contextLevel" [contextInstanceId]="event.contextInstanceId"></core-format-text>\n        </ion-title>\n        <ion-buttons end>\n            <!-- The context menu will be added in here. -->\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n<core-navbar-buttons end>\n    <core-context-menu>\n        <core-context-menu-item [hidden]="isSplitViewOn || !eventLoaded || (!hasOffline && !event.deleted) || !isOnline"  [priority]="400" [content]="\'core.settings.synchronizenow\' | translate" (action)="doRefresh(null, $event, true)" [iconAction]="syncIcon" [closeOnClick]="false"></core-context-menu-item>\n        <core-context-menu-item [hidden]="!canEdit || !event || !event.canedit || event.deleted" [priority]="300" [content]="\'core.edit\' | translate" (action)="openEdit()" [iconAction]="\'create\'"></core-context-menu-item>\n        <core-context-menu-item [hidden]="!canDelete || !event || !event.candelete || event.deleted" [priority]="200" [content]="\'core.delete\' | translate" (action)="deleteEvent()" [iconAction]="\'trash\'"></core-context-menu-item>\n        <core-context-menu-item [hidden]="!event || !event.deleted" [priority]="200" [content]="\'core.restore\' | translate" (action)="undoDelete()" [iconAction]="\'undo\'"></core-context-menu-item>\n    </core-context-menu>\n</core-navbar-buttons>\n<ion-content>\n    <ion-refresher [enabled]="eventLoaded" (ionRefresh)="doRefresh($event)">\n        <ion-refresher-content pullingText="{{ \'core.pulltorefresh\' | translate }}"></ion-refresher-content>\n    </ion-refresher>\n    <core-loading [hideUntil]="eventLoaded">\n        <!-- There is data to be synchronized -->\n        <ion-card class="core-warning-card" icon-start *ngIf="hasOffline || event.deleted">\n            <ion-icon name="warning"></ion-icon> {{ \'core.hasdatatosync\' | translate:{$a: \'addon.calendar.calendarevent\' | translate} }}\n        </ion-card>\n\n        <ion-card>\n            <ion-card-content *ngIf="event">\n                <ion-item text-wrap *ngIf="isSplitViewOn">\n                    <img *ngIf="event.moduleIcon" src="{{event.moduleIcon}}" item-start alt="" role="presentation" class="core-module-icon">\n                    <core-icon *ngIf="event.eventIcon && !event.moduleIcon" [name]="event.eventIcon" item-start></core-icon>\n                    <h2>{{ \'addon.calendar.eventname\' | translate }}</h2>\n                    <p><core-format-text [text]="event.name" [contextLevel]="event.contextLevel" [contextInstanceId]="event.contextInstanceId"></core-format-text></p>\n                    <ion-note item-end *ngIf="event.deleted">\n                        <ion-icon name="trash"></ion-icon> {{ \'core.deletedoffline\' | translate }}\n                    </ion-note>\n                </ion-item>\n                <ion-item>\n                    <h2>{{ \'addon.calendar.when\' | translate }}</h2>\n                    <p [innerHTML]="event.formattedtime"></p>\n                    <ion-note item-end *ngIf="!isSplitViewOn && event.deleted">\n                        <ion-icon name="trash"></ion-icon> {{ \'core.deletedoffline\' | translate }}\n                    </ion-note>\n                </ion-item>\n                <ion-item>\n                    <h2>{{ \'addon.calendar.eventtype\' | translate }}</h2>\n                    <p>{{ \'addon.calendar.type\' + event.formattedType | translate }}</p>\n                </ion-item>\n                <a ion-item text-wrap *ngIf="courseName" [href]="courseUrl" core-link capture="true">\n                    <h2>{{ \'core.course\' | translate}}</h2>\n                    <p><core-format-text [text]="courseName" contextLevel="course" [contextInstanceId]="courseId"></core-format-text></p>\n                </a>\n                <ion-item text-wrap *ngIf="groupName">\n                    <h2>{{ \'core.group\' | translate}}</h2>\n                    <p>{{ groupName }}</p>\n                </ion-item>\n                <a ion-item text-wrap *ngIf="categoryPath">\n                    <h2>{{ \'core.category\' | translate}}</h2>\n                    <p><core-format-text [text]="categoryPath" contextLevel="coursecat" [contextInstanceId]="event.category.id"></core-format-text></p>\n                </a>\n                <ion-item text-wrap *ngIf="event.description">\n                    <h2>{{ \'core.description\' | translate}}</h2>\n                    <p>\n                        <core-format-text [text]="event.description" [contextLevel]="event.contextLevel" [contextInstanceId]="event.contextInstanceId"></core-format-text>\n                    </p>\n                </ion-item>\n                <ion-item text-wrap *ngIf="event.location">\n                    <h2>{{ \'core.location\' | translate}}</h2>\n                    <p>\n                        <a [href]="event.encodedLocation" core-link auto-login="no">\n                            <core-format-text [text]="event.location" [contextLevel]="event.contextLevel" [contextInstanceId]="event.contextInstanceId"></core-format-text>\n                        </a>\n                    </p>\n                </ion-item>\n                <ion-item *ngIf="moduleUrl">\n                    <a ion-button block color="primary" [href]="moduleUrl" core-link capture="true">{{ \'addon.calendar.gotoactivity\' | translate }}</a>\n                </ion-item>\n            </ion-card-content>\n        </ion-card>\n\n        <ion-card list *ngIf="notificationsEnabled">\n            <ion-item>\n                <h2>{{ \'addon.calendar.reminders\' | translate }}</h2>\n            </ion-item>\n            <ng-container *ngFor="let reminder of reminders">\n                <ion-item  text-wrap *ngIf="reminder.time > 0 || defaultTime > 0" [class.item-dimmed]="(reminder.time == -1 ? (event.timestart - defaultTime) : reminder.time) <= currentTime" >\n                    <p *ngIf="reminder.time == -1">{{ \'core.defaultvalue\' | translate :{$a: ((event.timestart - defaultTime) * 1000) | coreFormatDate } }}</p>\n                    <p *ngIf="reminder.time > 0">{{ reminder.time * 1000 | coreFormatDate }}</p>\n                    <button ion-button icon-only clear="true" (click)="cancelNotification(reminder.id, $event)" [attr.aria-label]=" \'core.delete\' | translate" item-end *ngIf="(reminder.time == -1 ? (event.timestart - defaultTime) : reminder.time) > currentTime">\n                        <ion-icon name="trash" color="danger"></ion-icon>\n                    </button>\n                </ion-item>\n            </ng-container>\n\n            <ng-container *ngIf="event.timestart + event.timeduration > currentTime">\n                <ion-item>\n                    <button ion-button block color="primary" (click)="notificationPicker.open()">\n                        {{ \'addon.calendar.setnewreminder\' | translate }}\n                    </button>\n                </ion-item>\n                <ion-datetime #notificationPicker hidden [(ngModel)]="notificationTimeText" [displayFormat]="notificationFormat" [min]="notificationMin" [max]="notificationMax" [doneText]="\'core.add\' | translate"(ionChange)="addNotificationTime()"></ion-datetime>\n            </ng-container>\n        </ion-card>\n    </core-loading>\n</ion-content>\n'/*ion-inline-end:"/home/travis/build/moodlehq/moodlemobile2/src/addon/calendar/pages/event/event.html"*/,
        }),
        __param(12, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["N" /* Optional */])()),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_3__providers_calendar__["a" /* AddonCalendarProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_10__providers_utils_dom__["a" /* CoreDomUtilsProvider */], __WEBPACK_IMPORTED_MODULE_7__core_courses_providers_courses__["a" /* CoreCoursesProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_helper__["a" /* AddonCalendarHelperProvider */], __WEBPACK_IMPORTED_MODULE_12__providers_sites__["a" /* CoreSitesProvider */],
            __WEBPACK_IMPORTED_MODULE_13__providers_local_notifications__["a" /* CoreLocalNotificationsProvider */], __WEBPACK_IMPORTED_MODULE_14__core_course_providers_course__["a" /* CoreCourseProvider */],
            __WEBPACK_IMPORTED_MODULE_11__providers_utils_text__["a" /* CoreTextUtilsProvider */], __WEBPACK_IMPORTED_MODULE_15__providers_utils_time__["a" /* CoreTimeUtilsProvider */],
            __WEBPACK_IMPORTED_MODULE_16__providers_groups__["a" /* CoreGroupsProvider */], __WEBPACK_IMPORTED_MODULE_17__components_split_view_split_view__["a" /* CoreSplitViewComponent */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavController */], __WEBPACK_IMPORTED_MODULE_9__providers_events__["a" /* CoreEventsProvider */], __WEBPACK_IMPORTED_MODULE_18__ionic_native_network__["a" /* Network */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */],
            __WEBPACK_IMPORTED_MODULE_6__providers_calendar_sync__["a" /* AddonCalendarSyncProvider */], __WEBPACK_IMPORTED_MODULE_8__providers_app__["a" /* CoreAppProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_calendar_offline__["a" /* AddonCalendarOfflineProvider */]])
    ], AddonCalendarEventPage);
    return AddonCalendarEventPage;
}());

//# sourceMappingURL=event.js.map

/***/ })

});
//# sourceMappingURL=135.js.map