const express = require('express');
const router = express.Router();
const Sensor = require('./models/Sensor');

router.get('/api/:parameter/:limit', async (req, res) => {
  const allowedParameters = ['air', 'temperature', 'humidity', 'container', 'light'];
  const param = req.params.parameter;
  if (!allowedParameters.includes(param)) return;

  const limit = req.params.limit;

  const humidity = await Sensor.findAndCountAll({
    where: {
      name: param
    },
    limit: limit,
    order: [
      ['createdAt', 'DESC']
    ]
  });
  res.status(200).json(humidity);
})


router.get('/api/sensors', async (req, res) => {
  const sensors = await Sensor.findAll();
  res.status(200).json(sensors)
})

router.post('/zaloguj', async (req, res) => {
  const {
    email,
    password
  } = req.body;
  const user = await User.findOne({
    where: {
      email: email,
      password: password
    }
  })
  res.status(200).json(user);

})

module.exports = router;
