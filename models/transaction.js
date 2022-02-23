const { Schema, model } = require('mongoose');
const Joi = require('joi');

const transactionSchema = Schema(
  {
    month: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
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
      min: 1,
    },
    balance: {
      type: Number,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true },
);

const schemaCreateTransaction = Joi.object({
  month: Joi.number().min(1).max(12).integer().required(),
  year: Joi.number().min(1975).integer().required(),
  date: Joi.date().required(),
  type: Joi.boolean().required(),
  category: Joi.string().required(),
  comment: Joi.string().optional(),
  sum: Joi.number().min(1).integer().required(),
});

const schemaUpdateTransaction = Joi.object({
  month: Joi.number().min(1).max(12).integer().required(),
  year: Joi.number().min(1975).integer().required(),
  date: Joi.date().required(),
  type: Joi.boolean().required(),
  category: Joi.string().optional(),
  comment: Joi.string().optional(),
  sum: Joi.number().min(1).integer().optional(),
}).or('type', 'category', 'comment', 'sum');

const Transaction = model('transaction', transactionSchema);

module.exports = {
  Transaction,
  schemaCreateTransaction,
  schemaUpdateTransaction,
};
