const express = require("express");
const router = express.Router();
const {create_orden_compra} = require("../controllers/pdf_generator.js")

router.post('/orden_compra',create_orden_compra)


module.exports = router;