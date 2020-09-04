import fs from "fs"
import path from "path"
export default class Router{
    buildRouter(scanDir:string){
        let self=this
        fs.readdir(scanDir,function(err,files){
            if(err){
                console.warn(err)
            }else{
                files.forEach(function(filename:string){
                    var filedir=path.join(scanDir,filename)//得到一个完整的路径
                    fs.stat(filedir,function(error,stats){
                        if(error){
                            console.log("读取文件失败")
                        }else{
                            var isFile=stats.isFile()
                            var isDir=stats.isDirectory()
                            if(isFile){
                                let controller=require("../../"+filedir)
                                controller=controller.default||controller
                                // new controller()                         
                            }else if(isDir){
                                self.buildRouter(scanDir)
                            }
                        }
                    })
                })
            }
        })
    }
}