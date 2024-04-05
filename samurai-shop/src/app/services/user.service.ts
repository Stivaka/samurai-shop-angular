import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/User';
import { IUserLogin } from '../shared/interfaces/userLogin';
import { HttpClient } from '@angular/common/http';
import { user_login } from '../shared/https/url';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObs:Observable<User>;

  

  constructor(private http:HttpClient,private toastrService:ToastrService) { 
    this.userObs = this.userSubject.asObservable();
  }

  login(userLogin:IUserLogin):Observable<User>{

    return this.http.post<User>(user_login, userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Login successful!`,
            `Welcome, ${user.name}`
          )
        },
        error: (errorResponse) => {

          this.toastrService.error(errorResponse.error, `Login Failed`);

        }
      })
    );

  }

  public get currentUser():User{

    return this.userSubject.value;
  }

  logout(){
    this.userSubject.next(new User());
    localStorage.removeItem(`User`);
    window.location.reload();
  }

  private setUserToLocalStorage(user:User){
    localStorage.setItem(`User`, JSON.stringify(user));
  }

  private getUserFromLocalStorage():User{
    const userJson = localStorage.getItem('User');
    if (userJson) return  JSON.parse(userJson) as User;
    
    
    return new User();
  }

}
