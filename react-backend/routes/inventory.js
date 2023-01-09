const express = require("express");
const router = express.Router();
const InventoryController = require("../controllers/inventory_controller");

router.post("inventory/new", async (req, res, next) => {
  await InventoryController.create(req);
  res.send("inventory done");
});
