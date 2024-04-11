import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/User';
import { IUserLogin } from '../shared/interfaces/userLogin';
import { HttpClient } from '@angular/common/http';
import { register_user, user_checkout, user_login } from '../shared/https/url';
import { ToastrService } from 'ngx-toastr';
import { IUserRegister } from '../shared/interfaces/user_register';
import { Cart } from '../shared/models/Cart';

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

  register(userRegister:IUserRegister): Observable<User>{
    return this.http.post<User>(register_user, userRegister).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Register successful`,
            `Welcome, ${user.name}`
          )
        },
        error : (erroResponse) => {

          this.toastrService.error(erroResponse.error, `Register failed`)

        }
      })
    )
  }

  public get isLogged():boolean{
    if(localStorage.getItem('User')){
      return false;
    } else {
      return true;
    }
  }

  public get isGuest():boolean{
    if(localStorage.getItem('User')){
      return true;
    } else {
      return false;
    }
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
