const db = require("../models/index");
const InventoryController = require("./inventory_controller");
const SKU = db.sku;
const Inventory = db.inventory;
const InventoryLog = db.inventoryLog;
const Sale = db.sale;

const create = async ({ skuId, saleUnits, dollarAmount }) => {
  const inventory = await Inventory.findOne({ where: { SkuId: skuId } });
  await Sale.create({
    units: saleUnits,
    dollarAmount,
    SkuId: skuId,
  });
  await InventoryController.update({
    invId: inventory.id,
    amount: inventory.amount - saleUnits,
  });
};

module.exports = {
  create,
};
