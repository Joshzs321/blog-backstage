import db from "../common/db"
export default class comment {
    insertComment(data: any, callback: Function) {
        db.insert({
            bizeType: "blog", //数据库
            collection: "comment", //数据表
            data:{content:data.content,articalId:data.articalId}
        }, (res: any) => {
            callback(res.result)
        })
    }

    queryCommentListByArticalId(articalId: number, callback: Function) {
        db.select({
            bizeType: "blog", //数据库
            collection: "comment", //数据表
            query: {articalId:articalId},
        }, (res: any) => {
            callback(res)
        })
    }
}