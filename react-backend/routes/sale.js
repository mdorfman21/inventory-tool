const express = require("express");
const router = express.Router();
const SaleController = require("../controllers/sale_controller");

router.post("/new", async (req, res, next) => {
  req.body.sales.forEach(async (sale) => {
    const skuId = sale.skuId;
    const saleUnits = sale.units;
    const dollarAmount = sale.dollarAmount;
    await SaleController.create({ skuId, saleUnits, dollarAmount });
  });
});

module.exports = router;
