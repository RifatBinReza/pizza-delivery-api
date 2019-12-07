const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order");
const userController = require("../controllers/user");

router.post("/order/add", orderController.addOrder);
router.post("/user/add", userController.addUser);

module.exports = router