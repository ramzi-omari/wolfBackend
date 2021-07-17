import { Router } from 'express';
import  authenticate  from '../middlewares/authenticate';
import onlyAdmin from '../middlewares/roles';
import adminRouter from './admin';
import userRouter from './user';
import authRouter from './authentication'
import journalRouter from './journal';

const router = Router();

router.use('/admin', authenticate, onlyAdmin, adminRouter);
router.use('/auth', authRouter);
router.use('/users', authenticate, userRouter);
router.use('/publication', authenticate, journalRouter);

export default router;