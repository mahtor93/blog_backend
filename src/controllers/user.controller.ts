import { Router } from "express";
import { createUser, findUserByEmail } from "../models/user.model";
import { Request,Response } from "express";
import { genSaltSync, hashSync } from "bcrypt-ts";

export const createUserHandler = async (req:Request, res:Response) => {
    try{
        const errMsg = [];
        const user = req.body;
        if(user.passwd !==user.repeat_passwd){
            errMsg.push('Las contraseñas no coinciden');
            res.status(400).json({ error: 'Las contraseñas no coinciden' });
        }   

        const userExist = await findUserByEmail(user.email_usuario);
        if(userExist){
            errMsg.push('El email ya está en uso');
            res.status(400).json({error:'El email ya está en uso'});
        }

        const newUser = await createUser(user);
        res.status(201).json(newUser);

    }catch(error){
        res.status(500).json({error:'Internal server error: createUserHandler '+error})
    }
}
