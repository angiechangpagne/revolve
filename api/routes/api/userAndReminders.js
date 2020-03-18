const router = require('express').Router();
const userController = require('../../controllers/userController');

const appController = require('../../controllers/appController');

router.route('/login')
  .post(userController.findOne);


router.route('/signup')
  .post(userController.create);

router.route('/user/:userid/reminder/:id*?')
  .get(appController.get)
  .post(appController.create)
  .put(apController.update)
  .delete(appController.remove);

module.exports = router;