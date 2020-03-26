const db = require('../models');
const express = require('express');

module.exports = {
  create: (req, res,next) => {
    console.log('server received post request');
    console.log('req.body line 7 of reminderController', req.body);
    console.log('req.params', req.params);
    // console.log('req', req);
    const userId= req.params.userId;
    db.Reminder.create(req.body)
      .then(dbRmdr => {
        console.log(dbRmdr); //if create success reminder find user id and push it to user's reminder array
        res.locals.rmdrName=dbRmdr.reminderName;
        res.locals.rmdrId=dbRmdr._id;
        res.locals.rmdrTime=dbRmdr.time;
        res.locals.rmdrNotification=dbRmdr.notification;
        res.locals.rmdrNotificationLabel=dbRmdr.notificationLabel
        db.User.findOneAndUpdate({_id:userId}, {$push: {reminders: dbRmdr}},{new: true})
        .then(query => {
          console.log('dbUser query associated', query);
          //if user updated successfully, send query callback to client in json
          res.locals.userInfo=query;
          next();
          done; 
        }).catch(err => console.log('err:', err))
      });
    },
  get: (req, res, next) => {
    console.log('Retrieve Reminders in controller, req.body:', req.body);
    console.log('req.params', req.params);
    const userId = req.params.userId;

    db.User.find({ _id : userId }).then((doc) =>{
      console.log('from controller post populate hook', doc);
      res.locals.reminders=doc;
      next();
    }).catch(err => console.log(err));
  },
  update: (req, res) => {
    const id = req.param('id');
    db.Reminder.findOne({ _id: id })
      .then(dbRmdr => {
        if(dbRmdr){
          console.log('Updating Reminder');
          dbRmdr.reminderName = req.body.reminderName;
          dbRmdr.date = req.body.date;
          dbRmdr.time = req.body.time;
          dbRmdr.notification = req.body.notification;
          dbRmdr.notificationNumber = req.body.reminderNumber;
          dbRmdr.notificationLabel = req.body.notificationLabel;
          dbRmdr.save((err, dbRmdr) => {
            if(err) console.log(err);
            res.json(dbRmdr);
          });
        }
      });
    },
    remove: (req, res) => {
      const reminderId=req.param('id');
      db.Reminder.remove({ _id: reminderId })
        .then(dbRmdr => 
          res.json(dbRmdr)
          );
    }
};