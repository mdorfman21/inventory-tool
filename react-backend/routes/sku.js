const express = require("express");
const router = express.Router();
const db = require("../models/index");
const SKU = db.sku;
const Size = db.size;
const skuController = require("../controllers/sku_controller");
console.log(skuController);

/**
 * Create a sku
 */
router.post("/create", async (req, res, next) => {
  await skuController.create(req);
});

/**
 * Get all skus
 */
router.get("/all", async (req, res, next) => {
  const allData = await skuController.getAll();
  res.send(allData);
});

router.get("/:sku_id", async (req, res, next) => {
  const topLine = await skuController.getBySkuId(req);
  res.send(topLine);
});

router.put("/edit/:sku_id", async (req, res, next) => {
  const skus = await SKU.findAll({ where: { sku_id: req.params.sku_id } });
  /*
   *this would be a function to call if there is no sku size and had sku sizes but dont know how to solve the
   *issue of which sku id should be the main one after disabling all skus that have a size instead of
   */
  // if (!req.body.skuHasSize && skus.length > 1) {
  //   SKU.update({
  //   await SKU.update({
  //     msrp: req.body.msrp,
  //     name: req.body.name,
  //     style: req.body.style,
  //     season: req.body.season,
  //     hasSize: req.body.skuHasSize,
  //     description: req.body.description,
  //     color: req.body.color,
  //     sku_id: req.body.skuId,
  //     active: false,
  //   },{
  //     where: {sku_id: req.params.sku_id}
  //   });
  // })
  // }

  if (!req.body.skuHasSize) {
    await SKU.update(
      {
        msrp: req.body.msrp,
        name: req.body.name,
        style: req.body.style,
        season: req.body.season,
        hasSize: req.body.skuHasSize,
        description: req.body.description,
        color: req.body.color,
        sku_id: req.body.skuId,
      },
      {
        where: { sku_id: req.params.sku_id },
      }
    );
  }

  if (req.body.skuHasSize) {
    const sizeArray = skus.map((sku) => sku.SizeId);

    const sizesToDisable = sizeArray.filter((x) => !req.body.sizes.includes(x));
    const sizesToEnable = req.body.sizes.filter((x) => !sizeArray.includes(x));
    sizesToEnable.forEach(async (size) => {
      const [sku, created] = await SKU.findOrCreate({
        where: { sku_id: req.params.sku_id, SizeId: size },
        defaults: {
          msrp: req.body.msrp,
          name: req.body.name,
          style: req.body.style,
          season: req.body.season,
          hasSize: req.body.skuHasSize,
          description: req.body.description,
          color: req.body.color,
          sku_id: req.body.skuId,
          SizeId: size,
        },
      });
      if (!created) {
        await sku.update({
          msrp: req.body.msrp,
          name: req.body.name,
          style: req.body.style,
          season: req.body.season,
          hasSize: req.body.skuHasSize,
          description: req.body.description,
          color: req.body.color,
          sku_id: req.body.skuId,
          SizeId: size,
        });
      }
    });
    console.log(sizesToDisable);
    sizesToDisable.forEach(async (size) => {
      const sku = await SKU.findOne({
        where: { sku_id: req.params.sku_id, SizeId: size },
      });
      await sku.update({
        active: false,
        msrp: req.body.msrp,
        name: req.body.name,
        style: req.body.style,
        season: req.body.season,
        hasSize: req.body.skuHasSize,
        description: req.body.description,
        color: req.body.color,
        sku_id: req.body.skuId,
        SizeId: size,
      });
    });

    await SKU.update(
      {
        msrp: req.body.msrp,
        name: req.body.name,
        style: req.body.style,
        season: req.body.season,
        hasSize: req.body.skuHasSize,
        description: req.body.description,
        color: req.body.color,
        sku_id: req.body.skuId,
      },
      {
        where: { sku_id: req.params.sku_id },
      }
    );
  }
});

module.exports = router;
