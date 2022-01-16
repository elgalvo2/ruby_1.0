const getModelByName = require('../models/getModelByName');


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
        res.status(500).send({success:false, error:err.message})
    }
}

const getProviders = (req,res)=>{
    const ProviderModel = getModelByName('provider');

    try{
        ProviderModel.getProviders()
        .then((data)=>{
            res.status(200).send({success:true,data:data})
        }).catch((err)=>{
            res.satatus(200).send({success:false,err:err.message})
        })

    }catch(err){
        res.status(500).send({success:false, err: err.message});
    }

}

const getProviderByNumber = (req,res)=>{
    const ProviderModel = getModelByName('provider');

    try{
        ProviderModel.getProviderByNumber(req.body)
        .then((data)=>{
            res.status(200).send({success:true, data:data});
        }).catch((err)=>{
            res.status(200).send({success:false, error: err.message})
        })
    }catch(err){
        res.status(500).send({success:false, error:err.message});
    }
}

const updateProvider = (req, res)=>{
    const ProviderModel = getModelByName('provider');

    const providerId = req.body._id;

    try{
        ProviderModel.updateProvider(req.body,providerId)
        .then((data)=>{
            res.status(200).send({success:true, data:data})
        }).catch((err)=>{
            res.status(200).send({success:false,error:err.message})
        })
    }catch(err){
        res.status(500).send({success:false, error:err.message})
    }
}




module.exports = {register_provider, getProviders, getProviderByNumber,  updateProvider};