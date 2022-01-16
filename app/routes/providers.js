const express = require('express');
const router = express.Router();
const {register_provider, getProviders, getProviderByNumber, updateProvider} = require('../controllers/providers');
const { isAuthenticated, isAdmin } = require('../middleware');



router.post('/register_provider', register_provider)//pass

router.get('/getProviders',getProviders)//pass

router.post('/getProviderByNumber',getProviderByNumber)//pass

router.post('/updateProvider',updateProvider)//pass


module.exports = router;