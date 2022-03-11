const { attachment } = require('express/lib/response');
const { Query } = require('mongoose');
const { connectToBrowser } = require('puppeteer');
const getModelByName = require('../models/getModelByName');
const UserModel = getModelByName('user_conservacion');
const AreaSchema = getModelByName('area')
const NeedModel = getModelByName('need');
const PropertyModel = getModelByName('property');
const ProviderModel = getModelByName('provider');
const TaskSchema = getModelByName('task_v2');


const getAccounts = (req, res) => {
    try {
        UserModel.getAccounts()
            .then((data) => {
                res.status(200).send({ data: data, success: true })
            }).catch((err) => {
                res.status(200).send({ error: err.message, success: false })
            })
    } catch (err) {
        res.status(500).send({ error: err.message, success: false })
    }
}


const signup = (req, res) => {
    if (!req.body.user) {
        return res.status(200).send({
            success: false,
            error: 'user not fund'
        })
    }


    try {
        UserModel.signup(req.body.user)
            .then((data) => {
                res.status(200).send({ success: true, data: data})
            })
            .catch(error => res.status(200).send({ success: false, error: error.message }))
        /*
        const {email, password, firstName, lastName} = req.body;
        const signedUp = await UserModel.create({
            email, password, firstName, lastName
        });
        res.status(200).send({success:true, message:'user created succesfully', data:signedUp});
        */
    } catch (err) {
        res.status(500).send({ success: false, error: err.message });
    }
};

const getTechnicians = (req, res) => {

    try {
        UserModel.getTechnicians()
            .then((data) => {
                res.status(200).send({ success: true, data: data });
            }).catch((err) => {
                res.status(200).send({ success: false, error: err.message });
            })
    } catch (err) {
        res.status(500).send({ success: false, error: err.message });
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

const login = async (req, res) => {
    if (!req.body.matricula) return res.status(200).send({ success: false, error: "Matricula not provided" });
    if (!req.body.password) return res.status(200).send({ success: false, error: "Password not provided" });

    let context = {}
    let role 


    // try {
    //     UserModel.login(req.body.matricula, req.body.password)
    //         .then(data => {
    //             res.status(200).send({ success: true, data, context });
    //         }).catch(err => res.status(200).send({ success: false, error: err.message }));
    // } catch (err) {
    //     res.status(200).send({ success: false, error: err.message });
    // }

    try{
        const data = await UserModel.login(req.body.matricula, req.body.password);
        if(data.user_.role == 'ADMIN' || data.user_.role == 'SUDO' || data.user_._id){
            const operators = await UserModel.getOperators()
            const technicians = await UserModel.getTechnicians()
            const areas = await AreaSchema.getAreas()
            const needs = await NeedModel.getneeds()
            const properties = await PropertyModel.getProperties()
            const providers = await ProviderModel.getProviders()
            const tasks = await TaskSchema.getAll()

            context={
                operators,
                technicians,
                areas,
                needs,
                properties,
                providers,
                tasks
            }

            
        }
        if(data.user_.role == 'TECNICO'){
            const areas = await AreaSchema.getAreasByTechnicianId(data.user_._id)
            let query ={}
            query.areas = areas.map((area)=>{
                return  {_id:area._id}
            })
            query.operators = areas.map((area)=>{
                return  {_id:area.operator_id}
            })
            console.log('areas array in account controller', query.areas)
            const tasks = await TaskSchema.getTaskByAreaIdArray(query.areas)
            const operators = await UserModel.findUsersByIdArray(query.operators)

            context ={
                areas,
                operators,
                tasks
            }
        }
        if(data.user_.role=='OPERADOR'){
            const areas = await AreaSchema.getAreasByOperatorId(data.user_._id)
            let query ={}
            var technicians = []
            var task = []
            query.areas = areas.map((area)=>{
                return  {area_id:area._id}
            })
            query.technician = areas.map((area)=>{
                return  {_id:area.technician_id}
            })
            

            if(query.areas.length==0 || query.areas === undefined){
                tasks = []
            }else{
                tasks = await TaskSchema.getTaskByAreaIdArray(query.areas)    
            }

            if(query.technician.length==0 ||query.technician=== undefined){
                technicians = []
            }else{
                technicians = await UserModel.findUsersByIdArray(query.areas)    
            }

            // const tasks = await TaskSchema.getTaskByAreaIdArray(query.areas) -----> es necesario resolver pporblemas de compatibilidad con arrays new objetd id para consulta or
            

            context ={
                areas,
                technicians,
                tasks
            }
            console.log(context)
        }



        res.status(200).send({success:true, data, context})
    }catch(err){
        res.status(200).send({ success: false, error: err.message });
    }


}




const current_user = (req, res) => {
    if (!req.body.email) return res.status(200).send({ success: false, data: { user: null } });

    return UserModel.findUserById(req.user._id)
        .then(user => {
            res.status(200).send({ success: true, data: { user } });
        }).catch(err => res.status(200).send({ success: false, error: err.message }));
};

const deleteAccount = (req, res) => {
    const { id } = req.params
    try {
        
        UserModel.deleteAccount(id)
            .then((data) => {
                res.status(200).send({ data: data, success: true })
            }).catch((err) => {
                res.tatus(200).send({ error: err.message, success: false })
            })

    } catch (err) {
        res.tatus(500).send({ error: err.message, success: false })
    }

}

const getOperators = (req,res)=>{
    
    try {
        UserModel.getOperators()
            .then((data) => {
                
                res.status(200).send({ success: true, data: data });
            }).catch((err) => {
                res.status(200).send({ success: false, error: err.message });
            })
    } catch (err) {
        res.status(500).send({ success: false, error: err.message });
    }
}

module.exports = { signup, login, current_user, getTechnicians, getAccounts, deleteAccount , getOperators};