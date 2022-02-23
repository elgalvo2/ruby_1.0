

function isAdmin(req,res,next){
    const user = req.user;


    console.log(typeof(user.role));

    if(user.role!='ADMIN' && user.role!='SUDO'){
        res.status(403).send({success:false, message:"You don't Have credentials"});
    }else{
        next();
    }


}

module.exports = isAdmin;
