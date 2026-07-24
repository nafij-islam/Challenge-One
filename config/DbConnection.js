const mongoose = require("mongoose");

let dbConnection = () => {
  return mongoose
    .connect(
      `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.mfbog0c.mongodb.net/${process.env.MONGODB_DBNAME}=Cluster0`,
    )
    .then(() => {
      console.log("database is Connected");
    })
    .catch((err) => {
      console.log("Database Connection Error");
    });
};

module.exports = dbConnection;
