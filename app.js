const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get("/", function(req, res){
  res.send("<h1>Hello, world!</h1>");
  console.log("Request handled ok");
});

const port = 8001;
app.listen(port);
console.log("Server is listening on port:" + port + "...");