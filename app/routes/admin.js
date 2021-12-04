const express = require('express');
const router = express.Router();
const {getTechnicians, createProgram,setProperty} = require('../controllers/admin');
const { isAuthenticated } = require('../middleware');

router.get('/technicians',isAuthenticated,getTechnicians);
router.post('/createProgram', isAuthenticated,createProgram)
router.post('/setProperty',isAuthenticated,setProperty);



module.exports = router;