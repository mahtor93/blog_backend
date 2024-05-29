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
exports.createUser = void 0;
const connect_1 = __importDefault(require("../connect"));
const uuid_1 = require("uuid");
const roles_model_1 = require("./roles.model");
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const id = (0, uuid_1.v4)();
    const fk_rol_usuario = (0, roles_model_1.getRolByName)('admin');
    const { nombre_usuario, email_usuario, hash_passwd } = user;
    const conn = yield connect_1.default.connect();
    try {
        const res = yield conn.query('Insert into usuario (id, fk_rol_usuario, nombre_usuario,email_usuario,hash_passwd) values ($1,$2,$3,$4,$5) returning *', [id, fk_rol_usuario, nombre_usuario, email_usuario, hash_passwd]);
        return res.rows[0];
    }
    finally {
        conn.release();
    }
});
exports.createUser = createUser;
