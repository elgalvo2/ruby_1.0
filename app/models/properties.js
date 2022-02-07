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
propertySchema.statics.updateProperty = updateProperty;
propertySchema.statics.getPropertyById = getPropertyById;
propertySchema.statics.getProperties = getProperties;
propertySchema.statics.deleteProperty = deleteProperty;


mongoose.model('property',propertySchema,'properties');

function setProperty(propertyInfo){

    if(!propertyInfo.inmueble || propertyInfo.inmueble == "") throw new Error('Ingresa el nombre de la unidad')
    if(!propertyInfo.direccion || propertyInfo.direccion == "") throw new Error('Ingresa la dirección de la unidad')
    if(!propertyInfo.localidad || propertyInfo.localidad == "") throw new Error('Ingresa la localidad de la unidad')

    if(!propertyInfo.director || propertyInfo.director == "") throw new Error('Ingresa el nombre del director de la unidad')
    

    if(!propertyInfo.propietario || propertyInfo.propietario == "") throw new Error('Ingresa el propietario de la unidad')
    if(!propertyInfo.unidad_informacion || propertyInfo.unidad_informacion == "") throw new Error('Ingresa la unidad de informacion de la unidad')
    if(!propertyInfo.centro_costos || propertyInfo.centro_costos == "") throw new Error('Ingresa el centro de costos de la unidad')

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
    return this.find()
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
 function updateProperty ({
    inmueble,
    direccion,
    administrador,
    director,
    contador,
    localidad,
    telefono,
    propietario,
    unidad_informacion,
    centro_costos,
    circunscripcion,
    jefe_conservacion,
 },_id){
     const update = {}
     if(inmueble) update.inmueble = inmueble
     if(direccion) update.direccion = direccion
     if(administrador) update.administrador = administrador
     if(director) update.director = director
     if(contador) update.contador = contador
     if(localidad) update.localidad = localidad
     if(telefono) update.telefono = telefono
     if(propietario) update.propietario = propietario
     if(unidad_informacion) update.unidad_informacion = unidad_informacion
     if(centro_costos) update.centro_costos = centro_costos
     if(circunscripcion) update.circunscripcion = circunscripcion
     if(jefe_conservacion) update.jefe_conservacion = jefe_conservacion

     return this.findOne({_id})
     .then((property)=>{
         if(!property) throw new Error ('Property not found')
         if(Object.keys(update).length == 0) return property;
         
         property.set(update);
         return property.save()
     }).catch((err)=>{
         return err.message
     })

}
function getPropertyById(_id){
    if(!_id) throw new Error('Id no be specified')

    return this.findOne({_id})
    .then((property)=>{
        if(!property) throw new Error('No property found')
        return property
    }).catch((err)=>{
        return err.message
    })
}
function getProperties(){
     return this.find()
     .then((properties)=>{
         if(!properties) throw new Error ('No properties found')
         return properties
     }).catch((err)=>{
         return err.message
     })
}
function deleteProperty({_id}){
     return this.deleteOne({_id})
}