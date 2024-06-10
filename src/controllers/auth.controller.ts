import { Request, Response } from "express";
import { findAllUsers } from "../models/user.model"

export const getUserRoleHandler = async (req:Request, res:Response) => {
    try{
    
    }catch(error){
    
    }
}

export const getAllUsersHandler = async (req:Request, res:Response) => {
    try{
        const userList = await findAllUsers();
        return res.status(201).json({userList:userList});
    }catch(error){
        return res.status(500).json({ error: 'Internal server error: getAllUsersHandler ' + error })
    }
}