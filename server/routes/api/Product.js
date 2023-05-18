const express = require("express");

const Product = require("../../schemas/Product");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { search } = req.query;
    const products = await Product.find({
      "quantity.value": { $gt: 0 },
      name: new RegExp(search, "i"),
    });
    res.json(products);
  } catch (error) {
    res.status(400).json({ message: error.message || error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
    });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message || error });
  }
});

router.post("/", async (req, res) => {
  try {
    const product = await Product.create({ ...req.body });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message || error });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const product = await Product.updateOne(
      {
        _id: req.params.id,
      },
      { $set: req.body },
      { runValidators: true }
    );
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message || error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.deleteOne({
      _id: req.params.id,
    });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message || error });
  }
});

module.exports = router;
