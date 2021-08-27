const mongoose=require('mongoose')

const noteSchema=mongoose.Schema({
    title:String,
    desc:String,
    userID:mongoose.Schema.Types.ObjectId
})

module.exports=mongoose.model('note',noteSchema)