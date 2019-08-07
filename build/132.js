webpackJsonp([132],{

/***/ 2062:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/@angular/core/esm5/core.js
var core = __webpack_require__(0);

// EXTERNAL MODULE: ./node_modules/ionic-angular/index.js + 3 modules
var ionic_angular = __webpack_require__(6);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/index.js + 1 modules
var _ngx_translate_core = __webpack_require__(3);

// EXTERNAL MODULE: ./src/components/components.module.ts
var components_module = __webpack_require__(29);

// EXTERNAL MODULE: ./src/directives/directives.module.ts + 2 modules
var directives_module = __webpack_require__(31);

// EXTERNAL MODULE: ./src/pipes/pipes.module.ts + 2 modules
var pipes_module = __webpack_require__(109);

// EXTERNAL MODULE: ./node_modules/@angular/common/esm5/common.js
var common = __webpack_require__(8);

// EXTERNAL MODULE: ./src/providers/events.ts
var events = __webpack_require__(11);

// EXTERNAL MODULE: ./src/providers/local-notifications.ts
var local_notifications = __webpack_require__(154);

// EXTERNAL MODULE: ./src/providers/sites.ts
var sites = __webpack_require__(1);

// EXTERNAL MODULE: ./src/providers/utils/dom.ts
var dom = __webpack_require__(4);

// EXTERNAL MODULE: ./src/providers/utils/time.ts
var time = __webpack_require__(24);

// EXTERNAL MODULE: ./src/providers/utils/utils.ts
var utils_utils = __webpack_require__(2);

// EXTERNAL MODULE: ./src/addon/calendar/providers/calendar.ts
var calendar = __webpack_require__(211);

// EXTERNAL MODULE: ./src/addon/calendar/providers/helper.ts
var helper = __webpack_require__(713);

// EXTERNAL MODULE: ./src/addon/calendar/providers/calendar-offline.ts
var calendar_offline = __webpack_require__(365);

// EXTERNAL MODULE: ./src/core/courses/providers/courses.ts
var courses = __webpack_require__(51);

// CONCATENATED MODULE: ./src/addon/calendar/components/calendar/calendar.ts
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
 * Component that displays a calendar.
 */
var calendar_AddonCalendarCalendarComponent = /** @class */ (function () {
    function AddonCalendarCalendarComponent(eventsProvider, sitesProvider, localNotificationsProvider, calendarProvider, calendarHelper, calendarOffline, domUtils, timeUtils, utils, coursesProvider) {
        var _this = this;
        this.calendarProvider = calendarProvider;
        this.calendarHelper = calendarHelper;
        this.calendarOffline = calendarOffline;
        this.domUtils = domUtils;
        this.timeUtils = timeUtils;
        this.utils = utils;
        this.coursesProvider = coursesProvider;
        this.onEventClicked = new core["v" /* EventEmitter */]();
        this.onDayClicked = new core["v" /* EventEmitter */]();
        this.loaded = false;
        this.categoriesRetrieved = false;
        this.categories = {};
        this.offlineEvents = {}; // Offline events classified in month & day.
        this.offlineEditedEventsIds = []; // IDs of events edited in offline.
        this.deletedEvents = []; // Events deleted in offline.
        this.currentSiteId = sitesProvider.getCurrentSiteId();
        if (localNotificationsProvider.isAvailable()) {
            // Re-schedule events if default time changes.
            this.obsDefaultTimeChange = eventsProvider.on(calendar["a" /* AddonCalendarProvider */].DEFAULT_NOTIFICATION_TIME_CHANGED, function () {
                _this.weeks.forEach(function (week) {
                    week.days.forEach(function (day) {
                        calendarProvider.scheduleEventsNotifications(day.events);
                    });
                });
            }, this.currentSiteId);
        }
        // Listen for events "undeleted" (offline).
        this.undeleteEventObserver = eventsProvider.on(calendar["a" /* AddonCalendarProvider */].UNDELETED_EVENT_EVENT, function (data) {
            if (data && data.eventId) {
                // Mark it as undeleted, no need to refresh.
                _this.undeleteEvent(data.eventId);
                // Remove it from the list of deleted events if it's there.
                var index = _this.deletedEvents.indexOf(data.eventId);
                if (index != -1) {
                    _this.deletedEvents.splice(index, 1);
                }
            }
        }, this.currentSiteId);
    }
    /**
     * Component loaded.
     */
    AddonCalendarCalendarComponent.prototype.ngOnInit = function () {
        var now = new Date();
        this.year = this.initialYear ? Number(this.initialYear) : now.getFullYear();
        this.month = this.initialMonth ? Number(this.initialMonth) : now.getMonth() + 1;
        this.calculateIsCurrentMonth();
        this.fetchData();
    };
    /**
     * Detect changes on input properties.
     */
    AddonCalendarCalendarComponent.prototype.ngOnChanges = function (changes) {
        this.canNavigate = typeof this.canNavigate == 'undefined' ? true : this.utils.isTrueOrOne(this.canNavigate);
        this.displayNavButtons = typeof this.displayNavButtons == 'undefined' ? true :
            this.utils.isTrueOrOne(this.displayNavButtons);
        if ((changes.courseId || changes.categoryId) && this.weeks) {
            this.filterEvents();
        }
    };
    /**
     * Fetch contacts.
     *
     * @param {boolean} [refresh=false] True if we are refreshing events.
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonCalendarCalendarComponent.prototype.fetchData = function (refresh) {
        var _this = this;
        if (refresh === void 0) { refresh = false; }
        var promises = [];
        promises.push(this.loadCategories());
        // Get offline events.
        promises.push(this.calendarOffline.getAllEditedEvents().then(function (events) {
            // Format data.
            events.forEach(function (event) {
                event.offline = true;
                _this.calendarHelper.formatEventData(event);
            });
            // Classify them by month.
            _this.offlineEvents = _this.calendarHelper.classifyIntoMonths(events);
            // Get the IDs of events edited in offline.
            var filtered = events.filter(function (event) {
                return event.id > 0;
            });
            _this.offlineEditedEventsIds = filtered.map(function (event) {
                return event.id;
            });
        }));
        // Get events deleted in offline.
        promises.push(this.calendarOffline.getAllDeletedEventsIds().then(function (ids) {
            _this.deletedEvents = ids;
        }));
        // Get time format to use.
        promises.push(this.calendarProvider.getCalendarTimeFormat().then(function (value) {
            _this.timeFormat = value;
        }));
        return Promise.all(promises).then(function () {
            return _this.fetchEvents();
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'addon.calendar.errorloadevents', true);
        }).finally(function () {
            _this.loaded = true;
        });
    };
    /**
     * Fetch the events for current month.
     *
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonCalendarCalendarComponent.prototype.fetchEvents = function () {
        var _this = this;
        // Don't pass courseId and categoryId, we'll filter them locally.
        return this.calendarProvider.getMonthlyEvents(this.year, this.month).then(function (result) {
            // Calculate the period name. We don't use the one in result because it's in server's language.
            _this.periodName = _this.timeUtils.userDate(new Date(_this.year, _this.month - 1).getTime(), 'core.strftimemonthyear');
            _this.weekDays = _this.calendarProvider.getWeekDays(result.daynames[0].dayno);
            _this.weeks = result.weeks;
            // Merge the online events with offline data.
            _this.mergeEvents();
            // Filter events by course.
            _this.filterEvents();
        });
    };
    /**
     * Load categories to be able to filter events.
     *
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonCalendarCalendarComponent.prototype.loadCategories = function () {
        var _this = this;
        if (this.categoriesRetrieved) {
            // Already retrieved, stop.
            return Promise.resolve();
        }
        return this.coursesProvider.getCategories(0, true).then(function (cats) {
            _this.categoriesRetrieved = true;
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
     * Filter events to only display events belonging to a certain course.
     */
    AddonCalendarCalendarComponent.prototype.filterEvents = function () {
        var _this = this;
        var courseId = this.courseId ? Number(this.courseId) : undefined, categoryId = this.categoryId ? Number(this.categoryId) : undefined;
        this.weeks.forEach(function (week) {
            week.days.forEach(function (day) {
                if (!courseId || courseId < 0) {
                    day.filteredEvents = day.events;
                }
                else {
                    day.filteredEvents = day.events.filter(function (event) {
                        return _this.calendarHelper.shouldDisplayEvent(event, courseId, categoryId, _this.categories);
                    });
                }
                // Re-calculate some properties.
                _this.calendarHelper.calculateDayData(day, day.filteredEvents);
            });
        });
    };
    /**
     * Refresh events.
     *
     * @param {boolean} [sync] Whether it should try to synchronize offline events.
     * @param {boolean} [showErrors] Whether to show sync errors to the user.
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonCalendarCalendarComponent.prototype.refreshData = function (sync, showErrors) {
        var _this = this;
        var promises = [];
        promises.push(this.calendarProvider.invalidateMonthlyEvents(this.year, this.month));
        promises.push(this.coursesProvider.invalidateCategories(0, true));
        promises.push(this.calendarProvider.invalidateTimeFormat());
        this.categoriesRetrieved = false; // Get categories again.
        return Promise.all(promises).then(function () {
            return _this.fetchData(true);
        });
    };
    /**
     * Load next month.
     */
    AddonCalendarCalendarComponent.prototype.loadNext = function () {
        var _this = this;
        this.increaseMonth();
        this.loaded = false;
        this.fetchEvents().catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'addon.calendar.errorloadevents', true);
            _this.decreaseMonth();
        }).finally(function () {
            _this.calculateIsCurrentMonth();
            _this.loaded = true;
        });
    };
    /**
     * Load previous month.
     */
    AddonCalendarCalendarComponent.prototype.loadPrevious = function () {
        var _this = this;
        this.decreaseMonth();
        this.loaded = false;
        this.fetchEvents().catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'addon.calendar.errorloadevents', true);
            _this.increaseMonth();
        }).finally(function () {
            _this.calculateIsCurrentMonth();
            _this.loaded = true;
        });
    };
    /**
     * An event was clicked.
     *
     * @param {any} calendarEvent Calendar event..
     * @param {MouseEvent} event Mouse event.
     */
    AddonCalendarCalendarComponent.prototype.eventClicked = function (calendarEvent, event) {
        this.onEventClicked.emit(calendarEvent.id);
        event.stopPropagation();
    };
    /**
     * A day was clicked.
     *
     * @param {number} day Day.
     */
    AddonCalendarCalendarComponent.prototype.dayClicked = function (day) {
        this.onDayClicked.emit({ day: day, month: this.month, year: this.year });
    };
    /**
     * Check if user is viewing the current month.
     */
    AddonCalendarCalendarComponent.prototype.calculateIsCurrentMonth = function () {
        var now = new Date();
        this.isCurrentMonth = this.year == now.getFullYear() && this.month == now.getMonth() + 1;
    };
    /**
     * Go to current month.
     */
    AddonCalendarCalendarComponent.prototype.goToCurrentMonth = function () {
        var _this = this;
        var now = new Date(), initialMonth = this.month, initialYear = this.year;
        this.month = now.getMonth() + 1;
        this.year = now.getFullYear();
        this.loaded = false;
        this.fetchEvents().then(function () {
            _this.isCurrentMonth = true;
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'addon.calendar.errorloadevents', true);
            _this.year = initialYear;
            _this.month = initialMonth;
        }).finally(function () {
            _this.loaded = true;
        });
    };
    /**
     * Decrease the current month.
     */
    AddonCalendarCalendarComponent.prototype.decreaseMonth = function () {
        if (this.month === 1) {
            this.month = 12;
            this.year--;
        }
        else {
            this.month--;
        }
    };
    /**
     * Increase the current month.
     */
    AddonCalendarCalendarComponent.prototype.increaseMonth = function () {
        if (this.month === 12) {
            this.month = 1;
            this.year++;
        }
        else {
            this.month++;
        }
    };
    /**
     * Merge online events with the offline events of that period.
     */
    AddonCalendarCalendarComponent.prototype.mergeEvents = function () {
        var _this = this;
        var monthOfflineEvents = this.offlineEvents[this.calendarHelper.getMonthId(this.year, this.month)];
        this.weeks.forEach(function (week) {
            week.days.forEach(function (day) {
                // Format online events.
                day.events.forEach(_this.calendarHelper.formatEventData.bind(_this.calendarHelper));
                // Schedule notifications for the events retrieved (only future events will be scheduled).
                _this.calendarProvider.scheduleEventsNotifications(day.events);
                if (monthOfflineEvents || _this.deletedEvents.length) {
                    // There is offline data, merge it.
                    if (_this.deletedEvents.length) {
                        // Mark as deleted the events that were deleted in offline.
                        day.events.forEach(function (event) {
                            event.deleted = _this.deletedEvents.indexOf(event.id) != -1;
                        });
                    }
                    if (_this.offlineEditedEventsIds.length) {
                        // Remove the online events that were modified in offline.
                        day.events = day.events.filter(function (event) {
                            return _this.offlineEditedEventsIds.indexOf(event.id) == -1;
                        });
                    }
                    if (monthOfflineEvents && monthOfflineEvents[day.mday]) {
                        // Add the offline events (either new or edited).
                        day.events = _this.sortEvents(day.events.concat(monthOfflineEvents[day.mday]));
                    }
                }
            });
        });
    };
    /**
     * Sort events by timestart.
     *
     * @param {any[]} events List to sort.
     */
    AddonCalendarCalendarComponent.prototype.sortEvents = function (events) {
        return events.sort(function (a, b) {
            if (a.timestart == b.timestart) {
                return a.timeduration - b.timeduration;
            }
            return a.timestart - b.timestart;
        });
    };
    /**
     * Undelete a certain event.
     *
     * @param {number} eventId Event ID.
     */
    AddonCalendarCalendarComponent.prototype.undeleteEvent = function (eventId) {
        if (!this.weeks) {
            return;
        }
        this.weeks.forEach(function (week) {
            week.days.forEach(function (day) {
                var event = day.events.find(function (event) {
                    return event.id == eventId;
                });
                if (event) {
                    event.deleted = false;
                }
            });
        });
    };
    /**
     * Component destroyed.
     */
    AddonCalendarCalendarComponent.prototype.ngOnDestroy = function () {
        this.undeleteEventObserver && this.undeleteEventObserver.off();
        this.obsDefaultTimeChange && this.obsDefaultTimeChange.off();
    };
    __decorate([
        Object(core["D" /* Input */])(),
        __metadata("design:type", Object)
    ], AddonCalendarCalendarComponent.prototype, "initialYear", void 0);
    __decorate([
        Object(core["D" /* Input */])(),
        __metadata("design:type", Object)
    ], AddonCalendarCalendarComponent.prototype, "initialMonth", void 0);
    __decorate([
        Object(core["D" /* Input */])(),
        __metadata("design:type", Object)
    ], AddonCalendarCalendarComponent.prototype, "courseId", void 0);
    __decorate([
        Object(core["D" /* Input */])(),
        __metadata("design:type", Object)
    ], AddonCalendarCalendarComponent.prototype, "categoryId", void 0);
    __decorate([
        Object(core["D" /* Input */])(),
        __metadata("design:type", Object)
    ], AddonCalendarCalendarComponent.prototype, "canNavigate", void 0);
    __decorate([
        Object(core["D" /* Input */])(),
        __metadata("design:type", Object)
    ], AddonCalendarCalendarComponent.prototype, "displayNavButtons", void 0);
    __decorate([
        Object(core["O" /* Output */])(),
        __metadata("design:type", Object)
    ], AddonCalendarCalendarComponent.prototype, "onEventClicked", void 0);
    __decorate([
        Object(core["O" /* Output */])(),
        __metadata("design:type", Object)
    ], AddonCalendarCalendarComponent.prototype, "onDayClicked", void 0);
    AddonCalendarCalendarComponent = __decorate([
        Object(core["m" /* Component */])({
            selector: 'addon-calendar-calendar',
            templateUrl: 'addon-calendar-calendar.html',
        }),
        __metadata("design:paramtypes", [events["a" /* CoreEventsProvider */],
            sites["a" /* CoreSitesProvider */],
            local_notifications["a" /* CoreLocalNotificationsProvider */],
            calendar["a" /* AddonCalendarProvider */],
            helper["a" /* AddonCalendarHelperProvider */],
            calendar_offline["a" /* AddonCalendarOfflineProvider */],
            dom["a" /* CoreDomUtilsProvider */],
            time["a" /* CoreTimeUtilsProvider */],
            utils_utils["a" /* CoreUtilsProvider */],
            courses["a" /* CoreCoursesProvider */]])
    ], AddonCalendarCalendarComponent);
    return AddonCalendarCalendarComponent;
}());

//# sourceMappingURL=calendar.js.map
// EXTERNAL MODULE: ./src/core/constants.ts
var constants = __webpack_require__(39);

// CONCATENATED MODULE: ./src/addon/calendar/components/upcoming-events/upcoming-events.ts
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
var upcoming_events___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var upcoming_events___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










/**
 * Component that displays upcoming events.
 */
var upcoming_events_AddonCalendarUpcomingEventsComponent = /** @class */ (function () {
    function AddonCalendarUpcomingEventsComponent(eventsProvider, sitesProvider, localNotificationsProvider, calendarProvider, calendarHelper, calendarOffline, domUtils, coursesProvider) {
        var _this = this;
        this.calendarProvider = calendarProvider;
        this.calendarHelper = calendarHelper;
        this.calendarOffline = calendarOffline;
        this.domUtils = domUtils;
        this.coursesProvider = coursesProvider;
        this.onEventClicked = new core["v" /* EventEmitter */]();
        this.filteredEvents = [];
        this.loaded = false;
        this.categoriesRetrieved = false;
        this.categories = {};
        this.events = []; // Events (both online and offline).
        this.onlineEvents = [];
        this.offlineEvents = []; // Offline events.
        this.deletedEvents = []; // Events deleted in offline.
        this.currentSiteId = sitesProvider.getCurrentSiteId();
        if (localNotificationsProvider.isAvailable()) {
            // Re-schedule events if default time changes.
            this.obsDefaultTimeChange = eventsProvider.on(calendar["a" /* AddonCalendarProvider */].DEFAULT_NOTIFICATION_TIME_CHANGED, function () {
                calendarProvider.scheduleEventsNotifications(_this.onlineEvents);
            }, this.currentSiteId);
        }
        // Listen for events "undeleted" (offline).
        this.undeleteEventObserver = eventsProvider.on(calendar["a" /* AddonCalendarProvider */].UNDELETED_EVENT_EVENT, function (data) {
            if (data && data.eventId) {
                // Mark it as undeleted, no need to refresh.
                _this.undeleteEvent(data.eventId);
                // Remove it from the list of deleted events if it's there.
                var index = _this.deletedEvents.indexOf(data.eventId);
                if (index != -1) {
                    _this.deletedEvents.splice(index, 1);
                }
            }
        }, this.currentSiteId);
    }
    /**
     * Component loaded.
     */
    AddonCalendarUpcomingEventsComponent.prototype.ngOnInit = function () {
        this.fetchData();
    };
    /**
     * Detect changes on input properties.
     */
    AddonCalendarUpcomingEventsComponent.prototype.ngOnChanges = function (changes) {
        if (changes.courseId || changes.categoryId) {
            this.filterEvents();
        }
    };
    /**
     * Fetch data.
     *
     * @param {boolean} [refresh=false] True if we are refreshing events.
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonCalendarUpcomingEventsComponent.prototype.fetchData = function (refresh) {
        var _this = this;
        if (refresh === void 0) { refresh = false; }
        var promises = [];
        promises.push(this.loadCategories());
        // Get offline events.
        promises.push(this.calendarOffline.getAllEditedEvents().then(function (events) {
            // Format data.
            events.forEach(function (event) {
                event.offline = true;
                _this.calendarHelper.formatEventData(event);
            });
            _this.offlineEvents = _this.sortEvents(events);
        }));
        // Get events deleted in offline.
        promises.push(this.calendarOffline.getAllDeletedEventsIds().then(function (ids) {
            _this.deletedEvents = ids;
        }));
        // Get user preferences.
        promises.push(this.calendarProvider.getCalendarLookAhead().then(function (value) {
            _this.lookAhead = value;
        }));
        promises.push(this.calendarProvider.getCalendarTimeFormat().then(function (value) {
            _this.timeFormat = value;
        }));
        return Promise.all(promises).then(function () {
            return _this.fetchEvents();
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'addon.calendar.errorloadevents', true);
        }).finally(function () {
            _this.loaded = true;
        });
    };
    /**
     * Fetch upcoming events.
     *
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonCalendarUpcomingEventsComponent.prototype.fetchEvents = function () {
        var _this = this;
        // Don't pass courseId and categoryId, we'll filter them locally.
        return this.calendarProvider.getUpcomingEvents().then(function (result) {
            var promises = [];
            _this.onlineEvents = result.events;
            _this.onlineEvents.forEach(_this.calendarHelper.formatEventData.bind(_this.calendarHelper));
            // Schedule notifications for the events retrieved.
            _this.calendarProvider.scheduleEventsNotifications(_this.onlineEvents);
            // Merge the online events with offline data.
            _this.events = _this.mergeEvents();
            // Filter events by course.
            _this.filterEvents();
            // Re-calculate the formatted time so it uses the device date.
            _this.events.forEach(function (event) {
                promises.push(_this.calendarProvider.formatEventTime(event, _this.timeFormat).then(function (time) {
                    event.formattedtime = time;
                }));
            });
            return Promise.all(promises);
        });
    };
    /**
     * Load categories to be able to filter events.
     *
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonCalendarUpcomingEventsComponent.prototype.loadCategories = function () {
        var _this = this;
        if (this.categoriesRetrieved) {
            // Already retrieved, stop.
            return Promise.resolve();
        }
        return this.coursesProvider.getCategories(0, true).then(function (cats) {
            _this.categoriesRetrieved = true;
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
     * Filter events to only display events belonging to a certain course.
     */
    AddonCalendarUpcomingEventsComponent.prototype.filterEvents = function () {
        var _this = this;
        var courseId = this.courseId ? Number(this.courseId) : undefined, categoryId = this.categoryId ? Number(this.categoryId) : undefined;
        if (!courseId || courseId < 0) {
            this.filteredEvents = this.events;
        }
        else {
            this.filteredEvents = this.events.filter(function (event) {
                return _this.calendarHelper.shouldDisplayEvent(event, courseId, categoryId, _this.categories);
            });
        }
    };
    /**
     * Refresh events.
     *
     * @param {boolean} [sync] Whether it should try to synchronize offline events.
     * @param {boolean} [showErrors] Whether to show sync errors to the user.
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonCalendarUpcomingEventsComponent.prototype.refreshData = function (sync, showErrors) {
        var _this = this;
        var promises = [];
        promises.push(this.calendarProvider.invalidateAllUpcomingEvents());
        promises.push(this.coursesProvider.invalidateCategories(0, true));
        promises.push(this.calendarProvider.invalidateLookAhead());
        promises.push(this.calendarProvider.invalidateTimeFormat());
        this.categoriesRetrieved = false; // Get categories again.
        return Promise.all(promises).then(function () {
            return _this.fetchData(true);
        });
    };
    /**
     * An event was clicked.
     *
     * @param {any} event Event.
     */
    AddonCalendarUpcomingEventsComponent.prototype.eventClicked = function (event) {
        this.onEventClicked.emit(event.id);
    };
    /**
     * Merge online events with the offline events of that period.
     *
     * @return {any[]} Merged events.
     */
    AddonCalendarUpcomingEventsComponent.prototype.mergeEvents = function () {
        var _this = this;
        if (!this.offlineEvents.length && !this.deletedEvents.length) {
            // No offline events, nothing to merge.
            return this.onlineEvents;
        }
        var start = Date.now(), end = start + (constants["a" /* CoreConstants */].SECONDS_DAY * this.lookAhead);
        var result = this.onlineEvents;
        if (this.deletedEvents.length) {
            // Mark as deleted the events that were deleted in offline.
            result.forEach(function (event) {
                event.deleted = _this.deletedEvents.indexOf(event.id) != -1;
            });
        }
        if (this.offlineEvents.length) {
            // Remove the online events that were modified in offline.
            result = result.filter(function (event) {
                var offlineEvent = _this.offlineEvents.find(function (ev) {
                    return ev.id == event.id;
                });
                return !offlineEvent;
            });
        }
        // Now get the offline events that belong to this period.
        var periodOfflineEvents = this.offlineEvents.filter(function (event) {
            return (event.timestart >= start || event.timestart + event.timeduration >= start) && event.timestart <= end;
        });
        // Merge both arrays and sort them.
        result = result.concat(periodOfflineEvents);
        return this.sortEvents(result);
    };
    /**
     * Sort events by timestart.
     *
     * @param {any[]} events List to sort.
     */
    AddonCalendarUpcomingEventsComponent.prototype.sortEvents = function (events) {
        return events.sort(function (a, b) {
            if (a.timestart == b.timestart) {
                return a.timeduration - b.timeduration;
            }
            return a.timestart - b.timestart;
        });
    };
    /**
     * Undelete a certain event.
     *
     * @param {number} eventId Event ID.
     */
    AddonCalendarUpcomingEventsComponent.prototype.undeleteEvent = function (eventId) {
        var event = this.onlineEvents.find(function (event) {
            return event.id == eventId;
        });
        if (event) {
            event.deleted = false;
        }
    };
    /**
     * Component destroyed.
     */
    AddonCalendarUpcomingEventsComponent.prototype.ngOnDestroy = function () {
        this.undeleteEventObserver && this.undeleteEventObserver.off();
        this.obsDefaultTimeChange && this.obsDefaultTimeChange.off();
    };
    upcoming_events___decorate([
        Object(core["D" /* Input */])(),
        upcoming_events___metadata("design:type", Object)
    ], AddonCalendarUpcomingEventsComponent.prototype, "courseId", void 0);
    upcoming_events___decorate([
        Object(core["D" /* Input */])(),
        upcoming_events___metadata("design:type", Object)
    ], AddonCalendarUpcomingEventsComponent.prototype, "categoryId", void 0);
    upcoming_events___decorate([
        Object(core["O" /* Output */])(),
        upcoming_events___metadata("design:type", Object)
    ], AddonCalendarUpcomingEventsComponent.prototype, "onEventClicked", void 0);
    AddonCalendarUpcomingEventsComponent = upcoming_events___decorate([
        Object(core["m" /* Component */])({
            selector: 'addon-calendar-upcoming-events',
            templateUrl: 'addon-calendar-upcoming-events.html',
        }),
        upcoming_events___metadata("design:paramtypes", [events["a" /* CoreEventsProvider */],
            sites["a" /* CoreSitesProvider */],
            local_notifications["a" /* CoreLocalNotificationsProvider */],
            calendar["a" /* AddonCalendarProvider */],
            helper["a" /* AddonCalendarHelperProvider */],
            calendar_offline["a" /* AddonCalendarOfflineProvider */],
            dom["a" /* CoreDomUtilsProvider */],
            courses["a" /* CoreCoursesProvider */]])
    ], AddonCalendarUpcomingEventsComponent);
    return AddonCalendarUpcomingEventsComponent;
}());

//# sourceMappingURL=upcoming-events.js.map
// CONCATENATED MODULE: ./src/addon/calendar/components/components.module.ts
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









var components_module_AddonCalendarComponentsModule = /** @class */ (function () {
    function AddonCalendarComponentsModule() {
    }
    AddonCalendarComponentsModule = components_module___decorate([
        Object(core["I" /* NgModule */])({
            declarations: [
                calendar_AddonCalendarCalendarComponent,
                upcoming_events_AddonCalendarUpcomingEventsComponent
            ],
            imports: [
                common["b" /* CommonModule */],
                ionic_angular["k" /* IonicModule */],
                _ngx_translate_core["b" /* TranslateModule */].forChild(),
                components_module["a" /* CoreComponentsModule */],
                directives_module["a" /* CoreDirectivesModule */],
                pipes_module["a" /* CorePipesModule */]
            ],
            providers: [],
            exports: [
                calendar_AddonCalendarCalendarComponent,
                upcoming_events_AddonCalendarUpcomingEventsComponent
            ]
        })
    ], AddonCalendarComponentsModule);
    return AddonCalendarComponentsModule;
}());

//# sourceMappingURL=components.module.js.map
// EXTERNAL MODULE: ./src/providers/app.ts
var app = __webpack_require__(9);

// EXTERNAL MODULE: ./src/addon/calendar/providers/calendar-sync.ts
var calendar_sync = __webpack_require__(473);

// EXTERNAL MODULE: ./src/core/courses/providers/helper.ts
var providers_helper = __webpack_require__(183);

// EXTERNAL MODULE: ./node_modules/@ionic-native/network/index.js
var _ionic_native_network = __webpack_require__(210);

// CONCATENATED MODULE: ./src/addon/calendar/pages/index/index.ts
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
// WITHOUT WARRANTIES OR CONDITIONS OFx ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
var index___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var index___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};















/**
 * Page that displays the calendar events.
 */
var index_AddonCalendarIndexPage = /** @class */ (function () {
    function AddonCalendarIndexPage(localNotificationsProvider, navParams, network, zone, sitesProvider, navCtrl, domUtils, calendarProvider, calendarOffline, calendarHelper, calendarSync, eventsProvider, coursesHelper, appProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.domUtils = domUtils;
        this.calendarProvider = calendarProvider;
        this.calendarOffline = calendarOffline;
        this.calendarHelper = calendarHelper;
        this.calendarSync = calendarSync;
        this.eventsProvider = eventsProvider;
        this.coursesHelper = coursesHelper;
        this.appProvider = appProvider;
        this.canCreate = false;
        this.notificationsEnabled = false;
        this.loaded = false;
        this.hasOffline = false;
        this.isOnline = false;
        this.showCalendar = true;
        this.loadUpcoming = false;
        this.courseId = navParams.get('courseId');
        this.eventId = navParams.get('eventId') || false;
        this.year = navParams.get('year');
        this.month = navParams.get('month');
        this.notificationsEnabled = localNotificationsProvider.isAvailable();
        this.currentSiteId = sitesProvider.getCurrentSiteId();
        this.loadUpcoming = !!navParams.get('upcoming');
        this.showCalendar = !this.loadUpcoming;
        // Listen for events added. When an event is added, reload the data.
        this.newEventObserver = eventsProvider.on(calendar["a" /* AddonCalendarProvider */].NEW_EVENT_EVENT, function (data) {
            if (data && data.event) {
                _this.loaded = false;
                _this.refreshData(true, false);
            }
        }, this.currentSiteId);
        // Listen for new event discarded event. When it does, reload the data.
        this.discardedObserver = eventsProvider.on(calendar["a" /* AddonCalendarProvider */].NEW_EVENT_DISCARDED_EVENT, function () {
            _this.loaded = false;
            _this.refreshData(true, false);
        }, this.currentSiteId);
        // Listen for events edited. When an event is edited, reload the data.
        this.editEventObserver = eventsProvider.on(calendar["a" /* AddonCalendarProvider */].EDIT_EVENT_EVENT, function (data) {
            if (data && data.event) {
                _this.loaded = false;
                _this.refreshData(true, false);
            }
        }, this.currentSiteId);
        // Refresh data if calendar events are synchronized automatically.
        this.syncObserver = eventsProvider.on(calendar_sync["a" /* AddonCalendarSyncProvider */].AUTO_SYNCED, function (data) {
            _this.loaded = false;
            _this.refreshData();
        }, this.currentSiteId);
        // Refresh data if calendar events are synchronized manually but not by this page.
        this.manualSyncObserver = eventsProvider.on(calendar_sync["a" /* AddonCalendarSyncProvider */].MANUAL_SYNCED, function (data) {
            if (data && data.source != 'index') {
                _this.loaded = false;
                _this.refreshData();
            }
        }, this.currentSiteId);
        // Update the events when an event is deleted.
        this.deleteEventObserver = eventsProvider.on(calendar["a" /* AddonCalendarProvider */].DELETED_EVENT_EVENT, function (data) {
            _this.loaded = false;
            _this.refreshData();
        }, this.currentSiteId);
        // Update the "hasOffline" property if an event deleted in offline is restored.
        this.undeleteEventObserver = eventsProvider.on(calendar["a" /* AddonCalendarProvider */].UNDELETED_EVENT_EVENT, function (data) {
            _this.calendarOffline.hasOfflineData().then(function (hasOffline) {
                _this.hasOffline = hasOffline;
            });
        }, this.currentSiteId);
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
    AddonCalendarIndexPage.prototype.ngOnInit = function () {
        if (this.eventId) {
            // There is an event to load, open the event in a new state.
            this.gotoEvent(this.eventId);
        }
        this.fetchData(true, false);
    };
    /**
     * Fetch all the data required for the view.
     *
     * @param {boolean} [sync] Whether it should try to synchronize offline events.
     * @param {boolean} [showErrors] Whether to show sync errors to the user.
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonCalendarIndexPage.prototype.fetchData = function (sync, showErrors) {
        var _this = this;
        this.syncIcon = 'spinner';
        this.isOnline = this.appProvider.isOnline();
        var promise;
        if (sync) {
            // Try to synchronize offline events.
            promise = this.calendarSync.syncEvents().then(function (result) {
                if (result.warnings && result.warnings.length) {
                    _this.domUtils.showErrorModal(result.warnings[0]);
                }
                if (result.updated) {
                    // Trigger a manual sync event.
                    result.source = 'index';
                    _this.eventsProvider.trigger(calendar_sync["a" /* AddonCalendarSyncProvider */].MANUAL_SYNCED, result, _this.currentSiteId);
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
            var promises = [];
            _this.hasOffline = false;
            // Load courses for the popover.
            promises.push(_this.coursesHelper.getCoursesForPopover(_this.courseId).then(function (data) {
                _this.courses = data.courses;
                _this.categoryId = data.categoryId;
            }));
            // Check if user can create events.
            promises.push(_this.calendarHelper.canEditEvents(_this.courseId).then(function (canEdit) {
                _this.canCreate = canEdit;
            }));
            // Check if there is offline data.
            promises.push(_this.calendarOffline.hasOfflineData().then(function (hasOffline) {
                _this.hasOffline = hasOffline;
            }));
            return Promise.all(promises);
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'addon.calendar.errorloadevents', true);
        }).finally(function () {
            _this.loaded = true;
            _this.syncIcon = 'sync';
        });
    };
    /**
     * Refresh the data.
     *
     * @param {any} [refresher] Refresher.
     * @param {Function} [done] Function to call when done.
     * @param {boolean} [showErrors] Whether to show sync errors to the user.
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonCalendarIndexPage.prototype.doRefresh = function (refresher, done, showErrors) {
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
     * @param {boolean} [sync] Whether it should try to synchronize offline events.
     * @param {boolean} [showErrors] Whether to show sync errors to the user.
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonCalendarIndexPage.prototype.refreshData = function (sync, showErrors) {
        var _this = this;
        this.syncIcon = 'spinner';
        var promises = [];
        promises.push(this.calendarProvider.invalidateAllowedEventTypes());
        // Refresh the sub-component.
        if (this.showCalendar && this.calendarComponent) {
            promises.push(this.calendarComponent.refreshData());
        }
        else if (!this.showCalendar && this.upcomingEventsComponent) {
            promises.push(this.upcomingEventsComponent.refreshData());
        }
        return Promise.all(promises).finally(function () {
            return _this.fetchData(sync, showErrors);
        });
    };
    /**
     * Navigate to a particular event.
     *
     * @param {number} eventId Event to load.
     */
    AddonCalendarIndexPage.prototype.gotoEvent = function (eventId) {
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
     * View a certain day.
     *
     * @param {any} data Data with the year, month and day.
     */
    AddonCalendarIndexPage.prototype.gotoDay = function (data) {
        var params = {
            day: data.day,
            month: data.month,
            year: data.year
        };
        if (this.courseId) {
            params.courseId = this.courseId;
        }
        this.navCtrl.push('AddonCalendarDayPage', params);
    };
    /**
     * Show the context menu.
     *
     * @param {MouseEvent} event Event.
     */
    AddonCalendarIndexPage.prototype.openCourseFilter = function (event) {
        var _this = this;
        this.coursesHelper.selectCourse(event, this.courses, this.courseId).then(function (result) {
            if (typeof result.courseId != 'undefined') {
                _this.courseId = result.courseId > 0 ? result.courseId : undefined;
                _this.categoryId = result.courseId > 0 ? result.categoryId : undefined;
                // Course viewed has changed, check if the user can create events for this course calendar.
                _this.calendarHelper.canEditEvents(_this.courseId).then(function (canEdit) {
                    _this.canCreate = canEdit;
                });
            }
        });
    };
    /**
     * Open page to create/edit an event.
     *
     * @param {number} [eventId] Event ID to edit.
     */
    AddonCalendarIndexPage.prototype.openEdit = function (eventId) {
        var params = {};
        if (eventId) {
            params.eventId = eventId;
        }
        if (this.courseId) {
            params.courseId = this.courseId;
        }
        this.navCtrl.push('AddonCalendarEditEventPage', params);
    };
    /**
     * Open calendar events settings.
     */
    AddonCalendarIndexPage.prototype.openSettings = function () {
        this.navCtrl.push('AddonCalendarSettingsPage');
    };
    /**
     * Toogle display: monthly view or upcoming events.
     */
    AddonCalendarIndexPage.prototype.toggleDisplay = function () {
        this.showCalendar = !this.showCalendar;
        if (!this.showCalendar) {
            this.loadUpcoming = true;
        }
    };
    /**
     * Page destroyed.
     */
    AddonCalendarIndexPage.prototype.ngOnDestroy = function () {
        this.newEventObserver && this.newEventObserver.off();
        this.discardedObserver && this.discardedObserver.off();
        this.editEventObserver && this.editEventObserver.off();
        this.deleteEventObserver && this.deleteEventObserver.off();
        this.undeleteEventObserver && this.undeleteEventObserver.off();
        this.syncObserver && this.syncObserver.off();
        this.manualSyncObserver && this.manualSyncObserver.off();
        this.onlineObserver && this.onlineObserver.unsubscribe();
    };
    index___decorate([
        Object(core["_9" /* ViewChild */])(calendar_AddonCalendarCalendarComponent),
        index___metadata("design:type", calendar_AddonCalendarCalendarComponent)
    ], AddonCalendarIndexPage.prototype, "calendarComponent", void 0);
    index___decorate([
        Object(core["_9" /* ViewChild */])(upcoming_events_AddonCalendarUpcomingEventsComponent),
        index___metadata("design:type", upcoming_events_AddonCalendarUpcomingEventsComponent)
    ], AddonCalendarIndexPage.prototype, "upcomingEventsComponent", void 0);
    AddonCalendarIndexPage = index___decorate([
        Object(core["m" /* Component */])({
            selector: 'page-addon-calendar-index',
            templateUrl: 'index.html',
        }),
        index___metadata("design:paramtypes", [local_notifications["a" /* CoreLocalNotificationsProvider */],
            ionic_angular["t" /* NavParams */],
            _ionic_native_network["a" /* Network */],
            core["M" /* NgZone */],
            sites["a" /* CoreSitesProvider */],
            ionic_angular["s" /* NavController */],
            dom["a" /* CoreDomUtilsProvider */],
            calendar["a" /* AddonCalendarProvider */],
            calendar_offline["a" /* AddonCalendarOfflineProvider */],
            helper["a" /* AddonCalendarHelperProvider */],
            calendar_sync["a" /* AddonCalendarSyncProvider */],
            events["a" /* CoreEventsProvider */],
            providers_helper["a" /* CoreCoursesHelperProvider */],
            app["a" /* CoreAppProvider */]])
    ], AddonCalendarIndexPage);
    return AddonCalendarIndexPage;
}());

//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: ./src/addon/calendar/pages/index/index.module.ts
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
var index_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var index_module_AddonCalendarIndexPageModule = /** @class */ (function () {
    function AddonCalendarIndexPageModule() {
    }
    AddonCalendarIndexPageModule = index_module___decorate([
        Object(core["I" /* NgModule */])({
            declarations: [
                index_AddonCalendarIndexPage,
            ],
            imports: [
                components_module["a" /* CoreComponentsModule */],
                directives_module["a" /* CoreDirectivesModule */],
                pipes_module["a" /* CorePipesModule */],
                components_module_AddonCalendarComponentsModule,
                ionic_angular["l" /* IonicPageModule */].forChild(index_AddonCalendarIndexPage),
                _ngx_translate_core["b" /* TranslateModule */].forChild()
            ],
        })
    ], AddonCalendarIndexPageModule);
    return AddonCalendarIndexPageModule;
}());

//# sourceMappingURL=index.module.js.map
// EXTERNAL MODULE: ./node_modules/ionic-angular/components/action-sheet/action-sheet-component.ngfactory.js
var action_sheet_component_ngfactory = __webpack_require__(1468);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/alert/alert-component.ngfactory.js
var alert_component_ngfactory = __webpack_require__(1469);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/app/app-root.ngfactory.js
var app_root_ngfactory = __webpack_require__(1470);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/loading/loading-component.ngfactory.js
var loading_component_ngfactory = __webpack_require__(1471);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/modal/modal-component.ngfactory.js
var modal_component_ngfactory = __webpack_require__(1472);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/picker/picker-component.ngfactory.js + 1 modules
var picker_component_ngfactory = __webpack_require__(1473);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/popover/popover-component.ngfactory.js
var popover_component_ngfactory = __webpack_require__(1474);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/select/select-popover-component.ngfactory.js
var select_popover_component_ngfactory = __webpack_require__(1475);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toast/toast-component.ngfactory.js
var toast_component_ngfactory = __webpack_require__(1476);

// EXTERNAL MODULE: ./src/components/context-menu/context-menu-popover.ngfactory.js
var context_menu_popover_ngfactory = __webpack_require__(1479);

// EXTERNAL MODULE: ./src/components/course-picker-menu/course-picker-menu-popover.ngfactory.js
var course_picker_menu_popover_ngfactory = __webpack_require__(1480);

// EXTERNAL MODULE: ./src/components/recaptcha/recaptchamodal.ngfactory.js
var recaptchamodal_ngfactory = __webpack_require__(1481);

// EXTERNAL MODULE: ./src/components/bs-tooltip/bs-tooltip.ngfactory.js
var bs_tooltip_ngfactory = __webpack_require__(1482);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.ngfactory.js
var button_ngfactory = __webpack_require__(45);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.js
var button_button = __webpack_require__(42);

// EXTERNAL MODULE: ./node_modules/ionic-angular/config/config.js
var config = __webpack_require__(7);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.pipe.js
var translate_pipe = __webpack_require__(28);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.service.js
var translate_service = __webpack_require__(18);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/icon/icon.js
var icon = __webpack_require__(46);

// EXTERNAL MODULE: ./src/components/icon/icon.ngfactory.js
var icon_ngfactory = __webpack_require__(111);

// EXTERNAL MODULE: ./src/components/icon/icon.ts
var icon_icon = __webpack_require__(94);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/card/card.js
var card = __webpack_require__(83);

// EXTERNAL MODULE: ./src/components/empty-box/empty-box.ngfactory.js
var empty_box_ngfactory = __webpack_require__(121);

// EXTERNAL MODULE: ./src/components/empty-box/empty-box.ts
var empty_box = __webpack_require__(110);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/note/note.js
var note = __webpack_require__(222);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item.ngfactory.js + 1 modules
var item_ngfactory = __webpack_require__(30);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item.js
var item = __webpack_require__(21);

// EXTERNAL MODULE: ./node_modules/ionic-angular/util/form.js
var util_form = __webpack_require__(20);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-reorder.js + 1 modules
var item_reorder = __webpack_require__(27);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-content.js
var item_content = __webpack_require__(32);

// EXTERNAL MODULE: ./src/directives/format-text.ts
var format_text = __webpack_require__(41);

// EXTERNAL MODULE: ./src/providers/utils/text.ts
var utils_text = __webpack_require__(10);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/platform.js + 1 modules
var platform = __webpack_require__(16);

// EXTERNAL MODULE: ./src/providers/utils/url.ts
var url = __webpack_require__(23);

// EXTERNAL MODULE: ./src/providers/logger.ts
var logger = __webpack_require__(5);

// EXTERNAL MODULE: ./src/providers/filepool.ts
var filepool = __webpack_require__(17);

// EXTERNAL MODULE: ./src/core/contentlinks/providers/helper.ts
var contentlinks_providers_helper = __webpack_require__(14);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-controller.js
var nav_controller = __webpack_require__(19);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.js
var content = __webpack_require__(25);

// EXTERNAL MODULE: ./src/components/split-view/split-view.ts
var split_view = __webpack_require__(26);

// EXTERNAL MODULE: ./src/providers/utils/iframe.ts
var iframe = __webpack_require__(37);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/list/list.js + 1 modules
var list = __webpack_require__(82);

// EXTERNAL MODULE: ./node_modules/ionic-angular/gestures/gesture-controller.js
var gesture_controller = __webpack_require__(40);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/dom-controller.js
var dom_controller = __webpack_require__(33);

// EXTERNAL MODULE: ./src/components/loading/loading.ngfactory.js
var loading_ngfactory = __webpack_require__(50);

// EXTERNAL MODULE: ./src/components/loading/loading.ts
var loading = __webpack_require__(47);

// CONCATENATED MODULE: ./src/addon/calendar/components/upcoming-events/upcoming-events.ngfactory.js
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 











































var styles_AddonCalendarUpcomingEventsComponent = [];
var RenderType_AddonCalendarUpcomingEventsComponent = core["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_AddonCalendarUpcomingEventsComponent, data: {} });

function View_AddonCalendarUpcomingEventsComponent_1(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 3, "core-empty-box", [["icon", "calendar"]], null, null, null, empty_box_ngfactory["b" /* View_CoreEmptyBoxComponent_0 */], empty_box_ngfactory["a" /* RenderType_CoreEmptyBoxComponent */])), core["_30" /* ɵdid */](1, 49152, null, 0, empty_box["a" /* CoreEmptyBoxComponent */], [], { message: [0, "message"], icon: [1, "icon"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n    "]))], function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 1, 0, core["_44" /* ɵnov */](_v, 2).transform("addon.calendar.noevents")); var currVal_1 = "calendar"; _ck(_v, 1, 0, currVal_0, currVal_1); }, null); }
function View_AddonCalendarUpcomingEventsComponent_4(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 0, "img", [["class", "core-module-icon"], ["item-start", ""]], [[8, "src", 4]], null, null, null, null))], null, function (_ck, _v) { var currVal_0 = core["_34" /* ɵinlineInterpolate */](1, "", _v.parent.context.$implicit.moduleIcon, ""); _ck(_v, 0, 0, currVal_0); }); }
function View_AddonCalendarUpcomingEventsComponent_5(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "core-icon", [["item-start", ""]], null, null, null, icon_ngfactory["b" /* View_CoreIconComponent_0 */], icon_ngfactory["a" /* RenderType_CoreIconComponent */])), core["_30" /* ɵdid */](1, 704512, null, 0, icon_icon["a" /* CoreIconComponent */], [core["t" /* ElementRef */], config["a" /* Config */]], { name: [0, "name"] }, null)], function (_ck, _v) { var currVal_0 = _v.parent.context.$implicit.icon; _ck(_v, 1, 0, currVal_0); }, null); }
function View_AddonCalendarUpcomingEventsComponent_6(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 9, "ion-note", [["item-end", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, note["a" /* Note */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 1, "ion-icon", [["name", "time"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](4, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](6, 0, null, null, 2, "span", [["text-wrap", ""]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](7, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "]))], function (_ck, _v) { var currVal_1 = "time"; _ck(_v, 4, 0, currVal_1); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 4)._hidden; _ck(_v, 3, 0, currVal_0); var currVal_2 = core["_56" /* ɵunv */](_v, 7, 0, core["_44" /* ɵnov */](_v, 8).transform("core.notsent")); _ck(_v, 7, 0, currVal_2); }); }
function View_AddonCalendarUpcomingEventsComponent_7(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 9, "ion-note", [["item-end", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, note["a" /* Note */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 1, "ion-icon", [["name", "trash"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](4, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](6, 0, null, null, 2, "span", [["text-wrap", ""]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](7, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "]))], function (_ck, _v) { var currVal_1 = "trash"; _ck(_v, 4, 0, currVal_1); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 4)._hidden; _ck(_v, 3, 0, currVal_0); var currVal_2 = core["_56" /* ɵunv */](_v, 7, 0, core["_44" /* ɵnov */](_v, 8).transform("core.deletedoffline")); _ck(_v, 7, 0, currVal_2); }); }
function View_AddonCalendarUpcomingEventsComponent_3(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 29, null, null, null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](2, 0, null, null, 26, "a", [["class", "item item-block"], ["ion-item", ""], ["text-wrap", ""]], [[8, "title", 0], [2, "core-split-item-selected", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.eventClicked(_v.context.$implicit) !== false);
        ad = (pd_0 && ad);
    } return ad; }, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](3, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 1, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 2, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 3, { _icons: 1 }), core["_30" /* ɵdid */](7, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonCalendarUpcomingEventsComponent_4)), core["_30" /* ɵdid */](10, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonCalendarUpcomingEventsComponent_5)), core["_30" /* ɵdid */](13, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](15, 0, null, 2, 2, "h2", [], null, null, null, null, null)), (_l()(), core["_31" /* ɵeld */](16, 0, null, null, 1, "core-format-text", [], null, null, null, null, null)), core["_30" /* ɵdid */](17, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform["a" /* Platform */], utils_utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], app["a" /* CoreAppProvider */], contentlinks_providers_helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */]], { text: [0, "text"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](19, 0, null, 2, 2, "p", [], null, null, null, null, null)), (_l()(), core["_31" /* ɵeld */](20, 0, null, null, 1, "core-format-text", [], null, null, null, null, null)), core["_30" /* ɵdid */](21, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform["a" /* Platform */], utils_utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], app["a" /* CoreAppProvider */], contentlinks_providers_helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */]], { text: [0, "text"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, 4, 1, null, View_AddonCalendarUpcomingEventsComponent_6)), core["_30" /* ɵdid */](24, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, 4, 1, null, View_AddonCalendarUpcomingEventsComponent_7)), core["_30" /* ɵdid */](27, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "]))], function (_ck, _v) { var currVal_2 = _v.context.$implicit.moduleIcon; _ck(_v, 10, 0, currVal_2); var currVal_3 = (_v.context.$implicit.icon && !_v.context.$implicit.moduleIcon); _ck(_v, 13, 0, currVal_3); var currVal_4 = _v.context.$implicit.name; _ck(_v, 17, 0, currVal_4); var currVal_5 = _v.context.$implicit.formattedtime; _ck(_v, 21, 0, currVal_5); var currVal_6 = (_v.context.$implicit.offline && !_v.context.$implicit.deleted); _ck(_v, 24, 0, currVal_6); var currVal_7 = _v.context.$implicit.deleted; _ck(_v, 27, 0, currVal_7); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = _v.context.$implicit.name; var currVal_1 = (_v.context.$implicit.id == _co.eventId); _ck(_v, 2, 0, currVal_0, currVal_1); }); }
function View_AddonCalendarUpcomingEventsComponent_2(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 5, "ion-list", [["no-margin", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, list["a" /* List */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], platform["a" /* Platform */], gesture_controller["l" /* GestureController */], dom_controller["a" /* DomController */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonCalendarUpcomingEventsComponent_3)), core["_30" /* ɵdid */](4, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.filteredEvents; _ck(_v, 4, 0, currVal_0); }, null); }
function View_AddonCalendarUpcomingEventsComponent_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 8, "core-loading", [["class", "core-loading-center"]], null, null, null, loading_ngfactory["b" /* View_CoreLoadingComponent_0 */], loading_ngfactory["a" /* RenderType_CoreLoadingComponent */])), core["_30" /* ɵdid */](1, 638976, null, 0, loading["a" /* CoreLoadingComponent */], [translate_service["a" /* TranslateService */], core["t" /* ElementRef */], events["a" /* CoreEventsProvider */], utils_utils["a" /* CoreUtilsProvider */]], { hideUntil: [0, "hideUntil"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n    "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonCalendarUpcomingEventsComponent_1)), core["_30" /* ɵdid */](4, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n\n    "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonCalendarUpcomingEventsComponent_2)), core["_30" /* ɵdid */](7, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.loaded; _ck(_v, 1, 0, currVal_0); var currVal_1 = (!_co.filteredEvents || !_co.filteredEvents.length); _ck(_v, 4, 0, currVal_1); var currVal_2 = (_co.filteredEvents && _co.filteredEvents.length); _ck(_v, 7, 0, currVal_2); }, null); }
function View_AddonCalendarUpcomingEventsComponent_Host_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "addon-calendar-upcoming-events", [], null, null, null, View_AddonCalendarUpcomingEventsComponent_0, RenderType_AddonCalendarUpcomingEventsComponent)), core["_30" /* ɵdid */](1, 770048, null, 0, upcoming_events_AddonCalendarUpcomingEventsComponent, [events["a" /* CoreEventsProvider */], sites["a" /* CoreSitesProvider */], local_notifications["a" /* CoreLocalNotificationsProvider */], calendar["a" /* AddonCalendarProvider */], helper["a" /* AddonCalendarHelperProvider */], calendar_offline["a" /* AddonCalendarOfflineProvider */], dom["a" /* CoreDomUtilsProvider */], courses["a" /* CoreCoursesProvider */]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var AddonCalendarUpcomingEventsComponentNgFactory = core["_27" /* ɵccf */]("addon-calendar-upcoming-events", upcoming_events_AddonCalendarUpcomingEventsComponent, View_AddonCalendarUpcomingEventsComponent_Host_0, { courseId: "courseId", categoryId: "categoryId" }, { onEventClicked: "onEventClicked" }, []);

//# sourceMappingURL=upcoming-events.ngfactory.js.map
// EXTERNAL MODULE: ./node_modules/ionic-angular/components/fab/fab-container.ngfactory.js
var fab_container_ngfactory = __webpack_require__(312);

// EXTERNAL MODULE: ./src/directives/fab.ts
var fab = __webpack_require__(275);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/fab/fab-container.js
var fab_container = __webpack_require__(225);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/fab/fab.ngfactory.js
var fab_ngfactory = __webpack_require__(313);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/fab/fab.js
var fab_fab = __webpack_require__(198);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-header.js
var toolbar_header = __webpack_require__(468);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/view-controller.js
var view_controller = __webpack_require__(38);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/navbar.ngfactory.js
var navbar_ngfactory = __webpack_require__(1477);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/navbar.js
var navbar = __webpack_require__(221);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/app/app.js + 3 modules
var app_app = __webpack_require__(34);

// EXTERNAL MODULE: ./src/directives/back-button.ts
var back_button = __webpack_require__(711);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.ngfactory.js
var toolbar_title_ngfactory = __webpack_require__(1478);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.js
var toolbar_title = __webpack_require__(364);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar.js
var toolbar = __webpack_require__(267);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-item.js
var toolbar_item = __webpack_require__(469);

// EXTERNAL MODULE: ./src/components/context-menu/context-menu.ngfactory.js
var context_menu_ngfactory = __webpack_require__(85);

// EXTERNAL MODULE: ./src/components/context-menu/context-menu.ts
var context_menu = __webpack_require__(74);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/popover/popover-controller.js
var popover_controller = __webpack_require__(65);

// EXTERNAL MODULE: ./src/components/tabs/tab.ts
var tab = __webpack_require__(72);

// EXTERNAL MODULE: ./src/components/context-menu/context-menu-item.ngfactory.js
var context_menu_item_ngfactory = __webpack_require__(86);

// EXTERNAL MODULE: ./src/components/context-menu/context-menu-item.ts
var context_menu_item = __webpack_require__(78);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.ngfactory.js
var content_ngfactory = __webpack_require__(176);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/keyboard.js
var keyboard = __webpack_require__(101);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/refresher/refresher.js
var refresher = __webpack_require__(151);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/refresher/refresher-content.ngfactory.js
var refresher_content_ngfactory = __webpack_require__(207);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/refresher/refresher-content.js
var refresher_content = __webpack_require__(166);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/grid/col.js
var col = __webpack_require__(118);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/grid/row.js
var row = __webpack_require__(117);

// EXTERNAL MODULE: ./src/pipes/format-date.ts
var format_date = __webpack_require__(244);

// EXTERNAL MODULE: ./src/components/navbar-buttons/navbar-buttons.ngfactory.js
var navbar_buttons_ngfactory = __webpack_require__(95);

// EXTERNAL MODULE: ./src/components/navbar-buttons/navbar-buttons.ts
var navbar_buttons = __webpack_require__(87);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/grid/grid.js
var grid = __webpack_require__(156);

// CONCATENATED MODULE: ./src/addon/calendar/components/calendar/calendar.ngfactory.js
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 






























var styles_AddonCalendarCalendarComponent = [];
var RenderType_AddonCalendarCalendarComponent = core["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_AddonCalendarCalendarComponent, data: {} });

function View_AddonCalendarCalendarComponent_1(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 10, "ion-col", [["class", "col"], ["text-start", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, col["a" /* Col */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 6, "a", [["clear", ""], ["icon-only", ""], ["ion-button", ""]], [[8, "title", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.loadPrevious() !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](4, 1097728, null, 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { clear: [0, "clear"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 0, 1, "ion-icon", [["md", "ios-arrow-back"], ["name", "arrow-back"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](8, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"], md: [1, "md"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "]))], function (_ck, _v) { var currVal_1 = ""; _ck(_v, 4, 0, currVal_1); var currVal_3 = "arrow-back"; var currVal_4 = "ios-arrow-back"; _ck(_v, 8, 0, currVal_3, currVal_4); }, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 3, 0, core["_44" /* ɵnov */](_v, 5).transform("core.previous")); _ck(_v, 3, 0, currVal_0); var currVal_2 = core["_44" /* ɵnov */](_v, 8)._hidden; _ck(_v, 7, 0, currVal_2); }); }
function View_AddonCalendarCalendarComponent_2(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 10, "ion-col", [["class", "col"], ["text-end", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, col["a" /* Col */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 6, "a", [["clear", ""], ["icon-only", ""], ["ion-button", ""]], [[8, "title", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.loadNext() !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](4, 1097728, null, 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { clear: [0, "clear"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 0, 1, "ion-icon", [["md", "ios-arrow-forward"], ["name", "arrow-forward"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](8, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"], md: [1, "md"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "]))], function (_ck, _v) { var currVal_1 = ""; _ck(_v, 4, 0, currVal_1); var currVal_3 = "arrow-forward"; var currVal_4 = "ios-arrow-forward"; _ck(_v, 8, 0, currVal_3, currVal_4); }, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 3, 0, core["_44" /* ɵnov */](_v, 5).transform("core.next")); _ck(_v, 3, 0, currVal_0); var currVal_2 = core["_44" /* ɵnov */](_v, 8)._hidden; _ck(_v, 7, 0, currVal_2); }); }
function View_AddonCalendarCalendarComponent_3(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 3, "ion-col", [["class", "addon-calendar-weekday col"], ["text-center", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, col["a" /* Col */], [], null, null), (_l()(), core["_55" /* ɵted */](2, null, ["\n                ", "\n            "])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], null, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 2, 0, core["_44" /* ɵnov */](_v, 3).transform(_v.context.$implicit.shortname)); _ck(_v, 2, 0, currVal_0); }); }
function View_AddonCalendarCalendarComponent_5(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "ion-col", [["class", "dayblank addon-calendar-day col"]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, col["a" /* Col */], [], null, null)], null, null); }
function View_AddonCalendarCalendarComponent_7(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 0, "span", [], [[8, "className", 0]], null, null, null, null))], null, function (_ck, _v) { var currVal_0 = core["_34" /* ɵinlineInterpolate */](1, "calendar_event_type calendar_event_", _v.context.$implicit, ""); _ck(_v, 0, 0, currVal_0); }); }
function View_AddonCalendarCalendarComponent_10(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "ion-icon", [["name", "time"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](1, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null)], function (_ck, _v) { var currVal_1 = "time"; _ck(_v, 1, 0, currVal_1); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 1)._hidden; _ck(_v, 0, 0, currVal_0); }); }
function View_AddonCalendarCalendarComponent_11(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "ion-icon", [["name", "trash"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](1, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null)], function (_ck, _v) { var currVal_1 = "trash"; _ck(_v, 1, 0, currVal_1); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 1)._hidden; _ck(_v, 0, 0, currVal_0); }); }
function View_AddonCalendarCalendarComponent_12(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 0, "img", [["alt", ""], ["class", "core-module-icon"], ["role", "presentation"]], [[8, "src", 4]], null, null, null, null))], null, function (_ck, _v) { var currVal_0 = core["_34" /* ɵinlineInterpolate */](1, "", _v.parent.parent.context.$implicit.moduleIcon, ""); _ck(_v, 0, 0, currVal_0); }); }
function View_AddonCalendarCalendarComponent_9(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 19, "p", [["class", "addon-calendar-event"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.eventClicked(_v.parent.context.$implicit, $event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                            "])), (_l()(), core["_31" /* ɵeld */](2, 0, null, null, 0, "span", [], [[8, "className", 0]], null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonCalendarCalendarComponent_10)), core["_30" /* ɵdid */](5, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonCalendarCalendarComponent_11)), core["_30" /* ɵdid */](8, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonCalendarCalendarComponent_12)), core["_30" /* ɵdid */](11, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                            "])), (_l()(), core["_31" /* ɵeld */](13, 0, null, null, 2, "span", [["class", "addon-calendar-event-time"]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](14, null, ["", ""])), core["_49" /* ɵppd */](15, 2), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                            "])), (_l()(), core["_31" /* ɵeld */](17, 0, null, null, 1, "span", [["class", "addon-calendar-event-name"]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](18, null, ["", ""])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "]))], function (_ck, _v) { var currVal_1 = (_v.parent.context.$implicit.offline && !_v.parent.context.$implicit.deleted); _ck(_v, 5, 0, currVal_1); var currVal_2 = _v.parent.context.$implicit.deleted; _ck(_v, 8, 0, currVal_2); var currVal_3 = _v.parent.context.$implicit.moduleIcon; _ck(_v, 11, 0, currVal_3); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = core["_34" /* ɵinlineInterpolate */](1, "calendar_event_type calendar_event_", _v.parent.context.$implicit.formattedType, ""); _ck(_v, 2, 0, currVal_0); var currVal_4 = core["_56" /* ɵunv */](_v, 14, 0, _ck(_v, 15, 0, core["_44" /* ɵnov */](_v.parent.parent.parent.parent, 0), (_v.parent.context.$implicit.timestart * 1000), _co.timeFormat)); _ck(_v, 14, 0, currVal_4); var currVal_5 = _v.parent.context.$implicit.name; _ck(_v, 18, 0, currVal_5); }); }
function View_AddonCalendarCalendarComponent_8(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 4, null, null, null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonCalendarCalendarComponent_9)), core["_30" /* ɵdid */](3, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "]))], function (_ck, _v) { var currVal_0 = ((_v.context.index < 3) || (_v.parent.context.$implicit.filteredEvents.length == 4)); _ck(_v, 3, 0, currVal_0); }, null); }
function View_AddonCalendarCalendarComponent_13(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 4, "p", [["class", "addon-calendar-day-more"]], null, null, null, null, null)), (_l()(), core["_31" /* ɵeld */](1, 0, null, null, 3, "b", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](2, null, ["", ""])), core["_48" /* ɵpod */](3, { $a: 0 }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], null, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 2, 0, core["_44" /* ɵnov */](_v, 4).transform("core.nummore", _ck(_v, 3, 0, (_v.parent.context.$implicit.filteredEvents.length - 3)))); _ck(_v, 2, 0, currVal_0); }); }
function View_AddonCalendarCalendarComponent_6(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 23, "ion-col", [["class", "addon-calendar-day col"], ["text-center", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.dayClicked(_v.context.$implicit.mday) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), core["_30" /* ɵdid */](1, 278528, null, 0, common["i" /* NgClass */], [core["E" /* IterableDiffers */], core["F" /* KeyValueDiffers */], core["t" /* ElementRef */], core["W" /* Renderer2 */]], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), core["_48" /* ɵpod */](2, { "hasevents": 0, "today": 1, "weekend": 2, "duration_finish": 3 }), core["_30" /* ɵdid */](3, 16384, null, 0, col["a" /* Col */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ɵeld */](5, 0, null, null, 1, "p", [["class", "addon-calendar-day-number"]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](6, null, ["", ""])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n                "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ɵeld */](9, 0, null, null, 2, "p", [["class", "hidden-tablet addon-calendar-dot-types"]], null, null, null, null, null)), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonCalendarCalendarComponent_7)), core["_30" /* ɵdid */](11, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n                "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ɵeld */](14, 0, null, null, 8, "div", [["class", "hidden-phone addon-calendar-day-events"]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 2, null, View_AddonCalendarCalendarComponent_8)), core["_30" /* ɵdid */](17, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), core["_47" /* ɵpid */](0, common["u" /* SlicePipe */], []), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonCalendarCalendarComponent_13)), core["_30" /* ɵdid */](21, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "]))], function (_ck, _v) { var currVal_0 = "addon-calendar-day"; var currVal_1 = _ck(_v, 2, 0, _v.context.$implicit.hasevents, _v.context.$implicit.istoday, _v.context.$implicit.isweekend, _v.context.$implicit.haslastdayofevent); _ck(_v, 1, 0, currVal_0, currVal_1); var currVal_3 = _v.context.$implicit.calendareventtypes; _ck(_v, 11, 0, currVal_3); var currVal_4 = core["_56" /* ɵunv */](_v, 17, 0, core["_44" /* ɵnov */](_v, 18).transform(_v.context.$implicit.filteredEvents, 0, 4)); _ck(_v, 17, 0, currVal_4); var currVal_5 = (_v.context.$implicit.filteredEvents.length > 4); _ck(_v, 21, 0, currVal_5); }, function (_ck, _v) { var currVal_2 = _v.context.$implicit.mday; _ck(_v, 6, 0, currVal_2); }); }
function View_AddonCalendarCalendarComponent_14(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "ion-col", [["class", "dayblank addon-calendar-day col"]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, col["a" /* Col */], [], null, null)], null, null); }
function View_AddonCalendarCalendarComponent_4(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 13, "ion-row", [["class", "addon-calendar-week row"]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, row["a" /* Row */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonCalendarCalendarComponent_5)), core["_30" /* ɵdid */](4, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, [" "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonCalendarCalendarComponent_6)), core["_30" /* ɵdid */](8, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonCalendarCalendarComponent_14)), core["_30" /* ɵdid */](11, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, [" "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "]))], function (_ck, _v) { var currVal_0 = _v.context.$implicit.prepadding; _ck(_v, 4, 0, currVal_0); var currVal_1 = _v.context.$implicit.days; _ck(_v, 8, 0, currVal_1); var currVal_2 = _v.context.$implicit.postpadding; _ck(_v, 11, 0, currVal_2); }, null); }
function View_AddonCalendarCalendarComponent_0(_l) { return core["_57" /* ɵvid */](0, [core["_47" /* ɵpid */](0, format_date["a" /* CoreFormatDatePipe */], [logger["a" /* CoreLoggerProvider */], time["a" /* CoreTimeUtilsProvider */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 10, "core-navbar-buttons", [["end", ""], ["prepend", ""]], null, null, null, navbar_buttons_ngfactory["b" /* View_CoreNavBarButtonsComponent_0 */], navbar_buttons_ngfactory["a" /* RenderType_CoreNavBarButtonsComponent */])), core["_30" /* ɵdid */](4, 245760, null, 1, navbar_buttons["a" /* CoreNavBarButtonsComponent */], [core["t" /* ElementRef */], logger["a" /* CoreLoggerProvider */], dom["a" /* CoreDomUtilsProvider */]], null, null), core["_52" /* ɵqud */](603979776, 1, { buttons: 1 }), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n    "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 0, 5, "button", [["clear", ""], ["icon-only", ""], ["ion-button", ""]], [[8, "hidden", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.goToCurrentMonth() !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](8, 1097728, [[1, 4]], 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { clear: [0, "clear"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_31" /* ɵeld */](10, 0, null, 0, 1, "core-icon", [["name", "fa-calendar-times-o"]], null, null, null, icon_ngfactory["b" /* View_CoreIconComponent_0 */], icon_ngfactory["a" /* RenderType_CoreIconComponent */])), core["_30" /* ɵdid */](11, 704512, null, 0, icon_icon["a" /* CoreIconComponent */], [core["t" /* ElementRef */], config["a" /* Config */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n"])), (_l()(), core["_31" /* ɵeld */](15, 0, null, null, 41, "core-loading", [["class", "core-loading-center"]], null, null, null, loading_ngfactory["b" /* View_CoreLoadingComponent_0 */], loading_ngfactory["a" /* RenderType_CoreLoadingComponent */])), core["_30" /* ɵdid */](16, 638976, null, 0, loading["a" /* CoreLoadingComponent */], [translate_service["a" /* TranslateService */], core["t" /* ElementRef */], events["a" /* CoreEventsProvider */], utils_utils["a" /* CoreUtilsProvider */]], { hideUntil: [0, "hideUntil"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n    "])), (_l()(), core["_31" /* ɵeld */](19, 0, null, 0, 19, "ion-grid", [["class", "addon-calendar-navigation grid"], ["no-padding", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](20, 16384, null, 0, grid["a" /* Grid */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_31" /* ɵeld */](22, 0, null, null, 15, "ion-row", [["align-items-center", ""], ["class", "row"]], null, null, null, null, null)), core["_30" /* ɵdid */](23, 16384, null, 0, row["a" /* Row */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonCalendarCalendarComponent_1)), core["_30" /* ɵdid */](26, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](28, 0, null, null, 5, "ion-col", [["class", "addon-calendar-period col"], ["text-center", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](29, 16384, null, 0, col["a" /* Col */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ɵeld */](31, 0, null, null, 1, "h3", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](32, null, ["", ""])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonCalendarCalendarComponent_2)), core["_30" /* ɵdid */](36, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n\n    "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n    "])), (_l()(), core["_31" /* ɵeld */](41, 0, null, 0, 14, "ion-grid", [["class", "addon-calendar-months grid"]], null, null, null, null, null)), core["_30" /* ɵdid */](42, 16384, null, 0, grid["a" /* Grid */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_31" /* ɵeld */](45, 0, null, null, 5, "ion-row", [["class", "row"]], null, null, null, null, null)), core["_30" /* ɵdid */](46, 16384, null, 0, row["a" /* Row */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonCalendarCalendarComponent_3)), core["_30" /* ɵdid */](49, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n        "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonCalendarCalendarComponent_4)), core["_30" /* ɵdid */](54, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; _ck(_v, 4, 0); var currVal_1 = ""; _ck(_v, 8, 0, currVal_1); var currVal_2 = "fa-calendar-times-o"; _ck(_v, 11, 0, currVal_2); var currVal_3 = _co.loaded; _ck(_v, 16, 0, currVal_3); var currVal_4 = _co.canNavigate; _ck(_v, 26, 0, currVal_4); var currVal_6 = _co.canNavigate; _ck(_v, 36, 0, currVal_6); var currVal_7 = _co.weekDays; _ck(_v, 49, 0, currVal_7); var currVal_8 = _co.weeks; _ck(_v, 54, 0, currVal_8); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = ((!_co.canNavigate || _co.isCurrentMonth) || !_co.displayNavButtons); _ck(_v, 7, 0, currVal_0); var currVal_5 = _co.periodName; _ck(_v, 32, 0, currVal_5); }); }
function View_AddonCalendarCalendarComponent_Host_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "addon-calendar-calendar", [], null, null, null, View_AddonCalendarCalendarComponent_0, RenderType_AddonCalendarCalendarComponent)), core["_30" /* ɵdid */](1, 770048, null, 0, calendar_AddonCalendarCalendarComponent, [events["a" /* CoreEventsProvider */], sites["a" /* CoreSitesProvider */], local_notifications["a" /* CoreLocalNotificationsProvider */], calendar["a" /* AddonCalendarProvider */], helper["a" /* AddonCalendarHelperProvider */], calendar_offline["a" /* AddonCalendarOfflineProvider */], dom["a" /* CoreDomUtilsProvider */], time["a" /* CoreTimeUtilsProvider */], utils_utils["a" /* CoreUtilsProvider */], courses["a" /* CoreCoursesProvider */]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var AddonCalendarCalendarComponentNgFactory = core["_27" /* ɵccf */]("addon-calendar-calendar", calendar_AddonCalendarCalendarComponent, View_AddonCalendarCalendarComponent_Host_0, { initialYear: "initialYear", initialMonth: "initialMonth", courseId: "courseId", categoryId: "categoryId", canNavigate: "canNavigate", displayNavButtons: "displayNavButtons" }, { onEventClicked: "onEventClicked", onDayClicked: "onDayClicked" }, []);

//# sourceMappingURL=calendar.ngfactory.js.map
// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-params.js
var nav_params = __webpack_require__(70);

// CONCATENATED MODULE: ./src/addon/calendar/pages/index/index.ngfactory.js
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 






























































var styles_AddonCalendarIndexPage = [];
var RenderType_AddonCalendarIndexPage = core["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_AddonCalendarIndexPage, data: {} });

function View_AddonCalendarIndexPage_1(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 6, "button", [["icon-only", ""], ["ion-button", ""]], [[1, "aria-label", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.toggleDisplay() !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](1, 1097728, [[3, 4]], 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                "])), (_l()(), core["_31" /* ɵeld */](4, 0, null, 0, 1, "ion-icon", [["name", "list"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](5, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n            "]))], function (_ck, _v) { var currVal_2 = "list"; _ck(_v, 5, 0, currVal_2); }, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 0, 0, core["_44" /* ɵnov */](_v, 2).transform("addon.calendar.upcomingevents")); _ck(_v, 0, 0, currVal_0); var currVal_1 = core["_44" /* ɵnov */](_v, 5)._hidden; _ck(_v, 4, 0, currVal_1); }); }
function View_AddonCalendarIndexPage_2(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 6, "button", [["icon-only", ""], ["ion-button", ""]], [[1, "aria-label", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.toggleDisplay() !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](1, 1097728, [[3, 4]], 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                "])), (_l()(), core["_31" /* ɵeld */](4, 0, null, 0, 1, "core-icon", [["name", "fa-calendar-o"]], null, null, null, icon_ngfactory["b" /* View_CoreIconComponent_0 */], icon_ngfactory["a" /* RenderType_CoreIconComponent */])), core["_30" /* ɵdid */](5, 704512, null, 0, icon_icon["a" /* CoreIconComponent */], [core["t" /* ElementRef */], config["a" /* Config */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n            "]))], function (_ck, _v) { var currVal_1 = "fa-calendar-o"; _ck(_v, 5, 0, currVal_1); }, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 0, 0, core["_44" /* ɵnov */](_v, 2).transform("addon.calendar.monthlyview")); _ck(_v, 0, 0, currVal_0); }); }
function View_AddonCalendarIndexPage_3(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 6, "button", [["icon-only", ""], ["ion-button", ""]], [[1, "aria-label", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.openCourseFilter($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](1, 1097728, [[3, 4]], 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                "])), (_l()(), core["_31" /* ɵeld */](4, 0, null, 0, 1, "ion-icon", [["name", "funnel"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](5, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n            "]))], function (_ck, _v) { var currVal_2 = "funnel"; _ck(_v, 5, 0, currVal_2); }, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 0, 0, core["_44" /* ɵnov */](_v, 2).transform("core.courses.filter")); _ck(_v, 0, 0, currVal_0); var currVal_1 = core["_44" /* ɵnov */](_v, 5)._hidden; _ck(_v, 4, 0, currVal_1); }); }
function View_AddonCalendarIndexPage_4(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 8, "ion-card", [["class", "core-warning-card"], ["icon-start", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, card["a" /* Card */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 1, "ion-icon", [["name", "warning"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](4, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ɵted */](5, null, [" ", "\n    "])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), core["_48" /* ɵpod */](7, { $a: 0 }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], function (_ck, _v) { var currVal_1 = "warning"; _ck(_v, 4, 0, currVal_1); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 4)._hidden; _ck(_v, 3, 0, currVal_0); var currVal_2 = core["_56" /* ɵunv */](_v, 5, 0, core["_44" /* ɵnov */](_v, 8).transform("core.hasdatatosync", _ck(_v, 7, 0, core["_56" /* ɵunv */](_v, 5, 0, core["_44" /* ɵnov */](_v, 6).transform("addon.calendar.calendar"))))); _ck(_v, 5, 0, currVal_2); }); }
function View_AddonCalendarIndexPage_5(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "addon-calendar-upcoming-events", [], [[8, "hidden", 0]], [[null, "onEventClicked"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("onEventClicked" === en)) {
        var pd_0 = (_co.gotoEvent($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, View_AddonCalendarUpcomingEventsComponent_0, RenderType_AddonCalendarUpcomingEventsComponent)), core["_30" /* ɵdid */](1, 770048, [[2, 4]], 0, upcoming_events_AddonCalendarUpcomingEventsComponent, [events["a" /* CoreEventsProvider */], sites["a" /* CoreSitesProvider */], local_notifications["a" /* CoreLocalNotificationsProvider */], calendar["a" /* AddonCalendarProvider */], helper["a" /* AddonCalendarHelperProvider */], calendar_offline["a" /* AddonCalendarOfflineProvider */], dom["a" /* CoreDomUtilsProvider */], courses["a" /* CoreCoursesProvider */]], { courseId: [0, "courseId"], categoryId: [1, "categoryId"] }, { onEventClicked: "onEventClicked" })], function (_ck, _v) { var _co = _v.component; var currVal_1 = _co.courseId; var currVal_2 = _co.categoryId; _ck(_v, 1, 0, currVal_1, currVal_2); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.showCalendar; _ck(_v, 0, 0, currVal_0); }); }
function View_AddonCalendarIndexPage_6(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 13, "ion-fab", [["bottom", ""], ["core-fab", ""], ["end", ""]], null, null, null, fab_container_ngfactory["b" /* View_FabContainer_0 */], fab_container_ngfactory["a" /* RenderType_FabContainer */])), core["_30" /* ɵdid */](1, 212992, null, 0, fab["a" /* CoreFabDirective */], [core["t" /* ElementRef */], content["a" /* Content */]], null, null), core["_30" /* ɵdid */](2, 1228800, null, 2, fab_container["a" /* FabContainer */], [platform["a" /* Platform */]], null, null), core["_52" /* ɵqud */](335544320, 4, { _mainButton: 0 }), core["_52" /* ɵqud */](603979776, 5, { _fabLists: 1 }), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_31" /* ɵeld */](6, 0, null, 0, 6, "button", [["ion-fab", ""]], [[1, "aria-label", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.openEdit() !== false);
        ad = (pd_0 && ad);
    } return ad; }, fab_ngfactory["b" /* View_FabButton_0 */], fab_ngfactory["a" /* RenderType_FabButton */])), core["_30" /* ɵdid */](7, 49152, [[4, 4]], 0, fab_fab["a" /* FabButton */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n            "])), (_l()(), core["_31" /* ɵeld */](10, 0, null, 0, 1, "ion-icon", [["name", "add"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](11, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n    "]))], function (_ck, _v) { _ck(_v, 1, 0); var currVal_2 = "add"; _ck(_v, 11, 0, currVal_2); }, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 6, 0, core["_44" /* ɵnov */](_v, 8).transform("addon.calendar.newevent")); _ck(_v, 6, 0, currVal_0); var currVal_1 = core["_44" /* ɵnov */](_v, 11)._hidden; _ck(_v, 10, 0, currVal_1); }); }
function View_AddonCalendarIndexPage_0(_l) { return core["_57" /* ɵvid */](0, [core["_52" /* ɵqud */](402653184, 1, { calendarComponent: 0 }), core["_52" /* ɵqud */](671088640, 2, { upcomingEventsComponent: 0 }), (_l()(), core["_31" /* ɵeld */](2, 0, null, null, 38, "ion-header", [], null, null, null, null, null)), core["_30" /* ɵdid */](3, 16384, null, 0, toolbar_header["a" /* Header */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, view_controller["a" /* ViewController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_31" /* ɵeld */](5, 0, null, null, 34, "ion-navbar", [["class", "toolbar"], ["core-back-button", ""]], [[8, "hidden", 0], [2, "statusbar-padding", null]], null, null, navbar_ngfactory["b" /* View_Navbar_0 */], navbar_ngfactory["a" /* RenderType_Navbar */])), core["_30" /* ɵdid */](6, 49152, null, 0, navbar["a" /* Navbar */], [app_app["a" /* App */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_30" /* ɵdid */](7, 212992, null, 0, back_button["a" /* CoreBackButtonDirective */], [navbar["a" /* Navbar */], platform["a" /* Platform */], translate_service["a" /* TranslateService */], events["a" /* CoreEventsProvider */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n        "])), (_l()(), core["_31" /* ɵeld */](9, 0, null, 3, 3, "ion-title", [], null, null, null, toolbar_title_ngfactory["b" /* View_ToolbarTitle_0 */], toolbar_title_ngfactory["a" /* RenderType_ToolbarTitle */])), core["_30" /* ɵdid */](10, 49152, null, 0, toolbar_title["a" /* ToolbarTitle */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), (_l()(), core["_55" /* ɵted */](11, 0, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n        "])), (_l()(), core["_31" /* ɵeld */](14, 0, null, 2, 24, "ion-buttons", [["end", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](15, 16384, null, 1, toolbar_item["a" /* ToolbarItem */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), core["_52" /* ɵqud */](603979776, 3, { _buttons: 1 }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonCalendarIndexPage_1)), core["_30" /* ɵdid */](19, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonCalendarIndexPage_2)), core["_30" /* ɵdid */](22, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonCalendarIndexPage_3)), core["_30" /* ɵdid */](25, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](27, 0, null, null, 10, "core-context-menu", [], null, null, null, context_menu_ngfactory["b" /* View_CoreContextMenuComponent_0 */], context_menu_ngfactory["a" /* RenderType_CoreContextMenuComponent */])), core["_30" /* ɵdid */](28, 245760, null, 0, context_menu["a" /* CoreContextMenuComponent */], [translate_service["a" /* TranslateService */], popover_controller["a" /* PopoverController */], core["t" /* ElementRef */], dom["a" /* CoreDomUtilsProvider */], [2, tab["a" /* CoreTabComponent */]], utils_utils["a" /* CoreUtilsProvider */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                "])), (_l()(), core["_31" /* ɵeld */](30, 0, null, 0, 2, "core-context-menu-item", [], null, [[null, "action"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("action" === en)) {
        var pd_0 = (_co.openSettings() !== false);
        ad = (pd_0 && ad);
    } return ad; }, context_menu_item_ngfactory["b" /* View_CoreContextMenuItemComponent_0 */], context_menu_item_ngfactory["a" /* RenderType_CoreContextMenuItemComponent */])), core["_30" /* ɵdid */](31, 770048, null, 0, context_menu_item["a" /* CoreContextMenuItemComponent */], [context_menu["a" /* CoreContextMenuComponent */]], { content: [0, "content"], iconAction: [1, "iconAction"], priority: [2, "priority"], hidden: [3, "hidden"] }, { action: "action" }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                "])), (_l()(), core["_31" /* ɵeld */](34, 0, null, 0, 2, "core-context-menu-item", [], null, [[null, "action"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("action" === en)) {
        var pd_0 = (_co.doRefresh(null, $event, true) !== false);
        ad = (pd_0 && ad);
    } return ad; }, context_menu_item_ngfactory["b" /* View_CoreContextMenuItemComponent_0 */], context_menu_item_ngfactory["a" /* RenderType_CoreContextMenuItemComponent */])), core["_30" /* ɵdid */](35, 770048, null, 0, context_menu_item["a" /* CoreContextMenuItemComponent */], [context_menu["a" /* CoreContextMenuComponent */]], { content: [0, "content"], iconAction: [1, "iconAction"], closeOnClick: [2, "closeOnClick"], priority: [3, "priority"], hidden: [4, "hidden"] }, { action: "action" }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_31" /* ɵeld */](42, 0, null, null, 24, "ion-content", [], [[2, "statusbar-padding", null], [2, "has-refresher", null]], null, null, content_ngfactory["b" /* View_Content_0 */], content_ngfactory["a" /* RenderType_Content */])), core["_30" /* ɵdid */](43, 4374528, null, 0, content["a" /* Content */], [config["a" /* Config */], platform["a" /* Platform */], dom_controller["a" /* DomController */], core["t" /* ElementRef */], core["V" /* Renderer */], app_app["a" /* App */], keyboard["a" /* Keyboard */], core["M" /* NgZone */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n    "])), (_l()(), core["_31" /* ɵeld */](45, 0, null, 2, 6, "ion-refresher", [], [[2, "refresher-active", null], [4, "top", null]], [[null, "ionRefresh"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("ionRefresh" === en)) {
        var pd_0 = (_co.doRefresh($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), core["_30" /* ɵdid */](46, 212992, null, 0, refresher["a" /* Refresher */], [platform["a" /* Platform */], content["a" /* Content */], core["M" /* NgZone */], gesture_controller["l" /* GestureController */]], { enabled: [0, "enabled"] }, { ionRefresh: "ionRefresh" }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_31" /* ɵeld */](48, 0, null, null, 2, "ion-refresher-content", [], [[1, "state", 0]], null, null, refresher_content_ngfactory["b" /* View_RefresherContent_0 */], refresher_content_ngfactory["a" /* RenderType_RefresherContent */])), core["_30" /* ɵdid */](49, 114688, null, 0, refresher_content["a" /* RefresherContent */], [refresher["a" /* Refresher */], config["a" /* Config */]], { pullingText: [0, "pullingText"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n\n    "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n    "])), (_l()(), core["_26" /* ɵand */](16777216, null, 1, 1, null, View_AddonCalendarIndexPage_4)), core["_30" /* ɵdid */](55, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n\n    "])), (_l()(), core["_31" /* ɵeld */](57, 0, null, 1, 1, "addon-calendar-calendar", [], [[8, "hidden", 0]], [[null, "onEventClicked"], [null, "onDayClicked"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("onEventClicked" === en)) {
        var pd_0 = (_co.gotoEvent($event) !== false);
        ad = (pd_0 && ad);
    } if (("onDayClicked" === en)) {
        var pd_1 = (_co.gotoDay($event) !== false);
        ad = (pd_1 && ad);
    } return ad; }, View_AddonCalendarCalendarComponent_0, RenderType_AddonCalendarCalendarComponent)), core["_30" /* ɵdid */](58, 770048, [[1, 4]], 0, calendar_AddonCalendarCalendarComponent, [events["a" /* CoreEventsProvider */], sites["a" /* CoreSitesProvider */], local_notifications["a" /* CoreLocalNotificationsProvider */], calendar["a" /* AddonCalendarProvider */], helper["a" /* AddonCalendarHelperProvider */], calendar_offline["a" /* AddonCalendarOfflineProvider */], dom["a" /* CoreDomUtilsProvider */], time["a" /* CoreTimeUtilsProvider */], utils_utils["a" /* CoreUtilsProvider */], courses["a" /* CoreCoursesProvider */]], { initialYear: [0, "initialYear"], initialMonth: [1, "initialMonth"], courseId: [2, "courseId"], categoryId: [3, "categoryId"], displayNavButtons: [4, "displayNavButtons"] }, { onEventClicked: "onEventClicked", onDayClicked: "onDayClicked" }), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n\n    "])), (_l()(), core["_26" /* ɵand */](16777216, null, 1, 1, null, View_AddonCalendarIndexPage_5)), core["_30" /* ɵdid */](61, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n\n    "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n    "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonCalendarIndexPage_6)), core["_30" /* ɵdid */](65, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; _ck(_v, 7, 0); var currVal_3 = _co.showCalendar; _ck(_v, 19, 0, currVal_3); var currVal_4 = !_co.showCalendar; _ck(_v, 22, 0, currVal_4); var currVal_5 = (_co.courses && _co.courses.length); _ck(_v, 25, 0, currVal_5); _ck(_v, 28, 0); var currVal_6 = core["_56" /* ɵunv */](_v, 31, 0, core["_44" /* ɵnov */](_v, 32).transform("core.settings.settings")); var currVal_7 = "cog"; var currVal_8 = 600; var currVal_9 = !_co.notificationsEnabled; _ck(_v, 31, 0, currVal_6, currVal_7, currVal_8, currVal_9); var currVal_10 = core["_56" /* ɵunv */](_v, 35, 0, core["_44" /* ɵnov */](_v, 36).transform("core.settings.synchronizenow")); var currVal_11 = _co.syncIcon; var currVal_12 = false; var currVal_13 = 400; var currVal_14 = ((!_co.loaded || !_co.hasOffline) || !_co.isOnline); _ck(_v, 35, 0, currVal_10, currVal_11, currVal_12, currVal_13, currVal_14); var currVal_19 = _co.loaded; _ck(_v, 46, 0, currVal_19); var currVal_21 = core["_34" /* ɵinlineInterpolate */](1, "", core["_56" /* ɵunv */](_v, 49, 0, core["_44" /* ɵnov */](_v, 50).transform("core.pulltorefresh")), ""); _ck(_v, 49, 0, currVal_21); var currVal_22 = _co.hasOffline; _ck(_v, 55, 0, currVal_22); var currVal_24 = _co.year; var currVal_25 = _co.month; var currVal_26 = _co.courseId; var currVal_27 = _co.categoryId; var currVal_28 = _co.showCalendar; _ck(_v, 58, 0, currVal_24, currVal_25, currVal_26, currVal_27, currVal_28); var currVal_29 = _co.loadUpcoming; _ck(_v, 61, 0, currVal_29); var currVal_30 = _co.canCreate; _ck(_v, 65, 0, currVal_30); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = core["_44" /* ɵnov */](_v, 6)._hidden; var currVal_1 = core["_44" /* ɵnov */](_v, 6)._sbPadding; _ck(_v, 5, 0, currVal_0, currVal_1); var currVal_2 = core["_56" /* ɵunv */](_v, 11, 0, core["_44" /* ɵnov */](_v, 12).transform("addon.calendar.calendarevents")); _ck(_v, 11, 0, currVal_2); var currVal_15 = core["_44" /* ɵnov */](_v, 43).statusbarPadding; var currVal_16 = core["_44" /* ɵnov */](_v, 43)._hasRefresher; _ck(_v, 42, 0, currVal_15, currVal_16); var currVal_17 = (core["_44" /* ɵnov */](_v, 46).state !== "inactive"); var currVal_18 = core["_44" /* ɵnov */](_v, 46)._top; _ck(_v, 45, 0, currVal_17, currVal_18); var currVal_20 = core["_44" /* ɵnov */](_v, 49).r.state; _ck(_v, 48, 0, currVal_20); var currVal_23 = !_co.showCalendar; _ck(_v, 57, 0, currVal_23); }); }
function View_AddonCalendarIndexPage_Host_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "page-addon-calendar-index", [], null, null, null, View_AddonCalendarIndexPage_0, RenderType_AddonCalendarIndexPage)), core["_30" /* ɵdid */](1, 245760, null, 0, index_AddonCalendarIndexPage, [local_notifications["a" /* CoreLocalNotificationsProvider */], nav_params["a" /* NavParams */], _ionic_native_network["a" /* Network */], core["M" /* NgZone */], sites["a" /* CoreSitesProvider */], nav_controller["a" /* NavController */], dom["a" /* CoreDomUtilsProvider */], calendar["a" /* AddonCalendarProvider */], calendar_offline["a" /* AddonCalendarOfflineProvider */], helper["a" /* AddonCalendarHelperProvider */], calendar_sync["a" /* AddonCalendarSyncProvider */], events["a" /* CoreEventsProvider */], providers_helper["a" /* CoreCoursesHelperProvider */], app["a" /* CoreAppProvider */]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var AddonCalendarIndexPageNgFactory = core["_27" /* ɵccf */]("page-addon-calendar-index", index_AddonCalendarIndexPage, View_AddonCalendarIndexPage_Host_0, {}, {}, []);

//# sourceMappingURL=index.ngfactory.js.map
// EXTERNAL MODULE: ./node_modules/@angular/forms/esm5/forms.js
var esm5_forms = __webpack_require__(22);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.loader.js
var translate_loader = __webpack_require__(360);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.compiler.js
var translate_compiler = __webpack_require__(361);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.parser.js
var translate_parser = __webpack_require__(363);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/missing-translation-handler.js
var missing_translation_handler = __webpack_require__(362);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.store.js
var translate_store = __webpack_require__(467);

// EXTERNAL MODULE: ./node_modules/ionic-angular/module.js
var ionic_angular_module = __webpack_require__(710);

// EXTERNAL MODULE: ./node_modules/ionic-angular/util/module-loader.js
var module_loader = __webpack_require__(268);

// CONCATENATED MODULE: ./src/addon/calendar/pages/index/index.module.ngfactory.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddonCalendarIndexPageModuleNgFactory", function() { return AddonCalendarIndexPageModuleNgFactory; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
































var AddonCalendarIndexPageModuleNgFactory = core["_28" /* ɵcmf */](index_module_AddonCalendarIndexPageModule, [], function (_l) { return core["_40" /* ɵmod */]([core["_41" /* ɵmpd */](512, core["o" /* ComponentFactoryResolver */], core["_21" /* ɵCodegenComponentFactoryResolver */], [[8, [action_sheet_component_ngfactory["a" /* ActionSheetCmpNgFactory */], alert_component_ngfactory["a" /* AlertCmpNgFactory */], app_root_ngfactory["a" /* IonicAppNgFactory */], loading_component_ngfactory["a" /* LoadingCmpNgFactory */], modal_component_ngfactory["a" /* ModalCmpNgFactory */], picker_component_ngfactory["a" /* PickerCmpNgFactory */], popover_component_ngfactory["a" /* PopoverCmpNgFactory */], select_popover_component_ngfactory["a" /* SelectPopoverNgFactory */], toast_component_ngfactory["a" /* ToastCmpNgFactory */], context_menu_popover_ngfactory["a" /* CoreContextMenuPopoverComponentNgFactory */], course_picker_menu_popover_ngfactory["a" /* CoreCoursePickerMenuPopoverComponentNgFactory */], recaptchamodal_ngfactory["a" /* CoreRecaptchaModalComponentNgFactory */], bs_tooltip_ngfactory["a" /* CoreBSTooltipComponentNgFactory */], AddonCalendarIndexPageNgFactory]], [3, core["o" /* ComponentFactoryResolver */]], core["K" /* NgModuleRef */]]), core["_41" /* ɵmpd */](4608, common["m" /* NgLocalization */], common["l" /* NgLocaleLocalization */], [core["G" /* LOCALE_ID */], [2, common["w" /* ɵa */]]]), core["_41" /* ɵmpd */](4608, esm5_forms["x" /* ɵi */], esm5_forms["x" /* ɵi */], []), core["_41" /* ɵmpd */](4608, esm5_forms["d" /* FormBuilder */], esm5_forms["d" /* FormBuilder */], []), core["_41" /* ɵmpd */](4608, translate_loader["b" /* TranslateLoader */], translate_loader["a" /* TranslateFakeLoader */], []), core["_41" /* ɵmpd */](4608, translate_compiler["a" /* TranslateCompiler */], translate_compiler["b" /* TranslateFakeCompiler */], []), core["_41" /* ɵmpd */](4608, translate_parser["b" /* TranslateParser */], translate_parser["a" /* TranslateDefaultParser */], []), core["_41" /* ɵmpd */](4608, missing_translation_handler["b" /* MissingTranslationHandler */], missing_translation_handler["a" /* FakeMissingTranslationHandler */], []), core["_41" /* ɵmpd */](4608, translate_service["a" /* TranslateService */], translate_service["a" /* TranslateService */], [translate_store["a" /* TranslateStore */], translate_loader["b" /* TranslateLoader */], translate_compiler["a" /* TranslateCompiler */], translate_parser["b" /* TranslateParser */], missing_translation_handler["b" /* MissingTranslationHandler */], translate_service["b" /* USE_DEFAULT_LANG */], translate_service["c" /* USE_STORE */]]), core["_41" /* ɵmpd */](512, common["b" /* CommonModule */], common["b" /* CommonModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["v" /* ɵba */], esm5_forms["v" /* ɵba */], []), core["_41" /* ɵmpd */](512, esm5_forms["i" /* FormsModule */], esm5_forms["i" /* FormsModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["s" /* ReactiveFormsModule */], esm5_forms["s" /* ReactiveFormsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["a" /* IonicModule */], ionic_angular_module["a" /* IonicModule */], []), core["_41" /* ɵmpd */](512, _ngx_translate_core["b" /* TranslateModule */], _ngx_translate_core["b" /* TranslateModule */], []), core["_41" /* ɵmpd */](512, directives_module["a" /* CoreDirectivesModule */], directives_module["a" /* CoreDirectivesModule */], []), core["_41" /* ɵmpd */](512, pipes_module["a" /* CorePipesModule */], pipes_module["a" /* CorePipesModule */], []), core["_41" /* ɵmpd */](512, components_module["a" /* CoreComponentsModule */], components_module["a" /* CoreComponentsModule */], []), core["_41" /* ɵmpd */](512, components_module_AddonCalendarComponentsModule, components_module_AddonCalendarComponentsModule, []), core["_41" /* ɵmpd */](512, ionic_angular_module["b" /* IonicPageModule */], ionic_angular_module["b" /* IonicPageModule */], []), core["_41" /* ɵmpd */](512, index_module_AddonCalendarIndexPageModule, index_module_AddonCalendarIndexPageModule, []), core["_41" /* ɵmpd */](256, translate_service["c" /* USE_STORE */], undefined, []), core["_41" /* ɵmpd */](256, translate_service["b" /* USE_DEFAULT_LANG */], undefined, []), core["_41" /* ɵmpd */](256, module_loader["a" /* LAZY_LOADED_TOKEN */], index_AddonCalendarIndexPage, [])]); });

//# sourceMappingURL=index.module.ngfactory.js.map

/***/ })

});
//# sourceMappingURL=132.js.map