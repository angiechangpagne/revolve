'use strict';

const CronJob = require('cron').CronJob;
const moment = require('moment');
const notification = require('./workers/notifications');


const schedulerTimer = () => {
  return {
    start: () => {
      new CronJob('00 * * * * *', () => {
        console.log("Running send notification worker for" + moment().format());
        notification.run();
      }, null, true, '');
    },
  };
};


module.exports = schedulerTimer();