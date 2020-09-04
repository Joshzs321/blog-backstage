import {controller,get,post} from "../utils/decorator"
//操作数据库的
import user from "../model/user"
import baseController from "./baseController" 
import store from './store'
//加密生成token
let nodecache =require("nodecache")
let md5 =require("md5")
@controller("/api/user")
export default class userController extends baseController{
    user:any
    constructor(){
        super()
        this.user=new user()
    }
    @post("/login")
    login(req:any,res:any){      
        let username=req.body.username
        console.log("username")
        console.log(username)
        let password=req.body.password
        this.user.queryUserInfoByPasswordAndUserName({
            username:username,
            password:password
        },(data:any)=>{
            if(data.length>0){//查询到数据库中有相关的数据
                let token=md5(username+password)
                //相当于服务端的session，而不用每次都去访问数据库
                //可以在其他模块中通过nodecache.get获取
                console.log("7777")
                console.log(token)
                nodecache.set(token,data[0].username)
                store.set(token,data[0].username)
                console.log("userController -> login -> nodecache", nodecache.get(token))
                console.log("userController -> login -> data[0]", data[0])
                this.success({
                    isLogin:"ok",
                    token:token
                })//给客户端返回json数据
            }else{
                this.error({isLogin:"no"})
            }
           
        })
    }

    
}

