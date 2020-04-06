const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
// const compression = require('compression');
const bodyParser = require('body-parser');
const apiRouter = require('./api/userAndReminder'); //all the routes in the api routes folder
require('dotenv').config();
const path = require('path');
const port = process.env.PORT || 5001;
global.path=path;
const app = express(); //invoke express  instance
//require routers
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cookieParser = require('cookie-parser');
//configure body parser for AJAX requests, request body
app.use(cookieParser());
// app.options('*', cors()) // include preflight before other routes

//do this before using the middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 
                'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  console.log('cors headers', res);
  // res.status(200).json({});
  // next();
});

//add routes to be used in our app
app.use('/api', apiRouter);

//declare dependencies
// if(process.env.NODE_ENV === 'production') {  
//   app.use(express.static(path.join(__dirname, 'client/build'))); 
// }  //  app.get('*', (req, res) => {    res.sendfile(path.join(__dirname = 'client/build/index.html'));  })}

// const router = express.Router();

//notification scheduler 
// const createError = require('http-errors');
// const logger = require('morgan');
// const scheduler = require('./scheduler');
// app.use(logger('dev'));
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname,'public', 'index.html'))
});
app.use('/assets', express.static(path.resolve(__dirname, '../client/public/assets')));
app.use('/public', express.static(path.resolve(__dirname,'../client/public')));
// app.use(compression());

//serve static assets
console.log("in line 26 of express server and dirname is", __dirname);
// app.use(express.static(path.resolve(__dirname, 'client/public/assets')));

// app.use(logger('dev'));
//react-router handles route on client side
// app.get('*', (req, res) => 
//   res.status(200).sendFile(path.resolve(__dirname, '../client/public/index.html'))
// );
// app.post(`/api/signup`,(req, res, next) => {
//   // apiRouter.route(`/signup`);
//   console.log('about to go to api routes middleware from express server');
//   app.use(`/signup`,apiRouter);

//   next();
// });
//run reminder notification scheduler
// scheduler.start();


// const indexRouter = require('./routes/index');
// const testAPIRouter = require('./api/routes/testAPI');
// const Users = require('./routes/Users');


// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
// app.use('/users',Users);

// app.set('index',__dirname, )
// err => {
//   const collection = client.db("test").collection("devices");

// app.use('/', indexRouter);
// app.use('/users', users);
// app.use('/testAPI', testAPIRouter);

//catching a form submit
// app.post('/',(req, res) => {
//   res.send(req.body);
//   console.log(req.body);
//   const { number, text } = req.body;

// const io = socketio(server);
// io.on('connection', (socket) => {
//   console.log('Connected socket io');
//   io.on('disconnect', () => {
//     console.log('Disconnected Socket io');
//   })
// });

// catch 404 and forward to error handler
app.use((req, res) =>  {
  //next(createError(404));
  res.sendStatus(404);
});

// error handler
app.use((err, req, res, next) =>  {
  // set locals, only providing error in development
  console.log('line 33 of server with res.locals:', res.locals);
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
  // render the error page
  // res.status(err.status || 500);
  // console.log('res.status:', res.status);
  // res.render('error');
});
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

//order of routes matters, there is no hoisting

const uri = process.env.MONGODB_URI;
//set up a promise in mongoose
// const MongoClient = require('mongodb').MongoClient;
mongoose.Promise=global.Promise //=global.Promise;
//Connect to MongoDB
mongoose.connect(
 uri || 'mongodb://localhost:27017/revolve', {
    useNewUrlParser: true,
    useUnifiedTopology: true
    }).then(() => {
      console.log('MongoDB Connected');
      const db = mongoose.connection;
      // //show any mongoose errors
      app.listen(port, () => console.log(`🌎  ==> Server Listening on PORT ${port}`));

      db.on('error', (err) => {
        console.log('Mongoose Error: ', err);
      })
      //once logged in to db through mongoose, log a success message
      db.once('open', () => {
        console.log("Mongoose connection successful.");
      })
    }).catch(err => console.log(err));

module.exports = app;
