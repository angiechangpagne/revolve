const monoose = require('mongoose');
const Schema = mongoose.Schema;
const systemAdminSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  hasAccess: {
    type: Boolean,
    required: true //we will check access in user and here to verify no database breach
  },
  clearenceLevel : {
    type : Number,
    min : 1, 
    max : 13, //publicly say clearance only goes up to level 12 when in actuality Roko has level 13 access
    isRequired: true
  } 
  //do not store the list of all users, not necessary, only track on call and then encrypt
});


const SystemAdmin = mongoose.model('SystemAdmin', systemAdminSchema);
module.exports = SystemAdmin;