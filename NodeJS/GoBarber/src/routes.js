import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => {
    return res.json({ Hello: 'Hello World'});
});

export default routes;
// module.exports = routes;