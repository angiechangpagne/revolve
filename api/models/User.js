const mongoose = require('mongoose')
const Schema = mongoose.Schema
// //Set up default mongoose connection
// var mongoDB = 'mongodb://127.0.0.1/my_database';
// mongoose.connect(mongoDB, { useNewUrlParser: true });
//  //Get the default connection
// var db = mongoose.connection;
// //Bind connection to error event (to get notification of connection errors)
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.on('error', console.error.bind(console, 'MongoDB connection error:')); = require('mongoose')


//create Schema
const UserSchema = new Schema({
  first_name: {
    type: String
  }, 
  last_name: {
    type: String
  },
  email: {
    type: String, 
    required: true
  }, 
  password: {
    type: String,
    required: true
  }, 
  date: {
    type: Date,
    default: Date.now
  }
  })

  module.exports = User = mongoose.model('users', UserSchema)