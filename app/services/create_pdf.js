async function purchase_order_pedido_to_pdf(page,unit,provider,order){
    await page.evaluate((unit,provider,order)=>{
        

        document.getElementById('fecha_in').textContent=order.fecha_inicio;
        document.getElementById("orden_compra").textContent=order.orden_id;
        document.getElementById("unidad").textContent=unit.inmueble;
        document.getElementById("tel_unidad").textContent=unit.telefono;
        document.getElementById("razon_social").textContent=provider.razon_social;
        document.getElementById("tel_proveedor").textContent=provider.telefono;
        document.getElementById("representante").textContent=provider.rep_legal;

        order.articulos.map((art,index)=>{
            document.getElementById("mark").insertAdjacentHTML("beforebegin",
            `<tr>
                <td>${index+1}</td> <td>${art.descripcion}</td> <td>${art.cantidad} ${art.unidad}(s)</td> <td>${order.fecha_termino}</td>
            </tr>
            `)
        });
        document.getElementById("ing").textContent=unit.jefe_conservacion;
        document.getElementById("adm").textContent=unit.administrador;
        document.getElementById("dir").textContent=unit.director;

    },unit,provider, order)
    return page;
}





async function purchase_order_fundamentos_to_pdf(page,unit,provider, order){
    console.log('entra aqui 0')
   
    await page.evaluate((unit, provider, order)=>{


        document.getElementById('orden_compra').textContent=order.orden_id;
        document.getElementById('fecha_dic').textContent=order.fecha_inicio;
        document.getElementById("localidad").textContent=unit.localidad;
        document.getElementById('unidad').textContent=unit.inmueble;
        document.getElementById('ubicacion').textContent=unit.domicilio;
        document.getElementById('objeto_contra').textContent=order.uso;
        document.getElementById("prestador_servicio").textContent=provider.razon_social;
        document.getElementById("rep_legal").textContent=provider.rep_legal;


        document.getElementById("importe_sin_iva").textContent='$'+order.importe_no_iva;
        document.getElementById('text_antecedente').textContent=order.texto_antecedente;
        document.getElementById('text_consideraciones').textContent=order.texto_consideraciones;
        document.getElementById("pres_servicio").textContent=provider.razon_social;
        document.getElementById("importe_iva").textContent=order.importe_iva;
        document.getElementById('importe_iva_letra').textContent=order.importe_texto;
        document.getElementById('fecha_in').textContent=order.fecha_inicio;
        document.getElementById('fecha_ter').textContent=order.fecha_termino;
        document.getElementById('plazo_entrega').textContent=order.plazo_entrega;
        document.getElementById('placito').textContent=order.plazo_entrega;
        document.getElementById('ing').textContent=unit.jefe_conservacion;
        document.getElementById('dir').textContent=unit.director;

    },unit,provider, order)
    return page;
}

async function purchase_order_portada_to_pdf(page,unit,provider, order){

    console.log(order)

    await page.evaluate((unit, provider, order)=>{// talves el nombre de lor argumentos tiene que cooincidir con el de los heredados 

        document.getElementById("orden_compra").textContent=order.orden_id;

        /*left data*/ 
        document.getElementById("razon_social").textContent=provider.razon_social;
        document.getElementById("no_proveedor").textContent=provider.no_proveedor;
        document.getElementById("rfc").textContent=provider.rfc;
        document.getElementById("rep_legal").textContent=provider.rep_legal;
        document.getElementById("dom_tel").textContent=provider.domicilio+' '+provider.telefono;
    
        /*right Data*/
        document.getElementById("aut_num").textContent=order.autorizacion_id;
        document.getElementById("fund_ad").textContent=order.fundamento_adjudicacion;
        document.getElementById("imp_final_iva").textContent+=order.importe_iva;
        document.getElementById("fecha_in").textContent=order.fecha_in;
        document.getElementById("fecha_fin").textContent=order.fecha_termino;
    
        /*unit data*/
        document.getElementById("circuns_1").textContent = unit.circunscripcion[0];
        document.getElementById("circuns_2").textContent = unit.circunscripcion[1];
    
        document.getElementById("local").textContent=unit.localidad;
        document.getElementById("inmu").textContent=unit.inmueble;
        document.getElementById("dom").textContent=unit.domicilio;
        document.getElementById("ui").textContent=unit.unidad_informacion;
        document.getElementById("cc").textContent= unit.centro_costos;
    
        document.getElementById("pp_1").textContent=order.partida_presu[0];
        document.getElementById("pp_2").textContent=order.partida_presu[1];
    
        document.getElementById("esp_1").textContent=order.especialidad[0];
        document.getElementById("esp_2").textContent=order.especialidad[1];
    
        document.getElementById("sub_1").textContent=order.sub_especialidad[0];
        document.getElementById("sub_2").textContent=order.sub_especialidad[1];
    
        /*Articulos del pedido*/
    
    
        order.articulos.map((el,index)=>{
            console.log('se ejecuta hasta aqui')
            document.getElementById("subtotal").insertAdjacentHTML("beforebegin",
            `<tr><td>${index+1}</td><td>${el.cantidad}</td><td>${el.unidad}</td><td>${el.descripcion}</td><td>$${el.precio_unitario}</td><td>$${el.importe}</td></tr>`
            )
            
        });

        
        
        document.getElementById("cant_subtotal").textContent="$"+order.importe_no_iva;
        document.getElementById("cant_iva").textContent="$"+order.iva;
        document.getElementById("cant_total").textContent="$"+order.importe_iva;
    
    
        /*Firmas*/
    
        document.getElementById("ing").textContent=unit.jefe_conservacion;
        document.getElementById("dir").textContent=unit.director;
        document.getElementById("adm").textContent=unit.administrador;
        document.getElementById("titulo_alt").textContent=order.firmador_alt[0];
        document.getElementById("alt").textContent=order.firmador_alt[1];
    
    },unit,provider, order)

    return page;
}


module.exports = {
    purchase_order_portada_to_pdf,
    purchase_order_fundamentos_to_pdf,
    purchase_order_pedido_to_pdf
};