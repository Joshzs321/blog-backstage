import express=require('express')
import scanner from "./utils/scanner"//用于扫描路由中的所有路径
const app:express.Application=express()//生成一个express实例
new scanner().buildRouter("./app/controller")


app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
  })
  
app.listen(8888,function(){
    console.log("app listening on port 8888")
})

global.app=app