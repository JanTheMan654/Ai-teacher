// // backend/server.js
// const express = require("express");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(bodyParser.json());

// // Connect to MongoDB
// mongoose.connect("mongodb://localhost:27017/myapp", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "MongoDB connection error:"));
// db.once("open", () => {
//   console.log("Connected to MongoDB");
// });

// // Define user schema
// const userSchema = new mongoose.Schema({
//   email: { type: String, required: true },
//   password: { type: String, required: true },
// });

// // Define user model
// const User = mongoose.model("User", userSchema);

// // Register endpoint
// app.post("/register", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ error: "User already exists" });
//     }
//     // Create new user
//     const newUser = new User({ email, password });
//     await newUser.save();
//     res.status(200).json({ message: "User registered successfully" });
//   } catch (error) {
//     console.error("Error registering user:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Login endpoint
// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     // Find user in database
//     const user = await User.findOne({ email, password });
//     if (!user) {
//       return res.status(401).json({ error: "Invalid credentials" });
//     }
//     res.status(200).json({ message: "Login successful" });
//   } catch (error) {
//     console.error("Error logging in:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
