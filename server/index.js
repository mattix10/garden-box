const express = require('express');
const cors = require('cors');
const air = require('./parameters/air');
const humidity = require('./parameters/humidity');
const light = require('./parameters/light');
const temperature = require('./parameters/temperature');
const container = require('./parameters/container');
const sequelize = require('./database');
const router = require('./routes');
const INTERVAL = 5000;

const session = require("express-session")({
  secret: "my-secret",
  resave: true,
  saveUninitialized: true
});
const sharedsession = require("express-socket.io-session");

sequelize.sync().then(() => console.log('db is ready'));

const app = express();
const expressServer = app.listen('5000', async () => {
  console.log('listen');
  setInterval(() => {
    light.getLight();
    temperature.getTemperature();
    container.getContainer();
    humidity.getHumidity();
    air.getAir();
  }, INTERVAL);
});

app.use(cors({
  origin: '*'
}))

app.use(express.static('dist/garden-box'))
app.use(express.json())
app.use('/', router);
// express-session middleware for express
app.use(session);
const io = require("socket.io")(expressServer, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"]
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
