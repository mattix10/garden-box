const sequelize = require('sequelize');
const Measurement = require('../models/Measurement');
const ALLOWED_PARAMETERS = ['air', 'temperature', 'humidity', 'container', 'light'];

exports.getParameter = async (req, res) => {
  const param = req.params.parameter;
  const limit = req.params.limit;

  if (!ALLOWED_PARAMETERS.includes(param) || !limit) res.status(400).send({
    title: 'Something went wrong!'
  });

  else {
    try {
      const sensorData = await Measurement.findAndCountAll({
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
}

exports.getDateParameter = async (req, res) => async (req, res) => {
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
      const sensorData = await Measurement.findAll({
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
}

exports.getOneDayParameter = async (req, res) => {

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
      const sensorData = await Measurement.findAll({
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
}