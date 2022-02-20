const { NotFound } = require('http-errors');
const { Transaction } = require('../../models/transaction');
const { User } = require('../../models');

const getStat = async (req, res, next) => {
  const { month, year } = req.query;
  const { _id } = req.user;

  try {
    const categories = await Transaction.aggregate([
      {
        $match: {
          owner: _id,
          year: Number(year),
          month: Number(month),
          type: false,
        },
      },
      {
        $group: {
          _id: '$category',
          total: {
            $sum: '$sum',
          },
        },
      },
    ]);
    const totalSpent = await Transaction.aggregate([
      {
        $match: {
          owner: _id,
          year: Number(year),
          month: Number(month),
          type: false,
        },
      },
      {
        $group: {
          _id: 0,
          spent: {
            $sum: '$sum',
          },
        },
      },
      { $project: { _id: 0, spent: '$spent' } },
    ]);
    const totalIncome = await Transaction.aggregate([
      {
        $match: {
          owner: _id,
          year: Number(year),
          month: Number(month),
          type: true,
        },
      },
      {
        $group: {
          _id: 'income',
          income: {
            $sum: '$sum',
          },
        },
      },
      { $project: { _id: 0, income: 1 } },
    ]);

    if (!categories || !totalSpent || !totalIncome) {
      throw new NotFound();
    }

    res.json({ categories, totalSpent, totalIncome });
  } catch (error) {
    next(error);
  }
};

module.exports = getStat;
