var express = require('express');
var router = express.Router();
var mainController = require('../controllers/mainController');

router.get('/', mainController.get);
router.put('/', mainController.put);
router.delete('/', mainController.delete);

module.exports = router;
