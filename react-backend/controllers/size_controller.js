const db = require("../models/index");
const Size = db.size;

const create = async (req) => {
  await Size.create({ size: req.body.size });
};
module.exports = {
  create,
};
