const mongoose = require("mongoose");
// const { schema } = require("./message");
const Message= require("./message.js");
const { report } = require("../routers/rooms.js");
const channelSchema = new mongoose.Schema({
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: true
    },
    title: {
        type: String,
        trim:true,
        required: true,
    },
    description: {
        type: String
    },
    //message that are impt can be seen at the top : addtional functionality
    /*sticky: {
        type: Schema.ObjectId,
        ref: 'Message',
    },*/
    closed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
channelSchema.statics.getAllMessages= async function(id,user){
        var messages = await Message.find({
            channel: id,
        })
        var msgs=[]
        for(var i=0;i<messages.length;i++)
        {
            var message= messages[i]
            await message.populate('owner').execPopulate()
            var reported=false||message.isReported
            if(message.reports.includes(user._id))
                reported=true
            msgs.push({
                _id:message._id,
                content:message.content,
                type:message.type,
                owner:message.owner.username,
                createdAt:message.createdAt,
                isReported:reported
            })

        }
        return msgs
}

const Channel = mongoose.model('Channel', channelSchema)

module.exports=Channel