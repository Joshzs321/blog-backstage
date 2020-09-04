"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongodbPool = /** @class */ (function () {
    function mongodbPool() {
        this.option = {
            reconnectTries: 3,
            auto_reconnect: true,
            poolSize: 40,
            connectTimeoutMS: 500,
            useNewUrlParser: true
        };
    }
    mongodbPool.prototype.initPool = function (cb) {
        var _this = this;
        mongodbPool.MC.connect(mongodbPool.url, this.option, function (err, db) {
            if (err)
                throw err;
            _this.p_db = db;
            if (cb && typeof (cb) == 'function')
                cb(_this.p_db);
        });
    };
    mongodbPool.prototype.getInstance = function (cb) {
        if (!this.p_db) {
            this.initPool(cb);
        }
        else {
            if (cb && typeof (cb) == 'function')
                cb(this.p_db);
        }
    };
    mongodbPool.url = "mongodb://localhost:27017/blog";
    mongodbPool.MC = require('mongodb').MongoClient;
    return mongodbPool;
}());
exports.default = new mongodbPool();
