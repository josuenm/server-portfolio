require('dotenv/config');
const jwt = require('jsonwebtoken');

const USER_EMAIL = process.env.USER_EMAIL;
const USER_PASSWORD = process.env.USER_PASSWORD;
const secret = process.env.JWT_SECRET_KEY;

const Auth = (req, res, next) => {
  const token = req.headers['jnm.token'];

  if (!token) {
    res.status(401).json({ error: 'Unauthorized: no token provided' });
  } else {
    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        res.status(401).json({ error: 'Unauthorized: invalid token' });
      } else {
        req.email = decoded.email;
        console.log({
          decodedEmail: decoded.email,
          reqEmail: req.email,
        });
        if (req.email === USER_EMAIL) {
          req.user = { email: USER_EMAIL };
          next();
        } else {
          res.status(401).json({ error: err });
        }
      }
    });
  }
};

module.exports = Auth;
