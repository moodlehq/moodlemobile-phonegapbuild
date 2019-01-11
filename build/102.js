webpackJsonp([102],{

/***/ 1860:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/@angular/core/esm5/core.js
var core = __webpack_require__(0);

// EXTERNAL MODULE: ./node_modules/ionic-angular/index.js + 3 modules
var ionic_angular = __webpack_require__(8);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/index.js + 1 modules
var _ngx_translate_core = __webpack_require__(3);

// EXTERNAL MODULE: ./src/directives/directives.module.ts + 2 modules
var directives_module = __webpack_require__(29);

// EXTERNAL MODULE: ./src/components/components.module.ts
var components_module = __webpack_require__(28);

// EXTERNAL MODULE: ./src/core/comments/components/components.module.ts
var components_components_module = __webpack_require__(443);

// EXTERNAL MODULE: ./src/core/compile/components/compile-html/compile-html.module.ts
var compile_html_module = __webpack_require__(438);

// EXTERNAL MODULE: ./src/addon/mod/data/components/components.module.ts + 2 modules
var data_components_components_module = __webpack_require__(439);

// EXTERNAL MODULE: ./node_modules/@angular/forms/esm5/forms.js
var esm5_forms = __webpack_require__(22);

// EXTERNAL MODULE: ./src/providers/utils/utils.ts
var utils_utils = __webpack_require__(2);

// EXTERNAL MODULE: ./src/providers/utils/dom.ts
var dom = __webpack_require__(4);

// EXTERNAL MODULE: ./src/providers/sites.ts
var sites = __webpack_require__(1);

// EXTERNAL MODULE: ./src/providers/groups.ts
var groups = __webpack_require__(67);

// EXTERNAL MODULE: ./src/providers/events.ts
var events = __webpack_require__(12);

// EXTERNAL MODULE: ./src/core/fileuploader/providers/fileuploader.ts
var fileuploader = __webpack_require__(66);

// EXTERNAL MODULE: ./src/core/course/providers/course.ts
var course = __webpack_require__(15);

// EXTERNAL MODULE: ./src/addon/mod/data/providers/data.ts
var data = __webpack_require__(95);

// EXTERNAL MODULE: ./src/addon/mod/data/providers/helper.ts
var helper = __webpack_require__(251);

// EXTERNAL MODULE: ./src/addon/mod/data/providers/offline.ts
var offline = __webpack_require__(208);

// EXTERNAL MODULE: ./src/addon/mod/data/providers/fields-delegate.ts
var fields_delegate = __webpack_require__(114);

// CONCATENATED MODULE: ./src/addon/mod/data/pages/edit/edit.ts
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
 * Page that displays the view edit page.
 */
var edit_AddonModDataEditPage = /** @class */ (function () {
    function AddonModDataEditPage(params, utils, groupsProvider, domUtils, fieldsDelegate, courseProvider, dataProvider, dataOffline, dataHelper, sitesProvider, navCtrl, translate, eventsProvider, fileUploaderProvider) {
        this.utils = utils;
        this.groupsProvider = groupsProvider;
        this.domUtils = domUtils;
        this.fieldsDelegate = fieldsDelegate;
        this.courseProvider = courseProvider;
        this.dataProvider = dataProvider;
        this.dataOffline = dataOffline;
        this.dataHelper = dataHelper;
        this.navCtrl = navCtrl;
        this.translate = translate;
        this.eventsProvider = eventsProvider;
        this.fileUploaderProvider = fileUploaderProvider;
        this.offlineActions = [];
        this.fields = {};
        this.fieldsArray = [];
        this.forceLeave = false; // To allow leaving the page without checking for changes.
        this.title = '';
        this.component = data["a" /* AddonModDataProvider */].COMPONENT;
        this.loaded = false;
        this.selectedGroup = 0;
        this.cssClass = '';
        this.cssTemplate = '';
        this.editFormRender = '';
        this.extraImports = [data_components_components_module["a" /* AddonModDataComponentsModule */]];
        this.errors = {};
        this.module = params.get('module') || {};
        this.entryId = params.get('entryId') || null;
        this.courseId = params.get('courseId');
        this.selectedGroup = params.get('group') || 0;
        this.siteId = sitesProvider.getCurrentSiteId();
        this.title = this.module.name;
        this.editForm = new esm5_forms["g" /* FormGroup */]({});
    }
    /**
     * View loaded.
     */
    AddonModDataEditPage.prototype.ionViewDidLoad = function () {
        this.fetchEntryData();
    };
    /**
     * Check if we can leave the page or not and ask to confirm the lost of data.
     *
     * @return {boolean | Promise<void>} Resolved if we can leave it, rejected if not.
     */
    AddonModDataEditPage.prototype.ionViewCanLeave = function () {
        var _this = this;
        if (this.forceLeave) {
            return true;
        }
        var inputData = this.editForm.value;
        return this.dataHelper.hasEditDataChanged(inputData, this.fieldsArray, this.data.id, this.entry.contents).then(function (changed) {
            if (!changed) {
                return Promise.resolve();
            }
            // Show confirmation if some data has been modified.
            return _this.domUtils.showConfirm(_this.translate.instant('core.confirmcanceledit'));
        }).then(function () {
            // Delete the local files from the tmp folder.
            return _this.dataHelper.getEditTmpFiles(inputData, _this.fieldsArray, _this.data.id, _this.entry.contents).then(function (files) {
                _this.fileUploaderProvider.clearTmpFiles(files);
            });
        });
    };
    /**
     * Fetch the entry data.
     *
     * @return {Promise<any>}         Resolved when done.
     */
    AddonModDataEditPage.prototype.fetchEntryData = function () {
        var _this = this;
        return this.dataProvider.getDatabase(this.courseId, this.module.id).then(function (data) {
            _this.title = data.name || _this.title;
            _this.data = data;
            _this.cssClass = 'addon-data-entries-' + data.id;
            return _this.dataProvider.getDatabaseAccessInformation(data.id);
        }).then(function (accessData) {
            _this.cssTemplate = _this.dataHelper.prefixCSS(_this.data.csstemplate, '.' + _this.cssClass);
            if (_this.entryId) {
                return _this.groupsProvider.getActivityGroupInfo(_this.data.coursemodule, accessData.canmanageentries)
                    .then(function (groupInfo) {
                    _this.groupInfo = groupInfo;
                    // Check selected group is accessible.
                    if (groupInfo && groupInfo.groups && groupInfo.groups.length > 0) {
                        if (!groupInfo.groups.some(function (group) { return _this.selectedGroup == group.id; })) {
                            _this.selectedGroup = groupInfo.groups[0].id;
                        }
                    }
                });
            }
        }).then(function () {
            return _this.dataOffline.getEntryActions(_this.data.id, _this.entryId);
        }).then(function (actions) {
            _this.offlineActions = actions;
            return _this.dataProvider.getFields(_this.data.id);
        }).then(function (fieldsData) {
            _this.fieldsArray = fieldsData;
            _this.fields = _this.utils.arrayToObject(fieldsData, 'id');
            return _this.dataHelper.getEntry(_this.data, _this.entryId, _this.offlineActions);
        }).then(function (entry) {
            if (entry) {
                entry = entry.entry;
                // Index contents by fieldid.
                entry.contents = _this.utils.arrayToObject(entry.contents, 'fieldid');
            }
            else {
                entry = {
                    contents: {}
                };
            }
            return _this.dataHelper.applyOfflineActions(entry, _this.offlineActions, _this.fieldsArray);
        }).then(function (entryData) {
            _this.entry = entryData;
            _this.editFormRender = _this.displayEditFields();
        }).catch(function (message) {
            _this.domUtils.showErrorModalDefault(message, 'core.course.errorgetmodule', true);
        }).finally(function () {
            _this.loaded = true;
        });
    };
    /**
     * Saves data.
     *
     * @param {Event} e Event.
     * @return {Promise<any>} Resolved when done.
     */
    AddonModDataEditPage.prototype.save = function (e) {
        var _this = this;
        e.preventDefault();
        e.stopPropagation();
        var inputData = this.editForm.value;
        return this.dataHelper.hasEditDataChanged(inputData, this.fieldsArray, this.data.id, this.entry.contents).then(function (changed) {
            if (!changed) {
                if (_this.entryId) {
                    return _this.returnToEntryList();
                }
                // New entry, no changes means no field filled, warn the user.
                return Promise.reject('addon.mod_data.emptyaddform');
            }
            var modal = _this.domUtils.showModalLoading('core.sending', true);
            // Create an ID to assign files.
            var entryTemp = _this.entryId ? _this.entryId : -(new Date().getTime());
            return _this.dataHelper.getEditDataFromForm(inputData, _this.fieldsArray, _this.data.id, entryTemp, _this.entry.contents, _this.offline).catch(function (e) {
                if (!_this.offline) {
                    // Cannot submit in online, prepare for offline usage.
                    _this.offline = true;
                    return _this.dataHelper.getEditDataFromForm(inputData, _this.fieldsArray, _this.data.id, entryTemp, _this.entry.contents, _this.offline);
                }
                return Promise.reject(e);
            }).then(function (editData) {
                if (editData.length > 0) {
                    if (_this.entryId) {
                        return _this.dataProvider.editEntry(_this.data.id, _this.entryId, _this.courseId, editData, _this.fields, undefined, _this.offline);
                    }
                    return _this.dataProvider.addEntry(_this.data.id, entryTemp, _this.courseId, editData, _this.selectedGroup, _this.fields, undefined, _this.offline);
                }
                return false;
            }).then(function (result) {
                if (!result) {
                    // No field filled, warn the user.
                    return Promise.reject('addon.mod_data.emptyaddform');
                }
                // This is done if entry is updated when editing or creating if not.
                if ((_this.entryId && result.updated) || (!_this.entryId && result.newentryid)) {
                    var promises = [];
                    _this.entryId = _this.entryId || result.newentryid;
                    promises.push(_this.dataProvider.invalidateEntryData(_this.data.id, _this.entryId, _this.siteId));
                    promises.push(_this.dataProvider.invalidateEntriesData(_this.data.id, _this.siteId));
                    return Promise.all(promises).then(function () {
                        _this.eventsProvider.trigger(data["a" /* AddonModDataProvider */].ENTRY_CHANGED, { dataId: _this.data.id, entryId: _this.entryId }, _this.siteId);
                    }).finally(function () {
                        return _this.returnToEntryList();
                    });
                }
                else {
                    _this.errors = {};
                    if (result.fieldnotifications) {
                        result.fieldnotifications.forEach(function (fieldNotif) {
                            var field = _this.fieldsArray.find(function (field) { return field.name == fieldNotif.fieldname; });
                            if (field) {
                                _this.errors[field.id] = fieldNotif.notification;
                            }
                        });
                    }
                    _this.jsData['errors'] = _this.errors;
                    setTimeout(function () {
                        _this.scrollToFirstError();
                    });
                }
            }).finally(function () {
                modal.dismiss();
            });
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'Cannot edit entry', true);
        });
    };
    /**
     * Set group to see the database.
     *
     * @param  {number}       groupId Group identifier to set.
     * @return {Promise<any>}         Resolved when done.
     */
    AddonModDataEditPage.prototype.setGroup = function (groupId) {
        this.selectedGroup = groupId;
        this.loaded = false;
        return this.fetchEntryData();
    };
    /**
     * Displays Edit Search Fields.
     *
     * @return {string}  Generated HTML.
     */
    AddonModDataEditPage.prototype.displayEditFields = function () {
        this.jsData = {
            fields: this.fields,
            contents: this.utils.clone(this.entry.contents),
            form: this.editForm,
            data: this.data,
            errors: this.errors
        };
        var replace, render, template = this.data.addtemplate || this.dataHelper.getDefaultTemplate('add', this.fieldsArray);
        // Replace the fields found on template.
        this.fieldsArray.forEach(function (field) {
            replace = '[[' + field.name + ']]';
            replace = replace.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
            replace = new RegExp(replace, 'gi');
            // Replace field by a generic directive.
            render = '<addon-mod-data-field-plugin mode="edit" [field]="fields[' + field.id + ']"\
                [value]="contents[' + field.id + ']" [form]="form" [database]="data" [error]="errors[' + field.id + ']">\
                </addon-mod-data-field-plugin>';
            template = template.replace(replace, render);
            // Replace the field id tag.
            replace = '[[' + field.name + '#id]]';
            replace = replace.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
            replace = new RegExp(replace, 'gi');
            template = template.replace(replace, 'field_' + field.id);
        });
        return template;
    };
    /**
     * Return to the entry list (previous page) discarding temp data.
     *
     * @return {Promise<any>}  Resolved when done.
     */
    AddonModDataEditPage.prototype.returnToEntryList = function () {
        var _this = this;
        var inputData = this.editForm.value;
        return this.dataHelper.getEditTmpFiles(inputData, this.fieldsArray, this.data.id, this.entry.contents).then(function (files) {
            _this.fileUploaderProvider.clearTmpFiles(files);
        }).finally(function () {
            // Go back to entry list.
            _this.forceLeave = true;
            _this.navCtrl.pop();
        });
    };
    /**
     * Scroll to first error or to the top if not found.
     */
    AddonModDataEditPage.prototype.scrollToFirstError = function () {
        if (!this.domUtils.scrollToElementBySelector(this.content, '.addon-data-error')) {
            this.domUtils.scrollToTop(this.content);
        }
    };
    __decorate([
        Object(core["_9" /* ViewChild */])(ionic_angular["f" /* Content */]),
        __metadata("design:type", ionic_angular["f" /* Content */])
    ], AddonModDataEditPage.prototype, "content", void 0);
    AddonModDataEditPage = __decorate([
        Object(core["m" /* Component */])({
            selector: 'page-addon-mod-data-edit',
            templateUrl: 'edit.html',
        }),
        __metadata("design:paramtypes", [ionic_angular["t" /* NavParams */], utils_utils["a" /* CoreUtilsProvider */], groups["a" /* CoreGroupsProvider */],
            dom["a" /* CoreDomUtilsProvider */], fields_delegate["a" /* AddonModDataFieldsDelegate */],
            course["a" /* CoreCourseProvider */], data["a" /* AddonModDataProvider */],
            offline["a" /* AddonModDataOfflineProvider */], helper["a" /* AddonModDataHelperProvider */],
            sites["a" /* CoreSitesProvider */], ionic_angular["s" /* NavController */], _ngx_translate_core["c" /* TranslateService */],
            events["a" /* CoreEventsProvider */], fileuploader["a" /* CoreFileUploaderProvider */]])
    ], AddonModDataEditPage);
    return AddonModDataEditPage;
}());

//# sourceMappingURL=edit.js.map
// CONCATENATED MODULE: ./src/addon/mod/data/pages/edit/edit.module.ts
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
var edit_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var edit_module_AddonModDataEditPageModule = /** @class */ (function () {
    function AddonModDataEditPageModule() {
    }
    AddonModDataEditPageModule = edit_module___decorate([
        Object(core["I" /* NgModule */])({
            declarations: [
                edit_AddonModDataEditPage,
            ],
            imports: [
                directives_module["a" /* CoreDirectivesModule */],
                components_module["a" /* CoreComponentsModule */],
                data_components_components_module["a" /* AddonModDataComponentsModule */],
                compile_html_module["a" /* CoreCompileHtmlComponentModule */],
                components_components_module["a" /* CoreCommentsComponentsModule */],
                ionic_angular["l" /* IonicPageModule */].forChild(edit_AddonModDataEditPage),
                _ngx_translate_core["b" /* TranslateModule */].forChild()
            ],
        })
    ], AddonModDataEditPageModule);
    return AddonModDataEditPageModule;
}());

//# sourceMappingURL=edit.module.js.map
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

// EXTERNAL MODULE: ./src/core/course/components/unsupported-module/unsupported-module.ngfactory.js
var unsupported_module_ngfactory = __webpack_require__(1359);

// EXTERNAL MODULE: ./src/core/comments/components/comments/comments.ngfactory.js
var comments_ngfactory = __webpack_require__(670);

// EXTERNAL MODULE: ./src/addon/mod/data/components/index/index.ngfactory.js
var index_ngfactory = __webpack_require__(1368);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/label/label.js
var label = __webpack_require__(61);

// EXTERNAL MODULE: ./node_modules/ionic-angular/config/config.js
var config = __webpack_require__(6);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.pipe.js
var translate_pipe = __webpack_require__(26);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.service.js
var translate_service = __webpack_require__(18);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/option/option.js
var option_option = __webpack_require__(91);

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

// EXTERNAL MODULE: ./node_modules/@angular/common/esm5/common.js
var common = __webpack_require__(7);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/select/select.ngfactory.js
var select_ngfactory = __webpack_require__(110);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/select/select.js
var select_select = __webpack_require__(92);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/app/app.js + 3 modules
var app = __webpack_require__(33);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/deep-linker.js
var deep_linker = __webpack_require__(51);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-header.js
var toolbar_header = __webpack_require__(435);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/view-controller.js
var view_controller = __webpack_require__(36);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/navbar.ngfactory.js
var navbar_ngfactory = __webpack_require__(1354);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/navbar.js
var navbar = __webpack_require__(200);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-controller.js
var nav_controller = __webpack_require__(21);

// EXTERNAL MODULE: ./src/directives/back-button.ts
var back_button = __webpack_require__(663);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/platform.js + 1 modules
var platform = __webpack_require__(14);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.ngfactory.js
var toolbar_title_ngfactory = __webpack_require__(1355);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.js
var toolbar_title = __webpack_require__(337);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar.js
var toolbar = __webpack_require__(247);

// EXTERNAL MODULE: ./src/directives/format-text.ts
var format_text = __webpack_require__(41);

// EXTERNAL MODULE: ./src/providers/utils/text.ts
var utils_text = __webpack_require__(10);

// EXTERNAL MODULE: ./src/providers/utils/url.ts
var url = __webpack_require__(25);

// EXTERNAL MODULE: ./src/providers/logger.ts
var logger = __webpack_require__(5);

// EXTERNAL MODULE: ./src/providers/filepool.ts
var filepool = __webpack_require__(16);

// EXTERNAL MODULE: ./src/providers/app.ts
var providers_app = __webpack_require__(9);

// EXTERNAL MODULE: ./src/core/contentlinks/providers/helper.ts
var providers_helper = __webpack_require__(17);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.js
var content = __webpack_require__(23);

// EXTERNAL MODULE: ./src/components/split-view/split-view.ts
var split_view = __webpack_require__(34);

// EXTERNAL MODULE: ./src/providers/utils/iframe.ts
var iframe = __webpack_require__(37);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-item.js
var toolbar_item = __webpack_require__(436);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.ngfactory.js
var button_ngfactory = __webpack_require__(45);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.js
var button_button = __webpack_require__(42);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.ngfactory.js
var content_ngfactory = __webpack_require__(185);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/dom-controller.js
var dom_controller = __webpack_require__(31);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/keyboard.js
var keyboard = __webpack_require__(106);

// EXTERNAL MODULE: ./src/components/loading/loading.ngfactory.js
var loading_ngfactory = __webpack_require__(48);

// EXTERNAL MODULE: ./src/components/loading/loading.ts
var loading = __webpack_require__(47);

// EXTERNAL MODULE: ./src/core/compile/components/compile-html/compile-html.ngfactory.js
var compile_html_ngfactory = __webpack_require__(195);

// EXTERNAL MODULE: ./src/core/compile/components/compile-html/compile-html.ts
var compile_html = __webpack_require__(168);

// EXTERNAL MODULE: ./src/core/compile/providers/compile.ts
var compile = __webpack_require__(137);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-params.js
var nav_params = __webpack_require__(60);

// CONCATENATED MODULE: ./src/addon/mod/data/pages/edit/edit.ngfactory.js
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 





























































var styles_AddonModDataEditPage = ["{{ cssTemplate }}"];
var RenderType_AddonModDataEditPage = core["_29" /* ɵcrt */]({ encapsulation: 0, styles: styles_AddonModDataEditPage, data: {} });

function View_AddonModDataEditPage_2(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 3, "ion-label", [["id", "addon-data-groupslabel"]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, [[3, 4]], 0, label["a" /* Label */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, null], [8, null], [8, null]], { id: [0, "id"] }, null), (_l()(), core["_55" /* ɵted */](2, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], function (_ck, _v) { var currVal_0 = "addon-data-groupslabel"; _ck(_v, 1, 0, currVal_0); }, function (_ck, _v) { var currVal_1 = core["_56" /* ɵunv */](_v, 2, 0, core["_44" /* ɵnov */](_v, 3).transform("core.groupsseparate")); _ck(_v, 2, 0, currVal_1); }); }
function View_AddonModDataEditPage_3(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 3, "ion-label", [["id", "addon-data-groupslabel"]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, [[3, 4]], 0, label["a" /* Label */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, null], [8, null], [8, null]], { id: [0, "id"] }, null), (_l()(), core["_55" /* ɵted */](2, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], function (_ck, _v) { var currVal_0 = "addon-data-groupslabel"; _ck(_v, 1, 0, currVal_0); }, function (_ck, _v) { var currVal_1 = core["_56" /* ɵunv */](_v, 2, 0, core["_44" /* ɵnov */](_v, 3).transform("core.groupsvisible")); _ck(_v, 2, 0, currVal_1); }); }
function View_AddonModDataEditPage_4(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "ion-option", [], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, [[6, 4]], 0, option_option["a" /* Option */], [core["t" /* ElementRef */]], { value: [0, "value"] }, null), (_l()(), core["_55" /* ɵted */](2, null, ["", ""]))], function (_ck, _v) { var currVal_0 = _v.context.$implicit.id; _ck(_v, 1, 0, currVal_0); }, function (_ck, _v) { var currVal_1 = _v.context.$implicit.name; _ck(_v, 2, 0, currVal_1); }); }
function View_AddonModDataEditPage_1(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 24, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](603979776, 3, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 4, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 5, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, 1, 1, null, View_AddonModDataEditPage_2)), core["_30" /* ɵdid */](8, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, 1, 1, null, View_AddonModDataEditPage_3)), core["_30" /* ɵdid */](11, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "])), (_l()(), core["_31" /* ɵeld */](13, 0, null, 3, 10, "ion-select", [["aria-labelledby", "addon-data-groupslabel"], ["interface", "action-sheet"]], [[2, "select-disabled", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "ionChange"], [null, "click"], [null, "keyup.space"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (core["_44" /* ɵnov */](_v, 14)._click($event) !== false);
        ad = (pd_0 && ad);
    } if (("keyup.space" === en)) {
        var pd_1 = (core["_44" /* ɵnov */](_v, 14)._keyup() !== false);
        ad = (pd_1 && ad);
    } if (("ngModelChange" === en)) {
        var pd_2 = ((_co.selectedGroup = $event) !== false);
        ad = (pd_2 && ad);
    } if (("ionChange" === en)) {
        var pd_3 = (_co.setGroup(_co.selectedGroup) !== false);
        ad = (pd_3 && ad);
    } return ad; }, select_ngfactory["b" /* View_Select_0 */], select_ngfactory["a" /* RenderType_Select */])), core["_30" /* ɵdid */](14, 1228800, null, 1, select_select["a" /* Select */], [app["a" /* App */], util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item["a" /* Item */]], deep_linker["a" /* DeepLinker */]], { interface: [0, "interface"] }, { ionChange: "ionChange" }), core["_52" /* ɵqud */](603979776, 6, { options: 1 }), core["_50" /* ɵprd */](1024, null, esm5_forms["l" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [select_select["a" /* Select */]]), core["_30" /* ɵdid */](17, 671744, null, 0, esm5_forms["q" /* NgModel */], [[8, null], [8, null], [8, null], [2, esm5_forms["l" /* NG_VALUE_ACCESSOR */]]], { model: [0, "model"] }, { update: "ngModelChange" }), core["_50" /* ɵprd */](2048, null, esm5_forms["m" /* NgControl */], null, [esm5_forms["q" /* NgModel */]]), core["_30" /* ɵdid */](19, 16384, null, 0, esm5_forms["n" /* NgControlStatus */], [esm5_forms["m" /* NgControl */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModDataEditPage_4)), core["_30" /* ɵdid */](22, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n        "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.groupInfo.separateGroups; _ck(_v, 8, 0, currVal_0); var currVal_1 = _co.groupInfo.visibleGroups; _ck(_v, 11, 0, currVal_1); var currVal_10 = "action-sheet"; _ck(_v, 14, 0, currVal_10); var currVal_11 = _co.selectedGroup; _ck(_v, 17, 0, currVal_11); var currVal_12 = _co.groupInfo.groups; _ck(_v, 22, 0, currVal_12); }, function (_ck, _v) { var currVal_2 = core["_44" /* ɵnov */](_v, 14)._disabled; var currVal_3 = core["_44" /* ɵnov */](_v, 19).ngClassUntouched; var currVal_4 = core["_44" /* ɵnov */](_v, 19).ngClassTouched; var currVal_5 = core["_44" /* ɵnov */](_v, 19).ngClassPristine; var currVal_6 = core["_44" /* ɵnov */](_v, 19).ngClassDirty; var currVal_7 = core["_44" /* ɵnov */](_v, 19).ngClassValid; var currVal_8 = core["_44" /* ɵnov */](_v, 19).ngClassInvalid; var currVal_9 = core["_44" /* ɵnov */](_v, 19).ngClassPending; _ck(_v, 13, 0, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8, currVal_9); }); }
function View_AddonModDataEditPage_0(_l) { return core["_57" /* ɵvid */](0, [core["_52" /* ɵqud */](402653184, 1, { content: 0 }), (_l()(), core["_31" /* ɵeld */](1, 0, null, null, 23, "ion-header", [], null, null, null, null, null)), core["_30" /* ɵdid */](2, 16384, null, 0, toolbar_header["a" /* Header */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, view_controller["a" /* ViewController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_31" /* ɵeld */](4, 0, null, null, 19, "ion-navbar", [["class", "toolbar"], ["core-back-button", ""]], [[8, "hidden", 0], [2, "statusbar-padding", null]], null, null, navbar_ngfactory["b" /* View_Navbar_0 */], navbar_ngfactory["a" /* RenderType_Navbar */])), core["_30" /* ɵdid */](5, 49152, null, 0, navbar["a" /* Navbar */], [app["a" /* App */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_30" /* ɵdid */](6, 212992, null, 0, back_button["a" /* CoreBackButtonDirective */], [navbar["a" /* Navbar */], platform["a" /* Platform */], translate_service["a" /* TranslateService */], events["a" /* CoreEventsProvider */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n        "])), (_l()(), core["_31" /* ɵeld */](8, 0, null, 3, 3, "ion-title", [], null, null, null, toolbar_title_ngfactory["b" /* View_ToolbarTitle_0 */], toolbar_title_ngfactory["a" /* RenderType_ToolbarTitle */])), core["_30" /* ɵdid */](9, 49152, null, 0, toolbar_title["a" /* ToolbarTitle */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), (_l()(), core["_31" /* ɵeld */](10, 0, null, 0, 1, "core-format-text", [], null, null, null, null, null)), core["_30" /* ɵdid */](11, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform["a" /* Platform */], utils_utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], providers_app["a" /* CoreAppProvider */], providers_helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content["a" /* Content */]], [2, split_view["a" /* CoreSplitViewComponent */]], iframe["a" /* CoreIframeUtilsProvider */], events["a" /* CoreEventsProvider */]], { text: [0, "text"] }, null), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n        "])), (_l()(), core["_31" /* ɵeld */](13, 0, null, 2, 9, "ion-buttons", [["end", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](14, 16384, null, 1, toolbar_item["a" /* ToolbarItem */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), core["_52" /* ɵqud */](603979776, 2, { _buttons: 1 }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](17, 0, null, null, 4, "button", [["clear", ""], ["ion-button", ""]], [[1, "aria-label", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.save($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](18, 1097728, [[2, 4]], 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { clear: [0, "clear"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](20, 0, ["\n                ", "\n            "])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_31" /* ɵeld */](26, 0, null, null, 23, "ion-content", [], [[2, "statusbar-padding", null], [2, "has-refresher", null]], null, null, content_ngfactory["b" /* View_Content_0 */], content_ngfactory["a" /* RenderType_Content */])), core["_30" /* ɵdid */](27, 4374528, [[1, 4]], 0, content["a" /* Content */], [config["a" /* Config */], platform["a" /* Platform */], dom_controller["a" /* DomController */], core["t" /* ElementRef */], core["V" /* Renderer */], app["a" /* App */], keyboard["a" /* Keyboard */], core["M" /* NgZone */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n    "])), (_l()(), core["_31" /* ɵeld */](29, 0, null, 1, 19, "core-loading", [], null, null, null, loading_ngfactory["b" /* View_CoreLoadingComponent_0 */], loading_ngfactory["a" /* RenderType_CoreLoadingComponent */])), core["_30" /* ɵdid */](30, 638976, null, 0, loading["a" /* CoreLoadingComponent */], [translate_service["a" /* TranslateService */], core["t" /* ElementRef */], events["a" /* CoreEventsProvider */], utils_utils["a" /* CoreUtilsProvider */]], { hideUntil: [0, "hideUntil"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_AddonModDataEditPage_1)), core["_30" /* ɵdid */](33, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n\n        "])), (_l()(), core["_31" /* ɵeld */](35, 0, null, 0, 12, "div", [], [[8, "className", 0]], null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n            "])), (_l()(), core["_31" /* ɵeld */](38, 0, null, null, 8, "form", [["novalidate", ""]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngSubmit"], [null, "submit"], [null, "reset"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("submit" === en)) {
        var pd_0 = (core["_44" /* ɵnov */](_v, 40).onSubmit($event) !== false);
        ad = (pd_0 && ad);
    } if (("reset" === en)) {
        var pd_1 = (core["_44" /* ɵnov */](_v, 40).onReset() !== false);
        ad = (pd_1 && ad);
    } if (("ngSubmit" === en)) {
        var pd_2 = (_co.save($event) !== false);
        ad = (pd_2 && ad);
    } return ad; }, null, null)), core["_30" /* ɵdid */](39, 16384, null, 0, esm5_forms["w" /* ɵbf */], [], null, null), core["_30" /* ɵdid */](40, 540672, null, 0, esm5_forms["h" /* FormGroupDirective */], [[8, null], [8, null]], { form: [0, "form"] }, { ngSubmit: "ngSubmit" }), core["_50" /* ɵprd */](2048, null, esm5_forms["b" /* ControlContainer */], null, [esm5_forms["h" /* FormGroupDirective */]]), core["_30" /* ɵdid */](42, 16384, null, 0, esm5_forms["o" /* NgControlStatusGroup */], [esm5_forms["b" /* ControlContainer */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ɵeld */](44, 0, null, null, 1, "core-compile-html", [], null, null, null, compile_html_ngfactory["b" /* View_CoreCompileHtmlComponent_0 */], compile_html_ngfactory["a" /* RenderType_CoreCompileHtmlComponent */])), core["_30" /* ɵdid */](45, 966656, null, 0, compile_html["a" /* CoreCompileHtmlComponent */], [compile["a" /* CoreCompileProvider */], core["j" /* ChangeDetectorRef */], core["t" /* ElementRef */], [2, nav_controller["a" /* NavController */]], core["F" /* KeyValueDiffers */], dom["a" /* CoreDomUtilsProvider */], utils_utils["a" /* CoreUtilsProvider */]], { text: [0, "text"], jsData: [1, "jsData"], extraImports: [2, "extraImports"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; _ck(_v, 6, 0); var currVal_2 = _co.title; _ck(_v, 11, 0, currVal_2); var currVal_4 = ""; _ck(_v, 18, 0, currVal_4); var currVal_8 = _co.loaded; _ck(_v, 30, 0, currVal_8); var currVal_9 = (_co.groupInfo && (_co.groupInfo.separateGroups || _co.groupInfo.visibleGroups)); _ck(_v, 33, 0, currVal_9); var currVal_18 = _co.editForm; _ck(_v, 40, 0, currVal_18); var currVal_19 = _co.editFormRender; var currVal_20 = _co.jsData; var currVal_21 = _co.extraImports; _ck(_v, 45, 0, currVal_19, currVal_20, currVal_21); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = core["_44" /* ɵnov */](_v, 5)._hidden; var currVal_1 = core["_44" /* ɵnov */](_v, 5)._sbPadding; _ck(_v, 4, 0, currVal_0, currVal_1); var currVal_3 = core["_56" /* ɵunv */](_v, 17, 0, core["_44" /* ɵnov */](_v, 19).transform("core.save")); _ck(_v, 17, 0, currVal_3); var currVal_5 = core["_56" /* ɵunv */](_v, 20, 0, core["_44" /* ɵnov */](_v, 21).transform("core.save")); _ck(_v, 20, 0, currVal_5); var currVal_6 = core["_44" /* ɵnov */](_v, 27).statusbarPadding; var currVal_7 = core["_44" /* ɵnov */](_v, 27)._hasRefresher; _ck(_v, 26, 0, currVal_6, currVal_7); var currVal_10 = core["_34" /* ɵinlineInterpolate */](1, "addon-data-contents ", _co.cssClass, ""); _ck(_v, 35, 0, currVal_10); var currVal_11 = core["_44" /* ɵnov */](_v, 42).ngClassUntouched; var currVal_12 = core["_44" /* ɵnov */](_v, 42).ngClassTouched; var currVal_13 = core["_44" /* ɵnov */](_v, 42).ngClassPristine; var currVal_14 = core["_44" /* ɵnov */](_v, 42).ngClassDirty; var currVal_15 = core["_44" /* ɵnov */](_v, 42).ngClassValid; var currVal_16 = core["_44" /* ɵnov */](_v, 42).ngClassInvalid; var currVal_17 = core["_44" /* ɵnov */](_v, 42).ngClassPending; _ck(_v, 38, 0, currVal_11, currVal_12, currVal_13, currVal_14, currVal_15, currVal_16, currVal_17); }); }
function View_AddonModDataEditPage_Host_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "page-addon-mod-data-edit", [], null, null, null, View_AddonModDataEditPage_0, RenderType_AddonModDataEditPage)), core["_30" /* ɵdid */](1, 49152, null, 0, edit_AddonModDataEditPage, [nav_params["a" /* NavParams */], utils_utils["a" /* CoreUtilsProvider */], groups["a" /* CoreGroupsProvider */], dom["a" /* CoreDomUtilsProvider */], fields_delegate["a" /* AddonModDataFieldsDelegate */], course["a" /* CoreCourseProvider */], data["a" /* AddonModDataProvider */], offline["a" /* AddonModDataOfflineProvider */], helper["a" /* AddonModDataHelperProvider */], sites["a" /* CoreSitesProvider */], nav_controller["a" /* NavController */], translate_service["a" /* TranslateService */], events["a" /* CoreEventsProvider */], fileuploader["a" /* CoreFileUploaderProvider */]], null, null)], null, null); }
var AddonModDataEditPageNgFactory = core["_27" /* ɵccf */]("page-addon-mod-data-edit", edit_AddonModDataEditPage, View_AddonModDataEditPage_Host_0, {}, {}, []);

//# sourceMappingURL=edit.ngfactory.js.map
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

// EXTERNAL MODULE: ./src/pipes/pipes.module.ts + 2 modules
var pipes_module = __webpack_require__(105);

// EXTERNAL MODULE: ./src/core/course/components/components.module.ts
var course_components_components_module = __webpack_require__(65);

// EXTERNAL MODULE: ./node_modules/ionic-angular/util/module-loader.js
var module_loader = __webpack_require__(248);

// CONCATENATED MODULE: ./src/addon/mod/data/pages/edit/edit.module.ngfactory.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddonModDataEditPageModuleNgFactory", function() { return AddonModDataEditPageModuleNgFactory; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 





































var AddonModDataEditPageModuleNgFactory = core["_28" /* ɵcmf */](edit_module_AddonModDataEditPageModule, [], function (_l) { return core["_40" /* ɵmod */]([core["_41" /* ɵmpd */](512, core["o" /* ComponentFactoryResolver */], core["_21" /* ɵCodegenComponentFactoryResolver */], [[8, [action_sheet_component_ngfactory["a" /* ActionSheetCmpNgFactory */], alert_component_ngfactory["a" /* AlertCmpNgFactory */], app_root_ngfactory["a" /* IonicAppNgFactory */], loading_component_ngfactory["a" /* LoadingCmpNgFactory */], modal_component_ngfactory["a" /* ModalCmpNgFactory */], picker_component_ngfactory["a" /* PickerCmpNgFactory */], popover_component_ngfactory["a" /* PopoverCmpNgFactory */], select_popover_component_ngfactory["a" /* SelectPopoverNgFactory */], toast_component_ngfactory["a" /* ToastCmpNgFactory */], context_menu_popover_ngfactory["a" /* CoreContextMenuPopoverComponentNgFactory */], course_picker_menu_popover_ngfactory["a" /* CoreCoursePickerMenuPopoverComponentNgFactory */], recaptchamodal_ngfactory["a" /* CoreRecaptchaModalComponentNgFactory */], unsupported_module_ngfactory["a" /* CoreCourseUnsupportedModuleComponentNgFactory */], comments_ngfactory["a" /* CoreCommentsCommentsComponentNgFactory */], index_ngfactory["a" /* AddonModDataIndexComponentNgFactory */], AddonModDataEditPageNgFactory]], [3, core["o" /* ComponentFactoryResolver */]], core["K" /* NgModuleRef */]]), core["_41" /* ɵmpd */](4608, common["m" /* NgLocalization */], common["l" /* NgLocaleLocalization */], [core["G" /* LOCALE_ID */], [2, common["v" /* ɵa */]]]), core["_41" /* ɵmpd */](4608, esm5_forms["x" /* ɵi */], esm5_forms["x" /* ɵi */], []), core["_41" /* ɵmpd */](4608, esm5_forms["d" /* FormBuilder */], esm5_forms["d" /* FormBuilder */], []), core["_41" /* ɵmpd */](4608, translate_loader["b" /* TranslateLoader */], translate_loader["a" /* TranslateFakeLoader */], []), core["_41" /* ɵmpd */](4608, translate_compiler["a" /* TranslateCompiler */], translate_compiler["b" /* TranslateFakeCompiler */], []), core["_41" /* ɵmpd */](4608, translate_parser["b" /* TranslateParser */], translate_parser["a" /* TranslateDefaultParser */], []), core["_41" /* ɵmpd */](4608, missing_translation_handler["b" /* MissingTranslationHandler */], missing_translation_handler["a" /* FakeMissingTranslationHandler */], []), core["_41" /* ɵmpd */](4608, translate_service["a" /* TranslateService */], translate_service["a" /* TranslateService */], [translate_store["a" /* TranslateStore */], translate_loader["b" /* TranslateLoader */], translate_compiler["a" /* TranslateCompiler */], translate_parser["b" /* TranslateParser */], missing_translation_handler["b" /* MissingTranslationHandler */], translate_service["b" /* USE_DEFAULT_LANG */], translate_service["c" /* USE_STORE */]]), core["_41" /* ɵmpd */](512, directives_module["a" /* CoreDirectivesModule */], directives_module["a" /* CoreDirectivesModule */], []), core["_41" /* ɵmpd */](512, common["b" /* CommonModule */], common["b" /* CommonModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["v" /* ɵba */], esm5_forms["v" /* ɵba */], []), core["_41" /* ɵmpd */](512, esm5_forms["i" /* FormsModule */], esm5_forms["i" /* FormsModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["s" /* ReactiveFormsModule */], esm5_forms["s" /* ReactiveFormsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["a" /* IonicModule */], ionic_angular_module["a" /* IonicModule */], []), core["_41" /* ɵmpd */](512, _ngx_translate_core["b" /* TranslateModule */], _ngx_translate_core["b" /* TranslateModule */], []), core["_41" /* ɵmpd */](512, pipes_module["a" /* CorePipesModule */], pipes_module["a" /* CorePipesModule */], []), core["_41" /* ɵmpd */](512, components_module["a" /* CoreComponentsModule */], components_module["a" /* CoreComponentsModule */], []), core["_41" /* ɵmpd */](512, course_components_components_module["a" /* CoreCourseComponentsModule */], course_components_components_module["a" /* CoreCourseComponentsModule */], []), core["_41" /* ɵmpd */](512, compile_html_module["a" /* CoreCompileHtmlComponentModule */], compile_html_module["a" /* CoreCompileHtmlComponentModule */], []), core["_41" /* ɵmpd */](512, components_components_module["a" /* CoreCommentsComponentsModule */], components_components_module["a" /* CoreCommentsComponentsModule */], []), core["_41" /* ɵmpd */](512, data_components_components_module["a" /* AddonModDataComponentsModule */], data_components_components_module["a" /* AddonModDataComponentsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["b" /* IonicPageModule */], ionic_angular_module["b" /* IonicPageModule */], []), core["_41" /* ɵmpd */](512, edit_module_AddonModDataEditPageModule, edit_module_AddonModDataEditPageModule, []), core["_41" /* ɵmpd */](256, translate_service["c" /* USE_STORE */], undefined, []), core["_41" /* ɵmpd */](256, translate_service["b" /* USE_DEFAULT_LANG */], undefined, []), core["_41" /* ɵmpd */](256, module_loader["a" /* LAZY_LOADED_TOKEN */], edit_AddonModDataEditPage, [])]); });

//# sourceMappingURL=edit.module.ngfactory.js.map

/***/ })

});
//# sourceMappingURL=102.js.map