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

angular.module('mm.core')

/**
 * Directive to auto focus an element when a view is loaded.
 *
 * @module mm.core
 * @ngdoc directive
 * @name mmAutoFocus
 */
.directive('mmAutoFocus', function($mmApp) {
    return {
        restrict: 'A',
        link: function(scope, el) {
            // Wait for transition to finish before auto-focus.
            var unregister = scope.$watch(function() {
                return ionic.transition.isActive;
            }, function(isActive) {
                if (!isActive) {
                    el[0].focus();
                    unregister(); // Stop watching.
                    if (ionic.Platform.isAndroid()) {
                        // On some Android versions the keyboard doesn't open automatically.
                        $mmApp.openKeyboard();
                    }
                }
            });
        }
    };
});
