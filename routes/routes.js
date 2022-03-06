const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller.js');
// const path = require('path');
// console.log(controller);

router.get('/', controller.homepage);
router.get('/allInterns', controller.allInterns);
// router.get('/getInfo', controller.getInfo);
router.get('/getInfo/:id', controller.getInfo);
router.post('/addIntern', controller.addIntern);
router.delete('/removeIntern', controller.removeIntern);
// router.post('/details', controller.postDetails);

module.exports = router;