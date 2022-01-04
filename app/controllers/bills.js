const getModelByName = require('../models/getModelByName');

const setBill = (req,res)=>{
    const BillModel = getModelByName('bill');

    try{
        BillModel.setBill(req.body)
        .then((data)=>{
            res.status(200).send({success:true, data:data})
        }).catch((err)=>{
            res.status(200).send({success:false, error:err.message})
        })
    }catch(err){
        res.status(500).send({success:false, error:err.message})
    }
}


const markAsRecived = (req,res)=>{
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
}






module.exports ={setBill, markAsRecived, markAsAuthorized, markAsSendedToSign, markAsDone, updateBill, deleteBill, getBills}