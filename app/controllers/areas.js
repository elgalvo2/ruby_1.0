const getModelByName = require('../models/getModelByName');

const AreaSchema = getModelByName('area')

const setArea = (req, res) => {
    
    try {
        AreaSchema.setArea(req.body)
            .then((data) => {
                res.status(200).send({ data: data, success: true })
            }).catch((err) => {
                res.status(200).send({error : err.message, success: false })
            })
    } catch (err) {
        res.status(500).send({error : err.message, success: false })
    }
}

const getAreaById = (req, res) => {
    const { id } = req.params
    try {
        AreaSchema.getAreaById(id)
            .then((data) => {
                res.status(200).send({ data: data, success: true })
            }).catch((err) => {
                res.status(200).send({error : err.message, success: false })
            })
    } catch (err) {
        res.status(500).send({error : err.message, success: false })
    }
}

const updateArea = (req, res) => {
    try {
        AreaSchema.updateArea(req.body)
            .then((data) => {
                res.status(200).send({ data: data, success: true })
            }).catch((err) => {
                res.status(200).send({error : err.message, success: false })
            })
    } catch (err) {
        res.status(500).send({error : err.message, success: false })
    }
}

const deleteArea = (req, res) => {
    const { id } = req.params
    try {
        AreaSchema.deleteArea(id)
            .then((data) => { // data contiene objeto con propiedad deleteCount
                res.status(200).send({ data: data, success: true })
            }).catch((err) => {
                res.status(200).send({error : err.message, success: false })
            })
    } catch (err) {
        res.status(500).send({error : err.message, success: false })
    }
}

const getAreasByOperatorId = (req, res) => {
    const { id } = req.params
    try {
        AreaSchema.getAreasByOperatorId(id)
            .then((data) => {
                res.status(200).send({ data: data, success: true })
            }).catch((err) => {
                res.status(200).send({error : err.message, success: false })
            })
    } catch (err) {
        res.status(500).send({error : err.message, success: false })
    }
}

const getAreaByName = (req,res)=>{
    const {name} = req.params
    try{
        AreaSchema.getAreaByName(name)
        .then((data)=>{
            res.status(200).send({data:data, success:true})
        }).catch((err)=>{
            res.status(200).send({error:err.mesasge, success:false})
        })
    }catch(err){
        res.status(500).send({error:err.mesasge, success:false})
    }
}

const getAreasByTechnicianId = (req, res) => {
    const { id } = req.params
    try {
        AreaSchema.getAreasByTechnicianId(id)
            .then((data) => {
                res.status(200).send({ data: data, success: true })
            }).catch((err) => {
                res.status(200).send({error : err.message, success: false })
            })
    } catch (err) {
        res.status(500).send({error : err.message, success: false })
    }
}


const getAreas = (req, res) => {
    try {
        AreaSchema.getAreas()
            .then((data) => {
                res.status(200).send({ data: data, success: true })
            }).catch((err) => {
                res.status(200).send({error : err.message, success: false })
            })
    } catch (err) {
        res.status(500).send({error : err.message, success: false })
    }
}





module.exports = { setArea, getAreaById, updateArea, deleteArea, getAreasByOperatorId, getAreasByTechnicianId, getAreas, getAreaByName };