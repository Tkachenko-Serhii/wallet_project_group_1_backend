const express = require('express');

const ctrl = require('../../controllers/transaction');

const { authenticate } = require('../../middlewares');

const router = express.Router();

router.get('/', authenticate, ctrl.getAll);

router.post('/create', authenticate, ctrl.create);

router.put('/:id', authenticate, ctrl.updateById);

module.exports = router;
