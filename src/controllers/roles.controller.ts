import { Request, Response } from "express";
import { getRolByName, getRolById, getAllRoles, createRole, deleteRole, updateRole } from "../models/roles.model";


export const createRolHandler = async (req:Request, res:Response) => {
    try{
        const role = req.body;
        const newRole = await createRole(role);
        res.status(201).json(newRole);
    }catch(error){
        res.status(500).json({error:'Internal server error: createRolHandler '+error})
    }
};

export const getRolByIdHandler = async (req:Request,res:Response) => {
    try{
        const id = req.params.id;
        const role = await getRolById(id);
        if(role){
            res.json(role);
        } else {
            res.status(404).json({ error: 'Role not found'});
        }
    }catch(error){
        res.status(500).json({ error: 'Internal server error: getRolByIdHandler'+error})
    }
}

export const getRolByNameHandler = async (req:Request, res:Response) => {
    try{
        const nombre_rol = req.params.id;
        const role = await getRolByName(nombre_rol);
        if(role){
            res.json(role);
        } else {
            res.status(404).json({ error: 'Role Not found'})
        }
    }catch(error){
        res.status(500).json({ error:'Internal server error: getRolByNameHandler'+error})
    }
}

export const getAllRolesHandler = async (req:Request, res:Response) => {
    try{
        const roles = await getAllRoles();
        res.json(roles);
    }catch(error){
        res.status(500).json({ error:'Internal server error: getAllRolesHandler'+error})
    }
}

export const deleteRoleHandler = async (req:Request, res:Response) => {
    try{
        const id = req.params.id;
        await deleteRole(id);
        res.status(204).send();
    }catch(error){
        res.status(500).json({ error:'Internal server error: deleteRoleHandler'+error})
    }
}

export const updateRoleHandler = async (req:Request, res:Response) => {
    try{
        const id = req.params.id;
        const role = req.body;
        const updatedRole = await updateRole(id,role);
        res.json(updatedRole);
    }catch(error){
        res.status(500).json({ error:'Internal server error: updateRoleHandler'+error})
    }
}