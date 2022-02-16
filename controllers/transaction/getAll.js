const { Transaction } = require('../../models');

const getAll = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
