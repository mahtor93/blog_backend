import client from "../connect";
import { v4 as uuidv4 } from "uuid";

export interface User{
    id: string;
    fk_rol_usuario: string;
    user_name:string;
    email_usuario:string;
    hash_passwd:string;
}

export interface Login{
    email_usuario:string;
    hash_passwd:string;
}

export const createUser = async (user: Omit<User,'id'>): Promise<User> =>{
    const id = uuidv4();
    const { user_name, fk_rol_usuario,email_usuario,hash_passwd} = user;
    const conn = await client.connect();
    try{
        const res = await conn.query(
            'Insert into usuario (id, fk_rol_usuario, nombre_usuario,email_usuario,hash_passwd) values ($1,$2,$3,$4,$5) returning *',
            [id, fk_rol_usuario, user_name,email_usuario,hash_passwd]
        );
        return res.rows[0];
    } finally {
        conn.release();
    }
}

export const findUserByEmail = async (email_usuario: string): Promise<User|null> => {
    const conn = await client.connect();
    try{
        const res = await conn.query(
            'select id, email_usuario, hash_passwd from usuario where email_usuario = $1',[email_usuario]);
            return res.rows[0] || null;
    }catch(error){
        console.error('Error al obtener el email de usuario', error);
        return null;
    }finally{
        conn.release();
    }
}

export const findUserByName = async (user_name:string): Promise<User|null> => {
    const conn = await client.connect();
    try{
        const res = await conn.query('select user_name from usuario where user_name = $1',[user_name]);
        return res.rows[0] || null;
    }catch(error){
        console.error('Error al obtener el usuario', error);
        return null;
    }finally{
        conn.release();
    }
}

export const findUserById = async (id: string): Promise<User | null> => {
    const conn = await client.connect();
    try {
        const res = await conn.query('SELECT id, nombre_usuario, email_usuario, fk_rol_usuario FROM usuario WHERE id = $1', [id]);
        return res.rows[0] || null;
    } catch (error) {
        console.error("Error al obtener el usuario", error);
        return null;
    } finally {
        conn.release();
    }
};

export const findAllUsers = async(): Promise<User[] | null> => {
    const conn = await client.connect();
    try{
        const res = await conn.query('select u.id, u.nombre_usuario, u.email_usuario, r.nombre_rol from usuario u join rol_usuario r on u.fk_rol_usuario = r.id ;');
        return res.rows || null;
    }catch(error){
        console.error("Error al obtener lista de usuarios");
        return null;
    }
}