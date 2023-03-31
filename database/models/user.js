'use strict';

const { Model } = require('sequelize')
const { mailer } = require('../../utils')

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.Post, {
                foreignKey: 'userId',
                as: 'posts'
            });
        }

        /**
         * Function to notify user via email
         * 
         */ 
        async notify(instance, res){
            await mailer.send(this.email, instance, res)
        }
    }
    
    User.init({
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'User',
    });

    return User;
};