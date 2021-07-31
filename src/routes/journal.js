import { Router } from 'express';
import { addPublication, GetPublications, LikePublication } from '../controllers/journal';

const journalRouter = Router();

journalRouter.post('/add', addPublication);
journalRouter.get('/', GetPublications);
journalRouter.put('/like/:id', LikePublication);

export default journalRouter;
