const express= require("express")
const DirectMessage=require("../models/directMessages.js")
const app= express.Router()

app.get("/all",async (req,res)=>{
    var all= await DirectMessage.find({})
    res.send(all)
})

module.exports=app