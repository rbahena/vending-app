import { Component } from '@angular/core';
import { CategoriesService } from './categories.service';
import { Observable, catchError, finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { addCategory, category } from './models/category.interface';
import { AlertService } from 'src/app/modules/shared/alert/alert.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
const SUSCRIPTOR_LOCAL_STORAGE_KEY_VENDING = 'suscriptorData';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  categorias: category[] = [];
  addCategory: addCategory = {
    fk_suscriptor: 0,
    nombre_categoria: ''
  };
  idSuscriptor: number = 0;

  constructor(private categoriesService: CategoriesService, private alertService: AlertService) { }
  ngOnInit(): void {
    this.getAllCategories();
  }

  formCreateCategory = new FormGroup({
    nombreCategoria: new FormControl('', {
      validators: [Validators.required, Validators.minLength(5)]
    })
    // contrasena: new FormControl('', {
    //   validators: [Validators.required],
    //   nonNullable: true,
    // }),
  });

  getAllCategories() {
    this.getIdSuscriptorFromLocaStorage();
    let id_suscriptor: number = this.idSuscriptor;
    this.categoriesService.getAllCategories(id_suscriptor).subscribe(
      (response => {
        this.categorias = response
      }),
      (error => { })
    );
  }

  createCategory() {
    if (this.formCreateCategory.invalid) return;
    this.getIdSuscriptorFromLocaStorage();
    this.addCategory = {
      fk_suscriptor: this.idSuscriptor,
      nombre_categoria: this.formCreateCategory.value.nombreCategoria!,
    }
    this.categoriesService.addCategory(this.addCategory).pipe(
      finalize(() => {
        this.getAllCategories();
        document.getElementById('cerrarModal')!.click();
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error.error.message);
        this.alertService.showAlert(error.error.message, "Error");
        throw error;
      }),
    ).subscribe();
  }

  private getIdSuscriptorFromLocaStorage(): void {
    const idSuscr = localStorage.getItem(SUSCRIPTOR_LOCAL_STORAGE_KEY_VENDING);
    this.idSuscriptor = Number(idSuscr);
  }

}
