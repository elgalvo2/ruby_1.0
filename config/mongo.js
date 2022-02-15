const mongoose = require('mongoose');
const getModelByName = require('../app/models/getModelByName');
const dbConnect = ()  =>{
    let db
    if(process.env.ENV=='development'){
        db=process.env.MONGO_TEST_DB
    }else{
        db=process.env.MONGO_DB
    }
 
    const DB_URI = process.env.DB_URI || `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${db}`;
    console.log(process.env.ENV)
    console.log(process.env.OP)
    
    mongoose.connect(DB_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },(err, res)=>{
        if(!err){
            console.log('***** Conexion a la base de datos exitosa *****');
            const userAdmin = getModelByName('user_conservacion');
            userAdmin.buildUp();
        }else{
            console.log('***** Conexion a la base de datos fallida *****');
            console.log("error", err.message)
        }
    })
}

module.exports = {dbConnect};
