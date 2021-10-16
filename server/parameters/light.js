// const Gpio = require('onoff').Gpio;
// var LED = new Gpio(4, 'out');
const Sensor = require('../models/Sensor');
let lightValue = 50;

exports.socketLight = function (socket) {
  socket.on('light', (value) => {
    socket.emit('light', {
      date: new Date().toLocaleTimeString(),
      value: lightValue,
      name: 'light'
    });
    //   if (LED.readSync() === 0) {
    //       LED.writeSync(1);} else {
    //       LED.writeSync(0);}
    //   console.log('Oświetlenie', value)
  })
}

exports.getLight = () => lightValue + Math.floor(Math.random() * 7)
// exports.getLight = () => {
//   await Sensor.create({
//     value: lightValue + Math.floor(Math.random() * 7),
//     name: 'light'
//   });
// }
