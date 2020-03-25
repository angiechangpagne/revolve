const express = require("express");
const mongoose = require('mongoose');
const db = require('../models');
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;
// const fetch = require('node-fetch');
// const router = express.Router();
//userController methods
const userController = {
  /**
  * verifyUser - Obtain username and password from the request body, locate
  * the appropriate user in the database, and then authenticate the submitted password
  * against the password stored in the database.
  *
  * @param req - http.IncomingRequest
  * @param res - http.ServerResponse
  */
  findOne: (req, res, next) => {
    console.log('in findOne controller', req.body.password);
    db.User
      .findOne({
        email: req.body.email
      })
      .then(dbUser => {
        console.log('dbUser exists?', dbUser);
        //check if user exists in db, if the Monog dbUser Document is length>0
          if(!dbUser)  //if user does not exist, they cannot log in
          { 
              res.locals.isValidEmail=false;
              console.log('could not find user');
              // res.json(res.locals);
              next(); 
          }
          //check if user matches db
          else
          {
            bcrypt.compare(req.body.password, dbUser.password, (error, match) => {
                console.log('in the compare bcrypt passwords');
                console.log('password is correct, match is', match);
                if (match) {
                  res.locals.isValidEmail= true;
                  res.locals.isValidPassword= true;
                  res.locals.userInfo= dbUser;
                  res.locals.firstName=dbUser.firstName;
                  res.locals.lastName=dbUser.lastName;
                  res.locals.email=dbUser.email;
                  res.locals.password=req.body.password;
                  res.locals.id=dbUser._id; //pass send to next link of chain, then status
                  // res.status(201).json(res.locals);
                  // res.json({
                  //   isValidEmail : true,
                  //   isValidPassword : true,
                  //   userInfo : dbUser
                  // });
                  
                  next();
                }
                // if(error){
                //   console.log('passwords do not match');
                //   res.locals.isValidPassword= false; //middleware is not end ware, do not send or status until end
                //   // res.status(402).send({ err: error});
                //   // next({
                //   //   log: 'does not match password bcrypt', message: {log: 'passwords do not match'}
                //   // });
                // }
                else{
                    // res.json({ isValidPassword : false});
                    res.locals.isValidPassword=false;
                    // res.json(res.locals);
                    next({
                      log: 'does not match password bcrypt', message: {log: 'passwords do not match'}
                    });
                }
             })
          }
      })
      // .catch(err => {
      //         res.status(422).json(err);
      //         // next({
      //         //   log: `error occured with password check, ${err}`,
      //         //   message: {err: `error with password check in User Controller`}
      //         // });
      // });
    },
    /**
      * createUser - create a new User model and then save the user to the database.
      *
      * @param req - http.IncomingRequest
      * @param res - http.ServerResponse
      */
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
            const { firstName, lastName, email, password, mobileNumber }= req.body;
            console.log('req.body',req.body);
            db.User.create({
            firstName: firstName, lastName : lastName, email : email, password : password, mobileNumber : mobileNumber
            }, (err,doc) => {
              if(err) {
                return res.render('../../client/LoginForm');
              } else {
                res.locals.id = doc._id;
                res.locals.isEmailUnique= true;
                res.locals.firstName=doc.firstName;
                res.locals.lastName=doc.lastName;
                res.locals.email=doc.password;
                res.locals.password=doc.password;
                // res.json(res.locals);
                next();
              }
            });
                // .then((userDoc)=> {
                //     console.log('this is userDoc', userDoc);
                //     res.json({

                //     })
                //     // res.locals.isEmailUnique=true;
                //     // res.locals.userInfo=userDoc; //store data in confirm certificate
                //     console.log('added to database backend controller status');
                //     // res.send(res.locals);
                //     // next();
                // })
                // .catch(err => console.log('create was unsuccessful, make sure never used before, could be a hash collion...use MD5', err));
            
          //     .catch(err =>{
          //       next({
          //         log: `this hash function did not work, error: ${err}`,
          //         message: { err: 'Error in UserController to create, check password hashing double collisions, try hashing with email as well as password'}
          //       });
          //    });
            } else {
              res.locals.isEmailUnique= false;
              console.log('not unique email');
              // res.json(res.locals);
              next();
              // next({
              //     log: `this email is not unique error is: `,
              //     message: {err: 'Error in UserController to create, already exists'}
              // });
              
          }
        })
        .catch(err => {
          res.status(422).json(err);
        });
    }
    /**
      * getAllUsers
      *
      * @param next - Callback Function w signature (err, users), for the segment of the middleware chain
      */
};


// firstName: req.body.firstName,
//                 lastName : req.body.lastName,
//                 email : req.body.email,
//                 password : hash,
//                 mobileNumber : req.body.mobileNumber
module.exports = userController;