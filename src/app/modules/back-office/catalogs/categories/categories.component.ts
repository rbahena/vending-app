import { Component } from '@angular/core';
import { CategoriesService } from './categories.service';
import { Observable, catchError, finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { category } from './models/category.interface';
import { AlertService } from 'src/app/modules/shared/alert/alert.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  categorias:category[] = [];

  constructor(private categoriesService:CategoriesService, private alertService: AlertService){}
  ngOnInit(): void {
    this.getAllCategories();
  }

  formCreateCategory = new FormGroup({
    nombreCategoria: new FormControl('', {
      validators: [Validators.required]
    })
    // contrasena: new FormControl('', {
    //   validators: [Validators.required],
    //   nonNullable: true,
    // }),
  });

  getAllCategories(){
    let id_suscriptor:number = 1;
    this.categoriesService.getAllCategories(id_suscriptor).subscribe(
      (response => {
        this.categorias = response
      }),
      (error => {}) 
    );
  }

  createCategory(){
    if(!this.formCreateCategory.valid){
      this.alertService.showAlert("Debe ingresar los valores");
      return;
    }
    console.log(this.formCreateCategory.value);
  }

}
