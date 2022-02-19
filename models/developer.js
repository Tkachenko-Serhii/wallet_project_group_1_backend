const { Schema, model } = require('mongoose');
const Joi = require('joi');

const developerSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    linkedin: {
      type: String,
      required: true,
    },
    github: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

const schemaDeveloper = Joi.object({
  name: Joi.string().required(),
  role: Joi.string().required(),
  linkedin: Joi.string().required(),
  github: Joi.string().required(),
  photo: Joi.string().required(),
});

const Developer = model('developers', developerSchema);

module.exports = {
  Developer,
  schemaDeveloper,
};
