const express = require('express');
const router = express.Router();
const {get_CurrentTasks, get_all_tasks, get_DoneTasks, createTask, updateTask, deleteTask, get_today_tasks} = require('../controllers/tasks');
const {isAuthenticated} = require('../middleware');


// Auo routes:

router.post('/',isAuthenticated,createTask); // crea task

router.get('/all',isAuthenticated, get_all_tasks); // obtiene peticiones activas

router.get('/today',isAuthenticated, get_today_tasks); // obtiene los task creados el dia corriente

router.put('/:folio',isAuthenticated, updateTask);  // modifica un task en 

router.delete('/:folio',isAuthenticated, deleteTask);

//--------------------------------**











router.get('/',get_CurrentTasks);



router.get('/done',get_DoneTasks); // obtiene peticiones realizadas



router.put('/:folio',updateTask); // solo accede el auo



module.exports = router;