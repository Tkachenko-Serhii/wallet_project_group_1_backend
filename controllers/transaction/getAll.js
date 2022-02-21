const { Transaction } = require('../../models');

const getAll = async (req, res, next) => {
  try {
    const { page = 1, limit = 30 } = req.query;
    const { _id } = req.user;
    const skip = (page - 1) * limit;
    const transactions = await Transaction.find({ owner: _id }, '', {
      skip,
      limit: +limit,
    });
    res.json(transactions);
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
