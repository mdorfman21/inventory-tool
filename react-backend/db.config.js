module.exports = {
    HOST: "localhost",
    USER: "morgan",
    dialect: "mysql",
    DB: 'inventory',
    // PASSWORD: "root",
    port: '3306',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };