const express=require("express");
const app=express();
app.use(express.json());


app.get("/",(req,res)=>{
    res.status(200).send("working")
})

app.listen(process.env.port||4500,async (req,res)=>{
   console.log("server is running")
})