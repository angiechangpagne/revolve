// 'use strict';
// require('dotenv').config();
//declare dependencies
// const mongoose = require('mongoose')
const path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express(); //invoke express  instance
//require routers
const apiRouter = require('./api/userAndReminder'); //all the routes in the api routes folder
// const router = express.Router();
const port = 3001;
//notification scheduler 

//configure body parser for AJAX requests, request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const createError = require('http-errors');
const logger = require('morgan');
const scheduler = require('./scheduler');
const cors = require('cors');
var cookieParser = require('cookie-parser');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//add routes to be used in our app
app.use('/api',apiRouter);

// app.post(`/api/signup`,(req, res, next) => {
//   // apiRouter.route(`/signup`);
//   console.log('about to go to api routes middleware from express server');
//   app.use(`/signup`,apiRouter);

//   next();
// });


//serve static assets
console.log("in line 26 of express server and dirname is", __dirname);
// app.use('/assets', express.static(path.resolve(__dirname, '../client/public/assets')));
app.use('/public', express.static(path.resolve(__dirname,'public')));
// app.use(express.static(path.resolve(__dirname, 'client/public/assets')));

// app.use(logger('dev'));
//react-router handles route on client side
app.get('/', (req, res) => 
  res.status(200).sendFile(path.resolve(__dirname, '../client/public/index.html'))
);

//run reminder notification scheduler
scheduler.start();


const socketio = require('socket.io');
const Nexmo = require('nexmo');

const nexmo = new Nexmo({
  apiKey: 'df0eb028',
  apiSecret: 'vgzyF8q3FPMz9Sep',
}, { debug: true });

const from = '17402426262';
const to = '19143648047';
const text = 'Hello from Nexmo';

nexmo.message.sendSms(from, to, text);



// const indexRouter = require('./routes/index');
// const testAPIRouter = require('./api/routes/testAPI');
// const Users = require('./routes/Users');

// const MongoClient = require('mongodb').MongoClient;

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');


// app.use('/users',Users);


//mongodb+srv://violet:<password>@cluster0-fpdoy.mongodb.net/test?retryWrites=true&w=majority
//  const client = new MongoClient( mongoURI, { useNewUrlParser: true });
//  client.connect( err => {
//    const collection=client.db("test").collection("devices");
//    client.close();
//  });

//const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://violet:VIOLET66@cluster0-fpdoy.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

// app.set('index',__dirname, )
// err => {
//   const collection = client.db("test").collection("devices");
//   client.close();



// app.use('/', indexRouter);
// app.use('/users', users);
// app.use('/testAPI', testAPIRouter);


app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname,'public', 'index.html'))
});
//catching a form submit
// app.post('/',(req, res) => {
//   res.send(req.body);
//   console.log(req.body);
//   const { number, text } = req.body;

//   nexmo.message.sendSms(
//     from, number, text, { type: 'unicode' },
//     (err, responseData) => {
//       if(err){
//         console.log(err);
//       } else {
//         const { messages } = responseData;
//         const { ['message-id']: id, ['to']: number, ['error-text']: error } = messages[0];
//         console.dir(responseData);
//         const data = {
//           id, 
//           number, 
//           error
//         };
//         //emit ato client
//         io.emit('smsStatus', data);
//       }
//     }
//   );
// });

// app.use('/signup', routes);
// app.post('/api/signup',apiRoutes, (req,res,next) => {
//   console.log('in post line 161');
//   res.status(200).json();
//   next()
//   // res.send('/signup', routes);
//   // router.post('/signup', routes);
//   // .route('/signup');
// })

// app.post('/api/world', (req, res) => {
//   console.log('req is', req.body);
//   // console.log('res on line 35 of server is',res);
//   res.send(
//     `POST response is: ${req.body.post}`,
//   );
// });

// catch 404 and forward to error handler
app.use((req, res, next) =>  {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) =>  {
  // set locals, only providing error in development
  console.log('line 33 of app with res.locals:', res.locals);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log('res.status:', res.status);
  res.render('error');
});


// mongoose.connect(url,{useNewUrlParser: true})
// .then(()=>{
//   app.listen(port, () => console.log(`🌎  ==> Server Listening on port ${port}`));
// })
// .catch(err => console.log(err));
const server=app.listen(port, () => console.log(`🌎  ==> Server Listening on port ${port}`));

// const io = socketio(server);
// io.on('connection', (socket) => {
//   console.log('Connected socket io');
//   io.on('disconnect', () => {
//     console.log('Disconnected Socket io');
//   })
// });


module.exports = app;
