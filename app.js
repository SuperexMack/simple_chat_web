const http = require("http");
const express = require("express");
const app = express();
const {Server} = require("socket.io");
const path = require("path");
const server  =  http.createServer(app);
const mongoose = require("mongoose")
const Chat = require("./schema/chatSchema")
const io = new Server(server);
const port = 4000;




const MY_URL = "mongodb://127.0.0.1:27017/MychatApp";

main()
.then(()=>{
console.log("connection set up")
})

.catch((err)=>{
console.log(err)
})

async function main(){
mongoose.connect(MY_URL)
}


app.set("view engine" , "ejs")
app.set("views" , path.join(__dirname , "views"));
app.use(express.static(path.join(__dirname,"public")))



io.on("connection" , (socket)=>{

socket.on("message" , (mack)=>{

console.log("the message by the user was :" , mack)

io.emit("message" , {message : mack , senderID : socket.id})


})



})





















app.get("/" , (req,res)=>{
res.render("index.ejs")
})




server.listen(port , ()=>{
console.log(`your server is Running on the Port Number ${port}`)
})

