const app=require('express').Router()
const auth =require('../middleware/auth')
const noteModel=require('../models/note.model')
app.get('/home',auth.index,async(req,res)=>{
    let notes=await noteModel.find({userID:req.session.userID})
   // console.log(notes);
    res.render('index.ejs',{isLoggedin:req.session.isLoggedin,notes})
})

app.get('/logout',(req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/login')
    })
})
app.post('/addNote',async(req,res)=>{
    const {title,desc}=req.body
    await noteModel.insertMany({
        title,desc,userID:req.session.userID
    })
    res.redirect('/home')
})

app.post('/editNote',async(req,res)=>{
    const {title,desc}=req.body
    await noteModel.findByIdAndUpdate({_id:req.body.id},{title,desc})
    res.redirect('/home')
})

app.post('/delete',async(req,res)=>{
    console.log(req.body);
    await noteModel.findByIdAndDelete({_id:req.body.delete})
    res.redirect('/home')
})
module.exports=app