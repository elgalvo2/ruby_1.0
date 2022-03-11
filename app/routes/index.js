const express = require('express');
const router = express.Router();

const fs = require('fs');

const pathRouther = `${__dirname}`

const removeExtension = (fileName) => {

    return fileName.split('.').shift();
}

fs.readdirSync(pathRouther).filter((file) => {
    const fileWithOutExt = removeExtension(file);
    const skip = ['index','esp_3266_files'].includes(fileWithOutExt);
    if (!skip) {
        if (fileWithOutExt == 'pdf_generator_linux' && process.env.OP == 'linux') {
            router.use(`/pdf_generator`, require(`./${fileWithOutExt}`));
            console.log('cargar ruta', fileWithOutExt)
        } else if (fileWithOutExt == 'pdf_generator_linux' && process.env.OP != 'linux') {
            console.log('ruta pdf_generator_linux no cargada')
        } else if (fileWithOutExt == 'pdf_generator' && process.env.OP == 'windows') {
            router.use(`/${fileWithOutExt}`, require(`./${fileWithOutExt}`));
            console.log('cargar ruta', fileWithOutExt);
        } else if (fileWithOutExt == 'pdf_generator' && process.env.OP != 'windows'){
            console.log('ruta pdf_generator no cargada')
        }else if(fileWithOutExt == 'task_relations_linux' && process.env.OP == 'linux'){
            router.use('/task_relations',require(`./${fileWithOutExt}`));
            console.log('cargar ruta ', fileWithOutExt)
        }else if(fileWithOutExt == 'task_relations_linux' && process.env.OP != 'linux'){
            console.log('ruta task_relations_linux no cargada')
        }else if(fileWithOutExt == 'task_relations' && process.env.OP == 'windows'){
            router.use(`/${fileWithOutExt}`,require(`./${fileWithOutExt}`))
            console.log('vargar ruta', fileWithOutExt)
        }else if(fileWithOutExt==='task_relations' && process.env.OP != 'windows'){
            console.log('ruta task_relation no cargada')
        }else{
            router.use(`/${fileWithOutExt}`, require(`./${fileWithOutExt}`));
            console.log('cargar ruta', fileWithOutExt)
        }
    }
    console.log('---->', removeExtension(file));
});

router.use('*', (req, res) => {
    res.status(404);
    res.send({ error: 'Not Found' });
})


module.exports = router;
