const { purchase_order_topdf, service_order_topdf } = require('../services/create_pdf_index')
const fs = require('fs');
const { setTimeout } = require('timers');

const get_purchase_order = (req, res) => {
    try {
        res.setHeader('Content-type', 'application/pdf; charset=utf-8');
        res.setHeader('Content-disposition', 'attachment; filename=orden_compra.js');
        const stats = fs.statSync(__dirname + '/orden_de_compra.pdf');

        var length = stats.size;
        console.log('length', length)
        res.setHeader('Content-length', length)


        res.download(__dirname + '/orden_de_compra.pdf');

    } catch (err) {
        res.status(500).send({ success: false, error: err })
    }


    /*

    var file = fs.createReadStream(__dirname+'/orden_de_compra.pdf')
    res.setHeader('Content-type','application/pdf; charset=utf-8',);
    res.setHeader('Content-disposition','attachment; filename=orden_compra.js');
    file.pipe(res);
    */
}

const get_service_order = (req, res) => {
    try {
        res.setHeader('Content-type', 'application/pdf; charset=utf-8');
        res.setHeader('Content-disposition', 'attachment; filename=orden_servicio.js');
        const stats = fs.statSync(__dirname + '/orden_de_servicio.pdf');

        var length = stats.size;
        console.log('length', length)
        res.setHeader('Content-length', length)


        res.download(__dirname + "/orden_de_servicio.pdf")


    } catch (err) {
        res.status(500).send({ success: false, error: err })
    }


    /*

    var file = fs.createReadStream(__dirname+'/orden_de_compra.pdf')
    res.setHeader('Content-type','application/pdf; charset=utf-8',);
    res.setHeader('Content-disposition','attachment; filename=orden_compra.js');
    file.pipe(res);
    */
}

const create_order = async (req, res) => {
    try {

        if (req.body.order.order_type=="") throw new Error('Es necesario especificar el tipo de orden que se creará')


        const unit_data = req.body.order.unit_data;
        const provider_data = req.body.order.provider_data;
        const order_data = req.body.order.order_data;
        if (req.body.order.order_type == "purchase_order") {
            await purchase_order_topdf(unit_data, provider_data, order_data);
            res.status(200).send({ success: true, data: null });
        } else if (req.body.order.order_type == 'service_order') {
            await service_order_topdf(unit_data, provider_data, order_data);
            res.status(200).send({ success: true, data: null });
        } else {
            throw new Error('No se ha especificado algun tipo de documento a crear...');
        }
    } catch (err) {
        console.log(err)
        res.status(500).send({ success: false, error: err })
    }
}

module.exports = { create_order, get_purchase_order, get_service_order };
