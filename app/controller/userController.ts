import {controller,get,post} from "../utils/decorator"
//操作数据库的
import user from "../model/user"
import baseController from "./baseController" 
@controller("/user")
export default class userController extends baseController{
    test:any
    constructor(){
        super()
        this.test="123"
    }
    @get("/login")
    login(req:any,res:any,that:any){
        console.log(this.test)
        let username=req.param("username")
        let password=req.param("password")
        console.log("222")
        that.user.queryUserInfoByPasswordAndUserName({
            username:username,
            password:password
        },(data:any)=>{
            this.success(data)//给客户端返回json数据
        })
    }

    
}