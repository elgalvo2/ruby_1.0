const express = require('express');
const router = express.Router();
const {get_technician_tasks, terminateTask, updateReport, terminateTask_v01} = require('../controllers/technicians');
const {isAuthenticated} = require('../middleware');

router.get('/',isAuthenticated, get_technician_tasks); // obtiene peticiones activas

router.post('/terminateTask/:folio',isAuthenticated,terminateTask_v01); // crea task

router.put('/updateReport/:folio',isAuthenticated,updateReport);

module.exports = router;





