module.exports = (sequelize, Sequelize) => {
  const Sale = sequelize.define(
    "Sale",
    {
      units: {
        type: Sequelize.STRING,
      },
      dollarAmount: {
        type: Sequelize.INTEGER,
      },
      return: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      saleDate: {
        type: Sequelize.DATE,
      },
    },
    {
      tableName: "sale",
    }
  );
  // Size.sync();
  return Sale;
};
