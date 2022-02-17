const {HttpError} = require('../helpers/handleError');
const tasksModel = require('../models/tasks');
const getModelByName = require('../models/getModelByName');



// auo controllers------------*

const createTask = async (req,res)=>{
    if(!req.body.task) return res.status(200).send({success:false,error:"task not found"});

    const Task = getModelByName('task');

    

    try{
    
        Task.create_task(req.body.task, req.user._id)
            .then((task)=>{
                
                res.status(200).send({success:true,data:{task}});
            }).catch((err)=>res.status(200).send({success:false,error:err.message}));
    }catch(err){
        res.status(500).send({success:false, error:err.message});
    }



};


const get_all_tasks = (req, res)=>{
    const Task = getModelByName('task');

    try{
        Task.getAll()
            .then((tasks)=>{
                res.status(200).send({success:true,data:{tasks}});
            }).catch(err=>res.status(200).send({success:false, error:err.message}));
    }catch(err){
        res.status(500).send({success:false,error:err.message});
    }
};

const get_today_tasks = (req, res)=>{
    const Task = getModelByName('task');

    try{
        Task.getTodayTasks()
            .then((tasks)=>{
                res.status(200).send({success:true,data:{tasks}});
            }).catch(err=>res.status(200).send({success:false, error:err.message}));
    }catch(err){
        res.status(500).send({success:false,error:err.message});
    }
}

const updateTask = (req,res)=>{
    const Task = getModelByName('task');
    try{
        Task.updateTask(req.body.task, req.params.folio)
            .then((updatedTask)=>{
                res.status(200).send({success:true,data:{updatedTask}});
            }).catch(err=>res.status(200).send({success:false,error:err.message}));
    }catch(err){
        res.status(500).send({success:false,error:err.message});
    }
}

const deleteTask = (req,res)=>{
    const Task = getModelByName('task');
    try{
        Task.deleteTask(req.params.folio)
            .then((deletedTask)=>{
                res.status(200).send({success:true,data:{deletedTask}});
            }).catch(err=>res.status(200).send({success:false,error:err.message}));
    }catch(err){
        res.status(500).send({success:false,error:err.message});
    }
}


// ----------------------------*

const get_CurrentTasks = async (req,res)=>{
    const Task = getModelByName('task');

    try{
        Task.getCurrentTask()
            .then((currentTasks)=>{
                res.status(200).send({success:true,data:{currentTasks}});
            }).catch((err)=>res.status(200).send({success:false,message:err.message}));
    }catch(err){
        res.status(500).send({success:false,message:err.message});
    }
};



const get_DoneTasks = async(req,res)=>{
    try{
        const tasks = await tasksModel.find({'Realizado':true});
        res.send({datos:tasks});
    }catch(err){
        httpError(res,err);
    }
};






module.exports = {deleteTask,get_CurrentTasks, get_DoneTasks, createTask, updateTask, get_all_tasks, get_today_tasks};