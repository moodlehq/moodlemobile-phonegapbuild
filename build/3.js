webpackJsonp([3],{

/***/ 1743:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddonModAssignSubmissionReviewPageModule", function() { return AddonModAssignSubmissionReviewPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__directives_directives_module__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_components_module__ = __webpack_require__(1835);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__submission_review__ = __webpack_require__(1859);
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







var AddonModAssignSubmissionReviewPageModule = (function () {
    function AddonModAssignSubmissionReviewPageModule() {
    }
    AddonModAssignSubmissionReviewPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__submission_review__["a" /* AddonModAssignSubmissionReviewPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* CoreComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_4__directives_directives_module__["a" /* CoreDirectivesModule */],
                __WEBPACK_IMPORTED_MODULE_5__components_components_module__["a" /* AddonModAssignComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_6__submission_review__["a" /* AddonModAssignSubmissionReviewPage */]),
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */].forChild()
            ],
        })
    ], AddonModAssignSubmissionReviewPageModule);
    return AddonModAssignSubmissionReviewPageModule;
}());

//# sourceMappingURL=submission-review.module.js.map

/***/ }),

/***/ 1835:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddonModAssignComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_components_module__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__directives_directives_module__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pipes_pipes_module__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_course_components_components_module__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__index_index__ = __webpack_require__(873);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__submission_submission__ = __webpack_require__(874);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__submission_plugin_submission_plugin__ = __webpack_require__(877);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__feedback_plugin_feedback_plugin__ = __webpack_require__(1836);
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












var AddonModAssignComponentsModule = (function () {
    function AddonModAssignComponentsModule() {
    }
    AddonModAssignComponentsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_8__index_index__["a" /* AddonModAssignIndexComponent */],
                __WEBPACK_IMPORTED_MODULE_9__submission_submission__["a" /* AddonModAssignSubmissionComponent */],
                __WEBPACK_IMPORTED_MODULE_10__submission_plugin_submission_plugin__["a" /* AddonModAssignSubmissionPluginComponent */],
                __WEBPACK_IMPORTED_MODULE_11__feedback_plugin_feedback_plugin__["a" /* AddonModAssignFeedbackPluginComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* IonicModule */],
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */].forChild(),
                __WEBPACK_IMPORTED_MODULE_4__components_components_module__["a" /* CoreComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_5__directives_directives_module__["a" /* CoreDirectivesModule */],
                __WEBPACK_IMPORTED_MODULE_6__pipes_pipes_module__["a" /* CorePipesModule */],
                __WEBPACK_IMPORTED_MODULE_7__core_course_components_components_module__["a" /* CoreCourseComponentsModule */]
            ],
            providers: [],
            exports: [
                __WEBPACK_IMPORTED_MODULE_8__index_index__["a" /* AddonModAssignIndexComponent */],
                __WEBPACK_IMPORTED_MODULE_9__submission_submission__["a" /* AddonModAssignSubmissionComponent */],
                __WEBPACK_IMPORTED_MODULE_10__submission_plugin_submission_plugin__["a" /* AddonModAssignSubmissionPluginComponent */],
                __WEBPACK_IMPORTED_MODULE_11__feedback_plugin_feedback_plugin__["a" /* AddonModAssignFeedbackPluginComponent */]
            ],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_8__index_index__["a" /* AddonModAssignIndexComponent */]
            ]
        })
    ], AddonModAssignComponentsModule);
    return AddonModAssignComponentsModule;
}());

//# sourceMappingURL=components.module.js.map

/***/ }),

/***/ 1836:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddonModAssignFeedbackPluginComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_assign__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_helper__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_feedback_delegate__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_dynamic_component_dynamic_component__ = __webpack_require__(154);
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
 * Component that displays an assignment feedback plugin.
 */
var AddonModAssignFeedbackPluginComponent = (function () {
    function AddonModAssignFeedbackPluginComponent(injector, feedbackDelegate, assignProvider, assignHelper) {
        this.injector = injector;
        this.feedbackDelegate = feedbackDelegate;
        this.assignProvider = assignProvider;
        this.assignHelper = assignHelper;
        // Data to render the plugin if it isn't supported.
        this.component = __WEBPACK_IMPORTED_MODULE_1__providers_assign__["a" /* AddonModAssignProvider */].COMPONENT;
        this.text = '';
        this.files = [];
    }
    /**
     * Component being initialized.
     */
    AddonModAssignFeedbackPluginComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.plugin) {
            this.pluginLoaded = true;
            return;
        }
        this.plugin.name = this.feedbackDelegate.getPluginName(this.plugin);
        if (!this.plugin.name) {
            this.pluginLoaded = true;
            return;
        }
        this.edit = this.edit && this.edit !== 'false';
        this.canEdit = this.canEdit && this.canEdit !== 'false';
        // Check if the plugin has defined its own component to render itself.
        this.feedbackDelegate.getComponentForPlugin(this.injector, this.plugin).then(function (component) {
            _this.pluginComponent = component;
            if (component) {
                // Prepare the data to pass to the component.
                _this.data = {
                    assign: _this.assign,
                    submission: _this.submission,
                    plugin: _this.plugin,
                    userId: _this.userId,
                    configs: _this.assignHelper.getPluginConfig(_this.assign, 'assignfeedback', _this.plugin.type),
                    edit: _this.edit,
                    canEdit: _this.canEdit
                };
            }
            else {
                // Data to render the plugin.
                _this.text = _this.assignProvider.getSubmissionPluginText(_this.plugin);
                _this.files = _this.assignProvider.getSubmissionPluginAttachments(_this.plugin);
                _this.notSupported = _this.feedbackDelegate.isPluginSupported(_this.plugin.type);
                _this.pluginLoaded = true;
            }
        });
    };
    /**
     * Invalidate the plugin data.
     *
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonModAssignFeedbackPluginComponent.prototype.invalidate = function () {
        return Promise.resolve(this.dynamicComponent && this.dynamicComponent.callComponentFunction('invalidate', []));
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_4__components_dynamic_component_dynamic_component__["a" /* CoreDynamicComponent */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4__components_dynamic_component_dynamic_component__["a" /* CoreDynamicComponent */])
    ], AddonModAssignFeedbackPluginComponent.prototype, "dynamicComponent", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Object)
    ], AddonModAssignFeedbackPluginComponent.prototype, "assign", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Object)
    ], AddonModAssignFeedbackPluginComponent.prototype, "submission", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Object)
    ], AddonModAssignFeedbackPluginComponent.prototype, "plugin", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Number)
    ], AddonModAssignFeedbackPluginComponent.prototype, "userId", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Object)
    ], AddonModAssignFeedbackPluginComponent.prototype, "canEdit", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Object)
    ], AddonModAssignFeedbackPluginComponent.prototype, "edit", void 0);
    AddonModAssignFeedbackPluginComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'addon-mod-assign-feedback-plugin',template:/*ion-inline-start:"/Users/dpalou/Development/moodlemobile2/src/addon/mod/assign/components/feedback-plugin/feedback-plugin.html"*/'\n<core-dynamic-component [component]="pluginComponent" [data]="data">\n    <!-- This content will be replaced by the component if found. -->\n    <core-loading [hideUntil]="pluginLoaded">\n        <ion-item text-wrap *ngIf="text.length > 0 || files.length > 0">\n            <h2>{{ plugin.name }}</h2>\n            <ion-badge *ngIf="notSupported" color="primary">\n                {{ \'addon.mod_assign.feedbacknotsupported\' | translate }}\n            </ion-badge>\n            <p *ngIf="text">\n                <core-format-text [component]="component" [componentId]="assign.cmid" [maxHeight]="80" [fullOnClick]="true" [fullTitle]="plugin.name" [text]="text"></core-format-text>\n            </p>\n            <core-file *ngFor="let file of files" [file]="file" [component]="component" [componentId]="assign.cmid" [alwaysDownload]="true"></core-file>\n        </ion-item>\n    </core-loading>\n</core-dynamic-component>\n'/*ion-inline-end:"/Users/dpalou/Development/moodlemobile2/src/addon/mod/assign/components/feedback-plugin/feedback-plugin.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injector */], __WEBPACK_IMPORTED_MODULE_3__providers_feedback_delegate__["a" /* AddonModAssignFeedbackDelegate */],
            __WEBPACK_IMPORTED_MODULE_1__providers_assign__["a" /* AddonModAssignProvider */], __WEBPACK_IMPORTED_MODULE_2__providers_helper__["a" /* AddonModAssignHelperProvider */]])
    ], AddonModAssignFeedbackPluginComponent);
    return AddonModAssignFeedbackPluginComponent;
}());

//# sourceMappingURL=feedback-plugin.js.map

/***/ }),

/***/ 1859:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddonModAssignSubmissionReviewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_app__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_course_providers_course__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_assign__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_submission_submission__ = __webpack_require__(874);
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
 * Page that displays a submission.
 */
var AddonModAssignSubmissionReviewPage = (function () {
    function AddonModAssignSubmissionReviewPage(navParams, navCtrl, courseProvider, appProvider, assignProvider) {
        this.navCtrl = navCtrl;
        this.courseProvider = courseProvider;
        this.appProvider = appProvider;
        this.assignProvider = assignProvider;
        this.forceLeave = false; // To allow leaving the page without checking for changes.
        this.moduleId = navParams.get('moduleId');
        this.courseId = navParams.get('courseId');
        this.submitId = navParams.get('submitId');
        this.blindId = navParams.get('blindId');
        this.showGrade = !!navParams.get('showGrade');
    }
    /**
     * Component being initialized.
     */
    AddonModAssignSubmissionReviewPage.prototype.ngOnInit = function () {
        var _this = this;
        this.fetchSubmission().finally(function () {
            _this.loaded = true;
        });
    };
    /**
     * Check if we can leave the page or not.
     *
     * @return {boolean|Promise<void>} Resolved if we can leave it, rejected if not.
     */
    AddonModAssignSubmissionReviewPage.prototype.ionViewCanLeave = function () {
        if (!this.submissionComponent || this.forceLeave) {
            return true;
        }
        // Check if data has changed.
        return this.submissionComponent.canLeave();
    };
    /**
     * Get the submission.
     *
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonModAssignSubmissionReviewPage.prototype.fetchSubmission = function () {
        var _this = this;
        return this.assignProvider.getAssignment(this.courseId, this.moduleId).then(function (assignment) {
            _this.assign = assignment;
            _this.title = _this.assign.name;
            _this.blindMarking = _this.assign.blindmarking && !_this.assign.revealidentities;
            return _this.courseProvider.getModuleBasicGradeInfo(_this.moduleId).then(function (gradeInfo) {
                if (gradeInfo) {
                    // Grades can be saved if simple grading.
                    if (gradeInfo.advancedgrading && gradeInfo.advancedgrading[0] &&
                        typeof gradeInfo.advancedgrading[0].method != 'undefined') {
                        var method = gradeInfo.advancedgrading[0].method || 'simple';
                        _this.canSaveGrades = method == 'simple';
                    }
                    else {
                        _this.canSaveGrades = true;
                    }
                }
            });
        });
    };
    /**
     * Refresh all the data.
     *
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonModAssignSubmissionReviewPage.prototype.refreshAllData = function () {
        var _this = this;
        var promises = [];
        promises.push(this.assignProvider.invalidateAssignmentData(this.courseId));
        if (this.assign) {
            promises.push(this.assignProvider.invalidateSubmissionData(this.assign.id));
            promises.push(this.assignProvider.invalidateAssignmentUserMappingsData(this.assign.id));
            promises.push(this.assignProvider.invalidateSubmissionStatusData(this.assign.id, this.submitId, this.blindMarking));
        }
        return Promise.all(promises).finally(function () {
            _this.submissionComponent && _this.submissionComponent.invalidateAndRefresh();
            return _this.fetchSubmission();
        });
    };
    /**
     * Refresh the data.
     *
     * @param {any} refresher Refresher.
     */
    AddonModAssignSubmissionReviewPage.prototype.refreshSubmission = function (refresher) {
        this.refreshAllData().finally(function () {
            refresher.complete();
        });
    };
    /**
     * Submit a grade and feedback.
     */
    AddonModAssignSubmissionReviewPage.prototype.submitGrade = function () {
        var _this = this;
        if (this.submissionComponent) {
            this.submissionComponent.submitGrade().then(function () {
                // Grade submitted, leave the view if not in tablet.
                if (!_this.appProvider.isWide()) {
                    _this.forceLeave = true;
                    _this.navCtrl.pop();
                }
            });
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_5__components_submission_submission__["a" /* AddonModAssignSubmissionComponent */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_5__components_submission_submission__["a" /* AddonModAssignSubmissionComponent */])
    ], AddonModAssignSubmissionReviewPage.prototype, "submissionComponent", void 0);
    AddonModAssignSubmissionReviewPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-addon-mod-assign-submission-review',template:/*ion-inline-start:"/Users/dpalou/Development/moodlemobile2/src/addon/mod/assign/pages/submission-review/submission-review.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title><core-format-text [text]="title"></core-format-text></ion-title>\n\n        <ion-buttons end></ion-buttons>\n    </ion-navbar>\n\n    <core-navbar-buttons end>\n        <button [hidden]="!canSaveGrades" ion-button button-clear (click)="submitGrade()" [attr.aria-label]="\'core.done\' | translate">\n            {{ \'core.done\' | translate }}\n        </button>\n    </core-navbar-buttons>\n</ion-header>\n<ion-content>\n\n    <ion-refresher [enabled]="loaded" (ionRefresh)="refreshSubmission($event)">\n        <ion-refresher-content pullingText="{{ \'core.pulltorefresh\' | translate }}"></ion-refresher-content>\n    </ion-refresher>\n    <core-loading [hideUntil]="loaded">\n        <addon-mod-assign-submission [courseId]="courseId" [moduleId]="moduleId" [submitId]="submitId" [blindId]="blindId" [showGrade]="showGrade"></addon-mod-assign-submission>\n    </core-loading>\n</ion-content>\n'/*ion-inline-end:"/Users/dpalou/Development/moodlemobile2/src/addon/mod/assign/pages/submission-review/submission-review.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__core_course_providers_course__["a" /* CoreCourseProvider */],
            __WEBPACK_IMPORTED_MODULE_2__providers_app__["a" /* CoreAppProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_assign__["a" /* AddonModAssignProvider */]])
    ], AddonModAssignSubmissionReviewPage);
    return AddonModAssignSubmissionReviewPage;
}());

//# sourceMappingURL=submission-review.js.map

/***/ })

});
//# sourceMappingURL=3.js.map