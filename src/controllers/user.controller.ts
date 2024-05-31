import { Router } from "express";
import { check, validationResult } from "express-validator";
import { createUser, findUserByEmail, findUserByName } from "../models/user.model";
import { Request,Response } from "express";
import { genSaltSync, hashSync } from "bcrypt-ts";

export const createUserHandler = async (req:Request, res:Response) => {
    try{
        await check('email_usuario').notEmpty().withMessage('El campo de email está vacío').run(req)
        await check('passwd').notEmpty().withMessage('El campo de contraseña está vacío').run(req)
        await check('user_name').notEmpty().withMessage('El campo de nombre está vacío').run(req)
        const checkEmptyFiels = validationResult(req);
        const errMsg = [];
        if(checkEmptyFiels.isEmpty()) {
            res.send({errors: checkEmptyFiels.array() })
        }else {
            const user = req.body; //obtener el user desde el body.
            const emailExist = await findUserByEmail(user.email_usuario);
            const userExist = await findUserByName(user.user_name);
            if(user.passwd !==user.repeat_passwd){
                errMsg.push('Las contraseñas no coinciden');
            }   
            if(emailExist){
                errMsg.push('El email ya está en uso');
            }
            if(userExist){
                errMsg.push('El email ya está en uso');
            }
            if(errMsg.length!=0){
                res.status(400).json({error:'El email ya está en uso',listError:errMsg});
            }
            
            const newUser = await createUser(user);
            res.status(201).json(newUser);
        }

        

    }catch(error){
        res.status(500).json({error:'Internal server error: createUserHandler '+error})
    }
}
