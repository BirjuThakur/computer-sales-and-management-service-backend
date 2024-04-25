const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const dbConnection = require("./db/dbConnection");
const allRoutes = require("./pages/allRoutes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/allroutes",allRoutes);

app.get("/",(req,res)=>{
    res.send("hello")
});

app.listen(port,()=>{
    dbConnection();
    console.log(`running on port ${port}`)
})