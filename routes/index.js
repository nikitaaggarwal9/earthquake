const express = require('express');
const router = express.Router();
const earthquakeController = require('../controller/earthquake');

router.get('/', earthquakeController.get);

module.exports = router;