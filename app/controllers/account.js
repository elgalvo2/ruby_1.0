const getModelByName = require('../models/getModelByName');


const signup = (req,res)=>{
    if(!req.body.user){
        return res.status(200).send({
            success: false, 
            error:'user not fund'
        })
    }

    const UserModel = getModelByName('user_conservacion');

    try{
        UserModel.signup(req.body.user)
        .then(()=>{
            res.status(200).send({success:true, message:'usuario creado correctamente'})
        })
        .catch(error=>res.status(200).send({success:false , message: error.message}))
        /*
        const {email, password, firstName, lastName} = req.body;
        const signedUp = await UserModel.create({
            email, password, firstName, lastName
        });
        res.status(200).send({success:true, message:'user created succesfully', data:signedUp});
        */
    }catch(err){
        res.status(500).send({success:false, error:err.message});
    }
};

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

/*const confirmEmail = (req,res)=>{
    const User = getModelByName('user_conservacion');

    try{
        User.confirmAccount(req.params.token)
        .then(()=>{
            res.status(200).send({success:true, message:"User confirmated succesfully"});   
        }).catch(err=>res.status(200).send({success:false, message: err.message}));
    }catch(err){
        res.status(500).send({success:false, error:err.message});
    }
};*/

const login =  (req,res)=>{
    if(!req.body.matricula) return res.status(200).send({success:false,error:"Matricula not provided"});
    if(!req.body.password) return res.status(200).send({success:false, error:"Password not provided"});

    const User = getModelByName('user_conservacion');

    try{
        User.login(req.body.matricula, req.body.password)
            .then(data=>{
                res.status(200).send({success:true, data});
            }).catch(err=>res.status(200).send({success:false,error:err.message}));
    }catch(err){
        res.status(200).send({success:false,error:err.message});
    }
}

const current_user = (req,res)=>{
    if(!req.body.email) return res.status(200).send({success:false, data:{user:null}});

    const User = getModelByName('user_conservacion');

    return User.findUserById(req.user._id)
        .then(user=>{
            res.status(200).send({success:true,data:{user}});
        }).catch(err=>res.status(200).send({success:false,error:err.message}));
};


module.exports = {signup, login, current_user,getTechnicians};