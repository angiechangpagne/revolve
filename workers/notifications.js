const Reminder = require('../server/models').Reminder;


const notificatoons = () => {
  return {
    run: () => {
      Reminder.sendNotification();
      Reminder.updateNotifications();
    },
  };
};

module.exports = notifications();