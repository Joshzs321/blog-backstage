import "reflect-metadata" //用于将

const PATH_METADATA=Symbol();
const METHOD_METADATA=Symbol()
const descriptorBuilder={
    setMapping(target:any,key:string|symbol,path:string,method:string){
        if(!target.constructor.mapping){
            target.constructor.mapping={}
        }
        target.constructor.mapping[path]={
            method:method,
            callback:target[key]
        }
    },
    setRouter(target:any,path:string){
            let routeMap=target.mapping;
            for(let childpath in routeMap){
                let comboPath=childpath;
                if(path!="/")
                comboPath=path+childpath
                global.app[routeMap[childpath].method](comboPath,function(req:any,res:any){
                    // let result=routeMap[childpath].callback(req,res,target)
                    // if(typeof result=="object"){
                    //     res.json(result)
                    // }else{
                    //     res.end(result)
                    // }
                    let instance=new target()
                    instance.req=req
                    instance.res=res
                    routeMap[childpath].callback.call(instance,req,res)
                })
            }
    }
}

const controller=(path:string)=>{
    return (target:any)=>{
        descriptorBuilder.setRouter(target,path)
        Reflect.defineMetadata(PATH_METADATA,path,target)
    }
}

const get=(path:string)=>{
    return (target:any,key:string|symbol,descriptor:any)=>{
        descriptorBuilder.setMapping(target,key,path,"get")
        Reflect.defineMetadata(PATH_METADATA,path,target,descriptor.value)
    }
}

const post=(path:string)=>{
    return (target:any,key:string|symbol,descriptor:any)=>{
        descriptorBuilder.setMapping(target,key,path,"post")
        Reflect.defineMetadata(PATH_METADATA,path,target,descriptor.value)
    }
}

export {controller,get,post}