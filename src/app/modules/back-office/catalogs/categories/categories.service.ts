import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AlertService } from 'src/app/modules/shared/alert/alert.service';
import { environment } from 'src/environments/environment.env';
import { addCategory, category, getDetalleCategoria, updateCategory } from './models/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  urlApiBase = environment.urlApi;
  apiController: String = 'categories';
  

  constructor(private httpClient: HttpClient, private alertService: AlertService) { }

  getAllCategories(id_suscriptor: number): Observable<category[]> {
    const apiMethod = 'getAll';
    const urlApi = this.urlApiBase + this.apiController + "/" + apiMethod + "/" + id_suscriptor;
    return this.httpClient
      .get<category[]>(urlApi)
      .pipe(
        tap((response) => console.log("Service categories: ", response))
      );
  }

  addCategory(dataCreateCategory: addCategory) {
    const apiMethod = 'create';
    const urlApi = this.urlApiBase + this.apiController + "/" + apiMethod;
    return this.httpClient.post<any>(urlApi, dataCreateCategory);
  }

  getDetalleCategoria(getDetalleCategoria: getDetalleCategoria) {
    const apiMethod = 'getCategory';
    const urlApi = this.urlApiBase + this.apiController + "/" + apiMethod;
    return this.httpClient.post<any>(urlApi, getDetalleCategoria);
  }
  
  updateCategory(updateCategoria: updateCategory) {
    const apiMethod = 'updateCategory';
    const urlApi = this.urlApiBase + this.apiController + "/" + apiMethod;
    return this.httpClient.post<any>(urlApi, updateCategoria);
  }

}
