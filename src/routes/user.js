import { Router } from 'express';
import {
  editProfileUser,
  getMyProfile,
  getUsersByType,
} from '../controllers/users';

const userRouter = Router();



// user profile

userRouter.get('/', getMyProfile);
userRouter.put('/',editProfileUser);
userRouter.get('/type/:type',getUsersByType);

export default userRouter;
