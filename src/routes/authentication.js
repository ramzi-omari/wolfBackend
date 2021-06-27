import { Router } from 'express';
import { check } from 'express-validator';
import validate from '../middlewares/validate';
import { signUp, signIn } from '../controllers/authentication';

import adminAuthRouter from './admin/authentification';


const authRouter = Router();
authRouter.use('/admin', adminAuthRouter)

authRouter.post(
  '/signUp',
  [
    check('email').not().isEmpty().withMessage('Email is required'),
    check('email').isEmail().withMessage('Invalid email address'),
    check('password').not().isEmpty(),
    check('firstName').not().isEmpty().withMessage('FirstName is required'),
  ],
  validate,
  signUp,
);

authRouter.post(
  '/signIn',
  [
    check('email').not().isEmpty().withMessage('Email is required'),
    check('email').isEmail().withMessage('Invalid email address'),
    check('password').not().isEmpty(),
  ],
  validate,
  signIn
);


export default authRouter;
