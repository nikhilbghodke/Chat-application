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
const directMessageRouter = require("./routers/directMessages.js")
const ftp=require("./routers/ftp-server.js")
const db=require("./db/mongo.js")
const chat= require("./socket/chat.js")
const cors = require("cors")
const errorHandler = require("./middlewares/errorHandler");
var port = process.env.CHAT_APP_SERVICE_PORT || 8081
var app=express()
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const publicDirectoryPath= path.join(__dirname,"../public")
const uploadDirectoryPath= path.join(__dirname,"../uploads")
app.use(cors());
app.use(express.json())
app.use(userRoutes)
app.use(roomRouters)
app.use(channelRouters)
app.use(messageRouters)
app.use(directMessageRouter)
app.use(ftp)
app.use(express.static(publicDirectoryPath))
app.use(express.static(uploadDirectoryPath))


app.use(function(req, res, next) {
	let err = new Error("Not Found");
	err.status = 404;
	next(err);
  });
  
  app.use(errorHandler);

const server= http.createServer(app)
const io=socketio(server)

server.listen(port,()=>{
	console.log("Node server has been started at port "+port)
})

chat(io)
