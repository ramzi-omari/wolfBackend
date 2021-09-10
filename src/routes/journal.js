import { Router } from 'express';
import { CommentPublication, EditCommentPublication } from '../controllers/comment';
import { addPublication, GetPublications, LikePublication } from '../controllers/journal';

const journalRouter = Router();

journalRouter.post('/add', addPublication);
journalRouter.get('/', GetPublications);
journalRouter.put('/like/:id', LikePublication);
journalRouter.put('/comment', CommentPublication);
journalRouter.put('/comment/edit', EditCommentPublication);

export default journalRouter;
