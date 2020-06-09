const express = require("express")
const auth = require("../middlewares/auth.js")
const Message = require("../models/message")
const User = require("../models/user.js")
const Channel = require("../models/channel")
const app = express.Router()


//channel id
app.post("/messages/:id", auth, async (req, res,next) => {
    try {
        var message = new Message(req.body)
        message.owner = req.user._id
        message.channel = req.params.id
        await message.save()
        res.status(201).send(message)
    }
    catch (e) {
        return next({
            message: e.message
        })
    }

})

//get all messages in a channel
app.get("/messages/:id", async (req, res,next) => {
    try {
        var channelId = req.params.id
        const messages = await Message.find({
            channel: channelId
        })
        if (!messages)
            return next({
                status: 200,
                message: "No messages"
            })
        else
            res.send(messages)
    } catch (e) {
        return next({
            message: e.message
        })
    }
})


//message id to update
app.patch("/messages/:id", auth, async (req, res,next) => {
    try {
        var message = await Message.findOne({
            _id: req.params.id
        })
        if (!message)
            return next({
                status: 404,
                message: "No message selected"
            })
        if (req.user._id.equals(message.owner)) {
            console.log(req.body.key)
            Object.entries(req.body).forEach((item) => {
                const key = item[0];
                const val = item[1];
                message[key] = val;
            });
            await message.save()
            res.send(message)
        }
        else
        return next({
            status: 401,
            message: "Not authorized to update"
        })
    } catch (e) {
        return next({
            message: e.message
        })
    }
})

//message id to del
app.delete("/messages/:id", auth, async (req, res,next) => {
    try {
        var message = await Message.findOne({
            _id: req.params.id
        })
        if (!message)
        return next({
            status: 404,
            message: "No message selected"
        })
        if (req.user._id.equals(message.owner)) {
            await message.delete();
            res.status(200).send("Message deleted");
        }
        else
        return next({
            status: 401,
            message: "Not authorized to update"
        })
    } catch (e) {
        return next({
            message: e.message
        })
    }
})


module.exports = app