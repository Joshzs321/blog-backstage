import express=require('express')
import scanner from "./utils/scanner"//用于扫描路由中的所有路径
const app:express.Application=express()//生成一个express实例
new scanner().buildRouter("./app/controller")

app.get('/',function(req,res){
    res.json('Hello')
    res.writeHead(200,{"HAHA":"http/text application/JSON"})
})

app.listen(8888,function(){
    console.log("app listening on port 8888")
})

global.app=app