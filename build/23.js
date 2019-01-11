webpackJsonp([23],{

/***/ 1889:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/@angular/core/esm5/core.js
var core = __webpack_require__(0);

// EXTERNAL MODULE: ./node_modules/ionic-angular/index.js + 3 modules
var ionic_angular = __webpack_require__(8);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/index.js + 1 modules
var _ngx_translate_core = __webpack_require__(3);

// EXTERNAL MODULE: ./src/components/components.module.ts
var components_module = __webpack_require__(28);

// EXTERNAL MODULE: ./src/directives/directives.module.ts + 2 modules
var directives_module = __webpack_require__(29);

// EXTERNAL MODULE: ./src/pipes/pipes.module.ts + 2 modules
var pipes_module = __webpack_require__(105);

// EXTERNAL MODULE: ./src/core/question/components/components.module.ts
var components_components_module = __webpack_require__(1381);

// EXTERNAL MODULE: ./src/providers/utils/dom.ts
var dom = __webpack_require__(4);

// EXTERNAL MODULE: ./src/providers/utils/text.ts
var utils_text = __webpack_require__(10);

// EXTERNAL MODULE: ./src/providers/utils/time.ts
var time = __webpack_require__(24);

// EXTERNAL MODULE: ./src/core/question/providers/helper.ts
var helper = __webpack_require__(122);

// EXTERNAL MODULE: ./src/addon/mod/quiz/providers/quiz.ts
var quiz = __webpack_require__(150);

// EXTERNAL MODULE: ./src/addon/mod/quiz/providers/helper.ts
var providers_helper = __webpack_require__(279);

// CONCATENATED MODULE: ./src/addon/mod/quiz/pages/review/review.ts
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
 * Page that allows reviewing a quiz attempt.
 */
var review_AddonModQuizReviewPage = /** @class */ (function () {
    function AddonModQuizReviewPage(navParams, modalCtrl, translate, domUtils, timeUtils, quizProvider, quizHelper, questionHelper, textUtils) {
        this.translate = translate;
        this.domUtils = domUtils;
        this.timeUtils = timeUtils;
        this.quizProvider = quizProvider;
        this.quizHelper = quizHelper;
        this.questionHelper = questionHelper;
        this.textUtils = textUtils;
        this.component = quiz["a" /* AddonModQuizProvider */].COMPONENT; // Component to link the files to.
        this.quizId = navParams.get('quizId');
        this.courseId = navParams.get('courseId');
        this.attemptId = navParams.get('attemptId');
        this.currentPage = navParams.get('page') || -1;
        this.showAll = this.currentPage == -1;
        // Create the navigation modal.
        this.navigationModal = modalCtrl.create('AddonModQuizNavigationModalPage', {
            isReview: true,
            page: this
        });
    }
    /**
     * Component being initialized.
     */
    AddonModQuizReviewPage.prototype.ngOnInit = function () {
        var _this = this;
        this.fetchData().then(function () {
            _this.quizProvider.logViewAttemptReview(_this.attemptId).catch(function (error) {
                // Ignore errors.
            });
        }).finally(function () {
            _this.loaded = true;
        });
    };
    /**
     * Change the current page. If slot is supplied, try to scroll to that question.
     *
     * @param {number} page Page to load. -1 means all questions in same page.
     * @param {boolean} [fromModal] Whether the page was selected using the navigation modal.
     * @param {number} [slot] Slot of the question to scroll to.
     */
    AddonModQuizReviewPage.prototype.changePage = function (page, fromModal, slot) {
        var _this = this;
        if (typeof slot != 'undefined' && (this.attempt.currentpage == -1 || page == this.currentPage)) {
            // Scrol to a certain question in the current page.
            this.scrollToQuestion(slot);
            return;
        }
        else if (page == this.currentPage) {
            // If the user is navigating to the current page and no question specified, we do nothing.
            return;
        }
        this.loaded = false;
        this.domUtils.scrollToTop(this.content);
        this.loadPage(page).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'addon.mod_quiz.errorgetquestions', true);
        }).finally(function () {
            _this.loaded = true;
            if (typeof slot != 'undefined') {
                // Scroll to the question. Give some time to the questions to render.
                setTimeout(function () {
                    _this.scrollToQuestion(slot);
                }, 2000);
            }
        });
    };
    /**
     * Convenience function to get the quiz data.
     *
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonModQuizReviewPage.prototype.fetchData = function () {
        var _this = this;
        return this.quizProvider.getQuizById(this.courseId, this.quizId).then(function (quizData) {
            _this.quiz = quizData;
            _this.componentId = _this.quiz.coursemodule;
            return _this.quizProvider.getCombinedReviewOptions(_this.quizId).then(function (result) {
                _this.options = result;
                // Load the navigation data.
                return _this.loadNavigation().then(function () {
                    // Load questions.
                    return _this.loadPage(_this.currentPage);
                });
            });
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'addon.mod_quiz.errorgetquiz', true);
        });
    };
    /**
     * Load a page questions.
     *
     * @param {number} page The page to load.
     * @return {Promise<void>} Promise resolved when done.
     */
    AddonModQuizReviewPage.prototype.loadPage = function (page) {
        var _this = this;
        return this.quizProvider.getAttemptReview(this.attemptId, page).then(function (data) {
            _this.attempt = data.attempt;
            _this.attempt.currentpage = page;
            _this.currentPage = page;
            // Set the summary data.
            _this.setSummaryCalculatedData(data);
            _this.questions = data.questions;
            _this.nextPage = page == -1 ? undefined : page + 1;
            _this.previousPage = page - 1;
            _this.questions.forEach(function (question) {
                // Get the readable mark for each question.
                question.readableMark = _this.quizHelper.getQuestionMarkFromHtml(question.html);
                // Extract the question info box.
                _this.questionHelper.extractQuestionInfoBox(question, '.info');
                // Set the preferred behaviour.
                question.preferredBehaviour = _this.quiz.preferredbehaviour;
            });
        });
    };
    /**
     * Load data to navigate the questions using the navigation modal.
     *
     * @return {Promise<void>} Promise resolved when done.
     */
    AddonModQuizReviewPage.prototype.loadNavigation = function () {
        var _this = this;
        // Get all questions in single page to retrieve all the questions.
        return this.quizProvider.getAttemptReview(this.attemptId, -1).then(function (data) {
            var lastQuestion = data.questions[data.questions.length - 1];
            data.questions.forEach(function (question) {
                question.stateClass = _this.questionHelper.getQuestionStateClass(question.state);
            });
            _this.navigation = data.questions;
            _this.numPages = lastQuestion ? lastQuestion.page + 1 : 0;
        });
    };
    /**
     * Refreshes data.
     *
     * @param {any} refresher Refresher
     */
    AddonModQuizReviewPage.prototype.refreshData = function (refresher) {
        var _this = this;
        var promises = [];
        promises.push(this.quizProvider.invalidateQuizData(this.courseId));
        promises.push(this.quizProvider.invalidateCombinedReviewOptionsForUser(this.quizId));
        promises.push(this.quizProvider.invalidateAttemptReview(this.attemptId));
        Promise.all(promises).finally(function () {
            return _this.fetchData();
        }).finally(function () {
            refresher.complete();
        });
    };
    /**
     * Scroll to a certain question.
     *
     * @param {number} slot Slot of the question to scroll to.
     */
    AddonModQuizReviewPage.prototype.scrollToQuestion = function (slot) {
        this.domUtils.scrollToElementBySelector(this.content, '#addon-mod_quiz-question-' + slot);
    };
    /**
     * Calculate review summary data.
     *
     * @param {any} data Result of getAttemptReview.
     */
    AddonModQuizReviewPage.prototype.setSummaryCalculatedData = function (data) {
        var _this = this;
        this.attempt.readableState = this.quizProvider.getAttemptReadableStateName(this.attempt.state);
        if (this.attempt.state == quiz["a" /* AddonModQuizProvider */].ATTEMPT_FINISHED) {
            this.showCompleted = true;
            this.additionalData = data.additionaldata;
            var timeTaken = this.attempt.timefinish - this.attempt.timestart;
            if (timeTaken) {
                // Format time taken.
                this.attempt.timeTaken = this.timeUtils.formatTime(timeTaken);
                // Calculate overdue time.
                if (this.quiz.timelimit && timeTaken > this.quiz.timelimit + 60) {
                    this.attempt.overTime = this.timeUtils.formatTime(timeTaken - this.quiz.timelimit);
                }
            }
            // Treat grade.
            if (this.options.someoptions.marks >= quiz["a" /* AddonModQuizProvider */].QUESTION_OPTIONS_MARK_AND_MAX &&
                this.quizProvider.quizHasGrades(this.quiz)) {
                if (data.grade === null || typeof data.grade == 'undefined') {
                    this.attempt.readableGrade = this.quizProvider.formatGrade(data.grade, this.quiz.decimalpoints);
                }
                else {
                    // Show raw marks only if they are different from the grade (like on the entry page).
                    if (this.quiz.grade != this.quiz.sumgrades) {
                        this.attempt.readableMark = this.translate.instant('addon.mod_quiz.outofshort', { $a: {
                                grade: this.quizProvider.formatGrade(this.attempt.sumgrades, this.quiz.decimalpoints),
                                maxgrade: this.quizProvider.formatGrade(this.quiz.sumgrades, this.quiz.decimalpoints)
                            } });
                    }
                    // Now the scaled grade.
                    var gradeObject = {
                        grade: this.quizProvider.formatGrade(data.grade, this.quiz.decimalpoints),
                        maxgrade: this.quizProvider.formatGrade(this.quiz.grade, this.quiz.decimalpoints)
                    };
                    if (this.quiz.grade != 100) {
                        gradeObject.percent = this.textUtils.roundToDecimals(this.attempt.sumgrades * 100 / this.quiz.sumgrades, 0);
                        this.attempt.readableGrade = this.translate.instant('addon.mod_quiz.outofpercent', { $a: gradeObject });
                    }
                    else {
                        this.attempt.readableGrade = this.translate.instant('addon.mod_quiz.outof', { $a: gradeObject });
                    }
                }
            }
            // Treat additional data.
            this.additionalData.forEach(function (data) {
                // Remove help links from additional data.
                data.content = _this.domUtils.removeElementFromHtml(data.content, '.helptooltip');
            });
        }
    };
    /**
     * Switch mode: all questions in same page OR one page at a time.
     */
    AddonModQuizReviewPage.prototype.switchMode = function () {
        this.showAll = !this.showAll;
        // Load all questions or first page, depending on the mode.
        this.loadPage(this.showAll ? -1 : 0);
    };
    __decorate([
        Object(core["_9" /* ViewChild */])(ionic_angular["f" /* Content */]),
        __metadata("design:type", ionic_angular["f" /* Content */])
    ], AddonModQuizReviewPage.prototype, "content", void 0);
    AddonModQuizReviewPage = __decorate([
        Object(core["m" /* Component */])({
            selector: 'page-addon-mod-quiz-review',
            templateUrl: 'review.html',
        }),
        __metadata("design:paramtypes", [ionic_angular["t" /* NavParams */], ionic_angular["q" /* ModalController */], _ngx_translate_core["c" /* TranslateService */],
            dom["a" /* CoreDomUtilsProvider */], time["a" /* CoreTimeUtilsProvider */],
            quiz["a" /* AddonModQuizProvider */], providers_helper["a" /* AddonModQuizHelperProvider */],
            helper["a" /* CoreQuestionHelperProvider */], utils_text["a" /* CoreTextUtilsProvider */]])
    ], AddonModQuizReviewPage);
    return AddonModQuizReviewPage;
}());

//# sourceMappingURL=review.js.map
// CONCATENATED MODULE: ./src/addon/mod/quiz/pages/review/review.module.ts
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
var review_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var review_module_AddonModQuizReviewPageModule = /** @class */ (function () {
    function AddonModQuizReviewPageModule() {
    }
    AddonModQuizReviewPageModule = review_module___decorate([
        Object(core["I" /* NgModule */])({
            declarations: [
                review_AddonModQuizReviewPage,
            ],
            imports: [
                components_module["a" /* CoreComponentsModule */],
                directives_module["a" /* CoreDirectivesModule */],
                pipes_module["a" /* CorePipesModule */],
                components_components_module["a" /* CoreQuestionComponentsModule */],
                ionic_angular["l" /* IonicPageModule */].forChild(review_AddonModQuizReviewPage),
                _ngx_translate_core["b" /* TranslateModule */].forChild()
            ],
        })
    ], AddonModQuizReviewPageModule);
    return AddonModQuizReviewPageModule;
}());

//# sourceMappingURL=review.module.js.map
// EXTERNAL MODULE: ./node_modules/ionic-angular/components/action-sheet/action-sheet-component.ngfactory.js
var action_sheet_component_ngfactory = __webpack_require__(1345);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/alert/alert-component.ngfactory.js
var alert_component_ngfactory = __webpack_require__(1346);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/app/app-root.ngfactory.js
var app_root_ngfactory = __webpack_require__(1347);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/loading/loading-component.ngfactory.js
var loading_component_ngfactory = __webpack_require__(1348);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/modal/modal-component.ngfactory.js
var modal_component_ngfactory = __webpack_require__(1349);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/picker/picker-component.ngfactory.js + 1 modules
var picker_component_ngfactory = __webpack_require__(1350);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/popover/popover-component.ngfactory.js
var popover_component_ngfactory = __webpack_require__(1351);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/select/select-popover-component.ngfactory.js
var select_popover_component_ngfactory = __webpack_require__(1352);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toast/toast-component.ngfactory.js
var toast_component_ngfactory = __webpack_require__(1353);

// EXTERNAL MODULE: ./src/components/context-menu/context-menu-popover.ngfactory.js
var context_menu_popover_ngfactory = __webpack_require__(1356);

// EXTERNAL MODULE: ./src/components/course-picker-menu/course-picker-menu-popover.ngfactory.js
var course_picker_menu_popover_ngfactory = __webpack_require__(1357);

// EXTERNAL MODULE: ./src/components/recaptcha/recaptchamodal.ngfactory.js
var recaptchamodal_ngfactory = __webpack_require__(1358);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.ngfactory.js
var button_ngfactory = __webpack_require__(45);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.js
var button_button = __webpack_require__(42);

// EXTERNAL MODULE: ./node_modules/ionic-angular/config/config.js
var config = __webpack_require__(6);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.pipe.js
var translate_pipe = __webpack_require__(26);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.service.js
var translate_service = __webpack_require__(18);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/icon/icon.js
var icon = __webpack_require__(46);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item.ngfactory.js + 1 modules
var item_ngfactory = __webpack_require__(30);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item.js
var item = __webpack_require__(20);

// EXTERNAL MODULE: ./node_modules/ionic-angular/util/form.js
var util_form = __webpack_require__(19);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-reorder.js + 1 modules
var item_reorder = __webpack_require__(27);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-content.js
var item_content = __webpack_require__(32);

// EXTERNAL MODULE: ./src/directives/format-text.ts
var format_text = __webpack_require__(41);

// EXTERNAL MODULE: ./src/providers/sites.ts
var sites = __webpack_require__(1);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/platform.js + 1 modules
var platform = __webpack_require__(14);

// EXTERNAL MODULE: ./src/providers/utils/utils.ts
var utils = __webpack_require__(2);

// EXTERNAL MODULE: ./src/providers/utils/url.ts
var url = __webpack_require__(25);

// EXTERNAL MODULE: ./src/providers/logger.ts
var logger = __webpack_require__(5);

// EXTERNAL MODULE: ./src/providers/filepool.ts
var filepool = __webpack_require__(16);

// EXTERNAL MODULE: ./src/providers/app.ts
var app = __webpack_require__(9);

// EXTERNAL MODULE: ./src/core/contentlinks/providers/helper.ts
var contentlinks_providers_helper = __webpack_require__(17);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-controller.js
var nav_controller = __webpack_require__(21);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.js
var content = __webpack_require__(23);

// EXTERNAL MODULE: ./src/components/split-view/split-view.ts
var split_view = __webpack_require__(34);

// EXTERNAL MODULE: ./src/providers/utils/iframe.ts
var iframe = __webpack_require__(37);

// EXTERNAL MODULE: ./src/providers/events.ts
var events = __webpack_require__(12);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/card/card.js
var card = __webpack_require__(86);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/card/card-header.js
var card_header = __webpack_require__(281);

// EXTERNAL MODULE: ./node_modules/@angular/common/esm5/common.js
var common = __webpack_require__(7);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/list/list.js + 1 modules
var list = __webpack_require__(77);

// EXTERNAL MODULE: ./node_modules/ionic-angular/gestures/gesture-controller.js
var gesture_controller = __webpack_require__(38);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/dom-controller.js
var dom_controller = __webpack_require__(31);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/note/note.js
var note = __webpack_require__(225);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-divider.js
var item_divider = __webpack_require__(107);

// EXTERNAL MODULE: ./src/core/question/components/question/question.ngfactory.js
var question_ngfactory = __webpack_require__(1968);

// EXTERNAL MODULE: ./src/core/question/components/question/question.ts
var question = __webpack_require__(1382);

// EXTERNAL MODULE: ./src/core/question/providers/delegate.ts
var delegate = __webpack_require__(70);

// EXTERNAL MODULE: ./src/core/question/providers/behaviour-delegate.ts
var behaviour_delegate = __webpack_require__(115);

// EXTERNAL MODULE: ./src/core/question/providers/question.ts
var providers_question = __webpack_require__(116);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/grid/row.js
var row = __webpack_require__(113);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/grid/col.js
var col = __webpack_require__(112);

// EXTERNAL MODULE: ./src/pipes/format-date.ts
var format_date = __webpack_require__(223);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-header.js
var toolbar_header = __webpack_require__(435);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/view-controller.js
var view_controller = __webpack_require__(36);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/navbar.ngfactory.js
var navbar_ngfactory = __webpack_require__(1354);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/navbar.js
var navbar = __webpack_require__(200);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/app/app.js + 3 modules
var app_app = __webpack_require__(33);

// EXTERNAL MODULE: ./src/directives/back-button.ts
var back_button = __webpack_require__(663);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.ngfactory.js
var toolbar_title_ngfactory = __webpack_require__(1355);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.js
var toolbar_title = __webpack_require__(337);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar.js
var toolbar = __webpack_require__(247);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-item.js
var toolbar_item = __webpack_require__(436);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.ngfactory.js
var content_ngfactory = __webpack_require__(185);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/keyboard.js
var keyboard = __webpack_require__(106);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/refresher/refresher.js
var refresher = __webpack_require__(144);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/refresher/refresher-content.ngfactory.js
var refresher_content_ngfactory = __webpack_require__(201);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/refresher/refresher-content.js
var refresher_content = __webpack_require__(158);

// EXTERNAL MODULE: ./src/components/loading/loading.ngfactory.js
var loading_ngfactory = __webpack_require__(48);

// EXTERNAL MODULE: ./src/components/loading/loading.ts
var loading = __webpack_require__(47);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-params.js
var nav_params = __webpack_require__(60);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/modal/modal-controller.js
var modal_controller = __webpack_require__(204);

// CONCATENATED MODULE: ./src/addon/mod/quiz/pages/review/review.ngfactory.js
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 




































































var styles_AddonModQuizReviewPage = [];
var RenderType_AddonModQuizReviewPage = core["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_AddonModQuizReviewPage, data: {} });

function View_AddonModQuizReviewPage_1(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 6, "button", [["icon-only", ""], ["ion-button", ""]], [[1, "aria-label", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.navigationModal.present() !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](1, 1097728, [[2, 4]], 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                "])), (_l()(), core["_31" /* ɵeld */](4, 0, null, 0, 1, "ion-icon", [["name", "bookmark"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](5, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n            "]))], function (_ck, _v) { var currVal_2 = "bookmark"; _ck(_v, 5, 0, currVal_2); }, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 0, 0, core["_44" /* ɵnov */](_v, 2).transform("addon.mod_quiz.opentoc")); _ck(_v, 0, 0, currVal_0); var currVal_1 = core["_44" /* ɵnov */](_v, 5)._hidden; _ck(_v, 4, 0, currVal_1); }); }
function View_AddonModQuizReviewPage_3(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "h2", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](1, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], null, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 1, 0, core["_44" /* ɵnov */](_v, 2).transform("addon.mod_quiz.reviewofpreview")); _ck(_v, 1, 0, currVal_0); }); }
function View_AddonModQuizReviewPage_4(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 3, "h2", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](1, null, ["", ""])), core["_48" /* ɵpod */](2, { $a: 0 }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = core["_56" /* ɵunv */](_v, 1, 0, core["_44" /* ɵnov */](_v, 3).transform("addon.mod_quiz.reviewofattempt", _ck(_v, 2, 0, _co.attempt.attempt))); _ck(_v, 1, 0, currVal_0); }); }
function View_AddonModQuizReviewPage_5(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 14, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 9, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 10, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 11, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 2, 2, "p", [["class", "item-heading"]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](8, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](11, 0, null, 2, 2, "p", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](12, null, ["", ""])), core["_49" /* ɵppd */](13, 1), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = core["_56" /* ɵunv */](_v, 8, 0, core["_44" /* ɵnov */](_v, 9).transform("addon.mod_quiz.completedon")); _ck(_v, 8, 0, currVal_0); var currVal_1 = core["_56" /* ɵunv */](_v, 12, 0, _ck(_v, 13, 0, core["_44" /* ɵnov */](_v.parent.parent, 0), (_co.attempt.timefinish * 1000))); _ck(_v, 12, 0, currVal_1); }); }
function View_AddonModQuizReviewPage_6(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 13, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 12, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 13, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 14, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 2, 2, "p", [["class", "item-heading"]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](8, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](11, 0, null, 2, 1, "p", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](12, null, ["", ""])), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = core["_56" /* ɵunv */](_v, 8, 0, core["_44" /* ɵnov */](_v, 9).transform("addon.mod_quiz.timetaken")); _ck(_v, 8, 0, currVal_0); var currVal_1 = _co.attempt.timeTaken; _ck(_v, 12, 0, currVal_1); }); }
function View_AddonModQuizReviewPage_7(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 13, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 15, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 16, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 17, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 2, 2, "p", [["class", "item-heading"]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](8, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](11, 0, null, 2, 1, "p", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](12, null, ["", ""])), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = core["_56" /* ɵunv */](_v, 8, 0, core["_44" /* ɵnov */](_v, 9).transform("addon.mod_quiz.overdue")); _ck(_v, 8, 0, currVal_0); var currVal_1 = _co.attempt.overTime; _ck(_v, 12, 0, currVal_1); }); }
function View_AddonModQuizReviewPage_8(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 14, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 18, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 19, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 20, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 2, 2, "p", [["class", "item-heading"]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](8, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](11, 0, null, 2, 2, "p", [], null, null, null, null, null)), (_l()(), core["_31" /* ɵeld */](12, 0, null, null, 1, "core-format-text", [], null, null, null, null, null)), core["_30" /* ɵdid */](13, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform["a" /* Platform */], utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], app["a" /* CoreAppProvider */], contentlinks_providers_helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */]], { text: [0, "text"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "]))], function (_ck, _v) { var _co = _v.component; var currVal_1 = _co.attempt.readableMark; _ck(_v, 13, 0, currVal_1); }, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 8, 0, core["_44" /* ɵnov */](_v, 9).transform("addon.mod_quiz.marks")); _ck(_v, 8, 0, currVal_0); }); }
function View_AddonModQuizReviewPage_9(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 13, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 21, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 22, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 23, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 2, 2, "p", [["class", "item-heading"]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](8, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](11, 0, null, 2, 1, "p", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](12, null, ["", ""])), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = core["_56" /* ɵunv */](_v, 8, 0, core["_44" /* ɵnov */](_v, 9).transform("addon.mod_quiz.grade")); _ck(_v, 8, 0, currVal_0); var currVal_1 = _co.attempt.readableGrade; _ck(_v, 12, 0, currVal_1); }); }
function View_AddonModQuizReviewPage_10(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 12, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 24, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 25, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 26, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 2, 1, "p", [["class", "item-heading"]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](8, null, ["", ""])), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](10, 0, null, 2, 1, "core-format-text", [], null, null, null, null, null)), core["_30" /* ɵdid */](11, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform["a" /* Platform */], utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], app["a" /* CoreAppProvider */], contentlinks_providers_helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */]], { text: [0, "text"], component: [1, "component"], componentId: [2, "componentId"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "]))], function (_ck, _v) { var _co = _v.component; var currVal_1 = _v.context.$implicit.content; var currVal_2 = _co.component; var currVal_3 = _co.componentId; _ck(_v, 11, 0, currVal_1, currVal_2, currVal_3); }, function (_ck, _v) { var currVal_0 = _v.context.$implicit.title; _ck(_v, 8, 0, currVal_0); }); }
function View_AddonModQuizReviewPage_2(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 65, "ion-card", [], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, card["a" /* Card */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 8, "ion-card-header", [["text-wrap", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](4, 16384, null, 0, card_header["a" /* CardHeader */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModQuizReviewPage_3)), core["_30" /* ɵdid */](7, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModQuizReviewPage_4)), core["_30" /* ɵdid */](10, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](13, 0, null, null, 51, "ion-list", [], null, null, null, null, null)), core["_30" /* ɵdid */](14, 16384, null, 0, list["a" /* List */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], platform["a" /* Platform */], gesture_controller["l" /* GestureController */], dom_controller["a" /* DomController */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ɵeld */](16, 0, null, null, 14, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](17, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 3, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 4, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 5, { _icons: 1 }), core["_30" /* ɵdid */](21, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](23, 0, null, 2, 2, "p", [["class", "item-heading"]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](24, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](27, 0, null, 2, 2, "p", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](28, null, ["", ""])), core["_49" /* ɵppd */](29, 1), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ɵeld */](32, 0, null, null, 13, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](33, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 6, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 7, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 8, { _icons: 1 }), core["_30" /* ɵdid */](37, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](39, 0, null, 2, 2, "p", [["class", "item-heading"]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](40, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](43, 0, null, 2, 1, "p", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](44, null, ["", ""])), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModQuizReviewPage_5)), core["_30" /* ɵdid */](48, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModQuizReviewPage_6)), core["_30" /* ɵdid */](51, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModQuizReviewPage_7)), core["_30" /* ɵdid */](54, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModQuizReviewPage_8)), core["_30" /* ɵdid */](57, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModQuizReviewPage_9)), core["_30" /* ɵdid */](60, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModQuizReviewPage_10)), core["_30" /* ɵdid */](63, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.attempt.preview; _ck(_v, 7, 0, currVal_0); var currVal_1 = !_co.attempt.preview; _ck(_v, 10, 0, currVal_1); var currVal_6 = _co.showCompleted; _ck(_v, 48, 0, currVal_6); var currVal_7 = _co.attempt.timeTaken; _ck(_v, 51, 0, currVal_7); var currVal_8 = _co.attempt.overTime; _ck(_v, 54, 0, currVal_8); var currVal_9 = _co.attempt.readableMark; _ck(_v, 57, 0, currVal_9); var currVal_10 = _co.attempt.readableGrade; _ck(_v, 60, 0, currVal_10); var currVal_11 = _co.additionalData; _ck(_v, 63, 0, currVal_11); }, function (_ck, _v) { var _co = _v.component; var currVal_2 = core["_56" /* ɵunv */](_v, 24, 0, core["_44" /* ɵnov */](_v, 25).transform("addon.mod_quiz.startedon")); _ck(_v, 24, 0, currVal_2); var currVal_3 = core["_56" /* ɵunv */](_v, 28, 0, _ck(_v, 29, 0, core["_44" /* ɵnov */](_v.parent, 0), (_co.attempt.timestart * 1000))); _ck(_v, 28, 0, currVal_3); var currVal_4 = core["_56" /* ɵunv */](_v, 40, 0, core["_44" /* ɵnov */](_v, 41).transform("addon.mod_quiz.attemptstate")); _ck(_v, 40, 0, currVal_4); var currVal_5 = _co.attempt.readableState; _ck(_v, 44, 0, currVal_5); }); }
function View_AddonModQuizReviewPage_12(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 0, null, null, null, null, null, null, null))], null, null); }
function View_AddonModQuizReviewPage_14(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 3, "h2", [["class", "inline"]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](1, null, ["", ""])), core["_48" /* ɵpod */](2, { $a: 0 }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], null, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 1, 0, core["_44" /* ɵnov */](_v, 3).transform("core.question.questionno", _ck(_v, 2, 0, _v.parent.context.$implicit.number))); _ck(_v, 1, 0, currVal_0); }); }
function View_AddonModQuizReviewPage_15(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "h2", [["class", "inline"]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](1, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], null, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 1, 0, core["_44" /* ɵnov */](_v, 2).transform("core.question.information")); _ck(_v, 1, 0, currVal_0); }); }
function View_AddonModQuizReviewPage_17(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "p", [["class", "block"]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](1, null, ["", ""]))], null, function (_ck, _v) { var currVal_0 = _v.parent.parent.context.$implicit.status; _ck(_v, 1, 0, currVal_0); }); }
function View_AddonModQuizReviewPage_18(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "p", [], null, null, null, null, null)), (_l()(), core["_31" /* ɵeld */](1, 0, null, null, 1, "core-format-text", [], null, null, null, null, null)), core["_30" /* ɵdid */](2, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform["a" /* Platform */], utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], app["a" /* CoreAppProvider */], contentlinks_providers_helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */]], { text: [0, "text"] }, null)], function (_ck, _v) { var currVal_0 = _v.parent.parent.context.$implicit.readableMark; _ck(_v, 2, 0, currVal_0); }, null); }
function View_AddonModQuizReviewPage_16(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 8, "ion-note", [["item-end", ""], ["text-wrap", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, note["a" /* Note */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModQuizReviewPage_17)), core["_30" /* ɵdid */](4, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModQuizReviewPage_18)), core["_30" /* ɵdid */](7, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "]))], function (_ck, _v) { var currVal_0 = _v.parent.context.$implicit.status; _ck(_v, 4, 0, currVal_0); var currVal_1 = _v.parent.context.$implicit.readableMark; _ck(_v, 7, 0, currVal_1); }, null); }
function View_AddonModQuizReviewPage_13(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 27, "div", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ɵeld */](2, 0, null, null, 24, "ion-card", [], [[8, "id", 0]], null, null, null, null)), core["_30" /* ɵdid */](3, 16384, null, 0, card["a" /* Card */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](6, 0, null, null, 15, "ion-item-divider", [["class", "item item-divider"]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](7, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 27, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 28, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 29, { _icons: 1 }), core["_30" /* ɵdid */](11, 16384, null, 0, item_divider["a" /* ItemDivider */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 2, 1, null, View_AddonModQuizReviewPage_14)), core["_30" /* ɵdid */](14, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 2, 1, null, View_AddonModQuizReviewPage_15)), core["_30" /* ɵdid */](17, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 4, 1, null, View_AddonModQuizReviewPage_16)), core["_30" /* ɵdid */](20, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](24, 0, null, null, 1, "core-question", [["text-wrap", ""]], null, null, null, question_ngfactory["b" /* View_CoreQuestionComponent_0 */], question_ngfactory["a" /* RenderType_CoreQuestionComponent */])), core["_30" /* ɵdid */](25, 114688, null, 0, question["a" /* CoreQuestionComponent */], [logger["a" /* CoreLoggerProvider */], core["C" /* Injector */], delegate["a" /* CoreQuestionDelegate */], utils["a" /* CoreUtilsProvider */], behaviour_delegate["a" /* CoreQuestionBehaviourDelegate */], helper["a" /* CoreQuestionHelperProvider */], translate_service["a" /* TranslateService */], providers_question["a" /* CoreQuestionProvider */], dom["a" /* CoreDomUtilsProvider */]], { question: [0, "question"], component: [1, "component"], componentId: [2, "componentId"], attemptId: [3, "attemptId"], offlineEnabled: [4, "offlineEnabled"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "]))], function (_ck, _v) { var _co = _v.component; var currVal_1 = _v.context.$implicit.number; _ck(_v, 14, 0, currVal_1); var currVal_2 = !_v.context.$implicit.number; _ck(_v, 17, 0, currVal_2); var currVal_3 = (_v.context.$implicit.status || _v.context.$implicit.readableMark); _ck(_v, 20, 0, currVal_3); var currVal_4 = _v.context.$implicit; var currVal_5 = _co.component; var currVal_6 = _co.componentId; var currVal_7 = _co.attempt.id; var currVal_8 = false; _ck(_v, 25, 0, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8); }, function (_ck, _v) { var currVal_0 = core["_34" /* ɵinlineInterpolate */](1, "addon-mod_quiz-question-", _v.context.$implicit.slot, ""); _ck(_v, 2, 0, currVal_0); }); }
function View_AddonModQuizReviewPage_19(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 0, null, null, null, null, null, null, null))], null, null); }
function View_AddonModQuizReviewPage_11(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 13, "div", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModQuizReviewPage_12)), core["_30" /* ɵdid */](4, 540672, null, 0, common["r" /* NgTemplateOutlet */], [core["_11" /* ViewContainerRef */]], { ngTemplateOutlet: [0, "ngTemplateOutlet"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModQuizReviewPage_13)), core["_30" /* ɵdid */](8, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModQuizReviewPage_19)), core["_30" /* ɵdid */](12, 540672, null, 0, common["r" /* NgTemplateOutlet */], [core["_11" /* ViewContainerRef */]], { ngTemplateOutlet: [0, "ngTemplateOutlet"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = core["_44" /* ɵnov */](_v.parent, 49); _ck(_v, 4, 0, currVal_0); var currVal_1 = _co.questions; _ck(_v, 8, 0, currVal_1); var currVal_2 = core["_44" /* ɵnov */](_v.parent, 49); _ck(_v, 12, 0, currVal_2); }, null); }
function View_AddonModQuizReviewPage_21(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 6, "a", [["color", "light"], ["icon-only", ""], ["ion-button", ""]], [[8, "title", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.changePage(_co.previousPage) !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](1, 1097728, null, 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { color: [0, "color"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                "])), (_l()(), core["_31" /* ɵeld */](4, 0, null, 0, 1, "ion-icon", [["md", "ios-arrow-back"], ["name", "arrow-back"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](5, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"], md: [1, "md"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n            "]))], function (_ck, _v) { var currVal_1 = "light"; _ck(_v, 1, 0, currVal_1); var currVal_3 = "arrow-back"; var currVal_4 = "ios-arrow-back"; _ck(_v, 5, 0, currVal_3, currVal_4); }, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 0, 0, core["_44" /* ɵnov */](_v, 2).transform("core.previous")); _ck(_v, 0, 0, currVal_0); var currVal_2 = core["_44" /* ɵnov */](_v, 5)._hidden; _ck(_v, 4, 0, currVal_2); }); }
function View_AddonModQuizReviewPage_22(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 6, "a", [["color", "light"], ["icon-only", ""], ["ion-button", ""]], [[8, "title", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.changePage(_co.nextPage) !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](1, 1097728, null, 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { color: [0, "color"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                "])), (_l()(), core["_31" /* ɵeld */](4, 0, null, 0, 1, "ion-icon", [["md", "ios-arrow-forward"], ["name", "arrow-forward"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](5, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"], md: [1, "md"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n            "]))], function (_ck, _v) { var currVal_1 = "light"; _ck(_v, 1, 0, currVal_1); var currVal_3 = "arrow-forward"; var currVal_4 = "ios-arrow-forward"; _ck(_v, 5, 0, currVal_3, currVal_4); }, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 0, 0, core["_44" /* ɵnov */](_v, 2).transform("core.next")); _ck(_v, 0, 0, currVal_0); var currVal_2 = core["_44" /* ɵnov */](_v, 5)._hidden; _ck(_v, 4, 0, currVal_2); }); }
function View_AddonModQuizReviewPage_20(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_31" /* ɵeld */](1, 0, null, null, 16, "ion-row", [["align-items-center", ""], ["class", "row"]], null, null, null, null, null)), core["_30" /* ɵdid */](2, 16384, null, 0, row["a" /* Row */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_31" /* ɵeld */](4, 0, null, null, 5, "ion-col", [["class", "col"], ["text-start", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](5, 16384, null, 0, col["a" /* Col */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModQuizReviewPage_21)), core["_30" /* ɵdid */](8, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_31" /* ɵeld */](11, 0, null, null, 5, "ion-col", [["class", "col"], ["text-end", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](12, 16384, null, 0, col["a" /* Col */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModQuizReviewPage_22)), core["_30" /* ɵdid */](15, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = (_co.previousPage >= 0); _ck(_v, 8, 0, currVal_0); var currVal_1 = (_co.nextPage >= (0 - 1)); _ck(_v, 15, 0, currVal_1); }, null); }
function View_AddonModQuizReviewPage_0(_l) { return core["_57" /* ɵvid */](0, [core["_47" /* ɵpid */](0, format_date["a" /* CoreFormatDatePipe */], [logger["a" /* CoreLoggerProvider */], time["a" /* CoreTimeUtilsProvider */]]), core["_52" /* ɵqud */](402653184, 1, { content: 0 }), (_l()(), core["_31" /* ɵeld */](2, 0, null, null, 20, "ion-header", [], null, null, null, null, null)), core["_30" /* ɵdid */](3, 16384, null, 0, toolbar_header["a" /* Header */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, view_controller["a" /* ViewController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_31" /* ɵeld */](5, 0, null, null, 16, "ion-navbar", [["class", "toolbar"], ["core-back-button", ""]], [[8, "hidden", 0], [2, "statusbar-padding", null]], null, null, navbar_ngfactory["b" /* View_Navbar_0 */], navbar_ngfactory["a" /* RenderType_Navbar */])), core["_30" /* ɵdid */](6, 49152, null, 0, navbar["a" /* Navbar */], [app_app["a" /* App */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_30" /* ɵdid */](7, 212992, null, 0, back_button["a" /* CoreBackButtonDirective */], [navbar["a" /* Navbar */], platform["a" /* Platform */], translate_service["a" /* TranslateService */], events["a" /* CoreEventsProvider */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n        "])), (_l()(), core["_31" /* ɵeld */](9, 0, null, 3, 3, "ion-title", [], null, null, null, toolbar_title_ngfactory["b" /* View_ToolbarTitle_0 */], toolbar_title_ngfactory["a" /* RenderType_ToolbarTitle */])), core["_30" /* ɵdid */](10, 49152, null, 0, toolbar_title["a" /* ToolbarTitle */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), (_l()(), core["_55" /* ɵted */](11, 0, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n\n        "])), (_l()(), core["_31" /* ɵeld */](14, 0, null, 2, 6, "ion-buttons", [["end", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](15, 16384, null, 1, toolbar_item["a" /* ToolbarItem */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), core["_52" /* ɵqud */](603979776, 2, { _buttons: 1 }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModQuizReviewPage_1)), core["_30" /* ɵdid */](19, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_31" /* ɵeld */](24, 0, null, null, 22, "ion-content", [], [[2, "statusbar-padding", null], [2, "has-refresher", null]], null, null, content_ngfactory["b" /* View_Content_0 */], content_ngfactory["a" /* RenderType_Content */])), core["_30" /* ɵdid */](25, 4374528, [[1, 4]], 0, content["a" /* Content */], [config["a" /* Config */], platform["a" /* Platform */], dom_controller["a" /* DomController */], core["t" /* ElementRef */], core["V" /* Renderer */], app_app["a" /* App */], keyboard["a" /* Keyboard */], core["M" /* NgZone */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n    "])), (_l()(), core["_31" /* ɵeld */](27, 0, null, 2, 6, "ion-refresher", [], [[2, "refresher-active", null], [4, "top", null]], [[null, "ionRefresh"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("ionRefresh" === en)) {
        var pd_0 = (_co.refreshData($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), core["_30" /* ɵdid */](28, 212992, null, 0, refresher["a" /* Refresher */], [platform["a" /* Platform */], content["a" /* Content */], core["M" /* NgZone */], gesture_controller["l" /* GestureController */]], { enabled: [0, "enabled"] }, { ionRefresh: "ionRefresh" }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_31" /* ɵeld */](30, 0, null, null, 2, "ion-refresher-content", [], [[1, "state", 0]], null, null, refresher_content_ngfactory["b" /* View_RefresherContent_0 */], refresher_content_ngfactory["a" /* RenderType_RefresherContent */])), core["_30" /* ɵdid */](31, 114688, null, 0, refresher_content["a" /* RefresherContent */], [refresher["a" /* Refresher */], config["a" /* Config */]], { pullingText: [0, "pullingText"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n    "])), (_l()(), core["_31" /* ɵeld */](35, 0, null, 1, 10, "core-loading", [], null, null, null, loading_ngfactory["b" /* View_CoreLoadingComponent_0 */], loading_ngfactory["a" /* RenderType_CoreLoadingComponent */])), core["_30" /* ɵdid */](36, 638976, null, 0, loading["a" /* CoreLoadingComponent */], [translate_service["a" /* TranslateService */], core["t" /* ElementRef */], events["a" /* CoreEventsProvider */], utils["a" /* CoreUtilsProvider */]], { hideUntil: [0, "hideUntil"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n\n        "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonModQuizReviewPage_2)), core["_30" /* ɵdid */](40, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n\n        "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonModQuizReviewPage_11)), core["_30" /* ɵdid */](44, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_26" /* ɵand */](0, [["navArrows", 2]], null, 0, null, View_AddonModQuizReviewPage_20)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; _ck(_v, 7, 0); var currVal_3 = (_co.navigation && _co.navigation.length); _ck(_v, 19, 0, currVal_3); var currVal_8 = _co.loaded; _ck(_v, 28, 0, currVal_8); var currVal_10 = core["_34" /* ɵinlineInterpolate */](1, "", core["_56" /* ɵunv */](_v, 31, 0, core["_44" /* ɵnov */](_v, 32).transform("core.pulltorefresh")), ""); _ck(_v, 31, 0, currVal_10); var currVal_11 = _co.loaded; _ck(_v, 36, 0, currVal_11); var currVal_12 = _co.attempt; _ck(_v, 40, 0, currVal_12); var currVal_13 = (_co.attempt && _co.questions.length); _ck(_v, 44, 0, currVal_13); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 6)._hidden; var currVal_1 = core["_44" /* ɵnov */](_v, 6)._sbPadding; _ck(_v, 5, 0, currVal_0, currVal_1); var currVal_2 = core["_56" /* ɵunv */](_v, 11, 0, core["_44" /* ɵnov */](_v, 12).transform("addon.mod_quiz.review")); _ck(_v, 11, 0, currVal_2); var currVal_4 = core["_44" /* ɵnov */](_v, 25).statusbarPadding; var currVal_5 = core["_44" /* ɵnov */](_v, 25)._hasRefresher; _ck(_v, 24, 0, currVal_4, currVal_5); var currVal_6 = (core["_44" /* ɵnov */](_v, 28).state !== "inactive"); var currVal_7 = core["_44" /* ɵnov */](_v, 28)._top; _ck(_v, 27, 0, currVal_6, currVal_7); var currVal_9 = core["_44" /* ɵnov */](_v, 31).r.state; _ck(_v, 30, 0, currVal_9); }); }
function View_AddonModQuizReviewPage_Host_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "page-addon-mod-quiz-review", [], null, null, null, View_AddonModQuizReviewPage_0, RenderType_AddonModQuizReviewPage)), core["_30" /* ɵdid */](1, 114688, null, 0, review_AddonModQuizReviewPage, [nav_params["a" /* NavParams */], modal_controller["a" /* ModalController */], translate_service["a" /* TranslateService */], dom["a" /* CoreDomUtilsProvider */], time["a" /* CoreTimeUtilsProvider */], quiz["a" /* AddonModQuizProvider */], providers_helper["a" /* AddonModQuizHelperProvider */], helper["a" /* CoreQuestionHelperProvider */], utils_text["a" /* CoreTextUtilsProvider */]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var AddonModQuizReviewPageNgFactory = core["_27" /* ɵccf */]("page-addon-mod-quiz-review", review_AddonModQuizReviewPage, View_AddonModQuizReviewPage_Host_0, {}, {}, []);

//# sourceMappingURL=review.ngfactory.js.map
// EXTERNAL MODULE: ./node_modules/@angular/forms/esm5/forms.js
var esm5_forms = __webpack_require__(22);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.loader.js
var translate_loader = __webpack_require__(333);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.compiler.js
var translate_compiler = __webpack_require__(334);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.parser.js
var translate_parser = __webpack_require__(336);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/missing-translation-handler.js
var missing_translation_handler = __webpack_require__(335);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.store.js
var translate_store = __webpack_require__(434);

// EXTERNAL MODULE: ./node_modules/ionic-angular/module.js
var ionic_angular_module = __webpack_require__(662);

// EXTERNAL MODULE: ./node_modules/ionic-angular/util/module-loader.js
var module_loader = __webpack_require__(248);

// CONCATENATED MODULE: ./src/addon/mod/quiz/pages/review/review.module.ngfactory.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddonModQuizReviewPageModuleNgFactory", function() { return AddonModQuizReviewPageModuleNgFactory; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 































var AddonModQuizReviewPageModuleNgFactory = core["_28" /* ɵcmf */](review_module_AddonModQuizReviewPageModule, [], function (_l) { return core["_40" /* ɵmod */]([core["_41" /* ɵmpd */](512, core["o" /* ComponentFactoryResolver */], core["_21" /* ɵCodegenComponentFactoryResolver */], [[8, [action_sheet_component_ngfactory["a" /* ActionSheetCmpNgFactory */], alert_component_ngfactory["a" /* AlertCmpNgFactory */], app_root_ngfactory["a" /* IonicAppNgFactory */], loading_component_ngfactory["a" /* LoadingCmpNgFactory */], modal_component_ngfactory["a" /* ModalCmpNgFactory */], picker_component_ngfactory["a" /* PickerCmpNgFactory */], popover_component_ngfactory["a" /* PopoverCmpNgFactory */], select_popover_component_ngfactory["a" /* SelectPopoverNgFactory */], toast_component_ngfactory["a" /* ToastCmpNgFactory */], context_menu_popover_ngfactory["a" /* CoreContextMenuPopoverComponentNgFactory */], course_picker_menu_popover_ngfactory["a" /* CoreCoursePickerMenuPopoverComponentNgFactory */], recaptchamodal_ngfactory["a" /* CoreRecaptchaModalComponentNgFactory */], AddonModQuizReviewPageNgFactory]], [3, core["o" /* ComponentFactoryResolver */]], core["K" /* NgModuleRef */]]), core["_41" /* ɵmpd */](4608, common["m" /* NgLocalization */], common["l" /* NgLocaleLocalization */], [core["G" /* LOCALE_ID */], [2, common["v" /* ɵa */]]]), core["_41" /* ɵmpd */](4608, esm5_forms["x" /* ɵi */], esm5_forms["x" /* ɵi */], []), core["_41" /* ɵmpd */](4608, esm5_forms["d" /* FormBuilder */], esm5_forms["d" /* FormBuilder */], []), core["_41" /* ɵmpd */](4608, translate_loader["b" /* TranslateLoader */], translate_loader["a" /* TranslateFakeLoader */], []), core["_41" /* ɵmpd */](4608, translate_compiler["a" /* TranslateCompiler */], translate_compiler["b" /* TranslateFakeCompiler */], []), core["_41" /* ɵmpd */](4608, translate_parser["b" /* TranslateParser */], translate_parser["a" /* TranslateDefaultParser */], []), core["_41" /* ɵmpd */](4608, missing_translation_handler["b" /* MissingTranslationHandler */], missing_translation_handler["a" /* FakeMissingTranslationHandler */], []), core["_41" /* ɵmpd */](4608, translate_service["a" /* TranslateService */], translate_service["a" /* TranslateService */], [translate_store["a" /* TranslateStore */], translate_loader["b" /* TranslateLoader */], translate_compiler["a" /* TranslateCompiler */], translate_parser["b" /* TranslateParser */], missing_translation_handler["b" /* MissingTranslationHandler */], translate_service["b" /* USE_DEFAULT_LANG */], translate_service["c" /* USE_STORE */]]), core["_41" /* ɵmpd */](512, common["b" /* CommonModule */], common["b" /* CommonModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["v" /* ɵba */], esm5_forms["v" /* ɵba */], []), core["_41" /* ɵmpd */](512, esm5_forms["i" /* FormsModule */], esm5_forms["i" /* FormsModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["s" /* ReactiveFormsModule */], esm5_forms["s" /* ReactiveFormsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["a" /* IonicModule */], ionic_angular_module["a" /* IonicModule */], []), core["_41" /* ɵmpd */](512, _ngx_translate_core["b" /* TranslateModule */], _ngx_translate_core["b" /* TranslateModule */], []), core["_41" /* ɵmpd */](512, directives_module["a" /* CoreDirectivesModule */], directives_module["a" /* CoreDirectivesModule */], []), core["_41" /* ɵmpd */](512, pipes_module["a" /* CorePipesModule */], pipes_module["a" /* CorePipesModule */], []), core["_41" /* ɵmpd */](512, components_module["a" /* CoreComponentsModule */], components_module["a" /* CoreComponentsModule */], []), core["_41" /* ɵmpd */](512, components_components_module["a" /* CoreQuestionComponentsModule */], components_components_module["a" /* CoreQuestionComponentsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["b" /* IonicPageModule */], ionic_angular_module["b" /* IonicPageModule */], []), core["_41" /* ɵmpd */](512, review_module_AddonModQuizReviewPageModule, review_module_AddonModQuizReviewPageModule, []), core["_41" /* ɵmpd */](256, translate_service["c" /* USE_STORE */], undefined, []), core["_41" /* ɵmpd */](256, translate_service["b" /* USE_DEFAULT_LANG */], undefined, []), core["_41" /* ɵmpd */](256, module_loader["a" /* LAZY_LOADED_TOKEN */], review_AddonModQuizReviewPage, [])]); });

//# sourceMappingURL=review.module.ngfactory.js.map

/***/ }),

/***/ 1968:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RenderType_CoreQuestionComponent; });
/* harmony export (immutable) */ __webpack_exports__["b"] = View_CoreQuestionComponent_0;
/* unused harmony export View_CoreQuestionComponent_Host_0 */
/* unused harmony export CoreQuestionComponentNgFactory */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_dynamic_component_dynamic_component_ngfactory__ = __webpack_require__(1360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_dynamic_component_dynamic_component__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_logger__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular_navigation_nav_controller__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_utils_dom__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core_src_translate_pipe__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core_src_translate_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__node_modules_ionic_angular_components_item_item_ngfactory__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ionic_angular_components_item_item__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ionic_angular_util_form__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ionic_angular_config_config__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ionic_angular_components_item_item_reorder__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_ionic_angular_components_item_item_content__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__node_modules_ionic_angular_components_button_button_ngfactory__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_ionic_angular_components_button_button__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__directives_format_text__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__providers_sites__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_utils_text__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_ionic_angular_platform_platform__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__providers_utils_utils__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__providers_utils_url__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__providers_filepool__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__providers_app__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__contentlinks_providers_helper__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25_ionic_angular_components_content_content__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__components_split_view_split_view__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__providers_utils_iframe__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__providers_events__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__angular_common__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__question__ = __webpack_require__(1382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__providers_delegate__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__providers_behaviour_delegate__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__providers_helper__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__providers_question__ = __webpack_require__(116);
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 



































var styles_CoreQuestionComponent = [];
var RenderType_CoreQuestionComponent = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_CoreQuestionComponent, data: {} });

function View_CoreQuestionComponent_1(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 8, "core-dynamic-component", [], [[8, "className", 0]], null, null, __WEBPACK_IMPORTED_MODULE_1__components_dynamic_component_dynamic_component_ngfactory__["b" /* View_CoreDynamicComponent_0 */], __WEBPACK_IMPORTED_MODULE_1__components_dynamic_component_dynamic_component_ngfactory__["a" /* RenderType_CoreDynamicComponent */])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](1, 901120, null, 0, __WEBPACK_IMPORTED_MODULE_2__components_dynamic_component_dynamic_component__["a" /* CoreDynamicComponent */], [__WEBPACK_IMPORTED_MODULE_3__providers_logger__["a" /* CoreLoggerProvider */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* ComponentFactoryResolver */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* KeyValueDiffers */], [2, __WEBPACK_IMPORTED_MODULE_4_ionic_angular_navigation_nav_controller__["a" /* NavController */]], __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_5__providers_utils_dom__["a" /* CoreDomUtilsProvider */]], { component: [0, "component"], data: [1, "data"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 0, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 0, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](4, 0, null, 0, 3, "p", [["padding", ""]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](5, null, ["", ""])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_48" /* ɵpod */](6, { $a: 0 }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_47" /* ɵpid */](131072, __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core_src_translate_pipe__["a" /* TranslatePipe */], [__WEBPACK_IMPORTED_MODULE_7__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */]]), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 0, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_1 = _co.componentClass; var currVal_2 = _co.data; _ck(_v, 1, 0, currVal_1, currVal_2); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_34" /* ɵinlineInterpolate */](1, "core-question-", _co.question.slot, ""); _ck(_v, 0, 0, currVal_0); var currVal_3 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_56" /* ɵunv */](_v, 5, 0, __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 7).transform("core.question.errorquestionnotsupported", _ck(_v, 6, 0, _co.question.type))); _ck(_v, 5, 0, currVal_3); }); }
function View_CoreQuestionComponent_2(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 0, "input", [["type", "hidden"]], [[8, "name", 0], [8, "value", 0]], null, null, null, null))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_34" /* ɵinlineInterpolate */](1, "", _co.seqCheck.name, ""); var currVal_1 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_34" /* ɵinlineInterpolate */](1, "", _co.seqCheck.value, ""); _ck(_v, 0, 0, currVal_0, currVal_1); }); }
function View_CoreQuestionComponent_3(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 1, "core-dynamic-component", [], null, null, null, __WEBPACK_IMPORTED_MODULE_1__components_dynamic_component_dynamic_component_ngfactory__["b" /* View_CoreDynamicComponent_0 */], __WEBPACK_IMPORTED_MODULE_1__components_dynamic_component_dynamic_component_ngfactory__["a" /* RenderType_CoreDynamicComponent */])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](1, 901120, null, 0, __WEBPACK_IMPORTED_MODULE_2__components_dynamic_component_dynamic_component__["a" /* CoreDynamicComponent */], [__WEBPACK_IMPORTED_MODULE_3__providers_logger__["a" /* CoreLoggerProvider */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* ComponentFactoryResolver */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* KeyValueDiffers */], [2, __WEBPACK_IMPORTED_MODULE_4_ionic_angular_navigation_nav_controller__["a" /* NavController */]], __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_5__providers_utils_dom__["a" /* CoreDomUtilsProvider */]], { component: [0, "component"], data: [1, "data"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _v.context.$implicit; var currVal_1 = _co.data; _ck(_v, 1, 0, currVal_0, currVal_1); }, null); }
function View_CoreQuestionComponent_4(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 9, "ion-item", [["class", "core-danger-item item item-block"], ["text-wrap", ""]], null, null, null, __WEBPACK_IMPORTED_MODULE_8__node_modules_ionic_angular_components_item_item_ngfactory__["b" /* View_Item_0 */], __WEBPACK_IMPORTED_MODULE_8__node_modules_ionic_angular_components_item_item_ngfactory__["a" /* RenderType_Item */])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](1, 1097728, null, 3, __WEBPACK_IMPORTED_MODULE_9_ionic_angular_components_item_item__["a" /* Item */], [__WEBPACK_IMPORTED_MODULE_10_ionic_angular_util_form__["a" /* Form */], __WEBPACK_IMPORTED_MODULE_11_ionic_angular_config_config__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */], [2, __WEBPACK_IMPORTED_MODULE_12_ionic_angular_components_item_item_reorder__["a" /* ItemReorder */]]], null, null), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_52" /* ɵqud */](335544320, 1, { contentLabel: 0 }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_52" /* ɵqud */](603979776, 2, { _buttons: 1 }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_52" /* ɵqud */](603979776, 3, { _icons: 1 }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](5, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_13_ionic_angular_components_item_item_content__["a" /* ItemContent */], [], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 2, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](7, 0, null, 2, 1, "p", [], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](8, null, ["", ""])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 2, ["\n"]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.question.validationError; _ck(_v, 8, 0, currVal_0); }); }
function View_CoreQuestionComponent_5(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 10, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, __WEBPACK_IMPORTED_MODULE_8__node_modules_ionic_angular_components_item_item_ngfactory__["b" /* View_Item_0 */], __WEBPACK_IMPORTED_MODULE_8__node_modules_ionic_angular_components_item_item_ngfactory__["a" /* RenderType_Item */])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](1, 1097728, null, 3, __WEBPACK_IMPORTED_MODULE_9_ionic_angular_components_item_item__["a" /* Item */], [__WEBPACK_IMPORTED_MODULE_10_ionic_angular_util_form__["a" /* Form */], __WEBPACK_IMPORTED_MODULE_11_ionic_angular_config_config__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */], [2, __WEBPACK_IMPORTED_MODULE_12_ionic_angular_components_item_item_reorder__["a" /* ItemReorder */]]], null, null), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_52" /* ɵqud */](335544320, 4, { contentLabel: 0 }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_52" /* ɵqud */](603979776, 5, { _buttons: 1 }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_52" /* ɵqud */](603979776, 6, { _icons: 1 }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](5, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_13_ionic_angular_components_item_item_content__["a" /* ItemContent */], [], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 2, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](7, 0, null, 2, 2, "button", [["block", ""], ["ion-button", ""]], [[8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.buttonClicked.emit(_v.context.$implicit) !== false);
        ad = (pd_0 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_14__node_modules_ionic_angular_components_button_button_ngfactory__["b" /* View_Button_0 */], __WEBPACK_IMPORTED_MODULE_14__node_modules_ionic_angular_components_button_button_ngfactory__["a" /* RenderType_Button */])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](8, 1097728, [[5, 4]], 0, __WEBPACK_IMPORTED_MODULE_15_ionic_angular_components_button_button__["a" /* Button */], [[8, ""], __WEBPACK_IMPORTED_MODULE_11_ionic_angular_config_config__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */]], { block: [0, "block"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](9, 0, ["", ""])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 2, ["\n"]))], function (_ck, _v) { var currVal_1 = ""; _ck(_v, 8, 0, currVal_1); }, function (_ck, _v) { var currVal_0 = _v.context.$implicit.disabled; _ck(_v, 7, 0, currVal_0); var currVal_2 = _v.context.$implicit.value; _ck(_v, 9, 0, currVal_2); }); }
function View_CoreQuestionComponent_6(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 10, "ion-item", [["class", "core-question-feedback-container item item-block"], ["text-wrap", ""]], null, null, null, __WEBPACK_IMPORTED_MODULE_8__node_modules_ionic_angular_components_item_item_ngfactory__["b" /* View_Item_0 */], __WEBPACK_IMPORTED_MODULE_8__node_modules_ionic_angular_components_item_item_ngfactory__["a" /* RenderType_Item */])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](1, 1097728, null, 3, __WEBPACK_IMPORTED_MODULE_9_ionic_angular_components_item_item__["a" /* Item */], [__WEBPACK_IMPORTED_MODULE_10_ionic_angular_util_form__["a" /* Form */], __WEBPACK_IMPORTED_MODULE_11_ionic_angular_config_config__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */], [2, __WEBPACK_IMPORTED_MODULE_12_ionic_angular_components_item_item_reorder__["a" /* ItemReorder */]]], null, null), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_52" /* ɵqud */](335544320, 7, { contentLabel: 0 }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_52" /* ɵqud */](603979776, 8, { _buttons: 1 }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_52" /* ɵqud */](603979776, 9, { _icons: 1 }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](5, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_13_ionic_angular_components_item_item_content__["a" /* ItemContent */], [], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 2, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](7, 0, null, 2, 2, "p", [], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](8, 0, null, null, 1, "core-format-text", [], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](9, 540672, null, 0, __WEBPACK_IMPORTED_MODULE_16__directives_format_text__["a" /* CoreFormatTextDirective */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_17__providers_sites__["a" /* CoreSitesProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_utils_dom__["a" /* CoreDomUtilsProvider */], __WEBPACK_IMPORTED_MODULE_18__providers_utils_text__["a" /* CoreTextUtilsProvider */], __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_19_ionic_angular_platform_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_20__providers_utils_utils__["a" /* CoreUtilsProvider */], __WEBPACK_IMPORTED_MODULE_21__providers_utils_url__["a" /* CoreUrlUtilsProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_logger__["a" /* CoreLoggerProvider */], __WEBPACK_IMPORTED_MODULE_22__providers_filepool__["a" /* CoreFilepoolProvider */], __WEBPACK_IMPORTED_MODULE_23__providers_app__["a" /* CoreAppProvider */], __WEBPACK_IMPORTED_MODULE_24__contentlinks_providers_helper__["a" /* CoreContentLinksHelperProvider */], [2, __WEBPACK_IMPORTED_MODULE_4_ionic_angular_navigation_nav_controller__["a" /* NavController */]], [2, __WEBPACK_IMPORTED_MODULE_25_ionic_angular_components_content_content__["a" /* Content */]], [2, __WEBPACK_IMPORTED_MODULE_26__components_split_view_split_view__["a" /* CoreSplitViewComponent */]], __WEBPACK_IMPORTED_MODULE_27__providers_utils_iframe__["a" /* CoreIframeUtilsProvider */], __WEBPACK_IMPORTED_MODULE_28__providers_events__["a" /* CoreEventsProvider */]], { text: [0, "text"], component: [1, "component"], componentId: [2, "componentId"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 2, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.question.feedbackHtml; var currVal_1 = _co.component; var currVal_2 = _co.componentId; _ck(_v, 9, 0, currVal_0, currVal_1, currVal_2); }, null); }
function View_CoreQuestionComponent_7(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 10, "ion-item", [["class", "core-question-comment item item-block"], ["text-wrap", ""]], null, null, null, __WEBPACK_IMPORTED_MODULE_8__node_modules_ionic_angular_components_item_item_ngfactory__["b" /* View_Item_0 */], __WEBPACK_IMPORTED_MODULE_8__node_modules_ionic_angular_components_item_item_ngfactory__["a" /* RenderType_Item */])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](1, 1097728, null, 3, __WEBPACK_IMPORTED_MODULE_9_ionic_angular_components_item_item__["a" /* Item */], [__WEBPACK_IMPORTED_MODULE_10_ionic_angular_util_form__["a" /* Form */], __WEBPACK_IMPORTED_MODULE_11_ionic_angular_config_config__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */], [2, __WEBPACK_IMPORTED_MODULE_12_ionic_angular_components_item_item_reorder__["a" /* ItemReorder */]]], null, null), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_52" /* ɵqud */](335544320, 10, { contentLabel: 0 }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_52" /* ɵqud */](603979776, 11, { _buttons: 1 }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_52" /* ɵqud */](603979776, 12, { _icons: 1 }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](5, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_13_ionic_angular_components_item_item_content__["a" /* ItemContent */], [], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 2, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](7, 0, null, 2, 2, "p", [], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](8, 0, null, null, 1, "core-format-text", [], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](9, 540672, null, 0, __WEBPACK_IMPORTED_MODULE_16__directives_format_text__["a" /* CoreFormatTextDirective */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_17__providers_sites__["a" /* CoreSitesProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_utils_dom__["a" /* CoreDomUtilsProvider */], __WEBPACK_IMPORTED_MODULE_18__providers_utils_text__["a" /* CoreTextUtilsProvider */], __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_19_ionic_angular_platform_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_20__providers_utils_utils__["a" /* CoreUtilsProvider */], __WEBPACK_IMPORTED_MODULE_21__providers_utils_url__["a" /* CoreUrlUtilsProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_logger__["a" /* CoreLoggerProvider */], __WEBPACK_IMPORTED_MODULE_22__providers_filepool__["a" /* CoreFilepoolProvider */], __WEBPACK_IMPORTED_MODULE_23__providers_app__["a" /* CoreAppProvider */], __WEBPACK_IMPORTED_MODULE_24__contentlinks_providers_helper__["a" /* CoreContentLinksHelperProvider */], [2, __WEBPACK_IMPORTED_MODULE_4_ionic_angular_navigation_nav_controller__["a" /* NavController */]], [2, __WEBPACK_IMPORTED_MODULE_25_ionic_angular_components_content_content__["a" /* Content */]], [2, __WEBPACK_IMPORTED_MODULE_26__components_split_view_split_view__["a" /* CoreSplitViewComponent */]], __WEBPACK_IMPORTED_MODULE_27__providers_utils_iframe__["a" /* CoreIframeUtilsProvider */], __WEBPACK_IMPORTED_MODULE_28__providers_events__["a" /* CoreEventsProvider */]], { text: [0, "text"], component: [1, "component"], componentId: [2, "componentId"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 2, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.question.commentHtml; var currVal_1 = _co.component; var currVal_2 = _co.componentId; _ck(_v, 9, 0, currVal_0, currVal_1, currVal_2); }, null); }
function View_CoreQuestionComponent_0(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreQuestionComponent_1)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](3, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_29__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewContainerRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreQuestionComponent_2)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](7, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_29__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewContainerRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreQuestionComponent_3)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](11, 802816, null, 0, __WEBPACK_IMPORTED_MODULE_29__angular_common__["j" /* NgForOf */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewContainerRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* TemplateRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreQuestionComponent_4)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](15, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_29__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewContainerRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreQuestionComponent_5)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](19, 802816, null, 0, __WEBPACK_IMPORTED_MODULE_29__angular_common__["j" /* NgForOf */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewContainerRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* TemplateRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreQuestionComponent_6)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](23, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_29__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewContainerRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreQuestionComponent_7)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](27, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_29__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewContainerRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.loaded; _ck(_v, 3, 0, currVal_0); var currVal_1 = _co.seqCheck; _ck(_v, 7, 0, currVal_1); var currVal_2 = _co.behaviourComponents; _ck(_v, 11, 0, currVal_2); var currVal_3 = _co.question.validationError; _ck(_v, 15, 0, currVal_3); var currVal_4 = _co.question.behaviourButtons; _ck(_v, 19, 0, currVal_4); var currVal_5 = _co.question.feedbackHtml; _ck(_v, 23, 0, currVal_5); var currVal_6 = _co.question.commentHtml; _ck(_v, 27, 0, currVal_6); }, null); }
function View_CoreQuestionComponent_Host_0(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 1, "core-question", [], null, null, null, View_CoreQuestionComponent_0, RenderType_CoreQuestionComponent)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](1, 114688, null, 0, __WEBPACK_IMPORTED_MODULE_30__question__["a" /* CoreQuestionComponent */], [__WEBPACK_IMPORTED_MODULE_3__providers_logger__["a" /* CoreLoggerProvider */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injector */], __WEBPACK_IMPORTED_MODULE_31__providers_delegate__["a" /* CoreQuestionDelegate */], __WEBPACK_IMPORTED_MODULE_20__providers_utils_utils__["a" /* CoreUtilsProvider */], __WEBPACK_IMPORTED_MODULE_32__providers_behaviour_delegate__["a" /* CoreQuestionBehaviourDelegate */], __WEBPACK_IMPORTED_MODULE_33__providers_helper__["a" /* CoreQuestionHelperProvider */], __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_34__providers_question__["a" /* CoreQuestionProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_utils_dom__["a" /* CoreDomUtilsProvider */]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var CoreQuestionComponentNgFactory = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_27" /* ɵccf */]("core-question", __WEBPACK_IMPORTED_MODULE_30__question__["a" /* CoreQuestionComponent */], View_CoreQuestionComponent_Host_0, { question: "question", component: "component", componentId: "componentId", attemptId: "attemptId", offlineEnabled: "offlineEnabled" }, { buttonClicked: "buttonClicked", onAbort: "onAbort" }, []);

//# sourceMappingURL=question.ngfactory.js.map

/***/ })

});
//# sourceMappingURL=23.js.map