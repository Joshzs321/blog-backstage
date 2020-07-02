import {controller,get,post} from "../utils/decorator"
//操作数据库的
import artical from "../model/artical"
import baseController from "./baseController" 
@controller("/artical")
export default class articalController extends baseController{
    artical:any
    constructor(){
        super()
        this.artical=new artical()
    }

    @post("/saveArtical")
    public saveArtical(req:any,res:any){
        //有可能过期了，需要重新登录
        let userId=this.getUserId()
        if(!userId){
            this.error({
                //前端根据这个状态吗在拦截器中跳转
                code:401
            })
            return
        }
        let articalId=req.param("articalId")||this.getUid()
        this.artical.insertArtical({
            articalId:articalId,
            title:req.param("title"),
            type:req.param("type"),
            content:req.param("content"),
            userId:userId,
            publishDate:req.param("publishDate")
        },(data:any)=>{this.success(data)})
    }
    @post("/getArticalDetail")
    public getArticalDetail(req:any,res:any){
        this.artical.queryArticalById(req.param("articalId"),(data:any)=>{
            this.success(data)
        })
    }

    @post("/getArticalList")
    public getArticalList(req:any,res:any){
        let userId=this.getUserId()
        if(!userId){
            this.error({
                //前端根据这个状态吗在拦截器中跳转
                code:401
            })
            return
        }
        this.artical.queryArticalList(req.param("currentPage"),req.param("key"),20,userId,(data:any)=>{
            this.success(data)
        })
    }
    @post("/getAllArticalList")
    public getAllArticalList(req:any,res:any){
        this.artical.queryArticalList(req.param("currentPage"),req.param("key"),20,"",(data:any)=>{
            this.success(data)
        })
    }
    @post("/deleteArticalById")
    public deleteArticalById(req:any,res:any){
        let userId=this.getUserId()
        if(!userId){
            this.error({
                code:401
            })
            return
        }
        console.log(req.param("articalId"))
        this.artical.deleteArtical({articalId:req.param("articalId"),userId:userId},(data:any)=>{
            this.success(data)
        })
    }
    
}