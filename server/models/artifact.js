const mongoose = require('mongoose');
const Schema = mongoose.Schema();
//publish subscribe pattern enabled through flux architecture, we will use this example as assets in following artifacts
//pub - services location is on
//sub -follow of artifacts
const artifactSchema = new Schema({
  title : { type : String, required : true },
  description : { type: String, required : true },
  pub : { type : Boolean },
  sub: [
    { type: Schema.Types.ObjectId, 
      ref: 'Artifact'
    }
  ],

});
module.exports = mongoose.model('artifact', artifactSchema);