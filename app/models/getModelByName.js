const mongoose = require('mongoose');
require('./programs')
require('./orders')
require('./users_conservacion');
require('./technicians');
require('./reports')
require('./tasks')
require('./properties');
require('./providers')
require('./bills');
require('./needs');

function getModelByName(name){
    return mongoose.model(name);
}

module.exports = getModelByName;
