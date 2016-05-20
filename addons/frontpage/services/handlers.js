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

angular.module('mm.addons.frontpage')

/**
 * Front page handlers factory.
 *
 * This factory holds the different handlers used for delegates.
 *
 * @module mm.addons.frontpage
 * @ngdoc service
 * @name $mmaFrontPageHandlers
 */
.factory('$mmaFrontPageHandlers', function($log, $mmaFrontpage) {
    $log = $log.getInstance('$mmaFrontPageHandlers');

    var self = {};

    /**
     * Side menu nav handler.
     *
     * @module mm.addons.frontpage
     * @ngdoc method
     * @name $mmaFrontPageHandlers#sideMenuNav
     */
    self.sideMenuNav = function() {

        var self = {};

        /**
         * Check if handler is enabled.
         *
         * @return {Promise|Boolean} If handler is enabled returns a resolved promise. If it's not it can return a
         *                           rejected promise or false.
         */
        self.isEnabled = function() {
            if ($mmaFrontpage.isPluginEnabled()) {
                return $mmaFrontpage.isFrontpageAvailable().then(function() {
                    return true;
                });
            }
            return false;
        };

        /**
         * Get the controller.
         *
         * @return {Object} Controller.
         */
        self.getController = function() {

            /**
             * Side menu nav handler controller.
             *
             * @module mm.addons.frontpage
             * @ngdoc controller
             * @name $mmaFrontPageHandlers#sideMenuNav:controller
             */
            return function($scope) {
                $scope.icon = 'ion-home';
                $scope.title = 'mma.frontpage.sitehome';
                $scope.state = 'site.mm_course-section';
                $scope.class = 'mma-frontpage-handler';
            };
        };

        return self;
    };

    return self;
});
