const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const billSchema = Schema({
    bill_no:{
        type:String,
        required:true
    },
    provider_no:{
        type:Number,
        required:true
    },
    unit:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        required:true,
        trim:true,
    },
    items:{
        type:Object,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    isService:{
        type:Boolean,
        default:false,
    },
    aut_no:{
        type:String,
        default:"waiting for authorization",
    },
    recived:{
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
    done:{
        type:Boolean,
        default:false
    }
})

billSchema.statics.setBill = setBill;
billSchema.statics.markAsRecived = markAsRecived;
billSchema.statics.markAsAuthorized = markAsAuthorized;
billSchema.statics.markAsSendedToSign = markAsSendedToSign;
billSchema.statics.markAsDone = markAsDone;
billSchema.statics.updateBill = updateBill;
billSchema.statics.deleteBill = deleteBill;
billSchema.statics.getBills = getBills;

mongoose.model('bill',billSchema,'bills');

function setBill(billInfo){

    if(!billInfo.bill_no || billInfo.bill_no=="") throw new Error ('Bill number must be provided');
    if(!billInfo.provider_no) throw new Error ('Provider number mus be provided');
    if(!billInfo.unit || billInfo.unit=="") throw new Error('Unit must be provided');
    if(!billInfo.date || billInfo.date=="") throw new Error('Date mus be provided');
    if(!billInfo.items || JSON.stringify(billInfo.items) == '{}') throw new Error('At least one items has to be provided');
    if(!billInfo.amount || billInfo.amount == 0) throw new Error('Bill amount can not be 0');
    
    return this.findOne({bill_no: billInfo.bill_no , provider_no: billInfo.provider_no})
    .then((bill)=>{
        if(bill) throw new Error('A bill whit this number was already created')

        const new_bill = {}

        if(billInfo.aut_no) new_bill.aut_no = billInfo.aut_no;
        new_bill.bill_no = billInfo.bill_no;
        new_bill.provider_no = billInfo.provider_no;
        new_bill.unit = billInfo.unit;
        new_bill.date = billInfo.date;
        new_bill.items = billInfo.items;
        new_bill.amount = billInfo.amount;

        return this.create(new_bill)
    }).catch(err=>{throw new Error (err)})

}

function markAsRecived(billToMark, provider){
    
    return this.findOne({bill_no:billToMark , provider_no:provider})
    .then((bill)=>{
        
        if(!bill) throw new Error('An bill with this number was not found')

        bill.set({recived:true})

        return bill.save()

    })
}


function markAsAuthorized(billToMark, provider, auth){
    console.log('auth',auth)
    if(!auth) throw new Error('Authorization number has to be provided')
    return this.findOne({bill_no:billToMark , provider_no:provider})
    .then((bill)=>{
        if(!bill) throw new Error('An bill with this number was not found')


        bill.set({authorized:true, aut_no:auth})

        return bill.save()

    })
}


function markAsSendedToSign(billToMark, provider){
    return this.findOne({bill_no:billToMark , provider_no:provider})
    .then((bill)=>{
        if(!bill) throw new Error('An bill with this number was not found')

        

        bill.set({sended_to_sign:true})

        return bill.save()

    })
}



function markAsDone(billToMark, provider){
    return this.findOne({bill_no:billToMark , provider_no:provider})
    .then((bill)=>{
        if(!bill) throw new Error('An bill with this number was not found')

        

        bill.set({done:true})

        return bill.save()

    })
}


function updateBill(bill_nu, provider,billInfo){
    const update = {};

    if(billInfo.bill_no) throw new Error ('Bill Number can not be changed');
    if(billInfo.provider_no) throw new Error ('Bill provider can not be changed');
    if(billInfo.unit) throw new Error('Bill unit can not be changed');

    if(billInfo.items) update.items = billInfo.items;
    if(billInfo.amount) update.amount = billInfo.amount;

    return this.findOne({bill_no:bill_nu,provider_no:provider})
    .then((bill)=>{
        if(!bill) throw new Error('Bill not found');
        if(Object.keys(update).length==0) return bill;

        bill.set(update);

        return bill.save()
    });
}

function deleteBill(bill_no, provider_no){
    return this.deleteOne({bill_no,provider_no})
}

function getBills(){
    return this.find()
}