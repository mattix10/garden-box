const {
  Model,
  DataTypes,
  DATE
} = require('sequelize');
const sequelize = require('../database');
const moment = require('moment');

class Sensor extends Model {}

Sensor.init({
  container: {
    type: DataTypes.FLOAT
  },
  temperature: {
    type: DataTypes.FLOAT
  },
  light: {
    type: DataTypes.FLOAT
  },
  humidity: {
    type: DataTypes.FLOAT
  },
  air: {
    type: DataTypes.FLOAT
  },
  createdAt: {
    type: DataTypes.NOW,
    defaultValue: moment.utc().format('YYYY-MM-DD HH:mm:ss')
    //note here this is the guy that you are looking for                   
  },
}, {
  sequelize,
  modelName: 'sensor',
  updatedAt: false
})

module.exports = Sensor;
