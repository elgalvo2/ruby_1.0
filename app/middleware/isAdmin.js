function isAdmin(req,res,next){
    const user = req.user;

    if(user.role!='ADMIN' || user.role!='SUDO'){
        res.status(403).send({success:false, message:"You don't Have credentials"});
    }

    next();

}