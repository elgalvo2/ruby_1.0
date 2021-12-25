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

    const provider_no = req.body.provider_no;
    const providerInfo = req.body.providerInfo;

    try{
        ProviderModel.updateProvider(provider_no,providerInfo)
        .then((data)=>{
            res.status(200).send({success:true, data:data})
        }).catch((err)=>{
            res.status(200).send({success:false,error:err.message})
        })
    }catch(err){
        res.status(500).send({success:false, error:err.message})
    }
}




module.exports = {getTechnicians, createProgram, setProperty, register_provider, getProviders, getProviderByNumber,  updateProvider};