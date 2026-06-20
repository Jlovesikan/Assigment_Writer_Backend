const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    writerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    subject: {
      type: String,
      required: true,
    },

    deadline: {
      type: Date,
      required: true,
    },

    wordCount: {
      type: Number,
      required: true,
    },

    budget: {
      type: Number,
      required: true,
    },

    // File uploads
    files: [
      {
        fileName: {
          type: String,
          required: true,
        },

        filePath: {
          type: String,
          required: true,
        },

        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    status: {
      type: String,
      enum: [
        "pending",
        "in_progress",
        "completed",
        "delivered",
        "cancel",
      ],
      default: "pending",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;