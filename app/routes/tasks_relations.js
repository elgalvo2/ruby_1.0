const express = require('express')
const router = express.Router()
const { createTaskRelationByArea, createTaskRelationByTechnician } = require('../controllers/tasks_relations')

router.get('/createTaskRelationByArea/:area_id', createTaskRelationByArea);
router.get('/createTaskRelationByTechnician/:technician_id', createTaskRelationByTechnician);

module.exports = router
