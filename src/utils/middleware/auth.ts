import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";


export interface CustomRequest extends Request {
    token: string | JwtPayload;
}

export const authReq = async (req:Request, res:Response, next: NextFunction) => {
    const SECRET_KEY = process.env.JWT_KEY || "default_secret_key"
    try{
        const token = req.header('Authorization')?.replace('Bearer ','');
        if(!token){
            throw new Error();
        }
        const decoded = jwt.verify(token,SECRET_KEY);
        (req as CustomRequest).token = decoded;
        next();
    }catch(error){
        res.status(401).send('Authetication failed');
    }
}