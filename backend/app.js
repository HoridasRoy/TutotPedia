const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Tuition = require('./models/tuition');

 const tuitionsRoutes = require('./routes/tuitions');
 const userRoutes = require('./routes/user');
 const userInfoRoutes = require('./routes/user')
const app = express();

mongoose.connect('mongodb://localhost/tutorpedia')
.then(() => {
  console.log('connected to database');
})
.catch(() =>{
  console.log('connection failed');
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



app.use((req, res, next) =>{
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers',
  'Origin,X-Requested-With,Content-Type,Accept,Authorization');

  if(req.method ==='OPTIONS'){
    res.header('Access-Control-Allow-Methods','GET,PUT,PATCH,DELETE,UPDATE,POST');
    return res.status(200).json({});
  }
  next();
});


 app.use('/api/tuitions', tuitionsRoutes);
 app.use('/api/user', userRoutes);
 app.use('/api/user', userInfoRoutes);

module.exports = app;
