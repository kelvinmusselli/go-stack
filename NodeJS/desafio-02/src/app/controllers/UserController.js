import User from '../models/User';
import * as Yup from 'yup';

class UserController {

    // Create user meetup
    async Create(req,res){

        // verificar obrigatoriedades do com base no model
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6)
        })
        // verificar obrigatoriedades do com base no model
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error:"Validação falhou!" });
        }

        // verifica se email existe na base com base no post enviado
        const userExists = await User.findOne({ where: { email : req.body.email }});
        if(userExists){
            return res.status(400).json({ error: 'Usuário já existe amigo(a) '});
        }
        
        // se o email nao esta na base ele entra aqui agora
        const { id, name, email, provider } = await User.create(req.body);

        return res.json(
                            { id, name, email , provider }
                            // { message:`${name} Você foi cadastrado com sucesso!` }
                        );
    }

    async Update(req, res){

        // verificador dos campos
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            oldPassword: Yup.string().min(6),
            password: Yup.string().min(6).when('oldPassword', 
                (oldPassword, field ) => 
                oldPassword ? field.required() : field
            ),
            confirmPassword: Yup.string().when('password', 
                (password, field) =>
                password ? field.required().oneOf([Yup.ref('password')]) :  field
            ), 
        });

        // verificador dos campos 
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error:"Validação falhou!" });
        }
        // verificar se email e senha 
        // se o email for igual a um existe retorno um error
        // se a senha nao estiver igual da base ele retorno erro tbm
        const { email, oldPassword } = req.body;
        const userUpdate = await User.findByPk(req.body.userId);

        // verificando email se está diferente do que recebe se estiver ele entra aqui e ai ele executa o find na base para ver se tem um email igual se tiver igual ele da erro pq a unique key é o email
        if(email !== userUpdate.email){
            // buscar o email que foi recebido no req.body e compara com o que tem nas base  buscando por ele
            const userExists = await User.findOne({ where: { email} });
            if(userExists){
                return res.status(400).json({error:'Este e-mail é de outro usuário.'});
            }
        }
        // verificando senha antiga 
        if(oldPassword && !(await userUpdate.checkPassword(oldPassword))){
            return res.status(401).json({ error: "Senha não corresponde com a antiga"});
        }   

        // se tudo estiver occorrido certo ele vem aqui e atualiza
        const { id, name, provider } = await userUpdate.update(req.body);

        return res.json({ id, name, email, provider });

    };

}

export default new UserController();