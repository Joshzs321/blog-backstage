import db from '../common/db'
export default class thumbsUp{
    updateThumbs(data:any,callback:Function){
        db.update({
            bizType:'blog',
            collection:'thumbs_up',
            query:{articalId:data.articalId},
            data:{count:data.count}
        },(res:any)=>{
            callback(res.result)
        })
    }
}