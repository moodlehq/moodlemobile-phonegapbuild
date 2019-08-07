webpackJsonp([134],{

/***/ 2087:
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

// EXTERNAL MODULE: ./node_modules/@angular/forms/esm5/forms.js
var esm5_forms = __webpack_require__(22);

// EXTERNAL MODULE: ./src/providers/events.ts
var events = __webpack_require__(11);

// EXTERNAL MODULE: ./src/providers/groups.ts
var groups = __webpack_require__(67);

// EXTERNAL MODULE: ./src/providers/sites.ts
var sites = __webpack_require__(1);

// EXTERNAL MODULE: ./src/providers/sync.ts
var sync = __webpack_require__(75);

// EXTERNAL MODULE: ./src/providers/utils/dom.ts
var dom = __webpack_require__(4);

// EXTERNAL MODULE: ./src/providers/utils/text.ts
var utils_text = __webpack_require__(10);

// EXTERNAL MODULE: ./src/providers/utils/time.ts
var time = __webpack_require__(24);

// EXTERNAL MODULE: ./src/providers/utils/utils.ts
var utils_utils = __webpack_require__(2);

// EXTERNAL MODULE: ./src/core/courses/providers/courses.ts
var courses = __webpack_require__(51);

// EXTERNAL MODULE: ./src/components/split-view/split-view.ts
var split_view = __webpack_require__(26);

// EXTERNAL MODULE: ./src/components/rich-text-editor/rich-text-editor.ts
var rich_text_editor = __webpack_require__(245);

// EXTERNAL MODULE: ./src/addon/calendar/providers/calendar.ts
var calendar = __webpack_require__(211);

// EXTERNAL MODULE: ./src/addon/calendar/providers/calendar-offline.ts
var calendar_offline = __webpack_require__(365);

// EXTERNAL MODULE: ./src/addon/calendar/providers/helper.ts
var helper = __webpack_require__(713);

// EXTERNAL MODULE: ./src/addon/calendar/providers/calendar-sync.ts
var calendar_sync = __webpack_require__(473);

// CONCATENATED MODULE: ./src/addon/calendar/pages/edit-event/edit-event.ts
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



















/**
 * Page that displays a form to create/edit an event.
 */
var edit_event_AddonCalendarEditEventPage = /** @class */ (function () {
    function AddonCalendarEditEventPage(navParams, navCtrl, translate, domUtils, textUtils, timeUtils, eventsProvider, groupsProvider, sitesProvider, coursesProvider, utils, calendarProvider, calendarOffline, calendarHelper, calendarSync, fb, syncProvider, svComponent) {
        this.navCtrl = navCtrl;
        this.translate = translate;
        this.domUtils = domUtils;
        this.textUtils = textUtils;
        this.timeUtils = timeUtils;
        this.eventsProvider = eventsProvider;
        this.groupsProvider = groupsProvider;
        this.coursesProvider = coursesProvider;
        this.utils = utils;
        this.calendarProvider = calendarProvider;
        this.calendarOffline = calendarOffline;
        this.calendarHelper = calendarHelper;
        this.calendarSync = calendarSync;
        this.fb = fb;
        this.syncProvider = syncProvider;
        this.svComponent = svComponent;
        this.component = calendar["a" /* AddonCalendarProvider */].COMPONENT;
        this.loaded = false;
        this.hasOffline = false;
        this.eventTypes = [];
        this.categories = [];
        this.courses = [];
        this.groups = [];
        this.loadingGroups = false;
        this.courseGroupSet = false;
        this.advanced = false;
        this.isDestroyed = false;
        this.error = false;
        this.gotEventData = false;
        this.eventId = navParams.get('eventId');
        this.courseId = navParams.get('courseId');
        this.title = this.eventId ? 'addon.calendar.editevent' : 'addon.calendar.newevent';
        var timestamp = navParams.get('timestamp');
        this.currentSite = sitesProvider.getCurrentSite();
        this.errors = {
            required: this.translate.instant('core.required')
        };
        // Calculate format to use. ion-datetime doesn't support escaping characters ([]), so we remove them.
        this.dateFormat = this.timeUtils.convertPHPToMoment(this.translate.instant('core.strftimedatetimeshort'))
            .replace(/[\[\]]/g, '');
        // Initialize form variables.
        this.eventForm = new esm5_forms["g" /* FormGroup */]({});
        this.eventTypeControl = this.fb.control('', esm5_forms["u" /* Validators */].required);
        this.groupControl = this.fb.control('');
        this.descriptionControl = this.fb.control('');
        var currentDate = this.timeUtils.toDatetimeFormat(timestamp);
        this.eventForm.addControl('name', this.fb.control('', esm5_forms["u" /* Validators */].required));
        this.eventForm.addControl('timestart', this.fb.control(currentDate, esm5_forms["u" /* Validators */].required));
        this.eventForm.addControl('eventtype', this.eventTypeControl);
        this.eventForm.addControl('categoryid', this.fb.control(''));
        this.eventForm.addControl('courseid', this.fb.control(this.courseId));
        this.eventForm.addControl('groupcourseid', this.fb.control(''));
        this.eventForm.addControl('groupid', this.groupControl);
        this.eventForm.addControl('description', this.descriptionControl);
        this.eventForm.addControl('location', this.fb.control(''));
        this.eventForm.addControl('duration', this.fb.control(0));
        this.eventForm.addControl('timedurationuntil', this.fb.control(currentDate));
        this.eventForm.addControl('timedurationminutes', this.fb.control(''));
        this.eventForm.addControl('repeat', this.fb.control(false));
        this.eventForm.addControl('repeats', this.fb.control('1'));
        this.eventForm.addControl('repeateditall', this.fb.control(1));
    }
    /**
     * Component being initialized.
     */
    AddonCalendarEditEventPage.prototype.ngOnInit = function () {
        var _this = this;
        this.fetchData().finally(function () {
            _this.originalData = _this.utils.clone(_this.eventForm.value);
            _this.loaded = true;
        });
    };
    /**
     * Fetch the data needed to render the form.
     *
     * @param {boolean} [refresh] Whether it's refreshing data.
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonCalendarEditEventPage.prototype.fetchData = function (refresh) {
        var _this = this;
        var accessInfo;
        this.error = false;
        // Get access info.
        return this.calendarProvider.getAccessInformation(this.courseId).then(function (info) {
            accessInfo = info;
            return _this.calendarProvider.getAllowedEventTypes(_this.courseId);
        }).then(function (types) {
            _this.types = types;
            var promises = [], eventTypes = _this.calendarHelper.getEventTypeOptions(types);
            if (!eventTypes.length) {
                return Promise.reject(_this.translate.instant('addon.calendar.nopermissiontoupdatecalendar'));
            }
            if (_this.eventId && !_this.gotEventData) {
                // Editing an event, get the event data. Wait for sync first.
                promises.push(_this.calendarSync.waitForSync(calendar_sync["a" /* AddonCalendarSyncProvider */].SYNC_ID).then(function () {
                    // Do not block if the scope is already destroyed.
                    if (!_this.isDestroyed) {
                        _this.syncProvider.blockOperation(calendar["a" /* AddonCalendarProvider */].COMPONENT, _this.eventId);
                    }
                    var promises = [];
                    // Get the event offline data if there's any.
                    promises.push(_this.calendarOffline.getEvent(_this.eventId).then(function (event) {
                        _this.hasOffline = true;
                        return event;
                    }).catch(function () {
                        // No offline data.
                        _this.hasOffline = false;
                    }));
                    if (_this.eventId > 0) {
                        // It's an online event. get its data from server.
                        promises.push(_this.calendarProvider.getEventById(_this.eventId).then(function (event) {
                            _this.event = event;
                            if (event && event.repeatid) {
                                event.othereventscount = event.eventcount ? event.eventcount - 1 : '';
                            }
                            return event;
                        }));
                    }
                    return Promise.all(promises).then(function (result) {
                        _this.gotEventData = true;
                        var event = result[0] || result[1]; // Use offline data first.
                        if (event) {
                            // Load the data in the form.
                            return _this.loadEventData(event, !!result[0]);
                        }
                    });
                }));
            }
            if (types.category) {
                // Get the categories.
                promises.push(_this.coursesProvider.getCategories(0, true).then(function (cats) {
                    _this.categories = cats;
                }));
            }
            _this.showAll = _this.utils.isTrueOrOne(_this.currentSite.getStoredConfig('calendar_adminseesall')) &&
                accessInfo.canmanageentries;
            if (types.course || types.groups) {
                // Get the courses.
                var promise = _this.showAll ? _this.coursesProvider.getCoursesByField() : _this.coursesProvider.getUserCourses();
                promises.push(promise.then(function (courses) {
                    if (_this.showAll) {
                        // Remove site home from the list of courses.
                        var siteHomeId_1 = _this.currentSite.getSiteHomeId();
                        courses = courses.filter(function (course) {
                            return course.id != siteHomeId_1;
                        });
                    }
                    // Format the name of the courses.
                    var subPromises = [];
                    courses.forEach(function (course) {
                        subPromises.push(_this.textUtils.formatText(course.fullname).then(function (text) {
                            course.fullname = text;
                        }).catch(function () {
                            // Ignore errors.
                        }));
                    });
                    return Promise.all(subPromises).then(function () {
                        // Sort courses by name.
                        _this.courses = courses.sort(function (a, b) {
                            var compareA = a.fullname.toLowerCase(), compareB = b.fullname.toLowerCase();
                            return compareA.localeCompare(compareB);
                        });
                    });
                }));
            }
            return Promise.all(promises).then(function () {
                if (!_this.eventTypeControl.value) {
                    // Initialize event type value. If course is allowed, select it first.
                    if (types.course) {
                        _this.eventTypeControl.setValue(calendar["a" /* AddonCalendarProvider */].TYPE_COURSE);
                    }
                    else {
                        _this.eventTypeControl.setValue(eventTypes[0].value);
                    }
                }
                _this.eventTypes = eventTypes;
            });
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'Error getting data.');
            _this.error = true;
            if (!_this.svComponent || !_this.svComponent.isOn()) {
                _this.originalData = null; // Avoid asking for confirmation.
                _this.navCtrl.pop();
            }
        });
    };
    /**
     * Load an event data into the form.
     *
     * @param {any} event Event data.
     * @param {boolean} isOffline Whether the data is from offline or not.
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonCalendarEditEventPage.prototype.loadEventData = function (event, isOffline) {
        var courseId = event.course ? event.course.id : event.courseid;
        this.eventForm.controls.name.setValue(event.name);
        this.eventForm.controls.timestart.setValue(this.timeUtils.toDatetimeFormat(event.timestart * 1000));
        this.eventForm.controls.eventtype.setValue(event.eventtype);
        this.eventForm.controls.categoryid.setValue(event.categoryid || '');
        this.eventForm.controls.courseid.setValue(courseId || '');
        this.eventForm.controls.groupcourseid.setValue(event.groupcourseid || courseId || '');
        this.eventForm.controls.groupid.setValue(event.groupid || '');
        this.eventForm.controls.description.setValue(event.description);
        this.eventForm.controls.location.setValue(event.location);
        if (isOffline) {
            // It's an offline event, use the data as it is.
            this.eventForm.controls.duration.setValue(event.duration);
            this.eventForm.controls.timedurationuntil.setValue(this.timeUtils.toDatetimeFormat((event.timedurationuntil * 1000) || Date.now()));
            this.eventForm.controls.timedurationminutes.setValue(event.timedurationminutes || '');
            this.eventForm.controls.repeat.setValue(!!event.repeat);
            this.eventForm.controls.repeats.setValue(event.repeats || '1');
            this.eventForm.controls.repeateditall.setValue(event.repeateditall || 1);
        }
        else {
            // Online event, we'll have to calculate the data.
            if (event.timeduration > 0) {
                this.eventForm.controls.duration.setValue(1);
                this.eventForm.controls.timedurationuntil.setValue(this.timeUtils.toDatetimeFormat((event.timestart + event.timeduration) * 1000));
            }
            else {
                // No duration.
                this.eventForm.controls.duration.setValue(0);
                this.eventForm.controls.timedurationuntil.setValue(this.timeUtils.toDatetimeFormat());
            }
            this.eventForm.controls.timedurationminutes.setValue('');
            this.eventForm.controls.repeat.setValue(!!event.repeatid);
            this.eventForm.controls.repeats.setValue(event.eventcount || '1');
            this.eventForm.controls.repeateditall.setValue(1);
        }
        if (event.eventtype == 'group' && courseId) {
            return this.loadGroups(courseId);
        }
        return Promise.resolve();
    };
    /**
     * Pull to refresh.
     *
     * @param {any} refresher Refresher.
     */
    AddonCalendarEditEventPage.prototype.refreshData = function (refresher) {
        var _this = this;
        var promises = [
            this.calendarProvider.invalidateAccessInformation(this.courseId),
            this.calendarProvider.invalidateAllowedEventTypes(this.courseId)
        ];
        if (this.types) {
            if (this.types.category) {
                promises.push(this.coursesProvider.invalidateCategories(0, true));
            }
            if (this.types.course || this.types.groups) {
                if (this.showAll) {
                    promises.push(this.coursesProvider.invalidateCoursesByField());
                }
                else {
                    promises.push(this.coursesProvider.invalidateUserCourses());
                }
            }
        }
        Promise.all(promises).finally(function () {
            _this.fetchData(true).finally(function () {
                refresher.complete();
            });
        });
    };
    /**
     * A course was selected, get its groups.
     *
     * @param {number} courseId Course ID.
     */
    AddonCalendarEditEventPage.prototype.groupCourseSelected = function (courseId) {
        var _this = this;
        if (!courseId) {
            return;
        }
        var modal = this.domUtils.showModalLoading();
        this.loadGroups(courseId).then(function () {
            _this.groupControl.setValue('');
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'Error getting data.');
        }).finally(function () {
            modal.dismiss();
        });
    };
    /**
     * Load groups of a certain course.
     *
     * @param {number} courseId Course ID.
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonCalendarEditEventPage.prototype.loadGroups = function (courseId) {
        var _this = this;
        this.loadingGroups = true;
        return this.groupsProvider.getUserGroupsInCourse(courseId).then(function (groups) {
            _this.groups = groups;
            _this.courseGroupSet = true;
        }).finally(function () {
            _this.loadingGroups = false;
        });
    };
    /**
     * Show or hide advanced form fields.
     */
    AddonCalendarEditEventPage.prototype.toggleAdvanced = function () {
        this.advanced = !this.advanced;
    };
    /**
     * Create the event.
     */
    AddonCalendarEditEventPage.prototype.submit = function () {
        var _this = this;
        // Validate data.
        var formData = this.eventForm.value, timeStartDate = this.timeUtils.datetimeToDate(formData.timestart), timeUntilDate = this.timeUtils.datetimeToDate(formData.timedurationuntil), timeDurationMinutes = parseInt(formData.timedurationminutes || '', 10);
        var error;
        if (formData.eventtype == calendar["a" /* AddonCalendarProvider */].TYPE_COURSE && !formData.courseid) {
            error = 'core.selectacourse';
        }
        else if (formData.eventtype == calendar["a" /* AddonCalendarProvider */].TYPE_GROUP && !formData.groupcourseid) {
            error = 'core.selectacourse';
        }
        else if (formData.eventtype == calendar["a" /* AddonCalendarProvider */].TYPE_GROUP && !formData.groupid) {
            error = 'core.selectagroup';
        }
        else if (formData.eventtype == calendar["a" /* AddonCalendarProvider */].TYPE_CATEGORY && !formData.categoryid) {
            error = 'core.selectacategory';
        }
        else if (formData.duration == 1 && timeStartDate.getTime() > timeUntilDate.getTime()) {
            error = 'addon.calendar.invalidtimedurationuntil';
        }
        else if (formData.duration == 2 && (isNaN(timeDurationMinutes) || timeDurationMinutes < 1)) {
            error = 'addon.calendar.invalidtimedurationminutes';
        }
        if (error) {
            // Show error and stop.
            this.domUtils.showErrorModal(this.translate.instant(error));
            return;
        }
        // Format the data to send.
        var data = {
            name: formData.name,
            eventtype: formData.eventtype,
            timestart: Math.floor(timeStartDate.getTime() / 1000),
            description: {
                text: formData.description,
                format: 1
            },
            location: formData.location,
            duration: formData.duration,
            repeat: formData.repeat
        };
        if (formData.eventtype == calendar["a" /* AddonCalendarProvider */].TYPE_COURSE) {
            data.courseid = formData.courseid;
        }
        else if (formData.eventtype == calendar["a" /* AddonCalendarProvider */].TYPE_GROUP) {
            data.groupcourseid = formData.groupcourseid;
            data.groupid = formData.groupid;
        }
        else if (formData.eventtype == calendar["a" /* AddonCalendarProvider */].TYPE_CATEGORY) {
            data.categoryid = formData.categoryid;
        }
        if (formData.duration == 1) {
            data.timedurationuntil = Math.floor(timeUntilDate.getTime() / 1000);
        }
        else if (formData.duration == 2) {
            data.timedurationminutes = formData.timedurationminutes;
        }
        if (formData.repeat) {
            data.repeats = formData.repeats;
        }
        if (this.event && this.event.repeatid) {
            data.repeatid = this.event.repeatid;
            data.repeateditall = formData.repeateditall;
        }
        // Send the data.
        var modal = this.domUtils.showModalLoading('core.sending', true);
        this.calendarProvider.submitEvent(this.eventId, data).then(function (result) {
            var numberOfRepetitions = formData.repeat ? formData.repeats :
                (data.repeateditall && _this.event.othereventscount ? _this.event.othereventscount + 1 : 1);
            _this.calendarHelper.invalidateRepeatedEventsOnCalendar(result.event, numberOfRepetitions).catch(function () {
                // Ignore errors.
            }).then(function () {
                _this.returnToList(result.event);
            });
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'Error sending data.');
        }).finally(function () {
            modal.dismiss();
        });
    };
    /**
     * Convenience function to update or return to event list depending on device.
     *
     * @param {number} [event] Event.
     */
    AddonCalendarEditEventPage.prototype.returnToList = function (event) {
        // Unblock the sync because the view will be destroyed and the sync process could be triggered before ngOnDestroy.
        this.unblockSync();
        if (this.eventId > 0) {
            // Editing an event.
            var data = {
                event: event
            };
            this.eventsProvider.trigger(calendar["a" /* AddonCalendarProvider */].EDIT_EVENT_EVENT, data, this.currentSite.getId());
        }
        else {
            if (event) {
                var data = {
                    event: event
                };
                this.eventsProvider.trigger(calendar["a" /* AddonCalendarProvider */].NEW_EVENT_EVENT, data, this.currentSite.getId());
            }
            else {
                this.eventsProvider.trigger(calendar["a" /* AddonCalendarProvider */].NEW_EVENT_DISCARDED_EVENT, {}, this.currentSite.getId());
            }
        }
        if (this.svComponent && this.svComponent.isOn()) {
            // Empty form.
            this.hasOffline = false;
            this.eventForm.reset(this.originalData);
            this.originalData = this.utils.clone(this.eventForm.value);
        }
        else {
            this.originalData = null; // Avoid asking for confirmation.
            this.navCtrl.pop();
        }
    };
    /**
     * Discard an offline saved discussion.
     */
    AddonCalendarEditEventPage.prototype.discard = function () {
        var _this = this;
        this.domUtils.showConfirm(this.translate.instant('core.areyousure')).then(function () {
            _this.calendarOffline.deleteEvent(_this.eventId).then(function () {
                _this.returnToList();
            }).catch(function () {
                // Shouldn't happen.
                _this.domUtils.showErrorModal('Error discarding event.');
            });
        }).catch(function () {
            // Cancelled.
        });
    };
    /**
     * Check if we can leave the page or not.
     *
     * @return {boolean|Promise<void>} Resolved if we can leave it, rejected if not.
     */
    AddonCalendarEditEventPage.prototype.ionViewCanLeave = function () {
        if (this.calendarHelper.hasEventDataChanged(this.eventForm.value, this.originalData)) {
            // Show confirmation if some data has been modified.
            return this.domUtils.showConfirm(this.translate.instant('core.confirmcanceledit'));
        }
        else {
            return Promise.resolve();
        }
    };
    AddonCalendarEditEventPage.prototype.unblockSync = function () {
        if (this.eventId) {
            this.syncProvider.unblockOperation(calendar["a" /* AddonCalendarProvider */].COMPONENT, this.eventId);
        }
    };
    /**
     * Page destroyed.
     */
    AddonCalendarEditEventPage.prototype.ngOnDestroy = function () {
        this.unblockSync();
        this.isDestroyed = true;
    };
    __decorate([
        Object(core["_9" /* ViewChild */])(rich_text_editor["a" /* CoreRichTextEditorComponent */]),
        __metadata("design:type", rich_text_editor["a" /* CoreRichTextEditorComponent */])
    ], AddonCalendarEditEventPage.prototype, "descriptionEditor", void 0);
    AddonCalendarEditEventPage = __decorate([
        Object(core["m" /* Component */])({
            selector: 'page-addon-calendar-edit-event',
            templateUrl: 'edit-event.html',
        }),
        __param(17, Object(core["N" /* Optional */])()),
        __metadata("design:paramtypes", [ionic_angular["t" /* NavParams */],
            ionic_angular["s" /* NavController */],
            _ngx_translate_core["c" /* TranslateService */],
            dom["a" /* CoreDomUtilsProvider */],
            utils_text["a" /* CoreTextUtilsProvider */],
            time["a" /* CoreTimeUtilsProvider */],
            events["a" /* CoreEventsProvider */],
            groups["a" /* CoreGroupsProvider */],
            sites["a" /* CoreSitesProvider */],
            courses["a" /* CoreCoursesProvider */],
            utils_utils["a" /* CoreUtilsProvider */],
            calendar["a" /* AddonCalendarProvider */],
            calendar_offline["a" /* AddonCalendarOfflineProvider */],
            helper["a" /* AddonCalendarHelperProvider */],
            calendar_sync["a" /* AddonCalendarSyncProvider */],
            esm5_forms["d" /* FormBuilder */],
            sync["a" /* CoreSyncProvider */],
            split_view["a" /* CoreSplitViewComponent */]])
    ], AddonCalendarEditEventPage);
    return AddonCalendarEditEventPage;
}());

//# sourceMappingURL=edit-event.js.map
// CONCATENATED MODULE: ./src/addon/calendar/pages/edit-event/edit-event.module.ts
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
var edit_event_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var edit_event_module_AddonCalendarEditEventPageModule = /** @class */ (function () {
    function AddonCalendarEditEventPageModule() {
    }
    AddonCalendarEditEventPageModule = edit_event_module___decorate([
        Object(core["I" /* NgModule */])({
            declarations: [
                edit_event_AddonCalendarEditEventPage,
            ],
            imports: [
                components_module["a" /* CoreComponentsModule */],
                directives_module["a" /* CoreDirectivesModule */],
                ionic_angular["l" /* IonicPageModule */].forChild(edit_event_AddonCalendarEditEventPage),
                _ngx_translate_core["b" /* TranslateModule */].forChild()
            ],
        })
    ], AddonCalendarEditEventPageModule);
    return AddonCalendarEditEventPageModule;
}());

//# sourceMappingURL=edit-event.module.js.map
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

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/option/option.js
var option_option = __webpack_require__(102);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.pipe.js
var translate_pipe = __webpack_require__(28);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.service.js
var translate_service = __webpack_require__(18);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item.ngfactory.js + 1 modules
var item_ngfactory = __webpack_require__(30);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item.js
var item = __webpack_require__(21);

// EXTERNAL MODULE: ./node_modules/ionic-angular/util/form.js
var util_form = __webpack_require__(20);

// EXTERNAL MODULE: ./node_modules/ionic-angular/config/config.js
var config = __webpack_require__(7);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-reorder.js + 1 modules
var item_reorder = __webpack_require__(27);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-content.js
var item_content = __webpack_require__(32);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/label/label.js
var label = __webpack_require__(63);

// EXTERNAL MODULE: ./src/components/mark-required/mark-required.ngfactory.js
var mark_required_ngfactory = __webpack_require__(88);

// EXTERNAL MODULE: ./src/components/mark-required/mark-required.ts
var mark_required = __webpack_require__(80);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/select/select.ngfactory.js
var select_ngfactory = __webpack_require__(120);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/select/select.js
var select_select = __webpack_require__(103);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/app/app.js + 3 modules
var app = __webpack_require__(34);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/deep-linker.js
var deep_linker = __webpack_require__(55);

// EXTERNAL MODULE: ./node_modules/@angular/common/esm5/common.js
var common = __webpack_require__(8);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/spinner/spinner.ngfactory.js
var spinner_ngfactory = __webpack_require__(128);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/spinner/spinner.js
var spinner = __webpack_require__(112);

// EXTERNAL MODULE: ./src/components/icon/icon.ngfactory.js
var icon_ngfactory = __webpack_require__(111);

// EXTERNAL MODULE: ./src/components/icon/icon.ts
var icon = __webpack_require__(94);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/input/input.ngfactory.js
var input_ngfactory = __webpack_require__(104);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/input/input.js
var input = __webpack_require__(84);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/platform.js + 1 modules
var platform = __webpack_require__(16);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.js
var content = __webpack_require__(25);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/dom-controller.js
var dom_controller = __webpack_require__(33);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/checkbox/checkbox.ngfactory.js
var checkbox_ngfactory = __webpack_require__(247);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/checkbox/checkbox.js
var checkbox_checkbox = __webpack_require__(195);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/radio/radio-group.js
var radio_group = __webpack_require__(137);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/radio/radio-button.ngfactory.js
var radio_button_ngfactory = __webpack_require__(185);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/radio/radio-button.js
var radio_button = __webpack_require__(144);

// EXTERNAL MODULE: ./src/components/rich-text-editor/rich-text-editor.ngfactory.js
var rich_text_editor_ngfactory = __webpack_require__(307);

// EXTERNAL MODULE: ./src/providers/utils/url.ts
var url = __webpack_require__(23);

// EXTERNAL MODULE: ./src/providers/filepool.ts
var filepool = __webpack_require__(17);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/datetime/datetime.ngfactory.js
var datetime_ngfactory = __webpack_require__(752);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/datetime/datetime.js + 1 modules
var datetime = __webpack_require__(316);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/picker/picker-controller.js
var picker_controller = __webpack_require__(255);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/grid/col.js
var col = __webpack_require__(118);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.ngfactory.js
var button_ngfactory = __webpack_require__(45);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.js
var button_button = __webpack_require__(42);

// EXTERNAL MODULE: ./src/components/input-errors/input-errors.ngfactory.js
var input_errors_ngfactory = __webpack_require__(98);

// EXTERNAL MODULE: ./src/components/input-errors/input-errors.ts
var input_errors = __webpack_require__(89);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-divider.js
var item_divider = __webpack_require__(93);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/grid/row.js
var row = __webpack_require__(117);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-header.js
var toolbar_header = __webpack_require__(468);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/view-controller.js
var view_controller = __webpack_require__(38);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/navbar.ngfactory.js
var navbar_ngfactory = __webpack_require__(1477);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/navbar.js
var navbar = __webpack_require__(221);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-controller.js
var nav_controller = __webpack_require__(19);

// EXTERNAL MODULE: ./src/directives/back-button.ts
var back_button = __webpack_require__(711);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.ngfactory.js
var toolbar_title_ngfactory = __webpack_require__(1478);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.js
var toolbar_title = __webpack_require__(364);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar.js
var toolbar = __webpack_require__(267);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.ngfactory.js
var content_ngfactory = __webpack_require__(176);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/keyboard.js
var keyboard = __webpack_require__(101);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/refresher/refresher.js
var refresher = __webpack_require__(151);

// EXTERNAL MODULE: ./node_modules/ionic-angular/gestures/gesture-controller.js
var gesture_controller = __webpack_require__(40);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/refresher/refresher-content.ngfactory.js
var refresher_content_ngfactory = __webpack_require__(207);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/refresher/refresher-content.js
var refresher_content = __webpack_require__(166);

// EXTERNAL MODULE: ./src/components/loading/loading.ngfactory.js
var loading_ngfactory = __webpack_require__(50);

// EXTERNAL MODULE: ./src/components/loading/loading.ts
var loading = __webpack_require__(47);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-params.js
var nav_params = __webpack_require__(70);

// CONCATENATED MODULE: ./src/addon/calendar/pages/edit-event/edit-event.ngfactory.js
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
















































































var styles_AddonCalendarEditEventPage = [];
var RenderType_AddonCalendarEditEventPage = core["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_AddonCalendarEditEventPage, data: {} });

function View_AddonCalendarEditEventPage_2(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 3, "ion-option", [], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, [[11, 4]], 0, option_option["a" /* Option */], [core["t" /* ElementRef */]], { value: [0, "value"] }, null), (_l()(), core["_55" /* ɵted */](2, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], function (_ck, _v) { var currVal_0 = _v.context.$implicit.value; _ck(_v, 1, 0, currVal_0); }, function (_ck, _v) { var currVal_1 = core["_56" /* ɵunv */](_v, 2, 0, core["_44" /* ɵnov */](_v, 3).transform(_v.context.$implicit.name)); _ck(_v, 2, 0, currVal_1); }); }
function View_AddonCalendarEditEventPage_4(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "ion-option", [], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, [[15, 4]], 0, option_option["a" /* Option */], [core["t" /* ElementRef */]], { value: [0, "value"] }, null), (_l()(), core["_55" /* ɵted */](2, null, ["", ""]))], function (_ck, _v) { var currVal_0 = _v.context.$implicit.id; _ck(_v, 1, 0, currVal_0); }, function (_ck, _v) { var currVal_1 = _v.context.$implicit.name; _ck(_v, 2, 0, currVal_1); }); }
function View_AddonCalendarEditEventPage_3(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 26, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 12, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 13, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 14, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 1, 5, "ion-label", [["id", "addon-calendar-category-label"]], null, null, null, null, null)), core["_30" /* ɵdid */](8, 16384, [[12, 4]], 0, label["a" /* Label */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, null], [8, null], [8, null]], { id: [0, "id"] }, null), (_l()(), core["_31" /* ɵeld */](9, 0, null, null, 3, "h2", [], null, null, null, mark_required_ngfactory["b" /* View_CoreMarkRequiredComponent_0 */], mark_required_ngfactory["a" /* RenderType_CoreMarkRequiredComponent */])), core["_30" /* ɵdid */](10, 4308992, null, 0, mark_required["a" /* CoreMarkRequiredComponent */], [core["t" /* ElementRef */], translate_service["a" /* TranslateService */], utils_text["a" /* CoreTextUtilsProvider */], utils_utils["a" /* CoreUtilsProvider */]], { coreMarkRequired: [0, "coreMarkRequired"] }, null), (_l()(), core["_55" /* ɵted */](11, 0, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](14, 0, null, 3, 11, "ion-select", [["aria-labelledby", "addon-calendar-category-label"], ["interface", "action-sheet"]], [[2, "select-disabled", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "click"], [null, "keyup.space"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (core["_44" /* ɵnov */](_v, 15)._click($event) !== false);
        ad = (pd_0 && ad);
    } if (("keyup.space" === en)) {
        var pd_1 = (core["_44" /* ɵnov */](_v, 15)._keyup() !== false);
        ad = (pd_1 && ad);
    } return ad; }, select_ngfactory["b" /* View_Select_0 */], select_ngfactory["a" /* RenderType_Select */])), core["_30" /* ɵdid */](15, 1228800, null, 1, select_select["a" /* Select */], [app["a" /* App */], util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item["a" /* Item */]], deep_linker["a" /* DeepLinker */]], { placeholder: [0, "placeholder"], interface: [1, "interface"] }, null), core["_52" /* ɵqud */](603979776, 15, { options: 1 }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), core["_50" /* ɵprd */](1024, null, esm5_forms["l" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [select_select["a" /* Select */]]), core["_30" /* ɵdid */](19, 671744, null, 0, esm5_forms["f" /* FormControlName */], [[3, esm5_forms["b" /* ControlContainer */]], [8, null], [8, null], [2, esm5_forms["l" /* NG_VALUE_ACCESSOR */]]], { name: [0, "name"] }, null), core["_50" /* ɵprd */](2048, null, esm5_forms["m" /* NgControl */], null, [esm5_forms["f" /* FormControlName */]]), core["_30" /* ɵdid */](21, 16384, null, 0, esm5_forms["n" /* NgControlStatus */], [esm5_forms["m" /* NgControl */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonCalendarEditEventPage_4)), core["_30" /* ɵdid */](24, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = "addon-calendar-category-label"; _ck(_v, 8, 0, currVal_0); var currVal_1 = true; _ck(_v, 10, 0, currVal_1); var currVal_11 = core["_56" /* ɵunv */](_v, 15, 0, core["_44" /* ɵnov */](_v, 17).transform("core.noselection")); var currVal_12 = "action-sheet"; _ck(_v, 15, 0, currVal_11, currVal_12); var currVal_13 = "categoryid"; _ck(_v, 19, 0, currVal_13); var currVal_14 = _co.categories; _ck(_v, 24, 0, currVal_14); }, function (_ck, _v) { var currVal_2 = core["_56" /* ɵunv */](_v, 11, 0, core["_44" /* ɵnov */](_v, 12).transform("core.category")); _ck(_v, 11, 0, currVal_2); var currVal_3 = core["_44" /* ɵnov */](_v, 15)._disabled; var currVal_4 = core["_44" /* ɵnov */](_v, 21).ngClassUntouched; var currVal_5 = core["_44" /* ɵnov */](_v, 21).ngClassTouched; var currVal_6 = core["_44" /* ɵnov */](_v, 21).ngClassPristine; var currVal_7 = core["_44" /* ɵnov */](_v, 21).ngClassDirty; var currVal_8 = core["_44" /* ɵnov */](_v, 21).ngClassValid; var currVal_9 = core["_44" /* ɵnov */](_v, 21).ngClassInvalid; var currVal_10 = core["_44" /* ɵnov */](_v, 21).ngClassPending; _ck(_v, 14, 0, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8, currVal_9, currVal_10); }); }
function View_AddonCalendarEditEventPage_6(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "ion-option", [], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, [[19, 4]], 0, option_option["a" /* Option */], [core["t" /* ElementRef */]], { value: [0, "value"] }, null), (_l()(), core["_55" /* ɵted */](2, null, ["", ""]))], function (_ck, _v) { var currVal_0 = _v.context.$implicit.id; _ck(_v, 1, 0, currVal_0); }, function (_ck, _v) { var currVal_1 = _v.context.$implicit.fullname; _ck(_v, 2, 0, currVal_1); }); }
function View_AddonCalendarEditEventPage_5(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 26, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 16, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 17, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 18, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 1, 5, "ion-label", [["id", "addon-calendar-course-label"]], null, null, null, null, null)), core["_30" /* ɵdid */](8, 16384, [[16, 4]], 0, label["a" /* Label */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, null], [8, null], [8, null]], { id: [0, "id"] }, null), (_l()(), core["_31" /* ɵeld */](9, 0, null, null, 3, "h2", [], null, null, null, mark_required_ngfactory["b" /* View_CoreMarkRequiredComponent_0 */], mark_required_ngfactory["a" /* RenderType_CoreMarkRequiredComponent */])), core["_30" /* ɵdid */](10, 4308992, null, 0, mark_required["a" /* CoreMarkRequiredComponent */], [core["t" /* ElementRef */], translate_service["a" /* TranslateService */], utils_text["a" /* CoreTextUtilsProvider */], utils_utils["a" /* CoreUtilsProvider */]], { coreMarkRequired: [0, "coreMarkRequired"] }, null), (_l()(), core["_55" /* ɵted */](11, 0, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](14, 0, null, 3, 11, "ion-select", [["aria-labelledby", "addon-calendar-course-label"], ["interface", "action-sheet"]], [[2, "select-disabled", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "click"], [null, "keyup.space"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (core["_44" /* ɵnov */](_v, 15)._click($event) !== false);
        ad = (pd_0 && ad);
    } if (("keyup.space" === en)) {
        var pd_1 = (core["_44" /* ɵnov */](_v, 15)._keyup() !== false);
        ad = (pd_1 && ad);
    } return ad; }, select_ngfactory["b" /* View_Select_0 */], select_ngfactory["a" /* RenderType_Select */])), core["_30" /* ɵdid */](15, 1228800, null, 1, select_select["a" /* Select */], [app["a" /* App */], util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item["a" /* Item */]], deep_linker["a" /* DeepLinker */]], { placeholder: [0, "placeholder"], interface: [1, "interface"] }, null), core["_52" /* ɵqud */](603979776, 19, { options: 1 }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), core["_50" /* ɵprd */](1024, null, esm5_forms["l" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [select_select["a" /* Select */]]), core["_30" /* ɵdid */](19, 671744, null, 0, esm5_forms["f" /* FormControlName */], [[3, esm5_forms["b" /* ControlContainer */]], [8, null], [8, null], [2, esm5_forms["l" /* NG_VALUE_ACCESSOR */]]], { name: [0, "name"] }, null), core["_50" /* ɵprd */](2048, null, esm5_forms["m" /* NgControl */], null, [esm5_forms["f" /* FormControlName */]]), core["_30" /* ɵdid */](21, 16384, null, 0, esm5_forms["n" /* NgControlStatus */], [esm5_forms["m" /* NgControl */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonCalendarEditEventPage_6)), core["_30" /* ɵdid */](24, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = "addon-calendar-course-label"; _ck(_v, 8, 0, currVal_0); var currVal_1 = true; _ck(_v, 10, 0, currVal_1); var currVal_11 = core["_56" /* ɵunv */](_v, 15, 0, core["_44" /* ɵnov */](_v, 17).transform("core.noselection")); var currVal_12 = "action-sheet"; _ck(_v, 15, 0, currVal_11, currVal_12); var currVal_13 = "courseid"; _ck(_v, 19, 0, currVal_13); var currVal_14 = _co.courses; _ck(_v, 24, 0, currVal_14); }, function (_ck, _v) { var currVal_2 = core["_56" /* ɵunv */](_v, 11, 0, core["_44" /* ɵnov */](_v, 12).transform("core.course")); _ck(_v, 11, 0, currVal_2); var currVal_3 = core["_44" /* ɵnov */](_v, 15)._disabled; var currVal_4 = core["_44" /* ɵnov */](_v, 21).ngClassUntouched; var currVal_5 = core["_44" /* ɵnov */](_v, 21).ngClassTouched; var currVal_6 = core["_44" /* ɵnov */](_v, 21).ngClassPristine; var currVal_7 = core["_44" /* ɵnov */](_v, 21).ngClassDirty; var currVal_8 = core["_44" /* ɵnov */](_v, 21).ngClassValid; var currVal_9 = core["_44" /* ɵnov */](_v, 21).ngClassInvalid; var currVal_10 = core["_44" /* ɵnov */](_v, 21).ngClassPending; _ck(_v, 14, 0, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8, currVal_9, currVal_10); }); }
function View_AddonCalendarEditEventPage_8(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "ion-option", [], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, [[23, 4]], 0, option_option["a" /* Option */], [core["t" /* ElementRef */]], { value: [0, "value"] }, null), (_l()(), core["_55" /* ɵted */](2, null, ["", ""]))], function (_ck, _v) { var currVal_0 = _v.context.$implicit.id; _ck(_v, 1, 0, currVal_0); }, function (_ck, _v) { var currVal_1 = _v.context.$implicit.fullname; _ck(_v, 2, 0, currVal_1); }); }
function View_AddonCalendarEditEventPage_9(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 10, "ion-item", [["class", "core-danger-item item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 24, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 25, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 26, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 2, 2, "p", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](8, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "]))], null, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 8, 0, core["_44" /* ɵnov */](_v, 9).transform("core.coursenogroups")); _ck(_v, 8, 0, currVal_0); }); }
function View_AddonCalendarEditEventPage_11(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "ion-option", [], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, [[30, 4]], 0, option_option["a" /* Option */], [core["t" /* ElementRef */]], { value: [0, "value"] }, null), (_l()(), core["_55" /* ɵted */](2, null, ["", ""]))], function (_ck, _v) { var currVal_0 = _v.context.$implicit.id; _ck(_v, 1, 0, currVal_0); }, function (_ck, _v) { var currVal_1 = _v.context.$implicit.name; _ck(_v, 2, 0, currVal_1); }); }
function View_AddonCalendarEditEventPage_10(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 26, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 27, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 28, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 29, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 1, 5, "ion-label", [["id", "addon-calendar-group-label"]], null, null, null, null, null)), core["_30" /* ɵdid */](8, 16384, [[27, 4]], 0, label["a" /* Label */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, null], [8, null], [8, null]], { id: [0, "id"] }, null), (_l()(), core["_31" /* ɵeld */](9, 0, null, null, 3, "h2", [], null, null, null, mark_required_ngfactory["b" /* View_CoreMarkRequiredComponent_0 */], mark_required_ngfactory["a" /* RenderType_CoreMarkRequiredComponent */])), core["_30" /* ɵdid */](10, 4308992, null, 0, mark_required["a" /* CoreMarkRequiredComponent */], [core["t" /* ElementRef */], translate_service["a" /* TranslateService */], utils_text["a" /* CoreTextUtilsProvider */], utils_utils["a" /* CoreUtilsProvider */]], { coreMarkRequired: [0, "coreMarkRequired"] }, null), (_l()(), core["_55" /* ɵted */](11, 0, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](14, 0, null, 3, 11, "ion-select", [["aria-labelledby", "addon-calendar-group-label"], ["interface", "action-sheet"]], [[2, "select-disabled", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "click"], [null, "keyup.space"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (core["_44" /* ɵnov */](_v, 15)._click($event) !== false);
        ad = (pd_0 && ad);
    } if (("keyup.space" === en)) {
        var pd_1 = (core["_44" /* ɵnov */](_v, 15)._keyup() !== false);
        ad = (pd_1 && ad);
    } return ad; }, select_ngfactory["b" /* View_Select_0 */], select_ngfactory["a" /* RenderType_Select */])), core["_30" /* ɵdid */](15, 1228800, null, 1, select_select["a" /* Select */], [app["a" /* App */], util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item["a" /* Item */]], deep_linker["a" /* DeepLinker */]], { placeholder: [0, "placeholder"], interface: [1, "interface"] }, null), core["_52" /* ɵqud */](603979776, 30, { options: 1 }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), core["_50" /* ɵprd */](1024, null, esm5_forms["l" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [select_select["a" /* Select */]]), core["_30" /* ɵdid */](19, 671744, null, 0, esm5_forms["f" /* FormControlName */], [[3, esm5_forms["b" /* ControlContainer */]], [8, null], [8, null], [2, esm5_forms["l" /* NG_VALUE_ACCESSOR */]]], { name: [0, "name"] }, null), core["_50" /* ɵprd */](2048, null, esm5_forms["m" /* NgControl */], null, [esm5_forms["f" /* FormControlName */]]), core["_30" /* ɵdid */](21, 16384, null, 0, esm5_forms["n" /* NgControlStatus */], [esm5_forms["m" /* NgControl */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonCalendarEditEventPage_11)), core["_30" /* ɵdid */](24, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = "addon-calendar-group-label"; _ck(_v, 8, 0, currVal_0); var currVal_1 = true; _ck(_v, 10, 0, currVal_1); var currVal_11 = core["_56" /* ɵunv */](_v, 15, 0, core["_44" /* ɵnov */](_v, 17).transform("core.noselection")); var currVal_12 = "action-sheet"; _ck(_v, 15, 0, currVal_11, currVal_12); var currVal_13 = "groupid"; _ck(_v, 19, 0, currVal_13); var currVal_14 = _co.groups; _ck(_v, 24, 0, currVal_14); }, function (_ck, _v) { var currVal_2 = core["_56" /* ɵunv */](_v, 11, 0, core["_44" /* ɵnov */](_v, 12).transform("core.group")); _ck(_v, 11, 0, currVal_2); var currVal_3 = core["_44" /* ɵnov */](_v, 15)._disabled; var currVal_4 = core["_44" /* ɵnov */](_v, 21).ngClassUntouched; var currVal_5 = core["_44" /* ɵnov */](_v, 21).ngClassTouched; var currVal_6 = core["_44" /* ɵnov */](_v, 21).ngClassPristine; var currVal_7 = core["_44" /* ɵnov */](_v, 21).ngClassDirty; var currVal_8 = core["_44" /* ɵnov */](_v, 21).ngClassValid; var currVal_9 = core["_44" /* ɵnov */](_v, 21).ngClassInvalid; var currVal_10 = core["_44" /* ɵnov */](_v, 21).ngClassPending; _ck(_v, 14, 0, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8, currVal_9, currVal_10); }); }
function View_AddonCalendarEditEventPage_13(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "ion-spinner", [], [[2, "spinner-paused", null]], null, null, spinner_ngfactory["b" /* View_Spinner_0 */], spinner_ngfactory["a" /* RenderType_Spinner */])), core["_30" /* ɵdid */](1, 114688, null, 0, spinner["a" /* Spinner */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 1)._paused; _ck(_v, 0, 0, currVal_0); }); }
function View_AddonCalendarEditEventPage_12(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 9, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 31, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 32, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 33, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, 2, 1, null, View_AddonCalendarEditEventPage_13)), core["_30" /* ɵdid */](8, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.loadingGroups; _ck(_v, 8, 0, currVal_0); }, null); }
function View_AddonCalendarEditEventPage_7(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 42, null, null, null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 26, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](4, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 20, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 21, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 22, { _icons: 1 }), core["_30" /* ɵdid */](8, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](10, 0, null, 1, 5, "ion-label", [["id", "addon-calendar-groupcourse-label"]], null, null, null, null, null)), core["_30" /* ɵdid */](11, 16384, [[20, 4]], 0, label["a" /* Label */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, null], [8, null], [8, null]], { id: [0, "id"] }, null), (_l()(), core["_31" /* ɵeld */](12, 0, null, null, 3, "h2", [], null, null, null, mark_required_ngfactory["b" /* View_CoreMarkRequiredComponent_0 */], mark_required_ngfactory["a" /* RenderType_CoreMarkRequiredComponent */])), core["_30" /* ɵdid */](13, 4308992, null, 0, mark_required["a" /* CoreMarkRequiredComponent */], [core["t" /* ElementRef */], translate_service["a" /* TranslateService */], utils_text["a" /* CoreTextUtilsProvider */], utils_utils["a" /* CoreUtilsProvider */]], { coreMarkRequired: [0, "coreMarkRequired"] }, null), (_l()(), core["_55" /* ɵted */](14, 0, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](17, 0, null, 3, 11, "ion-select", [["aria-labelledby", "addon-calendar-groupcourse-label"], ["interface", "action-sheet"]], [[2, "select-disabled", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ionChange"], [null, "click"], [null, "keyup.space"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (core["_44" /* ɵnov */](_v, 18)._click($event) !== false);
        ad = (pd_0 && ad);
    } if (("keyup.space" === en)) {
        var pd_1 = (core["_44" /* ɵnov */](_v, 18)._keyup() !== false);
        ad = (pd_1 && ad);
    } if (("ionChange" === en)) {
        var pd_2 = (_co.groupCourseSelected($event) !== false);
        ad = (pd_2 && ad);
    } return ad; }, select_ngfactory["b" /* View_Select_0 */], select_ngfactory["a" /* RenderType_Select */])), core["_30" /* ɵdid */](18, 1228800, null, 1, select_select["a" /* Select */], [app["a" /* App */], util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item["a" /* Item */]], deep_linker["a" /* DeepLinker */]], { placeholder: [0, "placeholder"], interface: [1, "interface"] }, { ionChange: "ionChange" }), core["_52" /* ɵqud */](603979776, 23, { options: 1 }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), core["_50" /* ɵprd */](1024, null, esm5_forms["l" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [select_select["a" /* Select */]]), core["_30" /* ɵdid */](22, 671744, null, 0, esm5_forms["f" /* FormControlName */], [[3, esm5_forms["b" /* ControlContainer */]], [8, null], [8, null], [2, esm5_forms["l" /* NG_VALUE_ACCESSOR */]]], { name: [0, "name"] }, null), core["_50" /* ɵprd */](2048, null, esm5_forms["m" /* NgControl */], null, [esm5_forms["f" /* FormControlName */]]), core["_30" /* ɵdid */](24, 16384, null, 0, esm5_forms["n" /* NgControlStatus */], [esm5_forms["m" /* NgControl */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonCalendarEditEventPage_8)), core["_30" /* ɵdid */](27, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonCalendarEditEventPage_9)), core["_30" /* ɵdid */](33, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonCalendarEditEventPage_10)), core["_30" /* ɵdid */](37, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonCalendarEditEventPage_12)), core["_30" /* ɵdid */](41, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = "addon-calendar-groupcourse-label"; _ck(_v, 11, 0, currVal_0); var currVal_1 = true; _ck(_v, 13, 0, currVal_1); var currVal_11 = core["_56" /* ɵunv */](_v, 18, 0, core["_44" /* ɵnov */](_v, 20).transform("core.noselection")); var currVal_12 = "action-sheet"; _ck(_v, 18, 0, currVal_11, currVal_12); var currVal_13 = "groupcourseid"; _ck(_v, 22, 0, currVal_13); var currVal_14 = _co.courses; _ck(_v, 27, 0, currVal_14); var currVal_15 = ((!_co.loadingGroups && _co.courseGroupSet) && !_co.groups.length); _ck(_v, 33, 0, currVal_15); var currVal_16 = (!_co.loadingGroups && (_co.groups.length > 0)); _ck(_v, 37, 0, currVal_16); var currVal_17 = _co.loadingGroups; _ck(_v, 41, 0, currVal_17); }, function (_ck, _v) { var currVal_2 = core["_56" /* ɵunv */](_v, 14, 0, core["_44" /* ɵnov */](_v, 15).transform("core.course")); _ck(_v, 14, 0, currVal_2); var currVal_3 = core["_44" /* ɵnov */](_v, 18)._disabled; var currVal_4 = core["_44" /* ɵnov */](_v, 24).ngClassUntouched; var currVal_5 = core["_44" /* ɵnov */](_v, 24).ngClassTouched; var currVal_6 = core["_44" /* ɵnov */](_v, 24).ngClassPristine; var currVal_7 = core["_44" /* ɵnov */](_v, 24).ngClassDirty; var currVal_8 = core["_44" /* ɵnov */](_v, 24).ngClassValid; var currVal_9 = core["_44" /* ɵnov */](_v, 24).ngClassInvalid; var currVal_10 = core["_44" /* ɵnov */](_v, 24).ngClassPending; _ck(_v, 17, 0, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8, currVal_9, currVal_10); }); }
function View_AddonCalendarEditEventPage_14(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "core-icon", [["item-start", ""], ["name", "fa-caret-right"]], null, null, null, icon_ngfactory["b" /* View_CoreIconComponent_0 */], icon_ngfactory["a" /* RenderType_CoreIconComponent */])), core["_30" /* ɵdid */](1, 704512, null, 0, icon["a" /* CoreIconComponent */], [core["t" /* ElementRef */], config["a" /* Config */]], { name: [0, "name"] }, null)], function (_ck, _v) { var currVal_0 = "fa-caret-right"; _ck(_v, 1, 0, currVal_0); }, null); }
function View_AddonCalendarEditEventPage_15(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "span", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](1, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], null, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 1, 0, core["_44" /* ɵnov */](_v, 2).transform("core.showmore")); _ck(_v, 1, 0, currVal_0); }); }
function View_AddonCalendarEditEventPage_16(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "core-icon", [["item-start", ""], ["name", "fa-caret-down"]], null, null, null, icon_ngfactory["b" /* View_CoreIconComponent_0 */], icon_ngfactory["a" /* RenderType_CoreIconComponent */])), core["_30" /* ɵdid */](1, 704512, null, 0, icon["a" /* CoreIconComponent */], [core["t" /* ElementRef */], config["a" /* Config */]], { name: [0, "name"] }, null)], function (_ck, _v) { var currVal_0 = "fa-caret-down"; _ck(_v, 1, 0, currVal_0); }, null); }
function View_AddonCalendarEditEventPage_17(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "span", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](1, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], null, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 1, 0, core["_44" /* ɵnov */](_v, 2).transform("core.showless")); _ck(_v, 1, 0, currVal_0); }); }
function View_AddonCalendarEditEventPage_20(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 18, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 65, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 66, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 67, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 1, 4, "ion-label", [["stacked", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](8, 16384, [[65, 4]], 0, label["a" /* Label */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, ""], [8, null], [8, null]], null, null), (_l()(), core["_31" /* ɵeld */](9, 0, null, null, 2, "h2", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](10, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](13, 0, null, 3, 4, "ion-input", [["name", "repeats"], ["type", "number"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], null, null, input_ngfactory["b" /* View_TextInput_0 */], input_ngfactory["a" /* RenderType_TextInput */])), core["_30" /* ɵdid */](14, 671744, null, 0, esm5_forms["f" /* FormControlName */], [[3, esm5_forms["b" /* ControlContainer */]], [8, null], [8, null], [8, null]], { name: [0, "name"] }, null), core["_50" /* ɵprd */](2048, null, esm5_forms["m" /* NgControl */], null, [esm5_forms["f" /* FormControlName */]]), core["_30" /* ɵdid */](16, 16384, null, 0, esm5_forms["n" /* NgControlStatus */], [esm5_forms["m" /* NgControl */]], null, null), core["_30" /* ɵdid */](17, 5423104, null, 0, input["a" /* TextInput */], [config["a" /* Config */], platform["a" /* Platform */], util_form["a" /* Form */], app["a" /* App */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, content["a" /* Content */]], [2, item["a" /* Item */]], [2, esm5_forms["m" /* NgControl */]], dom_controller["a" /* DomController */]], { type: [0, "type"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "]))], function (_ck, _v) { var currVal_8 = "repeats"; _ck(_v, 14, 0, currVal_8); var currVal_9 = "number"; _ck(_v, 17, 0, currVal_9); }, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 10, 0, core["_44" /* ɵnov */](_v, 11).transform("addon.calendar.repeatweeksl")); _ck(_v, 10, 0, currVal_0); var currVal_1 = core["_44" /* ɵnov */](_v, 16).ngClassUntouched; var currVal_2 = core["_44" /* ɵnov */](_v, 16).ngClassTouched; var currVal_3 = core["_44" /* ɵnov */](_v, 16).ngClassPristine; var currVal_4 = core["_44" /* ɵnov */](_v, 16).ngClassDirty; var currVal_5 = core["_44" /* ɵnov */](_v, 16).ngClassValid; var currVal_6 = core["_44" /* ɵnov */](_v, 16).ngClassInvalid; var currVal_7 = core["_44" /* ɵnov */](_v, 16).ngClassPending; _ck(_v, 13, 0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7); }); }
function View_AddonCalendarEditEventPage_19(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 25, null, null, null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](2, 0, null, null, 19, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](3, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 62, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 63, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 64, { _icons: 1 }), core["_30" /* ɵdid */](7, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](9, 0, null, 1, 4, "ion-label", [], null, null, null, null, null)), core["_30" /* ɵdid */](10, 16384, [[62, 4]], 0, label["a" /* Label */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, null], [8, null], [8, null]], null, null), (_l()(), core["_31" /* ɵeld */](11, 0, null, null, 2, "h2", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](12, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](15, 0, null, 4, 5, "ion-checkbox", [["item-end", ""]], [[2, "checkbox-disabled", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (core["_44" /* ɵnov */](_v, 16)._click($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, checkbox_ngfactory["b" /* View_Checkbox_0 */], checkbox_ngfactory["a" /* RenderType_Checkbox */])), core["_30" /* ɵdid */](16, 1228800, null, 0, checkbox_checkbox["a" /* Checkbox */], [config["a" /* Config */], util_form["a" /* Form */], [2, item["a" /* Item */]], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_50" /* ɵprd */](1024, null, esm5_forms["l" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [checkbox_checkbox["a" /* Checkbox */]]), core["_30" /* ɵdid */](18, 671744, null, 0, esm5_forms["f" /* FormControlName */], [[3, esm5_forms["b" /* ControlContainer */]], [8, null], [8, null], [2, esm5_forms["l" /* NG_VALUE_ACCESSOR */]]], { name: [0, "name"] }, null), core["_50" /* ɵprd */](2048, null, esm5_forms["m" /* NgControl */], null, [esm5_forms["f" /* FormControlName */]]), core["_30" /* ɵdid */](20, 16384, null, 0, esm5_forms["n" /* NgControlStatus */], [esm5_forms["m" /* NgControl */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonCalendarEditEventPage_20)), core["_30" /* ɵdid */](24, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "]))], function (_ck, _v) { var _co = _v.component; var currVal_9 = "repeat"; _ck(_v, 18, 0, currVal_9); var currVal_10 = _co.eventForm.controls.repeat.value; _ck(_v, 24, 0, currVal_10); }, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 12, 0, core["_44" /* ɵnov */](_v, 13).transform("addon.calendar.repeatevent")); _ck(_v, 12, 0, currVal_0); var currVal_1 = core["_44" /* ɵnov */](_v, 16)._disabled; var currVal_2 = core["_44" /* ɵnov */](_v, 20).ngClassUntouched; var currVal_3 = core["_44" /* ɵnov */](_v, 20).ngClassTouched; var currVal_4 = core["_44" /* ɵnov */](_v, 20).ngClassPristine; var currVal_5 = core["_44" /* ɵnov */](_v, 20).ngClassDirty; var currVal_6 = core["_44" /* ɵnov */](_v, 20).ngClassValid; var currVal_7 = core["_44" /* ɵnov */](_v, 20).ngClassInvalid; var currVal_8 = core["_44" /* ɵnov */](_v, 20).ngClassPending; _ck(_v, 15, 0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8); }); }
function View_AddonCalendarEditEventPage_21(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 50, "div", [["class", "addon-calendar-radio-container"], ["radio-group", ""], ["role", "radiogroup"], ["text-wrap", ""]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], null, null, null, null)), core["_30" /* ɵdid */](1, 1064960, null, 1, radio_group["a" /* RadioGroup */], [core["V" /* Renderer */], core["t" /* ElementRef */], core["j" /* ChangeDetectorRef */]], null, null), core["_52" /* ɵqud */](335544320, 68, { _header: 0 }), core["_50" /* ɵprd */](1024, null, esm5_forms["l" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [radio_group["a" /* RadioGroup */]]), core["_30" /* ɵdid */](4, 671744, null, 0, esm5_forms["f" /* FormControlName */], [[3, esm5_forms["b" /* ControlContainer */]], [8, null], [8, null], [2, esm5_forms["l" /* NG_VALUE_ACCESSOR */]]], { name: [0, "name"] }, null), core["_50" /* ɵprd */](2048, null, esm5_forms["m" /* NgControl */], null, [esm5_forms["f" /* FormControlName */]]), core["_30" /* ɵdid */](6, 16384, null, 0, esm5_forms["n" /* NgControlStatus */], [esm5_forms["m" /* NgControl */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](8, 0, null, null, 8, "ion-item", [["class", "addon-calendar-radio-title item item-block"]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](9, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 69, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 70, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 71, { _icons: 1 }), core["_30" /* ɵdid */](13, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_31" /* ɵeld */](14, 0, null, 2, 2, "h2", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](15, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](18, 0, null, null, 15, "ion-item", [["class", "item item-block"]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](19, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 72, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 73, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 74, { _icons: 1 }), core["_30" /* ɵdid */](23, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](25, 0, null, 1, 4, "ion-label", [], null, null, null, null, null)), core["_30" /* ɵdid */](26, 16384, [[72, 4]], 0, label["a" /* Label */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, null], [8, null], [8, null]], null, null), (_l()(), core["_55" /* ɵted */](27, null, ["", ""])), core["_48" /* ɵpod */](28, { $a: 0 }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](31, 0, null, 4, 1, "ion-radio", [], [[2, "radio-disabled", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (core["_44" /* ɵnov */](_v, 32)._click($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, radio_button_ngfactory["b" /* View_RadioButton_0 */], radio_button_ngfactory["a" /* RenderType_RadioButton */])), core["_30" /* ɵdid */](32, 245760, null, 0, radio_button["a" /* RadioButton */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item["a" /* Item */]], [2, radio_group["a" /* RadioGroup */]]], { value: [0, "value"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](35, 0, null, null, 14, "ion-item", [["class", "item item-block"]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](36, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 75, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 76, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 77, { _icons: 1 }), core["_30" /* ɵdid */](40, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](42, 0, null, 1, 3, "ion-label", [], null, null, null, null, null)), core["_30" /* ɵdid */](43, 16384, [[75, 4]], 0, label["a" /* Label */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, null], [8, null], [8, null]], null, null), (_l()(), core["_55" /* ɵted */](44, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](47, 0, null, 4, 1, "ion-radio", [], [[2, "radio-disabled", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (core["_44" /* ɵnov */](_v, 48)._click($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, radio_button_ngfactory["b" /* View_RadioButton_0 */], radio_button_ngfactory["a" /* RenderType_RadioButton */])), core["_30" /* ɵdid */](48, 245760, null, 0, radio_button["a" /* RadioButton */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item["a" /* Item */]], [2, radio_group["a" /* RadioGroup */]]], { value: [0, "value"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "]))], function (_ck, _v) { var currVal_7 = "repeateditall"; _ck(_v, 4, 0, currVal_7); var currVal_11 = 1; _ck(_v, 32, 0, currVal_11); var currVal_14 = 0; _ck(_v, 48, 0, currVal_14); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = core["_44" /* ɵnov */](_v, 6).ngClassUntouched; var currVal_1 = core["_44" /* ɵnov */](_v, 6).ngClassTouched; var currVal_2 = core["_44" /* ɵnov */](_v, 6).ngClassPristine; var currVal_3 = core["_44" /* ɵnov */](_v, 6).ngClassDirty; var currVal_4 = core["_44" /* ɵnov */](_v, 6).ngClassValid; var currVal_5 = core["_44" /* ɵnov */](_v, 6).ngClassInvalid; var currVal_6 = core["_44" /* ɵnov */](_v, 6).ngClassPending; _ck(_v, 0, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6); var currVal_8 = core["_56" /* ɵunv */](_v, 15, 0, core["_44" /* ɵnov */](_v, 16).transform("addon.calendar.repeatedevents")); _ck(_v, 15, 0, currVal_8); var currVal_9 = core["_56" /* ɵunv */](_v, 27, 0, core["_44" /* ɵnov */](_v, 29).transform("addon.calendar.repeateditall", _ck(_v, 28, 0, _co.event.othereventscount))); _ck(_v, 27, 0, currVal_9); var currVal_10 = core["_44" /* ɵnov */](_v, 32)._disabled; _ck(_v, 31, 0, currVal_10); var currVal_12 = core["_56" /* ɵunv */](_v, 44, 0, core["_44" /* ɵnov */](_v, 45).transform("addon.calendar.repeateditthis")); _ck(_v, 44, 0, currVal_12); var currVal_13 = core["_44" /* ɵnov */](_v, 48)._disabled; _ck(_v, 47, 0, currVal_13); }); }
function View_AddonCalendarEditEventPage_18(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 149, null, null, null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 16, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](4, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 37, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 38, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 39, { _icons: 1 }), core["_30" /* ɵdid */](8, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](10, 0, null, 1, 4, "ion-label", [["stacked", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](11, 16384, [[37, 4]], 0, label["a" /* Label */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, ""], [8, null], [8, null]], null, null), (_l()(), core["_31" /* ɵeld */](12, 0, null, null, 2, "h2", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](13, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](16, 0, null, 3, 2, "core-rich-text-editor", [["item-content", ""], ["name", "description"]], null, null, null, rich_text_editor_ngfactory["b" /* View_CoreRichTextEditorComponent_0 */], rich_text_editor_ngfactory["a" /* RenderType_CoreRichTextEditorComponent */])), core["_30" /* ɵdid */](17, 1228800, [[1, 4]], 0, rich_text_editor["a" /* CoreRichTextEditorComponent */], [dom["a" /* CoreDomUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], sites["a" /* CoreSitesProvider */], filepool["a" /* CoreFilepoolProvider */], [2, content["a" /* Content */]], core["t" /* ElementRef */], events["a" /* CoreEventsProvider */], utils_utils["a" /* CoreUtilsProvider */], platform["a" /* Platform */]], { placeholder: [0, "placeholder"], control: [1, "control"], name: [2, "name"], component: [3, "component"], componentId: [4, "componentId"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n                "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ɵeld */](22, 0, null, null, 19, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](23, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 40, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 41, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 42, { _icons: 1 }), core["_30" /* ɵdid */](27, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](29, 0, null, 1, 4, "ion-label", [["stacked", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](30, 16384, [[40, 4]], 0, label["a" /* Label */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, ""], [8, null], [8, null]], null, null), (_l()(), core["_31" /* ɵeld */](31, 0, null, null, 2, "h2", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](32, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](35, 0, null, 3, 5, "ion-input", [["name", "location"], ["type", "text"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], null, null, input_ngfactory["b" /* View_TextInput_0 */], input_ngfactory["a" /* RenderType_TextInput */])), core["_30" /* ɵdid */](36, 671744, null, 0, esm5_forms["f" /* FormControlName */], [[3, esm5_forms["b" /* ControlContainer */]], [8, null], [8, null], [8, null]], { name: [0, "name"] }, null), core["_50" /* ɵprd */](2048, null, esm5_forms["m" /* NgControl */], null, [esm5_forms["f" /* FormControlName */]]), core["_30" /* ɵdid */](38, 16384, null, 0, esm5_forms["n" /* NgControlStatus */], [esm5_forms["m" /* NgControl */]], null, null), core["_30" /* ɵdid */](39, 5423104, null, 0, input["a" /* TextInput */], [config["a" /* Config */], platform["a" /* Platform */], util_form["a" /* Form */], app["a" /* App */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, content["a" /* Content */]], [2, item["a" /* Item */]], [2, esm5_forms["m" /* NgControl */]], dom_controller["a" /* DomController */]], { type: [0, "type"], placeholder: [1, "placeholder"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n                "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ɵeld */](44, 0, null, null, 96, "div", [["class", "addon-calendar-radio-container"], ["radio-group", ""], ["role", "radiogroup"], ["text-wrap", ""]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], null, null, null, null)), core["_30" /* ɵdid */](45, 1064960, null, 1, radio_group["a" /* RadioGroup */], [core["V" /* Renderer */], core["t" /* ElementRef */], core["j" /* ChangeDetectorRef */]], null, null), core["_52" /* ɵqud */](335544320, 43, { _header: 0 }), core["_50" /* ɵprd */](1024, null, esm5_forms["l" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [radio_group["a" /* RadioGroup */]]), core["_30" /* ɵdid */](48, 671744, null, 0, esm5_forms["f" /* FormControlName */], [[3, esm5_forms["b" /* ControlContainer */]], [8, null], [8, null], [2, esm5_forms["l" /* NG_VALUE_ACCESSOR */]]], { name: [0, "name"] }, null), core["_50" /* ɵprd */](2048, null, esm5_forms["m" /* NgControl */], null, [esm5_forms["f" /* FormControlName */]]), core["_30" /* ɵdid */](50, 16384, null, 0, esm5_forms["n" /* NgControlStatus */], [esm5_forms["m" /* NgControl */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](52, 0, null, null, 8, "ion-item", [["class", "addon-calendar-radio-title item item-block"]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](53, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 44, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 45, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 46, { _icons: 1 }), core["_30" /* ɵdid */](57, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_31" /* ɵeld */](58, 0, null, 2, 2, "h2", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](59, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](62, 0, null, null, 14, "ion-item", [["class", "item item-block"]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](63, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 47, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 48, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 49, { _icons: 1 }), core["_30" /* ɵdid */](67, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](69, 0, null, 1, 3, "ion-label", [], null, null, null, null, null)), core["_30" /* ɵdid */](70, 16384, [[47, 4]], 0, label["a" /* Label */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, null], [8, null], [8, null]], null, null), (_l()(), core["_55" /* ɵted */](71, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](74, 0, null, 4, 1, "ion-radio", [], [[2, "radio-disabled", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (core["_44" /* ɵnov */](_v, 75)._click($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, radio_button_ngfactory["b" /* View_RadioButton_0 */], radio_button_ngfactory["a" /* RenderType_RadioButton */])), core["_30" /* ɵdid */](75, 245760, null, 0, radio_button["a" /* RadioButton */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item["a" /* Item */]], [2, radio_group["a" /* RadioGroup */]]], { value: [0, "value"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](78, 0, null, null, 14, "ion-item", [["class", "item item-block"]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](79, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 50, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 51, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 52, { _icons: 1 }), core["_30" /* ɵdid */](83, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](85, 0, null, 1, 3, "ion-label", [], null, null, null, null, null)), core["_30" /* ɵdid */](86, 16384, [[50, 4]], 0, label["a" /* Label */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, null], [8, null], [8, null]], null, null), (_l()(), core["_55" /* ɵted */](87, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](90, 0, null, 4, 1, "ion-radio", [], [[2, "radio-disabled", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (core["_44" /* ɵnov */](_v, 91)._click($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, radio_button_ngfactory["b" /* View_RadioButton_0 */], radio_button_ngfactory["a" /* RenderType_RadioButton */])), core["_30" /* ɵdid */](91, 245760, null, 0, radio_button["a" /* RadioButton */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item["a" /* Item */]], [2, radio_group["a" /* RadioGroup */]]], { value: [0, "value"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](94, 0, null, null, 14, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](95, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 53, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 54, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 55, { _icons: 1 }), core["_30" /* ɵdid */](99, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](101, 0, null, 3, 6, "ion-datetime", [], [[2, "datetime-disabled", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "click"], [null, "keyup.space"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (core["_44" /* ɵnov */](_v, 102)._click($event) !== false);
        ad = (pd_0 && ad);
    } if (("keyup.space" === en)) {
        var pd_1 = (core["_44" /* ɵnov */](_v, 102)._keyup() !== false);
        ad = (pd_1 && ad);
    } return ad; }, datetime_ngfactory["b" /* View_DateTime_0 */], datetime_ngfactory["a" /* RenderType_DateTime */])), core["_30" /* ɵdid */](102, 1228800, null, 0, datetime["a" /* DateTime */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item["a" /* Item */]], [2, picker_controller["a" /* PickerController */]]], { disabled: [0, "disabled"], displayFormat: [1, "displayFormat"], placeholder: [2, "placeholder"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), core["_50" /* ɵprd */](1024, null, esm5_forms["l" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [datetime["a" /* DateTime */]]), core["_30" /* ɵdid */](105, 671744, null, 0, esm5_forms["f" /* FormControlName */], [[3, esm5_forms["b" /* ControlContainer */]], [8, null], [8, null], [2, esm5_forms["l" /* NG_VALUE_ACCESSOR */]]], { name: [0, "name"], isDisabled: [1, "isDisabled"] }, null), core["_50" /* ɵprd */](2048, null, esm5_forms["m" /* NgControl */], null, [esm5_forms["f" /* FormControlName */]]), core["_30" /* ɵdid */](107, 16384, null, 0, esm5_forms["n" /* NgControlStatus */], [esm5_forms["m" /* NgControl */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](110, 0, null, null, 14, "ion-item", [["class", "item item-block"]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](111, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 56, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 57, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 58, { _icons: 1 }), core["_30" /* ɵdid */](115, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](117, 0, null, 1, 3, "ion-label", [], null, null, null, null, null)), core["_30" /* ɵdid */](118, 16384, [[56, 4]], 0, label["a" /* Label */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, null], [8, null], [8, null]], null, null), (_l()(), core["_55" /* ɵted */](119, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](122, 0, null, 4, 1, "ion-radio", [], [[2, "radio-disabled", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (core["_44" /* ɵnov */](_v, 123)._click($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, radio_button_ngfactory["b" /* View_RadioButton_0 */], radio_button_ngfactory["a" /* RenderType_RadioButton */])), core["_30" /* ɵdid */](123, 245760, null, 0, radio_button["a" /* RadioButton */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item["a" /* Item */]], [2, radio_group["a" /* RadioGroup */]]], { value: [0, "value"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](126, 0, null, null, 13, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](127, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 59, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 60, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 61, { _icons: 1 }), core["_30" /* ɵdid */](131, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](133, 0, null, 3, 5, "ion-input", [["name", "timedurationminutes"], ["type", "number"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], null, null, input_ngfactory["b" /* View_TextInput_0 */], input_ngfactory["a" /* RenderType_TextInput */])), core["_30" /* ɵdid */](134, 671744, null, 0, esm5_forms["f" /* FormControlName */], [[3, esm5_forms["b" /* ControlContainer */]], [8, null], [8, null], [8, null]], { name: [0, "name"], isDisabled: [1, "isDisabled"] }, null), core["_50" /* ɵprd */](2048, null, esm5_forms["m" /* NgControl */], null, [esm5_forms["f" /* FormControlName */]]), core["_30" /* ɵdid */](136, 16384, null, 0, esm5_forms["n" /* NgControlStatus */], [esm5_forms["m" /* NgControl */]], null, null), core["_30" /* ɵdid */](137, 5423104, null, 0, input["a" /* TextInput */], [config["a" /* Config */], platform["a" /* Platform */], util_form["a" /* Form */], app["a" /* App */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, content["a" /* Content */]], [2, item["a" /* Item */]], [2, esm5_forms["m" /* NgControl */]], dom_controller["a" /* DomController */]], { disabled: [0, "disabled"], type: [1, "type"], placeholder: [2, "placeholder"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n                "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonCalendarEditEventPage_19)), core["_30" /* ɵdid */](144, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n                "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonCalendarEditEventPage_21)), core["_30" /* ɵdid */](148, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "]))], function (_ck, _v) { var _co = _v.component; var currVal_1 = core["_56" /* ɵunv */](_v, 17, 0, core["_44" /* ɵnov */](_v, 18).transform("core.description")); var currVal_2 = _co.descriptionControl; var currVal_3 = "description"; var currVal_4 = _co.component; var currVal_5 = _co.eventId; _ck(_v, 17, 0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5); var currVal_14 = "location"; _ck(_v, 36, 0, currVal_14); var currVal_15 = "text"; var currVal_16 = core["_56" /* ɵunv */](_v, 39, 1, core["_44" /* ɵnov */](_v, 40).transform("core.location")); _ck(_v, 39, 0, currVal_15, currVal_16); var currVal_24 = "duration"; _ck(_v, 48, 0, currVal_24); var currVal_28 = 0; _ck(_v, 75, 0, currVal_28); var currVal_31 = 1; _ck(_v, 91, 0, currVal_31); var currVal_40 = (_co.eventForm.controls.duration.value != 1); var currVal_41 = _co.dateFormat; var currVal_42 = core["_56" /* ɵunv */](_v, 102, 2, core["_44" /* ɵnov */](_v, 103).transform("addon.calendar.durationuntil")); _ck(_v, 102, 0, currVal_40, currVal_41, currVal_42); var currVal_43 = "timedurationuntil"; var currVal_44 = (_co.eventForm.controls.duration.value != 1); _ck(_v, 105, 0, currVal_43, currVal_44); var currVal_47 = 2; _ck(_v, 123, 0, currVal_47); var currVal_55 = "timedurationminutes"; var currVal_56 = (_co.eventForm.controls.duration.value != 2); _ck(_v, 134, 0, currVal_55, currVal_56); var currVal_57 = (_co.eventForm.controls.duration.value != 2); var currVal_58 = "number"; var currVal_59 = core["_56" /* ɵunv */](_v, 137, 2, core["_44" /* ɵnov */](_v, 138).transform("addon.calendar.durationminutes")); _ck(_v, 137, 0, currVal_57, currVal_58, currVal_59); var currVal_60 = (!_co.eventId || (_co.eventId < 0)); _ck(_v, 144, 0, currVal_60); var currVal_61 = (_co.event && _co.event.repeatid); _ck(_v, 148, 0, currVal_61); }, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 13, 0, core["_44" /* ɵnov */](_v, 14).transform("core.description")); _ck(_v, 13, 0, currVal_0); var currVal_6 = core["_56" /* ɵunv */](_v, 32, 0, core["_44" /* ɵnov */](_v, 33).transform("core.location")); _ck(_v, 32, 0, currVal_6); var currVal_7 = core["_44" /* ɵnov */](_v, 38).ngClassUntouched; var currVal_8 = core["_44" /* ɵnov */](_v, 38).ngClassTouched; var currVal_9 = core["_44" /* ɵnov */](_v, 38).ngClassPristine; var currVal_10 = core["_44" /* ɵnov */](_v, 38).ngClassDirty; var currVal_11 = core["_44" /* ɵnov */](_v, 38).ngClassValid; var currVal_12 = core["_44" /* ɵnov */](_v, 38).ngClassInvalid; var currVal_13 = core["_44" /* ɵnov */](_v, 38).ngClassPending; _ck(_v, 35, 0, currVal_7, currVal_8, currVal_9, currVal_10, currVal_11, currVal_12, currVal_13); var currVal_17 = core["_44" /* ɵnov */](_v, 50).ngClassUntouched; var currVal_18 = core["_44" /* ɵnov */](_v, 50).ngClassTouched; var currVal_19 = core["_44" /* ɵnov */](_v, 50).ngClassPristine; var currVal_20 = core["_44" /* ɵnov */](_v, 50).ngClassDirty; var currVal_21 = core["_44" /* ɵnov */](_v, 50).ngClassValid; var currVal_22 = core["_44" /* ɵnov */](_v, 50).ngClassInvalid; var currVal_23 = core["_44" /* ɵnov */](_v, 50).ngClassPending; _ck(_v, 44, 0, currVal_17, currVal_18, currVal_19, currVal_20, currVal_21, currVal_22, currVal_23); var currVal_25 = core["_56" /* ɵunv */](_v, 59, 0, core["_44" /* ɵnov */](_v, 60).transform("addon.calendar.eventduration")); _ck(_v, 59, 0, currVal_25); var currVal_26 = core["_56" /* ɵunv */](_v, 71, 0, core["_44" /* ɵnov */](_v, 72).transform("addon.calendar.durationnone")); _ck(_v, 71, 0, currVal_26); var currVal_27 = core["_44" /* ɵnov */](_v, 75)._disabled; _ck(_v, 74, 0, currVal_27); var currVal_29 = core["_56" /* ɵunv */](_v, 87, 0, core["_44" /* ɵnov */](_v, 88).transform("addon.calendar.durationuntil")); _ck(_v, 87, 0, currVal_29); var currVal_30 = core["_44" /* ɵnov */](_v, 91)._disabled; _ck(_v, 90, 0, currVal_30); var currVal_32 = core["_44" /* ɵnov */](_v, 102)._disabled; var currVal_33 = core["_44" /* ɵnov */](_v, 107).ngClassUntouched; var currVal_34 = core["_44" /* ɵnov */](_v, 107).ngClassTouched; var currVal_35 = core["_44" /* ɵnov */](_v, 107).ngClassPristine; var currVal_36 = core["_44" /* ɵnov */](_v, 107).ngClassDirty; var currVal_37 = core["_44" /* ɵnov */](_v, 107).ngClassValid; var currVal_38 = core["_44" /* ɵnov */](_v, 107).ngClassInvalid; var currVal_39 = core["_44" /* ɵnov */](_v, 107).ngClassPending; _ck(_v, 101, 0, currVal_32, currVal_33, currVal_34, currVal_35, currVal_36, currVal_37, currVal_38, currVal_39); var currVal_45 = core["_56" /* ɵunv */](_v, 119, 0, core["_44" /* ɵnov */](_v, 120).transform("addon.calendar.durationminutes")); _ck(_v, 119, 0, currVal_45); var currVal_46 = core["_44" /* ɵnov */](_v, 123)._disabled; _ck(_v, 122, 0, currVal_46); var currVal_48 = core["_44" /* ɵnov */](_v, 136).ngClassUntouched; var currVal_49 = core["_44" /* ɵnov */](_v, 136).ngClassTouched; var currVal_50 = core["_44" /* ɵnov */](_v, 136).ngClassPristine; var currVal_51 = core["_44" /* ɵnov */](_v, 136).ngClassDirty; var currVal_52 = core["_44" /* ɵnov */](_v, 136).ngClassValid; var currVal_53 = core["_44" /* ɵnov */](_v, 136).ngClassInvalid; var currVal_54 = core["_44" /* ɵnov */](_v, 136).ngClassPending; _ck(_v, 133, 0, currVal_48, currVal_49, currVal_50, currVal_51, currVal_52, currVal_53, currVal_54); }); }
function View_AddonCalendarEditEventPage_22(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 7, "ion-col", [["class", "col"]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, col["a" /* Col */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 3, "button", [["block", ""], ["color", "light"], ["ion-button", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.discard() !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](4, 1097728, null, 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { color: [0, "color"], block: [1, "block"] }, null), (_l()(), core["_55" /* ɵted */](5, 0, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "]))], function (_ck, _v) { var currVal_0 = "light"; var currVal_1 = ""; _ck(_v, 4, 0, currVal_0, currVal_1); }, function (_ck, _v) { var currVal_2 = core["_56" /* ɵunv */](_v, 5, 0, core["_44" /* ɵnov */](_v, 6).transform("core.discard")); _ck(_v, 5, 0, currVal_2); }); }
function View_AddonCalendarEditEventPage_1(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 146, "form", [["ion-list", ""], ["novalidate", ""]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "submit"], [null, "reset"]], function (_v, en, $event) { var ad = true; if (("submit" === en)) {
        var pd_0 = (core["_44" /* ɵnov */](_v, 2).onSubmit($event) !== false);
        ad = (pd_0 && ad);
    } if (("reset" === en)) {
        var pd_1 = (core["_44" /* ɵnov */](_v, 2).onReset() !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, esm5_forms["w" /* ɵbf */], [], null, null), core["_30" /* ɵdid */](2, 540672, null, 0, esm5_forms["h" /* FormGroupDirective */], [[8, null], [8, null]], { form: [0, "form"] }, null), core["_50" /* ɵprd */](2048, null, esm5_forms["b" /* ControlContainer */], null, [esm5_forms["h" /* FormGroupDirective */]]), core["_30" /* ɵdid */](4, 16384, null, 0, esm5_forms["o" /* NgControlStatusGroup */], [esm5_forms["b" /* ControlContainer */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, null, 23, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](8, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 2, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 3, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 4, { _icons: 1 }), core["_30" /* ɵdid */](12, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](14, 0, null, 1, 5, "ion-label", [["stacked", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](15, 16384, [[2, 4]], 0, label["a" /* Label */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, ""], [8, null], [8, null]], null, null), (_l()(), core["_31" /* ɵeld */](16, 0, null, null, 3, "h2", [], null, null, null, mark_required_ngfactory["b" /* View_CoreMarkRequiredComponent_0 */], mark_required_ngfactory["a" /* RenderType_CoreMarkRequiredComponent */])), core["_30" /* ɵdid */](17, 4308992, null, 0, mark_required["a" /* CoreMarkRequiredComponent */], [core["t" /* ElementRef */], translate_service["a" /* TranslateService */], utils_text["a" /* CoreTextUtilsProvider */], utils_utils["a" /* CoreUtilsProvider */]], { coreMarkRequired: [0, "coreMarkRequired"] }, null), (_l()(), core["_55" /* ɵted */](18, 0, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](21, 0, null, 3, 5, "ion-input", [["name", "name"], ["type", "text"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], null, null, input_ngfactory["b" /* View_TextInput_0 */], input_ngfactory["a" /* RenderType_TextInput */])), core["_30" /* ɵdid */](22, 671744, null, 0, esm5_forms["f" /* FormControlName */], [[3, esm5_forms["b" /* ControlContainer */]], [8, null], [8, null], [8, null]], { name: [0, "name"] }, null), core["_50" /* ɵprd */](2048, null, esm5_forms["m" /* NgControl */], null, [esm5_forms["f" /* FormControlName */]]), core["_30" /* ɵdid */](24, 16384, null, 0, esm5_forms["n" /* NgControlStatus */], [esm5_forms["m" /* NgControl */]], null, null), core["_30" /* ɵdid */](25, 5423104, null, 0, input["a" /* TextInput */], [config["a" /* Config */], platform["a" /* Platform */], util_form["a" /* Form */], app["a" /* App */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, content["a" /* Content */]], [2, item["a" /* Item */]], [2, esm5_forms["m" /* NgControl */]], dom_controller["a" /* DomController */]], { type: [0, "type"], placeholder: [1, "placeholder"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](28, 0, null, 3, 1, "core-input-errors", [["item-content", ""]], null, null, null, input_errors_ngfactory["b" /* View_CoreInputErrorsComponent_0 */], input_errors_ngfactory["a" /* RenderType_CoreInputErrorsComponent */])), core["_30" /* ɵdid */](29, 638976, null, 0, input_errors["a" /* CoreInputErrorsComponent */], [translate_service["a" /* TranslateService */]], { formControl: [0, "formControl"], errorMessages: [1, "errorMessages"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](33, 0, null, null, 24, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](34, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 5, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 6, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 7, { _icons: 1 }), core["_30" /* ɵdid */](38, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](40, 0, null, 1, 5, "ion-label", [["stacked", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](41, 16384, [[5, 4]], 0, label["a" /* Label */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, ""], [8, null], [8, null]], null, null), (_l()(), core["_31" /* ɵeld */](42, 0, null, null, 3, "h2", [], null, null, null, mark_required_ngfactory["b" /* View_CoreMarkRequiredComponent_0 */], mark_required_ngfactory["a" /* RenderType_CoreMarkRequiredComponent */])), core["_30" /* ɵdid */](43, 4308992, null, 0, mark_required["a" /* CoreMarkRequiredComponent */], [core["t" /* ElementRef */], translate_service["a" /* TranslateService */], utils_text["a" /* CoreTextUtilsProvider */], utils_utils["a" /* CoreUtilsProvider */]], { coreMarkRequired: [0, "coreMarkRequired"] }, null), (_l()(), core["_55" /* ɵted */](44, 0, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](47, 0, null, 3, 6, "ion-datetime", [], [[2, "datetime-disabled", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "click"], [null, "keyup.space"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (core["_44" /* ɵnov */](_v, 48)._click($event) !== false);
        ad = (pd_0 && ad);
    } if (("keyup.space" === en)) {
        var pd_1 = (core["_44" /* ɵnov */](_v, 48)._keyup() !== false);
        ad = (pd_1 && ad);
    } return ad; }, datetime_ngfactory["b" /* View_DateTime_0 */], datetime_ngfactory["a" /* RenderType_DateTime */])), core["_30" /* ɵdid */](48, 1228800, null, 0, datetime["a" /* DateTime */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item["a" /* Item */]], [2, picker_controller["a" /* PickerController */]]], { displayFormat: [0, "displayFormat"], placeholder: [1, "placeholder"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), core["_50" /* ɵprd */](1024, null, esm5_forms["l" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [datetime["a" /* DateTime */]]), core["_30" /* ɵdid */](51, 671744, null, 0, esm5_forms["f" /* FormControlName */], [[3, esm5_forms["b" /* ControlContainer */]], [8, null], [8, null], [2, esm5_forms["l" /* NG_VALUE_ACCESSOR */]]], { name: [0, "name"] }, null), core["_50" /* ɵprd */](2048, null, esm5_forms["m" /* NgControl */], null, [esm5_forms["f" /* FormControlName */]]), core["_30" /* ɵdid */](53, 16384, null, 0, esm5_forms["n" /* NgControlStatus */], [esm5_forms["m" /* NgControl */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](55, 0, null, 3, 1, "core-input-errors", [["item-content", ""]], null, null, null, input_errors_ngfactory["b" /* View_CoreInputErrorsComponent_0 */], input_errors_ngfactory["a" /* RenderType_CoreInputErrorsComponent */])), core["_30" /* ɵdid */](56, 638976, null, 0, input_errors["a" /* CoreInputErrorsComponent */], [translate_service["a" /* TranslateService */]], { formControl: [0, "formControl"], errorMessages: [1, "errorMessages"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](60, 0, null, null, 25, "ion-item", [["class", "addon-calendar-eventtype-container item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](61, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 8, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 9, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 10, { _icons: 1 }), core["_30" /* ɵdid */](65, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](67, 0, null, 1, 5, "ion-label", [["id", "addon-calendar-eventtype-label"]], null, null, null, null, null)), core["_30" /* ɵdid */](68, 16384, [[8, 4]], 0, label["a" /* Label */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, null], [8, null], [8, null]], { id: [0, "id"] }, null), (_l()(), core["_31" /* ɵeld */](69, 0, null, null, 3, "h2", [], null, null, null, mark_required_ngfactory["b" /* View_CoreMarkRequiredComponent_0 */], mark_required_ngfactory["a" /* RenderType_CoreMarkRequiredComponent */])), core["_30" /* ɵdid */](70, 4308992, null, 0, mark_required["a" /* CoreMarkRequiredComponent */], [core["t" /* ElementRef */], translate_service["a" /* TranslateService */], utils_text["a" /* CoreTextUtilsProvider */], utils_utils["a" /* CoreUtilsProvider */]], { coreMarkRequired: [0, "coreMarkRequired"] }, null), (_l()(), core["_55" /* ɵted */](71, 0, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](74, 0, null, 3, 10, "ion-select", [["aria-labelledby", "addon-calendar-eventtype-label"], ["interface", "action-sheet"]], [[2, "select-disabled", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "click"], [null, "keyup.space"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (core["_44" /* ɵnov */](_v, 75)._click($event) !== false);
        ad = (pd_0 && ad);
    } if (("keyup.space" === en)) {
        var pd_1 = (core["_44" /* ɵnov */](_v, 75)._keyup() !== false);
        ad = (pd_1 && ad);
    } return ad; }, select_ngfactory["b" /* View_Select_0 */], select_ngfactory["a" /* RenderType_Select */])), core["_30" /* ɵdid */](75, 1228800, null, 1, select_select["a" /* Select */], [app["a" /* App */], util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item["a" /* Item */]], deep_linker["a" /* DeepLinker */]], { disabled: [0, "disabled"], interface: [1, "interface"] }, null), core["_52" /* ɵqud */](603979776, 11, { options: 1 }), core["_50" /* ɵprd */](1024, null, esm5_forms["l" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [select_select["a" /* Select */]]), core["_30" /* ɵdid */](78, 671744, null, 0, esm5_forms["f" /* FormControlName */], [[3, esm5_forms["b" /* ControlContainer */]], [8, null], [8, null], [2, esm5_forms["l" /* NG_VALUE_ACCESSOR */]]], { name: [0, "name"], isDisabled: [1, "isDisabled"] }, null), core["_50" /* ɵprd */](2048, null, esm5_forms["m" /* NgControl */], null, [esm5_forms["f" /* FormControlName */]]), core["_30" /* ɵdid */](80, 16384, null, 0, esm5_forms["n" /* NgControlStatus */], [esm5_forms["m" /* NgControl */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonCalendarEditEventPage_2)), core["_30" /* ɵdid */](83, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonCalendarEditEventPage_3)), core["_30" /* ɵdid */](89, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonCalendarEditEventPage_5)), core["_30" /* ɵdid */](93, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonCalendarEditEventPage_7)), core["_30" /* ɵdid */](97, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](100, 0, null, null, 18, "ion-item-divider", [["class", "core-expandable item item-divider"], ["text-wrap", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.toggleAdvanced() !== false);
        ad = (pd_0 && ad);
    } return ad; }, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](101, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 34, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 35, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 36, { _icons: 1 }), core["_30" /* ɵdid */](105, 16384, null, 0, item_divider["a" /* ItemDivider */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonCalendarEditEventPage_14)), core["_30" /* ɵdid */](108, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, 2, 1, null, View_AddonCalendarEditEventPage_15)), core["_30" /* ɵdid */](111, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonCalendarEditEventPage_16)), core["_30" /* ɵdid */](114, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, 2, 1, null, View_AddonCalendarEditEventPage_17)), core["_30" /* ɵdid */](117, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonCalendarEditEventPage_18)), core["_30" /* ɵdid */](121, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n            "])), (_l()(), core["_31" /* ɵeld */](123, 0, null, null, 22, "ion-item", [["class", "item item-block"]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](124, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 78, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 79, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 80, { _icons: 1 }), core["_30" /* ɵdid */](128, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](130, 0, null, 2, 14, "ion-row", [["class", "row"]], null, null, null, null, null)), core["_30" /* ɵdid */](131, 16384, null, 0, row["a" /* Row */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](133, 0, null, null, 7, "ion-col", [["class", "col"]], null, null, null, null, null)), core["_30" /* ɵdid */](134, 16384, null, 0, col["a" /* Col */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](136, 0, null, null, 3, "button", [["block", ""], ["ion-button", ""]], [[8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.submit() !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](137, 1097728, null, 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { block: [0, "block"] }, null), (_l()(), core["_55" /* ɵted */](138, 0, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonCalendarEditEventPage_22)), core["_30" /* ɵdid */](143, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "]))], function (_ck, _v) { var _co = _v.component; var currVal_7 = _co.eventForm; _ck(_v, 2, 0, currVal_7); var currVal_8 = true; _ck(_v, 17, 0, currVal_8); var currVal_17 = "name"; _ck(_v, 22, 0, currVal_17); var currVal_18 = "text"; var currVal_19 = core["_56" /* ɵunv */](_v, 25, 1, core["_44" /* ɵnov */](_v, 26).transform("addon.calendar.eventname")); _ck(_v, 25, 0, currVal_18, currVal_19); var currVal_20 = _co.eventForm.controls.name; var currVal_21 = _co.errors; _ck(_v, 29, 0, currVal_20, currVal_21); var currVal_22 = true; _ck(_v, 43, 0, currVal_22); var currVal_32 = _co.dateFormat; var currVal_33 = core["_56" /* ɵunv */](_v, 48, 1, core["_44" /* ɵnov */](_v, 49).transform("core.date")); _ck(_v, 48, 0, currVal_32, currVal_33); var currVal_34 = "timestart"; _ck(_v, 51, 0, currVal_34); var currVal_35 = _co.eventForm.controls.timestart; var currVal_36 = _co.errors; _ck(_v, 56, 0, currVal_35, currVal_36); var currVal_37 = "addon-calendar-eventtype-label"; _ck(_v, 68, 0, currVal_37); var currVal_38 = true; _ck(_v, 70, 0, currVal_38); var currVal_48 = (_co.eventTypes.length == 1); var currVal_49 = "action-sheet"; _ck(_v, 75, 0, currVal_48, currVal_49); var currVal_50 = "eventtype"; var currVal_51 = (_co.eventTypes.length == 1); _ck(_v, 78, 0, currVal_50, currVal_51); var currVal_52 = _co.eventTypes; _ck(_v, 83, 0, currVal_52); var currVal_53 = (_co.eventTypeControl.value == "category"); _ck(_v, 89, 0, currVal_53); var currVal_54 = (_co.eventTypeControl.value == "course"); _ck(_v, 93, 0, currVal_54); var currVal_55 = (_co.eventTypeControl.value == "group"); _ck(_v, 97, 0, currVal_55); var currVal_56 = !_co.advanced; _ck(_v, 108, 0, currVal_56); var currVal_57 = !_co.advanced; _ck(_v, 111, 0, currVal_57); var currVal_58 = _co.advanced; _ck(_v, 114, 0, currVal_58); var currVal_59 = _co.advanced; _ck(_v, 117, 0, currVal_59); var currVal_60 = _co.advanced; _ck(_v, 121, 0, currVal_60); var currVal_62 = ""; _ck(_v, 137, 0, currVal_62); var currVal_64 = (_co.hasOffline && (_co.eventId < 0)); _ck(_v, 143, 0, currVal_64); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = core["_44" /* ɵnov */](_v, 4).ngClassUntouched; var currVal_1 = core["_44" /* ɵnov */](_v, 4).ngClassTouched; var currVal_2 = core["_44" /* ɵnov */](_v, 4).ngClassPristine; var currVal_3 = core["_44" /* ɵnov */](_v, 4).ngClassDirty; var currVal_4 = core["_44" /* ɵnov */](_v, 4).ngClassValid; var currVal_5 = core["_44" /* ɵnov */](_v, 4).ngClassInvalid; var currVal_6 = core["_44" /* ɵnov */](_v, 4).ngClassPending; _ck(_v, 0, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6); var currVal_9 = core["_56" /* ɵunv */](_v, 18, 0, core["_44" /* ɵnov */](_v, 19).transform("addon.calendar.eventname")); _ck(_v, 18, 0, currVal_9); var currVal_10 = core["_44" /* ɵnov */](_v, 24).ngClassUntouched; var currVal_11 = core["_44" /* ɵnov */](_v, 24).ngClassTouched; var currVal_12 = core["_44" /* ɵnov */](_v, 24).ngClassPristine; var currVal_13 = core["_44" /* ɵnov */](_v, 24).ngClassDirty; var currVal_14 = core["_44" /* ɵnov */](_v, 24).ngClassValid; var currVal_15 = core["_44" /* ɵnov */](_v, 24).ngClassInvalid; var currVal_16 = core["_44" /* ɵnov */](_v, 24).ngClassPending; _ck(_v, 21, 0, currVal_10, currVal_11, currVal_12, currVal_13, currVal_14, currVal_15, currVal_16); var currVal_23 = core["_56" /* ɵunv */](_v, 44, 0, core["_44" /* ɵnov */](_v, 45).transform("core.date")); _ck(_v, 44, 0, currVal_23); var currVal_24 = core["_44" /* ɵnov */](_v, 48)._disabled; var currVal_25 = core["_44" /* ɵnov */](_v, 53).ngClassUntouched; var currVal_26 = core["_44" /* ɵnov */](_v, 53).ngClassTouched; var currVal_27 = core["_44" /* ɵnov */](_v, 53).ngClassPristine; var currVal_28 = core["_44" /* ɵnov */](_v, 53).ngClassDirty; var currVal_29 = core["_44" /* ɵnov */](_v, 53).ngClassValid; var currVal_30 = core["_44" /* ɵnov */](_v, 53).ngClassInvalid; var currVal_31 = core["_44" /* ɵnov */](_v, 53).ngClassPending; _ck(_v, 47, 0, currVal_24, currVal_25, currVal_26, currVal_27, currVal_28, currVal_29, currVal_30, currVal_31); var currVal_39 = core["_56" /* ɵunv */](_v, 71, 0, core["_44" /* ɵnov */](_v, 72).transform("addon.calendar.eventkind")); _ck(_v, 71, 0, currVal_39); var currVal_40 = core["_44" /* ɵnov */](_v, 75)._disabled; var currVal_41 = core["_44" /* ɵnov */](_v, 80).ngClassUntouched; var currVal_42 = core["_44" /* ɵnov */](_v, 80).ngClassTouched; var currVal_43 = core["_44" /* ɵnov */](_v, 80).ngClassPristine; var currVal_44 = core["_44" /* ɵnov */](_v, 80).ngClassDirty; var currVal_45 = core["_44" /* ɵnov */](_v, 80).ngClassValid; var currVal_46 = core["_44" /* ɵnov */](_v, 80).ngClassInvalid; var currVal_47 = core["_44" /* ɵnov */](_v, 80).ngClassPending; _ck(_v, 74, 0, currVal_40, currVal_41, currVal_42, currVal_43, currVal_44, currVal_45, currVal_46, currVal_47); var currVal_61 = !_co.eventForm.valid; _ck(_v, 136, 0, currVal_61); var currVal_63 = core["_56" /* ɵunv */](_v, 138, 0, core["_44" /* ɵnov */](_v, 139).transform("core.save")); _ck(_v, 138, 0, currVal_63); }); }
function View_AddonCalendarEditEventPage_0(_l) { return core["_57" /* ɵvid */](0, [core["_52" /* ɵqud */](671088640, 1, { descriptionEditor: 0 }), (_l()(), core["_31" /* ɵeld */](1, 0, null, null, 12, "ion-header", [], null, null, null, null, null)), core["_30" /* ɵdid */](2, 16384, null, 0, toolbar_header["a" /* Header */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, view_controller["a" /* ViewController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_31" /* ɵeld */](4, 0, null, null, 8, "ion-navbar", [["class", "toolbar"], ["core-back-button", ""]], [[8, "hidden", 0], [2, "statusbar-padding", null]], null, null, navbar_ngfactory["b" /* View_Navbar_0 */], navbar_ngfactory["a" /* RenderType_Navbar */])), core["_30" /* ɵdid */](5, 49152, null, 0, navbar["a" /* Navbar */], [app["a" /* App */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_30" /* ɵdid */](6, 212992, null, 0, back_button["a" /* CoreBackButtonDirective */], [navbar["a" /* Navbar */], platform["a" /* Platform */], translate_service["a" /* TranslateService */], events["a" /* CoreEventsProvider */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n        "])), (_l()(), core["_31" /* ɵeld */](8, 0, null, 3, 3, "ion-title", [], null, null, null, toolbar_title_ngfactory["b" /* View_ToolbarTitle_0 */], toolbar_title_ngfactory["a" /* RenderType_ToolbarTitle */])), core["_30" /* ɵdid */](9, 49152, null, 0, toolbar_title["a" /* ToolbarTitle */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), (_l()(), core["_55" /* ɵted */](10, 0, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_31" /* ɵeld */](15, 0, null, null, 17, "ion-content", [], [[2, "statusbar-padding", null], [2, "has-refresher", null]], null, null, content_ngfactory["b" /* View_Content_0 */], content_ngfactory["a" /* RenderType_Content */])), core["_30" /* ɵdid */](16, 4374528, null, 0, content["a" /* Content */], [config["a" /* Config */], platform["a" /* Platform */], dom_controller["a" /* DomController */], core["t" /* ElementRef */], core["V" /* Renderer */], app["a" /* App */], keyboard["a" /* Keyboard */], core["M" /* NgZone */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n    "])), (_l()(), core["_31" /* ɵeld */](18, 0, null, 2, 6, "ion-refresher", [], [[2, "refresher-active", null], [4, "top", null]], [[null, "ionRefresh"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("ionRefresh" === en)) {
        var pd_0 = (_co.refreshData($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), core["_30" /* ɵdid */](19, 212992, null, 0, refresher["a" /* Refresher */], [platform["a" /* Platform */], content["a" /* Content */], core["M" /* NgZone */], gesture_controller["l" /* GestureController */]], { enabled: [0, "enabled"] }, { ionRefresh: "ionRefresh" }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_31" /* ɵeld */](21, 0, null, null, 2, "ion-refresher-content", [], [[1, "state", 0]], null, null, refresher_content_ngfactory["b" /* View_RefresherContent_0 */], refresher_content_ngfactory["a" /* RenderType_RefresherContent */])), core["_30" /* ɵdid */](22, 114688, null, 0, refresher_content["a" /* RefresherContent */], [refresher["a" /* Refresher */], config["a" /* Config */]], { pullingText: [0, "pullingText"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n\n    "])), (_l()(), core["_31" /* ɵeld */](26, 0, null, 1, 5, "core-loading", [], null, null, null, loading_ngfactory["b" /* View_CoreLoadingComponent_0 */], loading_ngfactory["a" /* RenderType_CoreLoadingComponent */])), core["_30" /* ɵdid */](27, 638976, null, 0, loading["a" /* CoreLoadingComponent */], [translate_service["a" /* TranslateService */], core["t" /* ElementRef */], events["a" /* CoreEventsProvider */], utils_utils["a" /* CoreUtilsProvider */]], { hideUntil: [0, "hideUntil"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonCalendarEditEventPage_1)), core["_30" /* ɵdid */](30, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; _ck(_v, 6, 0); var currVal_7 = _co.loaded; _ck(_v, 19, 0, currVal_7); var currVal_9 = core["_34" /* ɵinlineInterpolate */](1, "", core["_56" /* ɵunv */](_v, 22, 0, core["_44" /* ɵnov */](_v, 23).transform("core.pulltorefresh")), ""); _ck(_v, 22, 0, currVal_9); var currVal_10 = _co.loaded; _ck(_v, 27, 0, currVal_10); var currVal_11 = !_co.error; _ck(_v, 30, 0, currVal_11); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = core["_44" /* ɵnov */](_v, 5)._hidden; var currVal_1 = core["_44" /* ɵnov */](_v, 5)._sbPadding; _ck(_v, 4, 0, currVal_0, currVal_1); var currVal_2 = core["_56" /* ɵunv */](_v, 10, 0, core["_44" /* ɵnov */](_v, 11).transform(_co.title)); _ck(_v, 10, 0, currVal_2); var currVal_3 = core["_44" /* ɵnov */](_v, 16).statusbarPadding; var currVal_4 = core["_44" /* ɵnov */](_v, 16)._hasRefresher; _ck(_v, 15, 0, currVal_3, currVal_4); var currVal_5 = (core["_44" /* ɵnov */](_v, 19).state !== "inactive"); var currVal_6 = core["_44" /* ɵnov */](_v, 19)._top; _ck(_v, 18, 0, currVal_5, currVal_6); var currVal_8 = core["_44" /* ɵnov */](_v, 22).r.state; _ck(_v, 21, 0, currVal_8); }); }
function View_AddonCalendarEditEventPage_Host_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "page-addon-calendar-edit-event", [], null, null, null, View_AddonCalendarEditEventPage_0, RenderType_AddonCalendarEditEventPage)), core["_30" /* ɵdid */](1, 245760, null, 0, edit_event_AddonCalendarEditEventPage, [nav_params["a" /* NavParams */], nav_controller["a" /* NavController */], translate_service["a" /* TranslateService */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], time["a" /* CoreTimeUtilsProvider */], events["a" /* CoreEventsProvider */], groups["a" /* CoreGroupsProvider */], sites["a" /* CoreSitesProvider */], courses["a" /* CoreCoursesProvider */], utils_utils["a" /* CoreUtilsProvider */], calendar["a" /* AddonCalendarProvider */], calendar_offline["a" /* AddonCalendarOfflineProvider */], helper["a" /* AddonCalendarHelperProvider */], calendar_sync["a" /* AddonCalendarSyncProvider */], esm5_forms["d" /* FormBuilder */], sync["a" /* CoreSyncProvider */], [2, split_view["a" /* CoreSplitViewComponent */]]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var AddonCalendarEditEventPageNgFactory = core["_27" /* ɵccf */]("page-addon-calendar-edit-event", edit_event_AddonCalendarEditEventPage, View_AddonCalendarEditEventPage_Host_0, {}, {}, []);

//# sourceMappingURL=edit-event.ngfactory.js.map
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

// EXTERNAL MODULE: ./src/pipes/pipes.module.ts + 2 modules
var pipes_module = __webpack_require__(109);

// EXTERNAL MODULE: ./node_modules/ionic-angular/util/module-loader.js
var module_loader = __webpack_require__(268);

// CONCATENATED MODULE: ./src/addon/calendar/pages/edit-event/edit-event.module.ngfactory.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddonCalendarEditEventPageModuleNgFactory", function() { return AddonCalendarEditEventPageModuleNgFactory; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 































var AddonCalendarEditEventPageModuleNgFactory = core["_28" /* ɵcmf */](edit_event_module_AddonCalendarEditEventPageModule, [], function (_l) { return core["_40" /* ɵmod */]([core["_41" /* ɵmpd */](512, core["o" /* ComponentFactoryResolver */], core["_21" /* ɵCodegenComponentFactoryResolver */], [[8, [action_sheet_component_ngfactory["a" /* ActionSheetCmpNgFactory */], alert_component_ngfactory["a" /* AlertCmpNgFactory */], app_root_ngfactory["a" /* IonicAppNgFactory */], loading_component_ngfactory["a" /* LoadingCmpNgFactory */], modal_component_ngfactory["a" /* ModalCmpNgFactory */], picker_component_ngfactory["a" /* PickerCmpNgFactory */], popover_component_ngfactory["a" /* PopoverCmpNgFactory */], select_popover_component_ngfactory["a" /* SelectPopoverNgFactory */], toast_component_ngfactory["a" /* ToastCmpNgFactory */], context_menu_popover_ngfactory["a" /* CoreContextMenuPopoverComponentNgFactory */], course_picker_menu_popover_ngfactory["a" /* CoreCoursePickerMenuPopoverComponentNgFactory */], recaptchamodal_ngfactory["a" /* CoreRecaptchaModalComponentNgFactory */], bs_tooltip_ngfactory["a" /* CoreBSTooltipComponentNgFactory */], AddonCalendarEditEventPageNgFactory]], [3, core["o" /* ComponentFactoryResolver */]], core["K" /* NgModuleRef */]]), core["_41" /* ɵmpd */](4608, common["m" /* NgLocalization */], common["l" /* NgLocaleLocalization */], [core["G" /* LOCALE_ID */], [2, common["w" /* ɵa */]]]), core["_41" /* ɵmpd */](4608, esm5_forms["x" /* ɵi */], esm5_forms["x" /* ɵi */], []), core["_41" /* ɵmpd */](4608, esm5_forms["d" /* FormBuilder */], esm5_forms["d" /* FormBuilder */], []), core["_41" /* ɵmpd */](4608, translate_loader["b" /* TranslateLoader */], translate_loader["a" /* TranslateFakeLoader */], []), core["_41" /* ɵmpd */](4608, translate_compiler["a" /* TranslateCompiler */], translate_compiler["b" /* TranslateFakeCompiler */], []), core["_41" /* ɵmpd */](4608, translate_parser["b" /* TranslateParser */], translate_parser["a" /* TranslateDefaultParser */], []), core["_41" /* ɵmpd */](4608, missing_translation_handler["b" /* MissingTranslationHandler */], missing_translation_handler["a" /* FakeMissingTranslationHandler */], []), core["_41" /* ɵmpd */](4608, translate_service["a" /* TranslateService */], translate_service["a" /* TranslateService */], [translate_store["a" /* TranslateStore */], translate_loader["b" /* TranslateLoader */], translate_compiler["a" /* TranslateCompiler */], translate_parser["b" /* TranslateParser */], missing_translation_handler["b" /* MissingTranslationHandler */], translate_service["b" /* USE_DEFAULT_LANG */], translate_service["c" /* USE_STORE */]]), core["_41" /* ɵmpd */](512, common["b" /* CommonModule */], common["b" /* CommonModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["v" /* ɵba */], esm5_forms["v" /* ɵba */], []), core["_41" /* ɵmpd */](512, esm5_forms["i" /* FormsModule */], esm5_forms["i" /* FormsModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["s" /* ReactiveFormsModule */], esm5_forms["s" /* ReactiveFormsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["a" /* IonicModule */], ionic_angular_module["a" /* IonicModule */], []), core["_41" /* ɵmpd */](512, _ngx_translate_core["b" /* TranslateModule */], _ngx_translate_core["b" /* TranslateModule */], []), core["_41" /* ɵmpd */](512, directives_module["a" /* CoreDirectivesModule */], directives_module["a" /* CoreDirectivesModule */], []), core["_41" /* ɵmpd */](512, pipes_module["a" /* CorePipesModule */], pipes_module["a" /* CorePipesModule */], []), core["_41" /* ɵmpd */](512, components_module["a" /* CoreComponentsModule */], components_module["a" /* CoreComponentsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["b" /* IonicPageModule */], ionic_angular_module["b" /* IonicPageModule */], []), core["_41" /* ɵmpd */](512, edit_event_module_AddonCalendarEditEventPageModule, edit_event_module_AddonCalendarEditEventPageModule, []), core["_41" /* ɵmpd */](256, translate_service["c" /* USE_STORE */], undefined, []), core["_41" /* ɵmpd */](256, translate_service["b" /* USE_DEFAULT_LANG */], undefined, []), core["_41" /* ɵmpd */](256, module_loader["a" /* LAZY_LOADED_TOKEN */], edit_event_AddonCalendarEditEventPage, [])]); });

//# sourceMappingURL=edit-event.module.ngfactory.js.map

/***/ })

});
//# sourceMappingURL=134.js.map