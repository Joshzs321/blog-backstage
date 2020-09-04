"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = __importDefault(require("../common/db"));
var comment = /** @class */ (function () {
    function comment() {
    }
    comment.prototype.insertComment = function (data, callback) {
        db_1.default.insert({
            bizeType: "blog",
            collection: "comment",
            data: { content: data.content, articalId: data.articalId }
        }, function (res) {
            callback(res.result);
        });
    };
    comment.prototype.queryCommentListByArticalId = function (articalId, callback) {
        db_1.default.select({
            bizeType: "blog",
            collection: "comment",
            query: { articalId: articalId },
        }, function (res) {
            callback(res);
        });
    };
    return comment;
}());
exports.default = comment;
