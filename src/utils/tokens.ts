import jwt, {Secret,JwtPayload} from "jsonwebtoken";
import { User } from "../models/user.model";

export const loginToken = (user: User) => {
    try{
        const token =  jwt.sign({id:user.id.toString(), user_name:user.user_name, user_email:user.email_usuario, rol:user.fk_rol_usuario}, 
        String(process.env.JWT_KEY),
        { expiresIn: '1 day'}
        );
        return token    
    }catch(error){
        return error;
    }

}