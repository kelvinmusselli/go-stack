import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';
import { promisify } from 'util';

export default async (req, res, next) => {

    const authHeader = req.headers.authorization;
    console.log(req.headers);
    
    if(!authHeader){
        return res.status(401).json({ error:"Não autorizado o acesso", });
    }

    const [, token ] = authHeader.split(' ');


    try {
        const decoded = await promisify(jwt.verify)(token, authConfig.secret);

        req.userId = decoded.id;

        return next();

    } catch (error) {
        return res.status(401).json({ error: "Token invalido!" });       
    }
 
}