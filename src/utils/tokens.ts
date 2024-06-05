import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

export const loginToken = (user: User) => {
    try{
        const SECRET_KEY = process.env.JWT_KEY || "default_secret_key"
        const token =  jwt.sign({id:user.id.toString(), user_name:user.user_name, user_email:user.email_usuario, rol:user.fk_rol_usuario}, 
        SECRET_KEY,
        {   
            algorithm: 'HS256',
            expiresIn: '1d'
        });
        return token    
    }catch(error){
        return error;
    }

}

export const checkToken = (token: String ) => {
    try{
    
    }catch(error){
        return error;
    }
}

