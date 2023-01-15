const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventory_controller");

console.log(inventoryController);

router.post("/new", async (req, res, next) => {
  await inventoryController.create({
    sku_id: req.body.sku_id,
    size: req.body.size,
    amount: req.body.amount,
  });
  res.send("inventory done");
});

router.put("/update/:id", async (req, res, next) => {});

module.exports = router;
