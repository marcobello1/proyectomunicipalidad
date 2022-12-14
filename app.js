var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require("express-session");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var userLoggedMiddleware = require('./src/middlewares/userLoggedMiddleware');

var app = express();


// session
app.use(session({secret: "Shh, it's a secret!", resave: false, saveUninitialized: false}))
app.use(cookieParser())
app.use(userLoggedMiddleware)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler



module.exports = app;
