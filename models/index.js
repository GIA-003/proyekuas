const { Sequelize } = require('sequelize');
// Konfigurasi koneksi Sequelize
const sequelize = new Sequelize('sql12722294', 'sql12722294', 'J1tlkJf2a6', {
 host: 'sql12.freesqldatabase.com',
 dialect: 'mysql'
});
// Uji koneksi
sequelize.authenticate()
 .then(() => {
 console.log('Connection has been established successfully.');
 })
 .catch(err => {
 console.error('Unable to connect to the database:', err);
 });
// Ekspor instance sequelize untuk digunakan di tempat lain
module.exports = sequelize;
