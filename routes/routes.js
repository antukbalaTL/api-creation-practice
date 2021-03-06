const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller.js');


/* all routes */
router.get('/', controller.homepage); /* homepage, all routes listed down */
router.get('/allInterns', controller.allInterns); /* get details of all interns */
router.get('/getInfo/:tlid', controller.getInfo); /* get details of specific intern by id */
router.post('/addIntern', controller.addIntern); /* add new intern */
router.delete('/removeIntern', controller.removeIntern); /* remove intern */
router.patch('/updateInfo/:tlid', controller.updateInfo); /* kept for testing */
router.get('/test', controller.generateTLID); /* kept for testing */

module.exports = router;
