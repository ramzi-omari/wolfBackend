import { Router } from 'express';
import {
  editProfile,
  getProfile,
} from '../controllers/users';

const userRouter = Router();



// user profile

userRouter.get('/:id', getProfile);
userRouter.put('/:id',
  editProfile);

export default userRouter;
