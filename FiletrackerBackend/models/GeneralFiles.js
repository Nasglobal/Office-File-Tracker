const mongoose = require("mongoose");
 
const Schema  = mongoose.Schema;

const generalFileSchema = new Schema({
  fileRef:{type:String, required:true},
  subMatter: {type:String, required:true},
  purpose: {type:String, required:true},
  from:{type:String, required:true},
  to:{type:String, required:true},
  beneficiary:{type:String, required:true},
  currentDate:{type:String, required:true},
  acceptedBy:{type:String, required:true}
});

module.exports  = mongoose.model("GeneralFiles",generalFileSchema);

