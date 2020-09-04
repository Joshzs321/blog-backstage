"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var scanner_1 = __importDefault(require("./utils/scanner")); //用于扫描路由中的所有路径
var app = express(); //生成一个express实例
var bodyParser = require("body-parser"); //解析json格式需要中间件解析
new scanner_1.default().buildRouter("./app/controller");
var cookieParser = require('cookie-parser');
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.all('*', function (req, res, next) {
    console.log("1234");
    res.header("Access-Control-Allow-Origin", req.header('origin'));
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild,token');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.listen(8888, function () {
    console.log("app listening on port 8888");
});
global.app = app;
