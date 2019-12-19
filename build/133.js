webpackJsonp([133],{

/***/ 2137:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddonCalendarListPageModule", function() { return AddonCalendarListPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__directives_directives_module__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pipes_pipes_module__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__list__ = __webpack_require__(2287);
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







var AddonCalendarListPageModule = /** @class */ (function () {
    function AddonCalendarListPageModule() {
    }
    AddonCalendarListPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__list__["a" /* AddonCalendarListPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* CoreComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_4__directives_directives_module__["a" /* CoreDirectivesModule */],
                __WEBPACK_IMPORTED_MODULE_5__pipes_pipes_module__["a" /* CorePipesModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_6__list__["a" /* AddonCalendarListPage */]),
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */].forChild()
            ],
        })
    ], AddonCalendarListPageModule);
    return AddonCalendarListPageModule;
}());

//# sourceMappingURL=list.module.js.map

/***/ }),

/***/ 2287:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddonCalendarListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_calendar__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_calendar_offline__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_helper__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_calendar_sync__ = __webpack_require__(423);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_courses_providers_courses__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_courses_providers_helper__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_utils_dom__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_utils_time__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_utils_utils__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_sites__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_local_notifications__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_events__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_app__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_split_view_split_view__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_moment__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_network__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__core_constants__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__components_filter_filter__ = __webpack_require__(992);
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
 * Page that displays the list of calendar events.
 */
var AddonCalendarListPage = /** @class */ (function () {
    function AddonCalendarListPage(navParams, sitesProvider, network, zone, localNotificationsProvider, calendarProvider, domUtils, coursesProvider, utils, calendarHelper, coursesHelper, eventsProvider, navCtrl, appProvider, calendarOffline, calendarSync, timeUtils, popoverCtrl) {
        var _this = this;
        this.calendarProvider = calendarProvider;
        this.domUtils = domUtils;
        this.coursesProvider = coursesProvider;
        this.utils = utils;
        this.calendarHelper = calendarHelper;
        this.coursesHelper = coursesHelper;
        this.eventsProvider = eventsProvider;
        this.navCtrl = navCtrl;
        this.appProvider = appProvider;
        this.calendarOffline = calendarOffline;
        this.calendarSync = calendarSync;
        this.timeUtils = timeUtils;
        this.popoverCtrl = popoverCtrl;
        this.initialTime = 0;
        this.daysLoaded = 0;
        this.emptyEventsTimes = 0; // Variable to identify consecutive calls returning 0 events.
        this.categoriesRetrieved = false;
        this.getCategories = false;
        this.categories = {};
        this.onlineEvents = [];
        this.offlineEvents = [];
        this.deletedEvents = [];
        this.eventsLoaded = false;
        this.events = []; // Events (both online and offline).
        this.notificationsEnabled = false;
        this.filteredEvents = [];
        this.canLoadMore = false;
        this.loadMoreError = false;
        this.canCreate = false;
        this.hasOffline = false;
        this.isOnline = false;
        this.filter = {
            filtered: false,
            courseId: null,
            categoryId: null,
            course: false,
            group: false,
            site: false,
            user: false,
            category: false
        };
        this.siteHomeId = sitesProvider.getCurrentSite().getSiteHomeId();
        this.notificationsEnabled = localNotificationsProvider.isAvailable();
        this.currentSiteId = sitesProvider.getCurrentSiteId();
        if (this.notificationsEnabled) {
            // Re-schedule events if default time changes.
            this.obsDefaultTimeChange = eventsProvider.on(__WEBPACK_IMPORTED_MODULE_2__providers_calendar__["a" /* AddonCalendarProvider */].DEFAULT_NOTIFICATION_TIME_CHANGED, function () {
                calendarProvider.scheduleEventsNotifications(_this.onlineEvents);
            }, this.currentSiteId);
        }
        this.eventId = navParams.get('eventId') || false;
        __WEBPACK_IMPORTED_MODULE_2__providers_calendar__["a" /* AddonCalendarProvider */].ALL_TYPES.forEach(function (name) {
            _this.filter[name] = true;
        });
        this.filter['courseId'] = navParams.get('courseId');
        // Listen for events added. When an event is added, reload the data.
        this.newEventObserver = eventsProvider.on(__WEBPACK_IMPORTED_MODULE_2__providers_calendar__["a" /* AddonCalendarProvider */].NEW_EVENT_EVENT, function (data) {
            if (data && data.event) {
                if (_this.splitviewCtrl.isOn()) {
                    // Discussion added, clear details page.
                    _this.splitviewCtrl.emptyDetails();
                }
                _this.eventsLoaded = false;
                _this.refreshEvents(true, false).finally(function () {
                    // In tablet mode try to open the event (only if it's an online event).
                    if (_this.splitviewCtrl.isOn() && data.event.id > 0) {
                        _this.gotoEvent(data.event.id);
                    }
                });
            }
        }, this.currentSiteId);
        // Listen for new event discarded event. When it does, reload the data.
        this.discardedObserver = eventsProvider.on(__WEBPACK_IMPORTED_MODULE_2__providers_calendar__["a" /* AddonCalendarProvider */].NEW_EVENT_DISCARDED_EVENT, function () {
            if (_this.splitviewCtrl.isOn()) {
                // Discussion added, clear details page.
                _this.splitviewCtrl.emptyDetails();
            }
            _this.eventsLoaded = false;
            _this.refreshEvents(true, false);
        }, this.currentSiteId);
        // Listen for events edited. When an event is edited, reload the data.
        this.editEventObserver = eventsProvider.on(__WEBPACK_IMPORTED_MODULE_2__providers_calendar__["a" /* AddonCalendarProvider */].EDIT_EVENT_EVENT, function (data) {
            if (data && data.event) {
                _this.eventsLoaded = false;
                _this.refreshEvents(true, false);
            }
        }, this.currentSiteId);
        // Refresh data if calendar events are synchronized automatically.
        this.syncObserver = eventsProvider.on(__WEBPACK_IMPORTED_MODULE_5__providers_calendar_sync__["a" /* AddonCalendarSyncProvider */].AUTO_SYNCED, function (data) {
            _this.eventsLoaded = false;
            _this.refreshEvents();
            if (_this.splitviewCtrl.isOn() && _this.eventId && data && data.deleted && data.deleted.indexOf(_this.eventId) != -1) {
                // Current selected event was deleted. Clear details.
                _this.splitviewCtrl.emptyDetails();
            }
        }, this.currentSiteId);
        // Refresh data if calendar events are synchronized manually but not by this page.
        this.manualSyncObserver = eventsProvider.on(__WEBPACK_IMPORTED_MODULE_5__providers_calendar_sync__["a" /* AddonCalendarSyncProvider */].MANUAL_SYNCED, function (data) {
            if (data && data.source != 'list') {
                _this.eventsLoaded = false;
                _this.refreshEvents();
            }
            if (_this.splitviewCtrl.isOn() && _this.eventId && data && data.deleted && data.deleted.indexOf(_this.eventId) != -1) {
                // Current selected event was deleted. Clear details.
                _this.splitviewCtrl.emptyDetails();
            }
        }, this.currentSiteId);
        // Update the list when an event is deleted.
        this.deleteEventObserver = eventsProvider.on(__WEBPACK_IMPORTED_MODULE_2__providers_calendar__["a" /* AddonCalendarProvider */].DELETED_EVENT_EVENT, function (data) {
            if (data && !data.sent) {
                // Event was deleted in offline. Just mark it as deleted, no need to refresh.
                _this.markAsDeleted(data.eventId, true);
                _this.deletedEvents.push(data.eventId);
                _this.hasOffline = true;
            }
            else {
                // Event deleted, clear the details if needed and refresh the view.
                if (_this.splitviewCtrl.isOn()) {
                    _this.splitviewCtrl.emptyDetails();
                }
                _this.eventsLoaded = false;
                _this.refreshEvents();
            }
        }, this.currentSiteId);
        // Listen for events "undeleted" (offline).
        this.undeleteEventObserver = eventsProvider.on(__WEBPACK_IMPORTED_MODULE_2__providers_calendar__["a" /* AddonCalendarProvider */].UNDELETED_EVENT_EVENT, function (data) {
            if (data && data.eventId) {
                // Mark it as undeleted, no need to refresh.
                _this.markAsDeleted(data.eventId, false);
                // Remove it from the list of deleted events if it's there.
                var index = _this.deletedEvents.indexOf(data.eventId);
                if (index != -1) {
                    _this.deletedEvents.splice(index, 1);
                }
                _this.hasOffline = !!_this.offlineEvents.length || !!_this.deletedEvents.length;
            }
        }, this.currentSiteId);
        this.filterChangedObserver = this.eventsProvider.on(__WEBPACK_IMPORTED_MODULE_2__providers_calendar__["a" /* AddonCalendarProvider */].FILTER_CHANGED_EVENT, function (data) {
            _this.filter = data;
            // Course viewed has changed, check if the user can create events for this course calendar.
            _this.calendarHelper.canEditEvents(_this.filter['courseId']).then(function (canEdit) {
                _this.canCreate = canEdit;
            });
            _this.filterEvents();
            _this.domUtils.scrollToTop(_this.content);
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
    AddonCalendarListPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        if (this.eventId) {
            // There is an event to load, open the event in a new state.
            this.gotoEvent(this.eventId);
        }
        this.syncIcon = 'spinner';
        this.fetchData(false, true, false).then(function () {
            if (!_this.eventId && _this.splitviewCtrl.isOn() && _this.events.length > 0) {
                // Take first online event and load it. If no online event, load the first offline.
                if (_this.onlineEvents[0]) {
                    _this.gotoEvent(_this.onlineEvents[0].id);
                }
                else {
                    _this.gotoEvent(_this.offlineEvents[0].id);
                }
            }
        });
    };
    /**
     * Fetch all the data required for the view.
     *
     * @param refresh Empty events array first.
     * @param sync Whether it should try to synchronize offline events.
     * @param showErrors Whether to show sync errors to the user.
     * @return Promise resolved when done.
     */
    AddonCalendarListPage.prototype.fetchData = function (refresh, sync, showErrors) {
        var _this = this;
        this.initialTime = this.timeUtils.timestamp();
        this.daysLoaded = 0;
        this.emptyEventsTimes = 0;
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
                    result.source = 'list';
                    _this.eventsProvider.trigger(__WEBPACK_IMPORTED_MODULE_5__providers_calendar_sync__["a" /* AddonCalendarSyncProvider */].MANUAL_SYNCED, result, _this.currentSiteId);
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
            promises.push(_this.calendarHelper.canEditEvents(_this.filter['courseId']).then(function (canEdit) {
                _this.canCreate = canEdit;
            }));
            // Load courses for the popover.
            promises.push(_this.coursesHelper.getCoursesForPopover(_this.filter['courseId']).then(function (result) {
                _this.courses = result.courses;
                return _this.fetchEvents(refresh);
            }));
            // Get offline events.
            promises.push(_this.calendarOffline.getAllEditedEvents().then(function (events) {
                _this.hasOffline = _this.hasOffline || !!events.length;
                // Format data and sort by timestart.
                events.forEach(function (event) {
                    event.offline = true;
                    _this.calendarHelper.formatEventData(event);
                });
                _this.offlineEvents = _this.sortEvents(events);
            }));
            // Get events deleted in offline.
            promises.push(_this.calendarOffline.getAllDeletedEventsIds().then(function (ids) {
                _this.hasOffline = _this.hasOffline || !!ids.length;
                _this.deletedEvents = ids;
            }));
            return Promise.all(promises);
        }).finally(function () {
            _this.eventsLoaded = true;
            _this.syncIcon = 'sync';
        });
    };
    /**
     * Fetches the events and updates the view.
     *
     * @param refresh Empty events array first.
     * @return Promise resolved when done.
     */
    AddonCalendarListPage.prototype.fetchEvents = function (refresh) {
        var _this = this;
        this.loadMoreError = false;
        return this.calendarProvider.getEventsList(this.initialTime, this.daysLoaded, __WEBPACK_IMPORTED_MODULE_2__providers_calendar__["a" /* AddonCalendarProvider */].DAYS_INTERVAL)
            .then(function (onlineEvents) {
            if (onlineEvents.length === 0) {
                _this.emptyEventsTimes++;
                if (_this.emptyEventsTimes > 5) {
                    _this.canLoadMore = false;
                    if (refresh) {
                        _this.onlineEvents = [];
                        _this.filteredEvents = [];
                        _this.events = _this.offlineEvents;
                    }
                }
                else {
                    // No events returned, load next events.
                    _this.daysLoaded += __WEBPACK_IMPORTED_MODULE_2__providers_calendar__["a" /* AddonCalendarProvider */].DAYS_INTERVAL;
                    return _this.fetchEvents();
                }
            }
            else {
                onlineEvents.forEach(_this.calendarHelper.formatEventData.bind(_this.calendarHelper));
                // Get the merged events of this period.
                var events = _this.mergeEvents(onlineEvents);
                _this.getCategories = _this.shouldLoadCategories(onlineEvents);
                if (refresh) {
                    _this.onlineEvents = onlineEvents;
                    _this.events = events;
                }
                else {
                    // Filter events with same ID. Repeated events are returned once per WS call, show them only once.
                    _this.onlineEvents = _this.utils.mergeArraysWithoutDuplicates(_this.onlineEvents, onlineEvents, 'id');
                    _this.events = _this.utils.mergeArraysWithoutDuplicates(_this.events, events, 'id');
                }
                _this.filterEvents();
                // Calculate which evemts need to display the date.
                _this.filteredEvents.forEach(function (event, index) {
                    event.showDate = _this.showDate(event, _this.filteredEvents[index - 1]);
                    event.endsSameDay = _this.endsSameDay(event);
                });
                _this.canLoadMore = true;
                // Schedule notifications for the events retrieved (might have new events).
                _this.calendarProvider.scheduleEventsNotifications(_this.onlineEvents);
                _this.daysLoaded += __WEBPACK_IMPORTED_MODULE_2__providers_calendar__["a" /* AddonCalendarProvider */].DAYS_INTERVAL;
            }
            // Resize the content so infinite loading is able to calculate if it should load more items or not.
            // @todo: Infinite loading is not working if content is not high enough.
            _this.content.resize();
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'addon.calendar.errorloadevents', true);
            _this.loadMoreError = true; // Set to prevent infinite calls with infinite-loading.
        }).then(function () {
            // Success retrieving events. Get categories if needed.
            if (_this.getCategories) {
                _this.getCategories = false;
                return _this.loadCategories();
            }
        });
    };
    /**
     * Function to load more events.
     *
     * @param infiniteComplete Infinite scroll complete function. Only used from core-infinite-loading.
     * @return Resolved when done.
     */
    AddonCalendarListPage.prototype.loadMoreEvents = function (infiniteComplete) {
        return this.fetchEvents().finally(function () {
            infiniteComplete && infiniteComplete();
        });
    };
    AddonCalendarListPage.prototype.filterEvents = function () {
        this.filteredEvents = this.calendarHelper.getFilteredEvents(this.events, this.filter, this.categories);
    };
    /**
     * Returns if the current state should load categories or not.
     * @param events Events to parse.
     * @return True if categories should be loaded.
     */
    AddonCalendarListPage.prototype.shouldLoadCategories = function (events) {
        if (this.categoriesRetrieved || this.getCategories) {
            // Use previous value
            return this.getCategories;
        }
        // Categories not loaded yet. We should get them if there's any category event.
        var found = events.some(function (event) { return event.categoryid != 'undefined' && event.categoryid > 0; });
        return found || this.getCategories;
    };
    /**
     * Load categories to be able to filter events.
     *
     * @return Promise resolved when done.
     */
    AddonCalendarListPage.prototype.loadCategories = function () {
        var _this = this;
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
     * Merge a period of online events with the offline events of that period.
     *
     * @param onlineEvents Online events.
     * @return Merged events.
     */
    AddonCalendarListPage.prototype.mergeEvents = function (onlineEvents) {
        var _this = this;
        if (!this.offlineEvents.length && !this.deletedEvents.length) {
            // No offline events, nothing to merge.
            return onlineEvents;
        }
        var start = this.initialTime + (__WEBPACK_IMPORTED_MODULE_18__core_constants__["a" /* CoreConstants */].SECONDS_DAY * this.daysLoaded), end = start + (__WEBPACK_IMPORTED_MODULE_18__core_constants__["a" /* CoreConstants */].SECONDS_DAY * __WEBPACK_IMPORTED_MODULE_2__providers_calendar__["a" /* AddonCalendarProvider */].DAYS_INTERVAL) - 1;
        var result = onlineEvents;
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
            if (_this.daysLoaded == 0 && event.timestart < start) {
                // Display offline events that are previous to current time to allow editing them.
                return true;
            }
            return (event.timestart >= start || event.timestart + event.timeduration >= start) && event.timestart <= end;
        });
        // Merge both arrays and sort them.
        result = result.concat(periodOfflineEvents);
        return this.sortEvents(result);
    };
    /**
     * Sort events by timestart.
     *
     * @param events List to sort.
     */
    AddonCalendarListPage.prototype.sortEvents = function (events) {
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
    AddonCalendarListPage.prototype.doRefresh = function (refresher, done, showErrors) {
        if (this.eventsLoaded) {
            return this.refreshEvents(true, showErrors).finally(function () {
                refresher && refresher.complete();
                done && done();
            });
        }
        return Promise.resolve();
    };
    /**
     * Refresh the events.
     *
     * @param sync Whether it should try to synchronize offline events.
     * @param showErrors Whether to show sync errors to the user.
     * @return Promise resolved when done.
     */
    AddonCalendarListPage.prototype.refreshEvents = function (sync, showErrors) {
        var _this = this;
        this.syncIcon = 'spinner';
        var promises = [];
        promises.push(this.calendarProvider.invalidateEventsList());
        promises.push(this.calendarProvider.invalidateAllowedEventTypes());
        if (this.categoriesRetrieved) {
            promises.push(this.coursesProvider.invalidateCategories(0, true));
            this.categoriesRetrieved = false;
        }
        return Promise.all(promises).finally(function () {
            return _this.fetchData(true, sync, showErrors);
        });
    };
    /**
     * Check date should be shown on event list for the current event.
     * If date has changed from previous to current event it should be shown.
     *
     * @param event Current event where to show the date.
     * @param prevEvent Previous event where to compare the date with.
     * @return If date has changed and should be shown.
     */
    AddonCalendarListPage.prototype.showDate = function (event, prevEvent) {
        if (!prevEvent) {
            // First event, show it.
            return true;
        }
        // Check if day has changed.
        return !__WEBPACK_IMPORTED_MODULE_16_moment__(event.timestart * 1000).isSame(prevEvent.timestart * 1000, 'day');
    };
    /**
     * Check if event ends the same date or not.
     *
     * @param event Event info.
     * @return If date has changed and should be shown.
     */
    AddonCalendarListPage.prototype.endsSameDay = function (event) {
        if (!event.timeduration) {
            // No duration.
            return true;
        }
        // Check if day has changed.
        return __WEBPACK_IMPORTED_MODULE_16_moment__(event.timestart * 1000).isSame((event.timestart + event.timeduration) * 1000, 'day');
    };
    /**
     * Show the context menu.
     *
     * @param event Event.
     */
    AddonCalendarListPage.prototype.openFilter = function (event) {
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_19__components_filter_filter__["a" /* AddonCalendarFilterPopoverComponent */], {
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
    AddonCalendarListPage.prototype.openEdit = function (eventId) {
        this.eventId = undefined;
        var params = {};
        if (eventId) {
            params.eventId = eventId;
        }
        if (this.filter['courseId']) {
            params.courseId = this.filter['courseId'];
        }
        this.splitviewCtrl.push('AddonCalendarEditEventPage', params);
    };
    /**
     * Open calendar events settings.
     */
    AddonCalendarListPage.prototype.openSettings = function () {
        this.navCtrl.push('AddonCalendarSettingsPage');
    };
    /**
     * Navigate to a particular event.
     *
     * @param eventId Event to load.
     */
    AddonCalendarListPage.prototype.gotoEvent = function (eventId) {
        this.eventId = eventId;
        if (eventId < 0) {
            // It's an offline event, go to the edit page.
            this.openEdit(eventId);
        }
        else {
            this.splitviewCtrl.push('AddonCalendarEventPage', {
                id: eventId
            });
        }
    };
    /**
     * Find an event and mark it as deleted.
     *
     * @param eventId Event ID.
     * @param deleted Whether to mark it as deleted or not.
     */
    AddonCalendarListPage.prototype.markAsDeleted = function (eventId, deleted) {
        var event = this.onlineEvents.find(function (event) {
            return event.id == eventId;
        });
        if (event) {
            event.deleted = deleted;
        }
    };
    /**
     * Page destroyed.
     */
    AddonCalendarListPage.prototype.ngOnDestroy = function () {
        this.obsDefaultTimeChange && this.obsDefaultTimeChange.off();
        this.newEventObserver && this.newEventObserver.off();
        this.discardedObserver && this.discardedObserver.off();
        this.editEventObserver && this.editEventObserver.off();
        this.deleteEventObserver && this.deleteEventObserver.off();
        this.undeleteEventObserver && this.undeleteEventObserver.off();
        this.syncObserver && this.syncObserver.off();
        this.manualSyncObserver && this.manualSyncObserver.off();
        this.filterChangedObserver && this.filterChangedObserver.off();
        this.onlineObserver && this.onlineObserver.unsubscribe();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Content */])
    ], AddonCalendarListPage.prototype, "content", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_15__components_split_view_split_view__["a" /* CoreSplitViewComponent */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_15__components_split_view_split_view__["a" /* CoreSplitViewComponent */])
    ], AddonCalendarListPage.prototype, "splitviewCtrl", void 0);
    AddonCalendarListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-addon-calendar-list',template:/*ion-inline-start:"/home/travis/build/moodlehq/moodlemobile2/src/addon/calendar/pages/list/list.html"*/'<ion-header>\n    <ion-navbar core-back-button>\n        <ion-title>{{ \'addon.calendar.calendarevents\' | translate }}</ion-title>\n        <ion-buttons end>\n            <button ion-button icon-only (click)="openFilter($event)" [attr.aria-label]="\'core.filter\' | translate">\n                <ion-icon name="funnel" *ngIf="filter.filtered"></ion-icon>\n                <ion-icon name="ios-funnel-outline" *ngIf="!filter.filtered"></ion-icon>\n            </button>\n            <core-context-menu>\n                <core-context-menu-item [hidden]="!notificationsEnabled" [priority]="600" [content]="\'core.settings.settings\' | translate" (action)="openSettings()" [iconAction]="\'cog\'"></core-context-menu-item>\n                <core-context-menu-item [hidden]="!eventsLoaded || !hasOffline || !isOnline"  [priority]="400" [content]="\'core.settings.synchronizenow\' | translate" (action)="doRefresh(null, $event, true)" [iconAction]="syncIcon" [closeOnClick]="false"></core-context-menu-item>\n            </core-context-menu>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n<core-split-view>\n    <ion-content>\n        <ion-refresher [enabled]="eventsLoaded" (ionRefresh)="doRefresh($event)">\n            <ion-refresher-content pullingText="{{ \'core.pulltorefresh\' | translate }}"></ion-refresher-content>\n        </ion-refresher>\n        <core-loading [hideUntil]="eventsLoaded">\n            <!-- There is data to be synchronized -->\n            <ion-card class="core-warning-card" icon-start *ngIf="hasOffline">\n                <ion-icon name="warning"></ion-icon> {{ \'core.hasdatatosync\' | translate:{$a: \'addon.calendar.calendar\' | translate} }}\n            </ion-card>\n\n            <core-empty-box *ngIf="!filteredEvents || !filteredEvents.length" icon="calendar" [message]="\'addon.calendar.noevents\' | translate">\n            </core-empty-box>\n\n            <ion-list *ngIf="filteredEvents && filteredEvents.length" no-margin>\n                <ng-container *ngFor="let event of filteredEvents">\n                    <ion-item-divider *ngIf="event.showDate">\n                        {{ event.timestart * 1000 | coreFormatDate: "strftimedayshort" }}\n                    </ion-item-divider>\n                    <a ion-item text-wrap [title]="event.name" (click)="gotoEvent(event.id)" [class.core-split-item-selected]="event.id == eventId" class="addon-calendar-event" [ngClass]="[\'addon-calendar-eventtype-\'+event.eventtype]">\n                        <img *ngIf="event.moduleIcon" src="{{event.moduleIcon}}" item-start class="core-module-icon">\n                        <core-icon *ngIf="event.eventIcon && !event.moduleIcon" [name]="event.eventIcon" item-start></core-icon>\n                        <h2><core-format-text [text]="event.name" [contextLevel]="event.contextLevel" [contextInstanceId]="event.contextInstanceId"></core-format-text></h2>\n                        <p>\n                            {{ event.timestart * 1000 | coreFormatDate: "strftimetime" }}\n                            <span *ngIf="event.timeduration && event.endsSameDay"> - {{ (event.timestart + event.timeduration) * 1000 | coreFormatDate: "strftimetime" }}</span>\n                            <span *ngIf="event.timeduration && !event.endsSameDay"> - {{ (event.timestart + event.timeduration) * 1000 | coreFormatDate: "strftimedatetimeshort" }}</span>\n                        </p>\n                        <ion-note *ngIf="event.offline && !event.deleted" item-end>\n                            <ion-icon name="time"></ion-icon>\n                            <span text-wrap>{{ \'core.notsent\' | translate }}</span>\n                        </ion-note>\n                        <ion-note *ngIf="event.deleted" item-end>\n                            <ion-icon name="trash"></ion-icon>\n                            <span text-wrap>{{ \'core.deletedoffline\' | translate }}</span>\n                        </ion-note>\n                    </a>\n                </ng-container>\n            </ion-list>\n\n            <core-infinite-loading [enabled]="canLoadMore" (action)="loadMoreEvents($event)" [error]="loadMoreError"></core-infinite-loading>\n        </core-loading>\n\n        <!-- Create a calendar event. -->\n        <ion-fab core-fab bottom end *ngIf="canCreate">\n            <button ion-fab (click)="openEdit()" [attr.aria-label]="\'addon.calendar.newevent\' | translate">\n                <ion-icon name="add"></ion-icon>\n            </button>\n        </ion-fab>\n    </ion-content>\n</core-split-view>'/*ion-inline-end:"/home/travis/build/moodlehq/moodlemobile2/src/addon/calendar/pages/list/list.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_11__providers_sites__["a" /* CoreSitesProvider */],
            __WEBPACK_IMPORTED_MODULE_17__ionic_native_network__["a" /* Network */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */],
            __WEBPACK_IMPORTED_MODULE_12__providers_local_notifications__["a" /* CoreLocalNotificationsProvider */],
            __WEBPACK_IMPORTED_MODULE_2__providers_calendar__["a" /* AddonCalendarProvider */],
            __WEBPACK_IMPORTED_MODULE_8__providers_utils_dom__["a" /* CoreDomUtilsProvider */],
            __WEBPACK_IMPORTED_MODULE_6__core_courses_providers_courses__["a" /* CoreCoursesProvider */],
            __WEBPACK_IMPORTED_MODULE_10__providers_utils_utils__["a" /* CoreUtilsProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_helper__["a" /* AddonCalendarHelperProvider */],
            __WEBPACK_IMPORTED_MODULE_7__core_courses_providers_helper__["a" /* CoreCoursesHelperProvider */],
            __WEBPACK_IMPORTED_MODULE_13__providers_events__["a" /* CoreEventsProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_14__providers_app__["a" /* CoreAppProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_calendar_offline__["a" /* AddonCalendarOfflineProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_calendar_sync__["a" /* AddonCalendarSyncProvider */],
            __WEBPACK_IMPORTED_MODULE_9__providers_utils_time__["a" /* CoreTimeUtilsProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* PopoverController */]])
    ], AddonCalendarListPage);
    return AddonCalendarListPage;
}());

//# sourceMappingURL=list.js.map

/***/ })

});
//# sourceMappingURL=133.js.map