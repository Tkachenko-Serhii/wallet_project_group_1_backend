const express = require('express');

const ctrl = require('../../controllers/transaction');

const { authenticate } = require('../../middlewares');

const router = express.Router();

router.get('/', authenticate, ctrl.getAll);

router.post('/create', authenticate, ctrl.create);

router.get('/statistics', authenticate, ctrl.getStat);

// router.put('/:id', authenticate, ctrl.updateById);

// router.delete('./:id', authenticate, ctrl.deleteById);

module.exports = router;
