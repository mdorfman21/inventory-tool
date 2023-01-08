const express = require("express");
const router = express.Router();
const sizeController = require("../controllers/size_controller");
const db = require("../models/index");
const Size = db.size;

router.get("/sizes", async (req, res, next) => {
  const sizes = await Size.findAll();
  res.send(sizes);
});

router.post("/size", async (req, res, next) => {
  await sizeController.create(req);
  res.send("done");
});

module.exports = router;
