import Appointment from '../models/Appointment';
import User from '../models/User';
import File from '../models/File';
import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt';
import * as Yup from 'yup';
import Notification from '../schemas/Notification';
import Mail from '../lib/Mail';

class AppointmentController {

    async index(req, res){

        const { page = 1 } = req.query;

        const appointments = await Appointment.findAll({
            where : {
                user_id: req.userId,
                canceled_at: null,
            },
            order:['date'],
            limit:20,
            offset: ( page  -1 ) * 20,
            attributes:['id','date'],
            include:[{
                model:User,
                as:'provider',
                attributes:['id','name'],
                include:[{
                    model:File,
                    as: 'avatar',
                    attributes:['id','path','url']
                }]
            }],
        });

        return res.json(appointments);
    };


    async store(req, res){

        const schema = Yup.object().shape({
            provider_id: Yup.number().required(),
            date: Yup.date().required()
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Parametro invalidos!'});
        }

        const { provider_id, date } = req.body;

        // verificando se ele é um provedor de serviços ou user comum
        const isProvider = await User.findOne({ 
            where: { id: provider_id, provider:true }
        });

        if(!isProvider){
            return res.status(401).json({ error: 'Provider não encontrado '}); 
        }

        
        const hourStart = startOfHour(parseISO(date));
        // verificando se a hora que está sendo marcada está no dia de hoje ou se passou do horario atual
        if(isBefore(hourStart, new Date())){
            return res.status(400).json({ error: 'Data já passou do dia atual'})
        }

        // verificando horario disponivel
        const checkAvaibility = await Appointment.findOne({
            where : {
                provider_id,
                canceled_at: null,
                date: hourStart
            }
        });
        if(checkAvaibility){
            return res.status(400).json({ error: 'Horário já marcado neste horario e dia'})
        }

        const appointment = await Appointment.create({
            user_id: req.userId,
            provider_id,
            date
        });

        // notification to provider
        const user = await User.findByPk(req.userId);
        const formattedDate = format(
            hourStart,  
            "'Dia' dd 'de' MMMM', às' H:mm'h'", { locale : pt } 
        );
        await Notification.create({
            content:`Novo agendamento criado de ${user.name} para dia ${formattedDate}`,
            user:provider_id,
        })

        return res.json(appointment);
    };

    async delete(req, res) {
        const appointment = await Appointment.findByPk(req.params.id, {
            include: [
                {
                    model:User,
                    as :'provider',
                    attributes:['name', 'email']
                },
                {
                    model:User,
                    as: 'user',
                    attributes: ['name']
                }
            ]
        });

        if(appointment.user_id !== req.userId){
            return res.status(401).json({ error: "Você não é o dono do agendamento  e não pode apagar este apontamento "});
        }

        const dateWithSub = subHours(appointment.date, 2);

        if(isBefore(dateWithSub, new Date())){
            return res.status(401).json({ error: "VocÊ não pode mais cancelar o apontamento, por estar menos de duas horas do horario marcado!"});
        }

        appointment.canceled_at = new Date();

        await appointment.save();

        Mail.sendMail({
            to:`${appointment.provider.name} <${appointment.provider.email}>`,
            subject:`Agendamento cancelado pelo cliente`,
            text:'cancellation',
            context:{
                provider : appointment.provider.name,
                user: appointment.user.name,
                date: format(
                    appointment.date,  
                    "'Dia' dd 'de' MMMM', às' H:mm'h'", { locale : pt } 
                )
            }
        })

        return res.json(appointment); 
    }
}

export default new AppointmentController();
