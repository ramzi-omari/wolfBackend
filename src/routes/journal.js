import { Router } from 'express';
import { addPublication, GetPublications } from '../controllers/journal';

const journalRouter = Router();

journalRouter.post('/add', addPublication);
journalRouter.get('/', GetPublications);

export default journalRouter;
