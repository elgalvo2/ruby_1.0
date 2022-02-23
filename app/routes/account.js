const express = require('express');
const router = express.Router();
const { signup, login, current_user, getTechnicians, getAccounts, deleteAccount } = require('../controllers/account');
const { isAuthenticated, isAdmin } = require('../middleware');

router.get('/technicians', isAuthenticated, getTechnicians)
router.post('/signup', isAuthenticated, signup);
router.post('/login', login);
router.post('/current_user', isAuthenticated, current_user);
router.get('/getAccounts', isAuthenticated, isAdmin, getAccounts)
router.delete('/deleteAccount/:id', isAuthenticated, isAdmin, deleteAccount)


module.exports = router;
