module.exports.index=(req,res,next)=>{
    if(req.session.isLoggedin){
        next()
    }else{
        res.redirect('/login')
    }
}

module.exports.login=(req,res,next)=>{
    if(!req.session.isLoggedin){
        next()
    }else{
        res.redirect('/home')
    }
}