const path=require("path")
const http=require("http")

const express= require("express")
const socketio= require("socket.io")
const Filter= require("bad-words")

const User=require("./models/user.js")
const auth= require("./middlewares/auth.js")
const userRoutes= require("./routers/users.js")
const roomRouters=require("./routers/rooms.js")
const channelRouters = require("./routers/channels")
const messageRouters = require("./routers/messages")
const ftp=require("./routers/ftp-server.js")
const db=require("./db/mongoose")
const chat= require("./socket/chat.js")
var port= process.env.PORT||3000
var app=express()
//db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const publicDirectoryPath= path.join(__dirname,"../public")

app.use(express.json())
app.use(userRoutes)
app.use(roomRouters)
app.use(channelRouters)
app.use(messageRouters)
app.use(ftp)
app.use(express.static(publicDirectoryPath))

const server= http.createServer(app)
const io=socketio(server)

server.listen(port,()=>{
	console.log("Node server has been started at port "+port)
})

chat(io)