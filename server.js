const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());

//middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running");
});


app.use("/api", userRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

