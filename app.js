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
app.post("/contact/send", function(req, res){
  console.log("POST request");
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "dipapazach@gmail.com",
      pass: "natoor66dt1985?"
    }
  });

  let mailOptions = {
    from: "Mitso Papazacho <dipapazach@gmail.com>",
    to: "dipapazacharias@gmail.com",
    subject: "Nodemailer test",
    text: "You have a sumbission with the following details...\n Name: "+req.body.name+"\nEmail: "+req.body.email+"\nMessage: "+req.body.message,
    html: "<p>You have a sumbission with the following details...</p><ul><li>Name: "+req.body.name+"</li><li>Email: "+req.body.email+"</li><li>Message: "+req.body.message+"</li></ul>"
  }

  transporter.sendMail(mailOptions, function(error, info){
    if(error) {
      console.log(error);
      res.redirect("/");
    } else {
      console.log("Email delivered successfully!!");
      console.log(info);
      res.redirect("/");
    }
  });

});


const port = 8001;
app.listen(port);
console.log("Server is listening on port:" + port + "...");