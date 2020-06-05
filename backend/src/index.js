const express= require("express")

require("./db/mongoose.js")
const User=require("./models/user.js")
const auth= require("./middlewares/auth.js")
const userRoutes= require("./routers/users.js")
const roomRouters=require("./routers/rooms.js")
var port= process.env.PORT||3000
var app=express()


app.use(express.json())

app.use(express.static('uploads'))
app.use(userRoutes)
app.use(roomRouters)
app.listen(port,()=>{
    console.log("Server has started listening on port "+port)
})


app.get("/",(req,res)=>{
    res.send("Welcome to our Chat application")
})