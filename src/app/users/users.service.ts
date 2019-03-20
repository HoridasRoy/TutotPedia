import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import {map } from "rxjs/operators";
import { User } from "./user.model";

@Injectable({providedIn: 'root'})
export class UsersService{
  private users: User[] =[];
  private usersUpdated = new Subject<User[]>();

  constructor(private http: HttpClient){}

  // getUsers(){
  //   this.http.get<{message:string, users:any}>('http://localhost:3000/api/user')
  //   .pipe(map((userData) =>{
  //     return userData.users.map(user =>{
  //       return{
  //         title: tuition.title,
  //         classs: tuition.classs,
  //         category: tuition.category,
  //         student_gender: tuition.student_gender,
  //         tutor_gender: tuition.tutor_gender,
  //         salary: tuition.salary,
  //         no_of_student: tuition.no_of_student,
  //         subjects: tuition.subjects,
  //         location: tuition.location,
  //         days_per_week: tuition.days_per_week,
  //         extra_requirement: tuition.extra_requirement,
  //         id: tuition._id
  //       }
  //     })
  //   }))
  //   .subscribe((tui) =>{
  //     this.users =tui;
  //     this.usersUpdated.next([...this.users]);
  //   });
  // }

  getUser(id:string){
    return this.http.get<{ _id: string; name: string,
      fatherName: string,
      motherName: string,
      birthDate: Date,
      gender: string,
      religion: string,
      maritalStatus: string,
      nationality:string,
      nid: string,
      permanent_address: string,
      current_address: string,
      examTitle: string,
      major: string,
      institute: string,
      result: number,
      passingYear: number,
      duration: number,
      board: string}>(
      'http://localhost:3000/api/user/' + id);
  }
  getUserUpdateListener(){
    return this.usersUpdated.asObservable();
  }

  addUser(name: string,
    fatherName: string,
    motherName: string,
    birthDate: Date,
    gender: string,
    religion: string,
    maritalStatus: string,
    nationality:string,
    nid: string,
    permanent_address: string,
    current_address: string,
    examTitle: string,
    major: string,
    institute: string,
    result: number,
    passingYear: number,
    duration: number,
    board: string){

      const user: User= {
        id: null,
        name: name,
        fatherName: fatherName,
        motherName: motherName,
        birthDate: birthDate,
        gender: gender,
        religion:religion,
        maritalStatus: maritalStatus,
        nationality:nationality,
        nid: nid,
        permanent_address:permanent_address,
        current_address: current_address,
        examTitle:examTitle,
        major: major,
        institute: institute,
        result: result,
        passingYear: passingYear,
        duration: duration,
        board: board
      };
      this.http.post<{message:string, userId: string}>('http://localhost:3000/api/user',user)
      .subscribe((responseData) =>{
        const id = responseData.userId;
        user.id = id;
        this.users.push(user);
        this.usersUpdated.next([...this.users]);
      });

  }

  updateUser(id:string,name: string,
    fatherName: string,
    motherName: string,
    birthDate: Date,
    gender: string,
    religion: string,
    maritalStatus: string,
    nationality:string,
    nid: string,
    permanent_address: string,
    current_address: string,
    examTitle: string,
    major: string,
    institute: string,
    result: number,
    passingYear: number,
    duration: number,
    board: string){

      const user: User= {
        id: id,
        name: name,
        fatherName: fatherName,
        motherName: motherName,
        birthDate: birthDate,
        gender: gender,
        religion:religion,
        maritalStatus: maritalStatus,
        nationality:nationality,
        nid: nid,
        permanent_address:permanent_address,
        current_address: current_address,
        examTitle:examTitle,
        major: major,
        institute: institute,
        result: result,
        passingYear: passingYear,
        duration: duration,
        board: board
      };

      this.http.put("http://localhost:3000/api/user/" + id, user)
      .subscribe((response) => {
        const updatedUsers = [...this.users];
        const oldUserIndex = updatedUsers.findIndex(p => p.id === user.id);
        updatedUsers[oldUserIndex] = user;
        this.users = updatedUsers;
        this.usersUpdated.next([...this.users]);

      });

  }

  // deleteUser(userId: string){
  //   this.http.delete("http://localhost:3000/api/user/" + userId)
  //   .subscribe(() =>{
  //     const updatedUsers = this.users.filter(user => user.id !==userId);
  //     this.users = updatedUsers;
  //     this.usersUpdated.next([...this.users]);
  //   })
  // }
}
