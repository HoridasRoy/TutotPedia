const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const UserInfo = require('../models/userInfo')
const CheckAuth = require('../middleware/check-auth');


router.post('/signup', (req, res, next) =>{

    bcrypt.hash(req.body.password,10)
    .then(hash => {
        const user = new User({
        email: req.body.email,
        password: hash
      });

      user.save()
      .then(result => {
        res.status(201).json({
          message: 'user created successfully',
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });

    });

});


router.post('/login', (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email})
  .then(user => {
   //console.log(user);
    if(!user) {
      return res.status(401).json({
        message: 'Auth failed user'
      });
    }
    fetchedUser = user;
    return bcrypt.compare(req.body.password, user.password);
  })
  .then(result => {
     //console.log(result);
    if(!result) {
      return res.status(401).json({
        message: 'Auth failed result'
      });
    }
    //console.log(fetchedUser.email, fetchedUser.password);
    const token = jwt.sign({email: fetchedUser.email, userId: fetchedUser._id},
      'secret_should_be_longer',
      {expiresIn: "1h"}
       );

       //console.log(token);

    res.status(200).json({
      token: token,
      expiresIn: 3600
    });
  })
  .catch(err => {
    console.log(err);

    return res.status(401).json({
     error: err


    });
  });
});

router.post('',CheckAuth,(req,res,next)=>{

  const user = new UserInfo({
    name: req.body.name,
    fatherName: req.body.fatherName,
    motherName: req.body.motherName,
    birthDate: req.body.birthDate,
    gender: req.body.gender,
    religion: req.body.religion,
    maritalStatus: req.body.maritalStatus,
    nationality: req.body.nationality,
    nid: req.body.nid,
    permanent_address: req.body.permanent_address,
    current_address: req.body.current_address,
    examTitle: req.body.examTitle,
    major: req.body.major,
    institute: req.body.institute,
    result: req.body.result,
    passingYear: req.body.passingYear,
    duration: req.body.duration,
    board: req.body.board
  });

 user.save().then(createdTuition => {

  console.log(user);

  res.status(201).json({
    message: 'user added successfully',
    userId: createdTuition._id
  });
 });

});

router.put('/:id', CheckAuth,(req, res, next) => {
  console.log(req.params.id);
  const user = new UserInfo( {
    _id: req.body.id,
    name: req.body.name,
    fatherName: req.body.fatherName,
    motherName: req.body.motherName,
    birthDate: req.body.birthDate,
    gender: req.body.gender,
    religion: req.body.religion,
    maritalStatus: req.body.maritalStatus,
    nationality: req.body.nationality,
    nid: req.body.nid,
    permanent_address: req.body.permanent_address,
    current_address: req.body.current_address,
    examTitle: req.body.examTitle,
    major: req.body.major,
    institute: req.body.institute,
    result: req.body.result,
    passingYear: req.body.passingYear,
    duration: req.body.duration,
    board: req.body.board
  });
  UserInfo.updateOne({_id: req.params.id}, tuition).then(result => {
    console.log(result);
    res.status(201).json({
      message: "updated successfully"
    });
  });
});

router.get('',CheckAuth, (req,res,next) => {
  UserInfo.find()
  .then(documents =>{
    res.status(200).json({
      message:'post fetched successfully..',
      users: documents
    });
  })

});



router.get('/:id',CheckAuth,(req, res, next) => {
  UserInfo.findById(req.params.id).then(tuition => {
    if(tuition) {
      res.status(200).json(tuition);
    } else {
      res.status(404).json({
        message: 'Tuition not found'
      });
    }
  });
});

// router.get('',CheckAuth, (req,res,next) => {
//   User.find()
//   .then(documents =>{
//     res.status(200).json({
//       message:'post fetched successfully..',
//       tuitions: documents
//     });
//   })

// });

module.exports =router;
