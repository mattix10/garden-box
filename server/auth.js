const User = require('./models/User');
const jwt = require('jsonwebtoken');
const uuid = require('uuid').v4;
const bcrypt = require('bcrypt');

const SECRET_KEY = uuid();

exports.login = async (req, res) => {
  let user;

  try {
    user = await User.findOne({
      where: {
        email: req.body.email
      }
    })
  } catch (err) {
    console.log(err);
    res.status(500);
  }

  if (!user) res.sendStatus(404);

  let result;

  try {
    result = await bcrypt.compare(req.body.password, user.password);

    if (result) {
      createUserToken(user, res);
    } else res.sendStatus(404);
  } catch (err) {
    console.log(err);
    res.status(500);
  }

}

exports.registration = async (req, res) => {

  try {
    hashedPassword = await bcrypt.hash(req.body.password, 3);

    const user = await User.create({
      email: req.body.email,
      password: hashedPassword
    });

    createUserToken(user, res);
  } catch (err) {
    console.log(err);
    res.status(500);
  }

}

createUserToken = async (user, res) => {
  const payload = {
    email: user.email
  };

  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: '60'
  });

  res.status(200).json({
    token: token,
    email: user.email
  });
}
