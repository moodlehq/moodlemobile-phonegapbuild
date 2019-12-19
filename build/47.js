webpackJsonp([47],{

/***/ 2070:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoreCoursesMyCoursesPageModule", function() { return CoreCoursesMyCoursesPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__my_courses__ = __webpack_require__(2217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_components_module__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__directives_directives_module__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_components_module__ = __webpack_require__(192);
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







var CoreCoursesMyCoursesPageModule = /** @class */ (function () {
    function CoreCoursesMyCoursesPageModule() {
    }
    CoreCoursesMyCoursesPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__my_courses__["a" /* CoreCoursesMyCoursesPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_4__components_components_module__["a" /* CoreComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_5__directives_directives_module__["a" /* CoreDirectivesModule */],
                __WEBPACK_IMPORTED_MODULE_6__components_components_module__["a" /* CoreCoursesComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__my_courses__["a" /* CoreCoursesMyCoursesPage */]),
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */].forChild()
            ],
        })
    ], CoreCoursesMyCoursesPageModule);
    return CoreCoursesMyCoursesPageModule;
}());

//# sourceMappingURL=my-courses.module.js.map

/***/ }),

/***/ 2217:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoreCoursesMyCoursesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_my_courses_my_courses__ = __webpack_require__(999);
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
 * Page that displays the list of courses the user is enrolled in.
 */
var CoreCoursesMyCoursesPage = /** @class */ (function () {
    function CoreCoursesMyCoursesPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    /**
     * Go to search courses.
     */
    CoreCoursesMyCoursesPage.prototype.openSearch = function () {
        this.navCtrl.push('CoreCoursesSearchPage');
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_2__components_my_courses_my_courses__["a" /* CoreCoursesMyCoursesComponent */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__components_my_courses_my_courses__["a" /* CoreCoursesMyCoursesComponent */])
    ], CoreCoursesMyCoursesPage.prototype, "mcComponent", void 0);
    CoreCoursesMyCoursesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-core-courses-my-courses',template:/*ion-inline-start:"/home/travis/build/moodlehq/moodlemobile2/src/core/courses/pages/my-courses/my-courses.html"*/'<ion-header>\n    <ion-navbar core-back-button>\n        <ion-title>{{ \'core.courses.mycourses\' | translate }}</ion-title>\n\n        <ion-buttons end>\n            <button *ngIf="mcComponent && mcComponent.searchEnabled" ion-button icon-only (click)="openSearch()" [attr.aria-label]="\'core.courses.searchcourses\' | translate">\n                <ion-icon name="search"></ion-icon>\n            </button>\n            <core-context-menu *ngIf="mcComponent">\n                <core-context-menu-item [hidden]="!mcComponent.downloadAllCoursesEnabled || !mcComponent.courses || mcComponent.courses.length < 2" [priority]="800" [content]="\'core.courses.downloadcourses\' | translate" (action)="mcComponent.prefetchCourses()" [iconAction]="mcComponent.prefetchCoursesData.icon" [closeOnClick]="false" [badge]="mcComponent.prefetchCoursesData.badge"></core-context-menu-item>\n                <core-context-menu-item [hidden]="!mcComponent.courses || mcComponent.courses.length <= 5" [priority]="700" [content]="\'core.courses.filtermycourses\' | translate" (action)="mcComponent.switchFilter()" [iconAction]="\'funnel\'"></core-context-menu-item>\n            </core-context-menu>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n<ion-content>\n    <ion-refresher [enabled]="mcComponent && mcComponent.coursesLoaded" (ionRefresh)="mcComponent.refreshCourses($event)">\n        <ion-refresher-content pullingText="{{ \'core.pulltorefresh\' | translate }}"></ion-refresher-content>\n    </ion-refresher>\n\n    <core-courses-my-courses></core-courses-my-courses>\n</ion-content>\n'/*ion-inline-end:"/home/travis/build/moodlehq/moodlemobile2/src/core/courses/pages/my-courses/my-courses.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavController */]])
    ], CoreCoursesMyCoursesPage);
    return CoreCoursesMyCoursesPage;
}());

//# sourceMappingURL=my-courses.js.map

/***/ })

});
//# sourceMappingURL=47.js.map