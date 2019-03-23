import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Tuition } from '../tuition.model';
import { TuitionsService } from '../tuitions.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-tuition-apply',
  templateUrl: './tuition-apply.component.html',
  styleUrls: ['./tuition-apply.component.css']
})
export class TuitionApplyComponent implements OnInit,OnDestroy {
  // tuitions = [
  //   {title: 'first', content: 'this is content'},
  //   {title: 'seconde', content: 'this is content'},
  //   {title: 'fithrst', content: 'this is content'},

  // ];
  tuitions: Tuition[] = [];
  private tuitionSub: Subscription;
  private authStatusSub: Subscription;
  userIsAuthenticated = false;

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
  }

  onDelete(tuitionId: string){
    this.tuitionsService.deleteTuition(tuitionId);
  }
  ngOnDestroy(){
    this.tuitionSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
