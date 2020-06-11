
//baseController是用来继承的，不同的controller都有succsss和error方法
export default class baseController{
    
    constructor(){

    }
    success(data:any){
        if(typeof data=="string"){
            this.res.end(data)
        }else{
            this.res.json({data:data,message:"scuccess"})
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