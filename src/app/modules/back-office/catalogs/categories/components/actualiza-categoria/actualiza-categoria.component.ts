import { Component, Input } from '@angular/core';
import { category } from '../../models/category.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-actualiza-categoria',
  templateUrl: './actualiza-categoria.component.html',
  styleUrls: ['./actualiza-categoria.component.css']
})
export class ActualizaCategoriaComponent {

  @Input() detalleCategoria: Partial<category> = {};
  crud_create: boolean = false;
  crud_update:boolean = false;
  constructor(){
    console.log("this.detalleCategoria:_ ", this.detalleCategoria);
  }
  
  formCreateCategory = new FormGroup({
    nombreCategoria: new FormControl(this.detalleCategoria.nombre_categoria, {
      validators: [Validators.required, Validators.minLength(5)]
    })
    // contrasena: new FormControl('', {
    //   validators: [Validators.required],
    //   nonNullable: true,
    // }),
  });

  cargarDetalle(detalleCategoria: category){
    console.table(detalleCategoria);
  }

  actualizaCategoria(){

  }
  
  cancelarRegistroNueva() {
    this.crud_update = false;
  }
}
