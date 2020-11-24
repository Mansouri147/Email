// import express from "express";
const express = require("express");
import mongoose from "mongoose";
import bodyParser from "body-parser";
import EmailsRoute from "./routes/eMails.js";
import cors from "cors";
require("dotenv").config();

const app = express();
const port = process.env.PORT || 9000;

app.use(express.static("frontEnd"));
app.use(express.json());

// // middleware
app.use(cors());

// ROUTES
app.get("/", (req, res) => {
  res.send({});
});

app.use(bodyParser.urlencoded({ extended: true }));

// // Import Routes
app.use("/emails", EmailsRoute);
// IIF imediately invoked function
(async () => {
  const db = await mongoose.connect(process.env.DB_CONNECTION, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to DB");
  app.listen(port, () => console.log(`Listening on localhost : ${port}`));
})();

// // front end
// fetch('http://localhost:9000/emails')
// .then(result => {
//     return result.json();
// })
// .then(data => {
//     console.log(data);
// })
