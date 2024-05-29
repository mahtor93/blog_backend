"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRoleHandler = exports.deleteRoleHandler = exports.getAllRolesHandler = exports.getRolByNameHandler = exports.getRolByIdHandler = exports.createRolHandler = void 0;
const roles_model_1 = require("../models/roles.model");
const createRolHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const role = req.body;
        const newRole = yield (0, roles_model_1.createRole)(role);
        res.status(201).json(newRole);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error: createRolHandler ' + error });
    }
});
exports.createRolHandler = createRolHandler;
const getRolByIdHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const role = yield (0, roles_model_1.getRolById)(id);
        if (role) {
            res.json(role);
        }
        else {
            res.status(404).json({ error: 'Role not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error: getRolByIdHandler' + error });
    }
});
exports.getRolByIdHandler = getRolByIdHandler;
const getRolByNameHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nombre_rol = req.params.id;
        const role = yield (0, roles_model_1.getRolByName)(nombre_rol);
        if (role) {
            res.json(role);
        }
        else {
            res.status(404).json({ error: 'Role Not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error: getRolByNameHandler' + error });
    }
});
exports.getRolByNameHandler = getRolByNameHandler;
const getAllRolesHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roles = yield (0, roles_model_1.getAllRoles)();
        res.json(roles);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error: getAllRolesHandler' + error });
    }
});
exports.getAllRolesHandler = getAllRolesHandler;
const deleteRoleHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield (0, roles_model_1.deleteRole)(id);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error: deleteRoleHandler' + error });
    }
});
exports.deleteRoleHandler = deleteRoleHandler;
const updateRoleHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const role = req.body;
        const updatedRole = yield (0, roles_model_1.updateRole)(id, role);
        res.json(updatedRole);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error: updateRoleHandler' + error });
    }
});
exports.updateRoleHandler = updateRoleHandler;
