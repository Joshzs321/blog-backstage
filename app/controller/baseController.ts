
//baseController是用来继承的，不同的controller都有succsss和error方法
let nodecache =require("nodecache")
import store from './store'
const{v4:uuidv4} =require('uuid')
export default class baseController{
    
    constructor(){

    }
    getUid(){
        return uuidv4()
    }
    getUserId(){
        let token=this.req.query.token;
        console.log("baseController -> getUserId -> token", token)
        
        console.log("baseController -> getUserId -> store", store)
        if(!token){
            //如果前台没有传cookie到后台，或者前台传回来的token和后台session中的token不一致，重新登录
            //缺点是如果服务器关闭，这个存储就会消失
            return ""
        }else{
            console.log("baseController -> getUserId -> nodecache.get(token)", nodecache.get(token))
            return nodecache.get(token)
        }
    }
    success(data:any){
        if(typeof data=="string"){
            this.res.end(data)
        }else{
            this.res.json({data:data,message:"success"})
        }
    }

    error(data:any){
        if(typeof data=="string"){
            this.res.end(data)
        }else{
            this.res.json({data:data,message:"error"})
        }
    }
}