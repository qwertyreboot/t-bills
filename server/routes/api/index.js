const express = require("express");

const authRouter = require("./Auth");
const productRouter = require("./Product");
const billRouter = require("./Bill");
const categoryRouter = require("./Category");
const customerRouter = require("./Customer");
const userRouter = require("./User");
const { verifyJwt, ownerOnly } = require("../../middlewares/Auth");

const router = express.Router();

router.use("/auth", authRouter);
router.use(verifyJwt);
router.use("/products", productRouter);
router.use("/bills", billRouter);
router.use("/categories", categoryRouter);
router.use("/customers", customerRouter);
router.use("/users", ownerOnly, userRouter);

module.exports = router;
