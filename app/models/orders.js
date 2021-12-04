const {Schema, model} = require('mongoose')
const getModelByName = require('./getModelByName');;


const OrderSchema = Schema({
    userId:{  // creador del task
        type:Schema.Types.ObjectId,
        ref:'user_conservacion',
        required:true,
    },
    in_charge_mat:{type:Number, required:true},
    program_order:{
        type:Boolean,
        required:true
    },
    program_id:{
        type:Schema.Types.ObjectId,
        ref:'order',
        default:null,
    },
    created_date:{type:String, required: true},
    created_hour:{type:String, required:true},
    
    tittle:{type:String, required:true},
    description:{type:String, required:true},
    helper_doc_url:{},
    reportId:{
    },
    done:{type:Boolean,  default:false},
    done_date:{type:String,  default:'dd-mm-aa'},
});

OrderSchema.statics.create_program_order = create_program_order;


model('order',OrderSchema, 'orders');


function create_program_order(command, ref){

    if(!ref.id) throw new Error('program id not provided')
    if(!ref.mat) throw new Error('matricula of the person in charge not provided')
    if(!ref.userId)throw new Error('Id of user incorrect');
    if(!command || command == "") throw new Error('No command added');
    
    const orderInfo = {};    

    let dateobj = new Date();
    var month = dateobj.getUTCMonth()+1;
    var day = dateobj.getUTCDate()-1;
    var year = dateobj.getUTCFullYear();

    var hour = dateobj.getHours();
    var minute = dateobj.getMinutes();

    let newDate = day+'/'+month+'/'+year;
    let newHour = hour+':'+minute;

    const {tittle, description} = command

    orderInfo.program_id = ref.id;
    orderInfo.in_charge_mat = ref.mat;
    orderInfo.userId = ref.userId;
    orderInfo.created_hour = newHour;
    orderInfo.created_date = newDate;
    orderInfo.program_order = true;
    orderInfo.tittle = tittle;
    orderInfo.description = description;




    return this.create(orderInfo)
    .then((order)=>order._id);
}



function create_program(programInfo, commandsArr, id){
    if(!programInfo.technician) throw new Error('Technician is required');
    if(!programInfo.technician_mat) throw new Error('Matricula del tecnico is required');
    if(!programInfo.program_month) throw new Error('Month is required');
    if(!commandsArr || commandsArr.length()==0) throw new Error('Commands are  required');
    
    

    let dateobj = new Date();
    var month = dateobj.getUTCMonth()+1;
    var day = dateobj.getUTCDate()-1;
    var year = dateobj.getUTCFullYear();

    var hour = dateobj.getHours();
    var minute = dateobj.getMinutes();

    let newDate = day+'/'+month+'/'+year;
    let newHour = hour+':'+minute;

    programInfo.userId = id;
    programInfo.created_hour = newHour;
    programInfo.created_date = newDate;

    programInfo.commands = commandsArr;

    return this.find()
    .then((programs)=>{
        const newProgram = {
            userId: programInfo.userId,
            technician: programInfo.technician,
            technician_mat:programInfo.technician_mat,
            program_num: programs.length+1,
            program_month:programInfo.program_month,
            created_date: programInfo.created_date,
            created_hour: programInfo.created_hour,
            program_order:true,
            commands: programInfo.commands,
            
        }
        return this.create(newProgram);

    }).then(program=>program)
}
