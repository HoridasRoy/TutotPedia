import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms'
import { MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule, MatGridListModule, MatListModule, MatFormFieldModule, MatSelectModule, MatExpansionModule, MatMenuModule} from '@angular/material'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TuitionCreateComponent } from './tuitions/tuition-create/tuition-create.component';
import {HeaderComponent} from './header/header.component';
import {TuitionListComponent} from './tuitions/tuition-list/tuition-list.component'
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UserCreateComponent} from './users/user-create/user-create.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth-interceptor';
import { HomeComponent } from './home-page/home-page.component';
@NgModule({
  declarations: [
    AppComponent,
    TuitionCreateComponent,
    HeaderComponent,
    TuitionListComponent,
    LoginComponent,
    SignupComponent,
    UserCreateComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatGridListModule,
    MatListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatExpansionModule,
    HttpClientModule,
    MatMenuModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]

})
export class AppModule { }
