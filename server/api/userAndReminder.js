const express = require('express'); //in case of asyc
const router = express.Router();
// const bodyParser = require('body-parser');
// app.use(bodyParser.json()); //make app var available globally
// app.use(bodyParser.urlencoded({ extended: true }));
const userController = require('../controllers/userController');
const rmdrController = require('../controllers/rmdrController');

//Matches with "/api/login"
router.route('/login')
  .post(userController.findOne, (res)=>{
    res.status(200).json(res.locals);
  });

//   .post(userController.create(req,res,
//    
//     );
  //Matches with "/api/signup"
router.route('/signup')
  .post(userController.create, (res) =>{
      console.log('res.locals line 17 of api reminder', res.locals);
      res.status(200).json(res.locals); //axios res body will be data
  });
  // ,(req,res) => {
  //   console.log('req.body', req.body);
  //   res.status(200).json(res.locals.user)
    // .catch(err => console.log("error", err)) 
  // }

router.route('/user/:userid/rmdr/:id*?')
  .get(rmdrController.get)
  .post(rmdrController.create)
  .put(rmdrController.update)
  .delete(rmdrController.remove);

module.exports = router;