async function insertTaskInHtml(page,data){

    await page.evaluate((data)=>{

        const {technician_name, area_name, tasks} = data
        document.getElementById('area').innerText=area_name
        
        document.getElementById('tecnico').innerText=technician_name;
        let body = ''
        tasks.map((task,index)=>{
            if((index+1)%2==0){
                body+=`
            <div class="card">
                <div class="left">
                    <div class="head">
                        <div>
                            <p>Folio:</p>
                            <p class="folio">${task.folio}</p>
                        </div>
                        <div>
                            <p>Delegacion:</p>
                            <p >SINALOA</p>
                        </div>
                    </div>
        
                    <div>
                        <p>Jefatura de conservacion:</p>
                        <p >02</p>
                    </div>
        
                    <div>
                        <p>Area:</p>
                        <p class="localizacion">${area_name}</p>
                    </div>
        
                    <div>
                        <p>Tecnico:</p>
                        <p class="tecnico">${technician_name}</p>
                    </div>
        
                    <div>
                        <p>Fecha de creacion:</p>
                        <p class="fecha_creacion">${task.created_date}</p>
                    </div>
        
                    <div>
                        <p>Fecha de termino:</p>
                        <p class="fecha_termino"></p>
                    </div>
                </div>
                <div class="right">
                    <div>
                        <p>Descripcion del trabajo:</p>
                        <p class="descripcion_trabajo"></p>
                    </div>
                    <div>
                        <p>Materiales utilizados:</p>
                        <p class="materiales"></p>
                    </div>
                    <div class="footer">
        
                        <div>
                            <P>Nombre de quien recibe:</P>
                            <P class="recibe"></P>
                        </div>
                        <div>
                            <p>Firma:</p>
                            <p></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="page_break"></div>
            `
            }else{
                body+=`
            <div class="card">
                <div class="left">
                    <div class="head">
                        <div>
                            <p>Folio:</p>
                            <p class="folio">${task.folio}</p>
                        </div>
                        <div>
                            <p>Delegacion:</p>
                            <p >SINALOA</p>
                        </div>
                    </div>
        
                    <div>
                        <p>Jefatura de conservacion:</p>
                        <p >02</p>
                    </div>
        
                    <div>
                        <p>Area:</p>
                        <p class="localizacion">${area_name}</p>
                    </div>
        
                    <div>
                        <p>Tecnico:</p>
                        <p class="tecnico">${technician_name}</p>
                    </div>
        
                    <div>
                        <p>Fecha de creacion:</p>
                        <p class="fecha_creacion">${task.created_date}</p>
                    </div>
        
                    <div>
                        <p>Fecha de termino:</p>
                        <p class="fecha_termino"></p>
                    </div>
                </div>
                <div class="right">
                    <div>
                        <p>Descripcion del trabajo:</p>
                        <p class="descripcion_trabajo"></p>
                    </div>
                    <div>
                        <p>Materiales utilizados:</p>
                        <p class="materiales"></p>
                    </div>
                    <div class="footer">
        
                        <div>
                            <P>Nombre de quien recibe:</P>
                            <P class="recibe"></P>
                        </div>
                        <div>
                            <p>Firma:</p>
                            <p></p>
                        </div>
                    </div>
                </div>
            </div>`
            }
        })
        document.getElementById("data").innerHTML =body
    },data)
    return page
}

module.exports ={insertTaskInHtml}