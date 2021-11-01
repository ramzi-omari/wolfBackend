import { Router } from 'express';
import { getMyNotification } from '../controllers/notification';
import { searchUser } from '../controllers/search';
import {
  editProfileUser,
  getMyProfile,
  getUsersByType,
} from '../controllers/users';

const userRouter = Router();



// user profile

userRouter.get('/', getMyProfile);
userRouter.put('/',editProfileUser);
userRouter.get('/search',searchUser);
userRouter.get('/notification',getMyNotification);
userRouter.get('/type/:type',getUsersByType);

export default userRouter;
