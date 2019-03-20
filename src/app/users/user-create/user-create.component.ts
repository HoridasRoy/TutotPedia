import { Component, Output, OnInit } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { User } from "../user.model";
import { UsersService } from "../users.service";

@Component({
  selector: "app-user-create",
  templateUrl: "./user-create.component.html",
  styleUrls: ["./user-create.component.css"]
})
export class UserCreateComponent implements OnInit {
  user: User;

  private mode = 'create';
  private userId: string;

  constructor(
    public usersService: UsersService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {

      if (paramMap.has('userId')) {
        this.mode = 'edit';
        this.userId = paramMap.get('userId');
        this.usersService.getUser(this.userId)
        .subscribe((userData)=> {
          this.user ={
            id: userData._id,
            name: userData.name,
        fatherName: userData.fatherName,
        motherName: userData.motherName,
        birthDate: userData.birthDate,
        gender: userData.gender,
        religion:userData.religion,
        maritalStatus: userData.maritalStatus,
        nationality:userData.nationality,
        nid: userData.nid,
        permanent_address:userData.permanent_address,
        current_address: userData.current_address,
        examTitle:userData.examTitle,
        major: userData.major,
        institute: userData.institute,
        result: userData.result,
        passingYear: userData.passingYear,
        duration: userData.duration,
        board: userData.board
          };
        });
      } else {
        this.mode = 'create';
        this.userId = null;
      }
    });
  }

  onSaveUser(form: NgForm) {
    if (form.invalid) {
      return;
    }
    // const user: Tuition ={
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
      this.usersService.addUser(
        form.value.name,
        form.value.fatherName,
        form.value. motherName,
        form.value. birthDate,
        form.value.gender,
        form.value.religion,
        form.value. maritalStatus,
        form.value. nationality,
        form.value.nid,
        form.value.permanent_address,
        form.value.current_address,
        form.value.examTitle,
        form.value.major,
        form.value.institute,
        form.value.result,
        form.value.passingYear,
        form.value.duration,
        form.value.board
      );
    } else {
      console.log(this.mode);
      this.usersService.updateUser(
        this.userId,
        form.value.name,
        form.value.fatherName,
        form.value. motherName,
        form.value. birthDate,
        form.value.gender,
        form.value.religion,
        form.value. maritalStatus,
        form.value. nationality,
        form.value.nid,
        form.value.permanent_address,
        form.value.current_address,
        form.value.examTitle,
        form.value.major,
        form.value.institute,
        form.value.result,
        form.value.passingYear,
        form.value.duration,
        form.value.board
      );
    }

    form.resetForm();
  }
}
