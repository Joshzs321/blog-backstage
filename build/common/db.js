"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var connect = /** @class */ (function () {
    function connect() {
    }
    connect.prototype.add0 = function (m) { return m < 10 ? '0' + m : m; };
    connect.prototype.getTimestamp = function () {
        var time = new Date();
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        var d = time.getDate();
        var h = time.getHours();
        return y + '-' + this.add0(m) + '-' + this.add0(d);
    };
    connect.prototype.initDB = function (dbName, collname, callback) {
        connect.MongoPool.getInstance(function (db) {
            var dbase = db.db(dbName);
            var collection = dbase.collection(collname);
            callback(db, collection);
        });
    };
    connect.prototype.insert = function (params, callback) {
        var _this = this;
        this.initDB(params.bizType, params.collection, function (db, collection) {
            params.data.timestamp = _this.getTimestamp();
            params.data.date = new Date(params.data.timestamp).getTime();
            collection.insertOne(params.data, function (err, res) {
                if (err) {
                    callback({ err: err.message });
                }
                else {
                    callback(res);
                }
            });
        });
    };
    connect.prototype.select = function (params, callback) {
        this.initDB(params.bizType, params.collection, function (db, collection) {
            collection.find(params.query).toArray(function (err, res) {
                if (err) {
                    callback({ err: err.message });
                }
                else {
                    callback(res);
                }
            });
        });
    };
    connect.prototype.update = function (params, callback) {
        this.initDB(params.bizType, params.collection, function (db, collection) {
            collection.update(params.query, { $set: params.data }, { upsert: true }, function (err, res) {
                if (err) {
                    callback({ err: err.message });
                }
                else {
                    callback(res);
                }
            });
        });
    };
    connect.prototype.delete = function (params, callback) {
        this.initDB(params.bizType, params.collection, function (db, collection) {
            console.log("999");
            collection.removeOne(params.query, function (err, res) {
                console.log(params.query);
                if (err) {
                    callback({ err: err.message });
                }
                else {
                    callback(res);
                }
            });
        });
    };
    connect.prototype.getCollection = function (params, callback) {
        this.initDB(params.bizType, params.collection, function (db, collection) {
            callback(collection);
        });
    };
    connect.MongoPool = require("./mongoPool").default;
    return connect;
}());
exports.default = new connect();
