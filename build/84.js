webpackJsonp([84],{

/***/ 2089:
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

// EXTERNAL MODULE: ./src/providers/events.ts
var events = __webpack_require__(11);

// EXTERNAL MODULE: ./src/providers/sites.ts
var sites = __webpack_require__(1);

// EXTERNAL MODULE: ./src/providers/sync.ts
var sync = __webpack_require__(75);

// EXTERNAL MODULE: ./src/providers/utils/dom.ts
var dom = __webpack_require__(4);

// EXTERNAL MODULE: ./src/providers/utils/time.ts
var time = __webpack_require__(24);

// EXTERNAL MODULE: ./src/components/ion-tabs/ion-tabs.ts
var ion_tabs = __webpack_require__(717);

// EXTERNAL MODULE: ./src/addon/mod/scorm/providers/scorm.ts
var providers_scorm = __webpack_require__(228);

// EXTERNAL MODULE: ./src/addon/mod/scorm/providers/helper.ts
var helper = __webpack_require__(381);

// EXTERNAL MODULE: ./src/addon/mod/scorm/providers/scorm-sync.ts
var scorm_sync = __webpack_require__(283);

// CONCATENATED MODULE: ./src/addon/mod/scorm/classes/data-model-12.ts
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

/**
 * SCORM data model implementation for version 1.2.
 */
var data_model_12_AddonModScormDataModel12 = /** @class */ (function () {
    /**
     * Constructor.
     *
     * @param {CoreEventsProvider} eventsProvider Events provider instance.
     * @param {AddonModScormProvider} scormProvider SCORM provider instance.
     * @param {any} scorm SCORM.
     * @param {number} scoId Current SCO ID.
     * @param {number} attempt Attempt number.
     * @param {any} userData The user default data.
     * @param {string} [mode] Mode being played. By default, MODENORMAL.
     * @param {boolean} offline Whether the attempt is offline.
     */
    function AddonModScormDataModel12(eventsProvider, scormProvider, siteId, scorm, scoId, attempt, userData, mode, offline) {
        this.eventsProvider = eventsProvider;
        this.scormProvider = scormProvider;
        this.siteId = siteId;
        this.scorm = scorm;
        this.scoId = scoId;
        this.attempt = attempt;
        this.mode = mode;
        this.offline = offline;
        // Standard Data Type Definition.
        this.CMI_STRING_256 = '^[\\u0000-\\uFFFF]{0,255}$';
        this.CMI_STRING_4096 = '^[\\u0000-\\uFFFF]{0,4096}$';
        this.CMI_TIME = '^([0-2]{1}[0-9]{1}):([0-5]{1}[0-9]{1}):([0-5]{1}[0-9]{1})(\.[0-9]{1,2})?$';
        this.CMI_TIMESPAN = '^([0-9]{2,4}):([0-9]{2}):([0-9]{2})(\.[0-9]{1,2})?$';
        this.CMI_INTEGER = '^\\d+$';
        this.CMI_SINTEGER = '^-?([0-9]+)$';
        this.CMI_DECIMAL = '^-?([0-9]{0,3})(\.[0-9]*)?$';
        this.CMI_IDENTIFIER = '^[\\u0021-\\u007E]{0,255}$';
        this.CMI_FEEDBACK = this.CMI_STRING_256; // This must be redefined.
        this.CMI_INDEX = '[._](\\d+).';
        // Vocabulary Data Type Definition.
        this.CMI_STATUS = '^passed$|^completed$|^failed$|^incomplete$|^browsed$';
        this.CMI_STATUS_2 = '^passed$|^completed$|^failed$|^incomplete$|^browsed$|^not attempted$';
        this.CMI_EXIT = '^time-out$|^suspend$|^logout$|^$';
        this.CMI_TYPE = '^true-false$|^choice$|^fill-in$|^matching$|^performance$|^sequencing$|^likert$|^numeric$';
        this.CMI_RESULT = '^correct$|^wrong$|^unanticipated$|^neutral$|^([0-9]{0,3})?(\.[0-9]*)?$';
        this.NAV_EVENT = '^previous$|^continue$';
        // Children lists.
        this.CMI_CHILDREN = 'core,suspend_data,launch_data,comments,objectives,student_data,student_preference,interactions';
        this.CORE_CHILDREN = 'student_id,student_name,lesson_location,credit,lesson_status,entry,score,total_time,lesson_mode,' +
            'exit,session_time';
        this.SCORE_CHILDREN = 'raw,min,max';
        this.COMMENTS_CHILDREN = 'content,location,time';
        this.OBJECTIVES_CHILDREN = 'id,score,status';
        this.CORRECT_RESPONSES_CHILDREN = 'pattern';
        this.STUDENT_DATA_CHILDREN = 'mastery_score,max_time_allowed,time_limit_action';
        this.STUDENT_PREFERENCE_CHILDREN = 'audio,language,speed,text';
        this.INTERACTIONS_CHILDREN = 'id,objectives,time,type,correct_responses,weighting,student_response,result,latency';
        // Data ranges.
        this.SCORE_RANGE = '0#100';
        this.AUDIO_RANGE = '-1#100';
        this.SPEED_RANGE = '-100#100';
        this.WEIGHTING_RANGE = '-100#100';
        this.TEXT_RANGE = '-1#1';
        // Error messages.
        this.ERROR_STRINGS = {
            0: 'No error',
            101: 'General exception',
            201: 'Invalid argument error',
            202: 'Element cannot have children',
            203: 'Element not an array - cannot have count',
            301: 'Not initialized',
            401: 'Not implemented error',
            402: 'Invalid set value, element is a keyword',
            403: 'Element is read only',
            404: 'Element is write only',
            405: 'Incorrect data type'
        };
        this.currentUserData = {}; // Current user data.
        this.def = {}; // Object containing the default values.
        this.defExtra = {}; // Extra object that will contain the objectives and interactions data (all the .n. elements).
        this.dataModel = {}; // The SCORM 1.2 data model.
        this.initialized = false; // Whether LMSInitialize has been called.
        this.mode = mode || providers_scorm["a" /* AddonModScormProvider */].MODENORMAL;
        this.offline = !!offline;
        this.init(userData);
    }
    /**
     * Utility function for adding two times in format hh:mm:ss.
     *
     * @param {string} first  First time.
     * @param {string} second Second time.
     * @return {string} Total time.
     */
    AddonModScormDataModel12.prototype.addTime = function (first, second) {
        var sFirst = first.split(':'), sSecond = second.split(':'), cFirst = sFirst[2].split('.'), cSecond = sSecond[2].split('.');
        var change = 0;
        var firstCents = 0; // Cents.
        if (cFirst.length > 1) {
            firstCents = parseInt(cFirst[1], 10);
        }
        var secondCents = 0;
        if (cSecond.length > 1) {
            secondCents = parseInt(cSecond[1], 10);
        }
        var cents = firstCents + secondCents;
        change = Math.floor(cents / 100);
        cents = cents - (change * 100);
        if (Math.floor(cents) < 10) {
            cents = '0' + cents.toString();
        }
        var secs = parseInt(cFirst[0], 10) + parseInt(cSecond[0], 10) + change; // Seconds.
        change = Math.floor(secs / 60);
        secs = secs - (change * 60);
        if (Math.floor(secs) < 10) {
            secs = '0' + secs.toString();
        }
        var mins = parseInt(sFirst[1], 10) + parseInt(sSecond[1], 10) + change; // Minutes.
        change = Math.floor(mins / 60);
        mins = mins - (change * 60);
        if (mins < 10) {
            mins = '0' + mins.toString();
        }
        var hours = parseInt(sFirst[0], 10) + parseInt(sSecond[0], 10) + change; // Hours.
        if (hours < 10) {
            hours = '0' + hours.toString();
        }
        if (cents != '0') {
            return hours + ':' + mins + ':' + secs + '.' + cents;
        }
        else {
            return hours + ':' + mins + ':' + secs;
        }
    };
    /**
     * Utility function for cloning an object
     *
     * @param {any} obj The object to be cloned
     * @return {any} The object cloned
     */
    AddonModScormDataModel12.prototype.cloneObj = function (obj) {
        if (obj == null || typeof (obj) != 'object') {
            return obj;
        }
        var temp = new obj.constructor(); // Changed (twice).
        for (var key in obj) {
            temp[key] = this.cloneObj(obj[key]);
        }
        return temp;
    };
    /**
     * Collect all the user tracking data that must be persisted in the system, this is usually called by LMSCommit().
     *
     * @return {any[]} Collected data.
     */
    AddonModScormDataModel12.prototype.collectData = function () {
        var data = [];
        for (var element in this.currentUserData[this.scoId]) {
            // Ommit for example the nav. elements.
            if (element.substr(0, 3) == 'cmi') {
                var expression = new RegExp(this.CMI_INDEX, 'g');
                // Get the generic name for this element (e.g. convert 'cmi.interactions.1.id' to 'cmi.interactions.n.id')
                var elementModel = String(element).replace(expression, '.n.');
                // Ignore the session time element.
                if (element != 'cmi.core.session_time') {
                    // Check if this specific element is not defined in the datamodel, but the generic element name is.
                    if (typeof this.dataModel[this.scoId][element] == 'undefined' &&
                        typeof this.dataModel[this.scoId][elementModel] != 'undefined') {
                        // Add this element to the data model (by cloning the generic element) so we can track changes to it.
                        this.dataModel[this.scoId][element] = this.cloneObj(this.dataModel[this.scoId][elementModel]);
                    }
                    // Check if the current element exists in the datamodel.
                    if (typeof this.dataModel[this.scoId][element] != 'undefined') {
                        // Make sure this is not a read only element.
                        if (this.dataModel[this.scoId][element].mod != 'r') {
                            var el = {
                                // Moodle stores the organizations and interactions using _n. instead .n.
                                element: element.replace(expression, '_$1.'),
                                value: this.getEl(element)
                            };
                            // Check if the element has a default value.
                            if (typeof this.dataModel[this.scoId][element].defaultvalue != 'undefined') {
                                // Check if the default value is different from the current value.
                                if (this.dataModel[this.scoId][element].defaultvalue != el.value ||
                                    typeof this.dataModel[this.scoId][element].defaultvalue != typeof (el.value)) {
                                    data.push(el);
                                    // Update the element default to reflect the current committed value.
                                    this.dataModel[this.scoId][element].defaultvalue = el.value;
                                }
                            }
                            else {
                                data.push(el);
                                // No default value for the element, so set it now.
                                this.dataModel[this.scoId][element].defaultvalue = el.value;
                            }
                        }
                    }
                }
            }
        }
        return data;
    };
    /**
     * Get the value of the given element from the non-persistent (current) user data.
     *
     * @param {string} el The element
     * @return {any} The element value
     */
    AddonModScormDataModel12.prototype.getEl = function (el) {
        if (typeof this.currentUserData[this.scoId] != 'undefined' && typeof this.currentUserData[this.scoId][el] != 'undefined') {
            return this.currentUserData[this.scoId][el];
        }
        return '';
    };
    /**
     * Initialize the model.
     *
     * @param {any} userData The user default data.
     */
    AddonModScormDataModel12.prototype.init = function (userData) {
        // Prepare the definition array containing the default values.
        for (var scoId in userData) {
            var sco = userData[scoId];
            this.def[scoId] = sco.defaultdata;
            this.defExtra[scoId] = sco.userdata;
        }
        // Set up data model for each SCO.
        for (var scoId in this.def) {
            this.dataModel[scoId] = {
                'cmi._children': { defaultvalue: this.CMI_CHILDREN, mod: 'r', writeerror: '402' },
                'cmi._version': { defaultvalue: '3.4', mod: 'r', writeerror: '402' },
                'cmi.core._children': { defaultvalue: this.CORE_CHILDREN, mod: 'r', writeerror: '402' },
                'cmi.core.student_id': { defaultvalue: this.def[scoId]['cmi.core.student_id'], mod: 'r', writeerror: '403' },
                'cmi.core.student_name': { defaultvalue: this.def[scoId]['cmi.core.student_name'], mod: 'r', writeerror: '403' },
                'cmi.core.lesson_location': { defaultvalue: this.def[scoId]['cmi.core.lesson_location'],
                    format: this.CMI_STRING_256, mod: 'rw', writeerror: '405' },
                'cmi.core.credit': { defaultvalue: this.def[scoId]['cmi.core.credit'], mod: 'r', writeerror: '403' },
                'cmi.core.lesson_status': { defaultvalue: this.def[scoId]['cmi.core.lesson_status'], format: this.CMI_STATUS,
                    mod: 'rw', writeerror: '405' },
                'cmi.core.entry': { defaultvalue: this.def[scoId]['cmi.core.entry'], mod: 'r', writeerror: '403' },
                'cmi.core.score._children': { defaultvalue: this.SCORE_CHILDREN, mod: 'r', writeerror: '402' },
                'cmi.core.score.raw': { defaultvalue: this.def[scoId]['cmi.core.score.raw'], format: this.CMI_DECIMAL,
                    range: this.SCORE_RANGE, mod: 'rw', writeerror: '405' },
                'cmi.core.score.max': { defaultvalue: this.def[scoId]['cmi.core.score.max'], format: this.CMI_DECIMAL,
                    range: this.SCORE_RANGE, mod: 'rw', writeerror: '405' },
                'cmi.core.score.min': { defaultvalue: this.def[scoId]['cmi.core.score.min'], format: this.CMI_DECIMAL,
                    range: this.SCORE_RANGE, mod: 'rw', writeerror: '405' },
                'cmi.core.total_time': { defaultvalue: this.def[scoId]['cmi.core.total_time'], mod: 'r', writeerror: '403' },
                'cmi.core.lesson_mode': { defaultvalue: this.def[scoId]['cmi.core.lesson_mode'], mod: 'r', writeerror: '403' },
                'cmi.core.exit': { defaultvalue: this.def[scoId]['cmi.core.exit'], format: this.CMI_EXIT, mod: 'w',
                    readerror: '404', writeerror: '405' },
                'cmi.core.session_time': { format: this.CMI_TIMESPAN, mod: 'w', defaultvalue: '00:00:00', readerror: '404',
                    writeerror: '405' },
                'cmi.suspend_data': { defaultvalue: this.def[scoId]['cmi.suspend_data'], format: this.CMI_STRING_4096,
                    mod: 'rw', writeerror: '405' },
                'cmi.launch_data': { defaultvalue: this.def[scoId]['cmi.launch_data'], mod: 'r', writeerror: '403' },
                'cmi.comments': { defaultvalue: this.def[scoId]['cmi.comments'], format: this.CMI_STRING_4096, mod: 'rw',
                    writeerror: '405' },
                // Deprecated evaluation attributes.
                'cmi.evaluation.comments._count': { defaultvalue: '0', mod: 'r', writeerror: '402' },
                'cmi.evaluation.comments._children': { defaultvalue: this.COMMENTS_CHILDREN, mod: 'r', writeerror: '402' },
                'cmi.evaluation.comments.n.content': { defaultvalue: '', pattern: this.CMI_INDEX, format: this.CMI_STRING_256,
                    mod: 'rw', writeerror: '405' },
                'cmi.evaluation.comments.n.location': { defaultvalue: '', pattern: this.CMI_INDEX, format: this.CMI_STRING_256,
                    mod: 'rw', writeerror: '405' },
                'cmi.evaluation.comments.n.time': { defaultvalue: '', pattern: this.CMI_INDEX, format: this.CMI_TIME,
                    mod: 'rw', writeerror: '405' },
                'cmi.comments_from_lms': { mod: 'r', writeerror: '403' },
                'cmi.objectives._children': { defaultvalue: this.OBJECTIVES_CHILDREN, mod: 'r', writeerror: '402' },
                'cmi.objectives._count': { mod: 'r', defaultvalue: '0', writeerror: '402' },
                'cmi.objectives.n.id': { pattern: this.CMI_INDEX, format: this.CMI_IDENTIFIER, mod: 'rw', writeerror: '405' },
                'cmi.objectives.n.score._children': { pattern: this.CMI_INDEX, mod: 'r', writeerror: '402' },
                'cmi.objectives.n.score.raw': { defaultvalue: '', pattern: this.CMI_INDEX, format: this.CMI_DECIMAL,
                    range: this.SCORE_RANGE, mod: 'rw', writeerror: '405' },
                'cmi.objectives.n.score.min': { defaultvalue: '', pattern: this.CMI_INDEX, format: this.CMI_DECIMAL,
                    range: this.SCORE_RANGE, mod: 'rw', writeerror: '405' },
                'cmi.objectives.n.score.max': { defaultvalue: '', pattern: this.CMI_INDEX, format: this.CMI_DECIMAL,
                    range: this.SCORE_RANGE, mod: 'rw', writeerror: '405' },
                'cmi.objectives.n.status': { pattern: this.CMI_INDEX, format: this.CMI_STATUS_2, mod: 'rw', writeerror: '405' },
                'cmi.student_data._children': { defaultvalue: this.STUDENT_DATA_CHILDREN, mod: 'r', writeerror: '402' },
                'cmi.student_data.mastery_score': { defaultvalue: this.def[scoId]['cmi.student_data.mastery_score'], mod: 'r',
                    writeerror: '403' },
                'cmi.student_data.max_time_allowed': { defaultvalue: this.def[scoId]['cmi.student_data.max_time_allowed'],
                    mod: 'r', writeerror: '403' },
                'cmi.student_data.time_limit_action': { defaultvalue: this.def[scoId]['cmi.student_data.time_limit_action'],
                    mod: 'r', writeerror: '403' },
                'cmi.student_preference._children': { defaultvalue: this.STUDENT_PREFERENCE_CHILDREN, mod: 'r',
                    writeerror: '402' },
                'cmi.student_preference.audio': { defaultvalue: this.def[scoId]['cmi.student_preference.audio'],
                    format: this.CMI_SINTEGER, range: this.AUDIO_RANGE, mod: 'rw', writeerror: '405' },
                'cmi.student_preference.language': { defaultvalue: this.def[scoId]['cmi.student_preference.language'],
                    format: this.CMI_STRING_256, mod: 'rw', writeerror: '405' },
                'cmi.student_preference.speed': { defaultvalue: this.def[scoId]['cmi.student_preference.speed'],
                    format: this.CMI_SINTEGER, range: this.SPEED_RANGE, mod: 'rw', writeerror: '405' },
                'cmi.student_preference.text': { defaultvalue: this.def[scoId]['cmi.student_preference.text'],
                    format: this.CMI_SINTEGER, range: this.TEXT_RANGE, mod: 'rw', writeerror: '405' },
                'cmi.interactions._children': { defaultvalue: this.INTERACTIONS_CHILDREN, mod: 'r', writeerror: '402' },
                'cmi.interactions._count': { mod: 'r', defaultvalue: '0', writeerror: '402' },
                'cmi.interactions.n.id': { pattern: this.CMI_INDEX, format: this.CMI_IDENTIFIER, mod: 'w', readerror: '404',
                    writeerror: '405' },
                'cmi.interactions.n.objectives._count': { pattern: this.CMI_INDEX, mod: 'r', defaultvalue: '0', writeerror: '402' },
                'cmi.interactions.n.objectives.n.id': { pattern: this.CMI_INDEX, format: this.CMI_IDENTIFIER, mod: 'w',
                    readerror: '404', writeerror: '405' },
                'cmi.interactions.n.time': { pattern: this.CMI_INDEX, format: this.CMI_TIME, mod: 'w', readerror: '404',
                    writeerror: '405' },
                'cmi.interactions.n.type': { pattern: this.CMI_INDEX, format: this.CMI_TYPE, mod: 'w', readerror: '404',
                    writeerror: '405' },
                'cmi.interactions.n.correct_responses._count': { pattern: this.CMI_INDEX, mod: 'r', defaultvalue: '0',
                    writeerror: '402' },
                'cmi.interactions.n.correct_responses.n.pattern': { pattern: this.CMI_INDEX, format: this.CMI_FEEDBACK,
                    mod: 'w', readerror: '404', writeerror: '405' },
                'cmi.interactions.n.weighting': { pattern: this.CMI_INDEX, format: this.CMI_DECIMAL,
                    range: this.WEIGHTING_RANGE, mod: 'w', readerror: '404', writeerror: '405' },
                'cmi.interactions.n.student_response': { pattern: this.CMI_INDEX, format: this.CMI_FEEDBACK, mod: 'w',
                    readerror: '404', writeerror: '405' },
                'cmi.interactions.n.result': { pattern: this.CMI_INDEX, format: this.CMI_RESULT, mod: 'w', readerror: '404',
                    writeerror: '405' },
                'cmi.interactions.n.latency': { pattern: this.CMI_INDEX, format: this.CMI_TIMESPAN, mod: 'w',
                    readerror: '404', writeerror: '405' },
                'nav.event': { defaultvalue: '', format: this.NAV_EVENT, mod: 'w', readerror: '404', writeerror: '405' }
            };
            this.currentUserData[scoId] = {};
            // Load default values.
            for (var element in this.dataModel[scoId]) {
                if (element.match(/\.n\./) === null) {
                    if (typeof this.dataModel[scoId][element].defaultvalue != 'undefined') {
                        this.currentUserData[scoId][element] = this.dataModel[scoId][element].defaultvalue;
                    }
                }
            }
            // Load initial user data for current SCO.
            for (var element in this.def[scoId]) {
                if (element.match(/\.n\./) === null) {
                    if (typeof this.dataModel[scoId][element].defaultvalue != 'undefined') {
                        this.currentUserData[scoId][element] = this.dataModel[scoId][element].defaultvalue;
                    }
                    else if (typeof this.defExtra[scoId][element] != 'undefined') {
                        // Check in user data values.
                        this.currentUserData[scoId][element] = this.defExtra[scoId][element];
                    }
                    else {
                        this.currentUserData[scoId][element] = '';
                    }
                }
            }
            // Load interactions and objectives, and init the counters.
            var expression = new RegExp(this.CMI_INDEX, 'g');
            for (var element in this.defExtra[scoId]) {
                var counterElement = '', currentCounterIndex = 0, elementDotFormat = void 0, currentN = void 0;
                // This check for an indexed element. cmi.objectives.1.id or cmi.objectives_1.id.
                if (element.match(expression)) {
                    // Normalize to the expected value according the standard.
                    // Moodle stores this values using _n. instead .n.
                    elementDotFormat = element.replace(expression, '.$1.');
                    this.currentUserData[scoId][elementDotFormat] = this.defExtra[scoId][element];
                    // Get the correct counter and current index.
                    if (elementDotFormat.indexOf('cmi.evaluation.comments') === 0) {
                        counterElement = 'cmi.evaluation.comments._count';
                        currentCounterIndex = elementDotFormat.match(/.(\d+)./)[1];
                    }
                    else if (elementDotFormat.indexOf('cmi.objectives') === 0) {
                        counterElement = 'cmi.objectives._count';
                        currentCounterIndex = elementDotFormat.match(/.(\d+)./)[1];
                    }
                    else if (elementDotFormat.indexOf('cmi.interactions') === 0) {
                        if (elementDotFormat.indexOf('.objectives.') > 0) {
                            currentN = elementDotFormat.match(/cmi.interactions.(\d+)./)[1];
                            currentCounterIndex = elementDotFormat.match(/objectives.(\d+)./)[1];
                            counterElement = 'cmi.interactions.' + currentN + '.objectives._count';
                        }
                        else if (elementDotFormat.indexOf('.correct_responses.') > 0) {
                            currentN = elementDotFormat.match(/cmi.interactions.(\d+)./)[1];
                            currentCounterIndex = elementDotFormat.match(/correct_responses.(\d+)./)[1];
                            counterElement = 'cmi.interactions.' + currentN + '.correct_responses._count';
                        }
                        else {
                            counterElement = 'cmi.interactions._count';
                            currentCounterIndex = elementDotFormat.match(/.(\d+)./)[1];
                        }
                    }
                    if (counterElement) {
                        if (typeof this.currentUserData[scoId][counterElement] == 'undefined') {
                            this.currentUserData[scoId][counterElement] = 0;
                        }
                        // Check if we need to sum.
                        if (parseInt(currentCounterIndex) == parseInt(this.currentUserData[scoId][counterElement])) {
                            this.currentUserData[scoId][counterElement] = parseInt(this.currentUserData[scoId][counterElement]) + 1;
                        }
                        if (parseInt(currentCounterIndex) > parseInt(this.currentUserData[scoId][counterElement])) {
                            this.currentUserData[scoId][counterElement] = parseInt(currentCounterIndex) - 1;
                        }
                    }
                }
            }
            // Set default status.
            if (this.currentUserData[scoId]['cmi.core.lesson_status'] === '') {
                this.currentUserData[scoId]['cmi.core.lesson_status'] = 'not attempted';
            }
            // Define mode and credit.
            this.currentUserData[scoId]['cmi.core.credit'] = this.mode == providers_scorm["a" /* AddonModScormProvider */].MODENORMAL ? 'credit' : 'no-credit';
            this.currentUserData[scoId]['cmi.core.lesson_mode'] = this.mode;
        }
    };
    /**
     * Commit the changes.
     *
     * @param {string} param Param.
     * @return {string} "true" if success, "false" otherwise.
     */
    AddonModScormDataModel12.prototype.LMSCommit = function (param) {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
        this.errorCode = '0';
        if (param == '') {
            if (this.initialized) {
                var result = this.storeData(false);
                // Trigger TOC update.
                this.triggerEvent(providers_scorm["a" /* AddonModScormProvider */].UPDATE_TOC_EVENT);
                this.errorCode = result ? '0' : '101';
                // Conver to string representing a boolean.
                return result ? 'true' : 'false';
            }
            else {
                this.errorCode = '301';
            }
        }
        else {
            this.errorCode = '201';
        }
        return 'false';
    };
    /**
     * Finish the data model.
     *
     * @param {string} param Param.
     * @return {string} "true" if success, "false" otherwise.
     */
    AddonModScormDataModel12.prototype.LMSFinish = function (param) {
        this.errorCode = '0';
        if (param == '') {
            if (this.initialized) {
                this.initialized = false;
                var result = this.storeData(true);
                if (this.getEl('nav.event') != '') {
                    if (this.getEl('nav.event') == 'continue') {
                        this.triggerEvent(providers_scorm["a" /* AddonModScormProvider */].LAUNCH_NEXT_SCO_EVENT);
                    }
                    else {
                        this.triggerEvent(providers_scorm["a" /* AddonModScormProvider */].LAUNCH_PREV_SCO_EVENT);
                    }
                }
                else {
                    if (this.scorm.auto == '1') {
                        this.triggerEvent(providers_scorm["a" /* AddonModScormProvider */].LAUNCH_NEXT_SCO_EVENT);
                    }
                }
                this.errorCode = result ? '0' : '101';
                // Trigger TOC update.
                this.triggerEvent(providers_scorm["a" /* AddonModScormProvider */].UPDATE_TOC_EVENT);
                // Conver to string representing a boolean.
                return result ? 'true' : 'false';
            }
            else {
                this.errorCode = '301';
            }
        }
        else {
            this.errorCode = '201';
        }
        return 'false';
    };
    /**
     * Get diagnostic.
     *
     * @param  {string} param Param.
     * @return {string} Result.
     */
    AddonModScormDataModel12.prototype.LMSGetDiagnostic = function (param) {
        if (param == '') {
            param = this.errorCode;
        }
        return param;
    };
    /**
     * Get the error message for a certain code.
     *
     * @param {string} param Error code.
     * @return {string} Error message.
     */
    AddonModScormDataModel12.prototype.LMSGetErrorString = function (param) {
        if (param != '') {
            return this.ERROR_STRINGS[param];
        }
        else {
            return '';
        }
    };
    /**
     * Get the last error code.
     *
     * @return {string} Last error code.
     */
    AddonModScormDataModel12.prototype.LMSGetLastError = function () {
        return this.errorCode;
    };
    /**
     * Get the value of a certain element.
     *
     * @param {string} element Name of the element to get.
     * @return {string} Value.
     */
    AddonModScormDataModel12.prototype.LMSGetValue = function (element) {
        this.errorCode = '0';
        if (this.initialized) {
            if (element != '') {
                var expression = new RegExp(this.CMI_INDEX, 'g'), elementModel = String(element).replace(expression, '.n.');
                if (typeof this.dataModel[this.scoId][elementModel] != 'undefined') {
                    if (this.dataModel[this.scoId][elementModel].mod != 'w') {
                        this.errorCode = '0';
                        return this.getEl(element);
                    }
                    else {
                        this.errorCode = this.dataModel[this.scoId][elementModel].readerror;
                    }
                }
                else {
                    var childrenStr = '._children', countStr = '._count';
                    if (elementModel.substr(elementModel.length - childrenStr.length, elementModel.length) == childrenStr) {
                        var parentModel = elementModel.substr(0, elementModel.length - childrenStr.length);
                        if (typeof this.dataModel[this.scoId][parentModel] != 'undefined') {
                            this.errorCode = '202';
                        }
                        else {
                            this.errorCode = '201';
                        }
                    }
                    else if (elementModel.substr(elementModel.length - countStr.length, elementModel.length) == countStr) {
                        var parentModel = elementModel.substr(0, elementModel.length - countStr.length);
                        if (typeof this.dataModel[this.scoId][parentModel] != 'undefined') {
                            this.errorCode = '203';
                        }
                        else {
                            this.errorCode = '201';
                        }
                    }
                    else {
                        this.errorCode = '201';
                    }
                }
            }
            else {
                this.errorCode = '201';
            }
        }
        else {
            this.errorCode = '301';
        }
        return '';
    };
    /**
     * Initialize the data model.
     *
     * @param {string} param Param.
     * @return {string} "true" if initialized, "false" otherwise.
     */
    AddonModScormDataModel12.prototype.LMSInitialize = function (param) {
        this.errorCode = '0';
        if (param == '') {
            if (!this.initialized) {
                this.initialized = true;
                this.errorCode = '0';
                return 'true';
            }
            else {
                this.errorCode = '101';
            }
        }
        else {
            this.errorCode = '201';
        }
        return 'false';
    };
    /**
     * Set the value of a certain element.
     *
     * @param {string} element Name of the element to set.
     * @param {any} value Value to set.
     * @return {string} "true" if success, "false" otherwise.
     */
    AddonModScormDataModel12.prototype.LMSSetValue = function (element, value) {
        this.errorCode = '0';
        if (this.initialized) {
            if (element != '') {
                var expression = new RegExp(this.CMI_INDEX, 'g');
                var elementModel = String(element).replace(expression, '.n.');
                if (typeof this.dataModel[this.scoId][elementModel] != 'undefined') {
                    if (this.dataModel[this.scoId][elementModel].mod != 'r') {
                        expression = new RegExp(this.dataModel[this.scoId][elementModel].format);
                        value = value + '';
                        var matches = value.match(expression);
                        if (matches != null) {
                            // Create dynamic data model element.
                            if (element != elementModel) {
                                // Init default counters and values.
                                if (element.indexOf('cmi.objectives') === 0) {
                                    var currentN = element.match(/cmi.objectives.(\d+)./)[1], counterElement = 'cmi.objectives.' + currentN + '.score';
                                    if (typeof this.currentUserData[this.scoId][counterElement + '._children'] == 'undefined') {
                                        this.setEl(this.currentUserData[this.scoId][counterElement + '._children'], this.SCORE_CHILDREN);
                                        this.setEl(this.currentUserData[this.scoId][counterElement + '.raw'], '');
                                        this.setEl(this.currentUserData[this.scoId][counterElement + '.min'], '');
                                        this.setEl(this.currentUserData[this.scoId][counterElement + '.max'], '');
                                    }
                                }
                                else if (element.indexOf('cmi.interactions') === 0) {
                                    var currentN = element.match(/cmi.interactions.(\d+)./)[1];
                                    var counterElement = 'cmi.interactions.' + currentN + '.objectives._count';
                                    if (typeof this.currentUserData[this.scoId][counterElement] == 'undefined') {
                                        this.setEl(counterElement, 0);
                                    }
                                    counterElement = 'cmi.interactions.' + currentN + '.correct_responses._count';
                                    if (typeof this.currentUserData[this.scoId][counterElement] == 'undefined') {
                                        this.setEl(counterElement, 0);
                                    }
                                }
                                var elementIndexes = element.split('.');
                                var subElement = 'cmi';
                                for (var i = 1; i < elementIndexes.length - 1; i++) {
                                    var elementIndex = elementIndexes[i];
                                    if (elementIndexes[i + 1].match(/^\d+$/)) {
                                        var counterElement = subElement + '.' + elementIndex + '._count';
                                        if (typeof this.currentUserData[this.scoId][counterElement] == 'undefined') {
                                            this.setEl(counterElement, 0);
                                        }
                                        if (elementIndexes[i + 1] == this.getEl(counterElement)) {
                                            var count = this.getEl(counterElement);
                                            this.setEl(counterElement, parseInt(count, 10) + 1);
                                        }
                                        if (elementIndexes[i + 1] > this.getEl(counterElement)) {
                                            this.errorCode = '201';
                                        }
                                        subElement = subElement.concat('.' + elementIndex + '.' + elementIndexes[i + 1]);
                                        i++;
                                    }
                                    else {
                                        subElement = subElement.concat('.' + elementIndex);
                                    }
                                }
                                element = subElement.concat('.' + elementIndexes[elementIndexes.length - 1]);
                            }
                            // Store data.
                            if (this.errorCode == '0') {
                                if (this.scorm.autocommit && !(this.timeout)) {
                                    this.timeout = setTimeout(this.LMSCommit.bind(this), 60000, ['']);
                                }
                                if (typeof this.dataModel[this.scoId][elementModel].range != 'undefined') {
                                    var range = this.dataModel[this.scoId][elementModel].range, ranges = range.split('#');
                                    value = value * 1.0;
                                    if ((value >= ranges[0]) && (value <= ranges[1])) {
                                        this.setEl(element, value);
                                        this.errorCode = '0';
                                        return 'true';
                                    }
                                    else {
                                        this.errorCode = this.dataModel[this.scoId][elementModel].writeerror;
                                    }
                                }
                                else {
                                    if (element == 'cmi.comments') {
                                        this.setEl('cmi.comments', this.getEl('cmi.comments') + value);
                                    }
                                    else {
                                        this.setEl(element, value);
                                    }
                                    this.errorCode = '0';
                                    return 'true';
                                }
                            }
                        }
                        else {
                            this.errorCode = this.dataModel[this.scoId][elementModel].writeerror;
                        }
                    }
                    else {
                        this.errorCode = this.dataModel[this.scoId][elementModel].writeerror;
                    }
                }
                else {
                    this.errorCode = '201';
                }
            }
            else {
                this.errorCode = '201';
            }
        }
        else {
            this.errorCode = '301';
        }
        return 'false';
    };
    /**
     * Set a SCO ID.
     * The scoId is like a pointer to be able to retrieve the SCO default values and set the new ones in the overall SCORM
     * data structure.
     *
     * @param {number} scoId The new SCO id.
     */
    AddonModScormDataModel12.prototype.loadSco = function (scoId) {
        this.scoId = scoId;
    };
    /**
     * Set the value of the given element in the non-persistent (current) user data.
     *
     * @param {string} el The element.
     * @param {any} value The value.
     */
    AddonModScormDataModel12.prototype.setEl = function (el, value) {
        if (typeof this.currentUserData[this.scoId] == 'undefined') {
            this.currentUserData[this.scoId] = {};
        }
        this.currentUserData[this.scoId][el] = value;
    };
    /**
     * Set offline mode to true or false.
     *
     * @param {boolean} offline True if offline, false otherwise.
     */
    AddonModScormDataModel12.prototype.setOffline = function (offline) {
        this.offline = offline;
    };
    /**
     * Persist the current user data (this is usually called by LMSCommit).
     *
     * @param {boolean} storeTotalTime If true, we need to calculate the total time too.
     * @return {boolean} True if success, false otherwise.
     */
    AddonModScormDataModel12.prototype.storeData = function (storeTotalTime) {
        var tracks;
        if (storeTotalTime) {
            if (this.getEl('cmi.core.lesson_status') == 'not attempted') {
                this.setEl('cmi.core.lesson_status', 'completed');
            }
            if (this.getEl('cmi.core.lesson_mode') == providers_scorm["a" /* AddonModScormProvider */].MODENORMAL) {
                if (this.getEl('cmi.core.credit') == 'credit') {
                    if (this.getEl('cmi.student_data.mastery_score') !== '' && this.getEl('cmi.core.score.raw') !== '') {
                        if (parseFloat(this.getEl('cmi.core.score.raw')) >=
                            parseFloat(this.getEl('cmi.student_data.mastery_score'))) {
                            this.setEl('cmi.core.lesson_status', 'passed');
                        }
                        else {
                            this.setEl('cmi.core.lesson_status', 'failed');
                        }
                    }
                }
            }
            if (this.getEl('cmi.core.lesson_mode') == providers_scorm["a" /* AddonModScormProvider */].MODEBROWSE) {
                if (this.dataModel[this.scoId]['cmi.core.lesson_status'].defaultvalue == '' &&
                    this.getEl('cmi.core.lesson_status') == 'not attempted') {
                    this.setEl('cmi.core.lesson_status', 'browsed');
                }
            }
            tracks = this.collectData();
            tracks.push(this.totalTime());
        }
        else {
            tracks = this.collectData();
        }
        var success = this.scormProvider.saveTracksSync(this.scoId, this.attempt, tracks, this.scorm, this.offline, this.currentUserData);
        if (!this.offline && !success) {
            // Failure storing data in online. Go offline.
            this.offline = true;
            this.triggerEvent(providers_scorm["a" /* AddonModScormProvider */].GO_OFFLINE_EVENT);
            return this.scormProvider.saveTracksSync(this.scoId, this.attempt, tracks, this.scorm, this.offline, this.currentUserData);
        }
        return success;
    };
    /**
     * Utility function for calculating the total time spent in the SCO.
     *
     * @return {any} Total time element.
     */
    AddonModScormDataModel12.prototype.totalTime = function () {
        var totalTime = this.addTime(this.getEl('cmi.core.total_time'), this.getEl('cmi.core.session_time'));
        return { element: 'cmi.core.total_time', value: totalTime };
    };
    /**
     * Convenience function to trigger events.
     *
     * @param {string} name Name of the event to trigger.
     */
    AddonModScormDataModel12.prototype.triggerEvent = function (name) {
        this.eventsProvider.trigger(name, {
            scormId: this.scorm.id,
            scoId: this.scoId,
            attempt: this.attempt
        }, this.siteId);
    };
    return AddonModScormDataModel12;
}());

//# sourceMappingURL=data-model-12.js.map
// CONCATENATED MODULE: ./src/addon/mod/scorm/pages/player/player.ts
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
 * Page that allows playing a SCORM.
 */
var player_AddonModScormPlayerPage = /** @class */ (function () {
    function AddonModScormPlayerPage(navParams, modalCtrl, eventsProvider, sitesProvider, syncProvider, domUtils, timeUtils, scormProvider, scormHelper, scormSyncProvider, tabs) {
        this.modalCtrl = modalCtrl;
        this.eventsProvider = eventsProvider;
        this.sitesProvider = sitesProvider;
        this.syncProvider = syncProvider;
        this.domUtils = domUtils;
        this.timeUtils = timeUtils;
        this.scormProvider = scormProvider;
        this.scormHelper = scormHelper;
        this.scormSyncProvider = scormSyncProvider;
        this.tabs = tabs;
        this.loadingToc = true; // Whether the TOC is being loaded.
        this.offline = false; // Whether it's offline mode.
        this.scorm = navParams.get('scorm') || {};
        this.mode = navParams.get('mode') || providers_scorm["a" /* AddonModScormProvider */].MODENORMAL;
        this.newAttempt = !!navParams.get('newAttempt');
        this.organizationId = navParams.get('organizationId');
        this.initialScoId = navParams.get('scoId');
        this.siteId = this.sitesProvider.getCurrentSiteId();
        // We use SCORM name at start, later we'll use the SCO title.
        this.title = this.scorm.name;
        // Block the SCORM so it cannot be synchronized.
        this.syncProvider.blockOperation(providers_scorm["a" /* AddonModScormProvider */].COMPONENT, this.scorm.id, 'player');
    }
    /**
     * Component being initialized.
     */
    AddonModScormPlayerPage.prototype.ngOnInit = function () {
        var _this = this;
        this.showToc = this.scormProvider.displayTocInPlayer(this.scorm);
        if (this.scorm.popup) {
            this.tabs.changeVisibility(false);
            // If we receive a value <= 100 we need to assume it's a percentage.
            if (this.scorm.width <= 100) {
                this.scorm.width = this.scorm.width + '%';
            }
            if (this.scorm.height <= 100) {
                this.scorm.height = this.scorm.height + '%';
            }
        }
        // Fetch the SCORM data.
        this.fetchData().then(function () {
            if (_this.currentSco) {
                // Set start time if it's a new attempt.
                var promise = _this.newAttempt ? _this.setStartTime(_this.currentSco.id) : Promise.resolve();
                return promise.catch(function (error) {
                    _this.domUtils.showErrorModalDefault(error, 'addon.mod_scorm.errorgetscorm', true);
                }).finally(function () {
                    // Load SCO.
                    _this.loadSco(_this.currentSco);
                });
            }
        }).finally(function () {
            _this.loaded = true;
        });
        // Listen for events to update the TOC, navigate through SCOs and go offline.
        this.tocObserver = this.eventsProvider.on(providers_scorm["a" /* AddonModScormProvider */].UPDATE_TOC_EVENT, function (data) {
            if (data.scormId === _this.scorm.id) {
                if (_this.offline) {
                    // Wait a bit to make sure data is stored.
                    setTimeout(_this.refreshToc.bind(_this), 100);
                }
                else {
                    _this.refreshToc();
                }
            }
        }, this.siteId);
        this.launchNextObserver = this.eventsProvider.on(providers_scorm["a" /* AddonModScormProvider */].LAUNCH_NEXT_SCO_EVENT, function (data) {
            if (data.scormId === _this.scorm.id && _this.nextSco) {
                _this.loadSco(_this.nextSco);
            }
        }, this.siteId);
        this.launchPrevObserver = this.eventsProvider.on(providers_scorm["a" /* AddonModScormProvider */].LAUNCH_PREV_SCO_EVENT, function (data) {
            if (data.scormId === _this.scorm.id && _this.previousSco) {
                _this.loadSco(_this.previousSco);
            }
        }, this.siteId);
        this.goOfflineObserver = this.eventsProvider.on(providers_scorm["a" /* AddonModScormProvider */].GO_OFFLINE_EVENT, function (data) {
            if (data.scormId === _this.scorm.id && !_this.offline) {
                _this.offline = true;
                // Wait a bit to prevent collisions between this store and SCORM API's store.
                setTimeout(function () {
                    _this.scormHelper.convertAttemptToOffline(_this.scorm, _this.attempt).catch(function (error) {
                        _this.domUtils.showErrorModalDefault(error, 'core.error', true);
                    }).then(function () {
                        _this.refreshToc();
                    });
                }, 200);
            }
        }, this.siteId);
    };
    /**
     * Calculate the next and previous SCO.
     *
     * @param {number} scoId Current SCO ID.
     */
    AddonModScormPlayerPage.prototype.calculateNextAndPreviousSco = function (scoId) {
        this.previousSco = this.scormHelper.getPreviousScoFromToc(this.toc, scoId);
        this.nextSco = this.scormHelper.getNextScoFromToc(this.toc, scoId);
    };
    /**
     * Determine the attempt to use, the mode (normal/preview) and if it's offline or online.
     *
     * @param {AddonModScormAttemptCountResult} attemptsData Attempts count.
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonModScormPlayerPage.prototype.determineAttemptAndMode = function (attemptsData) {
        var _this = this;
        var result;
        return this.scormHelper.determineAttemptToContinue(this.scorm, attemptsData).then(function (data) {
            _this.attempt = data.number;
            _this.offline = data.offline;
            if (_this.attempt != attemptsData.lastAttempt.number) {
                _this.attemptToContinue = _this.attempt;
            }
            // Check if current attempt is incomplete.
            if (_this.attempt > 0) {
                return _this.scormProvider.isAttemptIncomplete(_this.scorm.id, _this.attempt, _this.offline);
            }
            else {
                // User doesn't have attempts. Last attempt is not incomplete (since he doesn't have any).
                return false;
            }
        }).then(function (incomplete) {
            // Determine mode and attempt to use.
            result = _this.scormProvider.determineAttemptAndMode(_this.scorm, _this.mode, _this.attempt, _this.newAttempt, incomplete);
            if (result.attempt > _this.attempt) {
                // We're creating a new attempt.
                if (_this.offline) {
                    // Last attempt was offline, so we'll create a new offline attempt.
                    return _this.scormHelper.createOfflineAttempt(_this.scorm, result.attempt, attemptsData.online.length);
                }
                else {
                    // Last attempt was online, verify that we can create a new online attempt. We ignore cache.
                    return _this.scormProvider.getScormUserData(_this.scorm.id, result.attempt, undefined, false, true).catch(function () {
                        // Cannot communicate with the server, create an offline attempt.
                        _this.offline = true;
                        return _this.scormHelper.createOfflineAttempt(_this.scorm, result.attempt, attemptsData.online.length);
                    });
                }
            }
        }).then(function () {
            _this.mode = result.mode;
            _this.newAttempt = result.newAttempt;
            _this.attempt = result.attempt;
        });
    };
    /**
     * Fetch data needed to play the SCORM.
     *
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonModScormPlayerPage.prototype.fetchData = function () {
        var _this = this;
        // Wait for any ongoing sync to finish. We won't sync a SCORM while it's being played.
        return this.scormSyncProvider.waitForSync(this.scorm.id).then(function () {
            // Get attempts data.
            return _this.scormProvider.getAttemptCount(_this.scorm.id).then(function (attemptsData) {
                return _this.determineAttemptAndMode(attemptsData).then(function () {
                    // Fetch TOC and get user data.
                    var promises = [];
                    promises.push(_this.fetchToc());
                    promises.push(_this.scormProvider.getScormUserData(_this.scorm.id, _this.attempt, undefined, _this.offline)
                        .then(function (data) {
                        _this.userData = data;
                    }));
                    return Promise.all(promises);
                });
            }).catch(function (error) {
                _this.domUtils.showErrorModalDefault(error, 'addon.mod_scorm.errorgetscorm', true);
            });
        });
    };
    /**
     * Fetch the TOC.
     *
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonModScormPlayerPage.prototype.fetchToc = function () {
        var _this = this;
        this.loadingToc = true;
        // We need to check incomplete again: attempt number or status might have changed.
        return this.scormProvider.isAttemptIncomplete(this.scorm.id, this.attempt, this.offline).then(function (incomplete) {
            _this.scorm.incomplete = incomplete;
            // Get TOC.
            return _this.scormProvider.getOrganizationToc(_this.scorm.id, _this.attempt, _this.organizationId, _this.offline);
        }).then(function (toc) {
            _this.toc = _this.scormProvider.formatTocToArray(toc);
            // Get images for each SCO.
            _this.toc.forEach(function (sco) {
                sco.image = _this.scormProvider.getScoStatusIcon(sco, _this.scorm.incomplete);
            });
            if (!_this.currentSco) {
                if (_this.newAttempt) {
                    // Creating a new attempt, use the first SCO defined by the SCORM.
                    _this.initialScoId = _this.scorm.launch;
                }
                // Determine current SCO if we received an ID.
                if (_this.initialScoId > 0) {
                    // SCO set by parameter, get it from TOC.
                    _this.currentSco = _this.scormHelper.getScoFromToc(_this.toc, _this.initialScoId);
                }
                if (!_this.currentSco) {
                    // No SCO defined. Get the first valid one.
                    return _this.scormHelper.getFirstSco(_this.scorm.id, _this.attempt, _this.toc, _this.organizationId, _this.mode, _this.offline).then(function (sco) {
                        if (sco) {
                            _this.currentSco = sco;
                        }
                        else {
                            // We couldn't find a SCO to load: they're all inactive or without launch URL.
                            _this.errorMessage = 'addon.mod_scorm.errornovalidsco';
                        }
                    });
                }
            }
        }).finally(function () {
            _this.loadingToc = false;
        });
    };
    /**
     * Page will leave.
     */
    AddonModScormPlayerPage.prototype.ionViewWillUnload = function () {
        // Empty src when leaving the state so unload event is triggered in the iframe.
        this.src = '';
    };
    /**
     * Load a SCO.
     *
     * @param {any} sco The SCO to load.
     */
    AddonModScormPlayerPage.prototype.loadSco = function (sco) {
        var _this = this;
        if (!this.dataModel) {
            // Create the model.
            this.dataModel = new data_model_12_AddonModScormDataModel12(this.eventsProvider, this.scormProvider, this.siteId, this.scorm, sco.id, this.attempt, this.userData, this.mode, this.offline);
            // Add the model to the window so the SCORM can access it.
            window.API = this.dataModel;
        }
        else {
            // Load the SCO in the existing model.
            this.dataModel.loadSco(sco.id);
        }
        this.currentSco = sco;
        this.title = sco.title || this.scorm.name; // Try to use SCO title.
        this.calculateNextAndPreviousSco(sco.id);
        // Load the SCO source.
        this.scormProvider.getScoSrc(this.scorm, sco).then(function (src) {
            if (src == _this.src) {
                // Re-loading same page. Set it to empty and then re-set the src in the next digest so it detects it has changed.
                _this.src = '';
                setTimeout(function () {
                    _this.src = src;
                });
            }
            else {
                _this.src = src;
            }
        });
        if (sco.scormtype == 'asset') {
            // Mark the asset as completed.
            var tracks_1 = [{
                    element: 'cmi.core.lesson_status',
                    value: 'completed'
                }];
            this.scormProvider.saveTracks(sco.id, this.attempt, tracks_1, this.scorm, this.offline).catch(function () {
                // Error saving data. We'll go offline if we're online and the asset is not marked as completed already.
                if (!_this.offline) {
                    return _this.scormProvider.getScormUserData(_this.scorm.id, _this.attempt, undefined, false).then(function (data) {
                        if (!data[sco.id] || data[sco.id].userdata['cmi.core.lesson_status'] != 'completed') {
                            // Go offline.
                            return _this.scormHelper.convertAttemptToOffline(_this.scorm, _this.attempt).then(function () {
                                _this.offline = true;
                                _this.dataModel.setOffline(true);
                                return _this.scormProvider.saveTracks(sco.id, _this.attempt, tracks_1, _this.scorm, true);
                            }).catch(function (error) {
                                _this.domUtils.showErrorModalDefault(error, 'core.error', true);
                            });
                        }
                    });
                }
            }).then(function () {
                // Refresh TOC, some prerequisites might have changed.
                _this.refreshToc();
            });
        }
        // Trigger SCO launch event.
        this.scormProvider.logLaunchSco(this.scorm.id, sco.id, this.scorm.name).catch(function () {
            // Ignore errors.
        });
    };
    /**
     * Show the TOC.
     *
     * @param {MouseEvent} event Event.
     */
    AddonModScormPlayerPage.prototype.openToc = function (event) {
        var _this = this;
        var modal = this.modalCtrl.create('AddonModScormTocPage', {
            toc: this.toc,
            attemptToContinue: this.attemptToContinue,
            mode: this.mode,
            selected: this.currentSco && this.currentSco.id
        }, { cssClass: 'core-modal-lateral',
            showBackdrop: true,
            enableBackdropDismiss: true,
            enterAnimation: 'core-modal-lateral-transition',
            leaveAnimation: 'core-modal-lateral-transition' });
        // If the modal sends back a SCO, load it.
        modal.onDidDismiss(function (sco) {
            if (sco) {
                _this.loadSco(sco);
            }
        });
        modal.present({
            ev: event
        });
    };
    /**
     * Refresh the TOC.
     *
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonModScormPlayerPage.prototype.refreshToc = function () {
        var _this = this;
        return this.scormProvider.invalidateAllScormData(this.scorm.id).catch(function () {
            // Ignore errors.
        }).then(function () {
            return _this.fetchToc();
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'addon.mod_scorm.errorgetscorm', true);
        });
    };
    /**
     * Set SCORM start time.
     *
     * @param {number} scoId SCO ID.
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonModScormPlayerPage.prototype.setStartTime = function (scoId) {
        var _this = this;
        var tracks = [{
                element: 'x.start.time',
                value: this.timeUtils.timestamp()
            }];
        return this.scormProvider.saveTracks(scoId, this.attempt, tracks, this.scorm, this.offline).then(function () {
            if (!_this.offline) {
                // New online attempt created, update cached data about online attempts.
                _this.scormProvider.getAttemptCount(_this.scorm.id, false, true).catch(function () {
                    // Ignore errors.
                });
            }
        });
    };
    /**
     * Component being destroyed.
     */
    AddonModScormPlayerPage.prototype.ngOnDestroy = function () {
        var _this = this;
        // Stop listening for events.
        this.tocObserver && this.tocObserver.off();
        this.launchNextObserver && this.launchNextObserver.off();
        this.launchPrevObserver && this.launchPrevObserver.off();
        setTimeout(function () {
            _this.goOfflineObserver && _this.goOfflineObserver.off();
        }, 500);
        // Unblock the SCORM so it can be synced.
        this.syncProvider.unblockOperation(providers_scorm["a" /* AddonModScormProvider */].COMPONENT, this.scorm.id, 'player');
        this.tabs.changeVisibility(true);
    };
    AddonModScormPlayerPage = __decorate([
        Object(core["m" /* Component */])({
            selector: 'page-addon-mod-scorm-player',
            templateUrl: 'player.html',
        }),
        __metadata("design:paramtypes", [ionic_angular["t" /* NavParams */], ionic_angular["q" /* ModalController */], events["a" /* CoreEventsProvider */],
            sites["a" /* CoreSitesProvider */], sync["a" /* CoreSyncProvider */],
            dom["a" /* CoreDomUtilsProvider */], time["a" /* CoreTimeUtilsProvider */],
            providers_scorm["a" /* AddonModScormProvider */], helper["a" /* AddonModScormHelperProvider */],
            scorm_sync["a" /* AddonModScormSyncProvider */], ion_tabs["a" /* CoreIonTabsComponent */]])
    ], AddonModScormPlayerPage);
    return AddonModScormPlayerPage;
}());

//# sourceMappingURL=player.js.map
// CONCATENATED MODULE: ./src/addon/mod/scorm/pages/player/player.module.ts
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
var player_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var player_module_AddonModScormPlayerPageModule = /** @class */ (function () {
    function AddonModScormPlayerPageModule() {
    }
    AddonModScormPlayerPageModule = player_module___decorate([
        Object(core["I" /* NgModule */])({
            declarations: [
                player_AddonModScormPlayerPage,
            ],
            imports: [
                components_module["a" /* CoreComponentsModule */],
                directives_module["a" /* CoreDirectivesModule */],
                ionic_angular["l" /* IonicPageModule */].forChild(player_AddonModScormPlayerPage),
                _ngx_translate_core["b" /* TranslateModule */].forChild()
            ],
        })
    ], AddonModScormPlayerPageModule);
    return AddonModScormPlayerPageModule;
}());

//# sourceMappingURL=player.module.js.map
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

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/spinner/spinner.ngfactory.js
var spinner_ngfactory = __webpack_require__(128);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/spinner/spinner.js
var spinner = __webpack_require__(112);

// EXTERNAL MODULE: ./src/components/iframe/iframe.ngfactory.js
var iframe_ngfactory = __webpack_require__(377);

// EXTERNAL MODULE: ./src/components/iframe/iframe.ts
var iframe = __webpack_require__(279);

// EXTERNAL MODULE: ./src/providers/logger.ts
var logger = __webpack_require__(5);

// EXTERNAL MODULE: ./src/providers/utils/iframe.ts
var utils_iframe = __webpack_require__(37);

// EXTERNAL MODULE: ./node_modules/@angular/platform-browser/esm5/platform-browser.js
var platform_browser = __webpack_require__(79);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-controller.js
var nav_controller = __webpack_require__(19);

// EXTERNAL MODULE: ./src/components/split-view/split-view.ts
var split_view = __webpack_require__(26);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-header.js
var toolbar_header = __webpack_require__(468);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/view-controller.js
var view_controller = __webpack_require__(38);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/navbar.ngfactory.js
var navbar_ngfactory = __webpack_require__(1477);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/navbar.js
var navbar = __webpack_require__(221);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/app/app.js + 3 modules
var app = __webpack_require__(34);

// EXTERNAL MODULE: ./src/directives/back-button.ts
var back_button = __webpack_require__(711);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/platform.js + 1 modules
var platform = __webpack_require__(16);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.ngfactory.js
var toolbar_title_ngfactory = __webpack_require__(1478);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.js
var toolbar_title = __webpack_require__(364);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar.js
var toolbar = __webpack_require__(267);

// EXTERNAL MODULE: ./src/directives/format-text.ts
var format_text = __webpack_require__(41);

// EXTERNAL MODULE: ./src/providers/utils/text.ts
var utils_text = __webpack_require__(10);

// EXTERNAL MODULE: ./src/providers/utils/utils.ts
var utils = __webpack_require__(2);

// EXTERNAL MODULE: ./src/providers/utils/url.ts
var url = __webpack_require__(23);

// EXTERNAL MODULE: ./src/providers/filepool.ts
var filepool = __webpack_require__(17);

// EXTERNAL MODULE: ./src/providers/app.ts
var providers_app = __webpack_require__(9);

// EXTERNAL MODULE: ./src/core/contentlinks/providers/helper.ts
var providers_helper = __webpack_require__(14);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.js
var content = __webpack_require__(25);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-item.js
var toolbar_item = __webpack_require__(469);

// EXTERNAL MODULE: ./node_modules/@angular/common/esm5/common.js
var common = __webpack_require__(8);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.ngfactory.js
var content_ngfactory = __webpack_require__(176);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/dom-controller.js
var dom_controller = __webpack_require__(33);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/keyboard.js
var keyboard = __webpack_require__(101);

// EXTERNAL MODULE: ./src/components/loading/loading.ngfactory.js
var loading_ngfactory = __webpack_require__(50);

// EXTERNAL MODULE: ./src/components/loading/loading.ts
var loading = __webpack_require__(47);

// EXTERNAL MODULE: ./src/components/navigation-bar/navigation-bar.ngfactory.js
var navigation_bar_ngfactory = __webpack_require__(757);

// EXTERNAL MODULE: ./src/components/navigation-bar/navigation-bar.ts
var navigation_bar = __webpack_require__(390);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-params.js
var nav_params = __webpack_require__(70);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/modal/modal-controller.js
var modal_controller = __webpack_require__(178);

// CONCATENATED MODULE: ./src/addon/mod/scorm/pages/player/player.ngfactory.js
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 























































var styles_AddonModScormPlayerPage = [];
var RenderType_AddonModScormPlayerPage = core["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_AddonModScormPlayerPage, data: {} });

function View_AddonModScormPlayerPage_1(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 6, "button", [["aria-haspopup", "true"], ["icon-only", ""], ["ion-button", ""]], [[1, "aria-label", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.openToc($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](1, 1097728, [[1, 4]], 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                "])), (_l()(), core["_31" /* ɵeld */](4, 0, null, 0, 1, "ion-icon", [["name", "bookmark"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](5, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n            "]))], function (_ck, _v) { var currVal_2 = "bookmark"; _ck(_v, 5, 0, currVal_2); }, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 0, 0, core["_44" /* ɵnov */](_v, 2).transform("addon.mod_scorm.toc")); _ck(_v, 0, 0, currVal_0); var currVal_1 = core["_44" /* ɵnov */](_v, 5)._hidden; _ck(_v, 4, 0, currVal_1); }); }
function View_AddonModScormPlayerPage_2(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "ion-spinner", [], [[2, "spinner-paused", null]], null, null, spinner_ngfactory["b" /* View_Spinner_0 */], spinner_ngfactory["a" /* RenderType_Spinner */])), core["_30" /* ɵdid */](1, 114688, null, 0, spinner["a" /* Spinner */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 1)._paused; _ck(_v, 0, 0, currVal_0); }); }
function View_AddonModScormPlayerPage_3(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "core-iframe", [], null, null, null, iframe_ngfactory["b" /* View_CoreIframeComponent_0 */], iframe_ngfactory["a" /* RenderType_CoreIframeComponent */])), core["_30" /* ɵdid */](1, 638976, null, 0, iframe["a" /* CoreIframeComponent */], [logger["a" /* CoreLoggerProvider */], utils_iframe["a" /* CoreIframeUtilsProvider */], dom["a" /* CoreDomUtilsProvider */], platform_browser["c" /* DomSanitizer */], nav_controller["a" /* NavController */], [2, split_view["a" /* CoreSplitViewComponent */]]], { src: [0, "src"], iframeWidth: [1, "iframeWidth"], iframeHeight: [2, "iframeHeight"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.src; var currVal_1 = (_co.scorm.popup ? _co.scorm.width : undefined); var currVal_2 = (_co.scorm.popup ? _co.scorm.height : undefined); _ck(_v, 1, 0, currVal_0, currVal_1, currVal_2); }, null); }
function View_AddonModScormPlayerPage_4(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "p", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](1, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = core["_56" /* ɵunv */](_v, 1, 0, core["_44" /* ɵnov */](_v, 2).transform(_co.errorMessage)); _ck(_v, 1, 0, currVal_0); }); }
function View_AddonModScormPlayerPage_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 23, "ion-header", [], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, toolbar_header["a" /* Header */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, view_controller["a" /* ViewController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 19, "ion-navbar", [["class", "toolbar"], ["core-back-button", ""]], [[8, "hidden", 0], [2, "statusbar-padding", null]], null, null, navbar_ngfactory["b" /* View_Navbar_0 */], navbar_ngfactory["a" /* RenderType_Navbar */])), core["_30" /* ɵdid */](4, 49152, null, 0, navbar["a" /* Navbar */], [app["a" /* App */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_30" /* ɵdid */](5, 212992, null, 0, back_button["a" /* CoreBackButtonDirective */], [navbar["a" /* Navbar */], platform["a" /* Platform */], translate_service["a" /* TranslateService */], events["a" /* CoreEventsProvider */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n        "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 3, 3, "ion-title", [], null, null, null, toolbar_title_ngfactory["b" /* View_ToolbarTitle_0 */], toolbar_title_ngfactory["a" /* RenderType_ToolbarTitle */])), core["_30" /* ɵdid */](8, 49152, null, 0, toolbar_title["a" /* ToolbarTitle */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), (_l()(), core["_31" /* ɵeld */](9, 0, null, 0, 1, "core-format-text", [], null, null, null, null, null)), core["_30" /* ɵdid */](10, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform["a" /* Platform */], utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], providers_app["a" /* CoreAppProvider */], providers_helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], utils_iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */]], { text: [0, "text"] }, null), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n\n        "])), (_l()(), core["_31" /* ɵeld */](12, 0, null, 2, 9, "ion-buttons", [["end", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](13, 16384, null, 1, toolbar_item["a" /* ToolbarItem */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), core["_52" /* ɵqud */](603979776, 1, { _buttons: 1 }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModScormPlayerPage_1)), core["_30" /* ɵdid */](17, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModScormPlayerPage_2)), core["_30" /* ɵdid */](20, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_31" /* ɵeld */](25, 0, null, null, 15, "ion-content", [], [[2, "statusbar-padding", null], [2, "has-refresher", null]], null, null, content_ngfactory["b" /* View_Content_0 */], content_ngfactory["a" /* RenderType_Content */])), core["_30" /* ɵdid */](26, 4374528, null, 0, content["a" /* Content */], [config["a" /* Config */], platform["a" /* Platform */], dom_controller["a" /* DomController */], core["t" /* ElementRef */], core["V" /* Renderer */], app["a" /* App */], keyboard["a" /* Keyboard */], core["M" /* NgZone */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n    "])), (_l()(), core["_31" /* ɵeld */](28, 0, null, 1, 11, "core-loading", [], null, null, null, loading_ngfactory["b" /* View_CoreLoadingComponent_0 */], loading_ngfactory["a" /* RenderType_CoreLoadingComponent */])), core["_30" /* ɵdid */](29, 638976, null, 0, loading["a" /* CoreLoadingComponent */], [translate_service["a" /* TranslateService */], core["t" /* ElementRef */], events["a" /* CoreEventsProvider */], utils["a" /* CoreUtilsProvider */]], { hideUntil: [0, "hideUntil"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_31" /* ɵeld */](31, 0, null, 0, 1, "core-navigation-bar", [], null, [[null, "action"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("action" === en)) {
        var pd_0 = (_co.loadSco($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, navigation_bar_ngfactory["b" /* View_CoreNavigationBarComponent_0 */], navigation_bar_ngfactory["a" /* RenderType_CoreNavigationBarComponent */])), core["_30" /* ɵdid */](32, 49152, null, 0, navigation_bar["a" /* CoreNavigationBarComponent */], [utils_text["a" /* CoreTextUtilsProvider */]], { previous: [0, "previous"], next: [1, "next"] }, { action: "action" }), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonModScormPlayerPage_3)), core["_30" /* ɵdid */](35, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonModScormPlayerPage_4)), core["_30" /* ɵdid */](38, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; _ck(_v, 5, 0); var currVal_2 = _co.title; _ck(_v, 10, 0, currVal_2); var currVal_3 = (((_co.showToc && !_co.loadingToc) && _co.toc) && _co.toc.length); _ck(_v, 17, 0, currVal_3); var currVal_4 = (_co.showToc && _co.loadingToc); _ck(_v, 20, 0, currVal_4); var currVal_7 = _co.loaded; _ck(_v, 29, 0, currVal_7); var currVal_8 = _co.previousSco; var currVal_9 = _co.nextSco; _ck(_v, 32, 0, currVal_8, currVal_9); var currVal_10 = (_co.loaded && _co.src); _ck(_v, 35, 0, currVal_10); var currVal_11 = (!_co.src && _co.errorMessage); _ck(_v, 38, 0, currVal_11); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 4)._hidden; var currVal_1 = core["_44" /* ɵnov */](_v, 4)._sbPadding; _ck(_v, 3, 0, currVal_0, currVal_1); var currVal_5 = core["_44" /* ɵnov */](_v, 26).statusbarPadding; var currVal_6 = core["_44" /* ɵnov */](_v, 26)._hasRefresher; _ck(_v, 25, 0, currVal_5, currVal_6); }); }
function View_AddonModScormPlayerPage_Host_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "page-addon-mod-scorm-player", [], null, null, null, View_AddonModScormPlayerPage_0, RenderType_AddonModScormPlayerPage)), core["_30" /* ɵdid */](1, 245760, null, 0, player_AddonModScormPlayerPage, [nav_params["a" /* NavParams */], modal_controller["a" /* ModalController */], events["a" /* CoreEventsProvider */], sites["a" /* CoreSitesProvider */], sync["a" /* CoreSyncProvider */], dom["a" /* CoreDomUtilsProvider */], time["a" /* CoreTimeUtilsProvider */], providers_scorm["a" /* AddonModScormProvider */], helper["a" /* AddonModScormHelperProvider */], scorm_sync["a" /* AddonModScormSyncProvider */], ion_tabs["a" /* CoreIonTabsComponent */]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var AddonModScormPlayerPageNgFactory = core["_27" /* ɵccf */]("page-addon-mod-scorm-player", player_AddonModScormPlayerPage, View_AddonModScormPlayerPage_Host_0, {}, {}, []);

//# sourceMappingURL=player.ngfactory.js.map
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

// EXTERNAL MODULE: ./src/pipes/pipes.module.ts + 2 modules
var pipes_module = __webpack_require__(109);

// EXTERNAL MODULE: ./node_modules/ionic-angular/util/module-loader.js
var module_loader = __webpack_require__(268);

// CONCATENATED MODULE: ./src/addon/mod/scorm/pages/player/player.module.ngfactory.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddonModScormPlayerPageModuleNgFactory", function() { return AddonModScormPlayerPageModuleNgFactory; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 































var AddonModScormPlayerPageModuleNgFactory = core["_28" /* ɵcmf */](player_module_AddonModScormPlayerPageModule, [], function (_l) { return core["_40" /* ɵmod */]([core["_41" /* ɵmpd */](512, core["o" /* ComponentFactoryResolver */], core["_21" /* ɵCodegenComponentFactoryResolver */], [[8, [action_sheet_component_ngfactory["a" /* ActionSheetCmpNgFactory */], alert_component_ngfactory["a" /* AlertCmpNgFactory */], app_root_ngfactory["a" /* IonicAppNgFactory */], loading_component_ngfactory["a" /* LoadingCmpNgFactory */], modal_component_ngfactory["a" /* ModalCmpNgFactory */], picker_component_ngfactory["a" /* PickerCmpNgFactory */], popover_component_ngfactory["a" /* PopoverCmpNgFactory */], select_popover_component_ngfactory["a" /* SelectPopoverNgFactory */], toast_component_ngfactory["a" /* ToastCmpNgFactory */], context_menu_popover_ngfactory["a" /* CoreContextMenuPopoverComponentNgFactory */], course_picker_menu_popover_ngfactory["a" /* CoreCoursePickerMenuPopoverComponentNgFactory */], recaptchamodal_ngfactory["a" /* CoreRecaptchaModalComponentNgFactory */], bs_tooltip_ngfactory["a" /* CoreBSTooltipComponentNgFactory */], AddonModScormPlayerPageNgFactory]], [3, core["o" /* ComponentFactoryResolver */]], core["K" /* NgModuleRef */]]), core["_41" /* ɵmpd */](4608, common["m" /* NgLocalization */], common["l" /* NgLocaleLocalization */], [core["G" /* LOCALE_ID */], [2, common["w" /* ɵa */]]]), core["_41" /* ɵmpd */](4608, esm5_forms["x" /* ɵi */], esm5_forms["x" /* ɵi */], []), core["_41" /* ɵmpd */](4608, esm5_forms["d" /* FormBuilder */], esm5_forms["d" /* FormBuilder */], []), core["_41" /* ɵmpd */](4608, translate_loader["b" /* TranslateLoader */], translate_loader["a" /* TranslateFakeLoader */], []), core["_41" /* ɵmpd */](4608, translate_compiler["a" /* TranslateCompiler */], translate_compiler["b" /* TranslateFakeCompiler */], []), core["_41" /* ɵmpd */](4608, translate_parser["b" /* TranslateParser */], translate_parser["a" /* TranslateDefaultParser */], []), core["_41" /* ɵmpd */](4608, missing_translation_handler["b" /* MissingTranslationHandler */], missing_translation_handler["a" /* FakeMissingTranslationHandler */], []), core["_41" /* ɵmpd */](4608, translate_service["a" /* TranslateService */], translate_service["a" /* TranslateService */], [translate_store["a" /* TranslateStore */], translate_loader["b" /* TranslateLoader */], translate_compiler["a" /* TranslateCompiler */], translate_parser["b" /* TranslateParser */], missing_translation_handler["b" /* MissingTranslationHandler */], translate_service["b" /* USE_DEFAULT_LANG */], translate_service["c" /* USE_STORE */]]), core["_41" /* ɵmpd */](512, common["b" /* CommonModule */], common["b" /* CommonModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["v" /* ɵba */], esm5_forms["v" /* ɵba */], []), core["_41" /* ɵmpd */](512, esm5_forms["i" /* FormsModule */], esm5_forms["i" /* FormsModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["s" /* ReactiveFormsModule */], esm5_forms["s" /* ReactiveFormsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["a" /* IonicModule */], ionic_angular_module["a" /* IonicModule */], []), core["_41" /* ɵmpd */](512, _ngx_translate_core["b" /* TranslateModule */], _ngx_translate_core["b" /* TranslateModule */], []), core["_41" /* ɵmpd */](512, directives_module["a" /* CoreDirectivesModule */], directives_module["a" /* CoreDirectivesModule */], []), core["_41" /* ɵmpd */](512, pipes_module["a" /* CorePipesModule */], pipes_module["a" /* CorePipesModule */], []), core["_41" /* ɵmpd */](512, components_module["a" /* CoreComponentsModule */], components_module["a" /* CoreComponentsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["b" /* IonicPageModule */], ionic_angular_module["b" /* IonicPageModule */], []), core["_41" /* ɵmpd */](512, player_module_AddonModScormPlayerPageModule, player_module_AddonModScormPlayerPageModule, []), core["_41" /* ɵmpd */](256, translate_service["c" /* USE_STORE */], undefined, []), core["_41" /* ɵmpd */](256, translate_service["b" /* USE_DEFAULT_LANG */], undefined, []), core["_41" /* ɵmpd */](256, module_loader["a" /* LAZY_LOADED_TOKEN */], player_AddonModScormPlayerPage, [])]); });

//# sourceMappingURL=player.module.ngfactory.js.map

/***/ })

});
//# sourceMappingURL=84.js.map