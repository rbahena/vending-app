import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserWithToken, loginInterface } from './models/login.interface';
import { environment } from 'src/environments/environment.env';
import { registerInterface } from './models/register.interface';
import { BehaviorSubject, catchError, finalize, tap } from 'rxjs';
import { Router } from '@angular/router';
import * as jwt_decode from "jwt-decode";
import { SuscriptorService } from '../suscriptor/suscriptor.service';
import { AlertService } from '../shared/alert/alert.service';
const USER_LOCAL_STORAGE_KEY_VENDING = 'userData';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user = new BehaviorSubject<UserWithToken | null>(null);
  user$ = this.user.asObservable();
  urlApiBase = environment.urlApi;
  apiController: String = 'auth';

  constructor(private httpclient: HttpClient, private router: Router, private suscriptorService: SuscriptorService, private alertService: AlertService) {
    this.loadUserFromLocalStorage();
  }


  login(credentials: loginInterface) {
    const apiMethod = 'login';
    const urlApi = this.urlApiBase + this.apiController + "/" + apiMethod;
    return this.httpclient
      .post<any>(urlApi, credentials)
      .pipe(
        tap((response) => this.getSuscriptor(response.access_token)),
        tap((response) => this.saveTokenToLocalStore(response.access_token)),
        tap((response) => this.pushNewUser(response.access_token)),
        tap(() => this.redirectToDashboard())
      );
  }

  register(dataUser: registerInterface) {
    const apiMethod = 'register';
    const urlApi = this.urlApiBase + this.apiController + "/" + apiMethod;
    return this.httpclient.post<any>(urlApi, dataUser).pipe(
      tap((response) => this.createSuscriptor(response.access_token)),
      tap((response) => this.saveTokenToLocalStore(response.access_token)),
      tap((response) => this.pushNewUser(response.access_token)),
      tap(() => this.redirectToDashboard()));
  }

  private redirectToDashboard(): void {
    this.router.navigateByUrl('/dashboard');
  }

  logout(): void {
    this.removeUserFromLocalStorage();
    this.suscriptorService.removeSuscriptorFromLocalStorage();
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
    const userInfo = jwt_decode.jwtDecode(userToken) as User;
    console.log("userInfo;: ", jwt_decode);
    //const userInfo = JSON.parse(window.atob(userToken)) as User;
    console.log({ ...userInfo, token: userToken });
    return { ...userInfo, token: userToken };
  }

  private removeUserFromLocalStorage(): void {
    localStorage.removeItem(USER_LOCAL_STORAGE_KEY_VENDING);
  }

  private createSuscriptor(userToken: string): boolean {
    let response = false;
    this.suscriptorService.createSuscriptor(userToken).pipe(
      finalize(() => {
        console.log('Finalize');
      }),
      catchError((error: HttpErrorResponse) => {
        response = false;
        throw error;
      }),
    ).subscribe();
    response = true;
    return response;
  }

  private getSuscriptor(userToken: string): boolean {
    let response = false;
    this.suscriptorService.getSuscriptor(userToken).pipe(
      finalize(() => {
        console.log('Finalize');
      }),
      catchError((error: HttpErrorResponse) => {
        response = false;
        throw error;
      }),
    ).subscribe();
    response = true;
    return response;
  }

}
