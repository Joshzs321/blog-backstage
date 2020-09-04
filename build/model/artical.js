"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = __importDefault(require("../common/db"));
var artical = /** @class */ (function () {
    function artical() {
    }
    artical.prototype.deleteArtical = function (data, callback) {
        console.log("===");
        console.log(data.articalId);
        db_1.default.delete({
            bizeType: "blog",
            collection: "artical",
            query: { articalId: data.articalId, userId: data.userId },
        }, function (res) {
            callback(res.result);
        });
    };
    artical.prototype.insertArtical = function (data, callback) {
        //这里使用update是因为只有当articleId不一样时才插入新的数据，否则就更新已有内容
        db_1.default.update({
            bizeType: "blog",
            collection: "artical",
            query: { articalId: data.articalId },
            data: data
        }, function (res) {
            callback(res.result);
        });
    };
    artical.prototype.queryArticalById = function (id, callback) {
        db_1.default.select({
            bizeType: "blog",
            collection: "artical",
            query: { articalId: id },
        }, function (res) {
            callback(res);
        });
    };
    //用于分页显示
    //这个key是用来实现搜索的
    artical.prototype.queryArticalList = function (currentPage, key, pageSize, userId, callback) {
        if (currentPage === void 0) { currentPage = 1; }
        if (!pageSize) {
            pageSize = 20;
        }
        db_1.default.getCollection({
            bizeType: "blog",
            collection: "artical",
        }, function (coll) {
            var query = null;
            //给后台管理界面传数据
            if (userId) {
                query = coll.find({ title: new RegExp(key) }).skip((currentPage - 1) * pageSize).sort({ pulishDate: -1 }).limit(pageSize);
            }
            else {
                //给前端博客页面传数据
                //将点赞表和文章博客表聚合查询
                query = coll.aggregate([{
                        $lookup: {
                            from: "thumbs_up",
                            localField: 'articalId',
                            foreignField: "articalId",
                            as: 'thumbsUp'
                        }
                    }]).skip((currentPage - 1) * pageSize).sort({ pulishDate: -1 }).limit(pageSize);
            }
            query.toArray(function (err, res) {
                coll.find({ title: new RegExp(key) }).count().then(function (count) {
                    callback({
                        list: res,
                        totalCount: count,
                        currentPage: currentPage
                    });
                });
            });
        });
    };
    return artical;
}());
exports.default = artical;
