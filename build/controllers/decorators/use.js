"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = void 0;
require("reflect-metadata");
const Metadatakeys_1 = require("./Metadatakeys");
function use(middleware) {
    return function (target, key, desc) {
        const middlewares = Reflect.getMetadata(Metadatakeys_1.Metadatakeys.middleware, target, key) || [];
        //arrays stores a bunch of middlewares
        middlewares.push(middleware);
        Reflect.defineMetadata(Metadatakeys_1.Metadatakeys.middleware, [...middlewares, middleware], target, key);
    };
}
exports.use = use;
