import { Component, Output, OnInit } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { Tuition } from "../tuition.model";
import { NgForm } from "@angular/forms";
import { TuitionsService } from "../tuitions.service";
import { ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: "app-tuition-create",
  templateUrl: "./tuition-create.component.html",
  styleUrls: ["./tuition-create.component.css"]
})
export class TuitionCreateComponent implements OnInit {
  tuition: Tuition;

  private mode = 'create';
  private tuitionId: string;

  constructor(
    public tuitionsService: TuitionsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {

      if (paramMap.has('tuitionId')) {
        this.mode = 'edit';
        this.tuitionId = paramMap.get('tuitionId');
        this.tuitionsService.getTuition(this.tuitionId)
        .subscribe((tuitionData)=> {
          this.tuition ={
            id: tuitionData._id,
            title: tuitionData.title,
        classs: tuitionData.classs,
        category: tuitionData.category,
        student_gender: tuitionData.student_gender,
        tutor_gender: tuitionData.tutor_gender,
        salary: tuitionData.salary,
        no_of_student: tuitionData.no_of_student,
        subjects: tuitionData.subjects,
        location: tuitionData.location,
        days_per_week: tuitionData.days_per_week,
        extra_requirement: tuitionData.extra_requirement
          };
        });
      } else {
        this.mode = 'create';
        this.tuitionId = null;
      }
    });
  }

  onSaveTuition(form: NgForm) {
    if (form.invalid) {
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

    if (this.mode === 'create') {
      this.tuitionsService.addTuition(
        form.value.title,
        form.value.classs,
        form.value.category,
        form.value.student_gender,
        form.value.tutor_gender,
        form.value.salary,
        form.value.no_of_student,
        form.value.subjects,
        form.value.location,
        form.value.days_per_week,
        form.value.extra_requirement
      );
    } else {
      console.log(this.mode);
      this.tuitionsService.updateTuition(
        this.tuitionId,
        form.value.title,
        form.value.classs,
        form.value.category,
        form.value.student_gender,
        form.value.tutor_gender,
        form.value.salary,
        form.value.no_of_student,
        form.value.subjects,
        form.value.location,
        form.value.days_per_week,
        form.value.extra_requirement
      );
    }

    form.resetForm();
  }
}
