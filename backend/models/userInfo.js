const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userInfoSchema = mongoose.Schema({


  name: String,
  fatherName: String,
  motherName: String,
  birthDate: Date,
  gender: String,
  religion: String,
  maritalStatus: String,
  nationality: String,
  nid: String,
  permanent_address: String,
  current_address: String,
  examTitle: String,
  major: String,
  institute: String,
  result: Number,
  passingYear: Number,
  duration: Number,
  board: String
});

userInfoSchema.plugin(uniqueValidator);
module.exports = mongoose.model('UserInfo', userInfoSchema);
