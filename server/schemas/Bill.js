const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    items: [
      {
        type: {
          product: {
            type: mongoose.Types.ObjectId,
            ref: "Product",
          },
          quantity: Number,
        },
      },
    ],
    discount: {
      type: {
        value: Number,
        unit: {
          type: String,
          enum: ["percentage", "amount"],
        },
      },
      default: {
        value: 0,
        unit: "percentage",
      },
    },
    customer: {
      type: mongoose.Types.ObjectId,
      ref: "Customer",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Bill = new mongoose.model("Bill", schema);

module.exports = Bill;
