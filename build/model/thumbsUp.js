"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = __importDefault(require("../common/db"));
var thumbsUp = /** @class */ (function () {
    function thumbsUp() {
    }
    thumbsUp.prototype.updateThumbs = function (data, callback) {
        db_1.default.update({
            bizType: 'blog',
            collection: 'thumbs_up',
            query: { articalId: data.articalId },
            data: { count: data.count }
        }, function (res) {
            callback(res.result);
        });
    };
    return thumbsUp;
}());
exports.default = thumbsUp;
