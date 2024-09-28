const createError = require('http-errors');
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fileUpload = require('express-fileupload');
const start = require('./services/db');
const indexRouter = require('./routes/index');

const app = express();

start();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

app.use('/', indexRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  const message = req.query.message || err.message;

  let locale = req.cookies['locale'] || 'en';

  if (!req.cookies['locale']) {
    res.cookie('locale', locale, { httpOnly: true });
  }
  if (locale === 'en'){
    res.render('en/error', { message });
  }
  else{
    res.render('ru/error', { message });
  }
});

app.listen(3000, () => {
  console.log('Сервер запущен на порту: http://localhost:3000');
});
