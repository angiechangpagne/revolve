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
        UserDoc.$
      })
  } 

}
