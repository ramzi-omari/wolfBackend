import { Router } from 'express';
import {
  editProfileUser,
  getProfile,
} from '../controllers/users';

const userRouter = Router();



// user profile

userRouter.get('/:id', getProfile);
userRouter.put('/',editProfileUser);

export default userRouter;
