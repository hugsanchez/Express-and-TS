"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyValidator = void 0;
require("reflect-metadata");
const Metadatakeys_1 = require("./Metadatakeys");
function bodyValidator(...keys) {
    //spread operator converts it into an array
    return function (target, key, desc) {
        Reflect.defineMetadata(Metadatakeys_1.Metadatakeys.validator, keys, target, key);
    };
}
exports.bodyValidator = bodyValidator;
