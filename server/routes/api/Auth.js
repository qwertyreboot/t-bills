const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../../schemas/User");

const router = express.Router();

// router.post("/signup", async (req, res) => {
//   try {
//     const hashedPassword = bcrypt.hashSync(req.body.password, 10);
//     const user = await User.create({
//       name: req.body.name,
//       username: req.body.username,
//       password: hashedPassword,
//     });
//     res.json(user);
//   } catch (error) {
//     res.status(400).json({ message: error.message || error });
//   }
// });

router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    const isMatch = bcrypt.compareSync(req.body.password, user.password);
    if (!isMatch) {
      req.status(401).json({ message: "username and password does not match" });
    }

    const token = jwt.sign(
      { name: user.name, username: user.username, id: user._id },
      process.env.JWT_SECRET
    );
    res.json({ token, ...user });
  } catch (error) {
    res.status(400).json({ message: error.message || error });
  }
});

module.exports = router;
