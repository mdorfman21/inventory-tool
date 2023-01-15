const { sequelize } = require("../models/index");
const db = require("../models/index");
const SKU = db.sku;
const Inventory = db.inventory;
const InventoryLog = db.inventoryLog;

const create = async ({ sku_id, size, amount }) => {
  const sku = await SKU.findOne({
    where: { sku_id, SizeId: size },
  });
  const [inv, created] = await Inventory.findOrCreate({
    where: { SKUId: sku.id },
    defaults: {
      amount: amount,
      currentRevision: 1,
    },
  });

  if (!created) {
    // return inventory already exists
    // inv.increment("currentRevision");
  }
  await sku.update({ InventoryId: inv.id });
  await InventoryLog.create({
    amount: inv.amount,
    revision: 1,
    InventoryId: inv.id,
  });
};

const update = async ({ invId, amount }) => {
  const inventory = await Inventory.findOne({ where: { id: invId } });
  const latestLog = await InventoryLog.findAll({
    attributes: [[sequelize.fn("max", sequelize.col("id"))]],
    where: { InventoryId: invId },
  });
  await inventory.update({
    amount,
    currentRevision: sequelize.literal("currentRevision + 1"),
  });
  await InventoryLog.create({
    amount,
    revision: latestLog.revision + 1,
    InventoryId: invId,
  });
};

module.exports = {
  create,
  update,
};
