import express from "express";
import Email from "../models/dbmodel.js";
import * as postmark from "postmark";
require("dotenv").config();


const router = express.Router();

router.get("/", async (req, res) => {
  console.log(">>>>>>>>>>>>>> home page ");
  try {
    const Emails = await EmailSchema.find();
    console.log(Emails);
    res.json(Emails);
  } catch (err) {
    console.log("error");
    res.json({ message: err });
  }
});

router.post("/", async (req, res) => {
  console.log("post made", req.body);
  const email = new Email({
    From: req.body.From,
    to: req.body.to,
    title: req.body.title,
    msgContent: req.body.msgContent,
  });
  console.log("Took desc");
  try {
    const savedEmail = await email.save();
    console.log("email saved");
    console.log(process.env.serverToken);
    res.json(savedEmail);
    // Postmark API
    // Send an email
    let client = new postmark.ServerClient(process.env.serverToken);
    console.log("server test client passed");
    client
      .sendEmail({
        From: "ghazi.dahmen@esprit.tn",
        To: "ghazi.dahmen@esprit.tn",
        Subject: req.body.title,
        TextBody: req.body.msgContent,
        // MessageStream: "outbound",
      })
      .then((response) => {
        console.log("Sending message");
        console.log(response.To);
        console.log(response.Message);
      });
  } catch (err) {
    console.log("error");
    res.json({ message: err });
  }
});

//SPECIFIC EmailSchema
router.get("/:EmailId", async (req, res) => {
  try {
    const email = await EmailSchema.findById(req.params.EmailId);
    res.json(email);
  } catch (err) {
    res.json({ message: err });
  }
});

//DeLete EmailSchema
router.delete("/:EmailId", (req, res) => {
  EmailSchema.remove({ _id: req.params.EmailId });
  res.json("done");
});

//Update a EmailSchema
router.patch("/:EmailId", async (req, res) => {
  try {
    const updatedEmail = await EmailSchema.updateOne(
      { _id: req.params.EmailId },
      { $set: { title: req.body.title } }
    );
    res.json(updatedEmail);
  } catch (err) {
    res.json({ message: err });
  }
});

export default router;
