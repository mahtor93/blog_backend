import { Router } from "express";
import { createRolHandler, deleteRoleHandler, getAllRolesHandler, getRolByIdHandler, getRolByNameHandler, updateRoleHandler } from "../controllers/roles.controller";
const rolRouter = Router();

rolRouter.get('/',getAllRolesHandler);
rolRouter.get('/:id', getRolByIdHandler);
rolRouter.get('/name/:name', getRolByNameHandler);

rolRouter.post('/', createRolHandler);

rolRouter.delete('/delete/:id', deleteRoleHandler);

rolRouter.patch('/update/:id', updateRoleHandler);

export default rolRouter;