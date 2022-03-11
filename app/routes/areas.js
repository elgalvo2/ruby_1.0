const express = require('express');
const router = express.Router();
const { setArea, getAreaById, updateArea, deleteArea, getAreasByOperatorId, getAreasByTechnicianId, getAreas, getAreaByName } = require('../controllers/areas.js');


router.post('/setArea', setArea);// ruta probada
router.get('/getArea/:id', getAreaById); // ruta probada
router.get('/getAreaByName/:name', getAreaByName) // ruta probada
router.put('/updateArea', updateArea); // ruta probada
router.delete('/deleteArea/:id', deleteArea); // ruta probada
router.get('/operatorAreas/:id', getAreasByOperatorId); // ruta probada
router.get('/technicianAreas/:id', getAreasByTechnicianId); // ruta probada
router.get('/all', getAreas); // ruta probada

module.exports = router;

