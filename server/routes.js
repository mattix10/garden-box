const express = require('express');
const router = express.Router();
const Sensor = require('./models/Sensor');
const User = require('./models/User');
const sequelize = require('sequelize');
const auth = require('./auth');
const {
  Op
} = require("sequelize");
router.get('zaloguj', async (req, res) => {
  // const sensors = await Sensor.findAll();
  // res.status(200).json(sensors)
  res.status(204).json({
    title: 'welcome!'
  })
});

router.get('/api/:parameter/oneDay/:limit', async (req, res) => {
  const allowedParameters = ['air', 'temperature', 'humidity', 'container', 'light'];
  let limit;
  limit = req.params.limit;
  if (!limit) limit = 13;
  const param = req.params.parameter;
  console.log(param);
  if (!allowedParameters.includes(param)) res.status(400).send({
    title: 'Something went wrong!'
  });

  else {
    let exclude = allowedParameters.filter(item => item !== param);
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
  }
})

router.get('/api/:parameter/:limit', async (req, res) => {
  const allowedParameters = ['air', 'temperature', 'humidity', 'container', 'light'];
  const param = req.params.parameter;
  const limit = req.params.limit;

  if (!allowedParameters.includes(param) || !limit) res.status(400).send({
    title: 'Something went wrong!'
  });

  else {
    const sensorData = await Sensor.findAndCountAll({
      attributes: [param, 'createdAt'],
      limit: limit,
      order: [
        ['createdAt', 'DESC']
      ]
    });
    res.status(200).json(sensorData);
  }
});

router.get('/api/:parameter/:limit/:date', async (req, res) => {
  const allowedParameters = ['air', 'temperature', 'humidity', 'container', 'light'];
  let limit;
  limit = req.params.limit;
  let date;
  date = req.params.date;
  console.log(date)
  if (!limit) limit = 10;
  const param = req.params.parameter;
  console.log(param);
  if (!allowedParameters.includes(param)) res.status(400).send({
    title: 'Something went wrong!'
  });

  else {
    let exclude = allowedParameters.filter(item => item !== param);
    exclude.push('id')
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
  }
})

router.get('/api/sensors', async (req, res) => {
  const sensors = await Sensor.findAll();
  res.status(200).json(sensors);
});

router.post('/api/zaloguj', auth.login);

module.exports = router;
