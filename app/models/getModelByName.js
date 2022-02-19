const mongoose = require('mongoose');
const fs = require('fs')

const removeExtension = (filename)=>{
    return filename.split('.').shift();
}

fs.readdirSync(`${__dirname}`).filter((file)=>{
    const fileWithOutExt = removeExtension(file)
    const skip = ['getModelByName','helpers'].includes(fileWithOutExt);
    if(!skip){
        require('./'+fileWithOutExt)
    }
})



function getModelByName(name){
    return mongoose.model(name);
}

module.exports = getModelByName;
