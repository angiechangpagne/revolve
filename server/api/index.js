const router = require('express').Router(); 
const userAndReminderRoutes=require('./userAndReminder');

router.use('/', userAndReminderRoutes);

module.exports = router;