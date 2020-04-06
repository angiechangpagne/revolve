//adin controller
const db = require('../models');
//admin will be a completely different one

module.exports = {
  getAllUsers: (req, res, next) => {
    db.User.find(req.query)
      .sort({ date: 1})
      .then(UserDoc => res.json(UserDoc))
      .catch(err => res.status(422).json(err));
  },
  assignAdmin : (req, res, next) => {
    const userId = req.userId;
    db.User.findById(userId)
      .then((UserDoc) => {
        UserDoc.adminAccess = true;
        const systemAdmin = {}; //add user info to sysdmin database, 
        //include ranking, starting at level 1(level 12 is the highest level of access)
        db.SystemAdmin.create(systemAdmin)
          .then((systemDoc) => {
            console.log('system admin assigned to user', UserDoc.firstName);
            res.json(systemDoc);
            next();
          }).catch(err => console.log(err));
      })
  }, 
  promote : (req, res, next) => {
    //promote is done by 
  },
  revoke : (req, res, next) => {
    //only an admin that is of higher level than the current admin level has the ability to revoke
  }

}
