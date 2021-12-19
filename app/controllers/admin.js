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


const getTechnicians = (req,res)=>{
    const UserModel = getModelByName('user_conservacion');

    try{
        UserModel.getTechnicians()
        .then((data)=>{
            console.log(data);
            res.status(200).send({success:true,data:data});
        }).catch((err)=>{
            res.status(200).send({success:false,error:err.message});
        })
    }catch(err){
        res.status(500).send({success:false, error:err.message});
    }
}

const createProgram = (req,res)=>{
    var UserModel = getModelByName('program');

    

    try{
        UserModel.create_programV02(req.body,req.user._id)
        .then((data)=>{
            console.log(data);
            res.status(200).send({success:true,data:data})
        }).catch((err)=>{
            res.status(500).send({success:false, error:err.message})
        })
    }catch(err){
        res.status(500).send({success:false, error:err.message});
    }
}

const register_provider = (req, res)=>{
    const ProviderModel = getModelByName('provider');

    try{
        ProviderModel.setProvider(req.body)
        .then((data)=>{
            res.status(200).send({success:true, data:data});
        }).catch((err)=>{
            res.status(200).send({success:false, error:err.message});
        })
    }catch(err){
        res.status(500).send({success:false, error:err})
    }
}


module.exports = {getTechnicians, createProgram, setProperty, register_provider};