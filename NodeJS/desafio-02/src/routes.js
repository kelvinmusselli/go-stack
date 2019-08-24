import { Router } from 'express';
import UserController from '../src/app/controllers/UserController';
import SessionContoller from '../src/app/controllers/SessionController';
import authMiddleware from '../src/app/middleware/auth';

const routes = new Router();

// CRIANDO AS ROTAS DO BACK END

// POSTS
routes.post('user', UserController.Create);
routes.post('session', SessionContoller.Create);

// MIDDLEWARE GLOBAL
routes.use(authMiddleware);

// ATUALIZAR
routes.put('user', UserController);


export default routes;