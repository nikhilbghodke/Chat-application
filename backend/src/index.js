const express= require("express")
const User=require("./models/user.js")
const auth= require("./middlewares/auth.js")
const userRoutes= require("./routers/users.js")
const roomRouters=require("./routers/rooms.js")
const channelRouters = require("./routers/channels")
const messageRouters = require("./routers/messages")
const db=require("./database/mongo")
var port= process.env.PORT||8081
var app=express()
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.json())

app.use(userRoutes)
app.use(roomRouters)
app.use(channelRouters)
app.use(messageRouters)
app.listen(port,()=>{
    console.log("Server has started listening on port "+port)
})


app.get("/",(req,res)=>{
    res.send("Welcome to our Chat application")
})