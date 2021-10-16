const User = require('./models/User');
const jwt = require('jsonwebtoken');
const uuid = require('uuid').v4;

const SECRET_KEY = uuid();

exports.login = async (req, res) => {
  // const user = await User.create({
  //   id: null,
  //   email: "test@tes.com",
  //   password: "123456"
  // })
  const {
    email,
    password
  } = req.body;

  console.log(email, password);

  const user = await User.findOne({
    where: {
      email,
      password
    }
  })

  if (user) {
    const payload = {
      subject: user.id
    };
    console.log(SECRET_KEY);
    const token = jwt.sign(payload, SECRET_KEY, {
      expiresIn: '60'
    });
    console.log(token)
    res.status(200).json({
      token: token,
      user: user.email
    });
  } else res.sendStatus(404);
}
