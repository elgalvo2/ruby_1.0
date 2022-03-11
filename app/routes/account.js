const express = require('express');
const router = express.Router();
const { signup, login, current_user, getTechnicians, getAccounts, deleteAccount , getOperators} = require('../controllers/account');
const { isAuthenticated, isAdmin } = require('../middleware');

router.get('/technicians', isAuthenticated, getTechnicians)
router.get('/operators',isAuthenticated,getOperators)
router.post('/signup', isAuthenticated, signup);
router.post('/login', login);
router.post('/current_user', isAuthenticated, current_user);
router.get('/getAccounts', isAuthenticated, isAdmin, getAccounts)
router.delete('/deleteAccount/:id', isAuthenticated, isAdmin, deleteAccount)


module.exports = router;
