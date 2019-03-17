const express = require('express');

const router = express.Router();
const Tuition = require('../models/tuition');

const CheckAuth = require('../middleware/check-auth');

router.post('',CheckAuth,(req,res,next)=>{

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

router.get('',CheckAuth, (req,res,next) => {
  Tuition.find()
  .then(documents =>{
    res.status(200).json({
      message:'post fetched successfully..',
      tuitions: documents
    });
  })

});

router.get('/:id',CheckAuth,(req, res, next) => {
  Tuition.findById(req.params.id).then(tuition => {
    if(tuition) {
      res.status(200).json(tuition);
    } else {
      res.status(404).json({
        message: 'Tuition not found'
      });
    }
  });
});

router.put('/:id', CheckAuth,(req, res, next) => {
  console.log(req.params.id);
  const tuition = new Tuition( {
    _id: req.body.id,
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
  Tuition.updateOne({_id: req.params.id}, tuition).then(result => {
    console.log(result);
    res.status(201).json({
      message: "updated successfully"
    });
  });
});

router.delete('/:id',CheckAuth, (req, res, next) => {

  Tuition.deleteOne({_id:req.params.id}).then(result =>{
    console.log(result);

    res.status(200).json({
      message: "post deleted"
    });
  });
  //console.log("post deleted");


});


module.exports = router;
