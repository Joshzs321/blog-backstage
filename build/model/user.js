"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = __importDefault(require("../common/db"));
var user = /** @class */ (function () {
    function user() {
        this.test = "1";
    }
    user.prototype.queryUserInfoByPasswordAndUserName = function (data, callback) {
        console.log("1234");
        console.log(data);
        db_1.default.select({
            bizeType: "blog",
            collection: "user",
            query: {
                username: data.username,
                password: data.password
            }
        }, function (res) {
            callback(res);
        });
    };
    return user;
}());
exports.default = user;
