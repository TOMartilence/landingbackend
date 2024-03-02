require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const mongoURI = process.env.string;
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))   
    .catch(err => console.log(err));

app.use(bodyParser.json());
  const userSchema = new mongoose.Schema({
  firstname : String,
  lastname : String,
  email : String,
  message : String
})

const User = mongoose.model("User",userSchema)

app.post("/api/send", async (req, res) => {
  const { firstname, lastname, email, message } = req.body;
  const user = new User({
    firstname,
    lastname,
    email,
    message
})
  try {
    await user.save()
    console.log("New User Added");
    res.status(200).json({ message: "User added successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });

  }
});

app.listen(port, () => {
  console.log(`The backend is live on port ${port}`);
});
