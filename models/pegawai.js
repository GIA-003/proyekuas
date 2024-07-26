const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Pegawai = sequelize.define('Pegawai', {
 pegawaiID: {
 type: DataTypes.INTEGER,
 autoIncrement: true,
 primaryKey: true
 },
 nama_pegawai: {
 type: DataTypes.STRING,
 allowNull: false
 },
 jabatan: {
 type: DataTypes.STRING,
 allowNull: false
 },
 gaji: {
    type: DataTypes.INTEGER,
    allowNull: false
 },
 alamat: {
    type: DataTypes.STRING,
    allowNull: false
 },
 kontak : {
    type: DataTypes.STRING,
    allowNull: false
 }
}, {
 timestamps: false
});
module.exports = Pegawai;