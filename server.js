const express=require("express")
const mongoose=require("mongoose")
const app=express()
const configs=require("./Config/db.config")
const port=require("./Config/server.config")
const bodyparser=require("body-parser")
const User=require("./Models/user.model")
mongoose.connect(configs.configs)

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
const db=mongoose.connection
db.on("error",()=>{
    console.log("There was an error from our side while connecting to db ")
})
db.once("open",()=>{
    console.log("You are connected to mongodb")
    init()
})
async function init(){
    try{
        await db.db.dropCollection("users")
    }
    catch(err){
        console.log("There was an error while dropping the table in mongoose",err)
    }
}
require("./Routes/Auth")(app)


app.listen(port,()=>{
    console.log("You are now connected to the port number:",port)
})