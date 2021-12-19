const express = require('express');
const router = express.Router();
const {getTechnicians, createProgram,setProperty, register_provider} = require('../controllers/admin');
const { isAuthenticated } = require('../middleware');

router.get('/technicians',isAuthenticated,getTechnicians);

router.post('/createProgram', isAuthenticated,createProgram);

router.post('/setProperty',isAuthenticated,setProperty);

router.post('/register_provider', isAdmin, register_provider)



module.exports = router;