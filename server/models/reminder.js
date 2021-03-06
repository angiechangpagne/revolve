const mongoose = require('mongoose');
const moment = require('moment');
// const MONGODC_URI = 'mongodb+srv://violet:VIOLET66@cluster0-fpdoy.mongodb.net/test?retryWrites=true&w=majority';
// //set up a promise in mongoose
// mongoose.Promise=global.Promise=global.Promise;
// //Connect to MongoDB
// mongoose.connect(
//   process.env.MONGODB_URI || "mongodb://localhost/revolve", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     //sets name of DB that collections are part of
//     dbName: 'revolve'
//     }
//     ).then(() => console.log('MongoDB Connected')).catch(err => console.log(err));

//show any mongoose errors
// db.on("error", (err) => {
//   console.log("Mongoose Error: ", err);
// });

//once logged in to db through mongoose, log a success message
// db.once("open", () => {
//   console.log("Mongoose connection successful.");
// });
// const Twilio = require('twilio');
// const config = require('../../config');
const Nexmo = require('nexmo');
const nexmo = new Nexmo({
  apiKey: 'df0eb028',
  apiSecret: 'vgzyF8q3FPMz9Sep',
}, { debug: true });
const from = '17402426262';
const to = '19143648047';
const text = 'Hello from Nexmo';

const reminderSchema = new mongoose.Schema({
  reminderName: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    required: true
  },
  timeZone: {
    type: String,
    default: "America/Los_Angeles"
  },
  reminderNumber: {
    type: String, 
    required: true
  },
  notification: {
    type: Number,
    required: true
  },
  notificationLabel: {
    type: String, 
    required: true
  },
  coordinates: {
    type: Object
  },
  address: {
    type: String
  }
});

reminderSchema.methods.requiresNotification = (date) => {
  return Math.round(moment.duration(moment(this.time).utc()
                          .diff(moment(date).utc())
                          ).asMinutes()) === this.notification;
};

reminderSchema.statics.sendNotifications = (callback) => {
  const searchDate = new Date();
  console.log('searchDate : '+ searchDate);
  Reminder
    .find()
    .then((reminders) => {
      reminders = reminders.filter((reminder) => {
        return reminder.requiresNotification(searchDate);
      });
      if(reminders.length > 0){
        console.log("I found a Reminder!");
        console.log(reminders);
        sendNotifications(reminders);
      } else {
        console.log("duration");
        console.log(Math.round(moment.duration(moment(this.time).utc()
                        .diff(moment(searchDate).utc())
                        ).asMinutes()));
      }
    });

    const sendNotifications = (reminders) => {
      reminders.forEach((reminder) => {
        to = `+1${reminder.reminderNumber}`;
        from='17402426262';
        text= `Hi! Just a reminder to ${reminder.reminderName} is up in ${reminder.notificationLabel}!`;
        nexmo.message.sendSms(from, to, text);
        
        nexmo.message.sendSms(
          from, number, text, { type: 'unicode' },
          (err, responseData) => {
            if(err){ 
              console.log(err);
            } else {
              const { messages } = responseData;
              const { ['message-id']: id, ['to']: number, ['error-text']: error } = messages[0];
              console.dir(responseData);
                const data = {
                  id, 
                  number, 
                  error
                };
              //emit to client
                io.emit('smsStatus', data);              
              }
        });
      })
    }
    if(callback) {
      callback.call();
    }
                      // ``const client = new Twilio(config.twilioAccount$id, config.twilioAuthToken);
                      // reminders.forEach((reminder) => {
                      //   const message = {
                      //     to: `+1${reminder.reminderNumber}`,
                      //     from: config.twilioPhoneNumber,
                      //     body: `Hi! Just a reminder to ${reminder.reminderName} is up in ${reminder.notificationLabel}!`,
                      //   };

                      //   client.reminders.create(reminder, (err, res) => {
                        //     if(err) {
                        //       console.log(err);
                        //     } else {
                        //       let phoneNumber = reminder.reminderNumber;
                        //       console.log(`Reminder sent to ${phoneNumber}`);
                        //     }
                      //    });
                      //  }) ``
}

reminderSchema.statics.updateNotifications = () => {
  console.log("I am finding an expired reminder");
  Reminder //find past rmdrs 
    .updateMany( { "time" : { $lte : new Date() }, "notification" : { $gt : 0 } }, { $set : { "notification" : 0} } )
    .then(dbRmdr => console.log(dbRmdr))
    .catch(err => console.log(err)); 
}

const Reminder = mongoose.model("Reminder", reminderSchema);
module.exports = Reminder; 