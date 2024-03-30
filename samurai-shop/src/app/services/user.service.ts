import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/User';
import { IUserLogin } from '../shared/interfaces/userLogin';
import { HttpClient } from '@angular/common/http';
import { user_login } from '../shared/https/url';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private userSubject = new BehaviorSubject<User>(new User());
  public userObs:Observable<User>;

  

  constructor(private http:HttpClient) { 
    this.userObs = this.userSubject.asObservable();
  }

  login(userLogin:IUserLogin):Observable<User>{

    return this.http.post<User>(user_login, userLogin).pipe(
      tap({
        next: (user) => {

        },
        error: (errorResponse) => {



        }
      })
    );

  }

}
