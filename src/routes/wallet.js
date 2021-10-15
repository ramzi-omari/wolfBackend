import { Router } from 'express';
import { GetMyWallet } from '../controllers/WALLET.JS';

const walletRouter = Router();

walletRouter.get('/', GetMyWallet);

export default walletRouter;
