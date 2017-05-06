const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "/public")));

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "pug");


app.get("/", function(req, res){
  res.render("index", { title: "Welcome"});
  console.log("Requesting \"index\" handled ok");
});
app.get("/about", function(req, res){
  res.render("about");
  console.log("Requesting \"about\" handled ok");
});
app.get("/contact", function(req, res){
  res.render("contact");
  console.log("Requesting \"contact\" handled ok");
});



const port = 8001;
app.listen(port);
console.log("Server is listening on port:" + port + "...");