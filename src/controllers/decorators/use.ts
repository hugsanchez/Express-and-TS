import { RequestHandler } from 'express';
import 'reflect-metadata';
import { Metadatakeys } from './Metadatakeys';

export function use(middleware: RequestHandler) {
  return function(target:any, key:string, desc: PropertyDescriptor){
    const middlewares = Reflect.getMetadata(Metadatakeys.middleware, target, key) || [];
    //arrays stores a bunch of middlewares

    middlewares.push(middleware);

    Reflect.defineMetadata(Metadatakeys.middleware, [...middlewares, middleware], target, key);
  };
}