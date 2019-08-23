import express from 'express';
import routes from './routes';

import './database';

class App {
    // metodo construtor da aplicacao que chama o servidor, a midellware que trablahará com os dados que receberá e enviara em json e as rotas por ultimo
    
    constructor (){
        this.server = express();
        this.middleware();
        this.routes();
    }

    middleware () {
        //aqui estou dizendo que meu sistema receberá e enviará dados em tipo json
        this.server.use(express.json());
    }

    routes () {
        this.server.use(routes);
    }
}
export default new App().server;