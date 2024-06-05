import { check, validationResult } from "express-validator";
import { createUser, findUserByEmail, findUserByName, findUserById } from "../models/user.model";
import { Request, Response } from "express";
import { Password } from "../utils/password";
import { getRolByName } from "../models/roles.model";
import { loginToken } from "../utils/tokens";

export const createUserHandler = async (req: Request, res: Response) => {
    try {
        await check('email_usuario').notEmpty().withMessage('El campo de email está vacío').run(req)
        await check('passwd').notEmpty().withMessage('El campo de contraseña está vacío').run(req)
        await check('user_name').notEmpty().withMessage('El campo de nombre está vacío').run(req)
        const checkEmptyFiels = validationResult(req);
        const errMsg = [];
        if (!checkEmptyFiels.isEmpty()) {
            return res.send({ errors: checkEmptyFiels.array() })
        } else {
            const user = req.body; //obtener el user desde el body.
            const emailExist = await findUserByEmail(user.email_usuario);
            const userExist = await findUserByName(user.user_name);
            if (user.passwd !== user.repeat_passwd) {
                errMsg.push('Las contraseñas no coinciden');
            }
            if (emailExist) {
                errMsg.push('El email ya está en uso');
            }
            if (userExist) {
                errMsg.push('El nombre ya está en uso');
            }
            if (errMsg.length != 0) {
               return res.status(400).json({ error: 'El email ya está en uso', listError: errMsg });
            }
            const rol = await getRolByName('lector');
            if (!rol) {
                return res.status(400).json({ error: 'Missing Role' });
            }
            const hash_passwd = await Password.hashPassword(user.passwd);
            const newUser = {
                user_name: user.user_name,
                email_usuario: user.email_usuario,
                hash_passwd,
                fk_rol_usuario:String(rol)
            };
            const createdUser = await createUser(newUser);
            return res.status(201).json(createdUser);
            
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error: createUserHandler ' + error })
    }
}

export const loginUserHandler = async(req:Request, res:Response) => {
    try{
        await check('email_usuario').notEmpty().withMessage('El campo de email está vacío').run(req)
        await check('passwd').notEmpty().withMessage('El campo de contraseña está vacío').run(req)
        const checkEmptyFiels = validationResult(req);
        const errMsg = []
        if(!checkEmptyFiels.isEmpty()){

            return res.send({errors: checkEmptyFiels.array()})
        }else{
            const login = req.body;
            const userExists = await findUserByEmail(login.email_usuario);
            const verifyPasswd = await Password.comparePassword(String(userExists?.hash_passwd),login.passwd);

            if(!userExists || !verifyPasswd){
                errMsg.push('Usuario o contraseña incorrectos');
            }
            if (errMsg.length != 0) {
                return res.status(400).json({ listError: errMsg });
            }
            const userId = userExists?.id;
            if (!userId) {
                return res.status(400).json({ message: 'User not found' });
            }

            const loginUser = await findUserById(userId);
            if (!loginUser) {
                return res.status(404).json({ message: 'User not found '+userId });
            }
    
            const token = loginToken(loginUser);
            return res.status(201).json({token, msg:'Login! ! ! '})

        }
    }catch(error){
        return res.status(500).json({ error: 'Internal server error: loginUserHandler ' + error })
    }
}

