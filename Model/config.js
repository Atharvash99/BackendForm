const mongoose = require("mongoose");
const url = process.env.URL;

mongoose.connect(url, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});
