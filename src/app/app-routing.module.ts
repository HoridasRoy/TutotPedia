import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TuitionListComponent } from './tuitions/tuition-list/tuition-list.component';
import { TuitionCreateComponent } from './tuitions/tuition-create/tuition-create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { HomeComponent } from './home-page/home-page.component';
import { UserViewComponent } from './users/user-view/user-view.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { FooterComponent } from './footer/footer.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'tuitions', component:TuitionListComponent, canActivate:[AuthGuard]},
  {path:'create', component: TuitionCreateComponent,canActivate: [AuthGuard]},
  {path: 'edit/:tuitionId', component:TuitionCreateComponent,canActivate: [AuthGuard]},
  {path: 'login', component:LoginComponent},
  {path: 'signup', component:SignupComponent},
  {path: 'profileEdit', component: UserCreateComponent},
  {path: 'profileView', component:UserViewComponent},
  {path: 'about', component:AboutUsComponent},
  {path: 'footer', component:FooterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
