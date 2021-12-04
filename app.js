require('dotenv').config();
const {isAuthenticated}=require('./app/middleware');
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8000;
const morgan = require('morgan');
const {dbConnect} = require('./config/mongo');

app.use(morgan('dev'));
app.use(cors());


app.use(express.json());

app.use('/api/1.0',require('./app/routes'))

dbConnect();

app.listen(PORT,()=>{
    console.log("API escuchando en el puerto", PORT);
})

