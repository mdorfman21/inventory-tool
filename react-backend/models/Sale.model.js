module.exports = (sequelize, Sequelize) => {
    const Sale = sequelize.define("Sale", {
      units: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.INTEGER
      }
      
    },{
        tableName: 'sale',
      });
    // Size.sync();
    return Sale;
  };