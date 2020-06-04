const express= require("express")

require("./db/mongoose.js")
const User=require("./models/user.js")
const auth= require("./middlewares/auth.js")




var port= process.env.PORT||3000
var app=express()


app.use(express.json())
app.listen(port,()=>{
    console.log("Server has started listening on port "+port)
})


app.get("/",(req,res)=>{
    res.send("Welcome to our Chat application")
})

app.post("/signup", async (req,res)=>{
   
    var user= new User(req.body)
    try{
        user=await user.save()
        const token= await user.generateToken()
        res.send({user,token})
    }
    catch(e){
        res.status(400).send(e)
    }
})
app.post("/login", async (req,res)=>{
    
    try{
     const  user = await User.findByCredentials(req.body.email,req.body.password)
     const token = await user.generateToken()
     res.send({user,token})
    }
    catch(e){
        res.status(404).send(e)
    }
     
})

app.post("/logout", auth,async (req,res)=>{

    try{
        var token =req.token
        var user=req.user
        user.tokens= user.tokens.filter((t)=>{
            t!=token
        })
        await user.save()
        res.send(user)
    }
    catch(e){
        console.log(e)
        res.status(500).send(e)
    }
})

app.post("/logoutAll", auth,async (req,res)=>{
    try{
        var user=req.user
        user.tokens= []
        await user.save()
        res.send(user)
    }
    catch(e){
        console.log(e)
        res.status(500).send(e)
    }
})


app.get("/me", auth,async (req,res)=>{
    res.send(req.user)
})

app.patch("/users", auth ,async (req,res)=>{

    try{
        var user =req.user
        const keys= Object.keys(req.body)
        keys.forEach((key)=>{
            user[key]=req.body[key]
        })
        //console.log(user)
        user=await user.save()
        res.send(user)
    }
    catch(e){
        console.log(e)
        res.status(500).send(e)
    }
})



app.get("/users", async (req,res)=>{
    try{
        const users= await User.find({})
        res.send(users)
    }
    catch(e){
        res.status(500).send(e)
    }
})


app.delete("/users", async (req,res)=>{
    await User.deleteMany({})
    res.send("all users deleted")
})