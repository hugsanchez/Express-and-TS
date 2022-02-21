import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';

import { AppRouter } from './AppRouter';
import './controllers/LoginController';
import './controllers/RootController'
//Necessary to execute (import and export) LoginController class

const app = express();

app.use(bodyParser.urlencoded({extended:true}))

app.use(cookieSession({keys: ['kobee']}))

app.use(AppRouter.getInstance());


app.listen(3000, () => {
  console.log('Listening on port 3000')
})



