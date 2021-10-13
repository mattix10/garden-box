const {
  Model,
  DataTypes
} = require('sequelize');
const sequelize = require('../database');

class Sensor extends Model {}

Sensor.init({
  name: {
    type: DataTypes.STRING
  },
  value: {
    type: DataTypes.FLOAT
  },
}, {
  sequelize,
  modelName: 'sensor'
})

module.exports = Sensor;
