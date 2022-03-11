const fs = require('fs');
const getModelByName = require("../models/getModelByName")

const taskSchema = getModelByName('task_v2')
const areaSchema = getModelByName('area')
const technicianSchema = getModelByName('user_conservacion')
const { CreateRelationPdf } = require('../services/tasksRelations_index')


const createTaskRelationByArea = async (req, res) => {
    const { area_id } = req.params
    try {
        var relation_data = {}
        const { name, technician_id } = await areaSchema.getAreaById(area_id);
        const { firstName, lastName, matricula } = await technicianSchema.findUserById(technician_id)
        relation_data.technician_name = lastName + ' ' + firstName
        relation_data.area_name = name
        const tasks = await taskSchema.getCurrentTaskByAreaId(area_id)
        relation_data.tasks = await tasks
        await CreateRelationPdf(relation_data)
        // res.status(200).send({ data: data, success: true })
        res.setHeader('Content-type', 'application/pdf; charset=utf-8');
        res.setHeader('Content-disposition', 'attachment; filename=orden_compra.js');
        const stats = fs.statSync(__dirname + '/task_relation.pdf');
        res.setHeader('Content-length', stats.size)
        res.download(__dirname + '/task_relation.pdf');
    }
    catch (err) {
        
        res.status(500).send({ error: err.message, success: false })
    }
    // try {
    //     const { area_id } = req.params
    //     areaSchema.getAreaById(area_id)
    //     .then((data)=>{
    //         const {name, technician_id} = data
    //         relation_data.area_name = name
    //         return technician_id
    //     })
    //     .then((technician_id)=>{

    //         technicianSchema.findUserById(technician_id)
    //         .then((technician)=>{
    //             const {firstName, lastName, matricula} = technician
    //             const technician_data = lastName+' '+firstName
    //             relation_data.technician_name = technician_data;
    //             return {}
    //         })
    //     })
    //     .then(()=>{
    //         taskSchema.getCurrentTaskByAreaId(area_id)
    //         .then((data)=>{
    //             relation_data.tasks = data
    //             return {}
    //         })
    //         .then(()=>{
    //             console.log('relation data to send to pdf',relation_data)
    //             res.status(200).send({data:relation_data, success:true})
    //         })
    //     })
    //     .catch((err)=>{
    //         res.status(200).send({error:err.message, success:false})
    //     })

    // }catch(err){
    //     console.log(err)
    // }
}

const createTaskRelationByTechnician = async (req, res) => {
    
    
    
    var relation_data ={}
    try{

        const { firstName, lastName } = await technicianSchema.findUserById(req.params)
        const areas = await areaSchema.getAreasByTechnicianId(req.params._id);
        relation_data.technician_name = lastName + ' ' + firstName
        relation_data.area_name = ''
        var areas_id = areas.map((area)=>{
            
            return {area_id:area._id};
        })
        
        const tasks = await taskSchema.getTaskByAreaIdArray(areas_id)
        
        relation_data.tasks = await tasks
        
        await CreateRelationPdf(relation_data)
        // res.status(200).send({ data: data, success: true })
        res.setHeader('Content-type', 'application/pdf; charset=utf-8');
        res.setHeader('Content-disposition', 'attachment; filename=orden_compra.js');
        const stats = fs.statSync(__dirname + '/task_relation.pdf');
        res.setHeader('Content-length', stats.size)
        
        res.download(__dirname + '/task_relation.pdf');

    }catch(err){
        res.status(500).send({ error: err.message, success: false })
    }
}


module.exports = { createTaskRelationByArea, createTaskRelationByTechnician }