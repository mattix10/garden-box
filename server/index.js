const express = require('express');
const cors = require('cors');
const air = require('./parameters/air');
const humidity = require('./parameters/humidity');
const light = require('./parameters/light');
const temperature = require('./parameters/temperature');
const container = require('./parameters/container');
const sequelize = require('./database');
const router = require('./routes');
const INTERVAL = 5 * 1000; // godziny * minuty * sekundy * milisekundy
const path = require('path');
const moment = require('moment');
const session = require("express-session")({
  secret: "my-secret",
  resave: true,
  saveUninitialized: true
});


const sharedsession = require("express-socket.io-session");
const Sensor = require('./models/Sensor');

sequelize.sync().then(() => console.log('db is ready'));

const app = express();

// const expressServer = app.listen(80, '192.168.137.160', async () => {
const expressServer = app.listen('5000', async () => {
  console.log('listen');

  setInterval(async () => {
    let now = new moment();
    let lightValue = light.getLight();
    let temperatureValue = temperature.getTemperature();
    let humidityValue = humidity.getHumidity();
    let containerValue = container.getContainer();
    let airValue = air.getAir();

    await Sensor.create({
      light: lightValue,
      temperature: temperatureValue,
      humidity: humidityValue,
      container: containerValue,
      air: airValue,
      createdAt: now.format("YYYY-MM-DD HH:mm:ss")
    })
  }, INTERVAL);

});


app.use(cors({
  origin: '*'
}))
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(express.static('dist/garden-box'));
app.use('/api', router);
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '../../server/dist/garden-box/index.html'));
})

// express-session middleware for express
app.use(session);
const io = require("socket.io")(expressServer, {
  cors: {
    // origin: "192.168.137.160:80",
    origin: "*",
    methods: ["GET", "POST", "PATCH"]
  }
});
// shared session middleware for socket.io
// setting autoSave:true
io.use(sharedsession(session, {
  autoSave: true
}));

io.on("connection", socket => {
  console.log('init connection...');
  socket.handshake.session.userdata = 'kod';
  socket.handshake.session.save();

  socket.on("disconnect", function () {
    console.log("user disconnected");
  });

  humidity.socketHumidity(socket);
  temperature.socketTemperature(socket);
  air.socketAir(socket);
  light.socketLight(socket);
  container.socketContainer(socket);
});
