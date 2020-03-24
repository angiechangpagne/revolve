const express = require('express'); //in case of asyc
const router = express.Router();
// const bodyParser = require('body-parser');
// app.use(bodyParser.json()); //make app var available globally
// app.use(bodyParser.urlencoded({ extended: true }));
const userController = require('../controllers/userController');
const rmdrController = require('../controllers/rmdrController');

//Matches with "/api/login"
router.route('/login')
  .post(userController.findOne, (req, res)=>{
    console.log('res.locals on api middleware routes', res.locals);
    console.log('res.data', res.data);
    if(res.locals.isValidPassword) {
      res.status(200).json(res);
    }
    else{
      res.status(402).json(res);
    }
  });

//   .post(userController.create(req,res,
//    
//     );
  //Matches with "/api/signup"
router.route('/signup')
  .post(userController.create, (req,res) =>{
      console.log('res.locals line 17 of api reminder middle routes', res.locals);
      res.status(201).send(res); //axios res body will be data
      //next();
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