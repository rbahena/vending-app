import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.env';
import { actualizaEnvaseDto, agregarEnvaseDto, envaseDto, obtenDetalleEnvaseDto } from './models/envase.interface';
import { Observable } from 'rxjs';
import { category } from '../categories/models/category.interface';
const USER_LOCAL_STORAGE_KEY_VENDING = 'userData';

@Injectable({
  providedIn: 'root'
})
export class EnvasesService {

  urlApiBase = environment.urlApi;
  apiController: string = 'envases';

  constructor(private httpClient: HttpClient) { }

  crearEnvase(crearEnvaseDto: agregarEnvaseDto) {
    const metodApi = 'crearEnvase';
    const urlApi = this.urlApiBase + this.apiController + "/" + metodApi;
    const token: String = this.loadUserFromLocalStorage();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post<envaseDto>(urlApi, crearEnvaseDto, {headers});
  }

  obtenerEnvases(id_suscriptor: number): Observable<envaseDto[]> {
    const metodApi = 'obtenerEnvases';
    const urlApi = this.urlApiBase + this.apiController + "/" + metodApi + "/" + id_suscriptor;
    const token: String = this.loadUserFromLocalStorage();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get<envaseDto[]>(urlApi, {headers});
  }

  obtenerEnvase(obtenDetalleEnvaseDto: obtenDetalleEnvaseDto): Observable<envaseDto> {
    const metodApi = 'obtenerEnvase';
    const urlApi = this.urlApiBase + this.apiController + "/" + metodApi;
    const token: String = this.loadUserFromLocalStorage();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post<envaseDto>(urlApi, obtenDetalleEnvaseDto, {headers});
  }

  actualizaEnvase(actualizaEnvaseDto: actualizaEnvaseDto) {
    const metodApi = 'actualizaEnvase';
    const urlApi = this.urlApiBase + this.apiController + "/" + metodApi;
    const token: String = this.loadUserFromLocalStorage();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post<any>(urlApi, actualizaEnvaseDto, {headers});
  }

  eliminaEnvase(actualizaEnvaseDto: actualizaEnvaseDto) {
    const metodApi = 'eliminaEnvase';
    const urlApi = this.urlApiBase + this.apiController + "/" + metodApi;
    const token: String = this.loadUserFromLocalStorage();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post<any>(urlApi, actualizaEnvaseDto, {headers});
  }

  private loadUserFromLocalStorage(): String {
    return localStorage.getItem(USER_LOCAL_STORAGE_KEY_VENDING)!;
  }
}
