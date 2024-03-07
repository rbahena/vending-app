import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.env';
import { User, UserWithToken } from '../auth/models/login.interface';
import * as jwt_decode from "jwt-decode";
import { tap } from 'rxjs';
import { SuscriptorDetail, createSuscriptor } from './models/createSuscriptor.interface';
const SUSCRIPTOR_LOCAL_STORAGE_KEY_VENDING = 'suscriptorData';

@Injectable({
  providedIn: 'root'
})
export class SuscriptorService {

  urlApiBase = environment.urlApi;
  apiController: String = 'subscribers';
  nombreOperacionDefault:String = environment.nombreOperacionDefault;

  constructor(private httpClient: HttpClient) { }

  createSuscriptor(userToken: string) {
    const apiMethod = 'addsubscriber';
    const urlApi = this.urlApiBase + this.apiController + "/" + apiMethod;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`
    })
    const userInfo = jwt_decode.jwtDecode(userToken) as User;
    const subcriptor: createSuscriptor = {
      fk_usuario: userInfo.id,
      nombre_operacion: this.nombreOperacionDefault,
      nombre: userInfo.nombre,
      primer_apellido: '',
      segundo_apellido: ''
    }
    return this.httpClient
      .post<any>(urlApi, subcriptor, {headers})
      .pipe(
        tap((response) => console.log("Suscriptor creado: ", response)),
        tap((response:SuscriptorDetail) => this.saveSuscriptorToLocalStore(response))
        );
  }

  getSuscriptor(userToken: string) {
    const apiMethod = 'getSuscriptor';
    const userInfo = jwt_decode.jwtDecode(userToken) as User;
    const urlApi = this.urlApiBase + this.apiController + "/" + apiMethod  + "/"+ userInfo.id;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`
    })
    return this.httpClient
      .get<any>(urlApi, {headers})
      .pipe(
        tap((response) => console.log("Suscriptor obtenido: ", response)),
        tap((response:SuscriptorDetail) => this.saveSuscriptorToLocalStore(response))
        );
  }

  private saveSuscriptorToLocalStore(suscriptorData: SuscriptorDetail): void {
    console.log("suscriptorData: ", suscriptorData);
    localStorage.setItem(SUSCRIPTOR_LOCAL_STORAGE_KEY_VENDING, suscriptorData.id_suscriptor.toString());
  }

  public removeSuscriptorFromLocalStorage(): void {
    localStorage.removeItem(SUSCRIPTOR_LOCAL_STORAGE_KEY_VENDING);
  }
}
