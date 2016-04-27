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

angular.module('mm.core.login')

/**
 * Controller to handle the input of a site URL and its validation.
 *
 * @module mm.core.login
 * @ngdoc controller
 * @name mmLoginSiteCtrl
 */
.controller('mmLoginSiteCtrl', function($scope, $state, $mmSitesManager, $mmUtil, $translate, $ionicHistory, $mmApp,
        $ionicModal, $mmLoginHelper) {

    $scope.siteurl = '';

    $scope.connect = function(url) {

        $mmApp.closeKeyboard();

        if (!url) {
            $mmUtil.showErrorModal('mm.login.siteurlrequired', true);
            return;
        }

        var modal = $mmUtil.showModalLoading(),
            sitedata = $mmSitesManager.getDemoSiteData(url);

        if (sitedata) {
            // It's a demo site.
            $mmSitesManager.getUserToken(sitedata.url, sitedata.username, sitedata.password).then(function(data) {
                $mmSitesManager.newSite(data.siteurl, data.token).then(function() {
                    $ionicHistory.nextViewOptions({disableBack: true});
                    return $mmLoginHelper.goToSiteInitialPage();
                }, function(error) {
                    $mmUtil.showErrorModal(error);
                }).finally(function() {
                    modal.dismiss();
                });
            }, function(error) {
                modal.dismiss();
                $mmUtil.showErrorModal(error);
            });

        } else {
            // Not a demo site.
            $mmSitesManager.checkSite(url).then(function(result) {

                if (result.warning) {
                    $mmUtil.showErrorModal(result.warning, true, 4000);
                }

                if ($mmLoginHelper.isSSOLoginNeeded(result.code)) {
                    // SSO. User needs to authenticate in a browser.
                    $mmUtil.showConfirm($translate('mm.login.logininsiterequired')).then(function() {
                        $mmLoginHelper.openBrowserForSSOLogin(result.siteurl);
                    });
                } else {
                    $state.go('mm_login.credentials', {siteurl: result.siteurl});
                }

            }, function(error) {
                $mmUtil.showErrorModal(error);
            }).finally(function() {
                modal.dismiss();
            });
        }
    };

    // Get docs URL for help modal.
    $mmUtil.getDocsUrl().then(function(docsurl) {
        $scope.docsurl = docsurl;
    });

    // Setup help modal.
    $ionicModal.fromTemplateUrl('core/components/login/templates/help-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(helpModal) {
        $scope.showHelp = function() {
            helpModal.show();
        };
        $scope.closeHelp = function() {
            helpModal.hide();
        };
        $scope.$on('$destroy', function() {
            helpModal.remove();
        });
    });

});
