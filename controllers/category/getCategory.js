const { Category } = require('../../models');

const getCategory = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const category = await Category.find({ owner: null });
    const ownerCategory = await Category.find({ owner: _id });

    const categoryArray = [...category, ...ownerCategory];

    res.json(categoryArray);
  } catch (error) {
    next(error);
  }
};

module.exports = getCategory;
