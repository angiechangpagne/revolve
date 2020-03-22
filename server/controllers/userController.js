const express = require("express");
const db = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;
// const fetch = require('node-fetch');
const router = express.Router();
//userController methods
const userController = {
  findOne: (req, res) => {
    console.log(req.body.email);
    db.User
      .findOne({
        email: req.body.email
      })
      .then(dbUser => {
        console.log('dbUser exists?', dbUser);
        //check if user exists in db !
         !dbUser ? 
          res.json({
            isValidEmail : false
          })
          //check if user matches db
          :
            bcrypt.compare(req.body.password, dbUser.password, (error, resp) => {
              if (resp) {
                res.json({ 
                  isValidEmail : true,
                  isValidPassword : true,
                  userInfo : dbUser
                });
              } if(error) {
                return res.json({ isValidPassword : false });
              }
              else {
                return response.json({success: false, message: 'passwords do not match'});
              }
            })
      })
    },
    create: (req, res, next) => {
      console.log(req.body);
      db.User
        .findOne({
          email : req.body.email
        })
        .then(dbUser => {
          //no existing email found, we add the user for registration
          if(!dbUser) {
            console.log("in User controller, Adding this user to the DB");

            bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
              console.log('this is the hash: '+ hash);
              const { firstName, lastName, email, password, mobileNumber }= req.body;
              console.log('req.body',req.body);
              db.User.create({
                firstName, lastName, email, password, mobileNumber
              }).then(()=> {
                  res.json({ isEmailUnique : true });
                  // next();
                }).then(() => {
                  console.log('added to database backend');
                  return next();
                }).catch(err =>{
                  res.status(422).json(err);
                });
            });
          } else {
            res.json({ isEmailUnique : false }).then(()=> {
              console.log('this email is not unique');
              return next();
            });
          }
        }).catch(err => res.status(422).json(err));
    }
};


// firstName: req.body.firstName,
//                 lastName : req.body.lastName,
//                 email : req.body.email,
//                 password : hash,
//                 mobileNumber : req.body.mobileNumber
module.exports = userController;