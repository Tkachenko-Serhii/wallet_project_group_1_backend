const { Category, schemaCategory } = require('../../models/category');

const addCategory = async (req, res, next) => {
  try {
    const { error } = schemaCategory.validate(req.body);
    if (error) {
      throw res.status(400).json(error.message);
    }

    const { _id } = req.user;

    const newCategory = await Category.create({
      ...req.body,
      owner: _id,
    });

    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
};

module.exports = addCategory;
