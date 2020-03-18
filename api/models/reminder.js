const mongoose = require('mongoose');
const moment = require('moment');
const Twilio = require('twilio');
const config = require('../config');

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
  console.log('searchDate : '+searchDate);
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
      
      
      const client = new Twilio(config.twilioAccount$id, config.twilioAuthToken);
      reminders.forEach((reminder) => {
        const message = {
          to: `+1${reminder.reminderNumber}`,
          from: config.twilioPhoneNumber,
          body: `Hi! Just a reminder to ${reminder.reminderName} is up in ${reminder.notificationLabel}!`,
        };

        client.reminders.create(reminder, (err, res) => {
          if(err) {
            console.log(err);
          } else {
            let phoneNumber = reminder.reminderNumber;
            console.log(`Reminder sent to ${phoneNumber}`);
          }
        });
      });
      if(callback) {
        callback.call();
      }
    }
};

reminderSchema.statics.updateNotifications = () => {
  console.log("I am finding an expired reminder");
  Reminder
    .updateMany( { "time" : { $lte : new Date() }, "notification" : { $gt : 0 } }, { $set : { "notification" : 0} } )
    .then(dbRmdr => console.log(dbRmdr))
    .catch(err => console.log(err)); 
}

const Reminder = mongoose.model("Reminder", reminderSchema);
module.exports = Reminder; 