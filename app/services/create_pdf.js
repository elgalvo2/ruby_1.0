async function purchase_order_pedido_to_pdf(page, unit, provider, order) {
    await page.evaluate((unit, provider, order) => {


        document.getElementById('fecha_in').textContent = order.fecha_inicio;
        document.getElementById("orden_compra").textContent = order.orden_id;
        document.getElementById("unidad").textContent = unit.inmueble;
        document.getElementById("tel_unidad").textContent = unit.telefono_inmu;
        document.getElementById("razon_social").textContent = provider.razon_social;
        document.getElementById("tel_proveedor").textContent = provider.telefono_prov;
        document.getElementById("representante").textContent = provider.rep_legal;

        order.articulos.map((art, index) => {
            document.getElementById("mark").insertAdjacentHTML("beforebegin",
                `<tr>
                <td>${index + 1}</td> <td>${art.descripcion}</td> <td>${art.cantidad} ${art.unidad}(s)</td> <td>${order.fecha_termino}</td>
            </tr>
            `)
        });
        document.getElementById("ing").textContent = unit.jefe_conservacion;
        document.getElementById("adm").textContent = unit.administrador;
        document.getElementById("dir").textContent = unit.director;

    }, unit, provider, order)
    return page;
}

async function purchase_order_fundamentos_to_pdf(page, unit, provider, order) {
    

    await page.evaluate((unit, provider, order) => {


        document.getElementById('orden_compra').textContent = order.orden_id;
        document.getElementById('fecha_dic').textContent = order.fecha_inicio;
        document.getElementById("localidad").textContent = unit.localidad;
        document.getElementById('unidad').textContent = unit.inmueble;
        document.getElementById('ubicacion').textContent = unit.domicilio_inmu;
        document.getElementById('objeto_contra').textContent = order.uso;
        document.getElementById("prestador_servicio").textContent = provider.razon_social;
        document.getElementById("rep_legal").textContent = provider.rep_legal;


        document.getElementById("importe_sin_iva").textContent = '$' + order.importe_no_iva;
        document.getElementById('text_antecedente').textContent = order.texto_antecedente;
        document.getElementById('text_consideraciones').textContent = order.texto_consideraciones;
        document.getElementById("pres_servicio").textContent = provider.razon_social;
        document.getElementById("importe_iva").textContent = order.importe_iva;
        document.getElementById('importe_iva_letra').textContent = order.importe_texto;
        document.getElementById('fecha_in').textContent = order.fecha_inicio;
        document.getElementById('fecha_ter').textContent = order.fecha_termino;
        document.getElementById('plazo_entrega').textContent = order.plazo_entrega;
        document.getElementById('placito').textContent = order.plazo_entrega;
        document.getElementById('ing').textContent = unit.jefe_conservacion;
        document.getElementById('dir').textContent = unit.director;

    }, unit, provider, order)
    return page;
}

async function purchase_order_portada_to_pdf(page, unit, provider, order) {

    


    await page.evaluate((unit, provider, order) => {// talves el nombre de lor argumentos tiene que cooincidir con el de los heredados 

        

        document.getElementById("orden_compra").textContent = order.orden_id;

        /*left data*/
        document.getElementById("razon_social").textContent = provider.razon_social;
        document.getElementById("no_proveedor").textContent = provider.no_proveedor;
        document.getElementById("rfc").textContent = provider.rfc;
        document.getElementById("rep_legal").textContent = provider.rep_legal;
        document.getElementById("dom_tel").textContent = provider.domicilio_prov + ' ' + provider.telefono_prov;

        

        /*right Data*/
        document.getElementById("aut_num").textContent = order.autorizacion_id;
        document.getElementById("fund_ad").textContent = order.fundamento_adjudicacion;
        document.getElementById("imp_final_iva").textContent += order.importe_iva;
        document.getElementById("fecha_in").textContent = order.fecha_inicio;
        document.getElementById("fecha_fin").textContent = order.fecha_termino;

        /*unit data*/
        document.getElementById("circuns_1").textContent = unit.circunscripcion[0];
        document.getElementById("circuns_2").textContent = unit.circunscripcion[1];

        document.getElementById("local").textContent = unit.localidad;
        document.getElementById("inmu").textContent = unit.inmueble;
        document.getElementById("dom").textContent = unit.domicilio_inmu;
        document.getElementById("ui").textContent = unit.unidad_informacion;
        document.getElementById("cc").textContent = unit.centro_costos;

        
        document.getElementById("pp_1").textContent = order.partida_presu[0];
        document.getElementById("pp_2").textContent = order.partida_presu[1];

        document.getElementById("esp_1").textContent = order.especialidad[0];
        document.getElementById("esp_2").textContent = order.especialidad[1];

        document.getElementById("sub_1").textContent = order.sub_especialidad[0];
        document.getElementById("sub_2").textContent = order.sub_especialidad[1];

        /*Articulos del pedido*/

        

        order.articulos.map((el, index) => {
            console.log('se ejecuta hasta aqui')
            document.getElementById("subtotal").insertAdjacentHTML("beforebegin",
                `<tr><td>${index + 1}</td><td>${el.cantidad}</td><td>${el.unidad}</td><td>${el.descripcion}</td><td>$${el.precio_unitario}</td><td>$${el.importe}</td></tr>`
            )

        });



        document.getElementById("cant_subtotal").textContent = "$" + order.importe_no_iva;
        document.getElementById("cant_iva").textContent = "$" + order.iva;
        document.getElementById("cant_total").textContent = "$" + order.importe_iva;

        
        /*Firmas*/

        document.getElementById("ing").textContent = unit.jefe_conservacion;
        document.getElementById("dir").textContent = unit.director;
        document.getElementById("adm").textContent = unit.administrador;
        document.getElementById("titulo_alt").textContent = order.firmador_alt[0];
        document.getElementById("alt").textContent = order.firmador_alt[1];

    }, unit, provider, order)

    return page;
}


async function service_order_portada_to_pdf(page, unit, provider, order) {
    await page.evaluate((unit, provider, order) => {

        const d = (id, text) => {
            document.getElementById(id).innerText = text;
        }

        d('orden_servicio', order.orden_id);
        d('razon_social', provider.razon_social);
        d('no_proveedor', provider.no_proveedor);
        d('rfc', provider.rfc);
        d('rep_legal', provider.rep_legal);
        d('dom_tel', (provider.domicilio_prov + ' tel:' + provider.telefono_prov));
        d('aut_num', order.autorizacion_id);
        d('fund_ad', order.fundamento_adjudicacion)
        d('imp_final_iva', '$' + order.importe_iva);
        d('fecha_in', order.fecha_inicio);
        d('fecha_fin', order.fecha_termino);



        //unit data
        d('circuns_1', unit.circunscripcion[0]);
        d('circuns_2', unit.circunscripcion[1]);
        d('local', unit.localidad);
        d('inmu', unit.inmueble);
        d('dom', unit.domicilio_inmu);
        d('ui', unit.unidad_informacion);
        d('cc', unit.centro_costos);
        d('pp_1', order.partida_presu[0]);
        d('pp_2', order.partida_presu[1]);
        d('esp_1', order.especialidad[0]);
        d('esp_2', order.especialidad[1]);
        d('sub_1', order.sub_especialidad[0]);
        d('sub_2', order.sub_especialidad[1]);

        //detalles
        d('uso_', order.uso);
        d('importe_subtotal', '$' + order.importe_no_iva);
        d('impo_final', '$' + order.importe_iva);


        //people
        d('ing', unit.jefe_conservacion);
        d('dir', unit.director);
        d('adm', unit.administrador);

    }, unit, provider, order)

    return page
}

async function service_order_desarrollo_to_pdf(page, unit, provider, order) {

    await page.evaluate((unit, provider, order) => {

        console.log('1')
        //documento info izquierda

        const d = (id, text) => {
            document.getElementById(id).innerText = text;
        }

        d('orden_servicio', order.orden_id);
        d('lugar_fecha', unit.circunscripcion[1] + ', ' + unit.localidad + ' ' + order.fecha_inicio)
        d('uso_', order.uso);
        d('razon_social', provider.razon_social);
        d('rfc', provider.rfc);
        d('domicilio_prov', provider.domicilio_prov);
        d('nom_unidad', unit.inmueble);
        d('fecha_ini', order.fecha_inicio);
        d('fecha_fin', order.fecha_termino);


        console.log('1')

        order.articulos.map((serv) => {
            console.log('ejecutando')
            document.getElementById('tota').insertAdjacentHTML('beforebegin',
                `<tr class='table_body'><td>${serv.partida}</td><td>${serv.descripcion}</td><td>${serv.unidad}</td><td>${serv.cantidad}</td><td>${serv.cantidad}</td><td>$${serv.precio_unitario}</td><td>$${serv.precio_unitario}</td><td>$${serv.importe}</td><td>$${serv.importe}</td></tr>`
            )
        })


        d('sub_tota', '$' + order.importe_no_iva);
        d('sub_tota_2', '$' + order.importe_no_iva);

        d('totl', '$' + order.importe_iva);
        d('totl_2', '$' + order.importe_iva);

        d('iva', '$' + order.iva);
        d('iva_2', '$' + order.iva)

        //firmas

        d('razon_so', provider.razon_social);
        d('ing', unit.jefe_conservacion);


        d('encargado_unidad', unit.director);

    }, unit, provider, order)
    return page;
}

async function service_order_fundamento_to_pdf(page, unit, provider, order) {
    await page.evaluate((unit, provider, order) => {


        const d = (id, text) => {
            document.getElementById(id).innerText = text;
        }

        d('orden_servicio', order.orden_id);
        d('fecha_dic', order.fecha_inicio);
        d('localidad', unit.localidad);
        d('unidad', unit.inmueble);
        d('ubicacion', unit.domicilio_inmu);
        d('objeto_contra', order.uso);
        d('prestador_servicio', provider.razon_social);
        d('rep_legal', provider.rep_legal);
        d('importe_sin_iva', order.importe_no_iva);
        d('plazo_entrega', order.plazo_entrega);
        d('text_antecedente', order.texto_antecedente);
        d('text_consideraciones', order.texto_consideraciones);

        d('fund_adjudicacion', order.fundamento_adjudicacion)
        d('pres_servicio', provider.razon_social);
        d('importe_iva', order.importe_iva);
        d('importe_iva_letra', order.importe_texto);
        d('placito', order.plazo_entrega);
        d('fecha_in', order.fecha_inicio);
        d('fecha_ter', order.fecha_termino);

        d('ing', unit.jefe_conservacion);
        d('dir', unit.director)


    }, unit, provider, order)
    return page;
}

async function service_order_acta_entrega_to_pdf(page, unit, provider, order) {
    await page.evaluate((unit, provider, order) => {

        const d = (id, text) => {
            document.getElementById(id).innerText = text;
        }

        d('num_servicio', order.orden_id);
        d('hora_acta', order.hora_acta);
        d("fecha_termino_acta", order.fecha_inicio)
        d('inmueble_acta', unit.inmueble);
        d('dir_inmu_acta', unit.domicilio_inmu);
        d('prov_acta', provider.razon_social);
        d('fecha_inicio_acta', order.fecha_inicio);
        d('orden_serv_acta', order.orden_id);
        d('uso_acta', order.uso);
        d('dir_inmueble_acta_2', unit.domicilio_inmu);
        d('importe_sin_iva', order.importe_no_iva);
        d('fecha_inicio_acta_2', order.fecha_inicio);
        d('importe_sin_iva_letra', order.subtotal_text);
        d('fecha_inicio_acta_2', order.fecha_inicio);
        d('fecha_termino_acta_2', order.fecha_termino);
        d('orden_servicio_acta_2', order.orden_id);

        d('prov_rep_legal', provider.rep_legal);

        d('institucion_interesado_extra', unit.inmueble);
        d('nombre_interesado_extra', unit.director);
    }, unit, provider, order)
    return page;
}


module.exports = {
    purchase_order_portada_to_pdf,
    purchase_order_fundamentos_to_pdf,
    purchase_order_pedido_to_pdf,
    service_order_portada_to_pdf,
    service_order_desarrollo_to_pdf,
    service_order_fundamento_to_pdf,
    service_order_acta_entrega_to_pdf,

};