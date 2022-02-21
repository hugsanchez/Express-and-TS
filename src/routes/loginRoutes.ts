import { Router, Request, Response, NextFunction } from "express";

interface RequestWithBody extends Request {
  //Req with body has all the properties of Request
  body: { [key:string]: string | undefined }
}




//QUICK EXAMPLE

// @controller('/auth')
// class LoginController{

//   @get('/login')
//   getLogin(req:Request, res: Response): void{
//     res.send('form');
//   }

//   @post('/login')
//   @validateBody('email', 'password')
//   @use(requireAuth)
//   //To check for parameters
//   postLogin(req:Request, res:Response): void {

//   }
// }

// function post(routeName: string){
//   return function(target:any, key: string, desc: PropertyDescriptor) {
//     router.post(routeName, target[key]);
//   }
// }

// function use(middleware:any){
//   return function(target:any, key:string, desc: PropertyDescriptor){
//     router.addMiddlewareToHandlerWeJustRegistered(middleware);
//     //reach backwards find whatever router handler we just associated with
//     //the router and inject middleware back into the thing
//   }
// }