import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";
import { AuthData } from "../auth/auth-data.model";
import { Tuition } from "../tuitions/tuition.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  userIsAuthenticated = false;
  private authListenerSub: Subscription;
  user : AuthData;
  // user: Tuition;
  //name =this.user.email;
  name ="";
  constructor(private authService: AuthService) {}

  ngOnInit(){
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSub = this.authService
    .getAuthStatusListener()
    .subscribe( isAuthenticated =>{
      this.userIsAuthenticated = isAuthenticated;

    });
  }

  onLogout(){
    this.authService.logout();
    //console.log(this.authService.getToken());
  }

  ngOnDestroy(){
    this.authListenerSub.unsubscribe();
  }
}
