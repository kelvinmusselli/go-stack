import User from '../models/User';
import jwt from 'jsonwebtoken';
import auth from '../../config/auth';
import * as Yup from 'yup';


class SessionController {
    async Create(req, res){

        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password:Yup.string().required()
        });

        if(!(await schema.isValid(req.body))){
            return res.status(401).json({ error:"Falha ao logar" });
        }

        const { email, password } = req.body;

        const user = await User.findOne({ where: { email }});

        if(!user){
            return res.status(401).json({error:"Usuário não existente"});
        }

        if(!(await user.checkPassword(password))){
            return res.status(401).json({ error: "Senha invalida" });
        }

        const { id, name } = user;

        return res.json({
            user:{
                id,
                name,
                email
            }, 
            token:jwt.sign({ id,  }, auth.secret, { 
                expiresIn: auth.expiresIn,
            }),
            message:"Autenticado com sucesso!"
        });
    }
}

export default new SessionController();