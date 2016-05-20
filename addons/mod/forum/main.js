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

angular.module('mm.addons.mod_forum', [])

.constant('mmaModForumDiscPerPage', 10) // Max of discussions per page.
.constant('mmaModForumComponent', 'mmaModForum')
.constant('mmaModForumNewDiscussionEvent', 'mma-mod_forum_new_discussion')

.config(function($stateProvider) {

    $stateProvider

    .state('site.mod_forum', {
        url: '/mod_forum',
        params: {
            module: null,
            courseid: null
        },
        views: {
            'site': {
                controller: 'mmaModForumDiscussionsCtrl',
                templateUrl: 'addons/mod/forum/templates/discussions.html'
            }
        }
    })

    .state('site.mod_forum-discussion', {
        url: '/mod_forum-discussion',
        params: {
            discussionid: null,
            cid: null // Not naming it courseid because it collides with 'site.mod_forum' param in split-view.
        },
        views: {
            'site': {
                controller: 'mmaModForumDiscussionCtrl',
                templateUrl: 'addons/mod/forum/templates/discussion.html'
            }
        }
    })

    .state('site.mod_forum-newdiscussion', {
        url: '/mod_forum-newdiscussion',
        params: {
            cid: null, // Not naming it courseid because it collides with 'site.mod_forum' param in split-view.
            forumid: null,
            cmid: null
        },
        views: {
            'site': {
                controller: 'mmaModForumNewDiscussionCtrl',
                templateUrl: 'addons/mod/forum/templates/newdiscussion.html'
            }
        }
    });

})

.config(function($mmCourseDelegateProvider, $mmContentLinksDelegateProvider) {
    $mmCourseDelegateProvider.registerContentHandler('mmaModForum', 'forum', '$mmaModForumHandlers.courseContent');
    $mmContentLinksDelegateProvider.registerLinkHandler('mmaModForum', '$mmaModForumHandlers.linksHandler');
});
