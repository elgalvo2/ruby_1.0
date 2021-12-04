const {Schema, model} = require('mongoose');

const TaskSchema = Schema({
    userId:{  // creador del task
        type:Schema.Types.ObjectId,
        ref:'user_conservacion',
        required:true,
    },
    /*resposableID:{
        type:Schema.Types.ObjectId,
        ref:'tecnico',
        required:true,
    },*/
    technician:{type:String, required:true},
    technician_mat:{type:Number, required:true},
    folio:{
        type:String,
        required:true,
        trim:true,
    },
    created_date:{type:String, required: true},
    created_hour:{type:String, required:true},
    description:{type:String, required:true, default:""},
    area:{type:String, required: true, default:'No definida'},
    reportId:{

    },
    done:{type:Boolean, required:true, default:false},
    done_date:{type:String, required: false, default:'dd-mm-aa'},
});

TaskSchema.statics.create_task = create_task;
TaskSchema.statics.getAll = getAll;
TaskSchema.statics.getTodayTasks = getTodayTasks;
TaskSchema.statics.getCurrentTask = getCurrentTask;
TaskSchema.statics.updateTask = updateTask;
TaskSchema.statics.deleteTask = deleteTask;
TaskSchema.statics.markDone = markDone;
TaskSchema.statics.getUsersTasks = getUsersTasks;

model('task',TaskSchema, 'tasks');

function markDone(taskFolio){
    if(!taskFolio) throw new Error('Folio is required');
    let dateobj = new Date();
    var month = dateobj.getUTCMonth()+1;
    var day = dateobj.getUTCDate()-1;
    var year = dateobj.getUTCFullYear();

    const update = {};
    update.done_date = day+'/'+month+'/'+year;
    update.done = true;

    return this.findOne({folio:taskFolio})
    .then((task)=>{
        if(!task) throw new Error('Task cannot mark as done');
        if(task.done == true) throw new Error('Task already done');

        task.set(update);

        return task.save();
    });
}


function create_task(taskInfo, id){
    if(!taskInfo.folio) throw new Error('Folio is required');
    if(!taskInfo.description) throw new Error('description is required');
    if(!taskInfo.area) throw new Error('An Area r required');
    if(!taskInfo.technician) throw new Error ('A technician is required');

    let dateobj = new Date();
    var month = dateobj.getUTCMonth()+1;
    var day = dateobj.getUTCDate()-1;
    var year = dateobj.getUTCFullYear();

    var hour = dateobj.getHours();
    var minute = dateobj.getMinutes();

    let newDate = day+'/'+month+'/'+year;
    let newHour = hour+':'+minute;

    taskInfo.userId = id;
    taskInfo.created_date = newDate; 
    taskInfo.created_hour = newHour;

    
     return this.findOne({folio:taskInfo.folio})
        .then((task)=>{
            if(task) throw new Error('Task folio already exist');

            const newTask = {
                userId: taskInfo.userId,
                folio: taskInfo.folio,
                technician: taskInfo.technician,
                technician_mat:taskInfo.technician_mat,
                created_date: taskInfo.created_date,
                created_hour: taskInfo.created_hour,
                description: taskInfo.description,
                area: taskInfo.area,
            };

            return this.create(newTask);
        }).then(task=>task);
};

function getUsersTasks(user){
    if(user.role=="ADMIN" || user.role=="SUDO"){
        return this.find();
    }else if(user.role=='TECNICO'){
        return this.find({technician_mat:user.matricula});
    }else{
        throw new Error('No tienes permisos para cargar Ordenes')
    }
}

function getAll(){
    return this.find();
} 

function getCurrentTask(){
    return this.find({done: false});
}

function getTodayTasks(){
    let dateobj = new Date();
    var month = dateobj.getUTCMonth()+1;
    var day = dateobj.getUTCDate()-1;
    var year = dateobj.getUTCFullYear();

    let newDate = day+'/'+month+'/'+year;

    console.log('today', newDate)

    return this.find({created_date:newDate});
}

function updateTask(taskInfo, folio){
    const update = {};
    
    if(taskInfo.folio) throw new Error('Folio cant be changed');

    if(taskInfo.description) update.description = taskInfo.description;
    if(taskInfo.area) update.area = taskInfo.area;
    if(taskInfo.technician) update.technician = taskInfo.technician;
    if(taskInfo.technician_mat) update.technician_mat = taskInfo.technician_mat;

    return this.findOne({folio})
        .then(task=>{
            if(!task) throw new Error('Task not found');
            if(Object.keys(update).length== 0) return task;

            task.set(update);

            return task.save()
            
        });
}

function deleteTask(folio){
    return this.deleteOne({folio});
}