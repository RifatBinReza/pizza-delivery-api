const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order");
const userController = require("../controllers/user");

// Order routes
router.post("/order/add", orderController.addOrder);
router.get("/order/:id", orderController.getOrderById);
router.post("/order/:id/update", orderController.updateOrderById);
router.post("/order/:id/status", orderController.updateDeliveryStatusById);

// User routes
router.post("/user/add", userController.addUser);

module.exports = router