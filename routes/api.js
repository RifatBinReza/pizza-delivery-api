const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order");
const userController = require("../controllers/user");

/**
 * TODO: For scaling the application, we can use express for only /order route from here
 * TODO: and have a different file called ./routes/order/order.js where we can define all the order routes separately
 */

// Order routes
router.post("/order/add", orderController.addOrder);
router.get("/order/:id", orderController.getOrderById);
router.post("/order/:id/update", orderController.updateOrderById);
router.post("/order/:id/status", orderController.updateDeliveryStatusById);
router.get("/order/:id/remove", orderController.removeOrderById);
router.get("/orders/filter", orderController.filterOrder);

// User routes
router.post("/user/add", userController.addUser);

module.exports = router