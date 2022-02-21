const { Schema, model } = require('mongoose');
const Joi = require('joi');

const categorySchema = Schema(
  {
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    type: {
      type: Boolean,
      default: false,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true },
);

const schemaCategory = Joi.object({
  value: Joi.string().required(),
  label: Joi.string().required(),
  type: Joi.bool().required(),
});

const Category = model('categories', categorySchema);

module.exports = {
  Category,
  schemaCategory,
};
