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
  
}