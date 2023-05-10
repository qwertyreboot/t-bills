const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    parent: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      default: null,
    },
  },
  { timestamps: true }
);

const Category = new mongoose.model("Category", schema);

module.exports = Category;
