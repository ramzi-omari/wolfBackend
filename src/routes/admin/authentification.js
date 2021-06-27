import { Router } from 'express';
import { check } from 'express-validator';
import validate from '../../middlewares/validate';
import { adminSignIn, adminSignUp } from '../../controllers/admin';

const adminAuthRouter = Router()

adminAuthRouter.post(
    '/signIn',
    [
        check('email').not().isEmpty().withMessage('Email is required'),
        check('email').isEmail().withMessage('Invalid email address'),
        check('password').not().isEmpty(),
    ],
    validate,
    adminSignIn
)

adminAuthRouter.post(
    '/signUp',
    [
        check('email').not().isEmpty().withMessage('Email is required'),
        check('email').isEmail().withMessage('Invalid email address'),
        check('password').not().isEmpty(),
        check('firstName').not().isEmpty().withMessage('FirstName is required'),
    ],
    validate,
    adminSignUp,
);


export default adminAuthRouter;