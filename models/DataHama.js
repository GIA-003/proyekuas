const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const DataHama = sequelize.define('DataHama', {
  id_hama: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nama_hama: {
    type: DataTypes.STRING,
    allowNull: false
  },
  jenis_hama: {
    type: DataTypes.STRING,
    allowNull: false
  },
  deskripsi: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  timestamps: false
});
module.exports = DataHama;
