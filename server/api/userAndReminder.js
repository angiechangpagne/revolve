const express = require('express'); //in case of asyc
const router = express.Router();
const userController = require('../controllers/userController');
const rmdrController = require('../controllers/rmdrController');

//Matches with "/api/login"
router.route('/login')
  .post(userController.findOne);

// router.route('/signup')
//   .post(userController.create(req,res,
//     (req,res) => res.status(200).json(res.locals))
//     );
  //Matches with "/api/signup"
  router.post(`/signup`, 
  userController.create
  // ,(req,res) => {
  //   console.log('req.body', req.body);
  //   console.log('res.locals line 17 of api reminder', res.locals);
  //   res.status(200).json(res.locals.user)
    // .catch(err => console.log("error", err)) 
  // }
);

router.route('/user/:userid/rmdr/:id*?')
  .get(rmdrController.get)
  .post(rmdrController.create)
  .put(rmdrController.update)
  .delete(rmdrController.remove);

module.exports = router;