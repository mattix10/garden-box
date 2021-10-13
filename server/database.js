const {
  Sequelize
} = require('sequelize');

const sequelize = new Sequelize('tesst-db', 'user', 'pass', {
  dialect: 'sqlite',
  host: './newDB.sqlite'
})

module.exports = sequelize;
