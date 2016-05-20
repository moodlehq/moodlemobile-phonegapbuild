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

angular.module('mm.addons.mod_scorm', ['mm.core'])

.constant('mmaModScormComponent', 'mmaModScorm')
.constant('mmaModScormEventLaunchNextSco', 'mma_mod_scorm_launch_next_sco')
.constant('mmaModScormEventLaunchPrevSco', 'mma_mod_scorm_launch_prev_sco')
.constant('mmaModScormEventUpdateToc', 'mma_mod_scorm_update_toc')
.constant('mmaModScormEventGoOffline', 'mma_mod_scorm_go_offline')
.constant('mmaModScormEventAutomSynced', 'mma_mod_scorm_autom_synced')
.constant('mmaModScormSyncTime', 300000) // In milliseconds.

.config(function($stateProvider) {

    $stateProvider

    .state('site.mod_scorm', {
      url: '/mod_scorm',
      params: {
        module: null,
        courseid: null
      },
      views: {
        'site': {
          controller: 'mmaModScormIndexCtrl',
          templateUrl: 'addons/mod/scorm/templates/index.html'
        }
      }
    })

    .state('site.mod_scorm-player', {
      url: '/mod_scorm-player',
      params: {
        scorm: null,
        mode: null,
        newAttempt: false,
        organizationId: null,
        scoId: null
      },
      views: {
        'site': {
          controller: 'mmaModScormPlayerCtrl',
          templateUrl: 'addons/mod/scorm/templates/player.html'
        }
      }
    });

})

.config(function($mmCourseDelegateProvider, $mmCoursePrefetchDelegateProvider, $mmContentLinksDelegateProvider) {
    $mmCourseDelegateProvider.registerContentHandler('mmaModScorm', 'scorm', '$mmaModScormHandlers.courseContent');
    $mmCoursePrefetchDelegateProvider.registerPrefetchHandler('mmaModScorm', 'scorm', '$mmaModScormPrefetchHandler');
    $mmContentLinksDelegateProvider.registerLinkHandler('mmaModScorm', '$mmaModScormHandlers.linksHandler');
})

.run(function($timeout, $mmaModScormSync, $mmApp, $mmEvents, $mmSite, mmCoreEventLogin) {
    var lastExecution = 0,
        executing = false,
        allSitesCalled = false;

    function syncScorms(allSites) {
        var now = new Date().getTime();

        if (!allSites && !$mmSite.isLoggedIn()) {
            return;
        }

        // Prevent consecutive and simultaneous executions. A sync process shouldn't take more than a few minutes,
        // so if it's been more than 5 minutes since the last execution we'll ignore the executing value.
        if (now - 5000 > lastExecution && (!executing || now - 300000 > lastExecution)) {
            lastExecution = new Date().getTime();
            executing = true;

            $timeout(function() { // Minor delay just to make sure network is fully established.
                $mmaModScormSync.syncAllScorms(allSites ? undefined : $mmSite.getId()).finally(function() {
                    executing = false;
                });
            }, 1000);
        }
    }

    $mmApp.ready().then(function() {
        document.addEventListener('online', function() {
            syncScorms(false);
        }, false); // Cordova event.
        window.addEventListener('online', function() {
            syncScorms(false);
        }, false); // HTML5 event.

        if (!$mmSite.isLoggedIn()) {
            // App was started without any site logged in. Try to sync all sites.
            allSitesCalled = true;
            if ($mmApp.isOnline()) {
                syncScorms(true);
            }
        }
    });

    $mmEvents.on(mmCoreEventLogin, function() {
        var allSites = false;
        if (!allSitesCalled) {
            // App started with a site logged in. Try to sync all sites.
            allSitesCalled = true;
            allSites = true;
        }

        if ($mmApp.isOnline()) {
            syncScorms(allSites);
        }
    });

});
