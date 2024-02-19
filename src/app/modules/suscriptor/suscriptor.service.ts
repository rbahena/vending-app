import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.env';
import { User, UserWithToken } from '../auth/models/login.interface';
import * as jwt_decode from "jwt-decode";
import { tap } from 'rxjs';
import { createSuscriptor } from './models/createSuscriptor.interface';

@Injectable({
  providedIn: 'root'
})
export class SuscriptorService {

  urlApiBase = environment.urlApi;
  apiController: String = 'subscribers';

  constructor(private httpClient: HttpClient) { }

  createSuscriptor(userToken: string) {
    const apiMethod = 'addsubscriber';
    const urlApi = this.urlApiBase + this.apiController + "/" + apiMethod;
    const userInfo = jwt_decode.jwtDecode(userToken) as User;
    const subcriptor: createSuscriptor = {
      fk_usuario: userInfo.id,
      nombre_operacion: 'Operación de prueba',
      nombre: userInfo.nombre,
      primer_apellido: '',
      segundo_apellido: ''
    }
    return this.httpClient
      .post<any>(urlApi, subcriptor)
      .pipe(
        tap((response) => console.log("Suscriptor creado: ", response)));
  }
}
