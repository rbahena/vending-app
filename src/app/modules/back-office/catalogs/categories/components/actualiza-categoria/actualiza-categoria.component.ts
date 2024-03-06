import { Component, Input } from '@angular/core';
import { category } from '../../models/category.interface';

@Component({
  selector: 'app-actualiza-categoria',
  templateUrl: './actualiza-categoria.component.html',
  styleUrls: ['./actualiza-categoria.component.css']
})
export class ActualizaCategoriaComponent {

  @Input() detalleCategoria: Partial<category> = {};

  constructor(){
    console.log("this.detalleCategoria:_ ", this.detalleCategoria);
  }

  cargarDetalle(detalleCategoria: category){
    console.table(detalleCategoria);
  }
  
}
