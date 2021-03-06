require('dotenv').config();
const {isAuthenticated}=require('./app/middleware');
const express = require('express');
const cors = require('cors');
const app = express();

let PORT
const morgan = require('morgan');
const {dbConnect} = require('./config/mongo');


if(process.env.ENV=='development'){
    PORT = process.env.TESTING_PORT|| 5000;
}else if(process.env.ENV =='test'){
    PORT = process.env.TESTPORT || 3000;
}else{
    PORT = process.env.PORT || 8000;
}

app.use(morgan('dev'));
app.use(cors());


app.use(express.json());

app.use('/api/1.0',require('./app/routes'))

dbConnect();



const server = app.listen(PORT,()=>{
    console.log("API escuchando en el puerto", PORT);
})

module.exports = {app,server};

