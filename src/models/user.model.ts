import client from "../connect";
import { v4 as uuidv4 } from "uuid";
import { getRolByName } from "./roles.model";

export interface User{
    id: string;
    fk_rol_usuario: string;
    nombre_usuario:string;
    email_usuario:string;
    hash_passwd:string;
}

export const createUser = async (user: Omit<User,'id'>): Promise<User> =>{
    const id = uuidv4();
    const fk_rol_usuario = getRolByName('admin');
    const { nombre_usuario, email_usuario,hash_passwd} = user;
    const conn = await client.connect();
    try{
        const res = await conn.query(
            'Insert into usuario (id, fk_rol_usuario, nombre_usuario,email_usuario,hash_passwd) values ($1,$2,$3,$4,$5) returning *',
            [id, fk_rol_usuario, nombre_usuario,email_usuario,hash_passwd]
        );
        return res.rows[0];
    } finally {
        conn.release();
    }
}
