const express = require('express');
const db = require('../models');

module.exports = {
  create: (req, res) => {
    console.log('server received post request');
    console.log('req.body line 7 of appController', req.body);
    const userId= req.params.userid;
    db.Reminder.create(req.body)
      .then(dbRmdr => {
        console.log(dbRmdr); //if create success reminder find user id and push it to user's reminder array
        return dbUser.findOneAndUpdate({ _id: userId }, {$push: { reinders: dbRmdr._id }}, { new: true });
        //res.json(dbRmdr)
      })
      .then(dbUser => {
        //if user updated successfully, send response back to client in json
        return res.json(dbUser)
      })
      .catch(err => res.status(422).json(err));
  },
  get: (req, res) => {
    console.log('Retrieve Reminders');
    const userId = req.param('userid');

    db.User.find({ _id : userId })
      .populate('reminders')
      .then(dbUserRmdrs => 
        res.json(dbRmdrs)
        );
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