const express = require("express");

const Category = require("../../schemas/Category");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(400).json({ message: error.message || error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findOne({
      _id: req.params.id,
    });
    res.json(category);
  } catch (error) {
    res.status(400).json({ message: error.message || error });
  }
});

router.post("/", async (req, res) => {
  try {
    const category = await Category.create({ ...req.body });
    res.json(category);
  } catch (error) {
    res.status(400).json({ message: error.message || error });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const category = await Category.updateOne(
      {
        _id: req.params.id,
      },
      { $set: req.body },
      { runValidators: true }
    );
    res.json(category);
  } catch (error) {
    res.status(400).json({ message: error.message || error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.deleteOne({
      _id: req.params.id,
    });
    res.json(category);
  } catch (error) {
    res.status(400).json({ message: error.message || error });
  }
});

module.exports = router;
