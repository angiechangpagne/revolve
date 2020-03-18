const router = require('express').Router(); 
const userAndReminderRoutes=require('./userAndReminders');

router.use('/', userAndReminderRoutes);

module.exports = router;