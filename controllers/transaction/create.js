const {
  Transaction,
  schemaCreateTransaction,
} = require('../../models/transaction');
const { User } = require('../../models');
const { calculateBalance } = require('../../helpers');

const create = async (req, res, next) => {
  try {
    const { error } = schemaCreateTransaction.validate(req.body);
    if (error) {
      throw res.status(400).json(error.message);
    }
    const { _id, balance } = req.user;
    const { sum, type } = req.body;
    const newBalance = calculateBalance(type, balance, sum);

    await User.findByIdAndUpdate(_id, { balance: newBalance });

    const newTransaction = await Transaction.create({
      ...req.body,
      balance: newBalance,
      owner: _id,
    });

    res.status(201).json(newTransaction);
  } catch (error) {
    next(error);
  }
};

module.exports = create;
