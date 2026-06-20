const express = require("express");
const { addOrder,fetchallOrders,fetchoneOrder,deleteOrder,updateOne,statusUpdate} = require("../contollers/order");
const { uploadFiles } = require("../middleware/multer");
const isAuth = require("../middleware/isAuth");
const router = express.Router();

// create order with file upload
router.post(
  "/order/new",
  isAuth,
  uploadFiles,
  addOrder
);

router.get(
  "/order/all_orders",
  fetchallOrders
);

router.get(
  "/order/single/:id",
  fetchoneOrder
);

router.get(
  "/order/:id",
  isAuth,
  deleteOrder
);

router.post(
  "/order/update/:id",
  isAuth,
  updateOne,
);

router.post(
  "/order/updateStatus/:id",
  isAuth,
  statusUpdate,
);
module.exports = router;