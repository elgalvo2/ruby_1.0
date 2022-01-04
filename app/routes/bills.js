const express = require('express');
const router = express.Router();
const {setBill, markAsRecived, markAsAuthorized, markAsSendedToSign, markAsDone, updateBill, deleteBill, getBills} = require('../controllers/bills');

router.post('/setBill',setBill) // pass
router.put('/markAsRecived',markAsRecived)//pass
router.put('/markAsAuthorized',markAsAuthorized)//pass
router.put('/markAsSendedToSign',markAsSendedToSign)//pass
router.put('/markAsDone',markAsDone);//pass
router.put('/updateBill',updateBill);//pass
router.get('/getBills',getBills);
router.delete('/deleteBill',deleteBill);


module.exports = router;
