const express = require('express');
const router = express.Router();
const {
    setNeed,
    setProviderAndCost,
    SetAuthAndAprovCost,
    setSFDate,
    setRecived,
    setBill,
    setSendedToSign,
    markAsSigned,
    setSendedToPayAndDate,
    getneeds,
    deleteneed,
    getNeedByID,
    updateneed,
    updateNotes} = require('../controllers/needs');

    router.post('/setNeed',setNeed); // pass ?? 
    router.put('/setProvider',setProviderAndCost);//pass ///??
    router.put('/setAuth',SetAuthAndAprovCost); //pass ??
    router.put('/setDates',setSFDate);//pass ??
    router.put('/setRecived',setRecived);//pass //
    router.put('/setBill',setBill);//pass ??
    router.put('/setSendToSign',setSendedToSign);//pass ??
    router.put('/signed',markAsSigned);//pass ??
    router.put('/setSendToPay',setSendedToPayAndDate);//pass ??
    router.get('/getNeeds',getneeds);//pass ??
    router.delete('/deleteNeed',deleteneed); //pass ??
    router.get('/:id',getNeedByID);//pass ??
    router.put('/updateNeed',updateneed);//pass
    router.put('/updateNotes',updateNotes)

module.exports = router;
