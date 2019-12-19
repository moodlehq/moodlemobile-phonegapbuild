webpackJsonp([95],{

/***/ 2034:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddonModForumEditPostPageModule", function() { return AddonModForumEditPostPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__directives_directives_module__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_components_module__ = __webpack_require__(993);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__edit_post__ = __webpack_require__(2181);
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







var AddonModForumEditPostPageModule = /** @class */ (function () {
    function AddonModForumEditPostPageModule() {
    }
    AddonModForumEditPostPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__edit_post__["a" /* AddonModForumEditPostPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* CoreComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_4__directives_directives_module__["a" /* CoreDirectivesModule */],
                __WEBPACK_IMPORTED_MODULE_5__components_components_module__["a" /* AddonModForumComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_6__edit_post__["a" /* AddonModForumEditPostPage */]),
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */].forChild()
            ],
        })
    ], AddonModForumEditPostPageModule);
    return AddonModForumEditPostPageModule;
}());

//# sourceMappingURL=edit-post.module.js.map

/***/ }),

/***/ 2181:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddonModForumEditPostPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_fileuploader_providers_fileuploader__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_utils_dom__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_forum__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_helper__ = __webpack_require__(231);
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
 * Page that displays a form to edit discussion post.
 */
var AddonModForumEditPostPage = /** @class */ (function () {
    function AddonModForumEditPostPage(params, forumProvider, viewCtrl, domUtils, uploaderProvider, forumHelper, translate) {
        this.forumProvider = forumProvider;
        this.viewCtrl = viewCtrl;
        this.domUtils = domUtils;
        this.uploaderProvider = uploaderProvider;
        this.forumHelper = forumHelper;
        this.translate = translate;
        this.messageControl = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]();
        this.advanced = false; // Display all form fields.
        this.replyData = {};
        this.originalData = {}; // Object with the original post data. Usually shared between posts.
        this.forceLeave = false; // To allow leaving the page without checking for changes.
        var post = params.get('post');
        this.component = params.get('component');
        this.componentId = params.get('componentId');
        this.forum = params.get('forum');
        this.replyData.id = post.id;
        this.replyData.subject = post.subject;
        this.replyData.message = post.message;
        this.replyData.files = post.attachments || [];
        // Delete the local files from the tmp folder if any.
        this.uploaderProvider.clearTmpFiles(this.replyData.files);
        // Update rich text editor.
        this.messageControl.setValue(this.replyData.message);
        // Update original data.
        this.originalData.subject = this.replyData.subject;
        this.originalData.message = this.replyData.message;
        this.originalData.files = this.replyData.files.slice();
        // Show advanced fields if any of them has not the default value.
        this.advanced = this.replyData.files.length > 0;
    }
    /**
     * Check if we can leave the page or not.
     *
     * @return Resolved if we can leave it, rejected if not.
     */
    AddonModForumEditPostPage.prototype.ionViewCanLeave = function () {
        var _this = this;
        if (this.forceLeave) {
            return true;
        }
        var promise;
        if (this.forumHelper.hasPostDataChanged(this.replyData, this.originalData)) {
            // Show confirmation if some data has been modified.
            promise = this.domUtils.showConfirm(this.translate.instant('core.confirmcanceledit'));
        }
        else {
            promise = Promise.resolve();
        }
        return promise.then(function () {
            // Delete the local files from the tmp folder.
            _this.uploaderProvider.clearTmpFiles(_this.replyData.files);
        });
    };
    /**
     * Message changed.
     *
     * @param text The new text.
     */
    AddonModForumEditPostPage.prototype.onMessageChange = function (text) {
        this.replyData.message = text;
    };
    /**
     * Close modal.
     *
     * @param data Data to return to the page.
     */
    AddonModForumEditPostPage.prototype.closeModal = function (data) {
        this.viewCtrl.dismiss(data);
    };
    /**
     * Reply to this post.
     *
     * @param e Click event.
     */
    AddonModForumEditPostPage.prototype.reply = function (e) {
        e.preventDefault();
        e.stopPropagation();
        // Close the modal, sending the input data.
        this.forceLeave = true;
        this.closeModal(this.replyData);
    };
    /**
     * Show or hide advanced form fields.
     */
    AddonModForumEditPostPage.prototype.toggleAdvanced = function () {
        this.advanced = !this.advanced;
    };
    AddonModForumEditPostPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'addon-mod-forum-edit-post',template:/*ion-inline-start:"/home/travis/build/moodlehq/moodlemobile2/src/addon/mod/forum/pages/edit-post/addon-mod-forum-edit-post.html"*/'<ion-header>\n    <ion-navbar core-back-button>\n        <ion-title>{{ \'addon.mod_forum.yourreply\' | translate }}</ion-title>\n        <ion-buttons end>\n            <button ion-button icon-only (click)="closeModal()" [attr.aria-label]="\'core.close\' | translate">\n                <ion-icon name="close"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n<ion-content>\n    <ion-list>\n        <ion-item>\n            <ion-label stacked>{{ \'addon.mod_forum.subject\' | translate }}</ion-label>\n            <ion-input type="text" [placeholder]="\'addon.mod_forum.subject\' | translate" [(ngModel)]="replyData.subject"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label stacked>{{ \'addon.mod_forum.message\' | translate }}</ion-label>\n            <core-rich-text-editor item-content [control]="messageControl" (contentChanged)="onMessageChange($event)" [placeholder]="\'addon.mod_forum.replyplaceholder\' | translate" [name]="\'mod_forum_reply_\' + replyData.id" [component]="component" [componentId]="componentId"></core-rich-text-editor>\n        </ion-item>\n        <ion-item-divider text-wrap (click)="toggleAdvanced()" class="core-expandable">\n            <core-icon *ngIf="!advanced" name="fa-caret-right" item-start></core-icon>\n            <core-icon *ngIf="advanced" name="fa-caret-down" item-start></core-icon>\n            {{ \'addon.mod_forum.advanced\' | translate }}\n        </ion-item-divider>\n        <ng-container *ngIf="advanced">\n            <core-attachments *ngIf="forum.id && forum.maxattachments > 0" [files]="replyData.files" [maxSize]="forum.maxbytes" [maxSubmissions]="forum.maxattachments" [component]="component" [componentId]="forum.cmid" [allowOffline]="true"></core-attachments>\n        </ng-container>\n        <ion-grid>\n            <ion-row>\n                <ion-col>\n                    <button ion-button block (click)="reply($event)" [disabled]="replyData.subject == \'\' || replyData.message == null">{{ \'core.savechanges\' | translate }}</button>\n                </ion-col>\n                <ion-col>\n                    <button ion-button block color="light" (click)="closeModal()">{{ \'core.cancel\' | translate }}</button>\n                </ion-col>\n            </ion-row>\n        </ion-grid>\n    </ion-list>\n</ion-content>'/*ion-inline-end:"/home/travis/build/moodlehq/moodlemobile2/src/addon/mod/forum/pages/edit-post/addon-mod-forum-edit-post.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["t" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_6__providers_forum__["a" /* AddonModForumProvider */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["G" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_5__providers_utils_dom__["a" /* CoreDomUtilsProvider */],
            __WEBPACK_IMPORTED_MODULE_4__core_fileuploader_providers_fileuploader__["a" /* CoreFileUploaderProvider */],
            __WEBPACK_IMPORTED_MODULE_7__providers_helper__["a" /* AddonModForumHelperProvider */],
            __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */]])
    ], AddonModForumEditPostPage);
    return AddonModForumEditPostPage;
}());

//# sourceMappingURL=edit-post.js.map

/***/ })

});
//# sourceMappingURL=95.js.map