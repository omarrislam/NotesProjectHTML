const app=require('express').Router()
const userModel=require('../models/user.model')
const bcrypt=require('bcrypt')
const validation=require('../validation/login.validation')
const auth =require('../middleware/auth')


app.get('/login',auth.login,(req,res)=>{ 
res.render('login.ejs',{exists:req.flash('exists'),wpass:req.flash('wpass'),oldInputs:req.flash('oldInputs'),isLoggedin:false})
})

app.post('/handleSignin',validation,async(req,res)=>{
    const {email,password}=req.body
    let data= await userModel.findOne({email})
    if(data){
       const match= await bcrypt.compare(password,data.password)
       if(match){
           req.session.isLoggedin=true
           req.session.userID=data._id
           res.redirect('/home')
       }else{
           req.flash('wpass',true)
        res.redirect('/login')

       }
    }else{
        console.log('account doesnt exists');
        req.flash('oldInputs',{email,password})
        req.flash('exists',true)
        res.redirect('/login')

    }
})

module.exports=app

