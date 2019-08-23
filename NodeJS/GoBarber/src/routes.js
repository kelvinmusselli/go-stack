import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middleware/auth';
const routes = new Router();

// routes.get('/', async (req, res) => {
//     const user = await User.create({
//         name:'Kelvin',
//         email:'kelvinmusselli22@gmail.com',
//         password_hash:'123465',
//     })

//     return res.json(user);
// });
routes.post('/users', UserController.Create);
routes.post('/session', SessionController.Create);

// middleware global
routes.use(authMiddleware);

routes.put('/users', UserController.Update);




export default routes;