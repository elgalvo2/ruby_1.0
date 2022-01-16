const getModelByName = require('../models/getModelByName');

const setNeed = (req,res)=>{
    const NeedModel = getModelByName('need');

    try{
        NeedModel.setneed(req.body)
        .then((data)=>{
            res.status(200).send({success:true, data:data})
        }).catch((err)=>{
            res.status(200).send({success:false, error:err.message})
        })
    }catch(err){
        res.status(500).send({success:false, error:err.message})
    }
}

const setProviderAndCost = (req,res)=>{
    const NeedModel = getModelByName('need');
    const needID = req.body._id;


    try{
        NeedModel.setProviderAndCost(req.body,needID)
        .then((data)=>{
            res.status(200).send({success:true, data:data})
        }).catch((err)=>{
            res.status(200).send({success:false, error:err.message})
        })
    }catch(err){
        res.status(500).send({success:false, error:err.message})
    }
}

const SetAuthAndAprovCost = (req,res)=>{
    const NeedModel = getModelByName('need');
    const needID = req.body._id;


    try{
        NeedModel.SetAuthAndAprovCost(req.body,needID)
        .then((data)=>{
            res.status(200).send({success:true, data:data})
        }).catch((err)=>{
            res.status(200).send({success:false, error:err.message})
        })
    }catch(err){
        res.status(500).send({success:false, error:err.message})
    }
}

const setSFDate = (req,res)=>{
    const NeedModel = getModelByName('need');
    const needID = req.body._id;


    try{
        NeedModel.setSFDate(req.body,needID)
        .then((data)=>{
            res.status(200).send({success:true, data:data})
        }).catch((err)=>{
            res.status(200).send({success:false, error:err.message})
        })
    }catch(err){
        res.status(500).send({success:false, error:err.message})
    }
}

const setRecived = (req,res)=>{
    const NeedModel = getModelByName('need');
    const needID = req.body._id;


    try{
        NeedModel.setRecived(req.body,needID)
        .then((data)=>{
            res.status(200).send({success:true, data:data})
        }).catch((err)=>{
            res.status(200).send({success:false, error:err.message})
        })
    }catch(err){
        res.status(500).send({success:false, error:err.message})
    }
}


const setBill = (req,res)=>{
    const NeedModel = getModelByName('need');
    const needID = req.body._id;


    try{
        NeedModel.setBill(req.body,needID)
        .then((data)=>{
            res.status(200).send({success:true, data:data})
        }).catch((err)=>{
            res.status(200).send({success:false, error:err.message})
        })
    }catch(err){
        res.status(500).send({success:false, error:err.message})
    }
}

const setSendedToSign = (req,res)=>{
    const NeedModel = getModelByName('need');
    const needID = req.body._id;


    try{
        NeedModel.setSendedToSign(req.body,needID)
        .then((data)=>{
            res.status(200).send({success:true, data:data})
        }).catch((err)=>{
            res.status(200).send({success:false, error:err.message})
        })
    }catch(err){
        res.status(500).send({success:false, error:err.message})
    }
}


const markAsSigned = (req,res)=>{
    const NeedModel = getModelByName('need');
    const needID = req.body._id;

    


    try{
        NeedModel.markAsSigned(req.body,needID)
        .then((data)=>{
            res.status(200).send({success:true, data:data})
        }).catch((err)=>{
            res.status(200).send({success:false, error:err.message})
        })
    }catch(err){
        res.status(500).send({success:false, error:err.message})
    }
}


const setSendedToPayAndDate = (req,res)=>{
    const NeedModel = getModelByName('need');
    const needID = req.body._id;


    try{
        NeedModel.setSendedToPayAndDate(req.body,needID)
        .then((data)=>{
            res.status(200).send({success:true, data:data})
        }).catch((err)=>{
            res.status(200).send({success:false, error:err.message})
        })
    }catch(err){
        res.status(500).send({success:false, error:err.message})
    }
}

const getneeds = (req,res)=>{
    const NeedModel = getModelByName('need');


    try{
        NeedModel.getneeds()
        .then((data)=>{
            res.status(200).send({success:true, data:data})
        }).catch((err)=>{
            res.status(200).send({success:false, error:err.message})
        })
    }catch(err){
        res.status(500).send({success:false, error:err.message})
    }
}

const deleteneed = (req,res)=>{
    const NeedModel = getModelByName('need');
    const needID = req.body._id;


    try{
        NeedModel.deleteneed(needID)
        .then((data)=>{
            res.status(200).send({success:true, data:data})
        }).catch((err)=>{
            res.status(200).send({success:false, error:err.message})
        })
    }catch(err){
        res.status(500).send({success:false, error:err.message})
    }
}


const getNeedByID = (req,res)=>{
    const NeedModel = getModelByName('need');
    console.log('id',req.params.id)
    const needID = req.params.id;


    try{
        NeedModel.getNeedByID(needID)
        .then((data)=>{
            res.status(200).send({success:true, data:data})
        }).catch((err)=>{
            res.status(200).send({success:false, error:err.message})
        })
    }catch(err){
        res.status(500).send({success:false, error:err.message})
    }
}


const updateneed = (req,res)=>{
    const NeedModel = getModelByName('need');
    const needID = req.body._id

    try{
        NeedModel.updateneed(req.body,needID)
        .then((data)=>{
            res.status(200).send({success:true, data:data})
        }).catch((err)=>{
            res.status(200).send({success:false, error:err.message})
        })
    }catch(err){
        res.status(500).send({success:false, error:err.message})
    }
}

const updateNotes = (req,res)=>{
    const NeedModel = getModelByName('need');
    const needID = req.body._id

    try{
        NeedModel.updateNotes(req.body,needID)
        .then((data)=>{
            res.status(200).send({success:true, data:data})
        }).catch((err)=>{
            res.status(200).send({success:false, error:err.message})
        })
    }catch(err){
        res.status(500).send({success:false, error:err.message})
    }
}












/*const markAsRecived = (req,res)=>{
    const BillModel = getModelByName('bill');

    
    try{
        BillModel.markAsRecived(req.body.bill_no,req.body.provider_no)
        .then((data)=>{
            res.status(200).send({success:true, data:data})
        }).catch((err)=>{
            res.status(200).send({success:false, error:err.message})
        })
    }catch(err){
        res.status(500).send({success:false, error:err.message})
    }
}

const markAsAuthorized = (req,res)=>{
    const BillModel = getModelByName('bill');

    try{
        BillModel.markAsAuthorized(req.body.bill_no,req.body.provider_no, req.body.auth_no)
        .then((data)=>{
            res.status(200).send({success:true, data:data})
        }).catch((err)=>{
            res.status(200).send({success:false, error:err.message})
        })
    }catch(err){
        res.status(500).send({success:false, error:err.message})
    }
}

const markAsSendedToSign = (req,res)=>{
    const BillModel = getModelByName('bill');

    try{
        BillModel.markAsSendedToSign(req.body.bill_no,req.body.provider_no)
        .then((data)=>{
            res.status(200).send({success:true, data:data})
        }).catch((err)=>{
            res.status(200).send({success:false, error:err.message})
        })
    }catch(err){
        res.status(500).send({success:false, error:err.message})
    }
}

const markAsDone = (req,res)=>{
    const BillModel = getModelByName('bill');

    try{
        BillModel.markAsDone(req.body.bill_no,req.body.provider_no)
        .then((data)=>{
            res.status(200).send({success:true, data:data})
        }).catch((err)=>{
            res.status(200).send({success:false, error:err.message})
        })
    }catch(err){
        res.status(500).send({success:false, error:err.message})
    }
}

const updateBill = (req,res)=>{
    const BillModel = getModelByName('bill');

    try{
        BillModel.updateBill(req.body.bill_no,req.body.provider_no, req.body.billInfo)
        .then((data)=>{
            res.status(200).send({success:true, data:data})
        }).catch((err)=>{
            res.status(200).send({success:false, error:err.message})
        })
    }catch(err){
        res.status(500).send({success:false, error:err.message})
    }
}

const deleteBill = (req,res)=>{
    const BillModel = getModelByName('bill');

    try{
        BillModel.deleteBill(req.body.bill_no,req.body.provider_no)
        .then((data)=>{
            res.status(200).send({success:true, data:data})
        }).catch((err)=>{
            res.status(200).send({success:false, error:err.message})
        })
    }catch(err){
        res.status(500).send({success:false, error:err.message})
    }
}


const getBills = (req,res)=>{
    const BillModel = getModelByName('bill');

    try{
        BillModel.getBills()
        .then((data)=>{
            res.status(200).send({success:true, data:data})
        }).catch((err)=>{
            res.status(200).send({success:false, error:err.message})
        })
    }catch(err){
        res.status(500).send({success:false, error:err.message})
    }
}*/

module.exports ={
    setNeed,
    setProviderAndCost,
    SetAuthAndAprovCost,
    setSFDate,
    setRecived,
    setBill,
    setSendedToSign,
    markAsSigned,
    setSendedToPayAndDate,
    getneeds,
    deleteneed,
    getNeedByID,
    updateneed,
    updateNotes
}