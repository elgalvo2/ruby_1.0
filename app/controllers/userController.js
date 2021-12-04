
const usuario_model = require('../models/user');


const sigup = async (req,res) =>{
    if(!res.body.user){
        return res.status(200).send({
            sucess: false, 
            error:'user not fund'
        })
    }

    try{
        const {email, password, firstName, lastName} = req.body;
        const signedUp = await usuario_model.create({
            email, password, firstName, lastName
        });
        res.status(200).send({sucess:true, message:'user created succesfully', data:signedUp});
    }catch(err){
        res.status(500).send({sucess:false, error:err.message})
    }
    
}