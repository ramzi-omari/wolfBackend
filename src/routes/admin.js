import { Router } from 'express';
import { addPublication } from '../controllers/admin';
import { PushNotificationBroadcast, PushNotificationByUser } from '../controllers/notification';

const adminRouter = Router();

//adminRouter.post('/publication',addPublication);
adminRouter.post('/notification',PushNotificationByUser);
adminRouter.post('/notification/broadcast',PushNotificationBroadcast);

export default adminRouter;