let tempValue = 23;
const Sensor = require('../models/Sensor');

exports.socketTemperature = function (socket) {
  socket.on('temperature', value => {
    socket.emit('temperature', {
      date: new Date().toLocaleTimeString(),
      value: tempValue,
      name: 'temperature'
    });
    console.log('Temperatura', tempValue, value)
  })
}

exports.getTemperature = () => tempValue + Math.floor(Math.random() * 7);
// exports.getTemperature = async () => {
//   await Sensor.create({
//     value: tempValue + Math.floor(Math.random() * 7),
//     name: 'temperature'
//   });
// }
