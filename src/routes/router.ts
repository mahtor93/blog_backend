import rolRouter from "./roles.routes";
import userRouter from "./user.routes";
import { Router } from "express";

const router = Router();

const versionApi = '/api/v1'

router.use(`${versionApi}/roles`, rolRouter);
router.use(`${versionApi}/user`, userRouter);

export default router;