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
import passwordRouter from './password';
import walletRouter from './wallet';

const router = Router();

router.use('/admin', authenticate, onlyAdmin, adminRouter);
router.use('/auth', authRouter);
router.use('/users', authenticate, userRouter);
router.use('/publication', authenticate, journalRouter);
router.use('/upload', authenticate, imageRouter);
router.use('/conversation', authenticate, ConversationsRouter);
router.use('/transaction', authenticate, transactionRouter);
router.use('/password', authenticate, passwordRouter);
router.use('/wallet', authenticate, walletRouter);

export default router;