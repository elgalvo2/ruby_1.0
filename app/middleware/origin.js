const checkOrigin = (req,res,next) =>{
    // todo origen
    const token = req.headers.authorization.split(" ").pop() // authorization : 123456 <= este es el ejemplo de un header con la prop de autoization... ej-: {authorization : bearer 1234567}
    if(token === '123456'){
        next();
    }else{
        res.statu(409)
        res.send({error:'tu por aqui no tiene negocio...'})
    }
}

module.exports = checkOrigin