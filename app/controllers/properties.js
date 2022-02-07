const getModelByName = require('../models/getModelByName');

const setProperty = (req,res)=>{

    
    const PropertyModel = getModelByName('property');

    try{
        PropertyModel.setProperty(req.body)
        .then((data)=>{
            console.log(data)
            res.status(200).send({success:true,data:data});
        }).catch(err=>{
            console.log(err)
            res.status(200).send({success:false,error:err.message})
        })
    }catch(err){

        console.log(err)
        res.status(500).send({success:false, error:err.message})
    
    }
}   

const updateProperty = (req,res)=>{
    const PropertyModel = getModelByName('property')
    const id = req.body._id

    try{
        console.log(req.body)
        PropertyModel.updateProperty(req.body,id)
        .then((data)=>{
            
            res.status(200).send({success:true,data:data});
        }).catch(err=>{
            console.log(err)
            res.status(200).send({success:false,error:err.message})
        })
    }catch(err){

        console.log(err)
        res.status(500).send({success:false, error:err.message})
    
    }
}

const getPropertyById = (req,res)=>{
    const PropertyModel = getModelByName('property')

    try{
        PropertyModel.getPropertyById(req.params.id)
        .then((data)=>{
            console.log(data)
            res.status(200).send({success:true,data:data});
        }).catch(err=>{
            console.log(err)
            res.status(200).send({success:false,error:err.message})
        })
    }catch(err){

        console.log(err)
        res.status(500).send({success:false, error:err.message})
    
    } 
}

const getProperties = (req,res)=>{
    const PropertyModel = getModelByName('property')

    try{
        PropertyModel.getProperties()
        .then((data)=>{
            console.log(data)
            res.status(200).send({success:true,data:data});
        }).catch(err=>{
            console.log(err)
            res.status(200).send({success:false,error:err.message})
        })
    }catch(err){

        console.log(err)
        res.status(500).send({success:false, error:err.message})
    
    } 
}

const deleteProperty = (req,res)=>{
    const PropertyModel = getModelByName('property')

    try{
        PropertyModel.deleteProperty(req.body)
        .then((data)=>{
            console.log(data)
            res.status(200).send({success:true,data:data});
        }).catch(err=>{
            console.log(err)
            res.status(200).send({success:false,error:err.message})
        })
    }catch(err){

        console.log(err)
        res.status(500).send({success:false, error:err.message})
    
    } 
}


module.exports = {setProperty,deleteProperty,getProperties, getPropertyById,updateProperty  };