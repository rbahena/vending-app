import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.env';
import { actualizaunidadCompraDto, agregarUnidadCompraDto, obtenUnidadCompraDto, unidadCompraDto } from './models/unidad.compra.interface';
import { Observable } from 'rxjs';
const USER_LOCAL_STORAGE_KEY_VENDING = 'userData';

@Injectable({
  providedIn: 'root'
})
export class UnidadesCompraService {
  urlApiBase = environment.urlApi;
  apiController: string = 'unidades-compra';

  constructor(private httpClient: HttpClient) { }
  crearUnidadCompra(agregarUnidadCompraDto: agregarUnidadCompraDto) {
    const metodApi = 'crearUnidadCompra';
    const urlApi = this.urlApiBase + this.apiController + "/" + metodApi;
    const token: String = this.loadUserFromLocalStorage();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post<agregarUnidadCompraDto>(urlApi, agregarUnidadCompraDto, { headers });
  }

  obtenerUnidadesCompra(id_suscriptor: number): Observable<unidadCompraDto[]> {
    const metodApi = 'obtenerUnidadesCompra';
    const urlApi = this.urlApiBase + this.apiController + "/" + metodApi + "/" + id_suscriptor;
    const token: String = this.loadUserFromLocalStorage();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get<unidadCompraDto[]>(urlApi, {headers});
  }

  obtenerUnidadCompra(obtenUnidadCompraDto: obtenUnidadCompraDto): Observable<obtenUnidadCompraDto> {
    const metodApi = 'obtenerUnidadCompra';
    const urlApi = this.urlApiBase + this.apiController + "/" + metodApi;
    const token: String = this.loadUserFromLocalStorage();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post<unidadCompraDto>(urlApi, obtenUnidadCompraDto, {headers});
  }

  actualizaUnidadCompra(actualizaunidadCompraDto: actualizaunidadCompraDto) {
    const metodApi = 'actualizaUnidadCompra';
    const urlApi = this.urlApiBase + this.apiController + "/" + metodApi;
    const token: String = this.loadUserFromLocalStorage();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post<any>(urlApi, actualizaunidadCompraDto, {headers});
  }

  eliminaUnidadMedida(actualizaunidadCompraDto: actualizaunidadCompraDto) {
    const metodApi = 'eliminaUnidad';
    const urlApi = this.urlApiBase + this.apiController + "/" + metodApi;
    const token: String = this.loadUserFromLocalStorage();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post<any>(urlApi, actualizaunidadCompraDto, {headers});
  }

  private loadUserFromLocalStorage(): String {
    return localStorage.getItem(USER_LOCAL_STORAGE_KEY_VENDING)!;
  }
}
