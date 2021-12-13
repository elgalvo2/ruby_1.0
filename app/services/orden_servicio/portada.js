order={
    
    "orden_id":"OS21R02067",
    "autorizacion_id":"",
    "fundamento_adjudicacion":"Ley laassp, ART 42",
    "uso":"Refacion para instalacion de equipo de aire acondicionado tipo dividido de consultrio de nutrición",
    "texto_antecedente":"orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    "texto_consideraciones":"orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    "importe_texto":"#####################################",
    "importe_iva":"2204.01",
    "importe_no_iva":"1900.01",
    "iva":"304.00",
    "fecha_inicio":"03/06/2021",
    "fecha_termino":"03/06/2021",
    "partida_presu":["42062530","Refacciones y accesorios menores de maquinaria y otros equipos"],
    "especialidad":["05","Aire Acondicionado"],
    "sub_especialidad":["01","Aire Acondicionado"],
    "firmador_alt":["",""],
    "articulos":[{
        "descripcion":"Bomba de drenaje condensado AC-110-220V",
        "unidad":"pieza",
        "cantidad":"1",
        "precio_unitario":"1,900.01",
        "importe":"2,240.01"
    },{
        "descripcion":"Bomba de drenaje condensado AC-110-220V",
        "unidad":"pieza",
        "cantidad":"1",
        "precio_unitario":"1,900.01",
        "importe":"2,240.01"
    },{
        "descripcion":"Bomba de drenaje condensado AC-110-220V",
        "unidad":"pieza",
        "cantidad":"1",
        "precio_unitario":"1,900.01",
        "importe":"2,240.01"
    }],
    "plazo_entrega":"2"
}   


provider={
    "razon_social":"Aristeo Garcia Gonzalez",
    "no_proveedor":"77714",
    "rfc":"GAGA-600912B87",
    "rep_legal":"Aristeo Garcia Gonzalez",
    "domicilio_prov":"Luis M Rojas #1311",
    "telefono_prov":"6671950725"
}

unit={
    "circunscripcion":["26","Sinaloa"],
    "localidad":"Culiacan",
    "inmueble":"IMSS UMF 36",
    "unidad_informacion":"262401",
    "centro_costos":"142902",
    "domicilio_inmu":"Bldv. Enrique Cabrera ####",
    "telefono":"750-20-90",
    "jefe_conservacion":"Ing. Jose Luis Casillas Bovio",
    "director":"Dr. Sergio Oswaldo Pacheco",
    "administrador":"Lic. Lizette Gallardo Piña"
}

const d=(id,text)=>{
    document.getElementById(id).innerText=text;
}

d('orden_servicio',order.orden_id);
d('razon_social',provider.razon_social);
d('no_proveedor',provider.no_proveedor);
d('rfc',provider.rfc);
d('rep_legal',provider.rep_legal);
d('dom_tel',(provider.domicilio_prov+' tel:'+provider.telefono_prov));
d('aut_num',order.autorizacion_id);
d('fund_ad',order.fundamento_adjudicacion)
d('imp_final_iva','$'+order.importe_iva);
d('fecha_in',order.fecha_inicio);
d('fecha_fin',order.fecha_termino);



//unit data
d('circuns_1',unit.circunscripcion[0]);
d('circuns_2',unit.circunscripcion[1]);
d('local',unit.localidad);
d('inmu',unit.inmueble);
d('dom',unit.domicilio_inmu);
d('ui',unit.unidad_informacion);
d('cc',unit.centro_costos);
d('pp_1',order.partida_presu[0]);
d('pp_2',order.partida_presu[1]);
d('esp_1',order.especialidad[0]);
d('esp_2',order.especialidad[1]);
d('sub_1',order.sub_especialidad[0]);
d('sub_2',order.sub_especialidad[1]);

//detalles
d('uso_',order.uso);
d('importe_subtotal','$'+order.importe_no_iva);
d('impo_final','$'+order.importe_iva);


//people
d('ing',unit.jefe_conservacion);
d('dir',unit.director);
d('adm',unit.administrador);
