module.exports = (sequelize, Sequelize) => {
  const Transaction = sequelize.define(
    "Transaction",
    {},
    {
      tableName: "transaction",
    }
  );
  // Size.sync();
  return Transaction;
};
