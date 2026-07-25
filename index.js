require("node:dns").setServers(["1.1.1.1", "8.8.8.8"]);
require('dotenv').config()
const express = require("express");
const authRoute = require("./routes/authRoutes")
const dbConnection = require("./config/DbConnection");

dbConnection();

const app = express();

console.log(process.env.MONGODB_USERNAME)

app.use(express.json());

app.use('/api/v1/auth', authRoute)

app.listen(5000, () => {
  console.log("server is Running");
});
