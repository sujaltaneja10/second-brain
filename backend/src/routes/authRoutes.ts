import express, { Router } from 'express';
import {
  signinController,
  signupController,
} from '../controllers/authController';

const authRouter = Router();

authRouter.post('/signup', signupController);
authRouter.post('/signin', signinController);

export default authRouter;
