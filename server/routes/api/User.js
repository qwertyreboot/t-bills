const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../../schemas/User");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: error.message || error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.id,
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message || error });
  }
});

router.post("/", async (req, res) => {
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const user = await User.create({ ...req.body, password: hashedPassword });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message || error });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const user = await User.updateOne(
      {
        _id: req.params.id,
      },
      { $set: req.body },
      { runValidators: true }
    );
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message || error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await User.deleteOne({
      _id: req.params.id,
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message || error });
  }
});

module.exports = router;
