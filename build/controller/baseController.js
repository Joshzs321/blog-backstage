"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//baseController是用来继承的，不同的controller都有succsss和error方法
var nodecache = require("nodecache");
var uuidv4 = require('uuid').v4;
var baseController = /** @class */ (function () {
    function baseController() {
    }
    baseController.prototype.getUid = function () {
        return uuidv4();
    };
    baseController.prototype.getUserId = function () {
        var token = this.req.query.token;
        console.log("222211");
        console.log(nodecache.get(token));
        if (!token || !nodecache.get(token)) {
            //如果前台没有传cookie到后台，或者前台传回来的token和后台session中的token不一致，重新登录
            //缺点是如果服务器关闭，这个存储就会消失
            return "";
        }
        else {
            return nodecache.get(token);
        }
    };
    baseController.prototype.success = function (data) {
        if (typeof data == "string") {
            this.res.end(data);
        }
        else {
            this.res.json({ data: data, message: "success" });
        }
    };
    baseController.prototype.error = function (data) {
        if (typeof data == "string") {
            this.res.end(data);
        }
        else {
            this.res.json({ data: data, message: "error" });
        }
    };
    return baseController;
}());
exports.default = baseController;
