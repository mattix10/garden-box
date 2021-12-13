const express = require('express');
const router = express.Router();
const Measurement = require('./models/Measurement');
const sequelize = require('sequelize');
const auth = require('./controllers/auth.controller');
const {
  Op
} = require("sequelize");
const user = require('./controllers/user.controller');
const url = require('url');
const fileUpload = require('express-fileupload');
const plant = require('./plant');
const images = require('./controllers/images.controller');
const parameter = require('./controllers/parameter.controller');

router.use(fileUpload());
router.get('/plant/images', images.getImages);
router.delete('/plant/images/:createdAt', images.removeImage);
router.put('/user', user.resetPassword); // zmienić na liczbe mnogą 'users'

router.get('/plant', plant.getPlant);
router.patch('/plant', plant.editPlant);

router.post('/registration', auth.registration);
router.post('/zaloguj', auth.login);

router.get('/:parameter/oneDay?', parameter.getOneDayParameter)

router.get('/:parameter/:limit', );

router.get('/:parameter?', parameter.getDateParameter);

router.get('/sensors', async (req, res) => {
  const sensors = await Measurement.findAll();
  res.status(200).json(sensors);
});

module.exports = router;
