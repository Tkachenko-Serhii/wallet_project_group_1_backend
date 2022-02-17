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
});

const Category = model('category', categorySchema);

module.exports = {
  Category,
  schemaCategory,
};
