const express = require('express');
const bodyParser = require('body-parser');
const HttpError = require('./models/http-error');
const mongoose = require('mongoose');

const fileRoutes = require('./routes/file-routes');
const staffRoutes = require('./routes/staff-routes');


const app = express();
app.use(bodyParser.json());

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
  });
app.use('/api',fileRoutes);  //router middleware

app.use('/api/staffs',staffRoutes);

app.use((req,res,next)=>{
const error = new HttpError('could not find this route',404);
throw error;
});//error handling middleware for route

app.use((error,req,res,next)=>{ //error middleware
  if(res.headerSent){
    return next(error);
  }
  res.status(error.code || 500);
  res.json({message:error.message || "unknown error occured"});
})
if(process.env.NODE_ENV === 'production'){
  //set static folder
  app.use(express.static('client/build'));
}
app.get('*',(req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
mongoose
.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.yqplc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
.then(()=>{
  app.listen(process.env.PORT || 5000);
  console.log("database connected");
})
.catch(error => {
  console.log(error);
});
