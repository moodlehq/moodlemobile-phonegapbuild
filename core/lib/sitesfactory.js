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

.value('mmCoreWSPrefix', 'local_mobile_')

.constant('mmCoreWSCacheStore', 'wscache')

.config(function($mmSitesFactoryProvider, mmCoreWSCacheStore) {
    var stores = [
        {
            name: mmCoreWSCacheStore,
            keyPath: 'id',
            indexes: [
                {
                    name: 'key'
                }
            ]
        }
    ];
    $mmSitesFactoryProvider.registerStores(stores);
})

/**
 * Provider to create sites instances.
 *
 * @module mm.core
 * @ngdoc provider
 * @name $mmSitesFactory
 * @description
 * This provider is the interface with the DB database. The modules that need to store
 * information here need to register their stores.
 *
 * Example:
 *
 * .config(function($mmSitesFactoryProvider) {
 *      $mmSitesFactoryProvider.registerStore({
 *          name: 'courses',
 *          keyPath: 'id'
 *      });
 *  })
 *
 * The service $mmSitesFactory is used to create site instances. It's not intended to be used directly, its usage is
 * restricted to core. Developers should only use $mmSitesFactoryProvider, $mmSitesManager and $mmSite.
 */
.provider('$mmSitesFactory', function() {

    /** Define the site storage schema. */
    var siteSchema = {
            stores: []
        },
        dboptions = {
            autoSchema: true
        };

    /**
     * Register a store schema.
     * IMPORTANT: Modifying the schema of an already existing store deletes all its data in WebSQL Storage.
     * If a store schema needs to be modified, the data should be manually migrated to the new store.
     *
     * @param  {Object} store The store object definition.
     * @return {Void}
     */
    this.registerStore = function(store) {
        if (typeof(store.name) === 'undefined') {
            console.log('$mmSite: Error: store name is undefined.');
            return;
        } else if (storeExists(store.name)) {
            console.log('$mmSite: Error: store ' + store.name + ' is already defined.');
            return;
        }
        siteSchema.stores.push(store);
    };

    /**
     * Register multiple stores at once.
     * IMPORTANT: Modifying the schema of an already existing store deletes all its data in WebSQL Storage.
     * If a store schema needs to be modified, the data should be manually migrated to the new store.
     *
     * @param  {Array} stores Array of store objects.
     * @return {Void}
     */
    this.registerStores = function(stores) {
        var self = this;
        angular.forEach(stores, function(store) {
            self.registerStore(store);
        });
    };

    /**
     * Check if a store is already defined.
     *
     * @param  {String} name The name of the store.
     * @return {Boolean} True when the store was already defined.
     */
    function storeExists(name) {
        var exists = false;
        angular.forEach(siteSchema.stores, function(store) {
            if (store.name === name) {
                exists = true;
            }
        });
        return exists;
    }

    this.$get = function($http, $q, $mmWS, $mmDB, $log, md5, $mmApp, $mmLang, $mmUtil, $mmFS, mmCoreWSCacheStore,
            mmCoreWSPrefix, mmCoreSessionExpired, $mmEvents, mmCoreEventSessionExpired, mmCoreUserDeleted, mmCoreEventUserDeleted,
            $mmText, mmCoreConfigConstants) {

        $log = $log.getInstance('$mmSite');

        /**
         * List of deprecated WS functions with their corresponding NOT deprecated name.
         *
         * When the function does not have an equivalent set its value to true.
         *
         * @type {Object}
         */
        var deprecatedFunctions = {
            "core_grade_get_definitions": "core_grading_get_definitions",
            "moodle_course_create_courses": "core_course_create_courses",
            "moodle_course_get_courses": "core_course_get_courses",
            "moodle_enrol_get_users_courses": "core_enrol_get_users_courses",
            "moodle_file_get_files": "core_files_get_files",
            "moodle_file_upload": "core_files_upload",
            "moodle_group_add_groupmembers": "core_group_add_group_members",
            "moodle_group_create_groups": "core_group_create_groups",
            "moodle_group_delete_groupmembers": "core_group_delete_group_members",
            "moodle_group_delete_groups": "core_group_delete_groups",
            "moodle_group_get_course_groups": "core_group_get_course_groups",
            "moodle_group_get_groupmembers": "core_group_get_group_members",
            "moodle_group_get_groups": "core_group_get_groups",
            "moodle_message_send_instantmessages": "core_message_send_instant_messages",
            "moodle_notes_create_notes": "core_notes_create_notes",
            "moodle_role_assign": "core_role_assign_role",
            "moodle_role_unassign": "core_role_unassign_role",
            "moodle_user_create_users": "core_user_create_users",
            "moodle_user_delete_users": "core_user_delete_users",
            "moodle_user_get_course_participants_by_id": "core_user_get_course_user_profiles",
            "moodle_user_get_users_by_courseid": "core_enrol_get_enrolled_users",
            // Both *_user_get_users_by_id are deprecated, but there is no equivalent available in the Mobile service.
            "moodle_user_get_users_by_id": "core_user_get_users_by_id",
            "moodle_user_update_users": "core_user_update_users",
            "moodle_webservice_get_siteinfo": "core_webservice_get_site_info",
        };

        var self = {};

        /**
         * Site object to store site data.
         *
         * @param {String} id      Site ID.
         * @param {String} siteurl Site URL.
         * @param {String} token   User's token in the site.
         * @param {Object} infos   Site's info.
         */
        function Site(id, siteurl, token, infos) {
            this.id = id;
            this.siteurl = siteurl;
            this.token = token;
            this.infos = infos;

            if (this.id) {
                this.db = $mmDB.getDB('Site-' + this.id, siteSchema, dboptions);
            }
        }

        /**
         * Get site ID.
         *
         * @return {String} Current site ID.
         */
        Site.prototype.getId = function() {
            return this.id;
        };

        /**
         * Get site URL.
         *
         * @return {String} Current site URL.
         */
        Site.prototype.getURL = function() {
            return this.siteurl;
        };

        /**
         * Get site token.
         *
         * @return {String} Current site token.
         */
        Site.prototype.getToken = function() {
            return this.token;
        };

        /**
         * Get site info.
         *
         * @return {Object} Current site info.
         */
        Site.prototype.getInfo = function() {
            return this.infos;
        };

        /**
         * Get site DB.
         *
         * @return {Object} Current site DB.
         */
        Site.prototype.getDb = function() {
            return this.db;
        };

        /**
         * Get site user's ID.
         *
         * @return {Object} User's ID.
         */
        Site.prototype.getUserId = function() {
            if (typeof this.infos != 'undefined' && typeof this.infos.userid != 'undefined') {
                return this.infos.userid;
            } else {
                return undefined;
            }
        };

        /**
         * Set site ID.
         *
         * @param {String} New ID.
         */
        Site.prototype.setId = function(id) {
            this.id = id;
            this.db = $mmDB.getDB('Site-' + this.id, siteSchema, dboptions);
        };

        /**
         * Set site token.
         *
         * @param {String} New token.
         */
        Site.prototype.setToken = function(token) {
            this.token = token;
        };

        /**
         * Set site info.
         *
         * @param {Object} New info.
         */
        Site.prototype.setInfo = function(infos) {
            this.infos = infos;
        };

        /**
         * Can the user access their private files?
         *
         * @return {Boolean} False when they cannot.
         */
        Site.prototype.canAccessMyFiles = function() {
            var infos = this.getInfo();
            return infos && (typeof infos.usercanmanageownfiles === 'undefined' || infos.usercanmanageownfiles);
        };

        /**
         * Can the user download files?
         *
         * @return {Boolean} False when they cannot.
         */
        Site.prototype.canDownloadFiles = function() {
            var infos = this.getInfo();
            return infos && infos.downloadfiles;
        };

        /**
         * Can the user use an advanced feature?
         *
         * @param {String} feature The name of the feature.
         * @param {Boolean} [whenUndefined=true] The value to return when the parameter is undefined
         * @return {Boolean} False when they cannot.
         */
        Site.prototype.canUseAdvancedFeature = function(feature, whenUndefined) {
            var infos = this.getInfo(),
                canUse = true;

            whenUndefined = (typeof whenUndefined === 'undefined') ? true : whenUndefined;

            if (typeof infos.advancedfeatures === 'undefined') {
                canUse = whenUndefined;
            } else {

                angular.forEach(infos.advancedfeatures, function(item) {
                    if (item.name === feature && parseInt(item.value, 10) === 0) {
                        canUse = false;
                    }
                });

            }

            return canUse;
        };

        /**
         * Can the user upload files?
         *
         * @return {Boolean} False when they cannot.
         */
        Site.prototype.canUploadFiles = function() {
            var infos = this.getInfo();
            return infos && infos.uploadfiles;
        };

        /**
         * Fetch site info from the Moodle site.
         *
         * @return {Promise} A promise to be resolved when the site info is retrieved.
         */
        Site.prototype.fetchSiteInfo = function() {
            var deferred = $q.defer(),
                site = this;

            // get_site_info won't be cached.
            var preSets = {
                getFromCache: 0,
                saveToCache: 0
            };

            site.read('core_webservice_get_site_info', {}, preSets).then(deferred.resolve, function(error) {
                site.read('moodle_webservice_get_siteinfo', {}, preSets).then(deferred.resolve, function(error) {
                    deferred.reject(error);
                });
            });

            return deferred.promise;
        };

        /**
         * Read some data from the Moodle site using WS. Requests are cached by default.
         *
         * @param  {String} read  WS method to use.
         * @param  {Object} data    Data to send to the WS.
         * @param  {Object} preSets Options: @see Site#request.
         * @return {Promise}        Promise to be resolved when the request is finished.
         */
        Site.prototype.read = function(method, data, preSets) {
            preSets = preSets || {};
            if (typeof(preSets.getFromCache) === 'undefined') {
                preSets.getFromCache = 1;
            }
            if (typeof(preSets.saveToCache) === 'undefined') {
                preSets.saveToCache = 1;
            }
            if (typeof(preSets.sync) === 'undefined') {
                preSets.sync = 0;
            }
            return this.request(method, data, preSets);
        };

        /**
         * Sends some data to the Moodle site using WS. Requests are NOT cached by default.
         *
         * @param  {String} method  WS method to use.
         * @param  {Object} data    Data to send to the WS.
         * @param  {Object} preSets Options: @see Site#request.
         * @return {Promise}        Promise to be resolved when the request is finished.
         */
        Site.prototype.write = function(method, data, preSets) {
            preSets = preSets || {};
            if (typeof(preSets.getFromCache) === 'undefined') {
                preSets.getFromCache = 0;
            }
            if (typeof(preSets.saveToCache) === 'undefined') {
                preSets.saveToCache = 0;
            }
            if (typeof(preSets.sync) === 'undefined') {
                preSets.sync = 0;
            }
            return this.request(method, data, preSets);
        };

        /**
         * WS request to the site.
         *
         * @param {string} method The WebService method to be called.
         * @param {Object} data Arguments to pass to the method.
         * @param {Object} preSets Extra settings.
         *                    - getFromCache boolean (false) Use the cache when possible.
         *                    - saveToCache boolean (false) Save the call results to the cache.
         *                    - omitExpires boolean (false) Ignore cache expiry.
         *                    - emergencyCache boolean (true) If possible, use the cache when the request fails.
         *                    - sync boolean (false) Add call to queue if device is not connected.
         *                    - cacheKey (string) Extra key to add to the cache when storing this call. This key is to
         *                                        flag the cache entry, it doesn't affect the data retrieved in this call.
         *                    - getCacheUsingCacheKey (boolean) True if it should retrieve cached data by cacheKey,
         *                                        false if it should get the data based on the params passed (usual behavior).
         * @return {Promise}
         * @description
         *
         * Sends a webservice request to the site. This method will automatically add the
         * required parameters and pass it on to the low level API in $mmWS.call().
         *
         * Caching is also implemented, when enabled this method will returned a cached
         * version of itself rather than contacting the server.
         *
         * This method is smart which means that it will try to map the method to a
         * compatibility one if need be, usually that means that it will fallback on
         * the 'local_mobile_' prefixed function if it is available and the non-prefixed is not.
         */
        Site.prototype.request = function(method, data, preSets) {
            var deferred = $q.defer(),
                site = this;
            data = data || {};

            // Get the method to use based on the available ones.
            method = site.getCompatibleFunction(method);

            // Check if the method is available, use a prefixed version if possible.
            // We ignore this check when we do not have the site info, as the list of functions is not loaded yet.
            if (site.getInfo() && !site.wsAvailable(method, false)) {
                if (site.wsAvailable(mmCoreWSPrefix + method, false)) {
                    $log.info("Using compatibility WS method '" + mmCoreWSPrefix + method + "'");
                    method = mmCoreWSPrefix + method;
                } else {
                    $log.error("WS function '" + method + "' is not available, even in compatibility mode.");
                    $mmLang.translateAndRejectDeferred(deferred, 'mm.core.wsfunctionnotavailable');
                    return deferred.promise;
                }
            }

            preSets = angular.copy(preSets) || {};
            preSets.wstoken = site.token;
            preSets.siteurl = site.siteurl;

            // Enable text filtering.
            data.moodlewssettingfilter = true;

            getFromCache(site, method, data, preSets).then(function(data) {
                deferred.resolve(data);
            }, function() {
                // Do not pass those options to the core WS factory.
                var wsPreSets = angular.copy(preSets);
                delete wsPreSets.getFromCache;
                delete wsPreSets.saveToCache;
                delete wsPreSets.omitExpires;
                delete wsPreSets.cacheKey;
                delete wsPreSets.emergencyCache;
                delete wsPreSets.getCacheUsingCacheKey;

                // TODO: Sync

                $mmWS.call(method, data, wsPreSets).then(function(response) {

                    if (preSets.saveToCache) {
                        saveToCache(site, method, data, response, preSets.cacheKey);
                    }

                    // We pass back a clone of the original object, this may
                    // prevent errors if in the callback the object is modified.
                    deferred.resolve(angular.copy(response));
                }, function(error) {
                    if (error === mmCoreSessionExpired) {
                        // Session expired, trigger event.
                        $mmLang.translateAndRejectDeferred(deferred, 'mm.core.lostconnection');
                        $mmEvents.trigger(mmCoreEventSessionExpired, site.id);
                    } else if (error === mmCoreUserDeleted) {
                        // User deleted, trigger event.
                        $mmLang.translateAndRejectDeferred(deferred, 'mm.core.userdeleted');
                        $mmEvents.trigger(mmCoreEventUserDeleted, {siteid: site.id, params: data});
                    } else if (typeof preSets.emergencyCache !== 'undefined' && !preSets.emergencyCache) {
                        $log.debug('WS call ' + method + ' failed. Emergency cache is forbidden, rejecting.');
                        deferred.reject(error);
                    } else {
                        $log.debug('WS call ' + method + ' failed. Trying to use the emergency cache.');
                        preSets.omitExpires = true;
                        preSets.getFromCache = true;
                        getFromCache(site, method, data, preSets).then(function(data) {
                            deferred.resolve(data);
                        }, function() {
                            deferred.reject(error);
                        });
                    }
                });
            });

            return deferred.promise;
        };

        /**
         * Check if a WS is available in this site.
         *
         * @param  {String} method WS name.
         * @param  {Boolean=true} checkPrefix When true also checks with the compatibility prefix.
         * @return {Boolean}       True if the WS is available, false otherwise.
         * @description
         *
         * This method checks if a web service function is available. By default it will
         * also check if there is a compatibility function for it, e.g. a prefixed one.
         */
        Site.prototype.wsAvailable = function(method, checkPrefix) {
            checkPrefix = (typeof checkPrefix === 'undefined') ? true : checkPrefix;

            if (typeof this.infos == 'undefined') {
                return false;
            }

            for (var i = 0; i < this.infos.functions.length; i++) {
                var f = this.infos.functions[i];
                if (f.name == method) {
                    return true;
                }
            }

            // Let's try again with the compatibility prefix.
            if (checkPrefix) {
                return this.wsAvailable(mmCoreWSPrefix + method, false);
            }

            return false;
        };

        /*
         * Uploads a file using Cordova File API.
         *
         * @param {Object} uri File URI.
         * @param {Object} options File settings: fileKey, fileName and mimeType.
         * @return {Promise}
         */
        Site.prototype.uploadFile = function(uri, options) {
            return $mmWS.uploadFile(uri, options, {
                siteurl: this.siteurl,
                token: this.token
            });
        };

        /**
         * Invalidates all the cache entries.
         *
         * @return {Promise} Promise resolved when the cache entries are invalidated.
         */
        Site.prototype.invalidateWsCache = function() {
            var db = this.db;
            if (!db) {
                return $q.reject();
            }

            $log.debug('Invalidate all the cache for site: '+ this.id);
            return db.getAll(mmCoreWSCacheStore).then(function(entries) {
                if (entries && entries.length > 0) {
                    return invalidateWsCacheEntries(db, entries);
                }
            });
        };

        /**
         * Invalidates all the cache entries with a certain key.
         *
         * @param  {String} key Key to search.
         * @return {Promise}    Promise resolved when the cache entries are invalidated.
         */
        Site.prototype.invalidateWsCacheForKey = function(key) {
            var db = this.db;
            if (!db || !key) {
                return $q.reject();
            }

            $log.debug('Invalidate cache for key: '+key);
            return db.whereEqual(mmCoreWSCacheStore, 'key', key).then(function(entries) {
                if (entries && entries.length > 0) {
                    return invalidateWsCacheEntries(db, entries);
                }
            });
        };

        /**
         * Invalidates all the cache entries whose key starts with a certain value.
         *
         * @param  {String} key Key to search.
         * @return {Promise}    Promise resolved when the cache entries are invalidated.
         */
        Site.prototype.invalidateWsCacheForKeyStartingWith = function(key) {
            var db = this.db;
            if (!db || !key) {
                return $q.reject();
            }

            $log.debug('Invalidate cache for key starting with: '+key);
            return db.where(mmCoreWSCacheStore, 'key', '^', key).then(function(entries) {
                if (entries && entries.length > 0) {
                    return invalidateWsCacheEntries(db, entries);
                }
            });
        };

        /**
         * Generic function for adding the wstoken to Moodle urls and for pointing to the correct script.
         * Uses $mmUtil.fixPluginfileURL, passing site's token.
         *
         * @param {String} url   The url to be fixed.
         * @return {String}      Fixed URL.
         */
        Site.prototype.fixPluginfileURL = function(url) {
            return $mmUtil.fixPluginfileURL(url, this.token);

        };

        /**
         * Deletes site's DB.
         *
         * @return {Promise} Promise to be resolved when the DB is deleted.
         */
        Site.prototype.deleteDB = function() {
            return $mmDB.deleteDB('Site-' + this.id);
        };

        /**
         * Deletes site's folder.
         *
         * @return {Promise} Promise to be resolved when the DB is deleted.
         */
        Site.prototype.deleteFolder = function() {
            if ($mmFS.isAvailable()) {
                var siteFolder = $mmFS.getSiteFolder(this.id);
                return $mmFS.removeDir(siteFolder).catch(function() {
                    // Ignore any errors, $mmFS.removeDir fails if folder doesn't exists.
                });
            } else {
                return $q.when();
            }
        };

        /**
         * Get space usage of the site.
         *
         * @return {Promise} Promise resolved with the site space usage (size).
         */
        Site.prototype.getSpaceUsage = function() {
            if ($mmFS.isAvailable()) {
                var siteFolderPath = $mmFS.getSiteFolder(this.id);
                return $mmFS.getDirectorySize(siteFolderPath).catch(function() {
                    return 0;
                });
            } else {
                return $q.when(0);
            }
        };

        /**
         * Returns the URL to the documentation of the app, based on Moodle version and current language.
         *
         * @param {String} [page]    Docs page to go to.
         * @return {Promise}         Promise resolved with the Moodle docs URL.
         */
        Site.prototype.getDocsUrl = function(page) {
            var release = this.infos.release ? this.infos.release : undefined;
            return $mmUtil.getDocsUrl(release, page);
        };

        /**
         * Check if the local_mobile plugin is installed in the Moodle site.
         * This plugin provide extended services.
         *
         * @param {Boolean} retrying True if we're retrying the check.
         * @return {Promise}         Promise resolved when the check is done. Resolve params:
         *                                   - {Number} code Code to identify the authentication method to use.
         *                                   - {String} [service] If defined, name of the service to use.
         *                                   - {String} [warning] If defined, code of the warning message.
         */
        Site.prototype.checkLocalMobilePlugin = function(retrying) {
            var siteurl = this.siteurl,
                self = this,
                service = mmCoreConfigConstants.wsextservice;

            if (!service) {
                // External service not defined.
                return $q.when({code: 0});
            }

            return $http.post(siteurl + '/local/mobile/check.php', {service: service}).then(function(response) {
                var data = response.data;

                if (typeof data != 'undefined' && data.errorcode === 'requirecorrectaccess') {
                    if (!retrying) {
                        self.siteurl = $mmText.addOrRemoveWWW(siteurl);
                        return self.checkLocalMobilePlugin(true);
                    } else {
                        return $q.reject(data.error);
                    }
                } else if (typeof data == 'undefined' || typeof data.code == 'undefined') {
                    // local_mobile returned something we didn't expect. Let's assume it's not installed.
                    return {code: 0, warning: 'mm.login.localmobileunexpectedresponse'};
                }

                var code = parseInt(data.code, 10);
                if (data.error) {
                    switch (code) {
                        case 1:
                            // Site in maintenance mode.
                            return $mmLang.translateAndReject('mm.login.siteinmaintenance');
                        case 2:
                            // Web services not enabled.
                            return $mmLang.translateAndReject('mm.login.webservicesnotenabled');
                        case 3:
                            // Extended service not enabled, but the official is enabled.
                            return {code: 0};
                        case 4:
                            // Neither extended or official services enabled.
                            return $mmLang.translateAndReject('mm.login.mobileservicesnotenabled');
                        default:
                            return $mmLang.translateAndReject('mm.core.unexpectederror');
                    }
                } else {
                    return {code: code, service: service};
                }
            }, function() {
                return {code: 0};
            });
        };

        /**
         * Check if local_mobile has been installed in Moodle but the app is not using it.
         *
         * @return {Promise} Promise resolved it local_mobile was added, rejected otherwise.
         */
        Site.prototype.checkIfLocalMobileInstalledAndNotUsed = function() {
            var appUsesLocalMobile = false;
            angular.forEach(this.infos.functions, function(func) {
                if (func.name.indexOf(mmCoreWSPrefix) != -1) {
                    appUsesLocalMobile = true;
                }
            });

            if (appUsesLocalMobile) {
                // App already uses local_mobile, it wasn't added.
                return $q.reject();
            }

            return this.checkLocalMobilePlugin().then(function(data) {
                if (typeof data.service == 'undefined') {
                    // local_mobile NOT installed. Reject.
                    return $q.reject();
                }
                return data;
            });
        };

        /**
         * Check if a URL belongs to this site.
         *
         * @param  {String}  url URL to check.
         * @return {Boolean}     True if URL belongs to this site, false otherwise.
         */
        Site.prototype.containsUrl = function(url) {
            if (!url) {
                return false;
            }
            var siteurl = $mmText.removeProtocolAndWWW(this.siteurl);
            url = $mmText.removeProtocolAndWWW(url);
            return url.indexOf(siteurl) == 0;
        };

        /**
         * Invalidate entries from the cache.
         *
         * @param  {Object} db      DB the entries belong to.
         * @param  {Array}  entries Entries to invalidate.
         * @return {Promise}        Promise resolved when the cache entries are invalidated.
         */
        function invalidateWsCacheEntries(db, entries) {
            var promises = [];
            angular.forEach(entries, function(entry) {
                entry.expirationtime = 0;
                var promise = db.insert(mmCoreWSCacheStore, entry);
                promises.push(promise);
            });
            return $q.all(promises);
        }

        /**
         * Return the function to be used, based on the available functions in the site. It'll try to use non-deprecated
         * functions first, and fallback to deprecated ones if needed.
         *
         * @param  {String} method WS function to check.
         * @return {String}        Method to use based in the available functions.
         */
        Site.prototype.getCompatibleFunction = function(method) {
            if (typeof deprecatedFunctions[method] !== "undefined") {
                // Deprecated function is being used. Warn the developer.
                if (this.wsAvailable(deprecatedFunctions[method])) {
                    $log.warn("You are using deprecated Web Services: " + method +
                        " you must replace it with the newer function: " + deprecatedFunctions[method]);
                    return deprecatedFunctions[method];
                } else {
                    $log.warn("You are using deprecated Web Services. " +
                        "Your remote site seems to be outdated, consider upgrade it to the latest Moodle version.");
                }
            } else if (!this.wsAvailable(method)) {
                // Method not available. Check if there is a deprecated method to use.
                for (var oldFunc in deprecatedFunctions) {
                    if (deprecatedFunctions[oldFunc] === method && this.wsAvailable(oldFunc)) {
                        $log.warn("Your remote site doesn't support the function " + method +
                            ", it seems to be outdated, consider upgrade it to the latest Moodle version.");
                        return oldFunc; // Use deprecated function.
                    }
                }
            }
            return method;
        };

        /**
         * Get a WS response from cache.
         *
         * @param {Object} site    Site.
         * @param {String} method  The WebService method.
         * @param {Object} data    Arguments to pass to the method.
         * @param {Object} preSets Extra settings.
         * @return {Promise}       Promise to be resolved with the WS response.
         */
        function getFromCache(site, method, data, preSets) {
            var result,
                db = site.db,
                deferred = $q.defer(),
                id,
                promise;

            if (!db) {
                deferred.reject();
                return deferred.promise;
            } else if (!preSets.getFromCache) {
                deferred.reject();
                return deferred.promise;
            }

            id = md5.createHash(method + ':' + JSON.stringify(data));

            if (preSets.getCacheUsingCacheKey) {
                promise = db.whereEqual(mmCoreWSCacheStore, 'key', preSets.cacheKey).then(function(entries) {
                    if (entries.length == 0) {
                        // Cache key not found, get by params sent.
                        return db.get(mmCoreWSCacheStore, id);
                    }
                    return entries[0];
                });
            } else {
                promise = db.get(mmCoreWSCacheStore, id);
            }

            promise.then(function(entry) {
                var now = new Date().getTime();

                preSets.omitExpires = preSets.omitExpires || !$mmApp.isOnline();

                if (!preSets.omitExpires) {
                    if (now > entry.expirationtime) {
                        $log.debug('Cached element found, but it is expired');
                        deferred.reject();
                        return;
                    }
                }

                if (typeof entry != 'undefined' && typeof entry.data != 'undefined') {
                    var expires = (entry.expirationtime - now) / 1000;
                    $log.info('Cached element found, id: ' + id + ' expires in ' + expires + ' seconds');
                    deferred.resolve(entry.data);
                    return;
                }

                deferred.reject();
            }, function() {
                deferred.reject();
            });

            return deferred.promise;
        }

        /**
         * Save a WS response to cache.
         *
         * @param {Object} site    Site.
         * @param {String} method   The WebService method.
         * @param {Object} data     Arguments to pass to the method.
         * @param {Object} preSets  Extra settings.
         * @param {String} cacheKey (Optional) Extra key to add to the cache object to identify similar calls.
         * @return {Promise}        Promise to be resolved when the response is saved.
         */
        function saveToCache(site, method, data, response, cacheKey) {
            var db = site.db,
                id = md5.createHash(method + ':' + JSON.stringify(data)),
                cacheExpirationTime = mmCoreConfigConstants.cache_expiration_time,
                entry = {
                        id: id,
                        data: response
                    };

            if (!db) {
                return $q.reject();
            } else {
                cacheExpirationTime = isNaN(cacheExpirationTime) ? 300000 : cacheExpirationTime;
                entry.expirationtime = new Date().getTime() + cacheExpirationTime;
                if (cacheKey) {
                    entry.key = cacheKey;
                }
                return db.insert(mmCoreWSCacheStore, entry);
            }
        }

        /**
         * Make a site object.
         *
         * @module mm.core
         * @ngdoc method
         * @name $mmSitesFactory#makeSite
         * @param {String} id      Site ID.
         * @param {String} siteurl Site URL.
         * @param {String} token   User's token in the site.
         * @param {Object} infos   Site's info.
         * @return {Object} The current site object.
         * @description
         * This returns a site object.
         */
        self.makeSite = function(id, siteurl, token, infos) {
            return new Site(id, siteurl, token, infos);
        };

        /**
         * Gets the list of Site methods.
         *
         * @module mm.core
         * @ngdoc method
         * @name $mmSitesFactory#getSiteMethods
         * @return {Array} List of methods.
         */
        self.getSiteMethods = function() {
            var methods = [];
            for (var name in Site.prototype) {
                methods.push(name);
            }
            return methods;
        };

        return self;
    };
});
