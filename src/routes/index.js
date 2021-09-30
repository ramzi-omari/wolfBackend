import { Router } from 'express';
import authenticate from '../middlewares/authenticate';
import onlyAdmin from '../middlewares/roles';
import adminRouter from './admin';
import userRouter from './user';
import authRouter from './authentication'
import journalRouter from './journal';
import imageRouter from './upload_images';
import ConversationsRouter from './conversation';
import transactionRouter from './transaction';

const router = Router();

router.use('/admin', authenticate, onlyAdmin, adminRouter);
router.use('/auth', authRouter);
router.use('/users', authenticate, userRouter);
router.use('/publication', authenticate, journalRouter);
router.use('/upload', authenticate, imageRouter);
router.use('/conversation', authenticate, ConversationsRouter);
router.use('/transaction', authenticate, transactionRouter);

export default router;