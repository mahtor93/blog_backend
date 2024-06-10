import { Router } from "express";
import { createUserHandler, loginUserHandler } from "../controllers/user.controller";

const userRouter = Router();

userRouter.post('/',createUserHandler);
userRouter.post('/login', loginUserHandler);

export default userRouter;