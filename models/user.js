const { Schema, model } = require('mongoose');
const Joi = require('joi');

const emailRegexp = /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/;
const passwordRegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/;

const userSchema = Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: emailRegexp,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    name: {
      type: String,
      required: [true, 'Your name is required'],
    },
    balance: {
      type: Number,
      default: 0.0,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true },
);

const joiRegisterSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().pattern(passwordRegExp).required(),
  name: Joi.string().required(),
});

const joiLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().pattern(passwordRegExp).required(),
});

const User = model('user', userSchema);

module.exports = {
  User,
  joiRegisterSchema,
  joiLoginSchema,
};
