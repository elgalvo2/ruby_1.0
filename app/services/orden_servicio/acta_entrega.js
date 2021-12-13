
order={
    
    "orden_id":"OS21R02067",
    "autorizacion_id":"",
    "fundamento_adjudicacion":"Ley laassp, ART 42",
    "uso":"Refacion para instalacion de equipo de aire acondicionado tipo dividido de consultrio de nutrición",
    "texto_antecedente":"orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    "texto_consideraciones":"orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    "importe_texto":"#####################################",
    "subtotal_text":"###FASDF #### FASDFSFA SDFD FAS 00/100 M.n.",
    "importe_iva":"2204.01",
    "importe_no_iva":"1900.01",
    "iva":"304.00",
    "fecha_inicio":"03/06/2021",
    "fecha_termino":"03/06/2021",
    "partida_presu":["42062530","Refacciones y accesorios menores de maquinaria y otros equipos"],
    "especialidad":["05","Aire Acondicionado"],
    "sub_especialidad":["01","Aire Acondicionado"],
    "firmador_alt":["",""],
    "servicios":[{
        "partida":"2506",
        "descripcion":"Mantenimiento de tratamiento de agua de alberca de la unidad deportiva del IMMS (incluye materiales, productos químicos y mano de obra). Durante el periodo comprendido dia 01 de octubre al 31 de octubre del 2021",
        "unidad":"Serv",
        "cantidad":"1",
        "precio_unitario":"20,600.01",
        "importe":"20,600.01"
    },{
      
        "partida":"2506",
        "descripcion":"Mantenimiento de tratamiento de agua de alberca de la unidad deportiva del IMMS (incluye materiales, productos químicos y mano de obra). Durante el periodo comprendido dia 01 de octubre al 31 de octubre del 2021",
        "unidad":"Serv",
        "cantidad":"1",
        "precio_unitario":"20,600.01",
        "importe":"20,600.01"
    },{
        "partida":"2505",
        "descripcion":"Mantenimiento preventivo a bomba de agua, incluye agua y bomba y cosas por el estilo ggg :*",
        "unidad":"Serv",
        "cantidad":"2",
        "precio_unitario":"27,600.01",
        "importe":"27,600.01"
    },{
        "partida":"2505",
        "descripcion":"Mantenimiento preventivo a bomba de agua, incluye agua y bomba y cosas por el estilo ggg :*",
        "unidad":"Serv",
        "cantidad":"2",
        "precio_unitario":"27,600.01",
        "importe":"27,600.01"
    }],
    "plazo_entrega":"2",
    "hora_acta":'11:00',
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

const d = (id,text)=>{
    document.getElementById(id).innerText=text;
}

d('num_servicio',order.orden_id);
d('hora_acta',order.hora_acta);
d("fecha_termino_acta",order.fecha_inicio)
d('inmueble_acta',unit.inmueble);
d('dir_inmu_acta',unit.domicilio_inmu);
d('prov_acta',provider.razon_social);
d('fecha_inicio_acta',order.fecha_inicio);
d('orden_serv_acta',order.orden_id);
d('uso_acta',order.uso);
d('dir_inmueble_acta_2',unit.domicilio_inmu);
d('importe_sin_iva',order.importe_no_iva);
d('fecha_inicio_acta_2',order.fecha_inicio);
d('importe_sin_iva_letra',order.subtotal_text);
d('fecha_inicio_acta_2',order.fecha_inicio);
d('fecha_termino_acta_2',order.fecha_termino);
d('orden_servicio_acta_2',order.orden_id);

d('prov_rep_legal',provider.rep_legal);

d('institucion_interesado_extra',unit.inmueble);
d('nombre_interesado_extra',unit.director);