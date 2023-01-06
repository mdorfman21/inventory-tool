module.exports = (sequelize, Sequelize) => {
    const Company = sequelize.define("Company", {
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
    }, {
        tableName: 'company',
      });
    // Company.sync();
    return Company;
  };