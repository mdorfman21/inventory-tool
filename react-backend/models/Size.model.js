module.exports = (sequelize, Sequelize) => {
    const Size = sequelize.define("Size", {
      size: {
        type: Sequelize.STRING
      },
      
    },{
        tableName: 'size',
      });
    // Size.sync();
    return Size;
  };