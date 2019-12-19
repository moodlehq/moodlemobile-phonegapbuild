webpackJsonp([139],{

/***/ 2155:
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

// EXTERNAL MODULE: ./src/providers/local-notifications.ts
var local_notifications = __webpack_require__(146);

// EXTERNAL MODULE: ./src/providers/sites.ts
var sites = __webpack_require__(1);

// EXTERNAL MODULE: ./src/providers/utils/dom.ts
var dom = __webpack_require__(4);

// EXTERNAL MODULE: ./src/providers/utils/time.ts
var time = __webpack_require__(24);

// EXTERNAL MODULE: ./src/addon/calendar/providers/calendar.ts
var calendar = __webpack_require__(178);

// EXTERNAL MODULE: ./src/addon/calendar/providers/calendar-offline.ts
var calendar_offline = __webpack_require__(278);

// EXTERNAL MODULE: ./src/addon/calendar/providers/helper.ts
var helper = __webpack_require__(279);

// EXTERNAL MODULE: ./src/addon/calendar/providers/calendar-sync.ts
var calendar_sync = __webpack_require__(482);

// EXTERNAL MODULE: ./src/core/courses/providers/courses.ts
var courses = __webpack_require__(52);

// EXTERNAL MODULE: ./src/core/courses/providers/helper.ts
var providers_helper = __webpack_require__(190);

// EXTERNAL MODULE: ./src/addon/calendar/components/filter/filter.ts
var filter = __webpack_require__(749);

// EXTERNAL MODULE: ./node_modules/@ionic-native/network/index.js
var _ionic_native_network = __webpack_require__(188);

// EXTERNAL MODULE: ./node_modules/moment/moment.js
var moment = __webpack_require__(14);
var moment_default = /*#__PURE__*/__webpack_require__.n(moment);

// CONCATENATED MODULE: ./src/addon/calendar/pages/day/day.ts
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
var day_AddonCalendarDayPage = /** @class */ (function () {
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
        calendar["a" /* AddonCalendarProvider */].ALL_TYPES.forEach(function (name) {
            _this.filter[name] = navParams.get(name);
            _this.filter[name] = typeof _this.filter[name] == 'undefined' ? true : _this.filter[name];
        });
        this.filter.courseId = navParams.get('courseId');
        this.filter.categoryId = navParams.get('categoryId');
        this.filter.filtered = !!this.filter.courseId || calendar["a" /* AddonCalendarProvider */].ALL_TYPES.some(function (name) { return !_this.filter[name]; });
        this.year = navParams.get('year') || now.getFullYear();
        this.month = navParams.get('month') || (now.getMonth() + 1);
        this.day = navParams.get('day') || now.getDate();
        this.currentSiteId = sitesProvider.getCurrentSiteId();
        if (localNotificationsProvider.isAvailable()) {
            // Re-schedule events if default time changes.
            this.obsDefaultTimeChange = eventsProvider.on(calendar["a" /* AddonCalendarProvider */].DEFAULT_NOTIFICATION_TIME_CHANGED, function () {
                calendarProvider.scheduleEventsNotifications(_this.onlineEvents);
            }, this.currentSiteId);
        }
        // Listen for events added. When an event is added, reload the data.
        this.newEventObserver = eventsProvider.on(calendar["a" /* AddonCalendarProvider */].NEW_EVENT_EVENT, function (data) {
            if (data && data.event) {
                _this.loaded = false;
                _this.refreshData(true, false, true);
            }
        }, this.currentSiteId);
        // Listen for new event discarded event. When it does, reload the data.
        this.discardedObserver = eventsProvider.on(calendar["a" /* AddonCalendarProvider */].NEW_EVENT_DISCARDED_EVENT, function () {
            _this.loaded = false;
            _this.refreshData(true, false, true);
        }, this.currentSiteId);
        // Listen for events edited. When an event is edited, reload the data.
        this.editEventObserver = eventsProvider.on(calendar["a" /* AddonCalendarProvider */].EDIT_EVENT_EVENT, function (data) {
            if (data && data.event) {
                _this.loaded = false;
                _this.refreshData(true, false, true);
            }
        }, this.currentSiteId);
        // Refresh data if calendar events are synchronized automatically.
        this.syncObserver = eventsProvider.on(calendar_sync["a" /* AddonCalendarSyncProvider */].AUTO_SYNCED, function (data) {
            _this.loaded = false;
            _this.refreshData(false, false, true);
        }, this.currentSiteId);
        // Refresh data if calendar events are synchronized manually but not by this page.
        this.manualSyncObserver = eventsProvider.on(calendar_sync["a" /* AddonCalendarSyncProvider */].MANUAL_SYNCED, function (data) {
            if (data && (data.source != 'day' || data.year != _this.year || data.month != _this.month || data.day != _this.day)) {
                _this.loaded = false;
                _this.refreshData(false, false, true);
            }
        }, this.currentSiteId);
        // Update the events when an event is deleted.
        this.deleteEventObserver = eventsProvider.on(calendar["a" /* AddonCalendarProvider */].DELETED_EVENT_EVENT, function (data) {
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
        this.undeleteEventObserver = eventsProvider.on(calendar["a" /* AddonCalendarProvider */].UNDELETED_EVENT_EVENT, function (data) {
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
        this.filterChangedObserver = this.eventsProvider.on(calendar["a" /* AddonCalendarProvider */].FILTER_CHANGED_EVENT, function (data) {
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
                _this.eventsProvider.trigger(calendar_sync["a" /* AddonCalendarSyncProvider */].MANUAL_SYNCED, result, _this.currentSiteId);
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
        var popover = this.popoverCtrl.create(filter["a" /* AddonCalendarFilterPopoverComponent */], {
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
            params.timestamp = moment().year(this.year).month(this.month - 1).date(this.day).unix() * 1000;
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
        this.currentMoment = moment().year(this.year).month(this.month - 1).date(this.day);
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
        Object(core["m" /* Component */])({
            selector: 'page-addon-calendar-day',
            templateUrl: 'day.html',
        }),
        __metadata("design:paramtypes", [local_notifications["a" /* CoreLocalNotificationsProvider */],
            ionic_angular["t" /* NavParams */],
            _ionic_native_network["a" /* Network */],
            core["M" /* NgZone */],
            sites["a" /* CoreSitesProvider */],
            ionic_angular["s" /* NavController */],
            dom["a" /* CoreDomUtilsProvider */],
            time["a" /* CoreTimeUtilsProvider */],
            calendar["a" /* AddonCalendarProvider */],
            calendar_offline["a" /* AddonCalendarOfflineProvider */],
            helper["a" /* AddonCalendarHelperProvider */],
            calendar_sync["a" /* AddonCalendarSyncProvider */],
            events["a" /* CoreEventsProvider */],
            courses["a" /* CoreCoursesProvider */],
            providers_helper["a" /* CoreCoursesHelperProvider */],
            app["a" /* CoreAppProvider */],
            ionic_angular["w" /* PopoverController */]])
    ], AddonCalendarDayPage);
    return AddonCalendarDayPage;
}());

//# sourceMappingURL=day.js.map
// CONCATENATED MODULE: ./src/addon/calendar/pages/day/day.module.ts
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
var day_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var day_module_AddonCalendarDayPageModule = /** @class */ (function () {
    function AddonCalendarDayPageModule() {
    }
    AddonCalendarDayPageModule = day_module___decorate([
        Object(core["I" /* NgModule */])({
            declarations: [
                day_AddonCalendarDayPage,
            ],
            imports: [
                components_module["a" /* CoreComponentsModule */],
                directives_module["a" /* CoreDirectivesModule */],
                pipes_module["a" /* CorePipesModule */],
                ionic_angular["l" /* IonicPageModule */].forChild(day_AddonCalendarDayPage),
                _ngx_translate_core["b" /* TranslateModule */].forChild()
            ],
        })
    ], AddonCalendarDayPageModule);
    return AddonCalendarDayPageModule;
}());

//# sourceMappingURL=day.module.js.map
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

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/icon/icon.js
var icon = __webpack_require__(47);

// EXTERNAL MODULE: ./node_modules/ionic-angular/config/config.js
var config = __webpack_require__(8);

// EXTERNAL MODULE: ./src/components/context-menu/context-menu-item.ngfactory.js
var context_menu_item_ngfactory = __webpack_require__(94);

// EXTERNAL MODULE: ./src/components/context-menu/context-menu-item.ts
var context_menu_item = __webpack_require__(84);

// EXTERNAL MODULE: ./src/components/context-menu/context-menu.ts
var context_menu = __webpack_require__(79);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.pipe.js
var translate_pipe = __webpack_require__(25);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.service.js
var translate_service = __webpack_require__(17);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/grid/col.js
var col = __webpack_require__(121);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.ngfactory.js
var button_ngfactory = __webpack_require__(45);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.js
var button_button = __webpack_require__(41);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/card/card.js
var card = __webpack_require__(91);

// EXTERNAL MODULE: ./src/components/empty-box/empty-box.ngfactory.js
var empty_box_ngfactory = __webpack_require__(127);

// EXTERNAL MODULE: ./src/components/empty-box/empty-box.ts
var empty_box = __webpack_require__(116);

// EXTERNAL MODULE: ./src/components/icon/icon.ngfactory.js
var icon_ngfactory = __webpack_require__(90);

// EXTERNAL MODULE: ./src/components/icon/icon.ts
var icon_icon = __webpack_require__(83);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/note/note.js
var note = __webpack_require__(252);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item.ngfactory.js + 1 modules
var item_ngfactory = __webpack_require__(30);

// EXTERNAL MODULE: ./node_modules/@angular/common/esm5/common.js
var common = __webpack_require__(7);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item.js
var item = __webpack_require__(20);

// EXTERNAL MODULE: ./node_modules/ionic-angular/util/form.js
var util_form = __webpack_require__(19);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-reorder.js + 1 modules
var item_reorder = __webpack_require__(26);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-content.js
var item_content = __webpack_require__(33);

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

// EXTERNAL MODULE: ./src/providers/logger.ts
var logger = __webpack_require__(6);

// EXTERNAL MODULE: ./src/providers/filepool.ts
var filepool = __webpack_require__(18);

// EXTERNAL MODULE: ./src/core/contentlinks/providers/helper.ts
var contentlinks_providers_helper = __webpack_require__(15);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-controller.js
var nav_controller = __webpack_require__(21);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.js
var content = __webpack_require__(29);

// EXTERNAL MODULE: ./src/components/split-view/split-view.ts
var split_view = __webpack_require__(27);

// EXTERNAL MODULE: ./src/providers/utils/iframe.ts
var iframe = __webpack_require__(43);

// EXTERNAL MODULE: ./src/core/filter/providers/filter.ts
var providers_filter = __webpack_require__(42);

// EXTERNAL MODULE: ./src/core/filter/providers/helper.ts
var filter_providers_helper = __webpack_require__(31);

// EXTERNAL MODULE: ./src/core/filter/providers/delegate.ts
var delegate = __webpack_require__(36);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/list/list.js + 1 modules
var list = __webpack_require__(89);

// EXTERNAL MODULE: ./node_modules/ionic-angular/gestures/gesture-controller.js
var gesture_controller = __webpack_require__(44);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/dom-controller.js
var dom_controller = __webpack_require__(34);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/fab/fab-container.ngfactory.js
var fab_container_ngfactory = __webpack_require__(284);

// EXTERNAL MODULE: ./src/directives/fab.ts
var fab = __webpack_require__(259);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/fab/fab-container.js
var fab_container = __webpack_require__(219);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/fab/fab.ngfactory.js
var fab_ngfactory = __webpack_require__(285);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/fab/fab.js
var fab_fab = __webpack_require__(192);

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

// EXTERNAL MODULE: ./src/components/context-menu/context-menu.ngfactory.js
var context_menu_ngfactory = __webpack_require__(93);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/popover/popover-controller.js
var popover_controller = __webpack_require__(71);

// EXTERNAL MODULE: ./src/components/tabs/tab.ts
var tab = __webpack_require__(77);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.ngfactory.js
var content_ngfactory = __webpack_require__(185);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/keyboard.js
var keyboard = __webpack_require__(109);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/refresher/refresher.js
var refresher = __webpack_require__(161);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/refresher/refresher-content.ngfactory.js
var refresher_content_ngfactory = __webpack_require__(215);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/refresher/refresher-content.js
var refresher_content = __webpack_require__(175);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/grid/grid.js
var grid = __webpack_require__(166);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/grid/row.js
var row = __webpack_require__(120);

// EXTERNAL MODULE: ./src/components/loading/loading.ngfactory.js
var loading_ngfactory = __webpack_require__(54);

// EXTERNAL MODULE: ./src/components/loading/loading.ts
var loading = __webpack_require__(51);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-params.js
var nav_params = __webpack_require__(70);

// CONCATENATED MODULE: ./src/addon/calendar/pages/day/day.ngfactory.js
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 



















































































var styles_AddonCalendarDayPage = [];
var RenderType_AddonCalendarDayPage = core["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_AddonCalendarDayPage, data: {} });

function View_AddonCalendarDayPage_1(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "ion-icon", [["name", "funnel"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](1, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null)], function (_ck, _v) { var currVal_1 = "funnel"; _ck(_v, 1, 0, currVal_1); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 1)._hidden; _ck(_v, 0, 0, currVal_0); }); }
function View_AddonCalendarDayPage_2(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "ion-icon", [["name", "ios-funnel-outline"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](1, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null)], function (_ck, _v) { var currVal_1 = "ios-funnel-outline"; _ck(_v, 1, 0, currVal_1); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 1)._hidden; _ck(_v, 0, 0, currVal_0); }); }
function View_AddonCalendarDayPage_3(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "core-context-menu-item", [], null, [[null, "action"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("action" === en)) {
        var pd_0 = (_co.goToCurrentDay() !== false);
        ad = (pd_0 && ad);
    } return ad; }, context_menu_item_ngfactory["b" /* View_CoreContextMenuItemComponent_0 */], context_menu_item_ngfactory["a" /* RenderType_CoreContextMenuItemComponent */])), core["_30" /* ɵdid */](1, 770048, null, 0, context_menu_item["a" /* CoreContextMenuItemComponent */], [context_menu["a" /* CoreContextMenuComponent */]], { content: [0, "content"], iconAction: [1, "iconAction"], priority: [2, "priority"] }, { action: "action" }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 1, 0, core["_44" /* ɵnov */](_v, 2).transform("addon.calendar.today")); var currVal_1 = "fa-calendar-times-o"; var currVal_2 = 900; _ck(_v, 1, 0, currVal_0, currVal_1, currVal_2); }, null); }
function View_AddonCalendarDayPage_4(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 10, "ion-col", [["class", "col"], ["text-start", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, col["a" /* Col */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 6, "a", [["clear", ""], ["icon-only", ""], ["ion-button", ""]], [[8, "title", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.loadPrevious() !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](4, 1097728, null, 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { clear: [0, "clear"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 0, 1, "ion-icon", [["md", "ios-arrow-back"], ["name", "arrow-back"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](8, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"], md: [1, "md"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "]))], function (_ck, _v) { var currVal_1 = ""; _ck(_v, 4, 0, currVal_1); var currVal_3 = "arrow-back"; var currVal_4 = "ios-arrow-back"; _ck(_v, 8, 0, currVal_3, currVal_4); }, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 3, 0, core["_44" /* ɵnov */](_v, 5).transform("addon.calendar.dayprev")); _ck(_v, 3, 0, currVal_0); var currVal_2 = core["_44" /* ɵnov */](_v, 8)._hidden; _ck(_v, 7, 0, currVal_2); }); }
function View_AddonCalendarDayPage_5(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 10, "ion-col", [["class", "col"], ["text-end", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, col["a" /* Col */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 6, "a", [["clear", ""], ["icon-only", ""], ["ion-button", ""]], [[8, "title", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.loadNext() !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](4, 1097728, null, 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { clear: [0, "clear"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 0, 1, "ion-icon", [["md", "ios-arrow-forward"], ["name", "arrow-forward"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](8, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"], md: [1, "md"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "]))], function (_ck, _v) { var currVal_1 = ""; _ck(_v, 4, 0, currVal_1); var currVal_3 = "arrow-forward"; var currVal_4 = "ios-arrow-forward"; _ck(_v, 8, 0, currVal_3, currVal_4); }, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 3, 0, core["_44" /* ɵnov */](_v, 5).transform("addon.calendar.daynext")); _ck(_v, 3, 0, currVal_0); var currVal_2 = core["_44" /* ɵnov */](_v, 8)._hidden; _ck(_v, 7, 0, currVal_2); }); }
function View_AddonCalendarDayPage_6(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 8, "ion-card", [["class", "core-warning-card"], ["icon-start", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, card["a" /* Card */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 1, "ion-icon", [["name", "warning"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](4, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ɵted */](5, null, [" ", "\n        "])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), core["_48" /* ɵpod */](7, { $a: 0 }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], function (_ck, _v) { var currVal_1 = "warning"; _ck(_v, 4, 0, currVal_1); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 4)._hidden; _ck(_v, 3, 0, currVal_0); var currVal_2 = core["_56" /* ɵunv */](_v, 5, 0, core["_44" /* ɵnov */](_v, 8).transform("core.hasdatatosync", _ck(_v, 7, 0, core["_56" /* ɵunv */](_v, 5, 0, core["_44" /* ɵnov */](_v, 6).transform("core.day"))))); _ck(_v, 5, 0, currVal_2); }); }
function View_AddonCalendarDayPage_7(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 3, "core-empty-box", [["icon", "calendar"]], null, null, null, empty_box_ngfactory["b" /* View_CoreEmptyBoxComponent_0 */], empty_box_ngfactory["a" /* RenderType_CoreEmptyBoxComponent */])), core["_30" /* ɵdid */](1, 49152, null, 0, empty_box["a" /* CoreEmptyBoxComponent */], [], { message: [0, "message"], icon: [1, "icon"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "]))], function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 1, 0, core["_44" /* ɵnov */](_v, 2).transform("addon.calendar.noevents")); var currVal_1 = "calendar"; _ck(_v, 1, 0, currVal_0, currVal_1); }, null); }
function View_AddonCalendarDayPage_10(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 0, "img", [["class", "core-module-icon"], ["item-start", ""]], [[8, "src", 4]], null, null, null, null))], null, function (_ck, _v) { var currVal_0 = core["_34" /* ɵinlineInterpolate */](1, "", _v.parent.context.$implicit.moduleIcon, ""); _ck(_v, 0, 0, currVal_0); }); }
function View_AddonCalendarDayPage_11(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "core-icon", [["item-start", ""]], null, null, null, icon_ngfactory["b" /* View_CoreIconComponent_0 */], icon_ngfactory["a" /* RenderType_CoreIconComponent */])), core["_30" /* ɵdid */](1, 704512, null, 0, icon_icon["a" /* CoreIconComponent */], [core["t" /* ElementRef */], config["a" /* Config */]], { name: [0, "name"] }, null)], function (_ck, _v) { var currVal_0 = _v.parent.context.$implicit.eventIcon; _ck(_v, 1, 0, currVal_0); }, null); }
function View_AddonCalendarDayPage_12(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 9, "ion-note", [["item-end", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, note["a" /* Note */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 1, "ion-icon", [["name", "time"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](4, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](6, 0, null, null, 2, "span", [["text-wrap", ""]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](7, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "]))], function (_ck, _v) { var currVal_1 = "time"; _ck(_v, 4, 0, currVal_1); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 4)._hidden; _ck(_v, 3, 0, currVal_0); var currVal_2 = core["_56" /* ɵunv */](_v, 7, 0, core["_44" /* ɵnov */](_v, 8).transform("core.notsent")); _ck(_v, 7, 0, currVal_2); }); }
function View_AddonCalendarDayPage_13(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 9, "ion-note", [["item-end", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, note["a" /* Note */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 1, "ion-icon", [["name", "trash"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](4, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](6, 0, null, null, 2, "span", [["text-wrap", ""]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](7, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "]))], function (_ck, _v) { var currVal_1 = "trash"; _ck(_v, 4, 0, currVal_1); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 4)._hidden; _ck(_v, 3, 0, currVal_0); var currVal_2 = core["_56" /* ɵunv */](_v, 7, 0, core["_44" /* ɵnov */](_v, 8).transform("core.deletedoffline")); _ck(_v, 7, 0, currVal_2); }); }
function View_AddonCalendarDayPage_9(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 29, null, null, null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ɵeld */](2, 0, null, null, 26, "ion-item", [["class", "addon-calendar-event item item-block"], ["text-wrap", ""]], [[8, "title", 0], [2, "item-dimmed", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.gotoEvent(_v.context.$implicit.id) !== false);
        ad = (pd_0 && ad);
    } return ad; }, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](3, 278528, null, 0, common["i" /* NgClass */], [core["E" /* IterableDiffers */], core["F" /* KeyValueDiffers */], core["t" /* ElementRef */], core["W" /* Renderer2 */]], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), core["_46" /* ɵpad */](4, 1), core["_30" /* ɵdid */](5, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 2, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 3, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 4, { _icons: 1 }), core["_30" /* ɵdid */](9, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonCalendarDayPage_10)), core["_30" /* ɵdid */](12, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonCalendarDayPage_11)), core["_30" /* ɵdid */](15, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](17, 0, null, 2, 2, "h2", [], null, null, null, null, null)), (_l()(), core["_31" /* ɵeld */](18, 16777216, null, null, 1, "core-format-text", [], null, null, null, null, null)), core["_30" /* ɵdid */](19, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform["a" /* Platform */], utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], app["a" /* CoreAppProvider */], contentlinks_providers_helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */], providers_filter["a" /* CoreFilterProvider */], filter_providers_helper["a" /* CoreFilterHelperProvider */], delegate["a" /* CoreFilterDelegate */], core["_11" /* ViewContainerRef */]], { text: [0, "text"], contextLevel: [1, "contextLevel"], contextInstanceId: [2, "contextInstanceId"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](21, 0, null, 2, 0, "p", [], [[8, "innerHTML", 1]], null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, 4, 1, null, View_AddonCalendarDayPage_12)), core["_30" /* ɵdid */](24, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, 4, 1, null, View_AddonCalendarDayPage_13)), core["_30" /* ɵdid */](27, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "]))], function (_ck, _v) { var currVal_2 = "addon-calendar-event"; var currVal_3 = _ck(_v, 4, 0, ("addon-calendar-eventtype-" + _v.context.$implicit.eventtype)); _ck(_v, 3, 0, currVal_2, currVal_3); var currVal_4 = _v.context.$implicit.moduleIcon; _ck(_v, 12, 0, currVal_4); var currVal_5 = (_v.context.$implicit.eventIcon && !_v.context.$implicit.moduleIcon); _ck(_v, 15, 0, currVal_5); var currVal_6 = _v.context.$implicit.name; var currVal_7 = _v.context.$implicit.contextLevel; var currVal_8 = _v.context.$implicit.contextInstanceId; _ck(_v, 19, 0, currVal_6, currVal_7, currVal_8); var currVal_10 = (_v.context.$implicit.offline && !_v.context.$implicit.deleted); _ck(_v, 24, 0, currVal_10); var currVal_11 = _v.context.$implicit.deleted; _ck(_v, 27, 0, currVal_11); }, function (_ck, _v) { var currVal_0 = _v.context.$implicit.name; var currVal_1 = _v.context.$implicit.ispast; _ck(_v, 2, 0, currVal_0, currVal_1); var currVal_9 = _v.context.$implicit.formattedtime; _ck(_v, 21, 0, currVal_9); }); }
function View_AddonCalendarDayPage_8(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 5, "ion-list", [["no-margin", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, list["a" /* List */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], platform["a" /* Platform */], gesture_controller["l" /* GestureController */], dom_controller["a" /* DomController */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonCalendarDayPage_9)), core["_30" /* ɵdid */](4, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.filteredEvents; _ck(_v, 4, 0, currVal_0); }, null); }
function View_AddonCalendarDayPage_14(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 13, "ion-fab", [["bottom", ""], ["core-fab", ""], ["end", ""]], null, null, null, fab_container_ngfactory["b" /* View_FabContainer_0 */], fab_container_ngfactory["a" /* RenderType_FabContainer */])), core["_30" /* ɵdid */](1, 212992, null, 0, fab["a" /* CoreFabDirective */], [core["t" /* ElementRef */], content["a" /* Content */]], null, null), core["_30" /* ɵdid */](2, 1228800, null, 2, fab_container["a" /* FabContainer */], [platform["a" /* Platform */]], null, null), core["_52" /* ɵqud */](335544320, 5, { _mainButton: 0 }), core["_52" /* ɵqud */](603979776, 6, { _fabLists: 1 }), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n            "])), (_l()(), core["_31" /* ɵeld */](6, 0, null, 0, 6, "button", [["ion-fab", ""]], [[1, "aria-label", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.openEdit() !== false);
        ad = (pd_0 && ad);
    } return ad; }, fab_ngfactory["b" /* View_FabButton_0 */], fab_ngfactory["a" /* RenderType_FabButton */])), core["_30" /* ɵdid */](7, 49152, [[5, 4]], 0, fab_fab["a" /* FabButton */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                "])), (_l()(), core["_31" /* ɵeld */](10, 0, null, 0, 1, "ion-icon", [["name", "add"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](11, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "]))], function (_ck, _v) { _ck(_v, 1, 0); var currVal_2 = "add"; _ck(_v, 11, 0, currVal_2); }, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 6, 0, core["_44" /* ɵnov */](_v, 8).transform("addon.calendar.newevent")); _ck(_v, 6, 0, currVal_0); var currVal_1 = core["_44" /* ɵnov */](_v, 11)._hidden; _ck(_v, 10, 0, currVal_1); }); }
function View_AddonCalendarDayPage_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 39, "ion-header", [], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, toolbar_header["a" /* Header */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, view_controller["a" /* ViewController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 35, "ion-navbar", [["class", "toolbar"], ["core-back-button", ""]], [[8, "hidden", 0], [2, "statusbar-padding", null]], null, null, navbar_ngfactory["b" /* View_Navbar_0 */], navbar_ngfactory["a" /* RenderType_Navbar */])), core["_30" /* ɵdid */](4, 49152, null, 0, navbar["a" /* Navbar */], [app_app["a" /* App */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_30" /* ɵdid */](5, 212992, null, 0, back_button["a" /* CoreBackButtonDirective */], [navbar["a" /* Navbar */], platform["a" /* Platform */], translate_service["a" /* TranslateService */], events["a" /* CoreEventsProvider */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n        "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 3, 3, "ion-title", [], null, null, null, toolbar_title_ngfactory["b" /* View_ToolbarTitle_0 */], toolbar_title_ngfactory["a" /* RenderType_ToolbarTitle */])), core["_30" /* ɵdid */](8, 49152, null, 0, toolbar_title["a" /* ToolbarTitle */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), (_l()(), core["_55" /* ɵted */](9, 0, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n        "])), (_l()(), core["_31" /* ɵeld */](12, 0, null, 2, 25, "ion-buttons", [["end", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](13, 16384, null, 1, toolbar_item["a" /* ToolbarItem */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), core["_52" /* ɵqud */](603979776, 1, { _buttons: 1 }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](16, 0, null, null, 9, "button", [["icon-only", ""], ["ion-button", ""]], [[1, "aria-label", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.openFilter($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](17, 1097728, [[1, 4]], 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonCalendarDayPage_1)), core["_30" /* ɵdid */](21, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonCalendarDayPage_2)), core["_30" /* ɵdid */](24, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](27, 0, null, null, 9, "core-context-menu", [], null, null, null, context_menu_ngfactory["b" /* View_CoreContextMenuComponent_0 */], context_menu_ngfactory["a" /* RenderType_CoreContextMenuComponent */])), core["_30" /* ɵdid */](28, 245760, null, 0, context_menu["a" /* CoreContextMenuComponent */], [translate_service["a" /* TranslateService */], popover_controller["a" /* PopoverController */], core["t" /* ElementRef */], dom["a" /* CoreDomUtilsProvider */], [2, tab["a" /* CoreTabComponent */]], utils["a" /* CoreUtilsProvider */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonCalendarDayPage_3)), core["_30" /* ɵdid */](31, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                "])), (_l()(), core["_31" /* ɵeld */](33, 0, null, 0, 2, "core-context-menu-item", [], null, [[null, "action"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("action" === en)) {
        var pd_0 = (_co.doRefresh(null, $event, true) !== false);
        ad = (pd_0 && ad);
    } return ad; }, context_menu_item_ngfactory["b" /* View_CoreContextMenuItemComponent_0 */], context_menu_item_ngfactory["a" /* RenderType_CoreContextMenuItemComponent */])), core["_30" /* ɵdid */](34, 770048, null, 0, context_menu_item["a" /* CoreContextMenuItemComponent */], [context_menu["a" /* CoreContextMenuComponent */]], { content: [0, "content"], iconAction: [1, "iconAction"], closeOnClick: [2, "closeOnClick"], priority: [3, "priority"], hidden: [4, "hidden"] }, { action: "action" }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_31" /* ɵeld */](41, 0, null, null, 50, "ion-content", [], [[2, "statusbar-padding", null], [2, "has-refresher", null]], null, null, content_ngfactory["b" /* View_Content_0 */], content_ngfactory["a" /* RenderType_Content */])), core["_30" /* ɵdid */](42, 4374528, null, 0, content["a" /* Content */], [config["a" /* Config */], platform["a" /* Platform */], dom_controller["a" /* DomController */], core["t" /* ElementRef */], core["V" /* Renderer */], app_app["a" /* App */], keyboard["a" /* Keyboard */], core["M" /* NgZone */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n    "])), (_l()(), core["_31" /* ɵeld */](44, 0, null, 2, 6, "ion-refresher", [], [[2, "refresher-active", null], [4, "top", null]], [[null, "ionRefresh"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("ionRefresh" === en)) {
        var pd_0 = (_co.doRefresh($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), core["_30" /* ɵdid */](45, 212992, null, 0, refresher["a" /* Refresher */], [platform["a" /* Platform */], content["a" /* Content */], core["M" /* NgZone */], gesture_controller["l" /* GestureController */]], { enabled: [0, "enabled"] }, { ionRefresh: "ionRefresh" }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_31" /* ɵeld */](47, 0, null, null, 2, "ion-refresher-content", [], [[1, "state", 0]], null, null, refresher_content_ngfactory["b" /* View_RefresherContent_0 */], refresher_content_ngfactory["a" /* RenderType_RefresherContent */])), core["_30" /* ɵdid */](48, 114688, null, 0, refresher_content["a" /* RefresherContent */], [refresher["a" /* Refresher */], config["a" /* Config */]], { pullingText: [0, "pullingText"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n\n    "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n    "])), (_l()(), core["_31" /* ɵeld */](53, 0, null, 1, 19, "ion-grid", [["class", "safe-area-page grid"], ["padding-top", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](54, 16384, null, 0, grid["a" /* Grid */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_31" /* ɵeld */](56, 0, null, null, 15, "ion-row", [["class", "row"]], null, null, null, null, null)), core["_30" /* ɵdid */](57, 16384, null, 0, row["a" /* Row */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonCalendarDayPage_4)), core["_30" /* ɵdid */](60, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](62, 0, null, null, 5, "ion-col", [["class", "addon-calendar-period col"], ["text-center", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](63, 16384, null, 0, col["a" /* Col */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ɵeld */](65, 0, null, null, 1, "h3", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](66, null, ["", ""])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonCalendarDayPage_5)), core["_30" /* ɵdid */](70, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n\n    "])), (_l()(), core["_31" /* ɵeld */](74, 0, null, 1, 16, "core-loading", [["class", "safe-area-page"]], null, null, null, loading_ngfactory["b" /* View_CoreLoadingComponent_0 */], loading_ngfactory["a" /* RenderType_CoreLoadingComponent */])), core["_30" /* ɵdid */](75, 638976, null, 0, loading["a" /* CoreLoadingComponent */], [translate_service["a" /* TranslateService */], core["t" /* ElementRef */], events["a" /* CoreEventsProvider */], utils["a" /* CoreUtilsProvider */]], { hideUntil: [0, "hideUntil"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonCalendarDayPage_6)), core["_30" /* ɵdid */](79, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonCalendarDayPage_7)), core["_30" /* ɵdid */](82, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonCalendarDayPage_8)), core["_30" /* ɵdid */](85, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n\n        "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonCalendarDayPage_14)), core["_30" /* ɵdid */](89, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; _ck(_v, 5, 0); var currVal_4 = _co.filter.filtered; _ck(_v, 21, 0, currVal_4); var currVal_5 = !_co.filter.filtered; _ck(_v, 24, 0, currVal_5); _ck(_v, 28, 0); var currVal_6 = !_co.isCurrentDay; _ck(_v, 31, 0, currVal_6); var currVal_7 = core["_56" /* ɵunv */](_v, 34, 0, core["_44" /* ɵnov */](_v, 35).transform("core.settings.synchronizenow")); var currVal_8 = _co.syncIcon; var currVal_9 = false; var currVal_10 = 400; var currVal_11 = ((!_co.loaded || !_co.hasOffline) || !_co.isOnline); _ck(_v, 34, 0, currVal_7, currVal_8, currVal_9, currVal_10, currVal_11); var currVal_16 = _co.loaded; _ck(_v, 45, 0, currVal_16); var currVal_18 = core["_34" /* ɵinlineInterpolate */](1, "", core["_56" /* ɵunv */](_v, 48, 0, core["_44" /* ɵnov */](_v, 49).transform("core.pulltorefresh")), ""); _ck(_v, 48, 0, currVal_18); var currVal_19 = _co.currentMoment; _ck(_v, 60, 0, currVal_19); var currVal_21 = _co.currentMoment; _ck(_v, 70, 0, currVal_21); var currVal_22 = _co.loaded; _ck(_v, 75, 0, currVal_22); var currVal_23 = _co.hasOffline; _ck(_v, 79, 0, currVal_23); var currVal_24 = (!_co.filteredEvents || !_co.filteredEvents.length); _ck(_v, 82, 0, currVal_24); var currVal_25 = (_co.filteredEvents && _co.filteredEvents.length); _ck(_v, 85, 0, currVal_25); var currVal_26 = _co.canCreate; _ck(_v, 89, 0, currVal_26); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = core["_44" /* ɵnov */](_v, 4)._hidden; var currVal_1 = core["_44" /* ɵnov */](_v, 4)._sbPadding; _ck(_v, 3, 0, currVal_0, currVal_1); var currVal_2 = core["_56" /* ɵunv */](_v, 9, 0, core["_44" /* ɵnov */](_v, 10).transform("addon.calendar.calendarevents")); _ck(_v, 9, 0, currVal_2); var currVal_3 = core["_56" /* ɵunv */](_v, 16, 0, core["_44" /* ɵnov */](_v, 18).transform("core.filter")); _ck(_v, 16, 0, currVal_3); var currVal_12 = core["_44" /* ɵnov */](_v, 42).statusbarPadding; var currVal_13 = core["_44" /* ɵnov */](_v, 42)._hasRefresher; _ck(_v, 41, 0, currVal_12, currVal_13); var currVal_14 = (core["_44" /* ɵnov */](_v, 45).state !== "inactive"); var currVal_15 = core["_44" /* ɵnov */](_v, 45)._top; _ck(_v, 44, 0, currVal_14, currVal_15); var currVal_17 = core["_44" /* ɵnov */](_v, 48).r.state; _ck(_v, 47, 0, currVal_17); var currVal_20 = _co.periodName; _ck(_v, 66, 0, currVal_20); }); }
function View_AddonCalendarDayPage_Host_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "page-addon-calendar-day", [], null, null, null, View_AddonCalendarDayPage_0, RenderType_AddonCalendarDayPage)), core["_30" /* ɵdid */](1, 245760, null, 0, day_AddonCalendarDayPage, [local_notifications["a" /* CoreLocalNotificationsProvider */], nav_params["a" /* NavParams */], _ionic_native_network["a" /* Network */], core["M" /* NgZone */], sites["a" /* CoreSitesProvider */], nav_controller["a" /* NavController */], dom["a" /* CoreDomUtilsProvider */], time["a" /* CoreTimeUtilsProvider */], calendar["a" /* AddonCalendarProvider */], calendar_offline["a" /* AddonCalendarOfflineProvider */], helper["a" /* AddonCalendarHelperProvider */], calendar_sync["a" /* AddonCalendarSyncProvider */], events["a" /* CoreEventsProvider */], courses["a" /* CoreCoursesProvider */], providers_helper["a" /* CoreCoursesHelperProvider */], app["a" /* CoreAppProvider */], popover_controller["a" /* PopoverController */]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var AddonCalendarDayPageNgFactory = core["_27" /* ɵccf */]("page-addon-calendar-day", day_AddonCalendarDayPage, View_AddonCalendarDayPage_Host_0, {}, {}, []);

//# sourceMappingURL=day.ngfactory.js.map
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

// CONCATENATED MODULE: ./src/addon/calendar/pages/day/day.module.ngfactory.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddonCalendarDayPageModuleNgFactory", function() { return AddonCalendarDayPageModuleNgFactory; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 































var AddonCalendarDayPageModuleNgFactory = core["_28" /* ɵcmf */](day_module_AddonCalendarDayPageModule, [], function (_l) { return core["_40" /* ɵmod */]([core["_41" /* ɵmpd */](512, core["o" /* ComponentFactoryResolver */], core["_21" /* ɵCodegenComponentFactoryResolver */], [[8, [action_sheet_component_ngfactory["a" /* ActionSheetCmpNgFactory */], alert_component_ngfactory["a" /* AlertCmpNgFactory */], app_root_ngfactory["a" /* IonicAppNgFactory */], loading_component_ngfactory["a" /* LoadingCmpNgFactory */], modal_component_ngfactory["a" /* ModalCmpNgFactory */], picker_component_ngfactory["a" /* PickerCmpNgFactory */], popover_component_ngfactory["a" /* PopoverCmpNgFactory */], select_popover_component_ngfactory["a" /* SelectPopoverNgFactory */], toast_component_ngfactory["a" /* ToastCmpNgFactory */], context_menu_popover_ngfactory["a" /* CoreContextMenuPopoverComponentNgFactory */], course_picker_menu_popover_ngfactory["a" /* CoreCoursePickerMenuPopoverComponentNgFactory */], recaptchamodal_ngfactory["a" /* CoreRecaptchaModalComponentNgFactory */], bs_tooltip_ngfactory["a" /* CoreBSTooltipComponentNgFactory */], AddonCalendarDayPageNgFactory]], [3, core["o" /* ComponentFactoryResolver */]], core["K" /* NgModuleRef */]]), core["_41" /* ɵmpd */](4608, common["m" /* NgLocalization */], common["l" /* NgLocaleLocalization */], [core["G" /* LOCALE_ID */], [2, common["w" /* ɵa */]]]), core["_41" /* ɵmpd */](4608, esm5_forms["x" /* ɵi */], esm5_forms["x" /* ɵi */], []), core["_41" /* ɵmpd */](4608, esm5_forms["d" /* FormBuilder */], esm5_forms["d" /* FormBuilder */], []), core["_41" /* ɵmpd */](4608, translate_loader["b" /* TranslateLoader */], translate_loader["a" /* TranslateFakeLoader */], []), core["_41" /* ɵmpd */](4608, translate_compiler["a" /* TranslateCompiler */], translate_compiler["b" /* TranslateFakeCompiler */], []), core["_41" /* ɵmpd */](4608, translate_parser["b" /* TranslateParser */], translate_parser["a" /* TranslateDefaultParser */], []), core["_41" /* ɵmpd */](4608, missing_translation_handler["b" /* MissingTranslationHandler */], missing_translation_handler["a" /* FakeMissingTranslationHandler */], []), core["_41" /* ɵmpd */](4608, translate_service["a" /* TranslateService */], translate_service["a" /* TranslateService */], [translate_store["a" /* TranslateStore */], translate_loader["b" /* TranslateLoader */], translate_compiler["a" /* TranslateCompiler */], translate_parser["b" /* TranslateParser */], missing_translation_handler["b" /* MissingTranslationHandler */], translate_service["b" /* USE_DEFAULT_LANG */], translate_service["c" /* USE_STORE */]]), core["_41" /* ɵmpd */](512, common["b" /* CommonModule */], common["b" /* CommonModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["v" /* ɵba */], esm5_forms["v" /* ɵba */], []), core["_41" /* ɵmpd */](512, esm5_forms["i" /* FormsModule */], esm5_forms["i" /* FormsModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["s" /* ReactiveFormsModule */], esm5_forms["s" /* ReactiveFormsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["a" /* IonicModule */], ionic_angular_module["a" /* IonicModule */], []), core["_41" /* ɵmpd */](512, _ngx_translate_core["b" /* TranslateModule */], _ngx_translate_core["b" /* TranslateModule */], []), core["_41" /* ɵmpd */](512, directives_module["a" /* CoreDirectivesModule */], directives_module["a" /* CoreDirectivesModule */], []), core["_41" /* ɵmpd */](512, pipes_module["a" /* CorePipesModule */], pipes_module["a" /* CorePipesModule */], []), core["_41" /* ɵmpd */](512, components_module["a" /* CoreComponentsModule */], components_module["a" /* CoreComponentsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["b" /* IonicPageModule */], ionic_angular_module["b" /* IonicPageModule */], []), core["_41" /* ɵmpd */](512, day_module_AddonCalendarDayPageModule, day_module_AddonCalendarDayPageModule, []), core["_41" /* ɵmpd */](256, translate_service["c" /* USE_STORE */], undefined, []), core["_41" /* ɵmpd */](256, translate_service["b" /* USE_DEFAULT_LANG */], undefined, []), core["_41" /* ɵmpd */](256, module_loader["a" /* LAZY_LOADED_TOKEN */], day_AddonCalendarDayPage, [])]); });

//# sourceMappingURL=day.module.ngfactory.js.map

/***/ })

});
//# sourceMappingURL=139.js.map