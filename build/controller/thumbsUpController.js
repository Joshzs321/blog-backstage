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
var thumbsUp_1 = __importDefault(require("../model/thumbsUp"));
var baseController_1 = __importDefault(require("./baseController"));
var thumbsUpController = /** @class */ (function (_super) {
    __extends(thumbsUpController, _super);
    function thumbsUpController() {
        var _this = _super.call(this) || this;
        _this.thumbsUp = new thumbsUp_1.default();
        return _this;
    }
    thumbsUpController.prototype.addThumbs = function (req, res) {
        var _this = this;
        this.thumbsUp.updateThumbs({
            articalId: req.param("articalId"),
            count: req.param("count")
        }, function (data) { _this.success(data); });
    };
    __decorate([
        decorator_1.post("/addThumbs"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], thumbsUpController.prototype, "addThumbs", null);
    thumbsUpController = __decorate([
        decorator_1.controller("/thumbsUp"),
        __metadata("design:paramtypes", [])
    ], thumbsUpController);
    return thumbsUpController;
}(baseController_1.default));
exports.default = thumbsUpController;
