import {controller,get,post} from "../utils/decorator"
//操作数据库的
import user from "../model/user"
import baseController from "./baseController" 
//加密生成token
let nodecache =require("nodecache")
let md5 =require("md5")
@controller("/user")
export default class userController extends baseController{
    test:any
    user:any
    constructor(){
        super()
        this.user=new user()
    }
    @get("/login")
    login(req:any,res:any,that:any){
        let username=req.param("username")
        let password=req.param("password")
        this.user.queryUserInfoByPasswordAndUserName({
            username:username,
            password:password
        },(data:any)=>{
            if(data.length>0){//查询到数据库中有相关的数据
                let token=md5(username+password)
                //相当于服务端的session，而不用每次都去访问数据库
                //可以在其他模块中通过nodecache.get获取
                nodecache.set(token,data[0].userId)
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