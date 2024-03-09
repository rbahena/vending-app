import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.env';
import { actualizaunidadMedidProductoDto, agregarUnidadMedidProductoDto, obtenUnidadMedidProductoDto, unidadMedidProductoDto } from './models/unidad.producto.interface';
import { Observable } from 'rxjs';
const USER_LOCAL_STORAGE_KEY_VENDING = 'userData';

@Injectable({
  providedIn: 'root'
})
export class UnidadesMedidaService {
  urlApiBase = environment.urlApi;
  apiController: string = 'unidades-medida';

  constructor(private httpClient: HttpClient) { }

  crearUnidad(crearUnidadMedidaProductoDto: agregarUnidadMedidProductoDto) {
    const metodApi = 'crearUnidad';
    const urlApi = this.urlApiBase + this.apiController + "/" + metodApi;
    const token: String = this.loadUserFromLocalStorage();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post<unidadMedidProductoDto>(urlApi, crearUnidadMedidaProductoDto, {headers});
  }

  obtenerUnidades(id_suscriptor: number): Observable<unidadMedidProductoDto[]> {
    const metodApi = 'obtenerUnidades';
    const urlApi = this.urlApiBase + this.apiController + "/" + metodApi + "/" + id_suscriptor;
    const token: String = this.loadUserFromLocalStorage();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get<unidadMedidProductoDto[]>(urlApi, {headers});
  }

  obtenerUnidad(obtenUnidadMedidProductoDto: obtenUnidadMedidProductoDto): Observable<unidadMedidProductoDto> {
    const metodApi = 'obtenerUnidad';
    const urlApi = this.urlApiBase + this.apiController + "/" + metodApi;
    const token: String = this.loadUserFromLocalStorage();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post<unidadMedidProductoDto>(urlApi, obtenUnidadMedidProductoDto, {headers});
  }

  actualizaUnidadMedida(actualizaunidadMedidProductoDto: actualizaunidadMedidProductoDto) {
    const metodApi = 'actualizaUnidad';
    const urlApi = this.urlApiBase + this.apiController + "/" + metodApi;
    const token: String = this.loadUserFromLocalStorage();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post<any>(urlApi, actualizaunidadMedidProductoDto, {headers});
  }

  eliminaUnidadMedida(actualizaunidadMedidProductoDto: actualizaunidadMedidProductoDto) {
    const metodApi = 'eliminaUnidad';
    const urlApi = this.urlApiBase + this.apiController + "/" + metodApi;
    const token: String = this.loadUserFromLocalStorage();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post<any>(urlApi, actualizaunidadMedidProductoDto, {headers});
  }

  
  private loadUserFromLocalStorage(): String {
    return localStorage.getItem(USER_LOCAL_STORAGE_KEY_VENDING)!;
  }
}
