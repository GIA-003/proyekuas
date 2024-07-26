var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var DataHamaRouter = require('./routes/DataHama');
var KasusHamaRouter = require('./routes/KasusHama');
var pegawaiRouter = require('./routes/pegawai');
var laporanRouter = require('./routes/laporan');
var sequelize = require('./models/index');
var authRouter = require('./routes/auth');
var Pegawai = require('./models/pegawai');
var DataHama = require('./models/DataHama');
var KasusHama = require('./models/KasusHama');
var Laporan = require('./models/laporan');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',  indexRouter);
app.use('/users', usersRouter);
app.use('/DataHama', DataHamaRouter);
app.use('/KasusHama', KasusHamaRouter);
app.use('/pegawai', pegawaiRouter);
app.use('/laporan', laporanRouter);
app.use('/auth', authRouter);

sequelize.sync()
 .then(() => {
 console.log('Database synchronized');
 })
 .catch(err => {
 console.error('Error synchronizing database:', err);
 });
module.exports = app;
