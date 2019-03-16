import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Tuition } from '../tuition.model';
import { TuitionsService } from '../tuitions.service';
import { Subscription } from 'rxjs';

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

  constructor(public tuitionsService: TuitionsService){}

  ngOnInit(){

    this.tuitionsService.getTuition();
    this.tuitionSub = this.tuitionsService.getTuitionUpdateListener()
    .subscribe((tuitions: Tuition[]) =>{
      this.tuitions = tuitions;
    });
  }

  onDelete(tuitionId: string){
    this.tuitionsService.deleteTuition(tuitionId);
  }
  ngOnDestroy(){
    this.tuitionSub.unsubscribe();
  }
}
