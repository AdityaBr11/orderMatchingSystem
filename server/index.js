const express=require("express");
const { connection } = require("./config/db");
const { completeRoute } = require("./routes/complete.route");
const { pendingRoute } = require("./routes/pending.route");
const cors=require("cors")
const env=require("dotenv")


const app=express();
env.config()
app.use(express.json());

app.use(cors())


app.get("/",(req,res)=>{
    res.status(200).send("working")
})

app.use("/complete",completeRoute);
app.use("/pending",pendingRoute)

app.listen(process.env.port||4500,async (req,res)=>{
    try {
        await connection;
        console.log("db is connected")

    } catch (error) {
        console.log(error);
    }
    console.log(`port is running on port ${process.env.port}`)
})