const mongoose = require("mongoose");
//const uniqueValidator = require("mongoose-unique-validator");
 
const Schema  = mongoose.Schema;

const staffSchema = new Schema({
  name:{type:String, required:true},
  email: {type:String, required:true},
  office:{type:String, required:true},
  password:{type:String, required:true, minlength:5},
});

//staffSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Staffs",staffSchema);