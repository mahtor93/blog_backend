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
    const { nombre_usuario, fk_rol_usuario,email_usuario,hash_passwd} = user;
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

export const findUserByEmail = async (email_usuario: string): Promise<User|null> => {
    const conn = await client.connect();
    try{
        const res = await conn.query(
            `select email_usuario from usuario where email_usuario = ${email_usuario}` );
            return res.rows[0] || null;
    }catch(error){
        console.error('Error al obtener el usuario', error);
        return null;
    }finally{
        conn.release();
    }
}

export const findUserByName = async (user_name:string): Promise<User|null> => {
    const conn = await client.connect();
    try{
        const res = await conn.query(`select user_name from usuario where user_name = ${user_name}`);
        return res.rows[0] || null;
    }catch(error){
        console.error('Error al obtener el usuario', error);
        return null;
    }finally{
        conn.release();
    }
}

/*
export const findUserById = async (id:string):Promise<User|null> =>{
    const conn = await client.connect();
    try{
        
    }catch(error){
    
    }
}

*/