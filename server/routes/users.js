const express = require('express');
const router = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
//users middleware import
const User = require('../models/user');
router.use(cors());

process.env.SECRET_KEY='secret';

router.post('register', (req, res) => {
  const today = new Date();
  const userData={
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    created: today
  }

  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if(!user){
        bcrypt.hash(req.body.password, 10 ,(err, hash) => {
          userData.password = hash
          User.create(userData)
            .then(user => {
              res.json({ status: user.email + 'Registered!' })
            })
            .catch(err => {
              res.send('error: '+ err)
            })
        })
      } else {
        res.json({ error: 'User exists already' })
      }
    })
    .catch(err => {
      res.send('error: ', err)
    })
})


router.post('/login', (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)){
          //check to see if the passwords are the same
          const payload = {
            _id: user._id,
            first_name: user.first_name, 
            last_name: user.last_name,
            email: user.email
          }
          let token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 1400
          })
          res.send(token)
        } else {
          //passwords not the same
          res.json({ error: 'User does not exist' })
        } 
      } else {
        res.json({ error: 'User does not exist' })
      }
    })
    .catch(err => {
      res.send('error: ', err)
    })
})




users.get('/profile', (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  User.findOne({
    _id: decoded._id
  })
    .then(user => {
      if(user){
        res.json(user)
      } else {
        res.send('User does not exist')
      }
    })
    .catch(err => {
      res.send('error: ', err)
    })
})
// const router = express.Router();



/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = users;
