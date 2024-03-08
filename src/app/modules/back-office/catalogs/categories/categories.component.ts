import { Component } from '@angular/core';
import { CategoriesService } from './categories.service';
import { Observable, catchError, finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { addCategory, category, getDetalleCategoria, updateCategory } from './models/category.interface';
import { AlertService } from 'src/app/modules/shared/alert/alert.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
const SUSCRIPTOR_LOCAL_STORAGE_KEY_VENDING = 'suscriptorData';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  titleInterface: string = 'Categorias';
  crud_create: boolean = false;
  crud_update: boolean = false;
  categorias: category[] = [];
  addCategory: addCategory = {
    fk_suscriptor: 0,
    nombre_categoria: ''
  };
  updateCategoria: updateCategory = {
    fk_suscriptor: 0,
    id_categoria: 0,
    nombre_categoria: ''
  }

  getDetalleCategoria: getDetalleCategoria = {
    fk_suscriptor: 0,
    id_categoria: 0
  };
  idSuscriptor: number = 0;
  detalleCategoria: Partial<category> = {}

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

  formUpdateCategory = new FormGroup({
    nombreCategoria: new FormControl('', {
      validators: [Validators.required, Validators.minLength(5)]
    }),
    id_categoria: new FormControl(),
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

  showCreateCategory() {
    this.crud_create = true;
    this.titleInterface = "Agregar nueva categoria"
  }

  createCategory() {
    if (this.formCreateCategory.invalid) return;
    this.getIdSuscriptorFromLocaStorage();
    this.addCategory = {
      fk_suscriptor: this.idSuscriptor,
      nombre_categoria: this.formCreateCategory.value.nombreCategoria!,
    }
    this.categoriesService.addCategory(this.addCategory).subscribe({
      next: () => {
        this.getAllCategories();
        this.crud_create = false;
        this.titleInterface = "Categorias"
        this.alertService.showAlert("La categoria se agrego de manera correcta");
        this.formCreateCategory.reset();
      },
      error: error => {
        this.alertService.showAlert(error.error.message, "Error");
      }

    })
  }

  getDetailCategory(id_categoria: number) {
    this.crud_update = true;
    this.titleInterface = 'Actualiza categoria';
    this.getIdSuscriptorFromLocaStorage();
    this.getDetalleCategoria = {
      fk_suscriptor: this.idSuscriptor,
      id_categoria: id_categoria,
    }
    this.categoriesService.getDetalleCategoria(this.getDetalleCategoria).subscribe(
      (response) => {
        this.detalleCategoria = response;
        this.formUpdateCategory.setValue({ nombreCategoria: this.detalleCategoria.nombre_categoria!, id_categoria: this.detalleCategoria.id_categoria })
      },
      (error) => {
        console.log(error);
      }

    );
  }

  cancelarRegistroNueva() {
    this.crud_create = false;
    this.titleInterface = "Categorias"
  }

  cancelarUpdate() {
    this.crud_update = false;
    this.crud_create = false;
    this.titleInterface = "Categorias"
  }

  actualizaCategoria() {
    if (this.formUpdateCategory.invalid) return;
    this.getIdSuscriptorFromLocaStorage();
    this.updateCategoria = {
      fk_suscriptor: this.idSuscriptor,
      nombre_categoria: this.formUpdateCategory.value.nombreCategoria!,
      id_categoria: this.formUpdateCategory.value.id_categoria
    }
    this.categoriesService.updateCategory(this.updateCategoria).subscribe({
      next: () => {
        this.getAllCategories();
        this.alertService.showAlert("La categoria se actualizo de manera correcta");
        this.crud_create = false;
        this.crud_update = false;
        this.titleInterface = "Categorias"
        this.formUpdateCategory.reset();
      },
      error: (error: HttpErrorResponse) => {
        this.alertService.showAlert(error.error.message, 'error');
      }
    })
  }

  eliminaCategoria(id_categoria: number) {
    console.log("Elimina categoria: ", id_categoria);
    this.getIdSuscriptorFromLocaStorage();
    this.updateCategoria = {
      fk_suscriptor: this.idSuscriptor,
      nombre_categoria: "",
      id_categoria: id_categoria
    }
    this.categoriesService.deleteCategory(this.updateCategoria).pipe(
      finalize(() => {
        this.getAllCategories();
        this.alertService.showAlert("La categoria se actualizo de manera correcta");
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
