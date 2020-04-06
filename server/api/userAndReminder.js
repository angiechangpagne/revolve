const express = require('express'); //in case of asyc
const router = express.Router();
// const cors = require('cors');
//express-validator
// const bodyParser = require('body-parser');
// app.use(bodyParser.json()); //make app var available globally
// app.use(bodyParser.urlencoded({ extended: true }));
const userController = require('../controllers/userController');
const rmdrController = require('../controllers/rmdrController');

//Matches with "/api/login"
router.route('/login')
  .post(userController.findOne, (req, res)=>{
    console.log('res.locals on api middleware routes', res.locals);
    // console.log('res.data', res.data);
    if(res.locals.isValidPassword) {
      return res.json(res.locals);
    }
    else{
      return res.json(res.locals);
    }
  })
//   .post(userController.create(req,res,
//    
//     );
  //Matches with "/api/signup"
router.route('/signup')
  .post(userController.create, (req,res) =>{
      console.log('res.locals line 17 of api reminder middle routes', res.locals);
      if(res.locals.isEmailUnique){
        // res.status(203); //axios res body will be data, end of backend middleware express chain,
        return res.json(res.locals);
        //return res.json(res.locals);
      }
      else{
        // res.status(403);
        return res.json(res.locals);
      }
  })
  // ,(req,res) => {
  //   console.log('req.body', req.body);
  //   res.status(200).json(res.locals.user)
    // .catch(err => console.log("error", err)) 
  // }
  router.route(`/user/:userId/rmdr:id*?`)
    .post(rmdrController.create, (req, res) => {
      console.log('post request of reminder in reminder api routes middleware', res.locals);
      return res.json(res.locals);
    })
    .get(rmdrController.get, (req, res) => {
      console.log('in middleware route get reminder res.locals.reminders', res.locals);
      return res.json(res.locals.reminders);
    })
    .put(rmdrController.update, (req, res) => {
      return res.json(res.locals);
    })
    .delete(rmdrController.delete, (req, res) => {
      return res.json(res.locals);
    })


module.exports = router;