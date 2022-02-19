const { HttpError } = require('../helpers/handleError');
const tasksModel = require('../models/tasks');
const getModelByName = require('../models/getModelByName');
const res = require('express/lib/response');


const TaskSchema = getModelByName('task_v2');

// auo controllers------------*
const setTask = (req, res) => {
    const { description, creator_id, area_id } = req.body
    try {
        TaskSchema.create_task(req.body, creator_id, area_id).then((data) => {
            res.status(200).send({ data: data, success: true })
        }).catch((err) => {
            res.status(200).send({ error: err, success: false })
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({ error: err, success: false })
    }
}


const getByCreator = (req, res) => {
    const {id} = req.params;
    try{
        TaskSchema.getTasksByCreator(id)
        .then((data)=>{
            res.status(200).send({ data: data, success:true })
        }).catch((err)=>{
            res.status(200).send({ error: err, success:false })
        })
    }catch(err){
        res.status(500).send({error:err, success:false })    
    }
}


const getByArea = (req,res)=>{
    const {id} = req.params;
    try{
        TaskSchema.getTasksByArea(id)
        .then((data)=>{
            res.status(200).send({ data: data, success:true })
        }).catch((err)=>{
            res.status(200).send({ error: err, success:false })
        })
    }catch(err){
        res.status(500).send({error:err, success:false })    
    } 
}

const getTasks = (req,res)=>{
    try{
        TaskSchema.getAll()
        .then((data)=>{
            res.status(200).send({ data: data, success:true })
        }).catch((err)=>{
            res.status(200).send({ error: err, success:false })
        })
    }catch(err){
        res.status(500).send({error:err, success:false })    
    } 
}

const getCurrentTask = (req,res)=>{
    try{
        TaskSchema.getCurrentTask()
        .then((data)=>{
            res.status(200).send({ data: data, success:true })
        }).catch((err)=>{
            res.status(200).send({ error: err, success:false })
        })
    }catch(err){
        res.status(500).send({error:err, success:false })    
    } 
}


module.exports = { setTask, getByCreator ,getByArea, getTasks, getCurrentTask};