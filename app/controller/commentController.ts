import {controller,get,post} from "../utils/decorator"
//操作数据库的
import comment from "../model/comment"
import baseController from "./baseController" 
@controller("/comment")
export default class commentController extends baseController{
    comment:any
    constructor(){
        super()
        this.comment=new comment()
    }

    @get("/saveComment")
    public saveComment(req:any,res:any){
        console.log("222")
        console.log(this.comment)
        this.comment.insertComment({
            articalId:req.param("articalId"),
            content:req.param("content"),
        },(data:any)=>{this.success(data)})
    }

    @get("/getCommentList")
    public getCommentList(req:any,res:any){
        console.log("111")
        console.log(this.comment)
        this.comment.queryCommentListByArticalId(req.param("articalId"),(data:any)=>{
            this.success(data)
        })
    }
    
}