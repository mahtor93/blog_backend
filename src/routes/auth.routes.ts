import { Router } from "express";
import { authReq } from "../utils/middleware/auth";
import { getAllUsersHandler } from "../controllers/auth.controller";
const authRouter = Router();

authRouter.get('/userlist', authReq, getAllUsersHandler);

export default authRouter;



