const express = require("express");
const router = express.Router();
const {create_order, get_purchase_order, get_service_order} = require("../controllers/pdf_generator.js")

router.post('/orden_compra',create_order)
router.get('/purchase_order',get_purchase_order);
router.get('/service_order',get_service_order);




module.exports = router;
