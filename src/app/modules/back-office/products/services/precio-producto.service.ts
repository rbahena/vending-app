import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.env';
import { actualizaPrecioProveedorDto, agregarPrecioProveedorDto, obtenPrecioProveedorDto, precioProveedorDto } from '../precio-proveedor/models/precio-proveedor.interface';
import { Observable } from 'rxjs';
const USER_LOCAL_STORAGE_KEY_VENDING = 'userData';

@Injectable({
  providedIn: 'root'
})
export class PrecioProductoService {
  urlApiBase = environment.urlApi;
  apiController: string = 'rel-precio-producto';

  constructor(private httpClient: HttpClient) { }

  crearRelacionPrecioProducto(crearPrecioProducto: agregarPrecioProveedorDto){
    const metodApi = 'crearRelacionPrecioProducto';
    const urlApi = this.urlApiBase + this.apiController + "/" + metodApi;
    const token: String = this.loadUserFromLocalStorage();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post<precioProveedorDto>(urlApi, crearPrecioProducto, {headers});
  }

  obtenerRelacionesPrecioProducto(id_suscriptor: number): Observable<precioProveedorDto[]> {
    const metodApi = 'obtenerRelacionesPrecioProducto';
    const urlApi = this.urlApiBase + this.apiController + "/" + metodApi + "/" + id_suscriptor;
    const token: String = this.loadUserFromLocalStorage();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get<precioProveedorDto[]>(urlApi, {headers});
  }

  obtenerRelacionPrecioProducto(obtenPrecioProveedorDto: obtenPrecioProveedorDto): Observable<precioProveedorDto> {
    const metodApi = 'obtenerRelacionPrecioProducto';
    const urlApi = this.urlApiBase + this.apiController + "/" + metodApi;
    const token: String = this.loadUserFromLocalStorage();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post<precioProveedorDto>(urlApi, obtenPrecioProveedorDto, {headers});
  }

  actualizaRelacionPrecioProducto(actualizaPrecioProveedorDto: actualizaPrecioProveedorDto) {
    const metodApi = 'actualizaRelacionPrecioProducto';
    const urlApi = this.urlApiBase + this.apiController + "/" + metodApi;
    const token: String = this.loadUserFromLocalStorage();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post<precioProveedorDto>(urlApi, actualizaPrecioProveedorDto, {headers});
  }

  eliminaRelacionPrecioProducto(actualizaPrecioProveedorDto: actualizaPrecioProveedorDto) {
    const metodApi = 'eliminaRelacionPrecioProducto';
    const urlApi = this.urlApiBase + this.apiController + "/" + metodApi;
    const token: String = this.loadUserFromLocalStorage();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post<precioProveedorDto>(urlApi, actualizaPrecioProveedorDto, {headers});
  }

  private loadUserFromLocalStorage(): String {
    return localStorage.getItem(USER_LOCAL_STORAGE_KEY_VENDING)!;
  }
}
