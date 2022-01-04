const express = require('express');
const router = express.Router();
const {getTechnicians, createProgram,setProperty, register_provider, getProviders, getProviderByNumber, updateProvider} = require('../controllers/admin');
const { isAuthenticated, isAdmin } = require('../middleware');

router.get('/technicians',isAuthenticated,getTechnicians);

router.post('/createProgram', isAuthenticated,createProgram);

router.post('/setProperty',isAuthenticated,setProperty);





router.post('/register_provider', register_provider)

router.get('/getProviders',getProviders)

router.post('/getProviderByNumber',getProviderByNumber)


router.post('/updateProvider',updateProvider)





module.exports = router;