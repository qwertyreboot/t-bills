const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: {
        value: Number,
        unit: {
          type: String,
          enum: ["peice", "l", "g", "m"],
        },
      },
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    buyingPrice: {
      type: Number,
    },
    maximumRetailPrice: {
      type: Number,
    },
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
    tax: {
      type: {
        state: Number,
        central: Number,
      },
      default: {
        state: 9,
        central: 9,
      },
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

const Product = new mongoose.model("Product", schema);

module.exports = Product;
