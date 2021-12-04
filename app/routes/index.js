const express = require('express');
const router = express.Router();

const fs = require('fs');

const pathRouther = `${__dirname}`

const removeExtension = (fileName) =>{
    
    return fileName.split('.').shift();
}

fs.readdirSync(pathRouther).filter((file)=>{
    const fileWithOutExt = removeExtension(file);
    const skip = ['index'].includes(fileWithOutExt);
    if(!skip){
        router.use(`/${fileWithOutExt}`,require(`./${fileWithOutExt}`));
        console.log('cargar ruta', fileWithOutExt);
    }
    console.log('---->',removeExtension(file));
});

router.use('*',(req,res)=>{
    res.status(404);
    res.send({error: 'Not Found'});
})


module.exports = router;