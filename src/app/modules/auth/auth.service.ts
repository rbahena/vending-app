import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserWithToken, loginInterface} from './models/login.interface';
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
  private user = new BehaviorSubject<UserWithToken | null>(null);
  user$ = this.user.asObservable();
  urlApiBase = environment.urlApi;
  apiController: String = 'auth';

  constructor(private httpclient: HttpClient, private router: Router) {
    this.loadUserFromLocalStorage();
  }
  

  login(credentials: loginInterface) {
    const apiMethod = 'login';
    const urlApi = this.urlApiBase + this.apiController + "/" + apiMethod;
    return this.httpclient
      .post<any>(urlApi, credentials)
      .pipe(
        tap((response) => this.saveTokenToLocalStore(response.access_token)),
        tap((response) => this.pushNewUser(response.access_token)),
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
    this.removeUserFromLocalStorage();
    this.user.next(null);
    //this.removeUserFromLocalStorage();
    //this.user.next(null);
    this.router.navigateByUrl('/');
  }

  private saveTokenToLocalStore(userToken: string): void {
    console.log("userToken: ", userToken);
    localStorage.setItem(USER_LOCAL_STORAGE_KEY_VENDING, userToken);
  }

  private pushNewUser(token: string) {    
    console.log(this.decodeToken(token));
    this.user.next(this.decodeToken(token));
  }

  private loadUserFromLocalStorage(): void {
    const userFromLocal = localStorage.getItem(USER_LOCAL_STORAGE_KEY_VENDING);
    userFromLocal && this.pushNewUser(userFromLocal);
  }

  private decodeToken(userToken: string): UserWithToken {
    debugger;
    const userInfo = jwt_decode.jwtDecode(userToken) as User;
    console.log("userInfo;: " , jwt_decode);
    //const userInfo = JSON.parse(window.atob(userToken)) as User;
    console.log({ ...userInfo, token: userToken });
    return { ...userInfo, token: userToken };
  }

  private removeUserFromLocalStorage(): void {
    localStorage.removeItem(USER_LOCAL_STORAGE_KEY_VENDING);
  }

}
