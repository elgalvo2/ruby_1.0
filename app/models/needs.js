const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const needSchema = Schema({
    need_type:{
        type:String,
        required:true,
    },
    by_contract:{
        type:Boolean,
        required:true
    },
    use:{
        type:String,
        required:true
    },
    unit:{
        type:Number, //unidad de informacion
        required:true,
    },
    creation_date:{
        type:String,
        required:true,
        trim:true,
    },
    items:{
        type:Array
    },
    legal_fundation:{
        type:String,
        required:true,
    },
    background:{
        type:String,
        required:true,
    },

    //etapa de autorizacion
    provider_no:{
        type:Number,
    },
    proposed_cost:{
        type:Number,
    },
    aut_no:{
        type:String,
        default:"waiting for authorization",
    },
    approved_cost:{
        type:Number,
    },
    //etapa de desarrollo
    order_no:{
        type:String,
    },
    start_date:{
        type:String,
    },
    finish_date:{
        type:String,
    },
    recived:{
        type:Boolean,
        default:false
    },
    notes:{
        type:String
    },
    //etapa de desahogo
    bill_no:{
        type:String,
    },
    signed:{
        type:Boolean,
        default:false
    },
    authorized:{
        type:Boolean,
        default:false,
    },
    sended_to_sign:{
        type:Boolean,
        default:false
    },
    sended_to_pay:{
        type:Boolean,
        default:false
    },
    date_of_sended_to_pay:{
        type:String,
        default:""
    }
})

//etapa de definicion
needSchema.statics.setneed = setneed;
//etapa de autorizacion
needSchema.statics.setProviderAndCost = setProviderAndCost;
needSchema.statics.SetAuthAndAprovCost = SetAuthAndAprovCost;
//etapa de desarrollo
needSchema.statics.setSFDate = setSFDate;
needSchema.statics.setRecived = setRecived;
//etapa de desahogo
needSchema.statics.setBill = setBill;
needSchema.statics.setSendedToSign = setSendedToSign;
needSchema.statics.markAsSigned = markAsSigned;
needSchema.statics.setSendedToPayAndDate = setSendedToPayAndDate;
//consultas generales
needSchema.statics.getneeds = getneeds;
needSchema.statics.deleteneed = deleteneed;
needSchema.statics.getNeedByID = getNeedByID;
needSchema.statics.updateneed = updateneed;


needSchema.statics.markAsDone = markAsDone;
needSchema.statics.markAsSendedToSign = markAsSendedToSign;
needSchema.statics.markAsAuthorized = markAsAuthorized;
needSchema.statics.markAsRecived = markAsRecived;

mongoose.model('need',needSchema,'needs');

function setneed(needInfo){

    if(!needInfo.need_type || needInfo.need_type=="") throw new Error ('need type must be provided');
    if(needInfo.by_contract == undefined || needInfo.by_contract==null) throw new Error ('If it is contract must be specified');
    if(!needInfo.use || needInfo.use=="") throw new Error('Use must be provided');
    if(!needInfo.unit || needInfo.unit==0) throw new Error('Unit must be provided');
    if(!needInfo.creation_date || needInfo.creation_date=="") throw new Error('Date of creation mus be provided');
    
    if(!needInfo.legal_fundation || needInfo.legal_fundation == "") throw new Error('Legal fundation must be specified');
    if(!needInfo.background || needInfo.background == "") throw new Error('Background must be specified');
    

    
    const new_need ={};

    new_need.need_type =needInfo.need_type
    new_need.by_contract =needInfo.by_contract
    new_need.use =needInfo.use
    new_need.unit=needInfo.unit
    new_need.creation_date=needInfo.creation_date
    new_need.legal_fundation=needInfo.legal_fundation
    new_need.background=needInfo.background

    return this.create(new_need)

/*
    return this.findOne({need_no: needInfo.need_no , provider_no: needInfo.provider_no})
    .then((need)=>{
        if(need) throw new Error('A need whit this number was already created')

        const new_need = {}

        if(needInfo.aut_no) new_need.aut_no = needInfo.aut_no;
        new_need.need_no = needInfo.need_no;
        new_need.provider_no = needInfo.provider_no;
        new_need.unit = needInfo.unit;
        new_need.date = needInfo.date;
        new_need.items = needInfo.items;
        new_need.amount = needInfo.amount;

        return this.create(new_need)
    }).catch(err=>{throw new Error (err)})

    */
}

function setProviderAndCost (needInfo,needID){
    if(!needInfo.provider_no || needInfo.provider_no==0) throw new Error ('provider no has to be provided')
    if(!needInfo.items || needInfo.items.length == 0) throw new Error('At least one items has to be provided');

    let cost = 0;

    needInfo.items.map((item, index)=>{
        if(!item.info || typeof item.info != 'string'|| item.info == "") throw new Error ('Information of item '+(index+1)+' no valid')
        if(!item.unit || typeof item.unit != 'string' || item.unit=="") throw new Error('Item unit must be specified')
        if(!item.pu || typeof item.pu != 'number' || item.pu == 0) throw new Error ('Cost of item unit '+(index+1) +' not valid')
        if(!item.cantity || typeof item.cantity != 'number' || item.cantity == 0) throw new Error(':Item cantity must be specified')
        cost += item.pu*item.cantity         
    })


    return this.findOne({_id:needID})
    .then((need)=>{
        if(!need) throw new Error ('No need found')
        need.set({provider_no:needInfo.provider_no, proposed_cost:cost, items:needInfo.items});

        return need.save();
    }).catch((err)=>{
        if(err) throw new Error (err.message)
    })

}

function SetAuthAndAprovCost(needInfo,needID){
    if(!needInfo.auth_no || needInfo.auth_no=="") throw new Error ('Auth number has to be provided')
    if(!needInfo.approved_cost || needInfo.approved_cost==0) throw new Error ('Approved cost can not be 0')
    if(needInfo.authorized == undefined || needInfo.authorized==null) throw new Error ('Authorized not defined')
    if(!needID) throw new Error('Need id is not specified')

    return this.findOne({_id:needID})
    .then((need)=>{
        if(!need) throw new Error ('No need found')
        need.set({aut_no:needInfo.auth_no, approved_cost:needInfo.approved_cost, authorized:needInfo.authorized});

        return need.save();
    }).catch((err)=>{
        return err.message
    })
}

function setSFDate({order_no,start_date,finish_date},needID){
    if(!order_no || order_no == "") throw new Error ('An order number has to be provided');
    if(!start_date || start_date == "") throw new Error ('A Start date has to be provided')
    if(!finish_date || finish_date == "") throw new Error ("A finish date has to be provided");
    if(!needID) throw new Error('Need id is not specified')

    return this.findOne({_id:needID})
    .then((need)=>{
        if(!need) throw new Error ('No need found')

        need.set({order_no,start_date,finish_date})

        return need.save();
    }).catch((err)=>{
        return err.message
    })

}

function setRecived({recived, notes},needID){
    if(recived == null || recived==undefined) throw new Error ('Pleace specified if the need has been recived')
    if(!needID) throw new Error('Need id is not specified')
    if(!notes) {
        const notes = ""
    }
    return this.findOne({_id:needID})
    .then((need)=>{
        if(!need) throw new Error('No Need Found')

        need.set({recived,notes})
        return need.save();
    }).catch((err)=>{
        return err.message
    })
}

function setBill({bill_no},needID){
    if(!bill_no || bill_no=="") throw new Error ('Bill number has to be provided')

    return this.findOne({_id:needID})
    .then((need)=>{
        if(!need)throw new Error('No need found')

        need.set({bill_no})
        return need.save();
    }).catch((err)=>{
        return err.message
    })
}

function setSendedToSign({sended_to_sign},needID){
    if(sended_to_sign == undefined) throw new Error('If sended to sign no specified')

    return this.findOne({_id:needID})
    .then((need)=>{
        if(!need) throw new Error ('No need found')

        need.set({sended_to_sign})
        return need.save();
    }).catch((err)=>{
        return err.message
    })
}

function markAsSigned({signed},needID){
    if(signed == undefined) throw new Error('If sended to sign no specified')

    return this.findOne({_id:needID})
    .then((need)=>{
        if(!need) throw new Error ('No need found')

        need.set({signed})
        return need.save();
    }).catch((err)=>{
        return err.message
    })
}

function setSendedToPayAndDate({sended_to_pay,date_of_sended_to_pay},needID){
    if(sended_to_pay == undefined) throw new Error('Sended to pay no specified')
    if(!date_of_sended_to_pay || date_of_sended_to_pay =="" ) throw new Error('Date of sended to pay has to be specified')

    return this.findOne({_id:needID})
    .then((need)=>{
        if(!need) throw new Error ('No need found')

        need.set({sended_to_pay,date_of_sended_to_pay})
        return need.save();
    }).catch((err)=>{
        return err.message
    })
}


function getneeds(){
    return this.find()
}

function deleteneed({_id}){
    return this.deleteOne(_id)
}

function getNeedByID({_id}){
    return this.findOne({_id})
}


function updateneed({
    legal_fundation,
    background,
    provider_no,
    proposed_cost,
    auth_no,
    approved_cost,
    order_no,
    start_date,
    finish_date,
    notes,
    bill_no
},_id){
    const update = {};

    if(legal_fundation) update.legal_fundation = legal_fundation;
    if(background) update.background = background;
    if(provider_no) update.provider_no = provider_no;
    if(proposed_cost) update.proposed_cost = proposed_cost;
    if(auth_no) update.auth_no = auth_no;
    if(approved_cost) update.approved_cost = approved_cost;
    if(order_no) update.order_no = order_no;
    if(start_date) update.start_date = start_date;
    if(finish_date) update.finish_date = finish_date;
    if(notes) update.notes = notes;
    if(bill_no) update.bill_no = bill_no;

    return this.findOne({_id})
    .then((need)=>{
        if(!need) throw new Error('need not found');
        if(Object.keys(update).length==0) return need;

        need.set(update);

        return need.save()
    });
}


function markAsRecived(needToMark, provider){
    
    return this.findOne({need_no:needToMark , provider_no:provider})
    .then((need)=>{
        
        if(!need) throw new Error('An need with this number was not found')

        need.set({recived:true})

        return need.save()

    })
}


function markAsAuthorized(needToMark, provider, auth){
    console.log('auth',auth)
    if(!auth) throw new Error('Authorization number has to be provided')
    return this.findOne({need_no:needToMark , provider_no:provider})
    .then((need)=>{
        if(!need) throw new Error('An need with this number was not found')


        need.set({authorized:true, aut_no:auth})

        return need.save()

    })
}


function markAsSendedToSign(needToMark, provider){
    return this.findOne({need_no:needToMark , provider_no:provider})
    .then((need)=>{
        if(!need) throw new Error('An need with this number was not found')

        

        need.set({sended_to_sign:true})

        return need.save()

    })
}



function markAsDone(needToMark, provider){
    return this.findOne({need_no:needToMark , provider_no:provider})
    .then((need)=>{
        if(!need) throw new Error('An need with this number was not found')

        

        need.set({done:true})

        return need.save()

    })
}




