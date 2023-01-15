const express = require("express");
const router = express.Router();
const SaleController = require("../controllers/sale_controller");
const db = require("../models/index");
const Transaction = db.transaction;

router.post("/new", async (req, res, next) => {
  const transaction = await Transaction.create();
  req.body.sales.forEach(async (sale) => {
    const skuId = sale.skuId;
    const saleUnits = sale.units;
    const dollarAmount = sale.dollarAmount;
    await SaleController.create({
      skuId,
      saleUnits,
      dollarAmount,
      transaction,
    });
  });
});

module.exports = router;
