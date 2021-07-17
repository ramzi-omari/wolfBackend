import { Router } from 'express';
import { addPublication } from '../controllers/journal';

const journalRouter = Router();

journalRouter.post('/add', addPublication)

export default journalRouter;
