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
const db=require("./db/mongoose")

const utils=require("./utils/messages.js")
const {addUser,removeUser,getUser,getUsersInRoom}= require("./utils/users.js")
const generateMessage=utils.generateMessage
var port= process.env.PORT||3000
var app=express()
//db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const publicDirectoryPath= path.join(__dirname,"../public")

app.use(express.json())
app.use(userRoutes)
app.use(roomRouters)
app.use(channelRouters)
app.use(messageRouters)
app.use(express.static(publicDirectoryPath))

const server= http.createServer(app)
const io=socketio(server)

server.listen(port,()=>{
	console.log("Node server has been started at port "+port)
})


io.on("connection",(socket)=>{
	console.log("A new Connection is created ")
	
	socket.on('join', ({ username, room },callback) => {
		const {user, error}= addUser({id:socket.id, username,room})

		if(error)
			return callback(error)
        socket.join(user.room)


        socket.emit("recieve", generateMessage("Admin",'Welcome!'))
        console.log(user)
        socket.broadcast.to(user.room).emit('recieve', generateMessage("Admin",`${user.username} has joined!`))
        io.to(user.room).emit("roomData",{
        	room:user.room,
        	users:getUsersInRoom(user.room)
        })
        callback()
        // socket.emit, io.emit, socket.broadcast.emit
        // io.to.emit, socket.broadcast.to.emit
    })
	
	socket.on('send',(msg,callback)=>{
		const user= getUser(socket.id)
		const filter = new Filter()
		if(filter.isProfane(msg))
			return callback("Profanity not allowed")
		console.log(msg)
		io.to(user.room).emit("recieve",generateMessage(user.username,msg))
		callback()
	})
	socket.on('sendLocation',(msg,callback)=>{
		const user= getUser(socket.id)
		console.log(msg)
		io.to(user.room).emit("recieveLocation",generateMessage(user.username,msg))
		callback("Location delivered")
	})
	socket.on('disconnect', () => {
		const user =removeUser(socket.id)
		console.log(user)
		if(user){
    		io.to(user.room).emit("recieve",generateMessage("Admin",user.username+" has left"));
    		io.to(user.room).emit("roomData",{
        		room:user.room,
        		users:getUsersInRoom(user.room)
        	})
		}
  	});


})