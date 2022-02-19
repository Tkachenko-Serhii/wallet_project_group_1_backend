const { Developer, schemaDeveloper } = require('../../models/developer');

const addDev = async (req, res, next) => {
  try {
    const { error } = schemaDeveloper.validate(req.body);
    if (error) {
      throw res.status(400).json(error.message);
    }

    const newDev = await Developer.create(req.body);

    res.status(201).json(newDev);
  } catch (error) {
    next(error);
  }
};

module.exports = addDev;
