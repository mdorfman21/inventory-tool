module.exports = (sequelize, Sequelize) => {
    const InventoryLog = sequelize.define("InventoryLog", {
      amount: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      revision: {
        type: Sequelize.INTEGER
      }
    }, {
        tableName: 'inventory_log',
      });
   
    return InventoryLog;
  };