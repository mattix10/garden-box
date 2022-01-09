let tempValue;
const fs = require('fs');

exports.socketTemperature = function (socket) {
  socket.on('temperature', () => {

    fs.readFile('./setValues/outputTemperature.txt', 'utf8', function (err, data) {
      if (err) {
        return console.log(err);
      }
      tempValue = data;
    });

    socket.emit('temperature', {
      createdAt: new Date().toLocaleTimeString(),
      value: tempValue,
      name: 'temperature'
    });
  })

  socket.on('settemperature', value => {
    fs.writeFile('./setValues/temperature.txt', `${value}`, err => {
      if (err) {
        console.error(err);
        return
      }
    });
  })
}
