const express = require('express');
const router = express.Router();
const { setTask, getByCreator, getByArea, getTasks, getCurrentTask, getByTechnician, markAsDone,deleteTask,setTask_v2 } = require('../controllers/tasks_v2');
const { isAuthenticated } = require('../middleware');


router.post('/create', setTask_v2) // ruta probada
router.get('/getByCreator/:id', getByCreator) // ruta probada
router.get('/getByArea/:id', getByArea) // ruta probada
router.get('/', getTasks) // ruta probada
router.get('/current', getCurrentTask) // ruta probada
router.put('/markAsDone/:id',markAsDone)
router.delete('/:id',deleteTask)
// router.get('/getByTechnician/:id', getByTechnician)




//--------------------------------**
module.exports = router