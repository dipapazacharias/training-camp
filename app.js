const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "pug");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get("/", function(req, res){
  res.render("index");
  console.log("Request handled ok");
});

const port = 8001;
app.listen(port);
console.log("Server is listening on port:" + port + "...");