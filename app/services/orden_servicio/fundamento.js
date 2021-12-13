


const d=(id,text)=>{
    document.getElementById(id).innerText=text;
}

d('orden_servicio',order.orden_id);
d('fecha_dic',order.fecha_inicio);
d('localidad',unit.localidad);
d('unidad',unit.inmueble);
d('ubicacion', unit.domicilio_inmu);
d('objeto_contra',order.uso);
d('prestador_servicio',provider.rfc);
d('rep_legal',provider.rep_legal);
d('importe_sin_iva', order.importe_no_iva);
d('plazo_entrega',order.plazo_entrega);
d('text_antecedente',order.texto_antecedente);
d('text_consideraciones',order.texto_consideraciones);

d('fund_adjudicacion',order.fundamento_adjudicacion)
d('pres_servicio',provider.rfc);
d('importe_iva',order.importe_iva);
d('importe_iva_letra',order.importe_texto);
d('placito',order.plazo_entrega);
d('fecha_in',order.fecha_inicio);
d('fecha_ter',order.fecha_termino);

d('ing',unit.jefe_conservacion);
d('dir',unit.director)

