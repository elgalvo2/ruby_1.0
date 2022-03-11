const puppeteer = require('puppeteer');
const PDFmerger = require('pdf-merger-js');
const fs = require('fs');

const { 
    purchase_order_portada_to_pdf,
    purchase_order_fundamentos_to_pdf,
    purchase_order_pedido_to_pdf,
    service_order_portada_to_pdf,
    service_order_desarrollo_to_pdf,
    service_order_fundamento_to_pdf,
    service_order_acta_entrega_to_pdf,
 } = require('./create_pdf_linux.js');



async function order_data_topdf(unit_data, provider_data, order_data) {

     


    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/google-chrome',
    });

    const page = await browser.newPage();

    const portada = fs.readFileSync(__dirname + '/orden_compra/portada.htm', 'utf-8');
    const fundamento = fs.readFileSync(__dirname + "/orden_compra/fundamento.htm", 'utf-8');
    const pedido = fs.readFileSync(__dirname + '/orden_compra/pedido.htm', 'utf-8');

    //genera portada

    await page.setContent(portada, { waitUntil: ['load', "networkidle2"] });

    const pge_portada = await purchase_order_portada_to_pdf(page, unit_data, provider_data, order_data);
    await pge_portada.pdf({ path: `app/services/portada.pdf`, format: "letter" });

    // genera fundamentos

    await page.setContent(fundamento, { waitUntil: ['load', "networkidle2"] });

    const pge_fundamentos = await purchase_order_fundamentos_to_pdf(page, unit_data, provider_data, order_data)
    await pge_fundamentos.pdf({ path: `app/services/fundamento.pdf`, format: "letter" });

    // genera pedido

    await page.setContent(pedido, { waitUntil: ['load', "networkidle2"] });


    const pge_pedido = await purchase_order_pedido_to_pdf(page, unit_data, provider_data, order_data);
    await pge_pedido.pdf({ path: `app/services/pedido.pdf`, format: "letter" });


    await browser.close();


    var merger = new PDFmerger();

    /*(async ()=>{
        await merger.add("app/services/portada.pdf");
        await merger.add("app/services/fundamento.pdf");
        await merger.add("app/services/pedido.pdf");
        await merger.save("app/services/orden_de_compra.pdf")

    });*/
    (async () => {
        merger.add("app/services/portada.pdf");
        merger.add("app/services/fundamento.pdf");
        merger.add("app/services/pedido.pdf");
        await merger.save("app/controllers/orden_de_compra.pdf")
    })();
    return {};


}

async function service_order_topdf(unit_data, provider_data, order_data){
    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/google-chrome',
    });


    const page = await browser.newPage();

    const portada = fs.readFileSync(__dirname + '/orden_servicio/portada.htm', 'utf-8');
    const fundamento = fs.readFileSync(__dirname + "/orden_servicio/fundamento.htm", 'utf-8');
    const desarrollo = fs.readFileSync(__dirname + '/orden_servicio/desarrollo.htm', 'utf-8');
    const acta_entrega = fs.readFileSync(__dirname + '/orden_servicio/acta_entrega.htm', 'utf-8');

    //genera portada
    await page.setContent(portada, { waitUntil: ['load', "networkidle2"] });

    const pge_portada = await service_order_portada_to_pdf(page, unit_data, provider_data, order_data);
    await pge_portada.pdf({ path: `app/services/portada.pdf`, format: "letter" });

    // genera fundamentos

    await page.setContent(fundamento, { waitUntil: ['load', "networkidle2"] });

    const pge_fundamentos = await service_order_fundamento_to_pdf(page, unit_data, provider_data, order_data)
    await pge_fundamentos.pdf({ path: `app/services/fundamento.pdf`, format: "letter" });

    // genera pedido

    await page.setContent(desarrollo, { waitUntil: ['load', "networkidle2"] });


    const pge_desarrollo = await service_order_desarrollo_to_pdf(page, unit_data, provider_data, order_data);
    await pge_desarrollo.pdf({ path: `app/services/desarrollo.pdf`, format: "letter", landscape:true });

    await page.setContent(acta_entrega, { waitUntil: ['load', "networkidle2"] });


    const pge_acta_entrega = await service_order_acta_entrega_to_pdf(page, unit_data, provider_data, order_data);
    await pge_acta_entrega.pdf({ path: `app/services/acta_entrega.pdf`, format: "letter" });


    await browser.close();


    var merger = new PDFmerger();

    /*(async ()=>{
        await merger.add("app/services/portada.pdf");
        await merger.add("app/services/fundamento.pdf");
        await merger.add("app/services/pedido.pdf");
        await merger.save("app/services/orden_de_compra.pdf")

    });*/
    (async () => {
        merger.add("app/services/portada.pdf");
        merger.add("app/services/fundamento.pdf");
        merger.add("app/services/desarrollo.pdf");
        merger.add("app/services/acta_entrega.pdf");
        await merger.save("app/controllers/orden_de_servicio.pdf")
    })();
    return {};


}

module.exports = {
    order_data_topdf,
    service_order_topdf
}

