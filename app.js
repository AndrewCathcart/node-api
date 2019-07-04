const path = require("path");

const express = require("express");
const mongoose = require("mongoose");
const MONGODB_URI = require("./api-keys/api-keys").MONGODB_URI;

const feedRoutes = require("./routes/feed");

const app = express();

app.use(express.json()); // application/json
app.use("/images", express.static(path.join(__dirname, "images")));

// CORS Headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/feed", feedRoutes);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(res => {
    app.listen(8080);
  })
  .catch(err => {
    console.log(err);
  });
