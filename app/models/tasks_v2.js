const {Schema, model} = require('mongoose');

const TaskSchema_v2 = Schema({
    folio:{
        type:String,
        required:true,
        trim:true,
    },

    creador_id:{  // creador del task
        type:Schema.Types.ObjectId,
        ref:'user_conservacion',
        required:true,
    },

    created_date:{type:String, required: true},
    created_hour:{type:String, required:true},
    description:{type:String, required:true, default:""},

    area_id:{
        type:Schema.Types.ObjectId,
        ref:'areas',
        required:true,
    },
    last_updated:{type:String},
    done:{type:Boolean, default:false},
    done_date:{type:String,default:'dd-mm-aa'},

}); 

TaskSchema_v2.statics.create_task = create_task;
TaskSchema_v2.statics.getTasksByCreator = getTasksByCreator;
TaskSchema_v2.statics.getTasksByArea = getTasksByArea;
TaskSchema_v2.statics.getAll = getAll;
TaskSchema_v2.statics.getCurrentTask = getCurrentTask;
//TaskSchema_v2.statics.getTodayTasks = getTodayTasks;
// TaskSchema_v2.statics.updateTask = updateTask;
// TaskSchema_v2.statics.deleteTask = deleteTask;
// TaskSchema_v2.statics.markDone = markDone;

model('task_v2',TaskSchema_v2, 'tasks_v2');



function create_task(taskInfo, creador_id, area_id){
    if(!creador_id || creador_id=='') throw new Error('Creator id is required')
    if(!area_id || area_id=='') throw new Error('Area id is required');
    if(!taskInfo.description || taskInfo.description == '') throw new Error('description is required');
    
    let dateobj = new Date();
    var month = dateobj.getUTCMonth()+1;
    var day = dateobj.getUTCDate()-1;
    var year = dateobj.getUTCFullYear();
    
    var hour = dateobj.getHours();
    var minute = dateobj.getMinutes();
    
    let newDate = day+'/'+month+'/'+year;
    let newHour = hour+':'+minute;
    
    taskInfo.creador_id = creador_id;
    taskInfo.area_id = area_id;
    taskInfo.created_date = newDate; 
    taskInfo.created_hour = newHour; 
    taskInfo.folio= month.toString()+'-'+day.toString()+minute.toString()
    
    
    
    return this.find()
    .then((tasks)=>{
        const counter = tasks.length+1
        
        const newTask = {
            creador_id: taskInfo.creador_id,
            area_id:taskInfo.area_id,
            folio: taskInfo.folio+'-'+counter.toString(),
            created_date: taskInfo.created_date,
            created_hour: taskInfo.created_hour,
            description: taskInfo.description,
        };
        
        return this.create(newTask);
    })
};  


function getTasksByCreator(_id){
    if(!_id || _id=='') throw new Error('especifica el creador')
    return this.find({creador_id:_id})
}

function getTasksByArea(_id){
    if(!_id || _id=='') throw new Error('especifica el area')
    return this.find({area_id:_id})
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

function updateTask(taskInfo, _id, ){
    const update = {};
    
    if(taskInfo.folio) throw new Error('Folio cant be changed');
    if(taskInfo.description) update.description = taskInfo.description;
    if(taskInfo.area_id) update.area_id = taskInfo.area_id;
    if(taskInfo.creator_id) update.technician = taskInfo.technician;
    if(taskInfo.technician_mat) update.technician_mat = taskInfo.technician_mat;
    
    return this.findOne({folio})
    .then(task=>{
        if(!task) throw new Error('Task not found');
        if(Object.keys(update).length== 0) return task;
        
        task.set(update);
        
        return task.save()
        
    });
}
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

function deleteTask(folio){
    return this.deleteOne({folio});
}
