import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginInterface } from './models/login.interface';
import { environment } from 'src/environments/environment.env';
import { registerInterface } from './models/register.interface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  urlApiBase = environment.urlApi;
  apiController: String = 'auth';

  constructor(private httpclient: HttpClient) {}
  

  login(credentials: loginInterface) {
    const apiMethod = 'login';
    const urlApi = this.urlApiBase + this.apiController + "/" + apiMethod;
    return this.httpclient
      .post(urlApi, credentials)
      .pipe(tap((res) => console.log(res)));
  }

  register(dataUser: registerInterface) {
    const apiMethod = 'register';
    const urlApi = this.urlApiBase + this.apiController + "/" + apiMethod;
    this.httpclient.post(urlApi, dataUser).subscribe({
      next(response) {
        console.log(response);
      },
      error(error) {
        console.log(error);
      },
      complete() {
        console.log('Completed');
      },
    });
  }
}
