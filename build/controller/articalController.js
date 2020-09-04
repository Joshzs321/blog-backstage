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
var artical_1 = __importDefault(require("../model/artical"));
var baseController_1 = __importDefault(require("./baseController"));
var articalController = /** @class */ (function (_super) {
    __extends(articalController, _super);
    function articalController() {
        var _this = _super.call(this) || this;
        _this.artical = new artical_1.default();
        return _this;
    }
    articalController.prototype.saveArtical = function (req, res) {
        var _this = this;
        //有可能过期了，需要重新登录
        var userId = this.getUserId();
        if (!userId) {
            this.error({
                //前端根据这个状态吗在拦截器中跳转
                code: 401
            });
            return;
        }
        var articalId = req.param("articalId") || this.getUid();
        this.artical.insertArtical({
            articalId: articalId,
            title: req.param("title"),
            type: req.param("type"),
            content: req.param("content"),
            userId: userId,
            publishDate: req.param("publishDate")
        }, function (data) { _this.success(data); });
    };
    articalController.prototype.getArticalDetail = function (req, res) {
        var _this = this;
        this.artical.queryArticalById(req.param("articalId"), function (data) {
            _this.success(data);
        });
    };
    articalController.prototype.getArticalList = function (req, res) {
        var _this = this;
        var userId = this.getUserId();
        if (!userId) {
            this.error({
                //前端根据这个状态吗在拦截器中跳转
                code: 401
            });
            return;
        }
        this.artical.queryArticalList(req.param("currentPage"), req.param("key"), 20, userId, function (data) {
            _this.success(data);
        });
    };
    articalController.prototype.getAllArticalList = function (req, res) {
        var _this = this;
        this.artical.queryArticalList(req.param("currentPage"), req.param("key"), 20, "", function (data) {
            _this.success(data);
        });
    };
    articalController.prototype.deleteArticalById = function (req, res) {
        var _this = this;
        var userId = this.getUserId();
        if (!userId) {
            this.error({
                code: 401
            });
            return;
        }
        console.log(req.param("articalId"));
        this.artical.deleteArtical({ articalId: req.param("articalId"), userId: userId }, function (data) {
            _this.success(data);
        });
    };
    __decorate([
        decorator_1.post("/saveArtical"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], articalController.prototype, "saveArtical", null);
    __decorate([
        decorator_1.post("/getArticalDetail"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], articalController.prototype, "getArticalDetail", null);
    __decorate([
        decorator_1.post("/getArticalList"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], articalController.prototype, "getArticalList", null);
    __decorate([
        decorator_1.post("/getAllArticalList"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], articalController.prototype, "getAllArticalList", null);
    __decorate([
        decorator_1.post("/deleteArticalById"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], articalController.prototype, "deleteArticalById", null);
    articalController = __decorate([
        decorator_1.controller("/artical"),
        __metadata("design:paramtypes", [])
    ], articalController);
    return articalController;
}(baseController_1.default));
exports.default = articalController;
