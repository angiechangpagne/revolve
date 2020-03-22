const router = require('express').Router();
const userController = require('../controllers/userController');
const rmdrController = require('../controllers/rmdrController');

//Matches with "/api/login"
router.route('/login')
  .post(userController.findOne);

//Matches with "/api/signup"
// router.route('/signup')
//   .post(userController.create(req,res,
//     (req,res) => res.status(200).json(res.locals))
//     );
  
  router.post('/signup', 
  userController.create,
  (req,res) => {
    res.status(200).json(res.locals);
  }
);

router.route('/user/:userid/rmdr/:id*?')
  .get(rmdrController.get)
  .post(rmdrController.create)
  .put(rmdrController.update)
  .delete(rmdrController.remove);

module.exports = router;