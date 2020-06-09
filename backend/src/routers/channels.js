const express = require("express")
const auth = require("../middlewares/auth.js")
const Room = require("../models/room.js")
const User = require("../models/user.js")
const Channel = require("../models/channel")
var port = process.env.PORT || 8081
const app = express.Router()

//create channel
app.post("/channels/:title", async (req, res) => {
    try {
        var channel = new Channel(req.body)
        var room = await Room.findOne({
            title: req.params.title
        })
        console.log(room)
        if (room.length!=0) {
            channel.room = room._id;
            console.log(channel)
            await channel.save()
            res.status(201).send(channel)
        }
        else {
            throw error = new Error("Room not Found");
        }
    }
    catch (e) {
        if (e.name == "MongoError")
            return res.status(400).send(e.message)
        console.log(e)
        res.status(500).send(e.message)
    }
})

//get single channel by title
app.get("/channels/:title", async (req, res) => {
    var channel = await Channel.findOne({
        title: req.params.title
    })
    if(!channel)
        return res.status(404).send(req.params.title+" does not exist")
    res.send(channel)
})

//delete channel 
app.delete("/channels/:title", async (req, res) => {
    var channel = await Channel.findOne({
        title: req.params.title
    })
    if (!channel)
        return res.status(404).send("No such channel available")
    await Channel.deleteOne({
        title: req.params.title
    })
    res.send("Deleted Channel")
})

//get all channels 
app.get("/allChannels", async (req, res) => {
    var search = req.query.search
    const titleRegex = new RegExp(search, 'i')
    const channels = await Channel.find({
        title: titleRegex
    })
    res.send(channels)
})

//update channel
app.patch("/channels/:title", async (req, res) => {
    console.log(req.params.title)
    var channel = await Channel.findOne({
        title: req.params.title
    })
    //console.log(channel)
    if (!channel)
        return res.status(404).send("No such channel available")
    Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const val = item[1];
        channel[key] = val;
    });
    await channel.save()
    res.send(channel)
})

//get all channels in room
app.get("/allChannels/:title", async (req, res) => {
    var title=req.params.title
    var channels= await Room.getAllChannels(title)
    res.send(channels)
})


module.exports = app

