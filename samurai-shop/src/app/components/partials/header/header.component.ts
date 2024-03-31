import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  user!:User;

  constructor(private userService:UserService){

    userService.userObs.subscribe((newUser) => {

      this.user = newUser;

    })
  }

  logout(){
    this.userService.logout();
  }

  get isAuth(){
    return this.user.token;
  }
}
