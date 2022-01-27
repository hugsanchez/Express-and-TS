import { Router, Request, Response, NextFunction } from "express";

interface RequestWithBody extends Request {
  //Req with body has all the properties of Request
  body: { [key:string]: string | undefined }
}

function requireAuth(req:Request, res:Response, next:NextFunction): void{
  if(req.session && req.session.loggedIn){
    next();
    return;
  }
  res.status(403);
  //forbidden code
  res.send('Not permitted')
}

const router = Router();

router.get('/login', (req:Request,res: Response) => {
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
});

router.post('/login', (req:RequestWithBody, res: Response) => {
  const {email,password} = req.body;
  //comes from form above where inputes were given the "keys names"
  //email and password

  if(email && password && email === 'hi@hi.com' && password === 'password'){
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
});

router.get('/', (req:Request, res:Response) => {
  if(req.session && req.session.loggedIn){
    res.send(`
      <div>
        <div>You are LOGGED IN</div>
        <a href = "/logout"> Logout</a>
      </div>
    `)
  } else {
    res.send(`
      <div>
        <div>You are NOT LOGGED IN</div>
        <a href="/login">Login</a>
      </div>
    `)
  }
});

router.get('/logout', (req:Request, res: Response) => {
  req.session = undefined;
  res.redirect('/')
})

router.get('/protected', requireAuth, (req:Request, res: Response) => {
  res.send('Welcome to protected route! Logged in user')
})

export {router};