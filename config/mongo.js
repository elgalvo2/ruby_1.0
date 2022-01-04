const mongoose = require('mongoose');
const getModelByName = require('../app/models/getModelByName');
const dbConnect = ()  =>{
 
    const DB_URI = process.env.DB_URI || `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;
    
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
