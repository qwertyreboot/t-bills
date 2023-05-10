const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      maxLength: 10,
      minLength: 10,
    },
    password: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    aadhaar: {
      type: Number,
      required: true,
    },
    address: {
      type: {
        location: String,
        pincode: Number,
      },
      required: true,
    },
    role: {
      type: String,
      enum: ["owner", "staff"],
    },
  },
  { timestamps: true }
);

const User = new mongoose.model("User", schema);

module.exports = User;
