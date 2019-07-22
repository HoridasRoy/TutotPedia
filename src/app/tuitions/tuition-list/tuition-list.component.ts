import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Tuition } from '../tuition.model';
import { TuitionsService } from '../tuitions.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-tuition-list',
  templateUrl: './tuition-list.component.html',
  styleUrls: ['./tuition-list.component.css']
})
export class TuitionListComponent implements OnInit,OnDestroy {
  // tuitions = [
  //   {title: 'first', content: 'this is content'},
  //   {title: 'seconde', content: 'this is content'},
  //   {title: 'fithrst', content: 'this is content'},

  // ];
  tuitions: Tuition[] = [];
  private tuitionSub: Subscription;
  private authStatusSub: Subscription;
  userIsAuthenticated = false;
  tutorCategory;

  constructor(public tuitionsService: TuitionsService, private authService: AuthService){}

  ngOnInit(){

    this.tuitionsService.getTuitions();
    this.tuitionSub = this.tuitionsService.getTuitionUpdateListener()
    .subscribe((tuitions: Tuition[]) =>{
      this.tuitions = tuitions;
    });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService.getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
     this.tutorCategory = this.authService.tuitionCategory();
  }

  onDelete(tuitionId: string){
    this.tuitionsService.deleteTuition(tuitionId);
  }
  ngOnDestroy(){
    this.tuitionSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
