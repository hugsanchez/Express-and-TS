import 'reflect-metadata';
import { Metadatakeys } from './Metadatakeys';

export function bodyValidator(...keys: string[]) {
  //spread operator converts it into an array
  return function(target:any, key:string, desc: PropertyDescriptor){
    Reflect.defineMetadata(Metadatakeys.validator, keys, target, key);
  };
}

