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
    private:{
        type:"Boolean",
        default:false
    },
    invites:[
        {
            type:"String",
            validate:function(value){
                if(!validator.isEmail(value))
                    throw new Error("Invalid email provided")
            }
        }
    ],
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