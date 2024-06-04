import client from "../connect";
import { v4 as uuidv4 } from "uuid";

export interface Rol{
    id:string;
    nombre_rol:string;
}

export const createRole = async (rol: Omit<Rol, 'id'>): Promise<Rol | null> =>{
    const id = uuidv4();
    const { nombre_rol } = rol;
    const conn = await client.connect();
    try{
        const res = await conn.query(
            `Insert into rol_usuario (id,nombre_rol) values ($1,$2) returning *`,[id, nombre_rol]
        );
        return res.rows[0];
    }catch(error){
        console.error('error al crear Rol', error);
        return null;
    }finally{
        conn.release();
    }
}


export const getRolById = async (id:string): Promise<Rol | null> => {
    const conn = await client.connect();
    try{
        const res = await client.query('Select * from rol_usuario WHERE id = $1',[id]);
        return res.rows[0] || null;
    }catch(error){
        console.error('error al obtener Rol por ID', error);
        return null;
    }finally{
        conn.release();
    }
}

export const getAllRoles = async (): Promise<Rol[] | null> => {
    const conn = await client.connect();
    try{
        const res = await client.query(`Select * from rol_usuario`);
        return res.rows;
    }catch(error){
        console.error('error al obtener Roles', error);
        return null;
    }finally{
        conn.release();
    }
}

export const getRolByName = async (nombre_rol: string): Promise<Rol | null> =>{
    const conn = await client.connect();
    try{
        const res = await conn.query('SELECT id from rol_usuario where nombre_rol = $1',[nombre_rol]);
        return res.rows[0]?.id || null;
    }catch(error){
        console.error('error al obtener Rol por nombre', error);
        return null;
    }finally {
        conn.release();
    }
}

export const deleteRole = async (id: string): Promise<void> => {
    const conn = await client.connect();
    try{
        await conn.query(`delete from rol_usuario where id = ${id}`);
    }catch(error){
        console.error('error al eliminar Rol', error);
    }
    finally {
        conn.release();
    }
}

export const updateRole = async (id:string, role:Partial<Rol>): Promise<Rol | null> =>{
    const { nombre_rol } = role;
    const conn = await client.connect();
    try{
        const res = await conn.query(`update rol_usuario set nombre_rol = coalesce(${nombre_rol}, nombre_rol) where id = ${id} returning *`);
        return res.rows[0];
    }catch(error){
        console.error('error al editar Rol', error);
        return null;
    } finally{
        conn.release();
    }
}