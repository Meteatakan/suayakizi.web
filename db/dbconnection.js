
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './resource/data.sqlite' // Veritabanı dosyası burada saklanacak
  });

  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    waterPrint: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    color: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    timestamps: false
  });

  const ProductBarcode = sequelize.define('ProductBarcode', {
    barkodNo: {
      type: DataTypes.STRING,
      allowNull: false
    } 
  }, {
    timestamps: false
  });

  Product.hasMany(ProductBarcode, { foreignKey: 'product_id' });
  ProductBarcode.belongsTo(Product, { foreignKey: 'product_id' });

  sequelize.sync().then(() => {
    console.log('Veritabanı senkronize edildi.');
  });

  module.exports = { Product, ProductBarcode };