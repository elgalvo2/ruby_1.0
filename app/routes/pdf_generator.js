const express = require("express");
const router = express.Router();
const {create_orden_compra, get_pdf} = require("../controllers/pdf_generator.js")

router.post('/orden_compra',create_orden_compra)
router.get('/',get_pdf);


module.exports = router;