const dbConfig = require("../db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.sku = require("./SKU.model")(sequelize, Sequelize);
db.company = require("./Company.model")(sequelize, Sequelize);
db.size = require('./Size.model')(sequelize, Sequelize);
db.inventory = require('./Inventory.model')(sequelize, Sequelize);
db.inventoryLog = require('./InventoryLog.model')(sequelize, Sequelize);
db.sale = require('./Sale.model')(sequelize, Sequelize);

db.size.hasMany(db.sku);
db.sku.belongsTo(db.size);
db.inventory.belongsTo(db.sku);
db.sku.belongsTo(db.inventory);
db.inventory.hasMany(db.inventoryLog);
db.inventoryLog.belongsTo(db.inventory);
db.sku.hasMany(db.sale);
db.sale.belongsTo(db.sku);



db.sequelize.sync({ alter: true })
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

  module.exports = db;