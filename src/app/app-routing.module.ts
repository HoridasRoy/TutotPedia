import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TuitionListComponent } from './tuitions/tuition-list/tuition-list.component';
import { TuitionCreateComponent } from './tuitions/tuition-create/tuition-create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path: '', component:TuitionListComponent},
  {path:'create', component: TuitionCreateComponent,canActivate: [AuthGuard]},
  {path: 'edit/:tuitionId', component:TuitionCreateComponent,canActivate: [AuthGuard]},
  {path: 'login', component:LoginComponent},
  {path: 'signup', component:SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
