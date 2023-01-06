module.exports = (sequelize, Sequelize) => {
    const Inventory = sequelize.define("Inventory", {
      amount: {
        type: Sequelize.INTEGER
      },
      currentRevision: {
        type: Sequelize.INTEGER
      }
    }, {
        tableName: 'inventory',
      });
   
    return Inventory;
  };