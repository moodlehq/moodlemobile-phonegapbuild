webpackJsonp([138],{

/***/ 2003:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddonBlogEntriesPageModule", function() { return AddonBlogEntriesPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__directives_directives_module__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__entries__ = __webpack_require__(2150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_components_module__ = __webpack_require__(1009);
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






var AddonBlogEntriesPageModule = /** @class */ (function () {
    function AddonBlogEntriesPageModule() {
    }
    AddonBlogEntriesPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__entries__["a" /* AddonBlogEntriesPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__directives_directives_module__["a" /* CoreDirectivesModule */],
                __WEBPACK_IMPORTED_MODULE_5__components_components_module__["a" /* AddonBlogComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_4__entries__["a" /* AddonBlogEntriesPage */]),
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */].forChild()
            ],
        })
    ], AddonBlogEntriesPageModule);
    return AddonBlogEntriesPageModule;
}());

//# sourceMappingURL=entries.module.js.map

/***/ }),

/***/ 2150:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddonBlogEntriesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
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
 * Page that displays the list of blog entries.
 */
var AddonBlogEntriesPage = /** @class */ (function () {
    function AddonBlogEntriesPage(params) {
        this.userId = params.get('userId');
        this.courseId = params.get('courseId');
        this.cmId = params.get('cmId');
        this.entryId = params.get('entryId');
        this.groupId = params.get('groupId');
        this.tagId = params.get('tagId');
        if (!this.userId && !this.courseId && !this.cmId && !this.entryId && !this.groupId && !this.tagId) {
            this.title = 'addon.blog.siteblogheading';
        }
        else {
            this.title = 'addon.blog.blogentries';
        }
    }
    AddonBlogEntriesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-addon-blog-entries',template:/*ion-inline-start:"/home/travis/build/moodlehq/moodlemobile2/src/addon/blog/pages/entries/entries.html"*/'<ion-header>\n    <ion-navbar core-back-button>\n        <ion-title>{{ title | translate }}</ion-title>\n        <ion-buttons end></ion-buttons>\n    </ion-navbar>\n</ion-header>\n<addon-blog-entries class="core-avoid-header" [courseId]="courseId" [userId]="userId" [cmId]="cmId" [entryId]="entryId" [groupId]="groupId" [tagId]="tagId"></addon-blog-entries>\n'/*ion-inline-end:"/home/travis/build/moodlehq/moodlemobile2/src/addon/blog/pages/entries/entries.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* NavParams */]])
    ], AddonBlogEntriesPage);
    return AddonBlogEntriesPage;
}());

//# sourceMappingURL=entries.js.map

/***/ })

});
//# sourceMappingURL=138.js.map