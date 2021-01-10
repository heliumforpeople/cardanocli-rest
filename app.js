let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let createError = require('http-errors');
const {cleanTMPFiles} = require('./src/helper');

let basicRouter = require('./routes/v1/basic');
let walletRouter = require('./routes/v1/wallet');
let poolRouter = require('./routes/v1/pool');
let transactionRouter = require('./routes/v1/transaction');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', basicRouter);
app.use('/api/v1', walletRouter);
app.use('/api/v1', poolRouter);
app.use('/api/v1', transactionRouter);

// Clean /public/tmp/* files older than 10min every 5min
cleanTMPFiles();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});
  
// error handler
app.use(function(err, req, res, next) {

    let status = (err.status || 500);
    let result = {error: status};

    if (req.app.get('env') === 'development') {
        result['message'] =  err.message;
    }

    res.status(status);
    res.json(result);
});

module.exports = app;
