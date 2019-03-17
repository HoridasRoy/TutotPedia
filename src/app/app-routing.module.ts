import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TuitionListComponent } from './tuitions/tuition-list/tuition-list.component';
import { TuitionCreateComponent } from './tuitions/tuition-create/tuition-create.component';

const routes: Routes = [
  {path: '', component:TuitionListComponent},
  {path:'create', component: TuitionCreateComponent},
  {path: 'edit/:tuitionId', component:TuitionCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
