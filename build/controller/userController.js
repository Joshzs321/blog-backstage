"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var decorator_1 = require("../utils/decorator");
//操作数据库的
var user_1 = __importDefault(require("../model/user"));
var baseController_1 = __importDefault(require("./baseController"));
//加密生成token
var nodecache = require("nodecache");
var md5 = require("md5");
var userController = /** @class */ (function (_super) {
    __extends(userController, _super);
    function userController() {
        var _this = _super.call(this) || this;
        _this.user = new user_1.default();
        return _this;
    }
    userController.prototype.login = function (req, res) {
        var _this = this;
        var username = req.body.username;
        console.log("username");
        console.log(username);
        var password = req.body.password;
        this.user.queryUserInfoByPasswordAndUserName({
            username: username,
            password: password
        }, function (data) {
            if (data.length > 0) { //查询到数据库中有相关的数据
                var token = md5(username + password);
                //相当于服务端的session，而不用每次都去访问数据库
                //可以在其他模块中通过nodecache.get获取
                console.log("7777");
                console.log(token);
                nodecache.set(token, data[0].userId);
                _this.success({
                    isLogin: "ok",
                    token: token
                }); //给客户端返回json数据
            }
            else {
                _this.error({ isLogin: "no" });
            }
        });
    };
    __decorate([
        decorator_1.post("/login"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], userController.prototype, "login", null);
    userController = __decorate([
        decorator_1.controller("/user"),
        __metadata("design:paramtypes", [])
    ], userController);
    return userController;
}(baseController_1.default));
exports.default = userController;
