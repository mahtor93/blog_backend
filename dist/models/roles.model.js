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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRole = exports.deleteRole = exports.getRolByName = exports.getAllRoles = exports.getRolById = exports.createRole = void 0;
const connect_1 = __importDefault(require("../connect"));
const uuid_1 = require("uuid");
const createRole = (rol) => __awaiter(void 0, void 0, void 0, function* () {
    const id = (0, uuid_1.v4)();
    const { nombre_rol } = rol;
    const conn = yield connect_1.default.connect();
    try {
        const res = yield conn.query(`Insert into rol_usuario (id,nombre_rol) values ($1,$2) returning *`, [id, nombre_rol]);
        return res.rows[0];
    }
    catch (error) {
        console.error('error al crear Rol', error);
        return null;
    }
    finally {
        conn.release();
    }
});
exports.createRole = createRole;
const getRolById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield connect_1.default.connect();
    try {
        const res = yield connect_1.default.query('Select * from rol_usuario WHERE id = $1', [id]);
        return res.rows[0] || null;
    }
    catch (error) {
        console.error('error al obtener Rol por ID', error);
        return null;
    }
    finally {
        conn.release();
    }
});
exports.getRolById = getRolById;
const getAllRoles = () => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield connect_1.default.connect();
    try {
        const res = yield connect_1.default.query(`Select * from rol_usuario`);
        return res.rows;
    }
    catch (error) {
        console.error('error al obtener Roles', error);
        return null;
    }
    finally {
        conn.release();
    }
});
exports.getAllRoles = getAllRoles;
const getRolByName = (nombre_rol) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const conn = yield connect_1.default.connect();
    try {
        const res = yield conn.query('SELECT id from rol_usuario where nombre_rol = $1', [nombre_rol]);
        return ((_a = res.rows[0]) === null || _a === void 0 ? void 0 : _a.id) || null;
    }
    catch (error) {
        console.error('error al obtener Rol por nombre', error);
        return null;
    }
    finally {
        conn.release();
    }
});
exports.getRolByName = getRolByName;
const deleteRole = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield connect_1.default.connect();
    try {
        yield conn.query(`delete from rol_usuario where id = ${id}`);
    }
    catch (error) {
        console.error('error al eliminar Rol', error);
    }
    finally {
        conn.release();
    }
});
exports.deleteRole = deleteRole;
const updateRole = (id, role) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre_rol } = role;
    const conn = yield connect_1.default.connect();
    try {
        const res = yield conn.query(`update rol_usuario set nombre_rol = coalesce(${nombre_rol}, nombre_rol) where id = ${id} returning *`);
        return res.rows[0];
    }
    catch (error) {
        console.error('error al editar Rol', error);
        return null;
    }
    finally {
        conn.release();
    }
});
exports.updateRole = updateRole;
