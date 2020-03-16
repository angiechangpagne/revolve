var createError = require('http-errors');
var express = require('express');
const bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var indexRouter = require('./routes/index');
var users = require('./routes/users');
var testAPIRouter = require('./routes/testAPI');

const mongoose = require('mongoose');
var app = express();


const port = process.env.PORT || 9000;

app.use('/users',users);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const mongoURI = '';

mongoose.connect(
  mongoURI, 
  { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));





app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/testAPI', testAPIRouter);

app.get('/api/hello',(req,res) => {
  res.send({ express: 'Hello Halfaxa'});
});

app.post('/api/world', (req, res) => {
  console.log('req is', req.body);
  // console.log('res on line 35 of server is',res);
  res.send(
    `POST response is: ${req.body.post}`,
  );
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log('line 33 of app with res.locals:', res.locals);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log('res.status:', res.status);
  res.render('error');
});


app.listen(port, () => console.log(`Server Listening on port ${port}`));
module.exports = app;
