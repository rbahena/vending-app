import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.env';
import { actualizaProveedorDto, agregarProveedorDto, obtenDetalleProveedorDto, proveedorDto } from './models/proveedores.interface';
import { Observable } from 'rxjs';
const USER_LOCAL_STORAGE_KEY_VENDING = 'userData';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  urlApiBase = environment.urlApi;
  apiController: string = 'proveedores';

  constructor(private httpClient: HttpClient) { }

  crearProveedor(crearProveedorDto: agregarProveedorDto) { 
    const metodApi = 'crearProveedor';
    const urlApi = this.urlApiBase + this.apiController + "/" + metodApi;
    const token: String = this.loadUserFromLocalStorage();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post<proveedorDto>(urlApi, crearProveedorDto, {headers});
  }

  obtenerProveedores(id_suscriptor: number): Observable<proveedorDto[]> {
    const metodApi = 'obtenerProveedores';
    const urlApi = this.urlApiBase + this.apiController + "/" + metodApi + "/" + id_suscriptor;
    const token: String = this.loadUserFromLocalStorage();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get<proveedorDto[]>(urlApi, {headers});
  }

  obtenerProveedor(obtenDetalleProveedorDto: obtenDetalleProveedorDto): Observable<proveedorDto> {
    const metodApi = 'obtenerProveedor';
    const urlApi = this.urlApiBase + this.apiController + "/" + metodApi;
    const token: String = this.loadUserFromLocalStorage();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post<proveedorDto>(urlApi, obtenDetalleProveedorDto, {headers});
  }

  actualizaProveedor(actualizaProveedorDto: actualizaProveedorDto) {
    const metodApi = 'actualizaProveedor';
    const urlApi = this.urlApiBase + this.apiController + "/" + metodApi;
    const token: String = this.loadUserFromLocalStorage();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post<any>(urlApi, actualizaProveedorDto, {headers});
  }

  eliminaProveedor(actualizaProveedorDto: actualizaProveedorDto) {
    const metodApi = 'eliminaProveedor';
    const urlApi = this.urlApiBase + this.apiController + "/" + metodApi;
    const token: String = this.loadUserFromLocalStorage();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post<any>(urlApi, actualizaProveedorDto, {headers});
  }

  private loadUserFromLocalStorage(): String {
    return localStorage.getItem(USER_LOCAL_STORAGE_KEY_VENDING)!;
  }
}
