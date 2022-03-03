const express = require('express');
const router = express.Router();
// const path = require('path');
const controller = require('../controllers/controller.js');

console.log(controller);

router.get('/', controller.homepage);
router.get('/details', controller.getDetails);
router.post('/details', controller.postDetails);
router.post('/newIntern', controller.newIntern);

module.exports = router;
