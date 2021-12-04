const httpError = (res,err)=>{
    console.log(err);
    res.status(500);
    res.send({error:'algo ocurrio'});
}


module.exports = httpError