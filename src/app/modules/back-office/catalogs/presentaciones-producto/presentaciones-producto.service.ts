import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.env';
import { actualizaPresentacionProductoDto, agregarPresentacionProductoDto, obtenPresentacionProductoDto, presentacionProductoDto } from './models/presentacion.producto.interface';
import { Observable } from 'rxjs';
const USER_LOCAL_STORAGE_KEY_VENDING = 'userData';

@Injectable({
  providedIn: 'root'
})
export class PresentacionesProductoService {
  urlApiBase = environment.urlApi;
  apiController: string = 'presentaciones-producto';

  constructor(private httpClient: HttpClient) { }

  crearPresentacion(agregarPresentacionProductoDto: agregarPresentacionProductoDto) {
    const metodApi = 'crearPresentacion';
    const urlApi = this.urlApiBase + this.apiController + "/" + metodApi;
    const token: String = this.loadUserFromLocalStorage();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post<presentacionProductoDto>(urlApi, agregarPresentacionProductoDto, { headers });
  }

  obtenerPresentaciones(id_suscriptor: number): Observable<presentacionProductoDto[]> {
    const metodApi = 'obtenerPresentaciones';
    const urlApi = this.urlApiBase + this.apiController + "/" + metodApi + "/" + id_suscriptor;
    const token: String = this.loadUserFromLocalStorage();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get<presentacionProductoDto[]>(urlApi, { headers });
  }

  obtenerPresentacion(obtenPresentacionProductoDto: obtenPresentacionProductoDto): Observable<presentacionProductoDto> {
    const metodApi = 'obtenerPresentacion';
    const urlApi = this.urlApiBase + this.apiController + "/" + metodApi;
    const token: String = this.loadUserFromLocalStorage();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post<presentacionProductoDto>(urlApi, obtenPresentacionProductoDto, { headers });
  }

  actualizaPresentacion(actualizaPresentacionProductoDto: actualizaPresentacionProductoDto) {
    const metodApi = 'actualizaPresentacion';
    const urlApi = this.urlApiBase + this.apiController + "/" + metodApi;
    const token: String = this.loadUserFromLocalStorage();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post<any>(urlApi, actualizaPresentacionProductoDto, {headers});
  }

  eliminaPresentacion(actualizaPresentacionProductoDto: actualizaPresentacionProductoDto) {
    const metodApi = 'eliminaPresentacion';
    const urlApi = this.urlApiBase + this.apiController + "/" + metodApi;
    const token: String = this.loadUserFromLocalStorage();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post<any>(urlApi, actualizaPresentacionProductoDto, {headers});
  }

  private loadUserFromLocalStorage(): String {
    return localStorage.getItem(USER_LOCAL_STORAGE_KEY_VENDING)!;
  }
}
