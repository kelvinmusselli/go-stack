import { Router } from 'express';
import UserController from '../src/app/controllers/UserController';
import SessionController from '../src/app/controllers/SessionController';
import authMiddleware from '../src/app/middleware/auth';

const routes = new Router();

// CRIANDO AS ROTAS DO BACK END

// POSTS
routes.post('/users', UserController.Create);


routes.post('/session', SessionController.CreateSession);


// MIDDLEWARE GLOBAL
routes.use(authMiddleware);

// ATUALIZAR
routes.put('/users', UserController.Update);


export default routes;