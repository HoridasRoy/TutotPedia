const mongoose = require('mongoose');


const tuitionSchema = mongoose.Schema({
  title: {type: String, required: true},
  classs: {type: Number, required: true},
  category: {type: String, required:true},
  student_gender: {type: String, required: true},
  tutor_gender: {type: String, required: true},
  salary: {type: Number, required: true},
  no_of_student: {type:Number, required: true},
  subjects: {type: String, required: true},
  location: {type: String, required: true},
  days_per_week: {type: Number, required: true},
  extra_requirement: {type: String, default:'Interested teacher requested to Apply'}
});

module.exports = mongoose.model('Tuition', tuitionSchema);
