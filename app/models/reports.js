const {Schema, model} = require('mongoose');

const ReportSchema = Schema({
    userId:{  // creador del task
        type:Schema.Types.ObjectId,
        ref:'user_conservacion',
        required:true,
    },
    folio:{
        type:String,
        required:true,
       
    },

    labels:{
        type:Array,
        default:null
    },
    text:{
        type:String,
        required:true,
    },
    start_time:{
        type:String,
        required:true
    },
    end_time:{
        type:String,
        required:true,
    },
    aux_personal:{
        type:Array,
        default:null
    },
    materials:{
        type:Array,
        default:null
    },
    report_date:{
        type:String,
        required:true
    },
    report_hour:{
        type:String,
        required:true,
    },
    
});

ReportSchema.statics.terminate_task = terminate_task;


model('report',ReportSchema,'reports');



function terminate_task(folio,report, id){

    
    
    if(!report.folio) throw new Error('Task folio is required');
    if(report.folio!=folio) throw new Error('An Error Occur');
    if(!report.start_time) throw new Error('Hour of attention is required');
    if(!report.text) throw new Error('A text for the report is required');
    if(!report.end_time) throw new Error('Hour of attention ending is required');

    let dateobj = new Date();
    var month = dateobj.getUTCMonth()+1;
    var day = dateobj.getUTCDate()-1;
    var year = dateobj.getUTCFullYear();

    var hour = dateobj.getHours();
    var minute = dateobj.getMinutes();

    let newDate = day+'/'+month+'/'+year;
    let newHour = hour+':'+minute;

    report.userId = id;
    report.report_date = newDate; 
    report.report_hour = newHour; 

    console.log(report)


    
     return this.findOne({folio:folio})
        .then((task)=>{
            if(task) throw new Error('A report fo that task already exist');

            const newReport = {
                userId: report.userId,
                folio: folio,
                labels:report.labels,
                text: report.text,
                start_time:report.start_time,
                end_time:report.end_time,
                materials:report.materials,
                aux_personal:report.aux_personal,
                report_hour: report.report_hour,
                report_date: report.report_date,
            };

            return this.create(newReport);
        }).then(report=>report);
};




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