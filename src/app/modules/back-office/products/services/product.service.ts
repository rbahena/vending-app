import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.env';
import { actualizaProductoDto, agregarProductoDto, obtenProductoDto, productoDto } from '../product-list/models/producto.interface';
import { Observable } from 'rxjs';
const USER_LOCAL_STORAGE_KEY_VENDING = 'userData';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {
  urlApiBase = environment.urlApi;
  apiController: string = 'productos';

  constructor(private httpClient: HttpClient) { }

  crearProducto(agregarProductoDto:agregarProductoDto){
    const metodApi = 'crearProducto';
    const urlApi = this.urlApiBase + this.apiController + "/" + metodApi;
    const token: String = this.loadUserFromLocalStorage();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post<productoDto>(urlApi, agregarProductoDto, { headers });
  }
  
  obtenerProductos(id_suscriptor: number): Observable<productoDto[]> {
    const metodApi = 'obtenerProductos';
    const urlApi = this.urlApiBase + this.apiController + "/" + metodApi + "/" + id_suscriptor;
    const token: String = this.loadUserFromLocalStorage();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get<productoDto[]>(urlApi, { headers });
  }

  obtenerProducto(obtenProductoDto: obtenProductoDto): Observable<productoDto> {
    const metodApi = 'obtenerProducto';
    const urlApi = this.urlApiBase + this.apiController + "/" + metodApi;
    const token: String = this.loadUserFromLocalStorage();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post<productoDto>(urlApi, obtenProductoDto, { headers });
  }

  actualizaProducto(actualizaProductoDto: actualizaProductoDto) {
    const metodApi = 'actualizaProducto';
    const urlApi = this.urlApiBase + this.apiController + "/" + metodApi;
    const token: String = this.loadUserFromLocalStorage();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post<any>(urlApi, actualizaProductoDto, {headers});
  }

  eliminaProducto(actualizaProductoDto: actualizaProductoDto) {
    const metodApi = 'eliminaProducto';
    const urlApi = this.urlApiBase + this.apiController + "/" + metodApi;
    const token: String = this.loadUserFromLocalStorage();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post<any>(urlApi, actualizaProductoDto, {headers});
  }

  private loadUserFromLocalStorage(): String {
    return localStorage.getItem(USER_LOCAL_STORAGE_KEY_VENDING)!;
  }
}
