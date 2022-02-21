import express from 'express';

export class AppRouter {
  private static instance: express.Router;

  static getInstance(): express.Router {
    if(!AppRouter.instance){
      AppRouter.instance = express.Router();
    }

    return AppRouter.instance;
  }
}

//Set up singleton inside TS one router inside our entire app (one copy of router)
//Otherwise we would have had to constantly go into LoginController to get access
//to router when it should be relatively universal for all the other routes