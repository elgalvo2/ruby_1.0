

//documento info izquierda

const d=(id,text)=>{
    document.getElementById(id).innerText=text;
}

d('orden_servicio',order.orden_id);
d('lugar_fecha',unit.circunscripcion[1]+', '+unit.localidad+' '+order.fecha_inicio)
d('uso_',order.uso);
d('razon_social',provider.razon_social);
d('rfc',provider.rfc);
d('domicilio_prov',provider.domicilio_prov);
d('nom_unidad',unit.inmueble);
d('fecha_ini',order.fecha_inicio);
d('fecha_fin',order.fecha_termino);

order.servicios.map((serv)=>{
    console.log('ejecutando')
    document.getElementById('tota').insertAdjacentHTML('beforebegin',
        `<tr class='table_body'><td>${serv.partida}</td><td>${serv.descripcion}</td><td>${serv.unidad}</td><td>${serv.cantidad}</td><td>${serv.cantidad}</td><td>$${serv.precio_unitario}</td><td>$${serv.precio_unitario}</td><td>$${serv.importe}</td><td>$${serv.importe}</td></tr>`
    )
})


d('sub_tota','$'+order.importe_no_iva);
d('sub_tota_2','$'+order.importe_no_iva);

d('totl','$'+order.importe_iva);
d('totl_2','$'+order.importe_no_iva);

d('iva','$'+order.iva);
d('iva_2','$'+order.iva)

//firmas

d('razon_so',provider.razon_social);
d('ing',unit.jefe_conservacion);


d('encargado_unidad',unit.director);
