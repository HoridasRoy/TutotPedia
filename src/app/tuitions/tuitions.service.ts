import { Tuition } from "./tuition.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import {map } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class TuitionsService{
  private tuitions: Tuition[] =[];
  private tuitionsUpdated = new Subject<Tuition[]>();

  constructor(private http: HttpClient, private router: Router){}

  getTuitions(){
    this.http.get<{message:string, tuitions:any}>('http://localhost:3000/api/tuitions')
    .pipe(map((tuitionData) =>{
      return tuitionData.tuitions.map(tuition =>{
        return{
          title: tuition.title,
          classs: tuition.classs,
          category: tuition.category,
          student_gender: tuition.student_gender,
          tutor_gender: tuition.tutor_gender,
          salary: tuition.salary,
          no_of_student: tuition.no_of_student,
          subjects: tuition.subjects,
          location: tuition.location,
          days_per_week: tuition.days_per_week,
          extra_requirement: tuition.extra_requirement,
          id: tuition._id
        }
      })
    }))
    .subscribe((tui) =>{
      this.tuitions =tui;
      this.tuitionsUpdated.next([...this.tuitions]);
    });
  }

  getTuition(id:string){
    return this.http.get<{ _id: string; title: string,
      classs: number,
      category: string,
      student_gender: string,
      tutor_gender: string,
      salary: number,
      no_of_student: number,
      subjects: string,
      location: string,
      days_per_week: number,
      extra_requirement: string}>(
      'http://localhost:3000/api/tuitions/' + id);
  }
  getTuitionUpdateListener(){
    return this.tuitionsUpdated.asObservable();
  }

  addTuition(title: string,
    classs: number,
    category: string,
    student_gender: string,
    tutor_gender: string,
    salary: number,
    no_of_student: number,
    subjects: string,
    location: string,
    days_per_week: number,
    extra_requirement: string){

      const tuition: Tuition= {
        id: null,
        title: title,
        classs: classs,
        category: category,
        student_gender: student_gender,
        tutor_gender: tutor_gender,
        salary: salary,
        no_of_student: no_of_student,
        subjects: subjects,
        location: location,
        days_per_week: days_per_week,
        extra_requirement: extra_requirement
      };
      this.http.post<{message:string, tuitionId: string}>('http://localhost:3000/api/tuitions',tuition)
      .subscribe((responseData) =>{
        const id = responseData.tuitionId;
        tuition.id = id;
        this.tuitions.push(tuition);
        this.tuitionsUpdated.next([...this.tuitions]);
        this.router.navigate(['/tuitions']);

      });

  }

  updateTuition(id:string, title: string,
    classs: number,
    category: string,
    student_gender: string,
    tutor_gender: string,
    salary: number,
    no_of_student: number,
    subjects: string,
    location: string,
    days_per_week: number,
    extra_requirement: string){

      const tuition: Tuition= {
        id: id,
        title: title,
        classs: classs,
        category: category,
        student_gender: student_gender,
        tutor_gender: tutor_gender,
        salary: salary,
        no_of_student: no_of_student,
        subjects: subjects,
        location: location,
        days_per_week: days_per_week,
        extra_requirement: extra_requirement
      };

      this.http.put("http://localhost:3000/api/tuitions/" + id, tuition)
      .subscribe((response) => {
        const updatedTuitions = [...this.tuitions];
        const oldTuitionIndex = updatedTuitions.findIndex(p => p.id === tuition.id);
        updatedTuitions[oldTuitionIndex] = tuition;
        this.tuitions = updatedTuitions;
        this.tuitionsUpdated.next([...this.tuitions]);
        this.router.navigate(['/tuitions']);
      });

  }

  deleteTuition(tuitionId: string){
    this.http.delete("http://localhost:3000/api/tuitions/" + tuitionId)
    .subscribe(() =>{
      const updatedTuitions = this.tuitions.filter(tuition => tuition.id !==tuitionId);
      this.tuitions = updatedTuitions;
      this.tuitionsUpdated.next([...this.tuitions]);
    })
  }
}
