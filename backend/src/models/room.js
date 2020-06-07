const mongoose= require("mongoose")
const validator=require("validator")
const schema= mongoose.Schema({
    title:{
        type:"String",
        required:true,
        unique:true,
        trim:true,
        index:true
    },
    description:{
        type:"String",
        default:"Itni shanti kyu hai???"
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    members:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ]
})

schema.methods.isOwner= function(user){
    return this.owner.equals(user._id)
}

const Room = new mongoose.model('Room',schema)

module.exports=Room