const app=require('express').Router()
const userModel=require('../models/user.model')
const bcrypt=require('bcrypt')
const validation =require('../validation/register.validation')
const { validationResult } = require('express-validator');

app.get('/',(req,res)=>{
res.render('register.ejs',{errors:req.flash('errors'),oldInputs:req.flash('oldInputs'),exists:req.flash('exists'),isLoggedin:false})
})

app.post('/handleSignUp',validation,async(req,res)=>{
    const {name,email,password}=req.body
    let errors=validationResult(req)
    // console.log(errors.array());
    if(errors.isEmpty()){
        let match =await userModel.findOne({email})
        if(match!=null){
         req.flash('exists',true)
        }else{
            bcrypt.hash(password,7,async (err,hash)=>{
             await userModel.insertMany({
                 name,email,password:hash
             })
            })
         
        }
    }else{
        req.flash('oldInputs',{name,email,password})
        req.flash('errors',errors.array()) 
        console.log('validation error');
        console.log(errors.array());
    }
    
    // console.log(req.body);
    res.redirect('/')
})
module.exports=app
