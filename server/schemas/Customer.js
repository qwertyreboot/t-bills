const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      maxLength: 10,
      minLength: 10,
    },
    address: {
      type: {
        location: String,
        pincode: Number,
      },
    },
    points: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Customer = new mongoose.model("Customer", schema);

module.exports = Customer;
