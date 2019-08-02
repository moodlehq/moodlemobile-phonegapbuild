webpackJsonp([23],{

/***/ 2075:
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

// EXTERNAL MODULE: ./src/addon/mod/workshop/components/components.module.ts
var components_components_module = __webpack_require__(480);

// EXTERNAL MODULE: ./node_modules/@angular/forms/esm5/forms.js
var esm5_forms = __webpack_require__(22);

// EXTERNAL MODULE: ./src/providers/events.ts
var events = __webpack_require__(11);

// EXTERNAL MODULE: ./src/providers/sites.ts
var sites = __webpack_require__(1);

// EXTERNAL MODULE: ./src/providers/sync.ts
var sync = __webpack_require__(75);

// EXTERNAL MODULE: ./src/providers/utils/dom.ts
var dom = __webpack_require__(4);

// EXTERNAL MODULE: ./src/providers/utils/text.ts
var utils_text = __webpack_require__(10);

// EXTERNAL MODULE: ./src/core/course/providers/course.ts
var course = __webpack_require__(13);

// EXTERNAL MODULE: ./src/core/user/providers/user.ts
var user = __webpack_require__(43);

// EXTERNAL MODULE: ./src/core/grades/providers/helper.ts
var helper = __webpack_require__(168);

// EXTERNAL MODULE: ./src/addon/mod/workshop/providers/workshop.ts
var workshop = __webpack_require__(171);

// EXTERNAL MODULE: ./src/addon/mod/workshop/providers/helper.ts
var providers_helper = __webpack_require__(197);

// EXTERNAL MODULE: ./src/addon/mod/workshop/providers/offline.ts
var offline = __webpack_require__(184);

// EXTERNAL MODULE: ./src/addon/mod/workshop/providers/sync.ts
var providers_sync = __webpack_require__(286);

// CONCATENATED MODULE: ./src/addon/mod/workshop/pages/assessment/assessment.ts
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
 * Page that displays a workshop assessment.
 */
var assessment_AddonModWorkshopAssessmentPage = /** @class */ (function () {
    function AddonModWorkshopAssessmentPage(navParams, sitesProvider, courseProvider, workshopProvider, workshopOffline, workshopHelper, navCtrl, syncProvider, textUtils, fb, translate, eventsProvider, domUtils, gradesHelper, userProvider) {
        var _this = this;
        this.courseProvider = courseProvider;
        this.workshopProvider = workshopProvider;
        this.workshopOffline = workshopOffline;
        this.workshopHelper = workshopHelper;
        this.navCtrl = navCtrl;
        this.syncProvider = syncProvider;
        this.textUtils = textUtils;
        this.fb = fb;
        this.translate = translate;
        this.eventsProvider = eventsProvider;
        this.domUtils = domUtils;
        this.gradesHelper = gradesHelper;
        this.userProvider = userProvider;
        this.evaluating = false;
        this.loaded = false;
        this.evaluate = {
            text: '',
            grade: -1,
            weight: 1
        };
        this.weights = [];
        this.originalEvaluation = {};
        this.hasOffline = false;
        this.isDestroyed = false;
        this.forceLeave = false;
        this.assessment = navParams.get('assessment');
        this.submission = navParams.get('submission') || {};
        this.profile = navParams.get('profile');
        this.courseId = navParams.get('courseId');
        this.assessmentId = this.assessment.assessmentid || this.assessment.id;
        this.workshopId = this.submission.workshopid || null;
        this.siteId = sitesProvider.getCurrentSiteId();
        this.currentUserId = sitesProvider.getCurrentSiteUserId();
        this.showGrade = this.workshopHelper.showGrade;
        this.evaluateForm = new esm5_forms["g" /* FormGroup */]({});
        this.evaluateForm.addControl('weight', this.fb.control('', esm5_forms["u" /* Validators */].required));
        this.evaluateForm.addControl('grade', this.fb.control(''));
        this.evaluateForm.addControl('text', this.fb.control(''));
        // Refresh workshop on sync.
        this.syncObserver = this.eventsProvider.on(providers_sync["a" /* AddonModWorkshopSyncProvider */].AUTO_SYNCED, function (data) {
            // Update just when all database is synced.
            if (_this.workshopId === data.workshopId) {
                _this.loaded = false;
                _this.refreshAllData();
            }
        }, this.siteId);
    }
    /**
     * Component being initialized.
     */
    AddonModWorkshopAssessmentPage.prototype.ngOnInit = function () {
        this.fetchAssessmentData();
    };
    /**
     * Check if we can leave the page or not.
     *
     * @return {boolean|Promise<void>} Resolved if we can leave it, rejected if not.
     */
    AddonModWorkshopAssessmentPage.prototype.ionViewCanLeave = function () {
        if (this.forceLeave || !this.evaluating) {
            return true;
        }
        if (!this.hasEvaluationChanged()) {
            return Promise.resolve();
        }
        // Show confirmation if some data has been modified.
        return this.domUtils.showConfirm(this.translate.instant('core.confirmcanceledit'));
    };
    /**
     * Fetch the assessment data.
     *
     * @return {Promise<void>} Resolved when done.
     */
    AddonModWorkshopAssessmentPage.prototype.fetchAssessmentData = function () {
        var _this = this;
        return this.workshopProvider.getWorkshopById(this.courseId, this.workshopId).then(function (workshopData) {
            _this.workshop = workshopData;
            _this.title = _this.workshop.name;
            _this.strategy = _this.workshop.strategy;
            return _this.courseProvider.getModuleBasicGradeInfo(workshopData.coursemodule);
        }).then(function (gradeInfo) {
            _this.maxGrade = gradeInfo.grade;
            return _this.workshopProvider.getWorkshopAccessInformation(_this.workshopId);
        }).then(function (accessData) {
            _this.access = accessData;
            // Load Weights selector.
            if (_this.assessmentId && (accessData.canallocate || accessData.canoverridegrades)) {
                if (!_this.isDestroyed) {
                    // Block the workshop.
                    _this.syncProvider.blockOperation(workshop["a" /* AddonModWorkshopProvider */].COMPONENT, _this.workshopId);
                }
                _this.evaluating = true;
            }
            else {
                _this.evaluating = false;
            }
            if (_this.evaluating || _this.workshop.phase == workshop["a" /* AddonModWorkshopProvider */].PHASE_CLOSED) {
                // Get all info of the assessment.
                return _this.workshopHelper.getReviewerAssessmentById(_this.workshopId, _this.assessmentId, _this.profile && _this.profile.id).then(function (assessment) {
                    var defaultGrade, promise;
                    _this.assessment = _this.workshopHelper.realGradeValue(_this.workshop, assessment);
                    _this.evaluate.text = _this.assessment.feedbackreviewer || '';
                    _this.evaluate.weight = _this.assessment.weight;
                    if (_this.evaluating) {
                        if (accessData.canallocate) {
                            _this.weights = [];
                            for (var i = 16; i >= 0; i--) {
                                _this.weights[i] = i;
                            }
                        }
                        if (accessData.canoverridegrades) {
                            defaultGrade = _this.translate.instant('addon.mod_workshop.notoverridden');
                            promise = _this.gradesHelper.makeGradesMenu(_this.workshop.gradinggrade, undefined, defaultGrade, -1)
                                .then(function (grades) {
                                _this.evaluationGrades = grades;
                            });
                        }
                        else {
                            promise = Promise.resolve();
                        }
                        return promise.then(function () {
                            return _this.workshopOffline.getEvaluateAssessment(_this.workshopId, _this.assessmentId)
                                .then(function (offlineAssess) {
                                _this.hasOffline = true;
                                _this.evaluate.weight = offlineAssess.weight;
                                if (accessData.canoverridegrades) {
                                    _this.evaluate.text = offlineAssess.feedbacktext || '';
                                    _this.evaluate.grade = offlineAssess.gradinggradeover || -1;
                                }
                            }).catch(function () {
                                _this.hasOffline = false;
                                // No offline, load online.
                                if (accessData.canoverridegrades) {
                                    _this.evaluate.text = _this.assessment.feedbackreviewer || '';
                                    _this.evaluate.grade = _this.assessment.gradinggradeover || -1;
                                }
                            });
                        }).finally(function () {
                            _this.originalEvaluation.weight = _this.evaluate.weight;
                            if (accessData.canoverridegrades) {
                                _this.originalEvaluation.text = _this.evaluate.text;
                                _this.originalEvaluation.grade = _this.evaluate.grade;
                            }
                            _this.evaluateForm.controls['weight'].setValue(_this.evaluate.weight);
                            if (accessData.canoverridegrades) {
                                _this.evaluateForm.controls['grade'].setValue(_this.evaluate.grade);
                                _this.evaluateForm.controls['text'].setValue(_this.evaluate.text);
                            }
                        });
                    }
                    else if (_this.workshop.phase == workshop["a" /* AddonModWorkshopProvider */].PHASE_CLOSED && _this.assessment.gradinggradeoverby) {
                        return _this.userProvider.getProfile(_this.assessment.gradinggradeoverby, _this.courseId, true)
                            .then(function (profile) {
                            _this.evaluateByProfile = profile;
                        });
                    }
                });
            }
        }).catch(function (message) {
            _this.domUtils.showErrorModalDefault(message, 'mm.course.errorgetmodule', true);
        }).finally(function () {
            _this.loaded = true;
        });
    };
    /**
     * Force leaving the page, without checking for changes.
     */
    AddonModWorkshopAssessmentPage.prototype.forceLeavePage = function () {
        this.forceLeave = true;
        this.navCtrl.pop();
    };
    /**
     * Check if data has changed.
     *
     * @return {boolean} True if changed, false otherwise.
     */
    AddonModWorkshopAssessmentPage.prototype.hasEvaluationChanged = function () {
        if (!this.loaded || !this.evaluating) {
            return false;
        }
        var inputData = this.evaluateForm.value;
        if (this.originalEvaluation.weight != inputData.weight) {
            return true;
        }
        if (this.access && this.access.canoverridegrades) {
            if (this.originalEvaluation.text != inputData.text) {
                return true;
            }
            if (this.originalEvaluation.grade != inputData.grade) {
                return true;
            }
        }
        return false;
    };
    /**
     * Convenience function to refresh all the data.
     *
     * @return {Promise<any>} Resolved when done.
     */
    AddonModWorkshopAssessmentPage.prototype.refreshAllData = function () {
        var _this = this;
        var promises = [];
        promises.push(this.workshopProvider.invalidateWorkshopData(this.courseId));
        promises.push(this.workshopProvider.invalidateWorkshopAccessInformationData(this.workshopId));
        promises.push(this.workshopProvider.invalidateReviewerAssesmentsData(this.workshopId));
        if (this.assessmentId) {
            promises.push(this.workshopProvider.invalidateAssessmentFormData(this.workshopId, this.assessmentId));
            promises.push(this.workshopProvider.invalidateAssessmentData(this.workshopId, this.assessmentId));
        }
        return Promise.all(promises).finally(function () {
            _this.eventsProvider.trigger(workshop["a" /* AddonModWorkshopProvider */].ASSESSMENT_INVALIDATED, _this.siteId);
            return _this.fetchAssessmentData();
        });
    };
    /**
     * Pull to refresh.
     *
     * @param {any} refresher Refresher.
     */
    AddonModWorkshopAssessmentPage.prototype.refreshAssessment = function (refresher) {
        if (this.loaded) {
            this.refreshAllData().finally(function () {
                refresher.complete();
            });
        }
    };
    /**
     * Save the assessment evaluation.
     */
    AddonModWorkshopAssessmentPage.prototype.saveEvaluation = function () {
        var _this = this;
        // Check if data has changed.
        if (this.hasEvaluationChanged()) {
            this.sendEvaluation().then(function () {
                _this.forceLeavePage();
            });
        }
        else {
            // Nothing to save, just go back.
            this.forceLeavePage();
        }
    };
    /**
     * Sends the evaluation to be saved on the server.
     *
     * @return {Promise<any>} Resolved when done.
     */
    AddonModWorkshopAssessmentPage.prototype.sendEvaluation = function () {
        var _this = this;
        var modal = this.domUtils.showModalLoading('core.sending', true), inputData = this.evaluateForm.value;
        inputData.grade = inputData.grade >= 0 ? inputData.grade : '';
        // Add some HTML to the message if needed.
        inputData.text = this.textUtils.formatHtmlLines(inputData.text);
        // Try to send it to server.
        return this.workshopProvider.evaluateAssessment(this.workshopId, this.assessmentId, this.courseId, inputData.text, inputData.weight, inputData.grade).then(function () {
            var data = {
                workshopId: _this.workshopId,
                assessmentId: _this.assessmentId,
                userId: _this.currentUserId
            };
            return _this.workshopProvider.invalidateAssessmentData(_this.workshopId, _this.assessmentId).finally(function () {
                _this.eventsProvider.trigger(workshop["a" /* AddonModWorkshopProvider */].ASSESSMENT_SAVED, data, _this.siteId);
            });
        }).catch(function (message) {
            _this.domUtils.showErrorModalDefault(message, 'Cannot save assessment evaluation');
        }).finally(function () {
            modal.dismiss();
        });
    };
    /**
     * Component being destroyed.
     */
    AddonModWorkshopAssessmentPage.prototype.ngOnDestroy = function () {
        this.isDestroyed = true;
        this.syncObserver && this.syncObserver.off();
        // Restore original back functions.
        this.syncProvider.unblockOperation(workshop["a" /* AddonModWorkshopProvider */].COMPONENT, this.workshopId);
    };
    AddonModWorkshopAssessmentPage = __decorate([
        Object(core["m" /* Component */])({
            selector: 'page-addon-mod-workshop-assessment-page',
            templateUrl: 'assessment.html',
        }),
        __metadata("design:paramtypes", [ionic_angular["t" /* NavParams */], sites["a" /* CoreSitesProvider */], course["a" /* CoreCourseProvider */],
            workshop["a" /* AddonModWorkshopProvider */], offline["a" /* AddonModWorkshopOfflineProvider */],
            providers_helper["a" /* AddonModWorkshopHelperProvider */], ionic_angular["s" /* NavController */],
            sync["a" /* CoreSyncProvider */], utils_text["a" /* CoreTextUtilsProvider */], esm5_forms["d" /* FormBuilder */],
            _ngx_translate_core["c" /* TranslateService */], events["a" /* CoreEventsProvider */],
            dom["a" /* CoreDomUtilsProvider */], helper["a" /* CoreGradesHelperProvider */],
            user["a" /* CoreUserProvider */]])
    ], AddonModWorkshopAssessmentPage);
    return AddonModWorkshopAssessmentPage;
}());

//# sourceMappingURL=assessment.js.map
// CONCATENATED MODULE: ./src/addon/mod/workshop/pages/assessment/assessment.module.ts
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
var assessment_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var assessment_module_AddonModWorkshopAssessmentPageModule = /** @class */ (function () {
    function AddonModWorkshopAssessmentPageModule() {
    }
    AddonModWorkshopAssessmentPageModule = assessment_module___decorate([
        Object(core["I" /* NgModule */])({
            declarations: [
                assessment_AddonModWorkshopAssessmentPage,
            ],
            imports: [
                directives_module["a" /* CoreDirectivesModule */],
                components_module["a" /* CoreComponentsModule */],
                components_components_module["a" /* AddonModWorkshopComponentsModule */],
                ionic_angular["l" /* IonicPageModule */].forChild(assessment_AddonModWorkshopAssessmentPage),
                _ngx_translate_core["b" /* TranslateModule */].forChild()
            ],
        })
    ], AddonModWorkshopAssessmentPageModule);
    return AddonModWorkshopAssessmentPageModule;
}());

//# sourceMappingURL=assessment.module.js.map
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

// EXTERNAL MODULE: ./src/core/block/components/only-title-block/only-title-block.ngfactory.js
var only_title_block_ngfactory = __webpack_require__(1485);

// EXTERNAL MODULE: ./src/core/block/components/pre-rendered-block/pre-rendered-block.ngfactory.js
var pre_rendered_block_ngfactory = __webpack_require__(1486);

// EXTERNAL MODULE: ./src/core/block/components/course-blocks/course-blocks.ngfactory.js
var course_blocks_ngfactory = __webpack_require__(1483);

// EXTERNAL MODULE: ./src/core/course/components/unsupported-module/unsupported-module.ngfactory.js
var unsupported_module_ngfactory = __webpack_require__(1484);

// EXTERNAL MODULE: ./src/core/course/components/tag-area/tag-area.ngfactory.js
var tag_area_ngfactory = __webpack_require__(1487);

// EXTERNAL MODULE: ./src/addon/mod/workshop/components/index/index.ngfactory.js
var index_ngfactory = __webpack_require__(1516);

// EXTERNAL MODULE: ./src/components/user-avatar/user-avatar.ngfactory.js
var user_avatar_ngfactory = __webpack_require__(208);

// EXTERNAL MODULE: ./src/components/user-avatar/user-avatar.ts
var user_avatar = __webpack_require__(177);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-controller.js
var nav_controller = __webpack_require__(19);

// EXTERNAL MODULE: ./src/providers/utils/utils.ts
var utils = __webpack_require__(2);

// EXTERNAL MODULE: ./src/providers/app.ts
var app = __webpack_require__(9);

// EXTERNAL MODULE: ./src/components/split-view/split-view.ts
var split_view = __webpack_require__(26);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/avatar/avatar.js
var avatar = __webpack_require__(167);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.pipe.js
var translate_pipe = __webpack_require__(28);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.service.js
var translate_service = __webpack_require__(18);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/badge/badge.js
var badge = __webpack_require__(152);

// EXTERNAL MODULE: ./node_modules/ionic-angular/config/config.js
var config = __webpack_require__(7);

// EXTERNAL MODULE: ./src/addon/mod/workshop/components/assessment-strategy/assessment-strategy.ngfactory.js
var assessment_strategy_ngfactory = __webpack_require__(2120);

// EXTERNAL MODULE: ./src/addon/mod/workshop/components/assessment-strategy/assessment-strategy.ts
var assessment_strategy = __webpack_require__(1501);

// EXTERNAL MODULE: ./src/providers/file-session.ts
var file_session = __webpack_require__(172);

// EXTERNAL MODULE: ./src/core/fileuploader/providers/fileuploader.ts
var fileuploader = __webpack_require__(68);

// EXTERNAL MODULE: ./src/addon/mod/workshop/providers/assessment-strategy-delegate.ts
var assessment_strategy_delegate = __webpack_require__(187);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/option/option.js
var option_option = __webpack_require__(102);

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

// EXTERNAL MODULE: ./src/components/mark-required/mark-required.ngfactory.js
var mark_required_ngfactory = __webpack_require__(88);

// EXTERNAL MODULE: ./src/components/mark-required/mark-required.ts
var mark_required = __webpack_require__(80);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/label/label.js
var label = __webpack_require__(63);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/select/select.ngfactory.js
var select_ngfactory = __webpack_require__(120);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/select/select.js
var select_select = __webpack_require__(103);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/app/app.js + 3 modules
var app_app = __webpack_require__(34);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/deep-linker.js
var deep_linker = __webpack_require__(55);

// EXTERNAL MODULE: ./node_modules/@angular/common/esm5/common.js
var common = __webpack_require__(8);

// EXTERNAL MODULE: ./src/components/rich-text-editor/rich-text-editor.ngfactory.js
var rich_text_editor_ngfactory = __webpack_require__(307);

// EXTERNAL MODULE: ./src/components/rich-text-editor/rich-text-editor.ts
var rich_text_editor = __webpack_require__(245);

// EXTERNAL MODULE: ./src/providers/utils/url.ts
var url = __webpack_require__(23);

// EXTERNAL MODULE: ./src/providers/filepool.ts
var filepool = __webpack_require__(17);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.js
var content = __webpack_require__(25);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/platform.js + 1 modules
var platform = __webpack_require__(16);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/list/list.js + 1 modules
var list = __webpack_require__(82);

// EXTERNAL MODULE: ./node_modules/ionic-angular/gestures/gesture-controller.js
var gesture_controller = __webpack_require__(40);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/dom-controller.js
var dom_controller = __webpack_require__(33);

// EXTERNAL MODULE: ./src/directives/format-text.ts
var format_text = __webpack_require__(41);

// EXTERNAL MODULE: ./src/providers/logger.ts
var logger = __webpack_require__(5);

// EXTERNAL MODULE: ./src/core/contentlinks/providers/helper.ts
var contentlinks_providers_helper = __webpack_require__(14);

// EXTERNAL MODULE: ./src/providers/utils/iframe.ts
var iframe = __webpack_require__(37);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-header.js
var toolbar_header = __webpack_require__(468);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/view-controller.js
var view_controller = __webpack_require__(38);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/navbar.ngfactory.js
var navbar_ngfactory = __webpack_require__(1477);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/navbar.js
var navbar = __webpack_require__(221);

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

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.ngfactory.js
var button_ngfactory = __webpack_require__(45);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.js
var button_button = __webpack_require__(42);

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

// EXTERNAL MODULE: ./src/components/loading/loading.ngfactory.js
var loading_ngfactory = __webpack_require__(50);

// EXTERNAL MODULE: ./src/components/loading/loading.ts
var loading = __webpack_require__(47);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-params.js
var nav_params = __webpack_require__(70);

// CONCATENATED MODULE: ./src/addon/mod/workshop/pages/assessment/assessment.ngfactory.js
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 












































































var styles_AddonModWorkshopAssessmentPage = [];
var RenderType_AddonModWorkshopAssessmentPage = core["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_AddonModWorkshopAssessmentPage, data: {} });

function View_AddonModWorkshopAssessmentPage_1(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "ion-avatar", [["core-user-avatar", ""], ["item-start", ""]], null, null, null, user_avatar_ngfactory["b" /* View_CoreUserAvatarComponent_0 */], user_avatar_ngfactory["a" /* RenderType_CoreUserAvatarComponent */])), core["_30" /* ɵdid */](1, 770048, null, 0, user_avatar["a" /* CoreUserAvatarComponent */], [nav_controller["a" /* NavController */], sites["a" /* CoreSitesProvider */], utils["a" /* CoreUtilsProvider */], app["a" /* CoreAppProvider */], events["a" /* CoreEventsProvider */], [2, split_view["a" /* CoreSplitViewComponent */]]], { user: [0, "user"], userId: [1, "userId"], courseId: [2, "courseId"] }, null), core["_30" /* ɵdid */](2, 16384, null, 0, avatar["a" /* Avatar */], [], null, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.profile; var currVal_1 = _co.profile.id; var currVal_2 = _co.courseId; _ck(_v, 1, 0, currVal_0, currVal_1, currVal_2); }, null); }
function View_AddonModWorkshopAssessmentPage_2(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "h2", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](1, null, ["", ""]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.profile.fullname; _ck(_v, 1, 0, currVal_0); }); }
function View_AddonModWorkshopAssessmentPage_3(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 3, "p", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](1, null, ["\n                ", ": ", "\n            "])), core["_48" /* ɵpod */](2, { $a: 0 }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = core["_56" /* ɵunv */](_v, 1, 0, core["_44" /* ɵnov */](_v, 3).transform("addon.mod_workshop.submissiongradeof", _ck(_v, 2, 0, _co.workshop.grade))); var currVal_1 = _co.assessment.grade; _ck(_v, 1, 0, currVal_0, currVal_1); }); }
function View_AddonModWorkshopAssessmentPage_4(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 3, "p", [], [[2, "core-has-overriden-grade", null]], null, null, null, null)), (_l()(), core["_55" /* ɵted */](1, null, ["\n                ", ": ", "\n            "])), core["_48" /* ɵpod */](2, { $a: 0 }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.showGrade(_co.assessment.gradinggrade); _ck(_v, 0, 0, currVal_0); var currVal_1 = core["_56" /* ɵunv */](_v, 1, 0, core["_44" /* ɵnov */](_v, 3).transform("addon.mod_workshop.gradinggradeof", _ck(_v, 2, 0, _co.workshop.gradinggrade))); var currVal_2 = _co.assessment.gradinggrade; _ck(_v, 1, 0, currVal_1, currVal_2); }); }
function View_AddonModWorkshopAssessmentPage_5(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "p", [["class", "core-overriden-grade"]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](1, null, ["\n                ", ": ", "\n            "])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = core["_56" /* ɵunv */](_v, 1, 0, core["_44" /* ɵnov */](_v, 2).transform("addon.mod_workshop.gradinggradeover")); var currVal_1 = _co.assessment.gradinggradeover; _ck(_v, 1, 0, currVal_0, currVal_1); }); }
function View_AddonModWorkshopAssessmentPage_6(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 3, "p", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](1, null, ["\n                ", "\n            "])), core["_48" /* ɵpod */](2, { $a: 0 }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = core["_56" /* ɵunv */](_v, 1, 0, core["_44" /* ɵnov */](_v, 3).transform("addon.mod_workshop.weightinfo", _ck(_v, 2, 0, _co.assessment.weight))); _ck(_v, 1, 0, currVal_0); }); }
function View_AddonModWorkshopAssessmentPage_7(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 3, "ion-badge", [["color", "danger"]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, badge["a" /* Badge */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { color: [0, "color"] }, null), (_l()(), core["_55" /* ɵted */](2, null, ["\n                ", "\n            "])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], function (_ck, _v) { var currVal_0 = "danger"; _ck(_v, 1, 0, currVal_0); }, function (_ck, _v) { var currVal_1 = core["_56" /* ɵunv */](_v, 2, 0, core["_44" /* ɵnov */](_v, 3).transform("addon.mod_workshop.notassessed")); _ck(_v, 2, 0, currVal_1); }); }
function View_AddonModWorkshopAssessmentPage_8(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "addon-mod-workshop-assessment-strategy", [], null, null, null, assessment_strategy_ngfactory["b" /* View_AddonModWorkshopAssessmentStrategyComponent_0 */], assessment_strategy_ngfactory["a" /* RenderType_AddonModWorkshopAssessmentStrategyComponent */])), core["_30" /* ɵdid */](1, 245760, null, 0, assessment_strategy["a" /* AddonModWorkshopAssessmentStrategyComponent */], [translate_service["a" /* TranslateService */], core["C" /* Injector */], events["a" /* CoreEventsProvider */], file_session["a" /* CoreFileSessionProvider */], sync["a" /* CoreSyncProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], utils["a" /* CoreUtilsProvider */], sites["a" /* CoreSitesProvider */], fileuploader["a" /* CoreFileUploaderProvider */], workshop["a" /* AddonModWorkshopProvider */], providers_helper["a" /* AddonModWorkshopHelperProvider */], offline["a" /* AddonModWorkshopOfflineProvider */], assessment_strategy_delegate["a" /* AddonWorkshopAssessmentStrategyDelegate */]], { workshop: [0, "workshop"], access: [1, "access"], assessmentId: [2, "assessmentId"], userId: [3, "userId"], strategy: [4, "strategy"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.workshop; var currVal_1 = _co.access; var currVal_2 = _co.assessmentId; var currVal_3 = (_co.profile && _co.profile.id); var currVal_4 = _co.strategy; _ck(_v, 1, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4); }, null); }
function View_AddonModWorkshopAssessmentPage_11(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "ion-option", [], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, [[11, 4]], 0, option_option["a" /* Option */], [core["t" /* ElementRef */]], { value: [0, "value"] }, null), (_l()(), core["_55" /* ɵted */](2, null, ["", ""]))], function (_ck, _v) { var currVal_0 = _v.context.$implicit; _ck(_v, 1, 0, currVal_0); }, function (_ck, _v) { var currVal_1 = _v.context.$implicit; _ck(_v, 2, 0, currVal_1); }); }
function View_AddonModWorkshopAssessmentPage_10(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 26, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 8, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 9, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 10, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 1, 4, "ion-label", [["core-mark-required", "true"], ["stacked", ""]], null, null, null, mark_required_ngfactory["b" /* View_CoreMarkRequiredComponent_0 */], mark_required_ngfactory["a" /* RenderType_CoreMarkRequiredComponent */])), core["_30" /* ɵdid */](8, 4308992, null, 0, mark_required["a" /* CoreMarkRequiredComponent */], [core["t" /* ElementRef */], translate_service["a" /* TranslateService */], utils_text["a" /* CoreTextUtilsProvider */], utils["a" /* CoreUtilsProvider */]], { coreMarkRequired: [0, "coreMarkRequired"] }, null), core["_30" /* ɵdid */](9, 16384, [[8, 4]], 0, label["a" /* Label */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, ""], [8, null], [8, null]], null, null), (_l()(), core["_55" /* ɵted */](10, 0, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](13, 0, null, 3, 12, "ion-select", [["formControlName", "weight"], ["interface", "action-sheet"], ["required", "true"]], [[1, "required", 0], [2, "select-disabled", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "click"], [null, "keyup.space"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (core["_44" /* ɵnov */](_v, 16)._click($event) !== false);
        ad = (pd_0 && ad);
    } if (("keyup.space" === en)) {
        var pd_1 = (core["_44" /* ɵnov */](_v, 16)._keyup() !== false);
        ad = (pd_1 && ad);
    } return ad; }, select_ngfactory["b" /* View_Select_0 */], select_ngfactory["a" /* RenderType_Select */])), core["_30" /* ɵdid */](14, 16384, null, 0, esm5_forms["t" /* RequiredValidator */], [], { required: [0, "required"] }, null), core["_50" /* ɵprd */](1024, null, esm5_forms["k" /* NG_VALIDATORS */], function (p0_0) { return [p0_0]; }, [esm5_forms["t" /* RequiredValidator */]]), core["_30" /* ɵdid */](16, 1228800, null, 1, select_select["a" /* Select */], [app_app["a" /* App */], util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item["a" /* Item */]], deep_linker["a" /* DeepLinker */]], { interface: [0, "interface"] }, null), core["_52" /* ɵqud */](603979776, 11, { options: 1 }), core["_50" /* ɵprd */](1024, null, esm5_forms["l" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [select_select["a" /* Select */]]), core["_30" /* ɵdid */](19, 671744, null, 0, esm5_forms["f" /* FormControlName */], [[3, esm5_forms["b" /* ControlContainer */]], [2, esm5_forms["k" /* NG_VALIDATORS */]], [8, null], [2, esm5_forms["l" /* NG_VALUE_ACCESSOR */]]], { name: [0, "name"] }, null), core["_50" /* ɵprd */](2048, null, esm5_forms["m" /* NgControl */], null, [esm5_forms["f" /* FormControlName */]]), core["_30" /* ɵdid */](21, 16384, null, 0, esm5_forms["n" /* NgControlStatus */], [esm5_forms["m" /* NgControl */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModWorkshopAssessmentPage_11)), core["_30" /* ɵdid */](24, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = "true"; _ck(_v, 8, 0, currVal_0); var currVal_11 = "true"; _ck(_v, 14, 0, currVal_11); var currVal_12 = "action-sheet"; _ck(_v, 16, 0, currVal_12); var currVal_13 = "weight"; _ck(_v, 19, 0, currVal_13); var currVal_14 = _co.weights; _ck(_v, 24, 0, currVal_14); }, function (_ck, _v) { var currVal_1 = core["_56" /* ɵunv */](_v, 10, 0, core["_44" /* ɵnov */](_v, 11).transform("addon.mod_workshop.assessmentweight")); _ck(_v, 10, 0, currVal_1); var currVal_2 = (core["_44" /* ɵnov */](_v, 14).required ? "" : null); var currVal_3 = core["_44" /* ɵnov */](_v, 16)._disabled; var currVal_4 = core["_44" /* ɵnov */](_v, 21).ngClassUntouched; var currVal_5 = core["_44" /* ɵnov */](_v, 21).ngClassTouched; var currVal_6 = core["_44" /* ɵnov */](_v, 21).ngClassPristine; var currVal_7 = core["_44" /* ɵnov */](_v, 21).ngClassDirty; var currVal_8 = core["_44" /* ɵnov */](_v, 21).ngClassValid; var currVal_9 = core["_44" /* ɵnov */](_v, 21).ngClassInvalid; var currVal_10 = core["_44" /* ɵnov */](_v, 21).ngClassPending; _ck(_v, 13, 0, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8, currVal_9, currVal_10); }); }
function View_AddonModWorkshopAssessmentPage_13(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "ion-option", [], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, [[18, 4]], 0, option_option["a" /* Option */], [core["t" /* ElementRef */]], { value: [0, "value"] }, null), (_l()(), core["_55" /* ɵted */](2, null, ["", ""]))], function (_ck, _v) { var currVal_0 = _v.context.$implicit.value; _ck(_v, 1, 0, currVal_0); }, function (_ck, _v) { var currVal_1 = _v.context.$implicit.label; _ck(_v, 2, 0, currVal_1); }); }
function View_AddonModWorkshopAssessmentPage_12(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 23, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 15, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 16, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 17, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 1, 3, "ion-label", [["stacked", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](8, 16384, [[15, 4]], 0, label["a" /* Label */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, ""], [8, null], [8, null]], null, null), (_l()(), core["_55" /* ɵted */](9, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](12, 0, null, 3, 10, "ion-select", [["formControlName", "grade"], ["interface", "action-sheet"]], [[2, "select-disabled", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "click"], [null, "keyup.space"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (core["_44" /* ɵnov */](_v, 13)._click($event) !== false);
        ad = (pd_0 && ad);
    } if (("keyup.space" === en)) {
        var pd_1 = (core["_44" /* ɵnov */](_v, 13)._keyup() !== false);
        ad = (pd_1 && ad);
    } return ad; }, select_ngfactory["b" /* View_Select_0 */], select_ngfactory["a" /* RenderType_Select */])), core["_30" /* ɵdid */](13, 1228800, null, 1, select_select["a" /* Select */], [app_app["a" /* App */], util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item["a" /* Item */]], deep_linker["a" /* DeepLinker */]], { interface: [0, "interface"] }, null), core["_52" /* ɵqud */](603979776, 18, { options: 1 }), core["_50" /* ɵprd */](1024, null, esm5_forms["l" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [select_select["a" /* Select */]]), core["_30" /* ɵdid */](16, 671744, null, 0, esm5_forms["f" /* FormControlName */], [[3, esm5_forms["b" /* ControlContainer */]], [8, null], [8, null], [2, esm5_forms["l" /* NG_VALUE_ACCESSOR */]]], { name: [0, "name"] }, null), core["_50" /* ɵprd */](2048, null, esm5_forms["m" /* NgControl */], null, [esm5_forms["f" /* FormControlName */]]), core["_30" /* ɵdid */](18, 16384, null, 0, esm5_forms["n" /* NgControlStatus */], [esm5_forms["m" /* NgControl */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModWorkshopAssessmentPage_13)), core["_30" /* ɵdid */](21, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "]))], function (_ck, _v) { var _co = _v.component; var currVal_9 = "action-sheet"; _ck(_v, 13, 0, currVal_9); var currVal_10 = "grade"; _ck(_v, 16, 0, currVal_10); var currVal_11 = _co.evaluationGrades; _ck(_v, 21, 0, currVal_11); }, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 9, 0, core["_44" /* ɵnov */](_v, 10).transform("addon.mod_workshop.gradinggradeover")); _ck(_v, 9, 0, currVal_0); var currVal_1 = core["_44" /* ɵnov */](_v, 13)._disabled; var currVal_2 = core["_44" /* ɵnov */](_v, 18).ngClassUntouched; var currVal_3 = core["_44" /* ɵnov */](_v, 18).ngClassTouched; var currVal_4 = core["_44" /* ɵnov */](_v, 18).ngClassPristine; var currVal_5 = core["_44" /* ɵnov */](_v, 18).ngClassDirty; var currVal_6 = core["_44" /* ɵnov */](_v, 18).ngClassValid; var currVal_7 = core["_44" /* ɵnov */](_v, 18).ngClassInvalid; var currVal_8 = core["_44" /* ɵnov */](_v, 18).ngClassPending; _ck(_v, 12, 0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8); }); }
function View_AddonModWorkshopAssessmentPage_14(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 17, "ion-item", [["class", "item item-block"]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 19, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 20, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 21, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 1, 3, "ion-label", [["stacked", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](8, 16384, [[19, 4]], 0, label["a" /* Label */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, ""], [8, null], [8, null]], null, null), (_l()(), core["_55" /* ɵted */](9, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](12, 0, null, 3, 4, "core-rich-text-editor", [["formControlName", "text"], ["item-content", ""]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], null, null, rich_text_editor_ngfactory["b" /* View_CoreRichTextEditorComponent_0 */], rich_text_editor_ngfactory["a" /* RenderType_CoreRichTextEditorComponent */])), core["_30" /* ɵdid */](13, 1228800, null, 0, rich_text_editor["a" /* CoreRichTextEditorComponent */], [dom["a" /* CoreDomUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], sites["a" /* CoreSitesProvider */], filepool["a" /* CoreFilepoolProvider */], [2, content["a" /* Content */]], core["t" /* ElementRef */], events["a" /* CoreEventsProvider */], utils["a" /* CoreUtilsProvider */], platform["a" /* Platform */]], { control: [0, "control"] }, null), core["_30" /* ɵdid */](14, 671744, null, 0, esm5_forms["f" /* FormControlName */], [[3, esm5_forms["b" /* ControlContainer */]], [8, null], [8, null], [8, null]], { name: [0, "name"] }, null), core["_50" /* ɵprd */](2048, null, esm5_forms["m" /* NgControl */], null, [esm5_forms["f" /* FormControlName */]]), core["_30" /* ɵdid */](16, 16384, null, 0, esm5_forms["n" /* NgControlStatus */], [esm5_forms["m" /* NgControl */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "]))], function (_ck, _v) { var _co = _v.component; var currVal_8 = _co.evaluateForm.controls["text"]; _ck(_v, 13, 0, currVal_8); var currVal_9 = "text"; _ck(_v, 14, 0, currVal_9); }, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 9, 0, core["_44" /* ɵnov */](_v, 10).transform("addon.mod_workshop.feedbackreviewer")); _ck(_v, 9, 0, currVal_0); var currVal_1 = core["_44" /* ɵnov */](_v, 16).ngClassUntouched; var currVal_2 = core["_44" /* ɵnov */](_v, 16).ngClassTouched; var currVal_3 = core["_44" /* ɵnov */](_v, 16).ngClassPristine; var currVal_4 = core["_44" /* ɵnov */](_v, 16).ngClassDirty; var currVal_5 = core["_44" /* ɵnov */](_v, 16).ngClassValid; var currVal_6 = core["_44" /* ɵnov */](_v, 16).ngClassInvalid; var currVal_7 = core["_44" /* ɵnov */](_v, 16).ngClassPending; _ck(_v, 12, 0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7); }); }
function View_AddonModWorkshopAssessmentPage_9(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 41, "form", [["ion-list", ""], ["novalidate", ""]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "submit"], [null, "reset"]], function (_v, en, $event) { var ad = true; if (("submit" === en)) {
        var pd_0 = (core["_44" /* ɵnov */](_v, 2).onSubmit($event) !== false);
        ad = (pd_0 && ad);
    } if (("reset" === en)) {
        var pd_1 = (core["_44" /* ɵnov */](_v, 2).onReset() !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, esm5_forms["w" /* ɵbf */], [], null, null), core["_30" /* ɵdid */](2, 540672, null, 0, esm5_forms["h" /* FormGroupDirective */], [[8, null], [8, null]], { form: [0, "form"] }, null), core["_50" /* ɵprd */](2048, null, esm5_forms["b" /* ControlContainer */], null, [esm5_forms["h" /* FormGroupDirective */]]), core["_30" /* ɵdid */](4, 16384, null, 0, esm5_forms["o" /* NgControlStatusGroup */], [esm5_forms["b" /* ControlContainer */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](6, 0, null, null, 10, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](7, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 5, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 6, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 7, { _icons: 1 }), core["_30" /* ɵdid */](11, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](13, 0, null, 2, 2, "h2", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](14, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModWorkshopAssessmentPage_10)), core["_30" /* ɵdid */](19, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](21, 0, null, null, 13, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](22, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 12, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 13, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 14, { _icons: 1 }), core["_30" /* ɵdid */](26, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](28, 0, null, 2, 2, "h2", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](29, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](32, 0, null, 2, 1, "p", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](33, null, ["", ""])), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModWorkshopAssessmentPage_12)), core["_30" /* ɵdid */](37, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModWorkshopAssessmentPage_14)), core["_30" /* ɵdid */](40, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "]))], function (_ck, _v) { var _co = _v.component; var currVal_7 = _co.evaluateForm; _ck(_v, 2, 0, currVal_7); var currVal_9 = _co.access.canallocate; _ck(_v, 19, 0, currVal_9); var currVal_12 = _co.access.canoverridegrades; _ck(_v, 37, 0, currVal_12); var currVal_13 = _co.access.canoverridegrades; _ck(_v, 40, 0, currVal_13); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = core["_44" /* ɵnov */](_v, 4).ngClassUntouched; var currVal_1 = core["_44" /* ɵnov */](_v, 4).ngClassTouched; var currVal_2 = core["_44" /* ɵnov */](_v, 4).ngClassPristine; var currVal_3 = core["_44" /* ɵnov */](_v, 4).ngClassDirty; var currVal_4 = core["_44" /* ɵnov */](_v, 4).ngClassValid; var currVal_5 = core["_44" /* ɵnov */](_v, 4).ngClassInvalid; var currVal_6 = core["_44" /* ɵnov */](_v, 4).ngClassPending; _ck(_v, 0, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6); var currVal_8 = core["_56" /* ɵunv */](_v, 14, 0, core["_44" /* ɵnov */](_v, 15).transform("addon.mod_workshop.assessmentsettings")); _ck(_v, 14, 0, currVal_8); var currVal_10 = core["_56" /* ɵunv */](_v, 29, 0, core["_44" /* ɵnov */](_v, 30).transform("addon.mod_workshop.gradinggradecalculated")); _ck(_v, 29, 0, currVal_10); var currVal_11 = _co.assessment.gradinggrade; _ck(_v, 33, 0, currVal_11); }); }
function View_AddonModWorkshopAssessmentPage_16(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "ion-avatar", [["core-user-avatar", ""], ["item-start", ""]], null, null, null, user_avatar_ngfactory["b" /* View_CoreUserAvatarComponent_0 */], user_avatar_ngfactory["a" /* RenderType_CoreUserAvatarComponent */])), core["_30" /* ɵdid */](1, 770048, null, 0, user_avatar["a" /* CoreUserAvatarComponent */], [nav_controller["a" /* NavController */], sites["a" /* CoreSitesProvider */], utils["a" /* CoreUtilsProvider */], app["a" /* CoreAppProvider */], events["a" /* CoreEventsProvider */], [2, split_view["a" /* CoreSplitViewComponent */]]], { user: [0, "user"], userId: [1, "userId"], courseId: [2, "courseId"] }, null), core["_30" /* ɵdid */](2, 16384, null, 0, avatar["a" /* Avatar */], [], null, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.evaluateGradingByProfile; var currVal_1 = _co.evaluateGradingByProfile.id; var currVal_2 = _co.courseId; _ck(_v, 1, 0, currVal_0, currVal_1, currVal_2); }, null); }
function View_AddonModWorkshopAssessmentPage_17(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 3, "h2", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](1, null, ["", ""])), core["_48" /* ɵpod */](2, { $a: 0 }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = core["_56" /* ɵunv */](_v, 1, 0, core["_44" /* ɵnov */](_v, 3).transform("addon.mod_workshop.feedbackby", _ck(_v, 2, 0, _co.evaluateGradingByProfile.fullname))); _ck(_v, 1, 0, currVal_0); }); }
function View_AddonModWorkshopAssessmentPage_15(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 19, "ion-list", [], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, list["a" /* List */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], platform["a" /* Platform */], gesture_controller["l" /* GestureController */], dom_controller["a" /* DomController */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 15, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](4, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 22, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 23, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 24, { _icons: 1 }), core["_30" /* ɵdid */](8, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonModWorkshopAssessmentPage_16)), core["_30" /* ɵdid */](11, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, 2, 1, null, View_AddonModWorkshopAssessmentPage_17)), core["_30" /* ɵdid */](14, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](16, 0, null, 2, 1, "core-format-text", [], null, null, null, null, null)), core["_30" /* ɵdid */](17, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform["a" /* Platform */], utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], app["a" /* CoreAppProvider */], contentlinks_providers_helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */]], { text: [0, "text"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.evaluateGradingByProfile; _ck(_v, 11, 0, currVal_0); var currVal_1 = (_co.evaluateGradingByProfile && _co.evaluateGradingByProfile.fullname); _ck(_v, 14, 0, currVal_1); var currVal_2 = _co.evaluate.text; _ck(_v, 17, 0, currVal_2); }, null); }
function View_AddonModWorkshopAssessmentPage_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 23, "ion-header", [], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, toolbar_header["a" /* Header */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, view_controller["a" /* ViewController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 19, "ion-navbar", [["class", "toolbar"], ["core-back-button", ""]], [[8, "hidden", 0], [2, "statusbar-padding", null]], null, null, navbar_ngfactory["b" /* View_Navbar_0 */], navbar_ngfactory["a" /* RenderType_Navbar */])), core["_30" /* ɵdid */](4, 49152, null, 0, navbar["a" /* Navbar */], [app_app["a" /* App */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_30" /* ɵdid */](5, 212992, null, 0, back_button["a" /* CoreBackButtonDirective */], [navbar["a" /* Navbar */], platform["a" /* Platform */], translate_service["a" /* TranslateService */], events["a" /* CoreEventsProvider */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n        "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 3, 3, "ion-title", [], null, null, null, toolbar_title_ngfactory["b" /* View_ToolbarTitle_0 */], toolbar_title_ngfactory["a" /* RenderType_ToolbarTitle */])), core["_30" /* ɵdid */](8, 49152, null, 0, toolbar_title["a" /* ToolbarTitle */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), (_l()(), core["_31" /* ɵeld */](9, 0, null, 0, 1, "core-format-text", [], null, null, null, null, null)), core["_30" /* ɵdid */](10, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform["a" /* Platform */], utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], app["a" /* CoreAppProvider */], contentlinks_providers_helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */]], { text: [0, "text"] }, null), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n        "])), (_l()(), core["_31" /* ɵeld */](12, 0, null, 2, 9, "ion-buttons", [["end", ""]], [[8, "hidden", 0]], null, null, null, null)), core["_30" /* ɵdid */](13, 16384, null, 1, toolbar_item["a" /* ToolbarItem */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), core["_52" /* ɵqud */](603979776, 1, { _buttons: 1 }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](16, 0, null, null, 4, "button", [["clear", ""], ["ion-button", ""]], [[1, "aria-label", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.saveEvaluation() !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](17, 1097728, [[1, 4]], 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { clear: [0, "clear"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](19, 0, ["\n                ", "\n            "])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_31" /* ɵeld */](25, 0, null, null, 52, "ion-content", [], [[2, "statusbar-padding", null], [2, "has-refresher", null]], null, null, content_ngfactory["b" /* View_Content_0 */], content_ngfactory["a" /* RenderType_Content */])), core["_30" /* ɵdid */](26, 4374528, null, 0, content["a" /* Content */], [config["a" /* Config */], platform["a" /* Platform */], dom_controller["a" /* DomController */], core["t" /* ElementRef */], core["V" /* Renderer */], app_app["a" /* App */], keyboard["a" /* Keyboard */], core["M" /* NgZone */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n    "])), (_l()(), core["_31" /* ɵeld */](28, 0, null, 2, 6, "ion-refresher", [], [[2, "refresher-active", null], [4, "top", null]], [[null, "ionRefresh"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("ionRefresh" === en)) {
        var pd_0 = (_co.refreshAssessment($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), core["_30" /* ɵdid */](29, 212992, null, 0, refresher["a" /* Refresher */], [platform["a" /* Platform */], content["a" /* Content */], core["M" /* NgZone */], gesture_controller["l" /* GestureController */]], { enabled: [0, "enabled"] }, { ionRefresh: "ionRefresh" }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_31" /* ɵeld */](31, 0, null, null, 2, "ion-refresher-content", [], [[1, "state", 0]], null, null, refresher_content_ngfactory["b" /* View_RefresherContent_0 */], refresher_content_ngfactory["a" /* RenderType_RefresherContent */])), core["_30" /* ɵdid */](32, 114688, null, 0, refresher_content["a" /* RefresherContent */], [refresher["a" /* Refresher */], config["a" /* Config */]], { pullingText: [0, "pullingText"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n    "])), (_l()(), core["_31" /* ɵeld */](36, 0, null, 1, 40, "core-loading", [], null, null, null, loading_ngfactory["b" /* View_CoreLoadingComponent_0 */], loading_ngfactory["a" /* RenderType_CoreLoadingComponent */])), core["_30" /* ɵdid */](37, 638976, null, 0, loading["a" /* CoreLoadingComponent */], [translate_service["a" /* TranslateService */], core["t" /* ElementRef */], events["a" /* CoreEventsProvider */], utils["a" /* CoreUtilsProvider */]], { hideUntil: [0, "hideUntil"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n\n        "])), (_l()(), core["_31" /* ɵeld */](39, 0, null, 0, 27, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](40, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 2, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 3, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 4, { _icons: 1 }), core["_30" /* ɵdid */](44, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonModWorkshopAssessmentPage_1)), core["_30" /* ɵdid */](47, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, 2, 1, null, View_AddonModWorkshopAssessmentPage_2)), core["_30" /* ɵdid */](50, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, 2, 1, null, View_AddonModWorkshopAssessmentPage_3)), core["_30" /* ɵdid */](53, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, 2, 1, null, View_AddonModWorkshopAssessmentPage_4)), core["_30" /* ɵdid */](56, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, 2, 1, null, View_AddonModWorkshopAssessmentPage_5)), core["_30" /* ɵdid */](59, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, 2, 1, null, View_AddonModWorkshopAssessmentPage_6)), core["_30" /* ɵdid */](62, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, 2, 1, null, View_AddonModWorkshopAssessmentPage_7)), core["_30" /* ɵdid */](65, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonModWorkshopAssessmentPage_8)), core["_30" /* ɵdid */](69, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonModWorkshopAssessmentPage_9)), core["_30" /* ɵdid */](72, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonModWorkshopAssessmentPage_15)), core["_30" /* ɵdid */](75, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; _ck(_v, 5, 0); var currVal_2 = _co.title; _ck(_v, 10, 0, currVal_2); var currVal_5 = ""; _ck(_v, 17, 0, currVal_5); var currVal_11 = _co.loaded; _ck(_v, 29, 0, currVal_11); var currVal_13 = core["_34" /* ɵinlineInterpolate */](1, "", core["_56" /* ɵunv */](_v, 32, 0, core["_44" /* ɵnov */](_v, 33).transform("core.pulltorefresh")), ""); _ck(_v, 32, 0, currVal_13); var currVal_14 = _co.loaded; _ck(_v, 37, 0, currVal_14); var currVal_15 = _co.profile; _ck(_v, 47, 0, currVal_15); var currVal_16 = (_co.profile && _co.profile.fullname); _ck(_v, 50, 0, currVal_16); var currVal_17 = ((_co.workshop && _co.assessment) && _co.showGrade(_co.assessment.grade)); _ck(_v, 53, 0, currVal_17); var currVal_18 = (((_co.access && _co.access.canviewallsubmissions) && _co.assessment) && _co.showGrade(_co.assessment.gradinggrade)); _ck(_v, 56, 0, currVal_18); var currVal_19 = (((_co.access && _co.access.canviewallsubmissions) && _co.assessment) && _co.showGrade(_co.assessment.gradinggradeover)); _ck(_v, 59, 0, currVal_19); var currVal_20 = ((_co.assessment && _co.assessment.weight) && (_co.assessment.weight != 1)); _ck(_v, 62, 0, currVal_20); var currVal_21 = (!_co.assessment || !_co.showGrade(_co.assessment.grade)); _ck(_v, 65, 0, currVal_21); var currVal_22 = ((((_co.assessment && _co.assessmentId) && _co.showGrade(_co.assessment.grade)) && _co.workshop) && _co.access); _ck(_v, 69, 0, currVal_22); var currVal_23 = _co.evaluating; _ck(_v, 72, 0, currVal_23); var currVal_24 = ((!_co.evaluating && _co.evaluate) && _co.evaluate.text); _ck(_v, 75, 0, currVal_24); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = core["_44" /* ɵnov */](_v, 4)._hidden; var currVal_1 = core["_44" /* ɵnov */](_v, 4)._sbPadding; _ck(_v, 3, 0, currVal_0, currVal_1); var currVal_3 = !_co.evaluating; _ck(_v, 12, 0, currVal_3); var currVal_4 = core["_56" /* ɵunv */](_v, 16, 0, core["_44" /* ɵnov */](_v, 18).transform("core.save")); _ck(_v, 16, 0, currVal_4); var currVal_6 = core["_56" /* ɵunv */](_v, 19, 0, core["_44" /* ɵnov */](_v, 20).transform("core.save")); _ck(_v, 19, 0, currVal_6); var currVal_7 = core["_44" /* ɵnov */](_v, 26).statusbarPadding; var currVal_8 = core["_44" /* ɵnov */](_v, 26)._hasRefresher; _ck(_v, 25, 0, currVal_7, currVal_8); var currVal_9 = (core["_44" /* ɵnov */](_v, 29).state !== "inactive"); var currVal_10 = core["_44" /* ɵnov */](_v, 29)._top; _ck(_v, 28, 0, currVal_9, currVal_10); var currVal_12 = core["_44" /* ɵnov */](_v, 32).r.state; _ck(_v, 31, 0, currVal_12); }); }
function View_AddonModWorkshopAssessmentPage_Host_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "page-addon-mod-workshop-assessment-page", [], null, null, null, View_AddonModWorkshopAssessmentPage_0, RenderType_AddonModWorkshopAssessmentPage)), core["_30" /* ɵdid */](1, 245760, null, 0, assessment_AddonModWorkshopAssessmentPage, [nav_params["a" /* NavParams */], sites["a" /* CoreSitesProvider */], course["a" /* CoreCourseProvider */], workshop["a" /* AddonModWorkshopProvider */], offline["a" /* AddonModWorkshopOfflineProvider */], providers_helper["a" /* AddonModWorkshopHelperProvider */], nav_controller["a" /* NavController */], sync["a" /* CoreSyncProvider */], utils_text["a" /* CoreTextUtilsProvider */], esm5_forms["d" /* FormBuilder */], translate_service["a" /* TranslateService */], events["a" /* CoreEventsProvider */], dom["a" /* CoreDomUtilsProvider */], helper["a" /* CoreGradesHelperProvider */], user["a" /* CoreUserProvider */]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var AddonModWorkshopAssessmentPageNgFactory = core["_27" /* ɵccf */]("page-addon-mod-workshop-assessment-page", assessment_AddonModWorkshopAssessmentPage, View_AddonModWorkshopAssessmentPage_Host_0, {}, {}, []);

//# sourceMappingURL=assessment.ngfactory.js.map
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

// EXTERNAL MODULE: ./src/core/block/components/components.module.ts
var block_components_components_module = __webpack_require__(269);

// EXTERNAL MODULE: ./src/core/course/components/components.module.ts
var course_components_components_module = __webpack_require__(71);

// EXTERNAL MODULE: ./node_modules/ionic-angular/util/module-loader.js
var module_loader = __webpack_require__(268);

// CONCATENATED MODULE: ./src/addon/mod/workshop/pages/assessment/assessment.module.ngfactory.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddonModWorkshopAssessmentPageModuleNgFactory", function() { return AddonModWorkshopAssessmentPageModuleNgFactory; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 








































var AddonModWorkshopAssessmentPageModuleNgFactory = core["_28" /* ɵcmf */](assessment_module_AddonModWorkshopAssessmentPageModule, [], function (_l) { return core["_40" /* ɵmod */]([core["_41" /* ɵmpd */](512, core["o" /* ComponentFactoryResolver */], core["_21" /* ɵCodegenComponentFactoryResolver */], [[8, [action_sheet_component_ngfactory["a" /* ActionSheetCmpNgFactory */], alert_component_ngfactory["a" /* AlertCmpNgFactory */], app_root_ngfactory["a" /* IonicAppNgFactory */], loading_component_ngfactory["a" /* LoadingCmpNgFactory */], modal_component_ngfactory["a" /* ModalCmpNgFactory */], picker_component_ngfactory["a" /* PickerCmpNgFactory */], popover_component_ngfactory["a" /* PopoverCmpNgFactory */], select_popover_component_ngfactory["a" /* SelectPopoverNgFactory */], toast_component_ngfactory["a" /* ToastCmpNgFactory */], context_menu_popover_ngfactory["a" /* CoreContextMenuPopoverComponentNgFactory */], course_picker_menu_popover_ngfactory["a" /* CoreCoursePickerMenuPopoverComponentNgFactory */], recaptchamodal_ngfactory["a" /* CoreRecaptchaModalComponentNgFactory */], bs_tooltip_ngfactory["a" /* CoreBSTooltipComponentNgFactory */], only_title_block_ngfactory["a" /* CoreBlockOnlyTitleComponentNgFactory */], pre_rendered_block_ngfactory["a" /* CoreBlockPreRenderedComponentNgFactory */], course_blocks_ngfactory["a" /* CoreBlockCourseBlocksComponentNgFactory */], unsupported_module_ngfactory["a" /* CoreCourseUnsupportedModuleComponentNgFactory */], tag_area_ngfactory["a" /* CoreCourseTagAreaComponentNgFactory */], index_ngfactory["a" /* AddonModWorkshopIndexComponentNgFactory */], AddonModWorkshopAssessmentPageNgFactory]], [3, core["o" /* ComponentFactoryResolver */]], core["K" /* NgModuleRef */]]), core["_41" /* ɵmpd */](4608, common["m" /* NgLocalization */], common["l" /* NgLocaleLocalization */], [core["G" /* LOCALE_ID */], [2, common["w" /* ɵa */]]]), core["_41" /* ɵmpd */](4608, esm5_forms["x" /* ɵi */], esm5_forms["x" /* ɵi */], []), core["_41" /* ɵmpd */](4608, esm5_forms["d" /* FormBuilder */], esm5_forms["d" /* FormBuilder */], []), core["_41" /* ɵmpd */](4608, translate_loader["b" /* TranslateLoader */], translate_loader["a" /* TranslateFakeLoader */], []), core["_41" /* ɵmpd */](4608, translate_compiler["a" /* TranslateCompiler */], translate_compiler["b" /* TranslateFakeCompiler */], []), core["_41" /* ɵmpd */](4608, translate_parser["b" /* TranslateParser */], translate_parser["a" /* TranslateDefaultParser */], []), core["_41" /* ɵmpd */](4608, missing_translation_handler["b" /* MissingTranslationHandler */], missing_translation_handler["a" /* FakeMissingTranslationHandler */], []), core["_41" /* ɵmpd */](4608, translate_service["a" /* TranslateService */], translate_service["a" /* TranslateService */], [translate_store["a" /* TranslateStore */], translate_loader["b" /* TranslateLoader */], translate_compiler["a" /* TranslateCompiler */], translate_parser["b" /* TranslateParser */], missing_translation_handler["b" /* MissingTranslationHandler */], translate_service["b" /* USE_DEFAULT_LANG */], translate_service["c" /* USE_STORE */]]), core["_41" /* ɵmpd */](512, directives_module["a" /* CoreDirectivesModule */], directives_module["a" /* CoreDirectivesModule */], []), core["_41" /* ɵmpd */](512, common["b" /* CommonModule */], common["b" /* CommonModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["v" /* ɵba */], esm5_forms["v" /* ɵba */], []), core["_41" /* ɵmpd */](512, esm5_forms["i" /* FormsModule */], esm5_forms["i" /* FormsModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["s" /* ReactiveFormsModule */], esm5_forms["s" /* ReactiveFormsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["a" /* IonicModule */], ionic_angular_module["a" /* IonicModule */], []), core["_41" /* ɵmpd */](512, _ngx_translate_core["b" /* TranslateModule */], _ngx_translate_core["b" /* TranslateModule */], []), core["_41" /* ɵmpd */](512, pipes_module["a" /* CorePipesModule */], pipes_module["a" /* CorePipesModule */], []), core["_41" /* ɵmpd */](512, components_module["a" /* CoreComponentsModule */], components_module["a" /* CoreComponentsModule */], []), core["_41" /* ɵmpd */](512, block_components_components_module["a" /* CoreBlockComponentsModule */], block_components_components_module["a" /* CoreBlockComponentsModule */], []), core["_41" /* ɵmpd */](512, course_components_components_module["a" /* CoreCourseComponentsModule */], course_components_components_module["a" /* CoreCourseComponentsModule */], []), core["_41" /* ɵmpd */](512, components_components_module["a" /* AddonModWorkshopComponentsModule */], components_components_module["a" /* AddonModWorkshopComponentsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["b" /* IonicPageModule */], ionic_angular_module["b" /* IonicPageModule */], []), core["_41" /* ɵmpd */](512, assessment_module_AddonModWorkshopAssessmentPageModule, assessment_module_AddonModWorkshopAssessmentPageModule, []), core["_41" /* ɵmpd */](256, translate_service["c" /* USE_STORE */], undefined, []), core["_41" /* ɵmpd */](256, translate_service["b" /* USE_DEFAULT_LANG */], undefined, []), core["_41" /* ɵmpd */](256, module_loader["a" /* LAZY_LOADED_TOKEN */], assessment_AddonModWorkshopAssessmentPage, [])]); });

//# sourceMappingURL=assessment.module.ngfactory.js.map

/***/ }),

/***/ 2120:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RenderType_AddonModWorkshopAssessmentStrategyComponent; });
/* harmony export (immutable) */ __webpack_exports__["b"] = View_AddonModWorkshopAssessmentStrategyComponent_0;
/* unused harmony export View_AddonModWorkshopAssessmentStrategyComponent_Host_0 */
/* unused harmony export AddonModWorkshopAssessmentStrategyComponentNgFactory */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_dynamic_component_dynamic_component_ngfactory__ = __webpack_require__(712);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_dynamic_component_dynamic_component__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_logger__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular_navigation_nav_controller__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_utils_dom__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core_src_translate_pipe__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core_src_translate_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_input_errors_input_errors_ngfactory__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_input_errors_input_errors__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__node_modules_ionic_angular_components_item_item_ngfactory__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ionic_angular_components_item_item__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ionic_angular_util_form__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_ionic_angular_config_config__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_ionic_angular_components_item_item_reorder__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_ionic_angular_components_item_item_content__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_mark_required_mark_required_ngfactory__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_ionic_angular_components_label_label__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_mark_required_mark_required__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__providers_utils_text__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__providers_utils_utils__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__components_rich_text_editor_rich_text_editor_ngfactory__ = __webpack_require__(307);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__components_rich_text_editor_rich_text_editor__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__providers_utils_url__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__providers_sites__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__providers_filepool__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26_ionic_angular_components_content_content__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__providers_events__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28_ionic_angular_platform_platform__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__angular_common__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__components_attachments_attachments_ngfactory__ = __webpack_require__(481);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__components_attachments_attachments__ = __webpack_require__(311);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__providers_app__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__core_fileuploader_providers_fileuploader__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__core_fileuploader_providers_helper__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35_ionic_angular_components_option_option__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__node_modules_ionic_angular_components_select_select_ngfactory__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37_ionic_angular_components_select_select__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38_ionic_angular_components_app_app__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39_ionic_angular_navigation_deep_linker__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__directives_format_text__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__core_contentlinks_providers_helper__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__components_split_view_split_view__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__providers_utils_iframe__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__components_file_file_ngfactory__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__components_file_file__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__providers_file_helper__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__providers_utils_mimetype__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__components_local_file_local_file_ngfactory__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__components_local_file_local_file__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__providers_file__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__providers_utils_time__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53_ionic_angular_components_card_card__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54__components_loading_loading_ngfactory__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55__components_loading_loading__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56__assessment_strategy__ = __webpack_require__(1501);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_57__providers_file_session__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_58__providers_sync__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_59__providers_workshop__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_60__providers_helper__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_61__providers_offline__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_62__providers_assessment_strategy_delegate__ = __webpack_require__(187);
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 































































var styles_AddonModWorkshopAssessmentStrategyComponent = [];
var RenderType_AddonModWorkshopAssessmentStrategyComponent = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_AddonModWorkshopAssessmentStrategyComponent, data: {} });

function View_AddonModWorkshopAssessmentStrategyComponent_1(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 4, null, null, null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](2, 0, null, null, 1, "core-dynamic-component", [], null, null, null, __WEBPACK_IMPORTED_MODULE_1__components_dynamic_component_dynamic_component_ngfactory__["b" /* View_CoreDynamicComponent_0 */], __WEBPACK_IMPORTED_MODULE_1__components_dynamic_component_dynamic_component_ngfactory__["a" /* RenderType_CoreDynamicComponent */])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](3, 901120, null, 0, __WEBPACK_IMPORTED_MODULE_2__components_dynamic_component_dynamic_component__["a" /* CoreDynamicComponent */], [__WEBPACK_IMPORTED_MODULE_3__providers_logger__["a" /* CoreLoggerProvider */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* ComponentFactoryResolver */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* KeyValueDiffers */], [2, __WEBPACK_IMPORTED_MODULE_4_ionic_angular_navigation_nav_controller__["a" /* NavController */]], __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_5__providers_utils_dom__["a" /* CoreDomUtilsProvider */]], { component: [0, "component"], data: [1, "data"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n        "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.componentClass; var currVal_1 = _co.data; _ck(_v, 3, 0, currVal_0, currVal_1); }, null); }
function View_AddonModWorkshopAssessmentStrategyComponent_2(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 3, "div", [["class", "core-info-card"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](1, null, ["\n            ", "\n        "])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_48" /* ɵpod */](2, { $a: 0 }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_47" /* ɵpid */](131072, __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core_src_translate_pipe__["a" /* TranslatePipe */], [__WEBPACK_IMPORTED_MODULE_7__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */]])], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_56" /* ɵunv */](_v, 1, 0, __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 3).transform("addon.mod_workshop.assessmentstrategynotsupported", _ck(_v, 2, 0, _co.strategy))); _ck(_v, 1, 0, currVal_0); }); }
function View_AddonModWorkshopAssessmentStrategyComponent_5(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 1, "core-input-errors", [["item-content", ""]], null, null, null, __WEBPACK_IMPORTED_MODULE_8__components_input_errors_input_errors_ngfactory__["b" /* View_CoreInputErrorsComponent_0 */], __WEBPACK_IMPORTED_MODULE_8__components_input_errors_input_errors_ngfactory__["a" /* RenderType_CoreInputErrorsComponent */])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](1, 638976, null, 0, __WEBPACK_IMPORTED_MODULE_9__components_input_errors_input_errors__["a" /* CoreInputErrorsComponent */], [__WEBPACK_IMPORTED_MODULE_7__ngx_translate_core_src_translate_service__["a" /* TranslateService */]], { errorText: [0, "errorText"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.fieldErrors["feedbackauthor"]; _ck(_v, 1, 0, currVal_0); }, null); }
function View_AddonModWorkshopAssessmentStrategyComponent_4(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 18, "ion-item", [["class", "item item-block"], ["stacked", ""]], null, null, null, __WEBPACK_IMPORTED_MODULE_10__node_modules_ionic_angular_components_item_item_ngfactory__["b" /* View_Item_0 */], __WEBPACK_IMPORTED_MODULE_10__node_modules_ionic_angular_components_item_item_ngfactory__["a" /* RenderType_Item */])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](1, 1097728, null, 3, __WEBPACK_IMPORTED_MODULE_11_ionic_angular_components_item_item__["a" /* Item */], [__WEBPACK_IMPORTED_MODULE_12_ionic_angular_util_form__["a" /* Form */], __WEBPACK_IMPORTED_MODULE_13_ionic_angular_config_config__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */], [2, __WEBPACK_IMPORTED_MODULE_14_ionic_angular_components_item_item_reorder__["a" /* ItemReorder */]]], null, null), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_52" /* ɵqud */](335544320, 4, { contentLabel: 0 }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_52" /* ɵqud */](603979776, 5, { _buttons: 1 }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_52" /* ɵqud */](603979776, 6, { _icons: 1 }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](5, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_15_ionic_angular_components_item_item_content__["a" /* ItemContent */], [], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](7, 0, null, 1, 4, "ion-label", [["stacked", ""]], null, null, null, __WEBPACK_IMPORTED_MODULE_16__components_mark_required_mark_required_ngfactory__["b" /* View_CoreMarkRequiredComponent_0 */], __WEBPACK_IMPORTED_MODULE_16__components_mark_required_mark_required_ngfactory__["a" /* RenderType_CoreMarkRequiredComponent */])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](8, 16384, [[4, 4]], 0, __WEBPACK_IMPORTED_MODULE_17_ionic_angular_components_label_label__["a" /* Label */], [__WEBPACK_IMPORTED_MODULE_13_ionic_angular_config_config__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */], [8, null], [8, ""], [8, null], [8, null]], null, null), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](9, 4308992, null, 0, __WEBPACK_IMPORTED_MODULE_18__components_mark_required_mark_required__["a" /* CoreMarkRequiredComponent */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_19__providers_utils_text__["a" /* CoreTextUtilsProvider */], __WEBPACK_IMPORTED_MODULE_20__providers_utils_utils__["a" /* CoreUtilsProvider */]], { coreMarkRequired: [0, "coreMarkRequired"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](10, 0, ["", ""])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_47" /* ɵpid */](131072, __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core_src_translate_pipe__["a" /* TranslatePipe */], [__WEBPACK_IMPORTED_MODULE_7__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */]]), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](13, 0, null, 3, 1, "core-rich-text-editor", [["item-content", ""]], null, [[null, "contentChanged"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("contentChanged" === en)) {
        var pd_0 = (_co.onFeedbackChange($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_21__components_rich_text_editor_rich_text_editor_ngfactory__["b" /* View_CoreRichTextEditorComponent_0 */], __WEBPACK_IMPORTED_MODULE_21__components_rich_text_editor_rich_text_editor_ngfactory__["a" /* RenderType_CoreRichTextEditorComponent */])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](14, 1228800, null, 0, __WEBPACK_IMPORTED_MODULE_22__components_rich_text_editor_rich_text_editor__["a" /* CoreRichTextEditorComponent */], [__WEBPACK_IMPORTED_MODULE_5__providers_utils_dom__["a" /* CoreDomUtilsProvider */], __WEBPACK_IMPORTED_MODULE_23__providers_utils_url__["a" /* CoreUrlUtilsProvider */], __WEBPACK_IMPORTED_MODULE_24__providers_sites__["a" /* CoreSitesProvider */], __WEBPACK_IMPORTED_MODULE_25__providers_filepool__["a" /* CoreFilepoolProvider */], [2, __WEBPACK_IMPORTED_MODULE_26_ionic_angular_components_content_content__["a" /* Content */]], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_27__providers_events__["a" /* CoreEventsProvider */], __WEBPACK_IMPORTED_MODULE_20__providers_utils_utils__["a" /* CoreUtilsProvider */], __WEBPACK_IMPORTED_MODULE_28_ionic_angular_platform_platform__["a" /* Platform */]], { control: [0, "control"], component: [1, "component"], componentId: [2, "componentId"] }, { contentChanged: "contentChanged" }), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_26" /* ɵand */](16777216, null, 3, 1, null, View_AddonModWorkshopAssessmentStrategyComponent_5)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](17, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_29__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewContainerRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 2, ["\n            "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.overallFeedkbackRequired; _ck(_v, 9, 0, currVal_0); var currVal_2 = _co.feedbackControl; var currVal_3 = _co.component; var currVal_4 = _co.workshop.coursemodule; _ck(_v, 14, 0, currVal_2, currVal_3, currVal_4); var currVal_5 = ((_co.overallFeedkbackRequired && _co.fieldErrors) && _co.fieldErrors["feedbackauthor"]); _ck(_v, 17, 0, currVal_5); }, function (_ck, _v) { var currVal_1 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_56" /* ɵunv */](_v, 10, 0, __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 11).transform("addon.mod_workshop.feedbackauthor")); _ck(_v, 10, 0, currVal_1); }); }
function View_AddonModWorkshopAssessmentStrategyComponent_6(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 1, "core-attachments", [], null, null, null, __WEBPACK_IMPORTED_MODULE_30__components_attachments_attachments_ngfactory__["b" /* View_CoreAttachmentsComponent_0 */], __WEBPACK_IMPORTED_MODULE_30__components_attachments_attachments_ngfactory__["a" /* RenderType_CoreAttachmentsComponent */])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](1, 114688, null, 0, __WEBPACK_IMPORTED_MODULE_31__components_attachments_attachments__["a" /* CoreAttachmentsComponent */], [__WEBPACK_IMPORTED_MODULE_32__providers_app__["a" /* CoreAppProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_utils_dom__["a" /* CoreDomUtilsProvider */], __WEBPACK_IMPORTED_MODULE_19__providers_utils_text__["a" /* CoreTextUtilsProvider */], __WEBPACK_IMPORTED_MODULE_33__core_fileuploader_providers_fileuploader__["a" /* CoreFileUploaderProvider */], __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_34__core_fileuploader_providers_helper__["a" /* CoreFileUploaderHelperProvider */]], { files: [0, "files"], maxSize: [1, "maxSize"], maxSubmissions: [2, "maxSubmissions"], component: [3, "component"], componentId: [4, "componentId"], allowOffline: [5, "allowOffline"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.data.assessment.feedbackattachmentfiles; var currVal_1 = _co.workshop.overallfeedbackmaxbytes; var currVal_2 = _co.workshop.overallfeedbackfiles; var currVal_3 = _co.component; var currVal_4 = _co.componentId; var currVal_5 = true; _ck(_v, 1, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5); }, null); }
function View_AddonModWorkshopAssessmentStrategyComponent_8(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 2, "ion-option", [], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](1, 16384, [[10, 4]], 0, __WEBPACK_IMPORTED_MODULE_35_ionic_angular_components_option_option__["a" /* Option */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */]], { value: [0, "value"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](2, null, ["", ""]))], function (_ck, _v) { var currVal_0 = _v.context.$implicit; _ck(_v, 1, 0, currVal_0); }, function (_ck, _v) { var currVal_1 = _v.context.$implicit; _ck(_v, 2, 0, currVal_1); }); }
function View_AddonModWorkshopAssessmentStrategyComponent_7(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 24, "ion-item", [["class", "item item-block"]], null, null, null, __WEBPACK_IMPORTED_MODULE_10__node_modules_ionic_angular_components_item_item_ngfactory__["b" /* View_Item_0 */], __WEBPACK_IMPORTED_MODULE_10__node_modules_ionic_angular_components_item_item_ngfactory__["a" /* RenderType_Item */])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](1, 1097728, null, 3, __WEBPACK_IMPORTED_MODULE_11_ionic_angular_components_item_item__["a" /* Item */], [__WEBPACK_IMPORTED_MODULE_12_ionic_angular_util_form__["a" /* Form */], __WEBPACK_IMPORTED_MODULE_13_ionic_angular_config_config__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */], [2, __WEBPACK_IMPORTED_MODULE_14_ionic_angular_components_item_item_reorder__["a" /* ItemReorder */]]], null, null), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_52" /* ɵqud */](335544320, 7, { contentLabel: 0 }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_52" /* ɵqud */](603979776, 8, { _buttons: 1 }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_52" /* ɵqud */](603979776, 9, { _icons: 1 }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](5, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_15_ionic_angular_components_item_item_content__["a" /* ItemContent */], [], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](7, 0, null, 1, 4, "ion-label", [["stacked", ""]], null, null, null, __WEBPACK_IMPORTED_MODULE_16__components_mark_required_mark_required_ngfactory__["b" /* View_CoreMarkRequiredComponent_0 */], __WEBPACK_IMPORTED_MODULE_16__components_mark_required_mark_required_ngfactory__["a" /* RenderType_CoreMarkRequiredComponent */])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](8, 16384, [[7, 4]], 0, __WEBPACK_IMPORTED_MODULE_17_ionic_angular_components_label_label__["a" /* Label */], [__WEBPACK_IMPORTED_MODULE_13_ionic_angular_config_config__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */], [8, null], [8, ""], [8, null], [8, null]], null, null), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](9, 4308992, null, 0, __WEBPACK_IMPORTED_MODULE_18__components_mark_required_mark_required__["a" /* CoreMarkRequiredComponent */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_19__providers_utils_text__["a" /* CoreTextUtilsProvider */], __WEBPACK_IMPORTED_MODULE_20__providers_utils_utils__["a" /* CoreUtilsProvider */]], { coreMarkRequired: [0, "coreMarkRequired"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](10, 0, ["", ""])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_47" /* ɵpid */](131072, __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core_src_translate_pipe__["a" /* TranslatePipe */], [__WEBPACK_IMPORTED_MODULE_7__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */]]), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](13, 0, null, 3, 10, "ion-select", [["interface", "action-sheet"]], [[2, "select-disabled", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "click"], [null, "keyup.space"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 14)._click($event) !== false);
        ad = (pd_0 && ad);
    } if (("keyup.space" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 14)._keyup() !== false);
        ad = (pd_1 && ad);
    } if (("ngModelChange" === en)) {
        var pd_2 = ((_co.weight = $event) !== false);
        ad = (pd_2 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_36__node_modules_ionic_angular_components_select_select_ngfactory__["b" /* View_Select_0 */], __WEBPACK_IMPORTED_MODULE_36__node_modules_ionic_angular_components_select_select_ngfactory__["a" /* RenderType_Select */])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](14, 1228800, null, 1, __WEBPACK_IMPORTED_MODULE_37_ionic_angular_components_select_select__["a" /* Select */], [__WEBPACK_IMPORTED_MODULE_38_ionic_angular_components_app_app__["a" /* App */], __WEBPACK_IMPORTED_MODULE_12_ionic_angular_util_form__["a" /* Form */], __WEBPACK_IMPORTED_MODULE_13_ionic_angular_config_config__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */], [2, __WEBPACK_IMPORTED_MODULE_11_ionic_angular_components_item_item__["a" /* Item */]], __WEBPACK_IMPORTED_MODULE_39_ionic_angular_navigation_deep_linker__["a" /* DeepLinker */]], { interface: [0, "interface"] }, null), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_52" /* ɵqud */](603979776, 10, { options: 1 }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_50" /* ɵprd */](1024, null, __WEBPACK_IMPORTED_MODULE_40__angular_forms__["l" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [__WEBPACK_IMPORTED_MODULE_37_ionic_angular_components_select_select__["a" /* Select */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](17, 671744, null, 0, __WEBPACK_IMPORTED_MODULE_40__angular_forms__["q" /* NgModel */], [[2, __WEBPACK_IMPORTED_MODULE_40__angular_forms__["b" /* ControlContainer */]], [8, null], [8, null], [2, __WEBPACK_IMPORTED_MODULE_40__angular_forms__["l" /* NG_VALUE_ACCESSOR */]]], { model: [0, "model"] }, { update: "ngModelChange" }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_50" /* ɵprd */](2048, null, __WEBPACK_IMPORTED_MODULE_40__angular_forms__["m" /* NgControl */], null, [__WEBPACK_IMPORTED_MODULE_40__angular_forms__["q" /* NgModel */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](19, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_40__angular_forms__["n" /* NgControlStatus */], [__WEBPACK_IMPORTED_MODULE_40__angular_forms__["m" /* NgControl */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModWorkshopAssessmentStrategyComponent_8)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](22, 802816, null, 0, __WEBPACK_IMPORTED_MODULE_29__angular_common__["j" /* NgForOf */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewContainerRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* TemplateRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 2, ["\n            "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = true; _ck(_v, 9, 0, currVal_0); var currVal_10 = "action-sheet"; _ck(_v, 14, 0, currVal_10); var currVal_11 = _co.weight; _ck(_v, 17, 0, currVal_11); var currVal_12 = _co.weights; _ck(_v, 22, 0, currVal_12); }, function (_ck, _v) { var currVal_1 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_56" /* ɵunv */](_v, 10, 0, __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 11).transform("addon.mod_workshop.assessmentweight")); _ck(_v, 10, 0, currVal_1); var currVal_2 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 14)._disabled; var currVal_3 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 19).ngClassUntouched; var currVal_4 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 19).ngClassTouched; var currVal_5 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 19).ngClassPristine; var currVal_6 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 19).ngClassDirty; var currVal_7 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 19).ngClassValid; var currVal_8 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 19).ngClassInvalid; var currVal_9 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 19).ngClassPending; _ck(_v, 13, 0, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8, currVal_9); }); }
function View_AddonModWorkshopAssessmentStrategyComponent_9(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 9, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, __WEBPACK_IMPORTED_MODULE_10__node_modules_ionic_angular_components_item_item_ngfactory__["b" /* View_Item_0 */], __WEBPACK_IMPORTED_MODULE_10__node_modules_ionic_angular_components_item_item_ngfactory__["a" /* RenderType_Item */])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](1, 1097728, null, 3, __WEBPACK_IMPORTED_MODULE_11_ionic_angular_components_item_item__["a" /* Item */], [__WEBPACK_IMPORTED_MODULE_12_ionic_angular_util_form__["a" /* Form */], __WEBPACK_IMPORTED_MODULE_13_ionic_angular_config_config__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */], [2, __WEBPACK_IMPORTED_MODULE_14_ionic_angular_components_item_item_reorder__["a" /* ItemReorder */]]], null, null), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_52" /* ɵqud */](335544320, 11, { contentLabel: 0 }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_52" /* ɵqud */](603979776, 12, { _buttons: 1 }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_52" /* ɵqud */](603979776, 13, { _icons: 1 }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](5, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_15_ionic_angular_components_item_item_content__["a" /* ItemContent */], [], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](7, 0, null, 2, 1, "core-format-text", [], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](8, 540672, null, 0, __WEBPACK_IMPORTED_MODULE_41__directives_format_text__["a" /* CoreFormatTextDirective */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_24__providers_sites__["a" /* CoreSitesProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_utils_dom__["a" /* CoreDomUtilsProvider */], __WEBPACK_IMPORTED_MODULE_19__providers_utils_text__["a" /* CoreTextUtilsProvider */], __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_28_ionic_angular_platform_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_20__providers_utils_utils__["a" /* CoreUtilsProvider */], __WEBPACK_IMPORTED_MODULE_23__providers_utils_url__["a" /* CoreUrlUtilsProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_logger__["a" /* CoreLoggerProvider */], __WEBPACK_IMPORTED_MODULE_25__providers_filepool__["a" /* CoreFilepoolProvider */], __WEBPACK_IMPORTED_MODULE_32__providers_app__["a" /* CoreAppProvider */], __WEBPACK_IMPORTED_MODULE_42__core_contentlinks_providers_helper__["a" /* CoreContentLinksHelperProvider */], [2, __WEBPACK_IMPORTED_MODULE_4_ionic_angular_navigation_nav_controller__["a" /* NavController */]], [2, __WEBPACK_IMPORTED_MODULE_26_ionic_angular_components_content_content__["a" /* Content */]], [2, __WEBPACK_IMPORTED_MODULE_43__components_split_view_split_view__["a" /* CoreSplitViewComponent */]], __WEBPACK_IMPORTED_MODULE_44__providers_utils_iframe__["a" /* CoreIframeUtilsProvider */], __WEBPACK_IMPORTED_MODULE_27__providers_events__["a" /* CoreEventsProvider */]], { text: [0, "text"], component: [1, "component"], componentId: [2, "componentId"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 2, ["\n            "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.data.assessment.feedbackauthor; var currVal_1 = _co.component; var currVal_2 = _co.componentId; _ck(_v, 8, 0, currVal_0, currVal_1, currVal_2); }, null); }
function View_AddonModWorkshopAssessmentStrategyComponent_12(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 1, "core-file", [], null, null, null, __WEBPACK_IMPORTED_MODULE_45__components_file_file_ngfactory__["b" /* View_CoreFileComponent_0 */], __WEBPACK_IMPORTED_MODULE_45__components_file_file_ngfactory__["a" /* RenderType_CoreFileComponent */])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](1, 245760, null, 0, __WEBPACK_IMPORTED_MODULE_46__components_file_file__["a" /* CoreFileComponent */], [__WEBPACK_IMPORTED_MODULE_24__providers_sites__["a" /* CoreSitesProvider */], __WEBPACK_IMPORTED_MODULE_20__providers_utils_utils__["a" /* CoreUtilsProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_utils_dom__["a" /* CoreDomUtilsProvider */], __WEBPACK_IMPORTED_MODULE_25__providers_filepool__["a" /* CoreFilepoolProvider */], __WEBPACK_IMPORTED_MODULE_32__providers_app__["a" /* CoreAppProvider */], __WEBPACK_IMPORTED_MODULE_47__providers_file_helper__["a" /* CoreFileHelperProvider */], __WEBPACK_IMPORTED_MODULE_48__providers_utils_mimetype__["a" /* CoreMimetypeUtilsProvider */], __WEBPACK_IMPORTED_MODULE_27__providers_events__["a" /* CoreEventsProvider */], __WEBPACK_IMPORTED_MODULE_19__providers_utils_text__["a" /* CoreTextUtilsProvider */]], { file: [0, "file"], component: [1, "component"], componentId: [2, "componentId"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _v.parent.context.$implicit; var currVal_1 = _co.component; var currVal_2 = _co.componentId; _ck(_v, 1, 0, currVal_0, currVal_1, currVal_2); }, null); }
function View_AddonModWorkshopAssessmentStrategyComponent_13(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 1, "core-local-file", [], null, null, null, __WEBPACK_IMPORTED_MODULE_49__components_local_file_local_file_ngfactory__["b" /* View_CoreLocalFileComponent_0 */], __WEBPACK_IMPORTED_MODULE_49__components_local_file_local_file_ngfactory__["a" /* RenderType_CoreLocalFileComponent */])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](1, 114688, null, 0, __WEBPACK_IMPORTED_MODULE_50__components_local_file_local_file__["a" /* CoreLocalFileComponent */], [__WEBPACK_IMPORTED_MODULE_48__providers_utils_mimetype__["a" /* CoreMimetypeUtilsProvider */], __WEBPACK_IMPORTED_MODULE_20__providers_utils_utils__["a" /* CoreUtilsProvider */], __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_19__providers_utils_text__["a" /* CoreTextUtilsProvider */], __WEBPACK_IMPORTED_MODULE_51__providers_file__["a" /* CoreFileProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_utils_dom__["a" /* CoreDomUtilsProvider */], __WEBPACK_IMPORTED_MODULE_52__providers_utils_time__["a" /* CoreTimeUtilsProvider */]], { file: [0, "file"] }, null)], function (_ck, _v) { var currVal_0 = _v.parent.context.$implicit; _ck(_v, 1, 0, currVal_0); }, null); }
function View_AddonModWorkshopAssessmentStrategyComponent_11(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 9, null, null, null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n                        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n                        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModWorkshopAssessmentStrategyComponent_12)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](4, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_29__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewContainerRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n                        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n                        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModWorkshopAssessmentStrategyComponent_13)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](8, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_29__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewContainerRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n                    "]))], function (_ck, _v) { var currVal_0 = !_v.context.$implicit.name; _ck(_v, 4, 0, currVal_0); var currVal_1 = _v.context.$implicit.name; _ck(_v, 8, 0, currVal_1); }, null); }
function View_AddonModWorkshopAssessmentStrategyComponent_10(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 12, "ion-item", [["class", "item item-block"]], null, null, null, __WEBPACK_IMPORTED_MODULE_10__node_modules_ionic_angular_components_item_item_ngfactory__["b" /* View_Item_0 */], __WEBPACK_IMPORTED_MODULE_10__node_modules_ionic_angular_components_item_item_ngfactory__["a" /* RenderType_Item */])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](1, 1097728, null, 3, __WEBPACK_IMPORTED_MODULE_11_ionic_angular_components_item_item__["a" /* Item */], [__WEBPACK_IMPORTED_MODULE_12_ionic_angular_util_form__["a" /* Form */], __WEBPACK_IMPORTED_MODULE_13_ionic_angular_config_config__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */], [2, __WEBPACK_IMPORTED_MODULE_14_ionic_angular_components_item_item_reorder__["a" /* ItemReorder */]]], null, null), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_52" /* ɵqud */](335544320, 14, { contentLabel: 0 }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_52" /* ɵqud */](603979776, 15, { _buttons: 1 }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_52" /* ɵqud */](603979776, 16, { _icons: 1 }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](5, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_15_ionic_angular_components_item_item_content__["a" /* ItemContent */], [], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](7, 0, null, 2, 4, "div", [["no-lines", ""]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModWorkshopAssessmentStrategyComponent_11)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](10, 802816, null, 0, __WEBPACK_IMPORTED_MODULE_29__angular_common__["j" /* NgForOf */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewContainerRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* TemplateRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 2, ["\n            "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.data.assessment.feedbackattachmentfiles; _ck(_v, 10, 0, currVal_0); }, null); }
function View_AddonModWorkshopAssessmentStrategyComponent_3(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 29, "ion-card", [], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](1, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_53_ionic_angular_components_card_card__["a" /* Card */], [__WEBPACK_IMPORTED_MODULE_13_ionic_angular_config_config__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](3, 0, null, null, 10, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, __WEBPACK_IMPORTED_MODULE_10__node_modules_ionic_angular_components_item_item_ngfactory__["b" /* View_Item_0 */], __WEBPACK_IMPORTED_MODULE_10__node_modules_ionic_angular_components_item_item_ngfactory__["a" /* RenderType_Item */])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](4, 1097728, null, 3, __WEBPACK_IMPORTED_MODULE_11_ionic_angular_components_item_item__["a" /* Item */], [__WEBPACK_IMPORTED_MODULE_12_ionic_angular_util_form__["a" /* Form */], __WEBPACK_IMPORTED_MODULE_13_ionic_angular_config_config__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */], [2, __WEBPACK_IMPORTED_MODULE_14_ionic_angular_components_item_item_reorder__["a" /* ItemReorder */]]], null, null), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_52" /* ɵqud */](335544320, 1, { contentLabel: 0 }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_52" /* ɵqud */](603979776, 2, { _buttons: 1 }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_52" /* ɵqud */](603979776, 3, { _icons: 1 }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](8, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_15_ionic_angular_components_item_item_content__["a" /* ItemContent */], [], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](10, 0, null, 2, 2, "h2", [], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](11, null, ["", ""])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_47" /* ɵpid */](131072, __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core_src_translate_pipe__["a" /* TranslatePipe */], [__WEBPACK_IMPORTED_MODULE_7__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */]]), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 2, ["\n            "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModWorkshopAssessmentStrategyComponent_4)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](16, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_29__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewContainerRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModWorkshopAssessmentStrategyComponent_6)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](19, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_29__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewContainerRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModWorkshopAssessmentStrategyComponent_7)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](22, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_29__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewContainerRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModWorkshopAssessmentStrategyComponent_9)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](25, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_29__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewContainerRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModWorkshopAssessmentStrategyComponent_10)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](28, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_29__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewContainerRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n        "]))], function (_ck, _v) { var _co = _v.component; var currVal_1 = _co.edit; _ck(_v, 16, 0, currVal_1); var currVal_2 = (_co.edit && _co.workshop.overallfeedbackfiles); _ck(_v, 19, 0, currVal_2); var currVal_3 = ((_co.edit && _co.access) && _co.access.canallocate); _ck(_v, 22, 0, currVal_3); var currVal_4 = (!_co.edit && _co.data.assessment.feedbackauthor); _ck(_v, 25, 0, currVal_4); var currVal_5 = (((!_co.edit && _co.workshop.overallfeedbackfiles) && _co.data.assessment.feedbackattachmentfiles) && _co.data.assessment.feedbackattachmentfiles.length); _ck(_v, 28, 0, currVal_5); }, function (_ck, _v) { var currVal_0 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_56" /* ɵunv */](_v, 11, 0, __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 12).transform("addon.mod_workshop.overallfeedback")); _ck(_v, 11, 0, currVal_0); }); }
function View_AddonModWorkshopAssessmentStrategyComponent_0(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 2, "h3", [["padding", ""]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](1, null, ["", ""])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_47" /* ɵpid */](131072, __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core_src_translate_pipe__["a" /* TranslatePipe */], [__WEBPACK_IMPORTED_MODULE_7__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */]]), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](4, 0, null, null, 18, "form", [["name", "mma-mod_workshop-assessment-form"], ["novalidate", ""]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "submit"], [null, "reset"]], function (_v, en, $event) { var ad = true; if (("submit" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 6).onSubmit($event) !== false);
        ad = (pd_0 && ad);
    } if (("reset" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 6).onReset() !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](5, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_40__angular_forms__["w" /* ɵbf */], [], null, null), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](6, 4210688, null, 0, __WEBPACK_IMPORTED_MODULE_40__angular_forms__["p" /* NgForm */], [[8, null], [8, null]], null, null), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_50" /* ɵprd */](2048, null, __WEBPACK_IMPORTED_MODULE_40__angular_forms__["b" /* ControlContainer */], null, [__WEBPACK_IMPORTED_MODULE_40__angular_forms__["p" /* NgForm */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](8, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_40__angular_forms__["o" /* NgControlStatusGroup */], [__WEBPACK_IMPORTED_MODULE_40__angular_forms__["b" /* ControlContainer */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](10, 0, null, null, 11, "core-loading", [], null, null, null, __WEBPACK_IMPORTED_MODULE_54__components_loading_loading_ngfactory__["b" /* View_CoreLoadingComponent_0 */], __WEBPACK_IMPORTED_MODULE_54__components_loading_loading_ngfactory__["a" /* RenderType_CoreLoadingComponent */])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](11, 638976, null, 0, __WEBPACK_IMPORTED_MODULE_55__components_loading_loading__["a" /* CoreLoadingComponent */], [__WEBPACK_IMPORTED_MODULE_7__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_27__providers_events__["a" /* CoreEventsProvider */], __WEBPACK_IMPORTED_MODULE_20__providers_utils_utils__["a" /* CoreUtilsProvider */]], { hideUntil: [0, "hideUntil"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonModWorkshopAssessmentStrategyComponent_1)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](14, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_29__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewContainerRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 0, ["\n\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonModWorkshopAssessmentStrategyComponent_2)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](17, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_29__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewContainerRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 0, ["\n\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonModWorkshopAssessmentStrategyComponent_3)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](20, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_29__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewContainerRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 0, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_8 = _co.assessmentStrategyLoaded; _ck(_v, 11, 0, currVal_8); var currVal_9 = (_co.componentClass && _co.assessmentStrategyLoaded); _ck(_v, 14, 0, currVal_9); var currVal_10 = _co.notSupported; _ck(_v, 17, 0, currVal_10); var currVal_11 = ((_co.assessmentStrategyLoaded && _co.overallFeedkback) && ((_co.edit || _co.data.assessment.feedbackauthor) || (_co.data.assessment.feedbackattachmentfiles && _co.data.assessment.feedbackattachmentfiles.length))); _ck(_v, 20, 0, currVal_11); }, function (_ck, _v) { var currVal_0 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_56" /* ɵunv */](_v, 1, 0, __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 2).transform("addon.mod_workshop.assessmentform")); _ck(_v, 1, 0, currVal_0); var currVal_1 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 8).ngClassUntouched; var currVal_2 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 8).ngClassTouched; var currVal_3 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 8).ngClassPristine; var currVal_4 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 8).ngClassDirty; var currVal_5 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 8).ngClassValid; var currVal_6 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 8).ngClassInvalid; var currVal_7 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 8).ngClassPending; _ck(_v, 4, 0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7); }); }
function View_AddonModWorkshopAssessmentStrategyComponent_Host_0(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 1, "addon-mod-workshop-assessment-strategy", [], null, null, null, View_AddonModWorkshopAssessmentStrategyComponent_0, RenderType_AddonModWorkshopAssessmentStrategyComponent)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](1, 245760, null, 0, __WEBPACK_IMPORTED_MODULE_56__assessment_strategy__["a" /* AddonModWorkshopAssessmentStrategyComponent */], [__WEBPACK_IMPORTED_MODULE_7__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injector */], __WEBPACK_IMPORTED_MODULE_27__providers_events__["a" /* CoreEventsProvider */], __WEBPACK_IMPORTED_MODULE_57__providers_file_session__["a" /* CoreFileSessionProvider */], __WEBPACK_IMPORTED_MODULE_58__providers_sync__["a" /* CoreSyncProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_utils_dom__["a" /* CoreDomUtilsProvider */], __WEBPACK_IMPORTED_MODULE_19__providers_utils_text__["a" /* CoreTextUtilsProvider */], __WEBPACK_IMPORTED_MODULE_20__providers_utils_utils__["a" /* CoreUtilsProvider */], __WEBPACK_IMPORTED_MODULE_24__providers_sites__["a" /* CoreSitesProvider */], __WEBPACK_IMPORTED_MODULE_33__core_fileuploader_providers_fileuploader__["a" /* CoreFileUploaderProvider */], __WEBPACK_IMPORTED_MODULE_59__providers_workshop__["a" /* AddonModWorkshopProvider */], __WEBPACK_IMPORTED_MODULE_60__providers_helper__["a" /* AddonModWorkshopHelperProvider */], __WEBPACK_IMPORTED_MODULE_61__providers_offline__["a" /* AddonModWorkshopOfflineProvider */], __WEBPACK_IMPORTED_MODULE_62__providers_assessment_strategy_delegate__["a" /* AddonWorkshopAssessmentStrategyDelegate */]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var AddonModWorkshopAssessmentStrategyComponentNgFactory = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_27" /* ɵccf */]("addon-mod-workshop-assessment-strategy", __WEBPACK_IMPORTED_MODULE_56__assessment_strategy__["a" /* AddonModWorkshopAssessmentStrategyComponent */], View_AddonModWorkshopAssessmentStrategyComponent_Host_0, { workshop: "workshop", access: "access", assessmentId: "assessmentId", userId: "userId", strategy: "strategy", edit: "edit" }, {}, []);

//# sourceMappingURL=assessment-strategy.ngfactory.js.map

/***/ })

});
//# sourceMappingURL=23.js.map