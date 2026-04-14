const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: String,

    role: {
      type: String,
      enum: ["student", "writer", "admin"],
      default: "student",
    },

    status: {
      type: String,
      default: "active",
    },
    contact: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);