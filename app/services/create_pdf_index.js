const puppeteer = require('puppeteer');
const PDFmerger = require('pdf-merger-js');

const {
    purchase_order_portada_to_pdf,
    purchase_order_fundamentos_to_pdf,
    purchase_order_pedido_to_pdf,
    service_order_portada_to_pdf,
    service_order_desarrollo_to_pdf,
    service_order_fundamento_to_pdf,
    service_order_acta_entrega_to_pdf,
    }=require('./create_pdf.js');



async function purchase_order_topdf(unit_data, provider_data, order_data){

    
    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    //genera portada

    await page.goto(__dirname+'/orden_compra/portada.htm',{waitUntil:"networkidle2"});
    
    const pge_portada = await purchase_order_portada_to_pdf(page,unit_data, provider_data, order_data);
    await pge_portada.pdf({path:`app/services/portada.pdf`,format:"letter"});

    // genera fundamentos

    await page.goto(__dirname+'/orden_compra/fundamento.htm',{waitUntil:"networkidle2"});

    const pge_fundamentos = await purchase_order_fundamentos_to_pdf(page,unit_data, provider_data, order_data)
    await pge_fundamentos.pdf({path:`app/services/fundamento.pdf`,format:"letter"});

    // genera pedido

    await page.goto(__dirname+'/orden_compra/pedido.htm',{waitUntil:"networkidle2"});
    
    

    const pge_pedido = await purchase_order_pedido_to_pdf(page,unit_data, provider_data, order_data);
    await pge_pedido.pdf({path:`app/services/pedido.pdf`,format:"letter"});


    await browser.close();


    var merger = new PDFmerger();

    /*(async ()=>{
        await merger.add("app/services/portada.pdf");
        await merger.add("app/services/fundamento.pdf");
        await merger.add("app/services/pedido.pdf");
        await merger.save("app/services/orden_de_compra.pdf")

    });*/
    (async()=>{
        merger.add("app/services/portada.pdf");
        merger.add("app/services/fundamento.pdf");
        merger.add("app/services/pedido.pdf");
        merger.save("app/controllers/orden_de_compra.pdf")
    })();
    return {};


}

async function service_order_topdf(unit_data, provider_data, order_data){
    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    //genera portada

    await page.goto(__dirname+'/orden_servicio/portada.htm',{waitUntil:"networkidle2"});
    const page_portada = await service_order_portada_to_pdf(page,unit_data, provider_data,order_data);
    await page_portada.pdf({path:`app/services/portada.pdf`, format:"letter"});

    // genera desarrollo

    await page.goto(__dirname+'/orden_servicio/desarrollo.htm',{waitUntil:"networkidle2"});
    const page_desarrollo = await service_order_desarrollo_to_pdf(page, unit_data, provider_data, order_data);
    await page_desarrollo.pdf({path:`app/services/desarrollo.pdf`,format:"letter"});

    // genera fundamentacion

    await page.goto(__dirname+'/orden_servicio/fundamento.htm',{waitUntil:"networkidle2"});
    const page_fundamento = await service_order_fundamento_to_pdf(page, unit_data, provider_data, order_data);
    await page_fundamento.pdf({path:"app/services/fundamento.pdf",format:"letter"});

    //genera acta de entrega 

    await page.goto(__dirname+'/orden_servicio/acta_entrega.htm',{waitUntil:"networkidle2"});
    const page_acta = await service_order_acta_entrega_to_pdf(page, unit_data, provider_data, order_data);
    await page_acta.pdf({path:'app/services/acta_entrega.pdf',format:"letter"});

    await browser.close();

    var merger = new PDFmerger();

    (async()=>{
        merger.add("app/services/portada.pdf");
        merger.add("app/services/desarrollo.pdf");
        merger.add("app/services/fundamento.pdf");
        merger.add("app/services/acta_entrega.pdf");
        merger.save("app/controllers/orden_de_servicio.pdf");
    })();
    return{};
}

module.exports={
    purchase_order_topdf,
    service_order_topdf,
}











