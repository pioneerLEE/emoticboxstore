var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var socialRouter = require('./routes/social');
var purchaseRouter = require('./routes/purchase');
var mypageRouter = require('./routes/mypage')
var searchRouter = require('./routes/search');
var pageRouter = require('./routes/page');

var passport = require('passport');
var app = express();
var connect = require('./schemas');
connect();

app.set('port', process.env.PORT || 8001);
// view engine setup
app.set('views', path.join(__dirname, 'views'));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/', pageRouter);
app.use('/', purchaseRouter);
app.use('/social',socialRouter);
app.use('/mypage',mypageRouter);
app.use('/search',searchRouter);

//404처리 미들웨어
app.use((req,res,next)=>{
    const err = new Error('NOT FOUND');
    err.status = 404;
    next(err);
});
//에러 핸들러
app.use((err,req,res)=>{
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development'?err:{};
    res.status(err.status || 500);
    console.log(error);
    res.render('error');
});
app.listen(app.get('port'),()=>{
  console.log(app.get('port'),'번 포트가 실행 중 입니다.');
})

module.exports = app;
