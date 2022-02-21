import { NextFunction, Request, Response } from "express";
import {get, controller, use, bodyValidator, post} from './decorators'
import { withArgs } from "./decorators/randomFunc";
import { noArgs } from "./decorators/randomFunc";

//Example of middleware
// function logger(req:Request, res: Response, next: NextFunction){
//   console.log('req was made')  
//   next();
// }

@controller('/auth')
class LoginController {

  @get('/')
  // add(a:number, b:number):number {
  //   //No error here this function sent as a request handler
  //   //server would hang and not give response
  //   return a + b;
  // }

  @get('/login')
  getLogin(req:Request,res: Response): void {
    res.send(`
      <form method='POST'>
        <div>
          <label>Email</label>
          <input name="email" />
        </div>
        <div>
          <label>Password</label>
          <input name="password" type="password"/>
        </div>
        <button>Submit</button>
      </form>
    `);
  }

  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req:Request, res: Response) {
    //Change to Request to test our decorator but for better assurance good to use RequestWithBody
    const {email,password} = req.body;
    //comes from form above where inputes were given the "keys names"
    //email and password
  
    if(email === 'hi@hi.com' && password === 'password'){
      //mark this person as logged in
      req.session = {loggedIn: true};
      //redirect them to the root route
      res.redirect('/');
    } else {
      res.send('Invalid email or password')
    }
  
    // if(email){
    //   res.send(email.toUpperCase())
    // } else {
    //   res.send('Must provide email Error - 422!')
    // }
  }

  @get('/logout')
  getLogout(req:Request, res: Response){
    req.session = undefined;
    res.redirect('/')
  }
}

