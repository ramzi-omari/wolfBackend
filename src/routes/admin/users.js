import { Router } from 'express';
import { getAllUser, validateUser, getUserById } from '../../controllers/users';

const admin_userRouter = Router();

admin_userRouter.get('/', getAllUser)
admin_userRouter.get('/:id', getUserById)
admin_userRouter.put('/validate', validateUser)

export default admin_userRouter;