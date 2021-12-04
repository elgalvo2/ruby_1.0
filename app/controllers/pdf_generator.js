const {order_data_topdf} = require('../services/create_pdf_index')
const fs = require('fs');
const { setTimeout } = require('timers');



const create_orden_compra= async (req,res)=>{

    const unit_data = req.body.unit_data;
    const provider_data = req.body.provider_data;
    const order_data = req.body.order_data;


    try{
        await order_data_topdf(unit_data, provider_data, order_data)
            

         
            res.setHeader('Content-type','application/pdf');
            res.setHeader('Content-disposition','attachment; filename=orden_de_compra.pdf');

            function sendpdf(){
                console.log('entro en el intervalo');
                res.download('../back_end/app/services/orden_de_compra.pdf');
                
            }
            setTimeout(sendpdf,3500,'funky')

            fs.unlink('../back_end/app/services/portada.pdf',(err=>{
                if(err){console.log(err)
                    }else{
                        console.log("portada eliminada")
                    }
                }));
                fs.unlink('../back_end/app/services/fundamento.pdf',(err=>{
                    if(err){console.log(err)
                    }else{
                        console.log("fundamento eliminada")
                    }
                }));
                fs.unlink('../back_end/app/services/pedido.pdf',(err=>{
                    if(err){console.log(err)
                    }else{
                        console.log("pedido eliminada")
                    }
                }));
                fs.unlink('../back_end/app/services/orden_de_compra.pdf',(err=>{
                    if(err){console.log(err)
                    }else{
                        console.log("orden compra eliminada")
                    }
                }));
                
                
                
           
            

            
            

        
    }catch(err){
        console.log(err);
    }
}

module.exports = {create_orden_compra};