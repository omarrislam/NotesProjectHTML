const express = require('express')
const app = express()
const port = 3000
const path=require('path')
const mongoose=require('mongoose')
const session=require('express-session')
const flash = require('connect-flash');
var MongoDBStore = require('connect-mongodb-session')(session)
app.use(flash())
var store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/noteshtml',
    collection: 'mySessions'
}); 
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store
}))

mongoose.connect('mongodb://localhost:27017/noteshtml',{useUnifiedTopology:true, useNewUrlParser:true})
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:false}))
app.set('view engine','ejs')
app.use(require('./routes/register.routes'))
app.use(require('./routes/index.routes'))
app.use(require('./routes/login.routes'))
app.listen(port, () => console.log(`Example app listening on port port!`))