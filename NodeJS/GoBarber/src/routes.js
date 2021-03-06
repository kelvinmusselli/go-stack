import { Router } from 'express';
import multer from 'multer'; 
import multerConfig from './config/multer';
import UserController from '../src/app/controllers/UserController';
import SessionController from '../src/app/controllers/SessionController';
import FileController from '../src/app/controllers/FileController';
import ProviderController from '../src/app/controllers/ProviderController';
import AppointmentController from '../src/app/controllers/AppointmentController';
import authMiddleware from '../src/app/middleware/auth';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import AvailableController from './app/controllers/AvailableController';

const routes = new Router();

const upload = multer(multerConfig);

routes.post('/users', UserController.Create);
routes.post('/session', SessionController.Create);

// middleware global
routes.use(authMiddleware);

routes.put('/users', UserController.Update);

routes.get('/providers', ProviderController.index);
routes.get('/providers/:providerid/available', AvailableController.index);


routes.post('/appointments', AppointmentController.store);
routes.get('/appointments', AppointmentController.index);
routes.delete('/appointments/:id', AppointmentController.delete);

//listando para o provider 
routes.get('/schedule', ScheduleController.index);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

routes.post('/files', upload.single('file'), FileController.Create);
export default routes;