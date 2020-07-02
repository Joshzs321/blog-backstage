import db from "../common/db"
export default class artical {
    deleteArtical(data:any,callback: Function){
        console.log("===")
        console.log(data.articalId)
        db.delete({
            bizeType: "blog", //数据库
            collection: "artical", //数据表
            query: {articalId:data.articalId,userId:data.userId},
        }, (res: any) => {
            callback(res.result)
        })
    }
    insertArtical(data: any, callback: Function) {
        //这里使用update是因为只有当articleId不一样时才插入新的数据，否则就更新已有内容
        db.update({
            bizeType: "blog", //数据库
            collection: "artical", //数据表
            query: {articalId:data.articalId},
            data
        }, (res: any) => {
            callback(res.result)
        })
    }
    queryArticalById(id: number, callback: Function) {
        db.select({
            bizeType: "blog", //数据库
            collection: "artical", //数据表
            query: {articalId:id},
        }, (res: any) => {
            callback(res)
        })
    }
    //用于分页显示
    //这个key是用来实现搜索的
    queryArticalList(currentPage: number=1, key:string, pageSize:number,userId:string,callback: Function) {
        if(!<number>pageSize){
            pageSize=20
        }
        db.getCollection({
            bizeType: "blog", //数据库
            collection: "artical", //数据表
        }, (coll: any) => {
            let query=null
            //给后台管理界面传数据
            if(userId){
               query=coll.find({title:new RegExp(key)}).skip((currentPage-1)*<number>pageSize).sort({pulishDate:-1}).limit(<number>pageSize)
            }else{
                //给前端博客页面传数据
                //将点赞表和文章博客表聚合查询
                query=coll.aggregate([{
                    $lookup:{
                        from:"thumbs_up",
                        localField:'articalId',
                        foreignField:"articalId",
                        as:'thumbsUp'
                    }
                }]).skip((currentPage-1)*<number>pageSize).sort({pulishDate:-1}).limit(<number>pageSize)
            }
            query.toArray((err:any,res:any)=>{
                coll.find({title:new RegExp(key)}).count().then((count:any)=>{
                    callback({
                        list:res,
                        totalCount:count,
                        currentPage:currentPage
                    })
                })
            }) 
        })
    }
}