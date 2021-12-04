const mongoose = require('mongoose');
require('./programs')
require('./orders')
require('./users_conservacion');
require('./technicians');
require('./reports')
require('./tasks')
require('./properties');

function getModelByName(name){
    return mongoose.model(name);
}

module.exports = getModelByName;