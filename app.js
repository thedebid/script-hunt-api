const express = require("express");
const app = express();
require("dotenv/config");
const morgan = require("morgan");
const APIRoute = require("./routes/api.route");
require("./configs/mongoose");
var cors = require("cors");
//Middlewares
//For log
app.use(morgan("tiny"));
app.use(cors());
//For reading json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//API Routes
const api = process.env.API_URL;
app.use(`${api}/`, APIRoute);

//Server
// app.listen(process.env.PORT, (error) => {
//   if (error) {
//     throw error;
//   }
//   console.log("Server is running at port " + process.env.PORT);
// });

//for pro
var server_port = process.env.YOUR_PORT || process.env.PORT || 80;
var server_host = process.env.YOUR_HOST || "0.0.0.0";
app.listen(server_port, server_host, (err, done) => {
  if (err) {
    console.log("Error while listening port " + app.get("port") + " >> " + err);
  } else {
    console.log("Server is listening at port " + app.get("port"));
  }
});

//For error handling
app.use(function (err, req, res, next) {
  console.log("Error handling middleware", err);
  res.status(err.status || 400).json({
    message: err.message || err,
    status: err.status || 400,
  });
});
