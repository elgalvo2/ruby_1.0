
const {Schema,model, Mongoose} = require('mongoose');

const AreaSchema = Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    inOperation:{
        type:Boolean,
        required:true,
    },
    program:{
        type:String,
        required:true
    },
    operator_id:{  // creador del task
        type:Schema.Types.ObjectId,
        ref:'user_conservacion',
        required:true,
    },
    technician_id:{
        type:Schema.Types.ObjectId,
        ref:'user_conservacion',
        required:true,
    },
    resposible_id:{
        type:Schema.Types.ObjectId,
        ref:'user_conservacion',
        required:true,
    }


})

AreaSchema.setArea = setArea;
AreaSchema.getAreaById = getAreaById;
AreaSchema.updateArea = updateArea;
AreaSchema.deleteArea = deleteArea;
AreaSchema.getAreas = getAreas;
AreaSchema.getResposibleAreasById = getResposibleAreasById;
AreaSchema.getOperatorAreasById = getOperatorAreasById;
AreaSchema.getTechnicianAreasById = getTechnicianAreasById;


model('area',AreaSchema,'areas');


function setArea({name,inOperation,program,operator_id,technician_id,resposible_id}){
    if(!name || name=='') throw new Error('Ingrese un nombre de Area');
    if(inOperation == undefined) throw new Error('Es necesario especificar si el Area esta en operacion')
    if(!program || program == '') throw new Error('Ingrese un programa de Area')
    if(!operator_id || operator_id=='') throw new Error('Es necesario especificar el operador del Area')
    if(!technician_id || technician_id=='') throw new Error('Es necesario especificar el responsable del Area')
    if(!resposible_id || resposible_id=='') throw new Error('Es necesario especificar el responsable del Area')

    return this.findOne({name})
    .then((area)=>{
        if(area) throw new Error ('Esta area ya existe');

        const new_area = {
            name,
            inOperation,
            program,
            operator_id,
            technician_id,
            resposible_id

        }
        return this.create(new_area)
    }).then((err)=>{
        throw new Error(err);
    })
}

function getAreaById(_id){
    return this.findOne({_id})
    .then((area)=>{
        if(!area) throw new Error('Area no encontrada')
        return area;
    }).catch((err)=>{
        throw new Error(err);
    })
}

function updateArea(area_info){
    
    if(Object.keys(area_info).length == 0) throw new Error('No se ha especificado campos a actualizar');
    if(!area_info._id || area_info._id == '') throw new Error('Especifique el area a actualizar');
    const update = {...area_info};
    return this.findOne({_id:area_info._id})
    .then((area)=>{
        if(!area) throw new Error('Area no encontrada')
        area.set(update)
        return this.save()
    })
    .catch((err)=>{
        throw new Error(err)
    })
}

function deleteArea(_id){
    if(!_id || _id == '') throw new Error('especifique el area que desea eliminar')
    return this.deleteOne({_id})
}

function getResposibleAreasById(_id){
    if(!_id) throw new Error('Especifica el identificador del resposable')
    return this.find({resposible_id:_id})
}


function getTechnicianAreasById(_id){
    if(!_id) throw new Error('Especifica el identificador del tecnico')
    return this.find({technician_id:_id})
}

function getOperatorAreasById(_id){
    if(!_id) throw new Error('Especifica el identificador del operador')
    return this.find({operator_id:_id})
}

function getAreas(){
    return this.find()
}