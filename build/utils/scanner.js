"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var Router = /** @class */ (function () {
    function Router() {
    }
    Router.prototype.buildRouter = function (scanDir) {
        var self = this;
        fs_1.default.readdir(scanDir, function (err, files) {
            if (err) {
                console.warn(err);
            }
            else {
                files.forEach(function (filename) {
                    var filedir = path_1.default.join(scanDir, filename); //得到一个完整的路径
                    fs_1.default.stat(filedir, function (error, stats) {
                        if (error) {
                            console.log("读取文件失败");
                        }
                        else {
                            var isFile = stats.isFile();
                            var isDir = stats.isDirectory();
                            if (isFile) {
                                var controller = require("../../" + filedir);
                                controller = controller.default || controller;
                                new controller();
                            }
                            else if (isDir) {
                                self.buildRouter(scanDir);
                            }
                        }
                    });
                });
            }
        });
    };
    return Router;
}());
exports.default = Router;
