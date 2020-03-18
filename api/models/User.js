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

const userSchema = new Schema({
  firstname: {
    type: String, 
    required: true
  },
  lastName: {
    type: String, 
    required: true
  },
  email: {
    type: String,
    required: true,
    valudate: (email) => {
      return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
    }
  },
  password: {
    type: String,
    min: [6 ,'Password too short'],
    max: 16
  },
  mobileNumber: {
    type: String,
    // validate: {
    //   validator: v => return /\d{3}-\d{4/.test(v);
    //   },
    //   message: '{VALUE} is not valid phone number!'
    // },
    required: true
  },
  reminders: [
    {
      //we store Object Ids in array, which will refer to the ids in Note model
      type: Schema.Types.ObjectId,
      ref: "Reminder"
    }
  ]
});

const User = mongoose.model("User", userSchema);
//create Schema
// const UserSchema = new Schema({
//   first_name: {
//     type: String
//   }, 
//   last_name: {
//     type: String
//   },
//   email: {
//     type: String, 
//     required: true
//   }, 
//   password: {
//     type: String,
//     required: true
//   }, 
//   date: {
//     type: Date,
//     default: Date.now
//   }
//   })

  // module.exports = User = mongoose.model('users', UserSchema)
  module.exports = User;