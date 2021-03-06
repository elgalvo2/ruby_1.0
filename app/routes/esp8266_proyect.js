const { Socket } = require('dgram');
const express = require('express')
const app = express();
const router = express.Router();
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io")
const io = new Server(server)

router.get('/',(req,res)=>{
    res.sendFile(__dirname+'/esp_3266_files/')
})

io.on('connection',(Socket)=>{
    console.log('a user connected')
})


module.exports = router;