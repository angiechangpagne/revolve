const Reminder = require('../api/models').Reminder;

const notifications = () => {
  return {
    run: () => {
      Reminder.sendNotifications();
      Reminder.updateNotifications();
    },
  };
};

module.exports = notifications();
