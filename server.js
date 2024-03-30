const express = require("express");
const db = require("./db");
const bodyParser = require("body-parser");

const PORT = 8080;
const app = express();

app.use(bodyParser.json());
app.get("/", (req, res) => {
  // Sending a string response directly
  res.send({ statusCode: 2000, success: true, message: "This is home page." });
});
const router = require("./routes/userRoute");
app.use('/api/v1', router);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



