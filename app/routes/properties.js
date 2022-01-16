const express = require('express');
const router = express.Router();
const {setProperty,deleteProperty,getProperties, getPropertyById,updateProperty}= require('../controllers/properties');
const { isAuthenticated, isAdmin } = require('../middleware');


router.post('/setProperty',setProperty); //pass
router.put('/updateProperty',updateProperty); //pass
router.delete('/deleteProperty',deleteProperty); //pass
router.get('/getProperties',getProperties); //pass
router.get('/:id',getPropertyById) // pass





module.exports = router;