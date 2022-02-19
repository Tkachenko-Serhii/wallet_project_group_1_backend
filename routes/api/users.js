const express = require('express');
const { BadRequest, Conflict, Unauthorized } = require('http-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { nanoid } = require('nanoid');

const { authenticate } = require('../../middlewares');

const { User } = require('../../models');
const { joiRegisterSchema, joiLoginSchema } = require('../../models/user');
const router = express.Router();
const { SECRET_KEY } = process.env;

router.post('/signup', async (req, res, next) => {
  try {
    const { error } = joiRegisterSchema.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict('Email in use');
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const id = nanoid(16);
    const payload = {
      id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      token,
    });
    res.status(201).json({
      token: newUser.token,
      user: {
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { error } = joiLoginSchema.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!user || !passwordCompare) {
      throw new Unauthorized('Email does not exist or Password is wrong');
    }

    const { _id, name } = user;
    const payload = {
      id: _id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
    await User.findByIdAndUpdate(_id, { token });
    res.json({
      token,
      user: { email, name },
    });
  } catch (error) {
    next(error);
  }
});

router.get('/logout', authenticate, async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).send();
});

router.get('/current', authenticate, async (req, res) => {
  const { name, email } = req.user;
  res.json({
    user: {
      name,
      email,
    },
  });
});

router.get('/balance', authenticate, async (req, res) => {
  const { balance } = req.user;
  res.json({
    balance,
  });
});

module.exports = router;
