// Copyright 2012 YDN Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Provide atomic CRUD database operations on a transaction queue.
 *
 *
 */


goog.provide('ydn.db.tr.DbOperator');
goog.require('ydn.db.crud.IOperator');
goog.require('ydn.db.tr.AtomicSerial');
goog.require('ydn.db.tr.Thread');
goog.require('ydn.debug.error.NotSupportedException');



/**
 * Construct storage to execute CRUD database operations.
 *
 * Execution database operation is atomic, if a new transaction require,
 * otherwise existing transaction is used and the operation become part of
 * the existing transaction. A new transaction is required if the transaction
 * is not active or locked. Active transaction can be locked by using
 * mutex.
 *
 * @param {!ydn.db.tr.Storage} storage base storage object.
 * @param {!ydn.db.schema.Database} schema
 * @param {ydn.db.tr.Thread} tx_thread
 * @param {ydn.db.tr.Thread} sync_thread
 * @constructor
 * @struct
 */
ydn.db.tr.DbOperator = function(storage, schema, tx_thread, sync_thread) {

  /**
   * @final
   * @type {!ydn.db.tr.Storage}
   * @private
   */
  this.storage_ = storage;

  /**
   * @protected
   * @final
   * @type {!ydn.db.schema.Database}
   */
  this.schema = schema;

  /**
   * @final
   */
  this.tx_thread = tx_thread;

  /**
   * @final
   */
  this.sync_thread = sync_thread;

  this.executor = null;
};


/**
 * @protected
 * @type {goog.debug.Logger} logger.
 */
ydn.db.tr.DbOperator.prototype.logger =
    goog.log.getLogger('ydn.db.tr.DbOperator');


/**
 * @type {ydn.db.crud.req.IRequestExecutor}
 * @protected
 */
ydn.db.tr.DbOperator.prototype.executor;


/**
 * @type {ydn.db.tr.Thread}
 * @protected
 */
ydn.db.tr.DbOperator.prototype.tx_thread;


/**
 * @type {ydn.db.tr.Thread}
 * @protected
 */
ydn.db.tr.DbOperator.prototype.sync_thread;


/**
 * @final
 * @return {number}
 */
ydn.db.tr.DbOperator.prototype.getTxNo = function() {
  return this.tx_thread.getTxNo();
};


/**
 * Abort an active transaction.
 */
ydn.db.tr.DbOperator.prototype.abort = function() {
  this.tx_thread.abort();
};


/**
 * @final
 * @return {ydn.db.crud.req.IRequestExecutor}
 */
ydn.db.tr.DbOperator.prototype.getExecutor = function() {
  if (!this.executor) {
    this.executor = this.storage_.newExecutor();
  }

  return this.executor;
};


/**
 * @final
 * @return {!ydn.db.tr.Storage} storage.
 */
ydn.db.tr.DbOperator.prototype.getStorage = function() {
  return this.storage_;
};


/**
 * @final
 * @param {string|StoreSchema} store_name_or_schema store name or schema.
 * @return {!ydn.db.schema.Store} storage.
 */
ydn.db.tr.DbOperator.prototype.getStore = function(store_name_or_schema) {

  var store_name = goog.isString(store_name_or_schema) ?
      store_name_or_schema : goog.isObject(store_name_or_schema) ?
      store_name_or_schema['name'] : undefined;
  if (!goog.isString(store_name)) {
    throw new ydn.debug.error.ArgumentException('store name ' + store_name +
        ' must be a string, but ' + typeof store_name);
  }

  var store = this.schema.getStore(store_name);
  if (!store) {
    if (!this.schema.isAutoSchema()) {
      throw new ydn.debug.error.ArgumentException('store name "' + store_name +
          '" not found.');
    }
    var schema = goog.isObject(store_name_or_schema) ?
        store_name_or_schema : {'name': store_name};

    // this is async process, but we don't need to wait for it.
    store = ydn.db.schema.Store.fromJSON(/** @type {!StoreSchema} */ (schema));
    goog.log.finer(this.logger, 'Adding object store: ' + store_name);
    this.addStoreSchema(store);

  } else if (this.schema.isAutoSchema() &&
      goog.isObject(store_name_or_schema)) {
    // if there is changes in schema, change accordingly.
    var new_schema = ydn.db.schema.Store.fromJSON(store_name_or_schema);
    var diff = store.difference(new_schema);
    if (diff) {
      throw new ydn.debug.error.NotSupportedException(diff);
      // this.addStoreSchema(store);
    }
  }
  if (!store) {
    throw new ydn.db.NotFoundError(store_name);
  }
  return store;
};



/**
 * Add or update a store issuing a version change event.
 * @protected
 * @param {!StoreSchema|!ydn.db.schema.Store} store schema.
 * @return {!goog.async.Deferred} promise.
 */
ydn.db.tr.DbOperator.prototype.addStoreSchema = function(store) {
  return this.getStorage().addStoreSchema(store);
};


if (goog.DEBUG) {
  /** @override */
  ydn.db.tr.DbOperator.prototype.toString = function() {
    var s = 'TxStorage:' + this.getStorage().getName();
    return s;
  };
}




