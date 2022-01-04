const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const Schema = mongoose.Schema;

const propertySchema = Schema({
    inmueble:{
        type: String,
        required: true,
        trim: true,
        unique:true,
    },
    direccion:{
        type: String,
        required: true,
        trim: true,
        unique:true,
    },
    administrador:{type:String},
    director:{type:String},
    contador:{type:String},
    localidad:{type:String, required:true},

    telefono:{
        type: String,
    },
    
    propietario:{type:String, required:true, trim:true},
    unidad_informacion:{type:String, required:true,trim:true},
    centro_costos:{type:String, required:true, trim:true},
    circunscripcion:{type:String, required:true,trim:true},
    jefe_conservacion:{type:String, required:true},
    


},
{
    timestamps: true,
    versionKey: false,
})

propertySchema.statics.setProperty = setProperty;
propertySchema.statics.getProperty_forContext = getProperty_forContext;


mongoose.model('property',propertySchema,'properties');

function setProperty(propertyInfo){

    if(!propertyInfo.inmueble || propertyInfo.inmueble == "") throw new Error('Ingresa el nombre de la unidad')
    if(!propertyInfo.direccion || propertyInfo.direccion == "") throw new Error('Ingresa la dirección de la unidad')
    if(!propertyInfo.localidad || propertyInfo.localidad == "") throw new Error('Ingresa la localidad de la unidad')

    if(!propertyInfo.direccion || propertyInfo.direccion == "") throw new Error('Ingresa la dirección de la unidad')
    

    if(!propertyInfo.propietario || propertyInfo.propietario == "") throw new Error('Ingresa el propietario de la unidad')
    if(!propertyInfo.unidad_informacion || propertyInfo.unidad_informacion == "") throw new Error('Ingresa el nombre de la unidad')
    if(!propertyInfo.centro_costos || propertyInfo.centro_costos == "") throw new Error('Ingresa la dirección de la unidad')

    if(!propertyInfo.circunscripcion || propertyInfo.circunscripcion == "") throw new Error('Ingresa la circunscripcion de la unidad')
    if(!propertyInfo.jefe_conservacion || propertyInfo.jefe_conservacion == "") throw new Error('Ingresa el jefe_conservacion de la unidad')


    return this.findOne({inmueble: propertyInfo.inmueble})
        .then(property=>{
            if(property) throw new Error("Esta propiedad ya ha sido registrada");

            const newProperty={
                inmueble:propertyInfo.inmueble,
                direccion:propertyInfo.direccion,
                administrador:propertyInfo.administrador,
                director:propertyInfo.director,
                contador:propertyInfo.contador,
                localidad:propertyInfo.localidad,
            
                telefono:propertyInfo.telefono,
                propietario:propertyInfo.propietario,
                unidad_informacion:propertyInfo.unidad_informacion,
                centro_costos:propertyInfo.centro_costos,
                circunscripcion:propertyInfo.circunscripcion,
                jefe_conservacion:propertyInfo.jefe_conservacion,
            }

            return this.create(newProperty)
        }).catch(err=>{
            throw new Error(err)
        });
}


function getProperty_forContext(){
    const getCircunscriptionName = require('./helpers/table_circuscripcion')
    return this.find().select({_id:0})
    .then(data=>{
        const context = [];
        data.map((property)=>{
            const cir_num = property.circunscripcion;
            const circunscri = getCircunscriptionName(cir_num)
            property.circunscripcion = [cir_num,circunscri];
            context = [...context,property];
        })
        return context;
    }).catch(err=>{
        throw new Error(err);
    })
}
