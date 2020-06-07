const mongoose = require("mongoose");
const channelSchema = new mongoose.Schema({
    room: {
        type: mongoose.Types.ObjectId,
        ref: "Room",
        required: true
    },
    title: {
        type: String,
        unique:true,
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

const Channel = mongoose.model('Channel', channelSchema);

module.exports=Channel;