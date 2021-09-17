import { Router } from 'express';
import { CancelTransaction, GetMyTransactions, GetTransactionById, PostTransaction } from '../controllers/transaction';


const transactionRouter = Router();

transactionRouter.post('/', PostTransaction);
transactionRouter.get('/', GetMyTransactions);
transactionRouter.get('/details/:id', GetTransactionById);
transactionRouter.put('/cancel/:id', CancelTransaction);

export default transactionRouter;
