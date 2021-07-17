import { Router } from 'express';
import {
  editProfileUser,
  getMyProfile,
} from '../controllers/users';

const userRouter = Router();



// user profile

userRouter.get('/', getMyProfile);
userRouter.put('/',editProfileUser);

export default userRouter;
