const {Schema, model} = require('mongoose')




const ProgramSchema = Schema({
    userId:{  // creador del task
        type:Schema.Types.ObjectId,
        ref:'user_conservacion',
        required:true,
    },
    technician:{type:String, required:true},
    technician_mat:{type:Number, required:true},
    program_num:{
        type:Number,
        required:true,
    },
    program_month:{type:Number, min:1, max:12, required:true},
    created_date:{type:String, required: true},
    created_hour:{type:String, required:true},
    
    commands:{ // agrega id de las ordenes
        type:Array, 
        default:[]
    },
    reportId:{
    },
    finish:{type:Boolean,  default:false},
    finish_date:{type:String,  default:'dd-mm-aa'},
});

ProgramSchema.statics.create_program = create_program;
ProgramSchema.statics.create_programV02 = create_programV02;

model('program',ProgramSchema, 'programs');


function create_programV02(programInfo, id){
    if(!programInfo.technician) throw new Error('Technician is required');
    if(!programInfo.technician_mat) throw new Error('Matricula del tecnico is required');
    if(!programInfo.program_month) throw new Error('Month is required');
    if(!programInfo.commands || programInfo.commands.length==0) throw new Error('Commands are  required');
    
    

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
            //commands:programInfo.commands,
        }
        return this.create(newProgram)
        .then((program)=>{
            const program_ref = {};
            
            program_ref.id = program._id
            program_ref.mat = program.technician_mat;
            program_ref.userId = program.userId;  

            

            /*const commandsArr = programInfo.commands.map((command)=>{

                const arr = []
                
                arr.push((model('order').create_program_order(command, program_ref))
                .then((orderId)=>{

                    console.log('orderId',orderId)

                    const com = Promise.resolve(orderId).then((promise)=>{
                        console.log('promise',promise)
                        return promise;
                    })

                    console.log('com',com)
                    return com
                }))
            }).then((arre)=>{
                console.log('arre',arre);
                return arre
            })
            

            console.log('commandArre',commandsArr)
            

            return {commandsArr,program_ref};
            
            */

            const commandsArr = []
            programInfo.commands.map((command)=>{

                model('order').create_program_order(command, program_ref)
                .then((orderId)=>{
                    console.log('orderId', orderId)
                    commandsArr.push(orderId);
                    return orderId;
                });

            })
            



            console.log('commandArre',commandsArr)
            

            return {commandsArr,program_ref};

        }).then(({commandsArr, program_ref})=>{
            update = {};
            update.commands = commandsArr;

            return this.findOne({_id:program_ref.id}).then((program)=>{
                if(!program) throw new Error('Error al recuperar programa')

                program.set(update);
                return program.save();
            })
        })

    }).then(program=>program);
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
            commands: programInfo.commands,
            
        }
        return this.create(newProgram);

    }).then(program=>program)
}
