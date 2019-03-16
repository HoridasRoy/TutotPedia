import { Component, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Tuition } from '../tuition.model';
import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { TuitionsService } from '../tuitions.service';

@Component({
  selector: 'app-tuition-create',
  templateUrl: './tuition-create.component.html',
  styleUrls: ['./tuition-create.component.css']
})
export class TuitionCreateComponent {

  constructor(public tuitionsService:TuitionsService){}

  onAddTuition(form: NgForm){
    if(form.invalid){
      return;
    }
    // const tuition: Tuition ={
    //   title: form.value.title,
    //   classs: form.value.classs,
    //   category:form.value.category ,
    //   student_gender: form.value.student_gender,
    //   tutor_gender: form.value.tutor_gender,
    //   salary: form.value.salary,
    //   no_of_student:form.value.no_of_student ,
    //   subjects: form.value.subjects,
    //   location: form.value.location,
    //   days_per_week:form.value.days_per_week ,
    //   extra_requirement:form.value.extra_requirement
    // };
    this.tuitionsService.addTuition(form.value.title,form.value.classs,form.value.category ,
      form.value.student_gender,form.value.tutor_gender,form.value.salary,form.value.no_of_student ,
      form.value.subjects,form.value.location,form.value.days_per_week ,form.value.extra_requirement);

    form.resetForm();
  }
}


