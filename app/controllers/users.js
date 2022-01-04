const {httpError} = require('../helpers/handleError');
const getModelByName = require('../models/getModelByName');




const getItems = (req,res)=>{

};

const getItem=  (req,res) =>{

};

const createItem = async (req,res)=>{
    try{
        const UserModel = getModelByName('user_conservacion');
        const {name, age, email} = req.body;
        const resDetail = await UserModel.create({
            name, age, email
        });
        res.send({data:resDetail})
    }catch(err){
        httpError(res, err)
    }
    
};

const updateItem = (req,res)=>{

};

const deleteItem = (req,res)=>{

};


module.exports = {getItems, getItem, createItem, updateItem, deleteItem};