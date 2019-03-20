import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from '../user.model';
import { UsersService } from '../users.service';
import { AuthData } from 'src/app/auth/auth-data.model';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit,OnDestroy {
  // users = [
  //   {title: 'first', content: 'this is content'},
  //   {title: 'seconde', content: 'this is content'},
  //   {title: 'fithrst', content: 'this is content'},

  // ];
  userEmail: AuthData[] = [];
  users: User[] = [];
  private userSub: Subscription;
  private authStatusSub: Subscription;
  userIsAuthenticated = false;

  constructor(public usersService: UsersService, private authService: AuthService){}

  ngOnInit(){

    this.usersService.getUsers();
    this.userSub = this.usersService.getUserUpdateListener()
    .subscribe((users: User[]) =>{
      this.users = users;
    });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService.getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  // onDelete(userId: string){
  //   this.usersService.deleteUser(userId);
  // }
  ngOnDestroy(){
    this.userSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
