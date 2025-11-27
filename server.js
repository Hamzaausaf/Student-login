const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/studentDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Student Schema
const StudentSchema = new mongoose.Schema({
  email: String,
  password: String
});
const Student = mongoose.model("Student", StudentSchema);

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await Student.findOne({ email, password });

  if (user) {
    return res.json({ message: "Login Successful!" });
  } else {
    return res.json({ message: "Invalid email or password" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
