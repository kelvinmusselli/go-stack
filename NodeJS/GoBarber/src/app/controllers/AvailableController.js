import { startOfDay, endOfDay} from 'date-fns';
import Appointment from '../models/Appointment';
import { Op } from 'sequelize';

class AvailableController {

    async index(req, res){
        const { date } = req.query;

        if(!date){
            return res.status(400).json({error: "Invalid Date"});
        }

        const searchDate = Number(date);

        const appointments = await Appointment.findAll({
            where: { provider_id  : req.params.providerId },
            canceled_at : null,
            date: {
                [Op.between]:[startOfDay(searchDate), endOfDay(searchDate)]
            }
        });

        return res.json(appointments);
    };

}

export default new AvailableController();