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

angular.module('mm.addons.notifications')

/**
 * Notification action directive.
 *
 * @module mm.addons.notifications
 * @ngdoc directive
 * @name mmaNotificationsActions
 */
.directive('mmaNotificationsActions', function($log, $mmContentLinksDelegate) {
    $log = $log.getInstance('mmaNotificationsActions');

    // Directive link function.
    function link(scope) {
        if (scope.contexturl) {
            $mmContentLinksDelegate.getActionsFor(scope.contexturl, scope.courseid).then(function(actions) {
                scope.actions = actions;
            });
        }
    }

    return {
        link: link,
        restrict: 'E',
        scope: {
            contexturl: '=',
            courseid: '='
        },
        templateUrl: 'addons/notifications/templates/actions.html',
    };
});
