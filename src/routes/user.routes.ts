import { Router } from "express";
import { createUserHandler } from "../controllers/user.controllers";
const userRouter = Router();

userRouter.post('/',createUserHandler);

export default userRouter;