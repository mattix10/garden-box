const Sensor = require('../models/Sensor');
let humidityValue = 65;

exports.socketHumidity = function (socket) {
  socket.on('humidity', (value) => {
    socket.emit('humidity', {
      date: new Date().toLocaleTimeString(),
      value: humidityValue + 1,
      name: 'humidity'
    });
  })
}

exports.getHumidity = async () => {
  await Sensor.create({
    value: humidityValue + Math.floor(Math.random() * 7),
    name: 'humidity'
  });
}
