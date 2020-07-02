import db from "../common/db"
export default class user {
    test="1"
    queryUserInfoByPasswordAndUserName(data: any, callback: Function) {
        console.log("1234")
        console.log(data)
        db.select({
            bizeType: "blog", //数据库
            collection: "user", //数据表
            query: {
                username: data.username,
                password: data.password
            }
        }, (res: any) => {
            callback(res)
        })
    }
}