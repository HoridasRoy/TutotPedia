const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Tuition = require('./models/tuition');

// const contacstRoutes = require('./routes/contacts');
// const userRoutes = require('./routes/user');
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

app.post('/api/tuitions',(req,res,next)=>{

  const tuition = new Tuition({
    title: req.body.title,
    classs:req.body.classs ,
    category:req.body.category ,
    student_gender:req.body.student_gender ,
    tutor_gender: req.body.tutor_gender,
    salary: req.body.salary ,
    no_of_student: req.body.no_of_student,
    subjects: req.body.subjects,
    location: req.body.location,
    days_per_week: req.body.days_per_week,
    extra_requirement: req.body.extra_requirement
  });

 tuition.save().then(createdTuition => {
  res.status(201).json({
    message: 'tuition added successfully',
    tuitionId: createdTuition._id
  });
 });



});

app.get('/api/tuitions', (req,res,next) => {
  Tuition.find()
  .then(documents =>{
    res.status(200).json({
      message:'post fetched successfully..',
      tuitions: documents
    });
  })

});

app.delete('/api/tuitions/:id', (req, res, next) => {

  Tuition.deleteOne({_id:req.params.id}).then(result =>{
    console.log(result);

    res.status(200).json({
      message: "post deleted"
    });
  });
  //console.log("post deleted");


});
// app.use('/api/contacts', contacstRoutes);
// app.use('/api/user', userRoutes);

module.exports = app;
