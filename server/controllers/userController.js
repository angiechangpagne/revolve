const express = require("express");
const db = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;
// const fetch = require('node-fetch');
const router = express.Router();
//userController methods
const userController = {
  findOne: (req, res, next) => {
    console.log(req.body.email);
    db.User
      .findOne({
        email: req.body.email
      })
      .then(dbUser => {
        console.log('dbUser exists?', dbUser);
        //check if user exists in db !
          !dbUser?  //if user does not exist, they cannot log in
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
                }).status(200).then(() => console.log('password is correct, resp is', resp)).then(() => {
                  next();
                });
              } if(error) {
                console.log('incorrect password input');
                return res.json({ isValidPassword : false });
              }
              else {
                return res.json({success: false, message: 'passwords do not match'});
              }
            })
      }).catch(err =>{
        next({
          log: `error occured with password check, ${err}`,
          message: `error with password check in User Controller`
        });
      });
    },
    create: (req, res, next) => {
      console.log('req.body in the userController', req.body);
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
              }).then((userDoc)=> {
                  console.log('this is userDoc', userDoc);
                  res.locals.isEmailUnique=true;
                  res.locals.userInfo=userDoc; //store data in confirm certificate
                  console.log('added to database backend');
                  res.status(201).json();
                  // res.locals.isEmailUnique=true;
                  next();
                }).catch(err => console.log('create was unsuccessful, make sure never used before, could be a hash collion...use MD5', err));
            }).catch(err =>{
              next({
                log: `this hash function did not work, error: ${err}`,
                message: { err: 'Error in UserController to create, check password hashing double collisions, try hashing with email as well as password'}
              });
            });
          } else {
            res.json({ isEmailUnique : false }).catch(err=> {
              next({
                log: `this email is not unique error is: ${err}`,
                message: { err: 'Error in UserController to create, already exists'}
              });
            });
          }
        });
    }
};


// firstName: req.body.firstName,
//                 lastName : req.body.lastName,
//                 email : req.body.email,
//                 password : hash,
//                 mobileNumber : req.body.mobileNumber
module.exports = userController;