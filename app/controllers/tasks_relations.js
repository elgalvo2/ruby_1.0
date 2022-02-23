const getModelByName = require("../models/getModelByName")

const taskSchema = getModelByName('task_v2')
const areaSchema = getModelByName('area')
const technicianSchema = getModelByName('user_conservacion')
const { CreateRelationPdf } = require('../services/tasksRelations_index')


const createTaskRelationByArea = async (req, res) => {
    const { area_id } = req.params
    try {
        const relation_data = {}
        const { name, technician_id } = await areaSchema.getAreaById(area_id);
        const { firstName, lastName, matricula } = await technicianSchema.findUserById(technician_id)
        relation_data.technician_name = lastName + ' ' + firstName
        relation_data.area_name = name
        const tasks = await taskSchema.getCurrentTaskByAreaId(area_id)
        relation_data.tasks = await tasks
        const data = await CreateRelationPdf(relation_data)
        res.status(200).send({ data: data, success: true })
    }
    catch (err) {
        console.log(err)
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

const createTaskRelationByTechnician = (req, res) => {
    console.log('hola crayola')
}


module.exports = { createTaskRelationByArea, createTaskRelationByTechnician }