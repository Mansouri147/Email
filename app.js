// import express from "express";
const express = require("express");
import mongoose from "mongoose";
import bodyParser from "body-parser";
import EmailsRoute from "./routes/eMails.js";
import cors from "cors";
require("dotenv").config();
import bodyParser from "body-parser";

const app = express();
const port = 9000;

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

// Connect To DB
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("connected to DB!")
);

// front end
app.use(express.static("static"));

//How to start listening to the server
app.listen(port, () => console.log(`Listening on localhost : ${port}`));

// // front end
// fetch('http://localhost:9000/emails')
// .then(result => {
//     return result.json();
// })
// .then(data => {
//     console.log(data);
// })
