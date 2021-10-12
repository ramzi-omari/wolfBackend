import { Router } from 'express';
import { checkPassword } from '../controllers/password';


const passwordRouter = Router();

passwordRouter.route('/check').post(checkPassword);

export default passwordRouter;
