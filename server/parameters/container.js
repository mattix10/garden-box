let containerValue = 70;

exports.socketContainer = function (socket) {
  socket.on('container', (value) => {

    socket.emit('container', {
      date: new Date().toLocaleTimeString(),
      value: containerValue,
      name: 'container'
    });
  })
  console.log('Oświetlenie')
}

exports.getContainer = () => containerValue + Math.floor(Math.random() * 7)
// exports.getContainer = async () => {
//   await Sensor.create({
//     value: containerValue + Math.floor(Math.random() * 7),
//     name: 'container'
//   });
// }
