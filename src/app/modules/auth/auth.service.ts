import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginInterface } from './models/login.interface';
import { environment } from 'src/environments/environment.env';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  urlApiBase = environment.urlApi;
  apiController: String = 'auth';
  constructor(private httpclient: HttpClient) {}

  login(credentials: loginInterface) {
    console.log(credentials)
    const apiMethod = 'login';
    const urlApi = this.urlApiBase + this.apiController + "/" + apiMethod;
    //const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    
    
    this.httpclient.post(urlApi, credentials).subscribe( data => {
      console.log(data);
    });
  }
}
