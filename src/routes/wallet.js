import { Router } from 'express';
import { GetMyWallet } from '../controllers/wallet';

const walletRouter = Router();

walletRouter.get('/', GetMyWallet);

export default walletRouter;
