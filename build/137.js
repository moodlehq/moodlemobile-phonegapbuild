webpackJsonp([137],{

/***/ 2136:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddonCalendarDayPageModule", function() { return AddonCalendarDayPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__directives_directives_module__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pipes_pipes_module__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__day__ = __webpack_require__(2286);
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







var AddonCalendarDayPageModule = /** @class */ (function () {
    function AddonCalendarDayPageModule() {
    }
    AddonCalendarDayPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__day__["a" /* AddonCalendarDayPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* CoreComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_4__directives_directives_module__["a" /* CoreDirectivesModule */],
                __WEBPACK_IMPORTED_MODULE_5__pipes_pipes_module__["a" /* CorePipesModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_6__day__["a" /* AddonCalendarDayPage */]),
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */].forChild()
            ],
        })
    ], AddonCalendarDayPageModule);
    return AddonCalendarDayPageModule;
}());

//# sourceMappingURL=day.module.js.map

/***/ }),

/***/ 2286:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddonCalendarDayPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_app__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_events__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_local_notifications__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_sites__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_utils_dom__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_utils_time__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_calendar__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_calendar_offline__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_helper__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_calendar_sync__ = __webpack_require__(423);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__core_courses_providers_courses__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__core_courses_providers_helper__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_filter_filter__ = __webpack_require__(992);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_network__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_moment__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16_moment__);
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
// WITHOUT WARRANTIES OR CONDITIONS OFx ANY KIND, either express or implied.
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
 * Page that displays the calendar events for a certain day.
 */
var AddonCalendarDayPage = /** @class */ (function () {
    function AddonCalendarDayPage(localNotificationsProvider, navParams, network, zone, sitesProvider, navCtrl, domUtils, timeUtils, calendarProvider, calendarOffline, calendarHelper, calendarSync, eventsProvider, coursesProvider, coursesHelper, appProvider, popoverCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.domUtils = domUtils;
        this.timeUtils = timeUtils;
        this.calendarProvider = calendarProvider;
        this.calendarOffline = calendarOffline;
        this.calendarHelper = calendarHelper;
        this.calendarSync = calendarSync;
        this.eventsProvider = eventsProvider;
        this.coursesProvider = coursesProvider;
        this.coursesHelper = coursesHelper;
        this.appProvider = appProvider;
        this.popoverCtrl = popoverCtrl;
        this.categories = {};
        this.events = []; // Events (both online and offline).
        this.onlineEvents = [];
        this.offlineEvents = {}; // Offline events.
        this.offlineEditedEventsIds = []; // IDs of events edited in offline.
        this.deletedEvents = []; // Events deleted in offline.
        this.filteredEvents = [];
        this.canCreate = false;
        this.loaded = false;
        this.hasOffline = false;
        this.isOnline = false;
        this.filter = {
            filtered: false,
            courseId: null,
            categoryId: null,
            course: true,
            group: true,
            site: true,
            user: true,
            category: true
        };
        var now = new Date();
        __WEBPACK_IMPORTED_MODULE_8__providers_calendar__["a" /* AddonCalendarProvider */].ALL_TYPES.forEach(function (name) {
            _this.filter[name] = navParams.get(name);
            _this.filter[name] = typeof _this.filter[name] == 'undefined' ? true : _this.filter[name];
        });
        this.filter.courseId = navParams.get('courseId');
        this.filter.categoryId = navParams.get('categoryId');
        this.filter.filtered = !!this.filter.courseId || __WEBPACK_IMPORTED_MODULE_8__providers_calendar__["a" /* AddonCalendarProvider */].ALL_TYPES.some(function (name) { return !_this.filter[name]; });
        this.year = navParams.get('year') || now.getFullYear();
        this.month = navParams.get('month') || (now.getMonth() + 1);
        this.day = navParams.get('day') || now.getDate();
        this.currentSiteId = sitesProvider.getCurrentSiteId();
        if (localNotificationsProvider.isAvailable()) {
            // Re-schedule events if default time changes.
            this.obsDefaultTimeChange = eventsProvider.on(__WEBPACK_IMPORTED_MODULE_8__providers_calendar__["a" /* AddonCalendarProvider */].DEFAULT_NOTIFICATION_TIME_CHANGED, function () {
                calendarProvider.scheduleEventsNotifications(_this.onlineEvents);
            }, this.currentSiteId);
        }
        // Listen for events added. When an event is added, reload the data.
        this.newEventObserver = eventsProvider.on(__WEBPACK_IMPORTED_MODULE_8__providers_calendar__["a" /* AddonCalendarProvider */].NEW_EVENT_EVENT, function (data) {
            if (data && data.event) {
                _this.loaded = false;
                _this.refreshData(true, false, true);
            }
        }, this.currentSiteId);
        // Listen for new event discarded event. When it does, reload the data.
        this.discardedObserver = eventsProvider.on(__WEBPACK_IMPORTED_MODULE_8__providers_calendar__["a" /* AddonCalendarProvider */].NEW_EVENT_DISCARDED_EVENT, function () {
            _this.loaded = false;
            _this.refreshData(true, false, true);
        }, this.currentSiteId);
        // Listen for events edited. When an event is edited, reload the data.
        this.editEventObserver = eventsProvider.on(__WEBPACK_IMPORTED_MODULE_8__providers_calendar__["a" /* AddonCalendarProvider */].EDIT_EVENT_EVENT, function (data) {
            if (data && data.event) {
                _this.loaded = false;
                _this.refreshData(true, false, true);
            }
        }, this.currentSiteId);
        // Refresh data if calendar events are synchronized automatically.
        this.syncObserver = eventsProvider.on(__WEBPACK_IMPORTED_MODULE_11__providers_calendar_sync__["a" /* AddonCalendarSyncProvider */].AUTO_SYNCED, function (data) {
            _this.loaded = false;
            _this.refreshData(false, false, true);
        }, this.currentSiteId);
        // Refresh data if calendar events are synchronized manually but not by this page.
        this.manualSyncObserver = eventsProvider.on(__WEBPACK_IMPORTED_MODULE_11__providers_calendar_sync__["a" /* AddonCalendarSyncProvider */].MANUAL_SYNCED, function (data) {
            if (data && (data.source != 'day' || data.year != _this.year || data.month != _this.month || data.day != _this.day)) {
                _this.loaded = false;
                _this.refreshData(false, false, true);
            }
        }, this.currentSiteId);
        // Update the events when an event is deleted.
        this.deleteEventObserver = eventsProvider.on(__WEBPACK_IMPORTED_MODULE_8__providers_calendar__["a" /* AddonCalendarProvider */].DELETED_EVENT_EVENT, function (data) {
            if (data && !data.sent) {
                // Event was deleted in offline. Just mark it as deleted, no need to refresh.
                _this.hasOffline = _this.markAsDeleted(data.eventId, true) || _this.hasOffline;
                _this.deletedEvents.push(data.eventId);
            }
            else {
                _this.loaded = false;
                _this.refreshData(false, false, true);
            }
        }, this.currentSiteId);
        // Listen for events "undeleted" (offline).
        this.undeleteEventObserver = eventsProvider.on(__WEBPACK_IMPORTED_MODULE_8__providers_calendar__["a" /* AddonCalendarProvider */].UNDELETED_EVENT_EVENT, function (data) {
            if (data && data.eventId) {
                // Mark it as undeleted, no need to refresh.
                var found = _this.markAsDeleted(data.eventId, false);
                // Remove it from the list of deleted events if it's there.
                var index = _this.deletedEvents.indexOf(data.eventId);
                if (index != -1) {
                    _this.deletedEvents.splice(index, 1);
                }
                if (found) {
                    // The deleted event belongs to current list. Re-calculate "hasOffline".
                    _this.hasOffline = false;
                    if (_this.events.length != _this.onlineEvents.length) {
                        _this.hasOffline = true;
                    }
                    else {
                        var event_1 = _this.events.find(function (event) {
                            return event.deleted || event.offline;
                        });
                        _this.hasOffline = !!event_1;
                    }
                }
            }
        }, this.currentSiteId);
        this.filterChangedObserver = this.eventsProvider.on(__WEBPACK_IMPORTED_MODULE_8__providers_calendar__["a" /* AddonCalendarProvider */].FILTER_CHANGED_EVENT, function (data) {
            _this.filter = data;
            // Course viewed has changed, check if the user can create events for this course calendar.
            _this.calendarHelper.canEditEvents(_this.filter['courseId']).then(function (canEdit) {
                _this.canCreate = canEdit;
            });
            _this.filterEvents();
        });
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
    AddonCalendarDayPage.prototype.ngOnInit = function () {
        this.calculateCurrentMoment();
        this.calculateIsCurrentDay();
        this.fetchData(true, false);
    };
    /**
     * Fetch all the data required for the view.
     *
     * @param sync Whether it should try to synchronize offline events.
     * @param showErrors Whether to show sync errors to the user.
     * @return Promise resolved when done.
     */
    AddonCalendarDayPage.prototype.fetchData = function (sync, showErrors) {
        var _this = this;
        this.syncIcon = 'spinner';
        this.isOnline = this.appProvider.isOnline();
        var promise = sync ? this.sync() : Promise.resolve();
        return promise.then(function () {
            var promises = [];
            // Load courses for the popover.
            promises.push(_this.coursesHelper.getCoursesForPopover(_this.filter['courseId']).then(function (data) {
                _this.courses = data.courses;
            }));
            // Get categories.
            promises.push(_this.loadCategories());
            // Get offline events.
            promises.push(_this.calendarOffline.getAllEditedEvents().then(function (events) {
                // Format data.
                events.forEach(function (event) {
                    event.offline = true;
                    _this.calendarHelper.formatEventData(event);
                });
                // Classify them by month & day.
                _this.offlineEvents = _this.calendarHelper.classifyIntoMonths(events);
                // // Get the IDs of events edited in offline.
                var filtered = events.filter(function (event) {
                    return event.id > 0;
                });
                _this.offlineEditedEventsIds = filtered.map(function (event) {
                    return event.id;
                });
            }));
            // Get events deleted in offline.
            promises.push(_this.calendarOffline.getAllDeletedEventsIds().then(function (ids) {
                _this.deletedEvents = ids;
            }));
            // Check if user can create events.
            promises.push(_this.calendarHelper.canEditEvents(_this.filter['courseId']).then(function (canEdit) {
                _this.canCreate = canEdit;
            }));
            // Get user preferences.
            promises.push(_this.calendarProvider.getCalendarTimeFormat().then(function (value) {
                _this.timeFormat = value;
            }));
            return Promise.all(promises);
        }).then(function () {
            return _this.fetchEvents();
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'addon.calendar.errorloadevents', true);
        }).finally(function () {
            _this.loaded = true;
            _this.syncIcon = 'sync';
        });
    };
    /**
     * Fetch the events for current day.
     *
     * @return Promise resolved when done.
     */
    AddonCalendarDayPage.prototype.fetchEvents = function () {
        var _this = this;
        // Don't pass courseId and categoryId, we'll filter them locally.
        return this.calendarProvider.getDayEvents(this.year, this.month, this.day).catch(function (error) {
            if (!_this.appProvider.isOnline()) {
                // Allow navigating to non-cached days in offline (behave as if using emergency cache).
                return Promise.resolve({ events: [] });
            }
            else {
                return Promise.reject(error);
            }
        }).then(function (result) {
            var promises = [];
            // Calculate the period name. We don't use the one in result because it's in server's language.
            _this.periodName = _this.timeUtils.userDate(new Date(_this.year, _this.month - 1, _this.day).getTime(), 'core.strftimedaydate');
            _this.onlineEvents = result.events;
            _this.onlineEvents.forEach(_this.calendarHelper.formatEventData.bind(_this.calendarHelper));
            // Schedule notifications for the events retrieved (only future events will be scheduled).
            _this.calendarProvider.scheduleEventsNotifications(_this.onlineEvents);
            // Merge the online events with offline data.
            _this.events = _this.mergeEvents();
            // Filter events by course.
            _this.filterEvents();
            _this.calculateIsCurrentDay();
            // Re-calculate the formatted time so it uses the device date.
            var dayTime = _this.currentMoment.unix() * 1000;
            _this.events.forEach(function (event) {
                event.ispast = _this.isPastDay || (_this.isCurrentDay && _this.isEventPast(event));
                promises.push(_this.calendarProvider.formatEventTime(event, _this.timeFormat, true, dayTime).then(function (time) {
                    event.formattedtime = time;
                }));
            });
            return Promise.all(promises);
        });
    };
    /**
     * Merge online events with the offline events of that period.
     *
     * @return Merged events.
     */
    AddonCalendarDayPage.prototype.mergeEvents = function () {
        var _this = this;
        this.hasOffline = false;
        if (!Object.keys(this.offlineEvents).length && !this.deletedEvents.length) {
            // No offline events, nothing to merge.
            return this.onlineEvents;
        }
        var monthOfflineEvents = this.offlineEvents[this.calendarHelper.getMonthId(this.year, this.month)], dayOfflineEvents = monthOfflineEvents && monthOfflineEvents[this.day];
        var result = this.onlineEvents;
        if (this.deletedEvents.length) {
            // Mark as deleted the events that were deleted in offline.
            result.forEach(function (event) {
                event.deleted = _this.deletedEvents.indexOf(event.id) != -1;
                if (event.deleted) {
                    _this.hasOffline = true;
                }
            });
        }
        if (this.offlineEditedEventsIds.length) {
            // Remove the online events that were modified in offline.
            result = result.filter(function (event) {
                return _this.offlineEditedEventsIds.indexOf(event.id) == -1;
            });
            if (result.length != this.onlineEvents.length) {
                this.hasOffline = true;
            }
        }
        if (dayOfflineEvents && dayOfflineEvents.length) {
            // Add the offline events (either new or edited).
            this.hasOffline = true;
            result = this.sortEvents(result.concat(dayOfflineEvents));
        }
        return result;
    };
    /**
     * Filter events based on the filter popover.
     */
    AddonCalendarDayPage.prototype.filterEvents = function () {
        this.filteredEvents = this.calendarHelper.getFilteredEvents(this.events, this.filter, this.categories);
    };
    /**
     * Sort events by timestart.
     *
     * @param events List to sort.
     */
    AddonCalendarDayPage.prototype.sortEvents = function (events) {
        return events.sort(function (a, b) {
            if (a.timestart == b.timestart) {
                return a.timeduration - b.timeduration;
            }
            return a.timestart - b.timestart;
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
    AddonCalendarDayPage.prototype.doRefresh = function (refresher, done, showErrors) {
        if (this.loaded) {
            return this.refreshData(true, showErrors).finally(function () {
                refresher && refresher.complete();
                done && done();
            });
        }
        return Promise.resolve();
    };
    /**
     * Refresh the data.
     *
     * @param sync Whether it should try to synchronize offline events.
     * @param showErrors Whether to show sync errors to the user.
     * @param afterChange Whether the refresh is done after an event has changed or has been synced.
     * @return Promise resolved when done.
     */
    AddonCalendarDayPage.prototype.refreshData = function (sync, showErrors, afterChange) {
        var _this = this;
        this.syncIcon = 'spinner';
        var promises = [];
        // Don't invalidate day events after a change, it has already been handled.
        if (!afterChange) {
            promises.push(this.calendarProvider.invalidateDayEvents(this.year, this.month, this.day));
        }
        promises.push(this.calendarProvider.invalidateAllowedEventTypes());
        promises.push(this.coursesProvider.invalidateCategories(0, true));
        promises.push(this.calendarProvider.invalidateTimeFormat());
        return Promise.all(promises).finally(function () {
            return _this.fetchData(sync, showErrors);
        });
    };
    /**
     * Load categories to be able to filter events.
     *
     * @return Promise resolved when done.
     */
    AddonCalendarDayPage.prototype.loadCategories = function () {
        var _this = this;
        return this.coursesProvider.getCategories(0, true).then(function (cats) {
            _this.categories = {};
            // Index categories by ID.
            cats.forEach(function (category) {
                _this.categories[category.id] = category;
            });
        }).catch(function () {
            // Ignore errors.
        });
    };
    /**
     * Try to synchronize offline events.
     *
     * @param showErrors Whether to show sync errors to the user.
     * @return Promise resolved when done.
     */
    AddonCalendarDayPage.prototype.sync = function (showErrors) {
        var _this = this;
        return this.calendarSync.syncEvents().then(function (result) {
            if (result.warnings && result.warnings.length) {
                _this.domUtils.showErrorModal(result.warnings[0]);
            }
            if (result.updated) {
                // Trigger a manual sync event.
                result.source = 'day';
                result.day = _this.day;
                result.month = _this.month;
                result.year = _this.year;
                _this.eventsProvider.trigger(__WEBPACK_IMPORTED_MODULE_11__providers_calendar_sync__["a" /* AddonCalendarSyncProvider */].MANUAL_SYNCED, result, _this.currentSiteId);
            }
        }).catch(function (error) {
            if (showErrors) {
                _this.domUtils.showErrorModalDefault(error, 'core.errorsync', true);
            }
        });
    };
    /**
     * Navigate to a particular event.
     *
     * @param eventId Event to load.
     */
    AddonCalendarDayPage.prototype.gotoEvent = function (eventId) {
        if (eventId < 0) {
            // It's an offline event, go to the edit page.
            this.openEdit(eventId);
        }
        else {
            this.navCtrl.push('AddonCalendarEventPage', {
                id: eventId
            });
        }
    };
    /**
     * Show the context menu.
     *
     * @param event Event.
     */
    AddonCalendarDayPage.prototype.openFilter = function (event) {
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_14__components_filter_filter__["a" /* AddonCalendarFilterPopoverComponent */], {
            courses: this.courses,
            filter: this.filter
        });
        popover.present({
            ev: event
        });
    };
    /**
     * Open page to create/edit an event.
     *
     * @param eventId Event ID to edit.
     */
    AddonCalendarDayPage.prototype.openEdit = function (eventId) {
        var params = {};
        if (eventId) {
            params.eventId = eventId;
        }
        else {
            // It's a new event, set the time.
            params.timestamp = __WEBPACK_IMPORTED_MODULE_16_moment__().year(this.year).month(this.month - 1).date(this.day).unix() * 1000;
        }
        if (this.filter['courseId']) {
            params.courseId = this.filter['courseId'];
        }
        this.navCtrl.push('AddonCalendarEditEventPage', params);
    };
    /**
     * Calculate current moment.
     */
    AddonCalendarDayPage.prototype.calculateCurrentMoment = function () {
        this.currentMoment = __WEBPACK_IMPORTED_MODULE_16_moment__().year(this.year).month(this.month - 1).date(this.day);
    };
    /**
     * Check if user is viewing the current day.
     */
    AddonCalendarDayPage.prototype.calculateIsCurrentDay = function () {
        var now = new Date();
        this.currentTime = this.timeUtils.timestamp();
        this.isCurrentDay = this.year == now.getFullYear() && this.month == now.getMonth() + 1 && this.day == now.getDate();
        this.isPastDay = this.year < now.getFullYear() || (this.year == now.getFullYear() && this.month < now.getMonth()) ||
            (this.year == now.getFullYear() && this.month == now.getMonth() + 1 && this.day < now.getDate());
    };
    /**
     * Go to current day.
     */
    AddonCalendarDayPage.prototype.goToCurrentDay = function () {
        var _this = this;
        var now = new Date(), initialDay = this.day, initialMonth = this.month, initialYear = this.year;
        this.day = now.getDate();
        this.month = now.getMonth() + 1;
        this.year = now.getFullYear();
        this.calculateCurrentMoment();
        this.loaded = false;
        this.fetchEvents().then(function () {
            _this.isCurrentDay = true;
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'addon.calendar.errorloadevents', true);
            _this.year = initialYear;
            _this.month = initialMonth;
            _this.day = initialDay;
            _this.calculateCurrentMoment();
        }).finally(function () {
            _this.loaded = true;
        });
    };
    /**
     * Load next month.
     */
    AddonCalendarDayPage.prototype.loadNext = function () {
        var _this = this;
        this.increaseDay();
        this.loaded = false;
        this.fetchEvents().catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'addon.calendar.errorloadevents', true);
            _this.decreaseDay();
        }).finally(function () {
            _this.loaded = true;
        });
    };
    /**
     * Load previous month.
     */
    AddonCalendarDayPage.prototype.loadPrevious = function () {
        var _this = this;
        this.decreaseDay();
        this.loaded = false;
        this.fetchEvents().catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'addon.calendar.errorloadevents', true);
            _this.increaseDay();
        }).finally(function () {
            _this.loaded = true;
        });
    };
    /**
     * Decrease the current day.
     */
    AddonCalendarDayPage.prototype.decreaseDay = function () {
        this.currentMoment.subtract(1, 'day');
        this.year = this.currentMoment.year();
        this.month = this.currentMoment.month() + 1;
        this.day = this.currentMoment.date();
    };
    /**
     * Increase the current day.
     */
    AddonCalendarDayPage.prototype.increaseDay = function () {
        this.currentMoment.add(1, 'day');
        this.year = this.currentMoment.year();
        this.month = this.currentMoment.month() + 1;
        this.day = this.currentMoment.date();
    };
    /**
     * Find an event and mark it as deleted.
     *
     * @param eventId Event ID.
     * @param deleted Whether to mark it as deleted or not.
     * @return Whether the event was found.
     */
    AddonCalendarDayPage.prototype.markAsDeleted = function (eventId, deleted) {
        var event = this.onlineEvents.find(function (event) {
            return event.id == eventId;
        });
        if (event) {
            event.deleted = deleted;
            return true;
        }
        return false;
    };
    /**
     * Returns if the event is in the past or not.
     * @param event Event object.
     * @return True if it's in the past.
     */
    AddonCalendarDayPage.prototype.isEventPast = function (event) {
        return (event.timestart + event.timeduration) < this.currentTime;
    };
    /**
     * Page destroyed.
     */
    AddonCalendarDayPage.prototype.ngOnDestroy = function () {
        this.newEventObserver && this.newEventObserver.off();
        this.discardedObserver && this.discardedObserver.off();
        this.editEventObserver && this.editEventObserver.off();
        this.deleteEventObserver && this.deleteEventObserver.off();
        this.undeleteEventObserver && this.undeleteEventObserver.off();
        this.syncObserver && this.syncObserver.off();
        this.manualSyncObserver && this.manualSyncObserver.off();
        this.onlineObserver && this.onlineObserver.unsubscribe();
        this.filterChangedObserver && this.filterChangedObserver.off();
        this.obsDefaultTimeChange && this.obsDefaultTimeChange.off();
    };
    AddonCalendarDayPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-addon-calendar-day',template:/*ion-inline-start:"/home/travis/build/moodlehq/moodlemobile2/src/addon/calendar/pages/day/day.html"*/'<ion-header>\n    <ion-navbar core-back-button>\n        <ion-title>{{ \'addon.calendar.calendarevents\' | translate }}</ion-title>\n        <ion-buttons end>\n            <button ion-button icon-only (click)="openFilter($event)" [attr.aria-label]="\'core.filter\' | translate">\n                <ion-icon name="funnel" *ngIf="filter.filtered"></ion-icon>\n                <ion-icon name="ios-funnel-outline" *ngIf="!filter.filtered"></ion-icon>\n            </button>\n            <core-context-menu>\n                <core-context-menu-item *ngIf="!isCurrentDay" [priority]="900" [content]="\'addon.calendar.today\' | translate" [iconAction]="\'fa-calendar-times-o\'" (action)="goToCurrentDay()"></core-context-menu-item>\n                <core-context-menu-item [hidden]="!loaded || !hasOffline || !isOnline"  [priority]="400" [content]="\'core.settings.synchronizenow\' | translate" (action)="doRefresh(null, $event, true)" [iconAction]="syncIcon" [closeOnClick]="false"></core-context-menu-item>\n            </core-context-menu>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n<ion-content>\n    <ion-refresher [enabled]="loaded" (ionRefresh)="doRefresh($event)">\n        <ion-refresher-content pullingText="{{ \'core.pulltorefresh\' | translate }}"></ion-refresher-content>\n    </ion-refresher>\n\n    <!-- Period name and arrows to navigate. -->\n    <ion-grid padding-top class="safe-area-page">\n        <ion-row>\n            <ion-col text-start *ngIf="currentMoment">\n                <a ion-button icon-only clear (click)="loadPrevious()" [title]="\'addon.calendar.dayprev\' | translate">\n                    <ion-icon name="arrow-back" md="ios-arrow-back"></ion-icon>\n                </a>\n            </ion-col>\n            <ion-col text-center class="addon-calendar-period">\n                <h3>{{ periodName }}</h3>\n            </ion-col>\n            <ion-col text-end *ngIf="currentMoment">\n                <a ion-button icon-only clear (click)="loadNext()" [title]="\'addon.calendar.daynext\' | translate">\n                    <ion-icon name="arrow-forward" md="ios-arrow-forward"></ion-icon>\n                </a>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n\n    <core-loading [hideUntil]="loaded" class="safe-area-page">\n        <!-- There is data to be synchronized -->\n        <ion-card class="core-warning-card" icon-start *ngIf="hasOffline">\n            <ion-icon name="warning"></ion-icon> {{ \'core.hasdatatosync\' | translate:{$a: \'core.day\' | translate} }}\n        </ion-card>\n\n        <core-empty-box *ngIf="!filteredEvents || !filteredEvents.length" icon="calendar" [message]="\'addon.calendar.noevents\' | translate">\n        </core-empty-box>\n\n        <ion-list *ngIf="filteredEvents && filteredEvents.length" no-margin>\n            <ng-container *ngFor="let event of filteredEvents">\n                <ion-item text-wrap [title]="event.name" (click)="gotoEvent(event.id)" [class.item-dimmed]="event.ispast" class="addon-calendar-event" [ngClass]="[\'addon-calendar-eventtype-\'+event.eventtype]">\n                    <img *ngIf="event.moduleIcon" src="{{event.moduleIcon}}" item-start class="core-module-icon">\n                    <core-icon *ngIf="event.eventIcon && !event.moduleIcon" [name]="event.eventIcon" item-start></core-icon>\n                    <h2><core-format-text [text]="event.name" [contextLevel]="event.contextLevel" [contextInstanceId]="event.contextInstanceId"></core-format-text></h2>\n                    <p [innerHTML]="event.formattedtime"></p>\n                    <ion-note *ngIf="event.offline && !event.deleted" item-end>\n                        <ion-icon name="time"></ion-icon>\n                        <span text-wrap>{{ \'core.notsent\' | translate }}</span>\n                    </ion-note>\n                    <ion-note *ngIf="event.deleted" item-end>\n                        <ion-icon name="trash"></ion-icon>\n                        <span text-wrap>{{ \'core.deletedoffline\' | translate }}</span>\n                    </ion-note>\n                </ion-item>\n            </ng-container>\n        </ion-list>\n\n        <!-- Create a calendar event. -->\n        <ion-fab core-fab bottom end *ngIf="canCreate">\n            <button ion-fab (click)="openEdit()" [attr.aria-label]="\'addon.calendar.newevent\' | translate">\n                <ion-icon name="add"></ion-icon>\n            </button>\n        </ion-fab>\n    </core-loading>\n</ion-content>\n'/*ion-inline-end:"/home/travis/build/moodlehq/moodlemobile2/src/addon/calendar/pages/day/day.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__providers_local_notifications__["a" /* CoreLocalNotificationsProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_15__ionic_native_network__["a" /* Network */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */],
            __WEBPACK_IMPORTED_MODULE_5__providers_sites__["a" /* CoreSitesProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_6__providers_utils_dom__["a" /* CoreDomUtilsProvider */],
            __WEBPACK_IMPORTED_MODULE_7__providers_utils_time__["a" /* CoreTimeUtilsProvider */],
            __WEBPACK_IMPORTED_MODULE_8__providers_calendar__["a" /* AddonCalendarProvider */],
            __WEBPACK_IMPORTED_MODULE_9__providers_calendar_offline__["a" /* AddonCalendarOfflineProvider */],
            __WEBPACK_IMPORTED_MODULE_10__providers_helper__["a" /* AddonCalendarHelperProvider */],
            __WEBPACK_IMPORTED_MODULE_11__providers_calendar_sync__["a" /* AddonCalendarSyncProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_events__["a" /* CoreEventsProvider */],
            __WEBPACK_IMPORTED_MODULE_12__core_courses_providers_courses__["a" /* CoreCoursesProvider */],
            __WEBPACK_IMPORTED_MODULE_13__core_courses_providers_helper__["a" /* CoreCoursesHelperProvider */],
            __WEBPACK_IMPORTED_MODULE_2__providers_app__["a" /* CoreAppProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* PopoverController */]])
    ], AddonCalendarDayPage);
    return AddonCalendarDayPage;
}());

//# sourceMappingURL=day.js.map

/***/ })

});
//# sourceMappingURL=137.js.map