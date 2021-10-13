const Sensor = require('../models/Sensor');
let airValue = 88;

exports.socketAir = function (socket) {
  socket.on('air', (value) => {

    socket.emit('air', {
      date: new Date().toLocaleTimeString(),
      value: airValue,
      name: 'air'
    });
    console.log('air', value)
  })
}

exports.getAir = async () => {
  await Sensor.create({
    value: airValue + Math.floor(Math.random() * 7),
    name: 'air'
  });
}
