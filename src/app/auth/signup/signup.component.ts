import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent{
  isLoading = false;

  constructor(private authService: AuthService ,private router: Router) {}

  onSignup(form: NgForm) {
    if(form.invalid){
      return;
    }
    this.authService.createUser(form.value.email, form.value.password, form.value.category);
     form.reset();
     this.router.navigate(['/login']);
  }
}
