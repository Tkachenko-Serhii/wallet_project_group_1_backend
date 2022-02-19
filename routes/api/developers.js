const express = require('express');

const ctrl = require('../../controllers/developer');

const router = express.Router();

router.get('/', ctrl.getAll);

router.post('/add', ctrl.addDev);

module.exports = router;
