// Este controller é responsavel
//  para criar uma sessao de usuario 
// com base na requisicao que ele envia
// e caso ele esteja na base ele ira receber
//  um token e apos receber um token ele vai 
// verificar o email e sneha para acessar o sistema
import UserModel from '../models/UserModel';
import jwt from 'jsonwebtoken';
import auth from '../../config/auth';
import * as Yup from 'yup';


class SessionController {
    async CreateSession(req, res) {

        // verificando se os itens obrigatorios de sessao forma enviados
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password:Yup.string().required()
        });

        if(!(await schema.isValid(req.body))){
            return res.status(401).json({ error:"Falha ao logar" });
        }
        // caso todos dados estejam sido mandados corretamente
        //  para criar uma sessao ele continua a partir de
        //  agora abaixo

        // DADOS DO POST
        const { email, body } = req.body;

        // PROCURANDO NA BASE SE EXISTE
        const userSessioned = await UserModel.findOne({ where : { email }});
    
        // NESTE CASO NAO EXISTE ENTÃO ELE FECHA SESSAO E RETORNO ERRO E NAO GERA TOKEN
        if(!userSessioned){
            return res.json(401).json( { error : "Usuário não existente " });
        }


        // VERIFICANDO A SENHA DO USUARIO QUE MANDO NO POST DE ABRIR UMA SESSAO
        if(!(await UserModel.checkPassword(password))){
            return res.status(401).json({ error: "Senha invalida" });
        }

        // SE CHEGOU ATE AQUI DEU TUDO CERTO AGORA
        const { id, name } = userSessioned;

        return res.json({
            userSessioned:{
                id,
                name,
                email
            }, 
            token:jwt.sign({ id,  }, auth.secret, { 
                expiresIn: auth.expiresIn,
            }),
            message:"Autenticado com sucesso!"
        });

    };
}

export default new SessionController();