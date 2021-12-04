const mongoose = require('mongoose');
const dbConnect = ()  =>{
 
    const DB_URI = process.env.DB_URI || `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;
    
    mongoose.connect(DB_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },(err, res)=>{
        if(!err){
            console.log('***** Conexion a la base de datos exitosa *****');
        }else{
            console.log('***** Conexion a la base de datos fallida *****');
        }
    })
}

module.exports = {dbConnect};