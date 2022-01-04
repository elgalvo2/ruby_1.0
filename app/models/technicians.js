const {Schema, model} = require('mongoose');

const TechnicianSchema = Schema({
    userId:{ // creador del tecnico
        type:Schema.Types.ObjectId,
        ref:'user',
        required:true,
    },
    technician:{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:true,
    },
    area:{
        type:String,
        required:true,
        trim:true,
    },
    turno:{type:String, required: true, default:'TM'},
    speciality:{type:String, required:true, default:"General"},
    matricula:{type:String, required: true, default:'not defined'},
});

model('technician',TechnicianSchema, 'technicians');



