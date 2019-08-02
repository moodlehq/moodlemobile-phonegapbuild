webpackJsonp([78],{

/***/ 2091:
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

// EXTERNAL MODULE: ./src/providers/sites.ts
var sites = __webpack_require__(1);

// EXTERNAL MODULE: ./src/providers/sync.ts
var sync = __webpack_require__(75);

// EXTERNAL MODULE: ./src/providers/file-session.ts
var file_session = __webpack_require__(172);

// EXTERNAL MODULE: ./src/providers/utils/dom.ts
var dom = __webpack_require__(4);

// EXTERNAL MODULE: ./src/providers/utils/text.ts
var utils_text = __webpack_require__(10);

// EXTERNAL MODULE: ./src/core/fileuploader/providers/fileuploader.ts
var fileuploader = __webpack_require__(68);

// EXTERNAL MODULE: ./src/addon/mod/workshop/providers/workshop.ts
var workshop = __webpack_require__(171);

// EXTERNAL MODULE: ./src/addon/mod/workshop/providers/helper.ts
var helper = __webpack_require__(197);

// EXTERNAL MODULE: ./src/addon/mod/workshop/providers/offline.ts
var offline = __webpack_require__(184);

// CONCATENATED MODULE: ./src/addon/mod/workshop/pages/edit-submission/edit-submission.ts
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
 * Page that displays the workshop edit submission.
 */
var edit_submission_AddonModWorkshopEditSubmissionPage = /** @class */ (function () {
    function AddonModWorkshopEditSubmissionPage(navParams, sitesProvider, fileUploaderProvider, workshopProvider, workshopOffline, workshopHelper, navCtrl, fileSessionprovider, syncProvider, textUtils, domUtils, fb, translate, eventsProvider) {
        this.fileUploaderProvider = fileUploaderProvider;
        this.workshopProvider = workshopProvider;
        this.workshopOffline = workshopOffline;
        this.workshopHelper = workshopHelper;
        this.navCtrl = navCtrl;
        this.fileSessionprovider = fileSessionprovider;
        this.syncProvider = syncProvider;
        this.textUtils = textUtils;
        this.domUtils = domUtils;
        this.fb = fb;
        this.translate = translate;
        this.eventsProvider = eventsProvider;
        this.submission = {
            id: 0,
            title: '',
            content: '',
            attachmentfiles: [],
        };
        this.loaded = false;
        this.component = workshop["a" /* AddonModWorkshopProvider */].COMPONENT;
        this.originalData = {};
        this.hasOffline = false;
        this.editing = false;
        this.forceLeave = false;
        this.isDestroyed = false;
        this.textAvailable = false;
        this.textRequired = false;
        this.fileAvailable = false;
        this.fileRequired = false;
        this.module = navParams.get('module');
        this.courseId = navParams.get('courseId');
        this.access = navParams.get('access');
        this.submissionId = navParams.get('submissionId');
        this.workshopId = this.module.instance;
        this.componentId = this.module.id;
        this.userId = sitesProvider.getCurrentSiteUserId();
        this.siteId = sitesProvider.getCurrentSiteId();
        this.editForm = new esm5_forms["g" /* FormGroup */]({});
        this.editForm.addControl('title', this.fb.control('', esm5_forms["u" /* Validators */].required));
        this.editForm.addControl('content', this.fb.control(''));
    }
    /**
     * Component being initialized.
     */
    AddonModWorkshopEditSubmissionPage.prototype.ngOnInit = function () {
        if (!this.isDestroyed) {
            // Block the workshop.
            this.syncProvider.blockOperation(this.component, this.workshopId);
        }
        this.fetchSubmissionData();
    };
    /**
     * Check if we can leave the page or not.
     *
     * @return {boolean|Promise<void>} Resolved if we can leave it, rejected if not.
     */
    AddonModWorkshopEditSubmissionPage.prototype.ionViewCanLeave = function () {
        var _this = this;
        if (this.forceLeave) {
            return true;
        }
        var promise;
        // Check if data has changed.
        if (!this.hasDataChanged()) {
            promise = Promise.resolve();
        }
        else {
            // Show confirmation if some data has been modified.
            promise = this.domUtils.showConfirm(this.translate.instant('core.confirmcanceledit'));
        }
        return promise.then(function () {
            if (_this.submission.attachmentfiles) {
                // Delete the local files from the tmp folder.
                _this.fileUploaderProvider.clearTmpFiles(_this.submission.attachmentfiles);
            }
        });
    };
    /**
     * Fetch the submission data.
     *
     * @return {Promise<void>} Resolved when done.
     */
    AddonModWorkshopEditSubmissionPage.prototype.fetchSubmissionData = function () {
        var _this = this;
        return this.workshopProvider.getWorkshop(this.courseId, this.module.id).then(function (workshopData) {
            _this.workshop = workshopData;
            _this.textAvailable = (_this.workshop.submissiontypetext != workshop["a" /* AddonModWorkshopProvider */].SUBMISSION_TYPE_DISABLED);
            _this.textRequired = (_this.workshop.submissiontypetext == workshop["a" /* AddonModWorkshopProvider */].SUBMISSION_TYPE_REQUIRED);
            _this.fileAvailable = (_this.workshop.submissiontypefile != workshop["a" /* AddonModWorkshopProvider */].SUBMISSION_TYPE_DISABLED);
            _this.fileRequired = (_this.workshop.submissiontypefile == workshop["a" /* AddonModWorkshopProvider */].SUBMISSION_TYPE_REQUIRED);
            _this.editForm.controls.content.setValidators(_this.textRequired ? esm5_forms["u" /* Validators */].required : null);
            if (_this.submissionId > 0) {
                _this.editing = true;
                return _this.workshopHelper.getSubmissionById(_this.workshopId, _this.submissionId).then(function (submissionData) {
                    _this.submission = submissionData;
                    var canEdit = (_this.userId == submissionData.authorid && _this.access.cansubmit &&
                        _this.access.modifyingsubmissionallowed);
                    if (!canEdit) {
                        // Should not happen, but go back if does.
                        _this.forceLeavePage();
                        return;
                    }
                });
            }
            else if (!_this.access.cansubmit || !_this.access.creatingsubmissionallowed) {
                // Should not happen, but go back if does.
                _this.forceLeavePage();
                return;
            }
        }).then(function () {
            return _this.workshopOffline.getSubmissions(_this.workshopId).then(function (submissionsActions) {
                if (submissionsActions && submissionsActions.length) {
                    _this.hasOffline = true;
                    var actions = _this.workshopHelper.filterSubmissionActions(submissionsActions, _this.editing ?
                        _this.submission.id : 0);
                    return _this.workshopHelper.applyOfflineData(_this.submission, actions);
                }
                else {
                    _this.hasOffline = false;
                }
            }).finally(function () {
                _this.originalData.title = _this.submission.title;
                _this.originalData.content = _this.submission.content;
                _this.originalData.attachmentfiles = [];
                _this.submission.attachmentfiles.forEach(function (file) {
                    var filename;
                    if (file.filename) {
                        filename = file.filename;
                    }
                    else {
                        // We don't have filename, extract it from the path.
                        filename = file.filepath[0] == '/' ? file.filepath.substr(1) : file.filepath;
                    }
                    _this.originalData.attachmentfiles.push({
                        filename: filename,
                        fileurl: file.fileurl
                    });
                });
            });
        }).then(function () {
            _this.editForm.controls['title'].setValue(_this.submission.title);
            _this.editForm.controls['content'].setValue(_this.submission.content);
            var submissionId = _this.submission.id || 'newsub';
            _this.fileSessionprovider.setFiles(_this.component, _this.workshopId + '_' + submissionId, _this.submission.attachmentfiles || []);
            _this.loaded = true;
        }).catch(function (message) {
            _this.loaded = false;
            _this.domUtils.showErrorModalDefault(message, 'core.course.errorgetmodule', true);
            _this.forceLeavePage();
        });
    };
    /**
     * Force leaving the page, without checking for changes.
     */
    AddonModWorkshopEditSubmissionPage.prototype.forceLeavePage = function () {
        this.forceLeave = true;
        this.navCtrl.pop();
    };
    /**
     * Get the form input data.
     *
     * @return {any} Object with all the info.
     */
    AddonModWorkshopEditSubmissionPage.prototype.getInputData = function () {
        var submissionId = this.submission.id || 'newsub';
        var values = {
            title: this.editForm.value.title,
            content: null,
            attachmentfiles: []
        };
        if (this.textAvailable) {
            values.content = this.editForm.value.content || '';
        }
        if (this.fileAvailable) {
            values.attachmentfiles = this.fileSessionprovider.getFiles(this.component, this.workshopId + '_' + submissionId) || [];
        }
        return values;
    };
    /**
     * Check if data has changed.
     *
     * @return {boolean} True if changed or false if not.
     */
    AddonModWorkshopEditSubmissionPage.prototype.hasDataChanged = function () {
        if (!this.loaded) {
            return false;
        }
        var inputData = this.getInputData();
        if (!this.originalData || typeof this.originalData.title == 'undefined') {
            // There is no original data, assume it hasn't changed.
            return false;
        }
        if (this.originalData.title != inputData.title || this.textAvailable && this.originalData.content != inputData.content) {
            return true;
        }
        if (this.fileAvailable) {
            return this.fileUploaderProvider.areFileListDifferent(inputData.attachmentfiles, this.originalData.attachmentfiles);
        }
        return false;
    };
    /**
     * Pull to refresh.
     *
     * @param {any} refresher Refresher.
     */
    AddonModWorkshopEditSubmissionPage.prototype.refreshSubmission = function (refresher) {
        var _this = this;
        if (this.loaded) {
            var promises = [];
            promises.push(this.workshopProvider.invalidateSubmissionData(this.workshopId, this.submission.id));
            promises.push(this.workshopProvider.invalidateSubmissionsData(this.workshopId));
            Promise.all(promises).finally(function () {
                return _this.fetchSubmissionData();
            }).finally(function () {
                refresher.complete();
            });
        }
    };
    /**
     * Save the submission.
     */
    AddonModWorkshopEditSubmissionPage.prototype.save = function () {
        var _this = this;
        // Check if data has changed.
        if (this.hasDataChanged()) {
            this.saveSubmission().then(function () {
                // Go back to entry list.
                _this.forceLeavePage();
            }).catch(function () {
                // Nothing to do.
            });
        }
        else {
            // Nothing to save, just go back.
            this.forceLeavePage();
        }
    };
    /**
     * Send submission and save.
     *
     * @return {Promise<any>} Resolved when done.
     */
    AddonModWorkshopEditSubmissionPage.prototype.saveSubmission = function () {
        var _this = this;
        var inputData = this.getInputData();
        if (!inputData.title) {
            this.domUtils.showAlertTranslated('core.notice', 'addon.mod_workshop.submissionrequiredtitle');
            return Promise.reject(null);
        }
        var noText = this.textUtils.htmlIsBlank(inputData.content);
        var noFiles = !inputData.attachmentfiles.length;
        if (this.textRequired && noText || this.fileRequired && noFiles || noText && noFiles) {
            this.domUtils.showAlertTranslated('core.notice', 'addon.mod_workshop.submissionrequiredcontent');
            return Promise.reject(null);
        }
        var allowOffline = true, saveOffline = false;
        var modal = this.domUtils.showModalLoading('core.sending', true), submissionId = this.submission.id;
        // Add some HTML to the message if needed.
        if (this.textAvailable) {
            inputData.content = this.textUtils.formatHtmlLines(inputData.content);
        }
        // Upload attachments first if any.
        allowOffline = !inputData.attachmentfiles.length;
        return this.workshopHelper.uploadOrStoreSubmissionFiles(this.workshopId, this.submission.id, inputData.attachmentfiles, this.editing, saveOffline).catch(function () {
            // Cannot upload them in online, save them in offline.
            saveOffline = true;
            allowOffline = true;
            return _this.workshopHelper.uploadOrStoreSubmissionFiles(_this.workshopId, _this.submission.id, inputData.attachmentfiles, _this.editing, saveOffline);
        }).then(function (attachmentsId) {
            if (!saveOffline && !_this.fileAvailable) {
                attachmentsId = null;
            }
            if (_this.editing) {
                if (saveOffline) {
                    // Save submission in offline.
                    return _this.workshopOffline.saveSubmission(_this.workshopId, _this.courseId, inputData.title, inputData.content, attachmentsId, submissionId, 'update').then(function () {
                        // Don't return anything.
                    });
                }
                // Try to send it to server.
                // Don't allow offline if there are attachments since they were uploaded fine.
                return _this.workshopProvider.updateSubmission(_this.workshopId, submissionId, _this.courseId, inputData.title, inputData.content, attachmentsId, undefined, allowOffline);
            }
            if (saveOffline) {
                // Save submission in offline.
                return _this.workshopOffline.saveSubmission(_this.workshopId, _this.courseId, inputData.title, inputData.content, attachmentsId, submissionId, 'add').then(function () {
                    // Don't return anything.
                });
            }
            // Try to send it to server.
            // Don't allow offline if there are attachments since they were uploaded fine.
            return _this.workshopProvider.addSubmission(_this.workshopId, _this.courseId, inputData.title, inputData.content, attachmentsId, undefined, submissionId, allowOffline);
        }).then(function (newSubmissionId) {
            var data = {
                workshopId: _this.workshopId,
                cmId: _this.module.cmid
            };
            if (newSubmissionId && submissionId) {
                // Data sent to server, delete stored files (if any).
                _this.workshopOffline.deleteSubmissionAction(_this.workshopId, submissionId, _this.editing ? 'update' : 'add');
                _this.workshopHelper.deleteSubmissionStoredFiles(_this.workshopId, submissionId, _this.editing);
                data['submissionId'] = newSubmissionId;
            }
            var promise = newSubmissionId ? _this.workshopProvider.invalidateSubmissionData(_this.workshopId, newSubmissionId) :
                Promise.resolve();
            return promise.finally(function () {
                _this.eventsProvider.trigger(workshop["a" /* AddonModWorkshopProvider */].SUBMISSION_CHANGED, data, _this.siteId);
                // Delete the local files from the tmp folder.
                _this.fileUploaderProvider.clearTmpFiles(inputData.attachmentfiles);
            });
        }).catch(function (message) {
            _this.domUtils.showErrorModalDefault(message, 'Cannot save submission');
        }).finally(function () {
            modal.dismiss();
        });
    };
    /**
     * Component being destroyed.
     */
    AddonModWorkshopEditSubmissionPage.prototype.ngOnDestroy = function () {
        this.isDestroyed = true;
        this.syncProvider.unblockOperation(this.component, this.workshopId);
    };
    AddonModWorkshopEditSubmissionPage = __decorate([
        Object(core["m" /* Component */])({
            selector: 'page-addon-mod-workshop-edit-submission',
            templateUrl: 'edit-submission.html',
        }),
        __metadata("design:paramtypes", [ionic_angular["t" /* NavParams */], sites["a" /* CoreSitesProvider */], fileuploader["a" /* CoreFileUploaderProvider */],
            workshop["a" /* AddonModWorkshopProvider */], offline["a" /* AddonModWorkshopOfflineProvider */],
            helper["a" /* AddonModWorkshopHelperProvider */], ionic_angular["s" /* NavController */],
            file_session["a" /* CoreFileSessionProvider */], sync["a" /* CoreSyncProvider */],
            utils_text["a" /* CoreTextUtilsProvider */], dom["a" /* CoreDomUtilsProvider */], esm5_forms["d" /* FormBuilder */],
            _ngx_translate_core["c" /* TranslateService */], events["a" /* CoreEventsProvider */]])
    ], AddonModWorkshopEditSubmissionPage);
    return AddonModWorkshopEditSubmissionPage;
}());

//# sourceMappingURL=edit-submission.js.map
// CONCATENATED MODULE: ./src/addon/mod/workshop/pages/edit-submission/edit-submission.module.ts
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
var edit_submission_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var edit_submission_module_AddonModWorkshopEditSubmissionPageModule = /** @class */ (function () {
    function AddonModWorkshopEditSubmissionPageModule() {
    }
    AddonModWorkshopEditSubmissionPageModule = edit_submission_module___decorate([
        Object(core["I" /* NgModule */])({
            declarations: [
                edit_submission_AddonModWorkshopEditSubmissionPage,
            ],
            imports: [
                directives_module["a" /* CoreDirectivesModule */],
                components_module["a" /* CoreComponentsModule */],
                ionic_angular["l" /* IonicPageModule */].forChild(edit_submission_AddonModWorkshopEditSubmissionPage),
                _ngx_translate_core["b" /* TranslateModule */].forChild()
            ],
        })
    ], AddonModWorkshopEditSubmissionPageModule);
    return AddonModWorkshopEditSubmissionPageModule;
}());

//# sourceMappingURL=edit-submission.module.js.map
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

// EXTERNAL MODULE: ./src/components/mark-required/mark-required.ngfactory.js
var mark_required_ngfactory = __webpack_require__(88);

// EXTERNAL MODULE: ./src/components/mark-required/mark-required.ts
var mark_required = __webpack_require__(80);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.service.js
var translate_service = __webpack_require__(18);

// EXTERNAL MODULE: ./src/providers/utils/utils.ts
var utils = __webpack_require__(2);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/label/label.js
var label = __webpack_require__(63);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.pipe.js
var translate_pipe = __webpack_require__(28);

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

// EXTERNAL MODULE: ./src/components/attachments/attachments.ngfactory.js
var attachments_ngfactory = __webpack_require__(481);

// EXTERNAL MODULE: ./src/components/attachments/attachments.ts
var attachments = __webpack_require__(311);

// EXTERNAL MODULE: ./src/providers/app.ts
var app = __webpack_require__(9);

// EXTERNAL MODULE: ./src/core/fileuploader/providers/helper.ts
var providers_helper = __webpack_require__(141);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/input/input.ngfactory.js
var input_ngfactory = __webpack_require__(104);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/input/input.js
var input = __webpack_require__(84);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/app/app.js + 3 modules
var app_app = __webpack_require__(34);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/dom-controller.js
var dom_controller = __webpack_require__(33);

// EXTERNAL MODULE: ./node_modules/@angular/common/esm5/common.js
var common = __webpack_require__(8);

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

// CONCATENATED MODULE: ./src/addon/mod/workshop/pages/edit-submission/edit-submission.ngfactory.js
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 





























































var styles_AddonModWorkshopEditSubmissionPage = [];
var RenderType_AddonModWorkshopEditSubmissionPage = core["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_AddonModWorkshopEditSubmissionPage, data: {} });

function View_AddonModWorkshopEditSubmissionPage_2(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 19, "ion-item", [["class", "item item-block"]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 5, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 6, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 7, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 1, 4, "ion-label", [["stacked", ""]], null, null, null, mark_required_ngfactory["b" /* View_CoreMarkRequiredComponent_0 */], mark_required_ngfactory["a" /* RenderType_CoreMarkRequiredComponent */])), core["_30" /* ɵdid */](8, 4308992, null, 0, mark_required["a" /* CoreMarkRequiredComponent */], [core["t" /* ElementRef */], translate_service["a" /* TranslateService */], utils_text["a" /* CoreTextUtilsProvider */], utils["a" /* CoreUtilsProvider */]], { coreMarkRequired: [0, "coreMarkRequired"] }, null), core["_30" /* ɵdid */](9, 16384, [[5, 4]], 0, label["a" /* Label */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, ""], [8, null], [8, null]], null, null), (_l()(), core["_55" /* ɵted */](10, 0, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](13, 0, null, 3, 5, "core-rich-text-editor", [["formControlName", "content"], ["item-content", ""], ["name", "content"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], null, null, rich_text_editor_ngfactory["b" /* View_CoreRichTextEditorComponent_0 */], rich_text_editor_ngfactory["a" /* RenderType_CoreRichTextEditorComponent */])), core["_30" /* ɵdid */](14, 1228800, null, 0, rich_text_editor["a" /* CoreRichTextEditorComponent */], [dom["a" /* CoreDomUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], sites["a" /* CoreSitesProvider */], filepool["a" /* CoreFilepoolProvider */], [2, content["a" /* Content */]], core["t" /* ElementRef */], events["a" /* CoreEventsProvider */], utils["a" /* CoreUtilsProvider */], platform["a" /* Platform */]], { placeholder: [0, "placeholder"], control: [1, "control"], name: [2, "name"], component: [3, "component"], componentId: [4, "componentId"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), core["_30" /* ɵdid */](16, 671744, null, 0, esm5_forms["f" /* FormControlName */], [[3, esm5_forms["b" /* ControlContainer */]], [8, null], [8, null], [8, null]], { name: [0, "name"] }, null), core["_50" /* ɵprd */](2048, null, esm5_forms["m" /* NgControl */], null, [esm5_forms["f" /* FormControlName */]]), core["_30" /* ɵdid */](18, 16384, null, 0, esm5_forms["n" /* NgControlStatus */], [esm5_forms["m" /* NgControl */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.textRequired; _ck(_v, 8, 0, currVal_0); var currVal_9 = core["_56" /* ɵunv */](_v, 14, 0, core["_44" /* ɵnov */](_v, 15).transform("addon.mod_workshop.submissioncontent")); var currVal_10 = _co.editForm.controls["content"]; var currVal_11 = "content"; var currVal_12 = _co.component; var currVal_13 = _co.componentId; _ck(_v, 14, 0, currVal_9, currVal_10, currVal_11, currVal_12, currVal_13); var currVal_14 = "content"; _ck(_v, 16, 0, currVal_14); }, function (_ck, _v) { var currVal_1 = core["_56" /* ɵunv */](_v, 10, 0, core["_44" /* ɵnov */](_v, 11).transform("addon.mod_workshop.submissioncontent")); _ck(_v, 10, 0, currVal_1); var currVal_2 = core["_44" /* ɵnov */](_v, 18).ngClassUntouched; var currVal_3 = core["_44" /* ɵnov */](_v, 18).ngClassTouched; var currVal_4 = core["_44" /* ɵnov */](_v, 18).ngClassPristine; var currVal_5 = core["_44" /* ɵnov */](_v, 18).ngClassDirty; var currVal_6 = core["_44" /* ɵnov */](_v, 18).ngClassValid; var currVal_7 = core["_44" /* ɵnov */](_v, 18).ngClassInvalid; var currVal_8 = core["_44" /* ɵnov */](_v, 18).ngClassPending; _ck(_v, 13, 0, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8); }); }
function View_AddonModWorkshopEditSubmissionPage_3(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "core-attachments", [["allowOffline", "true"]], null, null, null, attachments_ngfactory["b" /* View_CoreAttachmentsComponent_0 */], attachments_ngfactory["a" /* RenderType_CoreAttachmentsComponent */])), core["_30" /* ɵdid */](1, 114688, null, 0, attachments["a" /* CoreAttachmentsComponent */], [app["a" /* CoreAppProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], fileuploader["a" /* CoreFileUploaderProvider */], translate_service["a" /* TranslateService */], providers_helper["a" /* CoreFileUploaderHelperProvider */]], { files: [0, "files"], maxSize: [1, "maxSize"], maxSubmissions: [2, "maxSubmissions"], component: [3, "component"], componentId: [4, "componentId"], allowOffline: [5, "allowOffline"], acceptedTypes: [6, "acceptedTypes"], required: [7, "required"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.submission.attachmentfiles; var currVal_1 = _co.workshop.maxbytes; var currVal_2 = _co.workshop.nattachments; var currVal_3 = _co.component; var currVal_4 = _co.workshop.cmid; var currVal_5 = "true"; var currVal_6 = _co.workshop.submissionfiletypes; var currVal_7 = _co.fileRequired; _ck(_v, 1, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7); }, null); }
function View_AddonModWorkshopEditSubmissionPage_1(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 32, "form", [["ion-list", ""], ["novalidate", ""]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "submit"], [null, "reset"]], function (_v, en, $event) { var ad = true; if (("submit" === en)) {
        var pd_0 = (core["_44" /* ɵnov */](_v, 2).onSubmit($event) !== false);
        ad = (pd_0 && ad);
    } if (("reset" === en)) {
        var pd_1 = (core["_44" /* ɵnov */](_v, 2).onReset() !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, esm5_forms["w" /* ɵbf */], [], null, null), core["_30" /* ɵdid */](2, 540672, null, 0, esm5_forms["h" /* FormGroupDirective */], [[8, null], [8, null]], { form: [0, "form"] }, null), core["_50" /* ɵprd */](2048, null, esm5_forms["b" /* ControlContainer */], null, [esm5_forms["h" /* FormGroupDirective */]]), core["_30" /* ɵdid */](4, 16384, null, 0, esm5_forms["o" /* NgControlStatusGroup */], [esm5_forms["b" /* ControlContainer */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](6, 0, null, null, 19, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](7, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 2, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 3, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 4, { _icons: 1 }), core["_30" /* ɵdid */](11, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](13, 0, null, 1, 4, "ion-label", [["core-mark-required", "true"], ["stacked", ""]], null, null, null, mark_required_ngfactory["b" /* View_CoreMarkRequiredComponent_0 */], mark_required_ngfactory["a" /* RenderType_CoreMarkRequiredComponent */])), core["_30" /* ɵdid */](14, 4308992, null, 0, mark_required["a" /* CoreMarkRequiredComponent */], [core["t" /* ElementRef */], translate_service["a" /* TranslateService */], utils_text["a" /* CoreTextUtilsProvider */], utils["a" /* CoreUtilsProvider */]], { coreMarkRequired: [0, "coreMarkRequired"] }, null), core["_30" /* ɵdid */](15, 16384, [[2, 4]], 0, label["a" /* Label */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, ""], [8, null], [8, null]], null, null), (_l()(), core["_55" /* ɵted */](16, 0, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](19, 0, null, 3, 5, "ion-input", [["formControlName", "title"], ["name", "title"], ["type", "text"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], null, null, input_ngfactory["b" /* View_TextInput_0 */], input_ngfactory["a" /* RenderType_TextInput */])), core["_30" /* ɵdid */](20, 671744, null, 0, esm5_forms["f" /* FormControlName */], [[3, esm5_forms["b" /* ControlContainer */]], [8, null], [8, null], [8, null]], { name: [0, "name"] }, null), core["_50" /* ɵprd */](2048, null, esm5_forms["m" /* NgControl */], null, [esm5_forms["f" /* FormControlName */]]), core["_30" /* ɵdid */](22, 16384, null, 0, esm5_forms["n" /* NgControlStatus */], [esm5_forms["m" /* NgControl */]], null, null), core["_30" /* ɵdid */](23, 5423104, null, 0, input["a" /* TextInput */], [config["a" /* Config */], platform["a" /* Platform */], util_form["a" /* Form */], app_app["a" /* App */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, content["a" /* Content */]], [2, item["a" /* Item */]], [2, esm5_forms["m" /* NgControl */]], dom_controller["a" /* DomController */]], { type: [0, "type"], placeholder: [1, "placeholder"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModWorkshopEditSubmissionPage_2)), core["_30" /* ɵdid */](28, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModWorkshopEditSubmissionPage_3)), core["_30" /* ɵdid */](31, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "]))], function (_ck, _v) { var _co = _v.component; var currVal_7 = _co.editForm; _ck(_v, 2, 0, currVal_7); var currVal_8 = "true"; _ck(_v, 14, 0, currVal_8); var currVal_17 = "title"; _ck(_v, 20, 0, currVal_17); var currVal_18 = "text"; var currVal_19 = core["_56" /* ɵunv */](_v, 23, 1, core["_44" /* ɵnov */](_v, 24).transform("addon.mod_workshop.submissiontitle")); _ck(_v, 23, 0, currVal_18, currVal_19); var currVal_20 = _co.textAvailable; _ck(_v, 28, 0, currVal_20); var currVal_21 = _co.fileAvailable; _ck(_v, 31, 0, currVal_21); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 4).ngClassUntouched; var currVal_1 = core["_44" /* ɵnov */](_v, 4).ngClassTouched; var currVal_2 = core["_44" /* ɵnov */](_v, 4).ngClassPristine; var currVal_3 = core["_44" /* ɵnov */](_v, 4).ngClassDirty; var currVal_4 = core["_44" /* ɵnov */](_v, 4).ngClassValid; var currVal_5 = core["_44" /* ɵnov */](_v, 4).ngClassInvalid; var currVal_6 = core["_44" /* ɵnov */](_v, 4).ngClassPending; _ck(_v, 0, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6); var currVal_9 = core["_56" /* ɵunv */](_v, 16, 0, core["_44" /* ɵnov */](_v, 17).transform("addon.mod_workshop.submissiontitle")); _ck(_v, 16, 0, currVal_9); var currVal_10 = core["_44" /* ɵnov */](_v, 22).ngClassUntouched; var currVal_11 = core["_44" /* ɵnov */](_v, 22).ngClassTouched; var currVal_12 = core["_44" /* ɵnov */](_v, 22).ngClassPristine; var currVal_13 = core["_44" /* ɵnov */](_v, 22).ngClassDirty; var currVal_14 = core["_44" /* ɵnov */](_v, 22).ngClassValid; var currVal_15 = core["_44" /* ɵnov */](_v, 22).ngClassInvalid; var currVal_16 = core["_44" /* ɵnov */](_v, 22).ngClassPending; _ck(_v, 19, 0, currVal_10, currVal_11, currVal_12, currVal_13, currVal_14, currVal_15, currVal_16); }); }
function View_AddonModWorkshopEditSubmissionPage_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 23, "ion-header", [], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, toolbar_header["a" /* Header */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, view_controller["a" /* ViewController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 19, "ion-navbar", [["class", "toolbar"], ["core-back-button", ""]], [[8, "hidden", 0], [2, "statusbar-padding", null]], null, null, navbar_ngfactory["b" /* View_Navbar_0 */], navbar_ngfactory["a" /* RenderType_Navbar */])), core["_30" /* ɵdid */](4, 49152, null, 0, navbar["a" /* Navbar */], [app_app["a" /* App */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_30" /* ɵdid */](5, 212992, null, 0, back_button["a" /* CoreBackButtonDirective */], [navbar["a" /* Navbar */], platform["a" /* Platform */], translate_service["a" /* TranslateService */], events["a" /* CoreEventsProvider */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n        "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 3, 3, "ion-title", [], null, null, null, toolbar_title_ngfactory["b" /* View_ToolbarTitle_0 */], toolbar_title_ngfactory["a" /* RenderType_ToolbarTitle */])), core["_30" /* ɵdid */](8, 49152, null, 0, toolbar_title["a" /* ToolbarTitle */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), (_l()(), core["_55" /* ɵted */](9, 0, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n        "])), (_l()(), core["_31" /* ɵeld */](12, 0, null, 2, 9, "ion-buttons", [["end", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](13, 16384, null, 1, toolbar_item["a" /* ToolbarItem */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), core["_52" /* ɵqud */](603979776, 1, { _buttons: 1 }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](16, 0, null, null, 4, "button", [["clear", ""], ["ion-button", ""]], [[1, "aria-label", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.save() !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](17, 1097728, [[1, 4]], 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { clear: [0, "clear"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](19, 0, ["\n                ", "\n            "])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_31" /* ɵeld */](25, 0, null, null, 17, "ion-content", [], [[2, "statusbar-padding", null], [2, "has-refresher", null]], null, null, content_ngfactory["b" /* View_Content_0 */], content_ngfactory["a" /* RenderType_Content */])), core["_30" /* ɵdid */](26, 4374528, null, 0, content["a" /* Content */], [config["a" /* Config */], platform["a" /* Platform */], dom_controller["a" /* DomController */], core["t" /* ElementRef */], core["V" /* Renderer */], app_app["a" /* App */], keyboard["a" /* Keyboard */], core["M" /* NgZone */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n    "])), (_l()(), core["_31" /* ɵeld */](28, 0, null, 2, 6, "ion-refresher", [], [[2, "refresher-active", null], [4, "top", null]], [[null, "ionRefresh"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("ionRefresh" === en)) {
        var pd_0 = (_co.refreshSubmission($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), core["_30" /* ɵdid */](29, 212992, null, 0, refresher["a" /* Refresher */], [platform["a" /* Platform */], content["a" /* Content */], core["M" /* NgZone */], gesture_controller["l" /* GestureController */]], { enabled: [0, "enabled"] }, { ionRefresh: "ionRefresh" }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_31" /* ɵeld */](31, 0, null, null, 2, "ion-refresher-content", [], [[1, "state", 0]], null, null, refresher_content_ngfactory["b" /* View_RefresherContent_0 */], refresher_content_ngfactory["a" /* RenderType_RefresherContent */])), core["_30" /* ɵdid */](32, 114688, null, 0, refresher_content["a" /* RefresherContent */], [refresher["a" /* Refresher */], config["a" /* Config */]], { pullingText: [0, "pullingText"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n    "])), (_l()(), core["_31" /* ɵeld */](36, 0, null, 1, 5, "core-loading", [], null, null, null, loading_ngfactory["b" /* View_CoreLoadingComponent_0 */], loading_ngfactory["a" /* RenderType_CoreLoadingComponent */])), core["_30" /* ɵdid */](37, 638976, null, 0, loading["a" /* CoreLoadingComponent */], [translate_service["a" /* TranslateService */], core["t" /* ElementRef */], events["a" /* CoreEventsProvider */], utils["a" /* CoreUtilsProvider */]], { hideUntil: [0, "hideUntil"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonModWorkshopEditSubmissionPage_1)), core["_30" /* ɵdid */](40, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; _ck(_v, 5, 0); var currVal_4 = ""; _ck(_v, 17, 0, currVal_4); var currVal_10 = _co.loaded; _ck(_v, 29, 0, currVal_10); var currVal_12 = core["_34" /* ɵinlineInterpolate */](1, "", core["_56" /* ɵunv */](_v, 32, 0, core["_44" /* ɵnov */](_v, 33).transform("core.pulltorefresh")), ""); _ck(_v, 32, 0, currVal_12); var currVal_13 = _co.loaded; _ck(_v, 37, 0, currVal_13); var currVal_14 = _co.workshop; _ck(_v, 40, 0, currVal_14); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 4)._hidden; var currVal_1 = core["_44" /* ɵnov */](_v, 4)._sbPadding; _ck(_v, 3, 0, currVal_0, currVal_1); var currVal_2 = core["_56" /* ɵunv */](_v, 9, 0, core["_44" /* ɵnov */](_v, 10).transform("addon.mod_workshop.editsubmission")); _ck(_v, 9, 0, currVal_2); var currVal_3 = core["_56" /* ɵunv */](_v, 16, 0, core["_44" /* ɵnov */](_v, 18).transform("core.save")); _ck(_v, 16, 0, currVal_3); var currVal_5 = core["_56" /* ɵunv */](_v, 19, 0, core["_44" /* ɵnov */](_v, 20).transform("core.save")); _ck(_v, 19, 0, currVal_5); var currVal_6 = core["_44" /* ɵnov */](_v, 26).statusbarPadding; var currVal_7 = core["_44" /* ɵnov */](_v, 26)._hasRefresher; _ck(_v, 25, 0, currVal_6, currVal_7); var currVal_8 = (core["_44" /* ɵnov */](_v, 29).state !== "inactive"); var currVal_9 = core["_44" /* ɵnov */](_v, 29)._top; _ck(_v, 28, 0, currVal_8, currVal_9); var currVal_11 = core["_44" /* ɵnov */](_v, 32).r.state; _ck(_v, 31, 0, currVal_11); }); }
function View_AddonModWorkshopEditSubmissionPage_Host_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "page-addon-mod-workshop-edit-submission", [], null, null, null, View_AddonModWorkshopEditSubmissionPage_0, RenderType_AddonModWorkshopEditSubmissionPage)), core["_30" /* ɵdid */](1, 245760, null, 0, edit_submission_AddonModWorkshopEditSubmissionPage, [nav_params["a" /* NavParams */], sites["a" /* CoreSitesProvider */], fileuploader["a" /* CoreFileUploaderProvider */], workshop["a" /* AddonModWorkshopProvider */], offline["a" /* AddonModWorkshopOfflineProvider */], helper["a" /* AddonModWorkshopHelperProvider */], nav_controller["a" /* NavController */], file_session["a" /* CoreFileSessionProvider */], sync["a" /* CoreSyncProvider */], utils_text["a" /* CoreTextUtilsProvider */], dom["a" /* CoreDomUtilsProvider */], esm5_forms["d" /* FormBuilder */], translate_service["a" /* TranslateService */], events["a" /* CoreEventsProvider */]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var AddonModWorkshopEditSubmissionPageNgFactory = core["_27" /* ɵccf */]("page-addon-mod-workshop-edit-submission", edit_submission_AddonModWorkshopEditSubmissionPage, View_AddonModWorkshopEditSubmissionPage_Host_0, {}, {}, []);

//# sourceMappingURL=edit-submission.ngfactory.js.map
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

// CONCATENATED MODULE: ./src/addon/mod/workshop/pages/edit-submission/edit-submission.module.ngfactory.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddonModWorkshopEditSubmissionPageModuleNgFactory", function() { return AddonModWorkshopEditSubmissionPageModuleNgFactory; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 































var AddonModWorkshopEditSubmissionPageModuleNgFactory = core["_28" /* ɵcmf */](edit_submission_module_AddonModWorkshopEditSubmissionPageModule, [], function (_l) { return core["_40" /* ɵmod */]([core["_41" /* ɵmpd */](512, core["o" /* ComponentFactoryResolver */], core["_21" /* ɵCodegenComponentFactoryResolver */], [[8, [action_sheet_component_ngfactory["a" /* ActionSheetCmpNgFactory */], alert_component_ngfactory["a" /* AlertCmpNgFactory */], app_root_ngfactory["a" /* IonicAppNgFactory */], loading_component_ngfactory["a" /* LoadingCmpNgFactory */], modal_component_ngfactory["a" /* ModalCmpNgFactory */], picker_component_ngfactory["a" /* PickerCmpNgFactory */], popover_component_ngfactory["a" /* PopoverCmpNgFactory */], select_popover_component_ngfactory["a" /* SelectPopoverNgFactory */], toast_component_ngfactory["a" /* ToastCmpNgFactory */], context_menu_popover_ngfactory["a" /* CoreContextMenuPopoverComponentNgFactory */], course_picker_menu_popover_ngfactory["a" /* CoreCoursePickerMenuPopoverComponentNgFactory */], recaptchamodal_ngfactory["a" /* CoreRecaptchaModalComponentNgFactory */], bs_tooltip_ngfactory["a" /* CoreBSTooltipComponentNgFactory */], AddonModWorkshopEditSubmissionPageNgFactory]], [3, core["o" /* ComponentFactoryResolver */]], core["K" /* NgModuleRef */]]), core["_41" /* ɵmpd */](4608, common["m" /* NgLocalization */], common["l" /* NgLocaleLocalization */], [core["G" /* LOCALE_ID */], [2, common["w" /* ɵa */]]]), core["_41" /* ɵmpd */](4608, esm5_forms["x" /* ɵi */], esm5_forms["x" /* ɵi */], []), core["_41" /* ɵmpd */](4608, esm5_forms["d" /* FormBuilder */], esm5_forms["d" /* FormBuilder */], []), core["_41" /* ɵmpd */](4608, translate_loader["b" /* TranslateLoader */], translate_loader["a" /* TranslateFakeLoader */], []), core["_41" /* ɵmpd */](4608, translate_compiler["a" /* TranslateCompiler */], translate_compiler["b" /* TranslateFakeCompiler */], []), core["_41" /* ɵmpd */](4608, translate_parser["b" /* TranslateParser */], translate_parser["a" /* TranslateDefaultParser */], []), core["_41" /* ɵmpd */](4608, missing_translation_handler["b" /* MissingTranslationHandler */], missing_translation_handler["a" /* FakeMissingTranslationHandler */], []), core["_41" /* ɵmpd */](4608, translate_service["a" /* TranslateService */], translate_service["a" /* TranslateService */], [translate_store["a" /* TranslateStore */], translate_loader["b" /* TranslateLoader */], translate_compiler["a" /* TranslateCompiler */], translate_parser["b" /* TranslateParser */], missing_translation_handler["b" /* MissingTranslationHandler */], translate_service["b" /* USE_DEFAULT_LANG */], translate_service["c" /* USE_STORE */]]), core["_41" /* ɵmpd */](512, directives_module["a" /* CoreDirectivesModule */], directives_module["a" /* CoreDirectivesModule */], []), core["_41" /* ɵmpd */](512, common["b" /* CommonModule */], common["b" /* CommonModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["v" /* ɵba */], esm5_forms["v" /* ɵba */], []), core["_41" /* ɵmpd */](512, esm5_forms["i" /* FormsModule */], esm5_forms["i" /* FormsModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["s" /* ReactiveFormsModule */], esm5_forms["s" /* ReactiveFormsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["a" /* IonicModule */], ionic_angular_module["a" /* IonicModule */], []), core["_41" /* ɵmpd */](512, _ngx_translate_core["b" /* TranslateModule */], _ngx_translate_core["b" /* TranslateModule */], []), core["_41" /* ɵmpd */](512, pipes_module["a" /* CorePipesModule */], pipes_module["a" /* CorePipesModule */], []), core["_41" /* ɵmpd */](512, components_module["a" /* CoreComponentsModule */], components_module["a" /* CoreComponentsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["b" /* IonicPageModule */], ionic_angular_module["b" /* IonicPageModule */], []), core["_41" /* ɵmpd */](512, edit_submission_module_AddonModWorkshopEditSubmissionPageModule, edit_submission_module_AddonModWorkshopEditSubmissionPageModule, []), core["_41" /* ɵmpd */](256, translate_service["c" /* USE_STORE */], undefined, []), core["_41" /* ɵmpd */](256, translate_service["b" /* USE_DEFAULT_LANG */], undefined, []), core["_41" /* ɵmpd */](256, module_loader["a" /* LAZY_LOADED_TOKEN */], edit_submission_AddonModWorkshopEditSubmissionPage, [])]); });

//# sourceMappingURL=edit-submission.module.ngfactory.js.map

/***/ })

});
//# sourceMappingURL=78.js.map