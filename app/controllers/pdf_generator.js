const {order_data_topdf} = require('../services/create_pdf_index')
const fs = require('fs');
const { setTimeout } = require('timers');

const get_pdf = (req,res)=>{
    res.setHeader('Content-type','application/pdf; charset=utf-8');
    res.setHeader('Content-disposition','attachment; filename=orden_compra.js');
    const stats = fs.statSync(__dirname+'/orden_de_compra.pdf');

    var length = stats.size;
    console.log('length', length)
    res.setHeader('Content-length',length)


    res.download(__dirname+'/orden_de_compra.pdf');

    /*

    var file = fs.createReadStream(__dirname+'/orden_de_compra.pdf')
    res.setHeader('Content-type','application/pdf; charset=utf-8',);
    res.setHeader('Content-disposition','attachment; filename=orden_compra.js');
    file.pipe(res);
    */
}

const create_orden_compra= async (req,res)=>{


    
    const unit_data = req.body.order.unit_data;
    const provider_data = req.body.order.provider_data;
    const order_data = req.body.order.order_data;





    try{

        
        await order_data_topdf(unit_data, provider_data, order_data);
        res.status(200).send({success:true, data:null});


    

            
        

        
    }catch(err){
        console.log(err);
        res.status(500).send({success:false,error:err})
    }
}

module.exports = {create_orden_compra, get_pdf};