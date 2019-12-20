webpackJsonp([26],{

/***/ 2132:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/@angular/core/esm5/core.js
var core = __webpack_require__(0);

// EXTERNAL MODULE: ./node_modules/ionic-angular/index.js + 3 modules
var ionic_angular = __webpack_require__(5);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/index.js + 1 modules
var _ngx_translate_core = __webpack_require__(3);

// EXTERNAL MODULE: ./src/directives/directives.module.ts + 2 modules
var directives_module = __webpack_require__(32);

// EXTERNAL MODULE: ./src/components/components.module.ts
var components_module = __webpack_require__(28);

// EXTERNAL MODULE: ./src/addon/mod/feedback/components/components.module.ts
var components_components_module = __webpack_require__(730);

// EXTERNAL MODULE: ./node_modules/@ionic-native/network/index.js
var _ionic_native_network = __webpack_require__(188);

// EXTERNAL MODULE: ./src/addon/mod/feedback/providers/feedback.ts
var feedback = __webpack_require__(136);

// EXTERNAL MODULE: ./src/addon/mod/feedback/providers/helper.ts
var helper = __webpack_require__(256);

// EXTERNAL MODULE: ./src/addon/mod/feedback/providers/sync.ts
var sync = __webpack_require__(287);

// EXTERNAL MODULE: ./src/providers/utils/dom.ts
var dom = __webpack_require__(4);

// EXTERNAL MODULE: ./src/providers/utils/utils.ts
var utils_utils = __webpack_require__(2);

// EXTERNAL MODULE: ./src/providers/app.ts
var app = __webpack_require__(9);

// EXTERNAL MODULE: ./src/providers/events.ts
var events = __webpack_require__(10);

// EXTERNAL MODULE: ./src/core/course/providers/course.ts
var course = __webpack_require__(13);

// EXTERNAL MODULE: ./src/core/course/providers/helper.ts
var providers_helper = __webpack_require__(38);

// EXTERNAL MODULE: ./src/core/login/providers/helper.ts
var login_providers_helper = __webpack_require__(128);

// EXTERNAL MODULE: ./src/core/contentlinks/providers/helper.ts
var contentlinks_providers_helper = __webpack_require__(15);

// EXTERNAL MODULE: ./src/providers/sites.ts
var sites = __webpack_require__(1);

// CONCATENATED MODULE: ./src/addon/mod/feedback/pages/form/form.ts
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
















/**
 * Page that displays feedback form.
 */
var form_AddonModFeedbackFormPage = /** @class */ (function () {
    function AddonModFeedbackFormPage(navParams, feedbackProvider, appProvider, utils, domUtils, navCtrl, feedbackHelper, courseProvider, eventsProvider, feedbackSync, network, translate, loginHelper, linkHelper, sitesProvider, content, zone, courseHelper) {
        var _this = this;
        this.feedbackProvider = feedbackProvider;
        this.appProvider = appProvider;
        this.utils = utils;
        this.domUtils = domUtils;
        this.navCtrl = navCtrl;
        this.feedbackHelper = feedbackHelper;
        this.courseProvider = courseProvider;
        this.eventsProvider = eventsProvider;
        this.feedbackSync = feedbackSync;
        this.translate = translate;
        this.loginHelper = loginHelper;
        this.linkHelper = linkHelper;
        this.content = content;
        this.courseHelper = courseHelper;
        this.forceLeave = false;
        this.preview = false;
        this.component = feedback["a" /* AddonModFeedbackProvider */].COMPONENT;
        this.offline = false;
        this.feedbackLoaded = false;
        this.items = [];
        this.hasPrevPage = false;
        this.hasNextPage = false;
        this.completed = false;
        this.completedOffline = false;
        this.module = navParams.get('module');
        this.courseId = navParams.get('courseId');
        this.currentPage = navParams.get('page');
        this.title = navParams.get('title');
        this.preview = !!navParams.get('preview');
        this.componentId = navParams.get('moduleId') || this.module.id;
        this.currentSite = sitesProvider.getCurrentSite();
        // Refresh online status when changes.
        this.onlineObserver = network.onchange().subscribe(function () {
            // Execute the callback in the Angular zone, so change detection doesn't stop working.
            zone.run(function () {
                _this.offline = !_this.appProvider.isOnline();
            });
        });
    }
    /**
     * View loaded.
     */
    AddonModFeedbackFormPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.fetchData().then(function () {
            _this.feedbackProvider.logView(_this.feedback.id, _this.feedback.name, true).then(function () {
                _this.courseProvider.checkModuleCompletion(_this.courseId, _this.module.completiondata);
            }).catch(function () {
                // Ignore errors.
            });
        });
    };
    /**
     * View entered.
     */
    AddonModFeedbackFormPage.prototype.ionViewDidEnter = function () {
        this.forceLeave = false;
    };
    /**
     * Check if we can leave the page or not.
     *
     * @return Resolved if we can leave it, rejected if not.
     */
    AddonModFeedbackFormPage.prototype.ionViewCanLeave = function () {
        if (this.forceLeave) {
            return true;
        }
        if (!this.preview) {
            var responses = this.feedbackHelper.getPageItemsResponses(this.items);
            if (this.items && !this.completed && this.originalData) {
                // Form submitted. Check if there is any change.
                if (!this.utils.basicLeftCompare(responses, this.originalData, 3)) {
                    return this.domUtils.showConfirm(this.translate.instant('core.confirmcanceledit'));
                }
            }
        }
        return Promise.resolve();
    };
    /**
     * Fetch all the data required for the view.
     *
     * @return Promise resolved when done.
     */
    AddonModFeedbackFormPage.prototype.fetchData = function () {
        var _this = this;
        this.offline = !this.appProvider.isOnline();
        return this.feedbackProvider.getFeedback(this.courseId, this.module.id).then(function (feedbackData) {
            _this.feedback = feedbackData;
            _this.title = _this.feedback.name || _this.title;
            return _this.fetchAccessData();
        }).then(function (accessData) {
            if (!_this.preview && accessData.cansubmit && !accessData.isempty) {
                return typeof _this.currentPage == 'undefined' ?
                    _this.feedbackProvider.getResumePage(_this.feedback.id, _this.offline, true) :
                    Promise.resolve(_this.currentPage);
            }
            else {
                _this.preview = true;
                return Promise.resolve(0);
            }
        }).catch(function (error) {
            if (!_this.offline && !_this.utils.isWebServiceError(error)) {
                // If it fails, go offline.
                _this.offline = true;
                return _this.feedbackProvider.getResumePage(_this.feedback.id, true);
            }
            return Promise.reject(error);
        }).then(function (page) {
            return _this.fetchFeedbackPageData(page || 0);
        }).catch(function (message) {
            _this.domUtils.showErrorModalDefault(message, 'core.course.errorgetmodule', true);
            _this.forceLeave = true;
            _this.navCtrl.pop();
            return Promise.reject(null);
        }).finally(function () {
            _this.feedbackLoaded = true;
        });
    };
    /**
     * Fetch access information.
     *
     * @return Promise resolved when done.
     */
    AddonModFeedbackFormPage.prototype.fetchAccessData = function () {
        var _this = this;
        return this.feedbackProvider.getFeedbackAccessInformation(this.feedback.id, this.offline, true).catch(function (error) {
            if (!_this.offline && !_this.utils.isWebServiceError(error)) {
                // If it fails, go offline.
                _this.offline = true;
                return _this.feedbackProvider.getFeedbackAccessInformation(_this.feedback.id, true);
            }
            return Promise.reject(error);
        }).then(function (accessData) {
            _this.access = accessData;
            return accessData;
        });
    };
    AddonModFeedbackFormPage.prototype.fetchFeedbackPageData = function (page) {
        var _this = this;
        if (page === void 0) { page = 0; }
        var promise;
        this.items = [];
        if (this.preview) {
            promise = this.feedbackProvider.getItems(this.feedback.id);
        }
        else {
            this.currentPage = page;
            promise = this.feedbackProvider.getPageItemsWithValues(this.feedback.id, page, this.offline, true).catch(function (error) {
                if (!_this.offline && !_this.utils.isWebServiceError(error)) {
                    // If it fails, go offline.
                    _this.offline = true;
                    return _this.feedbackProvider.getPageItemsWithValues(_this.feedback.id, page, true);
                }
                return Promise.reject(error);
            }).then(function (response) {
                _this.hasPrevPage = !!response.hasprevpage;
                _this.hasNextPage = !!response.hasnextpage;
                return response;
            });
        }
        return promise.then(function (response) {
            _this.items = response.items.map(function (itemData) {
                return _this.feedbackHelper.getItemForm(itemData, _this.preview);
            }).filter(function (itemData) {
                // Filter items with errors.
                return itemData;
            });
            if (!_this.preview) {
                var itemsCopy = _this.utils.clone(_this.items); // Copy the array to avoid modifications.
                _this.originalData = _this.feedbackHelper.getPageItemsResponses(itemsCopy);
            }
        });
    };
    /**
     * Function to allow page navigation through the questions form.
     *
     * @param goPrevious If true it will go back to the previous page, if false, it will go forward.
     * @return Resolved when done.
     */
    AddonModFeedbackFormPage.prototype.gotoPage = function (goPrevious) {
        var _this = this;
        this.domUtils.scrollToTop(this.content);
        this.feedbackLoaded = false;
        var responses = this.feedbackHelper.getPageItemsResponses(this.items), formHasErrors = this.items.some(function (item) {
            return item.isEmpty || item.hasError;
        });
        // Sync other pages first.
        return this.feedbackSync.syncFeedback(this.feedback.id).catch(function () {
            // Ignore errors.
        }).then(function () {
            return _this.feedbackProvider.processPage(_this.feedback.id, _this.currentPage, responses, goPrevious, formHasErrors, _this.courseId).then(function (response) {
                var jumpTo = parseInt(response.jumpto, 10);
                if (response.completed) {
                    // Form is completed, show completion message and buttons.
                    _this.items = [];
                    _this.completed = true;
                    _this.completedOffline = !!response.offline;
                    _this.completionPageContents = response.completionpagecontents;
                    _this.siteAfterSubmit = response.siteaftersubmit;
                    _this.submitted = true;
                    // Invalidate access information so user will see home page updated (continue form or completion messages).
                    var promises = [];
                    promises.push(_this.feedbackProvider.invalidateFeedbackAccessInformationData(_this.feedback.id));
                    promises.push(_this.feedbackProvider.invalidateResumePageData(_this.feedback.id));
                    return Promise.all(promises).then(function () {
                        return _this.fetchAccessData();
                    });
                }
                else if (isNaN(jumpTo) || jumpTo == _this.currentPage) {
                    // Errors on questions, stay in page.
                    return Promise.resolve();
                }
                else {
                    _this.submitted = true;
                    // Invalidate access information so user will see home page updated (continue form).
                    _this.feedbackProvider.invalidateResumePageData(_this.feedback.id);
                    // Fetch the new page.
                    return _this.fetchFeedbackPageData(jumpTo);
                }
            });
        }).catch(function (message) {
            _this.domUtils.showErrorModalDefault(message, 'core.course.errorgetmodule', true);
            return Promise.reject(null);
        }).finally(function () {
            _this.feedbackLoaded = true;
        });
    };
    /**
     * Function to link implemented features.
     */
    AddonModFeedbackFormPage.prototype.showAnalysis = function () {
        this.submitted = 'analysis';
        this.feedbackHelper.openFeature('analysis', this.navCtrl, this.module, this.courseId);
    };
    /**
     * Function to go to the page after submit.
     */
    AddonModFeedbackFormPage.prototype.continue = function () {
        var _this = this;
        if (this.siteAfterSubmit) {
            var modal_1 = this.domUtils.showModalLoading();
            this.linkHelper.handleLink(this.siteAfterSubmit).then(function (treated) {
                if (!treated) {
                    return _this.currentSite.openInBrowserWithAutoLoginIfSameSite(_this.siteAfterSubmit);
                }
            }).finally(function () {
                modal_1.dismiss();
            });
        }
        else {
            this.courseHelper.getAndOpenCourse(undefined, this.courseId, {}, this.currentSite.getId());
        }
    };
    /**
     * Component being destroyed.
     */
    AddonModFeedbackFormPage.prototype.ngOnDestroy = function () {
        if (this.submitted) {
            var tab = this.submitted == 'analysis' ? 'analysis' : 'overview';
            // If form has been submitted, the info has been already invalidated but we should update index view.
            this.eventsProvider.trigger(feedback["a" /* AddonModFeedbackProvider */].FORM_SUBMITTED, {
                feedbackId: this.feedback.id,
                tab: tab,
                offline: this.completedOffline
            });
        }
        this.onlineObserver && this.onlineObserver.unsubscribe();
    };
    AddonModFeedbackFormPage = __decorate([
        Object(core["m" /* Component */])({
            selector: 'page-addon-mod-feedback-form',
            templateUrl: 'form.html',
        }),
        __param(15, Object(core["N" /* Optional */])()),
        __metadata("design:paramtypes", [ionic_angular["t" /* NavParams */], feedback["a" /* AddonModFeedbackProvider */], app["a" /* CoreAppProvider */],
            utils_utils["a" /* CoreUtilsProvider */], dom["a" /* CoreDomUtilsProvider */], ionic_angular["s" /* NavController */],
            helper["a" /* AddonModFeedbackHelperProvider */], course["a" /* CoreCourseProvider */],
            events["a" /* CoreEventsProvider */], sync["a" /* AddonModFeedbackSyncProvider */], _ionic_native_network["a" /* Network */],
            _ngx_translate_core["c" /* TranslateService */], login_providers_helper["a" /* CoreLoginHelperProvider */],
            contentlinks_providers_helper["a" /* CoreContentLinksHelperProvider */], sites["a" /* CoreSitesProvider */],
            ionic_angular["f" /* Content */], core["M" /* NgZone */], providers_helper["a" /* CoreCourseHelperProvider */]])
    ], AddonModFeedbackFormPage);
    return AddonModFeedbackFormPage;
}());

//# sourceMappingURL=form.js.map
// CONCATENATED MODULE: ./src/addon/mod/feedback/pages/form/form.module.ts
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
var form_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var form_module_AddonModFeedbackFormPageModule = /** @class */ (function () {
    function AddonModFeedbackFormPageModule() {
    }
    AddonModFeedbackFormPageModule = form_module___decorate([
        Object(core["I" /* NgModule */])({
            declarations: [
                form_AddonModFeedbackFormPage,
            ],
            imports: [
                directives_module["a" /* CoreDirectivesModule */],
                components_module["a" /* CoreComponentsModule */],
                components_components_module["a" /* AddonModFeedbackComponentsModule */],
                ionic_angular["l" /* IonicPageModule */].forChild(form_AddonModFeedbackFormPage),
                _ngx_translate_core["b" /* TranslateModule */].forChild()
            ],
        })
    ], AddonModFeedbackFormPageModule);
    return AddonModFeedbackFormPageModule;
}());

//# sourceMappingURL=form.module.js.map
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

// EXTERNAL MODULE: ./src/core/block/components/only-title-block/only-title-block.ngfactory.js
var only_title_block_ngfactory = __webpack_require__(1539);

// EXTERNAL MODULE: ./src/core/block/components/pre-rendered-block/pre-rendered-block.ngfactory.js
var pre_rendered_block_ngfactory = __webpack_require__(1540);

// EXTERNAL MODULE: ./src/core/block/components/course-blocks/course-blocks.ngfactory.js
var course_blocks_ngfactory = __webpack_require__(1537);

// EXTERNAL MODULE: ./src/core/course/components/unsupported-module/unsupported-module.ngfactory.js
var unsupported_module_ngfactory = __webpack_require__(1538);

// EXTERNAL MODULE: ./src/core/course/components/tag-area/tag-area.ngfactory.js
var tag_area_ngfactory = __webpack_require__(1541);

// EXTERNAL MODULE: ./src/addon/mod/feedback/components/index/index.ngfactory.js
var index_ngfactory = __webpack_require__(1550);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.pipe.js
var translate_pipe = __webpack_require__(25);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.service.js
var translate_service = __webpack_require__(17);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item.ngfactory.js + 1 modules
var item_ngfactory = __webpack_require__(30);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item.js
var item = __webpack_require__(20);

// EXTERNAL MODULE: ./node_modules/ionic-angular/util/form.js
var util_form = __webpack_require__(19);

// EXTERNAL MODULE: ./node_modules/ionic-angular/config/config.js
var config = __webpack_require__(8);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-reorder.js + 1 modules
var item_reorder = __webpack_require__(26);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-divider.js
var item_divider = __webpack_require__(102);

// EXTERNAL MODULE: ./src/components/mark-required/mark-required.ngfactory.js
var mark_required_ngfactory = __webpack_require__(95);

// EXTERNAL MODULE: ./src/components/mark-required/mark-required.ts
var mark_required = __webpack_require__(85);

// EXTERNAL MODULE: ./src/providers/utils/text.ts
var utils_text = __webpack_require__(11);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/label/label.js
var label = __webpack_require__(67);

// EXTERNAL MODULE: ./node_modules/@angular/common/esm5/common.js
var common = __webpack_require__(7);

// EXTERNAL MODULE: ./src/directives/format-text.ts
var format_text = __webpack_require__(48);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/platform.js + 1 modules
var platform = __webpack_require__(16);

// EXTERNAL MODULE: ./src/providers/utils/url.ts
var url = __webpack_require__(22);

// EXTERNAL MODULE: ./src/providers/logger.ts
var logger = __webpack_require__(6);

// EXTERNAL MODULE: ./src/providers/filepool.ts
var filepool = __webpack_require__(18);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-controller.js
var nav_controller = __webpack_require__(21);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.js
var content_content = __webpack_require__(29);

// EXTERNAL MODULE: ./src/components/split-view/split-view.ts
var split_view = __webpack_require__(27);

// EXTERNAL MODULE: ./src/providers/utils/iframe.ts
var iframe = __webpack_require__(43);

// EXTERNAL MODULE: ./src/core/filter/providers/filter.ts
var filter = __webpack_require__(42);

// EXTERNAL MODULE: ./src/core/filter/providers/helper.ts
var filter_providers_helper = __webpack_require__(31);

// EXTERNAL MODULE: ./src/core/filter/providers/delegate.ts
var delegate = __webpack_require__(36);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/input/input.ngfactory.js
var input_ngfactory = __webpack_require__(112);

// EXTERNAL MODULE: ./node_modules/@angular/forms/esm5/forms.js
var esm5_forms = __webpack_require__(23);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/input/input.js
var input = __webpack_require__(92);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/app/app.js + 3 modules
var app_app = __webpack_require__(35);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/dom-controller.js
var dom_controller = __webpack_require__(34);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/typography/typography.js
var typography = __webpack_require__(778);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-content.js
var item_content = __webpack_require__(33);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/radio/radio-button.ngfactory.js
var radio_button_ngfactory = __webpack_require__(180);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/radio/radio-button.js
var radio_button = __webpack_require__(148);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/radio/radio-group.js
var radio_group = __webpack_require__(139);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/list/list.js + 1 modules
var list = __webpack_require__(89);

// EXTERNAL MODULE: ./node_modules/ionic-angular/gestures/gesture-controller.js
var gesture_controller = __webpack_require__(44);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/checkbox/checkbox.ngfactory.js
var checkbox_ngfactory = __webpack_require__(255);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/checkbox/checkbox.js
var checkbox_checkbox = __webpack_require__(202);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/option/option.js
var option_option = __webpack_require__(110);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/select/select.ngfactory.js
var select_ngfactory = __webpack_require__(126);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/select/select.js
var select_select = __webpack_require__(111);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/deep-linker.js
var deep_linker = __webpack_require__(59);

// EXTERNAL MODULE: ./src/components/recaptcha/recaptcha.ngfactory.js
var recaptcha_ngfactory = __webpack_require__(2179);

// EXTERNAL MODULE: ./src/components/recaptcha/recaptcha.ts
var recaptcha = __webpack_require__(1558);

// EXTERNAL MODULE: ./src/providers/lang.ts
var lang = __webpack_require__(153);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/modal/modal-controller.js
var modal_controller = __webpack_require__(164);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/icon/icon.js
var icon = __webpack_require__(47);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/grid/col.js
var col = __webpack_require__(121);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.ngfactory.js
var button_ngfactory = __webpack_require__(45);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.js
var button_button = __webpack_require__(41);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/grid/grid.js
var grid = __webpack_require__(166);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/grid/row.js
var row = __webpack_require__(120);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-header.js
var toolbar_header = __webpack_require__(375);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/view-controller.js
var view_controller = __webpack_require__(39);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/navbar.ngfactory.js
var navbar_ngfactory = __webpack_require__(725);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/navbar.js
var navbar = __webpack_require__(214);

// EXTERNAL MODULE: ./src/directives/back-button.ts
var back_button = __webpack_require__(478);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.ngfactory.js
var toolbar_title_ngfactory = __webpack_require__(726);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.js
var toolbar_title = __webpack_require__(316);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar.js
var toolbar = __webpack_require__(251);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.ngfactory.js
var content_ngfactory = __webpack_require__(185);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/keyboard.js
var keyboard = __webpack_require__(109);

// EXTERNAL MODULE: ./src/components/loading/loading.ngfactory.js
var loading_ngfactory = __webpack_require__(54);

// EXTERNAL MODULE: ./src/components/loading/loading.ts
var loading = __webpack_require__(51);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-params.js
var nav_params = __webpack_require__(70);

// CONCATENATED MODULE: ./src/addon/mod/feedback/pages/form/form.ngfactory.js
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 

















































































var styles_AddonModFeedbackFormPage = [];
var RenderType_AddonModFeedbackFormPage = core["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_AddonModFeedbackFormPage, data: {} });

function View_AddonModFeedbackFormPage_2(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "p", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](1, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], null, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 1, 0, core["_44" /* ɵnov */](_v, 2).transform("addon.mod_feedback.anonymous")); _ck(_v, 1, 0, currVal_0); }); }
function View_AddonModFeedbackFormPage_3(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "p", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](1, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], null, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 1, 0, core["_44" /* ɵnov */](_v, 2).transform("addon.mod_feedback.non_anonymous")); _ck(_v, 1, 0, currVal_0); }); }
function View_AddonModFeedbackFormPage_5(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 5, "ion-item-divider", [["class", "item item-divider"]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 4, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 5, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 6, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_divider["a" /* ItemDivider */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null)], null, null); }
function View_AddonModFeedbackFormPage_8(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "span", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](1, null, ["", ". "]))], null, function (_ck, _v) { var currVal_0 = _v.parent.parent.parent.context.$implicit.itemnumber; _ck(_v, 1, 0, currVal_0); }); }
function View_AddonModFeedbackFormPage_9(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "span", [["class", "addon-mod_feedback-postfix"]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](1, null, ["", ""]))], null, function (_ck, _v) { var currVal_0 = _v.parent.parent.parent.context.$implicit.postfix; _ck(_v, 1, 0, currVal_0); }); }
function View_AddonModFeedbackFormPage_7(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 12, "ion-label", [["stacked", ""]], null, null, null, mark_required_ngfactory["b" /* View_CoreMarkRequiredComponent_0 */], mark_required_ngfactory["a" /* RenderType_CoreMarkRequiredComponent */])), core["_30" /* ɵdid */](1, 4308992, null, 0, mark_required["a" /* CoreMarkRequiredComponent */], [core["t" /* ElementRef */], translate_service["a" /* TranslateService */], utils_text["a" /* CoreTextUtilsProvider */], utils_utils["a" /* CoreUtilsProvider */]], { coreMarkRequired: [0, "coreMarkRequired"] }, null), core["_30" /* ɵdid */](2, 16384, [[7, 4]], 0, label["a" /* Label */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, ""], [8, null], [8, null]], null, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                            "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonModFeedbackFormPage_8)), core["_30" /* ɵdid */](5, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                            "])), (_l()(), core["_31" /* ɵeld */](7, 16777216, null, 0, 1, "core-format-text", [["contextLevel", "module"]], null, null, null, null, null)), core["_30" /* ɵdid */](8, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform["a" /* Platform */], utils_utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], app["a" /* CoreAppProvider */], contentlinks_providers_helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content_content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */], filter["a" /* CoreFilterProvider */], filter_providers_helper["a" /* CoreFilterHelperProvider */], delegate["a" /* CoreFilterDelegate */], core["_11" /* ViewContainerRef */]], { text: [0, "text"], component: [1, "component"], componentId: [2, "componentId"], contextLevel: [3, "contextLevel"], contextInstanceId: [4, "contextInstanceId"], courseId: [5, "courseId"], wsNotFiltered: [6, "wsNotFiltered"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                            "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonModFeedbackFormPage_9)), core["_30" /* ɵdid */](11, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                        "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _v.parent.parent.context.$implicit.required; _ck(_v, 1, 0, currVal_0); var currVal_1 = (_co.feedback.autonumbering && _v.parent.parent.context.$implicit.itemnumber); _ck(_v, 5, 0, currVal_1); var currVal_2 = _v.parent.parent.context.$implicit.name; var currVal_3 = _co.component; var currVal_4 = _co.componentId; var currVal_5 = "module"; var currVal_6 = _co.module.id; var currVal_7 = _co.courseId; var currVal_8 = true; _ck(_v, 8, 0, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8); var currVal_9 = _v.parent.parent.context.$implicit.postfix; _ck(_v, 11, 0, currVal_9); }, null); }
function View_AddonModFeedbackFormPage_11(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 5, null, null, null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                                    "])), (_l()(), core["_31" /* ɵeld */](2, 0, null, null, 2, "p", [], null, null, null, null, null)), (_l()(), core["_31" /* ɵeld */](3, 16777216, null, null, 1, "core-format-text", [["contextLevel", "module"]], null, null, null, null, null)), core["_30" /* ɵdid */](4, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform["a" /* Platform */], utils_utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], app["a" /* CoreAppProvider */], contentlinks_providers_helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content_content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */], filter["a" /* CoreFilterProvider */], filter_providers_helper["a" /* CoreFilterHelperProvider */], delegate["a" /* CoreFilterDelegate */], core["_11" /* ViewContainerRef */]], { text: [0, "text"], component: [1, "component"], componentId: [2, "componentId"], contextLevel: [3, "contextLevel"], contextInstanceId: [4, "contextInstanceId"], courseId: [5, "courseId"], wsNotFiltered: [6, "wsNotFiltered"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                                "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _v.parent.parent.parent.context.$implicit.presentation; var currVal_1 = _co.component; var currVal_2 = _co.componentId; var currVal_3 = "module"; var currVal_4 = _co.module.id; var currVal_5 = _co.courseId; var currVal_6 = true; _ck(_v, 4, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6); }, null); }
function View_AddonModFeedbackFormPage_12(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 10, null, null, null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                                    "])), (_l()(), core["_31" /* ɵeld */](2, 0, null, null, 7, "ion-input", [["autocorrect", "off"], ["type", "text"]], [[1, "required", 0], [1, "maxlength", 0], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"]], function (_v, en, $event) { var ad = true; if (("ngModelChange" === en)) {
        var pd_0 = ((_v.parent.parent.parent.context.$implicit.value = $event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, input_ngfactory["b" /* View_TextInput_0 */], input_ngfactory["a" /* RenderType_TextInput */])), core["_30" /* ɵdid */](3, 16384, null, 0, esm5_forms["t" /* RequiredValidator */], [], { required: [0, "required"] }, null), core["_30" /* ɵdid */](4, 540672, null, 0, esm5_forms["j" /* MaxLengthValidator */], [], { maxlength: [0, "maxlength"] }, null), core["_50" /* ɵprd */](1024, null, esm5_forms["k" /* NG_VALIDATORS */], function (p0_0, p1_0) { return [p0_0, p1_0]; }, [esm5_forms["t" /* RequiredValidator */], esm5_forms["j" /* MaxLengthValidator */]]), core["_30" /* ɵdid */](6, 671744, null, 0, esm5_forms["q" /* NgModel */], [[8, null], [2, esm5_forms["k" /* NG_VALIDATORS */]], [8, null], [8, null]], { name: [0, "name"], model: [1, "model"] }, { update: "ngModelChange" }), core["_50" /* ɵprd */](2048, null, esm5_forms["m" /* NgControl */], null, [esm5_forms["q" /* NgModel */]]), core["_30" /* ɵdid */](8, 16384, null, 0, esm5_forms["n" /* NgControlStatus */], [esm5_forms["m" /* NgControl */]], null, null), core["_30" /* ɵdid */](9, 5423104, null, 0, input["a" /* TextInput */], [config["a" /* Config */], platform["a" /* Platform */], util_form["a" /* Form */], app_app["a" /* App */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, content_content["a" /* Content */]], [2, item["a" /* Item */]], [2, esm5_forms["m" /* NgControl */]], dom_controller["a" /* DomController */]], { type: [0, "type"], autocorrect: [1, "autocorrect"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                                "]))], function (_ck, _v) { var currVal_9 = _v.parent.parent.parent.context.$implicit.required; _ck(_v, 3, 0, currVal_9); var currVal_10 = core["_34" /* ɵinlineInterpolate */](1, "", _v.parent.parent.parent.context.$implicit.maxlength, ""); _ck(_v, 4, 0, currVal_10); var currVal_11 = core["_34" /* ɵinlineInterpolate */](2, "", _v.parent.parent.parent.context.$implicit.typ, "_", _v.parent.parent.parent.context.$implicit.id, ""); var currVal_12 = _v.parent.parent.parent.context.$implicit.value; _ck(_v, 6, 0, currVal_11, currVal_12); var currVal_13 = "text"; var currVal_14 = "off"; _ck(_v, 9, 0, currVal_13, currVal_14); }, function (_ck, _v) { var currVal_0 = (core["_44" /* ɵnov */](_v, 3).required ? "" : null); var currVal_1 = (core["_44" /* ɵnov */](_v, 4).maxlength ? core["_44" /* ɵnov */](_v, 4).maxlength : null); var currVal_2 = core["_44" /* ɵnov */](_v, 8).ngClassUntouched; var currVal_3 = core["_44" /* ɵnov */](_v, 8).ngClassTouched; var currVal_4 = core["_44" /* ɵnov */](_v, 8).ngClassPristine; var currVal_5 = core["_44" /* ɵnov */](_v, 8).ngClassDirty; var currVal_6 = core["_44" /* ɵnov */](_v, 8).ngClassValid; var currVal_7 = core["_44" /* ɵnov */](_v, 8).ngClassInvalid; var currVal_8 = core["_44" /* ɵnov */](_v, 8).ngClassPending; _ck(_v, 2, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8); }); }
function View_AddonModFeedbackFormPage_15(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "span", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, [", "]))], null, null); }
function View_AddonModFeedbackFormPage_14(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 6, "p", [["color", "danger"], ["ion-text", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, typography["a" /* Typography */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { color: [0, "color"] }, null), (_l()(), core["_55" /* ɵted */](2, null, ["", " [", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModFeedbackFormPage_15)), core["_30" /* ɵdid */](5, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](6, null, ["", "]"]))], function (_ck, _v) { var currVal_0 = "danger"; _ck(_v, 1, 0, currVal_0); var currVal_3 = (_v.parent.parent.parent.parent.context.$implicit.rangefrom && _v.parent.parent.parent.parent.context.$implicit.rangeto); _ck(_v, 5, 0, currVal_3); }, function (_ck, _v) { var currVal_1 = core["_56" /* ɵunv */](_v, 2, 0, core["_44" /* ɵnov */](_v, 3).transform("addon.mod_feedback.numberoutofrange")); var currVal_2 = _v.parent.parent.parent.parent.context.$implicit.rangefrom; _ck(_v, 2, 0, currVal_1, currVal_2); var currVal_4 = _v.parent.parent.parent.parent.context.$implicit.rangeto; _ck(_v, 6, 0, currVal_4); }); }
function View_AddonModFeedbackFormPage_13(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 12, null, null, null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                                    "])), (_l()(), core["_31" /* ɵeld */](2, 0, null, null, 6, "ion-input", [["type", "number"]], [[1, "required", 0], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"]], function (_v, en, $event) { var ad = true; if (("ngModelChange" === en)) {
        var pd_0 = ((_v.parent.parent.parent.context.$implicit.value = $event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, input_ngfactory["b" /* View_TextInput_0 */], input_ngfactory["a" /* RenderType_TextInput */])), core["_30" /* ɵdid */](3, 16384, null, 0, esm5_forms["t" /* RequiredValidator */], [], { required: [0, "required"] }, null), core["_50" /* ɵprd */](1024, null, esm5_forms["k" /* NG_VALIDATORS */], function (p0_0) { return [p0_0]; }, [esm5_forms["t" /* RequiredValidator */]]), core["_30" /* ɵdid */](5, 671744, null, 0, esm5_forms["q" /* NgModel */], [[8, null], [2, esm5_forms["k" /* NG_VALIDATORS */]], [8, null], [8, null]], { name: [0, "name"], model: [1, "model"] }, { update: "ngModelChange" }), core["_50" /* ɵprd */](2048, null, esm5_forms["m" /* NgControl */], null, [esm5_forms["q" /* NgModel */]]), core["_30" /* ɵdid */](7, 16384, null, 0, esm5_forms["n" /* NgControlStatus */], [esm5_forms["m" /* NgControl */]], null, null), core["_30" /* ɵdid */](8, 5423104, null, 0, input["a" /* TextInput */], [config["a" /* Config */], platform["a" /* Platform */], util_form["a" /* Form */], app_app["a" /* App */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, content_content["a" /* Content */]], [2, item["a" /* Item */]], [2, esm5_forms["m" /* NgControl */]], dom_controller["a" /* DomController */]], { type: [0, "type"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModFeedbackFormPage_14)), core["_30" /* ɵdid */](11, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                                "]))], function (_ck, _v) { var currVal_8 = _v.parent.parent.parent.context.$implicit.required; _ck(_v, 3, 0, currVal_8); var currVal_9 = core["_34" /* ɵinlineInterpolate */](2, "", _v.parent.parent.parent.context.$implicit.typ, "_", _v.parent.parent.parent.context.$implicit.id, ""); var currVal_10 = _v.parent.parent.parent.context.$implicit.value; _ck(_v, 5, 0, currVal_9, currVal_10); var currVal_11 = "number"; _ck(_v, 8, 0, currVal_11); var currVal_12 = _v.parent.parent.parent.context.$implicit.hasError; _ck(_v, 11, 0, currVal_12); }, function (_ck, _v) { var currVal_0 = (core["_44" /* ɵnov */](_v, 3).required ? "" : null); var currVal_1 = core["_44" /* ɵnov */](_v, 7).ngClassUntouched; var currVal_2 = core["_44" /* ɵnov */](_v, 7).ngClassTouched; var currVal_3 = core["_44" /* ɵnov */](_v, 7).ngClassPristine; var currVal_4 = core["_44" /* ɵnov */](_v, 7).ngClassDirty; var currVal_5 = core["_44" /* ɵnov */](_v, 7).ngClassValid; var currVal_6 = core["_44" /* ɵnov */](_v, 7).ngClassInvalid; var currVal_7 = core["_44" /* ɵnov */](_v, 7).ngClassPending; _ck(_v, 2, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7); }); }
function View_AddonModFeedbackFormPage_16(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 9, null, null, null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                                    "])), (_l()(), core["_31" /* ɵeld */](2, 0, null, null, 6, "ion-textarea", [], [[1, "aria-multiline", 0], [1, "required", 0], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"]], function (_v, en, $event) { var ad = true; if (("ngModelChange" === en)) {
        var pd_0 = ((_v.parent.parent.parent.context.$implicit.value = $event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, input_ngfactory["b" /* View_TextInput_0 */], input_ngfactory["a" /* RenderType_TextInput */])), core["_30" /* ɵdid */](3, 16384, null, 0, esm5_forms["t" /* RequiredValidator */], [], { required: [0, "required"] }, null), core["_50" /* ɵprd */](1024, null, esm5_forms["k" /* NG_VALIDATORS */], function (p0_0) { return [p0_0]; }, [esm5_forms["t" /* RequiredValidator */]]), core["_30" /* ɵdid */](5, 671744, null, 0, esm5_forms["q" /* NgModel */], [[8, null], [2, esm5_forms["k" /* NG_VALIDATORS */]], [8, null], [8, null]], { name: [0, "name"], model: [1, "model"] }, { update: "ngModelChange" }), core["_50" /* ɵprd */](2048, null, esm5_forms["m" /* NgControl */], null, [esm5_forms["q" /* NgModel */]]), core["_30" /* ɵdid */](7, 16384, null, 0, esm5_forms["n" /* NgControlStatus */], [esm5_forms["m" /* NgControl */]], null, null), core["_30" /* ɵdid */](8, 5423104, null, 0, input["a" /* TextInput */], [config["a" /* Config */], platform["a" /* Platform */], util_form["a" /* Form */], app_app["a" /* App */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, content_content["a" /* Content */]], [2, item["a" /* Item */]], [2, esm5_forms["m" /* NgControl */]], dom_controller["a" /* DomController */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                                "]))], function (_ck, _v) { var currVal_9 = _v.parent.parent.parent.context.$implicit.required; _ck(_v, 3, 0, currVal_9); var currVal_10 = core["_34" /* ɵinlineInterpolate */](2, "", _v.parent.parent.parent.context.$implicit.typ, "_", _v.parent.parent.parent.context.$implicit.id, ""); var currVal_11 = _v.parent.parent.parent.context.$implicit.value; _ck(_v, 5, 0, currVal_10, currVal_11); }, function (_ck, _v) { var currVal_0 = true; var currVal_1 = (core["_44" /* ɵnov */](_v, 3).required ? "" : null); var currVal_2 = core["_44" /* ɵnov */](_v, 7).ngClassUntouched; var currVal_3 = core["_44" /* ɵnov */](_v, 7).ngClassTouched; var currVal_4 = core["_44" /* ɵnov */](_v, 7).ngClassPristine; var currVal_5 = core["_44" /* ɵnov */](_v, 7).ngClassDirty; var currVal_6 = core["_44" /* ɵnov */](_v, 7).ngClassValid; var currVal_7 = core["_44" /* ɵnov */](_v, 7).ngClassInvalid; var currVal_8 = core["_44" /* ɵnov */](_v, 7).ngClassPending; _ck(_v, 2, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8); }); }
function View_AddonModFeedbackFormPage_18(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 14, "ion-item", [["class", "item item-block"]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 11, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 12, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 13, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                                            "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 1, 3, "ion-label", [], null, null, null, null, null)), core["_30" /* ɵdid */](8, 16384, [[11, 4], [7, 4]], 0, label["a" /* Label */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, null], [8, null], [8, null]], null, null), (_l()(), core["_31" /* ɵeld */](9, 16777216, null, null, 1, "core-format-text", [["contextLevel", "module"]], null, null, null, null, null)), core["_30" /* ɵdid */](10, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform["a" /* Platform */], utils_utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], app["a" /* CoreAppProvider */], contentlinks_providers_helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content_content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */], filter["a" /* CoreFilterProvider */], filter_providers_helper["a" /* CoreFilterHelperProvider */], delegate["a" /* CoreFilterDelegate */], core["_11" /* ViewContainerRef */]], { text: [0, "text"], component: [1, "component"], componentId: [2, "componentId"], contextLevel: [3, "contextLevel"], contextInstanceId: [4, "contextInstanceId"], courseId: [5, "courseId"], wsNotFiltered: [6, "wsNotFiltered"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                                            "])), (_l()(), core["_31" /* ɵeld */](12, 0, null, 4, 1, "ion-radio", [], [[2, "radio-disabled", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (core["_44" /* ɵnov */](_v, 13)._click($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, radio_button_ngfactory["b" /* View_RadioButton_0 */], radio_button_ngfactory["a" /* RenderType_RadioButton */])), core["_30" /* ɵdid */](13, 245760, null, 0, radio_button["a" /* RadioButton */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item["a" /* Item */]], [2, radio_group["a" /* RadioGroup */]]], { value: [0, "value"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                                        "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _v.context.$implicit.label; var currVal_1 = _co.component; var currVal_2 = _co.componentId; var currVal_3 = "module"; var currVal_4 = _co.module.id; var currVal_5 = _co.courseId; var currVal_6 = true; _ck(_v, 10, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6); var currVal_8 = _v.context.$implicit.value; _ck(_v, 13, 0, currVal_8); }, function (_ck, _v) { var currVal_7 = core["_44" /* ɵnov */](_v, 13)._disabled; _ck(_v, 12, 0, currVal_7); }); }
function View_AddonModFeedbackFormPage_17(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 16, null, null, null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                                    "])), (_l()(), core["_31" /* ɵeld */](2, 0, null, null, 13, "ion-list", [["radio-group", ""], ["role", "radiogroup"]], [[1, "required", 0], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"]], function (_v, en, $event) { var ad = true; if (("ngModelChange" === en)) {
        var pd_0 = ((_v.parent.parent.parent.context.$implicit.value = $event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), core["_30" /* ɵdid */](3, 16384, null, 0, esm5_forms["t" /* RequiredValidator */], [], { required: [0, "required"] }, null), core["_50" /* ɵprd */](1024, null, esm5_forms["k" /* NG_VALIDATORS */], function (p0_0) { return [p0_0]; }, [esm5_forms["t" /* RequiredValidator */]]), core["_30" /* ɵdid */](5, 1064960, null, 1, radio_group["a" /* RadioGroup */], [core["V" /* Renderer */], core["t" /* ElementRef */], core["j" /* ChangeDetectorRef */]], null, null), core["_52" /* ɵqud */](335544320, 10, { _header: 0 }), core["_50" /* ɵprd */](1024, null, esm5_forms["l" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [radio_group["a" /* RadioGroup */]]), core["_30" /* ɵdid */](8, 671744, null, 0, esm5_forms["q" /* NgModel */], [[8, null], [2, esm5_forms["k" /* NG_VALIDATORS */]], [8, null], [2, esm5_forms["l" /* NG_VALUE_ACCESSOR */]]], { name: [0, "name"], model: [1, "model"] }, { update: "ngModelChange" }), core["_50" /* ɵprd */](2048, null, esm5_forms["m" /* NgControl */], null, [esm5_forms["q" /* NgModel */]]), core["_30" /* ɵdid */](10, 16384, null, 0, esm5_forms["n" /* NgControlStatus */], [esm5_forms["m" /* NgControl */]], null, null), core["_30" /* ɵdid */](11, 16384, null, 0, list["a" /* List */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], platform["a" /* Platform */], gesture_controller["l" /* GestureController */], dom_controller["a" /* DomController */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                                        "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModFeedbackFormPage_18)), core["_30" /* ɵdid */](14, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                                    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                                "]))], function (_ck, _v) { var currVal_8 = _v.parent.parent.parent.context.$implicit.required; _ck(_v, 3, 0, currVal_8); var currVal_9 = core["_34" /* ɵinlineInterpolate */](2, "", _v.parent.parent.parent.context.$implicit.typ, "_", _v.parent.parent.parent.context.$implicit.id, ""); var currVal_10 = _v.parent.parent.parent.context.$implicit.value; _ck(_v, 8, 0, currVal_9, currVal_10); var currVal_11 = _v.parent.parent.parent.context.$implicit.choices; _ck(_v, 14, 0, currVal_11); }, function (_ck, _v) { var currVal_0 = (core["_44" /* ɵnov */](_v, 3).required ? "" : null); var currVal_1 = core["_44" /* ɵnov */](_v, 10).ngClassUntouched; var currVal_2 = core["_44" /* ɵnov */](_v, 10).ngClassTouched; var currVal_3 = core["_44" /* ɵnov */](_v, 10).ngClassPristine; var currVal_4 = core["_44" /* ɵnov */](_v, 10).ngClassDirty; var currVal_5 = core["_44" /* ɵnov */](_v, 10).ngClassValid; var currVal_6 = core["_44" /* ɵnov */](_v, 10).ngClassInvalid; var currVal_7 = core["_44" /* ɵnov */](_v, 10).ngClassPending; _ck(_v, 2, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7); }); }
function View_AddonModFeedbackFormPage_20(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 20, "ion-item", [["class", "item item-block"]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 14, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 15, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 16, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                                        "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 1, 3, "ion-label", [], null, null, null, null, null)), core["_30" /* ɵdid */](8, 16384, [[14, 4], [7, 4]], 0, label["a" /* Label */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, null], [8, null], [8, null]], null, null), (_l()(), core["_31" /* ɵeld */](9, 16777216, null, null, 1, "core-format-text", [["contextLevel", "module"]], null, null, null, null, null)), core["_30" /* ɵdid */](10, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform["a" /* Platform */], utils_utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], app["a" /* CoreAppProvider */], contentlinks_providers_helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content_content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */], filter["a" /* CoreFilterProvider */], filter_providers_helper["a" /* CoreFilterHelperProvider */], delegate["a" /* CoreFilterDelegate */], core["_11" /* ViewContainerRef */]], { text: [0, "text"], component: [1, "component"], componentId: [2, "componentId"], contextLevel: [3, "contextLevel"], contextInstanceId: [4, "contextInstanceId"], courseId: [5, "courseId"], wsNotFiltered: [6, "wsNotFiltered"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                                        "])), (_l()(), core["_31" /* ɵeld */](12, 0, null, 0, 7, "ion-checkbox", [["value", "option.value"]], [[1, "required", 0], [2, "checkbox-disabled", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (core["_44" /* ɵnov */](_v, 15)._click($event) !== false);
        ad = (pd_0 && ad);
    } if (("ngModelChange" === en)) {
        var pd_1 = ((_v.context.$implicit.checked = $event) !== false);
        ad = (pd_1 && ad);
    } return ad; }, checkbox_ngfactory["b" /* View_Checkbox_0 */], checkbox_ngfactory["a" /* RenderType_Checkbox */])), core["_30" /* ɵdid */](13, 16384, null, 0, esm5_forms["t" /* RequiredValidator */], [], { required: [0, "required"] }, null), core["_50" /* ɵprd */](1024, null, esm5_forms["k" /* NG_VALIDATORS */], function (p0_0) { return [p0_0]; }, [esm5_forms["t" /* RequiredValidator */]]), core["_30" /* ɵdid */](15, 1228800, null, 0, checkbox_checkbox["a" /* Checkbox */], [config["a" /* Config */], util_form["a" /* Form */], [2, item["a" /* Item */]], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_50" /* ɵprd */](1024, null, esm5_forms["l" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [checkbox_checkbox["a" /* Checkbox */]]), core["_30" /* ɵdid */](17, 671744, null, 0, esm5_forms["q" /* NgModel */], [[8, null], [2, esm5_forms["k" /* NG_VALIDATORS */]], [8, null], [2, esm5_forms["l" /* NG_VALUE_ACCESSOR */]]], { name: [0, "name"], model: [1, "model"] }, { update: "ngModelChange" }), core["_50" /* ɵprd */](2048, null, esm5_forms["m" /* NgControl */], null, [esm5_forms["q" /* NgModel */]]), core["_30" /* ɵdid */](19, 16384, null, 0, esm5_forms["n" /* NgControlStatus */], [esm5_forms["m" /* NgControl */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                                    "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _v.context.$implicit.label; var currVal_1 = _co.component; var currVal_2 = _co.componentId; var currVal_3 = "module"; var currVal_4 = _co.module.id; var currVal_5 = _co.courseId; var currVal_6 = true; _ck(_v, 10, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6); var currVal_16 = _v.parent.parent.parent.parent.context.$implicit.required; _ck(_v, 13, 0, currVal_16); var currVal_17 = core["_34" /* ɵinlineInterpolate */](2, "", _v.parent.parent.parent.parent.context.$implicit.typ, "_", _v.parent.parent.parent.parent.context.$implicit.id, ""); var currVal_18 = _v.context.$implicit.checked; _ck(_v, 17, 0, currVal_17, currVal_18); }, function (_ck, _v) { var currVal_7 = (core["_44" /* ɵnov */](_v, 13).required ? "" : null); var currVal_8 = core["_44" /* ɵnov */](_v, 15)._disabled; var currVal_9 = core["_44" /* ɵnov */](_v, 19).ngClassUntouched; var currVal_10 = core["_44" /* ɵnov */](_v, 19).ngClassTouched; var currVal_11 = core["_44" /* ɵnov */](_v, 19).ngClassPristine; var currVal_12 = core["_44" /* ɵnov */](_v, 19).ngClassDirty; var currVal_13 = core["_44" /* ɵnov */](_v, 19).ngClassValid; var currVal_14 = core["_44" /* ɵnov */](_v, 19).ngClassInvalid; var currVal_15 = core["_44" /* ɵnov */](_v, 19).ngClassPending; _ck(_v, 12, 0, currVal_7, currVal_8, currVal_9, currVal_10, currVal_11, currVal_12, currVal_13, currVal_14, currVal_15); }); }
function View_AddonModFeedbackFormPage_19(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 5, "ion-list", [], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, list["a" /* List */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], platform["a" /* Platform */], gesture_controller["l" /* GestureController */], dom_controller["a" /* DomController */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModFeedbackFormPage_20)), core["_30" /* ɵdid */](4, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                                "]))], function (_ck, _v) { var currVal_0 = _v.parent.parent.parent.context.$implicit.choices; _ck(_v, 4, 0, currVal_0); }, null); }
function View_AddonModFeedbackFormPage_22(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 3, "ion-option", [], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, [[17, 4]], 0, option_option["a" /* Option */], [core["t" /* ElementRef */]], { value: [0, "value"] }, null), (_l()(), core["_31" /* ɵeld */](2, 16777216, null, null, 1, "core-format-text", [["contextLevel", "module"]], null, null, null, null, null)), core["_30" /* ɵdid */](3, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform["a" /* Platform */], utils_utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], app["a" /* CoreAppProvider */], contentlinks_providers_helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content_content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */], filter["a" /* CoreFilterProvider */], filter_providers_helper["a" /* CoreFilterHelperProvider */], delegate["a" /* CoreFilterDelegate */], core["_11" /* ViewContainerRef */]], { text: [0, "text"], component: [1, "component"], componentId: [2, "componentId"], contextLevel: [3, "contextLevel"], contextInstanceId: [4, "contextInstanceId"], courseId: [5, "courseId"], wsNotFiltered: [6, "wsNotFiltered"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _v.context.$implicit.value; _ck(_v, 1, 0, currVal_0); var currVal_1 = _v.context.$implicit.label; var currVal_2 = _co.component; var currVal_3 = _co.componentId; var currVal_4 = "module"; var currVal_5 = _co.module.id; var currVal_6 = _co.courseId; var currVal_7 = true; _ck(_v, 3, 0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7); }, null); }
function View_AddonModFeedbackFormPage_21(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 15, null, null, null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                                    "])), (_l()(), core["_31" /* ɵeld */](2, 0, null, null, 12, "ion-select", [["interface", "action-sheet"]], [[1, "required", 0], [2, "select-disabled", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "click"], [null, "keyup.space"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (core["_44" /* ɵnov */](_v, 5)._click($event) !== false);
        ad = (pd_0 && ad);
    } if (("keyup.space" === en)) {
        var pd_1 = (core["_44" /* ɵnov */](_v, 5)._keyup() !== false);
        ad = (pd_1 && ad);
    } if (("ngModelChange" === en)) {
        var pd_2 = ((_v.parent.parent.parent.context.$implicit.value = $event) !== false);
        ad = (pd_2 && ad);
    } return ad; }, select_ngfactory["b" /* View_Select_0 */], select_ngfactory["a" /* RenderType_Select */])), core["_30" /* ɵdid */](3, 16384, null, 0, esm5_forms["t" /* RequiredValidator */], [], { required: [0, "required"] }, null), core["_50" /* ɵprd */](1024, null, esm5_forms["k" /* NG_VALIDATORS */], function (p0_0) { return [p0_0]; }, [esm5_forms["t" /* RequiredValidator */]]), core["_30" /* ɵdid */](5, 1228800, null, 1, select_select["a" /* Select */], [app_app["a" /* App */], util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item["a" /* Item */]], deep_linker["a" /* DeepLinker */]], { interface: [0, "interface"] }, null), core["_52" /* ɵqud */](603979776, 17, { options: 1 }), core["_50" /* ɵprd */](1024, null, esm5_forms["l" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [select_select["a" /* Select */]]), core["_30" /* ɵdid */](8, 671744, null, 0, esm5_forms["q" /* NgModel */], [[8, null], [2, esm5_forms["k" /* NG_VALIDATORS */]], [8, null], [2, esm5_forms["l" /* NG_VALUE_ACCESSOR */]]], { name: [0, "name"], model: [1, "model"] }, { update: "ngModelChange" }), core["_50" /* ɵprd */](2048, null, esm5_forms["m" /* NgControl */], null, [esm5_forms["q" /* NgModel */]]), core["_30" /* ɵdid */](10, 16384, null, 0, esm5_forms["n" /* NgControlStatus */], [esm5_forms["m" /* NgControl */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                                        "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModFeedbackFormPage_22)), core["_30" /* ɵdid */](13, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                                    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                                "]))], function (_ck, _v) { var currVal_9 = _v.parent.parent.parent.context.$implicit.required; _ck(_v, 3, 0, currVal_9); var currVal_10 = "action-sheet"; _ck(_v, 5, 0, currVal_10); var currVal_11 = core["_34" /* ɵinlineInterpolate */](2, "", _v.parent.parent.parent.context.$implicit.typ, "_", _v.parent.parent.parent.context.$implicit.id, ""); var currVal_12 = _v.parent.parent.parent.context.$implicit.value; _ck(_v, 8, 0, currVal_11, currVal_12); var currVal_13 = _v.parent.parent.parent.context.$implicit.choices; _ck(_v, 13, 0, currVal_13); }, function (_ck, _v) { var currVal_0 = (core["_44" /* ɵnov */](_v, 3).required ? "" : null); var currVal_1 = core["_44" /* ɵnov */](_v, 5)._disabled; var currVal_2 = core["_44" /* ɵnov */](_v, 10).ngClassUntouched; var currVal_3 = core["_44" /* ɵnov */](_v, 10).ngClassTouched; var currVal_4 = core["_44" /* ɵnov */](_v, 10).ngClassPristine; var currVal_5 = core["_44" /* ɵnov */](_v, 10).ngClassDirty; var currVal_6 = core["_44" /* ɵnov */](_v, 10).ngClassValid; var currVal_7 = core["_44" /* ɵnov */](_v, 10).ngClassInvalid; var currVal_8 = core["_44" /* ɵnov */](_v, 10).ngClassPending; _ck(_v, 2, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8); }); }
function View_AddonModFeedbackFormPage_24(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "core-recaptcha", [["modelValueName", "value"]], null, null, null, recaptcha_ngfactory["b" /* View_CoreRecaptchaComponent_0 */], recaptcha_ngfactory["a" /* RenderType_CoreRecaptchaComponent */])), core["_30" /* ɵdid */](1, 114688, null, 0, recaptcha["a" /* CoreRecaptchaComponent */], [sites["a" /* CoreSitesProvider */], lang["a" /* CoreLangProvider */], utils_text["a" /* CoreTextUtilsProvider */], modal_controller["a" /* ModalController */]], { model: [0, "model"], publicKey: [1, "publicKey"], modelValueName: [2, "modelValueName"] }, null)], function (_ck, _v) { var currVal_0 = _v.parent.parent.parent.parent.context.$implicit; var currVal_1 = _v.parent.parent.parent.parent.context.$implicit.captcha.recaptchapublickey; var currVal_2 = "value"; _ck(_v, 1, 0, currVal_0, currVal_1, currVal_2); }, null); }
function View_AddonModFeedbackFormPage_25(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 5, "div", [["class", "core-warning-card"], ["icon-start", ""]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                                        "])), (_l()(), core["_31" /* ɵeld */](2, 0, null, null, 1, "ion-icon", [["name", "warning"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](3, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ɵted */](4, null, ["\n                                        ", "\n                                    "])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], function (_ck, _v) { var currVal_1 = "warning"; _ck(_v, 3, 0, currVal_1); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 3)._hidden; _ck(_v, 2, 0, currVal_0); var currVal_2 = core["_56" /* ɵunv */](_v, 4, 0, core["_44" /* ɵnov */](_v, 5).transform("addon.mod_feedback.captchaofflinewarning")); _ck(_v, 4, 0, currVal_2); }); }
function View_AddonModFeedbackFormPage_23(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 7, null, null, null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModFeedbackFormPage_24)), core["_30" /* ɵdid */](3, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModFeedbackFormPage_25)), core["_30" /* ɵdid */](6, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                                "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = (!_co.preview && !_co.offline); _ck(_v, 3, 0, currVal_0); var currVal_1 = (!_co.preview && (!_v.parent.parent.parent.context.$implicit.captcha || _co.offline)); _ck(_v, 6, 0, currVal_1); }, null); }
function View_AddonModFeedbackFormPage_10(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 29, "div", [["class", "addon-mod_feedback-form-content"], ["item-content", ""]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                            "])), (_l()(), core["_31" /* ɵeld */](2, 0, null, null, 26, null, null, null, null, null, null, null)), core["_30" /* ɵdid */](3, 16384, null, 0, common["o" /* NgSwitch */], [], { ngSwitch: [0, "ngSwitch"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModFeedbackFormPage_11)), core["_30" /* ɵdid */](6, 278528, null, 0, common["p" /* NgSwitchCase */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], common["o" /* NgSwitch */]], { ngSwitchCase: [0, "ngSwitchCase"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModFeedbackFormPage_12)), core["_30" /* ɵdid */](9, 278528, null, 0, common["p" /* NgSwitchCase */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], common["o" /* NgSwitch */]], { ngSwitchCase: [0, "ngSwitchCase"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModFeedbackFormPage_13)), core["_30" /* ɵdid */](12, 278528, null, 0, common["p" /* NgSwitchCase */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], common["o" /* NgSwitch */]], { ngSwitchCase: [0, "ngSwitchCase"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModFeedbackFormPage_16)), core["_30" /* ɵdid */](15, 278528, null, 0, common["p" /* NgSwitchCase */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], common["o" /* NgSwitch */]], { ngSwitchCase: [0, "ngSwitchCase"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModFeedbackFormPage_17)), core["_30" /* ɵdid */](18, 278528, null, 0, common["p" /* NgSwitchCase */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], common["o" /* NgSwitch */]], { ngSwitchCase: [0, "ngSwitchCase"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModFeedbackFormPage_19)), core["_30" /* ɵdid */](21, 278528, null, 0, common["p" /* NgSwitchCase */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], common["o" /* NgSwitch */]], { ngSwitchCase: [0, "ngSwitchCase"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModFeedbackFormPage_21)), core["_30" /* ɵdid */](24, 278528, null, 0, common["p" /* NgSwitchCase */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], common["o" /* NgSwitch */]], { ngSwitchCase: [0, "ngSwitchCase"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModFeedbackFormPage_23)), core["_30" /* ɵdid */](27, 278528, null, 0, common["p" /* NgSwitchCase */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], common["o" /* NgSwitch */]], { ngSwitchCase: [0, "ngSwitchCase"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "]))], function (_ck, _v) { var currVal_0 = _v.parent.parent.context.$implicit.template; _ck(_v, 3, 0, currVal_0); var currVal_1 = "label"; _ck(_v, 6, 0, currVal_1); var currVal_2 = "textfield"; _ck(_v, 9, 0, currVal_2); var currVal_3 = "numeric"; _ck(_v, 12, 0, currVal_3); var currVal_4 = "textarea"; _ck(_v, 15, 0, currVal_4); var currVal_5 = "multichoice-r"; _ck(_v, 18, 0, currVal_5); var currVal_6 = "multichoice-c"; _ck(_v, 21, 0, currVal_6); var currVal_7 = "multichoice-d"; _ck(_v, 24, 0, currVal_7); var currVal_8 = "captcha"; _ck(_v, 27, 0, currVal_8); }, null); }
function View_AddonModFeedbackFormPage_6(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 12, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], [[2, "core-danger-item", null]], null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], { color: [0, "color"] }, null), core["_52" /* ɵqud */](603979776, 7, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 8, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 9, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 1, 1, null, View_AddonModFeedbackFormPage_7)), core["_30" /* ɵdid */](8, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 3, 1, null, View_AddonModFeedbackFormPage_10)), core["_30" /* ɵdid */](11, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "]))], function (_ck, _v) { var currVal_1 = ((_v.parent.context.$implicit.dependitem > 0) ? "light" : ""); _ck(_v, 1, 0, currVal_1); var currVal_2 = _v.parent.context.$implicit.name; _ck(_v, 8, 0, currVal_2); var currVal_3 = _v.parent.context.$implicit.template; _ck(_v, 11, 0, currVal_3); }, function (_ck, _v) { var currVal_0 = (_v.parent.context.$implicit.isEmpty || _v.parent.context.$implicit.hasError); _ck(_v, 0, 0, currVal_0); }); }
function View_AddonModFeedbackFormPage_4(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 7, null, null, null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModFeedbackFormPage_5)), core["_30" /* ɵdid */](3, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModFeedbackFormPage_6)), core["_30" /* ɵdid */](6, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "]))], function (_ck, _v) { var currVal_0 = (_v.context.$implicit.typ == "pagebreak"); _ck(_v, 3, 0, currVal_0); var currVal_1 = (_v.context.$implicit.typ != "pagebreak"); _ck(_v, 6, 0, currVal_1); }, null); }
function View_AddonModFeedbackFormPage_27(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 10, "ion-col", [["class", "col"]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, col["a" /* Col */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                            "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 6, "button", [["block", ""], ["icon-start", ""], ["ion-button", ""], ["outline", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.gotoPage(true) !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](4, 1097728, null, 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { outline: [0, "outline"], block: [1, "block"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                                "])), (_l()(), core["_31" /* ɵeld */](6, 0, null, 0, 1, "ion-icon", [["name", "arrow-back"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](7, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ɵted */](8, 0, ["\n                                ", "\n                            "])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "]))], function (_ck, _v) { var currVal_0 = ""; var currVal_1 = ""; _ck(_v, 4, 0, currVal_0, currVal_1); var currVal_3 = "arrow-back"; _ck(_v, 7, 0, currVal_3); }, function (_ck, _v) { var currVal_2 = core["_44" /* ɵnov */](_v, 7)._hidden; _ck(_v, 6, 0, currVal_2); var currVal_4 = core["_56" /* ɵunv */](_v, 8, 0, core["_44" /* ɵnov */](_v, 9).transform("addon.mod_feedback.previous_page")); _ck(_v, 8, 0, currVal_4); }); }
function View_AddonModFeedbackFormPage_28(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 10, "ion-col", [["class", "col"]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, col["a" /* Col */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                            "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 6, "button", [["block", ""], ["icon-end", ""], ["ion-button", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.gotoPage(false) !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](4, 1097728, null, 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { block: [0, "block"] }, null), (_l()(), core["_55" /* ɵted */](5, 0, ["\n                                ", "\n                                "])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_31" /* ɵeld */](7, 0, null, 0, 1, "ion-icon", [["name", "arrow-forward"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](8, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "]))], function (_ck, _v) { var currVal_0 = ""; _ck(_v, 4, 0, currVal_0); var currVal_3 = "arrow-forward"; _ck(_v, 8, 0, currVal_3); }, function (_ck, _v) { var currVal_1 = core["_56" /* ɵunv */](_v, 5, 0, core["_44" /* ɵnov */](_v, 6).transform("addon.mod_feedback.next_page")); _ck(_v, 5, 0, currVal_1); var currVal_2 = core["_44" /* ɵnov */](_v, 8)._hidden; _ck(_v, 7, 0, currVal_2); }); }
function View_AddonModFeedbackFormPage_29(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 7, "ion-col", [["class", "col"]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, col["a" /* Col */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                            "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 3, "button", [["block", ""], ["ion-button", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.gotoPage(false) !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](4, 1097728, null, 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { block: [0, "block"] }, null), (_l()(), core["_55" /* ɵted */](5, 0, ["\n                                ", "\n                            "])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "]))], function (_ck, _v) { var currVal_0 = ""; _ck(_v, 4, 0, currVal_0); }, function (_ck, _v) { var currVal_1 = core["_56" /* ɵunv */](_v, 5, 0, core["_44" /* ɵnov */](_v, 6).transform("addon.mod_feedback.save_entries")); _ck(_v, 5, 0, currVal_1); }); }
function View_AddonModFeedbackFormPage_26(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 15, "ion-grid", [["class", "grid"]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, grid["a" /* Grid */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 11, "ion-row", [["align-items-center", ""], ["class", "row"]], null, null, null, null, null)), core["_30" /* ɵdid */](4, 16384, null, 0, row["a" /* Row */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModFeedbackFormPage_27)), core["_30" /* ɵdid */](7, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModFeedbackFormPage_28)), core["_30" /* ɵdid */](10, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                        "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModFeedbackFormPage_29)), core["_30" /* ɵdid */](13, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.hasPrevPage; _ck(_v, 7, 0, currVal_0); var currVal_1 = _co.hasNextPage; _ck(_v, 10, 0, currVal_1); var currVal_2 = !_co.hasNextPage; _ck(_v, 13, 0, currVal_2); }, null); }
function View_AddonModFeedbackFormPage_1(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 29, null, null, null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](2, 0, null, null, 26, "ion-list", [["no-margin", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](3, 16384, null, 0, list["a" /* List */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], platform["a" /* Platform */], gesture_controller["l" /* GestureController */], dom_controller["a" /* DomController */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ɵeld */](5, 0, null, null, 16, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](6, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 1, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 2, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 3, { _icons: 1 }), core["_30" /* ɵdid */](10, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](12, 0, null, 2, 2, "h2", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](13, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, 2, 1, null, View_AddonModFeedbackFormPage_2)), core["_30" /* ɵdid */](17, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, 2, 1, null, View_AddonModFeedbackFormPage_3)), core["_30" /* ɵdid */](20, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModFeedbackFormPage_4)), core["_30" /* ɵdid */](24, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModFeedbackFormPage_26)), core["_30" /* ɵdid */](27, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "]))], function (_ck, _v) { var _co = _v.component; var currVal_1 = _co.access.isanonymous; _ck(_v, 17, 0, currVal_1); var currVal_2 = !_co.access.isanonymous; _ck(_v, 20, 0, currVal_2); var currVal_3 = _co.items; _ck(_v, 24, 0, currVal_3); var currVal_4 = !_co.preview; _ck(_v, 27, 0, currVal_4); }, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 13, 0, core["_44" /* ɵnov */](_v, 14).transform("addon.mod_feedback.mode")); _ck(_v, 13, 0, currVal_0); }); }
function View_AddonModFeedbackFormPage_31(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "p", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](1, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], null, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 1, 0, core["_44" /* ɵnov */](_v, 2).transform("addon.mod_feedback.this_feedback_is_already_submitted")); _ck(_v, 1, 0, currVal_0); }); }
function View_AddonModFeedbackFormPage_32(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "p", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](1, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], null, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 1, 0, core["_44" /* ɵnov */](_v, 2).transform("addon.mod_feedback.feedback_submitted_offline")); _ck(_v, 1, 0, currVal_0); }); }
function View_AddonModFeedbackFormPage_33(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "p", [], null, null, null, null, null)), (_l()(), core["_31" /* ɵeld */](1, 16777216, null, null, 1, "core-format-text", [["componentId", "componentId"], ["contextLevel", "module"]], null, null, null, null, null)), core["_30" /* ɵdid */](2, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform["a" /* Platform */], utils_utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], app["a" /* CoreAppProvider */], contentlinks_providers_helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content_content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */], filter["a" /* CoreFilterProvider */], filter_providers_helper["a" /* CoreFilterHelperProvider */], delegate["a" /* CoreFilterDelegate */], core["_11" /* ViewContainerRef */]], { text: [0, "text"], component: [1, "component"], componentId: [2, "componentId"], contextLevel: [3, "contextLevel"], contextInstanceId: [4, "contextInstanceId"], courseId: [5, "courseId"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.completionPageContents; var currVal_1 = _co.component; var currVal_2 = "componentId"; var currVal_3 = "module"; var currVal_4 = _co.module.id; var currVal_5 = _co.courseId; _ck(_v, 2, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5); }, null); }
function View_AddonModFeedbackFormPage_30(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 13, "div", [["class", "core-success-card"], ["icon-start", ""]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](2, 0, null, null, 1, "ion-icon", [["name", "checkmark"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](3, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModFeedbackFormPage_31)), core["_30" /* ɵdid */](6, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModFeedbackFormPage_32)), core["_30" /* ɵdid */](9, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModFeedbackFormPage_33)), core["_30" /* ɵdid */](12, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "]))], function (_ck, _v) { var _co = _v.component; var currVal_1 = "checkmark"; _ck(_v, 3, 0, currVal_1); var currVal_2 = (!_co.completionPageContents && !_co.completedOffline); _ck(_v, 6, 0, currVal_2); var currVal_3 = (!_co.completionPageContents && _co.completedOffline); _ck(_v, 9, 0, currVal_3); var currVal_4 = _co.completionPageContents; _ck(_v, 12, 0, currVal_4); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 3)._hidden; _ck(_v, 2, 0, currVal_0); }); }
function View_AddonModFeedbackFormPage_35(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 10, "ion-col", [["class", "col"]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, col["a" /* Col */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 6, "button", [["block", ""], ["icon-start", ""], ["ion-button", ""], ["outline", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.showAnalysis() !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](4, 1097728, null, 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { outline: [0, "outline"], block: [1, "block"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                        "])), (_l()(), core["_31" /* ɵeld */](6, 0, null, 0, 1, "ion-icon", [["name", "stats"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](7, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ɵted */](8, 0, ["\n                        ", "\n                    "])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "]))], function (_ck, _v) { var currVal_0 = ""; var currVal_1 = ""; _ck(_v, 4, 0, currVal_0, currVal_1); var currVal_3 = "stats"; _ck(_v, 7, 0, currVal_3); }, function (_ck, _v) { var currVal_2 = core["_44" /* ɵnov */](_v, 7)._hidden; _ck(_v, 6, 0, currVal_2); var currVal_4 = core["_56" /* ɵunv */](_v, 8, 0, core["_44" /* ɵnov */](_v, 9).transform("addon.mod_feedback.completed_feedbacks")); _ck(_v, 8, 0, currVal_4); }); }
function View_AddonModFeedbackFormPage_36(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 10, "ion-col", [["class", "col"]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, col["a" /* Col */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 6, "button", [["block", ""], ["icon-end", ""], ["ion-button", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.continue() !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](4, 1097728, null, 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { block: [0, "block"] }, null), (_l()(), core["_55" /* ɵted */](5, 0, ["\n                        ", "\n                        "])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_31" /* ɵeld */](7, 0, null, 0, 1, "ion-icon", [["name", "arrow-forward"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](8, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "]))], function (_ck, _v) { var currVal_0 = ""; _ck(_v, 4, 0, currVal_0); var currVal_3 = "arrow-forward"; _ck(_v, 8, 0, currVal_3); }, function (_ck, _v) { var currVal_1 = core["_56" /* ɵunv */](_v, 5, 0, core["_44" /* ɵnov */](_v, 6).transform("core.continue")); _ck(_v, 5, 0, currVal_1); var currVal_2 = core["_44" /* ɵnov */](_v, 8)._hidden; _ck(_v, 7, 0, currVal_2); }); }
function View_AddonModFeedbackFormPage_34(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 12, "ion-grid", [["class", "grid"]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, grid["a" /* Grid */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 8, "ion-row", [["align-items-center", ""], ["class", "row"]], null, null, null, null, null)), core["_30" /* ɵdid */](4, 16384, null, 0, row["a" /* Row */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModFeedbackFormPage_35)), core["_30" /* ɵdid */](7, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModFeedbackFormPage_36)), core["_30" /* ɵdid */](10, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.access.canviewanalysis; _ck(_v, 7, 0, currVal_0); var currVal_1 = _co.hasNextPage; _ck(_v, 10, 0, currVal_1); }, null); }
function View_AddonModFeedbackFormPage_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 12, "ion-header", [], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, toolbar_header["a" /* Header */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, view_controller["a" /* ViewController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 8, "ion-navbar", [["class", "toolbar"], ["core-back-button", ""]], [[8, "hidden", 0], [2, "statusbar-padding", null]], null, null, navbar_ngfactory["b" /* View_Navbar_0 */], navbar_ngfactory["a" /* RenderType_Navbar */])), core["_30" /* ɵdid */](4, 49152, null, 0, navbar["a" /* Navbar */], [app_app["a" /* App */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_30" /* ɵdid */](5, 212992, null, 0, back_button["a" /* CoreBackButtonDirective */], [navbar["a" /* Navbar */], platform["a" /* Platform */], translate_service["a" /* TranslateService */], events["a" /* CoreEventsProvider */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n        "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 3, 3, "ion-title", [], null, null, null, toolbar_title_ngfactory["b" /* View_ToolbarTitle_0 */], toolbar_title_ngfactory["a" /* RenderType_ToolbarTitle */])), core["_30" /* ɵdid */](8, 49152, null, 0, toolbar_title["a" /* ToolbarTitle */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), (_l()(), core["_31" /* ɵeld */](9, 16777216, null, 0, 1, "core-format-text", [["contextLevel", "module"]], null, null, null, null, null)), core["_30" /* ɵdid */](10, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform["a" /* Platform */], utils_utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], app["a" /* CoreAppProvider */], contentlinks_providers_helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content_content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */], filter["a" /* CoreFilterProvider */], filter_providers_helper["a" /* CoreFilterHelperProvider */], delegate["a" /* CoreFilterDelegate */], core["_11" /* ViewContainerRef */]], { text: [0, "text"], contextLevel: [1, "contextLevel"], contextInstanceId: [2, "contextInstanceId"], courseId: [3, "courseId"] }, null), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_31" /* ɵeld */](14, 0, null, null, 15, "ion-content", [], [[2, "statusbar-padding", null], [2, "has-refresher", null]], null, null, content_ngfactory["b" /* View_Content_0 */], content_ngfactory["a" /* RenderType_Content */])), core["_30" /* ɵdid */](15, 4374528, null, 0, content_content["a" /* Content */], [config["a" /* Config */], platform["a" /* Platform */], dom_controller["a" /* DomController */], core["t" /* ElementRef */], core["V" /* Renderer */], app_app["a" /* App */], keyboard["a" /* Keyboard */], core["M" /* NgZone */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n    "])), (_l()(), core["_31" /* ɵeld */](17, 0, null, 1, 11, "core-loading", [], null, null, null, loading_ngfactory["b" /* View_CoreLoadingComponent_0 */], loading_ngfactory["a" /* RenderType_CoreLoadingComponent */])), core["_30" /* ɵdid */](18, 638976, null, 0, loading["a" /* CoreLoadingComponent */], [translate_service["a" /* TranslateService */], core["t" /* ElementRef */], events["a" /* CoreEventsProvider */], utils_utils["a" /* CoreUtilsProvider */]], { hideUntil: [0, "hideUntil"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonModFeedbackFormPage_1)), core["_30" /* ɵdid */](21, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonModFeedbackFormPage_30)), core["_30" /* ɵdid */](24, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonModFeedbackFormPage_34)), core["_30" /* ɵdid */](27, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; _ck(_v, 5, 0); var currVal_2 = _co.title; var currVal_3 = "module"; var currVal_4 = _co.module.id; var currVal_5 = _co.courseId; _ck(_v, 10, 0, currVal_2, currVal_3, currVal_4, currVal_5); var currVal_8 = _co.feedbackLoaded; _ck(_v, 18, 0, currVal_8); var currVal_9 = (_co.items && _co.items.length); _ck(_v, 21, 0, currVal_9); var currVal_10 = _co.completed; _ck(_v, 24, 0, currVal_10); var currVal_11 = _co.completed; _ck(_v, 27, 0, currVal_11); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 4)._hidden; var currVal_1 = core["_44" /* ɵnov */](_v, 4)._sbPadding; _ck(_v, 3, 0, currVal_0, currVal_1); var currVal_6 = core["_44" /* ɵnov */](_v, 15).statusbarPadding; var currVal_7 = core["_44" /* ɵnov */](_v, 15)._hasRefresher; _ck(_v, 14, 0, currVal_6, currVal_7); }); }
function View_AddonModFeedbackFormPage_Host_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "page-addon-mod-feedback-form", [], null, null, null, View_AddonModFeedbackFormPage_0, RenderType_AddonModFeedbackFormPage)), core["_30" /* ɵdid */](1, 180224, null, 0, form_AddonModFeedbackFormPage, [nav_params["a" /* NavParams */], feedback["a" /* AddonModFeedbackProvider */], app["a" /* CoreAppProvider */], utils_utils["a" /* CoreUtilsProvider */], dom["a" /* CoreDomUtilsProvider */], nav_controller["a" /* NavController */], helper["a" /* AddonModFeedbackHelperProvider */], course["a" /* CoreCourseProvider */], events["a" /* CoreEventsProvider */], sync["a" /* AddonModFeedbackSyncProvider */], _ionic_native_network["a" /* Network */], translate_service["a" /* TranslateService */], login_providers_helper["a" /* CoreLoginHelperProvider */], contentlinks_providers_helper["a" /* CoreContentLinksHelperProvider */], sites["a" /* CoreSitesProvider */], [2, content_content["a" /* Content */]], core["M" /* NgZone */], providers_helper["a" /* CoreCourseHelperProvider */]], null, null)], null, null); }
var AddonModFeedbackFormPageNgFactory = core["_27" /* ɵccf */]("page-addon-mod-feedback-form", form_AddonModFeedbackFormPage, View_AddonModFeedbackFormPage_Host_0, {}, {}, []);

//# sourceMappingURL=form.ngfactory.js.map
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

// EXTERNAL MODULE: ./src/pipes/pipes.module.ts + 2 modules
var pipes_module = __webpack_require__(108);

// EXTERNAL MODULE: ./src/core/block/components/components.module.ts
var block_components_components_module = __webpack_require__(275);

// EXTERNAL MODULE: ./src/core/course/components/components.module.ts
var course_components_components_module = __webpack_require__(75);

// EXTERNAL MODULE: ./node_modules/ionic-angular/util/module-loader.js
var module_loader = __webpack_require__(274);

// CONCATENATED MODULE: ./src/addon/mod/feedback/pages/form/form.module.ngfactory.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddonModFeedbackFormPageModuleNgFactory", function() { return AddonModFeedbackFormPageModuleNgFactory; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 








































var AddonModFeedbackFormPageModuleNgFactory = core["_28" /* ɵcmf */](form_module_AddonModFeedbackFormPageModule, [], function (_l) { return core["_40" /* ɵmod */]([core["_41" /* ɵmpd */](512, core["o" /* ComponentFactoryResolver */], core["_21" /* ɵCodegenComponentFactoryResolver */], [[8, [action_sheet_component_ngfactory["a" /* ActionSheetCmpNgFactory */], alert_component_ngfactory["a" /* AlertCmpNgFactory */], app_root_ngfactory["a" /* IonicAppNgFactory */], loading_component_ngfactory["a" /* LoadingCmpNgFactory */], modal_component_ngfactory["a" /* ModalCmpNgFactory */], picker_component_ngfactory["a" /* PickerCmpNgFactory */], popover_component_ngfactory["a" /* PopoverCmpNgFactory */], select_popover_component_ngfactory["a" /* SelectPopoverNgFactory */], toast_component_ngfactory["a" /* ToastCmpNgFactory */], context_menu_popover_ngfactory["a" /* CoreContextMenuPopoverComponentNgFactory */], course_picker_menu_popover_ngfactory["a" /* CoreCoursePickerMenuPopoverComponentNgFactory */], recaptchamodal_ngfactory["a" /* CoreRecaptchaModalComponentNgFactory */], bs_tooltip_ngfactory["a" /* CoreBSTooltipComponentNgFactory */], only_title_block_ngfactory["a" /* CoreBlockOnlyTitleComponentNgFactory */], pre_rendered_block_ngfactory["a" /* CoreBlockPreRenderedComponentNgFactory */], course_blocks_ngfactory["a" /* CoreBlockCourseBlocksComponentNgFactory */], unsupported_module_ngfactory["a" /* CoreCourseUnsupportedModuleComponentNgFactory */], tag_area_ngfactory["a" /* CoreCourseTagAreaComponentNgFactory */], index_ngfactory["a" /* AddonModFeedbackIndexComponentNgFactory */], AddonModFeedbackFormPageNgFactory]], [3, core["o" /* ComponentFactoryResolver */]], core["K" /* NgModuleRef */]]), core["_41" /* ɵmpd */](4608, common["m" /* NgLocalization */], common["l" /* NgLocaleLocalization */], [core["G" /* LOCALE_ID */], [2, common["w" /* ɵa */]]]), core["_41" /* ɵmpd */](4608, esm5_forms["x" /* ɵi */], esm5_forms["x" /* ɵi */], []), core["_41" /* ɵmpd */](4608, esm5_forms["d" /* FormBuilder */], esm5_forms["d" /* FormBuilder */], []), core["_41" /* ɵmpd */](4608, translate_loader["b" /* TranslateLoader */], translate_loader["a" /* TranslateFakeLoader */], []), core["_41" /* ɵmpd */](4608, translate_compiler["a" /* TranslateCompiler */], translate_compiler["b" /* TranslateFakeCompiler */], []), core["_41" /* ɵmpd */](4608, translate_parser["b" /* TranslateParser */], translate_parser["a" /* TranslateDefaultParser */], []), core["_41" /* ɵmpd */](4608, missing_translation_handler["b" /* MissingTranslationHandler */], missing_translation_handler["a" /* FakeMissingTranslationHandler */], []), core["_41" /* ɵmpd */](4608, translate_service["a" /* TranslateService */], translate_service["a" /* TranslateService */], [translate_store["a" /* TranslateStore */], translate_loader["b" /* TranslateLoader */], translate_compiler["a" /* TranslateCompiler */], translate_parser["b" /* TranslateParser */], missing_translation_handler["b" /* MissingTranslationHandler */], translate_service["b" /* USE_DEFAULT_LANG */], translate_service["c" /* USE_STORE */]]), core["_41" /* ɵmpd */](512, directives_module["a" /* CoreDirectivesModule */], directives_module["a" /* CoreDirectivesModule */], []), core["_41" /* ɵmpd */](512, common["b" /* CommonModule */], common["b" /* CommonModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["v" /* ɵba */], esm5_forms["v" /* ɵba */], []), core["_41" /* ɵmpd */](512, esm5_forms["i" /* FormsModule */], esm5_forms["i" /* FormsModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["s" /* ReactiveFormsModule */], esm5_forms["s" /* ReactiveFormsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["a" /* IonicModule */], ionic_angular_module["a" /* IonicModule */], []), core["_41" /* ɵmpd */](512, _ngx_translate_core["b" /* TranslateModule */], _ngx_translate_core["b" /* TranslateModule */], []), core["_41" /* ɵmpd */](512, pipes_module["a" /* CorePipesModule */], pipes_module["a" /* CorePipesModule */], []), core["_41" /* ɵmpd */](512, components_module["a" /* CoreComponentsModule */], components_module["a" /* CoreComponentsModule */], []), core["_41" /* ɵmpd */](512, block_components_components_module["a" /* CoreBlockComponentsModule */], block_components_components_module["a" /* CoreBlockComponentsModule */], []), core["_41" /* ɵmpd */](512, course_components_components_module["a" /* CoreCourseComponentsModule */], course_components_components_module["a" /* CoreCourseComponentsModule */], []), core["_41" /* ɵmpd */](512, components_components_module["a" /* AddonModFeedbackComponentsModule */], components_components_module["a" /* AddonModFeedbackComponentsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["b" /* IonicPageModule */], ionic_angular_module["b" /* IonicPageModule */], []), core["_41" /* ɵmpd */](512, form_module_AddonModFeedbackFormPageModule, form_module_AddonModFeedbackFormPageModule, []), core["_41" /* ɵmpd */](256, translate_service["c" /* USE_STORE */], undefined, []), core["_41" /* ɵmpd */](256, translate_service["b" /* USE_DEFAULT_LANG */], undefined, []), core["_41" /* ɵmpd */](256, module_loader["a" /* LAZY_LOADED_TOKEN */], form_AddonModFeedbackFormPage, [])]); });

//# sourceMappingURL=form.module.ngfactory.js.map

/***/ }),

/***/ 2179:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RenderType_CoreRecaptchaComponent; });
/* harmony export (immutable) */ __webpack_exports__["b"] = View_CoreRecaptchaComponent_0;
/* unused harmony export View_CoreRecaptchaComponent_Host_0 */
/* unused harmony export CoreRecaptchaComponentNgFactory */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_ionic_angular_components_button_button_ngfactory__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_components_button_button__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular_config_config__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core_src_translate_pipe__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core_src_translate_service__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ionic_angular_components_icon_icon__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__recaptcha__ = __webpack_require__(1558);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_sites__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_lang__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_utils_text__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ionic_angular_components_modal_modal_controller__ = __webpack_require__(164);
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 













var styles_CoreRecaptchaComponent = [];
var RenderType_CoreRecaptchaComponent = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_CoreRecaptchaComponent, data: {} });

function View_CoreRecaptchaComponent_2(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 3, "button", [["block", ""], ["ion-button", ""], ["type", "button"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.answerRecaptcha() !== false);
        ad = (pd_0 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_1__node_modules_ionic_angular_components_button_button_ngfactory__["b" /* View_Button_0 */], __WEBPACK_IMPORTED_MODULE_1__node_modules_ionic_angular_components_button_button_ngfactory__["a" /* RenderType_Button */])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](1, 1097728, null, 0, __WEBPACK_IMPORTED_MODULE_2_ionic_angular_components_button_button__["a" /* Button */], [[8, ""], __WEBPACK_IMPORTED_MODULE_3_ionic_angular_config_config__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */]], { block: [0, "block"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](2, 0, ["", ""])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_47" /* ɵpid */](131072, __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core_src_translate_pipe__["a" /* TranslatePipe */], [__WEBPACK_IMPORTED_MODULE_5__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */]])], function (_ck, _v) { var currVal_0 = ""; _ck(_v, 1, 0, currVal_0); }, function (_ck, _v) { var currVal_1 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_56" /* ɵunv */](_v, 2, 0, __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 3).transform("core.resourcedisplayopen")); _ck(_v, 2, 0, currVal_1); }); }
function View_CoreRecaptchaComponent_3(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 2, "p", [["class", "text-success"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](1, null, ["", ""])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_47" /* ɵpid */](131072, __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core_src_translate_pipe__["a" /* TranslatePipe */], [__WEBPACK_IMPORTED_MODULE_5__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */]])], null, function (_ck, _v) { var currVal_0 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_56" /* ɵunv */](_v, 1, 0, __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 2).transform("core.answered")); _ck(_v, 1, 0, currVal_0); }); }
function View_CoreRecaptchaComponent_4(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 2, "p", [["class", "text-danger"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](1, null, ["", ""])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_47" /* ɵpid */](131072, __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core_src_translate_pipe__["a" /* TranslatePipe */], [__WEBPACK_IMPORTED_MODULE_5__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */]])], null, function (_ck, _v) { var currVal_0 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_56" /* ɵunv */](_v, 1, 0, __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 2).transform("core.login.recaptchaexpired")); _ck(_v, 1, 0, currVal_0); }); }
function View_CoreRecaptchaComponent_1(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 12, "div", [], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreRecaptchaComponent_2)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](5, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_6__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewContainerRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreRecaptchaComponent_3)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](8, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_6__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewContainerRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreRecaptchaComponent_4)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](11, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_6__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewContainerRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = !_co.model[_co.modelValueName]; _ck(_v, 5, 0, currVal_0); var currVal_1 = _co.model[_co.modelValueName]; _ck(_v, 8, 0, currVal_1); var currVal_2 = _co.expired; _ck(_v, 11, 0, currVal_2); }, null); }
function View_CoreRecaptchaComponent_5(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 5, "div", [["class", "core-warning-card"], ["icon-start", ""]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](2, 0, null, null, 1, "ion-icon", [["name", "warning"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](3, 147456, null, 0, __WEBPACK_IMPORTED_MODULE_7_ionic_angular_components_icon_icon__["a" /* Icon */], [__WEBPACK_IMPORTED_MODULE_3_ionic_angular_config_config__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */]], { name: [0, "name"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](4, null, ["\n    ", "\n"])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_47" /* ɵpid */](131072, __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core_src_translate_pipe__["a" /* TranslatePipe */], [__WEBPACK_IMPORTED_MODULE_5__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */]])], function (_ck, _v) { var currVal_1 = "warning"; _ck(_v, 3, 0, currVal_1); }, function (_ck, _v) { var currVal_0 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 3)._hidden; _ck(_v, 2, 0, currVal_0); var currVal_2 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_56" /* ɵunv */](_v, 4, 0, __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 5).transform("core.errorloadingcontent")); _ck(_v, 4, 0, currVal_2); }); }
function View_CoreRecaptchaComponent_0(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreRecaptchaComponent_1)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](2, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_6__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewContainerRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreRecaptchaComponent_5)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](6, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_6__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewContainerRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.publicKey; _ck(_v, 2, 0, currVal_0); var currVal_1 = (!_co.challengehash && _co.challengeimage); _ck(_v, 6, 0, currVal_1); }, null); }
function View_CoreRecaptchaComponent_Host_0(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 1, "core-recaptcha", [], null, null, null, View_CoreRecaptchaComponent_0, RenderType_CoreRecaptchaComponent)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](1, 114688, null, 0, __WEBPACK_IMPORTED_MODULE_8__recaptcha__["a" /* CoreRecaptchaComponent */], [__WEBPACK_IMPORTED_MODULE_9__providers_sites__["a" /* CoreSitesProvider */], __WEBPACK_IMPORTED_MODULE_10__providers_lang__["a" /* CoreLangProvider */], __WEBPACK_IMPORTED_MODULE_11__providers_utils_text__["a" /* CoreTextUtilsProvider */], __WEBPACK_IMPORTED_MODULE_12_ionic_angular_components_modal_modal_controller__["a" /* ModalController */]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var CoreRecaptchaComponentNgFactory = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_27" /* ɵccf */]("core-recaptcha", __WEBPACK_IMPORTED_MODULE_8__recaptcha__["a" /* CoreRecaptchaComponent */], View_CoreRecaptchaComponent_Host_0, { model: "model", publicKey: "publicKey", modelValueName: "modelValueName", siteUrl: "siteUrl" }, {}, []);

//# sourceMappingURL=recaptcha.ngfactory.js.map

/***/ })

});
//# sourceMappingURL=26.js.map