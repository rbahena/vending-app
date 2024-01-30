import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginInterface } from './models/login.interface';
import { environment } from 'src/environments/environment.env';
import { JsonPipe } from '@angular/common';
import { registerInterface } from './models/register.interface';
import { AlertService } from '../shared/alert/alert.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  urlApiBase = environment.urlApi;
  apiController: String = 'auth';

  constructor(private httpclient: HttpClient, private alertService: AlertService) {}
  

  login(credentials: loginInterface) {
    const apiMethod = 'login';
    const urlApi = this.urlApiBase + this.apiController + "/" + apiMethod;
    this.alertService.showAlert("Inicio de sesión exitoso");
    this.httpclient.post(urlApi, credentials).subscribe({
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

  callAlert(){
    
  }
}
