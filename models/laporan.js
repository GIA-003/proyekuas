const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const KasusHama = require('./KasusHama');
const Pegawai = require('./pegawai');
const DataHama = require('./DataHama');

// Mendefinisikan model Laporan
const Laporan = sequelize.define('Laporan', {
  id_laporan: {
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
  id_kasus: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: KasusHama,
      key: 'id_kasus'
    }
  },
  pegawaiID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Pegawai,
      key: 'pegawaiID'
    }
  },
  tanggal_laporan: {
    type: DataTypes.DATE,
    allowNull: false
  },
  deskripsi: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  file_path: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: false
});

Laporan.belongsTo(KasusHama, { foreignKey: 'id_kasus' });
KasusHama.hasMany(Laporan, { foreignKey: 'id_kasus' });

Laporan.belongsTo(Pegawai, { foreignKey: 'pegawaiID' });
Pegawai.hasMany(Laporan, { foreignKey: 'pegawaiID' });

Laporan.belongsTo(DataHama, { foreignKey: 'id_hama' });
DataHama.hasMany(Laporan, { foreignKey: 'id_hama' });


module.exports = Laporan;
