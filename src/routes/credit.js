import { Router } from 'express';
import { CancelCredit, GetMyCredits, GetCreditById, PostCredit } from '../controllers/credit';


const creditRouter = Router();

creditRouter.post('/', PostCredit);
creditRouter.get('/', GetMyCredits);
creditRouter.get('/details/:id', GetCreditById);
creditRouter.put('/cancel/:id', CancelCredit);

export default creditRouter;
