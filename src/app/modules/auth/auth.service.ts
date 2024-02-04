import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginInterface } from './models/login.interface';
import { environment } from 'src/environments/environment.env';
import { registerInterface } from './models/register.interface';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  urlApiBase = environment.urlApi;
  apiController: String = 'auth';

  constructor(private httpclient: HttpClient, private router: Router) {}
  

  login(credentials: loginInterface) {
    const apiMethod = 'login';
    const urlApi = this.urlApiBase + this.apiController + "/" + apiMethod;
    return this.httpclient
      .post(urlApi, credentials)
      .pipe(
        tap((res) => console.log(res)),
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
    this.router.navigateByUrl('auth/login');
  }
}
