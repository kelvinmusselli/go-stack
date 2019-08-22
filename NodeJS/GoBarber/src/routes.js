import { Router } from 'express';
import UserController from './app/controllers/UserController';
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

export default routes;