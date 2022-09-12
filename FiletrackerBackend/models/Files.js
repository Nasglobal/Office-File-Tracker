const mongoose = require("mongoose");
 
const Schema  = mongoose.Schema;

const fileSchema = new Schema({
  fileRef:{type:String, required:true},
  subMatter: {type:String, required:true},
  purpose: {type:String, required:true},
  currentOffice:{type:String, required:true},
  from:{type:String, required:true},
  beneficiary:{type:String, required:true},
  currentDate:{type:String, required:true},
  paymentStatus:{type:String, required:true},
  pendingDestination:{type:String, required:true}
});

module.exports  = mongoose.model("Files",fileSchema);

