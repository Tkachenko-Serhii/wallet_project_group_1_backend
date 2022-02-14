const { Schema, model } = require('mongoose');
const Joi = require('joi');

const transactionSchema = Schema(
  {
    day: {
      type: Number,
      required: true,
    },
    month: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    type: {
      type: Boolean,
      default: true,
      required: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
    },
    comment: {
      type: String,
    },
    sum: {
      type: Number,
      required: true,
      min: 0,
    },
    balance: {
      type: Number,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true },
);

const schemaCreateTransaction = Joi.object({
  day: Joi.number().required(),
  month: Joi.number().required(),
  year: Joi.number().required(),
  type: Joi.boolean().required(),
  category: Joi.string().required(),
  comment: Joi.string().optional(),
  sum: Joi.number().min(0).integer().required(),
  owner: Joi.string().optional(),
});

const schemaUpdateTransaction = Joi.object({
  day: Joi.number().optional(),
  month: Joi.number().optional(),
  year: Joi.number().optional(),
  type: Joi.boolean().required(),
  category: Joi.string().optional(),
  comment: Joi.string().optional(),
  sum: Joi.number().min(0).integer().optional(),
  owner: Joi.string().optional(),
}).or('day', 'month', 'year', 'type', 'category', 'comment', 'sum', 'owner');

const Transaction = model('transaction', transactionSchema);

module.exports = {
  Transaction,
  schemaCreateTransaction,
  schemaUpdateTransaction,
};
