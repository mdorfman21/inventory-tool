const db = require("../models/index");
const SKU = db.sku;
const Inventory = db.inventory;
const InventoryLog = db.inventory_log;

const create = async (req) => {
  const sku = await SKU.findOne({
    where: { sku_id: req.body.sku_id, SizeId: req.body.size },
  });
  const [inv, created] = await Inventory.findOrCreate({
    where: { SKUId: sku.id },
    defaults: {
      amount: req.body.amount,
      currentRevision: 1,
    },
  });

  if (!created) {
    // return inventory already exists
    // inv.increment("currentRevision");
  }

  await InventoryLog.create({
    amount: inv.amount,
    revision: 1,
    InventoryId: inv.id,
  });
};

const update = async (req) => {};

module.exports = {
  create,
};
