import { Router } from 'express';
import { getAdmin } from "../../controllers/admin"
import admin_userRouter from './users';


const adminRouter = Router();

adminRouter.get("/profile", getAdmin)
adminRouter.use("/users", admin_userRouter)



export default adminRouter;