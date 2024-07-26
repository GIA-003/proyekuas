const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const DataHama = require('./DataHama');

const KasusHama = sequelize.define('KasusHama', {
  id_kasus: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_hama: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: DataHama,
      key: 'id_hama'
    }
  },
  lokasi: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tanggal_kasus: {
    type: DataTypes.DATE,
    allowNull: false
  },
  deskripsi_kasus: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  timestamps: false
});
KasusHama.belongsTo(DataHama, { foreignKey: 'id_hama' });
DataHama.hasMany(KasusHama, {foreignKey:'id_hama'})

module.exports = KasusHama;
