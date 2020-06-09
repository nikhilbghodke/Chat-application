const express = require("express")
const auth = require("../middlewares/roomOwnerAuth")
const Room = require("../models/room.js")
const User = require("../models/user.js")
const Channel = require("../models/channel")
var port = process.env.PORT || 8081
const app = express.Router({ mergeParams: true });

<<<<<<< HEAD
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
=======

//create channel sending room title to create 
app.post("/channels/:title", auth, async (req, res, next) => {
    try {
        var channel = new Channel(req.body)
        channel.room = req.room.id
        await channel.save()
        res.status(201).send(channel)
>>>>>>> ee011fdb90929f2e3b73be043454e305d7c6b681
    }
    catch (e) {
        return next({
            message: e.message
        })
    }
})

//get single channel by title
app.get("/channels/:title", async (req, res, next) => {
    try {
        var channel = await Channel.findOne({
            title: req.params.title
        })
        if (!channel)
            return next({
                status: 404,
                message: "No room with given title exist"
            })
        res.send(channel)
    } catch (e) {
        return next({
            message: e.message
        })
    }
})

//delete channel room title and channel name in path to del
app.delete("/channels/:title/:name", auth, async (req, res, next) => {
    try {
        var channel = await Channel.findOne({
            title: req.params.name
        })
        if (!channel)
            return next({
                status: 404,
                message: "No channel with given name exist"
            })
        await Channel.deleteOne({
            title: req.params.name
        })
        res.send("Deleted Channel")
    } catch (e) {
        return next({
            message: e.message
        })
    }
})

//get all channels 
app.get("/allChannels", async (req, res, next) => {
    try {
        var search = req.query.search
        const titleRegex = new RegExp(search, 'i')
        const channels = await Channel.find({
            title: titleRegex
        })
        res.send(channels)
    } catch (e) {
        return next({
            message: e.message
        })
    }
})

//update channel
app.patch("/channels/:title/:name", auth, async (req, res, next) => {
    try {
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
    } catch (e) {
        return next({
            message: e.message
        })
    }
})

//get all channels in room
<<<<<<< HEAD
app.get("/allChannels/:title", async (req, res) => {
    var title=req.params.title
    var channels= await Room.getAllChannels(title)
    res.send(channels)
=======
app.get("/allChannels/:roomid", async (req, res, next) => {
    var roomid = req.params.roomid
    try {
        const channels = await Channel.find({
            room: roomid
        })
        res.send(channels)
    } catch (e) {
        return next({
            message: e.message
        })
    }
>>>>>>> ee011fdb90929f2e3b73be043454e305d7c6b681
})


module.exports = app

