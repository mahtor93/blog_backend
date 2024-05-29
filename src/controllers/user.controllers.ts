import { Router } from "express";
import { createUser } from "../models/user.model";
import { Request,Response } from "express";

export const createUserHandler = async (req:Request, res:Response) => {
    try{
        const user = req.body;
        const newUser = await createUser(user);
        res.status(201).json(newUser);
    }catch(error){
        res.status(500).json({error:'Internal server error: createUserHandler '+error})
    }
}
