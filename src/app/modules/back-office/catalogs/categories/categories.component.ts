import { Component } from '@angular/core';
import { CategoriesService } from './categories.service';
import { Observable, catchError, finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { category } from './models/category.interface';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  categorias:category[] = [];

  constructor(private categoriesService:CategoriesService){}
  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(){
    let id_suscriptor:number = 1;
    this.categoriesService.getAllCategories(id_suscriptor).subscribe(
      (response => {
        this.categorias = response
      }),
      (error => {}) 
    );
  }

}
