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

angular.module('mm', ['ionic', 'mm.core', 'mm.core.contentlinks', 'mm.core.course', 'mm.core.courses', 'mm.core.login', 'mm.core.settings', 'mm.core.sidemenu', 'mm.core.textviewer', 'mm.core.user', 'mm.addons.calendar', 'mm.addons.coursecompletion', 'mm.addons.files', 'mm.addons.frontpage', 'mm.addons.grades', 'mm.addons.messages', 'mm.addons.mod_assign', 'mm.addons.mod_book', 'mm.addons.mod_chat', 'mm.addons.mod_choice', 'mm.addons.mod_folder', 'mm.addons.mod_forum', 'mm.addons.mod_glossary', 'mm.addons.mod_imscp', 'mm.addons.mod_label', 'mm.addons.mod_lti', 'mm.addons.mod_page', 'mm.addons.mod_resource', 'mm.addons.mod_scorm', 'mm.addons.mod_survey', 'mm.addons.mod_url', 'mm.addons.mod_wiki', 'mm.addons.notes', 'mm.addons.notifications', 'mm.addons.participants', 'mm.addons.pushnotifications', 'mm.addons.remotestyles', 'ngCordova', 'angular-md5', 'pascalprecht.translate', 'ngAria', 'ngIOS9UIWebViewPatch'])
.run(["$ionicPlatform", function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
		}
		if (window.StatusBar) {
			StatusBar.styleDefault();
		}
	});
}]);

angular.module('mm.core', ['pascalprecht.translate'])
.constant('mmCoreSessionExpired', 'mmCoreSessionExpired')
.constant('mmCoreUserDeleted', 'mmCoreUserDeleted')
.constant('mmCoreSecondsYear', 31536000)
.constant('mmCoreSecondsDay', 86400)
.constant('mmCoreSecondsHour', 3600)
.constant('mmCoreSecondsMinute', 60)
.constant('mmCoreDownloaded', 'downloaded')
.constant('mmCoreDownloading', 'downloading')
.constant('mmCoreNotDownloaded', 'notdownloaded')
.constant('mmCoreOutdated', 'outdated')
.constant('mmCoreNotDownloadable', 'notdownloadable')
.constant('mmCoreWifiDownloadThreshold', 104857600)
.constant('mmCoreDownloadThreshold', 10485760)
.config(["$stateProvider", "$provide", "$ionicConfigProvider", "$httpProvider", "$mmUtilProvider", "$mmLogProvider", "$compileProvider", "$mmInitDelegateProvider", "mmInitDelegateMaxAddonPriority", function($stateProvider, $provide, $ionicConfigProvider, $httpProvider, $mmUtilProvider,
        $mmLogProvider, $compileProvider, $mmInitDelegateProvider, mmInitDelegateMaxAddonPriority) {
    $ionicConfigProvider.platform.android.tabs.position('bottom');
    $provide.decorator('$ionicPlatform', ['$delegate', '$window', function($delegate, $window) {
        $delegate.isTablet = function() {
            var mq = 'only screen and (min-width: 768px) and (-webkit-min-device-pixel-ratio: 1)';
            return $window.matchMedia(mq).matches;
        };
        return $delegate;
    }]);
        $provide.decorator('$log', ['$delegate', $mmLogProvider.logDecorator]);
    $stateProvider
        .state('redirect', {
            url: '/redirect',
            params: {
                siteid: null,
                state: null,
                params: null
            },
            cache: false,
            controller: ["$scope", "$state", "$stateParams", "$mmSite", "$mmSitesManager", "$ionicHistory", function($scope, $state, $stateParams, $mmSite, $mmSitesManager, $ionicHistory) {
                $ionicHistory.nextViewOptions({disableBack: true});
                function loadSiteAndGo() {
                    $mmSitesManager.loadSite($stateParams.siteid).then(function() {
                        $state.go($stateParams.state, $stateParams.params);
                    }, function() {
                        $state.go('mm_login.sites');
                    });
                }
                $scope.$on('$ionicView.enter', function() {
                    if ($mmSite.isLoggedIn()) {
                        if ($stateParams.siteid && $stateParams.siteid != $mmSite.getId()) {
                            $mmSitesManager.logout().then(function() {
                                loadSiteAndGo();
                            });
                        } else {
                            $state.go($stateParams.state, $stateParams.params);
                        }
                    } else {
                        if ($stateParams.siteid) {
                            loadSiteAndGo();
                        } else {
                            $state.go('mm_login.sites');
                        }
                    }
                });
            }]
        });
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.transformRequest = [function(data) {
        return angular.isObject(data) && String(data) !== '[object File]' ? $mmUtilProvider.param(data) : data;
    }];
    function addProtocolIfMissing(list, protocol) {
        if (list.indexOf(protocol) == -1) {
            list = list.replace('https?', 'https?|' + protocol);
        }
        return list;
    }
    var hreflist = $compileProvider.aHrefSanitizationWhitelist().source,
        imglist = $compileProvider.imgSrcSanitizationWhitelist().source;
    hreflist = addProtocolIfMissing(hreflist, 'file');
    hreflist = addProtocolIfMissing(hreflist, 'tel');
    hreflist = addProtocolIfMissing(hreflist, 'mailto');
    hreflist = addProtocolIfMissing(hreflist, 'geo');
    hreflist = addProtocolIfMissing(hreflist, 'filesystem');
    imglist = addProtocolIfMissing(imglist, 'filesystem');
    $compileProvider.aHrefSanitizationWhitelist(hreflist);
    $compileProvider.imgSrcSanitizationWhitelist(imglist);
    $mmInitDelegateProvider.registerProcess('mmAppInit', '$mmApp.initProcess', mmInitDelegateMaxAddonPriority + 400, true);
    $mmInitDelegateProvider.registerProcess('mmUpdateManager', '$mmUpdateManager.check', mmInitDelegateMaxAddonPriority + 300, true);
}])
.run(["$ionicPlatform", "$ionicBody", "$window", "$mmEvents", "$mmInitDelegate", "mmCoreEventKeyboardShow", "mmCoreEventKeyboardHide", function($ionicPlatform, $ionicBody, $window, $mmEvents, $mmInitDelegate, mmCoreEventKeyboardShow, mmCoreEventKeyboardHide) {
    $mmInitDelegate.executeInitProcesses();
    $ionicPlatform.ready(function() {
        var checkTablet = function() {
            $ionicBody.enableClass($ionicPlatform.isTablet(), 'tablet');
        };
        ionic.on('resize', checkTablet, $window);
        checkTablet();
        $window.addEventListener('native.keyboardshow', function(e) {
            $mmEvents.trigger(mmCoreEventKeyboardShow, e);
        });
        $window.addEventListener('native.keyboardhide', function(e) {
            $mmEvents.trigger(mmCoreEventKeyboardHide, e);
        });
    });
}]);

angular.module('mm.core')
.factory('$mmAddonManager', ["$log", "$injector", function($log, $injector) {
    $log = $log.getInstance('$mmAddonManager');
    var self = {},
        instances = {};
        self.get = function(name) {
        if (self.isAvailable(name)) {
            return instances[name];
        }
    };
        self.isAvailable = function(name) {
        if (!name) {
            return false;
        }
        if (instances[name]) {
            return true;
        }
        try {
            instances[name] = $injector.get(name);
            return true;
        } catch(ex) {
            $log.warn('Service not available: '+name);
            return false;
        }
    };
    return self;
}]);

angular.module('ngIOS9UIWebViewPatch', ['ng']).config(["$provide", function($provide) {
  $provide.decorator('$browser', ['$delegate', '$window', function($delegate, $window) {
    if (isIOS9UIWebView($window.navigator.userAgent)) {
      return applyIOS9Shim($delegate);
    }
    return $delegate;
    function isIOS9UIWebView(userAgent) {
      return /(iPhone|iPad|iPod).* OS 9_\d/.test(userAgent) && !/Version\/9\./.test(userAgent);
    }
    function applyIOS9Shim(browser) {
      var pendingLocationUrl = null;
      var originalUrlFn= browser.url;
      browser.url = function() {
        if (arguments.length) {
          pendingLocationUrl = arguments[0];
          return originalUrlFn.apply(browser, arguments);
        }
        return pendingLocationUrl || originalUrlFn.apply(browser, arguments);
      };
      window.addEventListener('popstate', clearPendingLocationUrl, false);
      window.addEventListener('hashchange', clearPendingLocationUrl, false);
      function clearPendingLocationUrl() {
        pendingLocationUrl = null;
      }
      return browser;
    }
  }]);
}]);
angular.module('mm.core')
.provider('$mmApp', ["$stateProvider", function($stateProvider) {
        var DBNAME = 'MoodleMobile',
        dbschema = {
            stores: []
        },
        dboptions = {
            autoSchema: true
        };
        this.registerStore = function(store) {
        if (typeof(store.name) === 'undefined') {
            console.log('$mmApp: Error: store name is undefined.');
            return;
        } else if (storeExists(store.name)) {
            console.log('$mmApp: Error: store ' + store.name + ' is already defined.');
            return;
        }
        dbschema.stores.push(store);
    };
        this.registerStores = function(stores) {
        var self = this;
        angular.forEach(stores, function(store) {
            self.registerStore(store);
        });
    };
        function storeExists(name) {
        var exists = false;
        angular.forEach(dbschema.stores, function(store) {
            if (store.name === name) {
                exists = true;
            }
        });
        return exists;
    }
    this.$get = ["$mmDB", "$cordovaNetwork", "$log", "$injector", "$ionicPlatform", function($mmDB, $cordovaNetwork, $log, $injector, $ionicPlatform) {
        $log = $log.getInstance('$mmApp');
        var db,
            self = {};
                self.createState = function(name, config) {
            $log.debug('Adding new state: '+name);
            $stateProvider.state(name, config);
        };
                self.closeKeyboard = function() {
            if (typeof cordova != 'undefined' && cordova.plugins && cordova.plugins.Keyboard && cordova.plugins.Keyboard.close) {
                cordova.plugins.Keyboard.close();
                return true;
            }
            return false;
        };
                self.getDB = function() {
            if (typeof db == 'undefined') {
                db = $mmDB.getDB(DBNAME, dbschema, dboptions);
            }
            return db;
        };
                self.getSchema = function() {
            return dbschema;
        };
                self.initProcess = function() {
            return $ionicPlatform.ready();
        };
                self.isDevice = function() {
            return !!window.device;
        };
                self.isOnline = function() {
            var online = typeof navigator.connection === 'undefined' || $cordovaNetwork.isOnline();
            if (!online && navigator.onLine) {
                online = true;
            }
            return online;
        };
                self.isNetworkAccessLimited = function() {
            if (typeof navigator.connection === 'undefined') {
                return false;
            }
            var type = $cordovaNetwork.getNetwork();
            var limited = [Connection.CELL_2G, Connection.CELL_3G, Connection.CELL_4G, Connection.CELL];
            return limited.indexOf(type) > -1;
        };
                self.isReady = function() {
            var promise = $injector.get('$mmInitDelegate').ready();
            return promise.$$state.status === 1;
        };
                self.openKeyboard = function() {
            if (typeof cordova != 'undefined' && cordova.plugins && cordova.plugins.Keyboard && cordova.plugins.Keyboard.show) {
                cordova.plugins.Keyboard.show();
                return true;
            }
            return false;
        };
                self.ready = function() {
            return $injector.get('$mmInitDelegate').ready();
        };
        return self;
    }];
}]);

angular.module('mm.core')
.constant('mmCoreConfigStore', 'config')
.config(["$mmAppProvider", "mmCoreConfigStore", function($mmAppProvider, mmCoreConfigStore) {
    var stores = [
        {
            name: mmCoreConfigStore,
            keyPath: 'name'
        }
    ];
    $mmAppProvider.registerStores(stores);
}])
.factory('$mmConfig', ["$q", "$log", "$mmApp", "mmCoreConfigStore", function($q, $log, $mmApp, mmCoreConfigStore) {
    $log = $log.getInstance('$mmConfig');
    var self = {};
        self.get = function(name, defaultValue) {
        return $mmApp.getDB().get(mmCoreConfigStore, name).then(function(entry) {
            return entry.value;
        }).catch(function() {
            if (typeof defaultValue != 'undefined') {
                return defaultValue;
            } else {
                return $q.reject();
            }
        });
    };
        self.set = function(name, value) {
        return $mmApp.getDB().insert(mmCoreConfigStore, {name: name, value: value});
    };
        self.delete = function(name) {
        return $mmApp.getDB().remove(mmCoreConfigStore, name);
    };
    return self;
}]);

angular.module('mm.core')
.factory('$mmDB', ["$q", "$log", function($q, $log) {
    $log = $log.getInstance('$mmDB');
    var self = {},
        dbInstances = {};
        function applyOrder(query, order, reverse) {
        if (order) {
            query = query.order(order);
            if (reverse) {
                query = query.reverse();
            }
        }
        return query;
    }
        function applyWhere(query, where) {
        if (where && where.length > 0) {
            query = query.where.apply(query, where);
        }
        return query;
    }
        function callDBFunction(db, func) {
        var deferred = $q.defer();
        try {
            if (typeof(db) != 'undefined') {
                db[func].apply(db, Array.prototype.slice.call(arguments, 2)).then(function(result) {
                    if (typeof(result) == 'undefined') {
                        deferred.reject();
                    } else {
                        deferred.resolve(result);
                    }
                });
            } else {
                deferred.reject();
            }
        } catch(ex) {
            $log.error('Error executing function '+func+' to DB '+db.getName());
            $log.error(ex.name+': '+ex.message);
            deferred.reject();
        }
        return deferred.promise;
    }
        function callCount(db, store, where) {
        var deferred = $q.defer(),
            query;
        try {
            if (typeof(db) != 'undefined') {
                query = db.from(store);
                query = applyWhere(query, where);
                query.count().then(function(count) {
                    deferred.resolve(count);
                }, function() {
                    deferred.reject();
                });
            } else {
                deferred.reject();
            }
        } catch(ex) {
            $log.error('Error querying db '+db.getName()+'. '+ex.name+': '+ex.message);
            deferred.reject();
        }
        return deferred.promise;
    }
        function callWhere(db, store, field_name, op, value, op2, value2) {
        var deferred = $q.defer();
        try {
            if (typeof(db) != 'undefined') {
                db.from(store).where(field_name, op, value, op2, value2).list().then(function(list) {
                    deferred.resolve(list);
                }, function() {
                    deferred.reject();
                });
            } else {
                deferred.reject();
            }
        } catch(ex) {
            $log.error('Error querying db '+db.getName()+'. '+ex.name+': '+ex.message);
            deferred.reject();
        }
        return deferred.promise;
    }
        function callWhereEqual(db, store, field_name, value) {
        var deferred = $q.defer();
        try {
            if (typeof(db) != 'undefined') {
                db.from(store).where(field_name, '=', value).list().then(function(list) {
                    deferred.resolve(list);
                }, function() {
                    deferred.reject();
                });
            } else {
                deferred.reject();
            }
        } catch(ex) {
            $log.error('Error getting where equal from db '+db.getName()+'. '+ex.name+': '+ex.message);
            deferred.reject();
        }
        return deferred.promise;
    }
        function callEach(db, store, callback) {
        var deferred = $q.defer();
        callDBFunction(db, 'values', store, undefined, 99999999).then(function(entries) {
            for (var i = 0; i < entries.length; i++) {
                callback(entries[i]);
            }
            deferred.resolve();
        }, function() {
            deferred.reject();
        });
        return deferred.promise;
    }
        function doQuery(db, store, where, order, reverse, limit) {
        var deferred = $q.defer(),
            query;
        try {
            if (typeof(db) != 'undefined') {
                query = db.from(store);
                query = applyWhere(query, where);
                query = applyOrder(query, order, reverse);
                query.list(limit).then(function(list) {
                    deferred.resolve(list);
                }, function() {
                    deferred.reject();
                });
            } else {
                deferred.reject();
            }
        } catch(ex) {
            $log.error('Error querying ' + store + ' on ' + db.getName() + '. ' + ex.name + ': ' + ex.message);
            deferred.reject();
        }
        return deferred.promise;
    }
        function doUpdate(db, store, values, where) {
        var deferred = $q.defer(),
            query;
        try {
            if (typeof(db) != 'undefined') {
                query = db.from(store);
                query = applyWhere(query, where);
                query.patch(values).then(function(count) {
                    deferred.resolve(count);
                }, function() {
                    deferred.reject();
                });
            } else {
                deferred.reject();
            }
        } catch(ex) {
            $log.error('Error querying ' + store + ' on ' + db.getName() + '. ' + ex.name + ': ' + ex.message);
            deferred.reject();
        }
        return deferred.promise;
    }
        self.getDB = function(name, schema, options) {
        if (typeof dbInstances[name] === 'undefined') {
            var isSafari = !ionic.Platform.isIOS() && !ionic.Platform.isAndroid() && navigator.userAgent.indexOf('Safari') != -1
                            && navigator.userAgent.indexOf('Chrome') == -1 && navigator.userAgent.indexOf('Firefox') == -1;
            if (typeof IDBObjectStore == 'undefined' || typeof IDBObjectStore.prototype.count == 'undefined' || isSafari) {
                if (typeof options.mechanisms == 'undefined') {
                    options.mechanisms = ['websql', 'sqlite', 'localstorage', 'sessionstorage', 'userdata', 'memory'];
                } else {
                    var position = options.mechanisms.indexOf('indexeddb');
                    if (position != -1) {
                        options.mechanisms.splice(position, 1);
                    }
                }
            }
            var db = new ydn.db.Storage(name, schema, options);
            dbInstances[name] = {
                                getName: function() {
                    return db.getName();
                },
                                get: function(store, id) {
                    return callDBFunction(db, 'get', store, id);
                },
                                getAll: function(store) {
                    return callDBFunction(db, 'values', store, undefined, 99999999);
                },
                                count: function(store, where) {
                    return callCount(db, store, where);
                },
                                insert: function(store, value, id) {
                    return callDBFunction(db, 'put', store, value, id);
                },
                                insertSync: function(store, value) {
                    if (db) {
                        try {
                            db.put(store, value);
                            return true;
                        } catch(ex) {
                            $log.error('Error executing function sync put to DB '+db.getName());
                            $log.error(ex.name+': '+ex.message);
                        }
                    }
                    return false;
                },
                                query: function(store, where, order, reverse, limit) {
                    return doQuery(db, store, where, order, reverse, limit);
                },
                                remove: function(store, id) {
                    return callDBFunction(db, 'remove', store, id);
                },
                                removeAll: function(store) {
                    return callDBFunction(db, 'clear', store);
                },
                                update: function(store, values, where) {
                    return doUpdate(db, store, values, where);
                },
                                where: function(store, field_name, op, value, op2, value2) {
                    return callWhere(db, store, field_name, op, value, op2, value2);
                },
                                whereEqual: function(store, field_name, value) {
                    return callWhereEqual(db, store, field_name, value);
                },
                                each: function(store, callback) {
                    return callEach(db, store, callback);
                },
                                close: function() {
                    db.close();
                    db = undefined;
                },
                                onReady: function(cb) {
                    db.onReady(cb);
                },
                                getType: function() {
                    return db.getType();
                }
            };
        }
        return dbInstances[name];
    };
        self.deleteDB = function(name) {
        var deferred = $q.defer();
        function deleteDB() {
            delete dbInstances[name];
            $q.when(ydn.db.deleteDatabase(name)).then(deferred.resolve, deferred.reject);
        }
        if (typeof dbInstances[name] != 'undefined') {
            dbInstances[name].onReady(deleteDB);
        } else {
            deleteDB();
        }
        return deferred.promise;
    };
    return self;
}]);

angular.module('mm.core')
.factory('$mmEmulatorManager', ["$log", "$q", "$http", "$mmFS", "$window", function($log, $q, $http, $mmFS, $window) {
    $log = $log.getInstance('$mmEmulatorManager');
    var self = {};
        self.loadHTMLAPI = function() {
        if ($mmFS.isAvailable()) {
            $log.debug('Stop loading HTML API, it was already loaded or the environment doesn\'t need it.');
            return $q.when();
        }
        var deferred = $q.defer(),
            basePath;
        $log.debug('Loading HTML API.');
        $window.requestFileSystem  = $window.requestFileSystem || $window.webkitRequestFileSystem;
        $window.resolveLocalFileSystemURL = $window.resolveLocalFileSystemURL || $window.webkitResolveLocalFileSystemURL;
        $window.LocalFileSystem = {
            PERSISTENT: 1
        };
        $window.FileTransfer = function() {};
        $window.FileTransfer.prototype.download = function(url, filePath, successCallback, errorCallback) {
            $http.get(url, {responseType: 'blob'}).then(function(data) {
                if (!data || !data.data) {
                    errorCallback();
                } else {
                    filePath = filePath.replace(basePath, '');
                    filePath = filePath.replace(/%20/g, ' ');
                    $mmFS.writeFile(filePath, data.data).then(function(e) {
                        successCallback(e);
                    }).catch(function(error) {
                        errorCallback(error);
                    });
                }
            }).catch(function(error) {
                errorCallback(error);
            });
        };
        $window.zip = {
            unzip: function(source, destination, callback, progressCallback) {
                source = source.replace(basePath, '');
                source = source.replace(/%20/g, ' ');
                destination = destination.replace(basePath, '');
                destination = destination.replace(/%20/g, ' ');
                $mmFS.readFile(source, $mmFS.FORMATARRAYBUFFER).then(function(data) {
                    var zip = new JSZip(data),
                        promises = [];
                    angular.forEach(zip.files, function(file, name) {
                        var filepath = $mmFS.concatenatePaths(destination, name),
                            type;
                        if (!file.dir) {
                            type = $mmFS.getMimeType($mmFS.getFileExtension(name));
                            promises.push($mmFS.writeFile(filepath, new Blob([file.asArrayBuffer()], {type: type})));
                        } else {
                            promises.push($mmFS.createDir(filepath));
                        }
                    });
                    return $q.all(promises).then(function() {
                        callback(0);
                    });
                }).catch(function() {
                    callback(-1);
                });
            }
        };
        $window.webkitStorageInfo.requestQuota(PERSISTENT, 500 * 1024 * 1024, function(granted) {
            $window.requestFileSystem(PERSISTENT, granted, function(entry) {
                basePath = entry.root.toURL();
                $mmFS.setHTMLBasePath(basePath);
                deferred.resolve();
            }, deferred.reject);
        }, deferred.reject);
        return deferred.promise;
    };
    return self;
}])
.config(["$mmInitDelegateProvider", "mmInitDelegateMaxAddonPriority", function($mmInitDelegateProvider, mmInitDelegateMaxAddonPriority) {
    if (!ionic.Platform.isWebView()) {
        $mmInitDelegateProvider.registerProcess('mmEmulator', '$mmEmulatorManager.loadHTMLAPI',
                mmInitDelegateMaxAddonPriority + 500, true);
    }
}]);

angular.module('mm.core')
.constant('mmCoreEventKeyboardShow', 'keyboard_show')
.constant('mmCoreEventKeyboardHide', 'keyboard_hide')
.constant('mmCoreEventSessionExpired', 'session_expired')
.constant('mmCoreEventLogin', 'login')
.constant('mmCoreEventLogout', 'logout')
.constant('mmCoreEventLanguageChanged', 'language_changed')
.constant('mmCoreEventSiteAdded', 'site_added')
.constant('mmCoreEventSiteUpdated', 'site_updated')
.constant('mmCoreEventSiteDeleted', 'site_deleted')
.constant('mmCoreEventQueueEmpty', 'filepool_queue_empty')
.constant('mmCoreEventCompletionModuleViewed', 'completion_module_viewed')
.constant('mmCoreEventUserDeleted', 'user_deleted')
.constant('mmCoreEventPackageStatusChanged', 'filepool_package_status_changed')
.constant('mmCoreEventSectionStatusChanged', 'section_status_changed')
.factory('$mmEvents', ["$log", "md5", function($log, md5) {
    $log = $log.getInstance('$mmEvents');
    var self = {},
        observers = {},
        uniqueEvents = {},
        uniqueEventsData = {};
        self.on = function(eventName, callBack) {
        if (uniqueEvents[eventName]) {
            callBack(uniqueEventsData[eventName]);
            return {
                id: -1,
                off: function() {}
            };
        }
        var observerID;
        if (typeof(observers[eventName]) === 'undefined') {
            observers[eventName] = {};
        }
        while (typeof(observerID) === 'undefined') {
            var candidateID = md5.createHash(Math.random().toString());
            if (typeof(observers[eventName][candidateID]) === 'undefined') {
                observerID = candidateID;
            }
        }
        $log.debug('Observer ' + observerID + ' listening to event '+eventName);
        observers[eventName][observerID] = callBack;
        var observer = {
            id: observerID,
            off: function() {
                $log.debug('Disable observer ' + observerID + ' for event '+eventName);
                delete observers[eventName][observerID];
            }
        };
        return observer;
    };
        self.trigger = function(eventName, data) {
        $log.debug('Event ' + eventName + ' triggered.');
        var affected = observers[eventName];
        for (var observerName in affected) {
            if (typeof(affected[observerName]) === 'function') {
                affected[observerName](data);
            }
        }
    };
        self.triggerUnique = function(eventName, data) {
        if (uniqueEvents[eventName]) {
            $log.debug('Unique event ' + eventName + ' ignored because it was already triggered.');
        } else {
            $log.debug('Unique event ' + eventName + ' triggered.');
            uniqueEvents[eventName] = true;
            uniqueEventsData[eventName] = data;
            var affected = observers[eventName];
            angular.forEach(affected, function(callBack) {
                if (typeof callBack === 'function') {
                    callBack(data);
                }
            });
        }
    };
    return self;
}]);

angular.module('mm.core')
.constant('mmFilepoolQueueProcessInterval', 0)
.constant('mmFilepoolFolder', 'filepool')
.constant('mmFilepoolStore', 'filepool')
.constant('mmFilepoolQueueStore', 'files_queue')
.constant('mmFilepoolLinksStore', 'files_links')
.constant('mmFilepoolPackagesStore', 'filepool_packages')
.constant('mmFilepoolWifiDownloadThreshold', 20971520)
.constant('mmFilepoolDownloadThreshold', 2097152)
.config(["$mmAppProvider", "$mmSitesFactoryProvider", "mmFilepoolStore", "mmFilepoolLinksStore", "mmFilepoolQueueStore", "mmFilepoolPackagesStore", function($mmAppProvider, $mmSitesFactoryProvider, mmFilepoolStore, mmFilepoolLinksStore, mmFilepoolQueueStore,
            mmFilepoolPackagesStore) {
    var siteStores = [
        {
            name: mmFilepoolStore,
            keyPath: 'fileId',
            indexes: []
        },
        {
            name: mmFilepoolLinksStore,
            keyPath: ['fileId', 'component', 'componentId'],
            indexes: [
                {
                    name: 'fileId',
                },
                {
                    name: 'component',
                },
                {
                    name: 'componentAndId',
                    generator: function(obj) {
                        return [obj.component, obj.componentId];
                    }
                }
            ]
        },
        {
            name: mmFilepoolPackagesStore,
            keyPath: 'id',
            indexes: [
                {
                    name: 'component',
                },
                {
                    name: 'componentId',
                },
                {
                    name: 'status',
                }
            ]
        }
    ];
    var appStores = [
        {
            name: mmFilepoolQueueStore,
            keyPath: ['siteId', 'fileId'],
            indexes: [
                {
                    name: 'siteId',
                },
                {
                    name: 'sortorder',
                    generator: function(obj) {
                        var sortorder = parseInt(obj.added, 10),
                            priority = 999 - Math.max(0, Math.min(parseInt(obj.priority || 0, 10), 999)),
                            padding = "000";
                        sortorder = "" + sortorder;
                        priority = "" + priority;
                        priority = padding.substring(0, padding.length - priority.length) + priority;
                        sortorder = priority + '-' + sortorder;
                        return sortorder;
                    }
                }
            ]
        }
    ];
    $mmAppProvider.registerStores(appStores);
    $mmSitesFactoryProvider.registerStores(siteStores);
}])
.factory('$mmFilepool', ["$q", "$log", "$timeout", "$mmApp", "$mmFS", "$mmWS", "$mmSitesManager", "$mmEvents", "md5", "mmFilepoolStore", "mmFilepoolLinksStore", "mmFilepoolQueueStore", "mmFilepoolFolder", "mmFilepoolQueueProcessInterval", "mmCoreEventQueueEmpty", "mmCoreDownloaded", "mmCoreDownloading", "mmCoreNotDownloaded", "mmCoreOutdated", "mmCoreNotDownloadable", "mmFilepoolPackagesStore", "mmCoreEventPackageStatusChanged", "$mmText", "$mmUtil", "mmFilepoolWifiDownloadThreshold", "mmFilepoolDownloadThreshold", function($q, $log, $timeout, $mmApp, $mmFS, $mmWS, $mmSitesManager, $mmEvents, md5, mmFilepoolStore,
        mmFilepoolLinksStore, mmFilepoolQueueStore, mmFilepoolFolder, mmFilepoolQueueProcessInterval, mmCoreEventQueueEmpty,
        mmCoreDownloaded, mmCoreDownloading, mmCoreNotDownloaded, mmCoreOutdated, mmCoreNotDownloadable, mmFilepoolPackagesStore,
        mmCoreEventPackageStatusChanged, $mmText, $mmUtil, mmFilepoolWifiDownloadThreshold, mmFilepoolDownloadThreshold) {
    $log = $log.getInstance('$mmFilepool');
    var self = {},
        extensionRegex = new RegExp('^[a-z0-9]+$'),
        tokenRegex = new RegExp('(\\?|&)token=([A-Za-z0-9]+)'),
        queueState,
        urlAttributes = [
            tokenRegex,
            new RegExp('(\\?|&)forcedownload=[0-1]')
        ],
        revisionRegex = new RegExp('/content/([0-9]+)/'),
        queueDeferreds = {},
        packagesPromises = {},
        filePromises = {},
        sizeCache = {};
    var QUEUE_RUNNING = 'mmFilepool:QUEUE_RUNNING',
        QUEUE_PAUSED = 'mmFilepool:QUEUE_PAUSED';
    var ERR_QUEUE_IS_EMPTY = 'mmFilepoolError:ERR_QUEUE_IS_EMPTY',
        ERR_FS_OR_NETWORK_UNAVAILABLE = 'mmFilepoolError:ERR_FS_OR_NETWORK_UNAVAILABLE',
        ERR_QUEUE_ON_PAUSE = 'mmFilepoolError:ERR_QUEUE_ON_PAUSE';
        self.FILEDOWNLOADED = 'downloaded';
    self.FILEDOWNLOADING = 'downloading';
    self.FILENOTDOWNLOADED = 'notdownloaded';
    self.FILEOUTDATED = 'outdated';
        function getSiteDb(siteId) {
        return $mmSitesManager.getSiteDb(siteId);
    }
        self._addFileLink = function(siteId, fileId, component, componentId) {
        if (!component) {
            return $q.reject();
        }
        componentId = self._fixComponentId(componentId);
        return getSiteDb(siteId).then(function(db) {
            return db.insert(mmFilepoolLinksStore, {
                fileId: fileId,
                component: component,
                componentId: componentId
            });
        });
    };
        self.addFileLinkByUrl = function(siteId, fileUrl, component, componentId) {
        return self._fixPluginfileURL(siteId, fileUrl).then(function(fileUrl) {
            var fileId = self._getFileIdByUrl(fileUrl);
            return self._addFileLink(siteId, fileId, component, componentId);
        });
    };
        self._addFileLinks = function(siteId, fileId, links) {
        var promises = [];
        angular.forEach(links, function(link) {
            promises.push(self._addFileLink(siteId, fileId, link.component, link.componentId));
        });
        return $q.all(promises);
    };
        self._addFileToPool = function(siteId, fileId, data) {
        var values = angular.copy(data) || {};
        values.fileId = fileId;
        return getSiteDb(siteId).then(function(db) {
            return db.insert(mmFilepoolStore, values);
        });
    };
        self.addToQueueByUrl = function(siteId, fileUrl, component, componentId, timemodified, filePath, priority) {
        var db = $mmApp.getDB(),
            fileId,
            now = new Date(),
            link,
            revision,
            queueDeferred;
        if (!$mmFS.isAvailable()) {
            return $q.reject();
        }
        return self._fixPluginfileURL(siteId, fileUrl).then(function(fileUrl) {
            timemodified = timemodified || 0;
            revision = self.getRevisionFromUrl(fileUrl);
            fileId = self._getFileIdByUrl(fileUrl);
            priority = priority || 0;
            if (typeof component !== 'undefined') {
                link = {
                    component: component,
                    componentId: componentId
                };
            }
            queueDeferred = self._getQueueDeferred(siteId, fileId, false);
            return db.get(mmFilepoolQueueStore, [siteId, fileId]).then(function(fileObject) {
                var foundLink = false,
                    update = false;
                if (fileObject) {
                    if (fileObject.priority < priority) {
                        update = true;
                        fileObject.priority = priority;
                    }
                    if (revision && fileObject.revision !== revision) {
                        update = true;
                        fileObject.revision = revision;
                    }
                    if (timemodified && fileObject.timemodified !== timemodified) {
                        update = true;
                        fileObject.timemodified = timemodified;
                    }
                    if (filePath && fileObject.path !== filePath) {
                        update = true;
                        fileObject.path = filePath;
                    }
                    if (link) {
                        angular.forEach(fileObject.links, function(fileLink) {
                            if (fileLink.component == link.component && fileLink.componentId == link.componentId) {
                                foundLink = true;
                            }
                        });
                        if (!foundLink) {
                            update = true;
                            fileObject.links.push(link);
                        }
                    }
                    if (update) {
                        $log.debug('Updating file ' + fileId + ' which is already in queue');
                        return db.insert(mmFilepoolQueueStore, fileObject).then(function() {
                            return self._getQueuePromise(siteId, fileId);
                        });
                    }
                    $log.debug('File ' + fileId + ' already in queue and does not require update');
                    if (queueDeferred) {
                        return queueDeferred.promise;
                    } else {
                        return self._getQueuePromise(siteId, fileId);
                    }
                } else {
                    return addToQueue();
                }
            }, function() {
                return addToQueue();
            });
            function addToQueue() {
                $log.debug('Adding ' + fileId + ' to the queue');
                return db.insert(mmFilepoolQueueStore, {
                    siteId: siteId,
                    fileId: fileId,
                    added: now.getTime(),
                    priority: priority,
                    url: fileUrl,
                    revision: revision,
                    timemodified: timemodified,
                    path: filePath,
                    links: link ? [link] : []
                }).then(function() {
                    self.checkQueueProcessing();
                    return self._getQueuePromise(siteId, fileId);
                });
            }
        });
    };
        self.checkQueueProcessing = function() {
        if (!$mmFS.isAvailable() || !$mmApp.isOnline()) {
            queueState = QUEUE_PAUSED;
            return;
        } else if (queueState === QUEUE_RUNNING) {
            return;
        }
        queueState = QUEUE_RUNNING;
        self._processQueue();
    };
        self.clearAllPackagesStatus = function(siteId) {
        var promises = [];
        $log.debug('Clear all packages status for site ' + siteId);
        return $mmSitesManager.getSite(siteId).then(function(site) {
            var db = site.getDb();
            return db.getAll(mmFilepoolPackagesStore).then(function(entries) {
                angular.forEach(entries, function(entry) {
                    promises.push(db.remove(mmFilepoolPackagesStore, entry.id).then(function() {
                        self._triggerPackageStatusChanged(siteId, entry.component, entry.componentId, mmCoreNotDownloaded);
                    }));
                });
                return $q.all(promises);
            });
        });
    };
        self.clearFilepool = function(siteId) {
        return getSiteDb(siteId).then(function(db) {
            return db.removeAll(mmFilepoolStore);
        });
    };
        self.componentHasFiles = function(siteId, component, componentId) {
        return getSiteDb(siteId).then(function(db) {
            var where;
            if (typeof componentId !== 'undefined') {
                where = ['componentAndId', '=', [component, self._fixComponentId(componentId)]];
            } else {
                where = ['component', '=', component];
            }
            return db.count(mmFilepoolLinksStore, where).then(function(count) {
                if (count > 0) {
                    return true;
                }
                return $q.reject();
            });
        });
    };
        self.determinePackagesStatus = function(current, packagestatus) {
        if (!current) {
            current = mmCoreNotDownloadable;
        }
        if (packagestatus === mmCoreNotDownloaded) {
            return mmCoreNotDownloaded;
        } else if (packagestatus === mmCoreDownloaded && current === mmCoreNotDownloadable) {
            return mmCoreDownloaded;
        } else if (packagestatus === mmCoreDownloading && (current === mmCoreNotDownloadable || current === mmCoreDownloaded)) {
            return mmCoreDownloading;
        } else if (packagestatus === mmCoreOutdated && current !== mmCoreNotDownloaded) {
            return mmCoreOutdated;
        }
        return current;
    };
        self._downloadOrPrefetchPackage = function(siteId, fileList, prefetch, component, componentId, revision, timemod, dirPath) {
        var packageId = self.getPackageId(component, componentId);
        if (packagesPromises[siteId] && packagesPromises[siteId][packageId]) {
            return packagesPromises[siteId][packageId];
        } else if (!packagesPromises[siteId]) {
            packagesPromises[siteId] = {};
        }
        revision = revision || self.getRevisionFromFileList(fileList);
        timemod = timemod || self.getTimemodifiedFromFileList(fileList);
        var dwnPromise,
            deleted = false;
        dwnPromise = self.storePackageStatus(siteId, component, componentId, mmCoreDownloading, revision, timemod).then(function() {
            var promises = [],
                deferred = $q.defer(),
                packageLoaded = 0;
            angular.forEach(fileList, function(file) {
                var path,
                    promise,
                    fileLoaded = 0;
                if (dirPath) {
                    path = file.filename;
                    if (file.filepath !== '/') {
                        path = file.filepath.substr(1) + path;
                    }
                    path = $mmFS.concatenatePaths(dirPath, path);
                }
                if (prefetch) {
                    promise = self.addToQueueByUrl(siteId, file.fileurl, component, componentId, file.timemodified, path);
                } else {
                    promise = self.downloadUrl(siteId, file.fileurl, false, component, componentId, file.timemodified, path);
                }
                promises.push(promise.then(undefined, undefined, function(progress) {
                    if (progress && progress.loaded) {
                        packageLoaded = packageLoaded + (progress.loaded - fileLoaded);
                        fileLoaded = progress.loaded;
                        deferred.notify({
                            packageDownload: true,
                            loaded: packageLoaded,
                            fileProgress: progress
                        });
                    }
                }));
            });
            $q.all(promises).then(function() {
                return self.storePackageStatus(siteId, component, componentId, mmCoreDownloaded, revision, timemod);
            }).catch(function() {
                return self.setPackagePreviousStatus(siteId, component, componentId).then(function() {
                    return $q.reject();
                });
            }).then(deferred.resolve, deferred.reject);
            return deferred.promise;
        }).finally(function() {
            delete packagesPromises[siteId][packageId];
            deleted = true;
        });
        if (!deleted) {
            packagesPromises[siteId][packageId] = dwnPromise;
        }
        return dwnPromise;
    };
        self.downloadPackage = function(siteId, fileList, component, componentId, revision, timemodified, dirPath) {
        return self._downloadOrPrefetchPackage(siteId, fileList, false, component, componentId, revision, timemodified, dirPath);
    };
        self.downloadUrl = function(siteId, fileUrl, ignoreStale, component, componentId, timemodified, filePath) {
        var fileId,
            revision,
            promise;
        if ($mmFS.isAvailable()) {
            return self._fixPluginfileURL(siteId, fileUrl).then(function(fixedUrl) {
                fileUrl = fixedUrl;
                timemodified = timemodified || 0;
                revision = self.getRevisionFromUrl(fileUrl);
                fileId = self._getFileIdByUrl(fileUrl);
                return self._restoreOldFileIfNeeded(siteId, fileId, fileUrl, filePath);
            }).then(function() {
                return self._hasFileInPool(siteId, fileId).then(function(fileObject) {
                    if (typeof fileObject === 'undefined') {
                        return self._downloadForPoolByUrl(siteId, fileUrl, revision, timemodified, filePath);
                    } else if (self._isFileOutdated(fileObject, revision, timemodified) && $mmApp.isOnline() && !ignoreStale) {
                        return self._downloadForPoolByUrl(siteId, fileUrl, revision, timemodified, filePath, fileObject);
                    }
                    if (filePath) {
                        promise = self._getInternalUrlByPath(filePath);
                    } else {
                        promise = self._getInternalUrlById(siteId, fileId);
                    }
                    return promise.then(function(response) {
                        return response;
                    }, function() {
                        return self._downloadForPoolByUrl(siteId, fileUrl, revision, timemodified, filePath, fileObject);
                    });
                }, function() {
                    return self._downloadForPoolByUrl(siteId, fileUrl, revision, timemodified, filePath);
                })
                .then(function(response) {
                    if (typeof component !== 'undefined') {
                        self._addFileLink(siteId, fileId, component, componentId);
                    }
                    self._notifyFileDownloaded(siteId, fileId);
                    return response;
                }, function(err) {
                    self._notifyFileDownloadError(siteId, fileId);
                    return $q.reject(err);
                });
            });
        } else {
            return $q.reject();
        }
    };
        self._downloadForPoolByUrl = function(siteId, fileUrl, revision, timemodified, filePath, poolFileObject) {
        var fileId = self._getFileIdByUrl(fileUrl);
        filePath = filePath || self._getFilePath(siteId, fileId);
        if (poolFileObject && poolFileObject.fileId !== fileId) {
            $log.error('Invalid object to update passed');
            return $q.reject();
        }
        var downloadId = self.getFileDownloadId(fileUrl, filePath),
            deleted = false,
            promise;
        if (filePromises[siteId] && filePromises[siteId][downloadId]) {
            return filePromises[siteId][downloadId];
        } else if (!filePromises[siteId]) {
            filePromises[siteId] = {};
        }
        promise = $mmSitesManager.getSite(siteId).then(function(site) {
            if (!site.canDownloadFiles()) {
                return $q.reject();
            }
            return $mmWS.downloadFile(fileUrl, filePath).then(function(fileEntry) {
                var now = new Date(),
                    data = poolFileObject || {};
                data.downloaded = now.getTime();
                data.stale = false;
                data.url = fileUrl;
                data.revision = revision;
                data.timemodified = timemodified;
                data.path = filePath;
                return self._addFileToPool(siteId, fileId, data).then(function() {
                    return fileEntry.toURL();
                });
            });
        }).finally(function() {
            delete filePromises[siteId][downloadId];
            deleted = true;
        });
        if (!deleted) {
            filePromises[siteId][downloadId] = promise;
        }
        return promise;
    };
        self._fixComponentId = function(componentId) {
        var id = parseInt(componentId, 10);
        if (isNaN(id)) {
            return -1;
        }
        return id;
    };
        self._fixPluginfileURL = function(siteId, fileUrl) {
        return $mmSitesManager.getSite(siteId).then(function(site) {
            return site.fixPluginfileURL(fileUrl);
        });
    };
        self._getFileLinks = function(siteId, fileId) {
        return getSiteDb(siteId).then(function(db) {
            return db.query(mmFilepoolLinksStore, ['fileId', '=', fileId]);
        });
    };
        self.getFileDownloadId = function(fileUrl, filePath) {
        return md5.createHash(fileUrl + '###' + filePath);
    };
        self._getFileEventName = function(siteId, fileId) {
        return 'mmFilepoolFile:'+siteId+':'+fileId;
    };
        self.getFileEventNameByUrl = function(siteId, fileUrl) {
        return self._fixPluginfileURL(siteId, fileUrl).then(function(fileUrl) {
            var fileId = self._getFileIdByUrl(fileUrl);
            return self._getFileEventName(siteId, fileId);
        });
    };
        self.getPackageDownloadPromise = function(siteId, component, componentId) {
        var packageId = self.getPackageId(component, componentId);
        if (packagesPromises[siteId] && packagesPromises[siteId][packageId]) {
            return packagesPromises[siteId][packageId];
        }
    };
        self.getPackageId = function(component, componentId) {
        return md5.createHash(component + '#' + self._fixComponentId(componentId));
    };
        self.getPackagePreviousStatus = function(siteId, component, componentId) {
        return $mmSitesManager.getSite(siteId).then(function(site) {
            var db = site.getDb(),
                packageId = self.getPackageId(component, componentId);
            return db.get(mmFilepoolPackagesStore, packageId).then(function(entry) {
                return entry.previous || mmCoreNotDownloaded;
            }, function() {
                return mmCoreNotDownloaded;
            });
        });
    };
        self.getPackageStatus = function(siteId, component, componentId, revision, timemodified) {
        revision = revision || 0;
        timemodified = timemodified || 0;
        return $mmSitesManager.getSite(siteId).then(function(site) {
            var db = site.getDb(),
                packageId = self.getPackageId(component, componentId);
            return db.get(mmFilepoolPackagesStore, packageId).then(function(entry) {
                if (entry.status === mmCoreDownloaded) {
                    if (revision != entry.revision || timemodified > entry.timemodified) {
                        entry.status = mmCoreOutdated;
                        entry.updated = new Date().getTime();
                        db.insert(mmFilepoolPackagesStore, entry).then(function() {
                            self._triggerPackageStatusChanged(siteId, component, componentId, mmCoreOutdated);
                        });
                    }
                } else if (entry.status === mmCoreOutdated) {
                    if (revision === entry.revision && timemodified === entry.timemodified) {
                        entry.status = mmCoreDownloaded;
                        entry.updated = new Date().getTime();
                        db.insert(mmFilepoolPackagesStore, entry).then(function() {
                            self._triggerPackageStatusChanged(siteId, component, componentId, mmCoreDownloaded);
                        });
                    }
                }
                return entry.status;
            }, function() {
                return mmCoreNotDownloaded;
            });
        });
    };
        self.getPackageTimemodified = function(siteId, component, componentId) {
        return $mmSitesManager.getSite(siteId).then(function(site) {
            var db = site.getDb(),
                packageId = self.getPackageId(component, componentId);
            return db.get(mmFilepoolPackagesStore, packageId).then(function(entry) {
                return entry.timemodified;
            }, function() {
                return -1;
            });
        });
    };
        self._getQueueDeferred = function(siteId, fileId, create) {
        if (typeof create == 'undefined') {
            create = true;
        }
        if (!queueDeferreds[siteId]) {
            if (!create) {
                return;
            }
            queueDeferreds[siteId] = {};
        }
        if (!queueDeferreds[siteId][fileId]) {
            if (!create) {
                return;
            }
            queueDeferreds[siteId][fileId] = $q.defer();
        }
        return queueDeferreds[siteId][fileId];
    };
        self._getQueuePromise = function(siteId, fileId, create) {
        return self._getQueueDeferred(siteId, fileId, create).promise;
    };
        self._hasFileInPool = function(siteId, fileId) {
        return getSiteDb(siteId).then(function(db) {
            return db.get(mmFilepoolStore, fileId).then(function(fileObject) {
                if (typeof fileObject === 'undefined') {
                    return $q.reject();
                }
                return fileObject;
            });
        });
    };
        self._hasFileInQueue = function(siteId, fileId) {
        return $mmApp.getDB().get(mmFilepoolQueueStore, [siteId, fileId]).then(function(fileObject) {
            if (typeof fileObject === 'undefined') {
                return $q.reject();
            }
            return fileObject;
        });
    };
        self.getDirectoryUrlByUrl = function(siteId, fileUrl) {
        if ($mmFS.isAvailable()) {
            return self._fixPluginfileURL(siteId, fileUrl).then(function(fileUrl) {
                var fileId = self._getFileIdByUrl(fileUrl);
                return $mmFS.getDir(self._getFilePath(siteId, fileId)).then(function(dirEntry) {
                    return dirEntry.toURL();
                });
            });
        }
        return $q.reject();
    };
        self._getFileIdByUrl = function(fileUrl) {
        var url = self._removeRevisionFromUrl(fileUrl),
            filename,
            candidate,
            extension = '';
        url = $mmText.decodeHTML(decodeURIComponent(url));
        if (url.indexOf('/webservice/pluginfile') !== -1) {
            angular.forEach(urlAttributes, function(regex) {
                url = url.replace(regex, '');
            });
        }
        filename = self._guessFilenameFromUrl(url);
        candidate = self._guessExtensionFromUrl(url);
        if (candidate && candidate !== 'php') {
            extension = '.' + candidate;
        }
        return filename + '_' + md5.createHash('url:' + url) + extension;
    };
        self._getNonReadableFileIdByUrl = function(fileUrl) {
        var url = self._removeRevisionFromUrl(fileUrl),
            candidate,
            extension = '';
        if (url.indexOf('/webservice/pluginfile') !== -1) {
            angular.forEach(urlAttributes, function(regex) {
                url = url.replace(regex, '');
            });
            candidate = self._guessExtensionFromUrl(url);
            if (candidate && candidate !== 'php') {
                extension = '.' + candidate;
            }
        }
        return md5.createHash('url:' + url) + extension;
    };
        self._getFileUrlByUrl = function(siteId, fileUrl, mode, component, componentId, timemodified, checkSize) {
        var fileId,
            revision;
        if (typeof checkSize == 'undefined') {
            checkSize = true;
        }
        return self._fixPluginfileURL(siteId, fileUrl).then(function(fixedUrl) {
            fileUrl = fixedUrl;
            timemodified = timemodified || 0;
            revision = self.getRevisionFromUrl(fileUrl);
            fileId = self._getFileIdByUrl(fileUrl);
            return self._restoreOldFileIfNeeded(siteId, fileId, fileUrl);
        }).then(function() {
            return self._hasFileInPool(siteId, fileId).then(function(fileObject) {
                var response,
                    fn;
                if (typeof fileObject === 'undefined') {
                    addToQueueIfNeeded();
                    response = fileUrl;
                } else if (self._isFileOutdated(fileObject, revision, timemodified) && $mmApp.isOnline()) {
                    addToQueueIfNeeded();
                    response = fileUrl;
                } else {
                    if (mode === 'src') {
                        fn = self._getInternalSrcById;
                    } else {
                        fn = self._getInternalUrlById;
                    }
                    response = fn(siteId, fileId).then(function(internalUrl) {
                        return internalUrl;
                    }, function() {
                        $log.debug('File ' + fileId + ' not found on disk');
                        self._removeFileById(siteId, fileId);
                        addToQueueIfNeeded();
                        if ($mmApp.isOnline()) {
                            return fileUrl;
                        }
                        return $q.reject();
                    });
                }
                return response;
            }, function() {
                addToQueueIfNeeded();
                return fileUrl;
            });
        });
        function addToQueueIfNeeded() {
            var promise;
            if (checkSize) {
                if (!$mmApp.isOnline()) {
                    return;
                }
                if (typeof sizeCache[fileUrl] != 'undefined') {
                    promise = $q.when(sizeCache[fileUrl]);
                } else {
                    promise = $mmWS.getRemoteFileSize(fileUrl);
                }
                promise.then(function(size) {
                    if (size > 0) {
                        sizeCache[fileUrl] = size;
                        var isWifi = !$mmApp.isNetworkAccessLimited();
                        if (size <= mmFilepoolDownloadThreshold || (isWifi && size <= mmFilepoolWifiDownloadThreshold)) {
                            self.addToQueueByUrl(siteId, fileUrl, component, componentId, timemodified);
                        }
                    }
                });
            } else {
                self.addToQueueByUrl(siteId, fileUrl, component, componentId, timemodified);
            }
        }
    };
        self._getFilePath = function(siteId, fileId) {
        return $mmFS.getSiteFolder(siteId) + '/' + mmFilepoolFolder + '/' + fileId;
    };
        self.getFilePathByUrl = function(siteId, fileUrl) {
        return self._fixPluginfileURL(siteId, fileUrl).then(function(fileUrl) {
            var fileId = self._getFileIdByUrl(fileUrl);
            return self._getFilePath(siteId, fileId);
        });
    };
        self.getFileStateByUrl = function(siteId, fileUrl, timemodified) {
        var fileId,
            revision;
        return self._fixPluginfileURL(siteId, fileUrl).then(function(fixedUrl) {
            fileUrl = fixedUrl;
            timemodified = timemodified || 0;
            revision = self.getRevisionFromUrl(fileUrl);
            fileId = self._getFileIdByUrl(fileUrl);
            return self._restoreOldFileIfNeeded(siteId, fileId, fileUrl);
        }).then(function() {
            return self._hasFileInQueue(siteId, fileId).then(function() {
                return mmCoreDownloading;
            }, function() {
                return self._hasFileInPool(siteId, fileId).then(function(fileObject) {
                    if (self._isFileOutdated(fileObject, revision, timemodified)) {
                        return mmCoreOutdated;
                    } else {
                        return mmCoreDownloaded;
                    }
                }, function() {
                    return mmCoreNotDownloaded;
                });
            });
        });
    };
        self._getInternalSrcById = function(siteId, fileId) {
        if ($mmFS.isAvailable()) {
            return $mmFS.getFile(self._getFilePath(siteId, fileId)).then(function(fileEntry) {
                return $mmFS.getInternalURL(fileEntry);
            });
        }
        return $q.reject();
    };
        self._getInternalUrlById = function(siteId, fileId) {
        if ($mmFS.isAvailable()) {
            return $mmFS.getFile(self._getFilePath(siteId, fileId)).then(function(fileEntry) {
                return fileEntry.toURL();
            });
        }
        return $q.reject();
    };
        self._getInternalUrlByPath = function(filePath) {
        if ($mmFS.isAvailable()) {
            return $mmFS.getFile(filePath).then(function(fileEntry) {
                return fileEntry.toURL();
            });
        }
        return $q.reject();
    };
        self.getPackageDirPathByUrl = function(siteId, url) {
        return self._fixPluginfileURL(siteId, url).then(function(fixedUrl) {
            var fileId = self._getNonReadableFileIdByUrl(fixedUrl);
            return self._getFilePath(siteId, fileId);
        });
    };
        self.getPackageDirUrlByUrl = function(siteId, url) {
        if ($mmFS.isAvailable()) {
            return self._fixPluginfileURL(siteId, url).then(function(fixedUrl) {
                var fileId = self._getNonReadableFileIdByUrl(fixedUrl);
                return $mmFS.getDir(self._getFilePath(siteId, fileId)).then(function(dirEntry) {
                    return dirEntry.toURL();
                });
            });
        }
        return $q.reject();
    };
        self.getRevisionFromFileList = function(files) {
        var revision = 0;
        angular.forEach(files, function(file) {
            if (file.fileurl) {
                var r = self.getRevisionFromUrl(file.fileurl);
                if (r > revision) {
                    revision = r;
                }
            }
        });
        return revision;
    };
        self.getRevisionFromUrl = function(url) {
        var matches = url.match(revisionRegex);
        if (matches && typeof matches[1] != 'undefined') {
            return parseInt(matches[1]);
        }
    };
        self.getSrcByUrl = function(siteId, fileUrl, component, componentId, timemodified, checkSize) {
        return self._getFileUrlByUrl(siteId, fileUrl, 'src', component, componentId, timemodified, checkSize);
    };
        self.getTimemodifiedFromFileList = function(files) {
        var timemod = 0;
        angular.forEach(files, function(file) {
            if (file.timemodified > timemod) {
                timemod = file.timemodified;
            }
        });
        return timemod;
    };
        self.getUrlByUrl = function(siteId, fileUrl, component, componentId, timemodified, checkSize) {
        return self._getFileUrlByUrl(siteId, fileUrl, 'url', component, componentId, timemodified, checkSize);
    };
        self._guessExtensionFromUrl = function(fileUrl) {
        var split = fileUrl.split('.'),
            candidate,
            extension;
        if (split.length > 1) {
            candidate = split.pop().toLowerCase();
            if (extensionRegex.test(candidate)) {
                extension = candidate;
            }
        }
        return extension;
    };
        self._guessFilenameFromUrl = function(fileUrl) {
        var filename = '';
        if (fileUrl.indexOf('/webservice/pluginfile') !== -1) {
            var params = $mmUtil.extractUrlParams(fileUrl);
            if (params.file) {
                filename = params.file.substr(params.file.lastIndexOf('/') + 1);
            } else {
                filename = $mmText.getLastFileWithoutParams(fileUrl);
            }
        } else if ($mmUtil.isGravatarUrl(fileUrl)) {
            filename = 'gravatar_' + $mmText.getLastFileWithoutParams(fileUrl);
        } else if ($mmUtil.isThemeImageUrl(fileUrl)) {
            var matches = fileUrl.match(/clean\/core\/([^\/]*)\//);
            if (matches && matches[1]) {
                filename = matches[1];
            }
            filename = 'default_' + filename + '_' + $mmText.getLastFileWithoutParams(fileUrl);
        } else {
            filename = $mmText.getLastFileWithoutParams(fileUrl);
        }
        var position = filename.lastIndexOf('.');
        if (position != -1) {
            filename = filename.substr(0, position);
        }
        return $mmText.removeSpecialCharactersForFiles(filename);
    };
        self.invalidateAllFiles = function(siteId) {
        return getSiteDb(siteId).then(function(db) {
            return db.getAll(mmFilepoolStore).then(function(items) {
                var promises = [];
                angular.forEach(items, function(item) {
                    item.stale = true;
                    promises.push(db.insert(mmFilepoolStore, item));
                });
                return $q.all(promises);
            });
        });
    };
        self.invalidateFileByUrl = function(siteId, fileUrl) {
        return self._fixPluginfileURL(siteId, fileUrl).then(function(fileUrl) {
            var fileId = self._getFileIdByUrl(fileUrl);
            return getSiteDb(siteId).then(function(db) {
                return db.get(mmFilepoolStore, fileId).then(function(fileObject) {
                    if (!fileObject) {
                        return;
                    }
                    fileObject.stale = true;
                    return db.insert(mmFilepoolStore, fileObject);
                });
            });
        });
    };
        self.invalidateFilesByComponent = function(siteId, component, componentId) {
        var values = { stale: true },
            where;
        if (typeof componentId !== 'undefined') {
            where = ['componentAndId', '=', [component, self._fixComponentId(componentId)]];
        } else {
            where = ['component', '=', component];
        }
        return getSiteDb(siteId).then(function(db) {
            return db.query(mmFilepoolLinksStore, where).then(function(items) {
                var promise,
                    promises = [];
                angular.forEach(items, function(item) {
                    promise = db.get(mmFilepoolStore, item.fileId).then(function(fileEntry) {
                        if (!fileEntry) {
                            return;
                        }
                        fileEntry.stale = true;
                        return db.insert(mmFilepoolStore, fileEntry);
                    });
                    promises.push(promise);
                });
                return $q.all(promises);
            });
        });
    };
        self.isFileDownloadingByUrl = function(siteId, fileUrl) {
        return self._fixPluginfileURL(siteId, fileUrl).then(function(fileUrl) {
            fileId = self._getFileIdByUrl(fileUrl);
            return self._hasFileInQueue(siteId, fileId);
        });
    };
        self._isFileOutdated = function(fileObject, revision, timemodified) {
        return fileObject.stale || revision > fileObject.revision || timemodified > fileObject.timemodified;
    };
        self._notifyFileDownloaded = function(siteId, fileId) {
        $mmEvents.trigger(self._getFileEventName(siteId, fileId), {success: true});
    };
        self._notifyFileDownloadError = function(siteId, fileId) {
        $mmEvents.trigger(self._getFileEventName(siteId, fileId), {success: false});
    };
        self.prefetchPackage = function(siteId, fileList, component, componentId, revision, timemodified, dirPath) {
        return self._downloadOrPrefetchPackage(siteId, fileList, true, component, componentId, revision, timemodified, dirPath);
    };
        self._processQueue = function() {
        var deferred = $q.defer(),
            promise;
        if (queueState !== QUEUE_RUNNING) {
            deferred.reject(ERR_QUEUE_ON_PAUSE);
            promise = deferred.promise;
        } else if (!$mmFS.isAvailable() || !$mmApp.isOnline()) {
            deferred.reject(ERR_FS_OR_NETWORK_UNAVAILABLE);
            promise = deferred.promise;
        } else {
            promise = self._processImportantQueueItem();
        }
        promise.then(function() {
            $timeout(self._processQueue, mmFilepoolQueueProcessInterval);
        }, function(error) {
            if (error === ERR_FS_OR_NETWORK_UNAVAILABLE) {
                $log.debug('Filesysem or network unavailable, pausing queue processing.');
            } else if (error === ERR_QUEUE_IS_EMPTY) {
                $log.debug('Queue is empty, pausing queue processing.');
                $mmEvents.trigger(mmCoreEventQueueEmpty);
            }
            queueState = QUEUE_PAUSED;
        });
    };
        self._processImportantQueueItem = function() {
        return $mmApp.getDB().query(mmFilepoolQueueStore, undefined, 'sortorder', undefined, 1)
        .then(function(items) {
            var item = items.pop();
            if (!item) {
                return $q.reject(ERR_QUEUE_IS_EMPTY);
            }
            return self._processQueueItem(item);
        }, function() {
            return $q.reject(ERR_QUEUE_IS_EMPTY);
        });
    };
        self._processQueueItem = function(item) {
        var siteId = item.siteId,
            fileId = item.fileId,
            fileUrl = item.url,
            revision = item.revision,
            timemodified = item.timemodified,
            filePath = item.path,
            links = item.links || [];
        $log.debug('Processing queue item: ' + siteId + ', ' + fileId);
        return getSiteDb(siteId).then(function(db) {
            return db.get(mmFilepoolStore, fileId).then(function(fileObject) {
                if (fileObject && !self._isFileOutdated(fileObject, revision, timemodified)) {
                    $log.debug('Queued file already in store, ignoring...');
                    self._addFileLinks(siteId, fileId, links);
                    self._removeFromQueue(siteId, fileId).finally(function() {
                        self._treatQueueDeferred(siteId, fileId, true);
                    });
                    self._notifyFileDownloaded(siteId, fileId);
                    return;
                }
                return download(siteId, fileUrl, fileObject, links);
            }, function() {
                return download(siteId, fileUrl, undefined, links);
            });
        }, function() {
            $log.debug('Item dropped from queue due to site DB not retrieved: ' + fileUrl);
            return self._removeFromQueue(siteId, fileId).catch(function() {}).finally(function() {
                self._treatQueueDeferred(siteId, fileId, false);
                self._notifyFileDownloadError(siteId, fileId);
            });
        });
                function download(siteId, fileUrl, fileObject, links) {
            return self._restoreOldFileIfNeeded(siteId, fileId, fileUrl, filePath).then(function() {
                return self._downloadForPoolByUrl(siteId, fileUrl, revision, timemodified, filePath, fileObject).then(function() {
                    var promise;
                    self._addFileLinks(siteId, fileId, links);
                    promise = self._removeFromQueue(siteId, fileId);
                    self._treatQueueDeferred(siteId, fileId, true);
                    self._notifyFileDownloaded(siteId, fileId);
                    return promise.catch(function() {});
                }, function(errorObject) {
                    var dropFromQueue = false;
                    if (typeof errorObject !== 'undefined' && errorObject.source === fileUrl) {
                        if (errorObject.code === 1) {
                            dropFromQueue = true;
                        } else if (errorObject.code === 2) {
                            dropFromQueue = true;
                        } else if (errorObject.code === 3) {
                            dropFromQueue = true;
                        } else if (errorObject.code === 4) {
                        } else if (errorObject.code === 5) {
                            dropFromQueue = true;
                        } else {
                            dropFromQueue = true;
                        }
                    } else {
                        dropFromQueue = true;
                    }
                    if (dropFromQueue) {
                        var promise;
                        $log.debug('Item dropped from queue due to error: ' + fileUrl);
                        promise = self._removeFromQueue(siteId, fileId);
                        return promise.catch(function() {}).finally(function() {
                            self._treatQueueDeferred(siteId, fileId, false);
                            self._notifyFileDownloadError(siteId, fileId);
                        });
                    } else {
                        self._treatQueueDeferred(siteId, fileId, false);
                        self._notifyFileDownloadError(siteId, fileId);
                        return $q.reject();
                    }
                }, function(progress) {
                    if (queueDeferreds[siteId] && queueDeferreds[siteId][fileId]) {
                        queueDeferreds[siteId][fileId].notify(progress);
                    }
                });
            });
        }
    };
        self._removeFromQueue = function(siteId, fileId) {
        return $mmApp.getDB().remove(mmFilepoolQueueStore, [siteId, fileId]);
    };
        self._removeFileById = function(siteId, fileId) {
        return getSiteDb(siteId).then(function(db) {
            var p1, p2, p3;
            p1 = db.remove(mmFilepoolStore, fileId);
            p2 = db.where(mmFilepoolLinksStore, 'fileId', '=', fileId).then(function(entries) {
                return $q.all(entries.map(function(entry) {
                    return db.remove(mmFilepoolLinksStore, [entry.fileId, entry.component, entry.componentId]);
                }));
            });
            p3 = $mmFS.isAvailable() ? $mmFS.removeFile(self._getFilePath(siteId, fileId)) : $q.when();
            return $q.all([p1, p2, p3]);
        });
    };
        self.removeFilesByComponent = function(siteId, component, componentId) {
        var where;
        if (typeof componentId !== 'undefined') {
            where = ['componentAndId', '=', [component, self._fixComponentId(componentId)]];
        } else {
            where = ['component', '=', component];
        }
        return getSiteDb(siteId).then(function(db) {
            return db.query(mmFilepoolLinksStore, where);
        }).then(function(items) {
            return $q.all(items.map(function(item) {
                return self._removeFileById(siteId, item.fileId);
            }));
        });
    };
        self.removeFileByUrl = function(siteId, fileUrl) {
        return self._fixPluginfileURL(siteId, fileUrl).then(function(fileUrl) {
            var fileId = self._getFileIdByUrl(fileUrl);
            return self._restoreOldFileIfNeeded(siteId, fileId, fileUrl).then(function() {
                return self._removeFileById(siteId, fileId);
            });
        });
    };
        self._removeRevisionFromUrl = function(url) {
        return url.replace(revisionRegex, '/content/0/');
    };
        self._restoreOldFileIfNeeded = function(siteId, fileId, fileUrl, filePath) {
        var fileObject,
            oldFileId = self._getNonReadableFileIdByUrl(fileUrl);
        if (fileId == oldFileId) {
            return $q.when();
        }
        return self._hasFileInPool(siteId, fileId).catch(function() {
            return self._hasFileInPool(siteId, oldFileId).then(function(entry) {
                fileObject = entry;
                if (filePath) {
                    return $q.when();
                } else {
                    return $mmFS.copyFile(self._getFilePath(siteId, oldFileId), self._getFilePath(siteId, fileId));
                }
            }).then(function() {
                return self._addFileToPool(siteId, fileId, fileObject);
            }).then(function() {
                return self._getFileLinks(siteId, fileId).then(function(links) {
                    var promises = [];
                    angular.forEach(links, function(link) {
                        promises.push(self._addFileLink(siteId, fileId, link.component, link.componentId));
                    });
                    return $q.all(promises);
                });
            }).then(function() {
                return self._removeFileById(siteId, oldFileId);
            }).catch(function() {
            });
        });
    };
        self.setPackagePreviousStatus = function(siteId, component, componentId) {
        $log.debug('Set previous status for package ' + component + ' ' + componentId);
        return $mmSitesManager.getSite(siteId).then(function(site) {
            var db = site.getDb(),
                packageId = self.getPackageId(component, componentId);
            return db.get(mmFilepoolPackagesStore, packageId).then(function(entry) {
                entry.status = entry.previous || mmCoreNotDownloaded;
                entry.updated = new Date().getTime();
                $log.debug('Set status \'' + entry.status + '\' for package ' + component + ' ' + componentId);
                return db.insert(mmFilepoolPackagesStore, entry).then(function() {
                    self._triggerPackageStatusChanged(siteId, component, componentId, entry.status);
                    return entry.status;
                });
            });
        });
    };
        self.storePackageStatus = function(siteId, component, componentId, status, revision, timemodified) {
        $log.debug('Set status \'' + status + '\' for package ' + component + ' ' + componentId);
        revision = revision || 0;
        timemodified = timemodified || 0;
        return $mmSitesManager.getSite(siteId).then(function(site) {
            var db = site.getDb(),
                packageId = self.getPackageId(component, componentId);
            return db.get(mmFilepoolPackagesStore, packageId).then(function(entry) {
                return entry.status;
            }, function() {
                return undefined;
            }).then(function(previousStatus) {
                var promise;
                if (previousStatus === status) {
                    promise = $q.when();
                } else {
                    promise = db.insert(mmFilepoolPackagesStore, {
                        id: packageId,
                        component: component,
                        componentId: componentId,
                        status: status,
                        previous: previousStatus,
                        revision: revision,
                        timemodified: timemodified,
                        updated: new Date().getTime()
                    });
                }
                return promise.then(function() {
                    self._triggerPackageStatusChanged(siteId, component, componentId, status);
                });
            });
        });
    };
        self._treatQueueDeferred = function(siteId, fileId, resolve) {
        if (queueDeferreds[siteId] && queueDeferreds[siteId][fileId]) {
            if (resolve) {
                queueDeferreds[siteId][fileId].resolve();
            } else {
                queueDeferreds[siteId][fileId].reject();
            }
            delete queueDeferreds[siteId][fileId];
        }
    };
        self._triggerPackageStatusChanged = function(siteId, component, componentId, status) {
        var data = {
            siteid: siteId,
            component: component,
            componentId: componentId,
            status: status
        };
        $mmEvents.trigger(mmCoreEventPackageStatusChanged, data);
    };
    return self;
}])
.run(["$log", "$ionicPlatform", "$timeout", "$mmFilepool", function($log, $ionicPlatform, $timeout, $mmFilepool) {
    $log = $log.getInstance('$mmFilepool');
    $ionicPlatform.ready(function() {
        $timeout($mmFilepool.checkQueueProcessing, 1000);
    });
}]);

angular.module('mm.core')
.constant('mmFsSitesFolder', 'sites')
.constant('mmFsTmpFolder', 'tmp')
.factory('$mmFS', ["$ionicPlatform", "$cordovaFile", "$log", "$q", "$http", "$cordovaZip", "mmFsSitesFolder", "mmFsTmpFolder", function($ionicPlatform, $cordovaFile, $log, $q, $http, $cordovaZip, mmFsSitesFolder, mmFsTmpFolder) {
    $log = $log.getInstance('$mmFS');
    var self = {},
        initialized = false,
        basePath = '',
        isHTMLAPI = false,
        mimeTypes = {};
    $http.get('core/assets/mimetypes.json').then(function(response) {
        mimeTypes = response.data;
    }, function() {
    });
    self.FORMATTEXT         = 0;
    self.FORMATDATAURL      = 1;
    self.FORMATBINARYSTRING = 2;
    self.FORMATARRAYBUFFER  = 3;
        self.setHTMLBasePath = function(path) {
        isHTMLAPI = true;
        basePath = path;
    };
        self.usesHTMLAPI = function() {
        return isHTMLAPI;
    };
        self.init = function() {
        var deferred = $q.defer();
        if (initialized) {
            deferred.resolve();
            return deferred.promise;
        }
        $ionicPlatform.ready(function() {
            if (ionic.Platform.isAndroid()) {
                basePath = cordova.file.externalApplicationStorageDirectory;
            } else if (ionic.Platform.isIOS()) {
                basePath = cordova.file.documentsDirectory;
            } else if (!self.isAvailable() || basePath === '') {
                $log.error('Error getting device OS.');
                deferred.reject();
                return;
            }
            initialized = true;
            $log.debug('FS initialized: '+basePath);
            deferred.resolve();
        });
        return deferred.promise;
    };
        self.isAvailable = function() {
        return typeof window.resolveLocalFileSystemURL !== 'undefined' && typeof FileTransfer !== 'undefined';
    };
        self.getFile = function(path) {
        return self.init().then(function() {
            $log.debug('Get file: '+path);
            return $cordovaFile.checkFile(basePath, path);
        });
    };
        self.getDir = function(path) {
        return self.init().then(function() {
            $log.debug('Get directory: '+path);
            return $cordovaFile.checkDir(basePath, path);
        });
    };
        self.getSiteFolder = function(siteId) {
        return mmFsSitesFolder + '/' + siteId;
    };
        function create(isDirectory, path, failIfExists, base) {
        return self.init().then(function() {
            base = base || basePath;
            if (path.indexOf('/') == -1) {
                if (isDirectory) {
                    $log.debug('Create dir ' + path + ' in ' + base);
                    return $cordovaFile.createDir(base, path, !failIfExists);
                } else {
                    $log.debug('Create file ' + path + ' in ' + base);
                    return $cordovaFile.createFile(base, path, !failIfExists);
                }
            } else {
                var firstDir = path.substr(0, path.indexOf('/'));
                var restOfPath = path.substr(path.indexOf('/') + 1);
                $log.debug('Create dir ' + firstDir + ' in ' + base);
                return $cordovaFile.createDir(base, firstDir, true).then(function(newDirEntry) {
                    return create(isDirectory, restOfPath, failIfExists, newDirEntry.toURL());
                }, function(error) {
                    $log.error('Error creating directory ' + firstDir + ' in ' + base);
                    return $q.reject(error);
                });
            }
        });
    }
        self.createDir = function(path, failIfExists) {
        failIfExists = failIfExists || false;
        return create(true, path, failIfExists);
    };
        self.createFile = function(path, failIfExists) {
        failIfExists = failIfExists || false;
        return create(false, path, failIfExists);
    };
        self.removeDir = function(path) {
        return self.init().then(function() {
            $log.debug('Remove directory: ' + path);
            return $cordovaFile.removeRecursively(basePath, path);
        });
    };
        self.removeFile = function(path) {
        return self.init().then(function() {
            $log.debug('Remove file: ' + path);
            return $cordovaFile.removeFile(basePath, path);
        });
    };
        self.getDirectoryContents = function(path) {
        $log.debug('Get contents of dir: ' + path);
        return self.getDir(path).then(function(dirEntry) {
            var deferred = $q.defer();
            var directoryReader = dirEntry.createReader();
            directoryReader.readEntries(deferred.resolve, deferred.reject);
            return deferred.promise;
        });
    };
        function getSize(entry) {
        var deferred = $q.defer();
        if (entry.isDirectory) {
            var directoryReader = entry.createReader();
            directoryReader.readEntries(function(entries) {
                var promises = [];
                for (var i = 0; i < entries.length; i++) {
                    promises.push(getSize(entries[i]));
                }
                $q.all(promises).then(function(sizes) {
                    var directorySize = 0;
                    for (var i = 0; i < sizes.length; i++) {
                        var fileSize = parseInt(sizes[i]);
                        if (isNaN(fileSize)) {
                            deferred.reject();
                            return;
                        }
                        directorySize += fileSize;
                    }
                    deferred.resolve(directorySize);
                }, deferred.reject);
            }, deferred.reject);
        } else if (entry.isFile) {
            entry.file(function(file) {
                deferred.resolve(file.size);
            }, deferred.reject);
        }
        return deferred.promise;
    }
        self.getDirectorySize = function(path) {
        $log.debug('Get size of dir: ' + path);
        return self.getDir(path).then(function(dirEntry) {
           return getSize(dirEntry);
        });
    };
        self.getFileSize = function(path) {
        $log.debug('Get size of file: ' + path);
        return self.getFile(path).then(function(fileEntry) {
           return getSize(fileEntry);
        });
    };
        self.getFileObjectFromFileEntry = function(entry) {
        $log.debug('Get file object of: ' + entry.fullPath);
        var deferred = $q.defer();
        entry.file(function(file) {
            deferred.resolve(file);
        }, deferred.reject);
        return deferred.promise;
    };
        self.calculateFreeSpace = function() {
        if (ionic.Platform.isIOS() || isHTMLAPI) {
            if (window.requestFileSystem) {
                var iterations = 0,
                    maxIterations = 50,
                    deferred = $q.defer();
                function calculateByRequest(size, ratio) {
                    var deferred = $q.defer();
                    window.requestFileSystem(LocalFileSystem.PERSISTENT, size, function() {
                        iterations++;
                        if (iterations > maxIterations) {
                            deferred.resolve(size);
                            return;
                        }
                        calculateByRequest(size * ratio, ratio).then(deferred.resolve);
                    }, function() {
                        deferred.resolve(size / ratio);
                    });
                    return deferred.promise;
                };
                calculateByRequest(1048576, 1.3).then(function(size) {
                    iterations = 0;
                    maxIterations = 10;
                    calculateByRequest(size, 1.1).then(deferred.resolve);
                });
                return deferred.promise;
            } else {
                return $q.reject();
            }
        } else {
            return $cordovaFile.getFreeDiskSpace().then(function(size) {
                return size * 1024;
            });
        }
    };
        self.normalizeFileName = function(filename) {
        filename = decodeURIComponent(filename);
        return filename;
    };
        self.readFile = function(path, format) {
        format = format || self.FORMATTEXT;
        $log.debug('Read file ' + path + ' with format '+format);
        switch (format) {
            case self.FORMATDATAURL:
                return $cordovaFile.readAsDataURL(basePath, path);
            case self.FORMATBINARYSTRING:
                return $cordovaFile.readAsBinaryString(basePath, path);
            case self.FORMATARRAYBUFFER:
                return $cordovaFile.readAsArrayBuffer(basePath, path);
            default:
                return $cordovaFile.readAsText(basePath, path);
        }
    };
        self.readFileData = function(fileData, format) {
        format = format || self.FORMATTEXT;
        $log.debug('Read file from file data with format '+format);
        var deferred = $q.defer();
        var reader = new FileReader();
        reader.onloadend = function(evt) {
            if (evt.target.result !== undefined || evt.target.result !== null) {
                deferred.resolve(evt.target.result);
            } else if (evt.target.error !== undefined || evt.target.error !== null) {
                deferred.reject(evt.target.error);
            } else {
                deferred.reject({code: null, message: 'READER_ONLOADEND_ERR'});
            }
        };
        switch (format) {
            case self.FORMATDATAURL:
                reader.readAsDataURL(fileData);
                break;
            case self.FORMATBINARYSTRING:
                reader.readAsBinaryString(fileData);
                break;
            case self.FORMATARRAYBUFFER:
                reader.readAsArrayBuffer(fileData);
                break;
            default:
                reader.readAsText(fileData);
        }
        return deferred.promise;
    };
        self.writeFile = function(path, data) {
        $log.debug('Write file: ' + path);
        return self.init().then(function() {
            return self.createFile(path).then(function(fileEntry) {
                if (isHTMLAPI && typeof data == 'string') {
                    var type = self.getMimeType(self.getFileExtension(path));
                    data = new Blob([data], {type: type || 'text/plain'});
                }
                return $cordovaFile.writeFile(basePath, path, data, true).then(function() {
                    return fileEntry;
                });
            });
        });
    };
        self.getExternalFile = function(fullPath) {
        return $cordovaFile.checkFile(fullPath, '');
    };
        self.removeExternalFile = function(fullPath) {
        var directory = fullPath.substring(0, fullPath.lastIndexOf('/') );
        var filename = fullPath.substr(fullPath.lastIndexOf('/') + 1);
        return $cordovaFile.removeFile(directory, filename);
    };
        self.getBasePath = function() {
        return self.init().then(function() {
            if (basePath.slice(-1) == '/') {
                return basePath;
            } else {
                return basePath + '/';
            }
        });
    };
        self.getBasePathToDownload = function() {
        return self.init().then(function() {
            if (ionic.Platform.isIOS()) {
                return $cordovaFile.checkDir(basePath, '').then(function(dirEntry) {
                    return dirEntry.toInternalURL();
                });
            } else {
                return basePath;
            }
        });
    };
        self.getTmpFolder = function() {
        return mmFsTmpFolder;
    };
        self.moveFile = function(originalPath, newPath) {
        return self.init().then(function() {
            if (isHTMLAPI) {
                var commonPath = basePath,
                    dirsA = originalPath.split('/'),
                    dirsB = newPath.split('/');
                for (var i = 0; i < dirsA.length; i++) {
                    var dir = dirsA[i];
                    if (dirsB[i] === dir) {
                        dir = dir + '/';
                        commonPath = self.concatenatePaths(commonPath, dir);
                        originalPath = originalPath.replace(dir, '');
                        newPath = newPath.replace(dir, '');
                    } else {
                        break;
                    }
                }
                return $cordovaFile.moveFile(commonPath, originalPath, commonPath, newPath);
            } else {
                return $cordovaFile.moveFile(basePath, originalPath, basePath, newPath);
            }
        });
    };
        self.copyFile = function(from, to) {
        return self.init().then(function() {
            if (isHTMLAPI) {
                var commonPath = basePath,
                    dirsA = from.split('/'),
                    dirsB = to.split('/');
                for (var i = 0; i < dirsA.length; i++) {
                    var dir = dirsA[i];
                    if (dirsB[i] === dir) {
                        dir = dir + '/';
                        commonPath = self.concatenatePaths(commonPath, dir);
                        from = from.replace(dir, '');
                        to = to.replace(dir, '');
                    } else {
                        break;
                    }
                }
                return $cordovaFile.copyFile(commonPath, from, commonPath, to);
            } else {
                var toFile = self.getFileAndDirectoryFromPath(to);
                if (toFile.directory == '') {
                    return $cordovaFile.copyFile(basePath, from, basePath, to);
                } else {
                    return self.createDir(toFile.directory).then(function() {
                        return $cordovaFile.copyFile(basePath, from, basePath, to);
                    });
                }
            }
        });
    };
        self.getFileAndDirectoryFromPath = function(path) {
        var file = {
            directory: '',
            name: ''
        };
        file.directory = path.substring(0, path.lastIndexOf('/') );
        file.name = path.substr(path.lastIndexOf('/') + 1);
        return file;
    };
        self.concatenatePaths = function(leftPath, rightPath) {
        var lastCharLeft = leftPath.slice(-1),
            firstCharRight = rightPath.charAt(0);
        if (lastCharLeft === '/' && firstCharRight === '/') {
            return leftPath + rightPath.substr(1);
        } else if(lastCharLeft !== '/' && firstCharRight !== '/') {
            return leftPath + '/' + rightPath;
        } else {
            return leftPath + rightPath;
        }
    };
        self.getInternalURL = function(fileEntry) {
        if (isHTMLAPI) {
            return fileEntry.toURL();
        }
        return fileEntry.toInternalURL();
    };
        self.getFileIcon = function(filename) {
        var ext = self.getFileExtension(filename),
            icon;
        if (ext && mimeTypes[ext] && mimeTypes[ext].icon) {
            icon = mimeTypes[ext].icon + '-64.png';
        } else {
            icon = 'unknown-64.png';
        }
        return 'img/files/' + icon;
    };
        self.getFolderIcon = function() {
        return 'img/files/folder-64.png';
    };
        self.getFileExtension = function(filename) {
        var dot = filename.lastIndexOf("."),
            ext;
        if (dot > -1) {
            ext = filename.substr(dot + 1).toLowerCase();
        }
        return ext;
    };
        self.getMimeType = function(extension) {
        if (mimeTypes[extension] && mimeTypes[extension].type) {
            return mimeTypes[extension].type;
        }
    };
        self.removeExtension = function(path) {
        var index = path.lastIndexOf('.');
        if (index > -1) {
            return path.substr(0, index);
        }
        return path;
    };
        self.addBasePathIfNeeded = function(path) {
        if (path.indexOf(basePath) > -1) {
            return path;
        } else {
            return self.concatenatePaths(basePath, path);
        }
    };
        self.unzipFile = function(path, destFolder) {
        return self.getFile(path).then(function(fileEntry) {
            destFolder = self.addBasePathIfNeeded(destFolder || self.removeExtension(path));
            return $cordovaZip.unzip(fileEntry.toURL(), destFolder);
        });
    };
    return self;
}]);

angular.module('mm.core')
.factory('$mmGroups', ["$log", "$q", "$mmSite", "$mmSitesManager", function($log, $q, $mmSite, $mmSitesManager) {
    $log = $log.getInstance('$mmGroups');
    self.NOGROUPS       = 0;
    self.SEPARATEGROUPS = 1;
    self.VISIBLEGROUPS  = 2;
        self.getActivityAllowedGroups = function(cmid, userid, siteId) {
        userid = userid || $mmSite.getUserId();
        siteId = siteId || $mmSite.getId();
        return $mmSitesManager.getSite(siteId).then(function(site) {
            var params = {
                    cmid: cmid,
                    userid: userid
                },
                preSets = {
                    cacheKey: getActivityAllowedGroupsCacheKey(cmid, userid)
                };
            return site.read('core_group_get_activity_allowed_groups', params, preSets).then(function(response) {
                if (!response || !response.groups) {
                    return $q.reject();
                }
                return response.groups;
            });
        });
    };
        function getActivityAllowedGroupsCacheKey(cmid, userid) {
        return 'mmGroups:allowedgroups:' + cmid + ':' + userid;
    }
        self.getActivityGroupMode = function(cmid, siteId) {
        siteId = siteId || $mmSite.getId();
        return $mmSitesManager.getSite(siteId).then(function(site) {
            var params = {
                    cmid: cmid
                },
                preSets = {
                    cacheKey: getActivityGroupModeCacheKey(cmid)
                };
            return site.read('core_group_get_activity_groupmode', params, preSets).then(function(response) {
                if (!response || typeof response.groupmode == 'undefined') {
                    return $q.reject();
                }
                return response.groupmode;
            });
        });
    };
        function getActivityGroupModeCacheKey(cmid) {
        return 'mmGroups:groupmode:' + cmid;
    }
        self.getUserGroups = function(courses, refresh, siteid, userid) {
        var promises = [],
            groups = [],
            deferred = $q.defer();
        angular.forEach(courses, function(course) {
            var courseid;
            if (typeof course == 'object') {
                courseid = course.id;
            } else {
                courseid = course;
            }
            var promise = self.getUserGroupsInCourse(courseid, refresh, siteid, userid).then(function(coursegroups) {
                groups = groups.concat(coursegroups);
            });
            promises.push(promise);
        });
        $q.all(promises).finally(function() {
            deferred.resolve(groups);
        });
        return deferred.promise;
    };
        self.getUserGroupsInCourse = function(courseid, refresh, siteid, userid) {
        siteid = siteid || $mmSite.getId();
        return $mmSitesManager.getSite(siteid).then(function(site) {
            var presets = {},
                data = {
                    userid: userid || site.getUserId(),
                    courseid: courseid
                };
            if (refresh) {
                presets.getFromCache = false;
            }
            return site.read('core_group_get_course_user_groups', data, presets).then(function(response) {
                if (response && response.groups) {
                    return response.groups;
                } else {
                    return $q.reject();
                }
            });
        });
    };
        self.invalidateActivityAllowedGroups = function(cmid, userid) {
        userid = userid || $mmSite.getUserId();
        return $mmSite.invalidateWsCacheForKey(getActivityAllowedGroupsCacheKey(cmid, userid));
    };
        self.invalidateActivityGroupMode = function(cmid) {
        return $mmSite.invalidateWsCacheForKey(getActivityGroupModeCacheKey(cmid));
    };
    return self;
}]);

angular.module('mm.core')
.constant('mmInitDelegateDefaultPriority', 100)
.constant('mmInitDelegateMaxAddonPriority', 599)
.provider('$mmInitDelegate', ["mmInitDelegateDefaultPriority", function(mmInitDelegateDefaultPriority) {
    var initProcesses = {},
        self = {};
        self.registerProcess = function(name, callable, priority, blocking) {
        priority = typeof priority === 'undefined' ? mmInitDelegateDefaultPriority : priority;
        if (typeof initProcesses[name] !== 'undefined') {
            console.log('$mmInitDelegateProvider: Process \'' + name + '\' already defined.');
            return;
        }
        console.log('$mmInitDelegateProvider: Registered process \'' + name + '\'.');
        initProcesses[name] = {
            blocking: blocking,
            callable: callable,
            name: name,
            priority: priority
        };
    };
    self.$get = ["$q", "$log", "$injector", "$mmUtil", function($q, $log, $injector, $mmUtil) {
        $log = $log.getInstance('$mmInitDelegate');
        var self = {},
            readiness;
                function prepareProcess(data) {
            return function() {
                var promise,
                    fn;
                $log.debug('Executing init process \'' + data.name + '\'');
                try {
                    fn = $mmUtil.resolveObject(data.callable);
                } catch (e) {
                    $log.error('Could not resolve object of init process \'' + data.name + '\'. ' + e);
                    return;
                }
                try {
                    promise = fn($injector);
                } catch (e) {
                    $log.error('Error while calling the init process \'' + data.name + '\'. ' + e);
                    return;
                }
                return promise;
            };
        }
                self.executeInitProcesses = function() {
            var ordered = [],
                promises = [],
                dependency = $q.when();
            if (typeof readiness === 'undefined') {
                readiness = $q.defer();
            }
            angular.forEach(initProcesses, function(data) {
                ordered.push(data);
            });
            ordered.sort(function(a, b) {
                return b.priority - a.priority;
            });
            angular.forEach(ordered, function(data) {
                var promise;
                promise = dependency.finally(prepareProcess(data));
                promises.push(promise);
                if (data.blocking) {
                    dependency = promise;
                }
            });
            $q.all(promises).finally(readiness.resolve);
        };
                self.ready = function() {
            if (typeof readiness === 'undefined') {
                readiness = $q.defer();
            }
            return readiness.promise;
        };
        return self;
    }];
    return self;
}]);

angular.module('ionic').directive('ionRadioFix', function() {
  return {
    restrict: 'E',
    replace: true,
    require: '?ngModel',
    transclude: true,
    template:
      '<label class="item item-radio">' +
        '<input type="radio" name="radio-group">' +
        '<div class="radio-content">' +
          '<div class="item-content disable-pointer-events" ng-transclude></div>' +
          '<i class="radio-icon disable-pointer-events icon ion-checkmark"></i>' +
        '</div>' +
      '</label>',
    compile: function(element, attr) {
      if (attr.icon) {
        var iconElm = element.find('i');
        iconElm.removeClass('ion-checkmark').addClass(attr.icon);
      }
      var input = element.find('input');
      angular.forEach({
          'name': attr.name,
          'value': attr.value,
          'disabled': attr.disabled,
          'ng-value': attr.ngValue,
          'ng-model': attr.ngModel,
          'ng-disabled': attr.ngDisabled,
          'ng-change': attr.ngChange,
          'ng-required': attr.ngRequired,
          'required': attr.required
      }, function(value, name) {
        if (angular.isDefined(value)) {
            input.attr(name, value);
          }
      });
      return function(scope, element, attr) {
        scope.getValue = function() {
          return scope.ngValue || attr.value;
        };
      };
    }
  };
});
angular.module('mm.core')
.factory('$mmLang', ["$translate", "$translatePartialLoader", "$mmConfig", "$cordovaGlobalization", "$q", "mmCoreConfigConstants", function($translate, $translatePartialLoader, $mmConfig, $cordovaGlobalization, $q, mmCoreConfigConstants) {
    var self = {},
        currentLanguage;
        self.registerLanguageFolder = function(path) {
        $translatePartialLoader.addPart(path);
        return $translate.refresh();
    };
        self.getCurrentLanguage = function() {
        if (typeof currentLanguage != 'undefined') {
            return $q.when(currentLanguage);
        }
        return $mmConfig.get('current_language').then(function(language) {
            return language;
        }, function() {
            try {
                return $cordovaGlobalization.getPreferredLanguage().then(function(result) {
                    var language = result.value.toLowerCase();
                    if (language.indexOf('-') > -1) {
                        if (mmCoreConfigConstants.languages && typeof mmCoreConfigConstants.languages[language] == 'undefined') {
                            language = language.substr(0, language.indexOf('-'));
                        }
                    }
                    return language;
                }, function() {
                    return mmCoreConfigConstants.default_lang || 'en';
                });
            } catch(err) {
                return mmCoreConfigConstants.default_lang || 'en';
            }
        }).then(function(language) {
            currentLanguage = language;
            return language;
        });
    };
        self.changeCurrentLanguage = function(language) {
        var p1 = $translate.use(language),
            p2 = $mmConfig.set('current_language', language);
        moment.locale(language);
        currentLanguage = language;
        return $q.all([p1, p2]);
    };
        self.translateAndReject = function(errorkey) {
        return $translate(errorkey).then(function(errorMessage) {
            return $q.reject(errorMessage);
        }, function() {
            return $q.reject(errorkey);
        });
    };
        self.translateAndRejectDeferred = function(deferred, errorkey) {
        $translate(errorkey).then(function(errorMessage) {
            deferred.reject(errorMessage);
        }, function() {
            deferred.reject(errorkey);
        });
    };
    return self;
}])
.config(["$translateProvider", "$translatePartialLoaderProvider", function($translateProvider, $translatePartialLoaderProvider) {
    $translateProvider.useLoader('$translatePartialLoader', {
        urlTemplate: '{part}/{lang}.json'
    });
    $translatePartialLoaderProvider.addPart('build/lang');
    $translateProvider.fallbackLanguage('en');
    $translateProvider.preferredLanguage('en');
}])
.run(["$ionicPlatform", "$translate", "$mmLang", function($ionicPlatform, $translate, $mmLang) {
    $ionicPlatform.ready(function() {
        $mmLang.getCurrentLanguage().then(function(language) {
            $translate.use(language);
            moment.locale(language);
        });
    });
}]);
angular.module('mm.core')
.constant('mmCoreNotificationsSitesStore', 'notification_sites')
.constant('mmCoreNotificationsComponentsStore', 'notification_components')
.constant('mmCoreNotificationsTriggeredStore', 'notifications_triggered')
.config(["$mmAppProvider", "mmCoreNotificationsSitesStore", "mmCoreNotificationsComponentsStore", "mmCoreNotificationsTriggeredStore", function($mmAppProvider, mmCoreNotificationsSitesStore, mmCoreNotificationsComponentsStore,
        mmCoreNotificationsTriggeredStore) {
    var stores = [
        {
            name: mmCoreNotificationsSitesStore,
            keyPath: 'id',
            indexes: [
                {
                    name: 'code',
                }
            ]
        },
        {
            name: mmCoreNotificationsComponentsStore,
            keyPath: 'id',
            indexes: [
                {
                    name: 'code',
                }
            ]
        },
        {
            name: mmCoreNotificationsTriggeredStore,
            keyPath: 'id',
            indexes: []
        }
    ];
    $mmAppProvider.registerStores(stores);
}])
.factory('$mmLocalNotifications', ["$log", "$cordovaLocalNotification", "$mmApp", "$q", "mmCoreNotificationsSitesStore", "mmCoreNotificationsComponentsStore", "mmCoreNotificationsTriggeredStore", function($log, $cordovaLocalNotification, $mmApp, $q,
        mmCoreNotificationsSitesStore, mmCoreNotificationsComponentsStore, mmCoreNotificationsTriggeredStore) {
    $log = $log.getInstance('$mmLocalNotifications');
    var self = {},
        observers = {},
        codes = {};
    var codeRequestsQueue = {};
        function getCode(store, id) {
        var db = $mmApp.getDB(),
            key = store + '#' + id;
        if (typeof codes[key] != 'undefined') {
            return $q.when(codes[key]);
        }
        return db.get(store, id).then(function(entry) {
            var code = parseInt(entry.code);
            codes[key] = code;
            return code;
        }, function() {
            return db.query(store, undefined, 'code', true).then(function(entries) {
                var newCode = 0;
                if (entries.length > 0) {
                    newCode = parseInt(entries[0].code) + 1;
                }
                return db.insert(store, {id: id, code: newCode}).then(function() {
                    codes[key] = newCode;
                    return newCode;
                });
            });
        });
    }
        function getSiteCode(siteid) {
        return requestCode(mmCoreNotificationsSitesStore, siteid);
    }
        function getComponentCode(component) {
        return requestCode(mmCoreNotificationsComponentsStore, component);
    }
        function getUniqueNotificationId(notificationid, component, siteid) {
        if (!siteid || !component) {
            return $q.reject();
        }
        return getSiteCode(siteid).then(function(sitecode) {
            return getComponentCode(component).then(function(componentcode) {
                return (sitecode * 100000000 + componentcode * 10000000 + parseInt(notificationid)) % 2147483647;
            });
        });
    }
        function processNextRequest() {
        var nextKey = Object.keys(codeRequestsQueue)[0],
            request,
            promise;
        if (typeof nextKey == 'undefined') {
            return;
        }
        request = codeRequestsQueue[nextKey];
        if (angular.isObject(request) && typeof request.store != 'undefined' && typeof request.id != 'undefined') {
            promise = getCode(request.store, request.id).then(function(code) {
                angular.forEach(request.promises, function(p) {
                    p.resolve(code);
                });
            }, function(error) {
                angular.forEach(request.promises, function(p) {
                    p.reject(error);
                });
            });
        } else {
            promise = $q.when();
        }
        promise.finally(function() {
            delete codeRequestsQueue[nextKey];
            processNextRequest();
        });
    }
        function requestCode(store, id) {
        var deferred = $q.defer(),
            key = store+'#'+id,
            isQueueEmpty = Object.keys(codeRequestsQueue).length == 0;
        if (typeof codeRequestsQueue[key] != 'undefined') {
            codeRequestsQueue[key].promises.push(deferred);
        } else {
            codeRequestsQueue[key] = {
                store: store,
                id: id,
                promises: [deferred]
            };
        }
        if (isQueueEmpty) {
            processNextRequest();
        }
        return deferred.promise;
    }
        self.cancel = function(id, component, siteid) {
        return getUniqueNotificationId(id, component, siteid).then(function(uniqueId) {
            return $cordovaLocalNotification.cancel(uniqueId);
        });
    };
        self.cancelSiteNotifications = function(siteid) {
        if (!self.isAvailable()) {
            return $q.when();
        } else if (!siteid) {
            return $q.reject();
        }
        return $cordovaLocalNotification.getAllScheduled().then(function(scheduled) {
            var ids = [];
            angular.forEach(scheduled, function(notif) {
                if (typeof notif.data == 'string') {
                    notif.data = JSON.parse(notif.data);
                }
                if (typeof notif.data == 'object' && notif.data.siteid === siteid) {
                    ids.push(notif.id);
                }
            });
            return $cordovaLocalNotification.cancel(ids);
        });
    };
        self.isAvailable = function() {
        return window.plugin && window.plugin.notification && window.plugin.notification.local ? true: false;
    };
        self.isTriggered = function(notification) {
        return $mmApp.getDB().get(mmCoreNotificationsTriggeredStore, notification.id).then(function(stored) {
            var notifTime = notification.at.getTime() / 1000;
            return stored.at === notifTime;
        }, function() {
            return false;
        });
    };
        self.notifyClick = function(data) {
        var component = data.component;
        if (component) {
            var callback = observers[component];
            if (typeof callback == 'function') {
                callback(data);
            }
        }
    };
        self.registerClick = function(component, callback) {
        $log.debug("Register observer '"+component+"' for notification click.");
        observers[component] = callback;
    };
        self.removeTriggered = function(id) {
        return $mmApp.getDB().remove(mmCoreNotificationsTriggeredStore, id);
    };
        self.schedule = function(notification, component, siteid) {
        return getUniqueNotificationId(notification.id, component, siteid).then(function(uniqueId) {
            notification.id = uniqueId;
            notification.data = notification.data || {};
            notification.data.component = component;
            notification.data.siteid = siteid;
            return self.isTriggered(notification).then(function(triggered) {
                if (!triggered) {
                    self.removeTriggered(notification.id);
                    return $cordovaLocalNotification.schedule(notification);
                }
            });
        });
    };
        self.trigger = function(notification) {
        var id = parseInt(notification.id);
        if (!isNaN(id)) {
            return $mmApp.getDB().insert(mmCoreNotificationsTriggeredStore, {
                id: id,
                at: parseInt(notification.at)
            });
        } else {
            return $q.reject();
        }
    };
    return self;
}])
.run(["$rootScope", "$log", "$mmLocalNotifications", "$mmEvents", "mmCoreEventSiteDeleted", function($rootScope, $log, $mmLocalNotifications, $mmEvents, mmCoreEventSiteDeleted) {
    $log = $log.getInstance('$mmLocalNotifications');
    $rootScope.$on('$cordovaLocalNotification:trigger', function(e, notification, state) {
        $mmLocalNotifications.trigger(notification);
    });
    $rootScope.$on('$cordovaLocalNotification:click', function(e, notification, state) {
        if (notification && notification.data) {
            $log.debug('Notification clicked: '+notification.data);
            var data = JSON.parse(notification.data);
            $mmLocalNotifications.notifyClick(data);
        }
    });
    $mmEvents.on(mmCoreEventSiteDeleted, function(site) {
        if (site) {
            $mmLocalNotifications.cancelSiteNotifications(site.id);
        }
    });
}]);

angular.module('mm.core')
.constant('mmCoreLogEnabledDefault', true)
.constant('mmCoreLogEnabledConfigName', 'debug_enabled')
.provider('$mmLog', ["mmCoreLogEnabledDefault", function(mmCoreLogEnabledDefault) {
    var isEnabled = mmCoreLogEnabledDefault,
        self = this;
    function prepareLogFn(logFn, className) {
        className = className || '';
        var enhancedLogFn = function() {
            if (isEnabled) {
                var args = Array.prototype.slice.call(arguments),
                    now  = moment().format('l LTS');
                args[0] = now + ' ' + className + ': ' + args[0];
                logFn.apply(null, args);
            }
        };
        enhancedLogFn.logs = [];
        return enhancedLogFn;
    }
        self.logDecorator = function($log) {
        var _$log = (function($log) {
            return {
                log   : $log.log,
                info  : $log.info,
                warn  : $log.warn,
                debug : $log.debug,
                error : $log.error
            };
        })($log);
        var getInstance = function(className) {
            return {
                log   : prepareLogFn(_$log.log, className),
                info  : prepareLogFn(_$log.info, className),
                warn  : prepareLogFn(_$log.warn, className),
                debug : prepareLogFn(_$log.debug, className),
                error : prepareLogFn(_$log.error, className)
            };
        };
        $log.log   = prepareLogFn($log.log);
        $log.info  = prepareLogFn($log.info);
        $log.warn  = prepareLogFn($log.warn);
        $log.debug = prepareLogFn($log.debug);
        $log.error = prepareLogFn($log.error);
        $log.getInstance = getInstance;
        return $log;
    };
    this.$get = ["$mmConfig", "mmCoreLogEnabledDefault", "mmCoreLogEnabledConfigName", function($mmConfig, mmCoreLogEnabledDefault, mmCoreLogEnabledConfigName) {
        var self = {};
                self.init = function() {
            $mmConfig.get(mmCoreLogEnabledConfigName).then(function(enabled) {
                isEnabled = enabled;
            }, function() {
                isEnabled = mmCoreLogEnabledDefault;
            });
        }
                self.enabled = function(flag) {
            $mmConfig.set(mmCoreLogEnabledConfigName, flag);
            isEnabled = flag;
        };
                self.isEnabled = function() {
            return isEnabled;
        };
        return self;
    }];
}])
.run(["$mmLog", function($mmLog) {
    $mmLog.init();
}]);

angular.module('mm.core')
.factory('$mmSite', ["$mmSitesManager", "$mmSitesFactory", function($mmSitesManager, $mmSitesFactory) {
    var self = {},
        siteMethods = $mmSitesFactory.getSiteMethods();
    angular.forEach(siteMethods, function(method) {
        self[method] = function() {
            var currentSite = $mmSitesManager.getCurrentSite();
            if (typeof currentSite == 'undefined') {
                return undefined;
            } else {
                return currentSite[method].apply(currentSite, arguments);
            }
        };
    });
        self.isLoggedIn = function() {
        var currentSite = $mmSitesManager.getCurrentSite();
        return typeof currentSite != 'undefined' && typeof currentSite.token != 'undefined' && currentSite.token != '';
    };
    return self;
}]);

angular.module('mm.core')
.value('mmCoreWSPrefix', 'local_mobile_')
.constant('mmCoreWSCacheStore', 'wscache')
.config(["$mmSitesFactoryProvider", "mmCoreWSCacheStore", function($mmSitesFactoryProvider, mmCoreWSCacheStore) {
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
}])
.provider('$mmSitesFactory', function() {
        var siteSchema = {
            stores: []
        },
        dboptions = {
            autoSchema: true
        };
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
        this.registerStores = function(stores) {
        var self = this;
        angular.forEach(stores, function(store) {
            self.registerStore(store);
        });
    };
        function storeExists(name) {
        var exists = false;
        angular.forEach(siteSchema.stores, function(store) {
            if (store.name === name) {
                exists = true;
            }
        });
        return exists;
    }
    this.$get = ["$http", "$q", "$mmWS", "$mmDB", "$log", "md5", "$mmApp", "$mmLang", "$mmUtil", "$mmFS", "mmCoreWSCacheStore", "mmCoreWSPrefix", "mmCoreSessionExpired", "$mmEvents", "mmCoreEventSessionExpired", "mmCoreUserDeleted", "mmCoreEventUserDeleted", "$mmText", "mmCoreConfigConstants", function($http, $q, $mmWS, $mmDB, $log, md5, $mmApp, $mmLang, $mmUtil, $mmFS, mmCoreWSCacheStore,
            mmCoreWSPrefix, mmCoreSessionExpired, $mmEvents, mmCoreEventSessionExpired, mmCoreUserDeleted, mmCoreEventUserDeleted,
            $mmText, mmCoreConfigConstants) {
        $log = $log.getInstance('$mmSite');
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
            "moodle_user_get_users_by_id": "core_user_get_users_by_id",
            "moodle_user_update_users": "core_user_update_users",
            "moodle_webservice_get_siteinfo": "core_webservice_get_site_info",
        };
        var self = {};
                function Site(id, siteurl, token, infos) {
            this.id = id;
            this.siteurl = siteurl;
            this.token = token;
            this.infos = infos;
            if (this.id) {
                this.db = $mmDB.getDB('Site-' + this.id, siteSchema, dboptions);
            }
        }
                Site.prototype.getId = function() {
            return this.id;
        };
                Site.prototype.getURL = function() {
            return this.siteurl;
        };
                Site.prototype.getToken = function() {
            return this.token;
        };
                Site.prototype.getInfo = function() {
            return this.infos;
        };
                Site.prototype.getDb = function() {
            return this.db;
        };
                Site.prototype.getUserId = function() {
            if (typeof this.infos != 'undefined' && typeof this.infos.userid != 'undefined') {
                return this.infos.userid;
            } else {
                return undefined;
            }
        };
                Site.prototype.setId = function(id) {
            this.id = id;
            this.db = $mmDB.getDB('Site-' + this.id, siteSchema, dboptions);
        };
                Site.prototype.setToken = function(token) {
            this.token = token;
        };
                Site.prototype.setInfo = function(infos) {
            this.infos = infos;
        };
                Site.prototype.canAccessMyFiles = function() {
            var infos = this.getInfo();
            return infos && (typeof infos.usercanmanageownfiles === 'undefined' || infos.usercanmanageownfiles);
        };
                Site.prototype.canDownloadFiles = function() {
            var infos = this.getInfo();
            return infos && infos.downloadfiles;
        };
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
                Site.prototype.canUploadFiles = function() {
            var infos = this.getInfo();
            return infos && infos.uploadfiles;
        };
                Site.prototype.fetchSiteInfo = function() {
            var deferred = $q.defer(),
                site = this;
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
                Site.prototype.request = function(method, data, preSets) {
            var deferred = $q.defer(),
                site = this;
            data = data || {};
            method = site.getCompatibleFunction(method);
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
            data.moodlewssettingfilter = true;
            getFromCache(site, method, data, preSets).then(function(data) {
                deferred.resolve(data);
            }, function() {
                var wsPreSets = angular.copy(preSets);
                delete wsPreSets.getFromCache;
                delete wsPreSets.saveToCache;
                delete wsPreSets.omitExpires;
                delete wsPreSets.cacheKey;
                delete wsPreSets.emergencyCache;
                delete wsPreSets.getCacheUsingCacheKey;
                $mmWS.call(method, data, wsPreSets).then(function(response) {
                    if (preSets.saveToCache) {
                        saveToCache(site, method, data, response, preSets.cacheKey);
                    }
                    deferred.resolve(angular.copy(response));
                }, function(error) {
                    if (error === mmCoreSessionExpired) {
                        $mmLang.translateAndRejectDeferred(deferred, 'mm.core.lostconnection');
                        $mmEvents.trigger(mmCoreEventSessionExpired, site.id);
                    } else if (error === mmCoreUserDeleted) {
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
            if (checkPrefix) {
                return this.wsAvailable(mmCoreWSPrefix + method, false);
            }
            return false;
        };
                Site.prototype.uploadFile = function(uri, options) {
            return $mmWS.uploadFile(uri, options, {
                siteurl: this.siteurl,
                token: this.token
            });
        };
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
                Site.prototype.fixPluginfileURL = function(url) {
            return $mmUtil.fixPluginfileURL(url, this.token);
        };
                Site.prototype.deleteDB = function() {
            return $mmDB.deleteDB('Site-' + this.id);
        };
                Site.prototype.deleteFolder = function() {
            if ($mmFS.isAvailable()) {
                var siteFolder = $mmFS.getSiteFolder(this.id);
                return $mmFS.removeDir(siteFolder).catch(function() {
                });
            } else {
                return $q.when();
            }
        };
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
                Site.prototype.getDocsUrl = function(page) {
            var release = this.infos.release ? this.infos.release : undefined;
            return $mmUtil.getDocsUrl(release, page);
        };
                Site.prototype.checkLocalMobilePlugin = function(retrying) {
            var siteurl = this.siteurl,
                self = this,
                service = mmCoreConfigConstants.wsextservice;
            if (!service) {
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
                    return {code: 0, warning: 'mm.login.localmobileunexpectedresponse'};
                }
                var code = parseInt(data.code, 10);
                if (data.error) {
                    switch (code) {
                        case 1:
                            return $mmLang.translateAndReject('mm.login.siteinmaintenance');
                        case 2:
                            return $mmLang.translateAndReject('mm.login.webservicesnotenabled');
                        case 3:
                            return {code: 0};
                        case 4:
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
                Site.prototype.checkIfLocalMobileInstalledAndNotUsed = function() {
            var appUsesLocalMobile = false;
            angular.forEach(this.infos.functions, function(func) {
                if (func.name.indexOf(mmCoreWSPrefix) != -1) {
                    appUsesLocalMobile = true;
                }
            });
            if (appUsesLocalMobile) {
                return $q.reject();
            }
            return this.checkLocalMobilePlugin().then(function(data) {
                if (typeof data.service == 'undefined') {
                    return $q.reject();
                }
                return data;
            });
        };
                Site.prototype.containsUrl = function(url) {
            if (!url) {
                return false;
            }
            var siteurl = $mmText.removeProtocolAndWWW(this.siteurl);
            url = $mmText.removeProtocolAndWWW(url);
            return url.indexOf(siteurl) == 0;
        };
                function invalidateWsCacheEntries(db, entries) {
            var promises = [];
            angular.forEach(entries, function(entry) {
                entry.expirationtime = 0;
                var promise = db.insert(mmCoreWSCacheStore, entry);
                promises.push(promise);
            });
            return $q.all(promises);
        }
                Site.prototype.getCompatibleFunction = function(method) {
            if (typeof deprecatedFunctions[method] !== "undefined") {
                if (this.wsAvailable(deprecatedFunctions[method])) {
                    $log.warn("You are using deprecated Web Services: " + method +
                        " you must replace it with the newer function: " + deprecatedFunctions[method]);
                    return deprecatedFunctions[method];
                } else {
                    $log.warn("You are using deprecated Web Services. " +
                        "Your remote site seems to be outdated, consider upgrade it to the latest Moodle version.");
                }
            } else if (!this.wsAvailable(method)) {
                for (var oldFunc in deprecatedFunctions) {
                    if (deprecatedFunctions[oldFunc] === method && this.wsAvailable(oldFunc)) {
                        $log.warn("Your remote site doesn't support the function " + method +
                            ", it seems to be outdated, consider upgrade it to the latest Moodle version.");
                        return oldFunc;
                    }
                }
            }
            return method;
        };
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
                self.makeSite = function(id, siteurl, token, infos) {
            return new Site(id, siteurl, token, infos);
        };
                self.getSiteMethods = function() {
            var methods = [];
            for (var name in Site.prototype) {
                methods.push(name);
            }
            return methods;
        };
        return self;
    }];
});

angular.module('mm.core')
.constant('mmCoreSitesStore', 'sites')
.constant('mmCoreCurrentSiteStore', 'current_site')
.config(["$mmAppProvider", "mmCoreSitesStore", "mmCoreCurrentSiteStore", function($mmAppProvider, mmCoreSitesStore, mmCoreCurrentSiteStore) {
    var stores = [
        {
            name: mmCoreSitesStore,
            keyPath: 'id'
        },
        {
            name: mmCoreCurrentSiteStore,
            keyPath: 'id'
        }
    ];
    $mmAppProvider.registerStores(stores);
}])
.factory('$mmSitesManager', ["$http", "$q", "$mmSitesFactory", "md5", "$mmLang", "$mmApp", "$mmUtil", "$mmEvents", "$state", "$translate", "mmCoreSitesStore", "mmCoreCurrentSiteStore", "mmCoreEventLogin", "mmCoreEventLogout", "$log", "mmCoreWSPrefix", "mmCoreEventSiteUpdated", "mmCoreEventSiteAdded", "mmCoreEventSessionExpired", "mmCoreEventSiteDeleted", "$mmText", "mmCoreConfigConstants", function($http, $q, $mmSitesFactory, md5, $mmLang, $mmApp, $mmUtil, $mmEvents, $state,
            $translate, mmCoreSitesStore, mmCoreCurrentSiteStore, mmCoreEventLogin, mmCoreEventLogout, $log, mmCoreWSPrefix,
            mmCoreEventSiteUpdated, mmCoreEventSiteAdded, mmCoreEventSessionExpired, mmCoreEventSiteDeleted, $mmText,
            mmCoreConfigConstants) {
    $log = $log.getInstance('$mmSitesManager');
    var self = {},
        services = {},
        sessionRestored = false,
        currentSite,
        sites = {};
        self.getDemoSiteData = function(siteurl) {
        var demoSites = mmCoreConfigConstants.demo_sites;
        if (typeof demoSites != 'undefined' && typeof demoSites[siteurl] != 'undefined') {
            return demoSites[siteurl];
        }
    };
        self.checkSite = function(siteurl, protocol) {
        siteurl = $mmUtil.formatURL(siteurl);
        if (!$mmUtil.isValidURL(siteurl)) {
            return $mmLang.translateAndReject('mm.login.invalidsite');
        } else if (!$mmApp.isOnline()) {
            return $mmLang.translateAndReject('mm.core.networkerrormsg');
        } else {
            protocol = protocol || "https://";
            siteurl = siteurl.replace(/^http(s)?\:\/\//i, protocol);
            return self.siteExists(siteurl).then(function() {
                var temporarySite = $mmSitesFactory.makeSite(undefined, siteurl);
                return temporarySite.checkLocalMobilePlugin().then(function(data) {
                    siteurl = temporarySite.getURL();
                    services[siteurl] = data.service;
                    return {siteurl: siteurl, code: data.code, warning: data.warning};
                });
            }, function() {
                if (siteurl.indexOf("https://") === 0) {
                    return self.checkSite(siteurl, "http://");
                } else{
                    return $mmLang.translateAndReject('mm.core.cannotconnect');
                }
            });
        }
    };
        self.siteExists = function(siteurl) {
        var url = siteurl + '/login/token.php';
        if (!ionic.Platform.isWebView()) {
            url = url + '?username=a&password=b&service=c';
        }
        return $http.get(url, {timeout: 30000});
    };
        self.getUserToken = function(siteurl, username, password, service, retry) {
        retry = retry || false;
        if (!$mmApp.isOnline()) {
            return $mmLang.translateAndReject('mm.core.networkerrormsg');
        }
        if (!service) {
            service = determineService(siteurl);
        }
        var loginurl = siteurl + '/login/token.php';
        var data = {
            username: username,
            password: password,
            service: service
        };
        return $http.post(loginurl, data).then(function(response) {
            var data = response.data;
            if (typeof data == 'undefined') {
                return $mmLang.translateAndReject('mm.core.cannotconnect');
            } else {
                if (typeof data.token != 'undefined') {
                    return {token: data.token, siteurl: siteurl};
                } else {
                    if (typeof data.error != 'undefined') {
                        if (!retry && data.errorcode == "requirecorrectaccess") {
                            siteurl = $mmText.addOrRemoveWWW(siteurl);
                            return self.getUserToken(siteurl, username, password, service, true);
                        } else {
                            return $q.reject(data.error);
                        }
                    } else {
                        return $mmLang.translateAndReject('mm.login.invalidaccount');
                    }
                }
            }
        }, function() {
            return $mmLang.translateAndReject('mm.core.cannotconnect');
        });
    };
        self.newSite = function(siteurl, token) {
        var candidateSite = $mmSitesFactory.makeSite(undefined, siteurl, token);
        return candidateSite.fetchSiteInfo().then(function(infos) {
            if (isValidMoodleVersion(infos)) {
                var validation = validateSiteInfo(infos);
                if (validation === true) {
                    var siteid = self.createSiteID(infos.siteurl, infos.username);
                    self.addSite(siteid, siteurl, token, infos);
                    candidateSite.setId(siteid);
                    candidateSite.setInfo(infos);
                    currentSite = candidateSite;
                    self.login(siteid);
                    $mmEvents.trigger(mmCoreEventSiteAdded);
                } else {
                    return $translate(validation.error, validation.params).then(function(error) {
                        return $q.reject(error);
                    });
                }
            } else {
                return $mmLang.translateAndReject('mm.login.invalidmoodleversion');
            }
        });
    };
        self.createSiteID = function(siteurl, username) {
        return md5.createHash(siteurl + username);
    };
        function determineService(siteurl) {
        siteurl = siteurl.replace("https://", "http://");
        if (services[siteurl]) {
            return services[siteurl];
        }
        siteurl = siteurl.replace("http://", "https://");
        if (services[siteurl]) {
            return services[siteurl];
        }
        return mmCoreConfigConstants.wsservice;
    }
        function isValidMoodleVersion(infos) {
        if (!infos) {
            return false;
        }
        var minVersion = 2012120300,
            minRelease = "2.4";
        if (infos.version) {
            var version = parseInt(infos.version);
            if (!isNaN(version)) {
                return version >= minVersion;
            }
        }
        if (infos.release) {
            var matches = infos.release.match(/^([\d|\.]*)/);
            if (matches && matches.length > 1) {
                return matches[1] >= minRelease;
            }
        }
        var appUsesLocalMobile = false;
        angular.forEach(infos.functions, function(func) {
            if (func.name.indexOf(mmCoreWSPrefix) != -1) {
                appUsesLocalMobile = true;
            }
        });
        return appUsesLocalMobile;
    }
        function validateSiteInfo(infos) {
        if (!infos.firstname || !infos.lastname) {
            var moodleLink = '<a mm-link href="' + infos.siteurl + '">' + infos.siteurl + '</a>';
            return {error: 'mm.core.requireduserdatamissing', params: {'$a': moodleLink}};
        }
        return true;
    }
        self.addSite = function(id, siteurl, token, infos) {
        return $mmApp.getDB().insert(mmCoreSitesStore, {
            id: id,
            siteurl: siteurl,
            token: token,
            infos: infos
        });
    };
        self.loadSite = function(siteid) {
        $log.debug('Load site '+siteid);
        return self.getSite(siteid).then(function(site) {
            currentSite = site;
            self.login(siteid);
            return site.checkIfLocalMobileInstalledAndNotUsed().then(function() {
                $mmEvents.trigger(mmCoreEventSessionExpired, siteid);
            }, function() {
                self.updateSiteInfo(siteid).finally(function() {
                    var infos = site.getInfo(),
                        validation = validateSiteInfo(infos);
                    if (validation !== true) {
                        self.logout();
                        $state.go('mm_login.sites');
                        $translate(validation.error, validation.params).then(function(error) {
                            $mmUtil.showErrorModal(error);
                        });
                    }
                });
            });
        });
    };
        self.getCurrentSite = function() {
        return currentSite;
    };
        self.deleteSite = function(siteid) {
        $log.debug('Delete site '+siteid);
        if (typeof currentSite != 'undefined' && currentSite.id == siteid) {
            self.logout();
        }
        return self.getSite(siteid).then(function(site) {
            return site.deleteDB().then(function() {
                delete sites[siteid];
                return $mmApp.getDB().remove(mmCoreSitesStore, siteid).then(function() {
                    return site.deleteFolder();
                }, function() {
                    return site.deleteFolder();
                }).then(function() {
                    $mmEvents.trigger(mmCoreEventSiteDeleted, site);
                });
            });
        });
    };
        self.hasNoSites = function() {
        return $mmApp.getDB().count(mmCoreSitesStore).then(function(count) {
            if (count > 0) {
                return $q.reject();
            }
        });
    };
        self.hasSites = function() {
        return $mmApp.getDB().count(mmCoreSitesStore).then(function(count) {
            if (count == 0) {
                return $q.reject();
            }
        });
    };
        self.getSite = function(siteId) {
        if (!siteId) {
            return $q.reject();
        } else if (currentSite && currentSite.getId() === siteId) {
            return $q.when(currentSite);
        } else if (typeof sites[siteId] != 'undefined') {
            return $q.when(sites[siteId]);
        } else {
            return $mmApp.getDB().get(mmCoreSitesStore, siteId).then(function(data) {
                var site = $mmSitesFactory.makeSite(siteId, data.siteurl, data.token, data.infos);
                sites[siteId] = site;
                return site;
            });
        }
    };
        self.getSiteDb = function(siteId) {
        return self.getSite(siteId).then(function(site) {
            return site.getDb();
        });
    };
        self.getSites = function(ids) {
        return $mmApp.getDB().getAll(mmCoreSitesStore).then(function(sites) {
            var formattedSites = [];
            angular.forEach(sites, function(site) {
                if (!ids || ids.indexOf(site.id) > -1) {
                    formattedSites.push({
                        id: site.id,
                        siteurl: site.siteurl,
                        fullname: site.infos.fullname,
                        sitename: site.infos.sitename,
                        avatar: site.infos.userpictureurl
                    });
                }
            });
            return formattedSites;
        });
    };
        self.getSitesIds = function() {
        return $mmApp.getDB().getAll(mmCoreSitesStore).then(function(sites) {
            var ids = [];
            angular.forEach(sites, function(site) {
                ids.push(site.id);
            });
            return ids;
        });
    };
        self.login = function(siteid) {
        return $mmApp.getDB().insert(mmCoreCurrentSiteStore, {
            id: 1,
            siteid: siteid
        }).then(function() {
            $mmEvents.trigger(mmCoreEventLogin);
        });
    };
        self.logout = function() {
        currentSite = undefined;
        $mmEvents.trigger(mmCoreEventLogout);
        return $mmApp.getDB().remove(mmCoreCurrentSiteStore, 1);
    }
        self.restoreSession = function() {
        if (sessionRestored) {
            return $q.reject();
        }
        sessionRestored = true;
        return $mmApp.getDB().get(mmCoreCurrentSiteStore, 1).then(function(current_site) {
            var siteid = current_site.siteid;
            $log.debug('Restore session in site '+siteid);
            return self.loadSite(siteid);
        }, function() {
            return $q.reject();
        });
    };
        self.updateSiteToken = function(siteurl, username, token) {
        var siteid = self.createSiteID(siteurl, username);
        return self.getSite(siteid).then(function(site) {
            site.token = token;
            return $mmApp.getDB().insert(mmCoreSitesStore, {
                id: siteid,
                siteurl: site.getURL(),
                token: token,
                infos: site.getInfo()
            });
        });
    };
        self.updateSiteInfo = function(siteid) {
        return self.getSite(siteid).then(function(site) {
            return site.fetchSiteInfo().then(function(infos) {
                site.setInfo(infos);
                return $mmApp.getDB().insert(mmCoreSitesStore, {
                    id: siteid,
                    siteurl: site.getURL(),
                    token: site.getToken(),
                    infos: infos
                }).finally(function() {
                    $mmEvents.trigger(mmCoreEventSiteUpdated, siteid);
                });
            });
        });
    };
        self.updateSiteInfoByUrl = function(siteurl, username) {
        var siteid = self.createSiteID(siteurl, username);
        return self.updateSiteInfo(siteid);
    };
        self.getSiteIdsFromUrl = function(url, prioritize, username) {
        if (prioritize && currentSite && currentSite.containsUrl(url)) {
            if (!username || currentSite.getInfo().username == username) {
                return $q.when([currentSite.getId()]);
            }
        }
        if (!url.match(/^https?:\/\//i)) {
            if (url.match(/^[^:]{2,10}:\/\//i)) {
                return $q.when([]);
            } else {
                if (currentSite) {
                    return $q.when([currentSite.getId()]);
                } else {
                    return $q.when([]);
                }
            }
        }
        return $mmApp.getDB().getAll(mmCoreSitesStore).then(function(sites) {
            var ids = [];
            angular.forEach(sites, function(site) {
                if (!sites[site.id]) {
                    sites[site.id] = $mmSitesFactory.makeSite(site.id, site.siteurl, site.token, site.infos);
                }
                if (sites[site.id].containsUrl(url)) {
                    if (!username || sites[site.id].getInfo().username == username) {
                        ids.push(site.id);
                    }
                }
            });
            return ids;
        }).catch(function() {
            return [];
        });
    };
    return self;
}]);

angular.module('mm.core')
.factory('$mmText', ["$q", "$mmLang", "$translate", function($q, $mmLang, $translate) {
    var self = {};
        self.bytesToSize = function(bytes, precision) {
        if (typeof bytes == 'undefined' || bytes < 0) {
            return $translate.instant('mm.core.notapplicable');
        }
        if (typeof precision == 'undefined' || precision < 0) {
            precision = 2;
        }
        var keys = ['mm.core.sizeb', 'mm.core.sizekb', 'mm.core.sizemb', 'mm.core.sizegb', 'mm.core.sizetb'];
        var units = $translate.instant(keys);
        var posttxt = 0;
        if (bytes >= 1024) {
            while (bytes >= 1024) {
                posttxt++;
                bytes = bytes / 1024;
            }
            bytes = Number(Math.round(bytes+'e+'+precision) + 'e-'+precision);
        }
        return $translate.instant('mm.core.humanreadablesize', {size: Number(bytes), unit: units[keys[posttxt]]});
    };
        self.cleanTags = function(text, singleLine) {
        text = text.replace(/(<([^>]+)>)/ig,"");
        text = angular.element('<p>').html(text).text();
        text = self.replaceNewLines(text, singleLine ? ' ' : '<br />');
        return text;
    };
        self.replaceNewLines = function(text, newValue) {
        return text.replace(/(?:\r\n|\r|\n)/g, newValue);
    };
        self.formatText = function(text, clean, singleLine, shortenLength) {
        return self.treatMultilangTags(text).then(function(formatted) {
            if (clean) {
                formatted = self.cleanTags(formatted, singleLine);
            }
            if (shortenLength && parseInt(shortenLength) > 0) {
                formatted = self.shortenText(formatted, parseInt(shortenLength));
            }
            return formatted;
        });
    };
        self.shortenText = function(text, length) {
        if (text.length > length) {
            text = text.substr(0, length);
            var lastWordPos = text.lastIndexOf(' ');
            if (lastWordPos > 0) {
                text = text.substr(0, lastWordPos);
            }
            text += '&hellip;';
        }
        return text;
    };
        self.treatMultilangTags = function(text) {
        if (!text) {
            return $q.when('');
        }
        return $mmLang.getCurrentLanguage().then(function(language) {
            var currentLangRe = new RegExp('<(?:lang|span)[^>]+lang="' + language + '"[^>]*>(.*?)<\/(?:lang|span)>', 'g'),
                anyLangRE = /<(?:lang|span)[^>]+lang="[a-zA-Z0-9_-]+"[^>]*>(.*?)<\/(?:lang|span)>/g;
            if (!text.match(currentLangRe)) {
                var matches = text.match(anyLangRE);
                if (matches && matches[0]) {
                    language = matches[0].match(/lang="([a-zA-Z0-9_-]+)"/)[1];
                    currentLangRe = new RegExp('<(?:lang|span)[^>]+lang="' + language + '"[^>]*>(.*?)<\/(?:lang|span)>', 'g');
                } else {
                    return text;
                }
            }
            text = text.replace(currentLangRe, '$1');
            text = text.replace(anyLangRE, '');
            return text;
        });
    };
        self.escapeHTML = function(text) {
        if (typeof text == 'undefined' || text === null || (typeof text == 'number' && isNaN(text))) {
            return '';
        } else if (typeof text != 'string') {
            return '' + text;
        }
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    };
        self.decodeHTML = function(text) {
        if (typeof text == 'undefined' || text === null || (typeof text == 'number' && isNaN(text))) {
            return '';
        } else if (typeof text != 'string') {
            return '' + text;
        }
        return text
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#039;/g, "'")
            .replace(/&nbsp;/g, ' ');
    };
        self.addOrRemoveWWW = function(url) {
        if (typeof url == 'string') {
            if (url.match(/http(s)?:\/\/www\./)) {
                url = url.replace('www.', '');
            } else {
                url = url.replace('https://', 'https://www.');
                url = url.replace('http://', 'http://www.');
            }
        }
        return url;
    };
        self.removeProtocolAndWWW = function(url) {
        url = url.replace(/.*?:\/\//g, '');
        url = url.replace(/^www./, '');
        return url;
    };
        self.getUsernameFromUrl = function(url) {
        if (url.indexOf('@') > -1) {
            var withoutProtocol = url.replace(/.*?:\/\//, ''),
                matches = withoutProtocol.match(/[^@]*/);
            if (matches && matches.length && !matches[0].match(/[\/|?]/)) {
                return matches[0];
            }
        }
    };
        self.removeSpecialCharactersForFiles = function(text) {
        return text.replace(/[#:\/\?\\]+/g, '_');
    };
        self.getLastFileWithoutParams = function(url) {
        var filename = url.substr(url.lastIndexOf('/') + 1);
        if (filename.indexOf('?') != -1) {
            filename = filename.substr(0, filename.indexOf('?'));
        }
        return filename;
    };
    return self;
}]);

angular.module('mm.core')
.constant('mmCoreVersionApplied', 'version_applied')
.factory('$mmUpdateManager', ["$log", "$q", "$mmConfig", "$mmSitesManager", "$mmFS", "$cordovaLocalNotification", "$mmLocalNotifications", "$mmApp", "$mmEvents", "mmCoreSitesStore", "mmCoreVersionApplied", "mmCoreEventSiteAdded", "mmCoreEventSiteUpdated", "mmCoreEventSiteDeleted", "$injector", "$mmFilepool", "mmCoreCourseModulesStore", "mmFilepoolLinksStore", "mmFilepoolPackagesStore", "mmCoreConfigConstants", function($log, $q, $mmConfig, $mmSitesManager, $mmFS, $cordovaLocalNotification, $mmLocalNotifications,
            $mmApp, $mmEvents, mmCoreSitesStore, mmCoreVersionApplied, mmCoreEventSiteAdded, mmCoreEventSiteUpdated,
            mmCoreEventSiteDeleted, $injector, $mmFilepool, mmCoreCourseModulesStore, mmFilepoolLinksStore,
            mmFilepoolPackagesStore, mmCoreConfigConstants) {
    $log = $log.getInstance('$mmUpdateManager');
    var self = {},
        sitesFilePath = 'migration/sites.json';
        self.check = function() {
        var promises = [],
            versionCode = mmCoreConfigConstants.versioncode;
        return $mmConfig.get(mmCoreVersionApplied, 0).then(function(versionApplied) {
            if (versionCode >= 391 && versionApplied < 391) {
                promises.push(migrateMM1Sites());
                promises.push(clearAppFolder().catch(function() {}));
            }
            if (versionCode >= 2003 && versionApplied < 2003) {
                promises.push(cancelAndroidNotifications());
            }
            if (versionCode >= 2003) {
                setStoreSitesInFile();
            }
            if (versionCode >= 2007 && versionApplied < 2007) {
                promises.push(migrateModulesStatus());
            }
            return $q.all(promises).then(function() {
                return $mmConfig.set(mmCoreVersionApplied, versionCode);
            }).catch(function() {
                $log.error('Error applying update from ' + versionApplied + ' to ' + versionCode);
            });
        });
    };
        function clearAppFolder() {
        if ($mmFS.isAvailable()) {
            return $mmFS.getDirectoryContents('').then(function(entries) {
                var promises = [];
                angular.forEach(entries, function(entry) {
                    var canDeleteAndroid = ionic.Platform.isAndroid() && entry.name !== 'cache' && entry.name !== 'files';
                    var canDeleteIOS = ionic.Platform.isIOS() && entry.name !== 'NoCloud';
                    if (canDeleteIOS || canDeleteAndroid) {
                        promises.push($mmFS.removeDir(entry.name));
                    }
                });
                return $q.all(promises);
            });
        } else {
            return $q.when();
        }
    }
        function migrateMM1Sites() {
        var sites = localStorage.getItem('sites'),
            promises = [];
        if (sites) {
            sites = sites.split(',');
            angular.forEach(sites, function(siteid) {
                if (!siteid) {
                    return;
                }
                $log.debug('Migrating site from MoodleMobile 1: ' + siteid);
                var site = localStorage.getItem('sites-'+siteid),
                    infos;
                if (site) {
                    try {
                        site = JSON.parse(site);
                    } catch(ex) {
                        $log.warn('Site ' + siteid + ' data is invalid. Ignoring.');
                        return;
                    }
                    infos = angular.copy(site);
                    delete infos.id;
                    delete infos.token;
                    promises.push($mmSitesManager.addSite(site.id, site.siteurl, site.token, infos));
                } else {
                    $log.warn('Site ' + siteid + ' not found in local storage. Ignoring.');
                }
            });
        }
        return $q.all(promises).then(function() {
            if (sites) {
                localStorage.clear();
            }
        });
    }
        function cancelAndroidNotifications() {
        if ($mmLocalNotifications.isAvailable() && ionic.Platform.isAndroid()) {
            return $cordovaLocalNotification.cancelAll().catch(function() {
                $log.error('Error cancelling Android notifications.');
            });
        }
        return $q.when();
    }
        function setStoreSitesInFile() {
        $mmEvents.on(mmCoreEventSiteAdded, storeSitesInFile);
        $mmEvents.on(mmCoreEventSiteUpdated, storeSitesInFile);
        $mmEvents.on(mmCoreEventSiteDeleted, storeSitesInFile);
        storeSitesInFile();
    }
        function getSitesStoredInFile() {
        if ($mmFS.isAvailable()) {
            return $mmFS.readFile(sitesFilePath).then(function(sites) {
                try {
                    sites = JSON.parse(sites);
                } catch (ex) {
                    sites = [];
                }
                return sites;
            }).catch(function() {
                return [];
            });
        } else {
            return $q.when([]);
        }
    }
        function storeSitesInFile() {
        if ($mmFS.isAvailable()) {
            return $mmApp.getDB().getAll(mmCoreSitesStore).then(function(sites) {
                angular.forEach(sites, function(site) {
                    site.token = 'private';
                });
                return $mmFS.writeFile(sitesFilePath, JSON.stringify(sites));
            });
        } else {
            return $q.when();
        }
    }
        function deleteSitesFile() {
        if ($mmFS.isAvailable()) {
            return $mmFS.removeFile(sitesFilePath);
        } else {
            return $q.when();
        }
    }
        function migrateModulesStatus() {
        var components = [];
        components.push($injector.get('mmaModBookComponent'));
        components.push($injector.get('mmaModImscpComponent'));
        components.push($injector.get('mmaModPageComponent'));
        components.push($injector.get('mmaModResourceComponent'));
        return $mmSitesManager.getSitesIds().then(function(sites) {
            var promises = [];
            angular.forEach(sites, function(siteId) {
                promises.push(migrateSiteModulesStatus(siteId, components));
            });
            return $q.all(promises);
        });
    }
        function migrateSiteModulesStatus(siteId, components) {
        $log.debug('Migrate site modules status from site ' + siteId);
        return $mmSitesManager.getSiteDb(siteId).then(function(db) {
            return db.getAll(mmCoreCourseModulesStore).then(function(entries) {
                var promises = [];
                angular.forEach(entries, function(entry) {
                    if (!parseInt(entry.id)) {
                        return;
                    }
                    promises.push(determineComponent(db, entry.id, components).then(function(component) {
                        if (component) {
                            entry.component = component;
                            entry.componentId = entry.id;
                            entry.id = $mmFilepool.getPackageId(component, entry.id);
                            promises.push(db.insert(mmFilepoolPackagesStore, entry));
                        }
                    }));
                });
                return $q.all(promises).then(function() {
                    return db.removeAll(mmCoreCourseModulesStore).catch(function() {
                    });
                });
            });
        });
    }
        function determineComponent(db, componentId, components) {
        var promises = [],
            component;
        angular.forEach(components, function(c) {
            if (c) {
                promises.push(db.query(mmFilepoolLinksStore, ['componentAndId', '=', [c, componentId]]).then(function(items) {
                    if (items.length) {
                        component = c;
                    }
                }).catch(function() {
                }));
            }
        });
        return $q.all(promises).then(function() {
            return component;
        });
    }
    return self;
}]);

angular.module('mm.core')
.factory('$mmURLDelegate', ["$log", function($log) {
    $log = $log.getInstance('$mmURLDelegate');
    var observers = {},
        self = {};
        self.register = function(name, callback) {
        $log.debug("Register observer '"+name+"' for custom URL.");
        observers[name] = callback;
    };
        self.notify = function(url) {
        var treated = false;
        angular.forEach(observers, function(callback, name) {
            if (!treated && typeof(callback) === 'function') {
                treated = callback(url);
            }
        });
    };
    return self;
}])
.run(["$mmURLDelegate", "$log", function($mmURLDelegate, $log) {
    window.handleOpenURL = function(url) {
        $log.debug('App launched by URL.');
        $mmURLDelegate.notify(url);
    };
}]);

angular.module('mm.core')
.provider('$mmUtil', ["mmCoreSecondsYear", "mmCoreSecondsDay", "mmCoreSecondsHour", "mmCoreSecondsMinute", function(mmCoreSecondsYear, mmCoreSecondsDay, mmCoreSecondsHour, mmCoreSecondsMinute) {
    var self = this,
        provider = this;
        self.param = function(obj) {
        var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
        for (name in obj) {
            value = obj[name];
            if (value instanceof Array) {
                for (i = 0; i < value.length; ++i) {
                    subValue = value[i];
                    fullSubName = name + '[' + i + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += self.param(innerObj) + '&';
                }
            }
            else if (value instanceof Object) {
                for (subName in value) {
                    subValue = value[subName];
                    fullSubName = name + '[' + subName + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += self.param(innerObj) + '&';
                }
            }
            else if (value !== undefined && value !== null) query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }
        return query.length ? query.substr(0, query.length - 1) : query;
    };
    this.$get = ["$ionicLoading", "$ionicPopup", "$injector", "$translate", "$http", "$log", "$q", "$mmLang", "$mmFS", "$timeout", "$mmApp", "$mmText", "mmCoreWifiDownloadThreshold", "mmCoreDownloadThreshold", "$ionicScrollDelegate", function($ionicLoading, $ionicPopup, $injector, $translate, $http, $log, $q, $mmLang, $mmFS, $timeout, $mmApp,
                $mmText, mmCoreWifiDownloadThreshold, mmCoreDownloadThreshold, $ionicScrollDelegate) {
        $log = $log.getInstance('$mmUtil');
        var self = {};
                self.formatURL = function(url) {
            url = url.trim();
            if (! /^http(s)?\:\/\/.*/i.test(url)) {
                url = "https://" + url;
            }
            url = url.replace(/^http/i, 'http');
            url = url.replace(/^https/i, 'https');
            url = url.replace(/\/$/, "");
            return url;
        };
                self.resolveObject = function(object, instantiate) {
            var toInject,
                resolved;
            instantiate = angular.isUndefined(instantiate) ? false : instantiate;
            if (angular.isFunction(object) || angular.isObject(object)) {
                resolved = object;
            } else if (angular.isString(object)) {
                toInject = object.split('.');
                resolved = $injector.get(toInject[0]);
                if (toInject.length > 1) {
                    resolved = resolved[toInject[1]];
                }
            }
            if (angular.isFunction(resolved) && instantiate) {
                resolved = resolved();
            }
            if (typeof resolved === 'undefined') {
                throw new Error('Unexpected argument passed passed');
            }
            return resolved;
        };
                self.isDownloadableUrl = function(url) {
            return self.isPluginFileUrl(url) || self.isThemeImageUrl(url) || self.isGravatarUrl(url);
        };
                self.isGravatarUrl = function(url) {
            return url && url.indexOf('gravatar.com/avatar') !== -1;
        };
                self.isPluginFileUrl = function(url) {
            return url && url.indexOf('/pluginfile.php') !== -1;
        };
                self.isThemeImageUrl = function(url) {
            return url && url.indexOf('/theme/image.php') !== -1;
        };
                self.isValidURL = function(url) {
            return /^http(s)?\:\/\/.+/i.test(url);
        };
                self.fixPluginfileURL = function(url, token) {
            if (!url) {
                return '';
            }
            if (url.indexOf('token=') != -1) {
                return url;
            }
            if (url.indexOf('pluginfile') == -1) {
                return url;
            }
            if (!token) {
                return '';
            }
            if (url.indexOf('?file=') != -1 || url.indexOf('?forcedownload=') != -1 || url.indexOf('?rev=') != -1) {
                url += '&';
            } else {
                url += '?';
            }
            url += 'token=' + token;
            if (url.indexOf('/webservice/pluginfile') == -1) {
                url = url.replace('/pluginfile', '/webservice/pluginfile');
            }
            return url;
        };
                self.openFile = function(path) {
            var deferred = $q.defer();
            if (false) {
                deferred.resolve();
            } else if (window.plugins) {
                var extension = $mmFS.getFileExtension(path),
                    mimetype = $mmFS.getMimeType(extension);
                if (ionic.Platform.isAndroid() && window.plugins.webintent) {
                    var iParams = {
                        action: "android.intent.action.VIEW",
                        url: path,
                        type: mimetype
                    };
                    window.plugins.webintent.startActivity(
                        iParams,
                        function() {
                            $log.debug('Intent launched');
                            deferred.resolve();
                        },
                        function() {
                            $log.debug('Intent launching failed.');
                            $log.debug('action: ' + iParams.action);
                            $log.debug('url: ' + iParams.url);
                            $log.debug('type: ' + iParams.type);
                            if (!extension || extension.indexOf('/') > -1 || extension.indexOf('\\') > -1) {
                                $mmLang.translateAndRejectDeferred(deferred, 'mm.core.erroropenfilenoextension');
                            } else {
                                $mmLang.translateAndRejectDeferred(deferred, 'mm.core.erroropenfilenoapp');
                            }
                        }
                    );
                } else if (ionic.Platform.isIOS() && typeof handleDocumentWithURL == 'function') {
                    $mmFS.getBasePath().then(function(fsRoot) {
                        if (path.indexOf(fsRoot > -1)) {
                            path = path.replace(fsRoot, "");
                            path = encodeURIComponent(decodeURIComponent(path));
                            path = fsRoot + path;
                        }
                        handleDocumentWithURL(
                            function() {
                                $log.debug('File opened with handleDocumentWithURL' + path);
                                deferred.resolve();
                            },
                            function(error) {
                                $log.debug('Error opening with handleDocumentWithURL' + path);
                                if(error == 53) {
                                    $log.error('No app that handles this file type.');
                                }
                                self.openInBrowser(path);
                                deferred.resolve();
                            },
                            path
                        );
                    }, deferred.reject);
                } else {
                    self.openInBrowser(path);
                    deferred.resolve();
                }
            } else {
                $log.debug('Opening external file using window.open()');
                window.open(path, '_blank');
                deferred.resolve();
            }
            return deferred.promise;
        };
                self.openInBrowser = function(url) {
            window.open(url, '_system');
        };
                self.openInApp = function(url) {
            if (!url) {
                return;
            }
            var options = 'enableViewPortScale=yes';
            if (ionic.Platform.isIOS() && url.indexOf('file://') === 0) {
                options += ',location=no';
            }
            window.open(url, '_blank', options);
        };
                self.showModalLoading = function(text, needsTranslate) {
            var modalClosed = false,
                modalShown = false;
            if (!text) {
                text = 'mm.core.loading';
                needsTranslate = true;
            }
            function showModal(text) {
                if (!modalClosed) {
                    $ionicLoading.show({
                        template:   '<ion-spinner></ion-spinner>' +
                                    '<p>'+text+'</p>'
                    });
                    modalShown = true;
                }
            }
            if (needsTranslate) {
                $translate(text).then(showModal);
            } else {
                showModal(text);
            }
            return {
                dismiss: function() {
                    modalClosed = true;
                    if (modalShown) {
                        $ionicLoading.hide();
                    }
                }
            };
        };
                self.showErrorModal = function(errorMessage, needsTranslate, autocloseTime) {
            var errorKey = 'mm.core.error',
                langKeys = [errorKey],
                matches;
            if (angular.isObject(errorMessage)) {
                if (typeof errorMessage.content != 'undefined') {
                    errorMessage = errorMessage.content;
                } else if (typeof errorMessage.body != 'undefined') {
                    errorMessage = errorMessage.body;
                } else if (typeof errorMessage.message != 'undefined') {
                    errorMessage = errorMessage.message;
                } else if (typeof errorMessage.error != 'undefined') {
                    errorMessage = errorMessage.error;
                } else {
                    errorMessage = JSON.stringify(errorMessage);
                }
                matches = errorMessage.match(/token"?[=|:]"?(\w*)/, '');
                if (matches && matches[1]) {
                    errorMessage = errorMessage.replace(new RegExp(matches[1], 'g'), 'secret');
                }
            }
            if (needsTranslate) {
                langKeys.push(errorMessage);
            }
            $translate(langKeys).then(function(translations) {
                var popup = $ionicPopup.alert({
                    title: translations[errorKey],
                    template: needsTranslate ? translations[errorMessage] : errorMessage
                });
                if (typeof autocloseTime != 'undefined' && !isNaN(parseInt(autocloseTime))) {
                    $timeout(function() {
                        popup.close();
                    }, parseInt(autocloseTime));
                } else {
                    delete popup;
                }
            });
        };
                self.showModal = function(title, message) {
            var promises = [
                $translate(title),
                $translate(message),
            ];
            $q.all(promises).then(function(translations) {
                $ionicPopup.alert({
                    title: translations[0],
                    template: translations[1]
                });
            });
        };
                self.showConfirm = function(template, title) {
            return $ionicPopup.confirm({template: template, title: title}).then(function(confirmed) {
                if (!confirmed) {
                    return $q.reject();
                }
            });
        };
                self.showPrompt = function(body, title, inputPlaceholder, inputType) {
            inputType = inputType || 'password';
            var options = {
                template: body,
                title: title,
                inputPlaceholder: inputPlaceholder,
                inputType: inputType
            };
            return $ionicPopup.prompt(options).then(function(data) {
                if (typeof data == 'undefined') {
                    return $q.reject();
                }
                return data;
            });
        };
                self.readJSONFile = function(path) {
            return $http.get(path).then(function(response) {
                return response.data;
            });
        };
                self.getCountryName = function(code) {
            var countryKey = 'mm.core.country-' + code,
                countryName = $translate.instant(countryKey);
            return countryName !== countryKey ? countryName : code;
        };
                self.getDocsUrl = function(release, page) {
            page = page || 'Mobile_app';
            var docsurl = 'https://docs.moodle.org/en/' + page;
            if (typeof release != 'undefined') {
                var version = release.substr(0, 3).replace(".", "");
                if (parseInt(version) >= 24) {
                    docsurl = docsurl.replace('https://docs.moodle.org/', 'https://docs.moodle.org/' + version + '/');
                }
            }
            return $mmLang.getCurrentLanguage().then(function(lang) {
                return docsurl.replace('/en/', '/' + lang + '/');
            }, function() {
                return docsurl;
            });
        };
                self.timestamp = function() {
            return Math.round(new Date().getTime() / 1000);
        };
                self.isFalseOrZero = function(value) {
            return typeof value != 'undefined' && (value === false || parseInt(value) === 0);
        };
                self.isTrueOrOne = function(value) {
            return typeof value != 'undefined' && (value === true || parseInt(value) === 1);
        };
                self.formatTime = function(seconds) {
            var langKeys = ['mm.core.day', 'mm.core.days', 'mm.core.hour', 'mm.core.hours', 'mm.core.min', 'mm.core.mins',
                            'mm.core.sec', 'mm.core.secs', 'mm.core.year', 'mm.core.years', 'mm.core.now'];
            return $translate(langKeys).then(function(translations) {
                totalSecs = Math.abs(seconds);
                var years     = Math.floor(totalSecs / mmCoreSecondsYear);
                var remainder = totalSecs - (years * mmCoreSecondsYear);
                var days      = Math.floor(remainder / mmCoreSecondsDay);
                remainder = totalSecs - (days * mmCoreSecondsDay);
                var hours     = Math.floor(remainder / mmCoreSecondsHour);
                remainder = remainder - (hours * mmCoreSecondsHour);
                var mins      = Math.floor(remainder / mmCoreSecondsMinute);
                var secs      = remainder - (mins * mmCoreSecondsMinute);
                var ss = (secs == 1)  ? translations['mm.core.sec']  : translations['mm.core.secs'];
                var sm = (mins == 1)  ? translations['mm.core.min']  : translations['mm.core.mins'];
                var sh = (hours == 1) ? translations['mm.core.hour'] : translations['mm.core.hours'];
                var sd = (days == 1)  ? translations['mm.core.day']  : translations['mm.core.days'];
                var sy = (years == 1) ? translations['mm.core.year'] : translations['mm.core.years'];
                var oyears = '',
                    odays = '',
                    ohours = '',
                    omins = '',
                    osecs = '';
                if (years) {
                    oyears  = years + ' ' + sy;
                }
                if (days) {
                    odays  = days + ' ' + sd;
                }
                if (hours) {
                    ohours = hours + ' ' + sh;
                }
                if (mins) {
                    omins  = mins + ' ' + sm;
                }
                if (secs) {
                    osecs  = secs + ' ' + ss;
                }
                if (years) {
                    return oyears + ' ' + odays;
                }
                if (days) {
                    return odays + ' ' + ohours;
                }
                if (hours) {
                    return ohours + ' ' + omins;
                }
                if (mins) {
                    return omins + ' ' + osecs;
                }
                if (secs) {
                    return osecs;
                }
                return translations['mm.core.now'];
            });
        };
                self.emptyArray = function(array) {
            array.length = 0;
        };
                self.allPromises = function(promises) {
            if (!promises || !promises.length) {
                return $q.when();
            }
            var count = 0,
                failed = false,
                deferred = $q.defer();
            angular.forEach(promises, function(promise) {
                promise.catch(function() {
                    failed = true;
                }).finally(function() {
                    count++;
                    if (count === promises.length) {
                        if (failed) {
                            deferred.reject();
                        } else {
                            deferred.resolve();
                        }
                    }
                });
            });
            return deferred.promise;
        };
                self.basicLeftCompare = function(itemA, itemB, maxLevels, level) {
            level = level || 0;
            maxLevels = maxLevels || 0;
            if (angular.isFunction(itemA) || angular.isFunction(itemB)) {
                return true;
            } else if (angular.isObject(itemA) && angular.isObject(itemB)) {
                if (level >= maxLevels) {
                    return true;
                }
                var equal = true;
                angular.forEach(itemA, function(value, name) {
                    if (!self.basicLeftCompare(value, itemB[name], maxLevels, level + 1)) {
                        equal = false;
                    }
                });
                return equal;
            } else {
                var floatA = parseFloat(itemA),
                    floatB = parseFloat(itemB);
                if (!isNaN(floatA) && !isNaN(floatB)) {
                    return floatA == floatB;
                }
                return itemA === itemB;
            }
        };
                self.confirmDownloadSize = function(size, message, unknownsizemessage, wifiThreshold, limitedThreshold) {
            wifiThreshold = typeof wifiThreshold == 'undefined' ? mmCoreWifiDownloadThreshold : wifiThreshold;
            limitedThreshold = typeof limitedThreshold == 'undefined' ? mmCoreDownloadThreshold : limitedThreshold;
            message = message || 'mm.course.confirmdownload';
            unknownsizemessage = unknownsizemessage || 'mm.course.confirmdownloadunknownsize';
            if (size <= 0) {
                return self.showConfirm($translate(unknownsizemessage));
            }
            else if (size >= wifiThreshold || ($mmApp.isNetworkAccessLimited() && size >= limitedThreshold)) {
                var readableSize = $mmText.bytesToSize(size, 2);
                return self.showConfirm($translate(message, {size: readableSize}));
            }
            return $q.when();
        };
                self.formatPixelsSize = function(size) {
            if (typeof size == 'string' && (size.indexOf('px') > -1 || size.indexOf('%') > -1)) {
                return size;
            }
            size = parseInt(size, 10);
            if (!isNaN(size)) {
                return size + 'px';
            }
            return '';
        };
                self.param = function(obj) {
            return provider.param(obj);
        };
                self.roundToDecimals = function(number, decimals) {
            if (typeof decimals == 'undefined') {
                decimals = 2;
            }
            var multiplier = Math.pow(10, decimals);
            return Math.round(parseFloat(number) * multiplier) / multiplier;
        };
                self.extractUrlParams = function(url) {
            var regex = /[?&]+([^=&]+)=?([^&]*)?/gi,
                params = {};
            url.replace(regex, function(match, key, value) {
                params[key] = value !== undefined ? value : '';
            });
            return params;
        };
                self.restoreSourcesInHtml = function(html, paths, anchorFn) {
            var div = angular.element('<div>'),
                media;
            div.html(html);
            media = div[0].querySelectorAll('img, video, audio, source');
            angular.forEach(media, function(el) {
                var src = paths[decodeURIComponent(el.getAttribute('src'))];
                if (typeof src !== 'undefined') {
                    el.setAttribute('src', src);
                }
            });
            angular.forEach(div.find('a'), function(anchor) {
                var href = decodeURIComponent(anchor.getAttribute('href')),
                    url = paths[href];
                if (typeof url !== 'undefined') {
                    anchor.setAttribute('href', url);
                    if (angular.isFunction(anchorFn)) {
                        anchorFn(anchor, href);
                    }
                }
            });
            return div.html();
        };
                self.scrollToElement = function(container, selector, scrollDelegate, scrollParentClass) {
            if (!scrollDelegate) {
                scrollDelegate = $ionicScrollDelegate;
            }
            if (!scrollParentClass) {
                scrollParentClass = 'scroll-content';
            }
            var element = selector ? container.querySelector(selector) : container,
                positionTop = positionLeft = 0;
            if (!element) {
                return false;
            }
            while (element) {
                positionLeft += (element.offsetLeft - element.scrollLeft + element.clientLeft);
                positionTop += (element.offsetTop - element.scrollTop + element.clientTop);
                element = element.offsetParent;
                if (angular.element(element).hasClass(scrollParentClass)) {
                    element = false;
                }
            }
            scrollDelegate.scrollTo(positionLeft, positionTop);
            return true;
        };
        return self;
    }];
}]);

angular.module('mm.core')
.factory('$mmWS', ["$http", "$q", "$log", "$mmLang", "$cordovaFileTransfer", "$mmApp", "$mmFS", "$mmText", "mmCoreSessionExpired", "mmCoreUserDeleted", "$translate", "$window", "$mmUtil", function($http, $q, $log, $mmLang, $cordovaFileTransfer, $mmApp, $mmFS, $mmText, mmCoreSessionExpired,
            mmCoreUserDeleted, $translate, $window, $mmUtil) {
    $log = $log.getInstance('$mmWS');
    var self = {};
        self.call = function(method, data, preSets) {
        var siteurl;
        data = convertValuesToString(data);
        if (typeof preSets == 'undefined' || preSets === null ||
                typeof preSets.wstoken == 'undefined' || typeof preSets.siteurl == 'undefined') {
            return $mmLang.translateAndReject('mm.core.unexpectederror');
        } else if (!$mmApp.isOnline()) {
            return $mmLang.translateAndReject('mm.core.networkerrormsg');
        }
        preSets.typeExpected = preSets.typeExpected || 'object';
        if (typeof preSets.responseExpected == 'undefined') {
            preSets.responseExpected = true;
        }
        data.wsfunction = method;
        data.wstoken = preSets.wstoken;
        siteurl = preSets.siteurl + '/webservice/rest/server.php?moodlewsrestformat=json';
        var ajaxData = data;
        return $http.post(siteurl, ajaxData).then(function(data) {
            if ((!data || !data.data) && !preSets.responseExpected) {
                data = {};
            } else {
                data = data.data;
            }
            if (!data) {
                return $mmLang.translateAndReject('mm.core.serverconnection');
            } else if (typeof data != preSets.typeExpected) {
                $log.warn('Response of type "' + typeof data + '" received, expecting "' + preSets.typeExpected + '"');
                return $mmLang.translateAndReject('mm.core.errorinvalidresponse');
            }
            if (typeof(data.exception) !== 'undefined') {
                if (data.errorcode == 'invalidtoken' ||
                        (data.errorcode == 'accessexception' && data.message.indexOf('Invalid token - token expired') > -1)) {
                    $log.error("Critical error: " + JSON.stringify(data));
                    return $q.reject(mmCoreSessionExpired);
                } else if (data.errorcode === 'userdeleted') {
                    return $q.reject(mmCoreUserDeleted);
                } else {
                    return $q.reject(data.message);
                }
            }
            if (typeof(data.debuginfo) != 'undefined') {
                return $q.reject('Error. ' + data.message);
            }
            $log.info('WS: Data received from WS ' + typeof(data));
            if (typeof(data) == 'object' && typeof(data.length) != 'undefined') {
                $log.info('WS: Data number of elements '+ data.length);
            }
            return data;
        }, function() {
            return $mmLang.translateAndReject('mm.core.serverconnection');
        });
    };
        function convertValuesToString(data) {
        var result = [];
        if (!angular.isArray(data) && angular.isObject(data)) {
            result = {};
        }
        for (var el in data) {
            if (angular.isObject(data[el])) {
                result[el] = convertValuesToString(data[el]);
            } else {
                result[el] = data[el] + '';
            }
        }
        return result;
    }
        self.downloadFile = function(url, path, background) {
        $log.debug('Downloading file ' + url);
        var tmpPath = path + '.tmp';
        return $mmFS.createFile(tmpPath).then(function(fileEntry) {
            return $cordovaFileTransfer.download(url, fileEntry.toURL(), { encodeURI: false }, true).then(function() {
                return $mmFS.moveFile(tmpPath, path).then(function(movedEntry) {
                    $log.debug('Success downloading file ' + url + ' to ' + path);
                    return movedEntry;
                });
            });
        }).catch(function(err) {
            $log.error('Error downloading ' + url + ' to ' + path);
            $log.error(JSON.stringify(err));
            return $q.reject(err);
        });
    };
        self.uploadFile = function(uri, options, presets) {
        $log.debug('Trying to upload file: ' + uri);
        var ftOptions = {},
            deferred = $q.defer();
        ftOptions.fileKey = options.fileKey;
        ftOptions.fileName = options.fileName;
        ftOptions.httpMethod = 'POST';
        ftOptions.mimeType = options.mimeType;
        ftOptions.params = {
            token: presets.token
        };
        ftOptions.chunkedMode = false;
        ftOptions.headers = {
            Connection: "close"
        };
        $log.debug('Initializing upload');
        $cordovaFileTransfer.upload(presets.siteurl + '/webservice/upload.php', uri, ftOptions, true).then(function(success) {
            $log.debug('Successfully uploaded file');
            deferred.resolve(success);
        }, function(error) {
            $log.error('Error while uploading file: ' + error.exception);
            deferred.reject(error);
        }, function(progress) {
            deferred.notify(progress);
        });
        return deferred.promise;
    };
        self.getRemoteFileSize = function(url) {
        return $http.head(url).then(function(data) {
            var size = parseInt(data.headers('Content-Length'), 10);
            if (size) {
                return size;
            }
            return -1;
        }).catch(function() {
            return -1;
        });
    };
        self.syncCall = function(method, data, preSets) {
        var siteurl,
            xhr,
            errorResponse = {
                error: true,
                message: ''
            };
        data = convertValuesToString(data);
        if (typeof preSets == 'undefined' || preSets === null ||
                typeof preSets.wstoken == 'undefined' || typeof preSets.siteurl == 'undefined') {
            errorResponse.message = $translate.instant('mm.core.unexpectederror');
            return errorResponse;
        } else if (!$mmApp.isOnline()) {
            errorResponse.message = $translate.instant('mm.core.networkerrormsg');
            return errorResponse;
        }
        preSets.typeExpected = preSets.typeExpected || 'object';
        if (typeof preSets.responseExpected == 'undefined') {
            preSets.responseExpected = true;
        }
        data.wsfunction = method;
        data.wstoken = preSets.wstoken;
        siteurl = preSets.siteurl + '/webservice/rest/server.php?moodlewsrestformat=json';
        data = $mmUtil.param(data);
        xhr = new $window.XMLHttpRequest();
        xhr.open('post', siteurl, false);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        xhr.send(data);
        data = ('response' in xhr) ? xhr.response : xhr.responseText;
        xhr.status = Math.max(xhr.status === 1223 ? 204 : xhr.status, 0);
        if (xhr.status < 200 || xhr.status >= 300) {
            errorResponse.message = data;
            return errorResponse;
        }
        try {
            data = JSON.parse(data);
        } catch(ex) {}
        if ((!data || !data.data) && !preSets.responseExpected) {
            data = {};
        }
        if (!data) {
            errorResponse.message = $translate.instant('mm.core.serverconnection');
        } else if (typeof data != preSets.typeExpected) {
            $log.warn('Response of type "' + typeof data + '" received, expecting "' + preSets.typeExpected + '"');
            errorResponse.message = $translate.instant('mm.core.errorinvalidresponse');
        }
        if (typeof data.exception != 'undefined' || typeof data.debuginfo != 'undefined') {
            errorResponse.message = data.message;
        }
        if (errorResponse.message !== '') {
            return errorResponse;
        }
        $log.info('Synchronous: Data received from WS ' + typeof data);
        if (typeof(data) == 'object' && typeof(data.length) != 'undefined') {
            $log.info('Synchronous: Data number of elements '+ data.length);
        }
        return data;
    };
    return self;
}]);

angular.module('mm.core')
.filter('mmBytesToSize', ["$mmText", function($mmText) {
    return function(text) {
        return $mmText.bytesToSize(text);
    };
}]);
angular.module('mm.core')
.filter('mmCreateLinks', function() {
    var replacePattern = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])(?![^<]*>|[^<>]*<\/)/gim;
    return function(text) {
        return text.replace(replacePattern, '<a href="$1">$1</a>');
    };
});
angular.module('mm.core')
.filter('mmDateDayOrTime', ["$translate", function($translate) {
    return function(timestamp) {
        return moment(timestamp * 1000).calendar(null, {
            sameDay: $translate.instant('mm.core.dftimedate'),
            lastDay: $translate.instant('mm.core.dflastweekdate'),
            lastWeek: $translate.instant('mm.core.dflastweekdate')
        });
    };
}]);

angular.module('mm.core')
.filter('mmFormatDate', ["$translate", function($translate) {
    return function(timestamp, format) {
        if (format.indexOf('.') == -1) {
            format = 'mm.core.' + format;
        }
        return moment(timestamp).format($translate.instant(format));
    };
}]);

angular.module('mm.core')
.filter('mmNoTags', function() {
    return function(text) {
        return String(text).replace(/(<([^>]+)>)/ig, '');
    }
});
angular.module('mm.core')
.filter('mmTimeAgo', function() {
    return function(timestamp) {
        return moment(timestamp * 1000).fromNow(true);
    };
});

angular.module('mm.core')
.filter('mmToLocaleString', function() {
    return function(text) {
        var timestamp = parseInt(text);
        if (isNaN(timestamp) || timestamp < 0) {
            return '';
        }
        if (timestamp < 100000000000) {
            timestamp = timestamp * 1000;
        }
        return new Date(timestamp).toLocaleString();
    };
});

angular.module('mm.core')
.directive('mmAutoFocus', ["$mmApp", function($mmApp) {
    return {
        restrict: 'A',
        link: function(scope, el) {
            var unregister = scope.$watch(function() {
                return ionic.transition.isActive;
            }, function(isActive) {
                if (!isActive) {
                    el[0].focus();
                    unregister();
                    if (ionic.Platform.isAndroid()) {
                        $mmApp.openKeyboard();
                    }
                }
            });
        }
    };
}]);

angular.module('mm.core')
.directive('mmCompletion', ["$mmSite", "$mmUtil", "$mmText", "$translate", "$q", function($mmSite, $mmUtil, $mmText, $translate, $q) {
    function showStatus(scope) {
        var langKey,
            moduleName = scope.moduleName || '';
        if (scope.completion.tracking === 1 && scope.completion.state === 0) {
            scope.completionImage = 'img/completion/completion-manual-n.svg';
            langKey = 'mm.core.completion-alt-manual-n';
        } else if(scope.completion.tracking === 1 && scope.completion.state === 1) {
            scope.completionImage = 'img/completion/completion-manual-y.svg';
            langKey = 'mm.core.completion-alt-manual-y';
        } else if(scope.completion.tracking === 2 && scope.completion.state === 0) {
            scope.completionImage = 'img/completion/completion-auto-n.svg';
            langKey = 'mm.core.completion-alt-auto-n';
        } else if(scope.completion.tracking === 2 && scope.completion.state === 1) {
            scope.completionImage = 'img/completion/completion-auto-y.svg';
            langKey = 'mm.core.completion-alt-auto-y';
        } else if(scope.completion.tracking === 2 && scope.completion.state === 2) {
            scope.completionImage = 'img/completion/completion-auto-pass.svg';
            langKey = 'mm.core.completion-alt-auto-pass';
        } else if(scope.completion.tracking === 2 && scope.completion.state === 3) {
            scope.completionImage = 'img/completion/completion-auto-fail.svg';
            langKey = 'mm.core.completion-alt-auto-fail';
        }
        if (moduleName) {
            $mmText.formatText(moduleName, true, true, 50).then(function(formatted) {
                $translate(langKey, {$a: formatted}).then(function(translated) {
                    scope.completionDescription = translated;
                });
            });
        }
    }
    return {
        restrict: 'E',
        priority: 100,
        scope: {
            completion: '=',
            afterChange: '=',
            moduleName: '=?'
        },
        templateUrl: 'core/templates/completion.html',
        link: function(scope, element, attrs) {
            if (scope.completion) {
                showStatus(scope);
                element.on('click', function(e) {
                    if (typeof scope.completion.cmid == 'undefined' || scope.completion.tracking !== 1) {
                        return;
                    }
                    e.preventDefault();
                    e.stopPropagation();
                    var modal = $mmUtil.showModalLoading(),
                        params = {
                            cmid: scope.completion.cmid,
                            completed: scope.completion.state === 1 ? 0 : 1
                        };
                    $mmSite.write('core_completion_update_activity_completion_status_manually', params).then(function(response) {
                        if (!response.status) {
                            return $q.reject();
                        }
                        if (angular.isFunction(scope.afterChange)) {
                            scope.afterChange();
                        }
                    }).catch(function(error) {
                        if (error) {
                            $mmUtil.showErrorModal(error);
                        } else {
                            $mmUtil.showErrorModal('mm.core.errorchangecompletion', true);
                        }
                    }).finally(function() {
                        modal.dismiss();
                    });
                });
            }
        }
    };
}]);

angular.module('mm.core')
.directive('mmExternalContent', ["$log", "$mmFilepool", "$mmSite", "$mmSitesManager", "$mmUtil", "$q", function($log, $mmFilepool, $mmSite, $mmSitesManager, $mmUtil, $q) {
    $log = $log.getInstance('mmExternalContent');
        function addSource(dom, url) {
        if (dom.tagName !== 'SOURCE') {
            return;
        }
        var e = document.createElement('source'),
            type = dom.getAttribute('type');
        e.setAttribute('src', url);
        if (type) {
            e.setAttribute('type', type);
        }
        dom.parentNode.insertBefore(e, dom);
    }
        function handleExternalContent(siteId, dom, targetAttr, url, component, componentId) {
        if (!url || !$mmUtil.isDownloadableUrl(url)) {
            $log.debug('Ignoring non-downloadable URL: ' + url);
            if (dom.tagName === 'SOURCE') {
                addSource(dom, url);
            }
            return $q.reject();
        }
        return $mmSitesManager.getSite(siteId).then(function(site) {
            if (!site.canDownloadFiles() && $mmUtil.isPluginFileUrl(url)) {
                dom.remove();
                return $q.reject();
            }
            var fn;
            if (targetAttr === 'src' && dom.tagName !== 'SOURCE') {
                fn = $mmFilepool.getSrcByUrl;
            } else {
                fn = $mmFilepool.getUrlByUrl;
            }
            return fn(siteId, url, component, componentId).then(function(finalUrl) {
                $log.debug('Using URL ' + finalUrl + ' for ' + url);
                if (dom.tagName === 'SOURCE') {
                    addSource(dom, finalUrl);
                } else {
                    dom.setAttribute(targetAttr, finalUrl);
                }
            });
        });
    }
    return {
        restrict: 'A',
        scope: {
            siteid: '='
        },
        link: function(scope, element, attrs) {
            var dom = element[0],
                siteid = scope.siteid || $mmSite.getId(),
                component = attrs.component,
                componentId = attrs.componentId,
                targetAttr,
                sourceAttr,
                observe = false;
            if (dom.tagName === 'A') {
                targetAttr = 'href';
                sourceAttr = 'href';
                if (attrs.hasOwnProperty('ngHref')) {
                    observe = true;
                }
            } else if (dom.tagName === 'IMG') {
                targetAttr = 'src';
                sourceAttr = 'src';
                if (attrs.hasOwnProperty('ngSrc')) {
                    observe = true;
                }
            } else if (dom.tagName === 'AUDIO' || dom.tagName === 'VIDEO' || dom.tagName === 'SOURCE') {
                targetAttr = 'src';
                sourceAttr = 'targetSrc';
                if (attrs.hasOwnProperty('ngSrc')) {
                    observe = true;
                }
            } else {
                $log.warn('Directive attached to non-supported tag: ' + dom.tagName);
                return;
            }
            if (observe) {
                attrs.$observe(targetAttr, function(url) {
                    if (!url) {
                        return;
                    }
                    handleExternalContent(siteid, dom, targetAttr, url, component, componentId);
                });
            } else {
                handleExternalContent(siteid, dom, targetAttr, attrs[sourceAttr] || attrs[targetAttr], component, componentId);
            }
        }
    };
}]);

angular.module('mm.core')
.directive('mmFile', ["$q", "$mmUtil", "$mmFilepool", "$mmSite", "$mmApp", "$mmEvents", "$mmFS", "mmCoreDownloaded", "mmCoreDownloading", "mmCoreNotDownloaded", "mmCoreOutdated", function($q, $mmUtil, $mmFilepool, $mmSite, $mmApp, $mmEvents, $mmFS, mmCoreDownloaded, mmCoreDownloading,
            mmCoreNotDownloaded, mmCoreOutdated) {
        function getState(scope, siteid, fileurl, timemodified) {
        return $mmFilepool.getFileStateByUrl(siteid, fileurl, timemodified).then(function(state) {
            var canDownload = $mmSite.canDownloadFiles();
            scope.isDownloaded = state === mmCoreDownloaded || state === mmCoreOutdated;
            scope.isDownloading = canDownload && state === mmCoreDownloading;
            scope.showDownload = canDownload && (state === mmCoreNotDownloaded || state === mmCoreOutdated);
        });
    }
        function downloadFile(scope, siteid, fileurl, component, componentid, timemodified) {
        if (!$mmSite.canDownloadFiles()) {
            $mmUtil.showErrorModal('mm.core.cannotdownloadfiles', true);
            return $q.reject();
        }
        scope.isDownloading = true;
        return $mmFilepool.downloadUrl(siteid, fileurl, true, component, componentid, timemodified).then(function(localUrl) {
            getState(scope, siteid, fileurl, timemodified);
            return localUrl;
        }, function() {
            return getState(scope, siteid, fileurl, timemodified).then(function() {
                if (scope.isDownloaded) {
                    return localUrl;
                } else {
                    return $q.reject();
                }
            });
        });
    }
    return {
        restrict: 'E',
        templateUrl: 'core/templates/file.html',
        scope: {
            file: '='
        },
        link: function(scope, element, attrs) {
            var fileurl = scope.file.fileurl || scope.file.url,
                filename = scope.file.filename,
                filesize = scope.file.filesize,
                timemodified = attrs.timemodified || 0,
                siteid = $mmSite.getId(),
                component = attrs.component,
                componentid = attrs.componentId,
                observer;
            scope.filename = filename;
            scope.fileicon = $mmFS.getFileIcon(filename);
            getState(scope, siteid, fileurl, timemodified);
            $mmFilepool.getFileEventNameByUrl(siteid, fileurl).then(function(eventName) {
                observer = $mmEvents.on(eventName, function(data) {
                    getState(scope, siteid, fileurl, timemodified);
                    if (!data.success) {
                        $mmUtil.showErrorModal('mm.core.errordownloading', true);
                    }
                });
            });
            scope.download = function(e, openAfterDownload) {
                e.preventDefault();
                e.stopPropagation();
                var promise;
                if (scope.isDownloading) {
                    return;
                }
                if (!$mmApp.isOnline() && (!openAfterDownload || (openAfterDownload && !scope.isDownloaded))) {
                    $mmUtil.showErrorModal('mm.core.networkerrormsg', true);
                    return;
                }
                if (openAfterDownload) {
                    downloadFile(scope, siteid, fileurl, component, componentid, timemodified).then(function(localUrl) {
                        $mmUtil.openFile(localUrl).catch(function(error) {
                            $mmUtil.showErrorModal(error);
                        });
                    });
                } else {
                    promise = filesize ? $mmUtil.confirmDownloadSize(filesize) : $q.when();
                    promise.then(function() {
                        $mmFilepool.invalidateFileByUrl(siteid, fileurl).finally(function() {
                            scope.isDownloading = true;
                            $mmFilepool.addToQueueByUrl(siteid, fileurl, component, componentid, timemodified);
                        });
                    });
                }
            };
            scope.$on('$destroy', function() {
                if (observer && observer.off) {
                    observer.off();
                }
            });
        }
    };
}]);

angular.module('mm.core')
.directive('mmFormatText', ["$interpolate", "$mmText", "$compile", "$translate", "$state", function($interpolate, $mmText, $compile, $translate, $state) {
    var extractVariableRegex = new RegExp('{{([^|]+)(|.*)?}}', 'i'),
        tagsToIgnore = ['AUDIO', 'VIDEO', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', 'A'];
        function addExternalContent(el, component, componentId, siteId) {
        el.setAttribute('mm-external-content', '');
        if (component) {
            el.setAttribute('component', component);
            if (componentId) {
                el.setAttribute('component-id', componentId);
            }
        }
        if (siteId) {
            el.setAttribute('siteid', siteId);
        }
    }
        function calculateShorten(element, shorten) {
        var multiplier;
        if (typeof shorten == 'string' && shorten.indexOf('%') > -1) {
            multiplier = parseInt(shorten.replace(/%/g, '').trim()) / 100;
            if (isNaN(multiplier)) {
                multiplier = 0.3;
            }
        } else if (typeof shorten != 'undefined' && shorten === '') {
            multiplier = 0.3;
        } else {
            var number = parseInt(shorten);
            if (isNaN(number)) {
                return;
            } else {
                return number;
            }
        }
        var el = element[0],
            elWidth = el.offsetWidth || el.width || el.clientWidth;
        if (!elWidth) {
            return 100;
        } else {
            return Math.round(elWidth * multiplier);
        }
    }
        function addMediaAdaptClass(el) {
        angular.element(el).addClass('mm-media-adapt-width');
    }
        function formatAndRenderContents(scope, element, attrs, text) {
        if (typeof text == 'undefined') {
            element.removeClass('hide');
            return;
        }
        attrs.shorten = calculateShorten(element, attrs.shorten);
        var shorten = (attrs.expandOnClick || attrs.fullviewOnClick) ? 0 : attrs.shorten;
        text = $interpolate(text)(scope);
        text = text.trim();
        formatContents(scope, element, attrs, text, shorten).then(function(fullText) {
            if (attrs.shorten && (attrs.expandOnClick || attrs.fullviewOnClick)) {
                var shortened = $mmText.shortenText($mmText.cleanTags(fullText, false), parseInt(attrs.shorten)),
                    expanded = false;
                if (shortened.trim() === '') {
                    var hasContent = false,
                        meaningfulTags = ['img', 'video', 'audio'];
                    angular.forEach(meaningfulTags, function(tag) {
                        if (fullText.indexOf('<'+tag) > -1) {
                            hasContent = true;
                        }
                    });
                    if (hasContent) {
                        shortened = $translate.instant(attrs.expandOnClick ? 'mm.core.clicktohideshow' : 'mm.core.clicktoseefull');
                    }
                }
                element.on('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var target = e.target;
                    if (tagsToIgnore.indexOf(target.tagName) === -1 || (target.tagName === 'A' && !target.getAttribute('href'))) {
                        if (attrs.expandOnClick) {
                            expanded = !expanded;
                            element.html( expanded ? fullText : shortened);
                            if (expanded) {
                                $compile(element.contents())(scope);
                            }
                        } else {
                            $state.go('site.mm_textviewer', {
                                title: $translate.instant('mm.core.description'),
                                content: text
                            });
                        }
                    }
                });
                renderText(scope, element, shortened, attrs.afterRender);
            } else {
                renderText(scope, element, fullText, attrs.afterRender);
            }
        });
    }
        function formatContents(scope, element, attrs, text, shorten) {
        var siteId = scope.siteid,
            component = attrs.component,
            componentId = attrs.componentId;
        return $mmText.formatText(text, attrs.clean, attrs.singleline, shorten).then(function(formatted) {
            var el = element[0],
                elWidth = el.offsetWidth || el.width || el.clientWidth,
                dom = angular.element('<div>').html(formatted);
            angular.forEach(dom.find('a'), function(anchor) {
                anchor.setAttribute('mm-link', '');
                anchor.setAttribute('capture-link', true);
                addExternalContent(anchor, component, componentId, siteId);
            });
            angular.forEach(dom.find('img'), function(img) {
                addMediaAdaptClass(img);
                addExternalContent(img, component, componentId, siteId);
                var imgWidth = img.offsetWidth || img.width || img.clientWidth;
                if (imgWidth > elWidth) {
                    var div = angular.element('<div class="mm-adapted-img-container"></div>'),
                        jqImg = angular.element(img),
                        label = $mmText.escapeHTML($translate.instant('mm.core.openfullimage')),
                        imgSrc = $mmText.escapeHTML(img.getAttribute('src'));
                    img.style.float = '';
                    jqImg.wrap(div);
                    jqImg.after('<a href="#" class="mm-image-viewer-icon" mm-image-viewer img="' + imgSrc +
                                    '" aria-label="' + label + '"><i class="icon ion-ios-search-strong"></i></a>');
                }
            });
            angular.forEach(dom.find('audio'), function(el) {
                treatMedia(el, component, componentId, siteId);
            });
            angular.forEach(dom.find('video'), function(el) {
                treatMedia(el, component, componentId, siteId);
                el.setAttribute('data-tap-disabled', true);
            });
            angular.forEach(dom.find('iframe'), addMediaAdaptClass);
            return dom.html();
        });
    }
        function renderText(scope, element, text, afterRender) {
        element.html(text);
        element.removeClass('hide');
        $compile(element.contents())(scope);
        if (afterRender && scope[afterRender]) {
            scope[afterRender](scope);
        }
    }
        function treatMedia(el, component, componentId, siteId) {
        addMediaAdaptClass(el);
        addExternalContent(el, component, componentId, siteId);
        angular.forEach(angular.element(el).find('source'), function(source) {
            source.setAttribute('target-src', source.getAttribute('src'));
            source.removeAttribute('src');
            addExternalContent(source, component, componentId, siteId);
        });
    }
    return {
        restrict: 'E',
        scope: true,
        link: function(scope, element, attrs) {
            element.addClass('hide');
            var content = element.html();
            if (attrs.watch) {
                var matches = content.match(extractVariableRegex);
                if (matches && typeof matches[1] == 'string') {
                    var variable = matches[1].trim();
                    scope.$watch(variable, function() {
                        formatAndRenderContents(scope, element, attrs, content);
                    });
                }
            } else {
                formatAndRenderContents(scope, element, attrs, content);
            }
        }
    };
}]);

angular.module('mm.core')
.directive('mmIframe', ["$mmUtil", function($mmUtil) {
    var errorShownTime = 0,
        tags = ['iframe', 'frame', 'object', 'embed'];
        function treatFrame(element) {
        if (element) {
            redefineWindowOpen(element);
            treatLinks(element);
            element.on('load', function() {
                redefineWindowOpen(element);
                treatLinks(element);
            });
        }
    }
        function redefineWindowOpen(element) {
        var el = element[0],
            contentWindow = element.contentWindow || el.contentWindow,
            contents = element.contents();
        if (!contentWindow && el && el.contentDocument) {
            contentWindow = el.contentDocument.defaultView;
        }
        if (!contentWindow && el && el.getSVGDocument) {
            var svgDoc = el.getSVGDocument;
            if (svgDoc && svgDoc.defaultView) {
                contents = angular.element(svgdoc);
                contentWindow = svgdoc.defaultView;
            } else if (el.window) {
                contentWindow = el.window;
            } else if (el.getWindow) {
                contentWindow = el.getWindow();
            }
        }
        if (contentWindow) {
            contentWindow.open = function () {
                var currentTime = new Date().getTime();
                if (currentTime - errorShownTime > 500) {
                    errorShownTime = currentTime;
                    $mmUtil.showErrorModal('mm.core.erroropenpopup', true);
                }
                return {};
            };
        }
        angular.forEach(tags, function(tag) {
            angular.forEach(contents.find(tag), function(subelement) {
                treatFrame(angular.element(subelement));
            });
        });
    }
        function treatLinks(element) {
        var links = element.contents().find('a');
        angular.forEach(links, function(el) {
            var href = el.href;
            if (href) {
                if (href.indexOf('http') === 0) {
                    angular.element(el).on('click', function(e) {
                        e.preventDefault();
                        $mmUtil.openInBrowser(href);
                    });
                } else if (el.target == '_parent' || el.target == '_top' || el.target == '_blank') {
                    angular.element(el).on('click', function(e) {
                        if (!e.defaultPrevented) {
                            e.preventDefault();
                            $mmUtil.openInApp(href);
                        }
                    });
                }
            }
        });
    }
    return {
        restrict: 'E',
        template: '<div class="iframe-wrapper"><iframe class="mm-iframe" ng-style="{\'width\': width, \'height\': height}" ng-src="{{src}}"></iframe></div>',
        scope: {
            src: '='
        },
        link: function(scope, element, attrs) {
            scope.width = $mmUtil.formatPixelsSize(attrs.iframeWidth) || '100%';
            scope.height = $mmUtil.formatPixelsSize(attrs.iframeHeight) || '100%';
            var iframe = angular.element(element.find('iframe')[0]);
            treatFrame(iframe);
        }
    };
}]);

angular.module('mm.core')
.directive('mmImageViewer', ["$ionicModal", function($ionicModal) {
    return {
        restrict: 'A',
        priority: 500,
        scope: true,
        link: function(scope, element, attrs) {
            if (attrs.img) {
                scope.img = attrs.img;
                scope.closeModal = function(){
                    scope.modal.hide();
                };
                element.on('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (!scope.modal) {
                        $ionicModal.fromTemplateUrl('core/templates/imageviewer.html', {
                            scope: scope,
                            animation: 'slide-in-up'
                        }).then(function(m) {
                            scope.modal = m;
                            scope.modal.show();
                        });
                    } else {
                        scope.modal.show();
                    }
                });
                scope.$on('$destroy', function() {
                    if (scope.modal) {
                        scope.modal.remove();
                    }
                });
            }
        }
    };
}]);

angular.module('mm.core')
.directive('mmLink', ["$mmUtil", "$mmContentLinksHelper", "$location", function($mmUtil, $mmContentLinksHelper, $location) {
        function navigate(href) {
        if (href.indexOf('cdvfile://') === 0 || href.indexOf('file://') === 0) {
            $mmUtil.openFile(href).catch(function(error) {
                $mmUtil.showErrorModal(error);
            });
        } else if (href.charAt(0) == '#'){
            href = href.substr(1);
            if (href.charAt(0) == '/') {
                $location.url(href);
            } else {
                $mmUtil.scrollToElement(document, "#" + href + ", [name='" + href + "']");
            }
        } else {
            $mmUtil.openInBrowser(href);
        }
    }
    return {
        restrict: 'A',
        priority: 100,
        link: function(scope, element, attrs) {
            element.on('click', function(event) {
                var href = element[0].getAttribute('href');
                if (href) {
                    event.preventDefault();
                    event.stopPropagation();
                    if (attrs.captureLink && attrs.captureLink !== 'false') {
                        $mmContentLinksHelper.handleLink(href).then(function(treated) {
                            if (!treated) {
                               navigate(href);
                            }
                        });
                    } else {
                        navigate(href);
                    }
                }
            });
        }
    };
}]);

angular.module('mm.core')
.directive('mmLoading', ["$translate", function($translate) {
    return {
        restrict: 'E',
        templateUrl: 'core/templates/loading.html',
        transclude: true,
        scope: {
            hideUntil: '=?',
            message: '@?',
            dynMessage: '=?',
            loadingPaddingTop: '=?'
        },
        link: function(scope, element, attrs) {
            var el = element[0],
                loading = angular.element(el.querySelector('.mm-loading-container'));
            if (!attrs.message) {
                $translate('mm.core.loading').then(function(loadingString) {
                    scope.message = loadingString;
                });
            }
            if (attrs.loadingPaddingTop) {
                scope.$watch('loadingPaddingTop', function(newValue) {
                    var num = parseInt(newValue);
                    if (num >= 0 || num < 0) {
                        loading.css('padding-top', newValue + 'px');
                    } else if(typeof newValue == 'string') {
                        loading.css('padding-top', newValue);
                    }
                });
            }
        }
    };
}]);

angular.module('mm.core')
.directive('mmNavigationBar', ["$state", "$translate", function($state, $translate) {
    return {
        restrict: 'E',
        scope: {
            previous: '=?',
            next: '=?',
            action: '=?',
            info: '=?'
        },
        templateUrl: 'core/templates/navigationbar.html',
        link: function(scope, element, attrs) {
            scope.title = attrs.title || $translate.instant('mm.core.info');
            scope.showInfo = function() {
                $state.go('site.mm_textviewer', {
                    title: scope.title,
                    content: scope.info
                });
            };
        }
    };
}]);

angular.module('mm.core')
.directive('mmNoInputValidation', function() {
    return {
        restrict: 'A',
        priority: 500,
        compile: function(el, attrs) {
            attrs.$set('type',
                null,               
                false               
            );
        }
    }
});

angular.module('mm.core')
.constant('mmCoreSplitViewLoad', 'mmSplitView:load')
.directive('mmSplitView', ["$log", "$state", "$ionicPlatform", "$timeout", "$mmUtil", "$interpolate", "mmCoreSplitViewLoad", function($log, $state, $ionicPlatform, $timeout, $mmUtil, $interpolate, mmCoreSplitViewLoad) {
    $log = $log.getInstance('mmSplitView');
        function triggerClick(link) {
        if (link && link.length && link.triggerHandler) {
            link.triggerHandler('click');
            return true;
        }
        return false;
    }
    function controller() {
        var self = this,
            element,
            menuState,
            linkToLoad,
            component;
                this.clearMarkedLinks = function() {
            angular.element(element.querySelectorAll('[mm-split-view-link]')).removeClass('mm-split-item-selected');
        };
                this.getComponent = function() {
            return component;
        };
                this.getMenuState = function() {
            return menuState || $state.current.name;
        };
                this.loadLink = function(scope, loadAttr, retrying) {
            if ($ionicPlatform.isTablet()) {
                if (!linkToLoad) {
                    if (typeof loadAttr != 'undefined') {
                        var position = parseInt(loadAttr);
                        if (!position) {
                            position = parseInt($interpolate(loadAttr)(scope), 10);
                        }
                        if (position) {
                            var links = element.querySelectorAll('[mm-split-view-link]');
                            position = position > links.length ? 0 : position - 1;
                            linkToLoad = angular.element(links[position]);
                        } else {
                            linkToLoad = angular.element(element.querySelector('[mm-split-view-link]'));
                        }
                    } else {
                        linkToLoad = angular.element(element.querySelector('[mm-split-view-link]'));
                    }
                }
                if (!triggerClick(linkToLoad)) {
                    if (!retrying) {
                        linkToLoad = undefined;
                        $timeout(function() {
                            self.loadLink(scope, loadAttr, true);
                        });
                    }
                }
            }
        };
                this.setComponent = function(cmp) {
            component = cmp;
        };
                this.setElement = function(el) {
            element = el;
        };
                this.setLink = function(link) {
            linkToLoad = link;
        };
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
            if (attrs.loadWhen) {
                scope.$watch(attrs.loadWhen, function(newValue) {
                    if (newValue) {
                        controller.loadLink(scope, attrs.load);
                    }
                });
            } else {
                controller.loadLink(scope, attrs.load);
            }
            scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
                if (toState.name === menuState && $mmUtil.basicLeftCompare(toParams, menuParams, 1)) {
                    controller.loadLink();
                }
            });
            scope.$on(mmCoreSplitViewLoad, function(e, data) {
                if (data && data.load) {
                    controller.loadLink(scope, data.load);
                } else {
                    controller.loadLink(scope, attrs.load);
                }
            });
        }
    };
}]);

angular.module('mm.core')
.directive('mmSplitViewLink', ["$log", "$ionicPlatform", "$state", "$mmApp", function($log, $ionicPlatform, $state, $mmApp) {
    $log = $log.getInstance('mmSplitViewLink');
    var srefRegex = new RegExp(/([^\(]*)(\((.*)\))?$/);
        function createTabletState(stateName, tabletStateName, newViewName) {
        var targetState = $state.get(stateName),
            newConfig,
            viewName;
        if (targetState) {
            newConfig = angular.copy(targetState);
            viewName = Object.keys(newConfig.views)[0];
            newConfig.views[newViewName] = newConfig.views[viewName];
            delete newConfig.views[viewName];
            delete newConfig['name'];
            $mmApp.createState(tabletStateName, newConfig);
            return true;
        } else {
            $log.error('State doesn\'t exist: '+stateName);
            return false;
        }
    }
        function scopeEval(scope, value) {
        if (typeof value == 'string') {
            try {
                return scope.$eval(value);
            } catch(ex) {
                $log.error('Error evaluating string: ' + param);
            }
        }
    }
    return {
        restrict: 'A',
        require: '^mmSplitView',
        link: function(scope, element, attrs, splitViewController) {
            var sref = attrs.mmSplitViewLink,
                menuState = splitViewController.getMenuState(),
                matches,
                stateName,
                stateParams,
                stateParamsString,
                tabletStateName;
            if (sref) {
                matches = sref.match(srefRegex);
                if (matches && matches.length) {
                    stateName = matches[1];
                    tabletStateName = menuState + '.' + stateName.substr(stateName.lastIndexOf('.') + 1);
                    stateParamsString = matches[3];
                    stateParams = scopeEval(scope, stateParamsString);
                    scope.$watch(stateParamsString, function(newVal) {
                        stateParams = newVal;
                    });
                    element.on('click', function(event) {
                        event.stopPropagation();
                        event.preventDefault();
                        if ($ionicPlatform.isTablet()) {
                            if (!$state.get(tabletStateName)) {
                                if (!createTabletState(stateName, tabletStateName, splitViewController.getComponent())) {
                                    return;
                                }
                            }
                            splitViewController.setLink(element);
                            splitViewController.clearMarkedLinks();
                            element.addClass('mm-split-item-selected');
                            $state.go(tabletStateName, stateParams, {location:'replace'});
                        } else {
                            $state.go(stateName, stateParams);
                        }
                    });
                } else {
                    $log.error('Invalid sref.');
                }
            } else {
                $log.error('Invalid sref.');
            }
        }
    };
}]);

angular.module('mm.core')
.directive('mmStateClass', ["$state", function($state) {
    return {
        restrict: 'A',
        link: function(scope, el) {
            var current = $state.$current.name,
                split,
                className = 'mm-';
            if (typeof current == 'string') {
                split = current.split('.');
                className += split.shift();
                if (split.length) {
                    className += '_' + split.pop();
                }
                el.addClass(className);
            }
        }
    };
}]);

angular.module('mm.core.contentlinks', [])
.config(["$stateProvider", function($stateProvider) {
    $stateProvider
    .state('mm_contentlinks', {
        url: '/mm_contentlinks',
        abstract: true,
        templateUrl: 'core/components/contentlinks/templates/base.html',
        cache: false,  
    })
    .state('mm_contentlinks.choosesite', {
        url: '/choosesite',
        templateUrl: 'core/components/contentlinks/templates/choosesite.html',
        controller: 'mmContentLinksChooseSiteCtrl',
        params: {
            url: null
        }
    });
}])
.run(["$log", "$mmURLDelegate", "$mmContentLinksHelper", function($log, $mmURLDelegate, $mmContentLinksHelper) {
    $log = $log.getInstance('mmContentLinks');
    $mmURLDelegate.register('mmContentLinks', $mmContentLinksHelper.handleCustomUrl);
}]);

angular.module('mm.core.course', ['mm.core.courses'])
.constant('mmCoreCoursePriority', 800)
.constant('mmCoreCourseAllSectionsId', -1)
.config(["$stateProvider", "$mmCoursesDelegateProvider", "mmCoreCoursePriority", function($stateProvider, $mmCoursesDelegateProvider, mmCoreCoursePriority) {
    $stateProvider
    .state('site.mm_course', {
        url: '/mm_course',
        params: {
            courseid: null,
            sid: null,
            moduleid: null
        },
        views: {
            'site': {
                templateUrl: 'core/components/course/templates/sections.html',
                controller: 'mmCourseSectionsCtrl'
            }
        }
    })
    .state('site.mm_course-section', {
        url: '/mm_course-section',
        params: {
            sectionid: null,
            cid: null,
            mid: null
        },
        views: {
            'site': {
                templateUrl: 'core/components/course/templates/section.html',
                controller: 'mmCourseSectionCtrl'
            }
        }
    })
    .state('site.mm_course-modcontent', {
        url: '/mm_course-modcontent',
        params: {
            module: null
        },
        views: {
            site: {
                templateUrl: 'core/components/course/templates/modcontent.html',
                controller: 'mmCourseModContentCtrl'
            }
        }
    });
    $mmCoursesDelegateProvider.registerNavHandler('mmCourse', '$mmCourseCoursesNavHandler', mmCoreCoursePriority);
}])
.run(["$mmEvents", "mmCoreEventLogin", "mmCoreEventSiteUpdated", "$mmCourseDelegate", function($mmEvents, mmCoreEventLogin, mmCoreEventSiteUpdated, $mmCourseDelegate) {
    $mmEvents.on(mmCoreEventLogin, $mmCourseDelegate.updateContentHandlers);
    $mmEvents.on(mmCoreEventSiteUpdated, $mmCourseDelegate.updateContentHandlers);
}]);

angular.module('mm.core.courses', [])
.constant('mmCoursesSearchComponent', 'mmCoursesSearch')
.constant('mmCoursesSearchPerPage', 20)
.constant('mmCoursesEnrolInvalidKey', 'mmCoursesEnrolInvalidKey')
.constant('mmCoursesEventMyCoursesUpdated', 'my_courses_updated')
.constant('mmCoursesEventMyCoursesRefreshed', 'my_courses_refreshed')
.constant('mmCoursesAccessMethods', {
     guest: 'guest',
     default: 'default'
})
.config(["$stateProvider", function($stateProvider) {
    $stateProvider
    .state('site.mm_courses', {
        url: '/mm_courses',
        views: {
            'site': {
                templateUrl: 'core/components/courses/templates/list.html',
                controller: 'mmCoursesListCtrl'
            }
        }
    })
    .state('site.mm_searchcourses', {
        url: '/mm_searchcourses',
        views: {
            'site': {
                templateUrl: 'core/components/courses/templates/search.html',
                controller: 'mmCoursesSearchCtrl'
            }
        }
    })
    .state('site.mm_viewresult', {
        url: '/mm_viewresult',
        params: {
            course: null
        },
        views: {
            'site': {
                templateUrl: 'core/components/courses/templates/viewresult.html',
                controller: 'mmCoursesViewResultCtrl'
            }
        }
    });
}])
.config(["$mmContentLinksDelegateProvider", function($mmContentLinksDelegateProvider) {
    $mmContentLinksDelegateProvider.registerLinkHandler('mmCourses', '$mmCoursesHandlers.linksHandler');
}])
.run(["$mmEvents", "mmCoreEventLogin", "mmCoreEventSiteUpdated", "mmCoreEventLogout", "$mmCoursesDelegate", "$mmCourses", function($mmEvents, mmCoreEventLogin, mmCoreEventSiteUpdated, mmCoreEventLogout, $mmCoursesDelegate, $mmCourses) {
    $mmEvents.on(mmCoreEventLogin, $mmCoursesDelegate.updateNavHandlers);
    $mmEvents.on(mmCoreEventSiteUpdated, $mmCoursesDelegate.updateNavHandlers);
    $mmEvents.on(mmCoreEventLogout, function() {
        $mmCoursesDelegate.clearCoursesHandlers();
        $mmCourses.clearCurrentCourses();
    });
}]);

angular.module('mm.core.login', [])
.config(["$stateProvider", "$urlRouterProvider", "$mmInitDelegateProvider", "mmInitDelegateMaxAddonPriority", function($stateProvider, $urlRouterProvider, $mmInitDelegateProvider, mmInitDelegateMaxAddonPriority) {
    $stateProvider
    .state('mm_login', {
        url: '/mm_login',
        abstract: true,
        templateUrl: 'core/components/login/templates/base.html',
        cache: false,  
        onEnter: ["$ionicHistory", function($ionicHistory) {
            $ionicHistory.clearHistory();
        }]
    })
    .state('mm_login.init', {
        url: '/init',
        templateUrl: 'core/components/login/templates/init.html',
        controller: 'mmLoginInitCtrl',
        cache: false
    })
    .state('mm_login.sites', {
        url: '/sites',
        templateUrl: 'core/components/login/templates/sites.html',
        controller: 'mmLoginSitesCtrl',
        onEnter: ["$mmLoginHelper", "$mmSitesManager", function($mmLoginHelper, $mmSitesManager) {
            $mmSitesManager.hasNoSites().then(function() {
                $mmLoginHelper.goToAddSite();
            });
        }]
    })
    .state('mm_login.site', {
        url: '/site',
        templateUrl: 'core/components/login/templates/site.html',
        controller: 'mmLoginSiteCtrl'
    })
    .state('mm_login.credentials', {
        url: '/cred',
        templateUrl: 'core/components/login/templates/credentials.html',
        controller: 'mmLoginCredentialsCtrl',
        params: {
            siteurl: '',
            username: '',
            urltoopen: ''
        },
        onEnter: ["$state", "$stateParams", function($state, $stateParams) {
            if (!$stateParams.siteurl) {
              $state.go('mm_login.init');
            }
        }]
    })
    .state('mm_login.reconnect', {
        url: '/reconnect',
        templateUrl: 'core/components/login/templates/reconnect.html',
        controller: 'mmLoginReconnectCtrl',
        cache: false,
        params: {
            siteurl: '',
            username: '',
            infositeurl: ''
        }
    });
    $urlRouterProvider.otherwise(function($injector) {
        var $state = $injector.get('$state');
        return $state.href('mm_login.init').replace('#', '');
    });
    $mmInitDelegateProvider.registerProcess('mmLogin', '$mmSitesManager.restoreSession', mmInitDelegateMaxAddonPriority + 200);
}])
.run(["$log", "$state", "$mmUtil", "$translate", "$mmSitesManager", "$rootScope", "$mmSite", "$mmURLDelegate", "$ionicHistory", "$mmEvents", "$mmLoginHelper", "mmCoreEventSessionExpired", "$mmApp", "mmCoreConfigConstants", function($log, $state, $mmUtil, $translate, $mmSitesManager, $rootScope, $mmSite, $mmURLDelegate, $ionicHistory,
                $mmEvents, $mmLoginHelper, mmCoreEventSessionExpired, $mmApp, mmCoreConfigConstants) {
    $log = $log.getInstance('mmLogin');
    $mmEvents.on(mmCoreEventSessionExpired, sessionExpired);
    $mmURLDelegate.register('mmLoginSSO', appLaunchedByURL);
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        if (!$mmApp.isReady() && toState.name !== 'mm_login.init') {
            event.preventDefault();
            $state.transitionTo('mm_login.init');
            $log.warn('Forbidding state change to \'' + toState.name + '\'. App is not ready yet.');
            return;
        }
        if (toState.name.substr(0, 8) === 'redirect' || toState.name.substr(0, 15) === 'mm_contentlinks') {
            return;
        } else if ((toState.name.substr(0, 8) !== 'mm_login' || toState.name === 'mm_login.reconnect') && !$mmSite.isLoggedIn()) {
            event.preventDefault();
            $log.debug('Redirect to login page, request was: ' + toState.name);
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.transitionTo('mm_login.init');
        } else if (toState.name.substr(0, 8) === 'mm_login' && toState.name !== 'mm_login.reconnect' && $mmSite.isLoggedIn()) {
            event.preventDefault();
            $log.debug('Redirect to course page, request was: ' + toState.name);
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $mmLoginHelper.goToSiteInitialPage();
        }
    });
    function sessionExpired(siteid) {
        var siteurl = $mmSite.getURL();
        if (typeof(siteurl) !== 'undefined') {
            if (siteid && siteid !== $mmSite.getId()) {
                return;
            }
            $mmSitesManager.checkSite(siteurl).then(function(result) {
                if (result.warning) {
                    $mmUtil.showErrorModal(result.warning, true, 4000);
                }
                if ($mmLoginHelper.isSSOLoginNeeded(result.code)) {
                    $mmUtil.showConfirm($translate('mm.login.reconnectssodescription')).then(function() {
                        $mmLoginHelper.openBrowserForSSOLogin(result.siteurl);
                    });
                } else {
                    var info = $mmSite.getInfo();
                    if (typeof(info) !== 'undefined' && typeof(info.username) !== 'undefined') {
                        $ionicHistory.nextViewOptions({disableBack: true});
                        $state.go('mm_login.reconnect',
                                        {siteurl: result.siteurl, username: info.username, infositeurl: info.siteurl});
                    }
                }
            });
        }
    }
    function appLaunchedByURL(url) {
        var ssoScheme = mmCoreConfigConstants.customurlscheme + '://token=';
        if (url.indexOf(ssoScheme) == -1) {
            return false;
        }
        $mmLoginHelper.setSSOLoginOngoing(true);
        $log.debug('App launched by URL');
        var modal = $mmUtil.showModalLoading('mm.login.authenticating', true);
        url = url.replace(ssoScheme, '');
        try {
            url = atob(url);
        } catch(err) {
            $log.error('Error decoding parameter received for login SSO');
            return false;
        }
        $mmLoginHelper.validateBrowserSSOLogin(url).then(function(sitedata) {
            return $mmLoginHelper.handleSSOLoginAuthentication(sitedata.siteurl, sitedata.token).then(function() {
                return $mmLoginHelper.goToSiteInitialPage();
            });
        }).catch(function(errorMessage) {
            if (typeof errorMessage === 'string' && errorMessage !== '') {
                $mmUtil.showErrorModal(errorMessage);
            }
        }).finally(function() {
            modal.dismiss();
            $mmLoginHelper.setSSOLoginOngoing(false);
        });
        return true;
    }
}]);

angular.module('mm.core.settings', [])
.constant('mmCoreSettingsDownloadSection', 'mmCoreSettingsDownloadSection')
.constant('mmCoreSettingsReportInBackground', 'mmCoreReportInBackground')
.constant('mmCoreSettingsSyncOnlyOnWifi', 'mmCoreSyncOnlyOnWifi')
.config(["$stateProvider", function($stateProvider) {
    $stateProvider
    .state('site.mm_settings', {
        url: '/mm_settings',
        views: {
            'site': {
                templateUrl: 'core/components/settings/templates/list.html'
            }
        }
    })
    .state('site.mm_settings-about', {
        url: '/mm_settings-about',
        views: {
            'site': {
                templateUrl: 'core/components/settings/templates/about.html',
                controller: 'mmSettingsAboutCtrl'
            }
        }
    })
    .state('site.mm_settings-general', {
        url: '/mm_settings-general',
        views: {
            'site': {
                templateUrl: 'core/components/settings/templates/general.html',
                controller: 'mmSettingsGeneralCtrl'
            }
        }
    })
    .state('site.mm_settings-spaceusage', {
        url: '/mm_settings-spaceusage',
        views: {
            'site': {
                templateUrl: 'core/components/settings/templates/space-usage.html',
                controller: 'mmSettingsSpaceUsageCtrl'
            }
        }
    })
    .state('site.mm_settings-synchronization', {
        url: '/mm_settings-synchronization',
        views: {
            'site': {
                templateUrl: 'core/components/settings/templates/synchronization.html',
                controller: 'mmSettingsSynchronizationCtrl'
            }
        }
    });
}]);

angular.module('mm.core.sidemenu', [])
.config(["$stateProvider", function($stateProvider) {
    $stateProvider
    .state('site', {
        url: '/site',
        templateUrl: 'core/components/sidemenu/templates/menu.html',
        controller: 'mmSideMenuCtrl',
        abstract: true,
        cache: false,
        onEnter: ["$ionicHistory", "$state", "$mmSite", "$timeout", function($ionicHistory, $state, $mmSite, $timeout) {
            $ionicHistory.clearHistory();
            if (!$mmSite.isLoggedIn()) {
                $state.go('mm_login.init');
            }
        }]
    });
}])
.run(["$mmEvents", "mmCoreEventLogin", "mmCoreEventSiteUpdated", "mmCoreEventLogout", "$mmSideMenuDelegate", function($mmEvents, mmCoreEventLogin, mmCoreEventSiteUpdated, mmCoreEventLogout, $mmSideMenuDelegate) {
    $mmEvents.on(mmCoreEventLogin, $mmSideMenuDelegate.updateNavHandlers);
    $mmEvents.on(mmCoreEventSiteUpdated, $mmSideMenuDelegate.updateNavHandlers);
    $mmEvents.on(mmCoreEventLogout, $mmSideMenuDelegate.clearSiteHandlers);
}]);

angular.module('mm.core.textviewer', [])
.config(["$stateProvider", function($stateProvider) {
    $stateProvider
    .state('site.mm_textviewer', {
        url: '/mm_textviewer',
        params: {
            title: null,
            content: null
        },
        views: {
            'site': {
                templateUrl: 'core/components/textviewer/templates/textviewer.html',
                controller: 'mmTextViewerIndexCtrl'
            }
        }
    });
}]);

angular.module('mm.core.user', [])
.constant('mmUserEventProfileRefreshed', 'user_profile_refreshed')
.value('mmUserProfileState', 'site.mm_user-profile')
.config(["$stateProvider", "$mmContentLinksDelegateProvider", function($stateProvider, $mmContentLinksDelegateProvider) {
    $stateProvider
        .state('site.mm_user-profile', {
            url: '/mm_user-profile',
            views: {
                'site': {
                    controller: 'mmUserProfileCtrl',
                    templateUrl: 'core/components/user/templates/profile.html'
                }
            },
            params: {
                courseid: 0,
                userid: 0
            }
        });
    $mmContentLinksDelegateProvider.registerLinkHandler('mmUser', '$mmUserHandlers.linksHandler');
}])
.run(["$mmEvents", "mmCoreEventLogin", "mmCoreEventSiteUpdated", "$mmUserDelegate", "$mmSite", "mmCoreEventUserDeleted", "$mmUser", function($mmEvents, mmCoreEventLogin, mmCoreEventSiteUpdated, $mmUserDelegate, $mmSite, mmCoreEventUserDeleted, $mmUser) {
    $mmEvents.on(mmCoreEventLogin, $mmUserDelegate.updateProfileHandlers);
    $mmEvents.on(mmCoreEventSiteUpdated, $mmUserDelegate.updateProfileHandlers);
    $mmEvents.on(mmCoreEventUserDeleted, function(data) {
        if (data.siteid && data.siteid === $mmSite.getId() && data.params) {
            var params = data.params,
                userid = 0;
            if (params.userid) {
                userid = params.userid;
            } else if (params.userids) {
                userid = params.userids[0];
            } else if (params.field === 'id' && params.values && params.values.length) {
                userid = params.values[0];
            } else if (params.userlist && params.userlist.length) {
                userid = params.userlist[0].userid;
            }
            userid = parseInt(userid);
            if (userid > 0) {
                $mmUser.deleteStoredUser(userid);
            }
        }
    });
}]);

angular.module('mm.core.contentlinks')
.controller('mmContentLinksChooseSiteCtrl', ["$scope", "$stateParams", "$mmSitesManager", "$mmUtil", "$ionicHistory", "$state", "$q", "$mmContentLinksDelegate", "$mmContentLinksHelper", function($scope, $stateParams, $mmSitesManager, $mmUtil, $ionicHistory, $state, $q,
            $mmContentLinksDelegate, $mmContentLinksHelper) {
    $scope.url = $stateParams.url || '';
    var action;
    function leaveView() {
        $mmSitesManager.logout().finally(function() {
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go('mm_login.sites');
        });
    }
    if (!$scope.url) {
        leaveView();
        return;
    }
    $mmContentLinksDelegate.getActionsFor($scope.url).then(function(actions) {
        action = $mmContentLinksHelper.getFirstValidAction(actions);
        if (!action) {
            return $q.reject();
        }
        $mmSitesManager.getSites(action.sites).then(function(sites) {
            $scope.sites = sites;
        });
    }).catch(function() {
        $mmUtil.showErrorModal('mm.contentlinks.errornosites', true);
        leaveView();
    });
    $scope.siteClicked = function(siteId) {
        action.action(siteId);
    };
    $scope.cancel = function() {
        leaveView();
    };
}]);

angular.module('mm.core.contentlinks')
.provider('$mmContentLinksDelegate', function() {
    var linkHandlers = {},
        self = {};
        self.registerLinkHandler = function(name, handler, priority) {
        if (typeof linkHandlers[name] !== 'undefined') {
            console.log("$mmContentLinksDelegateProvider: Addon '" + linkHandlers[name].name +
                        "' already registered as link handler");
            return false;
        }
        console.log("$mmContentLinksDelegateProvider: Registered handler '" + name + "' as link handler.");
        linkHandlers[name] = {
            name: name,
            handler: handler,
            instance: undefined,
            priority: typeof priority === 'undefined' ? 100 : priority
        };
        return true;
    };
    self.$get = ["$mmUtil", "$log", "$q", "$mmSitesManager", function($mmUtil, $log, $q, $mmSitesManager) {
        var self = {};
        $log = $log.getInstance('$mmContentLinksDelegate');
                self.getActionsFor = function(url, courseId, username) {
            if (!url) {
                return $q.when([]);
            }
            return $mmSitesManager.getSiteIdsFromUrl(url, true, username).then(function(siteIds) {
                var linkActions = [],
                    promises = [];
                angular.forEach(linkHandlers, function(handler) {
                    if (typeof handler.instance === 'undefined') {
                        handler.instance = $mmUtil.resolveObject(handler.handler, true);
                    }
                    if (handler.instance) {
                        promises.push($q.when(handler.instance.getActions(siteIds, url, courseId)).then(function(actions) {
                            if (actions && actions.length) {
                                linkActions.push({
                                    priority: handler.priority,
                                    actions: actions
                                });
                            }
                        }));
                    }
                });
                return $mmUtil.allPromises(promises).catch(function() {}).then(function() {
                    return sortActionsByPriority(linkActions);
                });
            });
        };
                self.getSiteUrl = function(url) {
            if (!url) {
                return;
            }
            for (var name in linkHandlers) {
                var handler = linkHandlers[name];
                if (typeof handler.instance === 'undefined') {
                    handler.instance = $mmUtil.resolveObject(handler.handler, true);
                }
                if (handler.instance && handler.instance.handles) {
                    var siteUrl = handler.instance.handles(url);
                    if (siteUrl) {
                        return siteUrl;
                    }
                }
            }
        };
                function sortActionsByPriority(actions) {
            var sorted = [];
            actions = actions.sort(function(a, b) {
                return a.priority > b.priority;
            });
            actions.forEach(function(entry) {
                sorted = sorted.concat(entry.actions);
            });
            return sorted;
        }
        return self;
    }];
    return self;
});

angular.module('mm.core.contentlinks')
.factory('$mmContentLinksHelper', ["$log", "$ionicHistory", "$state", "$mmSite", "$mmContentLinksDelegate", "$mmUtil", "$translate", "$mmCourseHelper", "$mmSitesManager", "$q", "$mmLoginHelper", "$mmText", "mmCoreConfigConstants", function($log, $ionicHistory, $state, $mmSite, $mmContentLinksDelegate, $mmUtil, $translate,
            $mmCourseHelper, $mmSitesManager, $q, $mmLoginHelper, $mmText, mmCoreConfigConstants) {
    $log = $log.getInstance('$mmContentLinksHelper');
    var self = {};
        self.filterSupportedSites = function(siteIds, isEnabledFn, checkAll) {
        var promises = [],
            supported = [],
            extraParams = Array.prototype.slice.call(arguments, 3);
        angular.forEach(siteIds, function(siteId) {
            if (checkAll || !promises.length) {
                promises.push(isEnabledFn.apply(isEnabledFn, [siteId].concat(extraParams)).then(function(enabled) {
                    if (enabled) {
                        supported.push(siteId);
                    }
                }));
            }
        });
        return $mmUtil.allPromises(promises).catch(function() {}).then(function() {
            if (!checkAll) {
                if (supported.length) {
                    return siteIds;
                } else {
                    return [];
                }
            } else {
                return supported;
            }
        });
    };
        self.getFirstValidAction = function(actions) {
        if (actions) {
            for (var i = 0; i < actions.length; i++) {
                var action = actions[i];
                if (action && action.sites && action.sites.length && angular.isFunction(action.action)) {
                    return action;
                }
            }
        }
    };
        self.goInSite = function(stateName, stateParams, siteId) {
        siteId = siteId || $mmSite.getId();
        if (siteId == $mmSite.getId()) {
            return $state.go(stateName, stateParams);
        } else {
            return $state.go('redirect', {
                siteid: siteId,
                state: stateName,
                params: stateParams
            });
        }
    };
        self.goToChooseSite = function(url) {
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        return $state.go('mm_contentlinks.choosesite', {url: url});
    };
        self.handleCustomUrl = function(url) {
        var contentLinksScheme = mmCoreConfigConstants.customurlscheme + '://link=';
        if (url.indexOf(contentLinksScheme) == -1) {
            return false;
        }
        $log.debug('Treating custom URL scheme: ' + url);
        var modal = $mmUtil.showModalLoading(),
            username;
        url = url.replace(contentLinksScheme, '');
        username = $mmText.getUsernameFromUrl(url);
        if (username) {
            url = url.replace(username + '@', '');
        }
        $mmSitesManager.getSiteIdsFromUrl(url, false, username).then(function(siteIds) {
            if (siteIds.length) {
                modal.dismiss();
                return self.handleLink(url, username).then(function(treated) {
                    if (!treated) {
                        $mmUtil.showErrorModal('mm.contentlinks.errornoactions', true);
                    }
                });
            } else {
                var siteUrl = $mmContentLinksDelegate.getSiteUrl(url),
                    formatted = $mmUtil.formatURL(siteUrl);
                if (!siteUrl) {
                    $mmUtil.showErrorModal('mm.login.invalidsite', true);
                    return;
                }
                return $mmSitesManager.checkSite(siteUrl).then(function(result) {
                    var promise,
                        ssoNeeded = $mmLoginHelper.isSSOLoginNeeded(result.code);
                    modal.dismiss();
                    if (!$mmSite.isLoggedIn()) {
                        if (ssoNeeded) {
                            promise = $mmUtil.showConfirm($translate('mm.login.logininsiterequired'));
                        } else {
                            promise = $q.when();
                        }
                    } else {
                        promise = $mmUtil.showConfirm($translate('mm.contentlinks.confirmurlothersite')).then(function() {
                            if (!ssoNeeded) {
                                return $mmSitesManager.logout().catch(function() {
                                });
                            }
                        });
                    }
                    return promise.then(function() {
                        if (ssoNeeded) {
                            $mmLoginHelper.openBrowserForSSOLogin(result.siteurl);
                        } else {
                            $state.go('mm_login.credentials', {
                                siteurl: result.siteurl,
                                username: username,
                                urltoopen: url
                            });
                        }
                    });
                }, function(error) {
                    $mmUtil.showErrorModal(error);
                });
            }
        }).finally(function() {
            modal.dismiss();
        });
        return true;
    };
        self.handleLink = function(url, username) {
        return $mmContentLinksDelegate.getActionsFor(url, undefined, username).then(function(actions) {
            var action = self.getFirstValidAction(actions);
            if (action) {
                if (!$mmSite.isLoggedIn()) {
                    if (action.sites.length == 1) {
                        action.action(action.sites[0]);
                    } else {
                        self.goToChooseSite(url);
                    }
                } else if (action.sites.length == 1 && action.sites[0] == $mmSite.getId()) {
                    action.action(action.sites[0]);
                } else {
                    $mmUtil.showConfirm($translate('mm.contentlinks.confirmurlothersite')).then(function() {
                        if (action.sites.length == 1) {
                            action.action(action.sites[0]);
                        } else {
                            self.goToChooseSite(url);
                        }
                    });
                }
                return true;
            }
            return false;
        }).catch(function() {
            return false;
        });
    };
        self.treatModuleIndexUrl = function(siteIds, url, isEnabled, courseId) {
        var params = $mmUtil.extractUrlParams(url);
        if (typeof params.id != 'undefined') {
            courseId = courseId || params.courseid || params.cid;
            return self.filterSupportedSites(siteIds, isEnabled, false, courseId).then(function(ids) {
                if (!ids.length) {
                    return [];
                } else {
                    return [{
                        message: 'mm.core.view',
                        icon: 'ion-eye',
                        sites: ids,
                        action: function(siteId) {
                            $mmCourseHelper.navigateToModule(parseInt(params.id, 10), siteId, courseId);
                        }
                    }];
                }
            });
        }
        return $q.when([]);
    };
    return self;
}]);

angular.module('mm.core.course')
.controller('mmCourseModContentCtrl', ["$log", "$stateParams", "$scope", function($log, $stateParams, $scope) {
    $log = $log.getInstance('mmCourseModContentCtrl');
    var module = $stateParams.module || {};
    $scope.description = module.description;
    $scope.title = module.name;
    $scope.url = module.url;
}]);

angular.module('mm.core.course')
.controller('mmCourseSectionCtrl', ["$mmCourseDelegate", "$mmCourse", "$mmUtil", "$scope", "$stateParams", "$translate", "$mmSite", "$mmEvents", "$ionicScrollDelegate", "$mmCourses", "$q", "mmCoreEventCompletionModuleViewed", "$controller", function($mmCourseDelegate, $mmCourse, $mmUtil, $scope, $stateParams, $translate, $mmSite,
            $mmEvents, $ionicScrollDelegate, $mmCourses, $q, mmCoreEventCompletionModuleViewed, $controller) {
    var courseId = $stateParams.cid || 1,
        sectionId = $stateParams.sectionid || -1,
        moduleId = $stateParams.mid;
    $scope.sitehome = (courseId === 1);
    $scope.sections = [];
    if (sectionId < 0) {
        if ($scope.sitehome) {
            $scope.title = $translate.instant('mma.frontpage.sitehome');
        } else {
            $scope.title = $translate.instant('mm.course.allsections');
        }
        $scope.summary = null;
        $scope.allSections = true;
    }
    function loadContent(sectionId) {
        return $mmCourses.getUserCourse(courseId, true).catch(function() {
        }).then(function(course) {
            var promise;
            if (course && course.enablecompletion === false) {
                promise = $q.when([]);
            } else {
                promise = $mmCourse.getActivitiesCompletionStatus(courseId).catch(function() {
                    return [];
                });
            }
            return promise.then(function(statuses) {
                var promise,
                    sectionnumber;
                if (sectionId < 0) {
                    sectionnumber = 0;
                    promise = $mmCourse.getSections(courseId);
                } else {
                    sectionnumber = sectionId;
                    promise = $mmCourse.getSection(courseId, sectionId).then(function(section) {
                        $scope.title = section.name;
                        $scope.summary = section.summary;
                        return [section];
                    });
                }
                return promise.then(function(sections) {
                    if ($scope.sitehome) {
                        sections.reverse();
                    }
                    var hasContent = false;
                    angular.forEach(sections, function(section) {
                        if (section.summary != '' || section.modules.length) {
                            hasContent = true;
                        }
                        angular.forEach(section.modules, function(module) {
                            module._controller =
                                    $mmCourseDelegate.getContentHandlerControllerFor(module.modname, module, courseId, section.id);
                            var status = statuses[module.id];
                            if (typeof status != 'undefined') {
                                module.completionstatus = status;
                            }
                            if (module.id == moduleId) {
                                var scope = $scope.$new();
                                $controller(module._controller, {$scope: scope});
                                if (scope.action) {
                                    scope.action();
                                }
                            }
                        });
                    });
                    $scope.sections = sections;
                    $scope.hasContent = hasContent;
                    $mmSite.write('core_course_view_course', {
                        courseid: courseId,
                        sectionnumber: sectionnumber
                    });
                }, function(error) {
                    if (error) {
                        $mmUtil.showErrorModal(error);
                    } else {
                        $mmUtil.showErrorModal('mm.course.couldnotloadsectioncontent', true);
                    }
                });
            });
        });
    }
    loadContent(sectionId).finally(function() {
        $scope.sectionLoaded = true;
    });
    $scope.doRefresh = function() {
        $mmCourse.invalidateSections(courseId).finally(function() {
            loadContent(sectionId).finally(function() {
                $scope.$broadcast('scroll.refreshComplete');
            });
        });
    };
    function refreshAfterCompletionChange() {
        var scrollView = $ionicScrollDelegate.$getByHandle('mmSectionScroll');
        if (scrollView && scrollView.getScrollPosition()) {
            $scope.loadingPaddingTop = scrollView.getScrollPosition().top;
        }
        $scope.sectionLoaded = false;
        $scope.sections = [];
        loadContent(sectionId).finally(function() {
            $scope.sectionLoaded = true;
            $scope.loadingPaddingTop = 0;
        });
    }
    $scope.completionChanged = function() {
        $mmCourse.invalidateSections(courseId).finally(function() {
            refreshAfterCompletionChange();
        });
    };
    var observer = $mmEvents.on(mmCoreEventCompletionModuleViewed, function(cid) {
        if (cid === courseId) {
            refreshAfterCompletionChange();
        }
    });
    $scope.$on('$destroy', function() {
        if (observer && observer.off) {
            observer.off();
        }
    });
}]);

angular.module('mm.core.course')
.controller('mmCourseSectionsCtrl', ["$mmCourse", "$mmUtil", "$scope", "$stateParams", "$translate", "$mmCourseHelper", "$mmEvents", "$mmSite", "$mmCoursePrefetchDelegate", "$mmCourses", "$q", "$ionicHistory", "$ionicPlatform", "mmCoreCourseAllSectionsId", "mmCoreEventSectionStatusChanged", "$mmConfig", "mmCoreSettingsDownloadSection", "$state", "$timeout", function($mmCourse, $mmUtil, $scope, $stateParams, $translate, $mmCourseHelper, $mmEvents,
            $mmSite, $mmCoursePrefetchDelegate, $mmCourses, $q, $ionicHistory, $ionicPlatform, mmCoreCourseAllSectionsId,
            mmCoreEventSectionStatusChanged, $mmConfig, mmCoreSettingsDownloadSection, $state, $timeout) {
    var courseId = $stateParams.courseid,
        sectionId = $stateParams.sid,
        moduleId = $stateParams.moduleid,
        downloadSectionsEnabled;
    $scope.courseId = courseId;
    $scope.sectionToLoad = 2;
    function checkDownloadSectionsEnabled() {
        return $mmConfig.get(mmCoreSettingsDownloadSection, true).then(function(enabled) {
            downloadSectionsEnabled = enabled;
        }).catch(function() {
            downloadSectionsEnabled = false;
        });
    }
    function loadSections(refresh) {
        return $mmCourses.getUserCourse(courseId).then(function(course) {
            $scope.fullname = course.fullname;
            return $mmCourse.getSections(courseId).then(function(sections) {
                return $translate('mm.course.allsections').then(function(str) {
                    var result = [{
                        name: str,
                        id: mmCoreCourseAllSectionsId
                    }].concat(sections);
                    $scope.sections = result;
                    if (downloadSectionsEnabled) {
                        return $mmCourseHelper.calculateSectionsStatus(result, courseId, true, refresh).catch(function() {
                        }).then(function(downloadpromises) {
                            if (downloadpromises && downloadpromises.length) {
                                $mmUtil.allPromises(downloadpromises).catch(function() {
                                    if (!$scope.$$destroyed) {
                                        $mmUtil.showErrorModal('mm.course.errordownloadingsection', true);
                                    }
                                }).finally(function() {
                                    if (!$scope.$$destroyed) {
                                        $mmCourseHelper.calculateSectionsStatus($scope.sections, courseId, false);
                                    }
                                });
                            }
                        });
                    }
                });
            });
        }).catch(function(error) {
            if (error) {
                $mmUtil.showErrorModal(error);
            } else {
                $mmUtil.showErrorModal('mm.course.couldnotloadsections', true);
            }
        });
    }
    function prefetch(section, manual) {
        $mmCourseHelper.prefetch(section, courseId, $scope.sections).catch(function() {
            if ($scope.$$destroyed) {
                return;
            }
            var current = $ionicHistory.currentStateName(),
                isCurrent = ($ionicPlatform.isTablet() && current == 'site.mm_course.mm_course-section') ||
                            (!$ionicPlatform.isTablet() && current == 'site.mm_course');
            if (!manual && !isCurrent) {
                return;
            }
            $mmUtil.showErrorModal('mm.course.errordownloadingsection', true);
        }).finally(function() {
            if (!$scope.$$destroyed) {
                $mmCourseHelper.calculateSectionsStatus($scope.sections, courseId, false);
            }
        });
    }
    function autoloadSection() {
        if (sectionId) {
            if ($ionicPlatform.isTablet()) {
                angular.forEach($scope.sections, function(section, index) {
                    if (section.id == sectionId) {
                        $scope.sectionToLoad = index + 1;
                    }
                });
                $scope.moduleId = moduleId;
                $timeout(function() {
                    $scope.moduleId = null;
                }, 500);
            } else {
                $state.go('site.mm_course-section', {
                    sectionid: sectionId,
                    cid: courseId,
                    mid: moduleId
                });
            }
        }
    }
    $scope.doRefresh = function() {
        var promises = [];
        promises.push($mmCourses.invalidateUserCourses());
        promises.push($mmCourse.invalidateSections(courseId));
        $q.all(promises).finally(function() {
            loadSections(true).finally(function() {
                $scope.$broadcast('scroll.refreshComplete');
            });
        });
    };
    $scope.prefetch = function(e, section) {
        e.preventDefault();
        e.stopPropagation();
        section.isCalculating = true;
        $mmCourseHelper.confirmDownloadSize(courseId, section, $scope.sections).then(function() {
            prefetch(section, true);
        }).finally(function() {
            section.isCalculating = false;
        });
    };
    checkDownloadSectionsEnabled().then(function() {
        loadSections().finally(function() {
            autoloadSection();
            $scope.sectionsLoaded = true;
        });
    });
    var statusObserver = $mmEvents.on(mmCoreEventSectionStatusChanged, function(data) {
        if (downloadSectionsEnabled && $scope.sections && $scope.sections.length && data.siteid === $mmSite.getId() &&
                    !$scope.$$destroyed&& data.sectionid) {
            if ($mmCoursePrefetchDelegate.isBeingDownloaded($mmCourseHelper.getSectionDownloadId({id: data.sectionid}))) {
                return;
            }
            $mmCourseHelper.calculateSectionsStatus($scope.sections, courseId, false).then(function() {
                var section;
                angular.forEach($scope.sections, function(s) {
                    if (s.id === data.sectionid) {
                        section = s;
                    }
                });
                if (section) {
                    var downloadid = $mmCourseHelper.getSectionDownloadId(section);
                    if (section.isDownloading && !$mmCoursePrefetchDelegate.isBeingDownloaded(downloadid)) {
                        prefetch(section, false);
                    }
                }
            });
        }
    });
    $scope.$on('$destroy', function() {
        statusObserver && statusObserver.off && statusObserver.off();
    });
}]);

angular.module('mm.core.course')
.directive('mmCourseModDescription', function() {
    return {
        compile: function(element, attrs) {
            if (attrs.watch) {
                element.find('mm-format-text').attr('watch', attrs.watch);
            }
            return function(scope) {
                scope.showfull = !!attrs.showfull;
            };
        },
        restrict: 'E',
        scope: {
            description: '=',
            note: '='
        },
        templateUrl: 'core/components/course/templates/mod_description.html'
    };
});

angular.module('mm.core.course')
.factory('$mmCourseContentHandler', ["$mmCourse", "$mmUtil", function($mmCourse, $mmUtil) {
    return {
        getController: function(module) {
            return function($scope, $state) {
                $scope.icon = $mmCourse.getModuleIconSrc(module.modname);
                $scope.title = module.name;
                $scope.action = function(e) {
                    $state.go('site.mm_course-modcontent', {module: module});
                    e.preventDefault();
                    e.stopPropagation();
                };
                if (module.url) {
                    $scope.buttons = [{
                        icon: 'ion-ios-browsers-outline',
                        label: 'mm.core.openinbrowser',
                        action: function(e) {
                            $mmUtil.openInBrowser(module.url);
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    }];
                }
            };
        }
    };
}]);

angular.module('mm.core.course')
.constant('mmCoreCourseModulesStore', 'course_modules')
.config(["$mmSitesFactoryProvider", "mmCoreCourseModulesStore", function($mmSitesFactoryProvider, mmCoreCourseModulesStore) {
    var stores = [
        {
            name: mmCoreCourseModulesStore,
            keyPath: 'id'
        }
    ];
    $mmSitesFactoryProvider.registerStores(stores);
}])
.factory('$mmCourse', ["$mmSite", "$translate", "$q", "$log", "$mmEvents", "$mmSitesManager", "mmCoreEventCompletionModuleViewed", function($mmSite, $translate, $q, $log, $mmEvents, $mmSitesManager, mmCoreEventCompletionModuleViewed) {
    $log = $log.getInstance('$mmCourse');
    var self = {},
        mods = ["assign", "assignment", "book", "chat", "choice", "data", "database", "date", "external-tool",
            "feedback", "file", "folder", "forum", "glossary", "ims", "imscp", "label", "lesson", "lti", "page", "quiz",
            "resource", "scorm", "survey", "url", "wiki", "workshop"
        ],
        modsWithContent = ['book', 'folder', 'imscp', 'page', 'resource', 'url'];
        function addContentsIfNeeded(module) {
        if (modsWithContent.indexOf(module.modname) > -1) {
            module.contents = module.contents || [];
        }
        return module;
    }
        self.canGetModuleWithoutCourseId = function(siteId) {
        siteId = siteId || $mmSite.getId();
        return $mmSitesManager.getSite(siteId).then(function(site) {
            return site.wsAvailable('core_course_get_course_module');
        });
    };
        self.canGetModuleByInstance = function(siteId) {
        siteId = siteId || $mmSite.getId();
        return $mmSitesManager.getSite(siteId).then(function(site) {
            return site.wsAvailable('core_course_get_course_module_by_instance');
        });
    };
        self.checkModuleCompletion = function(courseId, completion) {
        if (completion && completion.tracking === 2 && completion.state === 0) {
            self.invalidateSections(courseId).finally(function() {
                $mmEvents.trigger(mmCoreEventCompletionModuleViewed, courseId);
            });
        }
    };
        self.getActivitiesCompletionStatus = function(courseid, userid) {
        userid = userid || $mmSite.getUserId();
        $log.debug('Getting completion status for user ' + userid + ' in course ' + courseid);
        var params = {
                courseid: courseid,
                userid: userid
            },
            preSets = {
                cacheKey: getActivitiesCompletionCacheKey(courseid, userid)
            };
        return $mmSite.read('core_completion_get_activities_completion_status', params, preSets).then(function(data) {
            if (data && data.statuses) {
                var formattedStatuses = {};
                angular.forEach(data.statuses, function(status) {
                    formattedStatuses[status.cmid] = status;
                });
                return formattedStatuses;
            }
            return $q.reject();
        });
    };
        function getActivitiesCompletionCacheKey(courseid, userid) {
        return 'mmCourse:activitiescompletion:' + courseid + ':' + userid;
    }
        self.getModuleBasicInfo = function(moduleId, siteId) {
        siteId = siteId || $mmSite.getId();
        return $mmSitesManager.getSite(siteId).then(function(site) {
            var params = {
                    cmid: moduleId
                },
                preSets = {
                    cacheKey: getModuleCacheKey(moduleId)
                };
            return site.read('core_course_get_course_module', params, preSets).then(function(response) {
                if (response.cm && (!response.warnings || !response.warnings.length)) {
                    return response.cm;
                }
                return $q.reject();
            });
        });
    };
        self.getModuleBasicInfoByInstance = function(id, module, siteId) {
        siteId = siteId || $mmSite.getId();
        return $mmSitesManager.getSite(siteId).then(function(site) {
            var params = {
                    instance: id,
                    module: module
                },
                preSets = {
                    cacheKey: getModuleByInstanceCacheKey(id, module)
                };
            return site.read('core_course_get_course_module_by_instance', params, preSets).then(function(response) {
                if (response.cm && (!response.warnings || !response.warnings.length)) {
                    return response.cm;
                }
                return $q.reject();
            });
        });
    };
        self.getModule = function(moduleId, courseId, sectionId, preferCache) {
        if (!moduleId) {
            return $q.reject();
        }
        if (typeof preferCache == 'undefined') {
            preferCache = false;
        }
        var promise;
        if (!courseId) {
            promise = self.getModuleBasicInfo(moduleId).then(function(module) {
                return module.course;
            });
        } else {
            promise = $q.when(courseId);
        }
        return promise.then(function(courseId) {
            $log.debug('Getting module ' + moduleId + ' in course ' + courseId);
            params = {
                courseid: courseId,
                options: [
                    {
                        name: 'cmid',
                        value: moduleId
                    }
                ]
            };
            preSets = {
                cacheKey: getModuleCacheKey(moduleId),
                omitExpires: preferCache
            };
            if (sectionId) {
                params.options.push({
                    name: 'sectionid',
                    value: sectionId
                });
            }
            return $mmSite.read('core_course_get_contents', params, preSets).catch(function() {
                params.options = [];
                preSets.cacheKey = getSectionsCacheKey(courseId);
                return $mmSite.read('core_course_get_contents', params, preSets);
            }).then(function(sections) {
                var section,
                    module;
                for (var i = 0; i < sections.length; i++) {
                    section = sections[i];
                    for (var j = 0; j < section.modules.length; j++) {
                        module = section.modules[j];
                        if (module.id == moduleId) {
                            module.course = courseId;
                            return addContentsIfNeeded(module);
                        }
                    }
                }
                return $q.reject();
            });
        });
    };
        function getModuleByInstanceCacheKey(id, module) {
        return 'mmCourse:moduleByInstance:' + module + ':' + id;
    }
        function getModuleCacheKey(moduleid) {
        return 'mmCourse:module:' + moduleid;
    }
        self.getModuleIconSrc = function(moduleName) {
        if (mods.indexOf(moduleName) < 0) {
            moduleName = "external-tool";
        }
        return "img/mod/" + moduleName + ".svg";
    };
        self.getModuleSectionId = function(moduleId, courseId, siteId) {
        if (!moduleId) {
            return $q.reject();
        }
        return self.getModuleBasicInfo(moduleId, siteId).then(function(module) {
            return module.section;
        }).catch(function() {
            if (!courseId) {
                return $q.reject();
            }
            return self.getSections(courseId, {}, siteId).then(function(sections) {
                for (var i = 0, seclen = sections.length; i < seclen; i++) {
                    var section = sections[i];
                    for (var j = 0, modlen = section.modules.length; j < modlen; j++) {
                        if (section.modules[j].id == moduleId) {
                            return section.id;
                        }
                    }
                }
                return $q.reject();
            });
        });
    };
        self.getSection = function(courseid, sectionid) {
        var deferred = $q.defer();
        if (sectionid < 0) {
            deferred.reject('Invalid section ID');
            return deferred.promise;
        }
        self.getSections(courseid).then(function(sections) {
            for (var i = 0; i < sections.length; i++) {
                if (sections[i].id == sectionid) {
                    deferred.resolve(sections[i]);
                    return;
                }
            }
            deferred.reject('Unkown section');
        }, function(error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };
        self.getSections = function(courseid, preSets, siteId) {
        preSets = preSets || {};
        siteId = siteId || $mmSite.getId();
        preSets.cacheKey = getSectionsCacheKey(courseid);
        return $mmSitesManager.getSite(siteId).then(function(site) {
            return site.read('core_course_get_contents', {
                courseid: courseid,
                options: []
            }, preSets).then(function(sections) {
                angular.forEach(sections, function(section) {
                    angular.forEach(section.modules, function(module) {
                        addContentsIfNeeded(module);
                    });
                });
                return sections;
            });
        });
    };
        function getSectionsCacheKey(courseid) {
        return 'mmCourse:sections:' + courseid;
    }
        self.invalidateModule = function(moduleid) {
        return $mmSite.invalidateWsCacheForKey(getModuleCacheKey(moduleid));
    };
        self.invalidateModuleByInstance = function(id, module) {
        return $mmSite.invalidateWsCacheForKey(getModuleByInstanceCacheKey(id, module));
    };
        self.invalidateSections = function(courseid, userid) {
        userid = userid || $mmSite.getUserId();
        var p1 = $mmSite.invalidateWsCacheForKey(getSectionsCacheKey(courseid)),
            p2 = $mmSite.invalidateWsCacheForKey(getActivitiesCompletionCacheKey(courseid, userid));
        return $q.all([p1, p2]);
    };
        self.translateModuleName = function(moduleName) {
        if (mods.indexOf(moduleName) < 0) {
            moduleName = "external-tool";
        }
        var langkey = 'mm.core.mod_'+moduleName;
        return $translate(langkey).then(function(translated) {
            return translated !== langkey ? translated : moduleName;
        });
    };
    return self;
}]);

angular.module('mm.core.course')
.factory('$mmCourseCoursesNavHandler', function() {
    return {
                isEnabled: function() {
            return true;
        },
                isEnabledForCourse: function() {
            return true;
        },
                getController: function(courseId) {
            return function($scope, $state) {
                $scope.icon = 'ion-briefcase';
                $scope.title = 'mm.course.contents';
                $scope.action = function(e, course) {
                    $state.go('site.mm_course', {courseid: course.id});
                    e.preventDefault();
                    e.stopPropagation();
                };
            };
        }
    };
});

angular.module('mm.core.course')
.provider('$mmCourseDelegate', function() {
    var contentHandlers = {},
        self = {};
        self.registerContentHandler = function(addon, handles, handler) {
        if (typeof contentHandlers[handles] !== 'undefined') {
            console.log("$mmCourseDelegateProvider: Addon '" + contentHandlers[handles].addon + "' already registered as handler for '" + handles + "'");
            return false;
        }
        console.log("$mmCourseDelegateProvider: Registered addon '" + addon + "' as course content handler.");
        contentHandlers[handles] = {
            addon: addon,
            handler: handler,
            instance: undefined
        };
        return true;
    };
    self.$get = ["$q", "$log", "$mmSite", "$mmUtil", "$mmCourseContentHandler", function($q, $log, $mmSite, $mmUtil, $mmCourseContentHandler) {
        var enabledHandlers = {},
            self = {};
        $log = $log.getInstance('$mmCourseDelegate');
                self.getContentHandlerControllerFor = function(handles, module, courseid, sectionid) {
            if (typeof enabledHandlers[handles] !== 'undefined') {
                return enabledHandlers[handles].getController(module, courseid, sectionid);
            }
            return $mmCourseContentHandler.getController(module, courseid, sectionid);
        };
                self.updateContentHandler = function(handles, handlerInfo) {
            var promise;
            if (typeof handlerInfo.instance === 'undefined') {
                handlerInfo.instance = $mmUtil.resolveObject(handlerInfo.handler, true);
            }
            if (!$mmSite.isLoggedIn()) {
                promise = $q.reject();
            } else {
                promise = $q.when(handlerInfo.instance.isEnabled());
            }
            return promise.then(function(enabled) {
                if (enabled) {
                    enabledHandlers[handles] = handlerInfo.instance;
                } else {
                    return $q.reject();
                }
            }).catch(function() {
                delete enabledHandlers[handles];
            });
        };
                self.updateContentHandlers = function() {
            var promises = [],
                enabledHandlers = {};
            $log.debug('Updating content handlers for current site.');
            angular.forEach(contentHandlers, function(handlerInfo, handles) {
                promises.push(self.updateContentHandler(handles, handlerInfo));
            });
            return $q.all(promises).then(function() {
                return true;
            }, function() {
                return true;
            });
        };
        return self;
    }];
    return self;
});

angular.module('mm.core.course')
.factory('$mmCourseHelper', ["$q", "$mmCoursePrefetchDelegate", "$mmFilepool", "$mmUtil", "$mmCourse", "$mmSite", "$state", "mmCoreNotDownloaded", "mmCoreOutdated", "mmCoreDownloading", "mmCoreCourseAllSectionsId", function($q, $mmCoursePrefetchDelegate, $mmFilepool, $mmUtil, $mmCourse, $mmSite, $state,
            mmCoreNotDownloaded, mmCoreOutdated, mmCoreDownloading, mmCoreCourseAllSectionsId) {
    var self = {};
        self.calculateSectionStatus = function(section, courseid, restoreDownloads, refresh, dwnpromises) {
        if (section.id !== mmCoreCourseAllSectionsId) {
            return $mmCoursePrefetchDelegate.getModulesStatus(section.id, section.modules, courseid, refresh, restoreDownloads)
                    .then(function(result) {
                var downloadid = self.getSectionDownloadId(section);
                if ($mmCoursePrefetchDelegate.isBeingDownloaded(downloadid)) {
                    result.status = mmCoreDownloading;
                }
                section.showDownload = result.status === mmCoreNotDownloaded;
                section.showRefresh = result.status === mmCoreOutdated;
                if (result.status !== mmCoreDownloading) {
                    section.isDownloading = false;
                    section.total = 0;
                } else if (!restoreDownloads) {
                    section.count = 0;
                    section.total = result[mmCoreOutdated].length + result[mmCoreNotDownloaded].length +
                                    result[mmCoreDownloading].length;
                    section.isDownloading = true;
                } else {
                    var promise = self.startOrRestorePrefetch(section, result, courseid).then(function() {
                        return self.calculateSectionStatus(section, courseid);
                    });
                    if (dwnpromises) {
                        dwnpromises.push(promise);
                    }
                }
                return result;
            });
        }
        return $q.reject();
    };
        self.calculateSectionsStatus = function(sections, courseid, restoreDownloads, refresh) {
        var allsectionssection,
            allsectionsstatus,
            downloadpromises = [],
            statuspromises = [];
        angular.forEach(sections, function(section) {
            if (section.id === mmCoreCourseAllSectionsId) {
                allsectionssection = section;
                section.isCalculating = true;
            } else {
                section.isCalculating = true;
                statuspromises.push(self.calculateSectionStatus(section, courseid, restoreDownloads, refresh, downloadpromises)
                        .then(function(result) {
                    allsectionsstatus = $mmFilepool.determinePackagesStatus(allsectionsstatus, result.status);
                }).finally(function() {
                    section.isCalculating = false;
                }));
            }
        });
        return $q.all(statuspromises).then(function() {
            if (allsectionssection) {
                allsectionssection.showDownload = allsectionsstatus === mmCoreNotDownloaded;
                allsectionssection.showRefresh = allsectionsstatus === mmCoreOutdated;
                allsectionssection.isDownloading = allsectionsstatus === mmCoreDownloading;
            }
            return downloadpromises;
        }).finally(function() {
            if (allsectionssection) {
                allsectionssection.isCalculating = false;
            }
        });
    };
        self.confirmDownloadSize = function(courseid, section, sections) {
        var sizePromise;
        if (section.id != mmCoreCourseAllSectionsId) {
            sizePromise = $mmCoursePrefetchDelegate.getDownloadSize(section.modules, courseid);
        } else {
            var promises = [],
                size = 0;
            angular.forEach(sections, function(s) {
                if (s.id != mmCoreCourseAllSectionsId) {
                    promises.push($mmCoursePrefetchDelegate.getDownloadSize(s.modules, courseid).then(function(sectionsize) {
                        size = size + sectionsize;
                    }));
                }
            });
            sizePromise = $q.all(promises).then(function() {
                return size;
            });
        }
        return sizePromise.then(function(size) {
            return $mmUtil.confirmDownloadSize(size);
        });
    };
        self.getModuleCourseIdByInstance = function(id, module, siteId) {
        return $mmCourse.getModuleBasicInfoByInstance(id, module, siteId).then(function(cm) {
            return cm.course;
        }).catch(function(error) {
            if (error) {
                $mmUtil.showErrorModal(error);
            } else {
                $mmUtil.showErrorModal('mm.course.errorgetmodule', true);
            }
            return $q.reject();
        });
    };
        self.getSectionDownloadId = function(section) {
        return 'Section-'+section.id;
    };
        self.navigateToModule = function(moduleId, siteId, courseId, sectionId) {
        siteId = siteId || $mmSite.getId();
        var modal = $mmUtil.showModalLoading(),
            promise;
        return $mmCourse.canGetModuleWithoutCourseId(siteId).then(function(enabled) {
            if (courseId && sectionId) {
                promise = $q.when();
            } else if (!courseId && !enabled) {
                promise = $q.reject();
            } else if (!courseId) {
                promise = $mmCourse.getModuleBasicInfo(moduleId, siteId).then(function(module) {
                    courseId = module.course;
                    sectionId = module.section;
                });
            } else {
                promise = $mmCourse.getModuleSectionId(moduleId, courseId, siteId).then(function(id) {
                    sectionId = id;
                });
            }
            return promise.then(function() {
                return $state.go('redirect', {
                    siteid: siteId,
                    state: 'site.mm_course',
                    params: {
                        courseid: courseId,
                        moduleid: moduleId,
                        sid: sectionId
                    }
                });
            });
        }).catch(function(error) {
            if (error) {
                $mmUtil.showErrorModal(error);
            } else {
                $mmUtil.showErrorModal('mm.course.errorgetmodule', true);
            }
            return $q.reject();
        }).finally(function() {
            modal.dismiss();
        });
    };
        self.prefetch = function(section, courseid, sections) {
        if (section.id != mmCoreCourseAllSectionsId) {
            return self.prefetchSection(section, courseid, true, sections);
        } else {
            var promises = [];
            section.isDownloading = true;
            angular.forEach(sections, function(s) {
                if (s.id != mmCoreCourseAllSectionsId) {
                    promises.push(self.prefetchSection(s, courseid, false, sections).then(function() {
                        return self.calculateSectionStatus(s, courseid);
                    }));
                }
            });
            return $mmUtil.allPromises(promises);
        }
    };
        self.prefetchModule = function(service, module, size, refresh) {
        return $mmUtil.confirmDownloadSize(size).then(function() {
            var promise = refresh ? service.invalidateContent(module.id) : $q.when();
            return promise.catch(function() {
            }).then(function() {
                return service.prefetchContent(module).catch(function() {
                    if (!$scope.$$destroyed) {
                        $mmUtil.showErrorModal('mm.core.errordownloading', true);
                    }
                });
            });
        });
    };
        self.prefetchSection = function(section, courseid, singleDownload, sections) {
        if (section.id == mmCoreCourseAllSectionsId) {
            return $q.when();
        }
        section.isDownloading = true;
        return $mmCoursePrefetchDelegate.getModulesStatus(section.id, section.modules, courseid).then(function(result) {
            if (result.status === mmCoreNotDownloaded || result.status === mmCoreOutdated || result.status === mmCoreDownloading) {
                var promise = self.startOrRestorePrefetch(section, result, courseid);
                if (singleDownload) {
                    self.calculateSectionsStatus(sections, courseid, false);
                }
                return promise;
            }
        }, function() {
            section.isDownloading = false;
            return $q.reject();
        });
    };
        self.startOrRestorePrefetch = function(section, status, courseid) {
        if (section.id == mmCoreCourseAllSectionsId) {
            return $q.when();
        }
        var modules = status[mmCoreOutdated].concat(status[mmCoreNotDownloaded]).concat(status[mmCoreDownloading]),
            downloadid = self.getSectionDownloadId(section),
            moduleids;
        moduleids = modules.map(function(m) {
            return m.id;
        });
        section.count = 0;
        section.total = modules.length;
        section.isDownloading = true;
        return $mmCoursePrefetchDelegate.prefetchAll(downloadid, modules, courseid).then(function() {}, function() {
            return $q.reject();
        }, function(id) {
            var index = moduleids.indexOf(id);
            if (index > -1) {
                moduleids.splice(index, 1);
                section.count++;
            }
        });
    };
    return self;
}]);

angular.module('mm.core')
.provider('$mmCoursePrefetchDelegate', function() {
    var prefetchHandlers = {},
        self = {};
        self.registerPrefetchHandler = function(addon, handles, handler) {
        if (typeof prefetchHandlers[handles] !== 'undefined') {
            console.log("$mmCoursePrefetchDelegateProvider: Addon '" + prefetchHandlers[handles].addon +
                            "' already registered as handler for '" + handles + "'");
            return false;
        }
        console.log("$mmCoursePrefetchDelegateProvider: Registered addon '" + addon + "' as prefetch handler.");
        prefetchHandlers[handles] = {
            addon: addon,
            handler: handler,
            instance: undefined
        };
        return true;
    };
    self.$get = ["$q", "$log", "$mmSite", "$mmUtil", "$mmFilepool", "$mmEvents", "mmCoreDownloaded", "mmCoreDownloading", "mmCoreNotDownloaded", "mmCoreOutdated", "mmCoreNotDownloadable", "mmCoreEventSectionStatusChanged", function($q, $log, $mmSite, $mmUtil, $mmFilepool, $mmEvents, mmCoreDownloaded, mmCoreDownloading,
                mmCoreNotDownloaded, mmCoreOutdated, mmCoreNotDownloadable, mmCoreEventSectionStatusChanged) {
        var enabledHandlers = {},
            self = {},
            deferreds = {},
            statusCache = {};
        $log = $log.getInstance('$mmCoursePrefetchDelegate');
                self.clearStatusCache = function() {
            statusCache = {};
        };
                self.determineModuleStatus = function(module, status, restoreDownloads) {
            var handler = enabledHandlers[module.modname];
            if (handler) {
                if (status == mmCoreDownloading && restoreDownloads) {
                    if (!$mmFilepool.getPackageDownloadPromise($mmSite.getId(), handler.component, module.id)) {
                        handler.prefetch(module);
                    }
                } else if (handler.determineStatus) {
                    return handler.determineStatus(status);
                }
            }
            return status;
        };
                self.getDownloadSize = function(modules, courseid) {
            var size = 0,
                promises = [];
            angular.forEach(modules, function(module) {
                module.contents = module.contents || [];
                var handler = enabledHandlers[module.modname];
                if (handler) {
                    promises.push(self.getModuleStatus(module, courseid).then(function(modstatus) {
                        if (modstatus === mmCoreNotDownloaded || modstatus === mmCoreOutdated) {
                            return $q.when(handler.getDownloadSize(module, courseid)).then(function(modulesize) {
                                size = size + modulesize;
                            }).catch(function() {
                            });
                        }
                    }));
                }
            });
            return $q.all(promises).then(function() {
                return size;
            });
        };
                self.getModuleStatus = function(module, courseid, revision, timemodified) {
            var handler = enabledHandlers[module.modname],
                siteid = $mmSite.getId();
            module.contents = module.contents || [];
            if (handler) {
                var promise = handler.getFiles ? $q.when(handler.getFiles(module, courseid)) : $q.when(module.contents);
                return promise.then(function(files) {
                    var promises = [];
                    if (typeof revision == 'undefined') {
                        if (handler.getRevision) {
                            promises.push($q.when(handler.getRevision(module, courseid)).then(function(rev) {
                                revision = rev;
                            }));
                        } else {
                            revision = $mmFilepool.getRevisionFromFileList(files);
                        }
                    }
                    if (typeof timemodified == 'undefined') {
                        if (handler.getTimemodified) {
                            promises.push($q.when(handler.getTimemodified(module, courseid)).then(function(timemod) {
                                timemodified = timemod;
                            }));
                        } else {
                            timemodified = $mmFilepool.getTimemodifiedFromFileList(files);
                        }
                    }
                    return $q.all(promises).then(function() {
                        return $mmFilepool.getPackageStatus(siteid, handler.component, module.id, revision, timemodified)
                                .then(function(status) {
                            return self.determineModuleStatus(module, status, true);
                        });
                    });
                });
            }
            return $q.reject();
        };
                self.getModulesStatus = function(sectionid, modules, courseid, refresh, restoreDownloads) {
            var promises = [],
                status = mmCoreNotDownloadable,
                result = {};
            result[mmCoreNotDownloaded] = [];
            result[mmCoreDownloaded] = [];
            result[mmCoreDownloading] = [];
            result[mmCoreOutdated] = [];
            result.total = 0;
            angular.forEach(modules, function(module) {
                var handler = enabledHandlers[module.modname],
                    promise;
                module.contents = module.contents || [];
                if (handler) {
                    var packageId = $mmFilepool.getPackageId(handler.component, module.id);
                    if (!refresh && statusCache[packageId] && statusCache[packageId].status) {
                        promise = $q.when(self.determineModuleStatus(module, statusCache[packageId].status, restoreDownloads));
                    } else {
                        promise = self.getModuleStatus(module, courseid);
                    }
                    promises.push(promise.then(function(modstatus) {
                        statusCache[packageId] = {
                            status: modstatus,
                            sectionid: sectionid
                        };
                        status = $mmFilepool.determinePackagesStatus(status, modstatus);
                        result[modstatus].push(module);
                        result.total++;
                    }));
                }
            });
            return $q.all(promises).then(function() {
                result.status = status;
                return result;
            });
        };
                self.getPrefetchHandlerFor = function(handles) {
            return enabledHandlers[handles];
        };
                self.isBeingDownloaded = function(id) {
            return deferreds[$mmSite.getId()] && deferreds[$mmSite.getId()][id];
        };
                self.prefetchAll = function(id, modules, courseid) {
            var siteid = $mmSite.getId();
            if (deferreds[siteid] && deferreds[siteid][id]) {
                return deferreds[siteid][id].promise;
            }
            var deferred = $q.defer(),
                promises = [];
            if (!deferreds[siteid]) {
                deferreds[siteid] = {};
            }
            deferreds[siteid][id] = deferred;
            angular.forEach(modules, function(module) {
                module.contents = module.contents || [];
                var handler = enabledHandlers[module.modname];
                if (handler) {
                    promises.push(handler.prefetch(module, courseid).then(function() {
                        deferred.notify(module.id);
                    }));
                }
            });
            $q.all(promises).then(function() {
                delete deferreds[siteid][id];
                deferred.resolve();
            }, function() {
                delete deferreds[siteid][id];
                deferred.reject();
            });
            return deferred.promise;
        };
                self.updatePrefetchHandler = function(handles, handlerInfo) {
            var promise;
            if (typeof handlerInfo.instance === 'undefined') {
                handlerInfo.instance = $mmUtil.resolveObject(handlerInfo.handler, true);
            }
            if (!$mmSite.isLoggedIn()) {
                promise = $q.reject();
            } else {
                promise = $q.when(handlerInfo.instance.isEnabled());
            }
            return promise.then(function(enabled) {
                if (enabled) {
                    enabledHandlers[handles] = handlerInfo.instance;
                } else {
                    return $q.reject();
                }
            }).catch(function() {
                delete enabledHandlers[handles];
            });
        };
                self.updatePrefetchHandlers = function() {
            var promises = [];
            $log.debug('Updating prefetch handlers for current site.');
            angular.forEach(prefetchHandlers, function(handlerInfo, handles) {
                promises.push(self.updatePrefetchHandler(handles, handlerInfo));
            });
            return $q.all(promises).then(function() {
                return true;
            }, function() {
                return true;
            });
        };
                self.updateStatusCache = function(component, componentId, status) {
            var notify = false,
                packageid = $mmFilepool.getPackageId(component, componentId);
            if (statusCache[packageid]) {
                notify = statusCache[packageid].status !== status;
            } else {
                statusCache[packageid] = {};
            }
            statusCache[packageid].status = status;
            if (notify) {
                $mmEvents.trigger(mmCoreEventSectionStatusChanged, {
                    sectionid: statusCache[packageid].sectionid,
                    siteid: $mmSite.getId()
                });
            }
        };
        return self;
    }];
    return self;
})
.run(["$mmEvents", "mmCoreEventLogin", "mmCoreEventSiteUpdated", "mmCoreEventLogout", "$mmCoursePrefetchDelegate", "$mmSite", "mmCoreEventPackageStatusChanged", function($mmEvents, mmCoreEventLogin, mmCoreEventSiteUpdated, mmCoreEventLogout, $mmCoursePrefetchDelegate, $mmSite,
            mmCoreEventPackageStatusChanged) {
    $mmEvents.on(mmCoreEventLogin, $mmCoursePrefetchDelegate.updatePrefetchHandlers);
    $mmEvents.on(mmCoreEventSiteUpdated, $mmCoursePrefetchDelegate.updatePrefetchHandlers);
    $mmEvents.on(mmCoreEventLogout, $mmCoursePrefetchDelegate.clearStatusCache);
    $mmEvents.on(mmCoreEventPackageStatusChanged, function(data) {
        if (data.siteid === $mmSite.getId()) {
            $mmCoursePrefetchDelegate.updateStatusCache(data.component, data.componentId, data.status);
        }
    });
}]);

angular.module('mm.core.courses')
.controller('mmCoursesListCtrl', ["$scope", "$mmCourses", "$mmCoursesDelegate", "$mmUtil", "$mmEvents", "$mmSite", "mmCoursesEventMyCoursesUpdated", "mmCoursesEventMyCoursesRefreshed", function($scope, $mmCourses, $mmCoursesDelegate, $mmUtil, $mmEvents, $mmSite,
            mmCoursesEventMyCoursesUpdated, mmCoursesEventMyCoursesRefreshed) {
    $scope.searchEnabled = $mmCourses.isSearchCoursesAvailable();
    $scope.areNavHandlersLoadedFor = $mmCoursesDelegate.areNavHandlersLoadedFor;
    $scope.filter = {};
    function fetchCourses(refresh) {
        return $mmCourses.getUserCourses().then(function(courses) {
            $scope.courses = courses;
            angular.forEach(courses, function(course) {
                course._handlers = $mmCoursesDelegate.getNavHandlersFor(course.id, refresh);
            });
            $scope.filter.filterText = '';
        }, function(error) {
            if (typeof error != 'undefined' && error !== '') {
                $mmUtil.showErrorModal(error);
            } else {
                $mmUtil.showErrorModal('mm.courses.errorloadcourses', true);
            }
        });
    }
    fetchCourses().finally(function() {
        $scope.coursesLoaded = true;
    });
    $scope.refreshCourses = function() {
        $mmEvents.trigger(mmCoursesEventMyCoursesRefreshed);
        $mmCourses.invalidateUserCourses().finally(function() {
            fetchCourses(true).finally(function() {
                $scope.$broadcast('scroll.refreshComplete');
            });
        });
    };
    $mmEvents.on(mmCoursesEventMyCoursesUpdated, function(siteid) {
        if (siteid == $mmSite.getId()) {
            fetchCourses();
        }
    });
}]);

angular.module('mm.core.courses')
.controller('mmCoursesSearchCtrl', ["$scope", "$mmCourses", "$q", "$mmUtil", function($scope, $mmCourses, $q, $mmUtil) {
    var page = 0,
    	currentSearch = '';
    $scope.searchText = '';
    function searchCourses(refresh) {
        if (refresh) {
            page = 0;
        }
        return $mmCourses.search(currentSearch, page).then(function(response) {
            if (page === 0) {
                $scope.courses = response.courses;
            } else {
                $scope.courses = $scope.courses.concat(response.courses);
            }
            $scope.total = response.total;
            page++;
            $scope.canLoadMore = $scope.courses.length < $scope.total;
        }).catch(function(message) {
            $scope.canLoadMore = false;
            if (message) {
                $mmUtil.showErrorModal(message);
            } else {
                $mmUtil.showErrorModal('mma.searchcourses.errorsearching', true);
            }
            return $q.reject();
        });
    }
    $scope.search = function(text) {
        currentSearch = text;
        $scope.courses = undefined;
    	var modal = $mmUtil.showModalLoading('mm.core.searching', true);
    	searchCourses(true).finally(function() {
            modal.dismiss();
    	});
    };
    $scope.loadMoreResults = function() {
    	searchCourses();
    };
}]);

angular.module('mm.core.courses')
.controller('mmCoursesViewResultCtrl', ["$scope", "$stateParams", "$mmCourses", "$mmCoursesDelegate", "$mmUtil", "$translate", "$q", "$ionicModal", "$mmEvents", "$mmSite", "mmCoursesSearchComponent", "mmCoursesEnrolInvalidKey", "mmCoursesEventMyCoursesUpdated", function($scope, $stateParams, $mmCourses, $mmCoursesDelegate, $mmUtil, $translate, $q,
            $ionicModal, $mmEvents, $mmSite, mmCoursesSearchComponent, mmCoursesEnrolInvalidKey, mmCoursesEventMyCoursesUpdated) {
    var course = $stateParams.course || {},
        selfEnrolWSAvailable = $mmCourses.isSelfEnrolmentEnabled(),
        guestWSAvailable = $mmCourses.isGuestWSAvailable(),
        isGuestEnabled = false,
        guestInstanceId,
        handlersShouldBeShown = true,
        enrollmentMethods;
    $scope.course = course;
    $scope.title = course.fullname;
    $scope.component = mmCoursesSearchComponent;
    $scope.selfEnrolInstances = [];
    $scope.enroldata = {
        password: ''
    };
    $scope.loadingHandlers = function() {
        return handlersShouldBeShown && !$mmCoursesDelegate.areNavHandlersLoadedFor(course.id);
    };
    function getCourse(refresh) {
        var promise;
        if (selfEnrolWSAvailable || guestWSAvailable) {
            $scope.selfEnrolInstances = [];
            promise = $mmCourses.getCourseEnrolmentMethods(course.id).then(function(methods) {
                enrollmentMethods = methods;
                angular.forEach(enrollmentMethods, function(method) {
                    if (selfEnrolWSAvailable && method.type === 'self') {
                        $scope.selfEnrolInstances.push(method);
                    } else if (guestWSAvailable && method.type === 'guest') {
                        isGuestEnabled = true;
                    }
                });
            }).catch(function(error) {
                if (error) {
                    $mmUtil.showErrorModal(error);
                }
            });
        } else {
            promise = $q.when();
        }
        return promise.then(function() {
            return $mmCourses.getUserCourse(course.id).then(function(c) {
                $scope.isEnrolled = true;
                return c;
            }).catch(function() {
                $scope.isEnrolled = false;
                return $mmCourses.getCourse(course.id);
            }).then(function(c) {
                course.fullname = c.fullname || course.fullname;
                course.summary = c.summary || course.summary;
                course._handlers = $mmCoursesDelegate.getNavHandlersFor(course.id, refresh);
            }).catch(function() {
                return canAccessAsGuest().then(function(passwordRequired) {
                    if (!passwordRequired) {
                        course._handlers = $mmCoursesDelegate.getNavHandlersForGuest(course.id, refresh);
                    } else {
                        course._handlers = [];
                        handlersShouldBeShown = false;
                    }
                }).catch(function() {
                    course._handlers = [];
                    handlersShouldBeShown = false;
                });
            });
        });
    }
    function canAccessAsGuest() {
        if (!isGuestEnabled) {
            return $q.reject();
        }
        angular.forEach(enrollmentMethods, function(method) {
            if (method.type == 'guest') {
                guestInstanceId = method.id;
            }
        });
        if (guestInstanceId) {
            return $mmCourses.getCourseGuestEnrolmentInfo(guestInstanceId).then(function(info) {
                if (!info.status) {
                    return $q.reject();
                }
                return info.passwordrequired;
            });
        }
        return $q.reject();
    }
    function refreshData() {
        var promises = [];
        promises.push($mmCourses.invalidateUserCourses());
        promises.push($mmCourses.invalidateCourse(course.id));
        promises.push($mmCourses.invalidateCourseEnrolmentMethods(course.id));
        if (guestInstanceId) {
            promises.push($mmCourses.invalidateCourseGuestEnrolmentInfo(guestInstanceId));
        }
        return $q.all(promises).finally(function() {
            return getCourse(true);
        });
    }
    getCourse().finally(function() {
        $scope.courseLoaded = true;
    });
    $scope.doRefresh = function() {
        refreshData().finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
    if (selfEnrolWSAvailable && course.enrollmentmethods.indexOf('self') > -1) {
        $ionicModal.fromTemplateUrl('core/components/courses/templates/password-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
            $scope.closeModal = function() {
                $scope.enroldata.password = '';
                delete $scope.currentEnrolInstance;
                modal.hide();
            };
            $scope.$on('$destroy', function() {
                modal.remove();
            });
        });
        $scope.enrol = function(instanceId, password) {
            var promise;
            if ($scope.modal.isShown()) {
                promise = $q.when();
            } else {
                promise = $mmUtil.showConfirm($translate('mm.courses.confirmselfenrol'));
            }
            promise.then(function() {
                var modal = $mmUtil.showModalLoading('mm.core.loading', true);
                $mmCourses.selfEnrol(course.id, password, instanceId).then(function() {
                    $scope.closeModal();
                    $scope.isEnrolled = true;
                    refreshData().finally(function() {
                        $mmEvents.trigger(mmCoursesEventMyCoursesUpdated, $mmSite.getId());
                    });
                }).catch(function(error) {
                    if (error) {
                        if (error.code === mmCoursesEnrolInvalidKey) {
                            if ($scope.modal.isShown()) {
                                $mmUtil.showErrorModal(error.message);
                            } else {
                                $scope.currentEnrolInstance = instanceId;
                                $scope.modal.show();
                            }
                        } else if (typeof error == 'string') {
                            $mmUtil.showErrorModal(error);
                        }
                    } else {
                        $mmUtil.showErrorModal('mm.courses.errorselfenrol', true);
                    }
                }).finally(function() {
                    modal.dismiss();
                });
            });
        };
    }
}]);

angular.module('mm.core.courses')
.factory('$mmCourses', ["$q", "$mmSite", "$log", "$mmSitesManager", "mmCoursesSearchPerPage", "mmCoursesEnrolInvalidKey", function($q, $mmSite, $log, $mmSitesManager, mmCoursesSearchPerPage, mmCoursesEnrolInvalidKey) {
    $log = $log.getInstance('$mmCourses');
    var self = {},
        currentCourses = {};
        self.clearCurrentCourses = function() {
        currentCourses = {};
    };
        self.getCourse = function(id, siteid) {
        return self.getCourses([id], siteid).then(function(courses) {
            if (courses && courses.length > 0) {
                return courses[0];
            }
            return $q.reject();
        });
    };
        self.getCourseEnrolmentMethods = function(id) {
        var params = {
                courseid: id
            },
            preSets = {
                cacheKey: getCourseEnrolmentMethodsCacheKey(id)
            };
        return $mmSite.read('core_enrol_get_course_enrolment_methods', params, preSets);
    };
        function getCourseEnrolmentMethodsCacheKey(id) {
        return 'mmCourses:enrolmentmethods:' + id;
    }
        self.getCourseGuestEnrolmentInfo = function(instanceId) {
        var params = {
                instanceid: instanceId
            },
            preSets = {
                cacheKey: getCourseGuestEnrolmentInfoCacheKey(instanceId)
            };
        return $mmSite.read('enrol_guest_get_instance_info', params, preSets).then(function(response) {
            return response.instanceinfo;
        });
    };
        function getCourseGuestEnrolmentInfoCacheKey(instanceId) {
        return 'mmCourses:guestinfo:' + instanceId;
    }
        self.getCourses = function(ids, siteid) {
        siteid = siteid || $mmSite.getId();
        if (!angular.isArray(ids)) {
            return $q.reject();
        } else if (ids.length === 0) {
            return $q.when([]);
        }
        return $mmSitesManager.getSite(siteid).then(function(site) {
            var data = {
                    options: {
                        ids: ids
                    }
                },
                preSets = {
                    cacheKey: getCoursesCacheKey(ids)
                };
            return site.read('core_course_get_courses', data, preSets).then(function(courses) {
                if (typeof courses != 'object' && !angular.isArray(courses)) {
                    return $q.reject();
                }
                return courses;
            });
        });
    };
        function getCoursesCacheKey(ids) {
        return 'mmCourses:course:' + JSON.stringify(ids);
    }
        self.getStoredCourse = function(id) {
        $log.warn('The function \'getStoredCourse\' is deprecated. Please use \'getUserCourse\' instead');
        return currentCourses[id];
    };
        self.getUserCourse = function(id, preferCache, siteid) {
        siteid = siteid || $mmSite.getId();
        if (!id) {
            return $q.reject();
        }
        if (typeof preferCache == 'undefined') {
            preferCache = false;
        }
        return self.getUserCourses(preferCache, siteid).then(function(courses) {
            var course;
            angular.forEach(courses, function(c) {
                if (c.id == id) {
                    course = c;
                }
            });
            return course ? course : $q.reject();
        });
    };
        self.getUserCourses = function(preferCache, siteid) {
        siteid = siteid || $mmSite.getId();
        if (typeof preferCache == 'undefined') {
            preferCache = false;
        }
        return $mmSitesManager.getSite(siteid).then(function(site) {
            var userid = site.getUserId(),
                presets = {
                    cacheKey: getUserCoursesCacheKey(),
                    omitExpires: preferCache
                },
                data = {userid: userid};
            if (typeof userid === 'undefined') {
                return $q.reject();
            }
            return site.read('core_enrol_get_users_courses', data, presets).then(function(courses) {
                if (siteid === $mmSite.getId()) {
                    storeCoursesInMemory(courses);
                }
                return courses;
            });
        });
    };
        function getUserCoursesCacheKey() {
        return 'mmCourses:usercourses';
    }
        self.invalidateCourse = function(id, siteid) {
        return self.invalidateCourses([id], siteid);
    };
        self.invalidateCourseEnrolmentMethods = function(id) {
        return $mmSite.invalidateWsCacheForKey(getCourseEnrolmentMethodsCacheKey(id));
    };
        self.invalidateCourseGuestEnrolmentInfo = function(instanceId) {
        return $mmSite.invalidateWsCacheForKey(getCourseGuestEnrolmentInfoCacheKey(instanceId));
    };
        self.invalidateCourses = function(ids, siteid) {
        siteid = siteid || $mmSite.getId();
        return $mmSitesManager.getSite(siteid).then(function(site) {
            return site.invalidateWsCacheForKey(getCoursesCacheKey(ids));
        });
    };
        self.invalidateUserCourses = function(siteid) {
        siteid = siteid || $mmSite.getId();
        return $mmSitesManager.getSite(siteid).then(function(site) {
            return site.invalidateWsCacheForKey(getUserCoursesCacheKey());
        });
    };
        self.isGuestWSAvailable = function() {
        return $mmSite.wsAvailable('enrol_guest_get_instance_info');
    };
        self.isSearchCoursesAvailable = function() {
        return $mmSite.wsAvailable('core_course_search_courses');
    };
        self.isSelfEnrolmentEnabled = function() {
        return $mmSite.wsAvailable('enrol_self_enrol_user');
    };
        self.search = function(text, page, perpage) {
        page = page || 0;
        perpage = perpage || mmCoursesSearchPerPage;
        var params = {
                criterianame: 'search',
                criteriavalue: text,
                page: page,
                perpage: perpage
            }, preSets = {
                getFromCache: false
            };
        return $mmSite.read('core_course_search_courses', params, preSets).then(function(response) {
            if (typeof response == 'object') {
                return {total: response.total, courses: response.courses};
            }
            return $q.reject();
        });
    };
        self.selfEnrol = function(courseid, password, instanceId) {
        if (typeof password == 'undefined') {
            password = '';
        }
        var params = {
            courseid: courseid,
            password: password
        };
        if (instanceId) {
            params.instanceid = instanceId;
        }
        return $mmSite.write('enrol_self_enrol_user', params).then(function(response) {
            if (response) {
                if (response.status) {
                    return true;
                } else if (response.warnings && response.warnings.length) {
                    var message;
                    angular.forEach(response.warnings, function(warning) {
                        if (warning.warningcode == '2' || warning.warningcode == '4') {
                            message = warning.message;
                        }
                    });
                    if (message) {
                        return $q.reject({code: mmCoursesEnrolInvalidKey, message: message});
                    }
                }
            }
            return $q.reject();
        });
    };
        function storeCoursesInMemory(courses) {
        angular.forEach(courses, function(course) {
            currentCourses[course.id] = angular.copy(course);
        });
    }
    return self;
}]);

angular.module('mm.core.courses')
.provider('$mmCoursesDelegate', function() {
    var navHandlers = {},
        self = {};
        self.registerNavHandler = function(addon, handler, priority) {
        if (typeof navHandlers[addon] !== 'undefined') {
            console.log("$mmCoursesDelegateProvider: Addon '" + navHandlers[addon].addon + "' already registered as navigation handler");
            return false;
        }
        console.log("$mmCoursesDelegateProvider: Registered addon '" + addon + "' as navibation handler.");
        navHandlers[addon] = {
            addon: addon,
            handler: handler,
            instance: undefined,
            priority: priority
        };
        return true;
    };
    self.$get = ["$mmUtil", "$q", "$log", "$mmSite", "mmCoursesAccessMethods", function($mmUtil, $q, $log, $mmSite, mmCoursesAccessMethods) {
        var enabledNavHandlers = {},
            coursesHandlers = {},
            self = {},
            loaded = {};
        $log = $log.getInstance('$mmCoursesDelegate');
                self.areNavHandlersLoadedFor = function(courseId) {
            return loaded[courseId];
        };
                self.clearCoursesHandlers = function() {
            coursesHandlers = {};
            loaded = {};
        };
                function getNavHandlersForAccess(courseId, refresh, accessData) {
            if (refresh || !coursesHandlers[courseId] || coursesHandlers[courseId].access.type != accessData.type) {
                coursesHandlers[courseId] = {
                    access: accessData,
                    handlers: []
                };
                self.updateNavHandlersForCourse(courseId, accessData);
            }
            return coursesHandlers[courseId].handlers;
        }
                self.getNavHandlersFor = function(courseId, refresh) {
            var accessData = {
                type: mmCoursesAccessMethods.default
            };
            return getNavHandlersForAccess(courseId, refresh, accessData);
        };
                self.getNavHandlersForGuest = function(courseId, refresh) {
            var accessData = {
                type: mmCoursesAccessMethods.guest
            };
            return getNavHandlersForAccess(courseId, refresh, accessData);
        };
                self.updateNavHandler = function(addon, handlerInfo) {
            var promise;
            if (typeof handlerInfo.instance === 'undefined') {
                handlerInfo.instance = $mmUtil.resolveObject(handlerInfo.handler, true);
            }
            if (!$mmSite.isLoggedIn()) {
                promise = $q.reject();
            } else {
                promise = $q.when(handlerInfo.instance.isEnabled());
            }
            return promise.then(function(enabled) {
                if (enabled) {
                    enabledNavHandlers[addon] = {
                        instance: handlerInfo.instance,
                        priority: handlerInfo.priority
                    };
                } else {
                    return $q.reject();
                }
            }).catch(function() {
                delete enabledNavHandlers[addon];
            });
        };
                self.updateNavHandlers = function() {
            var promises = [];
            $log.debug('Updating navigation handlers for current site.');
            angular.forEach(navHandlers, function(handlerInfo, addon) {
                promises.push(self.updateNavHandler(addon, handlerInfo));
            });
            return $q.all(promises).then(function() {
                return true;
            }, function() {
                return true;
            }).finally(function() {
                angular.forEach(coursesHandlers, function(handler, courseId) {
                    self.updateNavHandlersForCourse(parseInt(courseId), handler.access);
                });
            });
        };
                self.updateNavHandlersForCourse = function(courseId, accessData) {
            var promises = [],
                enabledForCourse = [];
            angular.forEach(enabledNavHandlers, function(handler) {
                var promise = $q.when(handler.instance.isEnabledForCourse(courseId, accessData)).then(function(enabled) {
                    if (enabled) {
                        enabledForCourse.push(handler);
                    } else {
                        return $q.reject();
                    }
                }).catch(function() {
                });
                promises.push(promise);
            });
            return $q.all(promises).then(function() {
                return true;
            }).catch(function() {
                return true;
            }).finally(function() {
                $mmUtil.emptyArray(coursesHandlers[courseId].handlers);
                angular.forEach(enabledForCourse, function(handler) {
                    coursesHandlers[courseId].handlers.push({
                        controller: handler.instance.getController(courseId),
                        priority: handler.priority
                    });
                });
                loaded[courseId] = true;
            });
        };
        return self;
    }];
    return self;
});

angular.module('mm.core.courses')
.factory('$mmCoursesHandlers', ["$mmSite", "$state", "$mmCourses", "$q", "$mmUtil", "$translate", "$timeout", "mmCoursesEnrolInvalidKey", function($mmSite, $state, $mmCourses, $q, $mmUtil, $translate, $timeout,
            mmCoursesEnrolInvalidKey) {
    var self = {};
        self.linksHandler = function() {
        var self = {};
                function actionEnrol(courseId, url) {
            var modal = $mmUtil.showModalLoading();
            $mmCourses.getUserCourse(courseId).catch(function() {
                return canSelfEnrol(courseId).then(function() {
                    modal.dismiss();
                    return selfEnrol(courseId).catch(function() {
                        if (typeof error == 'string') {
                            $mmUtil.showErrorModal(error);
                        }
                        return $q.reject();
                    });
                }, function(error) {
                    modal.dismiss();
                    if (typeof error != 'string') {
                        error = $translate.instant('mm.courses.notenroled');
                    }
                    var body = $translate('mm.core.twoparagraphs',
                                    {p1: error, p2: $translate.instant('mm.core.confirmopeninbrowser')});
                    $mmUtil.showConfirm(body).then(function() {
                        $mmUtil.openInBrowser(url);
                    });
                    return $q.reject();
                });
            }).then(function() {
                modal.dismiss();
                $state.go('redirect', {
                    siteid: $mmSite.getId(),
                    state: 'site.mm_course',
                    params: {courseid: courseId}
                });
            });
        }
                function canSelfEnrol(courseId) {
            if (!$mmCourses.isSelfEnrolmentEnabled()) {
                return $q.reject();
            }
            return $mmCourses.getCourseEnrolmentMethods(courseId).then(function(methods) {
                var isSelfEnrolEnabled = false,
                    instances = 0;
                angular.forEach(methods, function(method) {
                    if (method.type == 'self' && method.status) {
                        isSelfEnrolEnabled = true;
                        instances++;
                    }
                });
                if (!isSelfEnrolEnabled || instances != 1) {
                    return $q.reject();
                }
            });
        }
                function selfEnrol(courseId, password) {
            var modal = $mmUtil.showModalLoading();
            return $mmCourses.selfEnrol(courseId, password).then(function() {
                return $mmCourses.invalidateUserCourses().catch(function() {
                }).then(function() {
                    return $timeout(function() {}, 4000).finally(function() {
                        modal.dismiss();
                    });
                });
            }).catch(function(error) {
                modal.dismiss();
                if (error && error.code === mmCoursesEnrolInvalidKey) {
                    var title = $translate.instant('mm.courses.selfenrolment'),
                        body = ' ',
                        placeholder = $translate.instant('mm.courses.password');
                    if (typeof password != 'undefined') {
                        $mmUtil.showErrorModal(error.message);
                    }
                    return $mmUtil.showPrompt(body, title, placeholder).then(function(password) {
                        return selfEnrol(courseId, password);
                    });
                } else {
                    return $q.reject(error);
                }
            });
        }
                self.getActions = function(siteIds, url) {
            if (typeof self.handles(url) != 'undefined') {
                var params = $mmUtil.extractUrlParams(url);
                if (typeof params.id != 'undefined') {
                    return [{
                        message: 'mm.core.view',
                        icon: 'ion-eye',
                        sites: siteIds,
                        action: function(siteId) {
                            siteId = siteId || $mmSite.getId();
                            if (siteId == $mmSite.getId()) {
                                actionEnrol(parseInt(params.id, 10), url);
                            } else {
                                $state.go('redirect', {
                                    siteid: siteId,
                                    state: 'site.mm_course',
                                    params: {courseid: parseInt(params.id, 10)}
                                });
                            }
                        }
                    }];
                }
            }
            return [];
        };
                self.handles = function(url) {
            var patterns = ['/enrol/index.php', '/course/enrol.php', '/course/view.php'];
            for (var i = 0; i < patterns.length; i++) {
                var position = url.indexOf(patterns[i]);
                if (position > -1) {
                    return url.substr(0, position);
                }
            }
        };
        return self;
    };
    return self;
}]);

angular.module('mm.core.login')
.controller('mmLoginCredentialsCtrl', ["$scope", "$state", "$stateParams", "$mmSitesManager", "$mmUtil", "$ionicHistory", "$mmApp", "$q", "$mmLoginHelper", "$translate", "$mmContentLinksDelegate", "$mmContentLinksHelper", function($scope, $state, $stateParams, $mmSitesManager, $mmUtil, $ionicHistory, $mmApp,
            $q, $mmLoginHelper, $translate, $mmContentLinksDelegate, $mmContentLinksHelper) {
    $scope.siteurl = $stateParams.siteurl;
    $scope.credentials = {
        username: $stateParams.username
    };
    var siteChecked = false,
        urlToOpen = $stateParams.urltoopen;
    function checkSite(siteurl) {
        var checkmodal = $mmUtil.showModalLoading();
        return $mmSitesManager.checkSite(siteurl).then(function(result) {
            siteChecked = true;
            $scope.siteurl = result.siteurl;
            if (result && result.warning) {
                $mmUtil.showErrorModal(result.warning, true, 4000);
            }
            if ($mmLoginHelper.isSSOLoginNeeded(result.code)) {
                $scope.isBrowserSSO = true;
                if (!$mmLoginHelper.isSSOLoginOngoing() && !$scope.$$destroyed) {
                    $mmUtil.showConfirm($translate('mm.login.logininsiterequired')).then(function() {
                        $mmLoginHelper.openBrowserForSSOLogin(result.siteurl);
                    });
                }
            } else {
                $scope.isBrowserSSO = false;
            }
        }).catch(function(error) {
            $mmUtil.showErrorModal(error);
            return $q.reject();
        }).finally(function() {
            checkmodal.dismiss();
        });
    }
    if ($mmLoginHelper.isFixedUrlSet()) {
        checkSite($scope.siteurl);
    } else {
        siteChecked = true;
    }
    $scope.login = function() {
        $mmApp.closeKeyboard();
        var siteurl = $scope.siteurl,
            username = $scope.credentials.username,
            password = $scope.credentials.password;
        if (!siteChecked) {
            return checkSite(siteurl).then(function() {
                if (!$scope.isBrowserSSO) {
                    return $scope.login();
                }
            });
        } else if ($scope.isBrowserSSO) {
            return checkSite(siteurl);
        }
        if (!username) {
            $mmUtil.showErrorModal('mm.login.usernamerequired', true);
            return;
        }
        if (!password) {
            $mmUtil.showErrorModal('mm.login.passwordrequired', true);
            return;
        }
        var modal = $mmUtil.showModalLoading();
        return $mmSitesManager.getUserToken(siteurl, username, password).then(function(data) {
            return $mmSitesManager.newSite(data.siteurl, data.token).then(function() {
                delete $scope.credentials;
                $ionicHistory.nextViewOptions({disableBack: true});
                if (urlToOpen) {
                    return $mmContentLinksDelegate.getActionsFor(urlToOpen, undefined, username).then(function(actions) {
                        action = $mmContentLinksHelper.getFirstValidAction(actions);
                        if (action && action.sites.length) {
                            action.action(action.sites[0]);
                        } else {
                            return $mmLoginHelper.goToSiteInitialPage();
                        }
                    });
                } else {
                    return $mmLoginHelper.goToSiteInitialPage();
                }
            });
        }).catch(function(error) {
            $mmUtil.showErrorModal(error);
        }).finally(function() {
            modal.dismiss();
        });
    };
}]);

angular.module('mm.core.login')
.controller('mmLoginInitCtrl', ["$log", "$ionicHistory", "$state", "$mmSitesManager", "$mmSite", "$mmApp", "$mmLoginHelper", function($log, $ionicHistory, $state, $mmSitesManager, $mmSite, $mmApp, $mmLoginHelper) {
    $log = $log.getInstance('mmLoginInitCtrl');
    $mmApp.ready().then(function() {
        $ionicHistory.nextViewOptions({
            disableAnimate: true,
            disableBack: true
        });
        if ($mmSite.isLoggedIn()) {
            $mmLoginHelper.goToSiteInitialPage();
        } else {
            $mmSitesManager.hasSites().then(function() {
                return $state.go('mm_login.sites');
            }, function() {
                return $mmLoginHelper.goToAddSite();
            });
        }
    });
}]);

angular.module('mm.core.login')
.controller('mmLoginReconnectCtrl', ["$scope", "$state", "$stateParams", "$mmSitesManager", "$mmApp", "$mmUtil", "$ionicHistory", "$mmLoginHelper", function($scope, $state, $stateParams, $mmSitesManager, $mmApp, $mmUtil, $ionicHistory,
            $mmLoginHelper) {
    var infositeurl = $stateParams.infositeurl;
    $scope.siteurl = $stateParams.siteurl;
    $scope.credentials = {
        username: $stateParams.username,
        password: ''
    };
    $scope.cancel = function() {
        $mmSitesManager.logout().finally(function() {
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go('mm_login.sites');
        });
    };
    $scope.login = function() {
        $mmApp.closeKeyboard();
        var siteurl = $scope.siteurl,
            username = $scope.credentials.username,
            password = $scope.credentials.password;
        if (!password) {
            $mmUtil.showErrorModal('mm.login.passwordrequired', true);
            return;
        }
        var modal = $mmUtil.showModalLoading();
        $mmSitesManager.getUserToken(siteurl, username, password).then(function(data) {
            $mmSitesManager.updateSiteToken(infositeurl, username, data.token).then(function() {
                $mmSitesManager.updateSiteInfoByUrl(infositeurl, username).finally(function() {
                    delete $scope.credentials;
                    $ionicHistory.nextViewOptions({disableBack: true});
                    return $mmLoginHelper.goToSiteInitialPage();
                });
            }, function(error) {
                $mmUtil.showErrorModal('mm.login.errorupdatesite', true);
                $scope.cancel();
            }).finally(function() {
                modal.dismiss();
            });
        }, function(error) {
            modal.dismiss();
            $mmUtil.showErrorModal(error);
        });
    };
}]);

angular.module('mm.core.login')
.controller('mmLoginSiteCtrl', ["$scope", "$state", "$mmSitesManager", "$mmUtil", "$translate", "$ionicHistory", "$mmApp", "$ionicModal", "$mmLoginHelper", function($scope, $state, $mmSitesManager, $mmUtil, $translate, $ionicHistory, $mmApp,
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
            $mmSitesManager.checkSite(url).then(function(result) {
                if (result.warning) {
                    $mmUtil.showErrorModal(result.warning, true, 4000);
                }
                if ($mmLoginHelper.isSSOLoginNeeded(result.code)) {
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
    $mmUtil.getDocsUrl().then(function(docsurl) {
        $scope.docsurl = docsurl;
    });
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
}]);

angular.module('mm.core.login')
.controller('mmLoginSitesCtrl', ["$scope", "$state", "$mmSitesManager", "$log", "$translate", "$mmUtil", "$ionicHistory", "$mmText", "$mmLoginHelper", function($scope, $state, $mmSitesManager, $log, $translate, $mmUtil, $ionicHistory, $mmText,
            $mmLoginHelper) {
    $log = $log.getInstance('mmLoginSitesCtrl');
    $mmSitesManager.getSites().then(function(sites) {
        $scope.sites = sites;
        $scope.data = {
            hasSites: sites.length > 0,
            showDelete: false
        };
    });
    $scope.toggleDelete = function() {
        $scope.data.showDelete = !$scope.data.showDelete;
    };
    $scope.onItemDelete = function(e, index) {
        e.stopPropagation();
        var site = $scope.sites[index],
            sitename = site.sitename;
        $mmText.formatText(sitename).then(function(sitename) {
            $mmUtil.showConfirm($translate('mm.login.confirmdeletesite', {sitename: sitename})).then(function() {
                $mmSitesManager.deleteSite(site.id).then(function() {
                    $scope.sites.splice(index, 1);
                    $mmSitesManager.hasNoSites().then(function() {
                        $ionicHistory.nextViewOptions({disableBack: true});
                        $mmLoginHelper.goToAddSite();
                    });
                }, function() {
                    $log.error('Delete site failed');
                    $mmUtil.showErrorModal('mm.login.errordeletesite', true);
                });
            });
        });
    };
    $scope.login = function(siteid) {
        var modal = $mmUtil.showModalLoading();
        $mmSitesManager.loadSite(siteid).then(function() {
            $ionicHistory.nextViewOptions({disableBack: true});
            return $mmLoginHelper.goToSiteInitialPage();
        }, function(error) {
            $log.error('Error loading site '+siteid);
            error = error || 'Error loading site.';
            $mmUtil.showErrorModal(error);
        }).finally(function() {
            modal.dismiss();
        });
    };
    $scope.add = function() {
        $mmLoginHelper.goToAddSite();
    };
}]);

angular.module('mm.core.login')
.constant('mmLoginSSOCode', 2)
.constant('mmLoginLaunchSiteURL', 'mmLoginLaunchSiteURL')
.constant('mmLoginLaunchPassport', 'mmLoginLaunchPassport')
.factory('$mmLoginHelper', ["$q", "$log", "$mmConfig", "mmLoginSSOCode", "mmLoginLaunchSiteURL", "mmLoginLaunchPassport", "md5", "$mmSite", "$mmSitesManager", "$mmLang", "$mmUtil", "$state", "$mmAddonManager", "mmCoreConfigConstants", function($q, $log, $mmConfig, mmLoginSSOCode, mmLoginLaunchSiteURL, mmLoginLaunchPassport,
            md5, $mmSite, $mmSitesManager, $mmLang, $mmUtil, $state, $mmAddonManager, mmCoreConfigConstants) {
    $log = $log.getInstance('$mmLoginHelper');
    var self = {},
        isSSOLoginOngoing = false;
        self.goToAddSite = function() {
        if (mmCoreConfigConstants.siteurl) {
            return $state.go('mm_login.credentials', {siteurl: mmCoreConfigConstants.siteurl});
        } else {
            return $state.go('mm_login.site');
        }
    };
        self.goToSiteInitialPage = function() {
        if ($mmSite.getInfo() && $mmSite.getInfo().userhomepage === 0) {
            var $mmaFrontpage = $mmAddonManager.get('$mmaFrontpage');
            if ($mmaFrontpage) {
                return $state.go('site.mm_course-section');
            }
        }
        return $state.go('site.mm_courses');
    };
        self.isFixedUrlSet = function() {
        return typeof mmCoreConfigConstants.siteurl != 'undefined';
    };
        self.isSSOLoginNeeded = function(code) {
        return code == mmLoginSSOCode;
    };
        self.isSSOLoginOngoing = function() {
        return isSSOLoginOngoing;
    };
        self.openBrowserForSSOLogin = function(siteurl) {
        var passport = Math.random() * 1000;
        var loginurl = siteurl + "/local/mobile/launch.php?service=" + mmCoreConfigConstants.wsextservice;
        loginurl += "&passport=" + passport;
        $mmConfig.set(mmLoginLaunchSiteURL, siteurl);
        $mmConfig.set(mmLoginLaunchPassport, passport);
        $mmUtil.openInBrowser(loginurl);
        if (navigator.app) {
            navigator.app.exitApp();
        }
    };
        self.setSSOLoginOngoing = function(value) {
        isSSOLoginOngoing = value;
    };
        self.validateBrowserSSOLogin = function(url) {
        var params = url.split(":::");
        return $mmConfig.get(mmLoginLaunchSiteURL).then(function(launchSiteURL) {
            return $mmConfig.get(mmLoginLaunchPassport).then(function(passport) {
                $mmConfig.delete(mmLoginLaunchSiteURL);
                $mmConfig.delete(mmLoginLaunchPassport);
                var signature = md5.createHash(launchSiteURL + passport);
                if (signature != params[0]) {
                    if (launchSiteURL.indexOf("https://") != -1) {
                        launchSiteURL = launchSiteURL.replace("https://", "http://");
                    } else {
                        launchSiteURL = launchSiteURL.replace("http://", "https://");
                    }
                    signature = md5.createHash(launchSiteURL + passport);
                }
                if (signature == params[0]) {
                    $log.debug('Signature validated');
                    return { siteurl: launchSiteURL, token: params[1] };
                } else {
                    $log.debug('Inalid signature in the URL request yours: ' + params[0] + ' mine: '
                                    + signature + ' for passport ' + passport);
                    return $mmLang.translateAndReject('mm.core.unexpectederror');
                }
            });
        });
    };
        self.handleSSOLoginAuthentication = function(siteurl, token) {
        if ($mmSite.isLoggedIn()) {
            var deferred = $q.defer();
            var info = $mmSite.getInfo();
            if (typeof(info) !== 'undefined' && typeof(info.username) !== 'undefined') {
                $mmSitesManager.updateSiteToken(info.siteurl, info.username, token).then(function() {
                    $mmSitesManager.updateSiteInfoByUrl(info.siteurl, info.username).finally(deferred.resolve);
                }, function() {
                    $mmLang.translateAndRejectDeferred(deferred, 'mm.login.errorupdatesite');
                });
            } else {
                $mmLang.translateAndRejectDeferred(deferred, 'mm.login.errorupdatesite');
            }
            return deferred.promise;
        } else {
            return $mmSitesManager.newSite(siteurl, token);
        }
    };
    return self;
}]);

angular.module('mm.core.settings')
.controller('mmSettingsAboutCtrl', ["$scope", "$translate", "$window", "$mmApp", "$ionicPlatform", "$mmLang", "$mmFS", "$mmLocalNotifications", "mmCoreConfigConstants", function($scope, $translate, $window, $mmApp, $ionicPlatform, $mmLang, $mmFS,
            $mmLocalNotifications, mmCoreConfigConstants) {
    $scope.versionname = mmCoreConfigConstants.versionname;
    $translate('mm.settings.appname', {version: $scope.versionname}).then(function(appName) {
        $scope.appname = appName;
    });
    $scope.versioncode = mmCoreConfigConstants.versioncode;
    $scope.navigator = $window.navigator;
    if ($window.location && $window.location.href) {
        var url = $window.location.href;
        $scope.locationhref = url.substr(0, url.indexOf('#/site/'));
    }
    $scope.appready = $mmApp.isReady() ? 'mm.core.yes' : 'mm.core.no';
    $scope.devicetype = $ionicPlatform.isTablet() ? 'mm.core.tablet' : 'mm.core.phone';
    if (ionic.Platform.isAndroid()) {
        $scope.deviceos = 'mm.core.android';
    } else if (ionic.Platform.isIOS()) {
        $scope.deviceos = 'mm.core.ios';
    } else if (ionic.Platform.isWindowsPhone()) {
        $scope.deviceos = 'mm.core.windowsphone';
    } else {
        var matches = navigator.userAgent.match(/\(([^\)]*)\)/);
        if (matches && matches.length > 1) {
            $scope.deviceos = matches[1];
        } else {
            $scope.deviceos = 'mm.core.unknown';
        }
    }
    $mmLang.getCurrentLanguage().then(function(lang) {
        $scope.currentlanguage = lang;
    });
    $scope.networkstatus = $mmApp.isOnline() ? 'mm.core.online' : 'mm.core.offline';
    $scope.wificonnection = $mmApp.isNetworkAccessLimited() ? 'mm.core.no' : 'mm.core.yes';
    $scope.devicewebworkers = !!window.Worker && !!window.URL ? 'mm.core.yes' : 'mm.core.no';
    $scope.device = ionic.Platform.device();
    if ($mmFS.isAvailable()) {
        $mmFS.getBasePath().then(function(basepath) {
            $scope.filesystemroot = basepath;
            $scope.fsclickable = $mmFS.usesHTMLAPI();
        });
    }
    $scope.storagetype = $mmApp.getDB().getType();
    $scope.localnotifavailable = $mmLocalNotifications.isAvailable() ? 'mm.core.yes' : 'mm.core.no';
}]);

angular.module('mm.core.settings')
.controller('mmSettingsGeneralCtrl', ["$scope", "$mmLang", "$ionicHistory", "$mmEvents", "$mmConfig", "mmCoreEventLanguageChanged", "mmCoreSettingsReportInBackground", "mmCoreConfigConstants", "mmCoreSettingsDownloadSection", function($scope, $mmLang, $ionicHistory, $mmEvents, $mmConfig, mmCoreEventLanguageChanged,
            mmCoreSettingsReportInBackground, mmCoreConfigConstants, mmCoreSettingsDownloadSection) {
    $scope.langs = mmCoreConfigConstants.languages;
    $mmLang.getCurrentLanguage().then(function(currentLanguage) {
        $scope.selectedLanguage = currentLanguage;
    });
    $scope.languageChanged = function(newLang) {
        $mmLang.changeCurrentLanguage(newLang).finally(function() {
            $ionicHistory.clearCache();
            $mmEvents.trigger(mmCoreEventLanguageChanged);
        });
    };
    $mmConfig.get(mmCoreSettingsDownloadSection, true).then(function(downloadSectionEnabled) {
        $scope.downloadSection = downloadSectionEnabled;
    });
    $scope.downloadSectionChanged = function(downloadSection) {
        $mmConfig.set(mmCoreSettingsDownloadSection, downloadSection);
    };
    if (localStorage && localStorage.getItem && localStorage.setItem) {
        $scope.showReport = true;
        $scope.reportInBackground = parseInt(localStorage.getItem(mmCoreSettingsReportInBackground), 10) === 1;
        $scope.reportChanged = function(inBackground) {
            localStorage.setItem(mmCoreSettingsReportInBackground, inBackground ? '1' : '0');
        };
    } else {
        $scope.showReport = false;
    }
}]);

angular.module('mm.core.settings')
.controller('mmSettingsSpaceUsageCtrl', ["$log", "$scope", "$mmSitesManager", "$mmFS", "$q", "$mmUtil", "$translate", "$mmText", "$mmFilepool", function($log, $scope, $mmSitesManager, $mmFS, $q, $mmUtil, $translate,
            $mmText, $mmFilepool) {
    $log = $log.getInstance('mmSettingsSpaceUsageCtrl');
    function calculateSizeUsage() {
        return $mmSitesManager.getSites().then(function(sites) {
            var promises = [];
            $scope.sites = sites;
            angular.forEach(sites, function(siteEntry) {
                var promise = $mmSitesManager.getSite(siteEntry.id).then(function(site) {
                    return site.getSpaceUsage().then(function(size) {
                        siteEntry.spaceusage = size;
                    });
                });
                promises.push(promise);
            });
            return $q.all(promises);
        });
    }
    function calculateTotalUsage() {
        var total = 0;
        angular.forEach($scope.sites, function(site) {
            if (site.spaceusage) {
                total += parseInt(site.spaceusage, 10);
            }
        });
        $scope.totalusage = total;
    }
    function calculateFreeSpace() {
        if ($mmFS.isAvailable()) {
            return $mmFS.calculateFreeSpace().then(function(freespace) {
                $scope.freespace = freespace;
            }, function() {
                $scope.freespace = 0;
            });
        } else {
            $scope.freespace = 0;
        }
    }
    function fetchData() {
        var promises = [];
        promises.push(calculateSizeUsage().then(calculateTotalUsage));
        promises.push($q.when(calculateFreeSpace()));
        return $q.all(promises);
    }
    fetchData().finally(function() {
        $scope.sizeLoaded = true;
    });
    $scope.refresh = function() {
        fetchData().finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
    function updateSiteUsage(site, newUsage) {
        var oldUsage = site.spaceusage;
        site.spaceusage = newUsage;
        $scope.totalusage -= oldUsage - newUsage;
        $scope.freespace += oldUsage - newUsage;
    }
    $scope.deleteSiteFiles = function(siteData) {
        if (siteData) {
            var siteid = siteData.id,
                sitename = siteData.sitename;
            $mmText.formatText(sitename).then(function(sitename) {
                $translate('mm.settings.deletesitefilestitle').then(function(title) {
                    return $mmUtil.showConfirm($translate('mm.settings.deletesitefiles', {sitename: sitename}), title);
                }).then(function() {
                    return $mmSitesManager.getSite(siteid);
                }).then(function(site) {
                    return site.deleteFolder().then(function() {
                        $mmFilepool.clearAllPackagesStatus(siteid);
                        $mmFilepool.clearFilepool(siteid);
                        updateSiteUsage(siteData, 0);
                    }).catch(function(error) {
                        if (error && error.code === FileError.NOT_FOUND_ERR) {
                            $mmFilepool.clearAllPackagesStatus(siteid);
                            updateSiteUsage(siteData, 0);
                        } else {
                            $mmUtil.showErrorModal('mm.settings.errordeletesitefiles', true);
                            site.getSpaceUsage().then(function(size) {
                                updateSiteUsage(siteData, size);
                            });
                        }
                    });
                });
            });
        }
    };
}]);

angular.module('mm.core.settings')
.controller('mmSettingsSynchronizationCtrl', ["$log", "$scope", "$mmSitesManager", "$mmUtil", "$mmFilepool", "$mmEvents", "$mmLang", "$mmConfig", "mmCoreEventSessionExpired", "mmCoreSettingsSyncOnlyOnWifi", function($log, $scope, $mmSitesManager, $mmUtil, $mmFilepool, $mmEvents,
            $mmLang, $mmConfig, mmCoreEventSessionExpired, mmCoreSettingsSyncOnlyOnWifi) {
    $log = $log.getInstance('mmSettingsSynchronizationCtrl');
    $mmSitesManager.getSites().then(function(sites) {
        $scope.sites = sites;
    });
    $mmConfig.get(mmCoreSettingsSyncOnlyOnWifi, true).then(function(syncOnlyOnWifi) {
        $scope.syncOnlyOnWifi = syncOnlyOnWifi;
    });
    $scope.syncWifiChanged = function(syncOnlyOnWifi) {
        $mmConfig.set(mmCoreSettingsSyncOnlyOnWifi, syncOnlyOnWifi);
    };
    $scope.synchronize = function(siteData) {
        if (siteData) {
            var siteid = siteData.id,
                modal = $mmUtil.showModalLoading('mm.settings.synchronizing', true);
            $mmFilepool.invalidateAllFiles(siteid).finally(function() {
                $mmSitesManager.getSite(siteid).then(function(site) {
                    return site.invalidateWsCache().then(function() {
                        return site.checkIfLocalMobileInstalledAndNotUsed().then(function() {
                            $mmEvents.trigger(mmCoreEventSessionExpired, siteid);
                            return $mmLang.translateAndReject('mm.core.lostconnection');
                        }, function() {
                            return $mmSitesManager.updateSiteInfo(siteid);
                        });
                    }).then(function() {
                        siteData.fullname = site.getInfo().fullname;
                        siteData.sitename = site.getInfo().sitename;
                        $mmUtil.showModal('mm.core.success', 'mm.settings.syncsitesuccess');
                    });
                }).catch(function(error) {
                    if (error) {
                        $mmUtil.showErrorModal(error);
                    } else {
                        $mmUtil.showErrorModal('mm.settings.errorsyncsite', true);
                    }
                }).finally(function() {
                    modal.dismiss();
                });
            });
        }
    };
}]);

angular.module('mm.core.sidemenu')
.controller('mmSideMenuCtrl', ["$scope", "$state", "$mmSideMenuDelegate", "$mmSitesManager", "$mmSite", "$mmEvents", "$timeout", "mmCoreEventLanguageChanged", "mmCoreEventSiteUpdated", function($scope, $state, $mmSideMenuDelegate, $mmSitesManager, $mmSite, $mmEvents,
            $timeout, mmCoreEventLanguageChanged, mmCoreEventSiteUpdated) {
    $scope.handlers = $mmSideMenuDelegate.getNavHandlers();
    $scope.areNavHandlersLoaded = $mmSideMenuDelegate.areNavHandlersLoaded;
    $scope.siteinfo = $mmSite.getInfo();
    $scope.logout = function() {
        $mmSitesManager.logout().finally(function() {
            $state.go('mm_login.sites');
        });
    };
    $mmSite.getDocsUrl().then(function(docsurl) {
        $scope.docsurl = docsurl;
    });
    function updateSiteInfo() {
        $scope.siteinfo = undefined;
        $timeout(function() {
            $scope.siteinfo = $mmSite.getInfo();
            $mmSite.getDocsUrl().then(function(docsurl) {
                $scope.docsurl = docsurl;
            });
        });
    }
    var langObserver = $mmEvents.on(mmCoreEventLanguageChanged, updateSiteInfo);
    var updateSiteObserver = $mmEvents.on(mmCoreEventSiteUpdated, function(siteid) {
        if ($mmSite.getId() === siteid) {
            updateSiteInfo();
        }
    });
    $scope.$on('$destroy', function() {
        if (langObserver && langObserver.off) {
            langObserver.off();
        }
        if (updateSiteObserver && updateSiteObserver.off) {
            updateSiteObserver.off();
        }
    });
}]);

angular.module('mm.core.sidemenu')
.provider('$mmSideMenuDelegate', function() {
    var navHandlers = {},
        self = {};
        self.registerNavHandler = function(addon, handler, priority) {
        if (typeof navHandlers[addon] !== 'undefined') {
            console.log("$mmSideMenuDelegateProvider: Addon '" + navHandlers[addon].addon + "' already registered as navigation handler");
            return false;
        }
        console.log("$mmSideMenuDelegateProvider: Registered addon '" + addon + "' as navigation handler.");
        navHandlers[addon] = {
            addon: addon,
            handler: handler,
            instance: undefined,
            priority: priority
        };
        return true;
    };
    self.$get = ["$mmUtil", "$q", "$log", "$mmSite", function($mmUtil, $q, $log, $mmSite) {
        var enabledNavHandlers = {},
            currentSiteHandlers = [],
            self = {},
            loaded = false;
        $log = $log.getInstance('$mmSideMenuDelegate');
                self.areNavHandlersLoaded = function() {
            return loaded;
        };
                self.clearSiteHandlers = function() {
            loaded = false;
            $mmUtil.emptyArray(currentSiteHandlers);
        };
                self.getNavHandlers = function() {
            return currentSiteHandlers;
        };
                self.updateNavHandler = function(addon, handlerInfo) {
            var promise;
            if (typeof handlerInfo.instance === 'undefined') {
                handlerInfo.instance = $mmUtil.resolveObject(handlerInfo.handler, true);
            }
            if (!$mmSite.isLoggedIn()) {
                promise = $q.reject();
            } else {
                promise = $q.when(handlerInfo.instance.isEnabled());
            }
            return promise.then(function(enabled) {
                if (enabled) {
                    enabledNavHandlers[addon] = {
                        instance: handlerInfo.instance,
                        priority: handlerInfo.priority
                    };
                } else {
                    return $q.reject();
                }
            }).catch(function() {
                delete enabledNavHandlers[addon];
            });
        };
                self.updateNavHandlers = function() {
            var promises = [];
            $log.debug('Updating navigation handlers for current site.');
            angular.forEach(navHandlers, function(handlerInfo, addon) {
                promises.push(self.updateNavHandler(addon, handlerInfo));
            });
            return $q.all(promises).then(function() {
                return true;
            }, function() {
                return true;
            }).finally(function() {
                $mmUtil.emptyArray(currentSiteHandlers);
                angular.forEach(enabledNavHandlers, function(handler) {
                    currentSiteHandlers.push({
                        controller: handler.instance.getController(),
                        priority: handler.priority
                    });
                });
                loaded = true;
            });
        };
        return self;
    }];
    return self;
});

angular.module('mm.core.textviewer')
.controller('mmTextViewerIndexCtrl', ["$stateParams", "$scope", function($stateParams, $scope) {
    $scope.title = $stateParams.title;
    $scope.content = $stateParams.content;
}]);

angular.module('mm.core.user')
.controller('mmUserProfileCtrl', ["$scope", "$stateParams", "$mmUtil", "$mmUser", "$mmUserDelegate", "$mmSite", "$q", "$translate", "$mmEvents", "mmUserEventProfileRefreshed", function($scope, $stateParams, $mmUtil, $mmUser, $mmUserDelegate, $mmSite, $q, $translate,
            $mmEvents, mmUserEventProfileRefreshed) {
    var courseid = $stateParams.courseid,
        userid   = $stateParams.userid;
    $scope.isAndroid = ionic.Platform.isAndroid();
    $scope.plugins = [];
    function fetchUserData() {
        return $mmUser.getProfile(userid, courseid).then(function(user) {
            user.address = $mmUser.formatAddress(user.address, user.city, user.country);
            if (user.address) {
                user.encodedAddress = encodeURIComponent(user.address);
            }
            $mmUser.formatRoleList(user.roles).then(function(roles) {
                user.roles = roles;
            });
            $scope.user = user;
            $scope.title = user.fullname;
            $scope.hasContact = user.email || user.phone1 || user.phone2 || user.city || user.country || user.address;
            $scope.hasDetails = user.url || user.roles || user.interests;
            $scope.isLoadingHandlers = true;
            $mmUserDelegate.getProfileHandlersFor(user, courseid).then(function(handlers) {
                $scope.profileHandlers = handlers;
            }).finally(function() {
                $scope.isLoadingHandlers = false;
            });
        }, function(message) {
            $scope.user = false;
            if (message) {
                $mmUtil.showErrorMessage(message);
            }
            return $q.reject();
        });
    }
    fetchUserData().then(function() {
        return $mmSite.write('core_user_view_user_profile', {
            userid: userid,
            courseid: courseid
        }).catch(function(error) {
            $scope.isDeleted = error === $translate.instant('mm.core.userdeleted');
        });
    }).finally(function() {
        $scope.userLoaded = true;
    });
    $scope.refreshUser = function() {
        $mmEvents.trigger(mmUserEventProfileRefreshed, {courseid: courseid, userid: userid});
        $mmUser.invalidateUserCache(userid).finally(function() {
            fetchUserData().finally(function() {
                $scope.$broadcast('scroll.refreshComplete');
            });
        });
    };
}]);

angular.module('mm.core')
.directive('mmUserLink', ["$state", "mmUserProfileState", function($state, mmUserProfileState) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.on('click', function(event) {
                event.preventDefault();
                event.stopPropagation();
                $state.go(mmUserProfileState, {courseid: attrs.courseid, userid: attrs.userid});
            });
        }
    };
}]);

angular.module('mm.core.user')
.provider('$mmUserDelegate', function() {
    var profileHandlers = {},
        self = {};
        self.registerProfileHandler = function(component, handler, priority) {
        if (typeof profileHandlers[component] !== 'undefined') {
            console.log("$mmUserDelegateProvider: Handler '" + profileHandlers[component].component + "' already registered as profile handler");
            return false;
        }
        console.log("$mmUserDelegateProvider: Registered component '" + component + "' as profile handler.");
        profileHandlers[component] = {
            component: component,
            handler: handler,
            instance: undefined,
            priority: typeof priority === 'undefined' ? 100 : priority
        };
        return true;
    };
    self.$get = ["$q", "$log", "$mmSite", "$mmUtil", function($q, $log, $mmSite, $mmUtil) {
        var enabledProfileHandlers = {},
            self = {};
        $log = $log.getInstance('$mmUserDelegate');
                self.getProfileHandlersFor = function(user, courseId) {
            var handlers = [],
                promises = [];
            angular.forEach(enabledProfileHandlers, function(handler) {
                var promise = $q.when(handler.instance.isEnabledForUser(user, courseId)).then(function(enabled) {
                    if (enabled) {
                        handlers.push({
                            controller: handler.instance.getController(user, courseId),
                            priority: handler.priority
                        });
                    } else {
                        return $q.reject();
                    }
                }).catch(function() {
                });
                promises.push(promise);
            });
            return $q.all(promises).then(function() {
                return handlers;
            }).catch(function() {
                return handlers;
            });
        };
                self.updateProfileHandler = function(component, handlerInfo) {
            var promise;
            if (typeof handlerInfo.instance === 'undefined') {
                handlerInfo.instance = $mmUtil.resolveObject(handlerInfo.handler, true);
            }
            if (!$mmSite.isLoggedIn()) {
                promise = $q.reject();
            } else {
                promise = $q.when(handlerInfo.instance.isEnabled());
            }
            return promise.then(function(enabled) {
                if (enabled) {
                    enabledProfileHandlers[component] = {
                        instance: handlerInfo.instance,
                        priority: handlerInfo.priority
                    };
                } else {
                    return $q.reject();
                }
            }).catch(function() {
                delete enabledProfileHandlers[component];
            });
        };
                self.updateProfileHandlers = function() {
            var promises = [];
            $log.debug('Updating profile handlers for current site.');
            angular.forEach(profileHandlers, function(handlerInfo, component) {
                promises.push(self.updateProfileHandler(component, handlerInfo));
            });
            return $q.all(promises).then(function() {
                return true;
            }, function() {
                return true;
            });
        };
        return self;
    }];
    return self;
});

angular.module('mm.core.user')
.factory('$mmUserHandlers', ["$mmUtil", "$mmContentLinksHelper", function($mmUtil, $mmContentLinksHelper) {
    var self = {};
        self.linksHandler = function() {
        var self = {};
                self.getActions = function(siteIds, url) {
            if (url.indexOf('grade/report/user') == -1 &&
                    (url.indexOf('/user/view.php') > -1 || url.indexOf('/user/profile.php') > -1)) {
                var params = $mmUtil.extractUrlParams(url);
                if (typeof params.id != 'undefined') {
                    return [{
                        message: 'mm.core.view',
                        icon: 'ion-eye',
                        sites: siteIds,
                        action: function(siteId) {
                            var stateParams = {
                                courseid: params.course,
                                userid: parseInt(params.id, 10)
                            };
                            $mmContentLinksHelper.goInSite('site.mm_user-profile', stateParams, siteId);
                        }
                    }];
                }
            }
            return [];
        };
                self.handles = function(url) {
            var patterns = ['/user/view.php', '/user/profile.php'];
            if (url.indexOf('grade/report/user') == -1) {
                for (var i = 0; i < patterns.length; i++) {
                    var position = url.indexOf(patterns[i]);
                    if (position > -1) {
                        return url.substr(0, position);
                    }
                }
            }
        };
        return self;
    };
    return self;
}]);

angular.module('mm.core.user')
.constant('mmCoreUsersStore', 'users')
.config(["$mmSitesFactoryProvider", "mmCoreUsersStore", function($mmSitesFactoryProvider, mmCoreUsersStore) {
    var stores = [
        {
            name: mmCoreUsersStore,
            keyPath: 'id'
        }
    ];
    $mmSitesFactoryProvider.registerStores(stores);
}])
.factory('$mmUser', ["$log", "$q", "$mmSite", "$mmUtil", "$translate", "mmCoreUsersStore", function($log, $q, $mmSite, $mmUtil, $translate, mmCoreUsersStore) {
    $log = $log.getInstance('$mmUser');
    var self = {};
        self.deleteStoredUser = function(id) {
        if (!$mmSite.isLoggedIn()) {
            return $q.reject();
        }
        self.invalidateUserCache(id);
        return $mmSite.getDb().remove(mmCoreUsersStore, parseInt(id));
    };
        self.formatAddress = function(address, city, country) {
        if (address) {
            address += city ? ', ' + city : '';
            address += country ? ', ' + country : '';
        }
        return address;
    };
        self.formatRoleList = function(roles) {
        var deferred = $q.defer();
        if (roles && roles.length > 0) {
            $translate('mm.core.elementseparator').then(function(separator) {
                var rolekeys = roles.map(function(el) {
                    return 'mm.user.'+el.shortname;
                });
                $translate(rolekeys).then(function(roleNames) {
                    var roles = '';
                    for (var roleKey in roleNames) {
                        var roleName = roleNames[roleKey];
                        if (roleName.indexOf('mm.user.') > -1) {
                            roleName = roleName.replace('mm.user.', '');
                        }
                        roles += (roles != '' ? separator + " ": '') + roleName;
                    }
                    deferred.resolve(roles);
                });
            });
        } else {
            deferred.resolve('');
        }
        return deferred.promise;
    };
        self.getProfile = function(userid, courseid, forceLocal) {
        var deferred = $q.defer();
        if (forceLocal) {
            self.getUserFromLocal(userid).then(deferred.resolve, function() {
                self.getUserFromWS(userid, courseid).then(deferred.resolve, deferred.reject);
            });
        } else {
            self.getUserFromWS(userid, courseid).then(deferred.resolve, function() {
                self.getUserFromLocal(userid).then(deferred.resolve, deferred.reject);
            });
        }
        return deferred.promise;
    };
        function getUserCacheKey(userid) {
        return 'mmUser:data:'+userid;
    }
        self.getUserFromLocal = function(id) {
        if (!$mmSite.isLoggedIn()) {
            return $q.reject();
        }
        return $mmSite.getDb().get(mmCoreUsersStore, parseInt(id));
    };
        self.getUserFromWS = function(userid, courseid) {
        var wsName,
            data,
            preSets ={
                cacheKey: getUserCacheKey(userid)
            };
        if (courseid > 1) {
            $log.debug('Get participant with ID ' + userid + ' in course '+courseid);
            wsName = 'core_user_get_course_user_profiles';
            data = {
                "userlist[0][userid]": userid,
                "userlist[0][courseid]": courseid
            };
        } else {
            $log.debug('Get user with ID ' + userid);
            if ($mmSite.wsAvailable('core_user_get_users_by_field')) {
                wsName = 'core_user_get_users_by_field';
                data = {
                    'field': 'id',
                    'values[0]': userid
                };
            } else {
                wsName = 'core_user_get_users_by_id';
                data = {
                    'userids[0]': userid
                };
            }
        }
        return $mmSite.read(wsName, data, preSets).then(function(users) {
            if (users.length == 0) {
                return $q.reject();
            }
            var user = users.shift();
            if (user.country) {
                user.country = $mmUtil.getCountryName(user.country);
            }
            self.storeUser(user.id, user.fullname, user.profileimageurl);
            return user;
        });
    };
        self.invalidateUserCache = function(userid) {
        return $mmSite.invalidateWsCacheForKey(getUserCacheKey(userid));
    };
        self.storeUser = function(id, fullname, avatar) {
        if (!$mmSite.isLoggedIn()) {
            return $q.reject();
        }
        return $mmSite.getDb().insert(mmCoreUsersStore, {
            id: parseInt(id),
            fullname: fullname,
            profileimageurl: avatar
        });
    };
        self.storeUsers = function(users) {
        var promises = [];
        angular.forEach(users, function(user) {
            var userid = user.id || user.userid,
                img = user.profileimageurl || user.profileimgurl;
            if (typeof userid != 'undefined') {
                promises.push(self.storeUser(userid, user.fullname, img));
            }
        });
        return $q.all(promises);
    };
    return self;
}]);

angular.module('mm.addons.calendar', [])
.constant('mmaCalendarDaysInterval', 30)
.constant('mmaCalendarDefaultNotifTime', 60)
.constant('mmaCalendarComponent', 'mmaCalendarEvents')
.constant('mmaCalendarPriority', 400)
.config(["$stateProvider", "$mmSideMenuDelegateProvider", "mmaCalendarPriority", function($stateProvider, $mmSideMenuDelegateProvider, mmaCalendarPriority) {
    $stateProvider
        .state('site.calendar', {
            url: '/calendar',
            views: {
                'site': {
                    controller: 'mmaCalendarListCtrl',
                    templateUrl: 'addons/calendar/templates/list.html'
                }
            },
            params: {
                eventid: null,
                clear: false
            }
        })
        .state('site.calendar-event', {
            url: '/calendar-event/:id',
            views: {
                'site': {
                    controller: 'mmaCalendarEventCtrl',
                    templateUrl: 'addons/calendar/templates/event.html'
                }
            }
        });
    $mmSideMenuDelegateProvider.registerNavHandler('mmaCalendar', '$mmaCalendarHandlers.sideMenuNav', mmaCalendarPriority);
}])
.run(["$mmaCalendar", "$mmLocalNotifications", "$state", "$ionicPlatform", "$mmApp", "mmaCalendarComponent", function($mmaCalendar, $mmLocalNotifications, $state, $ionicPlatform, $mmApp, mmaCalendarComponent) {
    $mmLocalNotifications.registerClick(mmaCalendarComponent, function(data) {
        if (data.eventid) {
            $mmApp.ready().then(function() {
                $state.go('redirect', {siteid: data.siteid, state: 'site.calendar', params: {eventid: data.eventid}});
            });
        }
    });
    $ionicPlatform.ready(function() {
        $mmaCalendar.scheduleAllSitesEventsNotifications();
    });
}]);

angular.module('mm.addons.coursecompletion', [])
.constant('mmaCourseCompletionPriority', 200)
.constant('mmaCourseCompletionViewCompletionPriority', 200)
.config(["$stateProvider", "$mmUserDelegateProvider", "$mmCoursesDelegateProvider", "mmaCourseCompletionPriority", "mmaCourseCompletionViewCompletionPriority", function($stateProvider, $mmUserDelegateProvider, $mmCoursesDelegateProvider, mmaCourseCompletionPriority,
            mmaCourseCompletionViewCompletionPriority) {
    $stateProvider
    .state('site.course-completion', {
        url: '/course-completion',
        views: {
            'site': {
                templateUrl: 'addons/coursecompletion/templates/report.html',
                controller: 'mmaCourseCompletionReportCtrl'
            }
        },
        params: {
            course: null,
            userid: null
        }
    });
    $mmUserDelegateProvider.registerProfileHandler('mmaCourseCompletion:viewCompletion',
            '$mmaCourseCompletionHandlers.viewCompletion', mmaCourseCompletionViewCompletionPriority);
    $mmCoursesDelegateProvider.registerNavHandler('mmaCourseCompletion',
            '$mmaCourseCompletionHandlers.coursesNav', mmaCourseCompletionPriority);
}]);

angular.module('mm.addons.files', ['mm.core'])
.constant('mmaFilesUploadStateName', 'site.files-upload')
.constant('mmaFilesSharedFilesStore', 'shared_files')
.constant('mmaFilesMyComponent', 'mmaFilesMy')
.constant('mmaFilesSiteComponent', 'mmaFilesSite')
.constant('mmaFilesPriority', 200)
.config(["$stateProvider", "$mmSideMenuDelegateProvider", "mmaFilesUploadStateName", "mmaFilesPriority", function($stateProvider, $mmSideMenuDelegateProvider, mmaFilesUploadStateName, mmaFilesPriority) {
    $stateProvider
        .state('site.files', {
            url: '/files',
            views: {
                'site': {
                    controller: 'mmaFilesIndexController',
                    templateUrl: 'addons/files/templates/index.html'
                }
            }
        })
        .state('site.files-list', {
            url: '/list',
            params: {
                path: false,
                root: false,
                title: false
            },
            views: {
                'site': {
                    controller: 'mmaFilesListController',
                    templateUrl: 'addons/files/templates/list.html'
                }
            }
        })
        .state(mmaFilesUploadStateName, {
            url: '/upload',
            params: {
                path: false,
                root: false
            },
            views: {
                'site': {
                    controller: 'mmaFilesUploadCtrl',
                    templateUrl: 'addons/files/templates/upload.html'
                }
            }
        })
        .state('site.files-choose-site', {
            url: '/choose-site',
            params: {
                file: null
            },
            views: {
                'site': {
                    controller: 'mmaFilesChooseSiteCtrl',
                    templateUrl: 'addons/files/templates/choosesite.html'
                }
            }
        });
    $mmSideMenuDelegateProvider.registerNavHandler('mmaFiles', '$mmaFilesHandlers.sideMenuNav', mmaFilesPriority);
}])
.run(["$mmaFiles", "$state", "$mmSitesManager", "$mmUtil", "$mmaFilesHelper", "$ionicPlatform", "$mmApp", function($mmaFiles, $state, $mmSitesManager, $mmUtil, $mmaFilesHelper, $ionicPlatform, $mmApp) {
    if (ionic.Platform.isIOS()) {
        function searchToUpload() {
            $mmApp.ready().then(function() {
                $mmaFiles.checkIOSNewFiles().then(function(fileEntry) {
                    $mmSitesManager.getSites().then(function(sites) {
                        if (sites.length == 0) {
                            $mmUtil.showErrorModal('mma.files.errorreceivefilenosites', true);
                        } else if (sites.length == 1) {
                            $mmaFilesHelper.showConfirmAndUploadInSite(fileEntry, sites[0].id);
                        } else {
                            $state.go('site.files-choose-site', {file: fileEntry});
                        }
                    });
                });
            });
        }
        $ionicPlatform.on('resume', searchToUpload);
        searchToUpload();
    }
}]);

angular.module('mm.addons.frontpage', [])
.constant('mmaFrontpagePriority', 1000)
.config(["$mmSideMenuDelegateProvider", "mmaFrontpagePriority", function($mmSideMenuDelegateProvider, mmaFrontpagePriority) {
    $mmSideMenuDelegateProvider.registerNavHandler('mmaFrontpage', '$mmaFrontPageHandlers.sideMenuNav', mmaFrontpagePriority);
}]);

angular.module('mm.addons.grades', [])
.constant('mmaGradesPriority', 400)
.constant('mmaGradesViewGradesPriority', 400)
.config(["$stateProvider", "$mmUserDelegateProvider", "$mmCoursesDelegateProvider", "$mmContentLinksDelegateProvider", "mmaGradesPriority", "mmaGradesViewGradesPriority", function($stateProvider, $mmUserDelegateProvider, $mmCoursesDelegateProvider, $mmContentLinksDelegateProvider,
            mmaGradesPriority, mmaGradesViewGradesPriority) {
    $stateProvider
    .state('site.grades', {
        url: '/grades',
        views: {
            'site': {
                templateUrl: 'addons/grades/templates/table.html',
                controller: 'mmaGradesTableCtrl'
            }
        },
        params: {
            course: null,
            userid: null
        }
    });
    $mmUserDelegateProvider.registerProfileHandler('mmaGrades:viewGrades', '$mmaGradesHandlers.viewGrades', mmaGradesViewGradesPriority);
    $mmCoursesDelegateProvider.registerNavHandler('mmaGrades', '$mmaGradesHandlers.coursesNav', mmaGradesPriority);
    $mmContentLinksDelegateProvider.registerLinkHandler('mmaGrades', '$mmaGradesHandlers.linksHandler');
}]);

angular.module('mm.addons.messages', ['mm.core'])
.constant('mmaMessagesDiscussionLoadedEvent', 'mma_messages_discussion_loaded')
.constant('mmaMessagesDiscussionLeftEvent', 'mma_messages_discussion_left')
.constant('mmaMessagesPollInterval', 5000)
.constant('mmaMessagesPriority', 600)
.constant('mmaMessagesSendMessagePriority', 1000)
.constant('mmaMessagesAddContactPriority', 800)
.constant('mmaMessagesBlockContactPriority', 600)
.constant('mmaMessagesNewMessageEvent', 'mma-messages_new_message')
.config(["$stateProvider", "$mmUserDelegateProvider", "$mmSideMenuDelegateProvider", "mmaMessagesSendMessagePriority", "mmaMessagesAddContactPriority", "mmaMessagesBlockContactPriority", "mmaMessagesPriority", "$mmContentLinksDelegateProvider", function($stateProvider, $mmUserDelegateProvider, $mmSideMenuDelegateProvider, mmaMessagesSendMessagePriority,
            mmaMessagesAddContactPriority, mmaMessagesBlockContactPriority, mmaMessagesPriority, $mmContentLinksDelegateProvider) {
    $stateProvider
    .state('site.messages', {
        url: '/messages',
        views: {
            'site': {
                templateUrl: 'addons/messages/templates/index.html',
                controller: 'mmaMessagesIndexCtrl'
            }
        }
    })
    .state('site.messages-discussion', {
        url: '/messages-discussion',
        params: {
            userId: null
        },
        views: {
            'site': {
                templateUrl: 'addons/messages/templates/discussion.html',
                controller: 'mmaMessagesDiscussionCtrl'
            }
        }
    });
    $mmSideMenuDelegateProvider.registerNavHandler('mmaMessages', '$mmaMessagesHandlers.sideMenuNav', mmaMessagesPriority);
    $mmUserDelegateProvider.registerProfileHandler('mmaMessages:sendMessage', '$mmaMessagesHandlers.sendMessage', mmaMessagesSendMessagePriority);
    $mmUserDelegateProvider.registerProfileHandler('mmaMessages:addContact', '$mmaMessagesHandlers.addContact', mmaMessagesAddContactPriority);
    $mmUserDelegateProvider.registerProfileHandler('mmaMessages:blockContact', '$mmaMessagesHandlers.blockContact', mmaMessagesBlockContactPriority);
    $mmContentLinksDelegateProvider.registerLinkHandler('mmaMessages', '$mmaMessagesHandlers.linksHandler');
}])
.run(["$mmaMessages", "$mmEvents", "$state", "$mmAddonManager", "$mmUtil", "mmCoreEventLogin", function($mmaMessages, $mmEvents, $state, $mmAddonManager, $mmUtil, mmCoreEventLogin) {
    $mmEvents.on(mmCoreEventLogin, function() {
        $mmaMessages.invalidateEnabledCache();
    });
    var $mmPushNotificationsDelegate = $mmAddonManager.get('$mmPushNotificationsDelegate');
    if ($mmPushNotificationsDelegate) {
        $mmPushNotificationsDelegate.registerHandler('mmaMessages', function(notification) {
            if ($mmUtil.isFalseOrZero(notification.notif)) {
                $mmaMessages.isMessagingEnabledForSite(notification.site).then(function() {
                    $mmaMessages.invalidateDiscussionsCache().finally(function() {
                        $state.go('redirect', {siteid: notification.site, state: 'site.messages'});
                    });
                });
                return true;
            }
        });
    }
}]);

angular.module('mm.addons.mod_assign', ['mm.core'])
.constant('mmaModAssignComponent', 'mmaModAssign')
.constant('mmaModAssignSubmissionComponent', 'mmaModAssignSubmission')
.config(["$stateProvider", function($stateProvider) {
    $stateProvider
    .state('site.mod_assign', {
        url: '/mod_assign',
        params: {
            module: null,
            courseid: null
        },
        views: {
            'site': {
                controller: 'mmaModAssignIndexCtrl',
                templateUrl: 'addons/mod_assign/templates/index.html'
            }
        }
    })
    .state('site.mod_assign-submission', {
        url: '/mod_assign-submission',
        params: {
            submission: null
        },
        views: {
            'site': {
                controller: 'mmaModAssignSubmissionCtrl',
                templateUrl: 'addons/mod_assign/templates/submission.html'
            }
        }
    });
}])
.config(["$mmCourseDelegateProvider", "$mmContentLinksDelegateProvider", function($mmCourseDelegateProvider, $mmContentLinksDelegateProvider) {
    $mmCourseDelegateProvider.registerContentHandler('mmaModAssign', 'assign', '$mmaModAssignHandlers.courseContent');
    $mmContentLinksDelegateProvider.registerLinkHandler('mmaModAssign', '$mmaModAssignHandlers.linksHandler');
}]);

angular.module('mm.addons.mod_book', ['mm.core'])
.constant('mmaModBookComponent', 'mmaModBook')
.config(["$stateProvider", function($stateProvider) {
    $stateProvider
    .state('site.mod_book', {
      url: '/mod_book',
      params: {
        module: null,
        courseid: null
      },
      views: {
        'site': {
          controller: 'mmaModBookIndexCtrl',
          templateUrl: 'addons/mod_book/templates/index.html'
        }
      }
    });
}])
.config(["$mmCourseDelegateProvider", "$mmCoursePrefetchDelegateProvider", "$mmContentLinksDelegateProvider", function($mmCourseDelegateProvider, $mmCoursePrefetchDelegateProvider, $mmContentLinksDelegateProvider) {
    $mmCourseDelegateProvider.registerContentHandler('mmaModBook', 'book', '$mmaModBookHandlers.courseContentHandler');
    $mmCoursePrefetchDelegateProvider.registerPrefetchHandler('mmaModBook', 'book', '$mmaModBookPrefetchHandler');
    $mmContentLinksDelegateProvider.registerLinkHandler('mmaModBook', '$mmaModBookHandlers.linksHandler');
}]);

angular.module('mm.addons.mod_chat', [])
.constant('mmaChatPollInterval', 4000)
.config(["$stateProvider", function($stateProvider) {
    $stateProvider
    .state('site.mod_chat', {
        url: '/mod_chat',
        params: {
            module: null,
            courseid: null
        },
        views: {
            'site': {
                controller: 'mmaModChatIndexCtrl',
                templateUrl: 'addons/mod_chat/templates/index.html'
            }
        }
    })
    .state('site.mod_chat-chat', {
        url: '/mod_chat-chat',
        params: {
            chatid: null,
            courseid: null,
            title: null
        },
        views: {
            'site': {
                controller: 'mmaModChatChatCtrl',
                templateUrl: 'addons/mod_chat/templates/chat.html'
            }
        }
    });
}])
.config(["$mmCourseDelegateProvider", "$mmContentLinksDelegateProvider", function($mmCourseDelegateProvider, $mmContentLinksDelegateProvider) {
    $mmCourseDelegateProvider.registerContentHandler('mmaModChat', 'chat', '$mmaModChatHandlers.courseContent');
    $mmContentLinksDelegateProvider.registerLinkHandler('mmaModChat', '$mmaModChatHandlers.linksHandler');
}]);
angular.module('mm.addons.mod_choice', [])
.constant('mmaModChoiceResultsNot', 0)
.constant('mmaModChoiceResultsAfterAnswer', 1)
.constant('mmaModChoiceResultsAfterClose', 2)
.constant('mmaModChoiceResultsAlways', 3)
.config(["$stateProvider", function($stateProvider) {
    $stateProvider
    .state('site.mod_choice', {
        url: '/mod_choice',
        params: {
            module: null,
            courseid: null
        },
        views: {
            'site': {
                controller: 'mmaModChoiceIndexCtrl',
                templateUrl: 'addons/mod_choice/templates/index.html'
            }
        }
    });
}])
.config(["$mmCourseDelegateProvider", "$mmContentLinksDelegateProvider", function($mmCourseDelegateProvider, $mmContentLinksDelegateProvider) {
    $mmCourseDelegateProvider.registerContentHandler('mmaModChoice', 'choice', '$mmaModChoiceHandlers.courseContent');
    $mmContentLinksDelegateProvider.registerLinkHandler('mmaModChoice', '$mmaModChoiceHandlers.linksHandler');
}]);

angular.module('mm.addons.mod_folder', ['mm.core'])
.constant('mmaModFolderComponent', 'mmaModFolder')
.config(["$stateProvider", function($stateProvider) {
    $stateProvider
    .state('site.mod_folder', {
      url: '/mod_folder',
      params: {
        module: null,
        courseid: null,
        sectionid: null,
        path: null
      },
      views: {
        'site': {
          controller: 'mmaModFolderIndexCtrl',
          templateUrl: 'addons/mod_folder/templates/index.html'
        }
      }
    });
}])
.config(["$mmCourseDelegateProvider", "$mmCoursePrefetchDelegateProvider", "$mmContentLinksDelegateProvider", function($mmCourseDelegateProvider, $mmCoursePrefetchDelegateProvider, $mmContentLinksDelegateProvider) {
    $mmCourseDelegateProvider.registerContentHandler('mmaModFolder', 'folder', '$mmaModFolderHandlers.courseContent');
    $mmCoursePrefetchDelegateProvider.registerPrefetchHandler('mmaModFolder', 'folder', '$mmaModFolderPrefetchHandler');
    $mmContentLinksDelegateProvider.registerLinkHandler('mmaModFolder', '$mmaModFolderHandlers.linksHandler');
}]);

angular.module('mm.addons.mod_forum', [])
.constant('mmaModForumDiscPerPage', 10)
.constant('mmaModForumComponent', 'mmaModForum')
.constant('mmaModForumNewDiscussionEvent', 'mma-mod_forum_new_discussion')
.config(["$stateProvider", function($stateProvider) {
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
                templateUrl: 'addons/mod_forum/templates/discussions.html'
            }
        }
    })
    .state('site.mod_forum-discussion', {
        url: '/mod_forum-discussion',
        params: {
            discussionid: null,
            cid: null
        },
        views: {
            'site': {
                controller: 'mmaModForumDiscussionCtrl',
                templateUrl: 'addons/mod_forum/templates/discussion.html'
            }
        }
    })
    .state('site.mod_forum-newdiscussion', {
        url: '/mod_forum-newdiscussion',
        params: {
            cid: null,
            forumid: null,
            cmid: null
        },
        views: {
            'site': {
                controller: 'mmaModForumNewDiscussionCtrl',
                templateUrl: 'addons/mod_forum/templates/newdiscussion.html'
            }
        }
    });
}])
.config(["$mmCourseDelegateProvider", "$mmContentLinksDelegateProvider", function($mmCourseDelegateProvider, $mmContentLinksDelegateProvider) {
    $mmCourseDelegateProvider.registerContentHandler('mmaModForum', 'forum', '$mmaModForumHandlers.courseContent');
    $mmContentLinksDelegateProvider.registerLinkHandler('mmaModForum', '$mmaModForumHandlers.linksHandler');
}]);

angular.module('mm.addons.mod_glossary', ['mm.core'])
.config(["$stateProvider", function($stateProvider) {
    $stateProvider
    .state('site.mod_glossary', {
      url: '/mod_glossary',
      params: {
        module: null,
        courseid: null
      },
      views: {
        'site': {
          controller: 'mmaModGlossaryIndexCtrl',
          templateUrl: 'addons/mod_glossary/templates/index.html'
        }
      }
    })
    .state('site.mod_glossary-entry', {
      url: '/mod_glossary-entry',
      params: {
        cid: null,
        entry: null,
        entryid: null
      },
      views: {
        'site': {
          controller: 'mmaModGlossaryEntryCtrl',
          templateUrl: 'addons/mod_glossary/templates/entry.html'
        }
      }
    });
}])
.config(["$mmCourseDelegateProvider", "$mmContentLinksDelegateProvider", function($mmCourseDelegateProvider, $mmContentLinksDelegateProvider) {
    $mmCourseDelegateProvider.registerContentHandler('mmaModGlossary', 'glossary', '$mmaModGlossaryHandlers.courseContent');
    $mmContentLinksDelegateProvider.registerLinkHandler('mmaModGlossary', '$mmaModGlossaryHandlers.linksHandler');
}]);

angular.module('mm.addons.mod_imscp', ['mm.core'])
.constant('mmaModImscpComponent', 'mmaModImscp')
.config(["$stateProvider", function($stateProvider) {
    $stateProvider
    .state('site.mod_imscp', {
      url: '/mod_imscp',
      params: {
        module: null,
        courseid: null
      },
      views: {
        'site': {
          controller: 'mmaModImscpIndexCtrl',
          templateUrl: 'addons/mod_imscp/templates/index.html'
        }
      }
    });
}])
.config(["$mmCourseDelegateProvider", "$mmCoursePrefetchDelegateProvider", "$mmContentLinksDelegateProvider", function($mmCourseDelegateProvider, $mmCoursePrefetchDelegateProvider, $mmContentLinksDelegateProvider) {
    $mmCourseDelegateProvider.registerContentHandler('mmaModImscp', 'imscp', '$mmaModImscpHandlers.courseContent');
    $mmCoursePrefetchDelegateProvider.registerPrefetchHandler('mmaModImscp', 'imscp', '$mmaModImscpPrefetchHandler');
    $mmContentLinksDelegateProvider.registerLinkHandler('mmaModImscp', '$mmaModImscpHandlers.linksHandler');
}]);

angular.module('mm.addons.mod_label', ['mm.core'])
.config(["$stateProvider", function($stateProvider) {
    $stateProvider
    .state('site.mod_label', {
        url: '/mod_label',
        params: {
            description: null
        },
        views: {
            'site': {
                templateUrl: 'addons/mod_label/templates/index.html',
                controller: 'mmaModLabelIndexCtrl'
            }
        }
    });
}])
.config(["$mmCourseDelegateProvider", "$mmContentLinksDelegateProvider", function($mmCourseDelegateProvider, $mmContentLinksDelegateProvider) {
    $mmCourseDelegateProvider.registerContentHandler('mmaModLabel', 'label', '$mmaModLabelHandlers.courseContent');
    $mmContentLinksDelegateProvider.registerLinkHandler('mmaModLabel', '$mmaModLabelHandlers.linksHandler');
}]);

angular.module('mm.addons.mod_lti', [])
.constant('mmaModLtiComponent', 'mmaModLti')
.config(["$stateProvider", function($stateProvider) {
    $stateProvider
    .state('site.mod_lti', {
        url: '/mod_lti',
        params: {
            module: null,
            courseid: null
        },
        views: {
            'site': {
                controller: 'mmaModLtiIndexCtrl',
                templateUrl: 'addons/mod_lti/templates/index.html'
            }
        }
    });
}])
.config(["$mmCourseDelegateProvider", "$mmContentLinksDelegateProvider", function($mmCourseDelegateProvider, $mmContentLinksDelegateProvider) {
    $mmCourseDelegateProvider.registerContentHandler('mmaModLti', 'lti', '$mmaModLtiHandlers.courseContent');
    $mmContentLinksDelegateProvider.registerLinkHandler('mmaModLti', '$mmaModLtiHandlers.linksHandler');
}]);

angular.module('mm.addons.mod_page', ['mm.core'])
.constant('mmaModPageComponent', 'mmaModPage')
.config(["$stateProvider", function($stateProvider) {
    $stateProvider
    .state('site.mod_page', {
      url: '/mod_page',
      params: {
        module: null,
        courseid: null
      },
      views: {
        'site': {
          controller: 'mmaModPageIndexCtrl',
          templateUrl: 'addons/mod_page/templates/index.html'
        }
      }
    });
}])
.config(["$mmCourseDelegateProvider", "$mmCoursePrefetchDelegateProvider", "$mmContentLinksDelegateProvider", function($mmCourseDelegateProvider, $mmCoursePrefetchDelegateProvider, $mmContentLinksDelegateProvider) {
    $mmCourseDelegateProvider.registerContentHandler('mmaModPage', 'page', '$mmaModPageHandlers.courseContent');
    $mmCoursePrefetchDelegateProvider.registerPrefetchHandler('mmaModPage', 'page', '$mmaModPagePrefetchHandler');
    $mmContentLinksDelegateProvider.registerLinkHandler('mmaModPage', '$mmaModPageHandlers.linksHandler');
}]);

angular.module('mm.addons.mod_resource', ['mm.core'])
.constant('mmaModResourceComponent', 'mmaModResource')
.config(["$stateProvider", function($stateProvider) {
    $stateProvider
    .state('site.mod_resource', {
      url: '/mod_resource',
      params: {
        module: null,
        courseid: null
      },
      views: {
        'site': {
          controller: 'mmaModResourceIndexCtrl',
          templateUrl: 'addons/mod_resource/templates/index.html'
        }
      }
    });
}])
.config(["$mmCourseDelegateProvider", "$mmCoursePrefetchDelegateProvider", "$mmContentLinksDelegateProvider", function($mmCourseDelegateProvider, $mmCoursePrefetchDelegateProvider, $mmContentLinksDelegateProvider) {
    $mmCourseDelegateProvider.registerContentHandler('mmaModResource', 'resource', '$mmaModResourceHandlers.courseContent');
    $mmCoursePrefetchDelegateProvider.registerPrefetchHandler('mmaModResource', 'resource', '$mmaModResourcePrefetchHandler');
    $mmContentLinksDelegateProvider.registerLinkHandler('mmaModResource', '$mmaModResourceHandlers.linksHandler');
}]);

angular.module('mm.addons.mod_scorm', ['mm.core'])
.constant('mmaModScormComponent', 'mmaModScorm')
.constant('mmaModScormEventLaunchNextSco', 'mma_mod_scorm_launch_next_sco')
.constant('mmaModScormEventLaunchPrevSco', 'mma_mod_scorm_launch_prev_sco')
.constant('mmaModScormEventUpdateToc', 'mma_mod_scorm_update_toc')
.constant('mmaModScormEventGoOffline', 'mma_mod_scorm_go_offline')
.constant('mmaModScormEventAutomSynced', 'mma_mod_scorm_autom_synced')
.constant('mmaModScormSyncTime', 200000)
.config(["$stateProvider", function($stateProvider) {
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
          templateUrl: 'addons/mod_scorm/templates/index.html'
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
          templateUrl: 'addons/mod_scorm/templates/player.html'
        }
      }
    });
}])
.config(["$mmCourseDelegateProvider", "$mmCoursePrefetchDelegateProvider", "$mmContentLinksDelegateProvider", function($mmCourseDelegateProvider, $mmCoursePrefetchDelegateProvider, $mmContentLinksDelegateProvider) {
    $mmCourseDelegateProvider.registerContentHandler('mmaModScorm', 'scorm', '$mmaModScormHandlers.courseContent');
    $mmCoursePrefetchDelegateProvider.registerPrefetchHandler('mmaModScorm', 'scorm', '$mmaModScormPrefetchHandler');
    $mmContentLinksDelegateProvider.registerLinkHandler('mmaModScorm', '$mmaModScormHandlers.linksHandler');
}])
.run(["$timeout", "$mmaModScormSync", "$mmApp", "$mmEvents", "$mmSite", "mmCoreEventLogin", function($timeout, $mmaModScormSync, $mmApp, $mmEvents, $mmSite, mmCoreEventLogin) {
    var lastExecution = 0,
        executing = false,
        allSitesCalled = false;
    function syncScorms(allSites) {
        var now = new Date().getTime();
        if (!allSites && !$mmSite.isLoggedIn()) {
            return;
        }
        if (now - 5000 > lastExecution && (!executing || now - 300000 > lastExecution)) {
            lastExecution = new Date().getTime();
            executing = true;
            $timeout(function() {
                $mmaModScormSync.syncAllScorms(allSites ? undefined : $mmSite.getId()).finally(function() {
                    executing = false;
                });
            }, 1000);
        }
    }
    $mmApp.ready().then(function() {
        document.addEventListener('online', function() {
            syncScorms(false);
        }, false);
        window.addEventListener('online', function() {
            syncScorms(false);
        }, false);
        if (!$mmSite.isLoggedIn()) {
            allSitesCalled = true;
            if ($mmApp.isOnline()) {
                syncScorms(true);
            }
        }
    });
    $mmEvents.on(mmCoreEventLogin, function() {
        var allSites = false;
        if (!allSitesCalled) {
            allSitesCalled = true;
            allSites = true;
        }
        if ($mmApp.isOnline()) {
            syncScorms(allSites);
        }
    });
}]);

angular.module('mm.addons.mod_survey', [])
.config(["$stateProvider", function($stateProvider) {
    $stateProvider
    .state('site.mod_survey', {
        url: '/mod_survey',
        params: {
            module: null,
            courseid: null
        },
        views: {
            'site': {
                controller: 'mmaModSurveyIndexCtrl',
                templateUrl: 'addons/mod_survey/templates/index.html'
            }
        }
    });
}])
.config(["$mmCourseDelegateProvider", "$mmContentLinksDelegateProvider", function($mmCourseDelegateProvider, $mmContentLinksDelegateProvider) {
    $mmCourseDelegateProvider.registerContentHandler('mmaModSurvey', 'survey', '$mmaModSurveyHandlers.courseContent');
    $mmContentLinksDelegateProvider.registerLinkHandler('mmaModSurvey', '$mmaModSurveyHandlers.linksHandler');
}]);

angular.module('mm.addons.mod_url', ['mm.core'])
.config(["$stateProvider", function($stateProvider) {
    $stateProvider
    .state('site.mod_url', {
      url: '/mod_url',
      params: {
        module: null,
        courseid: null
      },
      views: {
        'site': {
          controller: 'mmaModUrlIndexCtrl',
          templateUrl: 'addons/mod_url/templates/index.html'
        }
      }
    });
}])
.config(["$mmCourseDelegateProvider", "$mmContentLinksDelegateProvider", function($mmCourseDelegateProvider, $mmContentLinksDelegateProvider) {
    $mmCourseDelegateProvider.registerContentHandler('mmaModUrl', 'url', '$mmaModUrlHandlers.courseContentHandler');
    $mmContentLinksDelegateProvider.registerLinkHandler('mmaModUrl', '$mmaModUrlHandlers.linksHandler');
}]);

angular.module('mm.addons.mod_wiki', [])
.constant('mmaModWikiSubwikiPagesLoaded', 'mma_mod_wiki_subwiki_pages_loaded')
.constant('mmaModWikiComponent', 'mmaModWiki')
.config(["$stateProvider", function($stateProvider) {
    $stateProvider
    .state('site.mod_wiki', {
        url: '/mod_wiki',
        params: {
            module: null,
            moduleid: null,
            courseid: null,
            pageid: null,
            pagetitle: null,
            wikiid: null,
            subwikiid: null,
            action: null
        },
        views: {
            'site': {
                controller: 'mmaModWikiIndexCtrl',
                templateUrl: 'addons/mod_wiki/templates/index.html'
            }
        }
    });
}])
.config(["$mmCourseDelegateProvider", "$mmContentLinksDelegateProvider", "$mmCoursePrefetchDelegateProvider", function($mmCourseDelegateProvider, $mmContentLinksDelegateProvider, $mmCoursePrefetchDelegateProvider) {
    $mmCourseDelegateProvider.registerContentHandler('mmaModWiki', 'wiki', '$mmaModWikiHandlers.courseContent');
    $mmContentLinksDelegateProvider.registerLinkHandler('mmaModWiki', '$mmaModWikiHandlers.linksHandler');
    $mmCoursePrefetchDelegateProvider.registerPrefetchHandler('mmaModWiki', 'wiki', '$mmaModWikiPrefetchHandler');
}])
.run(["$mmEvents", "mmCoreEventLogout", "$mmaModWiki", function($mmEvents, mmCoreEventLogout, $mmaModWiki) {
    $mmEvents.on(mmCoreEventLogout, $mmaModWiki.clearSubwikiList);
}]);
angular.module('mm.addons.notes', [])
.constant('mmaNotesPriority', 200)
.constant('mmaNotesAddNotePriority', 200)
.config(["$stateProvider", "$mmUserDelegateProvider", "$mmCoursesDelegateProvider", "mmaNotesPriority", "mmaNotesAddNotePriority", function($stateProvider, $mmUserDelegateProvider, $mmCoursesDelegateProvider, mmaNotesPriority, mmaNotesAddNotePriority) {
    $stateProvider
    .state('site.notes-types', {
        url: '/notes-types',
        views: {
            'site': {
                templateUrl: 'addons/notes/templates/types.html',
                controller: 'mmaNotesTypesCtrl'
            }
        },
        params: {
            course: null
        }
    })
    .state('site.notes-list', {
        url: '/notes-list',
        views: {
            'site': {
                templateUrl: 'addons/notes/templates/list.html',
                controller: 'mmaNotesListCtrl'
            }
        },
        params: {
            courseid: null,
            type: null
        }
    });
    $mmUserDelegateProvider.registerProfileHandler('mmaNotes:addNote', '$mmaNotesHandlers.addNote', mmaNotesAddNotePriority);
    $mmCoursesDelegateProvider.registerNavHandler('mmaNotes', '$mmaNotesHandlers.coursesNav', mmaNotesPriority);
}]);

angular.module('mm.addons.notifications', [])
.constant('mmaNotificationsListLimit', 20)
.constant('mmaNotificationsPriority', 800)
.config(["$stateProvider", "$mmSideMenuDelegateProvider", "mmaNotificationsPriority", function($stateProvider, $mmSideMenuDelegateProvider, mmaNotificationsPriority) {
    $stateProvider
    .state('site.notifications', {
        url: '/notifications',
        views: {
            'site': {
                templateUrl: 'addons/notifications/templates/list.html',
                controller: 'mmaNotificationsListCtrl'
            }
        }
    });
    $mmSideMenuDelegateProvider.registerNavHandler('mmaNotifications', '$mmaNotificationsHandlers.sideMenuNav', mmaNotificationsPriority);
}])
.run(["$log", "$mmaNotifications", "$mmUtil", "$state", "$mmAddonManager", function($log, $mmaNotifications, $mmUtil, $state, $mmAddonManager) {
    $log = $log.getInstance('mmaNotifications');
    var $mmPushNotificationsDelegate = $mmAddonManager.get('$mmPushNotificationsDelegate');
    if ($mmPushNotificationsDelegate) {
        $mmPushNotificationsDelegate.registerHandler('mmaNotifications', function(notification) {
            if ($mmUtil.isTrueOrOne(notification.notif)) {
                $mmaNotifications.isPluginEnabledForSite(notification.site).then(function() {
                    $mmaNotifications.invalidateNotificationsList().finally(function() {
                        $state.go('redirect', {siteid: notification.site, state: 'site.notifications'});
                    });
                });
                return true;
            }
        });
    }
}]);

angular.module('mm.addons.participants', [])
.constant('mmaParticipantsListLimit', 50)
.constant('mmaParticipantsPriority', 600)
.config(["$stateProvider", "$mmCoursesDelegateProvider", "$mmContentLinksDelegateProvider", "mmaParticipantsPriority", function($stateProvider, $mmCoursesDelegateProvider, $mmContentLinksDelegateProvider, mmaParticipantsPriority) {
    $stateProvider
        .state('site.participants', {
            url: '/participants',
            views: {
                'site': {
                    controller: 'mmaParticipantsListCtrl',
                    templateUrl: 'addons/participants/templates/list.html'
                }
            },
            params: {
                course: null
            }
        });
    $mmCoursesDelegateProvider.registerNavHandler('mmaParticipants', '$mmaParticipantsHandlers.coursesNavHandler',
                mmaParticipantsPriority);
    $mmContentLinksDelegateProvider.registerLinkHandler('mmaParticipants', '$mmaParticipantsHandlers.linksHandler');
}]);

angular.module('mm.addons.pushnotifications', [])
.constant('mmaPushNotificationsComponent', 'mmaPushNotifications')
.run(["$mmaPushNotifications", "$ionicPlatform", "$rootScope", "$mmEvents", "$mmLocalNotifications", "mmCoreEventLogin", "mmaPushNotificationsComponent", "mmCoreEventSiteDeleted", function($mmaPushNotifications, $ionicPlatform, $rootScope, $mmEvents, $mmLocalNotifications, mmCoreEventLogin,
            mmaPushNotificationsComponent, mmCoreEventSiteDeleted) {
    $ionicPlatform.ready(function() {
        $mmaPushNotifications.registerDevice();
    });
    $rootScope.$on('$cordovaPush:notificationReceived', function(e, notification) {
        if (ionic.Platform.isAndroid()) {
            $mmaPushNotifications.onGCMReceived(notification);
        } else if (ionic.Platform.isIOS()) {
            $mmaPushNotifications.onMessageReceived(notification);
        }
    });
    $mmEvents.on(mmCoreEventLogin, function() {
        $mmaPushNotifications.registerDeviceOnMoodle();
    });
    $mmEvents.on(mmCoreEventSiteDeleted, function(site) {
        $mmaPushNotifications.unregisterDeviceOnMoodle(site);
    });
    $mmLocalNotifications.registerClick(mmaPushNotificationsComponent, $mmaPushNotifications.notificationClicked);
}]);

angular.module('mm.addons.remotestyles', [])
.constant('mmaRemoteStylesComponent', 'mmaRemoteStyles')
.run(["$mmEvents", "mmCoreEventLogin", "mmCoreEventLogout", "mmCoreEventSiteAdded", "mmCoreEventSiteUpdated", "$mmaRemoteStyles", "$mmSite", function($mmEvents, mmCoreEventLogin, mmCoreEventLogout, mmCoreEventSiteAdded, mmCoreEventSiteUpdated, $mmaRemoteStyles,
            $mmSite) {
    $mmEvents.on(mmCoreEventSiteAdded, $mmaRemoteStyles.load);
    $mmEvents.on(mmCoreEventSiteUpdated, function(siteid) {
        if (siteid === $mmSite.getId()) {
            $mmaRemoteStyles.load();
        }
    });
    $mmEvents.on(mmCoreEventLogin, $mmaRemoteStyles.load);
    $mmEvents.on(mmCoreEventLogout, $mmaRemoteStyles.clear);
}]);

angular.module('mm.addons.calendar')
.controller('mmaCalendarEventCtrl', ["$scope", "$log", "$stateParams", "$mmaCalendar", "$mmUtil", "$mmCourse", "$mmCourses", "$mmLocalNotifications", function($scope, $log, $stateParams, $mmaCalendar, $mmUtil, $mmCourse, $mmCourses,
        $mmLocalNotifications) {
    $log = $log.getInstance('mmaCalendarEventCtrl');
    var eventid = parseInt($stateParams.id);
    function fetchEvent(refresh) {
        return $mmaCalendar.getEvent(eventid, refresh).then(function(e) {
            $mmaCalendar.formatEventData(e);
            $scope.event = e;
            $scope.title = e.name;
            if (e.moduleicon) {
                $mmCourse.translateModuleName(e.modulename).then(function(name) {
                    if (name.indexOf('mm.core.mod') === -1) {
                        e.modulename = name;
                    }
                });
            }
            if (e.courseid > 1) {
                $mmCourses.getUserCourse(e.courseid, true).then(function(course) {
                    $scope.coursename = course.fullname;
                });
            }
        }, function(error) {
            if (error) {
                $mmUtil.showErrorModal(error);
            } else {
                $mmUtil.showErrorModal('mma.calendar.errorloadevent', true);
            }
        });
    }
    fetchEvent().finally(function() {
        $scope.eventLoaded = true;
    });
    $scope.refreshEvent = function() {
        fetchEvent(true).finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
    $scope.notificationsEnabled = $mmLocalNotifications.isAvailable();
    if ($scope.notificationsEnabled) {
        $mmaCalendar.getEventNotificationTime(eventid).then(function(notificationtime) {
            $scope.notification = {
                time: String(notificationtime)
            };
        });
        $scope.updateNotificationTime = function() {
            var time = parseInt($scope.notification.time);
            if (!isNaN(time) && $scope.event && $scope.event.id) {
                $mmaCalendar.updateNotificationTime($scope.event, time);
            }
        };
    }
}]);

angular.module('mm.addons.calendar')
.controller('mmaCalendarListCtrl', ["$scope", "$stateParams", "$log", "$state", "$mmaCalendar", "$mmUtil", "$ionicHistory", "mmaCalendarDaysInterval", function($scope, $stateParams, $log, $state, $mmaCalendar, $mmUtil, $ionicHistory,
        mmaCalendarDaysInterval) {
    $log = $log.getInstance('mmaCalendarListCtrl');
    var daysLoaded,
        emptyEventsTimes;
    if ($stateParams.eventid) {
        $ionicHistory.clearHistory();
        $state.go('site.calendar-event', {id: $stateParams.eventid});
    }
    function initVars() {
        daysLoaded = 0;
        emptyEventsTimes = 0;
        $scope.events = [];
    }
    function fetchEvents(refresh) {
        if (refresh) {
            initVars();
        }
        $scope.canLoadMore = false;
        return $mmaCalendar.getEvents(daysLoaded, mmaCalendarDaysInterval, refresh).then(function(events) {
            daysLoaded += mmaCalendarDaysInterval;
            if (events.length === 0) {
                emptyEventsTimes++;
                if (emptyEventsTimes > 5) {
                    $scope.canLoadMore = false;
                    $scope.eventsLoaded = true;
                } else {
                    return fetchEvents();
                }
            } else {
                angular.forEach(events, $mmaCalendar.formatEventData);
                if (refresh) {
                    $scope.events = events;
                } else {
                    $scope.events = $scope.events.concat(events);
                }
                $scope.count = $scope.events.length;
                $scope.eventsLoaded = true;
                $scope.canLoadMore = true;
                $mmaCalendar.scheduleEventsNotifications(events);
            }
        }, function(error) {
            if (error) {
                $mmUtil.showErrorModal(error);
            } else {
                $mmUtil.showErrorModal('mma.calendar.errorloadevents', true);
            }
            $scope.eventsLoaded = true;
        });
    }
    initVars();
    $scope.count = 0;
    fetchEvents();
    $scope.loadMoreEvents = function() {
        fetchEvents().finally(function() {
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };
    $scope.refreshEvents = function() {
        $mmaCalendar.invalidateEventsList().finally(function() {
            fetchEvents(true).finally(function() {
                $scope.$broadcast('scroll.refreshComplete');
            });
        });
    };
}]);

angular.module('mm.addons.calendar')
.constant('mmaCalendarEventsStore', 'calendar_events')
.config(["$mmSitesFactoryProvider", "mmaCalendarEventsStore", function($mmSitesFactoryProvider, mmaCalendarEventsStore) {
    var stores = [
        {
            name: mmaCalendarEventsStore,
            keyPath: 'id',
            indexes: [
                {
                    name: 'notificationtime'
                }
            ]
        }
    ];
    $mmSitesFactoryProvider.registerStores(stores);
}])
.factory('$mmaCalendar', ["$log", "$q", "$mmSite", "$mmUtil", "$mmCourses", "$mmGroups", "$mmCourse", "$mmLocalNotifications", "$mmSitesManager", "mmCoreSecondsDay", "mmaCalendarDaysInterval", "mmaCalendarEventsStore", "mmaCalendarDefaultNotifTime", "mmaCalendarComponent", function($log, $q, $mmSite, $mmUtil, $mmCourses, $mmGroups, $mmCourse, $mmLocalNotifications,
        $mmSitesManager, mmCoreSecondsDay, mmaCalendarDaysInterval, mmaCalendarEventsStore, mmaCalendarDefaultNotifTime,
        mmaCalendarComponent) {
    $log = $log.getInstance('$mmaCalendar');
    var self = {},
        calendarImgPath = 'addons/calendar/img/',
        eventicons = {
            'course': calendarImgPath + 'courseevent.svg',
            'group': calendarImgPath + 'groupevent.svg',
            'site': calendarImgPath + 'siteevent.svg',
            'user': calendarImgPath + 'userevent.svg'
        };
        function getEventsListCacheKey(daysToStart, daysInterval) {
        return 'mmaCalendar:events:' + daysToStart + ':' + daysInterval;
    }
        function getEventCacheKey(id) {
        return 'mmaCalendar:events:' + id;
    }
        function getEventsCommonCacheKey() {
        return 'mmaCalendar:events:';
    }
        function storeEventsInLocalDB(events, siteid) {
        siteid = siteid || $mmSite.getId();
        return $mmSitesManager.getSite(siteid).then(function(site) {
            var promises = [],
                db = site.getDb();
            angular.forEach(events, function(event) {
                var promise = self.getEventNotificationTime(event.id, siteid).then(function(time) {
                    event.notificationtime = time;
                    return db.insert(mmaCalendarEventsStore, event);
                });
                promises.push(promise);
            });
            return $q.all(promises);
        });
    }
        self.formatEventData = function(e) {
        var icon = self.getEventIcon(e.eventtype);
        if (icon === '') {
            icon = $mmCourse.getModuleIconSrc(e.modulename);
            e.moduleicon = icon;
        }
        e.icon = icon;
    };
        self.getEvent = function(id, refresh) {
        var presets = {},
            data = {
                "options[userevents]": 0,
                "options[siteevents]": 0,
                "events[eventids][0]": id
            };
        presets.cacheKey = getEventCacheKey(id);
        if (refresh) {
            presets.getFromCache = false;
        }
        return $mmSite.read('core_calendar_get_calendar_events', data, presets).then(function(response) {
            var e = response.events[0];
            if (e) {
                return e;
            } else {
                return self.getEventFromLocalDb(id);
            }
        }, function() {
            return self.getEventFromLocalDb(id);
        });
    };
        self.getEventFromLocalDb = function(id) {
        if (!$mmSite.isLoggedIn()) {
            return $q.reject();
        }
        return $mmSite.getDb().get(mmaCalendarEventsStore, id);
    };
        self.getEventIcon = function(type) {
        return eventicons[type] || '';
    };
        self.getEventNotificationTime = function(id, siteid) {
        siteid = siteid || $mmSite.getId();
        return $mmSitesManager.getSite(siteid).then(function(site) {
            var db = site.getDb();
            return db.get(mmaCalendarEventsStore, id).then(function(e) {
                if (typeof e.notificationtime != 'undefined') {
                    return e.notificationtime;
                }
                return mmaCalendarDefaultNotifTime;
            }, function(err) {
                return mmaCalendarDefaultNotifTime;
            });
        });
    };
        self.getEvents = function(daysToStart, daysInterval, refresh, siteid) {
        daysToStart = daysToStart || 0;
        daysInterval = daysInterval || mmaCalendarDaysInterval;
        siteid = siteid || $mmSite.getId();
         var now = $mmUtil.timestamp(),
            start = now + (mmCoreSecondsDay * daysToStart),
            end = start + (mmCoreSecondsDay * daysInterval);
        var data = {
            "options[userevents]": 1,
            "options[siteevents]": 1,
            "options[timestart]": start,
            "options[timeend]": end
        };
        return $mmCourses.getUserCourses(false, siteid).then(function(courses) {
            courses.push({id: 1});
            angular.forEach(courses, function(course, index) {
                data["events[courseids][" + index + "]"] = course.id;
            });
            return $mmGroups.getUserGroups(courses, refresh, siteid).then(function(groups) {
                angular.forEach(groups, function(group, index) {
                    data["events[groupids][" + index + "]"] = group.id;
                });
                return $mmSitesManager.getSite(siteid).then(function(site) {
                    var preSets = {
                        cacheKey: getEventsListCacheKey(daysToStart, daysInterval),
                        getCacheUsingCacheKey: true
                    };
                    return site.read('core_calendar_get_calendar_events', data, preSets).then(function(response) {
                        storeEventsInLocalDB(response.events, siteid);
                        return response.events;
                    });
                });
            });
        });
    };
        self.invalidateEventsList = function() {
        var p1 = $mmCourses.invalidateUserCourses(),
            p2 = $mmSite.invalidateWsCacheForKeyStartingWith(getEventsCommonCacheKey());
        return $q.all([p1, p2]);
    };
        self.isAvailable = function() {
        return $mmSite.wsAvailable('core_calendar_get_calendar_events');
    };
        self.scheduleAllSitesEventsNotifications = function() {
        if ($mmLocalNotifications.isAvailable()) {
            return $mmSitesManager.getSitesIds().then(function(siteids) {
                var promises = [];
                angular.forEach(siteids, function(siteid) {
                    var promise = self.getEvents(undefined, undefined, false, siteid).then(function(events) {
                        return self.scheduleEventsNotifications(events, siteid);
                    });
                    promises.push(promise);
                });
                return $q.all(promises);
            });
        } else {
            var deferred = $q.defer();
            deferred.resolve();
            return deferred.promise;
        }
    };
        self.scheduleEventNotification = function(event, time, siteid) {
        siteid = siteid || $mmSite.getId();
        if ($mmLocalNotifications.isAvailable()) {
            if (time === 0) {
                return $mmLocalNotifications.cancel(event.id, mmaCalendarComponent, siteid);
            } else {
                var timeend = (event.timestart + event.timeduration) * 1000;
                if (timeend <= new Date().getTime()) {
                    return $q.when();
                }
                var dateTriggered = new Date((event.timestart - (time * 60)) * 1000),
                    startDate = new Date(event.timestart * 1000),
                    notification = {
                        id: event.id,
                        title: event.name,
                        message: startDate.toLocaleString(),
                        at: dateTriggered,
                        smallIcon: 'res://icon',
                        data: {
                            eventid: event.id,
                            siteid: siteid
                        }
                    };
                return $mmLocalNotifications.schedule(notification, mmaCalendarComponent, siteid);
            }
        } else {
            return $q.when();
        }
    };
        self.scheduleEventsNotifications = function(events, siteid) {
        siteid = siteid || $mmSite.getId();
        var promises = [];
        if ($mmLocalNotifications.isAvailable()) {
            angular.forEach(events, function(e) {
                var promise = self.getEventNotificationTime(e.id, siteid).then(function(time) {
                    return self.scheduleEventNotification(e, time, siteid);
                });
                promises.push(promise);
            });
        }
        return $q.all(promises);
    };
        self.updateNotificationTime = function(event, time) {
        if (!$mmSite.isLoggedIn()) {
            return $q.reject();
        }
        var db = $mmSite.getDb();
        event.notificationtime = time;
        return db.insert(mmaCalendarEventsStore, event).then(function() {
            return self.scheduleEventNotification(event, time);
        });
    };
    return self;
}]);

angular.module('mm.addons.calendar')
.factory('$mmaCalendarHandlers', ["$log", "$mmaCalendar", function($log, $mmaCalendar) {
    $log = $log.getInstance('$mmaCalendarHandlers');
    var self = {};
        self.sideMenuNav = function() {
        var self = {};
                self.isEnabled = function() {
            return $mmaCalendar.isAvailable();
        };
                self.getController = function() {
                        return function($scope) {
                $scope.icon = 'ion-calendar';
                $scope.title = 'mma.calendar.calendarevents';
                $scope.state = 'site.calendar';
            };
        };
        return self;
    };
    return self;
}]);

angular.module('mm.addons.coursecompletion')
.controller('mmaCourseCompletionReportCtrl', ["$scope", "$stateParams", "$mmUtil", "$mmaCourseCompletion", "$mmSite", "$ionicPlatform", function($scope, $stateParams, $mmUtil, $mmaCourseCompletion, $mmSite,
            $ionicPlatform) {
    var course = $stateParams.course,
        userid = $stateParams.userid || $mmSite.getUserId();
    $scope.isTablet = $ionicPlatform.isTablet();
    function fetchCompletion() {
        return $mmaCourseCompletion.getCompletion(course.id, userid).then(function(completion) {
            completion.statusText = $mmaCourseCompletion.getCompletedStatusText(completion);
            $scope.completion = completion;
            $scope.showSelfComplete = $mmaCourseCompletion.isSelfCompletionAvailable() &&
                                        $mmaCourseCompletion.canMarkSelfCompleted(userid, completion);
        }).catch(function(message) {
            if (message) {
                $mmUtil.showErrorModal(message);
            } else {
                $mmUtil.showErrorModal('mma.coursecompletion.couldnotloadreport', true);
            }
        });
    }
    fetchCompletion().finally(function() {
        $scope.completionLoaded = true;
    });
    function refreshCompletion() {
        return $mmaCourseCompletion.invalidateCourseCompletion(course.id, userid).finally(function() {
            return fetchCompletion();
        });
    }
    $scope.refreshCompletion = function() {
        refreshCompletion().finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
    $scope.completeCourse = function() {
        var modal = $mmUtil.showModalLoading('mm.core.sending', true);
        $mmaCourseCompletion.markCourseAsSelfCompleted(course.id).then(function() {
            return refreshCompletion();
        }).catch(function(message) {
            $mmUtil.showErrorModal(message);
        }).finally(function() {
            modal.dismiss();
        });
    };
}]);

angular.module('mm.addons.coursecompletion')
.factory('$mmaCourseCompletion', ["$mmSite", "$log", "$q", "$mmCourses", function($mmSite, $log, $q, $mmCourses) {
    $log = $log.getInstance('$mmaCourseCompletion');
    var self = {};
        self.canMarkSelfCompleted = function(userid, completion) {
        var selfCompletionActive = false,
            alreadyMarked = false;
        if ($mmSite.getUserId() != userid) {
            return false;
        }
        angular.forEach(completion.completions, function(criteria) {
            if (criteria.type === 1) {
                selfCompletionActive = true;
                alreadyMarked = criteria.complete;
            }
        });
        return selfCompletionActive && !alreadyMarked;
    };
        self.getCompletedStatusText = function(completion) {
        if (completion.completed) {
            return 'mma.coursecompletion.completed';
        } else {
            var hasStarted = false;
            angular.forEach(completion.completions, function(criteria) {
                if (criteria.timecompleted || criteria.complete) {
                    hasStarted = true;
                }
            });
            if (hasStarted) {
                return 'mma.coursecompletion.inprogress';
            } else {
                return 'mma.coursecompletion.notyetstarted';
            }
        }
    };
        self.getCompletion = function(courseid, userid) {
        userid = userid || $mmSite.getUserId();
        $log.debug('Get completion for course ' + courseid + ' and user ' + userid);
        var data = {
                courseid : courseid,
                userid: userid
            },
            preSets = {
                cacheKey: getCompletionCacheKey(courseid, userid)
            };
        return $mmSite.read('core_completion_get_course_completion_status', data, preSets).then(function(data) {
            if (data.completionstatus) {
                return data.completionstatus;
            }
            return $q.reject();
        });
    };
        function getCompletionCacheKey(courseid, userid) {
        return 'mmaCourseCompletion:view:' + courseid + ':' + userid;
    }
        self.invalidateCourseCompletion = function(courseid, userid) {
        userid = userid || $mmSite.getUserId();
        return $mmSite.invalidateWsCacheForKey(getCompletionCacheKey(courseid, userid));
    };
        self.isPluginViewEnabled = function() {
        if (!$mmSite.isLoggedIn()) {
            return false;
        } else if (!$mmSite.wsAvailable('core_completion_get_course_completion_status')) {
            return false;
        }
        return true;
    };
        self.isPluginViewEnabledForCourse = function(courseId) {
        if (!courseId) {
            return $q.reject();
        }
        return $mmCourses.getUserCourse(courseId, true).then(function(course) {
            if (course && typeof course.enablecompletion != 'undefined' && !course.enablecompletion) {
                return false;
            }
            return true;
        });
    };
        self.isPluginViewEnabledForUser = function(courseId, userId) {
        return self.getCompletion(courseId, userId).then(function() {
            return true;
        }).catch(function() {
            return false;
        });
    };
        self.isSelfCompletionAvailable = function() {
        return $mmSite.wsAvailable('core_completion_mark_course_self_completed');
    };
        self.markCourseAsSelfCompleted = function(courseid) {
        var params = {
            courseid: courseid
        };
        return $mmSite.write('core_completion_mark_course_self_completed', params).then(function(response) {
            if (!response.status) {
                return $q.reject();
            }
        });
    };
    return self;
}]);

angular.module('mm.addons.coursecompletion')
.factory('$mmaCourseCompletionHandlers', ["$mmaCourseCompletion", "$state", "mmCoursesAccessMethods", function($mmaCourseCompletion, $state, mmCoursesAccessMethods) {
    var self = {},
        viewCompletionEnabledCache = {},
        coursesNavEnabledCache = {};
        function getCacheKey(courseId, userId) {
        return courseId + '#' + userId;
    }
        self.clearViewCompletionCache = function(courseId, userId) {
        if (courseId && userId) {
            delete viewCompletionEnabledCache[getCacheKey(courseId, userId)];
        } else {
            viewCompletionEnabledCache = {};
        }
    };
        self.clearCoursesNavCache = function() {
        coursesNavEnabledCache = {};
    };
        self.viewCompletion = function() {
        var self = {};
                self.isEnabled = function() {
            return $mmaCourseCompletion.isPluginViewEnabled();
        };
                self.isEnabledForUser = function(user, courseId) {
            return $mmaCourseCompletion.isPluginViewEnabledForCourse(courseId).then(function() {
                var cacheKey = getCacheKey(courseId, user.id);
                if (typeof viewCompletionEnabledCache[cacheKey] != 'undefined') {
                    return viewCompletionEnabledCache[cacheKey];
                }
                return $mmaCourseCompletion.isPluginViewEnabledForUser(courseId, user.id).then(function(enabled) {
                    viewCompletionEnabledCache[cacheKey] = enabled;
                    return enabled;
                });
            });
        };
                self.getController = function(user, courseId) {
                        return function($scope) {
                $scope.title = 'mma.coursecompletion.viewcoursereport';
                $scope.action = function($event) {
                    $event.preventDefault();
                    $event.stopPropagation();
                    $state.go('site.course-completion', {
                        userid: user.id,
                        course: {id: courseId}
                    });
                };
            };
        };
        return self;
    };
        self.coursesNav = function() {
        var self = {};
                self.isEnabled = function() {
            return $mmaCourseCompletion.isPluginViewEnabled();
        };
                self.isEnabledForCourse = function(courseId, accessData) {
            if (accessData && accessData.type == mmCoursesAccessMethods.guest) {
                return false;
            }
            return $mmaCourseCompletion.isPluginViewEnabledForCourse(courseId).then(function() {
                if (typeof coursesNavEnabledCache[courseId] != 'undefined') {
                    return coursesNavEnabledCache[courseId];
                }
                return $mmaCourseCompletion.isPluginViewEnabledForUser(courseId).then(function(enabled) {
                    coursesNavEnabledCache[courseId] = enabled;
                    return enabled;
                });
            });
        };
                self.getController = function(courseId) {
                        return function($scope, $state) {
                $scope.icon = 'ion-android-checkbox-outline';
                $scope.title = 'mma.coursecompletion.coursecompletion';
                $scope.action = function($event, course) {
                    $event.preventDefault();
                    $event.stopPropagation();
                    $state.go('site.course-completion', {
                        course: course
                    });
                };
            };
        };
        return self;
    };
    return self;
}])
.run(["$mmaCourseCompletionHandlers", "$mmEvents", "mmCoreEventLogout", "mmCoursesEventMyCoursesRefreshed", "mmUserEventProfileRefreshed", function($mmaCourseCompletionHandlers, $mmEvents, mmCoreEventLogout, mmCoursesEventMyCoursesRefreshed,
            mmUserEventProfileRefreshed) {
    $mmEvents.on(mmCoreEventLogout, function() {
        $mmaCourseCompletionHandlers.clearViewCompletionCache();
        $mmaCourseCompletionHandlers.clearCoursesNavCache();
    });
    $mmEvents.on(mmCoursesEventMyCoursesRefreshed, $mmaCourseCompletionHandlers.clearCoursesNavCache);
    $mmEvents.on(mmUserEventProfileRefreshed, function(data) {
        if (data) {
            $mmaCourseCompletionHandlers.clearViewCompletionCache(data.courseid, data.userid);
        }
    });
}]);

angular.module('mm.addons.files')
.controller('mmaFilesChooseSiteCtrl', ["$scope", "$stateParams", "$mmSitesManager", "$mmaFilesHelper", "$ionicHistory", "$mmLoginHelper", function($scope, $stateParams, $mmSitesManager, $mmaFilesHelper, $ionicHistory,
            $mmLoginHelper) {
    var fileEntry = $stateParams.file || {};
    $scope.filename = fileEntry.name;
    $mmSitesManager.getSites().then(function(sites) {
        $scope.sites = sites;
    });
    $scope.uploadInSite = function(siteid) {
        $mmaFilesHelper.showConfirmAndUploadInSite(fileEntry, siteid).then(function() {
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $mmLoginHelper.goToSiteInitialPage();
        });
    };
}]);

angular.module('mm.addons.files')
.controller('mmaFilesIndexController', ["$scope", "$mmaFiles", "$mmSite", "$mmUtil", "$mmApp", "$state", function($scope, $mmaFiles, $mmSite, $mmUtil, $mmApp, $state) {
    $scope.canAccessFiles = $mmaFiles.canAccessFiles;
    $scope.showPrivateFiles = function() {
        return $mmaFiles.canAccessFiles() && $mmSite.canAccessMyFiles();
    };
    $scope.showUpload = function() {
        return !$mmaFiles.canAccessFiles() && $mmSite.canAccessMyFiles() && $mmSite.canUploadFiles();
    };
    $scope.canDownload = $mmSite.canDownloadFiles;
    $scope.add = function() {
        if (!$mmApp.isOnline()) {
            $mmUtil.showErrorModal('mma.files.errormustbeonlinetoupload', true);
        } else {
            $state.go('site.files-upload');
        }
    };
}]);

angular.module('mm.addons.files')
.controller('mmaFilesListController', ["$q", "$scope", "$stateParams", "$mmaFiles", "$mmSite", "$translate", "$mmUtil", "$ionicHistory", "mmaFilesUploadStateName", "$state", "$mmApp", "mmaFilesMyComponent", "mmaFilesSiteComponent", function($q, $scope, $stateParams, $mmaFiles, $mmSite, $translate, $mmUtil,
        $ionicHistory, mmaFilesUploadStateName, $state, $mmApp, mmaFilesMyComponent, mmaFilesSiteComponent) {
    var path = $stateParams.path,
        root = $stateParams.root,
        promise;
    $scope.count = -1;
    $scope.component = root === 'my' ? mmaFilesMyComponent : mmaFilesSiteComponent;
    function fetchFiles(root, path) {
        if (!path) {
            if (root === 'site') {
                promise = $mmaFiles.getSiteFiles();
                $scope.title = $translate.instant('mma.files.sitefiles');
            } else if (root === 'my') {
                promise = $mmaFiles.getMyFiles();
                $scope.title = $translate.instant('mma.files.myprivatefiles');
            } else {
                promise = $q.reject();
            }
        } else {
            pathdata = JSON.parse(path);
            promise = $mmaFiles.getFiles(pathdata);
            $scope.title = $stateParams.title;
        }
        return promise.then(function(files) {
            $scope.files = files.entries;
            $scope.count = files.count;
        }).catch(function() {
            $mmUtil.showErrorModal('mma.files.couldnotloadfiles', true);
        });
    }
    fetchFiles(root, path).finally(function() {
        $scope.filesLoaded = true;
    });
    $scope.refreshFiles = function() {
        $mmaFiles.invalidateDirectory(root, path).finally(function() {
            fetchFiles(root, path).finally(function() {
                $scope.$broadcast('scroll.refreshComplete');
            });
        });
    };
    $scope.$on('$ionicView.enter', function() {
        var forwardView = $ionicHistory.forwardView();
        if (forwardView && forwardView.stateName === mmaFilesUploadStateName) {
            $scope.filesLoaded = false;
            fetchFiles(root, path).finally(function() {
                $scope.filesLoaded = true;
            });
        }
    });
    $scope.showUpload = function() {
        return (root === 'my' && !path && $mmSite.canUploadFiles());
    };
    $scope.add = function() {
        if (!$mmApp.isOnline()) {
            $mmUtil.showErrorModal('mma.files.errormustbeonlinetoupload', true);
        } else {
            $state.go('site.files-upload', {root: root, path: path});
        }
    };
}]);

angular.module('mm.addons.files')
.controller('mmaFilesUploadCtrl', ["$scope", "$stateParams", "$mmUtil", "$mmaFilesHelper", "$ionicHistory", "$mmaFiles", "$mmApp", function($scope, $stateParams, $mmUtil, $mmaFilesHelper, $ionicHistory, $mmaFiles, $mmApp) {
    var uploadMethods = {
            album: $mmaFilesHelper.uploadImage,
            camera: $mmaFilesHelper.uploadImage,
            audio: $mmaFilesHelper.uploadAudioOrVideo,
            video: $mmaFilesHelper.uploadAudioOrVideo
        },
        path = $stateParams.path,
        root = $stateParams.root;
    $scope.isAndroid = ionic.Platform.isAndroid();
    function successUploading() {
        $mmaFiles.invalidateDirectory(root, path).finally(function() {
            $mmUtil.showModal('mm.core.success', 'mma.files.fileuploaded');
            $ionicHistory.goBack();
        });
    }
    function errorUploading(err) {
        if (err) {
            $mmUtil.showErrorModal(err);
        }
    }
    $scope.upload = function(type, param) {
        if (!$mmApp.isOnline()) {
            $mmUtil.showErrorModal('mma.files.errormustbeonlinetoupload', true);
        } else {
            if (typeof(uploadMethods[type]) !== 'undefined') {
                uploadMethods[type](param).then(successUploading, errorUploading);
            }
        }
    };
    $scope.uploadFile = function(evt) {
        var input = evt.srcElement;
        var file = input.files[0];
        input.value = '';
        if (file) {
            $mmaFilesHelper.confirmUploadFile(file.size).then(function() {
                $mmaFilesHelper.copyAndUploadFile(file).then(successUploading, errorUploading);
            }, errorUploading);
        }
    };
}]);

angular.module('mm.addons.files')
.directive('mmaFilesOnChange', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var onChangeHandler = scope.$eval(attrs.mmaFilesOnChange);
      element.bind('change', onChangeHandler);
    }
  };
});

angular.module('mm.addons.files')
.config(["$mmAppProvider", "mmaFilesSharedFilesStore", function($mmAppProvider, mmaFilesSharedFilesStore) {
    var stores = [
        {
            name: mmaFilesSharedFilesStore,
            keyPath: 'id'
        }
    ];
    $mmAppProvider.registerStores(stores);
}])
.factory('$mmaFiles', ["$mmSite", "$mmFS", "$q", "$timeout", "$log", "$mmSitesManager", "$mmApp", "md5", "mmaFilesSharedFilesStore", function($mmSite, $mmFS, $q, $timeout, $log, $mmSitesManager, $mmApp, md5,
            mmaFilesSharedFilesStore) {
    $log = $log.getInstance('$mmaFiles');
    var self = {},
        defaultParams = {
            "contextid": 0,
            "component": "",
            "filearea": "",
            "itemid": 0,
            "filepath": "",
            "filename": ""
        };
        self.canAccessFiles = function() {
        return $mmSite.wsAvailable('core_files_get_files');
    };
        self.checkIOSNewFiles = function() {
        var deferred = $q.defer();
        $log.debug('Search for new files on iOS');
        $mmFS.getDirectoryContents('Inbox').then(function(entries) {
            if (entries.length > 0) {
                var promises = [];
                angular.forEach(entries, function(entry) {
                    var fileDeferred = $q.defer(),
                        fileId = md5.createHash(entry.name);
                    $mmApp.getDB().get(mmaFilesSharedFilesStore, fileId).then(function() {
                        $log.debug('Delete already treated file: ' + entry.name);
                        fileDeferred.resolve();
                        entry.remove(function() {
                            $log.debug('File deleted: ' + entry.name);
                            $mmApp.getDB().remove(mmaFilesSharedFilesStore, fileId).then(function() {
                                $log.debug('"Treated" mark removed from file: ' + entry.name);
                            }, function() {
                                $log.debug('Error deleting "treated" mark from file: ' + entry.name);
                            });
                        }, function() {
                            $log.debug('Error deleting file in Inbox: ' + entry.name);
                        });
                    }, function() {
                        $log.debug('Found new file ' + entry.name + ' shared with the app.');
                        fileDeferred.resolve(entry);
                    });
                    promises.push(fileDeferred.promise);
                });
                $q.all(promises).then(function(responses) {
                    var fileToReturn,
                        fileId;
                    for (var i = 0; i < responses.length; i++) {
                        if (typeof(responses[i]) !== 'undefined') {
                            fileToReturn = responses[i];
                            break;
                        }
                    }
                    if (fileToReturn) {
                        fileId = md5.createHash(fileToReturn.name);
                        $mmApp.getDB().insert(mmaFilesSharedFilesStore, {id: fileId}).then(function() {
                            $log.debug('File marked as "treated": ' + fileToReturn.name);
                            deferred.resolve(fileToReturn);
                        }, function() {
                            $log.debug('Error marking file as "treated": ' + fileToReturn.name);
                            deferred.reject();
                        });
                    } else {
                        deferred.reject();
                    }
                }, deferred.reject);
            } else {
                deferred.reject();
            }
        });
        return deferred.promise;
    };
        self.getFiles = function(params) {
        var deferred = $q.defer(),
            options = {};
        options.cacheKey = getFilesListCacheKey(params);
        $mmSite.read('core_files_get_files', params, options).then(function(result) {
            var data = {
                entries: [],
                count: 0
            };
            if (typeof result.files == 'undefined') {
                deferred.reject();
                return;
            }
            angular.forEach(result.files, function(entry) {
                entry.link = {};
                entry.link.contextid = (entry.contextid) ? entry.contextid : "";
                entry.link.component = (entry.component) ? entry.component : "";
                entry.link.filearea = (entry.filearea) ? entry.filearea : "";
                entry.link.itemid = (entry.itemid) ? entry.itemid : 0;
                entry.link.filepath = (entry.filepath) ? entry.filepath : "";
                entry.link.filename = (entry.filename) ? entry.filename : "";
                if (entry.component && entry.isdir) {
                    entry.link.filename = "";
                }
                if (entry.isdir) {
                    entry.imgpath = $mmFS.getFolderIcon();
                } else {
                    entry.imgpath = $mmFS.getFileIcon(entry.filename);
                }
                entry.link = JSON.stringify(entry.link);
                entry.linkId = md5.createHash(entry.link);
                data.count += 1;
                data.entries.push(entry);
            });
            deferred.resolve(data);
        }, function() {
            deferred.reject();
        });
        return deferred.promise;
    };
        function getFilesListCacheKey(params) {
        var root = params.component === '' ? 'site' : 'my';
        return 'mmaFiles:list:' + root + ':' + params.contextid + ':' + params.filepath;
    }
        self.getMyFiles = function() {
        var params = getMyFilesRootParams();
        return self.getFiles(params);
    };
        function getMyFilesListCommonCacheKey() {
        return 'mmaFiles:list:my';
    }
        function getMyFilesRootParams() {
        var params = angular.copy(defaultParams, {});
        params.component = "user";
        params.filearea = "private";
        params.contextid = -1;
        params.contextlevel = "user";
        params.instanceid = $mmSite.getUserId();
        return params;
    }
        self.getSiteFiles = function() {
        var params = angular.copy(defaultParams, {});
        return self.getFiles(params);
    };
        function getSiteFilesListCommonCacheKey() {
        return 'mmaFiles:list:site';
    }
        self.invalidateDirectory = function(root, path, siteid) {
        siteid = siteid || $mmSite.getId();
        var params = {};
        if (!path) {
            if (root === 'site') {
                params = angular.copy(defaultParams, {});
            } else if (root === 'my') {
                params = getMyFilesRootParams();
            }
        } else {
            params = JSON.parse(path);
        }
        return $mmSitesManager.getSite(siteid).then(function(site) {
            site.invalidateWsCacheForKey(getFilesListCacheKey(params));
        });
    };
        self.invalidateMyFiles = function() {
        return $mmSite.invalidateWsCacheForKeyStartingWith(getMyFilesListCommonCacheKey());
    };
        self.invalidateSiteFiles = function() {
        return $mmSite.invalidateWsCacheForKeyStartingWith(getSiteFilesListCommonCacheKey());
    };
        self.isPluginEnabled = function() {
        var canAccessFiles = self.canAccessFiles(),
            canAccessMyFiles = $mmSite.canAccessMyFiles(),
            canUploadFiles = $mmSite.canUploadFiles();
        return canAccessFiles || (canUploadFiles && canAccessMyFiles);
    };
        self.uploadFile = function(uri, options, siteid) {
        options = options || {};
        siteid = siteid || $mmSite.getId();
        var deleteAfterUpload = options.deleteAfterUpload,
            deferred = $q.defer(),
            ftOptions = {
                fileKey: options.fileKey,
                fileName: options.fileName,
                mimeType: options.mimeType
            };
        function deleteFile() {
            $timeout(function() {
                $mmFS.removeExternalFile(uri);
            }, 500);
        }
        $mmSitesManager.getSite(siteid).then(function(site) {
            site.uploadFile(uri, ftOptions).then(deferred.resolve, deferred.reject, deferred.notify).finally(function() {
                if (deleteAfterUpload) {
                    deleteFile();
                }
            });
        }, function() {
            if (deleteAfterUpload) {
                deleteFile();
            }
            deferred.reject(error);
        });
        return deferred.promise;
    };
        self.uploadImage = function(uri, isFromAlbum) {
        $log.debug('Uploading an image');
        var options = {};
        if (typeof(uri) === 'undefined' || uri === ''){
            $log.debug('Received invalid URI in $mmaFiles.uploadImage()');
            return $q.reject();
        }
        options.deleteAfterUpload = !isFromAlbum;
        options.fileKey = "file";
        options.fileName = "image_" + new Date().getTime() + ".jpg";
        options.mimeType = "image/jpeg";
        return self.uploadFile(uri, options);
    };
        self.uploadMedia = function(mediaFiles) {
        $log.debug('Uploading media');
        var promises = [];
        angular.forEach(mediaFiles, function(mediaFile) {
            var options = {},
                filename = mediaFile.name,
                split;
            if (ionic.Platform.isIOS()) {
                split = filename.split('.');
                split[0] += '_' + new Date().getTime();
                filename = split.join('.');
            }
            options.fileKey = null;
            options.fileName = filename;
            options.mimeType = null;
            options.deleteAfterUpload = true;
            promises.push(self.uploadFile(mediaFile.fullPath, options));
        });
        return promises;
    };
        self.uploadGenericFile = function(uri, name, type, siteid) {
        var options = {};
        options.fileKey = null;
        options.fileName = name;
        options.mimeType = type;
        options.deleteAfterUpload = !ionic.Platform.isIOS();
        return self.uploadFile(uri, options, siteid);
    };
    return self;
}]);

angular.module('mm.addons.files')
.factory('$mmaFilesHandlers', ["$log", "$mmaFiles", function($log, $mmaFiles) {
    $log = $log.getInstance('$mmaFilesHandlers');
    var self = {};
        self.sideMenuNav = function() {
        var self = {};
                self.isEnabled = function() {
            return $mmaFiles.isPluginEnabled();
        };
                self.getController = function() {
                        return function($scope) {
                $scope.icon = 'ion-folder';
                $scope.title = 'mma.files.myfiles';
                $scope.state = 'site.files';
            };
        };
        return self;
    };
    return self;
}]);

angular.module('mm.addons.files')
.constant('mmaFilesFileSizeWarning', 5242880)
.factory('$mmaFilesHelper', ["$q", "$mmUtil", "$mmApp", "$log", "$translate", "$window", "$mmaFiles", "$cordovaCamera", "$cordovaCapture", "$mmLang", "$mmFS", "$mmText", "mmaFilesFileSizeWarning", function($q, $mmUtil, $mmApp, $log, $translate, $window,
        $mmaFiles, $cordovaCamera, $cordovaCapture, $mmLang, $mmFS, $mmText, mmaFilesFileSizeWarning) {
    $log = $log.getInstance('$mmaFilesHelper');
    var self = {};
        self.uploadImage = function(fromAlbum) {
        $log.debug('Trying to capture an image with camera');
        var options = {
            quality: 50,
            destinationType: navigator.camera.DestinationType.FILE_URI
        };
        if (fromAlbum) {
            options.sourceType = navigator.camera.PictureSourceType.PHOTOLIBRARY;
            options.popoverOptions = new CameraPopoverOptions(10, 10, $window.innerWidth  - 200, $window.innerHeight - 200,
                                            Camera.PopoverArrowDirection.ARROW_ANY);
        }
        return $cordovaCamera.getPicture(options).then(function(img) {
            var modal = $mmUtil.showModalLoading('mma.files.uploading', true);
            return $mmaFiles.uploadImage(img, fromAlbum).catch(function() {
                return $mmLang.translateAndReject('mma.files.errorwhileuploading');
            }).finally(function() {
                modal.dismiss();
            });
        }, function(error) {
            return treatImageError(error, 'mma.files.errorcapturingimage');
        });
    };
        self.uploadAudioOrVideo = function(isAudio) {
        $log.debug('Trying to record a video file');
        var fn = isAudio ? $cordovaCapture.captureAudio : $cordovaCapture.captureVideo;
        return fn({limit: 1}).then(function(medias) {
            var modal = $mmUtil.showModalLoading('mma.files.uploading', true);
            return $q.all($mmaFiles.uploadMedia(medias)).catch(function() {
                return $mmLang.translateAndReject('mma.files.errorwhileuploading');
            }).finally(function() {
                modal.dismiss();
            });
        }, function(error) {
            return treatCaptureError(error, 'mma.files.errorcapturingvideo');
        });
    };
        self.confirmUploadFile = function(size) {
        if (!$mmApp.isOnline()) {
            return $mmLang.translateAndReject('mma.files.errormustbeonlinetoupload');
        }
        if ($mmApp.isNetworkAccessLimited() || size >= mmaFilesFileSizeWarning) {
            size = $mmText.bytesToSize(size, 2);
            return $mmUtil.showConfirm($translate('mma.files.confirmuploadfile', {size: size}));
        } else {
            return $q.when();
        }
    };
        self.copyAndUploadFile = function(file) {
        var modal = $mmUtil.showModalLoading('mma.files.readingfile', true);
        return $mmFS.readFileData(file, $mmFS.FORMATARRAYBUFFER).then(function(data) {
            var filepath = $mmFS.getTmpFolder() + '/' + file.name;
            return $mmFS.writeFile(filepath, data).then(function(fileEntry) {
                modal.dismiss();
                return self.uploadGenericFile(fileEntry.toURL(), file.name, file.type);
            }, function(error) {
                $log.error('Error writing file to upload: '+JSON.stringify(error));
                modal.dismiss();
                return $mmLang.translateAndReject('mma.files.errorreadingfile');
            });
        }, function(error) {
            $log.error('Error reading file to upload: '+JSON.stringify(error));
            modal.dismiss();
            return $mmLang.translateAndReject('mma.files.errorreadingfile');
        });
    };
        self.uploadGenericFile = function(uri, name, type, siteid) {
        if (!$mmApp.isOnline()) {
            return $mmLang.translateAndReject('mma.files.errormustbeonlinetoupload');
        }
        var modal = $mmUtil.showModalLoading('mma.files.uploading', true);
        return $mmaFiles.uploadGenericFile(uri, name, type, siteid).catch(function(error) {
            $log.error('Error uploading file: '+JSON.stringify(error));
            return $mmLang.translateAndReject('mma.files.errorwhileuploading');
        }).finally(function() {
            modal.dismiss();
        });
    };
        self.showConfirmAndUploadInSite = function(fileEntry, siteid) {
        return $mmFS.getFileObjectFromFileEntry(fileEntry).then(function(file) {
            return self.confirmUploadFile(file.size).then(function() {
                return self.uploadGenericFile(fileEntry.toURL(), file.name, file.type, siteid).then(function() {
                    return $mmaFiles.invalidateDirectory('my', undefined, siteid).finally(function() {
                        $mmUtil.showModal('mm.core.success', 'mma.files.fileuploaded');
                    });
                }, function(err) {
                    if (err) {
                        $mmUtil.showErrorModal(err);
                    }
                    return $q.reject();
                });
            }, function(err) {
                if (err) {
                    $mmUtil.showErrorModal(err);
                }
                return $q.reject();
            });
        }, function() {
            $mmUtil.showErrorModal('mma.files.errorreadingfile', true);
            return $q.reject();
        });
    };
        function treatImageError(error, defaultMessage) {
        if (error) {
            if (typeof error == 'string') {
                if (error.toLowerCase().indexOf("error") > -1 || error.toLowerCase().indexOf("unable") > -1) {
                    $log.error('Error getting image: ' + error);
                    return $q.reject(error);
                } else {
                    $log.debug('Cancelled');
                }
            } else {
                return $mmLang.translateAndReject(defaultMessage);
            }
        }
        return $q.reject();
    }
        function treatCaptureError(error, defaultMessage) {
        if (error) {
            if (typeof(error) === 'string') {
                $log.error('Error while recording audio/video: ' + error);
                if (error.indexOf('No Activity found') > -1) {
                    return $mmLang.translateAndReject('mma.files.errornoapp');
                } else {
                    return $mmLang.translateAndReject(defaultMessage);
                }
            } else {
                if (error.code != 3) {
                    $log.error('Error while recording audio/video: ' + JSON.stringify(error));
                    return $mmLang.translateAndReject(defaultMessage);
                } else {
                    $log.debug('Cancelled');
                }
            }
        }
        return $q.reject();
    }
    return self;
}]);

angular.module('mm.addons.frontpage')
.factory('$mmaFrontpage', ["$mmSite", "$log", "$q", "$mmCourse", function($mmSite, $log, $q, $mmCourse) {
    $log = $log.getInstance('$mmaFrontpage');
    var self = {};
        self.isPluginEnabled = function() {
        if (!$mmSite.isLoggedIn()) {
            return false;
        }
        return true;
    };
        self.isFrontpageAvailable = function() {
        $log.debug('Using WS call to check if frontpage is available.');
        return $mmCourse.getSections(1, {emergencyCache: false}).then(function(data) {
            if (!angular.isArray(data) || data.length == 0) {
                return $q.reject();
            }
        });
    };
    return self;
}]);

angular.module('mm.addons.frontpage')
.factory('$mmaFrontPageHandlers', ["$log", "$mmaFrontpage", function($log, $mmaFrontpage) {
    $log = $log.getInstance('$mmaFrontPageHandlers');
    var self = {};
        self.sideMenuNav = function() {
        var self = {};
                self.isEnabled = function() {
            if ($mmaFrontpage.isPluginEnabled()) {
                return $mmaFrontpage.isFrontpageAvailable().then(function() {
                    return true;
                });
            }
            return false;
        };
                self.getController = function() {
                        return function($scope) {
                $scope.icon = 'ion-home';
                $scope.title = 'mma.frontpage.sitehome';
                $scope.state = 'site.mm_course-section';
            };
        };
        return self;
    };
    return self;
}]);

angular.module('mm.addons.grades')
.controller('mmaGradesTableCtrl', ["$scope", "$stateParams", "$mmUtil", "$mmaGrades", "$mmSite", function($scope, $stateParams, $mmUtil, $mmaGrades, $mmSite) {
    var course = $stateParams.course || {},
        courseid = course.id,
        userid = $stateParams.userid || $mmSite.getUserId();
    function fetchGrades(refresh) {
        return $mmaGrades.getGradesTable(courseid, userid, refresh).then(function(table) {
            $scope.gradesTable = table;
        }, function(message) {
            $mmUtil.showErrorModal(message);
            $scope.errormessage = message;
        });
    }
    fetchGrades().then(function() {
        $mmSite.write('gradereport_user_view_grade_report', {
            courseid: courseid,
            userid: userid
        });
    })
    .finally(function() {
        $scope.gradesLoaded = true;
    });
    $scope.refreshGrades = function() {
        fetchGrades(true).finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
}]);

angular.module('mm.addons.grades')
.factory('$mmaGrades', ["$q", "$log", "$mmSite", "$mmText", "$ionicPlatform", "$translate", "$mmCourse", "$mmCourses", "$mmSitesManager", function($q, $log, $mmSite, $mmText, $ionicPlatform, $translate, $mmCourse, $mmCourses, $mmSitesManager) {
    $log = $log.getInstance('$mmaGrades');
    var self = {};
        function formatGradesTable(table, showSimple) {
        var formatted = {
            columns: [],
            rows: []
        };
        if (!table || !table.tables) {
            return formatted;
        }
        var columns = [ "itemname", "weight", "grade", "range", "percentage", "lettergrade", "rank",
                        "average", "feedback", "contributiontocoursetotal"];
        var returnedColumns = [];
        var tabledata = [];
        var maxDepth = 0;
        if (table.tables && table.tables[0] && table.tables[0]['tabledata']) {
            tabledata = table.tables[0]['tabledata'];
            maxDepth = table.tables[0]['maxdepth'];
            for (var el in tabledata) {
                if (!angular.isArray(tabledata[el]) && typeof(tabledata[el]["leader"]) === "undefined") {
                    for (var col in tabledata[el]) {
                        returnedColumns.push(col);
                    }
                    break;
                }
            }
        }
        if (returnedColumns.length > 0) {
            if (showSimple) {
                returnedColumns = ["itemname", "grade"];
            }
            for (var el in columns) {
                var colName = columns[el];
                if (returnedColumns.indexOf(colName) > -1) {
                    var width = colName == "itemname" ? maxDepth : 1;
                    var column = {
                        id: colName,
                        name: colName,
                        width: width
                    };
                    formatted.columns.push(column);
                }
            }
            var name, rowspan, tclass, colspan, content, celltype, id, headers,j, img, colspanVal;
            var len = tabledata.length;
            for (var i = 0; i < len; i++) {
                var row = '';
                if (typeof(tabledata[i]['leader']) != "undefined") {
                    rowspan = tabledata[i]['leader']['rowspan'];
                    tclass = tabledata[i]['leader']['class'];
                    row += '<td class="' + tclass + '" rowspan="' + rowspan + '"></td>';
                }
                for (el in returnedColumns) {
                    name = returnedColumns[el];
                    if (typeof(tabledata[i][name]) != "undefined") {
                        tclass = (typeof(tabledata[i][name]['class']) != "undefined")? tabledata[i][name]['class'] : '';
                        colspan = (typeof(tabledata[i][name]['colspan']) != "undefined")? "colspan='"+tabledata[i][name]['colspan']+"'" : '';
                        content = (typeof(tabledata[i][name]['content']) != "undefined")? tabledata[i][name]['content'] : null;
                        celltype = (typeof(tabledata[i][name]['celltype']) != "undefined")? tabledata[i][name]['celltype'] : 'td';
                        id = (typeof(tabledata[i][name]['id']) != "undefined")? "id='" + tabledata[i][name]['id'] +"'" : '';
                        headers = (typeof(tabledata[i][name]['headers']) != "undefined")? "headers='" + tabledata[i][name]['headers'] + "'" : '';
                        if (typeof(content) != "undefined") {
                            img = getImgHTML(content);
                            content = content.replace(/<\/span>/gi, "\n");
                            content = $mmText.cleanTags(content);
                            content = content.replace("\n", "<br />");
                            content = img + " " + content;
                            row += "<" + celltype + " " + id + " " + headers + " " + "class='"+ tclass +"' " + colspan +">";
                            row += content;
                            row += "</" + celltype + ">";
                        }
                    }
                }
                formatted.rows.push(row);
            }
        }
        return formatted;
    }
        function getImgHTML(text) {
        var img = '';
        if (text.indexOf("/agg_mean") > -1) {
            img = '<img src="addons/grades/img/agg_mean.png" width="16">';
        } else if (text.indexOf("/agg_sum") > -1) {
            img = '<img src="addons/grades/img/agg_sum.png" width="16">';
        } else if (text.indexOf("/outcomes") > -1) {
            img = '<img src="addons/grades/img/outcomes.png" width="16">';
        } else if (text.indexOf("i/folder") > -1) {
            img = '<img src="addons/grades/img/folder.png" width="16">';
        } else if (text.indexOf("/manual_item") > -1) {
            img = '<img src="addons/grades/img/manual_item.png" width="16">';
        } else if (text.indexOf("/mod/") > -1) {
            var module = text.match(/mod\/([^\/]*)\//);
            if (typeof module[1] != "undefined") {
                var moduleSrc = $mmCourse.getModuleIconSrc(module[1]);
                img = '<img src="' + moduleSrc + '" width="16">';
            }
        }
        if (img) {
            img = '<span class="app-ico">' + img + '</span>';
        }
        return img;
    }
        function translateGradesTable(table) {
        var columns = angular.copy(table.columns),
            promises = [];
        columns.forEach(function(column) {
            var promise = $translate('mma.grades.'+column.name).then(function(translated) {
                column.name = translated;
            });
            promises.push(promise);
        });
        return $q.all(promises).then(function() {
            return {
                columns: columns,
                rows: table.rows
            };
        });
    };
        self.isPluginEnabled = function(siteId) {
        siteId = siteId || $mmSite.getId();
        return $mmSitesManager.getSite(siteId).then(function(site) {
            return site.wsAvailable('gradereport_user_get_grades_table');
        });
    };
        self.isPluginEnabledForCourse = function(courseId, siteId) {
        if (!courseId) {
            return $q.reject();
        }
        return $mmCourses.getUserCourse(courseId, true, siteId).then(function(course) {
            if (course && typeof course.showgrades != 'undefined' && !course.showgrades) {
                return false;
            }
            return true;
        });
    };
        self.isPluginEnabledForUser = function(courseId, userId) {
        var data = {
                courseid: courseId,
                userid: userId
            };
        return $mmSite.read('gradereport_user_get_grades_table', data, {}).then(function() {
            return true;
        }).catch(function() {
            return false;
        });
    };
        self.getGradesTable = function(courseid, userid, refresh) {
        $log.debug('Get grades for course ' + courseid + ' and user ' + userid);
        var data = {
                courseid : courseid,
                userid   : userid
            },
            presets = {};
        if (refresh) {
            presets.getFromCache = false;
        }
        return $mmSite.read('gradereport_user_get_grades_table', data, presets).then(function(table) {
            table = formatGradesTable(table, !$ionicPlatform.isTablet());
            return translateGradesTable(table);
        });
    };
    return self;
}]);

angular.module('mm.addons.grades')
.factory('$mmaGradesHandlers', ["$mmaGrades", "$state", "$mmUtil", "$mmContentLinksHelper", "mmCoursesAccessMethods", function($mmaGrades, $state, $mmUtil, $mmContentLinksHelper, mmCoursesAccessMethods) {
    var self = {},
        viewGradesEnabledCache = {};
        function getCacheKey(courseId, userId) {
        return courseId + '#' + userId;
    }
        self.clearViewGradesCache = function(courseId, userId) {
        if (courseId && userId) {
            delete viewGradesEnabledCache[getCacheKey(courseId, userId)];
        } else {
            viewGradesEnabledCache = {};
        }
    };
        self.coursesNav = function() {
        var self = {};
                self.isEnabled = function() {
            return $mmaGrades.isPluginEnabled();
        };
                self.isEnabledForCourse = function(courseId, accessData) {
            if (accessData && accessData.type == mmCoursesAccessMethods.guest) {
                return false;
            }
            return $mmaGrades.isPluginEnabledForCourse(courseId);
        };
                self.getController = function() {
                        return function($scope, $state) {
                $scope.icon = 'ion-stats-bars';
                $scope.title = 'mma.grades.grades';
                $scope.action = function($event, course) {
                    $event.preventDefault();
                    $event.stopPropagation();
                    $state.go('site.grades', {
                        course: course
                    });
                };
            };
        };
        return self;
    };
        self.viewGrades = function() {
        var self = {};
                self.isEnabled = function() {
            return $mmaGrades.isPluginEnabled();
        };
                self.isEnabledForUser = function(user, courseId) {
            return $mmaGrades.isPluginEnabledForCourse(courseId).then(function() {
                var cacheKey = getCacheKey(courseId, user.id);
                if (typeof viewGradesEnabledCache[cacheKey] != 'undefined') {
                    return viewGradesEnabledCache[cacheKey];
                }
                return $mmaGrades.isPluginEnabledForUser(courseId, user.id).then(function(enabled) {
                    viewGradesEnabledCache[cacheKey] = enabled;
                    return enabled;
                });
            });
        };
                self.getController = function(user, courseId) {
                        return function($scope) {
                $scope.title = 'mma.grades.viewgrades';
                $scope.action = function($event) {
                    $event.preventDefault();
                    $event.stopPropagation();
                    $state.go('site.grades', {
                        userid: user.id,
                        course: {id: courseId}
                    });
                };
            };
        };
        return self;
    };
        self.linksHandler = function() {
        var self = {};
                function isEnabled(siteId, courseId) {
            return $mmaGrades.isPluginEnabled(siteId).then(function(enabled) {
                if (enabled) {
                    return $mmaGrades.isPluginEnabledForCourse(courseId, siteId);
                }
            });
        }
                self.getActions = function(siteIds, url) {
            if (typeof self.handles(url) != 'undefined') {
                var params = $mmUtil.extractUrlParams(url);
                if (typeof params.id != 'undefined') {
                    var courseId = parseInt(params.id, 10);
                    return $mmContentLinksHelper.filterSupportedSites(siteIds, isEnabled, false, courseId).then(function(ids) {
                        if (!ids.length) {
                            return [];
                        } else {
                            return [{
                                message: 'mm.core.view',
                                icon: 'ion-eye',
                                sites: ids,
                                action: function(siteId) {
                                    var stateParams = {
                                        course: {id: courseId},
                                        userid: parseInt(params.userid, 10)
                                    };
                                    $mmContentLinksHelper.goInSite('site.grades', stateParams, siteId);
                                }
                            }];
                        }
                    });
                }
            }
            return [];
        };
                self.handles = function(url) {
            var position = url.indexOf('/grade/report/user/index.php');
            if (position > -1) {
                return url.substr(0, position);
            }
        };
        return self;
    };
    return self;
}])
.run(["$mmaGradesHandlers", "$mmEvents", "mmCoreEventLogout", "mmUserEventProfileRefreshed", function($mmaGradesHandlers, $mmEvents, mmCoreEventLogout, mmUserEventProfileRefreshed) {
    $mmEvents.on(mmCoreEventLogout, $mmaGradesHandlers.clearViewGradesCache);
    $mmEvents.on(mmUserEventProfileRefreshed, function(data) {
        if (data) {
            $mmaGradesHandlers.clearViewGradesCache(data.courseid, data.userid);
        }
    });
}]);

angular.module('mm.addons.messages')
.controller('mmaMessagesContactsCtrl', ["$scope", "$mmaMessages", "$mmSite", "$mmUtil", "$mmApp", "mmUserProfileState", "$translate", function($scope, $mmaMessages, $mmSite, $mmUtil, $mmApp, mmUserProfileState, $translate) {
    var currentUserId = $mmSite.getUserId(),
        searchingMessage = $translate.instant('mm.core.searching'),
        loadingMessage = $translate.instant('mm.core.loading');
    $scope.loaded = false;
    $scope.contactTypes = ['online', 'offline', 'blocked', 'strangers', 'search'];
    $scope.searchType = 'search';
    $scope.hasContacts = false;
    $scope.canSearch = $mmaMessages.isSearchEnabled;
    $scope.formData = {
        searchString: ''
    };
    $scope.userStateName = mmUserProfileState;
    $scope.refresh = function() {
        $mmaMessages.invalidateAllContactsCache(currentUserId).then(function() {
            return fetchContacts(true).then(function() {
                $scope.formData.searchString = '';
            });
        }).finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
    $scope.search = function(query) {
        if (query.length < 3) {
            return;
        }
        $mmApp.closeKeyboard();
        $scope.loaded = false;
        $scope.loadingMessage = searchingMessage;
        return $mmaMessages.searchContacts(query).then(function(result) {
            $scope.hasContacts = result.length > 0;
            $scope.contacts = {
                search: result
            };
        }).catch(function(error) {
            if (typeof error === 'string') {
                $mmUtil.showErrorModal(error);
            } else {
                $mmUtil.showErrorModal('mma.messages.errorwhileretrievingcontacts', true);
            }
        }).finally(function() {
            $scope.loaded = true;
        });
    };
    $scope.clearSearch = function() {
        $scope.loaded = false;
        fetchContacts().finally(function() {
            $scope.loaded = true;
        });
    };
    function fetchContacts() {
        $scope.loadingMessage = loadingMessage;
        return $mmaMessages.getAllContacts().then(function(contacts) {
            $scope.contacts = contacts;
            angular.forEach(contacts, function(contact) {
                if (contact.length > 0) {
                    $scope.hasContacts = true;
                }
            });
        }, function(error) {
            if (typeof error === 'string') {
                $mmUtil.showErrorModal(error);
            } else {
                $mmUtil.showErrorModal('mma.messages.errorwhileretrievingcontacts', true);
            }
        });
    }
    fetchContacts().finally(function() {
        $scope.loaded = true;
    });
}]);

angular.module('mm.addons.messages')
.controller('mmaMessagesDiscussionCtrl', ["$scope", "$stateParams", "$mmApp", "$mmaMessages", "$mmSite", "$timeout", "$mmEvents", "$window", "$ionicScrollDelegate", "mmUserProfileState", "$mmUtil", "mmaMessagesPollInterval", "$interval", "$log", "$ionicHistory", "$ionicPlatform", "mmCoreEventKeyboardShow", "mmCoreEventKeyboardHide", "mmaMessagesDiscussionLoadedEvent", "mmaMessagesDiscussionLeftEvent", "$mmUser", "$translate", "mmaMessagesNewMessageEvent", function($scope, $stateParams, $mmApp, $mmaMessages, $mmSite, $timeout, $mmEvents, $window,
        $ionicScrollDelegate, mmUserProfileState, $mmUtil, mmaMessagesPollInterval, $interval, $log, $ionicHistory, $ionicPlatform,
        mmCoreEventKeyboardShow, mmCoreEventKeyboardHide, mmaMessagesDiscussionLoadedEvent, mmaMessagesDiscussionLeftEvent,
        $mmUser, $translate, mmaMessagesNewMessageEvent) {
    $log = $log.getInstance('mmaMessagesDiscussionCtrl');
    var userId = $stateParams.userId,
        messagesBeingSent = 0,
        polling,
        fetching,
        backView = $ionicHistory.backView(),
        lastMessage,
        scrollView = $ionicScrollDelegate.$getByHandle('mmaMessagesScroll');
    $scope.loaded = false;
    $scope.messages = [];
    $scope.userId = userId;
    $scope.currentUserId = $mmSite.getUserId();
    if (backView && backView.stateName === mmUserProfileState) {
        $scope.profileLink = false;
    }
    if (userId) {
        $mmUser.getProfile(userId, undefined, true).then(function(user) {
            if (!$scope.title) {
                $scope.title = user.fullname;
            }
            if (typeof $scope.profileLink == 'undefined') {
                $scope.profileLink = user.profileimageurl;
            }
        }).catch(function() {
            $scope.profileLink = true;
        });
    }
    $scope.isAppOffline = function() {
        return !$mmApp.isOnline();
    };
    $scope.showDate = function(message, prevMessage) {
        if (!prevMessage) {
            return true;
        }
        return !moment(message.timecreated * 1000).isSame(prevMessage.timecreated * 1000, 'day');
    };
    $scope.sendMessage = function(text) {
        var message;
        if (!$mmApp.isOnline()) {
            return;
        } else if (!text.trim()) {
            return;
        }
        text = text.replace(/(?:\r\n|\r|\n)/g, '<br />');
        message = {
            sending: true,
            useridfrom: $scope.currentUserId,
            smallmessage: text,
            timecreated: ((new Date()).getTime() / 1000)
        };
        $scope.messages.push(message);
        messagesBeingSent++;
        $mmaMessages.sendMessage(userId, text).then(function() {
            message.sending = false;
            notifyNewMessage();
        }, function(error) {
            $mmApp.closeKeyboard();
            if (typeof error === 'string') {
                $mmUtil.showErrorModal(error);
            } else {
                $mmUtil.showErrorModal('mma.messages.messagenotsent', true);
            }
            $scope.messages.splice($scope.messages.indexOf(message), 1);
        }).finally(function() {
            messagesBeingSent--;
        });
    };
    $mmaMessages.getDiscussion(userId).then(function(messages) {
        $scope.messages = $mmaMessages.sortMessages(messages);
        if (!$scope.title && messages && messages.length > 0) {
            if (messages[0].useridto != $scope.currentUserId) {
                $scope.title = messages[0].usertofullname || '';
            } else {
                $scope.title = messages[0].userfromfullname || '';
            }
        }
        notifyNewMessage();
    }, function(error) {
        if (typeof error === 'string') {
            $mmUtil.showErrorModal(error);
        } else {
            $mmUtil.showErrorModal('mma.messages.errorwhileretrievingmessages', true);
        }
    }).finally(function() {
        $scope.loaded = true;
    });
    $scope.scrollAfterRender = function(scope) {
        if (scope.$last === true) {
            $timeout(function() {
                scrollView.scrollBottom();
                setScrollWithKeyboard();
            });
        }
    };
    function fetchMessages() {
        $log.debug('Polling new messages for discussion with user ' + userId);
        if (messagesBeingSent > 0) {
            return;
        } else if (!$mmApp.isOnline()) {
            return;
        } else if (fetching) {
            return;
        }
        fetching = true;
        $mmaMessages.invalidateDiscussionCache(userId);
        $mmaMessages.getDiscussion(userId).then(function(messages) {
            if (messagesBeingSent > 0) {
                return;
            }
            $scope.messages = $mmaMessages.sortMessages(messages);
            notifyNewMessage();
        }).finally(function() {
            fetching = false;
        });
    }
    function setPolling() {
        if (polling) {
            return;
        }
        polling = $interval(fetchMessages, mmaMessagesPollInterval);
    }
    function unsetPolling() {
        if (polling) {
            $log.debug('Cancelling polling for conversation with user ' + userId);
            $interval.cancel(polling);
            polling = undefined;
        }
    }
    if ($ionicPlatform.isTablet()) {
        $scope.$on('$viewContentLoaded', function(){
            setPolling();
        });
        $scope.$on('$destroy', function(){
            unsetPolling();
        });
    } else {
        $scope.$on('$ionicView.enter', function() {
            setPolling();
        });
        $scope.$on('$ionicView.leave', function(e) {
            unsetPolling();
        });
    }
    function notifyNewMessage() {
        var last = $scope.messages[$scope.messages.length - 1];
        if (last && last.smallmessage !== lastMessage) {
            lastMessage = last.smallmessage;
            $mmEvents.trigger(mmaMessagesNewMessageEvent, {
                siteid: $mmSite.getId(),
                userid: userId,
                message: lastMessage,
                timecreated: last.timecreated
            });
        }
    }
    function setScrollWithKeyboard() {
        if (ionic.Platform.isAndroid()) {
            $timeout(function() {
                var obsShow,
                    obsHide,
                    keyboardHeight,
                    maxInitialScroll = scrollView.getScrollView().__contentHeight - scrollView.getScrollView().__clientHeight,
                    initialHeight = $window.innerHeight;
                obsShow = $mmEvents.on(mmCoreEventKeyboardShow, function(e) {
                    $timeout(function() {
                        var heightDifference = initialHeight - $window.innerHeight,
                            newKeyboardHeight = heightDifference > 50 ? heightDifference : e.keyboardHeight;
                        if (newKeyboardHeight) {
                            keyboardHeight = newKeyboardHeight;
                            scrollView.scrollBy(0, newKeyboardHeight);
                        }
                    });
                });
                obsHide = $mmEvents.on(mmCoreEventKeyboardHide, function(e) {
                    if (!scrollView || !scrollView.getScrollPosition()) {
                        return;
                    }
                    if (scrollView.getScrollPosition().top >= maxInitialScroll) {
                        scrollView.scrollBy(0, scrollView.getScrollPosition().top - keyboardHeight - maxInitialScroll);
                    } else {
                        scrollView.scrollBy(0, - keyboardHeight);
                    }
                });
                $scope.$on('$destroy', function() {
                    obsShow && obsShow.off && obsShow.off();
                    obsHide && obsHide.off && obsHide.off();
                });
            });
        }
    }
    $scope.canDelete = $mmaMessages.canDeleteMessages();
    $scope.selectMessage = function(id) {
        $scope.selectedMessage = id;
    };
    $scope.deleteMessage = function(message, index) {
        $mmUtil.showConfirm($translate('mma.messages.deletemessageconfirmation')).then(function() {
            var modal = $mmUtil.showModalLoading('mm.core.deleting', true);
            $mmaMessages.deleteMessage(message.id, message.read).then(function() {
                $scope.messages.splice(index, 1);
                fetchMessages();
            }).catch(function(error) {
                if (typeof error === 'string') {
                    $mmUtil.showErrorModal(error);
                } else {
                    $mmUtil.showErrorModal('mma.messages.errordeletemessage', true);
                }
            }).finally(function() {
                modal.dismiss();
            });
        });
    };
    if ($ionicPlatform.isTablet()) {
        $mmEvents.trigger(mmaMessagesDiscussionLoadedEvent, userId);
    }
    $scope.$on('$destroy', function() {
        if ($ionicPlatform.isTablet()) {
            $mmEvents.trigger(mmaMessagesDiscussionLeftEvent);
        }
    });
}]);

angular.module('mm.addons.messages')
.controller('mmaMessagesDiscussionsCtrl', ["$scope", "$mmUtil", "$mmaMessages", "$rootScope", "$mmEvents", "$mmSite", "mmCoreSplitViewLoad", "mmaMessagesNewMessageEvent", function($scope, $mmUtil, $mmaMessages, $rootScope, $mmEvents, $mmSite,
            mmCoreSplitViewLoad, mmaMessagesNewMessageEvent) {
    var newMessagesObserver,
        siteId = $mmSite.getId(),
        discussions;
    $scope.loaded = false;
    function fetchDiscussions() {
        return $mmaMessages.getDiscussions().then(function(discs) {
            discussions = discs;
            var array = [];
            angular.forEach(discussions, function(v) {
                array.push(v);
            });
            $scope.discussions = array;
        }, function(error) {
            if (typeof error === 'string') {
                $mmUtil.showErrorModal(error);
            } else {
                $mmUtil.showErrorModal('mma.messages.errorwhileretrievingdiscussions', true);
            }
        });
    }
    function refreshData() {
        return $mmaMessages.invalidateDiscussionsCache().then(function() {
            return fetchDiscussions();
        });
    }
    $scope.refresh = function() {
        refreshData().finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
    fetchDiscussions().finally(function() {
        $scope.loaded = true;
        $rootScope.$broadcast(mmCoreSplitViewLoad);
    });
    newMessagesObserver = $mmEvents.on(mmaMessagesNewMessageEvent, function(data) {
        var discussion;
        if (data && data.siteid == siteId && data.userid) {
            discussion = discussions[data.userid];
            if (typeof discussion == 'undefined') {
                $scope.loaded = false;
                refreshData().finally(function() {
                    $scope.loaded = true;
                });
            } else if (data.timecreated > discussion.message.timecreated) {
                discussion.message.message = data.message;
                discussion.message.timecreated = data.timecreated;
            }
        }
    });
    $scope.$on('$destroy', function() {
        if (newMessagesObserver && newMessagesObserver.off) {
            newMessagesObserver.off();
        }
    });
}]);

angular.module('mm.addons.messages')
.controller('mmaMessagesIndexCtrl', ["$scope", "$mmEvents", "$ionicPlatform", "$ionicTabsDelegate", "$mmUser", "mmaMessagesDiscussionLoadedEvent", "mmaMessagesDiscussionLeftEvent", function($scope, $mmEvents, $ionicPlatform, $ionicTabsDelegate, $mmUser,
            mmaMessagesDiscussionLoadedEvent, mmaMessagesDiscussionLeftEvent) {
    var obsLoaded = $mmEvents.on(mmaMessagesDiscussionLoadedEvent, function(userId) {
        if ($ionicPlatform.isTablet()) {
            $scope.userId = userId;
            $mmUser.getProfile(userId, undefined, true).catch(function() {
                return {
                    profileimageurl: true
                };
            }).then(function(user) {
                if ($scope.userId == userId) {
                    $scope.profileLink = user.profileimageurl || true;
                }
            });
        }
    });
    var obsLeft = $mmEvents.on(mmaMessagesDiscussionLeftEvent, function() {
        $scope.profileLink = false;
    });
    $scope.$on('$destroy', function() {
        if (obsLoaded && obsLoaded.off) {
            obsLoaded.off();
        }
        if (obsLeft && obsLeft.off) {
            obsLeft.off();
        }
    });
}]);

angular.module('mm.addons.messages')
.filter('mmaMessagesFormat', ["$mmText", function($mmText) {
  return function(text) {
    text = text.replace(/-{4,}/ig, '');
    text = text.replace(/<br \/><br \/>/ig, "<br />");
    text = $mmText.replaceNewLines(text, '<br />');
    return text;
  };
}]);

angular.module('mm.addons.messages')
.factory('$mmaMessagesHandlers', ["$log", "$mmaMessages", "$mmSite", "$state", "$mmUtil", "$mmContentLinksHelper", function($log, $mmaMessages, $mmSite, $state, $mmUtil, $mmContentLinksHelper) {
    $log = $log.getInstance('$mmaMessagesHandlers');
    var self = {};
        self.addContact = function() {
        var self = {};
        self.isEnabled = function() {
            return $mmaMessages.isPluginEnabled();
        };
        self.isEnabledForUser = function(user, courseId) {
            return user.id != $mmSite.getUserId();
        };
                self.getController = function(user, courseid) {
            return function($scope, $rootScope) {
                var disabled = false;
                function updateTitle() {
                    return $mmaMessages.isContact(user.id).then(function(isContact) {
                        if (isContact) {
                            $scope.title = 'mma.messages.removecontact';
                        } else {
                            $scope.title = 'mma.messages.addcontact';
                        }
                    }).catch(function() {
                        $scope.hidden = true;
                    });
                }
                $scope.title = '';
                $scope.spinner = false;
                $scope.action = function($event) {
                    if (disabled) {
                        return;
                    }
                    disabled = true;
                    $scope.spinner = true;
                    $mmaMessages.isContact(user.id).then(function(isContact) {
                        if (isContact) {
                            return $mmaMessages.removeContact(user.id);
                        } else {
                            return $mmaMessages.addContact(user.id);
                        }
                    }).catch(function(error) {
                        $mmUtil.showErrorModal(error);
                    }).finally(function() {
                        $rootScope.$broadcast('mmaMessagesHandlers:addUpdated');
                        updateTitle().finally(function() {
                            disabled = false;
                            $scope.spinner = false;
                        });
                    });
                };
                $scope.$on('mmaMessagesHandlers:blockUpdated', function() {
                    updateTitle();
                });
                updateTitle();
            };
        };
        return self;
    };
        self.blockContact = function() {
        var self = {};
        self.isEnabled = function() {
            return $mmaMessages.isPluginEnabled();
        };
        self.isEnabledForUser = function(user, courseId) {
            return user.id != $mmSite.getUserId();
        };
        self.getController = function(user, courseid) {
                        return function($scope, $rootScope) {
                var disabled = false;
                function updateTitle() {
                    return $mmaMessages.isBlocked(user.id).then(function(isBlocked) {
                        if (isBlocked) {
                            $scope.title = 'mma.messages.unblockcontact';
                        } else {
                            $scope.title = 'mma.messages.blockcontact';
                        }
                    }).catch(function() {
                        $scope.hidden = true;
                    });
                }
                $scope.title = '';
                $scope.spinner = false;
                $scope.action = function($event) {
                    if (disabled) {
                        return;
                    }
                    disabled = true;
                    $scope.spinner = true;
                    $mmaMessages.isBlocked(user.id).then(function(isBlocked) {
                        if (isBlocked) {
                            return $mmaMessages.unblockContact(user.id);
                        } else {
                            return $mmaMessages.blockContact(user.id);
                        }
                    }).catch(function(error) {
                        $mmUtil.showErrorModal(error);
                    }).finally(function() {
                        $rootScope.$broadcast('mmaMessagesHandlers:blockUpdated');
                        updateTitle().finally(function() {
                            disabled = false;
                            $scope.spinner = false;
                        });
                    });
                };
                $scope.$on('mmaMessagesHandlers:addUpdated', function() {
                    updateTitle();
                });
                updateTitle();
            };
        };
        return self;
    };
        self.sendMessage = function() {
        var self = {};
        self.isEnabled = function() {
            return $mmaMessages.isPluginEnabled();
        };
        self.isEnabledForUser = function(user, courseId) {
            return user.id != $mmSite.getUserId();
        };
        self.getController = function(user, courseid) {
                        return function($scope) {
                $scope.title = 'mma.messages.sendmessage';
                $scope.action = function($event) {
                    $event.preventDefault();
                    $event.stopPropagation();
                    $state.go('site.messages-discussion', {
                        userId: user.id
                    });
                };
            };
        };
        return self;
    };
        self.sideMenuNav = function() {
        var self = {};
                self.isEnabled = function() {
            return $mmaMessages.isPluginEnabled();
        };
                self.getController = function() {
                        return function($scope) {
                $scope.icon = 'ion-chatbox';
                $scope.title = 'mma.messages.messages';
                $scope.state = 'site.messages';
            };
        };
        return self;
    };
        self.linksHandler = function() {
        var self = {};
                function isEnabledForSite(siteId) {
            return $mmaMessages.isPluginEnabled(siteId);
        }
                self.getActions = function(siteIds, url) {
            if (typeof self.handles(url) != 'undefined') {
                return $mmContentLinksHelper.filterSupportedSites(siteIds, isEnabledForSite, false).then(function(ids) {
                    if (!ids.length) {
                        return [];
                    } else {
                        var params = $mmUtil.extractUrlParams(url);
                        return [{
                            message: 'mm.core.view',
                            icon: 'ion-eye',
                            sites: ids,
                            action: function(siteId) {
                                var stateName,
                                    stateParams;
                                if (typeof params.user1 != 'undefined' && typeof params.user2 != 'undefined') {
                                    if ($mmSite.getUserId() == params.user1) {
                                        stateName = 'site.messages-discussion';
                                        stateParams = {userId: parseInt(params.user2, 10)};
                                    } else if ($mmSite.getUserId() == params.user2) {
                                        stateName = 'site.messages-discussion';
                                        stateParams = {userId: parseInt(params.user1, 10)};
                                    } else {
                                        $mmUtil.openInBrowser(url);
                                        return;
                                    }
                                } else if (typeof params.id != 'undefined') {
                                    stateName = 'site.messages-discussion';
                                    stateParams = {userId: parseInt(params.id, 10)};
                                }
                                if (!stateName) {
                                    $state.go('redirect', {
                                        siteid: siteId,
                                        state: 'site.messages',
                                        params: {}
                                    });
                                } else {
                                    $mmContentLinksHelper.goInSite(stateName, stateParams, siteId);
                                }
                            }
                        }];
                    }
                });
            }
            return [];
        };
                self.handles = function(url) {
            var position = url.indexOf('/message/index.php');
            if (position > -1) {
                return url.substr(0, position);
            }
        };
        return self;
    };
    return self;
}]);

angular.module('mm.addons.messages')
.factory('$mmaMessages', ["$mmSite", "$mmSitesManager", "$log", "$q", "$mmUser", "mmaMessagesNewMessageEvent", function($mmSite, $mmSitesManager, $log, $q, $mmUser, mmaMessagesNewMessageEvent) {
    $log = $log.getInstance('$mmaMessages');
    var self = {};
        self.addContact = function(userId) {
        return $mmSite.write('core_message_create_contacts', {
            userids: [ userId ]
        }).then(function() {
            return self.invalidateAllContactsCache($mmSite.getUserId());
        });
    };
        self.blockContact = function(userId) {
        return $mmSite.write('core_message_block_contacts', {
            userids: [ userId ]
        }).then(function() {
            return self.invalidateAllContactsCache($mmSite.getUserId());
        });
    };
        self.canDeleteMessages = function() {
        return $mmSite.wsAvailable('core_message_delete_message');
    };
        self.deleteMessage = function(id, read, userId) {
        userId = userId || $mmSite.getUserId();
        var params = {
                messageid: id,
                userid: userId,
                read: read
            };
        return $mmSite.write('core_message_delete_message', params).then(function() {
            return self.invalidateDiscussionCache(userId);
        });
    };
        self.getAllContacts = function() {
        return self.getContacts().then(function(contacts) {
            return self.getBlockedContacts().then(function(blocked) {
                contacts.blocked = blocked.users;
                storeUsersFromAllContacts(contacts);
                return contacts;
            }, function() {
                contacts.blocked = [];
                storeUsersFromAllContacts(contacts);
                return contacts;
            });
        });
    };
        self.getBlockedContacts = function() {
        var params = {
                userid: $mmSite.getUserId()
            },
            presets = {
                cacheKey: self._getCacheKeyForBlockedContacts($mmSite.getUserId())
            },
            deferred;
        if (!$mmSite.wsAvailable('core_message_get_blocked_users')) {
            deferred = $q.defer();
            deferred.resolve({users: [], warnings: []});
            return deferred.promise;
        }
        return $mmSite.read('core_message_get_blocked_users', params, presets);
    };
        self._getCacheKeyForContacts = function() {
        return 'mmaMessages:contacts';
    };
        self._getCacheKeyForBlockedContacts = function(userId) {
        return 'mmaMessages:blockedContacts:' + userId;
    };
        self._getCacheKeyForDiscussion = function(userId) {
        return 'mmaMessages:discussion:' + userId;
    };
        self._getCacheKeyForDiscussions = function() {
        return 'mmaMessages:discussions';
    };
        self._getCacheKeyForEnabled = function() {
        return 'mmaMessages:enabled';
    };
        self.getContacts = function() {
        var presets = {
                cacheKey: self._getCacheKeyForContacts()
            };
        return $mmSite.read('core_message_get_contacts', undefined, presets);
    };
        self.getDiscussionEventName = function(userid) {
        return mmaMessagesNewMessageEvent + '_' + $mmSite.getUserId() + '_' + userid;
    };
        self.getDiscussion = function(userId) {
        var messages,
            presets = {
                cacheKey: self._getCacheKeyForDiscussion(userId)
            },
            params = {
                useridto: $mmSite.getUserId(),
                useridfrom: userId,
                limitfrom: 0,
                limitnum: 50
            };
        return self._getRecentMessages(params, presets).then(function(response) {
            messages = response;
            params.useridto = userId;
            params.useridfrom = $mmSite.getUserId();
            return self._getRecentMessages(params, presets).then(function(response) {
                return messages.concat(response);
            });
        });
    };
        self.getDiscussions = function() {
        var discussions = {},
            presets = {
                cacheKey: self._getCacheKeyForDiscussions()
            },
            promise;
        return self._getRecentMessages({
            useridto: $mmSite.getUserId(),
            useridfrom: 0,
            limitfrom: 0,
            limitnum: 50
        }, presets).then(function(messages) {
            angular.forEach(messages, function(message) {
                if (typeof discussions[message.useridfrom] === 'undefined') {
                    discussions[message.useridfrom] = {
                        fullname: message.userfromfullname,
                        profileimageurl: ""
                    };
                    if (!message.timeread) {
                        discussions[message.useridfrom].unread = true;
                    }
                }
                if (typeof discussions[message.useridfrom].message === 'undefined' ||
                        discussions[message.useridfrom].message.timecreated < message.timecreated) {
                    discussions[message.useridfrom].message = {
                        user: message.useridfrom,
                        message: message.smallmessage,
                        timecreated: message.timecreated
                    };
                }
            });
            return self._getRecentMessages({
                useridfrom: $mmSite.getUserId(),
                useridto: 0,
                limitfrom: 0,
                limitnum: 50
            }, presets).then(function(messages) {
                angular.forEach(messages, function(message) {
                    if (typeof discussions[message.useridto] === 'undefined') {
                        discussions[message.useridto] = {
                            fullname: message.usertofullname,
                            profileimageurl: ""
                        };
                        if (!message.timeread) {
                            discussions[message.useridto].unread = true;
                        }
                    }
                    if (typeof discussions[message.useridto].message === 'undefined' ||
                            discussions[message.useridto].message.timecreated < message.timecreated) {
                        discussions[message.useridto].message = {
                            user: message.useridto,
                            message: message.smallmessage,
                            timecreated: message.timecreated
                        };
                    }
                });
                return self.getContacts().then(function(contacts) {
                    var types = ['online', 'offline', 'strangers'];
                    angular.forEach(types, function(type) {
                        if (contacts[type] && contacts[type].length > 0) {
                            angular.forEach(contacts[type], function(contact) {
                                if (typeof discussions[contact.id] === 'undefined' && contact.unread) {
                                    discussions[contact.id] = {
                                        fullname: contact.fullname,
                                        profileimageurl: "",
                                        message: {
                                            user: contact.id,
                                            message: "...",
                                            timecreated: 0,
                                        }
                                    };
                                }
                                if (typeof discussions[contact.id] !== 'undefined') {
                                    if (contact.profileimageurl) {
                                        discussions[contact.id].profileimageurl = contact.profileimageurl;
                                    }
                                    if (typeof contact.unread !== 'undefined') {
                                        discussions[contact.id].unread = contact.unread;
                                    }
                                }
                            });
                        }
                    });
                    return self.getDiscussionsUserImg(discussions).then(function(discussions) {
                        storeUsersFromDiscussions(discussions);
                        return discussions;
                    });
                });
            });
        });
    };
        self.getDiscussionsUserImg = function(discussions) {
        var promises = [];
        angular.forEach(discussions, function(discussion) {
            if (!discussion.profileimageurl) {
                var promise = $mmUser.getProfile(discussion.message.user, 1, true).then(function(user) {
                    discussion.profileimageurl = user.profileimageurl;
                }, function() {
                });
                promises.push(promise);
            }
        });
        return $q.all(promises).then(function() {
            return discussions;
        });
    };
        self._getMessages = function(params, presets) {
        params = angular.extend(params, {
            type: 'conversations',
            newestfirst: 1,
        });
        return $mmSite.read('core_message_get_messages', params, presets).then(function(response) {
            angular.forEach(response.messages, function(message) {
                message.read = params.read == 0 ? 0 : 1;
            });
            return response;
        });
    };
        self._getRecentMessages = function(params, presets) {
        params = angular.extend(params, {
            read: 0
        });
        return self._getMessages(params, presets).then(function(response) {
            var messages = response.messages;
            if (messages) {
                if (messages.length >= params.limitnum) {
                    return messages;
                }
                params.limitnum = params.limitnum - messages.length;
                params.read = 1;
                return self._getMessages(params, presets).then(function(response) {
                    if (response.messages) {
                        messages = messages.concat(response.messages);
                    }
                    return messages;
                }, function() {
                    return messages;
                });
            } else {
                return $q.reject();
            }
        });
    };
        self.invalidateAllContactsCache = function(userId) {
        return self.invalidateContactsCache().then(function() {
            return self.invalidateBlockedContactsCache(userId);
        });
    };
        self.invalidateBlockedContactsCache = function(userId) {
        return $mmSite.invalidateWsCacheForKey(self._getCacheKeyForBlockedContacts(userId));
    };
        self.invalidateContactsCache = function() {
        return $mmSite.invalidateWsCacheForKey(self._getCacheKeyForContacts());
    };
        self.invalidateDiscussionCache = function(userId) {
        return $mmSite.invalidateWsCacheForKey(self._getCacheKeyForDiscussion(userId));
    };
        self.invalidateDiscussionsCache = function(userId) {
        return $mmSite.invalidateWsCacheForKey(self._getCacheKeyForDiscussions()).then(function(){
            return self.invalidateContactsCache();
        });
    };
        self.invalidateEnabledCache = function() {
        return $mmSite.invalidateWsCacheForKey(self._getCacheKeyForEnabled());
    };
        self.isBlocked = function(userId) {
        return self.getBlockedContacts().then(function(blockedContacts) {
            var blocked = false;
            if (!blockedContacts.users || blockedContacts.users.length < 1) {
                return blocked;
            }
            angular.forEach(blockedContacts.users, function(user) {
                if (userId == user.id) {
                    blocked = true;
                }
            });
            return blocked;
        });
    };
        self.isContact = function(userId) {
        return self.getContacts().then(function(contacts) {
            var isContact = false,
                types = ['online', 'offline'];
            angular.forEach(types, function(type) {
                if (contacts[type] && contacts[type].length > 0) {
                    angular.forEach(contacts[type], function(user) {
                        if (userId == user.id) {
                            isContact = true;
                        }
                    });
                }
            });
            return isContact;
        });
    };
        self._isMessagingEnabled = function(siteId) {
        siteId = siteId || $mmSite.getId();
        return $mmSitesManager.getSite(siteId).then(function(site) {
            var enabled = site.canUseAdvancedFeature('messaging', 'unknown');
            if (enabled === 'unknown') {
                $log.debug('Using WS call to check if messaging is enabled.');
                return site.read('core_message_search_contacts', {
                    searchtext: 'CheckingIfMessagingIsEnabled',
                    onlymycourses: 0
                }, {
                    emergencyCache: false,
                    cacheKey: self._getCacheKeyForEnabled()
                });
            }
            if (enabled) {
                return true;
            }
            return $q.reject();
        });
    };
       self.isMessagingEnabledForSite = function(siteid) {
        return $mmSitesManager.getSite(siteid).then(function(site) {
            if (!site.canUseAdvancedFeature('messaging') || !site.wsAvailable('core_message_get_messages')) {
                return $q.reject();
            }
            $log.debug('Using WS call to check if messaging is enabled.');
            return site.read('core_message_search_contacts', {
                searchtext: 'CheckingIfMessagingIsEnabled',
                onlymycourses: 0
            }, {
                emergencyCache: false,
                cacheKey: self._getCacheKeyForEnabled()
            });
        });
    };
        self.isPluginEnabled = function(siteId) {
        siteId = siteId || $mmSite.getId();
        return $mmSitesManager.getSite(siteId).then(function(site) {
            if (!site.canUseAdvancedFeature('messaging')) {
                return false;
            } else if (!site.wsAvailable('core_message_get_messages')) {
                return false;
            } else {
                return self._isMessagingEnabled(siteId).then(function() {
                    return true;
                });
            }
        });
    };
        self.isSearchEnabled = function() {
        return $mmSite.wsAvailable('core_message_search_contacts');
    };
        self.removeContact = function(userId) {
        return $mmSite.write('core_message_delete_contacts', {
            userids: [ userId ]
        }, {
            responseExpected: false
        }).then(function() {
            return self.invalidateContactsCache();
        });
    };
        self.searchContacts = function(query, limit) {
        var data = {
                searchtext: query,
                onlymycourses: 0
            };
        limit = typeof limit === 'undefined' ? 100 : limit;
        return $mmSite.read('core_message_search_contacts', data).then(function(contacts) {
            if (limit && contacts.length > limit) {
                contacts = contacts.splice(0, limit);
            }
            $mmUser.storeUsers(contacts);
            return contacts;
        });
    };
        self.sendMessage = function(to, message) {
        return $mmSite.write('core_message_send_instant_messages', {
            messages: [
                {
                    touserid: to,
                    text: message,
                    textformat: 1
                }
            ]
        }).then(function(response) {
            if (response && response[0] && response[0].msgid === -1) {
                return $q.reject(response[0].errormessage);
            }
            return self.invalidateDiscussionCache(to);
        });
    };
        self.sortMessages = function(messages) {
        return messages.sort(function (a, b) {
            a = parseInt(a.timecreated, 10);
            b = parseInt(b.timecreated, 10);
            return a >= b ? 1 : -1;
        });
    };
        function storeUsersFromAllContacts(contactTypes) {
        angular.forEach(contactTypes, function(contacts) {
            $mmUser.storeUsers(contacts);
        });
    }
        function storeUsersFromDiscussions(discussions) {
        angular.forEach(discussions, function(discussion, userid) {
            if (typeof userid != 'undefined' && !isNaN(parseInt(userid))) {
                $mmUser.storeUser(userid, discussion.fullname, discussion.profileimageurl);
            }
        });
    }
        self.unblockContact = function(userId) {
        return $mmSite.write('core_message_unblock_contacts', {
            userids: [ userId ]
        }, {
            responseExpected: false
        }).then(function() {
            return self.invalidateAllContactsCache($mmSite.getUserId());
        });
    };
    return self;
}]);

angular.module('mm.addons.mod_assign')
.controller('mmaModAssignIndexCtrl', ["$scope", "$stateParams", "$mmaModAssign", "$mmUtil", "$translate", "mmaModAssignComponent", "mmaModAssignSubmissionComponent", function($scope, $stateParams, $mmaModAssign, $mmUtil, $translate,
        mmaModAssignComponent, mmaModAssignSubmissionComponent) {
    var module = $stateParams.module || {},
        courseid = $stateParams.courseid;
    $scope.title = module.name;
    $scope.description = module.description;
    $scope.assigncomponent = mmaModAssignComponent;
    $scope.submissioncomponent = mmaModAssignSubmissionComponent;
    $scope.assignurl = module.url;
    $scope.courseid = courseid;
    function fetchAssignment(refresh) {
        return $mmaModAssign.getAssignment(courseid, module.id, refresh).then(function(assign) {
            $scope.title = assign.name || $scope.title;
            $scope.description = assign.intro || $scope.description;
            $scope.assign = assign;
            return $mmaModAssign.getSubmissions(assign.id, refresh).then(function(data) {
                $scope.canviewsubmissions = data.canviewsubmissions;
                if (data.canviewsubmissions) {
                    return $mmaModAssign.getSubmissionsUserData(data.submissions, courseid).then(function(submissions) {
                        angular.forEach(submissions, function(submission) {
                            submission.text = $mmaModAssign.getSubmissionText(submission);
                            submission.attachments = $mmaModAssign.getSubmissionAttachments(submission);
                        });
                        $scope.submissions = submissions;
                    });
                }
            }, function() {
                if (error) {
                    $mmUtil.showErrorModal(error);
                } else {
                    $translate('mm.core.error').then(function(error) {
                        $mmUtil.showErrorModal(error + ': get_assignment_submissions');
                    });
                }
            });
        }, function(error) {
            if (error) {
                $mmUtil.showErrorModal(error);
            } else {
                $translate('mm.core.error').then(function(error) {
                    $mmUtil.showErrorModal(error + ': get_assignment');
                });
            }
        });
    }
    fetchAssignment().finally(function() {
        $scope.assignmentLoaded = true;
    });
    $scope.refreshAssignment = function() {
        fetchAssignment(true).finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
}]);

angular.module('mm.addons.mod_assign')
.controller('mmaModAssignSubmissionCtrl', ["$scope", "$stateParams", "mmaModAssignSubmissionComponent", function($scope, $stateParams, mmaModAssignSubmissionComponent) {
    var submission = $stateParams.submission || {};
    $scope.title = submission.userfullname;
    $scope.submission = submission;
    $scope.component = mmaModAssignSubmissionComponent;
}]);

angular.module('mm.addons.mod_assign')
.factory('$mmaModAssign', ["$mmSite", "$q", "$mmUser", "$mmSitesManager", function($mmSite, $q, $mmUser, $mmSitesManager) {
    var self = {};
        self.getAssignment = function(courseid, cmid, refresh) {
        var params = {
                "courseids": [courseid]
            },
            preSets = {};
        if (refresh) {
            preSets.getFromCache = false;
        }
        return $mmSite.read('mod_assign_get_assignments', params, preSets).then(function(response) {
            if (response.courses && response.courses.length) {
                var assignments = response.courses[0].assignments;
                for (var i = 0; i < assignments.length; i++) {
                    if (assignments[i].cmid == cmid) {
                        return assignments[i];
                    }
                }
                return $q.reject();
            } else {
                return $q.reject();
            }
        });
    };
        self.getSubmissionAttachments = function(submission) {
        var files = [];
        if (submission.plugins) {
            submission.plugins.forEach(function(plugin) {
                if (plugin.type === 'file' && plugin.fileareas && plugin.fileareas[0] && plugin.fileareas[0].files) {
                    files = plugin.fileareas[0].files;
                    angular.forEach(files, function(file) {
                        file.filename = file.filepath;
                    });
                }
            });
        }
        return files;
    };
        self.getSubmissionText = function(submission) {
        var text = '';
        if (submission.plugins) {
            angular.forEach(submission.plugins, function(plugin) {
                if (plugin.type === 'onlinetext' && plugin.editorfields) {
                    text = plugin.editorfields[0].text;
                    if (plugin.fileareas && plugin.fileareas[0] && plugin.fileareas[0].files && plugin.fileareas[0].files[0]) {
                        var fileURL =  plugin.fileareas[0].files[0].fileurl;
                        fileURL = fileURL.substr(0, fileURL.lastIndexOf('/')).replace('pluginfile.php/', 'pluginfile.php?file=/');
                        text = text.replace(/@@PLUGINFILE@@/g, fileURL);
                    }
                }
            });
        }
        return text;
    };
        self.getSubmissions = function(id, refresh) {
        var params = {
                "assignmentids": [id]
            },
            preSets = {};
        if (refresh) {
            preSets.getFromCache = false;
        }
        return $mmSite.read('mod_assign_get_submissions', params, preSets).then(function(response) {
            if (response.warnings.length > 0 && response.warnings[0].warningcode == 1) {
                return {canviewsubmissions: false};
            } else {
                if (response.assignments && response.assignments.length) {
                    return {
                        canviewsubmissions: true,
                        submissions: response.assignments[0].submissions
                    };
                } else {
                    return $q.reject();
                }
            }
        });
    };
        self.getSubmissionsUserData = function(submissions, courseid) {
        var promises = [];
        angular.forEach(submissions, function(submission) {
            var promise = $mmUser.getProfile(submission.userid, courseid, true).then(function(user) {
                submission.userfullname = user.fullname;
                submission.userprofileimageurl = user.profileimageurl;
            }, function() {
            });
            promises.push(promise);
        });
        return $q.all(promises).then(function() {
            return submissions;
        });
    };
        self.isPluginEnabled = function(siteId) {
        siteId = siteId || $mmSite.getId();
        return $mmSitesManager.getSite(siteId).then(function(site) {
            return site.wsAvailable('mod_assign_get_assignments') && site.wsAvailable('mod_assign_get_submissions');
        });
    };
    return self;
}]);

angular.module('mm.addons.mod_assign')
.factory('$mmaModAssignHandlers', ["$mmCourse", "$mmaModAssign", "$state", "$q", "$mmContentLinksHelper", function($mmCourse, $mmaModAssign, $state, $q, $mmContentLinksHelper) {
    var self = {};
        self.courseContent = function() {
        var self = {};
                self.isEnabled = function() {
            return $mmaModAssign.isPluginEnabled();
        };
                self.getController = function(module, courseid) {
            return function($scope) {
                $scope.title = module.name;
                $scope.icon = $mmCourse.getModuleIconSrc('assign');
                $scope.action = function(e) {
                    if (e) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    $state.go('site.mod_assign', {module: module, courseid: courseid});
                };
            };
        };
        return self;
    };
        self.linksHandler = function() {
        var self = {};
                function isEnabled(siteId, courseId) {
            return $mmaModAssign.isPluginEnabled(siteId).then(function(enabled) {
                if (!enabled) {
                    return false;
                }
                return courseId || $mmCourse.canGetModuleWithoutCourseId(siteId);
            });
        }
                self.getActions = function(siteIds, url, courseId) {
            if (typeof self.handles(url) != 'undefined') {
                return $mmContentLinksHelper.treatModuleIndexUrl(siteIds, url, isEnabled, courseId);
            }
            return $q.when([]);
        };
                self.handles = function(url) {
            var position = url.indexOf('/mod/assign/view.php');
            if (position > -1) {
                return url.substr(0, position);
            }
        };
        return self;
    };
    return self;
}]);

angular.module('mm.addons.mod_book')
.controller('mmaModBookIndexCtrl', ["$scope", "$stateParams", "$mmUtil", "$mmaModBook", "$log", "mmaModBookComponent", "$ionicPopover", "$mmApp", "$q", "$mmCourse", "$ionicScrollDelegate", function($scope, $stateParams, $mmUtil, $mmaModBook, $log, mmaModBookComponent,
            $ionicPopover, $mmApp, $q, $mmCourse, $ionicScrollDelegate) {
    $log = $log.getInstance('mmaModBookIndexCtrl');
    var module = $stateParams.module || {},
        courseid = $stateParams.courseid,
        currentChapter,
        contentsMap = $mmaModBook.getContentsMap(module.contents);
    $scope.title = module.name;
    $scope.description = module.description;
    $scope.component = mmaModBookComponent;
    $scope.componentId = module.id;
    $scope.externalUrl = module.url;
    $scope.loaded = false;
    var chapters = $mmaModBook.getTocList(module.contents);
    currentChapter = $mmaModBook.getFirstChapter(chapters);
    function loadChapter(chapterId) {
        currentChapter = chapterId;
        $ionicScrollDelegate.scrollTop();
        return $mmaModBook.getChapterContent(contentsMap, chapterId, module.id).then(function(content) {
            $scope.content = content;
            $scope.previousChapter = $mmaModBook.getPreviousChapter(chapters, chapterId);
            $scope.nextChapter = $mmaModBook.getNextChapter(chapters, chapterId);
        }).catch(function() {
            $mmUtil.showErrorModal('mma.mod_book.errorchapter', true);
            return $q.reject();
        }).finally(function() {
            $scope.loaded = true;
            $ionicScrollDelegate.resize();
        });
    }
    function fetchContent(chapterId) {
        var downloadFailed = false;
        return $mmaModBook.downloadAllContent(module).catch(function() {
            downloadFailed = true;
        }).finally(function() {
            return loadChapter(chapterId).then(function() {
                if (downloadFailed && $mmApp.isOnline()) {
                    $mmUtil.showErrorModal('mm.core.errordownloadingsomefiles', true);
                }
            });
        });
    }
    $scope.doRefresh = function() {
        $mmaModBook.invalidateContent(module.id).then(function() {
            return fetchContent(currentChapter);
        }).finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
    $scope.loadChapter = function(chapterId) {
        $scope.popover.hide();
        $scope.loaded = false;
        loadChapter(chapterId);
    };
    $scope.toc = chapters;
    $ionicPopover.fromTemplateUrl('addons/mod_book/templates/toc.html', {
        scope: $scope,
    }).then(function(popover) {
        $scope.popover = popover;
    });
    fetchContent(currentChapter).then(function() {
        $mmaModBook.logView(module.instance).then(function() {
            $mmCourse.checkModuleCompletion(courseid, module.completionstatus);
        });
    });
}]);

angular.module('mm.addons.mod_book')
.directive('mmaModBookArrows', function() {
    return {
        restrict: 'E',
        scope: {
            previous: '=?',
            next: '=?',
            action: '=?'
        },
        templateUrl: 'addons/mod_book/templates/arrows.html'
    };
});

angular.module('mm.addons.mod_book')
.factory('$mmaModBook', ["$mmFilepool", "$mmSite", "$mmFS", "$http", "$log", "$q", "$mmSitesManager", "$mmUtil", "mmaModBookComponent", function($mmFilepool, $mmSite, $mmFS, $http, $log, $q, $mmSitesManager, $mmUtil, mmaModBookComponent) {
    $log = $log.getInstance('$mmaModBook');
    var self = {};
        self.downloadAllContent = function(module) {
        var files = self.getDownloadableFiles(module),
            revision = $mmFilepool.getRevisionFromFileList(module.contents),
            timemod = $mmFilepool.getTimemodifiedFromFileList(module.contents);
        return $mmFilepool.downloadPackage($mmSite.getId(), files, mmaModBookComponent, module.id, revision, timemod);
    };
        self.getDownloadingFilesEventNames = function(module) {
        var promises = [],
            eventNames = [],
            siteid = $mmSite.getId();
        angular.forEach(module.contents, function(content) {
            var url = content.fileurl;
            if (!self.isFileDownloadable(content)) {
                return;
            }
            promises.push($mmFilepool.isFileDownloadingByUrl(siteid, url).then(function() {
                return $mmFilepool.getFileEventNameByUrl(siteid, url).then(function(eventName) {
                    eventNames.push(eventName);
                });
            }, function() {
            }));
        });
        return $q.all(promises).then(function() {
            return eventNames;
        });
    };
        self.getFileEventNames = function(module) {
        var promises = [];
        angular.forEach(module.contents, function(content) {
            var url = content.fileurl;
            if (!self.isFileDownloadable(content)) {
                return;
            }
            promises.push($mmFilepool.getFileEventNameByUrl($mmSite.getId(), url));
        });
        return $q.all(promises).then(function(eventNames) {
            return eventNames;
        });
    };
        self.getDownloadableFiles = function(module) {
        var files = [];
        angular.forEach(module.contents, function(content) {
            if (self.isFileDownloadable(content)) {
                files.push(content);
            }
        });
        return files;
    };
        self.getToc = function(contents) {
        if (!contents || !contents.length) {
            return [];
        }
        return JSON.parse(contents[0].content);
    };
        self.getTocList = function(contents) {
        var chapters = [];
        var toc = self.getToc(contents);
        angular.forEach(toc, function(el) {
            var chapterId = el.href.replace('/index.html', '');
            chapters.push({id: chapterId, title: el.title, level: el.level});
            angular.forEach(el.subitems, function(sel) {
                chapterId = sel.href.replace('/index.html', '');
                chapters.push({id: chapterId, title: sel.title, level: sel.level});
            });
        });
        return chapters;
    };
        self.getFirstChapter = function(chapters) {
        if (!chapters || !chapters.length) {
            return;
        }
        return chapters[0].id;
    };
        self.getPreviousChapter = function(chapters, chapterId) {
        var previous = 0;
        for (var i = 0, len = chapters.length; i < len; i++) {
            if (chapters[i].id == chapterId) {
                break;
            }
            previous = chapters[i].id;
        }
        return previous;
    };
        self.getNextChapter = function(chapters, chapterId) {
        var next = 0;
        for (var i = 0, len = chapters.length; i < len; i++) {
            if (chapters[i].id == chapterId) {
                if (typeof chapters[i + 1] != 'undefined') {
                    next = chapters[i + 1].id;
                    break;
                }
            }
        }
        return next;
    };
        self.getChapterContent = function(contentsMap, chapterId, moduleId) {
        var indexUrl = contentsMap[chapterId] ? contentsMap[chapterId].indexUrl : undefined,
            promise;
        if (!indexUrl) {
            $log.debug('Could not locate the index chapter');
            return $q.reject();
        }
        if ($mmFS.isAvailable()) {
            promise = $mmFilepool.downloadUrl($mmSite.getId(), indexUrl, false, mmaModBookComponent, moduleId);
        } else {
            return $q.when($mmSite.fixPluginfileURL(indexUrl));
        }
        return promise.then(function(url) {
            return $http.get(url).then(function(response) {
                if (typeof response.data !== 'string') {
                    return $q.reject();
                } else {
                    return $mmUtil.restoreSourcesInHtml(response.data, contentsMap[chapterId].paths);
                }
            });
        });
    };
        self.getContentsMap = function(contents) {
        var map = {};
        angular.forEach(contents, function(content) {
            if (self.isFileDownloadable(content)) {
                var chapter,
                    matches,
                    split,
                    filepathIsChapter;
                matches = content.filepath.match(/\/(\d+)\//);
                if (matches && matches[1]) {
                    chapter = matches[1];
                    filepathIsChapter = content.filepath == '/' + chapter + '/';
                    map[chapter] = map[chapter] || { paths: {} };
                    if (content.filename == 'index.html' && filepathIsChapter) {
                        map[chapter].indexUrl = content.fileurl;
                    } else {
                        if (filepathIsChapter) {
                            split = content.fileurl.split('mod_book/chapter' + content.filepath);
                            key = split[1] || content.filename;
                        } else {
                            key = content.filepath.replace('/' + chapter + '/', '') + content.filename;
                        }
                        map[chapter].paths[key] = content.fileurl;
                    }
                }
            }
        });
        return map;
    };
        self.invalidateContent = function(moduleId) {
        return $mmFilepool.invalidateFilesByComponent($mmSite.getId(), mmaModBookComponent, moduleId);
    };
        self.isFileDownloadable = function(file) {
        return file.type === 'file';
    };
        self.isPluginEnabled = function(siteId) {
        siteId = siteId || $mmSite.getId();
        return $mmSitesManager.getSite(siteId).then(function(site) {
            var version = site.getInfo().version;
            return version && (parseInt(version) >= 2015051100) && site.canDownloadFiles();
        });
    };
        self.logView = function(id) {
        if (id) {
            var params = {
                bookid: id
            };
            return $mmSite.write('mod_book_view_book', params);
        }
        return $q.reject();
    };
        self.prefetchContent = function(module) {
        var files = self.getDownloadableFiles(module),
            revision = $mmFilepool.getRevisionFromFileList(module.contents),
            timemod = $mmFilepool.getTimemodifiedFromFileList(module.contents);
        return $mmFilepool.prefetchPackage($mmSite.getId(), files, mmaModBookComponent, module.id, revision, timemod);
    };
    return self;
}]);

angular.module('mm.addons.mod_book')
.factory('$mmaModBookHandlers', ["$mmCourse", "$mmaModBook", "$mmEvents", "$state", "$mmSite", "$mmCourseHelper", "$mmFilepool", "$mmCoursePrefetchDelegate", "mmCoreDownloading", "mmCoreNotDownloaded", "mmCoreOutdated", "mmCoreDownloaded", "mmCoreEventPackageStatusChanged", "mmaModBookComponent", "$mmContentLinksHelper", "$q", "$mmaModBookPrefetchHandler", function($mmCourse, $mmaModBook, $mmEvents, $state, $mmSite, $mmCourseHelper, $mmFilepool,
            $mmCoursePrefetchDelegate, mmCoreDownloading, mmCoreNotDownloaded, mmCoreOutdated, mmCoreDownloaded,
            mmCoreEventPackageStatusChanged, mmaModBookComponent, $mmContentLinksHelper, $q, $mmaModBookPrefetchHandler) {
    var self = {};
        self.courseContentHandler = function() {
        var self = {};
                self.isEnabled = function() {
            return $mmaModBook.isPluginEnabled();
        };
                self.getController = function(module, courseid) {
            return function($scope) {
                var downloadBtn,
                    refreshBtn,
                    revision = $mmFilepool.getRevisionFromFileList(module.contents),
                    timemodified = $mmFilepool.getTimemodifiedFromFileList(module.contents);
                downloadBtn = {
                    hidden: true,
                    icon: 'ion-ios-cloud-download-outline',
                    label: 'mm.core.download',
                    action: function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        var size = $mmaModBookPrefetchHandler.getDownloadSize(module);
                        $mmCourseHelper.prefetchModule($mmaModBook, module, size, false);
                    }
                };
                refreshBtn = {
                    icon: 'ion-android-refresh',
                    label: 'mm.core.refresh',
                    hidden: true,
                    action: function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        var size = $mmaModBookPrefetchHandler.getDownloadSize(module);
                        $mmCourseHelper.prefetchModule($mmaModBook, module, size, true);
                    }
                };
                $scope.title = module.name;
                $scope.icon = $mmCourse.getModuleIconSrc('book');
                $scope.buttons = [downloadBtn, refreshBtn];
                $scope.spinner = true;
                $scope.action = function(e) {
                    if (e) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    $state.go('site.mod_book', {module: module, courseid: courseid});
                };
                function showStatus(status) {
                    if (status) {
                        $scope.spinner = status === mmCoreDownloading;
                        downloadBtn.hidden = status !== mmCoreNotDownloaded;
                        refreshBtn.hidden = status !== mmCoreOutdated && status !== mmCoreDownloaded;
                    }
                }
                var statusObserver = $mmEvents.on(mmCoreEventPackageStatusChanged, function(data) {
                    if (data.siteid === $mmSite.getId() && data.componentId === module.id && data.component === mmaModBookComponent) {
                        showStatus(data.status);
                    }
                });
                $mmCoursePrefetchDelegate.getModuleStatus(module, courseid, revision, timemodified).then(showStatus);
                $scope.$on('$destroy', function() {
                    statusObserver && statusObserver.off && statusObserver.off();
                });
            };
        };
        return self;
    };
        self.linksHandler = function() {
        var self = {};
                function isEnabled(siteId, courseId) {
            return $mmaModBook.isPluginEnabled(siteId).then(function(enabled) {
                if (!enabled) {
                    return false;
                }
                return courseId || $mmCourse.canGetModuleWithoutCourseId(siteId);
            });
        }
                self.getActions = function(siteIds, url, courseId) {
            if (typeof self.handles(url) != 'undefined') {
                return $mmContentLinksHelper.treatModuleIndexUrl(siteIds, url, isEnabled, courseId);
            }
            return $q.when([]);
        };
                self.handles = function(url) {
            var position = url.indexOf('/mod/book/view.php');
            if (position > -1) {
                return url.substr(0, position);
            }
        };
        return self;
    };
    return self;
}]);

angular.module('mm.addons.mod_book')
.factory('$mmaModBookPrefetchHandler', ["$mmaModBook", "mmCoreDownloaded", "mmCoreOutdated", "mmaModBookComponent", function($mmaModBook, mmCoreDownloaded, mmCoreOutdated, mmaModBookComponent) {
    var self = {};
    self.component = mmaModBookComponent;
        self.determineStatus = function(status) {
        if (status === mmCoreDownloaded) {
            return mmCoreOutdated;
        } else {
            return status;
        }
    };
        self.getDownloadSize = function(module) {
        var size = 0;
        angular.forEach(module.contents, function(content) {
            if ($mmaModBook.isFileDownloadable(content) && content.filesize) {
                size = size + content.filesize;
            }
        });
        return size;
    };
        self.isEnabled = function() {
        return $mmaModBook.isPluginEnabled();
    };
        self.prefetch = function(module) {
        return $mmaModBook.prefetchContent(module);
    };
    return self;
}]);

angular.module('mm.addons.mod_chat')
.controller('mmaModChatChatCtrl', ["$scope", "$stateParams", "$mmApp", "$mmaModChat", "$log", "$ionicModal", "$mmUtil", "$ionicHistory", "$ionicScrollDelegate", "$timeout", "$mmSite", "$interval", "mmaChatPollInterval", "$q", function($scope, $stateParams, $mmApp, $mmaModChat, $log, $ionicModal, $mmUtil, $ionicHistory,
            $ionicScrollDelegate, $timeout, $mmSite, $interval, mmaChatPollInterval, $q) {
    $log = $log.getInstance('mmaModChatChatCtrl');
    var chatId = $stateParams.chatid,
        courseId = $stateParams.courseid,
        title = $stateParams.title,
        chatLastTime = 0,
        pollingRunning = false;
    $scope.loaded = false;
    $scope.title = title;
    $scope.currentUserId = $mmSite.getUserId();
    $scope.currentUserBeep = 'beep ' + $scope.currentUserId;
    $scope.messages = [];
    $scope.chatUsers = [];
    $scope.newMessage = {
        text: ''
    };
    $ionicModal.fromTemplateUrl('addons/mod_chat/templates/users.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(m) {
        $scope.modal = m;
    });
    $scope.closeModal = function(){
        $scope.modal.hide();
    };
    $scope.showChatUsers = function() {
        $scope.usersLoaded = false;
        $scope.modal.show();
        $mmaModChat.getChatUsers($scope.chatsid).then(function(data) {
            $scope.chatUsers = data.users;
        }).catch(function(error) {
            showError(error, 'mma.mod_chat.errorwhilegettingchatusers');
        }).finally(function() {
            $scope.usersLoaded = true;
        });
    };
    $scope.talkTo = function(user) {
        $scope.newMessage.text = "To " + user + ": ";
        $scope.modal.hide();
    };
    $scope.beepTo = function(userId) {
        $scope.sendMessage('', userId);
        $scope.modal.hide();
    };
    $scope.isAppOffline = function() {
        return !$mmApp.isOnline();
    };
    function loginUser() {
        return $mmaModChat.loginUser(chatId).then(function(chatsid) {
            $scope.chatsid = chatsid;
        });
    }
    function getMessages() {
        return $mmaModChat.getLatestMessages($scope.chatsid, chatLastTime).then(function(messagesInfo) {
            chatLastTime = messagesInfo.chatnewlasttime;
            return $mmaModChat.getMessagesUserData(messagesInfo.messages, courseId).then(function(messages) {
                $scope.messages = $scope.messages.concat(messages);
            });
        });
    }
    function showError(error, defaultMessage) {
        if (typeof error === 'string') {
            $mmUtil.showErrorModal(error);
        } else {
            $mmUtil.showErrorModal(defaultMessage, true);
        }
        return $q.reject();
    }
    function startPolling() {
        if ($scope.polling) {
            return;
        }
        $scope.polling = $interval(getMessagesInterval, mmaChatPollInterval);
    }
    function getMessagesInterval() {
        $log.debug('Polling for messages');
        if (!$mmApp.isOnline() || pollingRunning) {
            return $q.reject();
        }
        pollingRunning = true;
        return getMessages().catch(function() {
            return loginUser().then(function() {
                return getMessages();
            }).catch(function(error) {
                if ($scope.polling) {
                    $interval.cancel($scope.polling);
                    $scope.polling = undefined;
                }
                return showError(error, 'mma.mod_chat.errorwhileretrievingmessages');
            });
        }).finally(function() {
            pollingRunning = false;
        });
    }
    $scope.showDate = function(message, prevMessage) {
        if (!prevMessage) {
            return true;
        }
        return !moment(message.timestamp * 1000).isSame(prevMessage.timestamp * 1000, 'day');
    };
    $scope.sendMessage = function(text, beep) {
        beep = beep || '';
        if (!$mmApp.isOnline()) {
            return;
        } else if (beep === '' && !text.trim()) {
            return;
        }
        text = text.replace(/(?:\r\n|\r|\n)/g, '<br />');
        $mmaModChat.sendMessage($scope.chatsid, text, beep).then(function() {
            if (beep === '') {
                $scope.newMessage.text = '';
            }
            getMessagesInterval();
        }, function(error) {
            $mmApp.closeKeyboard();
            showError(error, 'mma.mod_chat.errorwhilesendingmessage');
        });
    };
    $scope.reconnect = function() {
        var modal = $mmUtil.showModalLoading();
        return getMessagesInterval().then(function() {
            startPolling();
        }).finally(function() {
            modal.dismiss();
        });
    };
    loginUser().then(function() {
        return getMessages().then(function() {
            startPolling();
        }).catch(function(error) {
            return showError(error, 'mma.mod_chat.errorwhileretrievingmessages');
        });
    }, function(error) {
        showError(error, 'mma.mod_chat.errorwhileconnecting');
        $ionicHistory.goBack();
    }).finally(function() {
        $scope.loaded = true;
    });
    $scope.scrollAfterRender = function(scope) {
        if (scope.$last === true) {
            $timeout(function() {
                var scrollView = $ionicScrollDelegate.$getByHandle('mmaChatScroll');
                scrollView.scrollBottom();
            });
        }
    };
    $scope.$on('$ionicView.leave', function() {
        if ($scope.polling) {
            $log.debug('Cancelling polling for conversation');
            $interval.cancel($scope.polling);
        }
    });
}]);

angular.module('mm.addons.mod_chat')
.controller('mmaModChatIndexCtrl', ["$scope", "$stateParams", "$mmaModChat", "$mmUtil", "$q", "$mmCourse", function($scope, $stateParams, $mmaModChat, $mmUtil, $q, $mmCourse) {
    var module = $stateParams.module || {},
        courseid = $stateParams.courseid,
        chat;
    $scope.title = module.name;
    $scope.description = module.description;
    $scope.moduleurl = module.url;
    $scope.courseid = courseid;
    function fetchChatData(refresh) {
        return $mmaModChat.getChat(courseid, module.id, refresh).then(function(chatdata) {
            chat = chatdata;
            $scope.title = chat.name || $scope.title;
            $scope.description = chat.intro || $scope.description;
            $scope.chatId = chat.id;
            $scope.chatScheduled = '';
            var now = $mmUtil.timestamp();
            var span = chat.chattime - now;
            if (chat.chattime && chat.schedule > 0 && span > 0) {
                $mmUtil.formatTime(span).then(function(time) {
                    $scope.chatScheduled = time;
                });
            }
        }, function(error) {
            if (!refresh) {
                return fetchChatData(true);
            }
            if (error) {
                $mmUtil.showErrorModal(error);
            } else {
                $mmUtil.showErrorModal('mma.mod_chat.errorwhilegettingchatdata', true);
            }
            return $q.reject();
        });
    }
    fetchChatData().then(function() {
        $mmaModChat.logView(chat.id).then(function() {
            $mmCourse.checkModuleCompletion(courseid, module.completionstatus);
        });
    }).finally(function() {
        $scope.chatLoaded = true;
    });
    $scope.refreshChat = function() {
        fetchChatData(true).finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
}]);
angular.module('mm.addons.mod_chat')
.factory('$mmaModChat', ["$q", "$mmSite", "$mmUser", "$mmSitesManager", function($q, $mmSite, $mmUser, $mmSitesManager) {
    var self = {};
        self.isPluginEnabled = function(siteId) {
        siteId = siteId || $mmSite.getId();
        return $mmSitesManager.getSite(siteId).then(function(site) {
            return  site.wsAvailable('mod_chat_get_chats_by_courses') &&
                    site.wsAvailable('mod_chat_login_user') &&
                    site.wsAvailable('mod_chat_get_chat_users') &&
                    site.wsAvailable('mod_chat_send_chat_message') &&
                    site.wsAvailable('mod_chat_get_chat_latest_messages');
        });
    };
        self.getChat = function(courseid, cmid, refresh) {
        var params = {
            courseids: [courseid]
            },
            preSets = {};
        if (refresh) {
            preSets.getFromCache = false;
        }
        return $mmSite.read('mod_chat_get_chats_by_courses', params, preSets).then(function(response) {
            if (response.chats) {
                var currentChat;
                angular.forEach(response.chats, function(chat) {
                    if (chat.coursemodule == cmid) {
                        currentChat = chat;
                    }
                });
                if (currentChat) {
                    return currentChat;
                }
            }
            return $q.reject();
        });
    };
        self.loginUser = function(chatId) {
        var params = {
            chatid: chatId
        };
        return $mmSite.write('mod_chat_login_user', params).then(function(response) {
            if (response.chatsid) {
                return response.chatsid;
            }
            return $q.reject();
        });
    };
        self.logView = function(id) {
        if (id) {
            var params = {
                chatid: id
            };
            return $mmSite.write('mod_chat_view_chat', params);
        }
        return $q.reject();
    };
        self.sendMessage = function(chatsid, message, beep) {
        var params = {
            chatsid: chatsid,
            messagetext: message,
            beepid: beep
        };
        return $mmSite.write('mod_chat_send_chat_message', params).then(function(response) {
            if (response.messageid) {
                return response.messageid;
            }
            return $q.reject();
        });
    };
        self.getLatestMessages = function(chatsid, lasttime) {
        var params = {
            chatsid: chatsid,
            chatlasttime: lasttime
        }, preSets = {
            emergencyCache: false
        };
        return $mmSite.write('mod_chat_get_chat_latest_messages', params, preSets);
    };
        self.getMessagesUserData = function(messages, courseid) {
        var promises = [];
        angular.forEach(messages, function(message) {
            var promise = $mmUser.getProfile(message.userid, courseid, true).then(function(user) {
                message.userfullname = user.fullname;
                message.userprofileimageurl = user.profileimageurl;
            }, function() {
                message.userfullname = message.userid;
            });
            promises.push(promise);
        });
        return $q.all(promises).then(function() {
            return messages;
        });
    };
        self.getChatUsers = function(chatsid) {
        var params = {
            chatsid: chatsid
        };
        var preSets = {
            getFromCache: false
        };
        return $mmSite.read('mod_chat_get_chat_users', params, preSets);
    };
    return self;
}]);
angular.module('mm.addons.mod_chat')
.factory('$mmaModChatHandlers', ["$mmCourse", "$mmaModChat", "$state", "$mmContentLinksHelper", "$q", function($mmCourse, $mmaModChat, $state, $mmContentLinksHelper, $q) {
    var self = {};
        self.courseContent = function() {
        var self = {};
                self.isEnabled = function() {
            return $mmaModChat.isPluginEnabled();
        };
                self.getController = function(module, courseid) {
            return function($scope) {
                $scope.title = module.name;
                $scope.icon = $mmCourse.getModuleIconSrc('chat');
                $scope.action = function(e) {
                    $state.go('site.mod_chat', {module: module, courseid: courseid});
                };
            };
        };
        return self;
    };
        self.linksHandler = function() {
        var self = {};
                function isEnabled(siteId, courseId) {
            return $mmaModChat.isPluginEnabled(siteId).then(function(enabled) {
                if (!enabled) {
                    return false;
                }
                return courseId || $mmCourse.canGetModuleWithoutCourseId(siteId);
            });
        }
                self.getActions = function(siteIds, url, courseId) {
            if (typeof self.handles(url) != 'undefined') {
                return $mmContentLinksHelper.treatModuleIndexUrl(siteIds, url, isEnabled, courseId);
            }
            return $q.when([]);
        };
                self.handles = function(url) {
            var position = url.indexOf('/mod/chat/view.php');
            if (position > -1) {
                return url.substr(0, position);
            }
        };
        return self;
    };
    return self;
}]);
angular.module('mm.addons.mod_choice')
.controller('mmaModChoiceIndexCtrl', ["$scope", "$stateParams", "$mmaModChoice", "$mmUtil", "$q", "$mmCourse", "$translate", function($scope, $stateParams, $mmaModChoice, $mmUtil, $q, $mmCourse, $translate) {
    var module = $stateParams.module || {},
        courseid = $stateParams.courseid,
        choice,
        hasAnswered = false;
    $scope.title = module.name;
    $scope.description = module.description;
    $scope.moduleurl = module.url;
    $scope.courseid = courseid;
    function fetchChoiceData(refresh) {
        $scope.now = new Date().getTime();
        return $mmaModChoice.getChoice(courseid, module.id).then(function(choicedata) {
            choice = choicedata;
            choice.timeopen = parseInt(choice.timeopen) * 1000;
            choice.openTimeReadable = moment(choice.timeopen).format('LLL');
            choice.timeclose = parseInt(choice.timeclose) * 1000;
            choice.closeTimeReadable = moment(choice.timeclose).format('LLL');
            $scope.title = choice.name || $scope.title;
            $scope.description = choice.intro || $scope.description;
            $scope.choice = choice;
            return fetchOptions().then(function() {
                return fetchResults();
            });
        }).catch(function(message) {
            if (!refresh) {
                return refreshAllData();
            }
            if (message) {
                $mmUtil.showErrorModal(message);
            } else {
                $mmUtil.showErrorModal('mma.mod_choice.errorgetchoice', true);
            }
            return $q.reject();
        });
    }
    function fetchOptions() {
        return $mmaModChoice.getOptions(choice.id).then(function(options) {
            var isOpen = isChoiceOpen();
            hasAnswered = false;
            $scope.selectedOption = {id: -1};
            angular.forEach(options, function(option) {
                if (option.checked) {
                    hasAnswered = true;
                    if (!choice.allowmultiple) {
                        $scope.selectedOption.id = option.id;
                    }
                }
            });
            $scope.canEdit = isOpen && (choice.allowupdate || !hasAnswered);
            $scope.canDelete = $mmaModChoice.isDeleteResponsesEnabled() && isOpen && choice.allowupdate && hasAnswered;
            $scope.options = options;
        });
    }
    function fetchResults() {
        return $mmaModChoice.getResults(choice.id).then(function(results) {
            var hasVotes = false;
            angular.forEach(results, function(result) {
                if (result.numberofuser > 0) {
                    hasVotes = true;
                }
                result.percentageamount = parseFloat(result.percentageamount).toFixed(1);
            });
            $scope.canSeeResults = hasVotes || $mmaModChoice.canStudentSeeResults(choice, hasAnswered);
            $scope.results = results;
        });
    }
        function isChoiceOpen() {
        return (choice.timeopen === 0 || choice.timeopen <= $scope.now) &&
                (choice.timeclose === 0 || choice.timeclose > $scope.now);
    }
    function refreshAllData() {
        var p1 = $mmaModChoice.invalidateChoiceData(courseid),
            p2 = choice ? $mmaModChoice.invalidateOptions(choice.id) : $q.when(),
            p3 = choice ? $mmaModChoice.invalidateResults(choice.id) : $q.when();
        return $q.all([p1, p2, p3]).finally(function() {
            return fetchChoiceData(true);
        });
    }
    fetchChoiceData().then(function() {
        $mmaModChoice.logView(choice.id).then(function() {
            $mmCourse.checkModuleCompletion(courseid, module.completionstatus);
        });
    }).finally(function() {
        $scope.choiceLoaded = true;
    });
    $scope.save = function() {
        var promise = choice.allowupdate ? $q.when() : $mmUtil.showConfirm($translate('mm.core.areyousure'));
        promise.then(function() {
            var responses = [];
            if (choice.allowmultiple) {
                angular.forEach($scope.options, function(option) {
                    if (option.checked) {
                        responses.push(option.id);
                    }
                });
            } else {
                responses.push($scope.selectedOption.id);
            }
            var modal = $mmUtil.showModalLoading('mm.core.sending', true);
            $mmaModChoice.submitResponse(choice.id, responses).then(function() {
                return refreshAllData();
            }).catch(function(message) {
                if (message) {
                    $mmUtil.showErrorModal(message);
                } else {
                    $mmUtil.showErrorModal('mma.mod_choice.cannotsubmit', true);
                }
            }).finally(function() {
                modal.dismiss();
            });
        });
    };
    $scope.delete = function() {
        $mmUtil.showConfirm($translate('mm.core.areyousure')).then(function() {
            var modal = $mmUtil.showModalLoading('mm.core.sending', true);
            $mmaModChoice.deleteResponses(choice.id).then(function() {
                return refreshAllData();
            }).catch(function(message) {
                if (message) {
                    $mmUtil.showErrorModal(message);
                } else {
                    $mmUtil.showErrorModal('mma.mod_choice.cannotsubmit', true);
                }
            }).finally(function() {
                modal.dismiss();
            });
        });
    };
    $scope.refreshChoice = function() {
        refreshAllData().finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
}]);

angular.module('mm.addons.mod_choice')
.factory('$mmaModChoice', ["$q", "$mmSite", "$mmSitesManager", "mmaModChoiceResultsAfterAnswer", "mmaModChoiceResultsAfterClose", "mmaModChoiceResultsAlways", function($q, $mmSite, $mmSitesManager, mmaModChoiceResultsAfterAnswer, mmaModChoiceResultsAfterClose,
            mmaModChoiceResultsAlways) {
    var self = {};
        self.canStudentSeeResults = function(choice, hasAnswered) {
        var now = new Date().getTime();
        return  choice.showresults === mmaModChoiceResultsAlways ||
                choice.showresults === mmaModChoiceResultsAfterClose && choice.timeclose !== 0 && choice.timeclose <= now ||
                choice.showresults === mmaModChoiceResultsAfterAnswer && hasAnswered;
    };
        self.deleteResponses = function(choiceid, responses) {
        responses = responses || [];
        var params = {
            choiceid: choiceid,
            responses: responses
        };
        return $mmSite.write('mod_choice_delete_choice_responses', params).then(function(response) {
            if (!response || response.status === false) {
                return $q.reject();
            }
        });
    };
        function getChoiceDataCacheKey(courseid) {
        return 'mmaModChoice:choice:' + courseid;
    }
        function getChoiceOptionsCacheKey(choiceid) {
        return 'mmaModChoice:options:' + choiceid;
    }
        function getChoiceResultsCacheKey(choiceid) {
        return 'mmaModChoice:results:' + choiceid;
    }
        self.isDeleteResponsesEnabled = function() {
        return $mmSite.wsAvailable('mod_choice_delete_choice_responses');
    };
        self.isPluginEnabled = function(siteId) {
        siteId = siteId || $mmSite.getId();
        return $mmSitesManager.getSite(siteId).then(function(site) {
            return  site.wsAvailable('mod_choice_get_choice_options') &&
                    site.wsAvailable('mod_choice_get_choice_results') &&
                    site.wsAvailable('mod_choice_get_choices_by_courses') &&
                    site.wsAvailable('mod_choice_submit_choice_response');
        });
    };
        self.getChoice = function(courseid, cmid) {
        var params = {
                courseids: [courseid]
            },
            preSets = {
                cacheKey: getChoiceDataCacheKey(courseid)
            };
        return $mmSite.read('mod_choice_get_choices_by_courses', params, preSets).then(function(response) {
            if (response.choices) {
                var currentChoice;
                angular.forEach(response.choices, function(choice) {
                    if (choice.coursemodule == cmid) {
                        currentChoice = choice;
                    }
                });
                if (currentChoice) {
                    return currentChoice;
                }
            }
            return $q.reject();
        });
    };
        self.getOptions = function(choiceid) {
        var params = {
                choiceid: choiceid
            },
            preSets = {
                cacheKey: getChoiceOptionsCacheKey(choiceid)
            };
        return $mmSite.read('mod_choice_get_choice_options', params, preSets).then(function(response) {
            if (response.options) {
                return response.options;
            }
            return $q.reject();
        });
    };
        self.getResults = function(choiceid) {
        var params = {
                choiceid: choiceid
            },
            preSets = {
                cacheKey: getChoiceResultsCacheKey(choiceid)
            };
        return $mmSite.read('mod_choice_get_choice_results', params, preSets).then(function(response) {
            if (response.options) {
                return response.options;
            }
            return $q.reject();
        });
    };
        self.invalidateChoiceData = function(courseid) {
        return $mmSite.invalidateWsCacheForKey(getChoiceDataCacheKey(courseid));
    };
        self.invalidateOptions = function(choiceid) {
        return $mmSite.invalidateWsCacheForKey(getChoiceOptionsCacheKey(choiceid));
    };
        self.invalidateResults = function(choiceid) {
        return $mmSite.invalidateWsCacheForKey(getChoiceResultsCacheKey(choiceid));
    };
        self.logView = function(id) {
        if (id) {
            var params = {
                choiceid: id
            };
            return $mmSite.write('mod_choice_view_choice', params);
        }
        return $q.reject();
    };
        self.submitResponse = function(choiceid, responses) {
        var params = {
            choiceid: choiceid,
            responses: responses
        };
        return $mmSite.write('mod_choice_submit_choice_response', params);
    };
    return self;
}]);

angular.module('mm.addons.mod_choice')
.factory('$mmaModChoiceHandlers', ["$mmCourse", "$mmaModChoice", "$state", "$mmContentLinksHelper", "$q", function($mmCourse, $mmaModChoice, $state, $mmContentLinksHelper, $q) {
    var self = {};
        self.courseContent = function() {
        var self = {};
                self.isEnabled = function() {
            return $mmaModChoice.isPluginEnabled();
        };
                self.getController = function(module, courseid) {
            return function($scope) {
                $scope.title = module.name;
                $scope.icon = $mmCourse.getModuleIconSrc('choice');
                $scope.action = function(e) {
                    $state.go('site.mod_choice', {module: module, courseid: courseid});
                };
            };
        };
        return self;
    };
        self.linksHandler = function() {
        var self = {};
                function isEnabled(siteId, courseId) {
            return $mmaModChoice.isPluginEnabled(siteId).then(function(enabled) {
                if (!enabled) {
                    return false;
                }
                return courseId || $mmCourse.canGetModuleWithoutCourseId(siteId);
            });
        }
                self.getActions = function(siteIds, url, courseId) {
            if (typeof self.handles(url) != 'undefined') {
                return $mmContentLinksHelper.treatModuleIndexUrl(siteIds, url, isEnabled, courseId);
            }
            return $q.when([]);
        };
                self.handles = function(url) {
            var position = url.indexOf('/mod/choice/view.php');
            if (position > -1) {
                return url.substr(0, position);
            }
        };
        return self;
    };
    return self;
}]);

angular.module('mm.addons.mod_folder')
.controller('mmaModFolderIndexCtrl', ["$scope", "$stateParams", "$mmaModFolder", "$mmCourse", "$mmUtil", "$q", function($scope, $stateParams, $mmaModFolder, $mmCourse, $mmUtil, $q) {
    var module = $stateParams.module || {},
        courseid = $stateParams.courseid,
        sectionid = $stateParams.sectionid,
        path = $stateParams.path;
    function showModuleData(module) {
        $scope.title = module.name;
        $scope.description = module.description;
        if (path) {
            $scope.contents = module.contents;
        } else {
            $scope.contents = $mmaModFolder.formatContents(module.contents);
            $scope.moduleurl = module.url;
        }
    }
    function fetchFolder() {
        return $mmCourse.getModule(module.id, courseid, sectionid).then(function(module) {
            showModuleData(module);
        }, function(error) {
            if (error) {
                $mmUtil.showErrorModal(error);
            } else {
                $mmUtil.showErrorModal('mma.mod_folder.errorwhilegettingfolder', true);
            }
            if (!$scope.title) {
                showModuleData(module);
            }
            return $q.reject();
        });
    }
    if (path) {
        showModuleData(module);
        $scope.folderLoaded = true;
        $scope.canReload = false;
    } else {
        fetchFolder().then(function() {
            $mmaModFolder.logView(module.instance).then(function() {
                $mmCourse.checkModuleCompletion(courseid, module.completionstatus);
            });
        }).finally(function() {
            $scope.folderLoaded = true;
            $scope.canReload = true;
        });
    }
    $scope.refreshFolder = function() {
        $mmCourse.invalidateModule(module.id).finally(function() {
            fetchFolder().finally(function() {
                $scope.$broadcast('scroll.refreshComplete');
            });
        });
    };
}]);

angular.module('mm.addons.mod_folder')
.factory('$mmaModFolder', ["$mmSite", "$mmCourse", "$q", "$mmFilepool", "mmaModFolderComponent", function($mmSite, $mmCourse, $q, $mmFilepool, mmaModFolderComponent) {
    var self = {};
        self.downloadAllContent = function(module) {
        var files = self.getDownloadableFiles(module),
            revision = $mmFilepool.getRevisionFromFileList(module.contents),
            timemod = $mmFilepool.getTimemodifiedFromFileList(module.contents);
        return $mmFilepool.downloadPackage($mmSite.getId(), files, mmaModFolderComponent, module.id, revision, timemod);
    };
        self.formatContents = function(contents) {
        var files = [],
            folders = [],
            foldericon = $mmCourse.getModuleIconSrc('folder');
        angular.forEach(contents, function(entry) {
            if (entry.filepath !== '/') {
                var directories,
                    currentList = folders,
                    path = entry.filepath,
                    subpath = '';
                if (path.substr(0, 1) === '/') {
                    path = path.substr(1);
                }
                if (path.substr(path.length - 1) === '/') {
                    path = path.slice(0, -1);
                }
                directories = path.split('/');
                angular.forEach(directories, function(directory) {
                    subpath = subpath + '/' + directory;
                    var found = false;
                    for (var i = 0; i < currentList.length; i++) {
                        if (currentList[i].name === directory) {
                            currentList = currentList[i].contents;
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        var newFolder = {
                            name: directory,
                            fileicon: foldericon,
                            contents: [],
                            filepath: subpath,
                            type: 'folder'
                        };
                        currentList.push(newFolder);
                        currentList = newFolder.contents;
                    }
                });
                currentList.push(entry);
            } else {
                files.push(entry);
            }
        });
        return folders.concat(files);
    };
        self.getDownloadableFiles = function(module) {
        var files = [];
        angular.forEach(module.contents, function(content) {
            if (self.isFileDownloadable(content)) {
                files.push(content);
            }
        });
        return files;
    };
        self.isFileDownloadable = function(file) {
        return file.type === 'file';
    };
        self.logView = function(id) {
        if (id) {
            var params = {
                folderid: id
            };
            return $mmSite.write('mod_folder_view_folder', params);
        }
        return $q.reject();
    };
        self.prefetchContent = function(module) {
        var files = self.getDownloadableFiles(module),
            revision = $mmFilepool.getRevisionFromFileList(module.contents),
            timemod = $mmFilepool.getTimemodifiedFromFileList(module.contents);
        return $mmFilepool.prefetchPackage($mmSite.getId(), files, mmaModFolderComponent, module.id, revision, timemod);
    };
    return self;
}]);

angular.module('mm.addons.mod_folder')
.factory('$mmaModFolderHandlers', ["$mmCourse", "$mmaModFolder", "$mmEvents", "$state", "$mmSite", "$mmCourseHelper", "$mmFilepool", "$mmCoursePrefetchDelegate", "mmCoreDownloading", "mmCoreNotDownloaded", "mmCoreOutdated", "mmCoreEventPackageStatusChanged", "mmaModFolderComponent", "$mmContentLinksHelper", "$q", "$mmaModFolderPrefetchHandler", function($mmCourse, $mmaModFolder, $mmEvents, $state, $mmSite, $mmCourseHelper, $mmFilepool,
            $mmCoursePrefetchDelegate, mmCoreDownloading, mmCoreNotDownloaded, mmCoreOutdated, mmCoreEventPackageStatusChanged,
            mmaModFolderComponent, $mmContentLinksHelper, $q, $mmaModFolderPrefetchHandler) {
    var self = {};
        self.courseContent = function() {
        var self = {};
                self.isEnabled = function() {
            return true;
        };
                self.getController = function(module, courseid, sectionid) {
            return function($scope) {
                var downloadBtn,
                    refreshBtn,
                    revision = $mmFilepool.getRevisionFromFileList(module.contents),
                    timemodified = $mmFilepool.getTimemodifiedFromFileList(module.contents);
                function prefetchFolder(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var size = $mmaModFolderPrefetchHandler.getDownloadSize(module);
                    $mmCourseHelper.prefetchModule($mmaModFolder, module, size, false);
                }
                downloadBtn = {
                    hidden: true,
                    icon: 'ion-ios-cloud-download-outline',
                    label: 'mm.core.download',
                    action: prefetchFolder
                };
                refreshBtn = {
                    hidden: true,
                    icon: 'ion-android-refresh',
                    label: 'mm.core.refresh',
                    action: prefetchFolder
                };
                $scope.icon = $mmCourse.getModuleIconSrc('folder');
                $scope.title = module.name;
                $scope.buttons = [downloadBtn, refreshBtn];
                $scope.spinner = true;
                $scope.action = function(e) {
                    if (e) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    $state.go('site.mod_folder', {module: module, courseid: courseid, sectionid: sectionid});
                };
                function showStatus(status) {
                    if (status) {
                        $scope.spinner = status === mmCoreDownloading;
                        downloadBtn.hidden = status !== mmCoreNotDownloaded;
                        refreshBtn.hidden = status !== mmCoreOutdated;
                    }
                }
                var statusObserver = $mmEvents.on(mmCoreEventPackageStatusChanged, function(data) {
                    if (data.siteid === $mmSite.getId() && data.componentId === module.id && data.component === mmaModFolderComponent) {
                        showStatus(data.status);
                    }
                });
                $mmCoursePrefetchDelegate.getModuleStatus(module, courseid, revision, timemodified).then(showStatus);
                $scope.$on('$destroy', function() {
                    statusObserver && statusObserver.off && statusObserver.off();
                });
            };
        };
        return self;
    };
        self.linksHandler = function() {
        var self = {};
                function isEnabled(siteId, courseId) {
            if (courseId) {
                return $q.when(true);
            }
            return $mmCourse.canGetModuleWithoutCourseId(siteId);
        }
                self.getActions = function(siteIds, url, courseId) {
            if (typeof self.handles(url) != 'undefined') {
                return $mmContentLinksHelper.treatModuleIndexUrl(siteIds, url, isEnabled, courseId);
            }
            return $q.when([]);
        };
                self.handles = function(url) {
            var position = url.indexOf('/mod/folder/view.php');
            if (position > -1) {
                return url.substr(0, position);
            }
        };
        return self;
    };
    return self;
}]);

angular.module('mm.addons.mod_folder')
.factory('$mmaModFolderPrefetchHandler', ["$mmaModFolder", "$mmSite", "mmaModFolderComponent", function($mmaModFolder, $mmSite, mmaModFolderComponent) {
    var self = {};
    self.component = mmaModFolderComponent;
        self.getDownloadSize = function(module) {
        var size = 0;
        angular.forEach(module.contents, function(content) {
            if ($mmaModFolder.isFileDownloadable(content) && content.filesize) {
                size = size + content.filesize;
            }
        });
        return size;
    };
        self.isEnabled = function() {
        return true;
    };
        self.prefetch = function(module) {
        return $mmaModFolder.prefetchContent(module);
    };
    return self;
}]);

angular.module('mm.addons.mod_forum')
.controller('mmaModForumDiscussionCtrl', ["$q", "$scope", "$stateParams", "$mmaModForum", "$mmSite", "$mmUtil", "$translate", "$ionicScrollDelegate", "mmaModForumComponent", function($q, $scope, $stateParams, $mmaModForum, $mmSite, $mmUtil, $translate,
            $ionicScrollDelegate, mmaModForumComponent) {
    var discussionid = $stateParams.discussionid,
        courseid = $stateParams.cid,
        scrollView;
    $scope.component = mmaModForumComponent;
    $scope.courseid = courseid;
    $scope.newpost = {
        replyingto: undefined,
        subject: '',
        message: ''
    };
    function fetchPosts() {
        return $mmaModForum.getDiscussionPosts(discussionid).then(function(posts) {
            $scope.discussion = $mmaModForum.extractStartingPost(posts);
            $scope.posts = posts;
            return $translate('mma.mod_forum.re').then(function(strReplyPrefix) {
                $scope.defaultSubject = strReplyPrefix + ' ' + $scope.discussion.subject;
                $scope.newpost.subject = $scope.defaultSubject;
            });
        }, function(message) {
            $mmUtil.showErrorModal(message);
            return $q.reject();
        });
    }
    function refreshPosts() {
        return $mmaModForum.invalidateDiscussionPosts(discussionid).finally(function() {
            return fetchPosts();
        });
    }
    fetchPosts().then(function() {
        $mmSite.write('mod_forum_view_forum_discussion', {
            discussionid: discussionid
        });
    }).finally(function() {
        $scope.discussionLoaded = true;
    });
    $scope.refreshPosts = function() {
        refreshPosts().finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
    $scope.newPostAdded = function() {
        if (!scrollView) {
            scrollView = $ionicScrollDelegate.$getByHandle('mmaModForumPostsScroll');
        }
        scrollView && scrollView.scrollTop && scrollView.scrollTop();
        $scope.newpost.replyingto = undefined;
        $scope.newpost.subject = $scope.defaultSubject;
        $scope.newpost.message = '';
        $scope.discussionLoaded = false;
        refreshPosts().finally(function() {
            $scope.discussionLoaded = true;
        });
    };
}]);

angular.module('mm.addons.mod_forum')
.controller('mmaModForumDiscussionsCtrl', ["$q", "$scope", "$stateParams", "$mmaModForum", "$mmCourse", "$mmUtil", "$mmGroups", "$mmEvents", "$ionicScrollDelegate", "$ionicPlatform", "mmUserProfileState", "mmaModForumNewDiscussionEvent", function($q, $scope, $stateParams, $mmaModForum, $mmCourse, $mmUtil, $mmGroups,
            $mmEvents, $ionicScrollDelegate, $ionicPlatform, mmUserProfileState, mmaModForumNewDiscussionEvent) {
    var module = $stateParams.module || {},
        courseid = $stateParams.courseid,
        forum,
        page = 0,
        scrollView = $ionicScrollDelegate.$getByHandle('mmaModForumDiscussionsScroll'),
        shouldScrollTop = false,
        usesGroups = false;
    $scope.title = module.name;
    $scope.description = module.description;
    $scope.moduleurl = module.url;
    $scope.courseid = courseid;
    $scope.userStateName = mmUserProfileState;
    $scope.isCreateEnabled = $mmaModForum.isCreateDiscussionEnabled();
    function fetchForumDataAndDiscussions(refresh) {
        return $mmaModForum.getForum(courseid, module.id).then(function(forumdata) {
            forum = forumdata;
            $scope.title = forum.name || $scope.title;
            $scope.description = forum.intro || $scope.description;
            $scope.forum = forum;
            return $mmGroups.getActivityGroupMode(forum.cmid).then(function(mode) {
                usesGroups = mode === $mmGroups.SEPARATEGROUPS || mode === $mmGroups.VISIBLEGROUPS;
            }).finally(function() {
                return fetchDiscussions(refresh);
            });
        }, function(message) {
            if (!refresh) {
                return refreshData();
            }
            if (message) {
                $mmUtil.showErrorModal(message);
            } else {
                $mmUtil.showErrorModal('mma.mod_forum.errorgetforum', true);
            }
            $scope.canLoadMore = false;
            return $q.reject();
        });
    }
    function fetchDiscussions(refresh) {
        if (refresh) {
            page = 0;
        }
        return $mmaModForum.getDiscussions(forum.id, page).then(function(response) {
            var promise = usesGroups ?
                    $mmaModForum.formatDiscussionsGroups(forum.cmid, response.discussions) : $q.when(response.discussions);
            return promise.then(function(discussions) {
                if (page == 0) {
                    $scope.discussions = discussions;
                } else {
                    $scope.discussions = $scope.discussions.concat(discussions);
                }
                $scope.count = $scope.discussions.length;
                $scope.canLoadMore = response.canLoadMore;
                page++;
                preFetchDiscussionsPosts(discussions);
            });
        }, function(message) {
            $mmUtil.showErrorModal(message);
            $scope.canLoadMore = false;
            return $q.reject();
        });
    }
    function preFetchDiscussionsPosts(discussions) {
        angular.forEach(discussions, function(discussion) {
            var discussionid = discussion.discussion;
            $mmaModForum.getDiscussionPosts(discussionid);
        });
    }
    function refreshData() {
        var promises = [];
        promises.push($mmaModForum.invalidateForumData(courseid));
        if (forum) {
            promises.push($mmaModForum.invalidateDiscussionsList(forum.id));
            promises.push($mmGroups.invalidateActivityGroupMode(forum.cmid));
        }
        return $q.all(promises).finally(function() {
            return fetchForumDataAndDiscussions(true);
        });
    }
    fetchForumDataAndDiscussions().then(function() {
        $mmaModForum.logView(forum.id).then(function() {
            $mmCourse.checkModuleCompletion(courseid, module.completionstatus);
        });
    }).finally(function() {
        $scope.discussionsLoaded = true;
    });
    $scope.loadMoreDiscussions = function() {
        fetchDiscussions().finally(function() {
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };
    $scope.refreshDiscussions = function() {
        refreshData().finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
    var obsNewDisc = $mmEvents.on(mmaModForumNewDiscussionEvent, function(data) {
        if ((forum && forum.id === data.forumid) || data.cmid === module.id) {
            if ($ionicPlatform.isTablet()) {
                scrollView.scrollTop();
            } else {
                shouldScrollTop = true;
            }
            $scope.discussionsLoaded = false;
            refreshData().finally(function() {
                $scope.discussionsLoaded = true;
            });
        }
    });
    $scope.$on('$ionicView.enter', function() {
        if (shouldScrollTop) {
            shouldScrollTop = false;
            scrollView.scrollTop();
        }
    });
    $scope.$on('$destroy', function(){
        if (obsNewDisc && obsNewDisc.off) {
            obsNewDisc.off();
        }
    });
}]);

angular.module('mm.addons.mod_forum')
.controller('mmaModForumNewDiscussionCtrl', ["$scope", "$stateParams", "$mmGroups", "$q", "$mmaModForum", "$mmEvents", "$ionicPlatform", "$mmUtil", "$ionicHistory", "$translate", "mmaModForumNewDiscussionEvent", function($scope, $stateParams, $mmGroups, $q, $mmaModForum, $mmEvents, $ionicPlatform,
            $mmUtil, $ionicHistory, $translate, mmaModForumNewDiscussionEvent) {
    var courseid = $stateParams.cid,
        forumid = $stateParams.forumid,
        cmid = $stateParams.cmid;
    $scope.newdiscussion = {
        subject: '',
        message: '',
        subscribe: true
    };
    function fetchGroups(refresh) {
        return $mmGroups.getActivityGroupMode(cmid).then(function(mode) {
            if (mode === $mmGroups.SEPARATEGROUPS || mode === $mmGroups.VISIBLEGROUPS) {
                return $mmGroups.getActivityAllowedGroups(cmid).then(function(forumgroups) {
                    var promise;
                    if (mode === $mmGroups.VISIBLEGROUPS) {
                        promise = validateVisibleGroups(forumgroups, refresh);
                    } else {
                        promise = $q.when(forumgroups);
                    }
                    return promise.then(function(forumgroups) {
                        if (forumgroups.length > 0) {
                            $scope.groups = forumgroups;
                            $scope.newdiscussion.groupid = forumgroups[0].id;
                            $scope.showGroups = true;
                            $scope.showForm = true;
                        } else {
                            var message = mode === $mmGroups.SEPARATEGROUPS ?
                                                'mma.mod_forum.cannotadddiscussionall' : 'mma.mod_forum.cannotadddiscussion';
                            return $q.reject($translate.instant(message));
                        }
                    });
                });
            } else {
                $scope.showGroups = false;
                $scope.showForm = true;
            }
        }).catch(function(message) {
            if (message) {
                $mmUtil.showErrorModal(message);
            } else {
                $mmUtil.showErrorModal('mma.mod_forum.errorgetgroups', true);
            }
            $scope.showForm = false;
            return $q.reject();
        });
    }
    function validateVisibleGroups(forumgroups, refresh) {
        if ($mmaModForum.isCanAddDiscussionAvailable()) {
            return $mmaModForum.canAddDiscussionToAll(forumid).catch(function() {
                return false;
            }).then(function(canAdd) {
                if (canAdd) {
                    return forumgroups;
                } else {
                    var promises = [],
                        filtered = [];
                    angular.forEach(forumgroups, function(group) {
                        promises.push($mmaModForum.canAddDiscussion(forumid, group.id).catch(function() {
                            return true;
                        }).then(function(canAdd) {
                            if (canAdd) {
                                filtered.push(group);
                            }
                        }));
                    });
                    return $q.all(promises).then(function() {
                        return filtered;
                    });
                }
            });
        } else {
            return $mmGroups.getUserGroupsInCourse(courseid, refresh).then(function(usergroups) {
                if (usergroups.length === 0) {
                    return forumgroups;
                }
                return filterGroups(forumgroups, usergroups);
            });
        }
    }
    function filterGroups(forumgroups, usergroups) {
        var filtered = [],
            usergroupsids = usergroups.map(function(g) {
                return g.id;
            });
        angular.forEach(forumgroups, function(fg) {
            if (usergroupsids.indexOf(fg.id) > -1) {
                filtered.push(fg);
            }
        });
        return filtered;
    }
    fetchGroups().finally(function() {
        $scope.groupsLoaded = true;
    });
    $scope.refreshGroups = function() {
        var p1 = $mmGroups.invalidateActivityGroupMode(cmid),
            p2 = $mmGroups.invalidateActivityAllowedGroups(cmid),
            p3 = $mmaModForum.invalidateCanAddDiscussion(forumid);
        $q.all([p1, p2]).finally(function() {
            fetchGroups(true).finally(function() {
                $scope.$broadcast('scroll.refreshComplete');
            });
        });
    };
    $scope.add = function() {
        var subject = $scope.newdiscussion.subject,
            message = $scope.newdiscussion.message,
            subscribe = $scope.newdiscussion.subscribe,
            groupid = $scope.newdiscussion.groupid;
        if (!subject) {
            $mmUtil.showErrorModal('mma.mod_forum.erroremptysubject', true);
            return;
        }
        if (!message) {
            $mmUtil.showErrorModal('mma.mod_forum.erroremptymessage', true);
            return;
        }
        message = '<p>' + message + '<p>';
        $mmaModForum.addNewDiscussion(forumid, subject, message, subscribe, groupid).then(function(discussionid) {
            var data = {
                forumid: forumid,
                discussionid: discussionid,
                cmid: cmid
            };
            $mmEvents.trigger(mmaModForumNewDiscussionEvent, data);
            if ($ionicPlatform.isTablet()) {
                $scope.newdiscussion.subject = '';
                $scope.newdiscussion.message = '';
            } else {
                $ionicHistory.goBack();
            }
        }).catch(function(message) {
            if (message) {
                $mmUtil.showErrorModal(message);
            } else {
                $mmUtil.showErrorModal('mma.mod_forum.cannotcreatediscussion', true);
            }
        });
    };
}]);

angular.module('mm.addons.mod_forum')
.directive('mmaModForumDiscussionPost', ["$mmaModForum", "$mmUtil", "$translate", "$q", function($mmaModForum, $mmUtil, $translate, $q) {
    return {
        restrict: 'E',
        scope: {
            post: '=',
            courseid: '=',
            title: '=',
            subject: '=',
            component: '=',
            newpost: '=',
            showdivider: '=?',
            titleimportant: '=?',
            postadded: '&?',
            defaultsubject: '=?'
        },
        templateUrl: 'addons/mod_forum/templates/discussionpost.html',
        transclude: true,
        link: function(scope) {
            scope.isReplyEnabled = $mmaModForum.isReplyPostEnabled();
            scope.showReply = function() {
                scope.newpost.replyingto = scope.post.id;
            };
            scope.reply = function() {
                if (!scope.newpost.subject) {
                    $mmUtil.showErrorModal('mma.mod_forum.erroremptysubject', true);
                    return;
                }
                if (!scope.newpost.message) {
                    $mmUtil.showErrorModal('mma.mod_forum.erroremptymessage', true);
                    return;
                }
                var message = '<p>' + scope.newpost.message.replace(/\n/g, '<br>') + '</p>',
                    modal = $mmUtil.showModalLoading('mm.core.sending', true);
                $mmaModForum.replyPost(scope.newpost.replyingto, scope.newpost.subject, message).then(function() {
                    if (scope.postadded) {
                        scope.postadded();
                    }
                }).catch(function(message) {
                    if (message) {
                        $mmUtil.showErrorModal(message);
                    } else {
                        $mmUtil.showErrorModal('mma.mod_forum.couldnotadd', true);
                    }
                }).finally(function() {
                    modal.dismiss();
                });
            };
            scope.cancel = function() {
                var promise;
                if (!scope.newpost.subject && !scope.newpost.message) {
                    promise = $q.when();
                } else {
                    promise = $mmUtil.showConfirm($translate('mm.core.areyousure'));
                }
                promise.then(function() {
                    scope.newpost.replyingto = undefined;
                    scope.newpost.subject = scope.defaultsubject || '';
                    scope.newpost.message = '';
                });
            };
        }
    };
}]);

angular.module('mm.addons.mod_forum')
.factory('$mmaModForum', ["$q", "$mmSite", "$mmUser", "$mmGroups", "$translate", "$mmSitesManager", "mmaModForumDiscPerPage", function($q, $mmSite, $mmUser, $mmGroups, $translate, $mmSitesManager, mmaModForumDiscPerPage) {
    var self = {};
        function getCanAddDiscussionCacheKey(forumid, groupid) {
        return getCommonCanAddDiscussionCacheKey(forumid) + ':' + groupid;
    }
        function getCommonCanAddDiscussionCacheKey(forumid) {
        return 'mmaModForum:canadddiscussion:' + forumid;
    }
        function getForumDataCacheKey(courseid) {
        return 'mmaModForum:forum:' + courseid;
    }
        function getDiscussionPostsCacheKey(discussionid) {
        return 'mmaModForum:discussion:' + discussionid;
    }
        function getDiscussionsListCacheKey(forumid) {
        return 'mmaModForum:discussions:' + forumid;
    }
        self.addNewDiscussion = function(forumid, subject, message, subscribe, groupid) {
        var params = {
            forumid: forumid,
            subject: subject,
            message: message,
            options: [
                {
                    name: 'discussionsubscribe',
                    value: !!subscribe
                }
            ]
        };
        if (groupid) {
            params.groupid = groupid;
        }
        return $mmSite.write('mod_forum_add_discussion', params).then(function(response) {
            if (!response || !response.discussionid) {
                return $q.reject();
            } else {
                return response.discussionid;
            }
        });
    };
        self.canAddDiscussion = function(forumid, groupid) {
        var params = {
                forumid: forumid,
                groupid: groupid
            },
            preSets = {
                cacheKey: getCanAddDiscussionCacheKey(forumid, groupid)
            };
        return $mmSite.read('mod_forum_can_add_discussion', params, preSets).then(function(result) {
            if (result) {
                return !!result.status;
            }
            return $q.reject();
        });
    };
        self.canAddDiscussionToAll = function(forumid) {
        return self.canAddDiscussion(forumid, -1);
    };
        self.extractStartingPost = function(posts) {
        var lastPost = posts[posts.length - 1];
        if (lastPost.parent == 0) {
            posts.pop();
            return lastPost;
        }
        for (var i = 0; i < posts.length; i++) {
            if (posts[i].parent == 0) {
                array.splice(i, 1);
                return posts[i];
            }
        }
        return undefined;
    };
        self.isCanAddDiscussionAvailable = function() {
        return $mmSite.wsAvailable('mod_forum_can_add_discussion');
    };
        self.isPluginEnabled = function(siteId) {
        siteId = siteId || $mmSite.getId();
        return $mmSitesManager.getSite(siteId).then(function(site) {
            return  site.wsAvailable('mod_forum_get_forums_by_courses') &&
                    site.wsAvailable('mod_forum_get_forum_discussions_paginated') &&
                    site.wsAvailable('mod_forum_get_forum_discussion_posts');
        });
    };
        self.formatDiscussionsGroups = function(cmid, discussions) {
        discussions = angular.copy(discussions);
        return $translate('mm.core.allparticipants').then(function(strAllParts) {
            return $mmGroups.getActivityAllowedGroups(cmid).then(function(forumgroups) {
                var groups = {};
                angular.forEach(forumgroups, function(fg) {
                    groups[fg.id] = fg;
                });
                angular.forEach(discussions, function(disc) {
                    if (disc.groupid === -1) {
                        disc.groupname = strAllParts;
                    } else {
                        var group = groups[disc.groupid];
                        if (group) {
                            disc.groupname = group.name;
                        }
                    }
                });
                return discussions;
            });
        }).catch(function() {
            return discussions;
        });
    };
        self.getForum = function(courseid, cmid) {
        var params = {
                courseids: [courseid]
            },
            preSets = {
                cacheKey: getForumDataCacheKey(courseid)
            };
        return $mmSite.read('mod_forum_get_forums_by_courses', params, preSets).then(function(forums) {
            var currentForum;
            angular.forEach(forums, function(forum) {
                if (forum.cmid == cmid) {
                    currentForum = forum;
                }
            });
            if (currentForum) {
                return currentForum;
            }
            return $q.reject();
        });
    };
        self.getDiscussionPosts = function(discussionid) {
        var params = {
                discussionid: discussionid
            },
            preSets = {
                cacheKey: getDiscussionPostsCacheKey(discussionid)
            };
        return $mmSite.read('mod_forum_get_forum_discussion_posts', params, preSets).then(function(response) {
            if (response) {
                storeUserData(response.posts);
                return response.posts;
            } else {
                return $q.reject();
            }
        });
    };
        self.getDiscussions = function(forumid, page) {
        page = page || 0;
        var params = {
                forumid: forumid,
                sortby:  'timemodified',
                sortdirection:  'DESC',
                page: page,
                perpage: mmaModForumDiscPerPage
            },
            preSets = {
                cacheKey: getDiscussionsListCacheKey(forumid)
            };
        return $mmSite.read('mod_forum_get_forum_discussions_paginated', params, preSets).then(function(response) {
            if (response) {
                var canLoadMore = response.discussions.length >= mmaModForumDiscPerPage;
                storeUserData(response.discussions);
                return {discussions: response.discussions, canLoadMore: canLoadMore};
            } else {
                return $q.reject();
            }
        });
    };
        self.invalidateCanAddDiscussion = function(forumid) {
        return $mmSite.invalidateWsCacheForKeyStartingWith(getCommonCanAddDiscussionCacheKey(forumid));
    };
        self.invalidateDiscussionPosts = function(discussionid) {
        return $mmSite.invalidateWsCacheForKey(getDiscussionPostsCacheKey(discussionid));
    };
        self.invalidateDiscussionsList = function(forumid) {
        return $mmSite.invalidateWsCacheForKey(getDiscussionsListCacheKey(forumid));
    };
        self.invalidateForumData = function(courseid) {
        return $mmSite.invalidateWsCacheForKey(getForumDataCacheKey(courseid));
    };
        self.isCreateDiscussionEnabled = function() {
        return $mmSite.wsAvailable('core_group_get_activity_groupmode') &&
                $mmSite.wsAvailable('core_group_get_activity_allowed_groups') &&
                $mmSite.wsAvailable('mod_forum_add_discussion');
    };
        self.isReplyPostEnabled = function() {
        return $mmSite.wsAvailable('mod_forum_add_discussion_post');
    };
        self.logView = function(id) {
        if (id) {
            var params = {
                forumid: id
            };
            return $mmSite.write('mod_forum_view_forum', params);
        }
        return $q.reject();
    };
        self.replyPost = function(postid, subject, message) {
        var params = {
            postid: postid,
            subject: subject,
            message: message
        };
        return $mmSite.write('mod_forum_add_discussion_post', params).then(function(response) {
            if (!response || !response.postid) {
                return $q.reject();
            } else {
                return response.postid;
            }
        });
    };
        function storeUserData(list) {
        var ids = [];
        angular.forEach(list, function(entry) {
            var id = parseInt(entry.userid);
            if (!isNaN(id) && ids.indexOf(id) === -1) {
                ids.push(id);
                $mmUser.storeUser(id, entry.userfullname, entry.userpictureurl);
            }
            if (typeof entry.usermodified != 'undefined') {
                id = parseInt(entry.usermodified);
                if(!isNaN(id) && ids.indexOf(id) === -1) {
                    ids.push(id);
                    $mmUser.storeUser(id, entry.usermodifiedfullname, entry.usermodifiedpictureurl);
                }
            }
        });
    }
    return self;
}]);

angular.module('mm.addons.mod_forum')
.factory('$mmaModForumHandlers', ["$mmCourse", "$mmaModForum", "$state", "$mmUtil", "$mmContentLinksHelper", "$q", function($mmCourse, $mmaModForum, $state, $mmUtil, $mmContentLinksHelper, $q) {
    var self = {};
        self.courseContent = function() {
        var self = {};
                self.isEnabled = function() {
            return $mmaModForum.isPluginEnabled();
        };
                self.getController = function(module, courseid) {
            return function($scope) {
                $scope.title = module.name;
                $scope.icon = $mmCourse.getModuleIconSrc('forum');
                $scope.action = function(e) {
                    if (e) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    $state.go('site.mod_forum', {module: module, courseid: courseid});
                };
            };
        };
        return self;
    };
        self.linksHandler = function() {
        var self = {},
            patterns = ['/mod/forum/view.php', '/mod/forum/discuss.php'];
                function isIndexEnabled(siteId, courseId) {
            return $mmaModForum.isPluginEnabled(siteId).then(function(enabled) {
                if (!enabled) {
                    return false;
                }
                return courseId || $mmCourse.canGetModuleWithoutCourseId(siteId);
            });
        }
                function isDiscEnabled(siteId) {
            return $mmaModForum.isPluginEnabled(siteId);
        }
                self.getActions = function(siteIds, url, courseId) {
            if (url.indexOf(patterns[0]) > -1) {
                return $mmContentLinksHelper.treatModuleIndexUrl(siteIds, url, isIndexEnabled, courseId);
            } else if (url.indexOf(patterns[1]) > -1) {
                var params = $mmUtil.extractUrlParams(url);
                if (params.d != 'undefined') {
                    courseId = courseId || params.courseid || params.cid;
                    return $mmContentLinksHelper.filterSupportedSites(siteIds, isDiscEnabled, false, courseId).then(function(ids) {
                        if (!ids.length) {
                            return [];
                        } else {
                            return [{
                                message: 'mm.core.view',
                                icon: 'ion-eye',
                                sites: ids,
                                action: function(siteId) {
                                    var stateParams = {
                                        discussionid: parseInt(params.d, 10),
                                        cid: courseId
                                    };
                                    $mmContentLinksHelper.goInSite('site.mod_forum-discussion', stateParams, siteId);
                                }
                            }];
                        }
                    });
                }
            }
            return $q.when([]);
        };
                self.handles = function(url) {
            for (var i = 0; i < patterns.length; i++) {
                var position = url.indexOf(patterns[i]);
                if (position > -1) {
                    return url.substr(0, position);
                }
            }
        };
        return self;
    };
    return self;
}]);

angular.module('mm.addons.mod_glossary')
.controller('mmaModGlossaryEntryCtrl', ["$scope", "$stateParams", "$mmaModGlossary", "$translate", "mmUserProfileState", function($scope, $stateParams, $mmaModGlossary, $translate,
        mmUserProfileState) {
    var entry = $stateParams.entry || {},
        courseid = $stateParams.cid || 0,
        glossary;
    if (!courseid) {
        notifyErrorOccured();
        return;
    }
    $scope.refreshEntry = function() {
        refreshEntry().finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
    $mmaModGlossary.getGlossaryById(courseid, entry.glossaryid).then(function(gloss) {
        glossary = gloss;
        var displayFormat = glossary.displayformat;
        $scope.title = entry.concept;
        $scope.entry = entry;
        $scope.courseid = courseid;
        $scope.userStateName = mmUserProfileState;
        if (displayFormat == 'fullwithauthor' || displayFormat == 'encyclopedia') {
            $scope.showAuthor = true;
            $scope.showDate = true;
        } else if (displayFormat == 'fullwithoutauthor') {
            $scope.showAuthor = false;
            $scope.showDate = true;
        } else {
            $scope.showAuthor = false;
            $scope.showDate = false;
        }
        $scope.loaded = true;
        $mmaModGlossary.logEntryView(entry.id);
    }).catch(function() {
        notifyErrorOccured();
    });
    function fetchEntry() {
        return $mmaModGlossary.getEntry(entry.id).then(function(result) {
            $scope.entry = result.entry;
            $scope.title = result.entry.concept;
        });
    }
    function refreshEntry() {
        return $mmaModGlossary.invalidateEntry(entry.id).then(function() {
            return fetchEntry();
        });
    }
    function notifyErrorOccured() {
        $scope.title = $translate.instant('mm.core.error');
        $scope.entry = false;
        $scope.loaded = true;
    }
}]);

angular.module('mm.addons.mod_glossary')
.controller('mmaModGlossaryIndexCtrl', ["$q", "$scope", "$stateParams", "$ionicPopover", "$mmUtil", "$mmaModGlossary", "$ionicScrollDelegate", "$translate", function($q, $scope, $stateParams, $ionicPopover, $mmUtil, $mmaModGlossary,
        $ionicScrollDelegate, $translate) {
    var module = $stateParams.module || {},
        courseId = $stateParams.courseid,
        glossary,
        noop = function(){},
        limitFrom = 0,
        limitNum = 25,
        popover,
        viewMode,  
        fetchMode = 'letter_all',      
        fetchFunction,
        fetchInvalidate,
        fetchArguments,
        popoverScope = $scope.$new(true),
        browseModes = [
            {
                key: 'letter_all',
                langkey: 'mma.mod_glossary.byalphabet'
            },
            {
                key: 'search',
                langkey: 'mma.mod_glossary.bysearch'
            }
        ],
        searchingMessage = $translate.instant('mm.core.searching'),
        loadingMessage = $translate.instant('mm.core.loading');
    $scope.title = module.name;
    $scope.description = module.description;
    $scope.externalUrl = module.url;
    $scope.courseid = courseId;
    $scope.loaded = false;
    $scope.entries = [];
    $scope.getDivider = noop;
    $scope.showDivider = noop;
    $scope.canLoadMore = false;
    $scope.searchData = {
        searchQuery: ''
    };
    $scope.loadingMessage = loadingMessage;
    $scope.loadMoreEntries = function() {
        loadMoreEntries().finally(function() {
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };
    $scope.refreshEntries = function() {
        refreshEntries().finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
    $scope.pickMode = function(e) {
        popoverScope.data.selectedMode = fetchMode;
        popover.show(e);
    };
    $scope.search = function(query) {
        $scope.loadingMessage = searchingMessage;
        fetchArguments = [glossary.id, query, 1, 'CONCEPT', 'ASC'];
        $scope.loaded = false;
        fetchEntries().finally(function() {
            $scope.loaded = true;
        });
    };
    $scope.trackBy = function(entry) {
        return fetchMode + ':' + entry.id;
    };
    $mmaModGlossary.getGlossary(courseId, module.id).then(function(mod) {
        glossary = mod;
        if (glossary.browsemodes.indexOf('date') >= 0) {
            browseModes.push({key: 'newest_first', langkey: 'mma.mod_glossary.bynewestfirst'});
            browseModes.push({key: 'recently_updated', langkey: 'mma.mod_glossary.byrecentlyupdated'});
        }
        if (glossary.browsemodes.indexOf('author') >= 0) {
            browseModes.push({key: 'author_all', langkey: 'mma.mod_glossary.byauthor'});
        }
        popoverScope.modes = browseModes;
        popoverScope.modePicked = function(mode) {
            $scope.loadingMessage = loadingMessage;
            $ionicScrollDelegate.$getByHandle('mmaModGlossaryIndex').scrollTop(false);
            if (switchMode(mode)) {
                $scope.loaded = false;
                fetchEntries().finally(function() {
                    $scope.loaded = true;
                });
            } else {
                $scope.loaded = true;
                $scope.entries = [];
                $scope.canLoadMore = false;
                $scope.showNoEntries = false;
            }
            popover.hide();
        };
        popoverScope.data = { selectedMode: '' };
        $ionicPopover.fromTemplateUrl('addons/mod_glossary/templates/mode_picker.html', {
            scope: popoverScope
        }).then(function(po) {
            popover = po;
        });
        $scope.$on('$destroy', function() {
            popover.remove();
            popoverScope.$destroy();
        });
        switchMode();
        fetchEntries().then(function() {
            $mmaModGlossary.logView(glossary.id, viewMode);
        }).finally(function() {
            $scope.loaded = true;
        });
    }).catch(function() {
        $mmUtil.showErrorModal('mma.mod_glossary.errorloadingglossary', true);
        $scope.loaded = true;
    });
    function fetchEntries(append) {
        if (!append) {
            limitFrom = 0;
        }
        var args = angular.extend([], fetchArguments);
        args.push(limitFrom);
        args.push(limitNum);
        return fetchFunction.apply(this, args).then(function(result) {
            if (append) {
                $scope.entries = $scope.entries.concat(result.entries);
            } else {
                $scope.entries = result.entries;
            }
            $scope.canLoadMore = (limitFrom + limitNum) < result.count;
            $scope.showNoEntries = result.count <= 0;
        }).catch(function() {
            $mmUtil.showErrorModal('mma.mod_glossary.errorloadingentries', true);
            return $q.reject();
        });
    }
    function refreshEntries() {
        if (fetchMode == 'search' && !$scope.searchQuery) {
            return $q.when();
        }
        var args = angular.extend([], fetchArguments);
        return fetchInvalidate.apply(this, args).then(function() {
            limitFrom = 0;
            return fetchEntries();
        });
    }
    function loadMoreEntries() {
        limitFrom += limitNum;
        return fetchEntries(true);
    }
    function switchMode(mode) {
        if (mode == fetchMode) {
            return false;
        }
        var instantFetch = true;
        fetchMode = mode;
        $scope.isSearch = false;
        if (mode == 'author_all') {
            viewMode = 'author';
            fetchFunction = $mmaModGlossary.getEntriesByAuthor;
            fetchInvalidate = $mmaModGlossary.invalidateEntriesByAuthor;
            fetchArguments = [glossary.id, 'ALL', 'LASTNAME', 'ASC'];
            $scope.getDivider = function(entry) {
                return entry.userfullname;
            };
            $scope.showDivider = function(entry, previous) {
                if (typeof previous === 'undefined') {
                    return true;
                }
                return entry.userid != previous.userid;
            };
        } else if (mode == 'newest_first') {
            viewMode = 'date';
            fetchFunction = $mmaModGlossary.getEntriesByDate;
            fetchInvalidate = $mmaModGlossary.invalidateEntriesByDate;
            fetchArguments = [glossary.id, 'CREATION', 'DESC'];
            $scope.getDivider = noop;
            $scope.showDivider = function() { return false; };
        } else if (mode == 'recently_updated') {
            viewMode = 'date';
            fetchFunction = $mmaModGlossary.getEntriesByDate;
            fetchInvalidate = $mmaModGlossary.invalidateEntriesByDate;
            fetchArguments = [glossary.id, 'UPDATE', 'DESC'];
            $scope.getDivider = noop;
            $scope.showDivider = function() { return false; };
        } else if (mode == 'search') {
            viewMode = 'search';
            fetchFunction = $mmaModGlossary.getEntriesBySearch;
            fetchInvalidate = $mmaModGlossary.invalidateEntriesBySearch;
            fetchArguments = false;
            $scope.isSearch = true;
            $scope.getDivider = noop;
            $scope.showDivider = function() { return false; };
            instantFetch = false;
        } else {
            viewMode = 'letter';
            fetchMode = 'letter_all';
            fetchFunction = $mmaModGlossary.getEntriesByLetter;
            fetchInvalidate = $mmaModGlossary.invalidateEntriesByLetter;
            fetchArguments = [glossary.id, 'ALL'];
            $scope.getDivider = function(entry) {
                return entry.concept.substr(0, 1).toUpperCase();
            };
            $scope.showDivider = function(entry, previous) {
                if (typeof previous === 'undefined') {
                    return true;
                }
                return $scope.getDivider(entry) != $scope.getDivider(previous);
            };
        }
        return instantFetch;
    }
}]);

angular.module('mm.addons.mod_glossary')
.factory('$mmaModGlossary', ["$mmSite", "$q", "$mmSitesManager", function($mmSite, $q, $mmSitesManager) {
    var self = {};
        self._getCourseGlossariesCacheKey = function(courseId) {
        return 'mmaModGlossary:courseGlossaries:' + courseId;
    };
        self.getCourseGlossaries = function(courseId) {
        var params = {
                courseids: [courseId]
            },
            preSets = {
                cacheKey: self._getCourseGlossariesCacheKey(courseId)
            };
        return $mmSite.read('mod_glossary_get_glossaries_by_courses', params, preSets).then(function(result) {
            return result.glossaries;
        });
    };
        self.invalidateCourseGlossaries = function(courseId) {
        var key = self._getCourseGlossariesCacheKey(courseId);
        return $mmSite.invalidateWsCacheForKey(key);
    };
        self._getEntriesByAuthorCacheKey = function(glossaryId, letter, field, sort) {
        return 'mmaModGlossary:entriesByAuthor:' + glossaryId + ":" + letter + ":" + field + ":" + sort;
    };
        self.getEntriesByAuthor = function(glossaryId, letter, field, sort, from, limit) {
        var params = {
                id: glossaryId,
                letter: letter,
                field: field,
                sort: sort,
                from: from,
                limit: limit
            },
            preSets = {
                cacheKey: self._getEntriesByAuthorCacheKey(glossaryId, letter, field, sort)
            };
        return $mmSite.read('mod_glossary_get_entries_by_author', params, preSets);
    };
        self.invalidateEntriesByAuthor = function(glossaryId, letter, field, sort) {
        var key = self._getEntriesByAuthorCacheKey(glossaryId, letter, field, sort);
        return $mmSite.invalidateWsCacheForKey(key);
    };
        self._getEntriesByDateCacheKey = function(glossaryId, order, sort) {
        return 'mmaModGlossary:entriesByDate:' + glossaryId + ":" + order + ":" + sort;
    };
        self.getEntriesByDate = function(glossaryId, order, sort, from, limit) {
        var params = {
                id: glossaryId,
                order: order,
                sort: sort,
                from: from,
                limit: limit
            },
            preSets = {
                cacheKey: self._getEntriesByDateCacheKey(glossaryId, order, sort)
            };
        return $mmSite.read('mod_glossary_get_entries_by_date', params, preSets);
    };
        self.invalidateEntriesByDate = function(glossaryId, order, sort) {
        var key = self._getEntriesByDateCacheKey(glossaryId, order, sort);
        return $mmSite.invalidateWsCacheForKey(key);
    };
        self._getEntriesByLetterCacheKey = function(glossaryId, letter) {
        return 'mmaModGlossary:entriesByLetter:' + glossaryId + ":" + letter;
    };
        self.getEntriesByLetter = function(glossaryId, letter, from, limit) {
        var params = {
                id: glossaryId,
                letter: letter,
                from: from,
                limit: limit
            },
            preSets = {
                cacheKey: self._getEntriesByLetterCacheKey(glossaryId, letter)
            };
        return $mmSite.read('mod_glossary_get_entries_by_letter', params, preSets);
    };
        self.invalidateEntriesByLetter = function(glossaryId, letter) {
        var key = self._getEntriesByLetterCacheKey(glossaryId, letter);
        return $mmSite.invalidateWsCacheForKey(key);
    };
        self._getEntriesBySearchCacheKey = function(glossaryId, query, fullsearch, order, sort) {
        return 'mmaModGlossary:entriesBySearch:' + glossaryId + ":" + fullsearch + ":" + order + ":" + sort + ":" + query;
    };
        self.getEntriesBySearch = function(glossaryId, query, fullsearch, order, sort, from, limit) {
        var params = {
                id: glossaryId,
                query: query,
                fullsearch: fullsearch,
                order: order,
                sort: sort,
                from: from,
                limit: limit
            },
            preSets = {
                cacheKey: self._getEntriesBySearchCacheKey(glossaryId, query, fullsearch, order, sort)
            };
        return $mmSite.read('mod_glossary_get_entries_by_search', params, preSets);
    };
        self.invalidateEntriesBySearch = function(glossaryId, query, fullsearch, order, sort) {
        var key = self._getEntriesBySearchCacheKey(glossaryId, query, fullsearch, order, sort);
        return $mmSite.invalidateWsCacheForKey(key);
    };
        self._getEntryCacheKey = function(id) {
        return 'mmaModGlossary:getEntry:' + id;
    };
        self.getEntry = function(id, siteId) {
        siteId = siteId || $mmSite.getId();
        return $mmSitesManager.getSite(siteId).then(function(site) {
            var params = {
                    id: id
                },
                preSets = {
                    cacheKey: self._getEntryCacheKey(id)
                };
            return site.read('mod_glossary_get_entry_by_id', params, preSets);
        });
    };
        self.invalidateEntry = function(id) {
        var key = self._getEntryCacheKey(id);
        return $mmSite.invalidateWsCacheForKey(key);
    };
        self.getGlossary = function(courseId, cmid) {
        return self.getCourseGlossaries(courseId).then(function(glossaries) {
            var result = $q.reject();
            angular.forEach(glossaries, function(glossary) {
                if (glossary.coursemodule == cmid) {
                    result = glossary;
                }
            });
            return result;
        });
    };
        self.getGlossaryById = function(courseId, id) {
        return self.getCourseGlossaries(courseId).then(function(glossaries) {
            var result = $q.reject();
            angular.forEach(glossaries, function(glossary) {
                if (glossary.id == id) {
                    result = glossary;
                }
            });
            return result;
        });
    };
        self.isPluginEnabled = function(siteId) {
        siteId = siteId || $mmSite.getId();
        return $mmSitesManager.getSite(siteId).then(function(site) {
            return site.wsAvailable('mod_glossary_get_glossaries_by_courses');
        });
    };
        self.logView = function(id, mode) {
        var params = {
            id: id,
            mode: mode
        };
        return $mmSite.write('mod_glossary_view_glossary', params);
    };
        self.logEntryView = function(id) {
        var params = {
            id: id
        };
        return $mmSite.write('mod_glossary_view_entry', params);
    };
    return self;
}]);

angular.module('mm.addons.mod_glossary')
.factory('$mmaModGlossaryHandlers', ["$mmCourse", "$mmaModGlossary", "$state", "$q", "$mmContentLinksHelper", "$mmUtil", "$mmCourseHelper", function($mmCourse, $mmaModGlossary, $state, $q, $mmContentLinksHelper, $mmUtil,
            $mmCourseHelper) {
    var self = {};
        self.courseContent = function() {
        var self = {};
                self.isEnabled = function() {
            return $mmaModGlossary.isPluginEnabled();
        };
                self.getController = function(module, courseid) {
            return function($scope) {
                $scope.icon = $mmCourse.getModuleIconSrc('glossary');
                $scope.title = module.name;
                $scope.action = function(e) {
                    if (e) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    $state.go('site.mod_glossary', {module: module, courseid: courseid});
                };
            };
        };
        return self;
    };
        self.linksHandler = function() {
        var self = {},
            patterns = ['/mod/glossary/view.php', '/mod/glossary/showentry.php'];
                function isIndexEnabled(siteId, courseId) {
            return $mmaModGlossary.isPluginEnabled(siteId).then(function(enabled) {
                if (!enabled) {
                    return false;
                }
                return courseId || $mmCourse.canGetModuleWithoutCourseId(siteId);
            });
        }
                function isEntryEnabled(siteId, courseId) {
            return $mmaModGlossary.isPluginEnabled(siteId).then(function(enabled) {
                if (!enabled) {
                    return false;
                }
                return courseId || $mmCourse.canGetModuleByInstance(siteId);
            });
        }
        function getEntry(entryId, siteId) {
            return $mmaModGlossary.getEntry(entryId, siteId).then(function(result) {
                return result.entry;
            }).catch(function(error) {
                if (error) {
                    $mmUtil.showErrorModal(error);
                } else {
                    $mmUtil.showErrorModal('mma.mod_glossary.errorloadingentry', true);
                }
                return $q.reject();
            });
        }
                function treatEntryLink(siteIds, url, courseId) {
            var params = $mmUtil.extractUrlParams(url);
            if (params.eid != 'undefined') {
                courseId = courseId || params.courseid || params.cid;
                return $mmContentLinksHelper.filterSupportedSites(siteIds, isEntryEnabled, false, courseId).then(function(ids) {
                    if (!ids.length) {
                        return [];
                    }
                    return [{
                        message: 'mm.core.view',
                        icon: 'ion-eye',
                        sites: ids,
                        action: function(siteId) {
                            var modal = $mmUtil.showModalLoading();
                            return getEntry(parseInt(params.eid, 10), siteId).then(function(entry) {
                                var promise;
                                if (courseId) {
                                    promise = $q.when(courseId);
                                } else {
                                    promise = $mmCourseHelper.getModuleCourseIdByInstance(entry.glossaryid, 'glossary', siteId);
                                }
                                return promise.then(function(courseId) {
                                    var stateParams = {
                                        entry: entry,
                                        entryid: entry.id,
                                        cid: courseId
                                    };
                                    $mmContentLinksHelper.goInSite('site.mod_glossary-entry', stateParams, siteId);
                                });
                            }).finally(function() {
                                modal.dismiss();
                            });
                        }
                    }];
                });
            }
        }
                self.getActions = function(siteIds, url, courseId) {
            if (url.indexOf(patterns[0]) > -1) {
                return $mmContentLinksHelper.treatModuleIndexUrl(siteIds, url, isIndexEnabled, courseId);
            } else if (url.indexOf(patterns[1]) > -1) {
                return treatEntryLink(siteIds, url, courseId);
            }
            return $q.when([]);
        };
                self.handles = function(url) {
            for (var i = 0; i < patterns.length; i++) {
                var position = url.indexOf(patterns[i]);
                if (position > -1) {
                    return url.substr(0, position);
                }
            }
        };
        return self;
    };
    return self;
}]);

angular.module('mm.addons.mod_imscp')
.controller('mmaModImscpIndexCtrl', ["$scope", "$stateParams", "$mmUtil", "$mmaModImscp", "$log", "mmaModImscpComponent", "$ionicPopover", "$timeout", "$q", "$mmCourse", "$mmApp", function($scope, $stateParams, $mmUtil, $mmaModImscp, $log, mmaModImscpComponent,
            $ionicPopover, $timeout, $q, $mmCourse, $mmApp) {
    $log = $log.getInstance('mmaModImscpIndexCtrl');
    var module = $stateParams.module || {},
        courseid = $stateParams.courseid,
        currentItem;
    $scope.title = module.name;
    $scope.description = module.description;
    $scope.component = mmaModImscpComponent;
    $scope.componentId = module.id;
    $scope.externalUrl = module.url;
    $scope.loaded = false;
    $scope.previousItem = '';
    $scope.nextItem = '';
    $scope.items = $mmaModImscp.createItemList(module.contents);
    if ($scope.items.length) {
        currentItem = $scope.items[0].href;
    }
    function loadItem(itemId) {
        currentItem = itemId;
        $scope.previousItem = $mmaModImscp.getPreviousItem($scope.items, itemId);
        $scope.nextItem = $mmaModImscp.getNextItem($scope.items, itemId);
        var src = $mmaModImscp.getFileSrc(module, itemId);
        if ($scope.src && src.toString() == $scope.src.toString()) {
            $scope.src = '';
            $timeout(function() {
                $scope.src = src;
            });
        } else {
            $scope.src = src;
        }
    }
    function fetchContent() {
        if (module.contents && module.contents.length) {
            var downloadFailed = false;
            return $mmaModImscp.downloadAllContent(module).catch(function() {
                downloadFailed = true;
            }).finally(function() {
                return $mmaModImscp.getIframeSrc(module).then(function() {
                    loadItem(currentItem);
                    if (downloadFailed && $mmApp.isOnline()) {
                        $mmUtil.showErrorModal('mm.core.errordownloadingsomefiles', true);
                    }
                }).catch(function() {
                    $mmUtil.showErrorModal('mma.mod_imscp.deploymenterror', true);
                    return $q.reject();
                }).finally(function() {
                    $scope.loaded = true;
                });
            });
        } else {
            $mmUtil.showErrorModal('mma.mod_imscp.deploymenterror', true);
            return $q.reject();
        }
    }
    $scope.doRefresh = function() {
        $mmaModImscp.invalidateContent(module.id).then(function() {
            return fetchContent();
        }).finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
    $scope.loadItem = function(itemId) {
        $scope.popover.hide();
        loadItem(itemId);
    };
    $scope.getNumberForPadding = function(n) {
        return new Array(n);
    };
    $ionicPopover.fromTemplateUrl('addons/mod_imscp/templates/toc.html', {
        scope: $scope,
    }).then(function(popover) {
        $scope.popover = popover;
    });
    fetchContent().then(function() {
        $mmaModImscp.logView(module.instance).then(function() {
            $mmCourse.checkModuleCompletion(courseid, module.completionstatus);
        });
    });
}]);

angular.module('mm.addons.mod_imscp')
.factory('$mmaModImscpHandlers', ["$mmCourse", "$mmaModImscp", "$mmEvents", "$state", "$mmSite", "$mmCourseHelper", "$mmFilepool", "$mmCoursePrefetchDelegate", "mmCoreDownloading", "mmCoreNotDownloaded", "mmCoreOutdated", "mmCoreEventPackageStatusChanged", "mmaModImscpComponent", "$mmContentLinksHelper", "$q", "$mmaModImscpPrefetchHandler", function($mmCourse, $mmaModImscp, $mmEvents, $state, $mmSite, $mmCourseHelper, $mmFilepool,
            $mmCoursePrefetchDelegate, mmCoreDownloading, mmCoreNotDownloaded, mmCoreOutdated, mmCoreEventPackageStatusChanged,
            mmaModImscpComponent, $mmContentLinksHelper, $q, $mmaModImscpPrefetchHandler) {
    var self = {};
        self.courseContent = function() {
        var self = {};
                self.isEnabled = function() {
            return $mmaModImscp.isPluginEnabled();
        };
                self.getController = function(module, courseid) {
            return function($scope) {
                var downloadBtn,
                    refreshBtn,
                    revision = $mmFilepool.getRevisionFromFileList(module.contents),
                    timemodified = $mmFilepool.getTimemodifiedFromFileList(module.contents);
                downloadBtn = {
                    hidden: true,
                    icon: 'ion-ios-cloud-download-outline',
                    label: 'mm.core.download',
                    action: function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        var size = $mmaModImscpPrefetchHandler.getDownloadSize(module);
                        $mmCourseHelper.prefetchModule($mmaModImscp, module, size, false);
                    }
                };
                refreshBtn = {
                    icon: 'ion-android-refresh',
                    label: 'mm.core.refresh',
                    hidden: true,
                    action: function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        var size = $mmaModImscpPrefetchHandler.getDownloadSize(module);
                        $mmCourseHelper.prefetchModule($mmaModImscp, module, size, true);
                    }
                };
                $scope.title = module.name;
                $scope.icon = $mmCourse.getModuleIconSrc('imscp');
                $scope.buttons = [downloadBtn, refreshBtn];
                $scope.spinner = true;
                $scope.action = function(e) {
                    if (e) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    $state.go('site.mod_imscp', {module: module, courseid: courseid});
                };
                function showStatus(status) {
                    if (status) {
                        $scope.spinner = status === mmCoreDownloading;
                        downloadBtn.hidden = status !== mmCoreNotDownloaded;
                        refreshBtn.hidden = status !== mmCoreOutdated;
                    }
                }
                var statusObserver = $mmEvents.on(mmCoreEventPackageStatusChanged, function(data) {
                    if (data.siteid === $mmSite.getId() && data.componentId === module.id && data.component === mmaModImscpComponent) {
                        showStatus(data.status);
                    }
                });
                $mmCoursePrefetchDelegate.getModuleStatus(module, courseid, revision, timemodified).then(showStatus);
                $scope.$on('$destroy', function() {
                    statusObserver && statusObserver.off && statusObserver.off();
                });
            };
        };
        return self;
    };
        self.linksHandler = function() {
        var self = {};
                function isEnabled(siteId, courseId) {
            return $mmaModImscp.isPluginEnabled(siteId).then(function(enabled) {
                if (!enabled) {
                    return false;
                }
                return courseId || $mmCourse.canGetModuleWithoutCourseId(siteId);
            });
        }
                self.getActions = function(siteIds, url, courseId) {
            if (typeof self.handles(url) != 'undefined') {
                return $mmContentLinksHelper.treatModuleIndexUrl(siteIds, url, isEnabled, courseId);
            }
            return $q.when([]);
        };
                self.handles = function(url) {
            var position = url.indexOf('/mod/imscp/view.php');
            if (position > -1) {
                return url.substr(0, position);
            }
        };
        return self;
    };
    return self;
}]);

angular.module('mm.addons.mod_imscp')
.factory('$mmaModImscp', ["$mmFilepool", "$mmSite", "$mmFS", "$log", "$q", "$sce", "$mmApp", "$mmSitesManager", "mmaModImscpComponent", function($mmFilepool, $mmSite, $mmFS, $log, $q, $sce, $mmApp, $mmSitesManager, mmaModImscpComponent) {
    $log = $log.getInstance('$mmaModImscp');
    var self = {},
        currentDirPath;
        self.getToc = function(contents) {
        if (!contents || !contents.length) {
            return [];
        }
        return JSON.parse(contents[0].content);
    };
        self.createItemList = function(contents) {
        var items = [];
        var toc = self.getToc(contents);
        angular.forEach(toc, function(el) {
            items.push({href: el.href, title: el.title, level: el.level});
            angular.forEach(el.subitems, function(sel) {
                items.push({href: sel.href, title: sel.title, level: sel.level});
            });
        });
        return items;
    };
        self.getPreviousItem = function(items, itemId) {
        var previous = '';
        for (var i = 0, len = items.length; i < len; i++) {
            if (items[i].href == itemId) {
                break;
            }
            previous = items[i].href;
        }
        return previous;
    };
        self.getNextItem = function(items, itemId) {
        var next = '';
        for (var i = 0, len = items.length; i < len; i++) {
            if (items[i].href == itemId) {
                if (typeof items[i + 1] != 'undefined') {
                    next = items[i + 1].href;
                    break;
                }
            }
        }
        return next;
    };
        self.checkSpecialFiles = function(fileName) {
        return fileName == 'imsmanifest.xml';
    };
        self.downloadAllContent = function(module) {
        var files = self.getDownloadableFiles(module),
            revision = $mmFilepool.getRevisionFromFileList(module.contents),
            timemod = $mmFilepool.getTimemodifiedFromFileList(module.contents);
        return $mmFilepool.getPackageDirPathByUrl($mmSite.getId(), module.url).then(function(dirPath) {
            return $mmFilepool.downloadPackage($mmSite.getId(), files, mmaModImscpComponent, module.id, revision, timemod, dirPath);
        });
    };
        self.getDownloadableFiles = function(module) {
        var files = [];
        angular.forEach(module.contents, function(content) {
            if (self.isFileDownloadable(content)) {
                files.push(content);
            }
        });
        return files;
    };
        self.getDownloadingFilesEventNames = function(module) {
        var promises = [],
            eventNames = [],
            siteid = $mmSite.getId();
        angular.forEach(module.contents, function(content) {
            var url = content.fileurl;
            if (!self.isFileDownloadable(content)) {
                return;
            }
            promises.push($mmFilepool.isFileDownloadingByUrl(siteid, url).then(function() {
                return $mmFilepool.getFileEventNameByUrl(siteid, url).then(function(eventName) {
                    eventNames.push(eventName);
                });
            }, function() {
            }));
        });
        return $q.all(promises).then(function() {
            return eventNames;
        });
    };
        self.getFileEventNames = function(module) {
        var promises = [];
        angular.forEach(module.contents, function(content) {
            var url = content.fileurl;
            if (!self.isFileDownloadable(content)) {
                return;
            }
            promises.push($mmFilepool.getFileEventNameByUrl($mmSite.getId(), url));
        });
        return $q.all(promises).then(function(eventNames) {
            return eventNames;
        });
    };
        self._getFileUrlFromContents = function(contents, targetFilepath) {
        var indexUrl;
        angular.forEach(contents, function(content) {
            if (content.type == 'file' && !indexUrl) {
                var filepath = $mmFS.concatenatePaths(content.filepath, content.filename),
                    filepathalt = filepath.charAt(0) === '/' ? filepath.substr(1) : '/' + filepath;
                if (filepath === targetFilepath || filepathalt === targetFilepath) {
                    indexUrl = content.fileurl;
                }
            }
        });
        return indexUrl;
    };
        self.getIframeSrc = function(module) {
        var toc = self.getToc(module.contents),
            mainFilePath;
        if (!toc.length) {
            return $q.reject();
        }
        mainFilePath = toc[0].href;
        return $mmFilepool.getPackageDirUrlByUrl($mmSite.getId(), module.url).then(function(dirPath) {
            currentDirPath = dirPath;
            return $sce.trustAsResourceUrl($mmFS.concatenatePaths(dirPath, mainFilePath));
        }, function() {
            if ($mmApp.isOnline()) {
                var indexUrl = self._getFileUrlFromContents(module.contents, mainFilePath);
                if (indexUrl) {
                    return $sce.trustAsResourceUrl($mmSite.fixPluginfileURL(indexUrl));
                }
            }
            return $q.reject();
        });
    };
        self.getFileSrc = function(module, itemId) {
        if (currentDirPath) {
            return $sce.trustAsResourceUrl($mmFS.concatenatePaths(currentDirPath, itemId));
        } else {
            if ($mmApp.isOnline()) {
                var indexUrl = self._getFileUrlFromContents(module.contents, itemId);
                if (indexUrl) {
                    return $sce.trustAsResourceUrl($mmSite.fixPluginfileURL(indexUrl));
                }
            }
        }
    };
        self.invalidateContent = function(moduleId) {
        return $mmFilepool.invalidateFilesByComponent($mmSite.getId(), mmaModImscpComponent, moduleId);
    };
        self.isFileDownloadable = function(file) {
        return file.type === 'file' && !self.checkSpecialFiles(file.filename);
    };
        self.isPluginEnabled = function(siteId) {
        siteId = siteId || $mmSite.getId();
        return $mmSitesManager.getSite(siteId).then(function(site) {
            var version = site.getInfo().version;
            return version && (parseInt(version) >= 2015051100) && site.canDownloadFiles();
        });
    };
        self.logView = function(id) {
        if (id) {
            var params = {
                imscpid: id
            };
            return $mmSite.write('mod_imscp_view_imscp', params);
        }
        return $q.reject();
    };
        self.prefetchContent = function(module) {
        var files = self.getDownloadableFiles(module),
            revision = $mmFilepool.getRevisionFromFileList(module.contents),
            timemod = $mmFilepool.getTimemodifiedFromFileList(module.contents);
        return $mmFilepool.getPackageDirPathByUrl($mmSite.getId(), module.url).then(function(dirPath) {
            return $mmFilepool.prefetchPackage($mmSite.getId(), files, mmaModImscpComponent, module.id, revision, timemod, dirPath);
        });
    };
    return self;
}]);

angular.module('mm.addons.mod_imscp')
.factory('$mmaModImscpPrefetchHandler', ["$mmaModImscp", "mmaModImscpComponent", function($mmaModImscp, mmaModImscpComponent) {
    var self = {};
    self.component = mmaModImscpComponent;
        self.getDownloadSize = function(module) {
        var size = 0;
        angular.forEach(module.contents, function(content) {
            if ($mmaModImscp.isFileDownloadable(content) && content.filesize) {
                size = size + content.filesize;
            }
        });
        return size;
    };
        self.isEnabled = function() {
        return $mmaModImscp.isPluginEnabled();
    };
        self.prefetch = function(module) {
        return $mmaModImscp.prefetchContent(module);
    };
    return self;
}]);

angular.module('mm.core.course')
.controller('mmaModLabelIndexCtrl', ["$scope", "$stateParams", "$log", function($scope, $stateParams, $log) {
    $log = $log.getInstance('mmaModLabelIndexCtrl');
    $scope.description = $stateParams.description;
}]);

angular.module('mm.addons.mod_label')
.factory('$mmaModLabelHandlers', ["$mmText", "$translate", "$state", "$mmContentLinksHelper", "$q", "$mmCourse", function($mmText, $translate, $state, $mmContentLinksHelper, $q, $mmCourse) {
    var self = {};
        self.courseContent = function() {
        var self = {};
                self.isEnabled = function() {
            return true;
        };
                self.getController = function(module) {
            return function($scope) {
                var title = $mmText.shortenText($mmText.cleanTags(module.description).trim(), 128);
                if (title.length <= 0) {
                    $translate('mma.mod_label.taptoview').then(function(taptoview) {
                        $scope.title = '<span class="mma-mod_label-empty">' + taptoview + '</span>';
                    });
                } else {
                    $scope.title = title;
                }
                $scope.icon = false;
                $scope.action = function(e) {
                    if (e) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    $state.go('site.mod_label', {description: module.description});
                };
            };
        };
        return self;
    };
        self.linksHandler = function() {
        var self = {};
                function isEnabled(siteId, courseId) {
            if (courseId) {
                return $q.when(true);
            }
            return $mmCourse.canGetModuleWithoutCourseId(siteId);
        }
                self.getActions = function(siteIds, url, courseId) {
            if (typeof self.handles(url) != 'undefined') {
                return $mmContentLinksHelper.treatModuleIndexUrl(siteIds, url, isEnabled, courseId);
            }
            return $q.when([]);
        };
                self.handles = function(url) {
            var position = url.indexOf('/mod/label/view.php');
            if (position > -1) {
                return url.substr(0, position);
            }
        };
        return self;
    };
    return self;
}]);

angular.module('mm.addons.mod_lti')
.controller('mmaModLtiIndexCtrl', ["$scope", "$stateParams", "$mmaModLti", "$mmUtil", "$q", "$mmCourse", function($scope, $stateParams, $mmaModLti, $mmUtil, $q, $mmCourse) {
    var module = $stateParams.module || {},
        courseid = $stateParams.courseid,
        lti;
    $scope.title = module.name;
    $scope.description = module.description;
    $scope.courseid = courseid;
    function fetchLTI(refresh) {
        return $mmaModLti.getLti(courseid, module.id).then(function(ltidata) {
            lti = ltidata;
            return $mmaModLti.getLtiLaunchData(lti.id).then(function(launchdata) {
                lti.launchdata = launchdata;
                $scope.title = lti.name || $scope.title;
                $scope.description = lti.intro || $scope.description;
                $scope.isValidUrl = $mmUtil.isValidURL(launchdata.endpoint);
            });
        }).catch(function(message) {
            if (!refresh) {
                return refreshAllData();
            }
            if (message) {
                $mmUtil.showErrorModal(message);
            } else {
                $mmUtil.showErrorModal('mma.mod_lti.errorgetlti', true);
            }
            return $q.reject();
        });
    }
    function refreshAllData() {
        var p1 = $mmaModLti.invalidateLti(courseid),
            p2 = lti ? $mmaModLti.invalidateLtiLaunchData(lti.id) : $q.when();
        return $q.all([p1, p2]).finally(function() {
            return fetchLTI(true);
        });
    }
    fetchLTI().finally(function() {
        $scope.ltiLoaded = true;
    });
    $scope.doRefresh = function() {
        refreshAllData().finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
    $scope.launch = function() {
        $mmaModLti.logView(lti.id).then(function() {
            $mmCourse.checkModuleCompletion(courseid, module.completionstatus);
        });
        $mmaModLti.launch(lti.launchdata.endpoint, lti.launchdata.parameters).catch(function(message) {
            if (message) {
                $mmUtil.showErrorModal(message);
            }
        });
    };
}]);

angular.module('mm.addons.mod_lti')
.factory('$mmaModLtiHandlers', ["$mmCourse", "$mmaModLti", "$state", "$mmSite", "$mmFilepool", "$mmApp", "$mmUtil", "mmaModLtiComponent", "$mmContentLinksHelper", "$q", function($mmCourse, $mmaModLti, $state, $mmSite, $mmFilepool, $mmApp, $mmUtil,
            mmaModLtiComponent, $mmContentLinksHelper, $q) {
    var self = {};
        self.courseContent = function() {
        var self = {};
                self.isEnabled = function() {
            return $mmaModLti.isPluginEnabled();
        };
                self.getController = function(module, courseid) {
            return function($scope) {
                $scope.title = module.name;
                $scope.icon = $mmCourse.getModuleIconSrc('lti');
                $scope.action = function() {
                    $state.go('site.mod_lti', {module: module, courseid: courseid});
                };
                var promise = $mmaModLti.getLti(courseid, module.id);
                promise.then(function(ltidata) {
                    var icon = ltidata.secureicon || ltidata.icon;
                    if (icon) {
                        $mmFilepool.downloadUrl($mmSite.getId(), icon, false, mmaModLtiComponent, module.id).then(function(url) {
                            $scope.icon = url;
                        }).catch(function() {
                            if ($mmApp.isOnline()) {
                                $scope.icon = icon;
                            }
                        });
                    }
                });
                $scope.buttons = [{
                    icon: 'ion-link',
                    label: 'mma.mod_lti.launchactivity',
                    action: function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        var modal = $mmUtil.showModalLoading('mm.core.loading', true);
                        promise.then(function(ltidata) {
                            return $mmaModLti.getLtiLaunchData(ltidata.id).then(function(launchdata) {
                                $mmaModLti.logView(ltidata.id).then(function() {
                                    $mmCourse.checkModuleCompletion(courseid, module.completionstatus);
                                });
                                return $mmaModLti.launch(launchdata.endpoint, launchdata.parameters);
                            });
                        }).catch(function(message) {
                            if (message) {
                                $mmUtil.showErrorModal(message);
                            } else {
                                $mmUtil.showErrorModal('mma.mod_lti.errorgetlti', true);
                            }
                        }).finally(function() {
                            modal.dismiss();
                        });
                    }
                }];
            };
        };
        return self;
    };
        self.linksHandler = function() {
        var self = {};
                function isEnabled(siteId, courseId) {
            return $mmaModLti.isPluginEnabled(siteId).then(function(enabled) {
                if (!enabled) {
                    return false;
                }
                return courseId || $mmCourse.canGetModuleWithoutCourseId(siteId);
            });
        }
                self.getActions = function(siteIds, url, courseId) {
            if (typeof self.handles(url) != 'undefined') {
                return $mmContentLinksHelper.treatModuleIndexUrl(siteIds, url, isEnabled, courseId);
            }
            return $q.when([]);
        };
                self.handles = function(url) {
            var position = url.indexOf('/mod/lti/view.php');
            if (position > -1) {
                return url.substr(0, position);
            }
        };
        return self;
    };
    return self;
}]);

angular.module('mm.addons.mod_lti')
.factory('$mmaModLti', ["$q", "$mmSite", "$mmFS", "$mmText", "$mmUtil", "$mmLang", "$mmSitesManager", function($q, $mmSite, $mmFS, $mmText, $mmUtil, $mmLang, $mmSitesManager) {
    var self = {},
        launcherFileName = 'lti_launcher.html';
        self.deleteLauncher = function() {
        return $mmFS.removeFile(launcherFileName);
    };
        self.generateLauncher = function(url, params) {
        if (!$mmFS.isAvailable()) {
            return $q.when(url);
        }
        var text = '<form action="' + url + '" name="ltiLaunchForm" ' +
                    'method="post" encType="application/x-www-form-urlencoded">\n';
        angular.forEach(params, function(p) {
            if (p.name == 'ext_submit') {
                text += '    <input type="submit"';
            } else {
                text += '    <input type="hidden" name="' + $mmText.escapeHTML(p.name) + '"';
            }
            text += ' value="' + $mmText.escapeHTML(p.value) + '"/>\n';
        });
        text += '</form>\n';
        text += '<script type="text/javascript"> \n' +
            '    document.ltiLaunchForm.submit(); \n' +
            '</script> \n';
        return $mmFS.writeFile(launcherFileName, text).then(function(entry) {
            return entry.toURL();
        });
    };
        self.getLti = function(courseid, cmid) {
        var params = {
                courseids: [courseid]
            },
            preSets = {
                cacheKey: getLtiCacheKey(courseid)
            };
        return $mmSite.read('mod_lti_get_ltis_by_courses', params, preSets).then(function(response) {
            if (response.ltis) {
                var currentLti;
                angular.forEach(response.ltis, function(lti) {
                    if (lti.coursemodule == cmid) {
                        currentLti = lti;
                    }
                });
                if (currentLti) {
                    return currentLti;
                }
            }
            return $q.reject();
        });
    };
        function getLtiCacheKey(courseid) {
        return 'mmaModLti:lti:' + courseid;
    }
        self.getLtiLaunchData = function(id) {
        var params = {
                toolid: id
            },
            preSets = {
                cacheKey: getLtiLaunchDataCacheKey(id)
            };
        return $mmSite.read('mod_lti_get_tool_launch_data', params, preSets).then(function(response) {
            if (response.endpoint) {
                return response;
            }
            return $q.reject();
        });
    };
        function getLtiLaunchDataCacheKey(id) {
        return 'mmaModLti:launch:' + id;
    }
        self.invalidateLti = function(courseid) {
        return $mmSite.invalidateWsCacheForKey(getLtiCacheKey(courseid));
    };
        self.invalidateLtiLaunchData = function(id) {
        return $mmSite.invalidateWsCacheForKey(getLtiLaunchDataCacheKey(id));
    };
        self.isPluginEnabled = function(siteId) {
        siteId = siteId || $mmSite.getId();
        return $mmSitesManager.getSite(siteId).then(function(site) {
            return  site.wsAvailable('mod_lti_get_ltis_by_courses') &&
                    site.wsAvailable('mod_lti_get_tool_launch_data');
        });
    };
        self.launch = function(url, params) {
        if (!$mmUtil.isValidURL(url)) {
            return $mmLang.translateAndReject('mma.mod_lti.errorinvalidlaunchurl');
        }
        return self.generateLauncher(url, params).then(function(url) {
            $mmUtil.openInApp(url);
        });
    };
        self.logView = function(id) {
        if (id) {
            var params = {
                ltiid: id
            };
            return $mmSite.write('mod_lti_view_lti', params);
        }
        return $q.reject();
    };
    return self;
}]);

angular.module('mm.addons.mod_page')
.controller('mmaModPageIndexCtrl', ["$scope", "$stateParams", "$mmUtil", "$mmaModPage", "$mmCourse", "$q", "$log", "$mmApp", "mmaModPageComponent", function($scope, $stateParams, $mmUtil, $mmaModPage, $mmCourse, $q, $log, $mmApp,
            mmaModPageComponent) {
    $log = $log.getInstance('mmaModPageIndexCtrl');
    var module = $stateParams.module || {},
        courseid = $stateParams.courseid;
    $scope.title = module.name;
    $scope.description = module.description;
    $scope.component = mmaModPageComponent;
    $scope.componentId = module.id;
    $scope.externalUrl = module.url;
    $scope.loaded = false;
    function fetchContent() {
        var downloadFailed = false;
        return $mmaModPage.downloadAllContent(module).catch(function(err) {
            downloadFailed = true;
        }).then(function() {
            return $mmaModPage.getPageHtml(module.contents, module.id).then(function(content) {
                $scope.content = content;
                if (downloadFailed && $mmApp.isOnline()) {
                    $mmUtil.showErrorModal('mm.core.errordownloadingsomefiles', true);
                }
            }).catch(function() {
                $mmUtil.showErrorModal('mma.mod_page.errorwhileloadingthepage', true);
                return $q.reject();
            }).finally(function() {
                $scope.loaded = true;
            });
        });
    }
    $scope.doRefresh = function() {
        $mmaModPage.invalidateContent(module.id).then(function() {
            return fetchContent();
        }).finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
    fetchContent().then(function() {
        $mmaModPage.logView(module.instance).then(function() {
            $mmCourse.checkModuleCompletion(courseid, module.completionstatus);
        });
    });
}]);

angular.module('mm.addons.mod_page')
.factory('$mmaModPageHandlers', ["$mmCourse", "$mmaModPage", "$mmEvents", "$state", "$mmSite", "$mmCourseHelper", "$mmFilepool", "$mmCoursePrefetchDelegate", "mmCoreDownloading", "mmCoreNotDownloaded", "mmCoreOutdated", "mmCoreEventPackageStatusChanged", "mmaModPageComponent", "$mmContentLinksHelper", "$q", "$mmaModPagePrefetchHandler", function($mmCourse, $mmaModPage, $mmEvents, $state, $mmSite, $mmCourseHelper, $mmFilepool,
            $mmCoursePrefetchDelegate, mmCoreDownloading, mmCoreNotDownloaded, mmCoreOutdated, mmCoreEventPackageStatusChanged,
            mmaModPageComponent, $mmContentLinksHelper, $q, $mmaModPagePrefetchHandler) {
    var self = {};
        self.courseContent = function() {
        var self = {};
                self.isEnabled = function() {
            return $mmaModPage.isPluginEnabled();
        };
                self.getController = function(module, courseid) {
            return function($scope) {
                var downloadBtn,
                    refreshBtn,
                    revision = $mmFilepool.getRevisionFromFileList(module.contents),
                    timemodified = $mmFilepool.getTimemodifiedFromFileList(module.contents);
                downloadBtn = {
                    hidden: true,
                    icon: 'ion-ios-cloud-download-outline',
                    label: 'mm.core.download',
                    action: function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        var size = $mmaModPagePrefetchHandler.getDownloadSize(module);
                        $mmCourseHelper.prefetchModule($mmaModPage, module, size, false);
                    }
                };
                refreshBtn = {
                    icon: 'ion-android-refresh',
                    label: 'mm.core.refresh',
                    hidden: true,
                    action: function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        var size = $mmaModPagePrefetchHandler.getDownloadSize(module);
                        $mmCourseHelper.prefetchModule($mmaModPage, module, size, true);
                    }
                };
                $scope.title = module.name;
                $scope.icon = $mmCourse.getModuleIconSrc('page');
                $scope.buttons = [downloadBtn, refreshBtn];
                $scope.spinner = true;
                $scope.action = function(e) {
                    if (e) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    $state.go('site.mod_page', {module: module, courseid: courseid});
                };
                function showStatus(status) {
                    if (status) {
                        $scope.spinner = status === mmCoreDownloading;
                        downloadBtn.hidden = status !== mmCoreNotDownloaded;
                        refreshBtn.hidden = status !== mmCoreOutdated;
                    }
                }
                var statusObserver = $mmEvents.on(mmCoreEventPackageStatusChanged, function(data) {
                    if (data.siteid === $mmSite.getId() && data.componentId === module.id && data.component === mmaModPageComponent) {
                        showStatus(data.status);
                    }
                });
                $mmCoursePrefetchDelegate.getModuleStatus(module, courseid, revision, timemodified).then(showStatus);
                $scope.$on('$destroy', function() {
                    statusObserver && statusObserver.off && statusObserver.off();
                });
            };
        };
        return self;
    };
        self.linksHandler = function() {
        var self = {};
                function isEnabled(siteId, courseId) {
            return $mmaModPage.isPluginEnabled(siteId).then(function(enabled) {
                if (!enabled) {
                    return false;
                }
                return courseId || $mmCourse.canGetModuleWithoutCourseId(siteId);
            });
        }
                self.getActions = function(siteIds, url, courseId) {
            if (typeof self.handles(url) != 'undefined') {
                return $mmContentLinksHelper.treatModuleIndexUrl(siteIds, url, isEnabled, courseId);
            }
            return $q.when([]);
        };
                self.handles = function(url) {
            var position = url.indexOf('/mod/page/view.php');
            if (position > -1) {
                return url.substr(0, position);
            }
        };
        return self;
    };
    return self;
}]);

angular.module('mm.addons.mod_page')
.factory('$mmaModPage', ["$mmFilepool", "$mmSite", "$mmFS", "$http", "$log", "$q", "$mmSitesManager", "$mmUtil", "mmaModPageComponent", function($mmFilepool, $mmSite, $mmFS, $http, $log, $q, $mmSitesManager, $mmUtil, mmaModPageComponent) {
    $log = $log.getInstance('$mmaModPage');
    var self = {};
        self.downloadAllContent = function(module) {
        var files = self.getDownloadableFiles(module),
            revision = $mmFilepool.getRevisionFromFileList(module.contents),
            timemod = $mmFilepool.getTimemodifiedFromFileList(module.contents);
        return $mmFilepool.downloadPackage($mmSite.getId(), files, mmaModPageComponent, module.id, revision, timemod);
    };
        self.getDownloadableFiles = function(module) {
        var files = [];
        angular.forEach(module.contents, function(content) {
            if (self.isFileDownloadable(content)) {
                files.push(content);
            }
        });
        return files;
    };
        self.getDownloadingFilesEventNames = function(module) {
        var promises = [],
            eventNames = [],
            siteid = $mmSite.getId();
        angular.forEach(module.contents, function(content) {
            var url = content.fileurl;
            if (!self.isFileDownloadable(content)) {
                return;
            }
            promises.push($mmFilepool.isFileDownloadingByUrl(siteid, url).then(function() {
                return $mmFilepool.getFileEventNameByUrl(siteid, url).then(function(eventName) {
                    eventNames.push(eventName);
                });
            }, function() {
            }));
        });
        return $q.all(promises).then(function() {
            return eventNames;
        });
    };
        self.getFileEventNames = function(module) {
        var promises = [];
        angular.forEach(module.contents, function(content) {
            var url = content.fileurl;
            if (!self.isFileDownloadable(content)) {
                return;
            }
            promises.push($mmFilepool.getFileEventNameByUrl($mmSite.getId(), url));
        });
        return $q.all(promises).then(function(eventNames) {
            return eventNames;
        });
    };
        self.getPageHtml = function(contents, moduleId) {
        var indexUrl,
            paths = {},
            promise;
        angular.forEach(contents, function(content) {
            var key,
                url = content.fileurl;
            if (self._isMainPage(content)) {
                indexUrl = url;
            } else {
                key = content.filename;
                if (content.filepath !== '/') {
                    key = content.filepath.substr(1) + key;
                }
                paths[key] = url;
            }
        });
        promise = (function() {
            var deferred;
            if (!indexUrl) {
                $log.debug('Could not locate the index page');
                return $q.reject();
            } else if ($mmFS.isAvailable()) {
                return $mmFilepool.downloadUrl($mmSite.getId(), indexUrl, false, mmaModPageComponent, moduleId);
            } else {
                return $q.when($mmSite.fixPluginfileURL(indexUrl));
            }
        })();
        return promise.then(function(url) {
            return $http.get(url).then(function(response) {
                if (typeof response.data !== 'string') {
                    return $q.reject();
                } else {
                    return $mmUtil.restoreSourcesInHtml(response.data, paths);
                }
            });
        });
    };
        self.invalidateContent = function(moduleId) {
        return $mmFilepool.invalidateFilesByComponent($mmSite.getId(), mmaModPageComponent, moduleId);
    };
        self.isFileDownloadable = function(file) {
        return file.type === 'file';
    };
        self._isMainPage = function(file) {
        var filename = file.filename || undefined,
            fileurl = file.fileurl || '',
            url = '/mod_page/content/index.html',
            encodedUrl = encodeURIComponent(url);
        return (filename === 'index.html' && (fileurl.indexOf(url) > 0 || fileurl.indexOf(encodedUrl) > 0 ));
    };
        self.isPluginEnabled = function(siteId) {
        siteId = siteId || $mmSite.getId();
        return $mmSitesManager.getSite(siteId).then(function(site) {
            return site.canDownloadFiles();
        });
    };
        self.logView = function(id) {
        if (id) {
            var params = {
                pageid: id
            };
            return $mmSite.write('mod_page_view_page', params);
        }
        return $q.reject();
    };
        self.prefetchContent = function(module) {
        var files = self.getDownloadableFiles(module),
            revision = $mmFilepool.getRevisionFromFileList(module.contents),
            timemod = $mmFilepool.getTimemodifiedFromFileList(module.contents);
        return $mmFilepool.prefetchPackage($mmSite.getId(), files, mmaModPageComponent, module.id, revision, timemod);
    };
    return self;
}]);

angular.module('mm.addons.mod_page')
.factory('$mmaModPagePrefetchHandler', ["$mmaModPage", "$mmSite", "mmaModPageComponent", function($mmaModPage, $mmSite, mmaModPageComponent) {
    var self = {};
    self.component = mmaModPageComponent;
        self.getDownloadSize = function(module) {
        var size = 0;
        angular.forEach(module.contents, function(content) {
            if ($mmaModPage.isFileDownloadable(content) && content.filesize) {
                size = size + content.filesize;
            }
        });
        return size;
    };
        self.isEnabled = function() {
        return $mmSite.canDownloadFiles();
    };
        self.prefetch = function(module) {
        return $mmaModPage.prefetchContent(module);
    };
    return self;
}]);

angular.module('mm.addons.mod_resource')
.controller('mmaModResourceIndexCtrl', ["$scope", "$stateParams", "$mmUtil", "$mmaModResource", "$log", "$mmApp", "$mmCourse", "$timeout", function($scope, $stateParams, $mmUtil, $mmaModResource, $log, $mmApp, $mmCourse, $timeout) {
    $log = $log.getInstance('mmaModResourceIndexCtrl');
    var module = $stateParams.module || {},
        courseid = $stateParams.courseid;
    $scope.title = module.name;
    $scope.description = module.description;
    $scope.externalUrl = module.url;
    $scope.mode = false;
    $scope.loaded = false;
    function fetchContent() {
        if (module.contents && module.contents.length) {
            if ($mmaModResource.isDisplayedInIframe(module)) {
                $scope.mode = 'iframe';
                var downloadFailed = false;
                return $mmaModResource.downloadAllContent(module).catch(function(err) {
                    downloadFailed = true;
                }).finally(function() {
                    $mmaModResource.getIframeSrc(module).then(function(src) {
                        if ($scope.src && src.toString() == $scope.src.toString()) {
                            $scope.src = '';
                            $timeout(function() {
                                $scope.src = src;
                            });
                        } else {
                            $scope.src = src;
                        }
                        $mmaModResource.logView(module.instance).then(function() {
                            $mmCourse.checkModuleCompletion(courseid, module.completionstatus);
                        });
                        if (downloadFailed && $mmApp.isOnline()) {
                            $mmUtil.showErrorModal('mm.core.errordownloadingsomefiles', true);
                        }
                    }).catch(function() {
                        $mmUtil.showErrorModal('mma.mod_resource.errorwhileloadingthecontent', true);
                    }).finally(function() {
                        $scope.loaded = true;
                    });
                });
            } else {
                $scope.loaded = true;
                $scope.mode = 'external';
                $scope.open = function() {
                    var modal = $mmUtil.showModalLoading();
                    $mmaModResource.openFile(module.contents, module.id).then(function() {
                        $mmaModResource.logView(module.instance).then(function() {
                            $mmCourse.checkModuleCompletion(courseid, module.completionstatus);
                        });
                    }).catch(function(error) {
                        if (error && typeof error == 'string') {
                            $mmUtil.showErrorModal(error);
                        } else {
                            $mmUtil.showErrorModal('mma.mod_resource.errorwhileloadingthecontent', true);
                        }
                    }).finally(function() {
                        modal.dismiss();
                    });
                };
            }
        } else {
            $mmUtil.showErrorModal('mma.mod_resource.errorwhileloadingthecontent', true);
        }
    }
    $scope.doRefresh = function() {
        $mmaModResource.invalidateContent(module.id).then(function() {
            return fetchContent();
        }).finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
    fetchContent();
}]);

angular.module('mm.addons.mod_resource')
.directive('mmaModResourceHtmlLink', function() {
    return {
        restrict: 'A',
        priority: 99,  
        link: function(scope, element, attrs) {
            element.on('click', function(event) {
                var href = element[0].getAttribute('data-href');
                if (!href) {
                    return;
                }
                event.stopImmediatePropagation();
                event.preventDefault();
                scope.$emit('mmaModResourceHtmlLinkClicked', href);
            });
        }
    };
});

angular.module('mm.addons.mod_resource')
.factory('$mmaModResourceHandlers', ["$mmCourse", "$mmaModResource", "$mmEvents", "$state", "$mmSite", "$mmCourseHelper", "$mmCoursePrefetchDelegate", "$mmFilepool", "$mmFS", "mmCoreDownloading", "mmCoreNotDownloaded", "mmCoreOutdated", "mmCoreEventPackageStatusChanged", "mmaModResourceComponent", "$q", "$mmContentLinksHelper", "$mmaModResourcePrefetchHandler", function($mmCourse, $mmaModResource, $mmEvents, $state, $mmSite, $mmCourseHelper,
            $mmCoursePrefetchDelegate, $mmFilepool, $mmFS, mmCoreDownloading, mmCoreNotDownloaded, mmCoreOutdated,
            mmCoreEventPackageStatusChanged, mmaModResourceComponent, $q, $mmContentLinksHelper, $mmaModResourcePrefetchHandler) {
    var self = {};
        self.courseContent = function() {
        var self = {};
                self.isEnabled = function() {
            return $mmaModResource.isPluginEnabled();
        };
                self.getController = function(module, courseid) {
            return function($scope) {
                var downloadBtn,
                    refreshBtn,
                    revision = $mmFilepool.getRevisionFromFileList(module.contents),
                    timemodified = $mmFilepool.getTimemodifiedFromFileList(module.contents);
                downloadBtn = {
                    hidden: true,
                    icon: 'ion-ios-cloud-download-outline',
                    label: 'mm.core.download',
                    action: function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        var size = $mmaModResourcePrefetchHandler.getDownloadSize(module);
                        $mmCourseHelper.prefetchModule($mmaModResource, module, size, false);
                    }
                };
                refreshBtn = {
                    icon: 'ion-android-refresh',
                    label: 'mm.core.refresh',
                    hidden: true,
                    action: function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        var size = $mmaModResourcePrefetchHandler.getDownloadSize(module);
                        $mmCourseHelper.prefetchModule($mmaModResource, module, size, true);
                    }
                };
                $scope.title = module.name;
                if (module.contents.length) {
                    var filename = module.contents[0].filename,
                        extension = $mmFS.getFileExtension(filename);
                    if (module.contents.length == 1 || (extension != "html" && extension != "htm")) {
                        $scope.icon = $mmFS.getFileIcon(filename);
                    } else {
                        $scope.icon = $mmCourse.getModuleIconSrc('resource');
                    }
                } else {
                    $scope.icon = $mmCourse.getModuleIconSrc('resource');
                }
                $scope.buttons = [downloadBtn, refreshBtn];
                $scope.spinner = true;
                $scope.action = function(e) {
                    if (e) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    $state.go('site.mod_resource', {module: module, courseid: courseid});
                };
                function showStatus(status) {
                    if (status) {
                        $scope.spinner = status === mmCoreDownloading;
                        downloadBtn.hidden = status !== mmCoreNotDownloaded;
                        refreshBtn.hidden = status !== mmCoreOutdated;
                    }
                }
                var statusObserver = $mmEvents.on(mmCoreEventPackageStatusChanged, function(data) {
                    if (data.siteid === $mmSite.getId() && data.componentId === module.id &&
                            data.component === mmaModResourceComponent) {
                        showStatus(data.status);
                    }
                });
                $mmCoursePrefetchDelegate.getModuleStatus(module, courseid, revision, timemodified).then(showStatus);
                $scope.$on('$destroy', function() {
                    statusObserver && statusObserver.off && statusObserver.off();
                });
            };
        };
        return self;
    };
        self.linksHandler = function() {
        var self = {};
                function isEnabled(siteId, courseId) {
            return $mmaModResource.isPluginEnabled(siteId).then(function(enabled) {
                if (!enabled) {
                    return false;
                }
                return courseId || $mmCourse.canGetModuleWithoutCourseId(siteId);
            });
        }
                self.getActions = function(siteIds, url, courseId) {
            if (typeof self.handles(url) != 'undefined') {
                return $mmContentLinksHelper.treatModuleIndexUrl(siteIds, url, isEnabled, courseId);
            }
            return $q.when([]);
        };
                self.handles = function(url) {
            var position = url.indexOf('/mod/resource/view.php');
            if (position > -1) {
                return url.substr(0, position);
            }
        };
        return self;
    };
    return self;
}]);

angular.module('mm.addons.mod_resource')
.factory('$mmaModResourcePrefetchHandler', ["$mmaModResource", "$mmSite", "mmaModResourceComponent", function($mmaModResource, $mmSite, mmaModResourceComponent) {
    var self = {};
    self.component = mmaModResourceComponent;
        self.getDownloadSize = function(module) {
        var size = 0;
        angular.forEach(module.contents, function(content) {
            if ($mmaModResource.isFileDownloadable(content) && content.filesize) {
                size = size + content.filesize;
            }
        });
        return size;
    };
        self.isEnabled = function() {
        return $mmSite.canDownloadFiles();
    };
        self.prefetch = function(module) {
        return $mmaModResource.prefetchContent(module);
    };
    return self;
}]);

angular.module('mm.addons.mod_resource')
.factory('$mmaModResource', ["$mmFilepool", "$mmSite", "$mmUtil", "$mmFS", "$http", "$log", "$q", "$sce", "$mmApp", "$mmSitesManager", "mmaModResourceComponent", function($mmFilepool, $mmSite, $mmUtil, $mmFS, $http, $log, $q, $sce, $mmApp, $mmSitesManager,
            mmaModResourceComponent) {
    $log = $log.getInstance('$mmaModResource');
    var self = {};
        self.downloadAllContent = function(module) {
        var files = self.getDownloadableFiles(module),
            siteid = $mmSite.getId(),
            promise,
            revision = $mmFilepool.getRevisionFromFileList(module.contents),
            timemod = $mmFilepool.getTimemodifiedFromFileList(module.contents);
        if (self.isDisplayedInIframe(module)) {
            promise = $mmFilepool.getPackageDirPathByUrl(siteid, module.url);
        } else {
            promise = $q.when();
        }
        return promise.then(function(dirPath) {
            return $mmFilepool.downloadPackage(siteid, files, mmaModResourceComponent, module.id, revision, timemod, dirPath);
        });
    };
        self.getDownloadableFiles = function(module) {
        var files = [];
        angular.forEach(module.contents, function(content) {
            if (self.isFileDownloadable(content)) {
                files.push(content);
            }
        });
        return files;
    };
        self.getDownloadingFilesEventNames = function(module) {
        var promises = [],
            eventNames = [],
            siteid = $mmSite.getId();
        angular.forEach(module.contents, function(content) {
            var url = content.fileurl;
            if (!self.isFileDownloadable(content)) {
                return;
            }
            promises.push($mmFilepool.isFileDownloadingByUrl(siteid, url).then(function() {
                return $mmFilepool.getFileEventNameByUrl(siteid, url).then(function(eventName) {
                    eventNames.push(eventName);
                });
            }, function() {
            }));
        });
        return $q.all(promises).then(function() {
            return eventNames;
        });
    };
        self.getFileEventNames = function(module) {
        var promises = [];
        angular.forEach(module.contents, function(content) {
            var url = content.fileurl;
            if (!self.isFileDownloadable(content)) {
                return;
            }
            promises.push($mmFilepool.getFileEventNameByUrl($mmSite.getId(), url));
        });
        return $q.all(promises).then(function(eventNames) {
            return eventNames;
        });
    };
        self.getIframeSrc = function(module) {
        if (!module.contents.length) {
            return $q.reject();
        }
        var mainFile = module.contents[0],
            mainFilePath = mainFile.filename;
        if (mainFile.filepath !== '/') {
            mainFilePath = mainFile.filepath.substr(1) + mainFilePath;
        }
        return $mmFilepool.getPackageDirUrlByUrl($mmSite.getId(), module.url).then(function(dirPath) {
            return $sce.trustAsResourceUrl($mmFS.concatenatePaths(dirPath, mainFilePath));
        }, function() {
            if ($mmApp.isOnline() && mainFile.fileurl) {
                return $sce.trustAsResourceUrl($mmSite.fixPluginfileURL(mainFile.fileurl));
            }
            return $q.reject();
        });
    };
        self.getResourceHtml = function(contents, moduleId, target) {
        var indexUrl,
            paths = {},
            promise;
        angular.forEach(contents, function(content, index) {
            var url = content.fileurl,
                fullpath = content.filename;
            if (content.filepath !== '/') {
                fullpath = content.filepath.substr(1) + fullpath;
            }
            if (typeof target !== 'undefined' && target == fullpath) {
                indexUrl = url;
            } else if (typeof target === 'undefined' && index === 0) {
                indexUrl = url;
            } else {
                paths[fullpath] = url;
            }
        });
        promise = (function() {
            if (!indexUrl) {
                $log.debug('Could not locate the index page');
                return $q.reject();
            }
            if ($mmFS.isAvailable()) {
                return $mmFilepool.downloadUrl($mmSite.getId(), indexUrl, false, mmaModResourceComponent, moduleId);
            } else {
                return $q.when($mmSite.fixPluginfileURL(indexUrl));
            }
        })();
        return promise.then(function(url) {
            return $http.get(url).then(function(response) {
                if (typeof response.data !== 'string') {
                    return $q.reject();
                } else {
                    return $mmUtil.restoreSourcesInHtml(response.data, paths, function(anchor, href) {
                        var ext = $mmFS.getFileExtension(href);
                        if (ext == 'html' || ext == 'html') {
                            anchor.setAttribute('mma-mod-resource-html-link', 1);
                            anchor.setAttribute('data-href', href);
                        }
                    });
                }
            });
        });
    };
        self.invalidateContent = function(moduleId) {
        return $mmFilepool.invalidateFilesByComponent($mmSite.getId(), mmaModResourceComponent, moduleId);
    };
        self.isDisplayedInIframe = function(module) {
        if (!module.contents.length) {
            return false;
        }
        var ext = $mmFS.getFileExtension(module.contents[0].filename);
        return (ext === 'htm' || ext === 'html') && $mmFS.isAvailable();
    };
        self.isDisplayedInline = function(module) {
        return self.isDisplayedInIframe(module);
    };
        self.isFileDownloadable = function(file) {
        return file.type === 'file';
    };
        self.isPluginEnabled = function(siteId) {
        siteId = siteId || $mmSite.getId();
        return $mmSitesManager.getSite(siteId).then(function(site) {
            return site.canDownloadFiles();
        });
    };
        self.logView = function(id) {
        if (id) {
            var params = {
                resourceid: id
            };
            return $mmSite.write('mod_resource_view_resource', params);
        }
        return $q.reject();
    };
        self.openFile = function(contents, moduleId) {
        if (!contents || !contents.length) {
            return $q.reject();
        }
        var files = [contents[0]],
            siteId = $mmSite.getId(),
            revision = $mmFilepool.getRevisionFromFileList(files),
            timeMod = $mmFilepool.getTimemodifiedFromFileList(files),
            promise;
        if ($mmFS.isAvailable()) {
            promise = $mmFilepool.downloadPackage(siteId, files, mmaModResourceComponent, moduleId, revision, timeMod).then(function() {
                return $mmFilepool.getUrlByUrl(siteId, contents[0].fileurl, mmaModResourceComponent, moduleId, timeMod);
            });
        } else {
            promise = $q.when($mmSite.fixPluginfileURL(url));
        }
        return promise.then(function(localUrl) {
            return $mmUtil.openFile(localUrl);
        });
    };
        self.prefetchContent = function(module) {
        var files = self.getDownloadableFiles(module),
            siteid = $mmSite.getId(),
            promise,
            revision = $mmFilepool.getRevisionFromFileList(module.contents),
            timemod = $mmFilepool.getTimemodifiedFromFileList(module.contents);
        if (self.isDisplayedInIframe(module)) {
            promise = $mmFilepool.getPackageDirPathByUrl(siteid, module.url);
        } else {
            promise = $q.when();
        }
        return promise.then(function(dirPath) {
            return $mmFilepool.prefetchPackage(siteid, files, mmaModResourceComponent, module.id, revision, timemod, dirPath);
        });
    };
    return self;
}]);

angular.module('mm.addons.mod_scorm')
.controller('mmaModScormIndexCtrl', ["$scope", "$stateParams", "$mmaModScorm", "$mmUtil", "$q", "$mmCourse", "$ionicScrollDelegate", "$mmCoursePrefetchDelegate", "$mmaModScormHelper", "$mmEvents", "$mmSite", "$state", "mmCoreOutdated", "mmCoreNotDownloaded", "mmCoreDownloading", "mmaModScormComponent", "mmCoreEventPackageStatusChanged", "$ionicHistory", "mmaModScormEventAutomSynced", "$mmaModScormSync", "$timeout", function($scope, $stateParams, $mmaModScorm, $mmUtil, $q, $mmCourse, $ionicScrollDelegate,
            $mmCoursePrefetchDelegate, $mmaModScormHelper, $mmEvents, $mmSite, $state, mmCoreOutdated, mmCoreNotDownloaded,
            mmCoreDownloading, mmaModScormComponent, mmCoreEventPackageStatusChanged, $ionicHistory, mmaModScormEventAutomSynced,
            $mmaModScormSync, $timeout) {
    var module = $stateParams.module || {},
        courseid = $stateParams.courseid,
        scorm,
        statusObserver,
        currentStatus,
        lastAttempt,
        lastOffline = false,
        attempts,
        scrollView = $ionicScrollDelegate.$getByHandle('mmaModScormIndexScroll');
    $scope.title = module.name;
    $scope.description = module.description;
    $scope.moduleUrl = module.url;
    $scope.currentOrganization = {};
    $scope.scormOptions = {
        mode: $mmaModScorm.MODENORMAL
    };
    $scope.modenormal = $mmaModScorm.MODENORMAL;
    $scope.modebrowse = $mmaModScorm.MODEBROWSE;
    function fetchScormData(refresh) {
        return $mmaModScorm.getScorm(courseid, module.id, module.url).then(function(scormData) {
            scorm = scormData;
            $scope.title = scorm.name || $scope.title;
            $scope.description = scorm.intro || $scope.description;
            $scope.scorm = scorm;
            var result = $mmaModScorm.isScormSupported(scorm);
            if (result === true) {
                $scope.errorMessage = '';
            } else {
                $scope.errorMessage = result;
            }
            if (scorm.warningmessage) {
                return;
            }
            return syncScorm(!refresh, false).catch(function() {
            }).then(function() {
                $mmaModScormHelper.getScormReadableSyncTime(scorm.id).then(function(syncTime) {
                    $scope.syncTime = syncTime;
                });
                return $mmaModScorm.getAttemptCount(scorm.id).then(function(attemptsData) {
                    attempts = attemptsData;
                    $scope.showSyncButton = attempts.offline.length;
                    return $mmaModScormHelper.determineAttemptToContinue(scorm, attempts).then(function(attempt) {
                        lastAttempt = attempt.number;
                        lastOffline = attempt.offline;
                        if (lastAttempt != attempts.lastAttempt.number) {
                            $scope.attemptToContinue = lastAttempt;
                        } else {
                            delete $scope.attemptToContinue;
                        }
                        return $mmaModScorm.isAttemptIncomplete(scorm.id, lastAttempt, lastOffline).then(function(incomplete) {
                            var promises = [];
                            scorm.incomplete = incomplete;
                            scorm.numAttempts = attempts.total;
                            scorm.grademethodReadable = $mmaModScorm.getScormGradeMethod(scorm);
                            scorm.attemptsLeft = $mmaModScorm.countAttemptsLeft(scorm, attempts.lastAttempt.number);
                            if (scorm.forceattempt && scorm.incomplete) {
                                $scope.scormOptions.newAttempt = true;
                            }
                            promises.push(getReportedGrades());
                            promises.push(fetchStructure());
                            if (!scorm.packagesize && $scope.errorMessage === '') {
                                promises.push($mmaModScorm.calculateScormSize(scorm).then(function(size) {
                                    scorm.packagesize = size;
                                }));
                            }
                            setStatusListener();
                            getStatus().then(showStatus);
                            return $q.all(promises);
                        });
                    });
                }).catch(function(message) {
                    return showError(message);
                });
            });
        }, function(message) {
            if (!refresh) {
                return refreshData();
            }
            return showError(message);
        });
    }
    function showError(message, defaultMessage) {
        defaultMessage = defaultMessage || 'mma.mod_scorm.errorgetscorm';
        if (message) {
            $mmUtil.showErrorModal(message);
        } else {
            $mmUtil.showErrorModal(defaultMessage, true);
        }
        return $q.reject();
    }
    function getReportedGrades() {
        var promises = [];
        scorm.onlineAttempts = {};
        scorm.offlineAttempts = {};
        attempts.online.forEach(function(attempt) {
            if (attempts.offline.indexOf(attempt) == -1) {
                promises.push(getAttemptGrade(scorm, attempt));
            }
        });
        attempts.offline.forEach(function(attempt) {
            promises.push(getAttemptGrade(scorm, attempt, true));
        });
        return $q.all(promises).then(function() {
            scorm.grade = $mmaModScorm.calculateScormGrade(scorm, scorm.onlineAttempts);
            angular.forEach(scorm.onlineAttempts, function(attempt) {
                attempt.grade = $mmaModScorm.formatGrade(scorm, attempt.grade);
            });
            angular.forEach(scorm.offlineAttempts, function(attempt) {
                attempt.grade = $mmaModScorm.formatGrade(scorm, attempt.grade);
            });
            scorm.grade = $mmaModScorm.formatGrade(scorm, scorm.grade);
        });
    }
    function getAttemptGrade(scorm, attempt, offline) {
        return $mmaModScorm.getAttemptGrade(scorm, attempt, offline).then(function(grade) {
            var entry = {
                number: attempt,
                grade: grade
            };
            if (offline) {
                scorm.offlineAttempts[attempt] = entry;
            } else {
                scorm.onlineAttempts[attempt] = entry;
            }
        });
    }
    function fetchStructure() {
        return $mmaModScorm.getOrganizations(scorm.id).then(function(organizations) {
            $scope.organizations = organizations;
            if (!$scope.currentOrganization.identifier) {
                if (organizations.length) {
                    $scope.currentOrganization.identifier = organizations[0].identifier;
                } else {
                    $scope.currentOrganization.identifier = '';
                }
            }
            return loadOrganizationToc($scope.currentOrganization.identifier);
        });
    }
    function loadOrganizationToc(organizationId) {
        if (!scorm.displaycoursestructure) {
            return $q.when();
        }
        $scope.loadingToc = true;
        return $mmaModScorm.getOrganizationToc(scorm.id, organizationId, lastAttempt, lastOffline).then(function(toc) {
            $scope.toc = $mmaModScorm.formatTocToArray(toc);
            angular.forEach($scope.toc, function(sco) {
                sco.image = $mmaModScorm.getScoStatusIcon(sco, scorm.incomplete);
            });
            angular.forEach($scope.organizations, function(org) {
                if (org.identifier == organizationId) {
                    $scope.currentOrganization.title = org.title;
                }
            });
            $ionicScrollDelegate.resize();
        }).finally(function() {
            $scope.loadingToc = false;
        });
    }
    function getStatus() {
        return $mmCoursePrefetchDelegate.getModuleStatus(module, courseid, scorm.sha1hash, 0);
    }
    function setStatusListener() {
        if (typeof statusObserver !== 'undefined') {
            return;
        }
        statusObserver = $mmEvents.on(mmCoreEventPackageStatusChanged, function(data) {
            if (data.siteid === $mmSite.getId() && data.componentId === scorm.coursemodule &&
                    data.component === mmaModScormComponent) {
                showStatus(data.status);
            }
        });
    }
    function showStatus(status) {
        currentStatus = status;
        if (status == mmCoreOutdated) {
            $scope.statusMessage = 'mma.mod_scorm.scormstatusoutdated';
        } else if (status == mmCoreNotDownloaded) {
            $scope.statusMessage = 'mma.mod_scorm.scormstatusnotdownloaded';
        } else if (status == mmCoreDownloading) {
            if (!$scope.downloading) {
                downloadScormPackage(true);
            }
        } else {
            $scope.statusMessage = '';
        }
    }
    function refreshData(dontForceSync) {
        var promises = [];
        promises.push($mmaModScorm.invalidateScormData(courseid));
        if (scorm) {
            promises.push($mmaModScorm.invalidateAllScormData(scorm.id));
        }
        return $q.all(promises).finally(function() {
            return fetchScormData(!dontForceSync);
        });
    }
    function downloadScormPackage() {
        $scope.downloading = true;
        return $mmaModScorm.download(scorm).then(undefined, undefined, function(progress) {
            if (!progress) {
                return;
            }
            if (progress.packageDownload) {
                if (scorm.packagesize) {
                    $scope.percentage = (parseFloat(progress.loaded / scorm.packagesize) * 100).toFixed(1);
                }
            } else if (progress.message) {
                $scope.progressMessage = progress.message;
            } else if (progress.loaded && progress.total) {
                $scope.percentage = (parseFloat(progress.loaded / progress.total) * 100).toFixed(1);
            } else {
                $scope.percentage = undefined;
            }
        }).finally(function() {
            $scope.progressMessage = undefined;
            $scope.percentage = undefined;
            $scope.downloading = false;
        });
    }
    function openScorm(scoId) {
        $state.go('site.mod_scorm-player', {
            scorm: scorm,
            mode: $scope.scormOptions.mode,
            newAttempt: !!$scope.scormOptions.newAttempt,
            organizationId: $scope.currentOrganization.identifier,
            scoId: scoId
        });
    }
    function syncScorm(checkTime, showErrors) {
        var promise = checkTime ? $mmaModScormSync.syncScormIfNeeded(scorm) : $mmaModScormSync.syncScorm(scorm);
        return promise.then(function(warnings) {
            var message = $mmaModScormHelper.buildWarningsMessage(warnings);
            if (message) {
                $mmUtil.showErrorModal(message);
            }
        }).catch(function(err) {
            if (showErrors) {
                return showError(err, 'mma.mod_scorm.errorsyncscorm');
            }
            return $q.reject();
        });
    }
    fetchScormData().then(function() {
        $mmaModScorm.logView(scorm.id).then(function() {
            $mmCourse.checkModuleCompletion(courseid, module.completionstatus);
        });
    }).finally(function() {
        $scope.scormLoaded = true;
    });
    $scope.loadOrg = function() {
        loadOrganizationToc($scope.currentOrganization.identifier).catch(function(message) {
            return showError(message);
        });
    };
    $scope.refreshScorm = function() {
        refreshData().finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
    $scope.open = function(e, scoId) {
        e.preventDefault();
        e.stopPropagation();
        if ($scope.downloading) {
            return;
        }
        if (currentStatus == mmCoreOutdated || currentStatus == mmCoreNotDownloaded) {
            $mmaModScormHelper.confirmDownload(scorm).then(function() {
                var promise = currentStatus == mmCoreOutdated ? $mmaModScorm.invalidateContent(scorm.coursemodule) : $q.when();
                promise.finally(function() {
                    downloadScormPackage().then(function() {
                        if (!$scope.$$destroyed) {
                            openScorm(scoId);
                        }
                    }).catch(function() {
                        if (!$scope.$$destroyed) {
                            $mmaModScormHelper.showDownloadError(scorm);
                        }
                    });
                });
            });
        } else {
            openScorm(scoId);
        }
    };
    $scope.sync = function() {
        var modal = $mmUtil.showModalLoading('mm.settings.synchronizing', true);
        syncScorm(false, true).then(function() {
            $scope.scormLoaded = false;
            scrollView.scrollTop();
            refreshData(true).finally(function() {
                $scope.scormLoaded = true;
            });
        }).finally(function() {
            modal.dismiss();
        });
    };
    var skip = true;
    $scope.$on('$ionicView.enter', function() {
        if (skip) {
            skip = false;
            return;
        }
        $scope.scormOptions.newAttempt = false;
        var forwardView = $ionicHistory.forwardView();
        if (forwardView && forwardView.stateName === 'site.mod_scorm-player') {
            $scope.scormLoaded = false;
            scrollView.scrollTop();
            $timeout(function() {
                refreshData().finally(function() {
                    $scope.scormLoaded = true;
                });
            }, 500);
        }
    });
    var syncObserver = $mmEvents.on(mmaModScormEventAutomSynced, function(data) {
        if (data && data.siteid == $mmSite.getId() && data.scormid == scorm.id) {
            $scope.scormLoaded = false;
            scrollView.scrollTop();
            fetchScormData().finally(function() {
                $scope.scormLoaded = true;
            });
        }
    });
    $scope.$on('$destroy', function() {
        statusObserver && statusObserver.off && statusObserver.off();
        syncObserver && syncObserver.off && syncObserver.off();
    });
}]);

angular.module('mm.addons.mod_scorm')
.controller('mmaModScormPlayerCtrl', ["$scope", "$stateParams", "$mmaModScorm", "$mmUtil", "$ionicPopover", "$mmaModScormHelper", "$mmEvents", "$timeout", "$q", "mmaModScormEventUpdateToc", "mmaModScormEventLaunchNextSco", "mmaModScormEventLaunchPrevSco", "$mmaModScormDataModel12", "mmaModScormEventGoOffline", "$mmaModScormSync", function($scope, $stateParams, $mmaModScorm, $mmUtil, $ionicPopover, $mmaModScormHelper,
            $mmEvents, $timeout, $q, mmaModScormEventUpdateToc, mmaModScormEventLaunchNextSco, mmaModScormEventLaunchPrevSco,
            $mmaModScormDataModel12, mmaModScormEventGoOffline, $mmaModScormSync) {
    var scorm = $stateParams.scorm || {},
        mode = $stateParams.mode || $mmaModScorm.MODENORMAL,
        newAttempt = $stateParams.newAttempt,
        organizationId = $stateParams.organizationId,
        currentSco,
        attempt,
        userData,
        apiInitialized = false,
        offline = false;
    $scope.title = scorm.name;
    $scope.scorm = scorm;
    $scope.loadingToc = true;
    if (scorm.popup) {
        if (scorm.width <= 100) {
            scorm.width = scorm.width + '%';
        }
        if (scorm.height <= 100) {
            scorm.height = scorm.height + '%';
        }
    }
    function fetchData() {
        return $mmaModScormSync.waitForSync(scorm.id).then(function() {
            return $mmaModScorm.getAttemptCount(scorm.id).then(function(attemptsData) {
                return determineAttemptAndMode(attemptsData).then(function() {
                    var promises = [];
                    promises.push(fetchToc());
                    promises.push($mmaModScorm.getScormUserData(scorm.id, attempt, offline).then(function(data) {
                        userData = data;
                    }));
                    return $q.all(promises);
                });
            }).catch(showError);
        });
    }
    function determineAttemptAndMode(attemptsData) {
        return $mmaModScormHelper.determineAttemptToContinue(scorm, attemptsData).then(function(data) {
            attempt = data.number;
            offline = data.offline;
            if (attempt != attemptsData.lastAttempt.number) {
                $scope.attemptToContinue = attempt;
            }
            var promise;
            if (attempt > 0) {
                promise = $mmaModScorm.isAttemptIncomplete(scorm.id, attempt, offline);
            } else {
                promise = $q.when(false);
            }
            return promise.then(function(incomplete) {
                var result = $mmaModScorm.determineAttemptAndMode(scorm, mode, attempt, newAttempt, incomplete);
                if (result.attempt > attempt) {
                    if (offline) {
                        promise = $mmaModScormHelper.createOfflineAttempt(scorm, result.attempt, attemptsData.online.length);
                    } else {
                        promise = $mmaModScorm.getScormUserData(scorm.id, result.attempt, false, undefined, undefined, true)
                                    .catch(function() {
                            offline = true;
                            return $mmaModScormHelper.createOfflineAttempt(scorm, result.attempt, attemptsData.online.length);
                        });
                    }
                } else {
                    promise = $q.when();
                }
                return promise.then(function() {
                    mode = result.mode;
                    newAttempt = result.newAttempt;
                    attempt = result.attempt;
                    $scope.isBrowse = mode === $mmaModScorm.MODEBROWSE;
                    $scope.isReview = mode === $mmaModScorm.MODEREVIEW;
                });
            });
        });
    }
    function showError(message) {
        if (message) {
            $mmUtil.showErrorModal(message);
        } else {
            $mmUtil.showErrorModal('mma.mod_scorm.errorgetscorm', true);
        }
        return $q.reject();
    }
    function fetchToc() {
        $scope.loadingToc = true;
        return $mmaModScorm.isAttemptIncomplete(scorm.id, attempt, offline).then(function(incomplete) {
            scorm.incomplete = incomplete;
            return $mmaModScorm.getOrganizationToc(scorm.id, organizationId, attempt, offline).then(function(toc) {
                $scope.toc = $mmaModScorm.formatTocToArray(toc);
                angular.forEach($scope.toc, function(sco) {
                    sco.image = $mmaModScorm.getScoStatusIcon(sco, scorm.incomplete);
                });
                if ($stateParams.scoId > 0) {
                    currentSco = $mmaModScormHelper.getScoFromToc($scope.toc, $stateParams.scoId);
                }
                if (!currentSco) {
                    return $mmaModScormHelper.getFirstSco(scorm.id, $scope.toc, organizationId, attempt, offline)
                            .then(function(sco) {
                        if (sco) {
                            currentSco = sco;
                        } else {
                            $scope.errorMessage = 'mma.mod_scorm.errornovalidsco';
                        }
                    });
                }
            });
        }).finally(function() {
            $scope.loadingToc = false;
        });
    }
    function calculateNextAndPreviousSco(scoId) {
        $scope.previousSco = $mmaModScormHelper.getPreviousScoFromToc($scope.toc, scoId);
        $scope.nextSco = $mmaModScormHelper.getNextScoFromToc($scope.toc, scoId);
    }
    function loadSco(sco) {
        if (!apiInitialized) {
            $mmaModScormDataModel12.initAPI(scorm, sco.id, attempt, userData, mode, offline);
            apiInitialized = true;
        } else {
            $mmaModScormDataModel12.loadSco(sco.id);
        }
        currentSco = sco;
        $scope.title = sco.title || scorm.name;
        calculateNextAndPreviousSco(sco.id);
        $mmaModScorm.getScoSrc(scorm, sco).then(function(src) {
            if ($scope.src && src.toString() == $scope.src.toString()) {
                $scope.src = '';
                $timeout(function() {
                    $scope.src = src;
                });
            } else {
                $scope.src = src;
            }
        });
        if (sco.scormtype == 'asset') {
            var tracks = [{
                element: 'cmi.core.lesson_status',
                value: 'completed'
            }];
            $mmaModScorm.saveTracks(sco.id, attempt, tracks, offline, scorm).catch(function() {
                if (!offline) {
                    return $mmaModScorm.getScormUserData(scorm.id, attempt, offline).then(function(data) {
                        if (!data[sco.id] || data[sco.id].userdata['cmi.core.lesson_status'] != 'completed') {
                            return $mmaModScormHelper.convertAttemptToOffline(scorm, attempt).then(function() {
                                offline = true;
                                $mmaModScormDataModel12.setOffline(true);
                                return $mmaModScorm.saveTracks(sco.id, attempt, tracks, offline, scorm);
                            }).catch(showError);
                        }
                    });
                }
            }).then(function() {
                refreshToc();
            });
        }
        $mmaModScorm.logLaunchSco(scorm.id, sco.id);
    }
    function refreshToc() {
        $mmaModScorm.invalidateAllScormData(scorm.id).finally(function() {
            fetchToc().catch(showError);
        });
    }
    function setStartTime(scoId) {
        var tracks = [{
            element: 'x.start.time',
            value: $mmUtil.timestamp()
        }];
        return $mmaModScorm.saveTracks(scoId, attempt, tracks, offline, scorm).then(function() {
            if (!offline) {
                $mmaModScorm.getAttemptCount(scorm.id, undefined, undefined, false, true);
            }
        });
    }
    $scope.showToc = $mmaModScorm.displayTocInPlayer(scorm);
    if ($scope.showToc) {
        $ionicPopover.fromTemplateUrl('addons/mod_scorm/templates/toc.html', {
            scope: $scope,
        }).then(function(popover) {
            $scope.popover = popover;
        });
    }
    fetchData().then(function() {
        if (currentSco) {
            var promise = newAttempt ? setStartTime(currentSco.id) : $q.when();
            return promise.catch(showError).finally(function() {
                loadSco(currentSco);
            });
        }
    }).finally(function() {
        $scope.loaded = true;
    });
    $scope.loadSco = function(sco) {
        if (!sco.prereq || !sco.isvisible || !sco.launch) {
            return;
        }
        $scope.popover.hide();
        loadSco(sco);
    };
    var tocObserver = $mmEvents.on(mmaModScormEventUpdateToc, function(data) {
        if (data.scormid === scorm.id) {
            if (offline) {
                $timeout(refreshToc, 100);
            } else {
                refreshToc();
            }
        }
    });
    var launchNextObserver = $mmEvents.on(mmaModScormEventLaunchNextSco, function(data) {
        if (data.scormid === scorm.id && $scope.nextSco) {
            loadSco($scope.nextSco);
        }
    });
    var launchPrevObserver = $mmEvents.on(mmaModScormEventLaunchPrevSco, function(data) {
        if (data.scormid === scorm.id && $scope.previousSco) {
            loadSco($scope.previousSco);
        }
    });
    var goOfflineObserver = $mmEvents.on(mmaModScormEventGoOffline, function(data) {
        if (data.scormid === scorm.id && !offline) {
            offline = true;
            $timeout(function() {
                $mmaModScormHelper.convertAttemptToOffline(scorm, attempt).catch(showError).finally(function() {
                    refreshToc();
                });
            }, 200);
        }
    });
    $scope.$on('$ionicView.beforeLeave', function() {
        $scope.src = '';
    });
    $scope.$on('$destroy', function() {
        tocObserver && tocObserver.off && tocObserver.off();
        launchNextObserver && launchNextObserver.off && launchNextObserver.off();
        launchPrevObserver && launchPrevObserver.off && launchPrevObserver.off();
        goOfflineObserver && goOfflineObserver.off && goOfflineObserver.off();
    });
}]);

angular.module('mm.addons.mod_scorm')
.factory('$mmaModScormDataModel12', ["$mmaModScorm", "$mmEvents", "$window", "mmaModScormEventLaunchNextSco", "mmaModScormEventLaunchPrevSco", "mmaModScormEventUpdateToc", "mmaModScormEventGoOffline", function($mmaModScorm, $mmEvents, $window, mmaModScormEventLaunchNextSco,
            mmaModScormEventLaunchPrevSco, mmaModScormEventUpdateToc, mmaModScormEventGoOffline) {
    var self = {};
        function SCORMAPI(scorm, scoId, attempt, userData, mode, offline) {
        var currentUserData = {},
            self = this;
        self.scoId = scoId;
        self.offline = offline;
        function triggerEvent(name) {
            $mmEvents.trigger(name, {
                scormid: scorm.id,
                scoid: self.scoId,
                attempt: attempt
            });
        }
        var CMIString256 = '^[\\u0000-\\uFFFF]{0,255}$';
        var CMIString4096 = '^[\\u0000-\\uFFFF]{0,4096}$';
        var CMITime = '^([0-2]{1}[0-9]{1}):([0-5]{1}[0-9]{1}):([0-5]{1}[0-9]{1})(\.[0-9]{1,2})?$';
        var CMITimespan = '^([0-9]{2,4}):([0-9]{2}):([0-9]{2})(\.[0-9]{1,2})?$';
        var CMIInteger = '^\\d+$';
        var CMISInteger = '^-?([0-9]+)$';
        var CMIDecimal = '^-?([0-9]{0,3})(\.[0-9]*)?$';
        var CMIIdentifier = '^[\\u0021-\\u007E]{0,255}$';
        var CMIFeedback = CMIString256;
        var CMIIndex = '[._](\\d+).';
        var CMIStatus = '^passed$|^completed$|^failed$|^incomplete$|^browsed$';
        var CMIStatus2 = '^passed$|^completed$|^failed$|^incomplete$|^browsed$|^not attempted$';
        var CMIExit = '^time-out$|^suspend$|^logout$|^$';
        var CMIType = '^true-false$|^choice$|^fill-in$|^matching$|^performance$|^sequencing$|^likert$|^numeric$';
        var CMIResult = '^correct$|^wrong$|^unanticipated$|^neutral$|^([0-9]{0,3})?(\.[0-9]*)?$';
        var NAVEvent = '^previous$|^continue$';
        var cmi_children = 'core,suspend_data,launch_data,comments,objectives,student_data,student_preference,interactions';
        var core_children = 'student_id,student_name,lesson_location,credit,lesson_status,entry,score,total_time,lesson_mode,exit,session_time';
        var score_children = 'raw,min,max';
        var comments_children = 'content,location,time';
        var objectives_children = 'id,score,status';
        var correct_responses_children = 'pattern';
        var student_data_children = 'mastery_score,max_time_allowed,time_limit_action';
        var student_preference_children = 'audio,language,speed,text';
        var interactions_children = 'id,objectives,time,type,correct_responses,weighting,student_response,result,latency';
        var score_range = '0#100';
        var audio_range = '-1#100';
        var speed_range = '-100#100';
        var weighting_range = '-100#100';
        var text_range = '-1#1';
        var def = {};
        var defExtra = {};
        angular.forEach(userData, function(sco) {
            def[sco.scoid] = sco.defaultdata;
            defExtra[sco.scoid] = sco.userdata;
        });
        var datamodel = {};
        for (var scoid in def) {
            datamodel[scoid] = {
                'cmi._children':{'defaultvalue':cmi_children, 'mod':'r', 'writeerror':'402'},
                'cmi._version':{'defaultvalue':'3.4', 'mod':'r', 'writeerror':'402'},
                'cmi.core._children':{'defaultvalue':core_children, 'mod':'r', 'writeerror':'402'},
                'cmi.core.student_id':{'defaultvalue':def[scoid]['cmi.core.student_id'], 'mod':'r', 'writeerror':'403'},
                'cmi.core.student_name':{'defaultvalue':def[scoid]['cmi.core.student_name'], 'mod':'r', 'writeerror':'403'},
                'cmi.core.lesson_location':{'defaultvalue':def[scoid]['cmi.core.lesson_location'], 'format':CMIString256, 'mod':'rw', 'writeerror':'405'},
                'cmi.core.credit':{'defaultvalue':def[scoid]['cmi.core.credit'], 'mod':'r', 'writeerror':'403'},
                'cmi.core.lesson_status':{'defaultvalue':def[scoid]['cmi.core.lesson_status'], 'format':CMIStatus, 'mod':'rw', 'writeerror':'405'},
                'cmi.core.entry':{'defaultvalue':def[scoid]['cmi.core.entry'], 'mod':'r', 'writeerror':'403'},
                'cmi.core.score._children':{'defaultvalue':score_children, 'mod':'r', 'writeerror':'402'},
                'cmi.core.score.raw':{'defaultvalue':def[scoid]['cmi.core.score.raw'], 'format':CMIDecimal, 'range':score_range, 'mod':'rw', 'writeerror':'405'},
                'cmi.core.score.max':{'defaultvalue':def[scoid]['cmi.core.score.max'], 'format':CMIDecimal, 'range':score_range, 'mod':'rw', 'writeerror':'405'},
                'cmi.core.score.min':{'defaultvalue':def[scoid]['cmi.core.score.min'], 'format':CMIDecimal, 'range':score_range, 'mod':'rw', 'writeerror':'405'},
                'cmi.core.total_time':{'defaultvalue':def[scoid]['cmi.core.total_time'], 'mod':'r', 'writeerror':'403'},
                'cmi.core.lesson_mode':{'defaultvalue':def[scoid]['cmi.core.lesson_mode'], 'mod':'r', 'writeerror':'403'},
                'cmi.core.exit':{'defaultvalue':def[scoid]['cmi.core.exit'], 'format':CMIExit, 'mod':'w', 'readerror':'404', 'writeerror':'405'},
                'cmi.core.session_time':{'format':CMITimespan, 'mod':'w', 'defaultvalue':'00:00:00', 'readerror':'404', 'writeerror':'405'},
                'cmi.suspend_data':{'defaultvalue':def[scoid]['cmi.suspend_data'], 'format':CMIString4096, 'mod':'rw', 'writeerror':'405'},
                'cmi.launch_data':{'defaultvalue':def[scoid]['cmi.launch_data'], 'mod':'r', 'writeerror':'403'},
                'cmi.comments':{'defaultvalue':def[scoid]['cmi.comments'], 'format':CMIString4096, 'mod':'rw', 'writeerror':'405'},
                'cmi.evaluation.comments._count':{'defaultvalue':'0', 'mod':'r', 'writeerror':'402'},
                'cmi.evaluation.comments._children':{'defaultvalue':comments_children, 'mod':'r', 'writeerror':'402'},
                'cmi.evaluation.comments.n.content':{'defaultvalue':'', 'pattern':CMIIndex, 'format':CMIString256, 'mod':'rw', 'writeerror':'405'},
                'cmi.evaluation.comments.n.location':{'defaultvalue':'', 'pattern':CMIIndex, 'format':CMIString256, 'mod':'rw', 'writeerror':'405'},
                'cmi.evaluation.comments.n.time':{'defaultvalue':'', 'pattern':CMIIndex, 'format':CMITime, 'mod':'rw', 'writeerror':'405'},
                'cmi.comments_from_lms':{'mod':'r', 'writeerror':'403'},
                'cmi.objectives._children':{'defaultvalue':objectives_children, 'mod':'r', 'writeerror':'402'},
                'cmi.objectives._count':{'mod':'r', 'defaultvalue':'0', 'writeerror':'402'},
                'cmi.objectives.n.id':{'pattern':CMIIndex, 'format':CMIIdentifier, 'mod':'rw', 'writeerror':'405'},
                'cmi.objectives.n.score._children':{'pattern':CMIIndex, 'mod':'r', 'writeerror':'402'},
                'cmi.objectives.n.score.raw':{'defaultvalue':'', 'pattern':CMIIndex, 'format':CMIDecimal, 'range':score_range, 'mod':'rw', 'writeerror':'405'},
                'cmi.objectives.n.score.min':{'defaultvalue':'', 'pattern':CMIIndex, 'format':CMIDecimal, 'range':score_range, 'mod':'rw', 'writeerror':'405'},
                'cmi.objectives.n.score.max':{'defaultvalue':'', 'pattern':CMIIndex, 'format':CMIDecimal, 'range':score_range, 'mod':'rw', 'writeerror':'405'},
                'cmi.objectives.n.status':{'pattern':CMIIndex, 'format':CMIStatus2, 'mod':'rw', 'writeerror':'405'},
                'cmi.student_data._children':{'defaultvalue':student_data_children, 'mod':'r', 'writeerror':'402'},
                'cmi.student_data.mastery_score':{'defaultvalue':def[scoid]['cmi.student_data.mastery_score'], 'mod':'r', 'writeerror':'403'},
                'cmi.student_data.max_time_allowed':{'defaultvalue':def[scoid]['cmi.student_data.max_time_allowed'], 'mod':'r', 'writeerror':'403'},
                'cmi.student_data.time_limit_action':{'defaultvalue':def[scoid]['cmi.student_data.time_limit_action'], 'mod':'r', 'writeerror':'403'},
                'cmi.student_preference._children':{'defaultvalue':student_preference_children, 'mod':'r', 'writeerror':'402'},
                'cmi.student_preference.audio':{'defaultvalue':def[scoid]['cmi.student_preference.audio'], 'format':CMISInteger, 'range':audio_range, 'mod':'rw', 'writeerror':'405'},
                'cmi.student_preference.language':{'defaultvalue':def[scoid]['cmi.student_preference.language'], 'format':CMIString256, 'mod':'rw', 'writeerror':'405'},
                'cmi.student_preference.speed':{'defaultvalue':def[scoid]['cmi.student_preference.speed'], 'format':CMISInteger, 'range':speed_range, 'mod':'rw', 'writeerror':'405'},
                'cmi.student_preference.text':{'defaultvalue':def[scoid]['cmi.student_preference.text'], 'format':CMISInteger, 'range':text_range, 'mod':'rw', 'writeerror':'405'},
                'cmi.interactions._children':{'defaultvalue':interactions_children, 'mod':'r', 'writeerror':'402'},
                'cmi.interactions._count':{'mod':'r', 'defaultvalue':'0', 'writeerror':'402'},
                'cmi.interactions.n.id':{'pattern':CMIIndex, 'format':CMIIdentifier, 'mod':'w', 'readerror':'404', 'writeerror':'405'},
                'cmi.interactions.n.objectives._count':{'pattern':CMIIndex, 'mod':'r', 'defaultvalue':'0', 'writeerror':'402'},
                'cmi.interactions.n.objectives.n.id':{'pattern':CMIIndex, 'format':CMIIdentifier, 'mod':'w', 'readerror':'404', 'writeerror':'405'},
                'cmi.interactions.n.time':{'pattern':CMIIndex, 'format':CMITime, 'mod':'w', 'readerror':'404', 'writeerror':'405'},
                'cmi.interactions.n.type':{'pattern':CMIIndex, 'format':CMIType, 'mod':'w', 'readerror':'404', 'writeerror':'405'},
                'cmi.interactions.n.correct_responses._count':{'pattern':CMIIndex, 'mod':'r', 'defaultvalue':'0', 'writeerror':'402'},
                'cmi.interactions.n.correct_responses.n.pattern':{'pattern':CMIIndex, 'format':CMIFeedback, 'mod':'w', 'readerror':'404', 'writeerror':'405'},
                'cmi.interactions.n.weighting':{'pattern':CMIIndex, 'format':CMIDecimal, 'range':weighting_range, 'mod':'w', 'readerror':'404', 'writeerror':'405'},
                'cmi.interactions.n.student_response':{'pattern':CMIIndex, 'format':CMIFeedback, 'mod':'w', 'readerror':'404', 'writeerror':'405'},
                'cmi.interactions.n.result':{'pattern':CMIIndex, 'format':CMIResult, 'mod':'w', 'readerror':'404', 'writeerror':'405'},
                'cmi.interactions.n.latency':{'pattern':CMIIndex, 'format':CMITimespan, 'mod':'w', 'readerror':'404', 'writeerror':'405'},
                'nav.event':{'defaultvalue':'', 'format':NAVEvent, 'mod':'w', 'readerror':'404', 'writeerror':'405'}
            };
            currentUserData[scoid] = {};
            for (var element in datamodel[scoid]) {
                if (element.match(/\.n\./) === null) {
                    if (typeof datamodel[scoid][element].defaultvalue != 'undefined') {
                        currentUserData[scoid][element] = datamodel[scoid][element].defaultvalue;
                    }
                }
            }
            for (element in def[scoid]) {
                if (element.match(/\.n\./) === null) {
                    if (typeof datamodel[scoid][element].defaultvalue != 'undefined') {
                        currentUserData[scoid][element] = datamodel[scoid][element].defaultvalue;
                    } else if (typeof defExtra[scoid][element] != 'undefined') {
                        currentUserData[scoid][element] = defExtra[scoid][element];
                    } else {
                        currentUserData[scoid][element] = '';
                    }
                }
            }
            var expression = new RegExp(CMIIndex,'g');
            var elementDotFormat, counterElement, currentCounterIndex, currentN;
            for (element in defExtra[scoid]) {
                counterElement = '';
                currentCounterIndex = 0;
                if (element.match(expression)) {
                    elementDotFormat = element.replace(expression, ".$1.");
                    currentUserData[scoid][elementDotFormat] = defExtra[scoid][element];
                    if (elementDotFormat.indexOf("cmi.evaluation.comments") === 0) {
                        counterElement = "cmi.evaluation.comments._count";
                        currentCounterIndex = elementDotFormat.match(/.(\d+)./)[1];
                    } else if (elementDotFormat.indexOf("cmi.objectives") === 0) {
                        counterElement = "cmi.objectives._count";
                        currentCounterIndex = elementDotFormat.match(/.(\d+)./)[1];
                    } else if (elementDotFormat.indexOf("cmi.interactions") === 0) {
                        if (elementDotFormat.indexOf(".objectives.") > 0) {
                            currentN = elementDotFormat.match(/cmi.interactions.(\d+)./)[1];
                            currentCounterIndex = elementDotFormat.match(/objectives.(\d+)./)[1];
                            counterElement = "cmi.interactions." + currentN + ".objectives._count";
                        } else if (elementDotFormat.indexOf(".correct_responses.") > 0) {
                            currentN = elementDotFormat.match(/cmi.interactions.(\d+)./)[1];
                            currentCounterIndex = elementDotFormat.match(/correct_responses.(\d+)./)[1];
                            counterElement = "cmi.interactions." + currentN + ".correct_responses._count";
                        } else {
                            counterElement = "cmi.interactions._count";
                            currentCounterIndex = elementDotFormat.match(/.(\d+)./)[1];
                        }
                    }
                    if (counterElement) {
                        if (typeof currentUserData[scoid][counterElement] == "undefined") {
                            currentUserData[scoid][counterElement] = 0;
                        }
                        if (parseInt(currentCounterIndex) == parseInt(currentUserData[scoid][counterElement])) {
                            currentUserData[scoid][counterElement] = parseInt(currentUserData[scoid][counterElement]) + 1;
                        }
                        if (parseInt(currentCounterIndex) > parseInt(currentUserData[scoid][counterElement])) {
                            currentUserData[scoid][counterElement] = parseInt(currentCounterIndex) - 1;
                        }
                    }
                }
            }
            if (currentUserData[scoid]['cmi.core.lesson_status'] === '') {
                currentUserData[scoid]['cmi.core.lesson_status'] = 'not attempted';
            }
            currentUserData[scoid]['cmi.core.credit'] = mode == $mmaModScorm.MODENORMAL ? 'credit' : 'no-credit';
            currentUserData[scoid]['cmi.core.lesson_mode'] = mode;
        }
                function getEl(el) {
            if (typeof currentUserData[self.scoId] != 'undefined' && typeof currentUserData[self.scoId][el] != 'undefined') {
                return currentUserData[self.scoId][el];
            }
            return '';
        }
                function setEl(el, value) {
            if (typeof currentUserData[self.scoId] == 'undefined') {
                currentUserData[self.scoId] = {};
            }
            currentUserData[self.scoId][el] = value;
        }
                function CloneObj(obj){
            if(obj == null || typeof(obj) != 'object') {
                return obj;
            }
            var temp = new obj.constructor();
            for(var key in obj) {
                temp[key] = CloneObj(obj[key]);
            }
            return temp;
        }
                function AddTime (first, second) {
            var sFirst = first.split(":");
            var sSecond = second.split(":");
            var cFirst = sFirst[2].split(".");
            var cSecond = sSecond[2].split(".");
            var change = 0;
            FirstCents = 0; 
            if (cFirst.length > 1) {
                FirstCents = parseInt(cFirst[1],10);
            }
            SecondCents = 0;
            if (cSecond.length > 1) {
                SecondCents = parseInt(cSecond[1],10);
            }
            var cents = FirstCents + SecondCents;
            change = Math.floor(cents / 100);
            cents = cents - (change * 100);
            if (Math.floor(cents) < 10) {
                cents = "0" + cents.toString();
            }
            var secs = parseInt(cFirst[0],10) + parseInt(cSecond[0],10) + change; 
            change = Math.floor(secs / 60);
            secs = secs - (change * 60);
            if (Math.floor(secs) < 10) {
                secs = "0" + secs.toString();
            }
            mins = parseInt(sFirst[1],10) + parseInt(sSecond[1],10) + change;  
            change = Math.floor(mins / 60);
            mins = mins - (change * 60);
            if (mins < 10) {
                mins = "0" + mins.toString();
            }
            hours = parseInt(sFirst[0],10) + parseInt(sSecond[0],10) + change; 
            if (hours < 10) {
                hours = "0" + hours.toString();
            }
            if (cents != '0') {
                return hours + ":" + mins + ":" + secs + '.' + cents;
            } else {
                return hours + ":" + mins + ":" + secs;
            }
        }
                function TotalTime() {
            total_time = AddTime(getEl('cmi.core.total_time'), getEl('cmi.core.session_time'));
            return {'element': 'cmi.core.total_time', value: total_time};
        }
                function StoreData(storetotaltime) {
            if (storetotaltime) {
                if (getEl('cmi.core.lesson_status') == 'not attempted') {
                    setEl('cmi.core.lesson_status', 'completed');
                }
                if (getEl('cmi.core.lesson_mode') == $mmaModScorm.MODENORMAL) {
                    if (getEl('cmi.core.credit') == 'credit') {
                        if (getEl('cmi.student_data.mastery_score') !== '' && getEl('cmi.core.score.raw') !== '') {
                            if (parseFloat(getEl('cmi.core.score.raw')) >= parseFloat(getEl('cmi.student_data.mastery_score'))) {
                                setEl('cmi.core.lesson_status', 'passed');
                            } else {
                                setEl('cmi.core.lesson_status', 'failed');
                            }
                        }
                    }
                }
                if (getEl('cmi.core.lesson_mode') == $mmaModScorm.MODEBROWSE) {
                    if (datamodel[self.scoId]['cmi.core.lesson_status'].defaultvalue == '' && getEl('cmi.core.lesson_status') == 'not attempted') {
                        setEl('cmi.core.lesson_status', 'browsed');
                    }
                }
                tracks = CollectData();
                tracks.push(TotalTime());
            } else {
                tracks = CollectData();
            }
            var success = $mmaModScorm.saveTracksSync(self.scoId, attempt, tracks, self.offline, scorm, currentUserData);
            if (!self.offline && !success) {
                self.offline = true;
                triggerEvent(mmaModScormEventGoOffline);
                return $mmaModScorm.saveTracksSync(self.scoId, attempt, tracks, self.offline, scorm, currentUserData);
            }
            return success;
        }
                function CollectData() {
            var data = [];
            for (var element in currentUserData[self.scoId]) {
                if (element.substr(0, 3) == 'cmi') {
                    expression = new RegExp(CMIIndex,'g');
                    elementmodel = String(element).replace(expression,'.n.');
                    if (element != "cmi.core.session_time") {
                        if (typeof datamodel[self.scoId][element] == "undefined" &&
                                typeof datamodel[self.scoId][elementmodel] != "undefined") {
                            datamodel[self.scoId][element] = CloneObj(datamodel[self.scoId][elementmodel]);
                        }
                        if (typeof datamodel[self.scoId][element] != "undefined") {
                            if (datamodel[self.scoId][element].mod != 'r') {
                                var el = {
                                    'element': element.replace(expression, "_$1."),
                                    'value': getEl(element)
                                };
                                if (typeof datamodel[self.scoId][element].defaultvalue != "undefined") {
                                    if (datamodel[self.scoId][element].defaultvalue != el['value'] ||
                                            typeof datamodel[self.scoId][element].defaultvalue != typeof(el['value'])) {
                                        data.push(el);
                                        datamodel[self.scoId][element].defaultvalue = el['value'];
                                    }
                                } else {
                                    data.push(el);
                                    datamodel[self.scoId][element].defaultvalue = el['value'];
                                }
                            }
                        }
                    }
                }
            }
            return data;
        }
        var initialized = false;
        var errorCode;
        var timeout;
        self.LMSInitialize = function(param) {
            errorCode = "0";
            if (param == "") {
                if (!initialized) {
                    initialized = true;
                    errorCode = "0";
                    return "true";
                } else {
                    errorCode = "101";
                }
            } else {
                errorCode = "201";
            }
            return "false";
        };
        self.LMSFinish = function(param) {
            errorCode = "0";
            if (param == "") {
                if (initialized) {
                    initialized = false;
                    result = StoreData(true);
                    if (getEl('nav.event') != '') {
                        if (getEl('nav.event') == 'continue') {
                            triggerEvent(mmaModScormEventLaunchNextSco);
                        } else {
                            triggerEvent(mmaModScormEventLaunchPrevSco);
                        }
                    } else {
                        if (scorm.auto == '1') {
                            triggerEvent(mmaModScormEventLaunchNextSco);
                        }
                    }
                    errorCode = (result) ? '0' : '101';
                    triggerEvent(mmaModScormEventUpdateToc);
                    result = result ? "true" : "false";
                    return result;
                } else {
                    errorCode = "301";
                }
            } else {
                errorCode = "201";
            }
            return "false";
        };
        self.LMSGetValue = function(element) {
            errorCode = "0";
            if (initialized) {
                if (element != "") {
                    expression = new RegExp(CMIIndex,'g');
                    elementmodel = String(element).replace(expression,'.n.');
                    if (typeof datamodel[self.scoId][elementmodel] != "undefined") {
                        if (datamodel[self.scoId][elementmodel].mod != 'w') {
                            errorCode = "0";
                            return getEl(element);
                        } else {
                            errorCode = datamodel[self.scoId][elementmodel].readerror;
                        }
                    } else {
                        childrenstr = '._children';
                        countstr = '._count';
                        if (elementmodel.substr(elementmodel.length - childrenstr.length,elementmodel.length) == childrenstr) {
                            parentmodel = elementmodel.substr(0,elementmodel.length - childrenstr.length);
                            if (typeof datamodel[self.scoId][parentmodel] != "undefined") {
                                errorCode = "202";
                            } else {
                                errorCode = "201";
                            }
                        } else if (elementmodel.substr(elementmodel.length - countstr.length,elementmodel.length) == countstr) {
                            parentmodel = elementmodel.substr(0,elementmodel.length - countstr.length);
                            if (typeof datamodel[self.scoId][parentmodel] != "undefined") {
                                errorCode = "203";
                            } else {
                                errorCode = "201";
                            }
                        } else {
                            errorCode = "201";
                        }
                    }
                } else {
                    errorCode = "201";
                }
            } else {
                errorCode = "301";
            }
            return "";
        };
        self.LMSSetValue = function(element, value) {
            errorCode = "0";
            if (initialized) {
                if (element != "") {
                    expression = new RegExp(CMIIndex,'g');
                    elementmodel = String(element).replace(expression,'.n.');
                    if (typeof datamodel[self.scoId][elementmodel] != "undefined") {
                        if (datamodel[self.scoId][elementmodel].mod != 'r') {
                            expression = new RegExp(datamodel[self.scoId][elementmodel].format);
                            value = value + '';
                            matches = value.match(expression);
                            if (matches != null) {
                                if (element != elementmodel) {
                                    if (element.indexOf("cmi.objectives") === 0) {
                                        currentN = element.match(/cmi.objectives.(\d+)./)[1];
                                        counterElement = "cmi.objectives." + currentN + ".score";
                                        if (typeof currentUserData[self.scoId][counterElement + '._children'] == "undefined") {
                                            setEl(currentUserData[self.scoId][counterElement + '._children'], score_children);
                                            setEl(currentUserData[self.scoId][counterElement + '.raw'], '');
                                            setEl(currentUserData[self.scoId][counterElement + '.min'], '');
                                            setEl(currentUserData[self.scoId][counterElement + '.max'], '');
                                        }
                                    } else if (element.indexOf("cmi.interactions") === 0) {
                                        currentN = element.match(/cmi.interactions.(\d+)./)[1];
                                        counterElement = "cmi.interactions." + currentN + ".objectives._count";
                                        if (typeof currentUserData[self.scoId][counterElement] == "undefined") {
                                            setEl(counterElement, 0);
                                        }
                                        counterElement = "cmi.interactions." + currentN + ".correct_responses._count";
                                        if (typeof currentUserData[self.scoId][counterElement] == "undefined") {
                                            setEl(counterElement, 0);
                                        }
                                    }
                                    elementIndexes = element.split('.');
                                    subelement = 'cmi';
                                    for (i = 1; i < elementIndexes.length - 1; i++) {
                                        elementIndex = elementIndexes[i];
                                        if (elementIndexes[i + 1].match(/^\d+$/)) {
                                            if (typeof currentUserData[self.scoId][subelement + '.' + elementIndex + '._count'] == "undefined") {
                                                setEl(subelement + '.' + elementIndex + '._count', 0);
                                            }
                                            if (elementIndexes[i + 1] == getEl(subelement + '.' + elementIndex + '._count')) {
                                                var count = getEl(subelement + '.' + elementIndex + '._count');
                                                setEl(subelement + '.' + elementIndex + '._count', parseInt(count) + 1);
                                            }
                                            if (elementIndexes[i + 1] > getEl(subelement + '.' + elementIndex + '._count')) {
                                                errorCode = "201";
                                            }
                                            subelement = subelement.concat('.' + elementIndex + '.' + elementIndexes[i + 1]);
                                            i++;
                                        } else {
                                            subelement = subelement.concat('.' + elementIndex);
                                        }
                                    }
                                    element = subelement.concat('.' + elementIndexes[elementIndexes.length - 1]);
                                }
                                if (errorCode == "0") {
                                    if (scorm.autocommit && !(timeout)) {
                                        timeout = setTimeout(self.LMSCommit, 60000, [""]);
                                    }
                                    if (typeof datamodel[self.scoId][elementmodel].range != "undefined") {
                                        range = datamodel[self.scoId][elementmodel].range;
                                        ranges = range.split('#');
                                        value = value * 1.0;
                                        if ((value >= ranges[0]) && (value <= ranges[1])) {
                                            setEl(element, value);
                                            errorCode = "0";
                                            return "true";
                                        } else {
                                            errorCode = datamodel[self.scoId][elementmodel].writeerror;
                                        }
                                    } else {
                                        if (element == 'cmi.comments') {
                                            setEl('cmi.comments', getEl('cmi.comments') + value);
                                        } else {
                                            setEl(element, value);
                                        }
                                        errorCode = "0";
                                        return "true";
                                    }
                                }
                            } else {
                                errorCode = datamodel[self.scoId][elementmodel].writeerror;
                            }
                        } else {
                            errorCode = datamodel[self.scoId][elementmodel].writeerror;
                        }
                    } else {
                        errorCode = "201";
                    }
                } else {
                    errorCode = "201";
                }
            } else {
                errorCode = "301";
            }
            return "false";
        };
        self.LMSCommit = function(param) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            errorCode = "0";
            if (param == "") {
                if (initialized) {
                    result = StoreData(false);
                    triggerEvent(mmaModScormEventUpdateToc);
                    errorCode = result ? '0' : '101';
                    result = result ? "true" : "false";
                    return result;
                } else {
                    errorCode = "301";
                }
            } else {
                errorCode = "201";
            }
            return "false";
        };
        self.LMSGetLastError = function() {
            return errorCode;
        };
        var errorString = [];
        errorString["0"] = "No error";
        errorString["101"] = "General exception";
        errorString["201"] = "Invalid argument error";
        errorString["202"] = "Element cannot have children";
        errorString["203"] = "Element not an array - cannot have count";
        errorString["301"] = "Not initialized";
        errorString["401"] = "Not implemented error";
        errorString["402"] = "Invalid set value, element is a keyword";
        errorString["403"] = "Element is read only";
        errorString["404"] = "Element is write only";
        errorString["405"] = "Incorrect data type";
        self.LMSGetErrorString = function(param) {
            if (param != "") {
                return errorString[param];
            } else {
               return "";
            }
        };
        self.LMSGetDiagnostic = function(param) {
            if (param == "") {
                param = errorCode;
            }
            return param;
        };
    }
        self.initAPI = function(scorm, scoId, attempt, userData, mode, offline) {
        mode = mode || $mmaModScorm.MODENORMAL;
        $window.API = new SCORMAPI(scorm, scoId, attempt, userData, mode, offline);
    };
        self.loadSco = function(scoId) {
        $window.API.scoId = scoId;
    };
        self.setOffline = function(offline) {
        $window.API.offline = offline;
    };
    return self;
}]);

angular.module('mm.addons.mod_scorm')
.factory('$mmaModScormHandlers', ["$mmCourse", "$mmaModScorm", "$mmEvents", "$state", "$mmSite", "$mmaModScormHelper", "$mmCoursePrefetchDelegate", "mmCoreDownloading", "mmCoreNotDownloaded", "mmCoreOutdated", "mmCoreEventPackageStatusChanged", "mmaModScormComponent", "$q", "$mmContentLinksHelper", "$mmUtil", function($mmCourse, $mmaModScorm, $mmEvents, $state, $mmSite, $mmaModScormHelper,
        $mmCoursePrefetchDelegate, mmCoreDownloading, mmCoreNotDownloaded, mmCoreOutdated, mmCoreEventPackageStatusChanged,
        mmaModScormComponent, $q, $mmContentLinksHelper, $mmUtil) {
    var self = {};
        self.courseContent = function() {
        var self = {};
                self.isEnabled = function() {
            return $mmaModScorm.isPluginEnabled();
        };
                self.getController = function(module, courseid) {
            return function($scope) {
                var downloadBtn,
                    refreshBtn;
                downloadBtn = {
                    hidden: true,
                    icon: 'ion-ios-cloud-download',
                    label: 'mm.core.download'
                };
                refreshBtn = {
                    icon: 'ion-android-refresh',
                    label: 'mm.core.refresh',
                    hidden: true
                };
                $scope.icon = $mmCourse.getModuleIconSrc('scorm');
                $scope.title = module.name;
                $scope.buttons = [downloadBtn, refreshBtn];
                $scope.spinner = true;
                $scope.action = function(e) {
                    if (e) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    $state.go('site.mod_scorm', {module: module, courseid: courseid});
                };
                $mmaModScorm.getScorm(courseid, module.id, module.url).then(function(scorm) {
                    var revision = scorm.sha1hash,
                        timemodified = 0;
                    function download() {
                        $scope.spinner = true;
                        $mmaModScorm.getScorm(courseid, module.id, module.url).then(function(scorm) {
                            $mmaModScormHelper.confirmDownload(scorm).then(function() {
                                $mmaModScorm.prefetch(scorm).catch(function() {
                                    if (!$scope.$$destroyed) {
                                        $mmaModScormHelper.showDownloadError(scorm);
                                    }
                                });
                            }).catch(function() {
                                $scope.spinner = false;
                            });
                        }).catch(function(error) {
                            $scope.spinner = false;
                            if (error) {
                                $mmUtil.showErrorModal(error);
                            } else {
                                $mmaModScormHelper.showDownloadError(scorm);
                            }
                        });
                    }
                    downloadBtn.action = function(e) {
                        if (e) {
                            e.preventDefault();
                            e.stopPropagation();
                        }
                        download();
                    };
                    refreshBtn.action = function(e) {
                        if (e) {
                            e.preventDefault();
                            e.stopPropagation();
                        }
                        $mmaModScorm.invalidateContent(scorm.coursemodule).finally(function() {
                            download();
                        });
                    };
                    function showStatus(status) {
                        if (status) {
                            $scope.spinner = status === mmCoreDownloading;
                            downloadBtn.hidden = status !== mmCoreNotDownloaded;
                            refreshBtn.hidden = status !== mmCoreOutdated;
                        }
                    }
                    var statusObserver = $mmEvents.on(mmCoreEventPackageStatusChanged, function(data) {
                        if (data.siteid === $mmSite.getId() && data.componentId === scorm.coursemodule &&
                                data.component === mmaModScormComponent) {
                            showStatus(data.status);
                        }
                    });
                    $mmCoursePrefetchDelegate.getModuleStatus(module, courseid, revision, timemodified).then(showStatus);
                    $scope.$on('$destroy', function() {
                        statusObserver && statusObserver.off && statusObserver.off();
                    });
                });
            };
        };
        return self;
    };
        self.linksHandler = function() {
        var self = {};
                function isEnabled(siteId, courseId) {
            return $mmaModScorm.isPluginEnabled(siteId).then(function(enabled) {
                if (!enabled) {
                    return false;
                }
                return courseId || $mmCourse.canGetModuleWithoutCourseId(siteId);
            });
        }
                self.getActions = function(siteIds, url, courseId) {
            if (typeof self.handles(url) != 'undefined') {
                return $mmContentLinksHelper.treatModuleIndexUrl(siteIds, url, isEnabled, courseId);
            }
            return $q.when([]);
        };
                self.handles = function(url) {
            var position = url.indexOf('/mod/scorm/view.php');
            if (position > -1) {
                return url.substr(0, position);
            }
        };
        return self;
    };
    return self;
}]);

angular.module('mm.addons.mod_scorm')
.factory('$mmaModScormHelper', ["$mmaModScorm", "$mmUtil", "$translate", "$q", "$mmaModScormOffline", "$mmaModScormSync", "$mmSite", function($mmaModScorm, $mmUtil, $translate, $q, $mmaModScormOffline, $mmaModScormSync, $mmSite) {
    var self = {},
        elementsToIgnore = ['status', 'score_raw', 'total_time', 'session_time', 'student_id', 'student_name', 'credit',
                            'mode', 'entry'];
        self.buildWarningsMessage = function(warnings) {
        var message = '';
        angular.forEach(warnings, function(warning) {
            if (warning) {
                message = message + '<p>' + warning + '</p>';
            }
        });
        return message;
    };
        self.convertAttemptToOffline = function(scorm, attempt, siteId) {
        siteId = siteId || $mmSite.getId();
        return $mmaModScorm.getScormUserData(scorm.id, attempt, false, siteId).then(function(onlineData) {
            return $mmaModScormOffline.getScormUserData(siteId, scorm.id, attempt).catch(function() {
            }).then(function(offlineData) {
                var dataToStore = angular.copy(onlineData);
                angular.forEach(dataToStore, function(sco) {
                    elementsToIgnore.forEach(function(el) {
                        delete sco.userdata[el];
                    });
                    if (offlineData && offlineData[sco.scoid] && offlineData[sco.scoid].userdata) {
                        var scoUserData = {};
                        angular.forEach(sco.userdata, function(value, element) {
                            if (!offlineData[sco.scoid].userdata[element]) {
                                scoUserData[element] = value;
                            }
                        });
                        sco.userdata = scoUserData;
                    }
                });
                return $mmaModScormOffline.createNewAttempt(siteId, scorm, undefined, attempt, dataToStore, onlineData);
            });
        }).catch(function() {
            return $q.reject($translate.instant('mma.mod_scorm.errorcreateofflineattempt'));
        });
    };
        self.createOfflineAttempt = function(scorm, newAttempt, lastOnline, siteId) {
        siteId = siteId || $mmSite.getId();
        return self.searchOnlineAttemptUserData(scorm.id, lastOnline, siteId).then(function(userData) {
            angular.forEach(userData, function(sco) {
                var filtered = {};
                angular.forEach(sco.userdata, function(value, element) {
                    if (element.indexOf('.') == -1 && elementsToIgnore.indexOf(element) == -1) {
                        filtered[element] = value;
                    }
                });
                sco.userdata = filtered;
            });
            return $mmaModScormOffline.createNewAttempt(siteId, scorm, undefined, newAttempt, userData);
        }).catch(function() {
            return $q.reject($translate.instant('mma.mod_scorm.errorcreateofflineattempt'));
        });
    };
        self.confirmDownload = function(scorm) {
        var promise;
        if (!scorm.packagesize) {
            promise = $mmaModScorm.calculateScormSize(scorm).then(function(size) {
                scorm.packagesize = size;
                return size;
            });
        } else {
            promise = $q.when(scorm.packagesize);
        }
        return promise.then(function(size) {
            return $mmUtil.confirmDownloadSize(size);
        });
    };
        self.determineAttemptToContinue = function(scorm, attempts, siteId) {
        siteId = siteId || $mmSite.getId();
        var lastOnline,
            result = {
                number: 0,
                offline: false
            };
        function getLastBeforeMax() {
            if (scorm.maxattempt != 0 && attempts.lastAttempt.number > scorm.maxattempt) {
                result.number = scorm.maxattempt;
                result.offline = attempts.offline.indexOf(scorm.maxattempt) > -1;
            } else {
                result.number = attempts.lastAttempt.number;
                result.offline = attempts.lastAttempt.offline;
            }
        }
        if (attempts.online.length) {
            lastOnline = Math.max.apply(Math, attempts.online);
        }
        if (lastOnline) {
            var hasOffline = attempts.offline.indexOf(lastOnline) > -1;
            return $mmaModScorm.isAttemptIncomplete(scorm.id, lastOnline, hasOffline, false, siteId).then(function(incomplete) {
                if (incomplete) {
                    result.number = lastOnline;
                    result.offline = hasOffline;
                } else {
                    getLastBeforeMax();
                }
                return result;
            });
        } else {
            getLastBeforeMax();
            return $q.when(result);
        }
    };
        self.getFirstSco = function(scormId, toc, organization, attempt, offline, siteId) {
        siteId = siteId || $mmSite.getId();
        var promise;
        if (toc && toc.length) {
            promise = $q.when(toc);
        } else {
            promise = $mmaModScorm.getScosWithData(scormId, organization, attempt, offline, false, siteId);
        }
        return promise.then(function(scos) {
            for (var i = 0; i < scos.length; i++) {
                var sco = scos[i];
                if (sco.isvisible && sco.prereq && sco.launch) {
                    return sco;
                }
            }
        });
    };
        self.getNextScoFromToc = function(toc, scoId) {
        for (var i = 0, len = toc.length; i < len; i++) {
            if (toc[i].id == scoId) {
                for (var j = i + 1; j < len; j++) {
                    if (toc[j].isvisible && toc[j].prereq && toc[j].launch) {
                        return toc[j];
                    }
                }
                break;
            }
        }
    };
        self.getPreviousScoFromToc = function(toc, scoId) {
        for (var i = 0, len = toc.length; i < len; i++) {
            if (toc[i].id == scoId) {
                for (var j = i - 1; j >= 0; j--) {
                    if (toc[j].isvisible && toc[j].prereq && toc[j].launch) {
                        return toc[j];
                    }
                }
                break;
            }
        }
    };
        self.getScoFromToc = function(toc, scoId) {
        for (var i = 0, len = toc.length; i < len; i++) {
            if (toc[i].id == scoId) {
                return toc[i];
            }
        }
    };
        self.getScormReadableSyncTime = function(scormId, siteId) {
        return $mmaModScormSync.getScormSyncTime(scormId, siteId).then(function(time) {
            if (time == 0) {
                return $translate('mm.core.none');
            } else {
                return moment(time).format('LLL');
            }
        });
    };
        self.searchOnlineAttemptUserData = function(scormId, attempt, siteId) {
        siteId = siteId || $mmSite.getId();
        return $mmaModScorm.getScormUserData(scormId, attempt, false, siteId).catch(function() {
            if (attempt > 0) {
                return self.searchOnlineAttemptUserData(scormId, attempt - 1, siteId);
            } else {
                return $q.reject();
            }
        });
    };
        self.showDownloadError = function(scorm) {
        $translate('mma.mod_scorm.errordownloadscorm', {name: scorm.name}).then(function(message) {
            $mmUtil.showErrorModal(message);
        });
    };
    return self;
}]);

angular.module('mm.addons.mod_scorm')
.factory('$mmaModScormPrefetchHandler', ["$mmaModScorm", "mmaModScormComponent", function($mmaModScorm, mmaModScormComponent) {
    var self = {};
    self.component = mmaModScormComponent;
        self.getDownloadSize = function(module, courseid) {
        return $mmaModScorm.getScorm(courseid, module.id, module.url).then(function(scorm) {
            if ($mmaModScorm.isScormSupported(scorm) !== true) {
                return 0;
            } else if (!scorm.packagesize) {
                return $mmaModScorm.calculateScormSize(scorm);
            } else {
                return scorm.packagesize;
            }
        });
    };
        self.getFiles = function(module, courseid) {
        return $mmaModScorm.getScorm(courseid, module.id, module.url).then(function(scorm) {
            return $mmaModScorm.getScormFileList(scorm);
        }).catch(function() {
            return [];
        });
    };
        self.getRevision = function(module, courseid) {
        return $mmaModScorm.getScorm(courseid, module.id, module.url).then(function(scorm) {
            return scorm.sha1hash;
        });
    };
        self.getTimemodified = function(module, courseid) {
        return 0;
    };
        self.isEnabled = function() {
        return $mmaModScorm.isPluginEnabled();
    };
        self.prefetch = function(module, courseid) {
        return $mmaModScorm.getScorm(courseid, module.id, module.url).then(function(scorm) {
            return $mmaModScorm.prefetch(scorm);
        });
    };
    return self;
}]);

angular.module('mm.addons.mod_scorm')
.factory('$mmaModScorm', ["$mmSite", "$q", "$translate", "$mmLang", "$mmFilepool", "$mmFS", "$mmWS", "$sce", "$mmaModScormOnline", "$state", "$mmaModScormOffline", "$mmUtil", "$log", "$mmSitesManager", "mmaModScormComponent", "mmCoreNotDownloaded", function($mmSite, $q, $translate, $mmLang, $mmFilepool, $mmFS, $mmWS, $sce, $mmaModScormOnline, $state,
            $mmaModScormOffline, $mmUtil, $log, $mmSitesManager, mmaModScormComponent, mmCoreNotDownloaded) {
    $log = $log.getInstance('$mmaModScorm');
    var self = {},
        statuses = ['notattempted', 'passed', 'completed', 'failed', 'incomplete', 'browsed', 'suspend'],
        downloadPromises = {};
    self.GRADESCOES     = 0;
    self.GRADEHIGHEST   = 1;
    self.GRADEAVERAGE   = 2;
    self.GRADESUM       = 3;
    self.HIGHESTATTEMPT = 0;
    self.AVERAGEATTEMPT = 1;
    self.FIRSTATTEMPT   = 2;
    self.LASTATTEMPT    = 3;
    self.MODEBROWSE = 'browse';
    self.MODENORMAL = 'normal';
    self.MODEREVIEW = 'review';
        self.calculateScormGrade = function(scorm, onlineAttempts) {
        if (!onlineAttempts || !Object.keys(onlineAttempts).length) {
            return -1;
        }
        switch (scorm.whatgrade) {
            case self.FIRSTATTEMPT:
                return onlineAttempts[1] ? onlineAttempts[1].grade : -1;
            case self.LASTATTEMPT:
                var max = 0;
                angular.forEach(Object.keys(onlineAttempts), function(number) {
                    max = Math.max(number, max);
                });
                if (max > 0) {
                    return onlineAttempts[max].grade;
                }
                return -1;
            case self.HIGHESTATTEMPT:
                var grade = 0;
                angular.forEach(onlineAttempts, function(attempt) {
                    grade = Math.max(attempt.grade, grade);
                });
                return grade;
            case self.AVERAGEATTEMPT:
                var sumgrades = 0,
                    total = 0;
                angular.forEach(onlineAttempts, function(attempt) {
                    sumgrades += attempt.grade;
                    total++;
                });
                return Math.round(sumgrades / total);
        }
        return -1;
    };
        self.calculateScormSize = function(scorm) {
        if (scorm.packagesize) {
            return $q.when(scorm.packagesize);
        }
        return $mmWS.getRemoteFileSize(self.getPackageUrl(scorm));
    };
        self.countAttemptsLeft = function(scorm, attemptsCount) {
        if (scorm.maxattempt == 0) {
            return Number.MAX_VALUE;
        }
        attemptsCount = parseInt(attemptsCount, 10);
        if (isNaN(attemptsCount)) {
            return -1;
        }
        return scorm.maxattempt - attemptsCount;
    };
        self.determineAttemptAndMode = function(scorm, mode, attempt, newAttempt, incomplete) {
        if (mode == self.MODEBROWSE) {
            if (scorm.hidebrowse) {
                mode = self.MODENORMAL;
            } else {
                if (attempt == 0) {
                    attempt = 1;
                    newAttempt = true;
                }
                return {
                    mode: mode,
                    attempt: attempt,
                    newAttempt: newAttempt
                };
            }
        }
        if (attempt == 0) {
            newAttempt = true;
        } else if (incomplete) {
            newAttempt = false;
        } else if (scorm.forcenewattempt) {
            newAttempt = true;
        }
        if (newAttempt && (scorm.maxattempt == 0 || attempt < scorm.maxattempt)) {
            attempt++;
            mode = self.MODENORMAL;
        } else {
            if (incomplete) {
                mode = self.MODENORMAL;
            } else {
                mode = self.MODEREVIEW;
            }
        }
        return {
            mode: mode,
            attempt: attempt,
            newAttempt: newAttempt
        };
    };
        self.displayTocInPlayer = function(scorm) {
        return scorm.hidetoc !== 3;
    };
        self.download = function(scorm) {
        return self._downloadOrPrefetch(scorm, false);
    };
        self._downloadOrPrefetch = function(scorm, prefetch) {
        var result = self.isScormSupported(scorm),
            siteId = $mmSite.getId();
        if (result !== true) {
            return $mmLang.translateAndReject(result);
        }
        if (downloadPromises[siteId] && downloadPromises[siteId][scorm.id]) {
            return downloadPromises[siteId][scorm.id];
        } else if (!downloadPromises[siteId]) {
            downloadPromises[siteId] = {};
        }
        var files = self.getScormFileList(scorm),
            revision = scorm.sha1hash,
            dirPath,
            deferred = $q.defer(),
            fn = prefetch ? $mmFilepool.prefetchPackage : $mmFilepool.downloadPackage;
        downloadPromises[siteId][scorm.id] = deferred.promise;
        self.getScormFolder(scorm.moduleurl).then(function(path) {
            dirPath = path;
            deferred.notify({message: 'mm.core.downloading'});
            return fn(siteId, files, mmaModScormComponent, scorm.coursemodule, revision, 0)
                                                        .then(undefined, undefined, deferred.notify);
        }).then(function() {
            return $mmFS.removeDir(dirPath).catch(function() {
            });
        }).then(function() {
            return $mmFilepool.getFilePathByUrl(siteId, self.getPackageUrl(scorm));
        }).then(function(zippath) {
            deferred.notify({message: 'mm.core.unzipping'});
            return $mmFS.unzipFile(zippath, dirPath).then(function() {
                return $mmFilepool.removeFileByUrl(siteId, self.getPackageUrl(scorm)).catch(function() {
                });
            }, function(error) {
                return $mmFilepool.storePackageStatus(siteId, mmaModScormComponent, scorm.coursemodule,
                                            mmCoreNotDownloaded, revision, 0).then(function() {
                    return $q.reject(error);
                });
            }, deferred.notify);
        }).then(deferred.resolve, deferred.reject).finally(function() {
            delete downloadPromises[siteId][scorm.id];
        });
        return deferred.promise;
    };
        self.evalPrerequisites = function(prerequisites, trackData) {
        var stack = [],
            statuses = {
                'passed': 'passed',
                'completed': 'completed',
                'failed': 'failed',
                'incomplete': 'incomplete',
                'browsed': 'browsed',
                'not attempted': 'notattempted',
                'p': 'passed',
                'c': 'completed',
                'f': 'failed',
                'i': 'incomplete',
                'b': 'browsed',
                'n': 'notattempted'
            };
        prerequisites = prerequisites.replace(/&amp;/gi, '&');
        prerequisites = prerequisites.replace(/(&|\||\(|\)|\~)/gi, '\t$1\t');
        prerequisites = prerequisites.replace(/&/gi, '&&');
        prerequisites = prerequisites.replace(/\|/gi, '||');
        var elements = prerequisites.trim().split('\t');
        angular.forEach(elements, function(element) {
            element = element.trim();
            if (!element) {
                return;
            }
            if (!element.match(/^(&&|\|\||\(|\))$/gi)) {
                var re = /^(\d+)\*\{(.+)\}$/,
                    reOther = /^(.+)(\=|\<\>)(.+)$/,
                    matches;
                if (re.test(element)) {
                    matches = element.match(re);
                    var repeat = matches[1],
                        set = matches[2].split(','),
                        count = 0;
                    angular.forEach(set, function(setelement) {
                        setelement = setelement.trim();
                        if (typeof trackData[setelement] != 'undefined' &&
                                (trackData[setelement].status == 'completed' || trackData[setelement].status == 'passed')) {
                            count++;
                        }
                    });
                    if (count >= repeat) {
                        element = 'true';
                    } else {
                        element = 'false';
                    }
                } else if (element == '~') {
                    element = '!';
                } else if (reOther.test(element)) {
                    matches = element.match(reOther);
                    element = matches[1].trim();
                    if (typeof trackData[element] != 'undefined') {
                        value = matches[3].trim().replace(/(\'|\")/gi);
                        if (typeof statuses[value] != 'undefined') {
                            value = statuses[value];
                        }
                        if (matches[2] == '<>') {
                            oper = '!=';
                        } else {
                            oper = '==';
                        }
                        element = '(\'' + trackData[element].status + '\' ' + oper + ' \'' + value + '\')';
                    } else {
                        element = 'false';
                    }
                } else {
                    if (typeof trackData[element] != 'undefined' &&
                            (trackData[element].status == 'completed' || trackData[element].status == 'passed')) {
                        element = 'true';
                    } else {
                        element = 'false';
                    }
                }
            }
            stack.push(' ' + element + ' ');
        });
        return eval(stack.join('') + ';');
    };
        self.formatGrade = function(scorm, grade) {
        if (typeof grade == 'undefined' || grade == -1) {
            return $translate.instant('mm.core.none');
        }
        if (scorm.grademethod !== self.GRADESCOES && scorm.maxgrade > 0) {
            grade = (grade / scorm.maxgrade) * 100;
            return $translate.instant('mm.core.percentagenumber', {$a: $mmUtil.roundToDecimals(grade, 2)});
        }
        return grade;
    };
        self.formatTocToArray = function(toc, level) {
        if (!toc || !toc.length) {
            return [];
        }
        if (typeof level == 'undefined') {
            level = 0;
        }
        var formatted = [];
        angular.forEach(toc, function(node) {
            node.level = level;
            formatted.push(node);
            formatted = formatted.concat(self.formatTocToArray(node.children, level + 1));
        });
        return formatted;
    };
        self.getAttemptCount = function(scormId, siteId, userId, ignoreMissing, ignoreCache) {
        siteId = siteId || $mmSite.getId();
        return $mmSitesManager.getSite(siteId).then(function(site) {
            userId = userId || site.getUserId();
            var result = {
                    lastAttempt: {
                        number: 0,
                        offline: false
                    }
                },
                promises = [];
            promises.push($mmaModScormOnline.getAttemptCount(siteId, scormId, userId, ignoreMissing, ignoreCache)
                        .then(function(count) {
                result.online = [];
                for (var i = 1; i <= count; i++) {
                    result.online.push(i);
                }
                if (count > result.lastAttempt.number) {
                    result.lastAttempt.number = count;
                    result.lastAttempt.offline = false;
                }
            }));
            promises.push($mmaModScormOffline.getAttempts(siteId, scormId, userId).then(function(attempts) {
                result.offline = attempts.map(function(entry) {
                    if (entry.attempt >= result.lastAttempt.number) {
                        result.lastAttempt.number = entry.attempt;
                        result.lastAttempt.offline = true;
                    }
                    return entry.attempt;
                });
            }));
            return $q.all(promises).then(function() {
                var total = result.online.length;
                result.offline.forEach(function(attempt) {
                    if (result.online.indexOf(attempt) == -1) {
                        total++;
                    }
                });
                result.total = total;
                return result;
            });
        });
    };
        self.getAttemptGrade = function(scorm, attempt, offline, siteId) {
        var attemptscore = {
            scos: 0,
            values: 0,
            max: 0,
            sum: 0
        };
        return self.getScormUserData(scorm.id, attempt, offline, siteId).then(function(data) {
            angular.forEach(data, function(scodata) {
                var userdata = scodata.userdata;
                if (userdata.status == 'completed' || userdata.status == 'passed') {
                    attemptscore.scos++;
                }
                if (userdata.score_raw || (typeof scorm.scormtype != 'undefined' &&
                            scorm.scormtype == 'sco' && typeof userdata.score_raw != 'undefined')) {
                    var scoreraw = parseFloat(userdata.score_raw);
                    attemptscore.values++;
                    attemptscore.sum += scoreraw;
                    attemptscore.max = Math.max(scoreraw, attemptscore.max);
                }
            });
            var score = 0;
            switch (scorm.grademethod) {
                case self.GRADEHIGHEST:
                    score = attemptscore.max;
                break;
                case self.GRADEAVERAGE:
                    if (attemptscore.values > 0) {
                        score = attemptscore.sum / attemptscore.values;
                    } else {
                        score = 0;
                    }
                break;
                case self.GRADESUM:
                    score = attemptscore.sum;
                break;
                case self.GRADESCOES:
                    score = attemptscore.scos;
                break;
                default:
                    score = attemptscore.max;  
            }
            return score;
        });
    };
        self.getOrganizations = function(scormId, siteId) {
        return self.getScos(scormId, siteId).then(function(scos) {
            var organizations = [];
            angular.forEach(scos, function(sco) {
                if (sco.organization == '' && sco.parent == '/' && sco.scormtype == '') {
                    organizations.push({
                        identifier: sco.identifier,
                        title: sco.title,
                        sortorder: sco.sortorder
                    });
                }
            });
            return organizations;
        });
    };
        self.getOrganizationToc = function(scormId, organization, attempt, offline, siteId) {
        return self.getScosWithData(scormId, organization, attempt, offline, false, siteId).then(function(scos) {
            var map = {},
                rootScos = [];
            angular.forEach(scos, function(sco, index) {
                sco.children = [];
                map[sco.identifier] = index;
                if (sco.parent !== '/') {
                    if (sco.parent == organization) {
                        rootScos.push(sco);
                    } else {
                        scos[map[sco.parent]].children.push(sco);
                    }
                }
            });
            return rootScos;
        });
    };
        self.getPackageUrl = function(scorm) {
        if (scorm.packageurl) {
            return scorm.packageurl;
        }
        if (scorm.reference) {
            return scorm.reference;
        }
        return '';
    };
        self.getScormUserData = function(scormId, attempt, offline, siteId, scos, ignoreCache) {
        siteId = siteId || $mmSite.getId();
        if (offline) {
            var promise = scos ? $q.when(scos) : self.getScos(scormId, siteId);
            return promise.then(function(scos) {
                return $mmaModScormOffline.getScormUserData(siteId, scormId, attempt, undefined, scos);
            });
        } else {
            return $mmaModScormOnline.getScormUserData(siteId, scormId, attempt, ignoreCache);
        }
    };
        function getScosCacheKey(scormId) {
        return 'mmaModScorm:scos:' + scormId;
    }
        self.getScos = function(scormId, siteId, organization, ignoreCache) {
        siteId = siteId || $mmSite.getId();
        return $mmSitesManager.getSite(siteId).then(function(site) {
            organization = organization || '';
            var params = {
                    scormid: scormId
                },
                preSets = {
                    cacheKey: getScosCacheKey(scormId)
                };
            if (ignoreCache) {
                preSets.getFromCache = 0;
                preSets.emergencyCache = 0;
            }
            return site.read('mod_scorm_get_scorm_scoes', params, preSets).then(function(response) {
                if (response && response.scoes) {
                    var scos = [];
                    if (organization) {
                        angular.forEach(response.scoes, function(sco) {
                            if (sco.organization == organization) {
                                scos.push(sco);
                            }
                        });
                    } else {
                        scos = response.scoes;
                    }
                    return scos;
                }
                return $q.reject();
            });
        });
    };
        self.getScosWithData = function(scormId, organization, attempt, offline, ignoreCache, siteId) {
        return self.getScos(scormId, siteId, organization, ignoreCache).then(function(scos) {
            return self.getScormUserData(scormId, attempt, offline, siteId, scos, ignoreCache).then(function(data) {
                var trackDataBySCO = {};
                angular.forEach(scos, function(sco) {
                    trackDataBySCO[sco.identifier] = data[sco.id].userdata;
                });
                angular.forEach(scos, function(sco) {
                    var scodata = data[sco.id].userdata;
                    if (!scodata) {
                        return;
                    }
                    sco.isvisible = typeof scodata.isvisible != 'undefined' ?
                                            scodata.isvisible && scodata.isvisible !== 'false' : true;
                    sco.prereq = typeof scodata.prerequisites == 'undefined' ||
                                            self.evalPrerequisites(scodata.prerequisites, trackDataBySCO);
                    sco.status = (typeof scodata.status == 'undefined' || scodata.status === '') ?
                                            'notattempted' : scodata.status;
                    sco.exitvar = typeof scodata.exitvar == 'undefined' ? 'cmi.core.exit' : scodata.exitvar;
                    sco.exitvalue = scodata[sco.exitvar];
                });
                return scos;
            });
        });
    };
        self.getScoSrc = function(scorm, sco, siteId) {
        if (sco.launch.match(/http(s)?:\/\//)) {
            return $q.when($sce.trustAsResourceUrl(sco.launch));
        }
        siteId = siteId || $mmSite.getId();
        return $mmFilepool.getPackageDirUrlByUrl(siteId, scorm.moduleurl).then(function(dirPath) {
            return $sce.trustAsResourceUrl($mmFS.concatenatePaths(dirPath, sco.launch));
        });
    };
        self.getScormFolder = function(moduleUrl, siteId) {
        siteId = siteId || $mmSite.getId();
        return $mmFilepool.getPackageDirPathByUrl(siteId, moduleUrl);
    };
        self.getScormFileList = function(scorm) {
        var files = [];
        if (self.isScormSupported(scorm) === true && !scorm.warningmessage) {
            files.push({
                fileurl: self.getPackageUrl(scorm),
                filepath: '/',
                filename: scorm.reference,
                filesize: scorm.packagesize,
                type: 'file',
                timemodified: 0
            });
        }
        return files;
    };
        self.getScoStatusIcon = function(sco, incomplete) {
        var imagename = '',
            descname = '',
            status;
        if (sco.scormtype == 'sco') {
            status = sco.status;
            if (statuses.indexOf(status) < 0) {
                status = 'notattempted';
            }
            if (!incomplete) {
                incomplete = self.isStatusIncomplete(status);
            }
            if (incomplete && sco.exitvalue == 'suspend') {
                imagename = 'suspend';
                descname = 'suspended';
            } else {
                imagename = sco.status;
                descname = sco.status;
            }
        } else {
            imagename = 'asset';
            descname = (!sco.status || sco.status == 'notattempted') ? 'asset' : 'assetlaunched';
        }
        return {
            url: 'addons/mod_scorm/img/' + imagename + '.gif',
            description: $translate.instant('mma.mod_scorm.' + descname)
        };
    };
        function getScormDataCacheKey(courseId) {
        return 'mmaModScorm:scorm:' + courseId;
    }
        function getScorm(siteId, courseId, key, value, moduleUrl) {
        return $mmSitesManager.getSite(siteId).then(function(site) {
            var params = {
                    courseids: [courseId]
                },
                preSets = {
                    cacheKey: getScormDataCacheKey(courseId)
                };
            return site.read('mod_scorm_get_scorms_by_courses', params, preSets).then(function(response) {
                if (response && response.scorms) {
                    var currentScorm;
                    angular.forEach(response.scorms, function(scorm) {
                        if (!currentScorm && scorm[key] == value) {
                            currentScorm = scorm;
                        }
                    });
                    if (currentScorm) {
                        if (typeof currentScorm.timeopen == 'undefined') {
                            angular.forEach(response.warnings, function(warning) {
                                if (warning.itemid === currentScorm.id) {
                                    currentScorm.warningmessage = warning.message;
                                }
                            });
                        }
                        currentScorm.moduleurl = moduleUrl;
                        return currentScorm;
                    }
                }
                return $q.reject();
            });
        });
    }
        self.getScorm = function(courseId, cmid, moduleUrl, siteId) {
        siteId = siteId || $mmSite.getId();
        return getScorm(siteId, courseId, 'coursemodule', cmid, moduleUrl);
    };
        self.getScormById = function(courseId, id, moduleUrl, siteId) {
        siteId = siteId || $mmSite.getId();
        return getScorm(siteId, courseId, 'id', id, moduleUrl);
    };
        self.getScormGradeMethod = function(scorm) {
        if (scorm.maxattempt == 1) {
            switch (parseInt(scorm.grademethod, 10)) {
                case self.GRADEHIGHEST:
                    return $translate.instant('mma.mod_scorm.gradehighest');
                case self.GRADEAVERAGE:
                    return $translate.instant('mma.mod_scorm.gradeaverage');
                case self.GRADESUM:
                    return $translate.instant('mma.mod_scorm.gradesum');
                case self.GRADESCOES:
                    return $translate.instant('mma.mod_scorm.gradescoes');
            }
        } else {
            switch (parseInt(scorm.whatgrade, 10)) {
                case self.HIGHESTATTEMPT:
                    return $translate.instant('mma.mod_scorm.highestattempt');
                case self.AVERAGEATTEMPT:
                    return $translate.instant('mma.mod_scorm.averageattempt');
                case self.FIRSTATTEMPT:
                    return $translate.instant('mma.mod_scorm.firstattempt');
                case self.LASTATTEMPT:
                    return $translate.instant('mma.mod_scorm.lastattempt');
            }
        }
    };
        self.invalidateAllScormData = function(scormId, siteId, userId) {
        siteId = siteId || $mmSite.getId();
        var promises = [];
        promises.push($mmaModScormOnline.invalidateAttemptCount(siteId, scormId, userId));
        promises.push(self.invalidateScos(scormId, siteId));
        promises.push($mmaModScormOnline.invalidateScormUserData(siteId, scormId));
        return $q.all(promises);
    };
        self.invalidateContent = function(moduleId, siteId) {
        siteId = siteId || $mmSite.getId();
        return $mmFilepool.invalidateFilesByComponent(siteId, mmaModScormComponent, moduleId);
    };
        self.invalidateScos = function(scormId, siteId) {
        siteId = siteId || $mmSite.getId();
        return $mmSitesManager.getSite(siteId).then(function(site) {
            return site.invalidateWsCacheForKey(getScosCacheKey(scormId));
        });
    };
        self.invalidateScormData = function(courseId, siteId) {
        siteId = siteId || $mmSite.getId();
        return $mmSitesManager.getSite(siteId).then(function(site) {
            return site.invalidateWsCacheForKey(getScormDataCacheKey(courseId));
        });
    };
        self.isAttemptIncomplete = function(scormId, attempt, offline, ignoreCache, siteId) {
        return self.getScosWithData(scormId, undefined, attempt, offline, ignoreCache, siteId).then(function(scos) {
            var incomplete = false;
            angular.forEach(scos, function(sco) {
                if (sco.isvisible && sco.launch) {
                    if (self.isStatusIncomplete(sco.status)) {
                        incomplete = true;
                    }
                }
            });
            return incomplete;
        });
    };
        self.isPluginEnabled = function(siteId) {
        siteId = siteId || $mmSite.getId();
        return $mmSitesManager.getSite(siteId).then(function(site) {
            return  site.wsAvailable('mod_scorm_get_scorm_attempt_count') &&
                    site.wsAvailable('mod_scorm_get_scorm_sco_tracks') &&
                    site.wsAvailable('mod_scorm_get_scorm_scoes') &&
                    site.wsAvailable('mod_scorm_get_scorm_user_data') &&
                    site.wsAvailable('mod_scorm_get_scorms_by_courses') &&
                    site.wsAvailable('mod_scorm_insert_scorm_tracks');
        });
    };
        self.isScormBeingPlayed = function(scormId, siteId) {
        siteId = siteId || $mmSite.getId();
        return $mmSite.getId() == siteId && $state.current.name == 'site.mod_scorm-player' &&
                        $state.params.scorm && $state.params.scorm.id == scormId;
    };
        self.isScormClosed = function(scorm) {
        var timeNow = $mmUtil.timestamp();
        if (scorm.timeclose > 0 && timeNow > scorm.timeclose) {
            return true;
        }
        return false;
    };
        self.isScormDownloadable = function(scorm) {
        return typeof scorm.protectpackagedownloads != 'undefined' && scorm.protectpackagedownloads === false;
    };
        self.isScormOpen = function(scorm) {
        var timeNow = $mmUtil.timestamp();
        if (scorm.timeopen > 0 && scorm.timeopen > timeNow) {
            return false;
        }
        return true;
    };
        self.isScormSupported = function(scorm) {
        if (!self.isScormValidVersion(scorm)) {
            return 'mma.mod_scorm.errorinvalidversion';
        } else if (!self.isScormDownloadable(scorm)) {
            return 'mma.mod_scorm.errornotdownloadable';
        } else if (!self.isValidPackageUrl(self.getPackageUrl(scorm))) {
            return 'mma.mod_scorm.errorpackagefile';
        }
        return true;
    };
        self.isScormValidVersion = function(scorm) {
        return scorm.version == 'SCORM_1.2';
    };
        self.isStatusIncomplete = function(status) {
        return !status || status == 'notattempted' || status == 'incomplete' || status == 'browsed';
    };
        self.isValidPackageUrl = function(packageUrl) {
        if (!packageUrl) {
            return false;
        }
        if (packageUrl.indexOf('imsmanifest.xml') > -1) {
            return false;
        }
        return true;
    };
        self.logView = function(id, siteId) {
        siteId = siteId || $mmSite.getId();
        if (id) {
            return $mmSitesManager.getSite(siteId).then(function(site) {
                var params = {
                    scormid: id
                };
                return site.write('mod_scorm_view_scorm', params);
            });
        }
        return $q.reject();
    };
        self.logLaunchSco = function(scormId, scoId, siteId) {
        siteId = siteId || $mmSite.getId();
        var params = {
            scormid: scormId,
            scoid: scoId
        };
        return $mmSitesManager.getSite(siteId).then(function(site) {
            return site.write('mod_scorm_launch_sco', params).then(function(response) {
                if (!response || !response.status) {
                    return $q.reject();
                }
            });
        });
    };
        self.prefetch = function(scorm) {
        var promises = [];
        promises.push(self.prefetchPackage(scorm));
        promises.push(self.prefetchData(scorm).catch(function() {
        }));
        return $q.all(promises);
    };
        self.prefetchData = function(scorm, siteId) {
        siteId = siteId || $mmSite.getId();
        var promises = [];
        promises.push($mmaModScormOnline.getAttemptCount(siteId, scorm.id).catch(function() {
            return 0;
        }).then(function(numAttempts) {
            if (numAttempts > 0) {
                var datapromises = [],
                    attempts = [];
                for (var i = 1; i <= numAttempts; i++) {
                    attempts.push(i);
                }
                attempts.forEach(function(attempt) {
                    datapromises.push($mmaModScormOnline.getScormUserData(siteId, scorm.id, attempt).catch(function(err) {
                        if (attempt == numAttempts) {
                            return $q.reject(err);
                        }
                    }));
                });
                return $q.all(datapromises);
            } else {
                return $mmaModScormOnline.getScormUserData(siteId, scorm.id, 0);
            }
        }));
        promises.push(self.getScos(scorm.id, siteId));
        return $q.all(promises);
    };
        self.prefetchPackage = function(scorm) {
        return self._downloadOrPrefetch(scorm, true);
    };
        self.saveTracks = function(scoId, attempt, tracks, offline, scorm, userData, siteId) {
        siteId = siteId || $mmSite.getId();
        if (offline) {
            var promise = userData ? $q.when(userData) : self.getScormUserData(scorm.id, attempt, offline, siteId);
            return promise.then(function(userData) {
                return $mmaModScormOffline.saveTracks(siteId, scorm, scoId, attempt, tracks, userData);
            });
        } else {
            return $mmaModScormOnline.saveTracks(siteId, scorm.id, scoId, attempt, tracks);
        }
    };
        self.saveTracksSync = function(scoId, attempt, tracks, offline, scorm, userData) {
        if (offline) {
            return $mmaModScormOffline.saveTracksSync(scorm, scoId, attempt, tracks, userData);
        } else {
            return $mmaModScormOnline.saveTracksSync(scoId, attempt, tracks);
        }
    };
    return self;
}]);

angular.module('mm.addons.mod_scorm')
.constant('mmaModScormOfflineAttemptsStore', 'mod_scorm_offline_attempts')
.constant('mmaModScormOfflineTracksStore', 'mod_scorm_offline_scos_tracks')
.config(["$mmSitesFactoryProvider", "mmaModScormOfflineAttemptsStore", "mmaModScormOfflineTracksStore", function($mmSitesFactoryProvider, mmaModScormOfflineAttemptsStore, mmaModScormOfflineTracksStore) {
    var stores = [
        {
            name: mmaModScormOfflineAttemptsStore,
            keyPath: ['scormid', 'userid', 'attempt'],
            indexes: [
                {
                    name: 'attempt'
                },
                {
                    name: 'userid'
                },
                {
                    name: 'scormid'
                },
                {
                    name: 'courseid'
                },
                {
                    name: 'timemodified'
                },
                {
                    name: 'scormAndUser',
                    generator: function(obj) {
                        return [obj.scormid, obj.userid];
                    }
                }
            ]
        },
        {
            name: mmaModScormOfflineTracksStore,
            keyPath: ['userid', 'scormid', 'scoid', 'attempt', 'element'],
            indexes: [
                {
                    name: 'userid'
                },
                {
                    name: 'scormid'
                },
                {
                    name: 'scoid'
                },
                {
                    name: 'attempt'
                },
                {
                    name: 'element'
                },
                {
                    name: 'synced'
                },
                {
                    name: 'scormUserAttempt',
                    generator: function(obj) {
                        return [obj.scormid, obj.userid, obj.attempt];
                    }
                },
                {
                    name: 'scormUserAttemptSynced',
                    generator: function(obj) {
                        return [obj.scormid, obj.userid, obj.attempt, obj.synced];
                    }
                }
            ]
        }
    ];
    $mmSitesFactoryProvider.registerStores(stores);
}])
.factory('$mmaModScormOffline', ["$mmSite", "$mmUtil", "$q", "$log", "$mmSitesManager", "mmaModScormOfflineAttemptsStore", "mmaModScormOfflineTracksStore", function($mmSite, $mmUtil, $q, $log, $mmSitesManager, mmaModScormOfflineAttemptsStore,
            mmaModScormOfflineTracksStore) {
    $log = $log.getInstance('$mmaModScormOffline');
    var self = {},
        blockedScorms = {};
        self.changeAttemptNumber = function(siteId, scormId, attempt, newAttempt, userId) {
        return $mmSitesManager.getSite(siteId).then(function(site) {
            $log.debug('Change attempt number from ' + attempt + ' to ' + newAttempt + ' in SCORM ' + scormId);
            userId = userId || site.getUserId();
            var db = site.getDb(),
                newEntry = {
                    scormid: scormId,
                    userid: userId,
                    attempt: newAttempt,
                    timemodified: $mmUtil.timestamp()
                };
            if (!blockedScorms[siteId]) {
                blockedScorms[siteId] = {};
            }
            blockedScorms[siteId][scormId] = true;
            return db.get(mmaModScormOfflineAttemptsStore, [scormId, userId, attempt]).then(function(entry) {
                newEntry.timecreated = entry.timecreated;
                newEntry.courseid = entry.courseid;
                return db.insert(mmaModScormOfflineAttemptsStore, newEntry).then(function() {
                    return self.getScormStoredData(siteId, scormId, attempt, userId).then(function(entries) {
                        var promises = [];
                        angular.forEach(entries, function(entry) {
                            entry.attempt = newAttempt;
                            entry.synced = 0;
                            promises.push(db.insert(mmaModScormOfflineTracksStore, entry));
                        });
                        return $mmUtil.allPromises(promises).then(function() {
                            return self.deleteAttempt(siteId, scormId, attempt).catch(function() {
                                return self.deleteAttempt(siteId, scormId, attempt).catch(function() {});
                            });
                        });
                    }).catch(function() {
                        return self.deleteAttempt(siteId, scormId, newAttempt).then(function() {
                            return $q.reject();
                        });
                    });
                });
            }).finally(function() {
                blockedScorms[siteId][scormId] = false;
            });
        });
    };
        self.clearBlockedScorms = function(siteId) {
        if (siteId) {
            delete blockedScorms[siteId];
        } else {
            blockedScorms = {};
        }
    };
        self.createNewAttempt = function(siteId, scorm, userId, attempt, userData, snapshot) {
        return $mmSitesManager.getSite(siteId).then(function(site) {
            $log.debug('Creating new offline attempt ' + attempt + ' in SCORM ' + scorm.id);
            userId = userId || site.getUserId();
            if (!blockedScorms[siteId]) {
                blockedScorms[siteId] = {};
            }
            blockedScorms[siteId][scorm.id] = true;
            var db = site.getDb(),
                entry = {
                    scormid: scorm.id,
                    userid: userId,
                    attempt: attempt,
                    courseid: scorm.course,
                    timecreated: $mmUtil.timestamp(),
                    timemodified: $mmUtil.timestamp()
                };
            if (snapshot) {
                entry.snapshot = removeDefaultData(snapshot);
            }
            return db.insert(mmaModScormOfflineAttemptsStore, entry).then(function() {
                var promises = [];
                angular.forEach(userData, function(sco) {
                    var tracks = [];
                    angular.forEach(sco.userdata, function(value, element) {
                        tracks.push({element: element, value: value});
                    });
                    promises.push(self.saveTracks(siteId, scorm, sco.scoid, attempt, tracks, userData));
                });
                return $q.all(promises);
            }).finally(function() {
                blockedScorms[siteId][scorm.id] = false;
            });
        });
    };
        self.deleteAttempt = function(siteId, scormId, attempt, userId) {
        return $mmSitesManager.getSite(siteId).then(function(site) {
            $log.debug('Delete offline attempt ' + attempt + ' in SCORM ' + scormId);
            userId = userId || site.getUserId();
            return self.getScormStoredData(siteId, scormId, attempt, userId).then(function(entries) {
                var promises = [],
                    db = site.getDb();
                angular.forEach(entries, function(entry) {
                    var entryId = [entry.userid, entry.scormid, entry.scoid, entry.attempt, entry.element];
                    promises.push(db.remove(mmaModScormOfflineTracksStore, entryId));
                });
                promises.push(db.remove(mmaModScormOfflineAttemptsStore, [scormId, userId, attempt]));
                return $q.all(promises);
            });
        });
    };
        function formatInteractions(scoUserData) {
        var formatted = {};
        formatted.score_raw = '';
        formatted.status = '';
        formatted.total_time = '00:00:00';
        formatted.session_time = '00:00:00';
        angular.forEach(scoUserData, function(value, element) {
            if (element == 'score_raw' || element == 'status' || element == 'total_time' || element == 'session_time') {
                return;
            }
            formatted[element] = value;
            switch (element) {
                case 'cmi.core.lesson_status':
                case 'cmi.completion_status':
                    if (value == 'not attempted') {
                        value = 'notattempted';
                    }
                    formatted.status = value;
                    break;
                case 'cmi.core.score.raw':
                case 'cmi.score.raw':
                    formatted.score_raw = $mmUtil.roundToDecimals(value, 2);
                    break;
                case 'cmi.core.session_time':
                case 'cmi.session_time':
                    formatted.session_time = value;
                    break;
                case 'cmi.core.total_time':
                case 'cmi.total_time':
                    formatted.total_time = value;
                    break;
            }
        });
        return formatted;
    }
        function getLaunchUrlsFromScos(scos) {
        var response = {};
        angular.forEach(scos, function(sco) {
            response[sco.id] = sco.launch;
        });
        return response;
    }
        self.getAllAttempts = function(siteId) {
        siteId = siteId || $mmSite.getId();
        return $mmSitesManager.getSiteDb(siteId).then(function(db) {
            if (!db) {
                return $q.reject();
            }
            return db.getAll(mmaModScormOfflineAttemptsStore);
        });
    };
        self.getAttempts = function(siteId, scormId, userId) {
        return $mmSitesManager.getSite(siteId).then(function(site) {
            userId = userId || site.getUserId();
            var db = site.getDb();
            return db.whereEqual(mmaModScormOfflineAttemptsStore, 'scormAndUser', [scormId, userId]).then(function(attempts) {
                return attempts;
            });
        });
    };
        self.getAttemptSnapshot = function(siteId, scormId, attempt, userId) {
        return $mmSitesManager.getSite(siteId).then(function(site) {
            userId = userId || site.getUserId();
            return site.getDb().get(mmaModScormOfflineAttemptsStore, [scormId, userId, attempt]).catch(function() {
                return {};
            }).then(function(entry) {
                return entry.snapshot;
            });
        });
    };
        self.getAttemptCreationTime = function(siteId, scormId, attempt, userId) {
        return $mmSitesManager.getSite(siteId).then(function(site) {
            userId = userId || site.getUserId();
            return site.getDb().get(mmaModScormOfflineAttemptsStore, [scormId, userId, attempt]).catch(function() {
                return {};
            }).then(function(entry) {
                return entry.timecreated;
            });
        });
    };
        self.getScormStoredData = function(siteId, scormId, attempt, userId, excludeSynced, excludeNotSynced) {
        return $mmSitesManager.getSite(siteId).then(function(site) {
            userId = userId || site.getUserId();
            var where;
            if (excludeSynced && excludeNotSynced) {
                return $q.when([]);
            } else if (excludeSynced || excludeNotSynced) {
                where = ['scormUserAttemptSynced', '=', [scormId, userId, attempt, excludeNotSynced ? 1 : 0]];
            } else {
                where = ['scormUserAttempt', '=', [scormId, userId, attempt]];
            }
            return site.getDb().query(mmaModScormOfflineTracksStore, where);
        });
    };
        self.getScormUserData = function(siteId, scormId, attempt, userId, scos) {
        return $mmSitesManager.getSite(siteId).then(function(site) {
            userId = userId || site.getUserId();
            return self.getScormStoredData(siteId, scormId, attempt, userId).then(function(entries) {
                var response = {},
                    launchUrls = getLaunchUrlsFromScos(scos),
                    userId = site.getUserId(),
                    username = site.getInfo().username,
                    fullName = site.getInfo().fullname;
                angular.forEach(entries, function(entry) {
                    var scoid = entry.scoid;
                    if (!response[scoid]) {
                        response[scoid] = {
                            scoid: scoid,
                            userdata: {
                                userid: userId,
                                scoid: scoid,
                                timemodified: 0
                            }
                        };
                    }
                    response[scoid].userdata[entry.element] = entry.value;
                    if (entry.timemodified > response[scoid].userdata.timemodified) {
                        response[scoid].userdata.timemodified = entry.timemodified;
                    }
                });
                angular.forEach(response, function(sco) {
                    sco.userdata = formatInteractions(sco.userdata);
                });
                angular.forEach(scos, function(sco) {
                    if (!response[sco.id]) {
                        response[sco.id] = {
                            scoid: sco.id,
                            userdata: {
                                status: '',
                                score_raw: ''
                            }
                        };
                    }
                });
                angular.forEach(response, function(sco) {
                    sco.defaultdata = {};
                    sco.defaultdata['cmi.core.student_id'] = username;
                    sco.defaultdata['cmi.core.student_name'] = fullName;
                    sco.defaultdata['cmi.core.lesson_mode'] = 'normal';
                    sco.defaultdata['cmi.core.credit'] = 'credit';
                    if (sco.userdata.status === '') {
                        sco.defaultdata['cmi.core.entry'] = 'ab-initio';
                    } else if (sco.userdata['cmi.core.exit'] === 'suspend') {
                        sco.defaultdata['cmi.core.entry'] = 'resume';
                    } else {
                        sco.defaultdata['cmi.core.entry'] = '';
                    }
                    sco.defaultdata['cmi.student_data.mastery_score'] = scormIsset(sco.userdata, 'masteryscore');
                    sco.defaultdata['cmi.student_data.max_time_allowed'] = scormIsset(sco.userdata, 'max_time_allowed');
                    sco.defaultdata['cmi.student_data.time_limit_action'] = scormIsset(sco.userdata, 'time_limit_action');
                    sco.defaultdata['cmi.core.total_time'] = scormIsset(sco.userdata, 'cmi.core.total_time', '00:00:00');
                    sco.defaultdata['cmi.launch_data'] = launchUrls[sco.scoid];
                    sco.defaultdata['cmi.core.lesson_location'] = scormIsset(sco.userdata, 'cmi.core.lesson_location');
                    sco.defaultdata['cmi.core.lesson_status'] = scormIsset(sco.userdata, 'cmi.core.lesson_status');
                    sco.defaultdata['cmi.core.score.raw'] = scormIsset(sco.userdata, 'cmi.core.score.raw');
                    sco.defaultdata['cmi.core.score.max'] = scormIsset(sco.userdata, 'cmi.core.score.max');
                    sco.defaultdata['cmi.core.score.min'] = scormIsset(sco.userdata, 'cmi.core.score.min');
                    sco.defaultdata['cmi.core.exit'] = scormIsset(sco.userdata, 'cmi.core.exit');
                    sco.defaultdata['cmi.suspend_data'] = scormIsset(sco.userdata, 'cmi.suspend_data');
                    sco.defaultdata['cmi.comments'] = scormIsset(sco.userdata, 'cmi.comments');
                    sco.defaultdata['cmi.student_preference.language'] = scormIsset(sco.userdata, 'cmi.student_preference.language');
                    sco.defaultdata['cmi.student_preference.audio'] = scormIsset(sco.userdata, 'cmi.student_preference.audio', '0');
                    sco.defaultdata['cmi.student_preference.speed'] = scormIsset(sco.userdata, 'cmi.student_preference.speed', '0');
                    sco.defaultdata['cmi.student_preference.text'] = scormIsset(sco.userdata, 'cmi.student_preference.text', '0');
                    sco.userdata.student_id = username;
                    sco.userdata.student_name = fullName;
                    sco.userdata.mode = sco.defaultdata['cmi.core.lesson_mode'];
                    sco.userdata.credit = sco.defaultdata['cmi.core.credit'];
                    sco.userdata.entry = sco.defaultdata['cmi.core.entry'];
                });
                return response;
            });
        });
    };
        function insertTrackToDB(db, userId, scormId, scoId, attempt, element, value, synchronous) {
        var entry = {
            userid: userId,
            scormid: scormId,
            scoid: scoId,
            attempt: attempt,
            element: element,
            value: value,
            timemodified: $mmUtil.timestamp(),
            synced: 0
        };
        if (synchronous) {
            return db.insertSync(mmaModScormOfflineTracksStore, entry);
        } else {
            return db.insert(mmaModScormOfflineTracksStore, entry);
        }
    }
        function insertTrack(siteId, userId, scormId, scoId, attempt, element, value, forceCompleted, scoData) {
        return $mmSitesManager.getSite(siteId).then(function(site) {
            userId = userId || site.getUserId();
            scoData = scoData || {};
            var promises = [],
                lessonStatusInserted = false,
                scoUserData = scoData.userdata || {},
                db = site.getDb();
            if (forceCompleted) {
                if (element == 'cmi.core.lesson_status' && value == 'incomplete') {
                    if (scoUserData['cmi.core.score.raw']) {
                        value = 'completed';
                    }
                }
                if (element == 'cmi.core.score.raw') {
                    if (scoUserData['cmi.core.lesson_status'] == 'incomplete') {
                        lessonStatusInserted = true;
                        promises.push(insertTrackToDB(db, userId, scormId, scoId, attempt, 'cmi.core.lesson_status', 'completed'));
                    }
                }
            }
            return $q.all(promises).then(function() {
                if (!scoUserData[element] || element != 'x.start.time') {
                    return insertTrackToDB(db, userId, scormId, scoId, attempt, element, value).catch(function() {
                        if (lessonStatusInserted) {
                            return insertTrackToDB(db, userId, scormId, scoId, attempt, 'cmi.core.lesson_status', 'incomplete')
                                    .then(function() {
                                return $q.reject();
                            });
                        }
                        return $q.reject();
                    });
                }
            });
        });
    }
        function insertTrackSync(userId, scormId, scoId, attempt, element, value, forceCompleted, scoData) {
        userId = userId || $mmSite.getUserId();
        scoData = scoData || {};
        if (!$mmSite.isLoggedIn()) {
            return false;
        }
        var lessonStatusInserted = false,
            scoUserData = scoData.userdata || {},
            db = $mmSite.getDb();
        if (forceCompleted) {
            if (element == 'cmi.core.lesson_status' && value == 'incomplete') {
                if (scoUserData['cmi.core.score.raw']) {
                    value = 'completed';
                }
            }
            if (element == 'cmi.core.score.raw') {
                if (scoUserData['cmi.core.lesson_status'] == 'incomplete') {
                    lessonStatusInserted = true;
                    if (!insertTrackToDB(db, userId, scormId, scoId, attempt, 'cmi.core.lesson_status', 'completed', true)) {
                        return false;
                    }
                }
            }
        }
        if (!scoUserData[element] || element != 'x.start.time') {
            if (!insertTrackToDB(db, userId, scormId, scoId, attempt, element, value, true)) {
                if (lessonStatusInserted) {
                    insertTrackToDB(db, userId, scormId, scoId, attempt, 'cmi.core.lesson_status', 'incomplete', true);
                }
                return false;
            }
            return true;
        }
    }
        self.isScormBlocked = function(siteId, scormId) {
        if (!blockedScorms[siteId]) {
            return false;
        }
        return !!blockedScorms[siteId][scormId];
    };
        self.markAsSynced = function(siteId, scormId, attempt, userId, scoId) {
        return $mmSitesManager.getSite(siteId).then(function(site) {
            $log.debug('Mark SCO ' + scoId + ' as synced for attempt ' + attempt + ' in SCORM ' + scormId);
            userId = userId || site.getUserId();
            return self.getScormStoredData(siteId, scormId, attempt, userId, true).then(function(entries) {
                var promises = [],
                    db = site.getDb();
                angular.forEach(entries, function(entry) {
                    if (entry.scoid == scoId) {
                        entry.synced = 1;
                        promises.push(db.insert(mmaModScormOfflineTracksStore, entry));
                    }
                });
                return $q.all(promises);
            });
        });
    };
        function removeDefaultData(userData) {
        var result = angular.copy(userData);
        angular.forEach(result, function(sco) {
            delete sco.defaultdata;
        });
        return result;
    }
        self.saveTracks = function(siteId, scorm, scoId, attempt, tracks, userData) {
        return $mmSitesManager.getSite(siteId).then(function(site) {
            var userId = site.getUserId(),
                initialBlocked;
            if (!blockedScorms[siteId]) {
                blockedScorms[siteId] = {};
            }
            initialBlocked = !!blockedScorms[siteId][scorm.id];
            blockedScorms[siteId][scorm.id] = true;
            var promises = [];
            angular.forEach(tracks, function(track) {
                promises.push(insertTrack(siteId, userId, scorm.id, scoId, attempt,
                                            track.element, track.value, scorm.forcecompleted, userData[scoId]));
            });
            return $q.all(promises).finally(function() {
                if (!initialBlocked) {
                    blockedScorms[siteId][scorm.id] = false;
                }
            });
        });
    };
        self.saveTracksSync = function(scorm, scoId, attempt, tracks, userData) {
        var userId = $mmSite.getUserId(),
            success = true;
        angular.forEach(tracks, function(track) {
            if (!insertTrackSync(userId, scorm.id, scoId, attempt, track.element, track.value,
                                    scorm.forcecompleted, userData[scoId])) {
                success = false;
            }
        });
        return success;
    };
        function scormIsset(userdata, param, ifempty) {
        if (typeof ifempty == 'undefined') {
            ifempty = '';
        }
        if (typeof userdata[param] != 'undefined') {
            return userdata[param];
        }
        return ifempty;
    }
        self.setAttemptSnapshot = function(siteId, scormId, attempt, userData, userId) {
        return $mmSitesManager.getSite(siteId).then(function(site) {
            $log.debug('Set snapshot for attempt ' + attempt + ' in SCORM ' + scormId);
            userId = userId || site.getUserId();
            return site.getDb().get(mmaModScormOfflineAttemptsStore, [scormId, userId, attempt]).then(function(entry) {
                entry.snapshot = removeDefaultData(userData);
                entry.timemodified = $mmUtil.timestamp();
                return site.getDb().insert(mmaModScormOfflineAttemptsStore, entry);
            });
        });
    };
    return self;
}]);

angular.module('mm.addons.mod_scorm')
.factory('$mmaModScormOnline', ["$mmSitesManager", "$mmSite", "$q", "$mmWS", "$log", "mmCoreWSPrefix", function($mmSitesManager, $mmSite, $q, $mmWS, $log, mmCoreWSPrefix) {
    $log = $log.getInstance('$mmaModScormOnline');
    var self = {},
        blockedScorms = {};
        self.clearBlockedScorms = function(siteId) {
        if (siteId) {
            delete blockedScorms[siteId];
        } else {
            blockedScorms = {};
        }
    };
        function getAttemptCountCacheKey(scormId, userId) {
        userId = userId || $mmSite.getUserId();
        return 'mmaModScorm:attemptcount:' + scormId + ':' + userId;
    }
        self.getAttemptCount = function(siteId, scormId, userId, ignoreMissing, ignoreCache) {
        return $mmSitesManager.getSite(siteId).then(function(site) {
            userId = userId || site.getUserId();
            var params = {
                    scormid: scormId,
                    userid: userId,
                    ignoremissingcompletion: ignoreMissing ? 1 : 0
                },
                preSets = {
                    cacheKey: getAttemptCountCacheKey(scormId, userId)
                };
            if (ignoreCache) {
                preSets.getFromCache = 0;
                preSets.emergencyCache = 0;
            }
            return site.read('mod_scorm_get_scorm_attempt_count', params, preSets).then(function(response) {
                if (response && typeof response.attemptscount != 'undefined') {
                    return response.attemptscount;
                }
                return $q.reject();
            });
        });
    };
        function getScormUserDataCacheKey(scormId, attempt) {
        return getScormUserDataCommonCacheKey(scormId) + ':' + attempt;
    }
        function getScormUserDataCommonCacheKey(scormId) {
        return 'mmaModScorm:userdata:' + scormId;
    }
        self.getScormUserData = function(siteId, scormId, attempt, ignoreCache) {
        return $mmSitesManager.getSite(siteId).then(function(site) {
            var params = {
                    scormid: scormId,
                    attempt: attempt
                },
                preSets = {
                    cacheKey: getScormUserDataCacheKey(scormId, attempt)
                };
            if (ignoreCache) {
                preSets.getFromCache = 0;
                preSets.emergencyCache = 0;
            }
            return site.read('mod_scorm_get_scorm_user_data', params, preSets).then(function(response) {
                if (response && response.data) {
                    var data = {};
                    angular.forEach(response.data, function(sco) {
                        var formattedDefaultData = {},
                            formattedUserData = {};
                        angular.forEach(sco.defaultdata, function(entry) {
                            formattedDefaultData[entry.element] = entry.value;
                        });
                        angular.forEach(sco.userdata, function(entry) {
                            formattedUserData[entry.element] = entry.value;
                        });
                        sco.defaultdata = formattedDefaultData;
                        sco.userdata = formattedUserData;
                        data[sco.scoid] = sco;
                    });
                    return data;
                }
                return $q.reject();
            });
        });
    };
        self.invalidateAttemptCount = function(siteId, scormId, userId) {
        return $mmSitesManager.getSite(siteId).then(function(site) {
            userId = userId || site.getUserId();
            return site.invalidateWsCacheForKey(getAttemptCountCacheKey(scormId, userId));
        });
    };
        self.invalidateScormUserData = function(siteId, scormId) {
        return $mmSitesManager.getSite(siteId).then(function(site) {
            return site.invalidateWsCacheForKeyStartingWith(getScormUserDataCommonCacheKey(scormId));
        });
    };
        self.isScormBlocked = function(siteId, scormId) {
        if (!blockedScorms[siteId]) {
            return false;
        }
        return !!blockedScorms[siteId][scormId];
    };
        self.saveTracks = function(siteId, scormId, scoId, attempt, tracks) {
        return $mmSitesManager.getSite(siteId).then(function(site) {
            var params = {
                scoid: scoId,
                attempt: attempt,
                tracks: tracks
            };
            if (!tracks || !tracks.length) {
                return $q.when();
            }
            if (!blockedScorms[siteId]) {
                blockedScorms[siteId] = {};
            }
            blockedScorms[siteId][scormId] = true;
            return site.write('mod_scorm_insert_scorm_tracks', params).then(function(response) {
                if (response && response.trackids) {
                    return response.trackids;
                }
                return $q.reject();
            }).finally(function() {
                blockedScorms[siteId][scormId] = false;
            });
        });
    };
        self.saveTracksSync = function(scoId, attempt, tracks) {
        var params = {
                scoid: scoId,
                attempt: attempt,
                tracks: tracks
            },
            preSets = {
                siteurl: $mmSite.getURL(),
                wstoken: $mmSite.getToken()
            },
            wsFunction = $mmSite.getCompatibleFunction('mod_scorm_insert_scorm_tracks'),
            response;
        if (!tracks || !tracks.length) {
            return true;
        }
        if (!$mmSite.wsAvailable(wsFunction, false)) {
            if ($mmSite.wsAvailable(mmCoreWSPrefix + wsFunction, false)) {
                wsFunction = mmCoreWSPrefix + wsFunction;
            } else {
                $log.error("WS function '" + wsFunction + "' is not available, even in compatibility mode.");
                return false;
            }
        }
        response = $mmWS.syncCall(wsFunction, params, preSets);
        if (response && !response.error && response.trackids) {
            return true;
        }
        return false;
    };
    return self;
}]);

angular.module('mm.addons.mod_scorm')
.constant('mmaModScormSynchronizationStore', 'mod_scorm_sync')
.config(["$mmSitesFactoryProvider", "mmaModScormSynchronizationStore", function($mmSitesFactoryProvider, mmaModScormSynchronizationStore) {
    var stores = [
        {
            name: mmaModScormSynchronizationStore,
            keyPath: 'scormid',
            indexes: []
        }
    ];
    $mmSitesFactoryProvider.registerStores(stores);
}])
.factory('$mmaModScormSync', ["$mmaModScorm", "$mmSite", "$q", "$translate", "$mmaModScormOnline", "$mmaModScormOffline", "$mmUtil", "$log", "mmaModScormSynchronizationStore", "mmaModScormSyncTime", "$mmConfig", "mmCoreSettingsSyncOnlyOnWifi", "$mmApp", "$mmEvents", "mmaModScormEventAutomSynced", "$mmSitesManager", function($mmaModScorm, $mmSite, $q, $translate, $mmaModScormOnline, $mmaModScormOffline, $mmUtil,
            $log, mmaModScormSynchronizationStore, mmaModScormSyncTime, $mmConfig, mmCoreSettingsSyncOnlyOnWifi, $mmApp,
            $mmEvents, mmaModScormEventAutomSynced, $mmSitesManager) {
    $log = $log.getInstance('$mmaModScormSync');
    var self = {},
        syncPromises = {};
        self.getScormSyncTime = function(scormId, siteId) {
        siteId = siteId || $mmSite.getId();
        return $mmSitesManager.getSiteDb(siteId).then(function(db) {
            return db.get(mmaModScormSynchronizationStore, scormId).then(function(entry) {
                return entry.time;
            }).catch(function() {
                return 0;
            });
        });
    };
        self.setScormSyncTime = function(scormId, siteId, time) {
        siteId = siteId || $mmSite.getId();
        return $mmSitesManager.getSiteDb(siteId).then(function(db) {
            if (typeof time == 'undefined') {
                time = new Date().getTime();
            }
            return db.insert(mmaModScormSynchronizationStore, {scormid: scormId, time: time});
        });
    };
        self.syncAllScorms = function(siteId) {
        if (!$mmApp.isOnline()) {
            $log.debug('Cannot sync all SCORMs because device is offline.');
            return $q.reject();
        }
        return $mmConfig.get(mmCoreSettingsSyncOnlyOnWifi, true).then(function(syncOnlyOnWifi) {
            if (syncOnlyOnWifi && $mmApp.isNetworkAccessLimited()) {
                $log.debug('Cannot sync all SCORMs because device isn\'t using a WiFi network.');
                return $q.reject();
            }
            var promise;
            if (!siteId) {
                $log.debug('Try to sync SCORMs in all sites.');
                promise = $mmSitesManager.getSitesIds();
            } else {
                $log.debug('Try to sync SCORMs in site ' + siteId);
                promise = $q.when([siteId]);
            }
            return promise.then(function(siteIds) {
                var sitePromises = [];
                angular.forEach(siteIds, function(siteId) {
                    sitePromises.push($mmaModScormOffline.getAllAttempts(siteId).then(function(attempts) {
                        var scorms = [],
                            ids = [],
                            promises = [];
                        angular.forEach(attempts, function(attempt) {
                            if (ids.indexOf(attempt.scormid) == -1) {
                                ids.push(attempt.scormid);
                                scorms.push({
                                    id: attempt.scormid,
                                    courseid: attempt.courseid
                                });
                            }
                        });
                        angular.forEach(scorms, function(scorm) {
                            if (!$mmaModScorm.isScormBeingPlayed(scorm.id, siteId)) {
                                promises.push($mmaModScorm.getScormById(scorm.courseid, scorm.id, '', siteId).then(function(scorm) {
                                    return self.syncScormIfNeeded(scorm, siteId).then(function(warnings) {
                                        if (typeof warnings != 'undefined') {
                                            $mmEvents.trigger(mmaModScormEventAutomSynced, {
                                                siteid: siteId,
                                                scormid: scorm.id
                                            });
                                        }
                                    });
                                }));
                            }
                        });
                        return $q.all(promises);
                    }));
                });
                return $q.all(sitePromises);
            });
        });
    };
        self._syncAttempt = function(scormId, attempt, siteId) {
        siteId = siteId || $mmSite.getId();
        $log.debug('Try to sync attempt ' + attempt + ' in SCORM ' + scormId + ' and site ' + siteId);
        return $mmaModScormOffline.getScormStoredData(siteId, scormId, attempt, undefined, true).then(function(entries) {
            var scos = {},
                promises = [],
                somethingSynced = false;
            angular.forEach(entries, function(entry) {
                if (entry.element.indexOf('.') > -1) {
                    if (!scos[entry.scoid]) {
                        scos[entry.scoid] = [];
                    }
                    scos[entry.scoid].push({
                        element: entry.element,
                        value: entry.value
                    });
                }
            });
            angular.forEach(scos, function(tracks, scoId) {
                promises.push($mmaModScormOnline.saveTracks(siteId, scormId, scoId, attempt, tracks).then(function() {
                    return $mmaModScormOffline.markAsSynced(siteId, scormId, attempt, undefined, scoId).catch(function() {
                    }).then(function() {
                        somethingSynced = true;
                    });
                }));
            });
            return $mmUtil.allPromises(promises).then(function() {
                return $mmaModScormOffline.deleteAttempt(siteId, scormId, attempt).catch(function() {
                    return $mmaModScormOffline.deleteAttempt(siteId, scormId, attempt).catch(function() {
                        $log.error('After sync: error deleting attempt ' + attempt + ' in SCORM ' + scormId);
                    });
                });
            }).catch(function() {
                if (somethingSynced) {
                    $log.error('Error synchronizing some SCOs for attempt ' + attempt + ' in SCORM ' + scormId + '. Saving snapshot.');
                    return saveSyncSnapshot(scormId, attempt, siteId).then(function() {
                        return $q.reject();
                    });
                } else {
                    $log.error('Error synchronizing attempt ' + attempt + ' in SCORM ' + scormId);
                }
                return $q.reject();
            });
        });
    };
        function saveSyncSnapshot(scormId, attempt, siteId) {
        return $mmaModScorm.getScormUserData(scormId, attempt, false, siteId, undefined, true).then(function(data) {
            return $mmaModScormOffline.setAttemptSnapshot(siteId, scormId, attempt, data);
        }, function() {
            return $mmaModScorm.getScormUserData(scormId, attempt, false, siteId).catch(function() {
                return {};
            }).then(function(data) {
                return $mmaModScormOffline.getScormStoredData(siteId, scormId, attempt, undefined, false, true)
                            .then(function(synced) {
                    angular.forEach(synced, function(entry) {
                        if (!data[entry.scoid]) {
                            data[entry.scoid] = {
                                scoid: entry.scoid,
                                userdata: {}
                            };
                        }
                        data[entry.scoid].userdata[entry.element] = entry.value;
                    });
                    return $mmaModScormOffline.setAttemptSnapshot(siteId, scormId, attempt, data);
                });
            });
        });
    }
        self.syncScormIfNeeded = function(scorm, siteId) {
        siteId = siteId || $mmSite.getId();
        return self.getScormSyncTime(scorm.id, siteId).then(function(time) {
            if (new Date().getTime() - mmaModScormSyncTime >= time) {
                return self.syncScorm(scorm, siteId);
            }
        });
    };
        self.syncScorm = function(scorm, siteId) {
        siteId = siteId || $mmSite.getId();
        var warnings = [],
            syncPromise,
            deleted = false;
        if (syncPromises[siteId] && syncPromises[siteId][scorm.id]) {
            return syncPromises[siteId][scorm.id];
        } else if (!syncPromises[siteId]) {
            syncPromises[siteId] = {};
        }
        if ($mmaModScormOnline.isScormBlocked(siteId, scorm.id) || $mmaModScormOffline.isScormBlocked(siteId, scorm.id)) {
            $log.debug('Cannot sync SCORM ' + scorm.id + ' because it is blocked.');
            return $q.reject();
        }
        $log.debug('Try to sync SCORM ' + scorm.id + ' in site ' + siteId);
        function finishSync() {
            return $mmaModScorm.invalidateAllScormData(scorm.id, siteId).catch(function() {}).then(function() {
                return $mmaModScorm.prefetchData(scorm, siteId).then(function() {
                    return self.setScormSyncTime(scorm.id, siteId).catch(function() {
                    }).then(function() {
                        return warnings;
                    });
                });
            });
        }
        syncPromise = $mmaModScorm.getAttemptCount(scorm.id, siteId, undefined, false, true).then(function(attemptsData) {
            if (!attemptsData.offline || !attemptsData.offline.length) {
                return finishSync();
            }
            var collisions = [],
                lastOnline = 0,
                promise;
            angular.forEach(attemptsData.online, function(attempt) {
                lastOnline = Math.max(lastOnline, attempt);
                if (attemptsData.offline.indexOf(attempt) > -1) {
                    collisions.push(attempt);
                }
            });
            promise = lastOnline > 0 ? $mmaModScorm.isAttemptIncomplete(scorm.id, lastOnline, false, true, siteId) : $q.when(false);
            return promise.then(function(incomplete) {
                if (!collisions.length && !incomplete) {
                    var promises = [];
                    angular.forEach(attemptsData.offline, function(attempt) {
                        if (scorm.maxattempt == 0 || attempt <= scorm.maxattempt) {
                            promises.push(self._syncAttempt(scorm.id, attempt, siteId));
                        }
                    });
                    return $q.all(promises).then(function() {
                        return finishSync();
                    });
                } else if (collisions.length) {
                    return treatCollisions(scorm.id, siteId, collisions, lastOnline, attemptsData.offline).then(function(warns) {
                        warnings = warnings.concat(warns);
                        return $mmaModScormOffline.getAttempts(siteId, scorm.id).then(function(entries) {
                            var promises = [],
                                cannotSyncSome = false;
                            entries = entries.map(function(entry) {
                                return entry.attempt;
                            });
                            if (incomplete && entries.indexOf(lastOnline) > -1) {
                                incomplete = false;
                            }
                            angular.forEach(entries, function(attempt) {
                                if (!incomplete || attempt <= lastOnline) {
                                    if (scorm.maxattempt == 0 || attempt <= scorm.maxattempt) {
                                        promises.push(self._syncAttempt(scorm.id, attempt, siteId));
                                    }
                                } else {
                                    cannotSyncSome = true;
                                }
                            });
                            return $q.all(promises).then(function() {
                                if (cannotSyncSome) {
                                    warnings.push($translate.instant('mma.mod_scorm.warningsynconlineincomplete'));
                                }
                                return finishSync();
                            });
                        });
                    });
                } else {
                    warnings.push($translate.instant('mma.mod_scorm.warningsynconlineincomplete'));
                    return finishSync();
                }
            });
        }).finally(function() {
            deleted = true;
            delete syncPromises[siteId][scorm.id];
        });
        if (!deleted) {
            syncPromises[siteId][scorm.id] = syncPromise;
        }
        return syncPromise;
    };
        function treatCollisions(scormId, siteId, collisions, lastOnline, offlineAttempts) {
        var warnings = [],
            promises = [],
            newAttemptsSameOrder = [],
            newAttemptsAtEnd = {},
            lastCollision = Math.max.apply(Math, collisions),
            lastOffline = Math.max.apply(Math, offlineAttempts),
            lastOfflineIncomplete,
            lastOfflineCreated;
        function getLastOfflineAttemptData() {
            return $mmaModScorm.isAttemptIncomplete(scormId, lastOffline, true, false, siteId).then(function(incomplete) {
                lastOfflineIncomplete = incomplete;
                return $mmaModScormOffline.getAttemptCreationTime(siteId, scormId, lastOffline).then(function(time) {
                    lastOfflineCreated = time;
                });
            });
        }
        function addToNewOrDelete(attempt) {
            if (attempt == lastOffline) {
                newAttemptsSameOrder.push(attempt);
                return $q.when();
            }
            return $mmaModScormOffline.getAttemptCreationTime(siteId, scormId, attempt).then(function(time) {
                if (time > lastOfflineCreated) {
                    if (lastOfflineIncomplete) {
                        $log.debug('Try to delete attempt ' + attempt + ' because it cannot be created as a new attempt.');
                        return $mmaModScormOffline.deleteAttempt(siteId, scormId, attempt).then(function() {
                            warnings.push($translate.instant('mma.mod_scorm.warningofflinedatadeleted', {number: attempt}));
                        }).catch(function() {
                        });
                    } else {
                        newAttemptsAtEnd[time] = attempt;
                    }
                } else {
                    newAttemptsSameOrder.push(attempt);
                }
            });
        }
        return getLastOfflineAttemptData().then(function() {
            collisions.forEach(function(attempt) {
                var getDataFn = $mmaModScormOffline.getScormStoredData,
                    promise = getDataFn(siteId, scormId, attempt, undefined, false, true).then(function(synced) {
                    if (synced && synced.length) {
                        return getDataFn(siteId, scormId, attempt, undefined, true).then(function(entries) {
                            var hasDataToSend = false;
                            angular.forEach(entries, function(entry) {
                                if (entry.element.indexOf('.') > -1) {
                                    hasDataToSend = true;
                                }
                            });
                            if (hasDataToSend) {
                                return canRetrySync(scormId, siteId, attempt, lastOnline).catch(function() {
                                    return addToNewOrDelete(attempt);
                                });
                            } else {
                                return $mmaModScormOffline.deleteAttempt(siteId, scormId, attempt).catch(function() {
                                });
                            }
                        });
                    } else {
                        return $mmaModScormOffline.getAttemptSnapshot(siteId, scormId, attempt).then(function(snapshot) {
                            if (snapshot && Object.keys(snapshot).length) {
                                var refresh = lastOnline != attempt;
                                return $mmaModScorm.getScormUserData(scormId, attempt, false, siteId, undefined, refresh)
                                            .then(function(data) {
                                    if (!snapshotEquals(snapshot, data)) {
                                        return addToNewOrDelete(attempt);
                                    }
                                });
                            } else {
                                newAttemptsSameOrder.push(attempt);
                            }
                        });
                    }
                });
                promises.push(promise);
            });
            return $q.all(promises).then(function() {
                return moveNewAttempts(scormId, siteId, newAttemptsSameOrder, lastOnline, lastCollision, offlineAttempts).then(function() {
                    lastOffline = lastOffline + newAttemptsSameOrder.length;
                    return createNewAttemptsAtEnd(scormId, siteId, newAttemptsAtEnd, lastOffline).then(function() {
                        return warnings;
                    });
                });
            });
        });
    }
        function moveNewAttempts(scormId, siteId, newAttempts, lastOnline, lastCollision, offlineAttempts) {
        if (!newAttempts.length) {
            return $q.when();
        }
        var promise = $q.when(),
            lastSuccessful;
        offlineAttempts = offlineAttempts.sort(function(a, b) {
            return parseInt(a, 10) < parseInt(b, 10);
        });
        angular.forEach(offlineAttempts, function(attempt) {
            if (attempt > lastCollision) {
                promise = promise.then(function() {
                    var newNumber = attempt + newAttempts.length;
                    return $mmaModScormOffline.changeAttemptNumber(siteId, scormId, attempt, newNumber).then(function() {
                        lastSuccessful = attempt;
                    });
                });
            }
        });
        return promise.then(function() {
            var promises = [],
                successful = [];
            newAttempts = newAttempts.sort(function(a, b) {
                return parseInt(a, 10) > parseInt(b, 10);
            });
            angular.forEach(newAttempts, function(attempt, index) {
                var newNumber = lastOnline + index + 1;
                promises.push($mmaModScormOffline.changeAttemptNumber(siteId, scormId, attempt, newNumber).then(function() {
                    successful.push(attempt);
                }));
            });
            return $q.all(promises).catch(function() {
                promises = [];
                angular.forEach(successful, function(attempt) {
                    var newNumber = lastOnline + newAttempts.indexOf(attempt) + 1;
                    promises.push($mmaModScormOffline.changeAttemptNumber(siteId, scormId, newNumber, attempt));
                });
                return $mmUtil.allPromises(promises).then(function() {
                    return $q.reject();
                });
            });
        }).catch(function() {
            if (!lastSuccessful) {
                return $q.reject();
            }
            promise = $q.when();
            var attemptsToUndo = [];
            for (var i = lastSuccessful; offlineAttempts.indexOf(i) != -1; i++) {
                attemptsToUndo.push(i);
            }
            attemptsToUndo.forEach(function(attempt) {
                promise = promise.then(function() {
                    return $mmaModScormOffline.changeAttemptNumber(siteId, scormId, attempt + newAttempts.length, attempt);
                });
            });
            return promise.then(function() {
                return $q.reject();
            });
        });
    }
        function createNewAttemptsAtEnd(scormId, siteId, newAttempts, lastOffline) {
        var times = Object.keys(newAttempts).sort(),
            promises = [];
        if (!times.length) {
            return $q.when();
        }
        angular.forEach(times, function(time, index) {
            var attempt = newAttempts[time];
            promises.push($mmaModScormOffline.changeAttemptNumber(siteId, scormId, attempt, lastOffline + index + 1));
        });
        return $mmUtil.allPromises(promises);
    }
        function canRetrySync(scormId, siteId, attempt, lastOnline) {
        var refresh = lastOnline != attempt;
        return $mmaModScorm.getScormUserData(scormId, attempt, false, siteId, undefined, refresh).then(function(siteData) {
            return $mmaModScormOffline.getAttemptSnapshot(siteId, scormId, attempt).then(function(snapshot) {
                if (!snapshot || !Object.keys(snapshot).length || !snapshotEquals(snapshot, siteData)) {
                    return $q.reject();
                }
            });
        });
    }
        function snapshotEquals(snapshot, userData) {
        var scoId,
            element,
            siteSco,
            snapshotSco;
        for (scoId in userData) {
            siteSco = userData[scoId];
            snapshotSco = snapshot[scoId];
            for (element in siteSco.userdata) {
                if (element.indexOf('.') > -1) {
                    if (!snapshotSco || siteSco.userdata[element] !== snapshotSco.userdata[element]) {
                        return false;
                    }
                }
            }
        }
        for (scoId in snapshot) {
            siteSco = userData[scoId];
            snapshotSco = snapshot[scoId];
            for (element in snapshotSco.userdata) {
                if (element.indexOf('.') > -1) {
                    if (!siteSco || siteSco.userdata[element] !== snapshotSco.userdata[element]) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
        self.waitForSync = function(scormId, siteId) {
        siteId = siteId || $mmSite.getId();
        if (syncPromises[siteId] && syncPromises[siteId][scormId]) {
            return syncPromises[siteId][scormId].catch(function() {});
        }
        return $q.when();
    };
    return self;
}]);

angular.module('mm.addons.mod_survey')
.controller('mmaModSurveyIndexCtrl', ["$scope", "$stateParams", "$mmaModSurvey", "$mmUtil", "$q", "$mmCourse", "$translate", "$ionicPlatform", "$ionicScrollDelegate", function($scope, $stateParams, $mmaModSurvey, $mmUtil, $q, $mmCourse, $translate,
            $ionicPlatform, $ionicScrollDelegate) {
    var module = $stateParams.module || {},
        courseid = $stateParams.courseid,
        survey,
        scrollView;
    $scope.title = module.name;
    $scope.description = module.description;
    $scope.moduleurl = module.url;
    $scope.courseid = courseid;
    $scope.answers = {};
    $scope.isTablet = $ionicPlatform.isTablet();
    function fetchSurveyData(refresh) {
        return $mmaModSurvey.getSurvey(courseid, module.id).then(function(surveydata) {
            survey = surveydata;
            $scope.title = survey.name || $scope.title;
            $scope.description = survey.intro || $scope.description;
            $scope.survey = survey;
            if (!survey.surveydone) {
                return fetchQuestions();
            }
        }).catch(function(message) {
            if (!refresh) {
                return refreshAllData();
            }
            if (message) {
                $mmUtil.showErrorModal(message);
            } else {
                $mmUtil.showErrorModal('mma.mod_survey.errorgetsurvey', true);
            }
            return $q.reject();
        });
    }
    function fetchQuestions() {
        return $mmaModSurvey.getQuestions(survey.id).then(function(questions) {
            return $mmaModSurvey.formatQuestions(questions).then(function(formatted) {
                $scope.questions = formatted;
                angular.forEach(formatted, function(q) {
                    if (q.name) {
                        var isTextArea = q.multi && q.multi.length === 0 && q.type === 0;
                        $scope.answers[q.name] = q.required ? -1 : (isTextArea ? '' : '0');
                    }
                });
            });
        });
    }
    function refreshAllData() {
        var p1 = $mmaModSurvey.invalidateSurveyData(courseid),
            p2 = survey ? $mmaModSurvey.invalidateQuestions(survey.id) : $q.when();
        return $q.all([p1, p2]).finally(function() {
            return fetchSurveyData(true);
        });
    }
    fetchSurveyData().then(function() {
        $mmaModSurvey.logView(survey.id).then(function() {
            $mmCourse.checkModuleCompletion(courseid, module.completionstatus);
        });
    }).finally(function() {
        $scope.surveyLoaded = true;
    });
    $scope.isValidResponse = function() {
        var valid = true;
        angular.forEach($scope.answers, function(a) {
            if (a === -1) {
                valid = false;
            }
        });
        return valid;
    };
    $scope.submit = function() {
        $mmUtil.showConfirm($translate('mm.core.areyousure')).then(function() {
            var answers = [],
                modal = $mmUtil.showModalLoading('mm.core.sending', true);
            angular.forEach($scope.answers, function(value, key) {
                answers.push({
                    key: key,
                    value: value
                });
            });
            $mmaModSurvey.submitAnswers(survey.id, answers).then(function() {
                if (!scrollView) {
                    scrollView = $ionicScrollDelegate.$getByHandle('mmaModSurveyScroll');
                }
                scrollView && scrollView.scrollTop && scrollView.scrollTop();
                return refreshAllData();
            }).catch(function(message) {
                if (message) {
                    $mmUtil.showErrorModal(message);
                } else {
                    $mmUtil.showErrorModal('mma.mod_survey.cannotsubmitsurvey', true);
                }
            }).finally(function() {
                modal.dismiss();
            });
        });
    };
    $scope.refreshSurvey = function() {
        refreshAllData().finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
}]);

angular.module('mm.addons.mod_survey')
.factory('$mmaModSurveyHandlers', ["$mmCourse", "$mmaModSurvey", "$state", "$q", "$mmContentLinksHelper", function($mmCourse, $mmaModSurvey, $state, $q, $mmContentLinksHelper) {
    var self = {};
        self.courseContent = function() {
        var self = {};
                self.isEnabled = function() {
            return $mmaModSurvey.isPluginEnabled();
        };
                self.getController = function(module, courseid) {
            return function($scope) {
                $scope.title = module.name;
                $scope.icon = $mmCourse.getModuleIconSrc('survey');
                $scope.action = function(e) {
                    if (e) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    $state.go('site.mod_survey', {module: module, courseid: courseid});
                };
            };
        };
        return self;
    };
        self.linksHandler = function() {
        var self = {};
                function isEnabled(siteId, courseId) {
            return $mmaModSurvey.isPluginEnabled(siteId).then(function(enabled) {
                if (!enabled) {
                    return false;
                }
                return courseId || $mmCourse.canGetModuleWithoutCourseId(siteId);
            });
        }
                self.getActions = function(siteIds, url, courseId) {
            if (typeof self.handles(url) != 'undefined') {
                return $mmContentLinksHelper.treatModuleIndexUrl(siteIds, url, isEnabled, courseId);
            }
            return $q.when([]);
        };
                self.handles = function(url) {
            var position = url.indexOf('/mod/survey/view.php');
            if (position > -1) {
                return url.substr(0, position);
            }
        };
        return self;
    };
    return self;
}]);

angular.module('mm.addons.mod_survey')
.factory('$mmaModSurvey', ["$q", "$mmSite", "$translate", "$mmSitesManager", function($q, $mmSite, $translate, $mmSitesManager) {
    var self = {};
        function commaStringToArray(value) {
        if (typeof value == 'string') {
            if (value !== '') {
                return value.split(',');
            } else {
                return [];
            }
        } else {
            return value;
        }
    }
        self.formatQuestions = function(questions) {
        var stringkeys = [
            'mma.mod_survey.ipreferthat',
            'mma.mod_survey.ifoundthat',
            'mm.core.choose'
        ];
        return $translate(stringkeys).then(function(translates) {
            var stripreferthat = translates[stringkeys[0]],
                strifoundthat = translates[stringkeys[1]],
                strchoose = translates[stringkeys[2]],
                formatted = [],
                parents = self.getParentQuestions(questions),
                num = 1;
            questions = angular.copy(questions);
            angular.forEach(questions, function(question) {
                var parent = parents[question.parent];
                question.multi = commaStringToArray(question.multi);
                question.options = commaStringToArray(question.options);
                if (parent) {
                    question.required = true;
                    if (parent.type === 1 || parent.type === 2) {
                        question.name = 'q' + (parent.type == 2 ? 'P' : '') + question.id;
                        question.num = num++;
                    } else {
                        var q2 = angular.copy(question);
                        question.text = stripreferthat + ' ' + question.text;
                        question.name = 'qP' + question.id;
                        question.num = num++;
                        formatted.push(question);
                        q2.text = strifoundthat + ' ' + q2.text;
                        q2.name = 'q' + question.id;
                        q2.num = num++;
                        formatted.push(q2);
                        return;
                    }
                } else if (question.multi && question.multi.length === 0) {
                    question.name = 'q' + question.id;
                    question.num = num++;
                    if (question.type > 0) {
                        question.options.unshift(strchoose);
                    }
                }
                formatted.push(question);
            });
            return formatted;
        });
    };
        self.getParentQuestions = function(questions) {
        var parents = {};
        angular.forEach(questions, function(question) {
            if (question.parent === 0) {
                parents[question.id] = question;
            }
        });
        return parents;
    };
        self.getQuestions = function(id) {
        var params = {
                surveyid: id
            },
            preSets = {
                cacheKey: getQuestionsCacheKey(id)
            };
        return $mmSite.read('mod_survey_get_questions', params, preSets).then(function(response) {
            if (response.questions) {
                return response.questions;
            }
            return $q.reject();
        });
    };
        function getQuestionsCacheKey(id) {
        return 'mmaModSurvey:questions:' + id;
    }
        self.getSurvey = function(courseid, cmid) {
        var params = {
                courseids: [courseid]
            },
            preSets = {
                cacheKey: getSurveyDataCacheKey(courseid)
            };
        return $mmSite.read('mod_survey_get_surveys_by_courses', params, preSets).then(function(response) {
            if (response.surveys) {
                var currentSurvey;
                angular.forEach(response.surveys, function(survey) {
                    if (survey.coursemodule == cmid) {
                        currentSurvey = survey;
                    }
                });
                if (currentSurvey) {
                    return currentSurvey;
                }
            }
            return $q.reject();
        });
    };
        function getSurveyDataCacheKey(courseid) {
        return 'mmaModSurvey:survey:' + courseid;
    }
        self.invalidateQuestions = function(courseid) {
        return $mmSite.invalidateWsCacheForKey(getQuestionsCacheKey(courseid));
    };
        self.invalidateSurveyData = function(courseid) {
        return $mmSite.invalidateWsCacheForKey(getSurveyDataCacheKey(courseid));
    };
        self.isPluginEnabled = function(siteId) {
        siteId = siteId || $mmSite.getId();
        return $mmSitesManager.getSite(siteId).then(function(site) {
            return  site.wsAvailable('mod_survey_get_questions') &&
                    site.wsAvailable('mod_survey_get_surveys_by_courses') &&
                    site.wsAvailable('mod_survey_submit_answers');
        });
    };
        self.logView = function(id) {
        if (id) {
            var params = {
                surveyid: id
            };
            return $mmSite.write('mod_survey_view_survey', params);
        }
        return $q.reject();
    };
        self.submitAnswers = function(surveyid, answers) {
        var params = {
            surveyid: surveyid,
            answers: answers
        };
        return $mmSite.write('mod_survey_submit_answers', params).then(function(response) {
            if (!response.status) {
                return $q.reject();
            }
        });
    };
    return self;
}]);

angular.module('mm.addons.mod_url')
.controller('mmaModUrlIndexCtrl', ["$scope", "$stateParams", "$mmaModUrl", "$mmCourse", function($scope, $stateParams, $mmaModUrl, $mmCourse) {
    var module = $stateParams.module || {},
        courseid = $stateParams.courseid;
    $scope.title = module.name;
    $scope.description = module.description;
    $scope.url = (module.contents && module.contents[0] && module.contents[0].fileurl) ? module.contents[0].fileurl : undefined;
    $scope.go = function() {
        $mmaModUrl.logView(module.instance).then(function() {
            $mmCourse.checkModuleCompletion(courseid, module.completionstatus);
        });
        $mmaModUrl.open($scope.url);
    };
}]);

angular.module('mm.addons.mod_url')
.factory('$mmaModUrlHandlers', ["$mmCourse", "$mmaModUrl", "$state", "$mmUtil", "$mmContentLinksHelper", "$q", function($mmCourse, $mmaModUrl, $state, $mmUtil, $mmContentLinksHelper, $q) {
    var self = {};
        self.courseContentHandler = function() {
        var self = {};
                self.isEnabled = function() {
            return true;
        };
                self.getController = function(module, courseid) {
            return function($scope) {
                $scope.icon = $mmCourse.getModuleIconSrc('url');
                $scope.title = module.name;
                $scope.action = function(e) {
                    if (e) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    $state.go('site.mod_url', {module: module, courseid: courseid});
                };
                if (module.contents && module.contents[0] && module.contents[0].fileurl) {
                    $scope.buttons = [{
                        icon: 'ion-link',
                        label: 'mm.core.openinbrowser',
                        action: function(e) {
                            if (e) {
                                e.preventDefault();
                                e.stopPropagation();
                            }
                            $mmaModUrl.logView(module.instance).then(function() {
                                $mmCourse.checkModuleCompletion(courseid, module.completionstatus);
                            });
                            $mmaModUrl.open(module.contents[0].fileurl);
                        }
                    }];
                }
            };
        };
        return self;
    };
        self.linksHandler = function() {
        var self = {};
                function isEnabled(siteId, courseId) {
            if (courseId) {
                return $q.when(true);
            }
            return $mmCourse.canGetModuleWithoutCourseId(siteId);
        }
                self.getActions = function(siteIds, url, courseId) {
            if (typeof self.handles(url) != 'undefined') {
                return $mmContentLinksHelper.treatModuleIndexUrl(siteIds, url, isEnabled, courseId);
            }
            return $q.when([]);
        };
                self.handles = function(url) {
            var position = url.indexOf('/mod/url/view.php');
            if (position > -1) {
                return url.substr(0, position);
            }
        };
        return self;
    };
    return self;
}]);

angular.module('mm.addons.mod_url')
.factory('$mmaModUrl', ["$mmSite", "$mmUtil", "$q", function($mmSite, $mmUtil, $q) {
    var self = {};
        self.logView = function(id) {
        if (id) {
            var params = {
                urlid: id
            };
            return $mmSite.write('mod_url_view_url', params);
        }
        return $q.reject();
    };
        self.open = function(url) {
        $mmUtil.openInBrowser(url);
    };
    return self;
}]);

angular.module('mm.addons.mod_wiki')
.controller('mmaModWikiIndexCtrl', ["$q", "$scope", "$stateParams", "$mmCourse", "$mmUser", "$mmGroups", "$ionicPopover", "$mmUtil", "$state", "$mmSite", "$mmaModWiki", "$ionicTabsDelegate", "$ionicHistory", "$translate", "mmaModWikiSubwikiPagesLoaded", function($q, $scope, $stateParams, $mmCourse, $mmUser, $mmGroups, $ionicPopover, $mmUtil, $state,
        $mmSite, $mmaModWiki, $ionicTabsDelegate, $ionicHistory, $translate, mmaModWikiSubwikiPagesLoaded) {
    var module = $stateParams.module || {},
        courseId = $stateParams.courseid,
        action = $stateParams.action || 'page',
        currentPage = $stateParams.pageid || false,
        popover, wiki, currentSubwiki, loadedSubwikis,
        tabsDelegate;
    $scope.title = $stateParams.pagetitle || module.name;
    $scope.description = module.description;
    $scope.mainpage = !currentPage;
    $scope.moduleUrl = module.url;
    $scope.courseId = courseId;
    $scope.subwikiData = {
        selected: 0,
        subwikis: [],
        count: 0
    };
    $scope.tabsDelegateName = 'mmaModWikiTabs_'+(module.id || 0) + '_' + (currentPage || 0) + '_' +  new Date().getTime();
    tabsDelegate = $ionicTabsDelegate.$getByHandle($scope.tabsDelegateName);
    $scope.showSubwikiPicker = function(e) {
        popover.show(e);
    };
    $scope.goHomeWiki = function(e) {
        var backTimes = getHistoryBackCounter();
        $ionicHistory.goBack(backTimes);
    };
    $scope.gotoPage = function(pageId) {
        if (currentPage != pageId) {
            return fetchPageContents(pageId).then(function(page) {
                var stateParams = {
                    module: module,
                    moduleid: module.id,
                    courseid: courseId,
                    pageid: page.id,
                    pagetitle: page.title,
                    wikiid: page.wikiid,
                    subwikiid: page.subwikiid,
                    action: 'page'
                };
                return $state.go('site.mod_wiki', stateParams);
            });
        }
        tabsDelegate.select(0);
    };
    $scope.gotoSubwiki = function(subwikiId) {
        if (subwikiId > 0) {
            popover.hide();
            if (subwikiId != currentSubwiki.id) {
                var stateParams = {
                    module: module,
                    moduleid: module.id,
                    courseid: courseId,
                    pageid: null,
                    pagetitle: null,
                    wikiid: wiki.id,
                    subwikiid: subwikiId,
                    action: tabsDelegate.selectedIndex() == 0 ? 'page' : 'map'
                };
                return $state.go('site.mod_wiki', stateParams);
            }
        }
    };
    function fetchWikiData(refresh) {
        var id = module.id || $stateParams.wikiid,
            paramName = module.id ? 'coursemodule' : 'id';
        return $mmaModWiki.getWiki(courseId, id, paramName).then(function(wikiData) {
            var promise;
            wiki = wikiData;
            $scope.wiki = wiki;
            $scope.showHomeButton = getHistoryBackCounter() < 0;
            if (!module.url) {
                promise = $mmCourse.getModule(wiki.coursemodule, wiki.course, null, true);
            } else {
                module.instance = wiki.id;
                promise = $q.when(module);
            }
            return promise.then(function(mod) {
                module = mod;
                $scope.title = $scope.title || wiki.title;
                $scope.description = wiki.intro || module.description;
                $scope.moduleUrl = module.url;
                return $mmGroups.getActivityGroupMode(wiki.coursemodule).then(function(groupmode) {
                    if (groupmode === $mmGroups.SEPARATEGROUPS || groupmode === $mmGroups.VISIBLEGROUPS) {
                        promise = $mmGroups.getActivityAllowedGroups(wiki.coursemodule);
                    } else {
                        promise = $q.when([]);
                    }
                    return promise.then(function(userGroups) {
                        return fetchSubwikis(wiki.id).then(function() {
                            var subwikiList = $mmaModWiki.getSubwikiList(wiki.id);
                            if (!subwikiList) {
                                return createSubwikiList(userGroups);
                            }
                            $scope.subwikiData.count = subwikiList.count;
                            $scope.subwikiData.selected = $stateParams.subwikiid || subwikiList.selected;
                            $scope.subwikiData.subwikis = subwikiList.subwikis;
                            return $q.when();
                        });
                    }).then(function() {
                        if ($scope.subwikiData.count > 1) {
                            handleSubwikiPopover();
                        }
                        if (!refresh) {
                            tabsDelegate.select(action == 'map' ? 1 : 0);
                        }
                        if (!$scope.subwikiData.selected || $scope.subwikiData.count <= 0) {
                            return $q.reject($translate.instant('mma.mod_wiki.errornowikiavailable'));
                        }
                    }).then(function() {
                        return fetchWikiPage();
                    });
                });
            });
        }).catch(function(message) {
            if (!refresh && !wiki) {
                return refreshAllData();
            }
            if (message) {
                $mmUtil.showErrorModal(message);
            } else {
                $mmUtil.showErrorModal('Error getting wiki data.');
            }
            return $q.reject();
        });
    }
    function handleSubwikiPopover() {
        $ionicPopover.fromTemplateUrl('addons/mod_wiki/templates/subwiki_picker.html', {
            scope: $scope
        }).then(function(po) {
            popover = po;
        });
        $scope.$on('$destroy', function() {
            popover.remove();
        });
    }
    function createSubwikiList(userGroups) {
        var subwikiList = [],
            promises = [],
            userGroupsIds = [],
            allParticipants = false,
            myGroups = false,
            multiLevelList = false,
            currentUserId = $mmSite.getUserId() || false,
            allParticipantsTitle = $translate.instant('mm.core.allparticipants'),
            nonInGroupTitle = $translate.instant('mma.mod_wiki.notingroup'),
            myGroupsTitle = $translate.instant('mm.core.mygroups'),
            otherGroupsTitle = $translate.instant('mm.core.othergroups');
        $scope.subwikiData.subwikis = [];
        $scope.subwikiData.selected = false;
        $scope.subwikiData.count = 0;
        if (userGroups.length > 0) {
            userGroupsIds = userGroups.map(function(g) {
                return g.id;
            });
        }
        angular.forEach(loadedSubwikis, function(subwiki) {
            var groupIdx,
                promise,
                groupId = parseInt(subwiki.groupid, 10),
                groupLabel = "",
                userId = parseInt(subwiki.userid, 10);
            if (groupId == 0 && userId == 0) {
                if (!allParticipants) {
                    subwikiList.unshift({
                        name: allParticipantsTitle,
                        id: subwiki.id,
                        group: -1,
                        groupLabel: ""
                    });
                    allParticipants = true;
                }
            } else {
                if (groupId != 0 && userGroupsIds.length > 0) {
                    groupIdx = userGroupsIds.indexOf(groupId);
                    if (groupIdx > -1) {
                        groupLabel = userGroups[groupIdx].name;
                    }
                } else {
                    groupLabel = nonInGroupTitle;
                }
                if (userId != 0) {
                    promise = $mmUser.getProfile(userId, null, true).then(function(user) {
                        subwikiList.push({
                            name: user.fullname,
                            id: subwiki.id,
                            group: groupId,
                            groupLabel: groupLabel
                        });
                    });
                    promises.push(promise);
                    if (!multiLevelList && groupId != 0) {
                        multiLevelList = true;
                    }
                } else {
                    subwikiList.push({
                        name: groupLabel,
                        id: subwiki.id,
                        group: groupId,
                        groupLabel: groupLabel,
                        canedit: subwiki.canedit
                    });
                    myGroups = true;
                }
            }
            if (subwiki.id > 0 && ((userId > 0 && currentUserId == userId) ||
                !$scope.subwikiData.selected)) {
                $scope.subwikiData.selected = subwiki.id;
            }
        });
        return $q.all(promises).then(function() {
            var groupValue = -1,
                grouping;
            subwikiList.sort(function(a, b) {
                return a.group - b.group;
            });
            $scope.subwikiData.count = subwikiList.length;
            if (multiLevelList) {
                for (var i in subwikiList) {
                    var subwiki = subwikiList[i];
                    if (subwiki.group !== groupValue) {
                        grouping = {label: subwiki.groupLabel, subwikis: []};
                        groupValue = subwiki.group;
                        $scope.subwikiData.subwikis.push(grouping);
                    }
                    grouping.subwikis.push(subwiki);
                }
            } else if (myGroups) {
                var noGrouping = {label: "", subwikis: []},
                    myGroupsGrouping = {label: myGroupsTitle, subwikis: []},
                    otherGroupsGrouping = {label: otherGroupsTitle, subwikis: []};
                for (var i in subwikiList) {
                    var subwiki = subwikiList[i];
                    if (typeof subwiki.canedit == 'undefined') {
                        noGrouping.subwikis.push(subwiki);
                    } else if(subwiki.canedit) {
                        myGroupsGrouping.subwikis.push(subwiki);
                    } else {
                        otherGroupsGrouping.subwikis.push(subwiki);
                    }
                }
                if (noGrouping.subwikis.length > 0) {
                    $scope.subwikiData.subwikis.push(noGrouping);
                }
                if (myGroupsGrouping.subwikis.length > 0) {
                    $scope.subwikiData.subwikis.push(myGroupsGrouping);
                }
                if (otherGroupsGrouping.subwikis.length > 0) {
                    $scope.subwikiData.subwikis.push(otherGroupsGrouping);
                }
            } else {
                $scope.subwikiData.subwikis.push({label: "", subwikis: subwikiList});
            }
            $mmaModWiki.setSubwikiList(wiki.id, $scope.subwikiData.subwikis, $scope.subwikiData.count, $scope.subwikiData.selected);
        });
    }
    function getHistoryBackCounter() {
        var view, historyInstance, backTimes = 0,
            backViewId = $ionicHistory.currentView().backViewId;
        if (!wiki.id) {
            return 0;
        }
        while (backViewId) {
            view = $ionicHistory.viewHistory().views[backViewId];
            if (view.stateName != 'site.mod_wiki') {
                break;
            }
            historyInstance = view.stateParams.wikiid ? view.stateParams.wikiid : view.stateParams.module.instance;
            if (historyInstance && historyInstance == wiki.id) {
                backTimes--;
            } else {
                break;
            }
            backViewId = view.backViewId;
        }
        return backTimes;
    }
    function fetchSubwikis(wikiId) {
        return $mmaModWiki.getSubwikis(wikiId).then(function(subwikis) {
            loadedSubwikis = subwikis;
        });
    }
    function fetchWikiPage() {
        currentSubwiki = false;
        angular.forEach(loadedSubwikis, function(subwiki) {
            if (!currentSubwiki && subwiki.id == $scope.subwikiData.selected) {
                currentSubwiki = subwiki;
            }
        });
        if (!currentSubwiki) {
            return $q.reject();
        }
        $scope.subwikiData.selected = currentSubwiki.id;
        return fetchSubwikiPages(currentSubwiki).then(function() {
            return fetchPageContents(currentPage).then(function(pageContents) {
                $scope.title = pageContents.title;
                $scope.subwikiData.selected = pageContents.subwikiid;
                $scope.pageContent = pageContents.cachedcontent;
            });
        }).finally(function() {
            $scope.wikiLoaded = true;
        });
    }
    function fetchSubwikiPages(subwiki) {
        return $mmaModWiki.getSubwikiPages(subwiki.wikiid, subwiki.groupid, subwiki.userid).then(function(subwikiPages) {
            angular.forEach(subwikiPages, function(subwikiPage) {
                if (!currentPage && subwikiPage.firstpage) {
                    currentPage = subwikiPage.id;
                }
            });
            $scope.subwikiPages = subwikiPages;
            if (!currentPage) {
                return $q.reject();
            }
            $scope.$broadcast(mmaModWikiSubwikiPagesLoaded, $scope.subwikiPages);
        });
    }
    function fetchPageContents(pageId) {
        return $mmaModWiki.getPageContents(pageId).then(function(pageContents) {
            return pageContents;
        });
    }
    function refreshAllData() {
        var promises = [$mmaModWiki.invalidateWikiData(courseId)];
        if (wiki) {
            promises.push($mmaModWiki.invalidateSubwikis(wiki.id));
            promises.push($mmGroups.invalidateActivityAllowedGroups(wiki.coursemodule));
            promises.push($mmGroups.invalidateActivityGroupMode(wiki.coursemodule));
        }
        if (currentSubwiki) {
            promises.push($mmaModWiki.invalidateSubwikiPages(currentSubwiki.wikiid));
            promises.push($mmaModWiki.invalidateSubwikiFiles(currentSubwiki.wikiid));
        }
        if (currentPage) {
            promises.push($mmaModWiki.invalidatePage(currentPage));
        }
        return $q.all(promises).finally(function() {
            return fetchWikiData(true);
        });
    }
    fetchWikiData().then(function() {
        if (!currentPage) {
            $mmaModWiki.logView(wiki.id).then(function() {
                $mmCourse.checkModuleCompletion(courseId, module.completionstatus);
            });
        } else {
            $mmaModWiki.logPageView(currentPage);
        }
    }).finally(function() {
        $scope.wikiLoaded = true;
    });
    $scope.refreshWiki = function() {
        refreshAllData().finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
}]);

angular.module('mm.addons.mod_wiki')
.controller('mmaModWikiMapCtrl', ["$scope", "mmaModWikiSubwikiPagesLoaded", function($scope, mmaModWikiSubwikiPagesLoaded) {
    $scope.map = [];
    $scope.constructMap = function(subwikiPages) {
        var initialLetter = false,
            letter = {};
        $scope.map = [];
        angular.forEach(subwikiPages, function(page) {
            if (page.title.charAt(0).toLocaleUpperCase() !== initialLetter) {
                initialLetter = page.title.charAt(0).toLocaleUpperCase();
                letter = {label: initialLetter, pages: []};
                $scope.map.push(letter);
            }
            letter.pages.push(page);
        });
    };
    var obsLoaded = $scope.$on(mmaModWikiSubwikiPagesLoaded, function(event, subwikiPages) {
        $scope.constructMap(subwikiPages);
    });
    $scope.constructMap($scope.subwikiPages);
    $scope.$on('$destroy', obsLoaded);
}]);

angular.module('mm.addons.mod_wiki')
.factory('$mmaModWikiHandlers', ["$mmCourse", "$mmaModWiki", "$state", "$mmContentLinksHelper", "$mmCourseHelper", "$mmUtil", "$q", "mmaModWikiComponent", "$mmaModWikiPrefetchHandler", "mmCoreDownloading", "mmCoreNotDownloaded", "mmCoreEventPackageStatusChanged", "mmCoreOutdated", "$mmCoursePrefetchDelegate", "$mmSite", "$mmEvents", function($mmCourse, $mmaModWiki, $state, $mmContentLinksHelper, $mmCourseHelper, $mmUtil, $q,
        mmaModWikiComponent, $mmaModWikiPrefetchHandler, mmCoreDownloading, mmCoreNotDownloaded, mmCoreEventPackageStatusChanged,
        mmCoreOutdated, $mmCoursePrefetchDelegate, $mmSite, $mmEvents) {
    var self = {};
        self.courseContent = function() {
        var self = {};
                self.isEnabled = function() {
            return $mmaModWiki.isPluginEnabled();
        };
                self.getController = function(module, courseId) {
            return function($scope) {
                var downloadBtn = {
                        hidden: true,
                        icon: 'ion-ios-cloud-download-outline',
                        label: 'mm.core.download',
                        action: function(e) {
                            if (e) {
                                e.preventDefault();
                                e.stopPropagation();
                            }
                            download();
                        }
                    },
                    refreshBtn = {
                        hidden: true,
                        icon: 'ion-android-refresh',
                        label: 'mm.core.refresh',
                        action: function(e) {
                            if (e) {
                                e.preventDefault();
                                e.stopPropagation();
                            }
                            $mmaModWiki.invalidateContent(module.id, courseId).finally(function() {
                                download();
                            });
                        }
                    };
                $scope.title = module.name;
                $scope.icon = $mmCourse.getModuleIconSrc('wiki');
                $scope.buttons = [downloadBtn, refreshBtn];
                $scope.spinner = true;
                $scope.action = function(e) {
                    if (e) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    $state.go('site.mod_wiki', {module: module, moduleid: module.id, courseid: courseId});
                };
                function download() {
                    $scope.spinner = true;
                    $mmaModWikiPrefetchHandler.getDownloadSize(module, courseId).then(function(size) {
                        $mmUtil.confirmDownloadSize(size).then(function() {
                            $mmaModWikiPrefetchHandler.prefetch(module, courseId).catch(function() {
                                if (!$scope.$$destroyed) {
                                    $mmUtil.showErrorModal('mm.core.errordownloading', true);
                                }
                            });
                        }).catch(function() {
                            $scope.spinner = false;
                        });
                    }).catch(function(error) {
                        $scope.spinner = false;
                        if (error) {
                            $mmUtil.showErrorModal(error);
                        } else {
                            $mmUtil.showErrorModal('mm.core.errordownloading', true);
                        }
                    });
                }
                function showStatus(status) {
                    if (status) {
                        $scope.spinner = status === mmCoreDownloading;
                        downloadBtn.hidden = status !== mmCoreNotDownloaded;
                        refreshBtn.hidden = status !== mmCoreOutdated;
                    }
                }
                var statusObserver = $mmEvents.on(mmCoreEventPackageStatusChanged, function(data) {
                    if (data.siteid === $mmSite.getId() && data.componentId === module.id &&
                            data.component === mmaModWikiComponent) {
                        showStatus(data.status);
                    }
                });
                $mmCoursePrefetchDelegate.getModuleStatus(module, courseId).then(showStatus);
                $scope.$on('$destroy', function() {
                    statusObserver && statusObserver.off && statusObserver.off();
                });
            };
        };
        return self;
    };
        self.linksHandler = function() {
        var self = {},
            patterns = ['/mod/wiki/view.php', '/mod/wiki/map.php'];
                function isEnabled(siteId, courseId) {
            return $mmaModWiki.isPluginEnabled(siteId).then(function(enabled) {
                if (!enabled) {
                    return false;
                }
                return courseId || $mmCourse.canGetModuleWithoutCourseId(siteId);
            });
        }
                function getPageContents(pageId, siteId) {
            return $mmaModWiki.getPageContents(pageId, siteId).then(function(page) {
                return page;
            }).catch(function(error) {
                if (error) {
                    $mmUtil.showErrorModal(error);
                } else {
                    $mmUtil.showErrorModal('mma.mod_wiki.errorloadingpage', true);
                }
                return $q.reject();
            });
        }
                function treatActionLink(siteIds, url, action, courseId) {
            var params = $mmUtil.extractUrlParams(url);
            return $mmContentLinksHelper.filterSupportedSites(siteIds, isEnabled, false, courseId).then(function(ids) {
                if (!ids.length) {
                    return [];
                }
                return [{
                    message: 'mm.core.view',
                    icon: 'ion-eye',
                    sites: ids,
                    action: function(siteId) {
                        var modal = $mmUtil.showModalLoading();
                        return getPageContents(parseInt(params.pageid, 10), siteId).then(function(page) {
                            var promise;
                            if (courseId) {
                                promise = $q.when(courseId);
                            } else {
                                promise = $mmCourseHelper.getModuleCourseIdByInstance(page.wikiid, 'wiki', siteId);
                            }
                            return promise.then(function(courseId) {
                                var stateParams = {
                                    module: null,
                                    moduleid: null,
                                    courseid: courseId,
                                    pageid: page.id,
                                    pagetitle: page.title,
                                    wikiid: page.wikiid,
                                    subwikiid: page.subwikiid,
                                    action: action
                                };
                                return $mmContentLinksHelper.goInSite('site.mod_wiki', stateParams, siteIds);
                            });
                        }).finally(function() {
                            modal.dismiss();
                        });
                    }
                }];
            });
        }
                function treatPageLink(siteIds, url, courseId) {
            var params = $mmUtil.extractUrlParams(url);
            if (typeof params.pageid != 'undefined') {
                return treatActionLink(siteIds, url, 'page', courseId);
            } else {
                return $mmContentLinksHelper.treatModuleIndexUrl(siteIds, url, isEnabled, courseId);
            }
        }
                function treatMapLink(siteIds, url, courseId) {
            var params = $mmUtil.extractUrlParams(url);
            if (typeof params.pageid != 'undefined' && (typeof params.option == 'undefined' || params.option == 5)) {
                return treatActionLink(siteIds, url, 'map', courseId);
            } else {
                return $q.when([]);
            }
        }
                self.getActions = function(siteIds, url, courseId) {
            if (url.indexOf(patterns[0]) > -1) {
                return treatPageLink(siteIds, url, courseId);
            } else if (url.indexOf(patterns[1]) > -1) {
                return treatMapLink(siteIds, url, courseId);
            }
            return $q.when([]);
        };
                self.handles = function(url) {
            for (var i = 0; i < patterns.length; i++) {
                var position = url.indexOf(patterns[i]);
                if (position > -1) {
                    return url.substr(0, position);
                }
            }
        };
        return self;
    };
    return self;
}]);

angular.module('mm.addons.mod_wiki')
.factory('$mmaModWikiPrefetchHandler', ["$mmaModWiki", "mmaModWikiComponent", "$mmSite", "$mmFilepool", "$q", "$mmGroups", "$mmCourseHelper", "$mmCourse", function($mmaModWiki, mmaModWikiComponent, $mmSite, $mmFilepool, $q, $mmGroups,
        $mmCourseHelper, $mmCourse) {
    var self = {};
    self.component = mmaModWikiComponent;
        self.getDownloadSize = function(module, courseId, siteId) {
        var promises = [];
        siteId = siteId || $mmSite.getId();
        promises.push(self.getFiles(module, courseId, siteId).then(function(files) {
            var size = 0;
            angular.forEach(files, function(file) {
                if (file.filesize) {
                    size = size + file.filesize;
                }
            });
            return size;
        }));
        promises.push(getAllPages(module, courseId, siteId).then(function(pages) {
            var size = 0;
            angular.forEach(pages, function(page) {
                if (page.contentsize) {
                    size = size + page.contentsize;
                }
            });
            return size;
        }));
        return $q.all(promises).then(function(sizes) {
            return sizes.reduce(function(a, b) { return a + b; }, 0);
        });
    };
        self.getFiles = function(module, courseId, siteId) {
        siteId = siteId || $mmSite.getId();
        return $mmaModWiki.getWiki(courseId, module.id, 'coursemodule', siteId).then(function(wiki) {
            return $mmaModWiki.getWikiFileList(wiki, siteId);
        }).catch(function() {
            return [];
        });
    };
        function getAllPages(module, courseId, siteId) {
        siteId = siteId || $mmSite.getId();
        return $mmaModWiki.getWiki(courseId, module.id, 'coursemodule', siteId).then(function(wiki) {
            return $mmaModWiki.getWikiPageList(wiki, siteId);
        }).catch(function() {
            return [];
        });
    }
        self.getTimemodified = function(module, courseId, siteId) {
        var promises = [];
        siteId = siteId || $mmSite.getId();
        promises.push(self.getFiles(module, courseId, siteId).then(function(files) {
            return $mmFilepool.getTimemodifiedFromFileList(files);
        }));
        promises.push(getAllPages(module, courseId, siteId).then(function(pages) {
            return getTimemodifiedFromPages(pages);
        }));
        return $q.all(promises).then(function(lastmodifiedTimes) {
            return Math.max.apply(null, lastmodifiedTimes);
        });
    };
        function getTimemodifiedFromPages(pages) {
        var lastmodified = 0;
        angular.forEach(pages, function(page) {
            if (page.timemodified > lastmodified) {
                lastmodified = page.timemodified;
            }
        });
        return lastmodified;
    }
        self.isEnabled = function() {
        if ($mmaModWiki.isPluginEnabled()) {
            return  $mmSite.wsAvailable('mod_wiki_get_subwiki_files');
        }
        return false;
    };
        self.prefetch = function(module, courseId) {
        var siteId = $mmSite.getId(),
            userid = userid || $mmSite.getUserId();
        return $mmFilepool.getPackageTimemodified(siteId, mmaModWikiComponent, module.id).then(function (packageModified) {
            return getAllPages(module, courseId, siteId).then(function(pages) {
                var promises = [];
                angular.forEach(pages, function(page) {
                    if (page.timemodified > packageModified) {
                        promises.push($mmaModWiki.invalidatePage(page.id, siteId).finally(function() {
                            return $mmaModWiki.getPageContents(page.id, siteId);
                        }));
                    }
                });
                promises.push($mmGroups.getActivityGroupMode(module.id, siteId).then(function(groupmode) {
                    if (groupmode === $mmGroups.SEPARATEGROUPS || groupmode === $mmGroups.VISIBLEGROUPS) {
                        return $mmGroups.getActivityAllowedGroups(module.id, userid, siteId);
                    }
                    return $q.when();
                }));
                promises.push($mmaModWiki.getWiki(courseId, module.id, 'coursemodule', siteId).then(function(wiki) {
                    return $mmCourseHelper.getModuleCourseIdByInstance(wiki.id, 'wiki', siteId);
                }));
                promises.push($mmCourse.getModuleBasicInfo(module.id, siteId));
                promises.push(self.getFiles(module, courseId, siteId).then(function (files) {
                    var revision = $mmFilepool.getRevisionFromFileList(files),
                        pagesTimemodified = getTimemodifiedFromPages(pages),
                        filesTimemodified = $mmFilepool.getTimemodifiedFromFileList(files),
                        timemodified = Math.max(pagesTimemodified, filesTimemodified);
                    return $mmFilepool.prefetchPackage(siteId, files, mmaModWikiComponent, module.id, revision,
                        timemodified);
                }));
                return $q.all(promises);
            });
        });
    };
    return self;
}]);

angular.module('mm.addons.mod_wiki')
.factory('$mmaModWiki', ["$q", "$mmSite", "$mmSitesManager", "$mmFilepool", "mmaModWikiComponent", function($q, $mmSite, $mmSitesManager, $mmFilepool, mmaModWikiComponent) {
    var self = {},
        subwikiListsCache = {};
        function getWikiDataCacheKey(courseId) {
        return 'mmaModWiki:wiki:' + courseId;
    }
        function getWikiSubwikisCacheKey(wikiId) {
        return 'mmaModWiki:subwikis:' + wikiId;
    }
        function getWikiSubwikiPagesCacheKey(wikiId, groupId, userId) {
        return getWikiSubwikiPagesCacheKeyPrefix(wikiId) + ':' + groupId + ':' + userId;
    }
        function getWikiSubwikiPagesCacheKeyPrefix(wikiId) {
        return 'mmaModWiki:subwikipages:' + wikiId;
    }
        function getWikiSubwikiFilesCacheKey(wikiId, groupId, userId) {
        return getWikiSubwikiFilesCacheKeyPrefix(wikiId) + ':' + groupId + ':' + userId;
    }
        function getWikiSubwikiFilesCacheKeyPrefix(wikiId) {
        return 'mmaModWiki:subwikifiles:' + wikiId;
    }
        function getWikiPageCacheKey(pageId) {
        return 'mmaModWiki:page:' + pageId;
    }
        self.isPluginEnabled = function(siteId) {
        siteId = siteId || $mmSite.getId();
        return $mmSitesManager.getSite(siteId).then(function(site) {
            return  site.wsAvailable('mod_wiki_get_wikis_by_courses') &&
                    site.wsAvailable('mod_wiki_get_subwikis') &&
                    site.wsAvailable('mod_wiki_get_subwiki_pages') &&
                    site.wsAvailable('mod_wiki_get_page_contents');
        });
    };
        self.getWiki = function(courseId, id, paramName, siteId) {
        siteId = siteId || $mmSite.getId();
        return $mmSitesManager.getSite(siteId).then(function(site) {
            var params = {
                    courseids: [courseId]
                },
                preSets = {
                    cacheKey: getWikiDataCacheKey(courseId)
                };
            return site.read('mod_wiki_get_wikis_by_courses', params, preSets).then(function(response) {
                if (response.wikis) {
                    var currentWiki;
                    angular.forEach(response.wikis, function(wiki) {
                        if (wiki[paramName] == id) {
                            currentWiki = wiki;
                        }
                    });
                    if (currentWiki) {
                        return currentWiki;
                    }
                }
                return $q.reject();
            });
        });
    };
        self.getWikiFileList = function(wiki, siteId) {
        var files = [];
        siteId = siteId || $mmSite.getId();
        return self.getSubwikis(wiki.id, siteId).then(function(subwikis) {
            var promises = [];
            angular.forEach(subwikis, function(subwiki) {
                promises.push(self.getSubwikiFiles(subwiki.wikiid, subwiki.groupid, subwiki.userid, siteId).then(function(subwikiFiles) {
                    files = files.concat(subwikiFiles);
                }));
            });
            return $q.all(promises).then(function() {
                return files;
            });
        });
    };
        self.getWikiPageList = function(wiki, siteId) {
        var pages = [];
        siteId = siteId || $mmSite.getId();
        return self.getSubwikis(wiki.id, siteId).then(function(subwikis) {
            var promises = [];
            angular.forEach(subwikis, function(subwiki) {
                promises.push(self.getSubwikiPages(subwiki.wikiid, subwiki.groupid, subwiki.userid, null, null, null, siteId).then(
                    function(subwikiPages) {
                        pages = pages.concat(subwikiPages);
                    }
                ));
            });
            return $q.all(promises).then(function() {
                return pages;
            });
        });
    };
        self.getSubwikiList = function(wikiId) {
        return subwikiListsCache[wikiId];
    };
        self.setSubwikiList = function(wikiId, subwikis, count, selected) {
        var subwikiLists =  {
            count: count,
            selected: selected,
            subwikis: subwikis
        };
        subwikiListsCache[wikiId] = subwikiLists;
    };
        self.clearSubwikiList = function(wikiId) {
        if(typeof wikiId == 'undefined') {
            subwikiListsCache = {};
        } else {
            delete subwikiListsCache[wikiId];
        }
    };
        self.getSubwikis = function(wikiId, siteId) {
        siteId = siteId || $mmSite.getId();
        return $mmSitesManager.getSite(siteId).then(function(site) {
            var params = {
                    wikiid: wikiId
                },
                preSets = {
                    cacheKey: getWikiSubwikisCacheKey(wikiId)
                };
            return site.read('mod_wiki_get_subwikis', params, preSets).then(function(response) {
                if (response.subwikis) {
                    return response.subwikis;
                }
                return $q.reject();
            });
        });
    };
        self.getSubwikiPages = function(wikiId, groupId, userId, sortBy, sortDirection, includeContent, siteId) {
        siteId = siteId || $mmSite.getId();
        return $mmSitesManager.getSite(siteId).then(function(site) {
            groupId = groupId || -1;
            userId = userId || 0;
            sortBy = sortBy || 'title';
            sortDirection = sortDirection || 'ASC';
            includeContent = includeContent || 0;
            var params = {
                    wikiid: wikiId,
                    groupid: groupId,
                    userid: userId,
                    options: {
                        sortby: sortBy,
                        sortdirection: sortDirection,
                        includecontent: includeContent
                    }
                },
                preSets = {
                    cacheKey: getWikiSubwikiPagesCacheKey(wikiId, groupId, userId)
                };
            return site.read('mod_wiki_get_subwiki_pages', params, preSets).then(function(response) {
                if (response.pages) {
                    return response.pages;
                }
                return $q.reject();
            });
        });
    };
        self.getSubwikiFiles = function(wikiId, groupId, userId, siteId) {
        siteId = siteId || $mmSite.getId();
        return $mmSitesManager.getSite(siteId).then(function(site) {
            groupId = groupId || -1;
            userId = userId || 0;
            var params = {
                    wikiid: wikiId,
                    groupid: groupId,
                    userid: userId
                },
                preSets = {
                    cacheKey: getWikiSubwikiFilesCacheKey(wikiId, groupId, userId)
                };
            return site.read('mod_wiki_get_subwiki_files', params, preSets).then(function(response) {
                if (response.files) {
                    return response.files;
                }
                return $q.reject();
            });
        });
    };
        self.getPageContents = function(pageId, siteId) {
        siteId = siteId || $mmSite.getId();
        return $mmSitesManager.getSite(siteId).then(function(site) {
            var params = {
                    pageid: pageId
                },
                preSets = {
                    cacheKey: getWikiPageCacheKey(pageId)
                };
            return site.read('mod_wiki_get_page_contents', params, preSets).then(function(response) {
                if (response.page) {
                    return response.page;
                }
                return $q.reject();
            });
        });
    };
        self.invalidateWikiData = function(courseId, siteId) {
        siteId = siteId || $mmSite.getId();
        return $mmSitesManager.getSite(siteId).then(function(site) {
            return site.invalidateWsCacheForKey(getWikiDataCacheKey(courseId));
        });
    };
        self.invalidateSubwikis = function(wikiId, siteId) {
        siteId = siteId || $mmSite.getId();
        self.clearSubwikiList(wikiId);
        return $mmSitesManager.getSite(siteId).then(function(site) {
            return site.invalidateWsCacheForKey(getWikiSubwikisCacheKey(wikiId));
        });
    };
        self.invalidateSubwikiPages = function(wikiId, siteId) {
        siteId = siteId || $mmSite.getId();
        return $mmSitesManager.getSite(siteId).then(function(site) {
            return site.invalidateWsCacheForKeyStartingWith(getWikiSubwikiPagesCacheKeyPrefix(wikiId));
        });
    };
        self.invalidateSubwikiFiles = function(wikiId, siteId) {
        siteId = siteId || $mmSite.getId();
        return $mmSitesManager.getSite(siteId).then(function(site) {
            return site.invalidateWsCacheForKeyStartingWith(getWikiSubwikiFilesCacheKeyPrefix(wikiId));
        });
    };
        self.invalidatePage = function(pageId, siteId) {
        siteId = siteId || $mmSite.getId();
        return $mmSitesManager.getSite(siteId).then(function(site) {
            return site.invalidateWsCacheForKey(getWikiPageCacheKey(pageId));
        });
    };
        self.invalidateContent = function(moduleId, courseId, siteId) {
        var promises = [];
        siteId = siteId || $mmSite.getId();
        promises.push(self.getWiki(courseId, moduleId, 'coursemodule', siteId).then(function(wiki) {
            var ps = [];
            ps.push(self.invalidateWikiData(courseId, siteId));
            ps.push(self.invalidateSubwikis(wiki.id, siteId));
            ps.push(self.invalidateSubwikiPages(wiki.id, siteId));
            ps.push(self.invalidateSubwikiFiles(wiki.id, siteId));
            return $q.all(ps);
        }));
        promises.push($mmFilepool.invalidateFilesByComponent(siteId, mmaModWikiComponent, moduleId));
        return $q.all(promises);
    };
        self.logView = function(id, siteId) {
        if (id) {
            siteId = siteId || $mmSite.getId();
            return $mmSitesManager.getSite(siteId).then(function(site) {
                var params = {
                    wikiid: id
                };
                return site.write('mod_wiki_view_wiki', params);
            });
        }
        return $q.reject();
    };
        self.logPageView = function(id, siteId) {
        if (id) {
            siteId = siteId || $mmSite.getId();
            return $mmSitesManager.getSite(siteId).then(function(site) {
                var params = {
                    pageid: id
                };
                return site.write('mod_wiki_view_page', params);
            });
        }
        return $q.reject();
    };
    return self;
}]);

angular.module('mm.addons.notes')
.controller('mmaNotesListCtrl', ["$scope", "$stateParams", "$mmUtil", "$mmaNotes", "$mmSite", "$translate", function($scope, $stateParams, $mmUtil, $mmaNotes, $mmSite, $translate) {
    var courseid = $stateParams.courseid,
        type = $stateParams.type;
    $scope.courseid = courseid;
    $scope.type = type;
    $translate('mma.notes.' + type + 'notes').then(function(string) {
        $scope.title = string;
    });
    function fetchNotes(refresh) {
        return $mmaNotes.getNotes(courseid, refresh).then(function(notes) {
            notes = notes[type + 'notes'];
            return $mmaNotes.getNotesUserData(notes, courseid).then(function(notes) {
                $scope.notes = notes;
            });
        }, function(message) {
            $mmUtil.showErrorModal(message);
        });
    }
    fetchNotes().then(function() {
        $mmSite.write('core_notes_view_notes', {
            courseid: courseid,
            userid: 0
        });
    })
    .finally(function() {
        $scope.notesLoaded = true;
    });
    $scope.refreshNotes = function() {
        fetchNotes(true).finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
}]);

angular.module('mm.addons.notes')
.controller('mmaNotesTypesCtrl', ["$scope", "$stateParams", function($scope, $stateParams) {
    var course = $stateParams.course,
        courseid = course.id;
    $scope.courseid = courseid;
}]);

angular.module('mm.addons.notes')
.factory('$mmaNotesHandlers', ["$mmaNotes", "$mmSite", "$mmApp", "$ionicModal", "$mmUtil", "$q", "mmCoursesAccessMethods", function($mmaNotes, $mmSite, $mmApp, $ionicModal, $mmUtil, $q, mmCoursesAccessMethods) {
    var self = {},
        addNoteEnabledCache = {},
        coursesNavEnabledCache = {};
        self.clearAddNoteCache = function(courseId) {
        if (courseId) {
            delete addNoteEnabledCache[courseId];
        } else {
            addNoteEnabledCache = {};
        }
    };
        self.clearCoursesNavCache = function() {
        coursesNavEnabledCache = {};
    };
        self.addNote = function() {
        var self = {};
                self.isEnabled = function() {
            return $mmaNotes.isPluginAddNoteEnabled();
        };
                self.isEnabledForUser = function(user, courseId) {
            if (!courseId || user.id == $mmSite.getUserId()) {
                return $q.when(false);
            }
            if (typeof addNoteEnabledCache[courseId] != 'undefined') {
                return addNoteEnabledCache[courseId];
            }
            return $mmaNotes.isPluginAddNoteEnabledForCourse(courseId).then(function(enabled) {
                addNoteEnabledCache[courseId] = enabled;
                return enabled;
            });
        };
                self.getController = function(user, courseid) {
                        return function($scope) {
                $scope.title = 'mma.notes.addnewnote';
                $ionicModal.fromTemplateUrl('addons/notes/templates/add.html', {
                    scope: $scope,
                    animation: 'slide-in-up'
                }).then(function(m) {
                    $scope.modal = m;
                });
                $scope.closeModal = function(){
                    $scope.modal.hide();
                };
                $scope.addNote = function(){
                    $mmApp.closeKeyboard();
                    var loadingModal = $mmUtil.showModalLoading('mm.core.sending', true);
                    $scope.processing = true;
                    $mmaNotes.addNote(user.id, courseid, $scope.note.publishstate, $scope.note.text).then(function() {
                        $mmUtil.showModal('mm.core.success', 'mma.notes.eventnotecreated');
                        $scope.closeModal();
                    }, function(error) {
                        $mmUtil.showErrorModal(error);
                        $scope.processing = false;
                    }).finally(function() {
                        loadingModal.dismiss();
                    });
                };
                $scope.action = function($event) {
                    $event.preventDefault();
                    $event.stopPropagation();
                    $scope.note = {
                        publishstate: 'personal',
                        text: ''
                    };
                    $scope.processing = false;
                    $scope.modal.show();
                };
            };
        };
        return self;
    };
        self.coursesNav = function() {
        var self = {};
                self.isEnabled = function() {
            return $mmaNotes.isPluginViewNotesEnabled();
        };
                self.isEnabledForCourse = function(courseId, accessData) {
            if (accessData && accessData.type == mmCoursesAccessMethods.guest) {
                return false;
            }
            if (typeof coursesNavEnabledCache[courseId] != 'undefined') {
                return coursesNavEnabledCache[courseId];
            }
            return $mmaNotes.isPluginViewNotesEnabledForCourse(courseId).then(function(enabled) {
                coursesNavEnabledCache[courseId] = enabled;
                return enabled;
            });
        };
                self.getController = function(courseId) {
                        return function($scope, $state) {
                $scope.icon = 'ion-ios-list';
                $scope.title = 'mma.notes.notes';
                $scope.action = function($event, course) {
                    $event.preventDefault();
                    $event.stopPropagation();
                    $state.go('site.notes-types', {
                        course: course
                    });
                };
            };
        };
        return self;
    };
    return self;
}])
.run(["$mmaNotesHandlers", "$mmEvents", "mmCoreEventLogout", "mmCoursesEventMyCoursesRefreshed", "mmUserEventProfileRefreshed", function($mmaNotesHandlers, $mmEvents, mmCoreEventLogout, mmCoursesEventMyCoursesRefreshed, mmUserEventProfileRefreshed) {
    $mmEvents.on(mmCoreEventLogout, function() {
        $mmaNotesHandlers.clearAddNoteCache();
        $mmaNotesHandlers.clearCoursesNavCache();
    });
    $mmEvents.on(mmCoursesEventMyCoursesRefreshed, $mmaNotesHandlers.clearCoursesNavCache);
    $mmEvents.on(mmUserEventProfileRefreshed, function(data) {
        $mmaNotesHandlers.clearAddNoteCache(data.courseid);
    });
}]);

angular.module('mm.addons.notes')
.factory('$mmaNotes', ["$mmSite", "$log", "$q", "$mmUser", "$translate", function($mmSite, $log, $q, $mmUser, $translate) {
    $log = $log.getInstance('$mmaNotes');
    var self = {};
        self.addNote = function(userId, courseId, publishState, noteText) {
        var data = {
            "notes[0][userid]" : userId,
            "notes[0][publishstate]": publishState,
            "notes[0][courseid]": courseId,
            "notes[0][text]": noteText,
            "notes[0][format]": 1
        };
        return $mmSite.write('core_notes_create_notes', data).then(function(response) {
            if (!response || !response.length) {
                return $q.reject();
            }
            if (response[0].noteid == -1) {
                return $q.reject(response[0].errormessage);
            }
            return response;
        });
    };
        self.isPluginAddNoteEnabled = function() {
        if (!$mmSite.isLoggedIn()) {
            return false;
        } else if (!$mmSite.canUseAdvancedFeature('enablenotes')) {
            return false;
        } else if (!$mmSite.wsAvailable('core_notes_create_notes')) {
            return false;
        }
        return true;
    };
        self.isPluginAddNoteEnabledForCourse = function(courseId) {
        var data = {
            "notes[0][userid]" : -1,
            "notes[0][courseid]": courseId,
            "notes[0][publishstate]": 'personal',
            "notes[0][text]": '',
            "notes[0][format]": 1
        };
        return $mmSite.read('core_notes_create_notes', data).then(function() {
            return true;
        }).catch(function() {
            return false;
        });
    };
        self.isPluginViewNotesEnabled = function() {
        if (!$mmSite.isLoggedIn()) {
            return false;
        } else if (!$mmSite.canUseAdvancedFeature('enablenotes')) {
            return false;
        } else if (!$mmSite.wsAvailable('core_notes_get_course_notes')) {
            return false;
        }
        return true;
    };
        self.isPluginViewNotesEnabledForCourse = function(courseId) {
        return self.getNotes(courseId).then(function() {
            return true;
        }).catch(function() {
            return false;
        });
    };
        self.getNotes = function(courseid, refresh) {
        $log.debug('Get notes for course ' + courseid);
        var data = {
                courseid : courseid
            },
            presets = {};
        if (refresh) {
            presets.getFromCache = false;
        }
        return $mmSite.read('core_notes_get_course_notes', data, presets);
    };
        self.getNotesUserData = function(notes, courseid) {
        var promises = [];
        angular.forEach(notes, function(note) {
            var promise = $mmUser.getProfile(note.userid, courseid, true).then(function(user) {
                note.userfullname = user.fullname;
                note.userprofileimageurl = user.profileimageurl;
            }, function() {
                return $translate('mma.notes.userwithid', {id: note.userid}).then(function(str) {
                    note.userfullname = str;
                });
            });
            promises.push(promise);
        });
        return $q.all(promises).then(function() {
            return notes;
        });
    };
    return self;
}]);

angular.module('mm.addons.notifications')
.controller('mmaNotificationsListCtrl', ["$scope", "$mmUtil", "$mmaNotifications", "mmaNotificationsListLimit", "mmUserProfileState", function($scope, $mmUtil, $mmaNotifications, mmaNotificationsListLimit,
            mmUserProfileState) {
    var readCount = 0,
        unreadCount = 0;
    $scope.notifications = [];
    $scope.userStateName = mmUserProfileState;
    function fetchNotifications(refresh) {
        if (refresh) {
            readCount = 0;
            unreadCount = 0;
        }
        return $mmaNotifications.getUnreadNotifications(unreadCount, mmaNotificationsListLimit).then(function(unread) {
            unreadCount += unread.length;
            if (unread.length < mmaNotificationsListLimit) {
                var readLimit = mmaNotificationsListLimit - unread.length;
                return $mmaNotifications.getReadNotifications(readCount, readLimit).then(function(read) {
                    readCount += read.length;
                    if (refresh) {
                        $scope.notifications = unread.concat(read);
                    } else {
                        $scope.notifications = $scope.notifications.concat(unread).concat(read);
                    }
                    $scope.canLoadMore = read.length >= readLimit;
                }, function(error) {
                    if (unread.length == 0) {
                        if (error) {
                            $mmUtil.showErrorModal(error);
                        } else {
                            $mmUtil.showErrorModal('mma.notifications.errorgetnotifications', true);
                        }
                        $scope.canLoadMore = false;
                    }
                });
            } else {
                if (refresh) {
                    $scope.notifications = unread;
                } else {
                    $scope.notifications = $scope.notifications.concat(unread);
                }
                $scope.canLoadMore = true;
            }
        }, function(error) {
            if (error) {
                $mmUtil.showErrorModal(error);
            } else {
                $mmUtil.showErrorModal('mma.notifications.errorgetnotifications', true);
            }
            $scope.canLoadMore = false;
        });
    }
    fetchNotifications().finally(function() {
        $scope.notificationsLoaded = true;
    });
    $scope.refreshNotifications = function() {
        $mmaNotifications.invalidateNotificationsList().finally(function() {
            fetchNotifications(true).finally(function() {
                $scope.$broadcast('scroll.refreshComplete');
            });
        });
    };
    $scope.loadMoreNotifications = function(){
        fetchNotifications().finally(function() {
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };
}]);

angular.module('mm.addons.notifications')
.directive('mmaNotificationsActions', ["$log", "$mmContentLinksDelegate", function($log, $mmContentLinksDelegate) {
    $log = $log.getInstance('mmaNotificationsActions');
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
}]);

angular.module('mm.addons.notifications')
.filter('mmaNotificationsFormat', ["$mmText", function($mmText) {
  return function(text) {
    text = text.replace(/-{4,}/ig, '');
    text = $mmText.replaceNewLines(text, '<br />');
    return text;
  };
}]);

angular.module('mm.addons.notifications')
.factory('$mmaNotificationsHandlers', ["$log", "$mmaNotifications", function($log, $mmaNotifications) {
    $log = $log.getInstance('$mmaNotificationsHandlers');
    var self = {};
        self.sideMenuNav = function() {
        var self = {};
                self.isEnabled = function() {
            return $mmaNotifications.isPluginEnabled();
        };
                self.getController = function() {
                        return function($scope) {
                $scope.icon = 'ion-ios-bell';
                $scope.title = 'mma.notifications.notifications';
                $scope.state = 'site.notifications';
            };
        };
        return self;
    };
    return self;
}]);

angular.module('mm.addons.notifications')
.factory('$mmaNotifications', ["$q", "$log", "$mmSite", "$mmSitesManager", "$mmUser", "mmaNotificationsListLimit", function($q, $log, $mmSite, $mmSitesManager, $mmUser, mmaNotificationsListLimit) {
    $log = $log.getInstance('$mmaNotifications');
    var self = {};
    function formatNotificationsData(notifications) {
        angular.forEach(notifications, function(notification) {
            if (notification.contexturl && notification.contexturl.indexOf('/mod/forum/')) {
                notification.mobiletext = notification.smallmessage;
            } else {
                notification.mobiletext = notification.fullmessage;
            }
            var cid = notification.fullmessagehtml.match(/course\/view\.php\?id=([^"]*)/);
            if (cid && cid[1]) {
                notification.courseid = cid[1];
            }
            $mmUser.getProfile(notification.useridfrom, notification.courseid, true).then(function(user) {
                notification.profileimageurlfrom = user.profileimageurl;
            });
        });
    }
        function getNotificationsCacheKey() {
        return 'mmaNotifications:list';
    }
        self.getNotifications = function(read, limitFrom, limitNumber) {
        limitFrom = limitFrom || 0;
        limitNumber = limitNumber || mmaNotificationsListLimit;
        $log.debug('Get ' + (read ? 'read' : 'unread') + ' notifications from ' + limitFrom + '. Limit: ' + limitNumber);
        var data = {
            useridto: $mmSite.getUserId(),
            useridfrom: 0,
            type: 'notifications',
            read: read ? 1 : 0,
            newestfirst: 1,
            limitfrom: limitFrom,
            limitnum: limitNumber
        };
        var preSets = {
            cacheKey: getNotificationsCacheKey()
        };
        return $mmSite.read('core_message_get_messages', data, preSets).then(function(response) {
            if (response.messages) {
                var notifications = response.messages;
                formatNotificationsData(notifications);
                return notifications;
            } else {
                return $q.reject();
            }
        });
    };
        self.getReadNotifications = function(limitFrom, limitNumber) {
        return self.getNotifications(true, limitFrom, limitNumber);
    };
        self.getUnreadNotifications = function(limitFrom, limitNumber) {
        return self.getNotifications(false, limitFrom, limitNumber);
    };
        self.invalidateNotificationsList = function() {
        return $mmSite.invalidateWsCacheForKey(getNotificationsCacheKey());
    };
        self.isPluginEnabled = function() {
        return $mmSite.wsAvailable('core_message_get_messages');
    };
        self.isPluginEnabledForSite = function(siteid) {
        return $mmSitesManager.getSite(siteid).then(function(site) {
            if (!site.wsAvailable('core_message_get_messages')) {
                return $q.reject();
            }
        });
    };
    return self;
}]);

angular.module('mm.addons.participants')
.controller('mmaParticipantsListCtrl', ["$scope", "$state", "$stateParams", "$mmUtil", "$mmaParticipants", "$ionicPlatform", "$mmSite", "mmUserProfileState", function($scope, $state, $stateParams, $mmUtil, $mmaParticipants, $ionicPlatform, $mmSite,
            mmUserProfileState) {
    var course = $stateParams.course,
        courseid = course.id;
    $scope.participants = [];
    $scope.courseid = courseid;
    $scope.userStateName = mmUserProfileState;
    function fetchParticipants(refresh) {
        var firstToGet = refresh ? 0 : $scope.participants.length;
        return $mmaParticipants.getParticipants(courseid, firstToGet).then(function(data) {
            if (refresh) {
                $scope.participants = data.participants;
            } else {
                $scope.participants = $scope.participants.concat(data.participants);
            }
            $scope.canLoadMore = data.canLoadMore;
        }, function(message) {
            $mmUtil.showErrorModal(message);
            $scope.canLoadMore = false;
        });
    }
    fetchParticipants(true).then(function() {
        $mmSite.write('core_user_view_user_list', {
            courseid: courseid
        });
    }).finally(function() {
        $scope.participantsLoaded = true;
    });
    $scope.loadMoreParticipants = function(){
        fetchParticipants().finally(function() {
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };
    $scope.refreshParticipants = function() {
        $mmaParticipants.invalidateParticipantsList(courseid).finally(function() {
            fetchParticipants(true).finally(function() {
                $scope.$broadcast('scroll.refreshComplete');
            });
        });
    };
}]);

angular.module('mm.addons.participants')
.factory('$mmaParticipantsHandlers', ["$mmaParticipants", "mmCoursesAccessMethods", "$mmUtil", "$state", function($mmaParticipants, mmCoursesAccessMethods, $mmUtil, $state) {
    var self = {};
        self.coursesNavHandler = function() {
        var self = {};
                self.isEnabled = function() {
            return true;
        };
                self.isEnabledForCourse = function(courseId, accessData) {
            if (accessData && accessData.type == mmCoursesAccessMethods.guest) {
                return false;
            }
            return $mmaParticipants.isPluginEnabledForCourse(courseId);
        };
                self.getController = function(courseId) {
            return function($scope, $state) {
                $scope.icon = 'ion-person-stalker';
                $scope.title = 'mma.participants.participants';
                $scope.action = function($event, course) {
                    $event.preventDefault();
                    $event.stopPropagation();
                    $state.go('site.participants', {
                        course: course
                    });
                };
            };
        };
        return self;
    };
        self.linksHandler = function() {
        var self = {};
                self.getActions = function(siteIds, url) {
            if (typeof self.handles(url) != 'undefined') {
                var params = $mmUtil.extractUrlParams(url);
                if (typeof params.id != 'undefined') {
                    return [{
                        message: 'mm.core.view',
                        icon: 'ion-eye',
                        sites: siteIds,
                        action: function(siteId) {
                            $state.go('redirect', {
                                siteid: siteId,
                                state: 'site.participants',
                                params: {
                                    course: {id: parseInt(params.id, 10)}
                                }
                            });
                        }
                    }];
                }
            }
            return [];
        };
                self.handles = function(url) {
            if (url.indexOf('grade/report/user') == -1) {
                var position = url.indexOf('/user/index.php');
                if (position > -1) {
                    return url.substr(0, position);
                }
            }
        };
        return self;
    };
    return self;
}]);

angular.module('mm.addons.participants')
.factory('$mmaParticipants', ["$log", "$mmSite", "$mmUser", "mmaParticipantsListLimit", function($log, $mmSite, $mmUser, mmaParticipantsListLimit) {
    $log = $log.getInstance('$mmaParticipants');
    var self = {};
        function getParticipantsListCacheKey(courseid) {
        return 'mmaParticipants:list:'+courseid;
    }
        self.getParticipants = function(courseid, limitFrom, limitNumber) {
        if (typeof limitFrom == 'undefined') {
            limitFrom = 0;
        }
        if (typeof limitNumber == 'undefined') {
            limitNumber = mmaParticipantsListLimit;
        }
        $log.debug('Get participants for course ' + courseid + ' starting at ' + limitFrom);
        var wsName,
            data = {
                courseid: courseid
            }, preSets = {
                cacheKey: getParticipantsListCacheKey(courseid)
            };
        if ($mmSite.wsAvailable('core_enrol_get_enrolled_users')) {
            wsName = 'core_enrol_get_enrolled_users';
            data.options = [
                {
                    name: 'limitfrom',
                    value: limitFrom
                },
                {
                    name: 'limitnumber',
                    value: limitNumber
                },
                {
                    name: 'sortby',
                    value: 'siteorder'
                }
            ];
        } else {
            wsName = 'moodle_enrol_get_enrolled_users';
            limitNumber = 9999999999;
        }
        return $mmSite.read(wsName, data, preSets).then(function(users) {
            angular.forEach(users, function(user) {
                if (typeof user.id == 'undefined' && typeof user.userid != 'undefined') {
                    user.id = user.userid;
                }
                if (typeof user.profileimageurl == 'undefined' && typeof user.profileimgurl != 'undefined') {
                    user.profileimageurl = user.profileimgurl;
                }
            });
            var canLoadMore = users.length >= limitNumber;
            $mmUser.storeUsers(users);
            return {participants: users, canLoadMore: canLoadMore};
        });
    };
        self.invalidateParticipantsList = function(courseid) {
        return $mmSite.invalidateWsCacheForKey(getParticipantsListCacheKey(courseid));
    };
        self.isPluginEnabledForCourse = function(courseId) {
        if (!courseId) {
            return $q.reject();
        }
        return self.getParticipants(courseId, 0, 1).then(function(parcitipants) {
            return true;
        }).catch(function(error) {
            return false;
        });
    };
    return self;
}]);

angular.module('mm.addons.pushnotifications')
.factory('$mmPushNotificationsDelegate', ["$log", function($log) {
    $log = $log.getInstance('$mmPushNotificationsDelegate');
    var handlers = {},
        self = {};
        self.clicked = function(notification) {
        for (var name in handlers) {
            var callback = handlers[name];
            if (typeof callback == 'function') {
                var treated = callback(notification);
                if (treated) {
                    return;
                }
            }
        }
    };
        self.registerHandler = function(name, callback) {
        $log.debug("Registered handler '" + name + "' as push notification handler.");
        handlers[name] = callback;
    };
    return self;
}]);

angular.module('mm.addons.pushnotifications')
.factory('$mmaPushNotifications', ["$mmSite", "$log", "$cordovaPush", "$mmText", "$q", "$cordovaDevice", "$mmUtil", "mmCoreConfigConstants", "$mmApp", "$mmLocalNotifications", "$mmPushNotificationsDelegate", "$mmSitesManager", "mmaPushNotificationsComponent", function($mmSite, $log, $cordovaPush, $mmText, $q, $cordovaDevice, $mmUtil, mmCoreConfigConstants,
            $mmApp, $mmLocalNotifications, $mmPushNotificationsDelegate, $mmSitesManager, mmaPushNotificationsComponent) {
    $log = $log.getInstance('$mmaPushNotifications');
    var self = {},
        pushID;
        self.isPluginEnabled = function() {
        return $mmSite.wsAvailable('core_user_add_user_device')
                && $mmSite.wsAvailable('message_airnotifier_is_system_configured')
                && $mmSite.wsAvailable('message_airnotifier_are_notification_preferences_configured');
    };
        self.notificationClicked = function(data) {
        $mmApp.ready().then(function() {
            $mmPushNotificationsDelegate.clicked(data);
        });
    };
        self.onGCMReceived = function(notification) {
        $log.debug('GCM notification received. Type: '+notification.event);
        switch (notification.event) {
            case 'registered':
                if (notification.regid.length > 0) {
                    pushID = notification.regid;
                    return self.registerDeviceOnMoodle();
                } else {
                    $log.debug('Device NOT registered in GCM, invalid regid');
                    break;
                }
            case 'message':
                notification.payload.foreground = notification.foreground;
                return self.onMessageReceived(notification.payload);
            case 'error':
                $log.debug('Push messages error');
                break;
            default:
                $log.debug('Push unknown message');
        }
    };
        self.onMessageReceived = function(data) {
        var promise;
        if (data && data.site) {
            promise = $mmSitesManager.getSite(data.site);
        } else {
            promise = $q.when();
        }
        promise.then(function() {
            if ($mmUtil.isTrueOrOne(data.foreground)) {
                if ($mmLocalNotifications.isAvailable()) {
                    $mmText.formatText(data.title, true, true).then(function(formattedTitle) {
                        $mmText.formatText(data.message, true, true).then(function(formattedMessage) {
                            var localNotif = {
                                id: 1,
                                title: formattedTitle,
                                message: formattedMessage,
                                at: new Date(),
                                smallIcon: 'res://icon',
                                data: {
                                    notif: data.notif,
                                    site: data.site
                                }
                            };
                            $mmLocalNotifications.schedule(localNotif, mmaPushNotificationsComponent, data.site);
                        });
                    });
                }
            } else {
                self.notificationClicked(data);
            }
        });
    };
        self.registerDevice = function() {
        try {
            if (ionic.Platform.isIOS()) {
                return self._registerDeviceAPNS();
            } else if (ionic.Platform.isAndroid()) {
                return self._registerDeviceGCM();
            }
        } catch(ex) {}
        return $q.reject();
    };
        self._registerDeviceAPNS = function() {
        var options = {
            alert: 'true',
            badge: 'true',
            sound: 'true'
        };
        return $cordovaPush.register(options).then(function(token) {
            pushID = token;
            return self.registerDeviceOnMoodle();
        }, function(error) {
            return $q.reject();
        });
    };
        self._registerDeviceGCM = function() {
        if (mmCoreConfigConstants.gcmpn) {
            return $cordovaPush.register({
                senderID: mmCoreConfigConstants.gcmpn
            });
        }
        return $q.reject();
    };
        self.registerDeviceOnMoodle = function() {
        $log.debug('Register device on Moodle.');
        if (!$mmSite.isLoggedIn() || !pushID || !$mmApp.isDevice()) {
            return $q.reject();
        }
        var data = {
            appid:      mmCoreConfigConstants.app_id,
            name:       ionic.Platform.device().name || '',
            model:      $cordovaDevice.getModel(),
            platform:   $cordovaDevice.getPlatform(),
            version:    $cordovaDevice.getVersion(),
            pushid:     pushID,
            uuid:       $cordovaDevice.getUUID()
        };
        return $mmSite.write('core_user_add_user_device', data);
    };
        self.unregisterDeviceOnMoodle = function(site) {
        if (!site || !$mmApp.isDevice()) {
            return $q.reject();
        }
        $log.debug('Unregister device on Moodle: ' + site.id);
        var data = {
            appid: mmCoreConfigConstants.app_id,
            uuid:  $cordovaDevice.getUUID()
        };
        return site.write('core_user_remove_user_device', data).then(function(response) {
            if (!response || !response.removed) {
                return $q.reject();
            }
        });
    };
    return self;
}]);

angular.module('mm.addons.remotestyles')
.factory('$mmaRemoteStyles', ["$log", "$q", "$mmSite", "$mmSitesManager", "$mmFilepool", "$http", "$mmFS", "mmaRemoteStylesComponent", "mmCoreNotDownloaded", function($log, $q, $mmSite, $mmSitesManager, $mmFilepool, $http, $mmFS, mmaRemoteStylesComponent,
            mmCoreNotDownloaded) {
    $log = $log.getInstance('$mmaRemoteStyles');
    var self = {},
        remoteStylesEl = angular.element(document.querySelector('#mobilecssurl'));
        self.clear = function() {
        remoteStylesEl.html('');
    };
        self.get = function(siteid) {
        var promise;
        siteid = siteid || $mmSite.getId();
        if (!siteid) {
            return $q.reject();
        }
        function downloadFileAndRemoveOld(url) {
            return $mmFilepool.getFileStateByUrl(siteid, url).then(function(state) {
                return state !== mmCoreNotDownloaded;
            }).catch(function() {
                return true;
            }).then(function(isDownloaded) {
                if (!isDownloaded) {
                    return $mmFilepool.removeFilesByComponent(siteid, mmaRemoteStylesComponent, 1);
                }
            }).then(function() {
                return $mmFilepool.downloadUrl(siteid, url, false, mmaRemoteStylesComponent, 1);
            });
        }
        return $mmSitesManager.getSite(siteid).then(function(site) {
            var infos = site.getInfo();
            if (infos && infos.mobilecssurl) {
                if ($mmFS.isAvailable()) {
                    return downloadFileAndRemoveOld(infos.mobilecssurl);
                } else {
                    return infos.mobilecssurl;
                }
            } else {
                if (infos.mobilecssurl === '') {
                    $mmFilepool.removeFilesByComponent(siteid, mmaRemoteStylesComponent, 1)
                }
                return $q.reject();
            }
        }).then(function(url) {
            $log.debug('Loading styles from: '+url);
            return $http.get(url);
        }).then(function(response) {
            if (typeof response.data == 'string') {
                return response.data;
            } else {
                return $q.reject();
            }
        });
    };
        self.load = function() {
        var siteid = $mmSite.getId();
        if (siteid) {
            self.get(siteid).then(function(styles) {
                if (siteid === $mmSite.getId()) {
                    remoteStylesEl.html(styles);
                }
            });
        }
    };
    return self;
}]);

angular.module('mm.core')

.constant('mmCoreConfigConstants', {
    "app_id" : "com.moodle.moodlemobile",
    "versioncode" : "2011",
    "versionname" : "3.0.0",
    "cache_expiration_time" : 300000,
    "default_lang" : "en",
    "languages": {"ar": "عربي", "bg": "Български", "ca": "Català", "cs": "Čeština", "da": "Dansk", "de": "Deutsch","en": "English", "es": "Español", "es-mx": "Español - México", "eu": "Euskara", "fa": "فارسی", "fr" : "Français", "he" : "עברית", "hu": "magyar", "it": "Italiano", "ja": "日本語","nl": "Nederlands", "pl": "Polski", "pt-br": "Português - Brasil", "pt": "Português - Portugal", "ro": "Română", "ru": "Русский", "sv": "Svenska", "tr" : "Türkçe", "zh-cn" : "简体中文", "zh-tw" : "正體中文"},
    "wsservice" : "moodle_mobile_app",
    "wsextservice" : "local_mobile",
    "demo_sites": {"student": {"url": "http://school.demo.moodle.net", "username": "student", "password": "moodle"}, "teacher": {"url": "http://school.demo.moodle.net", "username": "teacher", "password": "moodle"}, "cva": {"url": "http://mm.cvaconsulting.com/moodle", "username": "student", "password": "student"}},
    "gcmpn": "694767596569",
    "customurlscheme": "moodlemobile"
}
);