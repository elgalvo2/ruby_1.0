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
providerSchema.statics.getProviders = getProviders;
providerSchema.statics.getProviderByNumber = getProviderByNumber;
providerSchema.statics.updateProvider = updateProvider;



mongoose.model('provider',providerSchema,'providers');

function setProvider(providerInfo){
    
    if(!providerInfo.provider_no || providerInfo.provider_no=="" )throw new Error('Provider Number must be provided');
    if(!providerInfo.razon_social || providerInfo.razon_social=="" )throw new Error('Provider Number must be provided');
    if(!providerInfo.rfc || providerInfo.rfc =="")throw new Error('Provider RFC mus be provided');
    if(!providerInfo.domicilio || providerInfo.domicilio =="") throw new Error("Provider address must be provided");
    if(!providerInfo.telefono || providerInfo.telefono == "") throw new Error('Provider telephone mus be provided');
    if(!providerInfo.email || !isValidEmail(providerInfo.email)) throw new Error('Provider Email is not valid');

    return this.findOne({provider_no: providerInfo.provider_no})
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

function getProviders(){
    return this.find();
}

function getProviderByNumber(info){
    if(!info.provider_no) throw new Error ('Provider number must be provided')
    return this.findOne({provider_no:info.provider_no})
    .then((data)=>{
        if(!data) throw new Error('No provider found whit this number...')
        return data;
    }).catch((err)=>{
        throw new Error(err);
    })
}

function updateProvider(provider_no,providerInfo){
    const update = {};

    if(providerInfo.provider_no) throw new Error('Provider Number can not be changed');

    if(providerInfo.razon_social) update.razon_social = providerInfo.razon_social;
    if(providerInfo.rep_legal) update.rep_legal = providerInfo.rep_legal;
    if(providerInfo.rfc) update.rfc = providerInfo.rfc;
    if(providerInfo.domicilio) update.domicilio = providerInfo.domicilio;
    if(providerInfo.telefono) update.telefono = providerInfo.telefono;
    if(providerInfo.email) update.email = providerInfo.email;
    if(providerInfo.giro) update.giro = providerInfo.giro;

    return this.findOne({provider_no})
    .then((provider)=>{
        if(!provider) throw new Error('Provider not found');
        if(Object.keys(update).length==0) return provider;

        provider.set(update);

        return provider.save()
    });
}

