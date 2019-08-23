import Sequelize, { ConnectionError } from 'sequelize';

// models

// banco de dados config
import databaseConfig from '../config/database';

// var que chama todos models do meu sistema para conectar com banco de dados
const models = [

];
// classe de conexao com banco de dados
class Database {

    constructor(){
        this.init();
    }
    
    init(){
        // este init irá abri a conexao com banco de dados e apos 
        // isso ele procurará todos models para poder fazer a conexao com banco de dados
        this.connection = new Sequelize(databaseConfig);
        models.map(model => model.init(this.connection));

    }
}

export default new Database();