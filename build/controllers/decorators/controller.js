"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
require("reflect-metadata");
const AppRouter_1 = require("../../AppRouter");
const Metadatakeys_1 = require("./Metadatakeys");
function bodyValidators(keys) {
    return function (req, res, next) {
        if (!req.body) {
            res.status(422).send('Invalid Request');
            return;
        }
        for (let key of keys) {
            if (!(key in req.body)) {
                //Doing this format in case there are falsey values that would return false
                //automatically like 0 and empty string
                res.status(422).send(`Missing property ${key}`);
                return;
            }
        }
        next();
    };
}
function controller(routePrefix) {
    return function (target) {
        const router = AppRouter_1.AppRouter.getInstance();
        for (let key of Object.getOwnPropertyNames(target.prototype)) {
            //This is different then lecture because of latest update
            // With ES2015, we can still iterate over methods on a prototype using 
            // Object.getOwnPropertyNames .  This returns an array of method names 
            // on a prototype.  So in the controller.ts file, we'd update the for loop to 
            // be: for (let key of Object.getOwnPropertyNames(target.prototype)) { .  
            // Note that the loop changes to a 'for...of' because we are now iterating over an array, 
            // rather than an object.
            const routeHandler = target.prototype[key];
            const path = Reflect.getMetadata(Metadatakeys_1.Metadatakeys.path, target.prototype, key);
            //Normally getMetdata returns the any type
            const method = Reflect.getMetadata(Metadatakeys_1.Metadatakeys.method, target.prototype, key);
            //But we used enum to state that it can only be the variables we stated and not just Anything
            const middlewares = Reflect.getMetadata(Metadatakeys_1.Metadatakeys.middleware, target.prototype, key) || [];
            const requiredBodyProps = Reflect.getMetadata(Metadatakeys_1.Metadatakeys.validator, target.prototype, key) || [];
            //gives me ['email', 'password'] from bodyValidator decorator
            const validator = bodyValidators(requiredBodyProps);
            if (path) {
                router[method](`${routePrefix}${path}`, ...middlewares, validator, routeHandler);
                //I have no idea what method its gonna be hopefully its the function we want
                //TS annoyed that she doesn't know whats happening to our code
            }
        }
    };
}
exports.controller = controller;
//ENUM used to emliminate hardcoded strings which is great agaisnt errors
