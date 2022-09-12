const HttpError = require('../models/http-error');
const Uuid = require('uuid');
const {validationResult} = require('express-validator');
const Staffs = require('../models/Staffs');


const getStaffs = async (req,res,next)=>{
  let staffs;
  try{
   staffs = await Staffs.find({},'-password');
  }catch(err){
    const error = new HttpError("sorry couldn't fetch Staffs",500);
    return next(error);
  }
  res.json({staffs:staffs.map(staff => staff.toObject({getters:true}))});

};

const registerStaff = async (req,res,next)=>{

  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return next(new HttpError('invalid inputs pls check data.fields must not be empty',422));
  }

  const {name,email,office,password} = req.body;
  let existingStaff;
  try{
     existingStaff = await Staffs.findOne({email:email});
  }catch(err){
  const error = new HttpError("sorry you can't register staff, try again later", 500);
  return next(error);
  }
  if (existingStaff){
    const error = new HttpError("sorry you can't register staff, email already exist", 422);
  return next(error);
  }
  
  const createdStaff = new Staffs({
    name,
    email,
    office,
    password
  });

  try{
   await createdStaff.save();
  }catch(err){
    const error = new HttpError("sorry you can't register staff,something went wrong", 422);
    return next(error);
  }
   
  res.status(201).json({staff:createdStaff.toObject({getters:true})});
}

const updateStaffById = async (req,res,next)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return next(new HttpError('invalid inputs pls check data.fields must not be empty',422));
  }
  const {name,email,office,password} = req.body;

  const staffid = req.params.staffId;
  let staff;
  try{
    staff = await Staffs.findById(staffid);
  }catch(err){
   const error = new HttpError("sorry cannot update staff info. Id does not exist",422);
   return next(error);
  }
   staff.name = name;
   staff.email = email;
   staff.office = office;
   staff.password = password;

   try{

    await staff.save();

   }catch(err){
    const error = new HttpError("ooppssss...sorry cannot update staff info.",500);
    return next(error);
   }
    
   res.status(200).json({staff:staff.toObject({getters:true})});
};

const deleteStaffById = async (req,res,next)=>{
  const staffid = req.params.staffId;
  try{
    staff = await Staffs.findById(staffid);
  }catch(err){
   const error = new HttpError("sorry cannot delete staff,check Id",422);
   return next(error);
  }
   try{
    await staff.remove();
   }catch(err){
    const error = new HttpError("sorry cannot delete staff",422);
    return next(error);
   }
  
 res.status(200).json({message:"staff deleted succesfully"});
};

const login = async (req,res,next)=>{

  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return next(new HttpError('invalid inputs pls check data supplied',401));
  }
  
  const {email,password} = req.body;

  let existingStaff;
  try{
     existingStaff = await Staffs.findOne({email:email});
  }catch(err){
  const error = new HttpError("sorry login failed, try again later", 500);
  return next(error);
  }

   if(!existingStaff || existingStaff.password !== password){
     return next(new HttpError("sorry wrong credentials",401));
   }
   res.status(200).json({existingStaff:existingStaff.toObject({getters:true})});
 //res.status(200).json({message:"loggin"});
};


exports.getStaffs = getStaffs;
exports.updateStaffById = updateStaffById;
exports.deleteStaffById = deleteStaffById;
exports.registerStaff = registerStaff;
exports.login = login;
