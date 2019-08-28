import { Router } from 'express';
import multer from 'multer'; 
import multerConfig from './config/multer';
import UserController from '../src/app/controllers/UserController';
import SessionController from '../src/app/controllers/SessionController';
import FileController from '../src/app/controllers/FileController';
import authMiddleware from '../src/app/middleware/auth';


const routes = new Router();

const upload = multer(multerConfig);

routes.post('/users', UserController.Create);
routes.post('/session', SessionController.Create);

// middleware global
routes.use(authMiddleware);

routes.put('/users', UserController.Update);

routes.post('/files', upload.single('file'), FileController.Create);
export default routes;