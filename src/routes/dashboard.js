require('dotenv/config');

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const USER_EMAIL = process.env.USER_EMAIL;
const USER_PASSWORD = process.env.USER_PASSWORD;
const secret = process.env.JWT_SECRET_KEY;

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  try {
    if (USER_EMAIL !== email || USER_PASSWORD !== password) {
      res.status(401).send('E-mail incorreto');
    }

    const token = jwt.sign({ email }, secret, { expiresIn: '30d' });

    res.status(200).send({ token });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
