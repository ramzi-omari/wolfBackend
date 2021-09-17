import { Router } from 'express';
import { GetMyTransactions, PostTransaction } from '../controllers/transaction';


const transactionRouter = Router();

transactionRouter.post('/', PostTransaction);
transactionRouter.get('/', GetMyTransactions);

export default transactionRouter;
