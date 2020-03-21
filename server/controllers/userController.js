const express = require('express');
const db = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const fetch = require('node-fetch');
// const router = express.Router();
//userController methods
const userController = {
  findOne: (req, res) => {
    console.log(req.body.email);
    db.User
      .findOne({
        email: req.body.email
      })
      .then(dbUser => {
        console.log(dbUser);
        //check if user exists in db
        !dbUser ? 
          res.json({
            isValidEmail : false
          })
          //check if user matches db
          :
            bcrypt.compare(req.body.password, dbUser.password, (error, response) => {
              if (response) {
                res.json({ 
                  isValidEmail : true,
                  isValidPassword : true,
                  userInfo : dbUser
                });
              } else {
                res.json({ isValidPassword : false });
              }
            }) 
      })
      .catch(err => res.status(422).json(err));
    },
    create: (req, res) => {
      console.log(req.body);
      db.User
        .findOne({
          email : req.body.email
        })
        .then(dbUser => {
          //no existing email found, we add the user for registration
          if(!dbUser) {
            console.log("Adding this user to the DB");

            bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
              console.log('this is the hash: '+ hash);
              db.User.create({
                firstName: req.body.firstName,
                lastName : req.body.lastName,
                email : req.body.email,
                password : hash,
                mobileNumber : req.body.mobileNumber
              })
              // .then(result => res.json({ isEmailUnique : true }))
              // .catch(err => res.status(422).json(err));
            });
            res.json({ isEmailUnique : true });
          } else{
            res.json({ isEmailUnique : false })
          }
        })
        .catch(err => res.status(422).json(err));
    }
};

module.exports = userController;