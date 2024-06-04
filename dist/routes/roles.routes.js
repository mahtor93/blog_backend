"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const roles_controller_1 = require("../controllers/roles.controller");
const rolRouter = (0, express_1.Router)();
rolRouter.get('/', roles_controller_1.getAllRolesHandler);
rolRouter.get('/:id', roles_controller_1.getRolByIdHandler);
rolRouter.get('/name/:name', roles_controller_1.getRolByNameHandler);
rolRouter.post('/', roles_controller_1.createRolHandler);
rolRouter.delete('/delete/:id', roles_controller_1.deleteRoleHandler);
rolRouter.patch('/update/:id', roles_controller_1.updateRoleHandler);
exports.default = rolRouter;