const { HttpError } = require('../helpers/handleError');
const tasksModel = require('../models/tasks');
const getModelByName = require('../models/getModelByName');
const res = require('express/lib/response');


const TaskSchema = getModelByName('task_v2');
const AreaSchema = getModelByName('area')

// auo controllers------------*
const setTask = (req, res) => {
    const { creator_id } = req.body
    try {
        AreaSchema.getAreasByOperatorId(creator_id)
            .then((data) => {

                if (data.length == 0) throw new Error('no hay area asigandas a este operador')
                console.log('area info:', data)
                const { _id } = data[0];

                return _id
            }).then((area_id) => {

                TaskSchema.create_task(req.body, area_id)
                    .then((data) => {
                        console.log('task info:', data)
                        res.status(200).send({ data: data, success: true })
                    }).catch((err) => {
                        res.status(200).send({ error: err.message, success: false })
                    })
            }).catch((err) => {
                res.status(200).send({ error: err.message, success: false })
            })
    } catch (err) {
        console.log(err)
        res.status(500).send({ error: err.message, success: false })
    }

    // try {
    //     TaskSchema.create_task(req.body, area_id).then((data) => {
    //         res.status(200).send({ data: data, success: true })
    //     }).catch((err) => {
    //         res.status(200).send({ error: err, success: false })
    //     })
    // } catch (err) {
    //     console.log(err)
    //     res.status(500).send({ error: err, success: false })
    // }
}

const setTask_v2 = (req, res) => {
    const { creator_id, area_id } = req.body
    try {
        TaskSchema.create_task(req.body, area_id)
            .then((data) => {
                console.log('task info:', data)
                res.status(200).send({ data: data, success: true })
            }).catch((err) => {
                res.status(200).send({ error: err.message, success: false })
            })
    } catch (err) {
        console.log(err)
        res.status(500).send({ error: err.message, success: false })
    }

    // try {
    //     TaskSchema.create_task(req.body, area_id).then((data) => {
    //         res.status(200).send({ data: data, success: true })
    //     }).catch((err) => {
    //         res.status(200).send({ error: err, success: false })
    //     })
    // } catch (err) {
    //     console.log(err)
    //     res.status(500).send({ error: err, success: false })
    // }
}

const deleteTask = (req, res) => {
    const { id } = req.params
    try {
        TaskSchema.deleteTask(id)
            .then((data) => {
                console.log('data in deletetask',data)
                res.status(200).send({ data: data, success: true })
            }).catch((err) => {
                console.log('data in deletetask',err)
                res.status(200).send({ error: err.message, success: false })
            })
    } catch (err) {
        res.status(500).send({ error: err, success: false })
    }

}


const getByCreator = (req, res) => {
    const { id } = req.params;
    try {
        AreaSchema.getAreasByOperatorId(id)
            .then((data) => {
                if (data.length == 0) throw new Error('no hay area asigandas a este operador')
                const query = data.map((area)=>{
                    
                    
                    return {area_id:area._id}
                })
                
                return query
            }).then((query) => {
                TaskSchema.getTaskByAreaIdArray(query)
                    .then((data) => {
                        
                        res.status(200).send({ data: data, success: true })
                    }).catch((err) => {
                        res.status(200).send({ error: err.message, success: false })
                    })
            })
            .catch((err) => {
                res.status(200).send({ error: err.message, success: false })
            })
    } catch (err) {
        res.status(500).send({ error: err, success: false })
    }
}



// const getByTechnician = (req, res) => {
//     const {id} = req.params;
//     try{
//         AreaSchema.getAreasByTechnicianId(id)
//         .then((data)=>{
//             if(data.length==0) throw new Error('no hay area asigandas a este tecnico')
//             console.log('area info:',data)
//             const {_id} = data[0];
//             return _id
//         }).then((area_id)=>{
//             console.log(area_id)
//             TaskSchema.getTasksByArea(area_id)
//             .then((data)=>{
//                 res.status(200).send({data:data,success:true})
//             }).catch((err)=>{
//                 console.log('entro aqui', err)
//                 res.status(200).send({ error: err.message, success:false })
//             })
//         })
//         .catch((err)=>{
//             res.status(200).send({ error: err.message, success:false })
//         })
//     }catch(err){
//         res.status(500).send({error:err, success:false })    
//     }
// }


const getByArea = (req, res) => {
    const { id } = req.params;
    try {
        TaskSchema.getTasksByArea(id)
            .then((data) => {
                res.status(200).send({ data: data, success: true })
            }).catch((err) => {
                res.status(200).send({ error: err, success: false })
            })
    } catch (err) {
        res.status(500).send({ error: err, success: false })
    }
}

const getTasks = (req, res) => {
    try {
        TaskSchema.getAll()
            .then((data) => {
                res.status(200).send({ data: data, success: true })
            }).catch((err) => {
                res.status(200).send({ error: err, success: false })
            })
    } catch (err) {
        res.status(500).send({ error: err, success: false })
    }
}

const getCurrentTask = (req, res) => {
    try {
        TaskSchema.getCurrentTask()
            .then((data) => {
                res.status(200).send({ data: data, success: true })
            }).catch((err) => {
                res.status(200).send({ error: err, success: false })
            })
    } catch (err) {
        res.status(500).send({ error: err, success: false })
    }
}

const markAsDone = (req, res) => {
    const { id } = req.params
    try {
        TaskSchema.markAsDone(id)
            .then((data) => {
                console.log('data in markas done', data)
                res.status(200).send({ data: data, success: true })
            }).catch((err) => {
                console.log('data in markas done', err)
                res.status(200).send({ error: err, success: false })
            })
    } catch (err) {
        res.status(500).send({ error: err, success: false })
    }
}


module.exports = { setTask, getByCreator, getByArea, getTasks, getCurrentTask, markAsDone, deleteTask, setTask_v2 };