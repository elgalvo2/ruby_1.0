const tasksModel = require('../models/tasks');
const getModelByName = require('../models/getModelByName');



// auo controllers------------*

const get_technician_tasks = (req,res)=>{

    const Task = getModelByName('task');


    
    try{
        Task.getUsersTasks(req.user)
        .then((tasks)=>{
            console.log('entra aqio')
            res.status(200).send({success:true,data:tasks})
            })
        .catch((err)=>{
            res.status(200).send({success:false, error:err.message})
        })
      }catch(err){
        res.status(500).send({success:false, error:err.message});
    }


};


const updateReport = (req, res)=>{
    const Report = getModelByName('report');

};


const terminateTask_v01 = async(req,res)=>{
    const Task = getModelByName('task');

    try{
        Task.markDone(req.params.folio).then((task)=>{
            res.status(200).send({success:true,data:task})
        }).catch(err=>res.status(200).send({success:false,error:err.message}))             
            
    }catch(err){
        res.status(500).send({success:false,error:err.message});
    }
};

const terminateTask = async(req,res)=>{
    const Report = getModelByName('report');

    try{
        Report.terminate_task(req.params.folio,req.body.report, req.user._id)
            .then((report)=>{
                const Task = getModelByName('task');
                Task.markDone(report.folio).then((task)=>{
                    res.status(200).send({success:true,data:task})
                }).catch(err=>res.status(200).send({success:false,error:err.message}))             
            }).catch(err=>res.status(200).send({success:false, error:err.message}));
    }catch(err){
        res.status(500).send({success:false,error:err.message});
    }
};






module.exports = {get_technician_tasks, terminateTask, updateReport, terminateTask_v01};