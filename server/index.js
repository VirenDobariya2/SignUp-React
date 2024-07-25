const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const UserModel = require("./models/User");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/user")
  
// Signin data...................................................................................

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password, number, fields } = req.body;

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      number,
      fields,
    });
    res.status(201).json(newUser);
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
});

// Login data...........................................................
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare hashed password with provided password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      return res.status(200).json({ message: "Login Successfully" ,user});
    } else {
      return res.status(401).json({ message: "Invalid password" });
    }
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
