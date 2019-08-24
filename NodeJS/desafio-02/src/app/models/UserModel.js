import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class UserModel extends Model {
    static init(sequelize){
        super.init({
            name:Sequelize.STRING,
            email:Sequelize.STRING,
            password_hash:Sequelize.STRING,
            password:Sequelize.VIRTUAL,
            provider:Sequelize.BOOLEAN,
        },{
            sequelize,
        });

        this.addHook('beforeSave', async user => {
            if(user.password){
                user.password_hash = await bcrypt.hash(user.password, 9);
            }
        });
        return this;
    };

    checkPassword(password){
        return bcrypt.compare(password, this.password_hash);
    }
};

export default UserModel;
