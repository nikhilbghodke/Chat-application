const mongoose = require("mongoose");
mongoose.set("debug",true);
mongoose.Promise=Promise;
mongoose.connect("mongodb+srv://suhanighorpade:138272board@cluster0-oindo.mongodb.net/chatapp?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true 
});
var db = mongoose.connection;
module.exports = db;
