module.exports = (sequelize, Sequelize) => {
  const SKU = sequelize.define("SKU", {
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    msrp: {
      type: Sequelize.INTEGER
    },
    style: {
      type: Sequelize.STRING
    },
    color: {
      type: Sequelize.STRING
    },
    season: {
      type: Sequelize.STRING
    },
    sku_id: {
      type: Sequelize.STRING
    },
    hasSize: {
      type: Sequelize.BOOLEAN
    },
    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    }
  },{
    tableName: 'sku',
  });
  // SKU.sync();
  return SKU;
};