webpackJsonp([50],{

/***/ 1905:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoreCourseListModTypePageModule", function() { return CoreCourseListModTypePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__list_mod_type__ = __webpack_require__(2038);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_components_module__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__directives_directives_module__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_course_components_components_module__ = __webpack_require__(38);
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







var CoreCourseListModTypePageModule = /** @class */ (function () {
    function CoreCourseListModTypePageModule() {
    }
    CoreCourseListModTypePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__list_mod_type__["a" /* CoreCourseListModTypePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_4__components_components_module__["a" /* CoreComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_5__directives_directives_module__["a" /* CoreDirectivesModule */],
                __WEBPACK_IMPORTED_MODULE_6__core_course_components_components_module__["a" /* CoreCourseComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__list_mod_type__["a" /* CoreCourseListModTypePage */]),
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */].forChild()
            ],
        })
    ], CoreCourseListModTypePageModule);
    return CoreCourseListModTypePageModule;
}());

//# sourceMappingURL=list-mod-type.module.js.map

/***/ }),

/***/ 2038:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoreCourseListModTypePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_utils_dom__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_course__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_module_delegate__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_helper__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_constants__ = __webpack_require__(19);
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
 * Page that displays comments.
 */
var CoreCourseListModTypePage = /** @class */ (function () {
    function CoreCourseListModTypePage(navParams, courseProvider, moduleDelegate, domUtils, courseHelper) {
        this.courseProvider = courseProvider;
        this.moduleDelegate = moduleDelegate;
        this.domUtils = domUtils;
        this.courseHelper = courseHelper;
        this.modules = [];
        this.loaded = false;
        this.archetypes = {}; // To speed up the check of modules.
        this.title = navParams.get('title');
        this.courseId = navParams.get('courseId');
        this.modName = navParams.get('modName');
    }
    /**
     * View loaded.
     */
    CoreCourseListModTypePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.fetchData().finally(function () {
            _this.loaded = true;
        });
    };
    /**
     * Fetches the data.
     *
     * @return {Promise<any>} Resolved when done.
     */
    CoreCourseListModTypePage.prototype.fetchData = function () {
        var _this = this;
        // Get all the modules in the course.
        return this.courseProvider.getSections(this.courseId, false, true).then(function (sections) {
            _this.modules = [];
            sections.forEach(function (section) {
                if (!section.modules) {
                    return;
                }
                section.modules.forEach(function (mod) {
                    if (mod.uservisible === false || !_this.courseProvider.moduleHasView(mod)) {
                        // Ignore this module.
                        return;
                    }
                    if (_this.modName === 'resources') {
                        // Check that the module is a resource.
                        if (typeof _this.archetypes[mod.modname] == 'undefined') {
                            _this.archetypes[mod.modname] = _this.moduleDelegate.supportsFeature(mod.modname, __WEBPACK_IMPORTED_MODULE_6__core_constants__["a" /* CoreConstants */].FEATURE_MOD_ARCHETYPE, __WEBPACK_IMPORTED_MODULE_6__core_constants__["a" /* CoreConstants */].MOD_ARCHETYPE_OTHER);
                        }
                        if (_this.archetypes[mod.modname] == __WEBPACK_IMPORTED_MODULE_6__core_constants__["a" /* CoreConstants */].MOD_ARCHETYPE_RESOURCE) {
                            _this.modules.push(mod);
                        }
                    }
                    else if (mod.modname == _this.modName) {
                        _this.modules.push(mod);
                    }
                });
            });
            // Get the handler data for the modules.
            var fakeSection = {
                visible: 1,
                modules: _this.modules
            };
            _this.courseHelper.addHandlerDataForModules([fakeSection], _this.courseId);
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'Error getting data');
        });
    };
    /**
     * Refresh the data.
     *
     * @param {any} refresher Refresher.
     */
    CoreCourseListModTypePage.prototype.refreshData = function (refresher) {
        var _this = this;
        this.courseProvider.invalidateSections(this.courseId).finally(function () {
            return _this.fetchData().finally(function () {
                refresher.complete();
            });
        });
    };
    CoreCourseListModTypePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-core-course-list-mod-type',template:/*ion-inline-start:"/home/travis/build/moodlehq/moodlemobile2/src/core/course/pages/list-mod-type/list-mod-type.html"*/'<ion-header>\n    <ion-navbar core-back-button>\n        <ion-title><core-format-text [text]="title"></core-format-text></ion-title>\n    </ion-navbar>\n</ion-header>\n<ion-content>\n    <ion-refresher [enabled]="loaded" (ionRefresh)="refreshData($event)">\n        <ion-refresher-content pullingText="{{ \'core.pulltorefresh\' | translate }}"></ion-refresher-content>\n    </ion-refresher>\n    <core-loading [hideUntil]="loaded">\n        <core-empty-box *ngIf="!modules || !modules.length" icon="qr-scanner" [message]="\'core.course.nocontentavailable\' | translate"></core-empty-box>\n\n        <ion-list>\n            <ng-container *ngFor="let module of modules">\n                <core-course-module *ngIf="module.visibleoncoursepage !== 0" [module]="module" [courseId]="courseId" downloadEnabled="true"></core-course-module>\n            </ng-container>\n        </ion-list>\n    </core-loading>\n</ion-content>\n'/*ion-inline-end:"/home/travis/build/moodlehq/moodlemobile2/src/core/course/pages/list-mod-type/list-mod-type.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_course__["a" /* CoreCourseProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_module_delegate__["a" /* CoreCourseModuleDelegate */],
            __WEBPACK_IMPORTED_MODULE_2__providers_utils_dom__["a" /* CoreDomUtilsProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_helper__["a" /* CoreCourseHelperProvider */]])
    ], CoreCourseListModTypePage);
    return CoreCourseListModTypePage;
}());

//# sourceMappingURL=list-mod-type.js.map

/***/ })

});
//# sourceMappingURL=50.js.map