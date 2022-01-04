const express = require('express');
const router = express.Router();
const {signup, login, current_user, getTechnicians} = require('../controllers/account');
const { isAuthenticated } = require('../middleware');

router.get('/technicians',isAuthenticated,getTechnicians)
router.post('/signup',isAuthenticated,signup);
router.post('/login',login);
router.post('/current_user',isAuthenticated,current_user);


module.exports = router;
