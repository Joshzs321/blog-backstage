import {controller,get,post} from "../utils/decorator"
//操作数据库的
import thumbsUp from "../model/thumbsUp"
import baseController from "./baseController" 
@controller("/thumbsUp")
export default class thumbsUpController extends baseController{
    thumbsUp:any
    constructor(){
        super()
        this.thumbsUp=new thumbsUp()
    }

    @post("/addThumbs")
    public addThumbs(req:any,res:any){
        this.thumbsUp.updateThumbs({
            articalId:req.param("articalId"),
            count:req.param("count")
        },(data:any)=>{this.success(data)})
    }
}