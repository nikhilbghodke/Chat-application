const express = require("express")
const auth = require("../middlewares/roomOwnerAuth")
const Room = require("../models/room.js")
const User = require("../models/user.js")
const Channel = require("../models/channel")
var port = process.env.PORT || 8081
const app = express.Router({ mergeParams: true });


//create channel sending room title to create 
app.post("/channels/:title", auth, async (req, res) => {
    try {
        var channel = new Channel(req.body)
        channel.room = req.room.id
        await channel.save()
        res.status(201).send(channel)
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
    if (!channel)
        return res.status(404).send(req.params.title + " does not exist")
    res.send(channel)
})

//delete channel room title and channel name in path to del
app.delete("/channels/:title/:name", auth, async (req, res) => {
    var channel = await Channel.findOne({
        title: req.params.name
    })
    if (!channel)
        return res.status(404).send("No such channel available")
    await Channel.deleteOne({
        title: req.params.name
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
app.patch("/channels/:title/:name", auth, async (req, res) => {
    var channel = await Channel.findOne({
        title: req.params.name
    })
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
app.get("/allChannels/:roomid", async (req, res) => {
    var roomid = req.params.roomid
    try {
        const channels = await Channel.find({
            room: roomid
        })
        res.send(channels)
    } catch (e) {
        res.send(e)
    }
})


module.exports = app

