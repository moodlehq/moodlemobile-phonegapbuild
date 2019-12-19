webpackJsonp([59],{

/***/ 2061:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddonStorageManagerCourseStoragePageModule", function() { return AddonStorageManagerCourseStoragePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__directives_directives_module__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pipes_pipes_module__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__course_storage__ = __webpack_require__(2208);
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







var AddonStorageManagerCourseStoragePageModule = /** @class */ (function () {
    function AddonStorageManagerCourseStoragePageModule() {
    }
    AddonStorageManagerCourseStoragePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__course_storage__["a" /* AddonStorageManagerCourseStoragePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* CoreComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_4__directives_directives_module__["a" /* CoreDirectivesModule */],
                __WEBPACK_IMPORTED_MODULE_5__pipes_pipes_module__["a" /* CorePipesModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_6__course_storage__["a" /* AddonStorageManagerCourseStoragePage */]),
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */].forChild()
            ],
        })
    ], AddonStorageManagerCourseStoragePageModule);
    return AddonStorageManagerCourseStoragePageModule;
}());

//# sourceMappingURL=course-storage.module.js.map

/***/ }),

/***/ 2208:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddonStorageManagerCourseStoragePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_course_providers_course__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_course_providers_module_prefetch_delegate__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_course_providers_helper__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_utils_dom__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__ = __webpack_require__(1);
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
 * Page that displays the amount of file storage used by each activity on the course, and allows
 * the user to delete these files.
 */
var AddonStorageManagerCourseStoragePage = /** @class */ (function () {
    function AddonStorageManagerCourseStoragePage(navParams, courseProvider, prefetchDelegate, courseHelperProvider, domUtils, translate) {
        this.courseProvider = courseProvider;
        this.prefetchDelegate = prefetchDelegate;
        this.courseHelperProvider = courseHelperProvider;
        this.domUtils = domUtils;
        this.translate = translate;
        this.course = navParams.get('course');
    }
    /**
     * View loaded.
     */
    AddonStorageManagerCourseStoragePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.courseProvider.getSections(this.course.id, false, true).then(function (sections) {
            _this.courseHelperProvider.addHandlerDataForModules(sections, _this.course.id);
            _this.sections = sections;
            _this.totalSize = 0;
            var allPromises = [];
            _this.sections.forEach(function (section) {
                section.totalSize = 0;
                section.modules.forEach(function (module) {
                    module.parentSection = section;
                    module.totalSize = 0;
                    // Note: This function only gets the size for modules which are downloadable.
                    // For other modules it always returns 0, even if they have downloaded some files.
                    // However there is no 100% reliable way to actually track the files in this case.
                    // You can maybe guess it based on the component and componentid.
                    // But these aren't necessarily consistent, for example mod_frog vs mmaModFrog.
                    // There is nothing enforcing correct values.
                    // Most modules which have large files are downloadable, so I think this is sufficient.
                    var promise = _this.prefetchDelegate.getModuleDownloadedSize(module, _this.course.id).
                        then(function (size) {
                        // There are some cases where the return from this is not a valid number.
                        if (!isNaN(size)) {
                            module.totalSize = Number(size);
                            section.totalSize += size;
                            _this.totalSize += size;
                        }
                    });
                    allPromises.push(promise);
                });
            });
            Promise.all(allPromises).then(function () {
                _this.loaded = true;
            });
        });
    };
    /**
     * The user has requested a delete for the whole course data.
     *
     * (This works by deleting data for each module on the course that has data.)
     */
    AddonStorageManagerCourseStoragePage.prototype.deleteForCourse = function () {
        var modules = [];
        this.sections.forEach(function (section) {
            section.modules.forEach(function (module) {
                if (module.totalSize > 0) {
                    modules.push(module);
                }
            });
        });
        this.deleteModules(modules);
    };
    /**
     * The user has requested a delete for a section's data.
     *
     * (This works by deleting data for each module in the section that has data.)
     *
     * @param section Section object with information about section and modules
     */
    AddonStorageManagerCourseStoragePage.prototype.deleteForSection = function (section) {
        var modules = [];
        section.modules.forEach(function (module) {
            if (module.totalSize > 0) {
                modules.push(module);
            }
        });
        this.deleteModules(modules);
    };
    /**
     * The user has requested a delete for a module's data
     *
     * @param module Module details
     */
    AddonStorageManagerCourseStoragePage.prototype.deleteForModule = function (module) {
        if (module.totalSize > 0) {
            this.deleteModules([module]);
        }
    };
    /**
     * Deletes the specified modules, showing the loading overlay while it happens.
     *
     * @param modules Modules to delete
     * @return Promise<void> Once deleting has finished
     */
    AddonStorageManagerCourseStoragePage.prototype.deleteModules = function (modules) {
        var _this = this;
        var modal = this.domUtils.showModalLoading();
        var promises = [];
        modules.forEach(function (module) {
            // Remove the files.
            var promise = _this.prefetchDelegate.removeModuleFiles(module, _this.course.id).then(function () {
                // When the files are removed, update the size.
                module.parentSection.totalSize -= module.totalSize;
                _this.totalSize -= module.totalSize;
                module.totalSize = 0;
            });
            promises.push(promise);
        });
        return Promise.all(promises).then(function () {
            modal.dismiss();
        }).catch(function (error) {
            modal.dismiss();
            _this.domUtils.showErrorModalDefault(error, _this.translate.instant('core.errordeletefile'));
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Content */])
    ], AddonStorageManagerCourseStoragePage.prototype, "content", void 0);
    AddonStorageManagerCourseStoragePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-addon-storagemanager-course-storage',template:/*ion-inline-start:"/home/travis/build/moodlehq/moodlemobile2/src/addon/storagemanager/pages/course-storage/course-storage.html"*/'<ion-header>\n    <ion-navbar core-back-button>\n        <ion-title>{{ \'addon.storagemanager.managestorage\' | translate }}</ion-title>\n    </ion-navbar>\n</ion-header>\n<ion-content>\n    <core-loading [hideUntil]="loaded">\n        <ion-card class="wholecourse">\n            <ion-card-header>\n                <h1 text-wrap>{{ course.displayname }}</h1>\n                <p text-wrap>{{ \'addon.storagemanager.info\' | translate }}</p>\n                <ion-item no-padding padding-top>\n                    <ion-row class="size">\n                        <ion-icon name="cube"></ion-icon>\n                        {{ \'addon.storagemanager.storageused\' | translate }}\n                        {{ totalSize | coreBytesToSize }}\n                    </ion-row>\n                    <button ion-button icon-only item-end no-padding (click)="deleteForCourse()" [disabled]="totalSize == 0">\n                        <core-icon name="trash" label="{{ \'addon.storagemanager.deletecourse\' | translate }}"></core-icon>\n                    </button>\n                </ion-item>\n            </ion-card-header>\n        </ion-card>\n        <ng-container *ngFor="let section of sections">\n            <ion-card *ngIf="section.totalSize > 0" class="section">\n                <ion-card-header>\n                    <ion-item no-padding>\n                        <ion-row>\n                            <h2 text-wrap>{{ section.name }}</h2>\n                        </ion-row>\n                        <ion-row class="size">\n                            <ion-icon name="cube"></ion-icon>\n                            {{ section.totalSize | coreBytesToSize }}\n                        </ion-row>\n                        <button ion-button icon-only item-end no-padding (click)="deleteForSection(section)">\n                            <core-icon name="trash" label="{{ \'addon.storagemanager.deletedatafrom\' | translate: { name: section.name } }}"></core-icon>\n                        </button>\n                    </ion-item>\n                </ion-card-header>\n                <ion-card-content>\n                    <ng-container *ngFor="let module of section.modules">\n                        <div *ngIf="module.totalSize > 0">\n                            <ion-item no-padding>\n                                <ion-row class="{{module.handlerData.class}}">\n                                    <img *ngIf="module.handlerData.icon" [src]="module.handlerData.icon" alt="" role="presentation" class="core-module-icon"\n                                    >{{ module.name }}\n                                </ion-row>\n                                <ion-row class="size">\n                                    <ion-icon name="cube"></ion-icon>\n                                    {{ module.totalSize | coreBytesToSize }}\n                                </ion-row>\n                                <button ion-button icon-only outline item-end (click)="deleteForModule(module)">\n                                    <core-icon name="trash" label="{{ \'addon.storagemanager.deletedatafrom\' | translate: { name: module.name } }}"></core-icon>\n                                </button>\n                            </ion-item>\n                        </div>\n                    </ng-container>\n                </ion-card-content>\n            </ion-card>\n        </ng-container>\n    </core-loading>\n</ion-content>\n'/*ion-inline-end:"/home/travis/build/moodlehq/moodlemobile2/src/addon/storagemanager/pages/course-storage/course-storage.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__core_course_providers_course__["a" /* CoreCourseProvider */],
            __WEBPACK_IMPORTED_MODULE_3__core_course_providers_module_prefetch_delegate__["a" /* CoreCourseModulePrefetchDelegate */],
            __WEBPACK_IMPORTED_MODULE_4__core_course_providers_helper__["a" /* CoreCourseHelperProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_utils_dom__["a" /* CoreDomUtilsProvider */],
            __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__["c" /* TranslateService */]])
    ], AddonStorageManagerCourseStoragePage);
    return AddonStorageManagerCourseStoragePage;
}());

//# sourceMappingURL=course-storage.js.map

/***/ })

});
//# sourceMappingURL=59.js.map