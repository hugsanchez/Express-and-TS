"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
function requireAuth(req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    res.status(403);
    //forbidden code
    res.send('Not permitted');
}
const router = (0, express_1.Router)();
exports.router = router;
router.get('/login', (req, res) => {
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
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    //comes from form above where inputes were given the "keys names"
    //email and password
    if (email && password && email === 'hi@hi.com' && password === 'password') {
        //mark this person as logged in
        req.session = { loggedIn: true };
        //redirect them to the root route
        res.redirect('/');
    }
    else {
        res.send('Invalid email or password');
    }
    // if(email){
    //   res.send(email.toUpperCase())
    // } else {
    //   res.send('Must provide email Error - 422!')
    // }
});
router.get('/', (req, res) => {
    if (req.session && req.session.loggedIn) {
        res.send(`
      <div>
        <div>You are LOGGED IN</div>
        <a href = "/logout"> Logout</a>
      </div>
    `);
    }
    else {
        res.send(`
      <div>
        <div>You are NOT LOGGED IN</div>
        <a href="/login">Login</a>
      </div>
    `);
    }
});
router.get('/logout', (req, res) => {
    req.session = undefined;
    res.redirect('/');
});
router.get('/protected', requireAuth, (req, res) => {
    res.send('Welcome to protected route! Logged in user');
});
