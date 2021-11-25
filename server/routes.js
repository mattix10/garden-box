const express = require('express');
const router = express.Router();
const Sensor = require('./models/Sensor');
const User = require('./models/User');
const sequelize = require('sequelize');
const auth = require('./auth');
const {
  Op
} = require("sequelize");
const user = require('./user');
const url = require('url');
const filesController = require('./filesController');
const fileUpload = require('express-fileupload');

const ALLOWED_PARAMETERS = ['air', 'temperature', 'humidity', 'container', 'light'];
router.use(fileUpload())
router.post('/upload', filesController.uploadFile)

router.patch('/user', user.resetPassword); // zmienić na liczbe mnogą 'users'

router.post('/registration', auth.registration);

router.post('/zaloguj', auth.login);

router.get('/:parameter/oneDay?', async (req, res) => {

  const queryData = url.parse(req.url, true).query;
  let limit = queryData.limit;
  limit = req.params.limit;

  if (!limit) limit = 13;
  const param = req.params.parameter;

  if (!ALLOWED_PARAMETERS.includes(param)) res.status(400).send({
    title: 'Something went wrong!'
  });

  else {
    try {
      let exclude = ALLOWED_PARAMETERS.filter(item => item !== param);
      exclude.push('id')
      const sensorData = await Sensor.findAll({
        where: {
          createdAt: {
            [Op.gt]: new Date(new Date() - 36 * 60 * 60 * 1000)
          }
        },
        limit: limit,
        order: [
          ['createdAt', 'DESC']
        ],
        attributes: {
          exclude
        }
      });
      res.status(200).json(sensorData);
    } catch (err) {
      console.error(err);
      res.status(400);
    }
  }
})

router.get('/:parameter/:limit', async (req, res) => {
  const param = req.params.parameter;
  const limit = req.params.limit;

  if (!ALLOWED_PARAMETERS.includes(param) || !limit) res.status(400).send({
    title: 'Something went wrong!'
  });

  else {
    try {
      const sensorData = await Sensor.findAndCountAll({
        attributes: [param, 'createdAt'],
        limit: limit,
        order: [
          ['createdAt', 'DESC']
        ]
      });
      res.status(200).json(sensorData);
    } catch (err) {
      console.log(err);
      res.status(400);
    }
  }
});

router.get('/:parameter?', async (req, res) => {
  let limit;
  limit = req.query.limit;
  let date;
  date = req.query.date;

  if (!limit) limit = 11;
  const param = req.params.parameter;

  if (!ALLOWED_PARAMETERS.includes(param)) res.status(400).send({
    title: 'Something went wrong!'
  });

  else {
    try {
      let exclude = ALLOWED_PARAMETERS.filter(item => item !== param);
      exclude.push('id');
      const sensorData = await Sensor.findAll({
        where: {
          createdAt: {
            [Op.like]: date + '%'
          }
        },
        limit: limit,
        order: [
          ['createdAt', 'DESC']
        ],
        attributes: {
          exclude
        }
      });
      res.status(200).json(sensorData);
    } catch (err) {
      console.log(err);
      res.status(400);
    }
  }
});

router.get('/sensors', async (req, res) => {
  const sensors = await Sensor.findAll();
  res.status(200).json(sensors);
});

module.exports = router;
