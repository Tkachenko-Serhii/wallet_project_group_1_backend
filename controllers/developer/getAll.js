const { Developer } = require('../../models');

const getAll = async (req, res, next) => {
  try {
    const developers = await Developer.find();
    res.json(developers);
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
