import Appointment from '../models/Appointment';
import User from '../models/User';
import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';

class ScheduleController {
    async index (req,res){

        // check se ele é prestador de serviço ou nao
        const checkUserProvider = await User.findOne({
            where: {
                id:req.userId,
                provider:true
            }
        });
        // se ele nao for usuario prestador de serviço da esse erro abaixo
        if(!checkUserProvider){
            return res.status(401).json({ error: "Usuário não tem permissão de acessar isto!" });
        }
        
        const { date } = req.query;
        const parsedDate = parseISO(date);
        // pegar todos agendamentos do dia do usuario
        const appoitments = await Appointment.findAll({
            where:{ 
                provider_id: req.userId,
                canceled_at: null,
                date:{
                    [ Op.between ]:[ startOfDay(parsedDate),  endOfDay(parsedDate) ]
                },
            },
            order:['date']
        })

        return res.json(appoitments);
    }
}
export default new ScheduleController();