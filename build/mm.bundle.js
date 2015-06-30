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

angular.module('mm', ['ionic', 'mm.core', 'mm.core.course', 'mm.core.courses', 'mm.core.login', 'mm.core.settings', 'mm.core.sidemenu', 'mm.core.user', 'mm.addons.calendar', 'mm.addons.files', 'mm.addons.frontpage', 'mm.addons.grades', 'mm.addons.messages', 'mm.addons.mod_assign', 'mm.addons.mod_folder', 'mm.addons.mod_forum', 'mm.addons.mod_label', 'mm.addons.mod_page', 'mm.addons.mod_resource', 'mm.addons.mod_url', 'mm.addons.notes', 'mm.addons.notifications', 'mm.addons.participants', 'mm.addons.pushnotifications', 'mm.addons.remotestyles', 'ngCordova', 'angular-md5', 'pascalprecht.translate'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

angular.module('mm.core', ['pascalprecht.translate'])
.constant('mmCoreSessionExpired', 'mmCoreSessionExpired')
.constant('mmCoreSecondsDay', 86400)
.config(function($stateProvider, $provide, $ionicConfigProvider, $httpProvider, $mmUtilProvider,
        $mmLogProvider, $compileProvider) {
    $ionicConfigProvider.platform.android.tabs.position('bottom');
    $provide.decorator('$ionicPlatform', ['$delegate', '$window', function($delegate, $window) {
        $delegate.isTablet = function() {
            var mq = 'only screen and (min-width: 768px) and (-webkit-min-device-pixel-ratio: 1)';
            return $window.matchMedia(mq).matches;
        };
        return $delegate;
    }]);
        $provide.decorator('$log', ['$delegate', $mmLogProvider.logDecorator]);
    var $mmStateProvider = {
        state: function(name, stateConfig) {
            function setupTablet(state) {
                if (!state.tablet) {
                    return;
                }
                if (angular.isString(state.tablet)) {
                    state.tablet = {
                        parent: state.tablet
                    }
                }
                var params = state.tablet,
                    parent = params.parent,
                    node = params.node || 'tablet',
                    config = {};
                delete state['tablet'];
                delete params['node'];
                delete params['parent'];
                angular.copy(state, config);
                angular.extend(config, params);
                if (config.views.length > 1) {
                    console.log('Cannot guess the view data to use for tablet state of ' + name);
                    return;
                }
                var viewName, viewData;
                angular.forEach(config.views, function(v, k) {
                    viewName = k;
                    viewData = v;
                }, this);
                delete config.views[viewName];
                config.views['tablet'] = viewData;
                $stateProvider.state.apply($stateProvider, [parent + '.' + node, config]);
            }
            setupTablet.apply(this, [stateConfig]);
            $stateProvider.state.apply($stateProvider, [name, stateConfig]);
            return this;
        }
    };
    $stateProvider
        .state('redirect', {
            url: '/redirect',
            params: {
                siteid: null,
                state: null,
                params: null
            },
            controller: function($scope, $state, $stateParams, $mmSite, $mmSitesManager, $ionicHistory) {
                function goToSitesList() {
                    $ionicHistory.nextViewOptions({
                        disableBack: true
                    });
                    $state.go('mm_login.sites');
                }
                function loadSiteAndGo() {
                    $mmSitesManager.loadSite($stateParams.siteid).then(function() {
                        $state.go($stateParams.state, $stateParams.params);
                    }, function() {
                        goToSitesList();
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
                            goToSitesList();
                        }
                    }
                });
            }
        });
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.transformRequest = [function(data) {
        return angular.isObject(data) && String(data) !== '[object File]' ? $mmUtilProvider.param(data) : data;
    }];
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|geo|file):/);
})
.run(function($ionicPlatform, $ionicBody, $window) {
    $ionicPlatform.ready(function() {
        var checkTablet = function() {
            $ionicBody.enableClass($ionicPlatform.isTablet(), 'tablet');
        };
        ionic.on('resize', checkTablet, $window);
        checkTablet();
    });
});

angular.module('mm.core')
.provider('$mmApp', function() {
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
    this.$get = function($mmDB, $cordovaNetwork, $q) {
        var db = $mmDB.getDB(DBNAME, dbschema, dboptions),
            self = {};
                self.getDB = function() {
            return db;
        };
                self.getSchema = function() {
            return dbschema;
        };
                self.isOnline = function() {
            return typeof navigator.connection === 'undefined' || $cordovaNetwork.isOnline();
        };
                self.isNetworkAccessLimited = function() {
            if (typeof navigator.connection === 'undefined') {
                return false;
            }
            var type = $cordovaNetwork.getNetwork();
            var limited = [Connection.CELL_2G, Connection.CELL_3G, Connection.CELL_4G, Connection.CELL];
            return limited.indexOf(type) > -1;
        };
        return self;
    };
});

angular.module('mm.core')
.constant('mmCoreConfigStore', 'config')
.config(function($mmAppProvider, mmCoreConfigStore) {
    var stores = [
        {
            name: mmCoreConfigStore,
            keyPath: 'name'
        }
    ];
    $mmAppProvider.registerStores(stores);
})
.factory('$mmConfig', function($http, $q, $log, $mmApp, mmCoreConfigStore) {
    $log = $log.getInstance('$mmConfig');
    var initialized = false,
        self = {
            config: {}
        };
    function init() {
        var deferred = $q.defer();
        $http.get('config.json').then(function(response) {
            var data = response.data;
            for (var name in data) {
                self.config[name] = data[name];
            }
            initialized = true;
            deferred.resolve();
        }, deferred.reject);
        return deferred.promise;
    };
        self.get = function(name, defaultValue) {
        if (!initialized) {
            return init().then(function() {
                return getConfig(name);
            }, function() {
                $log.error('Failed to initialize $mmConfig.');
                return $q.reject();
            });
        }
        return getConfig(name);
        function getConfig(name) {
            var deferred = $q.defer(),
                value = self.config[name];
            if (typeof value == 'undefined') {
                $mmApp.getDB().get(mmCoreConfigStore, name).then(function(entry) {
                    deferred.resolve(entry.value);
                }, function() {
                    if (typeof defaultValue != 'undefined') {
                        deferred.resolve(defaultValue);
                    } else {
                        deferred.reject();
                    }
                });
            } else {
                deferred.resolve(value);
            }
            return deferred.promise;
        }
    };
        self.set = function(name, value) {
        if (!initialized) {
            return init().then(function() {
                return setConfig(name, value);
            }, function() {
                $log.error('Failed to initialize $mmConfig.');
                return $q.reject();
            });
        }
        return setConfig(name, value);
        function setConfig(name, value) {
            var deferred,
                fromStatic = self.config[name];
            if (typeof(fromStatic) === 'undefined') {
                return $mmApp.getDB().insert(mmCoreConfigStore, {name: name, value: value});
            }
            $log.error('Cannot save static config setting \'' + name + '\'.');
            deferred = $q.defer()
            deferred.reject();
            return deferred.promise;
        }
    };
        self.delete = function(name) {
        if (!initialized) {
            return init().then(function() {
                return deleteConfig(name);
            }, function() {
                $log.error('Failed to initialize $mmConfig.');
                return $q.reject();
            });
        }
        return deleteConfig(name);
        function deleteConfig(name) {
            var deferred,
                fromStatic = self.config[name];
            if (typeof(fromStatic) === 'undefined') {
                return $mmApp.getDB().remove(mmCoreConfigStore, name);
            }
            $log.error('Cannot delete static config setting \'' + name + '\'.');
            deferred = $q.defer()
            deferred.reject();
            return deferred.promise;
        }
    };
    return self;
});

angular.module('mm.core')
.factory('$mmDB', function($q, $log) {
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
                                query: function(store, where, order, reverse, limit) {
                    return doQuery(db, store, where, order, reverse, limit);
                },
                                remove: function(store, id) {
                    return callDBFunction(db, 'remove', store, id);
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
                }
            };
        }
        return dbInstances[name];
    };
        self.deleteDB = function(name) {
        delete dbInstances[name];
        return ydn.db.deleteDatabase(name);
    };
    return self;
});

angular.module('mm.core')
.constant('mmCoreEventSessionExpired', 'session_expired')
.constant('mmCoreEventLogin', 'login')
.constant('mmCoreEventLogout', 'logout')
.constant('mmCoreEventLanguageChanged', 'language_changed')
.constant('mmCoreEventSiteAdded', 'site_added')
.constant('mmCoreEventSiteUpdated', 'site_updated')
.factory('$mmEvents', function($log, md5) {
    $log = $log.getInstance('$mmEvents');
    var self = {},
        observers = {},
        uniqueEvents = {},
        uniqueEventsData = {};
        self.on = function(eventName, callBack) {
        if (uniqueEvents[eventName]) {
            callBack(uniqueEventsData[eventName]);
            return;
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
});

angular.module('mm.core')
.constant('mmFilepoolQueueProcessInterval', 300)
.constant('mmFilepoolFolder', 'filepool')
.constant('mmFilepoolStore', 'filepool')
.constant('mmFilepoolQueueStore', 'files_queue')
.constant('mmFilepoolLinksStore', 'files_links')
.config(function($mmAppProvider, $mmSitesFactoryProvider, mmFilepoolStore, mmFilepoolLinksStore, mmFilepoolQueueStore) {
    var siteStores = [
        {
            name: mmFilepoolStore,
            keyPath: 'fileId',
            indexes: [
                {
                    name: 'modified',
                }
            ]
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
})
.factory('$mmFilepool', function($q, $log, $timeout, $mmApp, $mmFS, $mmWS, $mmSitesManager, $mmEvents, md5, mmFilepoolStore,
        mmFilepoolLinksStore, mmFilepoolQueueStore, mmFilepoolFolder, mmFilepoolQueueProcessInterval) {
    $log = $log.getInstance('$mmFilepool');
    var self = {},
        extensionRegex = new RegExp('^[a-z0-9]+$'),
        tokenRegex = new RegExp('(\\?|&)token=([A-Za-z0-9]+)'),
        queueState,
        urlAttributes = [
            tokenRegex,
            new RegExp('(\\?|&)forcedownload=[0-1]')
        ],
        revisionRegex = new RegExp('/content/([0-9]+)/');
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
        fileUrl = self._removeRevisionFromUrl(fileUrl);
        var fileId = self._getFileIdByUrl(fileUrl);
        return self._addFileLink(siteId, fileId, component, componentId);
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
        self.addToQueueByUrl = function(siteId, url, component, componentId, priority) {
        var db = $mmApp.getDB(),
            fileId,
            now = new Date(),
            link,
            revision;
        revision = self._getRevisionFromUrl(url);
        url = self._removeRevisionFromUrl(url);
        fileId = self._getFileIdByUrl(url);
        priority = priority || 0;
        if (typeof component !== 'undefined') {
            link = {
                component: component,
                componentId: componentId
            };
        }
        return db.get(mmFilepoolQueueStore, [siteId, fileId]).then(function(fileObject) {
            var foundLink = false,
                update = false;
            if (fileObject) {
                if (fileObject.priority < priority) {
                    update = true;
                    fileObject.priority = priority;
                }
                if (revision && fileObject.revision != revision) {
                    update = true;
                    fileObject.revision = revision;
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
                    return db.insert(mmFilepoolQueueStore, fileObject);
                }
                var response = (function() {
                    var deferred = $q.defer();
                    deferred.resolve([fileObject.siteId, fileObject.fileId]);
                    return deferred.promise;
                })();
                $log.debug('File ' + fileId + ' already in queue and does not require update');
                return response;
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
                url: url,
                revision: revision,
                links: link ? [link] : []
            }).then(function(result) {
                self.checkQueueProcessing();
                return result;
            });
        }
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
        self.downloadUrl = function(siteId, fileUrl, ignoreStale, component, componentId) {
        var fileId,
            now = new Date(),
            promise,
            revision;
        revision = self._getRevisionFromUrl(fileUrl);
        fileUrl = self._removeRevisionFromUrl(fileUrl);
        fileId = self._getFileIdByUrl(fileUrl);
        if (!$mmFS.isAvailable()) {
            return $q.reject();
        }
        promise = self._hasFileInPool(siteId, fileId).then(function(fileObject) {
            if (typeof fileObject === 'undefined') {
                return self._downloadForPoolByUrl(siteId, fileUrl, revision);
            } else if ((fileObject.stale || revision > fileObject.revision) && $mmApp.isOnline() && !ignoreStale) {
                return self._downloadForPoolByUrl(siteId, fileUrl, revision, fileObject);
            }
            return self._getInternalUrlById(siteId, fileId).then(function(response) {
                return response;
            }, function() {
                return self._downloadForPoolByUrl(siteId, fileUrl, revision, fileObject);
            });
        }, function() {
            return self._downloadForPoolByUrl(siteId, fileUrl, revision);
        });
        return promise.then(function(response) {
            if (typeof component !== 'undefined') {
                self._addFileLink(siteId, fileId, component, componentId);
            }
            return response;
        });
    };
        self._downloadForPoolByUrl = function(siteId, fileUrl, revision, poolFileObject) {
        var fileId = self._getFileIdByUrl(fileUrl),
            filePath = self._getFilePath(siteId, fileId);
        if (poolFileObject && poolFileObject.fileId !== fileId) {
            $log.error('Invalid object to update passed');
            return $q.reject();
        }
        return $mmWS.downloadFile(fileUrl, filePath).then(function(fileEntry) {
            var now = new Date(),
                data = poolFileObject || {};
            data.modified = now.getTime();
            data.stale = false;
            data.url = fileUrl;
            data.revision = revision;
            return self._addFileToPool(siteId, fileId, data).then(function() {
                return fileEntry.toURL();
            });
        });
    };
        self._fixComponentId = function(componentId) {
        if (!componentId) {
            return -1;
        }
        return parseInt(componentId, 10);
    };
        self._getFileEventName = function(siteId, fileId) {
        return 'mmFilepoolFile:'+siteId+':'+fileId;
    };
        self.getFileEventNameByUrl = function(siteId, fileUrl) {
        fileUrl = self._removeRevisionFromUrl(fileUrl);
        var fileId = self._getFileIdByUrl(fileUrl);
        return self._getFileEventName(siteId, fileId);
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
        self._getFileIdByUrl = function(fileUrl) {
        var url = fileUrl,
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
        self._getFileUrlByUrl = function(siteId, fileUrl, mode, component, componentId) {
        var fileId,
            revision;
        revision = self._getRevisionFromUrl(fileUrl);
        fileUrl = self._removeRevisionFromUrl(fileUrl);
        var fileId = self._getFileIdByUrl(fileUrl);
        return self._hasFileInPool(siteId, fileId).then(function(fileObject) {
            var response,
                addToQueue = false,
                fn;
            if (typeof fileObject === 'undefined') {
                self.addToQueueByUrl(siteId, fileUrl, component, componentId);
                response = fileUrl;
            } else if ((fileObject.stale || revision > fileObject.revision) && $mmApp.isOnline()) {
                self.addToQueueByUrl(siteId, fileUrl, component, componentId);
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
                    self.addToQueueByUrl(siteId, fileUrl, component, componentId);
                    if ($mmApp.isOnline()) {
                        return fileUrl;
                    }
                    return $q.reject();
                });
            }
            return response;
        }, function() {
            self.addToQueueByUrl(siteId, fileUrl, component, componentId);
            return fileUrl;
        });
    };
        self._getFilePath = function(siteId, fileId) {
        return $mmFS.getSiteFolder(siteId) + '/' + mmFilepoolFolder + '/' + fileId;
    };
        self.getFilePathByUrl = function(siteId, fileUrl) {
        var fileId = self._getFileIdByUrl(fileUrl);
        return self._getFilePath(siteId, fileId);
    };
        self.getFileStateByUrl = function(siteId, fileUrl) {
        var fileId,
            revision;
        revision = self._getRevisionFromUrl(fileUrl);
        fileUrl = self._removeRevisionFromUrl(fileUrl);
        fileId = self._getFileIdByUrl(fileUrl);
        return self._hasFileInQueue(siteId, fileId).then(function() {
            return self.FILEDOWNLOADING;
        }, function() {
            return self._hasFileInPool(siteId, fileId).then(function(fileObject) {
                if (fileObject.stale || revision > fileObject.revision) {
                    return self.FILEOUTDATED;
                } else {
                    return self.FILEDOWNLOADED;
                }
            }, function() {
                return self.FILENOTDOWNLOADED;
            });
        });
    };
        self._getInternalSrcById = function(siteId, fileId) {
        if ($mmFS.isAvailable()) {
            return $mmFS.getFile(self._getFilePath(siteId, fileId)).then(function(fileEntry) {
                return fileEntry.toInternalURL();
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
        self._getRevisionFromUrl = function(url) {
        var matches = url.match(revisionRegex);
        if (matches && typeof matches[1] != 'undefined') {
            return parseInt(matches[1]);
        }
    };
        self.getSrcByUrl = function(siteId, fileUrl, component, componentId) {
        return self._getFileUrlByUrl(siteId, fileUrl, 'src', component, componentId);
    };
        self.getUrlByUrl = function(siteId, fileUrl, component, componentId) {
        return self._getFileUrlByUrl(siteId, fileUrl, 'url', component, componentId);
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
        self.invalidateFileByUrl = function(siteId, fileUrl) {
        fileUrl = self._removeRevisionFromUrl(fileUrl);
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
        self._notifyFileDownloaded = function(siteId, fileId) {
        $mmEvents.trigger(self._getFileEventName(siteId, fileId), {success: true});
    };
        self._notifyFileDownloadError = function(siteId, fileId) {
        $mmEvents.trigger(self._getFileEventName(siteId, fileId), {success: false});
    };
        self._processQueue = function() {
        var deferred = $q.defer(),
            now = new Date(),
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
            links = item.links || [];
        $log.debug('Processing queue item: ' + siteId + ', ' + fileId);
        return getSiteDb(siteId).then(function(db) {
            return db.get(mmFilepoolStore, fileId).then(function(fileObject) {
                if (fileObject && !fileObject.stale) {
                    self._addFileLinks(siteId, fileId, links);
                    self._removeFromQueue(siteId, fileId);
                    $log.debug('Queued file already in store, ignoring...');
                    self._notifyFileDownloaded(siteId, fileId);
                    return;
                }
                return download(siteId, fileUrl, fileObject, links);
            }, function() {
                return download(siteId, fileUrl, undefined, links);
            });
        });
                function download(siteId, fileUrl, fileObject, links) {
            return self._downloadForPoolByUrl(siteId, fileUrl, revision, fileObject).then(function() {
                var promise,
                    deferred;
                self._addFileLinks(siteId, fileId, links);
                promise = self._removeFromQueue(siteId, fileId);
                self._notifyFileDownloaded(siteId, fileId);
                deferred = $q.defer();
                promise.then(deferred.resolve, deferred.resolve);
                return deferred.promise;
            }, function(errorObject) {
                var dropFromQueue = false;
                if (typeof errorObject !== 'undefined' && errorObject.source === fileUrl) {
                    if (errorObject.code === 1) {
                        dropFromQueue = true;
                    } else if (errorObject.code === 2) {
                        dropFromQueue = true;
                    } else if (errorObject.code === 3) {
                        if (errorObject.http_status === 401) {
                            dropFromQueue = true;
                        } else if (!errorObject.http_status) {
                            dropFromQueue = true;
                        } else {
                            dropFromQueue = true;
                        }
                    } else if (errorObject.code === 4) {
                    } else if (errorObject.code === 5) {
                        dropFromQueue = true;
                    } else {
                        dropFromQueue = true;
                    }
                }
                if (dropFromQueue) {
                    var deferred,
                        promise;
                    $log.debug('Item dropped from queue due to error: ' + fileUrl);
                    promise = self._removeFromQueue(siteId, fileId);
                    deferred = $q.defer();
                    promise.then(deferred.resolve, deferred.resolve).finally(function() {
                        self._notifyFileDownloadError(siteId, fileId);
                    });
                    return deferred.promise;
                } else {
                    self._notifyFileDownloadError(siteId, fileId);
                    return $q.reject();
                }
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
            p3 = $mmFS.removeFile(self._getFilePath(siteId, fileId));
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
        self._removeRevisionFromUrl = function(url) {
        return url.replace(revisionRegex, '/content/0/');
    };
    return self;
})
.run(function($log, $ionicPlatform, $timeout, $mmFilepool) {
    $log = $log.getInstance('$mmFilepool');
    $ionicPlatform.ready(function() {
        $timeout($mmFilepool.checkQueueProcessing, 1000);
    });
});

angular.module('mm.core')
.constant('mmFsSitesFolder', 'sites')
.constant('mmFsTmpFolder', 'tmp')
.factory('$mmFS', function($ionicPlatform, $cordovaFile, $log, $q, mmFsSitesFolder, mmFsTmpFolder) {
    $log = $log.getInstance('$mmFS');
    var self = {},
        initialized = false,
        basePath = '';
    self.FORMATTEXT         = 0;
    self.FORMATDATAURL      = 1;
    self.FORMATBINARYSTRING = 2;
    self.FORMATARRAYBUFFER  = 3;
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
            } else {
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
        return (typeof cordova !== 'undefined' && typeof cordova.file !== 'undefined');
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
        if (ionic.Platform.isIOS()) {
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
        self.getTmpFolder = function() {
        return mmFsTmpFolder;
    };
        self.moveFile = function(originalPath, newPath) {
        return self.init().then(function() {
            return $cordovaFile.moveFile(basePath, originalPath, basePath, newPath);
        });
    };
        self.copyFile = function(from, to) {
        return self.init().then(function() {
            return $cordovaFile.copyFile(basePath, from, basePath, to);
        });
    };
    return self;
});

angular.module('mm.core')
.factory('$mmGroups', function($log, $q, $mmSite, $mmSitesManager) {
    $log = $log.getInstance('$mmGroups');
        self.getUserGroups = function(courses, refresh, siteid) {
        var userid = $mmSite.getUserId(),
            promises = [],
            groups = [],
            deferred = $q.defer();
        angular.forEach(courses, function(course) {
            var courseid;
            if (typeof(course) == 'object') {
                courseid = course.id;
            } else {
                courseid = course;
            }
            var promise = self.getUserGroupsInCourse(userid, courseid, refresh, siteid);
            promises.push(promise);
            promise.then(function(response) {
                if (response.groups && response.groups.length > 0) {
                    groups = groups.concat(response.groups);
                }
            });
        });
        $q.all(promises).finally(function() {
            deferred.resolve(groups);
        });
        return deferred.promise;
    };
        self.getUserGroupsInCourse = function(userid, courseid, refresh, siteid) {
        siteid = siteid || $mmSite.getId();
        var presets = {},
            data = {
                userid: userid,
                courseid: courseid
            };
        if (refresh) {
            presets.getFromCache = false;
        }
        return $mmSitesManager.getSite(siteid).then(function(site) {
            return site.read('core_group_get_course_user_groups', data, presets);
        });
    };
    return self;
});

angular.module('mm.core')
.factory('$mmLang', function($translate, $translatePartialLoader, $mmConfig, $cordovaGlobalization, $q) {
    var self = {};
        self.registerLanguageFolder = function(path) {
        $translatePartialLoader.addPart(path);
    };
        self.getCurrentLanguage = function() {
        function getDefaultLanguage() {
            return $mmConfig.get('default_lang').then(function(language) {
                return language;
            }, function() {
                return 'en';
            });
        }
        return $mmConfig.get('current_language').then(function(language) {
            return language;
        }, function() {
            try {
                return $cordovaGlobalization.getPreferredLanguage().then(function(result) {
                    var language = result.value.toLowerCase();
                    if (language.indexOf('-') > -1) {
                        return $mmConfig.get('languages').then(function(languages) {
                            if (typeof languages[language] == 'undefined') {
                                language = language.substr(0, language.indexOf('-'));
                            }
                            return language;
                        }, function() {
                            return language;
                        });
                    } else {
                        return language;
                    }
                }, function() {
                    return getDefaultLanguage();
                });
            } catch(err) {
                return getDefaultLanguage();
            }
        });
    };
        self.changeCurrentLanguage = function(language) {
        var p1 = $translate.use(language),
            p2 = $mmConfig.set('current_language', language);
        return $q.all(p1, p2);
    };
        self.translateErrorAndReject = function(deferred, errorkey) {
        $translate(errorkey).then(function(errorMessage) {
            deferred.reject(errorMessage);
        }, function() {
            deferred.reject(errorkey);
        });
    };
    return self;
})
.config(function($translateProvider, $translatePartialLoaderProvider) {
    $translateProvider.useLoader('$translatePartialLoader', {
        urlTemplate: '{part}/{lang}.json'
    });
    $translatePartialLoaderProvider.addPart('build/lang');
    $translateProvider.fallbackLanguage('en');
    $translateProvider.preferredLanguage('en');
})
.run(function($ionicPlatform, $translate, $mmLang) {
    $ionicPlatform.ready(function() {
        $mmLang.getCurrentLanguage().then(function(language) {
            $translate.use(language);
        });
    });
});
angular.module('mm.core')
.constant('mmCoreNotificationsSitesStore', 'notification_sites')
.constant('mmCoreNotificationsComponentsStore', 'notification_components')
.constant('mmCoreNotificationsTriggeredStore', 'notifications_triggered')
.config(function($mmAppProvider, mmCoreNotificationsSitesStore, mmCoreNotificationsComponentsStore,
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
})
.factory('$mmLocalNotifications', function($log, $mmSitesManager, $mmSite, $cordovaLocalNotification, $mmApp,
        mmCoreNotificationsSitesStore, mmCoreNotificationsComponentsStore, mmCoreNotificationsTriggeredStore) {
    $log = $log.getInstance('$mmLocalNotifications');
    var self = {},
        observers = {};
        function getCode(store, id) {
        var db = $mmApp.getDB();
        return db.get(store, id).then(function(entry) {
            return entry.code;
        }, function() {
            return db.query(store, undefined, 'code', true).then(function(entries) {
                var newid = 0;
                if (entries.length > 0) {
                    newid = parseInt(entries[0].code) + 1;
                }
                return db.insert(store, {id: id, code: newid}).then(function() {
                    return newid;
                });
            });
        });
    }
        function getSiteCode(siteid) {
        siteid = siteid || $mmSite.getId();
        return getCode(mmCoreNotificationsSitesStore, siteid);
    }
        function getComponentCode(component) {
        return getCode(mmCoreNotificationsComponentsStore, component);
    }
        function getUniqueNotificationId(notificationid, component, siteid) {
        return getSiteCode(siteid).then(function(sitecode) {
            return getComponentCode(component).then(function(componentcode) {
                return sitecode * 100000000 + componentcode * 10000000 + notificationid;
            });
        });
    }
        self.cancel = function(id, component, siteid) {
        return getUniqueNotificationId(id, component, siteid).then(function(uniqueId) {
            return $cordovaLocalNotification.cancel(uniqueId);
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
        self.registerClick = function(name, callback) {
        $log.debug("Register observer '"+name+"' for notification click.");
        observers[name] = callback;
    };
        self.removeTriggered = function(id) {
        return $mmApp.getDB().remove(mmCoreNotificationsTriggeredStore, id);
    };
        self.schedule = function(notification, component, siteid) {
        return getUniqueNotificationId(notification.id, component, siteid).then(function(uniqueId) {
            notification.id = uniqueId;
            notification.data = notification.data || {};
            notification.data.component = component;
            return self.isTriggered(notification).then(function(triggered) {
                if (!triggered) {
                    self.removeTriggered(notification.id);
                    return $cordovaLocalNotification.schedule(notification);
                }
            });
        });
    };
        self.trigger = function(notification) {
        $mmApp.getDB().insert(mmCoreNotificationsTriggeredStore, {
            id: parseInt(notification.id),
            at: parseInt(notification.at)
        });
    };
    return self;
})
.run(function($rootScope, $log, $mmLocalNotifications, $cordovaLocalNotification) { window.cln = $cordovaLocalNotification;
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
});

angular.module('mm.core')
.constant('mmCoreLogEnabledDefault', true)
.constant('mmCoreLogEnabledConfigName', 'debug_enabled')
.provider('$mmLog', function(mmCoreLogEnabledDefault) {
    var isEnabled = mmCoreLogEnabledDefault,
        self = this;
    function prepareLogFn(logFn, className) {
        className = className || '';
        var enhancedLogFn = function() {
            if (isEnabled) {
                var args = Array.prototype.slice.call(arguments),
                    now  = new Date().toLocaleString();
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
    this.$get = function($mmConfig, mmCoreLogEnabledDefault, mmCoreLogEnabledConfigName) {
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
    };
})
.run(function($mmLog) {
    $mmLog.init();
});

angular.module('mm.core')
.factory('$mmModuleActionsDelegate', function($log) {
    $log = $log.getInstance('$mmModuleActionsDelegate');
    var handlers = {},
        self = {};
        self.registerModuleHandler = function(name, callback) {
        $log.debug("Registered handler '" + name + "' as module handler.");
        handlers[name] = callback;
    };
        self.getActionsFor = function(url, courseid) {
        for (var name in handlers) {
            var callback = handlers[name];
            if (typeof callback == 'function') {
                var data = callback(url, courseid);
                if (data) {
                    return data;
                }
            }
        }
    };
    return self;
});

angular.module('mm.core')
.factory('$mmSite', function($mmSitesManager, $mmSitesFactory) {
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
});

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
    this.$get = function($http, $q, $mmWS, $mmDB, $mmConfig, $log, md5, $mmApp, $mmLang, $mmUtil, $mmFS,
        mmCoreWSCacheStore, mmCoreWSPrefix, mmCoreSessionExpired, $mmEvents, mmCoreEventSessionExpired) {
        $log = $log.getInstance('$mmSite');
                var deprecatedFunctions = {
            "core_grade_get_definitions": "core_grading_get_definitions",
            "moodle_course_create_courses": "core_course_create_courses",
            "moodle_course_get_courses": "core_course_get_courses",
            "moodle_enrol_get_enrolled_users": "core_enrol_get_enrolled_users",
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
            method = getCompatibleFunction(site, method);
            if (site.getInfo() && !site.wsAvailable(method, false)) {
                if (site.wsAvailable(mmCoreWSPrefix + method, false)) {
                    $log.info("Using compatibility WS method '" + mmCoreWSPrefix + method + "'");
                    method = mmCoreWSPrefix + method;
                } else {
                    $log.error("WS function '" + method + "' is not available, even in compatibility mode.");
                    $mmLang.translateErrorAndReject(deferred, 'mm.core.wsfunctionnotavailable');
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
                var mustSaveToCache = preSets.saveToCache;
                var cacheKey = preSets.cacheKey;
                var emergencyCache = typeof preSets.emergencyCache !== 'undefined' ? preSets.emergencyCache : true;
                delete preSets.getFromCache;
                delete preSets.saveToCache;
                delete preSets.omitExpires;
                delete preSets.cacheKey;
                delete preSets.emergencyCache;
                $mmWS.call(method, data, preSets).then(function(response) {
                    if (mustSaveToCache) {
                        saveToCache(site, method, data, response, cacheKey);
                    }
                    deferred.resolve(response);
                }, function(error) {
                    if (error === mmCoreSessionExpired) {
                        $mmLang.translateErrorAndReject(deferred, 'mm.core.lostconnection');
                        $mmEvents.trigger(mmCoreEventSessionExpired, {siteid: site.id});
                    } else if (!emergencyCache) {
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
            var deferred = $q.defer();
            if ($mmFS.isAvailable()) {
                var siteFolder = $mmFS.getSiteFolder(this.id);
                $mmFS.removeDir(siteFolder).then(deferred.resolve, deferred.resolve);
            } else {
                deferred.resolve();
            }
            return deferred.promise;
        };
                Site.prototype.getDocsUrl = function(page) {
            var release = this.infos.release ? this.infos.release : undefined;
            return $mmUtil.getDocsUrl(release, page);
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
                function getCompatibleFunction(site, method) {
            if (typeof deprecatedFunctions[method] !== "undefined") {
                if (site.wsAvailable(deprecatedFunctions[method])) {
                    $log.warn("You are using deprecated Web Services: " + method +
                        " you must replace it with the newer function: " + deprecatedFunctions[method]);
                    return deprecatedFunctions[method];
                } else {
                    $log.warn("You are using deprecated Web Services. " +
                        "Your remote site seems to be outdated, consider upgrade it to the latest Moodle version.");
                }
            } else if (!site.wsAvailable(method)) {
                for (var oldFunc in deprecatedFunctions) {
                    if (deprecatedFunctions[oldFunc] === method && site.wsAvailable(oldFunc)) {
                        $log.warn("Your remote site doesn't support the function " + method +
                            ", it seems to be outdated, consider upgrade it to the latest Moodle version.");
                        return oldFunc;
                    }
                }
            }
            return method;
        }
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
                deferred = $q.defer(),
                id = md5.createHash(method + ':' + JSON.stringify(data));
            if (!db) {
                deferred.reject();
            } else {
                $mmConfig.get('cache_expiration_time').then(function(cacheExpirationTime) {
                    var entry = {
                        id: id,
                        data: response
                    };
                    entry.expirationtime = new Date().getTime() + cacheExpirationTime;
                    if (cacheKey) {
                        entry.key = cacheKey;
                    }
                    db.insert(mmCoreWSCacheStore, entry);
                    deferred.resolve();
                }, deferred.reject);
            }
            return deferred.promise;
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
    };
});

angular.module('mm.core')
.constant('mmCoreSitesStore', 'sites')
.constant('mmCoreCurrentSiteStore', 'current_site')
.config(function($mmAppProvider, mmCoreSitesStore, mmCoreCurrentSiteStore) {
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
})
.factory('$mmSitesManager', function($http, $q, $mmSitesFactory, md5, $mmLang, $mmConfig, $mmApp, $mmWS, $mmUtil, $mmFS, $mmEvents,
            mmCoreSitesStore, mmCoreCurrentSiteStore, mmCoreEventLogin, mmCoreEventLogout, $log, mmCoreEventSiteUpdated,
            mmCoreEventSiteAdded) {
    $log = $log.getInstance('$mmSitesManager');
    var self = {},
        services = {},
        db = $mmApp.getDB(),
        sessionRestored = false,
        currentSite,
        sites = {};
        self.getDemoSiteData = function(siteurl) {
        return $mmConfig.get('demo_sites').then(function(demo_sites) {
            if (typeof(demo_sites) !== 'undefined' && typeof(demo_sites[siteurl]) !== 'undefined') {
                return demo_sites[siteurl];
            } else {
                return $q.reject();
            }
        });
    };
        self.checkSite = function(siteurl, protocol) {
        var deferred = $q.defer();
        siteurl = $mmUtil.formatURL(siteurl);
        if (siteurl.indexOf('://localhost') == -1 && !$mmUtil.isValidURL(siteurl)) {
            $mmLang.translateErrorAndReject(deferred, 'mm.login.invalidsite');
        } else {
            protocol = protocol || "https://";
            siteurl = siteurl.replace(/^http(s)?\:\/\//i, protocol);
            self.siteExists(siteurl).then(function() {
                checkMobileLocalPlugin(siteurl).then(function(code) {
                    deferred.resolve({siteurl: siteurl, code: code});
                }, function(error) {
                    deferred.reject(error);
                });
            }, function(error) {
                if (siteurl.indexOf("https://") === 0) {
                    self.checkSite(siteurl, "http://").then(deferred.resolve, deferred.reject);
                } else{
                    $mmLang.translateErrorAndReject(deferred, 'mm.core.cannotconnect');
                }
            });
        }
        return deferred.promise;
    };
        self.siteExists = function(siteurl) {
        return $http.head(siteurl + '/login/token.php', {timeout: 15000});
    };
        function checkMobileLocalPlugin(siteurl) {
        var deferred = $q.defer();
        delete services[siteurl];
        $mmConfig.get('wsextservice').then(function(service) {
            $http.post(siteurl + '/local/mobile/check.php', {service: service} )
                .success(function(response) {
                    if (typeof(response.code) == "undefined") {
                        $mmLang.translateErrorAndReject(deferred, 'mm.core.unexpectederror');
                        return;
                    }
                    var code = parseInt(response.code, 10);
                    if (response.error) {
                        switch (code) {
                            case 1:
                                $mmLang.translateErrorAndReject(deferred, 'mm.login.siteinmaintenance');
                                break;
                            case 2:
                                $mmLang.translateErrorAndReject(deferred, 'mm.login.webservicesnotenabled');
                                break;
                            case 3:
                                deferred.resolve(0);
                                break;
                            case 4:
                                $mmLang.translateErrorAndReject(deferred, 'mm.login.mobileservicesnotenabled');
                                break;
                            default:
                                $mmLang.translateErrorAndReject(deferred, 'mm.core.unexpectederror');
                        }
                    } else {
                        services[siteurl] = service;
                        deferred.resolve(code);
                    }
                })
                .error(function(data) {
                    deferred.resolve(0);
                });
        }, function() {
            deferred.resolve(0);
        });
        return deferred.promise;
    };
        self.getUserToken = function(siteurl, username, password, retry) {
        retry = retry || false;
        var deferred = $q.defer();
        determineService(siteurl).then(function(service) {
            var loginurl = siteurl + '/login/token.php';
            var data = {
                username: username,
                password: password,
                service: service
            };
            $http.post(loginurl, data).success(function(response) {
                if (typeof(response.token) != 'undefined') {
                    deferred.resolve(response.token);
                } else {
                    if (typeof(response.error) != 'undefined') {
                        if (!retry && response.errorcode == "requirecorrectaccess") {
                            siteurl = siteurl.replace("https://", "https://www.");
                            siteurl = siteurl.replace("http://", "http://www.");
                            logindata.siteurl = siteurl;
                            self.getUserToken(siteurl, username, password, true).then(deferred.resolve, deferred.reject);
                        } else {
                            deferred.reject(response.error);
                        }
                    } else {
                        $mmLang.translateErrorAndReject(deferred, 'mm.login.invalidaccount');
                    }
                }
            }).error(function(data) {
                $mmLang.translateErrorAndReject(deferred, 'mm.core.cannotconnect');
            });
        }, deferred.reject);
        return deferred.promise;
    };
        self.newSite = function(siteurl, token) {
        var deferred = $q.defer();
        var candidateSite = $mmSitesFactory.makeSite(undefined, siteurl, token);
        candidateSite.fetchSiteInfo().then(function(infos) {
            if (isValidMoodleVersion(infos.functions)) {
                if (typeof infos.downloadfiles == 'undefined' || infos.downloadfiles === 1) {
                    var siteid = self.createSiteID(infos.siteurl, infos.username);
                    self.addSite(siteid, siteurl, token, infos);
                    candidateSite.setId(siteid);
                    candidateSite.setInfo(infos);
                    currentSite = candidateSite;
                    self.login(siteid);
                    $mmEvents.trigger(mmCoreEventSiteAdded);
                    deferred.resolve();
                } else {
                    $mmLang.translateErrorAndReject(deferred, 'mm.login.cannotdownloadfiles');
                }
            } else {
                $mmLang.translateErrorAndReject(deferred, 'mm.login.invalidmoodleversion');
            }
        }, function(error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };
        self.createSiteID = function(siteurl, username) {
        return md5.createHash(siteurl + username);
    };
        function determineService(siteurl) {
        var deferred = $q.defer();
        siteurl = siteurl.replace("https://", "http://");
        if (services[siteurl]) {
            deferred.resolve(services[siteurl]);
            return deferred.promise;
        }
        siteurl = siteurl.replace("http://", "https://");
        if (services[siteurl]) {
            deferred.resolve(services[siteurl]);
            return deferred.promise;
        }
        $mmConfig.get('wsservice').then(deferred.resolve, deferred.reject);
        return deferred.promise;
    };
        function isValidMoodleVersion(sitefunctions) {
        for(var i = 0; i < sitefunctions.length; i++) {
            if (sitefunctions[i].name.indexOf("component_strings") > -1) {
                return true;
            }
        }
        return false;
    };
        self.addSite = function(id, siteurl, token, infos) {
        db.insert(mmCoreSitesStore, {
            id: id,
            siteurl: siteurl,
            token: token,
            infos: infos
        });
    };
        self.loadSite = function(siteid) {
        $log.debug('Load site '+siteid);
        var deferred = $q.defer();
        self.getSite(siteid).then(function(site) {
            self.updateSiteInfo(siteid).finally(function() {
                var infos = site.getInfo();
                if (typeof infos.downloadfiles != 'undefined' && infos.downloadfiles !== 1) {
                    $mmLang.translateErrorAndReject(deferred, 'mm.login.cannotdownloadfiles');
                } else {
                    currentSite = site;
                    self.login(siteid);
                    deferred.resolve();
                }
            });
        }, deferred.reject);
        return deferred.promise;
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
                return db.remove(mmCoreSitesStore, siteid).then(function() {
                    return site.deleteFolder();
                }, function() {
                    return site.deleteFolder();
                });
            });
        });
    };
        self.hasNoSites = function() {
        return db.count(mmCoreSitesStore).then(function(count) {
            if (count > 0) {
                return $q.reject();
            }
        });
    };
        self.hasSites = function() {
        return db.count(mmCoreSitesStore).then(function(count) {
            if (count == 0) {
                return $q.reject();
            }
        });
    };
        self.getSite = function(siteId) {
        var deferred = $q.defer();
        if (currentSite && currentSite.getId() === siteId) {
            deferred.resolve(currentSite);
        } else if (typeof sites[siteId] != 'undefined') {
            deferred.resolve(sites[siteId]);
        } else {
            db.get(mmCoreSitesStore, siteId).then(function(site) {
                var site = $mmSitesFactory.makeSite(siteId, site.siteurl, site.token, site.infos);
                sites[siteId] = site;
                deferred.resolve(site);
            }, deferred.reject);
        }
        return deferred.promise;
    };
        self.getSiteDb = function(siteId) {
        return self.getSite(siteId).then(function(site) {
            return site.getDb();
        });
    };
        self.getSites = function() {
        return db.getAll(mmCoreSitesStore).then(function(sites) {
            var formattedSites = [];
            angular.forEach(sites, function(site) {
                formattedSites.push({
                    id: site.id,
                    siteurl: site.siteurl,
                    fullname: site.infos.fullname,
                    sitename: site.infos.sitename,
                    avatar: site.infos.userpictureurl
                });
            });
            return formattedSites;
        });
    };
        self.getSitesIds = function() {
        return db.getAll(mmCoreSitesStore).then(function(sites) {
            var ids = [];
            angular.forEach(sites, function(site) {
                ids.push(site.id);
            });
            return ids;
        });
    };
        self.getMoodleFilePath = function (fileurl, courseId, siteId) {
        if (!fileurl) {
            return $q.reject();
        }
        if (!courseId) {
            courseId = 1;
        }
        if (!siteId) {
            if (typeof currentSite == 'undefined') {
                return $q.reject();
            }
            siteId = currentSite.getId();
        }
        return self.getSite(siteId).then(function(site) {
            var downloadURL = site.fixPluginfileURL(fileurl);
            var extension = "." + fileurl.split('.').pop();
            if (extension.indexOf(".php") === 0) {
                extension = "";
            }
            var filename = md5.createHash(fileurl) + extension;
            var path = {
                directory: siteId + "/" + courseId,
                file:      siteId + "/" + courseId + "/" + filename
            };
            var getFileFromFS = (function() {
                if ($mmFS.isAvailable()) {
                    return $mmFS.getFile(path.file);
                }
                return $q.reject();
            })();
            return getFileFromFS.then(function(fileEntry) {
                $log.debug('File ' + downloadURL + ' already downloaded.');
                return fileEntry.toInternalURL();
            }, function() {
                if ($mmApp.isOnline()) {
                    $log.debug('File ' + downloadURL + ' not downloaded. Lets download.');
                    return $mmWS.downloadFile(downloadURL, path.file).then(function(fileEntry) {
                        return fileEntry.toInternalURL();
                    }, function(err) {
                        return downloadURL;
                    });
                } else {
                    $log.debug('File ' + downloadURL + ' not downloaded, but the device is offline.');
                    return downloadURL;
                }
            });
        });
    };
        self.login = function(siteid) {
        db.insert(mmCoreCurrentSiteStore, {
            id: 1,
            siteid: siteid
        });
        $mmEvents.trigger(mmCoreEventLogin);
    };
        self.logout = function() {
        currentSite = undefined;
        $mmEvents.trigger(mmCoreEventLogout);
        return db.remove(mmCoreCurrentSiteStore, 1);
    }
        self.restoreSession = function() {
        if (sessionRestored) {
            return $q.reject();
        }
        sessionRestored = true;
        return db.get(mmCoreCurrentSiteStore, 1).then(function(current_site) {
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
            return db.insert(mmCoreSitesStore, {
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
                return db.insert(mmCoreSitesStore, {
                    id: siteid,
                    siteurl: site.getURL(),
                    token: site.getToken(),
                    infos: infos
                }).finally(function() {
                    $mmEvents.trigger(mmCoreEventSiteUpdated);
                });
            });
        });
    };
        self.updateSiteInfoByUrl = function(siteurl, username) {
        var siteid = self.createSiteID(siteurl, username);
        return self.updateSiteInfo(siteid);
    };
    return self;
});

angular.module('mm.core')
.factory('$mmText', function($q, $mmSite, $mmLang, $translate) {
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
    }
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
            text = text.substr(0, length - 1);
            var lastWordPos = text.lastIndexOf(' ');
            if (lastWordPos > 0) {
                text = text.substr(0, lastWordPos);
            }
            text += '&hellip;';
        }
        return text;
    };
        self.treatMultilangTags = function(text) {
        var deferred = $q.defer();
        if (!text) {
            deferred.resolve('');
            return deferred.promise;
        }
        return $mmLang.getCurrentLanguage().then(function(language) {
            var re = new RegExp('<(?:lang|span)[^>]+lang="' + language + '"[^>]*>(.*?)<\/(?:lang|span)>',"g");
            text = text.replace(re, "$1");
            text = text.replace(/<(?:lang|span)[^>]+lang="([a-zA-Z0-9_-]+)"[^>]*>(.*?)<\/(?:lang|span)>/g,"");
            return text;
        });
    };
    return self;
});

angular.module('mm.core')
.factory('$mmURLDelegate', function($log) {
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
})
.run(function($mmURLDelegate, $log) {
    window.handleOpenURL = function(url) {
        $log.debug('App launched by URL.');
        $mmURLDelegate.notify(url);
    };
});

angular.module('mm.core')
.provider('$mmUtil', function() {
    var self = this;
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
    this.$get = function($ionicLoading, $ionicPopup, $translate, $http, $log, $q, $mmLang, $mmFS) {
        $log = $log.getInstance('$mmUtil');
        var self = {},
            countries;
        var mimeTypes = {};
        $http.get('core/assets/mimetypes.json').then(function(response) {
            mimeTypes = response.data;
        }, function() {
        });
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
                self.getFileExtension = function(filename) {
            var dot = filename.lastIndexOf("."),
                ext;
            if (dot > -1) {
                ext = filename.substr(dot + 1).toLowerCase();
            }
            return ext;
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
                self.isPluginFileUrl = function(url) {
            return url && (url.indexOf('/pluginfile.php') !== -1);
        };
                self.isValidURL = function(url) {
            return /^http(s)?\:\/\/([\da-zA-Z\.-]+)\.([\da-zA-Z\.]{2,6})([\/\w \.-]*)*\/?/i.test(url);
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
            if (url.indexOf('?file=') != -1 || url.indexOf('?forcedownload=') != -1) {
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
                self.getIframeSrc = function(files, index) {
            var iframeDir = 'iframe';
            return $mmFS.getDir(iframeDir).then(function() {
                return $mmFS.removeDir(iframeDir);
            }).catch(function() {
            }).then(function() {
                return $mmFS.createDir(iframeDir);
            }).then(function() {
                var promises = [];
                angular.forEach(files, function(localPath, iframePath) {
                    var promise,
                        path = iframeDir + '/' + iframePath;
                    promise = $mmFS.createFile(path).then(function() {
                        return $mmFS.copyFile(localPath, path);
                    });
                    promises.push(promise);
                });
                return $q.all(promises);
            }).then(function() {
                return $mmFS.getFile(iframeDir + '/' + index);
            }).then(function(file) {
                return file.toURL();
            });
        };
                self.openFile = function(path) {
            if (false) {
            } else if (window.plugins) {
                var extension = self.getFileExtension(path),
                    mimetype;
                if (extension && mimeTypes[extension]) {
                    mimetype = mimeTypes[extension];
                }
                if (ionic.Platform.isAndroid() && window.plugins.webintent) {
                    var iParams = {
                        action: "android.intent.action.VIEW",
                        url: path,
                        type: mimetype.type
                    };
                    window.plugins.webintent.startActivity(
                        iParams,
                        function() {
                            $log.debug('Intent launched');
                        },
                        function() {
                            $log.debug('Intent launching failed');
                            $log.debug('action: ' + iParams.action);
                            $log.debug('url: ' + iParams.url);
                            $log.debug('type: ' + iParams.type);
                            window.open(path, '_system');
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
                            },
                            function(error) {
                                $log.debug('Error opening with handleDocumentWithURL' + path);
                                if(error == 53) {
                                    $log.error('No app that handles this file type.');
                                }
                                self.openInBrowser(path);
                            },
                            path
                        );
                    });
                } else {
                    self.openInBrowser(path);
                }
            } else {
                $log.debug('Opening external file using window.open()');
                window.open(path, '_blank');
            }
        };
                self.openInBrowser = function(url) {
            window.open(url, '_system');
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
                self.showErrorModal = function(errorMessage, needsTranslate) {
            var errorKey = 'mm.core.error',
                langKeys = [errorKey];
            if (needsTranslate) {
                langKeys.push(errorMessage);
            }
            $translate(langKeys).then(function(translations) {
                $ionicPopup.alert({
                    title: translations[errorKey],
                    template: needsTranslate ? translations[errorMessage] : errorMessage
                });
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
                self.readJSONFile = function(path) {
            return $http.get(path).then(function(response) {
                return response.data;
            });
        };
                self.getCountries = function() {
            var deferred = $q.defer();
            if (typeof(countries) !== 'undefined') {
                deferred.resolve(countries);
            } else {
                self.readJSONFile('core/assets/countries.json').then(function(data) {
                    countries = data;
                    deferred.resolve(countries);
                }, function(){
                    deferred.resolve();
                });
            }
            return deferred.promise;
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
        return self;
    };
});

angular.module('mm.core')
.factory('$mmWS', function($http, $q, $log, $mmLang, $cordovaFileTransfer, $mmApp, $mmFS, mmCoreSessionExpired) {
    $log = $log.getInstance('$mmWS');
    var self = {};
        self.call = function(method, data, preSets) {
        var deferred = $q.defer(),
            siteurl;
        data = convertValuesToString(data);
        if (typeof(preSets) === 'undefined' || preSets == null ||
                typeof(preSets.wstoken) === 'undefined' || typeof(preSets.siteurl) === 'undefined') {
            $mmLang.translateErrorAndReject(deferred, 'mm.core.unexpectederror');
            return deferred.promise;
        } else if (!$mmApp.isOnline()) {
            $mmLang.translateErrorAndReject(deferred, 'mm.core.networkerrormsg');
            return deferred.promise;
        }
        data.wsfunction = method;
        data.wstoken = preSets.wstoken;
        siteurl = preSets.siteurl + '/webservice/rest/server.php?moodlewsrestformat=json';
        var ajaxData = data;
        $http.post(siteurl, ajaxData).then(function(data) {
            if ((!data || !data.data) && !preSets.responseExpected) {
                data = {};
            } else {
                data = data.data;
            }
            if (!data) {
                $mmLang.translateErrorAndReject(deferred, 'mm.core.cannotconnect');
                return;
            }
            if (typeof(data.exception) !== 'undefined') {
                if (data.errorcode == 'invalidtoken' ||
                        (data.errorcode == 'accessexception' && data.message.indexOf('Invalid token - token expired') > -1)) {
                    $log.error("Critical error: " + JSON.stringify(data));
                    deferred.reject(mmCoreSessionExpired);
                } else {
                    deferred.reject(data.message);
                }
                return;
            }
            if (typeof(data.debuginfo) != 'undefined') {
                deferred.reject('Error. ' + data.message);
                return;
            }
            $log.info('WS: Data received from WS ' + typeof(data));
            if (typeof(data) == 'object' && typeof(data.length) != 'undefined') {
                $log.info('WS: Data number of elements '+ data.length);
            }
            deferred.resolve(angular.copy(data));
        }, function(error) {
            $mmLang.translateErrorAndReject(deferred, 'mm.core.cannotconnect');
        });
        return deferred.promise;
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
    };
        self.downloadFile = function(url, path, background) {
        $log.debug('Downloading file ' + url);
        return $mmFS.getBasePath().then(function(basePath) {
            var tmpPath = basePath + path + '.tmp';
            return $cordovaFileTransfer.download(url, tmpPath, { encodeURI: false }, true).then(function(result) {
                return $mmFS.moveFile(path + '.tmp', path).then(function(movedEntry) {
                    $log.debug('Success downloading file ' + url + ' to ' + path);
                    return movedEntry;
                });
            }, function(err) {
                $log.error('Error downloading ' + url + ' to ' + path);
                $log.error(JSON.stringify(err));
                return $q.reject(err);
            });
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
    return self;
});

angular.module('mm.core')
.filter('mmBytesToSize', function($mmText) {
    return function(text) {
        return $mmText.bytesToSize(text);
    };
});
angular.module('mm.core')
.filter('mmCreateLinks', function() {
    var replacePattern = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])(?![^<]*>|[^<>]*<\/)/gim;
    return function(text) {
        return text.replace(replacePattern, '<a href="$1">$1</a>');
    };
});
angular.module('mm.core')
.filter('mmDateDayOrTime', function($filter) {
  return function(timestamp) {
    var d = new Date(timestamp * 1000);
    var todayStarts = new Date();
    var todayEnds = new Date();
    var sixDayStarts = new Date();
    var yearStarts = new Date();
    var yearEnds = new Date();
    var monthStarts = new Date();
    var monthEnds = new Date();
    var dateStarts = new Date(d);
    var dateEnds = new Date(d);
    todayStarts.setHours(0, 0, 0, 0);
    todayEnds.setHours(23, 59, 59, 999);
    dateStarts.setHours(0, 0, 0, 0);
    dateEnds.setHours(23, 59, 59, 999);
    sixDayStarts.setHours(0, 0, 0, 0);
    sixDayStarts = new Date(sixDayStarts.getTime() - (3600 * 24 * 6 * 1000));
    monthStarts.setHours(0, 0, 0, 0);
    monthStarts.setDate(1);
    monthEnds = new Date(monthEnds.getFullYear(), monthEnds.getMonth() + 1, 0);
    monthEnds.setHours(23, 59, 59, 999);
    yearStarts = new Date(yearStarts.getFullYear() - 1, 12, 1);
    yearStarts.setHours(0, 0, 0, 0);
    yearEnds = new Date(yearEnds.getFullYear(), 12, 0);
    yearEnds.setHours(23, 59, 59, 999);
    if (d >= todayStarts && d <= todayEnds) {
      return $filter('date')(d, 'h:mm a');
    } else if (d >= sixDayStarts && d < todayStarts) {
      return $filter('date')(d, 'EEE');
    } else if (d >= monthStarts && d <= monthEnds) {
      return $filter('date')(d, 'EEE, d');
    } else if (d >= yearStarts && d <= yearEnds) {
      return $filter('date')(d, 'MMM d');
    } else {
      return $filter('date')(d, 'd MMM yy');
    }
  };
});

angular.module('mm.core')
.filter('mmNoTags', function() {
    return function(text) {
        return String(text).replace(/(<([^>]+)>)/ig, '');
    }
});
angular.module('mm.core')
.filter('mmTimeAgo', function($translate) {
    return function(timestamp) {
        timestamp *= 1000;
        var seconds = Math.floor((new Date() - timestamp) / 1000);
        var stringName;
        var interval = Math.floor(seconds / 31536000);
        if (interval >= 1) {
            stringName = 'numyears';
        } else {
            interval = Math.floor(seconds / 2592000);
            if (interval >= 1) {
                stringName = 'nummonths';
            } else {
                interval = Math.floor(seconds / 86400);
                if (interval >= 1) {
                    stringName = 'numdays';
                } else {
                    interval = Math.floor(seconds / 3600);
                    if (interval >= 1) {
                        stringName = 'numhours';
                    } else {
                        interval = Math.floor(seconds / 60);
                        if (interval >= 1) {
                            stringName = 'numminutes';
                        } else {
                            interval = seconds;
                            stringName = 'numseconds';
                        }
                    }
                }
            }
        }
        return $translate.instant('mm.core.'+stringName, {number: interval});
    };
});

angular.module('mm.core')
.directive('mmBrowser', function($mmUtil) {
    return {
        restrict: 'A',
        priority: 100,
        link: function(scope, element, attrs) {
            element.on('click', function(event) {
                var href = element[0].getAttribute('href');
                if (href) {
                    event.preventDefault();
                    if (href.indexOf('cdvfile://') === 0 || href.indexOf('file://') === 0) {
                        $mmUtil.openFile(href);
                    } else {
                        $mmUtil.openInBrowser(href);
                    }
                }
            });
        }
    };
});

angular.module('mm.core')
.directive('mmExternalContent', function($log, $mmFilepool, $mmSite, $mmSitesManager, $mmUtil) {
    $log = $log.getInstance('mmExternalContent');
    function handleExternalContent(siteId, dom, targetAttr, url, component, componentId) {
        if (!url || !$mmUtil.isPluginFileUrl(url)) {
            $log.debug('Ignoring non-pluginfile URL: ' + url);
            return;
        }
        $mmSitesManager.getSite(siteId).then(function(site) {
            var pluginfileURL = $mmUtil.fixPluginfileURL(url, site.token),
                fn;
            if (!pluginfileURL) {
                $log.debug('Ignoring invalid pluginfile URL');
                return;
            } else if (targetAttr === 'src') {
                fn = $mmFilepool.getSrcByUrl;
            } else {
                fn = $mmFilepool.getUrlByUrl;
            }
            fn(siteId, pluginfileURL, component, componentId).then(function(finalUrl) {
                $log.debug('Using URL ' + finalUrl + ' for ' + url);
                dom.setAttribute(targetAttr, finalUrl);
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
                component = attrs.component,
                componentId = attrs.componentId,
                targetAttr,
                observe = false,
                url;
            if (dom.tagName === 'A') {
                targetAttr = 'href';
                if (attrs.hasOwnProperty('ngHref')) {
                    observe = true;
                }
            } else if (dom.tagName === 'IMG') {
                targetAttr = 'src';
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
                    handleExternalContent(scope.siteid || $mmSite.getId(), dom, targetAttr, url, component, componentId);
                });
            } else {
                handleExternalContent(scope.siteid || $mmSite.getId(), dom, targetAttr, attrs[targetAttr], component, componentId);
            }
        }
    };
});

angular.module('mm.core')
.directive('mmFile', function($q, $mmUtil, $mmFilepool, $mmSite, $mmApp, $mmEvents) {
    function getState(scope, siteid, fileurl) {
        return $mmFilepool.getFileStateByUrl(siteid, fileurl).then(function(state) {
            scope.isDownloaded = state === $mmFilepool.FILEDOWNLOADED || state === $mmFilepool.FILEOUTDATED;
            scope.isDownloading = state === $mmFilepool.FILEDOWNLOADING;
            scope.showDownload = state === $mmFilepool.FILENOTDOWNLOADED || state === $mmFilepool.FILEOUTDATED;
        });
    }
    function downloadFile(scope, siteid, fileurl, component, componentid) {
        scope.isDownloading = true;
        return $mmFilepool.downloadUrl(siteid, fileurl, true, component, componentid).then(function(localUrl) {
            getState(scope, siteid, fileurl);
            return localUrl;
        }, function() {
            $mmUtil.showErrorModal('mm.core.errordownloadingfile', true);
            return getState(scope, siteid, fileurl).then(function() {
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
            var fileurl = $mmSite.fixPluginfileURL(scope.file.fileurl),
                filename = scope.file.filename,
                siteid = $mmSite.getId(),
                component = attrs.component,
                componentid = attrs.componentId,
                eventName = $mmFilepool.getFileEventNameByUrl(siteid, fileurl);
            scope.filename = filename;
            scope.fileicon = $mmUtil.getFileIcon(filename);
            getState(scope, siteid, fileurl);
            var observer = $mmEvents.on(eventName, function(data) {
                getState(scope, siteid, fileurl);
                if (!data.success) {
                    $mmUtil.showErrorModal('mm.core.errordownloadingfile', true);
                }
            });
            scope.download = function(e, openAfterDownload) {
                e.preventDefault();
                e.stopPropagation();
                if (scope.isDownloading) {
                    return;
                }
                if (!$mmApp.isOnline() && (!openAfterDownload || (openAfterDownload && !scope.isDownloaded))) {
                    $mmUtil.showErrorModal('mm.core.networkerrormsg', true);
                    return;
                }
                if (openAfterDownload) {
                    downloadFile(scope, siteid, fileurl, component, componentid).then(function(localUrl) {
                        $mmUtil.openFile(localUrl);
                    });
                } else {
                    $mmFilepool.invalidateFileByUrl(siteid, fileurl).finally(function() {
                        scope.isDownloading = true;
                        $mmFilepool.addToQueueByUrl(siteid, fileurl, component, componentid);
                    });
                }
            }
            scope.$on('$destroy', function() {
                observer.off();
            });
        }
    };
});

angular.module('mm.core')
.directive('mmFormatText', function($interpolate, $mmText, $compile) {
    var extractVariableRegex = new RegExp('{{([^|]+)(|.*)?}}', 'i');
    function treatContents(scope, element, attrs, text) {
        var siteId = scope.siteid,
            component = attrs.component,
            componentId = attrs.componentId,
            afterRender = attrs.afterRender;
        if (typeof text == 'undefined') {
            element.removeClass('hide');
            return;
        }
        text = $interpolate(text)(scope);
        text = text.trim();
        $mmText.formatText(text, attrs.clean, attrs.singleline, attrs.shorten).then(function(formatted) {
            var dom = angular.element('<div>').html(formatted);
            angular.forEach(dom.find('img'), function(img) {
                img.setAttribute('mm-external-content', '');
                if (component) {
                    img.setAttribute('component', component);
                    if (componentId) {
                        img.setAttribute('component-id', componentId);
                    }
                }
                if (siteId) {
                    img.setAttribute('siteid', siteId);
                }
            });
            angular.forEach(dom.find('a'), function(anchor) {
                anchor.setAttribute('mm-external-content', '');
                anchor.setAttribute('mm-browser', '');
                if (component) {
                    anchor.setAttribute('component', component);
                    if (componentId) {
                        anchor.setAttribute('component-id', componentId);
                    }
                }
                if (siteId) {
                    anchor.setAttribute('siteid', siteId);
                }
            });
            element.html(dom.html());
            element.removeClass('hide');
            $compile(element.contents())(scope);
            if (afterRender && scope[afterRender]) {
                scope[afterRender](scope);
            }
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
                        treatContents(scope, element, attrs, content);
                    });
                }
            } else {
                treatContents(scope, element, attrs, content);
            }
        }
    };
});

angular.module('mm.core')
.directive('mmIframe', function($mmUtil) {
    return {
        restrict: 'E',
        template: '<div class="iframe-wrapper"><iframe class="mm-iframe" ng-src="{{src}}"></iframe></div>',
        scope: {
            src: '='
        },
        link: function(scope, element, attrs) {
            var iframe = angular.element(element.find('iframe')[0]);
            iframe.on('load', function() {
                angular.forEach(iframe.contents().find('a'), function(el) {
                    var href = el.getAttribute('href');
                    if (href.indexOf('http') === 0) {
                        angular.element(el).on('click', function(e) {
                            $mmUtil.openInBrowser(href);
                            e.preventDefault();
                        });
                    }
                });
            });
        }
    };
});

angular.module('mm.core')
.directive('mmLoading', function($translate) {
        function findLoadingAndContent(element, obj) {
        var divs = element.find('div');
        for (var i = 0; i < divs.length && (typeof(obj.loading) == 'undefined' || typeof(obj.content) == 'undefined'); i++) {
            var className = divs[i].className;
            if (className.indexOf('mm-loading-container') > -1) {
                obj.loading = angular.element(divs[i]);
            } else if(className.indexOf('mm-loading-content') > -1) {
                obj.content = angular.element(divs[i]);
            }
        }
    }
    function setMessage(element, message) {
        var p = element.find('p');
        for (var i = 0; i < p.length; i++) {
            var className = p[i].className;
            if (className.indexOf('mm-loading-message') > -1) {
                p[i].innerHTML = message;
            }
        }
    }
    return {
        restrict: 'E',
        templateUrl: 'core/templates/loading.html',
        transclude: true,
        link: function(scope, element, attrs) {
            var children = {};
            if (attrs.message) {
                setMessage(element, attrs.message);
            } else {
                $translate('mm.core.loading').then(function(loadingString) {
                    setMessage(element, loadingString);
                });
            }
            if (attrs.hideUntil) {
                findLoadingAndContent(element, children);
                scope.$watch(attrs.hideUntil, function(newValue) {
                    if (newValue) {
                        children.loading.addClass('hide');
                        children.content.removeClass('hide');
                    } else {
                        children.content.addClass('hide');
                        children.loading.removeClass('hide');
                    }
                });
            }
        }
    };
});

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

angular.module('mm.core.course', [])
.config(function($stateProvider) {
    $stateProvider
    .state('site.mm_course', {
        url: '/mm_course',
        params: {
            course: null
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
            courseid: null,
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
})
.run(function($mmEvents, mmCoreEventLogin, $mmCourseDelegate, $mmCoursesDelegate) {
    $mmEvents.on(mmCoreEventLogin, function() {
        $mmCourseDelegate.updateContentHandlers();
    });
    $mmCoursesDelegate.registerPlugin('mmCourse', function() {
        return {
            icon: 'ion-briefcase',
            title: 'mm.course.contents',
            state: 'site.mm_course'
        };
    });
});

angular.module('mm.core.courses', [])
.value('mmCoursesFrontPage', {
    'id': 1,
    'shortname': '',
    'fullname': '',
    'enrolledusercount': 0,
    'idnumber': '',
    'visible': 1
})
.config(function($stateProvider) {
    $stateProvider
    .state('site.mm_courses', {
        url: '/mm_courses',
        views: {
            'site': {
                templateUrl: 'core/components/courses/templates/list.html',
                controller: 'mmCoursesListCtrl'
            }
        }
    });
});

angular.module('mm.core.login', [])
.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('mm_login', {
        url: '/mm_login',
        abstract: true,
        templateUrl: 'core/components/login/templates/base.html',
        cache: false,  
        onEnter: function($ionicHistory, $state, $mmSitesManager, $mmSite) {
            $ionicHistory.clearHistory();
        }
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
        onEnter: function($state, $mmSitesManager) {
            $mmSitesManager.hasNoSites().then(function() {
                $state.go('mm_login.site');
            });
        }
    })
    .state('mm_login.site', {
        url: '/site',
        templateUrl: 'core/components/login/templates/site.html',
        controller: 'mmLoginSiteCtrl',
        onEnter: function($ionicNavBarDelegate, $ionicHistory, $mmSitesManager) {
            $mmSitesManager.hasNoSites().then(function() {
                $ionicNavBarDelegate.showBackButton(false);
                $ionicHistory.clearHistory();
            });
        }
    })
    .state('mm_login.credentials', {
        url: '/cred',
        templateUrl: 'core/components/login/templates/credentials.html',
        controller: 'mmLoginCredentialsCtrl',
        params: {
            siteurl: ''
        },
        onEnter: function($state, $stateParams) {
            if (!$stateParams.siteurl) {
              $state.go('mm_login.init');
            }
        }
    })
    .state('mm_login.reconnect', {
        url: '/reconnect',
        templateUrl: 'core/components/login/templates/reconnect.html',
        controller: 'mmLoginReconnectCtrl',
        cache: false,
        params: {
            siteurl: '',
            username: ''
        }
    });
    $urlRouterProvider.otherwise(function($injector, $location) {
        var $state = $injector.get('$state');
        return $state.href('mm_login.init').replace('#', '');
    });
})
.run(function($log, $state, $mmUtil, $translate, $mmSitesManager, $rootScope, $mmSite, $mmURLDelegate, $ionicHistory,
                $mmEvents, $mmLoginHelper, mmCoreEventSessionExpired) {
    $log = $log.getInstance('mmLogin');
    $mmEvents.on(mmCoreEventSessionExpired, sessionExpired);
    $mmURLDelegate.register('mmLoginSSO', appLaunchedByURL);
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        if (toState.name.substr(0, 8) === 'redirect') {
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
            $state.transitionTo('site.mm_courses');
        }
    });
    function sessionExpired(data) {
        var siteurl = $mmSite.getURL();
        if (typeof(siteurl) !== 'undefined') {
            if (typeof data != 'undefined') {
                if (data.siteid !== $mmSite.getId()) {
                    return;
                }
            }
            $mmSitesManager.checkSite(siteurl).then(function(result) {
                if ($mmLoginHelper.isSSOLoginNeeded(result.code)) {
                    $mmUtil.showConfirm($translate('mm.login.reconnectssodescription')).then(function() {
                        $mmLoginHelper.openBrowserForSSOLogin(siteurl);
                    });
                } else {
                    var info = $mmSite.getInfo();
                    if (typeof(info) !== 'undefined' && typeof(info.username) !== 'undefined') {
                        $state.go('mm_login.reconnect', {siteurl: siteurl, username: info.username});
                    }
                }
            });
        }
    }
    function appLaunchedByURL(url) {
        var ssoScheme = 'moodlemobile://token=';
        if (url.indexOf(ssoScheme) == -1) {
            return false;
        }
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
            $mmLoginHelper.handleSSOLoginAuthentication(sitedata.siteurl, sitedata.token).then(function() {
                $state.go('site.mm_courses');
            }, function(error) {
                $mmUtil.showErrorModal(error);
            }).finally(function() {
                modal.dismiss();
            });
        }, function(errorMessage) {
            modal.dismiss();
            if (typeof(errorMessage) === 'string' && errorMessage != '') {
                $mmUtil.showErrorModal(errorMessage);
            }
        });
        return true;
    }
});

angular.module('mm.core.settings', [])
.config(function($stateProvider) {
    $stateProvider
    .state('site.mm_settings', {
        url: '/mm_settings',
        views: {
            'site': {
                templateUrl: 'core/components/settings/templates/list.html',
                controller: 'mmSettingsListCtrl'
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
    });
});

angular.module('mm.core.sidemenu', [])
.config(function($stateProvider) {
    $stateProvider
    .state('site', {
        url: '/site',
        templateUrl: 'core/components/sidemenu/templates/menu.html',
        controller: 'mmSideMenuCtrl',
        abstract: true,
        cache: false,
        onEnter: function($ionicHistory, $state, $mmSite, $timeout) {
            $ionicHistory.clearHistory();
            if (!$mmSite.isLoggedIn()) {
                $state.go('mm_login.init');
            }
        }
    });
});

angular.module('mm.core.user', [])
.value('mmUserProfileState', 'site.mm_user-profile')
.config(function($stateProvider) {
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
});

angular.module('mm.core.course')
.controller('mmCourseModContentCtrl', function($log, $stateParams, $scope) {
    $log = $log.getInstance('mmCourseModContentCtrl');
    var module = $stateParams.module || {};
    $scope.description = module.description;
    $scope.title = module.name;
    $scope.url = module.url;
});

angular.module('mm.core.course')
.controller('mmCourseSectionCtrl', function($mmCourseDelegate, $mmCourse, $mmUtil, $scope, $stateParams, $translate, $mmSite) {
    var courseid = $stateParams.courseid || 1,
        sectionid = $stateParams.sectionid || -1,
        sections = [];
    if (sectionid < 0) {
        $translate('mm.course.allsections').then(function(str) {
            $scope.title = str;
        });
        $scope.summary = null;
    }
    function loadContent(sectionid, refresh) {
        if (sectionid < 0) {
            return $mmCourse.getSections(courseid, refresh).then(function(sections) {
                angular.forEach(sections, function(section) {
                    angular.forEach(section.modules, function(module) {
                        module._controller =
                                $mmCourseDelegate.getContentHandlerControllerFor(module.modname, module, courseid, section.id);
                    });
                });
                $scope.sections = sections;
                $mmSite.write('core_course_view_course', {
                    courseid: courseid,
                    sectionnumber: 0
                });
            }, function() {
                $mmUtil.showErrorModal('mm.course.couldnotloadsectioncontent', true);
            });
        } else {
            return $mmCourse.getSection(courseid, sectionid, refresh).then(function(section) {
                angular.forEach(section.modules, function(module) {
                    module._controller =
                            $mmCourseDelegate.getContentHandlerControllerFor(module.modname, module, courseid, section.id);
                });
                $scope.sections = [section];
                $scope.title = section.name;
                $scope.summary = section.summary;
                $mmSite.write('core_course_view_course', {
                    courseid: courseid,
                    sectionnumber: sectionid
                });
            }, function() {
                $mmUtil.showErrorModal('mm.course.couldnotloadsectioncontent', true);
            });
        }
    }
    $scope.doRefresh = function() {
        loadContent(sectionid, true).finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
    loadContent(sectionid).finally(function() {
        $scope.sectionLoaded = true;
    });
});

angular.module('mm.core.course')
.controller('mmCourseSectionsCtrl', function($mmCourse, $mmUtil, $scope, $stateParams, $translate, $mmText) {
    var course = $stateParams.course,
        courseid = course.id;
    $scope.courseid = courseid;
    $scope.fullname = course.fullname;
    function loadSections(refresh) {
        return $mmCourse.getSections(courseid, refresh).then(function(sections) {
            $translate('mm.course.showall').then(function(str) {
                var result = [{
                    name: str,
                    id: -1
                }].concat(sections);
                $scope.sections = result;
            });
        }, function(error) {
            $mmUtil.showErrorModal('mm.course.couldnotloadsections', true);
        });
    }
    $scope.getState = function() {
        return 'site.mm_course-section';
    };
    $scope.doRefresh = function() {
        loadSections(true).finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
    loadSections().finally(function() {
        $scope.sectionsLoaded = true;
    });
});

angular.module('mm.core.course')
.directive('mmCourseModDescription', function() {
    return {
        compile: function(element, attrs) {
            if (attrs.watch) {
                element.find('mm-format-text').attr('watch', attrs.watch);
            }
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
.factory('$mmCourseContentHandler', function($mmCourse, $mmUtil) {
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
});

angular.module('mm.core.course')
.factory('$mmCourse', function($mmSite, $translate, $q, $log) {
    $log = $log.getInstance('$mmCourse');
    var self = {},
        mods = ["assign", "assignment", "book", "chat", "choice", "data", "database", "date", "external-tool",
            "feedback", "file", "folder", "forum", "glossary", "ims", "imscp", "label", "lesson", "lti", "page", "quiz",
            "resource", "scorm", "survey", "url", "wiki", "workshop"
        ];
        self.getModule = function(courseid, moduleid, sectionid) {
        if (!moduleid) {
            return $q.reject();
        }
        $log.debug('Getting module ' + moduleid + ' in course ' + courseid + ' and section ' +sectionid);
        var params = {
                courseid: courseid,
                options: [
                    {
                        name: 'cmid',
                        value: moduleid
                    }
                ]
            },
            preSets = {
                cacheKey: getModuleCacheKey(moduleid)
            };
        if (sectionid) {
            params.options.push({
                name: 'sectionid',
                value: sectionid
            });
        }
        return $mmSite.read('core_course_get_contents', params, preSets).then(function(sections) {
            var section,
                module;
            for (var i = 0; i < sections.length; i++) {
                section = sections[i];
                for (var j = 0; j < section.modules.length; j++) {
                    module = section.modules[i];
                    if (module.id === moduleid) {
                        return module;
                    }
                }
            }
            return $q.reject();
        });
    };
        function getModuleCacheKey(moduleid) {
        return 'mmCourse:module:' + moduleid;
    }
        self.getModuleIconSrc = function(moduleName) {
        if (mods.indexOf(moduleName) < 0) {
            moduleName = "external-tool";
        }
        return "img/mod/" + moduleName + ".svg";
    };
        self.getSection = function(courseid, sectionid, refresh) {
        var deferred = $q.defer();
        if (sectionid < 0) {
            deferred.reject('Invalid section ID');
            return deferred.promise;
        }
        self.getSections(courseid, refresh).then(function(sections) {
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
        self.getSections = function(courseid, refresh) {
        var presets = {};
        if (refresh) {
            presets.getFromCache = false;
        }
        return $mmSite.read('core_course_get_contents', {
            courseid: courseid,
            options: []
        }, presets);
    };
        self.invalidateModule = function(moduleid) {
        return $mmSite.invalidateWsCacheForKey(getModuleCacheKey(moduleid));
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
    self.$get = function($injector, $q, $log, $mmSite, $mmCourseContentHandler) {
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
                handlerInfo.instance = $injector.get(handlerInfo.handler);
            }
            if (!$mmSite.isLoggedIn()) {
                promise = $q.reject();
            } else {
                promise = $q.when(handlerInfo.instance.isEnabled());
            }
            return promise.then(function() {
                    enabledHandlers[handles] = handlerInfo.instance;
                }, function() {
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
    };
    return self;
});

angular.module('mm.core.courses')
.controller('mmCoursesListCtrl', function($scope, $state, $mmCourses, $mmCoursesDelegate, $mmUtil) {
    var plugins = $mmCoursesDelegate.getData();
    function fetchCourses(refresh) {
        return $mmCourses.getUserCourses(refresh).then(function(courses) {
            $scope.courses = courses;
            $scope.filterText = '';
        }, function(error) {
            if (typeof error != 'undefined' && error != '') {
                $mmUtil.showErrorModal(error);
            } else {
                $mmUtil.showErrorModal('mm.courses.errorloadcourses', true);
            }
        })
    }
    fetchCourses().finally(function() {
        $scope.coursesLoaded = true;
    });
    $scope.hasPlugins = Object.keys(plugins).length;
    $scope.plugins = plugins;
    $scope.refreshCourses = function() {
        fetchCourses(true).finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
});

angular.module('mm.core.courses')
.factory('$mmCourses', function($q, $mmSite, $mmSitesManager, mmCoursesFrontPage) {
    var self = {},
        currentCourses = {};
    function storeCoursesInMemory(courses) {
        angular.forEach(courses, function(course) {
            currentCourses[course.id] = course;
        });
    }
        self.getStoredCourse = function(id) {
        return currentCourses[id];
    };
        self.getUserCourses = function(refresh, siteid) {
        siteid = siteid || $mmSite.getId();
        var userid = $mmSite.getUserId(),
            presets = {},
            data = {userid: userid};
        if (typeof userid === 'undefined') {
            return $q.reject();
        }
        if (refresh) {
            presets.getFromCache = false;
        }
        return $mmSitesManager.getSite(siteid).then(function(site) {
            return site.read('core_enrol_get_users_courses', data, presets).then(function(courses) {
                storeCoursesInMemory(courses);
                return courses;
            });
        });
    };
    return self;
});

angular.module('mm.core.courses')
.factory('$mmCoursesDelegate', function($log) {
    $log = $log.getInstance('$mmCoursesDelegate');
    var plugins = {},
        self = {},
        data;
        self.registerPlugin = function(name, callback) {
        $log.debug("Register plugin '"+name+"' in course.");
        plugins[name] = callback;
    };
        self.updatePluginData = function(name) {
        $log.debug("Update plugin '"+name+"' data in course.");
        var pluginData = plugins[name]();
        if (typeof(pluginData) !== 'undefined') {
            data[name] = pluginData;
        }
    };
        self.getData = function() {
        data = {};
        angular.forEach(plugins, function(callback, plugin) {
            self.updatePluginData(plugin);
        });
        return data;
    };
    return self;
});

angular.module('mm.core.login')
.controller('mmLoginCredentialsCtrl', function($scope, $state, $stateParams, $mmSitesManager, $mmUtil) {
    $scope.siteurl = $stateParams.siteurl;
    $scope.credentials = {};
    $scope.login = function() {
        var siteurl = $scope.siteurl,
            username = $scope.credentials.username,
            password = $scope.credentials.password;
        if (!username) {
            $mmUtil.showErrorModal('mm.login.usernamerequired', true);
            return;
        }
        if (!password) {
            $mmUtil.showErrorModal('mm.login.passwordrequired', true);
            return;
        }
        var modal = $mmUtil.showModalLoading();
        $mmSitesManager.getUserToken(siteurl, username, password).then(function(token) {
            $mmSitesManager.newSite(siteurl, token).then(function() {
                delete $scope.credentials;
                $state.go('site.mm_courses');
            }, function(error) {
                $mmUtil.showErrorModal(error);
            }).finally(function() {
                modal.dismiss();
            });
        }, function(error) {
            modal.dismiss();
            $mmUtil.showErrorModal(error);
        });
    };
});

angular.module('mm.core.login')
.controller('mmLoginInitCtrl', function($ionicHistory, $state, $mmSitesManager, $mmSite, $mmEvents, $mmUtil) {
    $ionicHistory.nextViewOptions({
        disableAnimate: true,
        disableBack: true
    });
    $mmSitesManager.restoreSession().then(function() {}, function(error) {
        if (error) {
            $mmUtil.showErrorModal(error);
        }
    }).finally(function() {
        if ($mmSite.isLoggedIn()) {
            $state.go('site.mm_courses').then(function() {
                $mmEvents.triggerUnique('initialized');
            });
        } else {
            $mmSitesManager.hasSites().then(function() {
                return $state.go('mm_login.sites');
            }, function() {
                return $state.go('mm_login.site');
            }).finally(function() {
                $mmEvents.triggerUnique('initialized');
            });
        }
    });
});
angular.module('mm.core.login')
.controller('mmLoginReconnectCtrl', function($scope, $state, $stateParams, $mmSitesManager, $mmSite, $mmUtil, $ionicHistory) {
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
        var siteurl = $scope.siteurl,
            username = $scope.credentials.username,
            password = $scope.credentials.password;
        if (!password) {
            $mmUtil.showErrorModal('mm.login.passwordrequired', true);
            return;
        }
        var modal = $mmUtil.showModalLoading();
        $mmSitesManager.getUserToken(siteurl, username, password).then(function(token) {
            $mmSitesManager.updateSiteToken(siteurl, username, token).then(function() {
                $mmSitesManager.updateSiteInfoByUrl(siteurl, username).finally(function() {
                    delete $scope.credentials;
                    $state.go('site.mm_courses');
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
});

angular.module('mm.core.login')
.controller('mmLoginSiteCtrl', function($scope, $state, $mmSitesManager, $mmUtil, $translate,
        $ionicModal, $mmLoginHelper) {
    $scope.siteurl = '';
    $scope.isInvalidUrl = true;
    $scope.validate = function(url) {
        if (!url) {
            $scope.isInvalidUrl = true;
            return;
        }
        $mmSitesManager.getDemoSiteData(url).then(function() {
            $scope.isInvalidUrl = false;
        }, function() {
            var formattedurl = $mmUtil.formatURL(url);
            $scope.isInvalidUrl = formattedurl.indexOf('://localhost') == -1 && !$mmUtil.isValidURL(formattedurl);
        });
    };
    $scope.connect = function(url) {
        if (!url) {
            $mmUtil.showErrorModal('mm.login.siteurlrequired', true);
            return;
        }
        var modal = $mmUtil.showModalLoading();
        $mmSitesManager.getDemoSiteData(url).then(function(sitedata) {
            $mmSitesManager.getUserToken(sitedata.url, sitedata.username, sitedata.password).then(function(token) {
                $mmSitesManager.newSite(sitedata.url, token).then(function() {
                    $state.go('site.mm_courses');
                }, function(error) {
                    $mmUtil.showErrorModal(error);
                }).finally(function() {
                    modal.dismiss();
                });
            }, function(error) {
                modal.dismiss();
                $mmUtil.showErrorModal(error);
            });
        }, function() {
            $mmSitesManager.checkSite(url).then(function(result) {
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
        });
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
});

angular.module('mm.core.login')
.controller('mmLoginSitesCtrl', function($scope, $state, $mmSitesManager, $log, $translate, $mmUtil) {
    $log = $log.getInstance('mmLoginSitesCtrl');
    $mmSitesManager.getSites().then(function(sites) {
        $scope.sites = sites;
        $scope.data = {
            hasSites: sites.length > 0,
            showDetele: false
        };
    });
    $scope.toggleDelete = function() {
        $scope.data.showDelete = !$scope.data.showDelete;
    };
    $scope.onItemDelete = function(e, index) {
        e.stopPropagation();
        var site = $scope.sites[index];
        $mmUtil.showConfirm($translate('mm.login.confirmdeletesite', {sitename: site.sitename})).then(function() {
            $mmSitesManager.deleteSite(site.id).then(function() {
                $scope.sites.splice(index, 1);
                $mmSitesManager.hasNoSites().then(function() {
                    $state.go('mm_login.site');
                });
            }, function(error) {
                $log.error('Delete site failed');
                $mmUtil.showErrorModal('mm.login.errordeletesite', true);
            });
        });
    };
    $scope.login = function(index) {
        var siteid = $scope.sites[index].id,
            modal = $mmUtil.showModalLoading();
        $mmSitesManager.loadSite(siteid).then(function() {
            $state.go('site.mm_courses');
        }, function(error) {
            $log.error('Error loading site '+siteid);
            error = error || 'Error loading site.';
            $mmUtil.showErrorModal(error);
        }).finally(function() {
            modal.dismiss();
        });
    };
    $scope.add = function() {
        $state.go('mm_login.site');
    };
});

angular.module('mm.core.login')
.constant('mmLoginSSOCode', 2)
.constant('mmLoginLaunchSiteURL', 'mmLoginLaunchSiteURL')
.constant('mmLoginLaunchPassport', 'mmLoginLaunchPassport')
.factory('$mmLoginHelper', function($q, $log, $mmConfig, $translate, mmLoginSSOCode, mmLoginLaunchSiteURL, mmLoginLaunchPassport,
            md5, $mmSite, $mmSitesManager, $mmLang, $mmUtil) {
    $log = $log.getInstance('$mmLoginHelper');
    var self = {};
        self.isSSOLoginNeeded = function(code) {
        return code == mmLoginSSOCode;
    }
        self.openBrowserForSSOLogin = function(siteurl) {
        $mmConfig.get('wsextservice').then(function(service) {
            var passport = Math.random() * 1000;
            var loginurl = siteurl + "/local/mobile/launch.php?service=" + service;
            loginurl += "&passport=" + passport;
            $mmConfig.set(mmLoginLaunchSiteURL, siteurl);
            $mmConfig.set(mmLoginLaunchPassport, passport);
            $mmUtil.openInBrowser(loginurl);
            if (navigator.app) {
                navigator.app.exitApp();
            }
        });
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
                    return $translate('mm.core.unexpectederror').then(function(errorString) {
                        return $q.reject(errorString);
                    });
                }
            });
        });
    };
        self.handleSSOLoginAuthentication = function(siteurl, token) {
        if ($mmSite.isLoggedIn()) {
            var deferred = $q.defer();
            var info = $mmSite.getInfo();
            if (typeof(info) !== 'undefined' && typeof(info.username) !== 'undefined') {
                $mmSitesManager.updateSiteToken(siteurl, info.username, token).then(deferred.resolve, function() {
                    $mmLang.translateErrorAndReject(deferred, 'mm.login.errorupdatesite');
                });
            } else {
                $mmLang.translateErrorAndReject(deferred, 'mm.login.errorupdatesite');
            }
            return deferred.promise;
        } else {
            return $mmSitesManager.newSite(siteurl, token);
        }
    }
    return self;
});

angular.module('mm.core.settings')
.controller('mmSettingsAboutCtrl', function($scope, $mmConfig, $translate) {
    $mmConfig.get('versionname').then(function(version) {
        $translate('mm.settings.appname', {version: version}).then(function(appName) {
            $scope.appname = appName;
        })
    });
});

angular.module('mm.core.settings')
.controller('mmSettingsGeneralCtrl', function($scope, $mmConfig, $mmLang, $ionicHistory, $mmEvents, mmCoreEventLanguageChanged) {
    $mmConfig.get('languages').then(function(languages) {
        $scope.langs = languages;
    });
    $mmLang.getCurrentLanguage().then(function(currentLanguage) {
        $scope.selectedLanguage = currentLanguage;
    });
    $scope.languageChanged = function(newLang) {
        $mmLang.changeCurrentLanguage(newLang).finally(function() {
            $ionicHistory.clearCache();
            $mmEvents.trigger(mmCoreEventLanguageChanged);
        });
    };
});

angular.module('mm.core.settings')
.controller('mmSettingsListCtrl', function($scope, $mmSettingsDelegate) {
    $scope.getState = function(name) {
        return 'site.mm_settings-' + name;
    };
    var plugins = $mmSettingsDelegate.getData();
    $scope.plugins = plugins;
});

angular.module('mm.core.settings')
.controller('mmSettingsSpaceUsageCtrl', function($log, $scope, $mmSitesManager, $mmFS, $q, $mmUtil, $translate) {
    $log = $log.getInstance('mmSettingsSpaceUsageCtrl');
    var fsAvailable = $mmFS.isAvailable();
    function calculateSizeUsage() {
        return $mmSitesManager.getSites().then(function(sites) {
            var promises = [];
            $scope.sites = sites;
            angular.forEach(sites, function(site) {
                var promise;
                if (fsAvailable) {
                    var siteFolderPath = $mmFS.getSiteFolder(site.id);
                    promise = $mmFS.getDirectorySize(siteFolderPath).then(function(size) {
                        site.spaceusage = size;
                    }, function() {
                        site.spaceusage = 0;
                    });
                } else {
                    site.spaceusage = 0;
                }
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
        if (fsAvailable) {
            $mmFS.calculateFreeSpace().then(function(freespace) {
                $scope.freespace = freespace;
            }, function() {
                $scope.freespace = 0;
            });
        } else {
            $scope.freespace = 0;
        }
    }
    calculateSizeUsage().then(function() {
        calculateTotalUsage();
    });
    calculateFreeSpace();
    function updateSiteUsage(site, newUsage) {
        var oldUsage = site.spaceusage;
        site.spaceusage = newUsage;
        $scope.totalusage -= oldUsage - newUsage;
        $scope.freespace += oldUsage - newUsage;
    }
    $scope.deleteSiteFiles = function(index) {
        var site = $scope.sites[index];
        if (site) {
            var siteid = site.id;
            var sitename = site.sitename;
            $translate('mm.settings.deletesitefilestitle').then(function(title) {
                $mmUtil.showConfirm($translate('mm.settings.deletesitefiles', {sitename: sitename}), title).then(function() {
                    var siteFolderPath = $mmFS.getSiteFolder(siteid);
                    $mmFS.removeDir(siteFolderPath).then(function() {
                        updateSiteUsage(site, 0);
                    }, function(error) {
                        if (error.code !== FileError.NOT_FOUND_ERR) {
                            $mmUtil.showErrorModal('mm.settings.errordeletesitefiles', true);
                            return $mmFS.getDirectorySize(siteFolderPath).then(function(size) {
                                updateSiteUsage(site, size);
                            });
                        } else {
                            updateSiteUsage(site, 0);
                        }
                    });
                });
            });
        }
    };
});

angular.module('mm.core.settings')
.factory('$mmSettingsDelegate', function($log) {
    $log = $log.getInstance('$mmSettingsDelegate');
    var plugins = {},
        self = {},
        data;
        self.registerPlugin = function(name, callback) {
        $log.debug("Register plugin '"+name+"' in settings.");
        plugins[name] = callback;
    };
        self.updatePluginData = function(name) {
        $log.debug("Update plugin '"+name+"' data in settings.");
        var pluginData = plugins[name]();
        if (typeof(pluginData) !== 'undefined') {
            data[name] = pluginData;
        }
    };
        self.getData = function() {
        data = {};
        angular.forEach(plugins, function(callback, plugin) {
            self.updatePluginData(plugin);
        });
        return data;
    };
    return self;
});

angular.module('mm.core.sidemenu')
.controller('mmSideMenuCtrl', function($scope, $state, $mmSideMenuDelegate, $mmSitesManager, $mmSite, $mmConfig, $mmEvents,
            $timeout, mmCoreEventLanguageChanged) {
    $scope.plugins = $mmSideMenuDelegate.getData();
    $scope.siteinfo = $mmSite.getInfo();
    $scope.logout = function() {
        $mmSitesManager.logout().finally(function() {
            $state.go('mm_login.sites');
        });
    };
    $mmSite.getDocsUrl().then(function(docsurl) {
        $scope.docsurl = docsurl;
    });
    $mmEvents.on(mmCoreEventLanguageChanged, function() {
        $scope.siteinfo = undefined;
        $timeout(function() {
            $scope.siteinfo = $mmSite.getInfo();
        });
    });
});

angular.module('mm.core.sidemenu')
.factory('$mmSideMenuDelegate', function($log) {
    $log = $log.getInstance('$mmSideMenuDelegate');
    var plugins = {},
        self = {},
        data,
        controllers = [];
        self.registerPlugin = function(name, callback) {
        $log.debug("Register plugin '"+name+"' in side menu.");
        plugins[name] = callback;
    };
        self.updatePluginData = function(name) {
        $log.debug("Update plugin '"+name+"' data in side menu.");
        var pluginData = plugins[name]();
        if (typeof pluginData === 'object' && typeof pluginData.then === 'function') {
            pluginData.then(function(finalData) {
                data[name] = finalData;
            });
        } else if (typeof(pluginData) !== 'undefined') {
            data[name] = pluginData;
        }
    };
        self.getData = function() {
        data = {};
        angular.forEach(plugins, function(callback, plugin) {
            self.updatePluginData(plugin);
        });
        return data;
    };
    return self;
});

angular.module('mm.core.user')
.controller('mmUserProfileCtrl', function($scope, $state, $stateParams, $mmUtil, $mmUser, $mmUserDelegate, $mmSite) {
    var courseid = $stateParams.courseid,
        userid   = $stateParams.userid;
    $scope.isAndroid = ionic.Platform.isAndroid();
    $scope.plugins = [];
    $mmUser.getProfile(userid, courseid).then(function(user) {
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
        $scope.plugins = $mmUserDelegate.getData(user, courseid);
        $mmSite.write('core_user_view_user_profile', {
            userid: userid,
            courseid: courseid
        });
    }, function(message) {
        $scope.user = false;
    }).finally(function() {
        $scope.userLoaded = true;
    });
});

angular.module('mm.core')
.directive('mmUserLink', function($state, mmUserProfileState) {
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
});

angular.module('mm.core.user')
.factory('$mmUserDelegate', function($log, $mmSite) {
    $log = $log.getInstance('$mmUserDelegate');
    var handlers = {},
        self = {},
        controllers = {};
        self.registerPlugin = function(name, handler) {
        $log.debug("Register plugin '" + name + "' in profile.");
        handlers[name] = handler();
    };
        self.getData = function(user, courseid) {
        controllers = {};
        angular.forEach(handlers, function(handler, name) {
            if (!handler.isEnabled()) {
                delete controllers[name];
                return;
            } else if (!handler.isEnabledForUser(user, courseid)) {
                delete controllers[name];
                return;
            }
            controllers[name] = handler.getController(user, courseid);
        });
        return controllers;
    };
    return self;
});

angular.module('mm.core.user')
.constant('mmCoreUsersStore', 'users')
.config(function($mmSitesFactoryProvider, mmCoreUsersStore) {
    var stores = [
        {
            name: mmCoreUsersStore,
            keyPath: 'id'
        }
    ];
    $mmSitesFactoryProvider.registerStores(stores);
})
.factory('$mmUser', function($log, $q, $mmSite, $mmLang, $mmUtil, $translate, mmCoreUsersStore) {
    $log = $log.getInstance('$mmUser');
    var self = {};
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
                        roles += (roles != '' ? separator: '') + roleName;
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
        self.getUserFromLocal = function(id) {
        var db = $mmSite.getDb();
        return db.get(mmCoreUsersStore, parseInt(id));
    };
        self.getUserFromWS = function(userid, courseid) {
        var wsName,
            data;
        if (courseid > 1) {
            $log.debug('Get participant with ID ' + userid + ' in course '+courseid);
            wsName = 'core_user_get_course_user_profiles';
            var data = {
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
        return $mmSite.read(wsName, data).then(function(users) {
            if (users.length == 0) {
                return $q.reject();
            }
            return $mmUtil.getCountries().then(function(countries) {
                var user = users.shift();
                if (user.country && typeof countries != 'undefined' && typeof countries[user.country] != 'undefined') {
                    user.country = countries[user.country];
                }
                return user;
            });
        });
    };
        self.storeUser = function(id, fullname, avatar) {
        var db = $mmSite.getDb();
        return db.insert(mmCoreUsersStore, {
            id: parseInt(id),
            fullname: fullname,
            profileimageurl: avatar
        });
    };
        self.storeUsers = function(users) {
        var promises = [];
        angular.forEach(users, function(user) {
            promises.push( self.storeUser(user.id, user.fullname, user.profileimageurl) );
        });
        return $q.all(promises);
    };
    return self;
});

angular.module('mm.addons.calendar', [])
.constant('mmaCalendarDaysInterval', 30)
.constant('mmaCalendarDefaultNotifTime', 60)
.constant('mmaCalendarComponent', 'mmaCalendarEvents')
.config(function($stateProvider) {
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
})
.run(function($mmSideMenuDelegate, $mmaCalendar, $mmLocalNotifications, $state, $ionicPlatform, $mmEvents,
        mmaCalendarComponent) {
    $mmSideMenuDelegate.registerPlugin('mmaCalendar', function() {
        if (!$mmaCalendar.isAvailable()) {
            return undefined;
        }
        return {
            icon: 'ion-calendar',
            title: 'mma.calendar.calendarevents',
            state: 'site.calendar'
        };
    });
    $mmLocalNotifications.registerClick(mmaCalendarComponent, function(data) {
        if (data.eventid) {
            var observer = $mmEvents.on('initialized', function() {
                if (observer && observer.off) {
                    observer.off();
                }
                $state.go('redirect', {siteid: data.siteid, state: 'site.calendar', params: {eventid: data.eventid}});
            });
        }
    });
    $ionicPlatform.ready(function() {
        $mmaCalendar.scheduleAllSitesEventsNotifications();
    });
});

angular.module('mm.addons.files', ['mm.core'])
.constant('mmaFilesUploadStateName', 'site.files-upload')
.constant('mmaFilesSharedFilesStore', 'shared_files')
.config(function($stateProvider, mmaFilesUploadStateName) {
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
})
.run(function($mmSideMenuDelegate, $q, $mmaFiles, $state, $mmSitesManager, $mmUtil, $mmaFilesHelper, $ionicPlatform) {
    $mmSideMenuDelegate.registerPlugin('mmaFiles', function() {
        if (!$mmaFiles.isPluginEnabled()) {
            return undefined;
        }
        return {
            icon: 'ion-folder',
            title: 'mma.files.myfiles',
            state: 'site.files'
        };
    });
    if (ionic.Platform.isIOS()) {
        function searchToUpload() {
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
        }
        $ionicPlatform.on('resume', searchToUpload);
        searchToUpload();
    }
});

angular.module('mm.addons.frontpage', [])
.run(function($mmSideMenuDelegate, $mmaFrontpage) {
    $mmSideMenuDelegate.registerPlugin('mmaFrontpage', function() {
        if (!$mmaFrontpage.isPluginEnabled()) {
            return;
        }
        return $mmaFrontpage.isFrontpageAvailable().then(function() {
            return {
                icon: 'ion-home',
                state: 'site.mm_course-section',
                title: 'mma.frontpage.frontpage'
            };
        });
    });
});

angular.module('mm.addons.grades', [])
.config(function($stateProvider) {
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
})
.run(function($mmCoursesDelegate, $mmSite, $mmaGrades, $mmUserDelegate, $mmaGradesHandlers) {
    $mmCoursesDelegate.registerPlugin('mmaGrades', function() {
        if ($mmaGrades.isPluginEnabled()) {
            return {
                icon: 'ion-stats-bars',
                state: 'site.grades',
                title: 'mma.grades.grades'
            };
        }
        return undefined;
    });
    $mmUserDelegate.registerPlugin('mmaGrades:viewGrades', $mmaGradesHandlers.viewGrades);
});

angular.module('mm.addons.messages', [])
.constant('mmaMessagesPollInterval', 5000)
.value('mmaMessagesIndexState', 'site.messages')
.config(function($stateProvider) {
    $stateProvider
    .state('site.messages', {
        url: '/messages',
        views: {
            'site': {
                templateUrl: 'addons/messages/templates/index.html'
            }
        }
    })
    .state('site.messages-discussion', {
        url: '/messages-discussion',
        params: {
            userId: null,
            userFullname: null
        },
        views: {
            'site': {
                templateUrl: 'addons/messages/templates/discussion.html',
                controller: 'mmaMessagesDiscussionCtrl'
            }
        }
    });
})
.run(function($mmSideMenuDelegate, $mmaMessages, $mmUserDelegate, $mmaMessagesHandlers, $mmEvents, $state, $injector, $mmUtil,
            mmCoreEventLogin) {
    $mmSideMenuDelegate.registerPlugin('mmaMessages', function() {
        if (!$mmaMessages.isPluginEnabled()) {
            return;
        }
        return $mmaMessages.isMessagingEnabled().then(function() {
            return {
                icon: 'ion-chatbox',
                state: 'site.messages',
                title: 'mma.messages.messages'
            };
        });
    });
    $mmUserDelegate.registerPlugin('mmaMessages:sendMessage', $mmaMessagesHandlers.sendMessage);
    $mmUserDelegate.registerPlugin('mmaMessages:addContact', $mmaMessagesHandlers.addContact);
    $mmUserDelegate.registerPlugin('mmaMessages:blockContact', $mmaMessagesHandlers.blockContact);
    $mmEvents.on(mmCoreEventLogin, function() {
        $mmaMessages.invalidateEnabledCache();
    });
    try {
        var $mmPushNotificationsDelegate = $injector.get('$mmPushNotificationsDelegate');
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
    } catch(ex) {
        $log.error('Cannot register push notifications handler: delegate not found');
    }
});

angular.module('mm.addons.mod_assign', ['mm.core'])
.constant('mmaModAssignComponent', 'mmaModAssign')
.constant('mmaModAssignSubmissionComponent', 'mmaModAssignSubmission')
.config(function($stateProvider) {
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
})
.config(function($mmCourseDelegateProvider) {
    $mmCourseDelegateProvider.registerContentHandler('mmaModAssign', 'assign', '$mmaModAssignCourseContentHandler');
})
.run(function($mmaModAssign, $mmModuleActionsDelegate) {
    $mmModuleActionsDelegate.registerModuleHandler('mmaModAssign', function(url, courseid) {
        if (courseid && url.indexOf('/mod/assign/') > -1 && $mmaModAssign.isPluginEnabled()) {
            var matches = url.match(/view\.php\?id=(\d*)/);
            if (matches && typeof matches[1] != 'undefined') {
                var action = {
                    message: 'mm.core.view',
                    icon: 'ion-eye',
                    state: 'site.mod_assign',
                    stateParams: {
                        courseid: courseid,
                        module: {id: matches[1]}
                    }
                };
                return [action];
            }
        }
    });
});

angular.module('mm.addons.mod_folder', ['mm.core'])
.config(function($stateProvider) {
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
})
.config(function($mmCourseDelegateProvider) {
    $mmCourseDelegateProvider.registerContentHandler('mmaModFolder', 'folder', '$mmaModFolderCourseContentHandler');
});

angular.module('mm.addons.mod_forum', [])
.constant('mmaModForumDiscPerPage', 10)
.constant('mmaModForumComponent', 'mmaModForum')
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
                templateUrl: 'addons/mod_forum/templates/discussions.html'
            }
        }
    })
    .state('site.mod_forum-discussion', {
        url: '/mod_forum-discussion',
        params: {
            discussionid: null,
            courseid: null
        },
        views: {
            'site': {
                controller: 'mmaModForumDiscussionCtrl',
                templateUrl: 'addons/mod_forum/templates/discussion.html'
            }
        }
    });
})
.config(function($mmCourseDelegateProvider) {
    $mmCourseDelegateProvider.registerContentHandler('mmaModForum', 'forum', '$mmaModForumCourseContentHandler');
})
.run(function($mmaModForum, $mmModuleActionsDelegate) {
    $mmModuleActionsDelegate.registerModuleHandler('mmaModForum', function(url, courseid) {
        if (courseid && url.indexOf('/mod/forum/') > -1 && $mmaModForum.isPluginEnabled()) {
            var d = url.match(/discuss\.php\?d=([^#]*)/);
            if (d && typeof d[1] != 'undefined') {
                var action = {
                    message: 'mm.core.view',
                    icon: 'ion-eye',
                    state: 'site.mod_forum-discussion',
                    stateParams: {
                        courseid: courseid,
                        discussionid: d[1]
                    }
                };
                return [action];
            }
        }
    });
});

angular.module('mm.addons.mod_label', ['mm.core'])
.config(function($stateProvider) {
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
})
.config(function($mmCourseDelegateProvider) {
    $mmCourseDelegateProvider.registerContentHandler('mmaModLabel', 'label', '$mmaModLabelCourseContentHandler');
});

angular.module('mm.addons.mod_page', ['mm.core'])
.constant('mmaModPageComponent', 'mmaModPage')
.config(function($stateProvider) {
    $stateProvider
    .state('site.mod_page', {
      url: '/mod_page',
      params: {
        module: null
      },
      views: {
        'site': {
          controller: 'mmaModPageIndexCtrl',
          templateUrl: 'addons/mod_page/templates/index.html'
        }
      }
    });
})
.config(function($mmCourseDelegateProvider) {
    $mmCourseDelegateProvider.registerContentHandler('mmaModPage', 'page', '$mmaModPageCourseContentHandler');
});

angular.module('mm.addons.mod_resource', ['mm.core'])
.constant('mmaModResourceComponent', 'mmaModResource')
.config(function($stateProvider) {
    $stateProvider
    .state('site.mod_resource', {
      url: '/mod_resource',
      params: {
        module: null
      },
      views: {
        'site': {
          controller: 'mmaModResourceIndexCtrl',
          templateUrl: 'addons/mod_resource/templates/index.html'
        }
      }
    });
})
.config(function($mmCourseDelegateProvider) {
    $mmCourseDelegateProvider.registerContentHandler('mmaModResource', 'resource', '$mmaModResourceCourseContentHandler');
});

angular.module('mm.addons.mod_url', ['mm.core'])
.config(function($stateProvider) {
    $stateProvider
    .state('site.mod_url', {
      url: '/mod_url',
      params: {
        module: null
      },
      views: {
        'site': {
          controller: 'mmaModUrlIndexCtrl',
          templateUrl: 'addons/mod_url/templates/index.html'
        }
      }
    });
})
.config(function($mmCourseDelegateProvider) {
    $mmCourseDelegateProvider.registerContentHandler('mmaModUrl', 'url', '$mmaModUrlCourseContentHandler');
});

angular.module('mm.addons.notes', [])
.run(function($mmUserDelegate, $mmaNotesHandlers) {
    $mmUserDelegate.registerPlugin('mmaNotes:addNote', $mmaNotesHandlers.addNote);
});

angular.module('mm.addons.notifications', [])
.constant('mmaNotificationsListLimit', 20)
.config(function($stateProvider) {
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
})
.run(function($log, $mmSideMenuDelegate, $mmaNotifications, $mmPushNotificationsDelegate, $mmUtil, $state, $injector) {
    $log = $log.getInstance('mmaNotifications');
    $mmSideMenuDelegate.registerPlugin('mmaNotifications', function() {
        if ($mmaNotifications.isPluginEnabled()) {
            return {
                icon: 'ion-ios-bell',
                state: 'site.notifications',
                title: 'mma.notifications.notifications'
            };
        }
    });
    try {
        var $mmPushNotificationsDelegate = $injector.get('$mmPushNotificationsDelegate');
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
    } catch(ex) {
        $log.error('Cannot register push notifications handler: delegate not found');
    }
});

angular.module('mm.addons.participants', [])
.constant('mmaParticipantsListLimit', 50)
.config(function($stateProvider) {
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
})
.run(function($mmCoursesDelegate) {
    $mmCoursesDelegate.registerPlugin('mmaParticipants', function() {
        return {
            icon: 'ion-person-stalker',
            title: 'mma.participants.participants',
            state: 'site.participants'
        };
    });
});

angular.module('mm.addons.pushnotifications', [])
.constant('mmaPushNotificationsComponent', 'mmaPushNotifications')
.run(function($mmaPushNotifications, $ionicPlatform, $rootScope, $mmEvents, $mmLocalNotifications, mmCoreEventLogin,
            mmaPushNotificationsComponent) {
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
    $mmLocalNotifications.registerClick(mmaPushNotificationsComponent, $mmaPushNotifications.notificationClicked);
});

angular.module('mm.addons.remotestyles', [])
.constant('mmaRemoteStylesComponent', 'mmaRemoteStyles')
.run(function($mmEvents, mmCoreEventLogout, mmCoreEventSiteAdded, mmCoreEventSiteUpdated, $mmaRemoteStyles) {
    $mmEvents.on(mmCoreEventSiteAdded, $mmaRemoteStyles.load);
    $mmEvents.on(mmCoreEventSiteUpdated, $mmaRemoteStyles.load);
    $mmEvents.on(mmCoreEventLogout, $mmaRemoteStyles.clear);
});

angular.module('mm.addons.calendar')
.controller('mmaCalendarEventCtrl', function($scope, $log, $stateParams, $mmaCalendar, $mmUtil, $mmCourse, $mmCourses,
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
                var course = $mmCourses.getStoredCourse(e.courseid);
                $scope.coursename = course.fullname;
            }
        }, function(err) {
            if (err) {
                $log.error(err);
            }
            $mmUtil.showErrorModal('mma.calendar.errorloadevent', true);
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
                time: notificationtime
            };
        });
        $scope.updateNotificationTime = function() {
            var time = $scope.notification.time;
            $mmaCalendar.updateNotificationTime($scope.event, time);
        };
    }
});

angular.module('mm.addons.calendar')
.controller('mmaCalendarListCtrl', function($scope, $stateParams, $log, $state, $mmaCalendar, $mmUtil, $ionicHistory,
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
    $scope.getUrl = function(id) {
        return $state.href('site.calendar-event', {id: id});
    };
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
                $scope.eventsLoaded = true;
                $scope.canLoadMore = true;
                angular.forEach(events, $mmaCalendar.formatEventData);
                if (refresh) {
                    $scope.events = events;
                } else {
                    $scope.events = $scope.events.concat(events);
                }
                $scope.count = $scope.events.length;
                $mmaCalendar.scheduleEventsNotifications(events);
            }
        }, function(err) {
            if (err) {
                $log.error(err);
            }
            $mmUtil.showErrorModal('mma.calendar.errorloadevents', true);
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
});

angular.module('mm.addons.calendar')
.constant('mmaCalendarEventsStore', 'calendar_events')
.config(function($mmSitesFactoryProvider, mmaCalendarEventsStore) {
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
})
.factory('$mmaCalendar', function($log, $q, $mmSite, $mmUtil, $mmCourses, $mmGroups, $mmCourse, $mmLocalNotifications,
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
                var promise = self.getEventNotificationTime(event.id, siteid);
                promises.push(promise);
                promise.then(function(time) {
                    event.notificationtime = time;
                    return db.insert(mmaCalendarEventsStore, event);
                });
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
        e.start = new Date(e.timestart * 1000).toLocaleString();
        e.end = new Date((e.timestart + e.timeduration) * 1000).toLocaleString();
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
        return $mmCourses.getUserCourses(refresh, siteid).then(function(courses) {
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
        return $mmSite.invalidateWsCacheForKeyStartingWith(getEventsCommonCacheKey());
    };
        self.isAvailable = function() {
        return $mmSite.wsAvailable('core_calendar_get_calendar_events');
    };
        self.scheduleAllSitesEventsNotifications = function() {
        if ($mmLocalNotifications.isAvailable()) {
            return $mmSitesManager.getSitesIds().then(function(siteids) {
                var promises = [];
                angular.forEach(siteids, function(siteid) {
                    var promise = self.getEvents(undefined, undefined, false, siteid);
                    promises.push(promise);
                    promise.then(function(events) {
                        return self.scheduleEventsNotifications(events, siteid);
                    });
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
            var deferred = $q.defer();
            deferred.resolve();
            return deferred.promise;
        }
    };
        self.scheduleEventsNotifications = function(events, siteid) {
        siteid = siteid || $mmSite.getId();
        var promises = [];
        if ($mmLocalNotifications.isAvailable()) {
            angular.forEach(events, function(e) {
                var promise = self.getEventNotificationTime(e.id, siteid);
                promises.push(promise);
                promise.then(function(time) {
                    return self.scheduleEventNotification(e, time, siteid);
                });
            });
        }
        return $q.all(promises);
    };
        self.updateNotificationTime = function(event, time) {
        var db = $mmSite.getDb();
        event.notificationtime = time;
        return db.insert(mmaCalendarEventsStore, event).then(function() {
            return self.scheduleEventNotification(event, time);
        });
    };
    return self;
});

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
.controller('mmaFilesChooseSiteCtrl', function($scope, $state, $stateParams, $mmSitesManager, $mmaFilesHelper, $ionicHistory) {
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
            $state.go('site.mm_courses');
        });
    };
});

angular.module('mm.addons.files')
.controller('mmaFilesIndexController', function($scope, $mmaFiles, $mmSite, $mmUtil, $mmaFilesHelper, $mmApp) {
    var canAccessFiles = $mmaFiles.canAccessFiles(),
        canAccessMyFiles = $mmSite.canAccessMyFiles(),
        canUploadFiles = $mmSite.canUploadFiles(),
        canDownloadFiles = $mmSite.canDownloadFiles();
    $scope.canAccessFiles = canAccessFiles;
    $scope.showPrivateFiles = canAccessFiles && canAccessMyFiles;
    $scope.showUpload = !canAccessFiles && canAccessMyFiles && canUploadFiles;
    $scope.canDownload = canDownloadFiles;
    if ($scope.showUpload) {
        $scope.add = function() {
            if (!$mmApp.isOnline()) {
                $mmUtil.showErrorModal('mma.files.errormustbeonlinetoupload', true);
            } else {
                $state.go('site.files-upload');
            }
        };
    }
});

angular.module('mm.addons.files')
.controller('mmaFilesListController', function($q, $scope, $stateParams, $mmaFiles, $mmSite,
        $translate, $mmUtil, $ionicHistory, mmaFilesUploadStateName, $state, $mmApp) {
    var path = $stateParams.path,
        root = $stateParams.root,
        title,
        promise,
        siteInfos = $mmSite.getInfo(),
        showUpload = (root === 'my' && !path && $mmSite.canUploadFiles());
    $scope.count = -1;
    function fetchFiles(root, path) {
        $scope.filesLoaded = false;
        if (!path) {
            if (root === 'site') {
                promise = $mmaFiles.getSiteFiles();
                title = $translate('mma.files.sitefiles');
            } else if (root === 'my') {
                promise = $mmaFiles.getMyFiles();
                title = $translate('mma.files.myprivatefiles');
            } else {
                promise = $q.reject();
                title = (function() {
                    var q = $q.defer();
                    q.resolve('');
                    return q.promise;
                })();
            }
        } else {
            pathdata = JSON.parse(path);
            promise = $mmaFiles.getFiles(pathdata);
            title = (function() {
                var q = $q.defer();
                q.resolve($stateParams.title);
                return q.promise;
            })();
        }
        $q.all([promise, title]).then(function(data) {
            var files = data[0],
                title = data[1];
            $scope.files = files.entries;
            $scope.count = files.count;
            $scope.title = title;
        }, function() {
            $mmUtil.showErrorModal('mma.files.couldnotloadfiles', true);
        }).finally(function() {
            $scope.filesLoaded = true;
        });
    }
    fetchFiles(root, path);
    $scope.$on('$ionicView.enter', function(e) {
        var forwardView = $ionicHistory.forwardView();
        if (forwardView && forwardView.stateName === mmaFilesUploadStateName) {
            fetchFiles(root, path);
        }
    });
    $scope.download = function(file) {
        if (!$mmSite.canDownloadFiles()) {
            return false;
        }
        var modal = $mmUtil.showModalLoading('mma.files.downloading', true);
        $mmaFiles.getFile(file).then(function(fileEntry) {
            $mmUtil.openFile(fileEntry.toURL());
        }, function() {
            $mmUtil.showErrorModal('mma.files.errorwhiledownloading', true);
        }).finally(function() {
            modal.dismiss();
        });
    };
    if (showUpload) {
        $scope.add = function() {
            if (!$mmApp.isOnline()) {
                $mmUtil.showErrorModal('mma.files.errormustbeonlinetoupload', true);
            } else {
                $state.go('site.files-upload', {root: root, path: path});
            }
        };
    }
});

angular.module('mm.addons.files')
.controller('mmaFilesUploadCtrl', function($scope, $stateParams, $mmUtil, $mmaFilesHelper, $ionicHistory, $mmaFiles, $mmApp) {
    var uploadMethods = {
            album: $mmaFilesHelper.uploadImageFromAlbum,
            camera: $mmaFilesHelper.uploadImageFromCamera,
            audio: $mmaFilesHelper.uploadAudio,
            video: $mmaFilesHelper.uploadVideo
        },
        path = $stateParams.path,
        root = $stateParams.root;
    $scope.isAndroid = ionic.Platform.isAndroid();
    function successUploading() {
        $mmaFiles.invalidateDirectory(root, path).finally(function() {
            $mmUtil.showModal('mma.files.success', 'mma.files.fileuploaded');
            $ionicHistory.goBack();
        });
    }
    function errorUploading(err) {
        if (err) {
            $mmUtil.showErrorModal(err);
        }
    }
    $scope.upload = function(type) {
        if (!$mmApp.isOnline()) {
            $mmUtil.showErrorModal('mma.files.errormustbeonlinetoupload', true);
        } else {
            if (typeof(uploadMethods[type]) !== 'undefined') {
                uploadMethods[type]().then(successUploading, errorUploading);
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
    }
});

angular.module('mm.addons.files')
.config(function($mmAppProvider, mmaFilesSharedFilesStore) {
    var stores = [
        {
            name: mmaFilesSharedFilesStore,
            keyPath: 'id'
        }
    ];
    $mmAppProvider.registerStores(stores);
})
.factory('$mmaFiles', function($mmSite, $mmUtil, $mmFS, $mmWS, $q, $timeout, $log, $mmSitesManager, $mmApp, md5,
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
        self.getFile = function(file) {
        var deferred = $q.defer(),
            downloadURL = $mmSite.fixPluginfileURL(file.url),
            siteId = $mmSite.getId(),
            linkId = file.linkId,
            filename = $mmFS.normalizeFileName(file.filename),
            directory = siteId + "/files/" + linkId,
            filePath = directory + "/" + filename;
        $log.debug("Starting download of Moodle file: " + downloadURL);
        $mmFS.createDir(directory).then(function() {
            $log.debug("Downloading Moodle file to " + filePath + " from URL: " + downloadURL);
            $mmWS.downloadFile(downloadURL, filePath).then(function(fileEntry) {
                $log.debug("Download of content finished " + fileEntry.toURL() + " URL: " + downloadURL);
                deferred.resolve(fileEntry);
            }, function() {
                $log.error('Error downloading from URL: ' + downloadURL);
                deferred.reject();
            });
        }, function() {
            $log.error('Error while creating the directory ' + directory);
            deferred.reject();
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
                    entry.imgpath = $mmUtil.getFolderIcon();
                } else {
                    entry.imgpath = $mmUtil.getFileIcon(entry.filename);
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
        params.instanceid = $mmSite.getInfo().userid;
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
        var d = new Date(),
            options = {};
        if (typeof(uri) === 'undefined' || uri === ''){
            $log.debug('Received invalid URI in $mmaFiles.uploadImage()');
            return $q.reject();
        }
        options.deleteAfterUpload = !isFromAlbum;
        options.fileKey = "file";
        options.fileName = "image_" + d.getTime() + ".jpg";
        options.mimeType = "image/jpeg";
        return self.uploadFile(uri, options);
    };
        self.uploadMedia = function(mediaFiles) {
        $log.debug('Uploading media');
        var promises = [];
        angular.forEach(mediaFiles, function(mediaFile, index) {
            var options = {};
            options.fileKey = null;
            options.fileName = mediaFile.name;
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
});

angular.module('mm.addons.files')
.constant('mmaFilesFileSizeWarning', 5242880)
.factory('$mmaFilesHelper', function($q, $mmUtil, $mmApp, $log, $translate, $window,
        $mmaFiles, $cordovaCamera, $cordovaCapture, $mmLang, $mmFS, $mmText, mmaFilesFileSizeWarning) {
    $log = $log.getInstance('$mmaFilesHelper');
    var self = {};
        self.uploadImageFromAlbum = function() {
        $log.debug('Trying to get a image from albums');
        var deferred = $q.defer();
        var width  =  $window.innerWidth  - 200;
        var height =  $window.innerHeight - 200;
        var popover = new CameraPopoverOptions(10, 10, width, height, Camera.PopoverArrowDirection.ARROW_ANY);
        $cordovaCamera.getPicture({
            quality: 50,
            destinationType: navigator.camera.DestinationType.FILE_URI,
            sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
            popoverOptions : popover
        }).then(function(img) {
            var modal = $mmUtil.showModalLoading('mma.files.uploading', true);
            $mmaFiles.uploadImage(img, true).then(function() {
                deferred.resolve();
            }, function() {
                $mmLang.translateErrorAndReject(deferred, 'mma.files.errorwhileuploading');
            }).finally(function() {
                modal.dismiss();
            });
        }, function(error) {
            treatImageError(error, deferred, 'mma.files.errorgettingimagealbum');
        });
        return deferred.promise;
    };
        self.uploadImageFromCamera = function() {
        $log.debug('Trying to capture an image with camera');
        var deferred = $q.defer();
        $cordovaCamera.getPicture({
            quality: 50,
            destinationType: navigator.camera.DestinationType.FILE_URI
        }).then(function(img) {
            var modal = $mmUtil.showModalLoading('mma.files.uploading', true);
            $mmaFiles.uploadImage(img, false).then(function() {
                deferred.resolve();
            }, function() {
                $mmLang.translateErrorAndReject(deferred, 'mma.files.errorwhileuploading');
            }).finally(function() {
                modal.dismiss();
            });
        }, function(error) {
            treatImageError(error, deferred, 'mma.files.errorcapturingimage');
        });
        return deferred.promise;
    };
        self.uploadAudio = function() {
        $log.debug('Trying to record an audio file');
        var deferred = $q.defer();
        $cordovaCapture.captureAudio({limit: 1}).then(function(medias) {
            var modal = $mmUtil.showModalLoading('mma.files.uploading', true);
            $q.all($mmaFiles.uploadMedia(medias)).then(function() {
                deferred.resolve();
            }, function() {
                $mmLang.translateErrorAndReject(deferred, 'mma.files.errorwhileuploading');
            }).finally(function() {
                modal.dismiss();
            });
        }, function(error) {
            treatCaptureError(error, deferred, 'mma.files.errorcapturingaudio');
        });
        return deferred.promise;
    };
        self.uploadVideo = function() {
        $log.debug('Trying to record a video file');
        var deferred = $q.defer();
        $cordovaCapture.captureVideo({limit: 1}).then(function(medias) {
            var modal = $mmUtil.showModalLoading('mma.files.uploading', true);
            $q.all($mmaFiles.uploadMedia(medias)).then(function() {
                deferred.resolve();
            }, function() {
                $mmLang.translateErrorAndReject(deferred, 'mma.files.errorwhileuploading');
            }).finally(function() {
                modal.dismiss();
            });
        }, function(error) {
            treatCaptureError(error, deferred, 'mma.files.errorcapturingvideo');
        });
        return deferred.promise;
    };
        self.confirmUploadFile = function(size) {
        if (!$mmApp.isOnline()) {
            return $translate('mma.files.errormustbeonlinetoupload').then(function(errString) {
                return $q.reject(errString);
            });
        }
        if ($mmApp.isNetworkAccessLimited() || size >= mmaFilesFileSizeWarning) {
             var size = $mmText.bytesToSize(size, 2);
            return $mmUtil.showConfirm($translate('mma.files.confirmuploadfile', {size: size}));
        } else {
            var deferred = $q.defer();
            deferred.resolve();
            return deferred.promise;
        }
    };
        self.copyAndUploadFile = function(file) {
        var deferred = $q.defer();
        var modal = $mmUtil.showModalLoading('mma.files.readingfile', true);
        $mmFS.readFileData(file, $mmFS.FORMATARRAYBUFFER).then(function(data) {
            var filepath = $mmFS.getTmpFolder() + '/' + file.name;
            $mmFS.writeFile(filepath, data).then(function(fileEntry) {
                modal.dismiss();
                self.uploadGenericFile(fileEntry.toURL(), file.name, file.type).then(deferred.resolve, deferred.reject);
            }, function(error) {
                $log.error('Error writing file to upload: '+JSON.stringify(error));
                $mmLang.translateErrorAndReject(deferred, 'mma.files.errorreadingfile');
                modal.dismiss();
            });
        }, function(error) {
            $log.error('Error reading file to upload: '+JSON.stringify(error));
            $mmLang.translateErrorAndReject(deferred, 'mma.files.errorreadingfile');
            modal.dismiss();
        });
        return deferred.promise;
    };
        self.uploadGenericFile = function(uri, name, type, siteid) {
        var deferred = $q.defer();
        if (!$mmApp.isOnline()) {
            $mmLang.translateErrorAndReject(deferred, 'mma.files.errormustbeonlinetoupload');
            return deferred.promise;
        }
        var modal = $mmUtil.showModalLoading('mma.files.uploading', true);
        $mmaFiles.uploadGenericFile(uri, name, type, siteid).then(deferred.resolve, function(error) {
            $log.error('Error uploading file: '+JSON.stringify(error));
            $mmLang.translateErrorAndReject(deferred, 'mma.files.errorwhileuploading');
        }).finally(function() {
            modal.dismiss();
        });
        return deferred.promise;
    };
        self.showConfirmAndUploadInSite = function(fileEntry, siteid) {
        return $mmFS.getFileObjectFromFileEntry(fileEntry).then(function(file) {
            return self.confirmUploadFile(file.size).then(function() {
                return self.uploadGenericFile(fileEntry.toURL(), file.name, file.type, siteid).then(function() {
                    return $mmaFiles.invalidateDirectory('my', undefined, siteid).finally(function() {
                        $mmUtil.showModal('mma.files.success', 'mma.files.fileuploaded');
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
    }
        function treatImageError(error, deferred, defaultMessage) {
        if (error) {
            if (typeof(error) === 'string') {
                if (error.toLowerCase().indexOf("error") > -1 || error.toLowerCase().indexOf("unable") > -1) {
                    $log.error('Error getting image: ' + error);
                    deferred.reject(error);
                } else {
                    $log.debug('Cancelled');
                    deferred.reject();
                }
            } else {
                $mmLang.translateErrorAndReject(deferred, defaultMessage);
            }
        } else {
            deferred.reject();
        }
    }
        function treatCaptureError(error, deferred, defaultMessage) {
        if (error) {
            if (typeof(error) === 'string') {
                $log.error('Error while recording audio/video: ' + error);
                if (error.indexOf('No Activity found') > -1) {
                    $mmLang.translateErrorAndReject(deferred, 'mma.files.errornoapp');
                } else {
                    $mmLang.translateErrorAndReject(deferred, defaultMessage);
                }
            } else {
                if (error.code != 3) {
                    $log.error('Error while recording audio/video: ' + JSON.stringify(error));
                    $mmLang.translateErrorAndReject(deferred, defaultMessage);
                } else {
                    $log.debug('Cancelled');
                    deferred.reject();
                }
            }
        } else {
            deferred.reject();
        }
    }
    return self;
});

angular.module('mm.addons.frontpage')
.factory('$mmaFrontpage', function($mmSite, $log, $q) {
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
        return $mmSite.read('core_course_get_contents', {
            courseid: 1,
            options: []
        }, {
            emergencyCache: false
        }).then(function(data) {
            if (!angular.isArray(data) || data.length == 0) {
                return $q.reject();
            }
        });
    };
    return self;
});

angular.module('mm.addons.grades')
.controller('mmaGradesTableCtrl', function($scope, $stateParams, $mmUtil, $mmaGrades, $mmSite) {
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
});

angular.module('mm.addons.grades')
.factory('$mmaGrades', function($q, $log, $mmSite, $mmText, $ionicPlatform, $translate, $mmCourse) {
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
                if (typeof(tabledata[el]["leader"]) === "undefined") {
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
            var promise = $translate('mma.grades.'+column.name);
            promises.push(promise);
            promise.then(function(translated) {
                column.name = translated;
            });
        });
        return $q.all(promises).then(function() {
            return {
                columns: columns,
                rows: table.rows
            };
        });
    };
        self.isPluginEnabled = function() {
        return $mmSite.wsAvailable('gradereport_user_get_grades_table');
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
});

angular.module('mm.addons.grades')
.factory('$mmaGradesHandlers', function($mmaGrades, $state) {
    var self = {};
        self.viewGrades = function() {
        var self = {};
                self.isEnabled = function() {
            return $mmaGrades.isPluginEnabled();
        };
                self.isEnabledForUser = function(user, courseId) {
            return courseId;
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
    return self;
});
angular.module('mm.addons.messages')
.controller('mmaMessagesContactsCtrl', function($q, $scope, $mmaMessages, $mmSite, $mmUtil) {
    var currentUserId = $mmSite.getUserId();
    $scope.loaded = false;
    $scope.contactTypes = ['online', 'offline', 'blocked', 'strangers', 'search'];
    $scope.hasContacts = false;
    $scope.canSearch = $mmaMessages.isSearchEnabled();
    $scope.formData = {
        searchString: ''
    };
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
        $scope.loaded = false;
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
    }
    function fetchContacts() {
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
});

angular.module('mm.addons.messages')
.controller('mmaMessagesDiscussionCtrl', function($scope, $stateParams, $mmApp, $mmaMessages, $mmSite, $timeout,
        $ionicScrollDelegate, mmUserProfileState, $mmUtil, mmaMessagesPollInterval, $interval, $log, $ionicHistory) {
    $log = $log.getInstance('mmaMessagesDiscussionCtrl');
    var userId = $stateParams.userId,
        userFullname = $stateParams.userFullname,
        messagesBeingSent = 0,
        polling,
        backView = $ionicHistory.backView();
    $scope.loaded = false;
    $scope.messages = [];
    $scope.userId = userId;
    $scope.currentUserId = $mmSite.getUserId();
    $scope.profileLink = true;
    if (userFullname) {
        $scope.title = userFullname;
    }
    if (backView && backView.stateName === mmUserProfileState) {
        $scope.profileLink = false;
    }
    $scope.isAppOffline = function() {
        return !$mmApp.isOnline();
    };
    $scope.showDate = function(message, prevMessage) {
        if (!prevMessage) {
            return true;
        }
        var prevDate = new Date(prevMessage.timecreated * 1000);
        prevDate.setMilliseconds(0);
        prevDate.setSeconds(0);
        prevDate.setMinutes(0);
        prevDate.setHours(1);
        var d = new Date(message.timecreated * 1000);
        d.setMilliseconds(0);
        d.setSeconds(0);
        d.setMinutes(0);
        d.setHours(1);
        if (d.getTime() != prevDate.getTime()) {
            return true;
        }
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
        }, function(error) {
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
        if (!userFullname && messages && messages.length > 0) {
            if (messages[0].useridto != $scope.currentUserId) {
                $scope.title = messages[0].usertofullname || '';
            } else {
                $scope.title = messages[0].userfromfullname || '';
            }
        }
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
                var scrollView = $ionicScrollDelegate.$getByHandle('mmaMessagesScroll');
                scrollView.scrollBottom();
            });
        }
    };
    $scope.$on('$ionicView.enter', function() {
        if (polling) {
            return;
        }
        polling = $interval(function() {
            $log.debug('Polling new messages for discussion with user ' + userId);
            if (messagesBeingSent > 0) {
                return;
            } else if (!$mmApp.isOnline()) {
                return;
            }
            $mmaMessages.invalidateDiscussionCache(userId);
            $mmaMessages.getDiscussion(userId).then(function(messages) {
                if (messagesBeingSent > 0) {
                    return;
                }
                $scope.messages = $mmaMessages.sortMessages(messages);
            });
        }, mmaMessagesPollInterval);
    });
    $scope.$on('$ionicView.leave', function(e) {
        if (polling) {
            $log.debug('Cancelling polling for conversation with user ' + userId);
            $interval.cancel(polling);
        }
    });
});

angular.module('mm.addons.messages')
.controller('mmaMessagesDiscussionsCtrl', function($q, $state, $scope, $mmUtil, $mmaMessages) {
    $scope.loaded = false;
    function fetchDiscussions() {
        return $mmaMessages.getDiscussions().then(function(discussions) {
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
    $scope.refresh = function() {
        $mmaMessages.invalidateDiscussionsCache().then(function() {
            return fetchDiscussions();
        }).finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
    $scope.goToDiscussion = function(discussion) {
        $state.go('site.messages-discussion', {
            userId: discussion.message.user,
            userFullname: discussion.fullname
        });
    };
    fetchDiscussions().finally(function() {
        $scope.loaded = true;
    });
});

angular.module('mm.addons.messages')
.filter('mmaMessagesFormat', function($mmText) {
  return function(text) {
    text = text.replace(/-{4,}/ig, '');
    text = text.replace(/<br \/><br \/>/ig, "<br />");
    text = $mmText.replaceNewLines(text, '<br />');
    return text;
  };
});

angular.module('mm.addons.messages')
.factory('$mmaMessagesHandlers', function($q, $log, $mmaMessages, $mmSite, $state) {
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
                        userId: user.id,
                        userFullname: user.fullname
                    });
                };
            };
        };
        return self;
    };
    return self;
});

angular.module('mm.addons.messages')
.factory('$mmaMessages', function($mmSite, $mmSitesManager, $log, $q, $mmUser, mmaMessagesIndexState) {
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
                    storeUsersFromDiscussions(discussions);
                    return discussions;
                });
            });
        });
    };
        self.getIndexState = function() {
        return mmaMessagesIndexState;
    };
        self._getMessages = function(params, presets) {
        params = angular.extend(params, {
            type: 'conversations',
            newestfirst: 1,
        });
        return $mmSite.read('core_message_get_messages', params, presets);
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
        self.isMessagingEnabled = function() {
        var deferred,
            enabled = $mmSite.canUseAdvancedFeature('messaging', 'unknown');
        if (enabled === 'unknown') {
            $log.debug('Using WS call to check if messaging is enabled.');
            return $mmSite.read('core_message_search_contacts', {
                searchtext: 'CheckingIfMessagingIsEnabled',
                onlymycourses: 0
            }, {
                emergencyCache: false,
                cacheKey: self._getCacheKeyForEnabled()
            });
        }
        deferred = $q.defer();
        if (enabled) {
            deferred.resolve();
        } else {
            deferred.reject();
        }
        return deferred.promise;
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
        self.isPluginEnabled = function() {
        var infos;
        if (!$mmSite.isLoggedIn()) {
            return false;
        } else if (!$mmSite.canUseAdvancedFeature('messaging')) {
            return false;
        } else if (!$mmSite.wsAvailable('core_message_get_messages')) {
            return false;
        }
        return true;
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
        }).then(function() {
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
            $mmUser.storeUser(userid, discussion.fullname, discussion.profileimageurl);
        });
    }
        self.unblockContact = function(userId) {
        return $mmSite.write('core_message_unblock_contacts', {
            userids: [ userId ]
        }).then(function() {
            return self.invalidateAllContactsCache($mmSite.getUserId());
        });
    };
    return self;
});

angular.module('mm.addons.mod_assign')
.controller('mmaModAssignIndexCtrl', function($scope, $stateParams, $mmaModAssign, $mmUtil, mmUserProfileState,
        mmaModAssignComponent, mmaModAssignSubmissionComponent) {
    var module = $stateParams.module || {},
        courseid = $stateParams.courseid;
    $scope.title = module.name;
    $scope.description = module.description;
    $scope.assigncomponent = mmaModAssignComponent;
    $scope.submissioncomponent = mmaModAssignSubmissionComponent;
    $scope.assignurl = module.url;
    $scope.courseid = courseid;
    $scope.getUserProfileStateName = function() {
        return mmUserProfileState;
    };
    function fetchAssignment(refresh) {
        return $mmaModAssign.getAssignment(courseid, module.id, refresh).then(function(assign) {
            $scope.title = assign.name;
            $scope.description = assign.intro;
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
});

angular.module('mm.addons.mod_assign')
.controller('mmaModAssignSubmissionCtrl', function($scope, $stateParams, mmaModAssignSubmissionComponent) {
    var submission = $stateParams.submission || {};
    $scope.title = submission.userfullname;
    $scope.submission = submission;
    $scope.component = mmaModAssignSubmissionComponent;
});

angular.module('mm.addons.mod_assign')
.factory('$mmaModAssign', function($mmSite, $q, $mmUser, $translate) {
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
            var canviewsubmissions;
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
            var promise = $mmUser.getProfile(submission.userid, courseid, true);
            promises.push(promise);
            promise.then(function(user) {
                submission.userfullname = user.fullname;
                submission.userprofileimageurl = user.profileimageurl;
            }, function() {
                submission.userprofileimageurl = 'img/user-avatar.png';
                return $translate('mma.mod_assign.userwithid', {id: submission.userid}).then(function(str) {
                    submission.userfullname = str;
                });
            });
        });
        return $q.all(promises).then(function() {
            return submissions;
        });
    }
        self.isPluginEnabled = function() {
        return $mmSite.wsAvailable('mod_assign_get_assignments') && $mmSite.wsAvailable('mod_assign_get_submissions');
    };
    return self;
});

angular.module('mm.addons.mod_assign')
.factory('$mmaModAssignCourseContentHandler', function($mmCourse, $mmaModAssign, $state) {
    var self = {};
        self.isEnabled = function() {
        return $mmaModAssign.isPluginEnabled();
    };
        self.getController = function(module, courseid) {
        return function($scope) {
            $scope.title = module.name;
            $scope.icon = $mmCourse.getModuleIconSrc('assign');
            $scope.action = function(e) {
                $state.go('site.mod_assign', {module: module, courseid: courseid});
            };
        };
    };
    return self;
});

angular.module('mm.addons.mod_folder')
.controller('mmaModFolderIndexCtrl', function($scope, $stateParams, $mmaModFolder, $mmSite, $mmCourse, $mmUtil) {
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
        return $mmCourse.getModule(courseid, module.id, sectionid).then(function(module) {
            showModuleData(module);
        }, function(error) {
            if (error) {
                $mmUtil.showErrorModal(error);
            } else {
                $mmUtil.showErrorModal('mm.core.unexpectederror', true);
            }
            if (!scp.title) {
                showModuleData(module);
            }
        });
    }
    if (path) {
        showModuleData(module);
        $scope.folderLoaded = true;
        $scope.canReload = false;
    } else {
        fetchFolder().then(function() {
            $mmSite.write('mod_folder_view_folder', {
                folderid: module.instance
            })
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
});

angular.module('mm.addons.mod_folder')
.factory('$mmaModFolderCourseContentHandler', function($mmCourse, $mmaModFolder, $state) {
    var self = {};
        self.isEnabled = function() {
        return true;
    };
        self.getController = function(module, courseid, sectionid) {
        return function($scope) {
            $scope.icon = $mmCourse.getModuleIconSrc('folder');
            $scope.title = module.name;
            $scope.action = function(e) {
                $state.go('site.mod_folder', {module: module, courseid: courseid, sectionid: sectionid});
            };
        };
    };
    return self;
});

angular.module('mm.addons.mod_folder')
.factory('$mmaModFolder', function($mmSite, $mmUtil, $mmCourse) {
    var self = {};
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
    return self;
});

angular.module('mm.addons.mod_forum')
.controller('mmaModForumDiscussionCtrl', function($scope, $stateParams, $mmaModForum, $mmSite, $mmUtil, mmaModForumComponent) {
    var discussionid = $stateParams.discussionid,
        courseid = $stateParams.courseid;
    $scope.component = mmaModForumComponent;
    $scope.courseid = courseid;
    function fetchPosts() {
        return $mmaModForum.getDiscussionPosts(discussionid).then(function(posts) {
            $scope.discussion = $mmaModForum.extractStartingPost(posts);
            $scope.posts = posts;
        }, function(message) {
            $mmUtil.showErrorModal(message);
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
        $mmaModForum.invalidateDiscussionPosts(discussionid).finally(function() {
            fetchPosts().finally(function() {
                $scope.$broadcast('scroll.refreshComplete');
            });
        });
    };
});

angular.module('mm.addons.mod_forum')
.controller('mmaModForumDiscussionsCtrl', function($scope, $stateParams, $mmaModForum, $mmSite, $mmUtil) {
    var module = $stateParams.module || {},
        courseid = $stateParams.courseid,
        forum,
        page = 0;
    $scope.title = module.name;
    $scope.description = module.description;
    $scope.moduleurl = module.url;
    $scope.courseid = courseid;
    function fetchForumDataAndDiscussions(refresh) {
        return $mmaModForum.getForum(courseid, module.id).then(function(forumdata) {
            if (forumdata) {
                forum = forumdata;
                $scope.title = forum.name;
                $scope.description = forum.intro;
                $scope.forum = forum;
                return fetchDiscussions(refresh);
            } else {
                $mmUtil.showErrorModal('mma.mod_forum.errorgetforum', true);
            }
        });
    }
    function fetchDiscussions(refresh) {
        if (refresh) {
            page = 0;
        }
        return $mmaModForum.getDiscussions(forum.id, page).then(function(response) {
            if (page == 0) {
                $scope.discussions = response.discussions;
            } else {
                $scope.discussions = $scope.discussions.concat(response.discussions);
            }
            $scope.count = $scope.discussions.length;
            $scope.canLoadMore = response.canLoadMore;
            page++;
            preFetchDiscussionsPosts(response.discussions);
        }, function(message) {
            $mmUtil.showErrorModal(message);
        });
    }
    function preFetchDiscussionsPosts(discussions) {
        angular.forEach(discussions, function(discussion) {
            var discussionid = discussion.discussion;
            $mmaModForum.getDiscussionPosts(discussionid);
        });
    }
    fetchForumDataAndDiscussions().then(function() {
        $mmSite.write('mod_forum_view_forum', {
            forumid: forum.id
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
        $mmaModForum.invalidateDiscussionsList(courseid, forum.id).finally(function() {
            fetchForumDataAndDiscussions(true).finally(function() {
                $scope.$broadcast('scroll.refreshComplete');
            });
        });
    };
});

angular.module('mm.addons.mod_forum')
.factory('$mmaModForumCourseContentHandler', function($mmCourse, $mmaModForum, $state) {
    var self = {};
        self.isEnabled = function() {
        return $mmaModForum.isPluginEnabled();
    };
        self.getController = function(module, courseid) {
        return function($scope) {
            $scope.title = module.name;
            $scope.icon = $mmCourse.getModuleIconSrc('forum');
            $scope.action = function(e) {
                $state.go('site.mod_forum', {module: module, courseid: courseid});
            };
        };
    };
    return self;
});

angular.module('mm.addons.mod_forum')
.factory('$mmaModForum', function($q, $mmSite, $mmUtil, $mmUser, mmaModForumDiscPerPage) {
    var self = {};
        function getForumDataCacheKey(courseid) {
        return 'mmaModForum:forum:' + courseid;
    }
        function getDiscussionPostsCacheKey(discussionid) {
        return 'mmaModForum:discussion:' + discussionid;
    }
        function getDiscussionsListCacheKey(forumid) {
        return 'mmaModForum:discussions:' + forumid;
    }
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
        self.isPluginEnabled = function() {
        return  $mmSite.wsAvailable('mod_forum_get_forums_by_courses') &&
                $mmSite.wsAvailable('mod_forum_get_forum_discussions_paginated') &&
                $mmSite.wsAvailable('mod_forum_get_forum_discussion_posts');
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
            return currentForum;
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
        self.invalidateDiscussionPosts = function(discussionid) {
        return $mmSite.invalidateWsCacheForKey(getDiscussionPostsCacheKey(discussionid));
    };
        self.invalidateDiscussionsList = function(courseid, forumid) {
        return $mmSite.invalidateWsCacheForKey(getForumDataCacheKey(courseid)).then(function() {
            return $mmSite.invalidateWsCacheForKey(getDiscussionsListCacheKey(forumid));
        });
    };
        function storeUserData(list) {
        var ids = [];
        angular.forEach(list, function(entry) {
            var id = parseInt(entry.userid);
            if (ids.indexOf(id) === -1) {
                ids.push(id);
                $mmUser.storeUser(id, entry.userfullname, entry.userpictureurl);
            }
            if (typeof entry.usermodified != 'undefined') {
                id = parseInt(entry.usermodified);
                if(ids.indexOf(id) === -1) {
                    ids.push(id);
                    $mmUser.storeUser(id, entry.usermodifiedfullname, entry.usermodifiedpictureurl);
                }
            }
        });
    }
    return self;
});

angular.module('mm.core.course')
.controller('mmaModLabelIndexCtrl', function($scope, $stateParams, $log) {
    $log = $log.getInstance('mmaModLabelIndexCtrl');
    $scope.description = $stateParams.description;
});

angular.module('mm.addons.mod_label')
.factory('$mmaModLabelCourseContentHandler', function($mmCourse, $mmText, $translate, $state) {
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
                $state.go('site.mod_label', {description: module.description});
            };
        };
    };
    return self;
});

angular.module('mm.addons.mod_page')
.controller('mmaModPageIndexCtrl', function($scope, $stateParams, $mmUtil, $mmaModPage, $mmSite, $log, mmaModPageComponent) {
    $log = $log.getInstance('mmaModPageIndexCtrl');
    var module = $stateParams.module || {};
    $scope.title = module.name;
    $scope.description = module.description;
    $scope.component = mmaModPageComponent;
    $scope.componentId = module.id;
    $scope.externalUrl = module.url;
    $scope.loaded = false;
    function fetchContent() {
        return $mmaModPage.getPageHtml(module.contents, module.id).then(function(content) {
            $scope.content = content;
        }).catch(function() {
            $mmUtil.showErrorModal('mma.mod_page.errorwhileloadingthepage');
        }).finally(function() {
            $scope.loaded = true;
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
        if (module.instance) {
            $mmSite.write('mod_page_view_page', {
                urlid: module.instance
            });
        }
    });
});

angular.module('mm.addons.mod_page')
.factory('$mmaModPageCourseContentHandler', function($mmCourse, $mmaModPage, $mmFilepool, $mmEvents, $state) {
    var self = {};
        self.isEnabled = function() {
        return true;
    };
        self.getController = function(module) {
        return function($scope) {
            var downloadBtn,
                refreshBtn,
                observers = {};
            function addObservers(eventNames) {
                angular.forEach(eventNames, function(e) {
                    observers[e] = $mmEvents.on(e, function(data) {
                        if (data.success && typeof observers[e] !== 'undefined') {
                            observers[e].off();
                            delete observers[e];
                        }
                        if (Object.keys(observers).length < 1) {
                            $scope.spinner = false;
                            downloadBtn.hidden = true;
                            refreshBtn.hidden = false;
                        }
                    });
                });
            }
            downloadBtn = {
                hidden: true,
                icon: 'ion-ios-cloud-download',
                action: function(e) {
                    var eventNames;
                    e.preventDefault();
                    e.stopPropagation();
                    downloadBtn.hidden = true;
                    refreshBtn.hidden = true;
                    $scope.spinner = true;
                    addObservers($mmaModPage.getFileEventNames(module));
                    $mmaModPage.prefetchContent(module);
                }
            };
            refreshBtn = {
                icon: 'ion-android-refresh',
                hidden: true,
                action: function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    downloadBtn.hidden = true;
                    refreshBtn.hidden = true;
                    $scope.spinner = true;
                    $mmaModPage.invalidateContent(module.id).then(function() {
                        addObservers($mmaModPage.getFileEventNames(module));
                        $mmaModPage.prefetchContent(module);
                    });
                }
            };
            $scope.title = module.name;
            $scope.icon = $mmCourse.getModuleIconSrc('page');
            $scope.action = function(e) {
                $state.go('site.mod_page', {module: module});
            };
            $scope.buttons = [downloadBtn, refreshBtn];
            $scope.spinner = false;
            $mmaModPage.getFilesStatus(module).then(function(result) {
                if (result.status == $mmFilepool.FILENOTDOWNLOADED) {
                    downloadBtn.hidden = false;
                } else if (result.status == $mmFilepool.FILEDOWNLOADING) {
                    $scope.spinner = true;
                    addObservers(result.eventNames);
                } else {
                    refreshBtn.hidden = false;
                }
            });
            $scope.$on('$destroy', function() {
                angular.forEach(observers, function(observer) {
                    observer.off();
                });
            });
        };
    };
    return self;
});

angular.module('mm.addons.mod_page')
.factory('$mmaModPage', function($mmFilepool, $mmSite, $mmFS, $http, $log, $q, mmaModPageComponent) {
    $log = $log.getInstance('$mmaModPage');
    var self = {};
        self._fixUrl = function(url) {
        url = self._removeRevisionFromUrl(url);
        url = $mmSite.fixPluginfileURL(url);
        return url;
    };
        self.getFileEventNames = function(module) {
        var eventNames = [];
        angular.forEach(module.contents, function(content) {
            var url;
            if (content.type !== 'file') {
                return;
            }
            url = self._fixUrl(content.fileurl);
            eventNames.push($mmFilepool.getFileEventNameByUrl($mmSite.getId(), url));
        });
        return eventNames;
    };
        self.getFilesStatus = function(module) {
        var promises = [],
            eventNames = [],
            notDownloaded = 0,
            downloading = 0,
            downloaded = 0,
            fileCount = 0;
        angular.forEach(module.contents, function(content) {
            var url;
            if (content.type !== 'file') {
                return;
            }
            fileCount++;
            url = self._fixUrl(content.fileurl);
            promises.push($mmFilepool.getFileStateByUrl($mmSite.getId(), url).then(function(state) {
                if (state == $mmFilepool.FILENOTDOWNLOADED) {
                    notDownloaded++;
                } else if (state == $mmFilepool.FILEDOWNLOADING) {
                    downloading++;
                    eventNames.push($mmFilepool.getFileEventNameByUrl($mmSite.getId(), url));
                } else if (state == $mmFilepool.FILEDOWNLOADED) {
                    downloaded++;
                }
            }));
        });
        function prepareResult() {
            var status = $mmFilepool.FILENOTDOWNLOADED;
            if (notDownloaded > 0) {
                status = $mmFilepool.FILENOTDOWNLOADED;
            } else if (downloading > 0) {
                status = $mmFilepool.FILEDOWNLOADING;
            } else if (downloaded == fileCount) {
                status = $mmFilepool.FILEDOWNLOADED;
            }
            return {status: status, eventNames: eventNames};
        }
        return $q.all(promises).then(function() {
            return prepareResult();
        }, function() {
            return prepareResult();
        });
    };
        self.getPageHtml = function(contents, moduleId) {
        var deferred = $q.defer(),
            indexUrl,
            paths = {},
            promise;
        angular.forEach(contents, function(content) {
            var key,
                url = self._fixUrl(content.fileurl);
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
                deferred = $q.defer();
                deferred.resolve(indexUrl);
                return deferred.promise;
            }
        })();
        return promise.then(function(url) {
            return $http.get(url).then(function(response) {
                if (typeof response.data !== 'string') {
                    return $q.reject();
                } else {
                    var html = angular.element('<div>');
                    html.html(response.data);
                    angular.forEach(html.find('img'), function(img) {
                        var src = paths[decodeURIComponent(img.getAttribute('src'))];
                        if (typeof src !== 'undefined') {
                            img.setAttribute('src', src);
                        }
                    });
                    angular.forEach(html.find('a'), function(anchor) {
                        var href = paths[decodeURIComponent(anchor.getAttribute('href'))];
                        if (typeof href !== 'undefined') {
                            anchor.setAttribute('href', href);
                        }
                    });
                    return html.html();
                }
            });
        });
    };
        self.invalidateContent = function(moduleId) {
        return $mmFilepool.invalidateFilesByComponent($mmSite.getId(), mmaModPageComponent, moduleId);
    };
        self._isMainPage = function(file) {
        var filename = file.filename || undefined,
            fileurl = file.fileurl || '',
            url = '/mod_page/content/index.html',
            encodedUrl = encodeURIComponent(url);
        return (filename === 'index.html' && (fileurl.indexOf(url) > 0 || fileurl.indexOf(encodedUrl) > 0 ));
    };
        self.prefetchContent = function(module) {
        angular.forEach(module.contents, function(content) {
            var url;
            if (content.type !== 'file') {
                return;
            }
            url = self._fixUrl(content.fileurl);
            $mmFilepool.addToQueueByUrl($mmSite.getId(), url, mmaModPageComponent, module.id);
        });
    };
        self._removeRevisionFromUrl = function(url) {
        var revisionRegex = new RegExp('/mod_page/content/[0-9]+/');
        return url.replace(revisionRegex, '/mod_page/content/0/');
    };
    return self;
});

angular.module('mm.addons.mod_resource')
.controller('mmaModResourceIndexCtrl', function($scope, $stateParams, $mmUtil, $mmaModResource, $log, mmaModResourceComponent) {
    $log = $log.getInstance('mmaModResourceIndexCtrl');
    var module = $stateParams.module || {};
    $scope.title = module.name;
    $scope.description = module.description;
    $scope.component = mmaModResourceComponent;
    $scope.componentId = module.id;
    $scope.externalUrl = module.url;
    $scope.mode = false;
    $scope.loaded = false;
    function fetchContent() {
        if (module.contents) {
            if ($mmaModResource.isDisplayedInIframe(module)) {
                $scope.mode = 'iframe';
                $mmaModResource.getIframeSrc(module).then(function(src) {
                    $scope.src = src;
                    $mmaModResource.logView(module.instance);
                }).catch(function() {
                    $mmUtil.showErrorModal('mma.mod_resource.errorwhileloadingthecontent', true);
                }).finally(function() {
                    $scope.loaded = true;
                });
            } else if ($mmaModResource.isDisplayedInline(module)) {
                $mmaModResource.getResourceHtml(module.contents, module.id).then(function(content) {
                    $scope.mode = 'inline';
                    $scope.content = content;
                    $mmaModResource.logView(module.instance);
                }).catch(function() {
                    $mmUtil.showErrorModal('mma.mod_resource.errorwhileloadingthecontent', true);
                }).finally(function() {
                    $scope.loaded = true;
                });
            } else {
                $scope.loaded = true;
                $scope.mode = 'external';
                $scope.open = function() {
                    var modal = $mmUtil.showModalLoading('mm.core.downloading', true);
                    $mmaModResource.openFile(module.contents, module.id).then(function() {
                        $mmaModResource.logView(module.instance);
                    }).catch(function() {
                        modal.dismiss();
                        $mmUtil.showErrorModal('mma.mod_resource.errorwhileloadingthecontent', true);
                    }).finally(function() {
                        modal.dismiss();
                    });
                };
            }
        } else {
            $mmUtil.showErrorModal('mma.mod_resource.errorwhileloadingthecontent', true);
        }
    }
    $scope.$on('mmaModResourceHtmlLinkClicked', function(e, target) {
        $scope.loaded = false;
        $mmaModResource.getResourceHtml(module.contents, module.id, target).then(function(content) {
            $scope.content = content;
        }).catch(function() {
            $mmUtil.showErrorModal('mma.mod_resource.errorwhileloadingthecontent', true);
        }).finally(function() {
            $scope.loaded = true;
        });
    });
    $scope.doRefresh = function() {
        $mmaModResource.invalidateContent(module.id)
        .then(function() {
            return fetchContent();
        }).finally(function() {
            $scope.loaded = true;
        });
    };
    fetchContent();
});

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
.factory('$mmaModResourceCourseContentHandler', function($mmCourse, $mmaModResource, $mmFilepool, $mmEvents, $state, $mmUtil) {
    var self = {};
        self.isEnabled = function() {
        return true;
    };
        self.getController = function(module) {
        return function($scope) {
            var downloadBtn,
                refreshBtn,
                observers = {};
            function addObservers(eventNames) {
                angular.forEach(eventNames, function(e) {
                    observers[e] = $mmEvents.on(e, function(data) {
                        if (data.success && typeof observers[e] !== 'undefined') {
                            observers[e].off();
                            delete observers[e];
                        }
                        if (Object.keys(observers).length < 1) {
                            $scope.spinner = false;
                            downloadBtn.hidden = true;
                            refreshBtn.hidden = false;
                        }
                    });
                });
            }
            downloadBtn = {
                hidden: true,
                icon: 'ion-ios-cloud-download',
                action: function(e) {
                    var eventNames;
                    e.preventDefault();
                    e.stopPropagation();
                    downloadBtn.hidden = true;
                    refreshBtn.hidden = true;
                    $scope.spinner = true;
                    addObservers($mmaModResource.getFileEventNames(module));
                    $mmaModResource.prefetchContent(module);
                }
            };
            refreshBtn = {
                icon: 'ion-android-refresh',
                hidden: true,
                action: function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    downloadBtn.hidden = true;
                    refreshBtn.hidden = true;
                    $scope.spinner = true;
                    $mmaModResource.invalidateContent(module.id).then(function() {
                        addObservers($mmaModResource.getFileEventNames(module));
                        $mmaModResource.prefetchContent(module);
                    });
                }
            };
            $scope.title = module.name;
            var filename = module.contents[0].filename;
            var extension = $mmUtil.getFileExtension(filename);
            if (module.contents.length == 1 || (extension != "html" && extension != "htm")) {
                $scope.icon = $mmUtil.getFileIcon(filename);
            } else {
                $scope.icon = $mmCourse.getModuleIconSrc('resource');
            }
            $scope.action = function(e) {
                $state.go('site.mod_resource', {module: module});
            };
            $scope.buttons = [downloadBtn, refreshBtn];
            $scope.spinner = false;
            $mmaModResource.getFilesStatus(module).then(function(result) {
                if (result.status == $mmFilepool.FILENOTDOWNLOADED) {
                    downloadBtn.hidden = false;
                } else if (result.status == $mmFilepool.FILEDOWNLOADING) {
                    $scope.spinner = true;
                    addObservers(result.eventNames);
                } else {
                    refreshBtn.hidden = false;
                }
            });
            $scope.$on('$destroy', function() {
                angular.forEach(observers, function(observer) {
                    observer.off();
                });
            });
        };
    };
    return self;
});

angular.module('mm.addons.mod_resource')
.factory('$mmaModResource', function($mmFilepool, $mmSite, $mmUtil, $mmFS, $http, $log, $q, mmaModResourceComponent) {
    $log = $log.getInstance('$mmaModResource');
    var self = {};
        self.downloadAllContent = function(module) {
        var promises = [];
        angular.forEach(module.contents, function(content) {
            var url,
                fullpath;
            if (content.type !== 'file') {
                return;
            }
            fullpath = content.filename;
            if (content.filepath !== '/') {
                fullpath = content.filepath.substr(1) + fullpath;
            }
            url = self._fixUrl(content.fileurl);
            promises.push($mmFilepool.downloadUrl($mmSite.getId(), url, false, mmaModResourceComponent, module.id)
            .then(function(internalUrl) {
                return [fullpath, $mmFilepool.getFilePathByUrl($mmSite.getId(), url)];
            }));
        });
        return $q.all(promises).then(function(files) {
            var filePaths = {};
            angular.forEach(files, function(file) {
                filePaths[file[0]] = file[1];
            });
            return filePaths;
        });
    };
        self._fixUrl = function(url) {
        url = self._removeRevisionFromUrl(url);
        url = $mmSite.fixPluginfileURL(url);
        return url;
    };
        self.getFileEventNames = function(module) {
        var eventNames = [];
        angular.forEach(module.contents, function(content) {
            var url;
            if (content.type !== 'file') {
                return;
            }
            url = self._fixUrl(content.fileurl);
            eventNames.push($mmFilepool.getFileEventNameByUrl($mmSite.getId(), url));
        });
        return eventNames;
    };
        self.getFilesStatus = function(module) {
        var promises = [],
            eventNames = [],
            notDownloaded = 0,
            downloading = 0,
            downloaded = 0,
            fileCount = 0;
        angular.forEach(module.contents, function(content) {
            var url;
            if (content.type !== 'file') {
                return;
            }
            fileCount++;
            url = self._fixUrl(content.fileurl);
            promises.push($mmFilepool.getFileStateByUrl($mmSite.getId(), url).then(function(state) {
                if (state == $mmFilepool.FILENOTDOWNLOADED) {
                    notDownloaded++;
                } else if (state == $mmFilepool.FILEDOWNLOADING) {
                    downloading++;
                    eventNames.push($mmFilepool.getFileEventNameByUrl($mmSite.getId(), url));
                } else if (state == $mmFilepool.FILEDOWNLOADED) {
                    downloaded++;
                }
            }));
        });
        function prepareResult() {
            var status = $mmFilepool.FILENOTDOWNLOADED;
            if (notDownloaded > 0) {
                status = $mmFilepool.FILENOTDOWNLOADED;
            } else if (downloading > 0) {
                status = $mmFilepool.FILEDOWNLOADING;
            } else if (downloaded == fileCount) {
                status = $mmFilepool.FILEDOWNLOADED;
            }
            return {status: status, eventNames: eventNames};
        }
        return $q.all(promises).then(function() {
            return prepareResult();
        }, function() {
            return prepareResult();
        });
    };
        self.getIframeSrc = function(module) {
        var mainFile = module.contents[0],
            mainFilePath = mainFile.filename;
        if (mainFile.filepath !== '/') {
            mainFilePath = mainFile.filepath.substr(1) + mainFilePath;
        }
        return self.downloadAllContent(module).then(function(filePaths) {
            return $mmUtil.getIframeSrc(filePaths, mainFilePath);
        });
    };
        self.getResourceHtml = function(contents, moduleId, target) {
        var deferred = $q.defer(),
            indexUrl,
            paths = {},
            promise;
        angular.forEach(contents, function(content, index) {
            var url = self._fixUrl(content.fileurl),
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
            var deferred;
            if ($mmFS.isAvailable()) {
                return $mmFilepool.downloadUrl($mmSite.getId(), indexUrl, false, mmaModResourceComponent, moduleId);
            } else {
                return $q.when(indexUrl);
            }
        })();
        return promise.then(function(url) {
            return $http.get(url).then(function(response) {
                if (typeof response.data !== 'string') {
                    return $q.reject();
                } else {
                    var html = angular.element('<div>');
                        html.append(response.data);
                    angular.forEach(html.find('img'), function(img) {
                        var src = paths[decodeURIComponent(img.getAttribute('src'))];
                        if (typeof src !== 'undefined') {
                            img.setAttribute('src', src);
                        }
                    });
                    angular.forEach(html.find('a'), function(anchor) {
                        var href = decodeURIComponent(anchor.getAttribute('href')),
                            url = paths[href],
                            ext = $mmUtil.getFileExtension(href);
                        if (typeof href !== 'undefined') {
                            anchor.setAttribute('href', url);
                            if (ext == 'html' || ext == 'html') {
                                anchor.setAttribute('mma-mod-resource-html-link', 1);
                                anchor.setAttribute('data-href', href);
                            }
                        }
                    });
                    return html.html();
                }
            });
        });
    };
        self.invalidateContent = function(moduleId) {
        return $mmFilepool.invalidateFilesByComponent($mmSite.getId(), mmaModResourceComponent, moduleId);
    };
        self.isDisplayedInIframe = function(module) {
        var inline = self.isDisplayedInline(module),
            iframe = false;
        if (inline && $mmFS.isAvailable()) {
            angular.forEach(module.contents, function(file) {
                var ext = $mmUtil.getFileExtension(file.filename);
                iframe = iframe || (ext == 'js' || ext == 'swf' || ext == 'css');
            });
        }
        return iframe;
    };
        self.isDisplayedInline = function(module) {
        var ext = $mmUtil.getFileExtension(module.contents[0].filename);
        return ext === 'htm' || ext === 'html';
    };
        self.logView = function(instanceId) {
        if (instanceId) {
            $mmSite.write('mod_resource_view_resource', {
                resourceid: instanceId
            });
        }
    };
        self.openFile = function(contents, moduleId) {
        var url = self._fixUrl(contents[0].fileurl),
            promise;
        if ($mmFS.isAvailable()) {
            promise = $mmFilepool.downloadUrl($mmSite.getId(), url, false, mmaModResourceComponent, moduleId);
        } else {
            promise = $q.when(url);
        }
        return promise.then(function(localUrl) {
            $mmUtil.openFile(localUrl);
        });
    };
        self.prefetchContent = function(module) {
        angular.forEach(module.contents, function(content) {
            var url;
            if (content.type !== 'file') {
                return;
            }
            url = self._fixUrl(content.fileurl);
            $mmFilepool.addToQueueByUrl($mmSite.getId(), url, mmaModResourceComponent, module.id);
        });
    };
        self._removeRevisionFromUrl = function(url) {
        var revisionRegex = new RegExp('/mod_resource/content/[0-9]+/');
        return url.replace(revisionRegex, '/mod_resource/content/0/');
    };
    return self;
});

angular.module('mm.addons.mod_url')
.controller('mmaModUrlIndexCtrl', function($scope, $stateParams, $mmaModUrl) {
    var module = $stateParams.module || {};
    $scope.title = module.name;
    $scope.description = module.description;
    $scope.url = (module.contents && module.contents[0] && module.contents[0].fileurl) ? module.contents[0].fileurl : undefined;
    $scope.go = function() {
        $mmaModUrl.open(module.instance, $scope.url);
    };
});

angular.module('mm.addons.mod_url')
.factory('$mmaModUrlCourseContentHandler', function($mmCourse, $mmaModUrl, $state) {
    var self = {};
        self.isEnabled = function() {
        return true;
    };
        self.getController = function(module) {
        return function($scope) {
            $scope.icon = $mmCourse.getModuleIconSrc('url');
            $scope.title = module.name;
            $scope.action = function(e) {
                $state.go('site.mod_url', {module: module});
            };
            if (module.contents && module.contents[0] && module.contents[0].fileurl) {
                $scope.buttons = [{
                    icon: 'ion-link',
                    action: function() {
                        $mmaModUrl.open(module.instance, module.contents[0].fileurl);
                    }
                }];
            }
        };
    };
    return self;
});

angular.module('mm.addons.mod_url')
.factory('$mmaModUrl', function($mmSite, $mmUtil) {
    var self = {};
        self.open = function(instanceId, url) {
        if (instanceId) {
            $mmSite.write('mod_url_view_url', {
                urlid: instanceId
            });
        }
        $mmUtil.openInBrowser(url);
    };
    return self;
});

angular.module('mm.addons.notes')
.factory('$mmaNotesHandlers', function($mmaNotes, $mmSite, $translate, $ionicLoading, $ionicModal, $mmUtil) {
    var self = {};
        self.addNote = function() {
        var self = {};
        self.isEnabled = function() {
            return $mmaNotes.isPluginEnabled();
        };
        self.isEnabledForUser = function(user, courseId) {
            return courseId && user.id != $mmSite.getUserId();
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
                    $scope.processing = true;
                    $mmaNotes.addNote(user.id, courseid, $scope.note.publishstate, $scope.note.text).then(function() {
                        $translate('mma.notes.eventnotecreated').then(function(str) {
                            $ionicLoading.show({
                                template: str,
                                duration: 2000
                            });
                        });
                    }, function(error) {
                        $mmUtil.showErrorModal(error);
                    }).finally(function() {
                        $scope.closeModal();
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
    return self;
});

angular.module('mm.addons.notes')
.factory('$mmaNotes', function($mmSite, $log, $q) {
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
        return $mmSite.write('core_notes_create_notes', data);
    };
        self.isPluginEnabled = function() {
        var infos;
        if (!$mmSite.isLoggedIn()) {
            return false;
        } else if (!$mmSite.canUseAdvancedFeature('enablenotes')) {
            return false;
        } else if (!$mmSite.wsAvailable('core_notes_create_notes')) {
            return false;
        }
        return true;
    };
    return self;
});

angular.module('mm.addons.notifications')
.controller('mmaNotificationsListCtrl', function($scope, $mmUtil, $mmaNotifications, mmaNotificationsListLimit) {
    var readCount = 0,
        unreadCount = 0;
    $scope.notifications = [];
    function fetchNotifications(refresh) {
        var limitFrom = refresh ? 0: unreadCount;
        return $mmaNotifications.getUnreadNotifications(limitFrom, mmaNotificationsListLimit).then(function(unread) {
            if (refresh) {
                unreadCount = unread.length;
                readCount = 0;
                $scope.notifications = unread;
            } else {
                unreadCount += unread.length;
                $scope.notifications = $scope.notifications.concat(unread);
            }
            if (unread.length < mmaNotificationsListLimit) {
                var readLimit = mmaNotificationsListLimit - unread.length;
                return $mmaNotifications.getReadNotifications(readCount, readLimit).then(function(read) {
                    readCount += read.length;
                    $scope.notifications = $scope.notifications.concat(read);
                    $scope.canLoadMore = read.length >= readLimit;
                }, function() {
                    if (unread.length == 0) {
                        $mmUtil.showErrorModal('mma.notifications.errorgetnotifications', true);
                    }
                });
            } else {
                $scope.canLoadMore = true;
            }
        }, function() {
            $mmUtil.showErrorModal('mma.notifications.errorgetnotifications', true);
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
});

angular.module('mm.addons.notifications')
.directive('mmaNotificationsActions', function($log, $mmModuleActionsDelegate, $state) {
    $log = $log.getInstance('mmaNotificationsActions');
    function link(scope, element, attrs) {
        if (scope.contexturl) {
            scope.actions = $mmModuleActionsDelegate.getActionsFor(scope.contexturl, scope.courseid);
        }
    }
    function controller($scope) {
        $scope.jump = function(e, state, stateParams) {
            e.stopPropagation();
            e.preventDefault();
            $state.go(state, stateParams);
        };
    }
    return {
        controller: controller,
        link: link,
        restrict: 'E',
        scope: {
            contexturl: '=',
            courseid: '='
        },
        templateUrl: 'addons/notifications/templates/actions.html',
    };
});

angular.module('mm.addons.notifications')
.filter('mmaNotificationsFormat', function($mmText) {
  return function(text) {
    text = text.replace(/-{4,}/ig, '');
    text = $mmText.replaceNewLines(text, '<br />');
    return text;
  };
});

angular.module('mm.addons.notifications')
.factory('$mmaNotifications', function($q, $log, $mmSite, $mmSitesManager, mmaNotificationsListLimit) {
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
        });
    }
        function getNotificationsCacheKey() {
        return 'mmaNotifications:list';
    };
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
            if (!$mmSite.wsAvailable('core_message_get_messages')) {
                return $q.reject();
            }
        });
    };
    return self;
});

angular.module('mm.addons.participants')
.controller('mmaParticipantsListCtrl', function($scope, $state, $stateParams, $mmUtil, $mmaParticipants, $ionicPlatform, $mmSite) {
    var course = $stateParams.course,
        courseid = course.id;
    $scope.participants = [];
    $scope.courseid = courseid;
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
});

angular.module('mm.addons.participants')
.factory('$mmaParticipants', function($log, $mmSite, $mmUser, mmaParticipantsListLimit) {
    $log = $log.getInstance('$mmaParticipants');
    var self = {};
        function getParticipantsListCacheKey(courseid) {
        return 'mmaParticipants:list:'+courseid;
    }
        self.getParticipants = function(courseid, limitFrom, limitNumber) {
        if (typeof(limitFrom) === 'undefined') {
            limitFrom = 0;
        }
        if (typeof(limitNumber) === 'undefined') {
            limitNumber = mmaParticipantsListLimit;
        }
        $log.debug('Get participants for course ' + courseid + ' starting at ' + limitFrom);
        var data = {
            "courseid" : courseid,
            "options[0][name]" : "limitfrom",
            "options[0][value]": limitFrom,
            "options[1][name]" : "limitnumber",
            "options[1][value]": limitNumber,
        };
        var preSets = {
            cacheKey: getParticipantsListCacheKey(courseid)
        };
        return $mmSite.read('core_enrol_get_enrolled_users', data, preSets).then(function(users) {
            var canLoadMore = users.length >= limitNumber;
            $mmUser.storeUsers(users);
            return {participants: users, canLoadMore: canLoadMore};
        });
    };
        self.invalidateParticipantsList = function(courseid) {
        return $mmSite.invalidateWsCacheForKey(getParticipantsListCacheKey(courseid));
    };
    return self;
});

angular.module('mm.addons.pushnotifications')
.factory('$mmPushNotificationsDelegate', function($log) {
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
});

angular.module('mm.addons.pushnotifications')
.factory('$mmaPushNotifications', function($mmSite, $log, $cordovaPush, $mmConfig, $mmText, $q, $cordovaDevice, $mmEvents, $mmUtil,
            $state, $mmLocalNotifications, $mmPushNotificationsDelegate, mmaPushNotificationsComponent) {
    $log = $log.getInstance('$mmaPushNotifications');
    var self = {},
        pushID;
        self.isPluginEnabled = function() {
        return $mmSite.wsAvailable('core_user_add_user_device')
                && $mmSite.wsAvailable('message_airnotifier_is_system_configured')
                && $mmSite.wsAvailable('message_airnotifier_are_notification_preferences_configured');
    };
        self.notificationClicked = function(data) {
        var observer = $mmEvents.on('initialized', function() {
            if (observer && observer.off) {
                observer.off();
            }
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
        if (data.message) {
            data.message = $mmText.cleanTags(data.message, true);
        }
        if ($mmUtil.isTrueOrOne(data.foreground)) {
            if ($mmLocalNotifications.isAvailable()) {
                var localNotif = {
                        id: 1,
                        title: data.title,
                        message: data.message,
                        at: new Date(),
                        data: {
                            notif: data.notif,
                            site: data.site
                        }
                    };
                $mmLocalNotifications.schedule(localNotif, mmaPushNotificationsComponent, data.site);
            }
        } else {
            self.notificationClicked(data);
        }
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
        return $mmConfig.get('gcmpn').then(function(gcmpn) {
            return $cordovaPush.register({
                senderID: gcmpn
            });
        });
    };
        self.registerDeviceOnMoodle = function() {
        $log.debug('Register device on Moodle.');
        if (!$mmSite.isLoggedIn() || !pushID) {
            return $q.reject();
        }
        return $mmConfig.get('app_id').then(function(appid) {
            var data = {
                appid:      appid,
                name:       window.device.name || '',
                model:      $cordovaDevice.getModel(),
                platform:   $cordovaDevice.getPlatform(),
                version:    $cordovaDevice.getVersion(),
                pushid:     pushID,
                uuid:       $cordovaDevice.getUUID()
            };
            return $mmSite.write('core_user_add_user_device', data);
        });
    };
    return self;
});

angular.module('mm.addons.remotestyles')
.factory('$mmaRemoteStyles', function($log, $q, $mmSite, $mmSitesManager, $mmFilepool, $http, $mmFS, mmaRemoteStylesComponent) {
    $log = $log.getInstance('$mmaRemoteStyles');
    var self = {},
        remoteStylesEl = angular.element(document.querySelector('#mobilecssurl'));
        self.clear = function() {
        remoteStylesEl.html('');
    };
        self.get = function(siteid) {
        siteid = siteid || $mmSite.getId();
        var promise;
        function downloadFileAndRemoveOld(url) {
            return $mmFilepool.getFileStateByUrl(siteid, url).then(function(state) {
                return state === $mmFilepool.FILEDOWNLOADED;
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
        self.get().then(function(styles) {
            remoteStylesEl.html(styles);
        });
    };
    return self;
});
