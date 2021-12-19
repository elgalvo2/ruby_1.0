const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const {isValidEmail} = require('../helpers');

const Schema = mongoose.Schema;

const providerSchema = Schema({
    provider_no:{
        type: Number,
        required: true,
        unique:true,
    },
    razon_social:{
        type: String,
        required: true,
        trim: true,
        unique:true,
    },
    rep_legal:{type:String},
    rfc:{
        type: String,
        required: true,
        trim: true,
        unique:true,
    },
    domicilio:{
        type:String,
        required:true,
    },
    telefono:{
        type: Number,
        required:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    giro:{
        type:String,
    }
    
},
{
    timestamps: true,
    versionKey: false,
})

providerSchema.statics.setProvider = setProvider;



mongoose.model('provider',providerSchema,'providers');

function setProvider(providerInfo){
    if(!providerInfo.provider_no || providerInfo.provider_no=="" )throw new Error('Provider Number must be provided');
    if(!providerInfo.razon_social || providerInfo.razon_social=="" )throw new Error('Provider Number must be provided');
    if(!providerInfo.rfc || providerInfo.rfc =="")throw new Error('Provider RFC mus be provided');
    if(!providerInfo.domicilio || providerInfo.domicilio =="") throw new Error("Provider address must be provided");
    if(!providerInfo.telefono || providerInfo.telefono == "") throw new Error('Provider telephone mus be provided');
    if(!providerInfo.email || !isValidEmail(providerInfo.email)) throw new Error('Provider Email is not valid');

    return this.find({provider_no: providerInfo.provider_no})
    .then((data)=>{
        if(data) throw new Error ('This provider number already exist');

        const new_provider = {
            provider_no:providerInfo.provider_no,
            razon_social:providerInfo.razon_social,
            rep_legal:providerInfo.rep_legal,
            rfc:providerInfo.rfc,
            domicilio:providerInfo.domicilio,
            telefono:providerInfo.telefono, 
            email:providerInfo.email,
            giro:providerInfo.giro,
        }

        return this.create(new_provider)
    }).catch(err=>{throw new Error(err)});

}
