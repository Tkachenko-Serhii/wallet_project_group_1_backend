const { NotFound } = require('http-errors');
const { Transaction } = require('../../models/transaction');

const getStat = async (req, res, next) => {
  let currentDate = new Date();
  let currentMonth = currentDate.getMonth() + 1;
  let currentYear = currentDate.getFullYear();

  const { month = currentMonth, year = currentYear } = req.query;
  const { _id } = req.user;

  try {
    const statSpent = await Transaction.aggregate([
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
          _id: 'spent',
          totalSpent: {
            $sum: '$sum',
          },
        },
      },
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
          totalIncome: {
            $sum: '$sum',
          },
        },
      },
    ]);
    if (!statSpent || !totalSpent || !totalIncome) {
      throw new NotFound();
    }
    res.json([statSpent, totalSpent, totalIncome]);
  } catch (error) {
    next(error);
  }
};

module.exports = getStat;
