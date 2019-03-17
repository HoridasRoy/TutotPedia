import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms'
import { MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule, MatGridListModule, MatListModule, MatFormFieldModule, MatSelectModule, MatExpansionModule} from '@angular/material'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TuitionCreateComponent } from './tuitions/tuition-create/tuition-create.component';
import {HeaderComponent} from './header/header.component';
import {TuitionListComponent} from './tuitions/tuition-list/tuition-list.component'
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    TuitionCreateComponent,
    HeaderComponent,
    TuitionListComponent
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
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }
