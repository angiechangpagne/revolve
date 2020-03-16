var express = require('express');

var createError = require('http-errors');
var cors = require('cors');

var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./api/routes/index');
var testAPIRouter = require('./api/routes/testAPI');

// const MongoClient = require('mongodb').MongoClient;
var mongoose= require('mongoose')
var app = express();  


const port = process.env.PORT || 9000;

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const mongoURI = 'mongodb+srv://violet:VIOLET66@cluster0-fpdoy.mongodb.net/test?retryWrites=true&w=majority'

//  const client = new MongoClient( mongoURI, { useNewUrlParser: true });
//  client.connect( err => {
//    const collection=client.db("test").collection("devices");
//    client.close();
//  });
mongoose
  .connect(
      mongoURI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

// err => {
//   const collection = client.db("test").collection("devices");
//   client.close();

var Users = require('./api/routes/Users');
app.use('/users',Users);


app.use('/', indexRouter);
// app.use('/users', users);
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


app.listen(port, () => console.log(`Server Listening on port ${port}`))


// module.exports = app;
