const express= require("express")
const auth=require("../middlewares/auth.js")
const roomowner =require("../middlewares/roomOwnerAuth.js")
const Room= require("../models/room.js")
const User=require("../models/user.js")
const sendEmail=require("../utils/sendEmail.js")
const Channel = require("../models/channel.js")

const app= express.Router()

app.post("/rooms", auth,async (req,res,next)=>{
    try{
        var room = new Room(req.body)
        room.owner=req.user._id
        room.members.push(req.user._id)
        await room.save()
        res.status(201).send(room)
    }
    catch(e){
        if(e.name=="MongoError")
            return next({
                status: 400,
                message:Object.keys(e.keyValue)+" is already taken"
            })
        console.log(e)
        return next({
            status: 500,
            message:e.message
        })
    }
})

app.post("/rooms/:title/join", auth,async (req,res)=>{
    var room =await Room.findOne({
        title:req.params.title
    })
    if(!room)
        return res.status(404).send(req.params.title+" so such room")
    var user= room.members.filter((val)=>{
        return val.equals(req.user._id)
    })

    if(user.length!=0)
        return res.status(400).send("You are already part of Room")

    if(room.private){
        var isInvited=room.invites.includes(req.user.email)
        if(!isInvited)
           return res.status(401).send("You not are invited to this room")
        room.invites=room.invites.filter((val)=>{
            console.log(typeof(val))
            return val!=(req.user.email)
        })
    }
    room.members.push(req.user._id)
    await room.save()
    res.send(room)

})

app.post("/rooms/:title/leave", auth,async (req,res)=>{
    var room =await Room.findOne({
        title:req.params.title
    })
    if(!room)
    {
        return res.status(404).send(req.params.title+" so such room")
    }
    room.members= room.members.filter((val)=>{
        return !val.equals(req.user._id)
    })
    await room.save()
    res.send(room)

})

app.post("/rooms/:title/invite", roomowner, async (req,res)=>{
    try{
        var room= req.room
        var to= req.user.email
        var roomName= room.title
        var sender=req.user.email
        room.invites= room.invites.concat(req.body)
        req.body.forEach(async (val)=>{
            await sendEmail(val,{
                to,
                roomName
            })
        })
        await room.save()
        res.send(room)
    }
    catch(e){
        console.log(e)
        res.status(500).send(e)
    }
})

app.get("/rooms/:title", auth, async (req,res)=>{
    var room =await Room.findOne({
        title:req.params.title
    })
    if(!room)
        return res.status(404).send(req.params.title+" so such room")
    res.send(room)
})

app.delete("/rooms/:title", auth, async (req,res)=>{
    var room =await Room.findOne({
        title:req.params.title
    })
    //console.log(room.owner.equals(req.user._id))
    if(!room.owner.equals(req.user._id))
        return res.status(401).send("You are not the owner of the Room")
    await Room.deleteMany({
        title:req.params.title
    })
    res.send("Deleted Room")
})
app.patch("/rooms/:title", auth, async (req, res)=>{
    try{
        var room =await Room.findOne({
            title:req.params.title
        })
        //console.log(room.owner.equals(req.user._id))
        if(!room)
            return res.status(404).send("No such room available")
        if(!room.owner.equals(req.user._id))
            return res.status(401).send("You are not the owner of the Room")
        var keys=Object.keys(req.body)
        keys.forEach((key)=>{
            room[key]=req.body[key]
        })
        await room.save()
        res.send(room)
    }
    catch(e){
        if(e.name=="MongoError")
            return res.status(400).send(e.message)
        console.log(e)
        res.status(500).send(e.message)
    }
})
app.get("/rooms/:title/members",auth ,async (req,res)=>{
    var room =await Room.findOne({
        title:req.params.title
    })
    var isMember=room.members.includes(req.user._id)
    console.log(isMember)
    if(!isMember)
    {
        return res.status(401).send("You are not a member of this group")
    }
        
    await room.populate('members').execPopulate()
    res.send(room.members)
})
app.get("/rooms/:title/kick/:id",auth, async (req,res)=>{
    var room =await Room.findOne({
        title:req.params.title
    })
    //console.log(room.owner.equals(req.user._id))
    if(!room.owner.equals(req.user._id))
    {
        return res.status(401).send("You are not the owner of the Room")
    }
        
    room.members= room.members.filter((val)=>{
        console.log(val, req.params.id)
        return !val.equals(req.params.id)
    })
    //console.log(room.members)
    await room.save()
    res.send(room)

})
app.get("/allRooms", auth, async (req,res)=>{
    var search =req.query.search
    const titleRegex = new RegExp(search, 'i')
    var rooms=await Room.find({
        members:req.user._id,
        title:titleRegex
    })
    res.send(rooms)
})


app.get("/allRoomsDb", async (req,res)=>{
    var search =req.query.search
    const titleRegex = new RegExp(search, 'i')
    const rooms=await Room.find({
        title:titleRegex
    })
    res.send(rooms)
})

app.delete("/deleteAll", async (req,res)=>{
    await Room.deleteMany({})
    res.send("All rooms deleted")
})


app.get("/allMessages/:title", auth, async (req,res,next)=>{
    try{
    var channels=await  Room.getAllChannels(req.params.title)
    var msg={}
    for (var i=0; i<channels.length;i++){
        var channel= channels[i]
       console.log(channel._id)
       var messages=await Channel.getAllMessages(channel._id)

       console.log(messages)
       msg[channel.title]=messages
    }
    res.send(msg)
    }
    catch(e){
        return next({
            status:404,
            message:e.message
        })
    }
})



module.exports=app