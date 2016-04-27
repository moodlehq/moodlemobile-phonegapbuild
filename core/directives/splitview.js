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

.constant('mmCoreSplitViewLoad', 'mmSplitView:load')

/**
 * Directive to create a split view layout. This directive should be used along with mm-split-view-link.
 *
 * IMPORTANT: Due to a limitation in Angular ui-router, the left pane state and the right pane state should NOT have
 * parameters with the same name but different value. It can cause unexpected behaviors.
 * Example: if the left pane loads a state with param 'courseid', then all the states that can be loaded in the right pane
 * should avoid having a parameter named 'courseid'. The right pane state can have a 'courseid' param only if it will always
 * have the same value than in left pane state.
 *
 * @module mm.core
 * @ngdoc directive
 * @name mmSplitView
 * @description
 * Usage:
 * <mm-split-view component="mmaCalendarEventsList">
 *     <!-- CONTENT TO SHOW ON THE LEFT PANEL (MENU) -->
 * </mm-split-view>
 *
 * To change the right pane contents (content pane), mmSplitViewLink directive is needed.
 * mmSplitView will automatically try to load a mmSplitViewLink when the view is loaded. This can be configured using
 * the attributes "load" and "loadWhen".
 *
 * If you don't have access to the directive's scope but you still want to configure when should the data be loaded and which
 * element should it load you can use the mmCoreSplitViewLoad event. When the directive receives this event it will try to
 * immediately load the link set (if no link is set it will load the first link found). Example:
 * $rootScope.$broadcast(mmCoreSplitViewLoad, {load: 2});
 *
 * IMPORTANT: Due to a limitation in Angular ui-router, the left pane state and the right pane state should NOT have
 * parameters with the same name but different value. It can cause unexpected behaviors.
 * Example: if the left pane loads a state with param 'courseid', then all the states that can be loaded in the right pane
 * should avoid having a parameter named 'courseid'. The right pane state can have a 'courseid' param only if it will always
 * have the same value than in left pane state.
 *
 * Accepts the following params:
 *
 * @param {String} [menuWidth] Width of the left menu. Can be specified in pixels ('200px') or in percentage ('30%').
 *
 * @param {String} [loadWhen]  Name of a scope variable. When that variable is set to true, a mm-split-view-link will be loaded in
 *                             in the contents pane. If not set, try to load it right at the start. See "load" param.
 *
 * @param {String} component   Component. In tablet, the new view will be named after the component.
 *
 * @param {Number} [load] Link to load. If not set then the first link will be loaded by default. If it's set then it will
 *                        try to load the nth link. E.g. load=2 will load the second link in the page.
 */
.directive('mmSplitView', function($log, $state, $ionicPlatform, $timeout, $mmUtil, $interpolate, mmCoreSplitViewLoad) {

    $log = $log.getInstance('mmSplitView');

    /**
     * Trigger click on a DOM element.
     *
     * @param  {Object} link DOM element to trigger click.
     * @return {Boolean}     True if success, false otherwise.
     */
    function triggerClick(link) {
        if (link && link.length && link.triggerHandler) {
            link.triggerHandler('click');
            return true;
        }
        return false;
    }

    // Directive controller.
    function controller() {
        var self = this,
            element,
            menuState,
            linkToLoad,
            component;

        /**
         * Clears links marked as selected.
         */
        this.clearMarkedLinks = function() {
            angular.element(element.querySelectorAll('[mm-split-view-link]')).removeClass('mm-split-item-selected');
        };

        /**
         * Get component.
         *
         * @return {String} Component.
         */
        this.getComponent = function() {
            return component;
        };

        /**
         * Get split view menu's state name (left pane).
         *
         * @return {String} Menu state name.
         */
        this.getMenuState = function() {
            return menuState || $state.current.name;
        };

        /**
         * Load a mm-split-view-link.
         *
         * @param {Object} [scope]           Directive's scope.
         * @param {String|Number} [loadAttr] Number of link to load.
         * @param {Boolean} retrying         True if we're retrying because the function failed (link wasn't ready).
         */
        this.loadLink = function(scope, loadAttr, retrying) {
            if ($ionicPlatform.isTablet()) {
                if (!linkToLoad) {
                    // No link set. Let's determine if loadAttr is set and its real value.
                    if (typeof loadAttr != 'undefined') {
                        var position = parseInt(loadAttr);
                        if (!position) {
                            // Seems it's not a number. Try to interpolate it.
                            position = parseInt($interpolate(loadAttr)(scope), 10); // "Evaluate" scope variables.
                        }
                        if (position) {
                            var links = element.querySelectorAll('[mm-split-view-link]');
                            position = position > links.length ? 0 : position - 1;
                            linkToLoad = angular.element(links[position]);
                        } else {
                            // Load first link
                            linkToLoad = angular.element(element.querySelector('[mm-split-view-link]'));
                        }
                    } else {
                        // Load first link
                        linkToLoad = angular.element(element.querySelector('[mm-split-view-link]'));
                    }
                }

                if (!triggerClick(linkToLoad)) {
                    // Link not found. Let's retry once in the next digest.
                    if (!retrying) {
                        linkToLoad = undefined;
                        $timeout(function() {
                            self.loadLink(scope, loadAttr, true);
                        });
                    }
                }
            }
        };

        /**
         * Set component.
         *
         * @param {String} cmp Component.
         */
        this.setComponent = function(cmp) {
            component = cmp;
        };

        /**
         * Set directive's DOM element.
         *
         * @param {Object} el Directive's DOM element.
         */
        this.setElement = function(el) {
            element = el;
        };

        /**
         * Set mm-split-view-link to load. Used to re-load last state if needed.
         *
         * @param {Object} link Link to set (DOM element).
         */
        this.setLink = function(link) {
            linkToLoad = link;
        };

        /**
         * Set split view menu's state name (left pane).
         *
         * @param {String} state State name to set.
         */
        this.setMenuState = function(state) {
            menuState = state;
        };
    }

    return {
        restrict: 'E',
        templateUrl: 'core/templates/splitview.html',
        transclude: true,
        controller: controller,
        link: function(scope, element, attrs, controller) {
            var el = element[0],
                menu = angular.element(el.querySelector('.mm-split-pane-menu')),
                menuState = $state.$current.name,
                menuParams = $state.params,
                menuWidth = attrs.menuWidth,
                component = attrs.component || 'tablet';

            scope.component = component;

            controller.setComponent(component);
            controller.setElement(el);
            controller.setMenuState(menuState);

            if (menuWidth && $ionicPlatform.isTablet()) {
                menu.css('width', menuWidth);
                menu.css('-webkit-flex-basis', menuWidth);
                menu.css('-moz-flex-basis', menuWidth);
                menu.css('-ms-flex-basis', menuWidth);
                menu.css('flex-basis', menuWidth);
            }

            // We'll set all the listeners even if it's not a tablet, to support change between tablet-smartphone mode.

            if (attrs.loadWhen) {
                // Load link when variable is set to true.
                scope.$watch(attrs.loadWhen, function(newValue) {
                    if (newValue) {
                        controller.loadLink(scope, attrs.load);
                    }
                });
            } else {
                controller.loadLink(scope, attrs.load);
            }

            // Load last opened link when we re-enter the same state. We use $stateChangeSuccess instead of $ionicView.enter
            // because $ionicView.enter is not triggered when going to the same state.
            scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
                // Compare that name and params are similar. We'll only compare 1st level of params, it's not a deep compare.
                if (toState.name === menuState && $mmUtil.basicLeftCompare(toParams, menuParams, 1)) {
                    controller.loadLink(); // No need to pass scope and load, link should be set.
                }
            });

            // Listen for event to load link.
            scope.$on(mmCoreSplitViewLoad, function(e, data) {
                if (data && data.load) {
                    controller.loadLink(scope, data.load);
                } else {
                    controller.loadLink(scope, attrs.load);
                }
            });
        }
    };
});
