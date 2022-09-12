const HttpError = require('../models/http-error');
const Uuid = require('uuid');
const {validationResult} = require('express-validator');
const Files = require('../models/Files');
const GeneralFiles = require('../models/GeneralFiles');
const mongoose = require("mongoose");


const  dateFunction  = ()=> {
  var myCurrentDate = new Date();
  var date = myCurrentDate.getFullYear() + '-' + (myCurrentDate.getMonth()+1) + '-' + myCurrentDate.getDate() +' '+ myCurrentDate.getHours()+':'+ myCurrentDate.getMinutes()+':'+ myCurrentDate.getSeconds();
  const newCurrentDate = date;
  return newCurrentDate.toString();
}

const incomingFiles = async (req,res,next)=>{
  const officeOfStaff = req.params.distinationOffice;
  let files;
  try{
   files = await GeneralFiles.find({to:officeOfStaff});
  }catch(err){
 const error = new HttpError("sorry could not fetch files check internet connection",500);
 return next(error);
  }
  res.json({
    files:files.map(f =>f.toObject({getters:true}))
  })
}; 

const outgoingFiles = async (req,res,next)=>{
  const officeOfStaff = req.params.leavingOffice;
  let files;
  try{
   files = await GeneralFiles.find({from:officeOfStaff});
  }catch(err){
 const error = new HttpError("sorry could not fetch files check internet connection",500);
 return next(error);
  }
  res.json({
    files:files.map(f =>f.toObject({getters:true}))
  })
}; 
 
const getFileById = async (req,res,next)=>{
  const fileid = req.params.fileId;
 
  let file;
  try{
     file = await Files.findById(fileid);
  }catch(err){
    const error = new HttpError("sorry something went wrong ", 500);
    return next(error);
  }
 
  if(!file){
   return next(
   new HttpError("File doesnt exist..")
   );
    
  }
  res.json({
    file: file.toObject({getters:true}) 
  })
};

const availableFiles = async (req,res,next)=>{
  const officeOfStaff = req.params.officeOfStaff;
  let files;
  try{
   files = await Files.find({currentOffice:officeOfStaff,pendingDestination:"none"});
  }catch(err){
 const error = new HttpError("sorry could not fetch files check internet connection",500);
 return next(error);
  }
  res.json({
    files:files.map(f =>f.toObject({getters:true}))
  })
}; 


const searchFiles = async (req,res,next)=>{
  let files;
  try{
   files = await Files.find({});
  }catch(err){
 const error = new HttpError("sorry could not fetch files check internet connection",500);
 return next(error);
  }
  res.json({
    files:files.map(f =>f.toObject({getters:true}))
  })
}; 



const awaitingFiles = async (req,res,next)=>{

  const officeOfStaff = req.params.office;
  let files;
  try{
   files = await Files.find({pendingDestination:officeOfStaff});
  }catch(err){
 const error = new HttpError("sorry could not fetch files check internet connection",500);
 return next(error);
  }
  res.json({
    files:files.map(f =>f.toObject({getters:true}))
  })
}; 

const registerfile = async (req,res,next)=>{

  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return next(new HttpError("invalid inputs check data..., fields cannot be empty",422));
  }
  const {fileRef,subMatter,purpose,currentOffice,from,beneficiary,currentDate,paymentStatus,pendingDestination,loggedinUser} = req.body;
  const createdFile = new Files({
  fileRef,
  subMatter,
  purpose,
  currentOffice,
  from,
  beneficiary,
  currentDate,
  paymentStatus,
  pendingDestination
  });

  const createdGeneralFile = new GeneralFiles({
    fileRef,
    subMatter,
    purpose,
    from,
    to:"DFA",
    beneficiary,
    currentDate,
    acceptedBy :loggedinUser
    });
           
  try{
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdFile.save({session:sess});
    await createdGeneralFile.save({session:sess});
    sess.commitTransaction();
  }catch(err){
   const error = new HttpError("saving file failed",500);
   return next(error);
  };
  
  res.status(201).json({file:createdFile});
}

const updateFileById = async (req,res,next)=>{

  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return next(new HttpError("invalid inputs check data..., fields cannot be empty",422));
  }
  const {fileRef,subMatter,purpose,from,beneficiary} = req.body;
  const fileid = req.params.fileId;
  let file;
try{
   file = await Files.findById(fileid);
}catch(err){
  const error  = new HttpError("could not update files",500);
  return next(error);
}
  
   file.fileRef = fileRef;
   file.subMatter = subMatter;
   file.purpose = purpose,
   file.from = from;
   file.beneficiary = beneficiary;
   try{
     await file.save();
   }catch(err){
    const error  = new HttpError("could not update files",500);
    return next(error);
   }

   res.status(200).json({file:file.toObject({getters:true}) });
};

const sendFileById = async (req,res,next)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return next(new HttpError("invalid inputs check data..., field cannot be empty",422));
  }
  const {pendingDestination} = req.body;
  const fileid = req.params.fileId;
  let file;
try{
   file = await Files.findById(fileid);
}catch(err){
  const error  = new HttpError("could not find file",500);
  return next(error);
}

   file.pendingDestination = pendingDestination;
   
   try{
     await file.save();
   }catch(err){
    const error  = new HttpError(`could not send file to ${pendingDestination}`,500);
    return next(error);
   }

   res.status(200).json({file:file.toObject({getters:true}) });
};

const AcceptFileById = async (req,res,next)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return next(new HttpError("invalid inputs check data..., field cannot be empty",422));
  }
  const {currentOffice,pendingDestination,loggedinUser} = req.body;
  const fileid = req.params.fileId;
  let file;
try{
   file = await Files.findById(fileid);
}catch(err){
  const error  = new HttpError("could not find file",500);
  return next(error);
}
const createdGeneralFile = new GeneralFiles({
  fileRef:file.fileRef,
  subMatter:file.subMatter,
  purpose:file.purpose,
  from:file.currentOffice,
  to:file.pendingDestination,
  beneficiary:file.beneficiary,
  currentDate:dateFunction(),
  acceptedBy :loggedinUser
  });
  const officeFrom = file.currentOffice;
   file.pendingDestination = pendingDestination;
   file.currentOffice = currentOffice;
   file.from = officeFrom;
   
   try{
    const sess = await mongoose.startSession();
    sess.startTransaction();
     await createdGeneralFile.save({session:sess});
     await file.save({session:sess});
     sess.commitTransaction();
   }catch(err){
    const error  = new HttpError(`could not accept file from ${currentOffice}`,500);
    return next(error);
   }

   res.status(200).json({file:file.toObject({getters:true}) });
};

const rejectFileById = async (req,res,next)=>{

  const fileid = req.params.fileId;
  let file;
try{
   file = await Files.findById(fileid);
}catch(err){
  const error  = new HttpError("could not find file",500);
  return next(error);
}
   file.pendingDestination = "none";
   try{
     await file.save();
   }catch(err){
    const error  = new HttpError(`could not reject this file`,500);
    return next(error);
   }

   res.status(200).json({file:file.toObject({getters:true}) });
};


const deleteFileById = async (req,res,next)=>{
  const fileid = req.params.fileId;
  let file;
try{
   file = await Files.findById(fileid);
}catch(err){
  const error  = new HttpError("could not find file to delete",500);
  return next(error);
}

try{
  await file.remove();
}catch(err){
 const error  = new HttpError("could not delete file",500);
 return next(error);
}
  
 res.status(200).json({message:"deleted succesfully"});
};

exports.searchFiles = searchFiles;
exports.getFileById = getFileById;
exports.sendFileById = sendFileById;
exports.AcceptFileById = AcceptFileById;
exports.rejectFileById = rejectFileById;
exports.updateFileById = updateFileById;
exports.deleteFileById = deleteFileById;
exports.availableFiles = availableFiles;
exports.awaitingFiles = awaitingFiles;
exports.registerfile = registerfile;
exports.incomingFiles = incomingFiles;
exports.outgoingFiles = outgoingFiles;