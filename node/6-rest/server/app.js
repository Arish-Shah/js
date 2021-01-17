const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");

const feedRoutes = require("./routes/feed");
const authRoutes = require("./routes/auth");

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    callback(
      null,
      (new Date().toISOString() + "-" + file.originalname).replace(/:/g, "-")
    );
  }
});

const fileFilter = (req, file, callback) => {
  if (["image/png", "image/jpg", "image/jpeg"].includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

app.use(bodyParser.json());
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "images")));

// app.use((req, res, next) => {});

app.use("/api", feedRoutes);
app.use("/auth", authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message, data });
});

mongoose
  .connect("URI", { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    app.listen(8080);
  })
  .catch(error => {
    console.log(error);
  });
