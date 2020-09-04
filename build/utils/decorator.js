"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata"); //用于将
var PATH_METADATA = Symbol();
var METHOD_METADATA = Symbol();
var descriptorBuilder = {
    setMapping: function (target, key, path, method) {
        if (!target.constructor.mapping) {
            target.constructor.mapping = {};
        }
        target.constructor.mapping[path] = {
            method: method,
            callback: target[key]
        };
    },
    setRouter: function (target, path) {
        var routeMap = target.mapping;
        var _loop_1 = function (childpath) {
            var comboPath = childpath;
            if (path != "/")
                comboPath = path + childpath;
            global.app[routeMap[childpath].method](comboPath, function (req, res) {
                // let result=routeMap[childpath].callback(req,res,target)
                // if(typeof result=="object"){
                //     res.json(result)
                // }else{
                //     res.end(result)
                // }
                var instance = new target();
                instance.req = req;
                instance.res = res;
                routeMap[childpath].callback.call(instance, req, res);
            });
        };
        for (var childpath in routeMap) {
            _loop_1(childpath);
        }
    }
};
var controller = function (path) {
    return function (target) {
        descriptorBuilder.setRouter(target, path);
        Reflect.defineMetadata(PATH_METADATA, path, target);
    };
};
exports.controller = controller;
var get = function (path) {
    return function (target, key, descriptor) {
        descriptorBuilder.setMapping(target, key, path, "get");
        Reflect.defineMetadata(PATH_METADATA, path, target, descriptor.value);
    };
};
exports.get = get;
var post = function (path) {
    return function (target, key, descriptor) {
        descriptorBuilder.setMapping(target, key, path, "post");
        Reflect.defineMetadata(PATH_METADATA, path, target, descriptor.value);
    };
};
exports.post = post;
