webpackJsonp([8],{

/***/ 2099:
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

// EXTERNAL MODULE: ./src/core/question/components/components.module.ts
var components_components_module = __webpack_require__(1515);

// EXTERNAL MODULE: ./src/providers/events.ts
var events = __webpack_require__(11);

// EXTERNAL MODULE: ./src/providers/logger.ts
var providers_logger = __webpack_require__(5);

// EXTERNAL MODULE: ./src/providers/sites.ts
var sites = __webpack_require__(1);

// EXTERNAL MODULE: ./src/providers/sync.ts
var sync = __webpack_require__(75);

// EXTERNAL MODULE: ./src/providers/utils/dom.ts
var dom = __webpack_require__(4);

// EXTERNAL MODULE: ./src/providers/utils/time.ts
var time = __webpack_require__(24);

// EXTERNAL MODULE: ./src/core/question/providers/helper.ts
var helper = __webpack_require__(130);

// EXTERNAL MODULE: ./src/core/question/components/question/question.ts
var question = __webpack_require__(1500);

// EXTERNAL MODULE: ./src/addon/mod/quiz/providers/quiz.ts
var quiz = __webpack_require__(160);

// EXTERNAL MODULE: ./src/addon/mod/quiz/providers/quiz-sync.ts
var quiz_sync = __webpack_require__(253);

// EXTERNAL MODULE: ./src/addon/mod/quiz/providers/helper.ts
var providers_helper = __webpack_require__(249);

// EXTERNAL MODULE: ./src/addon/mod/quiz/components/connection-error/connection-error.ts
var connection_error = __webpack_require__(758);

// EXTERNAL MODULE: ./node_modules/rxjs/Rx.js
var Rx = __webpack_require__(148);
var Rx_default = /*#__PURE__*/__webpack_require__.n(Rx);

// CONCATENATED MODULE: ./src/addon/mod/quiz/classes/auto-save.ts
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
 * Class to support auto-save in quiz. Every certain seconds, it will check if there are changes in the current page answers
 * and, if so, it will save them automatically.
 */
var auto_save_AddonModQuizAutoSave = /** @class */ (function () {
    /**
     * Constructor.
     *
     * @param {string} formName Name of the form where the answers are stored.
     * @param {string} buttonSelector Selector to find the button to show the connection error.
     * @param {CoreLoggerProvider} loggerProvider CoreLoggerProvider instance.
     * @param {PopoverController} popoverCtrl PopoverController instance.
     * @param {CoreQuestionHelperProvider} questionHelper CoreQuestionHelperProvider instance.
     * @param {AddonModQuizProvider} quizProvider AddonModQuizProvider instance.
     */
    function AddonModQuizAutoSave(formName, buttonSelector, loggerProvider, popoverCtrl, questionHelper, quizProvider) {
        var _this = this;
        this.formName = formName;
        this.buttonSelector = buttonSelector;
        this.popoverCtrl = popoverCtrl;
        this.questionHelper = questionHelper;
        this.quizProvider = quizProvider;
        this.CHECK_CHANGES_INTERVAL = 5000;
        this.popoverShown = false; // Whether the popover is shown.
        this.logger = loggerProvider.getInstance('AddonModQuizAutoSave');
        // Create the popover.
        this.popover = this.popoverCtrl.create(connection_error["a" /* AddonModQuizConnectionErrorComponent */]);
        this.popover.onDidDismiss(function () {
            _this.popoverShown = false;
        });
        // Create the observable to notify if an error happened.
        this.errorObservable = new Rx["BehaviorSubject"](false);
    }
    /**
     * Cancel a pending auto save.
     */
    AddonModQuizAutoSave.prototype.cancelAutoSave = function () {
        clearTimeout(this.autoSaveTimeout);
        this.autoSaveTimeout = undefined;
    };
    /**
     * Check if the answers have changed in a page.
     *
     * @param {any} quiz Quiz.
     * @param {any} attempt Attempt.
     * @param {any} preflightData Preflight data.
     * @param {boolean} [offline] Whether the quiz is being attempted in offline mode.
     */
    AddonModQuizAutoSave.prototype.checkChanges = function (quiz, attempt, preflightData, offline) {
        if (this.autoSaveTimeout) {
            // We already have an auto save pending, no need to check changes.
            return;
        }
        var answers = this.getAnswers();
        if (!this.previousAnswers) {
            // Previous answers isn't set, set it now.
            this.previousAnswers = answers;
        }
        else {
            // Check if answers have changed.
            var equal = true;
            for (var name_1 in answers) {
                if (this.previousAnswers[name_1] != answers[name_1]) {
                    equal = false;
                    break;
                }
            }
            if (!equal) {
                this.setAutoSaveTimer(quiz, attempt, preflightData, offline);
            }
            this.previousAnswers = answers;
        }
    };
    /**
     * Get answers from a form.
     *
     * @return {any} Answers.
     */
    AddonModQuizAutoSave.prototype.getAnswers = function () {
        return this.questionHelper.getAnswersFromForm(document.forms[this.formName]);
    };
    /**
     * Hide the auto save error.
     */
    AddonModQuizAutoSave.prototype.hideAutoSaveError = function () {
        this.errorObservable.next(false);
        this.popover.dismiss();
    };
    /**
     * Returns an observable that will notify when an error happens or stops.
     * It will send true when there's an error, and false when the error has been ammended.
     *
     * @return {BehaviorSubject<boolean>} Observable.
     */
    AddonModQuizAutoSave.prototype.onError = function () {
        return this.errorObservable;
    };
    /**
     * Schedule an auto save process if it's not scheduled already.
     *
     * @param {any} quiz Quiz.
     * @param {any} attempt Attempt.
     * @param {any} preflightData Preflight data.
     * @param {boolean} [offline] Whether the quiz is being attempted in offline mode.
     */
    AddonModQuizAutoSave.prototype.setAutoSaveTimer = function (quiz, attempt, preflightData, offline) {
        var _this = this;
        // Don't schedule if already shceduled or quiz is almost closed.
        if (quiz.autosaveperiod && !this.autoSaveTimeout && !this.quizProvider.isAttemptTimeNearlyOver(quiz, attempt)) {
            // Schedule save.
            this.autoSaveTimeout = setTimeout(function () {
                var answers = _this.getAnswers();
                _this.cancelAutoSave();
                _this.previousAnswers = answers; // Update previous answers to match what we're sending to the server.
                _this.quizProvider.saveAttempt(quiz, attempt, answers, preflightData, offline).then(function () {
                    // Save successful, we can hide the connection error if it was shown.
                    _this.hideAutoSaveError();
                }).catch(function (error) {
                    // Error auto-saving. Show error and set timer again.
                    _this.logger.warn('Error auto-saving data.', error);
                    // If there was no error already, show the error message.
                    if (!_this.errorObservable.getValue()) {
                        _this.errorObservable.next(true);
                        _this.showAutoSaveError();
                    }
                    // Try again.
                    _this.setAutoSaveTimer(quiz, attempt, preflightData, offline);
                });
            }, quiz.autosaveperiod * 1000);
        }
    };
    /**
     * Show an error popover due to an auto save error.
     */
    AddonModQuizAutoSave.prototype.showAutoSaveError = function (ev) {
        // Don't show popover if it was already shown.
        if (!this.popoverShown) {
            this.popoverShown = true;
            // If no event is provided, simulate it targeting the button.
            this.popover.present({
                ev: ev || { target: document.querySelector(this.buttonSelector) }
            });
        }
    };
    /**
     * Start a process to periodically check changes in answers.
     *
     * @param {any} quiz Quiz.
     * @param {any} attempt Attempt.
     * @param {any} preflightData Preflight data.
     * @param {boolean} [offline] Whether the quiz is being attempted in offline mode.
     */
    AddonModQuizAutoSave.prototype.startCheckChangesProcess = function (quiz, attempt, preflightData, offline) {
        var _this = this;
        if (this.checkChangesInterval || !quiz.autosaveperiod) {
            // We already have the interval in place or the quiz has autosave disabled.
            return;
        }
        this.previousAnswers = undefined;
        // Load initial answers in 2.5 seconds so the first check interval finds them already loaded.
        this.loadPreviousAnswersTimeout = setTimeout(function () {
            _this.checkChanges(quiz, attempt, preflightData, offline);
        }, 2500);
        // Check changes every certain time.
        this.checkChangesInterval = setInterval(function () {
            _this.checkChanges(quiz, attempt, preflightData, offline);
        }, this.CHECK_CHANGES_INTERVAL);
    };
    /**
     * Stops the periodical check for changes.
     */
    AddonModQuizAutoSave.prototype.stopCheckChangesProcess = function () {
        clearTimeout(this.loadPreviousAnswersTimeout);
        clearInterval(this.checkChangesInterval);
        this.loadPreviousAnswersTimeout = undefined;
        this.checkChangesInterval = undefined;
    };
    return AddonModQuizAutoSave;
}());

//# sourceMappingURL=auto-save.js.map
// CONCATENATED MODULE: ./src/addon/mod/quiz/pages/player/player.ts
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
 * Page that allows attempting a quiz.
 */
var player_AddonModQuizPlayerPage = /** @class */ (function () {
    function AddonModQuizPlayerPage(navParams, logger, translate, eventsProvider, sitesProvider, syncProvider, domUtils, popoverCtrl, timeUtils, quizProvider, quizHelper, quizSync, questionHelper, cdr, modalCtrl, navCtrl) {
        this.translate = translate;
        this.eventsProvider = eventsProvider;
        this.sitesProvider = sitesProvider;
        this.syncProvider = syncProvider;
        this.domUtils = domUtils;
        this.timeUtils = timeUtils;
        this.quizProvider = quizProvider;
        this.quizHelper = quizHelper;
        this.quizSync = quizSync;
        this.questionHelper = questionHelper;
        this.cdr = cdr;
        this.navCtrl = navCtrl;
        this.component = quiz["a" /* AddonModQuizProvider */].COMPONENT; // Component to link the files to.
        this.preflightData = {}; // Preflight data to attempt the quiz.
        this.forceLeave = false; // If true, don't perform any check when leaving the view.
        this.reloadNavigaton = false; // Whether navigation needs to be reloaded because some data was sent to server.
        this.quizId = navParams.get('quizId');
        this.courseId = navParams.get('courseId');
        this.moduleUrl = navParams.get('moduleUrl');
        // Block the quiz so it cannot be synced.
        this.syncProvider.blockOperation(quiz["a" /* AddonModQuizProvider */].COMPONENT, this.quizId);
        // Create the auto save instance.
        this.autoSave = new auto_save_AddonModQuizAutoSave('addon-mod_quiz-player-form', '#addon-mod_quiz-connection-error-button', logger, popoverCtrl, questionHelper, quizProvider);
        // Create the navigation modal.
        this.navigationModal = modalCtrl.create('AddonModQuizNavigationModalPage', {
            page: this
        }, { cssClass: 'core-modal-lateral',
            showBackdrop: true,
            enableBackdropDismiss: true,
            enterAnimation: 'core-modal-lateral-transition',
            leaveAnimation: 'core-modal-lateral-transition' });
    }
    /**
     * Component being initialized.
     */
    AddonModQuizPlayerPage.prototype.ngOnInit = function () {
        var _this = this;
        // Start the player when the page is loaded.
        this.start();
        // Listen for errors on auto-save.
        this.autoSaveErrorSubscription = this.autoSave.onError().subscribe(function (error) {
            _this.autoSaveError = error;
            _this.cdr.detectChanges();
        });
    };
    /**
     * Component being destroyed.
     */
    AddonModQuizPlayerPage.prototype.ngOnDestroy = function () {
        // Stop auto save.
        this.autoSave.cancelAutoSave();
        this.autoSave.stopCheckChangesProcess();
        this.autoSaveErrorSubscription && this.autoSaveErrorSubscription.unsubscribe();
        // Unblock the quiz so it can be synced.
        this.syncProvider.unblockOperation(quiz["a" /* AddonModQuizProvider */].COMPONENT, this.quizId);
    };
    /**
     * Check if we can leave the page or not.
     *
     * @return {boolean|Promise<void>} Resolved if we can leave it, rejected if not.
     */
    AddonModQuizPlayerPage.prototype.ionViewCanLeave = function () {
        var _this = this;
        if (this.forceLeave) {
            return true;
        }
        if (this.questions && this.questions.length && !this.showSummary) {
            // Save answers.
            var modal_1 = this.domUtils.showModalLoading('core.sending', true);
            return this.processAttempt(false, false).catch(function () {
                // Save attempt failed. Show confirmation.
                modal_1.dismiss();
                return _this.domUtils.showConfirm(_this.translate.instant('addon.mod_quiz.confirmleavequizonerror'));
            }).finally(function () {
                modal_1.dismiss();
            });
        }
        return Promise.resolve();
    };
    /**
     * Abort the quiz.
     */
    AddonModQuizPlayerPage.prototype.abortQuiz = function () {
        this.quizAborted = true;
    };
    /**
     * A behaviour button in a question was clicked (Check, Redo, ...).
     *
     * @param {any} button Clicked button.
     */
    AddonModQuizPlayerPage.prototype.behaviourButtonClicked = function (button) {
        var _this = this;
        // Confirm that the user really wants to do it.
        this.domUtils.showConfirm(this.translate.instant('core.areyousure')).then(function () {
            var modal = _this.domUtils.showModalLoading('core.sending', true);
            // Get the answers.
            return _this.prepareAnswers().then(function (answers) {
                // Add the clicked button data.
                answers[button.name] = button.value;
                // Behaviour checks are always in online.
                return _this.quizProvider.processAttempt(_this.quiz, _this.attempt, answers, _this.preflightData);
            }).then(function () {
                _this.reloadNavigaton = true; // Data sent to server, navigation should be reloaded.
                // Reload the current page.
                var scrollElement = _this.content.getScrollElement(), scrollTop = scrollElement.scrollTop || 0, scrollLeft = scrollElement.scrollLeft || 0;
                _this.loaded = false;
                _this.domUtils.scrollToTop(_this.content); // Scroll top so the spinner is seen.
                return _this.loadPage(_this.attempt.currentpage).finally(function () {
                    _this.loaded = true;
                    _this.domUtils.scrollTo(_this.content, scrollLeft, scrollTop);
                });
            }).finally(function () {
                modal.dismiss();
            });
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'Error performing action.');
        });
    };
    /**
     * Change the current page. If slot is supplied, try to scroll to that question.
     *
     * @param {number} page Page to load. -1 means summary.
     * @param {boolean} [fromModal] Whether the page was selected using the navigation modal.
     * @param {number} [slot] Slot of the question to scroll to.
     */
    AddonModQuizPlayerPage.prototype.changePage = function (page, fromModal, slot) {
        var _this = this;
        if (page != -1 && (this.attempt.state == quiz["a" /* AddonModQuizProvider */].ATTEMPT_OVERDUE || this.attempt.finishedOffline)) {
            // We can't load a page if overdue or the local attempt is finished.
            return;
        }
        else if (page == this.attempt.currentpage && !this.showSummary && typeof slot != 'undefined') {
            // Navigating to a question in the current page.
            this.scrollToQuestion(slot);
            return;
        }
        else if ((page == this.attempt.currentpage && !this.showSummary) || (fromModal && this.quiz.isSequential && page != -1)) {
            // If the user is navigating to the current page we do nothing.
            // Also, in sequential quizzes we don't allow navigating using the modal except for finishing the quiz (summary).
            return;
        }
        else if (page === -1 && this.showSummary) {
            // Summary already shown.
            return;
        }
        this.loaded = false;
        this.domUtils.scrollToTop(this.content);
        // First try to save the attempt data. We only save it if we're not seeing the summary.
        var promise = this.showSummary ? Promise.resolve() : this.processAttempt(false, false);
        promise.then(function () {
            if (!_this.showSummary) {
                _this.reloadNavigaton = true; // Data sent to server, navigation should be reloaded.
            }
            // Attempt data successfully saved, load the page or summary.
            var subPromise;
            // Stop checking for changes during page change.
            _this.autoSave.stopCheckChangesProcess();
            if (page === -1) {
                subPromise = _this.loadSummary();
            }
            else {
                subPromise = _this.loadPage(page);
            }
            return subPromise.catch(function (error) {
                // If the user isn't seeing the summary, start the check again.
                if (!_this.showSummary) {
                    _this.autoSave.startCheckChangesProcess(_this.quiz, _this.attempt, _this.preflightData, _this.offline);
                }
                _this.domUtils.showErrorModalDefault(error, 'addon.mod_quiz.errorgetquestions', true);
            });
        }, function (error) {
            _this.domUtils.showErrorModalDefault(error, 'addon.mod_quiz.errorsaveattempt', true);
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
    AddonModQuizPlayerPage.prototype.fetchData = function () {
        var _this = this;
        // Wait for any ongoing sync to finish. We won't sync a quiz while it's being played.
        return this.quizSync.waitForSync(this.quizId).then(function () {
            // Sync finished, now get the quiz.
            return _this.quizProvider.getQuizById(_this.courseId, _this.quizId);
        }).then(function (quizData) {
            _this.quiz = quizData;
            _this.quiz.isSequential = _this.quizProvider.isNavigationSequential(_this.quiz);
            if (_this.quizProvider.isQuizOffline(_this.quiz)) {
                // Quiz supports offline.
                return true;
            }
            else {
                // Quiz doesn't support offline right now, but maybe it did and then the setting was changed.
                // If we have an unfinished offline attempt then we'll use offline mode.
                return _this.quizProvider.isLastAttemptOfflineUnfinished(_this.quiz);
            }
        }).then(function (offlineMode) {
            _this.offline = offlineMode;
            if (_this.quiz.timelimit > 0) {
                _this.quiz.readableTimeLimit = _this.timeUtils.formatTime(_this.quiz.timelimit);
            }
            // Get access information for the quiz.
            return _this.quizProvider.getQuizAccessInformation(_this.quiz.id, _this.offline, true);
        }).then(function (info) {
            _this.quizAccessInfo = info;
            // Get user attempts to determine last attempt.
            return _this.quizProvider.getUserAttempts(_this.quiz.id, 'all', true, _this.offline, true);
        }).then(function (attempts) {
            if (!attempts.length) {
                // There are no attempts, start a new one.
                _this.newAttempt = true;
            }
            else {
                var promises = [];
                // Get the last attempt. If it's finished, start a new one.
                _this.lastAttempt = attempts[attempts.length - 1];
                _this.newAttempt = _this.quizProvider.isAttemptFinished(_this.lastAttempt.state);
                // Load quiz last sync time.
                promises.push(_this.quizSync.getSyncTime(_this.quiz.id).then(function (time) {
                    _this.quiz.syncTime = time;
                    _this.quiz.syncTimeReadable = _this.quizSync.getReadableTimeFromTimestamp(time);
                }));
                // Load flag to show if attempts are finished but not synced.
                promises.push(_this.quizProvider.loadFinishedOfflineData(attempts));
                return Promise.all(promises);
            }
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'addon.mod_quiz.errorgetquiz', true);
        });
    };
    /**
     * Finish an attempt, either by timeup or because the user clicked to finish it.
     *
     * @param {boolean} [userFinish] Whether the user clicked to finish the attempt.
     * @param {boolean} [timeUp] Whether the quiz time is up.
     * @return {Promise<void>} Promise resolved when done.
     */
    AddonModQuizPlayerPage.prototype.finishAttempt = function (userFinish, timeUp) {
        var _this = this;
        var promise;
        // Show confirm if the user clicked the finish button and the quiz is in progress.
        if (!timeUp && this.attempt.state == quiz["a" /* AddonModQuizProvider */].ATTEMPT_IN_PROGRESS) {
            promise = this.domUtils.showConfirm(this.translate.instant('addon.mod_quiz.confirmclose'));
        }
        else {
            promise = Promise.resolve();
        }
        return promise.then(function () {
            var modal = _this.domUtils.showModalLoading('core.sending', true);
            return _this.processAttempt(userFinish, timeUp).then(function () {
                // Trigger an event to notify the attempt was finished.
                _this.eventsProvider.trigger(quiz["a" /* AddonModQuizProvider */].ATTEMPT_FINISHED_EVENT, {
                    quizId: _this.quizId,
                    attemptId: _this.attempt.id,
                    synced: !_this.offline
                }, _this.sitesProvider.getCurrentSiteId());
                // Leave the player.
                _this.forceLeave = true;
                _this.navCtrl.pop();
            }).finally(function () {
                modal.dismiss();
            });
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'addon.mod_quiz.errorsaveattempt', true);
        });
    };
    /**
     * Fix sequence checks of current page.
     *
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonModQuizPlayerPage.prototype.fixSequenceChecks = function () {
        var _this = this;
        // Get current page data again to get the latest sequencechecks.
        return this.quizProvider.getAttemptData(this.attempt.id, this.attempt.currentpage, this.preflightData, this.offline, true)
            .then(function (data) {
            var newSequenceChecks = {};
            data.questions.forEach(function (question) {
                newSequenceChecks[question.slot] = _this.questionHelper.getQuestionSequenceCheckFromHtml(question.html);
            });
            // Notify the new sequence checks to the components.
            _this.questionComponents.forEach(function (component) {
                component.updateSequenceCheck(newSequenceChecks);
            });
        });
    };
    /**
     * Get the input answers.
     *
     * @return {any} Object with the answers.
     */
    AddonModQuizPlayerPage.prototype.getAnswers = function () {
        return this.questionHelper.getAnswersFromForm(document.forms['addon-mod_quiz-player-form']);
    };
    /**
     * Initializes the timer if enabled.
     */
    AddonModQuizPlayerPage.prototype.initTimer = function () {
        if (this.attemptAccessInfo.endtime > 0) {
            // Quiz has an end time. Check if time left should be shown.
            if (this.quizProvider.shouldShowTimeLeft(this.quizAccessInfo.activerulenames, this.attempt, this.attemptAccessInfo.endtime)) {
                this.endTime = this.attemptAccessInfo.endtime;
            }
            else {
                delete this.endTime;
            }
        }
    };
    /**
     * Load a page questions.
     *
     * @param {number} page The page to load.
     * @return {Promise<void>} Promise resolved when done.
     */
    AddonModQuizPlayerPage.prototype.loadPage = function (page) {
        var _this = this;
        return this.quizProvider.getAttemptData(this.attempt.id, page, this.preflightData, this.offline, true).then(function (data) {
            // Update attempt, status could change during the execution.
            _this.attempt = data.attempt;
            _this.attempt.currentpage = page;
            _this.questions = data.questions;
            _this.nextPage = data.nextpage;
            _this.previousPage = _this.quiz.isSequential ? -1 : page - 1;
            _this.showSummary = false;
            _this.questions.forEach(function (question) {
                // Get the readable mark for each question.
                question.readableMark = _this.quizHelper.getQuestionMarkFromHtml(question.html);
                // Extract the question info box.
                _this.questionHelper.extractQuestionInfoBox(question, '.info');
                // Set the preferred behaviour.
                question.preferredBehaviour = _this.quiz.preferredbehaviour;
                // Check if the question is blocked. If it is, treat it as a description question.
                if (_this.quizProvider.isQuestionBlocked(question)) {
                    question.type = 'description';
                }
            });
            // Mark the page as viewed. We'll ignore errors in this call.
            _this.quizProvider.logViewAttempt(_this.attempt.id, page, _this.preflightData, _this.offline, _this.quiz).catch(function (error) {
                // Ignore errors.
            });
            // Start looking for changes.
            _this.autoSave.startCheckChangesProcess(_this.quiz, _this.attempt, _this.preflightData, _this.offline);
        });
    };
    /**
     * Load attempt summary.
     *
     * @return {Promise<void>} Promise resolved when done.
     */
    AddonModQuizPlayerPage.prototype.loadSummary = function () {
        var _this = this;
        this.summaryQuestions = [];
        return this.quizProvider.getAttemptSummary(this.attempt.id, this.preflightData, this.offline, true, true).then(function (qs) {
            _this.showSummary = true;
            _this.summaryQuestions = qs;
            _this.canReturn = _this.attempt.state == quiz["a" /* AddonModQuizProvider */].ATTEMPT_IN_PROGRESS && !_this.attempt.finishedOffline;
            _this.preventSubmitMessages = _this.quizProvider.getPreventSubmitMessages(_this.summaryQuestions);
            _this.attempt.dueDateWarning = _this.quizProvider.getAttemptDueDateWarning(_this.quiz, _this.attempt);
            // Log summary as viewed.
            _this.quizProvider.logViewAttemptSummary(_this.attempt.id, _this.preflightData, _this.quizId, _this.quiz.name)
                .catch(function (error) {
                // Ignore errors.
            });
        });
    };
    /**
     * Load data to navigate the questions using the navigation modal.
     *
     * @return {Promise<void>} Promise resolved when done.
     */
    AddonModQuizPlayerPage.prototype.loadNavigation = function () {
        var _this = this;
        // We use the attempt summary to build the navigation because it contains all the questions.
        return this.quizProvider.getAttemptSummary(this.attempt.id, this.preflightData, this.offline, true, true)
            .then(function (questions) {
            questions.forEach(function (question) {
                question.stateClass = _this.questionHelper.getQuestionStateClass(question.state);
            });
            _this.navigation = questions;
        });
    };
    /**
     * Open the navigation modal.
     *
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonModQuizPlayerPage.prototype.openNavigation = function () {
        var _this = this;
        var promise;
        if (this.reloadNavigaton) {
            // Some data has changed, reload the navigation.
            var modal_2 = this.domUtils.showModalLoading();
            promise = this.loadNavigation().catch(function () {
                // Ignore errors.
            }).then(function () {
                modal_2.dismiss();
                _this.reloadNavigaton = false;
            });
        }
        else {
            promise = Promise.resolve();
        }
        return promise.finally(function () {
            _this.navigationModal.present();
        });
    };
    // Prepare the answers to be sent for the attempt.
    AddonModQuizPlayerPage.prototype.prepareAnswers = function () {
        return this.questionHelper.prepareAnswers(this.questions, this.getAnswers(), this.offline);
    };
    /**
     * Process attempt.
     *
     * @param {boolean} [userFinish] Whether the user clicked to finish the attempt.
     * @param {boolean} [timeUp] Whether the quiz time is up.
     * @return {Promise<any>} Promise resolved when done.
     * @param {boolean} [retrying] Whether we're retrying the change.
     */
    AddonModQuizPlayerPage.prototype.processAttempt = function (userFinish, timeUp, retrying) {
        var _this = this;
        // Get the answers to send.
        return this.prepareAnswers().then(function (answers) {
            // Send the answers.
            return _this.quizProvider.processAttempt(_this.quiz, _this.attempt, answers, _this.preflightData, userFinish, timeUp, _this.offline).catch(function (error) {
                if (error && error.errorcode == 'submissionoutofsequencefriendlymessage') {
                    // There was an error with the sequence check. Try to ammend it.
                    return _this.fixSequenceChecks().then(function () {
                        if (retrying) {
                            // We're already retrying, don't send the data again because it could cause an infinite loop.
                            return Promise.reject(error);
                        }
                        // Sequence checks updated, try to send the data again.
                        return _this.processAttempt(userFinish, timeUp, true);
                    }, function () {
                        return Promise.reject(error);
                    });
                }
                return Promise.reject(error);
            });
        }).then(function () {
            // Answers saved, cancel auto save.
            _this.autoSave.cancelAutoSave();
            _this.autoSave.hideAutoSaveError();
        });
    };
    /**
     * Scroll to a certain question.
     *
     * @param {number} slot Slot of the question to scroll to.
     */
    AddonModQuizPlayerPage.prototype.scrollToQuestion = function (slot) {
        this.domUtils.scrollToElementBySelector(this.content, '#addon-mod_quiz-question-' + slot);
    };
    /**
     * Show connection error.
     *
     * @param {Event} ev Click event.
     */
    AddonModQuizPlayerPage.prototype.showConnectionError = function (ev) {
        this.autoSave.showAutoSaveError(ev);
    };
    /**
     * Convenience function to start the player.
     */
    AddonModQuizPlayerPage.prototype.start = function () {
        var _this = this;
        var promise;
        this.loaded = false;
        if (this.quizDataLoaded) {
            // Quiz data has been loaded, try to start or continue.
            promise = this.startOrContinueAttempt();
        }
        else {
            // Fetch data.
            promise = this.fetchData().then(function () {
                _this.quizDataLoaded = true;
                return _this.startOrContinueAttempt();
            });
        }
        promise.finally(function () {
            _this.loaded = true;
        });
    };
    /**
     * Start or continue an attempt.
     *
     * @return {Promise<any>} [description]
     */
    AddonModQuizPlayerPage.prototype.startOrContinueAttempt = function () {
        var _this = this;
        var attempt = this.newAttempt ? undefined : this.lastAttempt;
        // Get the preflight data and start attempt if needed.
        return this.quizHelper.getAndCheckPreflightData(this.quiz, this.quizAccessInfo, this.preflightData, attempt, this.offline, false, 'addon.mod_quiz.startattempt').then(function (attempt) {
            // Re-fetch attempt access information with the right attempt (might have changed because a new attempt was created).
            return _this.quizProvider.getAttemptAccessInformation(_this.quiz.id, attempt.id, _this.offline, true).then(function (info) {
                _this.attemptAccessInfo = info;
                _this.attempt = attempt;
                return _this.loadNavigation();
            }).then(function () {
                if (_this.attempt.state != quiz["a" /* AddonModQuizProvider */].ATTEMPT_OVERDUE && !_this.attempt.finishedOffline) {
                    // Attempt not overdue and not finished in offline, load page.
                    return _this.loadPage(_this.attempt.currentpage).then(function () {
                        _this.initTimer();
                    });
                }
                else {
                    // Attempt is overdue or finished in offline, we can only load the summary.
                    return _this.loadSummary();
                }
            });
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'addon.mod_quiz.errorgetquestions', true);
        });
    };
    /**
     * Quiz time has finished.
     */
    AddonModQuizPlayerPage.prototype.timeUp = function () {
        if (this.timeUpCalled) {
            return;
        }
        this.timeUpCalled = true;
        this.finishAttempt(false, true);
    };
    __decorate([
        Object(core["_9" /* ViewChild */])(ionic_angular["f" /* Content */]),
        __metadata("design:type", ionic_angular["f" /* Content */])
    ], AddonModQuizPlayerPage.prototype, "content", void 0);
    __decorate([
        Object(core["_10" /* ViewChildren */])(question["a" /* CoreQuestionComponent */]),
        __metadata("design:type", core["T" /* QueryList */])
    ], AddonModQuizPlayerPage.prototype, "questionComponents", void 0);
    AddonModQuizPlayerPage = __decorate([
        Object(core["m" /* Component */])({
            selector: 'page-addon-mod-quiz-player',
            templateUrl: 'player.html',
        }),
        __metadata("design:paramtypes", [ionic_angular["t" /* NavParams */], providers_logger["a" /* CoreLoggerProvider */], _ngx_translate_core["c" /* TranslateService */],
            events["a" /* CoreEventsProvider */], sites["a" /* CoreSitesProvider */],
            sync["a" /* CoreSyncProvider */], dom["a" /* CoreDomUtilsProvider */], ionic_angular["w" /* PopoverController */],
            time["a" /* CoreTimeUtilsProvider */], quiz["a" /* AddonModQuizProvider */],
            providers_helper["a" /* AddonModQuizHelperProvider */], quiz_sync["a" /* AddonModQuizSyncProvider */],
            helper["a" /* CoreQuestionHelperProvider */], core["j" /* ChangeDetectorRef */],
            ionic_angular["q" /* ModalController */], ionic_angular["s" /* NavController */]])
    ], AddonModQuizPlayerPage);
    return AddonModQuizPlayerPage;
}());

//# sourceMappingURL=player.js.map
// CONCATENATED MODULE: ./src/addon/mod/quiz/pages/player/player.module.ts
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







var player_module_AddonModQuizPlayerPageModule = /** @class */ (function () {
    function AddonModQuizPlayerPageModule() {
    }
    AddonModQuizPlayerPageModule = player_module___decorate([
        Object(core["I" /* NgModule */])({
            declarations: [
                player_AddonModQuizPlayerPage,
            ],
            imports: [
                components_module["a" /* CoreComponentsModule */],
                directives_module["a" /* CoreDirectivesModule */],
                components_components_module["a" /* CoreQuestionComponentsModule */],
                ionic_angular["l" /* IonicPageModule */].forChild(player_AddonModQuizPlayerPage),
                _ngx_translate_core["b" /* TranslateModule */].forChild()
            ],
        })
    ], AddonModQuizPlayerPageModule);
    return AddonModQuizPlayerPageModule;
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

// EXTERNAL MODULE: ./src/directives/format-text.ts
var format_text = __webpack_require__(41);

// EXTERNAL MODULE: ./src/providers/utils/text.ts
var utils_text = __webpack_require__(10);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.service.js
var translate_service = __webpack_require__(18);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/platform.js + 1 modules
var platform = __webpack_require__(16);

// EXTERNAL MODULE: ./src/providers/utils/utils.ts
var utils = __webpack_require__(2);

// EXTERNAL MODULE: ./src/providers/utils/url.ts
var url = __webpack_require__(23);

// EXTERNAL MODULE: ./src/providers/filepool.ts
var filepool = __webpack_require__(17);

// EXTERNAL MODULE: ./src/providers/app.ts
var app = __webpack_require__(9);

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

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.ngfactory.js
var button_ngfactory = __webpack_require__(45);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.js
var button_button = __webpack_require__(42);

// EXTERNAL MODULE: ./node_modules/ionic-angular/config/config.js
var config = __webpack_require__(7);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.pipe.js
var translate_pipe = __webpack_require__(28);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/icon/icon.js
var icon = __webpack_require__(46);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar.ngfactory.js
var toolbar_ngfactory = __webpack_require__(2113);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar.js
var toolbar = __webpack_require__(267);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.ngfactory.js
var toolbar_title_ngfactory = __webpack_require__(1478);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.js
var toolbar_title = __webpack_require__(364);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/navbar.js
var navbar = __webpack_require__(221);

// EXTERNAL MODULE: ./src/components/timer/timer.ngfactory.js
var timer_ngfactory = __webpack_require__(2122);

// EXTERNAL MODULE: ./src/components/timer/timer.ts
var timer = __webpack_require__(1505);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-item.js
var toolbar_item = __webpack_require__(469);

// EXTERNAL MODULE: ./node_modules/@angular/common/esm5/common.js
var common = __webpack_require__(8);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/note/note.js
var note = __webpack_require__(222);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/card/card.js
var card = __webpack_require__(83);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item.ngfactory.js + 1 modules
var item_ngfactory = __webpack_require__(30);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item.js
var item = __webpack_require__(21);

// EXTERNAL MODULE: ./node_modules/ionic-angular/util/form.js
var util_form = __webpack_require__(20);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-reorder.js + 1 modules
var item_reorder = __webpack_require__(27);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-divider.js
var item_divider = __webpack_require__(93);

// EXTERNAL MODULE: ./src/core/question/components/question/question.ngfactory.js
var question_ngfactory = __webpack_require__(2119);

// EXTERNAL MODULE: ./src/core/question/providers/delegate.ts
var delegate = __webpack_require__(69);

// EXTERNAL MODULE: ./src/core/question/providers/behaviour-delegate.ts
var behaviour_delegate = __webpack_require__(113);

// EXTERNAL MODULE: ./src/core/question/providers/question.ts
var providers_question = __webpack_require__(123);

// EXTERNAL MODULE: ./node_modules/@angular/forms/esm5/forms.js
var esm5_forms = __webpack_require__(22);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/grid/col.js
var col = __webpack_require__(118);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/grid/grid.js
var grid = __webpack_require__(156);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/grid/row.js
var row = __webpack_require__(117);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-content.js
var item_content = __webpack_require__(32);

// EXTERNAL MODULE: ./src/directives/link.ts
var directives_link = __webpack_require__(181);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/card/card-header.js
var card_header = __webpack_require__(310);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-header.js
var toolbar_header = __webpack_require__(468);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/view-controller.js
var view_controller = __webpack_require__(38);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/navbar.ngfactory.js
var navbar_ngfactory = __webpack_require__(1477);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/app/app.js + 3 modules
var app_app = __webpack_require__(34);

// EXTERNAL MODULE: ./src/directives/back-button.ts
var back_button = __webpack_require__(711);

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

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-params.js
var nav_params = __webpack_require__(70);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/popover/popover-controller.js
var popover_controller = __webpack_require__(65);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/modal/modal-controller.js
var modal_controller = __webpack_require__(178);

// CONCATENATED MODULE: ./src/addon/mod/quiz/pages/player/player.ngfactory.js
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 







































































var styles_AddonModQuizPlayerPage = [];
var RenderType_AddonModQuizPlayerPage = core["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_AddonModQuizPlayerPage, data: {} });

function View_AddonModQuizPlayerPage_1(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "core-format-text", [], null, null, null, null, null)), core["_30" /* ɵdid */](1, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform["a" /* Platform */], utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], providers_logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], app["a" /* CoreAppProvider */], contentlinks_providers_helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */]], { text: [0, "text"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.quiz.name; _ck(_v, 1, 0, currVal_0); }, null); }
function View_AddonModQuizPlayerPage_2(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 6, "button", [["icon-only", ""], ["ion-button", ""]], [[1, "aria-label", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.openNavigation() !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](1, 1097728, [[3, 4]], 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                "])), (_l()(), core["_31" /* ɵeld */](4, 0, null, 0, 1, "ion-icon", [["name", "bookmark"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](5, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n            "]))], function (_ck, _v) { var currVal_2 = "bookmark"; _ck(_v, 5, 0, currVal_2); }, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 0, 0, core["_44" /* ɵnov */](_v, 2).transform("addon.mod_quiz.opentoc")); _ck(_v, 0, 0, currVal_0); var currVal_1 = core["_44" /* ɵnov */](_v, 5)._hidden; _ck(_v, 4, 0, currVal_1); }); }
function View_AddonModQuizPlayerPage_4(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 6, "a", [["icon-only", ""], ["ion-button", ""]], [[8, "title", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.changePage(_co.previousPage) !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](1, 1097728, [[4, 4]], 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                "])), (_l()(), core["_31" /* ɵeld */](4, 0, null, 0, 1, "ion-icon", [["md", "ios-arrow-back"], ["name", "arrow-back"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](5, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"], md: [1, "md"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n            "]))], function (_ck, _v) { var currVal_2 = "arrow-back"; var currVal_3 = "ios-arrow-back"; _ck(_v, 5, 0, currVal_2, currVal_3); }, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 0, 0, core["_44" /* ɵnov */](_v, 2).transform("core.previous")); _ck(_v, 0, 0, currVal_0); var currVal_1 = core["_44" /* ɵnov */](_v, 5)._hidden; _ck(_v, 4, 0, currVal_1); }); }
function View_AddonModQuizPlayerPage_5(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 6, "a", [["icon-only", ""], ["ion-button", ""]], [[8, "title", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.changePage(_co.nextPage) !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](1, 1097728, [[4, 4]], 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                "])), (_l()(), core["_31" /* ɵeld */](4, 0, null, 0, 1, "ion-icon", [["md", "ios-arrow-forward"], ["name", "arrow-forward"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](5, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"], md: [1, "md"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n            "]))], function (_ck, _v) { var currVal_2 = "arrow-forward"; var currVal_3 = "ios-arrow-forward"; _ck(_v, 5, 0, currVal_2, currVal_3); }, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 0, 0, core["_44" /* ɵnov */](_v, 2).transform("core.next")); _ck(_v, 0, 0, currVal_0); var currVal_1 = core["_44" /* ɵnov */](_v, 5)._hidden; _ck(_v, 4, 0, currVal_1); }); }
function View_AddonModQuizPlayerPage_3(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 21, "ion-toolbar", [["class", "toolbar"], ["color", "light"], ["ion-fixed", ""]], [[2, "statusbar-padding", null]], null, null, toolbar_ngfactory["b" /* View_Toolbar_0 */], toolbar_ngfactory["a" /* RenderType_Toolbar */])), core["_30" /* ɵdid */](1, 49152, null, 0, toolbar["a" /* Toolbar */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { color: [0, "color"] }, null), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n        "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, 3, 6, "ion-title", [], null, null, null, toolbar_title_ngfactory["b" /* View_ToolbarTitle_0 */], toolbar_title_ngfactory["a" /* RenderType_ToolbarTitle */])), core["_30" /* ɵdid */](4, 49152, null, 0, toolbar_title["a" /* ToolbarTitle */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n            "])), (_l()(), core["_31" /* ɵeld */](6, 0, null, 0, 2, "core-timer", [["align", "center"]], null, [[null, "finished"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("finished" === en)) {
        var pd_0 = (_co.timeUp() !== false);
        ad = (pd_0 && ad);
    } return ad; }, timer_ngfactory["b" /* View_CoreTimerComponent_0 */], timer_ngfactory["a" /* RenderType_CoreTimerComponent */])), core["_30" /* ɵdid */](7, 245760, null, 0, timer["a" /* CoreTimerComponent */], [time["a" /* CoreTimeUtilsProvider */]], { endTime: [0, "endTime"], timerText: [1, "timerText"], align: [2, "align"] }, { finished: "finished" }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n        "])), (_l()(), core["_31" /* ɵeld */](11, 0, null, 2, 9, "ion-buttons", [["end", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](12, 16384, null, 1, toolbar_item["a" /* ToolbarItem */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), core["_52" /* ɵqud */](603979776, 4, { _buttons: 1 }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModQuizPlayerPage_4)), core["_30" /* ɵdid */](16, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModQuizPlayerPage_5)), core["_30" /* ɵdid */](19, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n    "]))], function (_ck, _v) { var _co = _v.component; var currVal_1 = "light"; _ck(_v, 1, 0, currVal_1); var currVal_2 = _co.endTime; var currVal_3 = core["_56" /* ɵunv */](_v, 7, 1, core["_44" /* ɵnov */](_v, 8).transform("addon.mod_quiz.timeleft")); var currVal_4 = "center"; _ck(_v, 7, 0, currVal_2, currVal_3, currVal_4); var currVal_5 = (_co.previousPage >= 0); _ck(_v, 16, 0, currVal_5); var currVal_6 = (_co.nextPage >= (0 - 1)); _ck(_v, 19, 0, currVal_6); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 1)._sbPadding; _ck(_v, 0, 0, currVal_0); }); }
function View_AddonModQuizPlayerPage_7(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 6, "a", [["icon-only", ""], ["ion-button", ""]], [[8, "title", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.changePage(_co.previousPage) !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](1, 1097728, [[5, 4]], 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](4, 0, null, 0, 1, "ion-icon", [["md", "ios-arrow-back"], ["name", "arrow-back"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](5, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"], md: [1, "md"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                "]))], function (_ck, _v) { var currVal_2 = "arrow-back"; var currVal_3 = "ios-arrow-back"; _ck(_v, 5, 0, currVal_2, currVal_3); }, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 0, 0, core["_44" /* ɵnov */](_v, 2).transform("core.previous")); _ck(_v, 0, 0, currVal_0); var currVal_1 = core["_44" /* ɵnov */](_v, 5)._hidden; _ck(_v, 4, 0, currVal_1); }); }
function View_AddonModQuizPlayerPage_8(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 6, "a", [["icon-only", ""], ["ion-button", ""]], [[8, "title", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.changePage(_co.nextPage) !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](1, 1097728, [[5, 4]], 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](4, 0, null, 0, 1, "ion-icon", [["md", "ios-arrow-forward"], ["name", "arrow-forward"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](5, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"], md: [1, "md"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                "]))], function (_ck, _v) { var currVal_2 = "arrow-forward"; var currVal_3 = "ios-arrow-forward"; _ck(_v, 5, 0, currVal_2, currVal_3); }, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 0, 0, core["_44" /* ɵnov */](_v, 2).transform("core.next")); _ck(_v, 0, 0, currVal_0); var currVal_1 = core["_44" /* ɵnov */](_v, 5)._hidden; _ck(_v, 4, 0, currVal_1); }); }
function View_AddonModQuizPlayerPage_6(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 13, "ion-toolbar", [["class", "toolbar"], ["color", "light"]], [[2, "statusbar-padding", null]], null, null, toolbar_ngfactory["b" /* View_Toolbar_0 */], toolbar_ngfactory["a" /* RenderType_Toolbar */])), core["_30" /* ɵdid */](1, 49152, null, 0, toolbar["a" /* Toolbar */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { color: [0, "color"] }, null), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n            "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, 2, 9, "ion-buttons", [["end", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](4, 16384, null, 1, toolbar_item["a" /* ToolbarItem */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), core["_52" /* ɵqud */](603979776, 5, { _buttons: 1 }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModQuizPlayerPage_7)), core["_30" /* ɵdid */](8, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModQuizPlayerPage_8)), core["_30" /* ɵdid */](11, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n        "]))], function (_ck, _v) { var _co = _v.component; var currVal_1 = "light"; _ck(_v, 1, 0, currVal_1); var currVal_2 = (_co.previousPage >= 0); _ck(_v, 8, 0, currVal_2); var currVal_3 = (_co.nextPage >= (0 - 1)); _ck(_v, 11, 0, currVal_3); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 1)._sbPadding; _ck(_v, 0, 0, currVal_0); }); }
function View_AddonModQuizPlayerPage_9(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 6, "div", [["padding", ""]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](2, 0, null, null, 3, "button", [["block", ""], ["ion-button", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.start() !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](3, 1097728, null, 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { block: [0, "block"] }, null), (_l()(), core["_55" /* ɵted */](4, 0, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "]))], function (_ck, _v) { var currVal_0 = ""; _ck(_v, 3, 0, currVal_0); }, function (_ck, _v) { var currVal_1 = core["_56" /* ɵunv */](_v, 4, 0, core["_44" /* ɵnov */](_v, 5).transform("addon.mod_quiz.startattempt")); _ck(_v, 4, 0, currVal_1); }); }
function View_AddonModQuizPlayerPage_12(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 3, "h2", [["class", "inline"]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](1, null, ["", ""])), core["_48" /* ɵpod */](2, { $a: 0 }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], null, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 1, 0, core["_44" /* ɵnov */](_v, 3).transform("core.question.questionno", _ck(_v, 2, 0, _v.parent.context.$implicit.number))); _ck(_v, 1, 0, currVal_0); }); }
function View_AddonModQuizPlayerPage_13(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "h2", [["class", "inline"]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](1, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], null, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 1, 0, core["_44" /* ɵnov */](_v, 2).transform("core.question.information")); _ck(_v, 1, 0, currVal_0); }); }
function View_AddonModQuizPlayerPage_15(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "p", [["class", "block"]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](1, null, ["", ""]))], null, function (_ck, _v) { var currVal_0 = _v.parent.parent.context.$implicit.status; _ck(_v, 1, 0, currVal_0); }); }
function View_AddonModQuizPlayerPage_16(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "p", [], null, null, null, null, null)), (_l()(), core["_31" /* ɵeld */](1, 0, null, null, 1, "core-format-text", [], null, null, null, null, null)), core["_30" /* ɵdid */](2, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform["a" /* Platform */], utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], providers_logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], app["a" /* CoreAppProvider */], contentlinks_providers_helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */]], { text: [0, "text"] }, null)], function (_ck, _v) { var currVal_0 = _v.parent.parent.context.$implicit.readableMark; _ck(_v, 2, 0, currVal_0); }, null); }
function View_AddonModQuizPlayerPage_14(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 8, "ion-note", [["item-end", ""], ["text-wrap", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, note["a" /* Note */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModQuizPlayerPage_15)), core["_30" /* ɵdid */](4, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModQuizPlayerPage_16)), core["_30" /* ɵdid */](7, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "]))], function (_ck, _v) { var currVal_0 = _v.parent.context.$implicit.status; _ck(_v, 4, 0, currVal_0); var currVal_1 = _v.parent.context.$implicit.readableMark; _ck(_v, 7, 0, currVal_1); }, null); }
function View_AddonModQuizPlayerPage_11(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 27, "div", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ɵeld */](2, 0, null, null, 24, "ion-card", [], [[8, "id", 0]], null, null, null, null)), core["_30" /* ɵdid */](3, 16384, null, 0, card["a" /* Card */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](6, 0, null, null, 15, "ion-item-divider", [["class", "item item-divider"]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](7, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 6, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 7, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 8, { _icons: 1 }), core["_30" /* ɵdid */](11, 16384, null, 0, item_divider["a" /* ItemDivider */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 2, 1, null, View_AddonModQuizPlayerPage_12)), core["_30" /* ɵdid */](14, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 2, 1, null, View_AddonModQuizPlayerPage_13)), core["_30" /* ɵdid */](17, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 4, 1, null, View_AddonModQuizPlayerPage_14)), core["_30" /* ɵdid */](20, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](24, 0, null, null, 1, "core-question", [["text-wrap", ""]], null, [[null, "onAbort"], [null, "buttonClicked"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("onAbort" === en)) {
        var pd_0 = (_co.abortQuiz() !== false);
        ad = (pd_0 && ad);
    } if (("buttonClicked" === en)) {
        var pd_1 = (_co.behaviourButtonClicked($event) !== false);
        ad = (pd_1 && ad);
    } return ad; }, question_ngfactory["b" /* View_CoreQuestionComponent_0 */], question_ngfactory["a" /* RenderType_CoreQuestionComponent */])), core["_30" /* ɵdid */](25, 114688, [[2, 4]], 0, question["a" /* CoreQuestionComponent */], [providers_logger["a" /* CoreLoggerProvider */], core["C" /* Injector */], delegate["a" /* CoreQuestionDelegate */], utils["a" /* CoreUtilsProvider */], behaviour_delegate["a" /* CoreQuestionBehaviourDelegate */], helper["a" /* CoreQuestionHelperProvider */], translate_service["a" /* TranslateService */], providers_question["a" /* CoreQuestionProvider */], dom["a" /* CoreDomUtilsProvider */], core["j" /* ChangeDetectorRef */]], { question: [0, "question"], component: [1, "component"], componentId: [2, "componentId"], attemptId: [3, "attemptId"], usageId: [4, "usageId"], offlineEnabled: [5, "offlineEnabled"] }, { buttonClicked: "buttonClicked", onAbort: "onAbort" }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "]))], function (_ck, _v) { var _co = _v.component; var currVal_1 = _v.context.$implicit.number; _ck(_v, 14, 0, currVal_1); var currVal_2 = !_v.context.$implicit.number; _ck(_v, 17, 0, currVal_2); var currVal_3 = (_v.context.$implicit.status || _v.context.$implicit.readableMark); _ck(_v, 20, 0, currVal_3); var currVal_4 = _v.context.$implicit; var currVal_5 = _co.component; var currVal_6 = _co.quiz.coursemodule; var currVal_7 = _co.attempt.id; var currVal_8 = _co.attempt.uniqueid; var currVal_9 = _co.offline; _ck(_v, 25, 0, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8, currVal_9); }, function (_ck, _v) { var currVal_0 = core["_34" /* ɵinlineInterpolate */](1, "addon-mod_quiz-question-", _v.context.$implicit.slot, ""); _ck(_v, 2, 0, currVal_0); }); }
function View_AddonModQuizPlayerPage_10(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 8, "form", [["name", "addon-mod_quiz-player-form"], ["novalidate", ""]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "submit"], [null, "reset"]], function (_v, en, $event) { var ad = true; if (("submit" === en)) {
        var pd_0 = (core["_44" /* ɵnov */](_v, 2).onSubmit($event) !== false);
        ad = (pd_0 && ad);
    } if (("reset" === en)) {
        var pd_1 = (core["_44" /* ɵnov */](_v, 2).onReset() !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, esm5_forms["w" /* ɵbf */], [], null, null), core["_30" /* ɵdid */](2, 4210688, null, 0, esm5_forms["p" /* NgForm */], [[8, null], [8, null]], null, null), core["_50" /* ɵprd */](2048, null, esm5_forms["b" /* ControlContainer */], null, [esm5_forms["p" /* NgForm */]]), core["_30" /* ɵdid */](4, 16384, null, 0, esm5_forms["o" /* NgControlStatusGroup */], [esm5_forms["b" /* ControlContainer */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModQuizPlayerPage_11)), core["_30" /* ɵdid */](7, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "]))], function (_ck, _v) { var _co = _v.component; var currVal_7 = _co.questions; _ck(_v, 7, 0, currVal_7); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 4).ngClassUntouched; var currVal_1 = core["_44" /* ɵnov */](_v, 4).ngClassTouched; var currVal_2 = core["_44" /* ɵnov */](_v, 4).ngClassPristine; var currVal_3 = core["_44" /* ɵnov */](_v, 4).ngClassDirty; var currVal_4 = core["_44" /* ɵnov */](_v, 4).ngClassValid; var currVal_5 = core["_44" /* ɵnov */](_v, 4).ngClassInvalid; var currVal_6 = core["_44" /* ɵnov */](_v, 4).ngClassPending; _ck(_v, 0, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6); }); }
function View_AddonModQuizPlayerPage_18(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 10, "ion-col", [["class", "col"]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, col["a" /* Col */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 6, "button", [["block", ""], ["color", "light"], ["icon-start", ""], ["ion-button", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.changePage(_co.previousPage) !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](4, 1097728, null, 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { color: [0, "color"], block: [1, "block"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](6, 0, null, 0, 1, "ion-icon", [["md", "ios-arrow-back"], ["name", "arrow-back"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](7, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"], md: [1, "md"] }, null), (_l()(), core["_55" /* ɵted */](8, 0, ["\n                        ", "\n                    "])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "]))], function (_ck, _v) { var currVal_0 = "light"; var currVal_1 = ""; _ck(_v, 4, 0, currVal_0, currVal_1); var currVal_3 = "arrow-back"; var currVal_4 = "ios-arrow-back"; _ck(_v, 7, 0, currVal_3, currVal_4); }, function (_ck, _v) { var currVal_2 = core["_44" /* ɵnov */](_v, 7)._hidden; _ck(_v, 6, 0, currVal_2); var currVal_5 = core["_56" /* ɵunv */](_v, 8, 0, core["_44" /* ɵnov */](_v, 9).transform("core.previous")); _ck(_v, 8, 0, currVal_5); }); }
function View_AddonModQuizPlayerPage_19(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 10, "ion-col", [["class", "col"]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, col["a" /* Col */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 6, "button", [["block", ""], ["icon-end", ""], ["ion-button", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.changePage(_co.nextPage) !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](4, 1097728, null, 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { block: [0, "block"] }, null), (_l()(), core["_55" /* ɵted */](5, 0, ["\n                        ", "\n                        "])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_31" /* ɵeld */](7, 0, null, 0, 1, "ion-icon", [["md", "ios-arrow-forward"], ["name", "arrow-forward"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](8, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"], md: [1, "md"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "]))], function (_ck, _v) { var currVal_0 = ""; _ck(_v, 4, 0, currVal_0); var currVal_3 = "arrow-forward"; var currVal_4 = "ios-arrow-forward"; _ck(_v, 8, 0, currVal_3, currVal_4); }, function (_ck, _v) { var currVal_1 = core["_56" /* ɵunv */](_v, 5, 0, core["_44" /* ɵnov */](_v, 6).transform("core.next")); _ck(_v, 5, 0, currVal_1); var currVal_2 = core["_44" /* ɵnov */](_v, 8)._hidden; _ck(_v, 7, 0, currVal_2); }); }
function View_AddonModQuizPlayerPage_17(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 12, "ion-grid", [["class", "grid"], ["text-wrap", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, grid["a" /* Grid */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 8, "ion-row", [["class", "row"]], null, null, null, null, null)), core["_30" /* ɵdid */](4, 16384, null, 0, row["a" /* Row */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModQuizPlayerPage_18)), core["_30" /* ɵdid */](7, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModQuizPlayerPage_19)), core["_30" /* ɵdid */](10, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = (_co.previousPage >= 0); _ck(_v, 7, 0, currVal_0); var currVal_1 = (_co.nextPage >= (0 - 1)); _ck(_v, 10, 0, currVal_1); }, null); }
function View_AddonModQuizPlayerPage_22(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 20, "a", [["class", "item item-block"], ["ion-item", ""]], [[1, "aria-label", 0], [1, "detail-push", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.changePage(_v.parent.context.$implicit.page, false, _v.parent.context.$implicit.slot) !== false);
        ad = (pd_0 && ad);
    } return ad; }, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 12, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 13, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 14, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), core["_48" /* ɵpod */](6, { $a: 0 }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](9, 0, null, 2, 10, "ion-row", [["align-items-center", ""], ["class", "row"]], null, null, null, null, null)), core["_30" /* ɵdid */](10, 16384, null, 0, row["a" /* Row */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](12, 0, null, null, 2, "ion-col", [["class", "col"], ["col-3", ""], ["text-center", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](13, 16384, null, 0, col["a" /* Col */], [], null, null), (_l()(), core["_55" /* ɵted */](14, null, ["", ""])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](16, 0, null, null, 2, "ion-col", [["class", "col"], ["col-9", ""], ["text-center", ""], ["text-wrap", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](17, 16384, null, 0, col["a" /* Col */], [], null, null), (_l()(), core["_55" /* ɵted */](18, null, ["", ""])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = core["_56" /* ɵunv */](_v, 0, 0, core["_44" /* ɵnov */](_v, 7).transform("core.question.questionno", _ck(_v, 6, 0, _v.parent.context.$implicit.number))); var currVal_1 = ((!_co.quiz.isSequential && _co.canReturn) ? true : null); _ck(_v, 0, 0, currVal_0, currVal_1); var currVal_2 = _v.parent.context.$implicit.number; _ck(_v, 14, 0, currVal_2); var currVal_3 = _v.parent.context.$implicit.status; _ck(_v, 18, 0, currVal_3); }); }
function View_AddonModQuizPlayerPage_21(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 4, null, null, null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModQuizPlayerPage_22)), core["_30" /* ɵdid */](3, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "]))], function (_ck, _v) { var currVal_0 = _v.context.$implicit.number; _ck(_v, 3, 0, currVal_0); }, null); }
function View_AddonModQuizPlayerPage_23(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 11, "ion-item", [["class", "item item-block"]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 15, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 16, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 17, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 2, 3, "a", [["block", ""], ["ion-button", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.changePage(_co.attempt.currentpage) !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](8, 1097728, [[16, 4]], 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { block: [0, "block"] }, null), (_l()(), core["_55" /* ɵted */](9, 0, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "]))], function (_ck, _v) { var currVal_0 = ""; _ck(_v, 8, 0, currVal_0); }, function (_ck, _v) { var currVal_1 = core["_56" /* ɵunv */](_v, 9, 0, core["_44" /* ɵnov */](_v, 10).transform("addon.mod_quiz.returnattempt")); _ck(_v, 9, 0, currVal_1); }); }
function View_AddonModQuizPlayerPage_24(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 6, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 18, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 19, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 20, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](6, 2, ["\n                ", "\n            "]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.attempt.dueDateWarning; _ck(_v, 6, 0, currVal_0); }); }
function View_AddonModQuizPlayerPage_25(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "core-timer", [], null, [[null, "finished"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("finished" === en)) {
        var pd_0 = (_co.timeUp() !== false);
        ad = (pd_0 && ad);
    } return ad; }, timer_ngfactory["b" /* View_CoreTimerComponent_0 */], timer_ngfactory["a" /* RenderType_CoreTimerComponent */])), core["_30" /* ɵdid */](1, 245760, null, 0, timer["a" /* CoreTimerComponent */], [time["a" /* CoreTimeUtilsProvider */]], { endTime: [0, "endTime"], timerText: [1, "timerText"] }, { finished: "finished" }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.endTime; var currVal_1 = core["_56" /* ɵunv */](_v, 1, 1, core["_44" /* ɵnov */](_v, 2).transform("addon.mod_quiz.timeleft")); _ck(_v, 1, 0, currVal_0, currVal_1); }, null); }
function View_AddonModQuizPlayerPage_27(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "p", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](1, null, ["", ""]))], null, function (_ck, _v) { var currVal_0 = _v.context.$implicit; _ck(_v, 1, 0, currVal_0); }); }
function View_AddonModQuizPlayerPage_26(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 22, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 21, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 22, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 23, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 2, 2, "p", [["class", "item-heading"]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](8, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, 2, 1, null, View_AddonModQuizPlayerPage_27)), core["_30" /* ɵdid */](12, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](14, 0, null, 2, 7, "a", [["block", ""], ["core-link", ""], ["icon-end", ""], ["ion-button", ""]], [[8, "href", 4]], null, null, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](15, 81920, null, 0, directives_link["a" /* CoreLinkDirective */], [core["t" /* ElementRef */], dom["a" /* CoreDomUtilsProvider */], utils["a" /* CoreUtilsProvider */], sites["a" /* CoreSitesProvider */], url["a" /* CoreUrlUtilsProvider */], contentlinks_providers_helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], utils_text["a" /* CoreTextUtilsProvider */]], null, null), core["_30" /* ɵdid */](16, 1097728, [[22, 4]], 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { block: [0, "block"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](18, 0, null, 0, 1, "ion-icon", [["name", "open"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](19, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ɵted */](20, 0, ["\n                    ", "\n                "])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "]))], function (_ck, _v) { var _co = _v.component; var currVal_1 = _co.preventSubmitMessages; _ck(_v, 12, 0, currVal_1); _ck(_v, 15, 0); var currVal_3 = ""; _ck(_v, 16, 0, currVal_3); var currVal_5 = "open"; _ck(_v, 19, 0, currVal_5); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = core["_56" /* ɵunv */](_v, 8, 0, core["_44" /* ɵnov */](_v, 9).transform("addon.mod_quiz.cannotsubmitquizdueto")); _ck(_v, 8, 0, currVal_0); var currVal_2 = _co.moduleUrl; _ck(_v, 14, 0, currVal_2); var currVal_4 = core["_44" /* ɵnov */](_v, 19)._hidden; _ck(_v, 18, 0, currVal_4); var currVal_6 = core["_56" /* ɵunv */](_v, 20, 0, core["_44" /* ɵnov */](_v, 21).transform("core.openinbrowser")); _ck(_v, 20, 0, currVal_6); }); }
function View_AddonModQuizPlayerPage_28(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 11, "ion-item", [["class", "item item-block"]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 24, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 25, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 26, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 2, 3, "a", [["block", ""], ["ion-button", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.finishAttempt(true) !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](8, 1097728, [[25, 4]], 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { block: [0, "block"] }, null), (_l()(), core["_55" /* ɵted */](9, 0, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "]))], function (_ck, _v) { var currVal_0 = ""; _ck(_v, 8, 0, currVal_0); }, function (_ck, _v) { var currVal_1 = core["_56" /* ɵunv */](_v, 9, 0, core["_44" /* ɵnov */](_v, 10).transform("addon.mod_quiz.submitallandfinish")); _ck(_v, 9, 0, currVal_1); }); }
function View_AddonModQuizPlayerPage_20(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 64, "ion-card", [["class", "addon-mod_quiz-table"]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, card["a" /* Card */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 6, "ion-card-header", [["text-wrap", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](4, 16384, null, 0, card_header["a" /* CardHeader */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ɵeld */](6, 0, null, null, 2, "h2", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](7, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](12, 0, null, null, 27, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](13, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 9, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 10, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 11, { _icons: 1 }), core["_30" /* ɵdid */](17, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](19, 0, null, 2, 19, "ion-row", [["align-items-center", ""], ["class", "row"]], null, null, null, null, null)), core["_30" /* ɵdid */](20, 16384, null, 0, row["a" /* Row */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](22, 0, null, null, 4, "ion-col", [["class", "hidden-phone col"], ["col-3", ""], ["text-center", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](23, 16384, null, 0, col["a" /* Col */], [], null, null), (_l()(), core["_31" /* ɵeld */](24, 0, null, null, 2, "b", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](25, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](28, 0, null, null, 3, "ion-col", [["class", "hidden-tablet col"], ["col-3", ""], ["text-center", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](29, 16384, null, 0, col["a" /* Col */], [], null, null), (_l()(), core["_31" /* ɵeld */](30, 0, null, null, 1, "b", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["#"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](33, 0, null, null, 4, "ion-col", [["class", "col"], ["col-9", ""], ["text-center", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](34, 16384, null, 0, col["a" /* Col */], [], null, null), (_l()(), core["_31" /* ɵeld */](35, 0, null, null, 2, "b", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](36, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModQuizPlayerPage_21)), core["_30" /* ɵdid */](43, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModQuizPlayerPage_23)), core["_30" /* ɵdid */](47, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModQuizPlayerPage_24)), core["_30" /* ɵdid */](51, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModQuizPlayerPage_25)), core["_30" /* ɵdid */](55, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModQuizPlayerPage_26)), core["_30" /* ɵdid */](59, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModQuizPlayerPage_28)), core["_30" /* ɵdid */](63, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "]))], function (_ck, _v) { var _co = _v.component; var currVal_3 = _co.summaryQuestions; _ck(_v, 43, 0, currVal_3); var currVal_4 = _co.canReturn; _ck(_v, 47, 0, currVal_4); var currVal_5 = _co.attempt.dueDateWarning; _ck(_v, 51, 0, currVal_5); var currVal_6 = _co.endTime; _ck(_v, 55, 0, currVal_6); var currVal_7 = _co.preventSubmitMessages.length; _ck(_v, 59, 0, currVal_7); var currVal_8 = (!_co.attempt.finishedOffline && !_co.preventSubmitMessages.length); _ck(_v, 63, 0, currVal_8); }, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 7, 0, core["_44" /* ɵnov */](_v, 8).transform("addon.mod_quiz.summaryofattempt")); _ck(_v, 7, 0, currVal_0); var currVal_1 = core["_56" /* ɵunv */](_v, 25, 0, core["_44" /* ɵnov */](_v, 26).transform("addon.mod_quiz.question")); _ck(_v, 25, 0, currVal_1); var currVal_2 = core["_56" /* ɵunv */](_v, 36, 0, core["_44" /* ɵnov */](_v, 37).transform("addon.mod_quiz.status")); _ck(_v, 36, 0, currVal_2); }); }
function View_AddonModQuizPlayerPage_29(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 31, "ion-card", [], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, card["a" /* Card */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 10, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](4, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 27, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 28, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 29, { _icons: 1 }), core["_30" /* ɵdid */](8, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](10, 0, null, 2, 2, "p", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](11, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](15, 0, null, null, 15, "ion-item", [["class", "item item-block"]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](16, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 30, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 31, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 32, { _icons: 1 }), core["_30" /* ɵdid */](20, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](22, 0, null, 2, 7, "a", [["block", ""], ["core-link", ""], ["icon-end", ""], ["ion-button", ""]], [[8, "href", 4]], null, null, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](23, 81920, null, 0, directives_link["a" /* CoreLinkDirective */], [core["t" /* ElementRef */], dom["a" /* CoreDomUtilsProvider */], utils["a" /* CoreUtilsProvider */], sites["a" /* CoreSitesProvider */], url["a" /* CoreUrlUtilsProvider */], contentlinks_providers_helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], utils_text["a" /* CoreTextUtilsProvider */]], null, null), core["_30" /* ɵdid */](24, 1097728, [[31, 4]], 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { block: [0, "block"] }, null), (_l()(), core["_55" /* ɵted */](25, 0, ["\n                    ", "\n                    "])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_31" /* ɵeld */](27, 0, null, 0, 1, "ion-icon", [["name", "open"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](28, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                "])), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "]))], function (_ck, _v) { _ck(_v, 23, 0); var currVal_2 = ""; _ck(_v, 24, 0, currVal_2); var currVal_5 = "open"; _ck(_v, 28, 0, currVal_5); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = core["_56" /* ɵunv */](_v, 11, 0, core["_44" /* ɵnov */](_v, 12).transform("addon.mod_quiz.errorparsequestions")); _ck(_v, 11, 0, currVal_0); var currVal_1 = _co.moduleUrl; _ck(_v, 22, 0, currVal_1); var currVal_3 = core["_56" /* ɵunv */](_v, 25, 0, core["_44" /* ɵnov */](_v, 26).transform("core.openinbrowser")); _ck(_v, 25, 0, currVal_3); var currVal_4 = core["_44" /* ɵnov */](_v, 28)._hidden; _ck(_v, 27, 0, currVal_4); }); }
function View_AddonModQuizPlayerPage_0(_l) { return core["_57" /* ɵvid */](0, [core["_52" /* ɵqud */](402653184, 1, { content: 0 }), core["_52" /* ɵqud */](671088640, 2, { questionComponents: 1 }), (_l()(), core["_31" /* ɵeld */](2, 0, null, null, 28, "ion-header", [], null, null, null, null, null)), core["_30" /* ɵdid */](3, 16384, null, 0, toolbar_header["a" /* Header */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, view_controller["a" /* ViewController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_31" /* ɵeld */](5, 0, null, null, 24, "ion-navbar", [["class", "toolbar"], ["core-back-button", ""]], [[8, "hidden", 0], [2, "statusbar-padding", null]], null, null, navbar_ngfactory["b" /* View_Navbar_0 */], navbar_ngfactory["a" /* RenderType_Navbar */])), core["_30" /* ɵdid */](6, 49152, null, 0, navbar["a" /* Navbar */], [app_app["a" /* App */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_30" /* ɵdid */](7, 212992, null, 0, back_button["a" /* CoreBackButtonDirective */], [navbar["a" /* Navbar */], platform["a" /* Platform */], translate_service["a" /* TranslateService */], events["a" /* CoreEventsProvider */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n        "])), (_l()(), core["_31" /* ɵeld */](9, 0, null, 3, 3, "ion-title", [], null, null, null, toolbar_title_ngfactory["b" /* View_ToolbarTitle_0 */], toolbar_title_ngfactory["a" /* RenderType_ToolbarTitle */])), core["_30" /* ɵdid */](10, 49152, null, 0, toolbar_title["a" /* ToolbarTitle */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonModQuizPlayerPage_1)), core["_30" /* ɵdid */](12, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n\n        "])), (_l()(), core["_31" /* ɵeld */](14, 0, null, 2, 14, "ion-buttons", [["end", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](15, 16384, null, 1, toolbar_item["a" /* ToolbarItem */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), core["_52" /* ɵqud */](603979776, 3, { _buttons: 1 }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](18, 0, null, null, 6, "button", [["icon-only", ""], ["id", "addon-mod_quiz-connection-error-button"], ["ion-button", ""]], [[8, "hidden", 0], [1, "aria-label", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.showConnectionError($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](19, 1097728, [[3, 4]], 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                "])), (_l()(), core["_31" /* ɵeld */](22, 0, null, 0, 1, "ion-icon", [["name", "alert"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](23, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModQuizPlayerPage_2)), core["_30" /* ɵdid */](27, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_31" /* ɵeld */](32, 0, null, null, 34, "ion-content", [], [[2, "statusbar-padding", null], [2, "has-refresher", null]], null, null, content_ngfactory["b" /* View_Content_0 */], content_ngfactory["a" /* RenderType_Content */])), core["_30" /* ɵdid */](33, 4374528, [[1, 4]], 0, content["a" /* Content */], [config["a" /* Config */], platform["a" /* Platform */], dom_controller["a" /* DomController */], core["t" /* ElementRef */], core["V" /* Renderer */], app_app["a" /* App */], keyboard["a" /* Keyboard */], core["M" /* NgZone */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n    "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonModQuizPlayerPage_3)), core["_30" /* ɵdid */](37, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n    "])), (_l()(), core["_31" /* ɵeld */](39, 0, null, 1, 26, "core-loading", [], [[2, "core-has-fixed-timer", null]], null, null, loading_ngfactory["b" /* View_CoreLoadingComponent_0 */], loading_ngfactory["a" /* RenderType_CoreLoadingComponent */])), core["_30" /* ɵdid */](40, 638976, null, 0, loading["a" /* CoreLoadingComponent */], [translate_service["a" /* TranslateService */], core["t" /* ElementRef */], events["a" /* CoreEventsProvider */], utils["a" /* CoreUtilsProvider */]], { hideUntil: [0, "hideUntil"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonModQuizPlayerPage_6)), core["_30" /* ɵdid */](44, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonModQuizPlayerPage_9)), core["_30" /* ɵdid */](48, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n\n        "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonModQuizPlayerPage_10)), core["_30" /* ɵdid */](52, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n\n        "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonModQuizPlayerPage_17)), core["_30" /* ɵdid */](56, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n\n        "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonModQuizPlayerPage_20)), core["_30" /* ɵdid */](60, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n\n        "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonModQuizPlayerPage_29)), core["_30" /* ɵdid */](64, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; _ck(_v, 7, 0); var currVal_2 = _co.quiz; _ck(_v, 12, 0, currVal_2); var currVal_6 = "alert"; _ck(_v, 23, 0, currVal_6); var currVal_7 = (_co.navigation && _co.navigation.length); _ck(_v, 27, 0, currVal_7); var currVal_10 = (((((_co.loaded && _co.endTime) && _co.questions) && _co.questions.length) && !_co.quizAborted) && !_co.showSummary); _ck(_v, 37, 0, currVal_10); var currVal_12 = _co.loaded; _ck(_v, 40, 0, currVal_12); var currVal_13 = ((((!_co.endTime && _co.questions) && _co.questions.length) && !_co.quizAborted) && !_co.showSummary); _ck(_v, 44, 0, currVal_13); var currVal_14 = !_co.attempt; _ck(_v, 48, 0, currVal_14); var currVal_15 = (((_co.questions && _co.questions.length) && !_co.quizAborted) && !_co.showSummary); _ck(_v, 52, 0, currVal_15); var currVal_16 = (((_co.questions && _co.questions.length) && !_co.quizAborted) && !_co.showSummary); _ck(_v, 56, 0, currVal_16); var currVal_17 = (((!_co.quizAborted && _co.showSummary) && _co.summaryQuestions) && _co.summaryQuestions.length); _ck(_v, 60, 0, currVal_17); var currVal_18 = (_co.attempt && (((!_co.questions || !_co.questions.length) && !_co.showSummary) || _co.quizAborted)); _ck(_v, 64, 0, currVal_18); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = core["_44" /* ɵnov */](_v, 6)._hidden; var currVal_1 = core["_44" /* ɵnov */](_v, 6)._sbPadding; _ck(_v, 5, 0, currVal_0, currVal_1); var currVal_3 = !_co.autoSaveError; var currVal_4 = core["_56" /* ɵunv */](_v, 18, 1, core["_44" /* ɵnov */](_v, 20).transform("core.error")); _ck(_v, 18, 0, currVal_3, currVal_4); var currVal_5 = core["_44" /* ɵnov */](_v, 23)._hidden; _ck(_v, 22, 0, currVal_5); var currVal_8 = core["_44" /* ɵnov */](_v, 33).statusbarPadding; var currVal_9 = core["_44" /* ɵnov */](_v, 33)._hasRefresher; _ck(_v, 32, 0, currVal_8, currVal_9); var currVal_11 = _co.endTime; _ck(_v, 39, 0, currVal_11); }); }
function View_AddonModQuizPlayerPage_Host_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "page-addon-mod-quiz-player", [], null, null, null, View_AddonModQuizPlayerPage_0, RenderType_AddonModQuizPlayerPage)), core["_30" /* ɵdid */](1, 245760, null, 0, player_AddonModQuizPlayerPage, [nav_params["a" /* NavParams */], providers_logger["a" /* CoreLoggerProvider */], translate_service["a" /* TranslateService */], events["a" /* CoreEventsProvider */], sites["a" /* CoreSitesProvider */], sync["a" /* CoreSyncProvider */], dom["a" /* CoreDomUtilsProvider */], popover_controller["a" /* PopoverController */], time["a" /* CoreTimeUtilsProvider */], quiz["a" /* AddonModQuizProvider */], providers_helper["a" /* AddonModQuizHelperProvider */], quiz_sync["a" /* AddonModQuizSyncProvider */], helper["a" /* CoreQuestionHelperProvider */], core["j" /* ChangeDetectorRef */], modal_controller["a" /* ModalController */], nav_controller["a" /* NavController */]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var AddonModQuizPlayerPageNgFactory = core["_27" /* ɵccf */]("page-addon-mod-quiz-player", player_AddonModQuizPlayerPage, View_AddonModQuizPlayerPage_Host_0, {}, {}, []);

//# sourceMappingURL=player.ngfactory.js.map
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

// CONCATENATED MODULE: ./src/addon/mod/quiz/pages/player/player.module.ngfactory.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddonModQuizPlayerPageModuleNgFactory", function() { return AddonModQuizPlayerPageModuleNgFactory; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
































var AddonModQuizPlayerPageModuleNgFactory = core["_28" /* ɵcmf */](player_module_AddonModQuizPlayerPageModule, [], function (_l) { return core["_40" /* ɵmod */]([core["_41" /* ɵmpd */](512, core["o" /* ComponentFactoryResolver */], core["_21" /* ɵCodegenComponentFactoryResolver */], [[8, [action_sheet_component_ngfactory["a" /* ActionSheetCmpNgFactory */], alert_component_ngfactory["a" /* AlertCmpNgFactory */], app_root_ngfactory["a" /* IonicAppNgFactory */], loading_component_ngfactory["a" /* LoadingCmpNgFactory */], modal_component_ngfactory["a" /* ModalCmpNgFactory */], picker_component_ngfactory["a" /* PickerCmpNgFactory */], popover_component_ngfactory["a" /* PopoverCmpNgFactory */], select_popover_component_ngfactory["a" /* SelectPopoverNgFactory */], toast_component_ngfactory["a" /* ToastCmpNgFactory */], context_menu_popover_ngfactory["a" /* CoreContextMenuPopoverComponentNgFactory */], course_picker_menu_popover_ngfactory["a" /* CoreCoursePickerMenuPopoverComponentNgFactory */], recaptchamodal_ngfactory["a" /* CoreRecaptchaModalComponentNgFactory */], bs_tooltip_ngfactory["a" /* CoreBSTooltipComponentNgFactory */], AddonModQuizPlayerPageNgFactory]], [3, core["o" /* ComponentFactoryResolver */]], core["K" /* NgModuleRef */]]), core["_41" /* ɵmpd */](4608, common["m" /* NgLocalization */], common["l" /* NgLocaleLocalization */], [core["G" /* LOCALE_ID */], [2, common["w" /* ɵa */]]]), core["_41" /* ɵmpd */](4608, esm5_forms["x" /* ɵi */], esm5_forms["x" /* ɵi */], []), core["_41" /* ɵmpd */](4608, esm5_forms["d" /* FormBuilder */], esm5_forms["d" /* FormBuilder */], []), core["_41" /* ɵmpd */](4608, translate_loader["b" /* TranslateLoader */], translate_loader["a" /* TranslateFakeLoader */], []), core["_41" /* ɵmpd */](4608, translate_compiler["a" /* TranslateCompiler */], translate_compiler["b" /* TranslateFakeCompiler */], []), core["_41" /* ɵmpd */](4608, translate_parser["b" /* TranslateParser */], translate_parser["a" /* TranslateDefaultParser */], []), core["_41" /* ɵmpd */](4608, missing_translation_handler["b" /* MissingTranslationHandler */], missing_translation_handler["a" /* FakeMissingTranslationHandler */], []), core["_41" /* ɵmpd */](4608, translate_service["a" /* TranslateService */], translate_service["a" /* TranslateService */], [translate_store["a" /* TranslateStore */], translate_loader["b" /* TranslateLoader */], translate_compiler["a" /* TranslateCompiler */], translate_parser["b" /* TranslateParser */], missing_translation_handler["b" /* MissingTranslationHandler */], translate_service["b" /* USE_DEFAULT_LANG */], translate_service["c" /* USE_STORE */]]), core["_41" /* ɵmpd */](512, common["b" /* CommonModule */], common["b" /* CommonModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["v" /* ɵba */], esm5_forms["v" /* ɵba */], []), core["_41" /* ɵmpd */](512, esm5_forms["i" /* FormsModule */], esm5_forms["i" /* FormsModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["s" /* ReactiveFormsModule */], esm5_forms["s" /* ReactiveFormsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["a" /* IonicModule */], ionic_angular_module["a" /* IonicModule */], []), core["_41" /* ɵmpd */](512, _ngx_translate_core["b" /* TranslateModule */], _ngx_translate_core["b" /* TranslateModule */], []), core["_41" /* ɵmpd */](512, directives_module["a" /* CoreDirectivesModule */], directives_module["a" /* CoreDirectivesModule */], []), core["_41" /* ɵmpd */](512, pipes_module["a" /* CorePipesModule */], pipes_module["a" /* CorePipesModule */], []), core["_41" /* ɵmpd */](512, components_module["a" /* CoreComponentsModule */], components_module["a" /* CoreComponentsModule */], []), core["_41" /* ɵmpd */](512, components_components_module["a" /* CoreQuestionComponentsModule */], components_components_module["a" /* CoreQuestionComponentsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["b" /* IonicPageModule */], ionic_angular_module["b" /* IonicPageModule */], []), core["_41" /* ɵmpd */](512, player_module_AddonModQuizPlayerPageModule, player_module_AddonModQuizPlayerPageModule, []), core["_41" /* ɵmpd */](256, translate_service["c" /* USE_STORE */], undefined, []), core["_41" /* ɵmpd */](256, translate_service["b" /* USE_DEFAULT_LANG */], undefined, []), core["_41" /* ɵmpd */](256, module_loader["a" /* LAZY_LOADED_TOKEN */], player_AddonModQuizPlayerPage, [])]); });

//# sourceMappingURL=player.module.ngfactory.js.map

/***/ }),

/***/ 2113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RenderType_Toolbar; });
/* harmony export (immutable) */ __webpack_exports__["b"] = View_Toolbar_0;
/* unused harmony export View_Toolbar_Host_0 */
/* unused harmony export ToolbarNgFactory */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__toolbar__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_config__ = __webpack_require__(7);
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 




var styles_Toolbar = [];
var RenderType_Toolbar = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_Toolbar, data: {} });

function View_Toolbar_0(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](2, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 1, "div", [["class", "toolbar-background"]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](1, 278528, null, 0, __WEBPACK_IMPORTED_MODULE_1__angular_common__["i" /* NgClass */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* IterableDiffers */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* KeyValueDiffers */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Renderer2 */]], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_43" /* ɵncd */](null, 0), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_43" /* ɵncd */](null, 1), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_43" /* ɵncd */](null, 2), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](5, 0, null, null, 2, "div", [["class", "toolbar-content"]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](6, 278528, null, 0, __WEBPACK_IMPORTED_MODULE_1__angular_common__["i" /* NgClass */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* IterableDiffers */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* KeyValueDiffers */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Renderer2 */]], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_43" /* ɵncd */](null, 3)], function (_ck, _v) { var _co = _v.component; var currVal_0 = "toolbar-background"; var currVal_1 = ("toolbar-background-" + _co._mode); _ck(_v, 1, 0, currVal_0, currVal_1); var currVal_2 = "toolbar-content"; var currVal_3 = ("toolbar-content-" + _co._mode); _ck(_v, 6, 0, currVal_2, currVal_3); }, null); }
function View_Toolbar_Host_0(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 1, "ion-toolbar", [["class", "toolbar"]], [[2, "statusbar-padding", null]], null, null, View_Toolbar_0, RenderType_Toolbar)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](1, 49152, null, 0, __WEBPACK_IMPORTED_MODULE_2__toolbar__["a" /* Toolbar */], [__WEBPACK_IMPORTED_MODULE_3__config_config__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */]], null, null)], null, function (_ck, _v) { var currVal_0 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 1)._sbPadding; _ck(_v, 0, 0, currVal_0); }); }
var ToolbarNgFactory = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_27" /* ɵccf */]("ion-toolbar", __WEBPACK_IMPORTED_MODULE_2__toolbar__["a" /* Toolbar */], View_Toolbar_Host_0, { color: "color", mode: "mode" }, {}, ["[menuToggle],ion-buttons[left]", "ion-buttons[start]", "ion-buttons[end],ion-buttons[right]", "*"]);

//# sourceMappingURL=toolbar.ngfactory.js.map

/***/ }),

/***/ 2119:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RenderType_CoreQuestionComponent; });
/* harmony export (immutable) */ __webpack_exports__["b"] = View_CoreQuestionComponent_0;
/* unused harmony export View_CoreQuestionComponent_Host_0 */
/* unused harmony export CoreQuestionComponentNgFactory */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_dynamic_component_dynamic_component_ngfactory__ = __webpack_require__(712);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_dynamic_component_dynamic_component__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_logger__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular_navigation_nav_controller__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_utils_dom__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core_src_translate_pipe__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core_src_translate_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__node_modules_ionic_angular_components_item_item_ngfactory__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ionic_angular_components_item_item__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ionic_angular_util_form__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ionic_angular_config_config__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ionic_angular_components_item_item_reorder__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_ionic_angular_components_item_item_content__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__node_modules_ionic_angular_components_button_button_ngfactory__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_ionic_angular_components_button_button__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__directives_format_text__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__providers_sites__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_utils_text__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_ionic_angular_platform_platform__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__providers_utils_utils__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__providers_utils_url__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__providers_filepool__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__providers_app__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__contentlinks_providers_helper__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25_ionic_angular_components_content_content__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__components_split_view_split_view__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__providers_utils_iframe__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__providers_events__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__angular_common__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__question__ = __webpack_require__(1500);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__providers_delegate__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__providers_behaviour_delegate__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__providers_helper__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__providers_question__ = __webpack_require__(123);
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
function View_CoreQuestionComponent_Host_0(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 1, "core-question", [], null, null, null, View_CoreQuestionComponent_0, RenderType_CoreQuestionComponent)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](1, 114688, null, 0, __WEBPACK_IMPORTED_MODULE_30__question__["a" /* CoreQuestionComponent */], [__WEBPACK_IMPORTED_MODULE_3__providers_logger__["a" /* CoreLoggerProvider */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injector */], __WEBPACK_IMPORTED_MODULE_31__providers_delegate__["a" /* CoreQuestionDelegate */], __WEBPACK_IMPORTED_MODULE_20__providers_utils_utils__["a" /* CoreUtilsProvider */], __WEBPACK_IMPORTED_MODULE_32__providers_behaviour_delegate__["a" /* CoreQuestionBehaviourDelegate */], __WEBPACK_IMPORTED_MODULE_33__providers_helper__["a" /* CoreQuestionHelperProvider */], __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_34__providers_question__["a" /* CoreQuestionProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_utils_dom__["a" /* CoreDomUtilsProvider */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var CoreQuestionComponentNgFactory = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_27" /* ɵccf */]("core-question", __WEBPACK_IMPORTED_MODULE_30__question__["a" /* CoreQuestionComponent */], View_CoreQuestionComponent_Host_0, { question: "question", component: "component", componentId: "componentId", attemptId: "attemptId", usageId: "usageId", offlineEnabled: "offlineEnabled" }, { buttonClicked: "buttonClicked", onAbort: "onAbort" }, []);

//# sourceMappingURL=question.ngfactory.js.map

/***/ }),

/***/ 2122:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RenderType_CoreTimerComponent; });
/* harmony export (immutable) */ __webpack_exports__["b"] = View_CoreTimerComponent_0;
/* unused harmony export View_CoreTimerComponent_Host_0 */
/* unused harmony export CoreTimerComponentNgFactory */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core_src_translate_pipe__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core_src_translate_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pipes_seconds_to_hms__ = __webpack_require__(1519);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_logger__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_utils_text__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__node_modules_ionic_angular_components_item_item_ngfactory__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ionic_angular_components_item_item__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ionic_angular_util_form__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ionic_angular_config_config__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ionic_angular_components_item_item_reorder__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ionic_angular_components_item_item_content__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ionic_angular_components_icon_icon__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__angular_common__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__timer__ = __webpack_require__(1505);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__providers_utils_time__ = __webpack_require__(24);
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
















var styles_CoreTimerComponent = [];
var RenderType_CoreTimerComponent = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_CoreTimerComponent, data: {} });

function View_CoreTimerComponent_1(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 1, "label", [], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](1, null, ["", ""]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.timerText; _ck(_v, 1, 0, currVal_0); }); }
function View_CoreTimerComponent_2(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 2, "span", [], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](1, null, ["", ""])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_49" /* ɵppd */](2, 1)], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_56" /* ɵunv */](_v, 1, 0, _ck(_v, 2, 0, __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v.parent, 0), _co.timeLeft)); _ck(_v, 1, 0, currVal_0); }); }
function View_CoreTimerComponent_3(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 2, "span", [["class", "core-timesup"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](1, null, ["", ""])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_47" /* ɵpid */](131072, __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core_src_translate_pipe__["a" /* TranslatePipe */], [__WEBPACK_IMPORTED_MODULE_2__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */]])], null, function (_ck, _v) { var currVal_0 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_56" /* ɵunv */](_v, 1, 0, __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 2).transform("core.timesup")); _ck(_v, 1, 0, currVal_0); }); }
function View_CoreTimerComponent_0(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_47" /* ɵpid */](0, __WEBPACK_IMPORTED_MODULE_3__pipes_seconds_to_hms__["a" /* CoreSecondsToHMSPipe */], [__WEBPACK_IMPORTED_MODULE_4__providers_logger__["a" /* CoreLoggerProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_utils_text__["a" /* CoreTextUtilsProvider */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_52" /* ɵqud */](402653184, 1, { containerRef: 0 }), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](2, 0, [[1, 0]], null, 18, "ion-item", [["class", "core-timer item item-block"], ["role", "timer"]], [[1, "text-center", 0], [1, "text-end", 0]], null, null, __WEBPACK_IMPORTED_MODULE_6__node_modules_ionic_angular_components_item_item_ngfactory__["b" /* View_Item_0 */], __WEBPACK_IMPORTED_MODULE_6__node_modules_ionic_angular_components_item_item_ngfactory__["a" /* RenderType_Item */])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](3, 1097728, [["container", 4]], 3, __WEBPACK_IMPORTED_MODULE_7_ionic_angular_components_item_item__["a" /* Item */], [__WEBPACK_IMPORTED_MODULE_8_ionic_angular_util_form__["a" /* Form */], __WEBPACK_IMPORTED_MODULE_9_ionic_angular_config_config__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */], [2, __WEBPACK_IMPORTED_MODULE_10_ionic_angular_components_item_item_reorder__["a" /* ItemReorder */]]], null, null), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_52" /* ɵqud */](335544320, 2, { contentLabel: 0 }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_52" /* ɵqud */](603979776, 3, { _buttons: 1 }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_52" /* ɵqud */](603979776, 4, { _icons: 1 }), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](7, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_11_ionic_angular_components_item_item_content__["a" /* ItemContent */], [], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 2, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](9, 0, null, 0, 1, "ion-icon", [["item-start", ""], ["name", "timer"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](10, 147456, [[4, 4]], 0, __WEBPACK_IMPORTED_MODULE_12_ionic_angular_components_icon_icon__["a" /* Icon */], [__WEBPACK_IMPORTED_MODULE_9_ionic_angular_config_config__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */]], { name: [0, "name"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 2, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_26" /* ɵand */](16777216, null, 2, 1, null, View_CoreTimerComponent_1)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](13, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_13__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewContainerRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 2, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_26" /* ɵand */](16777216, null, 2, 1, null, View_CoreTimerComponent_2)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](16, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_13__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewContainerRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 2, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_26" /* ɵand */](16777216, null, 2, 1, null, View_CoreTimerComponent_3)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](19, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_13__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewContainerRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, 2, ["\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_3 = "timer"; _ck(_v, 10, 0, currVal_3); var currVal_4 = ((_co.timeLeft > 0) && _co.timerText); _ck(_v, 13, 0, currVal_4); var currVal_5 = (_co.timeLeft > 0); _ck(_v, 16, 0, currVal_5); var currVal_6 = (_co.timeLeft <= 0); _ck(_v, 19, 0, currVal_6); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = ((_co.align == "center") ? true : null); var currVal_1 = ((_co.align == "right") ? true : null); _ck(_v, 2, 0, currVal_0, currVal_1); var currVal_2 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 10)._hidden; _ck(_v, 9, 0, currVal_2); }); }
function View_CoreTimerComponent_Host_0(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 1, "core-timer", [], null, null, null, View_CoreTimerComponent_0, RenderType_CoreTimerComponent)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](1, 245760, null, 0, __WEBPACK_IMPORTED_MODULE_14__timer__["a" /* CoreTimerComponent */], [__WEBPACK_IMPORTED_MODULE_15__providers_utils_time__["a" /* CoreTimeUtilsProvider */]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var CoreTimerComponentNgFactory = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_27" /* ɵccf */]("core-timer", __WEBPACK_IMPORTED_MODULE_14__timer__["a" /* CoreTimerComponent */], View_CoreTimerComponent_Host_0, { endTime: "endTime", timerText: "timerText", timeLeftClass: "timeLeftClass", align: "align" }, { finished: "finished" }, []);

//# sourceMappingURL=timer.ngfactory.js.map

/***/ })

});
//# sourceMappingURL=8.js.map