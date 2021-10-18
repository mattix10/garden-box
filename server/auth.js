const User = require('./models/User');
const jwt = require('jsonwebtoken');
const uuid = require('uuid').v4;
const bcrypt = require('bcrypt');

const SECRET_KEY = uuid();

exports.login = async (req, res) => {

  const user = await User.findOne({
    where: {
      email: req.body.email
    }
  })

  if (!user) res.sendStatus(404);

  const result = await bcrypt.compare(req.body.password, user.password);

  if (result) {
    createUserToken(user, res);
  } else res.sendStatus(404);
}

exports.registration = async (req, res) => {

  hashedPassword = await bcrypt.hash(req.body.password, 3);

  const user = await User.create({
    email: req.body.email,
    password: hashedPassword
  });

  createUserToken(user, res);
}

createUserToken = async (user, res) => {
  const payload = {
    subject: user.email
  };

  console.log(payload)

  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: '60'
  });

  res.status(200).json({
    token: token,
    user: user.email
  });
}
