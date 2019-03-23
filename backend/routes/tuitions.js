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
    extra_requirement: req.body.extra_requirement,
    creator: req.userData.userId
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
  Tuition.findById({_id: req.params.id,creator: req.userData.userId}).then(tuition => {


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
  Tuition.updateOne({_id: req.params.id,creator: req.userData.userId}, tuition).then(result => {

    console.log(result.nModified);

    if(result.nModified > 0){
      res.status(200).json({
        message: 'updated successfully .'
        });
    }else{
      res.status(401).json({
        message: 'Authorization failed '
      });
    }

  });
});

router.delete('/:id',CheckAuth, (req, res, next) => {

  Tuition.deleteOne({_id:req.params.id,creator: req.userData.userId}).then(result =>{


    if(result.n > 0){
      res.status(200).json({
        message: 'Deletion successfully .'
        });
    }else{
      res.status(401).json({
        message: 'Authorization failed '
      });
    }
  });
  //console.log("post deleted");


});


module.exports = router;
