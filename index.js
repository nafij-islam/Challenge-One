// mongodb+srv://backend:g2tvwLt5sfVgV9Bv@cluster0.mfbog0c.mongodb.net/backend=Cluster0

require("node:dns").setServers(["1.1.1.1", "8.8.8.8"]);
require('dotenv').config()
const express = require("express");
const dbConnection = require("./config/DbConnection");

dbConnection();

const app = express();

console.log(process.env.MONGODB_USERNAME)

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Hello There")
})

app.listen(5000, () => {
  console.log("server is Running");
});
