const { NotFound } = require('http-errors');
const { Transaction } = require('../../models/transaction');

const getStat = async (req, res, next) => {
  const { month, year } = req.body;
  const { _id } = req.user;

  try {
    const statSpent = await Transaction.aggregate([
      {
        $match: {
          owner: { _id },
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
          owner: { _id },
          year: Number(year),
          month: Number(month),
          type: false,
        },
      },
      {
        $group: {
          _id: 'spent',
          total: {
            $sum: '$sum',
          },
        },
      },
    ]);
    const totalIncome = await Transaction.aggregate([
      {
        $match: {
          owner: { _id },
          year: Number(year),
          month: Number(month),
          type: true,
        },
      },
      {
        $group: {
          _id: 'income',
          total: {
            $sum: '$sum',
          },
        },
      },
    ]);
    if (!stat) {
      throw new NotFound();
    }
    res.json([statSpent, totalSpent, totalIncome]);
  } catch (error) {
    next(error);
  }
};

module.exports = getStat;
