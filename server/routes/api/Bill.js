const express = require("express");

const Bill = require("../../schemas/Bill");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const bills = await Bill.find({ createdBy: req.user.id });
    res.json(bills);
  } catch (error) {
    res.status(400).json({ message: error.message || error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const bill = await Bill.findOne({
      createdBy: req.user.id,
      _id: req.params.id,
    }).populate("items.product customer");
    res.json(bill);
  } catch (error) {
    res.status(400).json({ message: error.message || error });
  }
});

router.post("/", async (req, res) => {
  try {
    const bill = await Bill.create({ ...req.body, createdBy: req.user.id });
    res.json(bill);
  } catch (error) {
    res.status(400).json({ message: error.message || error });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const bill = await Bill.updateOne(
      {
        createdBy: req.user.id,
        _id: req.params.id,
      },
      { $set: req.body },
      { runValidators: true }
    );
    res.json(bill);
  } catch (error) {
    res.status(400).json({ message: error.message || error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const bill = await Bill.deleteOne({
      createdBy: req.user.id,
      _id: req.params.id,
    });
    res.json(bill);
  } catch (error) {
    res.status(400).json({ message: error.message || error });
  }
});

module.exports = router;
