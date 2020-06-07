const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    channel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Channel',
        required:true
    },
    content: {
        type:String,
        required: true
    },

}, { timestamps: { createdAt: true, updatedAt: false } }); //messages cannot be updated

const Message = mongoose.model('Message', messageSchema);

module.exports= Message;