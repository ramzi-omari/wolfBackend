import { Router } from 'express';
import { addPublication, CommentPublication, GetPublications, LikePublication } from '../controllers/journal';

const journalRouter = Router();

journalRouter.post('/add', addPublication);
journalRouter.get('/', GetPublications);
journalRouter.put('/like/:id', LikePublication);
journalRouter.put('/comment', CommentPublication);

export default journalRouter;
