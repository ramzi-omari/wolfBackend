import { Router } from "express";
import {
    AccepteConversation,
    CreateConversation,
    GetConversation,
    getConversationById,
    SetUnseen,
} from "../controllers/conversation";

const ConversationsRouter = Router();

ConversationsRouter.get('/', GetConversation);
ConversationsRouter.post('/', CreateConversation);
ConversationsRouter.put('/unseen/:id', SetUnseen);
ConversationsRouter.put('/accepted/:id', AccepteConversation);
ConversationsRouter.get('/:id', getConversationById);

export default ConversationsRouter;
