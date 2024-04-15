const mongoose = require("mongoose");
require('dotenv').config()
const mongoUrl = process.env.MONGO_DB_LOCAL_URL;
// const mongoUrl = process.env.MONGODB_ONLINE_URL;
mongoose.connect(mongoUrl, {
  useNewUrlParser: true, // This will create a new URL parser instance instead of the default one.
  useUnifiedTopology: true,
});
const db = mongoose.connection;
//Checking if connection is successful or not
db.on("error", (err) => console.log(`Error in connecting to database ${err}`));
db.once("open", () => console.log("Connected with Database"));
db.once("connected", () => console.log("Connected with Database"));
db.once("disconnected", () => console.log("Dis-Connected with Database"));

module.exports = db;
