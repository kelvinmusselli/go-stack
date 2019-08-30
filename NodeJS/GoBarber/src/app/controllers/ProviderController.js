
import User from '../models/User';
import File from '../models/File';
class ProviderController {
    async index(req, res){
        const providers = await User.findAll({
            where:{ provider: true },
            attributes:['id','name','email', 'avatar_id'],
            //  attributes define que eu quero retornar apenas os dados que eu definir
            include:[{
                model:File,
                as:'avatar',
                attributes:['name','path', 'url']
            }]
        });

        return res.json(providers);
    }
};

export default new ProviderController();