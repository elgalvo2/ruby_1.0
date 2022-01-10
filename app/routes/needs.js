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
    updateneed} = require('../controllers/needs');

    router.post('/setNeed',setNeed); // pass
    router.put('/setProvider',setProviderAndCost);//pass
    router.put('/setAuth',SetAuthAndAprovCost);
    router.put('/setDates',setSFDate);
    router.put('/setRecived',setRecived);
    router.put('/setBill',setBill);
    router.put('/setSendToSign',setSendedToSign);
    router.put('/signed',markAsSigned);
    router.put('/setSendToPay',setSendedToPayAndDate);
    router.get('/getNeeds',getneeds);//pass
    router.delete('/deleteNeed',deleteneed); //pass
    router.get('/:id',getNeedByID);
    router.put('/updateNeed',updateneed);

module.exports = router;
