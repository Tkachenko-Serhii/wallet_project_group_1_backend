const express = require('express');

const ctrl = require('../../controllers/category');

const { authenticate } = require('../../middlewares');

const router = express.Router();

router.get('/', authenticate, ctrl.getCategory);

router.post('/add', authenticate, ctrl.addCategory);

module.exports = router;
