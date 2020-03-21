// 'use strict';
// require('dotenv').config();
//declare dependencies
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose= require('mongoose');
//require routers
const apiRouter = require('/api/userAndReminder'); //all the routes in the api routes folder
const app = express(); //invoke express  
// const router = express.Router();
const port = process.env.PORT || 3001;
//notification scheduler 

const createError = require('http-errors');

const cors = require('cors');

const cookieParser = require('cookie-parser');
const logger = require('morgan');
const scheduler = require('./scheduler');

//configure body parser for AJAX requests, request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//serve static assets
app.use(express.static(path.resolve(__dirname, 'client/public/assets')));

//add routes to be used in our app
app.use('/api/signup',apiRouter);
app.use('/api/login', apiRouter);


app.use(logger('dev'));
//react-router handles route on client side
app.get('/', (req, res) => 
  res.status(200).sendFile(path.resolve(__dirname, '../client/public/index.html'))
);

const MONGODC_URI = 'mongodb+srv://violet:VIOLET66@cluster0-fpdoy.mongodb.net/test?retryWrites=true&w=majority';
//set up a promise in mongoose
mongoose.Promise=global.Promise=global.Promise;

//Connect to MongoDB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/revolve", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    }
    ).then(() => console.log('MongoDB Connected')).catch(err => console.log(err));

const db = mongoose.connection;

//show any mongoose errors
db.on("error", (err) => {
  console.log("Mongoose Error: ", err);
});

//once logged in to db through mongoose, log a success message
db.once("open", () => {
  console.log("Mongoose connection successful.");
});

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
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, 'public')));

// app.use('/users',Users);

//mongodb+srv://violet:<password>@cluster0-fpdoy.mongodb.net/test?retryWrites=true&w=majority
//  const client = new MongoClient( mongoURI, { useNewUrlParser: true });
//  client.connect( err => {
//    const collection=client.db("test").collection("devices");
//    client.close();
//  });

//const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://violet:VIOLET66@cluster0-fpdoy.mongodb.net/test?retryWrites=true&w=majority";
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
app.post('/api/signup',apiRoutes, (req,res,next) => {
  console.log('in post line 161');
  res.status(200).json();
  next()
//   // res.send('/signup', routes);
//   // router.post('/signup', routes);
//   // .route('/signup');
})

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

const server = app.listen(port, () => console.log(`🌎  ==> Server Listening on port ${port}`));

const io = socketio(server);
io.on('connection', (socket) => {
  console.log('Connected socket io');
  io.on('disconnect', () => {
    console.log('Disconnected Socket io');
  })
});


module.exports = app;
