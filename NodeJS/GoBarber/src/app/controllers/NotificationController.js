import Notification from '../schemas/Notification';
import User from '../models/User';

class NotificationController {

    async index(req, res){

        // verificando se ele é um provedor de serviços ou user comum
        const isProvider = await User.findOne({ 
            where: { id: req.userId, provider:true }
        });

        if(!isProvider){
            return res.status(401).json({ error: 'Acesso não autorizado '}); 
        }

        // get de todas notifications do provider
        const notifications = await Notification.find({
            user: req.userId
        })
        .sort({createdAt:-1})
        .limit(20);


        return res.json(notifications);
    };


    async update(req,res) { 
        const notification = await Notification.findByIdAndUpdate(
            req.params.id,
            { read : true },
            { new : true }
        );

        return res.json(notification);

    };

};

export default new NotificationController();