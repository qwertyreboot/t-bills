const express = require("express");

const Customer = require("../../schemas/Customer");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(400).json({ message: error.message || error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const customer = await Customer.findOne({
      _id: req.params.id,
    });
    res.json(customer);
  } catch (error) {
    res.status(400).json({ message: error.message || error });
  }
});

router.post("/", async (req, res) => {
  try {
    const customer = await Customer.create({ ...req.body });
    res.json(customer);
  } catch (error) {
    res.status(400).json({ message: error.message || error });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const customer = await Customer.updateOne(
      {
        _id: req.params.id,
      },
      { $set: req.body },
      { runValidators: true }
    );
    res.json(customer);
  } catch (error) {
    res.status(400).json({ message: error.message || error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const customer = await Customer.deleteOne({
      _id: req.params.id,
    });
    res.json(customer);
  } catch (error) {
    res.status(400).json({ message: error.message || error });
  }
});

module.exports = router;
