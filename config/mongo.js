const mongoose = require('mongoose');
const getModelByName = require('../app/models/getModelByName');
const dbConnect = ()  =>{
    let db
    let port
    if(process.env.ENV=='development'){
        db=process.env.MONGO_TEST_DB
    }else{
        db=process.env.MONGO_DB
    }

    if(process.env.OP=='linux'){
        port = process.env.MONGO_PORT_linux
       
    }else{
        port = process.env.MONGO_PORT
    }
    const DB_URI = process.env.DB_URI || `mongodb://${process.env.MONGO_HOST}:${port}/${db}`;
    console.log(DB_URI)
    console.log(process.env.ENV)
    console.log(process.env.OP)
    
    mongoose.connect(DB_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },(err, res)=>{
        if(!err){
            const userAdmin = getModelByName('user_conservacion');
            userAdmin.buildUp().then(()=>{

                console.log('***** Conexion a la base de datos exitosa *****');
            }).catch((err)=>{
                console.log('Error en proceso de inciacion', err)
            })
        }else{
            console.log('***** Conexion a la base de datos fallida *****');
            console.log("error", err.message)
        }
    })
}

module.exports = {dbConnect};
