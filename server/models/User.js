const {
  Model,
  DataTypes
} = require('sequelize');
const sequelize = require('../database');
const uuid = require('uuid').v4;

class User extends Model {}

User.init({
  id: {
    type: DataTypes.UUID,
    unique: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  modelName: 'user',
  updatedAt: false
})

User.beforeCreate(user => user.id = uuid());

module.exports = User;
