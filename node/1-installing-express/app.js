const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// This always runs
app.use("/", (req, res, next) => {
  next();
});

app.use("/add-product", (req, res, next) => {
  res.send(
    '<form method="POST" action="/product"><input type="text" name="title" /><button type="submit">Add</button></form>'
  );
});

app.use("/product", (req, res) => {
  console.log(req.body);
  res.redirect("/");
});

app.use("/", (req, res, next) => {
  res.send("<h1>Hello from Express!</h1>");
});

app.listen(8080);
