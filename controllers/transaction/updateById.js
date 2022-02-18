const { NotFound } = require('http-errors');
const {
  Transaction,
  schemaUpdateTransaction,
} = require('../../models/transaction');
const { User } = require('../../models');
const { updateBalance } = require('../../helpers');

const updateById = async (req, res, next) => {
  try {
    const { error } = schemaUpdateTransaction.validate(req.body);
    if (error) {
      throw res.status(400).json({ message: 'missing fields' });
    }
    const { id } = req.params;
    const prevData = Transaction.findById(id);

    const { _id, balance } = req.user;
    const { sum, type } = req.body;

    const newBalance = updateBalance(type, balance, sum);
    await User.findByIdAndUpdate(_id, { balance: newBalance });
    const updateTransaction = await Transaction.findByIdAndUpdate(
      id,
      {
        ...req.body,
        balance: newBalance,
      },
      { new: true },
    );

    if (!updateTransaction) {
      throw new NotFound();
    }
    res.json(updateTransaction);
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
