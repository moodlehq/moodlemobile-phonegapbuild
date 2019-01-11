webpackJsonp([56],{

/***/ 1919:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/@angular/core/esm5/core.js
var core = __webpack_require__(0);

// EXTERNAL MODULE: ./node_modules/ionic-angular/index.js + 3 modules
var ionic_angular = __webpack_require__(8);

// EXTERNAL MODULE: ./src/providers/file.ts
var file = __webpack_require__(49);

// EXTERNAL MODULE: ./src/providers/utils/dom.ts
var dom = __webpack_require__(4);

// EXTERNAL MODULE: ./src/providers/utils/text.ts
var utils_text = __webpack_require__(10);

// EXTERNAL MODULE: ./src/providers/utils/time.ts
var time = __webpack_require__(24);

// CONCATENATED MODULE: ./src/core/emulator/pages/capture-media/capture-media.ts
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
 * Page to capture media in browser or desktop.
 */
var capture_media_CoreEmulatorCaptureMediaPage = /** @class */ (function () {
    function CoreEmulatorCaptureMediaPage(viewCtrl, params, domUtils, timeUtils, fileProvider, textUtils, cdr) {
        this.viewCtrl = viewCtrl;
        this.domUtils = domUtils;
        this.timeUtils = timeUtils;
        this.fileProvider = fileProvider;
        this.textUtils = textUtils;
        this.cdr = cdr;
        this.window = window;
        this.type = params.get('type');
        this.maxTime = params.get('maxTime');
        this.facingMode = params.get('facingMode') || 'environment';
        this.mimetype = params.get('mimetype');
        this.extension = params.get('extension');
        this.quality = params.get('quality') || 0.92;
        this.returnDataUrl = !!params.get('returnDataUrl');
    }
    /**
     * Component being initialized.
     */
    CoreEmulatorCaptureMediaPage.prototype.ngOnInit = function () {
        var _this = this;
        this.initVariables();
        var constraints = {
            video: this.isAudio ? false : { facingMode: this.facingMode },
            audio: !this.isImage
        };
        navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
            var chunks = [];
            _this.localMediaStream = stream;
            if (!_this.isImage) {
                if (_this.isVideo) {
                    _this.previewMedia = _this.previewVideo.nativeElement;
                }
                else {
                    _this.previewMedia = _this.previewAudio.nativeElement;
                    _this.initAudioDrawer(_this.localMediaStream);
                    _this.audioDrawer.start();
                }
                _this.mediaRecorder = new _this.window.MediaRecorder(_this.localMediaStream, { mimeType: _this.mimetype });
                // When video or audio is recorded, add it to the list of chunks.
                _this.mediaRecorder.ondataavailable = function (e) {
                    if (e.data.size > 0) {
                        chunks.push(e.data);
                    }
                };
                // When recording stops, create a Blob element with the recording and set it to the video or audio.
                _this.mediaRecorder.onstop = function () {
                    _this.mediaBlob = new Blob(chunks);
                    chunks = [];
                    _this.previewMedia.src = window.URL.createObjectURL(_this.mediaBlob);
                };
            }
            if (_this.isImage || _this.isVideo) {
                var hasLoaded_1 = false, waitTimeout_1;
                // Listen for stream ready to display the stream.
                _this.streamVideo.nativeElement.onloadedmetadata = function () {
                    if (hasLoaded_1) {
                        // Already loaded or timeout triggered, stop.
                        return;
                    }
                    hasLoaded_1 = true;
                    clearTimeout(waitTimeout_1);
                    _this.readyToCapture = true;
                    _this.streamVideo.nativeElement.onloadedmetadata = null;
                    // Force change detection. Angular doesn't detect these async operations.
                    _this.cdr.detectChanges();
                };
                // Set the stream as the source of the video.
                _this.streamVideo.nativeElement.src = window.URL.createObjectURL(_this.localMediaStream);
                // If stream isn't ready in a while, show error.
                waitTimeout_1 = setTimeout(function () {
                    if (!hasLoaded_1) {
                        // Show error.
                        hasLoaded_1 = true;
                        _this.dismissWithError(-1, 'Cannot connect to webcam.');
                    }
                }, 10000);
            }
            else {
                // It's ready to capture.
                _this.readyToCapture = true;
            }
        }).catch(function (error) {
            _this.dismissWithError(-1, error.message || error);
        });
    };
    /**
     * Initialize the audio drawer. This code has been extracted from MDN's example on MediaStream Recording:
     * https://github.com/mdn/web-dictaphone
     *
     * @param {MediaStream} stream Stream returned by getUserMedia.
     */
    CoreEmulatorCaptureMediaPage.prototype.initAudioDrawer = function (stream) {
        var skip = true, running = false;
        var audioCtx = new (this.window.AudioContext || this.window.webkitAudioContext)(), canvasCtx = this.streamAudio.nativeElement.getContext('2d'), source = audioCtx.createMediaStreamSource(stream), analyser = audioCtx.createAnalyser(), bufferLength = analyser.frequencyBinCount, dataArray = new Uint8Array(bufferLength), width = this.streamAudio.nativeElement.width, height = this.streamAudio.nativeElement.height, drawAudio = function () {
            if (!running) {
                return;
            }
            // Update the draw every animation frame.
            requestAnimationFrame(drawAudio);
            // Skip half of the frames to improve performance, shouldn't affect the smoothness.
            skip = !skip;
            if (skip) {
                return;
            }
            var sliceWidth = width / bufferLength;
            var x = 0;
            analyser.getByteTimeDomainData(dataArray);
            canvasCtx.fillStyle = 'rgb(200, 200, 200)';
            canvasCtx.fillRect(0, 0, width, height);
            canvasCtx.lineWidth = 1;
            canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
            canvasCtx.beginPath();
            for (var i = 0; i < bufferLength; i++) {
                var v = dataArray[i] / 128.0, y = v * height / 2;
                if (i === 0) {
                    canvasCtx.moveTo(x, y);
                }
                else {
                    canvasCtx.lineTo(x, y);
                }
                x += sliceWidth;
            }
            canvasCtx.lineTo(width, height / 2);
            canvasCtx.stroke();
        };
        analyser.fftSize = 2048;
        source.connect(analyser);
        this.audioDrawer = {
            start: function () {
                if (running) {
                    return;
                }
                running = true;
                drawAudio();
            },
            stop: function () {
                running = false;
            }
        };
    };
    /**
     * Initialize some variables based on the params.
     */
    CoreEmulatorCaptureMediaPage.prototype.initVariables = function () {
        if (this.type == 'captureimage') {
            this.isCaptureImage = true;
            this.type = 'image';
        }
        // Initialize some data based on the type of media to capture.
        if (this.type == 'video') {
            this.isVideo = true;
            this.title = 'core.capturevideo';
        }
        else if (this.type == 'audio') {
            this.isAudio = true;
            this.title = 'core.captureaudio';
        }
        else if (this.type == 'image') {
            this.isImage = true;
            this.title = 'core.captureimage';
        }
    };
    /**
     * Main action clicked: record or stop recording.
     */
    CoreEmulatorCaptureMediaPage.prototype.actionClicked = function () {
        var _this = this;
        if (this.isCapturing) {
            // It's capturing, stop.
            this.stopCapturing();
            this.cdr.detectChanges();
        }
        else {
            if (!this.isImage) {
                // Start the capture.
                this.isCapturing = true;
                this.resetChrono = false;
                this.mediaRecorder.start();
                this.cdr.detectChanges();
            }
            else {
                // Get the image from the video and set it to the canvas, using video width/height.
                var width = this.streamVideo.nativeElement.videoWidth, height = this.streamVideo.nativeElement.videoHeight, loadingModal_1 = this.domUtils.showModalLoading();
                this.imgCanvas.nativeElement.width = width;
                this.imgCanvas.nativeElement.height = height;
                this.imgCanvas.nativeElement.getContext('2d').drawImage(this.streamVideo.nativeElement, 0, 0, width, height);
                // Convert the image to blob and show it in an image element.
                this.imgCanvas.nativeElement.toBlob(function (blob) {
                    loadingModal_1.dismiss();
                    _this.mediaBlob = blob;
                    _this.previewImage.nativeElement.setAttribute('src', window.URL.createObjectURL(_this.mediaBlob));
                    _this.hasCaptured = true;
                }, this.mimetype, this.quality);
            }
        }
    };
    /**
     * User cancelled.
     */
    CoreEmulatorCaptureMediaPage.prototype.cancel = function () {
        // Send a "cancelled" error like the Cordova plugin does.
        this.dismissWithError(3, 'Canceled.', 'Camera cancelled');
    };
    /**
     * Discard the captured media.
     */
    CoreEmulatorCaptureMediaPage.prototype.discard = function () {
        this.previewMedia && this.previewMedia.pause();
        this.streamVideo && this.streamVideo.nativeElement.play();
        this.audioDrawer && this.audioDrawer.start();
        this.hasCaptured = false;
        this.isCapturing = false;
        this.resetChrono = true;
        delete this.mediaBlob;
        this.cdr.detectChanges();
    };
    /**
     * Close the modal, returning some data (success).
     *
     * @param {any} data Data to return.
     */
    CoreEmulatorCaptureMediaPage.prototype.dismissWithData = function (data) {
        this.viewCtrl.dismiss(data, 'success');
    };
    /**
     * Close the modal, returning an error.
     *
     * @param {number} code Error code. Will not be used if it's a Camera capture.
     * @param {string} message Error message.
     * @param {string} [cameraMessage] A specific message to use if it's a Camera capture. If not set, message will be used.
     */
    CoreEmulatorCaptureMediaPage.prototype.dismissWithError = function (code, message, cameraMessage) {
        var isCamera = this.isImage && !this.isCaptureImage, error = isCamera ? (cameraMessage || message) : { code: code, message: message };
        this.viewCtrl.dismiss(error, 'error');
    };
    /**
     * Done capturing, write the file.
     */
    CoreEmulatorCaptureMediaPage.prototype.done = function () {
        var _this = this;
        if (this.returnDataUrl) {
            // Return the image as a base64 string.
            this.dismissWithData(this.imgCanvas.nativeElement.toDataURL(this.mimetype, this.quality));
            return;
        }
        if (!this.mediaBlob) {
            // Shouldn't happen.
            this.domUtils.showErrorModal('Please capture the media first.');
            return;
        }
        // Create the file and return it.
        var fileName = this.type + '_' + this.timeUtils.readableTimestamp() + '.' + this.extension, path = this.textUtils.concatenatePaths(file["a" /* CoreFileProvider */].TMPFOLDER, 'media/' + fileName), loadingModal = this.domUtils.showModalLoading();
        this.fileProvider.writeFile(path, this.mediaBlob).then(function (fileEntry) {
            if (_this.isImage && !_this.isCaptureImage) {
                _this.dismissWithData(fileEntry.toURL());
            }
            else {
                // The capture plugin returns a MediaFile, not a FileEntry.
                // The only difference is that it supports a new function that won't be supported in desktop.
                fileEntry.getFormatData = function (successFn, errorFn) {
                    // Nothing to do.
                };
                _this.dismissWithData([fileEntry]);
            }
        }).catch(function (err) {
            _this.domUtils.showErrorModal(err);
        }).finally(function () {
            loadingModal.dismiss();
        });
    };
    /**
     * Stop capturing. Only for video and audio.
     */
    CoreEmulatorCaptureMediaPage.prototype.stopCapturing = function () {
        this.streamVideo && this.streamVideo.nativeElement.pause();
        this.audioDrawer && this.audioDrawer.stop();
        this.mediaRecorder && this.mediaRecorder.stop();
        this.isCapturing = false;
        this.hasCaptured = true;
    };
    /**
     * Page destroyed.
     */
    CoreEmulatorCaptureMediaPage.prototype.ngOnDestroy = function () {
        var tracks = this.localMediaStream.getTracks();
        tracks.forEach(function (track) {
            track.stop();
        });
        this.streamVideo && this.streamVideo.nativeElement.pause();
        this.previewMedia && this.previewMedia.pause();
        this.audioDrawer && this.audioDrawer.stop();
        delete this.mediaBlob;
    };
    __decorate([
        Object(core["_9" /* ViewChild */])('streamVideo'),
        __metadata("design:type", core["t" /* ElementRef */])
    ], CoreEmulatorCaptureMediaPage.prototype, "streamVideo", void 0);
    __decorate([
        Object(core["_9" /* ViewChild */])('previewVideo'),
        __metadata("design:type", core["t" /* ElementRef */])
    ], CoreEmulatorCaptureMediaPage.prototype, "previewVideo", void 0);
    __decorate([
        Object(core["_9" /* ViewChild */])('imgCanvas'),
        __metadata("design:type", core["t" /* ElementRef */])
    ], CoreEmulatorCaptureMediaPage.prototype, "imgCanvas", void 0);
    __decorate([
        Object(core["_9" /* ViewChild */])('previewImage'),
        __metadata("design:type", core["t" /* ElementRef */])
    ], CoreEmulatorCaptureMediaPage.prototype, "previewImage", void 0);
    __decorate([
        Object(core["_9" /* ViewChild */])('streamAudio'),
        __metadata("design:type", core["t" /* ElementRef */])
    ], CoreEmulatorCaptureMediaPage.prototype, "streamAudio", void 0);
    __decorate([
        Object(core["_9" /* ViewChild */])('previewAudio'),
        __metadata("design:type", core["t" /* ElementRef */])
    ], CoreEmulatorCaptureMediaPage.prototype, "previewAudio", void 0);
    CoreEmulatorCaptureMediaPage = __decorate([
        Object(core["m" /* Component */])({
            selector: 'page-core-emulator-capture-media',
            templateUrl: 'capture-media.html',
        }),
        __metadata("design:paramtypes", [ionic_angular["E" /* ViewController */], ionic_angular["t" /* NavParams */], dom["a" /* CoreDomUtilsProvider */],
            time["a" /* CoreTimeUtilsProvider */], file["a" /* CoreFileProvider */],
            utils_text["a" /* CoreTextUtilsProvider */], core["j" /* ChangeDetectorRef */]])
    ], CoreEmulatorCaptureMediaPage);
    return CoreEmulatorCaptureMediaPage;
}());

//# sourceMappingURL=capture-media.js.map
// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/index.js + 1 modules
var _ngx_translate_core = __webpack_require__(3);

// EXTERNAL MODULE: ./src/components/components.module.ts
var components_module = __webpack_require__(28);

// EXTERNAL MODULE: ./src/directives/directives.module.ts + 2 modules
var directives_module = __webpack_require__(29);

// CONCATENATED MODULE: ./src/core/emulator/pages/capture-media/capture-media.module.ts
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
var capture_media_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var capture_media_module_CoreEmulatorCaptureMediaPageModule = /** @class */ (function () {
    function CoreEmulatorCaptureMediaPageModule() {
    }
    CoreEmulatorCaptureMediaPageModule = capture_media_module___decorate([
        Object(core["I" /* NgModule */])({
            declarations: [
                capture_media_CoreEmulatorCaptureMediaPage
            ],
            imports: [
                components_module["a" /* CoreComponentsModule */],
                directives_module["a" /* CoreDirectivesModule */],
                ionic_angular["l" /* IonicPageModule */].forChild(capture_media_CoreEmulatorCaptureMediaPage),
                _ngx_translate_core["b" /* TranslateModule */].forChild()
            ]
        })
    ], CoreEmulatorCaptureMediaPageModule);
    return CoreEmulatorCaptureMediaPageModule;
}());

//# sourceMappingURL=capture-media.module.js.map
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

// EXTERNAL MODULE: ./node_modules/@angular/common/esm5/common.js
var common = __webpack_require__(7);

// EXTERNAL MODULE: ./src/pipes/seconds-to-hms.ts
var seconds_to_hms = __webpack_require__(1386);

// EXTERNAL MODULE: ./src/providers/logger.ts
var logger = __webpack_require__(5);

// EXTERNAL MODULE: ./src/components/chrono/chrono.ts
var chrono = __webpack_require__(1391);

// CONCATENATED MODULE: ./src/components/chrono/chrono.ngfactory.js
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 





var styles_CoreChronoComponent = [];
var RenderType_CoreChronoComponent = core["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_CoreChronoComponent, data: {} });

function View_CoreChronoComponent_0(_l) { return core["_57" /* ɵvid */](0, [core["_47" /* ɵpid */](0, seconds_to_hms["a" /* CoreSecondsToHMSPipe */], [logger["a" /* CoreLoggerProvider */], utils_text["a" /* CoreTextUtilsProvider */]]), (_l()(), core["_31" /* ɵeld */](1, 0, null, null, 2, "span", [], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](2, null, ["", ""])), core["_49" /* ɵppd */](3, 1)], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = core["_56" /* ɵunv */](_v, 2, 0, _ck(_v, 3, 0, core["_44" /* ɵnov */](_v, 0), (_co.time / 1000))); _ck(_v, 2, 0, currVal_0); }); }
function View_CoreChronoComponent_Host_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "core-chrono", [], null, null, null, View_CoreChronoComponent_0, RenderType_CoreChronoComponent)), core["_30" /* ɵdid */](1, 770048, null, 0, chrono["a" /* CoreChronoComponent */], [core["j" /* ChangeDetectorRef */]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var CoreChronoComponentNgFactory = core["_27" /* ɵccf */]("core-chrono", chrono["a" /* CoreChronoComponent */], View_CoreChronoComponent_Host_0, { running: "running", startTime: "startTime", endTime: "endTime", reset: "reset" }, { onEnd: "onEnd" }, []);

//# sourceMappingURL=chrono.ngfactory.js.map
// EXTERNAL MODULE: ./node_modules/ionic-angular/components/grid/row.js
var row = __webpack_require__(113);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/grid/col.js
var col = __webpack_require__(112);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-header.js
var toolbar_header = __webpack_require__(435);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/view-controller.js
var view_controller = __webpack_require__(36);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/navbar.ngfactory.js
var navbar_ngfactory = __webpack_require__(1354);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/navbar.js
var navbar = __webpack_require__(200);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/app/app.js + 3 modules
var app = __webpack_require__(33);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-controller.js
var nav_controller = __webpack_require__(21);

// EXTERNAL MODULE: ./src/directives/back-button.ts
var back_button = __webpack_require__(663);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/platform.js + 1 modules
var platform = __webpack_require__(14);

// EXTERNAL MODULE: ./src/providers/events.ts
var events = __webpack_require__(12);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-item.js
var toolbar_item = __webpack_require__(436);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar.js
var toolbar = __webpack_require__(247);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.ngfactory.js
var toolbar_title_ngfactory = __webpack_require__(1355);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.js
var toolbar_title = __webpack_require__(337);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.ngfactory.js
var content_ngfactory = __webpack_require__(185);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.js
var content = __webpack_require__(23);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/dom-controller.js
var dom_controller = __webpack_require__(31);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/keyboard.js
var keyboard = __webpack_require__(106);

// EXTERNAL MODULE: ./src/components/loading/loading.ngfactory.js
var loading_ngfactory = __webpack_require__(48);

// EXTERNAL MODULE: ./src/components/loading/loading.ts
var loading = __webpack_require__(47);

// EXTERNAL MODULE: ./src/providers/utils/utils.ts
var utils = __webpack_require__(2);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-footer.js
var toolbar_footer = __webpack_require__(681);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-params.js
var nav_params = __webpack_require__(60);

// CONCATENATED MODULE: ./src/core/emulator/pages/capture-media/capture-media.ngfactory.js
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 







































var styles_CoreEmulatorCaptureMediaPage = [];
var RenderType_CoreEmulatorCaptureMediaPage = core["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_CoreEmulatorCaptureMediaPage, data: {} });

function View_CoreEmulatorCaptureMediaPage_1(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 3, "button", [["ion-button", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.done() !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](1, 1097728, [[8, 4]], 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](2, 0, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], null, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 2, 0, core["_44" /* ɵnov */](_v, 3).transform("core.done")); _ck(_v, 2, 0, currVal_0); }); }
function View_CoreEmulatorCaptureMediaPage_2(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, [[1, 0], ["streamVideo", 1]], null, 0, "video", [["autoplay", ""], ["class", "core-webcam-stream"]], [[8, "hidden", 0]], null, null, null, null))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.hasCaptured; _ck(_v, 0, 0, currVal_0); }); }
function View_CoreEmulatorCaptureMediaPage_3(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, [[2, 0], ["previewVideo", 1]], null, 0, "video", [["class", "core-webcam-video-captured"], ["controls", ""]], [[8, "hidden", 0]], null, null, null, null))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = !_co.hasCaptured; _ck(_v, 0, 0, currVal_0); }); }
function View_CoreEmulatorCaptureMediaPage_4(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, [[3, 0], ["imgCanvas", 1]], null, 0, "canvas", [["class", "core-webcam-image-canvas"]], null, null, null, null, null))], null, null); }
function View_CoreEmulatorCaptureMediaPage_5(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, [[4, 0], ["previewImage", 1]], null, 1, "img", [["class", "core-webcam-image"]], [[8, "hidden", 0], [8, "alt", 0]], null, null, null, null)), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]])], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = !_co.hasCaptured; var currVal_1 = core["_34" /* ɵinlineInterpolate */](1, "", core["_56" /* ɵunv */](_v, 0, 1, core["_44" /* ɵnov */](_v, 1).transform("core.capturedimage")), ""); _ck(_v, 0, 0, currVal_0, currVal_1); }); }
function View_CoreEmulatorCaptureMediaPage_6(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 5, "div", [["class", "core-audio-record-container"]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ɵeld */](2, 0, [[5, 0], ["streamAudio", 1]], null, 0, "canvas", [["class", "core-audio-canvas"]], [[8, "hidden", 0]], null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ɵeld */](4, 0, [[6, 0], ["previewAudio", 1]], null, 0, "audio", [["class", "core-audio-captured"], ["controls", ""]], [[8, "hidden", 0]], null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.hasCaptured; _ck(_v, 2, 0, currVal_0); var currVal_1 = !_co.hasCaptured; _ck(_v, 4, 0, currVal_1); }); }
function View_CoreEmulatorCaptureMediaPage_9(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "ion-icon", [["name", "microphone"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](1, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null)], function (_ck, _v) { var currVal_1 = "microphone"; _ck(_v, 1, 0, currVal_1); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 1)._hidden; _ck(_v, 0, 0, currVal_0); }); }
function View_CoreEmulatorCaptureMediaPage_10(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "ion-icon", [["name", "videocam"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](1, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null)], function (_ck, _v) { var currVal_1 = "videocam"; _ck(_v, 1, 0, currVal_1); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 1)._hidden; _ck(_v, 0, 0, currVal_0); }); }
function View_CoreEmulatorCaptureMediaPage_11(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "ion-icon", [["name", "camera"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](1, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null)], function (_ck, _v) { var currVal_1 = "camera"; _ck(_v, 1, 0, currVal_1); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 1)._hidden; _ck(_v, 0, 0, currVal_0); }); }
function View_CoreEmulatorCaptureMediaPage_12(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "ion-icon", [["name", "square"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](1, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null)], function (_ck, _v) { var currVal_1 = "square"; _ck(_v, 1, 0, currVal_1); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 1)._hidden; _ck(_v, 0, 0, currVal_0); }); }
function View_CoreEmulatorCaptureMediaPage_8(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 14, "button", [["clear", ""], ["icon-only", ""], ["ion-button", ""]], [[1, "aria-label", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.actionClicked() !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](1, 1097728, null, 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { clear: [0, "clear"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_CoreEmulatorCaptureMediaPage_9)), core["_30" /* ɵdid */](4, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_CoreEmulatorCaptureMediaPage_10)), core["_30" /* ɵdid */](7, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_CoreEmulatorCaptureMediaPage_11)), core["_30" /* ɵdid */](10, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                "])), (_l()(), core["_26" /* ɵand */](16777216, null, 0, 1, null, View_CoreEmulatorCaptureMediaPage_12)), core["_30" /* ɵdid */](13, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n            "]))], function (_ck, _v) { var _co = _v.component; var currVal_1 = ""; _ck(_v, 1, 0, currVal_1); var currVal_2 = (!_co.isCapturing && _co.isAudio); _ck(_v, 4, 0, currVal_2); var currVal_3 = (!_co.isCapturing && _co.isVideo); _ck(_v, 7, 0, currVal_3); var currVal_4 = _co.isImage; _ck(_v, 10, 0, currVal_4); var currVal_5 = _co.isCapturing; _ck(_v, 13, 0, currVal_5); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.title; _ck(_v, 0, 0, currVal_0); }); }
function View_CoreEmulatorCaptureMediaPage_13(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 6, "button", [["clear", ""], ["icon-only", ""], ["ion-button", ""]], [[1, "aria-label", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.discard() !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](1, 1097728, null, 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { clear: [0, "clear"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n                "])), (_l()(), core["_31" /* ɵeld */](4, 0, null, 0, 1, "ion-icon", [["name", "trash"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), core["_30" /* ɵdid */](5, 147456, null, 0, icon["a" /* Icon */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { name: [0, "name"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n            "]))], function (_ck, _v) { var currVal_1 = ""; _ck(_v, 1, 0, currVal_1); var currVal_3 = "trash"; _ck(_v, 5, 0, currVal_3); }, function (_ck, _v) { var currVal_0 = core["_56" /* ɵunv */](_v, 0, 0, core["_44" /* ɵnov */](_v, 2).transform("core.discard")); _ck(_v, 0, 0, currVal_0); var currVal_2 = core["_44" /* ɵnov */](_v, 5)._hidden; _ck(_v, 4, 0, currVal_2); }); }
function View_CoreEmulatorCaptureMediaPage_14(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "core-chrono", [], [[8, "hidden", 0]], [[null, "onEnd"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("onEnd" === en)) {
        var pd_0 = (_co.stopCapturing() !== false);
        ad = (pd_0 && ad);
    } return ad; }, View_CoreChronoComponent_0, RenderType_CoreChronoComponent)), core["_30" /* ɵdid */](1, 770048, null, 0, chrono["a" /* CoreChronoComponent */], [core["j" /* ChangeDetectorRef */]], { running: [0, "running"], endTime: [1, "endTime"], reset: [2, "reset"] }, { onEnd: "onEnd" })], function (_ck, _v) { var _co = _v.component; var currVal_1 = _co.isCapturing; var currVal_2 = _co.maxTime; var currVal_3 = _co.resetChrono; _ck(_v, 1, 0, currVal_1, currVal_2, currVal_3); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.hasCaptured; _ck(_v, 0, 0, currVal_0); }); }
function View_CoreEmulatorCaptureMediaPage_7(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 22, "ion-row", [["class", "row"]], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, row["a" /* Row */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 1, "ion-col", [["class", "col"]], null, null, null, null, null)), core["_30" /* ɵdid */](4, 16384, null, 0, col["a" /* Col */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_31" /* ɵeld */](6, 0, null, null, 8, "ion-col", [["class", "col"], ["text-center", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](7, 16384, null, 0, col["a" /* Col */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreEmulatorCaptureMediaPage_8)), core["_30" /* ɵdid */](10, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreEmulatorCaptureMediaPage_13)), core["_30" /* ɵdid */](13, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_31" /* ɵeld */](16, 0, null, null, 5, "ion-col", [["class", "chrono-container col"], ["padding", ""], ["text-end", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](17, 16384, null, 0, col["a" /* Col */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreEmulatorCaptureMediaPage_14)), core["_30" /* ɵdid */](20, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = !_co.hasCaptured; _ck(_v, 10, 0, currVal_0); var currVal_1 = _co.hasCaptured; _ck(_v, 13, 0, currVal_1); var currVal_2 = !_co.isImage; _ck(_v, 20, 0, currVal_2); }, null); }
function View_CoreEmulatorCaptureMediaPage_0(_l) { return core["_57" /* ɵvid */](0, [core["_52" /* ɵqud */](671088640, 1, { streamVideo: 0 }), core["_52" /* ɵqud */](671088640, 2, { previewVideo: 0 }), core["_52" /* ɵqud */](671088640, 3, { imgCanvas: 0 }), core["_52" /* ɵqud */](671088640, 4, { previewImage: 0 }), core["_52" /* ɵqud */](671088640, 5, { streamAudio: 0 }), core["_52" /* ɵqud */](671088640, 6, { previewAudio: 0 }), (_l()(), core["_31" /* ɵeld */](6, 0, null, null, 30, "ion-header", [], null, null, null, null, null)), core["_30" /* ɵdid */](7, 16384, null, 0, toolbar_header["a" /* Header */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, view_controller["a" /* ViewController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_31" /* ɵeld */](9, 0, null, null, 26, "ion-navbar", [["class", "toolbar"], ["core-back-button", ""]], [[8, "hidden", 0], [2, "statusbar-padding", null]], null, null, navbar_ngfactory["b" /* View_Navbar_0 */], navbar_ngfactory["a" /* RenderType_Navbar */])), core["_30" /* ɵdid */](10, 49152, null, 0, navbar["a" /* Navbar */], [app["a" /* App */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), core["_30" /* ɵdid */](11, 212992, null, 0, back_button["a" /* CoreBackButtonDirective */], [navbar["a" /* Navbar */], platform["a" /* Platform */], translate_service["a" /* TranslateService */], events["a" /* CoreEventsProvider */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n        "])), (_l()(), core["_31" /* ɵeld */](13, 0, null, 1, 8, "ion-buttons", [["start", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](14, 16384, null, 1, toolbar_item["a" /* ToolbarItem */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), core["_52" /* ɵqud */](603979776, 7, { _buttons: 1 }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](17, 0, null, null, 3, "button", [["ion-button", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.cancel() !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](18, 1097728, [[7, 4]], 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](19, 0, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n\n        "])), (_l()(), core["_31" /* ɵeld */](23, 0, null, 3, 3, "ion-title", [], null, null, null, toolbar_title_ngfactory["b" /* View_ToolbarTitle_0 */], toolbar_title_ngfactory["a" /* RenderType_ToolbarTitle */])), core["_30" /* ɵdid */](24, 49152, null, 0, toolbar_title["a" /* ToolbarTitle */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), (_l()(), core["_55" /* ɵted */](25, 0, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n\n        "])), (_l()(), core["_31" /* ɵeld */](28, 0, null, 2, 6, "ion-buttons", [["end", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](29, 16384, null, 1, toolbar_item["a" /* ToolbarItem */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), core["_52" /* ɵqud */](603979776, 8, { _buttons: 1 }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreEmulatorCaptureMediaPage_1)), core["_30" /* ɵdid */](33, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_31" /* ɵeld */](38, 0, null, null, 28, "ion-content", [["class", "has-footer"]], [[2, "statusbar-padding", null], [2, "has-refresher", null]], null, null, content_ngfactory["b" /* View_Content_0 */], content_ngfactory["a" /* RenderType_Content */])), core["_30" /* ɵdid */](39, 4374528, null, 0, content["a" /* Content */], [config["a" /* Config */], platform["a" /* Platform */], dom_controller["a" /* DomController */], core["t" /* ElementRef */], core["V" /* Renderer */], app["a" /* App */], keyboard["a" /* Keyboard */], core["M" /* NgZone */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n    "])), (_l()(), core["_31" /* ɵeld */](41, 0, null, 1, 24, "core-loading", [], null, null, null, loading_ngfactory["b" /* View_CoreLoadingComponent_0 */], loading_ngfactory["a" /* RenderType_CoreLoadingComponent */])), core["_30" /* ɵdid */](42, 638976, null, 0, loading["a" /* CoreLoadingComponent */], [translate_service["a" /* TranslateService */], core["t" /* ElementRef */], events["a" /* CoreEventsProvider */], utils["a" /* CoreUtilsProvider */]], { hideUntil: [0, "hideUntil"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_31" /* ɵeld */](44, 0, null, 0, 20, "div", [["class", "core-av-wrapper"]], null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreEmulatorCaptureMediaPage_2)), core["_30" /* ɵdid */](48, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreEmulatorCaptureMediaPage_3)), core["_30" /* ɵdid */](52, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreEmulatorCaptureMediaPage_4)), core["_30" /* ɵdid */](56, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreEmulatorCaptureMediaPage_5)), core["_30" /* ɵdid */](59, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreEmulatorCaptureMediaPage_6)), core["_30" /* ɵdid */](63, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n"])), (_l()(), core["_31" /* ɵeld */](68, 0, null, null, 5, "ion-footer", [], null, null, null, null, null)), core["_30" /* ɵdid */](69, 16384, null, 0, toolbar_footer["a" /* Footer */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, view_controller["a" /* ViewController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_CoreEmulatorCaptureMediaPage_7)), core["_30" /* ɵdid */](72, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n\n"]))], function (_ck, _v) { var _co = _v.component; _ck(_v, 11, 0); var currVal_4 = _co.hasCaptured; _ck(_v, 33, 0, currVal_4); var currVal_7 = _co.readyToCapture; _ck(_v, 42, 0, currVal_7); var currVal_8 = !_co.isAudio; _ck(_v, 48, 0, currVal_8); var currVal_9 = _co.isVideo; _ck(_v, 52, 0, currVal_9); var currVal_10 = _co.isImage; _ck(_v, 56, 0, currVal_10); var currVal_11 = _co.isImage; _ck(_v, 59, 0, currVal_11); var currVal_12 = _co.isAudio; _ck(_v, 63, 0, currVal_12); var currVal_13 = _co.readyToCapture; _ck(_v, 72, 0, currVal_13); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = core["_44" /* ɵnov */](_v, 10)._hidden; var currVal_1 = core["_44" /* ɵnov */](_v, 10)._sbPadding; _ck(_v, 9, 0, currVal_0, currVal_1); var currVal_2 = core["_56" /* ɵunv */](_v, 19, 0, core["_44" /* ɵnov */](_v, 20).transform("core.cancel")); _ck(_v, 19, 0, currVal_2); var currVal_3 = core["_56" /* ɵunv */](_v, 25, 0, core["_44" /* ɵnov */](_v, 26).transform(_co.title)); _ck(_v, 25, 0, currVal_3); var currVal_5 = core["_44" /* ɵnov */](_v, 39).statusbarPadding; var currVal_6 = core["_44" /* ɵnov */](_v, 39)._hasRefresher; _ck(_v, 38, 0, currVal_5, currVal_6); }); }
function View_CoreEmulatorCaptureMediaPage_Host_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "page-core-emulator-capture-media", [], null, null, null, View_CoreEmulatorCaptureMediaPage_0, RenderType_CoreEmulatorCaptureMediaPage)), core["_30" /* ɵdid */](1, 245760, null, 0, capture_media_CoreEmulatorCaptureMediaPage, [view_controller["a" /* ViewController */], nav_params["a" /* NavParams */], dom["a" /* CoreDomUtilsProvider */], time["a" /* CoreTimeUtilsProvider */], file["a" /* CoreFileProvider */], utils_text["a" /* CoreTextUtilsProvider */], core["j" /* ChangeDetectorRef */]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var CoreEmulatorCaptureMediaPageNgFactory = core["_27" /* ɵccf */]("page-core-emulator-capture-media", capture_media_CoreEmulatorCaptureMediaPage, View_CoreEmulatorCaptureMediaPage_Host_0, {}, {}, []);

//# sourceMappingURL=capture-media.ngfactory.js.map
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

// EXTERNAL MODULE: ./src/pipes/pipes.module.ts + 2 modules
var pipes_module = __webpack_require__(105);

// EXTERNAL MODULE: ./node_modules/ionic-angular/util/module-loader.js
var module_loader = __webpack_require__(248);

// CONCATENATED MODULE: ./src/core/emulator/pages/capture-media/capture-media.module.ngfactory.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoreEmulatorCaptureMediaPageModuleNgFactory", function() { return CoreEmulatorCaptureMediaPageModuleNgFactory; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 






























var CoreEmulatorCaptureMediaPageModuleNgFactory = core["_28" /* ɵcmf */](capture_media_module_CoreEmulatorCaptureMediaPageModule, [], function (_l) { return core["_40" /* ɵmod */]([core["_41" /* ɵmpd */](512, core["o" /* ComponentFactoryResolver */], core["_21" /* ɵCodegenComponentFactoryResolver */], [[8, [action_sheet_component_ngfactory["a" /* ActionSheetCmpNgFactory */], alert_component_ngfactory["a" /* AlertCmpNgFactory */], app_root_ngfactory["a" /* IonicAppNgFactory */], loading_component_ngfactory["a" /* LoadingCmpNgFactory */], modal_component_ngfactory["a" /* ModalCmpNgFactory */], picker_component_ngfactory["a" /* PickerCmpNgFactory */], popover_component_ngfactory["a" /* PopoverCmpNgFactory */], select_popover_component_ngfactory["a" /* SelectPopoverNgFactory */], toast_component_ngfactory["a" /* ToastCmpNgFactory */], context_menu_popover_ngfactory["a" /* CoreContextMenuPopoverComponentNgFactory */], course_picker_menu_popover_ngfactory["a" /* CoreCoursePickerMenuPopoverComponentNgFactory */], recaptchamodal_ngfactory["a" /* CoreRecaptchaModalComponentNgFactory */], CoreEmulatorCaptureMediaPageNgFactory]], [3, core["o" /* ComponentFactoryResolver */]], core["K" /* NgModuleRef */]]), core["_41" /* ɵmpd */](4608, common["m" /* NgLocalization */], common["l" /* NgLocaleLocalization */], [core["G" /* LOCALE_ID */], [2, common["v" /* ɵa */]]]), core["_41" /* ɵmpd */](4608, esm5_forms["x" /* ɵi */], esm5_forms["x" /* ɵi */], []), core["_41" /* ɵmpd */](4608, esm5_forms["d" /* FormBuilder */], esm5_forms["d" /* FormBuilder */], []), core["_41" /* ɵmpd */](4608, translate_loader["b" /* TranslateLoader */], translate_loader["a" /* TranslateFakeLoader */], []), core["_41" /* ɵmpd */](4608, translate_compiler["a" /* TranslateCompiler */], translate_compiler["b" /* TranslateFakeCompiler */], []), core["_41" /* ɵmpd */](4608, translate_parser["b" /* TranslateParser */], translate_parser["a" /* TranslateDefaultParser */], []), core["_41" /* ɵmpd */](4608, missing_translation_handler["b" /* MissingTranslationHandler */], missing_translation_handler["a" /* FakeMissingTranslationHandler */], []), core["_41" /* ɵmpd */](4608, translate_service["a" /* TranslateService */], translate_service["a" /* TranslateService */], [translate_store["a" /* TranslateStore */], translate_loader["b" /* TranslateLoader */], translate_compiler["a" /* TranslateCompiler */], translate_parser["b" /* TranslateParser */], missing_translation_handler["b" /* MissingTranslationHandler */], translate_service["b" /* USE_DEFAULT_LANG */], translate_service["c" /* USE_STORE */]]), core["_41" /* ɵmpd */](512, common["b" /* CommonModule */], common["b" /* CommonModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["v" /* ɵba */], esm5_forms["v" /* ɵba */], []), core["_41" /* ɵmpd */](512, esm5_forms["i" /* FormsModule */], esm5_forms["i" /* FormsModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["s" /* ReactiveFormsModule */], esm5_forms["s" /* ReactiveFormsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["a" /* IonicModule */], ionic_angular_module["a" /* IonicModule */], []), core["_41" /* ɵmpd */](512, _ngx_translate_core["b" /* TranslateModule */], _ngx_translate_core["b" /* TranslateModule */], []), core["_41" /* ɵmpd */](512, directives_module["a" /* CoreDirectivesModule */], directives_module["a" /* CoreDirectivesModule */], []), core["_41" /* ɵmpd */](512, pipes_module["a" /* CorePipesModule */], pipes_module["a" /* CorePipesModule */], []), core["_41" /* ɵmpd */](512, components_module["a" /* CoreComponentsModule */], components_module["a" /* CoreComponentsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["b" /* IonicPageModule */], ionic_angular_module["b" /* IonicPageModule */], []), core["_41" /* ɵmpd */](512, capture_media_module_CoreEmulatorCaptureMediaPageModule, capture_media_module_CoreEmulatorCaptureMediaPageModule, []), core["_41" /* ɵmpd */](256, translate_service["c" /* USE_STORE */], undefined, []), core["_41" /* ɵmpd */](256, translate_service["b" /* USE_DEFAULT_LANG */], undefined, []), core["_41" /* ɵmpd */](256, module_loader["a" /* LAZY_LOADED_TOKEN */], capture_media_CoreEmulatorCaptureMediaPage, [])]); });

//# sourceMappingURL=capture-media.module.ngfactory.js.map

/***/ })

});
//# sourceMappingURL=56.js.map