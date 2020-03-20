const Reminder = require('../models').Reminder;

const notifications = () => {
  return {
    run: () => {
      Reminder.sendNotifications();
      Reminder.updateNotifications();
    },
  };
};

module.exports = notifications();
