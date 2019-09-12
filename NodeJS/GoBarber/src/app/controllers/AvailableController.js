import { startOfDay, endOfDay} from 'date-fns';
import { Op } from 'sequelize';
import Appointment from '../models/Appointment';

class AvailableController {

    async index(req, res){
        const { date } = req.query;

        if(!date){
            return res.status(400).json({error: "Invalid Date"});
        }

        console.log(req.params);
        
        const searchDate = Number(date);

        const appointments = await Appointment.findAll({
            where: { 
                provider_id : req.params.providerid },
                canceled_at : null,
                date        : {
                    [Op.between]:[startOfDay(searchDate), endOfDay(searchDate)]
                }
        });

        const schedule = [
            '08:00',
            '09:00',
            '10:00',
            '11:00',
            '12:00',
            '13:00',
            '14:00',
            '15:00',
            '16:00',
            '17:00',
            '18:00',
        ];

        const available = schedule.map(time =>{

        });

        return res.json(appointments);
    };

}

export default new AvailableController();