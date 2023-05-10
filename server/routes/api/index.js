const express = require("express");

const authRouter = require("./Auth");
const productRouter = require("./Product");
const { verifyJwt } = require("../../middlewares/Auth");

const router = express.Router();

router.use("/auth", authRouter);
router.use(verifyJwt);
router.use("/products", productRouter);

module.exports = router;
