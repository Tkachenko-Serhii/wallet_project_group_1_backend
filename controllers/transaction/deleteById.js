const { Transaction } = require('../../models');
const { NotFound } = require('http-errors');

const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteTransaction = await Transaction.findByIdAndDelete(id);
    if (!deleteTransaction) {
      throw new NotFound();
    }
    res.json({ message: 'Transaction deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteById;

// sum, typa, date
// выбрать все транзакции после текущей даты
// пребрать в цикле (отнять или добавить сумму транзакции)
