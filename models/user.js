const { Schema, model } = require('mongoose');
const Joi = require('joi');

// eslint-disable-next-line no-useless-escape
const emailRegexp = /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/;

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
      minlength: 7,
    },
    name: {
      type: String,
      required: [true, 'Your name is required'],
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
  password: Joi.string().min(7).required(),
  name: Joi.string().required(),
});

const joiLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(7).required(),
});

const User = model('user', userSchema);

module.exports = {
  User,
  joiRegisterSchema,
  joiLoginSchema,
};
