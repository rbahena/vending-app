import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginInterface, userLogged } from './models/login.interface';
import { environment } from 'src/environments/environment.env';
import { registerInterface } from './models/register.interface';
import { BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';
import * as jwt_decode from "jwt-decode";
const USER_LOCAL_STORAGE_KEY_VENDING = 'userData';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user = new BehaviorSubject<userLogged | null>(null);
  user$ = this.user.asObservable();
  urlApiBase = environment.urlApi;
  apiController: String = 'auth';

  constructor(private httpclient: HttpClient, private router: Router) {}
  

  login(credentials: loginInterface) {
    const apiMethod = 'login';
    const urlApi = this.urlApiBase + this.apiController + "/" + apiMethod;
    return this.httpclient
      .post<userLogged>(urlApi, credentials)
      .pipe(
        tap((response) => this.saveTokenToLocalStore(response.access_token)),
        tap((response) => this.pushNewUser(response)),
        tap(() => this.redirectToDashboard())
        );
  }

  register(dataUser: registerInterface) {
    const apiMethod = 'register';
    const urlApi = this.urlApiBase + this.apiController + "/" + apiMethod;
    return this.httpclient.post(urlApi, dataUser).pipe(
      tap((res) => console.log(res)),
      tap(() => this.redirectToDashboard()));
  }

  private redirectToDashboard(): void {
    this.router.navigateByUrl('/dashboard');
  }

  logout(): void {
    //this.removeUserFromLocalStorage();
    //this.user.next(null);
    this.router.navigateByUrl('/');
  }

  private saveTokenToLocalStore(userToken: string): void {
    localStorage.setItem(USER_LOCAL_STORAGE_KEY_VENDING, userToken);
  }

  private pushNewUser(user: userLogged) {    
    this.user.next(user);
  }

}
