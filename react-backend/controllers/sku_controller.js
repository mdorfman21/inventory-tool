const db = require("../models/index");
const SKU = db.sku;
const Size = db.size;
const Inventory = db.inventory;

const getAll = async () => {
  const topLine = await SKU.findAll({ group: ["sku_id"] });
  const promises = await topLine.map(async (sku) => {
    sku.dataValues.totalInventory = 0;
    if (sku.hasSize) {
      sku.dataValues.associatedSizes = await SKU.findAll({
        where: { sku_id: sku.sku_id },
        include: [Size, Inventory],
      });
    }
    if (sku.InventoryId && sku.dataValues.associatedSizes) {
      sku.dataValues.associatedSizes.forEach(
        (size) => (sku.dataValues.totalInventory += size.Inventory.amount)
      );
    } else if (sku.InventoryId && !sku.associatedSizes) {
      sku.dataValues.totalInventory = sku.Inventory.amount;
    }

    return sku;
  });
  const allData = await Promise.all(promises);
  return allData;
};

const create = async (req) => {
  if (req.body.skuHasSize) {
    req.body.sizes.forEach(async (size) => {
      await SKU.create({
        msrp: req.body.msrp,
        name: req.body.name,
        style: req.body.style,
        season: req.body.season,
        hasSize: req.body.skuHasSize,
        SizeId: size,
        description: req.body.description,
        color: req.body.color,
        sku_id: req.body.skuId,
      });
    });
  } else {
    await SKU.create({
      msrp: req.body.msrp,
      name: req.body.name,
      style: req.body.style,
      season: req.body.season,
      hasSize: req.body.skuHasSize,
      description: req.body.description,
      color: req.body.color,
      sku_id: req.body.skuId,
    });
  }
};

const getBySkuId = async (req) => {
  const topLine = await SKU.findOne({
    where: {
      sku_id: req.params.sku_id,
    },
    group: ["sku_id"],
  });
  if (topLine && topLine.hasSize) {
    topLine.dataValues.associatedSizes = await SKU.findAll({
      where: { name: topLine.name },
      include: [Size, Inventory],
    });
  }
  return topLine;
};

const getById = async (req) => {
  return await SKU.findOne({
    where: { id: req.params.id },
    include: [Size, Inventory],
  });
};

module.exports = {
  getAll,
  create,
  getBySkuId,
  getById,
};
