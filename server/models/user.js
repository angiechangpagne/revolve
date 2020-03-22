const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MONGODB_URI = 'mongodb+srv://violet:VIOLET66@cluster0-fpdoy.mongodb.net/test?retryWrites=true&w=majority';
//set up a promise in mongoose
mongoose.Promise=global.Promise=global.Promise;
//Connect to MongoDB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/revolve", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //sets name of DB that collections are part of
    dbName: 'revolve'
    }
    ).then(() => console.log('MongoDB Connected')).catch(err => console.log(err));
    //show any mongoose errors
var db = mongoose.connection;
// //show any mongoose errors

db.on("error", (err) => {
  console.log("Mongoose Error: ", err);
});
//once logged in to db through mongoose, log a success message
db.once("open", () => {
  console.log("Mongoose connection successful.");
});
// //once logged in to db through mongoose, log a success message
// db.once("open", () => {
//   console.log("Mongoose connection successful.");
// });
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
    validate: (email) => {
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