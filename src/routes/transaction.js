import { Router } from 'express';
import { PostTransaction } from '../controllers/transaction';


const transactionRouter = Router();

transactionRouter.post('/',PostTransaction)

export default transactionRouter ;
