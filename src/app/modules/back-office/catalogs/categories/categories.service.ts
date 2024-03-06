import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AlertService } from 'src/app/modules/shared/alert/alert.service';
import { environment } from 'src/environments/environment.env';
import { addCategory, category, getDetalleCategoria, updateCategory } from './models/category.interface';
const USER_LOCAL_STORAGE_KEY_VENDING = 'userData';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  urlApiBase = environment.urlApi;
  apiController: String = 'categories';


  constructor(private httpClient: HttpClient, private alertService: AlertService) {

  }

  getAllCategories(id_suscriptor: number): Observable<category[]> {
    const apiMethod = 'getAll';
    const urlApi = this.urlApiBase + this.apiController + "/" + apiMethod + "/" + id_suscriptor;
    const token:String = this.loadUserFromLocalStorage();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    return this.httpClient
      .get<category[]>(urlApi, { headers: headers })
      .pipe(
        tap((response) => console.log("Service categories: ", response))
      );
  }

  addCategory(dataCreateCategory: addCategory) {
    const apiMethod = 'create';
    const urlApi = this.urlApiBase + this.apiController + "/" + apiMethod;
    const token:String = this.loadUserFromLocalStorage();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.httpClient.post<any>(urlApi, dataCreateCategory, { headers });
  }

  getDetalleCategoria(getDetalleCategoria: getDetalleCategoria) {
    const apiMethod = 'getCategory';
    const urlApi = this.urlApiBase + this.apiController + "/" + apiMethod;
    const token:String = this.loadUserFromLocalStorage();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.httpClient.post<any>(urlApi, getDetalleCategoria, {headers});
  }

  updateCategory(updateCategoria: updateCategory) {
    const apiMethod = 'updateCategory';
    const urlApi = this.urlApiBase + this.apiController + "/" + apiMethod;
    const token:String = this.loadUserFromLocalStorage();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.httpClient.post<any>(urlApi, updateCategoria, {headers});
  }

  deleteCategory(updateCategoria: updateCategory) {
    const apiMethod = 'deleteCategory';
    const urlApi = this.urlApiBase + this.apiController + "/" + apiMethod;
    const token:String = this.loadUserFromLocalStorage();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.httpClient.post<any>(urlApi, updateCategoria, {headers});
  }

  private loadUserFromLocalStorage(): String {
    return localStorage.getItem(USER_LOCAL_STORAGE_KEY_VENDING)!;
  }
}
