var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import client from "../connect";
import { v4 as uuidv4 } from "uuid";
export const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const id = uuidv4();
    const { nombre_usuario, fk_rol_usuario, email_usuario, hash_passwd } = user;
    const conn = yield client.connect();
    try {
        const res = yield conn.query('Insert into usuario (id, fk_rol_usuario, nombre_usuario,email_usuario,hash_passwd) values ($1,$2,$3,$4,$5) returning *', [id, fk_rol_usuario, nombre_usuario, email_usuario, hash_passwd]);
        return res.rows[0];
    }
    finally {
        conn.release();
    }
});
export const findUserByEmail = (email_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield client.connect();
    try {
        const res = yield conn.query(`select email_usuario from usuario where email_usuario = ${email_usuario}`);
        return res.rows[0] || null;
    }
    catch (error) {
        console.error('Error al obtener el usuario', error);
        return null;
    }
    finally {
        conn.release();
    }
});
export const findUserByName = (user_name) => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield client.connect();
    try {
        const res = yield conn.query(`select user_name from usuario where user_name = ${user_name}`);
        return res.rows[0] || null;
    }
    catch (error) {
        console.error('Error al obtener el usuario', error);
        return null;
    }
    finally {
        conn.release();
    }
});
/*
export const findUserById = async (id:string):Promise<User|null> =>{
    const conn = await client.connect();
    try{
        
    }catch(error){
    
    }
}

*/ 
