import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class UserModel extends Model {
    static init(sequelize){
        super.init({
            name:Sequelize.STRING,
            email:Sequelize.STRING
        });
    };
};

export default UserModel;
