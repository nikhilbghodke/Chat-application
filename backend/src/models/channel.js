const mongoose = require("mongoose");
const { schema } = require("./message");
const Message= require("./message.js")
const channelSchema = new mongoose.Schema({
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: true
    },
    title: {
        type: String,
        trim:true,
        required: true
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
channelSchema.statics.getAllMessages= async function(id){
        const messages = await Message.find({
            channel: id
        })
        for(var i=0;i<messages.length;i++)
        {
            var message= messages[i]
            await message.populate('owner').execPopulate()

        }
        return messages
}

const Channel = mongoose.model('Channel', channelSchema);

module.exports=Channel;