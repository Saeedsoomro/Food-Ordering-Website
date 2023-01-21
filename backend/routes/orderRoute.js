const express = require("express");
const { Shipping, Payment, Order } = require("../controllers/orderController");


const router = express.Router();
router.route("/shipping").post(Shipping);
router.route("/payment").post(Payment);
router.route("/order").post(Order);

module.exports = router