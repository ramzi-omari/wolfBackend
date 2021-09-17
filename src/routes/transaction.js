import { Router } from 'express';
import { GetMyTransactions, GetTransactionById, PostTransaction } from '../controllers/transaction';


const transactionRouter = Router();

transactionRouter.post('/', PostTransaction);
transactionRouter.get('/', GetMyTransactions);
transactionRouter.get('/details/:id', GetTransactionById);

export default transactionRouter;
